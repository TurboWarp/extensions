(function(Scratch) {
  
  const vm = Scratch.vm;
  'use strict';
  class TextBox {
    getInfo () {
      return { 
        id: 'textbox',
        name: 'TextBox',
        blocks: [{
         opcode: 'SetText',
         blockType: Scratch.BlockType.COMMAND,
         text: "Set text [TEXT]",
         arguments: {
          TEXT: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: 'Apple',
          },
          XPOS: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: 0,
          },
          YPOS: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: 0,
          }
        }
        }
      ]
      }
    }
    SetText({TEXT}, util) {
      let svg = '<svg height="30" width="200"><text x="0" y="0" fill="black">'+TEXT+'</text></svg>';
      const target = util.target;
      let skinId;
      if ("__textSkin" in target) {
          skinId = target.__textSkin;
          Scratch.renderer._allSkins[target.__textSkin].setSVG(svg);
      } else {
          target.__textSkin = Scratch.renderer.createSVGSkin(svg);
      }
      const drawableID = target.drawableID;
      Scratch.renderer._allDrawables[drawableID].skin =
          Scratch.renderer._allSkins[target.__textSkin];
  }
  }

  Scratch.extensions.register(new TextBox());
})(Scratch);
