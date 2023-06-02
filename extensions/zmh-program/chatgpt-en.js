(function(Scratch) {
  'use strict';
  let cache = {};
  let conf = {
    apikey: '',
    model: '',
    temp: 70,
    token: 128,
  };

  const completions = [
      'text-davinci-003',
      'text-davinci-002',
      'text-curie-001',
      'text-babbage-001',
      'text-ada-001'
    ];
  const chat_completions = [
      'gpt-3.5-turbo-0301',
      'gpt-3.5-turbo',
      'gpt-4-32k-0314',
      'gpt-4-32k',
      'gpt-4-0314',
      'gpt-4'
    ];
  const all_completions = [...completions, ...chat_completions];
  async function request_completions() {
    // see https://platform.openai.com/docs/api-reference/completions/create
    // eslint-disable-next-line no-restricted-syntax
    const resp = await fetch(`https://api.openai.com/v1/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${conf.apikey}`
      },
      body: JSON.stringify({
        model: conf.model,
        prompt: prompt,
        max_tokens: conf.token,
        temperature: conf.temp / 100,
      })
    });
    if (!resp.ok) throw new Error((await resp.json()).message);
    return (await resp.json()).choices[0].text;
  }
  async function request_chat(text) {
    // see https://platform.openai.com/docs/api-reference/chat/create
    // eslint-disable-next-line no-restricted-syntax
    const resp = await fetch(`https://api.openai.com/v1/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${conf.apikey}`
      },
      body: JSON.stringify({
        model: conf.model,
        messages: [{
          'role': 'user',
          'content': text,
        }],
        max_tokens: conf.token,
        temperature: conf.temp / 100,
      })
    });
    if (!resp.ok) throw new Error((await resp.json()).message);
    return (await resp.json()).choices[0].message.content;
  }
  async function request(text) {
    if (!conf.apikey) {
      // eslint-disable-next-line no-restricted-syntax
      const resp = await fetch('https://chatgpt.deeptrain.net/gpt', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({data: text})
      });
      if (!resp.ok) throw new Error('Request failed! Please check your network!');
      const message = (await resp.json()).message;
      cache[text] = message;
      return message;
    } else {
      if (!(all_completions.includes(conf.model))) throw new Error('Invalid model!');
      return completions.includes(conf.model) ? await request_completions() : await request_chat(text);
    }
  }
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
            text: 'customize the apikey [apikey] model [model] max tokens [token] temperature [temp] (0-100) (risky)',
            arguments: {
              apikey: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'sk-'
              },
              model: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'text-davinci-003',
                menu: 'models'
              },
              token: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 128,
              },
              temp: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 70,
              }
            },
          },
          {
            opcode: 'donate',
            blockType: Scratch.BlockType.COMMAND,
            text: 'donate'
          },
        ],
        menus: {
          models: all_completions,
        }
      };
    }
    async ask ({ text }) {
      const content = text.trim();
      if (!content) return 'Please enter the content!';
      if (cache[text]) return cache[text];
      try {
        return await request(text);
      } catch (e) {
        console.error(e);
        return e.message;
      }
    }
    customize (args) {
      conf = args;
      return 'The openai apikey has been set. Note that customizing the apikey is risky!';
    }
    donate () {
      // eslint-disable-next-line no-restricted-syntax
      window.open('https://afdian.net/@zmh-program');
    }
  }

  Scratch.extensions.register(new ChatGPT());
})(Scratch);
