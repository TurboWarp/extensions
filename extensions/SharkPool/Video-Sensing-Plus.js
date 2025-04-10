// Name: Camera Sensing+
// ID: CameraSensingPlusSP
// Description: Expansion of the Video Sensing Blocks
// By: SharkPool
// License: MIT

// Version V.2.0.01

(function(Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) throw new Error("Camera Sensing+ must run unsandboxed");

  const menuIconURI =
"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDYuNTQ1IiBoZWlnaHQ9IjEwNi41NDUiIHZpZXdCb3g9IjAgMCAxMDYuNTQ1IDEwNi41NDUiPjxwYXRoIGQ9Ik0wIDUzLjI3MkMwIDIzLjg1MSAyMy44NSAwIDUzLjI3MiAwczUzLjI3MiAyMy44NSA1My4yNzIgNTMuMjcyLTIzLjg1IDUzLjI3Mi01My4yNzIgNTMuMjcyUzAgODIuNjk0IDAgNTMuMjcyIiBmaWxsPSIjMDBiMmE0Ii8+PHBhdGggZD0iTTY1LjE0NCA0MC4wMzRjLjE3NS4zNTguMzEuNjc0LjMxLjU4NXYyNC44MjRhMS4yMSAxLjIxIDAgMCAxLTEuMjA1IDEuMjA1LjcuNyAwIDAgMS0uMzUzLS4xM2wtLjIzMi0uMTgtMTUuMDgtOS4wNDl2NS41MDNjMCA0LjY5MS0zLjg1MyA4LjY3Ni04LjQzNiA4LjY3NmgtMjEuNDVjLTQuODU3LS4yMTItOC42NzYtNC4wMzEtOC42NzYtOC42NzZ2LTE5LjA0YzAtNC44NzcgMy43OTktOC42NzYgOC42NzctOC42NzZoMjEuNDVjNC42NjggMCA4LjQzNSAzLjgzMSA4LjQzNSA4LjY3NnY1LjU5MWwxNC44NzQtOS42NGMuNjUtLjM5IDEuMzM2LS4yNTMgMS42ODYuMzMxIiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTg0LjAxIDQ0LjA5MXYxOC4zNjJtOS4xODEtOS4xODFINzQuODI4IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iOC41IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48L3N2Zz4=";
  const blockIconURI =
"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2Ni42OTIiIGhlaWdodD0iNjYuNjkyIiB2aWV3Qm94PSIwIDAgNjYuNjkyIDY2LjY5MiI+PHBhdGggZD0iTTAgNjYuNjkyVjBoNjYuNjkydjY2LjY5MnoiIGZpbGw9Im5vbmUiLz48cGF0aCBkPSJNNTcuNjE2IDIxLjYyM2MuMTU0LjMxNy4yNzQuNTk3LjI3NC41MTh2MjEuOTgzYTEuMDcgMS4wNyAwIDAgMS0xLjA2NyAxLjA2Ny42LjYgMCAwIDEtLjMxMy0uMTE0bC0uMjA1LS4xNi0xMy4zNTUtOC4wMTN2NC44NzJjMCA0LjE1NS0zLjQxMSA3LjY4NC03LjQ3IDcuNjg0SDE2LjQ4NmMtNC4zMDEtLjE4OC03LjY4My0zLjU3LTcuNjgzLTcuNjg0di0xNi44NmMwLTQuMzIgMy4zNjQtNy42ODQgNy42ODMtNy42ODRoMTguOTk1YzQuMTM1IDAgNy40NyAzLjM5MyA3LjQ3IDcuNjg0djQuOTUxbDEzLjE3My04LjUzOGMuNTc1LS4zNDQgMS4xODItLjIyMyAxLjQ5Mi4yOTQiIGZpbGw9IiNmZmYiLz48L3N2Zz4=";
  const videoSensingURI =
"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMCAxMCkiIHN0cm9rZT0iIzAwMCIgZmlsbD0ibm9uZSIgc3Ryb2tlLW9wYWNpdHk9Ii4xNSI+PGNpcmNsZSBmaWxsPSIjRkZGIiBvcGFjaXR5PSIuMjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgY3g9IjMyIiBjeT0iMTYiIHI9IjQuNSIvPjxjaXJjbGUgZmlsbD0iI0ZGRiIgb3BhY2l0eT0iLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgY3g9IjMyIiBjeT0iMTIiIHI9IjQuNSIvPjxjaXJjbGUgZmlsbD0iI0ZGRiIgb3BhY2l0eT0iLjc1IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGN4PSIzMiIgY3k9IjgiIHI9IjQuNSIvPjxjaXJjbGUgZmlsbD0iI0ZGRiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjeD0iMzIiIGN5PSI0IiByPSI0LjUiLz48cGF0aCBkPSJtMjIuNjcyIDQuNDItNi4xNzIgNFY2LjFjMC0yLjAxLTEuNTYzLTMuNi0zLjUtMy42SDQuMUMyLjA3NiAyLjUuNSA0LjA3Ni41IDYuMVYxNGMwIDEuOTI3IDEuNTg0IDMuNTEyIDMuNiAzLjZIMTNjMS45MDIgMCAzLjUtMS42NTMgMy41LTMuNnYtMi4yODNsNi4yNTcgMy43NTQuMDk3LjA3NWMuMDIuMDIuMDk4LjA1NC4xNDYuMDU0LjI2NyAwIC41LS4yMTcuNS0uNVY0LjhjMCAuMDM3LS4wNTYtLjA5NC0uMTI5LS4yNDMtLjE0NS0uMjQyLS40My0uMjk5LS43LS4xMzdaIiBmaWxsPSIjNEQ0RDREIi8+PC9nPjwvc3ZnPg==";

  const vm = Scratch.vm;
  const runtime = vm.runtime;

  if (!Scratch.vm.extensionManager.isExtensionLoaded("videoSensing")) runtime.extensionManager.loadExtensionIdSync("videoSensing");

  const canvasElement = document.createElement("canvas");
  let canUse = false;
  function hasFrontOrBackCamera() {
    const user = navigator.userAgent;
    canUse = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(user);
  }
  hasFrontOrBackCamera();

  let OGvideoID = -1;

  class CameraSensingPlus {
    constructor() {
      this.camSize = [640, 480];
      this.cutSize = [0, 0];
      this.camStyle = "user";
      this.scale = 100;
      this.cutoutDir = 90;
      this.softness = 10;
    }
  
    getInfo() {
      return {
        id: "CameraSensingPlusSP",
        name: "Camera Sensing+",
        color1: "#00b2a4",
        menuIconURI,
        blockIconURI,
        blocks: [
          {
            blockType: Scratch.BlockType.XML,
            xml: "<sep gap=\"-10\"/><label text=\"Video Sensing Compatible\"/><sep gap=\"-12\"/><sep gap=\"12\"/>",
          },
          {
            opcode: "vidStatus",
            blockType: Scratch.BlockType.BOOLEAN,
            extensions: ["colours_pen"],
            blockIconURI: videoSensingURI,
            text: "is video on?"
          },
          {
            opcode: "videoTarget",
            blockType: Scratch.BlockType.COMMAND,
            extensions: ["colours_pen"],
            blockIconURI: videoSensingURI,
            text: "toggle video on [TARGET] [ON_OFF]",
            arguments: {
              ON_OFF: { type: Scratch.ArgumentType.STRING, menu: "onOffMenu" },
              TARGET: { type: Scratch.ArgumentType.STRING, menu: "targets" }
            }
          },
          {
            opcode: "captureVideo",
            blockType: Scratch.BlockType.REPORTER,
            extensions: ["colours_pen"],
            blockIconURI: videoSensingURI,
            text: "video frame data.URI",
            disableMonitor: true
          },
          { blockType: Scratch.BlockType.LABEL, text: "Non-Compatible:" },
          {
            blockType: Scratch.BlockType.XML,
            xml: "<sep gap=\"-10\"/><label text=\"Camera Feed\"/><sep gap=\"-12\"/><sep gap=\"12\"/>",
          },
          {
            opcode: "turnOnCamera",
            blockType: Scratch.BlockType.COMMAND,
            text: "turn camera [ON_OFF]",
            arguments: {
              ON_OFF: { type: Scratch.ArgumentType.STRING, menu: "onOffMenu" }
            }
          },
          {
            opcode: "whenCamera",
            blockType: Scratch.BlockType.EVENT,
            isEdgeActivated: false,
            text: "when camera turns [ON_OFF]",
            arguments: {
              ON_OFF: { type: Scratch.ArgumentType.STRING, menu: "onOffMenu" }
            }
          },
          {
            opcode: "captureWebcamFootage",
            blockType: Scratch.BlockType.REPORTER,
            text: "camera frame data.URI",
            disableMonitor: true
          },
          {
            opcode: "useCam",
            blockType: Scratch.BlockType.COMMAND,
            text: "use [TYPE] camera",
            arguments: {
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "frontBack" }
            }
          },
          {
            opcode: "camStatus",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is camera on?"
          },
          {
            opcode: "hasBack",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "has back camera?"
          },
          "---",
          {
            opcode: "setResolution",
            blockType: Scratch.BlockType.COMMAND,
            text: "set camera resolution to width [WIDTH] and height [HEIGHT]",
            arguments: {
              WIDTH: { type: Scratch.ArgumentType.NUMBER, defaultValue: 640 },
              HEIGHT: { type: Scratch.ArgumentType.NUMBER, defaultValue: 480 }
            }
          },
          {
            opcode: "defaultRes",
            blockType: Scratch.BlockType.REPORTER,
            text: "default camera [W_H]",
            disableMonitor: true,
            arguments: {
              W_H: { type: Scratch.ArgumentType.STRING, menu: "widthHeight" }
            }
          },
          {
            opcode: "currentRes",
            blockType: Scratch.BlockType.REPORTER,
            text: "current camera [W_H]",
            disableMonitor: true,
            arguments: {
              W_H: { type: Scratch.ArgumentType.STRING, menu: "widthHeight" }
            }
          }
        ],
        menus: {
          onOffMenu: ["on", "off"],
          widthHeight: ["width", "height"],
          positions: ["x", "y"],
          frontBack: [{ text: "front", value: "user" }, { text: "back", value: "environment" }],
          targets: { acceptReporters: true, items: "getTargets" }
        }
      };
    }

    // Helper Funcs
    getTargets() {
      const spriteNames = [{ text: "myself", value: "_myself_" }, { text: "Stage", value: "_stage_" }];
      const targets = runtime.targets;
      for (let i = 1; i < targets.length; i++) {
        const target = targets[i];
        if (target.isOriginal) spriteNames.push({ text: target.getName(), value: target.getName() });
      }
      return spriteNames.length > 0 ? spriteNames : [""];
    }

    printCapture() {
      if (this.videoElement) {
        canvasElement.width = Math.abs(Scratch.Cast.toNumber(this.camSize[0]));
        canvasElement.height = Math.abs(Scratch.Cast.toNumber(this.camSize[1]));
        const context = canvasElement.getContext("2d");
        if (this.camSize[0] < 0) {
          context.translate(canvasElement.width, 0);
          context.scale(-1, 1);
        }
        if (this.camSize[1] < 0) {
          context.translate(0, canvasElement.height);
          context.scale(1, -1);
        }
        context.drawImage(this.videoElement, 0, 0, canvasElement.width, canvasElement.height);
        return canvasElement.toDataURL("image/png");
      }
      return "";
    }

    // Compatible Blocks
    vidStatus() { return runtime.ioDevices.video.videoReady }

    videoTarget(args, util) {
      let target = args.TARGET === "_myself_" ? util.target : runtime.getSpriteTargetByName(args.TARGET);
      if (!target && args.TARGET !== "_stage_") return;
      if (OGvideoID === -1) OGvideoID = vm.runtime.ioDevices.video._drawable;
      if (args.TARGET === "_stage_") {
        const vidLayer = vm.renderer._allDrawables[OGvideoID];
        if (vidLayer) vidLayer.updateVisible(args.ON_OFF === "on");
      } else {
        const drawable = vm.renderer._allDrawables[target.drawableID];
        if (drawable.ogSkin === undefined) drawable.ogSkin = drawable._skin._id;

        if (args.ON_OFF === "on") drawable._skin = vm.renderer._allSkins[runtime.ioDevices.video._skinId];
        else {
          drawable._skin = vm.renderer._allSkins[drawable.ogSkin];
          target.updateAllDrawableProperties();
          // to avoid stretching issues
          const oldScale = target.size;
          target.setSize(-1);
          target.setSize(oldScale);
        }
      }
    }

    captureVideo() {
      const imageData = runtime.ioDevices.video.getFrame({});
      if (imageData === null) return "";
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = imageData.width;
      canvas.height = imageData.height;
      context.putImageData(imageData, 0, 0);
      return canvas.toDataURL();
    }

    // Non-Compatible Blocks
    async turnOnCamera(args) {
      if (args.ON_OFF === "on") {
        if (!this.mediaStream) {
          try {
            this.mediaStream = "";
            if (canUse) {
              this.mediaStream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: { exact: this.camStyle } }
              });
            } else {
              this.mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
            }
            this.videoElement = document.createElement("video");
            this.videoElement.srcObject = this.mediaStream;
            this.videoElement.play();
            runtime.startHats("CameraSensingPlusSP_whenCamera", { ON_OFF : "on" });
          } catch (error) {
            console.error("Error accessing the camera:", error);
          }
        }
      } else {
        if (this.mediaStream) {
          this.mediaStream.getTracks().forEach(track => track.stop());
          this.videoElement.remove();
          this.videoElement = null;
          this.mediaStream = null;
          runtime.startHats("CameraSensingPlusSP_whenCamera", { ON_OFF : "off" });
        }
      }
    }

    async useCam(args) {
      if (canUse) {
        // Camera Reset
        await this.turnOnCamera({ ON_OFF : "off" });
        this.camStyle = args.TYPE;
        await this.turnOnCamera({ ON_OFF : "on" });
      } else { console.warn("Process Denied, Camera has no Front/Back") }
    }

    setResolution(args) {
      this.camSize = [
        Scratch.Cast.toNumber(args.WIDTH),
        Scratch.Cast.toNumber(args.HEIGHT)
      ];
    }

    defaultRes(args) {
      if (!this.videoElement || !this.mediaStream) return "camera is not on";
      return this.videoElement[args.W_H === "width" ? "videoWidth" : "videoHeight"];
    }
    currentRes(args) { return this.camSize[args.W_H === "width" ? 0 : 1] }

    camStatus() { return Scratch.Cast.toBoolean(this.videoElement || this.mediaStream) }

    hasBack() { return canUse }

    captureWebcamFootage() {
      if (this.videoElement) return this.printCapture();
      else return "Camera is Off";
    }
  }

  Scratch.extensions.register(new CameraSensingPlus());
})(Scratch);
