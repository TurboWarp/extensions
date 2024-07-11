// Name: File System Access API
// ID: FileSystemAccessAPIv2
// Description: Access and modify files and folders using FSA-API.
// By: Rocky the Protogen
// License: GNU-GPL3


(function(Scratch) { //for some reason this was async. Changed it back.
    'use strict';

    //Imports
    ///Toaster-UI - https://toster-js.vercel.app/#playground
    require("./toasts.css");
    const tui = ToasterUi;

    class ToasterUi {
      constructor() {
        this.toastMap = new Map(); // Use a Map to store the toasts with their IDs
        this.container = document.createElement("div");
        this.container.classList.add("toaster-ui-lib-container");
        document.body.appendChild(this.container);
      }
    
      addToast(content, type = "default", options = {}) {
        const toast = new Toast(content, type, options);
        // this.container.appendChild(toast.toastElement);
        this.container.insertBefore(toast.toastElement, this.container.firstChild);
        this.toastMap.set(toast.id, toast); // Store the toast in the Map using its ID
        toast.show();
        return toast.id; // Return the ID of the added toast
      }
    
      updateToast(id, content, type, options = {}) {
        const toast = this.toastMap.get(id); // Retrieve the toast using its ID from the Map
        if (toast) {
          console.log(toast);
          toast.update(content, type, options, toast);
        }
      }
    }
    class Toast {
        constructor(content, type = "default", options = {}) {
          this.id = options.id || this.generateId();
          this.content = content;
          this.type = type;
          this.allowHtml = options.allowHtml || false; // Whether the toast should allow HTML content
          this.autoClose =
            options.autoClose === false
              ? false
              : this.type === "loading"
              ? false
              : true; // Whether the toast should automatically close after the duration
          this.duration = options.duration || 3000; // Default duration of 3 seconds
          this.dismissTimeout = null;
          this.onClose = options.onClose || null; // Custom callback function on toast close
          this.createToastElement(this.content, this.type, this.duration);
          this.setCustomStyles(options.styles);
        }
      
        createToastElement(content, type, duration) {
          this.toastElement = document.createElement("div");
          this.toastElement.classList.add("toaster-ui-lib");
          this.toastElement.classList.add(`toaster-ui-lib-${type}`);
          this.toastElement.style.setProperty("--timer", ` ${duration}ms`);
          this.toastElement.style.setProperty(
            "--display",
            this.autoClose ? "block" : "none"
          );
      
          if (this.type === "loading") {
            const loadingElement = document.createElement("div");
            loadingElement.classList.add("toaster-ui-lib-loader");
            this.toastElement.appendChild(loadingElement);
          }
      
          const textElement = document.createElement("span");
          textElement.classList.add("toaster-ui-lib-text");
          if (this.allowHtml) {
            textElement.innerHTML = `<span>${content}</span>`;
          } else {
            textElement.innerText = content;
          }
      
          this.toastElement.appendChild(textElement);
      
          const closeButton = document.createElement("span");
          closeButton.classList.add("toaster-ui-lib-close");
          closeButton.innerHTML = "&times;";
          closeButton.addEventListener("click", () => {
            this.close();
          });
      
          this.toastElement.appendChild(closeButton);
        }
      
        generateId() {
          return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
        }
      
        update(content, type, options = {}, existingToastElement) {
          this.content = content;
          this.type = type || existingToastElement.type;
          this.allowHtml = options.allowHtml || existingToastElement.allowHtml;
          this.autoClose =
            options.autoClose !== undefined
              ? options.autoClose === false
                ? false
                : true
              : existingToastElement.type === "loading"
              ? true
              : existingToastElement.autoClose;
          this.onClose = options.onClose || existingToastElement.onClose;
          this.duration = options.duration || existingToastElement.duration;
          this.setCustomStyles(options.styles || existingToastElement.styles);
      
          if (this.toastElement) {
            this.toastElement.className = `toaster-ui-lib toaster-ui-lib-${this.type}`;
            this.toastElement.style.setProperty("--timer", `${this.duration}ms`);
            this.toastElement.style.setProperty(
              "--display",
              this.autoClose ? "block" : "none"
            );
          }
          this.toastElement.innerHTML = "";
      
          if (this.type === "loading") {
            const loadingElement = document.createElement("div");
            loadingElement.classList.add("toaster-ui-lib-loader");
            this.toastElement.appendChild(loadingElement);
          }
      
          const textElement = document.createElement("span");
          textElement.classList.add("toaster-ui-lib-text");
          if (this.allowHtml) {
            textElement.innerHTML = `<span>${this.content}</span>`;
          } else {
            textElement.innerText = this.content;
          }
      
          this.toastElement.appendChild(textElement);
      
          const closeButton = document.createElement("span");
          closeButton.classList.add("toaster-ui-lib-close");
          closeButton.innerHTML = "&times;";
          closeButton.addEventListener("click", () => {
            this.close();
          });
      
          this.toastElement.appendChild(closeButton);
      
          if (this.autoClose === true) {
            this.startDismissTimeout();
          }
        }
      
        setCustomStyles(styles) {
          if (styles && typeof styles === "object") {
            Object.assign(this.toastElement.style, styles);
          }
        }
      
        setDuration(duration) {
          this.duration = duration;
        }
      
        show() {
          this.toastElement.style.opacity = "0";
          if (this.autoClose === true) {
            this.startDismissTimeout();
          }
        }
      
        startDismissTimeout() {
          this.dismissTimeout = setTimeout(() => {
            this.close();
          }, this.duration);
        }
      
        close() {
          if (typeof this.onClose === "function") {
            this.onClose(); // Execute the custom onClose callback
          }
      
          this.toastElement.style.animation =
            "toaster-ui-lib-slide-out-blurred-right 0.6s cubic-bezier(0.445, 0.05, 0.55, 0.95) both"; // Start closing animation
      
          // Remove the toast element from the container after the animation ends
          this.toastElement.addEventListener("animationend", () => {
            clearTimeout(this.dismissTimeout);
            if (this.toastElement.parentNode) {
              this.toastElement.parentNode.removeChild(this.toastElement);
            }
          });
        }
      }
      ///Toaster-UI end

    //Define global varaibles

    /* File Info */
    let fileHandle1 = '', fileHandle2 = '', fileHandle3 = '', fileHandle4 = '', fileHandle5 = '';
    let fimetadata1 = '', fimetadata2 = '', fimetadata3 = '', fimetadata4 = '', fimetadata5 = '';

    /* Folder Info */
    let folderHandle1 = '', folderHandle2 = '', folderHandle3 = '', folderHandle4 = '', folderHandle5 = '';
    let fometadata1 = '', fometadata2 = '', fometadata3 = '', fometadata4 = '', fometadata5 = '';

    //Define global const
    const app = {hasFSAccess: "chooseFileSystemEntries" in window || "showOpenFilePicker" in window};
    const bt = {reporter: Scratch.BlockType.REPORTER, boolean: Scratch.BlockType.BOOLEAN, command: Scratch.BlockType.COMMAND, label: Scratch.BlockType.LABEL, button: Scratch.BlockType.BUTTON}
    const conv = new Scratch.Cast()
    const cs = console
    const idb = window.indexedDB


    const argt = Scratch.ArgumentType.STRING
    const fislotmenu = ['1','2','3','4','5']
    const fislot = {1: {file: fileHandle1, metadata: fimetadata1},2: {file: fileHandle2, metadata: fimetadata2},3: {file: fileHandle3, metadata: fimetadata3},4: {file: fileHandle4, metadata: fimetadata4},5: {file: fileHandle5, metadata: fimetadata5}}
    const foslot = {1: {file: folderHandle1,metadata: fometadata1},2: {file: folderHandle2,metadata: fometadata2},3: {file: folderHandle3,metadata: fometadata3},4: {file: folderHandle4,metadata: fometadata4},5: {file: folderHandle5,metadata: fometadata5}}

    //Checks
    if (!Scratch.extensions.unsandboxed) throw new Error('File System Access API must run unsandboxed');
    if (!app.hasFSAccess) alert('Browser is incompatible: API not found.\nBlocks will not function.');

    //Check extensions
    let LoadedExtensions = JSON.stringify(Array.from(Scratch.vm.extensionManager._loadedExtensions.keys()));    

    //WOAH
    // 2 Classes? Yes!
    // Why? Separation.
    // Or, more specifically, to help the user recognise functions more easily.
    // Doesn't say I can't... so I will.
    class files {
        getInfo() {
          return {
            id: 'filesystemaccessapiv2files',
            name: 'FSA Files',
            blocks: [
            {
                opcode: 'openFile',
                blockType: bt.command,
                text: 'In FILE slot [num] open a file',
                arguments: {
                    num: {
                        type: argt,
                        menu: 'num'
                    }
                }
            },
            {
                opcode: 'cancel',
                blockType: bt.command,
                text: 'Empty FILE slot [num]',
                arguments: {
                    num: {
                        type: argt,
                        menu: 'num'
                    }
                }
            },
              '---',
            {
                opcode: 'metadata',
                blockType: bt.reporter,
                text: 'FILE slot [num]\'s metadata',
                arguments: {
                    num: {
                        type: argt,
                        menu: 'num'
                    }
                }
            },
            {
                opcode: 'getData',
                blockType: bt.reporter,
                text: 'Read FILE slot [num] with method [type]',
                arguments: {
                    num: {
                        type: argt,
                        menu: 'num'
                    },
                    type: {
                        type: argt,
                        menu: 'methods'
                    }
                }
            },
        ],
            menus: {
                num: {
                    acceptReporters: true,
                    items: fislotmenu
                },
                methods: {
                    acceptReporters: true,
                    items: ['stream','arrayBuffer','text']
                }
            }
          };
        }
        //Functions
        async openFile(args) { //Shows the file picker and gets file information.
            tui.addToast("This is a toast");
            const slot = fislot[args.num];
            try {
                if ((slot.file == '') && (slot.metadata == '')) {
                    [slot.file] = await window.showOpenFilePicker()
                    cs.log(slot.file)
                    slot.metadata = await slot.file.getFile()
                    cs.log(slot.metadata)
                    if (slot.metadata.size >= 25000000) if (!confirm('This file exceeds 25 MB and could cause problems.\nIf you wish to continue, press OK.\nOtherwise, press cancel.')) await this.cancel(slot).then(cs.error('User has quit import.'));
                }
            } catch (err) {
                cs.error('\nFailed to open.\n\nDetails:\n' + err)
                return 'Failed to open.\nDetails:\n' + err;
            }
        }

        metadata(args) {
            const slot = fislot[args.num];
            return JSON.stringify({name: slot.metadata.name,lastModified: slot.metadata.lastModified,lastModifiedDate: slot.metadata.lastModifiedDate,webkitRelativePath: slot.metadata.webkitRelativePath,size: slot.metadata.size,type: slot.metadata.type});
        }

        cancel(args,CurrentSlot) {
            function recogslot(Block,Func) {if (!Block) {return Func} else {return fislot[Block]}}
            const slot = recogslot(args.num,CurrentSlot)
            slot.file = '';
            slot.metadata = '';
        }

        async getData(args) {
            const slot = fislot[args.num];

            const ab = (async() => {const arrayBuffer = await slot.file.arrayBuffer();const uint8Array = new Uint8Array(arrayBuffer);return "[" + Array.from(uint8Array).toString() + "]";})
            const s = (async() =>{const streamReader = slot.file.stream().getReader();const decoder = new TextDecoder();let StreamOutResult = "";const chunkSize = 1024;async function readChunks() {while (true) {const { done, value } = await streamReader.read();if (done) {console.log("Stream reading complete.");return StreamOutResult;}StreamOutResult += decoder.decode(value, { stream: true });if (value.length >= chunkSize) {await new Promise((resolve) => setTimeout(resolve, 5));}}}return await readChunks();})
            if (!slot.metadata) return "";
            try {if (args.TYPE === "arrayBuffer") {return await ab;} else if (args.TYPE === "text") {return await slot.file.text();} else if (args.TYPE === "stream") {return await s;} else {console.error("Invalid type specified");}} catch (error) {console.error("Error reading file:", error);console.error("Error reading file");}
        }
    }


    class folders {
      getInfo() {
        return {
          id: 'filesystemaccessapiv2folders',
          name: 'FSA Folders',
          blocks: [
            {
                opcode: 'openFolder',
                blockType: bt.command,
                text: 'In FOLDER slot [num] open a folder',
                arguments: {
                    num: {
                        type: argt,
                        menu: 'num'
                    }
                }
              }
            ],
            menus: {
                num: {
                    acceptReporters: true,
                    items: fislotmenu
                }
            }
      };
      //Functions
    }
    }

    if (!LoadedExtensions.includes("skyhigh173JSON")) Scratch.vm.extensionManager.loadExtensionURL("https://extensions.turbowarp.org/Skyhigh173/json.js")
    try {
        Scratch.extensions.register(new files())
        Scratch.extensions.register(new folders())
    } catch (err) {
        alert('Failed to load a module!\nPlease report this issue.\nDetails:\n' + err);
    }
  })(Scratch);