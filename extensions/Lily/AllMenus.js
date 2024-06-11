// Name: All Menus
// ID: lmsAllMenus
// Description: Special category with every menu from every Scratch category and extensions.
// By: LilyMakesThings <https://scratch.mit.edu/users/LilyMakesThings/>
// License: MIT AND LGPL-3.0

(function (Scratch) {
  "use strict";

  let blockXML;

  const blocklist = [
    "looks_costumenumbername",
    "extension_wedo_tilt_menu",

    // Unused menu in More Events that won't be translated
    "lmsMoreEvents_menu_state"
  ];

  Scratch.vm.addListener("BLOCKSINFO_UPDATE", refreshMenus);

  function refreshMenus() {
    if (!window.ScratchBlocks) return;
    Scratch.vm.removeListener("BLOCKSINFO_UPDATE", refreshMenus);

    let allBlocks = Object.keys(ScratchBlocks.Blocks);

    allBlocks = allBlocks.filter(
      (item) => item.includes("menu") && !blocklist.includes(item)
    );

    const menuBlocks = allBlocks.map(
      (item) => '<block id="' + item + '" type="' + item + '"/>'
    );

    blockXML = menuBlocks.join("");
    Scratch.vm.runtime.extensionManager.refreshBlocks();
  }

  class AllMenus {
    constructor() {
      Scratch.vm.runtime.on("EXTENSION_ADDED", () => {
        refreshMenus();
      });
    }

    getInfo() {
      return {
        id: "lmsAllMenus",
        name: "All Menus",
        blocks: [
          {
            blockType: Scratch.BlockType.XML,
            xml: blockXML,
          },
        ],
      };
    }
  }

  refreshMenus();

  Scratch.extensions.register(new AllMenus());
})(Scratch);
