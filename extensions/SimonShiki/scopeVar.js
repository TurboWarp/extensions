// Name: Scope Variables
// ID: scopeVar
// Description: Manage your data inside your stack (or substack).
// By: SimonShiki <https://scratch.mit.edu/users/SinanGentoo/>
// Original: Skyhigh173
// License: LGPL-3.0-only

(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) {
    throw new Error("Scope Variables must run unsandboxed.");
  }
  const { BlockType, ArgumentType, Cast } = Scratch;

  class ScopeVar {
    constructor() {
      this.patchCompiler();
      // @ts-expect-error used for dynamic-compilation mode
      Scratch.vm.runtime.ext_shikiScopeVar = this;
    }

    patchCompiler() {
      const dangerousExports =
      // @ts-expect-error used for patching compiler
        Scratch.vm.exports?.i_will_not_ask_for_help_when_these_break?.();
      // Don't patch older Turbowarp VM
      if (!dangerousExports) {
        return;
      }
      const ASTGen = dangerousExports.ScriptTreeGenerator;
      const IRGen = dangerousExports.IRGenerator;
      const JSGen = dangerousExports.JSGenerator;
      const { TYPE_STRING, TYPE_UNKNOWN, TypedInput, Frame } =
        JSGen.unstable_exports;

      // AST part
      const ast_descendInput = ASTGen.prototype.descendInput;
      ASTGen.prototype.descendInput = function (block, ...otherParams) {
        switch (block.opcode) {
          case "shikiScopeVar_get": {
            if (!this._hasScopeVar) {
              return {
                kind: "constant",
                value: "",
              };
            }

            const varName = this.descendInputOfBlock(block, "VAR");
            const isStaticName = varName.kind === "constant";
            // If the variable is static and the scope is static, we can optimize it by using `let`
            if (isStaticName && !this._dynamicScopeVar) {
              // variable has been declared before
              if (this._scopeVarPool?.has(varName.value)) {
                return {
                  kind: "shikiScopeVar.get",
                  name: varName,
                };
              }
              return {
                kind: "constant",
                value: "",
              };
            } else {
              // name is dynamic, disable all static var name optimizations.
              this._dynamicScopeVar = true;
              return {
                kind: "shikiScopeVar.get",
                name: varName,
              };
            }
          }
          default:
            return ast_descendInput.call(this, block, ...otherParams);
        }
      };

      const ast_descendStackedBlock = ASTGen.prototype.descendStackedBlock;
      ASTGen.prototype.descendStackedBlock = function (block, ...otherParams) {
        switch (block.opcode) {
          case "shikiScopeVar_scope":
            return {
              kind: "shikiScopeVar.scope",
              scoped: this.descendSubstack(block, "SUBSTACK"),
            };
          case "shikiScopeVar_range": {
            if (!this._hasScopeVar) this._hasScopeVar = true;
            const varName = this.descendInputOfBlock(block, "INDEX");
            const isStaticName = varName.kind === "constant";
            if (isStaticName && !this._dynamicScopeVar) {
              if (!this._scopeVarPool) {
                this._scopeVarPool = new Set();
              }
              this._scopeVarPool.add(varName.value);
            } else {
              this._dynamicScopeVar = true;
            }
            this.analyzeLoop();
            return {
              kind: "shikiScopeVar.range",
              from: this.descendInputOfBlock(block, "FROM"),
              to: this.descendInputOfBlock(block, "TO"),
              step: this.descendInputOfBlock(block, "STEP"),
              index: this.descendInputOfBlock(block, "INDEX"),
              scoped: this.descendSubstack(block, "SUBSTACK"),
            };
          }
          case "shikiScopeVar_forEachWithList": {
            if (!this._hasScopeVar) this._hasScopeVar = true;
            const varName = this.descendInputOfBlock(block, "VAR");
            const iName = this.descendInputOfBlock(block, "I");
            const isStaticName =
              varName.kind === "constant" && iName.kind === "constant";
            if (isStaticName && !this._dynamicScopeVar) {
              if (!this._scopeVarPool) {
                this._scopeVarPool = new Set();
              }
              this._scopeVarPool.add(varName.value);
              this._scopeVarPool.add(iName.value);
            } else {
              this._dynamicScopeVar = true;
            }
            this.analyzeLoop();
            return {
              kind: "shikiScopeVar.forEachWithList",
              scoped: this.descendSubstack(block, "SUBSTACK"),
              var: this.descendInputOfBlock(block, "VAR"),
              idx: this.descendInputOfBlock(block, "I"),
              list: this.descendInputOfBlock(block, "LIST"),
            };
          }
          case "shikiScopeVar_create": {
            if (!this._hasScopeVar) this._hasScopeVar = true;
            const varName = this.descendInputOfBlock(block, "VAR");
            const isStaticName = varName.kind === "constant";
            if (isStaticName && !this._dynamicScopeVar) {
              if (!this._scopeVarPool) {
                this._scopeVarPool = new Set();
              }
              this._scopeVarPool.add(varName.value);
            } else {
              this._dynamicScopeVar = true;
            }

            return {
              kind: "shikiScopeVar.create",
              name: varName,
              value: this.descendInputOfBlock(block, "VALUE"),
            };
          }
          case "shikiScopeVar_set": {
            if (!this._hasScopeVar) this._hasScopeVar = true;
            const varName = this.descendInputOfBlock(block, "VAR");
            const isStaticName = varName.kind === "constant";
            if (isStaticName && !this._dynamicScopeVar) {
              if (!this._scopeVarPool) {
                this._scopeVarPool = new Set();
              }
              this._scopeVarPool.add(varName.value);
            } else {
              this._dynamicScopeVar = true;
            }
            return {
              kind: "shikiScopeVar.set",
              name: varName,
              value: this.descendInputOfBlock(block, "VALUE"),
            };
          }
          case "shikiScopeVar_change": {
            if (!this._hasScopeVar) this._hasScopeVar = true;
            const varName = this.descendInputOfBlock(block, "VAR");
            const isStaticName = varName.kind === "constant";
            if (isStaticName && !this._dynamicScopeVar) {
              if (!this._scopeVarPool) {
                this._scopeVarPool = new Set();
              }
              this._scopeVarPool.add(varName.value);
            } else {
              this._dynamicScopeVar = true;
            }
            return {
              kind: "shikiScopeVar.change",
              name: varName,
              increment: this.descendInputOfBlock(block, "INCREMENT"),
            };
          }
          default:
            return ast_descendStackedBlock.call(this, block, ...otherParams);
        }
      };

      // IR Part
      const ir_generateScriptTree = IRGen.prototype.generateScriptTree;
      IRGen.prototype.generateScriptTree = function (
        generator,
        topBlockId,
        ...otherParams
      ) {
        const result = ir_generateScriptTree.call(
          this,
          generator,
          topBlockId,
          ...otherParams
        );
        // ASTGen -> IRGen
        if (generator._hasScopeVar) this._hasScopeVar = true;
        if (generator._dynamicScopeVar) this._dynamicScopeVar = true;
        if (generator._scopeVarPool)
          this._scopeVarPool = generator._scopeVarPool;
        return result;
      };

      const ir_generate = IRGen.prototype.generate;
      IRGen.prototype.generate = function (...otherParams) {
        const ir = ir_generate.call(this, ...otherParams);
        // IRGen -> JSGen
        if (this._hasScopeVar) ir._hasScopeVar = true;
        if (this._dynamicScopeVar) ir._dynamicScopeVar = true;
        if (this._scopeVarPool)
          ir._scopeVarPool = Array.from(this._scopeVarPool);
        return ir;
      };

      // JS Part

      JSGen.prototype.isScopeVarExist = function (scopedVarName) {
        let varExists = false;
        for (let i = this.frames.length - 1; i >= 0; i--) {
          const currentFrame = this.frames[i];
          if (
            currentFrame &&
            currentFrame.declaredScopeVars &&
            currentFrame.declaredScopeVars.includes(scopedVarName)
          ) {
            varExists = true;
            break;
          }
        }
        return varExists;
      };

      const js_descendStack = JSGen.prototype.descendStack;
      JSGen.prototype.descendStack = function (nodes, frame, ...otherParams) {
        if (this.ir._hasScopeVar) {
          if (this.ir._dynamicScopeVar) {
            // simulate sequencer logic, but may have a negative impact on performance
            if (this.frames.length < 1 && !this.script.isProcedure) {
              this.source += "thread.pushStack();\n";
            }
            this.source += "thread.pushStack();\n";
            js_descendStack.call(this, nodes, frame, otherParams);
            this.source += "thread.popStack();\n";
          } else {
            js_descendStack.call(this, nodes, frame, otherParams);
          }
        } else {
          js_descendStack.call(this, nodes, frame, otherParams);
        }
      };

      const js_descendInput = JSGen.prototype.descendInput;
      JSGen.prototype.descendInput = function (node, ...otherParams) {
        switch (node.kind) {
          case "shikiScopeVar.get": {
            if (this.ir._dynamicScopeVar) {
              return new TypedInput(
                `runtime.ext_shikiScopeVar._get(${this.descendInput(
                  node.name
                ).asString()}, thread)`,
                TYPE_UNKNOWN
              );
            }
            const scopedVarName = `scoped_${this.ir._scopeVarPool.indexOf(
              this.descendInput(node.name).constantValue
            )}`;

            if (this.isScopeVarExist(scopedVarName)) {
              return new TypedInput(scopedVarName, TYPE_UNKNOWN);
            }
            return new TypedInput(`""`, TYPE_STRING);
          }
          default:
            return js_descendInput.call(this, node, ...otherParams);
        }
      };

      const js_descendStackedBlock = JSGen.prototype.descendStackedBlock;
      JSGen.prototype.descendStackedBlock = function (node, ...otherParams) {
        switch (node.kind) {
          case "shikiScopeVar.scope":
            if (!this.ir._dynamicScopeVar) {
              this.source += "{\n";
            }
            this.descendStack.call(this, node.scoped, new Frame(false));
            if (!this.ir._dynamicScopeVar) {
              this.source += "}\n";
            }
            break;
          case "shikiScopeVar.range":
            if (!this.ir._dynamicScopeVar) {
              const scopedVarName = `scoped_${this.ir._scopeVarPool.indexOf(
                this.descendInput(node.index).constantValue
              )}`;

              const varExists = this.isScopeVarExist(scopedVarName);

              this.source += `for (${varExists ? "" : "let "}${scopedVarName} = ${this.descendInput(node.from).asNumber()}; ${scopedVarName} <= ${this.descendInput(node.to).asNumber()}; ${scopedVarName} += ${this.descendInput(node.step).asNumber()}) {\n`;
              if (!varExists) {
                const currentFrame = this.frames[this.frames.length - 1];
                if (!currentFrame.declaredScopeVars) {
                  currentFrame.declaredScopeVars = [];
                }
                currentFrame.declaredScopeVars.push(scopedVarName);
              }
              this.descendStack.call(this, node.scoped, new Frame(true));
              this.yieldLoop();
              this.source += "}\n";
            } else {
              const varGetter = `runtime.ext_shikiScopeVar._get(${this.descendInput(
                node.index
              ).asString()}, thread)`;
              this.source += `runtime.ext_shikiScopeVar._create(${this.descendInput(
                node.index
              ).asString()}, ${this.descendInput(
                node.from
              ).asUnknown()}, thread);\n`;
              this.source += `while (${varGetter} <= ${this.descendInput(node.to).asNumber()}) {\n`;
              this.descendStack.call(this, node.scoped, new Frame(true));
              this.source += `runtime.ext_shikiScopeVar._change(${this.descendInput(
                node.index
              ).asString()}, ${this.descendInput(node.step).asNumberOrNaN()}, thread);\n`;
              this.yieldLoop();
              this.source += "}\n";
            }
            break;
          case "shikiScopeVar.forEachWithList":
            if (!this.ir._dynamicScopeVar) {
              const scopedItemName = `scoped_${this.ir._scopeVarPool.indexOf(
                this.descendInput(node.var).constantValue
              )}`;
              const scopedIndexName = `scoped_${this.ir._scopeVarPool.indexOf(
                this.descendInput(node.idx).constantValue
              )}`;

              let itemExists = this.isScopeVarExist(scopedItemName);
              let indexExists = this.isScopeVarExist(scopedIndexName);

              this.source += `for (${indexExists ? "" : "let "}${scopedIndexName} = 0; ${scopedIndexName} < target.lookupOrCreateList(${this.descendInput(node.list).asString()}).value.length; ${scopedIndexName}++) {\n`;
              if (!indexExists) {
                const currentFrame = this.frames[this.frames.length - 1];
                if (!currentFrame.declaredScopeVars) {
                  currentFrame.declaredScopeVars = [];
                }
                currentFrame.declaredScopeVars.push(scopedIndexName);
              }
              if (!itemExists) {
                const currentFrame = this.frames[this.frames.length - 1];
                if (!currentFrame.declaredScopeVars) {
                  currentFrame.declaredScopeVars = [];
                }
                currentFrame.declaredScopeVars.push(scopedItemName);
              }
              this.source += `${itemExists ? "" : "let "}${scopedItemName} = target.lookupOrCreateList(${this.descendInput(node.list).asString()}).value[${scopedIndexName}];\n`;
              this.descendStack.call(this, node.scoped, {
                isLoop: true,
                isLastBlock: false,
              });
              this.yieldLoop();
              this.source += "}\n";
            } else {
              const idxGetter = `runtime.ext_shikiScopeVar._get(${this.descendInput(
                node.idx
              ).asString()}, thread)`;

              this.source += `runtime.ext_shikiScopeVar._create(${this.descendInput(
                node.idx
              ).asString()}, 0, thread);\n`;

              this.source += `while (${idxGetter} < target.lookupOrCreateList(${this.descendInput(node.list).asString()}).value.length) {\n`;
              this.source += `runtime.ext_shikiScopeVar._create(${this.descendInput(
                node.var
              ).asString()}, target.lookupOrCreateList(${this.descendInput(node.list).asString()}).value[${idxGetter}], thread);\n`;
              this.descendStack.call(this, node.scoped, {
                isLoop: true,
                isLastBlock: false,
              });
              this.source += `runtime.ext_shikiScopeVar._change(${this.descendInput(
                node.idx
              ).asString()}, 1, thread);\n`;
              this.yieldLoop();
              this.source += "}\n";
            }
            break;
          case "shikiScopeVar.create":
            if (this.ir._dynamicScopeVar) {
              this.source += `runtime.ext_shikiScopeVar._create(${this.descendInput(
                node.name
              ).asString()}, ${this.descendInput(
                node.value
              ).asUnknown()}, thread);\n`;
            } else {
              const currentFrame = this.frames[this.frames.length - 1];
              const scopedVarName = `scoped_${this.ir._scopeVarPool.indexOf(
                this.descendInput(node.name).constantValue
              )}`;

              // If not declared in current scope, just create it
              if (
                currentFrame &&
                currentFrame.declaredScopeVars &&
                currentFrame.declaredScopeVars.includes(scopedVarName)
              ) {
                this.source += `${scopedVarName} = ${this.descendInput(
                  node.value
                ).asUnknown()};\n`;
              } else {
                this.source += `let ${scopedVarName} = ${this.descendInput(
                  node.value
                ).asUnknown()};\n`;
                if (!currentFrame.declaredScopeVars) {
                  currentFrame.declaredScopeVars = [];
                }
                currentFrame.declaredScopeVars.push(scopedVarName);
              }
            }
            break;
          case "shikiScopeVar.set":
            if (this.ir._dynamicScopeVar) {
              this.source += `runtime.ext_shikiScopeVar._set(${this.descendInput(
                node.name
              ).asString()}, ${this.descendInput(
                node.value
              ).asUnknown()}, thread);\n`;
            } else {
              // Find if the variable is already declared in the current or outer scope
              const scopedVarName =
                "scoped_" +
                this.ir._scopeVarPool.indexOf(
                  this.descendInput(node.name).constantValue
                );

              if (this.isScopeVarExist(scopedVarName)) {
                this.source += `${scopedVarName} = ${this.descendInput(
                  node.value
                ).asUnknown()};\n`;
              } else {
                this.source += `let ${scopedVarName} = ${this.descendInput(
                  node.value
                ).asUnknown()};\n`;
                const currentFrame = this.frames[this.frames.length - 1];
                if (!currentFrame.declaredScopeVars) {
                  currentFrame.declaredScopeVars = [];
                }
                currentFrame.declaredScopeVars.push(scopedVarName);
              }
            }
            break;
          case "shikiScopeVar.change":
            if (this.ir._dynamicScopeVar) {
              this.source += `runtime.ext_shikiScopeVar._change(${this.descendInput(
                node.name
              ).asString()}, ${this.descendInput(
                node.increment
              ).asNumberOrNaN()}, thread);\n`;
            } else {
              // Find if the variable is already declared in the current or outer scope
              const scopedVarName =
                "scoped_" +
                this.ir._scopeVarPool.indexOf(
                  this.descendInput(node.name).constantValue
                );

              if (this.isScopeVarExist(scopedVarName)) {
                this.source += `${scopedVarName} = ${`(+${scopedVarName} || 0)`} + ${this.descendInput(
                  node.increment
                ).asNumberOrNaN()};\n`;
              } else {
                this.source += `let ${scopedVarName} = ${this.descendInput(
                  node.increment
                ).asNumberOrNaN()};\n`;
                const currentFrame = this.frames[this.frames.length - 1];
                if (!currentFrame.declaredScopeVars) {
                  currentFrame.declaredScopeVars = [];
                }
                currentFrame.declaredScopeVars.push(scopedVarName);
              }
            }
            break;
          default:
            return js_descendStackedBlock.call(this, node, ...otherParams);
        }
      };
    }

    getInfo() {
      return {
        id: "shikiScopeVar",
        name: Scratch.translate("Scope Variables"),
        docsURI: "https://extensions.turbowarp.org/SimonShiki/scopeVar",
        collaborator: "Skyhigh173, SimonShiki",
        description: "Manage your data inside.",
        color1: "#9999FF",
        color2: "#8686DF",
        blocks: [
          {
            opcode: "scope",
            blockType: BlockType.COMMAND,
            branchCount: 1,
            text: Scratch.translate("scope"),
          },
          {
            opcode: "range",
            blockType: BlockType.COMMAND,
            branchCount: 1,
            text: Scratch.translate(
              "range from [FROM] to [TO] step [STEP] index [INDEX]"
            ),
            arguments: {
              FROM: {
                type: ArgumentType.NUMBER,
                defaultValue: "1",
              },
              TO: {
                type: ArgumentType.NUMBER,
                defaultValue: "10",
              },
              STEP: {
                type: ArgumentType.NUMBER,
                defaultValue: "1",
              },
              INDEX: {
                type: ArgumentType.STRING,
                defaultValue: "index",
              },
            },
          },
          {
            opcode: "forEachWithList",
            blockType: BlockType.COMMAND,
            branchCount: 1,
            text: Scratch.translate("for each [I], [VAR] of [LIST]"),
            arguments: {
              I: {
                type: ArgumentType.STRING,
                defaultValue: "index",
              },
              VAR: {
                type: ArgumentType.STRING,
                defaultValue: "item",
              },
              LIST: {
                type: ArgumentType.STRING,
                menu: "LIST_MENU",
              },
            },
          },
          "---",
          {
            opcode: "create",
            blockType: BlockType.COMMAND,
            text: Scratch.translate("create scoped [VAR] with [VALUE]"),
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
            text: Scratch.translate("set scoped [VAR] to [VALUE]"),
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
            opcode: "change",
            blockType: BlockType.COMMAND,
            text: Scratch.translate("change scoped [VAR] by [INCREMENT]"),
            arguments: {
              VAR: {
                type: ArgumentType.STRING,
                defaultValue: "variable",
              },
              INCREMENT: {
                type: ArgumentType.NUMBER,
                defaultValue: "1",
              },
            },
          },
          {
            opcode: "get",
            blockType: BlockType.REPORTER,
            text: Scratch.translate("get scoped [VAR]"),
            arguments: {
              VAR: {
                type: ArgumentType.STRING,
                defaultValue: "variable",
              },
            },
          },
        ],
        menus: {
          LIST_MENU: {
            items: "_listMenu",
            acceptReporters: true,
          },
        },
      };
    }

    _listMenu() {
      const menus = [];
      let { variables } = Scratch.vm.runtime.getTargetForStage();
      Object.keys(variables).forEach((variable) => {
        if (variables[variable].type === "list") {
          menus.push({
            text: variables[variable].name,
            value: variables[variable].id,
          });
        }
      });
      if (
        Scratch.vm.editingTarget &&
        Scratch.vm.editingTarget !== Scratch.vm.runtime.getTargetForStage()
      ) {
        variables = Scratch.vm.editingTarget.variables;
        Object.keys(variables).forEach((variable) => {
          if (variables[variable].type) {
            menus.push({
              text: `[PRIVATE] ${variables[variable].name}`,
              value: variables[variable].id,
            });
          }
        });
      }
      if (menus.length === 0) {
        menus.push({
          text: "-",
          value: "empty",
        });
      }
      return menus;
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
      const value = Cast.toString(args.VALUE);
      this._create(varName, value, util.thread);
    }

    _create(varName, value, thread) {
      const stackFrames = thread.stackFrames;

      // current block is top-level, create it in thread
      if (stackFrames.length < 2) {
        // initialize in thread
        if (typeof thread.vars !== "object") {
          thread.vars = {};
        }
        thread.vars[varName] = value;
        return;
      }

      const outerStackFrame = stackFrames[stackFrames.length - 2];
      const vars = this._initScope(outerStackFrame);
      vars[varName] = value;
    }

    set(args, util) {
      const varName = Cast.toString(args.VAR);
      this._set(varName, Cast.toString(args.VALUE), util.thread);
    }

    _set(varName, value, thread) {
      const vars = this._getVarObjByName(varName, thread);
      vars[varName] = value;
    }

    change(args, util) {
      const varName = Cast.toString(args.VAR);
      const dValue = Cast.toNumber(args.INCREMENT);
      this._change(varName, dValue, util.thread);
    }

    _change(varName, delta, thread) {
      const vars = this._getVarObjByName(varName, thread);
      vars[varName] = Cast.toNumber(vars[varName]) + delta;
    }

    get(args, util) {
      const varName = Cast.toString(args.VAR);
      return this._get(varName, util.thread);
    }

    _get(varName, thread) {
      const vars = this._getVarObjByName(varName, thread);
      return vars[varName] ?? "";
    }

    range(args, util) {
      const from = Cast.toNumber(args.FROM);
      const to = Cast.toNumber(args.TO);
      const step = Cast.toNumber(args.STEP);
      const index = Cast.toString(args.INDEX);

      if (typeof util.stackFrame.rangeIndex === "undefined") {
        util.stackFrame.rangeIndex = from;
      }

      if (util.stackFrame.rangeIndex <= to) {
        this._set(index, util.stackFrame.rangeIndex, util.thread);
        util.stackFrame.rangeIndex += step;
        util.startBranch(1, true);
      }
    }

    forEachWithList(args, util) {
      const listId = args.LIST;
      const { value: list } = util.target.lookupOrCreateList(listId);
      const varName = Cast.toString(args.VAR);
      const index = Cast.toString(args.I);

      if (typeof util.stackFrame.foreachIndex === "undefined") {
        util.stackFrame.foreachIndex = 0;
      }

      if (util.stackFrame.foreachIndex < list.length) {
        this._set(varName, list[util.stackFrame.foreachIndex], util.thread);
        this._set(index, util.stackFrame.foreachIndex, util.thread);
        util.stackFrame.foreachIndex++;
        util.startBranch(1, true);
      }
    }
  }

  // @ts-expect-error '---' should be treated as a constant string
  Scratch.extensions.register(new ScopeVar());
})(Scratch);
