// Name: Web & Device
// ID: webanddevice_InfinityLoopGaming
// Description: Interacts and gets data from websites, your device, and your network.
// By: InfinityLoopGaming <https://scratch.mit.edu/users/InfinityLoopGaming/>
(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) {
    throw new Error("This extension must be run unsandboxed!");
  }
  const paletteIcon =
    "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxMzMuNjY2NjciIGhlaWdodD0iMTMzLjY2NjY3IiB2aWV3Qm94PSIwLDAsMTMzLjY2NjY3LDEzMy42NjY2NyI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE3My41LC0xMTQuNSkiPjxnIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2lzUGFpbnRpbmdMYXllciZxdW90Ozp0cnVlfSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMTczLjUsMjQ4LjE2NjY3di0xMzMuNjY2NjdoMTMzLjY2NjY3djEzMy42NjY2N3oiIGZpbGw9Im5vbmUiIHN0cm9rZS13aWR0aD0iMCIvPjxnIGZpbGw9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMSI+PHBhdGggZD0iTTI4NC4zNDA2NiwyMDYuNjA0NGgtODguNjgxMzJjLTAuNDQzNDEsMCAtMC43MzkwMSwtMC4yOTU2IC0wLjczOTAxLC0wLjczOTAxdi01Ni4xNjQ4NGMwLC0wLjQ0MzQxIDAuMjk1NiwtMC43MzkwMSAwLjczOTAxLC0wLjczOTAxaDg4LjY4MTMyYzAuNDQzNDEsMCAwLjczOTAxLDAuMjk1NiAwLjczOTAxLDAuNzM5MDF2NTYuMTY0ODRjMCwwLjQ0MzQxIC0wLjI5NTYsMC43MzkwMSAtMC43MzkwMSwwLjczOTAxek0yODMuNjAxNjUsMTUwLjQzOTU2aC04Ny4yMDMzdjU0LjY4NjgxaDg3LjIwMzN6Ii8+PHBhdGggZD0iTTMwNS43NzE5OCwyMTMuMTA3Njl2MS42MjU4MmMwLDEuNzczNjMgLTEwLjkzNzM2LDMuNjk1MDUgLTExLjA4NTE2LDMuNjk1MDVoLTEwOS4zNzM2M2MtMC4xNDc4LDAgLTExLjA4NTE2LC0xLjkyMTQzIC0xMS4wODUxNiwtMy42OTUwNXYtMS42MjU4MmMwLC0xLjE4MjQyIDEuMDM0NjIsLTIuMjE3MDMgMi4yMTcwMywtMi4yMTcwM2gxMi41NjMxOXYtNjUuNjI0MThjMCwtMi4wNjkyMyAxLjYyNTgyLC0zLjY5NTA1IDMuNjk1MDUsLTMuNjk1MDVoOTQuNTkzNDFjMi4wNjkyMywwIDMuNjk1MDUsMS42MjU4MiAzLjY5NTA1LDMuNjk1MDV2NjUuNjI0MThoMTIuNTYzMTljMS4xODI0MiwwIDIuMjE3MDMsMS4wMzQ2MiAyLjIxNzAzLDIuMjE3MDN6TTE5MC40ODYyNiwyMTAuODkwNjZoMzYuMjExNTRjMC4yOTU2LDAgMjYuNDU2NTksMCAyNi42MDQ0LDBoMzYuMjExNTR2LTY1LjYyNDE4YzAsLTEuMTgyNDIgLTEuMDM0NjIsLTIuMjE3MDMgLTIuMjE3MDMsLTIuMjE3MDNoLTk0LjU5MzQxYy0xLjE4MjQyLDAgLTIuMjE3MDMsMS4wMzQ2MiAtMi4yMTcwMywyLjIxNzAzek0zMDQuMjkzOTYsMjEzLjEwNzY5YzAsLTAuNDQzNDEgLTAuMjk1NiwtMC43MzkwMSAtMC43MzkwMSwtMC43MzkwMWgtMTMuMTU0NGMwLDAuMTQ3OCAtMC4xNDc4LDAuMTQ3OCAtMC4yOTU2LDAuMTQ3OGMtMC4xNDc4LDAgLTAuMTQ3OCwtMC4xNDc4IC0wLjI5NTYsLTAuMTQ3OGgtMzYuMDYzNzRoLTI3Ljc4NjgxaC0zNS45MTU5M2MwLDAuMTQ3OCAtMC4xNDc4LDAuMTQ3OCAtMC4yOTU2LDAuMTQ3OGMtMC4xNDc4LDAgLTAuMTQ3OCwtMC4xNDc4IC0wLjI5NTYsLTAuMTQ3OGgtMTMuMDA2NTljLTAuNDQzNDEsMCAtMC43MzkwMSwwLjI5NTYgLTAuNzM5MDEsMC43MzkwMXYxLjMzMDIyYzEuMzMwMjIsMC43MzkwMSA4LjcyMDMzLDIuNTEyNjQgOS42MDcxNCwyLjUxMjY0aDEwOS4zNzM2M2MwLjg4NjgxLDAgOC4yNzY5MiwtMS43NzM2MyA5LjYwNzE0LC0yLjUxMjY0eiIvPjwvZz48cGF0aCBkPSJNMjE2LjQ2MjUsMTc4Ljc5NzVjMCwtMTIuOTc4IDEwLjU1OSwtMjMuNTM4IDIzLjUzOCwtMjMuNTM4YzAuMDYsMCAwLjExNywwLjAwNCAwLjE3NSwwLjAwNWMwLjAwNCwwIDAuMDEsMCAwLjAxNSwwYzEyLjg5MSwwLjEwMyAyMy4zNDcsMTAuNjE4IDIzLjM0NywyMy41MzNjMCwxMi45NDcgLTEwLjUwNSwyMy40ODIgLTIzLjQzOCwyMy41MzdjLTAuMDE1LDAgLTAuMDMsMC4wMDYgLTAuMDQ1LDAuMDA2YzAsMCAwLDAgLTAuMDAxLDBjLTAuMDAxLDAgLTAuMDAxLDAgLTAuMDAyLDBjLTAuMDA5LDAgLTAuMDE5LC0wLjAwNCAtMC4wMjksLTAuMDA0Yy0wLjAwNywwIC0wLjAxNCwwIC0wLjAyMiwwYy0xMi45NzksMCAtMjMuNTM4LC0xMC41NTkgLTIzLjUzOCwtMjMuNTM5ek0yNTguODg3NSwxNzEuMTcwNWMtMS43MjUsMC41NjggLTMuNDIsMS4wNDYgLTUuMDg1LDEuNDM5YzAuNDc5LDIuMDA1IDAuNzQ0LDQuMDc4IDAuNzQ0LDYuMTg4YzAsMi4wODQgLTAuMjU4LDQuMTI5IC0wLjcyNSw2LjEwOWMyLjI0OSwwLjUyMyAzLjk3OCwxLjA3IDUuMDg3LDEuNDYxYzAuOTQzLC0yLjM0MiAxLjQ2NiwtNC44OTUgMS40NjYsLTcuNTdjMCwtMi42OTYgLTAuNTMyLC01LjI3IC0xLjQ4NywtNy42Mjd6TTI1MC43MDU1LDE3My4yNTc1Yy0zLjIwNSwwLjU4IC02LjI2MywwLjg3MyAtOS4xMjIsMC45NTF2OS4xNjljMy40MzEsMC4wNzggNi41MTMsMC40MzMgOS4xMzgsMC44OTZjMC40MjUsLTEuNzczIDAuNjYsLTMuNjA3IDAuNjYsLTUuNDc2YzAsLTEuODkxIC0wLjI0LC0zLjc0NyAtMC42NzYsLTUuNTR6TTIzOC40MTg1LDE4Ni41OTU1Yy0yLjU0LDAuMDcyIC01LjIzNiwwLjMxMyAtOC4wNTIsMC43OTNjMS42MjUsNC4xMzcgNC4zOTksNy43NzQgOC4wNTIsMTAuNDM2ek0yNDkuNzQ5NSwxODcuMzY3NWMtMi4zNzQsLTAuMzk0IC01LjEyNSwtMC42OTkgLTguMTY2LC0wLjc3NXYxMS4zMDZjMy43MTIsLTIuNjczIDYuNTI3LC02LjM0NSA4LjE2NiwtMTAuNTMxek0yNDkuNzQyNSwxNzAuMjA4NWMtMS42NDEsLTQuMTc2IC00LjQ1NCwtNy44NDEgLTguMTU5LC0xMC41MTF2MTEuMzA3YzIuNTcsLTAuMDY4IDUuMzAzLC0wLjMwOCA4LjE1OSwtMC43OTZ6TTIzMC4zNTc1LDE3MC4yMjk1YzIuMzQ3LDAuMzg5IDUuMDYxLDAuNjkyIDguMDYxLDAuNzc0di0xMS4yMzJjLTMuNjYsMi42NjggLTYuNDM4LDYuMzEyIC04LjA2MSwxMC40NTh6TTIyOS4zODY1LDE3My4zMTg1Yy0wLjQyNiwxLjc3NSAtMC42NiwzLjYwOSAtMC42Niw1LjQ3OGMwLDEuODkgMC4yMzksMy43NDQgMC42NzQsNS41MzVjMy4xNjYsLTAuNTc0IDYuMTg4LC0wLjg2MSA5LjAxOCwtMC45NDN2LTkuMTc2Yy0zLjM5MSwtMC4wODMgLTYuNDMyLC0wLjQzNSAtOS4wMzIsLTAuODk0ek0yMjUuNTYyNSwxNzguNzk2NWMwLC0yLjA4NCAwLjI1NywtNC4xMjkgMC43MjQsLTYuMTA5Yy0yLjMxMywtMC41MzkgLTQuMDc5LC0xLjEwMSAtNS4xODEsLTEuNDk0Yy0wLjk1MSwyLjM1MiAtMS40NzgsNC45MTYgLTEuNDc4LDcuNjA0YzAsMi43MDcgMC41MzQsNS4yODkgMS40OTcsNy42NTRjMS43NTYsLTAuNTg0IDMuNDg1LC0xLjA3MyA1LjE4LC0xLjQ3M2MtMC40NzksLTIuMDAzIC0wLjc0MiwtNC4wNzIgLTAuNzQyLC02LjE4MnpNMjM0LjAxNDUsMTk4LjI3MTVjLTMuMDM2LC0yLjg1IC01LjM1OCwtNi4zNjMgLTYuNzkyLC0xMC4yNDZjLTEuNTMsMC4zNTEgLTMuMDg3LDAuNzczIC00LjY2NywxLjI4M2MyLjU2NSw0LjI0MyA2LjYzMiw3LjQ3NyAxMS40NTksOC45NjN6TTI1Ny40ODU1LDE4OS4yNDE1Yy0xLjA1NCwtMC4zNTIgLTIuNjEsLTAuODEzIC00LjU4NCwtMS4yNThjLTEuNDIzLDMuODc3IC0zLjczMSw3LjM4NiAtNi43NTIsMTAuMjM4YzQuNzgyLC0xLjUxOCA4LjgwMywtNC43NTQgMTEuMzM2LC04Ljk4ek0yNDYuMTUwNSwxNTkuMzc1NWMzLjAwOSwyLjg0MiA1LjMxMSw2LjMzNyA2LjczNiwxMC4xOTdjMS41MDIsLTAuMzQ1IDMuMDI5LC0wLjc1OCA0LjU3OCwtMS4yNTVjLTIuNTM1LC00LjIwOCAtNi41NDgsLTcuNDMgLTExLjMxNCwtOC45NDJ6TTIyMi41MzE1LDE2OC4zMjc1YzEuMDU0LDAuMzUyIDIuNjQ0LDAuODMgNC42NzQsMS4yODdjMS40MzIsLTMuOTAxIDMuNzYxLC03LjQzIDYuODEsLTEwLjI5MWMtNC44NDMsMS40OTIgLTguOTIsNC43NDIgLTExLjQ4NCw5LjAwNHoiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMSIvPjwvZz48L2c+PC9zdmc+";
  class WebAndDevice {
    getInfo() {
      return {
        id: "webanddevice_InfinityLoopGaming",
        name: "Web & Device",
        color1: "#348ceb",
        color2: "#5b95d4",
        color3: "#84a3c4",
        menuIconURI: paletteIcon,
        blocks: [
          {
            opcode: "setTitle",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set page title to [title]"),
            arguments: {
              title: {
                type: Scratch.ArgumentType.STRING,
              },
            },
          },
          {
            opcode: "pageTitle",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("page title"),
          },
          "---",
          {
            opcode: "enterFullscreen",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("enter fullscreen"),
          },
          {
            opcode: "exitFullscreen",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("exit fullscreen"),
          },
          {
            opcode: "isFullscreen",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is page fullscreen?"),
          },
          "---",
          {
            opcode: "connected_to_internet",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "connected to internet?",
          },
          {
            opcode: "networktype",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("network type"),
          },
          {
            opcode: "networkgeneration",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("network generation"),
          },
          "---",
          {
            opcode: "open_url",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("open url [url] in new tab"),
            arguments: {
              url: {
                type: Scratch.ArgumentType.STRING,
              },
            },
          },
          {
            opcode: "redirect_url",
            blockType: Scratch.BlockType.COMMAND,
            text: "redirect to url [url]",
            arguments: {
              url: {
                type: Scratch.ArgumentType.STRING,
              },
            },
          },
          {
            opcode: "currenturl",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("current link"),
          },
          {
            opcode: "getdatafromurl",
            blockType: Scratch.BlockType.REPORTER,
            text: "get data from url [url]",
            arguments: {
              url: {
                type: Scratch.ArgumentType.STRING,
              },
            },
          },
          "---",
          {
            opcode: "browser",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("browser"),
          },
          {
            opcode: "operatingsystem",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("operating system"),
          },
          {
            opcode: "devicememory",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("device memory"),
          },
          "---",
          {
            opcode: "screenWidth",
            text: "screen width",
            blockType: Scratch.BlockType.REPORTER,
          },
          {
            opcode: "screenHeight",
            text: "screen height",
            blockType: Scratch.BlockType.REPORTER,
          },
          "---",
          {
            opcode: "set_clipboard",
            blockType: Scratch.BlockType.COMMAND,
            text: "Set clipboard to [text]",
            arguments: {
              text: {
                type: Scratch.ArgumentType.STRING,
              },
            },
          },

          {
            opcode: "get_clipboard",
            blockType: Scratch.BlockType.REPORTER,
            text: "get clipboard",
          },
        ],
      };
    }

    setTitle(args) {
      document.title = args.title;
    }
    pageTitle() {
      return document.title;
    }
    enterFullscreen() {
      if (document.fullscreenElement === null) {
        document.documentElement.requestFullscreen();
      }
    }
    exitFullscreen() {
      if (document.fullscreenElement !== null) {
        document.exitFullscreen();
      }
    }
    isFullscreen() {
      return document.fullscreenElement !== null;
    }
    networktype() {
      try {
        switch (navigator.connection.type) {
          case "bluetooth":
            return "bluetooth";
          case "cellular":
            return "cellular";
          case "ethernet":
            return "ethernet";
          case "wifi":
            return "wi-fi";
          case "wimax":
            return "wimax";
          default:
            return "";
        }
      } catch (err) {
        return "";
      }
    }
    networkgeneration() {
      try {
        switch (navigator.connection.effectiveType) {
          case "slow-2g":
          case "2g":
            return "2g";
          case "3g":
            return "3g";
          case "4g":
            return "4g";
          default:
            return "";
        }
      } catch (err) {
        return "";
      }
    }
    currenturl() {
      try {
        return document.URL || "";
      } catch (err) {
        return "";
      }
    }
    browser() {
      try {
        let has = (input) => navigator.userAgent.includes(input);
        if (has("Firefox")) return "firefox";
        if (has("SamsungBrowser")) return "samsung internet";
        if ((has("Opera") || has("OPR")) && has("GX")) return "opera gx";
        if (has("Opera") || has("OPR")) return "opera";
        if (has("Trident")) return "internet explorer";
        if (has("Edge")) return "legacy";
        if (has("Edg")) return "edge";
        if (has("YaBrowser") || has("YaSearchBrowser")) return "yandex";
        if (has("Miui")) return "mi browser";
        if (has("UBrowser")) return "uc browser";
        if (has("Chrome")) return "chromium";
        if (has("Safari")) return "safari";
        return "";
      } catch (err) {
        return "";
      }
    }
    operatingsystem() {
      const userAgent = navigator.userAgent;
      if (userAgent.includes("Windows")) {
        return "Windows";
      } else if (userAgent.includes("Android")) {
        return "Android";
      } else if (
        userAgent.includes("iPhone") ||
        userAgent.includes("iPod") ||
        userAgent.includes("iPad")
      ) {
        return "iOS";
      } else if (userAgent.includes("Linux")) {
        return "Linux";
      } else if (userAgent.includes("CrOS")) {
        return "ChromeOS";
      } else if (userAgent.includes("Mac OS")) {
        return "macOS";
      }
      return "Other";
    }
    devicememory() {
      // @ts-expect-error
      if (navigator.deviceMemory === undefined) {
        return "Unsupported";
      } else {
        // @ts-expect-error
        return navigator.deviceMemory;
      }
    }
    open_url({ url }) {
      Scratch.openWindow(url);
    }
    redirect_url({ url }) {
      Scratch.redirect(url);
    }
    connected_to_internet() {
      try {
        return navigator.onLine;
      } catch (err) {
        return false;
      }
    }
    screenWidth() {
      return window.screen.width;
    }
    screenHeight() {
      return window.screen.height;
    }
    getdatafromurl(args) {
      return Scratch.fetch(args.URL)
        .then((r) => r.text())
        .catch(() => "");
    }
    set_clipboard(args) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(args.text);
      }
    }

    get_clipboard() {
      if (navigator.clipboard && navigator.clipboard.readText) {
        return Scratch.canReadClipboard().then((allowed) => {
          if (allowed) {
            return navigator.clipboard.readText();
          }
          return "";
        });
      }
      return "";
    }
  }
  Scratch.extensions.register(new WebAndDevice());
})(Scratch);

//Credits to Network, Navigator, Fetch, and Window Controls extensions for help with scripts.
