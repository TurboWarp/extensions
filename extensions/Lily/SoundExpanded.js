// Name: Sound Expanded
// Description: Adds more sound-related blocks.
// ID: lmsSoundExpanded
// By: LilyMakesThings <https://scratch.mit.edu/users/LilyMakesThings/>

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
              START: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
            },
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
          },

          "---",

          {
            opcode: "stopSound",
            blockType: Scratch.BlockType.COMMAND,
            text: "stop sound [SOUND]",
            arguments: {
              SOUND: {
                type: Scratch.ArgumentType.SOUND,
              },
            },
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
          },
          {
            opcode: "getProjectVolume",
            blockType: Scratch.BlockType.REPORTER,
            text: "project volume",
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

    startLooping(args, util) {
      const index = this._getSoundIndex(args.SOUND, util);
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
