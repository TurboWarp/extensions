// GameDevHelper - Fenicf0x
// build 1.04
(function(Scratch) {
  'use strict';

  const is_ok = Scratch && Scratch.extensions && Scratch.extensions.unsandboxed;
  if (!is_ok) {
    console.error("GdevHelper: need unsandboxed mode!");
    return; }

  class Gdev_Toolbox {
    constructor() {
      const r = Scratch.vm.runtime;
      const _s = r.variableSetValue;
      r.variableSetValue = function(id, val) {
        _s.call(this, id, val);
        r.startHats('gamedevhelper_whenVariableChanges');
      };
    }

    getInfo() {
      return {
        id: 'gamedevhelper',
        name: 'Game Dev Helper',
        color1: '#58ff4c',
        blocks: [
          "--- Math & Curves ---",
          {
            opcode: 'weighted_rand',
            blockType: Scratch.BlockType.REPORTER,
            text: 'pick random [min] to [max] weight [w]',
            arguments: { 
              min: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
              max: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
              w: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 } 
            }
          },
          { opcode: 'flipCoin', blockType: Scratch.BlockType.REPORTER, text: 'true or false?' },
          {
            opcode: 'calc_power',
            blockType: Scratch.BlockType.REPORTER,
            text: '[n1] ^ [n2]',
            arguments: { n1: { type: Scratch.ArgumentType.NUMBER, defaultValue: 2 }, n2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 3 } }
          },
          { opcode: 'is_even_num', blockType: Scratch.BlockType.BOOLEAN, text: '[num] is even?', arguments: { num: { type: Scratch.ArgumentType.NUMBER, defaultValue: 2 } } },
          { opcode: 'check_range', blockType: Scratch.BlockType.BOOLEAN, text: 'is [v] between [a] and [b]?',
            arguments: { v: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 }, a: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 }, b: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 } }
          },
          {
            opcode: 'round_number',
            blockType: Scratch.BlockType.REPORTER,
            text: 'round [val] to [prec] places',
            arguments: { val: { type: Scratch.ArgumentType.NUMBER, defaultValue: 3.14 }, prec: { type: Scratch.ArgumentType.NUMBER, defaultValue: 2 } }
          },

          "--- Game Data Logic ---",
          {
            opcode: 'parse_save_data',
            blockType: Scratch.BlockType.REPORTER,
            text: 'extract value from [str] at key [k]',
            arguments: { 
              str: { type: Scratch.ArgumentType.STRING, defaultValue: 'score:100|hp:50' }, 
              k: { type: Scratch.ArgumentType.STRING, defaultValue: 'score' } 
            }
          },
          {
            opcode: 'grab_end',
            blockType: Scratch.BlockType.REPORTER,
            text: 'last letter of [t]',
            arguments: { t: { type: Scratch.ArgumentType.STRING, defaultValue: 'apple' } }
          },
          {
            opcode: 'get_word_count',
            blockType: Scratch.BlockType.REPORTER,
            text: 'words in [input]',
            arguments: { input: { type: Scratch.ArgumentType.STRING, defaultValue: 'hello world' } }
          },
          {
            opcode: 'validate_id',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'is ID [val] valid format [ptn]?',
            arguments: { 
              val: { type: Scratch.ArgumentType.STRING, defaultValue: 'SKU-123' }, 
              ptn: { type: Scratch.ArgumentType.STRING, defaultValue: 'abc-###' } 
            }
          },

          "--- Controls ---",
          {
            opcode: 'kill_scripts',
            blockType: Scratch.BlockType.COMMAND,
            text: 'stop scripts for [target]',
            arguments: { target: { type: Scratch.ArgumentType.STRING, menu: 'SPRITE_MENU' } }
          },
          {
            opcode: 'get_visibility',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'is [obj] hidden?',
            arguments: { obj: { type: Scratch.ArgumentType.STRING, menu: 'SPRITE_MENU' } }
          },
          {
            opcode: 'mouse_set',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set cursor [mode]',
            arguments: { mode: { type: Scratch.ArgumentType.STRING, menu: 'VIS_MENU' } }
          },

          "--- Events ---",
          {
            opcode: 'whenVariableChanges',
            blockType: Scratch.BlockType.HAT,
            text: 'when any variable changes'
          }
        ],
        menus: {
          VIS_MENU: { acceptReporters: true, items: ['visible', 'hidden'] },
          SPRITE_MENU: { acceptReporters: true, items: 'fetch_targets' }
        }
      };
    }

    _fixCasting(v) {
      if (typeof v === 'boolean') return v;
      if (!isNaN(v) && v !== '') return Number(v);
      return String(v);
    }

    fetch_targets() {
      const names = [];
      const tgts = Scratch.vm.runtime.targets;
      for (let i = 0; i < tgts.length; i++) {
        if (!tgts[i].isStage) names.push(tgts[i].getName());
      }
      return names.length > 0 ? names : ['None'];
    }

    weighted_rand(arg) {
      const low = this._fixCasting(arg.min);
      const high = this._fixCasting(arg.max);
      const w = this._fixCasting(arg.w) || 1;
      
      let tmp = Math.random();
      const r = Math.pow(tmp, 1 / w);
      return Math.floor(r * (high - low + 1)) + low;
    }

    flipCoin() { return Math.random() < 0.5 ? 'true' : 'false'; }
    
    calc_power(val) { 
      let res = Math.pow(this._fixCasting(val.n1), this._fixCasting(val.n2));
      return res; 
    }
    
    is_even_num(data) { return (this._fixCasting(data.num) % 2) === 0; }
    
    check_range(arg) { 
      const n = this._fixCasting(arg.v);
      return n >= this._fixCasting(arg.a) && n <= this._fixCasting(arg.b); }
    
    round_number(arg) {
      const p = Math.pow(10, this._fixCasting(arg.prec));
      return Math.round(this._fixCasting(arg.val) * p) / p;
    }

    parse_save_data(data) {
      const raw = String(data.str);
      const key = String(data.k);
      const segments = raw.split('|');
      for (let i = 0; i < segments.length; i++) {
        const pair = segments[i].split(':');
        if (pair[0] === key) return pair[1] || "";
      }
      return "";
    }

    grab_end(arg) {
      const s = String(arg.t);
      return s ? s[s.length - 1] : "";
    }

    get_word_count(arg) {
      const s = String(arg.input).trim();
      if (!s) return 0;
      return s.split(/\s+/).length;
    }

    validate_id(arg) {
      const input = String(arg.val);
      const pattern = String(arg.ptn);
      if (input.length !== pattern.length) return false;

      for (let i = 0; i < pattern.length; i++) {
        let p_char = pattern[i];
        let i_char = input[i];
        if (p_char === '#') {
          if (!/[0-9]/.test(i_char)) return false;
        } else if (p_char !== i_char) {
          return false;
        }
      }
      return true;
    }

    kill_scripts(arg) {
      const rt = Scratch.vm.runtime;
      const t = rt.getSpriteTargetByName(arg.target);
      if (t) rt.stopForTarget(t);
    }

    get_visibility(arg) {
      const s = Scratch.vm.runtime.getSpriteTargetByName(arg.obj);
      return s ? !s.visible : false;
    }

    mouse_set(arg) {
      try {
        const c = Scratch.vm.runtime.renderer.canvas;
        c.style.cursor = (arg.mode === 'hidden') ? 'none' : 'default';
      } catch (e) { /* fail silent */ }
    }
  }

  Scratch.extensions.register(new Gdev_Toolbox());
})(Scratch);
