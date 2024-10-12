(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("TurboModz must run unsandboxed");
  }

  const vm = Scratch.vm;
  let mods = [];
  let isLoading = false;

  // Block & Argument Types from Scratch
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

  // Function for reading files
  const readFile = () => {
    return new Promise((resolve, reject) => {
      const input = document.createElement("input");
      input.type = "file";

      input.onchange = (event) => {
        const target = event.target;
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

  // Function to download a blob
  const downloadBlob = (blob, file) => {
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = file;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);
  };

  // Function to add items to mod
  const addModItem = (name, key, item) => {
    let modindex = mods.indexOf(findMod(name));
    if (key in mods[modindex]) {
      if (Array.isArray(mods[modindex][key])) {
        mods[modindex][key].push(item);
      } else {
        mods[modindex][key] = item;
      }
    }
  };

  // Unified function for adding assets to mods (sprites, images, sounds)
  const addAssetToMod = (url, modName, key, validatorFn, errorMessage) => {
    if (validatorFn(url)) {
      addModItem(modName, key, url);
    } else {
      console.error(errorMessage);
    }
  };

  // Validators for assets
  const isSprite = (url) => /\.sprite3$/i.test(new URL(url).pathname);
  const isImage = (url) => /\.(png|svg|jpeg|jpg|bmp|gif)$/i.test(new URL(url).pathname);
  const isSound = (url) => /\.(mp3|wav|ogg|mpeg)$/i.test(new URL(url).pathname);

  // Load mod assets asynchronously
  const loadModAssets = async (assets, loadFunction) => {
    for (let asset of assets) {
      try {
        await loadFunction(new URL(asset));
      } catch (e) {
        console.error(`Failed to load asset: ${e}`);
      }
    }
  };

  // Placeholder functions for loading assets
  const addSprite = async (url) => {
    const response = await Scratch.fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    await vm.addSprite(arrayBuffer);
  };

  const addCostume = async (url, name) => {
    const res = await Scratch.fetch(url);
    const blob = await res.blob();
    const targetId = vm.runtime.targets[0].id;
    await vm.addCostume(url, { name }, targetId);
  };

  const addSound = async (url, name) => {
    const res = await Scratch.fetch(url);
    const buffer = await res.arrayBuffer();
    const targetId = vm.runtime.targets[0].id;
    await vm.addSound({ asset: buffer, name }, targetId);
  };

  class TurboModz {
    getInfo() {
      return {
        id: "turbomods",
        name: "TurboModz",
        color1: "#e84cff",
        color2: "#e200fd",
        blocks: [
          // Blocks remain unchanged
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

    addSpritetoMod(args) {
      addAssetToMod(
        args.URL,
        args.MOD,
        "sprites",
        isSprite,
        "Invalid Sprite URL/Data URL"
      );
    }

    addImagetoMod(args) {
      addAssetToMod(
        args.URL,
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

    async loadMod(args) {
      const confirmLoad = confirm(
        "WARNING: This May Take a Long Time and May Cause Heavy Lag. It Can Also Break the Entire Project. Continue?"
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

    async importMod(args) {
      try {
        const mod_JSON = await readFile();
        const parsedMod = JSON.parse(mod_JSON);
        mods.push(parsedMod);
      } catch (error) {
        console.error(`Failed to import mod: ${error}`);
      }
    }

    exportMod(args) {
      const mod_JSON = JSON.stringify(this.findMod(args.MOD));
      downloadBlob(
        new Blob([mod_JSON]),
        args.MOD.replaceAll(" ", "_") + args.FILE
      );
    }

    findMod(name) {
      return mods.find((mod) => mod.name === name);
    }

    getMods() {
      return mods.length > 0 ? mods.map((mod) => mod.name) : ["no mods yet!"];
    }
  }

  Scratch.extensions.register(new TurboModz());
})(Scratch);
