(function (Scratch) {
  'use strict';

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('Local Storage must be run unsandboxed');
  }

  const PREFIX = 'extensions.turbowarp.org/local-storage:';
  let namespace = '';
  const getFullStorageKey = () => `${PREFIX}${namespace}`;

  const validNamespace = () => {
    const valid = !!namespace;
    if (!valid) {
      alert('Local Storage extension: project must run the "set storage namespace ID" block before it can use other blocks');
    }
    return valid;
  };

  const readFromStorage = () => {
    try {
      // localStorage could throw if unsupported
      const data = localStorage.getItem(getFullStorageKey());
      if (data) {
        // JSON.parse could throw if data is invalid
        const parsed = JSON.parse(data);
        if (parsed && parsed.data) {
          // Remove invalid values from the JSON
          const processed = {};
          for (const [key, value] of Object.entries(parsed.data)) {
            if (typeof value === 'number' || typeof value === 'string' || typeof value === 'boolean') {
              processed[key] = value;
            }
          }
          return processed;
        }
      }
    } catch (error) {
      console.error('error reading from local storage', error);
    }
    return {};
  };

  const saveToLocalStorage = (data) => {
    try {
      if (Object.keys(data).length > 0) {
        localStorage.setItem(getFullStorageKey(), JSON.stringify({
          time: Math.round(Date.now() / 1000),
          data
        }));
      } else {
        localStorage.removeItem(getFullStorageKey());
      }
    } catch (error) {
      console.error('error saving to locacl storage', error);
    }
  };

  window.addEventListener('storage', (event) => {
    if (namespace && event.key === getFullStorageKey() && event.storageArea === localStorage) {
      Scratch.vm.runtime.startHats('localstorage_whenChanged');
    }
  });

  class LocalStorage {
    getInfo() {
      return {
        id: 'localstorage',
        name: 'Local Storage',
        docsURI: "https://extensions.turbowarp.org/local-storage.html",
        blocks: [
          {
            opcode: 'setProjectId',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set storage namespace ID to [ID]',
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'project title'
              }
            }
          },
          {
            opcode: 'get',
            blockType: Scratch.BlockType.REPORTER,
            text: 'get key [KEY]',
            arguments: {
              KEY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'score',
              },
            },
          },
          {
            opcode: 'set',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set key [KEY] to [VALUE]',
            arguments: {
              KEY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'score',
              },
              VALUE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '1000',
              },
            },
          },
          {
            opcode: 'remove',
            blockType: Scratch.BlockType.COMMAND,
            text: 'delete key [KEY]',
            arguments: {
              KEY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'score'
              },
            },
          },
          {
            opcode: 'removeAll',
            blockType: Scratch.BlockType.COMMAND,
            text: 'delete all keys'
          },
          {
            opcode: 'whenChanged',
            blockType: Scratch.BlockType.HAT,
            text: 'when another window changes storage',
            isEdgeActivated: false
          }
        ],
      };
    }
    setProjectId({ ID }) {
      namespace = Scratch.Cast.toString(ID);
    }
    get({ KEY }) {
      if (!validNamespace()) {
        return '';
      }
      const storage = readFromStorage();
      KEY = Scratch.Cast.toString(KEY);
      if (!Object.prototype.hasOwnProperty.call(storage, KEY)) {
        return '';
      }
      return storage[KEY];
    }
    set({ KEY, VALUE }) {
      if (!validNamespace()) {
        return '';
      }
      const storage = readFromStorage();
      storage[Scratch.Cast.toString(KEY)] = VALUE;
      saveToLocalStorage(storage);
    }
    remove({ KEY }) {
      if (!validNamespace()) {
        return '';
      }
      const storage = readFromStorage();
      delete storage[Scratch.Cast.toString(KEY)];
      saveToLocalStorage(storage);
    }
    removeAll() {
      if (!validNamespace()) {
        return '';
      }
      saveToLocalStorage({});
    }
  }
  Scratch.extensions.register(new LocalStorage());
})(Scratch);
