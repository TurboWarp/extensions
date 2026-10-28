// Name: Voice Recorder
// ID: voicerecorder
// Description: Record audio from your microphone directly within TurboWarp and return it as a DataURL. 
// By: Kavanoz43 <https://github.com>
// License: MPL-2.0

(function(Scratch) {
    'use strict';

    if (!Scratch.extensions.unsandboxed) {
        throw new Error('This extension is Sandbox mode. Please make Unsandboxed');
    }

    class VoiceRecorder {
        getInfo() {
            return {
                id: 'voicerecorder',
                name: 'Voice Recorder',
                blocks: [
                    {
                        opcode: 'recordAudio',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'record [DURATION] seconds and return DataURL',
                        arguments: {
                            DURATION: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 3
                            }
                        }
                    }
                ]
            };
        }

        recordAudio(args) {
            const duration = Math.max(0.1, Number(args.DURATION) || 3);
            
            return new Promise((resolve) => {
                if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                    resolve('Error: Microphone is not supported');
                    return;
                }

                navigator.mediaDevices.getUserMedia({ audio: true })
                    .then(stream => {
                        const mediaRecorder = new MediaRecorder(stream);
                        const chunks = [];

                        mediaRecorder.ondataavailable = (e) => {
                            if (e.data.size > 0) {
                                chunks.push(e.data);
                            }
                        };

                        mediaRecorder.onstop = () => {
                            const blob = new Blob(chunks, { type: 'audio/webm' });
                            const reader = new FileReader();
                            reader.onloadend = () => {
                                resolve(reader.result);
                            };
                            reader.readAsDataURL(blob);

                            // Stop all tracks to release the microphone
                            stream.getTracks().forEach(track => track.stop());
                        };

                        // Start recording
                        mediaRecorder.start();

                        // Stop recording after duration (converted to milliseconds)
                        setTimeout(() => {
                            if (mediaRecorder.state !== 'inactive') {
                                mediaRecorder.stop();
                            }
                        }, duration * 1000);

                    })
                    .catch(err => {
                        resolve('Error: Microphone not found.' + err.message);
                    });
            });
        }
    }

    Scratch.extensions.register(new VoiceRecorder());
})(Scratch);
