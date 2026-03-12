(function (Scratch) { "use strict";
class Strencode{
    getInfo() {
        return {
            id: "strencode",
            name: "Strencode version 1.0.0",
            color1: "#88E788",
            blocks: [
                {
                    opcode: "tobasesf",
                    blockType: Scratch.BlockType.REPORTER,
                    text: "encode [text] to base64",
                    arguments: {
                        text: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: "Turbowarp Good"
                        }
                    }
                },
                {
                    opcode: "totxt",
                    blockType: Scratch.BlockType.REPORTER,
                    text: "decode [text]",
                    arguments: {
                        text: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: "VHVyYm93YXJwIEdvb2Q="
                        }
                    }
                }
                
            ]
        }
    }
    tobasesf(args) {
        try{
            return btoa(args.text);
        } catch {
            return "";
        }
    }
    totxt(args) {
        try{
            return atob(args.text);
        } catch {
            return "";
        }
    }
}
Scratch.extensions.register(new Strencode());})(Scratch);
