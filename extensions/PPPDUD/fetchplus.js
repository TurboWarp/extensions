// Name: Fetch+
// ID: fetchplus
// Description: Make requests to the broader internet and use CORS proxies.
// License: MPL-2.0

class AsyncExtension {
  getInfo() {
    return {
      id: 'fetchplus',
      name: 'Fetch+',
      blocks: [
        {
          opcode: 'fetch',
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
            text: 'fetch with proxy [URL]',
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
  fetch (args) {
    return fetch(args.URL)
      .then((response) => {
        return response.text();
      })
      .catch((error) => {
        console.error(error);
        return 'Uh oh! Something went wrong.';
      });
  }

  cors_fetch(args) {
    return fetch('https://corsproxy.io/?' + encodeURIComponent(args.URL))
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
