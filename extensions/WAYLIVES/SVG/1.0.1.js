// Name: SVG
// ID: WRsvg
// Description: Create SVG elements.
// By: WAYLIVES
// License: MIT

// Version: 1.0.1

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("This example must run unsandboxed");
  }

  class svg {
    getInfo() {
      return {
        id: "svg",
        name: "SVG",
        color1: "#9823FF",
        color2: "#7C2DC1",
        color3: "#2D3548",
        blocks: [
          {
            opcode: "svg",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate(
              "SVG-frame  //  width: [WIDTH] height: [HEIGHT] elements in svg: [ELEMENTS]"
            ),
            arguments: {
              WIDTH: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "100",
              },
              HEIGHT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "100",
              },
              ELEMENTS: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "<path ... />",
              },
            },
          },

          "---",

          {
            opcode: "line",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate(
              "LINE  //  x1, y1: [XA][YA] x2, y2: [XB][YB] width: [WIDTH] color: [COLOR] opacity: [OPACITY]% dash, gap: [DASH][GAP] linecap: [LINECAP]"
            ),
            arguments: {
              XA: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "4",
              },
              YA: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "4",
              },
              XB: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "96",
              },
              YB: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "96",
              },
              WIDTH: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "8",
              },
              COLOR: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#ff0000",
              },
              OPACITY: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "100",
              },
              DASH: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0",
              },
              GAP: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0",
              },
              LINECAP: {
                type: Scratch.ArgumentType.STRING,
                menu: "LINECAPmenu",
              },
            },
          },

          {
            opcode: "rect",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate(
              "RECT  //  x, y: [X][Y] width: [WIDTH] height: [HEIGHT] radius: [RADIUS] fill color: [FILLCOLOR] fill opacity: [FILLOPACITY]% stroke width: [STROKEWIDTH] stroke color: [STROKECOLOR] stroke opacity: [STROKEOPACITY]% dash, gap: [DASH][GAP] stroke linecap: [LINECAP]"
            ),
            arguments: {
              X: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "4",
              },
              Y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "4",
              },
              WIDTH: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "92",
              },
              HEIGHT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "92",
              },
              RADIUS: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "20",
              },
              FILLCOLOR: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#ff0000",
              },
              FILLOPACITY: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "100",
              },
              STROKEWIDTH: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "8",
              },
              STROKECOLOR: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#000000",
              },
              STROKEOPACITY: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "100",
              },
              DASH: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0",
              },
              GAP: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0",
              },
              LINECAP: {
                type: Scratch.ArgumentType.STRING,
                menu: "LINECAPmenu",
              },
            },
          },

          {
            opcode: "ellipse",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate(
              "ELLIPSE  //  cx, cy: [CX][CY] width: [WIDTH] height: [HEIGHT] fill color: [FILLCOLOR] fill opacity: [FILLOPACITY]% stroke width: [STROKEWIDTH] stroke color: [STROKECOLOR] stroke opacity: [STROKEOPACITY]% dash, gap: [DASH][GAP] stroke linecap: [LINECAP]"
            ),
            arguments: {
              CX: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "50",
              },
              CY: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "50",
              },
              WIDTH: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "92",
              },
              HEIGHT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "92",
              },
              FILLCOLOR: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#ff0000",
              },
              FILLOPACITY: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "100",
              },
              STROKEWIDTH: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "8",
              },
              STROKECOLOR: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#000000",
              },
              STROKEOPACITY: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "100",
              },
              DASH: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0",
              },
              GAP: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0",
              },
              LINECAP: {
                type: Scratch.ArgumentType.STRING,
                menu: "LINECAPmenu",
              },
            },
          },
          
        ],
        menus: {
          LINECAPmenu: {
            acceptReporters: true,
            items: ["round", "butt", "square"],
          },
        },
      };
    }

    svg(args) {
      return (
        '<svg width="' + (args["WIDTH"] + ('" height="' + (args["HEIGHT"] + ('" viewBox="' + ("0 0 " + (args["WIDTH"] + (" " + (args["HEIGHT"] + ('" fill="' + ("none" + ('" xmlns="' + ("http://www.w3.org/2000/svg" + ('">' + args["ELEMENTS"]))))))))))))) + "</svg>"
      );
    }

    line(args) {
      return (
        '<line x1="' + (args["XA"] + ('" y1="' + (args["YA"] + ('" x2="' + (args["XB"] + ('" y2="' + (args["YB"] + ('" stroke-width="' + (args["WIDTH"] + ('" stroke="' + (args["COLOR"] + ('" stroke-dasharray="' + (args["DASH"] + (" " + (args["GAP"] + ('" stroke-linecap="' + (args["LINECAP"] + ('" stroke-opacity="' + (args["OPACITY"] / 100 + '"'))))))))))))))))))) + "/>"
      );
    }

    rect(args) {
      return (
        '<rect x="' + (args["X"] + ('" y="' + (args["Y"] + ('" width="' + (args["WIDTH"] + ('" height="' + (args["HEIGHT"] + ('" rx="' + (args["RADIUS"] + ('" fill="' + (args["FILLCOLOR"] + ('" fill-opacity="' + (args["FILLOPACITY"] / 100 + ('" stroke-width="' + (args["STROKEWIDTH"] + ('" stroke="' + (args["STROKECOLOR"] + ('" stroke-opacity="' + (args["STROKEOPACITY"] / 100 + ('" stroke-dasharray="' + (args["DASH"] + (" " + args["GAP"]) + ('" stroke-linecap="' + (args["LINECAP"] + '"'))))))))))))))))))))))) + "/>"
      );
    }

    ellipse(args) {
      return (
        '<ellipse cx="' + (args["CX"] + ('" cy="' + (args["CY"] + ('" rx="' + (args["WIDTH"] / 2 + ('" ry="' + (args["HEIGHT"] / 2 + ('" fill="' + (args["FILLCOLOR"] + ('" fill-opacity="' + (args["FILLOPACITY"] / 100 + ('" stroke-width="' + (args["STROKEWIDTH"] + ('" stroke="' + (args["STROKECOLOR"] + ('" stroke-opacity="' + (args["STROKEOPACITY"] / 100 + ('" stroke-dasharray="' + (args["DASH"] + (" " + args["GAP"]) + ('" stroke-linecap="' + (args["LINECAP"] + '"'))))))))))))))))))))) + "/>"
      );
    }
    
  }

  Scratch.extensions.register(new svg());
})(Scratch);
