(function(Scratch) {
  'use strict';

  let denied = false;
  let notification = null;

  const askForNotificationPermission = async () => {
    try {
      // @ts-expect-error - canNotify is too old.
      const allowedByVM = await Scratch.canNotify();
      if (!allowedByVM) {
        throw new Error('Denied by VM');
      }

      const allowedByBrowser = await Notification.requestPermission();
      if (!allowedByBrowser) {
        throw new Error('Denied by browser');
      }

      denied = false;
      return true;
    } catch (e) {
      denied = true;
      console.warn('Could not request notification permissions', e);
      return false;
    }
  };

  class Notifications {
    getInfo() {
      return {
        id: 'mdwaltersnotifications',
        name: 'Notifications',
        blocks: [
          {
            opcode: 'requestPermission',
            blockType: Scratch.BlockType.COMMAND,
            text: 'request notification permission'
          },
          {
            opcode: 'hasPermission',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'has notification permission'
          },
          {
            opcode: 'showNotification',
            blockType: Scratch.BlockType.COMMAND,
            text: 'create notification with text [text]',
            arguments: {
              text: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Hello, world!'
              }
            }
          }
        ]
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
        notification = new Notification('Notification from project', {
          body: text
        });
      }
    }

    showNotification(args) {
      this._showNotification(Scratch.Cast.toString(args.text));
    }
  }

  Scratch.extensions.register(new Notifications());
})(Scratch);
