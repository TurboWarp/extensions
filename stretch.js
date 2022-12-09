(function(Scratch) {
  'use strict';
  const vm = Scratch.vm;

  class morescale {
    getInfo () {
      return {
        id: 'moreScale',
        name: 'Stretch',
        blocks: [
          {
            opcode: 'setStretch',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set stretch to width: [SIZEX] height: [SIZEY]',
            arguments: {
              SIZEX: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100
              },
              SIZEY: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100
              }
            }
          },
		  {
			  opcode: 'getWidth',
			  blockType: Scratch.BlockType.REPORTER,
			  text: 'width'
		  },
		  {
			  opcode: 'getHeight',
			  blockType: Scratch.BlockType.REPORTER,
			  text: 'height'
		  }
        ]
      };
    }

    setStretch (args, util) {
		util.target.scalex = args["SIZEX"];
		util.target.scaley = args["SIZEY"];
        if (util.target.renderer) {
			
			let finalScale = [util.target.size * util.target.scalex / 100, util.target.size * util.target.scaley / 100];
			if (util.target.rotationStyle === 'left-right' && util.target.direction < 0) {
				finalScale[0] *= -1;
			}
			util.target.renderer.updateDrawableProperties(util.target.drawableID, {scale: finalScale});
			
            if (util.target.visible) {
                util.target.runtime.requestRedraw();
            }
        }
    }
	
	getWidth (args, util) {
		if (typeof util.target.scalex == 'undefined') {
			util.target.scalex = 100;
			util.target.scaley = 100;
		}
		return util.target.scalex;
	}
	getHeight (args, util) {
		if (typeof util.target.scaley == 'undefined') {
			util.target.scalex = 100;
			util.target.scaley = 100;
		}
		return util.target.scaley;
	}
	
	
  }

  Scratch.extensions.register(new morescale());
})(Scratch);
