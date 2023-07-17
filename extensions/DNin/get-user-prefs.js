(function(Scratch) {
  'use strict';

  class GetUserPreferences {
    getInfo() {
      return {
        id: 'getuserpreferences',
        name: 'Preferences',
        blocks: [
          {
            opcode: 'prefersColorScheme',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'prefers [THEME] color scheme?',
            arguments: {
              THEME: { type: Scratch.ArgumentType.MENU, menu: 'THEME', defaultValue: 'dark' }
            }
          },
          {
            opcode: 'prefersReducedMotion',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'prefers reduced motion?'
          },
          {
            opcode: 'prefersContrast',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'prefers more contrast?'
          }
        ],
        menus: {
          THEME: {
            acceptReporters: true,
            items: ['light', 'dark']
          }
        }
      };
    }
    prefersColorScheme(args) {
      return ((window.matchMedia('(prefers-color-scheme: dark)').matches) === (args.THEME === 'dark'));
    }
    prefersReducedMotion() {
      return (window.matchMedia('(prefers-reduced-motion: reduce)').matches);
    }
    prefersContrast() {
      return (window.matchMedia('(prefers-contrast: more)').matches);
    }
  }

  Scratch.extensions.register(new GetUserPreferences());
})(Scratch);
