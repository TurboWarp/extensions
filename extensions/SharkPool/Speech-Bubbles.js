// Name: Speech Bubbles
// ID: speechSP
// Description: Customizable Speech Bubbles
// By: SharkPool

// Version V.1.3.0

(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) throw new Error("Speech Bubbles must run unsandboxed");

  const menuIconURI =
"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2Ny4wNTgiIGhlaWdodD0iNjcuMDU4IiB2aWV3Qm94PSIwIDAgNjcuMDU4IDY3LjA1OCI+PHBhdGggZD0iTTEuNzUgMzMuNTNjMC0xNy41NTEgMTQuMjI5LTMxLjc4IDMxLjc4LTMxLjc4czMxLjc4IDE0LjIyOSAzMS43OCAzMS43OC0xNC4yMjkgMzEuNzgtMzEuNzggMzEuNzhTMS43NSA1MS4wODEgMS43NSAzMy41M3oiIGZpbGw9IiM5NmYiIHN0cm9rZT0iIzc3NGRjYiIgc3Ryb2tlLXdpZHRoPSIzLjUiLz48cGF0aCBkPSJNOS4xNTEgMzkuMTU2Yy0yLjM3LTguNTU3IDEuODY3LTEyLjU3MyA1LjU4Ny0xMy41MjIgNC41MjgtMS4xNTYgMTQuNDg0LTMuOTc1IDIyLjI2Ny01LjY4MyAzLjgtLjgzNCAxMC4wMDMuNjI2IDExLjk1OCA5LjA0NSAxLjg1IDcuOTY3LTMuNjQ4IDExLjk0LTYuNDg2IDEyLjY2NGwtMTEuODAzIDMuMDEyYy0xLjI5Ni4zMzEtMy4xOCA4LjA5Ny05LjE1MyA5LjQwNC00LjIzNi45MjcuNjk0LTcuMjQ1LS45OTEtNi44MTUtNC45OTggMS4yNzYtOS43My0yLjE0OS0xMS4zNzktOC4xMDUiIGZpbGw9IiNmZmYiLz48cGF0aCBkPSJNNDkuMjY3IDQ0LjEyOGEyLjQ1IDIuNDUgMCAwIDAgMi40NTMgMGwxLjcyNi0uOTk1Yy44MTctLjQ3IDEuNzMuNDQzIDEuMjYgMS4yNmwtLjk5NSAxLjcyN2EyLjQ2IDIuNDYgMCAwIDAgMCAyLjQ1MmwuOTk0IDEuNzI2Yy40Ny44MTctLjQ0MyAxLjczLTEuMjYgMS4yNmwtMS43MjYtLjk5NWEyLjQ2IDIuNDYgMCAwIDAtMi40NTEgMGwtMS43MjguOTk0Yy0uODE2LjQ3LTEuNzI4LS40NDItMS4yNTktMS4yNTlsLjk5NS0xLjcyNmEyLjQ2IDIuNDYgMCAwIDAgMC0yLjQ1MmwtLjk5Ni0xLjcyN2MtLjQ3LS44MTcuNDQzLTEuNzMgMS4yNi0xLjI2ek0zNC4xMzIgMTAuNzkxYTIuNzUgMi43NSAwIDAgMCAuNTczIDIuNjg4bDEuNDkzIDEuNjZjLjcwNi43ODUtLjA4MSAxLjk5OC0xLjA4NSAxLjY3NGwtMi4xMjUtLjY4NmEyLjc1IDIuNzUgMCAwIDAtMi42ODcuNTcybC0xLjY2IDEuNDk0Yy0uNzg1LjcwNS0xLjk5OC0uMDgyLTEuNjc1LTEuMDg3bC42ODctMi4xMjRhMi43NSAyLjc1IDAgMCAwLS41NzMtMi42ODZsLTEuNDkyLTEuNjZjLS43MDctLjc4NS4wOC0xLjk5OCAxLjA4NS0xLjY3NGwyLjEyNC42ODZhMi43NSAyLjc1IDAgMCAwIDIuNjg3LS41NzRsMS42Ni0xLjQ5M2MuNzg1LS43MDUgMS45OTguMDgxIDEuNjc0IDEuMDg2ek01NS41OTggMjMuODZjLjMxNS41OTEuOTIyLjk3IDEuNTkyLjk5MmwxLjUyMy4wNTJjLjcyLjAyNi45NDQuOTg3LjMwOSAxLjMyN2wtMS4zNDQuNzJjLS41OTEuMzE1LS45Ny45MjItLjk5MiAxLjU5MWwtLjA1MyAxLjUyM2MtLjAyNS43Mi0uOTg3Ljk0NC0xLjMyNy4zMDlsLS43MTktMS4zNDRhMS44OCAxLjg4IDAgMCAwLTEuNTkxLS45OTFsLTEuNTI0LS4wNTRjLS43Mi0uMDI0LS45NDMtLjk4Ni0uMzA4LTEuMzI2bDEuMzQ0LS43MTljLjU5LS4zMTUuOTY4LS45MjIuOTkxLTEuNTkybC4wNTItMS41MjRjLjAyNi0uNzIuOTg3LS45NDMgMS4zMjgtLjMwOHoiIGZpbGw9IiNmZmYiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==";
  const blockIconURI =
"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MS4yODgiIGhlaWdodD0iNjEuMjg4IiB2aWV3Qm94PSIwIDAgNjEuMjg4IDYxLjI4OCI+PHBhdGggZD0iTTAgNjEuMjg4VjBoNjEuMjg4djYxLjI4OHoiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNNi4yNjUgMzYuMjdjLTIuMzctOC41NTcgMS44NjctMTIuNTczIDUuNTg3LTEzLjUyMiA0LjUyOC0xLjE1NiAxNC40ODQtMy45NzUgMjIuMjY3LTUuNjgzIDMuOC0uODM0IDEwLjAwMy42MjYgMTEuOTU4IDkuMDQ1IDEuODUgNy45NjctMy42NDggMTEuOTQtNi40ODYgMTIuNjY0bC0xMS44MDMgMy4wMTJjLTEuMjk2LjMzMS0zLjE4IDguMDk3LTkuMTUzIDkuNDA0LTQuMjM2LjkyNy42OTQtNy4yNDUtLjk5MS02LjgxNS00Ljk5OCAxLjI3Ni05LjczLTIuMTQ5LTExLjM3OS04LjEwNSIgZmlsbD0iI2ZmZiIvPjxwYXRoIGQ9Ik00Ni4zODEgNDEuMjQyYTIuNDUgMi40NSAwIDAgMCAyLjQ1MyAwbDEuNzI2LS45OTVjLjgxNy0uNDcgMS43My40NDMgMS4yNiAxLjI2bC0uOTk1IDEuNzI3YTIuNDYgMi40NiAwIDAgMCAwIDIuNDUybC45OTQgMS43MjZjLjQ3LjgxNy0uNDQzIDEuNzMtMS4yNiAxLjI2bC0xLjcyNi0uOTk1YTIuNDYgMi40NiAwIDAgMC0yLjQ1MSAwbC0xLjcyOC45OTRjLS44MTYuNDctMS43MjgtLjQ0Mi0xLjI1OS0xLjI1OWwuOTk1LTEuNzI2YTIuNDYgMi40NiAwIDAgMCAwLTIuNDUybC0uOTk2LTEuNzI3Yy0uNDctLjgxNy40NDMtMS43MyAxLjI2LTEuMjZ6TTMxLjI0NiA3LjkwNWEyLjc1IDIuNzUgMCAwIDAgLjU3MyAyLjY4OGwxLjQ5MyAxLjY2Yy43MDYuNzg1LS4wODEgMS45OTgtMS4wODUgMS42NzRsLTIuMTI1LS42ODZhMi43NSAyLjc1IDAgMCAwLTIuNjg3LjU3MmwtMS42NiAxLjQ5NGMtLjc4NS43MDUtMS45OTgtLjA4Mi0xLjY3NS0xLjA4N2wuNjg3LTIuMTI0YTIuNzUgMi43NSAwIDAgMC0uNTczLTIuNjg2bC0xLjQ5Mi0xLjY2Yy0uNzA3LS43ODUuMDgtMS45OTggMS4wODUtMS42NzRsMi4xMjQuNjg2YTIuNzUgMi43NSAwIDAgMCAyLjY4Ny0uNTc0bDEuNjYtMS40OTNjLjc4NS0uNzA1IDEuOTk4LjA4MSAxLjY3NCAxLjA4NnptMjEuNDY2IDEzLjA2OWMuMzE1LjU5MS45MjIuOTcgMS41OTIuOTkybDEuNTIzLjA1MmMuNzIuMDI2Ljk0NC45ODcuMzA5IDEuMzI3bC0xLjM0NC43MmMtLjU5MS4zMTUtLjk3LjkyMi0uOTkyIDEuNTkxbC0uMDUzIDEuNTIzYy0uMDI1LjcyLS45ODcuOTQ0LTEuMzI3LjMwOWwtLjcxOS0xLjM0NGExLjg4IDEuODggMCAwIDAtMS41OTEtLjk5MWwtMS41MjQtLjA1NGMtLjcyLS4wMjQtLjk0My0uOTg2LS4zMDgtMS4zMjZsMS4zNDQtLjcxOWMuNTktLjMxNS45NjgtLjkyMi45OTEtMS41OTJsLjA1Mi0xLjUyNGMuMDI2LS43Mi45ODctLjk0MyAxLjMyOC0uMzA4eiIgZmlsbD0iI2ZmZiIgZmlsbC1ydWxlPSJldmVub2RkIi8+PC9zdmc+";

  const vm = Scratch.vm;
  const runtime = vm.runtime;
  const render = vm.renderer;

  const fontMenu = [
    "Scratch", "Sans Serif", "Serif",
    "Handwriting", "Marker", "Curly", "Pixel"
  ];

  let allBubbles = {};

  const xmlEscape = function (unsafe) {
    unsafe = String(unsafe);
    return unsafe.replace(/[<>&'"]/g, c => {
      switch (c) {
        case "<": return "&lt;";
        case ">": return "&gt;";
        case "&": return "&amp;";
        case "'": return "&apos;";
        case "\"": return "&quot;";
      }
    });
  };

  class speechSP {
    constructor() {
      runtime.on("PROJECT_START", () => { this.shutUp({ SPRITE: "_all_" }) });
      runtime.on("PROJECT_STOP_ALL", () => { this.shutUp({ SPRITE: "_all_" }) });
      runtime.on("AFTER_EXECUTE", () => {
        const values = Object.values(allBubbles);
        for (let i = 0; i < values.length; i++) {
          const obj = values[i];
          let target = runtime.getTargetById(obj.id);
          if (!target) target = runtime.getSpriteTargetByName(obj.id);
          if (!target) continue;
          let element = obj.element;
          if (!element) continue;
          const computed = window.getComputedStyle(element);
          const x = obj.offset[0] - (parseFloat(computed.width) / 2);
          const y = obj.offset[1] + (parseFloat(computed.height) / 2);
          let curTransform = element.parentNode.style.transform || "";
          curTransform = curTransform.replace(/translate\([^)]*\)/g, "");
          element.parentNode.style.transform = `${curTransform} translate(${target.x + x}px, ${(target.y + y) * -1}px)`;
        }
      });
    }
    getInfo() {
      return {
        id: "speechSP",
        name: "Speech Bubbles",
        color1: "#9966ff",
        color2: "#774dcb",
        menuIconURI,
        blockIconURI,
        blocks: [
          { blockType: Scratch.BlockType.LABEL, text: "Speech" },
          {
            opcode: "sayThis",
            blockType: Scratch.BlockType.COMMAND,
            text: "say [SPEECH] hooked to [SPRITE]",
            arguments: {
              SPEECH: { type: Scratch.ArgumentType.STRING, defaultValue: "hello!" },
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" }
            }
          },
          {
            opcode: "shutUp",
            blockType: Scratch.BlockType.COMMAND,
            text: "tell [SPRITE] to shut up",
            arguments: {
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" }
            }
          },
          {
            opcode: "isYapping",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is [SPRITE] yapping?",
            arguments: {
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS2" }
            }
          },
          { blockType: Scratch.BlockType.LABEL, text: "Bubble Text" },
          {
            opcode: "bubbleFont",
            blockType: Scratch.BlockType.COMMAND,
            text: "set bubble font of [SPRITE] to [FONT]",
            arguments: {
              FONT: { type: Scratch.ArgumentType.STRING, menu: "FONTS" },
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" }
            }
          },
          {
            opcode: "bubbleFontSize",
            blockType: Scratch.BlockType.COMMAND,
            text: "set bubble font size of [SPRITE] to [NUM]",
            arguments: {
              NUM : { type: Scratch.ArgumentType.NUMBER, defaultValue: 15 },
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" }
            }
          },
          {
            opcode: "bubbleBold",
            blockType: Scratch.BlockType.COMMAND,
            text: "set bubble boldness of [SPRITE] to [NUM]",
            arguments: {
              NUM : { type: Scratch.ArgumentType.NUMBER, menu: "THICK" },
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" }
            }
          },
          {
            opcode: "bubbleAlign",
            blockType: Scratch.BlockType.COMMAND,
            text: "set bubble text alignment of [SPRITE] to [TYPE]",
            arguments: {
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "ALIGNMENTS" },
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" }
            }
          },
          {
            opcode: "bubbleWidth",
            blockType: Scratch.BlockType.COMMAND,
            text: "set bubble width of [SPRITE] to [WIDTH]",
            arguments: {
              WIDTH: { type: Scratch.ArgumentType.NUMBER, defaultValue: 300 },
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" }
            }
          },
          { blockType: Scratch.BlockType.LABEL, text: "Bubble Formatting" },
          {
            opcode: "bubblePads",
            blockType: Scratch.BlockType.COMMAND,
            text: "set bubble [TYPE] of [SPRITE] to [NUM]",
            arguments: {
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 15 },
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "FOCUS" },
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" }
            }
          },
          {
            opcode: "bubbleColor",
            blockType: Scratch.BlockType.COMMAND,
            text: "set bubble [TYPE] color of [SPRITE] to [COLOR]",
            arguments: {
              COLOR: { type: Scratch.ArgumentType.COLOR },
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "COLOR" },
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" }
            }
          },
          {
            opcode: "bubbleImg",
            blockType: Scratch.BlockType.COMMAND,
            text: "set bubble image of [SPRITE] to [URL]",
            arguments: {
              URL: { type: Scratch.ArgumentType.STRING, defaultValue: "https://extensions.turbowarp.org/dango.png" },
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" }
            }
          },
          "---",
          {
            opcode: "arrowPos",
            blockType: Scratch.BlockType.COMMAND,
            text: "set arrow position of [SPRITE] to x [x] y [y]",
            arguments: {
              x: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" }
            }
          },
          {
            opcode: "bubbleOffset",
            blockType: Scratch.BlockType.COMMAND,
            text: "set bubble offset of [SPRITE] to x [x] y [y]",
            arguments: {
              x: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
              y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" }
            }
          },
          {
            opcode: "getOffset",
            blockType: Scratch.BlockType.REPORTER,
            text: "bubble offset [POS] of [SPRITE]",
            arguments: {
              POS: { type: Scratch.ArgumentType.STRING, menu: "POS" },
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS2" }
            }
          },
          { blockType: Scratch.BlockType.LABEL, text: "Bubble Styling" },
          {
            opcode: "setStretch",
            blockType: Scratch.BlockType.COMMAND,
            text: "stretch [TYPE] of [SPRITE] to x [x] y [y]",
            arguments: {
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "ELEMENT" },
              x: { type: Scratch.ArgumentType.NUMBER, defaultValue: 200 },
              y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS2" }
            }
          },
          {
            opcode: "setGlow",
            blockType: Scratch.BlockType.COMMAND,
            text: "set glow of [SPRITE] to x [x] y [y] z [z] color [COLOR]",
            arguments: {
              x: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              z: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 },
              COLOR: { type: Scratch.ArgumentType.COLOR },
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" }
            }
          },
          "---",
          {
            opcode: "setEffect",
            blockType: Scratch.BlockType.COMMAND,
            text: "set [TYPE] [EFFECT] of [SPRITE] to [NUM]",
            arguments: {
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "ELEMENT" },
              EFFECT: { type: Scratch.ArgumentType.STRING, menu: "EFFECTS" },
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 },
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS2" }
            }
          },
          {
            opcode: "getEffect",
            blockType: Scratch.BlockType.REPORTER,
            text: "get [EFFECT] of [TYPE] in [SPRITE]",
            arguments: {
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "ELEMENT" },
              EFFECT: { type: Scratch.ArgumentType.STRING, menu: "EFFECTSALL" },
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS2" }
            }
          },
          {
            opcode: "resetEffect",
            blockType: Scratch.BlockType.COMMAND,
            text: "reset all bubble styling of [SPRITE]",
            arguments: {
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" }
            }
          }
        ],
        menus: {
          TARGETS: { acceptReporters: true, items: this.getTargets(true) },
          TARGETS2: { acceptReporters: true, items: this.getTargets(false) },
          FONTS: { acceptReporters: true, items: "allFonts" },
          EFFECTS: { acceptReporters: true, items: this.getEffects(false) },
          EFFECTSALL: { acceptReporters: true, items: this.getEffects(true) },
          POS: ["x", "y"],
          ALIGNMENTS: ["left", "right", "center"],
          COLOR: ["background", "arrow", "text"],
          ELEMENT: ["bubble", "arrow"],
          FOCUS: ["padding", "border radius"],
          THICK: [
            { text : "thick", value : "900" },
            { text : "medium", value : "600" },
            { text : "none", value : "1" },
          ]
        },
      };
    }

    allFonts() {
      const customFonts = runtime.fontManager ? runtime.fontManager.getFonts().map((i) => ({ text: i.name, value: i.family })) : [];
      return [...fontMenu, ...customFonts];
    }

    getTargets(optAll) {
      const spriteNames = [{ text : "myself", value: "_myself_" }];
      if (optAll) spriteNames.push({ text : "all sprites", value: "_all_" });
      const targets = runtime.targets;
      for (let index = 1; index < targets.length; index++) {
        const target = targets[index];
        if (target.isOriginal) spriteNames.push({ text : target.getName(), value : target.id });
      }
      return spriteNames.length > 0 ? spriteNames : [""];
    }

    getEffects(enable) {
      return [
        "blur", "saturation", "contrast",
        "brightness", "hue", "opacity",
        "sepia", "invert", "direction",
        ...(enable ? ["scale x", "scale y"] : []),
        "skew x", "skew y"
      ];
    }

    speech(txt, id) {
      const encodedId = this.makeEncodedID(id);
      if (!encodedId) return;
      try {
        const elements = document.querySelectorAll(`div[id="SP_Speech-Ext-${encodedId}"] div[id="text-ID"]`);
        if (elements.length > 0) elements.forEach((element) => { element.innerHTML = xmlEscape(txt).replace(/\n/g, "<br>") });
        else this.saySpeech(txt, encodedId, id);
      } catch { return }
    }

    saySpeech(txt, encodedId, id) {
      if (!allBubbles[encodedId]) this.addDefault(id);
      const div = document.createElement("div");
      const txtParent = document.createElement("div");
      const styles = allBubbles[encodedId].styles;
      Object.assign(txtParent.style, styles);

      const textEl = document.createElement("div");
      textEl.id = "text-ID";
      textEl.innerHTML = xmlEscape(txt).replace(/\n/g, "<br>");
      txtParent.appendChild(textEl);

      const arrowElement = document.createElement("div");
      arrowElement.id = "arrow-ID";
      const arrowStyles = allBubbles[encodedId].arrowStyles;
      Object.assign(arrowElement.style, arrowStyles);

      txtParent.appendChild(arrowElement);
      txtParent.id = `SP_Speech-Ext-${encodedId}`;
      txtParent.classList.add(encodedId);
      div.appendChild(txtParent);
      render.addOverlay(div, "scale-centered");
      allBubbles[encodedId].element = txtParent;
    }

    addDefault(id) {
      const encodedId = this.makeEncodedID(id);
      if (!encodedId) return;
      allBubbles[encodedId] = {
        id, offset: [75, 0],
        styles: {
          width: "150px",
          background: "#00bfb6",
          backgroundSize: "cover",
          padding: "10px",
          borderRadius: "12px",
          textAlign: "center",
          fontWeight: "900",
          fontSize: "15px",
          color: "#fff",
          fontFamily: "arial",
          position: "relative",
          pointerEvents: "none",
          boxShadow: "0px 0px 0px #00000000",
          transform: "scale(1,1) skewX(0deg) skewY(0deg) rotate(0deg)",
          filter: "blur(0px) brightness(1) contrast(1) hue-rotate(0deg) invert(0) opacity(1) saturate(1) sepia(0)"
        },
        arrowStyles: {
          position: "absolute",
          width: "0px",
          height: "0px",
          borderLeft: "10px solid #00bfb6",
          borderRight: "10px solid transparent",
          borderTop: "10px solid #00bfb6",
          borderBottom: "10px solid transparent",
          left: "-10px",
          top: "-10px",
          transform: "scale(1,1) skewX(0deg) skewY(0deg) rotate(0deg)",
          filter: "blur(0px) brightness(1) contrast(1) hue-rotate(0deg) invert(0) opacity(1) saturate(1) sepia(0)"
        }
      };
    }

    setBubbleAtt(type, value, id, focus) {
      const applyUpdate = (key) => {
        const encodedId = this.makeEncodedID(id);
        if (!encodedId) return;
        if (!allBubbles[encodedId]) this.addDefault(id);
        allBubbles[encodedId][focus][type] = value;
        this.updateElement(encodedId, allBubbles[encodedId]);
      };
      if (id !== "_all_") applyUpdate(id);
      else {
        const list = this.getTargets(false);
        for (let i = 1; i < list.length; i++) applyUpdate(list[i].value);
      }
    }

    updateElement(id, obj) {
      const element = document.querySelector(`div[id="SP_Speech-Ext-${id}"]`);
      if (!element) return;
      Object.assign(element.style, obj.styles);
      element.style.transform = obj.styles.transform;
      element.style.filter = obj.styles.filter;
      const arrowElement = element.querySelector(`div[id="arrow-ID"]`);
      Object.assign(arrowElement.style, obj.arrowStyles);
      arrowElement.style.transform = obj.arrowStyles.transform;
      arrowElement.style.filter = obj.arrowStyles.filter;
    }

    getTargetId(txt, util, allowAll) {
      if (txt === "_all_" && allowAll) return "_all_";
      else if (txt === "_myself_") return util.target.id;
      else {
        const idTarg = runtime.getTargetById(txt);
        if (idTarg !== undefined) return idTarg.id;
        return runtime.getSpriteTargetByName(txt)?.id || undefined;
      }
    }

    makeEncodedID(id) {
      if (id === undefined) return undefined;
      try {
        return btoa(id).replaceAll("=", "_").replaceAll("/", "-");
      } catch {
        return undefined;
      }
    }

    //Speech
    sayThis(args, util) {
      const id = this.getTargetId(args.SPRITE, util, true);
      if (id !== "_all_") this.speech(args.SPEECH, id);
      else {
        const list = this.getTargets(false);
        for (let i = 1; i < list.length; i++) this.speech(args.SPEECH, list[i].value);
      }
    }

    shutUp(args, util) {
      const id = this.getTargetId(args.SPRITE, util, true);
      const encodedId = this.makeEncodedID(id);
      if (!encodedId) return;
      const shutTarget = (key) => {
        const removables = document.querySelectorAll(`div[id="SP_Speech-Ext-${key}"]`);
        removables.forEach((element) => render.removeOverlay(element.parentNode));
      };
      if (id === "_all_") Object.keys(allBubbles).forEach(shutTarget);
      else shutTarget(encodedId);
    }

    isYapping(args, util) {
      let id = this.getTargetId(args.SPRITE, util, false);
      id = this.makeEncodedID(id);
      if (!id) return false;
      return document.querySelector(`div[id="SP_Speech-Ext-${id}"]`) !== null;
    }

    //Positions
    bubbleOffset(args, util) {
      const id = this.getTargetId(args.SPRITE, util, true);
      const encodedId = this.makeEncodedID(id);
      if (!encodedId) return;
      if (!allBubbles[encodedId]) this.addDefault(id);
      const setOff = (key) => {
        allBubbles[key].offset = [Scratch.Cast.toNumber(args.x), Scratch.Cast.toNumber(args.y)];
      };
      if (id === "_all_") Object.keys(allBubbles).forEach(setOff);
      else setOff(encodedId);
    }

    getOffset(args, util) {
      let id = this.getTargetId(args.SPRITE, util, false);
      id = this.makeEncodedID(id);
      if (!id) return 0;
      return allBubbles[id]?.offset[args.POS === "x" ? 0 : 1] || 0;
    }

    //Customization
    bubbleWidth(args, util) {
      this.setBubbleAtt(
        "width", `${Math.abs(Scratch.Cast.toNumber(args.WIDTH))}px`,
        this.getTargetId(args.SPRITE, util, true), "styles"
      );
    }

    bubblePads(args, util) {
      this.setBubbleAtt(
        args.TYPE === "padding" ? "padding" : "borderRadius", 
        `${Scratch.Cast.toNumber(args.NUM)}px`, this.getTargetId(args.SPRITE, util, true),
        "styles"
      );
    }

    bubbleFont(args, util) {
      this.setBubbleAtt(
        "fontFamily", args.FONT, this.getTargetId(args.SPRITE, util, true), "styles"
      );
    }

    bubbleFontSize(args, util) {
      this.setBubbleAtt(
        "fontSize", `${Math.abs(Scratch.Cast.toNumber(args.NUM))}px`,
        this.getTargetId(args.SPRITE, util, true), "styles"
      );
    }

    bubbleBold(args, util) {
      this.setBubbleAtt(
        "fontWeight", args.NUM, this.getTargetId(args.SPRITE, util, true), "styles"
      );
    }

    bubbleAlign(args, util) {
      this.setBubbleAtt(
        "textAlign", args.TYPE, this.getTargetId(args.SPRITE, util, true), "styles"
      );
    }

    bubbleColor(args, util) {
      if (args.TYPE === "arrow") {
        this.setBubbleAtt(
          "borderLeft", `10px solid ${args.COLOR}`,
          this.getTargetId(args.SPRITE, util, true), "arrowStyles"
        );
        this.setBubbleAtt(
          "borderTop", `10px solid ${args.COLOR}`,
          this.getTargetId(args.SPRITE, util, true), "arrowStyles"
        );
      } else {
        this.setBubbleAtt(
          args.TYPE === "background" ? "background" : "color", args.COLOR,
          this.getTargetId(args.SPRITE, util, true), "styles"
        );
      }
    }

    bubbleImg(args, util) {
      Scratch.canFetch(encodeURI(args.URL)).then((canFetch) => {
        if (canFetch) {
          this.setBubbleAtt(
            "background", `url(${encodeURI(args.URL)})`,
            this.getTargetId(args.SPRITE, util, true), "styles"
          );
        }
      });
    }

    arrowPos(args, util) {
      const target = this.getTargetId(args.SPRITE, util, true);
      this.setBubbleAtt("left", `${Scratch.Cast.toNumber(args.x)}px`, target, "arrowStyles");
      this.setBubbleAtt("top", `${Scratch.Cast.toNumber(args.y) * -1}px`, target, "arrowStyles");
    }

    setStretch(args, util) {
      const id = this.getTargetId(args.SPRITE, util, false);
      const encodedId = this.makeEncodedID(id);
      if (!encodedId) return;
      if (!allBubbles[encodedId]) this.addDefault(target);
      let element = allBubbles[encodedId].element;
      if (!element) return;
      const setter = args.TYPE === "arrow" ? element.querySelector(`div[id="arrow-ID"]`) : element;
      let curTransform = setter.style.transform || "";
      curTransform = curTransform.replace(/scale\([^)]*\)/g, "");
      const value = `scale(${Scratch.Cast.toNumber(args.x) / 100},${Scratch.Cast.toNumber(args.y) / 100})`;
      setter.style.transform = `${curTransform} ${value}`;
      this.setBubbleAtt(
        "transform", (`${curTransform} ${value}`).trim(), id,
        args.TYPE === "arrow" ? "arrowStyles" : "styles"
      );
    }

    setGlow(args, util) {
      const id = this.getTargetId(args.SPRITE, util, true);
      const encodedId = this.makeEncodedID(id);
      if (!encodedId) return;
      const color = args.z === 0 ? "none" : `${args.x}px ${args.y * -1}px ${args.z}px ${args.COLOR}`;
      const applyGlow = (key) => {
        const elements = document.querySelectorAll(`div[id="SP_Speech-Ext-${key}"]`);
        elements.forEach((element) => {
          element.style.boxShadow = color;
          allBubbles[key].styles.boxShadow = color;
        });
      };
      if (id === "_all_") Object.keys(allBubbles).forEach(applyGlow);
      else applyGlow(encodedId);
    }

    setEffect(args, util) {
      const id = this.getTargetId(args.SPRITE, util, false);
      const encodedId = this.makeEncodedID(id);
      if (!encodedId) return;
      if (!allBubbles[encodedId]) this.addDefault(id);
      let element = allBubbles[encodedId].element;
      if (!element) return;
      if (args.TYPE === "arrow") element = element.querySelector(`div[id="arrow-ID"]`);
      let effect = Scratch.Cast.toString(args.EFFECT).replaceAll(" ", "");
      let term = "";
      const source = effect.includes("skew") || effect === "direction" ? "transform" : "filter";
      if (effect === "blur") term = "px";
      else if (effect === "saturation") effect = "saturate";
      else if (effect === "hue") { effect = "hue-rotate"; term = "deg" }
      else if (effect === "direction") { effect = "rotate"; term = "deg" }
      else if (effect === "skewx") { effect = "skewX"; term = "deg" }
      else if (effect === "skewy") { effect = "skewY"; term = "deg" }
      let value = Scratch.Cast.toNumber(args.NUM);
      if (effect === "saturate" || effect === "invert" || effect === "sepia") value = value / 100;
      else if (effect === "contrast" || effect === "brightness") value = (value + 100) / 100;
      else if (effect === "opacity") value = (100 - value) / 100;
      else if (effect === "rotate") value = value - 90;
      value = `${effect}(${value}${term})`;

      const setter = effect.includes("skew") ? element.parentNode : element;
      let curSource = setter.style[source] || "";
      curSource = curSource.replace(new RegExp(`${effect}\\([^)]*\\)`, "g"), "");
      setter.style[source] = `${curSource} ${value}`;
      element.style.transformOrigin = "center";
      if (!effect.includes("skew")) this.setBubbleAtt(
        source, (`${curSource} ${value}`).trim(), id, args.TYPE === "arrow" ? "arrowStyles" : "styles"
      );
    }

    getEffect(args, util) {
      let effect = Scratch.Cast.toString(args.EFFECT).replaceAll(" ", "");
      if (effect === "saturation") effect = "saturate";
      if (effect === "hue") effect = "hue-rotate";
      if (effect === "direction") effect = "rotate";
      const id = this.getTargetId(args.SPRITE, util, false);
      const encodedId = this.makeEncodedID(id);
      if (!encodedId) return;
      if (!allBubbles[encodedId]) this.addDefault(id);
      let path = allBubbles[encodedId][args.TYPE === "arrow" ? "arrowStyles" : "styles"];
      path = path[effect.includes("scale") || effect.includes("skew") || effect === "rotate" ? "transform" : "filter"];
      const filterProps = path.match(/[\w-]+\([^)]+\)/g) || [];
      const filterObj = {};
      filterProps.forEach(property => {
        const [name, value] = property.split("(");
        filterObj[name.toLowerCase()] = value.replace(/\)$/, "");
      });
      try {
        if (effect.includes("scale")) {
          const value = filterObj["scale"].split(",");
          return value[effect.includes("x") ? 0 : 1] * 100;
        } else {
          let number = Scratch.Cast.toNumber(filterObj[effect].replace("px", "").replace("deg", ""));
          if (effect === "saturate" || effect === "invert" || effect === "sepia") number = number * 100;
          else if (effect === "contrast" || effect === "brightness") number = number * 100 - 100;
          else if (effect === "opacity") number = (number * -100) + 100;
          else if (effect === "rotate") number = number + 90;
          return number;
        }
      } catch { return "" }
    }

    resetEffect(args, util) {
      const effects = this.getEffects(false);
      const defaultVals = [0, 100, 0, 0, 0, 0, 0, 0, 90, 0, 0];
      const id = this.getTargetId(args.SPRITE, util, true);
      const reseter = (obj) => {
        for (let i = 0; i < defaultVals.length; i++) {
          this.setEffect({ TYPE : "bubble", EFFECT: effects[i], NUM: defaultVals[i], SPRITE: obj.id });
          this.setEffect({ TYPE : "arrow", EFFECT: effects[i], NUM: defaultVals[i], SPRITE: obj.id });
        }
        this.setStretch({ TYPE : "bubble", x: 100, y: 100, SPRITE: obj.id });
        this.setStretch({ TYPE : "arrow", x: 100, y: 100, SPRITE: obj.id });
      };
      if (id === "_all_") Object.values(allBubbles).forEach(reseter);
      else reseter({ id });
    }
  }

  Scratch.extensions.register(new speechSP());
})(Scratch);
