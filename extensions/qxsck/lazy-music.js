// Name: Lazy Music
// ID: qxscklazymusic
// Description: Some blocks about lazyload music.
// By: qxsck
// License: MIT

(function (Scratch) {
  "use strict";
  const Icon =
    "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI3OS4xNjY2NyIgaGVpZ2h0PSI3OS4xNjY2NyIgdmlld0JveD0iMCwwLDc5LjE2NjY3LDc5LjE2NjY3Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjAwLjQxNjY3LC0xNDAuNDE2NjcpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGZpbGwtb3BhY2l0eT0iMCIgZmlsbD0iIzAwMDAwMCIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiLz48cGF0aCBkPSIiIGZpbGwtb3BhY2l0eT0iMCIgZmlsbD0iIzAwMDAwMCIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIiLz48cGF0aCBkPSJNMjAwLjY2NjY3LDE4MGMwLC0yMS43MjMyIDE3LjYxMDEzLC0zOS4zMzMzMyAzOS4zMzMzMywtMzkuMzMzMzNjMjEuNzIzMiwwIDM5LjMzMzMzLDE3LjYxMDEzIDM5LjMzMzMzLDM5LjMzMzMzYzAsMjEuNzIzMiAtMTcuNjEwMTMsMzkuMzMzMzMgLTM5LjMzMzMzLDM5LjMzMzMzYy0yMS43MjMyLDAgLTM5LjMzMzMzLC0xNy42MTAxMyAtMzkuMzMzMzMsLTM5LjMzMzMzeiIgZmlsbD0iIzczY2NmZiIgc3Ryb2tlPSIjNzNjY2ZmIiBzdHJva2Utd2lkdGg9IjAuNSIvPjxwYXRoIGQ9Ik0yMzAuNTQyLDE5Ny41MjI0NmMwLjI4MjM2LDQuMTQyMzYgMC42Nzc2Niw5LjcwNjQ3IC00LjA2MjYzLDExLjIxNzkxYy00Ljc0MDI5LDEuNTExNDUgLTkuOTMyMzYsLTEuMDYyOTkgLTEwLjE5ODEsLTUuOTI2MTljLTAuMTQwNTgsLTIuNjA2OTMgLTAuMDc4NCwtOS4zMjM5MyAtMC4xMTY4NiwtOS4zNjkxN2MtMS40ODkwNiwtMS43NTExNCAtMS41Mjc3LC0zLjYwODgyIC0yLjcxMjI1LC01LjUxODI5Yy0xLjE4NDU1LC0xLjkwOTQ3IC0yLjI0MzM2LC05LjE0NjE4IC0xLjI5MjIsLTEzLjQzNjkxYzAuOTU4OTEsLTQuMzI1NyAzLjI4MDQ0LC05LjIxNDgzIDUuNzA1MzksLTEyLjgwOTA4YzIuNDI0OTYsLTMuNTk0MjUgNS42MTMyOCwtNS41OTA2OSA5LjI3MDY1LC03Ljg2OTQ4YzMuNjU3MzcsLTIuMjc4NzkgOC4yMjI3MSwtMi41ODk0OSAxMi43MDcyMSwtMi41OTYxNGM0LjQ4NDUxLC0wLjAwNjY0IDkuNzg3MywwLjgwNzg3IDEzLjQ3NDU2LDMuMDQ2OGMzLjY4NzI2LDIuMjM4OTMgNy4xNzQxLDQuODk5NzQgOS42OTU0LDguNDY0MDljMi41MjEyOSwzLjU2NDM1IDQuOTU2NzgsNy45MDA0OCA1LjQ1MTc0LDEyLjMxODU1YzAuNDkxNjMsNC40MTgwNyAtMC4xODc3LDEwLjMxNTQ4IC0xLjgxODczLDEyLjkzNDIxYy0wLjkzMjUzLDEuNDgwNzMgLTEuMjgxMzcsMi41NDM5IC0yLjg2MzM2LDQuMjY0MDhjLTAuMDI1MTUsMC4wMjczNCAtMC4yMTk0MSw3LjEwOCAtMC4zNTQ0MSwxMC4yNjI0Yy0wLjIwOTI4LDQuODg5NzcgLTUuMDE5MzMsNy43MiAtOS45NzIyMiw2LjMxODE3Yy00Ljk1NjIxLC0xLjM5ODUgLTQuNjAwNzcsLTcuMDU4OTUgLTQuMzExNzcsLTExLjMwMDk2YzAuMTY5NDEsLTAuOTQzNDEgMC4xNTYxMywtMS43MDA3OSAwLC0yLjY1NzQ5Yy0wLjIwOTI4LC0zLjg2MzMyIC0xLjQ5NDg0LC04LjMxNzkzIDIuNTU3ODMsLTEwLjcyOTZjNC4wNDkzNCwtMi40MTQ5OSA3LjU0Mzk0LC0wLjkzMzQ0IDEwLjcyOTYsMS43NjA1OGM0LjU5NzQ1LC0xNC44NTUzNSAtNy41NDA2MSwtMzAuMzY4NDIgLTIyLjU4ODYzLC0zMC4yMjg5Yy0xNS4wNDgwMiwwLjEzOTUyIC0yNi44OTcwOCwxNS41NDI5NyAtMjIuNTg4NjMsMzAuMjI4OWMyLjk1NjQ1LC0yLjYwNzY2IDYuNzMzNDEsLTQuMTYyMjkgMTAuNTI2OTcsLTEuODkwMTRjMy43OTY4OCwyLjI2ODgzIDMuODAwMiw2Ljk5MjUxIDIuNzYwNDYsMTAuODU5MTVjLTAuMTUyOCwwLjkzNjc3IC0wLjE3Mjc0LDEuNjk0MTUgMCwyLjY1NzQ5IiBmaWxsPSIjYWRhMGZmIiBzdHJva2U9IiNiYWFmZmYiIHN0cm9rZS13aWR0aD0iMC41Ii8+PHBhdGggZD0iTTI1MC40Njk4MiwxNjIuMjA4MTJjLTAuOTEzNTEsLTAuNTM0ODIgMC4wNDMxOSwtMi4xMjI2NyAwLjk5OTg4LC0xLjY1NzYxYzAuOTM2NzcsMC40NTUxIC0wLjA4NjM3LDIuMTkyNDMgLTAuOTk5ODgsMS42NTc2MXoiIGZpbGw9IiNhZGEwZmYiIHN0cm9rZT0iI2JhYWZmZiIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48cGF0aCBkPSJNMjQ3LjQ3OTA0LDE1OC45NzcwNmMxLjcyNDA0LDEuNDM1MDQgMC43MjYzOCwyLjg3NDUyIC0wLjk3MTA5LDEuODAxNTZjLTEuNzAwNzksLTEuMDY5NjQgLTQuMTgxMTEsLTEuNTkyMjggLTYuMDUxMzIsLTEuNDY5MzdjLTEuODczNTMsMC4xMTk1OSAtNS45Njc1LDAuODU2ODkgLTkuNTE3MTIsMi44ODQ0OGMtMy41NDk2MiwyLjAyNzU5IC02LjY4MTQyLDguNDE5MDYgLTguOTAwMzYsNy4xODUxOGMtMS40Njg0MSwtMC44MTY1NCAzLjY2MzU3LC03LjE2NzM3IDcuNTMyODcsLTkuMTM0YzMuODY5MywtMS45NjY2MyA2LjQwODUzLC0zLjAwODg0IDEwLjcxOTk0LC0zLjE1MjYyYzMuMzQwNTYsMC4wMjcyNyA2LjI0MDc0LDEuMDkzNzIgNy4xODcwOCwxLjg4NDc4eiIgZmlsbD0iI2FkYTBmZiIgc3Ryb2tlPSIjYmFhZmZmIiBzdHJva2Utd2lkdGg9IjAuNSIvPjxwYXRoIGQ9Ik0yMjYuOTU0MzksMTk2LjM2MDE0Yy0wLjAyNjU3LDIuMzQ1MjMgMC40NDE4MSw4LjI4ODAzIC0zLjY2NDAxLDguMjk0NjhjLTMuMzc3MzcsLTAuMTI2MjMgLTMuNzI5NjIsLTQuMzQ1ODcgLTMuNjQ0MDgsLTguMjI4MjRjMC4wODQxMywtMy44MTgwMyAtMC4xMTk2MSwtOC42OTQwOSAzLjc4NjkyLC04LjcwMzI3YzMuODQwMDcsLTAuMTIyOTEgMy41NDY5OSw2LjM1NzgzIDMuNTIxMTcsOC42MzY4M3oiIGZpbGw9IiNmYmZhZmIiIHN0cm9rZT0iI2ZiZmFmYiIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48cGF0aCBkPSJNMjM4LjE5OTY3LDIwMS44OTc2N2MtMi4wODM1MywwLjA0NjUxIC0xLjg3OSwtMTMuNDQ2ODggMC4wNzE5MiwtMTMuMzkzNzNjMi4wMzE2MywwLjA1NTM1IDIuMDExNjEsMTMuMzQ3MjIgLTAuMDcxOTIsMTMuMzkzNzN6IiBmaWxsPSIjYjJlM2ZmIiBzdHJva2U9IiNiMmUzZmYiIHN0cm9rZS13aWR0aD0iMC4yNSIvPjxwYXRoIGQ9Ik0yNDIuMTM0NzYsMjAwLjM0ODVjLTEuNDQ5ODIsMC4wMzIzNiAtMS4zMDc1LC05LjM1Njk4IDAuMDUwMDUsLTkuMzE5OTljMS40MTM3MSwwLjAzODUxIDEuMzk5NzgsOS4yODc2MyAtMC4wNTAwNSw5LjMxOTk5eiIgZmlsbD0iI2IyZTNmZiIgc3Ryb2tlPSIjYjJlM2ZmIiBzdHJva2Utd2lkdGg9IjAuMjUiLz48cGF0aCBkPSJNMjM0LjM2MTYxLDIwMC4zNDg1Yy0xLjQ0OTgyLDAuMDMyMzYgLTEuMzA3NDksLTkuMzU2OTggMC4wNTAwNSwtOS4zMTk5OWMxLjQxMzcxLDAuMDM4NTEgMS4zOTk3Nyw5LjI4NzYzIC0wLjA1MDA1LDkuMzE5OTl6IiBmaWxsPSIjYjJlM2ZmIiBzdHJva2U9IiNiMmUzZmYiIHN0cm9rZS13aWR0aD0iMC4yNSIvPjxwYXRoIGQ9Ik0yNDUuNjkzNjcsMjAxLjQzMjYzYy0xLjc4MzgyLDAuMDM5ODIgLTEuNjA4NzEsLTExLjUxMjYgMC4wNjE1OCwtMTEuNDY3MDljMS43MzkzOSwwLjA0NzM5IDEuNzIyMjUsMTEuNDI3MjggLTAuMDYxNTgsMTEuNDY3MDl6IiBmaWxsPSIjYjJlM2ZmIiBzdHJva2U9IiNiMmUzZmYiIHN0cm9rZS13aWR0aD0iMC4yNSIvPjxwYXRoIGQ9Ik0yNTkuOTA3MjEsMTk2LjM2MDE0Yy0wLjAyNjU3LDIuMzQ1MjMgMC40NDE4MSw4LjI4ODAzIC0zLjY2NDAxLDguMjk0NjhjLTMuMzc3MzcsLTAuMTI2MjMgLTMuNzI5NjIsLTQuMzQ1ODcgLTMuNjQ0MDgsLTguMjI4MjRjMC4wODQxMywtMy44MTgwMyAtMC4xMTk2MSwtOC42OTQwOSAzLjc4NjkyLC04LjcwMzI3YzMuODQwMDcsLTAuMTIyOTEgMy41NDY5OSw2LjM1NzgzIDMuNTIxMTcsOC42MzY4M3oiIGZpbGw9IiNmYmZhZmIiIHN0cm9rZT0iI2ZiZmFmYiIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L2c+PC9nPjwvc3ZnPjwhLS1yb3RhdGlvbkNlbnRlcjozOS41ODMzMzMzMzMzMzMyMzozOS41ODMzMzMzMzMzMzM0LS0+";
  class MusicExtension {
    constructor() {
      this.sounds = Object.create(null);
      this.soundExample = {
        audio: null,
        loaded: false,
        isPlaying: false,
        ended: false,
        pause: false,
      };
    }

    getInfo() {
      return {
        id: "qxscklazymusic",
        name: Scratch.translate("Lazy Music"),
        color1: "#73ccff",
        color2: "#73ccff",
        color3: "#73ccff",
        blockIconURI: Icon,
        menuIconURI: Icon,
        blocks: [
          {
            opcode: "loadSound",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "load music from URL [URL] and name it [NAME]"
            ),
            arguments: {
              URL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "https://extensions.turbowarp.org/meow.mp3",
              },
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "sound",
              },
            },
          },
          {
            opcode: "playSound",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("play music [NAME]"),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "sound",
              },
            },
          },
          {
            opcode: "playSoundAndWait",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("play music [NAME] and wait"),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "sound",
              },
            },
          },
          {
            opcode: "doSound",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("[TYPE] music [NAME]"),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "sound",
              },
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "do.List",
              },
            },
          },
          {
            opcode: "doAllSounds",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("[TYPE] all musics"),
            arguments: {
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "do.List",
              },
            },
          },
          {
            opcode: "soundDataBoolean",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("music [NAME] is [TYPE] ?"),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "sound",
              },
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "dataBoolean.List",
              },
            },
          },
          {
            opcode: "soundData",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("[TYPE] of music [NAME]"),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "sound",
              },
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "data.List",
              },
            },
          },
          {
            opcode: "setSound",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set [TYPE] of music [NAME] to [NUM]"),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "sound",
              },
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "canChangedata.List",
              },
              NUM: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100,
              },
            },
          },
          {
            opcode: "goSoundSeconds",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("go to [TIME] seconds of music [NAME]"),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "sound",
              },
              TIME: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
            },
          },
        ],
        menus: {
          "data.List": [
            {
              text: "URL",
              value: "URL",
            },
            {
              text: Scratch.translate("duration"),
              value: "duration",
            },
            {
              text: Scratch.translate("current time"),
              value: "currentTime",
            },
            {
              text: Scratch.translate("volume(%)"),
              value: "volume",
            },
            {
              text: Scratch.translate("play speed"),
              value: "speed",
            },
          ],
          "dataBoolean.List": [
            {
              text: Scratch.translate("loaded"),
              value: "loaded",
            },
            {
              text: Scratch.translate("playing"),
              value: "playing",
            },
            {
              text: Scratch.translate("ended"),
              value: "ended",
            },
            {
              text: Scratch.translate("pause"),
              value: "pause",
            },
          ],
          "do.List": [
            {
              text: Scratch.translate("pause"),
              value: "pause",
            },
            {
              text: Scratch.translate("ended"),
              value: "ended",
            },
          ],
          "canChangedata.List": [
            {
              text: Scratch.translate("volume(%)"),
              value: "volume",
            },
            {
              text: Scratch.translate("play speed"),
              value: "speed",
            },
          ],
        },
      };
    }

    ensureSoundLoaded(name) {
      return new Promise((resolve, reject) => {
        const sound = this.sounds[name];
        if (sound["loaded"]) {
          resolve();
        } else {
          const audio = sound["audio"];
          const onLoad = () => {
            audio.removeEventListener("canplay", onLoad);
            sound["loaded"] = true;
            resolve();
          };
          audio.addEventListener("canplay", onLoad);
        }
      });
    }

    isAudioFile(url) {
      const type = [".mp3", ".wav", ".ogg"];
      const urlType = url.substr(url.lastIndexOf("."));
      return type.includes(urlType.toLowerCase());
    }

    loadSound(args) {
      let name = Scratch.Cast.toString(args.NAME),
        url = Scratch.Cast.toString(args.URL);
      if (!this.isAudioFile(url)) return;

      if (this.sounds[name]) {
        const sound1 = this.sounds[name];
        sound1["audio"].pause();
        sound1["audio"].volume = 1;
        sound1["audio"].currentTime = 0;
      }
      this.sounds[name] = Object.assign({}, this.soundExample);
      const sound = this.sounds[name];
      sound["audio"] = new Audio(url);
      sound["audio"].addEventListener("canplay", () => {
        sound["loaded"] = true;
      });
      sound["audio"].volume = 0;
      sound["audio"]
        .play()
        .then(() => {
          sound["audio"].pause();
          sound["audio"].volume = 1;
          sound["audio"].currentTime = 0;
        })
        .catch((error) => {
          console.error("Auto play failed:", error);
        });
    }
    playSound(args) {
      try {
        let name = Scratch.Cast.toString(args.NAME);
        if (name in this.sounds) {
          const sound = this.sounds[name];
          if (sound["loaded"]) {
            if (!sound["isPlaying"]) {
              const onEnded = () => {
                sound["audio"].removeEventListener("ended", onEnded);
                sound["ended"] = true;
                sound["isPlaying"] = false;
              };
              const onPause = () => {
                sound["audio"].removeEventListener("pause", onPause);
                sound["pause"] = true;
                sound["isPlaying"] = false;
              };
              sound["audio"].addEventListener("ended", onEnded);
              sound["audio"].addEventListener("pause", onPause);
              sound["ended"] = false;
              sound["pause"] = false;
              sound["audio"].play();
              sound["isPlaying"] = true;
            }
          } else {
            console.log("Sound not loaded yet");
          }
        }
      } catch (error) {
        console.error("Error playing sound:", error);
      }
    }
    async playSoundAndWait(args) {
      try {
        let name = Scratch.Cast.toString(args.NAME);
        if (!(name in this.sounds)) {
          console.error("Sound not found:", name);
          return;
        }
        await this.ensureSoundLoaded(name);
        return new Promise((resolve, reject) => {
          const sound = this.sounds[name];
          if (!sound["isPlaying"]) {
            const onEnded = () => {
              sound["audio"].removeEventListener("ended", onEnded);
              sound["ended"] = true;
              sound["isPlaying"] = false;
              resolve();
            };
            const onPause = () => {
              sound["audio"].removeEventListener("pause", onPause);
              sound["pause"] = true;
              sound["isPlaying"] = false;
              resolve();
            };
            sound["audio"].addEventListener("ended", onEnded);
            sound["audio"].addEventListener("pause", onPause);
            sound["ended"] = false;
            sound["pause"] = false;
            sound["audio"].play();
            sound["isPlaying"] = true;
          }
        });
      } catch (error) {
        console.error("Error playing sound:", error);
      }
    }
    doSound(args) {
      let name = Scratch.Cast.toString(args.NAME);
      let do_ = args.TYPE === "ended" ? true : false;
      const sound = this.sounds[name];
      if (sound && sound["audio"] && sound["isPlaying"]) {
        sound["audio"].pause();
        if (do_) (sound["audio"].currentTime = 0), (sound["ended"] = true);
        else sound["pause"] = true;
        sound["isPlaying"] = false;
      }
    }
    doAllSounds(args) {
      let do_ = args.TYPE === "ended" ? true : false;
      Object.keys(this.sounds).forEach((name) => {
        const sound = this.sounds[name];
        if (sound["audio"] && sound["isPlaying"]) {
          sound["audio"].pause();
          if (do_) (sound["audio"].currentTime = 0), (sound["ended"] = true);
          else sound["pause"] = true;
          sound["isPlaying"] = false;
        }
      });
    }
    soundDataBoolean(args) {
      let name = Scratch.Cast.toString(args.NAME);
      const sound = this.sounds[name];
      if (sound && sound["audio"]) {
        if (args.TYPE === "loaded") {
          return sound["loaded"];
        } else if (args.TYPE === "playing") {
          return sound["isPlaying"];
        } else if (args.TYPE === "ended") {
          return sound["ended"];
        } else if (args.TYPE === "pause") {
          return sound["pause"];
        }
      } else return false;
    }
    soundData(args) {
      let name = Scratch.Cast.toString(args.NAME);
      const sound = this.sounds[name];
      if (sound && sound["audio"]) {
        if (args.TYPE === "URL") {
          return sound["audio"].src;
        } else if (args.TYPE === "duration") {
          return sound["audio"].duration;
        } else if (args.TYPE === "currentTime") {
          return sound["audio"].currentTime;
        } else if (args.TYPE === "volume") {
          return Scratch.Cast.toString(Math.round(sound["audio"].volume * 100));
        } else if (args.TYPE === "speed") {
          return sound["audio"].playbackRate;
        }
      } else return "0";
    }
    setSound(args) {
      let name = Scratch.Cast.toString(args.NAME);
      let data = Scratch.Cast.toNumber(args.NUM);
      const sound = this.sounds[name];
      if (sound && sound["audio"]) {
        if (args.TYPE === "volume") {
          data = Math.min(100, Math.max(0, data));
          sound["audio"].volume = data / 100;
        } else if (args.TYPE === "speed") {
          data = Math.min(2, Math.max(0.5, data));
          sound["audio"].playbackRate = data;
        }
      }
    }
    goSoundSeconds(args) {
      let name = Scratch.Cast.toString(args.NAME);
      let time = Scratch.Cast.toNumber(args.TIME);
      const sound = this.sounds[name];
      if (sound && sound["audio"]) {
        const totalDuration = sound["audio"].duration;
        if (time > totalDuration) {
          sound["audio"].pause();
          sound["audio"].currentTime = 0;
          sound["isPlaying"] = false;
        } else {
          sound["audio"].currentTime = time;
        }
      }
    }
  }

  Scratch.extensions.register(new MusicExtension());
})(Scratch);
