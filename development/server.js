const express = require("express");
const Builder = require("./builder");

let mostRecentBuild = null;
const builder = new Builder("development");
builder.startWatcher((newBuild) => {
  mostRecentBuild = newBuild;
});

const app = express();
app.set("strict routing", true);
app.set("x-powered-by", false);

app.use((req, res, next) => {
  // If we don't tell the browser not to cache files, it does by default, and people will get confused when
  // script changes aren't being applied if they don't do a reload without cache.
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("Pragma", "no-cache");

  // Prevent browser from trying to guess file types.
  res.setHeader("X-Content-Type-Options", "nosniff");

  // No need to leak Referer headers.
  res.setHeader("Referrer-Policy", "no-referrer");

  // We want all resources used by the website to be local.
  // This CSP does *not* apply to the extensions, just the website.
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self' 'unsafe-inline' data: blob:"
  );

  // Allows loading cross-origin example images and matches GitHub pages.
  res.setHeader("Access-Control-Allow-Origin", "*");

  next();
});

app.get("/*", (req, res, next) => {
  if (!mostRecentBuild) {
    res.contentType("text/plain");
    res.status(500);
    res.send("Build Failed; See Console");
    return;
  }

  const fileInBuild = mostRecentBuild.getFile(decodeURIComponent(req.path));
  if (!fileInBuild) {
    return next();
  }

  res.contentType(fileInBuild.getType());
  res.send(fileInBuild.read());
});

app.use((req, res) => {
  res.contentType("text/plain");
  res.status(404);
  res.send("404 Not Found");
});

// The port the server runs on matters. The editor only treats port 8000 as unsandboxed.
const PORT = 8000;
app.listen(8000, () => {
  console.log(`Development server is ready on http://localhost:${PORT}/`);
});
