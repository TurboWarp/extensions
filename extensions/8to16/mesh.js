// Name: Mesh
// ID: eightxtwoMesh
// Description: Send and receive messages between other projects.
// By: 8to16 <https://scratch.mit.edu/users/8to16/>
// License: MPL-2.0

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("Mesh extension must run unsandboxed");
  }
  const vm = Scratch.vm;

  // Init the broadcastchannel
  const bc = new BroadcastChannel("extensions.turbowarp.org/8to16/mesh");
  let connectedUsers = 0;
  let finishedWaits = {};

  if (!vm.runtime.extensionStorage["8to16mesh"])
    vm.runtime.extensionStorage["8to16mesh"] = { messages: [], variables: {} };
  vm.runtime.on("RUNTIME_DISPOSED", () => {
    vm.runtime.extensionStorage["8to16mesh"] = { messages: [], variables: {} };
  });
  vm.runtime.on("PROJECT_LOADED", () => {
    vm.runtime.extensionManager.refreshBlocks();
  });

  // Message utilities
  const getMeshages = () =>
    vm.runtime.extensionStorage["8to16mesh"].messages ?? [];
  const addMeshage = (name) => {
    if (getMeshages().includes(name)) return;
    if (name === "") return;
    vm.runtime.extensionStorage["8to16mesh"].messages = [
      ...getMeshages(),
      name,
    ];
    vm.extensionManager.refreshBlocks();
  };
  const delMeshage = (name) => {
    if (!getMeshages().includes(name)) return;
    vm.runtime.extensionStorage["8to16mesh"].messages = getMeshages().filter(
      (n) => n !== name
    );
    vm.extensionManager.refreshBlocks();
  };

  // Var utilities
  const getMeshVars = () =>
    vm.runtime.extensionStorage["8to16mesh"].variables ?? {};
  const addMeshVar = (name) => {
    if (Object.keys(getMeshVars()).includes(name)) return;
    if (name === "") return;
    vm.runtime.extensionStorage["8to16mesh"].variables = {
      ...getMeshVars(),
      [name]: "",
    };
    vm.extensionManager.refreshBlocks();
  };
  const delMeshVar = (name) => {
    if (Object.keys(getMeshVars()).includes(name)) return;
    vm.runtime.extensionStorage["8to16mesh"].variables = Object.fromEntries(
      Object.entries(getMeshVars()).filter((v) => v[0] !== name)
    );
    vm.extensionManager.refreshBlocks();
  };

  // Handle messages on the broadcastchannel
  bc.onmessage = async ({ data }) => {
    switch (data.type) {
      case "broadcast": {
        let hats = vm.runtime.startHats("eightxtwoMesh_when", {
          BROADCAST: data.name,
        });
        // broadcast and wait handling
        if (data.willWait) {
          await new Promise((resolve) => {
            const poll = () => {
              if (
                hats.filter((thread) => vm.runtime.threads.includes(thread))
                  .length === 0
              )
                resolve();
              else setTimeout(poll, 5);
            };
            poll();
          });
          bc.postMessage({ type: "done", name: data.name });
        }
        break;
      }
      case "var": {
        vm.runtime.extensionStorage["8to16mesh"].variables[data.key] =
          data.value;
        break;
      }
      case "done": {
        ++finishedWaits[data.name];
        break;
      }
      case "ping": {
        connectedUsers = 0;
        bc.postMessage({ type: "pong" });
        break;
      }
      case "pong": {
        connectedUsers += 1;
        break;
      }
    }
  };
  setTimeout(() => bc.postMessage({ type: "ping" }), 50);

  class Mesh {
    getMeshagesForMenu() {
      const meshages = getMeshages().sort();
      return meshages.length === 0 ? [""] : meshages;
    }
    getMeshVarsForMenu() {
      const meshvars = Object.keys(getMeshVars()).sort();
      return meshvars.length === 0 ? [""] : meshvars;
    }
    newMsg() {
      // taken from SharkPool/Camera
      // in a Button Context, ScratchBlocks always exists
      ScratchBlocks.prompt(
        Scratch.translate("New message name:"),
        "",
        addMeshage,
        Scratch.translate("Mesh Manager"),
        "broadcast_msg"
      );
    }
    removeMsg() {
      // taken from SharkPool/Camera
      // in a Button Context, ScratchBlocks always exists
      ScratchBlocks.prompt(
        Scratch.translate("Remove message named:"),
        "",
        delMeshage,
        Scratch.translate("Mesh Manager"),
        "broadcast_msg"
      );
    }
    newVar() {
      // taken from SharkPool/Camera
      // in a Button Context, ScratchBlocks always exists
      ScratchBlocks.prompt(
        Scratch.translate(
          "New variable name (this variable will be available to all sprites):"
        ),
        "",
        addMeshVar,
        Scratch.translate("Mesh Manager"),
        "broadcast_msg"
      );
    }
    removeVar() {
      // taken from SharkPool/Camera
      // in a Button Context, ScratchBlocks always exists
      ScratchBlocks.prompt(
        Scratch.translate("Remove variable named:"),
        "",
        delMeshVar,
        Scratch.translate("Mesh Manager"),
        "broadcast_msg"
      );
    }
    getInfo() {
      return {
        id: "eightxtwoMesh",
        name: Scratch.translate("Mesh"),
        docsURI: "https://extensions.turbowarp.org/8to16/mesh",
        color1: "#4cdab2",
        color2: "#44cda5",
        color3: "#3dc099",
        blocks: [
          {
            func: "newMsg",
            blockType: Scratch.BlockType.BUTTON,
            text: Scratch.translate("Make a Message"),
          },
          {
            func: "removeMsg",
            blockType: Scratch.BlockType.BUTTON,
            text: Scratch.translate("Remove a Message"),
            hideFromPalette: getMeshages().length === 0,
          },
          {
            opcode: "when",
            blockType: Scratch.BlockType.EVENT,
            text: Scratch.translate("when I receive [BROADCAST]"),
            isEdgeActivated: false,
            hideFromPalette: getMeshages().length === 0,
            arguments: {
              BROADCAST: {
                type: Scratch.ArgumentType.STRING,
                menu: "MESHES_NOACCEPT",
              },
            },
          },
          {
            opcode: "broadcast",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("broadcast [BROADCAST]"),
            hideFromPalette: getMeshages().length === 0,
            arguments: {
              BROADCAST: {
                type: Scratch.ArgumentType.STRING,
                menu: "MESHES_ACCEPT",
              },
            },
          },
          {
            opcode: "broadcastWait",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("broadcast [BROADCAST] and wait"),
            hideFromPalette: getMeshages().length === 0,
            arguments: {
              BROADCAST: {
                type: Scratch.ArgumentType.STRING,
                menu: "MESHES_ACCEPT",
              },
            },
          },
          ...(getMeshages().length === 0 ? [] : ["---"]),
          {
            func: "newVar",
            blockType: Scratch.BlockType.BUTTON,
            text: Scratch.translate("Make a Variable"),
          },
          {
            func: "removeVar",
            blockType: Scratch.BlockType.BUTTON,
            text: Scratch.translate("Remove a Variable"),
            hideFromPalette: Object.keys(getMeshVars()).length === 0,
          },
          {
            opcode: "getVar",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("get [VAR]"),
            arguments: {
              VAR: {
                type: Scratch.ArgumentType.STRING,
                menu: "VARS",
              },
            },
            hideFromPalette: Object.keys(getMeshVars()).length === 0,
          },
          {
            opcode: "setVar",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set [VAR] to [VALUE]"),
            arguments: {
              VAR: {
                type: Scratch.ArgumentType.STRING,
                menu: "VARS",
              },
              VALUE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
            },
            hideFromPalette: Object.keys(getMeshVars()).length === 0,
          },
          {
            opcode: "changeVar",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("change [VAR] by [VALUE]"),
            arguments: {
              VAR: {
                type: Scratch.ArgumentType.STRING,
                menu: "VARS",
              },
              VALUE: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "1",
              },
            },
            hideFromPalette: Object.keys(getMeshVars()).length === 0,
          },
        ],
        menus: {
          MESHES_ACCEPT: {
            acceptReporters: true,
            items: "getMeshagesForMenu",
          },
          MESHES_NOACCEPT: {
            acceptReporters: false,
            items: "getMeshagesForMenu",
          },
          VARS: {
            acceptReporters: true,
            items: "getMeshVarsForMenu",
          },
        },
      };
    }

    broadcast({ BROADCAST }) {
      vm.runtime.startHats("eightxtwoMesh_when", { BROADCAST });
      bc.postMessage({
        type: "broadcast",
        name: BROADCAST,
        willWait: false,
      });
    }
    async broadcastWait({ BROADCAST }) {
      finishedWaits[BROADCAST] = 0;
      vm.runtime.startHats("eightxtwoMesh_when", { BROADCAST }); // TODO: add wait here
      bc.postMessage({
        type: "broadcast",
        name: BROADCAST,
        willWait: true,
      });
      await new Promise((resolve) => {
        const poll = () => {
          if (finishedWaits[BROADCAST] >= connectedUsers) resolve();
          else setTimeout(poll, 25);
        };
        poll();
      });
      delete finishedWaits[BROADCAST];
    }

    getVar({ VAR }) {
      return vm.runtime.extensionStorage["8to16mesh"].variables[VAR];
    }
    setVar({ VAR, VALUE }) {
      vm.runtime.extensionStorage["8to16mesh"].variables[VAR] = VALUE;
      bc.postMessage({
        type: "var",
        key: VAR,
        value: VALUE,
      });
    }
    changeVar({ VAR, VALUE }) {
      vm.runtime.extensionStorage["8to16mesh"].variables[VAR] +=
        Scratch.Cast.toNumber(VALUE);
      bc.postMessage({
        type: "var",
        key: VAR,
        value: vm.runtime.extensionStorage["8to16mesh"].variables[VAR],
      });
    }
  }

  Scratch.extensions.register(new Mesh());
})(Scratch);
