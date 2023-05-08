(function(Scratch) {
  'use strict';
  class DataAnalysis {
    getInfo() {
      return {
        id: 'qxsckdataanalysis',
        name: 'Data Analysis',
        blocks: [
          {
            opcode: 'average',
            blockType: Scratch.BlockType.REPORTER,
            text: 'average of [NUMBERS]',
            arguments: {
              NUMBERS: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '1 2 3 4 5'
              }
            }
          },
          {
            opcode: 'maximum',
            blockType: Scratch.BlockType.REPORTER,
            text: 'maximum of [NUMBERS]',
            arguments: {
              NUMBERS: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '1 2 3 4 5'
              }
            }
          },
          {
            opcode: 'minimum',
            blockType: Scratch.BlockType.REPORTER,
            text: 'minimum of [NUMBERS]',
            arguments: {
              NUMBERS: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '1 2 3 4 5'
              }
            }
          },
          {
            opcode: 'median',
            blockType: Scratch.BlockType.REPORTER,
            text: 'median of [NUMBERS]',
            arguments: {
              NUMBERS: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '1 2 3 4 5'
              }
            }
          },
          {
            opcode: 'mode',
            blockType: Scratch.BlockType.REPORTER,
            text: 'mode of [NUMBERS]',
            arguments: {
              NUMBERS: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '1 2 2 3 4 5'
              }
            }
          },
          {
            opcode: 'variance',
            blockType: Scratch.BlockType.REPORTER,
            text: 'variance of [NUMBERS]',
            arguments: {
              NUMBERS: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '1 2 3 4 5'
              }
            }
          }
        ]
      };
    }

    average(args) {
      const numbers = Scratch.Cast.toString(args.NUMBERS).split(' ').map(Number);
      const sum = numbers.reduce((a, b) => a + b, 0);
      return sum / numbers.length;
    }

    maximum(args) {
      const numbers = Scratch.Cast.toString(args.NUMBERS).split(' ').map(Number);
      return Math.max(...numbers);
    }

    minimum(args) {
      const numbers = Scratch.Cast.toString(args.NUMBERS).split(' ').map(Number);
      return Math.min(...numbers);
    }

    median(args) {
      const numbers = Scratch.Cast.toString(args.NUMBERS).split(' ').map(Number);
      const sorted = numbers.sort((a, b) => a - b);
      const middle = Math.floor(sorted.length / 2);
      if (sorted.length % 2 === 0) {
        return (sorted[middle - 1] + sorted[middle]) / 2;
      } else {
        return sorted[middle];
      }
    }

    mode(args) {
      const numbers = Scratch.Cast.toString(args.NUMBERS).split(' ').map(Number);
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
      const numbers = Scratch.Cast.toString(args.NUMBERS).split(' ').map(Number);
      const mean = this.average(args);
      const squaredDifferences = numbers.map(x => (x - mean) ** 2);
      const sum = squaredDifferences.reduce((a, b) => a + b, 0);
      return sum / numbers.length;
    }
  }
  Scratch.extensions.register(new DataAnalysis());
}(Scratch));
