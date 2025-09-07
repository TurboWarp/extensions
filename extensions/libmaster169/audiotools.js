// Name: Audio Tools
// ID: audioExtension
// Description: Read raw audio data from the microphone
// By: libmaster169
// License: MPL-2.0
/* generated l10n code */
Scratch.translate.setup({
  pl: {
    "_Start recording": "Rozpocznij nagrywanie",
    "_Stop recording": "Zatrzymaj nagrywanie",
    "_Get recording length in seconds": "Długość nagrania w sekundach",
    "_Get recording": "Pobierz nagranie",
    "_Sample [INDEX]": "Próbka [INDEX]",
    "_Get sample rate": "Pobierz częstotliwość próbkowania",
    "_Play recording": "Odtwórz nagranie",
    "_Join recording with [DATA]": "Połącz nagranie z [DATA]",
    "_Set sample [INDEX] to [VALUE]": "Ustaw próbkę [INDEX] na [VALUE]"
  },
  en: {
    "_Start recording": "Start recording",
    "_Stop recording": "Stop recording",
    "_Get recording length in seconds": "Get recording length in seconds",
    "_Get recording": "Get recording",
    "_Sample [INDEX]": "Sample [INDEX]",
    "_Get sample rate": "Get sample rate",
    "_Play recording": "Play recording",
    "_Join recording with [DATA]": "Join recording with [DATA]",
    "_Set sample [INDEX] to [VALUE]": "Set sample [INDEX] to [VALUE]"
  },
  de: {
    "_Start recording": "Aufnahme starten",
    "_Stop recording": "Aufnahme stoppen",
    "_Get recording length in seconds": "Aufnahmelänge in Sekunden abrufen",
    "_Get recording": "Aufnahme abrufen",
    "_Sample [INDEX]": "Sample [INDEX]",
    "_Get sample rate": "Abtastrate abrufen",
    "_Play recording": "Aufnahme abspielen",
    "_Join recording with [DATA]": "Aufnahme mit [DATA] verbinden",
    "_Set sample [INDEX] to [VALUE]": "Sample [INDEX] auf [VALUE] setzen"
  },
  fr: {
    "_Start recording": "Commencer l'enregistrement",
    "_Stop recording": "Arrêter l'enregistrement",
    "_Get recording length in seconds": "Durée de l'enregistrement en secondes",
    "_Get recording": "Obtenir l'enregistrement",
    "_Sample [INDEX]": "Échantillon [INDEX]",
    "_Get sample rate": "Obtenir le taux d'échantillonnage",
    "_Play recording": "Lire l'enregistrement",
    "_Join recording with [DATA]": "Joindre l'enregistrement avec [DATA]",
    "_Set sample [INDEX] to [VALUE]": "Définir l'échantillon [INDEX] à [VALUE]"
  },
  es: {
    "_Start recording": "Iniciar grabación",
    "_Stop recording": "Detener grabación",
    "_Get recording length in seconds": "Duración de la grabación en segundos",
    "_Get recording": "Obtener grabación",
    "_Sample [INDEX]": "Muestra [INDEX]",
    "_Get sample rate": "Obtener tasa de muestreo",
    "_Play recording": "Reproducir grabación",
    "_Join recording with [DATA]": "Unir grabación con [DATA]",
    "_Set sample [INDEX] to [VALUE]": "Establecer muestra [INDEX] a [VALUE]"
  },
  ja: {
    "_Start recording": "録音を開始",
    "_Stop recording": "録音を停止",
    "_Get recording length in seconds": "録音の長さ（秒）を取得",
    "_Get recording": "録音を取得",
    "_Sample [INDEX]": "サンプル [INDEX]",
    "_Get sample rate": "サンプルレートを取得",
    "_Play recording": "録音を再生",
    "_Join recording with [DATA]": "[DATA]と録音を結合",
    "_Set sample [INDEX] to [VALUE]": "サンプル [INDEX] を [VALUE] に設定"
  },
  ru: {
    "_Start recording": "Начать запись",
    "_Stop recording": "Остановить запись",
    "_Get recording length in seconds": "Длина записи в секундах",
    "_Get recording": "Получить запись",
    "_Sample [INDEX]": "Сэмпл [INDEX]",
    "_Get sample rate": "Получить частоту дискретизации",
    "_Play recording": "Воспроизвести запись",
    "_Join recording with [DATA]": "Объединить запись с [DATA]",
    "_Set sample [INDEX] to [VALUE]": "Установить сэмпл [INDEX] на [VALUE]"
  },
  "zh-cn": {
    "_Start recording": "开始录音",
    "_Stop recording": "停止录音",
    "_Get recording length in seconds": "获取录音时长（秒）",
    "_Get recording": "获取录音",
    "_Sample [INDEX]": "样本 [INDEX]",
    "_Get sample rate": "获取采样率",
    "_Play recording": "播放录音",
    "_Join recording with [DATA]": "将录音与 [DATA] 合并",
    "_Set sample [INDEX] to [VALUE]": "将样本 [INDEX] 设置为 [VALUE]"
  }
});
/* end generated l10n code */

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
      {
        opcode: 'startRecording',
        blockType: Scratch.BlockType.COMMAND,
        text: Scratch.translate("Start recording")
      },
      {
        opcode: 'stopRecording',
        blockType: Scratch.BlockType.COMMAND,
        text: Scratch.translate("Stop recording")
      },
      {
        opcode: 'getLen',
        blockType: Scratch.BlockType.REPORTER,
        text: Scratch.translate("Get recording length in seconds")
      },
      {
        opcode: 'getBinaryData',
        blockType: Scratch.BlockType.REPORTER,
        text: Scratch.translate("Get recording")
      },
      {
        opcode: 'getSampleBinary',
        blockType: Scratch.BlockType.REPORTER,
        text: Scratch.translate("Sample [INDEX]"),
        arguments: {
          INDEX: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
        }
      },
      {
        opcode: 'getSampleRate',
        blockType: Scratch.BlockType.REPORTER,
        text: Scratch.translate("Get sample rate")
      },
      {
        opcode: 'playRecording',
        blockType: Scratch.BlockType.COMMAND,
        text: Scratch.translate("Play recording")
      },
      {
        opcode: 'joinRecording',
        blockType: Scratch.BlockType.COMMAND,
        text: Scratch.translate("Join recording with [DATA]"),
        arguments: {
          DATA: { type: Scratch.ArgumentType.STRING, defaultValue: "0,0,0" }
        }
      },
      {
        opcode: 'setSampleTo',
        blockType: Scratch.BlockType.COMMAND,
        text: Scratch.translate("Set sample [INDEX] to [VALUE]"),
        arguments: {
          INDEX: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
          VALUE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
        }
      }
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
