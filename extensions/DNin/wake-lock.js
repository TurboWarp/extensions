// Name: Wake Lock
// ID: dninwakelock
// Description: Prevent the computer from falling asleep.
// By: D-ScratchNinja <https://scratch.mit.edu/users/D-ScratchNinja/>
// License: MIT

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("Wake Lock extension must run unsandboxed");
  }

  /** @type {WakeLockSentinel} */
  let wakeLock = null;
  let latestEnabled = false;
  let promise = Promise.resolve();

  class WakeLock {
    constructor(runtime) {
      this.runtime = runtime;
      this.runtime.on("PROJECT_STOP_ALL", this.stopAll.bind(this));

      document.addEventListener("visibilitychange", () => {
        // If enabled, reacquire wake lock when document becomes visible again
        if (wakeLock !== null && document.visibilityState === "visible") {
          latestEnabled = false;
          this.setWakeLock({
            enabled: true,
          });
        }
      });
    }

    getInfo() {
      return {
        id: "dninwakelock",
        name: Scratch.translate("Wake Lock"),
        docsURI: "https://extensions.turbowarp.org/DNin/wake-lock",
        blocks: [
          {
            opcode: "setWakeLock",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate({
              default: "turn wake lock [enabled]",
              description: "[enabled] is a drop down with items 'on' and 'off'",
            }),
            arguments: {
              enabled: {
                type: Scratch.ArgumentType.STRING,
                menu: "state",
                defaultValue: "true",
              },
            },
          },
          {
            opcode: "isLocked",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is wake lock active?"),
          },
        ],
        menus: {
          state: {
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate("on"),
                value: "true",
              },
              {
                text: Scratch.translate("off"),
                value: "false",
              },
            ],
          },
        },
      };
    }

    stopAll() {
      this.setWakeLock({
        enabled: false,
      });
    }

    setWakeLock(args) {
      if (!navigator.wakeLock) {
        // Not supported in this browser.
        return;
      }
      const enable = Scratch.Cast.toBoolean(args.enabled);
      if (enable && document.visibilityState === "hidden") {
        // Can't request wake lock while document is hidden.
        return;
      }

      const previousEnabled = latestEnabled;
      latestEnabled = enable;
      if (latestEnabled && !previousEnabled) {
        promise = promise
          .then(() => navigator.wakeLock.request("screen"))
          .then((sentinel) => {
            wakeLock = sentinel;
            wakeLock.addEventListener("release", () => {
              if (document.visibilityState === "visible") {
                // If the document is hidden, wake lock should be reacquired when it's visible again.
                wakeLock = null;
                latestEnabled = false;
              }
            });
          })
          .catch((error) => {
            console.error(error);
            // Allow to retry
            latestEnabled = false;
          });
        return promise;
      } else if (!latestEnabled && previousEnabled) {
        promise = promise
          .then(() => {
            if (wakeLock) {
              return wakeLock.release();
            } else {
              // Attempt to enable in the first place didn't work
            }
          })
          .then(() => {
            wakeLock = null;
          })
          .catch((error) => {
            console.error(error);
            wakeLock = null;
          });
        return promise;
      }
    }

    isLocked() {
      return !!wakeLock;
    }
  }

  Scratch.extensions.register(new WakeLock(Scratch.vm.runtime));
})(Scratch);
