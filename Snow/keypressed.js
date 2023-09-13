// Name: Key Press Extension
// ID: keypressed
// Description: It has a reporter block reporting what key has been pressed, allowing for more supported keys and easier detection
// By: snowboyz0825 <https://scratch.mit.edu/users/Dat_Snow_Kid/>
// Mostly by chatGPT, I just added a few edits after training the chatbot to code extensions. I take no creative credit. 
class KeyPressExtension {
  constructor(runtime) {
    this.runtime = runtime;
    this.currentKey = null;
    // Attach event listener for keydown and keyup events
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
    document.addEventListener('keyup', this.handleKeyUp.bind(this));
  }

  getInfo() {
    return {
      id: 'keyPress',
      name: 'Key Press Extension',
      blocks: [
        {
          opcode: 'getCurrentKey',
          blockType: Scratch.BlockType.REPORTER,
          text: 'current key',
          arguments: {},
        },
      ],
    };
  }

  getCurrentKey() {
    return this.currentKey || 'No key pressed';
  }

  handleKeyDown(event) {
    // Get the name of the pressed key
    this.currentKey = event.key;
    this.runtime.requestRedraw(); // Notify Scratch to update the block value
  }

  handleKeyUp() {
    // Reset the currentKey when the key is released
    this.currentKey = null;
    this.runtime.requestRedraw(); // Notify Scratch to update the block value
  }
}

Scratch.extensions.register(new KeyPressExtension());
