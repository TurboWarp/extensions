// Name: Data Analysis
// ID: qxsckdataanalysis
// Description: Blocks to compute means, medians, maximums, minimums, variances, and modes.
// By: qxsck <https://scratch.mit.edu/users/qxsck/>
// License: MIT

(function (Scratch) {
  "use strict";
  class dataAnalysis {
    getInfo() {
      return {
        id: "qxsckdataanalysis",
        name: Scratch.translate({ id: "name", default: "Data Analysis" }),
        blocks: [
          {
            opcode: "sum",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate({
              id: "sum",
              default: "sum of [NUMBERS]",
            }),
            arguments: {
              NUMBERS: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "1 2 3 4 5",
              },
            },
          },
          {
            opcode: "average",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate({
              id: "average",
              default: "average of [NUMBERS]",
            }),
            arguments: {
              NUMBERS: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "1 2 3 4 5",
              },
            },
          },
          {
            opcode: "maximum",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate({
              id: "maximum",
              default: "maximum of [NUMBERS]",
            }),
            arguments: {
              NUMBERS: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "1 2 3 4 5",
              },
            },
          },
          {
            opcode: "minimum",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate({
              id: "minimum",
              default: "minimum of [NUMBERS]",
            }),
            arguments: {
              NUMBERS: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "1 2 3 4 5",
              },
            },
          },
          {
            opcode: "median",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate({
              id: "median",
              default: "median of [NUMBERS]",
            }),
            arguments: {
              NUMBERS: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "1 2 3 4 5",
              },
            },
          },
          {
            opcode: "mode",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate({
              id: "mode",
              default: "mode of [NUMBERS]",
            }),
            arguments: {
              NUMBERS: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "1 2 2 3 4 5",
              },
            },
          },
          {
            opcode: "variance",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate({
              id: "variance",
              default: "variance of [NUMBERS]",
            }),
            arguments: {
              NUMBERS: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "1 2 3 4 5",
              },
            },
          },
        ],
      };
    }

    sum(args) {
      const numbers = Scratch.Cast.toString(args.NUMBERS)
        .split(" ")
        .map(Number);
      return numbers.reduce((a, b) => a + b, 0);
    }

    average(args) {
      const numbers = Scratch.Cast.toString(args.NUMBERS)
        .split(" ")
        .map(Number);
      const sum = numbers.reduce((a, b) => a + b, 0);
      return sum / numbers.length;
    }

    // Spread is not used due to overflow. Code from below.
    // https://github.com/TurboWarp/extensions/pull/1907/commits/a262bb202fd92aff9b3b38eb3f648ff1b485692d
    maximum(args) {
      const numbers = Scratch.Cast.toString(args.NUMBERS)
        .split(" ")
        .map(Number);
      let max = 0;
      for (
        let i = numbers.length - 1, num = numbers[i];
        i >= 0;
        i--, num = numbers[i]
      ) {
        if (num < max) continue;
        max = num;
      }
      return max;
    }

    minimum(args) {
      const numbers = Scratch.Cast.toString(args.NUMBERS)
        .split(" ")
        .map(Number);
      let min = Infinity;
      for (
        let i = list.length - 1, num = list[i];
        i >= 0;
        i--, num = list[i]
      ) {
        if (num > min) continue;
        min = num;
      }
      return min;
    }

    median(args) {
      const numbers = Scratch.Cast.toString(args.NUMBERS)
        .split(" ")
        .map(Number);
      const sorted = numbers.sort((a, b) => a - b);
      const middle = Math.floor(sorted.length / 2);
      if (sorted.length % 2 === 0) {
        return (sorted[middle - 1] + sorted[middle]) / 2;
      } else {
        return sorted[middle];
      }
    }

    mode(args) {
      const numbers = Scratch.Cast.toString(args.NUMBERS)
        .split(" ")
        .map(Number);
      const counts = new Map();
      let maxCount = 0;
      let mode = null;
      for (const number of numbers) {
        let count = counts.get(number) || 0;
        count++;
        counts.set(number, count);
        if (count > maxCount) {
          maxCount = count;
          mode = number;
        }
      }
      return mode;
    }

    variance(args) {
      const numbers = Scratch.Cast.toString(args.NUMBERS)
        .split(" ")
        .map(Number);
      const mean = this.average(args);
      const squaredDifferences = numbers.map((x) => (x - mean) ** 2);
      const sum = squaredDifferences.reduce((a, b) => a + b, 0);
      return sum / numbers.length;
    }
  }

  Scratch.extensions.register(new dataAnalysis());
})(Scratch);
