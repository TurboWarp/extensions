// Name: Pointerlock
// ID: pointerlock
// Description: Adds blocks for mouse locking. Mouse x & y blocks will report the change since the previous frame while the pointer is locked. Replaces the pointerlock experiment.

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("pointerlock extension must be run unsandboxed");
  }

  const vm = Scratch.vm;

  const canvas = vm.runtime.renderer.canvas;
  const mouse = vm.runtime.ioDevices.mouse;
  let isLocked = false;
  let isPointerLockEnabled = false;

  let rect = canvas.getBoundingClientRect();
  window.addEventListener("resize", () => {
    rect = canvas.getBoundingClientRect();
  });

  const postMouseData = (e, isDown) => {
    const { movementX, movementY } = e;
    const { width, height } = rect;
    const x = mouse._clientX + movementX;
    const y = mouse._clientY - movementY;
    mouse._clientX = x;
    mouse._scratchX = mouse.runtime.stageWidth * (x / width - 0.5);
    mouse._clientY = y;
    mouse._scratchY = mouse.runtime.stageWidth * (y / height - 0.5);
    if (typeof isDown === "boolean") {
      const data = {
        button: e.button,
        isDown,
      };
      originalPostIOData(data);
    }
  };

  const mouseDevice = vm.runtime.ioDevices.mouse;
  const originalPostIOData = mouseDevice.postData.bind(mouseDevice);
  mouseDevice.postData = (data) => {
    if (!isPointerLockEnabled) {
      return originalPostIOData(data);
    }
  };

  document.addEventListener(
    "mousedown",
    (e) => {
      // @ts-expect-error
      if (canvas.contains(e.target)) {
        if (isLocked) {
          postMouseData(e, true);
        } else if (isPointerLockEnabled) {
          canvas.requestPointerLock();
        }
      }
    },
    true
  );
  document.addEventListener(
    "mouseup",
    (e) => {
      if (isLocked) {
        postMouseData(e, false);
        // @ts-expect-error
      } else if (isPointerLockEnabled && canvas.contains(e.target)) {
        canvas.requestPointerLock();
      }
    },
    true
  );
  document.addEventListener(
    "mousemove",
    (e) => {
      if (isLocked) {
        postMouseData(e);
      }
    },
    true
  );

  document.addEventListener("pointerlockchange", () => {
    isLocked = document.pointerLockElement === canvas;
  });
  document.addEventListener("pointerlockerror", (e) => {
    // eslint-disable-next-line no-console
    console.error("Pointer lock error", e);
  });

  const oldStep = vm.runtime._step;
  vm.runtime._step = function (...args) {
    const ret = oldStep.call(this, ...args);
    if (isPointerLockEnabled) {
      const { width, height } = rect;
      mouse._clientX = width / 2;
      mouse._clientY = height / 2;
      mouse._scratchX = 0;
      mouse._scratchY = 0;
    }
    return ret;
  };

  class Pointerlock {
    getInfo() {
      return {
        id: "pointerlock",
        name: "Pointerlock",
        blocks: [
          {
            opcode: "setLocked",
            blockType: Scratch.BlockType.COMMAND,
            text: "set pointer lock [enabled]",
            arguments: {
              enabled: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "true",
                menu: "enabled",
              },
            },
          },
          {
            opcode: "isLocked",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "pointer locked?",
          },
        ],
        menus: {
          enabled: {
            acceptReporters: true,
            items: [
              {
                text: "enabled",
                value: "true",
              },
              {
                text: "disabled",
                value: "false",
              },
            ],
          },
        },
      };
    }

    setLocked(args) {
      isPointerLockEnabled = args.enabled === "true";
      if (!isPointerLockEnabled && isLocked) {
        document.exitPointerLock();
      }
    }

    isLocked() {
      return isLocked;
    }
  }

  Scratch.extensions.register(new Pointerlock());
})(Scratch);
