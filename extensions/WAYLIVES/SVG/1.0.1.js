// Name: SVG
// ID: WRsvg
// Description: Create SVG elements.
// By: WAYLIVES
// License: MIT

// Version: 1.0.1

(async function (Scratch) {
  const variables = {};
  const blocks = [];
  const menus = {};

  if (!Scratch.extensions.unsandboxed) {
    alert("This extension needs to be unsandboxed to run!");
    return;
  }

  function doSound(ab, cd, runtime) {
    const audioEngine = runtime.audioEngine;

    const fetchAsArrayBufferWithTimeout = (url) =>
      new Promise((resolve, reject) => {
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

    const soundPlayerCache = new Map();

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

    const playWithAudioEngine = async (url, target) => {
      const soundBank = target.sprite.soundBank;

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

    const playWithAudioElement = (url, target) =>
      new Promise((resolve, reject) => {
        const mediaElement = new Audio(url);

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

    playSound(ab, cd);
  }
  class Extension {
    getInfo() {
      return {
        id: "extensionID",
        name: "SVG",
        color1: "#9823FF",
        color2: "#7C2DC1",
        tbShow: true,
        blocks: blocks,
        menus: menus,
      };
    }
  }
  blocks.push({
    opcode: "svg",
    blockType: Scratch.BlockType.REPORTER,
    text: Scratch.translate(
      "SVG-frame  //  width: [WIDTH] height: [HEIGHT] elements in svg: [ELEMENTS]"
    ),
    arguments: {
      WIDTH: {
        type: Scratch.ArgumentType.NUMBER,
        defaultValue: "100",
      },
      HEIGHT: {
        type: Scratch.ArgumentType.NUMBER,
        defaultValue: "100",
      },
      ELEMENTS: {
        type: Scratch.ArgumentType.STRING,
        defaultValue: "<path ... />",
      },
    },
    disableMonitor: true,
    isEdgeActivated: false,
  });
  Extension.prototype["svg"] = async (args, util) => {
    variables["svgWidth"] = args["WIDTH"];
    variables["svgHeight"] = args["HEIGHT"];
    return (
      '<svg width=\"' +
      (args["WIDTH"] +
        ('\" height=\"' +
          (args["HEIGHT"] +
            ('\" viewBox=\"' +
              ("0 0 " +
                (args["WIDTH"] +
                  (" " +
                    (args["HEIGHT"] +
                      ('\" fill=\"' +
                        ("none" +
                          ('\" xmlns=\"' +
                            ("http://www.w3.org/2000/svg" +
                              ('\">' + args["ELEMENTS"]))))))))))))) +
      "</svg>"
    );
  };

  blocks.push({
    opcode: "line",
    blockType: Scratch.BlockType.REPORTER,
    text: Scratch.translate(
      "LINE  //  x1, y1: [XA][YA] x2, y2: [XB][YB] width: [WIDTH] color: [COLOR] opacity: [OPACITY]% dash, gap: [DASH][GAP] linecap: [LINECAP]"
    ),
    arguments: {
      XA: {
        type: Scratch.ArgumentType.NUMBER,
        defaultValue: "4",
      },
      YA: {
        type: Scratch.ArgumentType.NUMBER,
        defaultValue: "4",
      },
      XB: {
        type: Scratch.ArgumentType.NUMBER,
        defaultValue: "96",
      },
      YB: {
        type: Scratch.ArgumentType.NUMBER,
        defaultValue: "96",
      },
      WIDTH: {
        type: Scratch.ArgumentType.NUMBER,
        defaultValue: "8",
      },
      COLOR: {
        type: Scratch.ArgumentType.COLOR,
        defaultValue: "#ff0000",
      },
      OPACITY: {
        type: Scratch.ArgumentType.NUMBER,
        defaultValue: "100",
      },
      DASH: {
        type: Scratch.ArgumentType.NUMBER,
        defaultValue: "0",
      },
      GAP: {
        type: Scratch.ArgumentType.NUMBER,
        defaultValue: "0",
      },
      LINECAP: {
        type: Scratch.ArgumentType.STRING,
        menu: "LINECAPmenu",
      },
    },
    disableMonitor: true,
    isEdgeActivated: false,
  });
  Extension.prototype["line"] = async (args, util) => {
    return (
      '<line x1=\"' +
      (args["XA"] +
        ('\" y1=\"' +
          (args["YA"] +
            ('\" x2=\"' +
              (args["XB"] +
                ('\" y2=\"' +
                  (args["YB"] +
                    ('\" stroke-width=\"' +
                      (args["WIDTH"] +
                        ('\" stroke=\"' +
                          (args["COLOR"] +
                            ('\" stroke-dasharray=\"' +
                              (args["DASH"] +
                                (" " +
                                  (args["GAP"] +
                                    ('\" stroke-linecap=\"' +
                                      (args["LINECAP"] +
                                        ('\" stroke-opacity=\"' +
                                          (args["OPACITY"] / 100 +
                                            '\"'))))))))))))))))))) +
      "/>"
    );
  };

  blocks.push({
    opcode: "rect",
    blockType: Scratch.BlockType.REPORTER,
    text: Scratch.translate(
      "RECT  //  x, y: [X][Y] width: [WIDTH] height: [HEIGHT] radius: [RADIUS] fill color: [FILLCOLOR] fill opacity: [FILLOPACITY]% stroke width: [STROKEWIDTH] stroke color: [STROKECOLOR] stroke opacity: [STROKEOPACITY]% dash, gap: [DASH][GAP] stroke linecap: [LINECAP]"
    ),
    arguments: {
      X: {
        type: Scratch.ArgumentType.NUMBER,
        defaultValue: "4",
      },
      Y: {
        type: Scratch.ArgumentType.NUMBER,
        defaultValue: "4",
      },
      WIDTH: {
        type: Scratch.ArgumentType.NUMBER,
        defaultValue: "92",
      },
      HEIGHT: {
        type: Scratch.ArgumentType.NUMBER,
        defaultValue: "92",
      },
      RADIUS: {
        type: Scratch.ArgumentType.NUMBER,
        defaultValue: "20",
      },
      FILLCOLOR: {
        type: Scratch.ArgumentType.COLOR,
        defaultValue: "#ff0000",
      },
      FILLOPACITY: {
        type: Scratch.ArgumentType.NUMBER,
        defaultValue: "100",
      },
      STROKEWIDTH: {
        type: Scratch.ArgumentType.NUMBER,
        defaultValue: "8",
      },
      STROKECOLOR: {
        type: Scratch.ArgumentType.COLOR,
        defaultValue: "#000000",
      },
      STROKEOPACITY: {
        type: Scratch.ArgumentType.NUMBER,
        defaultValue: "100",
      },
      DASH: {
        type: Scratch.ArgumentType.NUMBER,
        defaultValue: "0",
      },
      GAP: {
        type: Scratch.ArgumentType.NUMBER,
        defaultValue: "0",
      },
      LINECAP: {
        type: Scratch.ArgumentType.STRING,
        menu: "LINECAPmenu",
      },
    },
    disableMonitor: true,
    isEdgeActivated: false,
  });
  Extension.prototype["rect"] = async (args, util) => {
    return (
      '<rect x=\"' +
      (args["X"] +
        ('\" y=\"' +
          (args["Y"] +
            ('\" width=\"' +
              (args["WIDTH"] +
                ('\" height=\"' +
                  (args["HEIGHT"] +
                    ('\" rx=\"' +
                      (args["RADIUS"] +
                        ('\" fill=\"' +
                          (args["FILLCOLOR"] +
                            ('\" fill-opacity=\"' +
                              (args["FILLOPACITY"] / 100 +
                                ('\" stroke-width=\"' +
                                  (args["STROKEWIDTH"] +
                                    ('\" stroke=\"' +
                                      (args["STROKECOLOR"] +
                                        ('\" stroke-opacity=\"' +
                                          (args["STROKEOPACITY"] / 100 +
                                            ('\" stroke-dasharray=\"' +
                                              (args["DASH"] +
                                                (" " + args["GAP"]) +
                                                ('\" stroke-linecap=\"' +
                                                  (args["LINECAP"] +
                                                    '\"'))))))))))))))))))))))) +
      "/>"
    );
  };

  blocks.push({
    opcode: "ellipse",
    blockType: Scratch.BlockType.REPORTER,
    text: Scratch.translate(
      "ELLIPSE  //  cx, cy: [CX][CY] width: [WIDTH] height: [HEIGHT] fill color: [FILLCOLOR] fill opacity: [FILLOPACITY]% stroke width: [STROKEWIDTH] stroke color: [STROKECOLOR] stroke opacity: [STROKEOPACITY]% dash, gap: [DASH][GAP] stroke linecap: [LINECAP]"
    ),
    arguments: {
      CX: {
        type: Scratch.ArgumentType.NUMBER,
        defaultValue: "50",
      },
      CY: {
        type: Scratch.ArgumentType.NUMBER,
        defaultValue: "50",
      },
      WIDTH: {
        type: Scratch.ArgumentType.NUMBER,
        defaultValue: "92",
      },
      HEIGHT: {
        type: Scratch.ArgumentType.NUMBER,
        defaultValue: "92",
      },
      FILLCOLOR: {
        type: Scratch.ArgumentType.COLOR,
        defaultValue: "#ff0000",
      },
      FILLOPACITY: {
        type: Scratch.ArgumentType.NUMBER,
        defaultValue: "100",
      },
      STROKEWIDTH: {
        type: Scratch.ArgumentType.NUMBER,
        defaultValue: "8",
      },
      STROKECOLOR: {
        type: Scratch.ArgumentType.COLOR,
        defaultValue: "#000000",
      },
      STROKEOPACITY: {
        type: Scratch.ArgumentType.NUMBER,
        defaultValue: "100",
      },
      DASH: {
        type: Scratch.ArgumentType.NUMBER,
        defaultValue: "0",
      },
      GAP: {
        type: Scratch.ArgumentType.NUMBER,
        defaultValue: "0",
      },
      LINECAP: {
        type: Scratch.ArgumentType.STRING,
        menu: "LINECAPmenu",
      },
    },
    disableMonitor: true,
    isEdgeActivated: false,
  });
  Extension.prototype["ellipse"] = async (args, util) => {
    return (
      '<ellipse cx=\"' +
      (args["CX"] +
        ('\" cy=\"' +
          (args["CY"] +
            ('\" rx=\"' +
              (args["WIDTH"] / 2 +
                ('\" ry=\"' +
                  (args["HEIGHT"] / 2 +
                    ('\" fill=\"' +
                      (args["FILLCOLOR"] +
                        ('\" fill-opacity=\"' +
                          (args["FILLOPACITY"] / 100 +
                            ('\" stroke-width=\"' +
                              (args["STROKEWIDTH"] +
                                ('\" stroke=\"' +
                                  (args["STROKECOLOR"] +
                                    ('\" stroke-opacity=\"' +
                                      (args["STROKEOPACITY"] / 100 +
                                        ('\" stroke-dasharray=\"' +
                                          (args["DASH"] +
                                            (" " + args["GAP"]) +
                                            ('\" stroke-linecap=\"' +
                                              (args["LINECAP"] +
                                                '\"'))))))))))))))))))))) +
      "/>"
    );
  };

  0 + 0;

  blocks.push({
    opcode: "svgWidth",
    blockType: Scratch.BlockType.REPORTER,
    text: Scratch.translate("svg width"),
    arguments: {},
    disableMonitor: true,
    isEdgeActivated: false,
  });
  Extension.prototype["svgWidth"] = async (args, util) => {
    return variables["svgWidth"];
  };

  blocks.push({
    opcode: "svgHeight",
    blockType: Scratch.BlockType.REPORTER,
    text: Scratch.translate("svg height"),
    arguments: {},
    disableMonitor: true,
    isEdgeActivated: false,
  });
  Extension.prototype["svgHeight"] = async (args, util) => {
    return variables["svgHeight"];
  };

  menus["LINECAPmenu"] = {
    acceptReporters: true,
    items: ["round", "butt", "square"],
  };

  Scratch.extensions.register(new Extension());
})(Scratch);
