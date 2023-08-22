// Name: Consoles
// ID: sipcconsole
// Description: Blocks that interact the JavaScript console built in to your browser's developer tools.
// By: -SIPC-

(function (Scratch) {
  "use strict";
  const icon =
    "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI4MS41NTIwNyIgaGVpZ2h0PSI4MC42MDMwOCIgdmlld0JveD0iMCwwLDgxLjU1MjA3LDgwLjYwMzA4Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTk5LjIyMzk3LC0xNDAuNjk4NDYpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTI4MC43NzYwMywxODFjMCwyMi4yNTc5MiAtMTguMjU2MDUsNDAuMzAxNTQgLTQwLjc3NjAzLDQwLjMwMTU0Yy0yMi41MTk5OCwwIC00MC43NzYwMywtMTguMDQzNjEgLTQwLjc3NjAzLC00MC4zMDE1NGMwLC0yMi4yNTc5MiAxOC4yNTYwNSwtNDAuMzAxNTQgNDAuNzc2MDMsLTQwLjMwMTU0YzIyLjUxOTk4LDAgNDAuNzc2MDMsMTguMDQzNjEgNDAuNzc2MDMsNDAuMzAxNTR6IiBmaWxsPSIjODA4MDgwIiBzdHJva2Utd2lkdGg9IjAiLz48cGF0aCBkPSJNMjY2LjE2NTgzLDE2Mi4xOTM1NnYyOS4yMDMwMWMwLDIuMjU4MzMgLTEuODMwNTksNC4wODg0MSAtNC4wODg0MSw0LjA4ODQxaC00NC4xNTQ4NWMtMi4yNTgzMywwIC00LjA4ODQxLC0xLjgzMDA3IC00LjA4ODQxLC00LjA4ODQxdi0yOS4yMDMwMWMwLC0yLjI1ODMzIDEuODMwMDcsLTQuMDg4NDEgNC4wODg0MSwtNC4wODg0MWg0NC4xNTQ4NWMyLjI1NzgzLDAgNC4wODg0MSwxLjgzMDA3IDQuMDg4NDEsNC4wODg0MXpNMjYyLjM1NTk1LDE2NC42NDUwOGMwLC0xLjM0MjAyIC0xLjA4ODAzLC0yLjQzMDA1IC0yLjQzMDA1LC0yLjQzMDA1aC0zOS44NTEyOGMtMS4zNDIwMiwwIC0yLjQzMDA1LDEuMDg4MDMgLTIuNDMwMDUsMi40MzAwNXYyNC4yOTk0N2MwLDEuMzQyMDIgMS4wODgwMywyLjQzMDA1IDIuNDMwMDUsMi40MzAwNWg3Ljc3NDYzdi0xMC4yMDU2OWMwLC0xLjM0MjU0IDEuMDg4MDMsLTIuNDMwMDUgMi40MzAwNSwtMi40MzAwNWMxLjM0MjU0LDAgMi40MzAwNSwxLjA4ODAzIDIuNDMwMDUsMi40MzAwNXYxMC4yMDU2OWg0Ljg2MDF2LTE4Ljk1Mzg4YzAsLTEuMzQyMDIgMS4wODgwMywtMi40MzAwNSAyLjQzMDA1LC0yLjQzMDA1YzEuMzQyNTQsMCAyLjQzMDA1LDEuMDg4MDMgMi40MzAwNSwyLjQzMDA1djE4Ljk1Mzg4aDQuODYwMXYtMTQuMDkzNzhjMCwtMS4zNDIwMiAxLjA4ODAzLC0yLjQzMDA1IDIuNDMwMDUsLTIuNDMwMDVjMS4zNDI1NCwwIDIuNDMwMDUsMS4wODgwMyAyLjQzMDA1LDIuNDMwMDV2MTQuMDkzNzhoNy43NzYxNmMxLjM0MjAyLDAgMi40MzAwNSwtMS4wODgwMyAyLjQzMDA1LC0yLjQzMDA1ek0yNTMuMDgyOTIsMjAxLjU1ODgzYzAsMS4yOTA0MSAtMS4wNDYxMiwyLjMzNjAyIC0yLjMzNjAyLDIuMzM2MDJoLTIxLjQ5MzhjLTEuMjg5ODksMCAtMi4zMzYwMiwtMS4wNDU2MSAtMi4zMzYwMiwtMi4zMzYwMmMwLC0xLjI4OTg5IDEuMDQ1NjEsLTIuMzM2MDIgMi4zMzYwMiwtMi4zMzYwMmgyMS40OTM4YzEuMjg5ODksMCAyLjMzNjAyLDEuMDQ2MTMgMi4zMzYwMiwyLjMzNjAyek0yNTAuNzQ2OSwxOTkuMjIyODEiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMSIvPjwvZz48L2c+PC9zdmc+PCEtLXJvdGF0aW9uQ2VudGVyOjQwLjc3NjAzMzMzMzMzMzQ6MzkuMzAxNTM5OTk5OTk5OTYtLT4=";
  const icon2 =
    "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjczNzk0NjIzOTU3IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjQ0NDAiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTk0NC4zOCA3MC4xOWgtODY0Yy00NC4xOSAwLTgwIDM1LjgxLTgwIDgwdjU3MS40M2MwIDQ0LjE5IDM1LjgxIDgwIDgwIDgwaDg2NGM0NC4xOCAwIDgwLTM1LjgxIDgwLTgwVjE1MC4xOWMwLTQ0LjE5LTM1LjgyLTgwLTgwLTgweiBtNS40NSA2MDMuNDVjMCAyNi4yNi0yMS4yOSA0Ny41NS00Ny41NSA0Ny41NUg3NTAuMTJWNDQ1LjQxYzAtMjYuMjYtMjEuMjgtNDcuNTUtNDcuNTUtNDcuNTUtMjYuMjYgMC00Ny41NSAyMS4yOS00Ny41NSA0Ny41NXYyNzUuNzhoLTk1LjFWMzUwLjMxYzAtMjYuMjYtMjEuMjgtNDcuNTUtNDcuNTUtNDcuNTUtMjYuMjYgMC00Ny41NSAyMS4yOS00Ny41NSA0Ny41NXYzNzAuODhoLTk1LjF2LTE5OS43YzAtMjYuMjYtMjEuMjgtNDcuNTUtNDcuNTUtNDcuNTUtMjYuMjYgMC00Ny41NSAyMS4yOC00Ny41NSA0Ny41NXYxOTkuN0gxMjIuNDljLTI2LjI2IDAtNDcuNTUtMjEuMjktNDcuNTUtNDcuNTVWMTk4LjE2YzAtMjYuMjYgMjEuMjktNDcuNTUgNDcuNTUtNDcuNTVoNzc5Ljc5YzI2LjI2IDAgNDcuNTUgMjEuMjkgNDcuNTUgNDcuNTV2NDc1LjQ4ek03MjIuNjcgODc0Ljc2SDMwMi4wOWMtMjUuMjUgMC00NS43MSAyMC40Ny00NS43MSA0NS43MSAwIDI1LjI1IDIwLjQ3IDQ1LjcxIDQ1LjcxIDQ1LjcxaDQyMC41OGMyNS4yNCAwIDQ1LjcxLTIwLjQ2IDQ1LjcxLTQ1LjcxIDAtMjUuMjQtMjAuNDctNDUuNzEtNDUuNzEtNDUuNzF6IG0wIDAiIGZpbGw9IiNmZmZmZmYiIHAtaWQ9IjQ0NDEiPjwvcGF0aD48L3N2Zz4=";
  class Consoles {
    constructor() {}
    getInfo() {
      return {
        id: "sipcconsole",
        name: "Consoles",
        color1: "#808080",
        color2: "#8c8c8c",
        color3: "#999999",
        menuIconURI: icon,
        blockIconURI: icon2,
        blocks: [
          {
            opcode: "Emptying",
            blockType: Scratch.BlockType.COMMAND,
            text: "Clear Console",
            arguments: {},
          },
          {
            opcode: "Information",
            blockType: Scratch.BlockType.COMMAND,
            text: "Information [string]",
            arguments: {
              string: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Information",
              },
            },
          },
          {
            opcode: "Journal",
            blockType: Scratch.BlockType.COMMAND,
            text: "Journal [string]",
            arguments: {
              string: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Journal",
              },
            },
          },
          {
            opcode: "Warning",
            blockType: Scratch.BlockType.COMMAND,
            text: "Warning [string]",
            arguments: {
              string: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Warning",
              },
            },
          },
          {
            opcode: "Error",
            blockType: Scratch.BlockType.COMMAND,
            text: "Error [string]",
            arguments: {
              string: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Error",
              },
            },
          },
          {
            opcode: "debug",
            blockType: Scratch.BlockType.COMMAND,
            text: "Debug [string]",
            arguments: {
              string: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Debug",
              },
            },
          },

          "---",
          {
            opcode: "group",
            blockType: Scratch.BlockType.COMMAND,
            text: "Create a group named [string]",
            arguments: {
              string: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "group",
              },
            },
          },
          {
            opcode: "groupCollapsed",
            blockType: Scratch.BlockType.COMMAND,
            text: "Create a collapsed group named [string]",
            arguments: {
              string: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "group",
              },
            },
          },
          {
            opcode: "groupEnd",
            blockType: Scratch.BlockType.COMMAND,
            text: "Exit the current group",
            arguments: {},
          },
          "---",
          {
            opcode: "Timeron",
            blockType: Scratch.BlockType.COMMAND,
            text: "Start a timer named [string]",
            arguments: {
              string: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Time",
              },
            },
          },
          {
            opcode: "Timerlog",
            blockType: Scratch.BlockType.COMMAND,
            text: "Print the time run by the timer named [string]",
            arguments: {
              string: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Time",
              },
            },
          },
          {
            opcode: "Timeroff",
            blockType: Scratch.BlockType.COMMAND,
            text: "End the timer named [string] and print the time elapsed from start to end",
            arguments: {
              string: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Time",
              },
            },
          },
        ],
      };
    }
    Emptying() {
      console.clear();
    }
    Information({ string }) {
      console.info(string);
    }
    Journal({ string }) {
      console.log(string);
    }
    Warning({ string }) {
      console.warn(string);
    }
    Error({ string }) {
      console.error(string);
    }
    debug({ string }) {
      console.debug(string);
    }
    group({ string }) {
      console.group(string);
    }
    groupCollapsed({ string }) {
      console.groupCollapsed(string);
    }
    groupEnd() {
      console.groupEnd();
    }
    Timeron({ string }) {
      console.time(string);
    }
    Timerlog({ string }) {
      console.timeLog(string);
    }
    Timeroff({ string }) {
      console.timeEnd(string);
    }
  }
  Scratch.extensions.register(new Consoles());
})(Scratch);
