(function(Scratch) {
  'use strict';
  Scratch.translate.setup({
    en: {
      test: 'EN message'
    },
    es: {
      test: 'ES message'
    }
  });
  class Test {
    getInfo() {
      return {
        id: 'testl10n',
        name: Scratch.translate('Default message'),
        blocks: []
      };
    }
  }
  Scratch.extensions.register(new Test());
})(Scratch);
