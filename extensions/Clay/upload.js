(function(Scratch) {
    'use strict';
    
    const getGofileServer = async () => {
        try {
            const response = await fetch('https://api.gofile.io/getServer');
            if (!response.ok) {
                throw new Error('HTTP error ' + response.status);
            }
            const serverData = await response.json();
            return `https://${serverData.data.server}.gofile.io/uploadFile`;
        } catch (error) {
            console.error('Failed to fetch Gofile server: ', error);
        }
    }
    
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
                        }
                    },
                    {
                        opcode: "uploadToGofile",
                        blockType: Scratch.BlockType.REPORTER,
                        text: "upload file to [url]",
                        arguments: {
                            url: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "gofile.io",
                                menu: 'websites'
                            },
                        }
                    }
                ],
                menus: {
                    websites: {
                        acceptReporters: false,
                        items: ["gofile.io"]
                    }
                }
            };
        }

        upload(args) {
            return this.performUpload(args.url);
        }

        async uploadToGofile(args) {
            if (args.url.toLowerCase() === 'gofile.io') {
                args.url = await getGofileServer();
            }
            return this.performUpload(args.url);
        }

        performUpload(url) {
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

                        // @ts-ignore
                        Scratch.fetch(url, options)
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
