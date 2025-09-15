// Name: MediaSession
// ID: MediaSessApi
// Description: The SC block form of the Media Session API , allows SC works to basically use the browser Media Session ability.
// By: jexjws
// License: MIT

(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) {
    throw new Error(
      "This extension must run unsandboxed./此拓展需要以非沙盒模式运行。"
    );
  }
  class MyExtension {
    /**
     * Determine if the mediaSession is available.
     * @returns {boolean}
     */
    canIUse() {
      return "mediaSession" in navigator;
    }
    mediaSession_reset() {
      if (!this.canIUse()) {
        return;
      }
      navigator.mediaSession.metadata = new MediaMetadata();
      navigator.mediaSession.setPositionState(null);
    }

    actived_actionhandler = [];
    actions = [
      "previoustrack",
      "nexttrack",
      "stop",
      "seekbackward",
      "seekforward",
      "play",
      "pause",
    ];
    /**
     * mediaSession ActionHandler Maintainer
     * @param {String} mode What to do with the event
     * @param {String} action Which event to act on
     * @returns {any}
     */
    actionHandlerMan(mode, action = "") {
      if (!this.canIUse()) {
        return;
      }
      action = String(action);
      //console.log("actionHandlerMan",mode,action)
      const setActionHandler = (...args) =>
        navigator.mediaSession.setActionHandler(...args);
      try {
        switch (mode) {
          case "reset":
            this.actions.forEach((item) => setActionHandler(item, null));
            this.actived_actionhandler = [];
            break;
          case "on":
            if (!this.actived_actionhandler.includes(action)) {
              setActionHandler(action, () =>
                Scratch.vm.runtime.startHats(
                  "40codeMediaSessApi_v1_actionhandler",
                  { action: action }
                )
              );
              this.actived_actionhandler.push(action);
            }
            break;
          case "off":
            if (this.actived_actionhandler.includes(action)) {
              setActionHandler(action, null);
              this.actived_actionhandler = this.actived_actionhandler.filter(
                (item) => !(item === action)
              );
            }
            break;
          default:
            break;
        }
      } catch (error) {
        console.error(error);
      }
    }

    constructor(runtime) {
      this.mediaSession_reset();
      this.actionHandlerMan("reset");
    }

    getInfo() {
      return {
        id: "40codeMediaSessApi",
        name: "Media Session",
        color1: "#9334e6",
        blocks: [
          {
            opcode: "v1_canIUse",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate({
              id: "40code.MediaSessApi.v1.canIUse",
              default: "Is mediaSession available",
              description: "Check if the mediaSession API is available",
            }),
          },
          {
            opcode: "v1_set",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate({
              id: "40code.MediaSessApi.v1.set",
              default: "Set the current playing media [key] to [value]",
              description: "Set the metadata of the currently playing media",
            }),
            arguments: {
              key: {
                type: Scratch.ArgumentType.STRING,
                menu: "metadatas",
              },
              value: {
                type: Scratch.ArgumentType.STRING,
              },
            },
          },
          {
            opcode: "v1_set_artwork",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate({
              id: "40code.MediaSessApi.v1.set_artwork",
              default:
                "Set the current playing media cover image link to [value]",
              description:
                "Set the cover image link of the currently playing media",
            }),
            arguments: {
              value: {
                type: Scratch.ArgumentType.STRING,
              },
            },
          },
          {
            opcode: "v1_set_position",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate({
              id: "40code.MediaSessApi.v1.set_position",
              default:
                "Set the current playback progress: total duration:[duration]seconds, current playback to: [position]seconds, playback rate: [playbackRate] times",
              description:
                "Set the playback position and rate of the currently playing media",
            }),
            arguments: {
              duration: {
                type: Scratch.ArgumentType.NUMBER,
              },
              position: {
                type: Scratch.ArgumentType.NUMBER,
              },
              playbackRate: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
            },
          },
          {
            opcode: "v1_unset",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate({
              id: "40code.MediaSessApi.v1.unset",
              default: "Clear all Set",
              description:
                "Clear all metadata and settings of the currently playing media",
            }),
          },
          "---",
          {
            opcode: "v1_set_actionhandler_status",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate({
              id: "40code.MediaSessApi.v1.set_actionhandler_status",
              default: "Enabled mediaSession event receiving hat block",
              description:
                "Check the status of enabled mediaSession event receiving hat blocks",
            }),
          },
          {
            opcode: "v1_set_actionhandler",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate({
              id: "40code.MediaSessApi.v1.set_actionhandler",
              default:
                "[on_off] mediaSession [action] event receiving hat block",
              description:
                "Enable or disable mediaSession event receiving hat blocks",
            }),
            arguments: {
              action: {
                type: Scratch.ArgumentType.STRING,
                menu: "actions",
              },
              on_off: {
                type: Scratch.ArgumentType.STRING,
                menu: "on_off",
              },
            },
          },
          {
            opcode: "v1_set_actionhandler_reset",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate({
              id: "40code.MediaSessApi.v1.set_actionhandler_reset",
              default: "Disable all mediaSession event receiving hat blocks",
              description:
                "Disable all mediaSession event receiving hat blocks",
            }),
          },
          {
            blockType: Scratch.BlockType.EVENT,
            opcode: "v1_actionhandler",
            text: Scratch.translate({
              id: "40code.MediaSessApi.v1.actionhandler",
              default: "When the user control event [action] occurs",
              description: "Triggered when a user control event occurs",
            }),
            isEdgeActivated: false,
            arguments: {
              action: {
                type: Scratch.ArgumentType.STRING,
                menu: "actions",
              },
            },
          },
          "---",
          {
            opcode: "v1_compatibility",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate({
              id: "40code.MediaSessApi.v1.compatibility",
              default:
                "Compatibility: Use the <audio> element that plays silent audio to display the Media Session: [on_off]",
              description:
                "Enable or disable compatibility mode using a silent <audio> element",
            }),
            arguments: {
              on_off: {
                type: Scratch.ArgumentType.STRING,
                menu: "on_off",
              },
            },
          },
        ],
        menus: {
          metadatas: {
            acceptReporters: false,
            items: [
              {
                text: Scratch.translate({
                  id: "40code.MediaSessApi.v1.set.menus.title",
                  default: "Title",
                  description: "Set the title of the currently playing media",
                }),
                value: "title",
              },
              {
                text: Scratch.translate({
                  id: "40code.MediaSessApi.v1.set.menus.artist",
                  default: "Artist name",
                  description:
                    "Set the artist name of the currently playing media",
                }),
                value: "artist",
              },
              {
                text: Scratch.translate({
                  id: "40code.MediaSessApi.v1.set.menus.album",
                  default: "Album name",
                  description:
                    "Set the album name of the currently playing media",
                }),
                value: "album",
              },
            ],
          },
          actions: {
            acceptReporters: false,
            items: (() =>
              this.actions.map((item) => ({
                text: Scratch.translate({
                  id: String(
                    "40code.MediaSessApi.v1.actionhandler.menus." + item
                  ),
                  default: String(item),
                  description: `User control event for ${item}`,
                }),
                value: String(item),
              })))(),
          },
          on_off: {
            acceptReporters: false,
            items: [
              {
                text: Scratch.translate({
                  id: "40code.MediaSessApi.v1.set_actionhandler.on",
                  default: "Enable",
                  description: "Enable the feature",
                }),
                value: "on",
              },
              {
                text: Scratch.translate({
                  id: "40code.MediaSessApi.v1.set_actionhandler.off",
                  default: "Disable",
                  description: "Disable the feature",
                }),
                value: "off",
              },
            ],
          },
        },
      };
    }

    v1_canIUse() {
      return this.canIUse();
    }
    v1_set(args) {
      if (!this.canIUse()) {
        return;
      }
      navigator.mediaSession.metadata[args.key] = args.value;
    }
    v1_set_artwork(args) {
      if (!this.canIUse()) {
        return;
      }
      navigator.mediaSession.metadata["artwork"] = [{ src: args.value }];
    }
    v1_set_position(args) {
      if (!this.canIUse()) {
        return;
      }
      try {
        navigator.mediaSession.setPositionState({
          duration: args.duration,
          playbackRate: args.playbackRate,
          position: args.position,
        });
      } catch (error) {
        console.error(error);
        return String(error);
      }
    }
    v1_unset() {
      this.mediaSession_reset();
    }
    v1_set_actionhandler_status() {
      return JSON.stringify(this.actived_actionhandler);
    }
    v1_set_actionhandler(args) {
      this.actionHandlerMan(args.on_off, args.action);
    }
    v1_set_actionhandler_reset() {
      this.actionHandlerMan("reset");
    }
    compat_audioElement = null;
    v1_compatibility(args) {
      switch (args.on_off) {
        case "on":
          if (this.compat_audioElement != null) {
            break;
          }
          this.compat_audioElement = document.createElement("audio");
          this.compat_audioElement.src =
            "https://extensions.turbowarp.org/10sec_silent_audio.opus";
          this.compat_audioElement.loop = true;
          this.compat_audioElement.autoplay = true;
          document.body.appendChild(this.compat_audioElement);
          break;
        case "off":
          if (this.compat_audioElement == null) {
            break;
          }
          this.compat_audioElement.pause();
          document.body.removeChild(this.compat_audioElement);
          this.compat_audioElement = null;
          break;
        default:
          break;
      }
    }
  }
  Scratch.extensions.register(new MyExtension());
})(Scratch);
