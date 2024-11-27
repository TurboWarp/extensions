// Name: Arrays
// ID: spyroArrays
// Description: Category that can create 2D and 3D arrays and access them.
// By: SpyroStudios <https://scratch.mit.edu/users/SpyroStudios/>

(function (Scratch) {
  "use strict";

  const menuIcon =
    "data:image/png;base64,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";
  const blockIcon2D =
    "data:image/png;base64,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";
  const blockIcon3D =
    "data:image/png;base64,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";

  const BlockType = Scratch.BlockType;
  const ArgumentType = Scratch.ArgumentType;

  class ArraysExtension {
    getInfo() {
      return {
        id: "spyroArrays",
        name: "Arrays",
        color1: "#900C3F",
        color2: "#800b38",
        color3: "#690c2f",
        menuIconURI: menuIcon,
        blocks: [
          // 2D Array Blocks
          {
            blockType: BlockType.LABEL,
            text: "2D Arrays",
          },
          {
            opcode: "create2DArray",
            text: "create 2D array named [NAME] with [ROWS] rows and [COLUMNS] columns",
            blockType: BlockType.COMMAND,
            blockIconURI: blockIcon2D,
            arguments: {
              NAME: {
                type: ArgumentType.STRING,
                defaultValue: "array",
              },
              ROWS: {
                type: ArgumentType.NUMBER,
                defaultValue: 3,
              },
              COLUMNS: {
                type: ArgumentType.NUMBER,
                defaultValue: 3,
              },
            },
          },
          {
            opcode: "set2DArrayValue",
            text: "set value in 2D array [NAME] at row [ROW] column [COLUMN] to [VALUE]",
            blockType: BlockType.COMMAND,
            blockIconURI: blockIcon2D,
            arguments: {
              NAME: {
                type: ArgumentType.STRING,
                defaultValue: "array",
              },
              ROW: {
                type: ArgumentType.NUMBER,
                defaultValue: 1,
              },
              COLUMN: {
                type: ArgumentType.NUMBER,
                defaultValue: 1,
              },
              VALUE: {
                type: ArgumentType.STRING,
                defaultValue: "0",
              },
            },
          },
          {
            opcode: "get2DArrayValue",
            text: "value in 2D array [NAME] at row [ROW] column [COLUMN]",
            blockType: BlockType.REPORTER,
            blockIconURI: blockIcon2D,
            arguments: {
              NAME: {
                type: ArgumentType.STRING,
                defaultValue: "array",
              },
              ROW: {
                type: ArgumentType.NUMBER,
                defaultValue: 1,
              },
              COLUMN: {
                type: ArgumentType.NUMBER,
                defaultValue: 1,
              },
            },
          },
          {
            opcode: "delete2DArray",
            text: "delete 2D array [NAME]",
            blockType: BlockType.COMMAND,
            blockIconURI: blockIcon2D,
            arguments: {
              NAME: {
                type: ArgumentType.STRING,
                defaultValue: "array",
              },
            },
          },
          {
            opcode: "arrayExists2D",
            text: "2D array [NAME] exists?",
            blockType: BlockType.BOOLEAN,
            //blockIconURI: blockIcon2D,
            arguments: {
              NAME: {
                type: ArgumentType.STRING,
                defaultValue: "array",
              },
            },
          },
          {
            opcode: "arrayRowCount2D",
            text: "row count of 2D array [NAME]",
            blockType: BlockType.REPORTER,
            blockIconURI: blockIcon2D,
            arguments: {
              NAME: {
                type: ArgumentType.STRING,
                defaultValue: "array",
              },
            },
          },
          {
            opcode: "arrayColumnCount2D",
            text: "column count of 2D array [NAME]",
            blockType: BlockType.REPORTER,
            blockIconURI: blockIcon2D,
            arguments: {
              NAME: {
                type: ArgumentType.STRING,
                defaultValue: "array",
              },
            },
          },
          {
            opcode: "duplicateArray2D",
            text: "duplicate 2D array [NAME] called [NEWNAME]",
            blockType: BlockType.COMMAND,
            blockIconURI: blockIcon2D,
            arguments: {
              NAME: {
                type: ArgumentType.STRING,
                defaultValue: "array",
              },
              NEWNAME: {
                type: ArgumentType.STRING,
                defaultValue: "newArray",
              },
            },
          },
          {
            opcode: "countOccurrencesOfItem2D",
            text: "count # of item [ITEM] in 2D array [NAME]",
            blockType: BlockType.REPORTER,
            blockIconURI: blockIcon2D,
            arguments: {
              ITEM: {
                type: ArgumentType.STRING,
                defaultValue: "item",
              },
              NAME: {
                type: ArgumentType.STRING,
                defaultValue: "array",
              },
            },
          },
          // 3D Array Blocks
          {
            blockType: BlockType.LABEL,
            text: "3D Arrays",
          },
          {
            opcode: "create3DArray",
            text: "create 3D array named [NAME] with [ROWS] rows, [COLUMNS] columns, and [DEPTH] depth",
            blockType: BlockType.COMMAND,
            blockIconURI: blockIcon3D,
            arguments: {
              NAME: {
                type: ArgumentType.STRING,
                defaultValue: "array",
              },
              ROWS: {
                type: ArgumentType.NUMBER,
                defaultValue: 3,
              },
              COLUMNS: {
                type: ArgumentType.NUMBER,
                defaultValue: 3,
              },
              DEPTH: {
                type: ArgumentType.NUMBER,
                defaultValue: 3,
              },
            },
          },
          {
            opcode: "set3DArrayValue",
            text: "set value in 3D array [NAME] at row [ROW] column [COLUMN] depth [DEPTH] to [VALUE]",
            blockType: BlockType.COMMAND,
            blockIconURI: blockIcon3D,
            arguments: {
              NAME: {
                type: ArgumentType.STRING,
                defaultValue: "array",
              },
              DEPTH: {
                type: ArgumentType.NUMBER,
                defaultValue: 1,
              },
              ROW: {
                type: ArgumentType.NUMBER,
                defaultValue: 1,
              },
              COLUMN: {
                type: ArgumentType.NUMBER,
                defaultValue: 1,
              },
              VALUE: {
                type: ArgumentType.STRING,
                defaultValue: "0",
              },
            },
          },
          {
            opcode: "get3DArrayValue",
            text: "value in 3D array [NAME] at row [ROW] column [COLUMN] depth [DEPTH]",
            blockType: BlockType.REPORTER,
            blockIconURI: blockIcon3D,
            arguments: {
              NAME: {
                type: ArgumentType.STRING,
                defaultValue: "array",
              },
              DEPTH: {
                type: ArgumentType.NUMBER,
                defaultValue: 1,
              },
              ROW: {
                type: ArgumentType.NUMBER,
                defaultValue: 1,
              },
              COLUMN: {
                type: ArgumentType.NUMBER,
                defaultValue: 1,
              },
            },
          },
          {
            opcode: "delete3DArray",
            text: "delete 3D array [NAME]",
            blockType: BlockType.COMMAND,
            blockIconURI: blockIcon3D,
            arguments: {
              NAME: {
                type: ArgumentType.STRING,
                defaultValue: "array",
              },
            },
          },
          {
            opcode: "arrayExists3D",
            text: "3D array [NAME] exists?",
            blockType: BlockType.BOOLEAN,
            //blockIconURI: blockIcon3D,
            arguments: {
              NAME: {
                type: ArgumentType.STRING,
                defaultValue: "array",
              },
            },
          },
          {
            opcode: "arrayRowCount3D",
            text: "row count of 3D array [NAME]",
            blockType: BlockType.REPORTER,
            blockIconURI: blockIcon3D,
            arguments: {
              NAME: {
                type: ArgumentType.STRING,
                defaultValue: "array",
              },
            },
          },
          {
            opcode: "arrayColumnCount3D",
            text: "column count of 3D array [NAME]",
            blockType: BlockType.REPORTER,
            blockIconURI: blockIcon3D,
            arguments: {
              NAME: {
                type: ArgumentType.STRING,
                defaultValue: "array",
              },
            },
          },
          {
            opcode: "arrayDepthCount",
            text: "depth count of 3D array [NAME]",
            blockType: BlockType.REPORTER,
            blockIconURI: blockIcon3D,
            arguments: {
              NAME: {
                type: ArgumentType.STRING,
                defaultValue: "array",
              },
            },
          },
          {
            opcode: "duplicateArray3D",
            text: "duplicate 3D array [NAME] called [NEWNAME]",
            blockType: BlockType.COMMAND,
            blockIconURI: blockIcon3D,
            arguments: {
              NAME: {
                type: ArgumentType.STRING,
                defaultValue: "array",
              },
              NEWNAME: {
                type: ArgumentType.STRING,
                defaultValue: "newArray",
              },
            },
          },
          {
            opcode: "countOccurrencesOfItem3D",
            text: "count # of item [ITEM] in 3D array [NAME]",
            blockType: BlockType.REPORTER,
            blockIconURI: blockIcon3D,
            arguments: {
              ITEM: {
                type: ArgumentType.STRING,
                defaultValue: "item",
              },
              NAME: {
                type: ArgumentType.STRING,
                defaultValue: "array",
              },
            },
          },
        ],
      };
    }

    // Implement methods for 2D and 3D arrays

    // 2D Array Methods
    create2DArray(args, util) {
      const name = `${args.NAME}_2D`;
      const rows = Math.max(1, args.ROWS);
      const columns = Math.max(1, args.COLUMNS);
      const array = [];
      for (let i = 0; i < rows; i++) {
        array[i] = new Array(columns).fill(0);
      }
      util.target.variables[name] = array;
      return array;
    }

    set2DArrayValue(args, util) {
      const row = Math.max(0, args.ROW - 1);
      const column = Math.max(0, args.COLUMN - 1);
      const value = args.VALUE;
      const name = `${args.NAME}_2D`;
      const array = util.target.variables[name];
      if (array && array.length > row && array[row].length > column) {
        array[row][column] = value;
      }
    }

    get2DArrayValue(args, util) {
      const row = Math.max(0, args.ROW - 1);
      const column = Math.max(0, args.COLUMN - 1);
      const name = `${args.NAME}_2D`;
      const array = util.target.variables[name];
      if (array && array.length > row && array[row].length > column) {
        return array[row][column];
      }
      return 0;
    }

    delete2DArray(args, util) {
      const name = `${args.NAME}_2D`;
      if (util.target.variables[name]) {
        delete util.target.variables[name];
      }
    }

    delete3DArray(args, util) {
      const name = `${args.NAME}_3D`;
      if (util.target.variables[name]) {
        delete util.target.variables[name];
      }
    }

    arrayExists2D(args, util) {
      const name = `${args.NAME}_2D`;
      return !!util.target.variables[name];
    }

    arrayRowCount2D(args, util) {
      const name = `${args.NAME}_2D`;
      if (util.target.variables[name]) {
        return util.target.variables[name].length;
      }
      return 0;
    }

    arrayColumnCount2D(args, util) {
      const name = `${args.NAME}_2D`;
      if (util.target.variables[name]) {
        if (util.target.variables[name].length > 0) {
          return util.target.variables[name][0].length;
        }
      }
      return 0;
    }

    duplicateArray2D(args, util) {
      const name = `${args.NAME}_2D`;
      const newName = `${args.NEWNAME}_2D`;
      if (util.target.variables[name]) {
        util.target.variables[newName] = util.target.variables[name].map(
          (row) => [...row]
        );
      }
    }

    countOccurrencesOfItem2D(args, util) {
      const item = args.ITEM;
      const name = `${args.NAME}_2D`;
      let count = 0;
      if (util.target.variables[name]) {
        const array = util.target.variables[name];
        for (const row of array) {
          for (const value of row) {
            if (value === item) {
              count++;
            }
          }
        }
      }
      return count;
    }

    // 3D Array Methods
    create3DArray(args, util) {
      const name = `${args.NAME}_3D`;
      const rows = Math.max(1, args.ROWS);
      const columns = Math.max(1, args.COLUMNS);
      const depth = Math.max(1, args.DEPTH);
      const array = [];
      for (let i = 0; i < rows; i++) {
        array[i] = [];
        for (let j = 0; j < columns; j++) {
          array[i][j] = new Array(depth).fill(0);
        }
      }
      util.target.variables[name] = array;
      return array;
    }

    set3DArrayValue(args, util) {
      const depth = Math.max(0, args.DEPTH - 1);
      const row = Math.max(0, args.ROW - 1);
      const column = Math.max(0, args.COLUMN - 1);
      const value = args.VALUE;
      const name = `${args.NAME}_3D`;
      const array = util.target.variables[name];
      if (
        array &&
        array.length > row &&
        array[row].length > column &&
        array[row][column].length > depth
      ) {
        array[row][column][depth] = value;
      }
    }

    get3DArrayValue(args, util) {
      const depth = Math.max(0, args.DEPTH - 1);
      const row = Math.max(0, args.ROW - 1);
      const column = Math.max(0, args.COLUMN - 1);
      const name = `${args.NAME}_3D`;
      const array = util.target.variables[name];
      if (
        array &&
        array.length > row &&
        array[row].length > column &&
        array[row][column].length > depth
      ) {
        return array[row][column][depth];
      }
      return 0;
    }

    arrayExists3D(args, util) {
      const name = `${args.NAME}_3D`;
      return !!util.target.variables[name];
    }

    arrayRowCount3D(args, util) {
      const name = `${args.NAME}_3D`;
      if (util.target.variables[name]) {
        return util.target.variables[name].length;
      }
      return 0;
    }

    arrayColumnCount3D(args, util) {
      const name = `${args.NAME}_3D`;
      if (util.target.variables[name]) {
        if (util.target.variables[name].length > 0) {
          return util.target.variables[name][0].length;
        }
      }
      return 0;
    }

    arrayDepthCount(args, util) {
      const name = `${args.NAME}_3D`;
      if (util.target.variables[name]) {
        if (
          util.target.variables[name].length > 0 &&
          util.target.variables[name][0].length > 0
        ) {
          return util.target.variables[name][0][0].length;
        }
      }
      return 0;
    }

    duplicateArray3D(args, util) {
      const name = `${args.NAME}_3D`;
      const newName = `${args.NEWNAME}_3D`;
      if (util.target.variables[name]) {
        util.target.variables[newName] = util.target.variables[name].map(
          (row) => row.map((col) => [...col])
        );
      }
    }

    countOccurrencesOfItem3D(args, util) {
      const item = args.ITEM;
      const name = `${args.NAME}_3D`;
      let count = 0;
      if (util.target.variables[name]) {
        const array = util.target.variables[name];
        for (const row of array) {
          for (const col of row) {
            for (const value of col) {
              if (value === item) {
                count++;
              }
            }
          }
        }
      }
      return count;
    }
  }

  Scratch.extensions.register(new ArraysExtension());
})(Scratch);
