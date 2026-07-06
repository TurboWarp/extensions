// Name: Spotify API
// ID: SPspotify
// Description: Play songs and get metadata from Spotify.
// By: SharkPool

// Version 1.3.0

(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) throw new Error("Spotify API must run unsandboxed");

  const menuIconURI =
"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0OTYgNTEyIj4KICA8cGF0aCBkPSJNMjQ4IDhDMTExLjEgOCAwIDExOS4xIDAgMjU2czExMS4xIDI0OCAyNDggMjQ4IDI0OC0xMTEuMSAyNDgtMjQ4UzM4NC45IDggMjQ4IDhaIiBmaWxsPSIjMWVkNzYwIi8+CiAgPHBhdGggZD0iTTQwNi42IDIzMS4xYy01LjIgMC04LjQtMS4zLTEyLjktMy45LTcxLjItNDIuNS0xOTguNS01Mi43LTI4MC45LTI5LjctMy42IDEtOC4xIDIuNi0xMi45IDIuNi0xMy4yIDAtMjMuMy0xMC4zLTIzLjMtMjMuNiAwLTEzLjYgOC40LTIxLjMgMTcuNC0yMy45IDM1LjItMTAuMyA3NC42LTE1LjIgMTE3LjUtMTUuMiA3MyAwIDE0OS41IDE1LjIgMjA1LjQgNDcuOCA3LjggNC41IDEyLjkgMTAuNyAxMi45IDIyLjYgMCAxMy42LTExIDIzLjMtMjMuMiAyMy4zem0tMzEgNzYuMmMtNS4yIDAtOC43LTIuMy0xMi4zLTQuMi02Mi41LTM3LTE1NS43LTUxLjktMjM4LjYtMjkuNC00LjggMS4zLTcuNCAyLjYtMTEuOSAyLjYtMTAuNyAwLTE5LjQtOC43LTE5LjQtMTkuNHM1LjItMTcuOCAxNS41LTIwLjdjMjcuOC03LjggNTYuMi0xMy42IDk3LjgtMTMuNiA2NC45IDAgMTI3LjYgMTYuMSAxNzcgNDUuNSA4LjEgNC44IDExLjMgMTEgMTEuMyAxOS43LS4xIDEwLjgtOC41IDE5LjUtMTkuNCAxOS41em0tMjYuOSA2NS42Yy00LjIgMC02LjgtMS4zLTEwLjctMy42LTYyLjQtMzcuNi0xMzUtMzkuMi0yMDYuNy0yNC41LTMuOSAxLTkgMi42LTExLjkgMi42LTkuNyAwLTE1LjgtNy43LTE1LjgtMTUuOCAwLTEwLjMgNi4xLTE1LjIgMTMuNi0xNi44IDgxLjktMTguMSAxNjUuNi0xNi41IDIzNyAyNi4yIDYuMSAzLjkgOS43IDcuNCA5LjcgMTYuNXMtNy4xIDE1LjQtMTUuMiAxNS40eiIvPgo8L3N2Zz4=";

  const blockIconURI =
"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTExLjk5MSIgY2xpcC1ydWxlPSJldmVub2RkIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGltYWdlLXJlbmRlcmluZz0ib3B0aW1pemVRdWFsaXR5IiB0ZXh0LXJlbmRlcmluZz0iZ2VvbWV0cmljUHJlY2lzaW9uIiBzaGFwZS1yZW5kZXJpbmc9Imdlb21ldHJpY1ByZWNpc2lvbiI+PHBhdGggZD0iTTI1NS45OTguMDAzQzExNC42MTYuMDAzIDAgMTE0LjYxNiAwIDI1NS45OTdjMCAxNDEuMzg1IDExNC42MTYgMjU1Ljk5NCAyNTUuOTk4IDI1NS45OTRDMzk3LjM5NSA1MTEuOTkxIDUxMiAzOTcuMzg2IDUxMiAyNTUuOTk3IDUxMiAxMTQuNjI0IDM5Ny4zOTUuMDE1IDI1NS45OTQuMDE1bC4wMDQtLjAxNXYuMDAzem0xMTcuNCAzNjkuMjJjLTQuNTg1IDcuNTE5LTE0LjQyNyA5LjkwOC0yMS45NDkgNS4yODgtNjAuMTA0LTM2LjcxNC0xMzUuNzcxLTQ1LjAyNy0yMjQuODgyLTI0LjY2OC04LjU4NyAxLjk1NC0xNy4xNDYtMy40MjUtMTkuMTA0LTEyLjAxNS0xLjk2Ny04LjU5MSAzLjM5NC0xNy4xNSAxMi4wMDMtMTkuMTA0IDk3LjUxOC0yMi4yOCAxODEuMTY0LTEyLjY4OCAyNDguNjQ1IDI4LjU1IDcuNTIyIDQuNjE2IDkuOTA3IDE0LjQyNyA1LjI4OCAyMS45NWwtLjAwMS0uMDAxem0zMS4zMzUtNjkuNzAzYy01Ljc3OSA5LjM4OS0xOC4wNjcgMTIuMzUzLTI3LjQ1MiA2LjU3OC02OC44MTMtNDIuMjk4LTE3My43MDMtNTQuNTQ4LTI1NS4wOTYtMjkuODM3LTEwLjU1NiAzLjE4Ny0yMS43MDQtMi43NjEtMjQuOTA2LTEzLjI5OC0zLjE4LTEwLjU1NiAyLjc3Mi0yMS42OCAxMy4zMDktMjQuODkxIDkyLjk3MS0yOC4yMDggMjA4LjU1MS0xNC41NDYgMjg3LjU3NCAzNC4wMTUgOS4zODUgNS43NzkgMTIuMzUgMTguMDY3IDYuNTc1IDI3LjQ0MXYtLjAwNGwtLjAwNC0uMDA0em0yLjY5Mi03Mi41ODRjLTgyLjUxMS00OS4wMDYtMjE4LjYzNS01My41MS0yOTcuNDA5LTI5LjYwMy0xMi42NDkgMy44MzctMjYuMDI3LTMuMzAyLTI5Ljg2LTE1Ljk1NS0zLjgzMi0xMi42NTYgMy4zMDMtMjYuMDIzIDE1Ljk2LTI5Ljg2NyA5MC40MjgtMjcuNDUyIDI0MC43NTMtMjIuMTQ5IDMzNS43NDcgMzQuMjQ1IDExLjQwMSA2Ljc1NCAxNS4xMzMgMjEuNDQ2IDguMzc1IDMyLjgwOS02LjcyOCAxMS4zNzgtMjEuNDYyIDE1LjEzLTMyLjgwMiA4LjM3MWgtLjAxMXoiIGZpbGwtcnVsZT0ibm9uemVybyIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==";

  const Cast = Scratch.Cast;
  const runtime = Scratch.vm.runtime;

  const SPOTIFY_API = "https://api.spotify.com/v1/";
  const SPOTIFY_DB = "https://api-partner.spotify.com/pathfinder/v2/query";
  const DB_HASH_OPERATION = "ae0e2958a4ab645b35ca19ac04d0495ae12d9c5d7b7286217674801a9aab281a";
  const SPOTIFY_EMBED = "https://open.spotify.com/embed/";
  const EMBED_REGEX = /<script id="__NEXT_DATA__"[^>]*>([\s\S]*?)<\/script>/;
  const TOKEN_EXPIRES = 60 * 60 * 1000;

  const proxy = "https://reef-proxy.onrender.com/"; // this is my proxy, managed by me

  const SpotifyCache = new Map();

  let accessToken = {
    value: null,
    expires: null,
  };

  /**
   * Caches a value into SpotifyCache.
   * 
   * @param key {String} Name ID of Cache
   * @param value {*} Cached item
   */
  const setCache = function (key, value) {
    SpotifyCache.set(key, value);
  };

  /**
   * Returns a value from SpotifyCache, if exists.
   * 
   * @param key {String} Name ID of Cache
   * @returns Cached value if exists, otherwise null
   */
  const getFromCache = function (key) {
    if (SpotifyCache.has(key)) {
      return SpotifyCache.get(key);
    }

    return null;
  };

  /**
   * Generates an item for a block dropdown menu.
   * 
   * @param text {String} Text value of menu item
   * @param value {String|undefined} Value of menu item, uses 'text' param if undefined
   * @returns Menu item object
   */
  const genMenuItem = (text, value) => {
    return {
      text: Scratch.translate(text),
      value: value ?? text
    };
  };

  class SPspotify {
    constructor() {
      this.audioNode = runtime.audioEngine.inputNode;
      this.gainNode = this.audioNode.context.createGain();
      this.gainNode.gain.value = 1;
      this.gainNode.connect(this.audioNode);
      runtime.on("PROJECT_STOP_ALL", this.stopAll);
      runtime.on("RUNTIME_DISPOSED", SpotifyCache.clear);

      this.playerInstances = [];
    }
    getInfo() {
      return {
        id: "SPspotify",
        name: Scratch.translate("Spotify API"),
        menuIconURI,
        blockIconURI,
        color1: "#1db954",
        color2: "#158c3f",
        color3: "#106e31",
        blocks: [
          {
            func: "disclaimer",
            blockType: Scratch.BlockType.BUTTON,
            text: Scratch.translate("Song Disclaimer")
          },
          {
            opcode: "getID",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("get special ID from [URL]"),
            arguments: {
              URL: { type: Scratch.ArgumentType.STRING, defaultValue: "https://open.spotify.com" }
            }
          },
          {
            opcode: "isThingID",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is [URL] a [THING]?"),
            arguments: {
              THING: { type: Scratch.ArgumentType.STRING, menu: "TYPES" },
              URL: { type: Scratch.ArgumentType.STRING, defaultValue: "https://open.spotify.com" }
            }
          },
          { blockType: Scratch.BlockType.LABEL, text: Scratch.translate("Songs") },
          {
            opcode: "getSongAtt",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("get [THING] from song ID [URL]"),
            arguments: {
              THING: { type: Scratch.ArgumentType.STRING, menu: "SONG_ATTS" },
              URL: { type: Scratch.ArgumentType.STRING, defaultValue: "1mCsF9Tw4AkIZOjvZbZZdT" }
            }
          },
          "---",
          {
            opcode: "getSongURL",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("get song preview from ID [URL]"),
            arguments: {
              URL: { type: Scratch.ArgumentType.STRING, defaultValue: "1mCsF9Tw4AkIZOjvZbZZdT" }
            }
          },
          {
            opcode: "playSongURL",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("play song preview from ID [URL]"),
            arguments: {
              URL: { type: Scratch.ArgumentType.STRING, defaultValue: "1mCsF9Tw4AkIZOjvZbZZdT" }
            }
          },
          {
            opcode: "stopAll",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("stop all songs")
          },
          { blockType: Scratch.BlockType.LABEL, text: Scratch.translate("Artists") },
          {
            opcode: "getArtistAtt",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("get [THING] from artist ID [URL]"),
            arguments: {
              THING: { type: Scratch.ArgumentType.STRING, menu: "ARTIST_ATTS" },
              URL: { type: Scratch.ArgumentType.STRING, defaultValue: "3bmFPbLMiLxtR9tFrTcKcP" }
            }
          },
          { blockType: Scratch.BlockType.LABEL, text: Scratch.translate("Playlists & Albums") },
          {
            opcode: "getPlaylistAtt",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("get [THING] from playlist ID [URL]"),
            arguments: {
              THING: { type: Scratch.ArgumentType.STRING, menu: "PLAYLIST_ATTS" },
              URL: { type: Scratch.ArgumentType.STRING, defaultValue: "49PAThhKRCCTXeydvq9uAp" }
            }
          },
          {
            opcode: "getAlbumAtt",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("get [THING] from album ID [URL]"),
            arguments: {
              THING: { type: Scratch.ArgumentType.STRING, menu: "ALBUM_ATTS" },
              URL: { type: Scratch.ArgumentType.STRING, defaultValue: "7caQVORQsbBXFR20EFcm8n" }
            }
          }
        ],
        menus: {
          TYPES: {
            acceptReporters: true,
            items: [
              genMenuItem("song"),
              genMenuItem("artist"),
              genMenuItem("playlist"),
              genMenuItem("album")
            ]
          },
          SONG_ATTS: {
            acceptReporters: true,
            items: [
              genMenuItem("name"),
              genMenuItem("artist"),
              genMenuItem("artist ID"),
              genMenuItem("cover"),
              genMenuItem("release date"),
              genMenuItem("popularity"),
              genMenuItem("length"),
              genMenuItem("is explicit")
            ]
          },
          ARTIST_ATTS: {
            acceptReporters: true,
            items: [
              genMenuItem("name"),
              genMenuItem("avatar"),
              genMenuItem("followers"),
              genMenuItem("popularity"),
              genMenuItem("genres"),
              genMenuItem("biography"),
              genMenuItem("monthly listeners"),
              genMenuItem("top songs"),
            ]
          },
          PLAYLIST_ATTS: {
            acceptReporters: true,
            items: [
              genMenuItem("name"),
              genMenuItem("creator"),
              genMenuItem("cover"),
              genMenuItem("description"),
              genMenuItem("followers"),
              genMenuItem("song count"),
              genMenuItem("top songs"),
            ]
          },
          ALBUM_ATTS: {
            acceptReporters: true,
            items: [
              genMenuItem("name"),
              genMenuItem("artist"),
              genMenuItem("artist ID"),
              genMenuItem("cover"),
              genMenuItem("release date"),
              genMenuItem("popularity"),
              genMenuItem("genres"),
              genMenuItem("song count"),
              genMenuItem("top songs"),
            ]
          }
        },
      };
    }

    // Helper Funcs
    disclaimer() {
      const overlay = document.createElement("div");
      overlay.setAttribute("style", "position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); z-index: 9998;");

      const container = document.createElement("div");
      container.id = "disclaimer-container";
      container.setAttribute("style", "position: fixed; width: 250px; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 9999; border: 5px outset #1db954; border-radius: 15px; padding: 10px; background-color: #18191A; color: white; font-family: arial;");

      const closeBtn = document.createElement("button");
      closeBtn.textContent = "Close";
      closeBtn.setAttribute("style", "font-weight: bold; display: block; margin: auto; border: 3px solid #106e31; border-radius: 15px; padding: 10px; width: 100px; background-color: #1db954; color: white;");
      closeBtn.addEventListener("click", () => overlay.remove());

      const image = document.createElement("img");
      image.src = menuIconURI;
      image.setAttribute("style", "width: 50px; margin-right: 10px; margin-bottom: -15px; display: inline-block;");

      const title = document.createElement("h2");
      title.textContent = "Disclaimer";
      title.setAttribute("style", "margin-bottom: 10px; text-align: center; color: white; display: inline-block;");

      const disclaimTxt = document.createElement("p");
      disclaimTxt.innerHTML = "Spotify only allows 30-second previews of songs.<br><br>It is against their Terms of Service to download and play full songs for commercial use.";
      disclaimTxt.setAttribute("style", "text-align: center; color: white;");

      const contentContain = document.createElement("div");
      contentContain.style.textAlign = "center";
      contentContain.append(image, title, disclaimTxt);
      container.append(contentContain, closeBtn);
      overlay.append(container);
      document.body.append(overlay);
    }

    async _newAccessToken(type, id) {
      const now = Date.now();
      if (accessToken.expires > now) {
        return accessToken.value;
      }

      const data = await this._scrapeEmbed(type, id);
      if (data) {
        accessToken.expires = now + TOKEN_EXPIRES;
        accessToken.value = data.settings.session.accessToken;
        return accessToken.value;
      }

      return null;
    }

    async _fetchFromSpotify(type, id, opt_extraParams) {
      const endpoint = `${type}s/${id}` + (opt_extraParams?.urlPath ?? "");

      const cached = getFromCache(endpoint);
      if (cached) return cached;

      try {
        const token = await this._newAccessToken(type, id);
        if (!token) return null;

        // eslint-disable-next-line
        const response = await Scratch.fetch(SPOTIFY_API + endpoint, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setCache(endpoint, data);
        return data;
      } catch (error) {
        console.warn("Failed to fetch from Spotify:", error);
        return null;
      }
    }

    async _fetchFromSpotifyDB(operation, type, id) {
      const endpoint = "query/" + type + id;

      const cached = getFromCache(endpoint);
      if (cached) return cached;

      try {
        const token = await this._newAccessToken(type, id);
        if (!token) return null;

        // eslint-disable-next-line
        const response = await Scratch.fetch(SPOTIFY_DB, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "accept-language": "en"
          },
          body: JSON.stringify({
            variables: {
              uri: `spotify:${type}:${id}`,
              preReleaseV2: true
            },
            operationName: operation,
            extensions: {
              persistedQuery: {
                version: 1,
                sha256Hash: DB_HASH_OPERATION
              }
            }
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setCache(endpoint, data.data);
        return data.data;
      } catch (error) {
        console.warn("Failed to fetch from Spotify DB:", error);
        return null;
      }
    }

    async _scrapeEmbed(type, id) {
      const endpoint = `${type}/${id}`;

      const cached = getFromCache(endpoint);
      if (cached) return cached;

      try {
        // eslint-disable-next-line
        const response = await Scratch.fetch(`${proxy}get?url=${SPOTIFY_EMBED}${endpoint}`);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const embed = await response.text();
        const dataMatch = embed.match(EMBED_REGEX);
        if (dataMatch) {
          const embedData = JSON.parse(dataMatch[1]);
          const targetData = embedData.props.pageProps.state;
          setCache(endpoint, targetData);
          return targetData;
        }

        return null;
      } catch (error) {
        console.warn("Failed to fetch from Spotify:", error);
        return null;
      }
    }

    async _getTrackAudioBuffer(url) {
      // eslint-disable-next-line
      const response = await Scratch.fetch(url);
      if (!response.ok) return null;

      const arrayBuffer = await response.arrayBuffer();
      try {
        const buffer = await runtime.audioEngine.inputNode.context.decodeAudioData(arrayBuffer);
        return buffer;
      } catch {
        return null;
      }
    }

    // Block Funcs
    getID(args) {
      try {
        const url = new URL(Cast.toString(args.URL));
        if (url.host.includes("spotify.com")) {
          const path = url.pathname.split("/");
          return path[2];
        }
      } catch {}

      return "";
    }

    isThingID(args) {
      if (args.THING === "song") args.THING = "track";

      try {
        const url = new URL(Cast.toString(args.URL));
        if (url.host.includes("spotify.com")) {
          const path = url.pathname.split("/");
          return path[1] === args.THING;
        }
      } catch {}

      return false;
    }

    async getSongAtt(args) {
      const trackData = await this._fetchFromSpotify("track", args.URL);
      if (!trackData) {
        console.warn("No track data!");
        return "";
      }

      switch (Cast.toString(args.THING)) {
        case "name":
          return trackData.name;
        case "artist":
          return trackData.artists[0].name;
        case "artist ID":
          return trackData.artists[0].id;
        case "cover":
          return trackData.album.images[0].url;
        case "release date":
          return trackData.album.release_date;
        case "length":
          return trackData.duration_ms;
        case "listens":
        case "popularity":
          return trackData.popularity + "%";
        case "is explicit":
          return trackData.explicit;
        default:
          return "";
      }
    }

    async getSongURL(args) {
      const embedData = await this._scrapeEmbed("track", args.URL);
      if (embedData) {
        return embedData.data.entity.audioPreview?.url || "";
      } else {
        console.warn("No track data!");
        return "";
      }
    }

    async playSongURL(args) {
      const url = await this.getSongURL(args);
      const buffer = await this._getTrackAudioBuffer(url);
      if (!buffer) {
        console.warn("Couldn't decode AudioBuffer");
        return;
      }

      const node = this.audioNode.context.createBufferSource();
      node.buffer = buffer;
      node.connect(this.gainNode);
      node.start(0);
      this.playerInstances.push(node);
    }

    stopAll() {
      for (let i = this.playerInstances.length - 1; i >= 0; i--) {
        try {
          this.playerInstances[i].disconnect(this.gainNode);
          this.playerInstances.pop();
        } catch {}
      }
    }

    async getArtistAtt(args) {
      const attribute = Cast.toString(args.THING);

      let artistData;
      let urlPath;
      switch (attribute) {
        case "biography":
        case "monthly listeners":
          artistData = await this._fetchFromSpotifyDB(
            "queryArtistOverview", "artist", args.URL
          );

          break;
        case "top 5 songs":
        case "top songs":
          urlPath = "/top-tracks";
          /* fallthrough */
        default:
          artistData = await this._fetchFromSpotify(
            "artist", args.URL, { urlPath }
          );
      }

      if (!artistData) {
        console.warn("No artist data!");
        return "";
      }

      switch (attribute) {
        case "artist":
        case "name":
          return artistData.name;
        case "avatar":
          return artistData.images[0].url;
        case "followers":
          return artistData.followers.total;
        case "popularity":
          return artistData.popularity + "%";
        case "genres": 
          return JSON.stringify(artistData.genres);
        case "biography":
          return artistData.artistUnion.profile.biography.text;
        case "monthly listeners":
          return artistData.artistUnion.stats.monthlyListeners;
        case "top 5 songs":
        case "top songs": {
          const popularTracks = artistData.tracks.map((track) => {
            setCache(`tracks/${track.id}`, track); // we can also cache these tracks.
            return track.id;
          });

          return JSON.stringify(popularTracks);
        }
        default:
          return "";
      }
    }

    async getPlaylistAtt(args) {
      const playlistData = await this._fetchFromSpotify("playlist", args.URL);
      if (!playlistData) {
        console.warn("No playlist data!");
        return "";
      }

      switch (Cast.toString(args.THING)) {
        case "name":
          return playlistData.name;
        case "creator":
          return playlistData.owner.display_name;
        case "cover":
          return playlistData.images[0].url;
        case "description":
          return playlistData.description;
        case "followers":
          return playlistData.followers.total;
        case "song count":
          return playlistData.tracks.total;
        case "top 30 songs":
        case "top songs": {
          const playlistItems = playlistData.tracks.items;
          const cleansedTracks = playlistItems.map(item => {
            setCache(`tracks/${item.track.id}`, item.track); // we can also cache these tracks.

            return {
              date_added: item.added_at,
              id: item.track.id
            };
          });

          return JSON.stringify(cleansedTracks);
        }
        default:
          return "";
      }
    }

    async getAlbumAtt(args) {
      const albumData = await this._fetchFromSpotify("album", args.URL);
      if (!albumData) {
        console.warn("No album data!");
        return "";
      }

      switch (Cast.toString(args.THING)) {
        case "name":
          return albumData.name;
        case "artist":
          return albumData.artists[0].name;
        case "artist ID":
          return albumData.artists[0].id;
        case "cover":
          return albumData.images[0].url;
        case "release date":
          return albumData.release_date;
        case "popularity":
          return albumData.popularity + "%";
        case "genres":
          return JSON.stringify(albumData.genres);
        case "song count":
          return albumData.total_tracks;
        case "top 30 songs":
        case "top songs": {
          const albumItems = albumData.tracks.items;
          const cleansedTracks = albumItems.map(track => {
            setCache(`tracks/${track.id}`, track); // we can also cache these tracks.

            return track.id;
          });

          return JSON.stringify(cleansedTracks);
        }
        default:
          return "";
      }
    }
  }

  Scratch.extensions.register(new SPspotify());
})(Scratch);
