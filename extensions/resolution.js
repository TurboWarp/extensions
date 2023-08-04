class Resolution {
    getInfo() {
      return {
        id: 'resolution',
        name: 'Screen resolution',
        color1: '#FFAB19',
        color2: '#EC9C13',
        color3: '#CF8B17',
        blocks: [
          {
            opcode: 'getWidth',
            text: 'Get width',
            blockType: Scratch.BlockType.REPORTER
          },
          {
            opcode: 'getHeight',
            text: 'Get height',
            blockType: Scratch.BlockType.REPORTER
          }
        ]
      };
    }
    getWidth() {
      return window.screen.width;
    }
    getHeight() {
      return window.screen.height;
    }
  }
Scratch.extensions.register(new Resolution());