(function (Scratch) {
  'use strict';
  if (!Scratch.extensions.unsandboxed) {
    throw new Error('Local Storage must be run unsandboxed');
  }
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
        ],
      };
    }
    lse_set_block(args) {
      localStorage.setItem('lse:' + args.key.toString(), args.value.toString());
    }
    lse_load_reporter(args) {
      try {
        return localStorage.getItem('lse:' + args.key.toString()).toString();
      } catch (e) {
        return '';
      }
    }
  }
  Scratch.extensions.register(new LocalStorageExt());
})(Scratch);
