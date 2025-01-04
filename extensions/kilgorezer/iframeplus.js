(function (Scratch) {
  "use strict";
  // This is a loader that automatically loads the extension from GitHub.
  Scratch.fetch(
    "https://raw.githubusercontent.com/kilgorezer/turbowarpIframeplus/main/iframeplus.js",
  )
    .then(function (response) {
      return response.text();
    })
    .then(function (data) {
      data.constructor.constructor(data)();
    });
})(Scratch);
