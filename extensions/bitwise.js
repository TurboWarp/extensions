// Name: Bitwise
// ID: Bitwise
// Description: Blocks that operate on the binary representation of numbers in computers.
// By: TrueFantom <https://scratch.mit.edu/users/TrueFantom/>

((Scratch) => {
  "use strict";

  const icon =
    "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIyMjUuMzU0ODEiIGhlaWdodD0iMjI1LjM1NDgiIHZpZXdCb3g9IjAsMCwyMjUuMzU0ODEsMjI1LjM1NDgiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xNjIuMzIyODcsLTM3LjMyMjY1KSI+PGcgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aXNQYWludGluZ0xheWVyJnF1b3Q7OnRydWV9IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMTYyLjMyMjg4LDE1MC4wMDAwNWMwLC02Mi4yMzAwMSA1MC40NDczOSwtMTEyLjY3NzQgMTEyLjY3NzQsLTExMi42Nzc0YzYyLjIzMDAxLDAgMTEyLjY3NzQsNTAuNDQ3MzkgMTEyLjY3NzQsMTEyLjY3NzRjMCw2Mi4yMzAwMSAtNTAuNDQ3MzksMTEyLjY3NzQgLTExMi42Nzc0LDExMi42Nzc0Yy02Mi4yMzAwMSwwIC0xMTIuNjc3NCwtNTAuNDQ3MzkgLTExMi42Nzc0LC0xMTIuNjc3NHoiIGZpbGw9IiNlNjI4MmEiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjAiIHN0cm9rZS1saW5lY2FwPSJidXR0Ii8+PHBhdGggZD0iTTE2Mi4zMjI4NywxNTAuMDAwMDVjMCwtNjIuMjMwMDEgNTAuNDQ3MzksLTExMi42Nzc0IDExMi42Nzc0LC0xMTIuNjc3NGM2Mi4yMzAwMSwwIDExMi42Nzc0LDUwLjQ0NzM5IDExMi42Nzc0LDExMi42Nzc0YzAsNjIuMjMwMDEgLTUwLjQ0NzM5LDExMi42Nzc0IC0xMTIuNjc3NCwxMTIuNjc3NGMtNjIuMjMwMDEsMCAtMTEyLjY3NzQsLTUwLjQ0NzM5IC0xMTIuNjc3NCwtMTEyLjY3NzR6IiBmaWxsPSIjMTdjZGU2IiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIwIiBzdHJva2UtbGluZWNhcD0iYnV0dCIvPjxwYXRoIGQ9Ik0yNDEuNjc3NzgsMTQ3LjA4OTUzdjAuNDU5NjJjMi42OTA2NCwwLjI5NzU3IDUuMzUzMTYsMC44MDk5MSA3Ljk2MjEsMS41MzIwNmMyLjc5MzQ0LDAuNzkxNTUgNS4yODQ1NywxLjgxNjUxIDcuNDczMzcsMy4wNzQ4NGMxLjY0NiwwLjkzNzAxIDMuMTc1ODMsMi4wNjQ3MiA0LjU1Nzg3LDMuMzU5OGMzLjUyOTU0LDMuMzQzOTcgNS44MTE1Miw3Ljc5MjgzIDYuNDY4MzQsMTIuNjEwMzZjMC4yMzgsMS41NTU5IDAuMzU0NzksMy4xMjc5MSAwLjM0OTMxLDQuNzAxODhjMC4wMzMzNCw0LjAxNjE1IC0wLjY2NDkzLDguMDA0ODEgLTIuMDYwNjIsMTEuNzcwNzljLTAuNjk4NjIsMS44NTAxMSAtMS41NzMzNSwzLjYyODgzIC0yLjYxMjE2LDUuMzExNjRjLTIuMTA2MjIsMy4zNjc4NyAtNC44OTQ3Miw2LjI1NzEgLTguMTg1NzgsOC40ODE0NmMtMS45NjE1NywxLjM0MzYgLTQuMDQyMTIsMi41MDQ2NSAtNi4yMTU1NSwzLjQ2ODU4Yy01LjA1ODg1LDIuMjY5NSAtMTEuMjUxNDIsMy42NTQ0NiAtMTguNTc3NzEsNC4xNTQ5NGMtMi4xNTQxMiwwLjE0MzgxIC00LjMxMjUxLDAuMjE0MzMgLTYuNDcxNDEsMC4yMTE0MmMtMTEuODQ3OTEsMCAtMjIuMzY4MDIsLTEuOTkxNjcgLTMxLjU2MDM2LC01Ljk3NTAydi0xOS42MTAzMmM0LjY5ODMxLDIuMzQ5MTUgOS42MjY0Miw0LjEzNjU1IDE0Ljc4NDM0LDUuMzYyMmM1LjE1NzkzLDEuMjI1NjUgOS45MzI4MywxLjgzODQ3IDE0LjMyNDczLDEuODM4NDdjOC4yNzMxLDAgMTQuMDY5MzksLTEuNDI5OTEgMTcuMzg4ODQsLTQuMjg5NzZjMi40NzQyNCwtMi4xNDA1NyA0LjExOTE2LC01LjA4MTI2IDQuNjQ4MjYsLTguMzA5ODdjMC4yMjYzMywtMS4yNTE2NCAwLjMzNzEsLTIuNTIxNDQgMC4zMzA5MiwtMy43OTMzN2MwLC0zLjA2NDExIC0wLjc2NjAzLC01LjY0MzA3IC0yLjI5ODA4LC03LjczNjg4Yy0wLjY4ODk0LC0wLjkxOSAtMS41MzI5OSwtMS43MTA3MSAtMi40OTQxOSwtMi4zMzk0NWMtMC44MTcwOSwtMC41NDk1IC0xLjc1ODgsLTEuMDQzODQgLTIuODI1MTEsLTEuNDgzMDNjLTAuODg5MDUsLTAuMzYyMDcgLTEuNzk4NjIsLTAuNjcxNTggLTIuNzI0LC0wLjkyNjg5Yy0xLjMyNjEsLTAuMzYyNjUgLTIuNjcyNiwtMC42NDYwOCAtNC4wMzIzNywtMC44NDg3NmMtMi44MTg5OCwtMC40MzYxMiAtNi4xNjM5OCwtMC42ODQ4MyAtMTAuMDM0OTcsLTAuNzQ2MTFjLTAuNjQ3NTEsLTAuMDA5NzMgLTEuMjk1MDYsLTAuMDE0MzIgLTEuOTQyNjUsLTAuMDEzNzloLTguMjczMXYtMTcuNzcxODVoOC40MjYzMWM2Ljc0MTA1LDAgMTEuODczNDQsLTAuNjM4MzUgMTUuMzk3MTcsLTEuOTE1MDdjMS4wMTMxOSwtMC4zNjEwNCAxLjk5NjY4LC0wLjgwMDU1IDIuOTQxNTUsLTEuMzE0NWMxLjk1Njk0LC0xLjA3ODU3IDMuMzc2NjUsLTIuMzc2NzIgNC4yNTkxMiwtMy44OTQ0OWMxLjI3NjcyLC0yLjE5NTk0IDEuOTE1MDcsLTQuNzIzODQgMS45MTUwNywtNy41ODM2OGMwLC0zLjg4MTIgLTEuMjAwMTEsLTYuOTE5NzkgLTMuNjAwMzMsLTkuMTE1NzNjLTAuOTc3NDIsLTAuODY3NDIgLTIuMTA5NDEsLTEuNTQzMDcgLTMuMzM2ODIsLTEuOTkxNjdjLTIuMjYwMywtMC44NjgxNyAtNS4xNTY5LC0xLjMwMjI1IC04LjY4OTgyLC0xLjMwMjI1Yy01LjE2MzAzLDAgLTkuNjQ4ODksMC44Nzc4NyAtMTMuNDU3NTgsMi42MzM2Yy0wLjAzMzc1LDAuMDE1NzUgLTAuMDY3NDYsMC4wMzE1OSAtMC4xMDExMiwwLjA0NzQ5Yy0zLjgzMDE0LDEuNzg3NCAtNy4wNzMsMy41NDkyNyAtOS43Mjg1Niw1LjI4NTU5bC0xMC43MjQzOSwtMTUuOTMzMzljMi44MDQ5MywtMS45ODcyIDUuNzg3OCwtMy43MTA0NiA4LjkxMDQ0LC01LjE0NzcxYzIuMDE5MSwtMC45MzUwNiA0LjA4MTU0LC0xLjc3MzUyIDYuMTgwMzEsLTIuNTEyNTdjMi44NzMzMSwtMC45OTk5IDUuODMxNjUsLTEuNzM2MjggOC44Mzg0MywtMi4yMDAwM2MyLjkyODI4LC0wLjQ2Njc2IDYuMDYwMzEsLTAuNzQ0NTggOS4zOTYxLC0wLjgzMzQ0YzAuNzkwMzcsLTAuMDIwNyAxLjU4MDk5LC0wLjAzMDkyIDIuMzcxNjIsLTAuMDMwNjRjMy41NjQ5OSwtMC4wMTkwMyA3LjEyNTksMC4yNDQyOSAxMC42NDkzMiwwLjc4NzQ4YzMuNzcxOTIsMC42MDI2IDcuMTg5NDMsMS41NTI0OCAxMC4yNTI1MiwyLjg0OTYyYzIuMDQ3MjEsMC44NTkyMSA0LjAwMTUsMS45MjQ5MSA1LjgzMjU0LDMuMTgwNTVjMy4wMjEwMywyLjAxNTE3IDUuNTA5ODksNC43MzEwOCA3LjI1NDI5LDcuOTE2MTNjMS43NTE2NSwzLjI3NDUxIDIuNjI3NDgsNy4wNDQ5IDIuNjI3NDgsMTEuMzExMTdjMC4wMjI4MywyLjY0OTMyIC0wLjI5OTU4LDUuMjkwMzYgLTAuOTU5MDcsNy44NTYzOGMtMC45OTAyNiwzLjg3NTMyIC0zLjAxNTMyLDcuNDA4NTggLTUuODU4NTgsMTAuMjIxODhjLTQuMjg3OSw0LjIxNDEgLTkuNTg4MjgsNy4yNTM2NiAtMTUuMzkxMDQsOC44MjYxOGMtMC40NTk1NCwwLjEyOTkzIC0wLjkyMTI3LDAuMjUyMDEgLTEuMzg0OTgsMC4zNjYxNnoiIGZpbGw9IiNmZmZmZmYiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjIuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBhdGggZD0iTTM1Ny4xOTQ4MiwxODUuMjM3NzN2MTkuNDU3MTFoLTc2LjQ0OTYxdi0xNi4wODY1OWwyNy40MjM4MSwtMjcuNzMwMjJjNS41MTU0LC01LjcxOTY5IDkuOTU4MzcsLTEwLjQ5NDU5IDEzLjMyODg5LC0xNC4zMjQ3M2MxLjE0MDMxLC0xLjI5MDI0IDIuMjMzMzcsLTIuNjIxNDQgMy4yNzcwNywtMy45OTEwMWMxLjczNjMzLC0yLjI4ODg5IDMuMDk1MjYsLTQuNDMxMjMgNC4wNzY4LC02LjQyNjk4YzEuNTMyMDYsLTMuMTE1MTggMi4yOTgwOCwtNi40NjAxOCAyLjI5ODA4LC0xMC4wMzQ5N2MwLC00LjM5MTkgLTEuMjAwMTEsLTcuNjYwMjggLTMuNjAwMzMsLTkuODA1MTZjLTEuNDk5NjUsLTEuMzE5NjEgLTMuMzAxMzQsLTIuMjQ5NCAtNS4yNDU3NiwtMi43MDcxNGMtMS4yMzI3OCwtMC4zMDg0NiAtMi41NzUzOSwtMC40NzY5OSAtNC4wMjc3OCwtMC41MDU1OGMtMC4xNTE2NiwtMC4wMDMwNSAtMC4zMDMzMywtMC4wMDQ1NyAtMC40NTUwMiwtMC4wMDQ2Yy00LjExNSwwLjAxMzE5IC04LjE3NDk2LDAuOTQ2NTQgLTExLjg4MjYzLDIuNzMxNjZjLTAuMTI1LDAuMDU4OTQgLTAuMjQ5NiwwLjExODY5IC0wLjM3MzgyLDAuMTc5MjVjLTEuOTc2NDgsMC45NzE0NSAtMy44OTIwMiwyLjA2MjI1IC01LjczNjAyLDMuMjY2MzRjLTEuODcxMTYsMS4yMTMzOSAtMy43ODM2NywyLjU5MTIzIC01LjczNzU1LDQuMTMzNDljLTAuMzY1MjksMC4yODgzNSAtMC43Mjg0LDAuNTc5NDQgLTEuMDg5MjksMC44NzMyN2wtMTIuNTYyODYsLTE0Ljg2MDk1YzMuMTY2MjUsLTIuNzU3NyA2LjUxMTI0LC01LjMxMTEzIDEwLjAzNDk3LC03LjY2MDI4YzIuMjk2ODQsLTEuNTE5MDggNC43Mjg4LC0yLjgyMzI3IDcuMjY1MDEsLTMuODk2MDJjMS42MzM0MywtMC42OTU0OCAzLjI5OTE1LC0xLjMxMjU3IDQuOTkxNDQsLTEuODQ5MTljNC42NDcyNSwtMS40ODA5OSAxMC4yMzkyNSwtMi4yMjE0OCAxNi43NzYwMiwtMi4yMjE0OGMyLjk1MzkxLC0wLjAxNTA2IDUuOTAzMjMsMC4yMzUxNiA4LjgxMjM5LDAuNzQ3NjRjMy41MDMzMSwwLjYzNTI4IDYuNjk3MTIsMS42NzY1OSA5LjU4MTQ4LDMuMTIzODZjMC4wMjI0OSwwLjAxMTcyIDAuMDQ0OTcsMC4wMjM0NyAwLjA2NzQxLDAuMDM1MjRjMi44MTA3NCwxLjM5Mzg2IDUuMzk4NTgsMy4xOTc5MiA3LjY3ODY3LDUuMzUzYzEuNjMxNSwxLjU1ODQ4IDMuMDY1OTcsMy4zMTA5MyA0LjI3MTM3LDUuMjE4MThjMi44MDg3Niw0LjQ0Mjk2IDQuMjEzMTUsOS40NzMyMiA0LjIxMzE1LDE1LjA5MDc1YzAuMDIzMDQsMy43ODk2NiAtMC40OTkxMSw3LjU2MjkzIC0xLjU1MDQ0LDExLjIwMzkzYy0wLjUzODM4LDEuODMzMDMgLTEuMjIzOSwzLjYxOTYxIC0yLjA0OTg5LDUuMzQyMjhjLTEuNDI5ODcsMi45NDcyMiAtMy4xMjYyOCw1Ljc1NzQ3IC01LjA2ODA0LDguMzk1NjdjLTEuNjU1MDMsMi4yNTgxIC0zLjQ0MTQ0LDQuNDE2OTIgLTUuMzQ5OTQsNi40NjUyOGMtMi4xMjQ1NiwyLjI4NTM1IC00LjI5NDM4LDQuNTI4MjIgLTYuNTA4MTgsNi43MjcyNmMtMi4yNjY0MiwyLjI1NzIyIC00LjcwMDg1LDQuNjA0ODYgLTcuMzAzMzEsNy4wNDI4NmMtMC44ODI0MiwwLjgyNzExIC0xLjc2ODQ3LDEuNjUwMzUgLTIuNjU4MTIsMi40Njk2N2wtMTQuMDk0OTIsMTMuMTc1Njh2MS4wNzI0NHoiIGZpbGw9IiNmZmZmZmYiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjIuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PC9nPjwvZz48L3N2Zz48IS0tcm90YXRpb25DZW50ZXI6MTEyLjY3NzEzOjExMi42NzczNDUwMDAwMDAwMy0tPg==";

  const isNumberBits = (bits) => {
    return /^-?[01]+$/.test(bits);
  };
  const number2bits = (number) => {
    return Scratch.Cast.toNumber(number).toString(2);
  };
  const bits2number = (bits) => {
    return /^-?[01]+$/.test(bits) ? parseInt(bits, 2) || 0 : 0;
  };

  const circularRightShift = (number, k) => {
    return (number >>> k) | (number << (32 - k));
  };
  const circularLeftShift = (number, k) => {
    return (number << k) | (number >>> (32 - k));
  };

  class Bitwise {
    getInfo() {
      return {
        id: "Bitwise",
        name: "Bitwise",

        color1: "#17cde6",

        docsURI: "https://extensions.turbowarp.org/bitwise",
        menuIconURI: icon,

        blocks: [
          {
            opcode: "isNumberBits",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is [CENTRAL] binary?",
            arguments: {
              CENTRAL: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0000000000100000",
              },
            },
          },
          "---",
          {
            opcode: "toNumberBits",
            blockType: Scratch.BlockType.REPORTER,
            text: "[CENTRAL] to binary",
            arguments: {
              CENTRAL: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "32",
              },
            },
          },
          {
            opcode: "ofNumberBits",
            blockType: Scratch.BlockType.REPORTER,
            text: "[CENTRAL] to number",
            arguments: {
              CENTRAL: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0000000000100000",
              },
            },
          },
          "---",
          {
            opcode: "bitwiseRightShift",
            blockType: Scratch.BlockType.REPORTER,
            text: "[LEFT] >> [RIGHT]",
            arguments: {
              LEFT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "",
              },
              RIGHT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "",
              },
            },
          },
          {
            opcode: "bitwiseLeftShift",
            blockType: Scratch.BlockType.REPORTER,
            text: "[LEFT] << [RIGHT]",
            arguments: {
              LEFT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "",
              },
              RIGHT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "",
              },
            },
          },
          {
            opcode: "bitwiseLogicalRightShift",
            blockType: Scratch.BlockType.REPORTER,
            text: "[LEFT] >>> [RIGHT]",
            arguments: {
              LEFT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "",
              },
              RIGHT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "",
              },
            },
          },
          {
            opcode: "bitwiseCircularRightShift",
            blockType: Scratch.BlockType.REPORTER,
            text: "[LEFT] ↻ [RIGHT]",
            arguments: {
              LEFT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "",
              },
              RIGHT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "",
              },
            },
          },
          {
            opcode: "bitwiseCircularLeftShift",
            blockType: Scratch.BlockType.REPORTER,
            text: "[LEFT] ↺ [RIGHT]",
            arguments: {
              LEFT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "",
              },
              RIGHT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "",
              },
            },
          },
          "---",
          {
            opcode: "bitwiseAnd",
            blockType: Scratch.BlockType.REPORTER,
            text: "[LEFT] and [RIGHT]",
            arguments: {
              LEFT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "",
              },
              RIGHT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "",
              },
            },
          },
          {
            opcode: "bitwiseOr",
            blockType: Scratch.BlockType.REPORTER,
            text: "[LEFT] or [RIGHT]",
            arguments: {
              LEFT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "",
              },
              RIGHT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "",
              },
            },
          },
          {
            opcode: "bitwiseXor",
            blockType: Scratch.BlockType.REPORTER,
            text: "[LEFT] xor [RIGHT]",
            arguments: {
              LEFT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "",
              },
              RIGHT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "",
              },
            },
          },
          {
            opcode: "bitwiseNot",
            blockType: Scratch.BlockType.REPORTER,
            text: "not [CENTRAL]",
            arguments: {
              CENTRAL: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "",
              },
            },
          },
        ],
      };
    }

    isNumberBits({ CENTRAL }) {
      return isNumberBits(CENTRAL);
    }
    toNumberBits({ CENTRAL }) {
      return number2bits(CENTRAL);
    }
    ofNumberBits({ CENTRAL }) {
      return bits2number(CENTRAL);
    }
    bitwiseRightShift({ LEFT, RIGHT }) {
      return LEFT >> RIGHT;
    }
    bitwiseLeftShift({ LEFT, RIGHT }) {
      return LEFT << RIGHT;
    }
    bitwiseLogicalRightShift({ LEFT, RIGHT }) {
      return LEFT >>> RIGHT;
    }
    bitwiseCircularRightShift({ LEFT, RIGHT }) {
      return circularRightShift(LEFT, RIGHT);
    }
    bitwiseCircularLeftShift({ LEFT, RIGHT }) {
      return circularLeftShift(LEFT, RIGHT);
    }
    bitwiseAnd({ LEFT, RIGHT }) {
      return LEFT & RIGHT;
    }
    bitwiseOr({ LEFT, RIGHT }) {
      return LEFT | RIGHT;
    }
    bitwiseXor({ LEFT, RIGHT }) {
      return LEFT ^ RIGHT;
    }
    bitwiseNot({ CENTRAL }) {
      return ~CENTRAL;
    }
  }

  Scratch.extensions.register(new Bitwise());
})(Scratch);
