// Name: ntfyScratch
// ID: ntfyScratch
// Description: Send notifications from your Scratch project to your phone, tablet, or computer using ntfy.sh. Instantly receive messages, alerts, and status updates from your project in real time.
// By: XmerOriginals <https://scratch.mit.edu/users/XmerOriginals/>
// License: MPL-2.0

(function(Scratch) {
  'use strict';

  class ntfyScratch {
    getInfo() {
      return {
        id: 'ntfyScratch',
        name: 'ntfyScratch',
        color1: '#55bba6',
        color2: '#358876',
        blocks: [
          {
            func: 'openDoc',
            blockType: Scratch.BlockType.BUTTON,
            text: 'Documentation'
          },
		  {
            func: 'openDocNtfy',
            blockType: Scratch.BlockType.BUTTON,
            text: 'ntfy.sh Documentation'
          },
		  '---',
          {
            opcode: 'sendSimpleNotification',
            blockType: Scratch.BlockType.COMMAND,
            text: 'send message [MESSAGE] to topic [TOPIC]',
            arguments: {
              TOPIC: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'mytopic'
              },
              MESSAGE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Hello from TurboWarp!'
              }
            }
          },
          {
            opcode: 'sendFullNotification',
            blockType: Scratch.BlockType.COMMAND,
            text: 'send notification to [TOPIC] title [TITLE] message [MESSAGE] priority [PRIORITY] tags [TAGS]',
            arguments: {
              TOPIC: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'mytopic'
              },
              TITLE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Alert'
              },
              MESSAGE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Project is running'
              },
              PRIORITY: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 3,
                menu: 'priorityMenu'
              },
              TAGS: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'star,computer'
              }
            }
          }
        ],
        menus: {
          priorityMenu: {
            acceptReporters: true,
            items: [
              { text: 'Max (5)', value: '5' },
              { text: 'High (4)', value: '4' },
              { text: 'Default (3)', value: '3' },
              { text: 'Low (2)', value: '2' },
              { text: 'Min (1)', value: '1' }
            ]
          }
        }
      };
    }

    sendSimpleNotification(args) {
      const topic = args.TOPIC;
      const message = args.MESSAGE;

      fetch(`https://ntfy.sh/${topic}`, {
        method: 'POST',
        body: message
      }).catch(() => {});
    }

    sendFullNotification(args) {
      const bodyData = {
        topic: args.TOPIC,
        title: args.TITLE,
        message: args.MESSAGE,
        priority: parseInt(args.PRIORITY),
        tags: args.TAGS.split(',').map(tag => tag.trim())
      };

      fetch('https://ntfy.sh/', {
        method: 'POST',
        body: JSON.stringify(bodyData),
        headers: {
          'Content-Type': 'application/json'
        }
      }).catch(() => {});
    }

    openDoc() {
      Scratch.canOpenWindow('http://xelabs.xmeroriginals.com/docs/ntfyScratch/').then((allowed) => {
        if (allowed) {
          window.open('http://xelabs.xmeroriginals.com/docs/ntfyScratch/', '_blank');
        }
      });
    }
	
	openDocNtfy() {
      Scratch.canOpenWindow('https://ntfy.sh/docs/').then((allowed) => {
        if (allowed) {
          window.open('https://ntfy.sh/docs/', '_blank');
        }
      });
    }
  }

  Scratch.extensions.register(new ntfyScratch());
})(Scratch);
