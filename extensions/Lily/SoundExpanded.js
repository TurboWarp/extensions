// Name: Sound Expanded
// Description: Adds more sound-related blocks.
// ID: lmsSoundExpanded
// By: LilyMakesThings <https://scratch.mit.edu/users/LilyMakesThings/>
// License: MIT AND LGPL-3.0

(function (Scratch) {
  "use strict";

  const vm = Scratch.vm;
  const runtime = vm.runtime;
  const soundCategory = runtime.ext_scratch3_sound;

  class SoundExpanded {
    getInfo() {
      return {
        id: "lmsSoundExpanded",
        color1: "#CF63CF",
        color2: "#C94FC9",
        color3: "#BD42BD",
        name: "Sound Expanded",
        blocks: [
          {
            opcode: "startLooping",
            blockType: Scratch.BlockType.COMMAND,
            text: "start looping [SOUND]",
            arguments: {
              SOUND: {
                type: Scratch.ArgumentType.SOUND,
              },
            },
            extensions: ["colours_sounds"],
          },
          {
            opcode: "startLoopingBegin",
            blockType: Scratch.BlockType.COMMAND,
            text: "start looping [SOUND] begin [START]s",
            arguments: {
              SOUND: {
                type: Scratch.ArgumentType.SOUND,
              },
              START: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "2",
              },
            },
            extensions: ["colours_sounds"],
          },
          {
            opcode: "startLoopingBeginEnd",
            blockType: Scratch.BlockType.COMMAND,
            text: "start looping [SOUND] begin [START]s end [END]s",
            arguments: {
              SOUND: {
                type: Scratch.ArgumentType.SOUND,
              },
              START: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "2",
              },
              END: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "4",
              },
            },
            extensions: ["colours_sounds"],
          },
          {
            opcode: "stopLooping",
            blockType: Scratch.BlockType.COMMAND,
            text: "end looping [SOUND]",
            arguments: {
              SOUND: {
                type: Scratch.ArgumentType.SOUND,
              },
            },
            extensions: ["colours_sounds"],
          },
          {
            opcode: "isLooping",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[SOUND] is looping?",
            arguments: {
              SOUND: {
                type: Scratch.ArgumentType.SOUND,
              },
            },
            extensions: ["colours_sounds"],
          },

          "---",

          {
            opcode: "playSoundAtAndWait",
            blockType: Scratch.BlockType.COMMAND,
            text: "play sound [SOUND] from [START]s until done",
            arguments: {
              SOUND: {
                type: Scratch.ArgumentType.SOUND,
              },
              START: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "2",
              },
            },
            extensions: ["colours_sounds"],
          },
          {
            opcode: "playSoundAt",
            blockType: Scratch.BlockType.COMMAND,
            text: "start sound [SOUND] from [START]s",
            arguments: {
              SOUND: {
                type: Scratch.ArgumentType.SOUND,
              },
              START: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "2",
              },
            },
            extensions: ["colours_sounds"],
          },
          {
            opcode: "playSoundToAndWait",
            blockType: Scratch.BlockType.COMMAND,
            text: "play sound [SOUND] from [START]s to [END]s until done",
            arguments: {
              SOUND: {
                type: Scratch.ArgumentType.SOUND,
              },
              START: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "2",
              },
              END: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "4",
              },
            },
            extensions: ["colours_sounds"],
          },
          {
            opcode: "playSoundTo",
            blockType: Scratch.BlockType.COMMAND,
            text: "start sound [SOUND] from [START]s to [END]s",
            arguments: {
              SOUND: {
                type: Scratch.ArgumentType.SOUND,
              },
              START: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "2",
              },
              END: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "4",
              },
            },
            extensions: ["colours_sounds"],
          },
          {
            opcode: "stopSound",
            blockType: Scratch.BlockType.COMMAND,
            text: "stop sound [SOUND]",
            arguments: {
              SOUND: {
                type: Scratch.ArgumentType.SOUND,
              },
            },
            extensions: ["colours_sounds"],
          },
          {
            opcode: "pauseSounds",
            blockType: Scratch.BlockType.COMMAND,
            text: "pause all sounds",
            arguments: {
              SOUND: {
                type: Scratch.ArgumentType.SOUND,
              },
            },
            extensions: ["colours_sounds"],
          },
          {
            opcode: "resumeSounds",
            blockType: Scratch.BlockType.COMMAND,
            text: "resume all sounds",
            arguments: {
              SOUND: {
                type: Scratch.ArgumentType.SOUND,
              },
            },
            extensions: ["colours_sounds"],
          },

          "---",

          {
            opcode: "isSoundPlaying",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "sound [SOUND] is playing?",
            arguments: {
              SOUND: {
                type: Scratch.ArgumentType.SOUND,
              },
            },
            extensions: ["colours_sounds"],
          },
          {
            opcode: "attributeOfSound",
            blockType: Scratch.BlockType.REPORTER,
            text: "[ATTRIBUTE] of [SOUND]",
            arguments: {
              ATTRIBUTE: {
                type: Scratch.ArgumentType.STRING,
                menu: "attribute",
              },
              SOUND: {
                type: Scratch.ArgumentType.SOUND,
              },
            },
            extensions: ["colours_sounds"],
          },
          {
            opcode: "getSoundEffect",
            blockType: Scratch.BlockType.REPORTER,
            text: "[EFFECT] of [TARGET]",
            arguments: {
              EFFECT: {
                type: Scratch.ArgumentType.STRING,
                menu: "effect",
              },
              TARGET: {
                type: Scratch.ArgumentType.STRING,
                menu: "targets",
              },
            },
            extensions: ["colours_sounds"],
          },
          "---",
          {
            opcode: "setProjectVolume",
            blockType: Scratch.BlockType.COMMAND,
            text: "set project volume to [VALUE]%",
            arguments: {
              VALUE: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100,
              },
            },
            extensions: ["colours_sounds"],
          },
          {
            opcode: "changeProjectVolume",
            blockType: Scratch.BlockType.COMMAND,
            text: "change project volume by [VALUE]",
            arguments: {
              VALUE: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: -10,
              },
            },
            extensions: ["colours_sounds"],
          },
          {
            opcode: "getProjectVolume",
            blockType: Scratch.BlockType.REPORTER,
            text: "project volume",
            extensions: ["colours_sounds"],
          },
        ],
        menus: {
          attribute: {
            acceptReporters: false,
            items: ["length", "channels", "sample rate", "dataURI"],
          },
          effect: {
            acceptReporters: false,
            items: ["pitch", "pan"],
          },
          targets: {
            acceptReporters: true,
            items: "_getTargets",
          },
        },
      };
    }

    _startLooping(util, sound, loopStart, loopEnd) {
      const index = this._getSoundIndex(sound, util);
      if (index < 0) return 0;
      const target = util.target;
      const sprite = util.target.sprite;

      const soundId = sprite.sounds[index].soundId;
      const soundPlayer = sprite.soundBank.soundPlayers[soundId];

      if (!soundPlayer.isPlaying) {
        soundCategory._addWaitingSound(target.id, soundId);
        sprite.soundBank.playSound(util.target, soundId);
      }

      if (!soundPlayer.outputNode) return;
      soundPlayer.outputNode.loop = true;
      soundPlayer.outputNode.loopStart = loopStart;
      soundPlayer.outputNode.loopEnd = loopEnd;
    }

    startLooping(args, util) {
      this._startLooping(util, args.SOUND, 0, 0);
    }

    startLoopingBegin(args, util) {
      this._startLooping(util, args.SOUND, Scratch.Cast.toNumber(args.START), 0);
    }

    startLoopingBeginEnd(args, util) {
      this._startLooping(util, args.SOUND, Scratch.Cast.toNumber(args.START), Scratch.Cast.toNumber(args.END));
    }

    stopLooping(args, util) {
      const index = this._getSoundIndex(args.SOUND, util);
      if (index < 0) return false;
      const sprite = util.target.sprite;

      const soundId = sprite.sounds[index].soundId;
      const soundPlayer = sprite.soundBank.soundPlayers[soundId];

      if (!soundPlayer.outputNode) return;
      soundPlayer.outputNode.loop = false;
    }

    isLooping(args, util) {
      const index = this._getSoundIndex(args.SOUND, util);
      if (index < 0) return false;
      const sprite = util.target.sprite;

      const soundId = sprite.sounds[index].soundId;
      const soundPlayer = sprite.soundBank.soundPlayers[soundId];

      if (!soundPlayer.outputNode) return false;
      return soundPlayer.outputNode.loop;
    }

    // https://github.com/scratchfoundation/scratch-vm/blob/7c1187cc1fe1c763ef61598875acd4fc9a0c8c2e/src/blocks/scratch3_sound.js#L164
    _playSoundAt(args, util, storeWaiting) {
      const index = this._getSoundIndex(args.SOUND, util);
      if (index >= 0) {
        const { target } = util;
        const { sprite } = target;
        const { soundId } = sprite.sounds[index];
        const start = Math.max(Scratch.Cast.toNumber(args.START), 0);
        const end = args.END == undefined ? undefined : Scratch.Cast.toNumber(args.END);
        if (sprite.soundBank) {
          if (storeWaiting === true) {
            // @ts-expect-error not typed
            Scratch.vm.runtime.ext_scratch3_sound._addWaitingSound(target.id, soundId);
          } else {
            // @ts-expect-error not typed
            Scratch.vm.runtime.ext_scratch3_sound._removeWaitingSound(target.id, soundId);
          }
          return this._playSoundBankSound(sprite.soundBank, target, soundId, start, end);
        }
      }
    }

    // https://github.com/scratchfoundation/scratch-audio/blob/6fb4b142a5f3198483e4c4f992fb623d5e9d1ed5/src/SoundBank.js#L89
    _playSoundBankSound(bank, target, soundId, start, end) {
      const effects = bank.getSoundEffects(soundId);
      const player = bank.getSoundPlayer(soundId);

      if (bank.playerTargets.get(soundId) !== target) {
        // make sure to stop the old sound, effectively "forking" the output
        // when the target switches before we adjust it's effects
        player.stop();
      }

      bank.playerTargets.set(soundId, target);
      effects.addSoundPlayer(player);
      effects.setEffectsFromTarget(target);
      player.connect(effects);

      this._playSoundPlayer(player, start, end);

      return player.finished();
    }

    // https://github.com/scratchfoundation/scratch-audio/blob/6fb4b142a5f3198483e4c4f992fb623d5e9d1ed5/src/SoundPlayer.js#L253
    _playSoundPlayer(player, start, end) {
      if (player.isStarting) {
        player.emit('stop');
        player.emit('play');
        return;
      }

      if (player.isPlaying) {
        player.stop();
      }

      if (player.initialized) {
        player._createSource();
      } else {
        player.initialize();
      }

      if (end === undefined) {
        player.outputNode.start(0, start);
      } else {
        player.outputNode.start(0, start, Math.max(end - start, 0));
      }

      player.isPlaying = true;

      const { currentTime, DECAY_DURATION } = player.audioEngine;
      player.startingUntil = currentTime + DECAY_DURATION;

      player.emit('play');
    }

    playSoundAt(args, util) {
      this._playSoundAt(args, util);
    }

    playSoundAtAndWait(args, util) {
      return this._playSoundAt(args, util, true);
    }

    playSoundTo(args, util) {
      this._playSoundAt(args, util);
    }

    playSoundToAndWait(args, util) {
      return this._playSoundAt(args, util, true);
    }

    stopSound(args, util) {
      const index = this._getSoundIndex(args.SOUND, util);
      if (index < 0) return 0;
      const target = util.target;
      const sprite = target.sprite;

      const soundId = sprite.sounds[index].soundId;
      const soundBank = sprite.soundBank;
      soundBank.stop(target, soundId);
    }

    pauseSounds(args, util) {
      this._toggleSoundState(args, util, true);
    }

    resumeSounds(args, util) {
      this._toggleSoundState(args, util, false);
    }

    _toggleSoundState(args, util, state) {
      const sprite = util.target.sprite;
      const audioContext = sprite.soundBank.audioEngine.audioContext;

      if (state) {
        audioContext.suspend();
        return;
      } else {
        audioContext.resume();
        return;
      }
    }

    isSoundPlaying(args, util) {
      const index = this._getSoundIndex(args.SOUND, util);
      if (index < 0) return false;
      const sprite = util.target.sprite;

      const soundId = sprite.sounds[index].soundId;
      const soundPlayers = sprite.soundBank.soundPlayers;
      return soundPlayers[soundId].isPlaying;
    }

    attributeOfSound(args, util) {
      const index = this._getSoundIndex(args.SOUND, util);
      if (index < 0) return 0;
      const sprite = util.target.sprite;

      const sound = sprite.sounds[index];
      const soundId = sound.soundId;
      const soundPlayer = sprite.soundBank.soundPlayers[soundId];
      const soundBuffer = soundPlayer.buffer;

      switch (args.ATTRIBUTE) {
        case "length":
          return Math.round(soundBuffer.duration * 100) / 100;
        case "channels":
          return soundBuffer.numberOfChannels;
        case "sample rate":
          return soundBuffer.sampleRate;
        case "dataURI":
          return sound.asset.encodeDataURI();
      }
    }

    getSoundEffect(args, util) {
      let target = Scratch.vm.runtime.getSpriteTargetByName(args.TARGET);
      if (args.TARGET === "_myself_") target = util.target;
      if (args.TARGET === "_stage_") target = runtime.getTargetForStage();
      const effects = target.soundEffects;
      if (!effects) return 0;
      return effects[args.EFFECT];
    }

    setProjectVolume(args) {
      const value = Scratch.Cast.toNumber(args.VALUE);
      const newVolume = this._wrapClamp(value / 100, 0, 1);
      runtime.audioEngine.inputNode.gain.value = newVolume;
    }

    changeProjectVolume(args) {
      const value = Scratch.Cast.toNumber(args.VALUE) / 100;
      const volume = runtime.audioEngine.inputNode.gain.value;
      const newVolume = Scratch.Cast.toNumber(
        Math.min(Math.max(volume + value, 1), 0)
      );
      runtime.audioEngine.inputNode.gain.value = newVolume;
    }

    getProjectVolume() {
      const volume = runtime.audioEngine.inputNode.gain.value;
      return Math.round(volume * 10000) / 100;
    }

    /* Utility Functions */

    _getSoundIndex(soundName, util) {
      const len = util.target.sprite.sounds.length;
      if (len === 0) {
        return -1;
      }
      const index = this._getSoundIndexByName(soundName, util);
      if (index !== -1) {
        return index;
      }
      const oneIndexedIndex = parseInt(soundName, 10);
      if (!isNaN(oneIndexedIndex)) {
        return this._wrapClamp(oneIndexedIndex - 1, 0, len - 1);
      }
      return -1;
    }

    _getSoundIndexByName(soundName, util) {
      const sounds = util.target.sprite.sounds;
      for (let i = 0; i < sounds.length; i++) {
        if (sounds[i].name === soundName) {
          return i;
        }
      }
      return -1;
    }

    _wrapClamp(n, min, max) {
      const range = max - min + 1;
      return n - Math.floor((n - min) / range) * range;
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

  Scratch.extensions.register(new SoundExpanded());
})(Scratch);
