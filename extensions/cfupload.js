// Name: Upload
// ID: cfupload
// Description: Upload files to the Network, can also used with Files extension.
// By: Codefoxy <https://scratch.mit.edu/users/odavido123Daptoper/>
// Original: Codefoxy
// License: MIT AND MPL-2.0
(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("files extension must be run unsandboxed");
  }
  let a = {};
  let apiurl = "";
  let apiformname = "";
  const formDataEntries = {};
  let StatusCode = 0; // Variable to hold status code
  let RawRespond = ""; // Variable to hold raw Respond or scratch will crash
  /**
   * @param {string} data Data to upload
   * @param {string} filename Name of the file
   * @param {string} link URL to upload to
   * @param {string} formName Form name for the file
   * @returns {Promise<string>} A promise that resolves to the server response data
   */
  const uploadFileToLink = (data, filename, link, formName) => {
    const formData = new FormData();
    const blob = new Blob([data], { type: "text/plain" });
    formData.append(formName, blob, filename);

    // Add additional form data entries
    for (const key in formDataEntries) {
      if (Object.prototype.hasOwnProperty.call(formDataEntries, key)) {
        formData.append(key, formDataEntries[key]);
      }
    }

    return Scratch.fetch(link, {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        // Set StatusCode based on response status
        StatusCode = response.status;
        return response.text(); // Assuming the response is text
      })
      .then((result) => {
        try {
          RawRespond = result;
          return JSON.stringify(result);
        } catch (error) {
          return result;
        }
      });
  };

  class Upload {
    getInfo() {
      return {
        id: "cfupload",
        name: "Upload",
        color1: "#fcb103",
        blocks: [
          {
            opcode: "addFormData",
            blockType: Scratch.BlockType.COMMAND,
            text: "add formdata [key]: [value]",
            arguments: {
              key: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "key",
              },
              value: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "value",
              },
            },
          },
          {
            opcode: "uploadFileToLink",
            blockType: Scratch.BlockType.REPORTER,
            text: "upload [data] as [filename] to [link] as [formName]",
            arguments: {
              data: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Hello, world!",
              },
              filename: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "file.txt",
              },
              link: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "https://example.com/upload",
              },
              formName: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "fileToUpload",
              },
            },
          },

          {
            opcode: "callapi",
            blockType: Scratch.BlockType.REPORTER,
            text: "Upload [data] to [Apis] as [name]",
            arguments: {
              data: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Hello, World!",
              },
              name: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "file.txt",
              },
              Apis: {
                type: Scratch.ArgumentType.STRING,
                menu: "Apis",
              },
            },
          },
          {
            opcode: "getStatusCode",
            blockType: Scratch.BlockType.REPORTER,
            text: "status code",
          },
          {
            opcode: "getRawRespond",
            blockType: Scratch.BlockType.REPORTER,
            text: "Raw Respond",
          },
        ],
        menus: {
          Apis: {
            acceptReporters: false,
            items: ["Catbox.moe", "file.io"],
          },
        },
      };
    }
    /**
     * @param {string} data Data to upload
     * @param {string} Apis apis menu
     * @param {string} name Name of the file
     * @returns {Promise<string>} Respond url
     */
    callapi(args) {
      switch (args.Apis) {
        case "Catbox.moe":
          apiurl = "https://catbox.moe/user/api.php";
          formDataEntries.reqtype = "fileupload";
          apiformname = "fileToUpload";
          break;
        case "file.io":
          apiurl = "https://file.io/?title=" + args.name;
          apiformname = "file";
          break;
      }
      return uploadFileToLink(args.data, args.name, apiurl, apiformname).then(
        (response) => {
          try {
            a = JSON.parse(response); // Assuming response is JSON
            return a;
          } catch (error) {
            console.error("Error parsing response as JSON:", error);
            return response;
          }
        }
      );
    }

    uploadFileToLink(args) {
      return uploadFileToLink(
        args.data,
        args.filename,
        args.link,
        args.formName
      ).then((response) => {
        try {
          return JSON.parse(response); // Assuming response is JSON
        } catch (error) {
          console.error("Error parsing response as JSON:", error);
          return response;
        }
      });
    }

    addFormData(args) {
      formDataEntries[args.key] = args.value;
    }

    getStatusCode() {
      return StatusCode; // Return the stored status code
    }
    getRawRespond() {
      return RawRespond;
    }
  }

  Scratch.extensions.register(new Upload());
})(Scratch);
