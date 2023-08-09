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

  var lastValues = {};

  class MoreEvents {
    constructor() {
      // Stop Sign Clicked contributed by @CST1229
      runtime.shouldExecuteStopClicked = true;
      runtime.on('BEFORE_EXECUTE', () => {
        runtime.shouldExecuteStopClicked = false;
        runtime.startHats('lmsMoreEvents_forever');

        runtime.startHats('lmsMoreEvents_whileTurboMode', {
          STATE: (runtime.turboMode) ? 'enabled' : 'disabled'
        });
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
            text: 'when [INPUT] is changed',
            isEdgeActivated: true,
            arguments: {
              INPUT: {
                type: Scratch.ArgumentType.STRING
              }
            }
          },
          {
            opcode: 'forever',
            blockType: Scratch.BlockType.HAT,
            text: 'forever',
            isEdgeActivated: false
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
                type: Scratch.ArgumentType.STRING
              },
              TARGET: {
                type: Scratch.ArgumentType.STRING,
                menu: 'targetMenu'
              }
            },
            hideFromPalette: true
          },
          {
            opcode: 'broadcastData',
            blockType: Scratch.BlockType.COMMAND,
            text: 'broadcast [BROADCAST_OPTION] with data [DATA]',
            arguments: {
              BROADCAST_OPTION: {
                type: Scratch.ArgumentType.STRING
              },
              DATA: {
                type: Scratch.ArgumentType.STRING
              }
            },
            hideFromPalette: true
          },
          {
            opcode: 'broadcastDataToTarget',
            blockType: Scratch.BlockType.COMMAND,
            text: 'broadcast [BROADCAST_OPTION] to [TARGET] with data [DATA]',
            arguments: {
              BROADCAST_OPTION: {
                type: Scratch.ArgumentType.STRING
              },
              TARGET: {
                type: Scratch.ArgumentType.STRING,
                menu: 'targetMenu'
              },
              DATA: {
                type: Scratch.ArgumentType.STRING
              }
            },
            hideFromPalette: true
          },
          { // Adding the broadcast argument to the blocks
            blockType: Scratch.BlockType.XML,
            xml: '<block type="lmsMoreEvents_broadcastToTarget"><value name="BROADCAST_OPTION"><shadow type="event_broadcast_menu"></shadow></value><value name="TARGET"><shadow type="lmsMoreEvents_menu_targetMenu"></shadow></value></block><block type="lmsMoreEvents_broadcastData"><value name="BROADCAST_OPTION"><shadow type="event_broadcast_menu"></shadow></value><value name="DATA"><shadow type="text"></shadow></value></block><block type="lmsMoreEvents_broadcastDataToTarget"><value name="BROADCAST_OPTION"><shadow type="event_broadcast_menu"></shadow></value><value name="TARGET"><shadow type="lmsMoreEvents_menu_targetMenu"></shadow></value><value name="DATA"><shadow type="text"></shadow></value></block>'
          },
          {
            opcode: 'receivedData',
            blockType: Scratch.BlockType.REPORTER,
            text: 'received data',
            disableMonitor: true,
            allowDropAnywhere: true
          }
        ],
        menus: {
          // Targets have acceptReporters: true
          targetMenu: {
            acceptReporters: true,
            items: '_getTargets'
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
      const pressed = util.ioQuery('keyboard', 'getKeyIsDown', [key]);
      return (args.ACTION === 'released') ? !pressed : pressed;
    }

    broadcastToTarget(args, util) {
      const broadcast = Scratch.Cast.toString(args.BROADCAST_OPTION);
      if (!broadcast) return;

      if (args.TARGET === '_stage_') {
        util.startHats('event_whenbroadcastreceived', {BROADCAST_OPTION: broadcast}, runtime.getTargetForStage());
        return;
      }

      const spriteTarget = Scratch.vm.runtime.getSpriteTargetByName(args.TARGET);
      const cloneTargets = spriteTarget.sprite.clones;
      cloneTargets.forEach(model => util.startHats('event_whenbroadcastreceived', {BROADCAST_OPTION: broadcast}, model));
      util.startHats('event_whenbroadcastreceived', {BROADCAST_OPTION: broadcast}, spriteTarget);
    }

    broadcastData(args, util) {
      const broadcast = Scratch.Cast.toString(args.BROADCAST_OPTION);
      if (!broadcast) return;

      const threads = util.startHats('event_whenbroadcastreceived', {BROADCAST_OPTION: broadcast});
      console.log(threads);
      threads.forEach(thread => thread.receivedData = args.DATA);
    }

    broadcastDataToTarget(args, util) {
      const broadcast = Scratch.Cast.toString(args.BROADCAST_OPTION);
      if (!broadcast) return;

      const spriteTarget = Scratch.vm.runtime.getSpriteTargetByName(args.TARGET);
      if (!spriteTarget) return;
      const cloneTargets = spriteTarget.sprite.clones;

      if (args.TARGET === '_stage_') {
        const threads = util.startHats('event_whenbroadcastreceived', {BROADCAST_OPTION: broadcast}, runtime.getTargetForStage());
        threads.forEach(thread => thread.receivedData = args.DATA);
        return;
      } else {
        cloneTargets.forEach(model => {
          const threads = util.startHats('event_whenbroadcastreceived', {BROADCAST_OPTION: broadcast}, model);
          threads.forEach(thread => thread.receivedData = args.DATA);
        });
      }

      const threads = util.startHats('event_whenbroadcastreceived', {BROADCAST_OPTION: broadcast}, spriteTarget);
      threads.forEach(thread => thread.receivedData = args.DATA);
    }

    receivedData(args, util) {
      const received = util.thread.receivedData;
      return (received) ? received : '';
    }

    _getTargets() {
      const spriteNames = [{text: 'Stage', value: '_stage_'}];
      const targets = Scratch.vm.runtime.targets;
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
