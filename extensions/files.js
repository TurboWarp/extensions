(function(Scratch) {
  'use strict';

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('files extension must be run unsandboxed');
  }


    /*! download.js v4.2, by dandavis; 2008-2016. [CCBY2] see http://danml.com/download.html for tests/usage */
    const rawDownload = (function() {
      const root = window;
    function download(data, strFileName, strMimeType) {
      var self = window, // this script is only for browsers anyway...
        defaultMime = "application/octet-stream", // this default mime also triggers iframe downloads
        mimeType = strMimeType || defaultMime,
        payload = data,
        url = !strFileName && !strMimeType && payload,
        anchor = document.createElement("a"),
        toString = function(a) {
          return String(a);
        },
        myBlob = (self.Blob || self.MozBlob || self.WebKitBlob || toString),
        fileName = strFileName || "download",
        blob,
        reader;
      myBlob = myBlob.call ? myBlob.bind(self) : Blob;
      if (String(this) === "true") { //reverse arguments, allowing download.bind(true, "text/xml", "export.xml") to act as a callback
        payload = [payload,
          mimeType
        ];
        mimeType = payload[0];
        payload = payload[1];
      }
      if (url && url.length < 2048) { // if no filename and no mime, assume a url was passed as the only argument
        fileName = url.split("/")
          .pop()
          .split("?")[0];
        anchor.href = url; // assign href prop to temp anchor
        if (anchor.href.indexOf(url) !== -1) { // if the browser determines that it's a potentially valid url path:
          var ajax = new XMLHttpRequest();
          ajax.open("GET", url, true);
          ajax.responseType = 'blob';
          ajax.onload = function(e) {
            download(e.target.response, fileName, defaultMime);
          };
          setTimeout(function() {
            ajax.send();
          }, 0); // allows setting custom ajax headers using the return:
          return ajax;
        } // end if valid url?
      } // end if url?
      //go ahead and download dataURLs right away
      if (/^data\:[\w+\-]+\/[\w+\-]+[,;]/.test(payload)) {
        if (payload.length > (1024 * 1024 * 1.999) && myBlob !== toString) {
          payload = dataUrlToBlob(payload);
          mimeType = payload.type || defaultMime;
        } else {
          return navigator.msSaveBlob ?
            // IE10 can't do a[download], only Blobs:
            navigator.msSaveBlob(dataUrlToBlob(payload), fileName) : saver(payload); // everyone else can save dataURLs un-processed
        }
      } //end if dataURL passed?
      blob = payload instanceof myBlob ? payload : new myBlob([payload], {
        type: mimeType
      });

      function dataUrlToBlob(strUrl) {
        var parts = strUrl.split(/[:;,]/),
          type = parts[1],
          decoder = parts[2] == "base64" ? atob : decodeURIComponent,
          binData = decoder(parts.pop()),
          mx = binData.length,
          i = 0,
          uiArr = new Uint8Array(mx);
        for (i; i < mx; ++i) uiArr[i] = binData.charCodeAt(i);
        return new myBlob([
          uiArr
        ], {
          type: type
        });
      }

      function saver(url, winMode) {
        if ('download' in anchor) { //html5 A[download]
          anchor.href = url;
          anchor.setAttribute("download", fileName);
          anchor.className = "download-js-link";
          anchor.innerHTML = "downloading...";
          anchor.style.display = "none";
          document.body.appendChild(anchor);
          setTimeout(function() {
            anchor.click();
            document.body.removeChild(anchor);
            if (winMode === true) {
              setTimeout(function() {
                self.URL.revokeObjectURL(anchor.href);
              }, 250);
            }
          }, 66);
          return true;
        }
        // handle non-a[download] safari as best we can:
        if (/(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//.test(navigator.userAgent)) {
          url = url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
          if (!window.open(url)) { // popup blocked, offer direct download:
            if (confirm("Displaying New Document\n\nUse Save As... to download, then click back to return to this page.")) {
              location.href = url;
            }
          }
          return true;
        }
        //do iframe dataURL download (old ch+FF):
        var f = document.createElement("iframe");
        document.body.appendChild(f);
        if (!winMode) { // force a mime that will download:
          url = "data:" + url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
        }
        f.src = url;
        setTimeout(function() {
          document.body.removeChild(f);
        }, 333);
      } //end saver
      if (navigator.msSaveBlob) { // IE10+ : (has Blob, but not a[download] or URL)
        return navigator.msSaveBlob(blob, fileName);
      }
      if (self.URL) { // simple fast and modern way using Blob and URL:
        saver(self.URL.createObjectURL(blob), true);
      } else {
        // handle non-Blob()+non-URL browsers:
        if (typeof blob === "string" || blob.constructor === toString) {
          try {
            return saver("data:" + mimeType + ";base64," + self.btoa(blob));
          } catch (y) {
            return saver("data:" + mimeType + "," + encodeURIComponent(blob));
          }
        }
        // Blob but not URL support:
        reader = new FileReader();
        reader.onload = function(e) {
          saver(this.result);
        };
        reader.readAsDataURL(blob);
      }
      return true;
    }; /* end download() */
    return (download);
  })();
  /* eslint-enable */

  const MODE_MODAL = 'modal';
  const MODE_IMMEDIATELY_SHOW_SELECTOR = 'selector';
  const MODE_ONLY_SELECTOR = 'only-selector';
  const ALL_MODES = [MODE_MODAL, MODE_IMMEDIATELY_SHOW_SELECTOR, MODE_ONLY_SELECTOR];
  let openFileSelectorMode = MODE_MODAL;

  const AS_TEXT = 'text';
  const AS_DATA_URL = 'url';

  /**
   * @param {string} accept See MODE_ constants above
   * @param {string} as See AS_ constants above
   * @returns {Promise<string>} format given by as parameter
   */
  const showFilePrompt = (accept, as) => new Promise((_resolve) => {
    // We can't reliably show an <input> picker without "user interaction" in all environments,
    // so we have to show our own UI anyways. We may as well use this to implement some nice features
    // that native file pickers don't have:
    //  - Easy drag+drop
    //  - Reliable cancel button (input cancel event is still basically nonexistent)
    //    This is important so we can make this just a reporter instead of a command+hat block.
    //    Without an interface, the script would be stalled if the prompt was just cancelled.

    /** @param {string} text */
    const callback = (text) => {
      _resolve(text);
      outer.remove();
      document.body.removeEventListener('keydown', handleKeyDown);
    };

    let isReadingFile = false;

    /** @param {File} file */
    const readFile = (file) => {
      if (isReadingFile) {
        return;
      }
      isReadingFile = true;

      const reader = new FileReader();
      reader.onload = () => {
        callback(/** @type {string} */ (reader.result));
      };
      reader.onerror = () => {
        console.error('Failed to read file as text', reader.error);
        callback('');
      };
      if (as === AS_TEXT) {
        reader.readAsText(file);
      } else {
        reader.readAsDataURL(file);
      }
    };

    /** @param {KeyboardEvent} e */
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        e.preventDefault();
        callback('');
      }
    };
    document.body.addEventListener('keydown', handleKeyDown, {
      capture: true
    });

    const INITIAL_BORDER_COLOR = '#888';
    const DROPPING_BORDER_COLOR = '#03a9fc';

    const outer = document.createElement('div');
    outer.className = 'extension-content';
    outer.style.position = 'fixed';
    outer.style.top = '0';
    outer.style.left = '0';
    outer.style.width = '100%';
    outer.style.height = '100%';
    outer.style.display = 'flex';
    outer.style.alignItems = 'center';
    outer.style.justifyContent = 'center';
    outer.style.background = 'rgba(0, 0, 0, 0.5)';
    outer.style.zIndex = '20000';
    outer.style.color = 'black';
    outer.style.colorScheme = 'light';
    outer.addEventListener('dragover', (e) => {
      if (e.dataTransfer.types.includes('Files')) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
        modal.style.borderColor = DROPPING_BORDER_COLOR;
      }
    });
    outer.addEventListener('dragleave', () => {
      modal.style.borderColor = INITIAL_BORDER_COLOR;
    });
    outer.addEventListener('drop', (e) => {
      const file = e.dataTransfer.files[0];
      if (file) {
        e.preventDefault();
        readFile(file);
      }
    });
    outer.addEventListener('click', (e) => {
      if (e.target === outer) {
        callback('');
      }
    });

    const modal = document.createElement('button');
    modal.style.boxShadow = '0 0 10px -5px currentColor';
    modal.style.cursor = 'pointer';
    modal.style.font = 'inherit';
    modal.style.background = 'white';
    modal.style.padding = '16px';
    modal.style.borderRadius = '16px';
    modal.style.border = `8px dashed ${INITIAL_BORDER_COLOR}`;
    modal.style.position = 'relative';
    modal.style.textAlign = 'center';
    modal.addEventListener('click', () => {
      input.click();
    });
    modal.focus();
    outer.appendChild(modal);

    const input = document.createElement('input');
    input.type = 'file';
    input.accept = accept;
    input.addEventListener('change', (e) => {
      // @ts-expect-error
      const file = e.target.files[0];
      if (file) {
        readFile(file);
      }
    });

    const title = document.createElement('div');
    title.textContent = 'Select or drop file';
    title.style.fontSize = '1.5em';
    title.style.marginBottom = '8px';
    modal.appendChild(title);

    const subtitle = document.createElement('div');
    const formattedAccept = accept || 'any';
    subtitle.textContent = `Accepted formats: ${formattedAccept}`;
    modal.appendChild(subtitle);

    document.body.appendChild(outer);

    if (openFileSelectorMode === MODE_IMMEDIATELY_SHOW_SELECTOR || openFileSelectorMode === MODE_ONLY_SELECTOR) {
      input.click();
    }

    if (openFileSelectorMode === MODE_ONLY_SELECTOR) {
      // Note that browser support for cancel is currently quite bad
      input.addEventListener('cancel', () => {
        callback('');
      });
      outer.remove();
    }
  });

  /**
   * @param {string} text Text to download
   * @param {string} file Name of the file
   */
  const download = (text, file) => {
    const blob = new Blob([text]);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = file;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  class Files {
    getInfo () {
      return {
        id: 'files',
        name: 'Files',
        color1: '#fcb103',
        color2: '#db9a37',
        color3: '#db8937',
        blocks: [
          {
            opcode: 'showPicker',
            blockType: Scratch.BlockType.REPORTER,
            text: 'open a file',
            disableMonitor: true,
            hideFromPalette: true
          },
          {
            opcode: 'showPickerExtensions',
            blockType: Scratch.BlockType.REPORTER,
            text: 'open a [extension] file',
            arguments: {
              extension: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '.txt'
              }
            },
            hideFromPalette: true
          },

          {
            opcode: 'showPickerAs',
            blockType: Scratch.BlockType.REPORTER,
            text: 'open a file as [as]',
            arguments: {
              as: {
                type: Scratch.ArgumentType.STRING,
                menu: 'encoding'
              }
            }
          },
          {
            opcode: 'showPickerExtensionsAs',
            blockType: Scratch.BlockType.REPORTER,
            text: 'open a [extension] file as [as]',
            arguments: {
              extension: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '.txt'
              },
              as: {
                type: Scratch.ArgumentType.STRING,
                menu: 'encoding'
              }
            }
          },

          '---',

          {
            opcode: 'download',
            blockType: Scratch.BlockType.COMMAND,
            text: 'download [text] as [file]',
            arguments: {
              text: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Hello, world!'
              },
              file: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'save.txt'
              }
            }
          },
          {
            opcode: 'downloadRAW',
            blockType: Scratch.BlockType.COMMAND,
            text: 'download raw data: [text] as [file]',
            arguments: {
              text: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Hello, world!'
              },
              file: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'save.txt'
              }
            }
          },
          {
            opcode: 'setOpenMode',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set open file selector mode to [mode]',
            arguments: {
              mode: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: MODE_MODAL,
                menu: 'automaticallyOpen'
              }
            }
          }
        ],
        menus: {
          encoding: {
            acceptReporters: true,
            items: [
              {
                text: 'text',
                value: AS_TEXT
              },
              {
                text: 'data: URL',
                value: AS_DATA_URL
              }
            ]
          },
          automaticallyOpen: {
            acceptReporters: true,
            items: [
              {
                text: 'show modal',
                value: MODE_MODAL
              },
              {
                text: 'open selector immediately',
                value: MODE_IMMEDIATELY_SHOW_SELECTOR
              }
            ]
          }
        }
      };
    }

    showPicker () {
      return showFilePrompt('', AS_TEXT);
    }

    showPickerExtensions (args) {
      return showFilePrompt(args.extension, AS_TEXT);
    }

    showPickerAs (args) {
      return showFilePrompt('', args.as);
    }

    showPickerExtensionsAs (args) {
      return showFilePrompt(args.extension, args.as);
    }

    download (args) {
      download(args.text, args.file);
    }

    setOpenMode (args) {
      if (ALL_MODES.includes(args.mode)) {
        openFileSelectorMode = args.mode;
      } else {
        console.warn(`unknown mode`, args.mode);
      }
    }

    //survexe1pc
    downloadRAW(args) {
      rawDownload(args.text, args.file);
    }
  }

  Scratch.extensions.register(new Files());
})(Scratch);
/*! Download.js license
download.js v4.2, by dandavis; 2008-2016. [CCBY2] see http://danml.com/download.html for tests/usage
v1 landed a FF+Chrome compat way of downloading strings to local un-named files, upgraded to use a hidden frame and optional mime
v2 added named files via a[download], msSaveBlob, IE (10+) support, and window.URL support for larger+faster saves than dataURLs
v3 added dataURL and Blob Input, bind-toggle arity, and legacy dataURL fallback was improved with force-download mime and base64 support. 3.1 improved safari handling.
v4 adds AMD/UMD, commonJS, and plain browser support
v4.1 adds url download capability via solo URL argument (same domain/CORS only)
v4.2 adds semantic variable names, long (over 2MB) dataURL support, and hidden by default temp anchors
https://github.com/rndme/download
*/