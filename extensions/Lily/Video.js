// Name: Video
// ID: lmsVideo
// Description: Play videos from URLs.
// By: LilyMakesThings <https://scratch.mit.edu/users/LilyMakesThings/>
// By: SharkPool
// License: MIT AND LGPL-3.0

// Attribution is not required, but greatly appreciated.

(function (Scratch) {
  "use strict";

  const vm = Scratch.vm;
  const runtime = vm.runtime;
  const renderer = vm.renderer;
  const Cast = Scratch.Cast;

  // In some versions of Chrome, it seems that trying to render a <video> returns pure black
  // if it's not in the DOM in a place the browser thinks is visible. That means we can't
  // use display: none.
  // See https://github.com/TurboWarp/scratch-render/issues/12
  const elementContainer = document.createElement("div");
  elementContainer.className = "tw-extensions-lily-videos-container";
  elementContainer.style.pointerEvents = "none";
  elementContainer.style.position = "absolute";
  elementContainer.style.opacity = "0";
  elementContainer.style.width = "0";
  elementContainer.style.height = "0";
  elementContainer.style.visibility = "hidden";
  elementContainer.ariaHidden = "true";
  document.body.appendChild(elementContainer);

  const BitmapSkin = runtime.renderer.exports.BitmapSkin;
  class VideoSkin extends BitmapSkin {
    constructor(id, renderer, videoName, videoSrc) {
      super(id, renderer);

      /** @type {string} */
      this.videoName = videoName;

      /** @type {string} */
      this.videoSrc = videoSrc;

      this.videoError = false;

      this.readyPromise = new Promise((resolve) => {
        this.readyCallback = resolve;
      });

      this.videoElement = document.createElement("video");
      // Need to set non-zero dimensions, otherwise scratch-render thinks this is an empty image
      this.videoElement.width = 1;
      this.videoElement.height = 1;
      this.videoElement.crossOrigin = "anonymous";
      this.videoElement.onloadeddata = () => {
        // First frame loaded
        this.readyCallback();
        this.markVideoDirty();
      };
      this.videoElement.onerror = () => {
        this.videoError = true;
        this.readyCallback();
        this.markVideoDirty();
      };
      this.videoElement.src = videoSrc;
      this.videoElement.currentTime = 0;

      // <video> must be in the DOM for it to render (see comments above)
      elementContainer.appendChild(this.videoElement);
      this.videoElement.tabIndex = -1;

      this.videoDirty = true;

      this.reuploadVideo();
    }

    reuploadVideo() {
      this.videoDirty = false;
      if (this.videoError) {
        // Draw an image that looks similar to Scratch's normal costume loading errors
        const canvas = document.createElement("canvas");
        canvas.width = this.videoElement.videoWidth || 128;
        canvas.height = this.videoElement.videoHeight || 128;
        const ctx = canvas.getContext("2d");

        if (ctx) {
          ctx.fillStyle = "#cccccc";
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          const fontSize = Math.min(canvas.width, canvas.height);
          ctx.fillStyle = "#000000";
          ctx.font = `${fontSize}px serif`;
          ctx.textBaseline = "middle";
          ctx.textAlign = "center";
          ctx.fillText("?", canvas.width / 2, canvas.height / 2);
        } else {
          // guess we can't draw the error then
        }

        this.setBitmap(canvas);
      } else {
        this.setBitmap(this.videoElement);
      }
    }

    markVideoDirty() {
      this.videoDirty = true;
      this.emitWasAltered();
    }

    get size() {
      if (this.videoDirty) {
        this.reuploadVideo();
      }
      return super.size;
    }

    getTexture(scale) {
      if (this.videoDirty) {
        this.reuploadVideo();
      }
      return super.getTexture(scale);
    }

    dispose() {
      super.dispose();
      this.videoElement.pause();
      this.videoElement.remove();
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

      runtime.on("RUNTIME_PAUSED", () => {
        for (const skin of renderer._allSkins) {
          if (skin instanceof VideoSkin) {
            skin.videoElement.pause();
            skin.markVideoDirty();
          }
        }
      });

      runtime.on("RUNTIME_UNPAUSED", () => {
        for (const skin of renderer._allSkins) {
          if (skin instanceof VideoSkin) {
            skin.videoElement.play();
            skin.markVideoDirty();
          }
        }
      });
    }

    getInfo() {
      return {
        id: "lmsVideo",
        color1: "#557882",
        name: Scratch.translate("Video"),
        blocks: [
          {
            blockType: Scratch.BlockType.XML,
            xml: "<sep gap='6'/><label text='Only direct downloads will work, use'/><sep gap='-12'/><label text='the Iframe extension for YouTube.'/><sep gap='24'/>",
          },
          {
            opcode: "loadVideoURL",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("load video from URL [URL] as [NAME]"),
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
            text: Scratch.translate("delete video [NAME]"),
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
            text: Scratch.translate("loaded videos"),
          },
          "---",
          {
            opcode: "showVideo",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("show video [NAME] on [TARGET]"),
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
            text: Scratch.translate("stop showing video on [TARGET]"),
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
            text: Scratch.translate("current video on [TARGET]"),
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
            text: Scratch.translate("start video [NAME] at [DURATION] seconds"),
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
            opcode: "startVideoAndWait",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("start video [NAME] at [DURATION] seconds and wait until done"),
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
            text: Scratch.translate("[ATTRIBUTE] of video [NAME]"),
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
          {
            opcode: "getFrame",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate(
              "screenshot of video [NAME] at current time"
            ),
            arguments: {
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
            text: Scratch.translate("pause video [NAME]"),
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
            text: Scratch.translate("resume video [NAME]"),
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
            text: Scratch.translate("video [NAME] is [STATE]?"),
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
            text: Scratch.translate("set volume of video [NAME] to [VALUE]"),
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
            opcode: "setPlaybackRate",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "set playback rate of video [NAME] to [RATE]"
            ),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "my video",
              },
              RATE: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "2",
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
            items: [
              {
                text: Scratch.translate("playing"),
                value: "playing",
              },
              {
                text: Scratch.translate("paused"),
                value: "paused",
              },
            ],
          },
          attribute: {
            acceptReporters: false,
            items: [
              {
                text: Scratch.translate("current time"),
                value: "current time",
              },
              {
                text: Scratch.translate("duration"),
                value: "duration",
              },
              {
                text: Scratch.translate("volume"),
                value: "volume",
              },
              {
                text: Scratch.translate("width"),
                value: "width",
              },
              {
                text: Scratch.translate("height"),
                value: "height",
              },
              {
                text: Scratch.translate("playback rate"),
                value: "playback rate",
              },
            ],
          },
        },
      };
    }

    resetEverything() {
      for (const { videoElement } of Object.values(this.videos)) {
        videoElement.pause();
        videoElement.currentTime = 0;
      }

      for (const target of runtime.targets) {
        const drawable = renderer._allDrawables[target.drawableID];
        if (drawable.skin instanceof VideoSkin) {
          target.setCostume(target.currentCostume);
        }
      }
    }

    async loadVideoURL(args) {
      // Always delete the old video with the same name, if it exists.
      this.deleteVideoURL(args);

      const videoName = Cast.toString(args.NAME);
      const url = Cast.toString(args.URL);

      if (
        url.startsWith("https://www.youtube.com/") ||
        url.startsWith("https://youtube.com/") ||
        url.startsWith("https://youtu.be/")
      ) {
        alert(
          [
            "The video extension does not support YouTube links.",
            "You can use the Iframe extension instead.",
          ].join("\n\n")
        );
        return;
      }

      if (!(await Scratch.canFetch(url))) return;

      const skinId = renderer._nextSkinId++;
      const skin = new VideoSkin(skinId, renderer, videoName, url);
      renderer._allSkins[skinId] = skin;
      this.videos[videoName] = skin;

      return skin.readyPromise;
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
      return skin instanceof VideoSkin ? skin.videoName : "";
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
	
	startVideoAndWait(args, util) {
		const videoName = Cast.toString(args.NAME);
		const duration = Cast.toNumber(args.DURATION);
		const videoSkin = this.videos[videoName];
		if (!videoSkin) return;
		
		if (!util.stackFrame.hasPlayed) {
			videoSkin.videoElement.play();
			videoSkin.videoElement.currentTime = duration;
			videoSkin.markVideoDirty();
			
			util.stackFrame.hasPlayed = true;
		}
		
		if(!videoSkin.videoElement.ended) {
			util.yield()
		}
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
          return videoSkin.size[0];
        case "height":
          return videoSkin.size[1];
        case "playback rate":
          return videoSkin.videoElement.playbackRate;
        default:
          return 0;
      }
    }

    getFrame(args) {
      const videoName = Cast.toString(args.NAME);
      const videoSkin = this.videos[videoName];
      if (!videoSkin) return "";

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        console.warn("2D rendering context not available");
        return "";
      }

      const videoElement = videoSkin.videoElement;
      if (videoElement.videoWidth === 0 || videoElement.videoHeight === 0) {
        return "";
      }

      canvas.width = videoElement.videoWidth;
      canvas.height = videoElement.videoHeight;
      ctx.drawImage(videoElement, 0, 0);
      return canvas.toDataURL();
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
      const videoSkin = this.videos[videoName];
      if (!videoSkin) return;

      const value = Cast.toNumber(args.VALUE);
      videoSkin.videoElement.volume = Math.min(1, Math.max(0, value / 100));
    }

    setPlaybackRate(args) {
      const videoName = Cast.toString(args.NAME);
      const videoSkin = this.videos[videoName];
      if (!videoSkin) return;

      try {
        const value = Cast.toNumber(args.RATE);
        // Supposedly negative values will work in Safari but people probably shouldn't rely
        // on that since others don't.
        videoSkin.videoElement.playbackRate = Math.max(0, value);
      } catch (e) {
        console.warn(e);
      }
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
