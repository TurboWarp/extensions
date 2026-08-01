(function(Scratch) {
  'use strict';

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  
  let recognizedText = ''; // Default to empty string when there is no result
  let isListening = false;
  let recognition = null;
  let currentLang = 'en-US'; // Default to English for international standards

  if (SpeechRecognition) {
    recognition = new SpeechRecognition();
    recognition.lang = currentLang;
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      recognizedText = transcript;
      isListening = false;
    };

    recognition.onerror = (event) => {
      // Keep result clean or return error silently
      recognizedText = '';
      isListening = false;
    };

    recognition.onend = () => {
      isListening = false;
    };
  }

  class SpeechToTextExtension {
    getInfo() {
      return {
        id: 'speechToText',
        name: 'Speech to Text',
        color1: '#0284c7',
        blocks: [
          {
            opcode: 'setLanguage',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set speech language to [LANG]',
            arguments: {
              LANG: {
                type: Scratch.ArgumentType.STRING,
                menu: 'languageMenu',
                defaultValue: 'en-US'
              }
            }
          },
          {
            opcode: 'startListening',
            blockType: Scratch.BlockType.COMMAND,
            text: 'start listening'
          },
          {
            opcode: 'stopListening',
            blockType: Scratch.BlockType.COMMAND,
            text: 'stop listening'
          },
          {
            opcode: 'getTranscript',
            blockType: Scratch.BlockType.REPORTER,
            text: 'speech result'
          },
          {
            opcode: 'checkIsListening',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'is listening?'
          }
        ],
        menus: {
          languageMenu: {
            acceptReporters: true,
            items: [
              { text: 'English (en-US)', value: 'en-US' },
              { text: 'Vietnamese (vi-VN)', value: 'vi-VN' },
              { text: 'English (UK) (en-GB)', value: 'en-GB' },
              { text: 'Chinese (zh-CN)', value: 'zh-CN' },
              { text: 'Japanese (ja-JP)', value: 'ja-JP' },
              { text: 'Korean (ko-KR)', value: 'ko-KR' }
            ]
          }
        }
      };
    }

    setLanguage(args) {
      currentLang = args.LANG;
      if (recognition) {
        recognition.lang = currentLang;
      }
    }

    startListening() {
      if (!recognition) return;
      if (!isListening) {
        try {
          recognizedText = ''; // Reset về rỗng khi bắt đầu nghe lượt mới
          isListening = true;
          recognition.start();
        } catch (e) {
          isListening = false;
        }
      }
    }

    stopListening() {
      if (!recognition) return;
      if (isListening) {
        recognition.stop();
        isListening = false;
      }
    }

    getTranscript() {
      return recognizedText;
    }

    checkIsListening() {
      return isListening;
    }
  }

  Scratch.extensions.register(new SpeechToTextExtension());
})(Scratch);
