// Name: ntfyScratch
// ID: ntfyScratch
// Description: Send notifications from your Scratch project to your phone, tablet, or computer using ntfy.sh. Instantly receive messages, alerts, and status updates from your project in real time.
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
          {
            opcode: "sendFullNotification",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "send notification to [TOPIC] title [TITLE] message [MESSAGE] priority [PRIORITY] tags [TAGS]"
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

    sendFullNotification(args) {
      const bodyData = {
        topic: args.TOPIC,
        title: args.TITLE,
        message: args.MESSAGE,
        priority: parseInt(args.PRIORITY),
        tags: args.TAGS.split(",").map((tag) => tag.trim()),
      };

      Scratch.fetch("https://ntfy.sh/", {
        method: "POST",
        body: JSON.stringify(bodyData),
        headers: {
          "Content-Type": "application/json",
        },
      }).catch((err) => {
        console.warn("ntfyScratch: Failed to send full notification", err);
      });
    }

    _openUrl(url) {
      Scratch.canOpenWindow(url).then((allowed) => {
        if (allowed) {
          Scratch.openWindow(url, "_blank");
        }
      });
    }

    openDoc() {
      this._openUrl("http://xelabs.xmeroriginals.com/docs/ntfyScratch/");
    }

    openDocNtfy() {
      this._openUrl("https://ntfy.sh/docs/");
    }
  }

  Scratch.extensions.register(new ntfyScratch());
})(Scratch);
