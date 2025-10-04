// Name: Face Sensing
// ID: faceSensing
// Description: Compatible with Scratch Lab's Face Sensing experiment.
// License: MPL-2.0

(async function (Scratch) {
  "use strict";

  const initializeDetector = async () => {
    // TODO: this is awful
    await import("https://cdn.jsdelivr.net/npm/@mediapipe/face_detection");
    await import("https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-core");
    await import("https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-webgl");
    await import(
      "https://cdn.jsdelivr.net/npm/@tensorflow-models/face-detection"
    );
    const faceDetection = window.faceDetection;

    return faceDetection.createDetector(
      faceDetection.SupportedModels.MediaPipeFaceDetector,
      {
        runtime: "mediapipe",
        // TODO: this is also awful
        solutionPath: "https://cdn.jsdelivr.net/npm/@mediapipe/face_detection",
      }
    );
  };

  /**
   * @typedef {'rightEye'|'leftEye'|'noseTip'|'mouthCenter'|'rightEarTragion'|'leftEarTragion'} KeypointName
   */

  /**
   * @typedef BlazefaceFace
   * @property {{height: number, width: number, xMax: number, xMin: number, yMax: number, yMin: number}} box
   * @property {Array<{x: number, y: number, name: KeypointName}>} keypoints
   */

  /**
   * @typedef Face
   * @property {number[]} nose Scratch coordinate
   * @property {number[]} mouth Scratch coordinate
   * @property {number[]} leftEye Scratch coordinate
   * @property {number[]} rightEye Scratch coordinate
   * @property {number[]} betweenEyes Scratch coordinate
   * @property {number[]} leftEar Scratch coordinate
   * @property {number[]} rightEar Scratch coordinate
   * @property {number[]} topOfHead Scratch coordinate
   * @property {number} size Scratch size
   * @property {number} tilt Scratch direction
   */

  /** @type {Face|null} */
  let lastFace = null;
  let isFaceCurrentlyDetected = false;
  let isEstimationInFlight = false;

  /**
   * @param {number} x Coordinate in video space (horizontally flipped)
   * @param {number} y Coordinate in video space
   * @returns {number[]} x, y in Scratch space
   */
  const videoSpaceToScratchSpace = (x, y) => [240 - x, 180 - y];

  /**
   * @param {BlazefaceFace} blazefaceFace
   */
  const updateFace = (blazefaceFace) => {
    /**
     * @param {KeypointName} name
     * @returns {number[]} x, y in Scratch space
     */
    const getKeyPointInScratchSpace = (name) => {
      const keypoint = blazefaceFace.keypoints.find((i) => i.name === name);
      return videoSpaceToScratchSpace(keypoint.x, keypoint.y);
    };

    const nose = getKeyPointInScratchSpace("noseTip");
    const mouth = getKeyPointInScratchSpace("mouthCenter");
    const rightEye = getKeyPointInScratchSpace("rightEye");
    const leftEye = getKeyPointInScratchSpace("leftEye");
    const betweenEyes = [
      (rightEye[0] + leftEye[0]) / 2,
      (rightEye[1] + leftEye[1]) / 2,
    ];
    const leftEar = getKeyPointInScratchSpace("leftEarTragion");
    const rightEar = getKeyPointInScratchSpace("rightEarTragion");
    const topOfHead = [0, 0];

    const size = Math.round(blazefaceFace.box.width * 1.25);

    const tiltRadians = Math.atan2(
      rightEar[1] - leftEar[1],
      rightEar[0] - leftEar[0]
    );
    const tilt = Math.round(90 - (tiltRadians * 180) / Math.PI);

    lastFace = {
      nose,
      mouth,
      rightEar,
      leftEar,
      betweenEyes,
      leftEye,
      rightEye,
      topOfHead,
      size,
      tilt,
    };
  };

  const estimationLoop = () => {
    if (isEstimationInFlight) {
      return;
    }

    const frame = videoDevice.getFrame({
      format: "canvas",
    });
    if (!frame) {
      isFaceCurrentlyDetected = false;
      return;
    }

    isEstimationInFlight = true;
    detector
      .estimateFaces(frame, {
        flipHorizontal: true,
      })
      .then((faces) => {
        isEstimationInFlight = false;
        if (faces.length > 0) {
          isFaceCurrentlyDetected = true;
          updateFace(faces[0]);
        } else {
          isFaceCurrentlyDetected = false;
        }
      })
      .catch((error) => {
        console.error(error);
        isEstimationInFlight = false;
        isFaceCurrentlyDetected = false;
      });
  };

  const videoDevice = Scratch.vm.runtime.ioDevices.video;
  const renderer = Scratch.vm.renderer;

  const detector = await initializeDetector();
  Scratch.vm.runtime.on("AFTER_EXECUTE", estimationLoop);

  /**
   * @param {unknown} part Part from Scratch blocks
   * @returns {number[]|null}
   */
  const getPart = (part) => {
    part = Scratch.Cast.toNumber(part);
    if (part === 0) {
      return lastFace.leftEye;
    } else if (part === 1) {
      return lastFace.rightEye;
    } else if (part === 2) {
      return lastFace.nose;
    } else if (part === 3) {
      return lastFace.mouth;
    } else if (part === 4) {
      return lastFace.leftEar;
    } else if (part === 5) {
      return lastFace.rightEar;
    } else if (part === 6) {
      return lastFace.betweenEyes;
    } else if (part === 7) {
      return lastFace.topOfHead;
    } else {
      return null;
    }
  };

  class FaceSensing {
    constructor() {
      videoDevice.enableVideo();
    }

    getInfo() {
      return {
        id: "faceSensing",
        name: Scratch.translate("Face Sensing"),

        blocks: [
          {
            opcode: "goToPart",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("go to [PART]"),
            arguments: {
              PART: {
                type: Scratch.ArgumentType.STRING,
                menu: "part",
              },
            },
          },

          {
            blockType: Scratch.BlockType.COMMAND,
            opcode: "pointInFaceTiltDirection",
            text: Scratch.translate("point in direction of face tilt"),
          },

          {
            blockType: Scratch.BlockType.COMMAND,
            opcode: "setSizeToFaceSize",
            text: Scratch.translate("set size to face size"),
          },

          "---",

          {
            blockType: Scratch.BlockType.HAT,
            isEdgeActivated: true,
            opcode: "whenTilted",
            text: Scratch.translate("when face tilts [DIRECTION]"),
            arguments: {
              DIRECTION: {
                type: Scratch.ArgumentType.STRING,
                menu: "direction",
              },
            },
          },

          {
            blockType: Scratch.BlockType.HAT,
            isEdgeActivated: true,
            opcode: "whenSpriteTouchesPart",
            text: Scratch.translate("when this sprite touches a [PART]"),
            arguments: {
              PART: {
                type: Scratch.ArgumentType.STRING,
                menu: "part",
              },
            },
          },

          {
            blockType: Scratch.BlockType.HAT,
            isEdgeActivated: true,
            opcode: "whenFaceDetected",
            text: Scratch.translate("when a face is detected"),
          },

          "---",

          {
            blockType: Scratch.BlockType.BOOLEAN,
            opcode: "faceIsDetected",
            text: Scratch.translate("a face is detected?"),
            disableMonitor: true, // parity with Scratch Lab
          },

          {
            blockType: Scratch.BlockType.REPORTER,
            opcode: "faceTilt",
            text: Scratch.translate("face tilt"),
          },

          {
            blockType: Scratch.BlockType.REPORTER,
            opcode: "faceSize",
            text: Scratch.translate("face size"),
          },
        ],

        menus: {
          // These menus were all designed to be compatible with Scratch Lab
          // That's why no reporters and why the values are somewhat arbitrary
          part: {
            acceptReporters: false,
            items: [
              {
                text: Scratch.translate("nose"),
                value: "2",
              },
              {
                text: Scratch.translate("mouth"),
                value: "3",
              },
              {
                text: Scratch.translate("left eye"),
                value: "0",
              },
              {
                text: Scratch.translate("right eye"),
                value: "1",
              },
              {
                text: Scratch.translate("between eyes"),
                value: "6",
              },
              {
                text: Scratch.translate("left ear"),
                value: "4",
              },
              {
                text: Scratch.translate("right ear"),
                value: "5",
              },
              {
                text: Scratch.translate("top of head"),
                value: "7",
              },
            ],
          },

          direction: {
            acceptReporters: false, // compatibility with Scratch Lab
            items: [
              {
                text: Scratch.translate("left"),
                value: "left",
              },
              {
                text: Scratch.translate("right"),
                value: "right",
              },
            ],
          },
        },
      };
    }

    goToPart(args, util) {
      if (!isFaceCurrentlyDetected) {
        return;
      }

      const part = getPart(args.PART);
      if (!part) {
        return;
      }

      util.target.setXY(part[0], part[1]);
    }

    pointInFaceTiltDirection(args, util) {
      if (isFaceCurrentlyDetected) {
        util.target.setDirection(lastFace.tilt);
      }
    }

    setSizeToFaceSize(args, util) {
      if (isFaceCurrentlyDetected) {
        util.target.setSize(lastFace.size);
      }
    }

    whenTilted(args, util) {
      if (!isFaceCurrentlyDetected) {
        return false;
      }

      const direction = Scratch.Cast.toString(args.DIRECTION);
      if (direction === "left") {
        return lastFace.tilt < 80;
      } else if (direction === "right") {
        return lastFace.tilt > 100;
      } else {
        return false;
      }
    }

    whenSpriteTouchesPart(args, util) {
      if (!isFaceCurrentlyDetected) {
        return false;
      }

      const part = getPart(args.PART);
      if (!part) {
        return false;
      }

      const drawable = renderer._allDrawables[util.target.drawableID];
      if (!drawable) {
        return false;
      }

      drawable.updateCPURenderAttributes();
      return drawable.isTouching(part);
    }

    whenFaceDetected() {
      return isFaceCurrentlyDetected;
    }

    faceIsDetected() {
      return isFaceCurrentlyDetected;
    }

    faceTilt() {
      return lastFace ? lastFace.tilt : 0;
    }

    faceSize() {
      return lastFace ? lastFace.size : 0;
    }
  }

  Scratch.extensions.register(new FaceSensing());
})(Scratch);
