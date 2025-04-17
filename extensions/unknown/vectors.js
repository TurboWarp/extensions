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
        color1: "#3495eb",
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
            opcode: "vectorChangeMag",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "change vector [ID]'s magnitude to [MAGNITUDE]"
            ),
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "vec1" },
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
            opcode: "vectorDelete",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "Delete vector with [ID]"
            ),
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "vec1" },
            },
          },
          {
            opcode: "vectorChangedir",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "change vector [ID]'s direction to [DIRECTION]"
            ),
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "vec1" },
              DIRECTION: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 90,
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
    vectorChangedir(args) {
      const id = args.ID;
      directions[id] = args.DIRECTION;
    }

    vectorChangeMag(args) {
      const id = args.ID;
      magnitudes[id] = args.MAGNITUDE;
    }

    vectorMag(args) {
      const id = args.ID;
      return magnitudes[id] ?? Scratch.translate("vector not found");
    }
    vectordelete(args) {
      const id = args.ID;
    const index = ids.indexOf(id);
    if (index !== -1) {
      ids.splice(index, 1);
      delete directions[id];
      delete magnitudes[id];
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
