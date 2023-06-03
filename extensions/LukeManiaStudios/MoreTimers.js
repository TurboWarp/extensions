(function (Scratch) {
  'use strict';

  let timers = Object.create(null);
  const vm = Scratch.vm;
  const runtime = vm.runtime;

  class Timers {
    getInfo() {
      return {
        id: 'lmsTimers',
        name: 'More Timers',
        blocks: [
          {
            opcode: 'startTimer',
            blockType: Scratch.BlockType.COMMAND,
            extensions: ['colours_sensing'],
            text: 'start timer [TIMER]',
            arguments: {
              TIMER: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'timer'
              }
            }
          },
          {
            opcode: 'resetTimer',
            blockType: Scratch.BlockType.COMMAND,
            extensions: ['colours_sensing'],
            text: 'reset timer [TIMER]',
            arguments: {
              TIMER: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'timer'
              }
            }
          },
          {
            opcode: 'valueOfTimer',
            blockType: Scratch.BlockType.REPORTER,
            extensions: ['colours_sensing'],
            text: 'timer [TIMER]',
            arguments: {
              TIMER: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'timer'
              }
            }
          },

          '---',

          {
            opcode: 'setTimer',
            blockType: Scratch.BlockType.COMMAND,
            extensions: ['colours_sensing'],
            text: 'set timer [TIMER] to [NUM]',
            arguments: {
              TIMER: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'timer'
              },
              NUM: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '10'
              }
            }
          },
          {
            opcode: 'changeTimer',
            blockType: Scratch.BlockType.COMMAND,
            extensions: ['colours_sensing'],
            text: 'change timer [TIMER] by [NUM]',
            arguments: {
              TIMER: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'timer'
              },
              NUM: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '10'
              }
            }
          },

          '---',

          {
            opcode: 'removeTimer',
            blockType: Scratch.BlockType.COMMAND,
            extensions: ['colours_sensing'],
            text: 'remove timer [TIMER]',
            arguments: {
              TIMER: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'timer'
              },
            }
          },
          {
            opcode: 'removeTimers',
            blockType: Scratch.BlockType.COMMAND,
            extensions: ['colours_sensing'],
            text: 'remove all timers'
          },
          {
            opcode: 'timerExists',
            blockType: Scratch.BlockType.BOOLEAN,
            extensions: ['colours_sensing'],
            text: 'timer [TIMER] exists?',
            arguments: {
              TIMER: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'timer'
              },
            }
          },
          {
            opcode: 'listExistingTimers',
            blockType: Scratch.BlockType.REPORTER,
            extensions: ['colours_sensing'],
            text: 'list existing timers',
            disableMonitor: false
          }
        ]
      };
    }

    startTimer(args) {
      timers[args.TIMER] = Date.now();
    }

    resetTimer(args) {
      if (!timers[args.TIMER]) return;
      timers[args.TIMER] = Date.now();
    }

    valueOfTimer(args) {
      if (!timers[args.TIMER]) return '';
      return (Date.now() - timers[args.TIMER]) / 1000;
    }

    setTimer(args) {
      if (!timers[args.TIMER]) return;
      timers[args.TIMER] = Date.now() - (args.NUM * 1000);
    }

    changeTimer(args) {
      if (!timers[args.TIMER]) return;
      timers[args.TIMER] = (timers[args.TIMER] - (args.NUM * 1000));
    }

    removeTimers(args) {
      timers = Object.create(null);
    }

    removeTimer(args) {
      Reflect.deleteProperty(timers, args.TIMER);
    }

    timerExists(args) {
      return (timers[args.TIMER]) ? true : false;
    }

    listExistingTimers(args) {
      return Object.keys(timers).join(',');
    }
  }

  // "Extension" option reimplementation by Xeltalliv
  // https://github.com/Xeltalliv/extensions/blob/examples/examples/extension-colors.js

  const cbfsb = Scratch.vm.runtime._convertBlockForScratchBlocks.bind(Scratch.vm.runtime);
  Scratch.vm.runtime._convertBlockForScratchBlocks = function(blockInfo, categoryInfo) {
    const res = cbfsb(blockInfo, categoryInfo);
    if (blockInfo.extensions) {
      if (!res.json.extensions) res.json.extensions = [];
      res.json.extensions.push(...blockInfo.extensions);
    }
    return res;
  };

  Scratch.extensions.register(new Timers());
})(Scratch);
