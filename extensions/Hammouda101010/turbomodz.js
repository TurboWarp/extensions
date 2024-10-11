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
  // const runtime = vm.runtime;
  const Cast = Scratch.Cast;

  let mods = []; //Creates a List of Mods

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


  const readFile = () => {
    return new Promise((resolve, reject) => {
        const input = document.createElement('input');
        input.type = 'file';

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
                    reject(`Error reading file: ${reader.error?.message || 'Unknown error'}`);
                };

                reader.readAsText(file);
            } else {
                reject('No file selected');
            }
        };

        input.click();
    });
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

  class TurboModz {
    getInfo() {
      return {
        id: "turbomods",
        name: "TurboModz",
        // de2aff
        color1: "#e84cff",
        color2: "#e200fd",
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
            text: "load [MOD] mod in project"
          },
          {
            opcode: "unLoadMod",
            blockType: BlockType.COMMAND,
            text: "unload all mods in project"
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
            text: "import new mod to project",
            arguments: {
              MOD: {
                type: ArgumentType.STRING,
                menu: "MODS_MENU",
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

    //URL Checking Functions
    isSprite(url) {
      try {
        const parsedUrl = new URL(url);
        // Check if the URL is a data URL
        if (
          parsedUrl.protocol === "data:" &&
          parsedUrl.pathname.startsWith("application/x.scratch.sprite3;")
        ) {
          return true;
        }
        // Check if the URL is a regular URL ending with .sprite3
        const urlPattern = /\.sprite3$/i;
        return urlPattern.test(parsedUrl.pathname);
      } catch (e) {
        // Invalid URL
        return false;
      }
    }

    isImage(url) {
      // Checks if URL Redirects to an Image
      try {
        const validFormats = ["png", "svg", "sbg+xml", "jpeg", "jpg", "bmp", "gif"];
        const parsedUrl = new URL(url);
        // Checks if the URL is a data URL
        if (parsedUrl.protocol === "data:" && url.startsWith("data:image/")) {
          return validFormats.some((format) =>
            url.startsWith(`data:image/${format};`)
          );
        }
        // Checks if the URL is a regular URL ending with an image format
        const urlPattern = new RegExp(`\\.(${validFormats.join("|")})$`, "i");
        return urlPattern.test(parsedUrl.pathname);
      } catch (e) {
        return false;
      }
    }

    isSound(url) {
      try {
        const validFormats = ["mp3", "wav", "ogg", "mpeg"];
        const parsedUrl = new URL(url);
        // Checks if the URL is a data URL
        if (parsedUrl.protocol === "data:" && url.startsWith("data:audio/")) {
          return validFormats.some((format) =>
            url.startsWith(`data:audio/${format};`)
          );
        }
        // Checks if the URL is a regular URL ending with a sound format
        const urlPattern = new RegExp(`\\.(${validFormats.join("|")})$`, "i");
        return urlPattern.test(parsedUrl.pathname);
      } catch (e) {
        return false;
      }
    }

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
      if (key in mods[modindex]){
        switch (Array.isArray(mods[modindex][key] )){
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

      // Draw the bitmap costume on the canvas
      const image = new Image();
      image.src = costume.asset.encodeDataURI();
      await new Promise((resolve) => {
        image.onload = resolve;
      });
      context.drawImage(image, 0, 0);

      // Create the data URL based on the original costume format
      let dataURL;
      if (costume.asset.dataFormat === "png") {
        dataURL = canvas.toDataURL("image/png");
      } else if (costume.asset.dataFormat === "jpeg") {
        dataURL = canvas.toDataURL("image/jpeg");
      } else {
        dataURL = canvas.toDataURL(); // Default to PNG if format is unrecognized
      }

      // Optionally append the sprite name as a query parameter or as part of a comment in the data URL
      // This won't affect the functionality but can serve as an identifier
      return dataURL + `#${spriteName}`; // Appending sprite name as a fragment for identification
    }

    async convertSoundToDataURL(sound) {
      if (!sound || !sound.asset) {
        return "Invalid sound";
      }

      // Return the data URI of the sound asset
      return await sound.asset.encodeDataURI();
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
      // Check if URL is Image
      if (this.isSprite(args.URL)) {
        this.addModItem(args.MOD, "sprites", args.URL);
      } else {
        console.error("Invalid Sprite URL/Data URL");
      }
    }
    addImagetoMod(args) {
      if (this.isImage(args.URL)) {
        // Check if URL is Image
        this.addModItem(args.MOD, "costumes", args.URL);
      } else {
        console.error("Invalid Image/Costume URL/Data URL");
      }
    }
    async addCostumetoMod(args, util) {
      const costumeName = args.COSTUME; // Get the selected costume name
      const target = util.target; // Get the current sprite (target)

      // Find the costume by name
      const costume = this.findCostumeByName(costumeName, target);

      // Get the sprite name directly from the target
      const spriteName = target.getName(); // Get the name of the sprite

      // Get Costume URL
      const costumeURL = await this.convertCostumeToDataURL(
        costume,
        spriteName
      );

      this.addModItem(args.MOD, "costumes", costumeURL); // Finally, add it to the mod.
    }
    addSoundUrltoMod(args) {
      if (this.isSound(args.URL)) {
        // Checks if URL is Sound
        this.addModItem(args.MOD, "sounds", args.URL);
      } else {
        console.error("Invalid Sound URL/Data URL");
      }
    }
    async addSoundtoMod(args, util) {
      const soundName = args.SOUND; // Get the selected sound name
      const target = util.target; // Get the current sprite (target)

      // Find the sound by name
      const sound = this.findSoundByName(soundName, target);

      // Get Sound URL
      const soundURL = await this.convertSoundToDataURL(sound);
      this.addModItem(args.MOD, "sounds", soundURL); // Finally, add it to the mod
    }
    /* TODO #2:
       Find a Way to Get Runtime Values */

    loadMod(args) {
      //placeholder
    }
    unLoadMod(args) {
      //placeholder
    }

    exportMod(args) {
      const mod_JSON = JSON.stringify(this.findMod(args.MOD))
      downloadBlob(
        new Blob([Cast.toString(mod_JSON)]),
        Cast.toString(args.MOD.replaceAll(" ", "_") + args.FILE)
      );
    }
    async importMod(args) {
      let mod_JSON = await readFile()
      .then(result => result)
      .catch(error => error);

      if (!mod_JSON){
        console.error("Please put an appropriate file")
      }
      mod_JSON = JSON.parse(Cast.toString(mod_JSON))
      mods.push(mod_JSON)
    }
  }
  // @ts-ignore
  Scratch.extensions.register(new TurboModz());
})(Scratch);
