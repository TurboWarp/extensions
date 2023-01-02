(Scratch => {
	'use strict';

	class Sound {
		getInfo() {
			return {
				// 'sound' would conflict with normal Scratch
				id: 'notSound',
				name: 'Sound',
				blocks: [
					{
						opcode: 'play',
						blockType: Scratch.BlockType.COMMAND,
						text: 'Play sound from url:[path]',
						arguments: {
							path: {
								type: Scratch.ArgumentType.STRING,
								defaultValue: 'https://extensions.turbowarp.org/meow.mp3'
							}
						}
					},
					{
						opcode: 'playUntilDone',
						blockType: Scratch.BlockType.COMMAND,
						text: 'Play sound from url:[path] until done',
						arguments: {
							path: {
								type: Scratch.ArgumentType.STRING,
								defaultValue: 'https://extensions.turbowarp.org/meow.mp3'
							}
						}
					}
				]
			};
		}

		play({path}) {
			const sound = new Audio(path);
			sound.play();
		}

		playUntilDone({path}) {
			return new Promise(resolve => {
				const sound = new Audio(path);
				sound.play();
				sound.onended = () => {
					resolve();
				};
				sound.onerror = () => {
					resolve();
				};
			});
		}
	}

	Scratch.extensions.register(new Sound());
})(Scratch);
