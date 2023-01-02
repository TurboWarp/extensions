(Scratch => {
  'use strict';

  const audioEngine = Scratch.vm.runtime.audioEngine;

  const fetchAsArrayBufferWithTimeout = (url) => new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    let timeout = setTimeout(() => {
      xhr.abort();
      throw new Error('Timed out');
    }, 5000);
    xhr.onload = () => {
      clearTimeout(timeout);
      if (xhr.status === 200) {
        resolve(xhr.response);
      } else {
        reject(new Error(`HTTP error ${xhr.status} while fetching ${url}`));
      }
    };
    xhr.onerror = () => {
      clearTimeout(timeout);
      reject(new Error(`Failed to request ${url}`));
    };
    xhr.responseType = 'arraybuffer';
    xhr.open('GET', url);
    xhr.send();
  });

  /**
   * @param {string} url
   * @param {VM.Target} target
   * @returns {Promise<void>}
   */
  const playWithAudioEngine = async (url, target) => {
    const soundBank = target.sprite.soundBank;

    const arrayBuffer = await fetchAsArrayBufferWithTimeout(url);
    const soundPlayer = await audioEngine.decodeSoundPlayer({
      data: {
        buffer: arrayBuffer
      }
    });
    soundBank.addSoundPlayer(soundPlayer);

    await soundBank.playSound(target, soundPlayer.id);

    delete soundBank.soundPlayers[soundPlayer.id];
    // @ts-expect-error
    soundBank.playerTargets.delete(soundPlayer.id);
    // @ts-expect-error
    soundBank.soundEffects.delete(soundPlayer.id);
  };

  /**
   * @param {string} url
   * @returns {Promise<void>}
   */
  const playWithAudioElement = (url) => new Promise((resolve, reject) => {
    // Unfortunately, we can't play all sounds with the audio engine.
    // For these sounds, fall back to a primitive <audio>-based solution that will work for all
    // sounds, even those without CORS.
    const mediaElement = new Audio(url);
    mediaElement.onended = () => {
      resolve();
    };
    mediaElement.play()
      .then(() => {
        // Wait for onended
      })
      .catch((err) => {
        reject(err);
      });
  });

  /**
   * A list of URLs that have previously failed to play using the audio engine.
   * @type {string[]}
   */
  const failedToPlayWithAudioEngine = [];

  /**
   * @param {string} url
   * @param {VM.Target} target
   * @returns {Promise<void>}
   */
  const playSound = async (url, target) => {
    try {
      if (!failedToPlayWithAudioEngine.includes(url)) {
        try {
          return await playWithAudioEngine(url, target);
        } catch (e) {
          console.warn(`Attempt to play ${url} with audio engine failed -- falling back to more primitive approach`);
          failedToPlayWithAudioEngine.push(url);
        }
      }
      return await playWithAudioElement(url);
    } catch (e) {
      console.warn(`Attempt to play ${url} failed`, e);
    }
  };

  class Sound {
    getInfo() {
      return {
        // 'sound' would conflict with normal Scratch
        id: 'notSound',
        name: 'Sound',
        blocks: [
          {
            opcode: 'play',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Play sound from url:[path]',
            arguments: {
              path: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'https://extensions.turbowarp.org/meow.mp3'
              }
            }
          },
          {
            opcode: 'playUntilDone',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Play sound from url:[path] until done',
            arguments: {
              path: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'https://extensions.turbowarp.org/meow.mp3'
              }
            }
          }
        ]
      };
    }

    play({ path }, util) {
      playSound(path, util.target);
    }

    playUntilDone({ path }, util) {
      return playSound(path, util.target);
    }
  }

  Scratch.extensions.register(new Sound());
})(Scratch);
