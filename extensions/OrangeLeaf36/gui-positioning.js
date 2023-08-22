// Name: GUI Positioning
// ID: leaf36devgui
// Description: Position sprites in an interface-like manner.
// By: OrangeLeaf36

(function(Scratch) {
    "use strict";

    let zoom = 1;
    let frames = {
        "frame1":{"x":0, "y":0, "width":100, "height":100}
    };

    if (!Scratch.extensions.unsandboxed) {
        throw new Error("GUI Positioning must run unsandboxed");
    }

    function setFrame(name, x, y, width, height) {
            frames[name] = {"x":x, "y":y, "width":width, "height":height}
        }

    class guiPositioning {
        getInfo() {
            return {
                id: "guipositioning",
                color1: "#8059ad",
                color2: "#6f489c",
                color3: "#5f388a",
                name: "GUI Positioning",
                docsURI: "https://orangeleaf36.is-a.dev/docs/gui-positioning/",
                blocks: [
                    {
                        opcode: "getViewportPercentage",
                        text: "[percentage]% of stage's [resolution]",
                        blockType: Scratch.BlockType.REPORTER,
                        arguments: {
                            percentage: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: "25"
                            },
                            resolution: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "RES_MENU",
                                defaultValue: "width"
                            }
                        }
                    },
                    {
                        opcode: "setPosAncXSprite",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "set x on [frame] at [anchor] with offset x [margin]",
                        arguments: {
                            frame: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "FRAMES",
                                defaultValue: "stage"
                            },
                            anchor: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "ANCHOR_X",
                                defaultValue: "center"
                            },
                            margin: {
                                type: Scratch.ArgumentType.NUMBER
                            }
                        }
                    },
                    {
                        opcode: "setPosAncYSprite",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "set y on [frame] at [anchor] with offset y [margin]",
                        arguments: {
                            frame: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "FRAMES",
                                defaultValue: "stage"
                            },
                            anchor: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "ANCHOR_Y",
                                defaultValue: "center"
                            },
                            margin: {
                                type: Scratch.ArgumentType.NUMBER
                            }
                        }
                    },
                    "---",
                    {
                        opcode: "listFrames",
                        text: "frames",
                        blockType: Scratch.BlockType.REPORTER,
                        disableMontor: true
                    },
                    {
                        opcode: "keysOfFrame",
                        text: "[frame] as json",
                        blockType: Scratch.BlockType.REPORTER,
                        arguments: {
                            frame: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "FRAMES_NOSTAGE",
                                defaultValue: "frame1"
                            }
                        }
                    },
                    {
                        opcode: "keyOfFrame",
                        text: "[key] of frame [frame]",
                        blockType: Scratch.BlockType.REPORTER,
                        arguments: {
                            key: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "FRAME_PROPERTIES",
                                defaultValue: "x"
                            },
                            frame: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "FRAMES_NOSTAGE",
                                defaultValue: "frame1"
                            }
                        }
                    },
                    "---",
                    {
                        opcode: "createFrame",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "create frame [frame]",
                        arguments: {
                            frame: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "frame1"
                            }
                        }
                    },
                    {
                        opcode: "deleteFrame",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "delete frame [frame]",
                        arguments: {
                            frame: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "FRAMES_NOSTAGE",
                                defaultValue: "frame1"
                            }
                        }
                    },
                    {
                        opcode: "setPosFrame",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "set pos of frame [frame] x: [x] y: [y]",
                        arguments: {
                            frame: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "FRAMES_NOSTAGE",
                                defaultValue: "frame1"
                            },
                            x: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: "0"
                            },
                            y: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: "0"
                            }
                        }
                    },
                    {
                        opcode: "setSizeFrame",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "set size of frame [frame] width: [width] height: [height]",
                        arguments: {
                            frame: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "FRAMES_NOSTAGE",
                                defaultValue: "frame1"
                            },
                            width: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: "100"
                            },
                            height: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: "100"
                            }
                        }
                    },
                    {
                        opcode: "setPosAncXFrame",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "set x of frame [frame] at [anchor] with offset x [margin]",
                        arguments: {
                            frame: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "FRAMES_NOSTAGE",
                                defaultValue: "frame1"
                            },
                            anchor: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "ANCHOR_X",
                                defaultValue: "center"
                            },
                            margin: {
                                type: Scratch.ArgumentType.NUMBER
                            }
                        }
                    },
                    {
                        opcode: "setPosAncYFrame",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "set y of frame [frame] at [anchor] with offset y [margin]",
                        arguments: {
                            frame: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "FRAMES_NOSTAGE",
                                defaultValue: "frame1"
                            },
                            anchor: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "ANCHOR_Y",
                                defaultValue: "center"
                            },
                            margin: {
                                type: Scratch.ArgumentType.NUMBER
                            }
                        }
                    },
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: "For use with Camera Controls:"
                    },
                    {
                        opcode: "setZoom",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "set zoom [zoom]",
                        arguments: {
                            zoom: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: "100"
                            }
                        }
                    },
                    {
                        opcode: "adjustNumByZoom",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "[adjust] number [number] to zoom",
                        arguments: {
                            number: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: "50"
                            },
                            adjust: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "ADJ_ZOOM",
                                defaultValue: "fit"
                            }
                        }
                    },
                ],
                menus: {
                    RES_MENU: {
                        acceptReporters: true,
                        items: [
                            "width", "height"
                        ]
                    },
                    ANCHOR_X: {
                        acceptReporters: false,
                        items: [
                            "left", "right", "center"
                        ]
                    },
                    ANCHOR_Y: {
                        acceptReporters: false,
                        items: [
                            "top", "bottom", "center"
                        ]
                    },
                    FRAMES: {
                        acceptReporters: true,
                        items: "_getFramesAndStage" //This basically makes it run a function every time
                    },
                    FRAMES_NOSTAGE: {
                        acceptReporters: true,
                        items: "_getFrames" //This basically makes it run a function every time
                    },
                    FRAME_PROPERTIES: {
                        acceptReporters: false,
                        items:[
                        "x",
                        "y",
                        "width",
                        "height"
                        ]
                    },
                    ADJ_ZOOM: {
                        acceptReporters: false,
                        items: [
                        "fit",
                        "decrease"
                        ]
                    }
                }
            };
        }

        getViewportPercentage(args, util) {
            if (args.resolution === "width") {
                return Scratch.vm.runtime.stageWidth * (args.percentage / 100);
            } else if (args.resolution === "height") {
                return Scratch.vm.runtime.stageHeight * (args.percentage / 100);
            }
            return 0;
        }

        //Sprite
        setPosAncXSprite(args, util) {
            const costume = util.target.sprite.costumes[util.target.currentCostume];
            const attribute = args.anchor;
            const costumewidth = Math.ceil(Scratch.Cast.toNumber(costume.size[0]));
            let newX = 0;
            if (args.frame === "stage"){
                const stagewidth = Scratch.vm.runtime.stageWidth;
                if (attribute === "left") {
                    newX = -stagewidth / 2 / zoom + costumewidth / 2 * (util.target.size/100) + args.margin;
                } else if (attribute === "right") {
                    newX = stagewidth / 2 / zoom - costumewidth / 2 * (util.target.size/100) + args.margin;
                } else if (attribute === "center") {
                    newX = args.margin;
                } else {
                    newX = 0;
                }
            } else {
                const frame = frames[args.frame];
                if (attribute === "left") {
                    newX = frame["x"] + (costumewidth / 2 * (util.target.size/100)) + args.margin;
                } else if (attribute === "right") {
                    newX = frame["x"] + frame["width"] - (costumewidth / 2 * (util.target.size/100)) + args.margin;
                } else if (attribute === "center") {
                    newX = frame["x"] + (frame["width"] / 2) + args.margin;
                } else {
                    newX = 0;
                }
            }
            util.target.setXY(newX, util.target.y);
        }

        setPosAncYSprite(args, util) {
            const costume = util.target.sprite.costumes[util.target.currentCostume];

            const attribute = args.anchor;
            const costumeheight = Math.ceil(Scratch.Cast.toNumber(costume.size[1]));
            let newY = 0;
            if (args.frame === "stage"){
                const stageheight = Scratch.vm.runtime.stageHeight;
                if (attribute === "bottom") {
                    newY = -stageheight / 2 / zoom + costumeheight / 2 * (util.target.size/100) + args.margin;
                } else if (attribute === "top") {
                    newY = stageheight / 2 / zoom - costumeheight / 2 * (util.target.size/100) + args.margin;
                } else if (attribute === "center") {
                    newY = args.margin;
                } else {
                    newY = 0;
                }
            } else {
                const frame = frames[args.frame];
                if (attribute === "bottom") {
                    newY = frame["y"] + (costumeheight / 2 * (util.target.size/100)) + args.margin;
                } else if (attribute === "top") {
                    newY = frame["y"] + frame["height"] - (costumeheight / 2 * (util.target.size/100)) + args.margin;
                } else if (attribute === "center") {
                    newY = frame["y"] + (frame["height"] / 2) + args.margin;
                } else {
                    newY = 0;
                }
            }
            util.target.setXY(util.target.x, newY);
        }

        //Frame
        createFrame(args, util) {
            setFrame(args.frame, 0, 0, 100, 100);
        }

        deleteFrame(args, util) {
            delete(frames[args.frame]);
        }

        listFrames(args, util) {
            return Object.keys(frames);
        }

        keysOfFrame(args, util) {
            return JSON.stringify(frames[args.frame]);
        }

        keyOfFrame(args, util) {
            return frames[args.frame][args.key];
        }

        setPosFrame(args, util) {
            if (Object.keys(frames).includes(args.frame)) {
                const frame = frames[args.frame];
                frame["x"] = args.x;
                frame["y"] = args.y;
            } else {
                console.error("Frame doesn't exist!");
                return 0
            }
        }

        setSizeFrame(args, util) {
            if (Object.keys(frames).includes(args.frame)) {
                const frame = frames[args.frame];
                frame["width"] = args.width;
                frame["height"] = args.height;
            } else {
                console.error("Frame doesn't exist!");
                return 0
            }
        }

        setPosAncXFrame(args, util) {
            if (Object.keys(frames).includes(args.frame)) {
                const frame = frames[args.frame];
                const attribute = args.anchor;
                const stagewidth = Scratch.vm.runtime.stageWidth;
                const framewidth = frame["width"];
                let newX = 0;
                if (attribute === "left") {
                    newX = -stagewidth / 2 / zoom + args.margin;
                } else if (attribute === "right") {
                    newX = stagewidth / 2 / zoom - framewidth + args.margin;
                } else if (attribute === "center") {
                    newX = -framewidth/2 + args.margin;
                } else {
                    newX = 0;
                }
                frame["x"] = newX;
            } else {
                console.error("Frame doesn't exist!");
                return 0
            }
        }

        setPosAncYFrame(args, util) {
            if (Object.keys(frames).includes(args.frame)) {
                const frame = frames[args.frame];
                const attribute = args.anchor;
                const stageheight = Scratch.vm.runtime.stageHeight;
                const frameheight = frame["height"];
                let newY = 0;
                if (attribute === "bottom") {
                    newY = -stageheight / 2 / zoom + args.margin;
                } else if (attribute === "top") {
                    newY = stageheight / 2 / zoom - frameheight + args.margin;
                } else if (attribute === "center") {
                    newY = -frameheight/2 + args.margin;
                } else {
                    newY = 0;
                }
                frame["y"] = newY;
            } else {
                console.error("Frame doesn't exist!");
                return 0
            }
        }

        _getFramesAndStage() { // The menu function
            return ["stage", ...Object.keys(frames)];
        }

        _getFrames() { // The menu function
            return Object.keys(frames);
        }

        //Camera Controls
        setZoom(args, util) {
            zoom = args.zoom / 100;
        }

        adjustNumByZoom(args, util) {
            console.log(util.size)
            if (args.adjust == "decrease") {
                return args.number * zoom;
            } else if (args.adjust == "fit") {
                return args.number / zoom;
            } else {
                return args.number;
            }
        }
    }
    Scratch.extensions.register(new guiPositioning());
})(Scratch);
