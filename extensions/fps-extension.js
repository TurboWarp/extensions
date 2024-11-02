(function (Scratch) {
    'use strict';

    class FPSExtension {
        getInfo() {
            return {
                id: 'fpsExtension',
                name: 'FPS',
                color1: '#4C97FF', // Primary color
                color2: '#3373CC', // Secondary color
                color3: '#2A56A5', // Tertiary color
                menuIconURI: 'https://i.ibb.co/pwJbBMB/Untitled24-20241102140349.png', // Replace with your icon URL
                blocks: [
                    {
                        opcode: 'getFPS',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'current FPS',
                        blockIconURI: 'https://i.ibb.co/pwJbBMB/Untitled24-20241102140349.png' // Replace with your icon URL
                    },
                    {
                        opcode: 'startFPS',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'start FPS counter',
                        blockIconURI: 'https://i.ibb.co/pwJbBMB/Untitled24-20241102140349.png' // Replace with your icon URL
                    },
                    {
                        opcode: 'stopFPS',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'stop FPS counter',
                        blockIconURI: 'https://i.ibb.co/pwJbBMB/Untitled24-20241102140349.png' // Replace with your icon URL
                    },
                    {
                        opcode: 'resetFPS',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'reset FPS counter',
                        blockIconURI: 'https://i.ibb.co/pwJbBMB/Untitled24-20241102140349.png' // Replace with your icon URL
                    }
                ]
            };
        }

        constructor() {
            this.lastFrameTime = performance.now();
            this.frameCount = 0;
            this.fps = 0;
            this.running = false;
            this.updateFPS();
        }

        updateFPS() {
            if (this.running) {
                const now = performance.now();
                this.frameCount++;
                const delta = now - this.lastFrameTime;
                if (delta >= 1000) {
                    this.fps = this.frameCount;
                    this.frameCount = 0;
                    this.lastFrameTime = now;
                }
            }
            requestAnimationFrame(this.updateFPS.bind(this));
        }

        getFPS() {
            return this.fps;
        }

        startFPS() {
            this.running = true;
            this.lastFrameTime = performance.now();
            this.frameCount = 0;
        }

        stopFPS() {
            this.running = false;
        }

        resetFPS() {
            this.fps = 0;
            this.frameCount = 0;
            this.lastFrameTime = performance.now();
        }
    }

    Scratch.extensions.register(new FPSExtension());
})(Scratch);
