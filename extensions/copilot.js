// Extension metadata
// Name: Redpanda Copilot
// Description: Offline modular assistant for expressive OS builds.
// Unsandboxed: true

(function(Scratch) {
  'use strict';

  let botName = 'Copilot';
  let lastInput = '';

  class LocalCopilot {
    getInfo() {
      return {
        id: 'localcopilot',
        name: 'Local Copilot',
        description: 'Offline modular assistant for expressive OS builds.',
        blocks: [
          {
            opcode: 'createBot',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Create bot [NAME]',
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Redpanda'
              }
            }
          },
          {
            opcode: 'storeInput',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Input [TEXT]',
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Hello'
              }
            }
          },
          {
            opcode: 'getResponse',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Response (input)',
            arguments: {}
          }
        ]
      };
    }

    createBot(args) {
      botName = args.NAME;
    }

    storeInput(args) {
      lastInput = args.TEXT;
    }

    getResponse() {
      const input = lastInput.toLowerCase();

      if (input.includes('hello')) {
        return `${botName} says: Hey there, Zachary!`;
      }
      if (input.includes('boot')) {
        return `${botName} is online. Redpanda OS is ready.`;
      }
      if (input.includes('error')) {
        return `${botName} detected a glitch. Want me to troubleshoot or vibe?`;
      }

      return `${botName} heard: "${lastInput}"`;
    }
  }

  Scratch.extensions.register(new LocalCopilot());
})(Scratch);
