// Name: Camera Tools
// ID: cameraExtensionByLibmaster169
// Description: Start and stop camera, read image from camera, and more
// By: libmaster169
// License: MPL-2.0
/* generated l10n code */
Scratch.translate.setup({
  pl: {
    "_Start camera": "Uruchom kamerę",
    "_Stop camera": "Wyłącz kamerę",
    "_Capture image from camera": "Zapisz obraz z kamery",
    "_Get encoded image": "Pobierz zakodowany obraz",
    "_Pixel [X], [Y] as code": "Piksel [X], [Y] jako kod",
    "_Join image with [DATA]": "Połącz obraz z [DATA]",
    "_Set pixel [X], [Y] to code [VALUE]": "Ustaw piksel [X], [Y] na kod [VALUE]",
    "_Get frame as DATA:url": "Pobierz klatkę jako DATA:url",
    "_Start film recording": "Rozpocznij nagrywanie filmu",
    "_Stop film recording": "Zatrzymaj nagrywanie filmu",
    "_Get film as DATA:url": "Pobierz film jako DATA:url"
  },
  en: {
    "_Start camera": "Start camera",
    "_Stop camera": "Stop camera",
    "_Capture image from camera": "Capture image from camera",
    "_Get encoded image": "Get encoded image",
    "_Pixel [X], [Y] as code": "Pixel [X], [Y] as code",
    "_Join image with [DATA]": "Join image with [DATA]",
    "_Set pixel [X], [Y] to code [VALUE]": "Set pixel [X], [Y] to code [VALUE]",
    "_Get frame as DATA:url": "Get frame as DATA:url",
    "_Start film recording": "Start film recording",
    "_Stop film recording": "Stop film recording",
    "_Get film as DATA:url": "Get film as DATA:url"
  },
  de: {
    "_Start camera": "Kamera starten",
    "_Stop camera": "Kamera stoppen",
    "_Capture image from camera": "Bild von Kamera aufnehmen",
    "_Get encoded image": "Kodiertes Bild abrufen",
    "_Pixel [X], [Y] as code": "Pixel [X], [Y] als Code",
    "_Join image with [DATA]": "Bild mit [DATA] verbinden",
    "_Set pixel [X], [Y] to code [VALUE]": "Pixel [X], [Y] auf Code [VALUE] setzen",
    "_Get frame as DATA:url": "Frame als DATA:url abrufen",
    "_Start film recording": "Filmaufnahme starten",
    "_Stop film recording": "Filmaufnahme stoppen",
    "_Get film as DATA:url": "Film als DATA:url abrufen"
  },
  fr: {
    "_Start camera": "Démarrer la caméra",
    "_Stop camera": "Arrêter la caméra",
    "_Capture image from camera": "Capturer une image de la caméra",
    "_Get encoded image": "Obtenir l'image encodée",
    "_Pixel [X], [Y] as code": "Pixel [X], [Y] en code",
    "_Join image with [DATA]": "Joindre l'image avec [DATA]",
    "_Set pixel [X], [Y] to code [VALUE]": "Définir le pixel [X], [Y] sur le code [VALUE]",
    "_Get frame as DATA:url": "Obtenir l'image comme DATA:url",
    "_Start film recording": "Démarrer l'enregistrement vidéo",
    "_Stop film recording": "Arrêter l'enregistrement vidéo",
    "_Get film as DATA:url": "Obtenir le film comme DATA:url"
  },
  es: {
    "_Start camera": "Iniciar cámara",
    "_Stop camera": "Detener cámara",
    "_Capture image from camera": "Capturar imagen de la cámara",
    "_Get encoded image": "Obtener imagen codificada",
    "_Pixel [X], [Y] as code": "Píxel [X], [Y] como código",
    "_Join image with [DATA]": "Unir imagen con [DATA]",
    "_Set pixel [X], [Y] to code [VALUE]": "Establecer píxel [X], [Y] al código [VALUE]",
    "_Get frame as DATA:url": "Obtener fotograma como DATA:url",
    "_Start film recording": "Iniciar grabación de vídeo",
    "_Stop film recording": "Detener grabación de vídeo",
    "_Get film as DATA:url": "Obtener vídeo como DATA:url"
  },
  ja: {
    "_Start camera": "カメラを起動",
    "_Stop camera": "カメラを停止",
    "_Capture image from camera": "カメラから画像を取得",
    "_Get encoded image": "エンコードされた画像を取得",
    "_Pixel [X], [Y] as code": "ピクセル [X], [Y] をコードとして取得",
    "_Join image with [DATA]": "[DATA] と画像を結合",
    "_Set pixel [X], [Y] to code [VALUE]": "ピクセル [X], [Y] をコード [VALUE] に設定",
    "_Get frame as DATA:url": "フレームを DATA:url として取得",
    "_Start film recording": "録画を開始",
    "_Stop film recording": "録画を停止",
    "_Get film as DATA:url": "動画を DATA:url として取得"
  },
  ru: {
    "_Start camera": "Запустить камеру",
    "_Stop camera": "Остановить камеру",
    "_Capture image from camera": "Сделать снимок с камеры",
    "_Get encoded image": "Получить закодированное изображение",
    "_Pixel [X], [Y] as code": "Пиксель [X], [Y] как код",
    "_Join image with [DATA]": "Объединить изображение с [DATA]",
    "_Set pixel [X], [Y] to code [VALUE]": "Установить пиксель [X], [Y] на код [VALUE]",
    "_Get frame as DATA:url": "Получить кадр как DATA:url",
    "_Start film recording": "Начать запись видео",
    "_Stop film recording": "Остановить запись видео",
    "_Get film as DATA:url": "Получить видео как DATA:url"
  },
  "zh-cn": {
    "_Start camera": "启动摄像头",
    "_Stop camera": "关闭摄像头",
    "_Capture image from camera": "从摄像头捕获图像",
    "_Get encoded image": "获取编码图像",
    "_Pixel [X], [Y] as code": "像素 [X], [Y] 的编码",
    "_Join image with [DATA]": "将图像与 [DATA] 合并",
    "_Set pixel [X], [Y] to code [VALUE]": "将像素 [X], [Y] 设置为编码 [VALUE]",
    "_Get frame as DATA:url": "获取帧为 DATA:url",
    "_Start film recording": "开始录像",
    "_Stop film recording": "停止录像",
    "_Get film as DATA:url": "获取视频为 DATA:url"
  }
});
/* end generated l10n code */

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
      { opcode: 'startCamera', blockType: Scratch.BlockType.COMMAND, text: Scratch.translate("Start camera") },
      { opcode: 'stopCamera', blockType: Scratch.BlockType.COMMAND, text: Scratch.translate("Stop camera") },
      { opcode: 'captureFrame', blockType: Scratch.BlockType.COMMAND, text: Scratch.translate("Capture image from camera") },
      { opcode: 'getBinaryImage', blockType: Scratch.BlockType.REPORTER, text: Scratch.translate("Get encoded image") },
      { opcode: 'getPixelBinary', blockType: Scratch.BlockType.REPORTER, text: Scratch.translate("Pixel [X], [Y] as code"), arguments: { X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }, Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 } } },
      { opcode: 'joinFrames', blockType: Scratch.BlockType.COMMAND, text: Scratch.translate("Join image with [DATA]"), arguments: { DATA: { type: Scratch.ArgumentType.STRING, defaultValue: "" } } },
      { opcode: 'setPixelTo', blockType: Scratch.BlockType.COMMAND, text: Scratch.translate("Set pixel [X], [Y] to code [VALUE]"), arguments: { X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }, Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }, VALUE: { type: Scratch.ArgumentType.STRING, defaultValue: "900" } } },
      { opcode: 'getFrameDataURL', blockType: Scratch.BlockType.REPORTER, text: Scratch.translate("Get frame as DATA:url") },
      { opcode: 'startFilmRecording', blockType: Scratch.BlockType.COMMAND, text: Scratch.translate("Start film recording") },
      { opcode: 'stopFilmRecording', blockType: Scratch.BlockType.COMMAND, text: Scratch.translate("Stop film recording") },
      { opcode: 'getFilmDataURL', blockType: Scratch.BlockType.REPORTER, text: Scratch.translate("Get film as DATA:url") }
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
