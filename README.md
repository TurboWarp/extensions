# TurboWarp Extensions

https://extensions.turbowarp.org/

## Local development

We provide a local development server:

```bash
# Install dependencies
npm ci

# Start development server
npm run dev
```

This starts an HTTP server on `http://localhost:8000/` which TurboWarp will load extensions from without the sandbox.

After installing npm dependencies, TypeScript aware editors such as Visual Studio Code will give you smart autocomplete suggestions for most Scratch APIs based on [@turbowarp/types](https://github.com/TurboWarp/types). Note that these types are not 100% complete and are missing anything TurboWarp specific for now.

See [CONTRIBUTING.md](CONTRIBUTING.md) for more about contributing.

## License

By default, files in this repository are licensed under the [MIT License](licenses/MIT.txt). However, there are exceptions. Files that are under a different license will have a license header at the top of their source code or in an adjacent README file.
