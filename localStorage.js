/*!
 * Copyright 2023 StioStudio (Simon)
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

// We use class syntax to define our extension object
// This isn't actually necessary, but it tends to look the best

let localStorage_ID = undefined;

(function(Scratch) {
  'use strict';
  class MyExtension {
    getInfo () {
      return { 
        // `id` is the internal ID of the extension
        // It should never change!
        // If you choose to make an actual extension, please change this to something else.
        // Only the characters a-z and 0-9 can be used. No spaces or special characters.
        id: 'localstorage',
  
        // `name` is what the user sees in the toolbox
        // It can be changed without breaking projects.
        name: 'Local Storage',
  
        color1: '#BB1111',
  
        blocks: [
          {
            opcode: 'a',
            blockType: Scratch.BlockType.COMMAND,
            text: 'local ID[ONE]',
            arguments: {
                ONE: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: 'ID'
                }
            }
        },
          {
              opcode: 'b',
              blockType: Scratch.BlockType.COMMAND,
              text: 'local set item[ONE][TWO]',
              arguments: {
                  ONE: {
                      type: Scratch.ArgumentType.STRING,
                      defaultValue: 'KEY'
                  },
                  TWO: {
                      type: Scratch.ArgumentType.STRING,
                      defaultValue: 'VALUE'
                  }
              }
          },
          {
              opcode: 'c',
              blockType: Scratch.BlockType.REPORTER,
              text: 'local get Item[ONE]',
              arguments: {
                  ONE: {
                      type: Scratch.ArgumentType.STRING,
                      defaultValue: 'KEY'
                  }
              }
          },
          {
            opcode: 'd',
            blockType: Scratch.BlockType.COMMAND,
            text: 'local remove item[ONE]',
            arguments: {
                ONE: {
                    type: Scratch.ArgumentType.STRING,
                    defaultValue: 'KEY'
                }
            }
        },
        {
          opcode: 'e',
          blockType: Scratch.BlockType.COMMAND,
          text: 'local remove ALL'
        }
        ]
      };
    }
    a(args){
      localStorage_ID = args.ONE
    }
    b(args) {
      localStorage.setItem(localStorage_ID+args.ONE, args.TWO);
      return;
    }
    c(args) {
        return localStorage.getItem(localStorage_ID+args.ONE);
    }
    d(args){
      localStorage.removeItem(localStorage_ID+args.ONE);
      return;
    }
    e(){
      localStorage.clear();
      return;
    }
  }
  Scratch.extensions.register(new MyExtension());
})(Scratch);


// Call Scratch.extensions.register to register your extension
// Make sure to register each extension exactly once
Scratch.extensions.register(new MyExtension());