// Some parts of this scripts are based on or designed to be compatible with:
// https://arpruss.github.io/gamepad.js (MIT Licensed)

(function(Scratch) {
  'use strict';

  const runtime = Scratch.vm.runtime;

  const getGamepad = (index) => navigator.getGamepads()[index - 1];

  class Gamepad {
    getInfo() {
      return {
        id: 'Gamepad',
        name: 'Gamepad',
        blocks: [
          {
            opcode: 'buttonDown',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'button [b] of pad [i] is down?',
            arguments: {
              b: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '1'
              },
              i: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '1',
                menu: 'padMenu'
              }
            }
          },
          {
            opcode: 'axisValue',
            blockType: 'reporter',
            text: 'axis [b] of pad [i] value',
            arguments: {
              b: {
                type: 'number',
                defaultValue: '1'
              },
              i: {
                type: 'number',
                defaultValue: '1',
                menu: 'padMenu'
              },
            },                    
          },

          /*
          {
            opcode: 'buttonPressedReleased',
            blockType: 'hat',
            text: 'button [b] [pr] of pad [i]',
            arguments: {
              b: {
                type: 'number',
                defaultValue: '1'
              },
              pr: {
                type: 'number',
                defaultValue: '1',
                menu: 'pressReleaseMenu'
              },
              i: {
                type: 'number',
                defaultValue: '1',
                menu: 'padMenu'
              },
            },
          },

          {
            opcode: 'axisMoved',
            blockType: 'hat',
            text: 'axis [b] of pad [i] moved',
            arguments: {
              b: {
                type: 'number',
                defaultValue: '1'
              },
              i: {
                type: 'number',
                defaultValue: '1',
                menu: 'padMenu'
              },
            },
          },
          */

          {
            opcode: 'rumble',
            blockType: 'command',
            text: 'rumble strong [s] and weak [w] for [t] sec. on pad [i]',
            arguments: {
              s: {
                type: 'number',
                defaultValue: '0.25'
              },
              w: {
                type: 'number',
                defaultValue: '0.5'
              },
              t: {
                type: 'number',
                defaultValue: '0.25'
              },
              i: {
                type: 'number',
                defaultValue: '1',
                menu: 'padMenu'
              },
            },                    
          },
        ],
        menus: {
          padMenu: {
            acceptReporters: true,
            items: [
              {
                text: '1',
                value: 1
              },
              {
                text: '2',
                value: 2
              },
              {
                text: '3',
                value: 3
              },
              {
                text: '4',
                value: 4
              }
            ],
          },
          pressReleaseMenu: [
            {
              text: 'press',
              value: 1
            },
            {
              text: 'release',
              value: 0
            }
          ],
        }
      };
    }
  
    buttonDown ({b, i}) {
      const gamepad = getGamepad(i);
      if (!gamepad) return false;
      const button = gamepad.buttons[b - 1];
      if (!button) return false;
      return button.pressed;
    }

    axisValue ({b, i}) {
      const gamepad = getGamepad(i);
      if (!gamepad) return 0;
      const axis = gamepad.axes[b - 1];
      if (typeof axis !== 'number') return 0;
      return axis;
    }

    rumble ({s, w, t, i}) {
      const gamepad = getGamepad(i);
      if (!gamepad || !gamepad.vibrationActuator) return;
      gamepad.vibrationActuator.playEffect('dual-rumble', {
        startDelay: 0,
        duration: t * 1000,
        weakMagnitude: w,
        strongMagnitude: s
      });
    }
  }
  
  Scratch.extensions.register(new Gamepad());
})(Scratch);
