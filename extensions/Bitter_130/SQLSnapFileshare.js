class ServerExtension {
  constructor(runtime) {
    this.runtime = runtime;
    this.serverURL = 'https://snapextensions.uni-goettingen.de/handleTextfile.php';
  }

  getInfo() {
    return {
      id: 'serverData',
      name: 'SQLSnap! Servers',
      color1: '#31b3d4',
      color2: '#179fc2',
      blocks: [
        {
          opcode: 'setServerURL',
          blockType: Scratch.BlockType.COMMAND,
          text: 'set server URL to [url]',
          arguments: {
            url: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: this.serverURL,
            },
          },
        },
        {
          opcode: 'saveToServer',
          blockType: Scratch.BlockType.COMMAND,
          text: 'save [variableName] with content [content]',
          arguments: {
            variableName: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'default.txt',
            },
            content: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'Hello, World!',
            },
          },
        },
        {
          opcode: 'loadFromServer',
          blockType: Scratch.BlockType.REPORTER,
          text: 'load [variableName]',
          arguments: {
            variableName: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'data.txt',
            },
          },
        },
        {
          opcode: 'fits',
          blockType: Scratch.BlockType.BOOLEAN,
          text: '[data] fits on server?',
          arguments: {
            data: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'data',
            },
          },
        },
        {
          opcode: 'deleteFromServer',
          blockType: Scratch.BlockType.COMMAND,
          text: 'delete [variableName]',
          arguments: {
            variableName: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'data.txt',
            },
          },
        },
      ],
    };
  }

  setServerURL(args, util) {
    this.serverURL = args.url;
    console.log(`Server URL set to: ${this.serverURL}`); // Debug line
  }

  saveToServer(args, util) {
    const variableName = args.variableName;
    const content = args.content;

    const url =
      this.serverURL +
      '?type=write' +
      '&content=' +
      encodeURIComponent(content) +
      '&filename=./textfiles/' +
      encodeURIComponent(variableName);

    return fetch(url)
      .then(response => response.text())
      .then(result => (result === 'ok'))
      .catch(error => {
        console.error('Failed to save data:', error);
        return false;
      });
  }

  loadFromServer(args, util) {
    const variableName = args.variableName;

    const url =
      this.serverURL +
      '?type=read' +
      '&filename=./textfiles/' +
      encodeURIComponent(variableName);

    return fetch(url)
      .then(response => response.text())
      .then(text => {
        if (text === 'ERROR: file does not exist') {
          return ''; // Return empty string or any indication that file does not exist
        } else {
          return text;
        }
      })
      .catch(error => {
        console.error('Failed to load data:', error);
        return "can't get data";
      });
  }

  fits(args, util) {
    return args.data.length < 10001;
  }

  deleteFromServer(args, util) {
    const variableName = args.variableName;

    const url =
      this.serverURL +
      '?type=delete' +
      '&filename=./textfiles/' +
      encodeURIComponent(variableName);

    return fetch(url)
      .then(response => response.text())
      .then(result => (result === 'ok'))
      .catch(error => {
        console.error('Failed to delete data:', error);
        return false;
      });
  }
}

Scratch.extensions.register(new ServerExtension());
