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

  const blocksIconURI =
    "data:image/svg+xml,%3Csvg width='63.999996' height='63.999996' viewBox='0 0 16.933332 16.933332' id='svg1' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns='http://www.w3.org/2000/svg' xmlns:svg='http://www.w3.org/2000/svg'%3E%3Cdefs id='defs1'%3E%3ClinearGradient id='linearGradient92'%3E%3Cstop style='stop-color:%23000000;stop-opacity:1;' offset='0' id='stop92' /%3E%3Cstop style='stop-color:%23e8596f;stop-opacity:0.2;' offset='1' id='stop93' /%3E%3C/linearGradient%3E%3ClinearGradient id='linearGradient86'%3E%3Cstop style='stop-color:%23ff9393;stop-opacity:1;' offset='0' id='stop86' /%3E%3Cstop style='stop-color:%23ee90ff;stop-opacity:1' offset='0.73455918' id='stop87' /%3E%3C/linearGradient%3E%3ClinearGradient id='swatch18'%3E%3Cstop style='stop-color:%23000000;stop-opacity:1;' offset='0' id='stop18' /%3E%3C/linearGradient%3E%3ClinearGradient xlink:href='%23linearGradient86' id='linearGradient87' x1='2.601203' y1='8.0995693' x2='7.8542061' y2='8.0995693' gradientUnits='userSpaceOnUse' gradientTransform='matrix(0,1.2409206,-3.3805759,0,33.677586,3.0675702)' /%3E%3ClinearGradient xlink:href='%23linearGradient92' id='linearGradient93' x1='2.8663142' y1='6.4624877' x2='9.9769001' y2='13.060527' gradientUnits='userSpaceOnUse' /%3E%3C/defs%3E%3Cg id='layer1' transform='translate(-1.7287413,-4.9154571)'%3E%3Cg id='g103' transform='matrix(1.4792247,0,0,1.5096902,-1.731744,-2.3173037)'%3E%3Cpath d='m 2.8728575,6.4600656 v 2.5135416 h 2.1978157 v 3.8464988 l 2.4424304,0.0072 V 8.9736072 h 2.206881 V 6.4600656 H 6.296421 Z' style='fill:url(%23linearGradient87);fill-rule:evenodd;stroke:url(%23linearGradient93);stroke-width:0.543286;stroke-linejoin:round;stroke-opacity:1;paint-order:fill markers stroke' id='path90' /%3E%3Cpath d='m 3.3313146,7.3343038 0,0.8305425 A 0.40389607,0.40389607 45 0 0 3.7352107,8.5687424 H 5.0626086 A 0.60451049,0.60451049 45.233066 0 1 5.6670991,9.1781709 L 5.6404368,12.45535 a 0.43587868,0.43587868 45.968459 0 0 0.4246765,0.439281 l 0.5760058,0.01479 A 0.40745954,0.40745954 135.04222 0 0 7.0589177,12.492237 L 6.9775058,9.1282337 A 0.54627484,0.54627484 134.30683 0 1 7.5236207,8.5687424 H 8.8761516 A 0.40389607,0.40389607 135 0 0 9.2800477,8.1648463 V 7.3147382 A 0.42851376,0.42851376 45 0 0 8.8515339,6.8862244 l -2.5311248,0 H 3.779394 A 0.44807938,0.44807938 135 0 0 3.3313146,7.3343038 Z' style='fill:%23fff0f0;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:0.298252;stroke-linejoin:round;stroke-opacity:1;paint-order:fill markers stroke' id='path90-8' transform='matrix(0.83907416,0,0,0.90143743,0.98668793,0.72290721)' /%3E%3C/g%3E%3Cg id='g119' transform='matrix(1.4792247,0,0,1.5096902,-5.4570948,-4.9187244)'%3E%3Cpath d='M 11.995815,10.472741 A 2.6961706,2.6961706 0 0 0 9.2998552,13.1687 2.6961706,2.6961706 0 0 0 11.995815,15.864659 2.6961706,2.6961706 0 0 0 14.692291,13.1687 2.6961706,2.6961706 0 0 0 11.995815,10.472741 Z m -0.0093,1.173055 a 1.5685072,1.5685072 0 0 1 1.56838,1.568896 1.5685072,1.5685072 0 0 1 -1.56838,1.56838 1.5685072,1.5685072 0 0 1 -1.56838,-1.56838 1.5685072,1.5685072 0 0 1 1.56838,-1.568896 z' style='fill:%23515151;fill-opacity:1;fill-rule:evenodd;stroke:none;stroke-width:0.265' id='path98' /%3E%3Cg id='g102'%3E%3Cpath id='rect99' style='fill:%23515151;fill-rule:evenodd;stroke-width:0.609909;stroke-linecap:round;stroke-linejoin:round;paint-order:fill markers stroke' d='m 11.6096,9.4455735 h 0.811501 a 0.32401087,0.32401087 45 0 1 0.324011,0.3240109 l 0,1.4701216 h -1.45805 V 9.7681117 A 0.3225382,0.3225382 135 0 1 11.6096,9.4455735 Z' /%3E%3Cpath id='rect99-07' style='fill:%23515151;fill-rule:evenodd;stroke-width:0.609909;stroke-linecap:round;stroke-linejoin:round;paint-order:fill markers stroke' d='m 11.6096,9.4455735 h 0.811501 a 0.32401087,0.32401087 45 0 1 0.324011,0.3240109 l 0,1.4701216 h -1.45805 V 9.7681117 A 0.3225382,0.3225382 135 0 1 11.6096,9.4455735 Z' transform='rotate(180,12.035988,13.220288)' /%3E%3Cpath id='rect99-0' style='fill:%23515151;fill-rule:evenodd;stroke-width:0.609909;stroke-linecap:round;stroke-linejoin:round;paint-order:fill markers stroke' d='m 11.6096,9.4455735 h 0.811501 a 0.32401087,0.32401087 45 0 1 0.324011,0.3240109 l 0,1.4701216 h -1.45805 V 9.7681117 A 0.3225382,0.3225382 135 0 1 11.6096,9.4455735 Z' transform='rotate(90,12.184638,13.379328)' /%3E%3Cpath id='rect99-0-2' style='fill:%23515151;fill-rule:evenodd;stroke-width:0.609909;stroke-linecap:round;stroke-linejoin:round;paint-order:fill markers stroke' d='m 11.6096,9.4455735 h 0.811501 a 0.32401087,0.32401087 45 0 1 0.324011,0.3240109 l 0,1.4701216 h -1.45805 V 9.7681117 A 0.3225382,0.3225382 135 0 1 11.6096,9.4455735 Z' transform='rotate(-90,11.88114,13.392918)' /%3E%3C/g%3E%3Cg id='g102-9' transform='rotate(45,12.002215,13.240481)'%3E%3Cpath id='rect99-7' style='fill:%23515151;fill-rule:evenodd;stroke-width:0.609909;stroke-linecap:round;stroke-linejoin:round;paint-order:fill markers stroke' d='m 11.6096,9.4455735 h 0.811501 a 0.32401087,0.32401087 45 0 1 0.324011,0.3240109 l 0,1.4701216 h -1.45805 V 9.7681117 A 0.3225382,0.3225382 135 0 1 11.6096,9.4455735 Z' /%3E%3Cpath id='rect99-07-5' style='fill:%23515151;fill-rule:evenodd;stroke-width:0.609909;stroke-linecap:round;stroke-linejoin:round;paint-order:fill markers stroke' d='m 11.6096,9.4455735 h 0.811501 a 0.32401087,0.32401087 45 0 1 0.324011,0.3240109 l 0,1.4701216 h -1.45805 V 9.7681117 A 0.3225382,0.3225382 135 0 1 11.6096,9.4455735 Z' transform='rotate(180,12.035988,13.220288)' /%3E%3Cpath id='rect99-0-27' style='fill:%23515151;fill-rule:evenodd;stroke-width:0.609909;stroke-linecap:round;stroke-linejoin:round;paint-order:fill markers stroke' d='m 11.6096,9.4455735 h 0.811501 a 0.32401087,0.32401087 45 0 1 0.324011,0.3240109 l 0,1.4701216 h -1.45805 V 9.7681117 A 0.3225382,0.3225382 135 0 1 11.6096,9.4455735 Z' transform='rotate(90,12.184638,13.379328)' /%3E%3Cpath id='rect99-0-2-4' style='fill:%23515151;fill-rule:evenodd;stroke-width:0.609909;stroke-linecap:round;stroke-linejoin:round;paint-order:fill markers stroke' d='m 11.6096,9.4455735 h 0.811501 a 0.32401087,0.32401087 45 0 1 0.324011,0.3240109 l 0,1.4701216 h -1.45805 V 9.7681117 A 0.3225382,0.3225382 135 0 1 11.6096,9.4455735 Z' transform='rotate(-90,11.88114,13.392918)' /%3E%3C/g%3E%3C/g%3E%3Cpath id='rect95' style='fill:%23ffffff;fill-opacity:1;fill-rule:evenodd;stroke-width:1.57501;stroke-linecap:round;stroke-linejoin:round;paint-order:fill markers stroke' d='m 10.162327,12.707524 2.982419,0.01935 1.22535,2.566404 -1.137408,0.326909 1.117405,2.612409 -3.623889,-2.929097 1.409175,-0.03828 z' /%3E%3C/g%3E%3C/svg%3E"

  class TurboModz {
    getInfo() {
      return {
        id: "turbomods",
        name: "TurboModz",
        // de2aff
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
              }
            }
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
