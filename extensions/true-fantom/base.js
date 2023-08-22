// Name: Base
// ID: truefantombase
// Description: Convert numbers between bases.
// By: TrueFantom <https://scratch.mit.edu/users/TrueFantom/>

((Scratch) => {
  "use strict";

  const icon =
    "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIyMjUuMzU0OCIgaGVpZ2h0PSIyMjUuMzU0OCIgdmlld0JveD0iMCwwLDIyNS4zNTQ4LDIyNS4zNTQ4Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTg3LjMyMjk0LC0zNy4zMjI1OSkiPjxnIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2lzUGFpbnRpbmdMYXllciZxdW90Ozp0cnVlfSIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTE4Ny4zMjI5NCwxNTBjMCwtNjIuMjMwMDEgNTAuNDQ3MzksLTExMi42Nzc0IDExMi42Nzc0LC0xMTIuNjc3NGM2Mi4yMzAwMSwwIDExMi42Nzc0LDUwLjQ0NzM5IDExMi42Nzc0LDExMi42Nzc0YzAsNjIuMjMwMDEgLTUwLjQ0NzM5LDExMi42Nzc0IC0xMTIuNjc3NCwxMTIuNjc3NGMtNjIuMjMwMDEsMCAtMTEyLjY3NzQsLTUwLjQ0NzM5IC0xMTIuNjc3NCwtMTEyLjY3NzR6IiBmaWxsPSIjZTIwMGNhIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIwIiBzdHJva2UtbGluZWNhcD0iYnV0dCIvPjxnIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSI1Ij48cGF0aCBkPSJNMzI1LjA1LDE3My41MDAyMXYxMi43aC00OS45di0xMC41bDE3LjksLTE4LjFjMy42LC0zLjczMzM0IDYuNSwtNi44NSA4LjcsLTkuMzVjMC43NDQyOSwtMC44NDIxNiAxLjQ1Nzc2LC0xLjcxMTA2IDIuMTM5LC0yLjYwNWMxLjEzMzMzLC0xLjQ5NDY2IDIuMDIwMzMsLTIuODkzIDIuNjYxLC00LjE5NWMxLC0yLjAzMzMzIDEuNSwtNC4yMTY2NyAxLjUsLTYuNTVjMCwtMi44NjY2NyAtMC43ODMzMywtNSAtMi4zNSwtNi40Yy0wLjk3ODg1LC0wLjg2MTMzIC0yLjE1NDg0LC0xLjQ2ODIyIC0zLjQyNCwtMS43NjdjLTAuODA0NjYsLTAuMjAxMzQgLTEuNjgxLC0wLjMxMTY3IC0yLjYyOSwtMC4zMzFjLTAuMDk4OTksLTAuMDAxNjUgLTAuMTk4LC0wLjAwMjMyIC0wLjI5NywtMC4wMDJjLTIuNjg1OTQsMC4wMDg2MSAtNS4zMzU5NSwwLjYxNzgyIC03Ljc1NiwxLjc4M2MtMC4wODE1OCwwLjAzODQ3IC0wLjE2MjkyLDAuMDc3NDcgLTAuMjQ0LDAuMTE3Yy0xLjI5MDA4LDAuNjM0MDggLTIuNTQwMzksMS4zNDYwNyAtMy43NDQsMi4xMzJjLTEuMjIxMzQsMC43OTIgLTIuNDY5NjYsMS42OTEzNCAtMy43NDUsMi42OThjLTAuMjM4NDMsMC4xODgyMSAtMC40NzU0MywwLjM3ODIxIC0wLjcxMSwwLjU3bC04LjIsLTkuN2MyLjA2NjY2LC0xLjggNC4yNSwtMy40NjY2NyA2LjU1LC01YzEuNDk5MTksLTAuOTkxNTMgMy4wODY1OCwtMS44NDI3OSA0Ljc0MiwtMi41NDNjMS4wNjYxNywtMC40NTM5NSAyLjE1MzQxLC0wLjg1Njc1IDMuMjU4LC0xLjIwN2MzLjAzMzMzLC0wLjk2NjY3IDYuNjgzMzQsLTEuNDUgMTAuOTUsLTEuNDVjMS45MjgwNywtMC4wMDk4MyAzLjg1MzE0LDAuMTUzNDkgNS43NTIsMC40ODhjMi4yODY2NywwLjQxNDY2IDQuMzcxMzMsMS4wOTQzMyA2LjI1NCwyLjAzOWMwLjAxNDY4LDAuMDA3NjUgMC4wMjkzNSwwLjAxNTMyIDAuMDQ0LDAuMDIzYzEuODM0NjIsMC45MDk4IDMuNTIzNzYsMi4wODczNCA1LjAxMiwzLjQ5NGMxLjA2NDkxLDEuMDE3MjUgMi4wMDEyMiwyLjE2MTA5IDIuNzg4LDMuNDA2YzEuODMzMzMsMi45IDIuNzUsNi4xODMzNCAyLjc1LDkuODVjMC4wMTUwNCwyLjQ3MzU4IC0wLjMyNTc4LDQuOTM2NDYgLTEuMDEyLDcuMzEzYy0wLjM1MTQxLDEuMTk2NDYgLTAuNzk4ODYsMi4zNjI1OCAtMS4zMzgsMy40ODdjLTAuOTMzMywxLjkyMzY5IC0yLjA0MDU4LDMuNzU4IC0zLjMwOCw1LjQ4Yy0xLjA4MDI3LDEuNDczOSAtMi4yNDYyOSwyLjg4MyAtMy40OTIsNC4yMmMtMS4zODY3NCwxLjQ5MTY5IC0yLjgwMzAyLDIuOTU1NjUgLTQuMjQ4LDQuMzkxYy0xLjQ3OTMzLDEuNDczMzMgLTMuMDY4MzMsMy4wMDU2NyAtNC43NjcsNC41OTdjLTAuNTc1OTcsMC41Mzk4NyAtMS4xNTQzMSwxLjA3NzIxIC0xLjczNSwxLjYxMmwtOS4yLDguNnYwLjd6IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxnIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiPjxwYXRoIGQ9Ik0yMzYuNzUsODYuNzVoMTI2LjV2MTIuNTk3OTJoLTEyNi41eiIvPjxwYXRoIGQ9Ik0yNDkuMzQ3OTIsODYuNzV2MTI2LjVoLTEyLjU5Nzkydi0xMjYuNXoiLz48L2c+PC9nPjwvZz48L2c+PC9zdmc+PCEtLXJvdGF0aW9uQ2VudGVyOjExMi42NzcwNjAwMDAwMDAwMToxMTIuNjc3NDA1LS0+";

  const cast = Scratch.Cast;

  const bases = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
    "32",
    "33",
    "34",
    "35",
    "36",
  ];
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  class ScratchBase {
    getInfo() {
      return {
        id: "truefantombase",
        name: "Base",

        color1: "#e200ca",

        menuIconURI: icon,

        blocks: [
          {
            opcode: "is_base_block",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is base [B] [A] ?",
            arguments: {
              A: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "10",
              },
              B: {
                type: Scratch.ArgumentType.STRING,
                menu: "base_menu",
                defaultValue: "10",
              },
            },
          },
          {
            opcode: "base_block",
            blockType: Scratch.BlockType.REPORTER,
            text: "[A] from base [B] to base [C]",
            arguments: {
              A: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "10",
              },
              B: {
                type: Scratch.ArgumentType.STRING,
                menu: "base_menu",
                defaultValue: "10",
              },
              C: {
                type: Scratch.ArgumentType.STRING,
                menu: "base_menu",
              },
            },
          },
        ],
        menus: {
          base_menu: {
            acceptReporters: true,
            items: bases,
          },
        },
      };
    }

    is_base_block({ A, B }) {
      if (bases.includes(cast.toString(B))) {
        return new RegExp(
          "^[" + chars.substring(0, cast.toNumber(B)) + "]+$"
        ).test(cast.toString(A));
      }
      return false;
    }
    base_block({ A, B, C }) {
      if (
        bases.includes(cast.toString(B)) &&
        bases.includes(cast.toString(C))
      ) {
        if (
          new RegExp("^[" + chars.substring(0, cast.toNumber(B)) + "]+$").test(
            cast.toString(A)
          )
        ) {
          return (
            parseInt(cast.toString(A), cast.toNumber(B))
              .toString(cast.toNumber(C))
              .toUpperCase() || "0"
          ); // Return string zero because toString() function always return strings
        }
      }
      return "0"; // Return string zero because toString() function always return strings
    }
  }

  Scratch.extensions.register(new ScratchBase());
})(Scratch);
