((Scratch) => {
  "use strict";

  const icon =
    "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIyMjUuMzU0OCIgaGVpZ2h0PSIyMjUuMzU0OCIgdmlld0JveD0iMCwwLDIyNS4zNTQ4LDIyNS4zNTQ4Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTI3LjMyMjc1LC02Ny4zMjI2KSI+PGcgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aXNQYWludGluZ0xheWVyJnF1b3Q7OnRydWV9IiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0xMjcuMzIyNzYsMTgwYzAsLTYyLjIzMDAxIDUwLjQ0NzM5LC0xMTIuNjc3NCAxMTIuNjc3NCwtMTEyLjY3NzRjNjIuMjMwMDEsMCAxMTIuNjc3NCw1MC40NDczOSAxMTIuNjc3NCwxMTIuNjc3NGMwLDYyLjIzMDAxIC01MC40NDczOSwxMTIuNjc3NCAtMTEyLjY3NzQsMTEyLjY3NzRjLTYyLjIzMDAxLDAgLTExMi42Nzc0LC01MC40NDczOSAtMTEyLjY3NzQsLTExMi42Nzc0eiIgZmlsbD0iIzgzY2M3MCIgc3Ryb2tlLXdpZHRoPSIwIi8+PGcgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxIj48cGF0aCBkPSJNMjYxLjM2MjM1LDE0Ni42MjM1OWwtNS4xNTA5Nyw1LjI3NDYybC0xMy4xODU1MSwtMTIuMjM5ODlsMTkuMjM2ODksLTE5LjQ5NTg5YzEwLjU5MTQ3LC0xMC41OTE0NyAyNy43NTg0LC0xMC41OTE0NyAzOC4zNDExMiwwbDEyLjc4MDM4LDEyLjc4MDM4YzEwLjU5MTQ3LDEwLjU4MjcxIDEwLjU5MTQ3LDI3Ljc0OTY1IDAsMzguMzQxMTJsLTM4LjM0MTEyLDM4LjM0MTEyYy0xMC41OTE0NywxMC41ODY5NSAtMjcuNzQ5NjUsMTAuNTg2OTUgLTM4LjM0MTEyLDBsLTEyLjc4MDM3LC0xMi43ODAzN2wtMTIuNjczNzgsLTEzLjIyNjEybDEyLjI2MzA0LC0xMi40MzNsMjUuOTcxNDksMjUuNjU5MTJjMy41MjE3NCwzLjUyMTc0IDkuMjU4NjQsMy41MjE3NCAxMi43ODAzOCwwbDM4LjM0MTEyLC0zOC4zNDExMmMzLjUzMDQ5LC0zLjUzMDQ5IDMuNTMwNDksLTkuMjU4NjQgMCwtMTIuNzgwMzhsLTEyLjc4MDM3LC0xMi43ODAzN2MtMy41MjE3NCwtMy41MjE3MyAtOS4yNDk4OCwtMy41MzA0OSAtMTIuNzgwMzgsMGwtMTMuNjgwNzksMTMuNjgwNzl6IiBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpbmRleCZxdW90OzpudWxsfSIvPjxwYXRoIGQ9Ik0yMTguNjM3NzQsMjEzLjM3NjRsNS4xNTA5NywtNS4yNzQ2MmwxMy4xODU1MSwxMi4yMzk4OWwtMTkuMjM2ODksMTkuNDk1ODljLTEwLjU5MTQ3LDEwLjU5MTQ3IC0yNy43NTg0LDEwLjU5MTQ3IC0zOC4zNDExMiwwbC0xMi43ODAzOCwtMTIuNzgwMzhjLTEwLjU5MTQ3LC0xMC41ODI3MSAtMTAuNTkxNDcsLTI3Ljc0OTY1IDAsLTM4LjM0MTExbDM4LjM0MTEyLC0zOC4zNDExMmMxMC41OTE0NywtMTAuNTg2OTUgMjcuNzQ5NjUsLTEwLjU4Njk1IDM4LjM0MTEyLDBsMTIuNzgwMzcsMTIuNzgwMzdsMTIuNjczNzgsMTMuMjI2MTJsLTEyLjI2MzA1LDEyLjQzM2wtMjUuOTcxNDgsLTI1LjY1OTEyYy0zLjUyMTc0LC0zLjUyMTc0IC05LjI1ODY0LC0zLjUyMTc0IC0xMi43ODAzOCwwbC0zOC4zNDExMiwzOC4zNDExMmMtMy41MzA0OSwzLjUzMDQ5IC0zLjUzMDQ5LDkuMjU4NjQgMCwxMi43ODAzOGwxMi43ODAzNywxMi43ODAzN2MzLjUyMTc0LDMuNTIxNzMgOS4yNDk4OCwzLjUzMDQ5IDEyLjc4MDM4LDBsMTMuNjgwNzksLTEzLjY4MDc5eiIgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aW5kZXgmcXVvdDs6bnVsbH0iLz48L2c+PC9nPjwvZz48L3N2Zz48IS0tcm90YXRpb25DZW50ZXI6MTEyLjY3NzI0NToxMTIuNjc3NDA1LS0+";

  class Network {
    getInfo() {
      return {
        id: "truefantomnetworkm",
        name: Scratch.translate("Network"),

        color1: "#83cc70",
        color2: "#76b865",
        color3: "#69a35a",

        menuIconURI: icon,

        blocks: [
          {
            opcode: "connected_to_internet_block",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("connected to internet?"),
          },
          "---",
          {
            opcode: "current_url_block",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("current url"),
          },
          "---",
          {
            opcode: "network_type_block",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("network type"),
          },
          {
            opcode: "network_generation_block",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("network generation"),
          },
          "---",
          {
            opcode: "downlink_speed_block",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("downlink speed in mb/s"),
          },
          {
            opcode: "downlink_max_speed_block",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("downlink max speed in mb/s"),
          },
          {
            opcode: "rtt_block",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("rtt in ms"),
          },
        ],
      };
    }

    connected_to_internet_block() {
      try {
        return navigator.onLine;
      } catch (err) {
        return false;
      }
    }
    current_url_block() {
      try {
        return document.URL || "";
      } catch (err) {
        return "";
      }
    }
    network_type_block() {
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
    network_generation_block() {
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
    downlink_speed_block() {
      try {
        return navigator.connection.downlink || "";
      } catch (err) {
        return "";
      }
    }
    downlink_max_speed_block() {
      try {
        return navigator.connection.downlinkMax || "";
      } catch (err) {
        return "";
      }
    }
    rtt_block() {
      try {
        return navigator.connection.rtt || "";
      } catch (err) {
        return "";
      }
    }
  }

  Scratch.extensions.register(new Network());
})(Scratch);
