// Name: Color Tools
// ID: colortoolsdatripleblockk
// Description:
// By: Da TripleBlock

(function (Scratch) {
  "use strict";
  class colorTools {
    getInfo() {
      return {
        id: "colortoolsdatripleblockk",
        name: "Color Tools",
        blockIconURI:
          "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgdmlld0JveD0iMCwwLDQ4LDQ4Ij4KCiAgPGNpcmNsZSBjbGFzcz0iYmxlbmQiIGN4PSIyNCIgY3k9IjEyIiByPSIxMiIgZmlsbD0iI2ZmMDAwMCIgLz4KICA8Y2lyY2xlIGNsYXNzPSJibGVuZCIgY3g9IjM2IiBjeT0iMzYiIHI9IjEyIiBmaWxsPSIjMDBmZjAwIiAvPgogIDxjaXJjbGUgY2xhc3M9ImJsZW5kIiBjeD0iMTIiIGN5PSIzNiIgcj0iMTIiIGZpbGw9IiMwMDAwZmYiIC8+CiAgPHN0eWxlPgogICAgLmJsZW5kIHsgbWl4LWJsZW5kLW1vZGU6IHNjcmVlbjsgfQogIDwvc3R5bGU+Cjwvc3ZnPjwhLS1yb3RhdGlvbkNlbnRlcjozMDAsMTUwLS0+",
        color1: "#0080ff",
        color2: "#0080ff",
        color3: "#ff1e00",
        blocks: [
          {
            opcode: "decimalhex",
            blockType: Scratch.BlockType.REPORTER,
            text: "Decimal [Decimal] To Hex",
            arguments: {
              Decimal: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "123",
              },
            },
          },
          {
            opcode: "hexdecimal",
            blockType: Scratch.BlockType.REPORTER,
            text: "Hex [Hex] To To Decimal",
            arguments: {
              Hex: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "#FF0000",
              },
            },
          },
          {
            opcode: "decimaltohsv",
            blockType: Scratch.BlockType.REPORTER,
            text: "Decimal [Hex] To HSV",
            arguments: {
              Hex: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "183662",
              },
            },
          },
          {
            opcode: "hsvtodecimal",
            blockType: Scratch.BlockType.REPORTER,
            text: "HSV [HSV] To Decimal",
            arguments: {
              HSV: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
            },
          },
          {
            opcode: "decimaltorgb",
            blockType: Scratch.BlockType.REPORTER,
            text: "Decimal [Hex] To rgb",
            arguments: {
              Hex: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "183662",
              },
            },
          },
          {
            opcode: "rgbtodecimal",
            blockType: Scratch.BlockType.REPORTER,
            text: "rgb [HSV] To Decimal",
            arguments: {
              HSV: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
            },
          },
          {
            opcode: "red",
            blockType: Scratch.BlockType.REPORTER,
            text: "red",
          },
          {
            opcode: "blue",
            blockType: Scratch.BlockType.REPORTER,
            text: "Blue",
          },
          {
            opcode: "green",
            blockType: Scratch.BlockType.REPORTER,
            text: "green",
          },
          {
            opcode: "randomcolor",
            blockType: Scratch.BlockType.REPORTER,
            text: "Random Color",
          },
          {
            opcode: "wordtocolor",
            blockType: Scratch.BlockType.REPORTER,
            text: "Word [HSV] To Colour",
            arguments: {
              HSV: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
            },
          },
        ],
      };
    }
    decimalhex(args) {
      const decimal = Scratch.Cast.toNumber(args.Decimal);
      const hex = ["a", "b", "c", "d", "e", "f", "0", "1", "2", "3"];
      return (
        "#" +
        Scratch.Cast.toString(decimal)
          .split("")
          .map((v) => hex[Scratch.Cast.toNumber(v)])
          .join("")
      );
    }
    hexdecimal(args) {
      const hex = Scratch.Cast.toString(args.Hex);
      return hex
        .split("")
        .map((v) => v.charCodeAt(0))
        .join("");
    }
    decimaltohsv(args) {
      const hex = Scratch.Cast.toNumber(args.Hex);
      return `hsl(${hex})`;
    }
    hsvtodecimal(args) {
      const hsv = Scratch.Cast.toString(args.HSV);
      return hsv
        .split("")
        .map((v) => v.charCodeAt(0))
        .join("");
    }
    decimaltorgb(args) {
      const hex = Scratch.Cast.toNumber(args.Hex);
      return `rgb(${hex})`;
    }
    rgbtodecimal(args) {
      const hsv = Scratch.Cast.toString(args.HSV);
      return hsv
        .split("")
        .map((v) => v.charCodeAt(0))
        .join("");
    }
    red() {
      return "red";
    }
    blue() {
      return "blue";
    }
    green() {
      return "green";
    }
    randomcolor() {
      const hex = [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
      ];
      return (
        "#" +
        [1, 1, 1, 1, 1, 1]
          .map(() => hex[Math.round(Math.random() * hex.length)])
          .join("")
      );
    }
    wordtocolor(args) {
      switch (args.HSV) {
        case "red":
          return "#ff0000";
        case "green":
          return "#00ff00";
        case "blue":
          return "#0000ff";
        case "white":
          return "#ffffff";
        case "black":
          return "#000000";
      }
    }
  }
  Scratch.extensions.register(new colorTools());
})(Scratch);
