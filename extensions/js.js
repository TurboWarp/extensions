// Name: JavaScript
// ID: ampJs
// Description: Run custom code in JavaScript. Only use if you know what you're doing.
// License: MPL-2.0
// Tags: new
// Is-ampmod: true

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("JavaScript extension must run unsandboxed");
  }

  class JsExtension {
    getInfo() {
      return {
        id: "ampJs",
        name: Scratch.translate("JavaScript"),
        blocks: [
          {
            opcode: "reportJs",
            text: "run JavaScript [JS]",
            blockType:
              typeof amp !== "undefined"
                ? Scratch.BlockType.MULTIREPORTER
                : Scratch.BlockType.REPORTER,
            arguments: {
              JS: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Math.pow(2, 8)",
              },
            },
            extensions: ["colours_more"],
          },
          {
            opcode: "execJs",
            text: "run JavaScript [JS]",
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              JS: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "alert('Hello world!')",
              },
            },
            extensions: ["colours_more"],
          },
        ],
      };
    }

    async _createIsolatedFrame() {
      const iframe = document.createElement("iframe");
      iframe.style.display = "none";
      document.body.appendChild(iframe);

      // Force a clean document instead of relying on onload
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      doc.open();
      doc.write("<!DOCTYPE html><html><body></body></html>");
      doc.close();

      const iw = iframe.contentWindow;

      // Inject safe fetch override
      iw.fetch = async (url, options) => {
        try {
          if (Scratch.canFetch && (await Scratch.canFetch(url))) {
            return await Scratch.fetch(url, options);
          } else {
            return new iw.Response(
              JSON.stringify({ ok: false, message: "Fetch not allowed" }),
              { status: 403, headers: { "Content-Type": "application/json" } }
            );
          }
        } catch (err) {
          return new iw.Response(
            JSON.stringify({ ok: false, error: err.message }),
            { status: 500, headers: { "Content-Type": "application/json" } }
          );
        }
      };

      // Inject safe open override
      iw.open = async (url, target) => {
        if (Scratch.canOpenWindow && (await Scratch.canOpenWindow(url))) {
          Scratch.openWindow(url, target);
        }
      };

      // Delay to ensure iframe JS context is stable
      await new Promise((r) => setTimeout(r, 10));
      return { iframe, iw };
    }

    async reportJs(args) {
      const { iframe, iw } = await this._createIsolatedFrame();
      try {
        const code = String(args.JS);
        const fn = new iw.Function(
          `"use strict"; return (async () => (${code}))();`
        );
        const result = await fn.call(iw);
        iframe.remove();
        return result;
      } catch (err) {
        iframe.remove();
        return "Error: " + err.message;
      }
    }

    async execJs(args) {
      const { iframe, iw } = await this._createIsolatedFrame();
      try {
        const code = String(args.JS);
        const fn = new iw.Function(
          `"use strict"; return (async () => { ${code} })();`
        );
        await fn.call(iw);
      } catch (err) {
        alert("JavaScript block failed to run: " + err.message);
      } finally {
        iframe.remove();
      }
    }
  }

  Scratch.extensions.register(new JsExtension());
})(Scratch);
