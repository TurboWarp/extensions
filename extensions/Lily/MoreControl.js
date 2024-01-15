// Name: More Control
// ID: lmsSpAsMoreControl
// Description: More conditional and loop statements.
// By: LilyMakesThings <https://scratch.mit.edu/users/LilyMakesThings/>
// By: Ashime <https://scratch.mit.edu/users/0znzw/>
// By: SharkPool <https://scratch.mit.edu/users/DemonX5/>

(function (Scratch) {
  "use strict";

  const vm = Scratch.vm;
  const runtime = vm.runtime;
  const Cast = Scratch.Cast;

  const junctionIcon =
    "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxOS44MzUxOSIgaGVpZ2h0PSIxNy45OTM0OSIgdmlld0JveD0iMCwwLDE5LjgzNTE5LDE3Ljk5MzQ5Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjEyLjc0ODAyLC0xNzEuODc3OTEpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTIyNS44MzMyMSwxODMuOTc3OTFjLTAuNiwtMC4zIC0xLC0wLjkgLTEsLTEuNXYtMS42Yy0xLjMsLTAuMSAtMi41LC0wLjUgLTMuNiwtMS4xYy0xLjcsLTAuOSAtMy4yLC0yLjMgLTQuMSwtNC4xYy0wLjksLTEuNyAzLjk1ODI3LC0zLjYyNzk3IDMuOTU4MjcsLTMuNjI3OTdjMCwwIC0wLjA5NTI5LDAuOTYxMDIgMC44OTUxNCwxLjg0ODk1YzEuMjU3ODYsMS4xMjc3IDIuMjc3NTgsMS4xNzkwMiAyLjg0NjYsMS4xNzkwMnYtMS41YzAsLTAuOSAwLjcsLTEuNyAxLjcsLTEuN2MwLjQsMCAwLjksMC4yIDEuMiwwLjVsNC40LDQuNGMwLjYsMC43IDAuNiwxLjcgMCwyLjRsLTQuNSw0LjVjLTAuNSwwLjUgLTEuMiwwLjYgLTEuOCwwLjN6IiBmaWxsPSIjY2Y4YjE3IiBzdHJva2Utd2lkdGg9IjEiLz48cGF0aCBkPSJNMjE1LjQ5ODU3LDE4My45MDI3OGwxLC0xMS44OTU1Nmg0LjY1MDAxbDEuMTE3NjUsMTEuODk1NTZ6IiBmaWxsPSIjY2Y4YjE3IiBzdHJva2Utd2lkdGg9IjAiLz48cGF0aCBkPSJNMjEyLjkxNjc3LDE4My4xMjE0YzAuMywtMC42IDAuOSwtMSAxLjUsLTFoMS42aDUuOGgxLjVjMC45LDAgMS43LDAuNyAxLjcsMS43YzAsMC40IC0wLjIsMC45IC0wLjUsMS4ybC00LjQsNC40Yy0wLjcsMC42IC0xLjcsMC42IC0yLjQsMGwtNC41LC00LjVjLTAuNSwtMC41IC0wLjYsLTEuMiAtMC4zLC0xLjh6IiBmaWxsPSIjY2Y4YjE3IiBzdHJva2Utd2lkdGg9IjEiLz48cGF0aCBkPSJNMjE2LjUwNDU3LDE4NC4zMjk1N2wwLjgyMzUzLC0xMS40NjIzNGgyLjgxNDQ3bDEuMTE3NjUsMTEuNDYyMzR6IiBmaWxsPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjAiLz48cGF0aCBkPSJNMjE0LjQ3Nzc0LDE4My4xMjE0bDksMC4xYzAuNCwwIDAuNywwLjMgMC43LDAuN2MwLDAuMiAtMC4xLDAuMyAtMC4yLDAuNGwtNC40LDQuNGMtMC4zLDAuMyAtMC43LDAuMyAtMC45LDBsLTQuNCwtNC40Yy0wLjMsLTAuMyAtMC40LC0wLjYgLTAuMywtMC45YzAuMSwtMC4zIDAuMywtMC4zIDAuNSwtMC4zeiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxIi8+PHBhdGggZD0iTTIyNS43NzIyNCwxODIuNjYwODJ2LTIuNmMtMS41LDAgLTIuOSwtMC4zIC00LjIsLTFjLTEuNiwtMC44IC0yLjgsLTIuMSAtMy42LC0zLjdjLTAuMjE3NjYsLTAuNDA4MTEgLTAuMzk4MywtMC44Mzg0MiAtMC41Mzk5MiwtMS4yODA4OGMtMC4zNzg5LC0xLjE4Mzc4IDIuNjYwNSwtMS4xNDg2NyAyLjY2MDUsLTEuMTQ4NjdjMCwwIDAuMjM2NTcsMC43MjU0NyAwLjM3OTQyLDAuOTI5NTRjMC42LDAuOSAxLjUsMS42IDIuNiwyYzAuOSwwLjMgMS44LDAuNCAyLjgsMC4ydi0yLjRjMCwtMC40IDAuMywtMC43IDAuNywtMC43YzAuMiwwIDAuMywwLjEgMC40LDAuMmw0LjQsNC40YzAuMywwLjMgMC4zLDAuNyAwLDAuOWwtNC40LDQuNGMtMC4zLDAuMyAtMC42LDAuNCAtMC45LDAuM2MtMC4zLC0wLjEgLTAuMywtMC4zIC0wLjMsLTAuNXoiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMSIvPjwvZz48L2c+PC9zdmc+PCEtLXJvdGF0aW9uQ2VudGVyOjI3LjI1MTk4MDAwMDAwMDAwMzo4LjEyMjA4OTk5OTk5OTk4Ni0tPg==";
  const repeatIcon =
    "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgaGVpZ2h0PSIyNCIKICAgd2lkdGg9IjI0IgogICB4bWw6c3BhY2U9InByZXNlcnZlIgogICBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAyNCAyNDsiCiAgIHZpZXdCb3g9IjAgMCAyNCAyNCIKICAgeT0iMHB4IgogICB4PSIwcHgiCiAgIGlkPSJyZXBlYXQiCiAgIHZlcnNpb249IjEuMSIKICAgc29kaXBvZGk6ZG9jbmFtZT0icmVwZWF0ICgyKS5zdmciCiAgIHhtbG5zOmlua3NjYXBlPSJodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy9uYW1lc3BhY2VzL2lua3NjYXBlIgogICB4bWxuczpzb2RpcG9kaT0iaHR0cDovL3NvZGlwb2RpLnNvdXJjZWZvcmdlLm5ldC9EVEQvc29kaXBvZGktMC5kdGQiCiAgIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIKICAgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnMKICAgaWQ9ImRlZnMxMyIgLz48c29kaXBvZGk6bmFtZWR2aWV3CiAgIGlkPSJuYW1lZHZpZXcxMSIKICAgcGFnZWNvbG9yPSIjZmZmZmZmIgogICBib3JkZXJjb2xvcj0iIzAwMDAwMCIKICAgYm9yZGVyb3BhY2l0eT0iMC4yNSIKICAgaW5rc2NhcGU6c2hvd3BhZ2VzaGFkb3c9IjIiCiAgIGlua3NjYXBlOnBhZ2VvcGFjaXR5PSIwLjAiCiAgIGlua3NjYXBlOnBhZ2VjaGVja2VyYm9hcmQ9IjAiCiAgIGlua3NjYXBlOmRlc2tjb2xvcj0iI2QxZDFkMSIgLz4KPHN0eWxlCiAgIHR5cGU9InRleHQvY3NzIgogICBpZD0ic3R5bGUyIj4KCS5zdDB7ZmlsbDojQ0Y4QjE3O30KCS5zdDF7ZmlsbDojRkZGRkZGO30KPC9zdHlsZT4KPHRpdGxlCiAgIGlkPSJ0aXRsZTQiPnJlcGVhdDwvdGl0bGU+CjxwYXRoCiAgIGQ9Ik0yMy4zLDExYy0wLjMsMC42LTAuOSwxLTEuNSwxaC0xLjZjLTAuMSwxLjMtMC41LDIuNS0xLjEsMy42Yy0wLjksMS43LTIuMywzLjItNC4xLDQuMSAgYy0xLjcsMC45LTMuNiwxLjItNS41LDAuOWMtMS44LTAuMy0zLjUtMS4xLTQuOS0yLjNjLTAuNy0wLjctMC43LTEuOSwwLTIuNmMwLjYtMC42LDEuNi0wLjcsMi4zLTAuMkg3YzAuOSwwLjYsMS45LDAuOSwyLjksMC45ICBzMS45LTAuMywyLjctMC45YzEuMS0wLjgsMS44LTIuMSwxLjgtMy41aC0xLjVjLTAuOSwwLTEuNy0wLjctMS43LTEuN2MwLTAuNCwwLjItMC45LDAuNS0xLjJsNC40LTQuNGMwLjctMC42LDEuNy0wLjYsMi40LDBMMjMsOS4yICBDMjMuNSw5LjcsMjMuNiwxMC40LDIzLjMsMTF6IgogICBjbGFzcz0ic3QwIgogICBpZD0icGF0aDYiIC8+CjxwYXRoCiAgIGQ9Ik0yMS44LDExaC0yLjZjMCwxLjUtMC4zLDIuOS0xLDQuMmMtMC44LDEuNi0yLjEsMi44LTMuNywzLjZjLTEuNSwwLjgtMy4zLDEuMS00LjksMC44Yy0xLjYtMC4yLTMuMi0xLTQuNC0yLjEgIGMtMC40LTAuMy0wLjQtMC45LTAuMS0xLjJjMC4zLTAuNCwwLjktMC40LDEuMi0wLjFsMCwwYzEsMC43LDIuMiwxLjEsMy40LDEuMXMyLjMtMC4zLDMuMy0xYzAuOS0wLjYsMS42LTEuNSwyLTIuNiAgYzAuMy0wLjksMC40LTEuOCwwLjItMi44aC0yLjRjLTAuNCwwLTAuNy0wLjMtMC43LTAuN2MwLTAuMiwwLjEtMC4zLDAuMi0wLjRsNC40LTQuNGMwLjMtMC4zLDAuNy0wLjMsMC45LDBMMjIsOS44ICBjMC4zLDAuMywwLjQsMC42LDAuMywwLjlTMjIsMTEsMjEuOCwxMXoiCiAgIGNsYXNzPSJzdDEiCiAgIGlkPSJwYXRoOCIgLz4KPC9zdmc+CjwhLS1yb3RhdGlvbkNlbnRlcjoxMjoxMi0tPgoK";
  const continueIcon =
    "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxNi40NjI1IiBoZWlnaHQ9IjE5LjM5Mzc1IiB2aWV3Qm94PSIwLDAsMTYuNDYyNSwxOS4zOTM3NSI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIzMy41NDA2MiwtMTcwLjc4NDM3KSI+PGcgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aXNQYWludGluZ0xheWVyJnF1b3Q7OnRydWV9IiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTIzOC40OTA2MywxODkuNzA5MzdsLTQuNSwtNC41Yy0wLjYsLTAuNyAtMC42LC0xLjcgMCwtMi40bDQuNCwtNC40YzAuMywtMC4zIDAuOCwtMC41IDEuMiwtMC41YzEsMCAxLjcsMC44IDEuNywxLjdsMCwxLjVjMS40LDAgMi43LC0wLjcgMy41LC0xLjhjMC42LC0wLjggMC45LC0xLjcgMC45LC0yLjdjMCwtMSAtMC4zLC0yIC0wLjksLTIuOWwwLC0wLjFjLTAuNSwtMC43IC0wLjQsLTEuNyAwLjIsLTIuM2MwLjcsLTAuNyAxLjksLTAuNyAyLjYsMGMxLjIsMS40IDIsMy4xIDIuMyw0LjljMC4zLDEuOSAwLDMuOCAtMC45LDUuNWMtMC45LDEuOCAtMi40LDMuMiAtNC4xLDQuMWMtMS4xLDAuNiAtMi4zLDEgLTMuNiwxLjFsMCwxLjZjMCwwLjYgLTAuNCwxLjIgLTEsMS41Yy0wLjYsMC4zIC0xLjMsMC4yIC0xLjgsLTAuM3oiIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2luZGV4JnF1b3Q7Om51bGx9IiBmaWxsPSIjY2Y4YjE3Ii8+PHBhdGggZD0iTTIzOS45OTA2MiwxODkuMDA5MzhjLTAuMywwLjEgLTAuNiwwIC0wLjksLTAuM2wtNC40LC00LjRjLTAuMywtMC4yIC0wLjMsLTAuNiAwLC0wLjlsNC40LC00LjRjMC4xLC0wLjEgMC4yLC0wLjIgMC40LC0wLjJjMC40LDAgMC43LDAuMyAwLjcsMC43djIuNGMxLDAuMiAxLjksMC4xIDIuOCwtMC4yYzEuMSwtMC40IDIsLTEuMSAyLjYsLTJjMC43LC0xIDEsLTIuMSAxLC0zLjNjMCwtMS4yIC0wLjQsLTIuNCAtMS4xLC0zLjR2MGMtMC4zLC0wLjMgLTAuMywtMC45IDAuMSwtMS4yYzAuMywtMC4zIDAuOSwtMC4zIDEuMiwwLjFjMS4xLDEuMiAxLjksMi44IDIuMSw0LjRjMC4zLDEuNiAwLDMuNCAtMC44LDQuOWMtMC44LDEuNiAtMiwyLjkgLTMuNiwzLjdjLTEuMywwLjcgLTIuNywxIC00LjIsMWwwLDIuNmMwLDAuMiAwLDAuNCAtMC4zLDAuNXoiIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2luZGV4JnF1b3Q7Om51bGx9IiBmaWxsPSIjZmZmZmZmIi8+PC9nPjwvZz48L3N2Zz48IS0tcm90YXRpb25DZW50ZXI6Ni40NTkzNzUwMDAwMDAwMjM6OS4yMTU2MjUwMDAwMDAwMTctLT4=";
  const breakIcon =
    "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxOS4zOTM3NSIgaGVpZ2h0PSIxNi40NjI1IiB2aWV3Qm94PSIwLDAsMTkuMzkzNzUsMTYuNDYyNSI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIzMi4wNzUwMSwtMTcyLjI1KSI+PGcgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aXNQYWludGluZ0xheWVyJnF1b3Q7OnRydWV9IiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTI1MS4wMDAwMSwxODMuNzYyNWwtNC41LDQuNWMtMC43LDAuNiAtMS43LDAuNiAtMi40LDBsLTQuNCwtNC40Yy0wLjMsLTAuMyAtMC41LC0wLjggLTAuNSwtMS4yYzAsLTEgMC44LC0xLjcgMS43LC0xLjdoMS41YzAsLTEuNCAtMC43LC0yLjcgLTEuOCwtMy41Yy0wLjgsLTAuNiAtMS43LC0wLjkgLTIuNywtMC45Yy0xLDAgLTIsMC4zIC0yLjksMC45bC0wLjEsMGMtMC43LDAuNSAtMS43LDAuNCAtMi4zLC0wLjJjLTAuNywtMC43IC0wLjcsLTEuOSAwLC0yLjZjMS40LC0xLjIgMy4xLC0yIDQuOSwtMi4zYzEuOSwtMC4zIDMuOCwwIDUuNSwwLjljMS44LDAuOSAzLjIsMi40IDQuMSw0LjFjMC42LDEuMSAxLDIuMyAxLjEsMy42aDEuNmMwLjYsMCAxLjIsMC40IDEuNSwxYzAuMywwLjYgMC4yLDEuMyAtMC4zLDEuOHoiIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2luZGV4JnF1b3Q7Om51bGx9IiBmaWxsPSIjY2Y4YjE3Ii8+PHBhdGggZD0iTTI1MC4zMDAwMiwxODIuMjYyNTFjMC4xLDAuMyAwLDAuNiAtMC4zLDAuOWwtNC40LDQuNGMtMC4yLDAuMyAtMC42LDAuMyAtMC45LDBsLTQuNCwtNC40Yy0wLjEsLTAuMSAtMC4yLC0wLjIgLTAuMiwtMC40YzAsLTAuNCAwLjMsLTAuNyAwLjcsLTAuN2wyLjQsMGMwLjIsLTEgMC4xLC0xLjkgLTAuMiwtMi44Yy0wLjQsLTEuMSAtMS4xLC0yIC0yLC0yLjZjLTEsLTAuNyAtMi4xLC0xIC0zLjMsLTFjLTEuMiwwIC0yLjQsMC40IC0zLjQsMS4xdjBjLTAuMywwLjMgLTAuOSwwLjMgLTEuMiwtMC4xYy0wLjMsLTAuMyAtMC4zLC0wLjkgMC4xLC0xLjJjMS4yLC0xLjEgMi44LC0xLjkgNC40LC0yLjFjMS42LC0wLjMgMy40LDAgNC45LDAuOGMxLjYsMC44IDIuOSwyIDMuNywzLjZjMC43LDEuMyAxLDIuNyAxLDQuMmwyLjYsMGMwLjIsMCAwLjQsMCAwLjUsMC4zeiIgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aW5kZXgmcXVvdDs6bnVsbH0iIGZpbGw9IiNmZmZmZmYiLz48L2c+PC9nPjwvc3ZnPjwhLS1yb3RhdGlvbkNlbnRlcjo3LjkyNDk5MDAwMDAwMDA5MzU6Ny43NTAwMDAwMDAwMDAwMjgtLT4=";

  const hasOwn = (prop, object) => Object.hasOwn(object, prop);

  vm.on("EXTENSION_ADDED", tryUseScratchBlocks);
  vm.on("BLOCKSINFO_UPDATE", tryUseScratchBlocks);
  tryUseScratchBlocks();

  function tryUseScratchBlocks() {
    if (!window.ScratchBlocks) return;
    vm.removeListener("EXTENSION_ADDED", tryUseScratchBlocks);
    vm.removeListener("BLOCKSINFO_UPDATE", tryUseScratchBlocks);

    ScratchBlocks.scratchBlocksUtils.isShadowArgumentReporter = function (
      block
    ) {
      return (
        block.isShadow() &&
        (block.type == "argument_reporter_boolean" ||
          block.type == "argument_reporter_boolean" ||
          block.type == "argument_reporter_string_number" ||
          block.type == "lmsSpAsMoreControl_forArg")
      );
    };
  }

  const getVarObjectFromName = function (name, util, type) {
    const stageTarget = runtime.getTargetForStage();
    const target = util.target;
    let listObject = Object.create(null);

    listObject = stageTarget.lookupVariableByNameAndType(name, type);
    if (listObject) return listObject;
    listObject = target.lookupVariableByNameAndType(name, type);
    if (listObject) return listObject;
  };

  class MoreControl {
    getInfo() {
      return {
        id: "lmsSpAsMoreControl",
        name: "More Control",
        color1: "#FFAB19",
        color2: "#EC9C13",
        color3: "#CF8B17",
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
                dataURI: breakIcon,
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
                dataURI: continueIcon,
              },
            },
          },
          {
            opcode: "switchValue",
            blockType: Scratch.BlockType.REPORTER,
            text: "switch value",
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
                dataURI: repeatIcon,
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
            xml: '<block type="lmsSpAsMoreControl_for"><value name="I"><shadow type="lmsSpAsMoreControl_forArg"></shadow></value><value name="A"><shadow type="math_number"><field name="NUM">0</field></shadow></value><value name="B"><shadow type="math_number"><field name="NUM">10</field></shadow></value></block><block type="lmsSpAsMoreControl_forEachItem"><value name="I"><shadow type="lmsSpAsMoreControl_forArg"></shadow></value><value name="LIST"><shadow type="lmsSpAsMoreControl_menu_lists"><field name="lists"></field></shadow></value></block>',
          },
          {
            opcode: "for",
            blockType: Scratch.BlockType.LOOP,
            text: "for [I] = [A] to [B]",
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
            },
          },
          {
            opcode: "forEachItem",
            blockType: Scratch.BlockType.LOOP,
            text: "for each item [I] in [LIST]",
            hideFromPalette: true,
            arguments: {
              I: {},
              LIST: {
                menu: "lists",
              },
            },
          },
          {
            opcode: "forArg",
            blockType: Scratch.BlockType.REPORTER,
            hideFromPalette: true,
            text: "i",
          },
          "---",
          {
            // created by sharkpool
            opcode: "spayedCondition",
            blockType: Scratch.BlockType.LOOP,
            text: ["if [CON1] start loop", "repeat until [CON2]" + " "],
            arguments: {
              CON1: { type: Scratch.ArgumentType.BOOLEAN },
              CON2: { type: Scratch.ArgumentType.BOOLEAN },
            },
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
            opcode: "launch",
            blockType: Scratch.BlockType.CONDITIONAL,
            text: "launch",
            branchIconURI: junctionIcon,
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
            items: this._getTargets("stage", "myself"),
          },
          targets: {
            acceptReporters: true,
            items: this._getTargets("stage"),
          },
        },
      };
    }

    switch(args, util) {
      const blockId = util.thread.peekStack();
      const blocks = util.thread.blockContainer;
      const block = blocks.getBlock(blockId);

      block.switchValue = args.SWITCH;
      block.switchFalling = false;
      block.switchResponse = false;
      block.switchBroken = false;
      block.runNextCase = false;

      util.startBranch(1, false);
    }

    case(args, util) {
      const blockId = util.thread.peekStack();
      const outerC = this._getOuterCFromOpcode(
        util.thread,
        blockId,
        "lmsSpAsMoreControl_switch"
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
      const blockId = util.thread.peekStack();
      const outerC = this._getOuterCFromOpcode(
        util.thread,
        blockId,
        "lmsSpAsMoreControl_switch"
      );
      if (!outerC) return;

      if (
        !outerC.switchResponse ||
        outerC.switchFalling ||
        outerC.runNextCase
      ) {
        if (outerC.switchBroken) return;
        outerC.runNextCase = false;
        outerC.switchFalling = true;
        util.startBranch(1, false);
      }
    }

    runNextCaseWhen(args, util) {
      const blockId = util.thread.peekStack();
      const outerC = this._getOuterCFromOpcode(
        util.thread,
        blockId,
        "lmsSpAsMoreControl_switch"
      );
      if (!outerC) return;

      if (args.CASE === outerC.switchValue) {
        outerC.runNextCase = true;
      }
    }

    runNextCase(args, util) {
      const blockId = util.thread.peekStack();
      const outerC = this._getOuterCFromOpcode(
        util.thread,
        blockId,
        "lmsSpAsMoreControl_switch"
      );
      if (!outerC) return;

      outerC.runNextCase = true;
    }

    breakSwitch(args, util) {
      const blockId = util.thread.peekStack();
      const outerC = this._getOuterCFromOpcode(
        util.thread,
        blockId,
        "lmsSpAsMoreControl_switch"
      );
      if (!outerC) return;

      outerC.switchBroken = true;
    }

    continueSwitch(args, util) {
      const blockId = util.thread.peekStack();
      const outerC = this._getOuterCFromOpcode(
        util.thread,
        blockId,
        "lmsSpAsMoreControl_switch"
      );
      if (!outerC) return;

      outerC.runNextCase = false;
      outerC.switchFalling = false;
    }

    switchValue(args, util) {
      const blockId = util.thread.peekStack();
      const outerC = this._getOuterCFromOpcode(
        util.thread,
        blockId,
        "lmsSpAsMoreControl_switch"
      );
      if (!outerC) return "";

      return outerC.switchValue ?? "";
    }

    elseIf(args, util) {
      const condition1 = Cast.toBoolean(args.CONDITION1);
      const condition2 = Cast.toBoolean(args.CONDITION2);
      if (condition1) {
        return 1;
      } else if (condition2) {
        return 2;
      }
    }

    elseIfElse(args, util) {
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

      return params[param] ?? 0;
    }

    for(args, util) {
      const param = "i";
      const params = util.thread.moreControlParams;

      const a = Cast.toNumber(args.A);
      const b = Cast.toNumber(args.B);

      if (typeof util.stackFrame.loopCounter === "undefined") {
        util.stackFrame.loopCounter = a;

        if (typeof params === "undefined") {
          util.thread.stackFrames[0].moreControlParams = {};
        }
      }

      if (util.stackFrame.loopCounter <= b) {
        util.stackFrame.loopCounter++;
        util.thread.stackFrames[0].moreControlParams[param] =
          util.stackFrame.loopCounter;
        util.startBranch(1, true);
      }
    }

    forEachItem(args, util) {
      const listName = Cast.toString(args.LIST);
      const list = getVarObjectFromName(listName, util, "list");
      if (!list) return;

      const param = "i";
      const params = util.thread.moreControlParams;

      if (typeof util.stackFrame.loopCounter === "undefined") {
        util.stackFrame.loopCounter = 0;

        if (typeof params === "undefined") {
          util.thread.stackFrames[0].moreControlParams = {};
        }
      }

      util.stackFrame.loopCounter++;

      if (util.stackFrame.loopCounter <= list.value.length) {
        const loopCounter = util.stackFrame.loopCounter;
        util.thread.stackFrames[0].moreControlParams[param] =
          list.value[loopCounter - 1];
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

    spayedCondition(args, util) {
      if (typeof util.stackFrame.index === "undefined")
        util.stackFrame.index = 0;
      if (!Cast.toBoolean(args.CON1) && util.stackFrame.index === 0) {
        return false;
      } else {
        if (!Cast.toBoolean(args.CON2)) {
          util.stackFrame.index = 1;
          return true;
        } else {
          util.stackFrame.index = 0;
          return false;
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

    launch(args, util) {
      const target = util.target;
      const blockId = util.thread.peekStack();
      const blocks = target.blocks;
      if (!blocks.getBranch(blockId, 0)) return;

      runtime._pushThread(blocks.getBranch(blockId, 0), target);
    }

    /* Utility Functions */

    _getBlockByID(thread, id) {
      return thread.blockContainer.getBlock(id);
    }

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

    _getOuterCBlock(thread, startId) {
      let block = this._getBlockByID(thread, startId);
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

    _getOuterCFromOpcode(thread, startId, opcode) {
      let currentC = this._getOuterCBlock(thread, startId);
      while (currentC !== null && currentC.opcode !== opcode) {
        currentC = this._getOuterCBlock(thread, currentC.id);
      }
      return currentC;
    }

    until(conditionFunction) {
      const poll = (resolve) => {
        if (conditionFunction()) resolve();
        else runtime.once("AFTER_EXECUTE", (_) => poll(resolve));
      };
      return new Promise(poll);
    }

    isInPalette(thread) {
      return !Object.keys(thread.target.blocks._blocks).includes(
        thread.peekStack()
      );
    }

    _getTargetFromMenu(targetName, util) {
      let target = runtime.getSpriteTargetByName(targetName);
      if (targetName === "_myself_") target = util.target;
      if (targetName === "_stage_") target = runtime.getTargetForStage();
      return target;
    }

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

    _getLists() {
      // @ts-expect-error - ScratchBlocks not typed yet
      // eslint-disable-next-line no-undef
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
  }

  Scratch.extensions.register(new MoreControl());
})(Scratch);
