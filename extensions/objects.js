/*!
 * Copyright 2023 Turquioii / Vercte/ Lopste
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function (Scratch) {
  'use strict';

  let objectmap = new Map();

  function findSmallestMissingValue(grid) {
    const len = grid.length;

    for (let j = 0; j < len; j++) {
      while (grid[j] !== j + 1) {
        const cur = grid[j];
        if (cur <= 0 || cur > len || grid[cur - 1] === cur) {
          break;
        }
        [grid[j], grid[cur - 1]] = [grid[cur - 1], grid[j]];
      }
    }

    for (let j = 0; j < len; j++) {
      if (grid[j] !== j + 1) {
        return j + 1;
      }
    }

    return len + 1;
  }

  function getSmallestItem() {
    let list = Array.from(objectmap.keys());
    return findSmallestMissingValue(list);
  }

  class ObjectExtension {
    getInfo() {
      return {
        id: 'tqobjects',
        name: 'Objects',
        color1: '#485eea',
        color2: '#3d53e6',
        color3: '#2b43de',
        blocks: [
          {
            opcode: 'obj_number',
            blockType: Scratch.BlockType.REPORTER,
            text: 'amount of objects',
          },
          {
            opcode: 'obj_list',
            blockType: Scratch.BlockType.REPORTER,
            text: 'list objects',
          },
          {
            opcode: 'obj_byindex',
            blockType: Scratch.BlockType.REPORTER,
            text: 'object by index [I]',
            arguments: {
              I: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '1',
              },
            },
          },
          {
            opcode: 'obj_stringify',
            blockType: Scratch.BlockType.REPORTER,
            text: 'get values of object [DICT] as JSON',
            arguments: {
              DICT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '1',
              },
            },
          },
          {
            opcode: 'obj_parse',
            blockType: Scratch.BlockType.COMMAND,
            text: 'create object with properties [OBJ]',
            arguments: {
              OBJ: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '{"location": "here", "color": "any"}',
              },
            },
          },
          {
            opcode: 'obj_join',
            blockType: Scratch.BlockType.REPORTER,
            text: '[A] "[B]": "[C]" [D]',
            arguments: {
              A: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '{',
                menu: 'JHAT',
              },
              B: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'location',
              },
              C: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'here',
              },
              D: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '}',
                menu: 'JCAP',
              },
            },
          },
          '---',
          {
            opcode: 'obj_get',
            blockType: Scratch.BlockType.REPORTER,
            text: 'get property [KEY] from object [DICT]',
            arguments: {
              KEY: { type: Scratch.ArgumentType.STRING, defaultValue: 'location' },
              DICT: { type: Scratch.ArgumentType.STRING, defaultValue: '1' },
            },
          },
          {
            opcode: 'obj_property_defined',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'is property [KEY] in object [DICT] defined?',
            arguments: {
              KEY: { type: Scratch.ArgumentType.STRING, defaultValue: 'location' },
              DICT: { type: Scratch.ArgumentType.STRING, defaultValue: '1' },
            },
          },
          {
            opcode: 'obj_set',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set property [KEY] in object [DICT] to [VAL]',
            arguments: {
              KEY: { type: Scratch.ArgumentType.STRING, defaultValue: 'location' },
              DICT: { type: Scratch.ArgumentType.STRING, defaultValue: '1' },
              VAL: { type: Scratch.ArgumentType.STRING, defaultValue: 'there' },
            },
          },
          {
            opcode: 'obj_change',
            blockType: Scratch.BlockType.COMMAND,
            text: 'change property [KEY] in object [DICT] by [BY]',
            arguments: {
              KEY: { type: Scratch.ArgumentType.STRING, defaultValue: 'coolness' },
              DICT: { type: Scratch.ArgumentType.STRING, defaultValue: '1' },
              BY: { type: Scratch.ArgumentType.NUMBER, defaultValue: '100' },
            },
          },
          '---',
          {
            opcode: 'obj_delete',
            blockType: Scratch.BlockType.COMMAND,
            text: 'destroy object [DICT]',
            arguments: {
              DICT: { type: Scratch.ArgumentType.STRING, defaultValue: '1' },
            },
          },
          {
            opcode: 'obj_delete_key',
            blockType: Scratch.BlockType.COMMAND,
            text: 'destroy property [KEY] from object [DICT]',
            arguments: {
              KEY: { type: Scratch.ArgumentType.STRING, defaultValue: 'location' },
              DICT: { type: Scratch.ArgumentType.STRING, defaultValue: '1' },
            },
          },
          {
            opcode: 'obj_purge',
            blockType: Scratch.BlockType.COMMAND,
            text: 'purge all objects',
          },
        ],
        menus: {
          JCAP: {
            acceptReporters: true,
            items: [
              '}',
              ', ',
              ' ',
            ],
          },
          JHAT: {
            acceptReporters: true,
            items: [
              '{',
              ', ',
              ' ',
            ],
          },
        },
      };
    }

    obj_number() {
      return Array.from(objectmap.keys()).length;
    }

    obj_list() {
      return Array.from(objectmap.keys()).join(' ');
    }

    obj_byindex({ I }) {
      return Array.from(objectmap.keys())[I];
    }

    obj_stringify({ DICT }) {
      const mapToObj = m => {
        return Array.from(m).reduce((obj, [key, value]) => {
          obj[key] = value;
          return obj;
        }, {});
      };
      if (!objectmap.get(DICT)) return '{}';
      return JSON.stringify(mapToObj(objectmap.get(DICT)));
    }

    obj_parse({ OBJ }) {
      let dict = null;
      try {
        dict = JSON.parse(OBJ);
      } catch (e) {
        dict = { 'error': String(e) };
      }
      objectmap.set(getSmallestItem(), new Map(Object.entries(dict)));
    }

    obj_join({ A, B, C, D }) {
      return A + '"' + B + '": "' + C + '"' + D;
    }

    obj_get({ KEY, DICT }) {
      if (!objectmap.get(DICT)) return 'null';
      let dict = objectmap.get(DICT);
      let value = dict.get(KEY);
      if (typeof value === 'number' || typeof value === 'string' || typeof value === 'boolean') {
        return value;
      }
      if (value === undefined) {
        return 'undefined';
      }
      return JSON.stringify(value);
    }

    obj_property_defined({ KEY, DICT }) {
      if (!objectmap.get(DICT)) return false;
      let dict = objectmap.get(DICT);
      return dict.get(KEY) === undefined ? false : true;
    }

    obj_set({ KEY, DICT, VAL }) {
      if (!objectmap.get(DICT)) {
        objectmap.set(DICT, new Map());
      }
      let dict = objectmap.get(DICT);
      dict.set(KEY, VAL);
    }

    obj_change({ KEY, DICT, BY }) {
      if (!objectmap.get(DICT)) {
        objectmap.set(DICT, new Map());
      }
      let dict = objectmap.get(DICT);
      if (isNaN(+dict.get(KEY))) dict.set(KEY, 0);
      dict.set(KEY, parseInt(dict.get(KEY)) + parseInt(BY));
    }

    obj_delete({ DICT }) {
      if (objectmap.has(DICT)) objectmap.delete(DICT);
    }

    obj_delete_key({ KEY, DICT }) {
      if (objectmap.has(DICT)) {
        objectmap.get(DICT).delete(KEY);
      }
    }

    obj_purge() {
      objectmap = new Map();
    }
  }

  Scratch.extensions.register(new ObjectExtension());
})(Scratch);
