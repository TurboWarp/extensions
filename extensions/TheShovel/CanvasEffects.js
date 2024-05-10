// Name: Canvas Effects
// ID: theshovelcanvaseffects
// Description: Apply visual effects to the entire stage.
// By: TheShovel
// By: SharkPool <https://scratch.mit.edu/users/DemonX5/>
// License: MIT

(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) {
    throw new Error("This extension must run unsandboxed");
  }

  const canvas = Scratch.renderer.canvas;

  const updateStyle = () => {
    // Gotta keep the translation to % because of the stage size, window size and so on
    const transform = `rotate(${rotation}deg) scale(${scaleX}%, ${scaleY}%) skew(${skewX}deg, ${skewY}deg) translate(${offsetX}%, ${
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
    if (canvas.style.filter !== filter) {
      canvas.style.filter = filter;
    }

    const cssBorderRadius = borderRadius === 0 ? "" : `${borderRadius}%`;
    if (canvas.style.borderRadius !== cssBorderRadius) {
      canvas.style.borderRadius = cssBorderRadius;
    }

    const imageRendering = resizeMode === "pixelated" ? "pixelated" : "";
    if (canvas.style.imageRendering !== imageRendering) {
      canvas.style.imageRendering = imageRendering;
    }

    const border = `${borderWidth}px ${borderStyle} ${borderColor}`;
    if (canvas.style.border !== border) {
      canvas.style.border = border;
    }

    if (canvas.style.backgroundColor !== backgroundColor) {
      canvas.style.backgroundColor = backgroundColor;
    }
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
  let scaleX = 100;
  let scaleY = 100;
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
  let borderStyle = "solid";
  let borderWidth = 0;
  let borderColor = "#000000";
  let backgroundColor = "transparent";

  const resetStyles = () => {
    borderRadius = 0;
    rotation = 0;
    offsetY = 0;
    offsetX = 0;
    skewY = 0;
    skewX = 0;
    scaleX = 100;
    scaleY = 100;
    transparency = 0;
    sepia = 0;
    blur = 0;
    contrast = 100;
    saturation = 100;
    color = 0;
    brightness = 100;
    invert = 0;
    resizeMode = "default";
    borderStyle = "solid";
    borderWidth = 0;
    borderColor = "#000000";
    backgroundColor = "transparent";
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
            text: "set canvas border to [WIDTH] pixels [STYLE] with color [COLOR1] and background [COLOR2]",
            arguments: {
              STYLE: {
                type: Scratch.ArgumentType.STRING,
                menu: "borderTypes",
              },
              WIDTH: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 5,
              },
              COLOR1: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#ff0000",
              },
              COLOR2: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#0000ff",
              },
            },
          },
          {
            opcode: "renderscale",
            blockType: Scratch.BlockType.COMMAND,
            text: "set canvas render size to width: [X] height: [Y]",
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
            items: this._getMenuItems(false),
          },
          RENDERMODE: {
            acceptReporters: true,
            items: ["pixelated", "default"],
          },
          EFFECTGETMENU: {
            acceptReporters: true,
            items: this._getMenuItems(true),
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
              "none",
            ],
          },
        },
      };
    }

    _getMenuItems(isGetter) {
      return [
        "blur",
        "contrast",
        "saturation",
        "color shift",
        "brightness",
        "invert",
        ...(isGetter ? ["resize rendering mode"] : []),
        "sepia",
        "transparency",
        ...(isGetter ? [] : ["scale"]),
        "scale X",
        "scale Y",
        "skew X",
        "skew Y",
        "offset X",
        "offset Y",
        "rotation",
        "border radius",
        ...(isGetter
          ? ["border width", "border style", "border color", "background"]
          : []),
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
      } else if (EFFECT === "scale") {
        // old extension compatibility
        return scaleX;
      } else if (EFFECT === "scale X") {
        return scaleX;
      } else if (EFFECT === "scale Y") {
        return scaleY;
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
      } else if (EFFECT === "border width") {
        return borderWidth;
      } else if (EFFECT === "border style") {
        return borderStyle;
      } else if (EFFECT === "border color") {
        return borderColor;
      } else if (EFFECT === "background") {
        return backgroundColor;
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
      } else if (EFFECT === "scale") {
        scaleX = NUMBER;
        scaleY = NUMBER;
      } else if (EFFECT === "scale X") {
        scaleX = NUMBER;
      } else if (EFFECT === "scale Y") {
        scaleY = NUMBER;
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
      // Scale needs some special treatment to change x & y separately
      if (args.EFFECT === "scale") {
        scaleX = scaleX + Scratch.Cast.toNumber(args.NUMBER);
        scaleY = scaleY + Scratch.Cast.toNumber(args.NUMBER);
        updateStyle();
        return;
      }

      // Everything else is really generic
      const currentEffect = Scratch.Cast.toNumber(this.geteffect(args));
      const newValue = Scratch.Cast.toNumber(args.NUMBER) + currentEffect;
      this.seteffect({
        EFFECT: args.EFFECT,
        NUMBER: newValue,
      });
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
      borderWidth = Scratch.Cast.toNumber(args.WIDTH);
      borderStyle = Scratch.Cast.toString(args.STYLE).replace(/[^a-z]/gi, "");
      borderColor = Scratch.Cast.toString(args.COLOR1).replace(
        /[^#0-9a-z]/gi,
        ""
      );
      backgroundColor = Scratch.Cast.toString(args.COLOR2).replace(
        /[^#0-9a-z]/gi,
        ""
      );
      updateStyle();
    }
  }
  Scratch.extensions.register(new CanvasEffects());
})(Scratch);
