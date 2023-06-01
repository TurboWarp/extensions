(function(Scratch) {
  'use strict';
  let apikey, cache = {};

  class ChatGPT {
    getInfo () {
      return {
        id: 'openai',
        name: 'ChatGPT',
        color1: '#0e0e0e',
        blocks: [
          {
            opcode: 'ask',
            blockType: Scratch.BlockType.REPORTER,
            text: 'ask chatgpt [text]',
            arguments: {
              text: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'hi'
              }
            },
            disableMonitor: true,
          },
          {
            opcode: 'customize',
            blockType: Scratch.BlockType.COMMAND,
            text: 'customize the apikey [key]  (risky)',
            arguments: {
              key: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'sk-'
              }
            },
          },
          {
            opcode: 'donate',
            blockType: Scratch.BlockType.COMMAND,
            text: 'donate'
          },
        ]
      };
    }
    async ask ({ text }) {
      const content = text.trim();
      if (!content) return 'Please enter the content!';
      if (cache[text]) return cache[text];
      try {
        // eslint-disable-next-line no-restricted-syntax
        const resp = await fetch('https://chatgpt.deeptrain.net/gpt', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: content, key: apikey })
        });
        const message = (await resp.json()).message;
        cache[text] = message;
        return message;
      } catch (e) {
        console.error(e);
        return 'Too many requests, please try again later!';
      }
    }
    customize ({ key }) {
      apikey = key;
      return 'The openai apikey has been set. Note that customizing the apikey is risky!';
    }
    donate () {
      // eslint-disable-next-line no-restricted-syntax
      location.href = 'https://afdian.net/@zmh-program';
    }
  }

  Scratch.extensions.register(new ChatGPT());
})(Scratch);
