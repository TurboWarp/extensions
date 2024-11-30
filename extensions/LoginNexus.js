// Name: LoginNexus
// ID: loginNexus 
// Description: A powerful extension for authentication and registration 
// By: Thebloxers998 <https://scratch.mit.edu/users/Thebloxers998/>
// License: MPL-2.0

(function(Scratch) {
    'use strict';

    class LoginNexusExtension {
        constructor() {
            this.clientId = '';
            this.redirectUri = '';
            this.authenticatedUsers = new Set();
            this.registeredUsers = new Set();
        }

        getInfo() {
            return {
                id: 'loginNexus',
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
                        blockType: Scratch.BlockType.LABEL,
                        text: 'Authentication & Registration'
                    },
                    {
                        opcode: 'registerUser',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'register user [USERNAME] with password [PASSWORD] and email [EMAIL]',
                        arguments: {
                            USERNAME: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'username'
                            },
                            PASSWORD: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'password'
                            },
                            EMAIL: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'email@example.com'
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
                        blockType: Scratch.BlockType.REPORTER,
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
                        text: 'Email Actions'
                    },
                    {
                        opcode: 'sendEmail',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'send email to [EMAIL] with subject [SUBJECT] and message [MESSAGE]',
                        arguments: {
                            EMAIL: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'email@example.com'
                            },
                            SUBJECT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'Hello'
                            },
                            MESSAGE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'This is a message.'
                            }
                        }
                    },
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: 'Services'
                    },
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
                        items: ['Google', 'Microsoft', 'SSO']
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

        async registerUser(args) {
            const username = args.USERNAME;
            const password = args.PASSWORD;
            const email = args.EMAIL;

            try {
                const response = await Scratch.fetch('https://6741abede4647499008e694e.mockapi.io/authapi/v1/turbowarp/authentication', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password, email })
                });

                const data = await response.json();
                if (response.ok) {
                    this.registeredUsers.add(username);
                    this.setDebugMessage('Registration successful: ' + JSON.stringify(data));
                    this.sendEmail({ EMAIL: email, SUBJECT: 'Registration Successful', MESSAGE: `Welcome, ${username}!` });
                } else {
                    this.setDebugMessage('Registration failed: ' + JSON.stringify(data));
                }
            } catch (error) {
                this.setDebugMessage('Error: ' + error.message);
            }
        }

        async loginUser(args) {
            const username = args.USERNAME;
            const password = args.PASSWORD;

            try {
                const response = await Scratch.fetch('https://6741abede4647499008e694e.mockapi.io/authapi/v1/turbowarp/authentication');
                const users = await response.json();

                const user = users.find(u => u.username === username && u.password === password);
                if (user) {
                    this.authenticatedUsers.add(username);
                    this.setDebugMessage('Login successful for user: ' + username);
                } else {
                    this.setDebugMessage('Login failed for user: ' + username);
                }
            } catch (error) {
                this.setDebugMessage('Error: ' + error.message);
            }
        }

        isUserStatus(args) {
            const username = args.USERNAME;
            const status = args.STATUS;
            if (status === 'authenticated') {
                return this.authenticatedUsers.has(username);
            } else if (status === 'registered') {
                return this.registeredUsers.has(username);
            }
            return false;
        }

        async sendEmail(args) {
            const email = args.EMAIL;
            const subject = args.SUBJECT;
            const message = args.MESSAGE;

            try {
                const response = await Scratch.fetch('https://api.emailservice.com/send', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, subject, message })
                });

                const data = await response.json();
                if (response.ok) {
                    this.setDebugMessage('Email sent: ' + JSON.stringify(data));
                } else {
                    this.setDebugMessage('Failed to send email: ' + JSON.stringify(data));
                }
            } catch (error) {
                this.setDebugMessage('Error sending email: ' + error.message);
            }
        }

        useService(args) {
            const service = args.SERVICE;
            const action = args.ACTION;

            if (service === 'Google') {
                if (action === 'Register' || action === 'Authenticate') {
                    this.setDebugMessage(`${action} with Google...`);
                    Scratch.openWindow(`https://accounts.google.com/o/oauth2/auth?client_id=${this.clientId}&redirect_uri=${this.redirectUri}&response_type=token&scope=email`, '_blank');
                }
            } else if (service === 'Microsoft') {
                if (action === 'Register' || action === 'Authenticate') {
                    this.setDebugMessage(`${action} with Microsoft...`);
                    Scratch.openWindow(`https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${this.clientId}&response_type=token&redirect_uri=${this.redirectUri}&scope=openid email profile`, '_blank');
                }
            } else if (service === 'SSO') {
                if (action === 'Register' || action === 'Authenticate') {
                    this.setDebugMessage(`${action} with SSO service...`);
                    // 🔜...
                }
            } else {
                this.setDebugMessage('Unknown service or action.');
            }
        }

        debugMessage() {
            return this.lastDebugMessage;
        }
    }

    Scratch.extensions.register(new LoginNexusExtension());
})(Scratch);
