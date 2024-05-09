// Name: Close Control
// ID: closecontrol
// Description: Ask before closing the tab.
// By: XmerOriginals

(function (Scratch) {
  "use strict";

  class CloseControl {
    constructor() {
      this.closeControlEnabled = false;
      this.handleCloseRequest = this.handleCloseRequest.bind(this);
      window.addEventListener('beforeunload', this.handleCloseRequest);  
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
  
  Scratch.extensions.register(new CloseControl());
}(Scratch));
