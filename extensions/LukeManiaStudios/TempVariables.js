(function(Scratch) {
  'use strict';

  var vars = {};
  vars['variables'] = {};

  class TempVars {
    getInfo() {
      return {
        id: 'lmstempvars',
        name: 'Temporary Variables',
        color1: '#FF791A',
        color2: '#E15D00',
        blocks: [
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
            }
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
            }
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
            }
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
            }
          },
          {
            opcode: 'deleteAllVariables',
            blockType: Scratch.BlockType.COMMAND,
            text: 'delete all variables',
          },
          {
            opcode: 'listVariables',
            blockType: Scratch.BlockType.REPORTER,
            text: 'list active variables',
            disableMonitor: true,
          }
        ]
      }
    }

    getVariable (args) {
      if (args.INPUT in vars['variables']) {
        return (vars['variables'][args.INPUT]);
      } else {
        return '';
      }
    }

    setVariableTo (args) {
      vars['variables'][args.INPUTA] = args.INPUTB;
    }

    changeVariableBy (args) {
      if (args.INPUTA in vars['variables']) {
        var prev = vars['variables'][args.INPUTA];
        var next = args.INPUTB;
        vars['variables'][args.INPUTA] = (prev + next);
      } else {
        vars['variables'][args.INPUTA] = args.INPUTB;
      }
    }

    listVariables (args, util) {
      if (Object.keys(vars['variables']).length) {
        var output = Object.keys(vars['variables']);
        return output;
      } else {
        return;
      }
    }

    deleteVariable (args) {
      Reflect.deleteProperty(vars['variables'], args.INPUT);
    }

    deleteAllVariables () {
      Reflect.deleteProperty(vars, 'variables');
      vars['variables'] = {};
    }
  }
  Scratch.extensions.register(new TempVars());
})(Scratch);
