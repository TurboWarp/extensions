(function (Scratch: typeof globalThis.Scratch) {
  "use strict";
  const extensionId: string = "testtypescript";
  const vm: VM = Scratch.vm;
  vm.greenFlag();
  class Test {
    getInfo() {
      return {
        id: extensionId,
        name: "Typescript",
        blocks: [
          {
            blockType: Scratch.BlockType.LABEL,
            text: "Loaded",
          },
        ],
      };
    }
  }
  Scratch.extensions.register(new Test());
})(Scratch);
