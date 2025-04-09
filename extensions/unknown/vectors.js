// Name: Vectors
// ID: unknownvectors
// Description: variables with a direction.
// By: Unknown07724 <https://scratch.mit.edu/users/Unknown07724/>
// License: MPL-2.0

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("This extension must run unsandboxed");
  }

  const ids = [];
  const directions = {};
  const magnitudes = {};

  class UnknownVectors {
    getInfo() {
      return {
        id: "unknownvectors",
        name: Scratch.translate("Vectors"),
        color1: "#275efe",
        blocks: [
          {
            opcode: "vectorCreate",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "create vector with ID [ID], direction [DIRECTION] and magnitude [MAGNITUDE]"
            ),
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "vec1" },
              DIRECTION: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 90,
              },
              MAGNITUDE: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 10,
              },
            },
          },
          {
            opcode: "vectorChange",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "change vector [ID] to direction [DIRECTION] and magnitude [MAGNITUDE]"
            ),
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "vec1" },
              DIRECTION: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 90,
              },
              MAGNITUDE: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 10,
              },
            },
          },
          {
            opcode: "vectorMag",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("Magnitude of vector [ID]"),
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "vec1" },
            },
          },
          {
            opcode: "listofIDs",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("List of IDs"),
          },
          {
            opcode: "vectorDir",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("Direction of vector [ID]"),
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "vec1" },
            },
          },
        ],
      };
    }

    vectorCreate(args) {
      const id = args.ID;
      if (!ids.includes(id)) {
        ids.push(id);
      }
      directions[id] = args.DIRECTION;
      magnitudes[id] = args.MAGNITUDE;
    }

    vectorChange(args) {
      const id = args.ID;
      directions[id] = args.DIRECTION;
      magnitudes[id] = args.MAGNITUDE;
    }

    vectorMag(args) {
      const id = args.ID;
      return magnitudes[id] ?? Scratch.translate("vector not found");
    }

    vectorDir(args) {
      const id = args.ID;
      return directions[id] ?? Scratch.translate("vector not found");
    }

    listofIDs() {
      return ids.join(", ");
    }
  }

  Scratch.extensions.register(new UnknownVectors());
})(Scratch);
