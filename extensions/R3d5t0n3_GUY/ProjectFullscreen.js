// Name: Project Fullscreen
// ID: r3d5t0n3guyprojectfullscreen
// Description: Enter and exit TurboWarp's fullscreen
// By: R3d5t0n3_GUY <https://github.com/R3d5t0n3GUY>

(function (Scratch) {
  'use strict';

  if (Scratch.extensions.unsandboxed) {
    class ProjectFullscreen {
      getInfo() {
        return {
          id: 'ProjectFullscreen',
          name: Scratch.translate('Project Fullscreen'),
          color1: '#1FBF5F',
          color2: '#007F2F',
          color3: '#001F00',
          blocks: [
            {
              opcode: 'isSupported',
              func: 'checkCompatibility',
              blockType: Scratch.BlockType.BOOLEAN,
              text: Scratch.translate('is supported?')
            },
            {
              opcode: 'alterFullscreen',
              func: 'switchMode',
              blockType: Scratch.BlockType.COMMAND,
              text: Scratch.translate(
                "[mode] fullscreen"
              ),
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
              text: Scratch.translate('is fullscreen?')
            },
          ],
          menus: {
            fullScreenActionMenu: {
              items: [
                {
                  text: Scratch.translate('enter'),
                  value: 'enterFullscreen'
                },
                {
                  text: Scratch.translate('exit'),
                  value: 'exitFullscreen'
                },
                {
                  text: Scratch.translate('toggle'),
                  value: 'toggleFullscreen'
                },
              ]
            }
          }
        };
      }
      locateNodeList() {
        return document.getElementsByClassName('stage-header_stage-button-icon_3zzFK')
      }
      checkCompatibility() {
        return this.locateNodeList().length > 0
      }
      switchMode({mode}) {
        if (this.checkCompatibility()) {
          if ((this.evaluate()) === (mode === "exitFullscreen") || mode === "toggleFullscreen") this.locateNodeList()[this.locateNodeList().length - 1].click()
        } else {
          console.warn("HtmlError. Could not locate node containing activateFullScreen ClickEvent");
        }
      }
      evaluate() {
        if (this.locateNodeList()) {
          return location.pathname.search(/\/fullscreen/i) > -1
        } else {
          //console.warn("HtmlError. Could not locate node containing activateFullScreen ClickEvent");
          return ""
        }
      }
    }

    Scratch.extensions.register(new ProjectFullscreen());
  } else{
    throw new Error('This extension must run unsandboxed');
  }
})(Scratch);