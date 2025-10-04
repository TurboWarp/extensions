// Name: Face Sensing
// ID: faceSensing
// Description: Compatible with Scratch Lab's Face Sensing experiment.
// License: MPL-2.0

(async function (Scratch) {
  "use strict";

  const initializeDetector = async () => {
    // TODO: this is awful
    await import('https://cdn.jsdelivr.net/npm/@mediapipe/face_detection');
    await import('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-core');
    await import('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-backend-webgl');
    await import('https://cdn.jsdelivr.net/npm/@tensorflow-models/face-detection');
    const faceDetection = window.faceDetection;
  
    return faceDetection.createDetector(faceDetection.SupportedModels.MediaPipeFaceDetector, {
      runtime: 'mediapipe',
      // TODO: this is also awful
      solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/face_detection',
    });
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
      const keypoint = blazefaceFace.keypoints.find(i => i.name === name);
      return videoSpaceToScratchSpace(keypoint.x, keypoint.y);
    };

    const nose = getKeyPointInScratchSpace('noseTip');
    const mouth = getKeyPointInScratchSpace('mouthCenter');
    const rightEye = getKeyPointInScratchSpace('rightEye');
    const leftEye = getKeyPointInScratchSpace('leftEye');
    const betweenEyes = [
      (rightEye[0] + leftEye[0]) / 2,
      (rightEye[1] + leftEye[1]) / 2,
    ];
    const leftEar = getKeyPointInScratchSpace('leftEarTragion');
    const rightEar = getKeyPointInScratchSpace('rightEarTragion');
    const topOfHead = [0, 0];

    const size = Math.round(blazefaceFace.box.width * 1.25);

    const tiltRadians = Math.atan2(
      rightEar[1] - leftEar[1],
      rightEar[0] - leftEar[0],
    );
    const tilt = Math.round(90 - (tiltRadians * 180 / Math.PI));

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
      tilt
    };
  };

  const estimationLoop = () => {
    if (isEstimationInFlight) {
      return;
    }

    const frame = videoDevice.getFrame({
      format: 'canvas'
    });
    if (!frame) {
      isFaceCurrentlyDetected = false;
      return;
    }

    isEstimationInFlight = true;
    detector.estimateFaces(frame, {
      flipHorizontal: true
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

  const detector = await initializeDetector();
  const videoDevice = Scratch.vm.runtime.ioDevices.video;
  Scratch.vm.runtime.on('AFTER_EXECUTE', estimationLoop);

  class FaceSensing {
    constructor () {
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
            blockType: Scratch.BlockType.EVENT,
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
            blockType: Scratch.BlockType.EVENT,
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
            blockType: Scratch.BlockType.EVENT,
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
          part: {
            acceptReporters: false, // compatibility with Scratch Lab
            items: [
              {
                text: Scratch.translate("nose"),
                value: "nose",
              },
              {
                text: Scratch.translate("mouth"),
                value: "mouth",
              },
              {
                text: Scratch.translate("left eye"),
                value: "left eye",
              },
              {
                text: Scratch.translate("right eye"),
                value: "right eye",
              },
              {
                text: Scratch.translate("between eyes"),
                value: "between eyes",
              },
              {
                text: Scratch.translate("left ear"),
                value: "left ear",
              },
              {
                text: Scratch.translate("right ear"),
                value: "right ear",
              },
              {
                text: Scratch.translate("top of head"),
                value: "top of head",
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

      let position;

      const part = Scratch.Cast.toString(args.PART);
      if (part === 'nose') {
        position = lastFace.nose;
      } else if (part === 'mouth') {
        position = lastFace.mouth;
      } else if (part === 'left eye') {
        position = lastFace.leftEye;
      } else if (part === 'right eye') {
        position = lastFace.rightEye;
      } else if (part === 'between eyes') {
        position = lastFace.betweenEyes;
      } else if (part === 'left ear') {
        position = lastFace.leftEar;
      } else if (part === 'right ear') {
        position = lastFace.rightEar;
      } else if (part === 'top of head') {
        position = lastFace.topOfHead;
      }

      if (position) {
        util.target.setXY(position[0], position[1]);
      }
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
