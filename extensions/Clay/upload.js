(function(Scratch) {
    'use strict';

    const getGofileServer = async () => {
        try {
            const response = await Scratch.fetch('https://api.gofile.io/getServer');
            if (!response.ok) {
                throw new Error('HTTP error ' + response.status);
            }
            const serverData = await response.json();
            return `https://${serverData.data.server}.gofile.io/uploadFile`;
        } catch (error) {
            console.error('Failed to fetch Gofile server: ', error);
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
                                menu: 'websites'
                            },
                        }
                    }
                ],
                menus: {
                    websites: {
                        acceptReporters: false,
                        items: ["gofile.io", "file.io"]
                    }
                }
            };
        }

        upload(args) {
            return this.performUpload(args.url, true);
        }

        async uploadToWebsite(args) {
            let url;
            switch (args.url.toLowerCase()){
                case 'gofile.io':
                    url = await getGofileServer();
                    break;
                case 'file.io':
                    url = 'https://file.io/';
                    break;
            }
            return this.performUpload(url, false);
        }

        performUpload(url, rawJson = false) {
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

                        Scratch.fetch(url, options)
                            .then(response => {
                                if (response.ok) {
                                    return response.json();
                                } else {
                                    throw new Error("Upload failed");
                                }
                            })
                            .then(data => {
                                const result = rawJson ? JSON.stringify(data) : data.link || data.data.downloadPage;
                                resolve(result);
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
