// Name: Comment Plus
// ID: mytacomments
// Description: More Comment Blocks.
// By: Mastered YT Aditya <https://mastered-yt-aditya.github.io/> 
// Original: LilyMakesThings <https://scratch.mit.edu/users/LilyMakesThings/>

(function (Scratch) {
  "use strict";

  class CommentPlus {
    getInfo() {
      return {
        id: "mytacomments",
        name: "Comment Plus",
        color1: "#a9e43a",
        color2: "#84b02b",
        color3: "#567419",
        blocks: [
          {
            opcode: "commentHat",
            blockType: Scratch.BlockType.HAT,
            text: "// [COMMENT]",
            isEdgeActivated: false,
            arguments: {
              COMMENT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "comment",
              },
            },
          },
          {
            opcode: "commentCommand",
            blockType: Scratch.BlockType.COMMAND,
            text: "// [COMMENT]",
            arguments: {
              COMMENT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "comment",
              },
            },
          },
          {
            opcode: "commentC",
            blockType: Scratch.BlockType.CONDITIONAL,
            text: "// [COMMENT]",
            arguments: {
              COMMENT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "comment",
              },
            },
          },
          {
            opcode: "commentReporter",
            blockType: Scratch.BlockType.REPORTER,
            text: "[INPUT] // [COMMENT]",
            arguments: {
              COMMENT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "comment",
              },
              INPUT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
            },
          },
          {
            opcode: "commentBoolean",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[INPUT] // [COMMENT]",
            arguments: {
              COMMENT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "comment",
              },
              INPUT: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
            },
          },
          {
            opcode: "commentReporterPPP",
            blockType: Scratch.BlockType.REPORTER,
            text: "// [COMMENT] [INPUT]",
            arguments: {
              COMMENT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "comment",
              },
              INPUT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
            },
          },
          {
            opcode: "commentBooleanPPP",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "// [COMMENT] [INPUT]",
            arguments: {
              COMMENT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "comment",
              },
              INPUT: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
            },
          },
          {
            opcode: "commentReporterPPPP",
            blockType: Scratch.BlockType.REPORTER,
            text: "// [COMMENT] [INPUT]",
            arguments: {
              COMMENT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "comment",
              },
              INPUT: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
            },
          },
          {
            opcode: "commentBooleanPPPP",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "// [COMMENT] [INPUT]",
            arguments: {
              COMMENT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "comment",
              },
              INPUT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
            },
          },
          {
            opcode: "commentBoolenPlus",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "// [COMMENT]",
            arguments: {
              COMMENT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "comment"
              },
            },
          },
          {
            opcode: "commentReporterPlus",
            blockType: Scratch.BlockType.REPORTER,
            text: "// [COMMENT]",
            arguments: {
              COMMENT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "comment"
              },
            },
          },
          {
            opcode: "commentCapPlus",
            blockType: Scratch.BlockType.COMMAND,
            isTerminal: true,
            text: "// [COMMENT]",
            arguments: {
              COMMENT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "comment"
              },
            },
          },
          {
            opcode: "commentCPlus",
            blockType: Scratch.BlockType.CONDITIONAL,
            isTerminal: true,
            text: "// [COMMENT]",
            arguments: {
              COMMENT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "comment",
              },
            },
          },
          {
            opcode: "commentReporterPlusPlus",
            blockType: Scratch.BlockType.REPORTER,
            text: "[INPUT] // [COMMENT]",
            arguments: {
              COMMENT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "comment",
              },
              INPUT: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
            },
          },
          {
            opcode: "commentBooleanPlusPlus",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[INPUT] // [COMMENT]",
            arguments: {
              COMMENT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "comment",
              },
              INPUT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
            },
          },
          {
            opcode: "commentReporterP6",
            blockType: Scratch.BlockType.REPORTER,
            text: "[COLOR] // [COMMENT]",
            arguments: {
              COMMENT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "comment",
              },
              COLOR: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#037b03",
              },
            },
          },
          {
            opcode: "commentBooleanP6",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[COLOR] // [COMMENT]",
            arguments: {
              COMMENT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "comment",
              },
              COLOR: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#037b03",
              },
            },
          },
          {
            opcode: "commentReporterP7",
            blockType: Scratch.BlockType.REPORTER,
            text: "// [COMMENT] [COLOR]",
            arguments: {
              COMMENT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "comment",
              },
              COLOR: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#037b03",
              },
            },
          },
          {
            opcode: "commentBooleanP7",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "// [COMMENT] [COLOR]",
            arguments: {
              COMMENT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "comment",
              },
              COLOR: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#037b03",
              },
            },
          },
          {
            opcode: "commentCPlus",
            blockType: Scratch.BlockType.CONDITIONAL,
            branchCount: 2,
            text: "// [COMMENT]",
            arguments: {
              COMMENT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "comment",
              },
            },
          },
        ],
      };
    }

    commentHat() {
      // no-op
    }

    commentCap(args) {
      // no-op
    }

    commentCommand() {
      // no-op
    }

    commentC(args, util) {
      return true;
    }

    commentReporter(args) {
      return args.INPUT;
    }

    commentBoolean(args) {
      return args.INPUT || false;
    }

    commentReporterPPP(args) {
      return args.INPUT;
    }

    commentBooleanPPP(args) {
      return args.INPUT || false;
    }

    commentReporterPPPP(args) {
      return args.INPUT;
    }

    commentBooleanPPPP(args) {
      return args.INPUT || false;
    }

    commentBooleanPlus(args) {
      return args.INPUT;
    }

    commentReporterPlus(args) {
      return args.INPUT;
    }

    commentCapPlus() {
      // no-op
    }
    
    commentReporterPlusPlus(args) {
      return args.INPUT;
    }

    commentBooleanPlusPlus(args) {
      return args.INPUT || false;
    }
    
    commentReporterP6(args) {
      return args.COLOR;
    }

    commentBooleanP6(args) {
      return args.COLOR || false;
    }
    
    commentReporterP7(args) {
      return args.COLOR;
    }

    commentBooleanP7(args) {
      return args.COLOR || false;
    }
    
    commentCPlus(args, util) {
      return true;
    }
  }
  Scratch.extensions.register(new CommentPlus());
})(Scratch);