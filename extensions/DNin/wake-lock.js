// Name: Wake Lock
// ID: dninwakelock
// Description: Prevent the computer from falling asleep.
// By: D-ScratchNinja <https://scratch.mit.edu/users/D-ScratchNinja/>

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
    }

    getInfo() {
      return {
        id: "dninwakelock",
        name: "Wake Lock",
        docsURI: "https://extensions.turbowarp.org/DNin/wake-lock",
        blocks: [
          {
            opcode: "setWakeLock",
            blockType: Scratch.BlockType.COMMAND,
            text: "turn wake lock [enabled]",
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
            text: "is wake lock active?",
          },
        ],
        menus: {
          state: {
            acceptReporters: true,
            items: [
              {
                text: "on",
                value: "true",
              },
              {
                text: "off",
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

      const previousEnabled = latestEnabled;
      latestEnabled = Scratch.Cast.toBoolean(args.enabled);
      if (latestEnabled && !previousEnabled) {
        promise = promise
          .then(() => navigator.wakeLock.request("screen"))
          .then((sentinel) => {
            wakeLock = sentinel;
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
