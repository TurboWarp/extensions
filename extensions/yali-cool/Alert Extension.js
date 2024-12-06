(function (Scratch) {
    'use strict';
  
    class AlertExtension {
      constructor() {}
  
      showAlert(args) {
        alert(args.TEXT);
      }
  
      promptText(args) {
        return prompt(args.MESSAGE || 'Insert text here:');
      }
  
      confirmAction(args) {
        return confirm(args.MESSAGE || 'are you sure?');
      }
  
      WebExt_DisplayNotification(args) {
        new Notification(args.TITLE, {
          body: args.MESSAGE,
        });
        setTimeout(() => {
        }, args.DURATION * 1000);
      }
  
      WebExt_DisplayNotificationWithIcon(args) {
        new Notification(args.TITLE, {
          body: args.MESSAGE,
          icon: args.URL
        });
        setTimeout(() => {

        }, args.DURATION * 1000);
      }
  
      WebExt_canDisplayNotification() {
        return Notification.permission === 'granted';
      }
  
      getInfo() {
        const iconURI = 'data:image/png;base64,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';
  
        return {
          id: 'alertExtension',
          name: 'Alert Extension',
          color1: '#841919',
          color2: '#9E2D2D',
          color3: '#6B1111',
          menuIconURI: iconURI,
          blockIconURI: iconURI,
          blocks: [
            {
              blockType: "label",
              text: "Alerts",
            },
            {
              opcode: 'showAlert',
              blockType: Scratch.BlockType.COMMAND,
              text: 'alert [TEXT]',
              arguments: {
                TEXT: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "text"
                }
              }
            },
            {
              opcode: 'promptText',
              blockType: Scratch.BlockType.REPORTER,
              text: 'prompt [MESSAGE]',
              arguments: {
                MESSAGE: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'What is your name?'
                }
              }
            },
            {
              opcode: 'confirmAction',
              blockType: Scratch.BlockType.BOOLEAN,
              text: 'confirm [MESSAGE]',
              arguments: {
                MESSAGE: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'Are you sure?'
                }
              }
            },
            {
              blockType: "label",
              text: "Notifications",
            },
            {
              opcode: 'WebExt_DisplayNotification',
              blockType: Scratch.BlockType.COMMAND,
              text: 'display notification with title: [TITLE] and message: [MESSAGE] during [DURATION] seconds',
              func: 'WebExt_DisplayNotification',
              arguments: {
                TITLE: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'title'
                },
                MESSAGE: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'message'
                },
                DURATION: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: 3
                }
              }
            },
            {
              opcode: 'WebExt_DisplayNotificationWithIcon',
              blockType: Scratch.BlockType.COMMAND,
              text: 'display notification with title: [TITLE] and message: [MESSAGE] during [DURATION] seconds and [URL] as icon',
              func: 'WebExt_DisplayNotificationWithIcon',
              arguments: {
                TITLE: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'title'
                },
                MESSAGE: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'message'
                },
                DURATION: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: 3
                },
                URL: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'URL'
                }
              }
            },
            {
              opcode: 'WebExt_canDisplayNotification',
              blockType: Scratch.BlockType.BOOLEAN,
              text: 'can display notifications?',
              arguments: {}
            }
          ]
        };
      }
    }
  
    Scratch.extensions.register(new AlertExtension());
  })(Scratch);
  