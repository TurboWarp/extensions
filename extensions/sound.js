// Name: URL Playback
// ID: notSound
// Description: Play sounds from URLs. Previously called "Sound".
// License: MIT AND MPL-2.0

((Scratch) => {
  "use strict";

  const audioEngine = Scratch.vm.runtime.audioEngine;

  /**
   * This method assumes that the caller has already requested permission to fetch the URL.
   * @param {string} url
   * @returns {Promise<ArrayBuffer>}
   */
  const fetchAsArrayBufferWithTimeout = (url) =>
    new Promise((resolve, reject) => {
      // Permission is checked in playSound()
      // eslint-disable-next-line extension/no-xmlhttprequest
      const xhr = new XMLHttpRequest();
      let timeout = setTimeout(() => {
        xhr.abort();
        reject(new Error("Timed out"));
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
      xhr.responseType = "arraybuffer";
      xhr.open("GET", url);
      xhr.send();
    });

  /**
   * @type {Map<string, {sound: AudioEngine.SoundPlayer | null, error: unknown}>}
   */
  const soundPlayerCache = new Map();

  /**
   * @param {string} url
   * @returns {Promise<AudioEngine.SoundPlayer>}
   */
  const decodeSoundPlayer = async (url) => {
    const cached = soundPlayerCache.get(url);
    if (cached) {
      if (cached.sound) {
        return cached.sound;
      }
      throw cached.error;
    }

    try {
      const arrayBuffer = await fetchAsArrayBufferWithTimeout(url);
      const soundPlayer = await audioEngine.decodeSoundPlayer({
        data: {
          buffer: arrayBuffer,
        },
      });
      soundPlayerCache.set(url, {
        sound: soundPlayer,
        error: null,
      });
      return soundPlayer;
    } catch (e) {
      soundPlayerCache.set(url, {
        sound: null,
        error: e,
      });
      throw e;
    }
  };

  /**
   * @param {string} url
   * @param {VM.Target} target
   * @returns {Promise<boolean>} true if the sound could be played, false if the sound could not be decoded
   */
  const playWithAudioEngine = async (url, target) => {
    const soundBank = target.sprite.soundBank;

    /** @type {AudioEngine.SoundPlayer} */
    let soundPlayer;
    try {
      const originalSoundPlayer = await decodeSoundPlayer(url);
      soundPlayer = originalSoundPlayer.take();
    } catch (e) {
      console.warn(
        "Could not fetch audio; falling back to primitive approach",
        e
      );
      return false;
    }

    soundBank.addSoundPlayer(soundPlayer);
    await soundBank.playSound(target, soundPlayer.id);

    delete soundBank.soundPlayers[soundPlayer.id];
    soundBank.playerTargets.delete(soundPlayer.id);
    soundBank.soundEffects.delete(soundPlayer.id);

    return true;
  };

  /**
   * This method assumes that the caller has already requested permission to fetch the URL.
   * @param {string} url
   * @param {VM.Target} target
   * @returns {Promise<void>}
   */
  const playWithAudioElement = (url, target) =>
    new Promise((resolve, reject) => {
      // Unfortunately, we can't play all sounds with the audio engine.
      // For these sounds, fall back to a primitive <audio>-based solution that will work for all
      // sounds, even those without CORS.
      // Permission is checked in playSound()
      // eslint-disable-next-line extension/check-can-fetch
      const mediaElement = new Audio(url);

      // Make a minimal effort to simulate Scratch's sound effects.
      // We can get pretty close for volumes <100%.
      // playbackRate does not have enough range for simulating pitch.
      // There is no way for us to pan left or right.
      mediaElement.volume = target.volume / 100;

      mediaElement.onended = () => {
        resolve();
      };
      mediaElement
        .play()
        .then(() => {
          // Wait for onended
        })
        .catch((err) => {
          reject(err);
        });
    });

  /**
   * @param {string} url
   * @param {VM.Target} target
   * @returns {Promise<void>}
   */
  const playSound = async (url, target) => {
    try {
      if (!(await Scratch.canFetch(url))) {
        throw new Error(`Permission to fetch ${url} denied`);
      }

      const success = await playWithAudioEngine(url, target);
      if (!success) {
        return await playWithAudioElement(url, target);
      }
    } catch (e) {
      console.warn(`All attempts to play ${url} failed`, e);
    }
  };

  class Sound {
    getInfo() {
      return {
        // 'sound' would conflict with normal Scratch
        id: "notSound",
        name: Scratch.translate("URL Playback"),
        color1: "#cf63cf",
        menuIconURI: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUyIiBoZWlnaHQ9IjE1MiIgdmlld0JveD0iMCAwIDE1MiAxNTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxnIGNsaXAtcGF0aD0idXJsKCNjbGlwMF84MV8xMykiPgo8Y2lyY2xlIGN4PSI3NiIgY3k9Ijc2IiByPSI3NiIgZmlsbD0iI0ExMkRBMSIvPgo8Y2lyY2xlIGN4PSI3NiIgY3k9Ijc2IiByPSI3My41IiBzdHJva2U9ImJsYWNrIiBzdHJva2Utb3BhY2l0eT0iMC4xNSIgc3Ryb2tlLXdpZHRoPSI1Ii8+CjxwYXRoIGQ9Ik03Ni40OTAyIDIyLjAwODhDNzYuNzQwOSAyMi4wMTczIDc2Ljk4OSAyMi4wMzM2IDc3LjIzNDQgMjIuMDU0N0MxMDYuMjkgMjIuODEyMSAxMjkuNjExIDQ2LjYwMzUgMTI5LjYxMSA3NS44NDE4QzEyOS42MTEgMTA1LjU1OCAxMDUuNTIyIDEyOS42NDcgNzUuODA1NyAxMjkuNjQ3QzQ2LjA4OTcgMTI5LjY0NyAyMi4wMDAyIDEwNS41NTggMjIgNzUuODQxOEMyMiA0Ni40MzQ5IDQ1LjU5MDkgMjIuNTM4MSA3NC44Nzk5IDIyLjA0MzlDNzUuMjQ2MiAyMi4wMTU2IDc1LjYxODIgMjIgNzUuOTk2MSAyMkw3Ni40OTAyIDIyLjAwODhaTTY2LjMwMzcgODMuMzI3MUM2Ni44OTM3IDkyLjMwNzcgNjguNTA5OCAxMDAuMTMgNzAuNjg0NiAxMDUuOTA1QzcyLjA3NjMgMTA5LjYwMSA3My41NTI2IDExMi4wNzIgNzQuODEwNSAxMTMuNDg1Qzc1LjM3NzIgMTE0LjEyMiA3NS43NzQ5IDExNC40MTEgNzUuOTk1MSAxMTQuNTRDNzYuMjE1MSAxMTQuNDEyIDc2LjYxMzkgMTE0LjEyMyA3Ny4xODE2IDExMy40ODVDNzguNDM5NiAxMTIuMDcyIDc5LjkxNDkgMTA5LjYwMSA4MS4zMDY2IDEwNS45MDVDODMuNDgxNSAxMDAuMTMgODUuMDk4MyA5Mi4zMDc3IDg1LjY4ODUgODMuMzI3MUg2Ni4zMDM3Wk0zNy43MjM2IDgzLjMyNzFDMzkuODY5IDk0LjMwNDIgNDYuNjQxMiAxMDMuNjIzIDU1LjkyNzcgMTA5LjE3M0M1My40NTY4IDEwMS44OCA1MS44MzI2IDkyLjk3MzEgNTEuMjc0NCA4My4zMjcxSDM3LjcyMzZaTTEwMC43MTggODMuMzI3MUMxMDAuMTY3IDkyLjg0NTcgOTguNTc3MyAxMDEuNjQ0IDk2LjE2MTEgMTA4Ljg4M0MxMDUuMjAyIDEwMy4zMDEgMTExLjc3OSA5NC4xMTUxIDExMy44ODggODMuMzI3MUgxMDAuNzE4Wk01NS44OTc1IDQyLjUyNjRDNDYuNjM0MiA0OC4wNzM4IDM5Ljg3ODcgNTcuMzc0MiAzNy43Mjk1IDY4LjMyNzFINTEuMjcyNUM1MS44MjYgNTguNzAzNSA1My40Mzk2IDQ5LjgxMzkgNTUuODk3NSA0Mi41MjY0Wk03NS45OTUxIDM3LjA3MDNDNzUuNzc0OSAzNy4xOTg4IDc1LjM3NzUgMzcuNDg5MyA3NC44MTA1IDM4LjEyNkM3My41NTI2IDM5LjUzODkgNzIuMDc2MyA0Mi4wMTA0IDcwLjY4NDYgNDUuNzA2MUM2OC41MDYzIDUxLjQ5MDcgNjYuODg4NCA1OS4zMjg1IDY2LjMwMDggNjguMzI3MUg4NS42OTE0Qzg1LjEwMzYgNTkuMzI4NSA4My40ODQ5IDUxLjQ5MDggODEuMzA2NiA0NS43MDYxQzc5LjkxNDkgNDIuMDEwMiA3OC40Mzk2IDM5LjUzODkgNzcuMTgxNiAzOC4xMjZDNzYuNjEzNSAzNy40ODc5IDc2LjIxNTEgMzcuMTk4NCA3NS45OTUxIDM3LjA3MDNaTTk2LjE5MTQgNDIuODE4NEM5OC41OTQ0IDUwLjA1MDkgMTAwLjE3MyA1OC44MzE1IDEwMC43MiA2OC4zMjcxSDExMy44ODJDMTExLjc3IDU3LjU2MzUgMTA1LjIwOSA0OC4zOTY4IDk2LjE5MTQgNDIuODE4NFoiIGZpbGw9IiNCMDU0QjAiLz4KPHBhdGggZD0iTTc1Ljk5NjEgMjQuNUM3Ni4zNjgyIDI0LjUgNzYuNzM0NCAyNC41MTgzIDc3LjA5NDcgMjQuNTUxOEMxMDQuODM0IDI1LjIzNTkgMTI3LjExMSA0Ny45Mzc0IDEyNy4xMTEgNzUuODQxOEMxMjcuMTExIDEwNC4xNzcgMTA0LjE0MSAxMjcuMTQ3IDc1LjgwNTcgMTI3LjE0N0M0Ny40NzA1IDEyNy4xNDcgMjQuNTAwMiAxMDQuMTc3IDI0LjUgNzUuODQxOEMyNC41IDQ3Ljc3MjIgNDcuMDQxNCAyNC45NjczIDc1LjAwOTggMjQuNTQyQzc1LjMzMzggMjQuNTE1IDc1LjY2MjYgMjQuNSA3NS45OTYxIDI0LjVaTTYzLjY2NiA4MC44MjcxQzY0LjEwMTMgOTEuMTA3NyA2NS44NDk5IDEwMC4xNjIgNjguMzQ0NyAxMDYuNzg3QzY5Ljc5ODQgMTEwLjY0NyA3MS40MDk0IDExMy40MjQgNzIuOTQzNCAxMTUuMTQ3Qzc0LjQ4MTIgMTE2Ljg3NSA3NS41MjM1IDExNy4xMTEgNzUuOTk2MSAxMTcuMTExQzc2LjQ2ODcgMTE3LjExMSA3Ny41MTExIDExNi44NzUgNzkuMDQ4OCAxMTUuMTQ3QzgwLjU4MjcgMTEzLjQyNSA4Mi4xOTI4IDExMC42NDcgODMuNjQ2NSAxMDYuNzg3Qzg2LjE0MTMgMTAwLjE2MiA4Ny44OTE3IDkxLjEwNzcgODguMzI3MSA4MC44MjcxSDYzLjY2NlpNMzQuODAwOCA4MC44MjcxQzM2LjY0IDk2LjExMzMgNDYuODI1NiAxMDguODMgNjAuNjY5OSAxMTQuMjg1QzYwLjA2NjkgMTEzLjAxOCA1OS41MDUyIDExMS42ODggNTguOTg2MyAxMTAuMzExQzU2LjAwNjIgMTAyLjM5NyA1NC4wOTYyIDkyLjEwNTEgNTMuNjU2MiA4MC44MjcxSDM0LjgwMDhaTTk4LjMzNTkgODAuODI3MUM5Ny44OTU4IDkyLjEwNTIgOTUuOTg1IDEwMi4zOTcgOTMuMDA0OSAxMTAuMzExQzkyLjUxMiAxMTEuNjIgOTEuOTc4OSAxMTIuODg0IDkxLjQxMDIgMTE0LjA5NEMxMDUuMDE1IDEwOC41MzggMTE0Ljk5MiA5NS45Mzk4IDExNi44MTEgODAuODI3MUg5OC4zMzU5Wk02MC42Mjc5IDM3LjQxMzFDNDYuODEzNCA0Mi44NzM4IDM2LjY1MDMgNTUuNTY5IDM0LjgwMzcgNzAuODI3MUg1My42NTQzQzU0LjA5MSA1OS41MzIzIDU2LjAwMjUgNDkuMjI0OCA1OC45ODYzIDQxLjMwMDhDNTkuNDkzMyAzOS45NTQ1IDYwLjA0MDYgMzguNjU0MSA2MC42Mjc5IDM3LjQxMzFaTTc1LjY0OTQgMzQuNTM3MUM3NS4wOTE5IDM0LjY1MTUgNzQuMTc3MSAzNS4wNzgyIDcyLjk0MzQgMzYuNDYzOUM3MS40MDk0IDM4LjE4NjggNjkuNzk4NCA0MC45NjQgNjguMzQ0NyA0NC44MjQyQzY1Ljg0NjUgNTEuNDU4NiA2NC4wOTYzIDYwLjUyODggNjMuNjY0MSA3MC44MjcxSDg4LjMyOTFDODcuODk2NyA2MC41Mjg4IDg2LjE0NDggNTEuNDU4NiA4My42NDY1IDQ0LjgyNDJDODIuMTkyOCA0MC45NjQgODAuNTgyOCAzOC4xODY4IDc5LjA0ODggMzYuNDYzOUM3Ny44MzAxIDM1LjA5NSA3Ni45MjI3IDM0LjY2MjYgNzYuMzYzMyAzNC41NDJDNzYuMTc3NyAzNC41Mzk1IDc1Ljk5MTggMzQuNTM2MSA3NS44MDU3IDM0LjUzNjFDNzUuNzUzNiAzNC41MzYxIDc1LjcwMTUgMzQuNTM2OSA3NS42NDk0IDM0LjUzNzFaTTkxLjQ1MjEgMzcuNjA1NUM5Mi4wMDUzIDM4Ljc4ODUgOTIuNTIzOSA0MC4wMjM2IDkzLjAwNDkgNDEuMzAwOEM5NS45ODg4IDQ5LjIyNDkgOTcuOTAxIDU5LjUzMjIgOTguMzM3OSA3MC44MjcxSDExNi44MDhDMTE0Ljk4MiA1NS43NDI2IDEwNS4wMjcgNDMuMTY2MiA5MS40NTIxIDM3LjYwNTVaIiBmaWxsPSIjRTM4MUUzIi8+CjwvZz4KPGRlZnM+CjxjbGlwUGF0aCBpZD0iY2xpcDBfODFfMTMiPgo8cmVjdCB3aWR0aD0iMTUyIiBoZWlnaHQ9IjE1MiIgZmlsbD0id2hpdGUiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K",
        blocks: [
          {
            opcode: "play",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("start sound from url: [path]"),
            arguments: {
              path: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "https://extensions.turbowarp.org/meow.mp3",
              },
            },
          },
          {
            opcode: "playUntilDone",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("play sound from url: [path] until done"),
            arguments: {
              path: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "https://extensions.turbowarp.org/meow.mp3",
              },
            },
          },
        ],
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
