# Unsandboxed Extensions for TurboWarp

https://extensions.turbowarp.org/

## Local development

Set up a local HTTP server on `http://localhost:8000/`. TurboWarp will load extensions from there without the sandbox.

If you happen to have Python 3 installed, this is easy:

```
python3 -m http.server
```

If you install npm dependencies locally, TypeScript aware editors such as Visual Studio Code will give you smart autocomplete suggestions for most Scratch APIs based on [@turbowarp/types](https://github.com/TurboWarp/types). Note that these types are not 100% complete and are missing anything TurboWarp specific for now.

```
npm ci
```

See [CONTRIBUTING.md](CONTRIBUTING.md) for more about contributing.
