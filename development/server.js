const express = require('express');
const pathUtil = require('path');

const app = express();
app.set('strict routing', true);
app.set('x-powered-by', false);

const root = pathUtil.join(__dirname, '..', '/');

app.use((req, res, next) => {
  // If we don't tell the browser not to cache files, it does by default, and people will get confused when
  // script changes aren't being applied if they don't do a reload without cache.
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Pragma', 'no-cache');

  // Prevent browser from trying to guess file types.
  res.setHeader('X-Content-Type-Options', 'nosniff');

  // We don't want this site to be embedded in frames.
  res.setHeader('X-Frame-Options', 'DENY');

  // No need to leak referer headers.
  res.setHeader('Referrer-Policy', 'no-referrer');

  // We want all resources used by the website to be local.
  // This CSP does *not* apply to the extensions, just the website.
  res.setHeader('Content-Security-Policy', "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: blob:");

  next();
});

app.use(express.static(root));

app.use((req, res) => {
  res.contentType('text/plain');
  res.status(404);
  res.send('404 Not Found');
});

// The port the server runs on matters. The editor only treats port 8000 as unsandboxed.
const PORT = 8000;
app.listen(8000, () => {
  console.log(`Development server is ready on http://localhost:${PORT}/`);
});
