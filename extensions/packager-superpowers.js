(function(Scratch) {
  'use strict';

  /* globals PackagerSuperpowers */

  class PackagerSuperpowersExtension {
    getInfo () {
      return {
        id: 'packagerpowers',
        name: 'Packager Superpowers',
        blocks: [
          {
            blockType: Scratch.BlockType.COMMAND,
            opcode: 'maximize',
            text: 'maximize window'
          },
          {
            blockType: Scratch.BlockType.COMMAND,
            opcode: 'minimize',
            text: 'minimize window'
          },
          {
            blockType: Scratch.BlockType.COMMAND,
            opcode: 'setSize',
            text: 'set window content size to [WIDTH]x[HEIGHT]',
            arguments: {
              WIDTH: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 480
              },
              HEIGHT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 360
              }
            }
          },
          {
            blockType: Scratch.BlockType.COMMAND,
            opcode: 'setPosition',
            text: 'set window position to x: [X] y: [Y]',
            arguments: {
              X: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100
              },
              Y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100
              }
            }
          }
        ]
      };
    }

    maximize () {
      PackagerSuperpowers.BrowserWindow('maximize');
    }

    minimize () {
      PackagerSuperpowers.BrowserWindow('minimize');
    }

    setSize ({WIDTH, HEIGHT}) {
      PackagerSuperpowers.BrowserWindow('setContentSize', Scratch.Cast.toNumber(WIDTH), Scratch.Cast.toNumber(HEIGHT));
    }

    setPosition ({X, Y}) {
      PackagerSuperpowers.BrowserWindow('setPosition', Scratch.Cast.toNumber(X), Scratch.Cast.toNumber(Y));
    }
  }

  Scratch.extensions.register(new PackagerSuperpowersExtension());
}(Scratch));
