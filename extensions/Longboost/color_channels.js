(function(Scratch) {
const renderer = vm.renderer;
const gl = renderer._gl;
class LBdrawtest {
  getInfo() {
    return {
      id: 'lbdrawtest',
      name: 'Draw Test',
	  color1: '#aaaaaa',
	  color2: '#888888',
	  color3: '#888888',
      blocks: [
		{
          opcode: 'true',
          blockType: Scratch.BlockType.BOOLEAN,
          text: 'true'
        },
		{
          opcode: 'false',
          blockType: Scratch.BlockType.BOOLEAN,
          text: 'false',
		  hideFromPalette: true
        },
        {
          opcode: 'draw',
          blockType: Scratch.BlockType.COMMAND,
          text: 'only draw colors:[R]green:[G]blue:[B]',
		  arguments: {
			  R: {
				  type: Scratch.ArgumentType.BOOLEAN
			  },
			  G: {
				  type: Scratch.ArgumentType.BOOLEAN
			  },
			  B: {
				  type: Scratch.ArgumentType.BOOLEAN
			  }
		  }
        },
        {
          opcode: 'drawOneColor',
          blockType: Scratch.BlockType.COMMAND,
          text: 'only draw [COLOR]',
		  arguments: {
            COLOR: {
              type: Scratch.ArgumentType.STRING,
              menu: 'COLOR_MENU'
            }
		  }
        },
        {
          opcode: 'drawDepth',
          blockType: Scratch.BlockType.COMMAND,
          text: 'enable depth mask?[DRAW]',
		  hideFromPalette: true,
		  arguments: {
			  DRAW: {
				  type: Scratch.ArgumentType.BOOLEAN
			  }
		  }
        },
		{
          opcode: 'clearEffects',
          blockType: Scratch.BlockType.COMMAND,
          text: 'clear color draw effects',
        }
      ],
	  menus: {
       COLOR_MENU: {
          acceptReporters: true,
          items: ['red','green','blue']
        }
      }
    };
  }

  true() {
	return true;
  }

  false() {
	return false;
  }
  
  draw({R, G, B}) {
	gl.colorMask(R, G, B, true);
	vm.renderer.dirty = true
  }
  
  drawOneColor({COLOR}) {
    if (COLOR == 'red') {
		gl.colorMask(true, false, false, true);
	} else if (COLOR == 'green') {
		gl.colorMask(false, true, false, true);
	} else {
		gl.colorMask(false, false, true, true);
	}
	vm.renderer.dirty = true
  }
  
  drawDepth({DRAW}) {
	gl.depthMask(DRAW);
	vm.renderer.dirty = true
  }
  
  clearEffects() {
	gl.colorMask(true, true, true, true)
	gl.depthMask(true);
	vm.renderer.dirty = true
  }
}

Scratch.extensions.register(new LBdrawtest());
})(Scratch);