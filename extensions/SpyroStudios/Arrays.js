// Name: Arrays
// ID: spyroArrays
// Description: Category that can create 2D and 3D arrays and access them.
// By: SpyroStudios <https://scratch.mit.edu/users/SpyroStudios/>

(function (Scratch) {
  "use strict";

  const vm = Scratch.vm;
  const runtime = vm.runtime;

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
        blocks: [
          // 2D Array Blocks
          {
            blockType: Scratch.BlockType.LABEL,
            text: "2D Arrays",
          },
          {
            opcode: "create2DArray",
            text: "create 2D array named [NAME] with [ROWS] rows and [COLUMNS] columns",
            blockType: BlockType.COMMAND,
            arguments: {
              NAME: {
                type: ArgumentType.STRING,
                defaultValue: "array"
              },
              ROWS: {
                type: ArgumentType.NUMBER,
                defaultValue: 3
              },
              COLUMNS: {
                type: ArgumentType.NUMBER,
                defaultValue: 3
              }
            }
          },
          {
            opcode: "set2DArrayValue",
            text: "set value in 2D array [NAME] at row [ROW] column [COLUMN] to [VALUE]",
            blockType: BlockType.COMMAND,
            arguments: {
              NAME: {
                type: ArgumentType.STRING,
                defaultValue: "array"
              },
              ROW: {
                type: ArgumentType.NUMBER,
                defaultValue: 1
              },
              COLUMN: {
                type: ArgumentType.NUMBER,
                defaultValue: 1
              },
              VALUE: {
                type: ArgumentType.STRING,
                defaultValue: "0"
              }
            }
          },
          {
            opcode: "get2DArrayValue",
            text: "value in 2D array [NAME] at row [ROW] column [COLUMN]",
            blockType: BlockType.REPORTER,
            arguments: {
              NAME: {
                type: ArgumentType.STRING,
                defaultValue: "array"
              },
              ROW: {
                type: ArgumentType.NUMBER,
                defaultValue: 1
              },
              COLUMN: {
                type: ArgumentType.NUMBER,
                defaultValue: 1
              }
            }
          },
          {
            opcode: "arrayExists2D",
            text: "2D array [NAME] exists?",
            blockType: BlockType.BOOLEAN,
            arguments: {
              NAME: {
                type: ArgumentType.STRING,
                defaultValue: "array"
              }
            }
          },
          {
            opcode: "arrayRowCount2D",
            text: "row count of 2D array [NAME]",
            blockType: BlockType.REPORTER,
            arguments: {
              NAME: {
                type: ArgumentType.STRING,
                defaultValue: "array"
              }
            }
          },
          {
            opcode: "arrayColumnCount2D",
            text: "column count of 2D array [NAME]",
            blockType: BlockType.REPORTER,
            arguments: {
              NAME: {
                type: ArgumentType.STRING,
                defaultValue: "array"
              }
            }
          },
          {
            opcode: "duplicateArray2D",
            text: "duplicate 2D array [NAME] called [NEWNAME]",
            blockType: BlockType.COMMAND,
            arguments: {
              NAME: {
                type: ArgumentType.STRING,
                defaultValue: "array"
              },
              NEWNAME: {
                type: ArgumentType.STRING,
                defaultValue: "newArray"
              }
            }
          },
          {
            opcode: "countOccurrencesOfItem2D",
            text: "count # of item [ITEM] in 2D array [NAME]",
            blockType: BlockType.REPORTER,
            arguments: {
              ITEM: {
                type: ArgumentType.STRING,
                defaultValue: "item"
              },
              NAME: {
                type: ArgumentType.STRING,
                defaultValue: "array"
              }
            }
          },
          // 3D Array Blocks
          {
            blockType: Scratch.BlockType.LABEL,
            text: "3D Arrays",
          },
          {
            opcode: "create3DArray",
            text: "create 3D array named [NAME] with [ROWS] rows, [COLUMNS] columns, and [DEPTH] depth",
            blockType: BlockType.COMMAND,
            arguments: {
              NAME: {
                type: ArgumentType.STRING,
                defaultValue: "array"
              },
              ROWS: {
                type: ArgumentType.NUMBER,
                defaultValue: 3
              },
              COLUMNS: {
                type: ArgumentType.NUMBER,
                defaultValue: 3
              },
              DEPTH: {
                type: ArgumentType.NUMBER,
                defaultValue: 3
              }
            }
          },
          {
            opcode: "set3DArrayValue",
            text: "set value in 3D array [NAME] at row [ROW] column [COLUMN] depth [DEPTH] to [VALUE]",
            blockType: BlockType.COMMAND,
            arguments: {
              NAME: {
                type: ArgumentType.STRING,
                defaultValue: "array"
              },
              DEPTH: {
                type: ArgumentType.NUMBER,
                defaultValue: 1
              },
              ROW: {
                type: ArgumentType.NUMBER,
                defaultValue: 1
              },
              COLUMN: {
                type: ArgumentType.NUMBER,
                defaultValue: 1
              },
              VALUE: {
                type: ArgumentType.STRING,
                defaultValue: "0"
              }
            }
          },
          {
            opcode: "get3DArrayValue",
            text: "value in 3D array [NAME] at row [ROW] column [COLUMN] depth [DEPTH]",
            blockType: BlockType.REPORTER,
            arguments: {
              NAME: {
                type: ArgumentType.STRING,
                defaultValue: "array"
              },
              DEPTH: {
                type: ArgumentType.NUMBER,
                defaultValue: 1
              },
              ROW: {
                type: ArgumentType.NUMBER,
                defaultValue: 1
              },
              COLUMN: {
                type: ArgumentType.NUMBER,
                defaultValue: 1
              }
            }
          },
          {
            opcode: "arrayExists3D",
            text: "3D array [NAME] exists?",
            blockType: BlockType.BOOLEAN,
            arguments: {
              NAME: {
                type: ArgumentType.STRING,
                defaultValue: "array"
              }
            }
          },
          {
            opcode: "arrayRowCount3D",
            text: "row count of 3D array [NAME]",
            blockType: BlockType.REPORTER,
            arguments: {
              NAME: {
                type: ArgumentType.STRING,
                defaultValue: "array"
              }
            }
          },
          {
            opcode: "arrayColumnCount3D",
            text: "column count of 3D array [NAME]",
            blockType: BlockType.REPORTER,
            arguments: {
              NAME: {
                type: ArgumentType.STRING,
                defaultValue: "array"
              }
            }
          },
          {
            opcode: "arrayDepthCount",
            text: "depth count of 3D array [NAME]",
            blockType: BlockType.REPORTER,
            arguments: {
              NAME: {
                type: ArgumentType.STRING,
                defaultValue: "array"
              }
            }
          },
          {
            opcode: "duplicateArray3D",
            text: "duplicate 3D array [NAME] called [NEWNAME]",
            blockType: BlockType.COMMAND,
            arguments: {
              NAME: {
                type: ArgumentType.STRING,
                defaultValue: "array"
              },
              NEWNAME: {
                type: ArgumentType.STRING,
                defaultValue: "newArray"
              }
            }
          },
          {
            opcode: "countOccurrencesOfItem3D",
            text: "count # of item [ITEM] in 3D array [NAME]",
            blockType: BlockType.REPORTER,
            arguments: {
              ITEM: {
                type: ArgumentType.STRING,
                defaultValue: "item"
              },
              NAME: {
                type: ArgumentType.STRING,
                defaultValue: "array"
              }
            }
          }
        ]
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

    arrayExists2D(args, util) {
      const name = `${args.NAME}_2D`;
      return !!util.target.variables[name];
    }

    arrayRowCount2D(args, util) {
      const name = `${args.NAME}_2D`;
      if (!!util.target.variables[name]) {
        return util.target.variables[name].length;
      }
      return 0;
    }

    arrayColumnCount2D(args, util) {
      const name = `${args.NAME}_2D`;
      if (!!util.target.variables[name]) {
        if (util.target.variables[name].length > 0) {
          return util.target.variables[name][0].length;
        }
      }
      return 0;
    }

    duplicateArray2D(args, util) {
      const name = `${args.NAME}_2D`;
      const newName = `${args.NEWNAME}_2D`;
      if (!!util.target.variables[name]) {
        util.target.variables[newName] = util.target.variables[name].map(row => [...row]);
      }
    }

    countOccurrencesOfItem2D(args, util) {
      const item = args.ITEM;
      const name = `${args.NAME}_2D`;
      let count = 0;
      if (!!util.target.variables[name]) {
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
      if (array && array.length > row && array[row].length > column && array[row][column].length > depth) {
        array[row][column][depth] = value;
      }
    }

    get3DArrayValue(args, util) {
      const depth = Math.max(0, args.DEPTH - 1);
      const row = Math.max(0, args.ROW - 1);
      const column = Math.max(0, args.COLUMN - 1);
      const name = `${args.NAME}_3D`;
      const array = util.target.variables[name];
      if (array && array.length > row && array[row].length > column && array[row][column].length > depth) {
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
      if (!!util.target.variables[name]) {
        return util.target.variables[name].length;
      }
      return 0;
    }

    arrayColumnCount3D(args, util) {
      const name = `${args.NAME}_3D`;
      if (!!util.target.variables[name]) {
        if (util.target.variables[name].length > 0) {
          return util.target.variables[name][0].length;
        }
      }
      return 0;
    }

    arrayDepthCount(args, util) {
      const name = `${args.NAME}_3D`;
      if (!!util.target.variables[name]) {
        if (util.target.variables[name].length > 0 && util.target.variables[name][0].length > 0) {
          return util.target.variables[name][0][0].length;
        }
      }
      return 0;
    }

    duplicateArray3D(args, util) {
      const name = `${args.NAME}_3D`;
      const newName = `${args.NEWNAME}_3D`;
      if (!!util.target.variables[name]) {
        util.target.variables[newName] = util.target.variables[name].map(row => row.map(col => [...col]));
      }
    }

    countOccurrencesOfItem3D(args, util) {
      const item = args.ITEM;
      const name = `${args.NAME}_3D`;
      let count = 0;
      if (!!util.target.variables[name]) {
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
