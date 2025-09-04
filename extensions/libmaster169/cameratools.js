// Name: Camera Tools
// ID: cameraExtensionByLibmaster169
// Description: Start and stop camera, read image from camera, and more
// By: libmaster169
// License: MPL-2.0
class CameraExtension {
    constructor() {
        this.video = document.createElement("video");
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d");
        this.codeImage = "";
        this.stream = null;
        this.mediaRecorder = null;
        this.videoChunks = [];
        this.filmDataURL = "";
    }

    getInfo() {
        return {
            id: 'cameraExtensionByLibmaster169',
            name: 'Camera Tools',
            blocks: [
                { opcode: 'startCamera', blockType: Scratch.BlockType.COMMAND, text: 'Uruchom kamerę' },
                { opcode: 'stopCamera', blockType: Scratch.BlockType.COMMAND, text: 'Wyłącz kamerę' },
                { opcode: 'captureFrame', blockType: Scratch.BlockType.COMMAND, text: 'Zapisz obraz z kamery' },
                { opcode: 'getBinaryImage', blockType: Scratch.BlockType.REPORTER, text: 'Pobierz zakodowany obraz' },
                { opcode: 'getPixelBinary', blockType: Scratch.BlockType.REPORTER, text: 'Piksel [X], [Y] w formie kodu', arguments: { X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }, Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 } } },
                { opcode: 'joinFrames', blockType: Scratch.BlockType.COMMAND, text: 'Połącz obraz z [DATA]', arguments: { DATA: { type: Scratch.ArgumentType.STRING, defaultValue: "" } } },
                { opcode: 'setPixelTo', blockType: Scratch.BlockType.COMMAND, text: 'Ustaw piksel [X], [Y] na kod [VALUE]', arguments: { X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }, Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }, VALUE: { type: Scratch.ArgumentType.STRING, defaultValue: "900" } } },
                { opcode: 'getFrameDataURL', blockType: Scratch.BlockType.REPORTER, text: 'Pobierz klatkę jako DATA:url' },
                { opcode: 'startFilmRecording', blockType: Scratch.BlockType.COMMAND, text: 'Start nagrywania filmu' },
                { opcode: 'stopFilmRecording', blockType: Scratch.BlockType.COMMAND, text: 'Zatrzymaj nagrywanie filmu' },
                { opcode: 'getFilmDataURL', blockType: Scratch.BlockType.REPORTER, text: 'Pobierz film jako DATA:url' }
            ]
        };
    }

    startCamera() {
        navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
            this.stream = stream;
            this.video.srcObject = stream;
            this.video.play();
        }).catch(error => console.error("Błąd przy uruchamianiu kamery:", error));
    }

    stopCamera() {
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.video.srcObject = null;
            this.stream = null;
        }
    }

    captureFrame() {
        this.canvas.width = this.video.videoWidth;
        this.canvas.height = this.video.videoHeight;
        this.context.drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);

        let imageData = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
        let result = "";
        for (let i = 0; i < imageData.data.length; i += 4) {
            result += this.rgbToCode(imageData.data[i], imageData.data[i + 1], imageData.data[i + 2]);
        }
        this.codeImage = result;
    }

    getBinaryImage() {
        return this.codeImage;
    }

    getPixelBinary(args) {
        let x = args.X, y = args.Y;
        let pixelData = this.context.getImageData(x, y, 1, 1).data;
        return this.rgbToCode(pixelData[0], pixelData[1], pixelData[2]);
    }

    joinFrames(args) {
        this.codeImage += args.DATA;
    }

    setPixelTo(args) {
        let x = args.X, y = args.Y, value = args.VALUE.toString();
        let color = this.codeToRGB(value);
        let imageData = this.context.getImageData(x, y, 1, 1);
        [imageData.data[0], imageData.data[1], imageData.data[2], imageData.data[3]] = color;
        this.context.putImageData(imageData, x, y);
    }

    rgbToCode(r, g, b) {
        let R = Math.floor((r / 255) * 9);
        let G = Math.floor((g / 255) * 9);
        let B = Math.floor((b / 255) * 9);
        return `${R}${G}${B}`;
    }

    codeToRGB(code) {
        let str = code.toString().padStart(3, '0');
        return [Math.round((parseInt(str[0]) / 9) * 255), Math.round((parseInt(str[1]) / 9) * 255), Math.round((parseInt(str[2]) / 9) * 255), 255];
    }

    getFrameDataURL() {
        return this.canvas.toDataURL("image/png");
    }

    startFilmRecording() {
        if (this.stream) {
            this.videoChunks = [];
            this.mediaRecorder = new MediaRecorder(this.stream, { mimeType: "video/webm" });
            this.mediaRecorder.ondataavailable = event => this.videoChunks.push(event.data);
            this.mediaRecorder.start();
        }
    }

    stopFilmRecording() {
        if (this.mediaRecorder) {
            this.mediaRecorder.onstop = () => {
                const blob = new Blob(this.videoChunks, { type: "video/webm" });
                const reader = new FileReader();
                reader.onloadend = () => this.filmDataURL = reader.result;
                reader.readAsDataURL(blob);
            };
            this.mediaRecorder.stop();
        }
    }

    getFilmDataURL() {
        return this.filmDataURL;
    }
} 

Scratch.extensions.register(new CameraExtension());
