// Name: Cheat Codes
// ID: samuelloufcheatcodes
// Description: Easily add cheat codes to your code.
// License: MIT

(function (Scratch) {
  'use strict';

  let combinaison = [];
  let custom_names = {};
  let auto_reset = true;
  
  const delay = (ms) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  const hasInOrder = (list1, list2) => {
    var _ = null;
    if (list1.includes(list2[0])){
      for (var i = 0; i < list1.length; i++){
        if (list1[i] == list2[0]){
          if (list1.length - i >= list2.length){
            _ = true;
            for (var j = 0; j < list2.length; j++){
              if (list1[i + j] != list2[j]){ _ = false; }
            }
          }
        }
      }
    } else { _ = false; }
  
    return _;
  }

  const isJSON = (string) => {
    try {
      var parsed = JSON.parse(string);
      return true
    } catch {
      return false
    }
  }
  
  class CheatCodes {
    constructor() {
      document.addEventListener('keyup', this.keyPressed);
    }

    getInfo() {
      return {
        name: 'Cheat Codes',
        id: 'samuelloufcheatcodes',
        color1: '#cf8436',
        color2: '#a66a2b',
        blocks: [
          {
            opcode: 'cheatCode',
            blockType: Scratch.BlockType.REPORTER,
            text: '[a], [b]',
            arguments: {
              a: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'ArrowUp',
              },
              b: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'ArrowDown',
              },
            }
          },
          {
            opcode: 'cheatCodes',
            blockType: Scratch.BlockType.REPORTER,
            text: '[code]',
            arguments: {
              code: {
                menu: 'cheat_codes',
              },
            }
          },
          '---',
          {
            opcode: 'onCheatCode',
            blockType: Scratch.BlockType.HAT,
            text: 'when cheat code [CODE] is entered',
            isEdgeActivated: true,
            arguments: {
              CODE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '',
              }
            }
          },
          {
            opcode: 'waitUntilCheatCode',
            blockType: Scratch.BlockType.COMMAND,
            text: 'wait until cheat code [CODE] is entered',
            arguments: {
              CODE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '',
              }
            }
          },
          {
            opcode: 'isCheatCode',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[CODE] is entered?',
            arguments: {
              CODE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '',
              }
            }
          },
          '---',
          {
            opcode: 'pressedKeys',
            blockType: Scratch.BlockType.REPORTER,
            text: 'pressed keys'
          },
          {
            opcode: 'pressedKeysJSON',
            blockType: Scratch.BlockType.REPORTER,
            text: 'pressed keys JSON'
          },
          {
            opcode: 'pressedKeysLength',
            blockType: Scratch.BlockType.REPORTER,
            text: 'number of pressed keys'
          },
          {
            opcode: 'pressedKeysJSONx',
            blockType: Scratch.BlockType.REPORTER,
            text: 'pressed key n°[x]',
            arguments: {
              x: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              }
            }
          },
          {
            opcode: 'pressedKeysSeparator',
            blockType: Scratch.BlockType.REPORTER,
            text: 'pressed keys with separator [separator]',
            arguments: {
              separator: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ',',
              }
            },
          },
          '---',
          {
            opcode: 'resetPressedKeys',
            blockType: Scratch.BlockType.COMMAND,
            text: 'reset pressed keys'
          },
          {
            opcode: 'automaticallyResetPressedKeys',
            blockType: Scratch.BlockType.COMMAND,
            text: '[a_m] reset pressed keys',
            arguments: {
              a_m: {
                menu: 'a_m',
              },
            },
          },
          {
            opcode: 'isAutomaticallyResetPressedKeys',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'pressed keys automatically reseted?',
          },
          '---',
          /*{
            opcode: 'setCustomKeyName',
            blockType: Scratch.BlockType.COMMAND,
            text: 'replace key [keycode] by [newkeycode]',
            arguments: {
              keycode: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'ArrowUp',
              },
              newkeycode: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '↑',
              }
            }
          },
          {
            opcode: 'removeCustomKeyName',
            blockType: Scratch.BlockType.COMMAND,
            text: 'remove key [keycode]\'s replacement',
            arguments: {
              keycode: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'ArrowUp',
              },
            }
          },
          {
            opcode: 'customKeyNamesJSON',
            blockType: Scratch.BlockType.REPORTER,
            text: 'custom key names JSON'
          },
          {
            opcode: 'customKeyNamesLength',
            blockType: Scratch.BlockType.REPORTER,
            text: 'number of custom key names'
          },
          {
            opcode: 'customKeyNamesJSONx',
            blockType: Scratch.BlockType.REPORTER,
            text: 'custom key name for [x]',
            arguments: {
              x: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'ArrowUp',
              }
            }
          }, */
        ],
        menus: {
          a_m:{
            items: ['automatically', 'manually'],
            acceptReporters: true,
          },
          cheat_codes: {
            items: [
              'Konami Code',
              'Mortal Combat - Blood Code',
              'Sims - More money'
            ],
            acceptReporters: true,
          },
        },
      };
    }

    _join(list, separator = ''){
      var s = '';
      for (var i = 0; i < list.length; i++){
        s += String(list[i]);
        if (i + 1 < list.length) s += separator
      }
      return s
    }

    getKeyNameForPressedKey(key){
      if (Object.keys(custom_names).includes(key)){
        return custom_names[key];
      } else {
        return key;
      }
    }
    
    async waitUntilCheatCode({ CODE }){
      while (!this.isCheatCode({CODE})){
        await delay(10);
      }
      if (auto_reset) this.resetPressedKeys();
    }

    onCheatCode({ CODE }){
      return this.isCheatCode({ CODE });
    }

    isCheatCode({ CODE }){
      if (CODE == ''){
        return false
      }

      var _ = hasInOrder(combinaison, JSON.parse(CODE));
      if (_){
        if (auto_reset) this.resetPressedKeys();
      }
      return _;
    }

    cheatCode(args){
      var array = [];
      if (isJSON(args.a)){
        array = [...array, ...JSON.parse(args.a)];
      } else {
        array.push(args.a);
      }
      
      if (isJSON(args.b)){
        array = [...array, ...JSON.parse(args.b)]
      } else {
        array.push(args.b);
      }

      return JSON.stringify(array);
    }

    resetPressedKeys(){
      combinaison = [];
    }

    customKeyNamesSeparator(args){
      return this._join(custom_names, args.separator);
    }

    customKeyNamesJSON(){
      return JSON.stringify(custom_names);
    }

    customKeyNamesJSONx(args){
      return custom_names[args.x];
    }

    customKeyNamesLength(){
      return Object.keys(custom_names).length;
    }

    keyPressed(event){
      combinaison.push(event.key);
    }

    automaticallyResetPressedKeys(args){
      auto_reset = (args.a_m == 'automatically');
    }

    isAutomaticallyResetPressedKeys(){
      // @ts-ignore
      return auto_reset
    }
    
    setCustomKeyName(args){
      custom_names[args.keycode] = args.newkeycode || args.keycode;
    }

    removeCustomKeyName(args){
      delete custom_names[args.keycode];
    }

    pressedKeys(){
      return this._join(combinaison);
    }

    pressedKeysSeparator(args){
      return this._join(combinaison, args.separator);
    }

    pressedKeysJSON(){
      return JSON.stringify(combinaison);
    }

    pressedKeysJSONx(args){
      return combinaison[args.x - 1];
    }

    pressedKeysLength(){
      return combinaison.length;
    }

    cheatCodes(args){
      switch (args.code){
        case 'Konami Code':
          return JSON.stringify(['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a']);
        case 'Mortal Combat - Blood Code':
          return JSON.stringify(['a', 'b', 'a', 'c', 'a', 'b', 'b']);
        case 'Sims - More money':
          return JSON.stringify(['Control', 'Shift', 'c', 'r', 'o', 's', 'e', 'b', 'u', 'd', 'c']);
      }
    }
  }

  // @ts-ignore
  Scratch.extensions.register(new CheatCodes());
})(Scratch);
