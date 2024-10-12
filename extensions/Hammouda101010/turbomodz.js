(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("TurboModz must run unsandboxed");
  }

  const vm = Scratch.vm;
  // @ts-ignore
  const runtime = vm.runtime;
  // @ts-ignore
  const Cast = Scratch.Cast;

  let mods = [];
  let isLoading = false;

  // @ts-ignore
  const BlockType = Scratch.BlockType;
  // @ts-ignore
  const ArgumentType = Scratch.ArgumentType;

  // @ts-ignore
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

          // @ts-ignore
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

  // @ts-ignore
  const addModItem = (name, key, item) => {
    let modindex = mods.indexOf(this.findMod(name));
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
      this.addModItem(modName, key, url);
    } else {
      console.error(errorMessage);
    }
  };

  // @ts-ignore
  const isSprite = (url) => {
    try {
      const parsedUrl = new URL(url);
      return /\.sprite3$/i.test(parsedUrl.pathname);
    } catch (e) {
      return false;
    }
  };

  // @ts-ignore
  const isImage = (url) => {
    try {
      const validFormats = ["png", "svg", "jpeg", "jpg", "bmp", "gif"];
      // @ts-ignore
      const parsedUrl = new URL(url);
      return validFormats.some((format) =>
        url.startsWith(`data:image/${format};`)
      );
    } catch (e) {
      return false;
    }
  };

  // @ts-ignore
  const isSound = (url) => {
    try {
      const validFormats = ["mp3", "wav", "ogg", "mpeg"];
      // @ts-ignore
      const parsedUrl = new URL(url);
      return validFormats.some((format) =>
        url.startsWith(`data:audio/${format};`)
      );
    } catch (e) {
      return false;
    }
  };

  // Async version of loading mods
  const loadModAssets = async (assets, loadFunction) => {
    for (let asset of assets) {
      try {
        await loadFunction(new URL(asset));
      } catch (e) {
        console.error(`Failed to load asset: ${e}`);
      }
    }
  };

  class TurboModz {
    getInfo() {
      return {
        id: "turbomods",
        name: "TurboModz",
        color1: "#e84cff",
        color2: "#e200fd",
        blocks: [
          // Block definitions remain the same...
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

    // Unified functions for adding sprites, images, and sounds
    addSpritetoMod(args) {
      addAssetToMod(
        args.URL,
        args.MOD,
        "sprites",
        // @ts-ignore
        this.isSprite,
        "Invalid Sprite URL/Data URL"
      );
    }

    addImagetoMod(args) {
      addAssetToMod(
        args.URL,
        args.MOD,
        "costumes",
        // @ts-ignore
        this.isImage,
        "Invalid Image/Costume URL/Data URL"
      );
    }

    addSoundUrltoMod(args) {
      addAssetToMod(
        args.URL,
        args.MOD,
        "sounds",
        // @ts-ignore
        this.isSound,
        "Invalid Sound URL/Data URL"
      );
    }

    async loadMod(args) {
      const confirmLoad = confirm(
        "WARNING: This May Take a Long Time and May Cause Heavy Lag. It Can Also Break the Entire Project. Continue?"
      );
      if (confirmLoad) {
        isLoading = true;
        // @ts-ignore
        const mod = this.findMod(args.MOD);

        // Load assets asynchronously
        // @ts-ignore
        await loadModAssets(mod.sprites, addSprite);
        // @ts-ignore
        await loadModAssets(mod.costumes, addCostume);
        // @ts-ignore
        await loadModAssets(mod.sounds, addSound);

        isLoading = false;
      }
    }

    // @ts-ignore
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
      // @ts-ignore
      const mod_JSON = JSON.stringify(this.findMod(args.MOD));
      downloadBlob(
        new Blob([mod_JSON]),
        args.MOD.replaceAll(" ", "_") + args.FILE
      );
    }
  }

  Scratch.extensions.register(new TurboModz());
})(Scratch);
