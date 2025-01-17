// Name: Webhooks
// ID: cubesterWebhooks
// Description: A modern, very capable, Webhook extension.
// By: CubesterYT <https://scratch.mit.edu/users/CubesterYT/>
// License: MPL-2.0

// Version V.1.0.0

(function (Scratch) {
  "use strict";

  const icon = "";

  let hideFromPalette = true;
  let webhooks;
  function setupStorage() {
    if (!Scratch.vm.runtime.extensionStorage["cubesterWebhooks"]) {
      Scratch.vm.runtime.extensionStorage["cubesterWebhooks"] =
        Object.create(null);
      Scratch.vm.runtime.extensionStorage["cubesterWebhooks"].webhooks =
        Object.create(null);
    }
    webhooks = Scratch.vm.runtime.extensionStorage["cubesterWebhooks"].webhooks;
  }
  setupStorage();
  Scratch.vm.runtime.on("PROJECT_LOADED", setupStorage);

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
        Object.keys(value).forEach((key) =>
          process(`${name}[${key}]`, value[key])
        );
      }
    };
    Object.keys(data).forEach((key) => process(key, data[key]));
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
        if (Object.keys(webhooks).includes(name)) {
          alert(
            Scratch.translate(
              "This Webhook already exists! Please try a different name."
            )
          );
        }
      } while (Object.keys(webhooks).includes(name));
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
      Scratch.vm.extensionManager.refreshBlocks();
    }
    deleteWebhook() {
      let name;
      do {
        name = prompt(Scratch.translate("Enter Webhook name:"));
        if (name === null) {
          return;
        }
        if (!Object.keys(webhooks).includes(name)) {
          alert(
            Scratch.translate(
              "This Webhook does not exist. Please enter a valid webhook name."
            )
          );
        }
      } while (!Object.keys(webhooks).includes(name));
      delete webhooks[name];
      if (Object.keys(webhooks).length === 0) {
        hideFromPalette = true;
        Scratch.vm.extensionManager.refreshBlocks();
      }
    }
    data(args) {
      try {
        switch (webhooks[args.WEBHOOK].TYPE) {
          case "application/json":
            return JSON.stringify(webhooks[args.WEBHOOK].DATA);
          case "application/x-www-form-urlencoded":
            return toForm(webhooks[args.WEBHOOK].DATA);
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
      if (Object.keys(webhooks).length > 0) {
        return Object.keys(webhooks);
      } else {
        return [""];
      }
    }
  }

  Scratch.extensions.register(new Webhooks());
})(Scratch);
