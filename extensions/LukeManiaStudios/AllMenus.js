(function (Scratch) {
  'use strict';

  const blacklist = [
  'looks_costumenumbername'
  ];

  class allmenus {
    constructor () {
      Scratch.vm.runtime.on('EXTENSION_ADDED', () => {
        refreshMenus();
      });

    }
    getInfo() {
      return {
        id: 'lmsAllMenus',
        name: 'All Menus',
        blocks: [
          {
            func: "menureset",
            blockType: Scratch.BlockType.BUTTON
          }
        ]
      };
    }
    menureset() {
      refreshMenus();
    }
  }

  Scratch.vm.addListener('BLOCKSINFO_UPDATE', refreshMenus);
  refreshMenus();

  function refreshMenus() {
    if (!window.ScratchBlocks) return;

    Scratch.vm.removeListener('BLOCKSINFO_UPDATE', refreshMenus);

    // Based on code by @Xeltaliv
    let blockMenu = [];
    // @ts-expect-error - ScratchBlocks not typed yet
    // eslint-disable-next-line no-undef
    let allBlocks = Object.keys(ScratchBlocks.Blocks);
    allBlocks = allBlocks.filter(item => item.includes('menu') && !blacklist.includes(item));
    allBlocks.forEach(item => blockMenu.push('<block id="' + item + '" type="' + item + '"/>'));
    blockMenu = blockMenu.join('');
    console.log(blockMenu);

    const menu = function (isInitialSetup, isStage, targetId) {
      return `
      <category name="All Menus" id="lmsAllMenus" colour="#4C97FF" secondaryColour="#3373CC">
          ${`<button text="Refresh Blocks" callbackKey="EXTENSION_CALLBACK" callbackData="lmsAllMenus_menureset"></button>` + blockMenu}
          ${categorySeparator}
      </category>
      `;
    };

    const vm = Scratch.vm;
    const runtime = vm.runtime;
    const categorySeparator = '<sep gap="36"/>';
    const gbx = runtime.getBlocksXML.bind(runtime);
    runtime.getBlocksXML = function(target) {
      const categoryInfo = this._blockInfo;
      const res = gbx(target);
      res.forEach((elem, idx) => {
        if (categoryInfo[idx].id === "lmsAllMenus") {
          let {editingTarget: target, runtime} = vm;
          const stage = runtime.getTargetForStage();
          if (!target) target = stage;
          elem.xml = menu(false, target.isStage, target.id);
        }
      });
      return res;
    };
    Scratch.vm.extensionManager.refreshBlocks();
  }

Scratch.extensions.register(new allmenus());
})(Scratch);
