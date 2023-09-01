(function(Scratch) {
  'use strict';

  const vm = Scratch.vm;
  const runtime = vm.runtime;
  const canvas = vm.renderer.canvas;

  class MusicBrainz {
    getInfo() {
      return {
        id: 'samuelloufmusicbrainz',
        color1: '#BA478F',
        color2: '#EB743B',
        name: 'MusicBrainz',
        blocks: [
          // Blocks
        ],
        menus: {
          // Menus
        }
      };
    }

    // Functions
  }
  Scratch.extensions.register(new iFrame());
})(Scratch);
