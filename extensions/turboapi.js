// Name: TurboAPI
// ID: TurboAPI
// Description: GET and POST requests in Scratch!
// By: Tek <https://github.com/Tekinical/>

let APIResponse = null;

class TurboAPI {
  getInfo() {
    return {
      id: 'TurboAPI',
      name: 'TurboAPI',
      menuIconURI: 'https://files.catbox.moe/4eb196.png',
      color1: '#FF4C4C',
      blocks: [
        {
          opcode: 'sendResponse',
          blockType: Scratch.BlockType.COMMAND,
          text: 'GET Request from [endpoint]',
          arguments: {
            endpoint: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'Website Endpoint'
            }
          }
        },
        {
          opcode: 'sendPost',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Send a Post Request to [endpoint] with [arg]',
          arguments: {
            endpoint: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'Website Endpoint'
            },
            arg: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'Arguments'
            }
          }
        },
        {
          opcode: 'responseAPI',
          blockType: Scratch.BlockType.REPORTER,
          text: 'API Response',
          blockIconURI: 'https://freeiconshop.com/wp-content/uploads/edd/download-flat.png'
        }
      ]
    }
  }

    sendResponse(args) {
      let xhr = new XMLHttpRequest();
      xhr.open("GET", args.endpoint);

      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          APIResponse = xhr.responseText;
        } else {
          APIResponse = "Error with Get Request.";
        }
      };

      xhr.send();
    }

    sendPost(args) {
      let xhr = new XMLHttpRequest();
      xhr.open("POST", args.endpoint, true);
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 & xhr.status == 200) {
          APIResponse = xhr.responseText;
        } else {
          APIResponse = "Error with Post Request.";
        }
      }

      xhr.send(args.arguments);
    }

    responseAPI() {
      return APIResponse;
    }
}

Scratch.extensions.register(new TurboAPI());
