(function (Scratch) {
  'use strict';

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('Wake Lock extension must run unsandboxed');
  }

  let wakeLock = null;
  let working = false;

  class WakeLock {
    constructor(runtime, extensionId) {
      this.runtime = runtime;
      this.runtime.on('PROJECT_STOP_ALL', this.stopAll.bind(this));
    }
    stopAll() {
      if (working) {
        console.error('Already trying to activate/release Wake Lock.');
        return;
      }
      if (wakeLock) {
        working = true;
        wakeLock.release().then(() => {
          console.log('Wake Lock released due to stop.');
          wakeLock = null;
          working = false;
        });
      }
    }

    getInfo() {
      return {
        id: 'wakeLock',
        name: 'Wake Lock',
        docsURI: 'https://extensions.turbowarp.org/wake-lock',
        blocks: [
          {
            opcode: 'setWakeLock',
            blockType: Scratch.BlockType.COMMAND,
            text: 'turn wake lock [enabled]',
            arguments: {
              enabled: { type: Scratch.ArgumentType.MENU, menu: 'state', defaultValue: 'true' }
            }
          },
          {
            opcode: 'isLocked',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'is wake lock active?'
          }
        ],
        menus: {
          state: {
            acceptReporters: true,
            items: [
              {
                text: 'on',
                value: 'true'
              },
              {
                text: 'off',
                value: 'false'
              }
            ]
          }
        }
      };
    }
    async setWakeLock(args) {
      if (working) {
        console.error('Already trying to activate/release Wake Lock.');
        return;
      }
      if (Scratch.Cast.toBoolean(args.enabled) === true) {
        if (!wakeLock) {
          working = true;
          try {
            wakeLock = await navigator.wakeLock.request('screen');
            console.log('Wake Lock activated.');
          } catch (err) {
            console.error(err);
          }
          working = false;
        } else {
          console.log('Wake Lock already active.');
        }
      } else {
        if (wakeLock) {
          working = true;
          wakeLock.release().then(() => {
            console.log('Wake Lock released.');
            wakeLock = null;
            working = false;
          });
        } else {
          console.log('Wake Lock already inactive.');
        }
      }
    }
    isLocked() {
      return !!wakeLock;
    }
  }
  Scratch.extensions.register(new WakeLock(Scratch.vm.runtime));
})(Scratch);
