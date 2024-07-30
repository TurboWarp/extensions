// Name: Speech to Text
// ID: scratchspt
// Description: Converts speech into text using the Web Speech API.
// By: Terminal/windowscj <https://scratch.mit.edu/users/windowscj/>
// License: MPL-2.0
class ScratchSPT {
    constructor(runtime) {
        this.runtime = runtime;
        this.listening = false;
        this.unfinishedTranscript = '';
        this.finalizedTranscript = '';
        this.recognition = null;

        const isChromium = window.navigator.userAgent.includes("Chromium"); // Because chromium is stupid when it coems to webkitSpeechRecognition.

        if (!('SpeechRecognition' in window) && !('webkitSpeechRecognition' in window)) {
            console.error("Your browser does not support the Web Speech API. Firefox is known to not support this extension.");
            return;
        }

        const SpeechRecognition = 'SpeechRecognition' in window ? window.SpeechRecognition : window.webkitSpeechRecognition;
        
        if (isChromium && !('SpeechRecognition' in window)) {
            console.warn("Running on a Chromium browser, but using webkitSpeechRecognition. This may not work!");
        }
        this.recognition = new SpeechRecognition();
        
        this.recognition.continuous = true;
        this.recognition.interimResults = true;

        this.recognition.onresult = (event) => {
            let interim = '';
            let final = '';

            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;

                if (event.results[i].isFinal) {
                    final += transcript;
                } else {
                    interim += transcript;
                }
            }

            this.unfinishedTranscript = interim;
            this.finalizedTranscript += final;
        };

        this.recognition.onerror = (event) => {
            console.error("Speech recognition error detected: " + event.error);
        };

        this.recognition.onend = () => {
            this.finalizedTranscript = '';
            this.listening = false;
        };
    }
    
    getInfo() {
        return {
            "id": "scratchspt",
            "name": "Speech To Text",
            "blocks": [
                {
                    "opcode": "listenLang",
                    "blockType": "command",
                    "text": "start listening [LANG]",
                    arguments: {
                        LANG: {
                            type: "string",
                            defaultValue: "en-US",
                        },
                    },
                },
                {
                    "opcode": "stopListen",
                    "blockType": "command",
                    "text": "stop listening",
                    arguments: {
                    },
                },
                {
                    "opcode": "listeningFunc",
                    "blockType": "reporter",
                    "text": "listening?",
                    arguments: {
                    },
                },
                {
                    "opcode": "unfinishTrans",
                    "blockType": "reporter",
                    "text": "unfinished transcript",
                    arguments: {
                    },
                },
                {
                    "opcode": "finalizedTrans",
                    "blockType": "reporter",
                    "text": "finalized transcript",
                    arguments: {
                    },
                }
            ],
        };
    }
    
    listenLang({LANG}) {
        if (!this.recognition) return;

        this.recognition.lang = LANG;
        this.listening = true;
        this.unfinishedTranscript = '';
        this.finalizedTranscript = '';

        this.recognition.start();
    }

    listeningFunc() {
        if (!this.recognition) return;
        return this.listening;
    }

    stopListen() {
        if (!this.recognition) return;

        this.listening = false;
        this.recognition.stop();
    }

    unfinishTrans() {
        return this.unfinishedTranscript;
    }

    finalizedTrans() {
        const transcript = this.finalizedTranscript;
        return transcript;
    }
}

Scratch.extensions.register(new ScratchSPT());
