// Name: Cloudlink
// ID: cloudlink
// Description: Powerful WebSocket extension for Scratch 3.
// By: MikeDEV

// Copy of S4-0_nosuite.js as of 10/31/2022
/* eslint-disable */

(function (Scratch) {
  var servers = {}; // Server list
  let mWS = null;

  // Get the server URL list
  try {
    Scratch.fetch(
      "https://raw.githubusercontent.com/MikeDev101/cloudlink/master/serverlist.json"
    )
      .then((response) => {
        return response.text();
      })
      .then((data) => {
        servers = JSON.parse(data);
      })
      .catch((err) => {
        console.log(err);
        servers = {};
      });
  } catch (err) {
    console.log(err);
    servers = {};
  }

  function find_id(ID, ulist) {
    // Thanks StackOverflow!
    if (jsonCheck(ID) && !intCheck(ID)) {
      return ulist.some(
        (o) =>
          o.username === JSON.parse(ID).username && o.id == JSON.parse(ID).id
      );
    } else {
      return ulist.some((o) => o.username === String(ID) || o.id == ID);
    }
  }

  function jsonCheck(JSON_STRING) {
    try {
      JSON.parse(JSON_STRING);
      return true;
    } catch (err) {
      return false;
    }
  }

  function intCheck(value) {
    return !isNaN(value);
  }

  function autoConvert(value) {
    // Check if the value is JSON / Dict first
    try {
      JSON.parse(value);
      return JSON.parse(value);
    } catch (err) {}

    // Check if the value is an array
    try {
      tmp = value;
      tmp = tmp.replace(/'/g, '"');
      JSON.parse(tmp);
      return JSON.parse(tmp);
    } catch (err) {}

    // Check if an int/float
    if (!isNaN(value)) {
      return Number(value);
    }

    // Leave as the original value if none of the above work
    return value;
  }

  class CloudLink {
    constructor(runtime, extensionId) {
      // Extension stuff
      this.runtime = runtime;
      this.cl_icon =
        "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIyMjUuMzU0OCIgaGVpZ2h0PSIyMjUuMzU0OCIgdmlld0JveD0iMCwwLDIyNS4zNTQ4LDIyNS4zNTQ4Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTI3LjMyMjYsLTY3LjMyMjYpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0xMjcuMzIyNiwxODBjMCwtNjIuMjMwMDEgNTAuNDQ3MzksLTExMi42Nzc0IDExMi42Nzc0LC0xMTIuNjc3NGM2Mi4yMzAwMSwwIDExMi42Nzc0LDUwLjQ0NzM5IDExMi42Nzc0LDExMi42Nzc0YzAsNjIuMjMwMDEgLTUwLjQ0NzM5LDExMi42Nzc0IC0xMTIuNjc3NCwxMTIuNjc3NGMtNjIuMjMwMDEsMCAtMTEyLjY3NzQsLTUwLjQ0NzM5IC0xMTIuNjc3NCwtMTEyLjY3NzR6IiBmaWxsPSIjMDBjMjhjIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZS13aWR0aD0iMCIvPjxnIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLXdpZHRoPSIxIj48cGF0aCBkPSJNMjg2LjEyMDM3LDE1MC41NTc5NWMyMy4yNDA4NiwwIDQyLjA3ODksMTguODM5NDYgNDIuMDc4OSw0Mi4wNzg5YzAsMjMuMjM5NDQgLTE4LjgzODAzLDQyLjA3ODkgLTQyLjA3ODksNDIuMDc4OWgtOTIuMjQwNzRjLTIzLjI0MDg2LDAgLTQyLjA3ODksLTE4LjgzOTQ2IC00Mi4wNzg5LC00Mi4wNzg5YzAsLTIzLjIzOTQ0IDE4LjgzODAzLC00Mi4wNzg5IDQyLjA3ODksLTQyLjA3ODloNC4xODg4N2MxLjgxMTUzLC0yMS41NzA1NSAxOS44OTM1NywtMzguNTEyODkgNDEuOTMxNSwtMzguNTEyODljMjIuMDM3OTMsMCA0MC4xMTk5NywxNi45NDIzNCA0MS45MzE1LDM4LjUxMjg5eiIgZmlsbD0iI2ZmZmZmZiIvPjxwYXRoIGQ9Ik0yODkuMDg2NTUsMjEwLjM0MTE0djkuMDQ2NjdoLTI2LjkxNjYzaC05LjA0NjY3di05LjA0NjY3di01NC41MDMzOWg5LjA0NjY3djU0LjUwMzM5eiIgZmlsbD0iIzAwYzI4YyIvPjxwYXRoIGQ9Ik0yMjIuNDA5MjUsMjE5LjM4NzgxYy04LjM1MzIsMCAtMTYuMzY0MzEsLTMuMzE4MzQgLTIyLjI3MDksLTkuMjI0OTJjLTUuOTA2NjEsLTUuOTA2NTggLTkuMjI0OTEsLTEzLjkxNzY4IC05LjIyNDkxLC0yMi4yNzA4OWMwLC04LjM1MzIgMy4zMTgyOSwtMTYuMzY0MzEgOS4yMjQ5MSwtMjIuMjcwOWM1LjkwNjU5LC01LjkwNjYxIDEzLjkxNzcsLTkuMjI0OTEgMjIuMjcwOSwtOS4yMjQ5MWgyMS4xMDg5djguOTM0OThoLTIxLjEwODl2MC4xMDI1N2MtNS45NTYyOCwwIC0xMS42Njg2NCwyLjM2NjE2IC0xNS44ODAzNyw2LjU3Nzg5Yy00LjIxMTczLDQuMjExNzMgLTYuNTc3ODksOS45MjQwOCAtNi41Nzc4OSwxNS44ODAzN2MwLDUuOTU2MjggMi4zNjYxNiwxMS42Njg2NCA2LjU3Nzg5LDE1Ljg4MDM3YzQuMjExNzMsNC4yMTE3MyA5LjkyNDA4LDYuNTc3OTMgMTUuODgwMzcsNi41Nzc5M3YwLjEwMjUzaDIxLjEwODl2OC45MzQ5OHoiIGZpbGw9IiMwMGMyOGMiLz48L2c+PC9nPjwvZz48L3N2Zz48IS0tcm90YXRpb25DZW50ZXI6MTEyLjY3NzQwNDA4NDA4MzkyOjExMi42Nzc0MDQwODQwODQwMy0tPg==";
      this.cl_block =
        "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxNzYuMzk4NTQiIGhlaWdodD0iMTIyLjY3MDY5IiB2aWV3Qm94PSIwLDAsMTc2LjM5ODU0LDEyMi42NzA2OSI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE1MS44MDA3MywtMTE4LjY2NDY2KSI+PGcgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aXNQYWludGluZ0xheWVyJnF1b3Q7OnRydWV9IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PGc+PHBhdGggZD0iTTI4Ni4xMjAzNywxNTcuMTc3NTVjMjMuMjQwODYsMCA0Mi4wNzg5LDE4LjgzOTQ2IDQyLjA3ODksNDIuMDc4OWMwLDIzLjIzOTQ0IC0xOC44MzgwMyw0Mi4wNzg5IC00Mi4wNzg5LDQyLjA3ODloLTkyLjI0MDc0Yy0yMy4yNDA4NiwwIC00Mi4wNzg5LC0xOC44Mzk0NiAtNDIuMDc4OSwtNDIuMDc4OWMwLC0yMy4yMzk0NCAxOC44MzgwMywtNDIuMDc4OSA0Mi4wNzg5LC00Mi4wNzg5aDQuMTg4ODdjMS44MTE1MywtMjEuNTcwNTUgMTkuODkzNTcsLTM4LjUxMjg5IDQxLjkzMTUsLTM4LjUxMjg5YzIyLjAzNzkzLDAgNDAuMTE5OTcsMTYuOTQyMzQgNDEuOTMxNSwzOC41MTI4OXoiIGZpbGw9IiNmZmZmZmYiLz48cGF0aCBkPSJNMjg5LjA4NjU1LDIxNi45NjA3NHY5LjA0NjY3aC0yNi45MTY2M2gtOS4wNDY2N3YtOS4wNDY2N3YtNTQuNTAzMzloOS4wNDY2N3Y1NC41MDMzOXoiIGZpbGw9IiMwMGMyOGMiLz48cGF0aCBkPSJNMjIyLjQwOTI1LDIyNi4wMDc0MWMtOC4zNTMyLDAgLTE2LjM2NDMxLC0zLjMxODM0IC0yMi4yNzA5LC05LjIyNDkyYy01LjkwNjYxLC01LjkwNjU4IC05LjIyNDkxLC0xMy45MTc2OCAtOS4yMjQ5MSwtMjIuMjcwODljMCwtOC4zNTMyIDMuMzE4MjksLTE2LjM2NDMxIDkuMjI0OTEsLTIyLjI3MDljNS45MDY1OSwtNS45MDY2MSAxMy45MTc3LC05LjIyNDkxIDIyLjI3MDksLTkuMjI0OTFoMjEuMTA4OXY4LjkzNDk4aC0yMS4xMDg5djAuMTAyNTdjLTUuOTU2MjgsMCAtMTEuNjY4NjQsMi4zNjYxNiAtMTUuODgwMzcsNi41Nzc4OWMtNC4yMTE3Myw0LjIxMTczIC02LjU3Nzg5LDkuOTI0MDggLTYuNTc3ODksMTUuODgwMzdjMCw1Ljk1NjI4IDIuMzY2MTYsMTEuNjY4NjQgNi41Nzc4OSwxNS44ODAzN2M0LjIxMTczLDQuMjExNzMgOS45MjQwOCw2LjU3NzkzIDE1Ljg4MDM3LDYuNTc3OTN2MC4xMDI1M2gyMS4xMDg5djguOTM0OTh6IiBmaWxsPSIjMDBjMjhjIi8+PC9nPjwvZz48L2c+PC9zdmc+PCEtLXJvdGF0aW9uQ2VudGVyOjg4LjE5OTI2OTk5OTk5OTk4OjYxLjMzNTM0NDk5OTk5OTk5LS0+";

      // Socket data
      this.socketData = {
        gmsg: [],
        pmsg: [],
        direct: [],
        statuscode: [],
        gvar: [],
        pvar: [],
        motd: "",
        client_ip: "",
        ulist: [],
        server_version: "",
      };
      this.varData = {
        gvar: {},
        pvar: {},
      };

      this.queueableCmds = [
        "gmsg",
        "pmsg",
        "gvar",
        "pvar",
        "direct",
        "statuscode",
      ];
      this.varCmds = ["gvar", "pvar"];

      // Listeners
      this.socketListeners = {};
      this.socketListenersData = {};
      this.newSocketData = {
        gmsg: false,
        pmsg: false,
        direct: false,
        statuscode: false,
        gvar: false,
        pvar: false,
      };

      // Edge-triggered hat blocks
      this.connect_hat = 0;
      this.packet_hat = 0;
      this.close_hat = 0;

      // Status stuff
      this.isRunning = false;
      this.isLinked = false;
      this.version = "S4.0";
      this.link_status = 0;
      this.username = "";
      this.tmp_username = "";
      this.isUsernameSyncing = false;
      this.isUsernameSet = false;
      this.disconnectWasClean = false;
      this.wasConnectionDropped = false;
      this.didConnectionFail = false;
      this.protocolOk = false;

      // Listeners stuff
      this.enableListener = false;
      this.setListener = "";

      // Rooms stuff
      this.enableRoom = false;
      this.isRoomSetting = false;
      this.selectRoom = "";

      // Remapping stuff
      this.menuRemap = {
        "Global data": "gmsg",
        "Private data": "pmsg",
        "Global variables": "gvar",
        "Private variables": "pvar",
        "Direct data": "direct",
        "Status code": "statuscode",
        "All data": "all",
      };
    }

    getInfo() {
      return {
        id: "cloudlink",
        name: "CloudLink",
        blockIconURI: this.cl_block,
        menuIconURI: this.cl_icon,
        docsURI: "https://hackmd.io/@MikeDEV/HJiNYwOfo",
        blocks: [
          {
            opcode: "returnGlobalData",
            blockType: "reporter",
            text: "Global data",
          },
          {
            opcode: "returnPrivateData",
            blockType: "reporter",
            text: "Private data",
          },
          {
            opcode: "returnDirectData",
            blockType: "reporter",
            text: "Direct Data",
          },
          {
            opcode: "returnLinkData",
            blockType: "reporter",
            text: "Link status",
          },
          {
            opcode: "returnStatusCode",
            blockType: "reporter",
            text: "Status code",
          },
          {
            opcode: "returnUserListData",
            blockType: "reporter",
            text: "Usernames",
          },
          {
            opcode: "returnUsernameData",
            blockType: "reporter",
            text: "My username",
          },
          {
            opcode: "returnVersionData",
            blockType: "reporter",
            text: "Extension version",
          },
          {
            opcode: "returnServerVersion",
            blockType: "reporter",
            text: "Server version",
          },
          {
            opcode: "returnServerList",
            blockType: "reporter",
            text: "Server list",
          },
          {
            opcode: "returnMOTD",
            blockType: "reporter",
            text: "Server MOTD",
          },
          {
            opcode: "returnClientIP",
            blockType: "reporter",
            text: "My IP address",
          },
          {
            opcode: "returnListenerData",
            blockType: "reporter",
            text: "Response for listener [ID]",
            arguments: {
              ID: {
                type: "string",
                defaultValue: "example-listener",
              },
            },
          },
          {
            opcode: "readQueueSize",
            blockType: "reporter",
            text: "Size of queue for [TYPE]",
            arguments: {
              TYPE: {
                type: "string",
                menu: "allmenu",
                defaultValue: "All data",
              },
            },
          },
          {
            opcode: "readQueueData",
            blockType: "reporter",
            text: "Packet queue for [TYPE]",
            arguments: {
              TYPE: {
                type: "string",
                menu: "allmenu",
                defaultValue: "All data",
              },
            },
          },
          {
            opcode: "returnVarData",
            blockType: "reporter",
            text: "[TYPE] [VAR] data",
            arguments: {
              VAR: {
                type: "string",
                defaultValue: "Apple",
              },
              TYPE: {
                type: "string",
                menu: "varmenu",
                defaultValue: "Global variables",
              },
            },
          },
          {
            opcode: "parseJSON",
            blockType: "reporter",
            text: "[PATH] of [JSON_STRING]",
            arguments: {
              PATH: {
                type: "string",
                defaultValue: "fruit/apples",
              },
              JSON_STRING: {
                type: "string",
                defaultValue:
                  '{"fruit": {"apples": 2, "bananas": 3}, "total_fruit": 5}',
              },
            },
          },
          {
            opcode: "getFromJSONArray",
            blockType: "reporter",
            text: "Get [NUM] from JSON array [ARRAY]",
            arguments: {
              NUM: {
                type: "number",
                defaultValue: 0,
              },
              ARRAY: {
                type: "string",
                defaultValue: '["foo","bar"]',
              },
            },
          },
          {
            opcode: "fetchURL",
            blockType: "reporter",
            blockAllThreads: "true",
            text: "Fetch data from URL [url]",
            arguments: {
              url: {
                type: "string",
                defaultValue: "https://extensions.turbowarp.org/hello.txt",
              },
            },
          },
          {
            opcode: "requestURL",
            blockType: "reporter",
            blockAllThreads: "true",
            text: "Send request with method [method] for URL [url] with data [data] and headers [headers]",
            arguments: {
              method: {
                type: "string",
                defaultValue: "GET",
              },
              url: {
                type: "string",
                defaultValue: "https://extensions.turbowarp.org/hello.txt",
              },
              data: {
                type: "string",
                defaultValue: "{}",
              },
              headers: {
                type: "string",
                defaultValue: "{}",
              },
            },
          },
          {
            opcode: "makeJSON",
            blockType: "reporter",
            text: "Convert [toBeJSONified] to JSON",
            arguments: {
              toBeJSONified: {
                type: "string",
                defaultValue: '{"test": true}',
              },
            },
          },
          {
            opcode: "onConnect",
            blockType: "hat",
            text: "When connected",
            blockAllThreads: "true",
          },
          {
            opcode: "onClose",
            blockType: "hat",
            text: "When disconnected",
            blockAllThreads: "true",
          },
          {
            opcode: "onListener",
            blockType: "hat",
            text: "When I receive new packet with listener [ID]",
            blockAllThreads: "true",
            arguments: {
              ID: {
                type: "string",
                defaultValue: "example-listener",
              },
            },
          },
          {
            opcode: "onNewPacket",
            blockType: "hat",
            text: "When I receive new [TYPE] packet",
            blockAllThreads: "true",
            arguments: {
              TYPE: {
                type: "string",
                menu: "almostallmenu",
                defaultValue: "Global data",
              },
            },
          },
          {
            opcode: "onNewVar",
            blockType: "hat",
            text: "When I receive new [TYPE] data for [VAR]",
            blockAllThreads: "true",
            arguments: {
              TYPE: {
                type: "string",
                menu: "varmenu",
                defaultValue: "Global variables",
              },
              VAR: {
                type: "string",
                defaultValue: "Apple",
              },
            },
          },
          {
            opcode: "getComState",
            blockType: "Boolean",
            text: "Connected?",
          },
          {
            opcode: "getRoomState",
            blockType: "Boolean",
            text: "Linked to rooms?",
          },
          {
            opcode: "getComLostConnectionState",
            blockType: "Boolean",
            text: "Lost connection?",
          },
          {
            opcode: "getComFailedConnectionState",
            blockType: "Boolean",
            text: "Failed to connnect?",
          },
          {
            opcode: "getUsernameState",
            blockType: "Boolean",
            text: "Username synced?",
          },
          {
            opcode: "returnIsNewData",
            blockType: "Boolean",
            text: "Got New [TYPE]?",
            arguments: {
              TYPE: {
                type: "string",
                menu: "datamenu",
                defaultValue: "Global data",
              },
            },
          },
          {
            opcode: "returnIsNewVarData",
            blockType: "Boolean",
            text: "Got New [TYPE] data for variable [VAR]?",
            arguments: {
              TYPE: {
                type: "string",
                menu: "varmenu",
                defaultValue: "Global variables",
              },
              VAR: {
                type: "string",
                defaultValue: "Apple",
              },
            },
          },
          {
            opcode: "returnIsNewListener",
            blockType: "Boolean",
            text: "Got new packet with listener [ID]?",
            blockAllThreads: "true",
            arguments: {
              ID: {
                type: "string",
                defaultValue: "example-listener",
              },
            },
          },
          {
            opcode: "checkForID",
            blockType: "Boolean",
            text: "ID [ID] connected?",
            arguments: {
              ID: {
                type: "string",
                defaultValue: "Another name",
              },
            },
          },
          {
            opcode: "isValidJSON",
            blockType: "Boolean",
            text: "Is [JSON_STRING] valid JSON?",
            arguments: {
              JSON_STRING: {
                type: "string",
                defaultValue:
                  '{"fruit": {"apples": 2, "bananas": 3}, "total_fruit": 5}',
              },
            },
          },
          {
            opcode: "openSocket",
            blockType: "command",
            text: "Connect to [IP]",
            blockAllThreads: "true",
            arguments: {
              IP: {
                type: "string",
                defaultValue: "ws://127.0.0.1:3000/",
              },
            },
          },
          {
            opcode: "openSocketPublicServers",
            blockType: "command",
            text: "Connect to server [ID]",
            blockAllThreads: "true",
            arguments: {
              ID: {
                type: "number",
                defaultValue: "",
              },
            },
          },
          {
            opcode: "closeSocket",
            blockType: "command",
            blockAllThreads: "true",
            text: "Disconnect",
          },
          {
            opcode: "setMyName",
            blockType: "command",
            text: "Set [NAME] as username",
            blockAllThreads: "true",
            arguments: {
              NAME: {
                type: "string",
                defaultValue: "A name",
              },
            },
          },
          {
            opcode: "createListener",
            blockType: "command",
            text: "Attach listener [ID] to next packet",
            blockAllThreads: "true",
            arguments: {
              ID: {
                type: "string",
                defaultValue: "example-listener",
              },
            },
          },
          {
            opcode: "linkToRooms",
            blockType: "command",
            text: "Link to room(s) [ROOMS]",
            blockAllThreads: "true",
            arguments: {
              ROOMS: {
                type: "string",
                defaultValue: '["test"]',
              },
            },
          },
          {
            opcode: "selectRoomsInNextPacket",
            blockType: "command",
            text: "Select room(s) [ROOMS] for next packet",
            blockAllThreads: "true",
            arguments: {
              ROOMS: {
                type: "string",
                defaultValue: '["test"]',
              },
            },
          },
          {
            opcode: "unlinkFromRooms",
            blockType: "command",
            text: "Unlink from all rooms",
            blockAllThreads: "true",
          },
          {
            opcode: "sendGData",
            blockType: "command",
            text: "Send [DATA]",
            blockAllThreads: "true",
            arguments: {
              DATA: {
                type: "string",
                defaultValue: "Apple",
              },
            },
          },
          {
            opcode: "sendPData",
            blockType: "command",
            text: "Send [DATA] to [ID]",
            blockAllThreads: "true",
            arguments: {
              DATA: {
                type: "string",
                defaultValue: "Apple",
              },
              ID: {
                type: "string",
                defaultValue: "Another name",
              },
            },
          },
          {
            opcode: "sendGDataAsVar",
            blockType: "command",
            text: "Send variable [VAR] with data [DATA]",
            blockAllThreads: "true",
            arguments: {
              DATA: {
                type: "string",
                defaultValue: "Banana",
              },
              VAR: {
                type: "string",
                defaultValue: "Apple",
              },
            },
          },
          {
            opcode: "sendPDataAsVar",
            blockType: "command",
            text: "Send variable [VAR] to [ID] with data [DATA]",
            blockAllThreads: "true",
            arguments: {
              DATA: {
                type: "string",
                defaultValue: "Banana",
              },
              ID: {
                type: "string",
                defaultValue: "Another name",
              },
              VAR: {
                type: "string",
                defaultValue: "Apple",
              },
            },
          },
          {
            opcode: "runCMDnoID",
            blockType: "command",
            text: "Send command without ID [CMD] [DATA]",
            blockAllThreads: "true",
            arguments: {
              CMD: {
                type: "string",
                defaultValue: "direct",
              },
              DATA: {
                type: "string",
                defaultValue: "val",
              },
            },
          },
          {
            opcode: "runCMD",
            blockType: "command",
            text: "Send command [CMD] [ID] [DATA]",
            blockAllThreads: "true",
            arguments: {
              CMD: {
                type: "string",
                defaultValue: "direct",
              },
              ID: {
                type: "string",
                defaultValue: "id",
              },
              DATA: {
                type: "string",
                defaultValue: "val",
              },
            },
          },
          {
            opcode: "resetNewData",
            blockType: "command",
            text: "Reset got new [TYPE] status",
            blockAllThreads: "true",
            arguments: {
              TYPE: {
                type: "string",
                menu: "datamenu",
                defaultValue: "Global data",
              },
            },
          },
          {
            opcode: "resetNewVarData",
            blockType: "command",
            text: "Reset got new [TYPE] [VAR] status",
            blockAllThreads: "true",
            arguments: {
              TYPE: {
                type: "string",
                menu: "varmenu",
                defaultValue: "Global variables",
              },
              VAR: {
                type: "string",
                defaultValue: "Apple",
              },
            },
          },
          {
            opcode: "resetNewListener",
            blockType: "command",
            text: "Reset got new [ID] listener status",
            blockAllThreads: "true",
            arguments: {
              ID: {
                type: "string",
                defaultValue: "example-listener",
              },
            },
          },
          {
            opcode: "clearAllPackets",
            blockType: "command",
            text: "Clear all packets for [TYPE]",
            arguments: {
              TYPE: {
                type: "string",
                menu: "allmenu",
                defaultValue: "All data",
              },
            },
          },
        ],
        menus: {
          coms: {
            items: ["Connected", "Username synced"],
          },
          datamenu: {
            items: [
              "Global data",
              "Private data",
              "Direct data",
              "Status code",
            ],
          },
          varmenu: {
            items: ["Global variables", "Private variables"],
          },
          allmenu: {
            items: [
              "Global data",
              "Private data",
              "Direct data",
              "Status code",
              "Global variables",
              "Private variables",
              "All data",
            ],
          },
          almostallmenu: {
            items: [
              "Global data",
              "Private data",
              "Direct data",
              "Status code",
              "Global variables",
              "Private variables",
            ],
          },
        },
      };
    }

    // Code for blocks go here

    returnGlobalData() {
      if (this.socketData.gmsg.length != 0) {
        let data = this.socketData.gmsg[this.socketData.gmsg.length - 1].val;

        if (typeof data == "object") {
          data = JSON.stringify(data); // Make the JSON safe for Scratch
        }

        return data;
      } else {
        return "";
      }
    }

    returnPrivateData() {
      if (this.socketData.pmsg.length != 0) {
        let data = this.socketData.pmsg[this.socketData.pmsg.length - 1].val;

        if (typeof data == "object") {
          data = JSON.stringify(data); // Make the JSON safe for Scratch
        }

        return data;
      } else {
        return "";
      }
    }

    returnDirectData() {
      if (this.socketData.direct.length != 0) {
        let data =
          this.socketData.direct[this.socketData.direct.length - 1].val;

        if (typeof data == "object") {
          data = JSON.stringify(data); // Make the JSON safe for Scratch
        }

        return data;
      } else {
        return "";
      }
    }

    returnLinkData() {
      return String(this.link_status);
    }

    returnStatusCode() {
      if (this.socketData.statuscode.length != 0) {
        let data =
          this.socketData.statuscode[this.socketData.statuscode.length - 1]
            .code;

        if (typeof data == "object") {
          data = JSON.stringify(data); // Make the JSON safe for Scratch
        }

        return data;
      } else {
        return "";
      }
    }

    returnUserListData() {
      return JSON.stringify(this.socketData.ulist);
    }

    returnUsernameData() {
      let data = this.username;

      if (typeof data == "object") {
        data = JSON.stringify(data); // Make the JSON safe for Scratch
      }

      return data;
    }

    returnVersionData() {
      return String(this.version);
    }

    returnServerVersion() {
      return String(this.socketData.server_version);
    }

    returnServerList() {
      return JSON.stringify(servers);
    }

    returnMOTD() {
      return String(this.socketData.motd);
    }

    returnClientIP() {
      return String(this.socketData.client_ip);
    }

    returnListenerData({ ID }) {
      const self = this;
      if (this.isRunning && this.socketListeners.hasOwnProperty(String(ID))) {
        return JSON.stringify(this.socketListenersData[ID]);
      } else {
        return "{}";
      }
    }

    readQueueSize({ TYPE }) {
      if (this.menuRemap[String(TYPE)] == "all") {
        let tmp_size = 0;
        tmp_size = tmp_size + this.socketData.gmsg.length;
        tmp_size = tmp_size + this.socketData.pmsg.length;
        tmp_size = tmp_size + this.socketData.direct.length;
        tmp_size = tmp_size + this.socketData.statuscode.length;
        tmp_size = tmp_size + this.socketData.gvar.length;
        tmp_size = tmp_size + this.socketData.pvar.length;
        return tmp_size;
      } else {
        return this.socketData[this.menuRemap[String(TYPE)]].length;
      }
    }

    readQueueData({ TYPE }) {
      if (this.menuRemap[String(TYPE)] == "all") {
        let tmp_socketData = JSON.parse(JSON.stringify(this.socketData)); // Deep copy

        delete tmp_socketData.motd;
        delete tmp_socketData.client_ip;
        delete tmp_socketData.ulist;
        delete tmp_socketData.server_version;

        return JSON.stringify(tmp_socketData);
      } else {
        return JSON.stringify(this.socketData[this.menuRemap[String(TYPE)]]);
      }
    }

    returnVarData({ TYPE, VAR }) {
      if (this.isRunning) {
        if (this.varData.hasOwnProperty(this.menuRemap[TYPE])) {
          if (this.varData[this.menuRemap[TYPE]].hasOwnProperty(VAR)) {
            return this.varData[this.menuRemap[TYPE]][VAR].value;
          } else {
            return "";
          }
        } else {
          return "";
        }
      } else {
        return "";
      }
    }

    parseJSON({ PATH, JSON_STRING }) {
      try {
        const path = PATH.toString()
          .split("/")
          .map((prop) => decodeURIComponent(prop));
        if (path[0] === "") path.splice(0, 1);
        if (path[path.length - 1] === "") path.splice(-1, 1);
        let json;
        try {
          json = JSON.parse(" " + JSON_STRING);
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

    getFromJSONArray({ NUM, ARRAY }) {
      var json_array = JSON.parse(ARRAY);
      if (json_array[NUM] == "undefined") {
        return "";
      } else {
        let data = json_array[NUM];

        if (typeof data == "object") {
          data = JSON.stringify(data); // Make the JSON safe for Scratch
        }

        return data;
      }
    }

    fetchURL(args) {
      return Scratch.fetch(args.url, {
        method: "GET",
      }).then((response) => response.text());
    }

    requestURL(args) {
      if (args.method == "GET" || args.method == "HEAD") {
        return Scratch.fetch(args.url, {
          method: args.method,
          headers: JSON.parse(args.headers),
        }).then((response) => response.text());
      } else {
        return Scratch.fetch(args.url, {
          method: args.method,
          headers: JSON.parse(args.headers),
          body: JSON.parse(args.data),
        }).then((response) => response.text());
      }
    }

    isValidJSON({ JSON_STRING }) {
      return jsonCheck(JSON_STRING);
    }

    makeJSON({ toBeJSONified }) {
      if (typeof toBeJSONified == "string") {
        try {
          JSON.parse(toBeJSONified);
          return String(toBeJSONified);
        } catch (err) {
          return "Not JSON!";
        }
      } else if (typeof toBeJSONified == "object") {
        return JSON.stringify(toBeJSONified);
      } else {
        return "Not JSON!";
      }
    }

    onConnect() {
      const self = this;
      if (self.connect_hat == 0 && self.isRunning && self.protocolOk) {
        self.connect_hat = 1;
        return true;
      } else {
        return false;
      }
    }

    onClose() {
      const self = this;
      if (self.close_hat == 0 && !self.isRunning) {
        self.close_hat = 1;
        return true;
      } else {
        return false;
      }
    }

    onListener({ ID }) {
      const self = this;
      if (this.isRunning && this.socketListeners.hasOwnProperty(String(ID))) {
        if (self.socketListeners[String(ID)]) {
          self.socketListeners[String(ID)] = false;
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }

    onNewPacket({ TYPE }) {
      const self = this;
      if (this.isRunning && this.newSocketData[this.menuRemap[String(TYPE)]]) {
        self.newSocketData[this.menuRemap[String(TYPE)]] = false;
        return true;
      } else {
        return false;
      }
    }

    onNewVar({ TYPE, VAR }) {
      const self = this;
      if (this.isRunning) {
        if (this.varData.hasOwnProperty(this.menuRemap[TYPE])) {
          if (this.varData[this.menuRemap[TYPE]].hasOwnProperty(VAR)) {
            if (this.varData[this.menuRemap[TYPE]][VAR].isNew) {
              self.varData[this.menuRemap[TYPE]][VAR].isNew = false;
              return true;
            } else {
              return false;
            }
          } else {
            return false;
          }
        } else {
          return false;
        }
      } else {
        return false;
      }
    }

    getComState() {
      return String(this.link_status == 2 || this.protocolOk);
    }

    getRoomState() {
      return this.isLinked;
    }

    getComLostConnectionState() {
      return this.wasConnectionDropped;
    }

    getComFailedConnectionState() {
      return this.didConnectionFail;
    }

    getUsernameState() {
      return this.isUsernameSet;
    }

    returnIsNewData({ TYPE }) {
      if (this.isRunning) {
        return this.newSocketData[this.menuRemap[String(TYPE)]];
      } else {
        return false;
      }
    }

    returnIsNewVarData({ TYPE, VAR }) {
      if (this.isRunning) {
        if (this.varData.hasOwnProperty(this.menuRemap[TYPE])) {
          if (this.varData[this.menuRemap[TYPE]].hasOwnProperty(VAR)) {
            return this.varData[this.menuRemap[TYPE]][VAR].isNew;
          } else {
            return false;
          }
        } else {
          return false;
        }
      } else {
        return false;
      }
    }

    returnIsNewListener({ ID }) {
      if (this.isRunning) {
        if (this.socketListeners.hasOwnProperty(String(ID))) {
          return this.socketListeners[ID];
        } else {
          return false;
        }
      } else {
        return false;
      }
    }

    checkForID({ ID }) {
      return find_id(ID, this.socketData.ulist);
    }

    async openSocket({ IP }) {
      const self = this;
      if (!self.isRunning) {
        if (!(await Scratch.canFetch(IP))) {
          return;
        }

        console.log("Starting socket.");
        self.link_status = 1;

        self.disconnectWasClean = false;
        self.wasConnectionDropped = false;
        self.didConnectionFail = false;

        mWS = new WebSocket(String(IP));

        mWS.onerror = function () {
          self.isRunning = false;
        };

        mWS.onopen = function () {
          self.isRunning = true;
          self.packet_queue = {};
          self.link_status = 2;

          // Send the handshake request to get server to detect client protocol
          mWS.send(
            JSON.stringify({ cmd: "handshake", listener: "setprotocol" })
          );

          console.log("Successfully opened socket.");
        };

        mWS.onmessage = function (event) {
          let tmp_socketData = JSON.parse(event.data);
          console.log("RX:", tmp_socketData);

          if (self.queueableCmds.includes(tmp_socketData.cmd)) {
            self.socketData[tmp_socketData.cmd].push(tmp_socketData);
          } else {
            if (tmp_socketData.cmd == "ulist") {
              // ulist functionality has been changed in server 0.1.9
              if (tmp_socketData.hasOwnProperty("mode")) {
                if (tmp_socketData.mode == "set") {
                  self.socketData["ulist"] = tmp_socketData.val;
                } else if (tmp_socketData.mode == "add") {
                  if (
                    !self.socketData.ulist.some(
                      (o) =>
                        o.username === tmp_socketData.val.username &&
                        o.id == tmp_socketData.val.id
                    )
                  ) {
                    self.socketData["ulist"].push(tmp_socketData.val);
                  } else {
                    console.log(
                      "Could not perform ulist method add, client",
                      tmp_socketData.val,
                      "already exists"
                    );
                  }
                } else if (tmp_socketData.mode == "remove") {
                  if (
                    self.socketData.ulist.some(
                      (o) =>
                        o.username === tmp_socketData.val.username &&
                        o.id == tmp_socketData.val.id
                    )
                  ) {
                    // This is by far the fugliest thing I have ever written in JS, or in any programming language... thanks I hate it
                    self.socketData["ulist"] = self.socketData["ulist"].filter(
                      (user) =>
                        !(user.username === tmp_socketData.val.username) &&
                        !(user.id == tmp_socketData.val.id)
                    );
                  } else {
                    console.log(
                      "Could not perform ulist method remove, client",
                      tmp_socketData.val,
                      "was not found"
                    );
                  }
                } else {
                  console.log(
                    "Could not understand ulist method:",
                    tmp_socketData.mode
                  );
                }
              } else {
                // Retain compatibility wtih existing servers
                self.socketData["ulist"] = tmp_socketData.val;
              }
            } else {
              self.socketData[tmp_socketData.cmd] = tmp_socketData.val;
            }
          }

          if (self.newSocketData.hasOwnProperty(tmp_socketData.cmd)) {
            self.newSocketData[tmp_socketData.cmd] = true;
          }

          if (self.varCmds.includes(tmp_socketData.cmd)) {
            self.varData[tmp_socketData.cmd][tmp_socketData.name] = {
              value: tmp_socketData.val,
              isNew: true,
            };
          }
          if (tmp_socketData.hasOwnProperty("listener")) {
            if (tmp_socketData.listener == "setusername") {
              self.socketListeners["setusername"] = true;
              if (tmp_socketData.code == "I:100 | OK") {
                self.username = tmp_socketData.val;
                self.isUsernameSyncing = false;
                self.isUsernameSet = true;
                console.log(
                  "Username was accepted by the server, and has been set to:",
                  self.username
                );
              } else {
                console.warn(
                  "Username was rejected by the server. Error code:",
                  String(tmp_socketData.code)
                );
                self.isUsernameSyncing = false;
              }
            } else if (tmp_socketData.listener == "roomLink") {
              self.isRoomSetting = false;
              self.socketListeners["roomLink"] = true;
              if (tmp_socketData.code == "I:100 | OK") {
                console.log("Linking to room(s) was accepted by the server!");
                self.isLinked = true;
              } else {
                console.warn(
                  "Linking to room(s) was rejected by the server. Error code:",
                  String(tmp_socketData.code)
                );
                self.enableRoom = false;
                self.isLinked = false;
                self.selectRoom = "";
              }
            } else if (
              tmp_socketData.listener == "setprotocol" &&
              !this.protocolOk
            ) {
              console.log(
                "Server successfully set client protocol to cloudlink!"
              );
              self.socketData.statuscode = [];
              self.protocolOk = true;
              self.socketListeners["setprotocol"] = true;
            } else {
              if (
                self.socketListeners.hasOwnProperty(tmp_socketData.listener)
              ) {
                self.socketListeners[tmp_socketData.listener] = true;
              }
            }
            self.socketListenersData[tmp_socketData.listener] = tmp_socketData;
          }
          self.packet_hat = 0;
        };

        mWS.onclose = function () {
          self.isRunning = false;
          self.connect_hat = 0;
          self.packet_hat = 0;
          self.protocolOk = false;
          if (self.close_hat == 1) {
            self.close_hat = 0;
          }
          self.socketData = {
            gmsg: [],
            pmsg: [],
            direct: [],
            statuscode: [],
            gvar: [],
            pvar: [],
            motd: "",
            client_ip: "",
            ulist: [],
            server_version: "",
          };
          self.newSocketData = {
            gmsg: false,
            pmsg: false,
            direct: false,
            statuscode: false,
            gvar: false,
            pvar: false,
          };
          self.socketListeners = {};
          self.username = "";
          self.tmp_username = "";
          self.isUsernameSyncing = false;
          self.isUsernameSet = false;
          self.enableListener = false;
          self.setListener = "";
          self.enableRoom = false;
          self.selectRoom = "";
          self.isLinked = false;
          self.isRoomSetting = false;

          if (self.link_status != 1) {
            if (self.disconnectWasClean) {
              self.link_status = 3;
              console.log("Socket closed.");
              self.wasConnectionDropped = false;
              self.didConnectionFail = false;
            } else {
              self.link_status = 4;
              console.error("Lost connection to the server.");
              self.wasConnectionDropped = true;
              self.didConnectionFail = false;
            }
          } else {
            self.link_status = 4;
            console.error("Failed to connect to server.");
            self.wasConnectionDropped = false;
            self.didConnectionFail = true;
          }
        };
      } else {
        console.warn("Socket is already open.");
      }
    }

    openSocketPublicServers({ ID }) {
      if (servers.hasOwnProperty(ID)) {
        console.log("Connecting to:", servers[ID].url);
        this.openSocket({ IP: servers[ID].url });
      }
    }

    closeSocket() {
      const self = this;
      if (this.isRunning) {
        console.log("Closing socket...");
        mWS.close(1000, "script closure");
        self.disconnectWasClean = true;
      } else {
        console.warn("Socket is not open.");
      }
    }

    setMyName({ NAME }) {
      const self = this;
      if (this.isRunning) {
        if (!this.isUsernameSyncing) {
          if (!this.isUsernameSet) {
            if (String(NAME) != "") {
              if (!(String(NAME).length > 20)) {
                if (
                  !(
                    String(NAME) == "%CA%" ||
                    String(NAME) == "%CC%" ||
                    String(NAME) == "%CD%" ||
                    String(NAME) == "%MS%"
                  )
                ) {
                  let tmp_msg = {
                    cmd: "setid",
                    val: String(NAME),
                    listener: "setusername",
                  };

                  console.log("TX:", tmp_msg);
                  mWS.send(JSON.stringify(tmp_msg));

                  self.tmp_username = String(NAME);
                  self.isUsernameSyncing = true;
                } else {
                  console.log("Blocking attempt to use reserved usernames");
                }
              } else {
                console.log(
                  "Blocking attempt to use username larger than 20 characters, username is " +
                    String(NAME).length +
                    " characters long"
                );
              }
            } else {
              console.log("Blocking attempt to use blank username");
            }
          } else {
            console.warn("Username already has been set!");
          }
        } else {
          console.warn("Username is still syncing!");
        }
      }
    }

    createListener({ ID }) {
      self = this;
      if (this.isRunning) {
        if (!this.enableListener) {
          self.enableListener = true;
          self.setListener = String(ID);
        } else {
          console.warn("Listeners were already created!");
        }
      } else {
        console.log("Cannot assign a listener to a packet while disconnected");
      }
    }

    linkToRooms({ ROOMS }) {
      const self = this;

      if (this.isRunning) {
        if (!this.isRoomSetting) {
          if (!(String(ROOMS).length > 1000)) {
            let tmp_msg = {
              cmd: "link",
              val: autoConvert(ROOMS),
              listener: "roomLink",
            };

            console.log("TX:", tmp_msg);
            mWS.send(JSON.stringify(tmp_msg));

            self.isRoomSetting = true;
          } else {
            console.warn(
              "Blocking attempt to send a room ID / room list larger than 1000 bytes (1 KB), room ID / room list is " +
                String(ROOMS).length +
                " bytes"
            );
          }
        } else {
          console.warn("Still linking to rooms!");
        }
      } else {
        console.warn("Socket is not open.");
      }
    }

    selectRoomsInNextPacket({ ROOMS }) {
      const self = this;
      if (this.isRunning) {
        if (this.isLinked) {
          if (!this.enableRoom) {
            if (!(String(ROOMS).length > 1000)) {
              self.enableRoom = true;
              self.selectRoom = ROOMS;
            } else {
              console.warn(
                "Blocking attempt to select a room ID / room list larger than 1000 bytes (1 KB), room ID / room list is " +
                  String(ROOMS).length +
                  " bytes"
              );
            }
          } else {
            console.warn("Rooms were already selected!");
          }
        } else {
          console.warn("Not linked to any room(s)!");
        }
      } else {
        console.warn("Socket is not open.");
      }
    }

    unlinkFromRooms() {
      const self = this;
      if (this.isRunning) {
        if (this.isLinked) {
          let tmp_msg = {
            cmd: "unlink",
            val: "",
          };

          if (this.enableListener) {
            tmp_msg["listener"] = autoConvert(this.setListener);
          }

          console.log("TX:", tmp_msg);
          mWS.send(JSON.stringify(tmp_msg));

          if (this.enableListener) {
            if (!self.socketListeners.hasOwnProperty(this.setListener)) {
              self.socketListeners[this.setListener] = false;
            }
            self.enableListener = false;
          }

          self.isLinked = false;
        } else {
          console.warn("Not linked to any rooms!");
        }
      } else {
        console.warn("Socket is not open.");
      }
    }

    sendGData({ DATA }) {
      const self = this;
      if (this.isRunning) {
        if (!(String(DATA).length > 1000)) {
          let tmp_msg = {
            cmd: "gmsg",
            val: autoConvert(DATA),
          };

          if (this.enableListener) {
            tmp_msg["listener"] = String(this.setListener);
          }

          if (this.enableRoom) {
            tmp_msg["rooms"] = autoConvert(this.selectRoom);
          }

          console.log("TX:", tmp_msg);
          mWS.send(JSON.stringify(tmp_msg));

          if (this.enableListener) {
            if (!self.socketListeners.hasOwnProperty(this.setListener)) {
              self.socketListeners[this.setListener] = false;
            }
            self.enableListener = false;
          }
          if (this.enableRoom) {
            self.enableRoom = false;
            self.selectRoom = "";
          }
        } else {
          console.warn(
            "Blocking attempt to send packet larger than 1000 bytes (1 KB), packet is " +
              String(DATA).length +
              " bytes"
          );
        }
      } else {
        console.warn("Socket is not open.");
      }
    }

    sendPData({ DATA, ID }) {
      const self = this;
      if (this.isRunning) {
        if (!(String(DATA).length > 1000)) {
          let tmp_msg = {
            cmd: "pmsg",
            val: autoConvert(DATA),
            id: autoConvert(ID),
          };

          if (this.enableListener) {
            tmp_msg["listener"] = String(this.setListener);
          }
          if (this.enableRoom) {
            tmp_msg["rooms"] = autoConvert(this.selectRoom);
          }

          console.log("TX:", tmp_msg);
          mWS.send(JSON.stringify(tmp_msg));

          if (this.enableListener) {
            if (!self.socketListeners.hasOwnProperty(this.setListener)) {
              self.socketListeners[this.setListener] = false;
            }
            self.enableListener = false;
          }
          if (this.enableRoom) {
            self.enableRoom = false;
            self.selectRoom = "";
          }
        } else {
          console.warn(
            "Blocking attempt to send packet larger than 1000 bytes (1 KB), packet is " +
              String(DATA).length +
              " bytes"
          );
        }
      } else {
        console.warn("Socket is not open.");
      }
    }

    sendGDataAsVar({ VAR, DATA }) {
      const self = this;
      if (this.isRunning) {
        if (!(String(DATA).length > 1000)) {
          let tmp_msg = {
            cmd: "gvar",
            name: VAR,
            val: autoConvert(DATA),
          };

          if (this.enableListener) {
            tmp_msg["listener"] = String(this.setListener);
          }
          if (this.enableRoom) {
            tmp_msg["rooms"] = autoConvert(this.selectRoom);
          }

          console.log("TX:", tmp_msg);
          mWS.send(JSON.stringify(tmp_msg));

          if (this.enableListener) {
            if (!self.socketListeners.hasOwnProperty(this.setListener)) {
              self.socketListeners[this.setListener] = false;
            }
            self.enableListener = false;
          }
          if (this.enableRoom) {
            self.enableRoom = false;
            self.selectRoom = "";
          }
        } else {
          console.warn(
            "Blocking attempt to send packet larger than 1000 bytes (1 KB), packet is " +
              String(DATA).length +
              " bytes"
          );
        }
      } else {
        console.warn("Socket is not open.");
      }
    }

    sendPDataAsVar({ VAR, ID, DATA }) {
      const self = this;
      if (this.isRunning) {
        if (!(String(DATA).length > 1000)) {
          let tmp_msg = {
            cmd: "pvar",
            name: VAR,
            val: autoConvert(DATA),
            id: autoConvert(ID),
          };

          if (this.enableListener) {
            tmp_msg["listener"] = String(this.setListener);
          }
          if (this.enableRoom) {
            tmp_msg["rooms"] = autoConvert(this.selectRoom);
          }

          console.log("TX:", tmp_msg);
          mWS.send(JSON.stringify(tmp_msg));

          if (this.enableListener) {
            if (!self.socketListeners.hasOwnProperty(this.setListener)) {
              self.socketListeners[this.setListener] = false;
            }
            self.enableListener = false;
          }
          if (this.enableRoom) {
            self.enableRoom = false;
            self.selectRoom = "";
          }
        } else {
          console.warn(
            "Blocking attempt to send packet larger than 1000 bytes (1 KB), packet is " +
              String(DATA).length +
              " bytes"
          );
        }
      } else {
        console.warn("Socket is not open.");
      }
    }

    runCMDnoID({ CMD, DATA }) {
      const self = this;
      if (this.isRunning) {
        if (!(String(CMD).length > 100) || !(String(DATA).length > 1000)) {
          let tmp_msg = {
            cmd: String(CMD),
            val: autoConvert(DATA),
          };

          if (this.enableListener) {
            tmp_msg["listener"] = String(this.setListener);
          }
          if (this.enableRoom) {
            tmp_msg["rooms"] = String(this.selectRoom);
          }

          console.log("TX:", tmp_msg);
          mWS.send(JSON.stringify(tmp_msg));

          if (this.enableListener) {
            if (!self.socketListeners.hasOwnProperty(this.setListener)) {
              self.socketListeners[this.setListener] = false;
            }
            self.enableListener = false;
          }
          if (this.enableRoom) {
            self.enableRoom = false;
            self.selectRoom = "";
          }
        } else {
          console.warn(
            "Blocking attempt to send packet with questionably long arguments"
          );
        }
      } else {
        console.warn("Socket is not open.");
      }
    }

    runCMD({ CMD, ID, DATA }) {
      const self = this;
      if (this.isRunning) {
        if (
          !(String(CMD).length > 100) ||
          !(String(ID).length > 20) ||
          !(String(DATA).length > 1000)
        ) {
          let tmp_msg = {
            cmd: String(CMD),
            id: autoConvert(ID),
            val: autoConvert(DATA),
          };

          if (this.enableListener) {
            tmp_msg["listener"] = String(this.setListener);
          }
          if (this.enableRoom) {
            tmp_msg["rooms"] = String(this.selectRoom);
          }

          console.log("TX:", tmp_msg);
          mWS.send(JSON.stringify(tmp_msg));

          if (this.enableListener) {
            if (!self.socketListeners.hasOwnProperty(this.setListener)) {
              self.socketListeners[this.setListener] = false;
            }
            self.enableListener = false;
          }
          if (this.enableRoom) {
            self.enableRoom = false;
            self.selectRoom = "";
          }
        } else {
          console.warn(
            "Blocking attempt to send packet with questionably long arguments"
          );
        }
      } else {
        console.warn("Socket is not open.");
      }
    }

    resetNewData({ TYPE }) {
      const self = this;
      if (this.isRunning) {
        self.newSocketData[this.menuRemap[String(TYPE)]] = false;
      }
    }

    resetNewVarData({ TYPE, VAR }) {
      const self = this;
      if (this.isRunning) {
        if (this.varData.hasOwnProperty(this.menuRemap[TYPE])) {
          if (this.varData[this.menuRemap[TYPE]].hasOwnProperty(VAR)) {
            self.varData[this.menuRemap[TYPE]][VAR].isNew = false;
          }
        }
      }
    }

    resetNewListener({ ID }) {
      const self = this;
      if (this.isRunning) {
        if (this.socketListeners.hasOwnProperty(String(ID))) {
          self.socketListeners[String(ID)] = false;
        }
      }
    }

    clearAllPackets({ TYPE }) {
      const self = this;
      if (this.menuRemap[String(TYPE)] == "all") {
        self.socketData.gmsg = [];
        self.socketData.pmsg = [];
        self.socketData.direct = [];
        self.socketData.statuscode = [];
        self.socketData.gvar = [];
        self.socketData.pvar = [];
      } else {
        self.socketData[this.menuRemap[String(TYPE)]] = [];
      }
    }
  }

  console.log("CloudLink 4.0 loaded. Detecting unsandboxed mode.");
  Scratch.extensions.register(new CloudLink(Scratch.vm.runtime));
})(Scratch);
