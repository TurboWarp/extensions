class TASExtension {
    getInfo() {
        return {
            id: 'tasExtension',
            name: 'TAS',
            color1: '#1E1E2E', // Primary color (dark blue)
            color2: '#1E1E2E', // Secondary color (dark blue)
            color3: '#1E1E2E', // Tertiary color (dark blue)
            menuIconURI: 'https://i.ibb.co/1JN8stp/Untitled23-20241101223926.png', // Your icon URL
            blocks: [
                {
                    opcode: 'startTimer',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'start speedrun timer',
                    blockIconURI: 'https://i.ibb.co/1JN8stp/Untitled23-20241101223926.png' // Icon for the block
                },
                {
                    opcode: 'stopTimer',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'stop speedrun timer',
                    blockIconURI: 'https://i.ibb.co/1JN8stp/Untitled23-20241101223926.png' // Icon for the block
                },
                {
                    opcode: 'resetTimer',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'reset speedrun timer',
                    blockIconURI: 'https://i.ibb.co/1JN8stp/Untitled23-20241101223926.png' // Icon for the block
                },
                {
                    opcode: 'pauseTimer',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'pause speedrun timer',
                    blockIconURI: 'https://i.ibb.co/1JN8stp/Untitled23-20241101223926.png' // Icon for the block
                },
                {
                    opcode: 'resumeTimer',
                    blockType: Scratch.BlockType.COMMAND,
                    text: 'resume speedrun timer',
                    blockIconURI: 'https://i.ibb.co/1JN8stp/Untitled23-20241101223926.png' // Icon for the block
                },
                {
                    opcode: 'isTimerRunning',
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: 'is speedrun timer running?',
                    blockIconURI: 'https://i.ibb.co/1JN8stp/Untitled23-20241101223926.png' // Icon for the block
                },
                {
                    opcode: 'getElapsedTime',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'elapsed time',
                    blockIconURI: 'https://i.ibb.co/1JN8stp/Untitled23-20241101223926.png' // Icon for the block
                },
                {
                    opcode: 'getCurrentTime',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'current time',
                    blockIconURI: 'https://i.ibb.co/1JN8stp/Untitled23-20241101223926.png' // Icon for the block
                },
                {
                    opcode: 'getTotalTime',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'total time including pauses',
                    blockIconURI: 'https://i.ibb.co/1JN8stp/Untitled23-20241101223926.png' // Icon for the block
                }
            ]
        };
    }

    startTimer() {
        this.startTime = Date.now();
        this.running = true;
        this.pausedTime = 0;
        this.pauseStart = null;
    }

    stopTimer() {
        this.endTime = Date.now();
        this.running = false;
    }

    resetTimer() {
        this.startTime = null;
        this.endTime = null;
        this.running = false;
        this.pausedTime = 0;
        this.pauseStart = null;
    }

    pauseTimer() {
        if (this.running && !this.pauseStart) {
            this.pauseStart = Date.now();
            this.running = false;
        }
    }

    resumeTimer() {
        if (this.pauseStart) {
            this.pausedTime += Date.now() - this.pauseStart;
            this.pauseStart = null;
            this.running = true;
        }
    }

    isTimerRunning() {
        return this.running || false;
    }

    getElapsedTime() {
        if (this.startTime && this.endTime) {
            return (this.endTime - this.startTime - this.pausedTime) / 1000; // return time in seconds
        }
        return 0;
    }

    getCurrentTime() {
        if (this.startTime) {
            return (Date.now() - this.startTime - this.pausedTime) / 1000; // return time in seconds
        }
        return 0;
    }

    getTotalTime() {
        if (this.startTime) {
            return (Date.now() - this.startTime) / 1000; // return total time in seconds
        }
        return 0;
    }
}

Scratch.extensions.register(new TASExtension());
