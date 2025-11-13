// Name: Temporal
// ID: temporalby8x2
// Description: Advanced time blocks.
// By: 8to16 <https://scratch.mit.edu/users/8to16/>
// License: MPL-2.0

// @ts-nocheck
/* eslint-disable no-undef */

(async function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("Temporal extension must run unsandboxed");
  }

  if (typeof window.Temporal === "undefined") {
    await Scratch.external.evalAndReturn(
      "https://cdn.jsdelivr.net/npm/temporal-polyfill@0.3.0/global.min.js",
      "Temporal"
    );
  }

  const blockIconURI =
    "data:image/svg+xml,%3Csvg%20version%3D%221.1%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20xmlns%3Axlink%3D%22http%3A//www.w3.org/1999/xlink%22%20width%3D%2228.0123%22%20height%3D%2228.0123%22%20viewBox%3D%220%2C0%2C28.0123%2C28.0123%22%3E%3Cg%20transform%3D%22translate%28-225.99386%2C-165.99386%29%22%3E%3Cg%20stroke%3D%22%23005188%22%20stroke-width%3D%222%22%20stroke-miterlimit%3D%2210%22%3E%3Cpath%20d%3D%22M226.99387%2C180.000002c0%2C-7.1831%205.82305%2C-13.000615%2013.000615%2C-13.000615c7.1831%2C0%2013.000615%2C5.82305%2013.000615%2C13.000615c0%2C7.1831%20-5.82305%2C13.000615%20-13.000615%2C13.000615c-7.1831%2C0%20-13.000615%2C-5.82305%20-13.000615%2C-13.000615z%22%20fill%3D%22%23ffffff%22%20stroke-linecap%3D%22butt%22/%3E%3Cpath%20d%3D%22M250.16156%2C180.25856h-11.26048v-10.1807%22%20fill%3D%22none%22%20stroke-linecap%3D%22round%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E";

  class TemporalExtension {
    getInfo() {
      return {
        id: "temporalby8x2",
        name: Scratch.translate("Temporal"),
        blockIconURI,
        color1: "#5598d4",
        color2: "#236fa8",
        color3: "#005188",
        blocks: [
          {
            opcode: "now",
            text: Scratch.translate("present timestamp"),
            blockType: Scratch.BlockType.REPORTER,
          },
        ],
      };
    }

    now(args, util) {
      return Temporal.Now.zonedDateTimeISO().toString();
    }
  }

  Scratch.extensions.register(new TemporalExtension());
})(Scratch);
