// Name: More Control
// ID: lmsSpMoreControl
// Description: More conditional and loop statements.
// By: LilyMakesThings <https://scratch.mit.edu/users/LilyMakesThings/>
// By: SharkPool <https://scratch.mit.edu/users/DemonX5/>
// License: LGPL-3.0

(function (Scratch) {
  "use strict";

  const vm = Scratch.vm;
  const runtime = vm.runtime;
  const Cast = Scratch.Cast;
  const regeneratedReporters = ["lmsSpMoreControl_forArg"];

  class Frame {
    constructor(isLoop) {
      this.isLoop = isLoop;
      this.isLastBlock = false;
    }
  }

  // Patch code given to me by Ashime, made by CST. Adapted by me.
  const JSG = vm.exports.i_will_not_ask_for_help_when_these_break().JSGenerator;
  const STG =
    vm.exports.i_will_not_ask_for_help_when_these_break().ScriptTreeGenerator;
  const JSGP = JSG.prototype;
  const STGP = STG.prototype;

  const PATCHES_ID = "moreControl";
  const cst_patch = (obj, functions) => {
    if (obj[PATCHES_ID]) return;
    obj[PATCHES_ID] = {};
    for (const name in functions) {
      const original = obj[name];
      obj[PATCHES_ID][name] = obj[name];
      if (original) {
        obj[name] = function (...args) {
          const callOriginal = (...args) => original.call(this, ...args);
          return functions[name].call(this, callOriginal, ...args);
        };
      } else {
        obj[name] = function (...args) {
          return functions[name].call(this, () => {}, ...args);
        };
      }
    }
  };

  cst_patch(JSGP, {
    descendStackedBlock(originalFn, node) {
      if (node.kind === "lmsSpMoreControl.withoutScreenRefresh") {
        const previousWarp = this.isWarp;
        this.isWarp = true;
        this.descendStack(
          node.code,
          new Frame(false, "lmsSpMoreControl.withoutScreenRefresh")
        );
        this.isWarp = previousWarp;
        return;
      }
      if (node.kind === "lmsSpMoreControl.withScreenRefresh") {
        const previousWarp = this.isWarp;
        this.isWarp = false;
        this.descendStack(
          node.code,
          new Frame(false, "lmsSpMoreControl.withScreenRefresh")
        );
        this.isWarp = previousWarp;
        return;
      }
      return originalFn(node);
    },
  });

  cst_patch(STGP, {
    descendStackedBlock(originalFn, block) {
      if (block.opcode === "lmsSpMoreControl_withoutScreenRefresh") {
        return {
          kind: "lmsSpMoreControl.withoutScreenRefresh",
          condition: {
            kind: "constant",
            value: true,
          },
          code: this.descendSubstack(block, "SUBSTACK"),
        };
      }
      if (block.opcode === "lmsSpMoreControl_withScreenRefresh") {
        return {
          kind: "lmsSpMoreControl.withScreenRefresh",
          condition: {
            kind: "constant",
            value: true,
          },
          code: this.descendSubstack(block, "SUBSTACK"),
        };
      }
      return originalFn(block);
    },
  });

  class MoreControl {
    constructor() {
      /**
       * Branch icon used when a script splits away
       * from the main thread.
       * @const
       */
      this.junctionIcon =
        "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIyMC4zOTkwNiIgaGVpZ2h0PSIyMS40MjE1MiIgdmlld0JveD0iMCwwLDIwLjM5OTA2LDIxLjQyMTUyIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjMxLjI4NTQsLTE2Ny4zMjgwOCkiPjxnIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2lzUGFpbnRpbmdMYXllciZxdW90Ozp0cnVlfSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0yMzUuMjc2NDUsMTY5LjIxNzE1Yy0wLjEyNTQsLTAuODc2ODkgMC42Mzc4LC0xLjg3NzU0IDEuNjk1NCwtMS44NzU3NWMwLjg4ODYsLTAuMTIzNzUgMS45MDI2LDAuNjI5NDEgMS45MDA3OSwxLjY3MzA4YzAuMDE3MjYsMC4xNzU0NSAwLjA3NTc4LDIuOTEyOCAtMC4yNzA0MywzLjAxMzRjLTEuMDEzNjcsMC4yOTQ1NiAtMy4zNDIwNSwtMi4zNDQ0MiAtMy4zMjU3NSwtMi44MTA3MnoiIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2luZGV4JnF1b3Q7Om51bGx9IiBmaWxsPSIjY2Y4YjE3Ii8+PHBhdGggZD0iTTI0NC45MzQ0NywxODQuMDczOTRjLTAuNiwtMC4zIC0xLC0wLjkgLTEsLTEuNXYtMS42Yy0xLjMsLTAuMSAtMi41LC0wLjUgLTMuNiwtMS4xYy0xLjcsLTAuOSAtMy4yOTEyOSwtMi4zIC00LjE5MTI5LC00LjFjLTAuOSwtMS43IC0xLjEyMTcsLTMuNiAtMC44MjE3LC01LjVjMC4zLC0xLjggMy42NzgyNiwtMC42IDMuNjc4MjYsMC40YzAsMSAwLjc0MzQ1LDEuOSAxLjM0MzQ1LDIuN2MwLjgsMS4xIDIuMTkxMjgsMS44IDMuNTkxMjgsMS44di0xLjVjMCwtMC45IDAuNywtMS43IDEuNywtMS43YzAuNCwwIDAuOSwwLjIgMS4yLDAuNWw0LjQsNC40YzAuNiwwLjcgMC42LDEuNyAwLDIuNGwtNC41LDQuNWMtMC41LDAuNSAtMS4yLDAuNiAtMS44LDAuM3oiIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2luZGV4JnF1b3Q7Om51bGx9IiBmaWxsPSIjY2Y4YjE3Ii8+PHBhdGggZD0iTTI0My4wODU0MSwxODMuNzk5NjFsLTQuNSw0LjVjLTAuNywwLjYgLTEuNywwLjYgLTIuNCwwbC00LjQsLTQuNGMtMC4zLC0wLjMgLTAuNSwtMC44IC0wLjUsLTEuMmMwLC0xIDAuOCwtMS43IDEuNywtMS43aDEuNWMwLC0wLjE4Mjc5IDAuMjU3NjMsLTMuOTgyNTkgMC40NzkyNywtNy40MTYwNGMwLjEyMzE0LC0xLjkwNzYzIDAuMjM1MTcsLTMuNzAyMTcgMC4yODU3NCwtNC43MDA0NGMwLjA4NjgyLC0wLjQ0NDkyIDAuMzEzMzgsLTAuODQ1NzggMS43Njc2MSwtMC43MTI1M2MxLjUxOTU5LDAuMTM5MjQgMS44NDE3MSwwLjc0OTIxIDEuODgxODksMC44NzUxNGMwLjc4NjI4LDQuMDc3MjYgMS4zNDExNSwxMS4zNzc1IDEuMzg1NDksMTEuOTUzODhoMS42YzAuNiwwIDEuMiwwLjQgMS41LDFjMC4zLDAuNiAwLjIsMS4zIC0wLjMsMS44eiIgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aW5kZXgmcXVvdDs6bnVsbH0iIGZpbGw9IiNjZjhiMTciLz48cGF0aCBkPSJNMjQyLjQ3NjcsMTgyLjI5OTYyYzAuMSwwLjMgMCwwLjYgLTAuMywwLjlsLTQuNCw0LjRjLTAuMiwwLjMgLTAuNiwwLjMgLTAuOSwwbC00LjQsLTQuNGMtMC4xLC0wLjEgLTAuMiwtMC4yIC0wLjIsLTAuNGMwLC0wLjQgMC4zLC0wLjcgMC43LC0wLjdoMi40YzAuMDMyNjIsLTAuMTYzMSAwLjE1NjI2LC00LjQ2MDA3IDAuMjk5NjIsLTguNDQwMjJjMC4wNzM3LC0yLjA0NjIgMy4wMDY3OSwtMS43Nzg5NiAzLjE2MzE4LDAuMjY1NDJjMC4yOTA5MiwzLjgwMzAxIDAuNTM3MTksNy42NjI2MyAwLjUzNzE5LDguMDc0OGgyLjZjMC4yLDAgMC40LDAgMC41LDAuM3oiIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2luZGV4JnF1b3Q7Om51bGx9IiBmaWxsPSIjZmZmZmZmIi8+PHBhdGggZD0iTTIzNS45MDMyNywxNjkuNDU5MzRjLTAuMDg0MTIsLTAuNTk2MDggMC40Mjc4NSwtMS4yNzYzIDEuMTM3MywtMS4yNzUwOGMwLjU5NjA4LC0wLjA4NDEyIDEuMjc2MywwLjQyNzg1IDEuMjc1MDgsMS4xMzczMWMwLjAwNDMsMC4wNDQyNSAxLjI0NzgxLDExLjYzOTUyIDAuODgxNjQsMTMuMzkyNzJjLTAuNjIwNzksMi45NzIzMSAtMy44NzI1NywwLjg5MzggLTMuODcyNTcsMC44OTM4YzAsMCAwLjE4ODQ1LC01Ljc1Mzk1IDAuMzU5MDMsLTkuOTI0MzVjMC4wOTQxMiwtMi4zMDEwMSAwLjIxNTkyLC00LjExOTk1IDAuMjE5NTIsLTQuMjI0Mzh6IiBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpbmRleCZxdW90OzpudWxsfSIgZmlsbD0iI2ZmZmZmZiIvPjxwYXRoIGQ9Ik0yNDQuODkyNzMsMTgyLjQ3NjIydi0yLjZjLTEuNSwwIC0yLjksLTAuMyAtNC4yLC0xYy0xLjYsLTAuOCAtMi44OTEyOCwtMi4xIC0zLjY5MTI4LC0zLjdjLTAuOCwtMS41IC0xLjI4MjU3LC0zLjMgLTAuOTgyNTcsLTQuOWMwLjIsLTEuNiAyLjMsLTEuMSAyLjMsMC4xYzAsMS4yIDAuNDgyNTcsMi4zIDEuMTgyNTcsMy4zYzAuNiwwLjkgMS41OTEyOCwxLjYgMi42OTEyOCwyYzAuOSwwLjMgMS44LDAuNCAyLjgsMC4ydi0yLjRjMCwtMC40IDAuMywtMC43IDAuNywtMC43YzAuMiwwIDAuMywwLjEgMC40LDAuMmw0LjQsNC40YzAuMywwLjMgMC4zLDAuNyAwLDAuOWwtNC40LDQuNGMtMC4zLDAuMyAtMC42LDAuNCAtMC45LDAuM2MtMC4zLC0wLjEgLTAuMywtMC4zIC0wLjMsLTAuNXoiIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2luZGV4JnF1b3Q7Om51bGx9IiBmaWxsPSIjZmZmZmZmIi8+PC9nPjwvZz48L3N2Zz48IS0tcm90YXRpb25DZW50ZXI6OC43MTQ1OTUwMDAwMDAwMDM6MTIuNjcxOTE2NDA2NTA3MzkzLS0+";

      /**
       * Branch/inline image used in blocks that
       * repeat something (such as restart script).
       * @const
       */
      this.repeatIcon =
        "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgaGVpZ2h0PSIyNCIKICAgd2lkdGg9IjI0IgogICB4bWw6c3BhY2U9InByZXNlcnZlIgogICBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAyNCAyNDsiCiAgIHZpZXdCb3g9IjAgMCAyNCAyNCIKICAgeT0iMHB4IgogICB4PSIwcHgiCiAgIGlkPSJyZXBlYXQiCiAgIHZlcnNpb249IjEuMSIKICAgc29kaXBvZGk6ZG9jbmFtZT0icmVwZWF0ICgyKS5zdmciCiAgIHhtbG5zOmlua3NjYXBlPSJodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy9uYW1lc3BhY2VzL2lua3NjYXBlIgogICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnMKICAgaWQ9ImRlZnMxMyIgLz48c29kaXBvZGk6bmFtZWR2aWV3CiAgIGlkPSJuYW1lZHZpZXcxMSIKICAgcGFnZWNvbG9yPSIjZmZmZmZmIgogICBib3JkZXJjb2xvcj0iIzAwMDAwMCIKICAgYm9yZGVyb3BhY2l0eT0iMC4yNSIKICAgaW5rc2NhcGU6c2hvd3BhZ2VzaGFkb3c9IjIiCiAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwLjAiCiAgIGlua3NjYXBlOnBhZ2VjaGVja2VyYm9hcmQ9IjAiCiAgIGlua3NjYXBlOmRlc2tjb2xvcj0iI2QxZDFkMSIgLz4KPHN0eWxlCiAgIHR5cGU9InRleHQvY3NzIgogICBpZD0ic3R5bGUyIj4KCS5zdDB7ZmlsbDojQ0Y4QjE3O30KCS5zdDF7ZmlsbDojRkZGRkZGO30KPC9zdHlsZT4KPHRpdGxlCiAgIGlkPSJ0aXRsZTQiPnJlcGVhdDwvdGl0bGU+CjxwYXRoCiAgIGQ9Ik0yMy4zLDExYy0wLjMsMC42LTAuOSwxLTEuNSwxaC0xLjZjLTAuMSwxLjMtMC41LDIuNS0xLjEsMy42Yy0wLjksMS43LTIuMywzLjItNC4xLDQuMSAgYy0xLjcsMC45LTMuNiwxLjItNS41LDAuOWMtMS44LTAuMy0zLjUtMS4xLTQuOS0yLjNjLTAuNy0wLjctMC43LTEuOSwwLTIuNmMwLjYtMC42LDEuNi0wLjcsMi4zLTAuMkg3YzAuOSwwLjYsMS45LDAuOSwyLjksMC45ICBzMS45LTAuMywyLjctMC45YzEuMS0wLjgsMS44LTIuMSwxLjgtMy41aC0xLjVjLTAuOSwwLTEuNy0wLjctMS43LTEuN2MwLTAuNCwwLjItMC45LDAuNS0xLjJsNC40LTQuNGMwLjctMC42LDEuNy0wLjYsMi40LDBMMjMsOS4yICBDMjMuNSw5LjcsMjMuNiwxMC40LDIzLjMsMTF6IgogICBjbGFzcz0ic3QwIgogICBpZD0icGF0aDYiIC8+CjxwYXRoCiAgIGQ9Ik0yMS44LDExaC0yLjZjMCwxLjUtMC4zLDIuOS0xLDQuMmMtMC44LDEuNi0yLjEsMi44LTMuNywzLjZjLTEuNSwwLjgtMy4zLDEuMS00LjksMC44Yy0xLjYtMC4yLTMuMi0xLTQuNC0yLjEgIGMtMC40LTAuMy0wLjQtMC45LTAuMS0xLjJjMC4zLTAuNCwwLjktMC40LDEuMi0wLjFsMCwwYzEsMC43LDIuMiwxLjEsMy40LDEuMXMyLjMtMC4zLDMuMy0xYzAuOS0wLjYsMS42LTEuNSwyLTIuNiAgYzAuMy0wLjksMC40LTEuOCwwLjItMi44aC0yLjRjLTAuNCwwLTAuNy0wLjMtMC43LTAuN2MwLTAuMiwwLjEtMC4zLDAuMi0wLjRsNC40LTQuNGMwLjMtMC4zLDAuNy0wLjMsMC45LDBMMjIsOS44ICBjMC4zLDAuMywwLjQsMC42LDAuMywwLjlTMjIsMTEsMjEuOCwxMXoiCiAgIGNsYXNzPSJzdDEiCiAgIGlkPSJwYXRoOCIgLz4KPC9zdmc+CjwhLS1yb3RhdGlvbkNlbnRlcjoxMjoxMi0tPgoK";

      /**
       * Inline icon used for blocks that go back
       * into (continue) the script.
       * @const
       */
      this.continueIcon =
        "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxNi40NjI1IiBoZWlnaHQ9IjE5LjM5Mzc1IiB2aWV3Qm94PSIwLDAsMTYuNDYyNSwxOS4zOTM3NSI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIzMy41NDA2MiwtMTcwLjc4NDM3KSI+PGcgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aXNQYWludGluZ0xheWVyJnF1b3Q7OnRydWV9IiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTIzOC40OTA2MywxODkuNzA5MzdsLTQuNSwtNC41Yy0wLjYsLTAuNyAtMC42LC0xLjcgMCwtMi40bDQuNCwtNC40YzAuMywtMC4zIDAuOCwtMC41IDEuMiwtMC41YzEsMCAxLjcsMC44IDEuNywxLjdsMCwxLjVjMS40LDAgMi43LC0wLjcgMy41LC0xLjhjMC42LC0wLjggMC45LC0xLjcgMC45LC0yLjdjMCwtMSAtMC4zLC0yIC0wLjksLTIuOWwwLC0wLjFjLTAuNSwtMC43IC0wLjQsLTEuNyAwLjIsLTIuM2MwLjcsLTAuNyAxLjksLTAuNyAyLjYsMGMxLjIsMS40IDIsMy4xIDIuMyw0LjljMC4zLDEuOSAwLDMuOCAtMC45LDUuNWMtMC45LDEuOCAtMi40LDMuMiAtNC4xLDQuMWMtMS4xLDAuNiAtMi4zLDEgLTMuNiwxLjFsMCwxLjZjMCwwLjYgLTAuNCwxLjIgLTEsMS41Yy0wLjYsMC4zIC0xLjMsMC4yIC0xLjgsLTAuM3oiIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2luZGV4JnF1b3Q7Om51bGx9IiBmaWxsPSIjY2Y4YjE3Ii8+PHBhdGggZD0iTTIzOS45OTA2MiwxODkuMDA5MzhjLTAuMywwLjEgLTAuNiwwIC0wLjksLTAuM2wtNC40LC00LjRjLTAuMywtMC4yIC0wLjMsLTAuNiAwLC0wLjlsNC40LC00LjRjMC4xLC0wLjEgMC4yLC0wLjIgMC40LC0wLjJjMC40LDAgMC43LDAuMyAwLjcsMC43djIuNGMxLDAuMiAxLjksMC4xIDIuOCwtMC4yYzEuMSwtMC40IDIsLTEuMSAyLjYsLTJjMC43LC0xIDEsLTIuMSAxLC0zLjNjMCwtMS4yIC0wLjQsLTIuNCAtMS4xLC0zLjR2MGMtMC4zLC0wLjMgLTAuMywtMC45IDAuMSwtMS4yYzAuMywtMC4zIDAuOSwtMC4zIDEuMiwwLjFjMS4xLDEuMiAxLjksMi44IDIuMSw0LjRjMC4zLDEuNiAwLDMuNCAtMC44LDQuOWMtMC44LDEuNiAtMiwyLjkgLTMuNiwzLjdjLTEuMywwLjcgLTIuNywxIC00LjIsMWwwLDIuNmMwLDAuMiAwLDAuNCAtMC4zLDAuNXoiIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2luZGV4JnF1b3Q7Om51bGx9IiBmaWxsPSIjZmZmZmZmIi8+PC9nPjwvZz48L3N2Zz48IS0tcm90YXRpb25DZW50ZXI6Ni40NTkzNzUwMDAwMDAwMjM6OS4yMTU2MjUwMDAwMDAwMTctLT4=";

      /**
       * Icon used for blocks that break or skip
       * parts of a script.
       * @const
       */
      this.breakIcon =
        "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxOS4zOTM3NSIgaGVpZ2h0PSIxNi40NjI1IiB2aWV3Qm94PSIwLDAsMTkuMzkzNzUsMTYuNDYyNSI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIzMi4wNzUwMSwtMTcyLjI1KSI+PGcgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aXNQYWludGluZ0xheWVyJnF1b3Q7OnRydWV9IiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTI1MS4wMDAwMSwxODMuNzYyNWwtNC41LDQuNWMtMC43LDAuNiAtMS43LDAuNiAtMi40LDBsLTQuNCwtNC40Yy0wLjMsLTAuMyAtMC41LC0wLjggLTAuNSwtMS4yYzAsLTEgMC44LC0xLjcgMS43LC0xLjdoMS41YzAsLTEuNCAtMC43LC0yLjcgLTEuOCwtMy41Yy0wLjgsLTAuNiAtMS43LC0wLjkgLTIuNywtMC45Yy0xLDAgLTIsMC4zIC0yLjksMC45bC0wLjEsMGMtMC43LDAuNSAtMS43LDAuNCAtMi4zLC0wLjJjLTAuNywtMC43IC0wLjcsLTEuOSAwLC0yLjZjMS40LC0xLjIgMy4xLC0yIDQuOSwtMi4zYzEuOSwtMC4zIDMuOCwwIDUuNSwwLjljMS44LDAuOSAzLjIsMi40IDQuMSw0LjFjMC42LDEuMSAxLDIuMyAxLjEsMy42aDEuNmMwLjYsMCAxLjIsMC40IDEuNSwxYzAuMywwLjYgMC4yLDEuMyAtMC4zLDEuOHoiIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2luZGV4JnF1b3Q7Om51bGx9IiBmaWxsPSIjY2Y4YjE3Ii8+PHBhdGggZD0iTTI1MC4zMDAwMiwxODIuMjYyNTFjMC4xLDAuMyAwLDAuNiAtMC4zLDAuOWwtNC40LDQuNGMtMC4yLDAuMyAtMC42LDAuMyAtMC45LDBsLTQuNCwtNC40Yy0wLjEsLTAuMSAtMC4yLC0wLjIgLTAuMiwtMC40YzAsLTAuNCAwLjMsLTAuNyAwLjcsLTAuN2wyLjQsMGMwLjIsLTEgMC4xLC0xLjkgLTAuMiwtMi44Yy0wLjQsLTEuMSAtMS4xLC0yIC0yLC0yLjZjLTEsLTAuNyAtMi4xLC0xIC0zLjMsLTFjLTEuMiwwIC0yLjQsMC40IC0zLjQsMS4xdjBjLTAuMywwLjMgLTAuOSwwLjMgLTEuMiwtMC4xYy0wLjMsLTAuMyAtMC4zLC0wLjkgMC4xLC0xLjJjMS4yLC0xLjEgMi44LC0xLjkgNC40LC0yLjFjMS42LC0wLjMgMy40LDAgNC45LDAuOGMxLjYsMC44IDIuOSwyIDMuNywzLjZjMC43LDEuMyAxLDIuNyAxLDQuMmwyLjYsMGMwLjIsMCAwLjQsMCAwLjUsMC4zeiIgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aW5kZXgmcXVvdDs6bnVsbH0iIGZpbGw9IiNmZmZmZmYiLz48L2c+PC9nPjwvc3ZnPjwhLS1yb3RhdGlvbkNlbnRlcjo3LjkyNDk5MDAwMDAwMDA5MzU6Ny43NTAwMDAwMDAwMDAwMjgtLT4=";

      /**
       * Overriding the isShadowArgumentReporter check
       * in order to add custom extension reporters to
       * the list.
       *
       * This can be used by other extensions safely.
       * Credit is appreciated.
       */
      vm.on("EXTENSION_ADDED", tryUseScratchBlocks);
      vm.on("BLOCKSINFO_UPDATE", tryUseScratchBlocks);

      tryUseScratchBlocks();

      function tryUseScratchBlocks() {
        if (!window.ScratchBlocks) return;
        vm.removeListener("EXTENSION_ADDED", tryUseScratchBlocks);
        vm.removeListener("BLOCKSINFO_UPDATE", tryUseScratchBlocks);

        const originalCheck =
          ScratchBlocks.scratchBlocksUtils.isShadowArgumentReporter;

        ScratchBlocks.scratchBlocksUtils.isShadowArgumentReporter = function (
          block
        ) {
          const result = originalCheck(block);
          if (result) return result;
          return block.isShadow() && regeneratedReporters.includes(block.type);
        };
      }

      /**
       * Override to add in the "output" and "outputShape"
       * extension block parameters. Used to create the inline
       * block shape.
       */
      const cbfsb = runtime._convertBlockForScratchBlocks.bind(runtime);
      runtime._convertBlockForScratchBlocks = function (
        blockInfo,
        categoryInfo
      ) {
        const res = cbfsb(blockInfo, categoryInfo);
        if (blockInfo.outputShape) {
          res.json.outputShape = blockInfo.outputShape;
        }
        if (blockInfo.output) {
          res.json.output = blockInfo.output;
        }
        return res;
      };
    }

    getInfo() {
      return {
        id: "lmsSpMoreControl",
        name: "More Control",
        color1: "#FFAB19",
        color2: "#EC9C13",
        color3: "#CF8B17",
        docsURI: "https://extensions.turbowarp.org/Lily/MoreControl/",
        blocks: [
          {
            opcode: "switch",
            blockType: Scratch.BlockType.CONDITIONAL,
            text: "switch [SWITCH]",
            arguments: {
              SWITCH: {
                type: null,
              },
            },
          },
          {
            opcode: "case",
            blockType: Scratch.BlockType.CONDITIONAL,
            text: "case [CASE]",
            arguments: {
              CASE: {
                type: Scratch.ArgumentType.STRING,
              },
            },
          },
          {
            opcode: "default",
            blockType: Scratch.BlockType.CONDITIONAL,
            text: "default",
            isTerminal: true,
          },
          {
            opcode: "runNextCaseWhen",
            blockType: Scratch.BlockType.COMMAND,
            text: "run next case when [CASE]",
            arguments: {
              CASE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "apple",
              },
            },
          },
          {
            opcode: "runNextCase",
            blockType: Scratch.BlockType.COMMAND,
            text: "run next case",
          },
          {
            opcode: "breakSwitch",
            blockType: Scratch.BlockType.COMMAND,
            text: "break switch [IMAGE]",
            isTerminal: true,
            arguments: {
              IMAGE: {
                type: Scratch.ArgumentType.IMAGE,
                dataURI: this.breakIcon,
              },
            },
          },
          {
            opcode: "continueSwitch",
            blockType: Scratch.BlockType.COMMAND,
            text: "continue switch [IMAGE]",
            isTerminal: true,
            arguments: {
              IMAGE: {
                type: Scratch.ArgumentType.IMAGE,
                dataURI: this.continueIcon,
              },
            },
          },
          "---",
          {
            opcode: "inline",
            blockType: Scratch.BlockType.INLINE,
            text: "inline",
          },
          {
            opcode: "inlineReturn",
            blockType: Scratch.BlockType.COMMAND,
            text: "return [VALUE]",
            arguments: {
              VALUE: {
                type: Scratch.ArgumentType.STRING,
              },
            },
            isTerminal: true,
          },
          "---",
          {
            opcode: "elseIf",
            text: ["if [CONDITION1] then", "else if [CONDITION2] then"],
            blockType: Scratch.BlockType.CONDITIONAL,
            branchCount: 2,
            arguments: {
              CONDITION1: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
              CONDITION2: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
            },
          },
          {
            opcode: "elseIfElse",
            text: ["if [CONDITION1] then", "else if [CONDITION2] then", "else"],
            blockType: Scratch.BlockType.CONDITIONAL,
            branchCount: 3,
            arguments: {
              CONDITION1: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
              CONDITION2: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
            },
          },
          {
            opcode: "funnyBlock",
            blockType: Scratch.BlockType.CONDITIONAL,
            text: [
              "if [1] then",
              "else if [2] then",
              "else if [3] then",
              "else if [4] then",
              "else if [5] then",
              "else if [6] then",
              "else if [7] then",
              "else if [8] then",
            ],
            hideFromPalette: this._showFunnyBlock(),
            branchCount: 8,
            arguments: {
              1: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
              2: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
              3: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
              4: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
              5: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
              6: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
              7: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
              8: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
            },
          },
          "---",
          {
            opcode: "waitDuration",
            blockType: Scratch.BlockType.LOOP,
            text: "wait [DURATION] [TYPE]",
            branchCount: -1,
            branchIconURI: null,
            arguments: {
              DURATION: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "frames",
                menu: "types",
              },
            },
          },
          {
            opcode: "waitDurationOrUntil",
            blockType: Scratch.BlockType.LOOP,
            text: "wait [DURATION] [TYPE] or until [CONDITION]",
            branchCount: -1,
            branchIconURI: null,
            arguments: {
              DURATION: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "types",
              },
              CONDITION: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
            },
          },
          {
            opcode: "restart",
            blockType: Scratch.BlockType.COMMAND,
            text: "restart script [IMAGE]",
            isTerminal: true,
            arguments: {
              IMAGE: {
                type: Scratch.ArgumentType.IMAGE,
                dataURI: this.repeatIcon,
              },
            },
          },
          "---",
          {
            opcode: "repeatDuration",
            blockType: Scratch.BlockType.LOOP,
            text: "repeat for [DURATION] seconds",
            arguments: {
              DURATION: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
            },
          },
          {
            opcode: "repeatDurationOrUntil",
            blockType: Scratch.BlockType.LOOP,
            text: "repeat [DURATION] or until [CONDITION]",
            arguments: {
              DURATION: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "types",
              },
              CONDITION: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
            },
          },
          "---",
          {
            blockType: Scratch.BlockType.XML,
            xml: `<block type="lmsSpMoreControl_for"><value name="I"><shadow type="lmsSpMoreControl_forArg"></shadow></value><value name="A"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="B"><shadow type="math_number"><field name="NUM">10</field></shadow></value><value name="STEP"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block><block type="lmsSpMoreControl_forUntil"><value name="I"><shadow type="lmsSpMoreControl_forArg"></shadow></value><value name="A"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="STEP"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block><block type="lmsSpMoreControl_forEachList"><value name="I"><shadow type="lmsSpMoreControl_forArg"></shadow></value><value name="LIST"><shadow type="lmsSpMoreControl_menu_lists"><field name="lists"></field></shadow></value><value name="STEP"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block><block type="lmsSpMoreControl_forEachArray"><value name="I"><shadow type="lmsSpMoreControl_forArg"></shadow></value><value name="ARRAY"><shadow type="text"><field name="TEXT">[]</field></shadow></value><value name="STEP"><shadow type="math_number"><field name="NUM">1</field></shadow></value></block>`,
          },
          {
            opcode: "for",
            blockType: Scratch.BlockType.LOOP,
            text: ["for [I] = [A] to [B]", "step by [STEP]"],
            branchIconURI: null,
            hideFromPalette: true,
            arguments: {
              I: {},
              A: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              B: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 10,
              },
              STEP: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
            },
          },
          {
            opcode: "forUntil",
            blockType: Scratch.BlockType.LOOP,
            text: ["for [I] = [A] until [CONDITION]", "step by [STEP]"],
            branchIconURI: null,
            hideFromPalette: true,
            arguments: {
              I: {},
              A: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              CONDITION: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
              STEP: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
            },
          },
          {
            opcode: "forEachList",
            blockType: Scratch.BlockType.LOOP,
            text: ["for each item [I] in [LIST]", "step by [STEP]"],
            branchIconURI: null,
            hideFromPalette: true,
            arguments: {
              I: {},
              LIST: {
                menu: "lists",
              },
              STEP: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
            },
          },
          {
            opcode: "forEachArray",
            blockType: Scratch.BlockType.LOOP,
            text: ["for each item [I] in array [ARRAY]", "step by [STEP]"],
            branchIconURI: null,
            hideFromPalette: true,
            arguments: {
              I: {},
              ARRAY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "[]",
              },
              STEP: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
            },
          },
          //TO DO: Make this dynamic and let people change the name
          {
            opcode: "forArg",
            blockType: Scratch.BlockType.REPORTER,
            hideFromPalette: true,
            text: "i",
          },
          "---",
          {
            // created by sharkpool
            opcode: "loopedCondition",
            blockType: Scratch.BlockType.LOOP,
            text: ["if [CONDITION1] start loop", "repeat until [CONDITION2]"],
            arguments: {
              CONDITION1: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
              CONDITION2: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
            },
            branchIconURI: null,
          },
          "---",
          {
            opcode: "stopTarget",
            blockType: Scratch.BlockType.COMMAND,
            text: "stop [TARGET]",
            arguments: {
              TARGET: {
                type: Scratch.ArgumentType.STRING,
                menu: "targetsMyself",
              },
            },
          },
          {
            opcode: "stopExceptTarget",
            blockType: Scratch.BlockType.COMMAND,
            text: "stop all except [TARGET]",
            arguments: {
              TARGET: {
                type: Scratch.ArgumentType.STRING,
                menu: "targetsMyself",
              },
            },
          },
          "---",
          {
            opcode: "startBlocks",
            blockType: Scratch.BlockType.CONDITIONAL,
            text: "start blocks",
            branchIconURI: this.junctionIcon,
          },
          {
            opcode: "withoutScreenRefresh",
            blockType: Scratch.BlockType.CONDITIONAL,
            text: "without screen refresh",
          },
          {
            opcode: "withScreenRefresh",
            blockType: Scratch.BlockType.CONDITIONAL,
            text: "with screen refresh",
          },
        ],
        menus: {
          types: {
            acceptReporters: true,
            items: ["frames", "seconds"],
          },
          lists: {
            acceptReporters: true,
            items: "_getLists",
          },
          targetsMyself: {
            acceptReporters: true,
            items: this._getTargets(true, true),
          },
          targets: {
            acceptReporters: true,
            items: this._getTargets(true, false),
          },
        },
      };
    }

    /**
     * Block Functions
     */

    switch(args, util) {
      const blockId = this._getPeekStack(util.thread);
      const blocks = util.thread.blockContainer;
      const block = blocks.getBlock(blockId);
      if (!block) return;

      block.switchValue = args.SWITCH;
      block.switchFalling = false;
      block.switchResponse = false;
      block.switchBroken = false;
      block.runNextCase = false;

      util.startBranch(1, false);
    }

    case(args, util) {
      const blockId = this._getPeekStack(util.thread);
      const outerC = this._getOuterCFromOpcode(
        util.thread,
        blockId,
        "lmsSpMoreControl_switch"
      );
      if (!outerC) return;

      if (
        outerC.switchValue === args.CASE ||
        outerC.switchFalling ||
        outerC.runNextCase
      ) {
        if (outerC.switchBroken) return;
        outerC.runNextCase = false;
        outerC.switchFalling = true;
        outerC.switchResponse = true;
        util.startBranch(1, false);
      }
    }

    default(args, util) {
      const blockId = this._getPeekStack(util.thread);
      const outerC = this._getOuterCFromOpcode(
        util.thread,
        blockId,
        "lmsSpMoreControl_switch"
      );
      if (!outerC) return;

      if (!outerC.switchResponse) {
        if (outerC.switchBroken) return;
        outerC.runNextCase = false;
        outerC.switchFalling = true;
        util.startBranch(1, false);
      }
    }

    runNextCaseWhen(args, util) {
      const blockId = this._getPeekStack(util.thread);
      const outerC = this._getOuterCFromOpcode(
        util.thread,
        blockId,
        "lmsSpMoreControl_switch"
      );
      if (!outerC) return;

      if (args.CASE === outerC.switchValue) {
        outerC.runNextCase = true;
      }
    }

    runNextCase(args, util) {
      const blockId = this._getPeekStack(util.thread);
      const outerC = this._getOuterCFromOpcode(
        util.thread,
        blockId,
        "lmsSpMoreControl_switch"
      );
      if (!outerC) return;

      outerC.runNextCase = true;
    }

    breakSwitch(args, util) {
      const blockId = this._getPeekStack(util.thread);
      const outerC = this._getOuterCFromOpcode(
        util.thread,
        blockId,
        "lmsSpMoreControl_switch"
      );
      if (!outerC) return;

      outerC.switchBroken = true;
    }

    continueSwitch(args, util) {
      const blockId = this._getPeekStack(util.thread);
      const outerC = this._getOuterCFromOpcode(
        util.thread,
        blockId,
        "lmsSpMoreControl_switch"
      );
      if (!outerC) return;

      outerC.runNextCase = false;
      outerC.switchFalling = false;
    }

    inline(args, util) {
      const target = util.target;
      const blockId = this._getPeekStack(util.thread);
      const blocks = target.blocks;
      if (!blocks.getBranch(blockId, 0)) return "";

      if (!util.thread.newThread) {
        // to do: use pushStack?
        util.thread.newThread = runtime._pushThread(
          blocks.getBranch(blockId, 0),
          target
        );
      }

      // this will only work in the interpreter for now
      const params = this._getParams(util.thread);
      const thread = util.thread.newThread;
      if (thread.peekStackFrame()) {
        thread.initParams();
        thread.peekStackFrame().params = params;
      }

      if (typeof thread.returnValue !== "undefined" || thread.status === 4) {
        let returnValue = thread.returnValue;
        delete util.thread.newThread;
        return returnValue ?? "";
      } else {
        util.thread.peekStackFrame().waitingReporter = true;
        util.yield();
      }
    }

    inlineReturn(args, util) {
      util.thread.returnValue = args.VALUE;
      util.stopThisScript();
    }

    elseIf(args) {
      const condition1 = Cast.toBoolean(args.CONDITION1);
      const condition2 = Cast.toBoolean(args.CONDITION2);
      if (condition1) {
        return 1;
      } else if (condition2) {
        return 2;
      }
    }

    elseIfElse(args) {
      const condition1 = Cast.toBoolean(args.CONDITION1);
      const condition2 = Cast.toBoolean(args.CONDITION2);
      if (condition1) {
        return 1;
      } else if (condition2) {
        return 2;
      } else {
        return 3;
      }
    }

    funnyBlock(args) {
      for (const arg in args) {
        if (args[arg]) {
          return arg;
        }
      }
    }

    waitDuration(args, util) {
      const type = Cast.toString(args.TYPE);
      if (type == "frames") {
        const duration = Math.round(Cast.toNumber(args.DURATION));
        if (typeof util.stackFrame.loopCounter === "undefined") {
          util.stackFrame.loopCounter = duration;
        }
        util.stackFrame.loopCounter--;
        if (util.stackFrame.loopCounter >= 0) {
          return true;
        }
      } else if (type == "seconds") {
        if (util.stackTimerNeedsInit()) {
          const duration = Math.max(0, 1000 * Cast.toNumber(args.DURATION));

          util.startStackTimer(duration);
          runtime.requestRedraw();
          return true;
        } else if (!util.stackTimerFinished()) {
          return true;
        }
      }
    }

    waitDurationOrUntil(args, util) {
      const type = Cast.toString(args.TYPE);
      if (type == "frames") {
        const duration = Math.round(Cast.toNumber(args.DURATION));
        if (typeof util.stackFrame.loopCounter === "undefined") {
          util.stackFrame.loopCounter = duration;
        }
        util.stackFrame.loopCounter--;
        if (util.stackFrame.loopCounter >= 0 && !args.CONDITION) {
          return true;
        }
      } else if (type == "seconds") {
        if (util.stackTimerNeedsInit()) {
          const duration = Math.max(0, 1000 * Cast.toNumber(args.DURATION));

          util.startStackTimer(duration);
          runtime.requestRedraw();
          return true;
        } else if (!util.stackTimerFinished() && !args.CONDITION) {
          return true;
        }
      }
    }

    restart(args, util) {
      runtime._restartThread(util.thread);
    }

    forArg(args, util) {
      const param = "i";
      const stackFrames = util.thread.stackFrames;
      if (typeof stackFrames === "undefined") return 0;

      const params = stackFrames[0].moreControlParams;
      if (typeof params === "undefined") return 0;
      if (typeof params[param] === "object")
        return JSON.stringify(params[param]);

      return params[param] ?? 0;
    }

    for(args, util) {
      const blockId = this._getPeekStack(util.thread);
      const block = util.target.blocks.getBlock(blockId);
      if (!block?.inputs?.I?.block) return;

      const reporter = util.target.blocks.getBlock(block.inputs.I.block);
      if (!reporter) return;

      const isVariable = reporter.opcode === "data_variable";
      let variable;
      if (isVariable) {
        const variableId = reporter.fields.VARIABLE.id;
        variable = util.target.lookupVariableById(variableId);
      }

      const param = "i";
      const params = util.thread.moreControlParams;

      const a = Cast.toNumber(args.A);
      const b = Cast.toNumber(args.B);
      let step = Cast.toNumber(args.STEP);
      if (step < 1) step = 1;

      if (typeof util.stackFrame.loopCounter === "undefined") {
        util.stackFrame.loopCounter = a;

        if (typeof params === "undefined") {
          util.thread.stackFrames[0].moreControlParams = {};
        }
      }

      if (util.stackFrame.loopCounter <= b) {
        util.thread.stackFrames[0].moreControlParams[param] =
          util.stackFrame.loopCounter;
        if (isVariable) variable.value = util.stackFrame.loopCounter;
        util.stackFrame.loopCounter += step;
        util.startBranch(1, true);
      }
    }

    forUntil(args, util) {
      const blockId = this._getPeekStack(util.thread);
      const block = util.target.blocks.getBlock(blockId);
      if (!block?.inputs?.I?.block) return;

      const reporter = util.target.blocks.getBlock(block.inputs.I.block);
      if (!reporter) return;

      const isVariable = reporter.opcode === "data_variable";
      let variable;
      if (isVariable) {
        const variableId = reporter.fields.VARIABLE.id;
        variable = util.target.lookupVariableById(variableId);
      }

      const param = "i";
      const params = util.thread.moreControlParams;

      const a = Cast.toNumber(args.A);
      const condition = Cast.toBoolean(args.CONDITION);
      let step = Cast.toNumber(args.STEP);
      if (step < 1) step = 1;

      if (typeof util.stackFrame.loopCounter === "undefined") {
        util.stackFrame.loopCounter = a;

        if (typeof params === "undefined") {
          util.thread.stackFrames[0].moreControlParams = {};
        }
      }

      if (!condition) {
        util.thread.stackFrames[0].moreControlParams[param] =
          util.stackFrame.loopCounter;
        if (isVariable) variable.value = util.stackFrame.loopCounter;
        util.stackFrame.loopCounter += step;
        util.startBranch(1, true);
      }
    }

    forEachList(args, util) {
      const blockId = this._getPeekStack(util.thread);
      const block = util.target.blocks.getBlock(blockId);
      if (!block?.inputs?.I?.block) return;

      const reporter = util.target.blocks.getBlock(block.inputs.I.block);
      if (!reporter) return;

      const isVariable = reporter.opcode === "data_variable";
      let variable;
      if (isVariable) {
        const variableId = reporter.fields.VARIABLE.id;
        variable = util.target.lookupVariableById(variableId);
      }

      const param = "i";
      const params = util.thread.moreControlParams;

      const listName = Cast.toString(args.LIST);
      const list = this._getVarObjectFromMenu(listName, util, "list");
      if (!list) return;

      let step = Cast.toNumber(args.STEP);
      if (step < 1) step = 1;

      if (typeof util.stackFrame.loopCounter === "undefined") {
        util.stackFrame.loopCounter = 0;

        if (typeof params === "undefined") {
          util.thread.stackFrames[0].moreControlParams = {};
        }
      }

      util.stackFrame.loopCounter += step;

      if (
        util.stackFrame.loopCounter <= list.value.length &&
        !util.thread.isBroken
      ) {
        const loopCounter = util.stackFrame.loopCounter;
        util.thread.stackFrames[0].moreControlParams[param] =
          list.value[loopCounter - 1];
        if (isVariable) variable.value = list.value[loopCounter - 1];
        return true;
      }
    }

    forEachArray(args, util) {
      const blockId = this._getPeekStack(util.thread);
      const block = util.target.blocks.getBlock(blockId);
      if (!block?.inputs?.I?.block) return;

      const reporter = util.target.blocks.getBlock(block.inputs.I.block);
      if (!reporter) return;

      const isVariable = reporter.opcode === "data_variable";
      let variable;
      if (isVariable) {
        const variableId = reporter.fields.VARIABLE.id;
        variable = util.target.lookupVariableById(variableId);
      }

      const param = "i";
      const params = util.thread.moreControlParams;

      let array;

      try {
        array = JSON.parse(args.ARRAY);
      } catch (e) {
        return;
      }

      let step = Cast.toNumber(args.STEP);
      if (step < 1) step = 1;

      if (typeof util.stackFrame.loopCounter === "undefined") {
        util.stackFrame.loopCounter = 0;

        if (typeof params === "undefined") {
          util.thread.stackFrames[0].moreControlParams = {};
        }
      }

      util.stackFrame.loopCounter += step;

      if (util.stackFrame.loopCounter <= array.length) {
        const loopCounter = util.stackFrame.loopCounter;
        util.thread.stackFrames[0].moreControlParams[param] =
          array[loopCounter - 1];
        if (isVariable) variable.value = array[loopCounter - 1];
        return true;
      }
    }

    repeatDuration(args, util) {
      if (util.stackTimerNeedsInit()) {
        const duration = Math.max(0, 1000 * Cast.toNumber(args.DURATION));

        util.startStackTimer(duration);
        runtime.requestRedraw();
        return true;
      } else if (!util.stackTimerFinished()) {
        return true;
      }
    }

    repeatDurationOrUntil(args, util) {
      const duration = Math.round(Cast.toNumber(args.DURATION));
      if (typeof util.stackFrame.loopCounter === "undefined") {
        util.stackFrame.loopCounter = duration;
      }
      util.stackFrame.loopCounter--;
      if (util.stackFrame.loopCounter >= 0) {
        return true;
      }
    }

    loopedCondition(args, util) {
      if (args.CONDITION1) {
        util.stackFrame.loopStart = true;
      }
      if (util.stackFrame.loopStart) {
        if (args.CONDITION2) {
          util.stackFrame.loopStart = false;
        } else {
          util.startBranch(1, true);
        }
      }
    }

    stopTarget(args, util) {
      const targetName = Cast.toString(args.TARGET);
      runtime.stopForTarget(this._getTargetFromMenu(targetName, util));
    }

    stopExceptTarget(args, util) {
      const targets = runtime.targets;
      const targetName = Cast.toString(args.TARGET);
      const exception = this._getTargetFromMenu(targetName, util);

      for (const target of targets) {
        if (target !== exception) runtime.stopForTarget(target);
      }
    }

    startBlocks(args, util) {
      const target = util.target;
      const blockId = this._getPeekStack(util.thread);
      const blocks = target.blocks;
      const branch = blocks.getBranch(blockId, 0);
      if (!branch) return;

      // todo: use pushStack?
      runtime._pushThread(branch, target);
    }

    withoutScreenRefresh(arg, util) {
      const stackFrame = util.thread.peekStackFrame();
      const previousWarp = stackFrame.warpMode;
      util.thread.peekStackFrame().warpMode = false;
      util.startBranch(1, false);
      util.thread.peekStackFrame().warpMode = previousWarp;
    }

    withScreenRefresh(arg, util) {
      const stackFrame = util.thread.peekStackFrame();
      const previousWarp = stackFrame.warpMode;
      util.thread.peekStackFrame().warpMode = true;
      util.startBranch(1, false);
      util.thread.peekStackFrame().warpMode = previousWarp;
    }

    /**
     * Utility Functions
     */

    /**
     * Get all procedure parameters in the thread.
     * We can't use thread.getParams().
     * @param {Object} thread The thread object.
     * @returns
     */
    _getParams(thread) {
      for (let i = thread.stackFrames.length - 1; i >= 0; i--) {
        const frame = thread.stackFrames[i];
        if (frame.params === null) {
          continue;
        }
        return frame.params;
      }
      return null;
    }

    /**
     * Get top stack item.
     * @param {Object} thread
     * @returns {string} Block ID on top of stack.
     */
    _getPeekStack(thread) {
      return thread.isCompiled
        ? thread.peekStack()
        : thread.peekStackFrame().op.id;
    }

    /**
     *
     * @param {Object} thread
     * @param {string} id
     * @returns {Object} Block object
     */
    _getBlockByID(thread, id) {
      return thread.blockContainer.getBlock(id);
    }

    /**
     * Attempt to determine with a block is contained
     * within a substack by descending down the substack.
     * @param {Object} thread Thread object.
     * @param {string} startId Block ID of the top of the substack.
     * @param {string} checkId Block ID we're checking is inside the substack.
     * @returns {boolean} True if checkId is inside the substack.
     */
    _isInSubstack(thread, startId, checkId) {
      let currentBlock = this._getBlockByID(thread, startId);
      if (!currentBlock || !checkId) return false;
      if (currentBlock.id === checkId) return true;

      while (currentBlock.next !== null) {
        const next = currentBlock.next;
        if (next === checkId) {
          return true;
        }
        currentBlock = this._getBlockByID(thread, currentBlock.next);
      }

      return false;
    }

    /**
     * Get the C-Block that a block is contained in
     * by ascending the current thread.
     * @param {Object} thread Thread object.
     * @param {string} startId The Block ID we're ascending from.
     * @returns {Object} The Block Object of the outermost C-Block.
     */
    _getOuterCBlock(thread, startId) {
      let block = this._getBlockByID(thread, startId);
      if (!block) return;
      if (!block.parent) return;

      while (block.parent) {
        block = this._getBlockByID(thread, block.parent);
        if (!block) return;
        if (!block.inputs.SUBSTACK) continue;

        const substackBlock = block.inputs.SUBSTACK.block;
        if (this._isInSubstack(thread, substackBlock, startId)) {
          return block;
        }
      }
    }

    /**
     * Continue getting the outermost C-Block until
     * we find one with a specific opcode.
     * @param {Object} thread Thread object.
     * @param {string} startId The Block ID we're ascending from.
     * @param {string} opcode The opcode we're checking for.
     * @returns The Block Object of the outermost C-Block with that opcode.
     */
    _getOuterCFromOpcode(thread, startId, opcode) {
      let currentC = this._getOuterCBlock(thread, startId);
      if (!currentC) return;

      while (currentC !== null && currentC.opcode !== opcode) {
        currentC = this._getOuterCBlock(thread, currentC.id);
      }
      return currentC;
    }

    /**
     * Determine if a block is contained within its own target.
     * @param {Object} thread Thread object.
     * @returns {boolean} True if block is within the palette.
     */
    isInPalette(thread) {
      return !Object.keys(thread.target.blocks._blocks).includes(
        thread.peekStack()
      );
    }

    /**
     * Convert a target menu value into a rendered target object.
     * @param {string} targetName The name of the target.
     * @param {Object} util BlockUtility object.
     * @returns {Object} The rendered target.
     */
    _getTargetFromMenu(targetName, util) {
      let target = runtime.getSpriteTargetByName(targetName);
      if (targetName === "_myself_") target = util.target;
      if (targetName === "_stage_") target = runtime.getTargetForStage();
      return target;
    }

    /**
     * Generate a menu for all sprite targets.
     * @param {boolean} stage True if we want to include the Stage.
     * @param {boolean} myself True if we want to include the executed target.
     * @returns {Array} The menu array containing names of targets.
     */
    _getTargets(stage, myself) {
      const spriteNames = [];
      if (stage) spriteNames.push({ text: "Stage", value: "_stage_" });
      if (myself) spriteNames.push({ text: "myself", value: "_myself_" });

      const targets = runtime.targets;
      for (let index = 1; index < targets.length; index++) {
        const targetName = targets[index].getName();
        spriteNames.push({
          text: targetName,
          value: targetName,
        });
      }
      if (spriteNames.length > 0) {
        return spriteNames;
      } else {
        return [{ text: "", value: 0 }]; //this should never happen but it's a failsafe
      }
    }

    /**
     * Convert a variable menu value into a variable object.
     * @param {string} name The name of the variable.
     * @param {Object} util BlockUtility object.
     * @param {string} type The type of variable we're looking for.
     * @returns {Object} The variable object.
     */
    _getVarObjectFromMenu = function (name, util, type) {
      const stageTarget = runtime.getTargetForStage();
      const target = util.target;
      let listObject = Object.create(null);

      listObject = stageTarget.lookupVariableByNameAndType(name, type);
      if (listObject) return listObject;
      listObject = target.lookupVariableByNameAndType(name, type);
      if (listObject) return listObject;
    };

    /**
     * Generate a menu for all accessible lists.
     * @returns {Array} The menu array containing names of lists.
     */
    _getLists() {
      const lists =
        typeof ScratchBlocks === "undefined"
          ? []
          : ScratchBlocks.getMainWorkspace()
              .getVariableMap()
              .getVariablesOfType("list")
              .map((model) => model.name);
      if (lists.length > 0) {
        return lists;
      } else {
        return [""];
      }
    }

    /**
     * Function used to show the very oversized if/else block.
     * @returns {boolean} True if username is "funny is allowed :)".
     */
    _showFunnyBlock() {
      return runtime.ioDevices.userData._username !== "funny is allowed :)";
    }
  }

  Scratch.extensions.register(new MoreControl());
})(Scratch);
