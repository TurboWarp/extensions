// Name: Perlin Noise
// ID: SPperlin
// Description: Generate Perlin Noise
// By: SharkPool

// Version V.1.0.0
  
(function(Scratch) {
  "use strict";
  
  if (!Scratch.extensions.unsandboxed) throw new Error("Perlin Noise must run unsandboxed");

  const menuIconURI =
"data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI4NC4yODM5NSIgaGVpZ2h0PSI4NC4yODM5NSIgdmlld0JveD0iMCwwLDg0LjI4Mzk1LDg0LjI4Mzk1Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTk3Ljg1ODAyLC0xMzcuODU4MDIpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0xOTkuODU4MDMsMTgwYzAsLTIyLjE2OTggMTcuOTcyMTcsLTQwLjE0MTk3IDQwLjE0MTk4LC00MC4xNDE5N2MyMi4xNjk4LDAgNDAuMTQxOTgsMTcuOTcyMTcgNDAuMTQxOTgsNDAuMTQxOThjMCwyMi4xNjk4IC0xNy45NzIxNyw0MC4xNDE5OCAtNDAuMTQxOTcsNDAuMTQxOThjLTIyLjE2OTgsMCAtNDAuMTQxOTcsLTE3Ljk3MjE3IC00MC4xNDE5NywtNDAuMTQxOTd6IiBmaWxsPSIjYjY3MzczIiBzdHJva2U9IiM4MjUyNTIiIHN0cm9rZS13aWR0aD0iNCIvPjxwYXRoIGQ9Ik0yMTEuNzYzMSwxODguNTgzMjdsMTIuNDU5NjgsLTE3LjYwMzQ4YzEuNjMxOTksLTIuMzA1NzQgNC4yNzc5NywtMi4zMDU3NCA1LjkwOTk3LDBsMTIuNDU5NjcsMTcuNjAzNDhjMS42MzE5OSwyLjMwNTc0IC04LjMxNDcxLDYuMzY5MzEgLTE0Ljg3ODQ5LDYuMzY5MzFjLTYuNTYzNzgsMCAtMTcuNTgyODIsLTQuMDYzNTcgLTE1Ljk1MDgzLC02LjM2OTMxeiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjAiLz48cGF0aCBkPSJNMjI4LjQyMDczLDE3OS43OTQxNWwxNC42NDIzMywtMjAuNjg3MmMxLjkxNzg5LC0yLjcwOTY1IDUuMDI3MzgsLTIuNzA5NjUgNi45NDUyNywwYzAsMCAxNS4wNzU3LDIzLjE5NzI5IDE3Ljk1MDIxLDI3LjYyMDM3YzAuOTA4NzcsMS4zOTgzNSAwLjQzOTMyLDMuMjI3NDEgLTEuNjQ4MzUsMy44ODNjLTMuOTgwODEsMS4yNTAwOSAtMTAuNjI2MzEsMy4xODY3MyAtMTUuNjI0NzQsMy44ODMwMWMtNy42MTk3NywxLjA2MTQzIC0xOC40MTgxOCwxLjIyODEyIC0yMS41NDY3NywwLjQzODkxYy0xMi4xMzUzNCwtMy4wNjEyMSAtMi42MzU4NCwtMTIuNDI4NDMgLTAuNzE3OTUsLTE1LjEzODA4eiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjAiLz48cGF0aCBkPSJNMjI5LjMyMzMyLDE3MC4wNDI0NmwyLjEwMDQyLC0xLjQ0NzcxYzAsMCAyLjU2NjA2LDMuMDY2OSA0LjI5NDA3LDUuNzY3NDdjMi4wMzA3NSwzLjE3MzY5IDMuOTA0NCw5LjU0MzAyIDMuOTA0NCw5LjU0MzAyYzAsMCAtNS41MTQxOCwtNy40ODM3NCAtNy40MDEwOSwtMTAuMDIzNjFjLTEuMzk1NjMsLTEuODc4NTggLTIuODk3OCwtMy44MzkxOCAtMi44OTc4LC0zLjgzOTE4eiIgZmlsbD0iI2I2NzM3MyIgc3Ryb2tlPSIjODI1MjUyIiBzdHJva2Utd2lkdGg9IjAiLz48L2c+PC9nPjwvc3ZnPg==";

  const blockIconURI =
"data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI1Ni43OTk0MyIgaGVpZ2h0PSI1Ni43OTk0MyIgdmlld0JveD0iMCwwLDU2Ljc5OTQzLDU2Ljc5OTQzIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjExLjYwMDI5LC0xNTEuNjAwMjkpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlLXdpZHRoPSIwIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTIxMS42MDAyOSwyMDguMzk5NzF2LTU2Ljc5OTQzaDU2Ljc5OTQzdjU2Ljc5OTQzeiIgZmlsbD0iI2I2NzM3MyIgc3Ryb2tlPSJub25lIi8+PHBhdGggZD0iTTIxMS43NjMxMSwxODguNTgzMjhsMTIuNDU5NjgsLTE3LjYwMzQ4YzEuNjMxOTksLTIuMzA1NzQgNC4yNzc5NywtMi4zMDU3NCA1LjkwOTk3LDBsMTIuNDU5NjcsMTcuNjAzNDhjMS42MzE5OSwyLjMwNTc0IC04LjMxNDcxLDYuMzY5MzEgLTE0Ljg3ODQ5LDYuMzY5MzFjLTYuNTYzNzgsMCAtMTcuNTgyODIsLTQuMDYzNTcgLTE1Ljk1MDgzLC02LjM2OTMxeiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSJub25lIi8+PHBhdGggZD0iTTIyOC40MjA3MywxNzkuNzk0MTZsMTQuNjQyMzMsLTIwLjY4NzJjMS45MTc4OSwtMi43MDk2NSA1LjAyNzM4LC0yLjcwOTY1IDYuOTQ1MjcsMGMwLDAgMTUuMDc1NywyMy4xOTcyOSAxNy45NTAyMSwyNy42MjAzN2MwLjkwODc3LDEuMzk4MzUgMC40MzkzMiwzLjIyNzQxIC0xLjY0ODM1LDMuODgzYy0zLjk4MDgxLDEuMjUwMDkgLTEwLjYyNjMxLDMuMTg2NzMgLTE1LjYyNDc0LDMuODgzMDFjLTcuNjE5NzcsMS4wNjE0MyAtMTguNDE4MTgsMS4yMjgxMiAtMjEuNTQ2NzcsMC40Mzg5MWMtMTIuMTM1MzQsLTMuMDYxMjEgLTIuNjM1ODQsLTEyLjQyODQzIC0wLjcxNzk1LC0xNS4xMzgwOHoiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0ibm9uZSIvPjxwYXRoIGQ9Ik0yMjkuMzIzMzMsMTcwLjA0MjQ3bDIuMTAwNDIsLTEuNDQ3NzFjMCwwIDIuNTY2MDYsMy4wNjY5IDQuMjk0MDcsNS43Njc0N2MyLjAzMDc1LDMuMTczNjkgMy45MDQ0LDkuNTQzMDIgMy45MDQ0LDkuNTQzMDJjMCwwIC01LjUxNDE4LC03LjQ4Mzc0IC03LjQwMTA5LC0xMC4wMjM2MWMtMS4zOTU2MywtMS44Nzg1OCAtMi44OTc4LC0zLjgzOTE4IC0yLjg5NzgsLTMuODM5MTh6IiBmaWxsPSIjYjY3MzczIiBzdHJva2U9IiM4MjUyNTIiLz48L2c+PC9nPjwvc3ZnPg==";

  let curNoise = "";
  let noiseInfo = [1, 5, 5];

  class SPperlin {
    getInfo() {
      return {
        id: "SPperlin",
        name: "Perlin Noise",
        color1: "#b67373",
        menuIconURI,
        blockIconURI,
        blocks: [
          {
            opcode: "setSeed",
            blockType: Scratch.BlockType.COMMAND,
            text: "set seed of noise to [SEED]",
            arguments: {
              SEED: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 }
            }
          },
          {
            opcode: "setFreq",
            blockType: Scratch.BlockType.COMMAND,
            text: "set frequency of noise to x [x] y [y]",
            arguments: {
              x: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 },
              y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 },
            }
          },
          {
            opcode: "genNoise",
            blockType: Scratch.BlockType.COMMAND,
            text: "generate noise with width [W] height [H] octaves [O]",
            arguments: {
              W: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              H: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              O: { type: Scratch.ArgumentType.NUMBER, defaultValue: 2 },
            }
          },
          "---",
          {
            opcode: "returnNoise",
            blockType: Scratch.BlockType.REPORTER,
            text: "return noise as [TYPE]",
            disableMonitor: true,
            arguments: {
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "RETURN" }
            }
          },
          {
            opcode: "returnVal",
            blockType: Scratch.BlockType.REPORTER,
            text: "get value of noise at x [x] y [y]",
            arguments: {
              x: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            }
          },
        ],
        menus: {
          RETURN: ["svg", "encoded svg", "png", "pixel array"],
        }
      }
    }

    genNoise(args) {
      const vals = [
        Scratch.Cast.toNumber(args.W), Scratch.Cast.toNumber(args.H),
        Math.abs(noiseInfo[1] / 100), Math.abs(noiseInfo[2] / 100),
        Math.min(Scratch.Cast.toNumber(args.O), 100)
      ];
      curNoise =
      `<svg width="${vals[0]}" height="${vals[1]}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <filter id="a">
            <feTurbulence type="fractalNoise" seed="${noiseInfo[0]}" baseFrequency="${vals[2]},${vals[3]}" numOctaves="${vals[4]}" result="turbulence"></feTurbulence>
            <feColorMatrix type="saturate" values="0"></feColorMatrix>
          </filter>
          <rect width="100%" height="100%" fill="black" />
          <rect width="100%" height="100%" style="filter: url(#a)" />
        </svg>
      `;
    }

    setSeed(args) { noiseInfo[0] = Scratch.Cast.toNumber(args.SEED) }

    setFreq(args) { noiseInfo = [noiseInfo[0], Scratch.Cast.toNumber(args.x), Scratch.Cast.toNumber(args.y)] }

    returnNoise(args) {
      if (args.TYPE === "encoded svg") return `data:image/svg+xml;base64,${btoa(curNoise)}`;
      if (args.TYPE === "png" && curNoise) {
        // eslint-disable-next-line
        const img = new Image();
        img.src = `data:image/svg+xml;base64,${btoa(curNoise)}`;
        return new Promise((resolve) => {
          img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            resolve(canvas.toDataURL());
          };
        });
      }
      if (args.TYPE === "pixel array") {
        if (!curNoise) return "[]";
        return this.analyze(`data:image/svg+xml;base64,${btoa(curNoise)}`);
      }
      return curNoise.trim();
    }

    analyze(noise) {
      // eslint-disable-next-line
      const image = new Image();
      image.src = noise;
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      return new Promise((resolve, reject) => {
        image.onload = () => {
          canvas.width = image.width;
          canvas.height = image.height;
          ctx.drawImage(image, 0, 0, image.width, image.height);
          const imageData = ctx.getImageData(0, 0, image.width, image.height);
          const data = imageData.data;
          const pixelValues = [];
          for (let i = 0; i < data.length; i += 4) {
            const grayValue = data[i];
            const normValue = Math.round((grayValue / 255) * 100);
            pixelValues.push(normValue);
          }
          resolve(JSON.stringify(pixelValues));
        };
      });
    }

    returnVal(args) {
      if (!curNoise) return "";
      return new Promise((resolve, reject) => {
        // eslint-disable-next-line
        const image = new Image();
        image.src = `data:image/svg+xml;base64,${btoa(curNoise)}`;
        image.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          const x = Scratch.Cast.toNumber(args.x) + (image.width / 2);
          const y = (Scratch.Cast.toNumber(args.y) * -1) + (image.height / 2);
          canvas.width = image.width;
          canvas.height = image.height;
          ctx.drawImage(image, 0, 0, image.width, image.height);
          const imageData = ctx.getImageData(0, 0, image.width, image.height);
          const data = imageData.data;
          const index = (y * image.width + x) * 4;
          const grayValue = Math.round((data[index] / 255) * 100);
          resolve(isNaN(grayValue) ? 0 : grayValue);
        };
      });
    }
  }
  
  Scratch.extensions.register(new SPperlin());
})(Scratch);
