// Name: LoginNexus
// ID: thebloxers998-loginNexus 
// Description: A API-based authentication and registration extension 
// By: Thebloxers998 <https://scratch.mit.edu/users/Thebloxers998/>
// License: MPL-2.0

(function(Scratch) {
    'use strict';

    class LoginNexusExtension {
        constructor() {
            this.clientId = '';
            this.redirectUri = '';
            this.apiUri = '';
            this.authenticatedUsers = new Set();
            this.registeredUsers = new Set();
        }

        getInfo() {
            return {
                id: 'thebloxers998-loginNexus',
                name: 'LoginNexus',
                color1: '#ADD8E6',
                color2: '#87CEEB',
                color3: '#B0E0E6',
                blocks: [
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: 'Settings'
                    },
                    {
                        opcode: 'setClientId',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'set client ID to [CLIENT_ID]',
                        arguments: {
                            CLIENT_ID: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'your-client-id'
                            }
                        }
                    },
                    {
                        opcode: 'setRedirectUri',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'set redirect URI to [REDIRECT_URI]',
                        arguments: {
                            REDIRECT_URI: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'your-redirect-uri'
                            }
                        }
                    },
                    {
                        opcode: 'setApiUrl',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'set API URL to [API_URL]',
                        arguments: {
                            API_URL: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'your-api-url' // Corrected here
                            }
                        }
                    },
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: 'Authentication & Registration'
                    },
                    {
                        opcode: 'registerUser',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'register user [USERNAME] with password [PASSWORD]',
                        arguments: {
                            USERNAME: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'username'
                            },
                            PASSWORD: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'password'
                            }
                        }
                    },
                    {
                        opcode: 'loginUser',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'login user [USERNAME] with password [PASSWORD]',
                        arguments: {
                            USERNAME: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'username'
                            },
                            PASSWORD: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'password'
                            }
                        }
                    },
                    {
                        opcode: 'isUserStatus',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'is user [USERNAME] [STATUS]?',
                        arguments: {
                            USERNAME: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'username'
                            },
                            STATUS: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'statusOptions',
                                defaultValue: 'authenticated'
                            }
                        }
                    },
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: 'Services'
                    {
                        opcode: 'useService',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'use [SERVICE] to [ACTION]',
                        arguments: {
                            SERVICE: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'services',
                                defaultValue: 'Google'
                            },
                            ACTION: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'actions',
                                defaultValue: 'Register'
                            }
                        }
                    },
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: 'Debugging'
                    },
                    {
                        opcode: 'debugMessage',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'last debug message'
                    }
                ],
                menus: {
                    services: {
                        acceptReporters: true,
                        items: ['Google', 'Microsoft']
                    },
                    actions: {
                        acceptReporters: true,
                        items: ['Register', 'Authenticate']
                    },
                    statusOptions: {
                        acceptReporters: true,
                        items: ['authenticated', 'registered']
                    }
                }
            };
        }

        setDebugMessage(message) {
            this.lastDebugMessage = message;
            console.log(message);
        }

        setClientId(args) {
            this.clientId = args.CLIENT_ID;
            this.setDebugMessage('Client ID set to: ' + this.clientId);
        }

        setRedirectUri(args) {
            this.redirectUri = args.REDIRECT_URI;
            this.setDebugMessage('Redirect URI set to: ' + this.redirectUri);
        }

        setApiUri(args) {
            this.apiUri = args.API_URI;
            this.setDebugMessage('API URI set to: ' + this.redirectUri);
        }

        async registerUser(args) {
            const username = args.USERNAME;
            const password = args.PASSWORD;

            if (!username || !password) {
                this.setDebugMessage('Invalid arguments provided');
                return;
            }

            try
