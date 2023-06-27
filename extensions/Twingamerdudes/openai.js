(function(Scratch) {
  'use strict';
  if (!Scratch.extensions.unsandboxed) {
    throw new Error('The OpenAI extension example must run unsandboxed');
  }

  alert("This extension uses the OpenAI API. Using the OpenAI API requires money, you must use a valid API-Key you have gotten from the OpenAI website.")
  function removeQuotes(str) {
    if (typeof str !== 'string') {
      return str; // Return the input if it's not a string
    }

    const firstChar = str.charAt(0);
    const lastChar = str.charAt(str.length - 1);

    if ((firstChar === "'" || firstChar === '"') && firstChar === lastChar) {
      return str.slice(1, -1); // Remove the first and last character
    }

    return str; // Return the input if it doesn't
  }

  const icon = "data:image/png;base64,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"
  class OpenAIExtension {
    getInfo() {
      return {
        id: 'openai',
        name: 'OpenAI',
        menuIconURI: icon,
        blocks: [
          {
            opcode: 'requestOpenAI',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Request Generation from [MODEL] with the prompt [PROMPT] and the key [KEY]',
            arguments: {
              MODEL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "text-davinci-003"
              },
              PROMPT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Write a tagline for a ice-cream shop'
              },
              KEY:{
                type: Scratch.ArgumentType.STRING,
                defaultValue: "your-api-key"
              }
            },
            disableMonitor: true
          },
          {
            opcode: 'requestChatOpenAI',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Request Chat Generation from [MODEL] with the system prompt [SPROMPT], user prompt [PROMPT], and key [KEY]',
            arguments: {
              MODEL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "gpt-3.5-turbo"
              },
              SPROMPT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'You are a friendly chatbot'
              },
              PROMPT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Hello!'
              },
              KEY:{
                type: Scratch.ArgumentType.STRING,
                defaultValue: "your-api-key"
              }
            },
            disableMonitor: true
          }
        ]
      };
    }
  
    requestOpenAI (args) {
      const prompt = args.PROMPT;
      const apiKey = args.KEY;
      return fetch("https://api.openai.com/v1/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
              model: args.MODEL,
              prompt: prompt,
              max_tokens: 300, // You can adjust the number of tokens generated here
              n: 1,
              stop: null,
              temperature: 0.7,
          }),
        })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let text = data.choices[0].text.trim()
          return removeQuotes(text);
        })
        .catch((error) => {
          console.error(error);
          return 'Uh oh! Something went wrong.';
        });
    }
  
    requestChatOpenAI (args) {
      const sprompt = args.SPROMPT;
      const prompt = args.PROMPT;
      const apiKey = args.KEY;
      return fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
              model: args.MODEL,
              messages: [{"role": "system", "content": sprompt}, {"role": "user", "content": prompt}]          
          }),
        })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          let text = data.choices[0].message.content.trim()
          return removeQuotes(text);
        })
        .catch((error) => {
          console.error(error);
          return 'Uh oh! Something went wrong.';
        });
    }
  }
  Scratch.extensions.register(new OpenAIExtension());
})(Scratch);