// Name: File System Access API
// ID: FileSystemAccessAPIv2
// Description: Access and modify files and folders using FSA-API.
// By: Rocky the Protogen
// License: GNU-GPL3
// Version: V2-RV1

/*
How to recognise versions:
V - Version, major changes. Includes rewrites that break things.
RV - Revision, minimal changes. Mostly bug fixes.

Vx-RVx - Version x, Revision x

If you are updating this file using a Pull Request:
Change Revision by 1 for simple bug fixes. (Also change IDs to match.)
Change Version by 1 for project-breaking alterations.
Then add yourself to the attribution.
*/

/*
Attribution:
kindpump - https://github.com/kindpump - Contributed code and helped the extension to continue development.
CubesterYT - https://github.com/CubesterYT - Providied advice on submitting a PR in turbowarp/extensions:master.
veggiecan0419 - https://github.com/veggiecan0419 - Asked a question.
Drago-Cuven - https://github.com/Drago-Cuven - Asked a question and provided ideas.
unknown07724 - https://github.com/unknown07724 - Contributed a banner, which trhe current banner is based off of.
*/

// TODO: Wrtie to file in folder.

(function(Scratch) {
    "use strict";

    //Define global varaibles

    /* File Info */
    let fileHandle1 = "",
        fileHandle2 = "",
        fileHandle3 = "",
        fileHandle4 = "",
        fileHandle5 = "",
        fimetadata1 = "",
        fimetadata2 = "",
        fimetadata3 = "",
        fimetadata4 = "",
        fimetadata5 = "";

    /* Folder Info */
    let folderHandle1 = "",
        folderHandle2 = "",
        folderHandle3 = "",
        folderHandle4 = "",
        folderHandle5 = "",
        fileSys1 = "",
        fileSys2 = "",
        fileSys3 = "",
        fileSys4 = "",
        fileSys5 = "";

    /* MEMORY ACTIONS */
    let fileCommit1 = {},
        fileCommit2 = {},
        fileCommit3 = {},
        fileCommit4 = {},
        fileCommit5 = {},
        folderCommit1 = {},
        folderCommit2 = {},
        folderCommit3 = {},
        folderCommit4 = {},
        folderCommit5 = {};

    //Define global const
    const app = {
        hasFSAccess: "chooseFileSystemEntries" in window || "showOpenFilePicker" in window,
    };
    const bt = {
        reporter: Scratch.BlockType.REPORTER,
        boolean: Scratch.BlockType.BOOLEAN,
        command: Scratch.BlockType.COMMAND,
        label: Scratch.BlockType.LABEL,
        button: Scratch.BlockType.BUTTON,
    };
    const j = JSON;
    const cs = console;

    const argt = Scratch.ArgumentType.STRING;
    const fislotmenu = ["1", "2", "3", "4", "5"];
    const fislot = {
        1: {
            file: fileHandle1,
            metadata: fimetadata1,
            commits: fileCommit1,
        },
        2: {
            file: fileHandle2,
            metadata: fimetadata2,
            commits: fileCommit2,
        },
        3: {
            file: fileHandle3,
            metadata: fimetadata3,
            commits: fileCommit3,
        },
        4: {
            file: fileHandle4,
            metadata: fimetadata4,
            commits: fileCommit4,
        },
        5: {
            file: fileHandle5,
            metadata: fimetadata5,
            commits: fileCommit5,
        },
    };
    const foslot = {
        1: {
            folder: folderHandle1,
            fileSys: fileSys1,
            commits: folderCommit1,
        },
        2: {
            folder: folderHandle2,
            fileSys: fileSys2,
            commits: folderCommit2,
        },
        3: {
            folder: folderHandle3,
            fileSys: fileSys3,
            commits: folderCommit3,
        },
        4: {
            folder: folderHandle4,
            fileSys: fileSys4,
            commits: folderCommit4,
        },
        5: {
            folder: folderHandle5,
            fileSys: fileSys5,
            commits: folderCommit5,
        },
    };

    //Checks
    if (!Scratch.extensions.unsandboxed)
        throw new Error("File System Access API must run unsandboxed");
    if (!app.hasFSAccess)
        alert("Browser is incompatible: API not found.\nBlocks will not function.");

    //Check extensions
    let LoadedExtensions = j.stringify(
        // @ts-ignore
        Array.from(Scratch.vm.extensionManager._loadedExtensions.keys())
    );

    //WOAH
    // 2 Classes? Yes!
    // Why? Separation.
    // Or, more specifically, to help the user recognise functions more easily.
    // Doesn't say I can't... so I will.
    class files {
        getInfo() {
            return {
                id: "filesystemaccessapiv2files",
                name: "FSA Files",
                blocks: [{
                        opcode: "openFile",
                        blockType: bt.command,
                        text: "In FILE slot [num] open a file",
                        arguments: {
                            num: {
                                type: argt,
                                menu: "num",
                            },
                        },
                    },
                    {
                        opcode: "cancel",
                        blockType: bt.command,
                        text: "Empty FILE slot [num]",
                        arguments: {
                            num: {
                                type: argt,
                                menu: "num",
                            },
                        },
                    },
                    "---",
                    {
                        opcode: "metadata",
                        blockType: bt.reporter,
                        text: "FILE slot [num]'s metadata",
                        arguments: {
                            num: {
                                type: argt,
                                menu: "num",
                            },
                        },
                    },
                    {
                        opcode: "getData",
                        blockType: bt.reporter,
                        text: "Read FILE slot [num] with method [TYPE]",
                        arguments: {
                            num: {
                                type: argt,
                                menu: "num",
                            },
                            TYPE: {
                                type: argt,
                                menu: "methods",
                            },
                        },
                    },
                    "---",
                    {
                        opcode: "memWrite",
                        blockType: bt.command,
                        text: "Write [in] as [type] to file slot [num] in memory",
                        arguments: {
                            in: {
                                type: argt,
                            },
                            type: {
                                type: argt,
                                menu: "wmethods",
                            },
                            num: {
                                type: argt,
                                menu: "num",
                            },
                        },
                    },
                    {
                        opcode: "memPush",
                        blockType: bt.command,
                        text: "Push changes of [num] to disk and clear",
                        arguments: {
                            num: {
                                type: argt,
                                menu: "num",
                            },
                        },
                    },
                    {
                        opcode: "memChanges",
                        blockType: bt.reporter,
                        text: "Changes of [num] from memory",
                        arguments: {
                            num: {
                                type: argt,
                                menu: "num",
                            },
                        },
                    },
                    {
                        opcode: "memRead",
                        blockType: bt.reporter,
                        text: "Changes of [num] applied to memory",
                        arguments: {
                            num: {
                                type: argt,
                                menu: "num",
                            },
                        },
                    },
                    {
                        opcode: "memClear",
                        blockType: bt.command,
                        text: "Clear changes of [num]",
                        arguments: {
                            num: {
                                type: argt,
                                menu: "num",
                            },
                        },
                    },
                    "---",
                    {
                        blockType: bt.label,
                        text: "Advanced File Blocks",
                    },
                    {
                        opcode: "store",
                        blockType: bt.command,
                        text: "[ss] => slot ([num]) <=> store ([name])",
                        arguments: {
                            num: {
                                type: argt,
                                menu: "num",
                            },
                            name: {
                                type: argt,
                            },
                            ss: {
                                type: argt,
                                menu: "ss",
                            },
                        },
                    },
                    "---",
                ],
                menus: {
                    ss: {
                        acceptReporters: true,
                        items: ["Push", "Pull"],
                    },
                    num: {
                        acceptReporters: true,
                        items: fislotmenu,
                    },
                    methods: {
                        acceptReporters: true,
                        items: ["stream", "arrayBuffer", "text"],
                    },
                    wmethods: {
                        acceptReporters: true,
                        items: [ /*"arrayBuffer",*/ "text"],
                    },
                },
            };
        }
        async openFile(args) {
            try {
                const slot = fislot[args.num];
                try {
                    if (slot.file == "" && slot.metadata == "") {
                        // @ts-ignore
                        [slot.file] = await window.showOpenFilePicker({
                            multiple: false,
                            startIn: "documents",
                            mode: "readwrite",
                        });
                        slot.metadata = await slot.file.getFile();
                        if (slot.metadata.size > 750000000) {
                            await this.cancel(slot);
                            alert("File exceeds 750 MB and will not be loaded.");
                            cs.error(
                                "File too large! Please choose a file that does not exceed 750 MB."
                            );
                        }
                        if (slot.metadata.size >= 25000000)
                            if (
                                !confirm(
                                    "This file exceeds 25 MB and could cause problems.\nIf you wish to continue, press OK.\nOtherwise, press cancel."
                                )
                            ) {
                                await this.cancel(slot);
                                cs.error("User has quit import.");
                            }
                    }
                } catch (err) {
                    cs.error("\nFailed to open.\n\nDetails:\n" + err);
                    return "Failed to open.\nDetails:\n" + err;
                }
            } catch (err) {
                cs.error(err);
            }
        }
        metadata(args) {
            try {
                const slot = fislot[args.num];
                return j.stringify({
                    name: slot.metadata.name,
                    lastModified: slot.metadata.lastModified,
                    lastModifiedDate: slot.metadata.lastModifiedDate,
                    webkitRelativePath: slot.metadata.webkitRelativePath,
                    size: slot.metadata.size,
                    type: slot.metadata.type,
                });
            } catch (err) {
                cs.error(err);
            }
        }
        cancel(args) {
            try {
                function recogslot(Block, Func) {
                    if (!Block) {
                        return Func;
                    } else {
                        return fislot[Block];
                    }
                }
                const slot = recogslot(args.num, args);
                slot.file = "";
                slot.metadata = "";
                slot.commits = {};
            } catch (err) {
                cs.error(err);
            }
        }
        async getData(args) {
            try {
                const slot = fislot[args.num];
                slot.metadata = await slot.file.getFile();
                if (args.TYPE == "text") {
                    return await slot.metadata.text();
                } else if (args.TYPE == "arrayBuffer") {
                    return new Int8Array(await slot.metadata.arrayBuffer()).toString();
                } else if (args.TYPE == "stream") {
                    const streamReader = slot.metadata.stream().getReader();
                    const chunkSize = 1024;
                    const decoder = new TextDecoder();
                    const chunks = [];
                    async function readChunks() {
                        while (true) {
                            const {
                                done,
                                value
                            } = await streamReader.read();
                            if (done) {
                                return chunks.join("");
                            }
                            chunks.push(
                                decoder.decode(value, {
                                    stream: true,
                                })
                            );
                            if (value.length >= chunkSize) {
                                await new Promise((resolve) => setTimeout(resolve, 10));
                            }
                        }
                    }
                    return await readChunks();
                }
            } catch (err) {
                cs.error("File Read Error:\n" + err);
            }
        }
        async store(args) {
            try {
                const slot = fislot[args.num];
                const storeName = args.name;
                async function openDatabase(storeName) {
                    return await new Promise((resolve, reject) => {
                        const dbRequest = window.indexedDB.open("fileHandleStore", 3);
                        dbRequest.onupgradeneeded = (event) => {
                            // @ts-ignore
                            const db = event.target.result;
                            if (db.objectStoreNames.contains(storeName)) {
                                db.deleteObjectStore(storeName);
                            }
                            db.createObjectStore(storeName, {
                                keyPath: "id",
                                autoIncrement: true,
                            });
                        };
                        dbRequest.onsuccess = (event) => {
                            // @ts-ignore
                            const db = event.target.result;
                            if (!db.objectStoreNames.contains(storeName)) {
                                db.close();
                                const newVersion = db.version + 1;
                                const upgradeRequest = window.indexedDB.open(
                                    "fileHandleStore",
                                    newVersion
                                );
                                upgradeRequest.onupgradeneeded = (event) => {
                                    // @ts-ignore
                                    const upgradeDb = event.target.result;
                                    if (upgradeDb.objectStoreNames.contains(storeName)) {
                                        upgradeDb.deleteObjectStore(storeName);
                                    }
                                    upgradeDb.createObjectStore(storeName, {
                                        keyPath: "id",
                                        autoIncrement: true,
                                    });
                                };
                                upgradeRequest.onsuccess = (event) => {
                                    // @ts-ignore
                                    resolve(event.target.result);
                                };
                                // @ts-ignore
                                // @ts-ignore
                                upgradeRequest.onerror = (event) => {
                                    reject(new Error("Database upgrade failed"));
                                };
                            } else {
                                resolve(db);
                            }
                        };
                        // @ts-ignore
                        // @ts-ignore
                        dbRequest.onerror = (event) => {
                            reject(new Error("Database open failed"));
                        };
                    });
                }
                async function storeData(db, slotData, storeName) {
                    return await new Promise((resolve, reject) => {
                        const transaction = db.transaction(storeName, "readwrite");
                        const store = transaction.objectStore(storeName);
                        const request = store.add({
                            slotData,
                        });
                        request.onsuccess = () => {
                            resolve("Data stored successfully");
                        };
                        // @ts-ignore
                        // @ts-ignore
                        request.onerror = (event) => {
                            reject(new Error("Transaction failed"));
                        };
                    });
                }
                async function loadData(db, storeName) {
                    return await new Promise((resolve, reject) => {
                        const transaction = db.transaction(storeName, "readonly");
                        const store = transaction.objectStore(storeName);
                        const request = store.getAll();
                        request.onsuccess = () => {
                            resolve(request.result[0].slotData);
                        };
                        // @ts-ignore
                        // @ts-ignore
                        request.onerror = (event) => {
                            reject(new Error("Failed to load data"));
                        };
                    });
                }
                try {
                    const db = await openDatabase(storeName);
                    switch (args.ss) {
                        case "Push": {
                            await storeData(db, slot, storeName);
                            break;
                        }
                        case "Pull": {
                            const data = await loadData(db, storeName);
                            fislot[args.num] = data;
                            break;
                        }
                        default:
                            cs.error("Unknown operation:", args.ss);
                    }
                } catch (err) {
                    cs.error("Operation failed:", err);
                }
            } catch (err) {
                cs.error(err);
            }
        }
        memWrite(args) {
            try {
                const slot = fislot[args.num];
                const type = args.type;
                if (Object.keys(slot.commits).length >= 10000) return;
                if (type == "text" || type == "arrayBuffer") {
                    if (args.in == "::-da\\\\clear") {
                        slot.commits[Object.keys(slot.commits).length + 1] = {
                            clear: true,
                        };
                    } else {
                        slot.commits[Object.keys(slot.commits).length + 1] = {
                            clear: false,
                            type: type,
                            text: args.in
                        };
                    }
                    cs.log(slot.commits[Object.keys(slot.commits).length].text)
                } else {
                    cs.error("Invalid method.");
                }
                cs.log(slot.commits)
            } catch (err) {
                cs.error(err);
            }
        }
        async memPush(args) {
            try {
                const slot = fislot[args.num];
                if (slot.metadata == "") {
                    cs.warn("Not valid.");
                    return;
                }

                // @ts-ignore
                let pushFile = await slot.metadata.text();
                var i = 0,
                    len = Object.keys(slot.commits).length;
                cs.log(`Total commits: ${len}`);

                while (i < len) {
                    i++;
                    cs.log(`Processing commit #${i}`);
                    if (!slot.commits[i]) {
                        cs.error(`Commit #${i} is undefined`);
                        continue;
                    }

                    if (slot.commits[i].clear == true) {
                        pushFile = "";
                    } else {
                        if (pushFile == "") {
                            pushFile += slot.commits[i].text;
                        } else {
                            pushFile += "\n" + slot.commits[i].text;
                        }
                        cs.log(`Commit text: ${slot.commits[i].text}`);
                    }
                }

                const PathTo = await slot.file.createWritable();
                await PathTo.write(pushFile);
                await PathTo.close();
                slot.metadata = await slot.file.getFile();
                slot.commits = {};
                cs.log(pushFile);

            } catch (err) {
                cs.error(err);
            }
        }
        async memChanges(args) {
            try {
                const slot = fislot[args.num];
                return await j.stringify(slot.commits);
            } catch (err) {
                cs.error(err);
            }
        }
        async memRead(args) {
            try {
                const slot = fislot[args.num];
                if (slot.metadata == "") {
                    cs.warn("Not valid.");
                    return;
                }
                // @ts-ignore
                let pushFile = await slot.metadata.text();
                for (let [value] of Object.entries(slot.commits)) {
                    if (value["clear"] == true) {
                        pushFile = "";
                    } else {
                        if (pushFile == "") {
                            pushFile += value["text"];
                        } else {
                            pushFile += "\n" + value["text"];
                        }
                    }
                }
                return pushFile;
            } catch (err) {
                cs.error(err);
            }
        }
        memClear(args) {
            try {
                const slot = fislot[args.num];
                slot.commits = {};
            } catch (err) {
                cs.error(err);
            }
        }
    }

    class folders {
        getInfo() {
            return {
                id: "filesystemaccessapiv2folders",
                name: "FSA Folders",
                blocks: [{
                        opcode: "openFolder",
                        blockType: bt.command,
                        text: "In FOLDER slot [num] open a folder",
                        arguments: {
                            num: {
                                type: argt,
                                menu: "num",
                            },
                        },
                    },
                    {
                        opcode: "cancel",
                        blockType: bt.command,
                        text: "Empty FOLDER slot [num]",
                        arguments: {
                            num: {
                                type: argt,
                                menu: "num",
                            },
                        },
                    },
                    "---",
                    {
                        opcode: "getIndex",
                        blockType: bt.reporter,
                        text: "Index of folder [num]",
                        arguments: {
                            num: {
                                type: argt,
                                menu: "num",
                            },
                        },
                    },
                    {
                        opcode: "readFile",
                        blockType: bt.reporter,
                        text: "In folder slot [num] read file [PATH] using [TYPE]",
                        //blockIconURI: FolderIcon,
                        arguments: {
                            PATH: {
                                type: Scratch.ArgumentType.STRING,
                            },
                            TYPE: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "methods",
                            },
                            num: {
                                type: argt,
                                menu: "num",
                            },
                        },
                    },
                    "---",
                    {
                        opcode: "folderCreate",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "In slot [num] [ACTION] [KIND] [NAME] and [INDX]",
                        //blockIconURI: FolderIcon,
                        arguments: {
                            ACTION: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "ACTIONS",
                            },
                            KIND: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "KINDS",
                            },
                            NAME: {
                                type: Scratch.ArgumentType.STRING,
                            },
                            INDX: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "INDEX",
                            },
                            num: {
                                type: argt,
                                menu: "num",
                            },
                        },
                    },

                ],
                menus: {
                    INDEX: {
                        acceptReporters: true,
                        items: ["index", "keep"],
                    },
                    ACTIONS: {
                        acceptReporters: true,
                        items: ["Create", "Delete"],
                    },
                    KINDS: {
                        acceptReporters: true,
                        items: ["File", "Folder"],
                    },
                    ss: {
                        acceptReporters: true,
                        items: ["Push", "Pull"],
                    },
                    num: {
                        acceptReporters: true,
                        items: fislotmenu,
                    },
                    methods: {
                        acceptReporters: true,
                        items: ["stream", "arrayBuffer", "text"],
                    },
                    wmethods: {
                        acceptReporters: true,
                        items: [ /*"arrayBuffer",*/ "text"],
                    },
                },
            };
        }
        //Functions
        async openFolder(args) {
            const slot = foslot[args.num];
            // @ts-ignore
            slot.folder = await window.showDirectoryPicker({
                multiple: false,
                startIn: "documents",
                mode: "readwrite",
            });
        }
        async getIndex(args) {
            const slot = foslot[args.num];
            return await this.iGFC(slot.folder);
        }
        async iGFC(iDH) {
            try {
                const dH = iDH;
                async function cDS(hdl) {
                    const structure = {};
                    for await (const entry of hdl.values()) {
                        if (entry.kind === "directory") {
                            const sDH = await hdl.getDirectoryHandle(entry.name);
                            structure[entry.name] = await cDS(sDH);
                        } else {
                            if (!structure["@\\\\files"]) {
                                //Don't you dare name a folder or file this.
                                structure["@\\\\files"] = [];
                            }
                            const fH = await hdl.getFileHandle(entry.name);
                            const Fi = await fH.getFile();
                            structure["@\\\\files"].push({
                                name: Fi.name,
                                lastModified: Fi.lastModified,
                                lastModifiedDate: Fi.lastModifiedDate,
                                webkitRelativePath: Fi.webkitRelativePath,
                                size: Fi.size,
                                type: Fi.type,
                            });
                        }
                    }
                    return structure;
                }
                const directoryStructure = await cDS(dH);
                return JSON.stringify(directoryStructure, null, 2);
            } catch (err) {
                return 'Open a folder first.\n(Error: "' + err + '")';
            }
        }
        async readFile(args) {
            const slot = foslot[args.num];
            const parts = args.PATH.split("/").filter((part) => part);
            let currentHandle = slot.folder;

            for (let i = 0; i < parts.length - 1; i++) {
                currentHandle = await currentHandle.getDirectoryHandle(parts[i]);
            }
            const fileHandler = await currentHandle.getFileHandle(
                parts[parts.length - 1]
            );

            const contents = await this.getData(fileHandler, args.TYPE);
            return contents;
        }
        async getData(filemdta, method) {
            try {
                let cmtdta = await filemdta.getFile();
                if (method == "text") {
                    return await cmtdta.text();
                } else if (method == "arrayBuffer") {
                    return new Int8Array(await cmtdta.arrayBuffer()).toString();
                } else if (method == "stream") {
                    const streamReader = cmtdta.stream().getReader();
                    const chunkSize = 1024;
                    const decoder = new TextDecoder();
                    const chunks = [];
                    async function readChunks() {
                        while (true) {
                            const {
                                done,
                                value
                            } = await streamReader.read();
                            if (done) {
                                return chunks.join("");
                            }
                            chunks.push(
                                decoder.decode(value, {
                                    stream: true,
                                })
                            );
                            if (value.length >= chunkSize) {
                                await new Promise((resolve) => setTimeout(resolve, 10));
                            }
                        }
                    }
                    return await readChunks();
                }
            } catch (err) {
                cs.error("File Read Error:\n" + err);
            }
        }
        cancel(args) {
            try {
                const slot = foslot[args.num];
                slot.folder = "";
                slot.metadata = "";
                slot.commits = {};
            } catch (err) {
                cs.error(err);
            }
        }
        async folderCreate(args) {
            const slot = foslot[args.num];
            if (
                (args.ACTION == "Create") && (args.KIND == "File")
            ) {
                await this.iFCFi(args.NAME, args.num);
                if (args.INDX == "index")
                    await this.iGFC(slot.folder);
            } else if (
                (args.ACTION == "Delete") && (args.KIND == "File")
            ) {
                await this.iFDFi(args.NAME, args.num);
                if (args.INDX == "index")
                    await this.iGFC(slot.folder);
            } else if (
                (args.ACTION == "Create") && (args.KIND == "Folder")
            ) {
                await this.iFCFo(args.NAME, args.num);
                if (args.INDX == "index")
                    await this.iGFC(slot.folder);
            } else if (
                (args.ACTION == "Delete") && (args.KIND == "Folder")
            ) {
                await this.iFDFo(args.NAME, args.num);
                if (args.INDX == "index")
                    await this.iGFC(slot.folder);
            }
        }
        async iFCFi(filename, fh) {
            const slot = foslot[fh];
            const parts = filename.split("/").filter((part) => part);
            let currentHandle = slot.folder;

            for (let i = 0; i < parts.length - 1; i++) {
                currentHandle = await currentHandle.getDirectoryHandle(parts[i]);
            }
            await currentHandle.getFileHandle(parts[parts.length - 1], {
                create: true,
            });
            console.log("Created.");
        }
        async iFDFi(filename, fh) {
            const slot = foslot[fh];
            const parts = filename.split("/").filter((part) => part);
            let currentHandle = slot.folder;

            for (let i = 0; i < parts.length - 1; i++) {
                currentHandle = await currentHandle.getDirectoryHandle(parts[i]);
            }
            await currentHandle.removeEntry(parts[parts.length - 1]);
            console.log("Deleted.");
        }
        async iFCFo(foldername, fh) {
            const slot = foslot[fh];
            const parts = foldername.split("/").filter((part) => part);
            let currentHandle = slot.folder;

            for (let i = 0; i < parts.length - 1; i++) {
                currentHandle = await currentHandle.getDirectoryHandle(parts[i]);
            }
            await currentHandle.getDirectoryHandle(parts[parts.length - 1], {
                create: true,
            });
            console.log("Created.");
        }
        async iFDFo(foldername, fh) {
            const slot = foslot[fh];
            const parts = foldername.split("/").filter((part) => part);
            let currentHandle = slot.folder;

            for (let i = 0; i < parts.length - 1; i++) {
                currentHandle = await currentHandle.getDirectoryHandle(parts[i]);
            }
            await currentHandle.removeEntry(parts[parts.length - 1], {
                recursive: true,
            });
            console.log("Deleted.");
        }
        memWrite(args) {
            try {
                const slot = foslot[args.num];
                const type = args.type;
                if (Object.keys(slot.commits).length >= 10000) return;
                if (type == "text" || type == "arrayBuffer") {
                    if (args.in == "::-da\\\\clear") {
                        slot.commits[Object.keys(slot.commits).length + 1] = {
                            clear: true,
                            path: args.path,
                        };
                    } else {
                        slot.commits[Object.keys(slot.commits).length + 1] = {
                            clear: false,
                            type: type,
                            text: args.in,
                            path: args.path
                        };
                    }
                    cs.log(slot.commits[Object.keys(slot.commits).length].text)
                } else {
                    cs.error("Invalid method.");
                }
                cs.log(slot.commits)
            } catch (err) {
                cs.error(err);
            }
        }
        async memPush(args) {
            try {
                const slot = foslot[args.num];
                const parts = args.PATH.split("/").filter((part) => part);
                let currentHandle = slot.folder;

                for (let i = 0; i < parts.length - 1; i++) {
                    currentHandle = await currentHandle.getDirectoryHandle(parts[i]);
                }
                const fileHandler = await currentHandle.getFileHandle(
                    parts[parts.length - 1]
                );

                if (fileHandler.getFile() == "") {
                    cs.warn("Not valid.");
                    return;
                }

                // @ts-ignore
                const filemetadata = fileHandler.getFile();
                let pushFile = await filemetadata.text();
                var i = 0,
                    len = Object.keys(slot.commits).length;
                cs.log(`Total commits: ${len}`);

                while (i < len) {
                    i++;
                    cs.log(`Processing commit #${i}`);
                    if (!slot.commits[i]) {
                        cs.error(`Commit #${i} is undefined`);
                        continue;
                    }

                    if (slot.commits[i].clear == true) {
                        pushFile = "";
                    } else {
                        if (pushFile == "") {
                            pushFile += slot.commits[i].text;
                        } else {
                            pushFile += "\n" + slot.commits[i].text;
                        }
                        cs.log(`Commit text: ${slot.commits[i].text}`);
                    }
                }

                const PathTo = await slot.file.createWritable();
                await PathTo.write(pushFile);
                await PathTo.close();
                slot.commits = {};
                cs.log(pushFile);

            } catch (err) {
                cs.error(err);
            }
        }
    }

    if (!LoadedExtensions.includes("skyhigh173JSON"))
        Scratch.vm.extensionManager.loadExtensionURL(
            "https://extensions.turbowarp.org/Skyhigh173/json.js"
        );
    try {
        // @ts-ignore
        Scratch.extensions.register(new files());
        // @ts-ignore
        Scratch.extensions.register(new folders());
    } catch (err) {
        cs.error(
            "Failed to load a module!\nPlease report this issue.\nDetails:\n" + err
        );
        alert(
            "Failed to load a module!\nPlease report this issue.\nDetails:\n" + err
        );
    }
    // @ts-ignore
})(Scratch);