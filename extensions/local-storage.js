(function (Scratch) {
  'use strict';
  if (!Scratch.extensions.unsandboxed) {
    throw new Error('Local Storage must be run unsandboxed');
  }

  const PREFIX = 'untrusted_localstorage:';

  class LocalStorageExt {
    getInfo() {
      return {
        id: 'localstorage',
        name: 'Local Storage',
        blocks: [
          {
            opcode: 'load',
            blockType: Scratch.BlockType.REPORTER,
            text: 'get key [key]',
            arguments: {
              key: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'example',
              },
            },
          },
          {
            opcode: 'set',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set key [key] to [value]',
            arguments: {
              key: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'example',
              },
              value: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '1234',
              },
            },
          },
          {
            opcode: 'remove',
            blockType: Scratch.BlockType.COMMAND,
            text: 'remove key [key]',
            arguments: {
              key: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'example'
              },
            },
          },
        ],
      };
    }
    set(args) {
      localStorage.setItem(PREFIX + args.key.toString(), JSON.stringify(args.value));
    }
    load(args) {
      try {
        const storedValue = localStorage.getItem(PREFIX + args.key.toString());
        if (storedValue !== null) {
          try {
            const parsed = JSON.parse(storedValue);
            if (typeof parsed === 'string' || typeof parsed === 'boolean' || typeof parsed === 'number') {
              return parsed;
            }
          } catch (e) {
            // JSON.parse failed, ignore
          }
          // Return the raw value as a string.
          return storedValue;
        }
      } catch (e) {
        // localStorage.getItem failed, ignore
      }
      return '';
    }
    remove(args) {
      localStorage.removeItem(PREFIX + args.key.toString());
    }
  }
  Scratch.extensions.register(new LocalStorageExt());
})(Scratch);
