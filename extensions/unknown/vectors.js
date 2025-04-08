let ids = [];
let directions = {};
let magnitudes = {};

class unknownvectors {
  getInfo() {
    return {
      color1: "#3495eb",
      id: 'unknownvectors',
      name: 'Vectors',
      blocks: [
        {
          opcode: 'vectorCreate',
          blockType: Scratch.BlockType.COMMAND,
          text: 'create vector with ID [ID], direction [DIRECTION] and magnitude [MAGNITUDE]',
          arguments: {
            ID: { type: Scratch.ArgumentType.STRING, defaultValue: 'vec1' },
            DIRECTION: { type: Scratch.ArgumentType.NUMBER, defaultValue: 90 },
            MAGNITUDE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 }
          }
        },
        {
          opcode: 'vectorChange',
          blockType: Scratch.BlockType.COMMAND,
          text: 'change vector [ID] to direction [DIRECTION] and magnitude [MAGNITUDE]',
          arguments: {
            ID: { type: Scratch.ArgumentType.STRING, defaultValue: 'vec1' },
            DIRECTION: { type: Scratch.ArgumentType.NUMBER, defaultValue: 90 },
            MAGNITUDE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 }
          }
        },
        {
          opcode: 'vectorMag',
          blockType: Scratch.BlockType.REPORTER,
          text: 'Mag of vector [ID]',
          arguments: {
            ID: { type: Scratch.ArgumentType.STRING, defaultValue: 'vec1' }
          }
        },
        {
          opcode: 'listofIDs',
          blockType: Scratch.BlockType.REPORTER,
          text: 'List of IDs',
        },
        {
          opcode: 'vectorDir',
          blockType: Scratch.BlockType.REPORTER,
          text: 'direction of vector [ID]',
          arguments: {
            ID: { type: Scratch.ArgumentType.STRING, defaultValue: 'vec1' }
          }
        }
      ]
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
    return magnitudes[id] ?? 'vector not found';
  }

  vectorDir(args) {
    const id = args.ID;
    return directions[id] ?? 'vector not found';
  }

  listofIDs() {
    return ids.join(', ');
  }
}

Scratch.extensions.register(new unknownvectors());
