// Name: ntfyScratch
// ID: ntfyScratch
// Description: Send notifications from your Scratch project to your phone, tablet, or computer using ntfy.sh. Includes support for attachments, emails, click actions, and scheduling.
// By: XmerOriginals <https://scratch.mit.edu/users/XmerOriginals/>
// License: MPL-2.0

(function (Scratch) {
  "use strict";

  class ntfyScratch {
    getInfo() {
      return {
        id: "ntfyScratch",
        name: Scratch.translate("ntfyScratch"),
        color1: "#55bba6",
        color2: "#358876",
        blocks: [
          {
            func: "openDoc",
            blockType: Scratch.BlockType.BUTTON,
            text: Scratch.translate("Documentation"),
          },
          {
            func: "openDocNtfy",
            blockType: Scratch.BlockType.BUTTON,
            text: Scratch.translate("ntfy.sh Documentation"),
          },
          "---",
          {
            opcode: "sendSimpleNotification",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("send message [MESSAGE] to topic [TOPIC]"),
            arguments: {
              TOPIC: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "mytopic",
              },
              MESSAGE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Hello from TurboWarp!",
              },
            },
          },
          "---",
          {
            opcode: "sendAdvancedNotification",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "send instant to [TOPIC] title [TITLE] message [MESSAGE] priority [PRIORITY] tags [TAGS] click [CLICK] attach url [ATTACH] filename [FILENAME] email [EMAIL]"
            ),
            arguments: {
              TOPIC: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "mytopic",
              },
              TITLE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Alert",
              },
              MESSAGE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Project is running",
              },
              PRIORITY: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 3,
                menu: "priorityMenu",
              },
              TAGS: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "star,computer",
              },
              CLICK: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "https://scratch.mit.edu",
              },
              ATTACH: { type: Scratch.ArgumentType.STRING, defaultValue: "" },
              FILENAME: { type: Scratch.ArgumentType.STRING, defaultValue: "" },
              EMAIL: { type: Scratch.ArgumentType.STRING, defaultValue: "" },
            },
          },
          {
            opcode: "sendScheduledNotification",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "send scheduled to [TOPIC] title [TITLE] message [MESSAGE] priority [PRIORITY] tags [TAGS] click [CLICK] attach url [ATTACH] filename [FILENAME] delay [DELAY]"
            ),
            arguments: {
              TOPIC: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "mytopic",
              },
              TITLE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Scheduled Alert",
              },
              MESSAGE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "See you later!",
              },
              PRIORITY: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 3,
                menu: "priorityMenu",
              },
              TAGS: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "clock,calendar",
              },
              CLICK: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "https://xelabs.xmeroriginals.com",
              },
              ATTACH: { type: Scratch.ArgumentType.STRING, defaultValue: "" },
              FILENAME: { type: Scratch.ArgumentType.STRING, defaultValue: "" },
              DELAY: { type: Scratch.ArgumentType.STRING, defaultValue: "10s" },
            },
          },
        ],
        menus: {
          priorityMenu: {
            acceptReporters: true,
            items: [
              { text: "Max (5)", value: "5" },
              { text: "High (4)", value: "4" },
              { text: "Default (3)", value: "3" },
              { text: "Low (2)", value: "2" },
              { text: "Min (1)", value: "1" },
            ],
          },
        },
      };
    }

    sendSimpleNotification(args) {
      const topic = args.TOPIC;
      const message = args.MESSAGE;

      Scratch.fetch(`https://ntfy.sh/${topic}`, {
        method: "POST",
        body: message,
      }).catch((err) => {
        console.warn("ntfyScratch: Failed to send simple notification", err);
      });
    }

    _sendComplexNtfy(args, isScheduled) {
      const bodyData = {
        topic: args.TOPIC,
        title: args.TITLE,
        message: args.MESSAGE,
        priority: parseInt(args.PRIORITY),
        tags: args.TAGS ? args.TAGS.split(",").map((tag) => tag.trim()) : [],
      };

      if (args.CLICK && args.CLICK.length > 0) bodyData.click = args.CLICK;
      if (args.ATTACH && args.ATTACH.length > 0) bodyData.attach = args.ATTACH;
      if (args.FILENAME && args.FILENAME.length > 0)
        bodyData.filename = args.FILENAME;

      if (isScheduled) {
        if (args.DELAY && args.DELAY.length > 0) bodyData.delay = args.DELAY;
      } else {
        if (args.EMAIL && args.EMAIL.length > 0) bodyData.email = args.EMAIL;
      }

      Scratch.fetch("https://ntfy.sh/", {
        method: "POST",
        body: JSON.stringify(bodyData),
        headers: {
          "Content-Type": "application/json",
        },
      }).catch((err) => {
        console.warn("ntfyScratch: Failed to send notification", err);
      });
    }

    sendAdvancedNotification(args) {
      this._sendComplexNtfy(args, false);
    }

    sendScheduledNotification(args) {
      this._sendComplexNtfy(args, true);
    }

    _openUrl(url) {
      Scratch.canOpenWindow(url).then((allowed) => {
        if (allowed) {
          Scratch.openWindow(url, "_blank");
        }
      });
    }

    openDoc() {
      this._openUrl("https://xelabs.xmeroriginals.com/docs/ntfyScratch/");
    }

    openDocNtfy() {
      this._openUrl("https://ntfy.sh/docs/");
    }
  }

  Scratch.extensions.register(new ntfyScratch());
})(Scratch);
