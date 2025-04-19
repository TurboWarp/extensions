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
          authUrl:
            "https://login.microsoftonline.com/common/oauth2/v2.0/authorize",
          tokenUrl:
            "https://login.microsoftonline.com/common/oauth2/v2.0/token",
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
        name: Scratch.translate({
          id: "oauthExtension.name",
          default: "OAuth Extension",
        }),
        blockIconURI:
          "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjI1NiIgaGVpZ2h0PSIyNTYiPgo8cGF0aCBkPSJNMCAwIEMyMi4wMzg1MjY1MiAxOC44MTE1OTg1NiAzNi40NjU3OTMzNCA0MS4wNjM3MzM3NyA0NC4zNTE1NjI1IDY4LjkxMDE1NjI1IEM0NC42OTMxNjQwNiA3MC4wODgzNTkzNyA0NS4wMzQ3NjU2MyA3MS4yNjY1NjI1IDQ1LjM4NjcxODc1IDcyLjQ4MDQ2ODc1IEM1MS41OTA5Mjc1NSA5OC43NDAxNDMyMiA0OC4xMTkzNTU5NyAxMjguNDA3NTUzODkgMzcuMzUxNTYyNSAxNTIuOTEwMTU2MjUgQzM2LjkyNjY1NTI3IDE1My44OTE0NTUwOCAzNi45MjY2NTUyNyAxNTMuODkxNDU1MDggMzYuNDkzMTY0MDYgMTU0Ljg5MjU3ODEyIEMyNi41NTAxNTk0MyAxNzcuNDE1NDA2MzEgOS4zNjgzODI4MiAxOTcuMDgzNzE0NDMgLTExLjY0ODQzNzUgMjA5LjkxMDE1NjI1IEMtMTIuNzIwOTM3NSAyMTAuNTkzMzU5MzggLTEzLjc5MzQzNzUgMjExLjI3NjU2MjUgLTE0Ljg5ODQzNzUgMjExLjk4MDQ2ODc1IEMtNDIuNzU5MjI3OTQgMjI4Ljk0MjAxNDc4IC03OC4yNTA2MTE4OSAyMzMuOTI2NDg1NDUgLTExMC4wMzAyNzM0NCAyMjYuNzQ3MDcwMzEgQy0xMTcuODE5NDE3MjkgMjI0Ljc3NzM2MzU3IC0xMjUuMjk4MDI2MiAyMjIuMTQwMzMxOTUgLTEzMi42NDg0Mzc1IDIxOC45MTAxNTYyNSBDLTEzMy4zMDI2MzY3MiAyMTguNjI2ODg0NzcgLTEzMy45NTY4MzU5NCAyMTguMzQzNjEzMjggLTEzNC42MzA4NTkzOCAyMTguMDUxNzU3ODEgQy0xNjQuNzI1OTMyMzQgMjA0Ljc2NTg4NDE0IC0xODguNDMyNjIzMzkgMTc5LjE4ODU5MzM5IC0yMDAuNTE5NTMxMjUgMTQ4LjcxMzg2NzE5IEMtMjAyLjQ3ODkwMDc3IDE0My41MTUyMTc0MiAtMjA0LjEzNTA4MjUgMTM4LjI1NDE1Mjc0IC0yMDUuNjQ4NDM3NSAxMzIuOTEwMTU2MjUgQy0yMDUuOTkwMDM5MDYgMTMxLjczMTk1MzEyIC0yMDYuMzMxNjQwNjMgMTMwLjU1Mzc1IC0yMDYuNjgzNTkzNzUgMTI5LjMzOTg0Mzc1IEMtMjE0LjIxNzQzOTk4IDk3LjQ1MjQwMTU3IC0yMDcuODM1NTc0NTYgNjEuNDM0NjUxNjEgLTE5MS4wMDc4MTI1IDMzLjYwNTQ2ODc1IEMtMTcyLjcxOTMxMzkzIDQuNTE1NjA4MTggLTE0NS40NzI3MDQ5NSAtMTQuNzk0NDA5MjYgLTExMi42NDg0Mzc1IC0yNC4wODk4NDM3NSBDLTExMS40NzAyMzQzOCAtMjQuNDMxNDQ1MzEgLTExMC4yOTIwMzEyNSAtMjQuNzczMDQ2ODcgLTEwOS4wNzgxMjUgLTI1LjEyNSBDLTcxLjkxMjE2MjA0IC0zMy45MDU5NjkyNyAtMjkuNDM4MzUxODQgLTI0LjE0NjUyMjQyIDAgMCBaIE0tMTU2LjY0ODQzNzUgMzguOTEwMTU2MjUgQy0xNzIuNjc2OTQzNTIgNTguMDg4NzczMjggLTE4MC4zOTY0OTAzOCA4NC41ODg4MzUyMyAtMTc4LjM3MTA5Mzc1IDEwOS4yOTI5Njg3NSBDLTE3NS40NzE3NjMxNSAxMzUuNzQ1OTA4ODUgLTE2Mi45NTU1MTQxMyAxNTkuNTg0NTMzMDggLTE0Mi42NDg0Mzc1IDE3Ni45MTAxNTYyNSBDLTEyNi41NDMxNjcwNSAxODkuNjk5NjM1NzIgLTEwNi4zMjExMTA2MiAxOTguMDkxNzg4ODEgLTg1LjY0ODQzNzUgMTk4LjkxMDE1NjI1IEMtODQuODg5MTc5NjkgMTk4Ljk1MDExNzE5IC04NC4xMjk5MjE4NyAxOTguOTkwMDc4MTIgLTgzLjM0NzY1NjI1IDE5OS4wMzEyNSBDLTU2LjU4MDI3NzA5IDE5OS43NzYwMDUyMyAtMzEuNDM2MTQxNzYgMTg4LjgxNjI3MjU4IC0xMi4wNTQ0NDMzNiAxNzAuNzY1NjI1IEM1LjI3MjM5MDEyIDE1NC4wMTA3MzQ1MiAxNi4zOTQyODMxMyAxMzAuMDkxODY1NjUgMTcuMzUxNTYyNSAxMDUuOTEwMTU2MjUgQzE3LjM5MTUyMzQ0IDEwNS4xNTA4OTg0NCAxNy40MzE0ODQzNyAxMDQuMzkxNjQwNjIgMTcuNDcyNjU2MjUgMTAzLjYwOTM3NSBDMTguMjE3NDExNDggNzYuODQxOTk1ODQgNy4yNTc2Nzg4MyA1MS42OTc4NjA1MSAtMTAuNzkyOTY4NzUgMzIuMzE2MTYyMTEgQy0yNy41NDc4NTkyMyAxNC45ODkzMjg2MyAtNTEuNDY2NzI4MSAzLjg2NzQzNTYyIC03NS42NDg0Mzc1IDIuOTEwMTU2MjUgQy03Ni43ODczMjQyMiAyLjg1MDIxNDg0IC03Ni43ODczMjQyMiAyLjg1MDIxNDg0IC03Ny45NDkyMTg3NSAyLjc4OTA2MjUgQy0xMDguODU5OTYwMDYgMS45MjkwMjU1MSAtMTM2LjI0OTk3Njk4IDE2LjQzMzI0OTk3IC0xNTYuNjQ4NDM3NSAzOC45MTAxNTYyNSBaICIgZmlsbD0iIzlFOUU5RSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjA4LjY0ODQzNzUsMjcuMDg5ODQzNzUpIi8+CjxwYXRoIGQ9Ik0wIDAgQzAuNzc5NDM0NjYgMC4wMDIyMjA2MSAxLjU1ODg2OTMyIDAuMDA0NDQxMjIgMi4zNjE5MjMyMiAwLjAwNjcyOTEzIEMzLjI0Mjc2MDc3IDAuMDA2ODA0NjYgNC4xMjM1OTgzMyAwLjAwNjg4MDE5IDUuMDMxMTI3OTMgMC4wMDY5NTgwMSBDNS45ODg0MTI5MyAwLjAxMjExOTI5IDYuOTQ1Njk3OTQgMC4wMTcyODA1OCA3LjkzMTk5MTU4IDAuMDIyNTk4MjcgQzkuMzk0ODA4MTIgMC4wMjQ3MjA2OSA5LjM5NDgwODEyIDAuMDI0NzIwNjkgMTAuODg3MTc2NTEgMC4wMjY4ODU5OSBDMTQuMDE1NDI2NzUgMC4wMzI1MDMxOSAxNy4xNDM2MDY1NiAwLjA0NTA1ODU5IDIwLjI3MTgzNTMzIDAuMDU3NzU0NTIgQzIyLjM4NzA2ODY3IDAuMDYyNzY3MyAyNC41MDIzMDMxMyAwLjA2NzMzMDU5IDI2LjYxNzUzODQ1IDAuMDcxNDI2MzkgQzMxLjgxNDgyODI5IDAuMDgyNDc4MiAzNy4wMTIwNzY3OCAwLjA5OTIzMzA1IDQyLjIwOTMzNTMzIDAuMTIwMjU0NTIgQzQ0Ljk5MTE0MDUxIDYuMjUxMzU5MTEgNDcuNTc5MTE3NDUgMTIuNDM1MDc1MzMgNTAuMDM3NDYwMzMgMTguNzAyMjg1NzcgQzUwLjM5MDE1OTkxIDE5LjU5NjU0NzcgNTAuNzQyODU5NSAyMC40OTA4MDk2MyA1MS4xMDYyNDY5NSAyMS40MTIxNzA0MSBDNTIuMjI1NzczMjEgMjQuMjUxNjQ4MTQgNTMuMzQyNjgwOCAyNy4wOTIxNDYzOCA1NC40NTkzMzUzMyAyOS45MzI3NTQ1MiBDNTUuNTU3NzAyMTUgMzIuNzIyNDMxMiA1Ni42NTY2Mzk1MiAzNS41MTE4ODE3NCA1Ny43NTYwODgyNiAzOC4zMDExMzIyIEM1OC40ODMyNDk1MSA0MC4xNDY2MDUxNSA1OS4yMDk1NzI4OCA0MS45OTI0MDg0OCA1OS45MzUwNDMzMyA0My44Mzg1NDY3NSBDNjEuNzc4MzM5NjQgNDguNTIyNzUzMjQgNjMuNjQxMjU5NzcgNTMuMTk3NzI3NjUgNjUuNTM5NDEzNDUgNTcuODYwMDAwNjEgQzY1LjkxMTc3MTI0IDU4Ljc3Nzg2ODUgNjYuMjg0MTI5MDMgNTkuNjk1NzM2MzkgNjYuNjY3NzcwMzkgNjAuNjQxNDE4NDYgQzY3LjM3NzQxMTc2IDYyLjM4NzQ1NzM3IDY4LjA5MTI4MzIxIDY0LjEzMTc4NDgzIDY4LjgwOTk4MjMgNjUuODc0MTE0OTkgQzY5LjEyNTc4MjQ3IDY2LjY1MjMyMTAxIDY5LjQ0MTU4MjY0IDY3LjQzMDUyNzA0IDY5Ljc2Njk1MjUxIDY4LjIzMjMxNTA2IEM3MC4wNDY0MTcyNCA2OC45MTMyNzc0NCA3MC4zMjU4ODE5NiA2OS41OTQyMzk4MSA3MC42MTM4MTUzMSA3MC4yOTU4Mzc0IEM3MS4yMDkzMzUzMyA3Mi4xMjAyNTQ1MiA3MS4yMDkzMzUzMyA3Mi4xMjAyNTQ1MiA3MS4yMDkzMzUzMyA3NS4xMjAyNTQ1MiBDNzkuNDU5MzM1MzMgNzUuMTIwMjU0NTIgODcuNzA5MzM1MzMgNzUuMTIwMjU0NTIgOTYuMjA5MzM1MzMgNzUuMTIwMjU0NTIgQzk2LjIwOTMzNTMzIDgwLjA3MDI1NDUyIDk2LjIwOTMzNTMzIDg1LjAyMDI1NDUyIDk2LjIwOTMzNTMzIDkwLjEyMDI1NDUyIEM5MC4yNjkzMzUzMyA5MC4xMjAyNTQ1MiA4NC4zMjkzMzUzMyA5MC4xMjAyNTQ1MiA3OC4yMDkzMzUzMyA5MC4xMjAyNTQ1MiBDNzkuMTk5MzM1MzMgOTMuNTg1MjU0NTIgNzkuMTk5MzM1MzMgOTMuNTg1MjU0NTIgODAuMjA5MzM1MzMgOTcuMTIwMjU0NTIgQzg1LjQ4OTMzNTMzIDk3LjEyMDI1NDUyIDkwLjc2OTMzNTMzIDk3LjEyMDI1NDUyIDk2LjIwOTMzNTMzIDk3LjEyMDI1NDUyIEM5Ni4yMDkzMzUzMyAxMDIuMDcwMjU0NTIgOTYuMjA5MzM1MzMgMTA3LjAyMDI1NDUyIDk2LjIwOTMzNTMzIDExMi4xMjAyNTQ1MiBDOTEuNzU0MzM1MzMgMTEyLjYxNTI1NDUyIDkxLjc1NDMzNTMzIDExMi42MTUyNTQ1MiA4Ny4yMDkzMzUzMyAxMTMuMTIwMjU0NTIgQzg3LjcxNDY0NzgzIDExNC4zODQ4MjQ4MyA4OC4yMTk5NjAzMyAxMTUuNjQ5Mzk1MTQgODguNzQwNTg1MzMgMTE2Ljk1MjI4NTc3IEM4OS4zOTcxMDI1MiAxMTguNjEyMzM2MzcgOTAuMDUzMzM3ODkgMTIwLjI3MjQ5ODQ1IDkwLjcwOTMzNTMzIDEyMS45MzI3NTQ1MiBDOTEuMjEwMTM2MTEgMTIzLjE4MjgyMjg4IDkxLjIxMDEzNjExIDEyMy4xODI4MjI4OCA5MS43MjEwNTQwOCAxMjQuNDU4MTQ1MTQgQzkyLjE5NDc4NDU1IDEyNS42NjE4MDcyNSA5Mi4xOTQ3ODQ1NSAxMjUuNjYxODA3MjUgOTIuNjc4MDg1MzMgMTI2Ljg4OTc4NTc3IEM5Mi45NzEzNDcwNSAxMjcuNjI4MTc2ODggOTMuMjY0NjA4NzYgMTI4LjM2NjU2Nzk5IDkzLjU2Njc1NzIgMTI5LjEyNzMzNDU5IEM5NC4yMDkzMzUzMyAxMzEuMTIwMjU0NTIgOTQuMjA5MzM1MzMgMTMxLjEyMDI1NDUyIDk0LjIwOTMzNTMzIDEzNC4xMjAyNTQ1MiBDODEuOTk5MzM1MzMgMTM0LjEyMDI1NDUyIDY5Ljc4OTMzNTMzIDEzNC4xMjAyNTQ1MiA1Ny4yMDkzMzUzMyAxMzQuMTIwMjU0NTIgQzUyLjIwOTMzNTMzIDEyMi4xMjAyNTQ1MiA1Mi4yMDkzMzUzMyAxMjIuMTIwMjU0NTIgNDkuMjA5MzM1MzMgMTEyLjEyMDI1NDUyIEMzMC4wNjkzMzUzMyAxMTIuMTIwMjU0NTIgMTAuOTI5MzM1MzMgMTEyLjEyMDI1NDUyIC04Ljc5MDY2NDY3IDExMi4xMjAyNTQ1MiBDLTkuNzgwNjY0NjcgMTE1LjQyMDI1NDUyIC0xMC43NzA2NjQ2NyAxMTguNzIwMjU0NTIgLTExLjc5MDY2NDY3IDEyMi4xMjAyNTQ1MiBDLTEzLjQ0MDY2NDY3IDEyNi4wODAyNTQ1MiAtMTUuMDkwNjY0NjcgMTMwLjA0MDI1NDUyIC0xNi43OTA2NjQ2NyAxMzQuMTIwMjU0NTIgQy0yOS4wMDA2NjQ2NyAxMzQuMTIwMjU0NTIgLTQxLjIxMDY2NDY3IDEzNC4xMjAyNTQ1MiAtNTMuNzkwNjY0NjcgMTM0LjEyMDI1NDUyIEMtNTMuMTI2NDQxNjkgMTMwLjc5OTEzOTYgLTUyLjU1MzU4NjExIDEyOC4yMDE5NDI1MyAtNTEuMzgwNTA4NDIgMTI1LjEzMTk3MzI3IEMtNTAuOTc5Mjg3NzIgMTI0LjA3MzMzMDY5IC01MC45NzkyODc3MiAxMjQuMDczMzMwNjkgLTUwLjU2OTk2MTU1IDEyMi45OTMzMDEzOSBDLTUwLjI5MjE2ODU4IDEyMi4yNzIwNzA5MiAtNTAuMDE0Mzc1NjEgMTIxLjU1MDg0MDQ1IC00OS43MjgxNjQ2NyAxMjAuODA3NzU0NTIgQy00OS4zMDU2NzQ0NCAxMTkuNjk2OTA0OTEgLTQ5LjMwNTY3NDQ0IDExOS42OTY5MDQ5MSAtNDguODc0NjQ5MDUgMTE4LjU2MzYxMzg5IEMtNDguMTgzNDc4OTIgMTE2Ljc0NzgyNzk2IC00Ny40ODc1NDc3OSAxMTQuOTMzODU1NTIgLTQ2Ljc5MDY2NDY3IDExMy4xMjAyNTQ1MiBDLTQ5Ljc2MDY2NDY3IDExMi43OTAyNTQ1MiAtNTIuNzMwNjY0NjcgMTEyLjQ2MDI1NDUyIC01NS43OTA2NjQ2NyAxMTIuMTIwMjU0NTIgQy01NS43OTA2NjQ2NyAxMDcuMTcwMjU0NTIgLTU1Ljc5MDY2NDY3IDEwMi4yMjAyNTQ1MiAtNTUuNzkwNjY0NjcgOTcuMTIwMjU0NTIgQy01MC41MTA2NjQ2NyA5Ny4xMjAyNTQ1MiAtNDUuMjMwNjY0NjcgOTcuMTIwMjU0NTIgLTM5Ljc5MDY2NDY3IDk3LjEyMDI1NDUyIEMtMzkuMTMwNjY0NjcgOTQuODEwMjU0NTIgLTM4LjQ3MDY2NDY3IDkyLjUwMDI1NDUyIC0zNy43OTA2NjQ2NyA5MC4xMjAyNTQ1MiBDLTQzLjczMDY2NDY3IDkwLjEyMDI1NDUyIC00OS42NzA2NjQ2NyA5MC4xMjAyNTQ1MiAtNTUuNzkwNjY0NjcgOTAuMTIwMjU0NTIgQy01NS43OTA2NjQ2NyA4NS4xNzAyNTQ1MiAtNTUuNzkwNjY0NjcgODAuMjIwMjU0NTIgLTU1Ljc5MDY2NDY3IDc1LjEyMDI1NDUyIEMtNDcuNTQwNjY0NjcgNzUuMTIwMjU0NTIgLTM5LjI5MDY2NDY3IDc1LjEyMDI1NDUyIC0zMC43OTA2NjQ2NyA3NS4xMjAyNTQ1MiBDLTMwLjQ2MDY2NDY3IDczLjQ3MDI1NDUyIC0zMC4xMzA2NjQ2NyA3MS44MjAyNTQ1MiAtMjkuNzkwNjY0NjcgNzAuMTIwMjU0NTIgQy0yOS4zNTY1NzU4MyA2OC44MTI0MDQ1NiAtMjguODg3MjM5MjEgNjcuNTE1NzA5OTggLTI4LjM4Mjk0OTgzIDY2LjIzMzI5MTYzIEMtMjcuOTU1MjcwNjEgNjUuMTM2NzU1MTQgLTI3Ljk1NTI3MDYxIDY1LjEzNjc1NTE0IC0yNy41MTg5NTE0MiA2NC4wMTgwNjY0MSBDLTI3LjIwOTAwNzQyIDYzLjIzNTgxMTkyIC0yNi44OTkwNjM0MiA2Mi40NTM1NTc0MyAtMjYuNTc5NzI3MTcgNjEuNjQ3NTk4MjcgQy0yNi4wOTMyMzk1MiA2MC40MDUyNzE4NCAtMjYuMDkzMjM5NTIgNjAuNDA1MjcxODQgLTI1LjU5NjkyMzgzIDU5LjEzNzg0NzkgQy0yNC41NDA0OTM5NyA1Ni40NDI4OTc0OSAtMjMuNDc4MjE0MDQgNTMuNzUwMjk3MzYgLTIyLjQxNTY2NDY3IDUxLjA1Nzc1NDUyIEMtMjEuNjg4NjgwNTUgNDkuMjA3NjI3NzYgLTIwLjk2MjAzODM5IDQ3LjM1NzM2NjU5IC0yMC4yMzU3MzMwMyA0NS41MDY5NzMyNyBDLTE4Ljc3OTY4MzY3IDQxLjc5ODk3MzEgLTE3LjMyMTM4MjQ0IDM4LjA5MTg3MDIyIC0xNS44NjE0NjU0NSAzNC4zODUzOTEyNCBDLTE0LjAwMzg3MjU1IDI5LjY2NjY4MzE1IC0xMi4xNTg0NzMxNyAyNC45NDMzMjA2NSAtMTAuMzE4MDA4NDIgMjAuMjE3OTEwNzcgQy05LjgwNjIzMTMyIDE4LjkwNjEwMjQ1IC05LjI5NDM1Mzc3IDE3LjU5NDMzMzMyIC04Ljc4MjM2Mzg5IDE2LjI4MjYwODAzIEMtNy44NDYzMDQ5OSAxMy44ODM5MzcxMSAtNi45MTE2ODAwOCAxMS40ODQ3MDU5NyAtNS45Nzg2NTI5NSA5LjA4NDg1NDEzIEMtNS41NjcyODA4OCA4LjAzNDM0ODc1IC01LjE1NTkwODgxIDYuOTgzODQzMzggLTQuNzMyMDcwOTIgNS45MDE1MDQ1MiBDLTQuMzc4MzAzODMgNC45OTQ2NDkwNSAtNC4wMjQ1MzY3NCA0LjA4Nzc5MzU4IC0zLjY2MDA0OTQ0IDMuMTUzNDU3NjQgQy0yLjM3OTk5Mzk4IDAuMTU5ODMxNzMgLTIuMzc5OTkzOTggMC4xNTk4MzE3MyAwIDAgWiBNMjAuMjA5MzM1MzMgMzQuMTIwMjU0NTIgQzE2LjgxMTU1MDQyIDQxLjQ0MTY3MiAxMy45NzAzMDk5MyA0OC45Mjk2MjIxMiAxMS4yMDc4NzA0OCA1Ni41MDY3MjkxMyBDMTAuNDUxMzgyMzUgNTguNTc5NTQ2MDkgOS42ODgwNjYyNSA2MC42NDk3NjM3OSA4LjkyNDE3OTA4IDYyLjcxOTg2Mzg5IEM4LjQ0MDY5OTkyIDY0LjAzOTM3NjU3IDcuOTU3NjEyMjcgNjUuMzU5MDMyNzggNy40NzQ5NjAzMyA2Ni42Nzg4NDgyNyBDNy4wMzk1Nzk0NyA2Ny44Njc5Mjc4NiA2LjYwNDE5ODYxIDY5LjA1NzAwNzQ1IDYuMTU1NjI0MzkgNzAuMjgyMTE5NzUgQzUuMTAzOTAxNTkgNzIuOTM3ODUxOCA1LjEwMzkwMTU5IDcyLjkzNzg1MTggNS4yMDkzMzUzMyA3NS4xMjAyNTQ1MiBDMTUuMTA5MzM1MzMgNzUuMTIwMjU0NTIgMjUuMDA5MzM1MzMgNzUuMTIwMjU0NTIgMzUuMjA5MzM1MzMgNzUuMTIwMjU0NTIgQzMzLjQxMTgzNzk3IDY5LjEyODU5NjY3IDMxLjYyMDI3MzkyIDYzLjIzNDQ4Mzc4IDI5LjUxMDExNjU4IDU3LjM2MjQ0MjAyIEMyOS4yNzAyMDQ5MyA1Ni42ODg1MTQxIDI5LjAzMDI5MzI3IDU2LjAxNDU4NjE4IDI4Ljc4MzExMTU3IDU1LjMyMDIzNjIxIEMyOC4wMzE2Nzg1NiA1My4yMTEwNzA1NyAyNy4yNzY4MzI1IDUxLjEwMzE0NjU4IDI2LjUyMTgzNTMzIDQ4Ljk5NTI1NDUyIEMyNi4wMDUzMzA1NCA0Ny41NDc0MTk0MyAyNS40ODkwNTI4MSA0Ni4wOTk1MDMzMyAyNC45NzMwMDcyIDQ0LjY1MTUwNDUyIEMyMy43MjEwNjM0NyA0MS4xNDAxNTA4OCAyMi40NjYwNjAxOSAzNy42Mjk5MDAyNSAyMS4yMDkzMzUzMyAzNC4xMjAyNTQ1MiBDMjAuODc5MzM1MzMgMzQuMTIwMjU0NTIgMjAuNTQ5MzM1MzMgMzQuMTIwMjU0NTIgMjAuMjA5MzM1MzMgMzQuMTIwMjU0NTIgWiBNLTAuNzkwNjY0NjcgOTAuMTIwMjU0NTIgQy0xLjQ1MDY2NDY3IDkyLjQzMDI1NDUyIC0yLjExMDY2NDY3IDk0Ljc0MDI1NDUyIC0yLjc5MDY2NDY3IDk3LjEyMDI1NDUyIEMxMi4zODkzMzUzMyA5Ny4xMjAyNTQ1MiAyNy41NjkzMzUzMyA5Ny4xMjAyNTQ1MiA0My4yMDkzMzUzMyA5Ny4xMjAyNTQ1MiBDNDIuNTQ5MzM1MzMgOTQuODEwMjU0NTIgNDEuODg5MzM1MzMgOTIuNTAwMjU0NTIgNDEuMjA5MzM1MzMgOTAuMTIwMjU0NTIgQzI3LjM0OTMzNTMzIDkwLjEyMDI1NDUyIDEzLjQ4OTMzNTMzIDkwLjEyMDI1NDUyIC0wLjc5MDY2NDY3IDkwLjEyMDI1NDUyIFogIiBmaWxsPSIjOUU5RTlFIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMDcuNzkwNjY0NjcyODUxNTYsNDUuODc5NzQ1NDgzMzk4NDQpIi8+Cjwvc3ZnPgo=",
        menuIconURI:
          "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgd2lkdGg9IjI1NiIgaGVpZ2h0PSIyNTYiPgo8cGF0aCBkPSJNMCAwIEMyMi4wMzg1MjY1MiAxOC44MTE1OTg1NiAzNi40NjU3OTMzNCA0MS4wNjM3MzM3NyA0NC4zNTE1NjI1IDY4LjkxMDE1NjI1IEM0NC42OTMxNjQwNiA3MC4wODgzNTkzNyA0NS4wMzQ3NjU2MyA3MS4yNjY1NjI1IDQ1LjM4NjcxODc1IDcyLjQ4MDQ2ODc1IEM1MS41OTA5Mjc1NSA5OC43NDAxNDMyMiA0OC4xMTkzNTU5NyAxMjguNDA3NTUzODkgMzcuMzUxNTYyNSAxNTIuOTEwMTU2MjUgQzM2LjkyNjY1NTI3IDE1My44OTE0NTUwOCAzNi45MjY2NTUyNyAxNTMuODkxNDU1MDggMzYuNDkzMTY0MDYgMTU0Ljg5MjU3ODEyIEMyNi41NTAxNTk0MyAxNzcuNDE1NDA2MzEgOS4zNjgzODI4MiAxOTcuMDgzNzE0NDMgLTExLjY0ODQzNzUgMjA5LjkxMDE1NjI1IEMtMTIuNzIwOTM3NSAyMTAuNTkzMzU5MzggLTEzLjc5MzQzNzUgMjExLjI3NjU2MjUgLTE0Ljg5ODQzNzUgMjExLjk4MDQ2ODc1IEMtNDIuNzU5MjI3OTQgMjI4Ljk0MjAxNDc4IC03OC4yNTA2MTE4OSAyMzMuOTI2NDg1NDUgLTExMC4wMzAyNzM0NCAyMjYuNzQ3MDcwMzEgQy0xMTcuODE5NDE3MjkgMjI0Ljc3NzM2MzU3IC0xMjUuMjk4MDI2MiAyMjIuMTQwMzMxOTUgLTEzMi42NDg0Mzc1IDIxOC45MTAxNTYyNSBDLTEzMy4zMDI2MzY3MiAyMTguNjI2ODg0NzcgLTEzMy45NTY4MzU5NCAyMTguMzQzNjEzMjggLTEzNC42MzA4NTkzOCAyMTguMDUxNzU3ODEgQy0xNjQuNzI1OTMyMzQgMjA0Ljc2NTg4NDE0IC0xODguNDMyNjIzMzkgMTc5LjE4ODU5MzM5IC0yMDAuNTE5NTMxMjUgMTQ4LjcxMzg2NzE5IEMtMjAyLjQ3ODkwMDc3IDE0My41MTUyMTc0MiAtMjA0LjEzNTA4MjUgMTM4LjI1NDE1Mjc0IC0yMDUuNjQ4NDM3NSAxMzIuOTEwMTU2MjUgQy0yMDUuOTkwMDM5MDYgMTMxLjczMTk1MzEyIC0yMDYuMzMxNjQwNjMgMTMwLjU1Mzc1IC0yMDYuNjgzNTkzNzUgMTI5LjMzOTg0Mzc1IEMtMjE0LjIxNzQzOTk4IDk3LjQ1MjQwMTU3IC0yMDcuODM1NTc0NTYgNjEuNDM0NjUxNjEgLTE5MS4wMDc4MTI1IDMzLjYwNTQ2ODc1IEMtMTcyLjcxOTMxMzkzIDQuNTE1NjA4MTggLTE0NS40NzI3MDQ5NSAtMTQuNzk0NDA5MjYgLTExMi42NDg0Mzc1IC0yNC4wODk4NDM3NSBDLTExMS40NzAyMzQzOCAtMjQuNDMxNDQ1MzEgLTExMC4yOTIwMzEyNSAtMjQuNzczMDQ2ODcgLTEwOS4wNzgxMjUgLTI1LjEyNSBDLTcxLjkxMjE2MjA0IC0zMy45MDU5NjkyNyAtMjkuNDM4MzUxODQgLTI0LjE0NjUyMjQyIDAgMCBaIE0tMTU2LjY0ODQzNzUgMzguOTEwMTU2MjUgQy0xNzIuNjc2OTQzNTIgNTguMDg4NzczMjggLTE4MC4zOTY0OTAzOCA4NC41ODg4MzUyMyAtMTc4LjM3MTA5Mzc1IDEwOS4yOTI5Njg3NSBDLTE3NS40NzE3NjMxNSAxMzUuNzQ1OTA4ODUgLTE2Mi45NTU1MTQxMyAxNTkuNTg0NTMzMDggLTE0Mi42NDg0Mzc1IDE3Ni45MTAxNTYyNSBDLTEyNi41NDMxNjcwNSAxODkuNjk5NjM1NzIgLTEwNi4zMjExMTA2MiAxOTguMDkxNzg4ODEgLTg1LjY0ODQzNzUgMTk4LjkxMDE1NjI1IEMtODQuODg5MTc5NjkgMTk4Ljk1MDExNzE5IC04NC4xMjk5MjE4NyAxOTguOTkwMDc4MTIgLTgzLjM0NzY1NjI1IDE5OS4wMzEyNSBDLTU2LjU4MDI3NzA5IDE5OS43NzYwMDUyMyAtMzEuNDM2MTQxNzYgMTg4LjgxNjI3MjU4IC0xMi4wNTQ0NDMzNiAxNzAuNzY1NjI1IEM1LjI3MjM5MDEyIDE1NC4wMTA3MzQ1MiAxNi4zOTQyODMxMyAxMzAuMDkxODY1NjUgMTcuMzUxNTYyNSAxMDUuOTEwMTU2MjUgQzE3LjM5MTUyMzQ0IDEwNS4xNTA4OTg0NCAxNy40MzE0ODQzNyAxMDQuMzkxNjQwNjIgMTcuNDcyNjU2MjUgMTAzLjYwOTM3NSBDMTguMjE3NDExNDggNzYuODQxOTk1ODQgNy4yNTc2Nzg4MyA1MS42OTc4NjA1MSAtMTAuNzkyOTY4NzUgMzIuMzE2MTYyMTEgQy0yNy41NDc4NTkyMyAxNC45ODkzMjg2MyAtNTEuNDY2NzI4MSAzLjg2NzQzNTYyIC03NS42NDg0Mzc1IDIuOTEwMTU2MjUgQy03Ni43ODczMjQyMiAyLjg1MDIxNDg0IC03Ni43ODczMjQyMiAyLjg1MDIxNDg0IC03Ny45NDkyMTg3NSAyLjc4OTA2MjUgQy0xMDguODU5OTYwMDYgMS45MjkwMjU1MSAtMTM2LjI0OTk3Njk4IDE2LjQzMzI0OTk3IC0xNTYuNjQ4NDM3NSAzOC45MTAxNTYyNSBaICIgZmlsbD0iIzlFOUU5RSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjA4LjY0ODQzNzUsMjcuMDg5ODQzNzUpIi8+CjxwYXRoIGQ9Ik0wIDAgQzAuNzc5NDM0NjYgMC4wMDIyMjA2MSAxLjU1ODg2OTMyIDAuMDA0NDQxMjIgMi4zNjE5MjMyMiAwLjAwNjcyOTEzIEMzLjI0Mjc2MDc3IDAuMDA2ODA0NjYgNC4xMjM1OTgzMyAwLjAwNjg4MDE5IDUuMDMxMTI3OTMgMC4wMDY5NTgwMSBDNS45ODg0MTI5MyAwLjAxMjExOTI5IDYuOTQ1Njk3OTQgMC4wMTcyODA1OCA3LjkzMTk5MTU4IDAuMDIyNTk4MjcgQzkuMzk0ODA4MTIgMC4wMjQ3MjA2OSA5LjM5NDgwODEyIDAuMDI0NzIwNjkgMTAuODg3MTc2NTEgMC4wMjY4ODU5OSBDMTQuMDE1NDI2NzUgMC4wMzI1MDMxOSAxNy4xNDM2MDY1NiAwLjA0NTA1ODU5IDIwLjI3MTgzNTMzIDAuMDU3NzU0NTIgQzIyLjM4NzA2ODY3IDAuMDYyNzY3MyAyNC41MDIzMDMxMyAwLjA2NzMzMDU5IDI2LjYxNzUzODQ1IDAuMDcxNDI2MzkgQzMxLjgxNDgyODI5IDAuMDgyNDc4MiAzNy4wMTIwNzY3OCAwLjA5OTIzMzA1IDQyLjIwOTMzNTMzIDAuMTIwMjU0NTIgQzQ0Ljk5MTE0MDUxIDYuMjUxMzU5MTEgNDcuNTc5MTE3NDUgMTIuNDM1MDc1MzMgNTAuMDM3NDYwMzMgMTguNzAyMjg1NzcgQzUwLjM5MDE1OTkxIDE5LjU5NjU0NzcgNTAuNzQyODU5NSAyMC40OTA4MDk2MyA1MS4xMDYyNDY5NSAyMS40MTIxNzA0MSBDNTIuMjI1NzczMjEgMjQuMjUxNjQ4MTQgNTMuMzQyNjgwOCAyNy4wOTIxNDYzOCA1NC40NTkzMzUzMyAyOS45MzI3NTQ1MiBDNTUuNTU3NzAyMTUgMzIuNzIyNDMxMiA1Ni42NTY2Mzk1MiAzNS41MTE4ODE3NCA1Ny43NTYwODgyNiAzOC4zMDExMzIyIEM1OC40ODMyNDk1MSA0MC4xNDY2MDUxNSA1OS4yMDk1NzI4OCA0MS45OTI0MDg0OCA1OS45MzUwNDMzMyA0My44Mzg1NDY3NSBDNjEuNzc4MzM5NjQgNDguNTIyNzUzMjQgNjMuNjQxMjU5NzcgNTMuMTk3NzI3NjUgNjUuNTM5NDEzNDUgNTcuODYwMDAwNjEgQzY1LjkxMTc3MTI0IDU4Ljc3Nzg2ODUgNjYuMjg0MTI5MDMgNTkuNjk1NzM2MzkgNjYuNjY3NzcwMzkgNjAuNjQxNDE4NDYgQzY3LjM3NzQxMTc2IDYyLjM4NzQ1NzM3IDY4LjA5MTI4MzIxIDY0LjEzMTc4NDgzIDY4LjgwOTk4MjMgNjUuODc0MTE0OTkgQzY5LjEyNTc4MjQ3IDY2LjY1MjMyMTAxIDY5LjQ0MTU4MjY0IDY3LjQzMDUyNzA0IDY5Ljc2Njk1MjUxIDY4LjIzMjMxNTA2IEM3MC4wNDY0MTcyNCA2OC45MTMyNzc0NCA3MC4zMjU4ODE5NiA2OS41OTQyMzk4MSA3MC42MTM4MTUzMSA3MC4yOTU4Mzc0IEM3MS4yMDkzMzUzMyA3Mi4xMjAyNTQ1MiA3MS4yMDkzMzUzMyA3Mi4xMjAyNTQ1MiA3MS4yMDkzMzUzMyA3NS4xMjAyNTQ1MiBDNzkuNDU5MzM1MzMgNzUuMTIwMjU0NTIgODcuNzA5MzM1MzMgNzUuMTIwMjU0NTIgOTYuMjA5MzM1MzMgNzUuMTIwMjU0NTIgQzk2LjIwOTMzNTMzIDgwLjA3MDI1NDUyIDk2LjIwOTMzNTMzIDg1LjAyMDI1NDUyIDk2LjIwOTMzNTMzIDkwLjEyMDI1NDUyIEM5MC4yNjkzMzUzMyA5MC4xMjAyNTQ1MiA4NC4zMjkzMzUzMyA5MC4xMjAyNTQ1MiA3OC4yMDkzMzUzMyA5MC4xMjAyNTQ1MiBDNzkuMTk5MzM1MzMgOTMuNTg1MjU0NTIgNzkuMTk5MzM1MzMgOTMuNTg1MjU0NTIgODAuMjA5MzM1MzMgOTcuMTIwMjU0NTIgQzg1LjQ4OTMzNTMzIDk3LjEyMDI1NDUyIDkwLjc2OTMzNTMzIDk3LjEyMDI1NDUyIDk2LjIwOTMzNTMzIDk3LjEyMDI1NDUyIEM5Ni4yMDkzMzUzMyAxMDIuMDcwMjU0NTIgOTYuMjA5MzM1MzMgMTA3LjAyMDI1NDUyIDk2LjIwOTMzNTMzIDExMi4xMjAyNTQ1MiBDOTEuNzU0MzM1MzMgMTEyLjYxNTI1NDUyIDkxLjc1NDMzNTMzIDExMi42MTUyNTQ1MiA4Ny4yMDkzMzUzMyAxMTMuMTIwMjU0NTIgQzg3LjcxNDY0NzgzIDExNC4zODQ4MjQ4MyA4OC4yMTk5NjAzMyAxMTUuNjQ5Mzk1MTQgODguNzQwNTg1MzMgMTE2Ljk1MjI4NTc3IEM4OS4zOTcxMDI1MiAxMTguNjEyMzM2MzcgOTAuMDUzMzM3ODkgMTIwLjI3MjQ5ODQ1IDkwLjcwOTMzNTMzIDEyMS45MzI3NTQ1MiBDOTEuMjEwMTM2MTEgMTIzLjE4MjgyMjg4IDkxLjIxMDEzNjExIDEyMy4xODI4MjI4OCA5MS43MjEwNTQwOCAxMjQuNDU4MTQ1MTQgQzkyLjE5NDc4NDU1IDEyNS42NjE4MDcyNSA5Mi4xOTQ3ODQ1NSAxMjUuNjYxODA3MjUgOTIuNjc4MDg1MzMgMTI2Ljg4OTc4NTc3IEM5Mi45NzEzNDcwNSAxMjcuNjI4MTc2ODggOTMuMjY0NjA4NzYgMTI4LjM2NjU2Nzk5IDkzLjU2Njc1NzIgMTI5LjEyNzMzNDU5IEM5NC4yMDkzMzUzMyAxMzEuMTIwMjU0NTIgOTQuMjA5MzM1MzMgMTMxLjEyMDI1NDUyIDk0LjIwOTMzNTMzIDEzNC4xMjAyNTQ1MiBDODEuOTk5MzM1MzMgMTM0LjEyMDI1NDUyIDY5Ljc4OTMzNTMzIDEzNC4xMjAyNTQ1MiA1Ny4yMDkzMzUzMyAxMzQuMTIwMjU0NTIgQzUyLjIwOTMzNTMzIDEyMi4xMjAyNTQ1MiA1Mi4yMDkzMzUzMyAxMjIuMTIwMjU0NTIgNDkuMjA5MzM1MzMgMTEyLjEyMDI1NDUyIEMzMC4wNjkzMzUzMyAxMTIuMTIwMjU0NTIgMTAuOTI5MzM1MzMgMTEyLjEyMDI1NDUyIC04Ljc5MDY2NDY3IDExMi4xMjAyNTQ1MiBDLTkuNzgwNjY0NjcgMTE1LjQyMDI1NDUyIC0xMC43NzA2NjQ2NyAxMTguNzIwMjU0NTIgLTExLjc5MDY2NDY3IDEyMi4xMjAyNTQ1MiBDLTEzLjQ0MDY2NDY3IDEyNi4wODAyNTQ1MiAtMTUuMDkwNjY0NjcgMTMwLjA0MDI1NDUyIC0xNi43OTA2NjQ2NyAxMzQuMTIwMjU0NTIgQy0yOS4wMDA2NjQ2NyAxMzQuMTIwMjU0NTIgLTQxLjIxMDY2NDY3IDEzNC4xMjAyNTQ1MiAtNTMuNzkwNjY0NjcgMTM0LjEyMDI1NDUyIEMtNTMuMTI2NDQxNjkgMTMwLjc5OTEzOTYgLTUyLjU1MzU4NjExIDEyOC4yMDE5NDI1MyAtNTEuMzgwNTA4NDIgMTI1LjEzMTk3MzI3IEMtNTAuOTc5Mjg3NzIgMTI0LjA3MzMzMDY5IC01MC45NzkyODc3MiAxMjQuMDczMzMwNjkgLTUwLjU2OTk2MTU1IDEyMi45OTMzMDEzOSBDLTUwLjI5MjE2ODU4IDEyMi4yNzIwNzA5MiAtNTAuMDE0Mzc1NjEgMTIxLjU1MDg0MDQ1IC00OS43MjgxNjQ2NyAxMjAuODA3NzU0NTIgQy00OS4zMDU2NzQ0NCAxMTkuNjk2OTA0OTEgLTQ5LjMwNTY3NDQ0IDExOS42OTY5MDQ5MSAtNDguODc0NjQ5MDUgMTE4LjU2MzYxMzg5IEMtNDguMTgzNDc4OTIgMTE2Ljc0NzgyNzk2IC00Ny40ODc1NDc3OSAxMTQuOTMzODU1NTIgLTQ2Ljc5MDY2NDY3IDExMy4xMjAyNTQ1MiBDLTQ5Ljc2MDY2NDY3IDExMi43OTAyNTQ1MiAtNTIuNzMwNjY0NjcgMTEyLjQ2MDI1NDUyIC01NS43OTA2NjQ2NyAxMTIuMTIwMjU0NTIgQy01NS43OTA2NjQ2NyAxMDcuMTcwMjU0NTIgLTU1Ljc5MDY2NDY3IDEwMi4yMjAyNTQ1MiAtNTUuNzkwNjY0NjcgOTcuMTIwMjU0NTIgQy01MC41MTA2NjQ2NyA5Ny4xMjAyNTQ1MiAtNDUuMjMwNjY0NjcgOTcuMTIwMjU0NTIgLTM5Ljc5MDY2NDY3IDk3LjEyMDI1NDUyIEMtMzkuMTMwNjY0NjcgOTQuODEwMjU0NTIgLTM4LjQ3MDY2NDY3IDkyLjUwMDI1NDUyIC0zNy43OTA2NjQ2NyA5MC4xMjAyNTQ1MiBDLTQzLjczMDY2NDY3IDkwLjEyMDI1NDUyIC00OS42NzA2NjQ2NyA5MC4xMjAyNTQ1MiAtNTUuNzkwNjY0NjcgOTAuMTIwMjU0NTIgQy01NS43OTA2NjQ2NyA4NS4xNzAyNTQ1MiAtNTUuNzkwNjY0NjcgODAuMjIwMjU0NTIgLTU1Ljc5MDY2NDY3IDc1LjEyMDI1NDUyIEMtNDcuNTQwNjY0NjcgNzUuMTIwMjU0NTIgLTM5LjI5MDY2NDY3IDc1LjEyMDI1NDUyIC0zMC43OTA2NjQ2NyA3NS4xMjAyNTQ1MiBDLTMwLjQ2MDY2NDY3IDczLjQ3MDI1NDUyIC0zMC4xMzA2NjQ2NyA3MS44MjAyNTQ1MiAtMjkuNzkwNjY0NjcgNzAuMTIwMjU0NTIgQy0yOS4zNTY1NzU4MyA2OC44MTI0MDQ1NiAtMjguODg3MjM5MjEgNjcuNTE1NzA5OTggLTI4LjM4Mjk0OTgzIDY2LjIzMzI5MTYzIEMtMjcuOTU1MjcwNjEgNjUuMTM2NzU1MTQgLTI3Ljk1NTI3MDYxIDY1LjEzNjc1NTE0IC0yNy41MTg5NTE0MiA2NC4wMTgwNjY0MSBDLTI3LjIwOTAwNzQyIDYzLjIzNTgxMTkyIC0yNi44OTkwNjM0MiA2Mi40NTM1NTc0MyAtMjYuNTc5NzI3MTcgNjEuNjQ3NTk4MjcgQy0yNi4wOTMyMzk1MiA2MC40MDUyNzE4NCAtMjYuMDkzMjM5NTIgNjAuNDA1MjcxODQgLTI1LjU5NjkyMzgzIDU5LjEzNzg0NzkgQy0yNC41NDA0OTM5NyA1Ni40NDI4OTc0OSAtMjMuNDc4MjE0MDQgNTMuNzUwMjk3MzYgLTIyLjQxNTY2NDY3IDUxLjA1Nzc1NDUyIEMtMjEuNjg4NjgwNTUgNDkuMjA3NjI3NzYgLTIwLjk2MjAzODM5IDQ3LjM1NzM2NjU5IC0yMC4yMzU3MzMwMyA0NS41MDY5NzMyNyBDLTE4Ljc3OTY4MzY3IDQxLjc5ODk3MzEgLTE3LjMyMTM4MjQ0IDM4LjA5MTg3MDIyIC0xNS44NjE0NjU0NSAzNC4zODUzOTEyNCBDLTE0LjAwMzg3MjU1IDI5LjY2NjY4MzE1IC0xMi4xNTg0NzMxNyAyNC45NDMzMjA2NSAtMTAuMzE4MDA4NDIgMjAuMjE3OTEwNzcgQy05LjgwNjIzMTMyIDE4LjkwNjEwMjQ1IC05LjI5NDM1Mzc3IDE3LjU5NDMzMzMyIC04Ljc4MjM2Mzg5IDE2LjI4MjYwODAzIEMtNy44NDYzMDQ5OSAxMy44ODM5MzcxMSAtNi45MTE2ODAwOCAxMS40ODQ3MDU5NyAtNS45Nzg2NTI5NSA5LjA4NDg1NDEzIEMtNS41NjcyODA4OCA4LjAzNDM0ODc1IC01LjE1NTkwODgxIDYuOTgzODQzMzggLTQuNzMyMDcwOTIgNS45MDE1MDQ1MiBDLTQuMzc4MzAzODMgNC45OTQ2NDkwNSAtNC4wMjQ1MzY3NCA0LjA4Nzc5MzU4IC0zLjY2MDA0OTQ0IDMuMTUzNDU3NjQgQy0yLjM3OTk5Mzk4IDAuMTU5ODMxNzMgLTIuMzc5OTkzOTggMC4xNTk4MzE3MyAwIDAgWiBNMjAuMjA5MzM1MzMgMzQuMTIwMjU0NTIgQzE2LjgxMTU1MDQyIDQxLjQ0MTY3MiAxMy45NzAzMDk5MyA0OC45Mjk2MjIxMiAxMS4yMDc4NzA0OCA1Ni41MDY3MjkxMyBDMTAuNDUxMzgyMzUgNTguNTc5NTQ2MDkgOS42ODgwNjYyNSA2MC42NDk3NjM3OSA4LjkyNDE3OTA4IDYyLjcxOTg2Mzg5IEM4LjQ0MDY5OTkyIDY0LjAzOTM3NjU3IDcuOTU3NjEyMjcgNjUuMzU5MDMyNzggNy40NzQ5NjAzMyA2Ni42Nzg4NDgyNyBDNy4wMzk1Nzk0NyA2Ny44Njc5Mjc4NiA2LjYwNDE5ODYxIDY5LjA1NzAwNzQ1IDYuMTU1NjI0MzkgNzAuMjgyMTE5NzUgQzUuMTAzOTAxNTkgNzIuOTM3ODUxOCA1LjEwMzkwMTU5IDcyLjkzNzg1MTggNS4yMDkzMzUzMyA3NS4xMjAyNTQ1MiBDMTUuMTA5MzM1MzMgNzUuMTIwMjU0NTIgMjUuMDA5MzM1MzMgNzUuMTIwMjU0NTIgMzUuMjA5MzM1MzMgNzUuMTIwMjU0NTIgQzMzLjQxMTgzNzk3IDY5LjEyODU5NjY3IDMxLjYyMDI3MzkyIDYzLjIzNDQ4Mzc4IDI5LjUxMDExNjU4IDU3LjM2MjQ0MjAyIEMyOS4yNzAyMDQ5MyA1Ni42ODg1MTQxIDI5LjAzMDI5MzI3IDU2LjAxNDU4NjE4IDI4Ljc4MzExMTU3IDU1LjMyMDIzNjIxIEMyOC4wMzE2Nzg1NiA1My4yMTEwNzA1NyAyNy4yNzY4MzI1IDUxLjEwMzE0NjU4IDI2LjUyMTgzNTMzIDQ4Ljk5NTI1NDUyIEMyNi4wMDUzMzA1NCA0Ny41NDc0MTk0MyAyNS40ODkwNTI4MSA0Ni4wOTk1MDMzMyAyNC45NzMwMDcyIDQ0LjY1MTUwNDUyIEMyMy43MjEwNjM0NyA0MS4xNDAxNTA4OCAyMi40NjYwNjAxOSAzNy42Mjk5MDAyNSAyMS4yMDkzMzUzMyAzNC4xMjAyNTQ1MiBDMjAuODc5MzM1MzMgMzQuMTIwMjU0NTIgMjAuNTQ5MzM1MzMgMzQuMTIwMjU0NTIgMjAuMjA5MzM1MzMgMzQuMTIwMjU0NTIgWiBNLTAuNzkwNjY0NjcgOTAuMTIwMjU0NTIgQy0xLjQ1MDY2NDY3IDkyLjQzMDI1NDUyIC0yLjExMDY2NDY3IDk0Ljc0MDI1NDUyIC0yLjc5MDY2NDY3IDk3LjEyMDI1NDUyIEMxMi4zODkzMzUzMyA5Ny4xMjAyNTQ1MiAyNy41NjkzMzUzMyA5Ny4xMjAyNTQ1MiA0My4yMDkzMzUzMyA5Ny4xMjAyNTQ1MiBDNDIuNTQ5MzM1MzMgOTQuODEwMjU0NTIgNDEuODg5MzM1MzMgOTIuNTAwMjU0NTIgNDEuMjA5MzM1MzMgOTAuMTIwMjU0NTIgQzI3LjM0OTMzNTMzIDkwLjEyMDI1NDUyIDEzLjQ4OTMzNTMzIDkwLjEyMDI1NDUyIC0wLjc5MDY2NDY3IDkwLjEyMDI1NDUyIFogIiBmaWxsPSIjOUU5RTlFIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMDcuNzkwNjY0NjcyODUxNTYsNDUuODc5NzQ1NDgzMzk4NDQpIi8+Cjwvc3ZnPgo=",
        color1: "#FFAB19",
        color2: "#FF8C00",
        color3: "#E76F00",
        blocks: [
          {
            opcode: "login",
            text: Scratch.translate({
              id: "oauthExtension.login",
              default: "Log in with [SERVICE]",
            }),
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              SERVICE: { type: Scratch.ArgumentType.STRING, menu: "SERVICE" },
            },
          },
          {
            opcode: "isLoggedIn",
            text: Scratch.translate({
              id: "oauthExtension.isLoggedIn",
              default: "Is user logged in with [SERVICE]?",
            }),
            blockType: Scratch.BlockType.BOOLEAN,
            arguments: {
              SERVICE: { type: Scratch.ArgumentType.STRING, menu: "SERVICE" },
            },
          },
          {
            opcode: "setClientId",
            text: Scratch.translate({
              id: "oauthExtension.setClientId",
              default: "Set client ID for [SERVICE] to [CLIENT_ID]",
            }),
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              SERVICE: { type: Scratch.ArgumentType.STRING, menu: "SERVICE" },
              CLIENT_ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
            },
          },
          {
            opcode: "setClientSecret",
            text: Scratch.translate({
              id: "oauthExtension.setClientSecret",
              default: "Set client secret for [SERVICE] to [CLIENT_SECRET]",
            }),
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              SERVICE: { type: Scratch.ArgumentType.STRING, menu: "SERVICE" },
              CLIENT_SECRET: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
            },
          },
          {
            opcode: "setRedirectUri",
            text: Scratch.translate({
              id: "oauthExtension.setRedirectUri",
              default: "Set redirect URI for [SERVICE] to [REDIRECT_URI]",
            }),
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              SERVICE: { type: Scratch.ArgumentType.STRING, menu: "SERVICE" },
              REDIRECT_URI: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
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

    login(args) {
      const service = args.SERVICE;
      const client = this.clients[service];
      const authUrl = `${client.authUrl}?response_type=code&client_id=${client.clientId}&redirect_uri=${client.redirectUri}&scope=${encodeURIComponent(client.scope)}`;

      // Open a new tab for the user to authorize the app
      Scratch.openWindow(authUrl, "_blank");

      // Listen for message with authorization code (assuming your app handles this securely)
      window.addEventListener(
        "message",
        async (event) => {
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
        },
        { once: true }
      );
    }

    isLoggedIn(args) {
      const service = args.SERVICE;
      return !!this.tokens[service];
    }
  }

  Scratch.extensions.register(new OAuthExtension());
})(Scratch);
