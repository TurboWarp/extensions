/*!
 * Discord API - By LilyMakesThings - Version 2.0
 */

(function (Scratch) {
  "use strict";

  const vm = Scratch.vm;
  const runtime = vm.runtime;

  if (!runtime.extensionStorage || Scratch.extensions.isPenguinMod)
    return alert("The VM is outdated!");

  let discordIcon =
    "data:image/png;base64,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";
  let webhookIcon =
    "data:image/png;base64,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";
  let embedIcon =
    "data:image/png;base64,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";

  class DiscordAPI {
    constructor() {
      vm.runtime.on("PROJECT_LOADED", this.setupExtensionStorage);
      this.setupExtensionStorage();
    }

    // Note to GarboMuffin: would be very cool if this was called automatically by the extensionManager...
    setupExtensionStorage() {
      if (!runtime.extensionStorage["lmsDiscordAPI"]) {
        runtime.extensionStorage["lmsDiscordAPI"] = Object.create(null);
        runtime.extensionStorage["lmsDiscordAPI"].webhooks =
          Object.create(null);
        runtime.extensionStorage["lmsDiscordAPI"].embeds = Object.create(null);
      }

      this.webhooks = runtime.extensionStorage["lmsDiscordAPI"].webhooks;
      this.embeds = runtime.extensionStorage["lmsDiscordAPI"].embeds;

      this.webhookHidden = Object.keys(this.webhooks).length === 0;
      this.embedHidden = Object.keys(this.embeds).length === 0;
    }

    getInfo() {
      return {
        id: "lmsDiscordAPI",
        name: "Discord API",
        color1: "#586aea",
        color2: "#4b5ad2",
        color3: "#3747bd",
        menuIconURI: discordIcon,
        blocks: [
          {
            blockType: Scratch.BlockType.BUTTON,
            text: "Add Webhook",
            func: "_addWebhook",
            disableMonitor: true,
          },
          {
            blockType: Scratch.BlockType.BUTTON,
            text: "Remove Webhook",
            func: "_deleteWebhook",
            disableMonitor: true,
            hideFromPalette: this.webhookHidden,
          },
          {
            opcode: "setWebhookAttribute",
            blockType: Scratch.BlockType.COMMAND,
            blockIconURI: webhookIcon,
            text: "set [ATTRIBUTE] for [WEBHOOK] to [STRING]",
            arguments: {
              ATTRIBUTE: {
                type: Scratch.ArgumentType.STRING,
                menu: "webhookAttributeMenu",
              },
              WEBHOOK: {
                type: Scratch.ArgumentType.STRING,
                menu: "webhookMenu",
              },
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "GarboMuffin",
              },
            },
            hideFromPalette: this.webhookHidden,
          },
          {
            opcode: "sendMessage",
            blockType: Scratch.BlockType.COMMAND,
            blockIconURI: webhookIcon,
            text: "send [TYPE] [STRING] to [WEBHOOK] embed [EMBED]",
            arguments: {
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "sendTypeMenu",
                defaultValue: "text",
              },
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Hello!",
              },
              WEBHOOK: {
                type: Scratch.ArgumentType.STRING,
                menu: "webhookMenu",
              },
              EMBED: {
                type: Scratch.ArgumentType.STRING,
                menu: "embedMenu",
              },
            },
            hideFromPalette: this.webhookHidden,
          },
          {
            opcode: "getWebhookAttribute",
            blockType: Scratch.BlockType.REPORTER,
            blockIconURI: webhookIcon,
            text: "[ATTRIBUTE] for [WEBHOOK]",
            arguments: {
              ATTRIBUTE: {
                type: Scratch.ArgumentType.STRING,
                menu: "webhookAttributeMenu",
              },
              WEBHOOK: {
                type: Scratch.ArgumentType.STRING,
                menu: "webhookMenu",
              },
            },
            hideFromPalette: this.webhookHidden,
          },
          "---",
          {
            blockType: Scratch.BlockType.BUTTON,
            text: "Create Embed",
            func: "_createEmbed",
            disableMonitor: true,
          },
          {
            blockType: Scratch.BlockType.BUTTON,
            text: "Remove Embed",
            func: "_deleteEmbed",
            disableMonitor: true,
            hideFromPalette: this.embedHidden,
          },
          {
            opcode: "getEmbedAttribute",
            blockType: Scratch.BlockType.REPORTER,
            blockIconURI: embedIcon,
            text: "[ATTRIBUTE] of [EMBED]",
            arguments: {
              ATTRIBUTE: {
                type: Scratch.ArgumentType.STRING,
                menu: "embedAttributeMenu",
              },
              EMBED: {
                type: Scratch.ArgumentType.STRING,
                menu: "embedMenu",
              },
            },
            hideFromPalette: this.embedHidden,
          },
          "---",
          {
            opcode: "setEmbedAttribute",
            blockType: Scratch.BlockType.COMMAND,
            blockIconURI: embedIcon,
            text: "set [ATTRIBUTE] for [EMBED] to [STRING]",
            arguments: {
              ATTRIBUTE: {
                type: Scratch.ArgumentType.STRING,
                menu: "embedAttributeMenu",
              },
              EMBED: {
                type: Scratch.ArgumentType.STRING,
                menu: "embedMenu",
              },
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Announcement",
              },
            },
            hideFromPalette: this.embedHidden,
          },
          {
            opcode: "setEmbedColor",
            blockType: Scratch.BlockType.COMMAND,
            blockIconURI: embedIcon,
            text: "set color for [EMBED] to [COLOR]",
            arguments: {
              EMBED: {
                type: Scratch.ArgumentType.STRING,
                menu: "embedMenu",
              },
              COLOR: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#5ee59d",
              },
            },
            hideFromPalette: this.embedHidden,
          },
          {
            opcode: "setEmbedAuthor",
            blockType: Scratch.BlockType.COMMAND,
            blockIconURI: embedIcon,
            text: "set author [ATTRIBUTE] for [EMBED] to [STRING]",
            arguments: {
              ATTRIBUTE: {
                type: Scratch.ArgumentType.STRING,
                menu: "authorMenu",
              },
              EMBED: {
                type: Scratch.ArgumentType.STRING,
                menu: "embedMenu",
              },
              STRING: {
                type: Scratch.ArgumentType.STRING,
              },
            },
            hideFromPalette: this.embedHidden,
          },
        ],
        menus: {
          webhookMenu: {
            acceptReporters: true,
            items: "_createWebhookMenu",
          },
          embedMenu: {
            acceptReporters: true,
            items: "_createEmbedMenu",
          },
          sendTypeMenu: {
            acceptReporters: false,
            items: [
              {
                text: "text",
                value: "text",
              },
              {
                text: "json",
                value: "json",
              },
            ],
          },
          webhookAttributeMenu: {
            acceptReporters: false,
            items: [
              {
                text: "username",
                value: "username",
              },
              {
                text: "avatar url",
                value: "avatar",
              },
              {
                text: "url",
                value: "url",
              },
            ],
          },
          embedAttributeMenu: {
            acceptReporters: false,
            items: [
              {
                text: "title",
                value: "title",
              },
              {
                text: "description",
                value: "description",
              },
              {
                text: "url",
                value: "url",
              },
              {
                text: "thumbnail url",
                value: "thumburl",
              },
              {
                text: "image url",
                value: "imageurl",
              },
            ],
          },
          stateMenu: {
            acceptReporters: false,
            items: [
              {
                text: "enabled",
                value: "enabled",
              },
              {
                text: "disabled",
                value: "disabled",
              },
            ],
          },
          authorMenu: {
            acceptReporters: false,
            items: [
              {
                text: "name",
                value: "name",
              },
              {
                text: "url",
                value: "url",
              },
              {
                text: "icon url",
                value: "iconurl",
              },
            ],
          },
        },
      };
    }

    addWebhook() {
      this._getWebhookName("New Webhook", this._getWebhookURL);
    }

    deleteWebhook() {
      this._getWebhookName("Remove Webhook", this._removeWebhook);
    }

    setWebhookAttribute(args) {
      const webhooks = this.webhooks;
      if (!webhooks[args.WEBHOOK]) {
        return;
      }
      if (args.ATTRIBUTE === "url") {
        webhooks[args.WEBHOOK]["URL"] = args.STRING;
      } else if (args.ATTRIBUTE === "avatar") {
        webhooks[args.WEBHOOK]["AVATAR"] = args.STRING;
      } else {
        webhooks[args.WEBHOOK]["USERNAME"] = args.STRING;
      }
    }

    sendMessage(args) {
      const webhooks = this.webhooks;
      const embeds = this.embeds;
      if (!webhooks[args.WEBHOOK]) {
        return;
      }
      const webhookURL = webhooks[args.WEBHOOK]["URL"];
      const webhookUsername = webhooks[args.WEBHOOK]["USERNAME"];
      const webhookAvatar = webhooks[args.WEBHOOK]["AVATAR"];
      let content = "";
      if (args.TYPE === "text") {
        let mappedEmbeds = [];
        if (embeds[args.EMBED]) {
          mappedEmbeds = [embeds[args.EMBED]];
        }
        let defaultData = {
          username: webhookUsername,
          avatar_url: webhookAvatar,
          content: args.STRING,
          embeds: mappedEmbeds,
        };
        content = JSON.stringify(defaultData);
      } else {
        content = args.STRING;
      }
      try {
        Scratch.fetch(webhookURL, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: content,
        });
      } catch (error) {
        return "";
      }
    }

    getWebhookAttribute(args) {
      const webhooks = this.webhooks;
      if (!webhooks[args.WEBHOOK]) {
        return "";
      }
      if (args.ATTRIBUTE === "url") {
        return webhooks[args.WEBHOOK]["URL"];
      } else if (args.ATTRIBUTE === "avatar") {
        return webhooks[args.WEBHOOK]["AVATAR"];
      } else {
        return webhooks[args.WEBHOOK]["USERNAME"];
      }
    }

    createEmbed() {
      this.getEmbedName("New Embed", this._createNewEmbed);
    }

    deleteEmbed() {
      this.getEmbedName("Remove Embed", this._removeEmbed);
    }

    setEmbedAttribute(args) {
      const embeds = this.embeds;
      if (!embeds[args.EMBED]) {
        return;
      }
      if (args.ATTRIBUTE === "title") {
        embeds[args.EMBED]["title"] = args.STRING;
      } else if (args.ATTRIBUTE === "description") {
        embeds[args.EMBED]["description"] = args.STRING;
      } else if (args.ATTRIBUTE === "url") {
        embeds[args.EMBED]["url"] = args.STRING;
      } else if (args.ATTRIBUTE === "thumburl") {
        embeds[args.EMBED]["thumbnail"]["url"] = args.STRING;
      } else if (args.ATTRIBUTE === "imageurl") {
        embeds[args.EMBED]["image"]["url"] = args.STRING;
      }
      return "";
    }

    setEmbedColor(args) {
      const embeds = this.embeds;
      if (!embeds[args.EMBED]) {
        return "";
      }
      let color = args.COLOR;
      color = color.substring(1, 7);
      color = Scratch.Cast.toNumber("0x" + color);
      embeds[args.EMBED]["color"] = color;
    }

    setEmbedAuthor(args) {
      const embeds = this.embeds;
      if (!embeds[args.EMBED]) {
        return "";
      }
      if (!embeds[args.EMBED]["author"]) {
        embeds[args.EMBED]["author"] = { name: "Author Name" };
      }
      if (args.ATTRIBUTE === "name") {
        embeds[args.EMBED]["author"]["name"] = args.STRING;
      } else if (args.ATTRIBUTE === "url") {
        embeds[args.EMBED]["author"]["url"] = args.STRING;
      } else if (args.ATTRIBUTE === "iconurl") {
        embeds[args.EMBED]["author"]["icon_url"] = args.STRING;
      }
      return "";
    }

    getEmbedAttribute(args) {
      const embeds = this.embeds;
      if (!embeds[args.EMBED]) {
        return "";
      }
      if (args.ATTRIBUTE === "title") {
        return embeds[args.EMBED]["title"];
      } else if (args.ATTRIBUTE === "description") {
        return embeds[args.EMBED]["description"];
      } else if (args.ATTRIBUTE === "url") {
        return embeds[args.EMBED]["url"];
      }
    }

    async _createNewWebhook(name, url) {
      const webhooks = this.webhooks;
      const webhookData = await Scratch.fetch(url);
      const jsonData = await webhookData.json();
      const webhookName = jsonData["name"];
      webhooks[this._uid()] = {
        name: name,
        URL: url,
        USERNAME: webhookName,
        AVATAR: "",
      };
      this.webhookHidden = false;
      Scratch.vm.extensionManager.refreshBlocks();
    }

    _getWebhookName(modalTitle, callback) {
      ScratchBlocks.prompt(
        "Enter webhook name",
        "",
        (text) => {
          if (!text) return;
          callback(text);
        },
        modalTitle,
        "broadcast_msg"
      );
    }

    async _getWebhookURL(name) {
      const webhooks = this.webhooks;
      if (!this.checkValid(webhooks, name))
        return alert('A webhook named "' + name + '" already exists.');
      // fake promise so it doesn't close immediately
      await new Promise((resolveInner) => {
        setTimeout(resolveInner, -1);
      });
      ScratchBlocks.prompt(
        "Enter webhook URL",
        "",
        (text) => {
          if (!text) return;
          this._createNewWebhook(name, text);
        },
        "New Webhook",
        "broadcast_msg"
      );
    }

    _renameWebhook(uid) {
      const webhooks = this.webhooks;
      const name = webhooks[uid].name;
      ScratchBlocks.prompt(
        `Rename all "${name}" webhooks to:`,
        name,
        (text) => {
          if (!text) return;
          if (!this.checkValid(webhooks, text))
            return alert('A webhook named "' + name + '" already exists.');
          webhooks[uid].name = text;
          Scratch.vm.emitWorkspaceUpdate();
        },
        "Rename Webhook",
        "broadcast_msg"
      );
    }

    _removeWebhook(name) {
      const webhooks = this.webhooks;
      const uids = Object.keys(webhooks);
      for (const uid of uids) {
        if (webhooks[uid].name == name) {
          Reflect.deleteProperty(webhooks, uid);
          if (Object.keys(webhooks).length == 0) this.webhookHidden = true;
          Scratch.vm.extensionManager.refreshBlocks();
          return;
        }
      }
      return alert("That webhook doesn't exist.");
    }

    _createNewEmbed(name) {
      const embeds = this.embeds;
      if (!this.checkValid(embeds, name))
        return alert('An embed named "' + name + '" already exists.');
      embeds[this._uid()] = {
        name: name,
        title: "Title",
        description: "Description",
        url: null,
        color: null,
        author: null,
        image: { url: null },
        thumbnail: { url: null },
      };
      this.embedHidden = false;
      Scratch.vm.extensionManager.refreshBlocks();
    }

    _getEmbedName(modalTitle, callback) {
      ScratchBlocks.prompt(
        "Enter embed name",
        "",
        (text) => {
          if (!text) return;
          callback(text);
        },
        modalTitle,
        "broadcast_msg"
      );
    }

    _renameEmbed(uid) {
      const embeds = this.embeds;
      if (uid === "no embed") return;
      const name = embeds[uid].name;
      ScratchBlocks.prompt(
        `Rename all "${name}" embeds to:`,
        name,
        (text) => {
          if (!text) return;
          if (!this._checkValid(embeds, text))
            return alert('An embed named "' + name + '" already exists.');
          embeds[uid].name = text;
          Scratch.vm.emitWorkspaceUpdate();
        },
        "Rename Embed",
        "broadcast_msg"
      );
    }

    _removeEmbed(name) {
      const embeds = this.embeds;
      const uids = Object.keys(embeds);
      for (const uid of uids) {
        if (embeds[uid].name == name) {
          Reflect.deleteProperty(embeds, uid);
          if (Object.keys(embeds).length == 0) this.embedHidden = true;
          Scratch.vm.extensionManager.refreshBlocks();
          return;
        }
      }
      return alert("That embed doesn't exist.");
    }

    _checkValid(object, name) {
      const uids = Object.keys(object);
      for (const uid of uids) {
        if (object[uid].name == name) return false;
      }
      return true;
    }

    _uid() {
      const soup_ =
        "!#%()*+,-./:;=?@[]^_`{|}~" +
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      const length = 20;
      const soupLength = soup_.length;
      const id = [];
      for (let i = 0; i < length; i++) {
        id[i] = soup_.charAt(Math.random() * soupLength);
      }
      return id.join("");
    }

    _createWebhookMenu() {
      const webhooks = this.webhooks;
      const webhookMenu = [];
      const length = Object.keys(webhooks).length;
      for (let index = 0; index < length; index++) {
        let uid = Object.keys(webhooks)[index];
        webhookMenu.push({
          text: webhooks[uid].name,
          value: uid,
        });
      }
      const nameWebhook = {
        text: "Rename webhook",
        value: () =>
          this._renameWebhook(ScratchBlocks.DropDownDiv.owner_.value_),
      };
      const newWebhook = {
        text: "New webhook",
        value: () => this._getWebhookName("New Webhook", this._getWebhookURL),
      };
      if (webhookMenu.length > 0) {
        webhookMenu.push(nameWebhook);
        webhookMenu.push(newWebhook);
        return webhookMenu;
      } else {
        return [{ text: "", value: "" }, newWebhook];
      }
    }

    _createEmbedMenu() {
      const embeds = this.embeds;
      const embedMenu = [];
      const length = Object.keys(embeds).length;
      for (let index = 0; index < length; index++) {
        let uid = Object.keys(embeds)[index];
        embedMenu.push({
          text: embeds[uid].name,
          value: uid,
        });
      }
      const noEmbed = { text: "no embed", value: "no embed" };
      const nameEmbed = {
        text: "Rename embed",
        value: () => this._renameEmbed(ScratchBlocks.DropDownDiv.owner_.value_),
      };
      const newEmbed = {
        text: "New embed",
        value: () => this._getEmbedName("New Embed", this._createNewEmbed),
      };
      if (embedMenu.length > 0) {
        embedMenu.push(noEmbed);
        embedMenu.push(nameEmbed);
        embedMenu.push(newEmbed);
        return embedMenu;
      } else {
        return [noEmbed, newEmbed];
      }
    }
  }

  Scratch.extensions.register(new DiscordAPI());
})(Scratch);
