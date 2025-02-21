// Name: Geolocation
// ID: samuelloufgeolocation
// Description: Get the user's geolocation.
// By: SamuelLouf <https://scratch.mit.edu/users/samuellouf/>
// License: MPL-2.0

(function (Scratch) {
  "use strict";

  function getGeolocation(
    options = { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
  ) {
    return new Promise((resolve) => {
      function success(pos) {
        resolve({
          success: true,
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        });
      }

      function error(err) {
        resolve({
          success: false,
          error: {
            code: err.code,
            message: err.message,
          },
        });
      }

      navigator.geolocation.getCurrentPosition(success, error, options);
    });
  }

  const icon =
    "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxMTAuODAyNSIgaGVpZ2h0PSIxMTAuNDAyNDkiIHZpZXdCb3g9IjAsMCwxMTAuODAyNSwxMTAuNDAyNDkiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xODQuNTk4NzUsLTEyNC43OTg3NSkiPjxnIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2lzUGFpbnRpbmdMYXllciZxdW90Ozp0cnVlfSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0xODQuNTk4NzUsMjM1LjIwMTI1di0xMTAuNDAyNDloMTEwLjgwMjV2MTEwLjQwMjQ5eiIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMCIvPjxwYXRoIGQ9Ik0yNDEuNzc3MTQsMjE2LjQwNzcyYy0wLjU0NTUyLDAuNDA5NjQgLTEuMjg5MjEsMC40MzM2MyAtMS44NiwwLjA2Yy02LjE0MzY2LC0zLjg2ODY0IC0xMS41OTg1OSwtOC43MzU1IC0xNi4xNCwtMTQuNGMtNS41NTkxLC02Ljc1NTkyIC05LjI5NzYsLTE0LjgyMTU4IC0xMC44NiwtMjMuNDNjLTEuMjksLTcuOTkgLTAuMDYsLTE1LjY3IDMuOTQsLTIxLjkyYzEuNjE0OTMsLTIuNTM4ODEgMy42NDI4NywtNC43ODk4MyA2LC02LjY2YzUuMTU3NjksLTQuMzA2MjUgMTEuNjQxNSwtNi43MDQxMyAxOC4zNiwtNi43OWM2LjUwNTg5LDAuMTA0OTYgMTIuNzM1OTYsMi42NDU1MSAxNy40Niw3LjEyYzEuODE0MzUsMS42NjMyMiAzLjM4MzM1LDMuNTc1NjQgNC42Niw1LjY4YzQuMjcsNyA1LjE5LDE2IDMuMzEsMjUuMTJjLTMuMTgyMzQsMTQuNjIxNzcgLTEyLjE1NTQ4LDI3LjMyOTIyIC0yNC44NywzNS4yMnpNMjQwLjAwNzE0LDE1Ny40Nzc3MWM3LjU3NzM1LDAgMTMuNzIsNi4xNDI2NSAxMy43MiwxMy43MmMwLDcuNTc3MzUgLTYuMTQyNjUsMTMuNzIgLTEzLjcyLDEzLjcyYy03LjU3NzM1LDAgLTEzLjcyLC02LjE0MjY1IC0xMy43MiwtMTMuNzJjMCwtNy41NzczNSA2LjE0MjY1LC0xMy43MiAxMy43MiwtMTMuNzJ6IiBmaWxsPSIjMDM2ZTE1IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZT0iIzAwYTExYiIgc3Ryb2tlLXdpZHRoPSIxLjUiLz48L2c+PC9nPjwvc3ZnPjwhLS1yb3RhdGlvbkNlbnRlcjo1NS40MDEyNTAwMDAwMDAwMDU6NTUuMjAxMjQ1LS0+";

  class Geolocation {
    constructor() {
      this.options = { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 };
    }

    getInfo() {
      return {
        id: "samuelloufgeolocation",
        name: Scratch.translate("Geolocation"),
        color1: "#036e15",
        color2: "#00A11B",
        menuIconURI: icon,
        blocks: [
          {
            opcode: "isSupported",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is geolocation supported by this device?"),
          },
          {
            opcode: "isAllowed",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is geolocation allowed?"),
          },
          "---",
          {
            opcode: "getCurrent",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("get [WHAT]"),
            arguments: {
              WHAT: {
                type: Scratch.ArgumentType.STRING,
                menu: "getCurrent_menu",
              },
            },
          },
          "---",
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Options"),
          },
          {
            opcode: "setTimeoutTo",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set timeout to [SECONDS] seconds"),
            arguments: {
              SECONDS: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 5,
              },
            },
          },
          {
            opcode: "addToTimeout",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("add [SECONDS] seconds to timeout"),
            arguments: {
              SECONDS: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
            },
          },
          {
            opcode: "getTimeout",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("get timeout"),
          },
          {
            opcode: "setAccuracy",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set accuracy to [ACCURACY]"),
            arguments: {
              ACCURACY: {
                type: Scratch.ArgumentType.STRING,
                menu: "accuracy",
              },
            },
          },
          {
            opcode: "isHighAccuracy",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is the accuracy high?"),
          },
        ],
        menus: {
          coordinates: {
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate("latitude"),
                value: "latitude",
              },
              {
                text: Scratch.translate("longitude"),
                value: "longitude",
              },
              {
                text: Scratch.translate("accuracy"),
                value: "accuracy",
              },
            ],
          },
          accuracy: {
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate("high"),
                value: "high",
              },
              {
                text: Scratch.translate("low"),
                value: "low",
              },
            ],
          },
        },
      };
    }

    async getCurrent(args) {
      if (!(await this.isAllowed())) return "";
      var coordinates = await getGeolocation();
      if (coordinates.success == true) {
        return coordinates[args.WHAT];
      } else {
        return "";
      }
    }

    async isAllowed() {
      return await Scratch.canGeolocate();
    }

    isSupported() {
      return !!navigator.geolocation;
    }

    setTimeoutTo(args) {
      this.options.timeout = Number(args.SECONDS) * 1000;
    }

    addToTimeout(args) {
      this.options.timeout += Number(args.SECONDS) * 1000;
    }

    getTimeout() {
      return this.options.timeout / 1000;
    }

    setAccuracy(args) {
      this.options.enableHighAccuracy = args.ACCURACY === "high";
    }

    isHighAccuracy() {
      return this.options.enableHighAccuracy;
    }
  }
  Scratch.extensions.register(new Geolocation());
})(Scratch);
