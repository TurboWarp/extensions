// Name: Fetch+
// ID: fetchplus
// Description: Make requests to the broader internet and use CORS proxies.
// License: MPL-2.0

(function (Scratch) {
  'use strict'
class AsyncExtension {
  getInfo() {
    return {
      id: 'fetchplus',
      name: 'Fetch+',
      blocks: [
        {
          opcode: 'fetch_norm',
          text: 'fetch [URL]',
          blockType: Scratch.BlockType.REPORTER,
          arguments: {
            URL: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'https://extensions.turbowarp.org/hello.txt'
            }
          }
        },

        {
            opcode: 'cors_fetch',
            text: 'fetch with CORS proxy [URL]',
            blockType: Scratch.BlockType.REPORTER,
            arguments: {
              URL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'https://extensions.turbowarp.org/hello.txt'
              }
            }
          }
      ]
    };
  }
  fetch_norm (args) {
    return Scratch.fetch(args.URL)
      .then((response) => {
        return response.text();
      })
      .catch((error) => {
        console.error(error);
        return 'Uh oh! Something went wrong.';
      });
  }

  cors_fetch(args) {
    return Scratch.fetch('https://corsproxy.io/?' + encodeURIComponent(args.URL))
      .then((response) => {
        return response.text();
      })
      .catch((error) => {
        console.error(error);
        return 'Uh oh! Something went wrong.';
      });
  }
}
Scratch.extensions.register(new AsyncExtension());
})(Scratch);
