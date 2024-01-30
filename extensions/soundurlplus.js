// Owner: TurboWarp
// Edit: XmerStudios
// Name: Sound URL Plus
// v1.0.0

class MusicExtension {
  constructor() {
    this.playingSounds = new Map();
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
      ],
    };
  }

  playSound({ url }) {
    const audio = new Audio(url);
    audio.play();
    this.playingSounds.set(url, audio);
  }

  playSoundAndWait({ url }) {
    return new Promise((resolve) => {
      const audio = new Audio(url);
      audio.addEventListener('ended', () => {
        resolve();
      });
      audio.play();
      this.playingSounds.set(url, audio);
    });
  }

  stopSound() {
    this.playingSounds.forEach((audio) => {
      audio.pause();
      audio.currentTime = 0;
    });
    this.playingSounds.clear();
  }

  currentSound() {
    const playingUrls = Array.from(this.playingSounds.keys());
    return playingUrls.length > 0 ? playingUrls[0] : '';
  }
}

Scratch.extensions.register(new MusicExtension());
