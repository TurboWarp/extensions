// Name: ProjectCover
// ID: projectcover
// Description: Load another work when loading it (?
// License: MIT

(function (Scratch) {
  'use strict';
  'masmuruang';

  class Cover {
    constructor() {
      if (!Scratch.vm.runtime.extensionStorage.requireproject) {
        Scratch.vm.runtime.extensionStorage.requireproject = {};
        this.storage = Scratch.vm.runtime.extensionStorage.requireproject;
      }
      else {
        this.storage = Scratch.vm.runtime.extensionStorage.requireproject;
        this.load();
      }
    }
    getInfo() {
      return {
        id: 'projectcover',
        name: 'ProjectCover',
        color1: '#f54242',
        color2: '#f54242',
        color3: '#f54242',
        blocks: [
          {
            opcode: 'require',
            blockType: Scratch.BlockType.COMMAND,
            text: 'require'
          }
        ]
      };
    }
    require() {
      this.storage.URL = prompt('URL: ');
    }
    load() {
      Scratch.fetch(this.storage.URL)
        .then((r) => r.arrayBuffer())
        .then((buffer) => Scratch.vm.loadProject(buffer))
        .then(() => { })
        .catch((error) => {
          console.log("Error", error);
        });
    }
  }

  Scratch.extensions.register(new Cover());
})(Scratch);