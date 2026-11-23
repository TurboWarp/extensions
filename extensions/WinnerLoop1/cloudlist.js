// Name: Cloud Lists
// ID: cloudlist
// Description: Adds, removes, replaces and reads items in cloud lists.
// By: WinnerLoop1 <https://scratch.mit.edu/users/WinnerLoop1/>
// License: MPL-2.0

(function (Scratch) {
  'use strict';

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('Cloud List extension must run unsandboxed!');
  }

  const vm = Scratch.vm;

  const iconSvg = `data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiI+PHBhdGggZD0iTTIyIDEwYTYgNiAwIDAgMC02LTYgNiA2IDAgMCAwLTUuNiAzLjlBNSA1IDAgMCAwIDUgMTNhNSA1IDAgMCAwIDUgNWgxMmE1IDUgMCAwIDAgMC0xMHoiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iI2NjY2NjYyIgc3Ryb2tlLXdpZHRoPSIxIiBvcGFjaXR5PSIxIi8+PGNpcmNsZSBjeD0iMjQiIGN5PSI4IiByPSI2IiBmaWxsPSIjNEM5N0ZGIi8+PHBhdGggZD0iTTI0IDV2Nk0yMSA4aDYiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cmVjdCB4PSI4IiB5PSIyMCIgd2lkdGg9IjE2IiBoZWlnaHQ9IjIuNSIgcng9IjEuMjUiIGZpbGw9IiNGRkZGRkYiLz48cmVjdCB4PSI4IiB5PSIyNSIgd2lkdGg9IjEyIiBoZWlnaHQ9IjIuNSIgcng9IjEuMjUiIGZpbGw9IiNGRkZGRkYiLz48L3N2Zz4=`;

  class CloudList {
    constructor() {
      this._b64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
      this._lastWriteTime = 0;
      this._writeTimer = null;
      this._pendingWrites = new Map();
    }

    getInfo() {
      return {
        id: 'cloudlist',
        name: Scratch.translate('Cloud Lists'),
        color1: '#FF6680',
        blockIconURI: iconSvg,
        menuIconURI: iconSvg,
        blocks: [
          {
            opcode: 'addItem',
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate('add [ITEM] to cloud list [VAR]'),
            arguments: {
              ITEM: { type: Scratch.ArgumentType.STRING, defaultValue: 'hello' },
              VAR: { type: Scratch.ArgumentType.STRING, defaultValue: 'mylist' }
            }
          },
          {
            opcode: 'insertItem',
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate('insert [ITEM] into cloud list [VAR] at position [INDEX]'),
            arguments: {
              ITEM: { type: Scratch.ArgumentType.STRING, defaultValue: 'new' },
              VAR: { type: Scratch.ArgumentType.STRING, defaultValue: 'mylist' },
              INDEX: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 }
            }
          },
          {
            opcode: 'replaceItem',
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate('replace item [INDEX] in [VAR] with [ITEM]'),
            arguments: {
              INDEX: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
              VAR: { type: Scratch.ArgumentType.STRING, defaultValue: 'mylist' },
              ITEM: { type: Scratch.ArgumentType.STRING, defaultValue: 'new' }
            }
          },
          {
            opcode: 'replaceItemWithOther',
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate('replace item [INDEX1] in [VAR1] with item [INDEX2] from [VAR2]'),
            arguments: {
              INDEX1: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
              VAR1: { type: Scratch.ArgumentType.STRING, defaultValue: 'mylist1' },
              INDEX2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
              VAR2: { type: Scratch.ArgumentType.STRING, defaultValue: 'mylist2' }
            }
          },
          {
            opcode: 'deleteItem',
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate('delete item [INDEX] of cloud list [VAR]'),
            arguments: {
              INDEX: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
              VAR: { type: Scratch.ArgumentType.STRING, defaultValue: 'mylist' }
            }
          },
          {
            opcode: 'clearList',
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate('delete ALL from cloud list [VAR]'),
            arguments: {
              VAR: { type: Scratch.ArgumentType.STRING, defaultValue: 'mylist' }
            }
          },
          {
            opcode: 'getItem',
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate('item [INDEX] of cloud list [VAR]'),
            arguments: {
              INDEX: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
              VAR: { type: Scratch.ArgumentType.STRING, defaultValue: 'mylist' }
            }
          },
          {
            opcode: 'length',
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate('length of cloud list [VAR]'),
            arguments: {
              VAR: { type: Scratch.ArgumentType.STRING, defaultValue: 'mylist' }
            }
          },
          '---',
          {
            opcode: 'outputFirstToLocal',
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate('copy first item of [CLOUD_VAR] to list [LOCAL_LIST]'),
            arguments: {
              CLOUD_VAR: { type: Scratch.ArgumentType.STRING, defaultValue: 'mylist' },
              LOCAL_LIST: { type: Scratch.ArgumentType.STRING, defaultValue: 'My List' }
            }
          },
          {
            opcode: 'outputAllToLocal',
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate('copy ALL items of [CLOUD_VAR] to list [LOCAL_LIST]'),
            arguments: {
              CLOUD_VAR: { type: Scratch.ArgumentType.STRING, defaultValue: 'mylist' },
              LOCAL_LIST: { type: Scratch.ArgumentType.STRING, defaultValue: 'My List' }
            }
          },
          {
            opcode: 'syncLocalToCloud',
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate('save list [LOCAL_LIST] to [CLOUD_VAR]'),
            arguments: {
              LOCAL_LIST: { type: Scratch.ArgumentType.STRING, defaultValue: 'My List' },
              CLOUD_VAR: { type: Scratch.ArgumentType.STRING, defaultValue: 'mylist' }
            }
          },
          '---',
          {
            opcode: 'getListAsText',
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate('whole list [VAR] as text'),
            arguments: {
              VAR: { type: Scratch.ArgumentType.STRING, defaultValue: 'mylist' }
            }
          }
        ]
      };
    }

    _getCloudVar(name) {
      const target = vm.runtime.getTargetForStage();
      if (!target) return null;
      let v = target.lookupVariableByNameAndType(name, '');
      if (!v && !name.startsWith('☁ ')) {
        v = target.lookupVariableByNameAndType('☁ ' + name, '');
      }
      return v || null;
    }

    _getLocalList(name) {
      const clean = name.replace(/^☁ /, '');
      for (const target of vm.runtime.targets) {
        if (!target.isOriginal) continue;
        const v = target.lookupVariableByNameAndType(name, 'list') ||
                  target.lookupVariableByNameAndType(clean, 'list');
        if (v) return v;
      }
      return null;
    }

    _encodeItem(str) {
      if (!str) return '';
      try {
        let b64 = btoa(unescape(encodeURIComponent(String(str))));
        b64 = b64.replace(/=/g, '');
        if (b64.length > 4999) return '';
        let result = '';
        for (let i = 0; i < b64.length; i++) {
          const index = this._b64chars.indexOf(b64[i]);
          result += (index + 10).toString();
        }
        return result;
      } catch (e) {
        return '';
      }
    }

    _decodeItem(digits) {
      if (!digits) return '';
      try {
        let b64 = '';
        for (let i = 0; i + 1 < digits.length; i += 2) {
          const num = parseInt(digits.substring(i, i + 2), 10);
          const ch = this._b64chars[num - 10];
          if (ch === undefined) return '';
          b64 += ch;
        }
        while (b64.length % 4 !== 0) b64 += '=';
        return decodeURIComponent(escape(atob(b64)));
      } catch (e) {
        return '';
      }
    }

    _readList(varName) {
      const cloudVar = this._getCloudVar(varName);
      if (!cloudVar || !cloudVar.value) return [];
      try {
        const raw = String(cloudVar.value);
        if (!raw) return [];
        const list = [];
        let i = 0;
        while (i < raw.length) {
          if (i + 4 > raw.length) break;
          const n = parseInt(raw.substring(i, i + 4), 10);
          if (isNaN(n) || n % 2 !== 0) return [];
          list.push(this._decodeItem(raw.substring(i + 4, i + 4 + n)));
          i += 4 + n;
        }
        return list;
      } catch (e) {
        return [];
      }
    }

    _writeList(varName, list) {
      const cloudVar = this._getCloudVar(varName);
      if (!cloudVar) return false;
      let encoded = '';
      for (let i = 0; i < list.length; i++) {
        const digits = this._encodeItem(list[i]);
        encoded += digits.length.toString().padStart(4, '0') + digits;
      }
      if (encoded.length > 100000) {
        console.warn('Cloud List: limit exceeded (100000 characters).');
        return false;
      }
      const now = Date.now();
      const gap = now - this._lastWriteTime;
      if (gap < 50) {
        this._pendingWrites.set(varName, { cloudVar, encoded });
        if (!this._writeTimer) {
          this._writeTimer = setTimeout(() => this._flushWrites(), 50 - gap);
        }
        return true;
      }
      this._lastWriteTime = now;
      cloudVar.value = encoded;
      return true;
    }

    _flushWrites() {
      this._writeTimer = null;
      const pending = this._pendingWrites;
      this._pendingWrites = new Map();
      for (const { cloudVar, encoded } of pending.values()) {
        cloudVar.value = encoded;
      }
      this._lastWriteTime = Date.now();
    }

    addItem(args) {
      const list = this._readList(args.VAR);
      list.push(String(args.ITEM));
      this._writeList(args.VAR, list);
    }

    insertItem(args) {
      const list = this._readList(args.VAR);
      let index = Math.floor(Number(args.INDEX)) - 1;
      if (index < 0) index = 0;
      if (index > list.length) index = list.length;
      list.splice(index, 0, String(args.ITEM));
      this._writeList(args.VAR, list);
    }

    replaceItem(args) {
      const list = this._readList(args.VAR);
      const index = Math.floor(Number(args.INDEX)) - 1;
      if (index < 0 || index >= list.length) return;
      list[index] = String(args.ITEM);
      this._writeList(args.VAR, list);
    }

    replaceItemWithOther(args) {
      const list1 = this._readList(args.VAR1);
      const list2 = this._readList(args.VAR2);
      const index1 = Math.floor(Number(args.INDEX1)) - 1;
      const index2 = Math.floor(Number(args.INDEX2)) - 1;
      if (index1 < 0 || index1 >= list1.length) return;
      if (index2 < 0 || index2 >= list2.length) return;
      list1[index1] = list2[index2];
      this._writeList(args.VAR1, list1);
    }

    deleteItem(args) {
      const list = this._readList(args.VAR);
      const index = Math.floor(Number(args.INDEX)) - 1;
      if (index < 0 || index >= list.length) return;
      list.splice(index, 1);
      this._writeList(args.VAR, list);
    }

    clearList(args) {
      this._writeList(args.VAR, []);
    }

    getItem(args) {
      const list = this._readList(args.VAR);
      const index = Math.floor(Number(args.INDEX)) - 1;
      if (index < 0 || index >= list.length) return '';
      return list[index];
    }

    length(args) {
      return this._readList(args.VAR).length;
    }

    getListAsText(args) {
      return this._readList(args.VAR).join('\n');
    }

    outputFirstToLocal(args) {
      const cloudList = this._readList(args.CLOUD_VAR);
      const localList = this._getLocalList(args.LOCAL_LIST);
      if (!localList) return;
      if (cloudList.length === 0) return;
      localList.value.push(cloudList[0]);
    }

    outputAllToLocal(args) {
      const cloudList = this._readList(args.CLOUD_VAR);
      const localList = this._getLocalList(args.LOCAL_LIST);
      if (!localList) return;
      localList.value = [...cloudList];
    }

    syncLocalToCloud(args) {
      const localList = this._getLocalList(args.LOCAL_LIST);
      if (!localList) return;
      const items = localList.value.map(item => String(item));
      this._writeList(args.CLOUD_VAR, items);
    }
  }

  Scratch.extensions.register(new CloudList());
})(Scratch);
