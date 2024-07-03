// Name: Upload
// ID: cfupload
// Description: Upload files to the Network, can also used with Files extension
// By: Codefoxy <https://scratch.mit.edu/users/odavido123Daptoper/>
// Original: Codefoxy
// License: MIT AND MPL-2.0

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("files extension must be run unsandboxed");
  }

  /**
   * @param {string} data Data to upload
   * @param {string} filename Name of the file
   * @param {string} link URL to upload to
   */
  const uploadFileToLink = (data, filename, link) => {
    const formData = new FormData();
    const blob = new Blob([data], { type: "text/plain" });
    formData.append("file", blob, filename);

    Scratch.fetch(link, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("Upload result:", result);
        alert(`File "${filename}" uploaded successfully!`);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        alert(`Failed to upload "${filename}". Please try again.`);
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
            opcode: "uploadFileToLink",
            blockType: Scratch.BlockType.COMMAND,
            text: "upload [data] as [filename] to link [link]",
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
            },
          },
        ],
      };
    }

    uploadFileToLink(args) {
      uploadFileToLink(args.data, args.filename, args.link);
    }
  }

  Scratch.extensions.register(new Upload());
})(Scratch);
