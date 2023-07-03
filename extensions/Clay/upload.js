class Upload {
    getInfo() {
      return {
        id: "uploadfile",
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
            }
          }
        ]
      };
    }
  
    upload(args) {
      return new Promise((resolve, reject) => {
        const inputElement = document.createElement("input");
        inputElement.type = "file";
        inputElement.style.display = "none";
        document.body.appendChild(inputElement);
  
        inputElement.click();
  
        inputElement.addEventListener("change", function() {
          if (this.files && this.files[0]) {
            const formData = new FormData();
            formData.append("file", this.files[0], this.files[0].name);
  
            const url = args.url;
  
            const xhr = new XMLHttpRequest();
            xhr.open("POST", url, true);
  
            xhr.onload = function() {
              if (xhr.readyState === 4 && xhr.status === 200) {
                resolve(xhr.responseText);
                inputElement.remove();
              } else {
                reject("Upload failed");
                inputElement.remove();
                // throw 'Upload failed';
              }
            };
  
            xhr.onerror = function() {
              reject("Upload failed");
              inputElement.remove();
              // throw 'Upload failed';
            };
  
            xhr.send(formData);
          } else {
            reject("No file chosen");
            inputElement.remove();
            // throw 'No file chosen';
          }
        });
      });
    }
  }
  
  Scratch.extensions.register(new Upload());