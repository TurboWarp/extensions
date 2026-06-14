// Name: More Mouse Controls
// ID: legobrainbikerMoreMouseControls
// Description: Adds more options to detect properties of the mouse, including it's position, clicking, and wheel scrolling.
// By: legobrainbiker <https://scratch.mit.edu/users/legobrainbiker/>
// By: Den4ik-12 <https://scratch.mit.edu/users/Den4ik-12/>
// License: MPL-2.0

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error(
      'Extension "More Mouse Controls" must run unsandboxed! Please enable the unsandboxed mode when loading the extension.'
    );
  }

  const vm = Scratch.vm;
  const runtime = vm.runtime;
  const canvas = Scratch.renderer.canvas;
  const Cast = Scratch.Cast;

  const EXT_ID = "legobrainbikerMoreMouseControls";
  const EXT_ICON =
    "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgdmVyc2lvbj0iMS4xIgogICB3aWR0aD0iMjA1IgogICBoZWlnaHQ9IjIwNSIKICAgdmlld0JveD0iMCAwIDIwNSAyMDUiCiAgIGlkPSJzdmc4IgogICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxkZWZzCiAgICAgaWQ9ImRlZnM4IiAvPgogIDxwYXRoCiAgICAgZD0ibSAyLjUsMTAyLjUgYyAwLC01NS4yMjg0NyA0NC43NzE1MywtMTAwIDEwMCwtMTAwIDU1LjIyODQ3LDAgMTAwLDQ0Ljc3MTUzIDEwMCwxMDAgMCw1NS4yMjg0NyAtNDQuNzcxNTMsMTAwIC0xMDAsMTAwIC01NS4yMjg0NywwIC0xMDAsLTQ0Ljc3MTUzIC0xMDAsLTEwMCB6IgogICAgIGZpbGw9IiNlNzRjM2MiCiAgICAgc3Ryb2tlPSIjYjAzYTJlIgogICAgIHN0cm9rZS13aWR0aD0iNSIKICAgICBpZD0icGF0aDEiCiAgICAgc3R5bGU9Im1peC1ibGVuZC1tb2RlOm5vcm1hbDtmaWxsOiM5OWJiYmI7ZmlsbC1vcGFjaXR5OjE7ZmlsbC1ydWxlOm5vbnplcm87c3Ryb2tlOiM2MzdhN2E7c3Ryb2tlLWxpbmVjYXA6YnV0dDtzdHJva2UtbGluZWpvaW46bWl0ZXI7c3Ryb2tlLW1pdGVybGltaXQ6MTA7c3Ryb2tlLWRhc2hhcnJheTpub25lO3N0cm9rZS1kYXNob2Zmc2V0OjA7c3Ryb2tlLW9wYWNpdHk6MSIgLz4KICA8cGF0aAogICAgIGQ9Ik0gOTcuMTY3OTY5LDIzLjc1NzgxMiBDIDczLjI0MDQ5OSwyNi40Mzk0NjMgNTQuNjQ0NTMxLDQ2LjczODYxOSA1NC42NDQ1MzEsNzEuMzgwODU5IGwgLTAuMTk5MjE5LDIxLjMwNDY4OCA0Mi41NTg1OTQsMC4xNjAxNTYgMC4wMzUxNiwtNS41MjczNDQgYyAwLDAgLTEwLjQxNTQxMiwtNC4wMzk0NDggLTEwLjQ0NTMxMiwtMTEuNzM2MzI4IC0wLjAxNTc4LC00LjA2NTI0IC0wLjE3MDg2MiwtMTQuNTgwOTA4IDAuMDg1OTQsLTIzLjUxNzU3OCAwLjI0NywtOC41OTU1MiAxMS41NTQ2ODgsLTEyLjM4ODY3MiAxMS41NTQ2ODgsLTEyLjM4ODY3MiAwLDAgLTAuNTEzMTM2LC0xNS45Nzk5NjkgLTEuMDY2NDA2LC0xNS45MTc5NjkgeiBtIDEwLjY2NDA2MSwwIGMgLTAuNTUzMjgsLTAuMDYyMDEgLTEuMDY2NCwxNS45MTc5NjkgLTEuMDY2NCwxNS45MTc5NjkgLTFlLTUsMCAxMS4zMDc2OCwzLjc5MzE3MiAxMS41NTQ2OCwxMi4zODg2NzIgMC4yNTY4Myw4LjkzNjY3IDAuMTAxNzQsMTkuNDUyMzQ4IDAuMDg1OSwyMy41MTc1NzggLTAuMDI5OSw3LjY5Njg5IC0xMC40NDUzMSwxMS43MzYzMjggLTEwLjQ0NTMxLDExLjczNjMyOCBsIDAuMDM1Miw1LjUyNzM0NCA0Mi41NTg2LC0wLjE2MDE1NiAtMC4xOTkyMiwtMjEuMzA0Njg4IGMgMCwtMjQuNjQyMjYgLTE4LjU5NTk3LC00NC45NDEzODYgLTQyLjUyMzQ0LC00Ny42MjMwNDcgeiBtIC01LjI2NTYyLDI0LjgwMDc4MiBjIC0zLjM4MTQxNCwwIC02LjEyMzA1MSwyLjc0MTkzNyAtNi4xMjMwNTEsNi4xMjMwNDcgdiAxNy45MTYwMTUgYyAwLDMuMzgxMTEgMi43NDIyMzcsNi4xMjEwOTQgNi4xMjMwNTEsNi4xMjEwOTQgMy4zODA4MiwwIDYuMTIxMDksLTIuNzM5OTg0IDYuMTIxMDksLTYuMTIxMDk0IFYgNTQuNjgxNjQxIGMgMCwtMy4zODE0MSAtMi43Mzk3LC02LjEyMzA0NyAtNi4xMjEwOSwtNi4xMjMwNDcgeiBNIDU0LjY0NDUzMSwxMDIuODU5MzggdiAzMC40NjI4OSBjIDAsMjYuNDY2NyAyMS40NTU0MjIsNDcuOTE5OTIgNDcuOTE5OTE5LDQ3LjkxOTkyIDI2LjQ2NDUsMCA0Ny45MjE4OCwtMjEuNDUzMiA0Ny45MjE4OCwtNDcuOTE5OTIgdiAtMzAuNDYyODkgeiIKICAgICBzdHlsZT0iZmlsbDojZmZmZmZmO3N0cm9rZS1taXRlcmxpbWl0OjEwIgogICAgIGlkPSJwYXRoOCIgLz4KPC9zdmc+CjwhLS1yb3RhdGlvbkNlbnRlcjoxMDIuNToxMDIuNS0tPgoK";
  const BLOCK_ICON =
    "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjxzdmcKICAgdmVyc2lvbj0iMS4xIgogICB3aWR0aD0iMTE3LjMzMzMzIgogICBoZWlnaHQ9IjExNy4zMzMzMyIKICAgdmlld0JveD0iMCAwIDExNy4zMzMzMyAxMTcuMzMzMzMiCiAgIGlkPSJzdmcxNCIKICAgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIgogICB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcwogICAgIGlkPSJkZWZzMTQiIC8+CiAgPHBhdGgKICAgICBkPSJNIDU1LjA4OTUxNSw1LjgzNzQ4MyBDIDM5LjAzNjk1NSw3LjYzNjU2MzEgMjYuNTYyMTcxLDIxLjI1NDYwMSAyNi41NjIxNzEsMzcuNzg2NzAxIGwgLTAuMTM0NzY1LDE0LjI5Mjk2OSAyOC41NTI3MzQsMC4xMDc0MjIgMC4wMjM0NCwtMy43MDcwMzEgYyAwLDAgLTYuOTg3NzEzLC0yLjcxMTI4IC03LjAwNzgxMywtNy44NzUgLTAuMDEwNywtMi43MjczMSAtMC4xMTU2NDksLTkuNzgxODc0IDAuMDU2NjQsLTE1Ljc3NzM0NCAwLjE2NTcxLC01Ljc2NjYxIDcuNzUxOTUzLC04LjMxMDU0NyA3Ljc1MTk1MywtOC4zMTA1NDcgMCwwIC0wLjM0MzY2NCwtMTAuNzIxMjg2OSAtMC43MTQ4NDQsLTEwLjY3OTY4NyB6IG0gNy4xNTQyOTcsMCBjIC0wLjM3MTE5LC0wLjA0MTU5IC0wLjcxNDg0NCwxMC42Nzk2ODcgLTAuNzE0ODQ0LDEwLjY3OTY4NyAwLDAgNy41ODYyNDQsMi41NDM5NDcgNy43NTE5NTMsOC4zMTA1NDcgMC4xNzIyNCw1Ljk5NTQ3IDAuMDY3MjQsMTMuMDUwMDQ0IDAuMDU2NjQsMTUuNzc3MzQ0IC0wLjAyMDA4LDUuMTYzNzIgLTcuMDA3ODEyLDcuODc1IC03LjAwNzgxMiw3Ljg3NSBsIDAuMDIzNDQsMy43MDcwMzEgMjguNTUyNzM0LC0wLjEwNzQyMiAtMC4xMzQ3NjUsLTE0LjI5Mjk2OSBjIDAsLTE2LjUzMjA4OSAtMTIuNDc0Nzg0LC0zMC4xNTAxMzggLTI4LjUyNzM0NCwtMzEuOTQ5MjE4IHogbSAtMy41MzMyMDMsMTYuNjM4NjcyIGMgLTIuMjY4NTMsMCAtNC4xMDc0MjIsMS44MzkwODIgLTQuMTA3NDIyLDQuMTA3NDIxIHYgMTIuMDE5NTMyIGMgMCwyLjI2ODMyIDEuODM5MjkyLDQuMTA3NDIyIDQuMTA3NDIyLDQuMTA3NDIyIDIuMjY4MTQsMCA0LjEwNzQyMiwtMS44MzkwODIgNC4xMDc0MjIsLTQuMTA3NDIyIFYgMjYuNTgzNTc2IGMgMCwtMi4yNjg1MjkgLTEuODM4OTAyLC00LjEwNzQyMSAtNC4xMDc0MjIsLTQuMTA3NDIxIHogTSAyNi41NjIxNzEsNTguOTA1ODQyIHYgMjAuNDM3NSBjIDAsMTcuNzU2MTIgMTQuMzkzODA4LDMyLjE0ODQzOCAzMi4xNDg0MzgsMzIuMTQ4NDM4IDE3Ljc1NDYzLDAgMzIuMTUwMzkxLC0xNC4zOTIzMjggMzIuMTUwMzkxLC0zMi4xNDg0MzggdiAtMjAuNDM3NSB6IgogICAgIHN0eWxlPSJmaWxsOiNmZmZmZmY7c3Ryb2tlOiMwMDAwMDA7c3Ryb2tlLXdpZHRoOjEwO3N0cm9rZS1taXRlcmxpbWl0OjEwO3N0cm9rZS1vcGFjaXR5OjAuMTQ5MDI7cGFpbnQtb3JkZXI6c3Ryb2tlIGZpbGwgbWFya2VycyIKICAgICBpZD0icGF0aDE0IiAvPgo8L3N2Zz4KPCEtLXJvdGF0aW9uQ2VudGVyOjU4LjY2NjY2NjY2NjY2NjY2OjU4LjY2NjY2NjY2NjY2NjY2LS0+Cgo=";

  const DELTA_MODES = ["pixels", "lines", "pages"];
  const SCROLL_AXISES = { X_AXIS: 0, Y_AXIS: 1, Z_AXIS: 2 };
  const SCROLL_DIRS = [
    { AXIS: "ax", NEG: "l", POS: "r" },
    { AXIS: "ay", NEG: "u", POS: "d" },
    { AXIS: "az", NEG: "o", POS: "i" },
  ];

  class MoreMouseControls {
    constructor() {
      this.mouseX = 0;
      this.mouseY = 0;
      this.wheelScrolled = false;
      this.wheelDelta = Object.assign(Object.create(null), {
        x: 0,
        y: 0,
        zoom: 0,
      });
      this.wheelDeltaMode = undefined;
      this.scrollDisabled = false;

      Scratch.vm.runtime.on("PROJECT_LOADED", () => {
        const stored = runtime.extensionStorage[EXT_ID];
        this.scrollDisabled = stored.scrollDisabled || false;
        runtime.ioDevices.mouse.usesRightClickDown = stored.contextMenuDisabled || false;
      });

      // An event listener is used instead of Mouse Wheel I/O API,
      // as the latter doesn't provide deltaZ and deltaMode.
      canvas.addEventListener(
        "wheel",
        (e) => {
          if (this.scrollDisabled) {
            e.preventDefault();
          }

          this.wheelScrolled = true;
          this.wheelDelta.x += e.deltaX;
          this.wheelDelta.y += e.deltaY;
          this.wheelDelta.zoom += e.deltaZ;
          this.wheelDeltaMode = DELTA_MODES[e.deltaMode];

          runtime.startHats(`${EXT_ID}_onScroll`);
          this._startOnScrollHats(e.deltaX, SCROLL_AXISES.X_AXIS);
          this._startOnScrollHats(e.deltaY, SCROLL_AXISES.Y_AXIS);
          this._startOnScrollHats(e.deltaZ, SCROLL_AXISES.Z_AXIS);
        },
        { passive: true }
      );
      runtime.on("AFTER_EXECUTE", () => {
        this.wheelScrolled = false;
        Object.assign(this.wheelDelta, {
          x: 0,
          y: 0,
          zoom: 0,
        });
      });

      const ogIoMousePostData = runtime.ioDevices.mouse.postData;
      // https://github.com/TurboWarp/scratch-vm/blob/develop/src/io/mouse.js
      runtime.ioDevices.mouse.postData = function(data) {
        if (typeof data.isDown !== "undefined") {
          // Do not trigger if down state has not changed.
          if (data.isDown === this._isDown) {
            ogIoMousePostData.call(this, data);
            return;
          }

          const button = data.button ?? 0;
          if (data.isDown) {
            runtime.startHats(`${EXT_ID}_onMouseDown`, {
              BUTTON: Cast.toString(button),
            });
          } else {
            runtime.startHats(`${EXT_ID}_onMouseUp`, {
              BUTTON: Cast.toString(button),
            });
          }
        }
        ogIoMousePostData.call(this, data);
      }

      document.addEventListener("mousemove", (e) => {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
      });
      document.addEventListener("mouseleave", (e) => {
        this.mouseX = NaN;
        this.mouseY = NaN;
        // This could be problematic for some projects.
        // It's not great to add another edge case.
      });
    }

    getInfo() {
      return {
        id: EXT_ID,
        name: Scratch.translate("More Mouse Controls"),
        menuIconURI: EXT_ICON,
        BLOCK_ICONURI: BLOCK_ICON,
        color1: "#99bbbb",
        color2: "#7a9696",
        color3: "#637a7a",
        blocks: [
          {
            opcode: "onMouseUp",
            blockType: Scratch.BlockType.EVENT,
            isEdgeActivated: false,
            shouldRestartExistingThreads: true,
            text: Scratch.translate("when [BUTTON] mouse button released"),
            arguments: {
              BUTTON: {
                menu: "BUTTON_TYPE",
                defaultValue: "0",
              },
            },
          },
          {
            opcode: "onMouseDown",
            blockType: Scratch.BlockType.EVENT,
            isEdgeActivated: false,
            shouldRestartExistingThreads: true,
            text: Scratch.translate("when [BUTTON] mouse button pressed"),
            arguments: {
              BUTTON: {
                menu: "BUTTON_TYPE",
                defaultValue: "0",
              },
            },
          },
          "---",
          {
            opcode: "onScrollInDir",
            blockType: Scratch.BlockType.EVENT,
            isEdgeActivated: false,
            text: Scratch.translate("when mouse wheel scrolled [SCROLL_DIR]"),
            arguments: {
              SCROLL_DIR: {
                menu: "SCROLL_DIRS",
                defaultValue: SCROLL_DIRS[SCROLL_AXISES.Y_AXIS].NEG,
              },
            },
          },
          {
            opcode: "onScroll",
            blockType: Scratch.BlockType.EVENT,
            isEdgeActivated: false,
            text: Scratch.translate("when mouse wheel scrolled"),
          },
          {
            opcode: "isScrolledInDir",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("mouse wheel scrolled [SCROLL_DIR]?"),
            arguments: {
              SCROLL_DIR: {
                menu: "SCROLL_DIRS",
                defaultValue: SCROLL_DIRS[SCROLL_AXISES.Y_AXIS].NEG,
              },
            },
          },
          {
            opcode: "isScrolled",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("mouse wheel scrolled?"),
          },
          {
            opcode: "getDelta",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("scroll delta [DELTA_TYPE]"),
            disableMonitor: true,
            arguments: {
              DELTA_TYPE: {
                menu: "DELTA_TYPE",
                defaultValue: "y",
              },
            },
          },
          {
            opcode: "getDeltaMode",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("scroll delta mode"),
          },
          "---",
          {
            opcode: "mouseGlobalX",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("global mouse x"),
          },
          {
            opcode: "mouseGlobalY",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("global mouse y"),
          },
          "---",
          {
            opcode: "toggleContextMenu",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("[TOGGLE] context menu"),
            arguments: {
              TOGGLE: {
                menu: "TOGGLE_TYPE",
              },
            },
          },
          {
            opcode: "toggleScroll",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("[TOGGLE] scrolling"),
            arguments: {
              TOGGLE: {
                menu: "TOGGLE_TYPE",
              },
            },
          },
        ],
        menus: {
          BUTTON_TYPE: {
            items: [
              {
                text: Scratch.translate("(0) primary"),
                value: "0",
              },
              {
                text: Scratch.translate("(1) middle"),
                value: "1",
              },
              {
                text: Scratch.translate("(2) secondary"),
                value: "2",
              },
              {
                text: Scratch.translate("(3) tertiary"),
                value: "3",
              },
              {
                text: Scratch.translate("(4) quaternary"),
                value: "4",
              },
            ],
          },
          SCROLL_DIRS: {
            items: [
              {
                text: Scratch.translate("up"),
                value: SCROLL_DIRS[SCROLL_AXISES.Y_AXIS].NEG,
              },
              {
                text: Scratch.translate("down"),
                value: SCROLL_DIRS[SCROLL_AXISES.Y_AXIS].POS,
              },
              {
                text: Scratch.translate("to the left"),
                value: SCROLL_DIRS[SCROLL_AXISES.X_AXIS].NEG,
              },
              {
                text: Scratch.translate("to the right"),
                value: SCROLL_DIRS[SCROLL_AXISES.X_AXIS].POS,
              },
              {
                text: Scratch.translate("out"),
                value: SCROLL_DIRS[SCROLL_AXISES.Z_AXIS].NEG,
              },
              {
                text: Scratch.translate("in"),
                value: SCROLL_DIRS[SCROLL_AXISES.Z_AXIS].POS,
              },
              {
                text: Scratch.translate("along the x-axis"),
                value: SCROLL_DIRS[SCROLL_AXISES.X_AXIS].AXIS,
              },
              {
                text: Scratch.translate("along the y-axis"),
                value: SCROLL_DIRS[SCROLL_AXISES.Y_AXIS].AXIS,
              },
              {
                text: Scratch.translate("along the z-axis (zoom)"),
                value: SCROLL_DIRS[SCROLL_AXISES.Z_AXIS].AXIS,
              },
            ],
          },
          DELTA_TYPE: {
            acceptReporters: true,
            items: [
              "x",
              "y",
              {
                text: Scratch.translate("zoom"),
                value: "zoom",
              },
            ],
          },
          TOGGLE_TYPE: {
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate("enable"),
                value: "enable",
              },
              {
                text: Scratch.translate("disable"),
                value: "disable",
              },
            ],
          },
        },
      };
    }

    _startOnScrollHats(delta, axis) {
      if (delta === 0) return;
      runtime.startHats(`${EXT_ID}_onScrollInDir`, {
        SCROLL_DIR: SCROLL_DIRS[axis].AXIS,
      });
      runtime.startHats(`${EXT_ID}_onScrollInDir`, {
        SCROLL_DIR: delta > 0
          ? SCROLL_DIRS[axis].POS
          : SCROLL_DIRS[axis].NEG,
      });
    }

    buttonPressed(args, util) {
      const button = Cast.toNumber(args.BUTTON);
      return util.ioQuery("mouse", "getButtonIsDown", [button]);
    }

    isScrolledInDir(args) {
      if (!this.wheelScrolled) return false;
      const scrollDir = Cast.toString(args.SCROLL_DIR);
      const wheelDeltaArray = [this.wheelDelta.x, this.wheelDelta.y, this.wheelDelta.zoom];
      SCROLL_DIRS.forEach((axisEnums, i) => {
        if (scrollDir === axisEnums.AXIS && wheelDeltaArray[i] !== 0) return true;
        if (scrollDir === axisEnums.NEG && wheelDeltaArray[i] < 0) return true;
        if (scrollDir === axisEnums.POS && wheelDeltaArray[i] > 0) return true;
      });
      return false;
    }

    isScrolled() {
      return this.wheelScrolled;
    }

    getDelta(args) {
      const deltaType = Cast.toString(args.DELTA_TYPE);
      return this.wheelDelta[deltaType] ?? NaN;
    }

    getDeltaMode() {
      return this.wheelDeltaMode || "";
    }

    mouseGlobalX() {
      if (this.mouseX === NaN) return NaN;
      const canvasRect = canvas.getBoundingClientRect();
      const k = canvasRect.width / runtime.stageWidth;
      return (this.mouseX - canvasRect.x - canvasRect.width / 2) / k;
    }

    mouseGlobalY() {
      if (this.mouseY === NaN) return NaN;
      const canvasRect = canvas.getBoundingClientRect();
      const k = canvasRect.height / runtime.stageHeight;
      return -(this.mouseY - canvasRect.y - canvasRect.height / 2) / k;
    }

    toggleContextMenu(args) {
      const strToogle = Cast.toString(args.TOGGLE);
      const boolToggle = Cast.toBoolean(args.TOGGLE);
      if (strToogle === "enable") {
        runtime.ioDevices.mouse.usesRightClickDown = false;
      } else if (strToogle === "disable") {
        runtime.ioDevices.mouse.usesRightClickDown = true;
      } else {
        runtime.ioDevices.mouse.usesRightClickDown = !boolToggle;
      }
      runtime.extensionStorage[EXT_ID] = {
        ...(runtime.extensionStorage[EXT_ID] || {}),
        contextMenuDisabled: runtime.ioDevices.mouse.usesRightClickDown,
      };
    }

    toggleScroll(args) {
      const strToogle = Cast.toString(args.TOGGLE);
      const boolToggle = Cast.toBoolean(args.TOGGLE);
      if (strToogle === "enable") {
        this.scrollDisabled = false;
      } else if (strToogle === "disable") {
        this.scrollDisabled = true;
      } else {
        this.scrollDisabled = !boolToggle;
      }
      runtime.extensionStorage[EXT_ID] = {
        ...(runtime.extensionStorage[EXT_ID] || {}),
        scrollDisabled: this.scrollDisabled,
      };
    }
  }
  Scratch.extensions.register(new MoreMouseControls());
})(Scratch);
