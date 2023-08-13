(function (Scratch) {
  'use strict';

  const vm = Scratch.vm;
  const runtime = vm.runtime;
  const canvas = runtime.renderer.canvas;
  const Cast = Scratch.Cast;

  class Video {
    constructor() {
      this.video = document.createElement('video');
      this.video.width = 480;
      this.video.height = 360;
      this.video.crossOrigin = 'anonymous';

      runtime.on('BEFORE_EXECUTE', () => {
        /* Scratch Addons volume slider moment */
        this.video.volume = runtime.audioEngine.inputNode.gain.value;

        const target = runtime.targets[0];
        const drawableID = target.drawableID;
        const skinId = runtime.renderer._allDrawables[drawableID].skin._id;
  
        vm.renderer.updateBitmapSkin(skinId, this.video, 2);
      });
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
            opcode: 'testBlock',
            blockType: Scratch.BlockType.COMMAND,
            text: 'test'
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
      this.video.currentTime = 0;
    }

    getVideoURL() {
      return Cast.toString(this.video.src);
    }

    startVideo(args) {
      const time = Cast.toNumber(args.DURATION);
      this.video.currentTime = time;
      this.video.play();
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

    getOptionIsEnabled(args) {
      const option = Cast.toString(args.OPTION);
      switch (option) {
        case ('controls'): return this.video.controls;
        case ('loop'): return this.video.loop;
      }
    }

    testBlock(args, util) {
    }
  }
  Scratch.extensions.register(new Video());
})(Scratch);
