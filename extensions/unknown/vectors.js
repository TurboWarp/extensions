// Name: Vectors
// ID: unknownvectors
// Description: variables with a direction.
// By: Unknown07724 <https://scratch.mit.edu/users/Unknown07724/>
// License: MPL-2.0

(function (Scratch) {
  "use strict";

  const Vectoricon =
    "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIzNi43OTk1IiBoZWlnaHQ9IjMyLjI0ODkxIiB2aWV3Qm94PSIwLDAsMzYuNzk5NSwzMi4yNDg5MSI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIxOC40NzA2OCwtMTY1LjYwMTIyKSI+PGcgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIj48Zz48cGF0aCBkPSJNMjMxLjA4MzA0LDE4NC4yMDMxbDExLjgxMjk2LC0xNC44NjI4NWw3Ljc2Mzc1LDcuNzYzNzVsLTE1Ljk5NTY2LDExLjAyODd6IiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMSIvPjxwYXRoIGQ9Ik0yNTQuNzcwMTgsMTY2LjEwMTIybDAsMTcuNDI3OTRsLTE3LjQyNzk0LC0xNy40Mjc5NHoiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIxIi8+PHBhdGggZD0iTTI0MS42NDkzMywxNzIuNjI0MWw1LjE2NjY2LC0zLjUwOTEzbDQuNTM4MzMsNi45NTg4MSwtNS4xNjY2NiwzLjUwOTEzeiIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjAiLz48cGF0aCBkPSJNMjQxLjQyMTQ5LDE3Mi4wNzE2M2wyLjU4ODU5LC0zLjQ2NzY4bDEuMjMzODIsMC45ODk2M2wtMy40MTg4NCwzLjQxODg0eiIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjAiLz48L2c+PHRleHQgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjE4LjU5NTY4LDE5MS43MjUxMykgc2NhbGUoMC41LDAuNSkiIGZvbnQtc2l6ZT0iNDAiIHhtbDpzcGFjZT0icHJlc2VydmUiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIwLjUiIGZvbnQtZmFtaWx5PSJTYW5zIFNlcmlmIiBmb250LXdlaWdodD0ibm9ybWFsIiB0ZXh0LWFuY2hvcj0ic3RhcnQiPjx0c3BhbiB4PSIwIiBkeT0iMCI+MS4yPC90c3Bhbj48L3RleHQ+PC9nPjwvc3ZnPg==";

  // Unsandboxed check
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
        blocksIconURL: Vectoricon,
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
            text: Scratch.translate("delete vector with [ID]"),
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
            text: Scratch.translate("magnitude of vector [ID]"),
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "vec1" },
            },
          },
          {
            opcode: "listOfIDs",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("List of IDs"),
          },
          {
            opcode: "vectorDir",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("direction of vector [ID]"),
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "vec1" },
            },
          },
        ],
      };
    }

    vectorCreate(args) {
      const id = Scratch.Cast.toString(args.ID);
      if (!ids.includes(id)) ids.push(id);
      directions[id] = Scratch.Cast.toNumber(args.DIRECTION);
      magnitudes[id] = Scratch.Cast.toNumber(args.MAGNITUDE);
    }

    vectorChange(args) {
      const id = Scratch.Cast.toString(args.ID);
      directions[id] = Scratch.Cast.toNumber(args.DIRECTION);
      magnitudes[id] = Scratch.Cast.toNumber(args.MAGNITUDE);
    }

    vectorChangedir(args) {
      const id = Scratch.Cast.toString(args.ID);
      directions[id] = Scratch.Cast.toNumber(args.DIRECTION);
    }

    vectorChangeMag(args) {
      const id = Scratch.Cast.toString(args.ID);
      magnitudes[id] = Scratch.Cast.toNumber(args.MAGNITUDE);
    }

    vectorMag(args) {
      const id = Scratch.Cast.toString(args.ID);
      return magnitudes[id] !== undefined
        ? magnitudes[id]
        : Scratch.translate("null");
    }

    vectorDelete(args) {
      const id = Scratch.Cast.toString(args.ID);
      const index = ids.indexOf(id);
      if (index !== -1) {
        ids.splice(index, 1);
        delete directions[id];
        delete magnitudes[id];
      }
    }

    vectorDir(args) {
      const id = Scratch.Cast.toString(args.ID);
      return directions[id] !== undefined
        ? directions[id]
        : Scratch.translate("null");
    }

    listofIDs() {
      return ids.join(", ");
    }
  }

  Scratch.extensions.register(new UnknownVectors());
})(Scratch);
