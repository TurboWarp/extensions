(function (Scratch) {
  'use strict';

  const vm = Scratch.vm;
  const runtime = vm.runtime;
  const Cast = Scratch.Cast;

  class Video {
    constructor() {
      this.videos = [];
      this.targets = [];

      runtime.on('PROJECT_STOP_ALL', () => {
        for (const name of Object.keys(this.videos)) {
          const video = this.videos[name];
          video.pause();
          video.currentTime = 0;
        }

        this.targets = [];
      });

      runtime.on('PROJECT_START', () => {
        for (const name of Object.keys(this.videos)) {
          const video = this.videos[name].video;
          video.pause();
          video.currentTime = 0;
        }

        this.targets = [];
      });

      runtime.on('BEFORE_EXECUTE', () => {
        for (const name of Object.keys(this.videos)) {
          const video = this.videos[name].video;
          const videoVolume = this.videos[name].volume;
          const projectVolume = runtime.audioEngine.inputNode.gain.value;
          video.volume = videoVolume * projectVolume;
        }

        for (const id of Object.keys(this.targets)) {
          const target = this.targets[id].target;
          const drawableID = target.drawableID;

          const drawable = runtime.renderer._allDrawables[drawableID];
          // This was only a problem when targets weren't reset, I don't
          // expect it to happen much now but just in case..
          if (!drawable) return;
          const skinId = drawable.skin._id;
          const video = this.videos[this.targets[id].videoName].video;

          vm.renderer.updateBitmapSkin(skinId, video, 1);
        }
      });
    }
    getInfo() {
      return {
        id: 'lmsVideo',
        color1: '#557882',
        name: 'Video',
        blocks: [
          {
            opcode: 'loadVideoURL',
            blockType: Scratch.BlockType.COMMAND,
            text: 'load video from URL [URL] as [NAME]',
            arguments: {
              URL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ''
              },
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'my video'
              }
            }
          },
          {
            opcode: 'deleteVideoURL',
            blockType: Scratch.BlockType.COMMAND,
            text: 'delete video [NAME]',
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'my video'
              }
            }
          },
          {
            opcode: 'getLoadedVideos',
            blockType: Scratch.BlockType.REPORTER,
            text: 'loaded videos'
          },
          '---',
          {
            opcode: 'showVideo',
            blockType: Scratch.BlockType.COMMAND,
            text: 'show video [NAME] on [TARGET]',
            arguments: {
              TARGET: {
                type: Scratch.ArgumentType.STRING,
                menu: 'targets'
              },
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'my video'
              },
            }
          },
          {
            opcode: 'stopShowingVideo',
            blockType: Scratch.BlockType.COMMAND,
            text: 'stop showing video on [TARGET]',
            arguments: {
              TARGET: {
                type: Scratch.ArgumentType.STRING,
                menu: 'targets'
              },
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'my video'
              },
            }
          },
          {
            opcode: 'getCurrentVideo',
            blockType: Scratch.BlockType.REPORTER,
            text: 'current video on [TARGET]',
            arguments: {
              TARGET: {
                type: Scratch.ArgumentType.STRING,
                menu: 'targets'
              }
            }
          },
          '---',
          {
            opcode: 'startVideo',
            blockType: Scratch.BlockType.COMMAND,
            text: 'start video [NAME] at [DURATION] seconds',
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'my video'
              },
              DURATION: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              }
            }
          },
          {
            opcode: 'getCurrentTime',
            blockType: Scratch.BlockType.REPORTER,
            text: 'current time of video [NAME]',
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'my video'
              }
            }
          },
          '---',
          {
            opcode: 'pause',
            blockType: Scratch.BlockType.COMMAND,
            text: 'pause video [NAME]',
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'my video'
              }
            }
          },
          {
            opcode: 'resume',
            blockType: Scratch.BlockType.COMMAND,
            text: 'resume video [NAME]',
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'my video'
              }
            }
          },
          {
            opcode: 'getState',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'video [NAME] is [STATE]?',
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'my video'
              },
              STATE: {
                type: Scratch.ArgumentType.STRING,
                menu: 'state'
              }
            }
          },
          '---',
          {
            opcode: 'setVolume',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set volume of video [NAME] to [VALUE]',
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'my video'
              },
              VALUE: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100
              }
            }
          },
          {
            opcode: 'getVolume',
            blockType: Scratch.BlockType.REPORTER,
            text: 'volume of video [NAME]',
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'my video'
              }
            }
          }
        ],
        menus: {
          targets: {
            acceptReporters: true,
            items: '_getTargets'
          },
          state: {
            acceptReporters: true,
            items: ['playing', 'paused']
          }
        }
      };
    }

    async loadVideoURL(args) {
      const videoName = Cast.toString(args.NAME);
      const url = Cast.toString(args.URL);
      if (!await Scratch.canFetch(url)) return;

      this.videos[videoName] = {
        video: document.createElement('video'),
        volume: 1
      };

      const video = this.videos[videoName].video;
      video.width = 480;
      video.height = 360;
      video.crossOrigin = 'anonymous';

      // To-do : Some urls can't be loaded by the renderer, how can we detect that?

      video.src = url;
      video.currentTime = 0;
    }

    deleteVideoURL(args) {
      const videoName = Cast.toString(args.NAME);
      Reflect.deleteProperty(this.videos, videoName);

      // To-do : reset the targets with the video
    }

    getLoadedVideos() {
      return JSON.stringify(Object.keys(this.videos));
    }

    showVideo(args, util) {
      const targetName = Cast.toString(args.TARGET);
      const videoName = Cast.toString(args.NAME);
      const target = this._getTargetFromMenu(targetName, util);
      if (!target) return;

      const targetId = target.id;
      this.targets[targetId] = {
        target: target,
        videoName: videoName
      };
    }

    stopShowingVideo(args, util) {
      const targetName = Cast.toString(args.TARGET);
      const target = this._getTargetFromMenu(targetName, util);
      if (!target) return;

      const targetId = target.id;
      Reflect.deleteProperty(this.targets, targetId);

      // Why does this not work, what
      target.updateAllDrawableProperties();
    }

    getCurrentVideo(args, util) {
      const targetName = Cast.toString(args.TARGET);
      const target = this._getTargetFromMenu(targetName, util);
      if (!target) return;

      const targetId = target.id;
      return (this.targets[targetId]) ? this.targets[targetId].videoName : '';
    }

    startVideo(args) {
      const videoName = Cast.toString(args.NAME);
      const duration = Cast.toNumber(args.DURATION);
      const video = this.videos[videoName].video;
      if (!video) return;

      video.play();
      video.currentTime = duration;
    }

    getCurrentTime(args) {
      const videoName = Cast.toString(args.NAME);
      const video = this.videos[videoName].video;
      if (!video) return 0;

      return video.currentTime;
    }

    pause(args) {
      const videoName = Cast.toString(args.NAME);
      const video = this.videos[videoName].video;
      if (!video) return;

      video.pause();
    }

    resume(args) {
      const videoName = Cast.toString(args.NAME);
      const video = this.videos[videoName].video;
      if (!video) return;

      video.play();
    }

    getState(args) {
      const videoName = Cast.toString(args.NAME);
      const video = this.videos[videoName].video;
      if (!video) return (args.STATE == 'paused');

      return (args.STATE == 'playing') ? !video.paused : video.paused;
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

    _getTargetFromMenu (targetName, util) {
      let target = Scratch.vm.runtime.getSpriteTargetByName(targetName);
      if (targetName === '_myself_') target = util.target;
      if (targetName === '_stage_') target = runtime.getTargetForStage();
      return target;
    }

    _getTargets() {
      const spriteNames = [
        {text: 'myself', value: '_myself_'},
        {text: 'Stage', value: '_stage_'}
      ];
      const targets = Scratch.vm.runtime.targets;
      for (let index = 1; index < targets.length; index++) {
        const target = targets[index];
        if (target.isOriginal) {
          const targetName = target.getName();
          spriteNames.push({
            text: targetName,
            value: targetName
          });
        }
      }
      return spriteNames;
    }

  }
  Scratch.extensions.register(new Video());
})(Scratch);
