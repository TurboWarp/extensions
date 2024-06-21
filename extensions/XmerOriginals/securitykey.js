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
        blockIconURI:
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2ZXJzaW9uPSIxLjEiIHdpZHRoPSIxMDI0IiBoZWlnaHQ9IjEwMjQiIHZpZXdCb3g9IjAgMCAxMDI0IDEwMjQiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8ZGVzYz5DcmVhdGVkIHdpdGggRmFicmljLmpzIDMuNS4wPC9kZXNjPgo8ZGVmcz4KPC9kZWZzPgo8cmVjdCB4PSIwIiB5PSIwIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmZmZmZmIi8+CjxnIHRyYW5zZm9ybT0ibWF0cml4KDI3LjIwMTkgMCAwIDI3LjIwMTkgNTEyLjAwMDQgNTEyLjAwMDMpIiBpZD0iMjM0MzEzIj4KPHBhdGggc3R5bGU9InN0cm9rZTogcmdiKDAsMCwwKTsgc3Ryb2tlLXdpZHRoOiAyMjsgc3Ryb2tlLWRhc2hhcnJheTogbm9uZTsgc3Ryb2tlLWxpbmVjYXA6IHJvdW5kOyBzdHJva2UtZGFzaG9mZnNldDogMDsgc3Ryb2tlLWxpbmVqb2luOiByb3VuZDsgc3Ryb2tlLW1pdGVybGltaXQ6IDQ7IGlzLWN1c3RvbS1mb250OiBub25lOyBmb250LWZpbGUtdXJsOiBub25lOyBmaWxsOiBub25lOyBmaWxsLXJ1bGU6IG5vbnplcm87IG9wYWNpdHk6IDE7IiB2ZWN0b3ItZWZmZWN0PSJub24tc2NhbGluZy1zdHJva2UiIHRyYW5zZm9ybT0iIHRyYW5zbGF0ZSgtMTIuMDAxOCwgLTEyKSIgZD0iTSAxMy4xNDI3IDIwLjk5OTkgQyAxMC44MDc3IDE5LjU0MzggOS4yNTI1NCAxNi45NTIyIDkuMjUyNTQgMTMuOTk2OCBDIDkuMjUyNTQgMTIuNDc4MyAxMC40ODMzIDExLjI0NzYgMTIuMDAwOCAxMS4yNDc2IEMgMTMuNTE4NCAxMS4yNDc2IDE0Ljc0OTEgMTIuNDc4MyAxNC43NDkxIDEzLjk5NjggQyAxNC43NDkxIDE1LjUxNTMgMTUuOTc5OCAxNi43NDYgMTcuNDk3NCAxNi43NDYgQyAxOS4wMTQ5IDE2Ljc0NiAyMC4yNDU3IDE1LjUxNTMgMjAuMjQ1NyAxMy45OTY4IEMgMjAuMjQ1NyA5LjQ0MTM5IDE2LjU1NDQgNS43NDkyMiAxMi4wMDE3IDUuNzQ5MjIgQyA3LjQ0OTA3IDUuNzQ5MjIgMy43NTc4MSA5LjQ0MTM5IDMuNzU3ODEgMTMuOTk2OCBDIDMuNzU3ODEgMTUuMDEyMiAzLjg3MTQ1IDE2LjAwMSA0LjA4MDM4IDE2Ljk1NCBNIDguNDkwMjcgMjAuMjk4OSBDIDcuMjM5MzggMTguNTEzOCA2LjUwMzUxIDE2LjM0MTkgNi41MDM1MSAxMy45OTY4IEMgNi41MDM1MSAxMC45NTk5IDguOTY0MDUgOC40OTg0NCAxMS45OTkyIDguNDk4NDQgQyAxNS4wMzQzIDguNDk4NDQgMTcuNDk0OCAxMC45NTk5IDE3LjQ5NDggMTMuOTk2OCBNIDE3Ljc5MjcgMTkuNDgwNiBDIDE3LjY5MzcgMTkuNDg2MSAxNy41OTY2IDE5LjQ5NTMgMTcuNDk2NyAxOS40OTUzIEMgMTQuNDYxNiAxOS40OTUzIDEyLjAwMTEgMTcuMDMzOCAxMi4wMDExIDEzLjk5NjkgTSAxOS42NzM0IDYuNDc2ODIgQyAxNy43OTkzIDQuMzQ4MDIgMTUuMDU5MyAzIDEyLjAwMDQgMyBDIDguOTQxNDEgMyA2LjIwMTM4IDQuMzQ4MDIgNC4zMjczNCA2LjQ3NjgyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPC9nPgo8ZyB0cmFuc2Zvcm09Im1hdHJpeCg1LjY5NTQgMCAwIDUuNjk1NCA1MTIuMDAwOCA1MTIuMDAwOCkiIGlkPSI1MjkxMDIiPgo8cGF0aCBzdHlsZT0ic3Ryb2tlOiByZ2IoMCwwLDApOyBzdHJva2Utd2lkdGg6IDIyOyBzdHJva2UtZGFzaGFycmF5OiBub25lOyBzdHJva2UtbGluZWNhcDogYnV0dDsgc3Ryb2tlLWRhc2hvZmZzZXQ6IDA7IHN0cm9rZS1saW5lam9pbjogbWl0ZXI7IHN0cm9rZS1taXRlcmxpbWl0OiA0OyBpcy1jdXN0b20tZm9udDogbm9uZTsgZm9udC1maWxlLXVybDogbm9uZTsgZmlsbDogbm9uZTsgZmlsbC1ydWxlOiBub256ZXJvOyBvcGFjaXR5OiAxOyIgdmVjdG9yLWVmZmVjdD0ibm9uLXNjYWxpbmctc3Ryb2tlIiB0cmFuc2Zvcm09IiB0cmFuc2xhdGUoLTY3LjUsIC02Ny41KSIgZD0iTSAxMzIuNSA2Ny41IEMgMTMyLjUgMTAzLjM5OSAxMDMuMzk5IDEzMi41IDY3LjUgMTMyLjUgQyAzMS42MDE1IDEzMi41IDIuNSAxMDMuMzk5IDIuNSA2Ny41IEMgMi41IDMxLjYwMTUgMzEuNjAxNSAyLjUgNjcuNSAyLjUgQyAxMDMuMzk5IDIuNSAxMzIuNSAzMS42MDE1IDEzMi41IDY3LjUgWiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CjwvZz4KPC9zdmc+",
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
