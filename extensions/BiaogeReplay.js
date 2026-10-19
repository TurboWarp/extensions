// Name: Biaoge Replay
// ID: biaogereplay
// Description: Record actions and play back.
// By: biaogeSR <https://scratch.mit.edu/users/biaogeSR/>
// Original: biaogeSR
// License: MPL-2.0

(function (Scratch) {
  'use strict';

  const runtime = Scratch.vm.runtime;

  class BiaogeReplay {
    constructor() {
      this.target = null;
      this.frames = [];
      this.recording = false;
      this.playing = false;
      this.index = 0;

      this.tick = this.tick.bind(this);
      runtime.on('AFTER_EXECUTE', this.tick);
    }

    getInfo() {
      return {
        id: 'biaogereplay',
        name: 'Biaoge Replay',
        color1: '#22B14C',
        color2: '#1E9E43',
        color3: '#167A32',
        blocks: [
          {
            opcode: 'startRecord',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Start recording'
          },
          {
            opcode: 'stopRecord',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Stop recording'
          },
          {
            opcode: 'playReplay',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Playback'
          },
          {
            opcode: 'stopReplay',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Stop playback'
          },
          {
            opcode: 'clearReplay',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Clear playback'
          },
          {
            opcode: 'replayTime',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Playback time (seconds)'
          },
          {
            opcode: 'replayDone',
            blockType: Scratch.BlockType.BOOLEAN,
                text: 'Playback complete?'
          }
        ]
      };
    }

    startRecord(args, util) {
      this.target = util.target;
      this.frames = [];
      this.index = 0;
      this.playing = false;
      this.recording = true;
    }

    stopRecord() {
      this.recording = false;
    }

    playReplay(args, util) {
      if (!this.frames.length) return;

      this.target = util.target;
      this.recording = false;
      this.playing = true;
      this.index = 0;
    }

    stopReplay() {
      this.playing = false;
    }

    clearReplay() {
      this.recording = false;
      this.playing = false;
      this.frames = [];
      this.index = 0;
    }

    replayTime() {
      return Math.round(this.index / 30 * 100) / 100;
    }

    replayDone() {
      return !this.playing && this.index > 0;
    }

    tick() {
      const target = this.target;
      if (!target || target.isStage) return;

      if (this.recording) {
        this.frames.push({
          x: target.x,
          y: target.y,
          direction: target.direction,
          size: target.size,
          visible: target.visible,
          costume: target.currentCostume
        });

        if (this.frames.length >= 18000) {
          this.recording = false;
        }
        return;
      }

      if (!this.playing) return;

      if (this.index >= this.frames.length) {
        this.playing = false;
        return;
      }

      const frame = this.frames[this.index++];

      target.setXY(frame.x, frame.y);
      target.setDirection(frame.direction);
      target.setSize(frame.size);
      target.setVisible(frame.visible);

      if (target.currentCostume !== frame.costume) {
        target.setCostume(frame.costume);
      }
    }
  }

  Scratch.extensions.register(new BiaogeReplay());
})(Scratch);
