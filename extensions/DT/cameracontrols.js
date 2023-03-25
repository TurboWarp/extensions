(Scratch => {
  'use strict';

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('Camera extension must be run unsandboxed');
  }

  const icon = 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIyMjUuMzU0OCIgaGVpZ2h0PSIyMjUuMzU0OCIgdmlld0JveD0iMCwwLDIyNS4zNTQ4LDIyNS4zNTQ4Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTg3LjMyMjkzLC0zNy4zMjI1OSkiPjxnIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2lzUGFpbnRpbmdMYXllciZxdW90Ozp0cnVlfSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMTg3LjMyMjk0LDE1MGMwLC02Mi4yMzAwMSA1MC40NDczOSwtMTEyLjY3NzQgMTEyLjY3NzQsLTExMi42Nzc0YzYyLjIzMDAxLDAgMTEyLjY3NzQsNTAuNDQ3MzkgMTEyLjY3NzQsMTEyLjY3NzRjMCw2Mi4yMzAwMSAtNTAuNDQ3MzksMTEyLjY3NzQgLTExMi42Nzc0LDExMi42Nzc0Yy02Mi4yMzAwMSwwIC0xMTIuNjc3NCwtNTAuNDQ3MzkgLTExMi42Nzc0LC0xMTIuNjc3NHoiIGZpbGw9IiNmZjRkYTciIHN0cm9rZS13aWR0aD0iMCIvPjxnPjxwYXRoIGQ9Ik0zMTcuMTAyOSw4MC44MTA4N2MyMS44OTI0LDAgMzkuNjYyMDcsMTcuNzM3MjMgMzkuNjYyMDcsMzkuNjM0NGMwLDEyLjMwNTE3IC01LjYxMTQ4LDIzLjI5NjIyIC0xNC40MDA4OCwzMC41NjgyNGg4Ljc3MDMydjY4LjE3NTYzaC0xMTQuMTMzMjV2LTU1Ljc5ODg5Yy0xNC4zMzQwOCwtMy41MjgxNyAtMjQuOTYxNTMsLTE2LjQ1NzQ3IC0yNC45NjE1MywtMzEuODgwNDRjMCwtMTguMTM5IDE0LjY5NjczLC0zMi44MzQ3OCAzMi44MzQ3OCwtMzIuODM0NzhjMTIuMDM3OTUsMCAyMi41NTY2MSw2LjQ3ODAxIDI4LjI3MjExLDE2LjEzMzk1bDQuODYxMzcsLTAuOTI0NzVjMy4xMjkyNiwtMTguNzY2OTYgMTkuNDM5NzYsLTMzLjA3MzM2IDM5LjA5OTAyLC0zMy4wNzMzNnpNMjc2LjIxODUxLDE0MS4yOTE3MWMtMS4xMDAzNSwzLjUzMzg5IC0yLjc2OTQ3LDYuODEyMDMgLTQuOTIwNTQsOS43MjE3OWgyMC41NDc3NGMtMy42ODc1NCwtMy4wNDgxNCAtNi44MDI0OCwtNi43NjUyNyAtOS4xODU0NSwtMTAuOTQ0Mjl6IiBmaWxsPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjEiLz48cGF0aCBkPSJNMzM2LjU3NTI5LDExOS41MjgxNWMwLDExLjA2ODM1IC04Ljk3MjY0LDIwLjA0MDk5IC0yMC4wNDA5OSwyMC4wNDA5OWMtMTEuMDY4MzUsMCAtMjAuMDQwOTksLTguOTcyNjQgLTIwLjA0MDk5LC0yMC4wNDA5OWMwLC0xMS4wNjgzNSA4Ljk3MjY0LC0yMC4wNDA5OSAyMC4wNDA5OSwtMjAuMDQwOTljMTEuMDY4MzUsMCAyMC4wNDA5OSw4Ljk3MjY0IDIwLjA0MDk5LDIwLjA0MDk5eiIgZmlsbD0iI2ZmNGRhNyIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48cGF0aCBkPSJNMjYxLjE4MywxMzAuMDI1ODFjMCw4Ljk2MDA0IC03LjI2MzYyLDE2LjIyMzY2IC0xNi4yMjM2NiwxNi4yMjM2NmMtOC45NjAwNCwwIC0xNi4yMjM2NiwtNy4yNjM2MiAtMTYuMjIzNjYsLTE2LjIyMzY2YzAsLTguOTYwMDQgNy4yNjM2MiwtMTYuMjIzNjYgMTYuMjIzNjYsLTE2LjIyMzY2YzguOTYwMDQsMCAxNi4yMjM2Niw3LjI2MzYyIDE2LjIyMzY2LDE2LjIyMzY2eiIgZmlsbD0iI2ZmNGRhNyIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48cGF0aCBkPSJNMzg3Ljk2MDM5LDE0NS44NTcyNHY2MC41MTA0M2wtMjEuNjAzMjYsLTEzLjQ3MjE3aC0xNi44OTgzNHYtMzMuNTY2MDdoMTYuODk4MzRsMjEuNTk5MTcsLTEzLjQ3MTEyeiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9nPjwvZz48L2c+PC9zdmc+PCEtLXJvdGF0aW9uQ2VudGVyOjExMi42NzcwNjU6MTEyLjY3NzQwNS0tPg==';

  const vm = Scratch.vm;

  let cameraX = 0;
  let cameraY = 0;
  let cameraZoom = 100;
  let cameraDirection = 90;
  let cameraBG = '#ffffff';

  vm.runtime.runtimeOptions.fencing = false;
  vm.renderer.offscreenTouching = true;

  function updateCamera(x = cameraX, y = cameraY, scale = cameraZoom / 100, rot = -cameraDirection + 90) {
    rot = rot / 180 * Math.PI;
    let s = Math.sin(rot) * scale;
    let c = Math.cos(rot) * scale;
    let w = vm.runtime.stageWidth / 2;
    let h = vm.runtime.stageHeight / 2;
    vm.renderer._projection = [
      c / w, -s / h, 0, 0,
      s / w, c / h, 0, 0,
      0, 0, -1, 0,
      (c * -x + s * -y) / w, (c * -y - s * -x) / h, 0, 1
    ];
    vm.renderer.dirty = true;
  }

  // tell resize to update camera as well
  vm.runtime.on('STAGE_SIZE_CHANGED', _ => updateCamera());

  // fix mouse positions
  let oldSX = vm.runtime.ioDevices.mouse.getScratchX;
  let oldSY = vm.runtime.ioDevices.mouse.getScratchY;

  vm.runtime.ioDevices.mouse.getScratchX = function(...a) {
    return (oldSX.apply(this, a) + cameraX) / cameraZoom * 100;
  };
  vm.runtime.ioDevices.mouse.getScratchY = function(...a) {
    return (oldSY.apply(this, a) + cameraY) / cameraZoom * 100;
  };

  class Camera {

    getInfo() {
      return {

        id: 'DTcameracontrols',
        name: 'Camera',

        color1: '#ff4da7',
        color2: '#b93778',
        color3: '#b93778',

        menuIconURI: icon,

        menus: {
          sprites: {
            items: 'getSprites',
            acceptReporters: true,
          }
        },
        blocks: [
          {
            opcode: 'moveSteps',
            blockType: Scratch.BlockType.COMMAND,
            text: 'move camera [val] steps',
            arguments: {
              val: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 10
              },
            }
          },
          {
            opcode: 'rotateCW',
            blockType: Scratch.BlockType.COMMAND,
            text: 'turn camera clockwise [val] degrees',
            arguments: {
              val: {
                type: Scratch.ArgumentType.ANGLE,
                defaultValue: 15
              }
            }
          },
          {
            opcode: 'rotateCCW',
            blockType: Scratch.BlockType.COMMAND,
            text: 'turn camera counter-clockwise [val] degrees',
            arguments: {
              val: {
                type: Scratch.ArgumentType.ANGLE,
                defaultValue: 15
              }
            }
          },
          '---',
          /* {
            opcode: 'goTo',
            blockType: Scratch.BlockType.COMMAND,
            text: 'move camera to [sprite]',
            arguments: {
              sprite: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "mouse-pointer",
                menu: "sprites",
              },
            }
          }, */
          {
            opcode: 'setBoth',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set camera to x: [x] y: [y]',
            arguments: {
              x: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              },
              y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              },
            }
          },
          "---",
          {
            opcode: 'setDirection',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set camera direction to [val]',
            arguments: {
              val: {
                type: Scratch.ArgumentType.ANGLE,
                defaultValue: 90
              }
            }
          },
          /* {
            opcode: 'pointTowards',
            blockType: Scratch.BlockType.COMMAND,
            text: 'point camera towards [sprite]',
            arguments: {
              sprite: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "mouse-pointer",
                menu: "sprites",
              },
            }
          }, */
          '---',
          {
            opcode: 'changeX',
            blockType: Scratch.BlockType.COMMAND,
            text: 'change camera x by [val]',
            arguments: {
              val: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 10
              }
            }
          },
          {
            opcode: 'setX',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set camera x to [val]',
            arguments: {
              val: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              }
            }
          },
          {
            opcode: 'changeY',
            blockType: Scratch.BlockType.COMMAND,
            text: 'change camera y by [val]',
            arguments: {
              val: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 10
              }
            }
          },
          {
            opcode: 'setY',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set camera y to [val]',
            arguments: {
              val: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              }
            }
          },
          "---",
          {
            opcode: 'getX',
            blockType: Scratch.BlockType.REPORTER,
            text: 'camera x',
          },
          {
            opcode: 'getY',
            blockType: Scratch.BlockType.REPORTER,
            text: 'camera y',
          },
          {
            opcode: 'getDirection',
            blockType: Scratch.BlockType.REPORTER,
            text: 'camera direction',
          },
          '---',
          {
            opcode: 'changeZoom',
            blockType: Scratch.BlockType.COMMAND,
            text: 'change camera zoom by [val]',
            arguments: {
              val: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 10
              }
            }
          },
          {
            opcode: 'setZoom',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set camera zoom to [val] %',
            arguments: {
              val: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100
              }
            }
          },
          {
            opcode: 'getZoom',
            blockType: Scratch.BlockType.REPORTER,
            text: 'camera zoom',
          },
          '---',
          {
            opcode: 'setCol',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set background color to [val]',
            arguments: {
              val: {
                type: Scratch.ArgumentType.COLOR
              }
            }
          },
          {
            opcode: 'getCol',
            blockType: Scratch.BlockType.REPORTER,
            text: 'background color',
          },
        ]
      };
    }

    getSprites(){
      let sprites = ["mouse-pointer"];
      Scratch.vm.runtime.targets.forEach(e=>{
        if (e.isOriginal && !e.isStage) sprites.push(e.sprite.name);
      });
      return sprites;
    }

    setBoth(ARGS, util) {
      cameraX = +ARGS.x;
      cameraY = +ARGS.y;
      updateCamera();
      vm.runtime.requestRedraw();
    }
    changeZoom(ARGS, util) {
      cameraZoom += +ARGS.val;
      updateCamera();
      vm.runtime.requestRedraw();
    }
    setZoom(ARGS, util) {
      cameraZoom = +ARGS.val;
      updateCamera();
      vm.runtime.requestRedraw();
    }
    changeX(ARGS, util) {
      cameraX += +ARGS.val;
      updateCamera();
      vm.runtime.requestRedraw();
    }
    setX(ARGS, util) {
      cameraX = +ARGS.val;
      updateCamera();
      vm.runtime.requestRedraw();
    }
    changeY(ARGS, util) {
      cameraY += +ARGS.val;
      updateCamera();
      vm.runtime.requestRedraw();
    }
    setY(ARGS, util) {
      cameraY = +ARGS.val;
      updateCamera();
      vm.runtime.requestRedraw();
    }
    setDirection(ARGS, util) {
      cameraDirection = +ARGS.val;
      updateCamera();
      vm.runtime.requestRedraw();
    }
    rotateCW(ARGS, util) {
      cameraDirection = cameraDirection + +ARGS.val;
      updateCamera();
      vm.runtime.requestRedraw();
    }
    rotateCCW(ARGS, util) {
      cameraDirection = cameraDirection - +ARGS.val;
      updateCamera();
      vm.runtime.requestRedraw();
    }
    getX() {
      return cameraX;
    }
    getY() {
      return cameraY;
    }
    getZoom() {
      return cameraZoom;
    }
    getDirection() {
      return cameraDirection;
    }
    setCol(ARGS, util) {
      cameraBG = ARGS.val;
      Scratch.vm.renderer.setBackgroundColor(
        parseInt(cameraBG.substring(1, 3), 16) / 255,
        parseInt(cameraBG.substring(3, 5), 16) / 255,
        parseInt(cameraBG.substring(5, 7), 16) / 255
      );
    }
    getCol() {
      return cameraBG;
    }
    moveSteps(ARGS) {
      let dir = (-cameraDirection + 90) * Math.PI / 180;
      cameraX += ARGS.val * Math.cos(dir);
      cameraY += ARGS.val * Math.sin(dir);
      updateCamera();
      vm.runtime.requestRedraw();
    }
    goTo() {

    }
    pointTowards() {

    }
  }

  Scratch.extensions.register(new Camera());
})(Scratch);