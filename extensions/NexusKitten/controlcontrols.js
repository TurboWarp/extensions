// Name: Control Controls
// ID: nkcontrols
// Description: Show and hide the project's controls.
// By: NamelessCat <https://scratch.mit.edu/users/NexusKitten/>

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("Control Controls must run unsandboxed");
  }

  var fullScreen;
  var greenFlag;
  var pauseButton;
  var stopButton;

  const getButtons = () => {
    fullScreen = undefined;
    greenFlag = undefined;
    pauseButton = undefined;
    stopButton = undefined;

    const rightButtons = document.querySelectorAll(
      '[class*="stage-header_stage-button_"]'
    );
    fullScreen = rightButtons[rightButtons.length - 1];
    if (!fullScreen) {
      fullScreen =
        document.querySelector(".fullscreen-button") ||
        document.querySelector(".standalone-fullscreen-button");
    }

    greenFlag =
      document.querySelector('[class*="green-flag_green-flag_"]') ||
      document.querySelector(".green-flag-button");
    pauseButton =
      document.querySelector(".pause-btn") ||
      document.querySelector(".pause-button");
    stopButton =
      document.querySelector('[class*="stop-all_stop-all_"]') ||
      document.querySelector(".stop-all-button");
  };

  class controlcontrols {
    constructor() {
      Scratch.vm.runtime.on("RUNTIME_DISPOSED", () => {
        getButtons();
        for (const button of [fullScreen, greenFlag, pauseButton, stopButton]) {
          if (button) {
            button.style.display = "block";
          }
        }
      });
    }
    getInfo() {
      return {
        id: "nkcontrols",
        name: "Control Controls",
        color1: "#ffab19",
        color2: "#ec9c13",
        color3: "#b87d17",
        blocks: [
          {
            opcode: "showOption",
            blockType: Scratch.BlockType.COMMAND,
            text: "show [OPTION]",
            arguments: {
              OPTION: {
                type: Scratch.ArgumentType.STRING,
                menu: "OPTION",
              },
            },
          },
          {
            opcode: "hideOption",
            blockType: Scratch.BlockType.COMMAND,
            text: "hide [OPTION]",
            arguments: {
              OPTION: {
                type: Scratch.ArgumentType.STRING,
                menu: "OPTION",
              },
            },
          },
          "---",
          {
            opcode: "optionShown",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[OPTION] shown?",
            arguments: {
              OPTION: {
                type: Scratch.ArgumentType.STRING,
                menu: "OPTION",
              },
            },
          },
          "---",
          {
            opcode: "optionExists",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[OPTION] exists?",
            arguments: {
              OPTION: {
                type: Scratch.ArgumentType.STRING,
                menu: "OPTION",
              },
            },
          },
        ],
        menus: {
          OPTION: {
            acceptReporters: true,
            items: ["green flag", "pause", "stop", "fullscreen"],
          },
        },
      };
    }

    showOption(args) {
      getButtons();
      if (args.OPTION === "green flag" && greenFlag) {
        greenFlag.style.display = "block";
      } else if (args.OPTION === "pause" && pauseButton) {
        pauseButton.style.display = "block";
      } else if (args.OPTION === "stop" && stopButton) {
        stopButton.style.display = "block";
      } else if (args.OPTION === "fullscreen" && fullScreen) {
        fullScreen.style.display = "block";
      }
    }

    hideOption(args) {
      getButtons();
      if (args.OPTION === "green flag" && greenFlag) {
        greenFlag.style.display = "none";
      } else if (args.OPTION === "pause" && pauseButton) {
        pauseButton.style.display = "none";
      } else if (args.OPTION === "stop" && stopButton) {
        stopButton.style.display = "none";
      } else if (args.OPTION === "fullscreen" && fullScreen) {
        fullScreen.style.display = "none";
      }
    }

    optionShown(args) {
      getButtons();
      if (args.OPTION === "green flag" && greenFlag) {
        return greenFlag.style.display !== "none";
      } else if (args.OPTION === "pause" && pauseButton) {
        return pauseButton.style.display !== "none";
      } else if (args.OPTION === "stop" && stopButton) {
        return stopButton.style.display !== "none";
      } else if (args.OPTION === "fullscreen" && fullScreen) {
        return fullScreen.style.display !== "none";
      }
      return false;
    }

    optionExists(args) {
      getButtons();
      if (args.OPTION === "green flag" && greenFlag) {
        return true;
      } else if (args.OPTION === "pause" && pauseButton) {
        return true;
      } else if (args.OPTION === "stop" && stopButton) {
        return true;
      } else if (args.OPTION === "fullscreen" && fullScreen) {
        return true;
      }
      return false;
    }
  }
  Scratch.extensions.register(new controlcontrols());
})(Scratch);
