(function (Scratch) {
  "use strict";

  const vm = Scratch.vm;
  const runtime = vm.runtime;

  class InlineFunctions {
    constructor() {
      /**
       * Override to add in the "output" and "outputShape"
       * extension block parameters. Used to create the inline
       * block shape.
       */
      const cbfsb = runtime._convertBlockForScratchBlocks.bind(runtime);
      runtime._convertBlockForScratchBlocks = function (
        blockInfo,
        categoryInfo
      ) {
        const res = cbfsb(blockInfo, categoryInfo);
        if (blockInfo.outputShape) {
          res.json.outputShape = blockInfo.outputShape;
        }
        if (blockInfo.output) {
          res.json.output = blockInfo.output;
        }
        return res;
      };
    }

    getInfo() {
      return {
        id: "lmsFunctions",
        name: "Functions",
        color1: "#656565",
        blocks: [
          {
            opcode: "function",
            blockType: Scratch.BlockType.REPORTER,
            outputShape: 3,
            output: "Boolean",
            branchCount: 1,
            disableMonitor: true,
          },
          "---",
          {
            opcode: "execute",
            blockType: Scratch.BlockType.COMMAND,
            text: "execute [SCRIPT]",
            arguments: {
              SCRIPT: {
                type: Scratch.ArgumentType.STRING,
              },
            },
          },
          {
            opcode: "executeAndWait",
            blockType: Scratch.BlockType.COMMAND,
            text: "execute [SCRIPT] and wait",
            arguments: {
              SCRIPT: {},
            },
          },
          "---",
          {
            opcode: "executeReporter",
            func: "executeAndWait",
            blockType: Scratch.BlockType.REPORTER,
            text: "execute [SCRIPT] and wait",
            allowDropAnywhere: true,
            arguments: {
              SCRIPT: {},
            },
          },
          {
            opcode: "inlineReturn",
            blockType: Scratch.BlockType.COMMAND,
            text: "return [VALUE]",
            arguments: {
              VALUE: {
                type: Scratch.ArgumentType.STRING,
              },
            },
            isTerminal: true,
          },
        ],
      };
    }

    function(args, util) {
      const target = util.target;
      const blockId = this._getPeekStack(util.thread);
      const blocks = target.blocks;
      if (!blocks.getBlock(blockId).parent) return "";

      const branch = blocks.getBranch(blockId, 0);
      if (!branch) return "";

      return branch ?? "";
    }

    execute(args, util) {
      const blockId = Scratch.Cast.toString(args.SCRIPT);
      if (!blockId) return;

      const target = this._getTargetForBlock(blockId)
      if (!target) return;

      runtime._pushThread(blockId, target);
    }

    executeAndWait(args, util) {
      const blockId = Scratch.Cast.toString(args.SCRIPT);
      if (!blockId) return;

      const stackFrame = util.stackFrame;
      if (!stackFrame.newThread) {
        const target = this._getTargetForBlock(blockId)
        if (!target) return;
  
        stackFrame.newThread = runtime._pushThread(blockId, target);
      }

      const newThread = stackFrame.newThread;

      if (!newThread.returnValue && newThread.status !== 4) {
        util.thread.peekStackFrame().waitingReporter = true;
        util.yield();
      } else {
        return newThread.returnValue ?? "";
      }
    }

    inlineReturn(args, util) {
      util.thread.returnValue = args.VALUE;
      util.stopThisScript();
    }

    imBored(args, util) {
      if (args.CONDITION) {
        return 1;
      } else {
        return 2;
      }
    }

    /**
     * Get the target that a block is contained in based
     * on its ID.
     * @param {string} blockId The block ID to check. 
     * @returns {Object} The target the block is from.
     */
    _getTargetForBlock(blockId) {
      for (const target of runtime.targets) {
        const blocks = target.blocks._blocks;
        const blockIds = Object.keys(blocks);
        if (blockIds.includes(blockId)) return target;
      }
    }

    /**
     * Get top stack item.
     * @param {Object} thread
     * @returns {string} Block ID on top of stack.
     */
    _getPeekStack(thread) {
      return thread.isCompiled
        ? thread.peekStack()
        : thread.peekStackFrame().op.id;
    }
  }

  Scratch.extensions.register(new InlineFunctions());
})(Scratch);
