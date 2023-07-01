// Made by AdamMady
// Please give feedback here: https://scratch.mit.edu/users/AdamMady2/

class ClipboardExtension {
  constructor() {
    this.id = 'clipboard';
    this.lastPastedText = '';
    this.lastCopiedText = '';
    this.initializeClipboardListener();
  }

  initializeClipboardListener() {
    document.addEventListener('paste', (event) => {
      const clipboardData = event.clipboardData || window.clipboardData;
      const pastedText = clipboardData.getData('Text');
      if (!pastedText) return; // Ignore empty pasted text
      this.lastPastedText = pastedText;
    });
  }

  getInfo() {
    return {
      id: this.id,
      name: 'Clipboard',
      color1: '#008080',
      color2: '#006666',
      blocks: [
        {
          opcode: 'copyToClipboard',
          blockType: 'command',
          text: 'Copy [VARIABLE]',
          arguments: {
            VARIABLE: {
              type: 'string',
              defaultValue: 'Hello, World!'
            }
          }
        },
        {
          opcode: 'clearCopied',
          blockType: 'command',
          text: 'Clear Copied'
        },
        {
          opcode: 'clearPasted',
          blockType: 'command',
          text: 'Clear Pasted'
        },
        {
          opcode: 'getCurrentClipboard',
          blockType: 'reporter',
          text: 'Current Clipboard',
          blockAllThreads: false
        },
        {
          opcode: 'getLastCopiedText',
          blockType: 'reporter',
          text: 'Last Copied Text',
          blockAllThreads: false
        },
        {
          opcode: 'getLastPastedText',
          blockType: 'reporter',
          text: 'Last Pasted Text',
          blockAllThreads: false
        }
      ],
      menus: {}
    };
  }

  copyToClipboard(args) {
    const variable = args.VARIABLE;
    navigator.permissions.query({ name: 'clipboard-write' }).then((result) => {
      if (result.state === 'granted' || result.state === 'prompt') {
        navigator.clipboard.writeText(variable).then(() => {
          this.lastCopiedText = variable;
        }).catch((error) => {
          console.error('Failed to copy to clipboard:', error);
        });
      }
    });
  }

  clearCopied() {
    this.lastCopiedText = '';
  }

  clearPasted() {
    this.lastPastedText = '';
  }

  getCurrentClipboard() {
    if (navigator.clipboard && navigator.clipboard.readText) {
      return Scratch.canReadClipboard().then(allowed => {
        if (allowed) {
          return navigator.clipboard.readText();
        }
        return '';
      });
    }
    return '';
  }

  getLastCopiedText() {
    return this.lastCopiedText;
  }

  getLastPastedText() {
    const pastedText = this.lastPastedText;
    return pastedText;
  }
}

Scratch.extensions.register(new ClipboardExtension());
