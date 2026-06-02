// Name: Project Fullscreen
// ID: r3d5t0n3guyprojectfullscreen
// Description: Enter and exit TurboWarp's built-in fullscreen
// By: R3d5t0n3_GUY
// NOTICE: THIS EXTENSION DOES NOT WORK IF THE PROJECT IS PACKAGED

(function (Scratch) {
  'use strict';

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('This extension must run unsandboxed');
  }
  
  class ProjectFullscreen {
    getInfo() {
      return {
        id: 'ProjectFullscreen',
        name: 'Project Fullscreen',
        color1: '#1FBF5F',
        blocks: [
          {
            opcode: 'alterFullscreen',
            func: 'switchMode',
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("[mode] fullscreen"),
            arguments: {
              mode: {
                type: Scratch.ArgumentType.STRING,
                menu: "fullScreenActionMenu"
              }
            }
          },
          {
            opcode: 'evaluateFullscreen',
            func: 'evaluate',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'is fullscreen?'
          },
        ],
        menus: {
          fullScreenActionMenu: {
            items: [
              {
                text: Scratch.translate('enter'),
                value: "1"
              },
              {
                text: Scratch.translate('exit'),
                value: "-1"
              },
              {
                text: Scratch.translate('toggle'),
                value: "0"
              },
            ]
          }
        }
      };
    }
    switchMode({mode}) {
      if ((this.evaluate()) === (mode === "-1") || mode === "0") document.getElementsByClassName('stage-header_stage-button-icon_3zzFK')[document.getElementsByClassName('stage-header_stage-button-icon_3zzFK').length - 1].click()
    }
    evaluate() {
      return location.pathname == '/fullscreen'
    }
  }

  Scratch.extensions.register(new ProjectFullscreen());
})(Scratch);