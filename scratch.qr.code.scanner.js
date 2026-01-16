(function(Scratch) {
  'use strict';

  // Load the jsQR library dynamically from a CDN
  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.min.js';
  document.head.appendChild(script);

  class QRCodeScanner {
    constructor() {
      this.lastResult = null;
      this.detected = false;
      this.isScanning = false;
    }

    getInfo() {
      return {
        id: 'sweetsebiQR',
        name: 'QR Scanner',
        color1: '#4C97FF',
        color2: '#3373CC',
        blocks: [
          {
            opcode: 'scanScreen',
            blockType: Scratch.BlockType.COMMAND,
            text: 'scan screen for QR code'
          },
          {
            opcode: 'isDetected',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'is a QR code detected?'
          },
          {
            opcode: 'getData',
            blockType: Scratch.BlockType.REPORTER,
            text: 'QR code data'
          }
        ]
      };
    }

    /**
     * Captures the stage using a more robust "frame capture" method.
     */
    scanScreen() {
      if (typeof jsQR === 'undefined') {
        console.warn('QR Scanner: jsQR library not loaded yet.');
        return;
      }

      if (this.isScanning) return;
      this.isScanning = true;

      const runtime = Scratch.vm.runtime;
      const renderer = runtime.renderer;

      if (!renderer || !renderer.canvas) {
        console.error('QR Scanner: Renderer or Canvas not found.');
        this.isScanning = false;
        return;
      }

      try {
        const canvas = renderer.canvas;
        const width = canvas.width;
        const height = canvas.height;

        // Create the off-screen canvas once
        const snapshotCanvas = document.createElement('canvas');
        snapshotCanvas.width = width;
        snapshotCanvas.height = height;
        const ctx = snapshotCanvas.getContext('2d');

        // FORCE A RENDER: TurboWarp's canvas is often empty between frames.
        // We tell the renderer to draw exactly now so the buffer is full.
        renderer.draw(); 

        // Grab the content immediately after the draw call
        ctx.drawImage(canvas, 0, 0);
        
        const imageData = ctx.getImageData(0, 0, width, height);

        // Scan the pixels
        const code = jsQR(imageData.data, width, height, {
          inversionAttempts: "dontInvert"
        });

        if (code && code.data) {
          this.lastResult = code.data;
          this.detected = true;
        } else {
          this.detected = false;
        }
      } catch (e) {
        console.error('QR Scanner Error:', e);
        this.detected = false;
      }

      this.isScanning = false;
    }

    isDetected() {
      return this.detected;
    }

    getData() {
      return this.detected ? this.lastResult : "";
    }
  }

  Scratch.extensions.register(new QRCodeScanner());
})(Scratch);