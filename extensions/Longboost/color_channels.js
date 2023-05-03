(function(Scratch) {
const renderer = vm.renderer;
const gl = renderer._gl;
var channel_array = [true, true, true, true];
class LBdrawtest {
  getInfo() {
    return {
      id: 'lbdrawtest',
      name: 'RGB Channels',
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
          opcode: 'enabledCheck',
          blockType: Scratch.BlockType.BOOLEAN,
          text: '[COLOR] channel enabled?',
          arguments: {
              COLOR: {
                  type: Scratch.ArgumentType.STRING,
                  menu: 'COLOR_MENU'
              }
          }
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
  
  enabledCheck({COLOR}) {
      if ((COLOR == 'red' && channel_array[0]) || (COLOR == 'green' && channel_array[1]) || (COLOR == 'blue' && channel_array[2]))  {
		return true;
	  }
      else {
        return false;
      }
  }
  
  draw({R, G, B}) {
    channel_array = [R, G, B, true];
    gl.colorMask(channel_array[0],channel_array[1],channel_array[2],channel_array[3]);
    vm.renderer.dirty = true
  }
  
  drawOneColor({COLOR}) {
    if (COLOR == 'red') {
        channel_array = [true, false, false, true];
    } else if (COLOR == 'green') {
        channel_array = [true, false, false, true];
    } else {
    channel_array = [true, false, false, true];    
    }
    gl.colorMask(channel_array[0],channel_array[1],channel_array[2],channel_array[3]);
    vm.renderer.dirty = true
  }
  
  drawDepth({DRAW}) {
    gl.depthMask(DRAW);
    vm.renderer.dirty = true
  }
  
  clearEffects() {
    channel_array = [true, true, true, true];
    gl.colorMask(channel_array[0],channel_array[1],channel_array[2],channel_array[3]);
    gl.depthMask(true);
    vm.renderer.dirty = true
  }
}

Scratch.extensions.register(new LBdrawtest());
})(Scratch);