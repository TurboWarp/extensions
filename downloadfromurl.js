// Name: Download from URL
// ID: downloadfromurl
// Description: Simple Download files form URL
// v1.0.0

class DownloadFromURL {
  getInfo() {
    return {
      id: 'downloadfromurl',
      name: 'Download from URL',
      blocks: [
        {
          opcode: 'download',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Download file from URL [url] with filename [filename]',
          arguments: {
            url: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'https://example.com/file.txt'
            },
            filename: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'example.txt'
            }
          }
        },
        {
          opcode: 'isSafeURL',
          blockType: Scratch.BlockType.BOOLEAN,
          text: 'URL [url] is safe?',
          arguments: {
            url: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'https://example.com/'
            }
          }
        },
        {
          opcode: 'isitdownloadable',
          blockType: Scratch.BlockType.BOOLEAN,
          text: 'URL [url] is it downloadable?',
          arguments: {
            url: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'https://example.com/'
            }
          }
        }
      ]
    };
  }

  async isSafeURL(args) {
    const url = args.url;
    const isHTTPS = url.startsWith('https://');
    return isHTTPS;
  }

  async isitdownloadable(args) {
    const url = args.url;

    try {
      const response = await fetch(url, { method: 'HEAD' });
      if (response.ok) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error checking URL:', error);
      return false;
    }
  }

  async download(args) {
    const url = args.url;
    const filename = args.filename;

    try {
      const isSafe = await this.isSafeURL({ url });
      if (!isSafe) {
        console.error('Unsafe URL! Download aborted.');
        return;
      }

      const isViewable = await this.isBrowserViewableURL({ url });
      if (!isViewable) {
        console.error('URL is not viewable in browser! Download aborted.');
        return;
      }

      const response = await fetch(url);
      const blob = await response.blob();

      const a = document.createElement('a');
      document.body.appendChild(a);
      a.style.display = 'none';

      const blobUrl = window.URL.createObjectURL(blob);

      a.href = blobUrl;
      a.download = filename;

      a.click();

      window.URL.revokeObjectURL(blobUrl);
      document.body.removeChild(a);

      console.log('File downloaded successfully!');
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  }
}

Scratch.extensions.register(new DownloadFromURL());
