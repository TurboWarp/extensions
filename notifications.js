(function(Scratch) {
    "use strict";

    class Notifications {
        getInfo() {
            return {
                id: "notifications",
                name: "Notifications",
                blocks: [
                    {
                      opcode: "requestPermission",
                      blockType: Scratch.BlockType.COMMAND,
                      text: "request notifications permission"
                    },
                    {
                        opcode: "newNotification",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "create a notification with title [title]",
                        arguments: {
                            title: {
                              type: Scratch.ArgumentType.STRING,
                              defaultValue: "Hello, world!"
                            }
                        }
                    },
                    {
                        opcode: "notificationsAllowed",
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: "is notifications allowed?"
                    }
                ]
            }
        }

        requestPermission() {
            let notification = Notification.requestPermission();
            return notification;
        }

        newNotification(args) {
            const notification = new Notification(args.title);
            return notification;
        }

        notifcationsAllowed() {
            if (Notification.permission === "granted") {
                return true;
            } else {
                return false;
            }
        }
    }

    Scratch.extensions.register(new Notifications());
})(Scratch);