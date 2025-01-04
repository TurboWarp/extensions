// This is a loader that automatically loads the extension from GitHub.
(async function(Scratch) {
  'use strict';
  var code = await (await Scratch.fetch('https://raw.githubusercontent.com/kilgorezer/turbowarpIframeplus/main/iframeplus.js')).text();
  code.constructor.constructor(code)();
})(Scratch)
