(function(Scratch) {
    'use strict';
    class Upload {
        getInfo() {
            return {
                id: "clayuploadfile",
                name: "Upload",
                blocks: [{
                    opcode: "upload",
                    blockType: Scratch.BlockType.REPORTER,
                    text: "upload file to [url]",
                    arguments: {
                        url: {
                            type: Scratch.ArgumentType.STRING,
                            defaultValue: "https://store1.gofile.io/uploadFile",
                        },
                    }
                }]
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

                        const options = {
                            body: formData,
                            method: 'POST',
                            mode: 'cors',
                        };

                        Scratch.fetch(args.url, options)
                            .then(response => {
                                if (response.ok) {
                                    return response.text();
                                } else {
                                    throw new Error("Upload failed");
                                }
                            })
                            .then(text => {
                                resolve(text);
                                inputElement.remove();
                            })
                            .catch(error => {
                                reject(error.message);
                                inputElement.remove();
                            });
                    } else {
                        reject("No file chosen");
                        inputElement.remove();
                    }
                });
            });
        }
    }

    Scratch.extensions.register(new Upload());
})(Scratch);
