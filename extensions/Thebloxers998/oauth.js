// Name: OAuth Extension
// ID: oauthExtension
// Description: Provides OAuth login functionality for various services (Google, Microsoft, Discord, Twitter, GitHub, Facebook, LinkedIn, Spotify). 
// By: Thebloxers998 <https://scratch.mit.edu/users/Thebloxers998/>
// License: MPL-2.0

(function (Scratch) {
    "use strict";

    class OAuthExtension {
        constructor() {
            this.tokens = {};
            this.clients = {
                google: {
                    clientId: "",
                    clientSecret: "",
                    redirectUri: "",
                    authUrl: "https://accounts.google.com/o/oauth2/auth",
                    tokenUrl: "https://oauth2.googleapis.com/token",
                    scope: "https://www.googleapis.com/auth/userinfo.profile",
                },
                microsoft: {
                    clientId: "",
                    clientSecret: "",
                    redirectUri: "",
                    authUrl: "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
                    tokenUrl: "https://login.microsoftonline.com/common/oauth2/v2.0/token",
                    scope: "https://graph.microsoft.com/User.Read",
                },
                discord: {
                    clientId: "",
                    clientSecret: "",
                    redirectUri: "",
                    authUrl: "https://discord.com/api/oauth2/authorize",
                    tokenUrl: "https://discord.com/api/oauth2/token",
                    scope: "identify",
                },
                twitter: {
                    clientId: "",
                    clientSecret: "",
                    redirectUri: "",
                    authUrl: "https://api.twitter.com/oauth/authorize",
                    tokenUrl: "https://api.twitter.com/oauth/access_token",
                },
                github: {
                    clientId: "",
                    clientSecret: "",
                    redirectUri: "",
                    authUrl: "https://github.com/login/oauth/authorize",
                    tokenUrl: "https://github.com/login/oauth/access_token",
                    scope: "user",
                },
                facebook: {
                    clientId: "",
                    clientSecret: "",
                    redirectUri: "",
                    authUrl: "https://www.facebook.com/v10.0/dialog/oauth",
                    tokenUrl: "https://graph.facebook.com/v10.0/oauth/access_token",
                    scope: "public_profile",
                },
                linkedin: {
                    clientId: "",
                    clientSecret: "",
                    redirectUri: "",
                    authUrl: "https://www.linkedin.com/oauth/v2/authorization",
                    tokenUrl: "https://www.linkedin.com/oauth/v2/accessToken",
                    scope: "r_liteprofile",
                },
                spotify: {
                    clientId: "",
                    clientSecret: "",
                    redirectUri: "",
                    authUrl: "https://accounts.spotify.com/authorize",
                    tokenUrl: "https://accounts.spotify.com/api/token",
                    scope: "user-read-private",
                },
            };
        }

        getInfo() {
            return {
                id: "oauthExtension",
                name: Scratch.translate({ id: "oauthExtension.name", default: "OAuth Extension" }),
                blockIconURI: "data:image/svg+xml;base64,PLACEHOLDER_FOR_BLOCK_ICON",
                menuIconURI: "data:image/svg+xml;base64,PLACEHOLDER_FOR_MENU_ICON",
                color1: "#FFAB19",
                color2: "#FF8C00",
                color3: "#E76F00",
                blocks: [
                    {
                        opcode: "login",
                        text: Scratch.translate({ id: "oauthExtension.login", default: "Log in with [SERVICE]" }),
                        blockType: Scratch.BlockType.COMMAND,
                        arguments: {
                            SERVICE: { type: Scratch.ArgumentType.STRING, menu: "SERVICE" },
                        },
                    },
                    {
                        opcode: "isLoggedIn",
                        text: Scratch.translate({ id: "oauthExtension.isLoggedIn", default: "Is user logged in with [SERVICE]?" }),
                        blockType: Scratch.BlockType.BOOLEAN,
                        arguments: {
                            SERVICE: { type: Scratch.ArgumentType.STRING, menu: "SERVICE" },
                        },
                    },
                    {
                        opcode: "setClientId",
                        text: Scratch.translate({ id: "oauthExtension.setClientId", default: "Set client ID for [SERVICE] to [CLIENT_ID]" }),
                        blockType: Scratch.BlockType.COMMAND,
                        arguments: {
                            SERVICE: { type: Scratch.ArgumentType.STRING, menu: "SERVICE" },
                            CLIENT_ID: { type: Scratch.ArgumentType.STRING, defaultValue: "" },
                        },
                    },
                    {
                        opcode: "setClientSecret",
                        text: Scratch.translate({ id: "oauthExtension.setClientSecret", default: "Set client secret for [SERVICE] to [CLIENT_SECRET]" }),
                        blockType: Scratch.BlockType.COMMAND,
                        arguments: {
                            SERVICE: { type: Scratch.ArgumentType.STRING, menu: "SERVICE" },
                            CLIENT_SECRET: { type: Scratch.ArgumentType.STRING, defaultValue: "" },
                        },
                    },
                    {
                        opcode: "setRedirectUri",
                        text: Scratch.translate({ id: "oauthExtension.setRedirectUri", default: "Set redirect URI for [SERVICE] to [REDIRECT_URI]" }),
                        blockType: Scratch.BlockType.COMMAND,
                        arguments: {
                            SERVICE: { type: Scratch.ArgumentType.STRING, menu: "SERVICE" },
                            REDIRECT_URI: { type: Scratch.ArgumentType.STRING, defaultValue: "" },
                        },
                    },
                ],
                menus: {
                    SERVICE: {
                        items: [
                            { text: "Google", value: "google" },
                            { text: "Microsoft", value: "microsoft" },
                            { text: "Discord", value: "discord" },
                            { text: "Twitter", value: "twitter" },
                            { text: "GitHub", value: "github" },
                            { text: "Facebook", value: "facebook" },
                            { text: "LinkedIn", value: "linkedin" },
                            { text: "Spotify", value: "spotify" },
                        ],
                    },
                },
            };
        }

        setClientId(args) {
            const service = args.SERVICE;
            this.clients[service].clientId = args.CLIENT_ID;
        }

        setClientSecret(args) {
            const service = args.SERVICE;
            this.clients[service].clientSecret = args.CLIENT_SECRET;
        }

        setRedirectUri(args) {
            const service = args.SERVICE;
            this.clients[service].redirectUri = args.REDIRECT_URI;
        }

        async login(args) {
            const service = args.SERVICE;
            const client = this.clients[service];
            const authUrl = `${client.authUrl}?response_type=code&client_id=${client.clientId}&redirect_uri=${client.redirectUri}&scope=${encodeURIComponent(client.scope)}`;

            // Open a new tab for the user to authorize the app
            Scratch.openWindow(authUrl, "_blank");

            // Listen for message with authorization code (assuming your app handles this securely)
            window.addEventListener("message", async (event) => {
                if (event.origin !== window.location.origin) return;

                const authorizationCode = event.data.code;

                // Ensure there is an await expression
                const tokenResponse = await Scratch.fetch(client.tokenUrl, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                    body: `code=${authorizationCode}&client_id=${client.clientId}&client_secret=${client.clientSecret}&redirect_uri=${client.redirectUri}&grant_type=authorization_code`,
                });

                const tokens = await tokenResponse.json();
                this.tokens[service] = tokens;

                // Await for a token response
                await tokenResponse;
            }, { once: true });
        }

        isLoggedIn(args) {
            const service = args.SERVICE;
            return !!this.tokens[service];
        }
    }

    Scratch.extensions.register(new OAuthExtension());
})(Scratch);
