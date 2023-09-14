// Name: Scope Variables
// ID: scopeVar
// Description: Manage your data inside your stack (or substack).
// By: SimonShiki <https://scratch.mit.edu/users/SinanGentoo/>
// Original: Skyhigh173

(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) {
    throw new Error(`
            "Scope Variables" must be loaded in a unsandboxed environment.
        `);
  }
  const { BlockType, ArgumentType, Cast } = Scratch;

  class ScopeVar {
    getInfo() {
      return {
        id: "shikiScopeVar",
        name: "Scope Variables",
        docsURI: "https://extensions.turbowarp.org/SimonShiki/scopeVar",
        collaborator: "Skyhigh173, SimonShiki",
        description: "Manage your data inside.",
        color1: "#9999FF",
        blocks: [
          {
            opcode: "scope",
            blockType: BlockType.COMMAND,
            branchCount: 1,
            text: "scope",
          },
          "---",
          {
            opcode: "create",
            blockType: BlockType.COMMAND,
            text: "create scoped [VAR] with [VALUE]",
            arguments: {
              VAR: {
                type: ArgumentType.STRING,
                defaultValue: "variable",
              },
              VALUE: {
                type: ArgumentType.STRING,
                defaultValue: "value",
              },
            },
          },
          {
            opcode: "set",
            blockType: BlockType.COMMAND,
            text: "set scoped [VAR] to [VALUE]",
            arguments: {
              VAR: {
                type: ArgumentType.STRING,
                defaultValue: "variable",
              },
              VALUE: {
                type: ArgumentType.STRING,
                defaultValue: "value",
              },
            },
          },
          {
            opcode: "get",
            blockType: BlockType.REPORTER,
            text: "get scoped [VAR]",
            arguments: {
              VAR: {
                type: ArgumentType.STRING,
                defaultValue: "variable",
              },
            },
          },
        ],
      };
    }

    _getVarObjByName(name, thread) {
      const { stackFrames } = thread;
      // current block is top-level, read it from thread
      if (stackFrames.length < 2) {
        // initialize in thread
        if (typeof thread.vars !== "object") {
          thread.vars = {};
        }
        return thread.vars;
      }

      // look up the variable from outer scope up
      for (let i = stackFrames.length - 2; i >= 0; i--) {
        const { executionContext } = stackFrames[i];
        // scope var hadn't been initialized in current stack frame
        if (
          executionContext === null ||
          typeof executionContext.vars !== "object"
        ) {
          continue;
        }
        // current stack frame doesn't have an object with the name
        if (!(name in executionContext.vars)) {
          continue;
        }
        return executionContext.vars;
      }

      // return if it exists in top-level
      if (typeof thread.vars === "object" && name in thread.vars) {
        return thread.vars;
      }

      // initialize in outer scope
      const outerStackFrame = stackFrames[stackFrames.length - 2];
      return this._initScope(outerStackFrame);
    }

    _initScope(outerStackFrame) {
      if (!outerStackFrame.executionContext) {
        outerStackFrame.executionContext = {};
      }
      const { executionContext } = outerStackFrame;
      if (typeof executionContext.vars !== "object") {
        executionContext.vars = {};
      }
      return executionContext.vars;
    }

    scope(args, util) {
      util.startBranch(1, false);
    }

    create(args, util) {
      const varName = Cast.toString(args.VAR);
      const stackFrames = util.thread.stackFrames;
      const outerStackFrame = stackFrames[stackFrames.length - 2];
      const vars = this._initScope(outerStackFrame);
      vars[varName] = Cast.toString(args.VALUE);
    }

    set(args, util) {
      const varName = Cast.toString(args.VAR);
      const vars = this._getVarObjByName(varName, util.thread);
      vars[varName] = Cast.toString(args.VALUE);
    }

    get(args, util) {
      const varName = Cast.toString(args.VAR);
      const vars = this._getVarObjByName(varName, util.thread);
      return vars[varName] ?? "";
    }
  }

  Scratch.extensions.register(new ScopeVar());
})(Scratch);
