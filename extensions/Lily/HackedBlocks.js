// Name: Hacked Block Collection
// ID: lmsHackedBlocks
// Description: Various modified vanilla blocks.
// By: LilyMakesThings <https://scratch.mit.edu/users/LilyMakesThings/>

(function (Scratch) {
  "use strict";

  class HackedBlocks {
    getInfo() {
      return {
        id: "lmsHackedBlocks",
        name: "Hacked Block Collection",
        blocks: [
          {
            blockType: Scratch.BlockType.XML,
            xml: '<block type="event_whentouchingobject"><value name="TOUCHINGOBJECTMENU"><shadow type="event_touchingobjectmenu"/></value></block>',
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
          {
            blockType: Scratch.BlockType.XML,
            xml: '<block type="sensing_keypressed"><value name="KEY_OPTION"><shadow type="text"><field name="TEXT">enter</field></shadow></value></block>',
          },
          {
            blockType: Scratch.BlockType.XML,
            xml: '<block type="sensing_touchingobject"><value name="TOUCHINGOBJECTMENU"><shadow type="text"><field name="TEXT">Stage</field></shadow></value></block>',
          },
          {
            blockType: Scratch.BlockType.XML,
            xml: '<block type="sensing_touchingcolor"><value name="COLOR"><shadow type="text"><field name="TEXT">#ffffff</field></shadow></value></block>',
          },
          {
            blockType: Scratch.BlockType.XML,
            xml: '<block type="sensing_coloristouchingcolor"><value name="COLOR"><shadow type="text"><field name="TEXT">#ffffff</field></shadow></value><value name="COLOR2"><shadow type="text"><field name="TEXT">#ffffff</field></shadow></value></block>',
          },
          {
            blockType: Scratch.BlockType.XML,
            xml: '<block type="operator_join"><value name="STRING1"><shadow type="colour_picker"/></value><value name="STRING2"><shadow type="text"><field name="TEXT"></field></shadow></value></block>',
          },
          "---",
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
        ],
      };
    }
  }

  Scratch.extensions.register(new HackedBlocks());
})(Scratch);
