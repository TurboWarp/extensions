// Name: Sprite Frames
// ID: orangespriteframes
// Description: Position sprites in an interface-like manner.
// By: OrangeLeaf36
// License: MIT
(function (Scratch) {
  "use strict";

  let zoom = 1;
  let hasCameraExtension = false;
  const frames = Object.create(null);
  frames["frame1"] = {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    layout: {
      spriteOrder: [],
      spriteMargin: 0,
      axis: "horizontal", // vertical/horizontal
      alignX: "left",
      alignY: "bottom",
    },
  };

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("Sprite Frames must run unsandboxed");
  }

  function setFrame(name, x, y, width, height) {
    frames[name] = {
      x: 0,
      y: 0,
      width: 100,
      height: 100,
      layout: {
        spriteOrder: [],
        spriteMargin: 0,
        axis: "horizontal", // vertical/horizontal
        alignX: "left",
        alignY: "bottom",
      },
    };
  }

  function findInFrame(searchString) {
    let foundInFrame = null;

    for (let frameName in frames) {
      if (Object.prototype.hasOwnProperty.call(frames, frameName)) {
        const spriteOrder = frames[frameName].layout.spriteOrder;
        if (spriteOrder.includes(searchString)) {
          foundInFrame = frameName;
          break;
        }
      }
    }

    return foundInFrame;
  }

  function getSizeByTargetId(targetId) {
    const currentCostumeId = Scratch.vm.runtime.targets.find(
      (target) => target.id === targetId,
    ).currentCostume;
    const size = Scratch.vm.runtime.targets
      .find((target) => target.id === targetId)
      .sprite.costumes[
        currentCostumeId
      ].size.map((num) => (num * Scratch.vm.runtime.targets.find((target) => target.id === targetId).size) / (Scratch.vm.runtime.targets.find((target) => target.id === targetId).sprite.costumes[currentCostumeId].dataFormat != "svg" ? 200 : 100));
    return size;
  }

  function totalOfFrameSprite(frame) {
    if (Object.prototype.hasOwnProperty.call(frames, frame)) {
      let total = [0, 0];
      let inc = [0, 0];
      for (let targetId of frames[frame].layout.spriteOrder) {
        inc = getSizeByTargetId(targetId);
        total = total.map((value, index) => value + inc[index]);
        if (
          targetId !=
          frames[frame].layout.spriteOrder[
            frames[frame].layout.spriteOrder.length - 1
          ]
        ) {
          inc = [
            frames[frame].layout.spriteMargin,
            frames[frame].layout.spriteMargin,
          ];
          total = total.map((value, index) => value + inc[index]);
        }
      }
      return total;
    }
  }

  function moveStringToIndex(arr, stringToMove, targetIndex) {
    const currentIndex = arr.indexOf(stringToMove);

    if (currentIndex === -1) {
      return arr; // String not found in array
    }

    arr.splice(currentIndex, 1); // Remove the string from its current index
    arr.splice(targetIndex, 0, stringToMove); // Insert the string at the target index

    return arr;
  }

  class guiPositioning {
    getInfo() {
      return {
        id: "orangespriteframes",
        color1: "#8059ad",
        color2: "#6f489c",
        color3: "#5f388a",
        name: "Sprite Frames",
        // docsURI: "https://orangeleaf36.is-a.dev/docs/gui-positioning/",
        blocks: [
          {
            opcode: "getViewportPercentage",
            text: "[percentage]% of stage's [resolution]",
            blockType: Scratch.BlockType.REPORTER,
            arguments: {
              percentage: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "25",
              },
              resolution: {
                type: Scratch.ArgumentType.STRING,
                menu: "RES_MENU",
                defaultValue: "width",
              },
            },
          },
          "---",
          {
            opcode: "bindSpiteToFrame",
            text: "bind sprite to [frame]",
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              frame: {
                type: Scratch.ArgumentType.STRING,
                menu: "FRAMES_NOSTAGE",
                defaultValue: "frame1",
              },
            },
          },
          {
            opcode: "unbindSprite",
            text: "unbind sprite",
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              frame: {
                type: Scratch.ArgumentType.STRING,
                menu: "FRAMES_NOSTAGE",
                defaultValue: "frame1",
              },
            },
          },
          {
            opcode: "getElemNum",
            text: "element number in binded frame",
            blockType: Scratch.BlockType.REPORTER,
            disableMonitor: true,
          },
          {
            opcode: "setElemNumber",
            text: "set sprite as element [elemNum] of binded frame",
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              elemNum: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0",
              },
            },
          },
          {
            opcode: "positionSpriteOnFrame",
            text: "position sprite on binded frame",
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              x: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0",
              },
              y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0",
              },
            },
          },

          "---",
          {
            opcode: "listFrames",
            text: "frames",
            blockType: Scratch.BlockType.REPORTER,
            disableMonitor: true,
          },
          {
            opcode: "keysOfFrame",
            text: "[frame] as json",
            blockType: Scratch.BlockType.REPORTER,
            arguments: {
              frame: {
                type: Scratch.ArgumentType.STRING,
                menu: "FRAMES_NOSTAGE",
                defaultValue: "frame1",
              },
            },
          },
          {
            opcode: "keyOfFrame",
            text: "[key] of frame [frame]",
            blockType: Scratch.BlockType.REPORTER,
            arguments: {
              key: {
                type: Scratch.ArgumentType.STRING,
                menu: "FRAME_PROPERTIES",
                defaultValue: "x",
              },
              frame: {
                type: Scratch.ArgumentType.STRING,
                menu: "FRAMES_NOSTAGE",
                defaultValue: "frame1",
              },
            },
          },
          "---",
          {
            opcode: "createFrame",
            blockType: Scratch.BlockType.COMMAND,
            text: "create frame [frame]",
            arguments: {
              frame: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "frame1",
              },
            },
          },
          {
            opcode: "deleteFrame",
            blockType: Scratch.BlockType.COMMAND,
            text: "delete frame [frame]",
            arguments: {
              frame: {
                type: Scratch.ArgumentType.STRING,
                menu: "FRAMES_NOSTAGE",
                defaultValue: "frame1",
              },
            },
          },
          {
            opcode: "setPosFrame",
            blockType: Scratch.BlockType.COMMAND,
            text: "set pos of frame [frame] x: [x] y: [y]",
            arguments: {
              frame: {
                type: Scratch.ArgumentType.STRING,
                menu: "FRAMES_NOSTAGE",
                defaultValue: "frame1",
              },
              x: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0",
              },
              y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0",
              },
            },
          },
          {
            opcode: "setSizeFrame",
            blockType: Scratch.BlockType.COMMAND,
            text: "set size of frame [frame] width: [width] height: [height]",
            arguments: {
              frame: {
                type: Scratch.ArgumentType.STRING,
                menu: "FRAMES_NOSTAGE",
                defaultValue: "frame1",
              },
              width: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "100",
              },
              height: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "100",
              },
            },
          },
          {
            opcode: "setAlignXFrame",
            blockType: Scratch.BlockType.COMMAND,
            text: "set align x of [frame] to [align]",
            arguments: {
              frame: {
                type: Scratch.ArgumentType.STRING,
                menu: "FRAMES_NOSTAGE",
                defaultValue: "frame1",
              },
              align: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "left",
                menu: "ALIGN_X",
              },
            },
          },
          {
            opcode: "setAlignYFrame",
            blockType: Scratch.BlockType.COMMAND,
            text: "set align y of [frame] to [align]",
            arguments: {
              frame: {
                type: Scratch.ArgumentType.STRING,
                menu: "FRAMES_NOSTAGE",
                defaultValue: "frame1",
              },
              align: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "bottom",
                menu: "ALIGN_Y",
              },
            },
          },
          {
            opcode: "setAxisFrame",
            blockType: Scratch.BlockType.COMMAND,
            text: "set layout of [frame] to [axis]",
            arguments: {
              frame: {
                type: Scratch.ArgumentType.STRING,
                menu: "FRAMES_NOSTAGE",
                defaultValue: "frame1",
              },
              axis: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "horizontal",
                menu: "AXIS",
              },
            },
          },
          {
            opcode: "setSpriteMarginFrame",
            blockType: Scratch.BlockType.COMMAND,
            text: "set sprite margin of [frame] to [margin]",
            arguments: {
              frame: {
                type: Scratch.ArgumentType.STRING,
                menu: "FRAMES_NOSTAGE",
                defaultValue: "frame1",
              },
              margin: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0",
              },
            },
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: "For use with Camera Controls:",
            hideFromPalette: !hasCameraExtension,
          },
          {
            opcode: "setZoom",
            blockType: Scratch.BlockType.COMMAND,
            text: "set zoom [zoom]",
            hideFromPalette: !hasCameraExtension,
            arguments: {
              zoom: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "100",
              },
            },
          },
          {
            opcode: "adjustNumByZoom",
            blockType: Scratch.BlockType.REPORTER,
            text: "[adjust] number [number] to zoom",
            hideFromPalette: !hasCameraExtension,
            arguments: {
              number: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "50",
              },
              adjust: {
                type: Scratch.ArgumentType.STRING,
                menu: "ADJ_ZOOM",
                defaultValue: "fit",
              },
            },
          },
        ],
        menus: {
          RES_MENU: {
            acceptReporters: true,
            items: ["width", "height"],
          },
          FRAMES: {
            acceptReporters: true,
            items: "_getFramesAndStage", //This basically makes it run a function every time
          },
          FRAMES_NOSTAGE: {
            acceptReporters: true,
            items: "_getFrames", //This basically makes it run a function every time
          },
          FRAME_PROPERTIES: {
            acceptReporters: false,
            items: [
              "x",
              "y",
              "width",
              "height",
              "axis",
              "alignX",
              "alignY",
              "margin",
            ],
          },
          ADJ_ZOOM: {
            acceptReporters: false,
            items: ["fit", "decrease"],
          },
          ALIGN_X: {
            acceptReporters: false,
            items: ["left", "right", "center"],
          },
          ALIGN_Y: {
            acceptReporters: false,
            items: ["bottom", "top", "center"],
          },
          AXIS: {
            acceptReporters: false,
            items: ["horizontal", "vertical"],
          },
        },
      };
    }

    getViewportPercentage(args, util) {
      if (args.resolution === "width") {
        return Scratch.vm.runtime.stageWidth * (args.percentage / 100);
      } else if (args.resolution === "height") {
        return Scratch.vm.runtime.stageHeight * (args.percentage / 100);
      }
      return 0;
    }

    //Sprite
    bindSpiteToFrame(args, util) {
      // check if in frame
      let foundInFrame = null;
      foundInFrame = findInFrame(util.target.id);
      // remove if in frame
      if (foundInFrame) {
        frames[foundInFrame].layout.spriteOrder = frames[
          foundInFrame
        ].layout.spriteOrder.filter((item) => item !== util.target.id);
      }
      frames[args.frame].layout.spriteOrder.push(util.target.id);
    }

    unbindSprite(args, util) {
      let foundInFrame = null;
      foundInFrame = findInFrame(util.target.id);
      // remove if in frame
      if (foundInFrame) {
        frames[foundInFrame].layout.spriteOrder = frames[
          foundInFrame
        ].layout.spriteOrder.filter((item) => item !== util.target.id);
      }
    }

    setElemNumber(args, util) {
      let foundInFrame = null;
      foundInFrame = findInFrame(util.target.id);
      //check if spriteID is in frame
      if (foundInFrame) {
        moveStringToIndex(
          frames[foundInFrame].layout.spriteOrder,
          util.target.id,
          args.elemNum,
        );
      }
    }

    getElemNum(args, util) {
      let foundInFrame = null;
      foundInFrame = findInFrame(util.target.id);
      //check if spriteID is in frame
      if (foundInFrame) {
        //if spriteID is in frame, get index of spriteid in frame
        return frames[foundInFrame].layout.spriteOrder.indexOf(util.target.id);
      } else {
        return -1;
      }
    }

    //individual
    positionSpriteOnFrame(args, util) {
      let foundInFrame = null;
      foundInFrame = findInFrame(util.target.id);
      const frame = frames[foundInFrame];
      const frameX = frame.x;
      const frameY = frame.y;
      const frameWidth = frame.width;
      const frameHeight = frame.height;
      const frameCenterOffset = totalOfFrameSprite(foundInFrame).map(
        (element) => element / 2,
      );
      let costumeSize = util.target.sprite.costumes[
        util.target.currentCostume
      ].size.map((element) => (element * util.target.size) / 100);
      costumeSize = costumeSize.map(
        (element) =>
          element /
          (util.target.sprite.costumes[util.target.currentCostume].dataFormat !=
          "svg"
            ? 2
            : 1),
      );
      let newX = 0;
      let newY = 0;
      if (frames[foundInFrame].layout.axis == "horizontal") {
        // Main Event /metaphor
        switch (frames[foundInFrame].layout.alignX) {
          case "left":
            newX = frameX + costumeSize[0] / 2;
            break;
          case "right":
            newX =
              frameX +
              costumeSize[0] / 2 +
              ((frameWidth - frameCenterOffset[0]) * 2 - frameWidth);
            break;
          case "center":
            newX =
              frameX +
              costumeSize[0] / 2 +
              ((frameWidth - frameCenterOffset[0]) * 2 - frameWidth) / 2;
            break;
        }
        // Align on the funny Y
        switch (frames[foundInFrame].layout.alignY) {
          case "bottom":
            newY = frameY + costumeSize[1] / 2;
            break;
          case "top":
            newY = frameY - costumeSize[1] / 2 + frameHeight;
            break;
          case "center":
            newY = frameY + frameHeight / 2;
            break;
        }
      } else if (frames[foundInFrame].layout.axis == "vertical") {
        // Align on the boring X
        switch (frames[foundInFrame].layout.alignX) {
          case "left":
            newX = frameX + costumeSize[0] / 2;
            break;
          case "right":
            newX = frameX - costumeSize[0] / 2 + frameWidth;
            break;
          case "center":
            newX = frameX + frameWidth / 2;
            break;
        }
        // Main Event /metaphor
        switch (frames[foundInFrame].layout.alignY) {
          case "bottom":
            newY = frameY + costumeSize[1] / 2;
            break;
          case "top":
            newY =
              frameY +
              costumeSize[1] / 2 +
              ((frameHeight - frameCenterOffset[1]) * 2 - frameHeight);
            break;
          case "center":
            newY =
              frameY +
              costumeSize[1] / 2 +
              ((frameHeight - frameCenterOffset[1]) * 2 - frameHeight) / 2;
            break;
        }
      }

      if (foundInFrame) {
        // foundInFrame
        //if spriteID is in frame, get index of spriteid in frame
        const endNum = frames[foundInFrame].layout.spriteOrder.length;
        //loop i from 0 to current spriteID index
        const start = 0;
        const step = 1;
        const end = endNum - 1;
        for (let i = start; i !== end; i += step) {
          if (
            i < frames[foundInFrame].layout.spriteOrder.indexOf(util.target.id)
          ) {
            if (frames[foundInFrame].layout.axis == "horizontal") {
              newX +=
                getSizeByTargetId(
                  frames[foundInFrame].layout.spriteOrder[i],
                )[0] + frames[foundInFrame].layout.spriteMargin;
            } else if (frames[foundInFrame].layout.axis == "vertical") {
              newY +=
                getSizeByTargetId(
                  frames[foundInFrame].layout.spriteOrder[i],
                )[1] + frames[foundInFrame].layout.spriteMargin;
            }
          }
        }
        util.target.setXY(newX, newY);
        //// get width&height of spriteID index i
        //// positioning ill deal with it later
      }
    }

    //Frame
    createFrame(args, util) {
      setFrame(args.frame, 0, 0, 100, 100);
    }

    deleteFrame(args, util) {
      if (Object.keys(frames).length > 1) {
        delete frames[args.frame];
      }
    }

    listFrames(args, util) {
      return JSON.stringify(Object.keys(frames));
    }

    keysOfFrame(args, util) {
      return JSON.stringify(frames[args.frame]);
    }

    keyOfFrame(args, util) {
      if (args.key == "layout") {
        return JSON.stringify(frames[args.frame].layout);
      } else if (args.key == "margin") {
        return frames[args.frame].layout.spriteMargin;
      } else if (
        ["axis", "spriteOrder", "alignX", "alignY"].includes(args.key)
      ) {
        return frames[args.frame].layout[args.key];
      } else {
        return frames[args.frame][args.key];
      }
    }

    setPosFrame(args, util) {
      if (Object.keys(frames).includes(args.frame)) {
        const frame = frames[args.frame];
        frame.x = args.x;
        frame.y = args.y;
      } else {
        console.error("Frame doesn't exist!");
        return 0;
      }
    }

    setSizeFrame(args, util) {
      if (Object.keys(frames).includes(args.frame)) {
        const frame = frames[args.frame];
        frame.width = args.width;
        frame.height = args.height;
      } else {
        console.error("Frame doesn't exist!");
        return 0;
      }
    }

    setAlignXFrame(args, util) {
      if (Object.keys(frames).includes(args.frame)) {
        const frame = frames[args.frame];
        frame.layout.alignX = args.align;
      } else {
        console.error("Frame doesn't exist!");
        return 0;
      }
    }

    setAlignYFrame(args, util) {
      if (Object.keys(frames).includes(args.frame)) {
        const frame = frames[args.frame];
        frame.layout.alignY = args.align;
      } else {
        console.error("Frame doesn't exist!");
        return 0;
      }
    }

    setSpriteMarginFrame(args, util) {
      if (Object.keys(frames).includes(args.frame)) {
        const frame = frames[args.frame];
        frame.layout.spriteMargin = args.margin;
      } else {
        console.error("Frame doesn't exist!");
        return 0;
      }
    }

    setAxisFrame(args, util) {
      if (Object.keys(frames).includes(args.frame)) {
        const frame = frames[args.frame];
        frame.layout.axis = args.axis;
      } else {
        console.error("Frame doesn't exist!");
        return 0;
      }
    }

    _getFramesAndStage() {
      // The menu function
      return ["stage", ...Object.keys(frames)];
    }

    _getFrames() {
      // The menu function
      return Object.keys(frames);
    }

    //Camera Controls
    setZoom(args, util) {
      zoom = args.zoom / 100;
    }

    adjustNumByZoom(args, util) {
      console.log(util.size);
      if (args.adjust == "decrease") {
        return args.number * zoom;
      } else if (args.adjust == "fit") {
        return args.number / zoom;
      } else {
        return args.number;
      }
    }
  }
  Scratch.extensions.register(new guiPositioning());

  Scratch.vm.on("EXTENSION_ADDED", function (info) {
    if (info.id === "DTcameracontrols") {
      hasCameraExtension = true;
      Scratch.vm.extensionManager.refreshBlocks("orangespriteframes");
    }
  });
})(Scratch);
