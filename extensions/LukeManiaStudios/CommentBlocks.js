(function (Scratch) {

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
            text: '// [INPUT]',
            arguments: {
              INPUT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'comment'
              }
            }
          },
          {
            opcode: 'commentCommand',
            blockType: Scratch.BlockType.COMMAND,
            text: '// [INPUT]',
            arguments: {
              INPUT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'comment'
              }
            }
          },
          {
            opcode: 'commentReporter',
            blockType: Scratch.BlockType.REPORTER,
            text: '[INPUTB] // [INPUTA]',
            arguments: {
              INPUTA: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'comment'
              },
              INPUTB: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ''
              }
            }
          },
          {
            opcode: 'commentBoolean',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[INPUTB] // [INPUTA]',
            arguments: {
              INPUTA: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'comment'
              },
              INPUTB: {
                type: Scratch.ArgumentType.BOOLEAN,
                defaultValue: ''
              }
            }
          }
        ]
      };
    }

    commentHat () {
      return;
    }

    commentCommand () {
      return;
    }

    commentReporter (args) {
      if (!args.INPUTB) {
        return '';
      } else {
        return args.INPUTB;
      }
    }

    commentBoolean (args) {
      if (!args.INPUTB) {
        return 'false';
      } else {
        return args.INPUTB;
      }
    }
  }
  Scratch.extensions.register(new CommentBlocks());
})(Scratch);
