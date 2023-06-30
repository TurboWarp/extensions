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
  const extensionicon = "data:image/png;base64,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";
  
  addEventListener("copy", () => {
    Scratch.vm.runtime.startHats('Extensionclipboard_when_somthing_is_copied')
  });


  class Extensionclipboard {
    constructor() {
      this.poppup = 'false'
    }

    getInfo() {
      return {
        id: 'extensionclipboard',
        name: 'Clipboard',
        menuIconURI: extensionicon,
        color1: '#ffae00',
        blocks: [
          {
            opcode: 'when_something_is_copied',
            blockType: Scratch.BlockType.HAT,
            text: 'When something is copied',
          }, //when somthing is copied
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
            opcode: 'resetclipboard',
            blockType: Scratch.BlockType.COMMAND,
            text: 'reset clipboard'
          }, //reset clipboard
          {
            opcode: 'clipboard',
            blockType: Scratch.BlockType.REPORTER,
            text: 'clipboard'
          }, //clipboard
        ],
      };
    }

    
    set_clipboard(args) {
      navigator.clipboard.writeText(args.TEXTE);
    }

    resetclipboard() {
      navigator.clipboard.writeText('')
    }

    clipboard() {
      return navigator.clipboard.readText();
    }
  }

  Scratch.extensions.register(new Extensionclipboard);
})(Scratch);
