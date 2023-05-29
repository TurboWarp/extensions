(function(Scratch) {
  'use strict';

  class Notifications {
    getInfo() {
      return {
        id: 'mdwaltersnotifications',
        name: 'Notifications',
        blocks: [
          {
            opcode: 'requestPermission',
            blockType: Scratch.BlockType.COMMAND,
            text: 'request notifications permission'
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

    async requestPermission() {
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

        return true;
      } catch (e) {
        console.warn('Could not request notification permissions', e);
        return false;
      }
    }

    async showNotification(args) {
      if (await this.requestPermission()) {
        const notification = new Notification('Notification from project', {
          body: Scratch.Cast.toString(args.text)
        });
      }
    }
  }

  Scratch.extensions.register(new Notifications());
})(Scratch);