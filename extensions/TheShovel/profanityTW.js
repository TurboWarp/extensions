(function(Scratch) {
    'use strict'
    const vm = Scratch.vm;
      class profanityTW {
        getInfo () {
          return { 
            id: 'profanityTW',
            name: 'profanityTW',
            color1: '#cf6a3c',
            color2: '#cf6a3c',
            color3: '#cf6a3c',
            blocks: [
             {
              opcode: 'checkProfanity',
              blockType: Scratch.BlockType.REPORTER,
              text: "Remove profanity from [TEXT]",
              arguments: {
                TEXT: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: '',
                }
             }
             },
          ]
          }
        }
    
    
        checkProfanity({TEXT}) {
            return fetch("https://www.purgomalum.com/service/plain?text="+TEXT)
            .then(r => r.text())
            .catch(() => '');
      }
    }
    
    
      Scratch.extensions.register(new profanityTW());
    })(Scratch);
