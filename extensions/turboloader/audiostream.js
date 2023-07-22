/*
Experimental extension for Scratch.
*/
(function (Scratch) {
  class AudioStream {
    constructor() {
      this.runtime = Scratch.vm.runtime;
      this.vm = Scratch.vm;
      this.contextList = [];
      this.contextBindings = {};
      this.assetSourceList = {};
    }
    getInfo() {
      return {
        id: 'audiostr',
        name: 'AudioStream 🔊',
        color1: '#ba45ac',
        color2: '#a8399b',
        color3: '#942c88',
        blocks: [
          {
            opcode: 'am_loadasset',
            blockType: 'command',
            text: 'load sound from project [SRC]',
            arguments: {
              SRC: {
                type: 'string',
                menu: 'audAssetList'
              }
            }
          },
          {
            opcode: 'am_playfromurl',
            blockType: 'command',
            text: 'load sound from URL/URI [URL]',
            arguments: {
              URL: {
                type: 'string',
                defaultValue: 'https://extensions.turbowarp.org/meow.mp3'
              }
            }
          },
          {
            opcode: 'am_playnew',
            blockType: 'command',
            text: 'start playing [SRC] in a new context',
            arguments: {
              SRC: {
                type: 'string',
                menu: 'audAssetList'
              }
            }
          },
          '---',
          {
            opcode: 'am_usecontext',
            blockType: 'command',
            text: 'use [SPRITE]\'s context in this sprite',
            arguments: {
              SPRITE: {type: 'string',menu: 'spriteList'}
            }
          },
          '---',
          {
            opcode: 'am_play',
            blockType: 'command',
            text: 'play',
            arguments: {}
          },
          {
            opcode: 'am_playandwait',
            blockType: 'command',
            text: 'play and wait till the end',
            arguments: {}
          },
          {
            opcode: 'am_resume',
            blockType: 'command',
            text: 'resume',
            arguments: {}
          },
          {
            opcode: 'am_pause',
            blockType: 'command',
            text: 'pause',
            arguments: {}
          },
          {
            opcode: 'am_stopthis',
            blockType: 'command',
            text: 'stop (this context)',
            arguments: {}
          },
          {
            opcode: 'am_stophim',
            blockType: 'command',
            text: 'stop sounds of [SPRITE]',
            arguments: {SPRITE: {type: 'string', menu: 'spriteList'}}
          },
          {
            opcode: 'am_stop',
            blockType: 'command',
            text: 'stop all sounds',
            arguments: {}
          },
          {
            opcode: 'am_hasStopped',
            blockType: 'Boolean',
            text: 'has stopped',
            arguments: {}
          },
          {
            opcode: 'am_isPaused',
            blockType: 'Boolean',
            text: 'is paused',
            arguments: {}
          },
          '---',
          {
            opcode: 'am_getanalyser',
            blockType: 'reporter',
            text: 'get all visualizer data (slow)',
            arguments: {}
          },
          {
            opcode: 'am_getanalyserindex',
            blockType: 'reporter',
            text: 'get visualizer data at [INDEX]',
            arguments: {
              INDEX: {
                type: 'number'
              }
            }
          },
          {
            opcode: 'am_analyserfft',
            blockType: 'command',
            text: 'set visualizer read size to [VAL] (must be power of 2)',
            arguments: {
              VAL: {
                'type': 'number',
                'defaultValue': '256'
              }
            }
          },
          '---',
          {
            opcode: 'am_setvolume',
            blockType: 'command',
            text: 'set volume to [VAL]',
            arguments: {
              VAL: {
                type: 'number',
                defaultValue: '1.0'
              }
            }
          },
          {
            opcode: 'am_getvolume',
            blockType: 'reporter',
            text: 'volume',
            arguments: {}
          },
          '---',
          {
            opcode: 'am_skipToTime',
            blockType: 'command',
            text: 'skip to time [VAL]',
            arguments: {
              VAL: {
                type: 'number',
                defaultValue: '0'
              }
            }
          },
          {
            opcode: 'am_songDuration',
            blockType: 'reporter',
            text: 'sound duration',
            arguments: {}
          },
          {
            opcode: 'am_songCurrent',
            blockType: 'reporter',
            text: 'current time',
            arguments: {}
          },
          '---',
          {
            opcode: 'am_setpitch',
            blockType: 'command',
            text: 'set speed/pitch to [VAL]',
            arguments: {
              VAL: {
                type: 'number',
                defaultValue: '0'
              }
            }
          },
          {
            opcode: 'am_setppitch',
            blockType: 'command',
            text: 'preservesPitch [VAL]',
            arguments: {
              VAL: {
                type: 'Boolean',
                defaultValue: 'false'
              }
            }
          },
          {
            opcode: 'am_setstereo',
            blockType: 'command',
            text: 'set pan to [VAL] (-1 to 1)',
            arguments: {
              VAL: {
                type: 'number',
                defaultValue: '0'
              }
            }
          },
          {
            opcode: 'am_setfilter',
            blockType: 'command',
            text: 'filter [FIL] set frequency [FQ] quality [Q]',
            arguments: {
              FIL: {
                type: 'string',
                defaultValue: 'lowpass',
                menu: 'filtersmenu'
              },
              Q: {
                type: 'number',
                defaultValue: '0'
              },
              FQ: {
                type: 'number',
                defaultValue: '440'
              }
            }
          },
          {
            opcode: 'am_toglefilter',
            blockType: 'command',
            text: 'filter [FIL] [STATE]',
            arguments: {
              FIL: {
                type: 'string',
                defaultValue: 'lowpass',
                menu: 'filtersmenu'
              },
              STATE: {
                type: 'string',
                defaultValue: 'connect',
                menu: 'connectOrDisconnect'
              }
            }
          },
          {
            opcode: 'am_freset',
            blockType: 'command',
            text: 'reset all filters',
            arguments: {}
          },
          {
            opcode: 'am_connect',
            blockType: 'command',
            text: 'connect [STRING] to track [TRACK]',
            arguments: {
              STRING: {
                type: 'string',
                defaultValue: 'filter1'
              },
              TRACK: {
                type: 'string',
                defaultValue: 'track'
              }
            }
          },
          {
            opcode: 'am_disconnect',
            blockType: 'command',
            text: 'disconnect [STRING] from track [TRACK]',
            arguments: {
              STRING: {
                type: 'string',
                defaultValue: 'filter1'
              },
              TRACK: {
                type: 'string',
                defaultValue: 'track'
              }
            }
          },
        ],
        menus: {
          filtersmenu: [
            {
              text: 'lowpass',
              value: 'lowpass'
            },
            {
              text: 'highpass',
              value: 'highpass'
            },
            {
              text: 'bandpass',
              value: 'bandpass'
            },
            {
              text: 'lowshelf',
              value: 'lowshelf'
            },
            {
              text: 'highshelf',
              value: 'highshelf'
            },
            {
              text: 'peaking',
              value: 'peaking'
            },
            {
              text: 'notch',
              value: 'notch'
            },
            {
              text: 'allpass',
              value: 'allpass'
            }
          ],
          connectOrDisconnect: [
            {
              text: 'connect',
              value: 'connect'
            },
            {
              text: 'disconnect',
              value: 'disconnect'
            }
          ],
          audAssetList: {
            acceptReporters: true,
            items: 'getProjectSounds'
          },
          spriteList: {
            acceptReporters: true,
            items: 'getSprites'
          }
        }
      };
    }
    getProjectSounds() {
      let sounds = this.vm.runtime.targets.map(s => s.sprite.sounds.map(a => {
        a.spriteName = s.sprite.name; return a;
      })).flat(1).map(s=>{
        return {text: s.spriteName + ' - ' + s.name,value: s.assetId};
      });
      return sounds?.length ? sounds : [{ text: 'empty', value: 'empty' }];
    }
    getSprites(){
      return this.vm.runtime.targets.map(s=>{
        return {text: s.sprite.name,value: s.id};
      }).flat(1);
    }
    //the 'am' prefix is a remenant from the original (sandboxed) extension 'AudioManager' made by me some time back, that i based this enhanced version off.
    getContext(id,opt){
      if (this.contextBindings[id] && id != this.contextBindings[id]) return this.getContext(this.contextBindings[id],opt);
      return this.contextList.find(c=>c.id == id) || (()=>{
        return this.newContext(id,opt);
      })();
    }
    getEditingContext(){}
    newContext(id,opt){
      if (!opt) opt = {};
      let ctx = {
        id: id || this.contextList.length,
        isSimple: !!opt?.simple,
        source: document.createElement('audio'),
        effects: {},
        filters: {},
        volume: 1
      };
      if (opt?.src)ctx.source.src = opt.src;
      ctx.source.crossOrigin = 'anonymous';
      ctx.source.preservesPitch = false;
      ctx.source.id = 'AudioStreamSource_' + id;
      document.body.appendChild(ctx.source);
      if (!opt?.simple){
        ctx.audio = new(window.AudioContext || window.webkitAudioContext)();
        ctx.track = ctx.audio.createMediaElementSource(ctx.source);
        ctx.effects.gain = ctx.audio.createGain();
        ctx.effects.panner = new StereoPannerNode(ctx.audio,{pan: 0});
        ['lowpass','highpass','bandpass','lowshelf','highshelf','peaking','notch','allpass'].forEach(f=>{
          let bf = ctx.audio.createBiquadFilter();
          bf.type = f;
          ctx.filters[f] = bf;
        });
        ctx.analyser = ctx.audio.createAnalyser();
        ctx.analyser.fftSize = 2048;
        ctx.dataArray = new Uint8Array(ctx.analyser.frequencyBinCount);
        ctx.track.connect(ctx.effects.gain).connect(ctx.effects.panner).connect(ctx.analyser).connect(ctx.audio.destination);
      }
      this.contextList.push(ctx);
      return ctx;
    }
    am_usecontext({SPRITE},u){
      this.contextBindings[u.target.id] = SPRITE;
      console.log(this.contextBindings);
    }
    // am_unbind({},u){
    //  this.contextBindings[u.target.id]=u.target.id;
    // }
    am_loadasset({SRC},u){
      let ctx = (!u?.source?.id) ? this.getContext(u.target.id) : u;
      if (this.assetSourceList[SRC]){
        ctx.source.src = this.assetSourceList[SRC];return;
      }
      let asset = vm.assets.find(e=>e.assetId == SRC);
      if (!asset){
        console.log('[AudioStream] Media error: ',asset);return;
      }
      let src = URL.createObjectURL(new Blob([asset.data],{'type': asset.assetType.contentType}));
      ctx.source.src = src;
      this.assetSourceList[SRC] = src;
      console.log(this.assetSourceList);
    }
    am_playfromurl({URL},u) {
      let ctx = this.getContext(u.target.id);
      ctx.source.src = URL;
    }
    am_isloaded(){
      return;
    }
    am_stopthis({},u){
      let ctx = this.getContext(u.target.id);
      ctx.source.currentTime = 9e20;
    }
    am_stophim({SPRITE}){
      let ctx = this.getContext(SPRITE);
      ctx.source.currentTime = 9e20;
    }
    am_stop(){
      this.contextList.forEach(ctx=>{
        ctx.source.currentTime = 9e20;
      });
    }
    am_play(args, u) {
      let ctx = this.getContext(u.target.id);
      ctx.source.currentTime = 0.001;
      ctx.source.play();
    }
    am_playandwait(args, u) {
      let ctx = this.getContext(u.target.id);
      return new Promise(r => {
        ctx.source.currentTime = 0.001;
        ctx.source.play();
        ctx.source.addEventListener('ended',r);
      });
    }
    am_playnew({SRC}){
      let id = btoa((Math.random() * 1e17).toString());
      let ctx = this.newContext(id,{simple: true});
      this.am_loadasset({SRC: SRC},ctx);
      ctx.source.currentTime = 0;
      ctx.source.play();
      ctx.source.addEventListener('ended',()=>{
        ctx.source.remove();
        this.contextList = this.contextList.filter(c=>c.id != id);
      });
    }
    am_resume(args, u) {
      let ctx = this.getContext(u.target.id);
      ctx.source.play();
    }
    am_pause(args, u) {
      let ctx = this.getContext(u.target.id);
      ctx.source.pause();
    }
    am_skipToTime({VAL},u) {
      let ctx = this.getContext(u.target.id);
      ctx.source.currentTime = VAL;
    }
    am_setpitch({VAL},u) {
      let ctx = this.getContext(u.target.id);
      /*Calculate the pitch value to be closer to original Scratch*/
      ctx.source.playbackRate = ctx.source.defaultPlaybackRate = VAL < 0 ? VAL < -659 ? 0.1 : Math.abs(VAL) / 700 : VAL > 700 ? 15 : VAL / 50 + 1;
    }
    am_setvolume({VAL},u) {
      let ctx = this.getContext(u.target.id);
      ctx.volume = +VAL;
      if (ctx.volume > 1){
        ctx.source.volume = 1;
      } else if (ctx.volume < 0){
        ctx.source.volume = 0;
      } else {
        ctx.source.volume = ctx.volume;
      }
    }
    am_getvolume(args, u){
      let ctx = this.getContext(u.target.id);
      return ctx.volume;
    }
    am_setstereo({VAL},u){
      let ctx = this.getContext(u.target.id);
      ctx.effects.panner.pan.value = VAL;
    }
    am_setppitch({VAL,u}){
      let ctx = this.getContext(u.target.id);
      ctx.source.preservesPitch = VAL;
    }
    am_setfilter({FIL,FQ,Q},u){
      let ctx = this.getContext(u.target.id);
      if (FIL === 'lowpass') {
        filter1.frequency.value = FQ;
        filter1.Q.value = Q;
      } else if (FIL === 'highpass') {
        filter2.frequency.value = FQ;
        filter2.Q.value = Q;
      } else if (FIL === 'bandpass') {
        filter3.frequency.value = FQ;
        filter3.Q.value = Q;
      } else if (FIL === 'lowshelf') {
        filter4.frequency.value = FQ;
        filter4.Q.value = Q;
      } else if (FIL === 'highshelf') {
        filter5.frequency.value = FQ;
        filter5.Q.value = Q;
      } else if (FIL === 'peaking') {
        filter6.frequency.value = FQ;
        filter6.Q.value = Q;
      } else if (FIL === 'notch') {
        filter7.frequency.value = FQ;
        filter7.Q.value = Q;
      } else if (FIL === 'allpass') {
        filter8.frequency.value = FQ;
        filter8.Q.value = Q;
      }
    }
    am_toglefilter({FIL,STATE},u){
      let ctx = this.getContext(u.target.id);
      if (FIL === 'lowpass') {
        if (STATE === 'connect') {
          track.connect(filter1);
        } else {
          filter1.disconnect();
        }
      } else if (FIL === 'highpass') {
        if (STATE === 'connect') {
          track.connect(filter2);
        } else {
          filter2.disconnect();
        }
      } else if (FIL === 'bandpass') {
        if (STATE === 'connect') {
          track.connect(filter3);
        } else {
          filter3.disconnect();
        }
      } else if (FIL === 'lowshelf') {
        if (STATE === 'connect') {
          track.connect(filter4);
        } else {
          filter4.disconnect();
        }
      } else if (FIL === 'highshelf') {
        if (STATE === 'connect') {
          track.connect(filter5);
        } else {
          filter5.disconnect();
        }
      } else if (FIL === 'peaking') {
        if (STATE === 'connect') {
          track.connect(filter6);
        } else {
          filter6.disconnect();
        }
      } else if (FIL === 'notch') {
        if (STATE === 'connect') {
          track.connect(filter7);
        } else {
          filter7.disconnect();
        }
      } else if (FIL === 'allpass') {
        if (STATE === 'connect') {
          track.connect(filter8);
        } else {
          filter8.disconnect();
        }
      }
    }
    am_freset({},u) {
      let ctx = this.getContext(u.target.id);
      filter1.frequency.value = FQ;
      filter1.Q.value = 0;
      filter2.frequency.value = FQ;
      filter2.Q.value = 0;
      filter3.frequency.value = FQ;
      filter3.Q.value = 0;
      filter4.frequency.value = FQ;
      filter4.Q.value = 0;
      filter5.frequency.value = FQ;
      filter5.Q.value = 0;
      filter6.frequency.value = FQ;
      filter6.Q.value = 0;
      filter7.frequency.value = FQ;
      filter7.Q.value = 0;
      filter8.frequency.value = FQ;
      filter8.Q.value = 0;
    }
    am_connect({STRING},u) {
      var utl2_theInstructions = 'return ' + STRING;
      var F = new Function(utl2_theInstructions);
      track.connect(F());
    }
    am_disconnect({STRING},u) {
      let ctx = this.getContext(u.target.id);
      var utl2_theInstructions = 'return ' + STRING;
      var F = new Function(utl2_theInstructions);
      F().disconnect;
    }
    am_analyserfft({VAL},u){
      let ctx = this.getContext(u.target.id);
      ctx.analyser.fftSize = VAL;
    }
    am_songDuration(args, u) {
      let ctx = this.getContext(u.target.id);
      return ctx.source.duration;
    }
    am_getanalyser(args, u) {
      let ctx = this.getContext(u.target.id);
      ctx.analyser.getByteTimeDomainData(ctx.dataArray);
      return JSON.stringify(ctx.dataArray);
    }
    am_getanalyserindex({INDEX},u) {
      let ctx = this.getContext(u.target.id);
      ctx.analyser.getByteTimeDomainData(ctx.dataArray);
      return ctx.dataArray[INDEX];
    }
    am_songCurrent(args, u) {
      let ctx = this.getContext(u.target.id);
      return ctx.source.currentTime;
    }
    am_hasStopped(args, u) {
      let ctx = this.getContext(u.target.id);
      return ctx.source.ended;
    }
    am_isPaused(args, u) {
      let ctx = this.getContext(u.target.id);
      return ctx.source.paused;
    }
  }

  Scratch.extensions.register(new AudioStream());
}(Scratch));
