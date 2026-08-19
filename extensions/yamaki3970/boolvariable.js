// Name: BoolVariables
// ID: BV
// Description: Adds and manages boolean variables. (Debugged and assisted by AI)
// By: yamaki3970 <https://scratch.mit.edu/users/yamaki3970/>
// License: MPL-2.0
(async (Scratch) => {
  "use strict";
  let iconurl = [
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0naHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnIHdpZHRoPScyNS40OTYzMicgaGVpZ2h0PScyNS40OTYzMicgdmlld0JveD0nMCAwIDI1LjQ5NjMyIDI1LjQ5NjMyJz48ZyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgtMjI3LjI1MTg0LC0xNjcuMjUxODQpJyBzdHJva2UtbWl0ZXJsaW1pdD0nMTAnPjxwYXRoIGQ9J00yMjguMDAxODQsMTgwYzAsLTYuNjI2NCA1LjM3MTc2LC0xMS45OTgxNiAxMS45OTgxNiwtMTEuOTk4MTZjNi42MjY0LDAgMTEuOTk4MTYsNS4zNzE3NiAxMS45OTgxNiwxMS45OTgxNmMwLDYuNjI2NCAtNS4zNzE3NiwxMS45OTgxNiAtMTEuOTk4MTYsMTEuOTk4MTZjLTYuNjI2NCwwIC0xMS45OTgxNiwtNS4zNzE3NiAtMTEuOTk4MTYsLTExLjk5ODE2eicgZmlsbD0nI2ZmOGMxYScgZmlsbC1ydWxlPSdub256ZXJvJyBzdHJva2U9JyNiZTY5MTMnIHN0cm9rZS13aWR0aD0nMS41Jy8",
  ];
  iconurl[1] =
    "PHBhdGggZD0nTTI0Mi45NiwxNzYuNWMtMC45MTExNSwwLjAwMDIgLTEuNzcyODMsMC40MTQ0OSAtMi4zNDIsMS4xMjZsLTAuMzI4LDAuNDFsLTAuMTExLC0wLjI3OWMtMC4zMDM2NywtMC43NTg5MSAtMS4wMzg1OSwtMS4yNTY2NSAtMS44NTYsLTEuMjU3aC0wLjMyM2MtMC41NTIyOCwwIC0xLDAuNDQ3NzIgLTEsMWMwLDAuNTUyMjggMC40NDc3MiwxIDEsMWgwLjMyM2wwLjUzMiwxLjMzbC0xLjAzNSwxLjI5NWMtMC4xODk4NiwwLjIzNzE0IC0wLjQ3NzIyLDAuMzc1MTEgLTAuNzgxLDAuMzc1aC0wLjAzOWMtMC41NTIyOCwwIC0xLDAuNDQ3NzIgLTEsMWMwLDAuNTUyMjggMC40NDc3MiwxIDEsMWgwLjAzOWMwLjkxMTE1LC0wLjAwMDIgMS43NzI4MywtMC40MTQ0OSAyLjM0MiwtMS4xMjZsMC4zMjgsLTAuNDFsMC4xMTEsMC4yNzljMC4zMDM4LDAuNzU5MjUgMS4wMzkyMywxLjI1NzA1IDEuODU3LDEuMjU3aDAuMzIzYzAuNTUyMjgsMCAxLC0wLjQ0NzcyIDEsLTFjMCwtMC41NTIyOCAtMC40NDc3MiwtMSAtMSwtMWgtMC4zMjNsLTAuNTMyLC0xLjMzbDEuMDM1LC0xLjI5NWMwLjE4OTg2LC0wLjIzNzE0IDAuNDc3MjIsLTAuMzc1MTEgMC43ODEsLTAuMzc1aDAuMDM5YzAuNTUyMjgsMCAxLC0wLjQ0NzcyIDEsLTFjMCwtMC41NTIyOCAtMC40NDc3MiwtMSAtMSwtMWgtMC4wMzl6JyBmaWxsPScjZmZmZmZmJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnLz48cGF0aCBkPSdNMjQ2LjcxNzE1LDE3My4wODMwMWMwLjI0Njk5LDAuMDk2NzcgMC40NDU0MiwwLjI4NzczIDAuNTUxNiwwLjUzMDgzYzAuODU3LDEuOTYgMy4yMjAwNiw2LjI2MjY4IDMuMjIwMDYsNi4yNjI2OGMwLDAgLTIuMzM4OTYsNC41MTg4MiAtMy4yMjAwNiw2LjUzNzMyYy0wLjIzMTM0LDAuNDg4MyAtMC44MDg3MiwwLjcwNDUxIC0xLjMwMzg5LDAuNDg4MjhjLTAuNDk1MTcsLTAuMjE2MjQgLTAuNzI5MDIsLTAuNzg2NyAtMC41MjgxMSwtMS4yODgyOGMwLjc0OCwtMS43MTQgMi42MDU4LC01LjYgMi42MDU4LC01LjZjMCwwIC0xLjgzNDUyLC0zLjgzMzY5IC0yLjYwNDgsLTUuNmMtMC4yMjA4OCwtMC41MDUzNSAwLjAwOTA4LC0xLjA5NDEzIDAuNTE0LC0xLjMxNmMwLjI0MzA3LC0wLjEwNjI3IDAuNTE4NCwtMC4xMTE2IDAuNzY1NCwtMC4wMTQ4M3pNMjI5LjUxMTE5LDE3OS44NzY1MnonIGZpbGw9JyNmZmZmZmYnIGZpbGwtcnVsZT0nZXZlbm9kZCcvPjxwYXRoIGQ9J00yMzQuMDQ4MjUsMTczLjA5Nzg0YzAuNTA0OTIsMC4yMjE4NyAwLjczNDg4LDAuODEwNjUgMC41MTQsMS4zMTZjLTAuNzcwMjgsMS43NjYzMSAtMi42MDQ3OSw1LjYgLTIuNjA0NzksNS42YzAsMCAxLjg1NzgsMy44ODYgMi42MDU4LDUuNmMwLjIwMDkxLDAuNTAxNTggLTAuMDMyOTQsMS4wNzIwNCAtMC41MjgxMSwxLjI4ODI4Yy0wLjQ5NTE3LDAuMjE2MjMgLTEuMDcyNTUsMC4wMDAwMiAtMS4zMDM4OSwtMC40ODgyOGMtMC44ODExLC0yLjAxODQ5IC0zLjIyMDA2LC02LjUzNzMyIC0zLjIyMDA2LC02LjUzNzMyYzAsMCAyLjM2MzA2LC00LjMwMjY4IDMuMjIwMDYsLTYuMjYyNjljMC4xMDYxOCwtMC4yNDMxIDAuMzA0NjEsLTAuNDM0MDYgMC41NTE2LC0wLjUzMDgzYzAuMjQ3LC0wLjA5Njc3IDAuNTIyMzMsLTAuMDkxNDQgMC43NjU0LDAuMDE0ODN6TTI1MC40ODg4MSwxNzkuODc2NTJ6JyBmaWxsPScjZmZmZmZmJyBmaWxsLXJ1bGU9J2V2ZW5vZGQnLz48L2c";
  const icon = `${iconurl[0]}+${iconurl[1]}+PC9zdmc+`;
  let myScratchBlocks;
  if (Scratch.gui) {
    await Scratch.gui.getBlockly().then((ScratchBlocks) => {
      myScratchBlocks = ScratchBlocks;
    });
  }
  class Boolvariable {
    static customId = "boolvariable";
    serialize() {
      return {
        boolVariables: this.boolVariables,
        boolVariablesinfo: this.boolVariablesinfo,
      };
    }
    deserialize(data) {
      this.boolVariables = data.boolVariables;
      this.boolVariablesinfo = data.boolVariablesinfo;
    }
    constructor() {
      this.boolVariables = {};
      this.boolVariablesinfo = {};
      this.isUIOpen = false;
      this.isDelUIOpen = false;
      this.frameCount = 0;
      this.customId = Boolvariable.customId;
      this.type = Boolvariable.customId;
    }
    refreshBlocks() {
      setTimeout(() => {
        Scratch.vm.extensionManager.refreshBlocks("BV");
      }, 5);
    }
    ensureVariableExists(internalKey) {
      if (
        Object.prototype.hasOwnProperty.call(this.boolVariables, internalKey)
      ) {
        return;
      }
      let displayName = internalKey;
      let isLocal = false;
      let targetId = "stage";
      if (internalKey.includes("_")) {
        const lastIndex = internalKey.lastIndexOf("_");
        isLocal = true;
        targetId = internalKey.substring(0, lastIndex);
        displayName = internalKey.substring(lastIndex + 1);
      } else {
        displayName = internalKey;
        isLocal = false;
        targetId = "stage";
      }
      this.boolVariables[internalKey] = false;
      this.boolVariablesinfo[internalKey] = {
        isLocal: isLocal,
        targetId: targetId,
        displayName: displayName,
      };
      this.refreshBlocks();
    }
    getInfo() {
      return {
        id: "BV",
        name: Scratch.translate({
          default: "BoolVariables",
          description:
            "A note or instruction specific to Japanese users regarding the usage or convention of BoolVariables.",
        }),
        menuIconURI: icon,
        color1: "#ff8c1a",
        color2: "#ff8000",
        color3: "#db6d00",
        blocks: [
          {
            func: "createUI",
            blockType: Scratch.BlockType.BUTTON,
            text: Scratch.translate({
              default: "M-sampledesign.siteake a Variable",
              description: "Button to open the variable creation UI",
            }),
          },
          {
            opcode: "setBool",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate({
              default: "set bool variable [variable] to [bool]",
              description: "Command to set a boolean variable value",
            }),
            arguments: {
              variable: {
                type: Scratch.ArgumentType.STRING,
                menu: "boolVariableMenu",
              },
              bool: {
                type: Scratch.ArgumentType.STRING,
                menu: "staticBoolMenu",
              },
            },
          },
          {
            opcode: "getBool",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate({
              default: "bool variable [variable]",
              description: "Reporter to get the value of a boolean variable",
            }),
            arguments: {
              variable: {
                type: Scratch.ArgumentType.STRING,
                menu: "boolVariableMenu",
              },
            },
          },
          {
            opcode: "ifBool",
            blockType: Scratch.BlockType.EVENT,
            text: Scratch.translate({
              default: "when bool variable [variable] becomes [bool]",
              description:
                "Hat block triggered when a boolean variable changes",
            }),
            isEdgeActivated: false,
            arguments: {
              variable: {
                type: Scratch.ArgumentType.STRING,
                menu: "boolVariableHatMenu",
              },
              bool: {
                type: Scratch.ArgumentType.STRING,
                menu: "staticBoolMenu",
              },
            },
          },
          {
            opcode: "deleteBool",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate({
              default: "delete bool variable [variable]",
              description: "Command to delete a boolean variable",
            }),
            arguments: {
              variable: {
                type: Scratch.ArgumentType.STRING,
                menu: "boolVariableMenu",
              },
            },
          },
          "---",
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate({
              default: "other kit",
              description: "Label for logic operation blocks",
            }),
          },
          {
            opcode: "reversebool",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("![bool]"),
            arguments: {
              bool: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
            },
          },
          {
            opcode: "andbool",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("[bool1] && [bool2]"),
            arguments: {
              bool1: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
              bool2: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
            },
          },
          {
            opcode: "orbool",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("[bool1] || [bool2]"),
            arguments: {
              bool1: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
              bool2: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
            },
          },
          {
            opcode: "xorbool",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("[bool1] !== [bool2]"),
            arguments: {
              bool1: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
              bool2: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
            },
          },
        ],
        menus: {
          boolVariableMenu: {
            acceptReporters: false,
            items: "getVariableMenuItems",
          },
          boolVariableHatMenu: {
            acceptReporters: false,
            items: "getVariableMenuItems",
          },
          staticBoolMenu: {
            acceptReporters: false,
            items: [
              {
                text: "true",
                value: "true",
              },
              {
                text: "false",
                value: "false",
              },
            ],
          },
        },
      };
    }
    createUI() {
      try {
        const self = this;
        myScratchBlocks.prompt(
          Scratch.translate("New variable name:"),
          "",
          (name, more_vars, { scope }) => {
            if (!name || name.trim() === "") {
              return;
            }
            const trimmedName = name.trim();
            const editingTarget = Scratch.vm.runtime.getEditingTarget();
            const currentTargetId = editingTarget
              ? (editingTarget.id ?? "stage")
              : "stage";
            const isLocal = scope === "local";
            const targetId = isLocal ? currentTargetId : "stage";
            const internalKey = isLocal
              ? `${targetId}_${trimmedName}`
              : trimmedName;
            for (const key of Object.keys(self.boolVariablesinfo)) {
              const info = self.boolVariablesinfo[key];
              if (info.displayName === trimmedName) {
                if (!isLocal && !info.isLocal) {
                  alert(
                    Scratch.translate("{trimmedName} already exists", {
                      trimmedName: trimmedName,
                    })
                  );
                  return;
                }
                if (isLocal && info.isLocal && info.targetId === targetId) {
                  alert(
                    Scratch.translate("{trimmedName} already exists", {
                      trimmedName: trimmedName,
                    })
                  );
                  return;
                }
              }
            }
            self.boolVariables[internalKey] = false;
            self.boolVariablesinfo[internalKey] = {
              isLocal: isLocal,
              targetId: targetId,
              displayName: trimmedName,
            };
            this.refreshBlocks();
            return;
          },
          Scratch.translate("New Variable"),
          Boolvariable.customId
        );
      } catch (err) {}
    }
    getVariableMenuItems(currentlySelectedValue) {
      const menuItems = [];
      const currentTarget = Scratch.vm.runtime.getEditingTarget();
      const currentTargetId = currentTarget
        ? (currentTarget.id ?? "stage")
        : "stage";
      const variableKeys = Object.keys(this.boolVariables).filter((key) => {
        const info = this.boolVariablesinfo[key];
        if (!info) return true;
        return !info.isLocal || info.targetId === currentTargetId;
      });
      if (variableKeys.length > 0) {
        for (const key of variableKeys) {
          const info = this.boolVariablesinfo[key];
          const dispName = info ? (info.displayName ?? key) : key;
          menuItems.push({
            text: dispName,
            value: key,
          });
        }
      } else {
        menuItems.push({
          text: Scratch.translate("(none)"),
          value: "none",
        });
      }
      return menuItems;
    }
    setBool(args, util) {
      if (args.variable === "none") return;
      this.ensureVariableExists(args.variable);
      const prevalue = this.boolVariables[args.variable];
      this.boolVariables[args.variable] = args.bool === "true";
      const data = {
        variable: args.variable.toString(),
        bool: String(args.bool),
      };
      if (prevalue != (args.bool === "true")) {
        Scratch.vm.runtime.startHats("BV_ifBool", data, false);
      }
    }
    getBool(args, util) {
      if (args.variable === "OPEN_DELETE_UI") {
        this.createDeleteUI();
        return false;
      }
      if (args.variable === "IGNORE_CLICK" || args.variable === "none")
        return false;
      this.ensureVariableExists(args.variable);
      return !!this.boolVariables[args.variable];
    }
    ifBool(args, util) {
      if (args.variable === "IGNORE_CLICK" || args.variable === "none")
        return false;
      return (
        args.variable === util.currentBackgroundData.variable &&
        args.bool === util.currentBackgroundData.bool
      );
    }
    deleteBool(args, util) {
      if (args.variable === "none") return;
      let selectedKey = args.variable;
      delete this.boolVariables[selectedKey];
      delete this.boolVariablesinfo[selectedKey];
      this.refreshBlocks();
      return;
    }
    reversebool(args, util) {
      return !args.bool;
    }
    andbool(args, util) {
      return !!(args.bool1 && args.bool2);
    }
    orbool(args, util) {
      return !!(args.bool1 || args.bool2);
    }
    xorbool(args, util) {
      return args.bool1 !== args.bool2;
    }
  }
  Scratch.extensions.register(new Boolvariable());
})(Scratch);
