// Name: Sprite Costumes
// ID: costumer
// Description: Block that returns the sprites costume names.
// By: Wolfieboy09 <https://scratch.mit.edu/users/Wolfieboy09/>

(function(Scratch) {
    "use strict";
	class Costumer {
		getInfo() {
			return {
				id: 'costumer',
				name: 'Sprite Costumes',
				color1: '#5e0b9e',
				blocks: [
					{
						opcode: 'getCostumes',
						blockType: Scratch.BlockType.REPORTER,
						text: 'get sprite cosumes',
					}
				]
			}
		}

		getCostumes(_, util) { 
			const JSONdata = util.target.sprite.costumes
			return JSON.stringify(JSONdata.map(item => item.name))
		}
	}

	Scratch.extensions.register(new Costumer())
})(Scratch);