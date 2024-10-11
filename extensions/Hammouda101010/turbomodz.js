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
  let isLoading = false

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

  // Credits to Asset Manager, Made by LilyMakeThings
  const addSprite = async (spriteurl, util) => {
    const url = Cast.toString(spriteurl);

    const response = await Scratch.fetch(url);
    const json = await response.arrayBuffer();
    return json;
  }

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

    // Bitmap data format is not actually enforced, but setting it to something that isn't in scratch-parser's
    // known format list will throw an error when someone tries to load the project.
    // (https://github.com/scratchfoundation/scratch-parser/blob/665f05d739a202d565a4af70a201909393d456b2/lib/sb3_definitions.json#L51)
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
    return [md5ext,
    {
      asset,
      md5ext,
      name: assetName,
    },
    targetId]
}

  const addSound = async (args, util) => {
    const targetId = util.target.id;
    const assetName = Cast.toString(args.NAME);

    const res = await Scratch.fetch(args.URL);
    const buffer = await res.arrayBuffer();

    const storage = runtime.storage;
    const asset = storage.createAsset(
      storage.AssetType.Sound,
      storage.DataFormat.MP3,
      new Uint8Array(buffer),
      null,
      true
    );
    return [{
      asset,
      md5: asset.assetId + "." + asset.dataFormat,
      name: assetName,
    },
    targetId]
  }

  const blocksIconURI =
    "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiIHN0YW5kYWxvbmU9Im5vIj8+CjwhLS0gQ3JlYXRlZCB3aXRoIElua3NjYXBlIChodHRwOi8vd3d3Lmlua3NjYXBlLm9yZy8pIC0tPgoKPHN2ZwogICB3aWR0aD0iNjMuOTk5OTk2IgogICBoZWlnaHQ9IjYzLjk5OTk5NiIKICAgdmlld0JveD0iMCAwIDE2LjkzMzMzMiAxNi45MzMzMzIiCiAgIHZlcnNpb249IjEuMSIKICAgaWQ9InN2ZzEiCiAgIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIgogICB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciCiAgIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxkZWZzCiAgICAgaWQ9ImRlZnMxIj4KICAgIDxsaW5lYXJHcmFkaWVudAogICAgICAgaWQ9ImxpbmVhckdyYWRpZW50OTIiPgogICAgICA8c3RvcAogICAgICAgICBzdHlsZT0ic3RvcC1jb2xvcjojMDAwMDAwO3N0b3Atb3BhY2l0eToxOyIKICAgICAgICAgb2Zmc2V0PSIwIgogICAgICAgICBpZD0ic3RvcDkyIiAvPgogICAgICA8c3RvcAogICAgICAgICBzdHlsZT0ic3RvcC1jb2xvcjojZTg1OTZmO3N0b3Atb3BhY2l0eTowLjI7IgogICAgICAgICBvZmZzZXQ9IjEiCiAgICAgICAgIGlkPSJzdG9wOTMiIC8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPGxpbmVhckdyYWRpZW50CiAgICAgICBpZD0ibGluZWFyR3JhZGllbnQ4NiI+CiAgICAgIDxzdG9wCiAgICAgICAgIHN0eWxlPSJzdG9wLWNvbG9yOiNmZjkzOTM7c3RvcC1vcGFjaXR5OjE7IgogICAgICAgICBvZmZzZXQ9IjAiCiAgICAgICAgIGlkPSJzdG9wODYiIC8+CiAgICAgIDxzdG9wCiAgICAgICAgIHN0eWxlPSJzdG9wLWNvbG9yOiNlZTkwZmY7c3RvcC1vcGFjaXR5OjEiCiAgICAgICAgIG9mZnNldD0iMC43MzQ1NTkxOCIKICAgICAgICAgaWQ9InN0b3A4NyIgLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQKICAgICAgIGlkPSJzd2F0Y2gxOCI+CiAgICAgIDxzdG9wCiAgICAgICAgIHN0eWxlPSJzdG9wLWNvbG9yOiMwMDAwMDA7c3RvcC1vcGFjaXR5OjE7IgogICAgICAgICBvZmZzZXQ9IjAiCiAgICAgICAgIGlkPSJzdG9wMTgiIC8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPGxpbmVhckdyYWRpZW50CiAgICAgICB4bGluazpocmVmPSIjbGluZWFyR3JhZGllbnQ4NiIKICAgICAgIGlkPSJsaW5lYXJHcmFkaWVudDg3IgogICAgICAgeDE9IjIuNjAxMjAzIgogICAgICAgeTE9IjguMDk5NTY5MyIKICAgICAgIHgyPSI3Ljg1NDIwNjEiCiAgICAgICB5Mj0iOC4wOTk1NjkzIgogICAgICAgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiCiAgICAgICBncmFkaWVudFRyYW5zZm9ybT0ibWF0cml4KDAsMS4yNDA5MjA2LC0zLjM4MDU3NTksMCwzMy42Nzc1ODYsMy4wNjc1NzAyKSIgLz4KICAgIDxsaW5lYXJHcmFkaWVudAogICAgICAgeGxpbms6aHJlZj0iI2xpbmVhckdyYWRpZW50OTIiCiAgICAgICBpZD0ibGluZWFyR3JhZGllbnQ5MyIKICAgICAgIHgxPSIyLjg2NjMxNDIiCiAgICAgICB5MT0iNi40NjI0ODc3IgogICAgICAgeDI9IjkuOTc2OTAwMSIKICAgICAgIHkyPSIxMy4wNjA1MjciCiAgICAgICBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgLz4KICA8L2RlZnM+CiAgPGcKICAgICBpZD0ibGF5ZXIxIgogICAgIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xLjcyODc0MTMsLTQuOTE1NDU3MSkiPgogICAgPGcKICAgICAgIGlkPSJnMTAzIgogICAgICAgdHJhbnNmb3JtPSJtYXRyaXgoMS40NzkyMjQ3LDAsMCwxLjUwOTY5MDIsLTEuNzMxNzQ0LC0yLjMxNzMwMzcpIj4KICAgICAgPHBhdGgKICAgICAgICAgZD0ibSAyLjg3Mjg1NzUsNi40NjAwNjU2IHYgMi41MTM1NDE2IGggMi4xOTc4MTU3IHYgMy44NDY0OTg4IGwgMi40NDI0MzA0LDAuMDA3MiBWIDguOTczNjA3MiBoIDIuMjA2ODgxIFYgNi40NjAwNjU2IEggNi4yOTY0MjEgWiIKICAgICAgICAgc3R5bGU9ImZpbGw6dXJsKCNsaW5lYXJHcmFkaWVudDg3KTtmaWxsLXJ1bGU6ZXZlbm9kZDtzdHJva2U6dXJsKCNsaW5lYXJHcmFkaWVudDkzKTtzdHJva2Utd2lkdGg6MC41NDMyODY7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3N0cm9rZS1vcGFjaXR5OjE7cGFpbnQtb3JkZXI6ZmlsbCBtYXJrZXJzIHN0cm9rZSIKICAgICAgICAgaWQ9InBhdGg5MCIgLz4KICAgICAgPHBhdGgKICAgICAgICAgZD0ibSAzLjMzMTMxNDYsNy4zMzQzMDM4IDAsMC44MzA1NDI1IEEgMC40MDM4OTYwNywwLjQwMzg5NjA3IDQ1IDAgMCAzLjczNTIxMDcsOC41Njg3NDI0IEggNS4wNjI2MDg2IEEgMC42MDQ1MTA0OSwwLjYwNDUxMDQ5IDQ1LjIzMzA2NiAwIDEgNS42NjcwOTkxLDkuMTc4MTcwOSBMIDUuNjQwNDM2OCwxMi40NTUzNSBhIDAuNDM1ODc4NjgsMC40MzU4Nzg2OCA0NS45Njg0NTkgMCAwIDAuNDI0Njc2NSwwLjQzOTI4MSBsIDAuNTc2MDA1OCwwLjAxNDc5IEEgMC40MDc0NTk1NCwwLjQwNzQ1OTU0IDEzNS4wNDIyMiAwIDAgNy4wNTg5MTc3LDEyLjQ5MjIzNyBMIDYuOTc3NTA1OCw5LjEyODIzMzcgQSAwLjU0NjI3NDg0LDAuNTQ2Mjc0ODQgMTM0LjMwNjgzIDAgMSA3LjUyMzYyMDcsOC41Njg3NDI0IEggOC44NzYxNTE2IEEgMC40MDM4OTYwNywwLjQwMzg5NjA3IDEzNSAwIDAgOS4yODAwNDc3LDguMTY0ODQ2MyBWIDcuMzE0NzM4MiBBIDAuNDI4NTEzNzYsMC40Mjg1MTM3NiA0NSAwIDAgOC44NTE1MzM5LDYuODg2MjI0NCBsIC0yLjUzMTEyNDgsMCBIIDMuNzc5Mzk0IEEgMC40NDgwNzkzOCwwLjQ0ODA3OTM4IDEzNSAwIDAgMy4zMzEzMTQ2LDcuMzM0MzAzOCBaIgogICAgICAgICBzdHlsZT0iZmlsbDojZmZmMGYwO2ZpbGwtb3BhY2l0eToxO2ZpbGwtcnVsZTpldmVub2RkO3N0cm9rZTpub25lO3N0cm9rZS13aWR0aDowLjI5ODI1MjtzdHJva2UtbGluZWpvaW46cm91bmQ7c3Ryb2tlLW9wYWNpdHk6MTtwYWludC1vcmRlcjpmaWxsIG1hcmtlcnMgc3Ryb2tlIgogICAgICAgICBpZD0icGF0aDkwLTgiCiAgICAgICAgIHRyYW5zZm9ybT0ibWF0cml4KDAuODM5MDc0MTYsMCwwLDAuOTAxNDM3NDMsMC45ODY2ODc5MywwLjcyMjkwNzIxKSIgLz4KICAgIDwvZz4KICAgIDxnCiAgICAgICBpZD0iZzExOSIKICAgICAgIHRyYW5zZm9ybT0ibWF0cml4KDEuNDc5MjI0NywwLDAsMS41MDk2OTAyLC01LjQ1NzA5NDgsLTQuOTE4NzI0NCkiPgogICAgICA8cGF0aAogICAgICAgICBkPSJNIDExLjk5NTgxNSwxMC40NzI3NDEgQSAyLjY5NjE3MDYsMi42OTYxNzA2IDAgMCAwIDkuMjk5ODU1MiwxMy4xNjg3IDIuNjk2MTcwNiwyLjY5NjE3MDYgMCAwIDAgMTEuOTk1ODE1LDE1Ljg2NDY1OSAyLjY5NjE3MDYsMi42OTYxNzA2IDAgMCAwIDE0LjY5MjI5MSwxMy4xNjg3IDIuNjk2MTcwNiwyLjY5NjE3MDYgMCAwIDAgMTEuOTk1ODE1LDEwLjQ3Mjc0MSBaIG0gLTAuMDA5MywxLjE3MzA1NSBhIDEuNTY4NTA3MiwxLjU2ODUwNzIgMCAwIDEgMS41NjgzOCwxLjU2ODg5NiAxLjU2ODUwNzIsMS41Njg1MDcyIDAgMCAxIC0xLjU2ODM4LDEuNTY4MzggMS41Njg1MDcyLDEuNTY4NTA3MiAwIDAgMSAtMS41NjgzOCwtMS41NjgzOCAxLjU2ODUwNzIsMS41Njg1MDcyIDAgMCAxIDEuNTY4MzgsLTEuNTY4ODk2IHoiCiAgICAgICAgIHN0eWxlPSJmaWxsOiM1MTUxNTE7ZmlsbC1vcGFjaXR5OjE7ZmlsbC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlOm5vbmU7c3Ryb2tlLXdpZHRoOjAuMjY1IgogICAgICAgICBpZD0icGF0aDk4IiAvPgogICAgICA8ZwogICAgICAgICBpZD0iZzEwMiI+CiAgICAgICAgPHBhdGgKICAgICAgICAgICBpZD0icmVjdDk5IgogICAgICAgICAgIHN0eWxlPSJmaWxsOiM1MTUxNTE7ZmlsbC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlLXdpZHRoOjAuNjA5OTA5O3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtwYWludC1vcmRlcjpmaWxsIG1hcmtlcnMgc3Ryb2tlIgogICAgICAgICAgIGQ9Im0gMTEuNjA5Niw5LjQ0NTU3MzUgaCAwLjgxMTUwMSBhIDAuMzI0MDEwODcsMC4zMjQwMTA4NyA0NSAwIDEgMC4zMjQwMTEsMC4zMjQwMTA5IGwgMCwxLjQ3MDEyMTYgaCAtMS40NTgwNSBWIDkuNzY4MTExNyBBIDAuMzIyNTM4MiwwLjMyMjUzODIgMTM1IDAgMSAxMS42MDk2LDkuNDQ1NTczNSBaIiAvPgogICAgICAgIDxwYXRoCiAgICAgICAgICAgaWQ9InJlY3Q5OS0wNyIKICAgICAgICAgICBzdHlsZT0iZmlsbDojNTE1MTUxO2ZpbGwtcnVsZTpldmVub2RkO3N0cm9rZS13aWR0aDowLjYwOTkwOTtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7cGFpbnQtb3JkZXI6ZmlsbCBtYXJrZXJzIHN0cm9rZSIKICAgICAgICAgICBkPSJtIDExLjYwOTYsOS40NDU1NzM1IGggMC44MTE1MDEgYSAwLjMyNDAxMDg3LDAuMzI0MDEwODcgNDUgMCAxIDAuMzI0MDExLDAuMzI0MDEwOSBsIDAsMS40NzAxMjE2IGggLTEuNDU4MDUgViA5Ljc2ODExMTcgQSAwLjMyMjUzODIsMC4zMjI1MzgyIDEzNSAwIDEgMTEuNjA5Niw5LjQ0NTU3MzUgWiIKICAgICAgICAgICB0cmFuc2Zvcm09InJvdGF0ZSgxODAsMTIuMDM1OTg4LDEzLjIyMDI4OCkiIC8+CiAgICAgICAgPHBhdGgKICAgICAgICAgICBpZD0icmVjdDk5LTAiCiAgICAgICAgICAgc3R5bGU9ImZpbGw6IzUxNTE1MTtmaWxsLXJ1bGU6ZXZlbm9kZDtzdHJva2Utd2lkdGg6MC42MDk5MDk7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3BhaW50LW9yZGVyOmZpbGwgbWFya2VycyBzdHJva2UiCiAgICAgICAgICAgZD0ibSAxMS42MDk2LDkuNDQ1NTczNSBoIDAuODExNTAxIGEgMC4zMjQwMTA4NywwLjMyNDAxMDg3IDQ1IDAgMSAwLjMyNDAxMSwwLjMyNDAxMDkgbCAwLDEuNDcwMTIxNiBoIC0xLjQ1ODA1IFYgOS43NjgxMTE3IEEgMC4zMjI1MzgyLDAuMzIyNTM4MiAxMzUgMCAxIDExLjYwOTYsOS40NDU1NzM1IFoiCiAgICAgICAgICAgdHJhbnNmb3JtPSJyb3RhdGUoOTAsMTIuMTg0NjM4LDEzLjM3OTMyOCkiIC8+CiAgICAgICAgPHBhdGgKICAgICAgICAgICBpZD0icmVjdDk5LTAtMiIKICAgICAgICAgICBzdHlsZT0iZmlsbDojNTE1MTUxO2ZpbGwtcnVsZTpldmVub2RkO3N0cm9rZS13aWR0aDowLjYwOTkwOTtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7cGFpbnQtb3JkZXI6ZmlsbCBtYXJrZXJzIHN0cm9rZSIKICAgICAgICAgICBkPSJtIDExLjYwOTYsOS40NDU1NzM1IGggMC44MTE1MDEgYSAwLjMyNDAxMDg3LDAuMzI0MDEwODcgNDUgMCAxIDAuMzI0MDExLDAuMzI0MDEwOSBsIDAsMS40NzAxMjE2IGggLTEuNDU4MDUgViA5Ljc2ODExMTcgQSAwLjMyMjUzODIsMC4zMjI1MzgyIDEzNSAwIDEgMTEuNjA5Niw5LjQ0NTU3MzUgWiIKICAgICAgICAgICB0cmFuc2Zvcm09InJvdGF0ZSgtOTAsMTEuODgxMTQsMTMuMzkyOTE4KSIgLz4KICAgICAgPC9nPgogICAgICA8ZwogICAgICAgICBpZD0iZzEwMi05IgogICAgICAgICB0cmFuc2Zvcm09InJvdGF0ZSg0NSwxMi4wMDIyMTUsMTMuMjQwNDgxKSI+CiAgICAgICAgPHBhdGgKICAgICAgICAgICBpZD0icmVjdDk5LTciCiAgICAgICAgICAgc3R5bGU9ImZpbGw6IzUxNTE1MTtmaWxsLXJ1bGU6ZXZlbm9kZDtzdHJva2Utd2lkdGg6MC42MDk5MDk7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3BhaW50LW9yZGVyOmZpbGwgbWFya2VycyBzdHJva2UiCiAgICAgICAgICAgZD0ibSAxMS42MDk2LDkuNDQ1NTczNSBoIDAuODExNTAxIGEgMC4zMjQwMTA4NywwLjMyNDAxMDg3IDQ1IDAgMSAwLjMyNDAxMSwwLjMyNDAxMDkgbCAwLDEuNDcwMTIxNiBoIC0xLjQ1ODA1IFYgOS43NjgxMTE3IEEgMC4zMjI1MzgyLDAuMzIyNTM4MiAxMzUgMCAxIDExLjYwOTYsOS40NDU1NzM1IFoiIC8+CiAgICAgICAgPHBhdGgKICAgICAgICAgICBpZD0icmVjdDk5LTA3LTUiCiAgICAgICAgICAgc3R5bGU9ImZpbGw6IzUxNTE1MTtmaWxsLXJ1bGU6ZXZlbm9kZDtzdHJva2Utd2lkdGg6MC42MDk5MDk7c3Ryb2tlLWxpbmVjYXA6cm91bmQ7c3Ryb2tlLWxpbmVqb2luOnJvdW5kO3BhaW50LW9yZGVyOmZpbGwgbWFya2VycyBzdHJva2UiCiAgICAgICAgICAgZD0ibSAxMS42MDk2LDkuNDQ1NTczNSBoIDAuODExNTAxIGEgMC4zMjQwMTA4NywwLjMyNDAxMDg3IDQ1IDAgMSAwLjMyNDAxMSwwLjMyNDAxMDkgbCAwLDEuNDcwMTIxNiBoIC0xLjQ1ODA1IFYgOS43NjgxMTE3IEEgMC4zMjI1MzgyLDAuMzIyNTM4MiAxMzUgMCAxIDExLjYwOTYsOS40NDU1NzM1IFoiCiAgICAgICAgICAgdHJhbnNmb3JtPSJyb3RhdGUoMTgwLDEyLjAzNTk4OCwxMy4yMjAyODgpIiAvPgogICAgICAgIDxwYXRoCiAgICAgICAgICAgaWQ9InJlY3Q5OS0wLTI3IgogICAgICAgICAgIHN0eWxlPSJmaWxsOiM1MTUxNTE7ZmlsbC1ydWxlOmV2ZW5vZGQ7c3Ryb2tlLXdpZHRoOjAuNjA5OTA5O3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtwYWludC1vcmRlcjpmaWxsIG1hcmtlcnMgc3Ryb2tlIgogICAgICAgICAgIGQ9Im0gMTEuNjA5Niw5LjQ0NTU3MzUgaCAwLjgxMTUwMSBhIDAuMzI0MDEwODcsMC4zMjQwMTA4NyA0NSAwIDEgMC4zMjQwMTEsMC4zMjQwMTA5IGwgMCwxLjQ3MDEyMTYgaCAtMS40NTgwNSBWIDkuNzY4MTExNyBBIDAuMzIyNTM4MiwwLjMyMjUzODIgMTM1IDAgMSAxMS42MDk2LDkuNDQ1NTczNSBaIgogICAgICAgICAgIHRyYW5zZm9ybT0icm90YXRlKDkwLDEyLjE4NDYzOCwxMy4zNzkzMjgpIiAvPgogICAgICAgIDxwYXRoCiAgICAgICAgICAgaWQ9InJlY3Q5OS0wLTItNCIKICAgICAgICAgICBzdHlsZT0iZmlsbDojNTE1MTUxO2ZpbGwtcnVsZTpldmVub2RkO3N0cm9rZS13aWR0aDowLjYwOTkwOTtzdHJva2UtbGluZWNhcDpyb3VuZDtzdHJva2UtbGluZWpvaW46cm91bmQ7cGFpbnQtb3JkZXI6ZmlsbCBtYXJrZXJzIHN0cm9rZSIKICAgICAgICAgICBkPSJtIDExLjYwOTYsOS40NDU1NzM1IGggMC44MTE1MDEgYSAwLjMyNDAxMDg3LDAuMzI0MDEwODcgNDUgMCAxIDAuMzI0MDExLDAuMzI0MDEwOSBsIDAsMS40NzAxMjE2IGggLTEuNDU4MDUgViA5Ljc2ODExMTcgQSAwLjMyMjUzODIsMC4zMjI1MzgyIDEzNSAwIDEgMTEuNjA5Niw5LjQ0NTU3MzUgWiIKICAgICAgICAgICB0cmFuc2Zvcm09InJvdGF0ZSgtOTAsMTEuODgxMTQsMTMuMzkyOTE4KSIgLz4KICAgICAgPC9nPgogICAgPC9nPgogICAgPHBhdGgKICAgICAgIGlkPSJyZWN0OTUiCiAgICAgICBzdHlsZT0iZmlsbDojZmZmZmZmO2ZpbGwtb3BhY2l0eToxO2ZpbGwtcnVsZTpldmVub2RkO3N0cm9rZS13aWR0aDoxLjU3NTAxO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtwYWludC1vcmRlcjpmaWxsIG1hcmtlcnMgc3Ryb2tlIgogICAgICAgZD0ibSAxMC4xNjIzMjcsMTIuNzA3NTI0IDIuOTgyNDE5LDAuMDE5MzUgMS4yMjUzNSwyLjU2NjQwNCAtMS4xMzc0MDgsMC4zMjY5MDkgMS4xMTc0MDUsMi42MTI0MDkgLTMuNjIzODg5LC0yLjkyOTA5NyAxLjQwOTE3NSwtMC4wMzgyOCB6IiAvPgogIDwvZz4KPC9zdmc+Cg=="

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
                defaultValue: "foobar modpack"
              }
            }
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
                dataURI: blocksIconURI
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
      // Check if the URL for the costume asset can be fetched
      const url = costume.asset.encodeDataURI();
    
      // Ensure that `await Scratch.canFetch(url)` is checked first
      if (!(await Scratch.canFetch(url))) {
        return "Cannot fetch the costume asset.";
      }
    
      // eslint-disable-next-line no-restricted-syntax
      const image = new Image();
      image.src = url;
    
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

    loadMod(args, util) {
      const confirmLoad = confirm("WARNING: This May Take a Long Time and May Cause Heavy Lag. It Can Also Break the Entire Project. Continiue?")
      if (confirmLoad){
        isLoading = true
        isLoading = false
      }
      
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
