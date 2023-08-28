// Name: Video
// ID: lmsVideo
// Description: Play videos from URLs.
// By: LilyMakesThings <https://scratch.mit.edu/users/LilyMakesThings/>

// Attribution is not required, but greatly appreciated.

(function (Scratch) {
  "use strict";

  const vm = Scratch.vm;
  const runtime = vm.runtime;
  const renderer = vm.renderer;
  const Cast = Scratch.Cast;

  const BitmapSkin = runtime.renderer.exports.BitmapSkin;
  class VideoSkin extends BitmapSkin {
    constructor (id, renderer, videoName, videoSrc) {
      super(id, renderer);

      /** @type {string} */
      this.videoName = videoName;

      /** @type {string} */
      this.videoSrc = videoSrc;

      this.videoElement = document.createElement('video');
      // Need to set non-zero dimensions, otherwise scratch-render thinks this is an empty image
      this.videoElement.width = 1;
      this.videoElement.height = 1;
      this.videoElement.crossOrigin = "anonymous";
      this.videoElement.onloadeddata = () => this.markVideoDirty();
      this.videoElement.src = videoSrc;
      this.videoElement.currentTime = 0;

      this.videoDirty = true;

      this.reuploadVideo();
    }

    reuploadVideo () {
      console.log('reupload');
      this.videoDirty = false;
      this.setBitmap(this.videoElement);
    }

    markVideoDirty () {
      console.log('dirty');
      this.videoDirty = true;
      this.emitWasAltered();
    }

    getTexture (scale) {
      if (this.videoDirty) {
        this.reuploadVideo();
      }
      return super.getTexture(scale);
    }

    dispose () {
      super.dispose();
      this.videoElement.pause();
    }
  }

  class Video {
    constructor() {
      /** @type {Record<string, VideoSkin>} */
      this.videos = Object.create(null);

      runtime.on("PROJECT_STOP_ALL", () => this.resetEverything());
      runtime.on("PROJECT_START", () => this.resetEverything());

      runtime.on("BEFORE_EXECUTE", () => {
        for (const skin of renderer._allSkins) {
          if (skin instanceof VideoSkin && !skin.videoElement.paused) {
            skin.markVideoDirty();
          }
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
          }
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
            items: ["current time", "duration", "volume", "width", "height"],
          },
        },
      };
    }

    resetEverything () {
      for (const {videoElement} of Object.values(this.videos)) {
        videoElement.pause();
        videoElement.currentTime = 0;
      }

      for (const target of runtime.targets) {
        const drawable = renderer._allDrawables[target.drawableID];
        if (drawable instanceof VideoSkin) {
          target.setCostume(target.currentCostume);
        }
      }
    }

    async loadVideoURL(args) {
      // Always delete the old video with the same name, if it exists.
      this.deleteVideoURL(args);

      const videoName = Cast.toString(args.NAME);
      const url = Cast.toString(args.URL);
      if (!(await Scratch.canFetch(url))) return;

      const skinId = renderer._nextSkinId++;
      const skin = new VideoSkin(skinId, renderer, videoName, url);
      renderer._allSkins[skinId] = skin;
      this.videos[videoName] = skin;
    }

    deleteVideoURL(args) {
      const videoName = Cast.toString(args.NAME);
      const videoSkin = this.videos[videoName];
      if (!videoSkin) return;

      for (const target of runtime.targets) {
        const drawable = renderer._allDrawables[target.drawableID];
        if (drawable && drawable.skin === videoSkin) {
          target.setCostume(target.currentCostume);
        }
      }

      renderer.destroySkin(videoSkin.id);
      Reflect.deleteProperty(this.videos, videoName);
    }

    getLoadedVideos() {
      return JSON.stringify(Object.keys(this.videos));
    }

    showVideo(args, util) {
      const targetName = Cast.toString(args.TARGET);
      const videoName = Cast.toString(args.NAME);
      const target = this._getTargetFromMenu(targetName, util);
      const videoSkin = this.videos[videoName];
      if (!target || !videoSkin) return;

      vm.renderer.updateDrawableSkinId(target.drawableID, videoSkin._id);
    }

    stopShowingVideo(args, util) {
      const targetName = Cast.toString(args.TARGET);
      const target = this._getTargetFromMenu(targetName, util);
      if (!target) return;

      target.setCostume(target.currentCostume);
    }

    getCurrentVideo(args, util) {
      const targetName = Cast.toString(args.TARGET);
      const target = this._getTargetFromMenu(targetName, util);
      if (!target) return;

      const drawable = renderer._allDrawables[target.drawableID];
      const skin = drawable && drawable.skin;
      return skin instanceof VideoSkin ? skin.videoName : '';
    }

    startVideo(args) {
      const videoName = Cast.toString(args.NAME);
      const duration = Cast.toNumber(args.DURATION);
      const videoSkin = this.videos[videoName];
      if (!videoSkin) return;

      videoSkin.videoElement.play();
      videoSkin.videoElement.currentTime = duration;
      videoSkin.markVideoDirty();
    }

    getAttribute(args) {
      const videoName = Cast.toString(args.NAME);
      const videoSkin = this.videos[videoName];
      if (!videoSkin) return 0;

      switch (args.ATTRIBUTE) {
        case "current time":
          return videoSkin.videoElement.currentTime;
        case "duration":
          return videoSkin.videoElement.duration;
        case "volume":
          return videoSkin.videoElement.volume * 100;
        case "width":
          return videoSkin._textureSize[0];
        case "height":
          return videoSkin._textureSize[1];
        default:
          return 0;
      }
    }

    pause(args) {
      const videoName = Cast.toString(args.NAME);
      const videoSkin = this.videos[videoName];
      if (!videoSkin) return;

      videoSkin.videoElement.pause();
      videoSkin.markVideoDirty();
    }

    resume(args) {
      const videoName = Cast.toString(args.NAME);
      const videoSkin = this.videos[videoName];
      if (!videoSkin) return;

      videoSkin.videoElement.play();
      videoSkin.markVideoDirty();
    }

    getState(args) {
      const videoName = Cast.toString(args.NAME);
      const videoSkin = this.videos[videoName];
      if (!videoSkin) return args.STATE === "paused";

      return args.STATE == "playing"
        ? !videoSkin.videoElement.paused
        : videoSkin.videoElement.paused;
    }

    setVolume(args) {
      const videoName = Cast.toString(args.NAME);
      const value = Cast.toNumber(args.VALUE);
      const videoSkin = this.videos[videoName];
      if (!videoSkin) return;

      videoSkin.videoElement.volume = value / 100;
    }

    /** @returns {VM.Target|undefined} */
    _getTargetFromMenu(targetName, util) {
      if (targetName === "_myself_") return util.target;
      if (targetName === "_stage_") return runtime.getTargetForStage();
      return Scratch.vm.runtime.getSpriteTargetByName(targetName);
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
