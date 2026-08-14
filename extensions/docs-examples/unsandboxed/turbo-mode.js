/* eslint-disable -- passing the linting step requires content not covered when this is introduced */

(function(Scratch) {
  'use strict';

  // highlight-start
  if (!Scratch.extensions.unsandboxed) {
    throw new Error('This Turbo Mode example must run unsandboxed');
  }
  const vm = Scratch.vm;
  // highlight-end

  class TurboMode {
    getInfo() {
      return {
        id: 'turbomodeunsandboxed',
        name: 'Turbo Mode',
        blocks: [
          {
            opcode: 'set',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set turbo mode to [ENABLED]',
            arguments: {
              ENABLED: {
                type: Scratch.ArgumentType.STRING,
                menu: 'ENABLED_MENU'
              }
            }
          }
        ],
        menus: {
          ENABLED_MENU: {
            acceptReporters: true,
            items: ['on', 'off']
          }
        }
      };
    }
    // highlight-start
    set(args) {
      vm.setTurboMode(args.ENABLED === 'on');
    }
    // highlight-end
  }
  Scratch.extensions.register(new TurboMode());
})(Scratch);
