if (!Scratch.extensions.unsandboxed) {
  throw new Error('This extension must run unsandboxed');
}

class WindowUtils {
  getInfo() {
    return {
      id: 'BDWindowUtils',
      name: 'Window Utils',
      color1: '#8c9abf',
      color2: '#7d8aab',
      color3: '#6f7b99',
      
      blocks: [
        {
          opcode: 'moveTo',
          blockType: Scratch.BlockType.COMMAND,
          text: 'move window to x: [X] y: [Y]',
          arguments: {
            X: {type: Scratch.ArgumentType.STRING, defaultValue: '0'},
            Y: {type: Scratch.ArgumentType.STRING, defaultValue: '0'},
          }
        },
        {
          opcode: 'moveByX',
          blockType: Scratch.BlockType.COMMAND,
          text: 'move window x by [X]',
          arguments: {
            X: {type: Scratch.ArgumentType.STRING, defaultValue: '50'},
          }
        },
        {
          opcode: 'moveByY',
          blockType: Scratch.BlockType.COMMAND,
          text: 'move window y by [Y]',
          arguments: {
            Y: {type: Scratch.ArgumentType.STRING, defaultValue: '50'},
          }
        },
        {
          opcode: 'windowX',
          blockType: Scratch.BlockType.REPORTER,
          text: 'window x',
        },
        {
          opcode: 'windowY',
          blockType: Scratch.BlockType.REPORTER,
          text: 'window y',
        },

        '---',
        
        {
          opcode: 'resizeTo',
          blockType: Scratch.BlockType.COMMAND,
          text: 'resize window to w: [W] h: [H]',
          arguments: {
            W: {type: Scratch.ArgumentType.STRING, defaultValue: '1000'},
            H: {type: Scratch.ArgumentType.STRING, defaultValue: '1000'},
          }
        },
        {
          opcode: 'resizeByW',
          blockType: Scratch.BlockType.COMMAND,
          text: 'change window width by [W]',
          arguments: {
            W: {type: Scratch.ArgumentType.STRING, defaultValue: '50'},
          }
        },
        {
          opcode: 'resizeByH',
          blockType: Scratch.BlockType.COMMAND,
          text: 'change window height by [H]',
          arguments: {
            H: {type: Scratch.ArgumentType.STRING, defaultValue: '50'},
          }
        },
        {
          opcode: 'windowW',
          blockType: Scratch.BlockType.REPORTER,
          text: 'window width',
        },
        {
          opcode: 'windowH',
          blockType: Scratch.BlockType.REPORTER,
          text: 'window height',
        },
        
        '---',

        {
          opcode: 'changeTitleTo',
          blockType: Scratch.BlockType.COMMAND,
          text: 'set window title to [TITLE]',
          arguments: {
            TITLE: {type: Scratch.ArgumentType.STRING, defaultValue: 'Hello World!'},
          }
        },
        {
          opcode: 'windowTitle',
          blockType: Scratch.BlockType.REPORTER,
          text: 'window title',
        },
      ],
    };
  }

  moveTo (args) {
    window.moveTo(args.X, args.Y);
  }

  moveByX (args) {
    moveBy(args.X, 0);
  }

  moveByY (args) {
    moveBy(0, args.Y);
  }

  windowX (args) {
    return (window.screenLeft);
  }

  windowY (args) {
    return (window.screenTop);
  }

  resizeTo (args) {
    resizeTo(args.W, args.H);
  }

  resizeByW (args) {
    resizeBy(args.W, 0);
  }

  resizeByH (args) {
    resizeBy(0, args.H);
  }

  windowW (args) {
    return (window.outerWidth);
  }

  windowH (args) {
    return (window.outerHeight);
  }
  
  changeTitleTo (args) {
    document.title = args.TITLE;
  }

  windowTitle (args) {
    return (document.title);
  }
}
Scratch.extensions.register(new WindowUtils());
