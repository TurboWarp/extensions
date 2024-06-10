// Name: Notifications
// ID: notification
// Description: Use notifications in your projects! Extended by h3ldll
// By: h3ldll <https://scratch.mit.edu/h3ldotdll>
// Original: mdwalters
// License: MIT

(function (Scratch) {
    'use strict';
  
    if (!Scratch.extensions.unsandboxed) {
      throw new Error('This extension must run unsandboxed');
    }
    let denied = false;
  
    const askForNotificationPermission = async () => {
      try {
  
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

    
    class HelloWorld {
      getInfo() {
        return {
          id: 'notification',
          name: 'Notify',
          docsURI: 'https://extensions.turbowarp.org/h3ldll/notifications/',
          blocks: [
            {
              opcode: 'sendnotification',
              blockType: Scratch.BlockType.COMMAND,
              text: 'Notify [TITLE] [BODY]',
              arguments: {
                TITLE: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'Title'
                },
                BODY: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'Body'
                }
              }
            },
            {
              opcode: 'sendtaggednotif',
              blockType: Scratch.BlockType.COMMAND,
              text: 'Dynamic Notify [TITLE] [BODY] [TAG]',
              arguments: {
                TITLE: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'Title'
                },
                BODY: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'Body'
                },
                TAG: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'Tag'
                }
              }
            },
            {
              opcode: 'sendimgnotif',
              blockType: Scratch.BlockType.COMMAND,
              text: 'Image Notify [TITLE] [BODY] [IMG]',
              arguments: {
                TITLE: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'Title'
                },
                BODY: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'Body'
                },
                IMG: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'https://extensions.turbowarp.org/dango.png'
                }
              }
            },
            {
              opcode: 'haspermissionnotif',
              blockType: Scratch.BlockType.BOOLEAN,
              text: 'has notification permission?',
            }
          ]
        };
      }
      sendnotification(args) {
        Notification.requestPermission().then(perm => {
          if (perm === "granted") {
            new Notification(args.TITLE, {
              body: args.BODY,
            })
          } else {
            throw new error('Error: couldnt get notification permission from browser')
          }
        })
      }
      sendtaggednotif(args) {
        Notification.requestPermission().then(perm => {
          if (perm === "granted") {
            new Notification(args.TITLE, {
              body: args.BODY,
              tag: args.TAG,
            })
          } else {
            throw new error('Error: couldnt get notification permission from browser')
          }
        })
      }
      sendimgnotif(args) {
        Notification.requestPermission().then(perm => {
          if (perm === "granted") {
            new Notification(args.TITLE, {
              body: args.BODY,
              icon: args.IMG,
            })
          } else {
            throw new error('Error: couldnt get notification permission from browser')
          }
        })
      }
      haspermissionnotif() {
        askForNotificationPermission();
        if (denied) {
          return false;
        } else {
          return true;
        }
      }
    }
    Scratch.extensions.register(new HelloWorld());
  })(Scratch);
  