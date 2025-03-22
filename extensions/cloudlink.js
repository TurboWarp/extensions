// Name: CloudLink V4
// ID: cloudlink
// Description: A powerful WebSocket extension for Scratch.
// By: MikeDEV
// License: MIT

(function (Scratch) {
  /*
  CloudLink Extension for TurboWarp v0.1.2.

  This extension should be fully compatible with projects developed using
  extensions S4.1, S4.0, and B3.0.

  Server versions supported via backward compatibility:
  - CL3 0.1.5 (was called S2.2)
  - CL3 0.1.7
  - CL4 0.1.8.x
  - CL4 0.1.9.x
  - CL4 0.2.0 (latest)

  MIT License
  Copyright 2023 Mike J. Renaker / "MikeDEV".
  Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"),
  to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense,
  and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF 
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
  FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
  WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

  */

  // Require extension to be unsandboxed.
  "use strict";
  if (!Scratch.extensions.unsandboxed) {
    throw new Error("The CloudLink extension must run unsandboxed.");
  }

  // Declare icons as static SVG URIs
  const cl_icon =
    "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIyMjUuMzU0OCIgaGVpZ2h0PSIyMjUuMzU0OCIgdmlld0JveD0iMCwwLDIyNS4zNTQ4LDIyNS4zNTQ4Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTI3LjMyMjYsLTY3LjMyMjYpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0xMjcuMzIyNiwxODBjMCwtNjIuMjMwMDEgNTAuNDQ3MzksLTExMi42Nzc0IDExMi42Nzc0LC0xMTIuNjc3NGM2Mi4yMzAwMSwwIDExMi42Nzc0LDUwLjQ0NzM5IDExMi42Nzc0LDExMi42Nzc0YzAsNjIuMjMwMDEgLTUwLjQ0NzM5LDExMi42Nzc0IC0xMTIuNjc3NCwxMTIuNjc3NGMtNjIuMjMwMDEsMCAtMTEyLjY3NzQsLTUwLjQ0NzM5IC0xMTIuNjc3NCwtMTEyLjY3NzR6IiBmaWxsPSIjMDBjMjhjIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZS13aWR0aD0iMCIvPjxnIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLXdpZHRoPSIxIj48cGF0aCBkPSJNMjg2LjEyMDM3LDE1MC41NTc5NWMyMy4yNDA4NiwwIDQyLjA3ODksMTguODM5NDYgNDIuMDc4OSw0Mi4wNzg5YzAsMjMuMjM5NDQgLTE4LjgzODAzLDQyLjA3ODkgLTQyLjA3ODksNDIuMDc4OWgtOTIuMjQwNzRjLTIzLjI0MDg2LDAgLTQyLjA3ODksLTE4LjgzOTQ2IC00Mi4wNzg5LC00Mi4wNzg5YzAsLTIzLjIzOTQ0IDE4LjgzODAzLC00Mi4wNzg5IDQyLjA3ODksLTQyLjA3ODloNC4xODg4N2MxLjgxMTUzLC0yMS41NzA1NSAxOS44OTM1NywtMzguNTEyODkgNDEuOTMxNSwtMzguNTEyODljMjIuMDM3OTMsMCA0MC4xMTk5NywxNi45NDIzNCA0MS45MzE1LDM4LjUxMjg5eiIgZmlsbD0iI2ZmZmZmZiIvPjxwYXRoIGQ9Ik0yODkuMDg2NTUsMjEwLjM0MTE0djkuMDQ2NjdoLTI2LjkxNjYzaC05LjA0NjY3di05LjA0NjY3di01NC41MDMzOWg5LjA0NjY3djU0LjUwMzM5eiIgZmlsbD0iIzAwYzI4YyIvPjxwYXRoIGQ9Ik0yMjIuNDA5MjUsMjE5LjM4NzgxYy04LjM1MzIsMCAtMTYuMzY0MzEsLTMuMzE4MzQgLTIyLjI3MDksLTkuMjI0OTJjLTUuOTA2NjEsLTUuOTA2NTggLTkuMjI0OTEsLTEzLjkxNzY4IC05LjIyNDkxLC0yMi4yNzA4OWMwLC04LjM1MzIgMy4zMTgyOSwtMTYuMzY0MzEgOS4yMjQ5MSwtMjIuMjcwOWM1LjkwNjU5LC01LjkwNjYxIDEzLjkxNzcsLTkuMjI0OTEgMjIuMjcwOSwtOS4yMjQ5MWgyMS4xMDg5djguOTM0OThoLTIxLjEwODl2MC4xMDI1N2MtNS45NTYyOCwwIC0xMS42Njg2NCwyLjM2NjE2IC0xNS44ODAzNyw2LjU3Nzg5Yy00LjIxMTczLDQuMjExNzMgLTYuNTc3ODksOS45MjQwOCAtNi41Nzc4OSwxNS44ODAzN2MwLDUuOTU2MjggMi4zNjYxNiwxMS42Njg2NCA2LjU3Nzg5LDE1Ljg4MDM3YzQuMjExNzMsNC4yMTE3MyA5LjkyNDA4LDYuNTc3OTMgMTUuODgwMzcsNi41Nzc5M3YwLjEwMjUzaDIxLjEwODl2OC45MzQ5OHoiIGZpbGw9IiMwMGMyOGMiLz48L2c+PC9nPjwvZz48L3N2Zz48IS0tcm90YXRpb25DZW50ZXI6MTEyLjY3NzQwNDA4NDA4MzkyOjExMi42Nzc0MDQwODQwODQwMy0tPg==";
  const cl_block =
    "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxNzYuMzk4NTQiIGhlaWdodD0iMTIyLjY3MDY5IiB2aWV3Qm94PSIwLDAsMTc2LjM5ODU0LDEyMi42NzA2OSI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE1MS44MDA3MywtMTE4LjY2NDY2KSI+PGcgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aXNQYWludGluZ0xheWVyJnF1b3Q7OnRydWV9IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PGc+PHBhdGggZD0iTTI4Ni4xMjAzNywxNTcuMTc3NTVjMjMuMjQwODYsMCA0Mi4wNzg5LDE4LjgzOTQ2IDQyLjA3ODksNDIuMDc4OWMwLDIzLjIzOTQ0IC0xOC44MzgwMyw0Mi4wNzg5IC00Mi4wNzg5LDQyLjA3ODloLTkyLjI0MDc0Yy0yMy4yNDA4NiwwIC00Mi4wNzg5LC0xOC44Mzk0NiAtNDIuMDc4OSwtNDIuMDc4OWMwLC0yMy4yMzk0NCAxOC44MzgwMywtNDIuMDc4OSA0Mi4wNzg5LC00Mi4wNzg5aDQuMTg4ODdjMS44MTE1MywtMjEuNTcwNTUgMTkuODkzNTcsLTM4LjUxMjg5IDQxLjkzMTUsLTM4LjUxMjg5YzIyLjAzNzkzLDAgNDAuMTE5OTcsMTYuOTQyMzQgNDEuOTMxNSwzOC41MTI4OXoiIGZpbGw9IiNmZmZmZmYiLz48cGF0aCBkPSJNMjg5LjA4NjU1LDIxNi45NjA3NHY5LjA0NjY3aC0yNi45MTY2M2gtOS4wNDY2N3YtOS4wNDY2N3YtNTQuNTAzMzloOS4wNDY2N3Y1NC41MDMzOXoiIGZpbGw9IiMwMGMyOGMiLz48cGF0aCBkPSJNMjIyLjQwOTI1LDIyNi4wMDc0MWMtOC4zNTMyLDAgLTE2LjM2NDMxLC0zLjMxODM0IC0yMi4yNzA5LC05LjIyNDkyYy01LjkwNjYxLC01LjkwNjU4IC05LjIyNDkxLC0xMy45MTc2OCAtOS4yMjQ5MSwtMjIuMjcwODljMCwtOC4zNTMyIDMuMzE4MjksLTE2LjM2NDMxIDkuMjI0OTEsLTIyLjI3MDljNS45MDY1OSwtNS45MDY2MSAxMy45MTc3LC05LjIyNDkxIDIyLjI3MDksLTkuMjI0OTFoMjEuMTA4OXY4LjkzNDk4aC0yMS4xMDg5djAuMTAyNTdjLTUuOTU2MjgsMCAtMTEuNjY4NjQsMi4zNjYxNiAtMTUuODgwMzcsNi41Nzc4OWMtNC4yMTE3Myw0LjIxMTczIC02LjU3Nzg5LDkuOTI0MDggLTYuNTc3ODksMTUuODgwMzdjMCw1Ljk1NjI4IDIuMzY2MTYsMTEuNjY4NjQgNi41Nzc4OSwxNS44ODAzN2M0LjIxMTczLDQuMjExNzMgOS45MjQwOCw2LjU3NzkzIDE1Ljg4MDM3LDYuNTc3OTN2MC4xMDI1M2gyMS4xMDg5djguOTM0OTh6IiBmaWxsPSIjMDBjMjhjIi8+PC9nPjwvZz48L2c+PC9zdmc+PCEtLXJvdGF0aW9uQ2VudGVyOjg4LjE5OTI2OTk5OTk5OTk4OjYxLjMzNTM0NDk5OTk5OTk5LS0+";

  // Declare VM
  const vm = Scratch.vm;
  const runtime = vm.runtime;

  /*
  This versioning system is intended for future use with CloudLink.

  When the client sends the handshake request, it will provide the server with the following details:
  {
    "cmd": "handshake",
    "val": {
      "language": "Scratch",
      "version": {
        "editorType": String,
        "fullString": String
      }
    }
  }

  version.editorType - Provides info regarding the Scratch IDE this Extension variant natively supports. Intended for server-side version identification.
  version.versionNumber - Numerical version info. Increment by 1 every Semantic Versioning Patch. Intended for server-side version identification.
  version.versionString - Semantic Versioning string. Intended for source-code versioning only.

  The extension will auto-generate a version string by using generateVersionString().
  */
  const version = {
    editorType: "TurboWarp",
    versionNumber: 2,
    versionString: "0.1.3", // Styling/Parity and Translation Strings Update
  };

  // Store extension state
  var clVars = {
    // Editor-specific variable for hiding old, legacy-support blocks.
    hideCLDeprecatedBlocks: true,

    // WebSocket object.
    socket: null,

    // Disable nags about old servers.
    currentServerUrl: "",
    lastServerUrl: "",

    // gmsg.queue - An array of all currently queued gmsg values.
    // gmsg.varState - The value of the most recently received gmsg message.
    // gmsg.hasNew - Returns true if a new gmsg value has been received.
    gmsg: {
      queue: [],
      varState: "",
      hasNew: false,
      eventHatTick: false,
    },

    // pmsg.queue - An array of all currently queued pmsg values.
    // pmsg.varState - The value of the most recently received pmsg message.
    // pmsg.hasNew - Returns true if a new pmsg value has been received.
    pmsg: {
      queue: [],
      varState: "",
      hasNew: false,
      eventHatTick: false,
    },

    // gvar.queue - An array of all currently queued gvar values.
    // gvar.varStates - A dictionary storing each gvar variable.
    gvar: {
      queue: [],
      varStates: {},
      eventHatTick: false,
    },

    // pvar.queue - An array of all currently queued pvar values.
    // pvar.varStates - A dictionary storing each pvar variable.
    pvar: {
      queue: [],
      varStates: {},
      eventHatTick: false,
    },

    // direct.queue - An array of all currently queued direct values.
    // direct.varState - The value of the most recently received direct message.
    // direct.hasNew - Returns true if a new direct value has been received.
    direct: {
      queue: [],
      varState: "",
      hasNew: false,
      eventHatTick: false,
    },

    // statuscode.queue - An array of all currently queued statuscode values.
    // statuscode.varState - The value of the most recently received statuscode message.
    // statuscode.hasNew - Returns true if a new statuscode value has been received.
    statuscode: {
      queue: [],
      varState: "",
      hasNew: false,
      eventHatTick: false,
    },

    // ulist stores all currently connected client objects in the server/all subscribed room(s).
    ulist: [],

    // Message-Of-The-Day
    motd: "",

    // Client IP address
    client_ip: "",

    // Server version string
    server_version: "",

    // listeners.enablerState - Set to true when "createListener" is used.
    // listeners.enablerValue - Set to a new listener ID when "createListener" is used.
    // listeners.current - Keeps track of all current listener IDs being awaited.
    // listeners.varStates - Storage for all successfully awaited messages from specific listener IDs.
    listeners: {
      enablerState: false,
      enablerValue: "",
      current: [],
      varStates: {},
    },

    // rooms.enablerState - Set to true when "selectRoomsInNextPacket" is used.
    // rooms.enablerValue - Set to a new list of rooms when "selectRoomsInNextPacket" is used.
    // rooms.current - Keeps track of all current rooms being used.
    // rooms.varStates - Storage for all per-room messages.
    // rooms.isLinked - Set to true when a room link request is successful. False when unlinked.
    // rooms.isAttemptingLink - Set to true when running "linkToRooms()".
    // rooms.isAttemptingUnlink - Set to true when running "unlinkFromRooms()".
    rooms: {
      enablerState: false,
      enablerValue: "",
      isLinked: false,
      isAttemptingLink: false,
      isAttemptingUnlink: false,
      current: [],
      varStates: {},
    },

    // Username state
    username: {
      attempted: false,
      accepted: false,
      temp: "",
      value: "",
    },

    // Store user_obj messages.
    myUserObject: {},

    /* 
    linkState.status - Current state of the connection.
      0 - Ready
      1 - Connecting
      2 - Connected
      3 - Disconnected, gracefully (OK)
      4 - Disconnected, abruptly (Connection failed / dropped)
    
    linkState.isAttemptingGracefulDisconnect - Boolean used to ignore websocket codes when disconnecting.

    linkstate.disconnectType - Type of disconnect that has occurred.
      0 - Safely disconnected (connected OK and gracefully disconnected)
      1 - Connection dropped (connected OK but lost connection afterwards)
      2 - Connection failed (attempted connection but did not succeed)
    
    linkstate.identifiedProtocol - Enables backwards compatibility for CL servers.
      0 - CL3 0.1.5 "S2.2" - Doesn't support listeners, MOTD, or statuscodes.
      1 - CL3 0.1.7 - Doesn't support listeners, has early MOTD support, and early statuscode support.
      2 - CL4 0.1.8.x - First version to support listeners, and modern server_version support. First version to implement rooms support.
      3 - CL4 0.1.9.x - First version to implement the handshake command and better ulist events.
      4 - CL4 0.2.0 - Latest version. First version to implement client_obj and enhanced ulists.
    */
    linkState: {
      status: 0,
      isAttemptingGracefulDisconnect: false,
      disconnectType: 0,
      identifiedProtocol: 0,
    },

    // Timeout of 500ms upon connection to try and handshake. Automatically aborted if server_version is received within that timespan.
    handshakeTimeout: null,

    // Prevent accidentally sending the handshake command more than once per connection.
    handshakeAttempted: false,

    // Storage for the publically available CloudLink instances.
    serverList: {
      0: {
        id: "Localhost",
        url: "ws://127.0.0.1:3000/",
      },
      7: {
        id: "MikeDEV's Spare CL 0.2.0 Server",
        url: "wss://cl.mikedev101.cc/",
      },
    },
  };

  function generateVersionString() {
    return `${version.editorType} ${version.versionString}`;
  }

  // Makes values safe for Scratch to represent.
  // eslint-disable-next-line require-await
  async function makeValueScratchSafe(data) {
    if (typeof data == "object") {
      try {
        return JSON.stringify(data);
      } catch (SyntaxError) {
        return String(data);
      }
    } else {
      return String(data);
    }
  }

  // Clears out and resets the various values of clVars upon disconnect.
  function resetOnClose() {
    window.clearTimeout(clVars.handshakeTimeout);
    clVars.handshakeAttempted = false;
    clVars.socket = null;
    clVars.motd = "";
    clVars.client_ip = "";
    clVars.server_version = "";
    clVars.linkState.identifiedProtocol = 0;
    clVars.linkState.isAttemptingGracefulDisconnect = false;
    clVars.myUserObject = {};
    clVars.gmsg = {
      queue: [],
      varState: "",
      hasNew: false,
      eventHatTick: false,
    };
    clVars.pmsg = {
      queue: [],
      varState: "",
      hasNew: false,
      eventHatTick: false,
    };
    clVars.gvar = {
      queue: [],
      varStates: {},
      eventHatTick: false,
    };
    clVars.pvar = {
      queue: [],
      varStates: {},
      eventHatTick: false,
    };
    clVars.direct = {
      queue: [],
      varState: "",
      hasNew: false,
      eventHatTick: false,
    };
    clVars.statuscode = {
      queue: [],
      varState: "",
      hasNew: false,
      eventHatTick: false,
    };
    clVars.ulist = [];
    clVars.listeners = {
      enablerState: false,
      enablerValue: "",
      current: [],
      varStates: {},
    };
    clVars.rooms = {
      enablerState: false,
      enablerValue: "",
      isLinked: false,
      isAttemptingLink: false,
      isAttemptingUnlink: false,
      current: [],
      varStates: {},
    };
    clVars.username = {
      attempted: false,
      accepted: false,
      temp: "",
      value: "",
    };
  }

  // CL-specific netcode needed for sending messages
  function sendMessage(message) {
    // Prevent running this while disconnected
    if (clVars.socket == null) {
      console.warn(
        "[CloudLink] Ignoring attempt to send a packet while disconnected."
      );
      return;
    }

    // See if the outgoing val argument can be converted into JSON
    if (Object.prototype.hasOwnProperty.call(message, "val")) {
      try {
        message.val = JSON.parse(message.val);
      } catch {}
    }

    // Attach listeners
    if (clVars.listeners.enablerState) {
      // 0.1.8.x was the first server version to support listeners.
      if (clVars.linkState.identifiedProtocol >= 2) {
        message.listener = clVars.listeners.enablerValue;

        // Create listener
        clVars.listeners.varStates[String(args.ID)] = {
          hasNew: false,
          varState: {},
          eventHatTick: false,
        };
      } else {
        console.warn(
          "[CloudLink] Server is too old! Must be at least 0.1.8.x to support listeners."
        );
      }
      clVars.listeners.enablerState = false;
    }

    // Check if server supports rooms
    if (
      (message.cmd == "link" || message.cmd == "unlink") &&
      clVars.linkState.identifiedProtocol < 2
    ) {
      // 0.1.8.x was the first server version to support rooms.
      console.warn(
        "[CloudLink] Server is too old! Must be at least 0.1.8.x to support room linking/unlinking."
      );
      return;
    }

    // Convert the outgoing message to JSON
    let outgoing = "";
    try {
      outgoing = JSON.stringify(message);
    } catch (SyntaxError) {
      console.warn(
        "[CloudLink] Failed to send a packet, invalid syntax:",
        message
      );
      return;
    }

    // Send the message
    console.log("[CloudLink] TX:", message);
    clVars.socket.send(outgoing);
  }

  // Only sends the handshake command.
  function sendHandshake() {
    if (clVars.handshakeAttempted) return;
    console.log("[CloudLink] Sending handshake...");
    sendMessage({
      cmd: "handshake",
      val: {
        language: "Scratch",
        version: {
          editorType: version.editorType,
          versionNumber: version.versionNumber,
        },
      },
      listener: "handshake_cfg",
    });
    clVars.handshakeAttempted = true;
  }

  // Compare the version string of the server to known compatible variants to configure clVars.linkState.identifiedProtocol.
  // eslint-disable-next-line require-await
  async function setServerVersion(version) {
    console.log(`[CloudLink] Server version: ${String(version)}`);
    clVars.server_version = version;

    // Auto-detect versions
    const versions = {
      "0.2.": 4,
      "0.1.9": 3,
      "0.1.8": 2,
      "0.1.7": 1,
      "0.1.5": 0,
      "S2.2": 0, // 0.1.5
      "0.1.": 0, // 0.1.5 or legacy
      "S2.": 0, // Legacy
      "S1.": -1, // Obsolete
    };

    for (const [key, value] of Object.entries(versions)) {
      if (version.includes(key)) {
        if (clVars.linkState.identifiedProtocol < value) {
          // Disconnect if protcol is too old
          if (value == -1) {
            console.warn(
              `[CloudLink] Server is too old to enable leagacy support. Disconnecting.`
            );
            return clVars.socket.close(1000, "");
          }

          // Set the identified protocol variant
          clVars.linkState.identifiedProtocol = value;
        }
      }
    }

    // Log configured spec version
    console.log(
      `[CloudLink] Configured protocol spec to v${clVars.linkState.identifiedProtocol}.`
    );

    // Fix timing bug
    clVars.linkState.status = 2;

    // Fire event hats (only one not broken)
    runtime.startHats("cloudlink_onConnect");

    // Don't nag user if they already trusted this server
    if (clVars.currentServerUrl === clVars.lastServerUrl) return;

    // Ask user if they wish to stay connected if the server is unsupported
    if (
      clVars.linkState.identifiedProtocol < 4 &&
      !confirm(
        `You have connected to an old CloudLink server, running version ${clVars.server_version}.\n\nFor your security and privacy, we recommend you disconnect from this server and connect to an up-to-date server.\n\nClick/tap "OK" to stay connected.`
      )
    ) {
      // Close the connection if they choose "Cancel"
      clVars.linkState.isAttemptingGracefulDisconnect = true;
      clVars.socket.close(
        1000,
        "Client going away (legacy server rejected by end user)"
      );
      return;
    }

    // Don't nag user the next time they connect to this server
    clVars.lastServerUrl = clVars.currentServerUrl;
  }

  // CL-specific netcode needed to make the extension work
  async function handleMessage(data) {
    // Parse the message JSON
    let packet = {};
    try {
      packet = JSON.parse(data);
    } catch (SyntaxError) {
      console.error(
        "[CloudLink] Incoming message parse failure! Is this really a CloudLink server?",
        data
      );
      return;
    }

    // Handle packet commands
    if (!Object.prototype.hasOwnProperty.call(packet, "cmd")) {
      console.error(
        '[CloudLink] Incoming message read failure! This message doesn\'t contain the required "cmd" key. Is this really a CloudLink server?',
        packet
      );
      return;
    }
    console.log("[CloudLink] RX:", packet);
    switch (packet.cmd) {
      case "gmsg":
        clVars.gmsg.varState = packet.val;
        clVars.gmsg.hasNew = true;
        clVars.gmsg.queue.push(packet);
        clVars.gmsg.eventHatTick = true;
        break;

      case "pmsg":
        clVars.pmsg.varState = packet.val;
        clVars.pmsg.hasNew = true;
        clVars.pmsg.queue.push(packet);
        clVars.pmsg.eventHatTick = true;
        break;

      case "gvar":
        clVars.gvar.varStates[String(packet.name)] = {
          hasNew: true,
          varState: packet.val,
          eventHatTick: true,
        };
        clVars.gvar.queue.push(packet);
        clVars.gvar.eventHatTick = true;
        break;

      case "pvar":
        clVars.pvar.varStates[String(packet.name)] = {
          hasNew: true,
          varState: packet.val,
          eventHatTick: true,
        };
        clVars.pvar.queue.push(packet);
        clVars.pvar.eventHatTick = true;
        break;

      case "direct":
        // Handle events from older server versions
        if (Object.prototype.hasOwnProperty.call(packet.val, "cmd")) {
          switch (packet.val.cmd) {
            // Server 0.1.5 (at least)
            case "vers":
              window.clearTimeout(clVars.handshakeTimeout);
              await setServerVersion(packet.val.val);
              return;

            // Server 0.1.7 (at least)
            case "motd":
              console.log(
                `[CloudLink] Message of the day: "${packet.val.val}"`
              );
              clVars.motd = packet.val.val;
              return;
          }
        }

        // Store direct value
        clVars.direct.varState = packet.val;
        clVars.direct.hasNew = true;
        clVars.direct.queue.push(packet);
        clVars.direct.eventHatTick = true;
        break;

      case "client_obj":
        console.log("[CloudLink] Client object for this session:", packet.val);
        clVars.myUserObject = packet.val;
        break;

      case "statuscode":
        // Store direct value
        // Protocol v0 (0.1.5 and legacy) don't implement status codes.
        if (clVars.linkState.identifiedProtocol == 0) {
          console.warn(
            "[CloudLink] Received a statuscode message while using protocol v0. This event shouldn't happen. It's likely that this server is modified (did MikeDEV overlook some unexpected behavior?)."
          );
          return;
        }

        // Protocol v1 (0.1.7) uses "val" to represent the code.
        else if (clVars.linkState.identifiedProtocol == 1) {
          clVars.statuscode.varState = packet.val;
        }

        // Protocol v2 (0.1.8.x) uses "code" instead.
        // Protocol v3-v4 (0.1.9.x - latest, 0.2.0) adds "code_id" to the payload. Ignored by Scratch clients.
        else {
          // Handle setup listeners
          if (Object.prototype.hasOwnProperty.call(packet, "listener")) {
            switch (packet.listener) {
              case "username_cfg":
                // Username accepted
                if (packet.code.includes("I:100")) {
                  clVars.myUserObject = packet.val;
                  clVars.username.value = packet.val.username;
                  clVars.username.accepted = true;
                  console.log(
                    `[CloudLink] Username has been set to "${clVars.username.value}" successfully!`
                  );

                  // Username rejected / error
                } else {
                  console.log(
                    `[CloudLink] Username rejected by the server! Error code ${packet.code}.}`
                  );
                }
                return;

              case "handshake_cfg":
                // Prevent handshake responses being stored in the statuscode variables
                console.log("[CloudLink] Server responded to our handshake!");
                return;

              case "link":
                // Room link accepted
                if (!clVars.rooms.isAttemptingLink) return;
                if (packet.code.includes("I:100")) {
                  clVars.rooms.isAttemptingLink = false;
                  clVars.rooms.isLinked = true;
                  console.log("[CloudLink] Room linked successfully!");

                  // Room link rejected / error
                } else {
                  console.log(
                    `[CloudLink] Room link rejected! Error code ${packet.code}.}`
                  );
                }
                return;

              case "unlink":
                // Room unlink accepted
                if (!clVars.rooms.isAttemptingUnlink) return;
                if (packet.code.includes("I:100")) {
                  clVars.rooms.isAttemptingUnlink = false;
                  clVars.rooms.isLinked = false;
                  console.log("[CloudLink] Room unlinked successfully!");

                  // Room link rejected / error
                } else {
                  console.log(
                    `[CloudLink] Room unlink rejected! Error code ${packet.code}.}`
                  );
                }
                return;
            }
          }

          // Update state
          clVars.statuscode.varState = packet.code;
        }

        // Update state
        clVars.statuscode.hasNew = true;
        clVars.statuscode.queue.push(packet);
        clVars.statuscode.eventHatTick = true;
        break;

      case "ulist":
        // Protocol v0-v1 (0.1.5 and legacy - 0.1.7) use a semicolon (;) separated string for the userlist.
        if (
          clVars.linkState.identifiedProtocol == 0 ||
          clVars.linkState.identifiedProtocol == 1
        ) {
          // Split the username list string
          clVars.ulist = String(packet.val).split(";");

          // Get rid of blank entry at the end of the list
          clVars.ulist.pop();

          // Check if username has been set (since older servers don't implement statuscodes or listeners)
          if (
            clVars.username.attempted &&
            clVars.ulist.includes(clVars.username.temp)
          ) {
            clVars.username.value = clVars.username.temp;
            clVars.username.accepted = true;
            console.log(
              `[CloudLink] Username has been set to "${clVars.username.value}" successfully!`
            );
          }
        }

        // Protocol v2 (0.1.8.x) uses a list of objects w/ "username" and "id" instead.
        else if (clVars.linkState.identifiedProtocol == 2) {
          clVars.ulist = packet.val;
        }

        // Protocol v3-v4 (0.1.9.x - latest, 0.2.0) uses "mode" to add/set/remove entries to the userlist.
        else {
          // Check for "mode" key
          if (!Object.prototype.hasOwnProperty.call(packet, "mode")) {
            console.warn(
              '[CloudLink] Userlist message did not specify "mode" while running in protocol mode 3 or 4.'
            );
            return;
          }
          // Handle methods
          switch (packet.mode) {
            case "set":
              clVars.ulist = packet.val;
              break;
            case "add":
              clVars.ulist.push(packet.val);
              break;
            case "remove":
              clVars.ulist.slice(clVars.ulist.indexOf(packet.val), 1);
              break;
            default:
              console.warn(
                `[CloudLink] Unrecognised userlist mode: "${packet.mode}".`
              );
              break;
          }
        }

        console.log("[CloudLink] Updating userlist:", clVars.ulist);
        break;

      case "server_version":
        window.clearTimeout(clVars.handshakeTimeout);
        await setServerVersion(packet.val);
        break;

      case "client_ip":
        console.log(`[CloudLink] Client IP address: ${packet.val}`);
        console.warn(
          "[CloudLink] This server has relayed your identified IP address to you. Under normal circumstances, this will be erased server-side when you disconnect, but you should still be careful. Unless you trust this server, it is not recommended to send login credentials or personal info."
        );
        clVars.client_ip = packet.val;
        break;

      case "motd":
        console.log(`[CloudLink] Message of the day: "${packet.val}"`);
        clVars.motd = packet.val;
        break;

      default:
        console.warn(`[CloudLink] Unrecognised command: "${packet.cmd}".`);
        return;
    }

    // Handle listeners
    if (Object.prototype.hasOwnProperty.call(packet, "listener")) {
      if (clVars.listeners.current.includes(String(packet.listener))) {
        // Remove the listener from the currently listening list
        clVars.listeners.current.splice(
          clVars.listeners.current.indexOf(String(packet.listener)),
          1
        );

        // Update listener states
        clVars.listeners.varStates[String(packet.listener)] = {
          hasNew: true,
          varState: packet,
          eventHatTick: true,
        };
      }
    }
  }

  // Basic netcode needed to make the extension work
  async function newClient(url) {
    if (!(await Scratch.canFetch(url))) {
      console.warn(
        "[CloudLink] Did not get permission to connect, aborting..."
      );
      return;
    }

    // Set the link state to connecting
    clVars.linkState.status = 1;
    clVars.linkState.disconnectType = 0;

    // Establish a connection to the server
    console.log("[CloudLink] Connecting to server:", url);
    try {
      // eslint-disable-next-line extension/check-can-fetch
      clVars.socket = new WebSocket(url);
    } catch (e) {
      console.warn("[CloudLink] An exception has occurred:", e);
      return;
    }

    // Bind connection established event
    clVars.socket.onopen = function (event) {
      clVars.currentServerUrl = url;

      // Set the link state to connected.
      console.log("[CloudLink] Connected.");

      // If a server_version message hasn't been received in over half a second, try to broadcast a handshake
      clVars.handshakeTimeout = window.setTimeout(function () {
        console.log(
          "[CloudLink] Hmm... This server hasn't sent us it's server info. Going to attempt a handshake."
        );
        sendHandshake();
      }, 500);

      // Return promise (during setup)
      return;
    };

    // Bind message handler event
    clVars.socket.onmessage = function (event) {
      handleMessage(event.data);
    };

    // Bind connection closed event
    clVars.socket.onclose = function (event) {
      switch (clVars.linkState.status) {
        case 1: // Was connecting
          // Set the link state to ungraceful disconnect.
          console.log(`[CloudLink] Connection failed (${event.code}).`);
          clVars.linkState.status = 4;
          clVars.linkState.disconnectType = 1;
          break;

        case 2: // Was already connected
          if (
            event.wasClean ||
            clVars.linkState.isAttemptingGracefulDisconnect
          ) {
            // Set the link state to graceful disconnect.
            console.log(
              `[CloudLink] Disconnected (${event.code} ${event.reason}).`
            );
            clVars.linkState.status = 3;
            clVars.linkState.disconnectType = 0;
          } else {
            // Set the link state to ungraceful disconnect.
            console.log(
              `[CloudLink] Lost connection (${event.code} ${event.reason}).`
            );
            clVars.linkState.status = 4;
            clVars.linkState.disconnectType = 2;
          }
          break;
      }

      // Reset clVars values
      resetOnClose();

      // Run all onClose event blocks
      runtime.startHats("cloudlink_onClose");
      // Return promise (during setup)
      return;
    };
  }

  // Declare the CloudLink library.
  class CloudLink {
    getInfo() {
      return {
        id: "cloudlink",
        // eslint-disable-next-line extension/should-translate
        name: "CloudLink V4",
        blockIconURI: cl_block,
        menuIconURI: cl_icon,
        docsURI: "https://github.com/MikeDev101/cloudlink/wiki/Scratch-Client",
        blocks: [
          {
            opcode: "returnGlobalData",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("global data"),
          },

          {
            opcode: "returnPrivateData",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("private data"),
          },

          {
            opcode: "returnDirectData",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("direct data"),
          },

          "---",

          {
            opcode: "returnLinkData",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("link status"),
          },

          {
            opcode: "returnStatusCode",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("status code"),
          },

          "---",

          {
            opcode: "returnUserListData",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("usernames"),
          },

          {
            opcode: "returnUsernameDataNew",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("my username"),
          },

          {
            opcode: "returnUsernameData",
            blockType: Scratch.BlockType.REPORTER,
            hideFromPalette: clVars.hideCLDeprecatedBlocks,
            text: Scratch.translate(
              "(OLD - DO NOT USE IN NEW PROJECTS) my username"
            ),
          },

          "---",

          {
            opcode: "returnVersionData",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("extension version"),
          },

          {
            opcode: "returnServerVersion",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("server version"),
          },

          {
            opcode: "returnServerList",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("server list"),
          },

          {
            opcode: "returnMOTD",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("server MOTD"),
          },

          "---",

          {
            opcode: "returnClientIP",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("my IP address"),
          },

          {
            opcode: "returnUserObject",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("my user object"),
          },

          "---",

          {
            opcode: "returnListenerData",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("response for listener [ID]"),
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "example-listener",
              },
            },
          },

          {
            opcode: "readQueueSize",
            blockType: Scratch.BlockType.REPORTER,
            hideFromPalette: clVars.hideCLDeprecatedBlocks,
            text: Scratch.translate("size of queue for [TYPE]"),
            arguments: {
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "allmenu",
                defaultValue: "All data",
              },
            },
          },

          {
            opcode: "readQueueData",
            blockType: Scratch.BlockType.REPORTER,
            hideFromPalette: clVars.hideCLDeprecatedBlocks,
            text: Scratch.translate("packet queue for [TYPE]"),
            arguments: {
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "allmenu",
                defaultValue: "All data",
              },
            },
          },

          "---",

          {
            opcode: "returnVarData",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("[TYPE] [VAR] data"),
            arguments: {
              VAR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("Apple"),
              },
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "varmenu",
                defaultValue: "Global variables",
              },
            },
          },

          "---",

          {
            opcode: "parseJSON",
            blockType: Scratch.BlockType.REPORTER,
            hideFromPalette: clVars.hideCLDeprecatedBlocks,
            text: Scratch.translate("[PATH] of [JSON_STRING]"),
            arguments: {
              PATH: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "fruit/apples",
              },
              JSON_STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue:
                  '{"fruit": {"apples": 2, "bananas": 3}, "total_fruit": 5}',
              },
            },
          },

          {
            opcode: "getFromJSONArray",
            blockType: Scratch.BlockType.REPORTER,
            hideFromPalette: clVars.hideCLDeprecatedBlocks,
            text: Scratch.translate("[NUM] from JSON array [ARRAY]"),
            arguments: {
              NUM: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              ARRAY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '["foo","bar"]',
              },
            },
          },

          {
            opcode: "makeJSON",
            blockType: Scratch.BlockType.REPORTER,
            hideFromPalette: clVars.hideCLDeprecatedBlocks,
            text: Scratch.translate("convert [toBeJSONified] to JSON"),
            arguments: {
              toBeJSONified: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '{"test": true}',
              },
            },
          },

          {
            opcode: "isValidJSON",
            blockType: Scratch.BlockType.BOOLEAN,
            hideFromPalette: clVars.hideCLDeprecatedBlocks,
            text: Scratch.translate("is [JSON_STRING] valid JSON?"),
            arguments: {
              JSON_STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue:
                  '{"fruit": {"apples": 2, "bananas": 3}, "total_fruit": 5}',
              },
            },
          },

          "---",

          {
            opcode: "fetchURL",
            blockType: Scratch.BlockType.REPORTER,
            hideFromPalette: clVars.hideCLDeprecatedBlocks,
            text: Scratch.translate("fetch data from URL [url]"),
            arguments: {
              url: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "https://extensions.turbowarp.org/hello.txt",
              },
            },
          },

          {
            opcode: "requestURL",
            blockType: Scratch.BlockType.REPORTER,
            hideFromPalette: clVars.hideCLDeprecatedBlocks,
            text: Scratch.translate(
              "send request with method [method] for URL [url] with data [data] and headers [headers]"
            ),
            arguments: {
              method: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "GET",
              },
              url: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "https://extensions.turbowarp.org/hello.txt",
              },
              data: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "{}",
              },
              headers: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "{}",
              },
            },
          },

          "---",

          {
            opcode: "onConnect",
            blockType: Scratch.BlockType.EVENT,
            text: Scratch.translate("when connected"),
            isEdgeActivated: false, // Gets called by runtime.startHats
          },

          {
            opcode: "onClose",
            blockType: Scratch.BlockType.EVENT,
            text: Scratch.translate("when disconnected"),
            isEdgeActivated: false, // Gets called by runtime.startHats
          },

          "---",

          {
            opcode: "onListener",
            blockType: Scratch.BlockType.HAT,
            text: Scratch.translate(
              "when I receive new message with listener [ID]"
            ),
            isEdgeActivated: true,
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "example-listener",
              },
            },
          },

          {
            opcode: "onNewPacket",
            blockType: Scratch.BlockType.HAT,
            text: Scratch.translate("when I receive new [TYPE] message"),
            isEdgeActivated: true,
            arguments: {
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "almostallmenu",
                defaultValue: "Global data",
              },
            },
          },

          {
            opcode: "onNewVar",
            blockType: Scratch.BlockType.HAT,
            text: Scratch.translate("When I receive new [TYPE] data for [VAR]"),
            isEdgeActivated: true,
            arguments: {
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "varmenu",
                defaultValue: "Global variables",
              },
              VAR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("Apple"),
              },
            },
          },

          "---",

          {
            opcode: "getComState",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("connected?"),
          },

          {
            opcode: "getRoomState",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("linked to rooms?"),
          },

          {
            opcode: "getComLostConnectionState",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("lost connection?"),
          },

          {
            opcode: "getComFailedConnectionState",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("failed to connnect?"),
          },

          {
            opcode: "getUsernameState",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("username synced?"),
          },

          {
            opcode: "returnIsNewData",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("got new [TYPE]?"),
            arguments: {
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "datamenu",
                defaultValue: "Global data",
              },
            },
          },

          {
            opcode: "returnIsNewVarData",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("got new [TYPE] data for variable [VAR]?"),
            arguments: {
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "varmenu",
                defaultValue: "Global variables",
              },
              VAR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("Apple"),
              },
            },
          },

          {
            opcode: "returnIsNewListener",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("got new packet with listener [ID]?"),
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "example-listener",
              },
            },
          },

          {
            opcode: "checkForID",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("ID [ID] connected?"),
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("Another name"),
              },
            },
          },

          "---",

          {
            opcode: "openSocket",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("connect to [IP]"),
            arguments: {
              IP: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "ws://127.0.0.1:3000/",
              },
            },
          },

          {
            opcode: "openSocketPublicServers",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("connect to server [ID]"),
            arguments: {
              ID: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
            },
          },

          {
            opcode: "closeSocket",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("disconnect"),
          },

          "---",

          {
            opcode: "setMyName",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set [NAME] as username"),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("A name"),
              },
            },
          },

          "---",

          {
            opcode: "createListener",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("attach listener [ID] to next packet"),
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "example-listener",
              },
            },
          },

          "---",

          {
            opcode: "linkToRooms",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("link to room(s) [ROOMS]"),
            arguments: {
              ROOMS: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate('["test"]'),
              },
            },
          },

          {
            opcode: "selectRoomsInNextPacket",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("select room(s) [ROOMS] for next packet"),
            arguments: {
              ROOMS: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate('["test"]'),
              },
            },
          },

          {
            opcode: "unlinkFromRooms",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("unlink from all rooms"),
          },

          "---",

          {
            opcode: "sendGData",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("send [DATA]"),
            arguments: {
              DATA: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("Apple"),
              },
            },
          },

          {
            opcode: "sendPData",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("send [DATA] to [ID]"),
            arguments: {
              DATA: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("Apple"),
              },
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("Another name"),
              },
            },
          },

          {
            opcode: "sendGDataAsVar",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("send variable [VAR] with data [DATA]"),
            arguments: {
              DATA: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("Banana"),
              },
              VAR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("Apple"),
              },
            },
          },

          {
            opcode: "sendPDataAsVar",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "send variable [VAR] to [ID] with data [DATA]"
            ),
            arguments: {
              DATA: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("Banana"),
              },
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("Another name"),
              },
              VAR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("Apple"),
              },
            },
          },

          "---",

          {
            opcode: "runCMDnoID",
            blockType: Scratch.BlockType.COMMAND,
            hideFromPalette: clVars.hideCLDeprecatedBlocks,
            text: Scratch.translate("send command without ID [CMD] [DATA]"),
            arguments: {
              CMD: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("direct"),
              },
              DATA: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("val"),
              },
            },
          },

          {
            opcode: "runCMD",
            blockType: Scratch.BlockType.COMMAND,
            hideFromPalette: clVars.hideCLDeprecatedBlocks,
            text: Scratch.translate("send command [CMD] [ID] [DATA]"),
            arguments: {
              CMD: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("direct"),
              },
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("id"),
              },
              DATA: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("val"),
              },
            },
          },

          "---",

          {
            opcode: "resetNewData",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("reset got new [TYPE] status"),
            arguments: {
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "datamenu",
                defaultValue: "Global data",
              },
            },
          },

          {
            opcode: "resetNewVarData",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("reset got new [TYPE] [VAR] status"),
            arguments: {
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "varmenu",
                defaultValue: "Global variables",
              },
              VAR: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("Apple"),
              },
            },
          },

          "---",

          {
            opcode: "resetNewListener",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("reset got new [ID] listener status"),
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "example-listener",
              },
            },
          },

          "---",

          {
            opcode: "clearAllPackets",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("clear all packets for [TYPE]"),
            arguments: {
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "allmenu",
                defaultValue: "All data",
              },
            },
          },

          "---",

          {
            func: "showOldBlocks",
            blockType: Scratch.BlockType.BUTTON,
            text: Scratch.translate("Show old blocks"),
            hideFromPalette: !clVars.hideCLDeprecatedBlocks,
          },

          {
            func: "hideOldBlocks",
            blockType: Scratch.BlockType.BUTTON,
            text: Scratch.translate("Hide old blocks"),
            hideFromPalette: clVars.hideCLDeprecatedBlocks,
          },

          "---",
        ],
        menus: {
          datamenu: {
            items: [
              { text: Scratch.translate("Global data"), value: "Global data" },
              {
                text: Scratch.translate("Private data"),
                value: "Private data",
              },
              { text: Scratch.translate("Direct data"), value: "Direct data" },
              { text: Scratch.translate("Status code"), value: "Status code" },
            ],
          },
          varmenu: {
            items: [
              {
                text: Scratch.translate("Global variables"),
                value: "Global variables",
              },
              {
                text: Scratch.translate("Private variables"),
                value: "Private variables",
              },
            ],
          },
          allmenu: {
            items: [
              { text: Scratch.translate("Global data"), value: "Global data" },
              {
                text: Scratch.translate("Private data"),
                value: "Private data",
              },
              { text: Scratch.translate("Direct data"), value: "Direct data" },
              { text: Scratch.translate("Status code"), value: "Status code" },
              {
                text: Scratch.translate("Global variables"),
                value: "Global variables",
              },
              {
                text: Scratch.translate("Private variables"),
                value: "Private variables",
              },
              { text: Scratch.translate("All data"), value: "All data" },
            ],
          },
          almostallmenu: {
            items: [
              { text: Scratch.translate("Global data"), value: "Global data" },
              {
                text: Scratch.translate("Private data"),
                value: "Private data",
              },
              { text: Scratch.translate("Direct data"), value: "Direct data" },
              { text: Scratch.translate("Status code"), value: "Status code" },
              {
                text: Scratch.translate("Global variables"),
                value: "Global variables",
              },
              {
                text: Scratch.translate("Private variables"),
                value: "Private variables",
              },
            ],
          },
        },
      };
    }

    // Credit to LilyMakesThings' "Lily's toolbox" for this feature.
    showOldBlocks() {
      if (
        confirm(
          "Do you want to display old blocks?\n\nThese blocks are not recommended for use in newer CloudLink projects as they are deprecated or have better implementation in other extensions."
        )
      ) {
        clVars.hideCLDeprecatedBlocks = false;
        vm.extensionManager.refreshBlocks();
      }
    }

    // Credit to LilyMakesThings' "Lily's toolbox" for this feature.
    hideOldBlocks() {
      clVars.hideCLDeprecatedBlocks = true;
      vm.extensionManager.refreshBlocks();
    }

    // Reporter - Returns gmsg values.
    returnGlobalData() {
      return makeValueScratchSafe(clVars.gmsg.varState);
    }

    // Reporter - Returns pmsg values.
    returnPrivateData() {
      return makeValueScratchSafe(clVars.pmsg.varState);
    }

    // Reporter - Returns direct values.
    returnDirectData() {
      return makeValueScratchSafe(clVars.direct.varState);
    }

    // Reporter - Returns current link state.
    returnLinkData() {
      return makeValueScratchSafe(clVars.linkState.status);
    }

    // Reporer - Returns status code values.
    returnStatusCode() {
      return makeValueScratchSafe(clVars.statuscode.varState);
    }

    // Reporter - Returns ulist value.
    returnUserListData() {
      return makeValueScratchSafe(clVars.ulist);
    }

    // Reporter - Returns currently set username.
    returnUsernameDataNew() {
      return makeValueScratchSafe(clVars.username.value);
    }

    // Reporter - (OLD) Returns currently set username (returns user object to retain compatibility with old projects).
    returnUsernameData() {
      return makeValueScratchSafe(clVars.myUserObject);
    }

    // Reporter - Returns the reported user object of the client (Snowflake ID, UUID, Username) - Intended replacement for the old username reporter block.
    returnUserObject() {
      return makeValueScratchSafe(clVars.myUserObject);
    }

    // Reporter - Returns current client version.
    returnVersionData() {
      return generateVersionString();
    }

    // Reporter - Returns reported server version.
    returnServerVersion() {
      return makeValueScratchSafe(clVars.server_version);
    }

    // Reporter - Returns the serverlist value.
    returnServerList() {
      return makeValueScratchSafe(clVars.serverList);
    }

    // Reporter - Returns the reported Message-Of-The-Day.
    returnMOTD() {
      return makeValueScratchSafe(clVars.motd);
    }

    // Reporter - Returns the reported IP address of the client.
    returnClientIP() {
      return makeValueScratchSafe(clVars.client_ip);
    }

    // Reporter - Returns data for a specific listener ID.
    // ID - String (listener ID)
    returnListenerData(args) {
      if (!Object.prototype.hasOwnProperty.call(clVars.listeners.varStates, String(args.ID))) {
        console.warn(`[CloudLink] Listener ID ${args.ID} does not exist!`);
        return "";
      }
      return clVars.listeners.varStates[String(args.ID)].varState;
    }

    // Reporter - Returns the size of the message queue.
    // TYPE - String (menu allmenu)
    readQueueSize(args) {
      switch (args.TYPE) {
        case "Global data":
          return clVars.gmsg.queue.length;
        case "Private data":
          return clVars.pmsg.queue.length;
        case "Direct data":
          return clVars.direct.queue.length;
        case "Status code":
          return clVars.statuscode.queue.length;
        case "Global variables":
          return clVars.gvar.queue.length;
        case "Private variables":
          return clVars.pvar.queue.length;
        case "All data":
          return (
            clVars.gmsg.queue.length +
            clVars.pmsg.queue.length +
            clVars.direct.queue.length +
            clVars.statuscode.queue.length +
            clVars.gvar.queue.length +
            clVars.pvar.queue.length
          );
      }
    }

    // Reporter - Returns all values of the message queue.
    // TYPE - String (menu allmenu)
    readQueueData(args) {
      switch (args.TYPE) {
        case "Global data":
          return makeValueScratchSafe(clVars.gmsg.queue);
        case "Private data":
          return makeValueScratchSafe(clVars.pmsg.queue);
        case "Direct data":
          return makeValueScratchSafe(clVars.direct.queue);
        case "Status code":
          return makeValueScratchSafe(clVars.statuscode.queue);
        case "Global variables":
          return makeValueScratchSafe(clVars.gvar.queue);
        case "Private variables":
          return makeValueScratchSafe(clVars.pvar.queue);
        case "All data":
          return makeValueScratchSafe({
            gmsg: clVars.gmsg.queue,
            pmsg: clVars.pmsg.queue,
            direct: clVars.direct.queue,
            statuscode: clVars.statuscode.queue,
            gvar: clVars.gvar.queue,
            pvar: clVars.pvar.queue,
          });
      }
    }

    // Reporter - Returns a gvar/pvar value.
    // TYPE - String (menu varmenu), VAR - String (variable name)
    returnVarData(args) {
      switch (args.TYPE) {
        case "Global variables":
          if (!Object.prototype.hasOwnProperty.call(clVars.gvar.varStates, String(args.VAR))) {
            console.warn(
              `[CloudLink] Global variable ${args.VAR} does not exist!`
            );
            return "";
          }
          return clVars.gvar.varStates[String(args.VAR)].varState;
        case "Private variables":
          if (!Object.prototype.hasOwnProperty.call(clVars.pvar.varStates, String(args.VAR))) {
            console.warn(
              `[CloudLink] Private variable ${args.VAR} does not exist!`
            );
            return "";
          }
          return clVars.pvar.varStates[String(args.VAR)].varState;
      }
    }

    // Reporter - Gets a JSON key value from a JSON string.
    // PATH - String, JSON_STRING - String
    parseJSON(args) {
      try {
        const path = args.PATH.toString()
          .split("/")
          .map((prop) => decodeURIComponent(prop));
        if (path[0] === "") path.splice(0, 1);
        if (path[path.length - 1] === "") path.splice(-1, 1);
        let json;
        try {
          json = JSON.parse(" " + args.JSON_STRING);
        } catch (e) {
          return e.message;
        }
        path.forEach((prop) => (json = json[prop]));
        if (json === null) return "null";
        else if (json === undefined) return "";
        else if (typeof json === "object") return JSON.stringify(json);
        else return json.toString();
      } catch (err) {
        return "";
      }
    }

    // Reporter - Returns an entry from a JSON array (0-based).
    // NUM - Number, ARRAY - String (JSON Array)
    getFromJSONArray(args) {
      var json_array = JSON.parse(args.ARRAY);
      if (json_array[args.NUM] == "undefined") {
        return "";
      } else {
        let data = json_array[args.NUM];

        if (typeof data == "object") {
          data = JSON.stringify(data); // Make the JSON safe for Scratch
        }

        return data;
      }
    }

    // Reporter - Returns a RESTful GET promise.
    // url - String
    fetchURL(args) {
      return Scratch.fetch(args.url, { method: "GET" })
        .then((response) => response.text())
        .catch((error) => {
          console.warn(`[CloudLink] Fetch error: ${error}`);
        });
    }

    // Reporter - Returns a RESTful request promise.
    // url - String, method - String, data - String, headers - String
    requestURL(args) {
      if (args.method == "GET" || args.method == "HEAD") {
        return Scratch.fetch(args.url, {
          method: args.method,
          headers: JSON.parse(args.headers),
        })
          .then((response) => response.text())
          .catch((error) => {
            console.warn(`[CloudLink] Request error: ${error}`);
          });
      } else {
        return Scratch.fetch(args.url, {
          method: args.method,
          headers: JSON.parse(args.headers),
          body: JSON.parse(args.data),
        })
          .then((response) => response.text())
          .catch((error) => {
            console.warn(`[CloudLink] Request error: ${error}`);
          });
      }
    }

    // Event
    // ID - String (listener)
    onListener(args) {
      // Must be connected
      if (clVars.socket == null) return false;
      if (clVars.linkState.status != 2) return false;

      // Listener must exist
      if (!Object.prototype.hasOwnProperty.call(clVars.listeners.varStates, args.ID)) return false;

      // Run event
      if (clVars.listeners.varStates[args.ID].eventHatTick) {
        clVars.listeners.varStates[args.ID].eventHatTick = false;
        return true;
      }
      return false;
    }

    // Event
    // TYPE - String (menu almostallmenu)
    onNewPacket(args) {
      // Must be connected
      if (clVars.socket == null) return false;
      if (clVars.linkState.status != 2) return false;

      // Run event
      switch (args.TYPE) {
        case "Global data":
          if (clVars.gmsg.eventHatTick) {
            clVars.gmsg.eventHatTick = false;
            return true;
          }
          break;

        case "Private data":
          if (clVars.pmsg.eventHatTick) {
            clVars.pmsg.eventHatTick = false;
            return true;
          }
          break;

        case "Direct data":
          if (clVars.direct.eventHatTick) {
            clVars.direct.eventHatTick = false;
            return true;
          }
          break;

        case "Status code":
          if (clVars.statuscode.eventHatTick) {
            clVars.statuscode.eventHatTick = false;
            return true;
          }
          break;

        case "Global variables":
          if (clVars.gvar.eventHatTick) {
            clVars.gvar.eventHatTick = false;
            return true;
          }
          break;

        case "Private variables":
          if (clVars.pvar.eventHatTick) {
            clVars.pvar.eventHatTick = false;
            return true;
          }
          break;
      }
      return false;
    }

    // Event
    // TYPE - String (varmenu), VAR - String (variable name)
    onNewVar(args) {
      // Must be connected
      if (clVars.socket == null) return false;
      if (clVars.linkState.status != 2) return false;

      // Run event
      switch (args.TYPE) {
        case "Global variables":
          // Variable must exist
          if (!Object.prototype.hasOwnProperty.call(clVars.gvar.varStates, String(args.VAR))) break;
          if (clVars.gvar.varStates[String(args.VAR)].eventHatTick) {
            clVars.gvar.varStates[String(args.VAR)].eventHatTick = false;
            return true;
          }

          break;

        case "Private variables":
          // Variable must exist
          if (!Object.prototype.hasOwnProperty.call(clVars.pvar.varStates, String(args.VAR))) break;
          if (clVars.pvar.varStates[String(args.VAR)].eventHatTick) {
            clVars.pvar.varStates[String(args.VAR)].eventHatTick = false;
            return true;
          }

          break;
      }
      return false;
    }

    // Reporter - Returns a JSON-ified value.
    // toBeJSONified - String
    makeJSON(args) {
      if (typeof args.toBeJSONified == "string") {
        try {
          JSON.parse(args.toBeJSONified);
          return String(args.toBeJSONified);
        } catch (err) {
          return "Not JSON!";
        }
      } else if (typeof args.toBeJSONified == "object") {
        return JSON.stringify(args.toBeJSONified);
      } else {
        return "Not JSON!";
      }
    }

    // Boolean - Returns true if connected.
    getComState() {
      return clVars.linkState.status == 2 && clVars.socket != null;
    }

    // Boolean - Returns true if linked to rooms (other than "default")
    getRoomState() {
      return clVars.socket != null && clVars.rooms.isLinked;
    }

    // Boolean - Returns true if the connection was dropped.
    getComLostConnectionState() {
      return (
        clVars.linkState.status == 4 && clVars.linkState.disconnectType == 2
      );
    }

    // Boolean - Returns true if the client failed to establish a connection.
    getComFailedConnectionState() {
      return (
        clVars.linkState.status == 4 && clVars.linkState.disconnectType == 1
      );
    }

    // Boolean - Returns true if the username was set successfully.
    getUsernameState() {
      return clVars.socket != null && clVars.username.accepted;
    }

    // Boolean - Returns true if there is new gmsg/pmsg/direct/statuscode data.
    // TYPE - String (menu datamenu)
    returnIsNewData(args) {
      // Must be connected
      if (clVars.socket == null) return false;

      // Run event
      switch (args.TYPE) {
        case "Global data":
          return clVars.gmsg.hasNew;
        case "Private data":
          return clVars.pmsg.hasNew;
        case "Direct data":
          return clVars.direct.hasNew;
        case "Status code":
          return clVars.statuscode.hasNew;
      }
    }

    // Boolean - Returns true if there is new gvar/pvar data.
    // TYPE - String (menu varmenu), VAR - String (variable name)
    returnIsNewVarData(args) {
      switch (args.TYPE) {
        case "Global variables":
          if (!Object.prototype.hasOwnProperty.call(clVars.gvar.varStates, String(args.VAR))) {
            console.warn(
              `[CloudLink] Global variable ${args.VAR} does not exist!`
            );
            return false;
          }
          return clVars.gvar.varStates[String(args.ID)].hasNew;
        case "Private variables":
          if (!Object.prototype.hasOwnProperty.call(clVars.pvar.varStates, String(args.VAR))) {
            console.warn(
              `[CloudLink] Private variable ${args.VAR} does not exist!`
            );
            return false;
          }
          return clVars.pvar.varStates[String(args.ID)].hasNew;
      }
    }

    // Boolean - Returns true if a listener has a new value.
    // ID - String (listener ID)
    returnIsNewListener(args) {
      if (!Object.prototype.hasOwnProperty.call(clVars.listeners.varStates, String(args.ID))) {
        console.warn(`[CloudLink] Listener ID ${args.ID} does not exist!`);
        return false;
      }
      return clVars.listeners.varStates[String(args.ID)].hasNew;
    }

    // Boolean - Returns true if a username/ID/UUID/object exists in the userlist.
    // ID - String (username or user object)
    checkForID(args) {
      // Legacy ulist handling
      if (clVars.ulist.includes(args.ID)) return true;

      // New ulist handling
      if (clVars.linkState.identifiedProtocol > 2) {
        if (this.isValidJSON(args.ID)) {
          return clVars.ulist.some(
            (o) =>
              o.username === JSON.parse(args.ID).username &&
              o.id == JSON.parse(args.ID).id
          );
        } else {
          return clVars.ulist.some(
            (o) => o.username === String(args.ID) || o.id == args.ID
          );
        }
      } else return false;
    }

    // Boolean - Returns true if the input JSON is valid.
    // JSON_STRING - String
    isValidJSON(args) {
      try {
        JSON.parse(args.JSON_STRING);
        return true;
      } catch {
        return false;
      }
    }

    // Command - Establishes a connection to a server.
    // IP - String (websocket URL)
    openSocket(args) {
      if (clVars.socket != null) {
        console.warn("[CloudLink] Already connected to a server.");
        return;
      }
      return newClient(args.IP);
    }

    // Command - Establishes a connection to a selected server.
    // ID - Number (server entry #)
    openSocketPublicServers(args) {
      if (clVars.socket != null) {
        console.warn("[CloudLink] Already connected to a server.");
        return;
      }
      if (!Object.prototype.hasOwnProperty.call(clVars.serverList, String(args.ID))) {
        console.warn("[CloudLink] Not a valid server ID!");
        return;
      }
      return newClient(clVars.serverList[String(args.ID)]["url"]);
    }

    // Command - Closes the connection.
    closeSocket() {
      if (clVars.socket == null) {
        console.warn("[CloudLink] Already disconnected.");
        return;
      }
      console.log("[CloudLink] Disconnecting...");
      clVars.linkState.isAttemptingGracefulDisconnect = true;
      clVars.socket.close(1000, "Client going away");
    }

    // Command - Sets the username of the client on the server.
    // NAME - String
    setMyName(args) {
      // Must be connected to set a username.
      if (clVars.socket == null) return;

      // Prevent running if an attempt is currently processing.
      if (clVars.username.attempted) {
        console.warn("[CloudLink] Already attempting to set username!");
        return;
      }

      // Prevent running if the username is already set.
      if (clVars.username.accepted) {
        console.warn("[CloudLink] Already set username!");
        return;
      }

      // Update state
      clVars.username.attempted = true;
      clVars.username.temp = args.NAME;

      // Send the command
      sendMessage({ cmd: "setid", val: args.NAME, listener: "username_cfg" });
    }

    // Command - Prepares the next transmitted message to have a listener ID attached to it.
    // ID - String (listener ID)
    createListener(args) {
      // Must be connected to set a username.
      if (clVars.socket == null) return;

      // Require server support
      if (clVars.linkState.identifiedProtocol < 2) {
        console.warn(
          "[CloudLink] Server is too old! Must be at least 0.1.8.x to support listeners."
        );
        return;
      }

      // Prevent running if the username hasn't been set.
      if (!clVars.username.accepted) {
        console.warn(
          "[CloudLink] Username must be set before creating a listener!"
        );
        return;
      }

      // Must be used once per packet
      if (clVars.listeners.enablerState) {
        console.warn("[CloudLink] Cannot create multiple listeners at a time!");
        return;
      }

      // Update state
      clVars.listeners.enablerState = true;
      clVars.listeners.enablerValue = args.ID;
    }

    // Command - Subscribes to various rooms on a server.
    // ROOMS - String (JSON Array or single string)
    linkToRooms(args) {
      // Must be connected to set a username.
      if (clVars.socket == null) return;

      // Require server support
      if (clVars.linkState.identifiedProtocol < 2) {
        console.warn(
          "[CloudLink] Server is too old! Must be at least 0.1.8.x to support rooms."
        );
        return;
      }

      // Prevent running if the username hasn't been set.
      if (!clVars.username.accepted) {
        console.warn(
          "[CloudLink] Username must be set before linking to rooms!"
        );
        return;
      }

      // Prevent running if already linked.
      if (clVars.rooms.isLinked) {
        console.warn("[CloudLink] Already linked to rooms!");
        return;
      }

      // Prevent running if a room link is in progress.
      if (clVars.rooms.isAttemptingLink) {
        console.warn("[CloudLink] Currently linking to rooms! Please wait!");
        return;
      }

      clVars.rooms.isAttemptingLink = true;
      sendMessage({ cmd: "link", val: args.ROOMS, listener: "link" });
    }

    // Command - Specifies specific subscribed rooms to transmit messages to.
    // ROOMS - String (JSON Array or single string)
    selectRoomsInNextPacket(args) {
      // Must be connected to user rooms.
      if (clVars.socket == null) return;

      // Require server support
      if (clVars.linkState.identifiedProtocol < 2) {
        console.warn(
          "[CloudLink] Server is too old! Must be at least 0.1.8.x to support rooms."
        );
        return;
      }

      // Prevent running if the username hasn't been set.
      if (!clVars.username.accepted) {
        console.warn(
          "[CloudLink] Username must be set before selecting rooms!"
        );
        return;
      }

      // Require once per packet
      if (clVars.rooms.enablerState) {
        console.warn(
          "[CloudLink] Cannot use the room selector more than once at a time!"
        );
        return;
      }

      // Prevent running if not linked.
      if (!clVars.rooms.isLinked) {
        console.warn(
          "[CloudLink] Cannot use room selector while not linked to rooms!"
        );
        return;
      }

      clVars.rooms.enablerState = true;
      clVars.rooms.enablerValue = args.ROOMS;
    }

    // Command - Unsubscribes from all rooms and re-subscribes to the the "default" room on the server.
    unlinkFromRooms() {
      // Must be connected to user rooms.
      if (clVars.socket == null) return;

      // Require server support
      if (clVars.linkState.identifiedProtocol < 2) {
        console.warn(
          "[CloudLink] Server is too old! Must be at least 0.1.8.x to support rooms."
        );
        return;
      }

      // Prevent running if the username hasn't been set.
      if (!clVars.username.accepted) {
        console.warn(
          "[CloudLink] Username must be set before unjoining rooms!"
        );
        return;
      }

      // Prevent running if already unlinked.
      if (!clVars.rooms.isLinked) {
        console.warn("[CloudLink] Already unlinked from rooms!");
        return;
      }

      // Prevent running if a room unlink is in progress.
      if (clVars.rooms.isAttemptingUnlink) {
        console.warn(
          "[CloudLink] Currently unlinking from rooms! Please wait!"
        );
        return;
      }

      clVars.rooms.isAttemptingUnlink = true;
      sendMessage({ cmd: "unlink", val: "", listener: "unlink" });
    }

    // Command - Sends a gmsg value.
    // DATA - String
    sendGData(args) {
      // Must be connected.
      if (clVars.socket == null) return;

      sendMessage({ cmd: "gmsg", val: args.DATA });
    }

    // Command - Sends a pmsg value.
    // DATA - String, ID - String (recipient ID)
    sendPData(args) {
      // Must be connected.
      if (clVars.socket == null) return;

      // Prevent running if the username hasn't been set.
      if (!clVars.username.accepted) {
        console.warn(
          "[CloudLink] Username must be set before sending private messages!"
        );
        return;
      }

      sendMessage({ cmd: "pmsg", val: args.DATA, id: args.ID });
    }

    // Command - Sends a gvar value.
    // DATA - String, VAR - String (variable name)
    sendGDataAsVar(args) {
      // Must be connected.
      if (clVars.socket == null) return;

      sendMessage({ cmd: "gvar", val: args.DATA, name: args.VAR });
    }

    // Command - Sends a pvar value.
    // DATA - String, VAR - String (variable name), ID - String (recipient ID)
    sendPDataAsVar(args) {
      // Must be connected.
      if (clVars.socket == null) return;

      // Prevent running if the username hasn't been set.
      if (!clVars.username.accepted) {
        console.warn(
          "[CloudLink] Username must be set before sending private variables!"
        );
        return;
      }

      sendMessage({ cmd: "pvar", val: args.DATA, name: args.VAR, id: args.ID });
    }

    // Command - Sends a raw-format command without specifying an ID.
    // CMD - String (command), DATA - String
    runCMDnoID(args) {
      // Must be connected.
      if (clVars.socket == null) return;

      sendMessage({ cmd: args.CMD, val: args.DATA });
    }

    // Command - Sends a raw-format command with an ID.
    // CMD - String (command), DATA - String, ID - String (recipient ID)
    runCMD(args) {
      // Must be connected.
      if (clVars.socket == null) return;

      // Prevent running if the username hasn't been set.
      if (!clVars.username.accepted) {
        console.warn(
          "[CloudLink] Username must be set before using this command!"
        );
        return;
      }

      sendMessage({ cmd: args.CMD, val: args.DATA, id: args.ID });
    }

    // Command - Resets the "returnIsNewData" boolean state.
    // TYPE - String (menu datamenu)
    resetNewData(args) {
      switch (args.TYPE) {
        case "Global data":
          clVars.gmsg.hasNew = false;
          break;
        case "Private data":
          clVars.pmsg.hasNew = false;
          break;
        case "Direct data":
          clVars.direct.hasNew = false;
          break;
        case "Status code":
          clVars.statuscode.hasNew = false;
          break;
      }
    }

    // Command - Resets the "returnIsNewVarData" boolean state.
    // TYPE - String (menu varmenu), VAR - String (variable name)
    resetNewVarData(args) {
      switch (args.TYPE) {
        case "Global variables":
          if (!Object.prototype.hasOwnProperty.call(clVars.gvar.varStates, String(args.VAR))) {
            console.warn(
              `[CloudLink] Global variable ${args.VAR} does not exist!`
            );
            return;
          }
          clVars.gvar.varStates[String(args.ID)].hasNew = false;
        case "Private variables":
          if (!Object.prototype.hasOwnProperty.call(clVars.pvar.varStates, String(args.VAR))) {
            console.warn(
              `[CloudLink] Private variable ${args.VAR} does not exist!`
            );
            return false;
          }
          clVars.pvar.varStates[String(args.ID)].hasNew = false;
      }
    }

    // Command - Resets the "returnIsNewListener" boolean state.
    // ID - Listener ID
    resetNewListener(args) {
      if (!Object.prototype.hasOwnProperty.call(clVars.listeners.varStates, String(args.ID))) {
        console.warn(`[CloudLink] Listener ID ${args.ID} does not exist!`);
        return;
      }
      clVars.listeners.varStates[String(args.ID)].hasNew = false;
    }

    // Command - Clears all packet queues.
    // TYPE - String (menu allmenu)
    clearAllPackets(args) {
      switch (args.TYPE) {
        case "Global data":
          clVars.gmsg.queue = [];
          break;
        case "Private data":
          clVars.pmsg.queue = [];
          break;
        case "Direct data":
          clVars.direct.queue = [];
          break;
        case "Status code":
          clVars.statuscode.queue = [];
          break;
        case "Global variables":
          clVars.gvar.queue = [];
          break;
        case "Private variables":
          clVars.pvar.queue = [];
          break;
        case "All data":
          clVars.gmsg.queue = [];
          clVars.pmsg.queue = [];
          clVars.direct.queue = [];
          clVars.statuscode.queue = [];
          clVars.gvar.queue = [];
          clVars.pvar.queue = [];
          break;
      }
    }
  }
  Scratch.extensions.register(new CloudLink());
})(Scratch);
