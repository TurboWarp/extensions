(function (Scratch) {
  'use strict';

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('Control Controls must run unsandboxed');
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
    const rightButtons = document.getElementsByClassName('button_outlined-button_1bS__ stage-header_stage-button_hkl9B');
    fullScreen = rightButtons[rightButtons.length - 1];
    if (!fullScreen) {
      fullScreen = document.getElementsByClassName('control-button fullscreen-button')[0] || document.getElementsByClassName('standalone-fullscreen-button')[0];
    }
    console.log(fullScreen);
    greenFlag = document.getElementsByClassName('green-flag_green-flag_1kiAo')[0];
    if (!greenFlag) {
      const leftButtons = document.getElementsByClassName('sc-controls-bar')[0].children[0].children;
      for (let i = 0; i < leftButtons.length; i++) {
        if (leftButtons[i].src === "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2016.63%2017.5%22%3E%3Cpath%20d%3D%22M.75%202a6.44%206.44%200%20017.69%200h0a6.44%206.44%200%20007.69%200v10.4a6.44%206.44%200%2001-7.69%200h0a6.44%206.44%200%2000-7.69%200%22%20fill%3D%22%234cbf56%22%20stroke%3D%22%2345993d%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%3Cpath%20stroke-width%3D%221.5%22%20fill%3D%22%234cbf56%22%20stroke%3D%22%2345993d%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20d%3D%22M.75%2016.75v-16%22%2F%3E%3C%2Fsvg%3E") {
          greenFlag = leftButtons[i];
        } else if (leftButtons[i].src === "data:image/svg+xml,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%204.2333332%204.2333335%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22%23ffae00%22%3E%3Cpath%20d%3D%22M.389.19239126h1.2631972v3.8485508H.389zM2.5810001.19239126h1.2631972v3.8485508H2.5810001z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E") {
          pauseButton = leftButtons[i];
        } else if (leftButtons[i].src === "data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2014%2014%22%3E%3Cpath%20fill%3D%22%23ec5959%22%20stroke%3D%22%23b84848%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-miterlimit%3D%2210%22%20d%3D%22M4.3.5h5.4l3.8%203.8v5.4l-3.8%203.8H4.3L.5%209.7V4.3z%22%2F%3E%3C%2Fsvg%3E") {
          stopButton = leftButtons[i];
        }
      }
    } else {
      pauseButton = document.getElementsByClassName('pause-btn addons-display-none-pause')[0];
      stopButton = document.getElementsByClassName('stop-all_stop-all_1Y8P9')[0];
    }
  };

  class controlcontrols {
    getInfo() {
      return {
        id: 'nkcontrols',
        name: 'Control Controls',
        color1: '#ffab19',
        color2: '#ec9c13',
        color3: '#b87d17',
        blocks: [
          {
            opcode: 'showOption',
            blockType: Scratch.BlockType.COMMAND,
            text: 'show [OPTION]',
            arguments: {
              OPTION: {
                type: Scratch.ArgumentType.STRING,
                menu: 'OPTION'
              }
            }
          },
          {
            opcode: 'hideOption',
            blockType: Scratch.BlockType.COMMAND,
            text: 'hide [OPTION]',
            arguments: {
              OPTION: {
                type: Scratch.ArgumentType.STRING,
                menu: 'OPTION'
              }
            }
          },
          '---',
          {
            opcode: 'optionShown',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[OPTION] shown?',
            arguments: {
              OPTION: {
                type: Scratch.ArgumentType.STRING,
                menu: 'OPTION'
              }
            }
          },
          '---',
          {
            opcode: 'optionExists',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[OPTION] exists?',
            arguments: {
              OPTION: {
                type: Scratch.ArgumentType.STRING,
                menu: 'OPTION'
              }
            }
          },
        ],
        menus: {
          OPTION: {
            acceptReporters: true,
            items: ['green flag', 'pause', 'stop', 'fullscreen']
          }
        }
      };
    }

    showOption(args) {
      getButtons();
      if (args.OPTION === "green flag" && greenFlag) {
        greenFlag.style.display = 'block';
      } else if (args.OPTION === "pause" && pauseButton) {
        pauseButton.style.display = 'block';
      } else if (args.OPTION === "stop" && stopButton) {
        stopButton.style.display = 'block';
      } else if (args.OPTION === "fullscreen" && fullScreen) {
        fullScreen.style.display = 'block';
      }
    }

    hideOption(args) {
      getButtons();
      if (args.OPTION === "green flag" && greenFlag) {
        greenFlag.style.display = 'none';
      } else if (args.OPTION === "pause" && pauseButton) {
        pauseButton.style.display = 'none';
      } else if (args.OPTION === "stop" && stopButton) {
        stopButton.style.display = 'none';
      } else if (args.OPTION === "fullscreen" && fullScreen) {
        fullScreen.style.display = 'none';
      }
    }

    optionShown(args) {
      getButtons();
      if (args.OPTION === "green flag" && greenFlag) {
        return !(greenFlag.style.display === 'none');
      } else if (args.OPTION === "pause" && pauseButton) {
        return !(pauseButton.style.display === 'none');
      } else if (args.OPTION === "stop" && stopButton) {
        return !(stopButton.style.display === 'none');
      } else if (args.OPTION === "fullscreen" && fullScreen) {
        return !(fullScreen.style.display === 'none');
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
