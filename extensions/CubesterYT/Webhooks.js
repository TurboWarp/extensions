// Name: Webhooks
// ID: cubesterWebhooks
// Description: A modern, very capable, Webhook extension.
// By: CubesterYT <https://scratch.mit.edu/users/CubesterYT/>
// License: MPL-2.0

// Version V.1.0.0

(function (Scratch) {
  "use strict";

  const icon =
    "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgoKPHN2ZwogICB3aWR0aD0iNjQiCiAgIGhlaWdodD0iNjQiCiAgIHZpZXdCb3g9IjAgMCAxNi45MzMzMzMgMTYuOTMzMzMzIgogICB2ZXJzaW9uPSIxLjEiCiAgIGlkPSJzdmcxIgogICB4bWw6c3BhY2U9InByZXNlcnZlIgogICBpbmtzY2FwZTp2ZXJzaW9uPSIxLjQgKDg2YThhZDcsIDIwMjQtMTAtMTEpIgogICBzb2RpcG9kaTpkb2NuYW1lPSJXZWJob29rc0ljb24uc3ZnIgogICB4bWxuczppbmtzY2FwZT0iaHR0cDovL3d3dy5pbmtzY2FwZS5vcmcvbmFtZXNwYWNlcy9pbmtzY2FwZSIKICAgeG1sbnM6c29kaXBvZGk9Imh0dHA6Ly9zb2RpcG9kaS5zb3VyY2Vmb3JnZS5uZXQvRFREL3NvZGlwb2RpLTAuZHRkIgogICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxzb2RpcG9kaTpuYW1lZHZpZXcKICAgICBpZD0ibmFtZWR2aWV3MSIKICAgICBwYWdlY29sb3I9IiM1MDUwNTAiCiAgICAgYm9yZGVyY29sb3I9IiNmZmZmZmYiCiAgICAgYm9yZGVyb3BhY2l0eT0iMSIKICAgICBpbmtzY2FwZTpzaG93cGFnZXNoYWRvdz0iMCIKICAgICBpbmtzY2FwZTpwYWdlb3BhY2l0eT0iMCIKICAgICBpbmtzY2FwZTpwYWdlY2hlY2tlcmJvYXJkPSIxIgogICAgIGlua3NjYXBlOmRlc2tjb2xvcj0iIzUwNTA1MCIKICAgICBpbmtzY2FwZTpkb2N1bWVudC11bml0cz0icHgiCiAgICAgaW5rc2NhcGU6em9vbT0iOC4xOCIKICAgICBpbmtzY2FwZTpjeD0iMzIuMjczODM5IgogICAgIGlua3NjYXBlOmN5PSIzMy4wNjg0NiIKICAgICBpbmtzY2FwZTp3aW5kb3ctd2lkdGg9IjE5MjAiCiAgICAgaW5rc2NhcGU6d2luZG93LWhlaWdodD0iMTAxNyIKICAgICBpbmtzY2FwZTp3aW5kb3cteD0iLTgiCiAgICAgaW5rc2NhcGU6d2luZG93LXk9Ii04IgogICAgIGlua3NjYXBlOndpbmRvdy1tYXhpbWl6ZWQ9IjEiCiAgICAgaW5rc2NhcGU6Y3VycmVudC1sYXllcj0ibGF5ZXIxIiAvPjxkZWZzCiAgICAgaWQ9ImRlZnMxIiAvPjxnCiAgICAgaW5rc2NhcGU6bGFiZWw9IkxheWVyIDEiCiAgICAgaW5rc2NhcGU6Z3JvdXBtb2RlPSJsYXllciIKICAgICBpZD0ibGF5ZXIxIj48Y2lyY2xlCiAgICAgICBzdHlsZT0ib3BhY2l0eToxO2ZpbGw6I2M3M2E2MztzdHJva2Utd2lkdGg6MC4yNzA0NDc7ZmlsbC1vcGFjaXR5OjEiCiAgICAgICBpZD0icGF0aDIiCiAgICAgICBjeD0iOC40NjY2NjYyIgogICAgICAgY3k9IjguNDY2NjY2MiIKICAgICAgIHI9IjguNDY2NjY2MiIgLz48cGF0aAogICAgICAgZmlsbD0iIzAwMDAwMCIKICAgICAgIGQ9Ik0gOC4yMTUyMjc2LDIuNzMyNjkgSCA4LjIwMDg5MzkgTCA4LjA1NzU0NDYsMi43NjEzNTc0IFEgNy41ODQ0OTIzLDIuODE4NzAzMyA3LjEzMjk0MjcsMy4wMjY1NTQzIDYuNjgxMzkyMSwzLjIzNDQwOTggNi4zMzczNTMxLDMuNTc4NDQ4NyA1Ljc0OTYyMTEsNC4xMDg4NDE0IDUuNTIwMjYyOSw0Ljg4MjkyNzIgNS4zOTEyNDg0LDUuMzEyOTc1IDUuNDA1NTgzMyw1Ljc4NjAyNzQgNS40MTk5MTcsNi4yNTkwNzk3IDUuNTc3NjAyMiw2LjY4OTEyNzYgNS44MjEyOTYzLDcuMzM0MTk5OSA2LjMyMzAxODMsNy44MDcyNTIzIEwgNi41MDkzNzMxLDcuOTc5MjcxMiA1LjMxOTU3MzIsOS45MTQ0ODYxIFEgNC45NDY4NjU3LDkuOTAwMTUyMSA0LjY3NDUwMiwxMC4wMTQ4MzMgcSAtMC40MzAwNDc5LDAuMTg2MzU1IC0wLjY0NTA3MTMsMC41NzMzOTggLTAuMTAwMzQ3LDAuMjE1MDI0IC0wLjEyOTAxNDUsMC40NDQzODIgLTAuMDI4NjY3LDAuMjI5MzU5IDAuMDI4NjY4LDAuNDU4NzE4IDAuMTE0Njc5NiwwLjQzMDA0NyAwLjQ3MzA1MjMsMC42ODgwNzYgMC4yMTUwMjQ1LDAuMTQzMzUgMC40NzMwNTIzLDAuMjA3ODU3IDAuMjU4MDI5LDAuMDY0NTEgMC41MTYwNTc5LDAuMDI4NjcgMC4yNTgwMjksLTAuMDM1ODQgMC40OTQ1NTUxLC0wLjE3OTE4NSAwLjIzNjUyNjIsLTAuMTQzMzUgMC4zOTQyMTAzLC0wLjM1ODM3NCAwLjE3MjAxOSwtMC4yNDM2OTMgMC4yMDc4NTY2LC0wLjU1OTA2MSAwLjAzNTg0LC0wLjMxNTM3IC0wLjA3ODg0MSwtMC41ODc3MzQgLTAuMDE0MzM0LC0wLjA3MTY4IC0wLjEwMDM0NywtMC4yMDA2ODggTCA2LjI2NTY3OSwxMC40NDQ4NzUgNy45NTcyMDA5LDcuNjkyNTcwNCBRIDguMDQzMjE0Miw3LjU2MzU1NTkgOC4wNzE4ODA1LDcuNDkxODgwOCBMIDcuOTI4NTMxMiw3LjQ0ODg3OTYgUSA3Ljc5OTUxNjgsNy40MjAyMTIyIDcuNzQyMTc2NCw3LjM5MTU0NDcgNy40MTI0NzMzLDcuMjQ4MTk1NCA3LjE0NzI3NzUsNi45OTczMzQ0IDYuODgyMDgwNiw2Ljc0NjQ3MzUgNi43Mzg3MzEzLDYuNDMxMTA1MiA2LjQ5NTAzODMsNS45MTUwNDczIDYuNjA5NzE2OSw1LjM1NTk4NSA2LjY2NzA1MTcsNS4wMjYyODIgNi44NTM0MTEsNC43Mzk1ODM0IDcuMDM5NzY0Nyw0LjQ1Mjg4NDggNy4yOTc3OTM3LDQuMjUyMTk2MiA3LjgyODE4NjQsMy44NjUxNTI4IDguNDczMjU3NywzLjg2NTE1MjggOC44NjAzMDExLDMuODUwODE5MSA5LjIyNTg0MTcsNC4wMDEzMzQxIDkuNTkxMzgyMyw0LjE1MTg1MTQgOS44NjM3NDYxLDQuNDM4NTUgcSAwLjI0MzY5MjksMC4yMjkzNTgyIDAuMzc5ODc0OSwwLjU1MTg5NDQgMC4xMzYxODEsMC4zMjI1MzYxIDAuMTUwNTE3LDAuNjUyMjM5MiAwLDAuMjQzNjk0MSAtMC4wODYwMSwwLjYwMjA2NjggbCAxLjAwMzQ0NSwwLjI3MjM2MzggMC4xMTQ2NzksMC4wMTQzMzQgUSAxMS42MjY5MzgsNS45MTUwNDYyIDExLjUyNjU5Niw1LjI5ODY0NDYgMTEuNDY5MjYxLDQuODI1NTkyMyAxMS4yNDcwNjYsNC4zODgzNzY1IDExLjAyNDg3NCwzLjk1MTE2MDYgMTAuNjgwODM3LDMuNjIxNDU3NiAxMC4wNzg3NjksMy4wMTkzOTA4IDkuMjA0MzQsMi44MTg3MDIyIDkuMTE4MzI2NywyLjc5MDAzNDggOC45NDYzMTExLDIuNzYxMzU2MyBMIDguNzQ1NjIxNCwyLjczMjY4ODkgWiBtIDAuMjU4MDI3OSwxLjc3NzUzMDggcSAtMC4yNDM2OTMxLDAgLTAuNDg3Mzg3MiwwLjEwMDM0NyBRIDcuNzQyMTc0Miw0LjcxMDkxNDggNy41NDg2NTI1LDQuOTA0NDM0MyA3LjM1NTEzMTksNS4wOTc5NTUgNy4yNjkxMjE4LDUuMzU1OTgzOSA3LjE1NDQ0MjIsNS42NDI2ODI1IDcuMjExNzg2OCw1Ljk4NjcyMTQgcSAwLjA0MzAwMSwwLjI1ODAyNzkgMC4yMDA2ODg1LDAuNDg3Mzg3MiAwLjE1NzY4NDEsMC4yMjkzNTkzIDAuNDAxMzc4MywwLjM1ODM3MzggMC4zNDQwMzc4LDAuMjE1MDIzNCAwLjgwMjc1NTMsMC4xODYzNTI2IDAuMDQzMDAxLDAuMDU3MzQ2IDAuMDcxNjgsMC4xMTQ2ODA4IEwgMTAuMjkzOCw5Ljg3MTQ4NiBxIDAuMDQzLDAuMDg2MDEzIDAuMDg2MDEsMC4xMjkwMTQgMC4zODcwNDQsLTAuMzcyNzA3IDAuODM4NTk0LC0wLjUwODg4OTQgMC40NTE1NTEsLTAuMTM2MTgxNCAwLjkzMTc3LC0wLjA1MDE3MyAwLjQ4MDIyLDAuMDg2MDEzIDAuODM4NTk0LDAuMzcyNzA3NiAwLjQ1ODcxNywwLjM1ODM3MjggMC42MjM1NywwLjg4MTU5ODggMC4xNjQ4NTEsMC41MjMyMjUgMC4wMDcxLDEuMDUzNjE3IC0wLjExNDY4LDAuNDAxMzc4IC0wLjQwODU0NSwwLjcxNjc0NyAtMC4yOTM4NjcsMC4zMTUzNjggLTAuNjk1MjQ1LDAuNDczMDUyIC0wLjQ0NDM4MywwLjE4NjM1NCAtMC45NTMyNzMsMC4xMjE4NDcgLTAuNTA4ODksLTAuMDY0NTEgLTAuOTEwMjY3LC0wLjM1MTIwNiAtMC4wNTczNCwtMC4wNDMgLTAuMTg2MzU0LC0wLjE0MzM0OSBsIC0wLjA3MTY4LC0wLjA4NjAxIHEgLTAuMDU3MzQsMC4wNDMgLTAuMTU3Njg1LDAuMTQzMzUgbCAtMC42NzM3Mzk5LDAuNjU5NDA2IHEgMC4zMjk3MDMsMC4zMjk3MDQgMC43NDU0MTQ5LDAuNTUxODk0IDAuNDE1NzEzLDAuMjIyMTkyIDAuODc0NDMsMC4zMDgyMDIgbCAwLjMxNTM2OSwwLjA1NzM1IGggMC41NTkwNjIgbCAwLjQwMTM3OCwtMC4wNzE2OCBxIDAuOTE3NDM1LC0wLjE4NjM1NCAxLjU3Njg0MiwtMC44NjAwOTYgMC4zMTUzNjksLTAuMzE1MzY4IDAuNTIzMjI1LC0wLjcyMzkxNCAwLjIwNzg1NywtMC40MDg1NDUgMC4yNzk1MzEsLTAuODUyOTI4IDAuMDcxNjgsLTAuNTE2MDU3IC0wLjAyODY3LC0xLjAyNDk0OCBRIDE0LjcwODkzOSwxMC4xNTgxODEgMTQuNDUwOTE0LDkuNzQyNDY4MyAxNC4xOTI4ODUsOS4zMjY3NTUyIDEzLjgyMDE3Niw5LjAxMTM4NyAxMy40NDc0NjksOC42OTYwMTc3IDEzLjAwMzA4Niw4LjUwOTY2MzkgMTIuNTE1Njk4LDguMzA4OTc1MyAxMS45OTI0NzMsOC4yODAzMDU3IDExLjQ2OTI0OCw4LjI1MTYzODMgMTAuOTY3NTI1LDguMzgwNjUyNyBMIDEwLjcyMzgzMiw4LjQ1MjMzMjMgOS41NjI3MDM5LDYuNDg4NDQ2NyBRIDkuNzQ5MDU3Nyw2LjIxNjA4MjkgOS43OTIwNjMyLDUuOTU4MDU0IDkuODYzNzMxOCw1LjQ5OTMzNjUgOS42MDU3MDg0LDUuMDk3OTU4MyA5LjM3NjM1MDIsNC43Mzk1ODU2IDguOTc0OTcxOSw0LjU5NjIzNjMgOC43MzEyNzc4LDQuNTEwMjIzIDguNDczMjQ4OSw0LjUxMDIyMyBaIE0gNC40MzA4MDU3LDguMjk0NjQxNiBRIDMuNTk5MzgwNiw4LjQ4MDk5NjUgMi45OTczMTI3LDkuMDU0MzkzNiAyLjMyMzU3MTgsOS42ODUxMzAxIDIuMTIyODc3OCwxMC41NTk1NjEgbCAtMC4wNTczMTMsMC4zNDQwMzggdiAwLjUzMDM5MiBsIDAuMDI4NzExLDAuMTU3Njg0IHEgMC4wMjg3MTIsMC4xODYzNTUgMC4wNTczMTMsMC4yODY2OTkgMC4xMDAzMzYsMC40NDQzODMgMC4zNTEyMDE0LDAuODQ1NzYyIDAuMjUwODYyMSwwLjQwMTM3NyAwLjYwOTIzNDgsMC43MDI0MTEgMC43MTY3NDY1LDAuNTg3NzMyIDEuNjQ4NTE3NCwwLjcwMjQxMSAwLjU0NDcyNjQsMC4wNTczNCAxLjA4OTQ1NCwtMC4wNjQ1MSAwLjU0NDcyNzUsLTAuMTIxODQ3IDEuMDAzNDQ1LC0wLjQwODU0NSAwLjc1OTc1MDksLTAuNDg3Mzg4IDEuMTE4MTI0NywtMS4zMDQ0OCAwLjEwMDM0NywtMC4yNDM2OTMgMC4yMDA2ODg2LC0wLjY0NTA3MSAwLjA4NjAxMywtMC4wMTQzMyAwLjI1ODAyODksMCBsIDEuNzkxODY2NCwwLjAyODY3IHEgMC4yMDA2ODgsMCAwLjI4NjY5NywwLjAxNDMzIDAuMTU3Njg0LDAuMjg2NyAwLjM1ODM3NCwwLjQ0NDM4NCAwLjIwMDY4OSwwLjE1NzY4MyAwLjQ1MTU1MSwwLjIyOTM1OCAwLjI1MDg2MSwwLjA3MTY4IDAuNTA4ODg5LDAuMDU3MzQgMC40MDEzNzksLTAuMDQzIDAuNzE2NzQ2LC0wLjI4NjY5NyAwLjM4NzA0MywtMC4zMDEwMzUgMC40NTg3MTksLTAuNzc0MDg3IDAuMDI4NjcsLTAuMjQzNjkzIC0wLjAyMTUxLC0wLjQ3MzA1MyAtMC4wNTAxNywtMC4yMjkzNTggLTAuMTkzNTIyLC0wLjQzMDA0OCAtMC4yMjkzNTgsLTAuMzE1MzY4IC0wLjU4NzczMiwtMC40NTg3MTcgLTAuMjQzNjk0LC0wLjEwMDM0NzEgLTAuNTA4ODksLTAuMDkzMTc1IC0wLjI2NTE5NiwwLjAwNzE1IC0wLjUwODg5LDAuMTA3NTA5IC0wLjQwMTM3NywwLjE3MjAxOSAtMC42MTY0MDIsMC41MzAzOTEgbCAtMC4wNDMsMC4wODYwMSBxIC0wLjIwMDY4OSwwIC0wLjYwMjA2NzIsLTAuMDE0MzMgTCA4LjMwMTI2NjEsMTAuNjU5OTA3IFEgOC4wODYyNDI3LDEwLjY0NTU3NyA3LjY4NDg2NDUsMTAuNjQ1NTc3IEwgNi45NjgxMTgsMTAuNjMxMjQ3IDcuMDExMTE5LDEwLjg3NDk0IFEgNy4xMjU4MDIzLDExLjQ5MTMzIDYuODI0NzY4OSwxMi4wMzYwNTggNi42MjQwODAzLDEyLjQyMzEgNi4yNTEzNzE3LDEyLjY4MTEyOSA1Ljg3ODY2MzEsMTIuOTM5MTU4IDUuNDM0MjgwNCwxMi45OTY0OTggNC45MzI1NTg0LDEzLjA4MjUxMSA0LjQzMDgzNTQsMTIuODg4OTg5IDMuOTI5MTEzNCwxMi42OTU0NjggMy42MTM3NDUyLDEyLjI3OTc1NCAzLjIxMjM2NjksMTEuNzc4MDMyIDMuMjI2NzAxOCwxMS4xNDcyOTYgMy4yNDEwMzU1LDEwLjYxNjkwMyAzLjU1NjQwNDgsMTAuMTU4MTg2IDMuNzQyNzU5Niw5Ljg4NTgyMDggNC4wMTUxMjIzLDkuNjk5NDY4MiA0LjI4NzQ4NjEsOS41MTMxMTM0IDQuNjAyODU0Myw5LjQyNzEwMzMgbCAwLjEyOTAxNDUsLTAuMDQzMDAxIHoiCiAgICAgICBpZD0icGF0aDEiCiAgICAgICBzdHlsZT0iZmlsbDojZmZmZmZmO3N0cm9rZS13aWR0aDowLjAxNDMzNDkiIC8+PC9nPjwvc3ZnPgo=";

  const runtime = Scratch.vm.runtime;
  const keys = Object.keys;

  let hideFromPalette = true;
  let webhooks;
  function setupStorage() {
    if (!runtime.extensionStorage["cubesterWebhooks"]) {
      runtime.extensionStorage["cubesterWebhooks"] = {
        webhooks: {}
      };
    }
    webhooks = runtime.extensionStorage["cubesterWebhooks"].webhooks;
  }
  setupStorage();
  runtime.on("PROJECT_LOADED", setupStorage);

  function isURLValid(string) {
    try {
      const url = new URL(string);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch (error) {
      return false;
    }
  }

  function toForm(data) {
    const parts = [];
    const process = (name, value) => {
      if (value === null || value === undefined) {
        parts.push(`${encodeURIComponent(name)}=null`);
      } else if (
        typeof value === "string" ||
        typeof value === "number" ||
        typeof value === "boolean"
      ) {
        parts.push(`${encodeURIComponent(name)}=${encodeURIComponent(value)}`);
      } else if (Array.isArray(value)) {
        value.forEach((elem, index) => process(`${name}[${index}]`, elem));
      } else if (typeof value === "object") {
        keys(value).forEach((key) => process(`${name}[${key}]`, value[key]));
      }
    };
    keys(data).forEach((key) => process(key, data[key]));
    return parts.join("&");
  }

  class Webhooks {
    getInfo() {
      return {
        id: "cubesterWebhooks",
        name: Scratch.translate("Webhooks"),
        color1: "#C73A63",
        menuIconURI: icon,
        docsURI: "https://extensions.turbowarp.org/CubesterYT/Webhooks",

        blocks: [
          "---",

          {
            func: "addWebhook",
            text: Scratch.translate("Add a Webhook"),
            blockType: Scratch.BlockType.BUTTON,
          },
          {
            func: "deleteWebhook",
            text: Scratch.translate("Delete a Webhook"),
            blockType: Scratch.BlockType.BUTTON,
            hideFromPalette,
          },
          {
            opcode: "data",
            text: Scratch.translate("data of [WEBHOOK]"),
            blockType: Scratch.BlockType.REPORTER,
            disableMonitor: true,
            hideFromPalette,
            arguments: {
              WEBHOOK: {
                type: Scratch.ArgumentType.STRING,
                menu: "WEBHOOKS",
              },
            },
          },
          {
            opcode: "setData",
            text: Scratch.translate(
              "set data of [WEBHOOK] to [JSON] and type to [TYPE]"
            ),
            blockType: Scratch.BlockType.COMMAND,
            hideFromPalette,
            arguments: {
              WEBHOOK: {
                type: Scratch.ArgumentType.STRING,
                menu: "WEBHOOKS",
              },
              JSON: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '{"key":"value"}',
              },
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "TYPE",
              },
            },
          },
          {
            opcode: "postData",
            text: Scratch.translate("send data to [WEBHOOK]"),
            blockType: Scratch.BlockType.COMMAND,
            hideFromPalette,
            arguments: {
              WEBHOOK: {
                type: Scratch.ArgumentType.STRING,
                menu: "WEBHOOKS",
              },
            },
          },
        ],
        menus: {
          WEBHOOKS: {
            acceptReporters: false,
            items: "_webhookMenu",
          },
          TYPE: {
            acceptReporters: false,
            items: ["application/json", "application/x-www-form-urlencoded"],
          },
        },
      };
    }

    addWebhook() {
      let name;
      do {
        name = prompt(Scratch.translate("Enter Webhook name:"));
        if (name === null) {
          return;
        }
        if (name === "") {
          alert(
            Scratch.translate(
              "Please enter a name with at least one character!"
            )
          );
        }
        if (keys(webhooks).includes(name)) {
          alert(
            Scratch.translate(
              "This Webhook already exists! Please try a different name."
            )
          );
        }
      } while (keys(webhooks).includes(name) || name === "");
      let URL;
      do {
        URL = prompt(Scratch.translate("Enter Webhook URL:"));
        if (URL === null) {
          return;
        }
        if (!isURLValid(URL)) {
          alert(
            Scratch.translate(
              "Invalid URL! Please make sure you provide a valid URL."
            )
          );
        }
      } while (!isURLValid(URL));
      webhooks[name] = { URL, DATA: {}, TYPE: "application/json" };
      hideFromPalette = false;
      Scratch.vm.extensionManager.refreshBlocks("cubesterWebhooks");
    }
    deleteWebhook() {
      let name;
      do {
        name = prompt(Scratch.translate("Enter Webhook name:"));
        if (name === null) {
          return;
        }
        if (!keys(webhooks).includes(name)) {
          alert(
            Scratch.translate(
              "This Webhook does not exist. Please enter a valid webhook name."
            )
          );
        }
      } while (!keys(webhooks).includes(name));
      delete webhooks[name];
      if (keys(webhooks).length === 0) {
        hideFromPalette = true;
      }
      Scratch.vm.extensionManager.refreshBlocks("cubesterWebhooks");
    }
    data(args) {
      try {
        switch (webhooks[args.WEBHOOK].TYPE) {
          case "application/x-www-form-urlencoded":
            return toForm(webhooks[args.WEBHOOK].DATA);
          default:
            return JSON.stringify(webhooks[args.WEBHOOK].DATA);
        }
      } catch (error) {
        return "";
      }
    }
    setData(args) {
      try {
        webhooks[args.WEBHOOK].DATA = JSON.parse(
          Scratch.Cast.toString(args.JSON)
        );
        webhooks[args.WEBHOOK].TYPE = args.TYPE;
      } catch (error) {
        return;
      }
    }
    postData(args) {
      try {
        Scratch.fetch(webhooks[args.WEBHOOK].URL, {
          method: "POST",
          headers: {
            "Content-type": webhooks[args.WEBHOOK].TYPE,
          },
          body:
            webhooks[args.WEBHOOK].TYPE === "application/json"
              ? JSON.stringify(webhooks[args.WEBHOOK].DATA)
              : toForm(webhooks[args.WEBHOOK].DATA),
        });
      } catch (error) {
        return;
      }
    }

    _webhookMenu() {
      if (keys(webhooks).length > 0) {
        return keys(webhooks);
      } else {
        return [""];
      }
    }
  }

  Scratch.extensions.register(new Webhooks());
})(Scratch);
