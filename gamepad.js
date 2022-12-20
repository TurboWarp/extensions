// Some parts of this scripts are based on or designed to be compatible-ish with:
// https://arpruss.github.io/gamepad.js (MIT Licensed)

(function(Scratch) {
  'use strict';

  const DEADZONE = 0.1;

  /**
   * @param {number|'any'} index 1-indexed index
   * @returns {Gamepad[]}
   */
  const getGamepads = (index) => {
    if (index === 'any') {
      return navigator.getGamepads().filter(i => i);
    }
    const gamepad = navigator.getGamepads()[index - 1];
    if (gamepad) {
      return [gamepad];
    }
    return [];
  };

  /**
   * @param {Gamepad} gamepad
   * @param {number|'any'} buttonIndex 1-indexed index
   * @returns {boolean} false if button does not exist
   */
  const isButtonPressed = (gamepad, buttonIndex) => {
    if (buttonIndex === 'any') {
      return gamepad.buttons.some(i => i.pressed);
    }
    const button = gamepad.buttons[buttonIndex - 1];
    if (!button) {
      return false;
    }
    return button.pressed;
  };

  /**
   * @param {Gamepad} gamepad
   * @param {number} axisIndex 1-indexed index
   * @returns {number} 0 if axis does not exist
   */
  const getAxisValue = (gamepad, axisIndex) => {
    const axisValue = gamepad.axes[axisIndex - 1];
    if (typeof axisValue !== 'number') {
      return 0;
    }
    if (Math.abs(axisValue) < DEADZONE) {
      return 0;
    }
    return axisValue;
  };

  class GamepadExtension {
    getInfo() {
      return {
        id: 'Gamepad',
        name: 'Gamepad',
        blocks: [
          {
            opcode: 'gamepadConnected',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'is gamepad [pad] connected?',
            arguments: {
              pad: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '1',
                menu: 'padMenu'
              }
            }
          },
          {
            opcode: 'buttonDown',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'button [b] of pad [i] pressed?',
            arguments: {
              b: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '1',
                menu: 'buttonMenu'
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
            blockType: Scratch.BlockType.REPORTER,
            text: 'value of axis [b] on pad [i]',
            arguments: {
              b: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '1',
                menu: 'axisMenu'
              },
              i: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '1',
                menu: 'padMenu'
              },
            },
          },

          '---',

          {
            opcode: 'axisDirection',
            blockType: Scratch.BlockType.REPORTER,
            text: 'direction of axes [axis] on pad [pad]',
            arguments: {
              axis: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '1',
                menu: 'axesGroupMenu'
              },
              pad: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '1',
                menu: 'padMenu'
              }
            }
          },
          {
            opcode: 'axisMagnitude',
            blockType: Scratch.BlockType.REPORTER,
            text: 'magnitude of axes [axis] on pad [pad]',
            arguments: {
              axis: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '1',
                menu: 'axesGroupMenu'
              },
              pad: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '1',
                menu: 'padMenu'
              }
            }
          },

          /*
          {
            opcode: 'buttonPressedReleased',
            blockType: Scratch.BlockType.HAT,
            text: 'button [b] [pr] of pad [i]',
            arguments: {
              b: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '1'
              },
              pr: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '1',
                menu: 'pressReleaseMenu'
              },
              i: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '1',
                menu: 'padMenu'
              },
            },
          },

          {
            opcode: 'axisMoved',
            blockType: Scratch.BlockType.HAT,
            text: 'axis [b] of pad [i] moved',
            arguments: {
              b: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '1'
              },
              i: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '1',
                menu: 'padMenu'
              },
            },
          },
          */

          '---',

          {
            opcode: 'rumble',
            blockType: Scratch.BlockType.COMMAND,
            text: 'rumble strong [s] and weak [w] for [t] sec. on pad [i]',
            arguments: {
              s: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '0.25'
              },
              w: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '0.5'
              },
              t: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '0.25'
              },
              i: {
                type: Scratch.ArgumentType.NUMBER,
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
                text: 'any',
                value: 'any'
              },
              {
                text: '1',
                value: '1'
              },
              {
                text: '2',
                value: '2'
              },
              {
                text: '3',
                value: '3'
              },
              {
                text: '4',
                value: '4'
              }
            ],
          },
          buttonMenu: {
            acceptReporters: true,
            items: [
              // Based on an Xbox controller
              {
                text: 'any',
                value: 'any'
              },
              {
                text: 'A (1)',
                value: '1'
              },
              {
                text: 'B (2)',
                value: '2'
              },
              {
                text: 'X (3)',
                value: '3'
              },
              {
                text: 'Y (4)',
                value: '4'
              },
              {
                text: 'Left bumper (5)',
                value: '5'
              },
              {
                text: 'Right bumper (6)',
                value: '6'
              },
              {
                text: 'Left trigger (7)',
                value: '7'
              },
              {
                text: 'Right trigger (8)',
                value: '8'
              },
              {
                text: 'Select/View (9)',
                value: '9'
              },
              {
                text: 'Start/Menu (10)',
                value: '10'
              },
              {
                text: 'Left stick (11)',
                value: '11'
              },
              {
                text: 'Right stick (12)',
                value: '12'
              },
              {
                text: 'D-pad up (13)',
                value: '13'
              },
              {
                text: 'D-pad down (14)',
                value: '14'
              },
              {
                text: 'D-pad left (15)',
                value: '15'
              },
              {
                text: 'D-pad right (16)',
                value: '16'
              },
            ]
          },
          axisMenu: {
            acceptReporters: true,
            items: [
              // Based on an Xbox controller
              {
                text: 'Left stick horizontal (1)',
                value: '1'
              },
              {
                text: 'Left stick vertical (2)',
                value: '2'
              },
              {
                text: 'Right stick horizontal (3)',
                value: '3'
              },
              {
                text: 'Right stick vertical (4)',
                value: '4'
              }
            ]
          },
          axesGroupMenu: {
            acceptReporters: true,
            items: [
              // Based on an Xbox controller
              {
                text: 'Left stick (1 & 2)',
                value: '1'
              },
              {
                text: 'Right stick (3 & 4)',
                value: '3'
              }
            ]
          },
          /*
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
          */
        }
      };
    }

    gamepadConnected ({pad}) {
      return getGamepads(pad).length > 0;
    }

    buttonDown ({b, i}) {
      for (const gamepad of getGamepads(i)) {
        if (isButtonPressed(gamepad, b)) {
          return true;
        }
      }
      return false;
    }

    axisValue ({b, i}) {
      let greatestAxis = 0;
      for (const gamepad of getGamepads(i)) {
        const axis = getAxisValue(gamepad, b);
        if (Math.abs(axis) > Math.abs(greatestAxis)) {
          greatestAxis = axis;
        }
      }
      return greatestAxis;
    }

    axisDirection ({axis, pad}) {
      let greatestMagnitude = 0;
      let direction = 90;
      for (const gamepad of getGamepads(pad)) {
        const horizontalAxis = getAxisValue(gamepad, axis);
        const verticalAxis = getAxisValue(gamepad, +axis + 1);
        const magnitude = Math.sqrt(horizontalAxis ** 2 + verticalAxis ** 2);
        if (magnitude > greatestMagnitude) {
          greatestMagnitude = magnitude;
          direction = Math.atan2(verticalAxis, horizontalAxis) * 180 / Math.PI + 90;
          if (direction < 0) {
            direction += 360;
          }
        }
      }
      return direction;
    }

    axisMagnitude ({axis, pad}) {
      let greatestMagnitude = 0;
      for (const gamepad of getGamepads(pad)) {
        const horizontalAxis = getAxisValue(gamepad, axis);
        const verticalAxis = getAxisValue(gamepad, +axis + 1);
        const magnitude = Math.sqrt(horizontalAxis ** 2 + verticalAxis ** 2);
        if (magnitude > greatestMagnitude) {
          greatestMagnitude = magnitude;
        }
      }
      return greatestMagnitude;
    }

    rumble ({s, w, t, i}) {
      const gamepads = getGamepads(i);
      for (const gamepad of gamepads) {
        // @ts-ignore
        if (gamepad.vibrationActuator) {
          // @ts-ignore
          gamepad.vibrationActuator.playEffect('dual-rumble', {
            startDelay: 0,
            duration: t * 1000,
            weakMagnitude: w,
            strongMagnitude: s
          });
        }
      }
    }
  }

  Scratch.extensions.register(new GamepadExtension());
})(Scratch);
