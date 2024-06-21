// Name: Security Key
// ID: securitykey
// Description: Authenticate Users on the Systems/Applications you make available to them or make them unlock the data they store in their Storages/Servers with a key that only they can access. Requires Security Key (Hardware).
// By: XmerOriginals <https://scratch.mit.edu/users/XmerOriginals/>
// License: MPL-2.0
// Version: 1.0.0

class SecurityKey {
  constructor() {
    this.supported = false;
    this.authenticated = false;
    this.error = "";
  }

  getInfo() {
    return {
      blockIconURI:
        "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IS0tIFVwbG9hZGVkIHRvOiBTVkcgUmVwbywgd3d3LnN2Z3JlcG8uY29tLCBHZW5lcmF0b3I6IFNWRyBSZXBvIE1peGVyIFRvb2xzIC0tPg0KPHN2ZyB3aWR0aD0iODAwcHgiIGhlaWdodD0iODAwcHgiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4NCjxwYXRoIGQ9Ik0xMy4xNDI3IDIwLjk5OTlDMTAuODA3NyAxOS41NDM4IDkuMjUyNTQgMTYuOTUyMiA5LjI1MjU0IDEzLjk5NjhDOS4yNTI1NCAxMi40NzgzIDEwLjQ4MzMgMTEuMjQ3NiAxMi4wMDA4IDExLjI0NzZDMTMuNTE4NCAxMS4yNDc2IDE0Ljc0OTEgMTIuNDc4MyAxNC43NDkxIDEzLjk5NjhDMTQuNzQ5MSAxNS41MTUzIDE1Ljk3OTggMTYuNzQ2IDE3LjQ5NzQgMTYuNzQ2QzE5LjAxNDkgMTYuNzQ2IDIwLjI0NTcgMTUuNTE1MyAyMC4yNDU3IDEzLjk5NjhDMjAuMjQ1NyA5LjQ0MTM5IDE2LjU1NDQgNS43NDkyMiAxMi4wMDE3IDUuNzQ5MjJDNy40NDkwNyA1Ljc0OTIyIDMuNzU3ODEgOS40NDEzOSAzLjc1NzgxIDEzLjk5NjhDMy43NTc4MSAxNS4wMTIyIDMuODcxNDUgMTYuMDAxIDQuMDgwMzggMTYuOTU0TTguNDkwMjcgMjAuMjk4OUM3LjIzOTM4IDE4LjUxMzggNi41MDM1MSAxNi4zNDE5IDYuNTAzNTEgMTMuOTk2OEM2LjUwMzUxIDEwLjk1OTkgOC45NjQwNSA4LjQ5ODQ0IDExLjk5OTIgOC40OTg0NEMxNS4wMzQzIDguNDk4NDQgMTcuNDk0OCAxMC45NTk5IDE3LjQ5NDggMTMuOTk2OE0xNy43OTI3IDE5LjQ4MDZDMTcuNjkzNyAxOS40ODYxIDE3LjU5NjYgMTkuNDk1MyAxNy40OTY3IDE5LjQ5NTNDMTQuNDYxNiAxOS40OTUzIDEyLjAwMTEgMTcuMDMzOCAxMi4wMDExIDEzLjk5NjlNMTkuNjczNCA2LjQ3NjgyQzE3Ljc5OTMgNC4zNDgwMiAxNS4wNTkzIDMgMTIuMDAwNCAzQzguOTQxNDEgMyA2LjIwMTM4IDQuMzQ4MDIgNC4zMjczNCA2LjQ3NjgyIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+DQo8L3N2Zz4=",
      color1: "#5ef726",
      color2: "#1fbd00",
      color3: "#0ecc00",
      id: "securitykey",
      name: "Security Key",
      blocks: [
        {
          opcode: "isSupported",
          blockType: Scratch.BlockType.BOOLEAN,
          text: "Is security key supported?",
        },
        {
          opcode: "requestAuthentication",
          blockType: Scratch.BlockType.COMMAND,
          text: "Request security key authentication",
        },
        {
          opcode: "isAuthenticated",
          blockType: Scratch.BlockType.BOOLEAN,
          text: "Is authenticated?",
        },
        {
          opcode: "isAuthenticationFailed",
          blockType: Scratch.BlockType.BOOLEAN,
          text: "Is authentication failed?",
        },
        {
          opcode: "getStatus",
          blockType: Scratch.BlockType.REPORTER,
          text: "Status",
        },
      ],
    };
  }

  isSupported() {
    this.supported = "PublicKeyCredential" in window;
    return this.supported;
  }

  async requestAuthentication() {
    this.authenticated = false;
    this.error = "";

    if (!this.supported) {
      this.error = "Security key not supported";
      return;
    }

    const publicKeyCredentialRequestOptions = {
      challenge: new Uint8Array(32),
      timeout: 60000,
      allowCredentials: [],
      userVerification: "preferred",
    };

    try {
      const credential = await navigator.credentials.get({
        publicKey: publicKeyCredentialRequestOptions,
      });
      this.authenticated = true;
      this.error = "";
    } catch (err) {
      this.authenticated = false;
      this.error = `Authentication failed: ${err.message}`;
    }
  }

  isAuthenticated() {
    return this.authenticated;
  }

  isAuthenticationFailed() {
    return !this.authenticated && this.error !== "";
  }

  getStatus() {
    return this.error;
  }
}

Scratch.extensions.register(new SecurityKey());
