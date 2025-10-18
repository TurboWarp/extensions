// Name: Browser Bridge
// ID: browserBridge
// Description: Provides access to browser APIs like localStorage, console, and dialogs.
// By: Startoto1007 <https://scratch.mit.edu/users/Startoto1007/>
// License: MPL-2.0

(function (Scratch) {
  'use strict';

  class BrowserBridge {
    getInfo() {
      return {
        id: 'browserBridge',
        name: Scratch.translate('Browser Bridge'),
        color1: '#4b9de2',
        color2: '#2d7cc5',
        unsandboxed: true,
        blocks: [
          {
            opcode: 'lsSet',
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate('set localStorage key [KEY] to [VALUE]'),
            arguments: {
              KEY: { type: Scratch.ArgumentType.STRING, defaultValue: 'myKey' },
              VALUE: { type: Scratch.ArgumentType.STRING, defaultValue: 'hello' }
            }
          },
          {
            opcode: 'lsGet',
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate('localStorage value for [KEY]'),
            arguments: {
              KEY: { type: Scratch.ArgumentType.STRING, defaultValue: 'myKey' }
            }
          },
          {
            opcode: 'consoleLog',
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate('console.log [MSG]'),
            arguments: {
              MSG: { type: Scratch.ArgumentType.STRING, defaultValue: 'hello world' }
            }
          },
          {
            opcode: 'alertMsg',
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate('alert [MSG]'),
            arguments: {
              MSG: { type: Scratch.ArgumentType.STRING, defaultValue: 'This is an alert' }
            }
          },
          {
            opcode: 'confirmDialog',
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate('confirm [MSG]'),
            arguments: {
              MSG: { type: Scratch.ArgumentType.STRING, defaultValue: 'Are you sure?' }
            }
          },
          {
            opcode: 'promptDialog',
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate('prompt [MSG] default [DEF]'),
            arguments: {
              MSG: { type: Scratch.ArgumentType.STRING, defaultValue: 'Enter text' },
              DEF: { type: Scratch.ArgumentType.STRING, defaultValue: '' }
            }
          },
          {
            opcode: 'openUrl',
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate('open url [URL]'),
            arguments: {
              URL: { type: Scratch.ArgumentType.STRING, defaultValue: 'https://turbowarp.org' }
            }
          }
        ]
      };
    }

    lsSet({ KEY, VALUE }) {
      try {
        localStorage.setItem(KEY, VALUE);
      } catch (e) {
        console.error('localStorage set error:', e);
      }
    }

    lsGet({ KEY }) {
      try {
        return localStorage.getItem(KEY) || '';
      } catch (e) {
        console.error('localStorage get error:', e);
        return '';
      }
    }

    consoleLog({ MSG }) {
      console.log(MSG);
    }

    alertMsg({ MSG }) {
      window.alert(MSG);
    }

    confirmDialog({ MSG }) {
      return window.confirm(MSG);
    }

    promptDialog({ MSG, DEF }) {
      return window.prompt(MSG, DEF) || '';
    }

    openUrl({ URL }) {
      try {
        Scratch.openWindow(URL);
      } catch (e) {
        console.error('openUrl error:', e);
      }
    }
  }

  Scratch.extensions.register(new BrowserBridge());
})(Scratch);
