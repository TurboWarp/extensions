(function(Scratch) {
  'use strict';

  const menuIconURI = '';

  // Object.create(null) prevents "variable [toString]" from returning a function
  let runtimeVariables = Object.create(null);
  let variables = Object.create(null);
 
  // Credit to skyhigh173 for the idea of this
  const label = (name, hidden) => ({
    blockType: Scratch.BlockType.LABEL,
    text: name,
    hideFromPalette: hidden
  });

  function resetRuntimeVariables() {
    console.log('runtime variables cleared');
    runtimeVariables = Object.create(null);
  }

  class TempVars {
    constructor() {
      Scratch.vm.runtime.on('PROJECT_START', () => {
        resetRuntimeVariables();
      });

      Scratch.vm.runtime.on('PROJECT_STOP_ALL', () => {
        resetRuntimeVariables();
      });
    }

    getInfo() {
      return {
        id: 'lmstempvars',
        name: 'Temporary Variables',
        color1: '#FF791A',
        color2: '#E15D00',
        menuIconURI: menuIconURI,
        blocks: [
          
          label('Thread Variables', false),

          {
            opcode: 'setThreadVariable',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set thread var [VAR] to [STRING]',
            arguments: {
              VAR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'variable'
              },
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '0'
              }
            },
          },
          {
            opcode: 'changeThreadVariable',
            blockType: Scratch.BlockType.COMMAND,
            text: 'change thread var [VAR] by [NUM]',
            arguments: {
              VAR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'variable'
              },
              NUM: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '1'
              }
            },
          },

          '---',

          {
            opcode: 'getThreadVariable',
            blockType: Scratch.BlockType.REPORTER,
            text: 'thread var [VAR]',
            arguments: {
              VAR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'variable'
              }
            }
          },
          {
            opcode: 'threadVariableExists',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'thread var [VAR] exists?',
            arguments: {
              VAR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'variable'
              }
            }
          },

          '---',

          /* Add this when the compiler supports it
          {
            opcode: 'forEachThreadVariable',
            blockType: Scratch.BlockType.LOOP,
            text: 'for each [VAR] in [NUM]',
            arguments: {
              VAR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'thread variable'
              },
              NUM: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '10'
              }
            }
          },
          */
          {
            opcode: 'listThreadVariables',
            blockType: Scratch.BlockType.REPORTER,
            text: 'list active thread variables',
            disableMonitor: true
          },

          '---',

          label('Runtime Variables', false),

          {
            opcode: 'setRuntimeVariable',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set runtime var [VAR] to [STRING]',
            arguments: {
              VAR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'variable'
              },
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '0'
              }
            }
          },
          {
            opcode: 'changeRuntimeVariable',
            blockType: Scratch.BlockType.COMMAND,
            text: 'change runtime var [VAR] by [NUM]',
            arguments: {
              VAR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'variable'
              },
              NUM: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '1'
              }
            }
          },

          '---',

          {
            opcode: 'getRuntimeVariable',
            blockType: Scratch.BlockType.REPORTER,
            text: 'runtime var [VAR]',
            disableMonitor: true,
            arguments: {
              VAR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'variable'
              }
            }
          },
          {
            opcode: 'runtimeVariableExists',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'runtime var [VAR] exists?',
            arguments: {
              VAR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'variable'
              }
            }
          },

          '---',

          {
            opcode: 'deleteRuntimeVariable',
            blockType: Scratch.BlockType.COMMAND,
            text: 'delete runtime var [VAR]',
            arguments: {
              VAR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'variable'
              }
            }
          },
          {
            opcode: 'deleteAllRuntimeVariables',
            blockType: Scratch.BlockType.COMMAND,
            text: 'delete all runtime variables',
          },
          {
            opcode: 'listRuntimeVariables',
            blockType: Scratch.BlockType.REPORTER,
            text: 'list active runtime variables'
          },

          '---',

          /*!
           * -- OLD BLOCKS --
           * Since the other blocks now work differently
           * we need to hide the older versions to not
           * to avoid confusion.
           */

          {
            opcode: 'setVariableTo',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set variable [INPUTA] to [INPUTB]',
            arguments: {
              INPUTA: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'my variable'
              },
              INPUTB: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '0'
              }
            },
            hideFromPalette: true
          },
          {
            opcode: 'changeVariableBy',
            blockType: Scratch.BlockType.COMMAND,
            text: 'change variable [INPUTA] by [INPUTB]',
            arguments: {
              INPUTA: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'my variable'
              },
              INPUTB: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '1'
              }
            },
            hideFromPalette: true
          },
          {
            opcode: 'getVariable',
            blockType: Scratch.BlockType.REPORTER,
            text: 'variable [INPUT]',
            disableMonitor: true,
            arguments: {
              INPUT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'my variable'
              }
            },
            hideFromPalette: true
          },

          '---',

          {
            opcode: 'deleteVariable',
            blockType: Scratch.BlockType.COMMAND,
            text: 'delete variable [INPUT]',
            arguments: {
              INPUT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'my variable'
              }
            },
            hideFromPalette: true
          },
          {
            opcode: 'deleteAllVariables',
            blockType: Scratch.BlockType.COMMAND,
            text: 'delete all variables',
            hideFromPalette: true
          },
          {
            opcode: 'listVariables',
            blockType: Scratch.BlockType.REPORTER,
            text: 'list active variables',
            disableMonitor: true,
            hideFromPalette: true
          }
        ]
      };
    }

    /* THREAD VARIABLES */

    setThreadVariable(args, util) {
      const thread = util.thread;
      if (!thread.variables) thread.variables = {};
      const vars = thread.variables;
      vars[args.VAR] = args.STRING;
    }

    changeThreadVariable(args, util) {
      const thread = util.thread;
      if (!thread.variables) thread.variables = {};
      const vars = thread.variables;
      const prev = Scratch.Cast.toNumber(vars[args.VAR]);
      const next = Scratch.Cast.toNumber(args.NUM);
      vars[args.VAR] = prev + next;
    }

    getThreadVariable (args, util) {
      const thread = util.thread;
      if (!thread.variables) thread.variables = {};
      const vars = thread.variables;
      const varValue = vars[args.VAR];
      if (typeof varValue === 'undefined') return '';
      return varValue;
    }

    threadVariableExists (args, util) {
      const thread = util.thread;
      if (!thread.variables) thread.variables = {};
      const vars = thread.variables;
      const varValue = vars[args.VAR];
      return !(typeof varValue === 'undefined');
    }

    forEachThreadVariable(args, util) {
      const thread = util.thread;
      if (!thread.variables) thread.variables = {};
      const vars = thread.variables;
      if (typeof util.stackFrame.index === 'undefined') {
        util.stackFrame.index = 0;
      }
      if (util.stackFrame.index < Number(args.NUM)) {
        util.stackFrame.index++;
        vars[args.VAR] = util.stackFrame.index;
        util.startBranch(1, true);
      }
    }

    listThreadVariables(args, util) {
      const thread = util.thread;
      if (!thread.variables) thread.variables = {};
      const vars = thread.variables;
      return Object.keys(vars).join(',');
    }

    /* RUNTIME VARIABLES */
    
    setRuntimeVariable (args) {
      runtimeVariables[args.VAR] = args.STRING;
    }

    changeRuntimeVariable (args) {
      const prev = Scratch.Cast.toNumber(runtimeVariables[args.VAR]);
      const next = Scratch.Cast.toNumber(args.NUM);
      runtimeVariables[args.VAR] = prev + next;
    }

    getRuntimeVariable (args) {
      if (!(args.VAR in runtimeVariables)) return '';
      return runtimeVariables[args.VAR];
    }

    runtimeVariableExists (args) {
      return (args.VAR in runtimeVariables);
    }

    listRuntimeVariables (args, util) {
      return Object.keys(runtimeVariables).join(',');
    }

    deleteRuntimeVariable (args) {
      Reflect.deleteProperty(runtimeVariables, args.VAR);
    }

    deleteAllRuntimeVariables () {
      runtimeVariables = Object.create(null);
    }

    /* OLD TEMP VARS */

    getVariable (args) {
      if (args.INPUT in variables) {
        return (variables[args.INPUT]);
      } else {
        return '';
      }
    }

    setVariableTo (args) {
      variables[args.INPUTA] = args.INPUTB;
    }

    changeVariableBy (args) {
      if (args.INPUTA in variables) {
        const prev = Scratch.Cast.toNumber(variables[args.INPUTA]);
        const next = Scratch.Cast.toNumber(args.INPUTB);
        variables[args.INPUTA] = (prev + next);
      } else {
        variables[args.INPUTA] = args.INPUTB;
      }
    }

    listVariables (args, util) {
      return Object.keys(variables).join(',');
    }

    deleteVariable (args) {
      Reflect.deleteProperty(variables, args.INPUT);
    }

    deleteAllVariables () {
      variables = Object.create(null);
    }
  }
  Scratch.extensions.register(new TempVars());
})(Scratch);
