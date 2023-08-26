// Name: Screen Resolution
// ID: shreder95resolution
// Description: Get the resolution of the primary screen.
// By: shreder95ua <https://scratch.mit.edu/users/shreder95ua/>

(function (Scratch) {
  "use strict";

  class Resolution {
    getInfo() {
      return {
        id: "shreder95resolution",
        name: "Screen resolution",
        color1: "#FFAB19",
        color2: "#EC9C13",
        color3: "#CF8B17",
        blocks: [
          {
            opcode: "getWidth",
            text: "primary screen width",
            blockType: Scratch.BlockType.REPORTER,
          },
          {
            opcode: "getHeight",
            text: "primary screen height",
            blockType: Scratch.BlockType.REPORTER,
          },
        ],
      };
    }
    getWidth() {
      return window.screen.width;
    }
    getHeight() {
      return window.screen.height;
    }
  }
  Scratch.extensions.register(new Resolution());
})(Scratch);
