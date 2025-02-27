/** @fileoverview @module */
/** 
 * @todo
 */

// @ts-ignore bleh
// import htm from 'https://unpkg.com/htm?module'

/* globals Scratch */
(async function (Scratch) {
  "use strict";
  const extensionId = "testBabel";
  let a, b;
  a ??= {};
  b ||= 5;
  // @ts-ignore TS2550 TS6133
  const _wow = Object.hasOwn(a, 'test');
  // @ts-ignore TS1323 TS2792
  const htm = (await import('https://unpkg.com/htm?module')).default;
  console.log(htm.call(function h(type, props, ...children) {
    return { type, props, children };
  }, '<div>test</div>'));
  class Test {
    getInfo() {
      return {
        id: extensionId,
        name: "Babel test",
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
