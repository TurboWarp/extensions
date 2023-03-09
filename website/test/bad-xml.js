(function(Scratch) {
  'use strict';

  class XMLTest {
    getInfo () {
      return {
        id: 'xmltest',
        name: `<>"'&& Name`,
        docsURI: `https://example.com/&''""<<>>`,
        menuIconURI: `data:<>&"' category icon`,
        blocks: [
            {
                blockType: `block type <>&"'`,
                opcode: `opcode <>&"'`,
                text: `<>&"' [string argument <>&"'] [inputMenu <"'&>] [fieldMenu <"'&>] [image <"'&>]`,
                blockIconURI: `'data:<>&"' block icon`,
                arguments: {
                    [`string argument <>&"'`]: {
                        type: Scratch.ArgumentType.STRING,
                        defaultValue: `default string <>&"'`
                    },
                    [`inputMenu <"'&>`]: {
                        type: Scratch.ArgumentType.STRING,
                        menu: `input <>&"'`,
                        defaultValue: `default input <>&"'`
                    },
                    [`fieldMenu <"'&>`]: {
                        type: `argument type <>&"'`,
                        menu: `field <>&"'`,
                        defaultValue: `default field <>&"'`
                    },
                    [`image <"'&>`]: {
                        type: Scratch.ArgumentType.IMAGE,
                        dataURI: `data:<>&"' image input`
                    }
                }
            },
            {
                opcode: 'button',
                blockType: Scratch.BlockType.BUTTON,
                text: `'"><& button text`,
                func: `'"><& func`
            }
        ],
        menus: {
            [`input <>&"'`]: {
                acceptReporters: true,
                items: [
                    `1 <>&"`,
                    `2 <>&"`,
                    `3 <>&"`
                ]
            },
            [`field <>&"'`]: {
                acceptReporters: false,
                items: [
                    `1 <>&"`,
                    `2 <>&"`,
                    `3 <>&"`
                ]
            }
        }
      };
    }
    [`opcode <>&"'`](args) {
        console.log(args);
    }
  }
  Scratch.extensions.register(new XMLTest());
})(Scratch);
