(function (Scratch) {
  'use strict';

  const vm = Scratch.vm;
  const runtime = vm.runtime;
  const Cast = Scratch.Cast;

  class Video {
    constructor() {
      this.videos = [];
      this.targets = [];

      runtime.on('PROJECT_RUN_STOP', () => {
        for (const name of Object.keys(this.videos)) {
          const video = this.videos[name];
          video.pause();
          video.currentTime = 0;
        }

        this.targets = [];
      });

      runtime.on('PROJECT_START', () => {
        for (const name of Object.keys(this.videos)) {
          const video = this.videos[name];
          video.pause();
          video.currentTime = 0;
        }

        this.targets = [];
      });

      runtime.on('BEFORE_EXECUTE', () => {
        for (const name of Object.keys(this.videos)) {
          const video = this.videos[name];
          video.volume = runtime.audioEngine.inputNode.gain.value;
        }

        for (const id of Object.keys(this.targets)) {
          const target = this.targets[id].target;
          const drawableID = target.drawableID;

          const drawable = runtime.renderer._allDrawables[drawableID];
          // This was only a problem when targets weren't reset, I don't
          // expect it to happen much now but just in case..
          if (!drawable) return;
          const skinId = drawable.skin._id;
          const video = this.videos[this.targets[id].videoName];

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
            opcode: 'pauseVideo',
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
            opcode: 'resumeVideo',
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

    loadVideoURL(args) {
      const videoName = Cast.toString(args.NAME);
      const url = Cast.toString(args.URL);

      this.videos[videoName] = document.createElement('video');
      this.videos[videoName].width = 480;
      this.videos[videoName].height = 360;
      this.videos[videoName].crossOrigin = 'anonymous';

      // To-do : Some urls can't be loaded by the renderer, how can we detect that?

      this.videos[videoName].src = url;
      this.videos[videoName].currentTime = 0;
    }

    deleteVideoURL(args) {
      const videoName = Cast.toString(args.NAME);
      Reflect.deleteProperty(this.videos, videoName);

      // To-do : reset the targets with the video
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
      const video = this.videos[videoName];
      if (!video) return;

      video.play();
      video.currentTime = duration;
    }

    getCurrentTime(args) {
      const videoName = Cast.toString(args.NAME);
      const video = this.videos[videoName];
      if (!video) return 0;

      return video.currentTime;
    }

    pauseVideo(args) {
      const videoName = Cast.toString(args.NAME);
      const video = this.videos[videoName];
      if (!video) return;

      video.pause();
    }

    resumeVideo(args) {
      const videoName = Cast.toString(args.NAME);
      const video = this.videos[videoName];
      if (!video) return;

      video.play();
    }

    getState(args) {
      const videoName = Cast.toString(args.NAME);
      const video = this.videos[videoName];
      if (!video) return (args.STATE == 'paused');

      return (args.STATE == 'playing') ? !video.paused : video.paused;
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
