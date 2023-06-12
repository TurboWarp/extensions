(function (Scratch) {
  'use strict';

  const vm = Scratch.vm;
  const runtime = vm.runtime;
  const isPackaged = runtime.isPackaged;

  let allowJSCode = false;
  if (isPackaged) {
    allowJSCode = true;
  }

  let ineditor = false;

  // Credit to TheShovel for the GUI element.
  const para = document.createElement("p");
  if(ineditor == false) {
    try {
      scaffolding
    }
    catch(err) {
      para.innerText = "JavaScript: JavaScript is currently disabled.";
      document.querySelector("#app > div > div > div > div.gui_body-wrapper_-N0sA.box_box_2jjDp > div > div.gui_stage-and-target-wrapper_69KBf.box_box_2jjDp > div.stage-wrapper_stage-wrapper_2bejr.box_box_2jjDp > div.stage-wrapper_stage-canvas-wrapper_3ewmd.box_box_2jjDp").appendChild(para);
    }
  }
  try {
    scaffolding
    setTimeout(function(){
    checkifexists();
    }, 100);
  } catch(err) {
    ineditor = true;
  }
    
  class CustomJS {
    getInfo() {
      return {
        id: 'lmsJavaScript',
        name: 'JavaScript',
        color1: '#b7a73d',
        blocks: [
          {
            func: 'enableDangerousJS',
            blockType: Scratch.BlockType.BUTTON,
            text: 'Enable Dangeous JS Code',
            hideFromPalette: allowJSCode
          },
          {
            func: 'disableDangerousJS',
            blockType: Scratch.BlockType.BUTTON,
            text: 'Disable Dangeous JS Code',
            hideFromPalette: !allowJSCode
          },
          {
            opcode: 'jsAllowed',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'is JS allowed?'
          },
          
          '---',

          {
            opcode: 'execute',
            func: 'javascript',
            blockType: Scratch.BlockType.COMMAND,
            text: 'execute [JS]',
            arguments: {
              JS: {
                type: Scratch.ArgumentType.STRING,
              }
            }
          },
          {
            opcode: 'evaluateReporter',
            func: 'javascript',
            blockType: Scratch.BlockType.REPORTER,
            text: 'evaluate [JS]',
            arguments: {
              JS: {
                type: Scratch.ArgumentType.STRING,
              }
            }
          },
          {
            opcode: 'evaluateBoolean',
            func: 'javascript',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'evaluate [JS]',
            arguments: {
              JS: {
                type: Scratch.ArgumentType.STRING,
              }
            }
          },
        ]
      };
    }

    enableDangerousJS() {
      const alert = (
        'WARNING' +
        '\n' +
        '\n' +
        'Enabling this will allow the project to run dangerous scripts.' +
        '\n' +
        'Do not enable this unless you know exactly what this does.'
      )
      if (confirm(alert)) {
        allowJSCode = true;
        para.style.display = 'none';
      }
      Scratch.vm.extensionManager.refreshBlocks();
    }

    disableDangerousJS() {
      allowJSCode = false;
      para.style.display = 'block';
      Scratch.vm.extensionManager.refreshBlocks();
    }

    jsAllowed() {
      return allowJSCode;
    }

    javascript(args, util) {
      if (allowJSCode) try {
        const output = eval(args.JS);
        return (output) ? output : '';
      } catch (error) {
        return '';
      } else {
        return '';
      }
    }
  }

  Scratch.extensions.register(new CustomJS());
})(Scratch);