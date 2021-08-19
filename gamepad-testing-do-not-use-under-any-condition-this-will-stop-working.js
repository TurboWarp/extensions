// Some parts of this scripts are based on or designed to be compatible with:
// https://arpruss.github.io/gamepad.js (MIT Licensed)

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
        }
      ],
      menus: {
        padMenu: {
          acceptReporters: true,
          items: [
            {
              text: "1",
              value: 1
            },
            {
              text: "2",
              value: 2
            },
            {
              text: "3",
              value: 3
            },
            {
              text: "4",
              value: 4
            }
          ],
        }
      }
    };
  }

  buttonDown ({b, i}) {
    return navigator.getGamepads()[i - 1].buttons[b - 1].pressed;
  }
}

Scratch.extensions.register(new Gamepad());
