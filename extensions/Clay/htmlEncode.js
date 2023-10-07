// Name: HTML Encode
// ID: clayhtmlencode
// Description: Simple extension for encoding text in HTML escape codes.
// By: ClaytonTDM
(function(Scratch) {
    "use strict";

    class HtmlEncode {
        getInfo() {
            return {
                id: "htmlencode",
                name: "HTML Encode",
                blocks: [{
                    opcode: "htmlEncode",
                    blockType: Scratch.BlockType.REPORTER,
                    text: "Encode text [text]",
                    arguments: {
                        text: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: "TurboWarp is awesome!",
                        },
                    },
                }, ],
            };
        }

        htmlEncode({
            text
        }) {
            return text.replace(
                /[\u00A0-\u9999<>]/g,
                (i) => "&#" + i.charCodeAt(0) + ";",
            );
        }
    }

    Scratch.extensions.register(new HtmlEncode());
})(Scratch);
