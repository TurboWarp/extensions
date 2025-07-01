// Name: Oscillators
// ID: oscillator
// Description: Synthensize simple sound waves.
// By: AmpElectrecuted <https://scratch.mit.edu/users/AmpElectrecuted/>
// License: MPL-2.0

(function (Scratch) {
  'use strict';
  let context = new AudioContext();
  let oscillator = new OscillatorNode(context);
  oscillator.connect(context.destination);
  let isStart = false;
  let isPaused = true;

  class OscillatorExtension {
    getInfo() {
      return {
        id: 'oscillator',
        name: Scratch.translate('Oscillators'),
        blocks: [
          {
            opcode: 'startFreq',
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate('start [WAVEFORM] wave at [FREQ] Hz'),
            arguments: {
              WAVEFORM: {
                type: Scratch.ArgumentType.STRING,
                menu: 'WAVEFORM_MENU'
              },
              FREQ: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 440
              }
            }
          },
          {
            opcode: 'stopFreq',
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("stop wave")
          }
        ],
        menus: {
          WAVEFORM_MENU: {
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate('sine'),
                value: 'sine'
              },
              {
                text: Scratch.translate('square'),
                value: 'square'
              },
              {
                text: Scratch.translate('sawtooth'),
                value: 'sawtooth'
              },
              {
                text: Scratch.translate('triangle'),
                value: 'triangle'
              }
            ]
          }
        }
      }
    }

    startFreq(args) {
      oscillator.type = args.WAVEFORM;
      oscillator.frequency.setValueAtTime(args.FREQ, context.currentTime);
      if (!isStart) {
        oscillator.start();
        isStart = true;
      }
      if (isPaused) {
        context.resume();
        isPaused = false;
      }
    }

    stopFreq() {
      context.suspend();
      isPaused = true;
    }
  }
  Scratch.extensions.register(new OscillatorExtension());
})(Scratch);