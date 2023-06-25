(function (Scratch) {
  'use strict';
  
  const vm = Scratch.vm;
  const runtime = vm.runtime;
  
  let frameToggle = false;

  const stopIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAQlBMVEUAAAC/UFC8Q0OzTU24SEi4SEi3SEi4R0e4SEi4SEi4SEi4SEi7SUm8SUnMTk7MT0/OT0/PT0/gVVXiVVXsWVn///+CoOd2AAAAC3RSTlMAEBMUu7zLz9D8/dIXnJwAAAABYktHRBXl2PmjAAAAxklEQVRIx+3WwRKDIBAD0JWqVEOtWv7/W3twOqKwELzW3N9wYhORMMYiztgZUZMUAKxqmh5Kno/MG256nzI59Z2mB+BWH+XzUt5RhWoyQjFZkTQFkTBFERlCnAwlDoYUgaHFblpaeL86AK0MvNjMIABmT2cGIAAWniw3ucm/k9ovduEjXzgXtUfJmtrTt9VZzYH9FSB/xvfKZMsiLFmuko61zBTfucjL9RpXf6nEU2MhPxXS86J+kORmjz6V6seViOnG8oT7ApMcjsYZwhXCAAAAAElFTkSuQmCC';

  // Source:
  // https://github.com/TurboWarp/scratch-vm/blob/develop/src/io/keyboard.js
  // https://github.com/TurboWarp/scratch-blocks/blob/develop/blocks_vertical/event.js
  const validKeyboardInputs = [
    // Special Inputs
    { text: 'any', value: '_any_' },
    { text: 'space', value: 'space' },
    { text: 'left arrow', value: 'left arrow' },
    { text: 'up arrow', value: 'up arrow' },
    { text: 'right arrow', value: 'right arrow' },
    { text: 'down arrow', value: 'down arrow' },
    { text: 'enter', value: 'enter' },
    // TW: Extra Special Inputs
    { text: 'backspace', value: 'backspace' },
    { text: 'delete', value: 'delete' },
    { text: 'shift', value: 'shift' },
    { text: 'caps lock', value: 'caps lock' },
    { text: 'scroll lock', value: 'scroll lock' },
    { text: 'control', value: 'control' },
    { text: 'escape', value: 'escape' },
    { text: 'insert', value: 'insert' },
    { text: 'home', value: 'home' },
    { text: 'end', value: 'end' },
    { text: 'page up', value: 'page up' },
    { text: 'page down', value: 'page down' },
    // Letter Keyboard Inputs
    { text: 'a', value: 'a' },
    { text: 'b', value: 'b' },
    { text: 'c', value: 'c' },
    { text: 'd', value: 'd' },
    { text: 'e', value: 'e' },
    { text: 'f', value: 'f' },
    { text: 'g', value: 'g' },
    { text: 'h', value: 'h' },
    { text: 'i', value: 'i' },
    { text: 'j', value: 'j' },
    { text: 'k', value: 'k' },
    { text: 'l', value: 'l' },
    { text: 'm', value: 'm' },
    { text: 'n', value: 'n' },
    { text: 'o', value: 'o' },
    { text: 'p', value: 'p' },
    { text: 'q', value: 'q' },
    { text: 'r', value: 'r' },
    { text: 's', value: 's' },
    { text: 't', value: 't' },
    { text: 'u', value: 'u' },
    { text: 'v', value: 'v' },
    { text: 'w', value: 'w' },
    { text: 'x', value: 'x' },
    { text: 'y', value: 'y' },
    { text: 'z', value: 'z' },
    // Number Keyboard Inputs
    { text: '0', value: '0' },
    { text: '1', value: '1' },
    { text: '2', value: '2' },
    { text: '3', value: '3' },
    { text: '4', value: '4' },
    { text: '5', value: '5' },
    { text: '6', value: '6' },
    { text: '7', value: '7' },
    { text: '8', value: '8' },
    { text: '9', value: '9' },
  ];

  setInterval(() => {
    runtime.startHats('lmsMoreEvents_always', {
      CONDITION: 'true'
    });
    runtime.startHats('lmsMoreEvents_whileTurboMode', {
      STATE: (runtime.turboMode) ? 'enabled' : 'disabled'
    });
  });

  class MoreEvents {
    constructor() {
      runtime.on('STAGE_SIZE_CHANGED', () => {
        runtime.startHats('lmsMoreEvents_whenRuntimeOptionChanged', {
          OPTION: 'stage size'
        });
      });

      runtime.on('FRAMERATE_CHANGED', () => {
        runtime.startHats('lmsMoreEvents_whenRuntimeOptionChanged', {
          OPTION: 'framerate'
        });
      });

      runtime.on('INTERPOLATION_CHANGED', () => {
        runtime.startHats('lmsMoreEvents_whenRuntimeOptionChanged', {
          OPTION: 'interpolation'
        });
      });

      runtime.on('RUNTIME_OPTIONS_CHANGED', () => {
        runtime.startHats('lmsMoreEvents_whenAnyRuntimeOptionChanged');
      });

      runtime.on('EXTENSION_ADDED', () => {
        runtime.startHats('lmsMoreEvents_whenExtensionAdded');
      });
    }

    getInfo() {
      return {
        id: 'lmsMoreEvents',
        name: 'More Events',
        color1: '#FFBF00',
        color2: '#E6AC00',
        color3: '#CC9900',
        blocks: [
          /*
          {
            opcode: 'whenStopClicked',
            blockType: Scratch.BlockType.HAT,
            text: 'when [STOP] clicked',
            isEdgeActivated: false,
            arguments: {
              STOP: {
                type: Scratch.ArgumentType.IMAGE,
                dataURI: stopIcon
              }
            }
          },
          */
          {
            opcode: 'whenTrue',
            blockType: Scratch.BlockType.HAT,
            text: 'when [CONDITION] is true',
            isEdgeActivated: true,
            arguments: {
              CONDITION: {
                type: Scratch.ArgumentType.BOOLEAN
              }
            }
          },
          {
            opcode: 'whenKeyStringPressed',
            blockType: Scratch.BlockType.HAT,
            text: 'when [KEY_OPTION] key pressed',
            isEdgeActivated: true,
            arguments: {
              KEY_OPTION: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'space'
              }
            }
          },
          {
            opcode: 'always',
            blockType: Scratch.BlockType.HAT,
            text: 'always return [CONDITION]',
            isEdgeActivated: false,
            arguments: {
              CONDITION: {
                type: Scratch.ArgumentType.STRING,
                menu: 'boolean'
              }
            }
          },

          '---',

          {
            opcode: 'broadcastToTarget',
            blockType: Scratch.BlockType.COMMAND,
            text: 'broadcast [BROADCAST_OPTION] to [TARGET]',
            arguments: {
              BROADCAST_OPTION: {
                type: Scratch.ArgumentType.STRING,
                menu: 'broadcastMenu'
              },
              TARGET: {
                type: Scratch.ArgumentType.STRING,
                menu: 'targetMenu'
              }
            }
          },
          {
            opcode: 'broadcastAll',
            blockType: Scratch.BlockType.COMMAND,
            text: 'broadcast everything'
          },

          '---',

          {
            opcode: 'whileTurboMode',
            blockType: Scratch.BlockType.HAT,
            text: 'while turbo mode is [STATE]',
            isEdgeActivated: false,
            arguments: {
              STATE: {
                type: Scratch.ArgumentType.STRING,
                menu: 'state'
              }
            }
          },
          {
            opcode: 'whenRuntimeOptionChanged',
            blockType: Scratch.BlockType.HAT,
            text: 'when [OPTION] is changed',
            isEdgeActivated: false,
            arguments: {
              OPTION: {
                type: Scratch.ArgumentType.STRING,
                menu: 'runtimeOptions'
              }
            }
          },
          {
            opcode: 'whenAnyRuntimeOptionChanged',
            blockType: Scratch.BlockType.HAT,
            text: 'when runtime options changed',
            isEdgeActivated: false
          },
          {
            opcode: 'whenExtensionAdded',
            blockType: Scratch.BlockType.HAT,
            text: 'when extension added',
            isEdgeActivated: false,
            arguments: {
              EXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'utilities'
              }
            }
          },

          '---',

          {
            opcode: 'startHats',
            blockType: Scratch.BlockType.COMMAND,
            text: 'start hats [HAT]',
            arguments: {
              HAT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'event_whenflagclicked'
              }
            }
          },
          {
            opcode: 'startHatsInTarget',
            blockType: Scratch.BlockType.COMMAND,
            text: 'start hats [HAT] in [TARGET]',
            arguments: {
              HAT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'event_whenflagclicked'
              },
              TARGET: {
                type: Scratch.ArgumentType.STRING,
                menu: 'targetMenu'
              }
            }
          }
        ],
        menus: {
          // Targets have acceptReporters: true
          targetMenu: {
            acceptReporters: true,
            items: '_getTargets'
          },
          broadcastMenu: {
            acceptReporters: true,
            items: '_getBroadcastMsgs'
          },
          // Attributes have acceptReporters: false
          boolean: {
            acceptReporters: false,
            items: ['true', 'false']
          },
          keyboardButtons: { // This isn't used just yet
            acceptReporters: false,
            items: validKeyboardInputs
          },
          state: {
            acceptReporters: false,
            items: ['enabled', 'disabled']
          },
          runtimeOptions: {
            acceptReporters: false,
            items: ['framerate', 'stage size', 'interpolation']
          },
          startStop: {
            acceptReporters: false,
            items: ['started', 'stopped']
          }
        }
      };
    }

    whenKeyStringPressed(args, util) {
      const pressed = util.ioQuery('keyboard', 'getKeyIsDown', [args.KEY_OPTION]);
      return pressed;
    }

    whenTrue(args) {
      return args.CONDITION;
    }

    broadcastToTarget(args, util) {
      if (!args.BROADCAST_OPTION) return;
      const broadcastVar = util.runtime.getTargetForStage().lookupBroadcastMsg(args.BROADCAST_OPTION);
      if (!broadcastVar) return;
      const target = Scratch.vm.runtime.getSpriteTargetByName(args.TARGET);
      util.startHats('event_whenbroadcastreceived', {BROADCAST_OPTION: broadcastVar.name}, target);
    }

    broadcastAll(args, util) {
      util.startHats('event_whenbroadcastreceived');
    }

    startHats(args, util) {
      util.startHats(args.HAT);
    }

    startHatsInTarget(args, util) {
      const target = Scratch.vm.runtime.getSpriteTargetByName(args.TARGET);
      util.startHats(args.HAT, null, target);
    }

    _getTargets() {
      const spriteNames = [];
      const targets = Scratch.vm.runtime.targets;
      const myself = Scratch.vm.runtime.getEditingTarget().getName();
      for (let index = 1; index < targets.length; index++) {
        const targetName = targets[index].getName();
        if (targetName === myself) {
          spriteNames.unshift({
            text: 'this sprite',
            value: targetName
          });
        } else {
          spriteNames.push({
            text: targetName,
            value: targetName
          });
        }
      }
      if (spriteNames.length > 0) {
        return spriteNames;
      } else {
        return [{text: "", value: 0}]; //this should never happen but it's a failsafe
      }
    }
    
    _getBroadcastMsgs() {
      // @ts-expect-error - Blockly not typed yet
      // eslint-disable-next-line no-undef
      const broadcasts = typeof Blockly === 'undefined' ? [] : Blockly.getMainWorkspace()
        .getVariableMap()
        .getVariablesOfType('broadcast_msg')
        .map(model => ({
          text: model.name,
          value: model.getId()
        }));
      if (broadcasts.length > 0) {
        return broadcasts;
      } else {
        return [{ text: "", value: 0 }];
      }
    }
  }

  Scratch.extensions.register(new MoreEvents());
})(Scratch);