(function (Scratch) {
  'use strict';

  const vm = Scratch.vm;
  const runtime = vm.runtime;
  const canvas = vm.renderer.canvas;
  const Cast = Scratch.Cast;

  class Video {
    constructor() {
      this.video = document.createElement('video');

      this.video.style.position = 'absolute';
      this.video.style.visibility = 'hidden';
      this.video.style.transformOrigin = 'center center';
      canvas.parentElement.prepend(this.video);

      const adjustSize = (width, height) => {
        this.video.style.width = `${(width / runtime.stageWidth) * 100}%`;
        this.video.style.height = `${(height / runtime.stageHeight) * 100}%`;
      };

      runtime.on('STAGE_SIZE_CHANGED', () => adjustSize(runtime.stageWidth, runtime.stageHeight));
      adjustSize(runtime.stageWidth, runtime.stageHeight);
    }
    getInfo() {
      return {
        id: 'lmsVideo',
        color1: '#557882',
        name: 'Video',
        blocks: [
          {
            opcode: 'setVideoURL',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set video URL to [URL]',
            arguments: {
              URL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ''
              }
            }
          },
          {
            opcode: 'getVideoURL',
            blockType: Scratch.BlockType.REPORTER,
            text: 'current video URL'
          },
          '---',
          {
            opcode: 'startVideo',
            blockType: Scratch.BlockType.COMMAND,
            text: 'start video at [DURATION] seconds',
            arguments: {
              DURATION: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              }
            }
          },
          {
            opcode: 'getCurrentTime',
            blockType: Scratch.BlockType.REPORTER,
            text: 'current time'
          },
          '---',
          {
            opcode: 'pauseVideo',
            blockType: Scratch.BlockType.COMMAND,
            text: 'pause video'
          },
          {
            opcode: 'resumeVideo',
            blockType: Scratch.BlockType.COMMAND,
            text: 'resume video'
          },
          {
            opcode: 'showVideo',
            blockType: Scratch.BlockType.COMMAND,
            text: 'show video'
          },
          {
            opcode: 'hideVideo',
            blockType: Scratch.BlockType.COMMAND,
            text: 'hide video'
          },
          {
            opcode: 'getState',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'video is [STATE]?',
            arguments: {
              STATE: {
                type: Scratch.ArgumentType.STRING,
                menu: 'state'
              }
            }
          },
          '---',
          {
            opcode: 'setOptionOnVideo',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set [OPTION] on video to [TOGGLE]',
            arguments: {
              OPTION: {
                type: Scratch.ArgumentType.STRING,
                menu: 'options'
              },
              TOGGLE: {
                type: Scratch.ArgumentType.STRING,
                menu: 'toggle'
              }
            }
          },
          {
            opcode: 'getOptionIsEnabled',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[OPTION] is enabled?',
            arguments: {
              OPTION: {
                type: Scratch.ArgumentType.STRING,
                menu: 'options'
              }
            }
          }
        ],
        menus: {
          options: {
            acceptReporters: true,
            items: ['controls', 'loop']
          },
          state: {
            acceptReporters: true,
            items: ['playing', 'paused', 'visible', 'hidden']
          },
          toggle: {
            acceptReporters: true,
            items: ['enabled', 'disabled']
          }
        }
      };
    }

    setVideoURL(args) {
      this.video.src = Cast.toString(args.URL);
    }

    getVideoURL() {
      return Cast.toString(this.video.src);
    }

    startVideo(args) {
      const time = Cast.toNumber(args.DURATION);
      this.video.currentTime = time;
      this.video.play();
      this.video.style.visibility = 'visible';
    }

    getCurrentTime() {
      return Math.round(Cast.toNumber(this.video.currentTime) * 1000) / 1000;
    }

    getState(args) {
      switch (args.STATE) {
        case ('paused'): return this.video.paused;
        case ('playing'): return !this.video.paused;
        case ('visible'): return this.video.style.visibility === 'visible';
        case ('hidden'): return this.video.style.visibility === 'hidden';
      }
    }

    pauseVideo() {
      this.video.pause();
    }

    resumeVideo() {
      if (this.video.paused) this.video.play();
    }

    getIsPaused() {
      return this.video.paused;
    }

    showVideo() {
      this.video.style.visibility = 'visible';
    }

    hideVideo() {
      this.video.style.visibility = 'hidden';
    }

    setOptionOnVideo(args) {
      const option = Cast.toString(args.OPTION);
      const toggle = Cast.toString(args.TOGGLE);

      switch (option) {
        case ('controls'): return this.video.controls = !!(toggle == 'enabled');
        case ('loop'): return this.video.loop = !!(toggle == 'enabled');
      }
    }

    getOptionIsEnabled(args) {
      const option = Cast.toString(args.OPTION);
      switch (option) {
        case ('controls'): return this.video.controls;
        case ('loop'): return this.video.loop;
      }
    }
  }
  Scratch.extensions.register(new Video());
})(Scratch);
