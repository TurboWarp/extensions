(function (Scratch) {
  'use strict';

  class CommentBlocks {
    getInfo() {
      return {
        id: 'lmscomments',
        name: 'Comment Blocks',
        color1: '#e4db8c',
        color2: '#c6be79',
        color3: '#a8a167',
        blocks: [
          {
            opcode: 'commentHat',
            blockType: Scratch.BlockType.HAT,
            text: '// [COMMENT]',
            isEdgeActivated: false,
            arguments: {
              COMMENT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'comment'
              }
            }
          },
          {
            opcode: 'commentCommand',
            blockType: Scratch.BlockType.COMMAND,
            text: '// [COMMENT]',
            arguments: {
              COMMENT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'comment'
              }
            }
          },
          {
            opcode: 'commentReporter',
            blockType: Scratch.BlockType.REPORTER,
            text: '[INPUT] // [COMMENT]',
            arguments: {
              COMMENT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'comment'
              },
              INPUT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ''
              }
            }
          },
          {
            opcode: 'commentBoolean',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[INPUT] // [COMMENT]',
            arguments: {
              COMMENT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'comment'
              },
              INPUT: {
                type: Scratch.ArgumentType.BOOLEAN
              }
            }
          },
          {
            opcode: 'commentMatrix',
            blockType: Scratch.BlockType.REPORTER,
            text: '[INPUT] // [COMMENT]',
            arguments: {
                COMMENT: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: 'comment'
                },
                INPUT: {
                    type: Scratch.ArgumentType.MATRIX,
                    defaultValue: '0101010101100010101000100' // a <3 lool
                }
            }
        },
        {
            opcode: 'commentColor',
            blockType: Scratch.BlockType.REPORTER,
            text: '[INPUT] // [COMMENT]',
            arguments: {
                COMMENT: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: 'comment'
                },
                INPUT: {
                    type: Scratch.ArgumentType.COLOR,
                    defaultValue: '#ff0000' // red
                }
            }
        }
        ]
      };
    }

    commentHat () {
      // no-op
    }

    commentCommand () {
      // no-op
    }

    commentReporter (args) {
      return args.INPUT;
    }

    commentBoolean (args) {
      return args.INPUT || false;
    }

    commentMatrix (args) {
      return args.INPUT;
    }

    commentColor (args) {
        return args.INPUT;
    }
  }
  Scratch.extensions.register(new CommentBlocks());
})(Scratch);
