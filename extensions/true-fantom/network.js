// Name: Network
// ID: truefantomnetwork
// Description: Various blocks for interacting with the network.
// By: TrueFantom <https://scratch.mit.edu/users/TrueFantom/>

((Scratch) => {
  "use strict";

  const icon =
    "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwLDAsMjI1LjM1NDgsMjI1LjM1NDgiIGhlaWdodD0iMjI1LjM1NDgiIHdpZHRoPSIyMjUuMzU0OCIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmVyc2lvbj0iMS4xIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTI3LjMyMjc0LC02Ny4zMjI2KSI+PGcgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZT0ibm9uZSIgZmlsbC1ydWxlPSJub256ZXJvIiBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iPjxwYXRoIHN0cm9rZS13aWR0aD0iMCIgZmlsbD0iIzE0NjYwMCIgZD0iTTEyNy4zMjI3NSwxODBjMCwtNjIuMjMwMDEgNTAuNDQ3MzksLTExMi42Nzc0IDExMi42Nzc0LC0xMTIuNjc3NGM2Mi4yMzAwMSwwIDExMi42Nzc0LDUwLjQ0NzM5IDExMi42Nzc0LDExMi42Nzc0YzAsNjIuMjMwMDEgLTUwLjQ0NzM5LDExMi42Nzc0IC0xMTIuNjc3NCwxMTIuNjc3NGMtNjIuMjMwMDEsMCAtMTEyLjY3NzQsLTUwLjQ0NzM5IC0xMTIuNjc3NCwtMTEyLjY3NzR6Ij48L3BhdGg+PGcgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSIjZmZmZmZmIj48cGF0aCBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpbmRleCZxdW90OzpudWxsfSIgZD0iTTI2MS4zNjIzNSwxNDYuNjIzNTlsLTUuMTUwOTcsNS4yNzQ2MmwtMTMuMTg1NTEsLTEyLjIzOTg5bDE5LjIzNjg5LC0xOS40OTU4OWMxMC41OTE0NywtMTAuNTkxNDcgMjcuNzU4NCwtMTAuNTkxNDcgMzguMzQxMTIsMGwxMi43ODAzOCwxMi43ODAzOGMxMC41OTE0NywxMC41ODI3MSAxMC41OTE0NywyNy43NDk2NSAwLDM4LjM0MTEybC0zOC4zNDExMiwzOC4zNDExMmMtMTAuNTkxNDcsMTAuNTg2OTUgLTI3Ljc0OTY1LDEwLjU4Njk1IC0zOC4zNDExMiwwbC0xMi43ODAzNywtMTIuNzgwMzdsLTEyLjY3Mzc4LC0xMy4yMjYxMmwxMi4yNjMwNCwtMTIuNDMzbDI1Ljk3MTQ5LDI1LjY1OTEyYzMuNTIxNzQsMy41MjE3NCA5LjI1ODY0LDMuNTIxNzQgMTIuNzgwMzgsMGwzOC4zNDExMiwtMzguMzQxMTJjMy41MzA0OSwtMy41MzA0OSAzLjUzMDQ5LC05LjI1ODY0IDAsLTEyLjc4MDM4bC0xMi43ODAzNywtMTIuNzgwMzdjLTMuNTIxNzQsLTMuNTIxNzMgLTkuMjQ5ODgsLTMuNTMwNDkgLTEyLjc4MDM4LDBsLTEzLjY4MDc5LDEzLjY4MDc5eiI+PC9wYXRoPjxwYXRoIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2luZGV4JnF1b3Q7Om51bGx9IiBkPSJNMjE4LjYzNzczLDIxMy4zNzY0bDUuMTUwOTcsLTUuMjc0NjJsMTMuMTg1NTEsMTIuMjM5ODlsLTE5LjIzNjg5LDE5LjQ5NTg5Yy0xMC41OTE0NywxMC41OTE0NyAtMjcuNzU4NCwxMC41OTE0NyAtMzguMzQxMTIsMGwtMTIuNzgwMzgsLTEyLjc4MDM4Yy0xMC41OTE0NywtMTAuNTgyNzEgLTEwLjU5MTQ3LC0yNy43NDk2NSAwLC0zOC4zNDExMWwzOC4zNDExMiwtMzguMzQxMTJjMTAuNTkxNDcsLTEwLjU4Njk1IDI3Ljc0OTY1LC0xMC41ODY5NSAzOC4zNDExMiwwbDEyLjc4MDM3LDEyLjc4MDM3bDEyLjY3Mzc4LDEzLjIyNjEybC0xMi4yNjMwNSwxMi40MzNsLTI1Ljk3MTQ4LC0yNS42NTkxMmMtMy41MjE3NCwtMy41MjE3NCAtOS4yNTg2NCwtMy41MjE3NCAtMTIuNzgwMzgsMGwtMzguMzQxMTIsMzguMzQxMTJjLTMuNTMwNDksMy41MzA0OSAtMy41MzA0OSw5LjI1ODY0IDAsMTIuNzgwMzhsMTIuNzgwMzcsMTIuNzgwMzdjMy41MjE3NCwzLjUyMTczIDkuMjQ5ODgsMy41MzA0OSAxMi43ODAzOCwwbDEzLjY4MDc5LC0xMy42ODA3OXoiPjwvcGF0aD48L2c+PC9nPjwvZz48L3N2Zz48IS0tcm90YXRpb25DZW50ZXI6MTEyLjY3NzI1NToxMTIuNjc3NDA1LS0+";

  const fetch_url = (
    { USER_URL, BODY, CONTENT_TYPE, RESPONSES_TYPES, SPLIT },
    METHOD
  ) => {
    SPLIT = String(SPLIT);
    CONTENT_TYPE = Number(CONTENT_TYPE);
    RESPONSES_TYPES =
      String(RESPONSES_TYPES)
        .split(" ")
        .filter((word) => word !== "").length >= 1
        ? String(RESPONSES_TYPES)
            .split(" ")
            .filter((word) => word !== "")
        : ["9"];
    let single = METHOD === "GET" || METHOD === "DELETE";
    return Scratch.fetch(String(USER_URL), {
      method: METHOD,
      headers: single
        ? {}
        : {
            "Content-Type":
              CONTENT_TYPE === 1 ? "text/plain" : "application/json",
          },
      redirect: single ? "follow" : "follow",
      body: CONTENT_TYPE === 1 ? String(BODY) : JSON.stringify(BODY),
    })
      .then((res) => {
        const responses = [];
        for (let i = 0; i <= RESPONSES_TYPES.length - 1; i++) {
          switch (Number(RESPONSES_TYPES[i])) {
            case 1:
              responses.push(res.text());
              break;
            case 2:
              responses.push(JSON.stringify(res.json()));
              break;
            case 3:
              responses.push(String(res.ok));
              break;
            case 4:
              responses.push(res.status);
              break;
            case 5:
              responses.push(res.statusText);
              break;
            case 6:
              responses.push(res.type);
              break;
            case 7:
              responses.push(String(res.redirected));
              break;
            case 8:
              responses.push(res.url);
              break;
            case 9:
            default:
              responses.push(single ? res.url : String(res.bodyUsed));
              break;
          }
        }
        return Promise.all(responses);
      })
      .then((arr) => {
        let responses = "";
        for (let i = 0; i <= RESPONSES_TYPES.length - 1; i++) {
          responses += SPLIT + arr[i];
        }
        return SPLIT === "" ? responses : responses.slice(1);
      })
      .catch((err) => {
        console.error(err);
        return "";
      });
  };

  class Network {
    getInfo() {
      return {
        id: "truefantomnetwork",
        name: "Network",

        color1: "#146600",
        color2: "#125C00",
        color3: "#105200",

        menuIconURI: icon,

        blocks: [
          {
            opcode: "connected_to_internet_block",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "connected to internet?",
          },
          "---",
          {
            opcode: "browser_block",
            blockType: Scratch.BlockType.REPORTER,
            text: "browser",
          },
          "---",
          {
            opcode: "current_url_block",
            blockType: Scratch.BlockType.REPORTER,
            text: "current url",
          },
          "---",
          {
            opcode: "network_type_block",
            blockType: Scratch.BlockType.REPORTER,
            text: "network type",
          },
          {
            opcode: "network_generation_block",
            blockType: Scratch.BlockType.REPORTER,
            text: "network generation",
          },
          "---",
          {
            opcode: "downlink_speed_block",
            blockType: Scratch.BlockType.REPORTER,
            text: "downlink speed in mb/s",
          },
          {
            opcode: "downlink_max_speed_block",
            blockType: Scratch.BlockType.REPORTER,
            text: "downlink max speed in mb/s",
          },
          {
            opcode: "rtt_block",
            blockType: Scratch.BlockType.REPORTER,
            text: "rtt in ms",
          },
          "---",
          {
            opcode: "get_block",
            blockType: Scratch.BlockType.REPORTER,
            text: "get [USER_URL] respond [RESPONSES_TYPES] split by [SPLIT]",
            arguments: {
              USER_URL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "https://httpbin.org/get",
              },
              RESPONSES_TYPES: {
                type: Scratch.ArgumentType.STRING,
                menu: "only_url_response_type",
              },
              SPLIT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: " ",
              },
            },
          },
          {
            opcode: "delete_block",
            blockType: Scratch.BlockType.REPORTER,
            text: "delete [USER_URL] respond [RESPONSES_TYPES] split by [SPLIT]",
            arguments: {
              USER_URL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "https://httpbin.org/delete",
              },
              RESPONSES_TYPES: {
                type: Scratch.ArgumentType.STRING,
                menu: "only_url_response_type",
              },
              SPLIT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: " ",
              },
            },
          },
          {
            opcode: "post_block",
            blockType: Scratch.BlockType.REPORTER,
            text: "post [CONTENT_TYPE] [BODY] to [USER_URL] respond [RESPONSES_TYPES] split by [SPLIT]",
            arguments: {
              USER_URL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "https://httpbin.org/post",
              },
              BODY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "apple",
              },
              CONTENT_TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "content_type",
              },
              RESPONSES_TYPES: {
                type: Scratch.ArgumentType.STRING,
                menu: "response_type",
              },
              SPLIT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: " ",
              },
            },
          },
          {
            opcode: "put_block",
            blockType: Scratch.BlockType.REPORTER,
            text: "put [CONTENT_TYPE] [BODY] to [USER_URL] respond [RESPONSES_TYPES] split by [SPLIT]",
            arguments: {
              USER_URL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "https://httpbin.org/put",
              },
              BODY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "apple",
              },
              CONTENT_TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "content_type",
              },
              RESPONSES_TYPES: {
                type: Scratch.ArgumentType.STRING,
                menu: "response_type",
              },
              SPLIT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: " ",
              },
            },
          },
          {
            opcode: "patch_block",
            blockType: Scratch.BlockType.REPORTER,
            text: "patch [CONTENT_TYPE] [BODY] to [USER_URL] respond [RESPONSES_TYPES] split by [SPLIT]",
            arguments: {
              USER_URL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "https://httpbin.org/patch",
              },
              BODY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "apple",
              },
              CONTENT_TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "content_type",
              },
              RESPONSES_TYPES: {
                type: Scratch.ArgumentType.STRING,
                menu: "response_type",
              },
              SPLIT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: " ",
              },
            },
          },
          "---",
          {
            opcode: "open_link_block",
            blockType: Scratch.BlockType.COMMAND,
            text: "open [USER_URL] in new tab",
            arguments: {
              USER_URL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "https://extensions.turbowarp.org",
              },
            },
          },
          {
            opcode: "open_window_block",
            blockType: Scratch.BlockType.COMMAND,
            text: "open [USER_URL] in new window with width: [WIDTH] height: [HEIGHT] left: [LEFT] top: [TOP]",
            arguments: {
              USER_URL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "https://extensions.turbowarp.org",
              },
              WIDTH: {
                type: Scratch.ArgumentType.NUMBER,
                menu: "default",
              },
              HEIGHT: {
                type: Scratch.ArgumentType.NUMBER,
                menu: "default",
              },
              LEFT: {
                type: Scratch.ArgumentType.NUMBER,
                menu: "default",
              },
              TOP: {
                type: Scratch.ArgumentType.NUMBER,
                menu: "default",
              },
            },
          },
          {
            opcode: "redirect_link_block",
            blockType: Scratch.BlockType.COMMAND,
            text: "redirect this tab to [USER_URL]",
            arguments: {
              USER_URL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "https://extensions.turbowarp.org",
              },
            },
          },
        ],

        menus: {
          content_type: {
            acceptReporters: true,
            items: [
              {
                text: "(1) text",
                value: "1",
              },
              {
                text: "(2) json",
                value: "2",
              },
            ],
          },
          only_url_response_type: {
            acceptReporters: true,
            items: [
              {
                text: "(1) text",
                value: "1",
              },
              {
                text: "(2) json",
                value: "2",
              },
              {
                text: "(3) status ok?",
                value: "3",
              },
              {
                text: "(4) status",
                value: "4",
              },
              {
                text: "(5) status text",
                value: "5",
              },
              {
                text: "(5 1) status text and text",
                value: "5 1",
              },
              {
                text: "(6) type",
                value: "6",
              },
              {
                text: "(6 4) type and status",
                value: "6 4",
              },
              {
                text: "(7) redirected?",
                value: "7",
              },
              {
                text: "(8) url",
                value: "8",
              },
            ],
          },
          response_type: {
            acceptReporters: true,
            items: [
              {
                text: "(1) text",
                value: "1",
              },
              {
                text: "(2) json",
                value: "2",
              },
              {
                text: "(3) status ok?",
                value: "3",
              },
              {
                text: "(4) status",
                value: "4",
              },
              {
                text: "(5) status text",
                value: "5",
              },
              {
                text: "(5 1) status text and text",
                value: "5 1",
              },
              {
                text: "(6) type",
                value: "6",
              },
              {
                text: "(6 4) type and status",
                value: "6 4",
              },
              {
                text: "(7) redirected?",
                value: "7",
              },
              {
                text: "(8) url",
                value: "8",
              },
              {
                text: "(9) body used?",
                value: "9",
              },
            ],
          },
          default: {
            acceptReporters: true,
            items: [
              {
                text: "default",
                value: "default",
              },
            ],
          },
        },
      };
    }

    connected_to_internet_block() {
      try {
        return navigator.onLine;
      } catch (err) {
        return false;
      }
    }
    browser_block() {
      try {
        let has = (input) => navigator.userAgent.includes(input);
        if (has("Firefox")) return "firefox";
        if (has("SamsungBrowser")) return "samsung internet";
        if ((has("Opera") || has("OPR")) && has("GX")) return "opera gx";
        if (has("Opera") || has("OPR")) return "opera";
        if (has("Trident")) return "internet explorer";
        if (has("Edge")) return "legacy";
        if (has("Edg")) return "edge";
        if (has("YaBrowser") || has("YaSearchBrowser")) return "yandex";
        if (has("Miui")) return "mi browser";
        if (has("UBrowser")) return "uc browser";
        if (has("Chrome")) return "chromium";
        if (has("Safari")) return "safari";
        return "";
      } catch (err) {
        return "";
      }
    }
    current_url_block() {
      try {
        return document.URL || "";
      } catch (err) {
        return "";
      }
    }
    network_type_block() {
      try {
        switch (navigator.connection.type) {
          case "bluetooth":
            return "bluetooth";
          case "cellular":
            return "cellular";
          case "ethernet":
            return "ethernet";
          case "wifi":
            return "wi-fi";
          case "wimax":
            return "wimax";
          default:
            return "";
        }
      } catch (err) {
        return "";
      }
    }
    network_generation_block() {
      try {
        switch (navigator.connection.effectiveType) {
          case "slow-2g":
          case "2g":
            return "2g";
          case "3g":
            return "3g";
          case "4g":
            return "4g";
          default:
            return "";
        }
      } catch (err) {
        return "";
      }
    }
    downlink_speed_block() {
      try {
        return navigator.connection.downlink || "";
      } catch (err) {
        return "";
      }
    }
    downlink_max_speed_block() {
      try {
        return navigator.connection.downlinkMax || "";
      } catch (err) {
        return "";
      }
    }
    rtt_block() {
      try {
        return navigator.connection.rtt || "";
      } catch (err) {
        return "";
      }
    }
    get_block(args) {
      return fetch_url(args, "GET");
    }
    delete_block(args) {
      return fetch_url(args, "DELETE");
    }
    post_block(args) {
      return fetch_url(args, "POST");
    }
    put_block(args) {
      return fetch_url(args, "PUT");
    }
    patch_block(args) {
      return fetch_url(args, "PATCH");
    }
    open_link_block({ USER_URL }) {
      Scratch.openWindow(USER_URL);
    }
    open_window_block({ USER_URL, WIDTH, HEIGHT, LEFT, TOP }) {
      let params = "popup=1";
      params += isNaN(WIDTH)
        ? ""
        : `,width=${
            Number(WIDTH) < 100
              ? 100
              : Number(WIDTH) > window.screen.width
              ? window.screen.width
              : Number(WIDTH)
          }`;
      params += isNaN(HEIGHT)
        ? ""
        : `,height=${
            Number(HEIGHT) < 100
              ? 100
              : Number(HEIGHT) > window.screen.height
              ? window.screen.height
              : Number(HEIGHT)
          }`;
      params += isNaN(LEFT)
        ? ""
        : `,left=${
            Number(LEFT) < 0
              ? 0
              : Number(LEFT) > window.screen.width
              ? window.screen.width
              : Number(LEFT)
          }`;
      params += isNaN(TOP)
        ? ""
        : `,top=${
            Number(TOP) < 0
              ? 0
              : Number(TOP) > window.screen.height
              ? window.screen.height
              : Number(TOP)
          }`;
      Scratch.openWindow(String(USER_URL), params);
    }
    redirect_link_block({ USER_URL }) {
      Scratch.redirect(USER_URL);
    }
  }

  Scratch.extensions.register(new Network());
})(Scratch);
