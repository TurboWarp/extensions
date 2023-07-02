(function(Scratch) {
  "use strict";

  const vm = Scratch.vm;
  const runtime = vm.runtime;
  const soundCategory = runtime.ext_scratch3_sound;

  /**
   * @param {VM.BlockUtility} util
   * @param {unknown} targetName
   */
  const getSpriteTargetByName = (util, targetName) => {
    const nameString = Scratch.Cast.toString(targetName);
    const target = util.target;
    if (target.getName() === nameString) {
      return target;
    }
    return util.runtime.getSpriteTargetByName(nameString);
  };

  class SoundExpanded {
    getInfo() {
      return {
        id: 'lmsSoundExpanded',
        color1: "#CF63CF",
        name: "Sound Expanded",
        blocks: [
					{
            opcode: 'startSoundAtSeconds',
            blockType: Scratch.BlockType.COMMAND,
            text: 'start sound [SOUND] from [START] seconds',
            hideFromPalette: true,
            arguments: {
              SOUND: {
                type: Scratch.ArgumentType.SOUND
              },
              START: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              }
            }
          },
          {
            opcode: 'playSoundAtSecondsUntilDone',
            blockType: Scratch.BlockType.COMMAND,
            text: 'play sound [SOUND] at [START] seconds until done',
            hideFromPalette: true,
            arguments: {
              SOUND: {
                type: Scratch.ArgumentType.SOUND
              },
              START: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              }
            }
          },
          {
            opcode: 'startSoundAndStopAtSeconds',
            blockType: Scratch.BlockType.COMMAND,
            text: 'start sound [SOUND] and stop at [END] seconds',
            hideFromPalette: true,
            arguments: {
              SOUND: {
                type: Scratch.ArgumentType.SOUND
              },
              END: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 3
              }
            }
          },
          {
            opcode: 'startSoundDuringTimeframe',
            blockType: Scratch.BlockType.COMMAND,
            text: 'start sound [SOUND] from [START] and stop at [END] seconds',
            hideFromPalette: true,
            arguments: {
              SOUND: {
                type: Scratch.ArgumentType.SOUND
              },
              START: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              },
              END: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 3
              }
            }
          },
          {
            opcode: 'stopSound',
            blockType: Scratch.BlockType.COMMAND,
            text: 'stop sound [SOUND]',
            arguments: {
              SOUND: {
                type: Scratch.ArgumentType.SOUND
              }
            }
          },

          '---',

          {
            opcode: 'pauseSound',
            blockType: Scratch.BlockType.COMMAND,
            text: 'pause sound [SOUND]',
            hideFromPalette: true,
            arguments: {
              SOUND: {
                type: Scratch.ArgumentType.SOUND
              }
            }
          },
          {
            opcode: 'resumeSound',
            blockType: Scratch.BlockType.COMMAND,
            text: 'resume sound [SOUND]',
            hideFromPalette: true,
            arguments: {
              SOUND: {
                type: Scratch.ArgumentType.SOUND
              }
            }
          },
          {
            opcode: 'pauseAllSounds',
            blockType: Scratch.BlockType.COMMAND,
            text: 'pause all sounds',
            hideFromPalette: true,
            arguments: {
              SOUND: {
                type: Scratch.ArgumentType.SOUND
              }
            }
          },
          {
            opcode: 'resumeAllSounds',
            blockType: Scratch.BlockType.COMMAND,
            text: 'resume all sounds',
            hideFromPalette: true,
            arguments: {
              SOUND: {
                type: Scratch.ArgumentType.SOUND
              }
            }
          },

          '---',

					{
						opcode: 'setLooping',
						blockType: Scratch.BlockType.COMMAND,
						text: 'set looping on [SOUND] to [STATE]',
						arguments: {
							SOUND: {
								type: Scratch.ArgumentType.SOUND
							},
							STATE: {
								type: Scratch.ArgumentType.STRING,
								menu: 'state'
							}
						}
					},
					{
						opcode: 'isLooping',
						blockType: Scratch.BlockType.BOOLEAN,
						text: '[SOUND] is looping?',
						arguments: {
							SOUND: {
								type: Scratch.ArgumentType.SOUND
							}
						}
					},

					'---',

          {
            opcode: 'isSoundPlaying',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'sound [SOUND] is playing?',
            arguments: {
              SOUND: {
                type: Scratch.ArgumentType.SOUND
              }
            }
          },
          {
            opcode: 'attributeOfSound',
            blockType: Scratch.BlockType.REPORTER,
            text: '[ATTRIBUTE] of [SOUND]',
            arguments: {
              ATTRIBUTE: {
                type: Scratch.ArgumentType.STRING,
                menu: 'attribute'
              },
              SOUND: {
                type: Scratch.ArgumentType.SOUND
              }
            }
          },
          {
            opcode: 'getSoundEffect',
            blockType: Scratch.BlockType.REPORTER,
            text: '[EFFECT] of [TARGET]',
            arguments: {
              EFFECT: {
                type: Scratch.ArgumentType.STRING,
                menu: 'effect'
              },
              TARGET: {
                type: Scratch.ArgumentType.STRING,
                menu: 'targets'
              }
            }
          }
        ],
        menus: {
          state: {
            acceptReporters: false,
            items: ['enabled', 'disabled']
          },
          attribute: {
            acceptReporters: false,
            items: ['length', 'channels', 'sample rate', 'current time']
          },
          effect: {
            acceptReporters: false,
            items: ['pitch', 'pan']
          },
          targets: {
            acceptReporters: true,
            items: '_getTargets'
          }
        }
      }
    }

    startSoundAtSeconds(args, util) {
      const index = this._getSoundIndex(args.SOUND, util);
      if (index < 0) return 0;
      const target = util.target;
      const sprite = target.sprite;
      const duration = args.START;

      const soundId = sprite.sounds[index].soundId;
      soundCategory._addWaitingSound(target.id, soundId);
      sprite.soundBank.playSound(util.target, soundId, duration);
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

		setLooping(args, util) {
      const index = this._getSoundIndex(args.SOUND, util);
      if (index < 0) return false;
      const sprite = util.target.sprite;

      const soundId = sprite.sounds[index].soundId;
      const soundPlayer = sprite.soundBank.soundPlayers[soundId];

			soundPlayer.outputNode.loop = (args.STATE === 'enabled') ? true : false;
		}

		isLooping(args, util) {
      const index = this._getSoundIndex(args.SOUND, util);
      if (index < 0) return false;
      const sprite = util.target.sprite;

      const soundId = sprite.sounds[index].soundId;
      const soundPlayer = sprite.soundBank.soundPlayers[soundId];

			return soundPlayer.outputNode.loop;
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

      const soundId = sprite.sounds[index].soundId;
      const soundPlayer = sprite.soundBank.soundPlayers[soundId];
      const soundBuffer = soundPlayer.buffer;

      switch (args.ATTRIBUTE) {
        case ('length'):
          return Math.round(soundBuffer.duration * 100) / 100;
        case ('channels'):
          return soundBuffer.numberOfChannels;
        case ('sample rate'):
          return soundBuffer.sampleRate;
				case ('current time'):
					return soundPlayer.audioEngine.audioContext.currentTime;
      }
    }

    getSoundEffect(args, util) {
      const target = getSpriteTargetByName(util, args.TARGET);
      const effects = target.soundEffects;
      if (!effects) return 0;
      return effects[args.EFFECT];
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
      const range = (max - min) + 1;
      return n - (Math.floor((n - min) / range) * range);
    }

    _getTargets() {
      const spriteNames = [];
      const targets = runtime.targets;
      const myself = runtime.getEditingTarget().getName();
      for (let index = 1; index < targets.length; index++) {
        const target = targets[index];
        if (target.isOriginal) {
          const targetName = target.getName();
          if (targetName === myself) {
            spriteNames.unshift({
              text: 'myself',
              value: targetName
            });
          } else {
            spriteNames.push({
              text: targetName,
              value: targetName
            });
          }
        }
      }
      if (spriteNames.length > 0) {
        return spriteNames;
      } else {
        return [{
          text: "",
          value: 0
        }]; //this should never happen but it's a failsafe
      }
    }
  }

  Scratch.extensions.register(new SoundExpanded());
})(Scratch);