(Scratch => {
	"use strict";

	class Sound {
		getInfo() {
			return {
				id: "notSound", // Intentional
				name: "Sound",
				blocks: [
					{
						opcode: 'play',
						blockType: Scratch.BlockType.COMMAND,
						text: "Play sound from url:[path]",
						arguments: {
							path: {
								type: Scratch.ArgumentType.STRING,
								defaultValue: "https://extensions.turbowarp.org/sound.mp3"
							}
						}
					},
					{
						opcode: 'playUntilDone',
						blockType: Scratch.BlockType.COMMAND,
						text: "Play sound from url:[path] until done",
						arguments: {
							path: {
								type: Scratch.ArgumentType.STRING,
								defaultValue: "https://extensions.turbowarp.org/sound.mp3"
							}
						}
					}
				]
			};
		}
		play({path}) {
			let sound = new Audio(path);
			sound.play();
		}
		playUntilDone({path}) {
			return new Promise(resolve => {
				let sound = new Audio(path);
				sound.play();
				sound.onended = resolve;
			});
		}
	}
	Scratch.extensions.register(new Sound());
})(Scratch);
