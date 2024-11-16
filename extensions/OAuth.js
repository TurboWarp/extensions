(function (Scratch) {
    'use strict';

    let clientId = '';
    let clientSecret = '';
    let redirectUri = '';
    let authUrl = '';

    class OAuthExtension {
        getInfo() {
            return {
                id: 'oauthExtension',
                name: 'OAuth',
                color1: '#8B0000', // Dark red color
                color2: '#8B0000', // Dark red color
                color3: '#8B0000', // Dark red color
                blocks: [
                    {
                        opcode: 'setClientId',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'Set Client ID [ID]',
                        arguments: {
                            ID: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'Your Client ID'
                            }
                        }
                    },
                    {
                        opcode: 'setClientSecret',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'Set Client Secret [SECRET]',
                        arguments: {
                            SECRET: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'Your Client Secret'
                            }
                        }
                    },
                    {
                        opcode: 'setRedirectUri',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'Set Redirect URI [URI]',
                        arguments: {
                            URI: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'Your Redirect URI'
                            }
                        }
                    },
                    {
                        opcode: 'setAuthUrl',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'Set Auth URL [URL]',
                        arguments: {
                            URL: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'Your Auth URL'
                            }
                        }
                    },
                    {
                        opcode: 'registerAccount',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'Register account with OAuth',
                        arguments: {}
                    },
                    {
                        opcode: 'authenticate',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'Authenticate with [SERVICE]',
                        arguments: {
                            SERVICE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'Service Name'
                            }
                        }
                    },
                    {
                        opcode: 'changeClientId',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'Change Client ID to [ID]',
                        arguments: {
                            ID: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'New Client ID'
                            }
                        }
                    },
                    {
                        opcode: 'changeClientSecret',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'Change Client Secret to [SECRET]',
                        arguments: {
                            SECRET: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'New Client Secret'
                            }
                        }
                    },
                    {
                        opcode: 'changeRedirectUri',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'Change Redirect URI to [URI]',
                        arguments: {
                            URI: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'New Redirect URI'
                            }
                        }
                    },
                    {
                        opcode: 'changeAuthUrl',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'Change Auth URL to [URL]',
                        arguments: {
                            URL: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'New Auth URL'
                            }
                        }
                    },
                    {
                        opcode: 'giveFeedback',
                        blockType: Scratch.BlockType.BUTTON,
                        text: 'Give Feedback'
                    }
                ],
                menus: {},
                unrestricted: true // Enable unsandboxed mode
            };
        }

        setClientId(args) {
            clientId = args.ID;
            console.log(`Client ID set to: ${clientId}`);
        }

        setClientSecret(args) {
            clientSecret = args.SECRET;
            console.log(`Client Secret set to: ${clientSecret}`);
        }

        setRedirectUri(args) {
            redirectUri = args.URI;
            console.log(`Redirect URI set to: ${redirectUri}`);
        }

        setAuthUrl(args) {
            authUrl = args.URL;
            console.log(`Auth URL set to: ${authUrl}`);
        }

        registerAccount() {
            const fullAuthUrl = `${authUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;

            Scratch.openWindow(fullAuthUrl, '_blank');

            window.addEventListener('message', (event) => {
                if (event.origin !== redirectUri) return;
                const authorizationCode = event.data;
                console.log(`Received authorization code: ${authorizationCode}`);

                // Exchange the authorization code for an access token
                Scratch.fetch('https://example.com/oauth/token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        client_id: clientId,
                        client_secret: clientSecret,
                        code: authorizationCode,
                        redirect_uri: redirectUri,
                        grant_type: 'authorization_code'
                    })
                })
                .then(response => response.json())
                .then(data => {
                    const accessToken = data.access_token;
                    console.log(`Received access token: ${accessToken}`);
                    // Use the access token to register the user
                })
                .catch(error => {
                    console.error('Error exchanging authorization code:', error);
                });
            });
        }

        authenticate(args) {
            const service = args.SERVICE;
            const fullAuthUrl = `${authUrl}?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token`;

            Scratch.openWindow(fullAuthUrl, '_blank');

            window.addEventListener('message', (event) => {
                if (event.origin !== redirectUri) return;
                const token = event.data;
                console.log(`Authenticated with ${service}: ${token}`);
                // Store the token securely
            });
        }

        changeClientId(args) {
            clientId = args.ID;
            console.log(`Client ID changed to: ${clientId}`);
        }

        changeClientSecret(args) {
            clientSecret = args.SECRET;
            console.log(`Client Secret changed to: ${clientSecret}`);
        }

        changeRedirectUri(args) {
            redirectUri = args.URI;
            console.log(`Redirect URI changed to: ${redirectUri}`);
        }

        changeAuthUrl(args) {
            authUrl = args.URL;
            console.log(`Auth URL changed to: ${authUrl}`);
        }

        giveFeedback() {
            Scratch.openWindow('https://scratch.mit.edu/users/Thebloxers998/');
        }
    }

    Scratch.extensions.register(new OAuthExtension());
})(Scratch);

