/*!
 * Copyright 2023 tomyo-code
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

  
(function(Scratch) {
  'use strict';

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('This Turbo Mode example must run unsandboxed');
  }
  const vm = Scratch.vm;

  class Extension {
    constructor() {
      this.lastClipboardContent = ''; // Variable pour stocker le contenu précédent du presse-papiers
    }

    getInfo() {
      return {
        id: 'extension',
        name: 'Clipboard',
        color1: '#ffae00',
        blocks: [
          {
            opcode: 'when_something_is_copied',
            blockType: Scratch.BlockType.HAT,
            text: 'When something is copied',
            hideFromPalette: true
          }, //whensomthing is copied
          {
            opcode: 'set_clipboard',
            blockType: Scratch.BlockType.COMMAND,
            text: 'copy to clipboard: [TEXTE]',
            arguments: {
              TEXTE: {
                acceptReporters: true,
                type: Scratch.ArgumentType.STRING,
              }
            }
          }, // copy texte to clipboard
          {
            opcode: 'clipboard',
            blockType: Scratch.BlockType.REPORTER,
            text: 'clipboard'
          }
        ],
      };
    }

    when_something_is_copied() {
      const textInClipboard = navigator.clipboard.readText();
      return textInClipboard.then((text) => {
        if (text !== this.lastClipboardContent) {
          this.lastClipboardContent = text;
          return true;
        }
      });
    }

    set_clipboard(args) {
      navigator.clipboard.writeText(args.TEXTE);
    }

    clipboard() {
      return navigator.clipboard.readText()
    }
  }

  Scratch.extensions.register(new Extension);
})(Scratch);
