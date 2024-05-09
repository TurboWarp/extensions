// Name: Close Control
// ID: xmerclosecontrol
// Description: Ask before closing the tab.
// By: XmerOriginals

(function (Scratch) {
  "use strict";

  let enabled = false;

  window.addEventListener("beforeunload", (e) => {
    if (enabled) {
      e.preventDefault();
    }
  });

  class CloseControl {
    getInfo() {
      return {
        id: "xmerclosecontrol",
        name: Scratch.translate("Close Control"),
        blocks: [
          {
            opcode: "setControl",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set ask before closing tab to [OPTION]"),
            arguments: {
              OPTION: {
                type: Scratch.ArgumentType.STRING,
                menu: "option",
              },
            },
          },
          {
            opcode: "getControl",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is close control enabled?"),
          },
        ],
        menus: {
          option: {
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate("enabled"),
                value: "true",
              },
              {
                text: Scratch.translate("disabled"),
                value: "false",
              },
            ],
          },
        },
      };
    }

    setControl({ OPTION }) {
      enabled = Scratch.Cast.toBoolean(OPTION);
    }

    getControl() {
      return enabled;
    }
  }

  Scratch.extensions.register(new CloseControl());
})(Scratch);
