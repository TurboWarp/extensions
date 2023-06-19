(function (Scratch) {
  "use strict";

  //put these back here so I don't have to define scratch.cast again.
  let notMobile = false;

  /* globals Accelerometer, Gyro */

  const SpeechRecognition =
    typeof webkitSpeechRecognition !== "undefined"
      ? window.webkitSpeechRecognition
      : typeof window.SpeechRecognition !== "undefined"
      ? window.SpeechRecognition
      : null;

  let recognizedSpeech = "";
  let recording = false;
  let initializedSpeechRecognition = false;
  let speechRecognition = null;
  const initializeSpeechRecognition = async () => {
    if (initializedSpeechRecognition) {
      return;
    }
    initializedSpeechRecognition = true;

    if (!SpeechRecognition) {
      console.warn(
        "Speech recognotion blocks are not supported in this browser"
      );
      return;
    }

    if (!(await Scratch.canRecordAudio())) {
      return;
    }

    speechRecognition = new SpeechRecognition();
    speechRecognition.addEventListener("result", (event) => {
      recognizedSpeech = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
    });
    speechRecognition.addEventListener("error", (event) => {
      if (event.error === "no-speech") {
        // this is fine, just ignore it
        // it will be restarted in the end handler
      } else {
        console.error("Speech recognition error", event.error);
        recording = false;
        speechRecognition.stop();
      }
    });
    speechRecognition.addEventListener("end", () => {
      if (recording) {
        speechRecognition.start();
      }
    });
  };

  let initializedSensors = false;
  const deviceVelocity = {
    x: 0,
    y: 0,
    z: 0,
    rotationX: 0,
    rotationY: 0,
    rotationZ: 0,
  };
  const deviceStatus = {
    gyroscope: false,
    accelerometer: false,
  };

  const initializeSensors = () => {
    if (initializedSensors) {
      return;
    }
    initializedSensors = true;

    if (typeof Accelerometer !== "function") {
      try {
        const accelerometer = new Accelerometer({
          referenceFrame: "device",
        });
        accelerometer.addEventListener("error", (e) => {
          console.error("accelerometer error", e.error);
          deviceStatus.accelerometer = false;
        });
        accelerometer.addEventListener("reading", () => {
          deviceVelocity.x = accelerometer.x;
          deviceVelocity.y = accelerometer.y;
          deviceVelocity.z = accelerometer.z;
          deviceStatus.accelerometer = true;
        });
        accelerometer.start();
      } catch (e) {
        console.error("error setting up accelerometer", e);
      }
    } else {
      console.warn("accelerometer API is not supported in this browser");
    }

    if (typeof Gyro !== "undefined") {
      try {
        const gyro = new Gyro({
          frequency: 30,
        });
        gyro.addEventListener("error", (e) => {
          console.error("gyro error", e.error);
          deviceStatus.gyroscope = false;
        });
        gyro.addEventListener("reading", () => {
          deviceVelocity.rotationX = gyro.x;
          deviceVelocity.rotationY = gyro.y;
          deviceVelocity.rotationZ = gyro.z;
          deviceStatus.gyroscope = true;
        });
      } catch (e) {
        console.error("error setting up gyro", e);
      }
    } else {
      console.warn("gyro API is not supported in this browser");
    }
  };

  if (!Scratch) {
    Scratch = {
      TargetType: {
        SPRITE: "sprite",
        STAGE: "stage",
      },
      BlockType: {
        COMMAND: "command",
        REPORTER: "reporter",
        BOOLEAN: "Boolean",
        HAT: "hat",
      },
      ArgumentType: {
        STRING: "string",
        NUMBER: "number",
        COLOR: "color",
        ANGLE: "angle",
        BOOLEAN: "Boolean",
        MATRIX: "matrix",
        NOTE: "note",
      },
      Cast: {
        toNumber: (input) => {
          return Number(input);
        },

        toString: (input) => {
          return String(input);
        },

        toBoolean: (input) => {
          return Boolean(input);
        },
      },
      vm: window.vm,
      extensions: {
        unsandboxed: true,
        register: (object) => {
          const serviceName =
            vm.extensionManager._registerInternalExtension(object);
          vm.extensionManager._loadedExtensions.set(
            object.getInfo().id,
            serviceName
          );
        },
      },
    };
    if (!Scratch.vm) {
      throw new Error("The VM does not exist");
    }
  }

  const isPackaged = Scratch.vm.runtime.isPackaged;

  const vm = Scratch.vm;
  const runtime = vm.runtime;
  const canvas = runtime.renderer.canvas;
  const mouseButtonsDown = [false, false, false, false, false, false];

  let fingersDown = 0;
  const lastFingerPositions = [];
  const fingerPositions = [];

  /** @param {TouchEvent} event */
  function handleTouchStart(event) {
    event.preventDefault();
    const changedTouches = event.changedTouches;
    const changedTouchesKeys = Object.keys(changedTouches);
    const canvasPos = canvas.getBoundingClientRect();
    fingersDown = event.touches.length;

    changedTouchesKeys.forEach((touch) => {
      lastFingerPositions[changedTouches[touch].identifier] = [
        changedTouches[touch].clientX - canvasPos.left,
        changedTouches[touch].clientY - canvasPos.top,
      ];
      fingerPositions[changedTouches[touch].identifier] = [
        changedTouches[touch].clientX - canvasPos.left,
        changedTouches[touch].clientY - canvasPos.top,
      ];
    });
    runtime.startHats("obviousalexsensing_onTapped");
  }

  let movedFingers = [];
  /** @param {TouchEvent} event */
  function handleTouchMove(event) {
    event.preventDefault();
    const changedTouches = event.changedTouches;
    const canvasPos = canvas.getBoundingClientRect();
    const changedTouchesKeys = Object.keys(changedTouches);
    fingersDown = event.touches.length;
    movedFingers = [];
    changedTouchesKeys.forEach((touch) => {
      movedFingers.push(changedTouches[touch].identifier + 1);
      lastFingerPositions[changedTouches[touch].identifier] = [
        fingerPositions[changedTouches[touch].identifier][0],
        fingerPositions[changedTouches[touch].identifier][1],
      ];
      fingerPositions[changedTouches[touch].identifier] = [
        changedTouches[touch].clientX - canvasPos.left,
        changedTouches[touch].clientY - canvasPos.top,
      ];
    });
    runtime.startHats("obviousalexsensing_onFingerMoved");
  }

  /** @param {TouchEvent} event */
  function handleTouchEnd(event) {
    event.preventDefault();
    const changedTouches = event.changedTouches;
    const changedTouchesKeys = Object.keys(changedTouches);
    fingersDown = event.touches.length;
    changedTouchesKeys.forEach((touch) => {
      lastFingerPositions[changedTouches[touch].identifier] = null;
      fingerPositions[changedTouches[touch].identifier] = null;
    });
  }

  let realMousePosition = [0, 0];

  function getActualMousePos(event) {
    const canvasPos = canvas.getBoundingClientRect();
    let calculated = [event.clientX, event.clientY];
    if (calculated[0] <= canvasPos.left) {
      calculated[0] = canvasPos.left;
    } else if (calculated[0] >= canvasPos.right) {
      calculated[0] = canvasPos.right;
    }

    if (calculated[1] <= canvasPos.top) {
      calculated[1] = canvasPos.top;
    } else if (calculated[1] >= canvasPos.bottom) {
      calculated[1] = canvasPos.bottom;
    }

    realMousePosition[0] = calculated[0] - canvasPos.left;
    realMousePosition[1] = calculated[1] - canvasPos.top;

    runtime.startHats("obviousalexsensing_onMouseMoved");
  }

  canvas.onmousedown = (event) => {
    event.preventDefault();
    mouseButtonsDown[event.button] = true;
  };

  canvas.onmouseup = (event) => {
    mouseButtonsDown[event.button] = false;
  };

  canvas.onmouseleave = (event) => {
    mouseButtonsDown[event.button] = false;
  };

  let mouseSpeed = [0, 0];

  function onScrolled(event) {
    event.preventDefault();
    mouseSpeed = [event.deltaX / -125, event.deltaY / -125];
  }

  canvas.addEventListener("contextmenu", (e) => e.preventDefault());

  canvas.addEventListener("touchstart", handleTouchStart, false);
  canvas.addEventListener("touchmove", handleTouchMove, false);
  canvas.addEventListener("touchcancel", handleTouchEnd, false);
  canvas.addEventListener("touchend", handleTouchEnd, false);
  document.addEventListener("mousemove", getActualMousePos);
  canvas.addEventListener("wheel", onScrolled);

  /**
   * @param {string} listData
   * @returns {VM.ListVariable|null}
   */
  const getListFromMenu = (listData) => {
    try {
      const parsed = JSON.parse(listData);
      if (parsed && parsed.variableId && parsed.targetName) {
        const target = Scratch.vm.runtime.getSpriteTargetByName(
          parsed.targetName
        );
        const variable = target.variables[parsed.variableId];
        if (variable && variable.type === "list") {
          return variable;
        }
      }
    } catch (e) {
      // ignore
    }
    return null;
  };

  const ico =
    "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIyOC44NjYwNyIgaGVpZ2h0PSIyOC44NjYwNyIgdmlld0JveD0iMCwwLDI4Ljg2NjA3LDI4Ljg2NjA3Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjI1LjA2Njk3LC0xNjUuMDY2OTcpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTIyNS4wNjY5NywxNzkuNWMwLC03Ljk3MTE0IDYuNDYxODksLTE0LjQzMzAzIDE0LjQzMzAzLC0xNC40MzMwM2M3Ljk3MTE0LDAgMTQuNDMzMDMsNi40NjE4OSAxNC40MzMwMywxNC40MzMwM2MwLDcuOTcxMTQgLTYuNDYxODksMTQuNDMzMDMgLTE0LjQzMzAzLDE0LjQzMzAzYy03Ljk3MTE0LDAgLTE0LjQzMzAzLC02LjQ2MTg5IC0xNC40MzMwMywtMTQuNDMzMDN6IiBmaWxsPSIjNWNiMWQ2IiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMCIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiLz48cGF0aCBkPSJNMjM0LjUsMTc1YzAsLTIuNDkgMi4wMSwtNC41IDQuNSwtNC41YzIuNDksMCA0LjUsMi4wMSA0LjUsNC41YzAsMS41NiAtMC43OSwyLjkzIC0yLDMuNzR2LTMuNzRjMCwtMS4zODA3MSAtMS4xMTkyOSwtMi41IC0yLjUsLTIuNWMtMS4zODA3MSwwIC0yLjUsMS4xMTkyOSAtMi41LDIuNXYzLjc0Yy0xLjIxLC0wLjgxIC0yLC0yLjE4IC0yLC0zLjc0ek0yNDcuMjUsMTg0Ljc1YzAsMC4wNiAtMC4wMSwwLjEzIC0wLjAyLDAuMmwtMC43NSw1LjI3Yy0wLjExLDAuNzMgLTAuNjksMS4yOCAtMS40NCwxLjI4aC02Ljc5Yy0wLjQxLDAgLTAuNzksLTAuMTcgLTEuMDYsLTAuNDRsLTQuOTQsLTQuOTRsMC43OSwtMC44YzAuMiwtMC4yIDAuNDgsLTAuMzMgMC43OSwtMC4zM2MwLjEzLDAgMC4wNywtMC4wMSAzLjY3LDAuNzV2LTEwLjc0YzAsLTAuODMgMC42NywtMS41IDEuNSwtMS41YzAuODMsMCAxLjUsMC42NyAxLjUsMS41djZoMC43NmMwLjE5LDAgMC4zNywwLjA0IDAuNTQsMC4xMWw0LjU0LDIuMjZjMC41MywwLjIyIDAuOTEsMC43NiAwLjkxLDEuMzh6IiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiLz48cGF0aCBkPSJNMjI3LjUsMTY3LjVoMjR2MjRoLTI0eiIgZmlsbC1vcGFjaXR5PSIwIiBmaWxsPSIjMDAwMDAwIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiLz48ZyBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiPjxwYXRoIGQ9Ik0yNDQuNTAyMTEsMTc4LjgyNzU5aDUuNDk1NzkiLz48cGF0aCBkPSJNMjQ3LjI1LDE4MS41NzU0OGwwLC01LjQ5NTc4Ii8+PC9nPjwvZz48L2c+PC9zdmc+PCEtLXJvdGF0aW9uQ2VudGVyOjE0LjkzMzAzNDcxNTI2MTk4MjoxNC45MzMwMzQ3MTUyNjE5NTQtLT4=";
  const touchIco =
    "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIyNi4yMDU1MSIgaGVpZ2h0PSIyNi45NjQ5IiB2aWV3Qm94PSIwLDAsMjYuMjA1NTEsMjYuOTY0OSI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIyNi44OTcyNSwtMTY2LjEzNzg1KSI+PGcgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aXNQYWludGluZ0xheWVyJnF1b3Q7OnRydWV9IiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0yMzkuMzA5OTgsMTg5Ljc3OTdjLTAuMDQ4MjMsMC4wMzU2OSAtMC4xMTA0NSwwLjA2OTI5IC0wLjE3MjY3LDAuMTAyODlsLTQuNjgyNDEsMi41MzE4OGMtMC42NTIyNCwwLjM0NTggLTEuNDM5MzYsMC4yMDY3MyAtMS44ODU0OSwtMC4zOTYxNmwtNC4wMzg5MiwtNS40NTgxNGMtMC4yNDM4OCwtMC4zMjk1OCAtMC4zMzMyNiwtMC43MzYxNiAtMC4yNzY4MywtMS4xMTM4MWwxLjAzMjU0LC02LjkwOTQ5bDEuMTEzLDAuMTU5MTdjMC4yNzk3NCwwLjA0MTggMC41NTA3OSwwLjE4OTU1IDAuNzM1MTksMC40Mzg3NWMwLjA3NzMzLDAuMTA0NSAwLjA0OTY4LDAuMDUwMzIgMS41ODAxNSwzLjM5NjI1bDguNjMzMzQsLTYuMzg4NTFjMC42NjcxOSwtMC40OTM3MSAxLjYwNDMxLC0wLjM1MzY3IDIuMDk4MDIsMC4zMTM1MmMwLjQ5MzcxLDAuNjY3MTkgMC4zNTM2NywxLjYwNDMxIC0wLjMxMzUyLDIuMDk4MDJsLTQuODIzMSwzLjU2OWwwLjQ1MjA3LDAuNjEwOTNjMC4xMTMwMiwwLjE1MjczIDAuMTg3OTMsMC4zMjEyMiAwLjIzMjc5LDAuNDk5NTFsMC44ODM4NCw0Ljk5MzhjMC4xMzg0MSwwLjU1NjkgLTAuMDY5NjMsMS4xODM1OCAtMC41NjgwMSwxLjU1MjM3eiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0Ii8+PHBhdGggZD0iTTIyOC43MzMyMiwxNjYuMTM3ODVoMjR2MjRoLTI0eiIgZmlsbC1vcGFjaXR5PSIwIiBmaWxsPSIjMDAwMDAwIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiLz48cGF0aCBkPSJNMjQ0LjQ2NjgyLDE3NC44NzA0NGwyLjA3NDI4LC0yLjA3NDI4IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBhdGggZD0iTTIzNi44OTU5MSwxODIuNzMyNTJsMi4wNzQyOCwtMi4wNzQyOCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxwYXRoIGQ9Ik0yMzkuODUzNDcsMTc0Ljk1Nzc1bC0yLjA3NDI4LC0yLjA3NDI4IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBhdGggZD0iTTI0Ni40NTM4LDE4MS41NTgwOGwtMi4wNzQyOCwtMi4wNzQyOCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxwYXRoIGQ9Ik0yMjYuODk3MjUsMTkzLjEwMjc1di0yNi4yMDU1MWgyNi4yMDU1MXYyNi4yMDU1MXoiIGZpbGw9Im5vbmUiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSJub25lIiBzdHJva2UtbGluZWNhcD0iYnV0dCIvPjwvZz48L2c+PC9zdmc+PCEtLXJvdGF0aW9uQ2VudGVyOjEzLjEwMjc1NDg1NDYyMTI4MToxMy44NjIxNDc1NDY3MTM3NDMtLT4=";
  const listIco =
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBzdHlsZT0iLW1zLXRyYW5zZm9ybTpyb3RhdGUoMzYwZGVnKTstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoMzYwZGVnKTt0cmFuc2Zvcm06cm90YXRlKDM2MGRlZykiPjxwYXRoIGQ9Im04MC4xODIgNjcuNDU3LTM1LjQtLjAwMXYuMDAxbC0uMDA5LS4wMDFhMi4yNyAyLjI3IDAgMCAwLTIuMjY5IDIuMjY5YzAgLjA0Mi4wMS4wOC4wMTIuMTIxVjgwLjE4aC4wMTFhMi4yNjggMi4yNjggMCAwIDAgMi4yNTQgMi4yNjh2LjAwMWgzNS40di0uMDAyYTIuMjY4IDIuMjY4IDAgMCAwIDIuMjU0LTIuMjY4VjY5LjgyNWMuMDAyLS4wMzQuMDEtLjA2Ny4wMS0uMTAxYTIuMjY3IDIuMjY3IDAgMCAwLTIuMjYzLTIuMjY3em0tNDkuOTA0LS4wMDNIMTkuODIyYTIuMjcgMi4yNyAwIDAgMC0yLjI2OSAyLjI2OXYxMC40NTRhMi4yNjkgMi4yNjkgMCAwIDAgMi4yNjggMi4yNjloMTAuNDU1YTIuMjcgMi4yNyAwIDAgMCAyLjI2OS0yLjI2OVY2OS43MjNhMi4yNjcgMi4yNjcgMCAwIDAtMi4yNjctMi4yNjl6bTQ5LjkwNC0yNC45ODctMzUuNC0uMDAxdi4wMDFsLS4wMDktLjAwMWEyLjI3IDIuMjcgMCAwIDAtMi4yNjkgMi4yNjljMCAuMDQyLjAxLjA4LjAxMi4xMjFWNTUuMTloLjAxMWEyLjI2OCAyLjI2OCAwIDAgMCAyLjI1NCAyLjI2OHYuMDAxaDM1LjR2LS4wMDJhMi4yNjggMi4yNjggMCAwIDAgMi4yNTQtMi4yNjhWNDQuODM1Yy4wMDItLjAzNC4wMS0uMDY3LjAxLS4xMDFhMi4yNjcgMi4yNjcgMCAwIDAtMi4yNjMtMi4yNjd6bS00OS45MDQtLjAwM0gxOS44MjJhMi4yNyAyLjI3IDAgMCAwLTIuMjY5IDIuMjY5djEwLjQ1NGEyLjI2OSAyLjI2OSAwIDAgMCAyLjI2OCAyLjI2OWgxMC40NTVhMi4yNyAyLjI3IDAgMCAwIDIuMjY5LTIuMjY5VjQ0LjczM2EyLjI2NyAyLjI2NyAwIDAgMC0yLjI2Ny0yLjI2OXptMTIuMjM4LTEyLjE4OGguMDExYTIuMjY4IDIuMjY4IDAgMCAwIDIuMjU0IDIuMjY4di4wMDFoMzUuNHYtLjAwMmEyLjI2OCAyLjI2OCAwIDAgMCAyLjI1NC0yLjI2OFYxOS45MjFjLjAwMi0uMDM0LjAxLS4wNjcuMDEtLjEwMWEyLjI2OSAyLjI2OSAwIDAgMC0yLjI2NC0yLjI2OHYtLjAwMWgtMzUuNHYuMDAxbC0uMDA5LS4wMDFhMi4yNyAyLjI3IDAgMCAwLTIuMjY5IDIuMjY5YzAgLjA0Mi4wMS4wOC4wMTIuMTIxdjEwLjMzNXpNMzAuMjc4IDE3LjU1MUgxOS44MjJhMi4yNyAyLjI3IDAgMCAwLTIuMjY5IDIuMjY5djEwLjQ1NGEyLjI2OSAyLjI2OSAwIDAgMCAyLjI2OCAyLjI2OWgxMC40NTVhMi4yNyAyLjI3IDAgMCAwIDIuMjY5LTIuMjY5VjE5LjgyYTIuMjY2IDIuMjY2IDAgMCAwLTIuMjY3LTIuMjY5eiIgZmlsbD0iI2ZmZiIvPjxwYXRoIGZpbGw9InJnYmEoMCwgMCwgMCwgMCkiIGQ9Ik0wIDBoMTAwdjEwMEgweiIvPjwvc3ZnPg==";
  const catIco =
    "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI0Mi4wMzIzNSIgaGVpZ2h0PSI0Mi4wMzIzNSIgdmlld0JveD0iMCwwLDQyLjAzMjM1LDQyLjAzMjM1Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjE4Ljk4MzgyLC0xNTguOTgzODIpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxnIGZpbGwtcnVsZT0iZXZlbm9kZCI+PHBhdGggZD0iTTI0My40NzUsMTY1LjQ3NzIzYzAuMTUsLTAuMSAwLjQsLTAuMDUgMC40NSwwLjE1bDEuMyw1LjM1YzAsMCAzLjIsMi4zNSA0LjE1LDRjMS42LDIuNzUgMS42NSw1IDEuNjUsNWMwLDAgMy41NSwxLjA1IDQuMTUsMy45YzAuNiwyLjg1IC0xLjYsOC4yNSAtMTEsMTAuMWMtOS40LDEuODUgLTE2Ljk1LC0wLjcgLTIwLjUsLTYuNGMtMy41NSwtNS43IDIuMDUsLTEyLjUgMS43NSwtMTIuMWwtMS4wNSwtOC45NWMtMC4wNSwtMC4yIDAuMiwtMC4zNSAwLjQsLTAuMjVsNi4wNSwzLjk1YzAsMCAyLjI1LC0wLjg1IDQuNiwtMC45NWMxLjQsLTAuMSAyLjYsMCAzLjc1LDAuMnoiIGZpbGw9IiMzYmEyY2UiIHN0cm9rZT0iIzFiNTU2ZSIgc3Ryb2tlLXdpZHRoPSIxLjIiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIi8+PHBhdGggZD0iTTI1MC44NzUsMTgwLjE3NzIzYzAsMCAzLjQ1LDAuOSA0LjA1LDMuNzVjMC42LDIuODUgLTEuOCw4IC0xMS4xLDkuOGMtMTIuMSwyLjUgLTE3Ljg1LC00LjcgLTE0LjUsLTEwYzMuMzUsLTUuMzUgOS4xLC0wLjggMTMuMywtMS4xYzMuNiwtMC4yNSA0LC0zLjQgOC4yNSwtMi40NXoiIGZpbGw9IiNhN2UyZmIiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIvPjxwYXRoIGQ9Ik0yNjAuMDc1LDE4MC43MjcyM2MtMi4zNSwxLjkgLTUuOTUsMS45NSAtNS45NSwxLjk1IiBmaWxsPSJub25lIiBzdHJva2U9IiMxYjU1NmUiIHN0cm9rZS13aWR0aD0iMS4yIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cGF0aCBkPSJNMjU5LjQyNSwxODYuMzI3MjNjLTMuMTUsMC4yNSAtNS4xLC0wLjcgLTUuMSwtMC43IiBmaWxsPSJub25lIiBzdHJva2U9IiMxYjU1NmUiIHN0cm9rZS13aWR0aD0iMS4yIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cGF0aCBkPSJNMjQyLjQyNSwxODEuMzI3MjNjMS4wNSwwIDIuMTUsMC4xIDIuMiwwLjQ1YzAuMDUsMC43IC0wLjcsMi4xIC0xLjUsMi4xNWMtMC45LDAuMSAtMywtMS4xNSAtMywtMS45NWMtMC4wNSwtMC42IDEuMywtMC42NSAyLjMsLTAuNjV6IiBmaWxsPSIjMWI1NTZlIiBzdHJva2U9IiMxYjU1NmUiIHN0cm9rZS13aWR0aD0iMS4yIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cGF0aCBkPSJNMjE5LjkyNSwxODAuNTc3MjNjMCwwIDQuMywxLjQgNi4wNSwyLjk1IiBmaWxsPSJub25lIiBzdHJva2U9IiMxYjU1NmUiIHN0cm9rZS13aWR0aD0iMS4yIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cGF0aCBkPSJNMjI2LjEyNSwxODUuMjc3MjNjLTIuMTUsMC44NSAtNS44NSwwLjMgLTUuODUsMC4zIiBmaWxsPSJub25lIiBzdHJva2U9IiMxYjU1NmUiIHN0cm9rZS13aWR0aD0iMS4yIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48ZyBmaWxsPSIjMWI1NTZlIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiPjxwYXRoIGQ9Ik0yNDguMTI1LDE3OC4zMjcyM2MwLDAuNTUgLTAuNCwxIC0wLjksMWMtMC41LDAgLTAuOSwtMC40NSAtMC45LC0xYzAsLTAuNTUgMC40LC0xIDAuOSwtMWMwLjUsMCAwLjksMC40NSAwLjksMSIvPjwvZz48ZyBmaWxsPSIjMWI1NTZlIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiPjxwYXRoIGQ9Ik0yMzUuNjI1LDE3OS43NzcyM2MwLDAuNTUgLTAuNCwxIC0wLjksMWMtMC41LDAgLTAuOSwtMC40NSAtMC45LC0xYzAsLTAuNTUgMC40LC0xIDAuOSwtMWMwLjUsMC4wNSAwLjksMC40NSAwLjksMSIvPjwvZz48L2c+PHBhdGggZD0iTTIxOC45ODM4MiwyMDEuMDE2MTh2LTQyLjAzMjM1aDQyLjAzMjM1djQyLjAzMjM1eiIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMCIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiLz48L2c+PC9nPjwvc3ZnPjwhLS1yb3RhdGlvbkNlbnRlcjoyMS4wMTYxNzY0NzA1ODgzNjM6MjEuMDE2MTc2NDcwNTg4MzktLT4=";
  const deviceVelIco =
    "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI3Mi44NjY0OCIgaGVpZ2h0PSI2MC43NDUyNSIgdmlld0JveD0iMCwwLDcyLjg2NjQ4LDYwLjc0NTI1Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjA0LjY0MTEzLC0xNDkuNjI3MzgpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0yMjMuNTMwMDgsMTk4LjI2ODZjLTAuNzcxMDEsLTAuMjEzNCAtMS4zNjU2MiwtMC42ODkyNSAtMS43ODM4MywtMS40Mjc1NmMtMC40MTgyMSwtMC43MzgzMSAtMC41MjA2MSwtMS40OTI5NyAtMC4zMDcyMSwtMi4yNjM5OGwxMC4xMzY0OSwtMzYuNjIzMWMwLjIxMzQsLTAuNzcxMDEgMC42ODkyNSwtMS4zNjU2MiAxLjQyNzU2LC0xLjc4MzgzYzAuNzM4MzEsLTAuNDE4MjEgMS40OTI5NywtMC41MjA2MSAyLjI2Mzk4LC0wLjMwNzIxbDIxLjIwMjg1LDUuODY4NWMwLjc3MTAxLDAuMjEzNCAxLjM2NTYyLDAuNjg5MjUgMS43ODM4MywxLjQyNzU2YzAuNDE4MjEsMC43MzgzMSAwLjUyMDYxLDEuNDkyOTcgMC4zMDcyMSwyLjI2Mzk4bC0xMC4xMzY0OSwzNi42MjMxYy0wLjIxMzQsMC43NzEwMSAtMC42ODkyNSwxLjM2NTYyIC0xLjQyNzU2LDEuNzgzODNjLTAuNzM4MzEsMC40MTgyMSAtMS40OTI5NywwLjUyMDYxIC0yLjI2Mzk4LDAuMzA3MjF6TTIyNC43MzA0NSwxOTMuOTMxNjVsLTAuNDAwMTIsMS40NDU2NWwyMS4yMDI4NSw1Ljg2ODVsMC40MDAxMiwtMS40NDU2NXpNMjI1LjUzMDcsMTkxLjA0MDM2bDIxLjIwMjg1LDUuODY4NWw3LjczNTc1LC0yNy45NDkyMWwtMjEuMjAyODUsLTUuODY4NXpNMjM0LjA2NjcsMTYwLjE5OTg1bDIxLjIwMjg1LDUuODY4NWwwLjQwMDEyLC0xLjQ0NTY1bC0yMS4yMDI4NSwtNS44Njg1ek0yMzQuMDY2NywxNjAuMTk5ODVsMC40MDAxMiwtMS40NDU2NXpNMjI0LjczMDQ1LDE5My45MzE2NWwtMC40MDAxMiwxLjQ0NTY1eiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiLz48cGF0aCBkPSJNMjI2LjQ4NTU2LDE1NC40NzkwMWM0LjAzMjEsLTIuMTM5NiA4LjYzMTczLC0zLjM1MTYzIDEzLjUxNDQ0LC0zLjM1MTYzYzE1Ljk0NTkxLDAgMjguODcyNjIsMTIuOTI2NzEgMjguODcyNjIsMjguODcyNjJjMCwwLjg5Mjc3IC0wLjA0MDUyLDEuNzc2MDcgLTAuMTE5ODIsMi42NDgxNyIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjMiLz48cGF0aCBkPSJNMjYwLjI2NzExLDIwMC41NjM4N2MtNS4yMTI3Myw1LjEzNzk3IC0xMi4zNjk2Myw4LjMwODc1IC0yMC4yNjcxMSw4LjMwODc1Yy0xNS45NDU5MSwwIC0yOC44NzI2MiwtMTIuOTI2NzEgLTI4Ljg3MjYyLC0yOC44NzI2MmMwLC0zLjgzOTY1IDAuNzQ5NSwtNy41MDQyNSAyLjExMDE5LC0xMC44NTU0NiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjMiLz48cGF0aCBkPSJNMjA0LjY0MTEzLDE2Ni4zNzdsMTEuNjQ1NjgsLTUuMzEyMDdsNS4zMTIwNywxMS42NDU2OHoiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIwIi8+PHBhdGggZD0iTTI3Ny41MDc2MSwxODIuNjQ0MDFsLTkuODAyNDMsOC4yMzExOGwtOC4yMzExOCwtOS44MDI0M3oiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIwIi8+PC9nPjwvZz48L3N2Zz48IS0tcm90YXRpb25DZW50ZXI6MzUuMzU4ODczODM5ODgwOTc6MzAuMzcyNjIzNTE2MTc0OTk3LS0+";
  const clipboardIco =
    "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIzNy41IiBoZWlnaHQ9IjQxLjUiIHZpZXdCb3g9IjAuNSwwLjUsMzcuNSw0MS41Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjIwLjc1LC0xNTguNzUpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGw9IiNmZmZmZmYiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0yMjUsMjAwYy0wLjg2NjY3LDAgLTEuNTgzMzQsLTAuMjgzMzMgLTIuMTUsLTAuODVjLTAuNTY2NjcsLTAuNTY2NjcgLTAuODUsLTEuMjgzMzQgLTAuODUsLTIuMTV2LTMwYzAsLTAuODY2NjcgMC4yODMzMywtMS41ODMzNCAwLjg1LC0yLjE1YzAuNTY2NjcsLTAuNTY2NjcgMS4yODMzMywtMC44NSAyLjE1LC0wLjg1aDEwLjFjMC4yMzMzMywtMS4xNjY2NiAwLjgwODMzLC0yLjEyNSAxLjcyNSwtMi44NzVjMC45MTY2NiwtMC43NSAxLjk3NSwtMS4xMjUgMy4xNzUsLTEuMTI1YzEuMiwwIDIuMjU4MzMsMC4zNzUgMy4xNzUsMS4xMjVjMC45MTY2NiwwLjc1IDEuNDkxNjYsMS43MDgzMyAxLjcyNSwyLjg3NWgxMC4xYzAuODY2NjcsMCAxLjU4MzMzLDAuMjgzMzMgMi4xNSwwLjg1YzAuNTY2NjcsMC41NjY2NyAwLjg1LDEuMjgzMzMgMC44NSwyLjE1djMwYzAsMC44NjY2NyAtMC4yODMzNCwxLjU4MzM0IC0wLjg1LDIuMTVjLTAuNTY2NjcsMC41NjY2NyAtMS4yODMzMywwLjg1IC0yLjE1LDAuODV6TTIyNSwxOTdoMzB2LTMwaC0zdjQuNWgtMjR2LTQuNWgtM3pNMjQwLDE2N2MwLjU2NjY3LDAgMS4wNDE2NiwtMC4xOTE2NyAxLjQyNSwtMC41NzVjMC4zODMzMywtMC4zODMzMyAwLjU3NSwtMC44NTgzMyAwLjU3NSwtMS40MjVjMCwtMC41NjY2NyAtMC4xOTE2NywtMS4wNDE2NiAtMC41NzUsLTEuNDI1Yy0wLjM4MzM0LC0wLjM4MzMzIC0wLjg1ODM0LC0wLjU3NSAtMS40MjUsLTAuNTc1Yy0wLjU2NjY3LDAgLTEuMDQxNjcsMC4xOTE2NyAtMS40MjUsMC41NzVjLTAuMzgzMzMsMC4zODMzNCAtMC41NzUsMC44NTgzNCAtMC41NzUsMS40MjVjMCwwLjU2NjY3IDAuMTkxNjcsMS4wNDE2NiAwLjU3NSwxLjQyNWMwLjM4MzMzLDAuMzgzMzQgMC44NTgzNCwwLjU3NSAxLjQyNSwwLjU3NXoiLz48L2c+PC9nPjwvc3ZnPjwhLS1yb3RhdGlvbkNlbnRlcjoxOS4yNToyMS4yNDk5OTk5OTk5OTk5Ny0tPg==";
  const speechIco =
    "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIzNi45NzQzOCIgaGVpZ2h0PSIzMy43NTAxIiB2aWV3Qm94PSIwLDAsMzYuOTc0MzgsMzMuNzUwMSI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIyMS4wNjQ0OSwtMTYyLjA0MzU5KSI+PGcgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aXNQYWludGluZ0xheWVyJnF1b3Q7OnRydWV9IiBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTI0OC41MzI4MywxOTUuNzkzNjlsLTAuODI4NzUsLTIuOTg3MTdjMi44NjYxMywtMS43NjM3NiA0LjkzMjY3LC00LjE5NjQzIDYuMTk5NjEsLTcuMjk4MDJjMS4yNjY5NCwtMy4xMDE1OSAxLjQ1MDM5LC02LjI3NDQ1IDAuNTUwMzUsLTkuNTE4NThjLTAuOTAwMDQsLTMuMjQ0MTMgLTIuNjg2MTcsLTUuODc5MiAtNS4zNTg0LC03LjkwNTIyYy0yLjY3MjIzLC0yLjAyNjAyIC01LjcwMjUzLC0zLjAzNiAtOS4wOTA5LC0zLjAyOTkzbC0wLjgyODc1LC0yLjk4NzE3YzQuMjMyNDEsLTAuMjA1NjQgOC4wMzU3MiwwLjkwOTg2IDExLjQwOTk0LDMuMzQ2NDljMy4zNzQyMiwyLjQzNjYzIDUuNjI3MTksNS42OTQ1NyA2Ljc1ODkyLDkuNzczODJjMS4xMzE3Myw0LjA3OTI1IDAuODc5MzQsOC4wMzIyNyAtMC43NTcxOCwxMS44NTkwNmMtMS42MzY1MiwzLjgyNjc5IC00LjMyMTQ2LDYuNzQyMzYgLTguMDU0ODQsOC43NDY3MnpNMjI0LjI3MjU1LDE5MC42NDE4OWwtMy4yMDgwNiwtMTEuNTYzMjNsNy43MDg4MiwtMi4xMzg3MWw2Ljk2MjY0LC0xMi4zMDk0MWw4LjU1NDgzLDMwLjgzNTI5bC0xMi4zMDk0MSwtNi45NjI2NHpNMjQ1LjE0OTgyLDE4Ny4zNDA0M2wtNC41MDQ2NSwtMTYuMjM2NzFjMS45MTgxLDAuMDU1OTIgMy42MDg1MSwwLjY5MzkgNS4wNzEyNCwxLjkxMzkyYzEuNDYyNzMsMS4yMjAwMyAyLjQ1MjUzLDIuNzYxNTIgMi45NjkzOCw0LjYyNDQ5YzAuNTA3OTQsMS44MzA4NSAwLjQ0MTM1LDMuNjQ4MTMgLTAuMTk5NzksNS40NTE4NGMtMC42NDExMywxLjgwMzcyIC0xLjc1MzIsMy4yMTkyIC0zLjMzNjE5LDQuMjQ2NDV6Ii8+PC9nPjwvZz48L3N2Zz48IS0tcm90YXRpb25DZW50ZXI6MTguOTM1NTEyMTkxNzQ1NzQ0OjE3Ljk1NjQwNjY2OTY5MDQxLS0+";
  const packagedIco =
    "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI1OS4xODk3MiIgaGVpZ2h0PSI2Mi4xOTA3MyIgdmlld0JveD0iMCwwLDU5LjE4OTcyLDYyLjE5MDczIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjIwLjQzMjcsLTE1MS4wMDMwNSkiPjxnIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2lzUGFpbnRpbmdMYXllciZxdW90Ozp0cnVlfSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMy41IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMjIyLjQ4MjI2LDE5Ny45ODQwNnYtMjkuODE2OTVsMjUuNzc5MjQsMTIuNDIzNzN2MjkuODE2OTV6IiBmaWxsPSJub25lIiBzdHJva2UtbGluZWNhcD0iYnV0dCIvPjxwYXRoIGQ9Ik0yNTEuMzk3OTQsMjEwLjQwNzc5di0yOS44MTY5NWwyNS43NzkyNCwtMTIuNDIzNzN2MjkuODE2OTV6IiBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpbmRleCZxdW90OzpudWxsfSIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiLz48cGF0aCBkPSJNMjI0LjM0NTgyLDE2NS4zNzE3N2wyNC44NDc0NiwtMTIuNDIzNzNsMjYuNDAwNDMsMTIuNDIzNzNsLTI1Ljc3OTI0LDEyLjczNDMyeiIgZmlsbC1vcGFjaXR5PSIwLjAyMzUzIiBmaWxsPSIjZmY2NjY2IiBzdHJva2UtbGluZWNhcD0iYnV0dCIvPjxwYXRoIGQ9Ik0yNjAuMjE5MzQsMTU5LjQ3MDQ5bC0yNC44NDc0NiwxMi43MzQzMmwtMS4wODcwOCwzMS4zNjk5MiIgZmlsbD0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9nPjwvZz48L3N2Zz48IS0tcm90YXRpb25DZW50ZXI6MTkuNTY3MzAxNDU1OTU1NDY6MjguOTk2OTQ3NTUwNDE1OTQtLT4=";
  const effectIco =
    "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI5My45ODkwNyIgaGVpZ2h0PSI5MC42NTY0MyIgdmlld0JveD0iMCwwLDkzLjk4OTA3LDkwLjY1NjQzIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTkzLjAwNTQ2LC0xMzQuNzUpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGw9IiM1Y2IxZDYiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjIuNSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0yNzcuNDk2NjQsMjIzLjE1NjM5Yy0wLjM4Mjk5LDAgLTEuODI0NTYsMS4xMzUwOSAwLjIzMDQyLDEuMDAwMDNjMi4zOTAzNiwtMC4xNTcxIDguMzQzOTYsLTEuNjA4MTUgOC4wMDM0NiwtMS45NDcyNGwtODAuODQ1ODQsLTgwLjg0ODQ4Yy0xLjI2Mzg0LC0xLjI2Mzg0IC0xMS43ODc5MywtMy4zMTY1NyAtMTAuNTI0MDksLTQuNTgwNDFjMS4yNjM4NCwtMS4yNjM4NCA5LjYzMTAyLC0xLjI2Mzg0IDEwLjg5NDg2LDBsNzIuMTI1ODgsODIuMzQ5MjhjMS4yNjM4NCwxLjI2Mzg0IDMuNjY5MzUsMS44MTMxMyAyLjQwNTUxLDMuMDc2OTdjLTAuNjMzMjQsMC42MzA2IC0xLjQ2MTczLDAuOTQ5ODUgLTIuMjkwMjEsMC45NDk4NXoiLz48cGF0aCBkPSJNMjM2LjQ0MTEzLDE1My44MTUwNmMwLDkuODM4OTIgLTE4LjgwMDkxLDE3LjgxNTA2IC0yOC42Mzk4MywxNy44MTUwNmMtOS44Mzg5MiwwIC02Ljk5MDI4LC03Ljk3NjE0IC02Ljk5MDI4LC0xNy44MTUwNmMwLC05LjgzODkyIDMuMTY1MTMsLTE3LjgxNTA2IDEzLjAwNDA1LC0xNy44MTUwNmM5LjgzODkyLDAgMjIuNjI2MDcsNy45NzYxNCAyMi42MjYwNywxNy44MTUwNnoiLz48cGF0aCBkPSJNMjM0Ljg3Mzc4LDE5MC41OTM1OWMtOS41NzU2NSwtMi4yNjExMSAtMjcuMjMyMDgsLTExLjg1NjcxIC0yNC45NzA5NiwtMjEuNDMyMzVjMi4yNjExMSwtOS41NzU2NSAyMi42ODE0OSwtMTUuNTA1MjQgMzIuMjU3MTMsLTEzLjI0NDEyYzkuNTc1NjUsMi4yNjExMSA2LjQ4NDYsMTEuODU2NzEgNC4yMjM0OCwyMS40MzIzNWMtMi4yNjExMSw5LjU3NTY1IC0xLjkzNCwxNS41MDUyNCAtMTEuNTA5NjQsMTMuMjQ0MTJ6Ii8+PHBhdGggZD0iTTI3MC41MDI5MywxOTIuNjg1MjRjMCw5LjgzODkyIC03Ljk3ODc4LDE3LjgxNzY5IC0xNy44MTc2OSwxNy44MTc2OWMtOS44Mzg5MiwwIC0xMi4xMDE5OCwtNy45Nzg3OCAtMTIuMTAxOTgsLTE3LjgxNzY5YzAsLTkuODM4OTIgLTEuOTQ2NTcsLTE3LjgxNTA2IDcuODkyMzUsLTE3LjgxNTA2YzkuODM4OTIsMCAyMi4wMjczMiw3Ljk3ODc4IDIyLjAyNzMyLDE3LjgxNTA2eiIvPjxwYXRoIGQ9Ik0yODAuNzYxMzYsMjI0LjAwMTQyYy0wLjgyODQ5LDAgLTEuNjU2OTgsLTAuMzE2NjEgLTIuMjkwMjEsLTAuOTQ3MjFjMCwwIC0xLjU2MDQzLC02LjM3MTQ0IC00LjAwMzMzLC04LjgxNDM0Yy0zLjY2MzAxLC0zLjY2MzAxIC0xNS44MzgwOCwtMTEuMDI3MDcgLTE1LjgzODA4LC0xMS4wMjcwN2MtMS4yNjY0OCwtMS4yNjM4NCAtMS4yNjY0OCwtMy4zMTY1NyAwLC00LjU4MDQxYzEuMjY2NDgsLTEuMjYzODQgMy4zMTM5MywtMS4yNjM4NCA0LjU4MDQxLDBjMCwwIDE0LjU4MDU4LDYuNDYxOTkgMTguMjQzNTgsMTAuMTI1YzIuNDQyOSwyLjQ0MjkgMS41OTc4Myw5LjcxNjQxIDEuNTk3ODMsOS43MTY0MWMxLjI2Mzg0LDEuMjYzODQgMS4yNjM4NCwzLjMxNjU3IDAsNC41ODA0MWMtMC42MzMyNCwwLjYyNzk2IC0xLjQ2MTczLDAuOTQ3MjEgLTIuMjkwMjEsMC45NDcyMXoiLz48L2c+PC9nPjwvc3ZnPjwhLS1yb3RhdGlvbkNlbnRlcjo0Ni45OTQ1MzUyNzE1OTQ2Njo0NS4yNS0tPg==";
  const rotationIco =
    "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI0OC42Mjg2IiBoZWlnaHQ9IjQ0LjU3MzgzIiB2aWV3Qm94PSIwLDAsNDguNjI4Niw0NC41NzM4MyI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIxNC4yMjg1NywtMTU4LjI5MDQpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxnIGZpbGwtcnVsZT0iZXZlbm9kZCI+PHBhdGggZD0iTTI0My40NzUwMSwxNjUuNDc3MjRjMC4xNSwtMC4xIDAuNCwtMC4wNSAwLjQ1LDAuMTVsMS4zLDUuMzVjMCwwIDMuMiwyLjM1IDQuMTUsNGMxLjYsMi43NSAxLjY1LDUgMS42NSw1YzAsMCAzLjU1LDEuMDUgNC4xNSwzLjljMC42LDIuODUgLTEuNiw4LjI1IC0xMSwxMC4xYy05LjQsMS44NSAtMTYuOTUsLTAuNyAtMjAuNSwtNi40Yy0zLjU1LC01LjcgMi4wNSwtMTIuNSAxLjc1LC0xMi4xbC0xLjA1LC04Ljk1Yy0wLjA1LC0wLjIgMC4yLC0wLjM1IDAuNCwtMC4yNWw2LjA1LDMuOTVjMCwwIDIuMjUsLTAuODUgNC42LC0wLjk1YzEuNCwtMC4xIDIuNiwwIDMuNzUsMC4yeiIgZmlsbD0iIzNiYTJjZSIgc3Ryb2tlPSIjMWI1NTZlIiBzdHJva2Utd2lkdGg9IjEuMiIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiLz48cGF0aCBkPSJNMjUwLjg3NTAxLDE4MC4xNzcyNGMwLDAgMy40NSwwLjkgNC4wNSwzLjc1YzAuNiwyLjg1IC0xLjgsOCAtMTEuMSw5LjhjLTEyLjEsMi41IC0xNy44NSwtNC43IC0xNC41LC0xMGMzLjM1LC01LjM1IDkuMSwtMC44IDEzLjMsLTEuMWMzLjYsLTAuMjUgNCwtMy40IDguMjUsLTIuNDV6IiBmaWxsPSIjYTdlMmZiIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiLz48cGF0aCBkPSJNMjYwLjA3NSwxODAuNzI3MjRjLTIuMzUsMS45IC01Ljk1LDEuOTUgLTUuOTUsMS45NSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMWI1NTZlIiBzdHJva2Utd2lkdGg9IjEuMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHBhdGggZD0iTTI1OS40MjUwMSwxODYuMzI3MjRjLTMuMTUsMC4yNSAtNS4xLC0wLjcgLTUuMSwtMC43IiBmaWxsPSJub25lIiBzdHJva2U9IiMxYjU1NmUiIHN0cm9rZS13aWR0aD0iMS4yIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cGF0aCBkPSJNMjQyLjQyNTAxLDE4MS4zMjcyNGMxLjA1LDAgMi4xNSwwLjEgMi4yLDAuNDVjMC4wNSwwLjcgLTAuNywyLjEgLTEuNSwyLjE1Yy0wLjksMC4xIC0zLC0xLjE1IC0zLC0xLjk1Yy0wLjA1LC0wLjYgMS4zLC0wLjY1IDIuMywtMC42NXoiIGZpbGw9IiMxYjU1NmUiIHN0cm9rZT0iIzFiNTU2ZSIgc3Ryb2tlLXdpZHRoPSIxLjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxwYXRoIGQ9Ik0yMTkuOTI1MDEsMTgwLjU3NzI0YzAsMCA0LjMsMS40IDYuMDUsMi45NSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMWI1NTZlIiBzdHJva2Utd2lkdGg9IjEuMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHBhdGggZD0iTTIyNi4xMjUwMSwxODUuMjc3MjRjLTIuMTUsMC44NSAtNS44NSwwLjMgLTUuODUsMC4zIiBmaWxsPSJub25lIiBzdHJva2U9IiMxYjU1NmUiIHN0cm9rZS13aWR0aD0iMS4yIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48ZyBmaWxsPSIjMWI1NTZlIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiPjxwYXRoIGQ9Ik0yNDguMTI1MDEsMTc4LjMyNzI0YzAsMC41NSAtMC40LDEgLTAuOSwxYy0wLjUsMCAtMC45LC0wLjQ1IC0wLjksLTFjMCwtMC41NSAwLjQsLTEgMC45LC0xYzAuNSwwIDAuOSwwLjQ1IDAuOSwxIi8+PC9nPjxnIGZpbGw9IiMxYjU1NmUiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciI+PHBhdGggZD0iTTIzNS42MjUwMSwxNzkuNzc3MjRjMCwwLjU1IC0wLjQsMSAtMC45LDFjLTAuNSwwIC0wLjksLTAuNDUgLTAuOSwtMWMwLC0wLjU1IDAuNCwtMSAwLjksLTFjMC41LDAuMDUgMC45LDAuNDUgMC45LDEiLz48L2c+PC9nPjxwYXRoIGQ9Ik0yMTguOTgzODMsMjAxLjAxNjE5di00Mi4wMzIzNWg0Mi4wMzIzNXY0Mi4wMzIzNXoiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjAiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIi8+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciI+PHBhdGggZD0iTTI1OC45NDI4NSwxNzAuNTc1ODNjMCwwIDAuMTYxMzEsLTEwLjgwNzI0IC0xOS45MTI1NiwtMTEuMjg1NzFjLTE3Ljk4MDQ4LC0wLjQyODU3IC0yMC4wNjgxMiwxMS4yODU3MSAtMjAuMDY4MTIsMTEuMjg1NzEiIHN0cm9rZT0iIzFiNTU2ZSIvPjxwYXRoIGQ9Ik0yMTUuMjI4NTcsMTY1Ljg2MTU0bDMuMjY2OSw1LjcxNDI5bDUuNDQ0ODQsLTMiIHN0cm9rZT0iIzFiNTU2ZSIvPjwvZz48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpbmRleCZxdW90OzpudWxsfSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9IiMxYjU1NmUiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49Im1pdGVyIj48cGF0aCBkPSJNMjU4LjEyMzU2LDE5MC41NjcwNWMwLDAgLTIuMDg3NjQsMTEuNzE0MjggLTIwLjA2ODEyLDExLjI4NTcxYy0yMC4wNzM4NywtMC40Nzg0NyAtMTkuOTEyNTYsLTExLjI4NTcxIC0xOS45MTI1NiwtMTEuMjg1NzEiLz48cGF0aCBkPSJNMjUzLjE0NTQyLDE5Mi41NjcwNWw1LjQ0NDg0LC0zbDMuMjY2OSw1LjcxNDI5Ii8+PC9nPjwvZz48L2c+PC9zdmc+PCEtLXJvdGF0aW9uQ2VudGVyOjI1Ljc3MTQyOTg3OTMyNDc1NjoyMS43MDk1OTc0OTgwNDAwOTctLT4=";
  const layerIco =
    "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI0NS45NzY4OCIgaGVpZ2h0PSI0Ni40NzQ2NiIgdmlld0JveD0iMCwwLDQ1Ljk3Njg4LDQ2LjQ3NDY2Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjE1LjAzOTI5LC0xNTguOTgzODMpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxnIGZpbGwtcnVsZT0iZXZlbm9kZCI+PHBhdGggZD0iTTIzOS4xODkyOSwxNjUuNDc3MjNjMC4xNSwtMC4xIDAuNCwtMC4wNSAwLjQ1LDAuMTVsMS4zLDUuMzVjMCwwIDMuMiwyLjM1IDQuMTUsNGMxLjYsMi43NSAxLjY1LDUgMS42NSw1YzAsMCAzLjU1LDEuMDUgNC4xNSwzLjljMC42LDIuODUgLTEuNiw4LjI1IC0xMSwxMC4xYy05LjQsMS44NSAtMTYuOTUsLTAuNyAtMjAuNSwtNi40Yy0zLjU1LC01LjcgMi4wNSwtMTIuNSAxLjc1LC0xMi4xbC0xLjA1LC04Ljk1Yy0wLjA1LC0wLjIgMC4yLC0wLjM1IDAuNCwtMC4yNWw2LjA1LDMuOTVjMCwwIDIuMjUsLTAuODUgNC42LC0wLjk1YzEuNCwtMC4xIDIuNiwwIDMuNzUsMC4yeiIgZmlsbD0iIzNiYTJjZSIgc3Ryb2tlPSIjMWI1NTZlIiBzdHJva2Utd2lkdGg9IjEuMiIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiLz48cGF0aCBkPSJNMjQ2LjU4OTI5LDE4MC4xNzcyM2MwLDAgMy40NSwwLjkgNC4wNSwzLjc1YzAuNiwyLjg1IC0xLjgsOCAtMTEuMSw5LjhjLTEyLjEsMi41IC0xNy44NSwtNC43IC0xNC41LC0xMGMzLjM1LC01LjM1IDkuMSwtMC44IDEzLjMsLTEuMWMzLjYsLTAuMjUgNCwtMy40IDguMjUsLTIuNDV6IiBmaWxsPSIjYTdlMmZiIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiLz48cGF0aCBkPSJNMjU1Ljc4OTI5LDE4MC43MjcyM2MtMi4zNSwxLjkgLTUuOTUsMS45NSAtNS45NSwxLjk1IiBmaWxsPSJub25lIiBzdHJva2U9IiMxYjU1NmUiIHN0cm9rZS13aWR0aD0iMS4yIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cGF0aCBkPSJNMjU1LjEzOTI5LDE4Ni4zMjcyM2MtMy4xNSwwLjI1IC01LjEsLTAuNyAtNS4xLC0wLjciIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzFiNTU2ZSIgc3Ryb2tlLXdpZHRoPSIxLjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxwYXRoIGQ9Ik0yMzguMTM5MjksMTgxLjMyNzIzYzEuMDUsMCAyLjE1LDAuMSAyLjIsMC40NWMwLjA1LDAuNyAtMC43LDIuMSAtMS41LDIuMTVjLTAuOSwwLjEgLTMsLTEuMTUgLTMsLTEuOTVjLTAuMDUsLTAuNiAxLjMsLTAuNjUgMi4zLC0wLjY1eiIgZmlsbD0iIzFiNTU2ZSIgc3Ryb2tlPSIjMWI1NTZlIiBzdHJva2Utd2lkdGg9IjEuMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHBhdGggZD0iTTIxNS42MzkyOSwxODAuNTc3MjNjMCwwIDQuMywxLjQgNi4wNSwyLjk1IiBmaWxsPSJub25lIiBzdHJva2U9IiMxYjU1NmUiIHN0cm9rZS13aWR0aD0iMS4yIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cGF0aCBkPSJNMjIxLjgzOTI5LDE4NS4yNzcyM2MtMi4xNSwwLjg1IC01Ljg1LDAuMyAtNS44NSwwLjMiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzFiNTU2ZSIgc3Ryb2tlLXdpZHRoPSIxLjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPjxnIGZpbGw9IiMxYjU1NmUiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciI+PHBhdGggZD0iTTI0My44MzkyOSwxNzguMzI3MjNjMCwwLjU1IC0wLjQsMSAtMC45LDFjLTAuNSwwIC0wLjksLTAuNDUgLTAuOSwtMWMwLC0wLjU1IDAuNCwtMSAwLjksLTFjMC41LDAgMC45LDAuNDUgMC45LDEiLz48L2c+PGcgZmlsbD0iIzFiNTU2ZSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIj48cGF0aCBkPSJNMjMxLjMzOTI5LDE3OS43NzcyM2MwLDAuNTUgLTAuNCwxIC0wLjksMWMtMC41LDAgLTAuOSwtMC40NSAtMC45LC0xYzAsLTAuNTUgMC40LC0xIDAuOSwtMWMwLjUsMC4wNSAwLjksMC40NSAwLjksMSIvPjwvZz48L2c+PHBhdGggZD0iTTIxOC45ODM4MywyMDEuMDE2MTl2LTQyLjAzMjM1aDQyLjAzMjM1djQyLjAzMjM1eiIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMCIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiLz48ZyBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0yNDMuNDc1LDE3NS43NjI5NWMwLjE1LC0wLjEgMC40LC0wLjA1IDAuNDUsMC4xNWwxLjMsNS4zNWMwLDAgMy4yLDIuMzUgNC4xNSw0YzEuNiwyLjc1IDEuNjUsNSAxLjY1LDVjMCwwIDMuNTUsMS4wNSA0LjE1LDMuOWMwLjYsMi44NSAtMS42LDguMjUgLTExLDEwLjFjLTkuNCwxLjg1IC0xNi45NSwtMC43IC0yMC41LC02LjRjLTMuNTUsLTUuNyAyLjA1LC0xMi41IDEuNzUsLTEyLjFsLTEuMDUsLTguOTVjLTAuMDUsLTAuMiAwLjIsLTAuMzUgMC40LC0wLjI1bDYuMDUsMy45NWMwLDAgMi4yNSwtMC44NSA0LjYsLTAuOTVjMS40LC0wLjEgMi42LDAgMy43NSwwLjJ6IiBmaWxsPSIjM2JhMmNlIiBzdHJva2U9IiMxYjU1NmUiIHN0cm9rZS13aWR0aD0iMS4yIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIvPjxwYXRoIGQ9Ik0yNTAuODc1LDE5MC40NjI5NWMwLDAgMy40NSwwLjkgNC4wNSwzLjc1YzAuNiwyLjg1IC0xLjgsOCAtMTEuMSw5LjhjLTEyLjEsMi41IC0xNy44NSwtNC43IC0xNC41LC0xMGMzLjM1LC01LjM1IDkuMSwtMC44IDEzLjMsLTEuMWMzLjYsLTAuMjUgNCwtMy40IDguMjUsLTIuNDV6IiBmaWxsPSIjYTdlMmZiIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiLz48cGF0aCBkPSJNMjYwLjA3NSwxOTEuMDEyOTVjLTIuMzUsMS45IC01Ljk1LDEuOTUgLTUuOTUsMS45NSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMWI1NTZlIiBzdHJva2Utd2lkdGg9IjEuMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHBhdGggZD0iTTI1OS40MjUsMTk2LjYxMjk1Yy0zLjE1LDAuMjUgLTUuMSwtMC43IC01LjEsLTAuNyIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMWI1NTZlIiBzdHJva2Utd2lkdGg9IjEuMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHBhdGggZD0iTTI0Mi40MjUsMTkxLjYxMjk1YzEuMDUsMCAyLjE1LDAuMSAyLjIsMC40NWMwLjA1LDAuNyAtMC43LDIuMSAtMS41LDIuMTVjLTAuOSwwLjEgLTMsLTEuMTUgLTMsLTEuOTVjLTAuMDUsLTAuNiAxLjMsLTAuNjUgMi4zLC0wLjY1eiIgZmlsbD0iIzFiNTU2ZSIgc3Ryb2tlPSIjMWI1NTZlIiBzdHJva2Utd2lkdGg9IjEuMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHBhdGggZD0iTTIxOS45MjUsMTkwLjg2Mjk1YzAsMCA0LjMsMS40IDYuMDUsMi45NSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMWI1NTZlIiBzdHJva2Utd2lkdGg9IjEuMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHBhdGggZD0iTTIyNi4xMjUsMTk1LjU2Mjk1Yy0yLjE1LDAuODUgLTUuODUsMC4zIC01Ljg1LDAuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMWI1NTZlIiBzdHJva2Utd2lkdGg9IjEuMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PGcgZmlsbD0iIzFiNTU2ZSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIj48cGF0aCBkPSJNMjQ4LjEyNSwxODguNjEyOTVjMCwwLjU1IC0wLjQsMSAtMC45LDFjLTAuNSwwIC0wLjksLTAuNDUgLTAuOSwtMWMwLC0wLjU1IDAuNCwtMSAwLjksLTFjMC41LDAgMC45LDAuNDUgMC45LDEiLz48L2c+PGcgZmlsbD0iIzFiNTU2ZSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIj48cGF0aCBkPSJNMjM1LjYyNSwxOTAuMDYyOTVjMCwwLjU1IC0wLjQsMSAtMC45LDFjLTAuNSwwIC0wLjksLTAuNDUgLTAuOSwtMWMwLC0wLjU1IDAuNCwtMSAwLjksLTFjMC41LDAuMDUgMC45LDAuNDUgMC45LDEiLz48L2c+PC9nPjwvZz48L2c+PC9zdmc+PCEtLXJvdGF0aW9uQ2VudGVyOjI0Ljk2MDcwOTI4NTcxNDMzOjIxLjAxNjE2NS0tPg==";
  const mouseIco =
    "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxMTAuMzUyNTgiIGhlaWdodD0iMTEwLjM1MjU4IiB2aWV3Qm94PSIwLDAsMTEwLjM1MjU4LDExMC4zNTI1OCI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE4NC44MjM3MSwtMTI0LjgyMzcxKSI+PGcgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aXNQYWludGluZ0xheWVyJnF1b3Q7OnRydWV9IiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIwIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTIwNC45Njk4MiwyMTUuNzIzMzl2LTgzLjI5MDY0bDYwLjQzODMzLDY2LjE1MTQxbC0yNC42Njc5NCwtMy4wNzY2N2w5LjUzMzQ5LDI2LjMwOTA0bC0xNy4yNDE2Miw1Ljc1MDcxbC05LjYwMzkzLC0yNy42MjIzNnoiIGZpbGw9IiNmZmZmZmYiLz48cGF0aCBkPSJNMTg0LjgyMzcxLDIzNS4xNzYyOXYtMTEwLjM1MjU4aDExMC4zNTI1OHYxMTAuMzUyNTh6IiBmaWxsPSJub25lIi8+PC9nPjwvZz48L3N2Zz48IS0tcm90YXRpb25DZW50ZXI6NTUuMTc2Mjg4OTYzNTUzNjQ1OjU1LjE3NjI4ODk2MzU1MzU5LS0+";

  const userAgent = navigator.userAgent;
  let supportsTouches = true;
  if (
    userAgent.includes("Safari") &&
    /^((?!chrome|android).)*safari/i.test(userAgent)
  ) {
    //* Its a problem with all safari browsers from what I see now which is odd since apple says its supported?
    supportsTouches = false;
  } else if (
    userAgent.includes("Windows") ||
    userAgent.includes("Mac OS") ||
    userAgent.includes("Linux") ||
    userAgent.includes("CrOS")
  ) {
    //* <-- Most chrome OS devices support touch events with up to 10 fingers but include a check to make it better anyways.
    notMobile = true;
    supportsTouches = navigator.maxTouchPoints > 0;
  }

  const maxTouchPoints = navigator.maxTouchPoints;

  function makeArrayOfTouches() {
    let TPArray = [];
    if (maxTouchPoints == 0 || notMobile) {
      //*For non touch compatible devices
      for (let TP = 0; TP < 10; TP++) {
        TPArray.push(Scratch.Cast.toString(TP + 1));
      }
    } else {
      for (let TP = 0; TP < maxTouchPoints; TP++) {
        TPArray.push(Scratch.Cast.toString(TP + 1));
      }
    }
    return TPArray;
  }

  const touchPointsArray = makeArrayOfTouches(); //* <-- Do this for devices that really can't support that many touches.

  const alreadyTapped = {};

  class SensingPlus {
    getInfo() {
      return {
        menuIconURI: ico,
        color1: "#5cb1d6",
        color2: "#3ba2ce",
        color3: "#2e8eb8",
        id: "obviousalexsensing",
        name: "Sensing+",
        blocks: [
          {
            blockType: "label",
            text: "Touch blocks are broken in Safari.",
          },
          {
            blockType: "label",
            text: "We will try to fix them soon.",
          },
          {
            opcode: "onFingerMoved",
            blockType: Scratch.BlockType.HAT,
            text: "On finger moved",
            blockIconURI: touchIco,
            arguments: {},
            isEdgeActivated: false,
          },
          {
            opcode: "onTapped",
            blockType: Scratch.BlockType.HAT,
            text: "On Tapped",
            blockIconURI: touchIco,
            arguments: {},
            isEdgeActivated: false,
          },
          {
            opcode: "onTappedBySpecificFinger",
            blockType: Scratch.BlockType.HAT,
            text: "On tapped by finger [ID]",
            blockIconURI: touchIco,
            arguments: {
              ID: {
                type: Scratch.ArgumentType.NUMBER,
                menu: "fingerIDMenu",
              },
            },
          },
          {
            opcode: "isMobile",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "Mobile?",
            blockIconURI: touchIco,
            arguments: {},
          },
          {
            opcode: "supportsTouches",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "Supports touches?",
            blockIconURI: touchIco,
            arguments: {},
          },
          {
            opcode: "getMaxTouches",
            blockType: Scratch.BlockType.REPORTER,
            text: "# of simultaneous possible",
            blockIconURI: touchIco,
            arguments: {},
          },
          {
            opcode: "getFingersTouching",
            blockType: Scratch.BlockType.REPORTER,
            text: "# of fingers down",
            blockIconURI: touchIco,
            arguments: {},
          },
          {
            opcode: "isFingerDown",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "Is Finger [ID] down?",
            blockIconURI: touchIco,
            arguments: {
              ID: {
                type: Scratch.ArgumentType.NUMBER,
                menu: "fingerIDMenu",
              },
            },
          },
          {
            opcode: "touchingFinger",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "Touching a finger?",
            blockIconURI: touchIco,
            filter: [Scratch.TargetType.SPRITE],
            arguments: {},
          },
          {
            opcode: "touchingSpecificFinger",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "Touching finger [ID]?",
            blockIconURI: touchIco,
            filter: [Scratch.TargetType.SPRITE],
            arguments: {
              ID: {
                type: Scratch.ArgumentType.NUMBER,
                menu: "fingerIDMenu",
              },
            },
          },
          {
            opcode: "getTouchingFingerID",
            blockType: Scratch.BlockType.REPORTER,
            disableMonitor: true,
            text: "Current finger touching",
            filter: [Scratch.TargetType.SPRITE],
            blockIconURI: touchIco,
            arguments: {},
          },
          {
            opcode: "fingerPosition",
            blockType: Scratch.BlockType.REPORTER,
            text: "Finger [ID] [PositionType]",
            blockIconURI: touchIco,
            arguments: {
              ID: {
                type: Scratch.ArgumentType.NUMBER,
                menu: "fingerIDMenu",
              },
              PositionType: {
                type: Scratch.ArgumentType.STRING,
                menu: "coordmenu",
              },
            },
          },
          {
            opcode: "getFingerSpeed",
            blockType: Scratch.BlockType.REPORTER,
            text: "Finger [ID] speed",
            blockIconURI: touchIco,
            arguments: {
              ID: {
                type: Scratch.ArgumentType.NUMBER,
                menu: "fingerIDMenu",
              },
            },
          },
          "---",
          {
            opcode: "onMouseMoved",
            blockType: Scratch.BlockType.HAT,
            text: "On Mouse Moved",
            blockIconURI: mouseIco,
            arguments: {},
            isEdgeActivated: false,
          },
          {
            opcode: "getRealMousePos",
            blockType: Scratch.BlockType.REPORTER,
            text: "Mouse [axis]",
            blockIconURI: mouseIco,
            arguments: {
              axis: {
                type: Scratch.ArgumentType.STRING,
                menu: "coordmenu",
              },
            },
          },
          {
            opcode: "getIfTouchingMouse",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "Touching Mouse",
            blockIconURI: mouseIco,
            arguments: {
              axis: {
                type: Scratch.ArgumentType.STRING,
                menu: "coordmenu",
              },
            },
          },
          {
            opcode: "isMouseDown",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "Mouse button [ID] down",
            blockIconURI: mouseIco,
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                menu: "mouseButton",
              },
            },
          },
          {
            opcode: "getMouseScroll",
            blockType: Scratch.BlockType.REPORTER,
            text: "Mouse [direction] scroll",
            blockIconURI: mouseIco,
            arguments: {
              direction: {
                type: Scratch.ArgumentType.STRING,
                menu: "directionmenu",
              },
            },
          },
          "---",
          {
            opcode: "listInSprite",
            blockType: Scratch.BlockType.REPORTER,
            text: "Get index [index] of [List]",
            blockIconURI: listIco,
            arguments: {
              index: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
              List: {
                type: Scratch.ArgumentType.STRING,
                menu: "listMenu",
              },
            },
          },
          {
            opcode: "lengthOfListInSprite",
            blockType: Scratch.BlockType.REPORTER,
            text: "Length of [List]",
            blockIconURI: listIco,
            disableMonitor: true,
            arguments: {
              List: {
                type: Scratch.ArgumentType.STRING,
                menu: "listMenu",
              },
            },
          },
          {
            opcode: "listContains",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "Does [List] contain [term]",
            blockIconURI: listIco,
            arguments: {
              term: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Dango",
              },
              List: {
                type: Scratch.ArgumentType.STRING,
                menu: "listMenu",
              },
            },
          },
          {
            opcode: "itemNumberInList",
            blockType: Scratch.BlockType.REPORTER,
            text: "Item # of [term] in [List]",
            blockIconURI: listIco,
            arguments: {
              term: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Dango",
              },
              List: {
                type: Scratch.ArgumentType.STRING,
                menu: "listMenu",
              },
            },
          },
          "---",
          {
            opcode: "touchingOriginal",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "Touching the original [Sprite]?",
            blockIconURI: catIco,
            filter: [Scratch.TargetType.SPRITE],
            arguments: {
              Sprite: {
                type: Scratch.ArgumentType.STRING,
                menu: "spriteMenu",
              },
            },
          },
          {
            opcode: "touchingClone",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "Touching a clone of [Sprite]?",
            blockIconURI: catIco,
            filter: [Scratch.TargetType.SPRITE],
            arguments: {
              Sprite: {
                type: Scratch.ArgumentType.STRING,
                menu: "spriteMenu",
              },
            },
          },
          {
            opcode: "clonesOfSprite",
            blockType: Scratch.BlockType.REPORTER,
            text: "# of clones of [Sprite]",
            blockIconURI: catIco,
            disableMonitor: true,
            arguments: {
              Sprite: {
                type: Scratch.ArgumentType.STRING,
                menu: "spriteMenu",
              },
            },
          },
          "---",
          {
            opcode: "getEffect",
            blockType: Scratch.BlockType.REPORTER,
            text: "Get this sprite's [effect] effect",
            blockIconURI: effectIco,
            disableMonitor: true,
            arguments: {
              effect: {
                type: Scratch.ArgumentType.STRING,
                menu: "effectMenu",
              },
            },
          },
          {
            opcode: "isHidden",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "Hidden?",
            blockIconURI: effectIco,
            filter: [Scratch.TargetType.SPRITE],
          },
          {
            opcode: "getRotationStyle",
            blockType: Scratch.BlockType.REPORTER,
            text: "Rotation Style",
            blockIconURI: rotationIco,
            disableMonitor: true,
            filter: [Scratch.TargetType.SPRITE],
          },
          {
            opcode: "getSpriteLayer",
            blockType: Scratch.BlockType.REPORTER,
            text: "Sprite Layer",
            blockIconURI: layerIco,
            disableMonitor: true,
            filter: [Scratch.TargetType.SPRITE],
          },
          "---",
          {
            opcode: "getClipBoard",
            blockType: Scratch.BlockType.REPORTER,
            text: "Copied Contents",
            blockIconURI: clipboardIco,
            disableMonitor: true,
          },
          {
            opcode: "setClipBoard",
            blockType: Scratch.BlockType.COMMAND,
            text: "Set clipboard to [TEXT]",
            blockIconURI: clipboardIco,
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
            },
          },
          "---",
          {
            opcode: "isPackaged",
            blockIconURI: packagedIco,
            blockType: Scratch.BlockType.BOOLEAN,
            text: "Is Packaged?",
            disableMonitor: false,
          },
          "---",
          {
            blockType: "label",
            text: "Speech recording is unreliable",
          },
          {
            opcode: "recording",
            blockType: Scratch.BlockType.COMMAND,
            text: "Turn speech recording [toggle]",
            blockIconURI: speechIco,
            arguments: {
              toggle: {
                type: Scratch.ArgumentType.STRING,
                menu: "toggleMenu",
              },
            },
          },
          {
            opcode: "returnWords",
            blockType: Scratch.BlockType.REPORTER,
            text: "Recognized Words",
            blockIconURI: speechIco,
          },
          {
            opcode: "isrecording",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "Recording?",
            blockIconURI: speechIco,
          },
          "---",
          {
            blockType: "label",
            text: "Needs a gyroscope or accelerometer",
          },
          {
            opcode: "hasDevice",
            blockIconURI: deviceVelIco,
            blockType: Scratch.BlockType.BOOLEAN,
            text: "Has a [device]?",
            arguments: {
              device: {
                type: Scratch.ArgumentType.STRING,
                menu: "deviceMenu",
              },
            },
          },
          {
            opcode: "getDeviceSpeed",
            blockIconURI: deviceVelIco,
            blockType: Scratch.BlockType.REPORTER,
            text: "Get the [type] speed on the [axis] axis",
            disableMonitor: true,
            arguments: {
              type: {
                type: Scratch.ArgumentType.STRING,
                menu: "velocitymenu",
              },
              axis: {
                type: Scratch.ArgumentType.STRING,
                menu: "axismenu",
              },
            },
          },
        ],
        menus: {
          mouseButton: {
            acceptReporters: true,
            items: [
              {
                text: "Left",
                value: "1",
              },
              {
                text: "Right",
                value: "3",
              },
              {
                text: "Middle",
                value: "2",
              },
              {
                text: "Back",
                value: "4",
              },
              {
                text: "Forward",
                value: "5",
              },
            ],
          },
          fingerIDMenu: {
            acceptReporters: true,
            items: touchPointsArray,
          },
          deviceMenu: {
            acceptReporters: true,
            items: ["gyroscope", "accelerometer"],
          },
          coordmenu: {
            acceptReporters: true,
            items: ["x", "y"],
          },
          axismenu: {
            acceptReporters: true,
            items: ["x", "y", "z"],
          },
          velocitymenu: {
            acceptReporters: true,
            items: ["positional", "rotational"],
          },
          spriteMenu: {
            acceptReporters: true,
            items: "getSprites",
          },
          listMenu: {
            items: "getLists",
          },
          toggleMenu: {
            acceptReporters: true,
            items: ["on", "off"],
          },
          effectMenu: {
            acceptReporters: true,
            items: [
              "color",
              "fisheye",
              "whirl",
              "pixelate",
              "mosaic",
              "brightness",
              "ghost",
            ],
          },
          directionmenu: {
            acceptReporters: true,
            items: ["Horizontal", "Vertical"],
          },
        },
      };
    }

    _touchUtil = {
      blankExpression: () => {},
      isTouchingAnyFinger(util, success, fail) {
        success = success || this.blankExpression;
        if (success == null) {
          success = this.blankExpression;
        }
        fail = fail || this.blankExpression;
        if (fail == null) {
          fail = this.blankExpression;
        }

        for (let index = 0; index < fingerPositions.length; index++) {
          const fingerPos = fingerPositions[index];
          if (fingerPos != null) {
            const touching = util.target.isTouchingPoint(
              fingerPos[0],
              fingerPos[1]
            );
            if (touching) {
              success(index);
              return true;
            }
          }
        }
        fail(-1);
        return false;
      },

      isTouchingSpecificFinger(id, util, success, fail) {
        success = success || this.blankExpression;
        if (success == null) {
          success = this.blankExpression;
        }
        fail = fail || this.blankExpression;
        if (fail == null) {
          fail = this.blankExpression;
        }

        const fingerPos = fingerPositions[Scratch.Cast.toNumber(id) - 1];
        if (fingerPos != null) {
          const touching = util.target.isTouchingPoint(
            fingerPos[0],
            fingerPos[1]
          );
          if (touching) {
            success(id);
            return true;
          }
        }
        fail(id);
        return false;
      },
    };

    getMouseScroll({ direction }) {
      if (direction == "Horizontal") {
        let speed = Scratch.Cast.toNumber(mouseSpeed[0]);
        mouseSpeed[0] = 0;
        return speed;
      }
      let speed = Scratch.Cast.toNumber(mouseSpeed[1]);
      mouseSpeed[1] = 0;
      return speed;
    }

    isMouseDown({ ID }) {
      return mouseButtonsDown[Scratch.Cast.toNumber(ID) - 1];
    }

    onFingerMoved() {
      return true;
    }

    onMouseMoved() {
      return true;
    }

    onTapped(args, util) {
      let returnedArg = false;
      if (
        !alreadyTapped[util.target.id] ||
        alreadyTapped[util.target.id] == false
      ) {
        this._touchUtil.isTouchingAnyFinger(util, () => {
          alreadyTapped[util.target.id] = true;
          returnedArg = true;
        });
      } else {
        this._touchUtil.isTouchingAnyFinger(util, null, () => {
          alreadyTapped[util.target.id] = false;
        });
      }
      return returnedArg;
    }

    onTappedBySpecificFinger({ ID }, util) {
      let returnedArg = false;
      if (
        !alreadyTapped[util.target.id] ||
        alreadyTapped[util.target.id] == false
      ) {
        this._touchUtil.isTouchingSpecificFinger(ID, util, () => {
          alreadyTapped[util.target.id] = true;
          returnedArg = true;
        });
      } else {
        this._touchUtil.isTouchingSpecificFinger(ID, util, null, () => {
          alreadyTapped[util.target.id] = false;
        });
      }
      return returnedArg;
    }

    getRealMousePos({ axis }) {
      const canvasRect = canvas.getBoundingClientRect();
      if (axis == "x") {
        const clientWidth = canvasRect.right - canvasRect.left;
        const toScratch = runtime.stageWidth / clientWidth;
        return realMousePosition[0] * toScratch - runtime.stageWidth / 2;
      }
      const clientheight = canvasRect.bottom - canvasRect.top;
      const toScratch = runtime.stageHeight / clientheight;
      return runtime.stageHeight / 2 - realMousePosition[1] * toScratch;
    }

    getIfTouchingMouse(args, util) {
      const canvasRect = canvas.getBoundingClientRect();
      const clientWidth = canvasRect.right - canvasRect.left;
      let toScratch = runtime.stageWidth / clientWidth;

      const clientheight = canvasRect.bottom - canvasRect.top;
      toScratch = runtime.stageHeight / clientheight;

      return util.target.isTouchingPoint(
        realMousePosition[0],
        realMousePosition[1]
      );
    }

    isMobile() {
      return !notMobile;
    }

    supportsTouches() {
      return supportsTouches;
    }

    getMaxTouches() {
      return maxTouchPoints;
    }

    getFingerSpeed({ ID }) {
      const fingerPos = fingerPositions[ID - 1];
      const fingerLastPos = lastFingerPositions[ID - 1];
      if (!fingerPos || !fingerLastPos) {
        return 0;
      }
      const speed = Math.sqrt(
        Math.pow(fingerPos[0] - fingerLastPos[0], 2) +
          Math.pow(fingerPos[1] - fingerLastPos[1], 2)
      );
      lastFingerPositions[ID - 1] = [fingerPos[0], fingerPos[1]];
      return speed;
    }

    getSpriteLayer(args, util) {
      return util.target.renderer._drawList.indexOf(util.target.drawableID);
    }

    getRotationStyle(arg, util) {
      return util.target.rotationStyle;
    }

    isHidden(arg, util) {
      return !util.target.visible;
    }

    getEffect({ effect }, util) {
      if (Object.prototype.hasOwnProperty.call(util.target.effects, effect)) {
        return util.target.effects[effect];
      }
      return 0;
    }

    isPackaged() {
      return isPackaged;
    }

    clonesOfSprite({ Sprite }) {
      const originalTarget = vm.runtime.getSpriteTargetByName(Sprite);
      if (!originalTarget) {
        return 0;
      }
      return originalTarget.sprite.clones.length - 1;
    }

    recording({ toggle }) {
      initializeSpeechRecognition();
      if (!speechRecognition) {
        return;
      }
      if (toggle === "on") {
        if (!recording) {
          speechRecognition.start();
          recognizedSpeech = "";
          recording = true;
        }
      } else {
        if (recording) {
          speechRecognition.stop();
          recording = false;
        }
      }
    }

    returnWords() {
      return recognizedSpeech;
    }

    isrecording() {
      return recording;
    }

    hasDevice({ device }) {
      if (deviceStatus[device]) {
        return deviceStatus[device];
      }
      return false;
    }

    getDeviceSpeed({ type, axis }) {
      initializeSensors();
      if (type === "positional") {
        if (axis === "x") {
          return deviceVelocity.x;
        } else if (axis === "y") {
          return deviceVelocity.y;
        } else if (axis === "z") {
          return deviceVelocity.z;
        }
      } else if (type === "rotational") {
        if (axis === "x") {
          return deviceVelocity.rotationX;
        } else if (axis === "y") {
          return deviceVelocity.rotationY;
        } else if (axis === "z") {
          return deviceVelocity.rotationZ;
        }
      }
      // should never happen
      return 0;
    }

    getClipBoard() {
      if (navigator.clipboard && navigator.clipboard.readText) {
        return Scratch.canReadClipboard().then((allowed) => {
          if (allowed) {
            return navigator.clipboard.readText();
          }
          return "";
        });
      }
      return "";
    }

    async setClipBoard({ TEXT }) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(Scratch.Cast.toString(TEXT));
      }
    }

    getFingersTouching() {
      return fingersDown;
    }

    getSprites() {
      const sprites = [];
      for (const target of vm.runtime.targets) {
        if (target.isOriginal && !target.isStage) {
          sprites.push(target.getName());
        }
      }
      if (sprites.length === 0) {
        return [
          {
            text: "No sprites exist",
            value: " ",
          },
        ];
      }
      return sprites;
    }

    getLists(myID) {
      const lists = [];
      for (const target of Scratch.vm.runtime.targets) {
        // TODO: should filter out variables from myID, but some editor bugs make that
        // cause JSON to be seen by user by just switching sprites. yuck!
        if (!target.isStage && target.isOriginal) {
          for (const [listId, listVar] of Object.entries(target.variables)) {
            const listData = {
              targetName: target.getName(),
              variableId: listId,
            };
            if (listVar.type == "list") {
              lists.push({
                text: `${target.getName()}: ${listVar.name}`,
                value: JSON.stringify(listData),
              });
            }
          }
        }
      }
      if (lists.length === 0) {
        return [
          {
            text: "No local lists in other sprites",
            value: "null",
          },
        ];
      }
      return lists;
    }

    touchingFinger(args, util) {
      return this._touchUtil.isTouchingAnyFinger(util);
    }

    touchingSpecificFinger({ ID }, util) {
      return this._touchUtil.isTouchingSpecificFinger(ID, util);
    }

    getTouchingFingerID(args, util) {
      let TouchingFingerID = 0;
      this._touchUtil.isTouchingAnyFinger(util, (FID) => {
        TouchingFingerID = FID + 1;
      });
      return TouchingFingerID;
    }

    fingerPosition({ ID, PositionType }) {
      const index = Scratch.Cast.toNumber(ID) - 1;
      const fingerPos = fingerPositions[index];
      if (fingerPos) {
        const positionIndex = PositionType === "x" ? 0 : 1;
        const finger = [fingerPos[0], fingerPos[1]];
        let scratchCoords = finger;
        const runtime = Scratch.vm.runtime;

        const canvasRect = canvas.getBoundingClientRect();
        if (PositionType === "x") {
          const clientWidth = canvasRect.right - canvasRect.left;
          const toScratch = runtime.stageWidth / clientWidth;
          scratchCoords[0] *= toScratch;
          scratchCoords[0] -= runtime.stageWidth / 2;
        } else {
          const clientheight = canvasRect.bottom - canvasRect.top;
          const toScratch = runtime.stageHeight / clientheight;
          scratchCoords[1] *= toScratch;
          scratchCoords[1] = runtime.stageHeight / 2 - scratchCoords[1];
        }
        return scratchCoords[positionIndex];
      }
      return 0;
    }

    isFingerDown({ ID }) {
      return !!fingerPositions[Scratch.Cast.toNumber(ID) - 1];
    }

    listInSprite({ index, List }) {
      const variable = getListFromMenu(List);
      if (!variable) {
        return "";
      }
      const casted = Scratch.Cast.toListIndex(
        index,
        variable.value.length,
        false
      );
      if (casted === "INVALID") {
        return "";
      }
      return variable.value[casted - 1];
    }

    listContains({ term, List }) {
      const variable = getListFromMenu(List);
      if (!variable) {
        return "";
      }
      const list = variable.value;
      for (let i = 0; i < list.length; i++) {
        if (Scratch.Cast.compare(list[i], term) === 0) {
          return true;
        }
      }
      return false;
    }

    lengthOfListInSprite({ List }) {
      const variable = getListFromMenu(List);
      if (!variable) {
        return "";
      }
      return variable.value.length;
    }

    itemNumberInList({ term, List }) {
      const variable = getListFromMenu(List);
      if (!variable) {
        return "";
      }
      const list = variable.value;
      for (let i = 0; i < list.length; i++) {
        if (Scratch.Cast.compare(list[i], term) === 0) {
          return i + 1;
        }
      }
      return 0;
    }

    touchingOriginal({ Sprite }, util) {
      const target = vm.runtime.getSpriteTargetByName(Sprite);
      if (!target) {
        return false;
      }
      return Scratch.vm.renderer.isTouchingDrawables(util.target.drawableID, [
        target.drawableID,
      ]);
    }

    touchingClone({ Sprite }, util) {
      const parentTarget = vm.runtime.getSpriteTargetByName(Sprite);
      if (!parentTarget) {
        return false;
      }
      const drawablesIds = parentTarget.sprite.clones
        .filter((i) => !i.isOriginal)
        .map((i) => i.drawableID);
      if (drawablesIds.length === 0) {
        return false;
      }
      return Scratch.renderer.isTouchingDrawables(
        util.target.drawableID,
        drawablesIds
      );
    }
  }
  Scratch.extensions.register(new SensingPlus());
})(window.Scratch);
