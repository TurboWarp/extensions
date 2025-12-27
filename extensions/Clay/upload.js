// Name: Upload
// ID: clayuploadfile
// Description: Upload files to web servers.
// By: ClaytonTDM <https://scratch.mit.edu/users/ClaytonTDM/>

(function (Scratch) {
  "use strict";

  const getGofileServer = async () => {
    try {
      const response = await Scratch.fetch("https://api.gofile.io/getServer");
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      const serverData = await response.json();
      return `https://${serverData.data.server}.gofile.io/uploadFile`;
    } catch (error) {
      console.error("Failed to fetch Gofile server: ", error);
      throw error;
    }
  };

  class Upload {
    getInfo() {
      return {
        id: "clayuploadfile",
        name: "Upload",
        blocks: [
          {
            opcode: "upload",
            blockType: Scratch.BlockType.REPORTER,
            text: "upload file to [url]",
            arguments: {
              url: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "https://store1.gofile.io/uploadFile",
              },
            },
          },
          {
            opcode: "uploadToWebsite",
            blockType: Scratch.BlockType.REPORTER,
            text: "upload file to [url]",
            arguments: {
              url: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "gofile.io",
                menu: "websites",
              },
            },
          },
          {
            opcode: "uploadData",
            blockType: Scratch.BlockType.REPORTER,
            text: "upload [data] to [url]",
            arguments: {
              data: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Hello TurboWarp!",
              },
              url: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "https://store1.gofile.io/uploadFile",
              },
            },
          },
          {
            opcode: "uploadDataToMenu",
            blockType: Scratch.BlockType.REPORTER,
            text: "upload [data] to [menu]",
            arguments: {
              data: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Hello TurboWarp!",
              },
              menu: {
                type: Scratch.ArgumentType.STRING,
                menu: "websites",
              },
            },
          },
        ],
        menus: {
          websites: {
            acceptReporters: false,
            items: ["gofile.io", "file.io"],
          },
        },
      };
    }

    upload(args) {
      return this.performUpload(args.url, true);
    }

    async uploadToWebsite(args) {
      let url;
      switch (args.url.toLowerCase()) {
        case "gofile.io":
          url = await getGofileServer();
          break;
        case "file.io":
          url = "https://file.io/";
          break;
        default:
          return "invalid host";
      }
      return this.performUpload(url, false);
    }

    uploadData(args) {
      return this.performUploadWithData(args.data, args.url, "data.txt", true);
    }

    uploadDataToMenu(args) {
      let urlPromise;
      switch (args.menu.toLowerCase()) {
        case "gofile.io":
          urlPromise = getGofileServer();
          break;
        case "file.io":
          urlPromise = Promise.resolve("https://file.io/");
          break;
        default:
          return "invalid host";
      }

      return urlPromise.then((url) => {
        return this.performUploadWithData(args.data, url, "data.txt", false);
      });
    }

    performUpload(url, rawJson = false) {
      return new Promise((resolve, reject) => {
        const inputElement = document.createElement("input");
        inputElement.type = "file";
        inputElement.style.display = "none";
        document.body.appendChild(inputElement);

        inputElement.click();

        inputElement.addEventListener("cancel", function () {
          resolve("Upload cancelled");
          inputElement.remove();
        });

        inputElement.addEventListener("change", function () {
          if (this.files && this.files[0]) {
            const formData = new FormData();
            formData.append("file", this.files[0], "data.txt");

            const options = {
              body: formData,
              method: "POST",
              mode: "cors",
            };

            Scratch.fetch(url, options)
              .then((response) => {
                if (response.ok) {
                  return response.json();
                } else {
                  throw new Error("Upload failed");
                }
              })
              .then((data) => {
                const result = rawJson
                  ? JSON.stringify(data)
                  : data.link || data.data.downloadPage;
                resolve(result);
                inputElement.remove();
              })
              .catch((error) => {
                reject(error.message);
                inputElement.remove();
              });
          } else {
            resolve("No file chosen");
            inputElement.remove();
          }
        });
      });
    }

    performUploadWithData(data, url, fileName, rawJson = false) {
      const formData = new FormData();
      formData.append("file", new Blob([data]), fileName);

      const options = {
        body: formData,
        method: "POST",
        mode: "cors",
      };

      return new Promise((resolve, reject) => {
        Scratch.fetch(url, options)
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error("Upload failed");
            }
          })
          .then((data) => {
            const result = rawJson
              ? JSON.stringify(data)
              : data.link || data.data.downloadPage;
            resolve(result);
          })
          .catch((error) => {
            reject(error.message);
          });
      });
    }
  }

  Scratch.extensions.register(new Upload());
})(Scratch);
