(function(Scratch) {
    'use strict';

    // Load the JSEncrypt library from a CDN
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/jsencrypt/bin/jsencrypt.min.js';
    document.head.appendChild(script);

    class RSAExtension {
        getInfo() {
            return {
                id: 'themadpunter_rsa',
                name: 'TurboRSA',
                color1: '#FF0000', // Primary color (red)
                color2: '#CC0000', // Secondary color (darker red)
                blocks: [
                    {
                        opcode: 'generateKeys',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'Generate RSA keys',
                        arguments: {}
                    },
                    {
                        opcode: 'encrypt',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'Encrypt [TEXT] with public key [KEY]',
                        arguments: {
                            TEXT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'Hello, world!'
                            },
                            KEY: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ''
                            }
                        }
                    },
                    {
                        opcode: 'decrypt',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'Decrypt [TEXT] with private key [KEY]',
                        arguments: {
                            TEXT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ''
                            },
                            KEY: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ''
                            }
                        }
                    }
                ]
            };
        }

        generateKeys() {
            const crypt = new JSEncrypt({ default_key_size: 1024 });
            const publicKey = crypt.getPublicKeyB64();
            const privateKey = crypt.getPrivateKeyB64();
            return JSON.stringify({ publicKey, privateKey });
        }

        encrypt(args) {
            const crypt = new JSEncrypt();
            crypt.setPublicKey(args.KEY);
            const encrypted = crypt.encrypt(args.TEXT);
            return encrypted ? encrypted : 'Encryption failed';
        }

        decrypt(args) {
            const crypt = new JSEncrypt();
            crypt.setPrivateKey(args.KEY);
            const decrypted = crypt.decrypt(args.TEXT);
            return decrypted ? decrypted : 'Decryption failed';
        }
    }

    // Wait for the script to load before registering the extension
    script.onload = () => {
        Scratch.extensions.register(new RSAExtension());
    };
})(Scratch);
