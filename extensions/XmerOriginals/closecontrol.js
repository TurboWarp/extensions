// Name: Close Control
// ID: closecontrol
// Description: This extension provides site closure confirmation, you can both activate and deactivate it.
// By: XmerOriginals

class CloseControl {
  constructor() {
    this.closeControlEnabled = false;
    this.handleCloseRequest = this.handleCloseRequest.bind(this);
  }

  getInfo() {
    return {
      id: 'closecontrol',
      name: 'Close Control',
      blocks: [
        {
          opcode: 'enableCloseControl',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Enable close control',
        },
        {
          opcode: 'disableCloseControl',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Disable close control',
        },
        {
          opcode: 'isCloseControlEnabled',
          blockType: Scratch.BlockType.BOOLEAN,
          text: 'Is close control enabled?',
        },
      ]
    };
  }

  enableCloseControl() {
    this.closeControlEnabled = true;
  }

  disableCloseControl() {
    this.closeControlEnabled = false;
  }

  isCloseControlEnabled() {
    return this.closeControlEnabled;
  }
  
  handleCloseRequest(event) {
    if (this.closeControlEnabled) {
      event.preventDefault();
      const confirmation = confirm;
    }
  }
}

const closeControlExtension = new CloseControl();
Scratch.extensions.register(closeControlExtension);
window.addEventListener('beforeunload', closeControlExtension.handleCloseRequest);
