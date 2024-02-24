// Owner: TurboWarp
// Name: Notify
// Description: Simple Notification.
// Edit: XmerStudios

(function (Scratch) {
  "use strict";

  let denied = false;
  /** @type {Notification|null} */
  let notification = null;
  let customTitle = "TurboWarp Project"; // Default Title

  const askForNotificationPermission = async () => {
    try {
      const allowedByVM = await Scratch.canNotify();
      if (!allowedByVM) {
        throw new Error("Denied by VM");
      }

      const allowedByBrowser = await Notification.requestPermission();
      if (!allowedByBrowser) {
        throw new Error("Denied by browser");
      }

      denied = false;
      return true;
    } catch (e) {
      denied = true;
      console.warn("Could not request notification permissions", e);
      return false;
    }
  };

  const isAndroid = () => navigator.userAgent.includes("Android");

  const getServiceWorkerRegistration = () => {
    if (!("serviceWorker" in navigator)) return null;
    if (!isAndroid()) return null;
    return navigator.serviceWorker.getRegistration();
  };

  class Notifications {
    constructor() {
      Scratch.vm.runtime.on("RUNTIME_DISPOSED", () => {
        this._closeNotification();
      });
    }
    
    getInfo() {
      return {
        id: "notify",
        name: "Notify",
        blocks: [
          {
            opcode: "requestPermission",
            blockType: Scratch.BlockType.COMMAND,
            text: "Request Notification Permission",
          },
          {
            opcode: "hasPermission",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "Has Notification Permission",
            disableMonitor: true,
          },
          {
            opcode: "showNotification",
            blockType: Scratch.BlockType.COMMAND,
            text: "Send Notification, Text [text]",
            arguments: {
              text: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Hello, world!",
              },
            },
          },
          {
            opcode: "setNotificationTitle",
            blockType: Scratch.BlockType.COMMAND,
            text: "Set Notification Title to [title]",
            arguments: {
              title: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "TurboWarp Project",
              },
            },
          },
          {
            opcode: "closeNotification",
            blockType: Scratch.BlockType.COMMAND,
            text: "Close Notification",
          },
        ],
      };
    }

    requestPermission() {
      return askForNotificationPermission();
    }

    hasPermission() {
      if (denied) {
        return false;
      }
      return askForNotificationPermission();
    }

    async _showNotification(text) {
      if (await this.hasPermission()) {
        const title = customTitle;
        const options = {
          body: text,
        };
        try {
          notification = new Notification(title, options);
        } catch (e) {
          const registration = await getServiceWorkerRegistration();
          if (registration) {
            try {
              await registration.showNotification(title, options);
            } catch (e2) {
              console.error("Could not show notification", e, e2);
            }
          } else {
            console.error("Could not show notification", e);
          }
        }
      }
    }

    showNotification(args) {
      this._showNotification(Scratch.Cast.toString(args.text));
    }

    setNotificationTitle(args) {
      customTitle = Scratch.Cast.toString(args.title);
    }

    async _closeNotification() {
      if (notification) {
        notification.close();
        notification = null;
      }

      const registration = await getServiceWorkerRegistration();
      if (registration) {
        const notifications = await registration.getNotifications();
        for (const notification of notifications) {
          notification.close();
        }
      }
    }

    closeNotification() {
      this._closeNotification();
    }
  }

  Scratch.extensions.register(new Notifications());
})(Scratch);
