// Name: Face Sensing
// ID: faceSensing
// Description: Sense faces with the camera.
// License: MPL-2.0

(async function (Scratch) {
  "use strict";

  const initializeDetector = async () => {
    // TODO: this is awful
    await import(
      "https://packagerdata.turbowarp.org/facesensing00/@mediapipe/face_detection@0.4.1646425229/face_detection.js"
    );
    await import(
      "https://packagerdata.turbowarp.org/facesensing00/@tensorflow/tfjs-core@4.22.0/dist/tf-core.min.js"
    );
    await import(
      "https://packagerdata.turbowarp.org/facesensing00/@tensorflow/tfjs-backend-webgl@4.22.0/dist/tf-backend-webgl.min.js"
    );
    await import(
      "https://packagerdata.turbowarp.org/facesensing00/@tensorflow-models/face-detection@1.0.3/dist/face-detection.min.js"
    );
    const faceDetection = window.faceDetection;

    return faceDetection.createDetector(
      faceDetection.SupportedModels.MediaPipeFaceDetector,
      {
        runtime: "mediapipe",
        // TODO: this is also awful
        solutionPath: "https://packagerdata.turbowarp.org/facesensing00/@mediapipe/face_detection@0.4.1646425229",
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

    // Not sure how Scratch computes the rest of these as blazeface doesn't just
    // directly tell us. These seem to match close enough based on my personal testing.

    // Not entirely sure how Scratch defines this. But just using the width as the size
    // seems to match whatever they do?
    // TODO: improve this
    const size = Math.round(blazefaceFace.box.width);

    // The ears can tell us the horizontal direction to determine the tilt.
    const horizontalDirection = [
      rightEar[0] - leftEar[0],
      rightEar[1] - leftEar[1],
    ];
    const tiltRadians = Math.atan2(
      horizontalDirection[1],
      horizontalDirection[0]
    );
    const tilt = Math.round(90 - (tiltRadians * 180) / Math.PI);

    // From the horizontal direction we can compute the normalized up direction.
    const upDirection = [-horizontalDirection[1], horizontalDirection[0]];
    const upMagnitude = Math.sqrt(upDirection[0] ** 2 + upDirection[1] ** 2);
    upDirection[0] /= upMagnitude;
    upDirection[1] /= upMagnitude;

    // Approximate the top of the head by going up from the center of the eyes.
    // TODO: improve this
    const topOfHead = [
      betweenEyes[0] + upDirection[0] * size * 0.35,
      betweenEyes[1] + upDirection[1] * size * 0.35,
    ];

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
    // Goal is 15 estimations per second, which seems to match Scratch.
    // Going faster or slower makes the "when touching x" blocks behave differently,
    // so want to match if possible.

    let timeoutFinished = false;
    let estimationFinished = false;
    setTimeout(() => {
      timeoutFinished = true;
      if (estimationFinished) {
        estimationLoop();
      }
    }, 1000 / 15);

    const frame = videoDevice.getFrame({
      format: "canvas",
    });

    if (!frame) {
      isFaceCurrentlyDetected = false;
      estimationFinished = true;
      return;
    }

    detector
      .estimateFaces(frame, {
        flipHorizontal: true,
      })
      .then((faces) => {
        if (faces.length > 0) {
          isFaceCurrentlyDetected = true;
          updateFace(faces[0]);
        } else {
          isFaceCurrentlyDetected = false;
        }
      })
      .catch((error) => {
        console.error(error);
        isFaceCurrentlyDetected = false;
      })
      .then(() => {
        estimationFinished = true;
        if (timeoutFinished) {
          estimationLoop();
        }
      });
  };

  const videoDevice = Scratch.vm.runtime.ioDevices.video;
  const renderer = Scratch.vm.renderer;

  const detector = await initializeDetector();
  estimationLoop();

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

  const checkIfShouldTurnOnVideoForFirstRun = () => {
    const stage = Scratch.vm.runtime.getTargetForStage();
    if (!stage) {
      // project is still loading
      Scratch.vm.runtime.once(
        "PROJECT_LOADED",
        checkIfShouldTurnOnVideoForFirstRun
      );
      return;
    }

    if (stage.videoState !== "off") {
      videoDevice.enableVideo();
    }
  };

  checkIfShouldTurnOnVideoForFirstRun();

  class FaceSensing {
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
            disableMonitor: true, // parity with Scratch
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
          // These menus were all designed to be compatible with Scratch
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
            acceptReporters: false, // compatibility with Scratch
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
