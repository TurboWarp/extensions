// Name: turbowarp.sh
// By: reesericci
// ID: ssh
// Description: Connect to SSH servers over WebSockets!
// License: LGPL-3.0-or-later

// Full git repository at https://sr.ht/~reesericci/turbowarp.sh

((Scratch) => {
  "use strict";
  // src/connection.js
  var Connection = class _Connection {
    constructor(username, host, identity, proxy) {
      this.username = username;
      this.host = host;
      this.identity = identity;
      this.proxy = proxy || this.host;
    }
    connect() {
      return goConnect(this.username, this.host, this.identity, this.proxy); // eslint-disable-line no-undef
    }
    toString() {
      return JSON.stringify({
        username: this.username,
        host: this.host,
        identity: this.identity,
        proxy: this.proxy,
      });
    }
    toFriendlyString() {
      return `${this.username}@${this.host} via ${this.proxy}`;
    }
    static parse(encoded) {
      let parsed = JSON.parse(encoded);
      return new _Connection(
        parsed.username,
        parsed.host,
        parsed.identity,
        parsed.proxy
      );
    }
  };

  // src/ssh_extension.js
  var SSHExtension = class {
    activeConn = "";
    getInfo() {
      return {
        id: "ssh",
        name: "Shell",
        docsURI: "https://extensions.turbowarp.org/reesericci/turbowarp-sh",
        blocks: [
          {
            opcode: "connection",
            blockType: Scratch.BlockType.REPORTER,
            text: "connection [USER]@[HOST] -i [IDENTITY]",
            arguments: {
              USER: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "user",
              },
              HOST: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "host",
              },
              IDENTITY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "identity file",
              },
            },
          },
          {
            opcode: "connectionWithProxy",
            blockType: Scratch.BlockType.REPORTER,
            text: "connection [USER]@[HOST] -i [IDENTITY] with proxy [PROXY]",
            arguments: {
              USER: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "user",
              },
              HOST: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "host",
              },
              IDENTITY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "identity file",
              },
              PROXY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "wss://",
              },
            },
          },
          {
            opcode: "connect",
            blockType: Scratch.BlockType.COMMAND,
            text: "connect to [CONNECTION]",
            arguments: {
              CONNECTION: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "connection",
              },
            },
          },
          {
            opcode: "isConnected",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is connected?",
          },
          {
            opcode: "disconnect",
            blockType: Scratch.BlockType.COMMAND,
            text: "disconnect",
          },
          {
            opcode: "execute",
            blockType: Scratch.BlockType.COMMAND,
            text: "execute [COMMAND]",
            arguments: {
              COMMAND: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "ls",
              },
            },
          },
          {
            opcode: "executeReporter",
            blockType: Scratch.BlockType.REPORTER,
            text: "execute [COMMAND]",
            arguments: {
              COMMAND: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "ls",
              },
            },
          },
          {
            opcode: "workingDirectory",
            blockType: Scratch.BlockType.REPORTER,
            text: "working directory",
          },
          {
            opcode: "activeConnection",
            blockType: Scratch.BlockType.REPORTER,
            text: "active connection",
          },
          {
            opcode: "friendlyActiveConnection",
            blockType: Scratch.BlockType.REPORTER,
            text: "friendly active connection",
          },
          {
            opcode: "friendlyConnection",
            blockType: Scratch.BlockType.REPORTER,
            text: "friendly [CONNECTION]",
            arguments: {
              CONNECTION: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "connection",
              },
            },
          },
        ],
      };
    }
    connectionWithProxy({ USER, HOST, IDENTITY, PROXY }) {
      const conn = new Connection(USER, HOST, IDENTITY, PROXY);
      return conn.toString();
    }
    connection({ USER, HOST, IDENTITY }) {
      const conn = new Connection(USER, HOST, IDENTITY, null);
      return conn.toString();
    }
    connect({ CONNECTION }) {
      this.activeConn = Connection.parse(CONNECTION);
      return this.activeConn.connect();
    }
    activeConnection() {
      return this.activeConn.toString();
    }
    friendlyActiveConnection() {
      return this.activeConn.toFriendlyString();
    }
    friendlyConnection({ CONNECTION }) {
      return Connection.parse(CONNECTION).toFriendlyString();
    }
    execute({ COMMAND }) {
      return goExecute(COMMAND); // eslint-disable-line no-undef
    }
    executeReporter({ COMMAND }) {
      return goExecute(COMMAND); // eslint-disable-line no-undef
    }
    disconnect() {
      return goDisconnect(); // eslint-disable-line no-undef
    }
    workingDirectory() {
      return this.execute({ COMMAND: "pwd" });
    }
    isConnected() {
      return goConnected(); // eslint-disable-line no-undef
    }
  };

  // src/index.js
  import(
    "https://cdn.jsdelivr.net/npm/@turbowarp.sh/client@^1.0.0-rc6/dist/index.js"
  ).then((Client) => {
    new Client.default();
  });
  Scratch.extensions.register(new SSHExtension());
})(Scratch);
//# sourceMappingURL=netloaded.min.js.map
