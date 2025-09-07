// Name: Audio Tools
// ID: audioExtension
// Description: Read raw audio data from the microphone
// By: libmaster169
// License: MPL-2.0

class AudioExtension {
    constructor() {
        this.recorder = null;
        this.audioData = [];
        this.context = new (window.AudioContext || window.webkitAudioContext)();
        this.sampleRate = this.context.sampleRate;
    }

    getInfo() {
        return {
    id: 'audioExtension',
    name: 'Audio Tools',
    blocks: [
        { opcode: 'startRecording', blockType: Scratch.BlockType.COMMAND, text: 'Start recording' },
        { opcode: 'stopRecording', blockType: Scratch.BlockType.COMMAND, text: 'Stop recording' },
        { opcode: 'getLen', blockType: Scratch.BlockType.REPORTER, text: 'Get recording length in seconds' },
        { opcode: 'getBinaryData', blockType: Scratch.BlockType.REPORTER, text: 'Get recording' },
        { opcode: 'getSampleBinary', blockType: Scratch.BlockType.REPORTER, text: 'Sample [INDEX]', arguments: { INDEX: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 } } },
        { opcode: 'getSampleRate', blockType: Scratch.BlockType.REPORTER, text: 'Get sample rate' },
        { opcode: 'playRecording', blockType: Scratch.BlockType.COMMAND, text: 'Play recording' },
        { opcode: 'joinRecording', blockType: Scratch.BlockType.COMMAND, text: 'Join recording with [DATA]', arguments: { DATA: { type: Scratch.ArgumentType.STRING, defaultValue: "0,0,0" } } },
        { opcode: 'setSampleTo', blockType: Scratch.BlockType.COMMAND, text: 'Set sample [INDEX] to [VALUE]', arguments: { INDEX: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }, VALUE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 } } }
    ]
};

    }

    startRecording() {
        navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
            this.recorder = new MediaRecorder(stream);
            let dataChunks = [];
            this.recorder.ondataavailable = event => dataChunks.push(event.data);
            this.recorder.onstop = async () => {
                let audioBlob = new Blob(dataChunks, { type: 'audio/wav' });
                let arrayBuffer = await audioBlob.arrayBuffer();
                let audioBuffer = await this.context.decodeAudioData(arrayBuffer);
                this.audioData = audioBuffer.getChannelData(0);
                this.sampleRate = audioBuffer.sampleRate;
            };
            this.recorder.start();
        });
    }

    stopRecording() {
        if (this.recorder) {
            this.recorder.stop();
        }
    }

    getBinaryData() {
        return this.audioData.map(sample => (sample)).join(","); 
    }

    getSampleBinary(args) {
        const index = args.INDEX;
        if (this.audioData && this.audioData.length > index) {
            return this.audioData[index];
        }
        return 0;
    }

    getSampleRate() {
        return this.sampleRate; 
    }

    playRecording() {
        if (!this.audioData.length) return;

        const buffer = this.context.createBuffer(1, this.audioData.length, this.sampleRate);
        buffer.copyToChannel(new Float32Array(this.audioData), 0);
        const source = this.context.createBufferSource();
        source.buffer = buffer;
        source.connect(this.context.destination);
        source.start();
    }

    joinRecording(args) {
        const newData = args.DATA.split(",").map(Number);
        this.audioData = [].concat(newData);
    }
    getLen() {
	return this.audioData.map(sample => (sample)).join(",").length / this.sampleRate;
    }
    setSampleTo(args) {
        const index = args.INDEX;
        const value = args.VALUE;
        if (this.audioData && this.audioData.length > index) {
            this.audioData[index] = value;
        }
    }
}

Scratch.extensions.register(new AudioExtension());
