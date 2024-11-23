// Name: serverAuth
// ID: authExtension
// Description: Uses the server for authentication and registration 
// By: Thebloxers998 <https://scratch.mit.edu/users/Thebloxers998/>
// Original: Thebloxers998 
// License: MPL-2.0

(function(Scratch) {
    'use strict';

    class ServerAuthExtension {
        getInfo() {
            return {
                id: 'serverAuth',
                name: 'ServerAuth',
                blocks: [
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
                        opcode: 'debugMessage',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'last debug message'
                    }
                ]
            };
        }

        

        setDebugMessage(message) {
            this.lastDebugMessage = message;
            console.log(message);
        }

        registerUser(args) {
            const username = args.USERNAME;
            const password = args.PASSWORD;
            fetch('https://6741abede4647499008e694e.mockapi.io/authapi/v1/turbowarp/authentication', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            })
            .then(response => response.json())
            .then(data => {
                this.setDebugMessage('Registration response: ' + JSON.stringify(data));
            })
            .catch(error => {
                this.setDebugMessage('Error: ' + error.message);
            });
        }

        loginUser(args) {
            const username = args.USERNAME;
            const password = args.PASSWORD;
            fetch('https://6741abede4647499008e694e.mockapi.io/authapi/v1/turbowarp/authentication')
            .then(response => response.json())
            .then(users => {
                const user = users.find(u => u.username === username && u.password === password);
                if (user) {
                    this.setDebugMessage('Login successful. Please verify 2FA.');
                    // Generate and send 2FA code
                    this.send2FACode(username);
                } else {
                    this.setDebugMessage('Invalid credentials');
                }
            })
            .catch(error => {
                this.setDebugMessage('Error: ' + error.message);
            });
        }

        
        
        debugMessage() {
            return this.lastDebugMessage;
        }
    }

    Scratch.extensions.register(new AuthExtension());
})(Scratch);
