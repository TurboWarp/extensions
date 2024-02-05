// Owner: TurboWarp
// Edit: XmerStudios
// Name: Sound URL Plus
// Version: 1.3.5

class MusicExtension {
  constructor() {
    this.playingSounds = new Map();
    this.currentSoundURL = '';
    this.isPlaying = false;
    this.errorStatus = '';
    this.waitingPromise = null;
    this.volume = 100;
  }

  getInfo() {
    return {
      id: 'soundurlplus',
      name: 'Sound URL +',
      blocks: [
        {
          opcode: 'playSound',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Play sound URL [url]',
          arguments: {
            url: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'https://extensions.turbowarp.org/meow.mp3',
            },
          },
        },
        {
          opcode: 'playSoundAndWait',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Play sound URL [url] and wait',
          arguments: {
            url: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'https://extensions.turbowarp.org/meow.mp3',
            },
          },
        },
        {
          opcode: 'stopSound',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Stop music',
        },
        {
          opcode: 'currentSound',
          blockType: Scratch.BlockType.REPORTER,
          text: 'Current sound URL',
        },
        {
          opcode: 'isPlayingMusic',
          blockType: Scratch.BlockType.BOOLEAN,
          text: 'Is music playing?',
        },
        {
          opcode: 'soundTime',
          blockType: Scratch.BlockType.REPORTER,
          text: 'Sound Time',
        },
        {
          opcode: 'soundCurrentTime',
          blockType: Scratch.BlockType.REPORTER,
          text: 'Sound Current Time',
        },
        {
          opcode: 'setVolume',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Set volume to [volume]',
          arguments: {
            volume: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 100,
            },
          },
        },
        {
          opcode: 'getVolume',
          blockType: Scratch.BlockType.REPORTER,
          text: 'Get volume',
        },
        {
          opcode: 'seekSound',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Go to time [time] seconds in music',
          arguments: {
            time: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 0,
            },
          },
        },
      ],
    };
  }

  playSound({ url }) {
    try {
      const testAudio = new Audio(url);
      testAudio.addEventListener('canplaythrough', () => {
        if (!this.isPlaying) {
          const audio = new Audio(url);
          audio.volume = this.volume / 100;
          audio.addEventListener('ended', () => {
            this.isPlaying = false;
            this.currentSoundURL = '';
            if (this.waitingPromise) {
              this.waitingPromise.resolve();
              this.waitingPromise = null;
            }
          });
          audio.play();
          this.playingSounds.set(url, audio);
          this.currentSoundURL = url;
          this.isPlaying = true;
          this.errorStatus = '';
        }
      });

      testAudio.addEventListener('error', () => {
        this.errorControl();
      });
    } catch (error) {
      console.error('Error playing sound:', error);
      this.errorControl();
    }
  }

  async playSoundAndWait({ url }) {
    try {
      return new Promise(async (resolve) => {
        const testAudio = new Audio(url);
        testAudio.addEventListener('canplaythrough', async () => {
          if (!this.isPlaying) {
            const audio = new Audio(url);
            audio.volume = this.volume / 100;
            audio.addEventListener('ended', () => {
              this.isPlaying = false;
              this.currentSoundURL = '';
              resolve();
            });
            audio.play();
            this.playingSounds.set(url, audio);
            this.currentSoundURL = url;
            this.isPlaying = true;
            this.errorStatus = '';
          } else {
            if (this.waitingPromise) {
              this.waitingPromise.resolve();
              this.waitingPromise = null;
            }
            resolve();
          }
        });

        testAudio.addEventListener('error', () => {
          this.errorControl();
          resolve();
        });

        this.waitingPromise = {
          resolve,
          reject: () => {},
        };
      });
    } catch (error) {
      console.error('Error playing sound:', error);
      this.errorControl();
    }
  }

  stopSound() {
    this.playingSounds.forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
      audio.removeEventListener('ended', () => {
        this.isPlaying = false;
        this.currentSoundURL = '';
        if (this.waitingPromise) {
          this.waitingPromise.resolve();
          this.waitingPromise = null;
        }
      });
    });
    this.playingSounds.clear();
    this.currentSoundURL = '';
    this.isPlaying = false;
    this.errorStatus = '';
    if (this.waitingPromise) {
      this.waitingPromise.resolve();
      this.waitingPromise = null;
    }
  }

  currentSound() {
    return this.currentSoundURL;
  }

  soundTime() {
    if (this.playingSounds.has(this.currentSoundURL)) {
      return this.playingSounds.get(this.currentSoundURL).duration;
    }
    return 0;
  }

  soundCurrentTime() {
    if (this.playingSounds.has(this.currentSoundURL)) {
      if (this.isPlaying) {
        return this.playingSounds.get(this.currentSoundURL).currentTime;
      } else {
        return '-';
      }
    }
    return 0;
  }

  isPlayingMusic() {
    return this.isPlaying;
  }

  seekSound({ time }) {
    if (this.playingSounds.has(this.currentSoundURL)) {
      this.playingSounds.get(this.currentSoundURL).currentTime = time;
    }
  }

  setVolume({ volume }) {
    this.volume = Math.min(100, Math.max(0, volume));
    this.playingSounds.forEach((audio) => {
      audio.volume = this.volume / 100;
    });
  }

  getVolume() {
    return this.volume;
  }

  errorControl() {
    this.isPlaying = false;
    this.currentSoundURL = '';
    this.errorStatus = 'Error';
    if (this.waitingPromise) {
      this.waitingPromise.resolve();
      this.waitingPromise = null;
    }
  }
}

Scratch.extensions.register(new MusicExtension());
