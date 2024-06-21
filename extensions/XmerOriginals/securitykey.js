// Name: Security Key
// ID: securitykey
// Description: Authenticate Users on the Systems/Applications you make available to them or make them unlock the data they store in their Storages/Servers with a key that only they can access. Requires Security Key (Hardware).
// By: XmerOriginals <https://scratch.mit.edu/users/XmerOriginals/>
// License: MPL-2.0
// Version: 1.0.0

(function (Scratch) {
  "use strict";

  class SecurityKey {
    constructor() {
      this.supported = false;
      this.authenticated = false;
      this.error = "";
    }

    getInfo() {
      return {
        color1: "#299900",
        color2: "#2b8f00",
        color3: "#246600",
        id: "securitykey",
        name: "Security Key",
        blocks: [
          {
            opcode: "isSupported",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "security key supported?",
          },
          {
            opcode: "requestAuthentication",
            blockType: Scratch.BlockType.COMMAND,
            text: "request security key authentication",
          },
          {
            opcode: "isAuthenticated",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "authenticated?",
          },
          {
            opcode: "isAuthenticationFailed",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "authentication failed?",
          },
          {
            opcode: "getStatus",
            blockType: Scratch.BlockType.REPORTER,
            text: "status",
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
        const _credential = await navigator.credentials.get({
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
})(Scratch);
