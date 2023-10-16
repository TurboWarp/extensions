// Name: When Saved
// ID: whensaved
// Description: Detect when the project is being saved.

(function (Scratch) {
  "use strict";

  const vm = Scratch.vm;

  class WhenSaved {
    getInfo() {
      return {
        id: "whensaved",
        name: "When Saved",
        blocks: [

        ],
      };
    }
  }

  Scratch.extensions.register(new WhenSaved());
})(Scratch);
