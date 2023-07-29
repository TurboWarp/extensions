(function (Scratch) {
  'use strict';

  const vm = Scratch.vm;
  const runtime = vm.runtime;

  const stopIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAQlBMVEUAAAC/UFC8Q0OzTU24SEi4SEi3SEi4R0e4SEi4SEi4SEi4SEi7SUm8SUnMTk7MT0/OT0/PT0/gVVXiVVXsWVn///+CoOd2AAAAC3RSTlMAEBMUu7zLz9D8/dIXnJwAAAABYktHRBXl2PmjAAAAxklEQVRIx+3WwRKDIBAD0JWqVEOtWv7/W3twOqKwELzW3N9wYhORMMYiztgZUZMUAKxqmh5Kno/MG256nzI59Z2mB+BWH+XzUt5RhWoyQjFZkTQFkTBFERlCnAwlDoYUgaHFblpaeL86AK0MvNjMIABmT2cGIAAWniw3ucm/k9ovduEjXzgXtUfJmtrTt9VZzYH9FSB/xvfKZMsiLFmuko61zBTfucjL9RpXf6nEU2MhPxXS86J+kORmjz6V6seViOnG8oT7ApMcjsYZwhXCAAAAAElFTkSuQmCC';

  // Source:
  // https://github.com/TurboWarp/scratch-vm/blob/develop/src/io/keyboard.js
  // https://github.com/TurboWarp/scratch-blocks/blob/develop/blocks_vertical/event.js
  const validKeyboardInputs = [
    // Special Inputs
    { text: 'space', value: 'space' },
    { text: 'up arrow', value: 'up arrow' },
    { text: 'down arrow', value: 'down arrow' },
    { text: 'right arrow', value: 'right arrow' },
    { text: 'left arrow', value: 'left arrow' },
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

  vm.runtime.on('BEFORE_EXECUTE', () => {
    runtime.startHats('lmsMoreEvents_always', {
      CONDITION: 'true'
    });

    runtime.startHats('lmsMoreEvents_whileTurboMode', {
      STATE: (runtime.turboMode) ? 'enabled' : 'disabled'
    });
  });

  var lastValues = {};

  class MoreEvents {
    constructor() {
      // Stop Sign Clicked contributed by @CST1229
      runtime.shouldExecuteStopClicked = true;
      runtime.on('BEFORE_EXECUTE', () => {
        runtime.shouldExecuteStopClicked = false;
      });
      runtime.on('PROJECT_STOP_ALL', () => {
        if (runtime.shouldExecuteStopClicked)
          queueMicrotask(() => runtime.startHats('lmsMoreEvents_whenStopClicked'));
      });
      runtime.on('AFTER_EXECUTE', () => {
        runtime.shouldExecuteStopClicked = true;
      });
      const originalGreenFlag = vm.greenFlag;
      vm.greenFlag = function() {
        runtime.shouldExecuteStopClicked = false;
        originalGreenFlag.call(this);
      };
    }

    getInfo() {
      return {
        id: 'lmsMoreEvents',
        name: 'More Events',
        color1: '#FFBF00',
        color2: '#E6AC00',
        color3: '#CC9900',
        blocks: [
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
          {
            opcode: 'whenTrueFalse',
            blockType: Scratch.BlockType.HAT,
            text: 'when [CONDITION] is [STATE]',
            isEdgeActivated: true,
            arguments: {
              CONDITION: {
                type: Scratch.ArgumentType.BOOLEAN
              },
              STATE: {
                type: Scratch.ArgumentType.STRING,
                menu: 'boolean'
              }
            }
          },
          {
            opcode: 'whenValueChanged',
            blockType: Scratch.BlockType.HAT,
            text: 'when [INPUT] changed',
            isEdgeActivated: true,
            arguments: {
              INPUT: {
                type: Scratch.ArgumentType.STRING
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
            opcode: 'whenKeyAction',
            blockType: Scratch.BlockType.HAT,
            text: 'when [KEY_OPTION] key [ACTION]',
            isEdgeActivated: true,
            arguments: {
              KEY_OPTION: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'space',
                menu: 'keyboardButtons'
              },
              ACTION: {
                type: Scratch.ArgumentType.STRING,
                menu: 'action'
              }
            }
          },
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
          keyboardButtons: {
            acceptReporters: true,
            items: validKeyboardInputs
          },
          // Attributes have acceptReporters: false
          action: {
            acceptReporters: false,
            items: ['hit', 'released']
          },
          boolean: {
            acceptReporters: false,
            items: ['true', 'false']
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

    whenTrueFalse(args) {
      return (args.STATE === 'true') ? args.CONDITION : !args.CONDITION;
    }

    whenValueChanged(args, util) {
      const blockId = util.thread.peekStack();
      if (!lastValues[blockId]) lastValues[blockId] = Scratch.Cast.toString(args.INPUT);
      if (lastValues[blockId] !== Scratch.Cast.toString(args.INPUT)) {
        lastValues[blockId] = Scratch.Cast.toString(args.INPUT);
        return true;
      }
      return false;
    }

    whenKeyAction(args, util) {
      const key = Scratch.Cast.toString(args.KEY_OPTION).toLowerCase();
      const pressed = util.ioQuery('keyboard', 'getKeyIsDown', [args.KEY_OPTION]);
      return (args.ACTION === 'released') ? !pressed : pressed;
    }

    broadcastToTarget(args, util) {
      if (!args.BROADCAST_OPTION) return;
      const broadcastVar = util.runtime.getTargetForStage().lookupBroadcastMsg(args.BROADCAST_OPTION);
      if (!broadcastVar) return;
      if (args.TARGET === '_stage_') {
        util.startHats('event_whenbroadcastreceived', {BROADCAST_OPTION: broadcastVar.name}, runtime.getTargetForStage());
        return;
      }
      const spriteTarget = Scratch.vm.runtime.getSpriteTargetByName(args.TARGET);
      const cloneTargets = spriteTarget.sprite.clones;
      cloneTargets.forEach(model => util.startHats('event_whenbroadcastreceived', {BROADCAST_OPTION: broadcastVar.name}, model));
      util.startHats('event_whenbroadcastreceived', {BROADCAST_OPTION: broadcastVar.name}, spriteTarget);
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
      const spriteNames = [{text: 'Stage', value: '_stage_'}];
      const targets = Scratch.vm.runtime.targets;
      const myself = Scratch.vm.runtime.getEditingTarget().getName();
      for (let index = 1; index < targets.length; index++) {
        const target = targets[index];
        if (target.isOriginal) {
          const targetName = target.getName();
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
