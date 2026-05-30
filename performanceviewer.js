(function() {
    class Performance {
        constructor(runtime) {
            this.runtime = runtime;
            this.lastFrameTime = performance.now();
            this.fps = 0;
            
            const updateFPS = () => {
                const now = performance.now();
                const delta = now - this.lastFrameTime;
                this.fps = Math.round(1000 / delta);
                this.lastFrameTime = now;
                requestAnimationFrame(updateFPS);
            };
            requestAnimationFrame(updateFPS);
        }

        getInfo() {
            return {
                id: 'performanceReporter',
                name: 'Performance',
                color1: '#7ed321',
                color2: '#6eb81c',
                blocks: [
                    { opcode: 'getFps', blockType: Scratch.BlockType.REPORTER, text: 'fps' },
                    { opcode: 'getMemory', blockType: Scratch.BlockType.REPORTER, text: 'memory usage' },
                    { opcode: 'getPing', blockType: Scratch.BlockType.REPORTER, text: 'ping' }
                ]
            };
        }

        getFps() { return this.fps; }

        getMemory() {
            if (window.performance && performance.memory) {
                return Math.round(performance.memory.usedJSHeapSize / 1024 / 1024) + " MB";
            }
            return "Browser Restricted";
        }

        async getPing() {
            const startTime = performance.now();
                await fetch('https://www.google.com', { mode: 'no-cors', cache: 'no-store' });
                return Math.round(performance.now() - startTime);
            } catch (e) {
                return -1;
            }
        }
    }

    Scratch.extensions.register(new Performance());
})();
