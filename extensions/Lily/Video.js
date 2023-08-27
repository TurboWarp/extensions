// Name: Video
// ID: lmsVideo
// Description: Play videos from URLs.
// By: LilyMakesThings <https://scratch.mit.edu/users/LilyMakesThings/>

// Attribution is not required, but greatly appreciated.

(function (Scratch) {
  "use strict";

  const vm = Scratch.vm;
  const runtime = vm.runtime;
  const Cast = Scratch.Cast;

  class Video {
    constructor() {
      this.videos = [];
      this.targets = [];

      runtime.on("PROJECT_STOP_ALL", () => {
        for (const name of Object.keys(this.videos)) {
          const video = this.videos[name].video;
          video.pause();
          video.currentTime = 0;
        }

        for (const id of Object.keys(this.targets)) {
          const target = this.targets[id].target;
          target.updateAllDrawableProperties();
        }

        this.targets = [];
      });

      runtime.on("PROJECT_START", () => {
        for (const name of Object.keys(this.videos)) {
          const video = this.videos[name].video;
          video.pause();
          video.currentTime = 0;
        }

        for (const id of Object.keys(this.targets)) {
          const target = this.targets[id].target;
          target.updateAllDrawableProperties();
        }

        this.targets = [];
      });

      runtime.on("BEFORE_EXECUTE", () => {
        for (const name of Object.keys(this.videos)) {
          const videoObject = this.videos[name];

          const video = videoObject.video;
          const videoVolume = videoObject.volume;
          const skin = videoObject.skin;

          const projectVolume = runtime.audioEngine.inputNode.gain.value;
          video.volume = videoVolume * projectVolume;

          vm.renderer.updateBitmapSkin(skin, video, 1);
        }

        for (const id of Object.keys(this.targets)) {
          const target = this.targets[id].target;
          const drawableID = target.drawableID;

          const drawable = runtime.renderer._allDrawables[drawableID];
          // This was only a problem when targets weren't reset, I don't
          // expect it to happen much now but just in case..
          if (!drawable) continue;
          const skin = this.videos[this.targets[id].videoName].skin;
          drawable.skin = vm.renderer._allSkins[skin];
        }
      });
    }
    getInfo() {
      return {
        id: "lmsVideo",
        color1: "#557882",
        name: "Video",
        blocks: [
          {
            opcode: "loadVideoURL",
            blockType: Scratch.BlockType.COMMAND,
            text: "load video from URL [URL] as [NAME]",
            arguments: {
              URL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "https://extensions.turbowarp.org/dango.mp4",
              },
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "my video",
              },
            },
          },
          {
            opcode: "deleteVideoURL",
            blockType: Scratch.BlockType.COMMAND,
            text: "delete video [NAME]",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "my video",
              },
            },
          },
          {
            opcode: "getLoadedVideos",
            blockType: Scratch.BlockType.REPORTER,
            text: "loaded videos",
          },
          "---",
          {
            opcode: "showVideo",
            blockType: Scratch.BlockType.COMMAND,
            text: "show video [NAME] on [TARGET]",
            arguments: {
              TARGET: {
                type: Scratch.ArgumentType.STRING,
                menu: "targets",
              },
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "my video",
              },
            },
          },
          {
            opcode: "stopShowingVideo",
            blockType: Scratch.BlockType.COMMAND,
            text: "stop showing video on [TARGET]",
            arguments: {
              TARGET: {
                type: Scratch.ArgumentType.STRING,
                menu: "targets",
              },
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "my video",
              },
            },
          },
          {
            opcode: "getCurrentVideo",
            blockType: Scratch.BlockType.REPORTER,
            text: "current video on [TARGET]",
            arguments: {
              TARGET: {
                type: Scratch.ArgumentType.STRING,
                menu: "targets",
              },
            },
          },
          "---",
          {
            opcode: "startVideo",
            blockType: Scratch.BlockType.COMMAND,
            text: "start video [NAME] at [DURATION] seconds",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "my video",
              },
              DURATION: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
            },
          },
          {
            opcode: "getAttribute",
            blockType: Scratch.BlockType.REPORTER,
            text: "[ATTRIBUTE] of video [NAME]",
            arguments: {
              ATTRIBUTE: {
                type: Scratch.ArgumentType.STRING,
                menu: "attribute",
              },
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "my video",
              },
            },
          },
          "---",
          {
            opcode: "pause",
            blockType: Scratch.BlockType.COMMAND,
            text: "pause video [NAME]",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "my video",
              },
            },
          },
          {
            opcode: "resume",
            blockType: Scratch.BlockType.COMMAND,
            text: "resume video [NAME]",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "my video",
              },
            },
          },
          {
            opcode: "getState",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "video [NAME] is [STATE]?",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "my video",
              },
              STATE: {
                type: Scratch.ArgumentType.STRING,
                menu: "state",
              },
            },
          },
          "---",
          {
            opcode: "setVolume",
            blockType: Scratch.BlockType.COMMAND,
            text: "set volume of video [NAME] to [VALUE]",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "my video",
              },
              VALUE: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100,
              },
            },
          },
          {
            opcode: "getVolume",
            blockType: Scratch.BlockType.REPORTER,
            text: "volume of video [NAME]",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "my video",
              },
            },
          },
        ],
        menus: {
          targets: {
            acceptReporters: true,
            items: "_getTargets",
          },
          state: {
            acceptReporters: true,
            items: ["playing", "paused"],
          },
          attribute: {
            acceptReporters: false,
            items: ["current time", "duration", "width", "height"],
          },
        },
      };
    }

    async loadVideoURL(args) {
      const videoName = Cast.toString(args.NAME);
      const url = Cast.toString(args.URL);
      if (!(await Scratch.canFetch(url))) return;

      this.videos[videoName] = {
        video: document.createElement("video"),
        volume: 1,
        skin: 0,
      };

      const videoObject = this.videos[videoName];
      const video = videoObject.video;

      video.width = 1;
      video.height = 1;
      video.crossOrigin = "anonymous";

      video.src = url;
      video.currentTime = 0;

      videoObject.skin = vm.renderer.createBitmapSkin(video);
    }

    deleteVideoURL(args) {
      const videoName = Cast.toString(args.NAME);
      if (!this.videos[videoName]) return;

      for (const id of Object.keys(this.targets)) {
        if (this.targets[id].videoName === videoName) {
          this.targets[id].target.updateAllDrawableProperties();
          Reflect.deleteProperty(this.targets, id);
        }
      }

      this.videos[videoName].video.pause();
      Reflect.deleteProperty(this.videos, videoName);
    }

    getLoadedVideos() {
      return JSON.stringify(Object.keys(this.videos));
    }

    showVideo(args, util) {
      const targetName = Cast.toString(args.TARGET);
      const videoName = Cast.toString(args.NAME);
      const target = this._getTargetFromMenu(targetName, util);
      if (!target || !this.videos[videoName]) return;

      const targetId = target.id;
      this.targets[targetId] = {
        target: target,
        videoName: videoName,
      };
    }

    stopShowingVideo(args, util) {
      const targetName = Cast.toString(args.TARGET);
      const target = this._getTargetFromMenu(targetName, util);
      if (!target) return;

      const targetId = target.id;
      Reflect.deleteProperty(this.targets, targetId);

      target.updateAllDrawableProperties();
    }

    getCurrentVideo(args, util) {
      const targetName = Cast.toString(args.TARGET);
      const target = this._getTargetFromMenu(targetName, util);
      if (!target) return;

      const targetId = target.id;
      return this.targets[targetId] ? this.targets[targetId].videoName : "";
    }

    startVideo(args) {
      const videoName = Cast.toString(args.NAME);
      const duration = Cast.toNumber(args.DURATION);
      const videoObject = this.videos[videoName];
      if (!videoObject) return;

      videoObject.video.play();
      videoObject.video.currentTime = duration;
    }

    getAttribute(args) {
      const videoName = Cast.toString(args.NAME);
      const videoObject = this.videos[videoName];
      if (!videoObject) return 0;

      const skinId = videoObject.skin;
      const skin = vm.renderer._allSkins[skinId];

      switch (args.ATTRIBUTE) {
        case "current time":
          return videoObject.video.currentTime;
        case "duration":
          return videoObject.video.duration;
        case "width":
          return skin._textureSize[0];
        case "height":
          return skin._textureSize[1];
        default:
          return 0;
      }
    }

    pause(args) {
      const videoName = Cast.toString(args.NAME);
      const videoObject = this.videos[videoName];
      if (!videoObject) return;

      videoObject.video.pause();
    }

    resume(args) {
      const videoName = Cast.toString(args.NAME);
      const videoObject = this.videos[videoName];
      if (!videoObject) return;

      videoObject.video.play();
    }

    getState(args) {
      const videoName = Cast.toString(args.NAME);
      const videoObject = this.videos[videoName];
      if (!videoObject) return args.STATE === "paused";

      return args.STATE == "playing"
        ? !videoObject.video.paused
        : videoObject.video.paused;
    }

    setVolume(args) {
      const videoName = Cast.toString(args.NAME);
      const value = Cast.toNumber(args.VALUE);
      const videoObject = this.videos[videoName];
      if (!videoObject) return;

      videoObject.volume = value / 100;
    }

    getVolume(args) {
      const videoName = Cast.toString(args.NAME);
      const videoObject = this.videos[videoName];
      if (!videoObject) return 0;

      return videoObject.volume * 100;
    }

    _getTargetFromMenu(targetName, util) {
      let target = Scratch.vm.runtime.getSpriteTargetByName(targetName);
      if (targetName === "_myself_") target = util.target;
      if (targetName === "_stage_") target = runtime.getTargetForStage();
      return target;
    }

    _getTargets() {
      let spriteNames = [
        { text: "myself", value: "_myself_" },
        { text: "Stage", value: "_stage_" },
      ];
      const targets = Scratch.vm.runtime.targets
        .filter((target) => target.isOriginal && !target.isStage)
        .map((target) => target.getName());
      spriteNames = spriteNames.concat(targets);
      return spriteNames;
    }
  }
  Scratch.extensions.register(new Video());
})(Scratch);
