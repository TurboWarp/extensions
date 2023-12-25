// Name: Canvas Effects
// ID: theshovelcanvaseffects
// Description: Apply visual effects to the entire stage.
// By: TheShovel

(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) {
    throw new Error("This extension must run unsandboxed");
  }

  const canvas = Scratch.renderer.canvas;

  const updateStyle = () => {
    // Gotta keep the translation to % because of the stage size, window size and so on
    const transform = `rotate(${rotation}deg) scale(${scale[0]}%, ${scale[1]}%) skew(${skewX}deg, ${skewY}deg) translate(${offsetX}%, ${
      0 - offsetY
    }%)`;
    if (canvas.style.transform !== transform) {
      canvas.style.transform = transform;
    }
    const filter = `blur(${blur}px) contrast(${
      contrast / 100
    }) saturate(${saturation}%) hue-rotate(${color}deg) brightness(${brightness}%) invert(${invert}%) sepia(${sepia}%) opacity(${
      100 - transparency
    }%)`;
    if (canvas.style.filter !== filter) canvas.style.filter = filter;

    const cssBorderRadius = borderRadius === 0 ? "" : `${borderRadius}%`;
    if (canvas.style.borderRadius !== cssBorderRadius) canvas.style.borderRadius = cssBorderRadius;

    const imageRendering = resizeMode === "pixelated" ? "pixelated" : "";
    if (canvas.style.imageRendering !== imageRendering) canvas.style.imageRendering = imageRendering;
    // Made by SharkPool

    const curBor = canvas.style.border.split(" ");
    if (parseInt(curBor[0]) !== borderC[0] || curBor[1] !== borderC[1] || curBor[2] !== borderC[2]) {
      canvas.style.border = Scratch.Cast.toString(`${borderC[0]}px ${borderC[1]} ${borderC[2]}`);
    }
    canvas.style.backgroundColor = Scratch.Cast.toString(borderC[3]);
  };
  // scratch-gui may reset canvas styles when resizing the window or going in/out of fullscreen
  new MutationObserver(updateStyle).observe(canvas, {
    attributeFilter: ["style"],
    attributes: true,
  });

  let borderRadius = 0;
  let rotation = 0;
  let offsetY = 0;
  let offsetX = 0;
  let skewY = 0;
  let skewX = 0;
  let scale = [100, 100];
  // Thanks SharkPool for telling me about these
  let transparency = 0;
  let sepia = 0;
  let blur = 0;
  let contrast = 100;
  let saturation = 100;
  let color = 0;
  let brightness = 100;
  let invert = 0;
  let resizeMode = "default";
  // Made by SharkPool (Also made Scale XY)
  let borderC = [0, "none", "#ff0000", "#ff0000"];

  const resetStyles = () => {
    borderRadius = 0;
    rotation = 0;
    offsetY = 0;
    offsetX = 0;
    skewY = 0;
    skewX = 0;
    scale = [100, 100];
    transparency = 0;
    sepia = 0;
    blur = 0;
    contrast = 100;
    saturation = 100;
    color = 0;
    brightness = 100;
    invert = 0;
    resizeMode = "default";
    borderC = [0, "none", "#ff0000", "#ff0000"];
    updateStyle();
  };

  Scratch.vm.runtime.on("RUNTIME_DISPOSED", resetStyles);

  class CanvasEffects {
    getInfo() {
      return {
        id: "theshovelcanvaseffects",
        name: "Canvas Effects",
        blocks: [
          {
            opcode: "seteffect",
            blockType: Scratch.BlockType.COMMAND,
            text: "set canvas [EFFECT] to [NUMBER]",
            arguments: {
              EFFECT: {
                type: Scratch.ArgumentType.STRING,
                menu: "EFFECTMENU",
              },
              NUMBER: {
                type: Scratch.ArgumentType.NUMBER,
              },
            },
          },
          {
            opcode: "changeEffect",
            blockType: Scratch.BlockType.COMMAND,
            text: "change canvas [EFFECT] by [NUMBER]",
            arguments: {
              EFFECT: {
                type: Scratch.ArgumentType.STRING,
                menu: "EFFECTMENU",
              },
              NUMBER: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 5,
              },
            },
          },
          {
            opcode: "geteffect",
            blockType: Scratch.BlockType.REPORTER,
            text: "get canvas [EFFECT]",
            arguments: {
              EFFECT: {
                type: Scratch.ArgumentType.STRING,
                menu: "EFFECTGETMENU",
              },
            },
          },
          {
            opcode: "cleareffects",
            blockType: Scratch.BlockType.COMMAND,
            text: "clear canvas effects",
          },
          "---",
          {
            opcode: "setBorder",
            blockType: Scratch.BlockType.COMMAND,
            text: "add [BORDER] border to canvas with color [COLOR1] and backup [COLOR2] and thickness [THICK]",
            arguments: {
              BORDER: {
                type: Scratch.ArgumentType.STRING,
                menu: "borderTypes"
              },
              THICK: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 5
              },
              COLOR1: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#ff0000"
              },
              COLOR2: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#0000ff"
              },
            },
          },
          {
            opcode: "renderscale",
            blockType: Scratch.BlockType.COMMAND,
            text: "set canvas render size to width:[X] height:[Y]",
            arguments: {
              X: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100,
              },
              Y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100,
              },
            },
          },
          {
            opcode: "setrendermode",
            blockType: Scratch.BlockType.COMMAND,
            text: "set canvas resize rendering mode [EFFECT]",
            arguments: {
              EFFECT: {
                type: Scratch.ArgumentType.STRING,
                menu: "RENDERMODE",
              },
            },
          },
        ],
        menus: {
          EFFECTMENU: {
            acceptReporters: true,
            items: this.mainEffects(false),
          },
          RENDERMODE: {
            acceptReporters: true,
            items: ["pixelated", "default"],
          },
          EFFECTGETMENU: {
            acceptReporters: true,
            // this contains 'resize rendering mode', EFFECTMENU does not
            items: this.mainEffects(true),
          },
          borderTypes: {
            acceptReporters: true,
            items: [
              "dotted",
              "dashed",
              "solid",
              "double",
              "groove",
              "ridge",
              "inset",
              "outset",
              "none"
            ],
          },
        },
      };
    }

    mainEffects(addRender) {
      return [
        "blur",
        "contrast",
        "saturation",
        "color shift",
        "brightness",
        "invert",
        ...(addRender ? ["resize rendering mode"] : []),
        "sepia",
        "transparency",
        "scale X",
        "scale Y",
        "skew X",
        "skew Y",
        "offset X",
        "offset Y",
        "rotation",
        "border radius",
      ];
    }

    geteffect({ EFFECT }) {
      if (EFFECT === "blur") {
        return blur;
      } else if (EFFECT === "contrast") {
        return contrast;
      } else if (EFFECT === "saturation") {
        return saturation;
      } else if (EFFECT === "color shift") {
        return color;
      } else if (EFFECT === "brightness") {
        return brightness;
      } else if (EFFECT === "invert") {
        return invert;
      } else if (EFFECT === "resize rendering mode") {
        return resizeMode;
      } else if (EFFECT === "sepia") {
        return sepia;
      } else if (EFFECT === "transparency") {
        return transparency;
      } else if (EFFECT === "scale X") {
        return scale[0];
      } else if (EFFECT === "scale Y") {
        return scale[1];
      } else if (EFFECT === "skew X") {
        return skewX;
      } else if (EFFECT === "skew Y") {
        return skewY;
      } else if (EFFECT === "offset X") {
        return offsetX;
      } else if (EFFECT === "offset Y") {
        return offsetY;
      } else if (EFFECT === "rotation") {
        return rotation;
      } else if (EFFECT === "border radius") {
        return borderRadius;
      }
      return "";
    }
    seteffect({ EFFECT, NUMBER }) {
      NUMBER = Scratch.Cast.toNumber(NUMBER);
      if (EFFECT === "blur") {
        blur = NUMBER;
      } else if (EFFECT === "contrast") {
        contrast = NUMBER;
      } else if (EFFECT === "saturation") {
        saturation = NUMBER;
      } else if (EFFECT === "color shift") {
        color = NUMBER;
      } else if (EFFECT === "brightness") {
        brightness = NUMBER;
      } else if (EFFECT === "invert") {
        invert = NUMBER;
      } else if (EFFECT === "sepia") {
        sepia = NUMBER;
      } else if (EFFECT === "transparency") {
        transparency = NUMBER;
      } else if (EFFECT === "scale X") {
        scale[0] = NUMBER;
      } else if (EFFECT === "scale Y") {
        scale[1] = NUMBER;
      } else if (EFFECT === "skew X") {
        skewX = NUMBER;
      } else if (EFFECT === "skew Y") {
        skewY = NUMBER;
      } else if (EFFECT === "offset X") {
        offsetX = NUMBER;
      } else if (EFFECT === "offset Y") {
        offsetY = NUMBER;
      } else if (EFFECT === "rotation") {
        rotation = NUMBER;
      } else if (EFFECT === "border radius") {
        borderRadius = NUMBER;
      }
      updateStyle();
    }
    changeEffect(args) {
      const EFFECT = args.EFFECT;
      const currentEffect = this.geteffect(args);
      const NUMBER = Scratch.Cast.toNumber(args.NUMBER) + currentEffect;
      if (EFFECT === "blur") {
        blur = NUMBER;
      } else if (EFFECT === "contrast") {
        contrast = NUMBER;
      } else if (EFFECT === "saturation") {
        saturation = NUMBER;
      } else if (EFFECT === "color shift") {
        color = NUMBER;
      } else if (EFFECT === "brightness") {
        brightness = NUMBER;
      } else if (EFFECT === "invert") {
        invert = NUMBER;
      } else if (EFFECT === "sepia") {
        sepia = NUMBER;
      } else if (EFFECT === "transparency") {
        transparency = NUMBER;
      } else if (EFFECT === "scale X") {
        scale[0] = NUMBER;
      } else if (EFFECT === "scale Y") {
        scale[1] = NUMBER;
      } else if (EFFECT === "skew X") {
        skewX = NUMBER;
      } else if (EFFECT === "skew Y") {
        skewY = NUMBER;
      } else if (EFFECT === "offset X") {
        offsetX = NUMBER;
      } else if (EFFECT === "offset Y") {
        offsetY = NUMBER;
      } else if (EFFECT === "rotation") {
        rotation = NUMBER;
      } else if (EFFECT === "border radius") {
        borderRadius = NUMBER;
      }
      updateStyle();
    }
    cleareffects() {
      resetStyles();
    }
    setrendermode({ EFFECT }) {
      resizeMode = EFFECT;
      updateStyle();
    }
    renderscale({ X, Y }) {
      Scratch.vm.renderer.resize(X, Y);
    }

    setBorder(args) {
      borderC = [args.THICK, args.BORDER, args.COLOR1, args.COLOR2];
      updateStyle();
    }
  }
  Scratch.extensions.register(new CanvasEffects());
})(Scratch);
