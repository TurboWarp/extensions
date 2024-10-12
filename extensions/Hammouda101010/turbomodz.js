// Name: TurboModz
// ID: hamturbomodz
// Description: Implement Mods into Your Projects. Inspired by Asset Manager and Other Extensions.
// By: Hammouda101010 <https://scratch.mit.edu/users/Hammouda101010/>
// License: MIT AND LGPL-3.0

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("TurboModz must run unsandboxed");
  }

  // Scratch Vm & APIs
  const vm = Scratch.vm;
  const runtime = vm.runtime;
  const Cast = Scratch.Cast;

  let mods = []; //Creates a List of Mods
  let isLoading = false;

  //Block & Argument Type Constants
  const BlockType = Scratch.BlockType;
  const ArgumentType = Scratch.ArgumentType;

  // Function That Creates New IDs
  const newID = (length) => {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  };

  // Function That Reads Files
  const readFile = () => {
    return new Promise((resolve, reject) => {
      const input = document.createElement("input");
      input.type = "file";

      input.onchange = (event) => {
        const target = event.target;

        // Ensure that the target is an HTMLInputElement and has files
        if (target && target instanceof HTMLInputElement && target.files?.[0]) {
          const file = target.files[0];

          const reader = new FileReader();

          reader.onload = (e) => {
            resolve(e.target?.result);
          };

          reader.onerror = (e) => {
            reject(
              `Error reading file: ${reader.error?.message || "Unknown error"}`
            );
          };

          reader.readAsText(file);
        } else {
          reject("No file selected");
        }
      };

      input.click();
    });
  };

  const addAssetToMod = (context, url, modName, key, validatorFn, errorMessage) => {
    if (validatorFn(url)) {
      context.addModItem(modName, key, url); // Use the passed context
    } else {
      console.error(errorMessage);
    }
  };
  

  const isSprite = (url) => {
    try {
      const parsedUrl = new URL(url);
      return /\.sprite3$/i.test(parsedUrl.pathname);
    } catch (e) {
      return false;
    }
  };

  const isImage = (url) => {
    try {
      const validFormats = ["png", "svg", "jpeg", "jpg", "bmp", "gif"];
      return validFormats.some((format) =>
        url.startsWith(`data:image/${format};`)
      );
    } catch (e) {
      return false;
    }
  };

  const isSound = (url) => {
    try {
      const validFormats = ["mp3", "wav", "ogg", "mpeg"];
      return validFormats.some((format) =>
        url.startsWith(`data:audio/${format};`)
      );
    } catch (e) {
      return false;
    }
  };

  const loadModAssets = async (assets, loadFunction) => {
    for (let asset of assets) {
      try {
        await loadFunction(new URL(asset));
      } catch (e) {
        console.error(`Failed to load asset: ${e}`);
      }
    }
  };

  // Credits to Files Extension for These Functions.
  const downloadURL = (url, file) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = file;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  /**
   * @param {Blob} blob Data to download
   * @param {string} file Name of the file
   */
  const downloadBlob = (blob, file) => {
    const url = URL.createObjectURL(blob);
    downloadURL(url, file);
    // Some old browsers process Blob URLs asynchronously
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);
  };
  // End of File Extension Scripts

  // Credits to Asset Manager, Made by LilyMakeThings

  const _typeIsBitmap = (type) => {
    return (
      type === "image/png" ||
      type === "image/bmp" ||
      type === "image/jpg" ||
      type === "image/jpeg" ||
      type === "image/jfif" ||
      type === "image/webp" ||
      type === "image/gif"
    );
  };

  const addSprite = async (spriteurl, util) => {
    const url = Cast.toString(spriteurl);

    const response = await Scratch.fetch(url);
    const json = await response.arrayBuffer();
    try {
      await vm.addSprite(json);
    } catch (e) {
      console.error(e);
    }
  };

  const addCostume = async (url, name, util) => {
    const targetId = util.target.id;
    const assetName = Cast.toString(name);

    const res = await Scratch.fetch(url);
    const blob = await res.blob();

    if (!(this._typeIsBitmap(blob.type) || blob.type === "image/svg+xml")) {
      console.error(`Invalid MIME type: ${blob.type}`);
      return;
    }
    const assetType = this._typeIsBitmap(blob.type)
      ? runtime.storage.AssetType.ImageBitmap
      : runtime.storage.AssetType.ImageVector;

    const dataType =
      blob.type === "image/svg+xml"
        ? runtime.storage.DataFormat.SVG
        : runtime.storage.DataFormat.PNG;

    const arrayBuffer = await new Promise((resolve, reject) => {
      const fr = new FileReader();
      fr.onload = () => resolve(fr.result);
      fr.onerror = () =>
        reject(new Error(`Failed to read as array buffer: ${fr.error}`));
      fr.readAsArrayBuffer(blob);
    });

    const asset = runtime.storage.createAsset(
      assetType,
      dataType,
      new Uint8Array(arrayBuffer),
      null,
      true
    );
    const md5ext = `${asset.assetId}.${asset.dataFormat}`;
    try {
      await vm.addCostume(
        md5ext,
        {
          asset,
          md5ext,
          name: assetName,
        },
        targetId
      );
    } catch (e) {
      console.error(e);
    }
  };

  const addSound = async (url, name, util) => {
    const targetId = util.target.id;
    const assetName = Cast.toString(name);

    const res = await Scratch.fetch(url);
    const buffer = await res.arrayBuffer();

    const storage = runtime.storage;
    const asset = storage.createAsset(
      storage.AssetType.Sound,
      storage.DataFormat.MP3,
      new Uint8Array(buffer),
      null,
      true
    );
    try {
      await vm.addSound(
        {
          asset,
          md5: asset.assetId + "." + asset.dataFormat,
          name: assetName,
        },
        targetId
      );
    } catch (e) {
      console.error(e);
    }
  };
  // End of Asset Manager Scripts

  const blocksIconURI = "data:image/svg+xml;base64,...";

  class TurboModz {
    getInfo() {
      return {
        id: "turbomods",
        name: "TurboModz",
        color1: "#e84cff",
        color2: "#e200fd",
        menuIconURI: blocksIconURI,
        blockIconURI: blocksIconURI,
        blocks: [
          {
            opcode: "newMod",
            blockType: BlockType.COMMAND,
            text: "create new mod called [NAME]",
            arguments: {
              NAME: {
                type: ArgumentType.STRING,
                defaultValue: "foobar mod",
              },
            },
          },
          {
            opcode: "getMod",
            blockType: BlockType.REPORTER,
            text: "get mod called [NAME] as [TYPE]",
            arguments: {
              NAME: {
                type: ArgumentType.STRING,
                menu: "MODS_MENU",
              },
              TYPE: {
                type: ArgumentType.STRING,
                menu: "GET_TYPE_MENU",
              },
            },
          },
          {
            opcode: "ModLabel",
            blockType: BlockType.LABEL,
            text: "Project Modding",
          },
          {
            opcode: "addSpritetoMod",
            blockType: BlockType.COMMAND,
            text: "add sprite [URL] to mod:[MOD]",
            arguments: {
              URL: {
                type: ArgumentType.STRING,
                defaultValue: "Data URL or URL",
              },
              MOD: {
                type: ArgumentType.STRING,
                menu: "MODS_MENU",
              },
            },
          },
          "---",
          {
            opcode: "addImagetoMod",
            blockType: BlockType.COMMAND,
            text: "add image [URL] to mod:[MOD]",
            arguments: {
              URL: {
                type: ArgumentType.STRING,
                defaultValue: "URL or Data URL",
              },
              MOD: {
                type: ArgumentType.STRING,
                menu: "MODS_MENU",
              },
            },
          },
          {
            opcode: "addCostumetoMod",
            blockType: BlockType.COMMAND,
            text: "add costume [COSTUME] to mod:[MOD]",
            arguments: {
              COSTUME: {
                type: ArgumentType.COSTUME,
              },
              MOD: {
                type: ArgumentType.STRING,
                menu: "MODS_MENU",
              },
            },
          },
          "---",
          {
            opcode: "addSoundUrltoMod",
            blockType: BlockType.COMMAND,
            text: "add sound url [URL] to mod:[MOD]",
            arguments: {
              URL: {
                type: ArgumentType.STRING,
                defaultValue: "https://extensions.turbowarp.org/srpelo.mp3",
              },
              MOD: {
                type: ArgumentType.STRING,
                menu: "MODS_MENU",
              },
            },
          },
          {
            opcode: "addSoundtoMod",
            blockType: BlockType.COMMAND,
            text: "add sound [SOUND] to mod:[MOD]",
            arguments: {
              SOUND: {
                type: ArgumentType.SOUND,
                defaultValue: "",
              },
              MOD: {
                type: ArgumentType.STRING,
                menu: "MODS_MENU",
              },
            },
          },
          {
            opcode: "LoadLabel",
            blockType: BlockType.LABEL,
            text: "Loading Mods",
          },
          {
            opcode: "loadMod",
            blockType: BlockType.COMMAND,
            text: "load [MOD] mod in project",
            arguments: {
              MOD: {
                type: ArgumentType.STRING,
                menu: "MODS_MENU",
              },
            },
          },
          {
            opcode: "unLoadMod",
            blockType: BlockType.COMMAND,
            text: "unload all mods in project",
          },
          {
            opcode: "isLoadingMod",
            blockType: BlockType.BOOLEAN,
            text: "is project loading a mod?",
          },
          {
            opcode: "ModpackLabel",
            blockType: BlockType.LABEL,
            text: "Mod-Packs",
          },
          {
            opcode: "newModPack",
            blockType: BlockType.COMMAND,
            text: "create new modpack named [NAME]",
            arguments: {
              NAME: {
                type: ArgumentType.STRING,
                defaultValue: "foobar modpack",
              },
            },
          },
          {
            opcode: "ImportLabel",
            blockType: BlockType.LABEL,
            text: "Importing & Exporting Mods",
          },
          {
            opcode: "exportMod",
            blockType: BlockType.COMMAND,
            text: "export mod [MOD] as [FILE]",
            arguments: {
              MOD: {
                type: ArgumentType.STRING,
                menu: "MODS_MENU",
              },
              FILE: {
                type: ArgumentType.STRING,
                defaultValue: ".twmod",
              },
            },
          },
          {
            opcode: "importMod",
            blockType: BlockType.COMMAND,
            text: "import new [MOD] mod to project",
            arguments: {
              MOD: {
                type: ArgumentType.IMAGE,
                dataURI: blocksIconURI,
              },
              EXT: {
                type: ArgumentType.STRING,
                defaultValue: "twmod",
              },
            },
          },
        ],
        menus: {
          GET_TYPE_MENU: {
            acceptReporters: false,
            items: ["JSON", "text", "array"],
          },
          MODS_MENU: {
            acceptReporters: true,
            items: "getMods",
          },
        },
      };
    }

    // URL Checking Functions
    

    

  

    // Gets all Mods
    getMods() {
      if (mods.length > 0) {
        return mods.map((mod) => mod.name);
      } else {
        return ["no mods yet!"];
      }
    }
    //Find a Mod's JSON
    findMod(name) {
      let search = mods.find((mod) => mod.name === name);
      if (!search) {
        console.error(`Could Not Find "${name}"`);
        return `Could Not Find "${name}"`;
      } else {
        return search;
      }
    }

    addModItem(name, key, item) {
      let modindex = mods.indexOf(this.findMod(name));
      if (key in mods[modindex]) {
        switch (Array.isArray(mods[modindex][key])) {
          case true:
            mods[modindex][key].push(item);
            break;
          default:
            mods[modindex][key] = item;
            break;
        }
      }
    }

    // Find a costume/sound by name in the current target
    findCostumeByName(costumeName, target) {
      return target.getCostumes().find((c) => c.name === costumeName);
    }

    findSoundByName(soundName, target) {
      return target.getSounds().find((s) => s.name === soundName);
    }


// Function to convert a costume to a Data: URL
    async convertCostumeToDataURL(costume, spriteName) {
      if (!costume) {
        return "Invalid costume";
      }

      // If the costume is a vector (SVG), return the data URI as is
      if (costume.asset && costume.asset.dataFormat === "svg") {
        return costume.asset.encodeDataURI();
      }

      // For bitmaps (PNG, JPEG), use the canvas to generate the data URL
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      // Set the canvas size to the costume size
      canvas.width = costume.size[0];
      canvas.height = costume.size[1];

      // Get the URL for the costume asset
      const url = costume.asset.encodeDataURI();

      // Check if the URL can be fetched
      const canFetch = await Scratch.canFetch(url);
      if (!canFetch) {
        return "Cannot fetch the costume asset."; // Return if the URL can't be fetched
      }

      // Create a new image and load it
      /* eslint-disable*/
      const image = new Image();
      /* eslint-enable*/
      image.src = url;

      // Return a promise that resolves when the image loads
      return new Promise((resolve, reject) => {
        image.onload = () => {
          context.drawImage(image, 0, 0); // Draw the image on the canvas

          // Create the data URL based on the original costume format
          let dataURL;
          if (costume.asset.dataFormat === "png") {
            dataURL = canvas.toDataURL("image/png");
          } else if (costume.asset.dataFormat === "jpeg") {
            dataURL = canvas.toDataURL("image/jpeg");
          } else {
            dataURL = canvas.toDataURL(); // Default to PNG if format is unrecognized
          }

          resolve(dataURL + `#${spriteName}`); // Return the data URL with sprite name
        };

        image.onerror = () => {
          reject("Failed to load image."); // Reject the promise if image loading fails
        };
      });
    }

    async convertSoundToDataURL(sound, spriteName) {
      if (!sound || !sound.asset) {
        return "Invalid sound";
      }

      return (await sound.asset.encodeDataURI()) + `#${spriteName}`;
    }

    // The Blocks

    // Creates a New Mod
    newMod(args) {
      if (!mods.some((mod) => args.NAME === mod.name)) {
        mods.push({
          name: args.NAME,
          id: newID(7),
          sprites: [],
          costumes: [],
          sounds: [],
          runtime_values: [],
        });
        console.log(mods);
      } else {
        console.warn("This Mod Already Exists");
      }
    }

    //Gets a Mod's JSON depending on the menu's choice
    getMod(args) {
      switch (args.TYPE) {
        case "JSON":
          return this.findMod(args.NAME);
        case "text":
          return Cast.toString(JSON.stringify(this.findMod(args.NAME)));
        case "array":
          return Object.values(this.findMod(args.NAME));
      }
    }

    addSpritetoMod(args) {
      addAssetToMod(
        this,
        args.URL,
        args.MOD,
        "sprites",
        isSprite,
        "Invalid Sprite URL/Data URL"
      );
    }
    addImagetoMod(args) {
      addAssetToMod(
        this,
        args.URL,
        args.MOD,
        "costumes",
        isImage,
        "Invalid Image/Costume URL/Data URL"
      );
    }
    async addCostumetoMod(args, util) {
      const costumeName = args.COSTUME;
      const target = util.target;

      const costume = this.findCostumeByName(costumeName, target);

      const spriteName = target.getName();

      const costumeURL = await this.convertCostumeToDataURL(
        costume,
        spriteName
      );

      addAssetToMod(
        costumeURL,
        args.MOD,
        "costumes",
        isImage,
        "Invalid Image/Costume URL/Data URL"
      );
    }
    addSoundUrltoMod(args) {

      addAssetToMod(
        args.URL,
        args.MOD,
        "sounds",
        isSound,
        "Invalid Sound URL/Data URL"
      );
    }
    async addSoundtoMod(args, util) {
      const soundName = args.SOUND;
      const target = util.target;

      const sound = this.findSoundByName(soundName, target);

      const spriteName = target.getName();

      const soundURL = await this.convertSoundToDataURL(sound, spriteName);

      
      addAssetToMod(
        soundURL,
        args.MOD,
        "sounds",
        isSound,
        "Invalid Sound URL/Data URL"
      );
    }

    async loadMod(args, util) {
      const confirmLoad = confirm(
        "WARNING: This May Take a Long Time and May Cause Heavy Lag. It Can Also Break the Entire Project. Continiue?"
      );
      if (confirmLoad) {
        isLoading = true;
        const mod = this.findMod(args.MOD);

        await loadModAssets(mod.sprites, addSprite);
        await loadModAssets(mod.costumes, addCostume);
        await loadModAssets(mod.sounds, addSound);

        isLoading = false;
      }
    }
    unLoadMod(args) {
      //placeholder
    }

    isLoadingMod() {
      return isLoading;
    }

    exportMod(args) {
      const mod_JSON = JSON.stringify(this.findMod(args.MOD));
      downloadBlob(
        new Blob([Cast.toString(mod_JSON)]),
        Cast.toString(args.MOD.replaceAll(" ", "_") + args.FILE)
      );
    }
    async importMod(args) {
      let mod_JSON = await readFile()
        .then((result) => result)
        .catch((error) => error);

      if (!mod_JSON) {
        console.error("Please put an appropriate file");
      }
      mod_JSON = JSON.parse(Cast.toString(mod_JSON));
      mods.push(mod_JSON);
    }
  }
  // @ts-ignore
  Scratch.extensions.register(new TurboModz());
})(Scratch);
