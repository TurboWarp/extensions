// Name: Spotify API
// ID: SPspotify
// Description: Fetch Statistics and Information and Play Songs from Spotify
// By: SharkPool

// Version 1.2.0

(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) throw new Error("Spotify API must run unsandboxed");

  const menuIconURI =
"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0OTYgNTEyIj4KICA8cGF0aCBkPSJNMjQ4IDhDMTExLjEgOCAwIDExOS4xIDAgMjU2czExMS4xIDI0OCAyNDggMjQ4IDI0OC0xMTEuMSAyNDgtMjQ4UzM4NC45IDggMjQ4IDhaIiBmaWxsPSIjMWVkNzYwIi8+CiAgPHBhdGggZD0iTTQwNi42IDIzMS4xYy01LjIgMC04LjQtMS4zLTEyLjktMy45LTcxLjItNDIuNS0xOTguNS01Mi43LTI4MC45LTI5LjctMy42IDEtOC4xIDIuNi0xMi45IDIuNi0xMy4yIDAtMjMuMy0xMC4zLTIzLjMtMjMuNiAwLTEzLjYgOC40LTIxLjMgMTcuNC0yMy45IDM1LjItMTAuMyA3NC42LTE1LjIgMTE3LjUtMTUuMiA3MyAwIDE0OS41IDE1LjIgMjA1LjQgNDcuOCA3LjggNC41IDEyLjkgMTAuNyAxMi45IDIyLjYgMCAxMy42LTExIDIzLjMtMjMuMiAyMy4zem0tMzEgNzYuMmMtNS4yIDAtOC43LTIuMy0xMi4zLTQuMi02Mi41LTM3LTE1NS43LTUxLjktMjM4LjYtMjkuNC00LjggMS4zLTcuNCAyLjYtMTEuOSAyLjYtMTAuNyAwLTE5LjQtOC43LTE5LjQtMTkuNHM1LjItMTcuOCAxNS41LTIwLjdjMjcuOC03LjggNTYuMi0xMy42IDk3LjgtMTMuNiA2NC45IDAgMTI3LjYgMTYuMSAxNzcgNDUuNSA4LjEgNC44IDExLjMgMTEgMTEuMyAxOS43LS4xIDEwLjgtOC41IDE5LjUtMTkuNCAxOS41em0tMjYuOSA2NS42Yy00LjIgMC02LjgtMS4zLTEwLjctMy42LTYyLjQtMzcuNi0xMzUtMzkuMi0yMDYuNy0yNC41LTMuOSAxLTkgMi42LTExLjkgMi42LTkuNyAwLTE1LjgtNy43LTE1LjgtMTUuOCAwLTEwLjMgNi4xLTE1LjIgMTMuNi0xNi44IDgxLjktMTguMSAxNjUuNi0xNi41IDIzNyAyNi4yIDYuMSAzLjkgOS43IDcuNCA5LjcgMTYuNXMtNy4xIDE1LjQtMTUuMiAxNS40eiIvPgo8L3N2Zz4=";

  const blockIconURI =
"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTExLjk5MSIgY2xpcC1ydWxlPSJldmVub2RkIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGltYWdlLXJlbmRlcmluZz0ib3B0aW1pemVRdWFsaXR5IiB0ZXh0LXJlbmRlcmluZz0iZ2VvbWV0cmljUHJlY2lzaW9uIiBzaGFwZS1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiI+PHBhdGggZD0iTTI1NS45OTguMDAzQzExNC42MTYuMDAzIDAgMTE0LjYxNiAwIDI1NS45OTdjMCAxNDEuMzg1IDExNC42MTYgMjU1Ljk5NCAyNTUuOTk4IDI1NS45OTRDMzk3LjM5NSA1MTEuOTkxIDUxMiAzOTcuMzg2IDUxMiAyNTUuOTk3IDUxMiAxMTQuNjI0IDM5Ny4zOTUuMDE1IDI1NS45OTQuMDE1bC4wMDQtLjAxNXYuMDAzem0xMTcuNCAzNjkuMjJjLTQuNTg1IDcuNTE5LTE0LjQyNyA5LjkwOC0yMS45NDkgNS4yODgtNjAuMTA0LTM2LjcxNC0xMzUuNzcxLTQ1LjAyNy0yMjQuODgyLTI0LjY2OC04LjU4NyAxLjk1NC0xNy4xNDYtMy40MjUtMTkuMTA0LTEyLjAxNS0xLjk2Ny04LjU5MSAzLjM5NC0xNy4xNSAxMi4wMDMtMTkuMTA0IDk3LjUxOC0yMi4yOCAxODEuMTY0LTEyLjY4OCAyNDguNjQ1IDI4LjU1IDcuNTIyIDQuNjE2IDkuOTA3IDE0LjQyNyA1LjI4OCAyMS45NWwtLjAwMS0uMDAxem0zMS4zMzUtNjkuNzAzYy01Ljc3OSA5LjM4OS0xOC4wNjcgMTIuMzUzLTI3LjQ1MiA2LjU3OC02OC44MTMtNDIuMjk4LTE3My43MDMtNTQuNTQ4LTI1NS4wOTYtMjkuODM3LTEwLjU1NiAzLjE4Ny0yMS43MDQtMi43NjEtMjQuOTA2LTEzLjI5OC0zLjE4LTEwLjU1NiAyLjc3Mi0yMS42OCAxMy4zMDktMjQuODkxIDkyLjk3MS0yOC4yMDggMjA4LjU1MS0xNC41NDYgMjg3LjU3NCAzNC4wMTUgOS4zODUgNS43NzkgMTIuMzUgMTguMDY3IDYuNTc1IDI3LjQ0MXYtLjAwNGwtLjAwNC0uMDA0em0yLjY5Mi03Mi41ODRjLTgyLjUxMS00OS4wMDYtMjE4LjYzNS01My41MS0yOTcuNDA5LTI5LjYwMy0xMi42NDkgMy44MzctMjYuMDI3LTMuMzAyLTI5Ljg2LTE1Ljk1NS0zLjgzMi0xMi42NTYgMy4zMDMtMjYuMDIzIDE1Ljk2LTI5Ljg2NyA5MC40MjgtMjcuNDUyIDI0MC43NTMtMjIuMTQ5IDMzNS43NDcgMzQuMjQ1IDExLjQwMSA2Ljc1NCAxNS4xMzMgMjEuNDQ2IDguMzc1IDMyLjgwOS02LjcyOCAxMS4zNzgtMjEuNDYyIDE1LjEzLTMyLjgwMiA4LjM3MWgtLjAxMXoiIGZpbGwtcnVsZT0ibm9uemVybyIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==";

  const runtime = Scratch.vm.runtime;
  // for fetching files, we must use this, its slower but works
  const proxy = "https://api.codetabs.com/v1/proxy?quest=";
  let audioInstances = [], lastFetched = {s: [], a: [], p: [] };

  class SPspotify {
    constructor() {
      this.audioNode = runtime.audioEngine.inputNode;
      this.gainNode = this.audioNode.context.createGain();
      this.gainNode.gain.value = 1;
      this.gainNode.connect(this.audioNode);
      runtime.on("PROJECT_STOP_ALL", () => this.stopAll());
    }
    getInfo() {
      return {
        id: "SPspotify",
        name: "Spotify API",
        menuIconURI,
        blockIconURI,
        color1: "#1db954",
        color2: "#158c3f",
        color3: "#106e31",
        blocks: [
          {
            func: "disclaimer",
            blockType: Scratch.BlockType.BUTTON,
            text: "Song Disclaimer"
          },
          {
            opcode: "getID",
            blockType: Scratch.BlockType.REPORTER,
            text: "get special ID from [URL]",
            arguments: {
              URL: { type: Scratch.ArgumentType.STRING, defaultValue: "https://open.spotify.com" }
            }
          },
          {
            opcode: "isThingID",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is [URL] a [THING]?",
            arguments: {
              THING: { type: Scratch.ArgumentType.STRING, menu: "TYPES" },
              URL: { type: Scratch.ArgumentType.STRING, defaultValue: "https://open.spotify.com" }
            }
          },
          { blockType: Scratch.BlockType.LABEL, text: "Songs" },
          {
            opcode: "getSongAtt",
            blockType: Scratch.BlockType.REPORTER,
            text: "get [THING] from song ID [URL]",
            arguments: {
              THING: { type: Scratch.ArgumentType.STRING, menu: "SONG_ATTS" },
              URL: { type: Scratch.ArgumentType.STRING, defaultValue: "1mCsF9Tw4AkIZOjvZbZZdT" }
            }
          },
          "---",
          {
            opcode: "getSongURL",
            blockType: Scratch.BlockType.REPORTER,
            text: "get song from ID [URL]",
            arguments: {
              URL: { type: Scratch.ArgumentType.STRING, defaultValue: "1mCsF9Tw4AkIZOjvZbZZdT" }
            }
          },
          {
            opcode: "playSongURL",
            blockType: Scratch.BlockType.COMMAND,
            text: "play song from ID [URL]",
            arguments: {
              URL: { type: Scratch.ArgumentType.STRING, defaultValue: "1mCsF9Tw4AkIZOjvZbZZdT" }
            }
          },
          {
            opcode: "stopAll",
            blockType: Scratch.BlockType.COMMAND,
            text: "stop all songs"
          },
          { blockType: Scratch.BlockType.LABEL, text: "Artists" },
          {
            opcode: "getArtistAtt",
            blockType: Scratch.BlockType.REPORTER,
            text: "get [THING] from artist ID [URL]",
            arguments: {
              THING: { type: Scratch.ArgumentType.STRING, menu: "ARTIST_ATTS" },
              URL: { type: Scratch.ArgumentType.STRING, defaultValue: "3bmFPbLMiLxtR9tFrTcKcP" }
            }
          },
          { blockType: Scratch.BlockType.LABEL, text: "Playlists and Albums" },
          {
            opcode: "getPlaylistAtt",
            blockType: Scratch.BlockType.REPORTER,
            text: "get [THING] from playlist ID [URL]",
            arguments: {
              THING: { type: Scratch.ArgumentType.STRING, menu: "PLAYLIST_ATTS" },
              URL: { type: Scratch.ArgumentType.STRING, defaultValue: "1EuOcg2fA7aT9FAni72QBj" }
            }
          },
          {
            opcode: "getAlbumAtt",
            blockType: Scratch.BlockType.REPORTER,
            text: "get [THING] from album ID [URL]",
            arguments: {
              THING: { type: Scratch.ArgumentType.STRING, menu: "ALBUM_ATTS" },
              URL: { type: Scratch.ArgumentType.STRING, defaultValue: "7caQVORQsbBXFR20EFcm8n" }
            }
          }
        ],
        menus: {
          TYPES: {
            acceptReporters: true,
            items: ["song", "artist", "playlist", "album"]
          },
          SEARCH_TYPES: {
            acceptReporters: true,
            items: [
              "song names", "artist names", "playlist names",
              "song IDs", "artist IDs", "playlist IDs"
            ]
          },
          SONG_ATTS: {
            acceptReporters: true,
            items: [
              "name", "artist", "artist ID", "cover",
              "release date", "length", "listens"
            ]
          },
          ARTIST_ATTS: {
            acceptReporters: true,
            items: ["artist", "description", "monthly listeners", "top 5 songs"]
          },
          PLAYLIST_ATTS: {
            acceptReporters: true,
            items: [
              "name", "creator", "cover", "description",
              "likes", "song count", "top 30 songs"
            ]
          },
          ALBUM_ATTS: {
            acceptReporters: true,
            items: [
              "name", "creator", "cover", "song count", "top 30 songs"
            ]
          }
        },
      };
    }

    disclaimer() {
      const overlay = document.createElement("div");
      overlay.setAttribute("style", "position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); z-index: 9998;");
      const disclaimContain = document.createElement("div");
      disclaimContain.id = "disclaimer-container";
      disclaimContain.setAttribute("style", "position: fixed; width: 250px; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 9999; border: 5px outset #1db954; border-radius: 15px; padding: 10px; background-color: #18191A; color: white; font-family: arial;");

      const closeButton = document.createElement("button");
      closeButton.textContent = "Close";
      closeButton.setAttribute("style", "font-weight: bold; display: block; margin: auto; border: 3px solid #106e31; border-radius: 15px; padding: 10px; width: 100px; background-color: #1db954; color: white;");
      closeButton.addEventListener("click", () => { 
        disclaimContain.remove();
        overlay.remove();
      });

      const image = document.createElement("img");
      image.src = menuIconURI;
      image.setAttribute("style", "width: 50px; margin-right: 10px; margin-bottom: -15px; display: inline-block;");

      const title = document.createElement("h2");
      title.textContent = "Disclaimer";
      title.setAttribute("style", "margin-bottom: 10px; text-align: center; color: white; display: inline-block;");
      const disclaimTxt = document.createElement("p");
      disclaimTxt.innerHTML = "Unfortunately, Spotify only allows playing 30-second previews of songs.<br><br>It is against their Terms of Service to download full songs for commercial use.";
      disclaimTxt.setAttribute("style", "text-align: center; color: white;");

      const contentContain = document.createElement("div");
      contentContain.style.textAlign = "center";
      contentContain.append(image, title, disclaimTxt);
      disclaimContain.append(contentContain, closeButton);
      document.body.append(overlay, disclaimContain);
    }

    replaceSpecial(inputArray) {
      if (!inputArray) return inputArray;
      const replacements = {
        "&amp;": "&", "&lt;": "<", "&gt;": ">", "&excl;": "!",
        "&commat;": "@", "&num;": "#", "&dollar;": "$", "&percnt;": "%",
        "&Hat;": "^", "&ast;": "*", "&lpar;": "(", "&rpar;": ")",
        "&lowbar;": "_", "&plus;": "+", "&equals;": "=",
        "&quest;": "?", "&apos;": "'", "&quot;": "\"", "&#x27;": "'"
      };
      return inputArray.map((inputString) => {
        const regex = new RegExp(Object.keys(replacements).join("|"), "g");
        return inputString.replace(regex, (match) => replacements[match]);
      });
    }

    getID(args) {
      if (args.URL.startsWith("https://open.spotify.com/")) {
        const urlParts = args.URL.split("/");
        return urlParts[4] ? urlParts[4] : "";
      }
      return "";
    }

    isThingID(args) {
      if (args.THING === "song") args.THING = "track";
      if (args.URL.startsWith("https://open.spotify.com/")) {
        const urlParts = args.URL.split("/");
        if (urlParts[3]) return urlParts[3] === args.THING;
      }
      return false;
    }

    async getSongURL(args) {
      try {
        let response;
        if (lastFetched.s[0] === args.URL) response = lastFetched.s[1];
        else {
          if (!await Scratch.canFetch(`https://open.spotify.com/track/${args.URL}`)) return "";
          // eslint-disable-next-line
          response = await fetch(`${proxy}https://open.spotify.com/track/${args.URL}`);
          if (!response.ok) return "Error: 404";
          response = await response.text();
          lastFetched.s = [args.URL, response];
        }
        const match = response.match(/<meta property="og:audio" content="([^"]+)"/);
        if (match && match[1]) return match[1];
      } catch (e) {
        return `Error: ${e}`;
      }
      return "";
    }

    getUrlAudioBuffer(url) {
      return new Promise((resolve) => {
        // eslint-disable-next-line
        fetch(url).then(response => {
          response.arrayBuffer().then(arrayBuffer => {
            runtime.audioEngine.inputNode.context.decodeAudioData(arrayBuffer, (audioBuffer) => {
              resolve(audioBuffer);
            }, resolve()).catch(resolve());
          }).catch(resolve());
        }).catch(resolve());
      });
    }

    async playSongURL(args) {
      const url = await this.getSongURL(args);
      if (!(await Scratch.canFetch(url))) return;
      let buffer = null;
      try {
        buffer = await this.getUrlAudioBuffer(url);
      } catch (e) {
        return console.warn("Couldn't decode AudioBuffer", e);
      }
      const node = this.audioNode.context.createBufferSource();
      node.buffer = buffer;
      node.connect(this.gainNode);
      node.start(0);
      audioInstances.push(node);
    }

    stopAll() {
      audioInstances.forEach(node => {
        try {
          node.disconnect(this.gainNode);
        } catch {}
      });
      audioInstances = [];
    }

    async getSongAtt(args) {
      try {
        let response, match;
        if (lastFetched.s[0] === args.URL) response = lastFetched.s[1];
        else {
          if (!await Scratch.canFetch(`https://open.spotify.com/track/${args.URL}`)) return "";
          // eslint-disable-next-line
          response = await fetch(`${proxy}https://open.spotify.com/track/${args.URL}`);
          if (!response.ok) return "Error: 404";
          response = await response.text();
          lastFetched.s = [args.URL, response];
        }
        switch (args.THING) {
          case "artist":
            match = this.replaceSpecial(response.match(/<meta[^>]*name="music:musician_description"[^>]*content="([^"]+)"/));
            return match && match[1] ? match[1] : "";
          case "artist ID":
            match = response.match(/<meta name="music:musician" content="https:\/\/open.spotify.com\/artist\/([^"]+)"\/>/);
            return match && match[1] ? match[1] : "";
          case "cover":
            match = response.match(/<meta name="twitter:image" content="([^"]+)"\/>/);
            return match && match[1] ? match[1] : "";
          case "release date":
            match = response.match(/<meta name="music:release_date" content="([^"]+)"\/>/);
            return match && match[1] ? match[1] : "";
          case "length":
            match = response.match(/<meta name="music:duration" content="([^"]+)"\/>/);
            return match && match[1] ? parseFloat(match[1].replaceAll(",", "")) : "";
          case "listens":
            match = response.match(/<a[^>]*href="\/track\/[^"]+"[^>]*>\s*<span[^>]*>([^<]+)<\/span>\s*<span[^>]*data-encore-id="text">([\d,]+)<\/span>\s*<\/a>/);
            return match && match[2] ? parseFloat(match[2].replaceAll(",", "")) : "";
          default:
            match = this.replaceSpecial(response.match(/<meta property="og:title" content="([^"]+)"\/>/));
            return match && match[1] ? match[1] : "";
        }
      } catch (e) {
        return `Error: ${e}`;
      }
    }

    async getArtistAtt(args) {
      try {
        let response, match;
        if (lastFetched.a[0] === args.URL) response = lastFetched.a[1];
        else {
          if (!await Scratch.canFetch(`https://open.spotify.com/artist/${args.URL}`)) return "";
          // eslint-disable-next-line
          response = await fetch(`${proxy}https://open.spotify.com/artist/${args.URL}`);
          if (!response.ok) return "Error: 404";
          response = await response.text();
          lastFetched.a = [args.URL, response];
        }
        switch (args.THING) {
          case "description":
            match = response.match(/<div class="[^"]+"><div class="[^"]+" data-encore-id="text"><span[^>]*data-encore-id="text">([\s\S]+)<\/span><\/div><\/div>/);
            if (match && match[1]) {
              match[1] = match[1].replace(/<a[^>]*>(.*?)<\/a>/g, "$1").replace(/<\/span><\/div>\s*<div[^>]*>\s*<span[^>]*>/g, "");
              return this.replaceSpecial(match)[1];
            }
            return "";
          case "monthly listeners":
            match = response.match(/>([0-9,]+) monthly listeners<\/div>/);
            return match && match[1] ? parseFloat(match[1].replaceAll(",", "")) : 0;
          case "top 5 songs":
            match = [...response.matchAll(/track:([^-]+)-/g)].map(match => match[1]);
            match = match.filter((_, index) => index % 2 === 0);
            return match.length > 0 ? JSON.stringify([...new Set(match)]) : "[]";
          default:
            match = this.replaceSpecial(response.match(/<meta property="og:title" content="([^"]+)"\/>/));
            return match && match[1] ? match[1] : "";
        }
      } catch (e) {
        return `Error: ${e}`;
      }
    }

    async getPlaylistAtt(args) {
      try {
        let response, match;
        if (lastFetched.p[0] === args.URL) response = lastFetched.p[1];
        else {
          if (!await Scratch.canFetch(`https://open.spotify.com/playlist/${args.URL}`)) return "";
          // eslint-disable-next-line
          response = await fetch(`${proxy}https://open.spotify.com/playlist/${args.URL}`);
          if (!response.ok) return "Error: 404";
          response = await response.text();
          lastFetched.p = [args.URL, response];
        }
        switch (args.THING) {
          case "creator":
            match = this.replaceSpecial(response.match(/<a[^>]*href="\/user\/([^"]+)">([^<]+)<\/a>/));
            return match && match[2] ? match[2] : "";
          case "cover":
            match = response.match(/<meta\s+name="twitter:image"\s+content="([^"]+)"\s*\/>/);
            return match && match[1] ? match[1] : "";
          case "description":
            match = this.replaceSpecial(response.match(/h1><div[^>]*>\s*<span[^>]*>([^<]+)<\/span>\s*<\/div>/));
            return match && match[1] ? match[1] : "";
          case "likes":
            match = response.match(/>([^<]+) save(s?)[\n]*<\/span></);
            return match && match[1] ? parseFloat(match[1].replaceAll(",", "")) : 0;
          case "song count":
            match = response.match(/<meta\s+name="music:song_count"\s+content="([^"]+)"\s*\/>/);
            return match && match[1] ? parseFloat(match[1].replaceAll(",", "")) : "";
          case "top 30 songs":
            match = response.matchAll(/track\/([^"]+)"/g);
            match = Array.from(match, match => match[1]);
            return match ? JSON.stringify(match) : "[]";
          default:
            match = this.replaceSpecial(response.match(/<meta\s+name="twitter:title"\s+content="([^"]+)"\s*\/>/));
            return match && match[1] ? match[1] : "";
        }
      } catch (e) {
        return `Error: ${e}`;
      }
    }

    async getAlbumAtt(args) {
      try {
        let response, match;
        if (lastFetched.p[0] === args.URL) response = lastFetched.p[1];
        else {
          if (!await Scratch.canFetch(`https://open.spotify.com/album/${args.URL}`)) return "";
          // eslint-disable-next-line
          response = await fetch(`${proxy}https://open.spotify.com/album/${args.URL}`);
          if (!response.ok) return "Error: 404";
          response = await response.text();
          lastFetched.p = [args.URL, response];
        }
        switch (args.THING) {
          case "creator":
            match = this.replaceSpecial(response.match(/<span[^>]*>\s*<a[^>]*>([^<]+)<\/a>\s*<\/span>/));
            return match && match[1] ? match[1] : "";
          case "cover":
            match = response.match(/<meta\s+name="twitter:image"\s+content="([^"]+)"\s*\/>/);
            return match && match[1] ? match[1] : "";
          case "song count":
            match = response.match(/<meta[^>]*name="twitter:description"[^>]*content="[^"]* (\d+ song(?:s)?)"[^>]*>/);
            return match && match[1] ? parseFloat(match[1].replaceAll(",", "")) : "";
          case "top 30 songs":
            match = response.matchAll(/track\/([^"]+)"/g);
            match = Array.from(match, match => match[1]);
            return match ? JSON.stringify(match) : "[]";
          default:
            match = this.replaceSpecial(response.match(/<meta\s+name="twitter:title"\s+content="([^"]+)"\s*\/>/));
            return match && match[1] ? match[1] : "";
        }
      } catch (e) {
        return `Error: ${e}`;
      }
    }
  }

  Scratch.extensions.register(new SPspotify());
})(Scratch);
