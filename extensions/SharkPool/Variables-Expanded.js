// Name: Variables Expanded
// ID: DICandSPmonitorsPlus
// Description: Expansion of Monitor Types and Variable Blocks.
// By: SharkPool
// By: DogeIsCut
// License: MIT

// Version 1.5.01

(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) throw new Error("Variables Expanded must run unsandboxed!");

  const Cast = Scratch.Cast;
  const vm = Scratch.vm;
  const runtime = vm.runtime;
  const isPM = Scratch.extensions.isPenguinMod;

  const menuIconURI =
"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMjEiIGhlaWdodD0iMzIxIiB2aWV3Qm94PSIwIDAgMzIxIDMyMSI+PGcgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIj48cGF0aCBkPSJNMTQuNSAxNjAuNWMwLTgwLjYzNCA2NS4zNjYtMTQ2IDE0Ni0xNDZzMTQ2IDY1LjM2NiAxNDYgMTQ2LTY1LjM2NiAxNDYtMTQ2IDE0Ni0xNDYtNjUuMzY2LTE0Ni0xNDYiIGZpbGw9IiNmZjhjMWEiLz48cGF0aCBkPSJNODkuNTg3IDY0LjU0YzYuMjE1IDIuNzMgOS4wNDUgOS45NzcgNi4zMjcgMTYuMTk3YTE3MS43IDE3MS43IDAgMCAwLTE0LjMxNSA2OC45MjZjMCAyNC41MyA1LjEyIDQ3LjgzIDE0LjMyNyA2OC45MjYgMi40NzMgNi4xNzQtLjQwNSAxMy4xOTUtNi41IDE1Ljg1N3MtMTMuMjAxIDAtMTYuMDQ5LTYuMDFhMTk2LjMgMTk2LjMgMCAwIDEtMTYuMzk0LTc4Ljc3M2MwLTI3Ljk4OSA1Ljg0Ni01NC42NDggMTYuMzk0LTc4Ljc3MmExMi4zMSAxMi4zMSAwIDAgMSAxNi4yMS02LjM1MW0xMDIuMjk0IDQ4LjE5OWEzNi45MiAzNi45MiAwIDAgMC0yOC44MjYgMTMuODU5bC00LjAzNyA1LjA0Ni0xLjM2Ni0zLjQzNGEyNC42MiAyNC42MiAwIDAgMC0yMi44NDQtMTUuNDcxaC0zLjk3NmMtNi43OTcgMC0xMi4zMDggNS41MS0xMi4zMDggMTIuMzA4czUuNTEgMTIuMzA4IDEyLjMwOCAxMi4zMDhoMy45NzZsNi41NDggMTYuMzctMTIuNzQgMTUuOTRhMTIuMyAxMi4zIDAgMCAxLTkuNjEyIDQuNjE1aC0uNDhjLTYuNzk4IDAtMTIuMzA4IDUuNTEtMTIuMzA4IDEyLjMwOHM1LjUxIDEyLjMwOCAxMi4zMDggMTIuMzA4aC40OGEzNi45MiAzNi45MiAwIDAgMCAyOC44MjYtMTMuODU5bDQuMDM3LTUuMDQ2IDEuMzY2IDMuNDM0YTI0LjYyIDI0LjYyIDAgMCAwIDIyLjg1NiAxNS40NzFoMy45NzZjNi43OTggMCAxMi4zMDgtNS41MSAxMi4zMDgtMTIuMzA4cy01LjUxLTEyLjMwOC0xMi4zMDgtMTIuMzA4aC0zLjk3NmwtNi41NDctMTYuMzcgMTIuNzM5LTE1Ljk0YTEyLjMgMTIuMyAwIDAgMSA5LjYxMi00LjYxNWguNDhjNi43OTggMCAxMi4zMDgtNS41MSAxMi4zMDgtMTIuMzA4cy01LjUxLTEyLjMwOC0xMi4zMDgtMTIuMzA4aC0uNDh6bTIzLjA2Ni0zMi4wMDJjLTIuNjc3LTYuMjIuMTc2LTEzLjQzNSA2LjM4My0xNi4xNDQgNi4yMDctMi43MSAxMy40MzYuMTA1IDE2LjE3NyA2LjI5OGExOTYuMyAxOTYuMyAwIDAgMSAxNi40MDcgNzguNzcyYzAgMjcuOTktNS44NDYgNTQuNjQ5LTE2LjM5NCA3OC43NzNhMTIuMzA4IDEyLjMwOCAwIDEgMS0yMi41NDktOS44NDcgMTcxLjcgMTcxLjcgMCAwIDAgMTQuMzI3LTY4LjkyNmMwLTI0LjUzLTUuMTItNDcuODMtMTQuMzQtNjguOTI2eiIgZmlsbD0iI2ZmZiIgZmlsbC1ydWxlPSJldmVub2RkIi8+PHBhdGggZD0iTTIxNS42MDUgMjg5LjQ5MWMtMTAuMjYxIDAtMTguNTgtOC4zMTktMTguNTgtMTguNTh2LTkwLjQyNWMwLTEwLjI2MiA4LjMxOS0xOC41OCAxOC41OC0xOC41OGgxLjIzOWMxMC4yNjIgMCAxOC41OCA4LjMxOCAxOC41OCAxOC41OHY5MC40MjVjMCAxMC4yNjEtOC4zMTggMTguNTgtMTguNTggMTguNTh6IiBmaWxsPSIjZmY4YzFhIiBzdHJva2U9IiNmZjhjMWEiIHN0cm9rZS13aWR0aD0iMTIuNSIvPjxwYXRoIGQ9Ik0xNTIuNDMyIDIyNS4wNzljMC0xMC4yNjIgOC4zMTktMTguNTggMTguNTgtMTguNThoOTAuNDI1YzEwLjI2MiAwIDE4LjU4IDguMzE4IDE4LjU4IDE4LjU4djEuMjM5YzAgMTAuMjYxLTguMzE4IDE4LjU4LTE4LjU4IDE4LjU4aC05MC40MjVjLTEwLjI2MSAwLTE4LjU4LTguMzE5LTE4LjU4LTE4LjU4eiIgZmlsbD0iI2ZmOGMxYSIgc3Ryb2tlPSIjZmY4YzFhIiBzdHJva2Utd2lkdGg9IjEyLjUiLz48cGF0aCBkPSJNMTYwLjM4IDIyNS4yOWMwLTYuNzYzIDUuNDgzLTEyLjI0NiAxMi4yNDctMTIuMjQ2aDg3LjI5OWM2Ljc2MyAwIDEyLjI0NiA1LjQ4MyAxMi4yNDYgMTIuMjQ2di44MTdjMCA2Ljc2My01LjQ4MyAxMi4yNDYtMTIuMjQ2IDEyLjI0NmgtODcuM2MtNi43NjMgMC0xMi4yNDYtNS40ODMtMTIuMjQ2LTEyLjI0NnoiIGZpbGw9IiNmZmYiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIyIi8+PHBhdGggZD0iTTIxNi42ODQgMTY5LjgwMmM2Ljc2NCAwIDEyLjI0NyA1LjQ4MyAxMi4yNDcgMTIuMjQ3djg3LjI5OWMwIDYuNzYzLTUuNDgzIDEyLjI0Ni0xMi4yNDcgMTIuMjQ2aC0uODE2Yy02Ljc2NCAwLTEyLjI0Ni01LjQ4My0xMi4yNDYtMTIuMjQ2di04Ny4yOTljMC02Ljc2NCA1LjQ4Mi0xMi4yNDcgMTIuMjQ2LTEyLjI0N3oiIGZpbGw9IiNmZmYiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIyIi8+PHBhdGggZD0iTTcuNSAxNjAuNWMwLTg0LjUgNjguNS0xNTMgMTUzLTE1M3MxNTMgNjguNSAxNTMgMTUzLTY4LjUgMTUzLTE1MyAxNTMtMTUzLTY4LjUtMTUzLTE1M3oiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2RiNmUwMCIgc3Ryb2tlLXdpZHRoPSIxNSIvPjwvZz48L3N2Zz4=";

  const BUILT_IN_FONTS = [...new Set(
    Array.from(document.fonts).map(f => f.family)
  )].map((f) => ({ text: Scratch.translate(f), value: f }));

  let monitorButtons = {};
  let varUpdateListener = {};
  runtime.on("BEFORE_EXECUTE", () => { runtime.startHats("DICandSPmonitorsPlus_whenButtonPressed") });
  runtime.on("MONITORS_UPDATE", () =>{
    for (const [id, { func, inp }] of Object.entries(varUpdateListener)) {
      func(inp);
      if (typeof scaffolding === "undefined") {
        // Fix potential Custom Monitors that were Double-Clicked
        const varMonitor = document.querySelector(`div[data-id="${id}"][class*="monitor"]`);
        if (varMonitor) {
          Array.from(varMonitor.children).forEach(child => {
            if (
              !child.className.includes("monitor_SPmonitorPlus") && !child.style.display
            ) {
              delete varUpdateListener[id];
              const custMon = varMonitor.querySelector(`div[class^="monitor_default-monitor_SPmonitorPlus"`);
              if (custMon) varMonitor.removeChild(custMon);
            }
          });
        }
      }
    }
  });

  class VariablesExpanded {
    getInfo() {
      return {
        id: "DICandSPmonitorsPlus",
        name: "Variables Expanded",
        color1: "#FF8C1A",
        color2: "#e67e17",
        color3: "#cc7015",
        menuIconURI,
        blocks: [
          {
            opcode: "exists",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "does [VARIABLE] exist?",
            arguments: {
              VARIABLE: { type: Scratch.ArgumentType.STRING, defaultValue: "my variable" }
            },
          },
          {
            opcode: "isShowing",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is [VARIABLE] showing?",
            arguments: {
              VARIABLE: { type: Scratch.ArgumentType.STRING, menu: "variableMenu" }
            },
          },
          {
            opcode: "setVis",
            blockType: Scratch.BlockType.COMMAND,
            text: "[VIS] variable [VAR]",
            arguments: {
              VAR: { type: Scratch.ArgumentType.STRING, menu: "variableMenu" },
              VIS: { type: Scratch.ArgumentType.STRING, menu: "VISIBLE" }
            },
          },
          "---",
          {
            opcode: "setString",
            blockType: Scratch.BlockType.COMMAND,
            text: "set [VARIABLE] to [STRING]",
            arguments: {
              STRING: { type: Scratch.ArgumentType.STRING, defaultValue: 0, exemptFromNormalization: true },
              VARIABLE: { type: Scratch.ArgumentType.STRING, menu: "variableMenu" }
            },
          },
          {
            opcode: "setColor",
            blockType: Scratch.BlockType.COMMAND,
            text: "set [VARIABLE] to [COLOR]",
            arguments: {
              COLOR: { type: Scratch.ArgumentType.COLOR },
              VARIABLE: { type: Scratch.ArgumentType.STRING, menu: "variableMenu" }
            },
          },
          {
            opcode: "swapVars",
            blockType: Scratch.BlockType.COMMAND,
            text: "swap [VAR1] with [VAR2]",
            arguments: {
              VAR1: { type: Scratch.ArgumentType.STRING, menu: "variableMenu" },
              VAR2: { type: Scratch.ArgumentType.STRING, menu: "variableMenu" }
            },
          },
          {
            opcode: "reportVal",
            blockType: Scratch.BlockType.REPORTER,
            text: "value of [VARIABLE]",
            arguments: {
              VARIABLE: { type: Scratch.ArgumentType.STRING, menu: "variableMenu" }
            },
          },
          "---",
          {
            opcode: "makeVariable",
            blockType: Scratch.BlockType.COMMAND,
            text: "create variable named [VARIABLE] [TYPE]",
            arguments: {
              VARIABLE: { type: Scratch.ArgumentType.STRING, defaultValue: "my variable 2" },
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "variableTypeCreate" }
            },
          },
          {
            opcode: "deleteVariable",
            blockType: Scratch.BlockType.COMMAND,
            text: "delete variable named [VARIABLE]",
            arguments: {
              VARIABLE: { type: Scratch.ArgumentType.STRING, defaultValue: "my variable 2" }
            },
          },
          { blockType: Scratch.BlockType.LABEL, text: "Positioning" },
          {
            opcode: "setPosition",
            blockType: Scratch.BlockType.COMMAND,
            text: "set position of [VARIABLE] to x: [X] y: [Y]",
            arguments: {
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              VARIABLE: { type: Scratch.ArgumentType.STRING, menu: "variableMenu" }
            },
          },
          {
            opcode: "currentPos",
            blockType: Scratch.BlockType.REPORTER,
            text: "current [POSITION] of [VARIABLE]",
            arguments: {
              VARIABLE: { type: Scratch.ArgumentType.STRING, menu: "variableMenu" },
              POSITION: { type: Scratch.ArgumentType.STRING, menu: "POSITIONS" }
            },
          },
          { blockType: Scratch.BlockType.LABEL, text: "Variable Monitors" },
          {
            opcode: "setVariableToType",
            blockType: Scratch.BlockType.COMMAND,
            text: "set [VARIABLE] monitor type to [TYPE]",
            arguments: {
              VARIABLE: { type: Scratch.ArgumentType.STRING, menu: "variableMenu" },
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "variablesTypeMenu" }
            },
          },
          {
            opcode: "getVariableType",
            blockType: Scratch.BlockType.REPORTER,
            text: "monitor type of [VARIABLE]",
            arguments: {
              VARIABLE: { type: Scratch.ArgumentType.STRING, menu: "variableMenu" }
            },
          },
          { blockType: Scratch.BlockType.LABEL, text: "Sliders" },
          {
            opcode: "setSliderMinMaxOfVaribleTo",
            blockType: Scratch.BlockType.COMMAND,
            text: "set slider min [MIN] and max [MAX] of [VARIABLE]",
            arguments: {
              MIN: { type: Scratch.ArgumentType.NUMBER, defaultValue: -100 },
              MAX: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              VARIABLE: { type: Scratch.ArgumentType.STRING, menu: "variableMenu" }
            },
          },
          {
            opcode: "sliderMinMaxOfVarible",
            blockType: Scratch.BlockType.REPORTER,
            text: "slider [MINMAX] of [VARIABLE]",
            arguments: {
              MINMAX: { type: Scratch.ArgumentType.STRING, menu: "sliderMenu" },
              VARIABLE: { type: Scratch.ArgumentType.STRING, menu: "variableMenu" }
            },
          },
          { blockType: Scratch.BlockType.LABEL, text: "Buttons" },
          {
            opcode: "whenButtonPressed",
            blockType: Scratch.BlockType.HAT,
            isEdgeActivated: false,
            text: "when [VARIABLE] button [TYPE]",
            arguments: {
              VARIABLE: { type: Scratch.ArgumentType.STRING, menu: "variableMenu" },
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "BUTTON_CLICK" }
            },
          },
          {
            opcode: "isButtonPressed",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is [VARIABLE] button [TYPE]?",
            arguments: {
              VARIABLE: { type: Scratch.ArgumentType.STRING, menu: "variableMenu" },
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "BUTTON_CLICK" }
            },
          },
          { blockType: Scratch.BlockType.LABEL, text: "Effects" },
          {
            opcode: "setDisplay",
            blockType: Scratch.BlockType.COMMAND,
            text: "set display name of [VARIABLE] to [NAME]",
            arguments: {
              NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "my cooler variable" },
              VARIABLE: { type: Scratch.ArgumentType.STRING, menu: "variableMenu" }
            },
          },
          {
            opcode: "setFont",
            blockType: Scratch.BlockType.COMMAND,
            text: "set font of [VARIABLE] to [FONT]",
            arguments: {
              FONT: { type: Scratch.ArgumentType.STRING, menu: "allFonts" },
              VARIABLE: { type: Scratch.ArgumentType.STRING, menu: "variableMenu" }
            },
          },
          {
            opcode: "setFontSize",
            blockType: Scratch.BlockType.COMMAND,
            text: "set font size of [VARIABLE] to [SIZE]",
            arguments: {
              SIZE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 15 },
              VARIABLE: { type: Scratch.ArgumentType.STRING, menu: "variableMenu" }
            },
          },
          {
            opcode: "setInpColor",
            blockType: Scratch.BlockType.COMMAND,
            text: "set [THING] color of [VARIABLE] to [VALUE]",
            arguments: {
              VALUE: { type: Scratch.ArgumentType.COLOR },
              THING: { type: Scratch.ArgumentType.STRING, menu: "elementMenu" },
              VARIABLE: { type: Scratch.ArgumentType.STRING, menu: "variableMenu" }
            },
          },
          "---",
          {
            opcode: "resetEffect",
            blockType: Scratch.BlockType.COMMAND,
            text: "reset effects of [VARIABLE]",
            arguments: {
              VARIABLE: { type: Scratch.ArgumentType.STRING, menu: "variableMenu" }
            },
          },
          {
            opcode: "setEffect",
            blockType: Scratch.BlockType.COMMAND,
            text: "set [EFFECT] of [VARIABLE] to [AMOUNT]",
            arguments: {
              AMOUNT: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 },
              EFFECT: { type: Scratch.ArgumentType.STRING, menu: "EFFECTS" },
              VARIABLE: { type: Scratch.ArgumentType.STRING, menu: "variableMenu" }
            },
          },
          {
            opcode: "currentEffect",
            blockType: Scratch.BlockType.REPORTER,
            text: "current [EFFECT] of [VARIABLE]",
            arguments: {
              VARIABLE: { type: Scratch.ArgumentType.STRING, menu: "variableMenu" },
              EFFECT: { type: Scratch.ArgumentType.STRING, menu: "EFFECTS" }
            },
          },
        ],
        menus: {
          variableMenu: { acceptReporters: true, items: "getVariables" },
          allFonts: { acceptReporters: true, items: "getFonts" },
          sliderMenu: ["min", "max"],
          variableTypeCreate: ["globally", "for this sprite only"],
          POSITIONS: ["x", "y"],
          BUTTON_CLICK: ["clicked", "held"],
          VISIBLE: { acceptReporters: true, items: ["show", "hide"] },
          variablesTypeMenu: {
            acceptReporters: true,
            items: [
              "normal readout", "large readout", "slider",
              "text", "number", "date", "month", "time", 
              "checkbox", "color", "button", "file", "image", "audio"
            ]
          },
          elementMenu: {
            acceptReporters: true,
            items: ["input", "border"]
          },
          EFFECTS: {
            acceptReporters: true,
            items: [
              "blur", "saturation", "contrast", "brightness",
              "hue", "opacity", "sepia", "invert", "direction",
              "scale x", "scale y", "skew x", "skew y"
            ]
          },
        }
      }
    }

    // Helper Funcs
    getVariables() {
      const globalVars = Object.values(runtime.getTargetForStage().variables).filter((x) => x.type == "");
      const localVars = Object.values(vm.editingTarget.variables).filter((x) => x.type == "");
      const uniqueVars = [...new Set([...globalVars, ...localVars])];
      if (uniqueVars.length === 0) return ["make a variable"];
      return uniqueVars.map((i) => Cast.toString(i.name));
    }

    getFonts() {
      const customFonts = runtime.fontManager ? runtime.fontManager.getFonts().map((i) => ({ text: i.name, value: i.family })) : [];
      return [ ...BUILT_IN_FONTS, ...customFonts ];
    }

    refresh() {
      // Use to force refresh the toolbox to show new/deleted variables
      if (typeof scaffolding === "undefined") {
        vm.emitWorkspaceUpdate();
        const workspace = ScratchBlocks.getMainWorkspace();
        workspace.toolboxRefreshEnabled_ = true;
        workspace.refreshToolboxSelection_();
        workspace.toolboxRefreshEnabled_ = false;
        setTimeout(() => runtime.requestBlocksUpdate(), 10);
      }
    }

    generateId() {
      // Used for creating IDs for variables
      const soup = "!#%()*+,-./:;=?@[]^_`{|}~ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const id = [];
      for (let i = 0; i < 20; i++) id.push(soup.charAt(Math.random() * soup.length));
      return id.join("");
    }
    
    findVariable(varName, sprite) {
      // support for all variable types (Cloud, Sprite-Only, Global)
      varName = Cast.toString(varName);
      const cloudID = runtime.getTargetForStage().lookupVariableByNameAndType(Cast.toString("ÃƒÂ¢Ã‹ÂœÃ‚Â " + varName), "");
      if (cloudID) return cloudID.id;
      let varFind = "";
      for (const name of Object.getOwnPropertyNames(sprite.target.variables)) {
        varFind = sprite.target.variables[name].name;
        if (varFind === varName) return sprite.target.variables[name].id;
      }

      const variable = runtime.getTargetForStage().lookupVariableByNameAndType(varName, "");
      return variable ? variable.id : "";
    }

    resetEffects(variableId, curTransform) {
      const varMonitor = document.querySelector(`div[data-id="${variableId}"][class*="monitor"]`);
      if (!varMonitor) return;
      const matches = curTransform.match(/translate\(([^,]+),\s*([^)]+)\)/);
      varMonitor.style.filter = "";
      varMonitor.style.transform = matches ? `translate(${matches[1]}, ${matches[2]})` : "";
    }

    getMonitor(varName, util) {
      const varId = this.findVariable(varName, util);
      const varMonitor = document.querySelector(`div[data-id="${varId}"][class*="monitor"]`);
      if (!varMonitor) return "normal readout";
      const inputcheck = varMonitor.querySelector("input");
      if (inputcheck !== null) {
        if (inputcheck.type === "range") return "slider";
        else return inputcheck.type;
      } else {
        if (varMonitor.querySelector("img")) return "image";
        else if (varMonitor.querySelector("audio")) return "audio";
        else if (varMonitor.querySelector(`div[class^="monitor_large-value_"]`)) return "large readout";
        else return "normal readout";
      }
    }

    setMonitor(nameID, util, nameTxt, type) {
      const baseMonitors = {
        "normal readout": "default", "large readout": "large", "slider": "slider"
      };
      const custMonitors = [
        "text", "number", "checkbox", "color", "date",
        "month", "time", "button", "file", "image", "audio"
      ];
      const isHexRegex = /^#([0-9A-F]{3}){1,2}$/i;
      const addVarListener = (id, inp, func) => {
        varUpdateListener[id] = { inp, func };
      };
      const buttonClick = (ID, down) => {
        if (down) monitorButtons[ID] = { varName : ID, isDown : down, timeClick : Date.now() };
        else delete monitorButtons[ID];
      };

      let varId = this.findVariable(nameID, util);
      if (!varId) return;
      const variable = util.target.lookupVariableById(varId);
      let state = runtime.getMonitorState().get(varId);
      const varMonitor = document.querySelector(`div[data-id="${varId}"][class*="monitor"]`);
      if (!varMonitor) return;
      let container, input;

      // Do Not Change This Class Name. We want to Preserve CSS Attributes
      container = varMonitor.querySelector(`div[class^="monitor_default-monitor_SPmonitorPlus"`);
      if (container) varMonitor.removeChild(container);
      delete varUpdateListener[varId];

      if (custMonitors.indexOf(type) > -1) {
        // Check if Custom CSS Exists
        const newStyles = document.querySelector(`style[class="shovelcss-style"]`);
        container = document.createElement("div");
        container.className = "monitor_default-monitor_SPmonitorPlus";
        container.setAttribute("style", "padding: 5px 5px 5px 5px");
        // Hide the Old Monitor Inner Elements rather than Delete. This Prevents Editor Crashes
        Array.from(varMonitor.children).forEach(child => {
          child.style.display = "none";
        });

        // Listeners
        const normUpdate = (inp) => { inp.value = variable.value };
        const srcUpdate = (inp) => { inp.src = variable.value };
        const checkUpdate = (inp) => { inp.checked = Cast.toBoolean(variable.value) };

        // Label Creation
        const label = document.createElement("div");
        label.className = "monitor_row";
        const innerLabel = document.createElement("div");
        innerLabel.className = "monitor_label";
        innerLabel.textContent = nameID;
        innerLabel.style.fontWeight = 700;
        innerLabel.style.margin = "0px 5px 0px 5px";
        innerLabel.style.color = newStyles ? "auto" : "#575E75";
        label.appendChild(innerLabel);

        if (type === "audio") {
          input = document.createElement("audio");
          input.src = variable.value;
          input.controls = true;
          addVarListener(varId, input, srcUpdate);
        } else if (type === "image") {
          input = document.createElement("img");
          input.src = variable.value;
          addVarListener(varId, input, srcUpdate);
        } else {
          input = document.createElement("input");
          input.type = type;
          if (type === "checkbox") input.checked = Cast.toBoolean(variable.value);
          else if (type === "button") input.value = input.value = nameID;
          else if (type === "file") input.value = "";
          else if (type === "color") {
            input.value = isHexRegex.test(variable.value) ? variable.value : "#000";
            input.style.height = "30px";
            const colorStyle = document.createElement("style");
            colorStyle.textContent = `
              input[type="color"]::-webkit-color-swatch {
                border: black solid 1px;
                margin: 2px;
                border-radius: 5px;
              }
              input[type="color"]::-webkit-color-swatch-wrapper {
                padding: 0px;
              }
              input[type="color"]::-moz-color-swatch {
                border: black solid 1px;
                margin: 2px;
                border-radius: 5px;
              }
            `;
            input.append(colorStyle);
          } else if (type === "number") {
            input.value = Cast.toNumber(variable.value);
            input.max = state.get("sliderMax");
            input.min = state.get("sliderMin");
          } else { input.value = variable.value }
        }
        input.id = `${type}_${varId}`;
        input.className = "no-drag"; // Mimic the Slider Behaviour in-editor
        if (!navigator.userAgent.includes("Chrome") && navigator.userAgent.includes("Safari") && type === "checkbox") {
          // Dumb Safari HTML Bug
          input.style.margin = "10px";
          input.style.width = "auto";
          input.style.transform = "scale(2.5)";
        } else {
          input.style.marginTop = "2px";
          input.style.width = type === "checkbox" ? "50%" : "100%";
          input.style.borderRadius = "5px";
          if (type !== "audio") input.style.border = "solid 1px";
        }
        if (type === "button") container.appendChild(input);
        else if (type === "checkbox") {
          label.insertBefore(input, label.firstChild);
          container.appendChild(label);
          addVarListener(varId, input, checkUpdate);
        } else {
          input.style.minWidth = type === "audio" ? "275px" : "20px";
          container.append(label, input);
          if (type !== "file" && type !== "audio" && type !== "image") addVarListener(varId, input, normUpdate);
        }

        if (type !== "audio" && type !== "image") {
          if (type === "button") {
            const btnClickFunc = (down) => () => buttonClick(varId, down);
            input.addEventListener("mousedown", btnClickFunc(true));
            input.addEventListener("mouseup", btnClickFunc(false));
            input.addEventListener("mouseleave", btnClickFunc(false));
          } else {
            input.addEventListener("change", (event) => {
              const inputType = event.target.id;
              if (inputType.startsWith("checkbox")) variable.value = input.checked;
              else if (inputType.startsWith("file")) {
                const file = event.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.readAsDataURL(file);
                  reader.onload = () => {
                    variable.value = reader.result
                  };
                  reader.onerror = (e) => {
                    console.error(e)
                  };
                }
              } else variable.value = input.value;
            });
          }
        }
        varMonitor.appendChild(container);
      } else {
        varMonitor.firstChild.style.display = "";
        if (baseMonitors[type] === undefined) type = "normal readout";
        if (isPM) {
          runtime.requestUpdateMonitor(state.set("mode", baseMonitors[type]));
        } else {
          runtime.requestUpdateMonitor({ "id": varId, "mode": baseMonitors[type] });
        }
      }
    }

    // Block Funcs
    isShowing(args, util) {
      const info = runtime.getMonitorState().get(this.findVariable(args.VARIABLE, util));
      return info ? (info.get("visible") !== undefined && info.get("visible") !== false) : false;
    }

    exists(args, util) { return Cast.toBoolean(this.findVariable(args.VARIABLE, util)) }

    setVis(args, util) {
      const variable = util.target.lookupVariableByNameAndType(args.VAR, "");
      if (!variable) return;
      runtime.monitorBlocks.changeBlock({
        id: variable.id, element: "checkbox", value: args.VIS === "show"
      }, runtime);
    }

    setString(args, util) {
      const variable = util.target.lookupOrCreateVariable("", Cast.toString(args.VARIABLE));
      variable.value = args.STRING;
    }
    setColor(args, util) {
      const variable = util.target.lookupOrCreateVariable("", Cast.toString(args.VARIABLE));
      variable.value = args.COLOR, util;
    }

    swapVars(args, util) {
      const var1 = util.target.lookupOrCreateVariable("", Cast.toString(args.VAR1));
      const var2 = util.target.lookupOrCreateVariable("", Cast.toString(args.VAR2));
      const temp = var1.value;
      var1.value = var2.value;
      var2.value = temp;
    }

    reportVal(args, util) {
      const variable = this.findVariable(args.VARIABLE, util);
      if (!variable) return 0;
      return util.target.lookupVariableById(variable).value;
    }

    makeVariable(args, util) {
      const name = Cast.toString(args.VARIABLE);
      if (args.TYPE === "for this sprite only") util.target.createVariable(this.generateId(), name, "", false);
      else runtime.createNewGlobalVariable(name, "");
      return this.refresh();
    }

    deleteVariable(args, util) {
      const variable = this.findVariable(args.VARIABLE, util);
      if (variable) {
        runtime.getTargetForStage().deleteVariable(variable)
        util.target.deleteVariable(variable);
        return this.refresh();
      }
    }

    setPosition(args, util) {
      const canvas = [runtime.stageWidth / 2, runtime.stageHeight / 2];
      const varId = this.findVariable(args.VARIABLE, util);
      const varMonitor = document.querySelector(`div[data-id="${varId}"][class*="monitor"]`);
      if (!varMonitor) return;
      varMonitor.setAttribute("SPposition", `[${Cast.toNumber(args.X)}, ${Cast.toNumber(args.Y)}]`);
      let x = Cast.toNumber(args.X) + canvas[0] - (varMonitor.offsetWidth / 2);
      let y = (Cast.toNumber(args.Y) - canvas[1] + (varMonitor.offsetHeight / 2)) * -1;
      x = x - (parseFloat(varMonitor.style.left) || 5);
      y = y - (parseFloat(varMonitor.style.top) || 5);

      let styleAtts = varMonitor.getAttribute("style");
      const transformRegex = /transform:([^;]+);/;
      const transformMatch = styleAtts.match(transformRegex);
      if (transformMatch) {
        const oldTransform = transformMatch[1];
        const newTransform = oldTransform.replace(/translate\([^)]+\)/, `translate(${x}px, ${y}px)`);
        styleAtts = styleAtts.replace(transformRegex, `transform:${newTransform};`);
        varMonitor.setAttribute("style", styleAtts);
      }
      runtime.requestUpdateMonitor(new Map([["id", varId], ["x", x], ["y", y]]));
    }

    currentPos(args, util) {
      const canvas = [runtime.stageWidth / 2, runtime.stageHeight / 2];
      const varId = this.findVariable(args.VARIABLE, util);
      const varMonitor = document.querySelector(`div[data-id="${varId}"][class*="monitor"]`);
      if (!varMonitor) return ""; // Should Report Nothing if Invisible
      const presetPos = varMonitor.getAttribute("SPposition");
      // less work is done, plus it retains accuracy
      if (presetPos) return JSON.parse(presetPos)[args.POSITION === "x" ? 0 : 1];
      const styleAttribute = varMonitor.getAttribute("style");
      if (!styleAttribute) return "";
      const match = styleAttribute.match(/transform\s*:\s*translate\((-?\d+(?:\.\d+)?px),\s*(-?\d+(?:\.\d+)?px)\)/);
      if (match) {
        if (args.POSITION === "x") return Math.round(parseFloat(match[1]) - canvas[0] + (varMonitor.offsetWidth / 2)) + parseFloat(varMonitor.style.left);
        else return Math.round(((parseFloat(match[2]) * -1) + canvas[1]) - (varMonitor.offsetHeight / 2) - parseFloat(varMonitor.style.top)) - 1;
      }
    }

    setSliderMinMaxOfVaribleTo(args, util) {
      const varId = this.findVariable(args.VARIABLE, util);
      if (!varId) return;
      const margins = [Cast.toNumber(args.MIN), Cast.toNumber(args.MAX)];
      const moniType = this.getMonitor(args.VARIABLE, util);
      if (moniType === "number") {
        const input = document.getElementById(`number_${varId}`);
        if (input) {
          input.min = margins[0];
          input.max = margins[1];
        }
      } else {
        const varMonitor = document.querySelector(`div[data-id="${varId}"][class*="monitor"]`);
        if (varMonitor) {
          const container = varMonitor.querySelector(`div[class^="monitor_default-monitor_SPmonitorPlus"`);
          if (container) varMonitor.removeChild(container);
          varMonitor.firstChild.style.display = "";
        }
        var state = runtime.getMonitorState().get(varId);
        if (!state) return;

        if (isPM) {
          state = state.set("mode", "slider");
          runtime.requestUpdateMonitor(state);
          runtime.requestUpdateMonitor(new Map([
            ["id", varId], ["sliderMin", margins[0]], ["sliderMax", margins[1]]
          ]));
        } else {
          runtime.requestUpdateMonitor({
            "id": varId,
            "mode": "slider",
            "sliderMin": margins[0], "sliderMax": margins[1]
          });
        }
      }
    }

    sliderMinMaxOfVarible(args, util) {
      const varId = this.findVariable(args.VARIABLE, util);
      const info = runtime.getMonitorState().get(varId);
      if (info === undefined) return 0;
      return info.get(args.MINMAX === "min" ? "sliderMin" : "sliderMax");
    }

    setVariableToType(args, util) { this.setMonitor(args.VARIABLE, util, args.VARIABLE, args.TYPE) }

    getVariableType(args, util) { return this.getMonitor(args.VARIABLE, util) }

    whenButtonPressed(args, util) { return this.isButtonPressed(args, util) }

    isButtonPressed(args, util) {
      const varId = this.findVariable(args.VARIABLE, util);
      if (monitorButtons[varId] !== undefined) {
        if (args.TYPE === "held") return true;
        else {
          const date = monitorButtons[varId].timeClick;
          const now = Date.now();
          // Ignore Last 3 Digits, as Events => Hats arent Instant
          const con = Math.floor(date / 1000) === Math.floor(now / 1000);
          if (con) delete monitorButtons[varId];
          return con;
        }
      }
      return false;
    }

    setDisplay(args, util) {
      let varId = this.findVariable(args.VARIABLE, util);
      const varLabels = document.querySelectorAll(`div[data-id="${varId}"][class*="monitor"] [class*="label"]`);
      // No need to xmlEscape, we edit with textContent
      if (varLabels.length > 0) {
        for (var i = 0; i < varLabels.length; i++) varLabels[i].textContent = args.NAME;
      }
      const btn = document.querySelector(`div[data-id="${varId}"][class*="monitor"] [id="button_${varId}"]`);
      if (btn) btn.value = args.NAME;
    }

    setFont(args, util) {
      const varId = this.findVariable(args.VARIABLE, util);
      const varMonitor = document.querySelector(`div[data-id="${varId}"][class*="monitor"]`);
      if (varMonitor) varMonitor.style.fontFamily = args.FONT;
    }

    setFontSize(args, util) {
      const varId = this.findVariable(args.VARIABLE, util);
      const varMonitor = document.querySelector(`div[data-id="${varId}"][class*="monitor"]`);
      if (varMonitor) varMonitor.style.fontSize = `${Cast.toNumber(args.SIZE)}px`;
    }

    setInpColor(args, util) {
      const varId = this.findVariable(args.VARIABLE, util);
      const varMonitor = document.querySelector(`div[data-id="${varId}"][class*="monitor"]`);
      if (!varMonitor) return;
      let inputs = [
        ...varMonitor.querySelectorAll("input"), ...varMonitor.querySelectorAll("img")
      ];
      const value = Cast.toString(args.VALUE);
      if (args.THING === "input") {
        varMonitor.style.accentColor = value;
        Array.from(inputs).forEach(input => { input.style.background = value });
      } else if (args.THING === "border") {
        Array.from(inputs).forEach(input => { input.style.borderColor = value });
      }
    }

    resetEffect(args, util) {
      const varId = this.findVariable(args.VARIABLE, util);
      const varMonitor = document.querySelector(`div[data-id="${varId}"][class*="monitor"]`);
      if (varMonitor) this.resetEffects(varId, varMonitor.style.transform || "");
    }

    setEffect(args, util) {
      const varId = this.findVariable(args.VARIABLE, util);
      const varMonitor = document.querySelector(`div[data-id="${varId}"][class*="monitor"]`);
      if (!varMonitor) return;
      let EFFECT = args.EFFECT;
      let value = args.AMOUNT;
      let curTransform = varMonitor.style.transform;
      let curFilters = varMonitor.style.filter || "";
      if (EFFECT === "saturation") EFFECT = "saturate";
      else if (EFFECT === "hue") EFFECT = "hue-rotate";
      else if (EFFECT === "direction") {
        EFFECT = "rotate";
        value = value - 90;
      } else if (EFFECT === "scale" || EFFECT === "scale x" || EFFECT === "scale y") {
        value = value / 100;
        EFFECT = EFFECT.replace("x", "X").replace("y", "Y").replaceAll(" ", "");
      }
      else if (EFFECT === "brightness") value = value + 100;
      else if (EFFECT === "skew x") EFFECT = "skewX";
      else if (EFFECT === "skew y") EFFECT = "skewY";

      const regex = new RegExp(`${EFFECT}\\([^)]+\\)`, "g");
      curTransform = curTransform.replace(regex, "").trim();
      curFilters = curFilters.replace(regex, "").trim();
      if (EFFECT.includes("scale") || EFFECT === "rotate" || EFFECT.includes("skew")) {
        curTransform += ` ${EFFECT}(${value}${EFFECT === "rotate" || EFFECT.includes("skew") ? "deg" : ""})`;
        varMonitor.style.transform = curTransform.trim();
      } else {
        curFilters += ` ${EFFECT}(${value}${EFFECT === "blur" ? "px" : EFFECT === "hue-rotate" ? "deg" : "%"})`;
        varMonitor.style.filter = curFilters.trim();
      }
    }

    currentEffect(args, util) {
      const varId = this.findVariable(args.VARIABLE, util);
      const varMonitor = document.querySelector(`div[data-id="${varId}"][class*="monitor"]`);
      if (!varMonitor) return "";
      const curTransform = varMonitor.style.transform;
      const curFilters = varMonitor.style.filter || "";
    
      const setEffect = {
        saturation: "saturate", hue: "hue-rotate",
        direction: "rotate", scale: "scale", "scale x": "scaleX", "scale y": "scaleY",
        brightness: "brightness", opacity: "opacity",
        "skew x": "skewX", "skew y": "skewY"
      }[args.EFFECT] || args.EFFECT;
      const defaultV = {
        saturation: 100, hue: 0,
        direction: 90, scale: 100, "scale x": 100, "scale y": 100,
        brightness: 0, opacity: 100
      }[args.EFFECT] || 0;

      const regex = new RegExp(`${setEffect}\\(([^)]+)\\)`);
      const transformMatch = curTransform.match(regex);
      const filterMatch = curFilters.match(regex);
      if (filterMatch || transformMatch) {
        const unitValue = (filterMatch || transformMatch)[1];
        const numericValue = parseFloat(unitValue.replace(/[^0-9.-]/g, ""));
        if (setEffect === "brightness") return numericValue - 100;
        else if (setEffect === "rotate") return numericValue + 90;
        else if (setEffect.includes("scale")) return numericValue * 100;
        else return numericValue;
      } else { return defaultV }
    }
  }

  Scratch.extensions.register(new VariablesExpanded());
})(Scratch);
