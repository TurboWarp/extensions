// Name: Hidden Block Collection
// ID: lmsHackedBlocks
// Description: Various "hacked blocks" that work in Scratch but are not visible in the palette.
// By: LilyMakesThings <https://scratch.mit.edu/users/LilyMakesThings/>
// By: pumpkinhasapatch

(function (Scratch) {
  "use strict";

  class HackedBlocks {
    getInfo() {
      return {
        id: "lmsHackedBlocks",
        name: "Hidden Blocks",
        docsURI: "https://en.scratch-wiki.info/wiki/Hidden_Blocks#Events",
        blocks: [
          // Use the sensing_touchingobjectmenu instead of event_ to also list sprites, since the block supports it
          {
            blockType: Scratch.BlockType.XML,
            xml: '<block type="event_whentouchingobject"><value name="TOUCHINGOBJECTMENU"><shadow type="sensing_touchingobjectmenu"/></value></block>',
          },
          "---",
          {
            blockType: Scratch.BlockType.XML,
            xml: '<block id="for_each" type="control_for_each"><value name="VALUE"><shadow type="math_whole_number"><field name="NUM">10</field></shadow></value></block>',
          },
          {
            blockType: Scratch.BlockType.XML,
            xml: '<block id="while" type="control_while"/>',
          },
          "---",
          // Counting blocks that function similarly to variables
          {
            blockType: Scratch.BlockType.XML,
            xml: '<block type="control_get_counter"/>',
          },
          {
            blockType: Scratch.BlockType.XML,
            xml: '<block type="control_incr_counter"/>',
          },
          {
            blockType: Scratch.BlockType.XML,
            xml: '<block type="control_clear_counter"/>',
          },
          "---",
          {
            blockType: Scratch.BlockType.XML,
            xml: '<block type="operator_round"><value name="NUM"><shadow type="note"><field name="NOTE">60</field></shadow></value></block>',
          },
          "---",
          {
            blockType: Scratch.BlockType.XML,
            xml: '<block type="operator_join"><value name="STRING1"><shadow type="colour_picker"/></value><value name="STRING2"><shadow type="text"><field name="TEXT"></field></shadow></value></block>',
          },
          // Dot matrix input from the micro:bit extension
          // Returns a 5x5 binary grid of pixels depending on what was drawn. White pixels are 1 and green pixels are 0
          {
            blockType: Scratch.BlockType.XML,
            xml: '<block type="operator_join"><value name="STRING1"><shadow type="matrix"><field name="MATRIX">1111110101001000010001110</field></shadow></value><value name="STRING2"><shadow type="text"><field name="TEXT"></field></shadow></value></block>',
          },
        ],
      };
    }
  }

  Scratch.extensions.register(new HackedBlocks());
})(Scratch);
