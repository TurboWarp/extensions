// This is a loader that automatically loads the extension from GitHub.
(async function(Scratch) {
  var code = await (await fetch('https://raw.githubusercontent.com/kilgorezer/turbowarpIframeplus/main/iframeplus.js')).text();
  Function(code)();
})(Scratch)
