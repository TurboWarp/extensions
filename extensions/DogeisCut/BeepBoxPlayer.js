// Name: Beepbox Player
// ID: dogeiscutbeepboxplayer
// Description: Play, edit, and read songs from any BeepBox mod directly from the URL!
// By: DogeisCut <https://scratch.mit.edu/users/DogeisCut/>

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("'BeepBox Player' must run unsandboxed!");
  }

  //So, i have to copy and paste the entire beepbox player code in here, as adding in scripts is not advised, it is... not pretty.
  //Also, the source code uses `new Function()` but it doesnt take user input. I cannot remove this as beepbox it uses it to not have to branch on the number of voices. the fm code does the same
  /* eslint-disable*/
  var beepbox = (function (e) {
    "use strict";
    /*!
      Copyright (c) 2012-2022 John Nesky and contributing authors
  
      Permission is hereby granted, free of charge, to any person obtaining a copy of
      this software and associated documentation files (the "Software"), to deal in
      the Software without restriction, including without limitation the rights to
      use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
      of the Software, and to permit persons to whom the Software is furnished to do
      so, subject to the following conditions:
  
      The above copyright notice and this permission notice shall be included in all
      copies or substantial portions of the Software.
  
      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
      IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
      FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
      AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
      LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
      OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
      SOFTWARE.
      */
    const t = [
      "chip wave",
      "FM",
      "basic noise",
      "spectrum",
      "drumset",
      "harmonics",
      "pulse width",
      "picked string",
      "custom chip",
      "mod",
      "advanced FM",
    ];
    const s = new (class {
      constructor() {
        (this.statusTable = {}),
          (this.urlTable = {}),
          (this.totalSamples = 0),
          (this.samplesLoaded = 0);
      }
    })();
    class i extends Event {
      constructor(e, t) {
        super("sampleloaded"),
          (this.totalSamples = e),
          (this.samplesLoaded = t);
      }
    }
    class n extends EventTarget {
      constructor() {
        super();
      }
    }
    const a = new n();
    function o(e, t, n, o, r) {
      const l = new AudioContext({ sampleRate: r });
      let u = !1;
      const f = h.chipWaves[t],
        m = h.rawChipWaves[t],
        d = h.rawRawChipWaves[t];
      fetch(e)
        .then((e) =>
          e.ok
            ? e.arrayBuffer()
            : ((s.statusTable[t] = 2),
              Promise.reject(new Error("Couldn't load sample")))
        )
        .then((e) => l.decodeAudioData(e))
        .then((e) => {
          const r = c(Array.from(e.getChannelData(0))),
            h = p(r);
          (f.samples = h),
            (m.samples = r),
            (d.samples = r),
            o.isUsingAdvancedLoopControls &&
              ((n.chipWaveLoopStart =
                null != o.chipWaveLoopStart ? o.chipWaveLoopStart : 0),
              (n.chipWaveLoopEnd =
                null != o.chipWaveLoopEnd ? o.chipWaveLoopEnd : r.length - 1),
              (n.chipWaveLoopMode =
                null != o.chipWaveLoopMode ? o.chipWaveLoopMode : 0),
              (n.chipWavePlayBackwards = o.chipWavePlayBackwards),
              (n.chipWaveStartOffset =
                null != o.chipWaveStartOffset ? o.chipWaveStartOffset : 0)),
            s.samplesLoaded++,
            (s.statusTable[t] = 1),
            a.dispatchEvent(new i(s.totalSamples, s.samplesLoaded)),
            u || ((u = !0), l.close());
        })
        .catch((i) => {
          (s.statusTable[t] = 2),
            alert("Failed to load " + e + ":\n" + i),
            u || ((u = !0), l.close());
        });
    }
    function r(e) {
      return new Promise((t, s) => {
        if (!h.willReloadForCustomSamples) {
          const s = document.createElement("script");
          (s.src = e),
            document.head.appendChild(s),
            s.addEventListener("load", (e) => {
              t();
            });
        }
      });
    }
    function l(e) {
      const t = h.chipWaves[0].samples,
        n = h.rawRawChipWaves[0].samples;
      if (0 == e) {
        const e = [
          {
            name: "paandorasbox kick",
            expression: 4,
            isSampled: !0,
            isPercussion: !0,
            extraSampleDetune: 0,
          },
          {
            name: "paandorasbox snare",
            expression: 3,
            isSampled: !0,
            isPercussion: !0,
            extraSampleDetune: 0,
          },
          {
            name: "paandorasbox piano1",
            expression: 3,
            isSampled: !0,
            isPercussion: !1,
            extraSampleDetune: 2,
          },
          {
            name: "paandorasbox WOW",
            expression: 1,
            isSampled: !0,
            isPercussion: !1,
            extraSampleDetune: 0,
          },
          {
            name: "paandorasbox overdrive",
            expression: 1,
            isSampled: !0,
            isPercussion: !1,
            extraSampleDetune: -2,
          },
          {
            name: "paandorasbox trumpet",
            expression: 3,
            isSampled: !0,
            isPercussion: !1,
            extraSampleDetune: 1.2,
          },
          {
            name: "paandorasbox saxophone",
            expression: 2,
            isSampled: !0,
            isPercussion: !1,
            extraSampleDetune: -5,
          },
          {
            name: "paandorasbox orchestrahit",
            expression: 2,
            isSampled: !0,
            isPercussion: !1,
            extraSampleDetune: 4.2,
          },
          {
            name: "paandorasbox detatched violin",
            expression: 2,
            isSampled: !0,
            isPercussion: !1,
            extraSampleDetune: 4.2,
          },
          {
            name: "paandorasbox synth",
            expression: 2,
            isSampled: !0,
            isPercussion: !1,
            extraSampleDetune: -0.8,
          },
          {
            name: "paandorasbox sonic3snare",
            expression: 2,
            isSampled: !0,
            isPercussion: !0,
            extraSampleDetune: 0,
          },
          {
            name: "paandorasbox come on",
            expression: 2,
            isSampled: !0,
            isPercussion: !1,
            extraSampleDetune: 0,
          },
          {
            name: "paandorasbox choir",
            expression: 2,
            isSampled: !0,
            isPercussion: !1,
            extraSampleDetune: -3,
          },
          {
            name: "paandorasbox overdriveguitar",
            expression: 2,
            isSampled: !0,
            isPercussion: !1,
            extraSampleDetune: -6.2,
          },
          {
            name: "paandorasbox flute",
            expression: 2,
            isSampled: !0,
            isPercussion: !1,
            extraSampleDetune: -6,
          },
          {
            name: "paandorasbox legato violin",
            expression: 2,
            isSampled: !0,
            isPercussion: !1,
            extraSampleDetune: -28,
          },
          {
            name: "paandorasbox tremolo violin",
            expression: 2,
            isSampled: !0,
            isPercussion: !1,
            extraSampleDetune: -33,
          },
          {
            name: "paandorasbox amen break",
            expression: 1,
            isSampled: !0,
            isPercussion: !0,
            extraSampleDetune: -55,
          },
          {
            name: "paandorasbox pizzicato violin",
            expression: 2,
            isSampled: !0,
            isPercussion: !1,
            extraSampleDetune: -11,
          },
          {
            name: "paandorasbox tim allen grunt",
            expression: 2,
            isSampled: !0,
            isPercussion: !1,
            extraSampleDetune: -20,
          },
          {
            name: "paandorasbox tuba",
            expression: 2,
            isSampled: !0,
            isPercussion: !1,
            extraSampleDetune: 44,
          },
          {
            name: "paandorasbox loopingcymbal",
            expression: 2,
            isSampled: !0,
            isPercussion: !1,
            extraSampleDetune: -17,
          },
          {
            name: "paandorasbox standardkick",
            expression: 2,
            isSampled: !0,
            isPercussion: !0,
            extraSampleDetune: -7,
          },
          {
            name: "paandorasbox standardsnare",
            expression: 2,
            isSampled: !0,
            isPercussion: !0,
            extraSampleDetune: 0,
          },
          {
            name: "paandorasbox closedhihat",
            expression: 2,
            isSampled: !0,
            isPercussion: !0,
            extraSampleDetune: 5,
          },
          {
            name: "paandorasbox foothihat",
            expression: 2,
            isSampled: !0,
            isPercussion: !0,
            extraSampleDetune: 4,
          },
          {
            name: "paandorasbox openhihat",
            expression: 2,
            isSampled: !0,
            isPercussion: !0,
            extraSampleDetune: -31,
          },
          {
            name: "paandorasbox crashcymbal",
            expression: 2,
            isSampled: !0,
            isPercussion: !0,
            extraSampleDetune: -43,
          },
          {
            name: "paandorasbox pianoC4",
            expression: 2,
            isSampled: !0,
            isPercussion: !1,
            extraSampleDetune: -42.5,
          },
          {
            name: "paandorasbox liver pad",
            expression: 2,
            isSampled: !0,
            isPercussion: !1,
            extraSampleDetune: -22.5,
          },
          {
            name: "paandorasbox marimba",
            expression: 2,
            isSampled: !0,
            isPercussion: !1,
            extraSampleDetune: -15.5,
          },
          {
            name: "paandorasbox susdotwav",
            expression: 2,
            isSampled: !0,
            isPercussion: !1,
            extraSampleDetune: -24.5,
          },
          {
            name: "paandorasbox wackyboxtts",
            expression: 2,
            isSampled: !0,
            isPercussion: !1,
            extraSampleDetune: -17.5,
          },
          {
            name: "paandorasbox peppersteak_1",
            expression: 2,
            isSampled: !0,
            isPercussion: !1,
            extraSampleDetune: -42.2,
          },
          {
            name: "paandorasbox peppersteak_2",
            expression: 2,
            isSampled: !0,
            isPercussion: !1,
            extraSampleDetune: -47,
          },
          {
            name: "paandorasbox vinyl_noise",
            expression: 2,
            isSampled: !0,
            isPercussion: !0,
            extraSampleDetune: -50,
          },
          {
            name: "paandorasbeta slap bass",
            expression: 1,
            isSampled: !0,
            isPercussion: !1,
            extraSampleDetune: -56,
          },
          {
            name: "paandorasbeta HD EB overdrive guitar",
            expression: 1,
            isSampled: !0,
            isPercussion: !1,
            extraSampleDetune: -60,
          },
          {
            name: "paandorasbeta sunsoft bass",
            expression: 1,
            isSampled: !0,
            isPercussion: !1,
            extraSampleDetune: -18.5,
          },
          {
            name: "paandorasbeta masculine choir",
            expression: 1,
            isSampled: !0,
            isPercussion: !1,
            extraSampleDetune: -50,
          },
          {
            name: "paandorasbeta feminine choir",
            expression: 1,
            isSampled: !0,
            isPercussion: !1,
            extraSampleDetune: -60.5,
          },
          {
            name: "paandorasbeta tololoche",
            expression: 1,
            isSampled: !0,
            isPercussion: !1,
            extraSampleDetune: -29.5,
          },
          {
            name: "paandorasbeta harp",
            expression: 1,
            isSampled: !0,
            isPercussion: !1,
            extraSampleDetune: -54,
          },
          {
            name: "paandorasbeta pan flute",
            expression: 1,
            isSampled: !0,
            isPercussion: !1,
            extraSampleDetune: -58,
          },
          {
            name: "paandorasbeta krumhorn",
            expression: 1,
            isSampled: !0,
            isPercussion: !1,
            extraSampleDetune: -46,
          },
          {
            name: "paandorasbeta timpani",
            expression: 1,
            isSampled: !0,
            isPercussion: !1,
            extraSampleDetune: -50,
          },
          {
            name: "paandorasbeta crowd hey",
            expression: 1,
            isSampled: !0,
            isPercussion: !0,
            extraSampleDetune: -29,
          },
          {
            name: "paandorasbeta wario land 4 brass",
            expression: 1,
            isSampled: !0,
            isPercussion: !1,
            extraSampleDetune: -68,
          },
          {
            name: "paandorasbeta wario land 4 rock organ",
            expression: 1,
            isSampled: !0,
            isPercussion: !1,
            extraSampleDetune: -63,
          },
          {
            name: "paandorasbeta wario land 4 DAOW",
            expression: 1,
            isSampled: !0,
            isPercussion: !1,
            extraSampleDetune: -35,
          },
          {
            name: "paandorasbeta wario land 4 hour chime",
            expression: 1,
            isSampled: !0,
            isPercussion: !1,
            extraSampleDetune: -47.5,
          },
          {
            name: "paandorasbeta wario land 4 tick",
            expression: 1,
            isSampled: !0,
            isPercussion: !0,
            extraSampleDetune: -12.5,
          },
          {
            name: "paandorasbeta kirby kick",
            expression: 1,
            isSampled: !0,
            isPercussion: !0,
            extraSampleDetune: -46.5,
          },
          {
            name: "paandorasbeta kirby snare",
            expression: 1,
            isSampled: !0,
            isPercussion: !0,
            extraSampleDetune: -46.5,
          },
          {
            name: "paandorasbeta kirby bongo",
            expression: 1,
            isSampled: !0,
            isPercussion: !0,
            extraSampleDetune: -46.5,
          },
          {
            name: "paandorasbeta kirby click",
            expression: 1,
            isSampled: !0,
            isPercussion: !0,
            extraSampleDetune: -46.5,
          },
          {
            name: "paandorasbeta sonor kick",
            expression: 1,
            isSampled: !0,
            isPercussion: !0,
            extraSampleDetune: -28.5,
          },
          {
            name: "paandorasbeta sonor snare",
            expression: 1,
            isSampled: !0,
            isPercussion: !0,
            extraSampleDetune: -28.5,
          },
          {
            name: "paandorasbeta sonor snare (left hand)",
            expression: 1,
            isSampled: !0,
            isPercussion: !0,
            extraSampleDetune: -22.5,
          },
          {
            name: "paandorasbeta sonor snare (right hand)",
            expression: 1,
            isSampled: !0,
            isPercussion: !0,
            extraSampleDetune: -22.5,
          },
          {
            name: "paandorasbeta sonor high tom",
            expression: 1,
            isSampled: !0,
            isPercussion: !0,
            extraSampleDetune: -41.5,
          },
          {
            name: "paandorasbeta sonor low tom",
            expression: 1,
            isSampled: !0,
            isPercussion: !0,
            extraSampleDetune: -41.5,
          },
          {
            name: "paandorasbeta sonor hihat (closed)",
            expression: 1,
            isSampled: !0,
            isPercussion: !0,
            extraSampleDetune: -17,
          },
          {
            name: "paandorasbeta sonor hihat (half opened)",
            expression: 1,
            isSampled: !0,
            isPercussion: !0,
            extraSampleDetune: -21,
          },
          {
            name: "paandorasbeta sonor hihat (open)",
            expression: 1,
            isSampled: !0,
            isPercussion: !0,
            extraSampleDetune: -54.5,
          },
          {
            name: "paandorasbeta sonor hihat (open tip)",
            expression: 1,
            isSampled: !0,
            isPercussion: !0,
            extraSampleDetune: -43.5,
          },
          {
            name: "paandorasbeta sonor hihat (pedal)",
            expression: 1,
            isSampled: !0,
            isPercussion: !0,
            extraSampleDetune: -28,
          },
          {
            name: "paandorasbeta sonor crash",
            expression: 1,
            isSampled: !0,
            isPercussion: !0,
            extraSampleDetune: -51,
          },
          {
            name: "paandorasbeta sonor crash (tip)",
            expression: 1,
            isSampled: !0,
            isPercussion: !0,
            extraSampleDetune: -50.5,
          },
          {
            name: "paandorasbeta sonor ride",
            expression: 1,
            isSampled: !0,
            isPercussion: !0,
            extraSampleDetune: -46,
          },
        ];
        s.totalSamples += e.length;
        const o = h.rawRawChipWaves.length;
        for (const i of e) {
          const e = h.rawRawChipWaves.length,
            a = {
              index: e,
              name: i.name,
              expression: i.expression,
              isSampled: i.isSampled,
              isPercussion: i.isPercussion,
              extraSampleDetune: i.extraSampleDetune,
              samples: n,
            },
            o = {
              index: e,
              name: i.name,
              expression: i.expression,
              isSampled: i.isSampled,
              isPercussion: i.isPercussion,
              extraSampleDetune: i.extraSampleDetune,
              samples: n,
            },
            r = {
              index: e,
              name: i.name,
              expression: i.expression,
              isSampled: i.isSampled,
              isPercussion: i.isPercussion,
              extraSampleDetune: i.extraSampleDetune,
              samples: t,
            };
          (h.rawRawChipWaves[e] = o),
            (h.rawRawChipWaves.dictionary[i.name] = o),
            (h.rawChipWaves[e] = a),
            (h.rawChipWaves.dictionary[i.name] = a),
            (h.chipWaves[e] = r),
            (h.chipWaves.dictionary[i.name] = a),
            (s.statusTable[e] = 0),
            (s.urlTable[e] = "legacySamples");
        }
        r("samples.js")
          .then(() => r("samples2.js"))
          .then(() => r("samples3.js"))
          .then(() => r("drumsamples.js"))
          .then(() => r("wario_samples.js"))
          .then(() => r("kirby_samples.js"))
          .then(() => {
            const e = [
              c(kicksample),
              c(snaresample),
              c(pianosample),
              c(WOWsample),
              c(overdrivesample),
              c(trumpetsample),
              c(saxophonesample),
              c(orchhitsample),
              c(detatchedviolinsample),
              c(synthsample),
              c(sonic3snaresample),
              c(comeonsample),
              c(choirsample),
              c(overdrivensample),
              c(flutesample),
              c(legatoviolinsample),
              c(tremoloviolinsample),
              c(amenbreaksample),
              c(pizzicatoviolinsample),
              c(timallengruntsample),
              c(tubasample),
              c(loopingcymbalsample),
              c(kickdrumsample),
              c(snaredrumsample),
              c(closedhihatsample),
              c(foothihatsample),
              c(openhihatsample),
              c(crashsample),
              c(pianoC4sample),
              c(liverpadsample),
              c(marimbasample),
              c(susdotwavsample),
              c(wackyboxttssample),
              c(peppersteak1),
              c(peppersteak2),
              c(vinyl),
              c(slapbass),
              c(hdeboverdrive),
              c(sunsoftbass),
              c(masculinechoir),
              c(femininechoir),
              c(southtololoche),
              c(harp),
              c(panflute),
              c(krumhorn),
              c(timpani),
              c(crowdhey),
              c(warioland4brass),
              c(warioland4organ),
              c(warioland4daow),
              c(warioland4hourchime),
              c(warioland4tick),
              c(kirbykick),
              c(kirbysnare),
              c(kirbybongo),
              c(kirbyclick),
              c(funkkick),
              c(funksnare),
              c(funksnareleft),
              c(funksnareright),
              c(funktomhigh),
              c(funktomlow),
              c(funkhihatclosed),
              c(funkhihathalfopen),
              c(funkhihatopen),
              c(funkhihatopentip),
              c(funkhihatfoot),
              c(funkcrash),
              c(funkcrashtip),
              c(funkride),
            ];
            let t = 0;
            for (const n of e) {
              const e = o + t;
              (h.rawChipWaves[e].samples = n),
                (h.rawRawChipWaves[e].samples = n),
                (h.chipWaves[e].samples = p(n)),
                (s.statusTable[e] = 1),
                s.samplesLoaded++,
                a.dispatchEvent(new i(s.totalSamples, s.samplesLoaded)),
                t++;
            }
          });
      } else if (1 == e) {
        const e = [
          {
            name: "chronoperc1final",
            expression: 4,
            isSampled: !0,
            isPercussion: !0,
            extraSampleDetune: 0,
          },
          {
            name: "synthkickfm",
            expression: 4,
            isSampled: !0,
            isPercussion: !0,
            extraSampleDetune: 0,
          },
          {
            name: "mcwoodclick1",
            expression: 4,
            isSampled: !0,
            isPercussion: !0,
            extraSampleDetune: 0,
          },
          {
            name: "acoustic snare",
            expression: 4,
            isSampled: !0,
            isPercussion: !0,
            extraSampleDetune: 0,
          },
        ];
        s.totalSamples += e.length;
        const o = h.rawRawChipWaves.length;
        for (const i of e) {
          const e = h.rawRawChipWaves.length,
            a = {
              index: e,
              name: i.name,
              expression: i.expression,
              isSampled: i.isSampled,
              isPercussion: i.isPercussion,
              extraSampleDetune: i.extraSampleDetune,
              samples: n,
            },
            o = {
              index: e,
              name: i.name,
              expression: i.expression,
              isSampled: i.isSampled,
              isPercussion: i.isPercussion,
              extraSampleDetune: i.extraSampleDetune,
              samples: n,
            },
            r = {
              index: e,
              name: i.name,
              expression: i.expression,
              isSampled: i.isSampled,
              isPercussion: i.isPercussion,
              extraSampleDetune: i.extraSampleDetune,
              samples: t,
            };
          (h.rawRawChipWaves[e] = o),
            (h.rawRawChipWaves.dictionary[i.name] = o),
            (h.rawChipWaves[e] = a),
            (h.rawChipWaves.dictionary[i.name] = a),
            (h.chipWaves[e] = r),
            (h.chipWaves.dictionary[i.name] = a),
            (s.statusTable[e] = 0),
            (s.urlTable[e] = "nintariboxSamples");
        }
        r("nintaribox_samples.js").then(() => {
          const e = [
            c(chronoperc1finalsample),
            c(synthkickfmsample),
            c(woodclicksample),
            c(acousticsnaresample),
          ];
          let t = 0;
          for (const n of e) {
            const e = o + t;
            (h.rawChipWaves[e].samples = n),
              (h.rawRawChipWaves[e].samples = n),
              (h.chipWaves[e].samples = p(n)),
              (s.statusTable[e] = 1),
              s.samplesLoaded++,
              a.dispatchEvent(new i(s.totalSamples, s.samplesLoaded)),
              t++;
          }
        });
      } else if (2 == e) {
        const e = [
          {
            name: "cat",
            expression: 1,
            isSampled: !0,
            isPercussion: !1,
            extraSampleDetune: -3,
          },
          {
            name: "gameboy",
            expression: 1,
            isSampled: !0,
            isPercussion: !1,
            extraSampleDetune: 7,
          },
          {
            name: "mario",
            expression: 1,
            isSampled: !0,
            isPercussion: !1,
            extraSampleDetune: 0,
          },
          {
            name: "drum",
            expression: 1,
            isSampled: !0,
            isPercussion: !1,
            extraSampleDetune: 4,
          },
          {
            name: "yoshi",
            expression: 1,
            isSampled: !0,
            isPercussion: !1,
            extraSampleDetune: -16,
          },
          {
            name: "star",
            expression: 1,
            isSampled: !0,
            isPercussion: !1,
            extraSampleDetune: -16,
          },
          {
            name: "fire flower",
            expression: 1,
            isSampled: !0,
            isPercussion: !1,
            extraSampleDetune: -1,
          },
          {
            name: "dog",
            expression: 1,
            isSampled: !0,
            isPercussion: !1,
            extraSampleDetune: -1,
          },
          {
            name: "oink",
            expression: 1,
            isSampled: !0,
            isPercussion: !1,
            extraSampleDetune: 3,
          },
          {
            name: "swan",
            expression: 1,
            isSampled: !0,
            isPercussion: !1,
            extraSampleDetune: 1,
          },
          {
            name: "face",
            expression: 1,
            isSampled: !0,
            isPercussion: !1,
            extraSampleDetune: -12,
          },
        ];
        s.totalSamples += e.length;
        const o = h.rawRawChipWaves.length;
        for (const i of e) {
          const e = h.rawRawChipWaves.length,
            a = {
              index: e,
              name: i.name,
              expression: i.expression,
              isSampled: i.isSampled,
              isPercussion: i.isPercussion,
              extraSampleDetune: i.extraSampleDetune,
              samples: n,
            },
            o = {
              index: e,
              name: i.name,
              expression: i.expression,
              isSampled: i.isSampled,
              isPercussion: i.isPercussion,
              extraSampleDetune: i.extraSampleDetune,
              samples: n,
            },
            r = {
              index: e,
              name: i.name,
              expression: i.expression,
              isSampled: i.isSampled,
              isPercussion: i.isPercussion,
              extraSampleDetune: i.extraSampleDetune,
              samples: t,
            };
          (h.rawRawChipWaves[e] = o),
            (h.rawRawChipWaves.dictionary[i.name] = o),
            (h.rawChipWaves[e] = a),
            (h.rawChipWaves.dictionary[i.name] = a),
            (h.chipWaves[e] = r),
            (h.chipWaves.dictionary[i.name] = a),
            (s.statusTable[e] = 0),
            (s.urlTable[e] = "marioPaintboxSamples");
        }
        r("mario_paintbox_samples.js").then(() => {
          const e = [
            c(catpaintboxsample),
            c(gameboypaintboxsample),
            c(mariopaintboxsample),
            c(drumpaintboxsample),
            c(yoshipaintboxsample),
            c(starpaintboxsample),
            c(fireflowerpaintboxsample),
            c(dogpaintbox),
            c(oinkpaintbox),
            c(swanpaintboxsample),
            c(facepaintboxsample),
          ];
          let t = 0;
          for (const n of e) {
            const e = o + t;
            (h.rawChipWaves[e].samples = n),
              (h.rawRawChipWaves[e].samples = n),
              (h.chipWaves[e].samples = p(n)),
              (s.statusTable[e] = 1),
              s.samplesLoaded++,
              a.dispatchEvent(new i(s.totalSamples, s.samplesLoaded)),
              t++;
          }
        });
      } else console.log("invalid set of built-in samples");
    }
    class h {}
    function c(e) {
      let t = 0;
      for (let s = 0; s < e.length; s++) t += e[s];
      const s = t / e.length;
      for (let t = 0; t < e.length; t++) e[t] -= s;
      return p(e), e.push(0), new Float32Array(e);
    }
    function u(e) {
      let t = 0;
      c(e);
      for (let s = 0; s < e.length - 1; s++) t += Math.abs(e[s]);
      const s = t / (e.length - 1);
      for (let t = 0; t < e.length - 1; t++) e[t] = e[t] / s;
      return new Float32Array(e);
    }
    function p(e) {
      let t = 0,
        s = new Float32Array(e.length);
      for (let i = 0; i < e.length; i++) (s[i] = t), (t += e[i]);
      return s;
    }
    function f(e, t, s) {
      let i = h.chipNoises[e].samples;
      if (null == i) {
        if (
          ((i = new Float32Array(h.chipNoiseLength + 1)),
          (h.chipNoises[e].samples = i),
          0 == e)
        ) {
          let e = 1;
          for (let t = 0; t < h.chipNoiseLength; t++) {
            i[t] = 2 * (1 & e) - 1;
            let s = e >> 1;
            1 == ((e + s) & 1) && (s += 16384), (e = s);
          }
        } else if (1 == e)
          for (let e = 0; e < h.chipNoiseLength; e++)
            i[e] = 2 * Math.random() - 1;
        else if (2 == e) {
          let e = 1;
          for (let t = 0; t < h.chipNoiseLength; t++) {
            i[t] = 2 * (1 & e) - 1;
            let s = e >> 1;
            1 == ((e + s) & 1) && (s += 32768), (e = s);
          }
        } else if (3 == e) {
          let e = 1;
          for (let t = 0; t < h.chipNoiseLength; t++) {
            i[t] = 2 * (1 & e) - 1;
            let s = e >> 1;
            1 == ((e + s) & 1) && (s += 40), (e = s);
          }
        } else if (4 == e)
          m(i, h.chipNoiseLength, 10, 11, 1, 1, 0),
            m(i, h.chipNoiseLength, 11, 14, 0.6578, 0.6578, 0),
            t(i, h.chipNoiseLength),
            s(i, 1 / Math.sqrt(h.chipNoiseLength));
        else if (5 == e)
          for (var n = 1, a = 0; a < h.chipNoiseLength; a++) {
            (i[a] = 2 * (1 & n) - 1),
              1 == ((n + (o = n >> 1)) & 1) && (o += 40),
              (n = o);
          }
        else if (6 == e)
          m(i, h.chipNoiseLength, 1, 10, 1, 1, 0),
            m(i, h.chipNoiseLength, 20, 14, -2, -2, 0),
            t(i, h.chipNoiseLength),
            s(i, 1 / Math.sqrt(h.chipNoiseLength));
        else if (7 == e)
          for (n = 1, a = 0; a < h.chipNoiseLength; a++) {
            (i[a] = 4 * (1 & n) * (14 * Math.random() + 1)),
              1 == ((n + (o = n >> 1)) & 1) && (o += 60),
              (n = o);
          }
        else if (8 == e)
          for (n = 1, a = 0; a < 32768; a++) {
            (i[a] = (1 & n) / 2 + 0.5),
              1 == ((n + (o = n >> 1)) & 1) && (o -= 40),
              (n = o);
          }
        else if (9 == e) {
          let e = 1;
          for (let t = 0; t < h.chipNoiseLength; t++) {
            i[t] = 2 * (1 & e) - 1.1;
            let s = e >> 1;
            1 == ((e + s) & 1) && (s += 131080), (e = s);
          }
        } else if (10 == e)
          for (let e = 0; e < h.chipNoiseLength; e++)
            i[e] = Math.round(Math.random());
        else if (11 == e)
          for (n = 1, a = 0; a < 32768; a++) {
            var o;
            (i[a] = Math.round(1 & n)),
              1 == ((n + (o = n >> 1)) & 1) && (o -= 40),
              (n = o);
          }
        else if (12 == e)
          for (let e = 0; e < h.chipNoiseLength; e++) {
            var r = Math.random();
            i[e] = Math.pow(r, Math.clz32(r));
          }
        else if (13 == e) {
          var l,
            c,
            u,
            p,
            f = 0,
            d = 0,
            y = 0;
          f = d = y = l = c = u = p = 0;
          for (let e = 0; e < h.chipNoiseLength; e++) {
            (f = 0.99886 * f + 0.0555179 * (g = 2 * Math.random() - 1)),
              (d = 0.99332 * d + 0.0750759 * g),
              (y = 0.969 * y + 0.153852 * g),
              (l = 0.8665 * l + 0.3104856 * g),
              (c = 0.55 * c + 0.5329522 * g),
              (u = -0.7616 * u - 0.016898 * g),
              (i[e] = f + d + y + l + c + u + p + 0.5362 * g),
              (i[e] *= 0.44),
              (p = 0.115926 * g);
          }
        } else {
          if (14 != e) throw new Error("Unrecognized drum index: " + e);
          var v = 0;
          for (let e = 0; e < h.chipNoiseLength; e++) {
            var g = 2 * Math.random() - 1;
            (i[e] = (v + 0.02 * g) / 1.02), (v = i[e]), (i[e] *= 14);
          }
        }
        i[h.chipNoiseLength] = i[0];
      }
      return i;
    }
    function m(e, t, s, i, n, a, o) {
      const r = 0 | Math.pow(2, s),
        l = Math.min(t >> 1, 0 | Math.pow(2, i)),
        h = f(0, null, null);
      let c = 0;
      for (let u = r; u < l; u++) {
        let r = n + ((a - n) * (Math.log2(u) - s)) / (i - s),
          l = Math.pow(2, 7 * (r - 1) + 1) * r;
        (l *= Math.pow(u / 2048, o)), (c += l), (l *= h[u]);
        const p = 0.61803398875 * u * u * Math.PI * 2;
        (e[u] = Math.cos(p) * l), (e[t - u] = Math.sin(p) * l);
      }
      return c;
    }
    function d(e = 0) {
      const t = new Float32Array(h.sineWaveLength + 1),
        s = h.sineWaveLength / 4;
      for (let i = 0; i < h.sineWaveLength + 1; i++)
        t[i] =
          2 *
            +(
              Math.abs(i - s) < (e * h.sineWaveLength) / 2 ||
              Math.abs(i - h.sineWaveLength - s) < (e * h.sineWaveLength) / 2
            ) -
          1;
      return t;
    }
    function y(e = !1) {
      const t = new Float32Array(h.sineWaveLength + 1);
      for (let s = 0; s < h.sineWaveLength + 1; s++)
        (t[s] =
          (((2 * (s + h.sineWaveLength / 4)) / h.sineWaveLength) % 2) - 1),
          (t[s] = e ? -t[s] : t[s]);
      return t;
    }
    function v(e, t, s) {
      let i = h.arpeggioPatterns[e - 1];
      return null != i
        ? (2 == e && 0 == t && (i = [0, 0, 1, 1]), i[s % i.length])
        : s % e;
    }
    function g(e) {
      const t = {};
      for (let s = 0; s < e.length; s++) {
        const i = e[s];
        (i.index = s), (t[i.name] = i);
      }
      const s = e;
      return (s.dictionary = t), s;
    }
    function b(e) {
      return 0 != (1024 & e);
    }
    function S(e) {
      return 0 != (2048 & e);
    }
    function M(e) {
      return 0 != (128 & e);
    }
    function w(e) {
      return 0 != (256 & e);
    }
    function k(e) {
      return 0 != (512 & e);
    }
    function x(e) {
      return 0 != (32 & e);
    }
    function P(e) {
      return 0 != (8 & e);
    }
    function F(e) {
      return 0 != (16 & e);
    }
    function I(e) {
      return 0 != (4 & e);
    }
    function q(e) {
      return 0 != (2 & e);
    }
    function T(e) {
      return 0 != (64 & e);
    }
    function D(e) {
      return 0 != (1 & e);
    }
    (h.thresholdVal = -10),
      (h.kneeVal = 40),
      (h.ratioVal = 12),
      (h.attackVal = 0),
      (h.releaseVal = 0.25),
      (h.willReloadForCustomSamples = !1),
      (h.scales = g([
        {
          name: "Free",
          realName: "chromatic",
          flags: [!0, !0, !0, !0, !0, !0, !0, !0, !0, !0, !0, !0],
        },
        {
          name: "Major",
          realName: "ionian",
          flags: [!0, !1, !0, !1, !0, !0, !1, !0, !1, !0, !1, !0],
        },
        {
          name: "Minor",
          realName: "aeolian",
          flags: [!0, !1, !0, !0, !1, !0, !1, !0, !0, !1, !0, !1],
        },
        {
          name: "Mixolydian",
          realName: "mixolydian",
          flags: [!0, !1, !0, !1, !0, !0, !1, !0, !1, !0, !0, !1],
        },
        {
          name: "Lydian",
          realName: "lydian",
          flags: [!0, !1, !0, !1, !0, !1, !0, !0, !1, !0, !1, !0],
        },
        {
          name: "Dorian",
          realName: "dorian",
          flags: [!0, !1, !0, !0, !1, !0, !1, !0, !1, !0, !0, !1],
        },
        {
          name: "Phrygian",
          realName: "phrygian",
          flags: [!0, !0, !1, !0, !1, !0, !1, !0, !0, !1, !0, !1],
        },
        {
          name: "Locrian",
          realName: "locrian",
          flags: [!0, !0, !1, !0, !1, !0, !0, !1, !0, !1, !0, !1],
        },
        {
          name: "Lydian Dominant",
          realName: "lydian dominant",
          flags: [!0, !1, !0, !1, !0, !1, !0, !0, !1, !0, !0, !1],
        },
        {
          name: "Phrygian Dominant",
          realName: "phrygian dominant",
          flags: [!0, !0, !1, !1, !0, !0, !1, !0, !0, !1, !0, !1],
        },
        {
          name: "Harmonic Major",
          realName: "harmonic major",
          flags: [!0, !1, !0, !1, !0, !0, !1, !0, !0, !1, !1, !0],
        },
        {
          name: "Harmonic Minor",
          realName: "harmonic minor",
          flags: [!0, !1, !0, !0, !1, !0, !1, !0, !0, !1, !1, !0],
        },
        {
          name: "Melodic Minor",
          realName: "melodic minor",
          flags: [!0, !1, !0, !0, !1, !0, !1, !0, !1, !0, !1, !0],
        },
        {
          name: "Blues",
          realName: "blues",
          flags: [!0, !1, !1, !0, !1, !0, !0, !0, !1, !1, !0, !1],
        },
        {
          name: "Altered",
          realName: "altered",
          flags: [!0, !0, !1, !0, !0, !1, !0, !1, !0, !1, !0, !1],
        },
        {
          name: "Major Pentatonic",
          realName: "major pentatonic",
          flags: [!0, !1, !0, !1, !0, !1, !1, !0, !1, !0, !1, !1],
        },
        {
          name: "Minor Pentatonic",
          realName: "minor pentatonic",
          flags: [!0, !1, !1, !0, !1, !0, !1, !0, !1, !1, !0, !1],
        },
        {
          name: "Whole Tone",
          realName: "whole tone",
          flags: [!0, !1, !0, !1, !0, !1, !0, !1, !0, !1, !0, !1],
        },
        {
          name: "Octatonic",
          realName: "octatonic",
          flags: [!0, !1, !0, !0, !1, !0, !0, !1, !0, !0, !1, !0],
        },
        {
          name: "Hexatonic",
          realName: "hexatonic",
          flags: [!0, !1, !1, !0, !0, !1, !1, !0, !0, !1, !1, !0],
        },
        {
          name: "No Dabbing",
          realName: "no dabbing",
          flags: [!0, !0, !1, !0, !0, !0, !0, !0, !0, !1, !0, !1],
        },
        {
          name: "Jacked Toad",
          realName: "jacked toad",
          flags: [!0, !1, !0, !0, !1, !0, !0, !0, !0, !1, !0, !0],
        },
        {
          name: "Dumb",
          realName:
            "Originally named, currently named, and will always be named 'dumb.'",
          flags: [!0, !1, !1, !1, !1, !0, !0, !0, !0, !1, !1, !0],
        },
        {
          name: "Test Scale",
          realName: "**t",
          flags: [!0, !0, !1, !1, !1, !0, !0, !1, !1, !0, !0, !1],
        },
        {
          name: "die",
          realName: "death",
          flags: [!0, !1, !1, !1, !1, !1, !1, !1, !0, !1, !1, !1],
        },
        {
          name: "Custom",
          realName: "custom",
          flags: [!0, !1, !0, !0, !1, !1, !1, !0, !0, !1, !0, !0],
        },
      ])),
      (h.keys = g([
        { name: "C", isWhiteKey: !0, basePitch: 12 },
        { name: "C♯", isWhiteKey: !1, basePitch: 13 },
        { name: "D", isWhiteKey: !0, basePitch: 14 },
        { name: "D♯", isWhiteKey: !1, basePitch: 15 },
        { name: "E", isWhiteKey: !0, basePitch: 16 },
        { name: "F", isWhiteKey: !0, basePitch: 17 },
        { name: "F♯", isWhiteKey: !1, basePitch: 18 },
        { name: "G", isWhiteKey: !0, basePitch: 19 },
        { name: "G♯", isWhiteKey: !1, basePitch: 20 },
        { name: "A", isWhiteKey: !0, basePitch: 21 },
        { name: "A♯", isWhiteKey: !1, basePitch: 22 },
        { name: "B", isWhiteKey: !0, basePitch: 23 },
      ])),
      (h.blackKeyNameParents = [-1, 1, -1, 1, -1, 1, -1, -1, 1, -1, 1, -1]),
      (h.tempoMin = 1),
      (h.tempoMax = 500),
      (h.octaveMin = -2),
      (h.octaveMax = 2),
      (h.echoDelayRange = 24),
      (h.echoDelayStepTicks = 4),
      (h.echoSustainRange = 8),
      (h.echoShelfHz = 4e3),
      (h.echoShelfGain = Math.pow(2, -0.5)),
      (h.reverbShelfHz = 8e3),
      (h.reverbShelfGain = Math.pow(2, -1.5)),
      (h.reverbRange = 32),
      (h.reverbDelayBufferSize = 16384),
      (h.reverbDelayBufferMask = h.reverbDelayBufferSize - 1),
      (h.beatsPerBarMin = 1),
      (h.beatsPerBarMax = 64),
      (h.barCountMin = 1),
      (h.barCountMax = 1024),
      (h.instrumentCountMin = 1),
      (h.layeredInstrumentCountMax = 10),
      (h.patternInstrumentCountMax = 10),
      (h.partsPerBeat = 24),
      (h.ticksPerPart = 2),
      (h.ticksPerArpeggio = 3),
      (h.arpeggioPatterns = [
        [0],
        [0, 1],
        [0, 1, 2, 1],
        [0, 1, 2, 3],
        [0, 1, 2, 3, 4],
        [0, 1, 2, 3, 4, 5],
        [0, 1, 2, 3, 4, 5, 6],
        [0, 1, 2, 3, 4, 5, 6, 7],
      ]),
      (h.rhythms = g([
        { name: "÷1 (whole notes)", stepsPerBeat: 1, roundUpThresholds: [3] },
        { name: "÷2 (half notes)", stepsPerBeat: 2, roundUpThresholds: [3, 9] },
        {
          name: "÷3 (triplets)",
          stepsPerBeat: 3,
          roundUpThresholds: [5, 12, 18],
        },
        {
          name: "÷4 (standard)",
          stepsPerBeat: 4,
          roundUpThresholds: [3, 9, 17, 21],
        },
        { name: "÷6 (sextuplets)", stepsPerBeat: 6, roundUpThresholds: null },
        { name: "÷8 (eighth notes)", stepsPerBeat: 8, roundUpThresholds: null },
        {
          name: "÷12 (twelfth notes)",
          stepsPerBeat: 12,
          roundUpThresholds: null,
        },
        { name: "freehand", stepsPerBeat: 24, roundUpThresholds: null },
      ])),
      (h.instrumentTypeNames = [
        "chip",
        "FM",
        "noise",
        "spectrum",
        "drumset",
        "harmonics",
        "PWM",
        "Picked String",
        "custom chip",
        "mod",
        "FM6op",
      ]),
      (h.instrumentTypeHasSpecialInterval = [
        !0,
        !0,
        !1,
        !1,
        !1,
        !0,
        !1,
        !1,
        !1,
        !1,
      ]),
      (h.chipBaseExpression = 0.03375),
      (h.fmBaseExpression = 0.03),
      (h.noiseBaseExpression = 0.19),
      (h.spectrumBaseExpression = 0.3),
      (h.drumsetBaseExpression = 0.45),
      (h.harmonicsBaseExpression = 0.025),
      (h.pwmBaseExpression = 0.04725),
      (h.pickedStringBaseExpression = 0.025),
      (h.distortionBaseVolume = 0.011),
      (h.bitcrusherBaseVolume = 0.01),
      (h.rawChipWaves = g([
        {
          name: "rounded",
          expression: 0.94,
          samples: c([
            0, 0.2, 0.4, 0.5, 0.6, 0.7, 0.8, 0.85, 0.9, 0.95, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 0.95, 0.9, 0.85, 0.8, 0.7, 0.6, 0.5, 0.4,
            0.2, 0, -0.2, -0.4, -0.5, -0.6, -0.7, -0.8, -0.85, -0.9, -0.95, -1,
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -0.95, -0.9, -0.85, -0.8,
            -0.7, -0.6, -0.5, -0.4, -0.2,
          ]),
        },
        {
          name: "triangle",
          expression: 1,
          samples: c([
            1 / 15,
            0.2,
            5 / 15,
            7 / 15,
            0.6,
            11 / 15,
            13 / 15,
            1,
            1,
            13 / 15,
            11 / 15,
            0.6,
            7 / 15,
            5 / 15,
            0.2,
            1 / 15,
            -1 / 15,
            -0.2,
            -5 / 15,
            -7 / 15,
            -0.6,
            -11 / 15,
            -13 / 15,
            -1,
            -1,
            -13 / 15,
            -11 / 15,
            -0.6,
            -7 / 15,
            -5 / 15,
            -0.2,
            -1 / 15,
          ]),
        },
        { name: "square", expression: 0.5, samples: c([1, -1]) },
        { name: "1/4 pulse", expression: 0.5, samples: c([1, -1, -1, -1]) },
        {
          name: "1/8 pulse",
          expression: 0.5,
          samples: c([1, -1, -1, -1, -1, -1, -1, -1]),
        },
        {
          name: "sawtooth",
          expression: 0.65,
          samples: c([
            1 / 31,
            3 / 31,
            5 / 31,
            7 / 31,
            9 / 31,
            11 / 31,
            13 / 31,
            15 / 31,
            17 / 31,
            19 / 31,
            21 / 31,
            23 / 31,
            25 / 31,
            27 / 31,
            29 / 31,
            1,
            -1,
            -29 / 31,
            -27 / 31,
            -25 / 31,
            -23 / 31,
            -21 / 31,
            -19 / 31,
            -17 / 31,
            -15 / 31,
            -13 / 31,
            -11 / 31,
            -9 / 31,
            -7 / 31,
            -5 / 31,
            -3 / 31,
            -1 / 31,
          ]),
        },
        {
          name: "double saw",
          expression: 0.5,
          samples: c([
            0, -0.2, -0.4, -0.6, -0.8, -1, 1, -0.8, -0.6, -0.4, -0.2, 1, 0.8,
            0.6, 0.4, 0.2,
          ]),
        },
        {
          name: "double pulse",
          expression: 0.4,
          samples: c([1, 1, 1, 1, 1, -1, -1, -1, 1, 1, 1, 1, -1, -1, -1, -1]),
        },
        { name: "spiky", expression: 0.4, samples: c([1, -1, 1, -1, 1, 0]) },
        {
          name: "sine",
          expression: 0.88,
          samples: u([
            8, 9, 11, 12, 13, 14, 15, 15, 15, 15, 14, 14, 13, 11, 10, 9, 7, 6,
            4, 3, 2, 1, 0, 0, 0, 0, 1, 1, 2, 4, 5, 6,
          ]),
        },
        {
          name: "flute",
          expression: 0.8,
          samples: u([3, 4, 6, 8, 10, 11, 13, 14, 15, 15, 14, 13, 11, 8, 5, 3]),
        },
        {
          name: "harp",
          expression: 0.8,
          samples: u([
            0, 3, 3, 3, 4, 5, 5, 6, 7, 8, 9, 11, 11, 13, 13, 15, 15, 14, 12, 11,
            10, 9, 8, 7, 7, 5, 4, 3, 2, 1, 0, 0,
          ]),
        },
        {
          name: "sharp clarinet",
          expression: 0.38,
          samples: u([
            0, 0, 0, 1, 1, 8, 8, 9, 9, 9, 8, 8, 8, 8, 8, 9, 9, 7, 9, 9, 10, 4,
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
          ]),
        },
        {
          name: "soft clarinet",
          expression: 0.45,
          samples: u([
            0, 1, 5, 8, 9, 9, 9, 9, 9, 9, 9, 11, 11, 12, 13, 12, 10, 9, 7, 6, 4,
            3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 1,
          ]),
        },
        {
          name: "alto sax",
          expression: 0.3,
          samples: u([
            5, 5, 6, 4, 3, 6, 8, 7, 2, 1, 5, 6, 5, 4, 5, 7, 9, 11, 13, 14, 14,
            14, 14, 13, 10, 8, 7, 7, 4, 3, 4, 2,
          ]),
        },
        {
          name: "bassoon",
          expression: 0.35,
          samples: u([
            9, 9, 7, 6, 5, 4, 4, 4, 4, 5, 7, 8, 9, 10, 11, 13, 13, 11, 10, 9, 7,
            6, 4, 2, 1, 1, 1, 2, 2, 5, 11, 14,
          ]),
        },
        {
          name: "trumpet",
          expression: 0.22,
          samples: u([
            10, 11, 8, 6, 5, 5, 5, 6, 7, 7, 7, 7, 6, 6, 7, 7, 7, 7, 7, 6, 6, 6,
            6, 6, 6, 6, 6, 7, 8, 9, 11, 14,
          ]),
        },
        {
          name: "electric guitar",
          expression: 0.2,
          samples: u([
            11, 12, 12, 10, 6, 6, 8, 0, 2, 4, 8, 10, 9, 10, 1, 7, 11, 3, 6, 6,
            8, 13, 14, 2, 0, 12, 8, 4, 13, 11, 10, 13,
          ]),
        },
        {
          name: "organ",
          expression: 0.2,
          samples: u([
            11, 10, 12, 11, 14, 7, 5, 5, 12, 10, 10, 9, 12, 6, 4, 5, 13, 12, 12,
            10, 12, 5, 2, 2, 8, 6, 6, 5, 8, 3, 2, 1,
          ]),
        },
        {
          name: "pan flute",
          expression: 0.35,
          samples: u([
            1, 4, 7, 6, 7, 9, 7, 7, 11, 12, 13, 15, 13, 11, 11, 12, 13, 10, 7,
            5, 3, 6, 10, 7, 3, 3, 1, 0, 1, 0, 1, 0,
          ]),
        },
        {
          name: "glitch",
          expression: 0.5,
          samples: c([
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1,
            -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1,
            -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, -1, -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
            -1, -1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, -1, -1,
          ]),
        },
        {
          name: "trapezoid",
          expression: 1,
          samples: c([
            1 / 15,
            0.4,
            10 / 15,
            14 / 15,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            1,
            14 / 15,
            10 / 15,
            0.4,
            1 / 15,
            -1 / 15,
            -0.4,
            -10 / 15,
            -14 / 15,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            -1,
            -14 / 15,
            -10 / 15,
            -0.4,
            -1 / 15,
          ]),
        },
        {
          name: "modbox 10% pulse",
          expression: 0.5,
          samples: u([1, -1, -1, -1, -1, -1, -1, -1, -1, -1]),
        },
        {
          name: "modbox sunsoft bass",
          expression: 1,
          samples: u([
            0, 0.1875, 0.3125, 0.5625, 0.5, 0.75, 0.875, 1, 1, 0.6875, 0.5,
            0.625, 0.625, 0.5, 0.375, 0.5625, 0.4375, 0.5625, 0.4375, 0.4375,
            0.3125, 0.1875, 0.1875, 0.375, 0.5625, 0.5625, 0.5625, 0.5625,
            0.5625, 0.4375, 0.25, 0,
          ]),
        },
        {
          name: "modbox loud pulse",
          expression: 0.5,
          samples: u([
            1, 0.7, 0.1, 0.1, 0, 0, 0, 0, 0, 0.1, 0.2, 0.15, 0.25, 0.125, 0.215,
            0.345, 4,
          ]),
        },
        {
          name: "modbox sax",
          expression: 0.5,
          samples: u([1 / 15, 0.2, 5 / 15, 9, 0.06]),
        },
        {
          name: "modbox guitar",
          expression: 0.5,
          samples: u([-0.5, 3.5, 3, -0.5, -0.25, -1]),
        },
        {
          name: "modbox sine",
          expression: 0.5,
          samples: u([
            0, 0.05, 0.125, 0.2, 0.25, 0.3, 0.425, 0.475, 0.525, 0.625, 0.675,
            0.725, 0.775, 0.8, 0.825, 0.875, 0.9, 0.925, 0.95, 0.975, 0.98,
            0.99, 0.995, 1, 0.995, 0.99, 0.98, 0.975, 0.95, 0.925, 0.9, 0.875,
            0.825, 0.8, 0.775, 0.725, 0.675, 0.625, 0.525, 0.475, 0.425, 0.3,
            0.25, 0.2, 0.125, 0.05, 0, -0.05, -0.125, -0.2, -0.25, -0.3, -0.425,
            -0.475, -0.525, -0.625, -0.675, -0.725, -0.775, -0.8, -0.825,
            -0.875, -0.9, -0.925, -0.95, -0.975, -0.98, -0.99, -0.995, -1,
            -0.995, -0.99, -0.98, -0.975, -0.95, -0.925, -0.9, -0.875, -0.825,
            -0.8, -0.775, -0.725, -0.675, -0.625, -0.525, -0.475, -0.425, -0.3,
            -0.25, -0.2, -0.125, -0.05,
          ]),
        },
        {
          name: "modbox atari bass",
          expression: 0.5,
          samples: u([1, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0]),
        },
        {
          name: "modbox atari pulse",
          expression: 0.5,
          samples: u([1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]),
        },
        {
          name: "modbox 1% pulse",
          expression: 0.5,
          samples: u([
            1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
          ]),
        },
        {
          name: "modbox curved sawtooth",
          expression: 0.5,
          samples: u([1, 0.5, 1 / 3, 1 / 4]),
        },
        {
          name: "modbox viola",
          expression: 0.45,
          samples: u([
            -0.9, -1, -0.85, -0.775, -0.7, -0.6, -0.5, -0.4, -0.325, -0.225,
            -0.2, -0.125, -0.1, -0.11, -0.125, -0.15, -0.175, -0.18, -0.2,
            -0.21, -0.22, -0.21, -0.2, -0.175, -0.15, -0.1, -0.5, 0.75, 0.11,
            0.175, 0.2, 0.25, 0.26, 0.275, 0.26, 0.25, 0.225, 0.2, 0.19, 0.18,
            0.19, 0.2, 0.21, 0.22, 0.23, 0.24, 0.25, 0.26, 0.275, 0.28, 0.29,
            0.3, 0.29, 0.28, 0.27, 0.26, 0.25, 0.225, 0.2, 0.175, 0.15, 0.1,
            0.075, 0, -0.01, -0.025, 0.025, 0.075, 0.2, 0.3, 0.475, 0.6, 0.75,
            0.85, 0.85, 1, 0.99, 0.95, 0.8, 0.675, 0.475, 0.275, 0.01, -0.15,
            -0.3, -0.475, -0.5, -0.6, -0.71, -0.81, -0.9, -1, -0.9,
          ]),
        },
        {
          name: "modbox brass",
          expression: 0.45,
          samples: u([
            -1, -0.95, -0.975, -0.9, -0.85, -0.8, -0.775, -0.65, -0.6, -0.5,
            -0.475, -0.35, -0.275, -0.2, -0.125, -0.05, 0, 0.075, 0.125, 0.15,
            0.2, 0.21, 0.225, 0.25, 0.225, 0.21, 0.2, 0.19, 0.175, 0.125, 0.1,
            0.075, 0.06, 0.05, 0.04, 0.025, 0.04, 0.05, 0.1, 0.15, 0.225, 0.325,
            0.425, 0.575, 0.7, 0.85, 0.95, 1, 0.9, 0.675, 0.375, 0.2, 0.275,
            0.4, 0.5, 0.55, 0.6, 0.625, 0.65, 0.65, 0.65, 0.65, 0.64, 0.6, 0.55,
            0.5, 0.4, 0.325, 0.25, 0.15, 0.05, -0.05, -0.15, -0.275, -0.35,
            -0.45, -0.55, -0.65, -0.7, -0.78, -0.825, -0.9, -0.925, -0.95,
            -0.975,
          ]),
        },
        {
          name: "modbox acoustic bass",
          expression: 0.5,
          samples: u([1, 0, 0.1, -0.1, -0.2, -0.4, -0.3, -1]),
        },
        {
          name: "modbox lyre",
          expression: 0.45,
          samples: u([1, -1, 4, 2.15, 4.13, 5.15, 0, -0.05, 1]),
        },
        {
          name: "modbox ramp pulse",
          expression: 0.5,
          samples: u([6.1, -2.9, 1.4, -2.9]),
        },
        {
          name: "modbox piccolo",
          expression: 0.5,
          samples: u([1, 4, 2, 1, -0.1, -1, -0.12]),
        },
        {
          name: "modbox squaretooth",
          expression: 0.5,
          samples: u([0.2, 1, 2.6, 1, 0, -2.4]),
        },
        {
          name: "modbox flatline",
          expression: 1,
          samples: u([
            1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0, 0.1, 0.2, 0.3,
            0.4, 0.5, 0.6, 0.7, 0.8, 0.9,
          ]),
        },
        {
          name: "modbox pnryshk a (u5)",
          expression: 0.4,
          samples: u([1, 0.9, 0.8, 0.7, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0]),
        },
        {
          name: "modbox pnryshk b (riff)",
          expression: 0.5,
          samples: u([
            1, -0.9, 0.8, -0.7, 0.6, -0.5, 0.4, -0.3, 0.2, -0.1, 0, -0.1, 0.2,
            -0.3, 0.4, -0.5, 0.6, -0.7, 0.8, -0.9, 1,
          ]),
        },
        {
          name: "sandbox shrill lute",
          expression: 0.94,
          samples: u([1, 1.5, 1.25, 1.2, 1.3, 1.5]),
        },
        {
          name: "sandbox bassoon",
          expression: 0.5,
          samples: u([1, -1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0]),
        },
        {
          name: "sandbox shrill bass",
          expression: 0.5,
          samples: u([0, 1, 0, 0, 1, 0, 1, 0, 0, 0]),
        },
        {
          name: "sandbox nes pulse",
          expression: 0.4,
          samples: u([2.1, -2.2, 1.2, 3]),
        },
        {
          name: "sandbox saw bass",
          expression: 0.25,
          samples: u([
            1, 1, 1, 1, 0, 2, 1, 2, 3, 1, -2, 1, 4, 1, 4, 2, 1, 6, -3, 4, 2, 1,
            5, 1, 4, 1, 5, 6, 7, 1, 6, 1, 4, 1, 9,
          ]),
        },
        {
          name: "sandbox euphonium",
          expression: 0.3,
          samples: u([
            0, 1, 2, 1, 2, 1, 4, 2, 5, 0, -2, 1, 5, 1, 2, 1, 2, 4, 5, 1, 5, -2,
            5, 10, 1,
          ]),
        },
        {
          name: "sandbox shrill pulse",
          expression: 0.3,
          samples: u([2, 0, 4, 1, 4, 6, 7, 3]),
        },
        {
          name: "sandbox r-sawtooth",
          expression: 0.2,
          samples: u([6.1, -2.9, 1.4, -2.9]),
        },
        {
          name: "sandbox recorder",
          expression: 0.2,
          samples: u([5, -5.1, 4, -4.1, 3, -3.1, 2, -2.1, 1, -1.1, 6]),
        },
        {
          name: "sandbox narrow saw",
          expression: 1.2,
          samples: u([
            0.1,
            -1.3,
            0.13 / -0.3,
            -0.26,
            0.13 / -0.7,
            0.13 / -0.9,
            0.13 / -0.11,
            0.13 / -0.31,
            0.13 / -0.51,
            0.13 / -0.71,
            0.13 / -0.91,
            0.13 / -0.12,
            -0.40625,
            -0.25,
            0.13 / -0.72,
            0.13 / -0.92,
            -1,
            1,
            0.13 / 0.92,
            0.13 / 0.72,
            0.25,
            0.40625,
            0.13 / 0.12,
            0.13 / 0.91,
            0.13 / 0.71,
            0.13 / 0.51,
            0.13 / 0.31,
            0.13 / 0.11,
            0.13 / 0.9,
            0.13 / 0.7,
            0.26,
            0.13 / 0.3,
            0.13,
          ]),
        },
        {
          name: "sandbox deep square",
          expression: 1,
          samples: u([1, 2.25, 1, -1, -2.25, -1]),
        },
        {
          name: "sandbox ring pulse",
          expression: 1,
          samples: u([
            1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, 1, -1,
            -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1,
            -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1,
            -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1,
            -1, -1, -1,
          ]),
        },
        {
          name: "sandbox double sine",
          expression: 1,
          samples: u([
            1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 1.8, 1.7, 1.6, 1.5,
            1.4, 1.3, 1.2, 1.1, 1, 0, -1, -1.1, -1.2, -1.3, -1.4, -1.5, -1.6,
            -1.7, -1.8, -1.9, -1.8, -1.7, -1.6, -1.5, -1.4, -1.3, -1.2, -1.1,
            -1,
          ]),
        },
        {
          name: "sandbox contrabass",
          expression: 0.5,
          samples: u([4.2, 6.9, 1.337, 6.66]),
        },
        {
          name: "sandbox double bass",
          expression: 0.4,
          samples: u([
            0, 0.1875, 0.3125, 0.5625, 0.5, 0.75, 0.875, 1, -1, -0.6875, -0.5,
            -0.625, -0.625, -0.5, -0.375, -0.5625, -0.4375, -0.5625, -0.4375,
            -0.4375, -0.3125, -0.1875, 0.1875, 0.375, 0.5625, -0.5625, 0.5625,
            0.5625, 0.5625, 0.4375, 0.25, 0,
          ]),
        },
        { name: "haileybox test1", expression: 0.5, samples: u([1, 0.5, -1]) },
        {
          name: "brucebox pokey 4bit lfsr",
          expression: 0.5,
          samples: u([1, -1, -1, -1, 1, 1, 1, 1, -1, 1, -1, 1, 1, -1, -1]),
        },
        {
          name: "brucebox pokey 5step bass",
          expression: 0.5,
          samples: u([1, -1, 1, -1, 1]),
        },
        {
          name: "brucebox isolated spiky",
          expression: 0.5,
          samples: u([1, -1, 1, -1, 1, -1]),
        },
        {
          name: "nerdbox unnamed 1",
          expression: 0.5,
          samples: u([0.2, 4, 0.7, -0.4, -1, 0.5, -0.5 / 0.6]),
        },
        {
          name: "nerdbox unnamed 2",
          expression: 0.5,
          samples: u([2, 5 / 55, -9, 1, -55, 18.5 / -26]),
        },
        {
          name: "zefbox semi-square",
          expression: 1,
          samples: u([1, 1.5, 2, 2.5, 2.5, 2.5, 2, 1.5, 1]),
        },
        {
          name: "zefbox deep square",
          expression: 1,
          samples: u([1, 2.25, 1, -1, -2.25, -1]),
        },
        {
          name: "zefbox squaretal",
          expression: 0.7,
          samples: u([1.5, 1, 1.5, -1.5, -1, -1.5]),
        },
        {
          name: "zefbox saw wide",
          expression: 0.65,
          samples: u([
            0, -0.4, -0.8, -1.2, -1.6, -2, 0, -0.4, -0.8, -1.2, -1.6,
          ]),
        },
        {
          name: "zefbox saw narrow",
          expression: 0.65,
          samples: u([1, 0.5, 1, 0.5, 1, 0.5, 1, 2, 1, 2, 1]),
        },
        {
          name: "zefbox deep sawtooth",
          expression: 0.5,
          samples: u([
            0, 2, 3, 4, 4.5, 5, 5.5, 6, 6.25, 6.5, 6.75, 7, 6.75, 6.5, 6.25, 6,
            5.5, 5, 4.5, 4, 3, 2, 1,
          ]),
        },
        {
          name: "zefbox sawtal",
          expression: 0.3,
          samples: u([
            1.5, 1, 1.25, -0.5, 1.5, -0.5, 0, -1.5, 1.5, 0, 0.5, -1.5, 0.5,
            1.25, -1, -1.5,
          ]),
        },
        {
          name: "zefbox deep sawtal",
          expression: 0.7,
          samples: u([0.75, 0.25, 0.5, -0.5, 0.5, -0.5, -0.25, -0.75]),
        },
        {
          name: "zefbox pulse",
          expression: 0.5,
          samples: u([1, -2, -2, -1.5, -1.5, -1.25, -1.25, -1, -1]),
        },
        {
          name: "zefbox triple pulse",
          expression: 0.4,
          samples: u([1, 1, 1, 1, 1, -1, -1, 1.5, 1, 1, 1, 1, -1, -1, -1, 1.5]),
        },
        {
          name: "zefbox high pulse",
          expression: 0.2,
          samples: u([1, -2, 2, -3, 3, -4, 5, -4, 3, -3, 2, -2, 1]),
        },
        {
          name: "zefbox deep pulse",
          expression: 0.2,
          samples: u([1, 2, 2, -2, -2, -3, -4, -4, -5, -5, -5, -5, 0, -1, -2]),
        },
        {
          name: "wackybox guitar string",
          expression: 0.6,
          samples: u([
            0, 63, 63, 63, 63, 19, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 11,
            63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63, 63,
            63, 63, 63, 63, 63, 63, 63, 27, 63, 63, 63, 63, 63, 63, 63, 63, 63,
            63, 63, 63, 63, 63, 63, 63, 63, 34, 63, 63, 63, 63,
          ]),
        },
        {
          name: "wackybox intense",
          expression: 0.6,
          samples: u([
            36, 25, 33, 35, 18, 51, 22, 40, 27, 37, 31, 33, 25, 29, 41, 23, 31,
            31, 45, 20, 37, 23, 29, 26, 42, 29, 33, 26, 31, 27, 40, 25, 40, 26,
            37, 24, 41, 32, 0, 32, 33, 29, 32, 31, 31, 31, 31, 31, 31, 31, 31,
            31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31,
          ]),
        },
        {
          name: "wackybox buzz wave",
          expression: 0.6,
          samples: u([
            0, 1, 1, 2, 4, 4, 4, 4, 5, 5, 6, 6, 6, 7, 8, 8, 8, 9, 9, 9, 9, 9, 9,
            8, 8, 8, 11, 15, 23, 62, 61, 60, 58, 56, 56, 54, 53, 52, 50, 49, 48,
            47, 47, 45, 45, 45, 44, 44, 43, 43, 42, 42, 42, 42, 42, 42, 42, 42,
            42, 42, 42, 43, 43, 53,
          ]),
        },
        { name: "todbox 1/3 pulse", expression: 0.5, samples: c([1, -1, -1]) },
        {
          name: "todbox 1/5 pulse",
          expression: 0.5,
          samples: c([1, -1, -1, -1, -1]),
        },
        {
          name: "todbox slap bass",
          expression: 0.5,
          samples: u([
            1, 0.5, 0, 0.5, 1.25, 0.5, -0.25, 0.1, -0.1, 0.1, 1.1, 2.1, 3, 3.5,
            2.9, 3.3, 2.7, 2.9, 2.3, 2, 1.9, 1.8, 1, 0.7, 0.9, 0.8, 0.4, 0.1, 0,
            0.2, 0.4, 0.6, 0.5, 0.8,
          ]),
        },
        {
          name: "todbox harsh wave",
          expression: 0.45,
          samples: u([
            1, -1, -1, -1, 0.5, 0.5, 0.5, 0.7, 0.39, 1.3, 0, -1, -1, -1, -1, -1,
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
            -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
          ]),
        },
        {
          name: "todbox accordian",
          expression: 0.5,
          samples: u([
            0, 1, 1, 2, 2, 1.5, 1.5, 0.8, 0, -2, -3.25, -4, -4.5, -5.5, -6,
            -5.75, -5.5, -5, -5, -5, -6, -6, -6, -5, -4, -3, -2, -1, 0.75, 1, 2,
            3, 4, 5, 6, 6.5, 7.5, 8, 7.75, 6, 5.25, 5, 5, 5, 5, 5, 4.25, 3.75,
            3.25, 2.75, 1.25, -0.75, -2, -0.75, 1.25, 1.25, 2, 2, 2, 2, 1.5, -1,
            -2, -1, 1.5, 2, 2.75, 2.75, 2.75, 3, 2.75, -1, -2, -2.5, -2, -1,
            -2.25, -2.75, -2, -3, -1.75, 1, 2, 3.5, 4, 5.25, 6, 8, 9.75, 10,
            9.5, 9, 8.5, 7.5, 6.5, 5.25, 5, 4.5, 4, 4, 4, 3.25, 2.5, 2, 1, -0.5,
            -2, -3.5, -4, -4, -4, -3.75, -3, -2, -1,
          ]),
        },
        {
          name: "todbox beta banana wave",
          expression: 0.8,
          samples: u([
            0, 0.2, 0.4, 0.5, 0.6, 0.7, 0.8, 0.85, 0.9, 0.95, 1, 1, 1, 1, 1, 1,
            1, 1, 1, 1, 1, 1, 1, 1, 1, 0.95, 0.9, 0.85, 0.8, 0.7, 0.6, 0.5, 0.4,
            0.2, 0,
          ]),
        },
        {
          name: "todbox beta test wave",
          expression: 0.5,
          samples: u([56, 0, -52, 16, 3, 3, 2, -35, 20, 147, -53, 0, 0, 5, -6]),
        },
        {
          name: "todbox beta real snare",
          expression: 1,
          samples: u([
            0, -0.01208, -0.02997, -0.04382, -0.06042, -0.07529, -0.09116,
            -0.10654, -0.12189, -0.13751, -0.15289, -0.16849, -0.18387,
            -0.19974, -0.21484, -0.23071, -0.24557, -0.26144, -0.27731,
            -0.29141, -0.3035, -0.32416, -0.34406, -0.32947, -0.31158, -0.33725,
            -0.37579, -0.39746, -0.40201, -0.40906, -0.4418, -0.47229, -0.47379,
            -0.47733, -0.45239, -0.33954, -0.22894, -0.22443, -0.32138,
            -0.46371, -0.57178, -0.61081, -0.59998, -0.61459, -0.62189,
            -0.43979, -0.19217, -0.12643, -0.17252, -0.20956, -0.20981,
            -0.19217, -0.22845, -0.34332, -0.50629, -0.64307, -0.72922,
            -0.81384, -0.87857, -0.90149, -0.88687, -0.86169, -0.87781,
            -0.80478, -0.52493, -0.31308, -0.33249, -0.39395, -0.39017,
            -0.30301, -0.19949, -0.13071, -0.02493, 0.14307, 0.34961, 0.52542,
            0.63223, 0.68613, 0.7471, 0.87305, 0.98184, 0.98889, 0.97052,
            0.99066, 0.99747, 0.99344, 0.99469, 0.99393, 0.9957, 0.99393,
            0.99521, 0.99469, 0.9942, 0.99521, 0.9942, 0.99521, 0.99469,
            0.99469, 0.99521, 0.9942, 0.99545, 0.99445, 0.99469, 0.99493,
            0.9942, 0.99521, 0.99393, 0.99493, 0.99469, 0.99445, 0.9957,
            0.99445, 0.99521, 0.99469, 0.99469, 0.99521, 0.9942, 0.99545,
            0.99445, 0.99445, 0.99493, 0.9942, 0.99545, 0.9942, 0.99493,
            0.99493, 0.9942, 0.99545, 0.99445, 0.99521, 0.99469, 0.99445,
            0.99545, 0.99368, 0.99393, 0.99445, 0.99268, 0.97983, 0.97229,
            0.95944, 0.88486, 0.76773, 0.64481, 0.53098, 0.39847, 0.19318,
            -0.03827, -0.20325, -0.39319, -0.68765, -0.88461, -0.93448,
            -0.96069, -0.97681, -0.98715, -0.99042, -0.99142, -0.99091,
            -0.99142, -0.99219, -0.99091, -0.99219, -0.99066, -0.99142,
            -0.99142, -0.99118, -0.99191, -0.99066, -0.99191, -0.99142,
            -0.99142, -0.99191, -0.99091, -0.99219, -0.99118, -0.99142,
            -0.99167, -0.99091, -0.99219, -0.99091, -0.99167, -0.99142,
            -0.99091, -0.99191, -0.99091, -0.99191, -0.99142, -0.99118,
            -0.99191, -0.99066, -0.99191, -0.99118, -0.99142, -0.99191,
            -0.99066, -0.99191, -0.99091, -0.99167, -0.99191, -0.99118,
            -0.99219, -0.99091, -0.99191, -0.99142, -0.99142, -0.99243,
            -0.98865, -0.98764, -0.99219, -0.98083, -0.92517, -0.9277, -0.91486,
            -0.59042, -0.15189, 0.02945, 0.05667, 0.06195, 0.00629, -0.18008,
            -0.56497, -0.8801, -0.9277, -0.92871, -0.97705, -0.99167, -0.98663,
            -0.99118, -0.99042, -0.99219, -0.99142, -0.99118, -0.98941,
            -0.99219, -1, -0.9758, -0.95993, -0.99948, -0.98236, -0.84659,
            -0.7486, -0.70679, -0.59747, -0.48035, -0.41687, -0.36826, -0.29745,
            -0.18185, -0.06219, 0.02164, 0.07907, 0.13123, 0.18033, 0.1962,
            0.15692, 0.14053, 0.20251, 0.2753, 0.30905, 0.29092, 0.27252,
            0.30402, 0.32416, 0.32214, 0.35239, 0.3967, 0.43198, 0.4942,
            0.58487, 0.64154, 0.65967, 0.6705, 0.67026, 0.66522, 0.6554,
            0.66119, 0.70627, 0.75842, 0.78738, 0.7894, 0.78763, 0.80402,
            0.85944, 0.94559, 0.9899, 0.9816, 0.98007, 0.99368, 0.99393,
            0.98538, 0.9758, 0.97101, 0.93802, 0.81812, 0.64633, 0.46649,
            0.28613, 0.14685, 0.08966, 0.12543, 0.20325, 0.24557, 0.18866,
            0.02795, -0.20175, -0.44205, -0.58713, -0.57629, -0.41385, -0.14255,
            0.18033, 0.47882, 0.68311, 0.72314, 0.62064, 0.48309, 0.43073,
            0.53577, 0.72794, 0.9025, 0.97354, 0.97, 0.98083, 0.99191, 0.99319,
            0.99493, 0.99393, 0.99521, 0.99393, 0.99545, 0.9942, 0.99493,
            0.99493, 0.99445, 0.99545, 0.9942, 0.99545, 0.99243, 0.98917,
            0.98386, 0.97781, 0.95844, 0.89066, 0.81561, 0.78134, 0.77277,
            0.75995, 0.73022, 0.67126, 0.57178, 0.47, 0.38361, 0.29419, 0.20703,
            0.14734, 0.15866, 0.25162, 0.35818, 0.45062, 0.5675, 0.69748,
            0.81232, 0.89697, 0.95062, 0.97656, 0.98615, 0.99191, 0.99219,
            0.99243, 0.99368, 0.99368, 0.97028, 0.95566, 0.94559, 0.82617,
            0.59973, 0.38361, 0.23901, 0.15338, 0.12921, 0.11206, 0.04382,
            -0.12946, -0.43552, -0.72644, -0.89847, -0.95465, -0.95541,
            -0.97229, -0.99268, -0.99319, -0.9884, -0.99142, -0.99167, -0.99091,
            -0.9884, -0.98965, -0.99368, -0.97455, -0.9501, -0.94684, -0.96219,
            -0.98514, -0.99243, -0.98889, -0.98917, -0.99142, -0.99219,
            -0.99091, -0.99191, -0.99142, -0.99142, -0.99191, -0.99066,
            -0.99167, -0.99091, -0.99142, -0.99191, -0.99091, -0.99191,
            -0.99091, -0.99167, -0.99167, -0.99091, -0.99219, -0.99091,
            -0.99191, -0.99142, -0.99118, -0.99191, -0.99066, -0.99191,
            -0.99091, -0.99118, -0.99243, -0.98941, -0.98462, -0.96976, -0.9632,
            -0.96194, -0.87305, -0.66196, -0.44809, -0.29495, -0.18085,
            -0.11813, -0.11334, -0.18564, -0.34885, -0.58237, -0.8045, -0.93726,
            -0.97806, -0.97354, -0.97531, -0.9899, -0.99368, -0.98941, -0.99219,
            -0.99091, -0.99142, -0.99167, -0.99091, -0.99191, -0.99118,
            -0.99219, -0.98236, -0.97781, -0.97656, -0.95135, -0.87204,
            -0.71335, -0.52139, -0.34232, -0.17783, -0.00906, 0.14886, 0.3045,
            0.48889, 0.67404, 0.8403, 0.94128, 0.97681, 0.98462, 0.98337,
            0.99142, 0.99521, 0.99493, 0.9942, 0.99445, 0.99521, 0.99393,
            0.99545, 0.99445, 0.99521, 0.99521, 0.99445, 0.9957, 0.99445,
            0.99521, 0.99469, 0.99445, 0.99521, 0.9942, 0.99521, 0.99445,
            0.99445, 0.99521, 0.99445, 0.99545, 0.99445, 0.99469, 0.99493,
            0.99393, 0.99493, 0.99445, 0.99393, 0.98285, 0.97781, 0.97479,
            0.92844, 0.82114, 0.66095, 0.52417, 0.46826, 0.46722, 0.47934,
            0.47379, 0.47076, 0.48209, 0.42014, 0.25439, 0.10074, -0.00302,
            -0.08966, -0.16068, -0.21436, -0.2204, -0.15137, -0.00476, 0.18536,
            0.37631, 0.52292, 0.62164, 0.70425, 0.74835, 0.72366, 0.63928,
            0.52567, 0.40805, 0.35666, 0.42896, 0.60175, 0.802, 0.92743,
            0.96548, 0.97632, 0.98337, 0.99066, 0.99521, 0.9942, 0.99368,
            0.99292, 0.9884, 0.98083, 0.96774, 0.93323, 0.8544, 0.6947, 0.47202,
            0.20425, -0.0889, -0.36423, -0.60025, -0.77481, -0.90173, -0.96017,
            -0.97028, -0.98108, -0.9884, -0.99219, -0.9899, -0.99219, -0.99142,
            -0.99142, -0.99219, -0.99091, -0.99243, -0.99066, -0.99142,
            -0.99142, -0.99118, -0.99191, -0.99066, -0.99167, -0.99142,
            -0.99142, -0.99219, -0.99091, -0.99191, -0.99118, -0.99142,
            -0.99191, -0.99091, -0.99191, -0.99091, -0.99167, -0.99191,
            -0.99118, -0.99219, -0.99091, -0.99167, -0.99142, -0.99142,
            -0.99219, -0.99091, -0.99191, -0.99142, -0.99118, -0.98917,
            -0.99042, -0.99445, -0.9733, -0.9559, -0.96219, -0.8967, -0.72241,
            -0.55112, -0.44809, -0.39319, -0.37833, -0.35641, -0.2627, -0.1423,
            -0.11282, -0.13525, -0.11536, -0.09671, -0.11511, -0.1806, -0.26874,
            -0.33374, -0.42215, -0.51358, -0.44785, -0.3045, -0.28613, -0.30527,
            -0.25037, -0.1539, -0.08286, -0.11157, -0.12592, -0.00327, 0.13803,
            0.19141, 0.1282, 0.01788, -0.03952, -0.12592, -0.26773, -0.34634,
            -0.31384, -0.1806, -0.0108, 0.13574, 0.2612, 0.36975, 0.46573,
            0.55087, 0.63626, 0.73022, 0.83072, 0.92014, 0.97177, 0.98587,
            0.98413, 0.99167, 0.99445, 0.99292, 0.99219, 0.9874, 0.98007,
            0.96472, 0.92239, 0.82166, 0.69067, 0.57959, 0.54962, 0.59695,
            0.64255, 0.64633, 0.60629, 0.55942, 0.5491, 0.58966, 0.61887,
            0.56952, 0.54181, 0.59518, 0.63248, 0.63876, 0.65463, 0.73398,
            0.88312, 0.96927, 0.97101, 0.97958, 0.99344, 0.9942, 0.99268,
            0.99493, 0.99469, 0.99445, 0.99521, 0.99445, 0.99545, 0.9942,
            0.99493, 0.99493, 0.9942, 0.99545, 0.9942, 0.99493, 0.9942, 0.99393,
            0.9942, 0.9884, 0.98309, 0.98309, 0.96069, 0.88461, 0.7937, 0.72064,
            0.65765, 0.59998, 0.53247, 0.49268, 0.48615, 0.44205, 0.38034,
            0.36447, 0.38715, 0.39294, 0.32645, 0.19595, 0.07782, -0.05893,
            -0.27832, -0.48309, -0.62619, -0.72995, -0.79999, -0.84583,
            -0.82166, -0.73575, -0.67227, -0.65491, -0.6496, -0.66397, -0.70175,
            -0.72894, -0.74658, -0.76724, -0.7952, -0.82846, -0.86523, -0.90527,
            -0.94382, -0.89948, -0.69849, -0.47479, -0.31662, -0.15414,
            -0.00729, 0.07077, 0.08237, 0.04431, -0.02292, -0.11761, -0.24307,
            -0.36926, -0.45087, -0.4617, -0.4025, -0.30679, -0.17529, 0,
            0.14331, 0.24179, 0.36774, 0.49545, 0.56522, 0.57907, 0.56775,
            0.53851, 0.51132, 0.48688, 0.41913, 0.26044, 0.00955, -0.26297,
            -0.46396, -0.62341, -0.82214, -0.94684, -0.96774, -0.97531,
            -0.98413, -0.99017, -0.9899, -0.99219, -0.99066, -0.99142, -0.99167,
            -0.99118, -0.99219, -0.9899, -0.99118, -0.99368, -0.99142, -0.97757,
            -0.97403, -0.98007, -0.9617, -0.86826, -0.67783, -0.52719, -0.48788,
            -0.4549, -0.43146, -0.47681, -0.54105, -0.57983, -0.60904, -0.62317,
            -0.59949, -0.55566, -0.52063, -0.52115, -0.55112, -0.56244,
            -0.58337, -0.6554, -0.73373, -0.77228, -0.74759, -0.6889, -0.64609,
            -0.61887, -0.5806, -0.50351, -0.40729, -0.33929, -0.3511, -0.42944,
            -0.47028, -0.42267, -0.32718, -0.20224, -0.0564, 0.04556, 0.10529,
            0.1763, 0.26169, 0.33197, 0.32138, 0.23776, 0.20956, 0.23148,
            0.20352, 0.23325, 0.39267, 0.52719, 0.58438, 0.62289, 0.66345,
            0.70023, 0.66296, 0.5433, 0.42618, 0.33475, 0.24533, 0.14105,
            0.03851, 0.01358, 0.09143, 0.22845, 0.34961, 0.41711, 0.4874,
            0.58914, 0.69519, 0.78186, 0.84357, 0.89822, 0.95389, 0.98135,
            0.98615, 0.99167, 0.99243, 0.99445, 0.9942, 0.99469, 0.99493,
            0.99393, 0.99545, 0.99445, 0.99521, 0.99469, 0.99445, 0.99521,
            0.9942, 0.99469, 0.98965, 0.98715, 0.98563, 0.96295, 0.91736,
            0.86624, 0.82367, 0.77554, 0.68411, 0.53549, 0.38916, 0.2612,
            0.11435, -0.04053, -0.18161, -0.23172, -0.19394, -0.15237, -0.1073,
            -0.02997, 0.08588, 0.2262, 0.34305, 0.44104, 0.5574, 0.65765,
            0.71259, 0.69217, 0.65363, 0.69748, 0.79572, 0.89368, 0.95514,
            0.97733, 0.98413, 0.98816, 0.99243, 0.99445, 0.99243, 0.97302,
            0.96674, 0.97983, 0.90378, 0.71005, 0.51056, 0.40451, 0.40982,
            0.41559, 0.32996, 0.24356, 0.18866, 0.11411, 0.05365, 0.01157,
            -0.03247, -0.09216, -0.16095, -0.23248, -0.31662, -0.39771,
            -0.48663, -0.59647, -0.71536, -0.82013, -0.85287, -0.82947,
            -0.84937, -0.92215, -0.97177, -0.98663, -0.98816, -0.98438,
            -0.99091, -0.99219, -0.99091, -0.99191, -0.99042, -0.99191,
            -0.99091, -0.99142, -0.99191, -0.99091, -0.99191, -0.99091,
            -0.99167, -0.99142,
          ]),
        },
        {
          name: "ultrabox shortened od guitar",
          expression: 0.5,
          samples: u([
            -0.82785, -0.67621, -0.40268, -0.43817, -0.45468, -0.22531,
            -0.18329, 0.2475, 0.71246, 0.52155, 0.56082, 0.48395, 0.3399,
            0.46957, 0.27744, 0.42313, 0.47104, 0.18796, 0.1293, -0.13901,
            -0.07431, -0.16348, -0.74857, -0.73206, -0.35181, -0.26227,
            -0.41882, -0.27786, -0.19806, -0.19867, 0.18643, 0.24808, 0.08847,
            -0.06964, 0.06912, 0.20474, -0.05304, 0.29416, 0.31967, 0.14243,
            0.27521, -0.23932, -0.14752, 0.1236, -0.26123, -0.26111, 0.06616,
            0.2652, 0.0809, 0.1524, 0.16254, -0.12061, 0.04562, 0.00131, 0.0405,
            0.08182, -0.21729, -0.17041, -0.16312, -0.08563, 0.0639, 0.05099,
            0.05627, 0.02728, 0.00726, -0.13028, -0.05673, -0.14969, -0.17645,
            0.35492, 0.16766, -0.00897, 0.24326, -0.00461, -0.04456, 0.01776,
            -0.0495, -0.01221, 0.02039, 0.07684, 0.13397, 0.3985, 0.35962,
            0.13754, 0.4231, 0.27161, -0.17609, 0.03659, 0.10635, -0.21909,
            -0.22046, -0.20258, -0.40973, -0.4028, -0.40521, -0.66284,
          ]),
        },
      ])),
      (h.chipWaves = (function (e) {
        const t = new Array(e.length),
          s = {};
        for (let i = 0; i < t.length; i++) {
          t[i] = Object.assign([], e[i]);
          const n = t[i];
          (n.index = i), (s[n.name] = n);
        }
        for (let e in s) s[e].samples = p(s[e].samples);
        const i = t;
        return (i.dictionary = s), i;
      })(h.rawChipWaves)),
      (h.rawRawChipWaves = h.rawChipWaves),
      (h.firstIndexForSamplesInChipWaveList = h.chipWaves.length),
      (h.chipNoises = g([
        {
          name: "retro",
          expression: 0.25,
          basePitch: 69,
          pitchFilterMult: 1024,
          isSoft: !1,
          samples: null,
        },
        {
          name: "white",
          expression: 1,
          basePitch: 69,
          pitchFilterMult: 8,
          isSoft: !0,
          samples: null,
        },
        {
          name: "clang",
          expression: 0.4,
          basePitch: 69,
          pitchFilterMult: 1024,
          isSoft: !1,
          samples: null,
        },
        {
          name: "buzz",
          expression: 0.3,
          basePitch: 69,
          pitchFilterMult: 1024,
          isSoft: !1,
          samples: null,
        },
        {
          name: "hollow",
          expression: 1.5,
          basePitch: 96,
          pitchFilterMult: 1,
          isSoft: !0,
          samples: null,
        },
        {
          name: "shine",
          expression: 1,
          basePitch: 69,
          pitchFilterMult: 1024,
          isSoft: !1,
          samples: null,
        },
        {
          name: "deep",
          expression: 1.5,
          basePitch: 120,
          pitchFilterMult: 1024,
          isSoft: !0,
          samples: null,
        },
        {
          name: "cutter",
          expression: 0.005,
          basePitch: 96,
          pitchFilterMult: 1024,
          isSoft: !1,
          samples: null,
        },
        {
          name: "metallic",
          expression: 1,
          basePitch: 96,
          pitchFilterMult: 1024,
          isSoft: !1,
          samples: null,
        },
        {
          name: "static",
          expression: 1,
          basePitch: 96,
          pitchFilterMult: 1024,
          isSoft: !1,
          samples: null,
        },
        {
          name: "1-bit white",
          expression: 0.5,
          basePitch: 74.41,
          pitchFilterMult: 1024,
          isSoft: !1,
          samples: null,
        },
        {
          name: "1-bit metallic",
          expression: 0.5,
          basePitch: 86.41,
          pitchFilterMult: 1024,
          isSoft: !1,
          samples: null,
        },
        {
          name: "crackling",
          expression: 0.9,
          basePitch: 69,
          pitchFilterMult: 1024,
          isSoft: !1,
          samples: null,
        },
        {
          name: "pink noise",
          expression: 1,
          basePitch: 69,
          pitchFilterMult: 8,
          isSoft: !0,
          samples: null,
        },
        {
          name: "brownian noise",
          expression: 1,
          basePitch: 69,
          pitchFilterMult: 8,
          isSoft: !0,
          samples: null,
        },
      ])),
      (h.filterFreqStep = 1 / 4),
      (h.filterFreqRange = 34),
      (h.filterFreqReferenceSetting = 28),
      (h.filterFreqReferenceHz = 8e3),
      (h.filterFreqMaxHz =
        h.filterFreqReferenceHz *
        Math.pow(
          2,
          h.filterFreqStep *
            (h.filterFreqRange - 1 - h.filterFreqReferenceSetting)
        )),
      (h.filterFreqMinHz = 8),
      (h.filterGainRange = 15),
      (h.filterGainCenter = 7),
      (h.filterGainStep = 0.5),
      (h.filterMaxPoints = 8),
      (h.filterTypeNames = ["low-pass", "high-pass", "peak"]),
      (h.filterMorphCount = 10),
      (h.filterSimpleCutRange = 11),
      (h.filterSimplePeakRange = 8),
      (h.fadeInRange = 10),
      (h.fadeOutTicks = [-24, -12, -6, -3, -1, 6, 12, 24, 48, 72, 96]),
      (h.fadeOutNeutral = 4),
      (h.drumsetFadeOutTicks = 48),
      (h.transitions = g([
        {
          name: "normal",
          isSeamless: !1,
          continues: !1,
          slides: !1,
          slideTicks: 3,
          includeAdjacentPatterns: !1,
        },
        {
          name: "interrupt",
          isSeamless: !0,
          continues: !1,
          slides: !1,
          slideTicks: 3,
          includeAdjacentPatterns: !0,
        },
        {
          name: "continue",
          isSeamless: !0,
          continues: !0,
          slides: !1,
          slideTicks: 3,
          includeAdjacentPatterns: !0,
        },
        {
          name: "slide",
          isSeamless: !0,
          continues: !1,
          slides: !0,
          slideTicks: 3,
          includeAdjacentPatterns: !0,
        },
        {
          name: "slide in pattern",
          isSeamless: !0,
          continues: !1,
          slides: !0,
          slideTicks: 3,
          includeAdjacentPatterns: !1,
        },
      ])),
      (h.vibratos = g([
        { name: "none", amplitude: 0, type: 0, delayTicks: 0 },
        { name: "light", amplitude: 0.15, type: 0, delayTicks: 0 },
        { name: "delayed", amplitude: 0.3, type: 0, delayTicks: 37 },
        { name: "heavy", amplitude: 0.45, type: 0, delayTicks: 0 },
        { name: "shaky", amplitude: 0.1, type: 1, delayTicks: 0 },
      ])),
      (h.vibratoTypes = g([
        { name: "normal", periodsSeconds: [0.14], period: 0.14 },
        {
          name: "shaky",
          periodsSeconds: [0.11, 0.17798, 0.33],
          period: 266.97,
        },
      ])),
      (h.arpSpeedScale = [
        0,
        0.0625,
        0.125,
        0.2,
        0.25,
        1 / 3,
        0.4,
        0.5,
        2 / 3,
        0.75,
        0.8,
        0.9,
        1,
        1.1,
        1.2,
        1.3,
        1.4,
        1.5,
        1.6,
        1.7,
        1.8,
        1.9,
        2,
        2.1,
        2.2,
        2.3,
        2.4,
        2.5,
        2.6,
        2.7,
        2.8,
        2.9,
        3,
        3.1,
        3.2,
        3.3,
        3.4,
        3.5,
        3.6,
        3.7,
        3.8,
        3.9,
        4,
        4.15,
        4.3,
        4.5,
        4.8,
        5,
        5.5,
        6,
        8,
      ]),
      (h.unisons = g([
        {
          name: "none",
          voices: 1,
          spread: 0,
          offset: 0,
          expression: 1.4,
          sign: 1,
        },
        {
          name: "shimmer",
          voices: 2,
          spread: 0.018,
          offset: 0,
          expression: 0.8,
          sign: 1,
        },
        {
          name: "hum",
          voices: 2,
          spread: 0.045,
          offset: 0,
          expression: 1,
          sign: 1,
        },
        {
          name: "honky tonk",
          voices: 2,
          spread: 0.09,
          offset: 0,
          expression: 1,
          sign: 1,
        },
        {
          name: "dissonant",
          voices: 2,
          spread: 0.25,
          offset: 0,
          expression: 0.9,
          sign: 1,
        },
        {
          name: "fifth",
          voices: 2,
          spread: 3.5,
          offset: 3.5,
          expression: 0.9,
          sign: 1,
        },
        {
          name: "octave",
          voices: 2,
          spread: 6,
          offset: 6,
          expression: 0.8,
          sign: 1,
        },
        {
          name: "bowed",
          voices: 2,
          spread: 0.02,
          offset: 0,
          expression: 1,
          sign: -1,
        },
        {
          name: "piano",
          voices: 2,
          spread: 0.01,
          offset: 0,
          expression: 1,
          sign: 0.7,
        },
        {
          name: "warbled",
          voices: 2,
          spread: 0.25,
          offset: 0.05,
          expression: 0.9,
          sign: -0.8,
        },
        {
          name: "hecking gosh",
          voices: 2,
          spread: 6.25,
          offset: -6,
          expression: 0.8,
          sign: -0.7,
        },
        {
          name: "spinner",
          voices: 2,
          spread: 0.02,
          offset: 0,
          expression: 1,
          sign: 1,
        },
        {
          name: "detune",
          voices: 1,
          spread: 0,
          offset: 0.25,
          expression: 1,
          sign: 1,
        },
        {
          name: "rising",
          voices: 2,
          spread: 1,
          offset: 0.7,
          expression: 0.95,
          sign: 1,
        },
        {
          name: "vibrate",
          voices: 2,
          spread: 3.5,
          offset: 7,
          expression: 0.975,
          sign: 1,
        },
        {
          name: "fourths",
          voices: 2,
          spread: 4,
          offset: 4,
          expression: 0.95,
          sign: 1,
        },
        {
          name: "bass",
          voices: 1,
          spread: 0,
          offset: -7,
          expression: 1,
          sign: 1,
        },
        {
          name: "dirty",
          voices: 2,
          spread: 0,
          offset: 0.1,
          expression: 0.975,
          sign: 1,
        },
        {
          name: "stationary",
          voices: 2,
          spread: 3.5,
          offset: 0,
          expression: 0.9,
          sign: 1,
        },
        {
          name: "recurve",
          voices: 2,
          spread: 0.005,
          offset: 0,
          expression: 1,
          sign: 1,
        },
        {
          name: "voiced",
          voices: 2,
          spread: 9.5,
          offset: 0,
          expression: 1,
          sign: 1,
        },
        {
          name: "fluctuate",
          voices: 2,
          spread: 12,
          offset: 0,
          expression: 1,
          sign: 1,
        },
        {
          name: "thin",
          voices: 1,
          spread: 0,
          offset: 50,
          expression: 1,
          sign: 1,
        },
        {
          name: "inject",
          voices: 2,
          spread: 6,
          offset: 0.4,
          expression: 1,
          sign: 1,
        },
        {
          name: "askewed",
          voices: 2,
          spread: 0,
          offset: 0.42,
          expression: 0.7,
          sign: 1,
        },
        {
          name: "resonance",
          voices: 2,
          spread: 0.0025,
          offset: 0.1,
          expression: 0.8,
          sign: -1.5,
        },
        {
          name: "FART",
          voices: 2,
          spread: 13,
          offset: -5,
          expression: 1,
          sign: -3,
        },
      ])),
      (h.effectNames = [
        "reverb",
        "chorus",
        "panning",
        "distortion",
        "bitcrusher",
        "note filter",
        "echo",
        "pitch shift",
        "detune",
        "vibrato",
        "transition type",
        "chord type",
      ]),
      (h.effectOrder = [2, 10, 11, 7, 8, 9, 5, 3, 4, 1, 6, 0]),
      (h.noteSizeMax = 6),
      (h.volumeRange = 50),
      (h.volumeLogScale = 0.1428),
      (h.panCenter = 50),
      (h.panMax = 2 * h.panCenter),
      (h.panDelaySecondsMax = 0.001),
      (h.chorusRange = 8),
      (h.chorusPeriodSeconds = 2),
      (h.chorusDelayRange = 0.0034),
      (h.chorusDelayOffsets = [
        [1.51, 2.1, 3.35],
        [1.47, 2.15, 3.25],
      ]),
      (h.chorusPhaseOffsets = [
        [0, 2.1, 4.2],
        [3.2, 5.3, 1],
      ]),
      (h.chorusMaxDelay =
        h.chorusDelayRange *
        (1 +
          h.chorusDelayOffsets[0]
            .concat(h.chorusDelayOffsets[1])
            .reduce((e, t) => Math.max(e, t)))),
      (h.chords = g([
        {
          name: "simultaneous",
          customInterval: !1,
          arpeggiates: !1,
          strumParts: 0,
          singleTone: !1,
        },
        {
          name: "strum",
          customInterval: !1,
          arpeggiates: !1,
          strumParts: 1,
          singleTone: !1,
        },
        {
          name: "arpeggio",
          customInterval: !1,
          arpeggiates: !0,
          strumParts: 0,
          singleTone: !0,
        },
        {
          name: "custom interval",
          customInterval: !0,
          arpeggiates: !1,
          strumParts: 0,
          singleTone: !0,
        },
      ])),
      (h.maxChordSize = 9),
      (h.operatorCount = 4),
      (h.maxPitchOrOperatorCount = Math.max(
        h.maxChordSize,
        h.operatorCount + 2
      )),
      (h.algorithms = g([
        {
          name: "1←(2 3 4)",
          carrierCount: 1,
          associatedCarrier: [1, 1, 1, 1],
          modulatedBy: [[2, 3, 4], [], [], []],
        },
        {
          name: "1←(2 3←4)",
          carrierCount: 1,
          associatedCarrier: [1, 1, 1, 1],
          modulatedBy: [[2, 3], [], [4], []],
        },
        {
          name: "1←2←(3 4)",
          carrierCount: 1,
          associatedCarrier: [1, 1, 1, 1],
          modulatedBy: [[2], [3, 4], [], []],
        },
        {
          name: "1←(2 3)←4",
          carrierCount: 1,
          associatedCarrier: [1, 1, 1, 1],
          modulatedBy: [[2, 3], [4], [4], []],
        },
        {
          name: "1←2←3←4",
          carrierCount: 1,
          associatedCarrier: [1, 1, 1, 1],
          modulatedBy: [[2], [3], [4], []],
        },
        {
          name: "1←3 2←4",
          carrierCount: 2,
          associatedCarrier: [1, 2, 1, 2],
          modulatedBy: [[3], [4], [], []],
        },
        {
          name: "1 2←(3 4)",
          carrierCount: 2,
          associatedCarrier: [1, 2, 2, 2],
          modulatedBy: [[], [3, 4], [], []],
        },
        {
          name: "1 2←3←4",
          carrierCount: 2,
          associatedCarrier: [1, 2, 2, 2],
          modulatedBy: [[], [3], [4], []],
        },
        {
          name: "(1 2)←3←4",
          carrierCount: 2,
          associatedCarrier: [1, 2, 2, 2],
          modulatedBy: [[3], [3], [4], []],
        },
        {
          name: "(1 2)←(3 4)",
          carrierCount: 2,
          associatedCarrier: [1, 2, 2, 2],
          modulatedBy: [[3, 4], [3, 4], [], []],
        },
        {
          name: "1 2 3←4",
          carrierCount: 3,
          associatedCarrier: [1, 2, 3, 3],
          modulatedBy: [[], [], [4], []],
        },
        {
          name: "(1 2 3)←4",
          carrierCount: 3,
          associatedCarrier: [1, 2, 3, 3],
          modulatedBy: [[4], [4], [4], []],
        },
        {
          name: "1 2 3 4",
          carrierCount: 4,
          associatedCarrier: [1, 2, 3, 4],
          modulatedBy: [[], [], [], []],
        },
        {
          name: "1←(2 3) 2←4",
          carrierCount: 2,
          associatedCarrier: [1, 2, 1, 2],
          modulatedBy: [[2, 3], [4], [], []],
        },
        {
          name: "1←(2 (3 (4",
          carrierCount: 3,
          associatedCarrier: [1, 2, 3, 3],
          modulatedBy: [[2, 3, 4], [3, 4], [4], []],
        },
      ])),
      (h.algorithms6Op = g([
        {
          name: "Custom",
          carrierCount: 1,
          associatedCarrier: [1, 1, 1, 1, 1, 1],
          modulatedBy: [[2, 3, 4, 5, 6], [], [], [], [], []],
        },
        {
          name: "1←2←3←4←5←6",
          carrierCount: 1,
          associatedCarrier: [1, 1, 1, 1, 1, 1],
          modulatedBy: [[2], [3], [4], [5], [6], []],
        },
        {
          name: "1←3 2←4←5←6",
          carrierCount: 2,
          associatedCarrier: [1, 2, 2, 2, 2, 2],
          modulatedBy: [[3], [4], [], [5], [6], []],
        },
        {
          name: "1←3←4 2←5←6",
          carrierCount: 2,
          associatedCarrier: [1, 1, 1, 2, 2, 2],
          modulatedBy: [[3], [5], [4], [], [6], []],
        },
        {
          name: "1←4 2←5 3←6",
          carrierCount: 3,
          associatedCarrier: [1, 2, 3, 1, 2, 3],
          modulatedBy: [[4], [5], [6], [], [], []],
        },
        {
          name: "1←3 2←(4 5←6)",
          carrierCount: 2,
          associatedCarrier: [1, 2, 2, 2, 2, 2],
          modulatedBy: [[3], [4, 5], [], [], [6], []],
        },
        {
          name: "1←(3 4) 2←5←6",
          carrierCount: 2,
          associatedCarrier: [1, 2, 2, 2, 2, 2],
          modulatedBy: [[3, 4], [5], [], [], [6], []],
        },
        {
          name: "1←3 2←(4 5 6)",
          carrierCount: 2,
          associatedCarrier: [1, 2, 2, 2, 2, 2],
          modulatedBy: [[3], [4, 5, 6], [], [], [], []],
        },
        {
          name: "1←3 2←(4 5)←6",
          carrierCount: 2,
          associatedCarrier: [1, 2, 2, 2, 2, 2],
          modulatedBy: [[3], [4, 5], [], [6], [6], []],
        },
        {
          name: "1←3 2←4←(5 6)",
          carrierCount: 2,
          associatedCarrier: [1, 2, 2, 2, 2, 2],
          modulatedBy: [[3], [4], [], [5, 6], [], []],
        },
        {
          name: "1←(2 3 4 5 6)",
          carrierCount: 1,
          associatedCarrier: [1, 1, 1, 1, 1, 1],
          modulatedBy: [[2, 3, 4, 5, 6], [], [], [], [], []],
        },
        {
          name: "1←(2 3←5 4←6)",
          carrierCount: 1,
          associatedCarrier: [1, 1, 1, 1, 1, 1],
          modulatedBy: [[2, 3, 4], [], [5], [6], [], []],
        },
        {
          name: "1←(2 3 4←5←6)",
          carrierCount: 1,
          associatedCarrier: [1, 1, 1, 1, 1, 1],
          modulatedBy: [[2, 3, 4], [], [], [5], [6], []],
        },
        {
          name: "1←4←5 (2 3)←6",
          carrierCount: 3,
          associatedCarrier: [1, 2, 3, 1, 2, 3],
          modulatedBy: [[4], [6], [6], [5], [], []],
        },
        {
          name: "1←(3 4)←5 2←6",
          carrierCount: 2,
          associatedCarrier: [1, 2, 2, 2, 2, 2],
          modulatedBy: [[3, 4], [6], [5], [5], [], []],
        },
        {
          name: "(1 2)←4 3←(5 6)",
          carrierCount: 3,
          associatedCarrier: [1, 2, 3, 1, 2, 3],
          modulatedBy: [[4], [4], [5, 6], [], [], []],
        },
        {
          name: "(1 2)←5 (3 4)←6",
          carrierCount: 4,
          associatedCarrier: [1, 2, 3, 4, 4, 4],
          modulatedBy: [[5], [5], [6], [6], [], []],
        },
        {
          name: "(1 2 3)←(4 5 6)",
          carrierCount: 3,
          associatedCarrier: [1, 2, 3, 1, 2, 3],
          modulatedBy: [[4, 5, 6], [4, 5, 6], [4, 5, 6], [], [], []],
        },
        {
          name: "1←5 (2 3 4)←6",
          carrierCount: 4,
          associatedCarrier: [1, 2, 3, 4, 4, 4],
          modulatedBy: [[5], [6], [6], [6], [], []],
        },
        {
          name: "1 2←5 (3 4)←6",
          carrierCount: 4,
          associatedCarrier: [1, 2, 3, 4, 4, 4],
          modulatedBy: [[], [5], [6], [6], [], []],
        },
        {
          name: "1 2 (3 4 5)←6",
          carrierCount: 5,
          associatedCarrier: [1, 2, 3, 4, 5, 5],
          modulatedBy: [[], [], [6], [6], [6], []],
        },
        {
          name: "1 2 3 (4 5)←6",
          carrierCount: 5,
          associatedCarrier: [1, 2, 3, 4, 5, 5],
          modulatedBy: [[], [], [], [6], [6], []],
        },
        {
          name: "1 2←4 3←(5 6)",
          carrierCount: 3,
          associatedCarrier: [1, 2, 3, 3, 3, 3],
          modulatedBy: [[], [4], [5, 6], [], [], []],
        },
        {
          name: "1←4 2←(5 6) 3",
          carrierCount: 3,
          associatedCarrier: [1, 2, 3, 3, 3, 3],
          modulatedBy: [[4], [5, 6], [], [], [], []],
        },
        {
          name: "1 2 3←5 4←6",
          carrierCount: 4,
          associatedCarrier: [1, 2, 3, 4, 4, 4],
          modulatedBy: [[], [], [5], [6], [], []],
        },
        {
          name: "1 (2 3)←5←6 4",
          carrierCount: 4,
          associatedCarrier: [1, 2, 3, 4, 4, 4],
          modulatedBy: [[], [5], [5], [], [6], []],
        },
        {
          name: "1 2 3←5←6 4",
          carrierCount: 4,
          associatedCarrier: [1, 2, 3, 4, 4, 4],
          modulatedBy: [[], [], [5, 6], [], [], []],
        },
        {
          name: "(1 2 3 4 5)←6",
          carrierCount: 5,
          associatedCarrier: [1, 2, 3, 4, 5, 5],
          modulatedBy: [[6], [6], [6], [6], [6], []],
        },
        {
          name: "1 2 3 4 5←6",
          carrierCount: 5,
          associatedCarrier: [1, 2, 3, 4, 5, 5],
          modulatedBy: [[], [], [], [], [6], []],
        },
        {
          name: "1 2 3 4 5 6",
          carrierCount: 6,
          associatedCarrier: [1, 2, 3, 4, 5, 6],
          modulatedBy: [[], [], [], [], [], []],
        },
        {
          name: "1←(2 (3 (4 (5 (6",
          carrierCount: 5,
          associatedCarrier: [1, 2, 3, 4, 5, 5],
          modulatedBy: [
            [2, 3, 4, 5, 6],
            [3, 4, 5, 6],
            [4, 5, 6],
            [5, 6],
            [6],
            [],
          ],
        },
        {
          name: "1←(2(3(4(5(6",
          carrierCount: 1,
          associatedCarrier: [1, 1, 1, 1, 1, 1],
          modulatedBy: [
            [2, 3, 4, 5, 6],
            [3, 4, 5, 6],
            [4, 5, 6],
            [5, 6],
            [6],
            [],
          ],
        },
        {
          name: "1←4(2←5(3←6",
          carrierCount: 3,
          associatedCarrier: [1, 2, 3, 1, 2, 3],
          modulatedBy: [[2, 3, 4], [3, 5], [6], [], [], []],
        },
        {
          name: "1←4(2←5 3←6",
          carrierCount: 3,
          associatedCarrier: [1, 2, 3, 1, 2, 3],
          modulatedBy: [[2, 3, 4], [5], [6], [], [], []],
        },
      ])),
      (h.operatorCarrierInterval = [0, 0.04, -0.073, 0.091, 0.061, 0.024]),
      (h.operatorAmplitudeMax = 15),
      (h.operatorFrequencies = g([
        { name: "0.12×", mult: 0.125, hzOffset: 0, amplitudeSign: 1 },
        { name: "0.25×", mult: 0.25, hzOffset: 0, amplitudeSign: 1 },
        { name: "0.5×", mult: 0.5, hzOffset: 0, amplitudeSign: 1 },
        { name: "0.75×", mult: 0.75, hzOffset: 0, amplitudeSign: 1 },
        { name: "1×", mult: 1, hzOffset: 0, amplitudeSign: 1 },
        { name: "~1×", mult: 1, hzOffset: 1.5, amplitudeSign: -1 },
        { name: "2×", mult: 2, hzOffset: 0, amplitudeSign: 1 },
        { name: "~2×", mult: 2, hzOffset: -1.3, amplitudeSign: -1 },
        { name: "3×", mult: 3, hzOffset: 0, amplitudeSign: 1 },
        { name: "3.5×", mult: 3.5, hzOffset: -0.05, amplitudeSign: 1 },
        { name: "4×", mult: 4, hzOffset: 0, amplitudeSign: 1 },
        { name: "~4×", mult: 4, hzOffset: -2.4, amplitudeSign: -1 },
        { name: "5×", mult: 5, hzOffset: 0, amplitudeSign: 1 },
        { name: "6×", mult: 6, hzOffset: 0, amplitudeSign: 1 },
        { name: "7×", mult: 7, hzOffset: 0, amplitudeSign: 1 },
        { name: "8×", mult: 8, hzOffset: 0, amplitudeSign: 1 },
        { name: "9×", mult: 9, hzOffset: 0, amplitudeSign: 1 },
        { name: "10×", mult: 10, hzOffset: 0, amplitudeSign: 1 },
        { name: "11×", mult: 11, hzOffset: 0, amplitudeSign: 1 },
        { name: "12×", mult: 12, hzOffset: 0, amplitudeSign: 1 },
        { name: "13×", mult: 13, hzOffset: 0, amplitudeSign: 1 },
        { name: "14×", mult: 14, hzOffset: 0, amplitudeSign: 1 },
        { name: "15×", mult: 15, hzOffset: 0, amplitudeSign: 1 },
        { name: "16×", mult: 16, hzOffset: 0, amplitudeSign: 1 },
        { name: "17×", mult: 17, hzOffset: 0, amplitudeSign: 1 },
        { name: "18×", mult: 18, hzOffset: 0, amplitudeSign: 1 },
        { name: "19×", mult: 19, hzOffset: 0, amplitudeSign: 1 },
        { name: "20×", mult: 20, hzOffset: 0, amplitudeSign: 1 },
        { name: "~20×", mult: 20, hzOffset: -5, amplitudeSign: -1 },
        { name: "25×", mult: 25, hzOffset: 0, amplitudeSign: 1 },
        { name: "50×", mult: 50, hzOffset: 0, amplitudeSign: 1 },
        { name: "75×", mult: 75, hzOffset: 0, amplitudeSign: 1 },
        { name: "100×", mult: 100, hzOffset: 0, amplitudeSign: 1 },
      ])),
      (h.envelopes = g([
        { name: "none", type: 1, speed: 0 },
        { name: "note size", type: 0, speed: 0 },
        { name: "punch", type: 2, speed: 0 },
        { name: "flare -1", type: 3, speed: 128 },
        { name: "flare 1", type: 3, speed: 32 },
        { name: "flare 2", type: 3, speed: 8 },
        { name: "flare 3", type: 3, speed: 2 },
        { name: "twang -1", type: 4, speed: 128 },
        { name: "twang 1", type: 4, speed: 32 },
        { name: "twang 2", type: 4, speed: 8 },
        { name: "twang 3", type: 4, speed: 2 },
        { name: "swell -1", type: 5, speed: 128 },
        { name: "swell 1", type: 5, speed: 32 },
        { name: "swell 2", type: 5, speed: 8 },
        { name: "swell 3", type: 5, speed: 2 },
        { name: "tremolo0", type: 6, speed: 8 },
        { name: "tremolo1", type: 6, speed: 4 },
        { name: "tremolo2", type: 6, speed: 2 },
        { name: "tremolo3", type: 6, speed: 1 },
        { name: "tremolo4", type: 7, speed: 4 },
        { name: "tremolo5", type: 7, speed: 2 },
        { name: "tremolo6", type: 7, speed: 1 },
        { name: "decay -1", type: 8, speed: 40 },
        { name: "decay 1", type: 8, speed: 10 },
        { name: "decay 2", type: 8, speed: 7 },
        { name: "decay 3", type: 8, speed: 4 },
        { name: "wibble-1", type: 9, speed: 96 },
        { name: "wibble 1", type: 9, speed: 24 },
        { name: "wibble 2", type: 9, speed: 12 },
        { name: "wibble 3", type: 9, speed: 4 },
        { name: "linear-2", type: 11, speed: 256 },
        { name: "linear-1", type: 11, speed: 128 },
        { name: "linear 1", type: 11, speed: 32 },
        { name: "linear 2", type: 11, speed: 8 },
        { name: "linear 3", type: 11, speed: 2 },
        { name: "rise -2", type: 12, speed: 256 },
        { name: "rise -1", type: 12, speed: 128 },
        { name: "rise 1", type: 12, speed: 32 },
        { name: "rise 2", type: 12, speed: 8 },
        { name: "rise 3", type: 12, speed: 2 },
        { name: "flute 1", type: 9, speed: 16 },
        { name: "flute 2", type: 9, speed: 8 },
        { name: "flute 3", type: 9, speed: 4 },
        { name: "tripolo1", type: 6, speed: 9 },
        { name: "tripolo2", type: 6, speed: 6 },
        { name: "tripolo3", type: 6, speed: 3 },
        { name: "tripolo4", type: 7, speed: 9 },
        { name: "tripolo5", type: 7, speed: 6 },
        { name: "tripolo6", type: 7, speed: 3 },
        { name: "pentolo1", type: 6, speed: 10 },
        { name: "pentolo2", type: 6, speed: 5 },
        { name: "pentolo3", type: 6, speed: 2.5 },
        { name: "pentolo4", type: 7, speed: 10 },
        { name: "pentolo5", type: 7, speed: 5 },
        { name: "pentolo6", type: 7, speed: 2.5 },
        { name: "flutter 1", type: 6, speed: 14 },
        { name: "flutter 2", type: 7, speed: 11 },
        { name: "water-y flutter", type: 6, speed: 9 },
      ])),
      (h.feedbacks = g([
        { name: "1⟲", indices: [[1], [], [], []] },
        { name: "2⟲", indices: [[], [2], [], []] },
        { name: "3⟲", indices: [[], [], [3], []] },
        { name: "4⟲", indices: [[], [], [], [4]] },
        { name: "1⟲ 2⟲", indices: [[1], [2], [], []] },
        { name: "3⟲ 4⟲", indices: [[], [], [3], [4]] },
        { name: "1⟲ 2⟲ 3⟲", indices: [[1], [2], [3], []] },
        { name: "2⟲ 3⟲ 4⟲", indices: [[], [2], [3], [4]] },
        { name: "1⟲ 2⟲ 3⟲ 4⟲", indices: [[1], [2], [3], [4]] },
        { name: "1→2", indices: [[], [1], [], []] },
        { name: "1→3", indices: [[], [], [1], []] },
        { name: "1→4", indices: [[], [], [], [1]] },
        { name: "2→3", indices: [[], [], [2], []] },
        { name: "2→4", indices: [[], [], [], [2]] },
        { name: "3→4", indices: [[], [], [], [3]] },
        { name: "1→3 2→4", indices: [[], [], [1], [2]] },
        { name: "1→4 2→3", indices: [[], [], [2], [1]] },
        { name: "1→2→3→4", indices: [[], [1], [2], [3]] },
        { name: "1↔2 3↔4", indices: [[2], [1], [4], [3]] },
        { name: "1↔4 2↔3", indices: [[4], [3], [2], [1]] },
        { name: "2→1→4→3→2", indices: [[2], [3], [4], [1]] },
        { name: "1→2→3→4→1", indices: [[4], [1], [2], [3]] },
        { name: "(1 2 3)→4", indices: [[], [], [], [1, 2, 3]] },
        {
          name: "ALL",
          indices: [
            [1, 2, 3, 4],
            [1, 2, 3, 4],
            [1, 2, 3, 4],
            [1, 2, 3, 4],
          ],
        },
      ])),
      (h.feedbacks6Op = g([
        { name: "Custom", indices: [[2, 3, 4, 5, 6], [], [], [], [], []] },
        { name: "1⟲", indices: [[1], [], [], [], [], []] },
        { name: "2⟲", indices: [[], [2], [], [], [], []] },
        { name: "3⟲", indices: [[], [], [3], [], [], []] },
        { name: "4⟲", indices: [[], [], [], [4], [], []] },
        { name: "4⟲", indices: [[], [], [], [], [5], []] },
        { name: "4⟲", indices: [[], [], [], [], [], [6]] },
        { name: "1⟲ 2⟲", indices: [[1], [2], [], [], [], []] },
        { name: "3⟲ 4⟲", indices: [[], [], [3], [4], [], []] },
        { name: "1⟲ 2⟲ 3⟲", indices: [[1], [2], [3], [], [], []] },
        { name: "2⟲ 3⟲ 4⟲", indices: [[], [2], [3], [4], [], []] },
        { name: "1⟲ 2⟲ 3⟲ 4⟲", indices: [[1], [2], [3], [4], [], []] },
        { name: "1⟲ 2⟲ 3⟲ 4⟲ 5⟲", indices: [[1], [2], [3], [4], [5], []] },
        { name: "1⟲ 2⟲ 3⟲ 4⟲ 5⟲ 6⟲", indices: [[1], [2], [3], [4], [5], [6]] },
        { name: "1→2", indices: [[], [1], [], [], [], []] },
        { name: "1→3", indices: [[], [], [1], [], [], []] },
        { name: "1→4", indices: [[], [], [], [1], [], []] },
        { name: "1→5", indices: [[], [], [], [], [1], []] },
        { name: "1→6", indices: [[], [], [], [], [], [1]] },
        { name: "2→3", indices: [[], [], [2], [], [], []] },
        { name: "2→4", indices: [[], [], [], [2], [], []] },
        { name: "3→4", indices: [[], [], [], [3], [], []] },
        { name: "4→5", indices: [[], [], [], [], [4], []] },
        { name: "1→4 2→5 3→6", indices: [[], [], [], [1], [2], [3]] },
        { name: "1→5 2→6 3→4", indices: [[], [], [], [3], [1], [2]] },
        { name: "1→2→3→4→5→6", indices: [[], [1], [2], [3], [4], [5]] },
        { name: "2→1→6→5→4→3→2", indices: [[2], [3], [4], [5], [6], [1]] },
        { name: "1→2→3→4→5→6→1", indices: [[6], [1], [2], [3], [4], [5]] },
        { name: "1↔2 3↔4 5↔6", indices: [[2], [1], [4], [3], [6], [5]] },
        { name: "1↔4 2↔5 3↔6", indices: [[4], [5], [6], [1], [2], [3]] },
        {
          name: "(1,2,3,4,5)→6",
          indices: [[], [], [], [], [], [1, 2, 3, 4, 5]],
        },
        {
          name: "ALL",
          indices: [
            [1, 2, 3, 4, 5, 6],
            [1, 2, 3, 4, 5, 6],
            [1, 2, 3, 4, 5, 6],
            [1, 2, 3, 4, 5, 6],
            [1, 2, 3, 4, 5, 6],
            [1, 2, 3, 4, 5, 6],
          ],
        },
      ])),
      (h.chipNoiseLength = 32768),
      (h.spectrumNoiseLength = 32768),
      (h.spectrumBasePitch = 24),
      (h.spectrumControlPoints = 30),
      (h.spectrumControlPointsPerOctave = 7),
      (h.spectrumControlPointBits = 3),
      (h.spectrumMax = (1 << h.spectrumControlPointBits) - 1),
      (h.harmonicsControlPoints = 28),
      (h.harmonicsRendered = 64),
      (h.harmonicsRenderedForPickedString = 256),
      (h.harmonicsControlPointBits = 3),
      (h.harmonicsMax = (1 << h.harmonicsControlPointBits) - 1),
      (h.harmonicsWavelength = 2048),
      (h.pulseWidthRange = 50),
      (h.pulseWidthStepPower = 0.5),
      (h.pitchChannelCountMin = 1),
      (h.pitchChannelCountMax = 60),
      (h.noiseChannelCountMin = 0),
      (h.noiseChannelCountMax = 32),
      (h.modChannelCountMin = 0),
      (h.modChannelCountMax = 24),
      (h.noiseInterval = 6),
      (h.pitchesPerOctave = 12),
      (h.drumCount = 12),
      (h.pitchOctaves = 8),
      (h.modCount = 6),
      (h.maxPitch = h.pitchOctaves * h.pitchesPerOctave),
      (h.maximumTonesPerChannel = 2 * h.maxChordSize),
      (h.justIntonationSemitones = [
        0.5,
        8 / 15,
        9 / 16,
        0.6,
        5 / 8,
        2 / 3,
        32 / 45,
        3 / 4,
        0.8,
        5 / 6,
        8 / 9,
        15 / 16,
        1,
        16 / 15,
        9 / 8,
        1.2,
        5 / 4,
        4 / 3,
        45 / 32,
        1.5,
        1.6,
        5 / 3,
        16 / 9,
        15 / 8,
        2,
      ].map((e) => Math.log2(e) * h.pitchesPerOctave)),
      (h.pitchShiftRange = h.justIntonationSemitones.length),
      (h.pitchShiftCenter = h.pitchShiftRange >> 1),
      (h.detuneCenter = 200),
      (h.detuneMax = 400),
      (h.detuneMin = 0),
      (h.songDetuneMin = 0),
      (h.songDetuneMax = 500),
      (h.sineWaveLength = 256),
      (h.sineWaveMask = h.sineWaveLength - 1),
      (h.sineWave = (function () {
        const e = new Float32Array(h.sineWaveLength + 1);
        for (let t = 0; t < h.sineWaveLength + 1; t++)
          e[t] = Math.sin((t * Math.PI * 2) / h.sineWaveLength);
        return e;
      })()),
      (h.pickedStringDispersionCenterFreq = 6e3),
      (h.pickedStringDispersionFreqScale = 0.3),
      (h.pickedStringDispersionFreqMult = 4),
      (h.pickedStringShelfHz = 4e3),
      (h.distortionRange = 8),
      (h.stringSustainRange = 15),
      (h.stringDecayRate = 0.12),
      (h.bitcrusherFreqRange = 14),
      (h.bitcrusherOctaveStep = 0.5),
      (h.bitcrusherQuantizationRange = 8),
      (h.maxEnvelopeCount = 12),
      (h.defaultAutomationRange = 13),
      (h.instrumentAutomationTargets = g([
        {
          name: "none",
          computeIndex: null,
          displayName: "none",
          interleave: !1,
          isFilter: !1,
          maxCount: 1,
          effect: null,
          compatibleInstruments: null,
        },
        {
          name: "noteVolume",
          computeIndex: 0,
          displayName: "note volume",
          interleave: !1,
          isFilter: !1,
          maxCount: 1,
          effect: null,
          compatibleInstruments: null,
        },
        {
          name: "pulseWidth",
          computeIndex: 2,
          displayName: "pulse width",
          interleave: !1,
          isFilter: !1,
          maxCount: 1,
          effect: null,
          compatibleInstruments: [6],
        },
        {
          name: "stringSustain",
          computeIndex: 3,
          displayName: "sustain",
          interleave: !1,
          isFilter: !1,
          maxCount: 1,
          effect: null,
          compatibleInstruments: [7],
        },
        {
          name: "unison",
          computeIndex: 4,
          displayName: "unison",
          interleave: !1,
          isFilter: !1,
          maxCount: 1,
          effect: null,
          compatibleInstruments: [0, 5, 7],
        },
        {
          name: "operatorFrequency",
          computeIndex: 5,
          displayName: "fm# freq",
          interleave: !0,
          isFilter: !1,
          maxCount: h.operatorCount + 2,
          effect: null,
          compatibleInstruments: [1, 10],
        },
        {
          name: "operatorAmplitude",
          computeIndex: 11,
          displayName: "fm# volume",
          interleave: !1,
          isFilter: !1,
          maxCount: h.operatorCount + 2,
          effect: null,
          compatibleInstruments: [1, 10],
        },
        {
          name: "feedbackAmplitude",
          computeIndex: 17,
          displayName: "fm feedback",
          interleave: !1,
          isFilter: !1,
          maxCount: 1,
          effect: null,
          compatibleInstruments: [1, 10],
        },
        {
          name: "pitchShift",
          computeIndex: 18,
          displayName: "pitch shift",
          interleave: !1,
          isFilter: !1,
          maxCount: 1,
          effect: 7,
          compatibleInstruments: null,
        },
        {
          name: "detune",
          computeIndex: 19,
          displayName: "detune",
          interleave: !1,
          isFilter: !1,
          maxCount: 1,
          effect: 8,
          compatibleInstruments: null,
        },
        {
          name: "vibratoDepth",
          computeIndex: 20,
          displayName: "vibrato range",
          interleave: !1,
          isFilter: !1,
          maxCount: 1,
          effect: 9,
          compatibleInstruments: null,
        },
        {
          name: "noteFilterAllFreqs",
          computeIndex: 1,
          displayName: "n. filter freqs",
          interleave: !1,
          isFilter: !0,
          maxCount: 1,
          effect: 5,
          compatibleInstruments: null,
        },
        {
          name: "noteFilterFreq",
          computeIndex: 21,
          displayName: "n. filter # freq",
          interleave: !1,
          isFilter: !0,
          maxCount: h.filterMaxPoints,
          effect: 5,
          compatibleInstruments: null,
        },
      ])),
      (h.operatorWaves = g([
        { name: "sine", samples: h.sineWave },
        {
          name: "triangle",
          samples: (function () {
            const e = new Float32Array(h.sineWaveLength + 1);
            for (let t = 0; t < h.sineWaveLength + 1; t++)
              e[t] =
                Math.asin(Math.sin((t * Math.PI * 2) / h.sineWaveLength)) /
                (Math.PI / 2);
            return e;
          })(),
        },
        { name: "pulse width", samples: d() },
        { name: "sawtooth", samples: y() },
        { name: "ramp", samples: y(!0) },
        {
          name: "trapezoid",
          samples: (function (e = 2) {
            const t = new Float32Array(h.sineWaveLength + 1);
            for (let s = 0; s < h.sineWaveLength + 1; s++)
              t[s] = Math.max(
                -1,
                Math.min(
                  1,
                  Math.asin(Math.sin((s * Math.PI * 2) / h.sineWaveLength)) * e
                )
              );
            return t;
          })(2),
        },
        {
          name: "rounded",
          samples: (function () {
            const e = new Float32Array(h.sineWaveLength + 1);
            for (let t = 0; t < h.sineWaveLength + 1; t++)
              e[t] = Math.round(Math.sin((t * Math.PI * 2) / h.sineWaveLength));
            return e;
          })(),
        },
      ])),
      (h.pwmOperatorWaves = g([
        { name: "1%", samples: d(0.01) },
        { name: "5%", samples: d(0.05) },
        { name: "12.5%", samples: d(0.125) },
        { name: "25%", samples: d(0.25) },
        { name: "33%", samples: d(1 / 3) },
        { name: "50%", samples: d(0.5) },
        { name: "66%", samples: d(2 / 3) },
        { name: "75%", samples: d(0.75) },
        { name: "87.5%", samples: d(0.875) },
        { name: "95%", samples: d(0.95) },
        { name: "99%", samples: d(0.99) },
      ])),
      (h.barEditorHeight = 10),
      (h.modulators = g([
        {
          name: "none",
          pianoName: "None",
          maxRawVol: 6,
          newNoteVol: 6,
          forSong: !0,
          convertRealFactor: 0,
          associatedEffect: 12,
          promptName: "No Mod Setting",
          promptDesc: [
            "No setting has been chosen yet, so this modulator will have no effect. Try choosing a setting with the dropdown, then click this '?' again for more info.",
            "[$LO - $HI]",
          ],
        },
        {
          name: "song volume",
          pianoName: "Volume",
          maxRawVol: 100,
          newNoteVol: 100,
          forSong: !0,
          convertRealFactor: 0,
          associatedEffect: 12,
          promptName: "Song Volume",
          promptDesc: [
            "This setting affects the overall volume of the song, just like the main volume slider.",
            "At $HI, the volume will be unchanged from default, and it will get gradually quieter down to $LO.",
            "[MULTIPLICATIVE] [$LO - $HI] [%]",
          ],
        },
        {
          name: "tempo",
          pianoName: "Tempo",
          maxRawVol: h.tempoMax - h.tempoMin,
          newNoteVol: Math.ceil((h.tempoMax - h.tempoMin) / 2),
          forSong: !0,
          convertRealFactor: h.tempoMin,
          associatedEffect: 12,
          promptName: "Song Tempo",
          promptDesc: [
            "This setting controls the speed your song plays at, just like the tempo slider.",
            "When you first make a note for this setting, it will default to your current tempo. Raising it speeds up the song, up to $HI BPM, and lowering it slows it down, to a minimum of $LO BPM.",
            "Note that you can make a 'swing' effect by rapidly changing between two tempo values.",
            "[OVERWRITING] [$LO - $HI] [BPM]",
          ],
        },
        {
          name: "song reverb",
          pianoName: "Reverb",
          maxRawVol: 2 * h.reverbRange,
          newNoteVol: h.reverbRange,
          forSong: !0,
          convertRealFactor: -h.reverbRange,
          associatedEffect: 12,
          promptName: "Song Reverb",
          promptDesc: [
            "This setting affects the overall reverb of your song. It works by multiplying existing reverb for instruments, so those with no reverb set will be unaffected.",
            "At $MID, all instruments' reverb will be unchanged from default. This increases up to double the reverb value at $HI, or down to no reverb at $LO.",
            "[MULTIPLICATIVE] [$LO - $HI]",
          ],
        },
        {
          name: "next bar",
          pianoName: "Next Bar",
          maxRawVol: 1,
          newNoteVol: 1,
          forSong: !0,
          convertRealFactor: 0,
          associatedEffect: 12,
          promptName: "Go To Next Bar",
          promptDesc: [
            "This setting functions a little different from most. Wherever a note is placed, the song will jump immediately to the next bar when it is encountered.",
            "This jump happens at the very start of the note, so the length of a next-bar note is irrelevant. Also, the note can be value 0 or 1, but the value is also irrelevant - wherever you place a note, the song will jump.",
            "You can make mixed-meter songs or intro sections by cutting off unneeded beats with a next-bar modulator.",
            "[$LO - $HI]",
          ],
        },
        {
          name: "note volume",
          pianoName: "Note Vol.",
          maxRawVol: h.volumeRange,
          newNoteVol: Math.ceil(h.volumeRange / 2),
          forSong: !1,
          convertRealFactor: Math.ceil(-h.volumeRange / 2),
          associatedEffect: 12,
          promptName: "Note Volume",
          promptDesc: [
            "This setting affects the volume of your instrument as if its note size had been scaled.",
            "At $MID, an instrument's volume will be unchanged from default. This means you can still use the volume sliders to mix the base volume of instruments. The volume gradually increases up to $HI, or decreases down to mute at $LO.",
            "This setting was the default for volume modulation in JummBox for a long time. Due to some new effects like distortion and bitcrush, note volume doesn't always allow fine volume control. Also, this modulator affects the value of FM modulator waves instead of just carriers. This can distort the sound which may be useful, but also may be undesirable. In those cases, use the 'mix volume' modulator instead, which will always just scale the volume with no added effects.",
            "For display purposes, this mod will show up on the instrument volume slider, as long as there is not also an active 'mix volume' modulator anyhow. However, as mentioned, it works more like changing note volume.",
            "[MULTIPLICATIVE] [$LO - $HI]",
          ],
        },
        {
          name: "pan",
          pianoName: "Pan",
          maxRawVol: h.panMax,
          newNoteVol: Math.ceil(h.panMax / 2),
          forSong: !1,
          convertRealFactor: 0,
          associatedEffect: 2,
          promptName: "Instrument Panning",
          promptDesc: [
            "This setting controls the panning of your instrument, just like the panning slider.",
            "At $LO, your instrument will sound like it is coming fully from the left-ear side. At $MID it will be right in the middle, and at $HI, it will sound like it's on the right.",
            "[OVERWRITING] [$LO - $HI] [L-R]",
          ],
        },
        {
          name: "reverb",
          pianoName: "Reverb",
          maxRawVol: h.reverbRange,
          newNoteVol: 0,
          forSong: !1,
          convertRealFactor: 0,
          associatedEffect: 0,
          promptName: "Instrument Reverb",
          promptDesc: [
            "This setting controls the reverb of your insturment, just like the reverb slider.",
            "At $LO, your instrument will have no reverb. At $HI, it will be at maximum.",
            "[OVERWRITING] [$LO - $HI]",
          ],
        },
        {
          name: "distortion",
          pianoName: "Distortion",
          maxRawVol: h.distortionRange - 1,
          newNoteVol: 0,
          forSong: !1,
          convertRealFactor: 0,
          associatedEffect: 3,
          promptName: "Instrument Distortion",
          promptDesc: [
            "This setting controls the amount of distortion for your instrument, just like the distortion slider.",
            "At $LO, your instrument will have no distortion. At $HI, it will be at maximum.",
            "[OVERWRITING] [$LO - $HI]",
          ],
        },
        {
          name: "fm slider 1",
          pianoName: "FM 1",
          maxRawVol: 15,
          newNoteVol: 15,
          forSong: !1,
          convertRealFactor: 0,
          associatedEffect: 12,
          promptName: "FM Slider 1",
          promptDesc: [
            "This setting affects the strength of the first FM slider, just like the corresponding slider on your instrument.",
            "It works in a multiplicative way, so at $HI your slider will sound the same is its default value, and at $LO it will sound like it has been moved all the way to the left.",
            "For the full range of control with this mod, move your underlying slider all the way to the right.",
            "[MULTIPLICATIVE] [$LO - $HI] [%]",
          ],
        },
        {
          name: "fm slider 2",
          pianoName: "FM 2",
          maxRawVol: 15,
          newNoteVol: 15,
          forSong: !1,
          convertRealFactor: 0,
          associatedEffect: 12,
          promptName: "FM Slider 2",
          promptDesc: [
            "This setting affects the strength of the second FM slider, just like the corresponding slider on your instrument.",
            "It works in a multiplicative way, so at $HI your slider will sound the same is its default value, and at $LO it will sound like it has been moved all the way to the left.",
            "For the full range of control with this mod, move your underlying slider all the way to the right.",
            "[MULTIPLICATIVE] [$LO - $HI] [%]",
          ],
        },
        {
          name: "fm slider 3",
          pianoName: "FM 3",
          maxRawVol: 15,
          newNoteVol: 15,
          forSong: !1,
          convertRealFactor: 0,
          associatedEffect: 12,
          promptName: "FM Slider 3",
          promptDesc: [
            "This setting affects the strength of the third FM slider, just like the corresponding slider on your instrument.",
            "It works in a multiplicative way, so at $HI your slider will sound the same is its default value, and at $LO it will sound like it has been moved all the way to the left.",
            "For the full range of control with this mod, move your underlying slider all the way to the right.",
            "[MULTIPLICATIVE] [$LO - $HI] [%]",
          ],
        },
        {
          name: "fm slider 4",
          pianoName: "FM 4",
          maxRawVol: 15,
          newNoteVol: 15,
          forSong: !1,
          convertRealFactor: 0,
          associatedEffect: 12,
          promptName: "FM Slider 4",
          promptDesc: [
            "This setting affects the strength of the fourth FM slider, just like the corresponding slider on your instrument.",
            "It works in a multiplicative way, so at $HI your slider will sound the same is its default value, and at $LO it will sound like it has been moved all the way to the left.",
            "For the full range of control with this mod, move your underlying slider all the way to the right.",
            "[MULTIPLICATIVE] [$LO - $HI] [%]",
          ],
        },
        {
          name: "fm feedback",
          pianoName: "FM Feedback",
          maxRawVol: 15,
          newNoteVol: 15,
          forSong: !1,
          convertRealFactor: 0,
          associatedEffect: 12,
          promptName: "FM Feedback",
          promptDesc: [
            "This setting affects the strength of the FM feedback slider, just like the corresponding slider on your instrument.",
            "It works in a multiplicative way, so at $HI your slider will sound the same is its default value, and at $LO it will sound like it has been moved all the way to the left.",
            "For the full range of control with this mod, move your underlying slider all the way to the right.",
            "[MULTIPLICATIVE] [$LO - $HI] [%]",
          ],
        },
        {
          name: "pulse width",
          pianoName: "Pulse Width",
          maxRawVol: h.pulseWidthRange,
          newNoteVol: h.pulseWidthRange,
          forSong: !1,
          convertRealFactor: 0,
          associatedEffect: 12,
          promptName: "Pulse Width",
          promptDesc: [
            "This setting controls the width of this instrument's pulse wave, just like the pulse width slider.",
            "At $HI, your instrument will sound like a pure square wave (on 50% of the time). It will gradually sound narrower down to $LO, where it will be inaudible (as it is on 0% of the time).",
            "Changing pulse width randomly between a few values is a common strategy in chiptune music to lend some personality to a lead instrument.",
            "[OVERWRITING] [$LO - $HI] [%Duty]",
          ],
        },
        {
          name: "detune",
          pianoName: "Detune",
          maxRawVol: h.detuneMax - h.detuneMin,
          newNoteVol: h.detuneCenter,
          forSong: !1,
          convertRealFactor: -h.detuneCenter,
          associatedEffect: 8,
          promptName: "Instrument Detune",
          promptDesc: [
            "This setting controls the detune for this instrument, just like the detune slider.",
            "At $MID, your instrument will have no detune applied. Each tick corresponds to one cent, or one-hundredth of a pitch. Thus, each change of 100 ticks corresponds to one half-step of detune, up to two half-steps up at $HI, or two half-steps down at $LO.",
            "[OVERWRITING] [$LO - $HI] [cents]",
          ],
        },
        {
          name: "vibrato depth",
          pianoName: "Vibrato Depth",
          maxRawVol: 50,
          newNoteVol: 0,
          forSong: !1,
          convertRealFactor: 0,
          associatedEffect: 9,
          promptName: "Vibrato Depth",
          promptDesc: [
            "This setting controls the amount that your pitch moves up and down by during vibrato, just like the vibrato depth slider.",
            "At $LO, your instrument will have no vibrato depth so its vibrato would be inaudible. This increases up to $HI, where an extreme pitch change will be noticeable.",
            "[OVERWRITING] [$LO - $HI] [pitch ÷25]",
          ],
        },
        {
          name: "song detune",
          pianoName: "Detune",
          maxRawVol: h.songDetuneMax - h.songDetuneMin,
          newNoteVol: Math.ceil((h.songDetuneMax - h.songDetuneMin) / 2),
          forSong: !0,
          convertRealFactor: -250,
          associatedEffect: 12,
          promptName: "Song Detune",
          promptDesc: [
            "This setting controls the overall detune of the entire song. There is no associated slider.",
            "At $MID, your song will have no extra detune applied and sound unchanged from default. Each tick corresponds to four cents, or four hundredths of a pitch. Thus, each change of 25 ticks corresponds to one half-step of detune, up to 10 half-steps up at $HI, or 10 half-steps down at $LO.",
            "[MULTIPLICATIVE] [$LO - $HI] [cents x4]",
          ],
        },
        {
          name: "vibrato speed",
          pianoName: "Vibrato Speed",
          maxRawVol: 30,
          newNoteVol: 0,
          forSong: !1,
          convertRealFactor: 0,
          associatedEffect: 9,
          promptName: "Vibrato Speed",
          promptDesc: [
            "This setting controls the speed your instrument will vibrato at, just like the slider.",
            "A setting of $LO means there will be no oscillation, and vibrato will be disabled. Higher settings will increase the speed, up to a dramatic trill at the max value, $HI.",
            "[OVERWRITING] [$LO - $HI]",
          ],
        },
        {
          name: "vibrato delay",
          pianoName: "Vibrato Delay",
          maxRawVol: 50,
          newNoteVol: 0,
          forSong: !1,
          convertRealFactor: 0,
          associatedEffect: 9,
          promptName: "Vibrato Delay",
          promptDesc: [
            "This setting controls the amount of time vibrato will be held off for before triggering for every new note, just like the slider.",
            "A setting of $LO means there will be no delay. A setting of 24 corresponds to one full beat of delay. As a sole exception to this scale, setting delay to $HI will completely disable vibrato (as if it had infinite delay).",
            "[OVERWRITING] [$LO - $HI] [beats ÷24]",
          ],
        },
        {
          name: "arp speed",
          pianoName: "Arp Speed",
          maxRawVol: 50,
          newNoteVol: 10,
          forSong: !1,
          convertRealFactor: 0,
          associatedEffect: 11,
          promptName: "Arpeggio Speed",
          promptDesc: [
            "This setting controls the speed at which your instrument's chords arpeggiate, just like the arpeggio speed slider.",
            "Each setting corresponds to a different speed, from the slowest to the fastest. The speeds are listed below.",
            "[0-4]: x0, x1/16, x⅛, x⅕, x¼,",
            "[5-9]: x⅓, x⅖, x½, x⅔, x¾,",
            "[10-14]: x⅘, x0.9, x1, x1.1, x1.2,",
            "[15-19]: x1.3, x1.4, x1.5, x1.6, x1.7,",
            "[20-24]: x1.8, x1.9, x2, x2.1, x2.2,",
            "[25-29]: x2.3, x2.4, x2.5, x2.6, x2.7,",
            "[30-34]: x2.8, x2.9, x3, x3.1, x3.2,",
            "[35-39]: x3.3, x3.4, x3.5, x3.6, x3.7,",
            "[40-44]: x3.8, x3.9, x4, x4.15, x4.3,",
            "[45-50]: x4.5, x4.8, x5, x5.5, x6, x8",
            "[OVERWRITING] [$LO - $HI]",
          ],
        },
        {
          name: "pan delay",
          pianoName: "Pan Delay",
          maxRawVol: 20,
          newNoteVol: 10,
          forSong: !1,
          convertRealFactor: 0,
          associatedEffect: 2,
          promptName: "Panning Delay",
          promptDesc: [
            "This setting controls the delay applied to panning for your instrument, just like the pan delay slider.",
            "With more delay, the panning effect will generally be more pronounced. $MID is the default value, whereas $LO will remove any delay at all. No delay can be desirable for chiptune songs.",
            "[OVERWRITING] [$LO - $HI]",
          ],
        },
        {
          name: "reset arp",
          pianoName: "Reset Arp",
          maxRawVol: 1,
          newNoteVol: 1,
          forSong: !1,
          convertRealFactor: 0,
          associatedEffect: 11,
          promptName: "Reset Arpeggio",
          promptDesc: [
            "This setting functions a little different from most. Wherever a note is placed, the arpeggio of this instrument will reset at the very start of that note. This is most noticeable with lower arpeggio speeds. The lengths and values of notes for this setting don't matter, just the note start times.",
            "This mod can be used to sync up your apreggios so that they always sound the same, even if you are using an odd-ratio arpeggio speed or modulating arpeggio speed.",
            "[$LO - $HI]",
          ],
        },
        {
          name: "eq filter",
          pianoName: "EQFlt",
          maxRawVol: 10,
          newNoteVol: 0,
          forSong: !1,
          convertRealFactor: 0,
          associatedEffect: 12,
          promptName: "EQ Filter",
          promptDesc: [
            "This setting controls a few separate things for your instrument's EQ filter.",
            "When the option 'morph' is selected, your modulator values will indicate a sub-filter index of your EQ filter to 'morph' to over time. For example, a change from 0 to 1 means your main filter (default) will morph to sub-filter 1 over the specified duration. You can shape the main filter and sub-filters in the large filter editor ('+' button). If your two filters' number, type, and order of filter dots all match up, the morph will happen smoothly and you'll be able to hear them changing. If they do not match up, the filters will simply jump between each other.",
            "Note that filters will morph based on endpoints in the pattern editor. So, if you specify a morph from sub-filter 1 to 4 but do not specifically drag in new endpoints for 2 and 3, it will morph directly between 1 and 4 without going through the others.",
            "If you target Dot X or Dot Y, you can finely tune the coordinates of a single dot for your filter. The number of available dots to choose is dependent on your main filter's dot count.",
            "[OVERWRITING] [$LO - $HI]",
          ],
        },
        {
          name: "note filter",
          pianoName: "N.Flt",
          maxRawVol: 10,
          newNoteVol: 0,
          forSong: !1,
          convertRealFactor: 0,
          associatedEffect: 5,
          promptName: "Note Filter",
          promptDesc: [
            "This setting controls a few separate things for your instrument's note filter.",
            "When the option 'morph' is selected, your modulator values will indicate a sub-filter index of your note filter to 'morph' to over time. For example, a change from 0 to 1 means your main filter (default) will morph to sub-filter 1 over the specified duration. You can shape the main filter and sub-filters in the large filter editor ('+' button). If your two filters' number, type, and order of filter dots all match up, the morph will happen smoothly and you'll be able to hear them changing. If they do not match up, the filters will simply jump between each other.",
            "Note that filters will morph based on endpoints in the pattern editor. So, if you specify a morph from sub-filter 1 to 4 but do not specifically drag in new endpoints for 2 and 3, it will morph directly between 1 and 4 without going through the others.",
            "If you target Dot X or Dot Y, you can finely tune the coordinates of a single dot for your filter. The number of available dots to choose is dependent on your main filter's dot count.",
            "[OVERWRITING] [$LO - $HI]",
          ],
        },
        {
          name: "bit crush",
          pianoName: "Bitcrush",
          maxRawVol: h.bitcrusherQuantizationRange - 1,
          newNoteVol: Math.round(h.bitcrusherQuantizationRange / 2),
          forSong: !1,
          convertRealFactor: 0,
          associatedEffect: 4,
          promptName: "Instrument Bit Crush",
          promptDesc: [
            "This setting controls the bit crush of your instrument, just like the bit crush slider.",
            "At a value of $LO, no bit crush will be applied. This increases and the bit crush effect gets more noticeable up to the max value, $HI.",
            "[OVERWRITING] [$LO - $HI]",
          ],
        },
        {
          name: "freq crush",
          pianoName: "Freq Crush",
          maxRawVol: h.bitcrusherFreqRange - 1,
          newNoteVol: Math.round(h.bitcrusherFreqRange / 2),
          forSong: !1,
          convertRealFactor: 0,
          associatedEffect: 4,
          promptName: "Instrument Frequency Crush",
          promptDesc: [
            "This setting controls the frequency crush of your instrument, just like the freq crush slider.",
            "At a value of $LO, no frequency crush will be applied. This increases and the frequency crush effect gets more noticeable up to the max value, $HI.",
            "[OVERWRITING] [$LO - $HI]",
          ],
        },
        {
          name: "echo",
          pianoName: "Echo",
          maxRawVol: h.echoSustainRange - 1,
          newNoteVol: 0,
          forSong: !1,
          convertRealFactor: 0,
          associatedEffect: 6,
          promptName: "Instrument Echo Sustain",
          promptDesc: [
            "This setting controls the echo sustain (echo loudness) of your instrument, just like the echo slider.",
            "At $LO, your instrument will have no echo sustain and echo will not be audible. Echo sustain increases and the echo effect gets more noticeable up to the max value, $HI.",
            "[OVERWRITING] [$LO - $HI]",
          ],
        },
        {
          name: "echo delay",
          pianoName: "Echo Delay",
          maxRawVol: h.echoDelayRange,
          newNoteVol: 0,
          forSong: !1,
          convertRealFactor: 0,
          associatedEffect: 12,
          promptName: "Instrument Echo Delay",
          promptDesc: [
            "This setting controls the echo delay of your instrument, just like the echo delay slider.",
            "At $LO, your instrument will have very little echo delay, and this increases up to 2 beats of delay at $HI.",
            "[OVERWRITING] [$LO - $HI] [~beats ÷12]",
          ],
        },
        {
          name: "chorus",
          pianoName: "Chorus",
          maxRawVol: h.chorusRange,
          newNoteVol: 0,
          forSong: !1,
          convertRealFactor: 0,
          associatedEffect: 1,
          promptName: "Instrument Chorus",
          promptDesc: [
            "This setting controls the chorus strength of your instrument, just like the chorus slider.",
            "At $LO, the chorus effect will be disabled. The strength of the chorus effect increases up to the max value, $HI.",
            "[OVERWRITING] [$LO - $HI]",
          ],
        },
        {
          name: "eq filt cut",
          pianoName: "EQFlt Cut",
          maxRawVol: h.filterSimpleCutRange - 1,
          newNoteVol: h.filterSimpleCutRange - 1,
          forSong: !1,
          convertRealFactor: 0,
          associatedEffect: 12,
          promptName: "EQ Filter Cutoff Frequency",
          promptDesc: [
            "This setting controls the filter cut position of your instrument, just like the filter cut slider.",
            "This setting is roughly analagous to the horizontal position of a single low-pass dot on the advanced filter editor. At lower values, a wider range of frequencies is cut off.",
            "[OVERWRITING] [$LO - $HI]",
          ],
        },
        {
          name: "eq filt peak",
          pianoName: "EQFlt Peak",
          maxRawVol: h.filterSimplePeakRange - 1,
          newNoteVol: 0,
          forSong: !1,
          convertRealFactor: 0,
          associatedEffect: 12,
          promptName: "EQ Filter Peak Gain",
          promptDesc: [
            "This setting controls the filter peak position of your instrument, just like the filter peak slider.",
            "This setting is roughly analagous to the vertical position of a single low-pass dot on the advanced filter editor. At lower values, the cutoff frequency will not be emphasized, and at higher values you will hear emphasis on the cutoff frequency.",
            "[OVERWRITING] [$LO - $HI]",
          ],
        },
        {
          name: "note filt cut",
          pianoName: "N.Flt Cut",
          maxRawVol: h.filterSimpleCutRange - 1,
          newNoteVol: h.filterSimpleCutRange - 1,
          forSong: !1,
          convertRealFactor: 0,
          associatedEffect: 5,
          promptName: "Note Filter Cutoff Frequency",
          promptDesc: [
            "This setting controls the filter cut position of your instrument, just like the filter cut slider.",
            "This setting is roughly analagous to the horizontal position of a single low-pass dot on the advanced filter editor. At lower values, a wider range of frequencies is cut off.",
            "[OVERWRITING] [$LO - $HI]",
          ],
        },
        {
          name: "note filt peak",
          pianoName: "N.Flt Peak",
          maxRawVol: h.filterSimplePeakRange - 1,
          newNoteVol: 0,
          forSong: !1,
          convertRealFactor: 0,
          associatedEffect: 5,
          promptName: "Note Filter Peak Gain",
          promptDesc: [
            "This setting controls the filter peak position of your instrument, just like the filter peak slider.",
            "This setting is roughly analagous to the vertical position of a single low-pass dot on the advanced filter editor. At lower values, the cutoff frequency will not be emphasized, and at higher values you will hear emphasis on the cutoff frequency.",
            "[OVERWRITING] [$LO - $HI]",
          ],
        },
        {
          name: "pitch shift",
          pianoName: "Pitch Shift",
          maxRawVol: h.pitchShiftRange - 1,
          newNoteVol: h.pitchShiftCenter,
          forSong: !1,
          convertRealFactor: -h.pitchShiftCenter,
          associatedEffect: 7,
          promptName: "Pitch Shift",
          promptDesc: [
            "This setting controls the pitch offset of your instrument, just like the pitch shift slider.",
            "At $MID your instrument will have no pitch shift. This increases as you decrease toward $LO pitches (half-steps) at the low end, or increases towards +$HI pitches at the high end.",
            "[OVERWRITING] [$LO - $HI] [pitch]",
          ],
        },
        {
          name: "sustain",
          pianoName: "Sustain",
          maxRawVol: h.stringSustainRange - 1,
          newNoteVol: 0,
          forSong: !1,
          convertRealFactor: 0,
          associatedEffect: 12,
          promptName: "Picked String Sustain",
          promptDesc: [
            "This setting controls the sustain of your picked string instrument, just like the sustain slider.",
            "At $LO, your instrument will have minimum sustain and sound 'plucky'. This increases to a more held sound as your modulator approaches the maximum, $HI.",
            "[OVERWRITING] [$LO - $HI]",
          ],
        },
        {
          name: "mix volume",
          pianoName: "Mix Vol.",
          maxRawVol: h.volumeRange,
          newNoteVol: Math.ceil(h.volumeRange / 2),
          forSong: !1,
          convertRealFactor: Math.ceil(-h.volumeRange / 2),
          associatedEffect: 12,
          promptName: "Mix Volume",
          promptDesc: [
            "This setting affects the volume of your instrument as if its volume slider had been moved.",
            "At $MID, an instrument's volume will be unchanged from default. This means you can still use the volume sliders to mix the base volume of instruments, since this setting and the default value work multiplicatively. The volume gradually increases up to $HI, or decreases down to mute at $LO.",
            "Unlike the 'note volume' setting, mix volume is very straightforward and simply affects the resultant instrument volume after all effects are applied.",
            "[MULTIPLICATIVE] [$LO - $HI]",
          ],
        },
        {
          name: "fm slider 5",
          pianoName: "FM 5",
          maxRawVol: 15,
          newNoteVol: 15,
          forSong: !1,
          convertRealFactor: 0,
          associatedEffect: 12,
          promptName: "FM Slider 5",
          promptDesc: [
            "This setting affects the strength of the fifth FM slider, just like the corresponding slider on your instrument.",
            "It works in a multiplicative way, so at $HI your slider will sound the same is its default value, and at $LO it will sound like it has been moved all the way to the left.",
            "For the full range of control with this mod, move your underlying slider all the way to the right.",
            "[MULTIPLICATIVE] [$LO - $HI] [%]",
          ],
        },
        {
          name: "fm slider 6",
          pianoName: "FM 6",
          maxRawVol: 15,
          newNoteVol: 15,
          forSong: !1,
          convertRealFactor: 0,
          associatedEffect: 12,
          promptName: "FM Slider 6",
          promptDesc: [
            "This setting affects the strength of the sixth FM slider, just like the corresponding slider on your instrument.",
            "It works in a multiplicative way, so at $HI your slider will sound the same is its default value, and at $LO it will sound like it has been moved all the way to the left.",
            "For the full range of control with this mod, move your underlying slider all the way to the right.",
            "[MULTIPLICATIVE] [$LO - $HI] [%]",
          ],
        },
      ])),
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|android|ipad|playbook|silk/i.test(
        navigator.userAgent
      );
    class O {
      static valueToPreset(e) {
        const t = e >> 6,
          s = 63 & e;
        return O.presetCategories[t].presets[s];
      }
      static midiProgramToPresetValue(e) {
        for (let t = 0; t < O.presetCategories.length; t++) {
          const s = O.presetCategories[t];
          for (let i = 0; i < s.presets.length; i++) {
            const n = s.presets[i];
            if (n.generalMidi && n.midiProgram == e) return (t << 6) + i;
          }
        }
        return null;
      }
      static nameToPresetValue(e) {
        for (let t = 0; t < O.presetCategories.length; t++) {
          const s = O.presetCategories[t];
          for (let i = 0; i < s.presets.length; i++) {
            if (s.presets[i].name == e) return (t << 6) + i;
          }
        }
        return null;
      }
      static instrumentToPreset(e) {
        var s;
        return null === (s = O.presetCategories[0].presets.dictionary) ||
          void 0 === s
          ? void 0
          : s[null == t ? void 0 : t[e]];
      }
    }
    function R(e, t) {
      for (let s = 0; s < e.length; s++) e[s] *= t;
    }
    function z(e) {
      if (
        !(function (e) {
          return !(!e || e & (e - 1));
        })(e)
      )
        throw new Error("FFT array length must be a power of 2.");
      return Math.round(Math.log(e) / Math.log(2));
    }
    function C(e, t) {
      const s = z(t);
      if (t < 4) throw new Error("FFT array length must be at least 4.");
      for (let i = s - 1; i >= 2; i--) {
        const s = 1 << i,
          n = s >> 1,
          a = s << 1,
          o = (2 * Math.PI) / a,
          r = Math.cos(o),
          l = Math.sin(o),
          h = 2 * r;
        for (let i = 0; i < t; i += a) {
          const t = i,
            a = t + n,
            o = t + s,
            c = o + n,
            u = o + s,
            p = e[t],
            f = e[o];
          (e[t] = p + f), (e[a] *= 2), (e[o] = p - f), (e[c] *= 2);
          let m = r,
            d = -l,
            y = 1,
            v = 0;
          for (let s = 1; s < n; s++) {
            const i = t + s,
              n = o - s,
              a = o + s,
              r = u - s,
              l = e[i],
              c = e[n],
              p = e[a],
              f = e[r],
              g = l - c,
              b = p + f;
            (e[i] = l + c),
              (e[n] = f - p),
              (e[a] = g * m - b * d),
              (e[r] = b * m + g * d);
            const S = h * m - y,
              M = h * d - v;
            (y = m), (v = d), (m = S), (d = M);
          }
        }
      }
      for (let s = 0; s < t; s += 4) {
        const t = s + 1,
          i = s + 2,
          n = s + 3,
          a = e[s],
          o = 2 * e[t],
          r = e[i],
          l = 2 * e[n],
          h = a + r,
          c = a - r;
        (e[s] = h + o), (e[t] = h - o), (e[i] = c + l), (e[n] = c - l);
      }
      !(function (e, t) {
        const s = z(t);
        if (s > 16)
          throw new Error("FFT array length must not be greater than 2^16.");
        const i = 16 - s;
        for (let s = 0; s < t; s++) {
          let t;
          if (
            ((t = ((43690 & s) >> 1) | ((21845 & s) << 1)),
            (t = ((52428 & t) >> 2) | ((13107 & t) << 2)),
            (t = ((61680 & t) >> 4) | ((3855 & t) << 4)),
            (t = ((t >> 8) | ((255 & t) << 8)) >> i),
            t > s)
          ) {
            let i = e[s];
            (e[s] = e[t]), (e[t] = i);
          }
        }
      })(e, t);
    }
    (O.version = "2.1.0"),
      (O.versionDisplayName = "UltraBox " + O.version),
      (O.releaseNotesURL = "./patch_notes.html"),
      (O.isOnMac =
        /^Mac/i.test(navigator.platform) ||
        /Mac OS X/i.test(navigator.userAgent) ||
        /^(iPhone|iPad|iPod)/i.test(navigator.platform) ||
        /(iPhone|iPad|iPod)/i.test(navigator.userAgent)),
      (O.ctrlSymbol = O.isOnMac ? "⌘" : "Ctrl+"),
      (O.ctrlName = O.isOnMac ? "command" : "control"),
      (O.presetCategories = g([
        {
          name: "Custom Instruments",
          presets: g([
            { name: t[0], customType: 0 },
            { name: t[1], customType: 1 },
            { name: t[2], customType: 2 },
            { name: t[3], customType: 3 },
            { name: t[4], customType: 4 },
            { name: t[5], customType: 5 },
            { name: t[6], customType: 6 },
            { name: t[7], customType: 7 },
            { name: t[8], customType: 8 },
            { name: t[10], customType: 10 },
          ]),
        },
        {
          name: "Retro Presets",
          presets: g([
            {
              name: "square wave",
              midiProgram: 80,
              settings: {
                type: "chip",
                eqFilter: [],
                effects: ["aliasing"],
                transition: "interrupt",
                fadeInSeconds: 0,
                fadeOutTicks: -1,
                chord: "arpeggio",
                wave: "square",
                unison: "none",
                envelopes: [],
              },
            },
            {
              name: "triangle wave",
              midiProgram: 71,
              settings: {
                type: "chip",
                eqFilter: [],
                effects: ["aliasing"],
                transition: "interrupt",
                fadeInSeconds: 0,
                fadeOutTicks: -1,
                chord: "arpeggio",
                wave: "triangle",
                unison: "none",
                envelopes: [],
              },
            },
            {
              name: "square lead",
              midiProgram: 80,
              generalMidi: !0,
              settings: {
                type: "chip",
                eqFilter: [
                  { type: "low-pass", cutoffHz: 8e3, linearGain: 0.3536 },
                ],
                effects: ["aliasing"],
                transition: "normal",
                fadeInSeconds: 0,
                fadeOutTicks: -3,
                chord: "simultaneous",
                wave: "square",
                unison: "hum",
                envelopes: [],
              },
            },
            {
              name: "sawtooth lead 1",
              midiProgram: 81,
              generalMidi: !0,
              settings: {
                type: "chip",
                eqFilter: [
                  { type: "low-pass", cutoffHz: 4e3, linearGain: 0.5 },
                ],
                effects: ["aliasing"],
                transition: "normal",
                fadeInSeconds: 0,
                fadeOutTicks: -3,
                chord: "simultaneous",
                wave: "sawtooth",
                unison: "shimmer",
                envelopes: [],
              },
            },
            {
              name: "sawtooth lead 2",
              midiProgram: 81,
              settings: {
                type: "chip",
                eqFilter: [
                  { type: "low-pass", cutoffHz: 6727.17, linearGain: 1 },
                ],
                effects: ["vibrato", "aliasing"],
                vibrato: "light",
                transition: "normal",
                fadeInSeconds: 0.0125,
                fadeOutTicks: 72,
                chord: "simultaneous",
                wave: "sawtooth",
                unison: "hum",
                envelopes: [],
              },
            },
            {
              name: "chip noise",
              midiProgram: 116,
              isNoise: !0,
              settings: {
                type: "noise",
                transition: "hard",
                effects: ["aliasing"],
                chord: "arpeggio",
                filterCutoffHz: 4e3,
                filterResonance: 0,
                filterEnvelope: "steady",
                wave: "retro",
              },
            },
            {
              name: "FM twang",
              midiProgram: 32,
              settings: {
                type: "FM",
                eqFilter: [],
                effects: [],
                transition: "normal",
                fadeInSeconds: 0,
                fadeOutTicks: -3,
                chord: "simultaneous",
                algorithm: "1←(2 3 4)",
                feedbackType: "1⟲",
                feedbackAmplitude: 0,
                operators: [
                  { frequency: "1×", amplitude: 15 },
                  { frequency: "1×", amplitude: 15 },
                  { frequency: "1×", amplitude: 0 },
                  { frequency: "1×", amplitude: 0 },
                ],
                envelopes: [
                  {
                    target: "operatorAmplitude",
                    envelope: "twang 2",
                    index: 1,
                  },
                ],
              },
            },
            {
              name: "FM bass",
              midiProgram: 36,
              settings: {
                type: "FM",
                eqFilter: [],
                effects: [],
                transition: "normal",
                fadeInSeconds: 0,
                fadeOutTicks: -3,
                chord: "custom interval",
                algorithm: "1←(2 3←4)",
                feedbackType: "1⟲",
                feedbackAmplitude: 0,
                operators: [
                  { frequency: "2×", amplitude: 11 },
                  { frequency: "1×", amplitude: 7 },
                  { frequency: "1×", amplitude: 9 },
                  { frequency: "20×", amplitude: 3 },
                ],
                envelopes: [
                  {
                    target: "operatorAmplitude",
                    envelope: "twang 2",
                    index: 1,
                  },
                  {
                    target: "operatorAmplitude",
                    envelope: "twang 3",
                    index: 2,
                  },
                  {
                    target: "operatorAmplitude",
                    envelope: "twang 2",
                    index: 3,
                  },
                ],
              },
            },
            {
              name: "FM flute",
              midiProgram: 73,
              settings: {
                type: "FM",
                eqFilter: [],
                effects: [],
                transition: "normal",
                fadeInSeconds: 0.0263,
                fadeOutTicks: -3,
                chord: "simultaneous",
                algorithm: "1←(2 3 4)",
                feedbackType: "1⟲",
                feedbackAmplitude: 0,
                operators: [
                  { frequency: "1×", amplitude: 15 },
                  { frequency: "1×", amplitude: 6 },
                  { frequency: "1×", amplitude: 0 },
                  { frequency: "1×", amplitude: 0 },
                ],
                envelopes: [
                  {
                    target: "operatorAmplitude",
                    envelope: "twang 2",
                    index: 1,
                  },
                ],
              },
            },
            {
              name: "FM organ",
              midiProgram: 16,
              settings: {
                type: "FM",
                eqFilter: [],
                effects: ["vibrato"],
                vibrato: "delayed",
                transition: "normal",
                fadeInSeconds: 0.0263,
                fadeOutTicks: -3,
                chord: "custom interval",
                algorithm: "1←3 2←4",
                feedbackType: "1⟲ 2⟲",
                feedbackAmplitude: 0,
                operators: [
                  { frequency: "1×", amplitude: 14 },
                  { frequency: "2×", amplitude: 14 },
                  { frequency: "1×", amplitude: 11 },
                  { frequency: "2×", amplitude: 11 },
                ],
                envelopes: [],
              },
            },
            {
              name: "NES Pulse",
              midiProgram: 80,
              settings: {
                type: "custom chip",
                effects: ["aliasing"],
                transition: "normal",
                fadeInSeconds: 0,
                fadeOutTicks: -3,
                chord: "arpeggio",
                eqFilter: [
                  { type: "low-pass", cutoffHz: 8e3, linearGain: 0.5 },
                ],
                unison: "none",
                vibrato: "none",
                envelopes: [],
                customChipWave: [
                  -24, -24, -24, -24, -23, -23, -23, -23, -22, -22, -22, -22,
                  -21, -21, -21, -21, -20, -20, -20, -20, -19, -19, -19, -19,
                  -18, -18, -18, -18, -17, -17, -17, -17, 24, 24, 24, 24, 23,
                  23, 23, 23, 22, 22, 22, 22, 21, 21, 21, 21, 20, 20, 20, 20,
                  19, 19, 19, 19, 18, 18, 18, 18, 17, 17, 17, 17,
                ],
              },
            },
            {
              name: "Gameboy Pulse",
              midiProgram: 80,
              settings: {
                type: "custom chip",
                effects: ["aliasing"],
                transition: "normal",
                fadeInSeconds: 0,
                fadeOutTicks: -3,
                chord: "arpeggio",
                eqFilter: [
                  { type: "low-pass", cutoffHz: 8e3, linearGain: 0.5 },
                ],
                unison: "none",
                envelopes: [],
                customChipWave: [
                  -24, -20, -17, -15, -13, -13, -11, -11, -11, -9, -9, -9, -9,
                  -7, -7, -7, -7, -7, -5, -5, -5, -5, -5, -5, -3, -3, -3, -3,
                  -3, -3, -3, -3, 24, 20, 17, 15, 13, 13, 11, 11, 11, 9, 9, 9,
                  9, 7, 7, 7, 7, 7, 5, 5, 5, 5, 5, 5, 3, 3, 3, 3, 3, 3, 3, 3,
                ],
              },
            },
            {
              name: "VRC6 Sawtooth",
              midiProgram: 81,
              settings: {
                type: "custom chip",
                effects: ["aliasing"],
                transition: "normal",
                fadeInSeconds: 0,
                fadeOutTicks: -3,
                chord: "arpeggio",
                eqFilter: [
                  { type: "low-pass", cutoffHz: 8e3, linearGain: 0.5 },
                ],
                unison: "none",
                envelopes: [],
                customChipWave: [
                  -24, -20, -16, -13, -10, -8, -6, -5, -4, -4, 0, 0, 0, 0, 4, 4,
                  4, 4, 4, 4, 8, 8, 8, 8, 8, 8, 8, 8, 12, 12, 12, 12, 12, 12,
                  12, 12, 16, 16, 16, 16, 16, 16, 16, 16, 20, 20, 20, 20, 20,
                  20, 20, 20, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
                ],
              },
            },
            {
              name: "Atari Square",
              midiProgram: 80,
              settings: {
                type: "custom chip",
                effects: ["aliasing"],
                transition: "normal",
                fadeInSeconds: 0,
                fadeOutTicks: -3,
                chord: "arpeggio",
                eqFilter: [
                  { type: "low-pass", cutoffHz: 4e3, linearGain: 0.5 },
                ],
                unison: "none",
                envelopes: [],
                customChipWave: [
                  -24, -24, -24, -23, -23, -23, -22, -22, -22, -21, -21, -21,
                  -20, -20, -20, -19, -19, -19, -18, -18, -18, -17, -17, -17,
                  -16, -16, -16, -15, -15, -15, -14, -14, -14, -13, -13, -13,
                  24, 24, 24, 23, 23, 23, 22, 22, 22, 21, 21, 21, 20, 20, 20,
                  19, 19, 19, 18, 18, 18, 17, 17, 17, 16, 16, 15, 15,
                ],
              },
            },
            {
              name: "Atari Bass",
              midiProgram: 36,
              settings: {
                type: "custom chip",
                effects: ["aliasing"],
                transition: "interrupt",
                fadeInSeconds: 0,
                fadeOutTicks: -3,
                chord: "arpeggio",
                eqFilter: [
                  { type: "low-pass", cutoffHz: 4e3, linearGain: 0.5 },
                ],
                unison: "none",
                envelopes: [],
                customChipWave: [
                  -24, -24, -24, -24, -24, -24, -24, -24, -24, 24, 24, 24, 24,
                  24, 24, -24, -24, -24, 24, 24, 24, -24, -24, -24, 24, 24, 24,
                  -24, -24, -24, 24, 24, -24, -24, -24, -24, -24, -24, -24, -24,
                  -24, 24, 24, 24, 24, 24, 24, -24, -24, 24, 24, 24, 24, 24,
                  -24, -24, -24, -24, 24, 24, -24, -24, 24, 24,
                ],
              },
            },
            {
              name: "Sunsoft Bass",
              midiProgram: 36,
              settings: {
                type: "custom chip",
                effects: ["aliasing"],
                transition: "normal",
                fadeInSeconds: 0,
                fadeOutTicks: -3,
                chord: "arpeggio",
                eqFilter: [
                  { type: "low-pass", cutoffHz: 4e3, linearGain: 0.5 },
                ],
                unison: "none",
                envelopes: [],
                customChipWave: [
                  24, 24, 15, 15, 9, 9, -4, -4, 0, 0, -13, -13, -19, -19, -24,
                  -24, -24, -24, -10, -10, 0, 0, -7, -7, -7, -7, 0, 0, 6, 6, -4,
                  -4, 3, 3, -4, -4, 3, 3, 3, 3, 9, 9, 15, 15, 15, 15, 6, 6, -4,
                  -4, -4, -4, -4, -4, -4, -4, -4, -4, 3, 3, 12, 12, 24, 24,
                ],
              },
            },
            {
              name: "FM sine",
              midiProgram: 55,
              settings: {
                type: "FM",
                transition: "seemless",
                effects: "none",
                chord: "harmony",
                filterCutoffHz: 8e3,
                filterResonance: 0,
                filterEnvelope: "steady",
                vibrato: "none",
                algorithm: "1←(2 3 4)",
                feedbackType: "1⟲",
                feedbackAmplitude: 0,
                feedbackEnvelope: "steady",
                operators: [
                  { frequency: "1×", amplitude: 15, envelope: "steady" },
                  { frequency: "1×", amplitude: 0, envelope: "steady" },
                  { frequency: "1×", amplitude: 0, envelope: "steady" },
                  { frequency: "1×", amplitude: 0, envelope: "steady" },
                ],
              },
            },
          ]),
        },
        {
          name: "Keyboard Presets",
          presets: g([
            {
              name: "grand piano 1",
              midiProgram: 0,
              generalMidi: !0,
              settings: {
                type: "Picked String",
                eqFilter: [
                  { type: "high-pass", cutoffHz: 148.65, linearGain: 0.7071 },
                  { type: "peak", cutoffHz: 2e3, linearGain: 2.8284 },
                ],
                effects: ["note filter", "reverb"],
                noteFilter: [
                  { type: "low-pass", cutoffHz: 8e3, linearGain: 0.125 },
                ],
                reverb: 67,
                transition: "normal",
                fadeInSeconds: 0,
                fadeOutTicks: 48,
                chord: "simultaneous",
                harmonics: [
                  100, 100, 86, 86, 86, 71, 71, 71, 0, 86, 71, 71, 71, 57, 57,
                  71, 57, 14, 57, 57, 57, 57, 57, 57, 57, 57, 29, 57,
                ],
                unison: "piano",
                stringSustain: 79,
                envelopes: [
                  { target: "noteFilterAllFreqs", envelope: "note size" },
                ],
              },
            },
            {
              name: "bright piano",
              midiProgram: 1,
              generalMidi: !0,
              settings: {
                type: "Picked String",
                eqFilter: [
                  { type: "low-pass", cutoffHz: 1681.79, linearGain: 0.7071 },
                  { type: "high-pass", cutoffHz: 148.65, linearGain: 0.5 },
                  { type: "peak", cutoffHz: 3363.59, linearGain: 1.4142 },
                ],
                effects: ["reverb"],
                reverb: 33,
                transition: "normal",
                fadeInSeconds: 0,
                fadeOutTicks: 24,
                chord: "simultaneous",
                harmonics: [
                  100, 100, 86, 86, 71, 71, 0, 71, 71, 71, 71, 71, 71, 14, 57,
                  57, 57, 57, 57, 57, 29, 57, 57, 57, 57, 57, 57, 57,
                ],
                unison: "piano",
                stringSustain: 86,
                envelopes: [],
              },
            },
            {
              name: "electric grand",
              midiProgram: 2,
              generalMidi: !0,
              settings: {
                type: "chip",
                eqFilter: [],
                effects: ["note filter"],
                noteFilter: [
                  { type: "low-pass", cutoffHz: 2378.41, linearGain: 0.5 },
                ],
                transition: "normal",
                fadeInSeconds: 0,
                fadeOutTicks: 48,
                chord: "simultaneous",
                wave: "1/8 pulse",
                unison: "shimmer",
                envelopes: [
                  { target: "noteFilterAllFreqs", envelope: "twang 3" },
                ],
              },
            },
            {
              name: "honky-tonk piano",
              midiProgram: 3,
              generalMidi: !0,
              settings: {
                type: "Picked String",
                eqFilter: [
                  { type: "low-pass", cutoffHz: 5656.85, linearGain: 0.3536 },
                ],
                effects: ["reverb"],
                reverb: 33,
                transition: "normal",
                fadeInSeconds: 0,
                fadeOutTicks: 48,
                chord: "simultaneous",
                harmonics: [
                  100, 100, 86, 71, 86, 71, 43, 71, 43, 43, 57, 57, 57, 29, 57,
                  57, 57, 57, 57, 57, 43, 57, 57, 57, 43, 43, 43, 43,
                ],
                unison: "honky tonk",
                stringSustain: 71,
                envelopes: [],
              },
            },
            {
              name: "electric piano 1",
              midiProgram: 4,
              generalMidi: !0,
              settings: {
                type: "harmonics",
                eqFilter: [],
                effects: ["note filter"],
                noteFilter: [
                  { type: "low-pass", cutoffHz: 3363.59, linearGain: 0.5 },
                ],
                transition: "normal",
                fadeInSeconds: 0,
                fadeOutTicks: -3,
                chord: "simultaneous",
                harmonics: [
                  86, 100, 100, 71, 71, 57, 57, 43, 43, 43, 29, 29, 29, 14, 14,
                  14, 0, 0, 0, 0, 0, 57, 0, 0, 0, 0, 0, 0,
                ],
                unison: "none",
                envelopes: [
                  { target: "noteFilterAllFreqs", envelope: "twang 2" },
                ],
              },
            },
            {
              name: "electric piano 2",
              midiProgram: 5,
              generalMidi: !0,
              settings: {
                type: "FM",
                eqFilter: [],
                effects: ["note filter"],
                noteFilter: [
                  { type: "low-pass", cutoffHz: 13454.34, linearGain: 0.25 },
                ],
                transition: "normal",
                fadeInSeconds: 0,
                fadeOutTicks: 48,
                chord: "simultaneous",
                algorithm: "1←3 2←4",
                feedbackType: "1⟲ 2⟲",
                feedbackAmplitude: 0,
                operators: [
                  { frequency: "1×", amplitude: 12 },
                  { frequency: "1×", amplitude: 6 },
                  { frequency: "1×", amplitude: 9 },
                  { frequency: "16×", amplitude: 6 },
                ],
                envelopes: [
                  { target: "noteFilterAllFreqs", envelope: "twang 3" },
                  {
                    target: "operatorAmplitude",
                    envelope: "twang 3",
                    index: 3,
                  },
                ],
              },
            },
            {
              name: "harpsichord",
              midiProgram: 6,
              generalMidi: !0,
              settings: {
                type: "Picked String",
                eqFilter: [
                  { type: "high-pass", cutoffHz: 250, linearGain: 0.3536 },
                  { type: "peak", cutoffHz: 11313.71, linearGain: 2.8284 },
                ],
                effects: ["reverb"],
                reverb: 33,
                transition: "normal",
                fadeInSeconds: 0,
                fadeOutTicks: 24,
                chord: "simultaneous",
                harmonics: [
                  100, 100, 100, 86, 57, 86, 86, 86, 86, 57, 57, 71, 71, 86, 86,
                  71, 71, 86, 86, 71, 71, 71, 71, 71, 71, 71, 71, 71,
                ],
                unison: "none",
                stringSustain: 79,
                envelopes: [],
              },
            },
            {
              name: "clavinet",
              midiProgram: 7,
              generalMidi: !0,
              settings: {
                type: "FM",
                eqFilter: [],
                effects: ["note filter"],
                noteFilter: [
                  { type: "low-pass", cutoffHz: 19027.31, linearGain: 0.3536 },
                ],
                transition: "normal",
                fadeInSeconds: 0,
                fadeOutTicks: -3,
                chord: "simultaneous",
                algorithm: "1←(2 3 4)",
                feedbackType: "3⟲",
                feedbackAmplitude: 6,
                operators: [
                  { frequency: "3×", amplitude: 15 },
                  { frequency: "~1×", amplitude: 6 },
                  { frequency: "8×", amplitude: 4 },
                  { frequency: "1×", amplitude: 0 },
                ],
                envelopes: [
                  { target: "noteFilterAllFreqs", envelope: "twang 2" },
                  { target: "feedbackAmplitude", envelope: "twang 2" },
                ],
              },
            },
            {
              name: "dulcimer",
              midiProgram: 15,
              generalMidi: !0,
              settings: {
                type: "Picked String",
                eqFilter: [
                  { type: "low-pass", cutoffHz: 8e3, linearGain: 0.3536 },
                ],
                effects: ["reverb"],
                reverb: 33,
                transition: "normal",
                fadeInSeconds: 0,
                fadeOutTicks: 48,
                chord: "strum",
                harmonics: [
                  100, 100, 100, 86, 100, 86, 57, 100, 100, 86, 100, 86, 100,
                  86, 100, 71, 57, 71, 71, 100, 86, 71, 86, 86, 100, 86, 86, 86,
                ],
                unison: "piano",
                stringSustain: 79,
                envelopes: [],
              },
            },
            {
              name: "grand piano 2",
              midiProgram: 0,
              generalMidi: !0,
              settings: {
                type: "harmonics",
                eqFilter: [
                  { type: "high-pass", cutoffHz: 148.65, linearGain: 0.7071 },
                  { type: "peak", cutoffHz: 2e3, linearGain: 2.8284 },
                ],
                effects: ["note filter", "reverb"],
                noteFilter: [
                  { type: "low-pass", cutoffHz: 8e3, linearGain: 0.125 },
                ],
                reverb: 67,
                transition: "normal",
                fadeInSeconds: 0,
                fadeOutTicks: 48,
                chord: "simultaneous",
                harmonics: [
                  100, 86, 86, 86, 86, 71, 71, 57, 0, 57, 29, 43, 57, 57, 57,
                  43, 43, 0, 29, 43, 43, 43, 43, 43, 43, 29, 0, 29,
                ],
                unison: "piano",
                stringSustain: 79,
                envelopes: [
                  { target: "noteFilterAllFreqs", envelope: "note size" },
                ],
              },
            },
          ]),
        },
        {
          name: "Idiophone Presets",
          presets: g([
            {
              name: "celesta",
              midiProgram: 8,
              generalMidi: !0,
              settings: {
                type: "FM",
                effects: "reverb",
                transition: "hard fade",
                chord: "strum",
                filterCutoffHz: 5657,
                filterResonance: 14,
                filterEnvelope: "twang 2",
                vibrato: "none",
                algorithm: "(1 2)←(3 4)",
                feedbackType: "1⟲ 2⟲",
                feedbackAmplitude: 0,
                feedbackEnvelope: "steady",
                operators: [
                  { frequency: "~1×", amplitude: 11, envelope: "custom" },
                  { frequency: "8×", amplitude: 6, envelope: "custom" },
                  { frequency: "20×", amplitude: 3, envelope: "twang 1" },
                  { frequency: "3×", amplitude: 1, envelope: "twang 2" },
                ],
              },
            },
            {
              name: "glockenspiel",
              midiProgram: 9,
              generalMidi: !0,
              settings: {
                type: "FM",
                effects: "reverb",
                transition: "hard fade",
                chord: "strum",
                filterCutoffHz: 5657,
                filterResonance: 14,
                filterEnvelope: "twang 2",
                vibrato: "none",
                algorithm: "(1 2 3)←4",
                feedbackType: "1⟲ 2⟲ 3⟲",
                feedbackAmplitude: 2,
                feedbackEnvelope: "decay 1",
                operators: [
                  { frequency: "1×", amplitude: 7, envelope: "custom" },
                  { frequency: "5×", amplitude: 11, envelope: "custom" },
                  { frequency: "8×", amplitude: 7, envelope: "custom" },
                  { frequency: "20×", amplitude: 2, envelope: "twang 1" },
                ],
              },
            },
            {
              name: "music box 1",
              midiProgram: 10,
              generalMidi: !0,
              settings: {
                type: "Picked String",
                eqFilter: [
                  { type: "low-pass", cutoffHz: 4756.83, linearGain: 0.5 },
                ],
                effects: ["reverb"],
                reverb: 33,
                transition: "normal",
                fadeInSeconds: 0,
                fadeOutTicks: 48,
                chord: "strum",
                harmonics: [
                  100, 0, 0, 100, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 0,
                  86, 0, 0, 0, 0, 0, 0, 71, 0,
                ],
                unison: "none",
                stringSustain: 64,
                envelopes: [],
              },
            },
            {
              name: "music box 2",
              midiProgram: 10,
              settings: {
                type: "Picked String",
                eqFilter: [
                  { type: "low-pass", cutoffHz: 2828.43, linearGain: 0.7071 },
                ],
                effects: ["reverb"],
                reverb: 33,
                transition: "normal",
                fadeInSeconds: 0,
                fadeOutTicks: 48,
                chord: "strum",
                harmonics: [
                  100, 57, 57, 0, 0, 0, 0, 0, 0, 57, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                  43, 0, 0, 0, 0, 0, 0, 0, 0,
                ],
                unison: "none",
                stringSustain: 29,
                envelopes: [],
              },
            },
            {
              name: "vibraphone",
              midiProgram: 11,
              generalMidi: !0,
              settings: {
                type: "FM",
                effects: "reverb",
                transition: "hard fade",
                chord: "harmony",
                filterCutoffHz: 2828,
                filterResonance: 14,
                filterEnvelope: "twang 2",
                vibrato: "none",
                algorithm: "1 2 3 4",
                feedbackType: "1→2→3→4",
                feedbackAmplitude: 3,
                feedbackEnvelope: "twang 1",
                operators: [
                  { frequency: "1×", amplitude: 9, envelope: "custom" },
                  { frequency: "~1×", amplitude: 9, envelope: "custom" },
                  { frequency: "9×", amplitude: 3, envelope: "custom" },
                  { frequency: "4×", amplitude: 9, envelope: "custom" },
                ],
              },
            },
            {
              name: "marimba",
              midiProgram: 12,
              generalMidi: !0,
              settings: {
                type: "FM",
                effects: "reverb",
                transition: "hard fade",
                chord: "strum",
                filterCutoffHz: 2e3,
                filterResonance: 29,
                filterEnvelope: "decay 1",
                vibrato: "none",
                algorithm: "1 2←(3 4)",
                feedbackType: "1⟲",
                feedbackAmplitude: 0,
                feedbackEnvelope: "steady",
                operators: [
                  { frequency: "1×", amplitude: 10, envelope: "custom" },
                  { frequency: "4×", amplitude: 6, envelope: "custom" },
                  { frequency: "13×", amplitude: 6, envelope: "twang 1" },
                  { frequency: "1×", amplitude: 0, envelope: "steady" },
                ],
              },
            },
            {
              name: "kalimba",
              midiProgram: 108,
              generalMidi: !0,
              settings: {
                type: "FM",
                effects: "reverb",
                transition: "hard fade",
                chord: "strum",
                filterCutoffHz: 2828,
                filterResonance: 14,
                filterEnvelope: "decay 1",
                vibrato: "none",
                algorithm: "1←(2 3 4)",
                feedbackType: "1⟲",
                feedbackAmplitude: 0,
                feedbackEnvelope: "steady",
                operators: [
                  { frequency: "1×", amplitude: 11, envelope: "custom" },
                  { frequency: "5×", amplitude: 3, envelope: "twang 2" },
                  { frequency: "20×", amplitude: 3, envelope: "twang 1" },
                  { frequency: "1×", amplitude: 0, envelope: "steady" },
                ],
              },
            },
            {
              name: "xylophone",
              midiProgram: 13,
              generalMidi: !0,
              settings: {
                type: "FM",
                effects: "reverb",
                transition: "hard",
                chord: "strum",
                filterCutoffHz: 2e3,
                filterResonance: 14,
                filterEnvelope: "twang 1",
                vibrato: "none",
                algorithm: "(1 2 3)←4",
                feedbackType: "1⟲ 2⟲ 3⟲",
                feedbackAmplitude: 0,
                feedbackEnvelope: "steady",
                operators: [
                  { frequency: "1×", amplitude: 9, envelope: "custom" },
                  { frequency: "6×", amplitude: 9, envelope: "custom" },
                  { frequency: "11×", amplitude: 9, envelope: "custom" },
                  { frequency: "20×", amplitude: 6, envelope: "twang 1" },
                ],
              },
            },
            {
              name: "tubular bell",
              midiProgram: 14,
              generalMidi: !0,
              midiSubharmonicOctaves: 1,
              settings: {
                type: "Picked String",
                eqFilter: [
                  { type: "low-pass", cutoffHz: 4e3, linearGain: 0.5 },
                  { type: "high-pass", cutoffHz: 105.11, linearGain: 0.3536 },
                ],
                effects: ["reverb"],
                reverb: 33,
                transition: "normal",
                fadeInSeconds: 0,
                fadeOutTicks: 96,
                chord: "strum",
                harmonics: [
                  43, 71, 0, 100, 0, 100, 0, 86, 0, 0, 86, 0, 14, 71, 14, 14,
                  57, 14, 14, 43, 14, 14, 43, 14, 14, 43, 14, 14,
                ],
                unison: "shimmer",
                stringSustain: 86,
                envelopes: [],
              },
            },
            {
              name: "bell synth",
              midiProgram: 14,
              settings: {
                type: "FM",
                effects: "reverb",
                transition: "hard fade",
                chord: "strum",
                filterCutoffHz: 2e3,
                filterResonance: 29,
                filterEnvelope: "twang 3",
                vibrato: "none",
                algorithm: "1←(2 3 4)",
                feedbackType: "1⟲",
                feedbackAmplitude: 0,
                feedbackEnvelope: "steady",
                operators: [
                  { frequency: "~2×", amplitude: 10, envelope: "custom" },
                  { frequency: "7×", amplitude: 6, envelope: "twang 3" },
                  { frequency: "20×", amplitude: 1, envelope: "twang 1" },
                  { frequency: "1×", amplitude: 0, envelope: "steady" },
                ],
              },
            },
            {
              name: "rain drop",
              midiProgram: 96,
              generalMidi: !0,
              settings: {
                type: "FM",
                effects: "reverb",
                transition: "hard fade",
                chord: "strum",
                filterCutoffHz: 4e3,
                filterResonance: 14,
                filterEnvelope: "twang 1",
                vibrato: "none",
                algorithm: "(1 2)←(3 4)",
                feedbackType: "1⟲ 2⟲",
                feedbackAmplitude: 0,
                feedbackEnvelope: "steady",
                operators: [
                  { frequency: "1×", amplitude: 12, envelope: "custom" },
                  { frequency: "6×", amplitude: 4, envelope: "custom" },
                  { frequency: "20×", amplitude: 3, envelope: "twang 1" },
                  { frequency: "1×", amplitude: 6, envelope: "tremolo1" },
                ],
              },
            },
            {
              name: "crystal",
              midiProgram: 98,
              generalMidi: !0,
              settings: {
                type: "FM",
                effects: "reverb",
                transition: "hard fade",
                chord: "harmony",
                filterCutoffHz: 2828,
                filterResonance: 14,
                filterEnvelope: "twang 2",
                vibrato: "delayed",
                algorithm: "1 2 3 4",
                feedbackType: "1⟲ 2⟲ 3⟲ 4⟲",
                feedbackAmplitude: 4,
                feedbackEnvelope: "twang 1",
                operators: [
                  { frequency: "1×", amplitude: 10, envelope: "custom" },
                  { frequency: "3×", amplitude: 7, envelope: "custom" },
                  { frequency: "6×", amplitude: 4, envelope: "custom" },
                  { frequency: "13×", amplitude: 4, envelope: "custom" },
                ],
              },
            },
            {
              name: "tinkle bell",
              midiProgram: 112,
              generalMidi: !0,
              settings: {
                type: "FM",
                effects: "reverb",
                transition: "hard",
                chord: "strum",
                filterCutoffHz: 2828,
                filterResonance: 14,
                filterEnvelope: "twang 2",
                vibrato: "none",
                algorithm: "1 2 3 4",
                feedbackType: "1→2→3→4",
                feedbackAmplitude: 5,
                feedbackEnvelope: "twang 3",
                operators: [
                  { frequency: "~2×", amplitude: 7, envelope: "custom" },
                  { frequency: "5×", amplitude: 7, envelope: "custom" },
                  { frequency: "7×", amplitude: 7, envelope: "custom" },
                  { frequency: "16×", amplitude: 7, envelope: "custom" },
                ],
              },
            },
            {
              name: "agogo",
              midiProgram: 113,
              generalMidi: !0,
              settings: {
                type: "FM",
                effects: "reverb",
                transition: "hard fade",
                chord: "strum",
                filterCutoffHz: 4e3,
                filterResonance: 14,
                filterEnvelope: "decay 1",
                vibrato: "none",
                algorithm: "1 2 3 4",
                feedbackType: "1→4",
                feedbackAmplitude: 15,
                feedbackEnvelope: "decay 1",
                operators: [
                  { frequency: "2×", amplitude: 9, envelope: "custom" },
                  { frequency: "5×", amplitude: 6, envelope: "custom" },
                  { frequency: "8×", amplitude: 9, envelope: "custom" },
                  { frequency: "13×", amplitude: 11, envelope: "custom" },
                ],
              },
            },
          ]),
        },
        {
          name: "Guitar Presets",
          presets: g([
            {
              name: "nylon guitar",
              midiProgram: 24,
              generalMidi: !0,
              settings: {
                type: "FM",
                effects: "reverb",
                transition: "hard fade",
                chord: "strum",
                filterCutoffHz: 5657,
                filterResonance: 14,
                filterEnvelope: "twang 1",
                vibrato: "none",
                algorithm: "1←2←3←4",
                feedbackType: "3⟲",
                feedbackAmplitude: 6,
                feedbackEnvelope: "twang 1",
                operators: [
                  { frequency: "1×", amplitude: 15, envelope: "custom" },
                  { frequency: "1×", amplitude: 6, envelope: "steady" },
                  { frequency: "5×", amplitude: 2, envelope: "steady" },
                  { frequency: "7×", amplitude: 4, envelope: "steady" },
                ],
              },
            },
            {
              name: "steel guitar",
              midiProgram: 25,
              generalMidi: !0,
              settings: {
                type: "Picked String",
                eqFilter: [],
                effects: ["reverb"],
                reverb: 33,
                transition: "normal",
                fadeInSeconds: 0,
                fadeOutTicks: 48,
                chord: "strum",
                harmonics: [
                  100, 100, 86, 71, 71, 71, 86, 86, 71, 57, 43, 43, 43, 57, 57,
                  57, 57, 57, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43,
                ],
                unison: "none",
                stringSustain: 71,
                envelopes: [],
              },
            },
            {
              name: "jazz guitar",
              midiProgram: 26,
              generalMidi: !0,
              settings: {
                type: "harmonics",
                effects: "reverb",
                transition: "hard",
                chord: "strum",
                filterCutoffHz: 2e3,
                filterResonance: 14,
                filterEnvelope: "twang 2",
                interval: "union",
                vibrato: "none",
                harmonics: [
                  100, 100, 86, 71, 57, 71, 71, 43, 57, 71, 57, 43, 29, 29, 29,
                  29, 29, 29, 29, 29, 14, 14, 14, 14, 14, 14, 14, 0,
                ],
              },
            },
            {
              name: "clean guitar",
              midiProgram: 27,
              generalMidi: !0,
              settings: {
                type: "harmonics",
                effects: "reverb",
                transition: "hard",
                chord: "strum",
                filterCutoffHz: 2828,
                filterResonance: 14,
                filterEnvelope: "twang 2",
                interval: "union",
                vibrato: "none",
                harmonics: [
                  86, 100, 100, 100, 86, 57, 86, 100, 100, 100, 71, 57, 43, 71,
                  86, 71, 57, 57, 71, 71, 71, 71, 57, 57, 57, 57, 57, 43,
                ],
              },
            },
            {
              name: "muted guitar",
              midiProgram: 28,
              generalMidi: !0,
              settings: {
                type: "FM",
                effects: "reverb",
                transition: "hard",
                chord: "strum",
                filterCutoffHz: 2e3,
                filterResonance: 14,
                filterEnvelope: "twang 1",
                vibrato: "none",
                algorithm: "1←(2 3←4)",
                feedbackType: "1⟲",
                feedbackAmplitude: 7,
                feedbackEnvelope: "twang 2",
                operators: [
                  { frequency: "1×", amplitude: 13, envelope: "custom" },
                  { frequency: "1×", amplitude: 4, envelope: "twang 3" },
                  { frequency: "4×", amplitude: 4, envelope: "twang 2" },
                  { frequency: "16×", amplitude: 4, envelope: "twang 1" },
                ],
              },
            },
          ]),
        },
        {
          name: "Picked Bass Presets",
          presets: g([
            {
              name: "acoustic bass",
              midiProgram: 32,
              generalMidi: !0,
              settings: {
                type: "harmonics",
                effects: "reverb",
                transition: "hard fade",
                chord: "strum",
                filterCutoffHz: 4e3,
                filterResonance: 14,
                filterEnvelope: "twang 1",
                interval: "union",
                vibrato: "none",
                harmonics: [
                  100, 86, 71, 71, 71, 71, 57, 57, 57, 57, 43, 43, 43, 43, 43,
                  29, 29, 29, 29, 29, 29, 14, 14, 14, 14, 14, 14, 14,
                ],
              },
            },
            {
              name: "fingered bass",
              midiProgram: 33,
              generalMidi: !0,
              settings: {
                type: "harmonics",
                effects: "reverb",
                transition: "hard fade",
                chord: "strum",
                filterCutoffHz: 2828,
                filterResonance: 14,
                filterEnvelope: "twang 1",
                interval: "union",
                vibrato: "none",
                harmonics: [
                  100, 86, 71, 57, 71, 43, 57, 29, 29, 29, 29, 29, 29, 14, 14,
                  14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 14, 0,
                ],
              },
            },
            {
              name: "picked bass",
              midiProgram: 34,
              generalMidi: !0,
              settings: {
                type: "FM",
                effects: "reverb",
                transition: "hard fade",
                chord: "strum",
                filterCutoffHz: 2828,
                filterResonance: 0,
                filterEnvelope: "twang 1",
                vibrato: "none",
                algorithm: "1←(2 3←4)",
                feedbackType: "3⟲",
                feedbackAmplitude: 4,
                feedbackEnvelope: "twang 1",
                operators: [
                  { frequency: "1×", amplitude: 15, envelope: "custom" },
                  { frequency: "1×", amplitude: 5, envelope: "steady" },
                  { frequency: "11×", amplitude: 1, envelope: "twang 3" },
                  { frequency: "1×", amplitude: 9, envelope: "steady" },
                ],
              },
            },
            {
              name: "fretless bass",
              midiProgram: 35,
              generalMidi: !0,
              settings: {
                type: "harmonics",
                effects: "reverb",
                transition: "hard",
                chord: "strum",
                filterCutoffHz: 1e3,
                filterResonance: 14,
                filterEnvelope: "flare 2",
                interval: "union",
                vibrato: "none",
                harmonics: [
                  100, 100, 86, 71, 71, 57, 57, 71, 71, 71, 57, 57, 57, 57, 57,
                  57, 57, 43, 43, 43, 43, 43, 43, 43, 43, 29, 29, 14,
                ],
              },
            },
            {
              name: "slap bass 1",
              midiProgram: 36,
              generalMidi: !0,
              settings: {
                type: "harmonics",
                effects: "reverb",
                transition: "hard",
                chord: "strum",
                filterCutoffHz: 4e3,
                filterResonance: 0,
                filterEnvelope: "twang 1",
                interval: "union",
                vibrato: "none",
                harmonics: [
                  100, 100, 100, 100, 86, 71, 57, 29, 29, 43, 43, 57, 71, 57,
                  29, 29, 43, 57, 57, 57, 43, 43, 43, 57, 71, 71, 71, 71,
                ],
              },
            },
            {
              name: "slap bass 2",
              midiProgram: 37,
              generalMidi: !0,
              settings: {
                type: "FM",
                effects: "reverb",
                transition: "hard",
                chord: "strum",
                filterCutoffHz: 5657,
                filterResonance: 0,
                filterEnvelope: "twang 1",
                vibrato: "none",
                algorithm: "1←2←3←4",
                feedbackType: "3⟲",
                feedbackAmplitude: 4,
                feedbackEnvelope: "steady",
                operators: [
                  { frequency: "3×", amplitude: 13, envelope: "custom" },
                  { frequency: "1×", amplitude: 7, envelope: "steady" },
                  { frequency: "13×", amplitude: 3, envelope: "steady" },
                  { frequency: "1×", amplitude: 11, envelope: "steady" },
                ],
              },
            },
            {
              name: "bass synth 1",
              midiProgram: 38,
              generalMidi: !0,
              settings: {
                type: "FM",
                effects: "reverb",
                transition: "hard",
                chord: "strum",
                filterCutoffHz: 4e3,
                filterResonance: 43,
                filterEnvelope: "twang 2",
                vibrato: "none",
                algorithm: "1←3 2←4",
                feedbackType: "3⟲ 4⟲",
                feedbackAmplitude: 9,
                feedbackEnvelope: "twang 2",
                operators: [
                  { frequency: "1×", amplitude: 15, envelope: "custom" },
                  { frequency: "1×", amplitude: 10, envelope: "custom" },
                  { frequency: "1×", amplitude: 14, envelope: "twang 1" },
                  { frequency: "~1×", amplitude: 13, envelope: "twang 2" },
                ],
              },
            },
            {
              name: "bass synth 2",
              midiProgram: 39,
              generalMidi: !0,
              settings: {
                type: "FM",
                effects: "reverb",
                transition: "hard fade",
                chord: "strum",
                filterCutoffHz: 1e3,
                filterResonance: 57,
                filterEnvelope: "punch",
                vibrato: "none",
                algorithm: "1←(2 3 4)",
                feedbackType: "1→2",
                feedbackAmplitude: 4,
                feedbackEnvelope: "twang 3",
                operators: [
                  { frequency: "1×", amplitude: 9, envelope: "custom" },
                  { frequency: "1×", amplitude: 9, envelope: "steady" },
                  { frequency: "3×", amplitude: 0, envelope: "steady" },
                  { frequency: "1×", amplitude: 0, envelope: "steady" },
                ],
              },
            },
            {
              name: "bass & lead",
              midiProgram: 87,
              generalMidi: !0,
              settings: {
                type: "chip",
                transition: "hard",
                effects: "reverb",
                chord: "harmony",
                filterCutoffHz: 4e3,
                filterResonance: 86,
                filterEnvelope: "twang 2",
                wave: "sawtooth",
                interval: "shimmer",
                vibrato: "none",
              },
            },
            {
              name: "dubstep yoi yoi",
              midiProgram: 87,
              settings: {
                type: "chip",
                eqFilter: [
                  { type: "low-pass", cutoffHz: 6727.17, linearGain: 0.7071 },
                ],
                effects: ["note filter", "bitcrusher"],
                noteFilter: [
                  { type: "low-pass", cutoffHz: 594.6, linearGain: 11.3137 },
                ],
                bitcrusherOctave: 1.5,
                bitcrusherQuantization: 0,
                transition: "slide",
                fadeInSeconds: 0.0263,
                fadeOutTicks: -3,
                chord: "arpeggio",
                wave: "sawtooth",
                unison: "none",
                envelopes: [
                  { target: "noteFilterFreq", envelope: "flare 2", index: 0 },
                ],
              },
            },
          ]),
        },
        {
          name: "Picked String Presets",
          presets: g([
            {
              name: "pizzicato strings",
              midiProgram: 45,
              generalMidi: !0,
              settings: {
                type: "FM",
                effects: "reverb",
                transition: "medium fade",
                chord: "harmony",
                filterCutoffHz: 1e3,
                filterResonance: 14,
                filterEnvelope: "twang 1",
                vibrato: "none",
                algorithm: "(1 2 3)←4",
                feedbackType: "1⟲ 2⟲ 3⟲ 4⟲",
                feedbackAmplitude: 7,
                feedbackEnvelope: "twang 1",
                operators: [
                  { frequency: "1×", amplitude: 14, envelope: "custom" },
                  { frequency: "3×", amplitude: 11, envelope: "custom" },
                  { frequency: "6×", amplitude: 9, envelope: "custom" },
                  { frequency: "~1×", amplitude: 10, envelope: "steady" },
                ],
              },
            },
            {
              name: "harp",
              midiProgram: 46,
              generalMidi: !0,
              settings: {
                type: "FM",
                transition: "hard fade",
                effects: "reverb",
                chord: "strum",
                filterCutoffHz: 2828,
                filterResonance: 0,
                filterEnvelope: "twang 1",
                vibrato: "none",
                algorithm: "1←3 2←4",
                feedbackType: "3⟲",
                feedbackAmplitude: 6,
                feedbackEnvelope: "twang 2",
                operators: [
                  { frequency: "1×", amplitude: 15, envelope: "custom" },
                  { frequency: "4×", amplitude: 6, envelope: "custom" },
                  { frequency: "~2×", amplitude: 3, envelope: "steady" },
                  { frequency: "1×", amplitude: 6, envelope: "steady" },
                ],
              },
            },
            {
              name: "sitar",
              midiProgram: 104,
              generalMidi: !0,
              settings: {
                type: "FM",
                transition: "hard fade",
                effects: "reverb",
                chord: "strum",
                filterCutoffHz: 8e3,
                filterResonance: 57,
                filterEnvelope: "twang 2",
                vibrato: "none",
                algorithm: "1←(2 3 4)",
                feedbackType: "1⟲",
                feedbackAmplitude: 0,
                feedbackEnvelope: "steady",
                operators: [
                  { frequency: "1×", amplitude: 15, envelope: "custom" },
                  { frequency: "1×", amplitude: 14, envelope: "twang 3" },
                  { frequency: "9×", amplitude: 3, envelope: "twang 3" },
                  { frequency: "16×", amplitude: 9, envelope: "swell 3" },
                ],
              },
            },
            {
              name: "banjo",
              midiProgram: 105,
              generalMidi: !0,
              settings: {
                type: "FM",
                effects: "reverb",
                transition: "hard fade",
                chord: "strum",
                filterCutoffHz: 2828,
                filterResonance: 14,
                filterEnvelope: "twang 2",
                vibrato: "none",
                algorithm: "1←(2 3←4)",
                feedbackType: "2⟲",
                feedbackAmplitude: 4,
                feedbackEnvelope: "steady",
                operators: [
                  { frequency: "4×", amplitude: 14, envelope: "custom" },
                  { frequency: "1×", amplitude: 10, envelope: "steady" },
                  { frequency: "11×", amplitude: 3, envelope: "twang 3" },
                  { frequency: "1×", amplitude: 11, envelope: "steady" },
                ],
              },
            },
            {
              name: "ukulele",
              midiProgram: 105,
              settings: {
                type: "FM",
                effects: "reverb",
                transition: "hard fade",
                chord: "strum",
                filterCutoffHz: 2e3,
                filterResonance: 0,
                filterEnvelope: "twang 1",
                vibrato: "none",
                algorithm: "1←(2 3←4)",
                feedbackType: "3⟲",
                feedbackAmplitude: 5,
                feedbackEnvelope: "twang 1",
                operators: [
                  { frequency: "2×", amplitude: 14, envelope: "custom" },
                  { frequency: "1×", amplitude: 6, envelope: "steady" },
                  { frequency: "9×", amplitude: 4, envelope: "twang 2" },
                  { frequency: "1×", amplitude: 11, envelope: "steady" },
                ],
              },
            },
            {
              name: "shamisen",
              midiProgram: 106,
              generalMidi: !0,
              settings: {
                type: "FM",
                effects: "reverb",
                transition: "hard fade",
                chord: "harmony",
                filterCutoffHz: 8e3,
                filterResonance: 14,
                filterEnvelope: "twang 1",
                vibrato: "none",
                algorithm: "1←(2 3←4)",
                feedbackType: "3⟲",
                feedbackAmplitude: 9,
                feedbackEnvelope: "twang 3",
                operators: [
                  { frequency: "1×", amplitude: 15, envelope: "custom" },
                  { frequency: "1×", amplitude: 12, envelope: "steady" },
                  { frequency: "16×", amplitude: 4, envelope: "twang 3" },
                  { frequency: "1×", amplitude: 7, envelope: "steady" },
                ],
              },
            },
            {
              name: "koto",
              midiProgram: 107,
              generalMidi: !0,
              settings: {
                type: "FM",
                effects: "reverb",
                transition: "hard fade",
                chord: "harmony",
                filterCutoffHz: 4e3,
                filterResonance: 14,
                filterEnvelope: "twang 2",
                vibrato: "none",
                algorithm: "1←3 2←4",
                feedbackType: "1⟲ 2⟲",
                feedbackAmplitude: 5,
                feedbackEnvelope: "twang 2",
                operators: [
                  { frequency: "~1×", amplitude: 12, envelope: "custom" },
                  { frequency: "6×", amplitude: 10, envelope: "custom" },
                  { frequency: "4×", amplitude: 8, envelope: "twang 3" },
                  { frequency: "~2×", amplitude: 8, envelope: "twang 3" },
                ],
              },
            },
          ]),
        },
        {
          name: "Distortion Presets",
          presets: g([
            {
              name: "overdrive guitar",
              midiProgram: 29,
              generalMidi: !0,
              settings: {
                type: "Picked String",
                eqFilter: [
                  { type: "low-pass", cutoffHz: 4756.83, linearGain: 0.7071 },
                  { type: "high-pass", cutoffHz: 210.22, linearGain: 1 },
                  { type: "low-pass", cutoffHz: 5656.85, linearGain: 1 },
                  { type: "peak", cutoffHz: 840.9, linearGain: 0.5 },
                ],
                effects: ["note filter", "distortion"],
                noteFilter: [
                  { type: "high-pass", cutoffHz: 297.3, linearGain: 2 },
                  { type: "low-pass", cutoffHz: 2378.41, linearGain: 0.7071 },
                ],
                distortion: 71,
                transition: "normal",
                fadeInSeconds: 0,
                fadeOutTicks: 12,
                chord: "strum",
                harmonics: [
                  86, 100, 100, 86, 86, 86, 86, 71, 71, 71, 71, 71, 71, 71, 71,
                  71, 71, 57, 57, 57, 57, 57, 57, 57, 57, 57, 57, 57,
                ],
                unison: "none",
                stringSustain: 71,
                envelopes: [
                  { target: "noteFilterFreq", envelope: "note size", index: 1 },
                ],
              },
            },
            {
              name: "distortion guitar",
              midiProgram: 30,
              generalMidi: !0,
              settings: {
                type: "Picked String",
                eqFilter: [
                  { type: "low-pass", cutoffHz: 4756.83, linearGain: 0.7071 },
                  { type: "high-pass", cutoffHz: 210.22, linearGain: 1 },
                  { type: "low-pass", cutoffHz: 5656.85, linearGain: 1 },
                  { type: "peak", cutoffHz: 594.6, linearGain: 0.3536 },
                  { type: "peak", cutoffHz: 1e3, linearGain: 0.25 },
                ],
                effects: ["note filter", "distortion", "reverb"],
                noteFilter: [
                  { type: "high-pass", cutoffHz: 353.55, linearGain: 2 },
                  { type: "low-pass", cutoffHz: 2e3, linearGain: 1 },
                ],
                distortion: 86,
                reverb: 67,
                transition: "normal",
                fadeInSeconds: 0,
                fadeOutTicks: 12,
                chord: "strum",
                harmonics: [
                  86, 100, 100, 86, 86, 86, 86, 71, 71, 71, 71, 71, 71, 71, 71,
                  71, 71, 57, 57, 57, 57, 57, 57, 57, 57, 57, 57, 57,
                ],
                unison: "none",
                stringSustain: 71,
                envelopes: [
                  { target: "noteFilterFreq", envelope: "note size", index: 1 },
                ],
              },
            },
            {
              name: "charango synth",
              midiProgram: 84,
              generalMidi: !0,
              settings: {
                type: "FM",
                eqFilter: [
                  { type: "low-pass", cutoffHz: 11313.71, linearGain: 1 },
                ],
                effects: [],
                transition: "normal",
                fadeInSeconds: 0,
                fadeOutTicks: -3,
                chord: "strum",
                algorithm: "1←(2 3←4)",
                feedbackType: "1→2→3→4",
                feedbackAmplitude: 8,
                operators: [
                  { frequency: "3×", amplitude: 13 },
                  { frequency: "~1×", amplitude: 5 },
                  { frequency: "4×", amplitude: 6 },
                  { frequency: "3×", amplitude: 7 },
                ],
                envelopes: [
                  { target: "feedbackAmplitude", envelope: "twang 3" },
                ],
              },
            },
            {
              name: "guitar harmonics",
              midiProgram: 31,
              generalMidi: !0,
              settings: {
                type: "FM",
                eqFilter: [{ type: "low-pass", cutoffHz: 4e3, linearGain: 2 }],
                effects: ["reverb"],
                reverb: 33,
                transition: "normal",
                fadeInSeconds: 0,
                fadeOutTicks: -3,
                chord: "strum",
                algorithm: "1←(2 3)←4",
                feedbackType: "1⟲",
                feedbackAmplitude: 2,
                operators: [
                  { frequency: "4×", amplitude: 12 },
                  { frequency: "16×", amplitude: 5 },
                  { frequency: "1×", amplitude: 2 },
                  { frequency: "~1×", amplitude: 12 },
                ],
                envelopes: [
                  {
                    target: "operatorAmplitude",
                    envelope: "swell 1",
                    index: 1,
                  },
                  { target: "operatorAmplitude", envelope: "punch", index: 2 },
                  {
                    target: "operatorAmplitude",
                    envelope: "twang 1",
                    index: 3,
                  },
                ],
              },
            },
            {
              name: "PWM overdrive",
              midiProgram: 29,
              settings: {
                type: "PWM",
                eqFilter: [
                  { type: "low-pass", cutoffHz: 5656.85, linearGain: 1.4142 },
                ],
                effects: [],
                transition: "normal",
                fadeInSeconds: 0,
                fadeOutTicks: -3,
                chord: "strum",
                pulseWidth: 17.67767,
                envelopes: [{ target: "pulseWidth", envelope: "punch" }],
              },
            },
            {
              name: "PWM distortion",
              midiProgram: 30,
              settings: {
                type: "PWM",
                eqFilter: [
                  { type: "low-pass", cutoffHz: 3363.59, linearGain: 2 },
                ],
                effects: ["vibrato"],
                vibrato: "delayed",
                transition: "normal",
                fadeInSeconds: 0,
                fadeOutTicks: -3,
                chord: "strum",
                pulseWidth: 50,
                envelopes: [{ target: "pulseWidth", envelope: "swell 1" }],
              },
            },
            {
              name: "FM overdrive",
              midiProgram: 29,
              settings: {
                type: "FM",
                eqFilter: [
                  { type: "low-pass", cutoffHz: 4756.83, linearGain: 1 },
                ],
                effects: ["reverb"],
                reverb: 33,
                transition: "normal",
                fadeInSeconds: 0,
                fadeOutTicks: -3,
                chord: "strum",
                algorithm: "1←(2 3←4)",
                feedbackType: "1→2",
                feedbackAmplitude: 2,
                operators: [
                  { frequency: "~1×", amplitude: 15 },
                  { frequency: "1×", amplitude: 12 },
                  { frequency: "~2×", amplitude: 6 },
                  { frequency: "1×", amplitude: 12 },
                ],
                envelopes: [
                  {
                    target: "operatorAmplitude",
                    envelope: "twang 1",
                    index: 2,
                  },
                  {
                    target: "operatorAmplitude",
                    envelope: "swell 3",
                    index: 3,
                  },
                  { target: "feedbackAmplitude", envelope: "punch" },
                ],
              },
            },
            {
              name: "FM distortion",
              midiProgram: 30,
              settings: {
                type: "FM",
                eqFilter: [{ type: "low-pass", cutoffHz: 4e3, linearGain: 2 }],
                effects: ["reverb"],
                reverb: 33,
                transition: "normal",
                fadeInSeconds: 0,
                fadeOutTicks: -3,
                chord: "strum",
                algorithm: "1←(2 3←4)",
                feedbackType: "1→2",
                feedbackAmplitude: 4,
                operators: [
                  { frequency: "~1×", amplitude: 15 },
                  { frequency: "1×", amplitude: 11 },
                  { frequency: "1×", amplitude: 9 },
                  { frequency: "~2×", amplitude: 4 },
                ],
                envelopes: [
                  {
                    target: "operatorAmplitude",
                    envelope: "swell 1",
                    index: 2,
                  },
                  {
                    target: "operatorAmplitude",
                    envelope: "swell 3",
                    index: 3,
                  },
                ],
              },
            },
          ]),
        },
        {
          name: "Bellows Presets",
          presets: g([
            {
              name: "drawbar organ 1",
              midiProgram: 16,
              generalMidi: !0,
              midiSubharmonicOctaves: 1,
              settings: {
                type: "harmonics",
                effects: "reverb",
                transition: "hard",
                chord: "harmony",
                filterCutoffHz: 2828,
                filterResonance: 14,
                filterEnvelope: "steady",
                interval: "union",
                vibrato: "none",
                harmonics: [
                  86, 86, 0, 86, 0, 0, 0, 86, 0, 0, 0, 0, 0, 0, 0, 86, 0, 0, 0,
                  0, 0, 0, 0, 0, 0, 0, 0, 0,
                ],
              },
            },
            {
              name: "drawbar organ 2",
              midiProgram: 16,
              midiSubharmonicOctaves: 1,
              settings: {
                type: "harmonics",
                effects: "reverb",
                transition: "hard",
                chord: "harmony",
                filterCutoffHz: 2828,
                filterResonance: 14,
                filterEnvelope: "steady",
                interval: "union",
                vibrato: "none",
                harmonics: [
                  86, 29, 71, 86, 71, 14, 0, 100, 0, 0, 0, 86, 0, 0, 0, 71, 0,
                  0, 0, 57, 0, 0, 0, 29, 0, 0, 0, 0,
                ],
              },
            },
            {
              name: "percussive organ",
              midiProgram: 17,
              generalMidi: !0,
              midiSubharmonicOctaves: 1,
              settings: {
                type: "FM",
                transition: "hard",
                effects: "reverb",
                chord: "harmony",
                filterCutoffHz: 2e3,
                filterResonance: 14,
                filterEnvelope: "punch",
                vibrato: "light",
                algorithm: "1 2 3 4",
                feedbackType: "1→3 2→4",
                feedbackAmplitude: 7,
                feedbackEnvelope: "decay 1",
                operators: [
                  { frequency: "1×", amplitude: 7, envelope: "custom" },
                  { frequency: "2×", amplitude: 7, envelope: "custom" },
                  { frequency: "3×", amplitude: 8, envelope: "custom" },
                  { frequency: "4×", amplitude: 8, envelope: "custom" },
                ],
              },
            },
            {
              name: "rock organ",
              midiProgram: 18,
              generalMidi: !0,
              midiSubharmonicOctaves: 1,
              settings: {
                type: "FM",
                effects: "chorus & reverb",
                transition: "hard",
                chord: "harmony",
                filterCutoffHz: 4e3,
                filterResonance: 14,
                filterEnvelope: "punch",
                vibrato: "delayed",
                algorithm: "(1 2 3)←4",
                feedbackType: "1⟲ 2⟲ 3⟲",
                feedbackAmplitude: 2,
                feedbackEnvelope: "flare 1",
                operators: [
                  { frequency: "1×", amplitude: 9, envelope: "custom" },
                  { frequency: "4×", amplitude: 9, envelope: "custom" },
                  { frequency: "6×", amplitude: 9, envelope: "custom" },
                  { frequency: "2×", amplitude: 5, envelope: "steady" },
                ],
              },
            },
            {
              name: "pipe organ",
              midiProgram: 19,
              generalMidi: !0,
              midiSubharmonicOctaves: 1,
              settings: {
                type: "FM",
                transition: "cross fade",
                effects: "reverb",
                chord: "harmony",
                filterCutoffHz: 5657,
                filterResonance: 43,
                filterEnvelope: "steady",
                vibrato: "none",
                algorithm: "1 2 3 4",
                feedbackType: "1⟲ 2⟲ 3⟲ 4⟲",
                feedbackAmplitude: 5,
                feedbackEnvelope: "steady",
                operators: [
                  { frequency: "1×", amplitude: 8, envelope: "custom" },
                  { frequency: "2×", amplitude: 9, envelope: "custom" },
                  { frequency: "4×", amplitude: 9, envelope: "custom" },
                  { frequency: "8×", amplitude: 8, envelope: "custom" },
                ],
              },
            },
            {
              name: "reed organ",
              midiProgram: 20,
              generalMidi: !0,
              settings: {
                type: "harmonics",
                effects: "reverb",
                transition: "soft",
                chord: "harmony",
                filterCutoffHz: 2e3,
                filterResonance: 29,
                filterEnvelope: "steady",
                interval: "union",
                vibrato: "none",
                harmonics: [
                  71, 86, 100, 86, 71, 100, 57, 71, 71, 71, 43, 43, 43, 71, 43,
                  71, 57, 57, 57, 57, 57, 57, 57, 29, 43, 29, 29, 14,
                ],
              },
            },
            {
              name: "accordion",
              midiProgram: 21,
              generalMidi: !0,
              settings: {
                type: "chip",
                effects: "reverb",
                transition: "cross fade",
                chord: "harmony",
                filterCutoffHz: 5657,
                filterResonance: 0,
                filterEnvelope: "swell 1",
                wave: "double saw",
                interval: "honky tonk",
                vibrato: "none",
              },
            },
            {
              name: "bandoneon",
              midiProgram: 23,
              generalMidi: !0,
              settings: {
                type: "harmonics",
                effects: "reverb",
                transition: "soft",
                chord: "harmony",
                filterCutoffHz: 4e3,
                filterResonance: 29,
                filterEnvelope: "swell 1",
                interval: "hum",
                vibrato: "none",
                harmonics: [
                  86, 86, 86, 57, 71, 86, 57, 71, 71, 71, 57, 43, 57, 43, 71,
                  43, 71, 57, 57, 43, 43, 43, 57, 43, 43, 29, 29, 29,
                ],
              },
            },
            {
              name: "bagpipe",
              midiProgram: 109,
              generalMidi: !0,
              settings: {
                type: "harmonics",
                effects: "reverb",
                transition: "cross fade",
                chord: "harmony",
                filterCutoffHz: 5657,
                filterResonance: 43,
                filterEnvelope: "punch",
                interval: "hum",
                vibrato: "none",
                harmonics: [
                  71, 86, 86, 100, 100, 86, 57, 100, 86, 71, 71, 71, 57, 57, 57,
                  71, 57, 71, 57, 71, 43, 57, 57, 43, 43, 43, 43, 43,
                ],
              },
            },
          ]),
        },
        {
          name: "String Presets",
          presets: g([
            {
              name: "violin 1",
              midiProgram: 40,
              generalMidi: !0,
              settings: {
                type: "FM",
                eqFilter: [
                  { type: "low-pass", cutoffHz: 4e3, linearGain: 1.4142 },
                  { type: "high-pass", cutoffHz: 105.11, linearGain: 0.3536 },
                ],
                effects: ["vibrato", "reverb"],
                vibrato: "delayed",
                reverb: 67,
                transition: "normal",
                fadeInSeconds: 0.0413,
                fadeOutTicks: 6,
                chord: "simultaneous",
                algorithm: "(1 2)←(3 4)",
                feedbackType: "1→2",
                feedbackAmplitude: 5,
                operators: [
                  { frequency: "4×", amplitude: 9 },
                  { frequency: "3×", amplitude: 9 },
                  { frequency: "2×", amplitude: 7 },
                  { frequency: "7×", amplitude: 5 },
                ],
                envelopes: [
                  {
                    target: "operatorAmplitude",
                    envelope: "swell 1",
                    index: 3,
                  },
                  { target: "feedbackAmplitude", envelope: "twang 3" },
                ],
              },
            },
            {
              name: "viola",
              midiProgram: 41,
              generalMidi: !0,
              settings: {
                type: "FM",
                effects: "reverb",
                transition: "cross fade",
                chord: "harmony",
                filterCutoffHz: 2e3,
                filterResonance: 29,
                filterEnvelope: "steady",
                vibrato: "delayed",
                algorithm: "(1 2 3)←4",
                feedbackType: "1⟲ 2⟲ 3⟲",
                feedbackAmplitude: 8,
                feedbackEnvelope: "swell 1",
                operators: [
                  { frequency: "2×", amplitude: 11, envelope: "custom" },
                  { frequency: "7×", amplitude: 7, envelope: "custom" },
                  { frequency: "13×", amplitude: 4, envelope: "custom" },
                  { frequency: "1×", amplitude: 5, envelope: "steady" },
                ],
              },
            },
            {
              name: "cello",
              midiProgram: 42,
              generalMidi: !0,
              settings: {
                type: "FM",
                eqFilter: [
                  { type: "low-pass", cutoffHz: 4e3, linearGain: 0.1768 },
                  { type: "high-pass", cutoffHz: 297.3, linearGain: 0.7071 },
                  { type: "peak", cutoffHz: 4756.83, linearGain: 5.6569 },
                ],
                effects: ["note filter", "reverb"],
                noteFilter: [
                  { type: "low-pass", cutoffHz: 16e3, linearGain: 0.0884 },
                ],
                reverb: 67,
                transition: "normal",
                fadeInSeconds: 0.0125,
                fadeOutTicks: 12,
                chord: "simultaneous",
                algorithm: "(1 2)←3←4",
                feedbackType: "1⟲ 2⟲",
                feedbackAmplitude: 3,
                operators: [
                  { frequency: "16×", amplitude: 5 },
                  { frequency: "~1×", amplitude: 10 },
                  { frequency: "1×", amplitude: 9 },
                  { frequency: "6×", amplitude: 3 },
                ],
                envelopes: [
                  { target: "noteFilterAllFreqs", envelope: "swell 1" },
                  {
                    target: "operatorAmplitude",
                    envelope: "swell 1",
                    index: 3,
                  },
                ],
              },
            },
            {
              name: "contrabass",
              midiProgram: 43,
              generalMidi: !0,
              settings: {
                type: "FM",
                effects: "reverb",
                transition: "cross fade",
                chord: "harmony",
                filterCutoffHz: 2e3,
                filterResonance: 29,
                filterEnvelope: "steady",
                vibrato: "delayed",
                algorithm: "(1 2)←3←4",
                feedbackType: "1⟲ 2⟲",
                feedbackAmplitude: 0,
                feedbackEnvelope: "steady",
                operators: [
                  { frequency: "16×", amplitude: 5, envelope: "custom" },
                  { frequency: "1×", amplitude: 10, envelope: "custom" },
                  { frequency: "1×", amplitude: 10, envelope: "steady" },
                  { frequency: "6×", amplitude: 3, envelope: "swell 1" },
                ],
              },
            },
            {
              name: "fiddle",
              midiProgram: 110,
              generalMidi: !0,
              settings: {
                type: "FM",
                effects: "reverb",
                transition: "soft",
                chord: "harmony",
                filterCutoffHz: 2828,
                filterResonance: 29,
                filterEnvelope: "steady",
                vibrato: "delayed",
                algorithm: "(1 2)←(3 4)",
                feedbackType: "3⟲ 4⟲",
                feedbackAmplitude: 5,
                feedbackEnvelope: "twang 1",
                operators: [
                  { frequency: "2×", amplitude: 10, envelope: "custom" },
                  { frequency: "8×", amplitude: 8, envelope: "custom" },
                  { frequency: "1×", amplitude: 8, envelope: "steady" },
                  { frequency: "16×", amplitude: 3, envelope: "steady" },
                ],
              },
            },
            {
              name: "tremolo strings",
              midiProgram: 44,
              generalMidi: !0,
              settings: {
                type: "FM",
                effects: "chorus & reverb",
                transition: "medium fade",
                chord: "harmony",
                filterCutoffHz: 2e3,
                filterResonance: 0,
                filterEnvelope: "tremolo4",
                vibrato: "none",
                algorithm: "1 2 3 4",
                feedbackType: "1→2→3→4",
                feedbackAmplitude: 12,
                feedbackEnvelope: "steady",
                operators: [
                  { frequency: "1×", amplitude: 8, envelope: "custom" },
                  { frequency: "~2×", amplitude: 8, envelope: "custom" },
                  { frequency: "4×", amplitude: 8, envelope: "custom" },
                  { frequency: "7×", amplitude: 8, envelope: "custom" },
                ],
              },
            },
            {
              name: "strings",
              midiProgram: 48,
              generalMidi: !0,
              settings: {
                type: "FM",
                effects: "chorus & reverb",
                transition: "cross fade",
                chord: "harmony",
                filterCutoffHz: 2828,
                filterResonance: 43,
                filterEnvelope: "steady",
                vibrato: "none",
                algorithm: "(1 2)←(3 4)",
                feedbackType: "4⟲",
                feedbackAmplitude: 5,
                feedbackEnvelope: "twang 3",
                operators: [
                  { frequency: "4×", amplitude: 9, envelope: "custom" },
                  { frequency: "3×", amplitude: 9, envelope: "custom" },
                  { frequency: "2×", amplitude: 7, envelope: "steady" },
                  { frequency: "7×", amplitude: 3, envelope: "swell 1" },
                ],
              },
            },
            {
              name: "slow strings",
              midiProgram: 49,
              generalMidi: !0,
              settings: {
                type: "FM",
                effects: "chorus & reverb",
                transition: "soft fade",
                chord: "harmony",
                filterCutoffHz: 1414,
                filterResonance: 0,
                filterEnvelope: "swell 2",
                vibrato: "none",
                algorithm: "(1 2)←(3 4)",
                feedbackType: "4⟲",
                feedbackAmplitude: 6,
                feedbackEnvelope: "flare 3",
                operators: [
                  { frequency: "4×", amplitude: 10, envelope: "custom" },
                  { frequency: "3×", amplitude: 10, envelope: "custom" },
                  { frequency: "2×", amplitude: 7, envelope: "steady" },
                  { frequency: "7×", amplitude: 4, envelope: "swell 1" },
                ],
              },
            },
            {
              name: "strings synth 1",
              midiProgram: 50,
              generalMidi: !0,
              settings: {
                type: "chip",
                transition: "soft fade",
                effects: "chorus & reverb",
                chord: "harmony",
                filterCutoffHz: 1414,
                filterResonance: 43,
                filterEnvelope: "steady",
                wave: "sawtooth",
                interval: "hum",
                vibrato: "delayed",
              },
            },
            {
              name: "strings synth 2",
              midiProgram: 51,
              generalMidi: !0,
              settings: {
                type: "FM",
                effects: "chorus & reverb",
                transition: "soft fade",
                chord: "harmony",
                filterCutoffHz: 2e3,
                filterResonance: 43,
                filterEnvelope: "steady",
                vibrato: "none",
                algorithm: "1 2 3 4",
                feedbackType: "1⟲ 2⟲ 3⟲ 4⟲",
                feedbackAmplitude: 12,
                feedbackEnvelope: "swell 1",
                operators: [
                  { frequency: "3×", amplitude: 6, envelope: "custom" },
                  { frequency: "2×", amplitude: 7, envelope: "custom" },
                  { frequency: "1×", amplitude: 8, envelope: "custom" },
                  { frequency: "1×", amplitude: 9, envelope: "custom" },
                ],
              },
            },
            {
              name: "orchestra hit 1",
              midiProgram: 55,
              generalMidi: !0,
              midiSubharmonicOctaves: 1,
              settings: {
                type: "FM",
                effects: "chorus & reverb",
                transition: "hard fade",
                chord: "harmony",
                filterCutoffHz: 8e3,
                filterResonance: 14,
                filterEnvelope: "custom",
                vibrato: "none",
                algorithm: "1 2 3 4",
                feedbackType: "1⟲ 2⟲ 3⟲ 4⟲",
                feedbackAmplitude: 14,
                feedbackEnvelope: "twang 3",
                operators: [
                  { frequency: "1×", amplitude: 15, envelope: "twang 3" },
                  { frequency: "2×", amplitude: 15, envelope: "flare 3" },
                  { frequency: "4×", amplitude: 15, envelope: "flare 2" },
                  { frequency: "8×", amplitude: 15, envelope: "flare 1" },
                ],
              },
            },
            {
              name: "violin 2",
              midiProgram: 40,
              generalMidi: !0,
              settings: {
                type: "FM",
                eqFilter: [
                  { type: "low-pass", cutoffHz: 2828, linearGain: 1.4142 },
                  { type: "high-pass", cutoffHz: 105.11, linearGain: 0.3536 },
                ],
                effects: ["vibrato", "reverb"],
                vibrato: "light",
                reverb: 67,
                transition: "normal",
                fadeInSeconds: 0.0413,
                fadeOutTicks: 6,
                chord: "simultaneous",
                algorithm: "(1 2)←(3 4)",
                feedbackType: "4⟲",
                feedbackAmplitude: 5,
                feedbackEnvelope: "twang 3",
                operators: [
                  { frequency: "4×", amplitude: 15, envelope: "custom" },
                  { frequency: "3×", amplitude: 13, envelope: "custom" },
                  { frequency: "2×", amplitude: 7, envelope: "steady" },
                  { frequency: "7×", amplitude: 8, envelope: "swell 1" },
                ],
              },
            },
            {
              name: "orchestra hit 2",
              midiProgram: 55,
              midiSubharmonicOctaves: 1,
              settings: {
                type: "FM",
                effects: "chorus & reverb",
                transition: "medium fade",
                chord: "harmony",
                filterCutoffHz: 8e3,
                filterResonance: 0,
                filterEnvelope: "decay 1",
                vibrato: "delayed",
                algorithm: "1 2 3 4",
                feedbackType: "1⟲ 2⟲ 3⟲ 4⟲",
                feedbackAmplitude: 14,
                feedbackEnvelope: "steady",
                operators: [
                  { frequency: "1×", amplitude: 12, envelope: "custom" },
                  { frequency: "2×", amplitude: 14, envelope: "custom" },
                  { frequency: "3×", amplitude: 12, envelope: "custom" },
                  { frequency: "4×", amplitude: 14, envelope: "custom" },
                ],
              },
            },
          ]),
        },
        {
          name: "Vocal Presets",
          presets: g([
            {
              name: "choir soprano",
              midiProgram: 94,
              generalMidi: !0,
              settings: {
                type: "harmonics",
                eqFilter: [
                  { type: "low-pass", cutoffHz: 2828.43, linearGain: 2 },
                  { type: "peak", cutoffHz: 1189.21, linearGain: 5.6569 },
                  { type: "high-pass", cutoffHz: 707.11, linearGain: 2.8284 },
                  { type: "peak", cutoffHz: 2e3, linearGain: 0.0884 },
                  { type: "peak", cutoffHz: 840.9, linearGain: 0.25 },
                  { type: "low-pass", cutoffHz: 6727.17, linearGain: 11.3137 },
                ],
                effects: ["vibrato", "chorus", "reverb"],
                vibrato: "shaky",
                chorus: 100,
                reverb: 33,
                fadeInSeconds: 0.0413,
                fadeOutTicks: 24,
                harmonics: [
                  100, 100, 86, 57, 29, 29, 57, 71, 57, 29, 14, 14, 14, 29, 43,
                  57, 43, 29, 14, 14, 14, 14, 14, 14, 0, 0, 0, 0,
                ],
                unison: "none",
                envelopes: [],
              },
            },
            {
              name: "choir tenor",
              midiProgram: 52,
              generalMidi: !0,
              settings: {
                type: "harmonics",
                eqFilter: [
                  { type: "peak", cutoffHz: 1e3, linearGain: 11.3137 },
                  { type: "peak", cutoffHz: 707.11, linearGain: 5.6569 },
                  { type: "peak", cutoffHz: 840.9, linearGain: 0.0884 },
                  { type: "peak", cutoffHz: 1681.79, linearGain: 0.0884 },
                  { type: "high-pass", cutoffHz: 297.3, linearGain: 0.7071 },
                  { type: "low-pass", cutoffHz: 2828.43, linearGain: 11.3137 },
                ],
                effects: ["vibrato", "chorus", "reverb"],
                vibrato: "shaky",
                chorus: 100,
                reverb: 67,
                transition: "normal",
                fadeInSeconds: 0.0413,
                fadeOutTicks: 48,
                chord: "simultaneous",
                harmonics: [
                  86, 100, 100, 86, 71, 57, 43, 29, 29, 29, 29, 43, 43, 43, 29,
                  29, 29, 29, 29, 29, 29, 29, 29, 14, 14, 14, 14, 14,
                ],
                unison: "none",
                envelopes: [],
              },
            },
            {
              name: "choir bass",
              midiProgram: 52,
              settings: {
                type: "harmonics",
                eqFilter: [
                  { type: "low-pass", cutoffHz: 2378.41, linearGain: 11.3137 },
                  { type: "peak", cutoffHz: 594.6, linearGain: 5.6569 },
                  { type: "peak", cutoffHz: 1681.79, linearGain: 0.0884 },
                  { type: "peak", cutoffHz: 707.11, linearGain: 0.0884 },
                  { type: "peak", cutoffHz: 840.9, linearGain: 11.3137 },
                ],
                effects: ["vibrato", "chorus", "reverb"],
                vibrato: "shaky",
                chorus: 100,
                reverb: 67,
                transition: "normal",
                fadeInSeconds: 0.0413,
                fadeOutTicks: 48,
                chord: "simultaneous",
                harmonics: [
                  71, 86, 100, 100, 86, 86, 57, 43, 29, 29, 29, 29, 29, 29, 43,
                  43, 43, 43, 43, 29, 29, 29, 29, 14, 14, 14, 14, 14,
                ],
                unison: "none",
                envelopes: [],
              },
            },
            {
              name: "solo soprano",
              midiProgram: 85,
              settings: {
                type: "harmonics",
                eqFilter: [
                  { type: "low-pass", cutoffHz: 2828.43, linearGain: 2 },
                  { type: "peak", cutoffHz: 1189.21, linearGain: 5.6569 },
                  { type: "high-pass", cutoffHz: 707.11, linearGain: 2.8284 },
                  { type: "peak", cutoffHz: 2e3, linearGain: 0.0884 },
                  { type: "peak", cutoffHz: 840.9, linearGain: 0.25 },
                ],
                effects: ["vibrato", "reverb"],
                vibrato: "shaky",
                reverb: 33,
                fadeInSeconds: 0.0413,
                fadeOutTicks: 12,
                harmonics: [
                  86, 100, 86, 43, 14, 14, 57, 71, 57, 14, 14, 14, 14, 14, 43,
                  57, 43, 14, 14, 14, 14, 14, 14, 14, 0, 0, 0, 0,
                ],
                unison: "none",
                envelopes: [],
              },
            },
            {
              name: "solo tenor",
              midiProgram: 85,
              settings: {
                type: "harmonics",
                eqFilter: [
                  { type: "peak", cutoffHz: 1e3, linearGain: 11.3137 },
                  { type: "peak", cutoffHz: 707.11, linearGain: 5.6569 },
                  { type: "peak", cutoffHz: 840.9, linearGain: 0.0884 },
                  { type: "peak", cutoffHz: 1681.79, linearGain: 0.0884 },
                  { type: "high-pass", cutoffHz: 297.3, linearGain: 0.7071 },
                  { type: "low-pass", cutoffHz: 2828.43, linearGain: 11.3137 },
                ],
                effects: ["vibrato", "reverb"],
                vibrato: "shaky",
                reverb: 33,
                fadeInSeconds: 0.0413,
                fadeOutTicks: 12,
                harmonics: [
                  86, 100, 100, 86, 71, 57, 43, 29, 29, 29, 29, 43, 43, 43, 29,
                  29, 29, 29, 29, 29, 29, 29, 29, 14, 14, 14, 14, 14,
                ],
                unison: "none",
                envelopes: [],
              },
            },
            {
              name: "solo bass",
              midiProgram: 85,
              settings: {
                type: "harmonics",
                eqFilter: [
                  { type: "low-pass", cutoffHz: 2378.41, linearGain: 5.6569 },
                  { type: "peak", cutoffHz: 594.6, linearGain: 8 },
                  { type: "peak", cutoffHz: 1681.79, linearGain: 0.0884 },
                  { type: "peak", cutoffHz: 707.11, linearGain: 0.0884 },
                  { type: "peak", cutoffHz: 840.9, linearGain: 8 },
                  { type: "high-pass", cutoffHz: 210.22, linearGain: 1.4142 },
                ],
                effects: ["vibrato", "reverb"],
                vibrato: "shaky",
                reverb: 33,
                transition: "normal",
                fadeInSeconds: 0.0263,
                fadeOutTicks: 12,
                chord: "simultaneous",
                harmonics: [
                  71, 86, 100, 100, 86, 86, 57, 43, 29, 29, 29, 29, 29, 29, 43,
                  43, 43, 43, 43, 29, 29, 29, 29, 14, 14, 14, 14, 14,
                ],
                unison: "none",
                envelopes: [],
              },
            },
            {
              name: "voice ooh",
              midiProgram: 53,
              generalMidi: !0,
              settings: {
                type: "harmonics",
                effects: "reverb",
                transition: "soft",
                chord: "harmony",
                filterCutoffHz: 1414,
                filterResonance: 57,
                filterEnvelope: "steady",
                interval: "union",
                vibrato: "shaky",
                harmonics: [
                  100, 57, 43, 43, 14, 14, 0, 0, 0, 14, 29, 29, 14, 0, 14, 29,
                  29, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                ],
              },
            },
            {
              name: "voice synth",
              midiProgram: 54,
              generalMidi: !0,
              settings: {
                type: "chip",
                transition: "medium fade",
                effects: "chorus & reverb",
                chord: "harmony",
                filterCutoffHz: 4e3,
                filterResonance: 57,
                filterEnvelope: "steady",
                wave: "rounded",
                interval: "union",
                vibrato: "light",
              },
            },
            {
              name: "vox synth lead",
              midiProgram: 85,
              generalMidi: !0,
              settings: {
                type: "FM",
                effects: "chorus & reverb",
                transition: "cross fade",
                chord: "harmony",
                filterCutoffHz: 2828,
                filterResonance: 14,
                filterEnvelope: "steady",
                vibrato: "light",
                algorithm: "(1 2 3)←4",
                feedbackType: "1→2→3→4",
                feedbackAmplitude: 2,
                feedbackEnvelope: "punch",
                operators: [
                  { frequency: "2×", amplitude: 10, envelope: "custom" },
                  { frequency: "9×", amplitude: 5, envelope: "custom" },
                  { frequency: "20×", amplitude: 1, envelope: "custom" },
                  { frequency: "~1×", amplitude: 4, envelope: "steady" },
                ],
              },
            },
            {
              name: "tiny robot",
              midiProgram: 85,
              settings: {
                type: "FM",
                eqFilter: [],
                effects: ["vibrato", "reverb"],
                vibrato: "delayed",
                reverb: 33,
                transition: "slide",
                fadeInSeconds: 0.0263,
                fadeOutTicks: -3,
                chord: "simultaneous",
                algorithm: "1←(2 3 4)",
                feedbackType: "1⟲",
                feedbackAmplitude: 2,
                operators: [
                  { frequency: "2×", amplitude: 15 },
                  { frequency: "1×", amplitude: 7 },
                  { frequency: "~1×", amplitude: 7 },
                  { frequency: "1×", amplitude: 0 },
                ],
                envelopes: [
                  { target: "operatorAmplitude", envelope: "punch", index: 1 },
                  { target: "feedbackAmplitude", envelope: "twang 3" },
                ],
              },
            },
            {
              name: "yowie",
              midiProgram: 85,
              settings: {
                type: "FM",
                effects: "reverb",
                transition: "cross fade",
                chord: "harmony",
                filterCutoffHz: 2e3,
                filterResonance: 86,
                filterEnvelope: "tremolo5",
                vibrato: "none",
                algorithm: "1←2←(3 4)",
                feedbackType: "1⟲",
                feedbackAmplitude: 12,
                feedbackEnvelope: "tremolo3",
                operators: [
                  { frequency: "2×", amplitude: 12, envelope: "custom" },
                  { frequency: "16×", amplitude: 5, envelope: "steady" },
                  { frequency: "1×", amplitude: 5, envelope: "steady" },
                  { frequency: "1×", amplitude: 0, envelope: "steady" },
                ],
              },
            },
            {
              name: "mouse",
              midiProgram: 85,
              settings: {
                type: "FM",
                eqFilter: [],
                effects: ["vibrato", "reverb"],
                vibrato: "light",
                reverb: 33,
                transition: "slide in pattern",
                fadeInSeconds: 0.0263,
                fadeOutTicks: -3,
                chord: "simultaneous",
                algorithm: "1 2 3 4",
                feedbackType: "1⟲ 2⟲",
                feedbackAmplitude: 5,
                operators: [
                  { frequency: "2×", amplitude: 13 },
                  { frequency: "5×", amplitude: 12 },
                  { frequency: "1×", amplitude: 0 },
                  { frequency: "1×", amplitude: 0 },
                ],
                envelopes: [
                  { target: "noteVolume", envelope: "note size" },
                  { target: "feedbackAmplitude", envelope: "flare 2" },
                ],
              },
            },
            {
              name: "gumdrop",
              midiProgram: 85,
              settings: {
                type: "FM",
                effects: "reverb",
                transition: "hard",
                chord: "harmony",
                filterCutoffHz: 8e3,
                filterResonance: 0,
                filterEnvelope: "steady",
                vibrato: "none",
                algorithm: "(1 2 3)←4",
                feedbackType: "1⟲ 2⟲ 3⟲",
                feedbackAmplitude: 0,
                feedbackEnvelope: "steady",
                operators: [
                  { frequency: "2×", amplitude: 15, envelope: "punch" },
                  { frequency: "4×", amplitude: 15, envelope: "punch" },
                  { frequency: "7×", amplitude: 15, envelope: "punch" },
                  { frequency: "1×", amplitude: 10, envelope: "twang 1" },
                ],
              },
            },
            {
              name: "echo drop",
              midiProgram: 102,
              generalMidi: !0,
              settings: {
                type: "FM",
                effects: "chorus & reverb",
                transition: "hard",
                chord: "harmony",
                filterCutoffHz: 2828,
                filterResonance: 14,
                filterEnvelope: "punch",
                vibrato: "none",
                algorithm: "1←(2 3←4)",
                feedbackType: "1⟲",
                feedbackAmplitude: 2,
                feedbackEnvelope: "steady",
                operators: [
                  { frequency: "~2×", amplitude: 11, envelope: "custom" },
                  { frequency: "~1×", amplitude: 5, envelope: "steady" },
                  { frequency: "11×", amplitude: 2, envelope: "steady" },
                  { frequency: "16×", amplitude: 5, envelope: "swell 3" },
                ],
              },
            },
            {
              name: "dark choir",
              midiProgram: 85,
              settings: {
                type: "spectrum",
                effects: "reverb",
                transition: "soft",
                chord: "harmony",
                filterCutoffHz: 4e3,
                filterResonance: 29,
                filterEnvelope: "swell 1",
                spectrum: [
                  43, 14, 14, 14, 14, 14, 14, 100, 14, 14, 14, 57, 14, 14, 100,
                  14, 43, 14, 43, 14, 14, 43, 14, 29, 14, 29, 14, 14, 29, 0,
                ],
              },
            },
          ]),
        },
        {
          name: "Brass Presets",
          presets: g([
            {
              name: "trumpet",
              midiProgram: 56,
              generalMidi: !0,
              settings: {
                type: "FM",
                effects: "reverb",
                transition: "soft",
                chord: "harmony",
                filterCutoffHz: 2828,
                filterResonance: 43,
                filterEnvelope: "steady",
                vibrato: "none",
                algorithm: "1←(2 3 4)",
                feedbackType: "1⟲",
                feedbackAmplitude: 9,
                feedbackEnvelope: "swell 1",
                operators: [
                  { frequency: "1×", amplitude: 14, envelope: "custom" },
                  { frequency: "1×", amplitude: 8, envelope: "steady" },
                  { frequency: "1×", amplitude: 5, envelope: "flare 2" },
                  { frequency: "1×", amplitude: 0, envelope: "steady" },
                ],
              },
            },
            {
              name: "trombone",
              midiProgram: 57,
              generalMidi: !0,
              settings: {
                type: "FM",
                effects: "reverb",
                transition: "soft",
                chord: "harmony",
                filterCutoffHz: 2e3,
                filterResonance: 43,
                filterEnvelope: "steady",
                vibrato: "none",
                algorithm: "1←(2 3 4)",
                feedbackType: "2⟲",
                feedbackAmplitude: 7,
                feedbackEnvelope: "swell 1",
                operators: [
                  { frequency: "1×", amplitude: 14, envelope: "custom" },
                  { frequency: "1×", amplitude: 8, envelope: "steady" },
                  { frequency: "1×", amplitude: 0, envelope: "steady" },
                  { frequency: "1×", amplitude: 0, envelope: "steady" },
                ],
              },
            },
            {
              name: "tuba",
              midiProgram: 58,
              generalMidi: !0,
              settings: {
                type: "FM",
                effects: "reverb",
                transition: "soft",
                chord: "harmony",
                filterCutoffHz: 2e3,
                filterResonance: 43,
                filterEnvelope: "steady",
                vibrato: "none",
                algorithm: "1←(2 3 4)",
                feedbackType: "2⟲",
                feedbackAmplitude: 8,
                feedbackEnvelope: "swell 1",
                operators: [
                  { frequency: "1×", amplitude: 14, envelope: "custom" },
                  { frequency: "1×", amplitude: 6, envelope: "steady" },
                  { frequency: "1×", amplitude: 0, envelope: "steady" },
                  { frequency: "1×", amplitude: 0, envelope: "steady" },
                ],
              },
            },
            {
              name: "muted trumpet",
              midiProgram: 59,
              generalMidi: !0,
              settings: {
                type: "FM",
                eqFilter: [
                  { type: "low-pass", cutoffHz: 8e3, linearGain: 2.8284 },
                  { type: "peak", cutoffHz: 4e3, linearGain: 2.8284 },
                ],
                effects: ["note filter", "reverb"],
                noteFilter: [
                  { type: "low-pass", cutoffHz: 3363.59, linearGain: 1 },
                ],
                reverb: 33,
                fadeInSeconds: 0.0263,
                fadeOutTicks: -3,
                algorithm: "1←(2 3←4)",
                feedbackType: "1⟲",
                feedbackAmplitude: 5,
                operators: [
                  { frequency: "1×", amplitude: 13 },
                  { frequency: "1×", amplitude: 5 },
                  { frequency: "9×", amplitude: 5 },
                  { frequency: "13×", amplitude: 7 },
                ],
                envelopes: [
                  { target: "noteFilterAllFreqs", envelope: "swell 1" },
                  {
                    target: "operatorAmplitude",
                    envelope: "swell 1",
                    index: 3,
                  },
                  { target: "feedbackAmplitude", envelope: "flare 2" },
                ],
              },
            },
            {
              name: "french horn",
              midiProgram: 60,
              generalMidi: !0,
              settings: {
                type: "FM",
                eqFilter: [
                  { type: "low-pass", cutoffHz: 4e3, linearGain: 1 },
                  { type: "peak", cutoffHz: 2378.41, linearGain: 2.8284 },
                ],
                effects: ["reverb"],
                reverb: 33,
                fadeInSeconds: 0.0263,
                fadeOutTicks: -3,
                algorithm: "1←3 2←4",
                feedbackType: "1⟲ 2⟲",
                feedbackAmplitude: 3,
                operators: [
                  { frequency: "1×", amplitude: 15 },
                  { frequency: "1×", amplitude: 12 },
                  { frequency: "1×", amplitude: 10 },
                  { frequency: "~1×", amplitude: 8 },
                ],
                envelopes: [
                  {
                    target: "operatorAmplitude",
                    envelope: "swell 1",
                    index: 2,
                  },
                  {
                    target: "operatorAmplitude",
                    envelope: "flare 2",
                    index: 3,
                  },
                  { target: "feedbackAmplitude", envelope: "swell 1" },
                ],
              },
            },
            {
              name: "brass section",
              midiProgram: 61,
              generalMidi: !0,
              settings: {
                type: "FM",
                effects: "reverb",
                transition: "soft",
                chord: "harmony",
                filterCutoffHz: 2828,
                filterResonance: 14,
                filterEnvelope: "punch",
                vibrato: "none",
                algorithm: "1←3 2←4",
                feedbackType: "1⟲ 2⟲",
                feedbackAmplitude: 6,
                feedbackEnvelope: "swell 1",
                operators: [
                  { frequency: "1×", amplitude: 14, envelope: "custom" },
                  { frequency: "1×", amplitude: 12, envelope: "custom" },
                  { frequency: "1×", amplitude: 10, envelope: "swell 1" },
                  { frequency: "~1×", amplitude: 10, envelope: "swell 1" },
                ],
              },
            },
            {
              name: "brass synth 1",
              midiProgram: 62,
              generalMidi: !0,
              settings: {
                type: "FM",
                effects: "reverb",
                transition: "soft",
                chord: "harmony",
                filterCutoffHz: 4e3,
                filterResonance: 29,
                filterEnvelope: "steady",
                vibrato: "none",
                algorithm: "1←3 2←4",
                feedbackType: "1⟲ 2⟲",
                feedbackAmplitude: 11,
                feedbackEnvelope: "swell 1",
                operators: [
                  { frequency: "1×", amplitude: 14, envelope: "custom" },
                  { frequency: "1×", amplitude: 14, envelope: "custom" },
                  { frequency: "1×", amplitude: 12, envelope: "flare 1" },
                  { frequency: "~1×", amplitude: 8, envelope: "flare 2" },
                ],
              },
            },
            {
              name: "brass synth 2",
              midiProgram: 63,
              generalMidi: !0,
              settings: {
                type: "FM",
                transition: "soft",
                effects: "reverb",
                chord: "harmony",
                filterCutoffHz: 4e3,
                filterResonance: 43,
                filterEnvelope: "twang 3",
                vibrato: "none",
                algorithm: "1←3 2←4",
                feedbackType: "1⟲ 2⟲",
                feedbackAmplitude: 9,
                feedbackEnvelope: "swell 1",
                operators: [
                  { frequency: "1×", amplitude: 15, envelope: "custom" },
                  { frequency: "1×", amplitude: 15, envelope: "custom" },
                  { frequency: "1×", amplitude: 10, envelope: "flare 1" },
                  { frequency: "~1×", amplitude: 7, envelope: "flare 1" },
                ],
              },
            },
            {
              name: "pulse brass",
              midiProgram: 62,
              settings: {
                type: "PWM",
                effects: "reverb",
                transition: "soft",
                chord: "harmony",
                filterCutoffHz: 4e3,
                filterResonance: 29,
                filterEnvelope: "swell 1",
                pulseWidth: 50,
                pulseEnvelope: "flare 3",
                vibrato: "none",
              },
            },
          ]),
        },
        {
          name: "Reed Presets",
          presets: g([
            {
              name: "soprano sax",
              midiProgram: 64,
              generalMidi: !0,
              settings: {
                type: "FM",
                effects: "reverb",
                transition: "soft",
                chord: "harmony",
                filterCutoffHz: 2e3,
                filterResonance: 29,
                filterEnvelope: "steady",
                vibrato: "none",
                algorithm: "1←2←3←4",
                feedbackType: "4⟲",
                feedbackAmplitude: 5,
                feedbackEnvelope: "swell 1",
                operators: [
                  { frequency: "1×", amplitude: 13, envelope: "custom" },
                  { frequency: "4×", amplitude: 4, envelope: "swell 1" },
                  { frequency: "1×", amplitude: 7, envelope: "steady" },
                  { frequency: "5×", amplitude: 4, envelope: "punch" },
                ],
              },
            },
            {
              name: "alto sax",
              midiProgram: 65,
              generalMidi: !0,
              settings: {
                type: "FM",
                effects: "reverb",
                transition: "soft",
                chord: "harmony",
                filterCutoffHz: 2e3,
                filterResonance: 43,
                filterEnvelope: "steady",
                vibrato: "none",
                algorithm: "1←(2 3←4)",
                feedbackType: "1⟲",
                feedbackAmplitude: 4,
                feedbackEnvelope: "punch",
                operators: [
                  { frequency: "1×", amplitude: 13, envelope: "custom" },
                  { frequency: "1×", amplitude: 6, envelope: "steady" },
                  { frequency: "4×", amplitude: 6, envelope: "swell 1" },
                  { frequency: "1×", amplitude: 12, envelope: "steady" },
                ],
              },
            },
            {
              name: "tenor sax",
              midiProgram: 66,
              generalMidi: !0,
              settings: {
                type: "FM",
                effects: "reverb",
                transition: "soft",
                chord: "harmony",
                filterCutoffHz: 2828,
                filterResonance: 29,
                filterEnvelope: "steady",
                vibrato: "none",
                algorithm: "1←2←3←4",
                feedbackType: "1⟲",
                feedbackAmplitude: 6,
                feedbackEnvelope: "swell 1",
                operators: [
                  { frequency: "2×", amplitude: 12, envelope: "custom" },
                  { frequency: "3×", amplitude: 7, envelope: "steady" },
                  { frequency: "1×", amplitude: 3, envelope: "steady" },
                  { frequency: "8×", amplitude: 3, envelope: "steady" },
                ],
              },
            },
            {
              name: "baritone sax",
              midiProgram: 67,
              generalMidi: !0,
              settings: {
                type: "FM",
                effects: "reverb",
                transition: "soft",
                chord: "harmony",
                filterCutoffHz: 2828,
                filterResonance: 0,
                filterEnvelope: "steady",
                vibrato: "none",
                algorithm: "1←(2 3←4)",
                feedbackType: "1⟲",
                feedbackAmplitude: 2,
                feedbackEnvelope: "swell 2",
                operators: [
                  { frequency: "1×", amplitude: 12, envelope: "custom" },
                  { frequency: "8×", amplitude: 4, envelope: "steady" },
                  { frequency: "4×", amplitude: 5, envelope: "steady" },
                  { frequency: "1×", amplitude: 4, envelope: "punch" },
                ],
              },
            },
            {
              name: "sax synth",
              midiProgram: 64,
              settings: {
                type: "FM",
                effects: "reverb",
                transition: "soft",
                chord: "harmony",
                filterCutoffHz: 8e3,
                filterResonance: 0,
                filterEnvelope: "steady",
                vibrato: "light",
                algorithm: "1←(2 3 4)",
                feedbackType: "1⟲ 2⟲",
                feedbackAmplitude: 4,
                feedbackEnvelope: "steady",
                operators: [
                  { frequency: "4×", amplitude: 15, envelope: "custom" },
                  { frequency: "1×", amplitude: 15, envelope: "steady" },
                  { frequency: "1×", amplitude: 0, envelope: "steady" },
                  { frequency: "1×", amplitude: 0, envelope: "steady" },
                ],
              },
            },
            {
              name: "shehnai",
              midiProgram: 111,
              generalMidi: !0,
              settings: {
                type: "FM",
                effects: "reverb",
                transition: "soft",
                chord: "harmony",
                filterCutoffHz: 8e3,
                filterResonance: 0,
                filterEnvelope: "steady",
                vibrato: "light",
                algorithm: "1←(2 3 4)",
                feedbackType: "1⟲",
                feedbackAmplitude: 3,
                feedbackEnvelope: "steady",
                operators: [
                  { frequency: "4×", amplitude: 15, envelope: "custom" },
                  { frequency: "1×", amplitude: 8, envelope: "steady" },
                  { frequency: "1×", amplitude: 0, envelope: "steady" },
                  { frequency: "1×", amplitude: 0, envelope: "steady" },
                ],
              },
            },
            {
              name: "oboe",
              midiProgram: 68,
              generalMidi: !0,
              settings: {
                type: "FM",
                effects: "reverb",
                transition: "cross fade",
                chord: "harmony",
                filterCutoffHz: 4e3,
                filterResonance: 14,
                filterEnvelope: "swell 1",
                vibrato: "none",
                algorithm: "1 2←(3 4)",
                feedbackType: "2⟲",
                feedbackAmplitude: 2,
                feedbackEnvelope: "tremolo5",
                operators: [
                  { frequency: "1×", amplitude: 7, envelope: "custom" },
                  { frequency: "4×", amplitude: 12, envelope: "custom" },
                  { frequency: "1×", amplitude: 6, envelope: "steady" },
                  { frequency: "6×", amplitude: 2, envelope: "steady" },
                ],
              },
            },
            {
              name: "english horn",
              midiProgram: 69,
              generalMidi: !0,
              settings: {
                type: "FM",
                effects: "reverb",
                transition: "cross fade",
                chord: "harmony",
                filterCutoffHz: 2e3,
                filterResonance: 14,
                filterEnvelope: "steady",
                vibrato: "none",
                algorithm: "1 2←(3 4)",
                feedbackType: "2⟲",
                feedbackAmplitude: 2,
                feedbackEnvelope: "steady",
                operators: [
                  { frequency: "4×", amplitude: 12, envelope: "custom" },
                  { frequency: "2×", amplitude: 10, envelope: "custom" },
                  { frequency: "1×", amplitude: 8, envelope: "punch" },
                  { frequency: "8×", amplitude: 4, envelope: "steady" },
                ],
              },
            },
            {
              name: "bassoon",
              midiProgram: 70,
              generalMidi: !0,
              settings: {
                type: "FM",
                effects: "reverb",
                transition: "soft",
                chord: "harmony",
                filterCutoffHz: 707,
                filterResonance: 57,
                filterEnvelope: "steady",
                vibrato: "none",
                algorithm: "1←(2 3←4)",
                feedbackType: "1⟲",
                feedbackAmplitude: 2,
                feedbackEnvelope: "steady",
                operators: [
                  { frequency: "2×", amplitude: 11, envelope: "custom" },
                  { frequency: "1×", amplitude: 6, envelope: "steady" },
                  { frequency: "6×", amplitude: 6, envelope: "swell 1" },
                  { frequency: "1×", amplitude: 0, envelope: "steady" },
                ],
              },
            },
            {
              name: "clarinet",
              midiProgram: 71,
              generalMidi: !0,
              settings: {
                type: "harmonics",
                effects: "reverb",
                transition: "soft",
                chord: "harmony",
                filterCutoffHz: 1414,
                filterResonance: 14,
                filterEnvelope: "steady",
                interval: "union",
                vibrato: "none",
                harmonics: [
                  100, 43, 86, 57, 86, 71, 86, 71, 71, 71, 71, 71, 71, 43, 71,
                  71, 57, 57, 57, 57, 57, 57, 43, 43, 43, 29, 14, 0,
                ],
              },
            },
            {
              name: "harmonica",
              midiProgram: 22,
              generalMidi: !0,
              settings: {
                type: "FM",
                effects: "reverb",
                transition: "soft",
                chord: "harmony",
                filterCutoffHz: 5657,
                filterResonance: 29,
                filterEnvelope: "swell 1",
                vibrato: "none",
                algorithm: "1←(2 3←4)",
                feedbackType: "1⟲",
                feedbackAmplitude: 9,
                feedbackEnvelope: "tremolo5",
                operators: [
                  { frequency: "2×", amplitude: 14, envelope: "custom" },
                  { frequency: "1×", amplitude: 15, envelope: "steady" },
                  { frequency: "~2×", amplitude: 2, envelope: "twang 3" },
                  { frequency: "1×", amplitude: 0, envelope: "steady" },
                ],
              },
            },
          ]),
        },
        {
          name: "Flute Presets",
          presets: g([
            {
              name: "flute 1",
              midiProgram: 73,
              generalMidi: !0,
              settings: {
                type: "FM",
                effects: "reverb",
                transition: "soft",
                chord: "harmony",
                filterCutoffHz: 5657,
                filterResonance: 14,
                filterEnvelope: "steady",
                vibrato: "none",
                algorithm: "1←(2 3 4)",
                feedbackType: "4⟲",
                feedbackAmplitude: 7,
                feedbackEnvelope: "decay 2",
                operators: [
                  { frequency: "1×", amplitude: 15, envelope: "custom" },
                  { frequency: "2×", amplitude: 4, envelope: "steady" },
                  { frequency: "1×", amplitude: 3, envelope: "steady" },
                  { frequency: "~1×", amplitude: 1, envelope: "punch" },
                ],
              },
            },
            {
              name: "recorder",
              midiProgram: 74,
              generalMidi: !0,
              settings: {
                type: "harmonics",
                effects: "reverb",
                transition: "soft",
                chord: "harmony",
                filterCutoffHz: 4e3,
                filterResonance: 29,
                filterEnvelope: "swell 2",
                interval: "union",
                vibrato: "none",
                harmonics: [
                  100, 43, 57, 43, 57, 43, 43, 43, 43, 43, 43, 43, 43, 29, 29,
                  29, 29, 29, 29, 29, 14, 14, 14, 14, 14, 14, 14, 0,
                ],
              },
            },
            {
              name: "whistle",
              midiProgram: 78,
              generalMidi: !0,
              settings: {
                type: "harmonics",
                effects: "chorus & reverb",
                transition: "soft",
                chord: "harmony",
                filterCutoffHz: 2e3,
                filterResonance: 43,
                filterEnvelope: "steady",
                interval: "union",
                vibrato: "delayed",
                harmonics: [
                  100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0, 0, 0,
                ],
              },
            },
            {
              name: "ocarina",
              midiProgram: 79,
              generalMidi: !0,
              settings: {
                type: "harmonics",
                effects: "reverb",
                transition: "soft",
                chord: "harmony",
                filterCutoffHz: 2828,
                filterResonance: 43,
                filterEnvelope: "steady",
                interval: "union",
                vibrato: "none",
                harmonics: [
                  100, 14, 57, 14, 29, 14, 14, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                ],
              },
            },
            {
              name: "piccolo",
              midiProgram: 72,
              generalMidi: !0,
              settings: {
                type: "FM",
                effects: "reverb",
                transition: "soft",
                chord: "harmony",
                filterCutoffHz: 5657,
                filterResonance: 43,
                filterEnvelope: "steady",
                vibrato: "none",
                algorithm: "1←3 2←4",
                feedbackType: "4⟲",
                feedbackAmplitude: 15,
                feedbackEnvelope: "twang 1",
                operators: [
                  { frequency: "1×", amplitude: 15, envelope: "custom" },
                  { frequency: "1×", amplitude: 10, envelope: "custom" },
                  { frequency: "~2×", amplitude: 3, envelope: "punch" },
                  { frequency: "~1×", amplitude: 5, envelope: "punch" },
                ],
              },
            },
            {
              name: "shakuhachi",
              midiProgram: 77,
              generalMidi: !0,
              settings: {
                type: "FM",
                effects: "chorus & reverb",
                transition: "soft",
                chord: "harmony",
                filterCutoffHz: 4e3,
                filterResonance: 14,
                filterEnvelope: "steady",
                vibrato: "delayed",
                algorithm: "1←(2 3←4)",
                feedbackType: "3→4",
                feedbackAmplitude: 15,
                feedbackEnvelope: "steady",
                operators: [
                  { frequency: "1×", amplitude: 15, envelope: "custom" },
                  { frequency: "2×", amplitude: 3, envelope: "punch" },
                  { frequency: "~1×", amplitude: 4, envelope: "twang 1" },
                  { frequency: "20×", amplitude: 15, envelope: "steady" },
                ],
              },
            },
            {
              name: "pan flute",
              midiProgram: 75,
              generalMidi: !0,
              settings: {
                type: "spectrum",
                eqFilter: [
                  { type: "low-pass", cutoffHz: 9513.66, linearGain: 5.6569 },
                ],
                effects: ["note filter", "reverb"],
                noteFilter: [
                  { type: "high-pass", cutoffHz: 4756.83, linearGain: 0.7071 },
                ],
                reverb: 33,
                fadeInSeconds: 0.0125,
                fadeOutTicks: -3,
                spectrum: [
                  100, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 71, 0, 0, 14, 0, 57, 0,
                  29, 14, 29, 14, 14, 29, 14, 29, 14, 14, 29, 14,
                ],
                envelopes: [
                  { target: "noteFilterFreq", envelope: "twang 1", index: 0 },
                  { target: "noteVolume", envelope: "punch" },
                ],
              },
            },
            {
              name: "blown bottle",
              midiProgram: 76,
              generalMidi: !0,
              settings: {
                type: "FM",
                effects: "chorus & reverb",
                transition: "cross fade",
                chord: "harmony",
                filterCutoffHz: 5657,
                filterResonance: 57,
                filterEnvelope: "steady",
                vibrato: "none",
                algorithm: "1 2 3 4",
                feedbackType: "1⟲ 2⟲ 3⟲ 4⟲",
                feedbackAmplitude: 7,
                feedbackEnvelope: "twang 1",
                operators: [
                  { frequency: "1×", amplitude: 15, envelope: "custom" },
                  { frequency: "3×", amplitude: 4, envelope: "custom" },
                  { frequency: "6×", amplitude: 2, envelope: "custom" },
                  { frequency: "11×", amplitude: 2, envelope: "custom" },
                ],
              },
            },
            {
              name: "calliope",
              midiProgram: 82,
              generalMidi: !0,
              settings: {
                type: "spectrum",
                transition: "cross fade",
                effects: "reverb",
                chord: "harmony",
                filterCutoffHz: 5657,
                filterResonance: 14,
                filterEnvelope: "steady",
                spectrum: [
                  100, 0, 0, 0, 0, 0, 0, 86, 0, 0, 0, 71, 0, 0, 57, 0, 43, 0,
                  29, 14, 14, 29, 14, 14, 14, 14, 14, 14, 14, 14,
                ],
              },
            },
            {
              name: "chiffer",
              midiProgram: 83,
              generalMidi: !0,
              settings: {
                type: "spectrum",
                effects: "reverb",
                transition: "hard",
                chord: "harmony",
                filterCutoffHz: 2e3,
                filterResonance: 14,
                filterEnvelope: "punch",
                spectrum: [
                  86, 0, 0, 0, 0, 0, 0, 71, 0, 0, 0, 71, 0, 0, 57, 0, 57, 0, 43,
                  14, 14, 43, 14, 29, 14, 29, 29, 29, 29, 14,
                ],
              },
            },
            {
              name: "breath noise",
              midiProgram: 121,
              generalMidi: !0,
              settings: {
                type: "spectrum",
                eqFilter: [],
                effects: ["chord type", "note filter", "reverb"],
                chord: "strum",
                noteFilter: [
                  { type: "high-pass", cutoffHz: 840.9, linearGain: 0.3536 },
                  { type: "low-pass", cutoffHz: 16e3, linearGain: 0.3536 },
                ],
                reverb: 33,
                fadeInSeconds: 0.0413,
                fadeOutTicks: 12,
                spectrum: [
                  71, 0, 0, 0, 0, 0, 0, 29, 0, 0, 0, 71, 0, 0, 29, 0, 100, 29,
                  14, 29, 100, 29, 100, 14, 14, 71, 0, 29, 0, 0,
                ],
                envelopes: [
                  { target: "noteFilterAllFreqs", envelope: "twang 1" },
                ],
              },
            },
            {
              name: "flute 2",
              midiProgram: 73,
              generalMidi: !0,
              settings: {
                type: "harmonics",
                effects: "reverb",
                transition: "seamless",
                chord: "harmony",
                filterCutoffHz: 1414,
                filterResonance: 14,
                filterEnvelope: "steady",
                interval: "union",
                vibrato: "delayed",
                harmonics: [
                  100, 43, 86, 57, 86, 71, 86, 71, 71, 71, 71, 71, 71, 43, 71,
                  71, 57, 57, 57, 57, 57, 57, 43, 43, 43, 29, 14, 0,
                ],
              },
            },
          ]),
        },
        {
          name: "Pad Presets",
          presets: g([
            {
              name: "new age pad",
              midiProgram: 88,
              generalMidi: !0,
              settings: {
                type: "FM",
                eqFilter: [],
                effects: ["chorus"],
                chorus: 100,
                transition: "normal",
                fadeInSeconds: 0,
                fadeOutTicks: 48,
                chord: "simultaneous",
                algorithm: "1←(2 3←4)",
                feedbackType: "1⟲ 2⟲",
                feedbackAmplitude: 3,
                operators: [
                  { frequency: "2×", amplitude: 14 },
                  { frequency: "~1×", amplitude: 4 },
                  { frequency: "6×", amplitude: 3 },
                  { frequency: "13×", amplitude: 3 },
                ],
                envelopes: [
                  {
                    target: "operatorAmplitude",
                    envelope: "swell 2",
                    index: 1,
                  },
                  {
                    target: "operatorAmplitude",
                    envelope: "twang 3",
                    index: 2,
                  },
                  { target: "feedbackAmplitude", envelope: "swell 3" },
                ],
              },
            },
            {
              name: "warm pad",
              midiProgram: 89,
              generalMidi: !0,
              settings: {
                type: "FM",
                eqFilter: [],
                effects: ["note filter", "chorus"],
                noteFilter: [
                  { type: "low-pass", cutoffHz: 3363.59, linearGain: 1 },
                ],
                chorus: 100,
                transition: "normal",
                fadeInSeconds: 0.0575,
                fadeOutTicks: 96,
                chord: "simultaneous",
                algorithm: "1←(2 3 4)",
                feedbackType: "1⟲",
                feedbackAmplitude: 7,
                operators: [
                  { frequency: "1×", amplitude: 14 },
                  { frequency: "1×", amplitude: 6 },
                  { frequency: "1×", amplitude: 0 },
                  { frequency: "1×", amplitude: 0 },
                ],
                envelopes: [
                  { target: "noteFilterAllFreqs", envelope: "swell 3" },
                  {
                    target: "operatorAmplitude",
                    envelope: "swell 1",
                    index: 1,
                  },
                ],
              },
            },
            {
              name: "polysynth pad",
              midiProgram: 90,
              generalMidi: !0,
              settings: {
                type: "chip",
                eqFilter: [],
                effects: ["vibrato", "note filter", "chorus"],
                vibrato: "delayed",
                noteFilter: [
                  { type: "low-pass", cutoffHz: 2828.43, linearGain: 1 },
                ],
                chorus: 100,
                transition: "normal",
                fadeInSeconds: 0,
                fadeOutTicks: 48,
                chord: "simultaneous",
                wave: "sawtooth",
                unison: "honky tonk",
                envelopes: [
                  { target: "noteFilterAllFreqs", envelope: "twang 3" },
                ],
              },
            },
            {
              name: "space voice pad",
              midiProgram: 91,
              generalMidi: !0,
              settings: {
                type: "FM",
                eqFilter: [
                  { type: "low-pass", cutoffHz: 6727.17, linearGain: 5.6569 },
                  { type: "peak", cutoffHz: 2828.43, linearGain: 5.6569 },
                  { type: "peak", cutoffHz: 1414.21, linearGain: 0.1768 },
                ],
                effects: ["chorus"],
                chorus: 100,
                transition: "normal",
                fadeInSeconds: 0.0125,
                fadeOutTicks: 72,
                chord: "simultaneous",
                algorithm: "(1 2 3)←4",
                feedbackType: "1⟲ 2⟲ 3⟲ 4⟲",
                feedbackAmplitude: 5,
                operators: [
                  { frequency: "1×", amplitude: 10 },
                  { frequency: "2×", amplitude: 8 },
                  { frequency: "3×", amplitude: 7 },
                  { frequency: "11×", amplitude: 2 },
                ],
                envelopes: [
                  { target: "operatorAmplitude", envelope: "punch", index: 3 },
                  { target: "feedbackAmplitude", envelope: "swell 2" },
                ],
              },
            },
            {
              name: "bowed glass pad",
              midiProgram: 92,
              generalMidi: !0,
              settings: {
                type: "FM",
                eqFilter: [],
                effects: ["note filter"],
                noteFilter: [
                  { type: "low-pass", cutoffHz: 4756.83, linearGain: 0.5 },
                ],
                transition: "normal",
                fadeInSeconds: 0.0575,
                fadeOutTicks: 96,
                chord: "simultaneous",
                algorithm: "1←3 2←4",
                feedbackType: "1⟲ 2⟲",
                feedbackAmplitude: 0,
                operators: [
                  { frequency: "1×", amplitude: 10 },
                  { frequency: "2×", amplitude: 12 },
                  { frequency: "3×", amplitude: 7 },
                  { frequency: "7×", amplitude: 4 },
                ],
                envelopes: [
                  { target: "noteFilterAllFreqs", envelope: "twang 3" },
                  {
                    target: "operatorAmplitude",
                    envelope: "twang 3",
                    index: 2,
                  },
                  {
                    target: "operatorAmplitude",
                    envelope: "flare 3",
                    index: 3,
                  },
                ],
              },
            },
            {
              name: "metallic pad",
              midiProgram: 93,
              generalMidi: !0,
              settings: {
                type: "FM",
                eqFilter: [],
                effects: ["note filter"],
                noteFilter: [
                  { type: "low-pass", cutoffHz: 6727.17, linearGain: 0.5 },
                ],
                transition: "normal",
                fadeInSeconds: 0.0125,
                fadeOutTicks: 72,
                chord: "simultaneous",
                algorithm: "1←3 2←4",
                feedbackType: "1⟲ 2⟲",
                feedbackAmplitude: 13,
                operators: [
                  { frequency: "1×", amplitude: 15 },
                  { frequency: "~1×", amplitude: 9 },
                  { frequency: "1×", amplitude: 7 },
                  { frequency: "11×", amplitude: 7 },
                ],
                envelopes: [
                  { target: "noteFilterAllFreqs", envelope: "twang 3" },
                  {
                    target: "operatorAmplitude",
                    envelope: "swell 2",
                    index: 2,
                  },
                  { target: "feedbackAmplitude", envelope: "twang 3" },
                ],
              },
            },
            {
              name: "sweep pad",
              midiProgram: 95,
              generalMidi: !0,
              settings: {
                type: "chip",
                eqFilter: [],
                effects: ["note filter", "chorus"],
                noteFilter: [
                  { type: "low-pass", cutoffHz: 4e3, linearGain: 4 },
                ],
                chorus: 100,
                transition: "normal",
                fadeInSeconds: 0.0575,
                fadeOutTicks: 96,
                chord: "simultaneous",
                wave: "sawtooth",
                unison: "hum",
                envelopes: [
                  { target: "noteFilterAllFreqs", envelope: "flare 3" },
                ],
              },
            },
            {
              name: "atmosphere",
              midiProgram: 99,
              generalMidi: !0,
              settings: {
                type: "FM",
                eqFilter: [
                  { type: "low-pass", cutoffHz: 4756.83, linearGain: 1 },
                ],
                effects: ["chorus", "reverb"],
                chorus: 100,
                reverb: 33,
                transition: "normal",
                fadeInSeconds: 0,
                fadeOutTicks: 48,
                chord: "strum",
                algorithm: "1←(2 3 4)",
                feedbackType: "3⟲ 4⟲",
                feedbackAmplitude: 3,
                operators: [
                  { frequency: "1×", amplitude: 14 },
                  { frequency: "~1×", amplitude: 10 },
                  { frequency: "3×", amplitude: 7 },
                  { frequency: "1×", amplitude: 7 },
                ],
                envelopes: [
                  {
                    target: "operatorAmplitude",
                    envelope: "swell 3",
                    index: 1,
                  },
                  {
                    target: "operatorAmplitude",
                    envelope: "twang 2",
                    index: 2,
                  },
                  {
                    target: "operatorAmplitude",
                    envelope: "twang 3",
                    index: 3,
                  },
                ],
              },
            },
            {
              name: "brightness",
              midiProgram: 100,
              generalMidi: !0,
              settings: {
                type: "Picked String",
                eqFilter: [
                  { type: "low-pass", cutoffHz: 4756.83, linearGain: 2 },
                ],
                effects: ["chorus"],
                chorus: 100,
                transition: "normal",
                fadeInSeconds: 0.0125,
                fadeOutTicks: 72,
                chord: "simultaneous",
                harmonics: [
                  100, 86, 86, 86, 43, 57, 43, 71, 43, 43, 43, 57, 43, 43, 57,
                  71, 57, 43, 29, 43, 57, 57, 43, 29, 29, 29, 29, 14,
                ],
                unison: "octave",
                stringSustain: 86,
                envelopes: [],
              },
            },
            {
              name: "goblins",
              midiProgram: 101,
              generalMidi: !0,
              settings: {
                type: "FM",
                eqFilter: [
                  { type: "peak", cutoffHz: 2828.43, linearGain: 11.3137 },
                ],
                effects: ["note filter", "chorus"],
                noteFilter: [
                  { type: "low-pass", cutoffHz: 1681.79, linearGain: 0.5 },
                ],
                chorus: 100,
                transition: "normal",
                fadeInSeconds: 0.0575,
                fadeOutTicks: 96,
                chord: "simultaneous",
                algorithm: "1←2←3←4",
                feedbackType: "1⟲",
                feedbackAmplitude: 10,
                operators: [
                  { frequency: "1×", amplitude: 15 },
                  { frequency: "4×", amplitude: 5 },
                  { frequency: "1×", amplitude: 10 },
                  { frequency: "1×", amplitude: 0 },
                ],
                envelopes: [
                  { target: "noteFilterAllFreqs", envelope: "swell 2" },
                  {
                    target: "operatorAmplitude",
                    envelope: "swell 3",
                    index: 1,
                  },
                  {
                    target: "operatorAmplitude",
                    envelope: "tremolo1",
                    index: 2,
                  },
                  { target: "feedbackAmplitude", envelope: "flare 3" },
                ],
              },
            },
            {
              name: "sci-fi",
              midiProgram: 103,
              generalMidi: !0,
              settings: {
                type: "FM",
                eqFilter: [
                  { type: "peak", cutoffHz: 9513.66, linearGain: 2.8284 },
                ],
                effects: ["note filter", "chorus"],
                noteFilter: [
                  { type: "low-pass", cutoffHz: 6727.17, linearGain: 0.5 },
                ],
                chorus: 100,
                transition: "normal",
                fadeInSeconds: 0.0125,
                fadeOutTicks: 48,
                chord: "simultaneous",
                algorithm: "(1 2)←3←4",
                feedbackType: "1⟲ 2⟲ 3⟲ 4⟲",
                feedbackAmplitude: 8,
                operators: [
                  { frequency: "~1×", amplitude: 13 },
                  { frequency: "2×", amplitude: 10 },
                  { frequency: "5×", amplitude: 5 },
                  { frequency: "11×", amplitude: 8 },
                ],
                envelopes: [
                  { target: "noteFilterAllFreqs", envelope: "twang 3" },
                  {
                    target: "operatorAmplitude",
                    envelope: "twang 3",
                    index: 2,
                  },
                  {
                    target: "operatorAmplitude",
                    envelope: "tremolo5",
                    index: 3,
                  },
                  { target: "feedbackAmplitude", envelope: "twang 3" },
                ],
              },
            },
            {
              name: "flutter pad",
              midiProgram: 90,
              settings: {
                type: "FM",
                eqFilter: [],
                effects: ["vibrato", "note filter", "chorus"],
                vibrato: "delayed",
                noteFilter: [
                  { type: "low-pass", cutoffHz: 4e3, linearGain: 4 },
                ],
                chorus: 100,
                transition: "normal",
                fadeInSeconds: 0,
                fadeOutTicks: 48,
                chord: "simultaneous",
                algorithm: "(1 2)←(3 4)",
                feedbackType: "1⟲ 2⟲ 3⟲",
                feedbackAmplitude: 9,
                operators: [
                  { frequency: "1×", amplitude: 13 },
                  { frequency: "5×", amplitude: 7 },
                  { frequency: "7×", amplitude: 5 },
                  { frequency: "~1×", amplitude: 6 },
                ],
                envelopes: [
                  { target: "noteFilterAllFreqs", envelope: "twang 3" },
                  {
                    target: "operatorAmplitude",
                    envelope: "tremolo1",
                    index: 2,
                  },
                  { target: "operatorAmplitude", envelope: "punch", index: 3 },
                ],
              },
            },
            {
              name: "feedback pad",
              midiProgram: 89,
              settings: {
                type: "FM",
                eqFilter: [{ type: "peak", cutoffHz: 2378.41, linearGain: 8 }],
                effects: [],
                transition: "normal",
                fadeInSeconds: 0.0575,
                fadeOutTicks: 96,
                chord: "custom interval",
                algorithm: "1 2 3 4",
                feedbackType: "1⟲ 2⟲ 3⟲ 4⟲",
                feedbackAmplitude: 8,
                operators: [
                  { frequency: "1×", amplitude: 15 },
                  { frequency: "1×", amplitude: 15 },
                  { frequency: "1×", amplitude: 15 },
                  { frequency: "~1×", amplitude: 15 },
                ],
                envelopes: [
                  { target: "feedbackAmplitude", envelope: "swell 2" },
                ],
              },
            },
          ]),
        },
        {
          name: "Drum Presets",
          presets: g([
            {
              name: "standard drumset",
              midiProgram: 116,
              isNoise: !0,
              settings: {
                type: "drumset",
                effects: "reverb",
                drums: [
                  {
                    filterEnvelope: "twang 1",
                    spectrum: [
                      57, 71, 71, 86, 86, 86, 71, 71, 71, 71, 57, 57, 57, 57,
                      43, 43, 43, 43, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29,
                      29, 29,
                    ],
                  },
                  {
                    filterEnvelope: "twang 1",
                    spectrum: [
                      0, 0, 0, 100, 71, 71, 57, 86, 57, 57, 57, 71, 43, 43, 57,
                      43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43,
                      43,
                    ],
                  },
                  {
                    filterEnvelope: "twang 1",
                    spectrum: [
                      0, 0, 0, 0, 100, 57, 43, 43, 29, 57, 43, 29, 71, 43, 43,
                      43, 43, 57, 43, 43, 43, 43, 43, 43, 43, 43, 29, 43, 43,
                      43,
                    ],
                  },
                  {
                    filterEnvelope: "twang 1",
                    spectrum: [
                      0, 0, 0, 0, 0, 71, 57, 43, 43, 43, 57, 57, 43, 29, 57, 43,
                      43, 43, 29, 43, 57, 43, 43, 43, 43, 43, 43, 29, 43, 43,
                    ],
                  },
                  {
                    filterEnvelope: "decay 2",
                    spectrum: [
                      0, 14, 29, 43, 86, 71, 29, 43, 43, 43, 43, 29, 71, 29, 71,
                      29, 43, 43, 43, 43, 57, 43, 43, 57, 43, 43, 43, 57, 57,
                      57,
                    ],
                  },
                  {
                    filterEnvelope: "decay 1",
                    spectrum: [
                      0, 0, 14, 14, 14, 14, 29, 29, 29, 43, 43, 43, 57, 57, 57,
                      71, 71, 71, 71, 71, 71, 71, 71, 57, 57, 57, 57, 43, 43,
                      43,
                    ],
                  },
                  {
                    filterEnvelope: "twang 3",
                    spectrum: [
                      43, 43, 43, 71, 29, 29, 43, 43, 43, 29, 43, 43, 43, 29,
                      29, 43, 43, 29, 29, 29, 57, 14, 57, 43, 43, 57, 43, 43,
                      57, 57,
                    ],
                  },
                  {
                    filterEnvelope: "decay 3",
                    spectrum: [
                      29, 43, 43, 43, 43, 29, 29, 43, 29, 29, 43, 29, 14, 29,
                      43, 29, 43, 29, 57, 29, 43, 57, 43, 71, 43, 71, 57, 57,
                      71, 71,
                    ],
                  },
                  {
                    filterEnvelope: "twang 3",
                    spectrum: [
                      43, 29, 29, 43, 29, 29, 29, 57, 29, 29, 29, 57, 43, 43,
                      29, 29, 57, 43, 43, 43, 71, 43, 43, 71, 57, 71, 71, 71,
                      71, 71,
                    ],
                  },
                  {
                    filterEnvelope: "decay 3",
                    spectrum: [
                      57, 57, 57, 43, 57, 57, 43, 43, 57, 43, 43, 43, 71, 57,
                      43, 57, 86, 71, 57, 86, 71, 57, 86, 100, 71, 86, 86, 86,
                      86, 86,
                    ],
                  },
                  {
                    filterEnvelope: "flare 1",
                    spectrum: [
                      0, 0, 14, 14, 14, 14, 29, 29, 29, 43, 43, 43, 57, 57, 71,
                      71, 86, 86, 100, 100, 100, 100, 100, 100, 100, 100, 86,
                      57, 29, 0,
                    ],
                  },
                  {
                    filterEnvelope: "decay 2",
                    spectrum: [
                      14, 14, 14, 14, 29, 14, 14, 29, 14, 43, 14, 43, 57, 86,
                      57, 57, 100, 57, 43, 43, 57, 100, 57, 43, 29, 14, 0, 0, 0,
                      0,
                    ],
                  },
                ],
              },
            },
            {
              name: "steel pan",
              midiProgram: 114,
              generalMidi: !0,
              settings: {
                type: "FM",
                eqFilter: [
                  { type: "high-pass", cutoffHz: 62.5, linearGain: 0.1768 },
                ],
                effects: ["note filter", "chorus", "reverb"],
                noteFilter: [
                  { type: "low-pass", cutoffHz: 13454.34, linearGain: 0.25 },
                ],
                chorus: 67,
                reverb: 33,
                transition: "normal",
                fadeInSeconds: 0,
                fadeOutTicks: 24,
                chord: "simultaneous",
                algorithm: "1←(2 3←4)",
                feedbackType: "1⟲",
                feedbackAmplitude: 0,
                operators: [
                  { frequency: "~1×", amplitude: 14 },
                  { frequency: "7×", amplitude: 3 },
                  { frequency: "3×", amplitude: 5 },
                  { frequency: "4×", amplitude: 4 },
                ],
                envelopes: [
                  { target: "noteFilterAllFreqs", envelope: "decay 2" },
                  {
                    target: "operatorAmplitude",
                    envelope: "flare 1",
                    index: 1,
                  },
                  {
                    target: "operatorAmplitude",
                    envelope: "flare 2",
                    index: 2,
                  },
                  {
                    target: "operatorAmplitude",
                    envelope: "swell 2",
                    index: 3,
                  },
                ],
              },
            },
            {
              name: "steel pan synth",
              midiProgram: 114,
              settings: {
                type: "FM",
                eqFilter: [],
                effects: ["note filter"],
                noteFilter: [
                  { type: "low-pass", cutoffHz: 13454.34, linearGain: 0.25 },
                ],
                transition: "normal",
                fadeInSeconds: 0,
                fadeOutTicks: -3,
                chord: "simultaneous",
                algorithm: "1 2 3←4",
                feedbackType: "1⟲",
                feedbackAmplitude: 5,
                operators: [
                  { frequency: "~1×", amplitude: 12 },
                  { frequency: "2×", amplitude: 15 },
                  { frequency: "4×", amplitude: 14 },
                  { frequency: "~1×", amplitude: 3 },
                ],
                envelopes: [
                  { target: "noteFilterAllFreqs", envelope: "twang 1" },
                  {
                    target: "operatorAmplitude",
                    envelope: "note size",
                    index: 0,
                  },
                  {
                    target: "operatorAmplitude",
                    envelope: "note size",
                    index: 1,
                  },
                  {
                    target: "operatorAmplitude",
                    envelope: "flare 1",
                    index: 2,
                  },
                  {
                    target: "operatorAmplitude",
                    envelope: "flare 2",
                    index: 3,
                  },
                  { target: "feedbackAmplitude", envelope: "flare 1" },
                ],
              },
            },
            {
              name: "timpani",
              midiProgram: 47,
              generalMidi: !0,
              settings: {
                type: "spectrum",
                eqFilter: [
                  { type: "peak", cutoffHz: 6727.17, linearGain: 5.6569 },
                ],
                effects: ["pitch shift", "note filter", "reverb"],
                pitchShiftSemitones: 15,
                noteFilter: [
                  { type: "low-pass", cutoffHz: 19027.31, linearGain: 0.5 },
                ],
                reverb: 33,
                transition: "normal",
                fadeInSeconds: 0,
                fadeOutTicks: 48,
                chord: "simultaneous",
                spectrum: [
                  100, 0, 0, 0, 86, 0, 0, 71, 0, 14, 43, 14, 43, 43, 0, 29, 43,
                  29, 29, 29, 43, 29, 43, 29, 43, 43, 43, 43, 43, 43,
                ],
                envelopes: [
                  { target: "noteFilterAllFreqs", envelope: "twang 1" },
                  { target: "pitchShift", envelope: "twang 1" },
                ],
              },
            },
            {
              name: "dark strike",
              midiProgram: 47,
              settings: {
                type: "spectrum",
                eqFilter: [],
                effects: ["note filter", "reverb"],
                noteFilter: [
                  { type: "low-pass", cutoffHz: 4756.83, linearGain: 0.7071 },
                ],
                reverb: 33,
                transition: "normal",
                fadeInSeconds: 0,
                fadeOutTicks: 48,
                chord: "simultaneous",
                spectrum: [
                  0, 0, 14, 14, 14, 29, 29, 43, 43, 86, 43, 43, 43, 29, 86, 29,
                  29, 29, 86, 29, 14, 14, 14, 14, 0, 0, 0, 0, 0, 0,
                ],
                envelopes: [
                  { target: "noteFilterAllFreqs", envelope: "twang 2" },
                ],
              },
            },
            {
              name: "woodblock",
              midiProgram: 115,
              generalMidi: !0,
              isNoise: !0,
              midiSubharmonicOctaves: -2.5,
              settings: {
                type: "spectrum",
                effects: "reverb",
                transition: "hard fade",
                chord: "strum",
                filterCutoffHz: 2828,
                filterResonance: 14,
                filterEnvelope: "twang 1",
                spectrum: [
                  0, 14, 29, 43, 43, 57, 86, 86, 71, 57, 57, 43, 43, 57, 86, 86,
                  43, 43, 71, 57, 57, 57, 57, 57, 86, 86, 71, 71, 71, 71,
                ],
              },
            },
            {
              name: "taiko drum",
              midiProgram: 116,
              generalMidi: !0,
              isNoise: !0,
              midiSubharmonicOctaves: -0.5,
              settings: {
                type: "spectrum",
                effects: "reverb",
                transition: "hard fade",
                chord: "strum",
                filterCutoffHz: 2828,
                filterResonance: 29,
                filterEnvelope: "twang 1",
                spectrum: [
                  71, 100, 100, 43, 43, 71, 71, 43, 43, 43, 43, 43, 43, 57, 29,
                  57, 43, 57, 43, 43, 57, 43, 43, 43, 43, 43, 43, 43, 43, 43,
                ],
              },
            },
            {
              name: "melodic drum",
              midiProgram: 117,
              generalMidi: !0,
              isNoise: !0,
              midiSubharmonicOctaves: -1.5,
              settings: {
                type: "spectrum",
                effects: "reverb",
                transition: "hard fade",
                chord: "strum",
                filterCutoffHz: 2828,
                filterResonance: 43,
                filterEnvelope: "twang 1",
                spectrum: [
                  100, 71, 71, 57, 57, 43, 43, 71, 43, 43, 43, 57, 43, 43, 57,
                  43, 43, 43, 43, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29,
                ],
              },
            },
            {
              name: "drum synth",
              midiProgram: 118,
              generalMidi: !0,
              isNoise: !0,
              midiSubharmonicOctaves: -2,
              settings: {
                type: "spectrum",
                effects: "reverb",
                transition: "hard fade",
                chord: "harmony",
                filterCutoffHz: 4e3,
                filterResonance: 43,
                filterEnvelope: "decay 1",
                spectrum: [
                  100, 86, 71, 57, 43, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29,
                  29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29, 29,
                ],
              },
            },
            {
              name: "tom-tom",
              midiProgram: 116,
              isNoise: !0,
              midiSubharmonicOctaves: -1,
              settings: {
                type: "spectrum",
                effects: "reverb",
                transition: "hard fade",
                chord: "strum",
                filterCutoffHz: 2e3,
                filterResonance: 14,
                filterEnvelope: "twang 1",
                spectrum: [
                  100, 29, 14, 0, 0, 86, 14, 43, 29, 86, 29, 14, 29, 57, 43, 43,
                  43, 43, 57, 43, 43, 43, 29, 57, 43, 43, 43, 43, 43, 43,
                ],
              },
            },
            {
              name: "metal pipe",
              midiProgram: 117,
              isNoise: !0,
              midiSubharmonicOctaves: -1.5,
              settings: {
                type: "spectrum",
                effects: "reverb",
                transition: "hard fade",
                chord: "strum",
                filterCutoffHz: 8e3,
                filterResonance: 14,
                filterEnvelope: "twang 2",
                spectrum: [
                  29, 43, 86, 43, 43, 43, 43, 43, 100, 29, 14, 14, 100, 14, 14,
                  0, 0, 0, 0, 0, 14, 29, 29, 14, 0, 0, 14, 29, 0, 0,
                ],
              },
            },
            {
              name: "synth kick",
              midiProgram: 47,
              settings: {
                type: "FM",
                eqFilter: [],
                effects: [],
                transition: "normal",
                fadeInSeconds: 0,
                fadeOutTicks: -6,
                chord: "simultaneous",
                algorithm: "1←(2 3 4)",
                feedbackType: "1⟲",
                feedbackAmplitude: 0,
                operators: [
                  { frequency: "8×", amplitude: 15 },
                  { frequency: "1×", amplitude: 0 },
                  { frequency: "1×", amplitude: 0 },
                  { frequency: "1×", amplitude: 0 },
                ],
                envelopes: [
                  {
                    target: "operatorFrequency",
                    envelope: "twang 1",
                    index: 0,
                  },
                  { target: "noteVolume", envelope: "twang 2" },
                ],
              },
            },
          ]),
        },
        {
          name: "Novelty Presets",
          presets: g([
            {
              name: "guitar fret noise",
              midiProgram: 120,
              generalMidi: !0,
              settings: {
                type: "spectrum",
                eqFilter: [
                  { type: "high-pass", cutoffHz: 1e3, linearGain: 0.1768 },
                ],
                effects: ["note filter"],
                noteFilter: [
                  { type: "low-pass", cutoffHz: 6727.17, linearGain: 5.6569 },
                ],
                transition: "normal",
                fadeInSeconds: 0.0125,
                fadeOutTicks: -3,
                chord: "simultaneous",
                spectrum: [
                  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 29, 14, 0,
                  0, 43, 0, 43, 0, 71, 43, 0, 57, 0,
                ],
                envelopes: [
                  { target: "noteFilterAllFreqs", envelope: "flare 1" },
                  { target: "noteVolume", envelope: "twang 2" },
                ],
              },
            },
            {
              name: "fifth saw lead",
              midiProgram: 86,
              generalMidi: !0,
              midiSubharmonicOctaves: 1,
              settings: {
                type: "chip",
                eqFilter: [],
                effects: ["note filter", "chorus"],
                noteFilter: [
                  { type: "low-pass", cutoffHz: 2828.43, linearGain: 1.4142 },
                ],
                chorus: 67,
                transition: "normal",
                fadeInSeconds: 0,
                fadeOutTicks: 48,
                chord: "simultaneous",
                wave: "sawtooth",
                unison: "fifth",
                envelopes: [
                  { target: "noteFilterAllFreqs", envelope: "twang 3" },
                ],
              },
            },
            {
              name: "fifth swell",
              midiProgram: 86,
              midiSubharmonicOctaves: 1,
              settings: {
                type: "chip",
                eqFilter: [],
                effects: ["note filter", "chorus"],
                noteFilter: [
                  { type: "low-pass", cutoffHz: 2e3, linearGain: 2 },
                ],
                chorus: 100,
                transition: "normal",
                fadeInSeconds: 0.0125,
                fadeOutTicks: 72,
                chord: "simultaneous",
                wave: "sawtooth",
                unison: "fifth",
                envelopes: [
                  { target: "noteFilterAllFreqs", envelope: "swell 3" },
                ],
              },
            },
            {
              name: "soundtrack",
              midiProgram: 97,
              generalMidi: !0,
              settings: {
                type: "chip",
                eqFilter: [],
                effects: ["note filter", "chorus"],
                noteFilter: [
                  { type: "low-pass", cutoffHz: 2378.41, linearGain: 0.5 },
                ],
                chorus: 67,
                transition: "normal",
                fadeInSeconds: 0.0413,
                fadeOutTicks: 72,
                chord: "simultaneous",
                wave: "sawtooth",
                unison: "fifth",
                envelopes: [
                  { target: "noteFilterAllFreqs", envelope: "flare 3" },
                ],
              },
            },
            {
              name: "reverse cymbal",
              midiProgram: 119,
              generalMidi: !0,
              isNoise: !0,
              midiSubharmonicOctaves: -3,
              settings: {
                type: "spectrum",
                effects: "none",
                transition: "soft",
                chord: "harmony",
                filterCutoffHz: 4e3,
                filterResonance: 14,
                filterEnvelope: "swell 3",
                spectrum: [
                  29, 57, 57, 29, 57, 57, 29, 29, 43, 29, 29, 43, 29, 29, 57,
                  57, 14, 57, 14, 57, 71, 71, 57, 86, 57, 100, 86, 86, 86, 86,
                ],
              },
            },
            {
              name: "seashore",
              midiProgram: 122,
              generalMidi: !0,
              isNoise: !0,
              midiSubharmonicOctaves: -3,
              settings: {
                type: "spectrum",
                transition: "soft fade",
                effects: "reverb",
                chord: "harmony",
                filterCutoffHz: 2828,
                filterResonance: 0,
                filterEnvelope: "swell 3",
                spectrum: [
                  14, 14, 29, 29, 43, 43, 43, 57, 57, 57, 57, 57, 57, 71, 71,
                  71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 71, 57,
                ],
              },
            },
            {
              name: "bird tweet",
              midiProgram: 123,
              generalMidi: !0,
              settings: {
                type: "harmonics",
                eqFilter: [],
                effects: ["chord type", "vibrato", "reverb"],
                chord: "strum",
                vibrato: "heavy",
                reverb: 67,
                fadeInSeconds: 0.0575,
                fadeOutTicks: -6,
                harmonics: [
                  0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0, 0, 0,
                ],
                unison: "hum",
                envelopes: [{ target: "noteVolume", envelope: "decay 1" }],
              },
            },
            {
              name: "telephone ring",
              midiProgram: 124,
              generalMidi: !0,
              settings: {
                type: "FM",
                eqFilter: [],
                effects: ["note filter"],
                noteFilter: [
                  { type: "low-pass", cutoffHz: 5656.85, linearGain: 1 },
                ],
                transition: "normal",
                fadeInSeconds: 0.0125,
                fadeOutTicks: -3,
                chord: "arpeggio",
                algorithm: "1←(2 3 4)",
                feedbackType: "1⟲",
                feedbackAmplitude: 0,
                operators: [
                  { frequency: "2×", amplitude: 12 },
                  { frequency: "1×", amplitude: 4 },
                  { frequency: "20×", amplitude: 1 },
                  { frequency: "1×", amplitude: 0 },
                ],
                envelopes: [
                  { target: "noteFilterAllFreqs", envelope: "tremolo4" },
                  {
                    target: "operatorAmplitude",
                    envelope: "tremolo1",
                    index: 1,
                  },
                ],
              },
            },
            {
              name: "helicopter",
              midiProgram: 125,
              generalMidi: !0,
              isNoise: !0,
              midiSubharmonicOctaves: -0.5,
              settings: {
                type: "spectrum",
                effects: "reverb",
                transition: "seamless",
                chord: "arpeggio",
                filterCutoffHz: 1414,
                filterResonance: 14,
                filterEnvelope: "tremolo4",
                spectrum: [
                  14, 43, 43, 57, 57, 57, 71, 71, 71, 71, 86, 86, 86, 86, 86,
                  86, 86, 86, 86, 86, 86, 71, 71, 71, 71, 71, 71, 71, 57, 57,
                ],
              },
            },
            {
              name: "applause",
              midiProgram: 126,
              generalMidi: !0,
              isNoise: !0,
              midiSubharmonicOctaves: -3,
              settings: {
                type: "spectrum",
                effects: "reverb",
                transition: "soft fade",
                chord: "harmony",
                filterCutoffHz: 2e3,
                filterResonance: 14,
                filterEnvelope: "swell 3",
                spectrum: [
                  14, 14, 29, 29, 29, 43, 43, 57, 71, 71, 86, 86, 86, 71, 71,
                  57, 57, 57, 71, 86, 86, 86, 86, 86, 71, 71, 57, 57, 57, 57,
                ],
              },
            },
            {
              name: "gunshot",
              midiProgram: 127,
              generalMidi: !0,
              isNoise: !0,
              midiSubharmonicOctaves: -2,
              settings: {
                type: "spectrum",
                effects: "reverb",
                transition: "hard fade",
                chord: "strum",
                filterCutoffHz: 1414,
                filterResonance: 29,
                filterEnvelope: "twang 1",
                spectrum: [
                  14, 29, 43, 43, 57, 57, 57, 71, 71, 71, 86, 86, 86, 86, 86,
                  86, 86, 86, 86, 86, 86, 71, 71, 71, 71, 57, 57, 57, 57, 43,
                ],
              },
            },
            {
              name: "scoot",
              midiProgram: 92,
              settings: {
                type: "chip",
                eqFilter: [],
                effects: ["note filter"],
                noteFilter: [
                  { type: "low-pass", cutoffHz: 707.11, linearGain: 4 },
                ],
                transition: "normal",
                fadeInSeconds: 0.0125,
                fadeOutTicks: -3,
                chord: "simultaneous",
                wave: "double saw",
                unison: "shimmer",
                envelopes: [
                  { target: "noteFilterAllFreqs", envelope: "flare 1" },
                ],
              },
            },
            {
              name: "buzz saw",
              midiProgram: 30,
              settings: {
                type: "FM",
                eqFilter: [
                  { type: "low-pass", cutoffHz: 9513.66, linearGain: 0.5 },
                ],
                effects: [],
                transition: "normal",
                fadeInSeconds: 0.0263,
                fadeOutTicks: -3,
                chord: "custom interval",
                algorithm: "1←2←3←4",
                feedbackType: "1⟲",
                feedbackAmplitude: 4,
                operators: [
                  { frequency: "5×", amplitude: 13 },
                  { frequency: "1×", amplitude: 10 },
                  { frequency: "~1×", amplitude: 6 },
                  { frequency: "11×", amplitude: 12 },
                ],
                envelopes: [],
              },
            },
            {
              name: "mosquito",
              midiProgram: 93,
              settings: {
                type: "PWM",
                eqFilter: [
                  { type: "low-pass", cutoffHz: 2828.43, linearGain: 2 },
                ],
                effects: ["vibrato"],
                vibrato: "shaky",
                transition: "normal",
                fadeInSeconds: 0.0575,
                fadeOutTicks: -6,
                chord: "simultaneous",
                pulseWidth: 4.41942,
                envelopes: [{ target: "pulseWidth", envelope: "tremolo6" }],
              },
            },
            {
              name: "breathing",
              midiProgram: 126,
              isNoise: !0,
              midiSubharmonicOctaves: -1,
              settings: {
                type: "spectrum",
                effects: "reverb",
                transition: "hard fade",
                chord: "harmony",
                filterCutoffHz: 2e3,
                filterResonance: 14,
                filterEnvelope: "swell 2",
                spectrum: [
                  14, 14, 14, 29, 29, 29, 29, 29, 43, 29, 29, 43, 43, 43, 29,
                  29, 71, 43, 86, 86, 57, 100, 86, 86, 86, 86, 71, 86, 71, 57,
                ],
              },
            },
            {
              name: "klaxon synth",
              midiProgram: 125,
              isNoise: !0,
              midiSubharmonicOctaves: -1,
              settings: {
                type: "noise",
                effects: "reverb",
                transition: "slide",
                chord: "harmony",
                filterCutoffHz: 2e3,
                filterResonance: 86,
                filterEnvelope: "steady",
                wave: "buzz",
              },
            },
            {
              name: "theremin",
              midiProgram: 40,
              settings: {
                type: "harmonics",
                eqFilter: [
                  { type: "low-pass", cutoffHz: 8e3, linearGain: 0.7071 },
                ],
                effects: ["vibrato", "reverb"],
                vibrato: "heavy",
                reverb: 33,
                transition: "slide in pattern",
                fadeInSeconds: 0.0263,
                fadeOutTicks: -6,
                chord: "simultaneous",
                harmonics: [
                  100, 71, 57, 43, 29, 29, 14, 14, 14, 14, 14, 14, 14, 0, 0, 0,
                  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                ],
                unison: "none",
                envelopes: [],
              },
            },
            {
              name: "sonar ping",
              midiProgram: 121,
              settings: {
                type: "spectrum",
                eqFilter: [],
                effects: ["note filter", "reverb"],
                noteFilter: [
                  { type: "low-pass", cutoffHz: 1681.79, linearGain: 0.5 },
                ],
                reverb: 33,
                transition: "normal",
                fadeInSeconds: 0.0125,
                fadeOutTicks: 72,
                chord: "simultaneous",
                spectrum: [
                  100, 43, 29, 29, 14, 14, 14, 14, 14, 0, 0, 0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                ],
                envelopes: [
                  { target: "noteFilterAllFreqs", envelope: "twang 2" },
                ],
              },
            },
          ]),
        },
        {
          name: "Modbox Presets",
          presets: g([
            {
              name: "modbox theepsynth",
              settings: {
                type: "FM",
                effects: "none",
                transition: "hard",
                chord: "arpeggio",
                filterCutoffHz: 4e3,
                filterResonance: 14,
                filterEnvelope: "custom",
                vibrato: "none",
                algorithm: "1←3 2←4",
                feedbackType: "1⟲ 2⟲",
                feedbackAmplitude: 11,
                feedbackEnvelope: "steady",
                operators: [
                  { frequency: "1×", amplitude: 15, envelope: "custom" },
                  { frequency: "1×", amplitude: 15, envelope: "custom" },
                  { frequency: "2×", amplitude: 7, envelope: "steady" },
                  { frequency: "1×", amplitude: 11, envelope: "steady" },
                ],
              },
            },
          ]),
        },
        {
          name: "Sandbox Presets",
          presets: g([
            {
              name: "sandbox netsky hollow",
              generalMidi: !1,
              isNoise: !0,
              midiSubharmonicOctaves: -1,
              settings: {
                type: "spectrum",
                effects: "reverb",
                transition: "hard",
                chord: "arpeggio",
                filterCutoffHz: 8e3,
                filterResonance: 0,
                filterEnvelope: "steady",
                spectrum: [
                  100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 45, 45,
                  45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45, 45,
                  45, 45,
                ],
              },
            },
            {
              name: "sandbox abnormality",
              generalMidi: !1,
              midiSubharmonicOctaves: 1,
              settings: {
                type: "chip",
                effects: "none",
                transition: "seamless",
                chord: "arpeggio",
                filterCutoffHz: 8e3,
                filterResonance: 0,
                filterEnvelope: "steady",
                wave: "spiky",
                interval: "fifth",
                vibrato: "none",
              },
            },
            {
              name: "sandbox playstation",
              generalMidi: !1,
              midiSubharmonicOctaves: 1,
              settings: {
                type: "chip",
                effects: "chorus",
                transition: "seamless",
                chord: "harmony",
                filterCutoffHz: 1414,
                filterResonance: 29,
                filterEnvelope: "steady",
                wave: "glitch",
                interval: "shimmer",
                vibrato: "none",
              },
            },
            {
              name: "sandbox harmony pulse",
              generalMidi: !1,
              midiSubharmonicOctaves: 1,
              settings: {
                type: "chip",
                effects: "chorus",
                transition: "soft",
                chord: "harmony",
                filterCutoffHz: 4e3,
                filterResonance: 29,
                filterEnvelope: "punch",
                wave: "double pulse",
                interval: "union",
                vibrato: "none",
              },
            },
            {
              name: "sandbox pink ping",
              generalMidi: !1,
              midiSubharmonicOctaves: -1,
              settings: {
                type: "spectrum",
                effects: "reverb",
                transition: "soft",
                chord: "harmony",
                filterCutoffHz: 3e3,
                filterResonance: 0,
                filterEnvelope: "tripolo6",
                spectrum: [
                  0, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                  0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                ],
              },
            },
            {
              name: "sandbox tv static",
              generalMidi: !1,
              isNoise: !0,
              midiSubharmonicOctaves: 1,
              settings: {
                type: "noise",
                effects: "reverb",
                transition: "medium fade",
                chord: "harmony",
                filterCutoffHz: 8e3,
                filterResonance: 40,
                filterEnvelope: "steady",
                wave: "static",
              },
            },
            {
              name: "sandbox clean pulse",
              generalMidi: !1,
              settings: {
                type: "custom chip",
                transition: "hard",
                effects: "none",
                chord: "arpeggio",
                filterCutoffHz: 4e3,
                filterResonance: 0,
                filterEnvelope: "steady",
                interval: "union",
                vibrato: "none",
                customChipWave: [
                  -24, -24, -24, -24, -24, -24, -24, -24, 24, 24, 24, 24, 24,
                  24, 24, 24, 24, 24, 24, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                  -24, -24, -24, -24, -24, -24, -24, -24, 24, 24, 24, 24, 24,
                  24, 24, 24, 24, 24, 24, 24, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
                  1,
                ],
              },
            },
            {
              name: "sandbox snp chorus",
              generalMidi: !1,
              settings: {
                type: "FM",
                transition: "hard",
                effects: "chorus & reverb",
                chord: "strum",
                filterCutoffHz: 2e3,
                filterResonance: 0,
                filterEnvelope: "twang 2",
                vibrato: "none",
                algorithm: "1←(2 3 4)",
                feedbackType: "1→2→3→4",
                feedbackAmplitude: 1,
                feedbackEnvelope: "flare 1",
                operators: [
                  { frequency: "1×", amplitude: 15, envelope: "custom" },
                  { frequency: "2×", amplitude: 15, envelope: "custom" },
                  { frequency: "4×", amplitude: 10, envelope: "custom" },
                  { frequency: "3×", amplitude: 6, envelope: "custom" },
                ],
              },
            },
            {
              name: "sandbox snp echo",
              generalMidi: !1,
              settings: {
                type: "FM",
                transition: "hard fade",
                effects: "chorus",
                chord: "strum",
                filterCutoffHz: 8e3,
                filterResonance: 0,
                filterEnvelope: "steady",
                vibrato: "none",
                algorithm: "1←(2 3←4)",
                feedbackType: "3⟲ 4⟲",
                feedbackAmplitude: 5,
                feedbackEnvelope: "decay 2",
                operators: [
                  { frequency: "1×", amplitude: 15, envelope: "custom" },
                  { frequency: "2×", amplitude: 15, envelope: "custom" },
                  { frequency: "20×", amplitude: 9, envelope: "twang 1" },
                  { frequency: "20×", amplitude: 5, envelope: "twang 2" },
                ],
              },
            },
            {
              name: "sandbox tori synth lead",
              generalMidi: !1,
              settings: {
                type: "harmonics",
                effects: "chorus",
                transition: "seamless",
                chord: "harmony",
                filterCutoffHz: 2e3,
                filterResonance: 0,
                filterEnvelope: "steady",
                interval: "union",
                vibrato: "none",
                harmonics: [
                  100, 100, 100, 100, 71, 71, 43, 43, 43, 29, 29, 43, 43, 43,
                  43, 43, 43, 43, 43, 43, 43, 43, 29, 14, 0, 0, 0, 86,
                ],
              },
            },
            {
              name: "sandbox glorious piano 1",
              generalMidi: !1,
              settings: {
                type: "custom chip",
                transition: "hard fade",
                effects: "chorus & reverb",
                chord: "harmony",
                filterCutoffHz: 2828,
                filterResonance: 14,
                filterEnvelope: "steady",
                interval: "union",
                vibrato: "none",
                customChipWave: [
                  24, 24, -16, -15, -15, -14, -13, -13, -12, -11, -11, -10, -9,
                  -8, -8, -7, -6, -5, -5, -4, -3, -2, -2, 23, 22, 22, 21, 20,
                  20, 19, 19, 18, 18, 17, 16, 15, 15, 14, 13, 12, 12, 11, 0, -1,
                  -1, -2, -3, -3, -4, -5, -5, -6, -20, -19, -17, -17, -14, -11,
                  -8, -5, -2, -23, -24, -24,
                ],
              },
            },
            {
              name: "sandbox glorious piano 2",
              generalMidi: !1,
              settings: {
                type: "custom chip",
                transition: "hard fade",
                effects: "chorus & reverb",
                chord: "harmony",
                filterCutoffHz: 2828,
                filterResonance: 14,
                filterEnvelope: "punch",
                interval: "shimmer",
                vibrato: "light",
                customChipWave: [
                  24, 24, -16, -15, -15, -14, -13, -13, -12, 12, 9, 5, 2, -3,
                  -7, -10, -6, -5, -5, -4, -3, -2, -2, 23, 22, 22, 21, 20, 20,
                  19, 19, 18, 18, 17, 16, 15, 15, 0, 4, 8, 15, 21, 0, -1, -1,
                  -2, -3, -3, -4, -5, -5, -6, -20, -19, -17, -17, -2, -2, -8, 2,
                  -2, -5, -24, -24,
                ],
              },
            },
            {
              name: "sandbox muffled katrumpet",
              generalMidi: !1,
              settings: {
                type: "custom chip",
                transition: "cross fade",
                effects: "reverb",
                chord: "strum",
                filterCutoffHz: 5657,
                filterResonance: 29,
                filterEnvelope: "steady",
                interval: "union",
                vibrato: "light",
                customChipWave: [
                  24, 23, 22, 22, 22, 22, 22, 21, 21, 19, 19, 15, 11, 7, 5, -2,
                  -5, -11, -13, -14, -16, -17, -17, -17, -17, -17, -17, -17,
                  -17, -13, -10, -1, 4, 6, 8, 10, 11, 14, 15, 15, 16, 16, 16,
                  16, 16, 16, 16, 16, 15, 15, 14, 11, 8, 4, 2, -4, -7, -11, -12,
                  -13, -14, -15, -15, -15,
                ],
              },
            },
            {
              name: "sandbox ehruthing",
              generalMidi: !1,
              settings: {
                type: "custom chip",
                "hard fade": "seamless",
                effects: "reverb",
                chord: "strum",
                filterCutoffHz: 5657,
                filterResonance: 14,
                filterEnvelope: "twang 2",
                interval: "union",
                vibrato: "none",
                customChipWave: [
                  24, 24, 23, 22, 21, 21, 20, 19, 18, 18, 17, 16, 15, -22, -20,
                  -18, -16, -14, -13, -11, -10, -7, -6, -4, -3, -2, 0, 2, 4, 17,
                  16, 15, 13, 12, 11, 9, 8, 6, 5, 4, 3, 2, 1, -1, -1, -2, -3,
                  -4, -6, -6, -7, -8, -8, -9, -10, -10, -11, -13, -15, -16, -17,
                  -3, -4, -5,
                ],
              },
            },
            {
              name: "sandbox wurtz organ",
              generalMidi: !1,
              settings: {
                type: "FM",
                transition: "seamless",
                effects: "chorus",
                chord: "harmony",
                filterCutoffHz: 1414,
                filterResonance: 0,
                filterEnvelope: "punch",
                vibrato: "none",
                algorithm: "1 2 3 4",
                feedbackType: "1⟲ 2⟲ 3⟲ 4⟲",
                feedbackAmplitude: 3,
                feedbackEnvelope: "decay 2",
                operators: [
                  { frequency: "1×", amplitude: 14, envelope: "tremolo6" },
                  { frequency: "2×", amplitude: 9, envelope: "tripolo3" },
                  { frequency: "4×", amplitude: 5, envelope: "pentolo3" },
                  { frequency: "8×", amplitude: 2, envelope: "pentolo6" },
                ],
              },
            },
          ]),
        },
        {
          name: "Blackbox Presets",
          presets: g([
            {
              name: "blackbox deep key",
              midiProgram: 9,
              generalMidi: !0,
              settings: {
                type: "harmonics",
                effects: "reverb",
                transition: "hard fade",
                chord: "harmony",
                filterCutoffHz: 8e3,
                filterResonance: 32,
                filterEnvelope: "twang 1",
                interval: "shimmer",
                vibrato: "light",
                harmonics: [
                  100, 86, 86, 86, 86, 71, 71, 57, 0, 57, 29, 43, 57, 57, 57,
                  43, 43, 0, 29, 43, 43, 43, 43, 43, 43, 29, 0, 30,
                ],
              },
            },
            {
              name: "blackbox ring ding",
              midiProgram: 78,
              generalMidi: !0,
              settings: {
                type: "FM",
                effects: "reverb",
                transition: "hard",
                chord: "strum",
                filterCutoffHz: 1500,
                filterResonance: 16,
                filterEnvelope: "twang 2",
                vibrato: "none",
                algorithm: "1 2 3 4",
                feedbackType: "1⟲ 2⟲",
                feedbackAmplitude: 0,
                feedbackEnvelope: "steady",
                operators: [
                  { frequency: "1×", amplitude: 9, envelope: "custom" },
                  { frequency: "4×", amplitude: 8, envelope: "custom" },
                  { frequency: "12×", amplitude: 9, envelope: "custom" },
                  { frequency: "22×", amplitude: 4, envelope: "twang 2" },
                ],
              },
            },
          ]),
        },
        {
          name: "Todbox Presets",
          presets: g([
            {
              name: "todbox accordion",
              midiProgram: 21,
              generalMidi: !0,
              settings: {
                type: "chip",
                effects: "reverb",
                transition: "cross fade",
                chord: "harmony",
                filterCutoffHz: 5657,
                filterResonance: 0,
                filterEnvelope: "swell 1",
                wave: "todbox accordian",
                interval: "honky tonk",
                vibrato: "none",
              },
            },
            {
              name: "todbox wind",
              generalMidi: !1,
              settings: {
                type: "FM",
                effects: "reverb",
                transition: "seamless",
                chord: "harmony",
                filterCutoffHz: 200,
                filterResonance: 2950,
                filterEnvelope: "steady",
                vibrato: "none",
                algorithm: "1→3 2→4",
                feedbackType: "1→3 2→4",
                feedbackAmplitude: 15,
                feedbackEnvelope: "steady",
                operators: [
                  { frequency: "16×", amplitude: 15, envelope: "steady" },
                  { frequency: "16×", amplitude: 0, envelope: "custom" },
                  { frequency: "16×", amplitude: 15, envelope: "steady" },
                  { frequency: "16×", amplitude: 0, envelope: "flare 2" },
                ],
              },
            },
          ]),
        },
        {
          name: "Old Beepbox Presets",
          presets: g([
            {
              name: "old grand piano",
              midiProgram: 0,
              generalMidi: !0,
              settings: {
                type: "harmonics",
                effects: "reverb",
                transition: "hard fade",
                chord: "harmony",
                filterCutoffHz: 1414,
                filterResonance: 14,
                filterEnvelope: "twang 3",
                interval: "piano",
                vibrato: "none",
                harmonics: [
                  100, 100, 86, 86, 86, 71, 71, 71, 0, 86, 71, 71, 71, 57, 57,
                  71, 57, 14, 57, 57, 57, 57, 57, 57, 57, 57, 29, 57,
                ],
              },
            },
            {
              name: "old bright piano",
              midiProgram: 1,
              generalMidi: !0,
              settings: {
                type: "harmonics",
                effects: "reverb",
                transition: "hard fade",
                chord: "harmony",
                filterCutoffHz: 2e3,
                filterResonance: 14,
                filterEnvelope: "twang 3",
                interval: "piano",
                vibrato: "none",
                harmonics: [
                  100, 100, 86, 86, 71, 71, 0, 71, 86, 86, 71, 71, 71, 14, 57,
                  57, 57, 57, 57, 57, 29, 57, 57, 57, 57, 57, 57, 57,
                ],
              },
            },
            {
              name: "old honky-tonk piano",
              midiProgram: 3,
              generalMidi: !0,
              settings: {
                type: "harmonics",
                effects: "reverb",
                transition: "hard fade",
                chord: "harmony",
                filterCutoffHz: 5657,
                filterResonance: 29,
                filterEnvelope: "twang 2",
                interval: "honky tonk",
                vibrato: "none",
                harmonics: [
                  100, 100, 86, 71, 86, 71, 43, 71, 43, 43, 57, 57, 57, 29, 57,
                  43, 43, 43, 43, 43, 29, 43, 43, 43, 29, 29, 29, 29,
                ],
              },
            },
            {
              name: "old harpsichord",
              midiProgram: 6,
              generalMidi: !0,
              settings: {
                type: "FM",
                effects: "reverb",
                transition: "hard fade",
                chord: "harmony",
                filterCutoffHz: 8e3,
                filterResonance: 0,
                filterEnvelope: "twang 2",
                vibrato: "none",
                algorithm: "1←(2 3←4)",
                feedbackType: "4⟲",
                feedbackAmplitude: 9,
                feedbackEnvelope: "twang 2",
                operators: [
                  { frequency: "1×", amplitude: 15, envelope: "custom" },
                  { frequency: "4×", amplitude: 8, envelope: "steady" },
                  { frequency: "3×", amplitude: 6, envelope: "steady" },
                  { frequency: "5×", amplitude: 7, envelope: "steady" },
                ],
              },
            },
            {
              name: "old dulcimer",
              midiProgram: 15,
              generalMidi: !0,
              settings: {
                type: "harmonics",
                effects: "reverb",
                transition: "hard fade",
                chord: "strum",
                filterCutoffHz: 5657,
                filterResonance: 14,
                filterEnvelope: "twang 2",
                interval: "piano",
                vibrato: "none",
                harmonics: [
                  100, 100, 100, 86, 100, 86, 57, 100, 100, 86, 100, 86, 100,
                  86, 100, 71, 57, 71, 71, 100, 86, 71, 86, 86, 100, 86, 86, 86,
                ],
              },
            },
            {
              name: "old music box 1",
              midiProgram: 10,
              generalMidi: !0,
              settings: {
                type: "harmonics",
                effects: "reverb",
                transition: "hard fade",
                chord: "strum",
                filterCutoffHz: 4e3,
                filterResonance: 14,
                filterEnvelope: "twang 2",
                interval: "union",
                vibrato: "none",
                harmonics: [
                  100, 0, 0, 100, 0, 0, 0, 0, 0, 0, 100, 0, 0, 0, 0, 0, 0, 0, 0,
                  86, 0, 0, 0, 0, 0, 0, 71, 0,
                ],
              },
            },
            {
              name: "old music box 2",
              midiProgram: 10,
              settings: {
                type: "harmonics",
                effects: "reverb",
                transition: "hard fade",
                chord: "strum",
                filterCutoffHz: 2828,
                filterResonance: 14,
                filterEnvelope: "twang 1",
                interval: "union",
                vibrato: "none",
                harmonics: [
                  100, 57, 57, 0, 0, 0, 0, 0, 0, 57, 0, 0, 0, 14, 14, 14, 14,
                  14, 14, 43, 14, 14, 14, 14, 14, 14, 14, 14,
                ],
              },
            },
            {
              name: "old tubular bell",
              midiProgram: 14,
              generalMidi: !0,
              midiSubharmonicOctaves: 1,
              settings: {
                type: "harmonics",
                effects: "reverb",
                transition: "hard fade",
                chord: "strum",
                filterCutoffHz: 4e3,
                filterResonance: 14,
                filterEnvelope: "twang 3",
                interval: "hum",
                vibrato: "none",
                harmonics: [
                  43, 71, 0, 100, 0, 100, 0, 86, 0, 0, 86, 0, 14, 71, 14, 14,
                  57, 14, 14, 43, 14, 14, 43, 14, 14, 43, 14, 14,
                ],
              },
            },
            {
              name: "old steel guitar",
              midiProgram: 25,
              generalMidi: !0,
              settings: {
                type: "harmonics",
                effects: "reverb",
                transition: "hard fade",
                chord: "strum",
                filterCutoffHz: 5657,
                filterResonance: 14,
                filterEnvelope: "twang 2",
                interval: "union",
                vibrato: "none",
                harmonics: [
                  100, 100, 86, 71, 71, 71, 86, 86, 71, 57, 43, 43, 43, 57, 57,
                  57, 57, 57, 43, 43, 43, 43, 43, 43, 43, 43, 43, 43,
                ],
              },
            },
            {
              name: "old cello",
              midiProgram: 42,
              generalMidi: !0,
              settings: {
                type: "FM",
                effects: "reverb",
                transition: "cross fade",
                chord: "harmony",
                filterCutoffHz: 2828,
                filterResonance: 29,
                filterEnvelope: "steady",
                vibrato: "delayed",
                algorithm: "(1 2 3)←4",
                feedbackType: "1⟲ 2⟲ 3⟲",
                feedbackAmplitude: 6,
                feedbackEnvelope: "swell 1",
                operators: [
                  { frequency: "1×", amplitude: 11, envelope: "custom" },
                  { frequency: "3×", amplitude: 9, envelope: "custom" },
                  { frequency: "8×", amplitude: 7, envelope: "custom" },
                  { frequency: "1×", amplitude: 6, envelope: "steady" },
                ],
              },
            },
            {
              name: "old choir soprano",
              midiProgram: 94,
              generalMidi: !0,
              settings: {
                type: "harmonics",
                effects: "chorus & reverb",
                transition: "soft fade",
                chord: "harmony",
                filterCutoffHz: 2828,
                filterResonance: 57,
                filterEnvelope: "steady",
                interval: "union",
                vibrato: "shaky",
                harmonics: [
                  86, 100, 86, 43, 14, 14, 57, 71, 57, 14, 14, 14, 14, 14, 43,
                  57, 43, 14, 14, 14, 14, 14, 14, 14, 0, 0, 0, 0,
                ],
              },
            },
            {
              name: "old choir tenor",
              midiProgram: 52,
              generalMidi: !0,
              settings: {
                type: "harmonics",
                effects: "chorus & reverb",
                transition: "soft fade",
                chord: "harmony",
                filterCutoffHz: 2828,
                filterResonance: 86,
                filterEnvelope: "steady",
                interval: "union",
                vibrato: "shaky",
                harmonics: [
                  86, 100, 100, 86, 71, 57, 29, 14, 14, 14, 29, 43, 43, 43, 29,
                  14, 14, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                ],
              },
            },
            {
              name: "old choir bass",
              midiProgram: 52,
              settings: {
                type: "harmonics",
                effects: "chorus & reverb",
                transition: "soft fade",
                chord: "harmony",
                filterCutoffHz: 2828,
                filterResonance: 86,
                filterEnvelope: "steady",
                interval: "union",
                vibrato: "shaky",
                harmonics: [
                  71, 86, 86, 100, 86, 100, 57, 43, 14, 14, 14, 14, 29, 29, 43,
                  43, 43, 43, 43, 29, 29, 29, 29, 14, 14, 14, 0, 0,
                ],
              },
            },
            {
              name: "old solo soprano",
              midiProgram: 85,
              settings: {
                type: "harmonics",
                effects: "reverb",
                transition: "cross fade",
                chord: "harmony",
                filterCutoffHz: 2828,
                filterResonance: 71,
                filterEnvelope: "steady",
                interval: "union",
                vibrato: "shaky",
                harmonics: [
                  86, 100, 86, 43, 14, 14, 57, 71, 57, 14, 14, 14, 14, 14, 43,
                  57, 43, 14, 14, 14, 14, 14, 14, 14, 0, 0, 0, 0,
                ],
              },
            },
            {
              name: "old solo tenor",
              midiProgram: 85,
              settings: {
                type: "harmonics",
                effects: "reverb",
                transition: "cross fade",
                chord: "harmony",
                filterCutoffHz: 2828,
                filterResonance: 86,
                filterEnvelope: "steady",
                interval: "union",
                vibrato: "shaky",
                harmonics: [
                  86, 100, 100, 86, 71, 57, 29, 14, 14, 14, 29, 43, 43, 43, 29,
                  14, 14, 14, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                ],
              },
            },
            {
              name: "old solo bass",
              midiProgram: 85,
              settings: {
                type: "harmonics",
                effects: "reverb",
                transition: "cross fade",
                chord: "harmony",
                filterCutoffHz: 2828,
                filterResonance: 86,
                filterEnvelope: "steady",
                interval: "union",
                vibrato: "shaky",
                harmonics: [
                  71, 86, 86, 100, 86, 100, 57, 43, 14, 14, 14, 14, 29, 29, 43,
                  43, 43, 43, 43, 29, 29, 29, 29, 14, 14, 14, 0, 0,
                ],
              },
            },
            {
              name: "old pan flute",
              midiProgram: 75,
              generalMidi: !0,
              settings: {
                type: "spectrum",
                effects: "reverb",
                transition: "soft",
                chord: "harmony",
                filterCutoffHz: 8e3,
                filterResonance: 43,
                filterEnvelope: "steady",
                spectrum: [
                  100, 0, 0, 0, 0, 0, 0, 14, 0, 0, 0, 71, 0, 0, 14, 0, 57, 0,
                  29, 14, 29, 14, 14, 29, 14, 29, 14, 14, 29, 14,
                ],
              },
            },
            {
              name: "old timpani",
              midiProgram: 47,
              generalMidi: !0,
              settings: {
                type: "spectrum",
                effects: "reverb",
                transition: "hard fade",
                chord: "harmony",
                filterCutoffHz: 4e3,
                filterResonance: 29,
                filterEnvelope: "twang 2",
                spectrum: [
                  100, 0, 0, 0, 86, 0, 0, 71, 0, 14, 43, 14, 43, 43, 0, 29, 43,
                  29, 29, 29, 43, 29, 43, 29, 43, 43, 43, 43, 43, 43,
                ],
              },
            },
          ]),
        },
        {
          name: "UltraBox Presets",
          presets: g([
            {
              name: "vrc6 sawtooth",
              generalMidi: !1,
              settings: {
                type: "custom chip",
                volume: 0,
                eqFilter: [
                  { type: "high-pass", cutoffHz: 62.5, linearGain: 0.5 },
                ],
                eqFilterType: !1,
                eqSimpleCut: 10,
                eqSimplePeak: 0,
                eqSubFilters0: [
                  { type: "high-pass", cutoffHz: 62.5, linearGain: 0.5 },
                ],
                effects: [
                  "panning",
                  "transition type",
                  "chord type",
                  "detune",
                  "vibrato",
                ],
                transition: "normal",
                clicklessTransition: !0,
                chord: "arpeggio",
                fastTwoNoteArp: !0,
                arpeggioSpeed: 12,
                detuneCents: 0,
                vibrato: "none",
                vibratoDepth: 0,
                vibratoDelay: 0,
                vibratoSpeed: 10,
                vibratoType: 0,
                pan: 0,
                panDelay: 10,
                fadeInSeconds: 0,
                fadeOutTicks: -1,
                wave: "square",
                unison: "none",
                customChipWave: {
                  0: -1,
                  1: -1,
                  2: -1,
                  3: -1,
                  4: -1,
                  5: -1,
                  6: -1,
                  7: -1,
                  8: -1,
                  9: -5,
                  10: -5,
                  11: -5,
                  12: -4,
                  13: -4,
                  14: -4,
                  15: -3,
                  16: -3,
                  17: -3,
                  18: -7,
                  19: -7,
                  20: -6,
                  21: -6,
                  22: -5,
                  23: -5,
                  24: -4,
                  25: -4,
                  26: -4,
                  27: -7,
                  28: -7,
                  29: -6,
                  30: -6,
                  31: -5,
                  32: -5,
                  33: -4,
                  34: -4,
                  35: -4,
                  36: -8,
                  37: -8,
                  38: -7,
                  39: -7,
                  40: -6,
                  41: -6,
                  42: -5,
                  43: -5,
                  44: -4,
                  45: -4,
                  46: 21,
                  47: 20,
                  48: 18,
                  49: 17,
                  50: 16,
                  51: 14,
                  52: 13,
                  53: 12,
                  54: 11,
                  55: 7,
                  56: 6,
                  57: 6,
                  58: 5,
                  59: 5,
                  60: 5,
                  61: 4,
                  62: 4,
                  63: 4,
                },
                customChipWaveIntegral: {
                  0: 0,
                  1: 0,
                  2: 0,
                  3: 0,
                  4: 0,
                  5: 0,
                  6: 0,
                  7: 0,
                  8: 0,
                  9: 0,
                  10: 0,
                  11: 0,
                  12: 0,
                  13: 0,
                  14: 0,
                  15: 0,
                  16: 0,
                  17: 0,
                  18: 0,
                  19: 0,
                  20: 0,
                  21: 0,
                  22: 0,
                  23: 0,
                  24: 0,
                  25: 0,
                  26: 0,
                  27: 0,
                  28: 0,
                  29: 0,
                  30: 0,
                  31: 0,
                  32: 0,
                  33: 0,
                  34: 0,
                  35: 0,
                  36: 0,
                  37: 0,
                  38: 0,
                  39: 0,
                  40: 0,
                  41: 0,
                  42: 0,
                  43: 0,
                  44: 0,
                  45: 0,
                  46: 0,
                  47: 0,
                  48: 0,
                  49: 0,
                  50: 0,
                  51: 0,
                  52: 0,
                  53: 0,
                  54: 0,
                  55: 0,
                  56: 0,
                  57: 0,
                  58: 0,
                  59: 0,
                  60: 0,
                  61: 0,
                  62: 0,
                  63: 0,
                  64: 0,
                },
                envelopes: [],
              },
            },
            {
              name: "nes white",
              midiProgram: 116,
              generalMidi: !0,
              isNoise: !0,
              settings: {
                type: "noise",
                volume: 0,
                eqFilter: [],
                eqFilterType: !1,
                eqSimpleCut: 8,
                eqSimplePeak: 0,
                eqSubFilters1: [],
                effects: ["panning"],
                pan: 0,
                panDelay: 10,
                fadeInSeconds: 0,
                fadeOutTicks: 0,
                wave: "1-bit white",
                envelopes: [],
              },
            },
            {
              name: "nes ping",
              midiProgram: 116,
              generalMidi: !0,
              isNoise: !0,
              settings: {
                type: "noise",
                volume: 0,
                eqFilter: [],
                eqFilterType: !1,
                eqSimpleCut: 8,
                eqSimplePeak: 0,
                eqSubFilters1: [],
                effects: ["panning"],
                pan: 0,
                panDelay: 10,
                fadeInSeconds: 0,
                fadeOutTicks: 0,
                wave: "1-bit metallic",
                envelopes: [],
              },
            },
            {
              name: "distorted pulse vocal",
              generalMidi: !1,
              settings: {
                type: "chip",
                volume: 0,
                eqFilter: [
                  { type: "low-pass", cutoffHz: 19027.31, linearGain: 0.0884 },
                ],
                eqFilterType: !1,
                eqSimpleCut: 10,
                eqSimplePeak: 0,
                eqSubFilters0: [
                  { type: "low-pass", cutoffHz: 19027.31, linearGain: 0.0884 },
                ],
                effects: [
                  "panning",
                  "transition type",
                  "pitch shift",
                  "vibrato",
                  "note filter",
                  "bitcrusher",
                  "echo",
                  "reverb",
                ],
                transition: "normal",
                clicklessTransition: !1,
                pitchShiftSemitones: 0,
                vibrato: "delayed",
                vibratoDepth: 0.3,
                vibratoDelay: 18.5,
                vibratoSpeed: 10,
                vibratoType: 0,
                noteFilterType: !1,
                noteSimpleCut: 10,
                noteSimplePeak: 0,
                noteFilter: [
                  { type: "high-pass", cutoffHz: 840.9, linearGain: 11.3137 },
                  { type: "low-pass", cutoffHz: 297.3, linearGain: 8 },
                  { type: "peak", cutoffHz: 500, linearGain: 11.3137 },
                  { type: "high-pass", cutoffHz: 62.5, linearGain: 1.4142 },
                  { type: "peak", cutoffHz: 176.78, linearGain: 11.3137 },
                  { type: "high-pass", cutoffHz: 250, linearGain: 11.3137 },
                ],
                noteSubFilters0: [
                  { type: "high-pass", cutoffHz: 840.9, linearGain: 11.3137 },
                  { type: "low-pass", cutoffHz: 297.3, linearGain: 8 },
                  { type: "peak", cutoffHz: 500, linearGain: 11.3137 },
                  { type: "high-pass", cutoffHz: 62.5, linearGain: 1.4142 },
                  { type: "peak", cutoffHz: 176.78, linearGain: 11.3137 },
                  { type: "high-pass", cutoffHz: 250, linearGain: 11.3137 },
                ],
                bitcrusherOctave: 6.5,
                bitcrusherQuantization: 71,
                pan: 0,
                panDelay: 10,
                echoSustain: 14,
                echoDelayBeats: 0.167,
                reverb: 0,
                fadeInSeconds: 0,
                fadeOutTicks: -3,
                wave: "1/8 pulse",
                unison: "none",
                envelopes: [],
              },
            },
            {
              name: "dubsteb bwah",
              generalMidi: !1,
              settings: {
                type: "FM",
                volume: 0,
                eqFilter: [
                  { type: "low-pass", cutoffHz: 19027.31, linearGain: 0.7071 },
                ],
                eqFilterType: !0,
                eqSimpleCut: 10,
                eqSimplePeak: 0,
                eqSubFilters1: [],
                effects: ["panning", "transition type", "chord type"],
                transition: "interrupt",
                clicklessTransition: !1,
                chord: "custom interval",
                fastTwoNoteArp: !1,
                arpeggioSpeed: 12,
                pan: 0,
                panDelay: 10,
                fadeInSeconds: 0,
                fadeOutTicks: -1,
                algorithm: "1←(2 3 4)",
                feedbackType: "1⟲",
                feedbackAmplitude: 10,
                operators: [
                  {
                    frequency: "2×",
                    amplitude: 15,
                    waveform: "sine",
                    pulseWidth: 5,
                  },
                  {
                    frequency: "4×",
                    amplitude: 15,
                    waveform: "sine",
                    pulseWidth: 5,
                  },
                  {
                    frequency: "1×",
                    amplitude: 11,
                    waveform: "sine",
                    pulseWidth: 5,
                  },
                  {
                    frequency: "1×",
                    amplitude: 13,
                    waveform: "sine",
                    pulseWidth: 5,
                  },
                ],
                envelopes: [
                  { target: "noteVolume", envelope: "note size" },
                  {
                    target: "operatorAmplitude",
                    envelope: "swell 2",
                    index: 1,
                  },
                  { target: "operatorAmplitude", envelope: "punch", index: 2 },
                  {
                    target: "operatorAmplitude",
                    envelope: "note size",
                    index: 3,
                  },
                ],
              },
            },
            {
              name: "FM cool bass",
              generalMidi: !1,
              settings: {
                type: "FM",
                volume: 0,
                eqFilter: [
                  { type: "low-pass", cutoffHz: 6727.17, linearGain: 1 },
                  { type: "high-pass", cutoffHz: 88.39, linearGain: 1 },
                  { type: "peak", cutoffHz: 1e3, linearGain: 0.7071 },
                ],
                eqFilterType: !1,
                eqSimpleCut: 10,
                eqSimplePeak: 0,
                eqSubFilters0: [
                  { type: "low-pass", cutoffHz: 6727.17, linearGain: 1 },
                  { type: "high-pass", cutoffHz: 88.39, linearGain: 1 },
                  { type: "peak", cutoffHz: 1e3, linearGain: 0.7071 },
                ],
                effects: [
                  "panning",
                  "transition type",
                  "note filter",
                  "reverb",
                ],
                transition: "interrupt",
                clicklessTransition: !1,
                noteFilterType: !0,
                noteSimpleCut: 9,
                noteSimplePeak: 2,
                noteFilter: [
                  { type: "low-pass", cutoffHz: 7231.23, linearGain: 1 },
                ],
                noteSubFilters1: [
                  { type: "low-pass", cutoffHz: 7231.23, linearGain: 1 },
                ],
                pan: 0,
                panDelay: 10,
                reverb: 0,
                fadeInSeconds: 0,
                fadeOutTicks: -1,
                algorithm: "1←(2 3←4)",
                feedbackType: "1⟲",
                feedbackAmplitude: 0,
                operators: [
                  {
                    frequency: "2×",
                    amplitude: 15,
                    waveform: "sine",
                    pulseWidth: 5,
                  },
                  {
                    frequency: "1×",
                    amplitude: 8,
                    waveform: "sine",
                    pulseWidth: 5,
                  },
                  {
                    frequency: "1×",
                    amplitude: 7,
                    waveform: "sine",
                    pulseWidth: 5,
                  },
                  {
                    frequency: "13×",
                    amplitude: 11,
                    waveform: "sine",
                    pulseWidth: 5,
                  },
                ],
                envelopes: [
                  { target: "noteFilterAllFreqs", envelope: "punch" },
                  {
                    target: "operatorAmplitude",
                    envelope: "twang 2",
                    index: 1,
                  },
                  {
                    target: "operatorAmplitude",
                    envelope: "twang 3",
                    index: 2,
                  },
                  {
                    target: "operatorAmplitude",
                    envelope: "twang 2",
                    index: 3,
                  },
                ],
              },
            },
            {
              name: "FM funky bass",
              generalMidi: !1,
              settings: {
                type: "FM",
                volume: 0,
                eqFilter: [
                  { type: "low-pass", cutoffHz: 9513.66, linearGain: 0.1768 },
                ],
                eqFilterType: !0,
                eqSimpleCut: 5,
                eqSimplePeak: 0,
                eqSubFilters1: [],
                effects: ["panning", "transition type", "reverb"],
                transition: "normal",
                clicklessTransition: !1,
                pan: 0,
                panDelay: 10,
                reverb: 0,
                fadeInSeconds: 0,
                fadeOutTicks: -3,
                algorithm: "1←(2 3 4)",
                feedbackType: "1⟲",
                feedbackAmplitude: 0,
                operators: [
                  {
                    frequency: "1×",
                    amplitude: 15,
                    waveform: "sine",
                    pulseWidth: 5,
                  },
                  {
                    frequency: "~1×",
                    amplitude: 8,
                    waveform: "sine",
                    pulseWidth: 5,
                  },
                  {
                    frequency: "1×",
                    amplitude: 0,
                    waveform: "sine",
                    pulseWidth: 5,
                  },
                  {
                    frequency: "1×",
                    amplitude: 0,
                    waveform: "sine",
                    pulseWidth: 5,
                  },
                ],
                envelopes: [
                  { target: "noteVolume", envelope: "punch" },
                  { target: "noteVolume", envelope: "note size" },
                ],
              },
            },
            {
              name: "mrow",
              generalMidi: !1,
              settings: {
                type: "FM",
                volume: 0,
                eqFilter: [],
                eqFilterType: !1,
                eqSimpleCut: 10,
                eqSimplePeak: 0,
                eqSubFilters0: [],
                effects: ["panning", "chord type", "reverb"],
                chord: "custom interval",
                fastTwoNoteArp: !1,
                arpeggioSpeed: 12,
                pan: 0,
                panDelay: 10,
                reverb: 35,
                fadeInSeconds: 0.0263,
                fadeOutTicks: -3,
                algorithm: "1←3 2←4",
                feedbackType: "1⟲ 2⟲ 3⟲ 4⟲",
                feedbackAmplitude: 5,
                operators: [
                  {
                    frequency: "4×",
                    amplitude: 15,
                    waveform: "sine",
                    pulseWidth: 5,
                  },
                  {
                    frequency: "~2×",
                    amplitude: 13,
                    waveform: "sine",
                    pulseWidth: 5,
                  },
                  {
                    frequency: "~2×",
                    amplitude: 8,
                    waveform: "sine",
                    pulseWidth: 5,
                  },
                  {
                    frequency: "~2×",
                    amplitude: 9,
                    waveform: "sine",
                    pulseWidth: 5,
                  },
                ],
                envelopes: [
                  {
                    target: "operatorAmplitude",
                    envelope: "flare 1",
                    index: 0,
                  },
                  {
                    target: "operatorAmplitude",
                    envelope: "note size",
                    index: 1,
                  },
                  {
                    target: "operatorAmplitude",
                    envelope: "note size",
                    index: 2,
                  },
                  {
                    target: "operatorAmplitude",
                    envelope: "flare 3",
                    index: 3,
                  },
                  { target: "feedbackAmplitude", envelope: "flare 1" },
                ],
              },
            },
            {
              name: "talking bass",
              generalMidi: !1,
              settings: {
                type: "FM",
                volume: 0,
                eqFilter: [],
                effects: ["chord type"],
                chord: "custom interval",
                fadeInSeconds: 0,
                fadeOutTicks: -3,
                algorithm: "1←(2 3)←4",
                feedbackType: "1⟲",
                feedbackAmplitude: 15,
                operators: [
                  { frequency: "1×", amplitude: 15 },
                  { frequency: "2×", amplitude: 8 },
                  { frequency: "2×", amplitude: 5 },
                  { frequency: "1×", amplitude: 12 },
                ],
                envelopes: [
                  {
                    target: "operatorAmplitude",
                    envelope: "note size",
                    index: 2,
                  },
                  {
                    target: "operatorAmplitude",
                    envelope: "note size",
                    index: 3,
                  },
                  { target: "feedbackAmplitude", envelope: "note size" },
                ],
              },
            },
            {
              name: "synth marimba",
              generalMidi: !1,
              settings: {
                type: "Picked String",
                volume: 0,
                eqFilter: [
                  { type: "high-pass", cutoffHz: 176.78, linearGain: 1 },
                  { type: "peak", cutoffHz: 4e3, linearGain: 0.5 },
                ],
                effects: ["note filter", "echo"],
                noteFilter: [
                  { type: "low-pass", cutoffHz: 6727.17, linearGain: 1.4142 },
                ],
                echoSustain: 71,
                echoDelayBeats: 0.5,
                fadeInSeconds: 0,
                fadeOutTicks: -1,
                harmonics: [
                  86, 100, 29, 29, 0, 0, 0, 100, 0, 0, 0, 86, 29, 0, 14, 100, 0,
                  0, 0, 0, 0, 14, 0, 0, 14, 0, 0, 86,
                ],
                unison: "fifth",
                stringSustain: 7,
                envelopes: [
                  { target: "noteFilterAllFreqs", envelope: "punch" },
                ],
              },
            },
            {
              name: "italian accordian",
              generalMidi: !1,
              settings: {
                type: "custom chip",
                volume: 0,
                eqFilter: [
                  { type: "low-pass", cutoffHz: 6e3, linearGain: 0.5 },
                ],
                eqFilterType: !0,
                eqSimpleCut: 8,
                eqSimplePeak: 1,
                eqSubFilters1: [],
                effects: ["panning", "chorus", "reverb"],
                pan: 0,
                panDelay: 10,
                chorus: 71,
                reverb: 45,
                fadeInSeconds: 0.0263,
                fadeOutTicks: -3,
                wave: "square",
                unison: "honky tonk",
                customChipWave: {
                  0: -24,
                  1: -24,
                  2: -24,
                  3: -24,
                  4: -24,
                  5: -24,
                  6: -24,
                  7: -24,
                  8: -24,
                  9: -24,
                  10: -24,
                  11: -24,
                  12: -24,
                  13: -24,
                  14: -24,
                  15: -24,
                  16: 24,
                  17: 24,
                  18: 24,
                  19: 24,
                  20: 24,
                  21: 24,
                  22: 24,
                  23: 24,
                  24: -24,
                  25: -24,
                  26: -24,
                  27: -24,
                  28: -24,
                  29: -24,
                  30: -24,
                  31: -24,
                  32: -24,
                  33: -24,
                  34: -24,
                  35: -24,
                  36: -24,
                  37: -24,
                  38: -24,
                  39: -24,
                  40: 24,
                  41: 24,
                  42: 24,
                  43: 24,
                  44: 24,
                  45: 24,
                  46: 24,
                  47: 24,
                  48: -24,
                  49: -24,
                  50: -24,
                  51: -24,
                  52: -24,
                  53: -24,
                  54: -24,
                  55: -24,
                  56: -24,
                  57: -24,
                  58: -24,
                  59: -24,
                  60: -24,
                  61: -24,
                  62: -24,
                  63: -24,
                },
                customChipWaveIntegral: {
                  0: 0,
                  1: 0,
                  2: 0,
                  3: 0,
                  4: 0,
                  5: 0,
                  6: 0,
                  7: 0,
                  8: 0,
                  9: 0,
                  10: 0,
                  11: 0,
                  12: 0,
                  13: 0,
                  14: 0,
                  15: 0,
                  16: 0,
                  17: 0,
                  18: 0,
                  19: 0,
                  20: 0,
                  21: 0,
                  22: 0,
                  23: 0,
                  24: 0,
                  25: 0,
                  26: 0,
                  27: 0,
                  28: 0,
                  29: 0,
                  30: 0,
                  31: 0,
                  32: 0,
                  33: 0,
                  34: 0,
                  35: 0,
                  36: 0,
                  37: 0,
                  38: 0,
                  39: 0,
                  40: 0,
                  41: 0,
                  42: 0,
                  43: 0,
                  44: 0,
                  45: 0,
                  46: 0,
                  47: 0,
                  48: 0,
                  49: 0,
                  50: 0,
                  51: 0,
                  52: 0,
                  53: 0,
                  54: 0,
                  55: 0,
                  56: 0,
                  57: 0,
                  58: 0,
                  59: 0,
                  60: 0,
                  61: 0,
                  62: 0,
                  63: 0,
                  64: 0,
                },
                envelopes: [],
              },
            },
            {
              name: "custom chip supersaw",
              generalMidi: !1,
              settings: {
                type: "custom chip",
                volume: 0,
                eqFilter: [
                  { type: "low-pass", cutoffHz: 19027.31, linearGain: 0.7071 },
                ],
                eqFilterType: !0,
                eqSimpleCut: 10,
                eqSimplePeak: 0,
                eqSubFilters1: [],
                effects: [
                  "panning",
                  "transition type",
                  "vibrato",
                  "chorus",
                  "reverb",
                ],
                transition: "interrupt",
                clicklessTransition: !1,
                vibrato: "delayed",
                vibratoDepth: 0.3,
                vibratoDelay: 18.5,
                vibratoSpeed: 10,
                vibratoType: 0,
                pan: 0,
                panDelay: 10,
                chorus: 29,
                reverb: 29,
                fadeInSeconds: 0,
                fadeOutTicks: -1,
                wave: "square",
                unison: "dissonant",
                customChipWave: {
                  0: 22,
                  1: 22,
                  2: 16,
                  3: 6,
                  4: 0,
                  5: -3,
                  6: -8,
                  7: -10,
                  8: -13,
                  9: -16,
                  10: -19,
                  11: -19,
                  12: -20,
                  13: -22,
                  14: -22,
                  15: -24,
                  16: -24,
                  17: -24,
                  18: -24,
                  19: -24,
                  20: -24,
                  21: -24,
                  22: -24,
                  23: -24,
                  24: -24,
                  25: -24,
                  26: -24,
                  27: -24,
                  28: -24,
                  29: -24,
                  30: -24,
                  31: 24,
                  32: 24,
                  33: 16,
                  34: 9,
                  35: 6,
                  36: 4,
                  37: 2,
                  38: 0,
                  39: -1,
                  40: -3,
                  41: -4,
                  42: -4,
                  43: -6,
                  44: -6,
                  45: -6,
                  46: -6,
                  47: -5,
                  48: -5,
                  49: -4,
                  50: -2,
                  51: -2,
                  52: 1,
                  53: 4,
                  54: 6,
                  55: 8,
                  56: 10,
                  57: 12,
                  58: 14,
                  59: 16,
                  60: 18,
                  61: 19,
                  62: 22,
                  63: 24,
                },
                customChipWaveIntegral: {
                  0: 0,
                  1: 0,
                  2: 0,
                  3: 0,
                  4: 0,
                  5: 0,
                  6: 0,
                  7: 0,
                  8: 0,
                  9: 0,
                  10: 0,
                  11: 0,
                  12: 0,
                  13: 0,
                  14: 0,
                  15: 0,
                  16: 0,
                  17: 0,
                  18: 0,
                  19: 0,
                  20: 0,
                  21: 0,
                  22: 0,
                  23: 0,
                  24: 0,
                  25: 0,
                  26: 0,
                  27: 0,
                  28: 0,
                  29: 0,
                  30: 0,
                  31: 0,
                  32: 0,
                  33: 0,
                  34: 0,
                  35: 0,
                  36: 0,
                  37: 0,
                  38: 0,
                  39: 0,
                  40: 0,
                  41: 0,
                  42: 0,
                  43: 0,
                  44: 0,
                  45: 0,
                  46: 0,
                  47: 0,
                  48: 0,
                  49: 0,
                  50: 0,
                  51: 0,
                  52: 0,
                  53: 0,
                  54: 0,
                  55: 0,
                  56: 0,
                  57: 0,
                  58: 0,
                  59: 0,
                  60: 0,
                  61: 0,
                  62: 0,
                  63: 0,
                  64: 0,
                },
                envelopes: [],
              },
            },
            {
              name: "fm supersaw",
              generalMidi: !1,
              settings: {
                type: "FM6op",
                volume: 0,
                eqFilter: [
                  { type: "low-pass", cutoffHz: 19027.31, linearGain: 1.4142 },
                  { type: "high-pass", cutoffHz: 148.65, linearGain: 0.7071 },
                ],
                eqFilterType: !1,
                eqSimpleCut: 10,
                eqSimplePeak: 0,
                eqSubFilters0: [
                  { type: "low-pass", cutoffHz: 19027.31, linearGain: 1.4142 },
                  { type: "high-pass", cutoffHz: 148.65, linearGain: 0.7071 },
                ],
                effects: [
                  "panning",
                  "transition type",
                  "pitch shift",
                  "note filter",
                  "chorus",
                  "reverb",
                ],
                transition: "continue",
                clicklessTransition: !1,
                pitchShiftSemitones: 0,
                noteFilterType: !1,
                noteSimpleCut: 10,
                noteSimplePeak: 0,
                noteFilter: [],
                noteSubFilters0: [],
                noteSubFilters1: [
                  { type: "low-pass", cutoffHz: 4756.83, linearGain: 1 },
                ],
                pan: 0,
                panDelay: 10,
                chorus: 71,
                reverb: 0,
                fadeInSeconds: 0,
                fadeOutTicks: -1,
                algorithm: "1 2 3 4 5 6",
                feedbackType: "1⟲",
                feedbackAmplitude: 0,
                operators: [
                  {
                    frequency: "1×",
                    amplitude: 13,
                    waveform: "sawtooth",
                    pulseWidth: 5,
                  },
                  {
                    frequency: "~1×",
                    amplitude: 15,
                    waveform: "sawtooth",
                    pulseWidth: 5,
                  },
                  {
                    frequency: "2×",
                    amplitude: 10,
                    waveform: "sawtooth",
                    pulseWidth: 5,
                  },
                  {
                    frequency: "3×",
                    amplitude: 7,
                    waveform: "sawtooth",
                    pulseWidth: 5,
                  },
                  {
                    frequency: "4×",
                    amplitude: 9,
                    waveform: "sawtooth",
                    pulseWidth: 5,
                  },
                  {
                    frequency: "8×",
                    amplitude: 6,
                    waveform: "sawtooth",
                    pulseWidth: 5,
                  },
                ],
                envelopes: [],
              },
            },
            {
              name: "obama why",
              generalMidi: !1,
              settings: {
                type: "harmonics",
                volume: 80,
                eqFilter: [],
                effects: ["note filter", "panning", "reverb"],
                noteFilter: [
                  { type: "low-pass", cutoffHz: 840.9, linearGain: 11.3137 },
                ],
                pan: 0,
                reverb: 0,
                fadeInSeconds: 0.0263,
                fadeOutTicks: -3,
                harmonics: [
                  100, 86, 29, 29, 14, 14, 0, 14, 14, 43, 71, 100, 100, 86, 71,
                  71, 57, 57, 43, 43, 43, 43, 43, 0, 0, 0, 0, 0,
                ],
                unison: "octave",
                envelopes: [
                  { target: "noteFilterAllFreqs", envelope: "note size" },
                ],
              },
            },
          ]),
        },
      ]));
    class E {
      constructor() {
        (this.t = 1),
          (this.i = [void 0]),
          (this.o = 0),
          (this.l = 0),
          (this.h = 0);
      }
      pushFront(e) {
        this.h >= this.t && this.u(),
          (this.l = (this.l - 1) & this.o),
          (this.i[this.l] = e),
          this.h++;
      }
      pushBack(e) {
        this.h >= this.t && this.u(),
          (this.i[(this.l + this.h) & this.o] = e),
          this.h++;
      }
      popFront() {
        if (this.h <= 0) throw new Error("No elements left to pop.");
        const e = this.i[this.l];
        return (
          (this.i[this.l] = void 0),
          (this.l = (this.l + 1) & this.o),
          this.h--,
          e
        );
      }
      popBack() {
        if (this.h <= 0) throw new Error("No elements left to pop.");
        this.h--;
        const e = (this.l + this.h) & this.o,
          t = this.i[e];
        return (this.i[e] = void 0), t;
      }
      peakFront() {
        if (this.h <= 0) throw new Error("No elements left to pop.");
        return this.i[this.l];
      }
      peakBack() {
        if (this.h <= 0) throw new Error("No elements left to pop.");
        return this.i[(this.l + this.h - 1) & this.o];
      }
      count() {
        return this.h;
      }
      set(e, t) {
        if (e < 0 || e >= this.h) throw new Error("Invalid index");
        this.i[(this.l + e) & this.o] = t;
      }
      get(e) {
        if (e < 0 || e >= this.h) throw new Error("Invalid index");
        return this.i[(this.l + e) & this.o];
      }
      remove(e) {
        if (e < 0 || e >= this.h) throw new Error("Invalid index");
        if (e <= this.h >> 1) {
          for (; e > 0; ) this.set(e, this.get(e - 1)), e--;
          this.popFront();
        } else {
          for (e++; e < this.h; ) this.set(e - 1, this.get(e)), e++;
          this.popBack();
        }
      }
      u() {
        if (this.t >= 1073741824) throw new Error("Capacity too big.");
        this.t = this.t << 1;
        const e = this.i,
          t = new Array(this.t),
          s = 0 | this.h,
          i = 0 | this.l;
        for (let n = 0; n < s; n++) t[n] = e[(i + n) & this.o];
        for (let e = s; e < this.t; e++) t[e] = void 0;
        (this.l = 0), (this.i = t), (this.o = this.t - 1);
      }
    }
    const A = new (class {
      constructor() {
        (this.activeEvents = []),
          (this.listeners = {}),
          (this.activeEvents = []),
          (this.listeners = {});
      }
      raise(e, t, s) {
        if (null != this.listeners[e]) {
          this.activeEvents.push(e);
          for (let i = 0; i < this.listeners[e].length; i++)
            this.listeners[e][i](t, s);
          this.activeEvents.pop();
        }
      }
      listen(e, t) {
        null == this.listeners[e] && (this.listeners[e] = []),
          this.listeners[e].push(t);
      }
      unlisten(e, t) {
        if (null == this.listeners[e]) return;
        const s = this.listeners[e].indexOf(t);
        -1 != s && this.listeners[e].splice(s, 1);
      }
      unlistenAll(e) {
        null != this.listeners[e] && (this.listeners[e] = []);
      }
    })();
    class H {
      constructor() {
        (this.a = [1]), (this.b = [1]), (this.order = 0);
      }
      linearGain0thOrder(e) {
        (this.b[0] = e), (this.order = 0);
      }
      lowPass1stOrderButterworth(e) {
        const t = 1 / Math.tan(0.5 * e),
          s = 1 + t;
        (this.a[1] = (1 - t) / s),
          (this.b[1] = this.b[0] = 1 / s),
          (this.order = 1);
      }
      lowPass1stOrderSimplified(e) {
        const t = 2 * Math.sin(0.5 * e);
        (this.a[1] = t - 1), (this.b[0] = t), (this.b[1] = 0), (this.order = 1);
      }
      highPass1stOrderButterworth(e) {
        const t = 1 / Math.tan(0.5 * e),
          s = 1 + t;
        (this.a[1] = (1 - t) / s),
          (this.b[0] = t / s),
          (this.b[1] = -t / s),
          (this.order = 1);
      }
      highShelf1stOrder(e, t) {
        const s = Math.tan(0.5 * e),
          i = Math.sqrt(t),
          n = (s * i - 1) / (s * i + 1);
        (this.a[1] = n / 1),
          (this.b[0] = (1 + n + t * (1 - n)) / 2),
          (this.b[1] = (1 + n - t * (1 - n)) / 2),
          (this.order = 1);
      }
      allPass1stOrderInvertPhaseAbove(e) {
        const t = (Math.sin(e) - 1) / Math.cos(e);
        (this.a[1] = t), (this.b[0] = t), (this.b[1] = 1), (this.order = 1);
      }
      allPass1stOrderFractionalDelay(e) {
        const t = (1 - e) / (1 + e);
        (this.a[1] = t), (this.b[0] = t), (this.b[1] = 1), (this.order = 1);
      }
      lowPass2ndOrderButterworth(e, t) {
        const s = Math.sin(e) / (2 * t),
          i = Math.cos(e),
          n = 1 + s;
        (this.a[1] = (-2 * i) / n),
          (this.a[2] = (1 - s) / n),
          (this.b[2] = this.b[0] = (1 - i) / (2 * n)),
          (this.b[1] = (1 - i) / n),
          (this.order = 2);
      }
      lowPass2ndOrderSimplified(e, t) {
        const s = 2 * Math.sin(e / 2),
          i = 1 - 1 / (2 * t),
          n = i + i / (1 - s);
        (this.a[1] = 2 * s + (s - 1) * s * n - 2),
          (this.a[2] = (s - 1) * (s - s * n - 1)),
          (this.b[0] = s * s),
          (this.b[1] = 0),
          (this.b[2] = 0),
          (this.order = 2);
      }
      highPass2ndOrderButterworth(e, t) {
        const s = Math.sin(e) / (2 * t),
          i = Math.cos(e),
          n = 1 + s;
        (this.a[1] = (-2 * i) / n),
          (this.a[2] = (1 - s) / n),
          (this.b[2] = this.b[0] = (1 + i) / (2 * n)),
          (this.b[1] = -(1 + i) / n),
          (this.order = 2);
      }
      peak2ndOrder(e, t, s) {
        const i = Math.sqrt(t),
          n = (s * e) / (i >= 1 ? i : 1 / i),
          a = Math.tan(0.5 * n),
          o = 1 + a / i;
        (this.b[0] = (1 + a * i) / o),
          (this.b[1] = this.a[1] = (-2 * Math.cos(e)) / o),
          (this.b[2] = (1 - a * i) / o),
          (this.a[2] = (1 - a / i) / o),
          (this.order = 2);
      }
    }
    class L {
      constructor() {
        (this.real = 0), (this.imag = 0), (this.denom = 1);
      }
      analyze(e, t) {
        this.analyzeComplex(e, Math.cos(t), Math.sin(t));
      }
      analyzeComplex(e, t, s) {
        const i = e.a,
          n = e.b,
          a = t,
          o = -s;
        let r = n[0] + n[1] * a,
          l = n[1] * o,
          h = 1 + i[1] * a,
          c = i[1] * o,
          u = a,
          p = o;
        for (let t = 2; t <= e.order; t++) {
          const e = u * o + p * a;
          (u = u * a - p * o),
            (p = e),
            (r += n[t] * u),
            (l += n[t] * p),
            (h += i[t] * u),
            (c += i[t] * p);
        }
        (this.denom = h * h + c * c),
          (this.real = r * h + l * c),
          (this.imag = l * h - r * c);
      }
      magnitude() {
        return (
          Math.sqrt(this.real * this.real + this.imag * this.imag) / this.denom
        );
      }
      angle() {
        return Math.atan2(this.imag, this.real);
      }
    }
    class N {
      constructor() {
        (this.a1 = 0),
          (this.a2 = 0),
          (this.b0 = 1),
          (this.b1 = 0),
          (this.b2 = 0),
          (this.a1Delta = 0),
          (this.a2Delta = 0),
          (this.b0Delta = 0),
          (this.b1Delta = 0),
          (this.b2Delta = 0),
          (this.output1 = 0),
          (this.output2 = 0),
          (this.useMultiplicativeInputCoefficients = !1);
      }
      resetOutput() {
        (this.output1 = 0), (this.output2 = 0);
      }
      loadCoefficientsWithGradient(e, t, s, i) {
        if (2 != e.order || 2 != t.order) throw new Error();
        (this.a1 = e.a[1]),
          (this.a2 = e.a[2]),
          (this.b0 = e.b[0]),
          (this.b1 = e.b[1]),
          (this.b2 = e.b[2]),
          (this.a1Delta = (t.a[1] - e.a[1]) * s),
          (this.a2Delta = (t.a[2] - e.a[2]) * s),
          i
            ? ((this.b0Delta = Math.pow(t.b[0] / e.b[0], s)),
              (this.b1Delta = Math.pow(t.b[1] / e.b[1], s)),
              (this.b2Delta = Math.pow(t.b[2] / e.b[2], s)))
            : ((this.b0Delta = (t.b[0] - e.b[0]) * s),
              (this.b1Delta = (t.b[1] - e.b[1]) * s),
              (this.b2Delta = (t.b[2] - e.b[2]) * s)),
          (this.useMultiplicativeInputCoefficients = i);
      }
    }
    const G = 1e-24;
    function V(e, t, s) {
      return s <= (t -= 1) ? (s >= e ? s : e) : t;
    }
    function B(e, t, s) {
      if (e <= s && s <= t) return s;
      throw new Error(`Value ${s} not in range [${e}, ${t}]`);
    }
    function W(e, t) {
      let s = parseFloat(e);
      return Number.isNaN(s) && (s = t), s;
    }
    function $(e, t) {
      let s = parseInt(e);
      return Number.isNaN(s) && (s = t), s;
    }
    function j(e, t) {
      e.push(K[(t >>> 30) & 3]),
        e.push(K[(t >>> 24) & 63]),
        e.push(K[(t >>> 18) & 63]),
        e.push(K[(t >>> 12) & 63]),
        e.push(K[(t >>> 6) & 63]),
        e.push(K[(t >>> 0) & 63]);
    }
    function U(e, t) {
      let s = 0;
      return (
        (s |= J[e.charCodeAt(t++)] << 30),
        (s |= J[e.charCodeAt(t++)] << 24),
        (s |= J[e.charCodeAt(t++)] << 18),
        (s |= J[e.charCodeAt(t++)] << 12),
        (s |= J[e.charCodeAt(t++)] << 6),
        (s |= J[e.charCodeAt(t++)] << 0),
        s
      );
    }
    function _(e) {
      let t = V(0, h.keys.length, e),
        s = 0;
      return (
        12 === e
          ? ((t = 0), (s = 1))
          : 13 === e
          ? ((t = 6), (s = -1))
          : 14 === e
          ? ((t = 0), (s = -1))
          : 15 === e && ((t = 5), (s = -1)),
        [t, s]
      );
    }
    const K = [
        48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 97, 98, 99, 100, 101, 102, 103,
        104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117,
        118, 119, 120, 121, 122, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76,
        77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 45, 95,
      ],
      J = [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 62, 62,
        0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 0, 0, 0, 0, 0, 0, 36, 37, 38, 39,
        40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57,
        58, 59, 60, 61, 0, 0, 0, 0, 63, 0, 10, 11, 12, 13, 14, 15, 16, 17, 18,
        19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 0,
        0, 0, 0, 0,
      ];
    class Q {
      constructor(e, t, s) {
        (this.p = []), (this.m = 0);
        for (let i = t; i < s; i++) {
          const t = J[e.charCodeAt(i)];
          this.p.push((t >> 5) & 1),
            this.p.push((t >> 4) & 1),
            this.p.push((t >> 3) & 1),
            this.p.push((t >> 2) & 1),
            this.p.push((t >> 1) & 1),
            this.p.push(1 & t);
        }
      }
      read(e) {
        let t = 0;
        for (; e > 0; ) (t <<= 1), (t += this.p[this.m++]), e--;
        return t;
      }
      readLongTail(e, t) {
        let s = e,
          i = t;
        for (; this.p[this.m++]; ) (s += 1 << i), i++;
        for (; i > 0; ) i--, this.p[this.m++] && (s += 1 << i);
        return s;
      }
      readPartDuration() {
        return this.readLongTail(1, 3);
      }
      readLegacyPartDuration() {
        return this.readLongTail(1, 2);
      }
      readPinCount() {
        return this.readLongTail(1, 0);
      }
      readPitchInterval() {
        return this.read(1)
          ? -this.readLongTail(1, 3)
          : this.readLongTail(1, 3);
      }
    }
    class Y {
      constructor() {
        (this.v = 0), (this.p = []);
      }
      clear() {
        this.v = 0;
      }
      write(e, t) {
        for (e--; e >= 0; ) (this.p[this.v++] = (t >>> e) & 1), e--;
      }
      writeLongTail(e, t, s) {
        if (s < e) throw new Error("value out of bounds");
        s -= e;
        let i = t;
        for (; s >= 1 << i; ) (this.p[this.v++] = 1), (s -= 1 << i), i++;
        for (this.p[this.v++] = 0; i > 0; )
          i--, (this.p[this.v++] = (s >>> i) & 1);
      }
      writePartDuration(e) {
        this.writeLongTail(1, 3, e);
      }
      writePinCount(e) {
        this.writeLongTail(1, 0, e);
      }
      writePitchInterval(e) {
        e < 0
          ? (this.write(1, 1), this.writeLongTail(1, 3, -e))
          : (this.write(1, 0), this.writeLongTail(1, 3, e));
      }
      concat(e) {
        for (let t = 0; t < e.v; t++) this.p[this.v++] = e.p[t];
      }
      encodeBase64(e) {
        for (let t = 0; t < this.v; t += 6) {
          const s =
            (this.p[t] << 5) |
            (this.p[t + 1] << 4) |
            (this.p[t + 2] << 3) |
            (this.p[t + 3] << 2) |
            (this.p[t + 4] << 1) |
            this.p[t + 5];
          e.push(K[s]);
        }
        return e;
      }
      lengthBase64() {
        return Math.ceil(this.v / 6);
      }
    }
    function X(e, t, s) {
      return { interval: e, time: t, size: s };
    }
    class Z {
      constructor(e, t, s, i, n = !1) {
        (this.pitches = [e]),
          (this.pins = [X(0, 0, i), X(0, s - t, n ? 0 : i)]),
          (this.start = t),
          (this.end = s),
          (this.continuesLastPattern = !1);
      }
      pickMainInterval() {
        let e = 0,
          t = 0;
        for (let s = 1; s < this.pins.length; s++) {
          const i = this.pins[s - 1],
            n = this.pins[s];
          if (i.interval == n.interval) {
            const s = n.time - i.time;
            e < s && ((e = s), (t = i.interval));
          }
        }
        if (0 == e) {
          let e = 0;
          for (let s = 0; s < this.pins.length; s++) {
            const i = this.pins[s];
            e < i.size && ((e = i.size), (t = i.interval));
          }
        }
        return t;
      }
      clone() {
        const e = new Z(-1, this.start, this.end, 3);
        (e.pitches = this.pitches.concat()), (e.pins = []);
        for (const t of this.pins) e.pins.push(X(t.interval, t.time, t.size));
        return (e.continuesLastPattern = this.continuesLastPattern), e;
      }
      getEndPinIndex(e) {
        let t;
        for (
          t = 1;
          t < this.pins.length - 1 && !(this.pins[t].time + this.start > e);
          t++
        );
        return t;
      }
    }
    class ee {
      constructor() {
        (this.notes = []), (this.instruments = [0]);
      }
      cloneNotes() {
        const e = [];
        for (const t of this.notes) e.push(t.clone());
        return e;
      }
      reset() {
        (this.notes.length = 0),
          (this.instruments[0] = 0),
          (this.instruments.length = 1);
      }
      toJsonObject(e, t, s) {
        const i = [];
        for (const n of this.notes) {
          let a = t.instruments[this.instruments[0]],
            o = Math.max(0, h.modCount - n.pitches[0] - 1),
            r = e.getVolumeCapForSetting(
              s,
              a.modulators[o],
              a.modFilterTypes[o]
            );
          const l = [];
          for (const t of n.pins) {
            let i = s ? Math.round(t.size) : Math.round((100 * t.size) / r);
            l.push({
              tick:
                ((t.time + n.start) * h.rhythms[e.rhythm].stepsPerBeat) /
                h.partsPerBeat,
              pitchBend: t.interval,
              volume: i,
              forMod: s,
            });
          }
          const c = { pitches: n.pitches, points: l };
          0 == n.start && (c.continuesLastPattern = n.continuesLastPattern),
            i.push(c);
        }
        const n = { notes: i };
        return (
          e.patternInstruments &&
            (n.instruments = this.instruments.map((e) => e + 1)),
          n
        );
      }
      fromJsonObject(e, t, s, i, n, a) {
        if (t.patternInstruments)
          if (Array.isArray(e.instruments)) {
            const i = e.instruments,
              n = V(
                h.instrumentCountMin,
                t.getMaxInstrumentsPerPatternForChannel(s) + 1,
                i.length
              );
            for (let e = 0; e < n; e++)
              this.instruments[e] = V(0, s.instruments.length, (0 | i[e]) - 1);
            this.instruments.length = n;
          } else
            (this.instruments[0] = V(
              0,
              s.instruments.length,
              (0 | e.instrument) - 1
            )),
              (this.instruments.length = 1);
        if (e.notes && e.notes.length > 0) {
          const o = Math.min(
            t.beatsPerBar * h.partsPerBeat * (a ? h.modCount : 1),
            e.notes.length >>> 0
          );
          for (let r = 0; r < e.notes.length && !(r >= o); r++) {
            const o = e.notes[r];
            if (
              !(
                o &&
                o.pitches &&
                o.pitches.length >= 1 &&
                o.points &&
                o.points.length >= 2
              )
            )
              continue;
            const l = new Z(0, 0, 0, 0);
            (l.pitches = []), (l.pins = []);
            for (let e = 0; e < o.pitches.length; e++) {
              const t = 0 | o.pitches[e];
              if (
                -1 == l.pitches.indexOf(t) &&
                (l.pitches.push(t), l.pitches.length >= h.maxChordSize)
              )
                break;
            }
            if (l.pitches.length < 1) continue;
            let c = 0;
            for (let e = 0; e < o.points.length; e++) {
              const n = o.points[e];
              if (null == n || null == n.tick) continue;
              const r = null == n.pitchBend ? 0 : 0 | n.pitchBend,
                u = Math.round((+n.tick * h.partsPerBeat) / i);
              let p,
                f = s.instruments[this.instruments[0]],
                m = Math.max(0, h.modCount - l.pitches[0] - 1),
                d = t.getVolumeCapForSetting(
                  a,
                  f.modulators[m],
                  f.modFilterTypes[m]
                );
              (p =
                null == n.volume
                  ? d
                  : null == n.forMod
                  ? Math.max(
                      0,
                      Math.min(d, Math.round(((0 | n.volume) * d) / 100))
                    )
                  : (0 | n.forMod) > 0
                  ? Math.round(0 | n.volume)
                  : Math.max(
                      0,
                      Math.min(d, Math.round(((0 | n.volume) * d) / 100))
                    )),
                u > t.beatsPerBar * h.partsPerBeat ||
                  (0 == l.pins.length && ((l.start = u), (c = r)),
                  l.pins.push(X(r - c, u - l.start, p)));
            }
            if (l.pins.length < 2) continue;
            l.end = l.pins[l.pins.length - 1].time + l.start;
            const u = n ? h.drumCount - 1 : h.maxPitch;
            let p = u,
              f = 0;
            for (let e = 0; e < l.pitches.length; e++)
              (l.pitches[e] += c),
                (l.pitches[e] < 0 || l.pitches[e] > u) &&
                  (l.pitches.splice(e, 1), e--),
                l.pitches[e] < p && (p = l.pitches[e]),
                l.pitches[e] > f && (f = l.pitches[e]);
            if (!(l.pitches.length < 1)) {
              for (let e = 0; e < l.pins.length; e++) {
                const t = l.pins[e];
                t.interval + p < 0 && (t.interval = -p),
                  t.interval + f > u && (t.interval = u - f),
                  e >= 2 &&
                    t.interval == l.pins[e - 1].interval &&
                    t.interval == l.pins[e - 2].interval &&
                    t.size == l.pins[e - 1].size &&
                    t.size == l.pins[e - 2].size &&
                    (l.pins.splice(e - 1, 1), e--);
              }
              0 == l.start
                ? (l.continuesLastPattern = !0 === o.continuesLastPattern)
                : (l.continuesLastPattern = !1),
                this.notes.push(l);
            }
          }
        }
      }
    }
    class te {
      constructor(e) {
        (this.frequency = 4),
          (this.amplitude = 0),
          (this.waveform = 0),
          (this.pulseWidth = 0.5),
          this.reset(e);
      }
      reset(e) {
        (this.frequency = 4),
          (this.amplitude = e <= 1 ? h.operatorAmplitudeMax : 0),
          (this.waveform = 0),
          (this.pulseWidth = 5);
      }
      copy(e) {
        (this.frequency = e.frequency),
          (this.amplitude = e.amplitude),
          (this.waveform = e.waveform),
          (this.pulseWidth = e.pulseWidth);
      }
    }
    class se {
      constructor() {
        (this.name = ""),
          (this.carrierCount = 0),
          (this.modulatedBy = [[], [], [], [], [], []]),
          (this.associatedCarrier = []),
          this.fromPreset(1);
      }
      set(e, t) {
        this.reset(), (this.carrierCount = e);
        for (let s = 0; s < this.modulatedBy.length; s++) {
          (this.modulatedBy[s] = t[s]),
            s < e && (this.associatedCarrier[s] = s + 1),
            (this.name += s + 1);
          for (let i = 0; i < t[s].length; i++)
            (this.name += t[s][i]),
              t[s][i] > e - 1 && (this.associatedCarrier[t[s][i] - 1] = s + 1),
              (this.name += ",");
          this.name += s < e ? "|" : ".";
        }
      }
      reset() {
        (this.name = ""),
          (this.carrierCount = 1),
          (this.modulatedBy = [[2, 3, 4, 5, 6], [], [], [], [], []]),
          (this.associatedCarrier = [1, 1, 1, 1, 1, 1]);
      }
      copy(e) {
        (this.name = e.name),
          (this.carrierCount = e.carrierCount),
          (this.modulatedBy = e.modulatedBy),
          (this.associatedCarrier = e.associatedCarrier);
      }
      fromPreset(e) {
        this.reset();
        let t = h.algorithms6Op[e];
        (this.name = t.name), (this.carrierCount = t.carrierCount);
        for (var s = 0; s < t.modulatedBy.length; s++)
          (this.modulatedBy[s] = Array.from(t.modulatedBy[s])),
            (this.associatedCarrier[s] = t.associatedCarrier[s]);
      }
    }
    class ie {
      constructor() {
        (this.name = ""),
          (this.indices = [[], [], [], [], [], []]),
          this.fromPreset(1);
      }
      set(e) {
        this.reset();
        for (let t = 0; t < this.indices.length; t++) {
          this.indices[t] = e[t];
          for (let s = 0; s < e[t].length; s++)
            (this.name += e[t][s]), (this.name += ",");
          this.name += ".";
        }
      }
      reset() {
        this.reset,
          (this.name = ""),
          (this.indices = [[1], [], [], [], [], []]);
      }
      copy(e) {
        (this.name = e.name), (this.indices = e.indices);
      }
      fromPreset(e) {
        this.reset();
        let t = h.feedbacks6Op[e];
        for (var s = 0; s < t.indices.length; s++) {
          this.indices[s] = Array.from(t.indices[s]);
          for (let e = 0; e < t.indices[s].length; e++)
            (this.name += t.indices[s][e]), (this.name += ",");
          this.name += ".";
        }
      }
    }
    class ne {
      constructor(e) {
        (this.spectrum = []), (this.hash = -1), this.reset(e);
      }
      reset(e) {
        for (let t = 0; t < h.spectrumControlPoints; t++)
          if (e)
            this.spectrum[t] = Math.round(
              h.spectrumMax * (1 / Math.sqrt(1 + t / 3))
            );
          else {
            const e =
              0 == t ||
              7 == t ||
              11 == t ||
              14 == t ||
              16 == t ||
              18 == t ||
              21 == t ||
              23 == t ||
              t >= 25;
            this.spectrum[t] = e
              ? Math.max(0, Math.round(h.spectrumMax * (1 - t / 30)))
              : 0;
          }
        this.markCustomWaveDirty();
      }
      markCustomWaveDirty() {
        const e = be.fittingPowerOfTwo(h.spectrumMax + 2) - 1;
        let t = 0;
        for (const s of this.spectrum) t = (t * e + s) >>> 0;
        this.hash = t;
      }
    }
    class ae {
      constructor() {
        (this.wave = null), (this.g = -1);
      }
      getCustomWave(e, t) {
        if (this.g == e.hash) return this.wave;
        this.g = e.hash;
        const s = h.spectrumNoiseLength;
        (null != this.wave && this.wave.length == s + 1) ||
          (this.wave = new Float32Array(s + 1));
        const i = this.wave;
        for (let e = 0; e < s; e++) i[e] = 0;
        const n = [
          0,
          1 / 7,
          Math.log2(5 / 4),
          3 / 7,
          Math.log2(1.5),
          5 / 7,
          6 / 7,
        ];
        function a(e) {
          return (
            t +
            Math.floor(e / h.spectrumControlPointsPerOctave) +
            n[
              (e + h.spectrumControlPointsPerOctave) %
                h.spectrumControlPointsPerOctave
            ]
          );
        }
        let o = 1;
        for (let t = 0; t < h.spectrumControlPoints + 1; t++) {
          const n = t <= 0 ? 0 : e.spectrum[t - 1],
            r =
              t >= h.spectrumControlPoints
                ? e.spectrum[h.spectrumControlPoints - 1]
                : e.spectrum[t],
            l = a(t - 1);
          let c = a(t);
          t >= h.spectrumControlPoints && (c = 14 + 0.25 * (c - 14)),
            (0 == n && 0 == r) ||
              (o +=
                0.02 *
                m(i, s, l, c, n / h.spectrumMax, r / h.spectrumMax, -0.5));
        }
        return (
          e.spectrum[h.spectrumControlPoints - 1] > 0 &&
            (o +=
              0.02 *
              m(
                i,
                s,
                14 + 0.25 * (a(h.spectrumControlPoints) - 14),
                14,
                e.spectrum[h.spectrumControlPoints - 1] / h.spectrumMax,
                0,
                -0.5
              )),
          C(i, s),
          R(i, 5 / (Math.sqrt(s) * Math.pow(o, 0.75))),
          (i[s] = i[0]),
          i
        );
      }
    }
    class oe {
      constructor() {
        (this.harmonics = []), (this.hash = -1), this.reset();
      }
      reset() {
        for (let e = 0; e < h.harmonicsControlPoints; e++)
          this.harmonics[e] = 0;
        (this.harmonics[0] = h.harmonicsMax),
          (this.harmonics[3] = h.harmonicsMax),
          (this.harmonics[6] = h.harmonicsMax),
          this.markCustomWaveDirty();
      }
      markCustomWaveDirty() {
        const e = be.fittingPowerOfTwo(h.harmonicsMax + 2) - 1;
        let t = 0;
        for (const s of this.harmonics) t = (t * e + s) >>> 0;
        this.hash = t;
      }
    }
    class re {
      constructor() {
        (this.wave = null), (this.g = -1);
      }
      getCustomWave(e, t) {
        if (this.g == e.hash && this.S == t) return this.wave;
        (this.g = e.hash), (this.S = t);
        const s =
            7 == t ? h.harmonicsRenderedForPickedString : h.harmonicsRendered,
          i = h.harmonicsWavelength,
          n = f(0, null, null);
        (null != this.wave && this.wave.length == i + 1) ||
          (this.wave = new Float32Array(i + 1));
        const a = this.wave;
        for (let e = 0; e < i; e++) a[e] = 0;
        let o = 1;
        for (let t = 0; t < s; t++) {
          const r = t + 1;
          let l =
            t < h.harmonicsControlPoints
              ? e.harmonics[t]
              : e.harmonics[h.harmonicsControlPoints - 1];
          t >= h.harmonicsControlPoints &&
            (l *=
              1 -
              (t - h.harmonicsControlPoints) / (s - h.harmonicsControlPoints));
          const c = l / h.harmonicsMax;
          let u = Math.pow(2, l - h.harmonicsMax + 1) * Math.sqrt(c);
          t < h.harmonicsControlPoints && (o += u),
            (u *= Math.pow(r, -0.25)),
            (u *= n[t + 589]),
            (a[i - r] = u);
        }
        C(a, i);
        const r = 1 / Math.pow(o, 0.7);
        for (let e = 0; e < a.length; e++) a[e] *= r;
        return (
          (function (e) {
            let t = 0;
            for (let s = 0; s < e.length; s++) {
              const i = e[s];
              (e[s] = t), (t += i);
            }
          })(a),
          (a[i] = a[0]),
          a
        );
      }
    }
    class le {
      constructor() {
        (this.freq = 0), (this.gain = h.filterGainCenter), (this.type = 2);
      }
      set(e, t) {
        (this.freq = e), (this.gain = t);
      }
      getHz() {
        return le.getHzFromSettingValue(this.freq);
      }
      static getHzFromSettingValue(e) {
        return (
          h.filterFreqReferenceHz *
          Math.pow(2, (e - h.filterFreqReferenceSetting) * h.filterFreqStep)
        );
      }
      static getSettingValueFromHz(e) {
        return (
          Math.log2(e / h.filterFreqReferenceHz) / h.filterFreqStep +
          h.filterFreqReferenceSetting
        );
      }
      static getRoundedSettingValueFromHz(e) {
        return Math.max(
          0,
          Math.min(
            h.filterFreqRange - 1,
            Math.round(le.getSettingValueFromHz(e))
          )
        );
      }
      getLinearGain(e = 1) {
        const t = (this.gain - h.filterGainCenter) * h.filterGainStep,
          s = 2 == this.type ? 0 : -0.5,
          i = s + (t - s) * e;
        return Math.pow(2, i);
      }
      static getRoundedSettingValueFromLinearGain(e) {
        return Math.max(
          0,
          Math.min(
            h.filterGainRange - 1,
            Math.round(Math.log2(e) / h.filterGainStep + h.filterGainCenter)
          )
        );
      }
      toCoefficients(e, t, s = 1, i = 1) {
        const n =
            (2 *
              Math.PI *
              Math.max(
                h.filterFreqMinHz,
                Math.min(h.filterFreqMaxHz, s * this.getHz())
              )) /
            t,
          a = this.getLinearGain(i);
        switch (this.type) {
          case 0:
            e.lowPass2ndOrderButterworth(n, a);
            break;
          case 1:
            e.highPass2ndOrderButterworth(n, a);
            break;
          case 2:
            e.peak2ndOrder(n, a, 1);
            break;
          default:
            throw new Error();
        }
      }
      getVolumeCompensationMult() {
        const e = (this.freq - h.filterFreqReferenceSetting) * h.filterFreqStep,
          t = (this.gain - h.filterGainCenter) * h.filterGainStep;
        switch (this.type) {
          case 0:
            const s = (Math.pow(2, e) * h.filterFreqReferenceHz) / 8e3,
              i = (Math.sqrt(1 + 4 * s) - 1) / 2,
              n = Math.log2(i);
            return Math.pow(
              0.5,
              0.2 * Math.max(0, t + 1) +
                Math.min(0, Math.max(-3, 0.595 * n + 0.35 * Math.min(0, t + 1)))
            );
          case 1:
            return Math.pow(
              0.5,
              0.125 * Math.max(0, t + 1) +
                Math.min(
                  0,
                  0.3 * (-e - Math.log2(h.filterFreqReferenceHz / 125)) +
                    0.2 * Math.min(0, t + 1)
                )
            );
          case 2:
            const a = e + Math.log2(h.filterFreqReferenceHz / 2e3),
              o = Math.pow(1 / (1 + Math.pow(a / 3, 2)), 2);
            return Math.pow(
              0.5,
              0.125 * Math.max(0, t) + 0.1 * o * Math.min(0, t)
            );
          default:
            throw new Error();
        }
      }
    }
    class he {
      constructor() {
        (this.controlPoints = []), (this.controlPointCount = 0), this.reset();
      }
      reset() {
        this.controlPointCount = 0;
      }
      addPoint(e, t, s) {
        let i;
        this.controlPoints.length <= this.controlPointCount
          ? ((i = new le()), (this.controlPoints[this.controlPointCount] = i))
          : (i = this.controlPoints[this.controlPointCount]),
          this.controlPointCount++,
          (i.type = e),
          i.set(t, s);
      }
      toJsonObject() {
        const e = [];
        for (let t = 0; t < this.controlPointCount; t++) {
          const s = this.controlPoints[t];
          e.push({
            type: h.filterTypeNames[s.type],
            cutoffHz: Math.round(100 * s.getHz()) / 100,
            linearGain: Math.round(1e4 * s.getLinearGain()) / 1e4,
          });
        }
        return e;
      }
      fromJsonObject(e) {
        if (((this.controlPoints.length = 0), e))
          for (const t of e) {
            const e = new le();
            (e.type = h.filterTypeNames.indexOf(t.type)),
              -1 == e.type && (e.type = 2),
              null != t.cutoffHz
                ? (e.freq = le.getRoundedSettingValueFromHz(t.cutoffHz))
                : (e.freq = 0),
              null != t.linearGain
                ? (e.gain = le.getRoundedSettingValueFromLinearGain(
                    t.linearGain
                  ))
                : (e.gain = h.filterGainCenter),
              this.controlPoints.push(e);
          }
        this.controlPointCount = this.controlPoints.length;
      }
      static filtersCanMorph(e, t) {
        if (e.controlPointCount != t.controlPointCount) return !1;
        for (let s = 0; s < e.controlPointCount; s++)
          if (e.controlPoints[s].type != t.controlPoints[s].type) return !1;
        return !0;
      }
      static lerpFilters(e, t, s) {
        let i = new he();
        if (null == e) return e;
        if (null == t) return t;
        if (((s = Math.max(0, Math.min(1, s))), this.filtersCanMorph(e, t))) {
          for (let n = 0; n < e.controlPointCount; n++)
            (i.controlPoints[n] = new le()),
              (i.controlPoints[n].type = e.controlPoints[n].type),
              (i.controlPoints[n].freq =
                e.controlPoints[n].freq +
                (t.controlPoints[n].freq - e.controlPoints[n].freq) * s),
              (i.controlPoints[n].gain =
                e.controlPoints[n].gain +
                (t.controlPoints[n].gain - e.controlPoints[n].gain) * s);
          return (i.controlPointCount = e.controlPointCount), i;
        }
        return s >= 1 ? t : e;
      }
      convertLegacySettings(e, t, s) {
        this.reset();
        const i = 2 * Math.asin(0.475),
          n = t > 1,
          a = 0 == t,
          o = 10 == e,
          r = 3 == s.type || 4 == s.type || 8 == s.type || 0 == s.type,
          l = 48e3,
          h = 8e3 * Math.pow(2, 0.5 * (e - 10)),
          c = Math.min(i, (2 * Math.PI * h) / l);
        if (1 == s.type && !n && o);
        else if (a) {
          const e = 3.5,
            t = c * Math.pow(2, e),
            s = (l * (t / (1 + t / Math.PI))) / (2 * Math.PI),
            i = le.getRoundedSettingValueFromHz(s),
            n = le.getHzFromSettingValue(i),
            a = (2 * Math.PI * n) / l,
            o = new H();
          o.lowPass1stOrderSimplified(c);
          const h = new L();
          h.analyze(o, a);
          const u = h.magnitude();
          let p = Math.log2(u);
          (p = 0.82 * (p + e) - e), r && (p = Math.min(p, -1));
          const f = Math.pow(2, p),
            m = le.getRoundedSettingValueFromLinearGain(f);
          this.addPoint(0, i, m);
        } else {
          const e = 0.5 / (1 - 0.95 * Math.sqrt(Math.max(0, t - 1) / 6)),
            s = 0.5 / e,
            i =
              c +
              (c * ((c / ((2 * Math.PI * 8e3) / l)) * Math.pow(s, 0.9) + 1) -
                c) *
                s;
          let a;
          a = r
            ? (l * Math.min(i, c * Math.pow(2, 0.25))) / (2 * Math.PI)
            : (l * i) / (2 * Math.PI);
          const o = le.getRoundedSettingValueFromHz(a);
          let h;
          if (r) h = e;
          else {
            const t = new H();
            t.lowPass2ndOrderSimplified(c, e);
            const s = new L();
            s.analyze(t, i), (h = s.magnitude());
          }
          n || (h = Math.min(h, Math.sqrt(0.5)));
          const u = le.getRoundedSettingValueFromLinearGain(h);
          this.addPoint(0, o, u);
        }
        this.controlPoints.length = this.controlPointCount;
      }
      convertLegacySettingsForSynth(e, t, s = !1) {
        this.reset();
        const i = 2 * Math.asin(0.475),
          n = 0 == t && s,
          a = 48e3,
          o = 8e3 * Math.pow(2, 0.5 * (e - 10)),
          r = Math.min(i, (2 * Math.PI * o) / a);
        if (n) {
          const e = 3.5,
            t = r * Math.pow(2, e),
            s = (a * (t / (1 + t / Math.PI))) / (2 * Math.PI),
            i = le.getRoundedSettingValueFromHz(s),
            n = le.getHzFromSettingValue(i),
            o = (2 * Math.PI * n) / a,
            l = new H();
          l.lowPass1stOrderSimplified(r);
          const h = new L();
          h.analyze(l, o);
          const c = h.magnitude();
          let u = Math.log2(c);
          u = 0.82 * (u + e) - e;
          const p = Math.pow(2, u),
            f = le.getRoundedSettingValueFromLinearGain(p);
          this.addPoint(0, i, f);
        } else {
          const e = 0.5 / (1 - 0.95 * Math.sqrt(Math.max(0, t - 1) / 6)),
            s = 0.5 / e,
            i =
              r +
              (r * ((r / ((2 * Math.PI * 8e3) / a)) * Math.pow(s, 0.9) + 1) -
                r) *
                s;
          let n;
          n = (a * i) / (2 * Math.PI);
          const o = le.getSettingValueFromHz(n);
          let l;
          const h = new H();
          h.lowPass2ndOrderSimplified(r, e);
          const c = new L();
          c.analyze(h, i), (l = c.magnitude());
          const u = le.getRoundedSettingValueFromLinearGain(l);
          this.addPoint(0, o, u);
        }
      }
    }
    class ce {
      constructor() {
        (this.target = 0), (this.index = 0), (this.envelope = 0), this.reset();
      }
      reset() {
        (this.target = 0), (this.index = 0), (this.envelope = 0);
      }
      toJsonObject() {
        const e = {
          target: h.instrumentAutomationTargets[this.target].name,
          envelope: h.envelopes[this.envelope].name,
        };
        return (
          h.instrumentAutomationTargets[this.target].maxCount > 1 &&
            (e.index = this.index),
          e
        );
      }
      fromJsonObject(e) {
        this.reset();
        let t = h.instrumentAutomationTargets.dictionary[e.target];
        null == t && (t = h.instrumentAutomationTargets.dictionary.noteVolume),
          (this.target = t.index);
        let s = h.envelopes.dictionary[e.envelope];
        null == s && (s = h.envelopes.dictionary.none),
          (this.envelope = s.index),
          null != e.index
            ? (this.index = V(
                0,
                h.instrumentAutomationTargets[this.target].maxCount,
                0 | e.index
              ))
            : (this.index = 0);
      }
    }
    class ue {
      constructor(e, t) {
        if (
          ((this.type = 0),
          (this.preset = 0),
          (this.chipWave = 2),
          (this.isUsingAdvancedLoopControls = !1),
          (this.chipWaveLoopStart = 0),
          (this.chipWaveLoopEnd =
            h.rawRawChipWaves[this.chipWave].samples.length - 1),
          (this.chipWaveLoopMode = 0),
          (this.chipWavePlayBackwards = !1),
          (this.chipWaveStartOffset = 0),
          (this.chipNoise = 1),
          (this.eqFilter = new he()),
          (this.eqFilterType = !1),
          (this.eqFilterSimpleCut = h.filterSimpleCutRange - 1),
          (this.eqFilterSimplePeak = 0),
          (this.noteFilter = new he()),
          (this.noteFilterType = !1),
          (this.noteFilterSimpleCut = h.filterSimpleCutRange - 1),
          (this.noteFilterSimplePeak = 0),
          (this.eqSubFilters = []),
          (this.noteSubFilters = []),
          (this.envelopes = []),
          (this.fadeIn = 0),
          (this.fadeOut = h.fadeOutNeutral),
          (this.envelopeCount = 0),
          (this.transition = h.transitions.dictionary.normal.index),
          (this.pitchShift = 0),
          (this.detune = 0),
          (this.vibrato = 0),
          (this.interval = 0),
          (this.vibratoDepth = 0),
          (this.vibratoSpeed = 10),
          (this.vibratoDelay = 0),
          (this.vibratoType = 0),
          (this.unison = 0),
          (this.effects = 0),
          (this.chord = 1),
          (this.volume = 0),
          (this.pan = h.panCenter),
          (this.panDelay = 10),
          (this.arpeggioSpeed = 12),
          (this.fastTwoNoteArp = !1),
          (this.legacyTieOver = !1),
          (this.clicklessTransition = !1),
          (this.aliases = !1),
          (this.pulseWidth = h.pulseWidthRange),
          (this.stringSustain = 10),
          (this.distortion = 0),
          (this.bitcrusherFreq = 0),
          (this.bitcrusherQuantization = 0),
          (this.chorus = 0),
          (this.reverb = 0),
          (this.echoSustain = 0),
          (this.echoDelay = 0),
          (this.algorithm = 0),
          (this.feedbackType = 0),
          (this.algorithm6Op = 1),
          (this.feedbackType6Op = 1),
          (this.customAlgorithm = new se()),
          (this.customFeedbackType = new ie()),
          (this.feedbackAmplitude = 0),
          (this.LFOtime = 0),
          (this.nextLFOtime = 0),
          (this.arpTime = 0),
          (this.customChipWave = new Float32Array(64)),
          (this.customChipWaveIntegral = new Float32Array(65)),
          (this.operators = []),
          (this.harmonicsWave = new oe()),
          (this.drumsetEnvelopes = []),
          (this.drumsetSpectrumWaves = []),
          (this.modChannels = []),
          (this.modInstruments = []),
          (this.modulators = []),
          (this.modFilterTypes = []),
          (this.invalidModulators = []),
          t)
        )
          for (let e = 0; e < h.modCount; e++)
            this.modChannels.push(0),
              this.modInstruments.push(0),
              this.modulators.push(h.modulators.dictionary.none.index);
        this.spectrumWave = new ne(e);
        for (let e = 0; e < h.operatorCount + 2; e++)
          this.operators[e] = new te(e);
        for (let e = 0; e < h.drumCount; e++)
          (this.drumsetEnvelopes[e] = h.envelopes.dictionary["twang 2"].index),
            (this.drumsetSpectrumWaves[e] = new ne(!0));
        for (let e = 0; e < 64; e++)
          this.customChipWave[e] = 24 - Math.floor(0.75 * e);
        let s = 0;
        for (let e = 0; e < this.customChipWave.length; e++)
          s += this.customChipWave[e];
        const i = s / this.customChipWave.length;
        let n = 0,
          a = 0;
        for (let e = 0; e < this.customChipWave.length; e++)
          (n += a),
            (a = this.customChipWave[e] - i),
            (this.customChipWaveIntegral[e] = n);
        this.customChipWaveIntegral[64] = 0;
      }
      setTypeAndReset(e, t, s) {
        s && (e = 9),
          (this.type = e),
          (this.preset = e),
          (this.volume = 0),
          (this.effects = 4),
          (this.chorus = h.chorusRange - 1),
          (this.reverb = 0),
          (this.echoSustain = Math.floor(0.5 * (h.echoSustainRange - 1))),
          (this.echoDelay = Math.floor(0.5 * (h.echoDelayRange - 1))),
          this.eqFilter.reset(),
          (this.eqFilterType = !1),
          (this.eqFilterSimpleCut = h.filterSimpleCutRange - 1),
          (this.eqFilterSimplePeak = 0);
        for (let e = 0; e < h.filterMorphCount; e++)
          (this.eqSubFilters[e] = null), (this.noteSubFilters[e] = null);
        switch (
          (this.noteFilter.reset(),
          (this.noteFilterType = !1),
          (this.noteFilterSimpleCut = h.filterSimpleCutRange - 1),
          (this.noteFilterSimplePeak = 0),
          (this.distortion = Math.floor(0.75 * (h.distortionRange - 1))),
          (this.bitcrusherFreq = Math.floor(0.5 * (h.bitcrusherFreqRange - 1))),
          (this.bitcrusherQuantization = Math.floor(
            0.5 * (h.bitcrusherQuantizationRange - 1)
          )),
          (this.pan = h.panCenter),
          (this.panDelay = 10),
          (this.pitchShift = h.pitchShiftCenter),
          (this.detune = h.detuneCenter),
          (this.vibrato = 0),
          (this.unison = 0),
          (this.stringSustain = 10),
          (this.clicklessTransition = !1),
          (this.arpeggioSpeed = 12),
          (this.legacyTieOver = !1),
          (this.aliases = !1),
          (this.fadeIn = 0),
          (this.fadeOut = h.fadeOutNeutral),
          (this.transition = h.transitions.dictionary.normal.index),
          (this.envelopeCount = 0),
          e)
        ) {
          case 0:
            (this.chipWave = 2),
              (this.chord = h.chords.dictionary.arpeggio.index),
              (this.isUsingAdvancedLoopControls = !1),
              (this.chipWaveLoopStart = 0),
              (this.chipWaveLoopEnd =
                h.rawRawChipWaves[this.chipWave].samples.length - 1),
              (this.chipWaveLoopMode = 0),
              (this.chipWavePlayBackwards = !1),
              (this.chipWaveStartOffset = 0);
            break;
          case 8:
            (this.chipWave = 2),
              (this.chord = h.chords.dictionary.arpeggio.index);
            for (let e = 0; e < 64; e++)
              this.customChipWave[e] = 24 - Math.floor(0.75 * e);
            let s = 0;
            for (let e = 0; e < this.customChipWave.length; e++)
              s += this.customChipWave[e];
            const i = s / this.customChipWave.length;
            let n = 0,
              a = 0;
            for (let e = 0; e < this.customChipWave.length; e++)
              (n += a),
                (a = this.customChipWave[e] - i),
                (this.customChipWaveIntegral[e] = n);
            this.customChipWaveIntegral[64] = 0;
            break;
          case 1:
            (this.chord = h.chords.dictionary["custom interval"].index),
              (this.algorithm = 0),
              (this.feedbackType = 0),
              (this.feedbackAmplitude = 0);
            for (let e = 0; e < this.operators.length; e++)
              this.operators[e].reset(e);
            break;
          case 10:
            (this.transition = 1),
              (this.vibrato = 0),
              (this.effects = 1),
              (this.chord = 3),
              (this.algorithm = 0),
              (this.feedbackType = 0),
              (this.algorithm6Op = 1),
              (this.feedbackType6Op = 1),
              this.customAlgorithm.fromPreset(1),
              (this.feedbackAmplitude = 0);
            for (let e = 0; e < this.operators.length; e++)
              this.operators[e].reset(e);
            break;
          case 2:
            (this.chipNoise = 1),
              (this.chord = h.chords.dictionary.arpeggio.index);
            break;
          case 3:
            (this.chord = h.chords.dictionary.simultaneous.index),
              this.spectrumWave.reset(t);
            break;
          case 4:
            this.chord = h.chords.dictionary.simultaneous.index;
            for (let e = 0; e < h.drumCount; e++)
              (this.drumsetEnvelopes[e] =
                h.envelopes.dictionary["twang 2"].index),
                null == this.drumsetSpectrumWaves[e] &&
                  (this.drumsetSpectrumWaves[e] = new ne(!0)),
                this.drumsetSpectrumWaves[e].reset(t);
            break;
          case 5:
            (this.chord = h.chords.dictionary.simultaneous.index),
              this.harmonicsWave.reset();
            break;
          case 6:
            (this.chord = h.chords.dictionary.arpeggio.index),
              (this.pulseWidth = h.pulseWidthRange);
            break;
          case 7:
            (this.chord = h.chords.dictionary.strum.index),
              this.harmonicsWave.reset();
            break;
          case 9:
            (this.transition = 0),
              (this.vibrato = 0),
              (this.interval = 0),
              (this.effects = 0),
              (this.chord = 0),
              (this.modChannels = []),
              (this.modInstruments = []),
              (this.modulators = []);
            for (let e = 0; e < h.modCount; e++)
              this.modChannels.push(-2),
                this.modInstruments.push(0),
                this.modulators.push(h.modulators.dictionary.none.index),
                (this.invalidModulators[e] = !1),
                (this.modFilterTypes[e] = 0);
            break;
          default:
            throw new Error("Unrecognized instrument type: " + e);
        }
        this.chord != h.chords.dictionary.simultaneous.index &&
          (this.effects = 2048 | this.effects);
      }
      convertLegacySettings(e, t) {
        let s = e.filterCutoff,
          i = e.filterResonance,
          n = e.filterEnvelope,
          a = e.pulseEnvelope,
          o = e.operatorEnvelopes,
          r = e.feedbackEnvelope;
        null == s && (s = 0 == this.type ? 6 : 10),
          null == i && (i = 0),
          null == n && (n = h.envelopes.dictionary.none),
          null == a &&
            (a = h.envelopes.dictionary[6 == this.type ? "twang 2" : "none"]),
          null == o &&
            (o = [
              h.envelopes.dictionary[1 == this.type ? "note size" : "none"],
              h.envelopes.dictionary.none,
              h.envelopes.dictionary.none,
              h.envelopes.dictionary.none,
            ]),
          null == r && (r = h.envelopes.dictionary.none);
        10 == s && 2 == n.type && (n = h.envelopes.dictionary.none);
        const l = h.algorithms[this.algorithm].carrierCount;
        let c = !0,
          u = !0,
          p = 0 == n.type || 0 == a.type;
        if (1 == this.type) {
          p = p || 0 == r.type;
          for (let e = 0; e < o.length; e++)
            e < l
              ? 0 != o[e].type
                ? (u = !1)
                : (c = !1)
              : (p = p || 0 == o[e].type);
        }
        (this.envelopeCount = 0),
          1 == this.type &&
            (u && p
              ? this.addEnvelope(
                  h.instrumentAutomationTargets.dictionary.noteVolume.index,
                  0,
                  h.envelopes.dictionary["note size"].index
                )
              : c &&
                !p &&
                this.addEnvelope(
                  h.instrumentAutomationTargets.dictionary.none.index,
                  0,
                  h.envelopes.dictionary["note size"].index
                )),
          1 == n.type
            ? (this.noteFilter.reset(),
              (this.noteFilterType = !1),
              this.eqFilter.convertLegacySettings(s, i, n),
              (this.effects &= -33),
              (t || this.eqFilterType) &&
                ((this.eqFilterType = !0),
                (this.eqFilterSimpleCut = s),
                (this.eqFilterSimplePeak = i)))
            : (this.eqFilter.reset(),
              (this.eqFilterType = !1),
              (this.noteFilterType = !1),
              this.noteFilter.convertLegacySettings(s, i, n),
              (this.effects |= 32),
              this.addEnvelope(
                h.instrumentAutomationTargets.dictionary.noteFilterAllFreqs
                  .index,
                0,
                n.index
              ),
              (t || this.noteFilterType) &&
                ((this.noteFilterType = !0),
                (this.noteFilterSimpleCut = s),
                (this.noteFilterSimplePeak = i))),
          1 != a.type &&
            this.addEnvelope(
              h.instrumentAutomationTargets.dictionary.pulseWidth.index,
              0,
              a.index
            );
        for (let e = 0; e < o.length; e++)
          (e < l && u) ||
            (1 != o[e].type &&
              this.addEnvelope(
                h.instrumentAutomationTargets.dictionary.operatorAmplitude
                  .index,
                e,
                o[e].index
              ));
        1 != r.type &&
          this.addEnvelope(
            h.instrumentAutomationTargets.dictionary.feedbackAmplitude.index,
            0,
            r.index
          );
      }
      toJsonObject() {
        const e = {
          type: h.instrumentTypeNames[this.type],
          volume: this.volume,
          eqFilter: this.eqFilter.toJsonObject(),
          eqFilterType: this.eqFilterType,
          eqSimpleCut: this.eqFilterSimpleCut,
          eqSimplePeak: this.eqFilterSimplePeak,
        };
        this.preset != this.type && (e.preset = this.preset);
        for (let t = 0; t < h.filterMorphCount; t++)
          null != this.eqSubFilters[t] &&
            (e["eqSubFilters" + t] = this.eqSubFilters[t].toJsonObject());
        const t = [];
        for (const e of h.effectOrder)
          this.effects & (1 << e) && t.push(h.effectNames[e]);
        if (
          ((e.effects = t),
          b(this.effects) &&
            ((e.transition = h.transitions[this.transition].name),
            (e.clicklessTransition = this.clicklessTransition)),
          S(this.effects) &&
            ((e.chord = this.getChord().name),
            (e.fastTwoNoteArp = this.fastTwoNoteArp),
            (e.arpeggioSpeed = this.arpeggioSpeed)),
          M(this.effects) && (e.pitchShiftSemitones = this.pitchShift),
          w(this.effects) && (e.detuneCents = be.detuneToCents(this.detune)),
          k(this.effects) &&
            (-1 == this.vibrato && (this.vibrato = 5),
            5 != this.vibrato
              ? (e.vibrato = h.vibratos[this.vibrato].name)
              : (e.vibrato = "custom"),
            (e.vibratoDepth = this.vibratoDepth),
            (e.vibratoDelay = this.vibratoDelay),
            (e.vibratoSpeed = this.vibratoSpeed),
            (e.vibratoType = this.vibratoType)),
          x(this.effects))
        ) {
          (e.noteFilterType = this.noteFilterType),
            (e.noteSimpleCut = this.noteFilterSimpleCut),
            (e.noteSimplePeak = this.noteFilterSimplePeak),
            (e.noteFilter = this.noteFilter.toJsonObject());
          for (let t = 0; t < h.filterMorphCount; t++)
            null != this.noteSubFilters[t] &&
              (e["noteSubFilters" + t] = this.noteSubFilters[t].toJsonObject());
        }
        if (
          (P(this.effects) &&
            ((e.distortion = Math.round(
              (100 * this.distortion) / (h.distortionRange - 1)
            )),
            (e.aliases = this.aliases)),
          F(this.effects) &&
            ((e.bitcrusherOctave =
              (h.bitcrusherFreqRange - 1 - this.bitcrusherFreq) *
              h.bitcrusherOctaveStep),
            (e.bitcrusherQuantization = Math.round(
              (100 * this.bitcrusherQuantization) /
                (h.bitcrusherQuantizationRange - 1)
            ))),
          I(this.effects) &&
            ((e.pan = Math.round(
              (100 * (this.pan - h.panCenter)) / h.panCenter
            )),
            (e.panDelay = this.panDelay)),
          q(this.effects) &&
            (e.chorus = Math.round((100 * this.chorus) / (h.chorusRange - 1))),
          T(this.effects) &&
            ((e.echoSustain = Math.round(
              (100 * this.echoSustain) / (h.echoSustainRange - 1)
            )),
            (e.echoDelayBeats =
              Math.round(
                (1e3 * (this.echoDelay + 1) * h.echoDelayStepTicks) /
                  (h.ticksPerPart * h.partsPerBeat)
              ) / 1e3)),
          D(this.effects) &&
            (e.reverb = Math.round((100 * this.reverb) / (h.reverbRange - 1))),
          4 != this.type &&
            ((e.fadeInSeconds =
              Math.round(1e4 * be.fadeInSettingToSeconds(this.fadeIn)) / 1e4),
            (e.fadeOutTicks = be.fadeOutSettingToTicks(this.fadeOut))),
          5 == this.type || 7 == this.type)
        ) {
          e.harmonics = [];
          for (let t = 0; t < h.harmonicsControlPoints; t++)
            e.harmonics[t] = Math.round(
              (100 * this.harmonicsWave.harmonics[t]) / h.harmonicsMax
            );
        }
        if (2 == this.type) e.wave = h.chipNoises[this.chipNoise].name;
        else if (3 == this.type) {
          e.spectrum = [];
          for (let t = 0; t < h.spectrumControlPoints; t++)
            e.spectrum[t] = Math.round(
              (100 * this.spectrumWave.spectrum[t]) / h.spectrumMax
            );
        } else if (4 == this.type) {
          e.drums = [];
          for (let t = 0; t < h.drumCount; t++) {
            const s = [];
            for (let e = 0; e < h.spectrumControlPoints; e++)
              s[e] = Math.round(
                (100 * this.drumsetSpectrumWaves[t].spectrum[e]) / h.spectrumMax
              );
            e.drums[t] = {
              filterEnvelope: this.getDrumsetEnvelope(t).name,
              spectrum: s,
            };
          }
        } else if (0 == this.type)
          (e.wave = h.chipWaves[this.chipWave].name),
            (e.unison = h.unisons[this.unison].name),
            (e.isUsingAdvancedLoopControls = this.isUsingAdvancedLoopControls),
            (e.chipWaveLoopStart = this.chipWaveLoopStart),
            (e.chipWaveLoopEnd = this.chipWaveLoopEnd),
            (e.chipWaveLoopMode = this.chipWaveLoopMode),
            (e.chipWavePlayBackwards = this.chipWavePlayBackwards),
            (e.chipWaveStartOffset = this.chipWaveStartOffset);
        else if (6 == this.type) e.pulseWidth = this.pulseWidth;
        else if (7 == this.type)
          (e.unison = h.unisons[this.unison].name),
            (e.stringSustain = Math.round(
              (100 * this.stringSustain) / (h.stringSustainRange - 1)
            ));
        else if (5 == this.type) e.unison = h.unisons[this.unison].name;
        else if (1 == this.type || 10 == this.type) {
          const t = [];
          for (const e of this.operators)
            t.push({
              frequency: h.operatorFrequencies[e.frequency].name,
              amplitude: e.amplitude,
              waveform: h.operatorWaves[e.waveform].name,
              pulseWidth: e.pulseWidth,
            });
          if (1 == this.type)
            (e.algorithm = h.algorithms[this.algorithm].name),
              (e.feedbackType = h.feedbacks[this.feedbackType].name),
              (e.feedbackAmplitude = this.feedbackAmplitude),
              (e.operators = t);
          else {
            if (
              ((e.algorithm = h.algorithms6Op[this.algorithm6Op].name),
              (e.feedbackType = h.feedbacks6Op[this.feedbackType6Op].name),
              (e.feedbackAmplitude = this.feedbackAmplitude),
              0 == this.algorithm6Op)
            ) {
              const t = {};
              (t.mods = this.customAlgorithm.modulatedBy),
                (t.carrierCount = this.customAlgorithm.carrierCount),
                (e.customAlgorithm = t);
            }
            if (0 == this.feedbackType6Op) {
              const t = {};
              (t.mods = this.customFeedbackType.indices),
                (e.customFeedback = t);
            }
            e.operators = t;
          }
        } else if (8 == this.type) {
          (e.wave = h.chipWaves[this.chipWave].name),
            (e.unison = h.unisons[this.unison].name),
            (e.customChipWave = new Float64Array(64)),
            (e.customChipWaveIntegral = new Float64Array(65));
          for (let t = 0; t < this.customChipWave.length; t++)
            e.customChipWave[t] = this.customChipWave[t];
        } else {
          if (9 != this.type) throw new Error("Unrecognized instrument type");
          (e.modChannels = []),
            (e.modInstruments = []),
            (e.modSettings = []),
            (e.modStatuses = []);
          for (let t = 0; t < h.modCount; t++)
            (e.modChannels[t] = this.modChannels[t]),
              (e.modInstruments[t] = this.modInstruments[t]),
              (e.modSettings[t] = this.modulators[t]);
        }
        const s = [];
        for (let e = 0; e < this.envelopeCount; e++)
          s.push(this.envelopes[e].toJsonObject());
        return (e.envelopes = s), e;
      }
      fromJsonObject(e, t, s, i, n, a = 0) {
        null == e && (e = {});
        let o = h.instrumentTypeNames.indexOf(e.type);
        if (
          (-1 == o && (o = s ? 9 : t ? 2 : 0),
          this.setTypeAndReset(o, t, s),
          null != e.preset && (this.preset = e.preset >>> 0),
          null != e.volume
            ? (this.volume = V(
                -h.volumeRange / 2,
                h.volumeRange / 2 + 1,
                0 | e.volume
              ))
            : (this.volume = 0),
          Array.isArray(e.effects))
        ) {
          let t = 0;
          for (let s = 0; s < e.effects.length; s++)
            t |= 1 << h.effectNames.indexOf(e.effects[s]);
          this.effects = 4095 & t;
        } else {
          const t = ["none", "reverb", "chorus", "chorus & reverb"];
          (this.effects = t.indexOf(e.effects)),
            -1 == this.effects && (this.effects = 2 == this.type ? 0 : 1);
        }
        this.transition = h.transitions.dictionary.normal.index;
        const r = e.transition || e.envelope;
        if (null != r) {
          let t = h.transitions.dictionary[r];
          if (null == e.fadeInSeconds || null == e.fadeOutTicks) {
            const e = {
              binary: {
                transition: "interrupt",
                fadeInSeconds: 0,
                fadeOutTicks: -1,
              },
              seamless: {
                transition: "interrupt",
                fadeInSeconds: 0,
                fadeOutTicks: -1,
              },
              sudden: {
                transition: "normal",
                fadeInSeconds: 0,
                fadeOutTicks: -3,
              },
              hard: {
                transition: "normal",
                fadeInSeconds: 0,
                fadeOutTicks: -3,
              },
              smooth: {
                transition: "normal",
                fadeInSeconds: 0.025,
                fadeOutTicks: -3,
              },
              soft: {
                transition: "normal",
                fadeInSeconds: 0.025,
                fadeOutTicks: -3,
              },
              slide: {
                transition: "slide in pattern",
                fadeInSeconds: 0.025,
                fadeOutTicks: -3,
              },
              "cross fade": {
                transition: "normal",
                fadeInSeconds: 0.04,
                fadeOutTicks: 6,
              },
              "hard fade": {
                transition: "normal",
                fadeInSeconds: 0,
                fadeOutTicks: 48,
              },
              "medium fade": {
                transition: "normal",
                fadeInSeconds: 0.0125,
                fadeOutTicks: 72,
              },
              "soft fade": {
                transition: "normal",
                fadeInSeconds: 0.06,
                fadeOutTicks: 96,
              },
            }[r];
            null != e &&
              ((t = h.transitions.dictionary[e.transition]),
              (this.fadeIn = be.secondsToFadeInSetting(e.fadeInSeconds)),
              (this.fadeOut = be.ticksToFadeOutSetting(e.fadeOutTicks)));
          }
          null != t && (this.transition = t.index),
            this.transition != h.transitions.dictionary.normal.index &&
              (this.effects = 1024 | this.effects);
        }
        null != e.fadeInSeconds &&
          (this.fadeIn = be.secondsToFadeInSetting(+e.fadeInSeconds)),
          null != e.fadeOutTicks &&
            (this.fadeOut = be.ticksToFadeOutSetting(+e.fadeOutTicks));
        {
          const t = e.chord,
            s = { harmony: "simultaneous" },
            i = h.chords.dictionary[s[t]] || h.chords.dictionary[t];
          null != i
            ? (this.chord = i.index)
            : 2 == this.type
            ? (this.chord = h.chords.dictionary.arpeggio.index)
            : 7 == this.type
            ? (this.chord = h.chords.dictionary.strum.index)
            : 0 == this.type
            ? (this.chord = h.chords.dictionary.arpeggio.index)
            : 1 == this.type || 10 == this.type
            ? (this.chord = h.chords.dictionary["custom interval"].index)
            : (this.chord = h.chords.dictionary.simultaneous.index);
        }
        this.unison = h.unisons.dictionary.none.index;
        const l = e.unison || e.interval || e.chorus;
        if (null != l) {
          const e = { union: "none", fifths: "fifth", octaves: "octave" },
            t = h.unisons.dictionary[e[l]] || h.unisons.dictionary[l];
          null != t && (this.unison = t.index);
        }
        "custom harmony" == e.chorus &&
          ((this.unison = h.unisons.dictionary.hum.index),
          (this.chord = h.chords.dictionary["custom interval"].index)),
          this.chord == h.chords.dictionary.simultaneous.index ||
            Array.isArray(e.effects) ||
            (this.effects = 2048 | this.effects),
          null != e.pitchShiftSemitones &&
            (this.pitchShift = V(
              0,
              h.pitchShiftRange,
              Math.round(+e.pitchShiftSemitones)
            )),
          null != e.detuneCents &&
            (this.detune = V(
              h.detuneMin,
              h.detuneMax + 1,
              Math.round(be.centsToDetune(+e.detuneCents))
            )),
          (this.vibrato = h.vibratos.dictionary.none.index);
        const c = e.vibrato || e.effect;
        if (null != c) {
          const t = {
              "vibrato light": "light",
              "vibrato delayed": "delayed",
              "vibrato heavy": "heavy",
            },
            s = h.vibratos.dictionary[t[l]] || h.vibratos.dictionary[c];
          null != s
            ? (this.vibrato = s.index)
            : "custom" == c && (this.vibrato = h.vibratos.length),
            this.vibrato == h.vibratos.length
              ? ((this.vibratoDepth = e.vibratoDepth),
                (this.vibratoSpeed = e.vibratoSpeed),
                (this.vibratoDelay = e.vibratoDelay),
                (this.vibratoType = e.vibratoType))
              : ((this.vibratoDepth = h.vibratos[this.vibrato].amplitude),
                (this.vibratoDelay = h.vibratos[this.vibrato].delayTicks / 2),
                (this.vibratoSpeed = 10),
                (this.vibratoType = h.vibratos[this.vibrato].type)),
            s != h.vibratos.dictionary.none &&
              (this.effects = 512 | this.effects);
        }
        if (
          (null != e.pan
            ? ((this.pan = V(
                0,
                h.panMax + 1,
                Math.round(h.panCenter + ((0 | e.pan) * h.panCenter) / 100)
              )),
              this.pan != h.panCenter && (this.effects = 4 | this.effects))
            : ((this.pan = h.panCenter), (this.effects = 4 | this.effects)),
          null != e.panDelay
            ? (this.panDelay = 0 | e.panDelay)
            : (this.panDelay = 10),
          null != e.detune
            ? (this.detune = V(h.detuneMin, h.detuneMax + 1, 0 | e.detune))
            : null == e.detuneCents && (this.detune = h.detuneCenter),
          null != e.distortion &&
            (this.distortion = V(
              0,
              h.distortionRange,
              Math.round(((h.distortionRange - 1) * (0 | e.distortion)) / 100)
            )),
          null != e.bitcrusherOctave &&
            (this.bitcrusherFreq =
              h.bitcrusherFreqRange -
              1 -
              +e.bitcrusherOctave / h.bitcrusherOctaveStep),
          null != e.bitcrusherQuantization &&
            (this.bitcrusherQuantization = V(
              0,
              h.bitcrusherQuantizationRange,
              Math.round(
                ((h.bitcrusherQuantizationRange - 1) *
                  (0 | e.bitcrusherQuantization)) /
                  100
              )
            )),
          null != e.echoSustain &&
            (this.echoSustain = V(
              0,
              h.echoSustainRange,
              Math.round(((h.echoSustainRange - 1) * (0 | e.echoSustain)) / 100)
            )),
          null != e.echoDelayBeats &&
            (this.echoDelay = V(
              0,
              h.echoDelayRange,
              Math.round(
                (+e.echoDelayBeats * (h.ticksPerPart * h.partsPerBeat)) /
                  h.echoDelayStepTicks -
                  1
              )
            )),
          isNaN(e.chorus) ||
            (this.chorus = V(
              0,
              h.chorusRange,
              Math.round(((h.chorusRange - 1) * (0 | e.chorus)) / 100)
            )),
          null != e.reverb
            ? (this.reverb = V(
                0,
                h.reverbRange,
                Math.round(((h.reverbRange - 1) * (0 | e.reverb)) / 100)
              ))
            : (this.reverb = a),
          null != e.pulseWidth
            ? (this.pulseWidth = V(
                1,
                h.pulseWidthRange + 1,
                Math.round(e.pulseWidth)
              ))
            : (this.pulseWidth = h.pulseWidthRange),
          null != e.harmonics)
        ) {
          for (let t = 0; t < h.harmonicsControlPoints; t++)
            this.harmonicsWave.harmonics[t] = Math.max(
              0,
              Math.min(
                h.harmonicsMax,
                Math.round((h.harmonicsMax * +e.harmonics[t]) / 100)
              )
            );
          this.harmonicsWave.markCustomWaveDirty();
        } else this.harmonicsWave.reset();
        if (null != e.spectrum)
          for (let t = 0; t < h.spectrumControlPoints; t++)
            this.spectrumWave.spectrum[t] = Math.max(
              0,
              Math.min(
                h.spectrumMax,
                Math.round((h.spectrumMax * +e.spectrum[t]) / 100)
              )
            );
        else this.spectrumWave.reset(t);
        null != e.stringSustain
          ? (this.stringSustain = V(
              0,
              h.stringSustainRange,
              Math.round(
                ((h.stringSustainRange - 1) * (0 | e.stringSustain)) / 100
              )
            ))
          : (this.stringSustain = 10),
          2 == this.type &&
            ((this.chipNoise = h.chipNoises.findIndex((t) => t.name == e.wave)),
            -1 == this.chipNoise && (this.chipNoise = 1));
        const u = {
            custom: "note size",
            steady: "none",
            "pluck 1": "twang 1",
            "pluck 2": "twang 2",
            "pluck 3": "twang 3",
          },
          p = (e) =>
            null != u[e]
              ? h.envelopes.dictionary[u[e]]
              : h.envelopes.dictionary[e];
        if (4 == this.type && null != e.drums)
          for (let t = 0; t < h.drumCount; t++) {
            const s = e.drums[t];
            if (null != s) {
              if (
                ((this.drumsetEnvelopes[t] =
                  h.envelopes.dictionary["twang 2"].index),
                null != s.filterEnvelope)
              ) {
                const e = p(s.filterEnvelope);
                null != e && (this.drumsetEnvelopes[t] = e.index);
              }
              if (null != s.spectrum)
                for (let e = 0; e < h.spectrumControlPoints; e++)
                  this.drumsetSpectrumWaves[t].spectrum[e] = Math.max(
                    0,
                    Math.min(
                      h.spectrumMax,
                      Math.round((h.spectrumMax * +s.spectrum[e]) / 100)
                    )
                  );
            }
          }
        if (0 == this.type) {
          const t = {
              triangle: 1,
              square: 2,
              "pulse wide": 3,
              "pulse narrow": 4,
              sawtooth: 5,
              "double saw": 6,
              "double pulse": 7,
              spiky: 8,
              plateau: 0,
            },
            s = {
              "10% pulse": 22,
              "sunsoft bass": 23,
              "loud pulse": 24,
              sax: 25,
              guitar: 26,
              "atari bass": 28,
              "atari pulse": 29,
              "1% pulse": 30,
              "curved sawtooth": 31,
              viola: 32,
              brass: 33,
              "acoustic bass": 34,
              lyre: 35,
              "ramp pulse": 36,
              piccolo: 37,
              squaretooth: 38,
              flatline: 39,
              "pnryshk a (u5)": 40,
              "pnryshk b (riff)": 41,
            },
            i = {
              "shrill lute": 42,
              "shrill bass": 44,
              "nes pulse": 45,
              "saw bass": 46,
              euphonium: 47,
              "shrill pulse": 48,
              "r-sawtooth": 49,
              recorder: 50,
              "narrow saw": 51,
              "deep square": 52,
              "ring pulse": 53,
              "double sine": 54,
              contrabass: 55,
              "double bass": 56,
            },
            n = {
              "semi-square": 63,
              "deep square": 64,
              squaretal: 40,
              "saw wide": 65,
              "saw narrow ": 66,
              "deep sawtooth": 67,
              sawtal: 68,
              pulse: 69,
              "triple pulse": 70,
              "high pulse": 71,
              "deep pulse": 72,
            },
            a = {
              test1: 56,
              "pokey 4bit lfsr": 57,
              "pokey 5step bass": 58,
              "isolated spiky": 59,
              "unnamed 1": 60,
              "unnamed 2": 61,
              "guitar string": 75,
              intense: 76,
              "buzz wave": 77,
              "pokey square": 57,
              "pokey bass": 58,
              "banana wave": 83,
              "test 1": 84,
              "test 2": 84,
              "real snare": 85,
              "earthbound o. guitar": 86,
            },
            o = {
              kick: 87,
              snare: 88,
              piano1: 89,
              WOW: 90,
              overdrive: 91,
              trumpet: 92,
              saxophone: 93,
              orchestrahit: 94,
              "detached violin": 95,
              synth: 96,
              sonic3snare: 97,
              "come on": 98,
              choir: 99,
              overdriveguitar: 100,
              flute: 101,
              "legato violin": 102,
              "tremolo violin": 103,
              "amen break": 104,
              "pizzicato violin": 105,
              "tim allen grunt": 106,
              tuba: 107,
              loopingcymbal: 108,
              standardkick: 109,
              standardsnare: 110,
              closedhihat: 111,
              foothihat: 112,
              openhihat: 113,
              crashcymbal: 114,
              pianoC4: 115,
              "liver pad": 116,
              marimba: 117,
              susdotwav: 118,
              wackyboxtts: 119,
            };
          this.chipWave = -1;
          const r = e.wave;
          for (const e of [t, s, i, n, a, o])
            if (
              -1 == this.chipWave &&
              null != e[r] &&
              null != h.chipWaves[e[r]]
            ) {
              this.chipWave = e[r];
              break;
            }
          if (-1 == this.chipWave) {
            const e = h.chipWaves.findIndex((e) => e.name == r);
            -1 != e && (this.chipWave = e);
          }
          -1 == this.chipWave && (this.chipWave = 1);
        }
        if (1 == this.type || 10 == this.type) {
          1 == this.type
            ? ((this.algorithm = h.algorithms.findIndex(
                (t) => t.name == e.algorithm
              )),
              -1 == this.algorithm && (this.algorithm = 0),
              (this.feedbackType = h.feedbacks.findIndex(
                (t) => t.name == e.feedbackType
              )),
              -1 == this.feedbackType && (this.feedbackType = 0))
            : ((this.algorithm6Op = h.algorithms6Op.findIndex(
                (t) => t.name == e.algorithm
              )),
              -1 == this.algorithm6Op && (this.algorithm6Op = 1),
              0 == this.algorithm6Op
                ? this.customAlgorithm.set(
                    e.customAlgorithm.carrierCount,
                    e.customAlgorithm.mods
                  )
                : this.customAlgorithm.fromPreset(this.algorithm6Op),
              (this.feedbackType6Op = h.feedbacks6Op.findIndex(
                (t) => t.name == e.feedbackType
              )),
              -1 == this.feedbackType6Op && (this.feedbackType6Op = 1),
              0 == this.feedbackType6Op
                ? this.customFeedbackType.set(e.customFeedback.mods)
                : this.customFeedbackType.fromPreset(this.feedbackType6Op)),
            null != e.feedbackAmplitude
              ? (this.feedbackAmplitude = V(
                  0,
                  h.operatorAmplitudeMax + 1,
                  0 | e.feedbackAmplitude
                ))
              : (this.feedbackAmplitude = 0);
          for (
            let t = 0;
            t < h.operatorCount + (10 == this.type ? 2 : 0);
            t++
          ) {
            const s = this.operators[t];
            let i;
            null != e.operators && (i = e.operators[t]),
              null == i && (i = {}),
              (s.frequency = h.operatorFrequencies.findIndex(
                (e) => e.name == i.frequency
              )),
              -1 == s.frequency && (s.frequency = 0),
              null != i.amplitude
                ? (s.amplitude = V(
                    0,
                    h.operatorAmplitudeMax + 1,
                    0 | i.amplitude
                  ))
                : (s.amplitude = 0),
              null != i.waveform
                ? ((s.waveform = h.operatorWaves.findIndex(
                    (e) => e.name == i.waveform
                  )),
                  -1 == s.waveform &&
                    ("square" == i.waveform
                      ? ((s.waveform =
                          h.operatorWaves.dictionary["pulse width"].index),
                        (s.pulseWidth = 5))
                      : (s.waveform = 0)))
                : (s.waveform = 0),
              null != i.pulseWidth
                ? (s.pulseWidth = 0 | i.pulseWidth)
                : (s.pulseWidth = 5);
          }
        } else if (8 == this.type) {
          if (e.customChipWave) {
            for (let t = 0; t < 64; t++)
              this.customChipWave[t] = e.customChipWave[t];
            let t = 0;
            for (let e = 0; e < this.customChipWave.length; e++)
              t += this.customChipWave[e];
            const s = t / this.customChipWave.length;
            let i = 0,
              n = 0;
            for (let e = 0; e < this.customChipWave.length; e++)
              (i += n),
                (n = this.customChipWave[e] - s),
                (this.customChipWaveIntegral[e] = i);
            this.customChipWaveIntegral[64] = 0;
          }
        } else if (9 == this.type && null != e.modChannels)
          for (let t = 0; t < h.modCount; t++)
            (this.modChannels[t] = e.modChannels[t]),
              (this.modInstruments[t] = e.modInstruments[t]),
              (this.modulators[t] = e.modSettings[t]);
        if (9 != this.type) {
          this.chord == h.chords.dictionary.arpeggio.index &&
          null != e.arpeggioSpeed
            ? (this.arpeggioSpeed = e.arpeggioSpeed)
            : (this.arpeggioSpeed = i ? 9 : 12),
            null != e.fastTwoNoteArp
              ? (this.fastTwoNoteArp = e.fastTwoNoteArp)
              : (this.fastTwoNoteArp = n),
            null != e.clicklessTransition
              ? (this.clicklessTransition = e.clicklessTransition)
              : (this.clicklessTransition = !1),
            null != e.aliases
              ? (this.aliases = e.aliases)
              : (this.aliases = !1),
            null != e.noteFilterType &&
              (this.noteFilterType = e.noteFilterType),
            null != e.noteSimpleCut &&
              (this.noteFilterSimpleCut = e.noteSimpleCut),
            null != e.noteSimplePeak &&
              (this.noteFilterSimplePeak = e.noteSimplePeak),
            null != e.noteFilter
              ? this.noteFilter.fromJsonObject(e.noteFilter)
              : this.noteFilter.reset();
          for (let t = 0; t < h.filterMorphCount; t++)
            Array.isArray(e["noteSubFilters" + t]) &&
              ((this.noteSubFilters[t] = new he()),
              this.noteSubFilters[t].fromJsonObject(e["noteSubFilters" + t]));
          if (
            (null != e.eqFilterType && (this.eqFilterType = e.eqFilterType),
            null != e.eqSimpleCut && (this.eqFilterSimpleCut = e.eqSimpleCut),
            null != e.eqSimplePeak &&
              (this.eqFilterSimplePeak = e.eqSimplePeak),
            Array.isArray(e.eqFilter))
          )
            this.eqFilter.fromJsonObject(e.eqFilter);
          else {
            this.eqFilter.reset();
            const t = {},
              s = 8e3,
              i = 11,
              n = 8;
            if (
              (null != e.filterCutoffHz
                ? (t.filterCutoff = V(
                    0,
                    i,
                    Math.round(
                      i -
                        1 +
                        (2 * Math.log((0 | e.filterCutoffHz) / s)) / Math.LN2
                    )
                  ))
                : (t.filterCutoff = 0 == this.type ? 6 : 10),
              null != e.filterResonance
                ? (t.filterResonance = V(
                    0,
                    n,
                    Math.round(((n - 1) * (0 | e.filterResonance)) / 100)
                  ))
                : (t.filterResonance = 0),
              (t.filterEnvelope = p(e.filterEnvelope)),
              (t.pulseEnvelope = p(e.pulseEnvelope)),
              (t.feedbackEnvelope = p(e.feedbackEnvelope)),
              Array.isArray(e.operators))
            ) {
              t.operatorEnvelopes = [];
              for (let s = 0; s < h.operatorCount; s++) {
                let i;
                null != e.operators[s] && (i = p(e.operators[s].envelope)),
                  (t.operatorEnvelopes[s] =
                    null != i ? i : h.envelopes.dictionary.none);
              }
            }
            if (null != e.filter) {
              const s = [10, 6, 3, 0, 8, 5, 2],
                i = [
                  "none",
                  "none",
                  "none",
                  "none",
                  "decay 1",
                  "decay 2",
                  "decay 3",
                ],
                n = [
                  "none",
                  "bright",
                  "medium",
                  "soft",
                  "decay bright",
                  "decay medium",
                  "decay soft",
                ],
                a = {
                  "sustain sharp": 1,
                  "sustain medium": 2,
                  "sustain soft": 3,
                  "decay sharp": 4,
                };
              let o = null != a[e.filter] ? a[e.filter] : n.indexOf(e.filter);
              -1 == o && (o = 0),
                (t.filterCutoff = s[o]),
                (t.filterEnvelope = p(i[o])),
                (t.filterResonance = 0);
            }
            this.convertLegacySettings(t, !0);
          }
          for (let t = 0; t < h.filterMorphCount; t++)
            Array.isArray(e["eqSubFilters" + t]) &&
              ((this.eqSubFilters[t] = new he()),
              this.eqSubFilters[t].fromJsonObject(e["eqSubFilters" + t]));
          if (Array.isArray(e.envelopes)) {
            const t = e.envelopes;
            for (
              let e = 0;
              e < t.length && !(this.envelopeCount >= h.maxEnvelopeCount);
              e++
            ) {
              const s = new ce();
              s.fromJsonObject(t[e]),
                this.addEnvelope(s.target, s.index, s.envelope);
            }
          }
        }
        0 === o &&
          (null != e.isUsingAdvancedLoopControls
            ? ((this.isUsingAdvancedLoopControls =
                e.isUsingAdvancedLoopControls),
              (this.chipWaveLoopStart = e.chipWaveLoopStart),
              (this.chipWaveLoopEnd = e.chipWaveLoopEnd),
              (this.chipWaveLoopMode = e.chipWaveLoopMode),
              (this.chipWavePlayBackwards = e.chipWavePlayBackwards),
              (this.chipWaveStartOffset = e.chipWaveStartOffset))
            : ((this.isUsingAdvancedLoopControls = !1),
              (this.chipWaveLoopStart = 0),
              (this.chipWaveLoopEnd =
                h.rawRawChipWaves[this.chipWave].samples.length - 1),
              (this.chipWaveLoopMode = 0),
              (this.chipWavePlayBackwards = !1),
              (this.chipWaveStartOffset = 0)));
      }
      static frequencyFromPitch(e) {
        return 440 * Math.pow(2, (e - 69) / 12);
      }
      addEnvelope(e, t, s) {
        let i = !1;
        if (
          (this.supportsEnvelopeTarget(e, t) || (i = !0),
          this.envelopeCount >= h.maxEnvelopeCount)
        )
          throw new Error();
        for (; this.envelopes.length <= this.envelopeCount; )
          this.envelopes[this.envelopes.length] = new ce();
        const n = this.envelopes[this.envelopeCount];
        (n.target = i
          ? h.instrumentAutomationTargets.dictionary.none.index
          : e),
          (n.index = i ? 0 : t),
          (n.envelope = s),
          this.envelopeCount++;
      }
      supportsEnvelopeTarget(e, t) {
        const s = h.instrumentAutomationTargets[e];
        if (t >= s.maxCount) return !1;
        if (
          null != s.compatibleInstruments &&
          -1 == s.compatibleInstruments.indexOf(this.type)
        )
          return !1;
        if (null != s.effect && 0 == (this.effects & (1 << s.effect)))
          return !1;
        if (s.isFilter) {
          let e = this.noteFilter.controlPointCount;
          if ((this.noteFilterType && (e = 1), t >= e)) return !1;
        }
        return !0;
      }
      clearInvalidEnvelopeTargets() {
        for (let e = 0; e < this.envelopeCount; e++) {
          const t = this.envelopes[e].target,
            s = this.envelopes[e].index;
          this.supportsEnvelopeTarget(t, s) ||
            ((this.envelopes[e].target =
              h.instrumentAutomationTargets.dictionary.none.index),
            (this.envelopes[e].index = 0));
        }
      }
      getTransition() {
        return b(this.effects)
          ? h.transitions[this.transition]
          : 9 == this.type
          ? h.transitions.dictionary.interrupt
          : h.transitions.dictionary.normal;
      }
      getFadeInSeconds() {
        return 4 == this.type ? 0 : be.fadeInSettingToSeconds(this.fadeIn);
      }
      getFadeOutTicks() {
        return 4 == this.type
          ? h.drumsetFadeOutTicks
          : be.fadeOutSettingToTicks(this.fadeOut);
      }
      getChord() {
        return S(this.effects)
          ? h.chords[this.chord]
          : h.chords.dictionary.simultaneous;
      }
      getDrumsetEnvelope(e) {
        if (4 != this.type)
          throw new Error("Can't getDrumsetEnvelope() for non-drumset.");
        return h.envelopes[this.drumsetEnvelopes[e]];
      }
    }
    class pe {
      constructor() {
        (this.octave = 0),
          (this.instruments = []),
          (this.patterns = []),
          (this.bars = []),
          (this.muted = !1),
          (this.name = "");
      }
    }
    class fe {
      constructor(e) {
        (this.scaleCustom = []),
          (this.channels = []),
          (this.limitDecay = 4),
          (this.limitRise = 4e3),
          (this.compressionThreshold = 1),
          (this.limitThreshold = 1),
          (this.compressionRatio = 1),
          (this.limitRatio = 1),
          (this.masterGain = 1),
          (this.inVolumeCap = 0),
          (this.outVolumeCap = 0),
          (this.getNewNoteVolume = (e, t, s, i) => {
            if (e && null != t && null != s && null != i) {
              i = h.modCount - i - 1;
              let e =
                  h.modulators[this.channels[t].instruments[s].modulators[i]]
                    .newNoteVol,
                n = h.modulators.dictionary.tempo.index;
              return (
                this.channels[t].instruments[s].modulators[i] == n &&
                  (e = this.tempo - h.modulators[n].convertRealFactor),
                null != e ? e : 6
              );
            }
            return 6;
          }),
          (this.getVolumeCap = (e, t, s, i) => {
            if (e && null != t && null != s && null != i) {
              i = h.modCount - i - 1;
              let e = this.channels[t].instruments[s],
                n = h.modulators[e.modulators[i]],
                a = n.maxRawVol;
              return null != a
                ? (("eq filter" != n.name && "note filter" != n.name) ||
                    ((a = h.filterMorphCount - 1),
                    e.modFilterTypes[i] > 0 && e.modFilterTypes[i] % 2
                      ? (a = h.filterFreqRange)
                      : e.modFilterTypes[i] > 0 && (a = h.filterGainRange)),
                  a)
                : 6;
            }
            return 6;
          }),
          (this.getVolumeCapForSetting = (e, t, s) => {
            if (e) {
              let e = h.modulators[t].maxRawVol;
              return null != e
                ? (null == s ||
                    ("eq filter" != h.modulators[t].name &&
                      "note filter" != h.modulators[t].name) ||
                    ((e = h.filterMorphCount - 1),
                    s > 0 && s % 2
                      ? (e = h.filterFreqRange)
                      : s > 0 && (e = h.filterGainRange)),
                  e)
                : h.noteSizeMax;
            }
            return h.noteSizeMax;
          }),
          null != e ? this.fromBase64String(e) : this.initToDefault(!0);
      }
      getChannelCount() {
        return (
          this.pitchChannelCount + this.noiseChannelCount + this.modChannelCount
        );
      }
      getMaxInstrumentsPerChannel() {
        return Math.max(
          this.layeredInstruments
            ? h.layeredInstrumentCountMax
            : h.instrumentCountMin,
          this.patternInstruments
            ? h.patternInstrumentCountMax
            : h.instrumentCountMin
        );
      }
      getMaxInstrumentsPerPattern(e) {
        return this.getMaxInstrumentsPerPatternForChannel(this.channels[e]);
      }
      getMaxInstrumentsPerPatternForChannel(e) {
        return this.layeredInstruments
          ? Math.min(h.layeredInstrumentCountMax, e.instruments.length)
          : 1;
      }
      getChannelIsNoise(e) {
        return (
          e >= this.pitchChannelCount &&
          e < this.pitchChannelCount + this.noiseChannelCount
        );
      }
      getChannelIsMod(e) {
        return e >= this.pitchChannelCount + this.noiseChannelCount;
      }
      initToDefault(e = !0) {
        if (
          ((this.scale = 0),
          (this.scaleCustom = [!0, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1, !1]),
          (this.key = 0),
          (this.octave = 0),
          (this.loopStart = 0),
          (this.loopLength = 4),
          (this.tempo = 120),
          (this.reverb = 0),
          (this.beatsPerBar = 8),
          (this.barCount = 16),
          (this.patternsPerChannel = 8),
          (this.rhythm = 3),
          (this.layeredInstruments = !1),
          (this.patternInstruments = !1),
          (this.title = "Untitled"),
          e)
        ) {
          (this.pitchChannelCount = 3),
            (this.noiseChannelCount = 1),
            (this.modChannelCount = 0);
          for (let e = 0; e < this.getChannelCount(); e++) {
            const t =
                e >= this.pitchChannelCount &&
                e < this.pitchChannelCount + this.noiseChannelCount,
              s = e >= this.pitchChannelCount + this.noiseChannelCount;
            this.channels.length <= e && (this.channels[e] = new pe());
            const i = this.channels[e];
            i.octave = Math.max(3 - e, 0);
            for (let e = 0; e < this.patternsPerChannel; e++)
              i.patterns.length <= e
                ? (i.patterns[e] = new ee())
                : i.patterns[e].reset();
            i.patterns.length = this.patternsPerChannel;
            for (let e = 0; e < h.instrumentCountMin; e++)
              i.instruments.length <= e && (i.instruments[e] = new ue(t, s)),
                i.instruments[e].setTypeAndReset(s ? 9 : t ? 2 : 0, t, s);
            i.instruments.length = h.instrumentCountMin;
            for (let e = 0; e < this.barCount; e++) i.bars[e] = e < 4 ? 1 : 0;
            i.bars.length = this.barCount;
          }
          this.channels.length = this.getChannelCount();
        }
      }
      toBase64String() {
        let e,
          t = [];
        t.push(fe.M), t.push(K[fe.k]), t.push(78);
        var s = encodeURIComponent(this.title);
        t.push(K[s.length >> 6], K[63 & s.length]);
        for (let e = 0; e < s.length; e++) t.push(s.charCodeAt(e));
        if (
          (t.push(
            110,
            K[this.pitchChannelCount],
            K[this.noiseChannelCount],
            K[this.modChannelCount]
          ),
          t.push(115, K[this.scale]),
          this.scale == h.scales.dictionary.Custom.index)
        )
          for (var i = 1; i < h.pitchesPerOctave; i++)
            t.push(K[this.scaleCustom[i] ? 1 : 0]);
        t.push(107, K[this.key], K[this.octave - h.octaveMin]),
          t.push(108, K[this.loopStart >> 6], K[63 & this.loopStart]),
          t.push(
            101,
            K[(this.loopLength - 1) >> 6],
            K[(this.loopLength - 1) & 63]
          ),
          t.push(116, K[this.tempo >> 6], K[63 & this.tempo]),
          t.push(97, K[this.beatsPerBar - 1]),
          t.push(103, K[(this.barCount - 1) >> 6], K[(this.barCount - 1) & 63]),
          t.push(
            106,
            K[(this.patternsPerChannel - 1) >> 6],
            K[(this.patternsPerChannel - 1) & 63]
          ),
          t.push(114, K[this.rhythm]),
          t.push(79),
          1 != this.compressionRatio ||
          1 != this.limitRatio ||
          4e3 != this.limitRise ||
          4 != this.limitDecay ||
          1 != this.limitThreshold ||
          1 != this.compressionThreshold ||
          1 != this.masterGain
            ? (t.push(
                K[
                  Math.round(
                    this.compressionRatio < 1
                      ? 10 * this.compressionRatio
                      : 10 + 60 * (this.compressionRatio - 1)
                  )
                ]
              ),
              t.push(
                K[
                  Math.round(
                    this.limitRatio < 1
                      ? 10 * this.limitRatio
                      : 9 + this.limitRatio
                  )
                ]
              ),
              t.push(K[this.limitDecay]),
              t.push(K[Math.round((this.limitRise - 2e3) / 250)]),
              t.push(K[Math.round(20 * this.compressionThreshold)]),
              t.push(K[Math.round(20 * this.limitThreshold)]),
              t.push(
                K[Math.round(50 * this.masterGain) >> 6],
                K[63 & Math.round(50 * this.masterGain)]
              ))
            : t.push(K[63]),
          t.push(85);
        for (let e = 0; e < this.getChannelCount(); e++) {
          var n = encodeURIComponent(this.channels[e].name);
          t.push(K[n.length >> 6], K[63 & n.length]);
          for (let e = 0; e < n.length; e++) t.push(n.charCodeAt(e));
        }
        if (
          (t.push(
            105,
            K[(this.layeredInstruments << 1) | this.patternInstruments]
          ),
          this.layeredInstruments || this.patternInstruments)
        )
          for (let e = 0; e < this.getChannelCount(); e++)
            t.push(
              K[this.channels[e].instruments.length - h.instrumentCountMin]
            );
        t.push(111);
        for (let e = 0; e < this.pitchChannelCount; e++)
          t.push(K[this.channels[e].octave]);
        for (let e = 0; e < this.getChannelCount(); e++)
          for (let s = 0; s < this.channels[e].instruments.length; s++) {
            const i = this.channels[e].instruments[s];
            if (
              (t.push(84, K[i.type]),
              t.push(
                118,
                K[(i.volume + h.volumeRange / 2) >> 6],
                K[(i.volume + h.volumeRange / 2) & 63]
              ),
              t.push(117, K[i.preset >> 6], K[63 & i.preset]),
              t.push(102),
              t.push(K[+i.eqFilterType]),
              i.eqFilterType)
            )
              t.push(K[i.eqFilterSimpleCut]), t.push(K[i.eqFilterSimplePeak]);
            else {
              if (null == i.eqFilter)
                t.push(K[0]),
                  console.log(
                    "Null EQ filter settings detected in toBase64String for channelIndex " +
                      e +
                      ", instrumentIndex " +
                      s
                  );
              else {
                t.push(K[i.eqFilter.controlPointCount]);
                for (let e = 0; e < i.eqFilter.controlPointCount; e++) {
                  const s = i.eqFilter.controlPoints[e];
                  t.push(
                    K[s.type],
                    K[Math.round(s.freq)],
                    K[Math.round(s.gain)]
                  );
                }
              }
              let n = 0;
              for (let e = 0; e < h.filterMorphCount - 1; e++)
                n |= +(null != i.eqSubFilters[e + 1]) << e;
              t.push(K[n >> 6], K[63 & n]);
              for (let e = 0; e < h.filterMorphCount - 1; e++)
                if (n & (1 << e)) {
                  t.push(K[i.eqSubFilters[e + 1].controlPointCount]);
                  for (
                    let s = 0;
                    s < i.eqSubFilters[e + 1].controlPointCount;
                    s++
                  ) {
                    const n = i.eqSubFilters[e + 1].controlPoints[s];
                    t.push(
                      K[n.type],
                      K[Math.round(n.freq)],
                      K[Math.round(n.gain)]
                    );
                  }
                }
            }
            if (
              (t.push(113, K[i.effects >> 6], K[63 & i.effects]), x(i.effects))
            )
              if ((t.push(K[+i.noteFilterType]), i.noteFilterType))
                t.push(K[i.noteFilterSimpleCut]),
                  t.push(K[i.noteFilterSimplePeak]);
              else {
                if (null == i.noteFilter)
                  t.push(K[0]),
                    console.log(
                      "Null note filter settings detected in toBase64String for channelIndex " +
                        e +
                        ", instrumentIndex " +
                        s
                    );
                else {
                  t.push(K[i.noteFilter.controlPointCount]);
                  for (let e = 0; e < i.noteFilter.controlPointCount; e++) {
                    const s = i.noteFilter.controlPoints[e];
                    t.push(
                      K[s.type],
                      K[Math.round(s.freq)],
                      K[Math.round(s.gain)]
                    );
                  }
                }
                let n = 0;
                for (let e = 0; e < h.filterMorphCount - 1; e++)
                  n |= +(null != i.noteSubFilters[e + 1]) << e;
                t.push(K[n >> 6], K[63 & n]);
                for (let e = 0; e < h.filterMorphCount - 1; e++)
                  if (n & (1 << e)) {
                    t.push(K[i.noteSubFilters[e + 1].controlPointCount]);
                    for (
                      let s = 0;
                      s < i.noteSubFilters[e + 1].controlPointCount;
                      s++
                    ) {
                      const n = i.noteSubFilters[e + 1].controlPoints[s];
                      t.push(
                        K[n.type],
                        K[Math.round(n.freq)],
                        K[Math.round(n.gain)]
                      );
                    }
                  }
              }
            if (
              (b(i.effects) && t.push(K[i.transition]),
              S(i.effects) &&
                (t.push(K[i.chord]),
                i.chord == h.chords.dictionary.arpeggio.index &&
                  (t.push(K[i.arpeggioSpeed]), t.push(K[+i.fastTwoNoteArp]))),
              M(i.effects) && t.push(K[i.pitchShift]),
              w(i.effects) &&
                t.push(
                  K[(i.detune - h.detuneMin) >> 6],
                  K[(i.detune - h.detuneMin) & 63]
                ),
              k(i.effects) &&
                (t.push(K[i.vibrato]),
                i.vibrato == h.vibratos.length &&
                  (t.push(K[Math.round(25 * i.vibratoDepth)]),
                  t.push(K[i.vibratoSpeed]),
                  t.push(K[Math.round(i.vibratoDelay)]),
                  t.push(K[i.vibratoType]))),
              P(i.effects) && (t.push(K[i.distortion]), t.push(K[+i.aliases])),
              F(i.effects) &&
                t.push(K[i.bitcrusherFreq], K[i.bitcrusherQuantization]),
              I(i.effects) &&
                (t.push(K[i.pan >> 6], K[63 & i.pan]), t.push(K[i.panDelay])),
              q(i.effects) && t.push(K[i.chorus]),
              T(i.effects) && t.push(K[i.echoSustain], K[i.echoDelay]),
              D(i.effects) && t.push(K[i.reverb]),
              4 != i.type &&
                (t.push(100, K[i.fadeIn], K[i.fadeOut]),
                t.push(K[+i.clicklessTransition])),
              5 == i.type || 7 == i.type)
            ) {
              t.push(72);
              const e = new Y();
              for (let t = 0; t < h.harmonicsControlPoints; t++)
                e.write(
                  h.harmonicsControlPointBits,
                  i.harmonicsWave.harmonics[t]
                );
              e.encodeBase64(t);
            }
            if (0 == i.type) {
              i.chipWave > 186
                ? (t.push(119, K[i.chipWave - 186]), t.push(K[3]))
                : i.chipWave > 124
                ? (t.push(119, K[i.chipWave - 124]), t.push(K[2]))
                : i.chipWave > 62
                ? (t.push(119, K[i.chipWave - 62]), t.push(K[1]))
                : (t.push(119, K[i.chipWave]), t.push(K[0])),
                t.push(104, K[i.unison]),
                t.push(121);
              const e =
                (V(0, 32, i.chipWaveLoopMode) << 1) |
                (i.isUsingAdvancedLoopControls ? 1 : 0);
              t.push(K[e]);
              const s = (V(0, 32, 0) << 1) | (i.chipWavePlayBackwards ? 1 : 0);
              t.push(K[s]),
                j(t, i.chipWaveLoopStart),
                j(t, i.chipWaveLoopEnd),
                j(t, i.chipWaveStartOffset);
            } else if (1 == i.type || 10 == i.type) {
              if (1 == i.type)
                t.push(65, K[i.algorithm]), t.push(70, K[i.feedbackType]);
              else {
                if ((t.push(65, K[i.algorithm6Op]), 0 == i.algorithm6Op)) {
                  t.push(67, K[i.customAlgorithm.carrierCount]), t.push(113);
                  for (
                    let e = 0;
                    e < i.customAlgorithm.modulatedBy.length;
                    e++
                  ) {
                    for (
                      let s = 0;
                      s < i.customAlgorithm.modulatedBy[e].length;
                      s++
                    )
                      t.push(K[i.customAlgorithm.modulatedBy[e][s]]);
                    t.push(82);
                  }
                  t.push(113);
                }
                if (
                  (t.push(70, K[i.feedbackType6Op]), 0 == i.feedbackType6Op)
                ) {
                  t.push(113);
                  for (
                    let e = 0;
                    e < i.customFeedbackType.indices.length;
                    e++
                  ) {
                    for (
                      let s = 0;
                      s < i.customFeedbackType.indices[e].length;
                      s++
                    )
                      t.push(K[i.customFeedbackType.indices[e][s]]);
                    t.push(82);
                  }
                  t.push(113);
                }
              }
              t.push(66, K[i.feedbackAmplitude]), t.push(81);
              for (let e = 0; e < (10 == i.type ? 6 : h.operatorCount); e++)
                t.push(K[i.operators[e].frequency]);
              t.push(80);
              for (let e = 0; e < (10 == i.type ? 6 : h.operatorCount); e++)
                t.push(K[i.operators[e].amplitude]);
              t.push(82);
              for (let e = 0; e < (10 == i.type ? 6 : h.operatorCount); e++)
                t.push(K[i.operators[e].waveform]),
                  2 == i.operators[e].waveform &&
                    t.push(K[i.operators[e].pulseWidth]);
            } else if (8 == i.type) {
              i.chipWave > 186
                ? (t.push(119, K[i.chipWave - 186]), t.push(K[3]))
                : i.chipWave > 124
                ? (t.push(119, K[i.chipWave - 124]), t.push(K[2]))
                : i.chipWave > 62
                ? (t.push(119, K[i.chipWave - 62]), t.push(K[1]))
                : (t.push(119, K[i.chipWave]), t.push(K[0])),
                t.push(104, K[i.unison]),
                t.push(77);
              for (let e = 0; e < 64; e++) t.push(K[i.customChipWave[e] + 24]);
            } else if (2 == i.type) t.push(119, K[i.chipNoise]);
            else if (3 == i.type) {
              t.push(83);
              const e = new Y();
              for (let t = 0; t < h.spectrumControlPoints; t++)
                e.write(h.spectrumControlPointBits, i.spectrumWave.spectrum[t]);
              e.encodeBase64(t);
            } else if (4 == i.type) {
              t.push(122);
              for (let e = 0; e < h.drumCount; e++)
                t.push(K[i.drumsetEnvelopes[e]]);
              t.push(83);
              const e = new Y();
              for (let t = 0; t < h.drumCount; t++)
                for (let s = 0; s < h.spectrumControlPoints; s++)
                  e.write(
                    h.spectrumControlPointBits,
                    i.drumsetSpectrumWaves[t].spectrum[s]
                  );
              e.encodeBase64(t);
            } else if (5 == i.type) t.push(104, K[i.unison]);
            else if (6 == i.type) t.push(87, K[i.pulseWidth]);
            else if (7 == i.type)
              t.push(104, K[i.unison]), t.push(73, K[i.stringSustain]);
            else if (9 != i.type) throw new Error("Unknown instrument type.");
            t.push(69, K[i.envelopeCount]);
            for (let e = 0; e < i.envelopeCount; e++)
              t.push(K[i.envelopes[e].target]),
                h.instrumentAutomationTargets[i.envelopes[e].target].maxCount >
                  1 && t.push(K[i.envelopes[e].index]),
                t.push(K[i.envelopes[e].envelope]);
          }
        t.push(98), (e = new Y());
        let a = 0;
        for (; 1 << a < this.patternsPerChannel + 1; ) a++;
        for (let t = 0; t < this.getChannelCount(); t++)
          for (let s = 0; s < this.barCount; s++)
            e.write(a, this.channels[t].bars[s]);
        e.encodeBase64(t), t.push(112), (e = new Y());
        const o = new Y(),
          r = fe.getNeededBits(h.noteSizeMax);
        for (let t = 0; t < this.getChannelCount(); t++) {
          const s = this.channels[t],
            i = this.getMaxInstrumentsPerPattern(t),
            n = this.getChannelIsNoise(t),
            a = this.getChannelIsMod(t),
            l = fe.getNeededBits(i - h.instrumentCountMin),
            c = fe.getNeededBits(s.instruments.length - 1);
          if (a) {
            const i = fe.getNeededBits(this.getMaxInstrumentsPerChannel() + 2);
            for (let n = 0; n < s.instruments.length; n++) {
              let s = this.channels[t].instruments[n];
              for (let t = 0; t < h.modCount; t++) {
                const n = s.modChannels[t],
                  a = s.modInstruments[t],
                  o = s.modulators[t],
                  r = s.modFilterTypes[t];
                let l = h.modulators[o].forSong ? 2 : 0;
                o == h.modulators.dictionary.none.index && (l = 3),
                  e.write(2, l),
                  (0 != l && 1 != l) || (e.write(8, n), e.write(i, a)),
                  3 != l && e.write(6, o),
                  ("eq filter" != h.modulators[s.modulators[t]].name &&
                    "note filter" != h.modulators[s.modulators[t]].name) ||
                    e.write(6, r);
              }
            }
          }
          const u = n || a ? 0 : s.octave * h.pitchesPerOctave;
          let p = n ? 4 : u;
          const f = a
              ? [0, 1, 2, 3, 4, 5]
              : n
              ? [4, 6, 7, 2, 3, 8, 0, 10]
              : [0, 7, 12, 19, 24, -5, -12],
            m = [];
          for (let e = 0; e < f.length; e++) f[e] += u;
          for (const t of s.patterns) {
            if (this.patternInstruments) {
              const s = B(h.instrumentCountMin, i, t.instruments.length);
              e.write(l, s - h.instrumentCountMin);
              for (let i = 0; i < s; i++) e.write(c, t.instruments[i]);
            }
            if (t.notes.length > 0) {
              e.write(1, 1);
              let s = 0;
              for (const i of t.notes) {
                i.start < s &&
                  a &&
                  (e.write(2, 0),
                  e.write(1, 1),
                  e.writePartDuration(s - i.start)),
                  i.start > s &&
                    (e.write(2, 0),
                    a && e.write(1, 0),
                    e.writePartDuration(i.start - s)),
                  o.clear(),
                  1 == i.pitches.length
                    ? o.write(1, 0)
                    : (o.write(1, 1), o.write(3, i.pitches.length - 2)),
                  o.writePinCount(i.pins.length - 1),
                  a ? o.write(9, i.pins[0].size) : o.write(r, i.pins[0].size);
                let t = 0,
                  n = i.pitches[0],
                  l = n;
                const h = [];
                for (let e = 1; e < i.pins.length; e++) {
                  const s = i.pins[e],
                    c = n + s.interval;
                  l != c ? (o.write(1, 1), h.push(c), (l = c)) : o.write(1, 0),
                    o.writePartDuration(s.time - t),
                    (t = s.time),
                    a ? o.write(9, s.size) : o.write(r, s.size);
                }
                const c = String.fromCharCode.apply(null, o.encodeBase64([])),
                  u = m.indexOf(c);
                -1 == u
                  ? (e.write(2, 1), e.concat(o))
                  : (e.write(1, 1), e.writeLongTail(0, 0, u), m.splice(u, 1)),
                  m.unshift(c),
                  m.length > 10 && m.pop();
                const d = i.pitches.concat(h);
                for (let t = 0; t < d.length; t++) {
                  const s = d[t],
                    n = f.indexOf(s);
                  if (-1 == n) {
                    let t = 0,
                      i = p;
                    if (i < s) for (; i != s; ) i++, -1 == f.indexOf(i) && t++;
                    else for (; i != s; ) i--, -1 == f.indexOf(i) && t--;
                    e.write(1, 0), e.writePitchInterval(t);
                  } else e.write(1, 1), e.write(4, n), f.splice(n, 1);
                  f.unshift(s),
                    f.length > 16 && f.pop(),
                    (p = t == i.pitches.length - 1 ? i.pitches[0] : s);
                }
                0 == i.start && e.write(1, i.continuesLastPattern ? 1 : 0),
                  (s = i.end);
              }
              s < this.beatsPerBar * h.partsPerBeat + +a &&
                (e.write(2, 0),
                a && e.write(1, 0),
                e.writePartDuration(
                  this.beatsPerBar * h.partsPerBeat + +a - s
                ));
            } else e.write(1, 0);
          }
        }
        let l = e.lengthBase64(),
          c = [];
        for (; l > 0; ) c.unshift(K[63 & l]), (l >>= 6);
        t.push(K[c.length]),
          Array.prototype.push.apply(t, c),
          e.encodeBase64(t);
        const u = 64e3;
        let p = "";
        if (
          (null != O.customSamples &&
            O.customSamples.length > 0 &&
            (p = "|" + O.customSamples.join("|")),
          t.length < u)
        )
          return String.fromCharCode.apply(null, t) + p;
        {
          let e = "";
          for (let s = 0; s < t.length; s += u)
            e += String.fromCharCode.apply(null, t.slice(s, s + u));
          return e + p;
        }
      }
      static P(e) {
        return (
          0 == e ? (e = 1) : 1 == e && (e = 0),
          h.envelopes[V(0, h.envelopes.length, e)]
        );
      }
      fromBase64String(e) {
        if (null == e || "" == e) return fe.I(), void this.initToDefault(!0);
        let t = 0;
        for (; e.charCodeAt(t) <= 32; ) t++;
        if ((35 == e.charCodeAt(t) && t++, 123 == e.charCodeAt(t)))
          return void this.fromJsonObject(
            JSON.parse(0 == t ? e : e.substring(t))
          );
        const n = e.charCodeAt(t);
        let o, r, c, u;
        106 == n
          ? ((o = !1), (r = !0), (c = !1), (u = !1), t++)
          : 103 == n
          ? ((o = !1), (r = !1), (c = !0), (u = !1), t++)
          : 117 == n
          ? ((o = !1), (r = !1), (c = !1), (u = !0), t++)
          : ((o = !0), (r = !1), (c = !1), (u = !1));
        const p = J[e.charCodeAt(t++)];
        if (o && (-1 == p || p > fe.q || p < fe.T)) return;
        if (r && (-1 == p || p > fe.O || p < fe.R)) return;
        if (c && (-1 == p || p > fe.H || p < fe.L)) return;
        if (u && (-1 == p || p > fe.k || p < fe.N)) return;
        const f = p < 2,
          m = p < 3,
          d = p < 4,
          y = p < 5,
          v = p < 6,
          R = p < 7,
          z = p < 8,
          C = p < 9;
        this.initToDefault((o && C) || (r && y) || (d && c));
        const E = (o && C) || (r && y);
        let A = !1;
        if (u || c) {
          var H = (e = e.replaceAll("%7C", "|")).split("|");
          if (
            ((e = H.shift()),
            null == O.customSamples ||
              O.customSamples.join(", ") != H.join(", "))
          ) {
            fe.V();
            let e = !1,
              t = !1,
              n = !1;
            const o = [],
              r = [];
            (s.statusTable = {}),
              (s.urlTable = {}),
              (s.totalSamples = 0),
              (s.samplesLoaded = 0),
              a.dispatchEvent(new i(s.totalSamples, s.samplesLoaded));
            for (const i of H)
              if ("legacysamples" === i.toLowerCase())
                e || ((e = !0), o.push(i), l(0));
              else if ("nintariboxsamples" === i.toLowerCase())
                t || ((t = !0), o.push(i), l(1));
              else if ("mariopaintboxsamples" === i.toLowerCase())
                n || ((n = !0), o.push(i), l(2));
              else {
                const e = m;
                if (!fe.W(i, o, r, s, e)) continue;
              }
            if ((o.length > 0 && (O.customSamples = o), r.length > 0)) {
              const e = g(r);
              O.presetCategories[O.presetCategories.length] = {
                name: "Custom Sample Presets",
                presets: e,
                index: O.presetCategories.length,
              };
            }
          }
        }
        if (m && o) {
          for (const e of this.channels)
            (e.instruments[0].transition =
              h.transitions.dictionary.interrupt.index),
              (e.instruments[0].effects |= 1024);
          this.channels[3].instruments[0].chipNoise = 0;
        }
        let L = null;
        if ((o && C) || (r && y) || (d && c)) {
          L = [];
          for (let e = L.length; e < this.getChannelCount(); e++) {
            L[e] = [];
            for (let t = 0; t < h.instrumentCountMin; t++) L[e][t] = {};
          }
        }
        let N,
          G = 0,
          W = 0,
          $ = -1,
          j = !1,
          K = !1;
        for (; t < e.length; )
          switch ((N = e.charCodeAt(t++))) {
            case 78:
              var Y = (J[e.charCodeAt(t++)] << 6) + J[e.charCodeAt(t++)];
              (this.title = decodeURIComponent(e.substring(t, t + Y))),
                (t += Y);
              break;
            case 110:
              (this.pitchChannelCount = J[e.charCodeAt(t++)]),
                (this.noiseChannelCount = J[e.charCodeAt(t++)]),
                (this.modChannelCount = o || f ? 0 : J[e.charCodeAt(t++)]),
                (this.pitchChannelCount = B(
                  h.pitchChannelCountMin,
                  h.pitchChannelCountMax,
                  this.pitchChannelCount
                )),
                (this.noiseChannelCount = B(
                  h.noiseChannelCountMin,
                  h.noiseChannelCountMax,
                  this.noiseChannelCount
                )),
                (this.modChannelCount = B(
                  h.modChannelCountMin,
                  h.modChannelCountMax,
                  this.modChannelCount
                ));
              for (
                let e = this.channels.length;
                e < this.getChannelCount();
                e++
              )
                this.channels[e] = new pe();
              if (
                ((this.channels.length = this.getChannelCount()),
                (o && C) || (r && y) || (d && c))
              )
                for (let e = L.length; e < this.getChannelCount(); e++) {
                  L[e] = [];
                  for (let t = 0; t < h.instrumentCountMin; t++) L[e][t] = {};
                }
              break;
            case 115:
              if (
                ((this.scale = J[e.charCodeAt(t++)]),
                this.scale == h.scales.dictionary.Custom.index)
              )
                for (var te = 1; te < h.pitchesPerOctave; te++)
                  this.scaleCustom[te] = 1 == J[e.charCodeAt(t++)];
              o && (this.scale = 0);
              break;
            case 107:
              if (R && o)
                (this.key = V(0, h.keys.length, 11 - J[e.charCodeAt(t++)])),
                  (this.octave = 0);
              else if (o || r)
                (this.key = V(0, h.keys.length, J[e.charCodeAt(t++)])),
                  (this.octave = 0);
              else if (c || (m && u)) {
                const s = J[e.charCodeAt(t++)],
                  [i, n] = _(s);
                (this.key = i), (this.octave = n);
              } else
                (this.key = V(0, h.keys.length, J[e.charCodeAt(t++)])),
                  (this.octave = V(
                    h.octaveMin,
                    h.octaveMax + 1,
                    J[e.charCodeAt(t++)] + h.octaveMin
                  ));
              break;
            case 108:
              this.loopStart =
                y && o
                  ? J[e.charCodeAt(t++)]
                  : (J[e.charCodeAt(t++)] << 6) + J[e.charCodeAt(t++)];
              break;
            case 101:
              this.loopLength =
                y && o
                  ? J[e.charCodeAt(t++)]
                  : (J[e.charCodeAt(t++)] << 6) + J[e.charCodeAt(t++)] + 1;
              break;
            case 116:
              (this.tempo =
                d && o
                  ? [95, 120, 151, 190][J[e.charCodeAt(t++)]]
                  : R && o
                  ? [
                      88, 95, 103, 111, 120, 130, 140, 151, 163, 176, 190, 206,
                      222, 240, 259,
                    ][J[e.charCodeAt(t++)]]
                  : (J[e.charCodeAt(t++)] << 6) | J[e.charCodeAt(t++)]),
                (this.tempo = V(h.tempoMin, h.tempoMax + 1, this.tempo));
              break;
            case 109:
              C && o
                ? ((G = 12 * J[e.charCodeAt(t++)]),
                  (G = V(0, h.reverbRange, G)))
                : ((r && y) || (d && c)) &&
                  ((G = J[e.charCodeAt(t++)]), (G = V(0, h.reverbRange, G)));
              break;
            case 97:
              (this.beatsPerBar =
                m && o
                  ? [6, 7, 8, 9, 10][J[e.charCodeAt(t++)]]
                  : J[e.charCodeAt(t++)] + 1),
                (this.beatsPerBar = Math.max(
                  h.beatsPerBarMin,
                  Math.min(h.beatsPerBarMax, this.beatsPerBar)
                ));
              break;
            case 103:
              {
                const s =
                  (J[e.charCodeAt(t++)] << 6) + J[e.charCodeAt(t++)] + 1;
                this.barCount = B(h.barCountMin, h.barCountMax, s);
                for (let e = 0; e < this.getChannelCount(); e++) {
                  for (
                    let t = this.channels[e].bars.length;
                    t < this.barCount;
                    t++
                  )
                    this.channels[e].bars[t] = t < 4 ? 1 : 0;
                  this.channels[e].bars.length = this.barCount;
                }
              }
              break;
            case 106:
              {
                let s;
                (s =
                  z && o
                    ? J[e.charCodeAt(t++)] + 1
                    : (J[e.charCodeAt(t++)] << 6) + J[e.charCodeAt(t++)] + 1),
                  (this.patternsPerChannel = B(1, h.barCountMax, s));
                const i = this.getChannelCount();
                for (let e = 0; e < i; e++) {
                  const t = this.channels[e].patterns;
                  for (let e = t.length; e < this.patternsPerChannel; e++)
                    t[e] = new ee();
                  t.length = this.patternsPerChannel;
                }
              }
              break;
            case 105:
              if ((C && o) || (r && y) || (d && c)) {
                const s = B(
                  h.instrumentCountMin,
                  h.patternInstrumentCountMax,
                  J[e.charCodeAt(t++)] + h.instrumentCountMin
                );
                (this.layeredInstruments = !1),
                  (this.patternInstruments = s > 1);
                for (let e = 0; e < this.getChannelCount(); e++) {
                  const t =
                      e >= this.pitchChannelCount &&
                      e < this.pitchChannelCount + this.noiseChannelCount,
                    i = e >= this.pitchChannelCount + this.noiseChannelCount;
                  for (let n = this.channels[e].instruments.length; n < s; n++)
                    this.channels[e].instruments[n] = new ue(t, i);
                  if (((this.channels[e].instruments.length = s), v && o))
                    for (let n = 0; n < s; n++)
                      this.channels[e].instruments[n].setTypeAndReset(
                        t ? 2 : 0,
                        t,
                        i
                      );
                  for (let t = L[e].length; t < s; t++) L[e][t] = {};
                }
              } else {
                const s = J[e.charCodeAt(t++)];
                (this.layeredInstruments = 0 != (2 & s)),
                  (this.patternInstruments = 0 != (1 & s));
                for (let s = 0; s < this.getChannelCount(); s++) {
                  let i = 1;
                  (this.layeredInstruments || this.patternInstruments) &&
                    (i = B(
                      h.instrumentCountMin,
                      this.getMaxInstrumentsPerChannel(),
                      J[e.charCodeAt(t++)] + h.instrumentCountMin
                    ));
                  const n = this.channels[s],
                    a = this.getChannelIsNoise(s),
                    o = this.getChannelIsMod(s);
                  for (let e = n.instruments.length; e < i; e++)
                    n.instruments[e] = new ue(a, o);
                  n.instruments.length = i;
                }
              }
              break;
            case 114:
              if (u) this.rhythm = J[e.charCodeAt(t++)];
              else {
                let s = J[e.charCodeAt(t++)];
                (this.rhythm = V(0, h.rhythms.length, s + 2)),
                  ((r && m) || o) &&
                    ((2 != this.rhythm && 3 != this.rhythm) || (j = !0),
                    this.rhythm >= 2 && (K = !0));
              }
              break;
            case 111:
              if (m && o) {
                const s = J[e.charCodeAt(t++)];
                (this.channels[s].octave = V(
                  0,
                  h.pitchOctaves,
                  J[e.charCodeAt(t++)] + 1
                )),
                  s >= this.pitchChannelCount && (this.channels[s].octave = 0);
              } else if ((C && o) || (r && y) || (d && c))
                for (let s = 0; s < this.getChannelCount(); s++)
                  (this.channels[s].octave = V(
                    0,
                    h.pitchOctaves,
                    J[e.charCodeAt(t++)] + 1
                  )),
                    s >= this.pitchChannelCount &&
                      (this.channels[s].octave = 0);
              else {
                for (let s = 0; s < this.pitchChannelCount; s++)
                  this.channels[s].octave = V(
                    0,
                    h.pitchOctaves,
                    J[e.charCodeAt(t++)]
                  );
                for (
                  let e = this.pitchChannelCount;
                  e < this.getChannelCount();
                  e++
                )
                  this.channels[e].octave = 0;
              }
              break;
            case 84:
              {
                $++,
                  $ >= this.channels[W].instruments.length && (W++, ($ = 0)),
                  B(0, this.channels.length - 1, W);
                const s = this.channels[W].instruments[$];
                let i = B(0, 10, J[e.charCodeAt(t++)]);
                ((r && y) || (d && c)) &&
                  (7 == i ? (i = 8) : 8 == i && (i = 9)),
                  s.setTypeAndReset(
                    i,
                    W >= this.pitchChannelCount &&
                      W < this.pitchChannelCount + this.noiseChannelCount,
                    W >= this.pitchChannelCount + this.noiseChannelCount
                  ),
                  !((R && o) || (f && r)) ||
                    (0 != i && 8 != i && 6 != i) ||
                    ((s.aliases = !0), (s.distortion = 0), (s.effects |= 8)),
                  j && (s.arpeggioSpeed = 9),
                  K && (s.fastTwoNoteArp = !0),
                  R &&
                    o &&
                    ((s.effects = 0),
                    s.chord != h.chords.dictionary.simultaneous.index &&
                      (s.effects |= 2048));
              }
              break;
            case 117:
              {
                const s = (J[e.charCodeAt(t++)] << 6) | J[e.charCodeAt(t++)];
                (this.channels[W].instruments[$].preset = s),
                  ((r && y) || (d && c)) &&
                    7 == this.channels[W].instruments[$].preset &&
                    (this.channels[W].instruments[$].preset = 8);
              }
              break;
            case 119:
              if (m && o) {
                const s = [1, 2, 3, 4, 5, 6, 7, 8, 0],
                  i = J[e.charCodeAt(t++)],
                  n = this.channels[i].instruments[0];
                (n.chipWave = V(
                  0,
                  h.chipWaves.length,
                  0 | s[J[e.charCodeAt(t++)]]
                )),
                  n.convertLegacySettings(L[i][0], E);
              } else if (v && o) {
                const s = [1, 2, 3, 4, 5, 6, 7, 8, 0];
                for (let i = 0; i < this.getChannelCount(); i++)
                  for (const n of this.channels[i].instruments)
                    i >= this.pitchChannelCount
                      ? (n.chipNoise = V(
                          0,
                          h.chipNoises.length,
                          J[e.charCodeAt(t++)]
                        ))
                      : (n.chipWave = V(
                          0,
                          h.chipWaves.length,
                          0 | s[J[e.charCodeAt(t++)]]
                        ));
              } else if (R && o) {
                const s = [1, 2, 3, 4, 5, 6, 7, 8, 0];
                W >= this.pitchChannelCount
                  ? (this.channels[W].instruments[$].chipNoise = V(
                      0,
                      h.chipNoises.length,
                      J[e.charCodeAt(t++)]
                    ))
                  : (this.channels[W].instruments[$].chipWave = V(
                      0,
                      h.chipWaves.length,
                      0 | s[J[e.charCodeAt(t++)]]
                    ));
              } else if (W >= this.pitchChannelCount)
                this.channels[W].instruments[$].chipNoise = V(
                  0,
                  h.chipNoises.length,
                  J[e.charCodeAt(t++)]
                );
              else if (u) {
                const s = J[e.charCodeAt(t++)],
                  i = J[e.charCodeAt(t++)];
                this.channels[W].instruments[$].chipWave = V(
                  0,
                  h.chipWaves.length,
                  3 == i ? s + 186 : 2 == i ? s + 124 : 1 == i ? s + 62 : s
                );
              } else
                this.channels[W].instruments[$].chipWave = V(
                  0,
                  h.chipWaves.length,
                  J[e.charCodeAt(t++)]
                );
              break;
            case 120:
              if (c && !d && v) {
                const s = J[e.charCodeAt(t++)];
                s + 62 > 85 &&
                  "legacysamples" !=
                    document.URL.substring(
                      document.URL.length - 13
                    ).toLowerCase() &&
                  (A ||
                    ((A = !0),
                    (h.willReloadForCustomSamples = !0),
                    (O.customSamples = ["legacySamples"]),
                    l(0))),
                  (this.channels[W].instruments[$].chipWave =
                    s + 62 > 78
                      ? V(0, h.chipWaves.length, s + 63)
                      : s + 62 > 67
                      ? V(0, h.chipWaves.length, s + 61)
                      : s + 62 == 67
                      ? 40
                      : V(0, h.chipWaves.length, s + 62));
              }
              break;
            case 102:
              if ((C && o) || (y && r) || (d && c))
                if (R && o) {
                  const s = [10, 6, 3, 0, 8, 5, 2],
                    i = [
                      "none",
                      "none",
                      "none",
                      "none",
                      "decay 1",
                      "decay 2",
                      "decay 3",
                    ];
                  if (m && o) {
                    const n = J[e.charCodeAt(t++)],
                      a = this.channels[n].instruments[0],
                      o = L[n][0],
                      r = [1, 3, 4, 5][V(0, s.length, J[e.charCodeAt(t++)])];
                    (o.filterCutoff = s[r]),
                      (o.filterResonance = 0),
                      (o.filterEnvelope = h.envelopes.dictionary[i[r]]),
                      a.convertLegacySettings(o, E);
                  } else if (v && o)
                    for (let n = 0; n < this.getChannelCount(); n++)
                      for (
                        let a = 0;
                        a < this.channels[n].instruments.length;
                        a++
                      ) {
                        const o = this.channels[n].instruments[a],
                          r = L[n][a],
                          l = V(0, s.length, J[e.charCodeAt(t++)] + 1);
                        n < this.pitchChannelCount
                          ? ((r.filterCutoff = s[l]),
                            (r.filterResonance = 0),
                            (r.filterEnvelope = h.envelopes.dictionary[i[l]]))
                          : ((r.filterCutoff = 10),
                            (r.filterResonance = 0),
                            (r.filterEnvelope = h.envelopes.dictionary.none)),
                          o.convertLegacySettings(r, E);
                      }
                  else {
                    const n = V(0, s.length, J[e.charCodeAt(t++)]),
                      a = this.channels[W].instruments[$],
                      o = L[W][$];
                    (o.filterCutoff = s[n]),
                      (o.filterResonance = 0),
                      (o.filterEnvelope = h.envelopes.dictionary[i[n]]),
                      a.convertLegacySettings(o, E);
                  }
                } else {
                  const s = 11,
                    i = this.channels[W].instruments[$],
                    n = L[W][$];
                  (n.filterCutoff = V(0, s, J[e.charCodeAt(t++)])),
                    i.convertLegacySettings(n, E);
                }
              else {
                const s = this.channels[W].instruments[$];
                let i = J[e.charCodeAt(t++)];
                if (o || 0 == i) {
                  (s.eqFilterType = !1),
                    (r || c || u) && (i = J[e.charCodeAt(t++)]);
                  const n = i;
                  s.eqFilter.controlPointCount = V(0, h.filterMaxPoints + 1, n);
                  for (
                    let e = s.eqFilter.controlPoints.length;
                    e < s.eqFilter.controlPointCount;
                    e++
                  )
                    s.eqFilter.controlPoints[e] = new le();
                  for (let i = 0; i < s.eqFilter.controlPointCount; i++) {
                    const n = s.eqFilter.controlPoints[i];
                    (n.type = V(0, 3, J[e.charCodeAt(t++)])),
                      (n.freq = V(0, h.filterFreqRange, J[e.charCodeAt(t++)])),
                      (n.gain = V(0, h.filterGainRange, J[e.charCodeAt(t++)]));
                  }
                  for (let e = s.eqFilter.controlPointCount; e < n; e++) t += 3;
                  if (
                    ((s.eqSubFilters[0] = s.eqFilter),
                    (r && !y) || (c && !d) || u)
                  ) {
                    let i = (J[e.charCodeAt(t++)] << 6) | J[e.charCodeAt(t++)];
                    for (let n = 0; n < h.filterMorphCount - 1; n++)
                      if (i & (1 << n)) {
                        const i = J[e.charCodeAt(t++)];
                        null == s.eqSubFilters[n + 1] &&
                          (s.eqSubFilters[n + 1] = new he()),
                          (s.eqSubFilters[n + 1].controlPointCount = V(
                            0,
                            h.filterMaxPoints + 1,
                            i
                          ));
                        for (
                          let e = s.eqSubFilters[n + 1].controlPoints.length;
                          e < s.eqSubFilters[n + 1].controlPointCount;
                          e++
                        )
                          s.eqSubFilters[n + 1].controlPoints[e] = new le();
                        for (
                          let i = 0;
                          i < s.eqSubFilters[n + 1].controlPointCount;
                          i++
                        ) {
                          const a = s.eqSubFilters[n + 1].controlPoints[i];
                          (a.type = V(0, 3, J[e.charCodeAt(t++)])),
                            (a.freq = V(
                              0,
                              h.filterFreqRange,
                              J[e.charCodeAt(t++)]
                            )),
                            (a.gain = V(
                              0,
                              h.filterGainRange,
                              J[e.charCodeAt(t++)]
                            ));
                        }
                        for (
                          let e = s.eqSubFilters[n + 1].controlPointCount;
                          e < i;
                          e++
                        )
                          t += 3;
                      }
                  }
                } else
                  (s.eqFilterType = !0),
                    (s.eqFilterSimpleCut = V(
                      0,
                      h.filterSimpleCutRange,
                      J[e.charCodeAt(t++)]
                    )),
                    (s.eqFilterSimplePeak = V(
                      0,
                      h.filterSimplePeakRange,
                      J[e.charCodeAt(t++)]
                    ));
              }
              break;
            case 121:
              if (u)
                if (m) {
                  const s = U(e, t);
                  t += 6;
                  const i = e.slice(t, t + s);
                  t += s;
                  const n = JSON.parse(atob(i));
                  for (const e of n) {
                    const t = e.channel,
                      s = e.instrument,
                      i = e.info,
                      n = this.channels[t].instruments[s];
                    (n.isUsingAdvancedLoopControls =
                      i.isUsingAdvancedLoopControls),
                      (n.chipWaveLoopStart = i.chipWaveLoopStart),
                      (n.chipWaveLoopEnd = i.chipWaveLoopEnd),
                      (n.chipWaveLoopMode = i.chipWaveLoopMode),
                      (n.chipWavePlayBackwards = i.chipWavePlayBackwards),
                      (n.chipWaveStartOffset = i.chipWaveStartOffset);
                  }
                } else {
                  const s = J[e.charCodeAt(t++)],
                    i = Boolean(1 & s),
                    n = s >> 1,
                    a = J[e.charCodeAt(t++)],
                    o = Boolean(1 & a),
                    r = U(e, t);
                  t += 6;
                  const l = U(e, t);
                  t += 6;
                  const h = U(e, t);
                  t += 6;
                  const c = this.channels[W].instruments[$];
                  (c.isUsingAdvancedLoopControls = i),
                    (c.chipWaveLoopStart = r),
                    (c.chipWaveLoopEnd = l),
                    (c.chipWaveLoopMode = n),
                    (c.chipWavePlayBackwards = o),
                    (c.chipWaveStartOffset = h);
                }
              else if (c && !d && v)
                "legacysamples" !=
                  document.URL.substring(
                    document.URL.length - 13
                  ).toLowerCase() &&
                  (A ||
                    ((A = !0),
                    (h.willReloadForCustomSamples = !0),
                    (O.customSamples = ["legacySamples"]),
                    l(0))),
                  (this.channels[W].instruments[$].chipWave = V(
                    0,
                    h.chipWaves.length,
                    J[e.charCodeAt(t++)] + 125
                  ));
              else if ((C && o) || (r && y) || (d && c)) {
                const s = 8,
                  i = this.channels[W].instruments[$],
                  n = L[W][$];
                (n.filterResonance = V(0, s, J[e.charCodeAt(t++)])),
                  i.convertLegacySettings(n, E);
              }
              break;
            case 122:
              {
                const s = this.channels[W].instruments[$],
                  i = [
                    0, 1, 2, 4, 5, 6, 8, 9, 10, 12, 13, 14, 16, 17, 18, 19, 20,
                    21, 23, 24, 25, 27, 28, 29, 32, 33, 34, 31, 11,
                  ];
                if ((C && o) || (y && r) || (d && c))
                  if (4 == s.type)
                    for (let n = 0; n < h.drumCount; n++) {
                      let a = J[e.charCodeAt(t++)];
                      ((f && c) || (!c && !u)) && (a = i[a]),
                        (s.drumsetEnvelopes[n] = fe.P(a).index);
                    }
                  else {
                    const n = L[W][$];
                    let a = J[e.charCodeAt(t++)];
                    ((f && c) || (!c && !u)) && (a = i[a]),
                      (n.filterEnvelope = fe.P(a)),
                      s.convertLegacySettings(n, E);
                  }
                else
                  for (let n = 0; n < h.drumCount; n++) {
                    let a = J[e.charCodeAt(t++)];
                    ((f && c) || (!c && !u)) && (a = i[a]),
                      (s.drumsetEnvelopes[n] = V(0, h.envelopes.length, a));
                  }
              }
              break;
            case 87:
              {
                const s = this.channels[W].instruments[$];
                if (
                  ((s.pulseWidth = V(
                    0,
                    h.pulseWidthRange + +r + 1,
                    J[e.charCodeAt(t++)]
                  )),
                  o &&
                    (s.pulseWidth = Math.round(
                      Math.pow(
                        0.5,
                        (7 - s.pulseWidth) * h.pulseWidthStepPower
                      ) * h.pulseWidthRange
                    )),
                  (C && o) || (y && r) || (d && c))
                ) {
                  const i = [
                      0, 1, 2, 4, 5, 6, 8, 9, 10, 12, 13, 14, 16, 17, 18, 19,
                      20, 21, 23, 24, 25, 27, 28, 29, 32, 33, 34, 31, 11,
                    ],
                    n = L[W][$];
                  let a = J[e.charCodeAt(t++)];
                  ((f && c) || (!c && !u)) && (a = i[a]),
                    (n.pulseEnvelope = fe.P(a)),
                    s.convertLegacySettings(n, E);
                }
              }
              break;
            case 73:
              this.channels[W].instruments[$].stringSustain = V(
                0,
                h.stringSustainRange,
                J[e.charCodeAt(t++)]
              );
              break;
            case 100:
              if ((C && o) || (r && y) || (d && c)) {
                const s = [
                  {
                    transition: "interrupt",
                    fadeInSeconds: 0,
                    fadeOutTicks: -1,
                  },
                  { transition: "normal", fadeInSeconds: 0, fadeOutTicks: -3 },
                  {
                    transition: "normal",
                    fadeInSeconds: 0.025,
                    fadeOutTicks: -3,
                  },
                  {
                    transition: "slide in pattern",
                    fadeInSeconds: 0.025,
                    fadeOutTicks: -3,
                  },
                  {
                    transition: "normal",
                    fadeInSeconds: 0.04,
                    fadeOutTicks: 6,
                  },
                  { transition: "normal", fadeInSeconds: 0, fadeOutTicks: 48 },
                  {
                    transition: "normal",
                    fadeInSeconds: 0.0125,
                    fadeOutTicks: 72,
                  },
                  {
                    transition: "normal",
                    fadeInSeconds: 0.06,
                    fadeOutTicks: 96,
                  },
                  {
                    transition: "slide in pattern",
                    fadeInSeconds: 0.025,
                    fadeOutTicks: -3,
                  },
                ];
                if (m && o) {
                  const i = J[e.charCodeAt(t++)],
                    n = s[V(0, s.length, J[e.charCodeAt(t++)])],
                    a = this.channels[i].instruments[0];
                  (a.fadeIn = be.secondsToFadeInSetting(n.fadeInSeconds)),
                    (a.fadeOut = be.ticksToFadeOutSetting(n.fadeOutTicks)),
                    (a.transition =
                      h.transitions.dictionary[n.transition].index),
                    a.transition != h.transitions.dictionary.normal.index &&
                      (a.effects |= 1024);
                } else if (v && o)
                  for (let i = 0; i < this.getChannelCount(); i++)
                    for (const n of this.channels[i].instruments) {
                      const i = s[V(0, s.length, J[e.charCodeAt(t++)])];
                      (n.fadeIn = be.secondsToFadeInSetting(i.fadeInSeconds)),
                        (n.fadeOut = be.ticksToFadeOutSetting(i.fadeOutTicks)),
                        (n.transition =
                          h.transitions.dictionary[i.transition].index),
                        n.transition != h.transitions.dictionary.normal.index &&
                          (n.effects |= 1024);
                    }
                else if ((d && !c && !u) || o) {
                  const i = s[V(0, s.length, J[e.charCodeAt(t++)])],
                    n = this.channels[W].instruments[$];
                  (n.fadeIn = be.secondsToFadeInSetting(i.fadeInSeconds)),
                    (n.fadeOut = be.ticksToFadeOutSetting(i.fadeOutTicks)),
                    (n.transition =
                      h.transitions.dictionary[i.transition].index),
                    n.transition != h.transitions.dictionary.normal.index &&
                      (n.effects |= 1024);
                } else {
                  const i = s[V(0, s.length, J[e.charCodeAt(t++)])],
                    n = this.channels[W].instruments[$];
                  (n.fadeIn = be.secondsToFadeInSetting(i.fadeInSeconds)),
                    (n.fadeOut = be.ticksToFadeOutSetting(i.fadeOutTicks)),
                    (n.transition =
                      h.transitions.dictionary[i.transition].index),
                    J[e.charCodeAt(t++)] > 0 && (n.legacyTieOver = !0),
                    (n.clicklessTransition = !!J[e.charCodeAt(t++)]),
                    (n.transition != h.transitions.dictionary.normal.index ||
                      n.clicklessTransition) &&
                      (n.effects |= 1024);
                }
              } else {
                const s = this.channels[W].instruments[$];
                (s.fadeIn = V(0, h.fadeInRange, J[e.charCodeAt(t++)])),
                  (s.fadeOut = V(
                    0,
                    h.fadeOutTicks.length,
                    J[e.charCodeAt(t++)]
                  )),
                  (r || c || u) &&
                    (s.clicklessTransition = !!J[e.charCodeAt(t++)]);
              }
              break;
            case 99:
              if ((C && o) || (r && y) || (d && c))
                if (R && o)
                  if (m && o) {
                    const s = [0, 3, 2, 0],
                      i = ["none", "none", "none", "tremolo2"],
                      n = J[e.charCodeAt(t++)],
                      a = V(0, s.length, J[e.charCodeAt(t++)]),
                      o = this.channels[n].instruments[0],
                      r = L[n][0];
                    (o.vibrato = s[a]),
                      (null != r.filterEnvelope &&
                        1 != r.filterEnvelope.type) ||
                        ((r.filterEnvelope = h.envelopes.dictionary[i[a]]),
                        o.convertLegacySettings(r, E)),
                      o.vibrato != h.vibratos.dictionary.none.index &&
                        (o.effects |= 512);
                  } else if (v && o) {
                    const s = [0, 1, 2, 3, 0, 0],
                      i = [
                        "none",
                        "none",
                        "none",
                        "none",
                        "tremolo5",
                        "tremolo2",
                      ];
                    for (let n = 0; n < this.getChannelCount(); n++)
                      for (
                        let a = 0;
                        a < this.channels[n].instruments.length;
                        a++
                      ) {
                        const o = V(0, s.length, J[e.charCodeAt(t++)]),
                          l = this.channels[n].instruments[a],
                          u = L[n][a];
                        (l.vibrato = s[o]),
                          (null != u.filterEnvelope &&
                            1 != u.filterEnvelope.type) ||
                            ((u.filterEnvelope = h.envelopes.dictionary[i[o]]),
                            l.convertLegacySettings(u, E)),
                          l.vibrato != h.vibratos.dictionary.none.index &&
                            (l.effects |= 512),
                          (0 != G || (r && y) || (d && c)) &&
                            !this.getChannelIsNoise(n) &&
                            ((l.effects |= 1), (l.reverb = G));
                      }
                  } else {
                    const s = [0, 1, 2, 3, 0, 0],
                      i = [
                        "none",
                        "none",
                        "none",
                        "none",
                        "tremolo5",
                        "tremolo2",
                      ],
                      n = V(0, s.length, J[e.charCodeAt(t++)]),
                      a = this.channels[W].instruments[$],
                      o = L[W][$];
                    (a.vibrato = s[n]),
                      (null != o.filterEnvelope &&
                        1 != o.filterEnvelope.type) ||
                        ((o.filterEnvelope = h.envelopes.dictionary[i[n]]),
                        a.convertLegacySettings(o, E)),
                      a.vibrato != h.vibratos.dictionary.none.index &&
                        (a.effects |= 512),
                      (0 != G || (r && y) || (d && c)) &&
                        ((a.effects |= 1), (a.reverb = G));
                  }
                else {
                  const s = this.channels[W].instruments[$],
                    i = V(0, h.vibratos.length + 1, J[e.charCodeAt(t++)]);
                  (s.vibrato = i),
                    s.vibrato != h.vibratos.dictionary.none.index &&
                      (s.effects |= 512),
                    i == h.vibratos.length
                      ? ((s.vibratoDepth =
                          V(
                            0,
                            h.modulators.dictionary["vibrato depth"].maxRawVol +
                              1,
                            J[e.charCodeAt(t++)]
                          ) / 50),
                        (s.vibratoSpeed = V(
                          0,
                          h.modulators.dictionary["vibrato speed"].maxRawVol +
                            1,
                          J[e.charCodeAt(t++)]
                        )),
                        (s.vibratoDelay =
                          V(
                            0,
                            h.modulators.dictionary["vibrato delay"].maxRawVol +
                              1,
                            J[e.charCodeAt(t++)]
                          ) / 2),
                        (s.vibratoType = V(
                          0,
                          h.vibratoTypes.length,
                          J[e.charCodeAt(t++)]
                        )),
                        (s.effects |= 512))
                      : ((s.vibratoDepth = h.vibratos[s.vibrato].amplitude),
                        (s.vibratoSpeed = 10),
                        (s.vibratoDelay = h.vibratos[s.vibrato].delayTicks / 2),
                        (s.vibratoType = h.vibratos[s.vibrato].type));
                }
              break;
            case 71:
              if ((r && y) || (d && c)) {
                const s = this.channels[W].instruments[$];
                (s.arpeggioSpeed = V(
                  0,
                  h.modulators.dictionary["arp speed"].maxRawVol + 1,
                  J[e.charCodeAt(t++)]
                )),
                  (s.fastTwoNoteArp = !!J[e.charCodeAt(t++)]);
              }
              break;
            case 104:
              if (m && o) {
                const s = J[e.charCodeAt(t++)];
                this.channels[s].instruments[0].unison = V(
                  0,
                  h.unisons.length,
                  J[e.charCodeAt(t++)]
                );
              } else if (v && o)
                for (let s = 0; s < this.getChannelCount(); s++)
                  for (const i of this.channels[s].instruments) {
                    const s = J[e.charCodeAt(t++)];
                    let n = V(0, h.unisons.length, s);
                    8 == s && ((n = 2), (i.chord = 3)), (i.unison = n);
                  }
              else if (R && o) {
                const s = J[e.charCodeAt(t++)];
                let i = V(0, h.unisons.length, s);
                8 == s &&
                  ((i = 2), (this.channels[W].instruments[$].chord = 3)),
                  (this.channels[W].instruments[$].unison = i);
              } else
                this.channels[W].instruments[$].unison = V(
                  0,
                  h.unisons.length,
                  J[e.charCodeAt(t++)]
                );
              break;
            case 67:
              if ((C && o) || (r && y) || (d && c)) {
                const s = this.channels[W].instruments[$];
                (s.chord = V(0, h.chords.length, J[e.charCodeAt(t++)])),
                  s.chord != h.chords.dictionary.simultaneous.index &&
                    (s.effects |= 2048);
              }
              break;
            case 113:
              {
                const s = this.channels[W].instruments[$];
                if ((C && o) || (r && y) || (d && c)) {
                  (s.effects = 4095 & J[e.charCodeAt(t++)]),
                    0 != G || (r && y) || (d && c)
                      ? D(s.effects) && (s.reverb = G)
                      : (s.effects &= -2),
                    (s.effects |= 4),
                    s.vibrato != h.vibratos.dictionary.none.index &&
                      (s.effects |= 512),
                    s.detune != h.detuneCenter && (s.effects |= 256),
                    s.aliases ? (s.effects |= 8) : (s.effects &= -9);
                  const i = L[W][$];
                  s.convertLegacySettings(i, E);
                } else {
                  if (
                    ((s.effects =
                      (J[e.charCodeAt(t++)] << 6) | J[e.charCodeAt(t++)]),
                    x(s.effects))
                  ) {
                    let i = J[e.charCodeAt(t++)];
                    if (o || 0 == i) {
                      (s.noteFilterType = !1),
                        (r || c || u) && (i = J[e.charCodeAt(t++)]),
                        (s.noteFilter.controlPointCount = V(
                          0,
                          h.filterMaxPoints + 1,
                          i
                        ));
                      for (
                        let e = s.noteFilter.controlPoints.length;
                        e < s.noteFilter.controlPointCount;
                        e++
                      )
                        s.noteFilter.controlPoints[e] = new le();
                      for (let i = 0; i < s.noteFilter.controlPointCount; i++) {
                        const n = s.noteFilter.controlPoints[i];
                        (n.type = V(0, 3, J[e.charCodeAt(t++)])),
                          (n.freq = V(
                            0,
                            h.filterFreqRange,
                            J[e.charCodeAt(t++)]
                          )),
                          (n.gain = V(
                            0,
                            h.filterGainRange,
                            J[e.charCodeAt(t++)]
                          ));
                      }
                      for (let e = s.noteFilter.controlPointCount; e < i; e++)
                        t += 3;
                      if (
                        ((s.noteSubFilters[0] = s.noteFilter),
                        (r && !y) || c || u)
                      ) {
                        let i =
                          (J[e.charCodeAt(t++)] << 6) | J[e.charCodeAt(t++)];
                        for (let n = 0; n < h.filterMorphCount - 1; n++)
                          if (i & (1 << n)) {
                            const i = J[e.charCodeAt(t++)];
                            null == s.noteSubFilters[n + 1] &&
                              (s.noteSubFilters[n + 1] = new he()),
                              (s.noteSubFilters[n + 1].controlPointCount = V(
                                0,
                                h.filterMaxPoints + 1,
                                i
                              ));
                            for (
                              let e =
                                s.noteSubFilters[n + 1].controlPoints.length;
                              e < s.noteSubFilters[n + 1].controlPointCount;
                              e++
                            )
                              s.noteSubFilters[n + 1].controlPoints[e] =
                                new le();
                            for (
                              let i = 0;
                              i < s.noteSubFilters[n + 1].controlPointCount;
                              i++
                            ) {
                              const a =
                                s.noteSubFilters[n + 1].controlPoints[i];
                              (a.type = V(0, 3, J[e.charCodeAt(t++)])),
                                (a.freq = V(
                                  0,
                                  h.filterFreqRange,
                                  J[e.charCodeAt(t++)]
                                )),
                                (a.gain = V(
                                  0,
                                  h.filterGainRange,
                                  J[e.charCodeAt(t++)]
                                ));
                            }
                            for (
                              let e = s.noteSubFilters[n + 1].controlPointCount;
                              e < i;
                              e++
                            )
                              t += 3;
                          }
                      }
                    } else
                      (s.noteFilterType = !0),
                        s.noteFilter.reset(),
                        (s.noteFilterSimpleCut = V(
                          0,
                          h.filterSimpleCutRange,
                          J[e.charCodeAt(t++)]
                        )),
                        (s.noteFilterSimplePeak = V(
                          0,
                          h.filterSimplePeakRange,
                          J[e.charCodeAt(t++)]
                        ));
                  }
                  b(s.effects) &&
                    (s.transition = V(
                      0,
                      h.transitions.length,
                      J[e.charCodeAt(t++)]
                    )),
                    S(s.effects) &&
                      ((s.chord = V(0, h.chords.length, J[e.charCodeAt(t++)])),
                      s.chord == h.chords.dictionary.arpeggio.index &&
                        (r || c || u) &&
                        ((s.arpeggioSpeed = J[e.charCodeAt(t++)]),
                        (s.fastTwoNoteArp = !!J[e.charCodeAt(t++)]))),
                    M(s.effects) &&
                      (s.pitchShift = V(
                        0,
                        h.pitchShiftRange,
                        J[e.charCodeAt(t++)]
                      )),
                    w(s.effects) &&
                      (o
                        ? ((s.detune = V(
                            h.detuneMin,
                            h.detuneMax + 1,
                            J[e.charCodeAt(t++)]
                          )),
                          (s.detune = Math.round(
                            ((s.detune - 9) * (Math.abs(s.detune - 9) + 1)) /
                              2 +
                              h.detuneCenter
                          )))
                        : (s.detune = V(
                            h.detuneMin,
                            h.detuneMax + 1,
                            (J[e.charCodeAt(t++)] << 6) + J[e.charCodeAt(t++)]
                          ))),
                    k(s.effects) &&
                      ((s.vibrato = V(
                        0,
                        h.vibratos.length + 1,
                        J[e.charCodeAt(t++)]
                      )),
                      s.vibrato == h.vibratos.length && (r || c || u)
                        ? ((s.vibratoDepth =
                            V(
                              0,
                              h.modulators.dictionary["vibrato depth"]
                                .maxRawVol + 1,
                              J[e.charCodeAt(t++)]
                            ) / 25),
                          (s.vibratoSpeed = V(
                            0,
                            h.modulators.dictionary["vibrato speed"].maxRawVol +
                              1,
                            J[e.charCodeAt(t++)]
                          )),
                          (s.vibratoDelay = V(
                            0,
                            h.modulators.dictionary["vibrato delay"].maxRawVol +
                              1,
                            J[e.charCodeAt(t++)]
                          )),
                          (s.vibratoType = V(
                            0,
                            h.vibratoTypes.length,
                            J[e.charCodeAt(t++)]
                          )))
                        : ((s.vibratoDepth = h.vibratos[s.vibrato].amplitude),
                          (s.vibratoSpeed = 10),
                          (s.vibratoDelay =
                            h.vibratos[s.vibrato].delayTicks / 2),
                          (s.vibratoType = h.vibratos[s.vibrato].type))),
                    P(s.effects) &&
                      ((s.distortion = V(
                        0,
                        h.distortionRange,
                        J[e.charCodeAt(t++)]
                      )),
                      ((r && !y) || c || u) &&
                        (s.aliases = !!J[e.charCodeAt(t++)])),
                    F(s.effects) &&
                      ((s.bitcrusherFreq = V(
                        0,
                        h.bitcrusherFreqRange,
                        J[e.charCodeAt(t++)]
                      )),
                      (s.bitcrusherQuantization = V(
                        0,
                        h.bitcrusherQuantizationRange,
                        J[e.charCodeAt(t++)]
                      ))),
                    I(s.effects) &&
                      ((s.pan = V(
                        0,
                        h.panMax + 1,
                        o
                          ? Math.round(J[e.charCodeAt(t++)] * (h.panMax / 8))
                          : (J[e.charCodeAt(t++)] << 6) + J[e.charCodeAt(t++)]
                      )),
                      ((r && !f) || c || u) &&
                        (s.panDelay = J[e.charCodeAt(t++)])),
                    q(s.effects) &&
                      (s.chorus = o
                        ? 2 * V(0, h.chorusRange / 2 + 1, J[e.charCodeAt(t++)])
                        : V(0, h.chorusRange, J[e.charCodeAt(t++)])),
                    T(s.effects) &&
                      ((s.echoSustain = V(
                        0,
                        h.echoSustainRange,
                        J[e.charCodeAt(t++)]
                      )),
                      (s.echoDelay = V(
                        0,
                        h.echoDelayRange,
                        J[e.charCodeAt(t++)]
                      ))),
                    D(s.effects) &&
                      (s.reverb = V(
                        0,
                        h.reverbRange,
                        o
                          ? Math.round(
                              (J[e.charCodeAt(t++)] * h.reverbRange) / 3
                            )
                          : J[e.charCodeAt(t++)]
                      ));
                }
                s.effects &= 4095;
              }
              break;
            case 118:
              if (m && o) {
                const s = J[e.charCodeAt(t++)];
                this.channels[s].instruments[0].volume = Math.round(
                  V(-h.volumeRange / 2, 1, 5 * -J[e.charCodeAt(t++)])
                );
              } else if (v && o)
                for (let s = 0; s < this.getChannelCount(); s++)
                  for (const i of this.channels[s].instruments)
                    i.volume = Math.round(
                      V(-h.volumeRange / 2, 1, 5 * -J[e.charCodeAt(t++)])
                    );
              else if (R && o) {
                this.channels[W].instruments[$].volume = Math.round(
                  V(-h.volumeRange / 2, 1, 5 * -J[e.charCodeAt(t++)])
                );
              } else if (o) {
                this.channels[W].instruments[$].volume = Math.round(
                  V(-h.volumeRange / 2, 1, (25 * -J[e.charCodeAt(t++)]) / 7)
                );
              } else {
                this.channels[W].instruments[$].volume = Math.round(
                  V(
                    -h.volumeRange / 2,
                    h.volumeRange / 2 + 1,
                    ((J[e.charCodeAt(t++)] << 6) | J[e.charCodeAt(t++)]) -
                      h.volumeRange / 2
                  )
                );
              }
              break;
            case 76:
              if (C && o) {
                this.channels[W].instruments[$].pan = V(
                  0,
                  h.panMax + 1,
                  J[e.charCodeAt(t++)] * (h.panMax / 8)
                );
              } else if ((r && y) || (d && c)) {
                const s = this.channels[W].instruments[$];
                (s.pan = V(
                  0,
                  h.panMax + 1,
                  (J[e.charCodeAt(t++)] << 6) + J[e.charCodeAt(t++)]
                )),
                  ((r && !m) || c || u) && (s.panDelay = J[e.charCodeAt(t++)]);
              }
              break;
            case 68:
              {
                const s = this.channels[W].instruments[$];
                ((r && y) || (d && c)) &&
                  ((s.detune = V(
                    h.detuneMin,
                    h.detuneMax + 1,
                    4 * ((J[e.charCodeAt(t++)] << 6) + J[e.charCodeAt(t++)])
                  )),
                  (s.effects |= 256));
              }
              break;
            case 77:
              {
                let s = this.channels[W].instruments[$];
                for (let i = 0; i < 64; i++)
                  s.customChipWave[i] = V(-24, 25, J[e.charCodeAt(t++)] - 24);
                let i = 0;
                for (let e = 0; e < s.customChipWave.length; e++)
                  i += s.customChipWave[e];
                const n = i / s.customChipWave.length;
                let a = 0,
                  o = 0;
                for (let e = 0; e < s.customChipWave.length; e++)
                  (a += o),
                    (o = s.customChipWave[e] - n),
                    (s.customChipWaveIntegral[e] = a);
                s.customChipWaveIntegral[64] = 0;
              }
              break;
            case 79:
              {
                let s = J[e.charCodeAt(t++)];
                63 == s
                  ? this.restoreLimiterDefaults()
                  : ((this.compressionRatio =
                      s < 10 ? s / 10 : 1 + (s - 10) / 60),
                    (s = J[e.charCodeAt(t++)]),
                    (this.limitRatio = s < 10 ? s / 10 : s - 9),
                    (this.limitDecay = J[e.charCodeAt(t++)]),
                    (this.limitRise = 250 * J[e.charCodeAt(t++)] + 2e3),
                    (this.compressionThreshold = J[e.charCodeAt(t++)] / 20),
                    (this.limitThreshold = J[e.charCodeAt(t++)] / 20),
                    (this.masterGain =
                      ((J[e.charCodeAt(t++)] << 6) + J[e.charCodeAt(t++)]) /
                      50));
              }
              break;
            case 85:
              for (let s = 0; s < this.getChannelCount(); s++) {
                var se;
                (se =
                  !d || c || u
                    ? (J[e.charCodeAt(t++)] << 6) + J[e.charCodeAt(t++)]
                    : J[e.charCodeAt(t++)]),
                  (this.channels[s].name = decodeURIComponent(
                    e.substring(t, t + se)
                  )),
                  (t += se);
              }
              break;
            case 65:
              {
                const s = this.channels[W].instruments[$];
                if (1 == s.type)
                  s.algorithm = V(0, h.algorithms.length, J[e.charCodeAt(t++)]);
                else if (
                  ((s.algorithm6Op = V(
                    0,
                    h.algorithms6Op.length,
                    J[e.charCodeAt(t++)]
                  )),
                  s.customAlgorithm.fromPreset(s.algorithm6Op),
                  67 == e.charCodeAt(t))
                ) {
                  let i = V(1, h.operatorCount + 2 + 1, J[e.charCodeAt(t + 1)]);
                  t++;
                  let n = [];
                  if (113 == e.charCodeAt(t + 1)) {
                    t++;
                    let a = 0;
                    for (t++; 113 != e.charCodeAt(t); ) {
                      n[a] = [];
                      let s = 0;
                      for (; 82 != e.charCodeAt(t); )
                        (n[a][s] = V(
                          1,
                          h.operatorCount + 3,
                          J[e.charCodeAt(t)]
                        )),
                          s++,
                          t++;
                      a++, t++;
                    }
                    s.customAlgorithm.set(i, n), t++;
                  }
                }
                if ((C && o) || (y && r) || (d && c)) {
                  const e = L[W][$];
                  s.convertLegacySettings(e, E);
                }
              }
              break;
            case 70:
              {
                const s = this.channels[W].instruments[$];
                if (1 == s.type)
                  s.feedbackType = V(
                    0,
                    h.feedbacks.length,
                    J[e.charCodeAt(t++)]
                  );
                else {
                  (s.feedbackType6Op = V(
                    0,
                    h.feedbacks6Op.length,
                    J[e.charCodeAt(t++)]
                  )),
                    s.customFeedbackType.fromPreset(s.feedbackType6Op);
                  let i = [];
                  if (113 == e.charCodeAt(t)) {
                    let n = 0;
                    for (t++; 113 != e.charCodeAt(t); ) {
                      i[n] = [];
                      let s = 0;
                      for (; 82 != e.charCodeAt(t); )
                        (i[n][s] = V(
                          1,
                          h.operatorCount + 2,
                          J[e.charCodeAt(t)]
                        )),
                          s++,
                          t++;
                      n++, t++;
                    }
                    s.customFeedbackType.set(i), t++;
                  }
                }
              }
              break;
            case 66:
              this.channels[W].instruments[$].feedbackAmplitude = V(
                0,
                h.operatorAmplitudeMax + 1,
                J[e.charCodeAt(t++)]
              );
              break;
            case 86:
              if ((C && o) || (y && r) || (d && c)) {
                const s = [
                    0, 1, 2, 4, 5, 6, 8, 9, 10, 12, 13, 14, 16, 17, 18, 19, 20,
                    21, 23, 24, 25, 27, 28, 29, 32, 33, 34, 31, 11,
                  ],
                  i = this.channels[W].instruments[$],
                  n = L[W][$];
                let a = J[e.charCodeAt(t++)];
                ((f && c) || (!c && !u)) && (a = s[a]),
                  (n.feedbackEnvelope = fe.P(J[a])),
                  i.convertLegacySettings(n, E);
              }
              break;
            case 81:
              {
                const s = this.channels[W].instruments[$];
                if (m && c) {
                  const i = [
                    4, 5, 6, 7, 8, 10, 12, 13, 14, 15, 16, 18, 20, 22, 24, 2, 1,
                    9, 17, 19, 21, 23, 0, 3,
                  ];
                  for (let n = 0; n < (10 == s.type ? 6 : h.operatorCount); n++)
                    s.operators[n].frequency =
                      i[V(0, i.length, J[e.charCodeAt(t++)])];
                } else if (c || u)
                  for (let i = 0; i < (10 == s.type ? 6 : h.operatorCount); i++)
                    s.operators[i].frequency = V(
                      0,
                      h.operatorFrequencies.length,
                      J[e.charCodeAt(t++)]
                    );
                else {
                  const i = [
                    4, 5, 6, 7, 8, 10, 12, 13, 14, 15, 16, 18, 20, 23, 27, 2, 1,
                    9, 17, 19, 21, 23, 0, 3,
                  ];
                  for (let n = 0; n < (10 == s.type ? 6 : h.operatorCount); n++)
                    s.operators[n].frequency =
                      i[V(0, i.length, J[e.charCodeAt(t++)])];
                }
              }
              break;
            case 80:
              {
                const s = this.channels[W].instruments[$];
                for (let i = 0; i < (10 == s.type ? 6 : h.operatorCount); i++)
                  s.operators[i].amplitude = V(
                    0,
                    h.operatorAmplitudeMax + 1,
                    J[e.charCodeAt(t++)]
                  );
              }
              break;
            case 69:
              {
                const s = [
                    0, 1, 2, 4, 5, 6, 8, 9, 10, 12, 13, 14, 16, 17, 18, 19, 20,
                    21, 23, 24, 25, 27, 28, 29, 32, 33, 34, 31, 11,
                  ],
                  i = this.channels[W].instruments[$];
                if ((C && o) || (y && r) || (d && c)) {
                  const n = L[W][$];
                  n.operatorEnvelopes = [];
                  for (
                    let a = 0;
                    a < (10 == i.type ? 6 : h.operatorCount);
                    a++
                  ) {
                    let i = J[e.charCodeAt(t++)];
                    ((f && c) || (!c && !u)) && (i = s[i]),
                      (n.operatorEnvelopes[a] = fe.P(i));
                  }
                  i.convertLegacySettings(n, E);
                } else {
                  const n = V(0, h.maxEnvelopeCount + 1, J[e.charCodeAt(t++)]);
                  for (let a = 0; a < n; a++) {
                    const n = V(
                      0,
                      h.instrumentAutomationTargets.length,
                      J[e.charCodeAt(t++)]
                    );
                    let a = 0;
                    const o = h.instrumentAutomationTargets[n].maxCount;
                    o > 1 && (a = V(0, o, J[e.charCodeAt(t++)]));
                    let r = J[e.charCodeAt(t++)];
                    ((f && c) || (!c && !u)) && (r = s[r]);
                    const l = V(0, h.envelopes.length, r);
                    i.addEnvelope(n, a, l);
                  }
                }
              }
              break;
            case 82:
              {
                const s = this.channels[W].instruments[$];
                if (m && c)
                  for (let i = 0; i < h.operatorCount; i++) {
                    const n = [0, 1, 3, 2, 2, 2, 4, 5],
                      a = V(0, n.length, J[e.charCodeAt(t++)]);
                    3 == a
                      ? (s.operators[i].pulseWidth = 5)
                      : 4 == a
                      ? (s.operators[i].pulseWidth = 4)
                      : 5 == a && (s.operators[i].pulseWidth = 6),
                      (s.operators[i].waveform = n[a]);
                  }
                else
                  for (
                    let i = 0;
                    i < (10 == s.type ? 6 : h.operatorCount);
                    i++
                  ) {
                    if (r) {
                      const n = [0, 1, 3, 2, 4, 5];
                      s.operators[i].waveform =
                        n[V(0, h.operatorWaves.length, J[e.charCodeAt(t++)])];
                    } else
                      s.operators[i].waveform = V(
                        0,
                        h.operatorWaves.length,
                        J[e.charCodeAt(t++)]
                      );
                    2 == s.operators[i].waveform &&
                      (s.operators[i].pulseWidth = V(
                        0,
                        h.pwmOperatorWaves.length,
                        J[e.charCodeAt(t++)]
                      ));
                  }
              }
              break;
            case 83:
              {
                const s = this.channels[W].instruments[$];
                if (3 == s.type) {
                  const i = Math.ceil(
                      (h.spectrumControlPoints * h.spectrumControlPointBits) / 6
                    ),
                    n = new Q(e, t, t + i);
                  for (let e = 0; e < h.spectrumControlPoints; e++)
                    s.spectrumWave.spectrum[e] = n.read(
                      h.spectrumControlPointBits
                    );
                  s.spectrumWave.markCustomWaveDirty(), (t += i);
                } else {
                  if (4 != s.type)
                    throw new Error(
                      "Unhandled instrument type for spectrum song tag code."
                    );
                  {
                    const i = Math.ceil(
                        (h.drumCount *
                          h.spectrumControlPoints *
                          h.spectrumControlPointBits) /
                          6
                      ),
                      n = new Q(e, t, t + i);
                    for (let e = 0; e < h.drumCount; e++) {
                      for (let t = 0; t < h.spectrumControlPoints; t++)
                        s.drumsetSpectrumWaves[e].spectrum[t] = n.read(
                          h.spectrumControlPointBits
                        );
                      s.drumsetSpectrumWaves[e].markCustomWaveDirty();
                    }
                    t += i;
                  }
                }
              }
              break;
            case 72:
              {
                const s = this.channels[W].instruments[$],
                  i = Math.ceil(
                    (h.harmonicsControlPoints * h.harmonicsControlPointBits) / 6
                  ),
                  n = new Q(e, t, t + i);
                for (let e = 0; e < h.harmonicsControlPoints; e++)
                  s.harmonicsWave.harmonics[e] = n.read(
                    h.harmonicsControlPointBits
                  );
                s.harmonicsWave.markCustomWaveDirty(), (t += i);
              }
              break;
            case 88:
              if ((r && y) || (c && d)) {
                const s = this.channels[W].instruments[$];
                (s.aliases = !!J[e.charCodeAt(t++)]),
                  s.aliases && ((s.distortion = 0), (s.effects |= 8));
              }
              break;
            case 98:
              {
                let s;
                if (m && o) {
                  const i = J[e.charCodeAt(t++)],
                    n = J[e.charCodeAt(t++)];
                  s = Math.ceil(0.5 * n);
                  const a = new Q(e, t, t + s);
                  for (let e = 0; e < n; e++)
                    this.channels[i].bars[e] = a.read(3) + 1;
                } else if (y && o) {
                  let i = 0;
                  for (; 1 << i < this.patternsPerChannel; ) i++;
                  s = Math.ceil(
                    (this.getChannelCount() * this.barCount * i) / 6
                  );
                  const n = new Q(e, t, t + s);
                  for (let e = 0; e < this.getChannelCount(); e++)
                    for (let t = 0; t < this.barCount; t++)
                      this.channels[e].bars[t] = n.read(i) + 1;
                } else {
                  let i = 0;
                  for (; 1 << i < this.patternsPerChannel + 1; ) i++;
                  s = Math.ceil(
                    (this.getChannelCount() * this.barCount * i) / 6
                  );
                  const n = new Q(e, t, t + s);
                  for (let e = 0; e < this.getChannelCount(); e++)
                    for (let t = 0; t < this.barCount; t++)
                      this.channels[e].bars[t] = n.read(i);
                }
                t += s;
              }
              break;
            case 112:
              {
                let s,
                  i = 0,
                  n = !((d && r) || o),
                  a = n ? 4 : 3,
                  l = n ? 16 : 8;
                if (m && o)
                  (s = J[e.charCodeAt(t++)]),
                    t++,
                    (i = J[e.charCodeAt(t++)]),
                    (i <<= 6),
                    (i += J[e.charCodeAt(t++)]);
                else {
                  s = 0;
                  let n = B(1, 4, J[e.charCodeAt(t++)]);
                  for (; n > 0; ) (i <<= 6), (i += J[e.charCodeAt(t++)]), n--;
                }
                const p = new Q(e, t, t + i);
                t += i;
                const f = fe.getNeededBits(h.noteSizeMax);
                let v = -1,
                  g = -1,
                  b = -1;
                for (;;) {
                  const e = this.channels[s],
                    t = this.getChannelIsNoise(s),
                    i = this.getChannelIsMod(s),
                    S = this.getMaxInstrumentsPerPattern(s),
                    M = fe.getNeededBits(S - h.instrumentCountMin),
                    w = fe.getNeededBits(e.instruments.length - 1);
                  if (i) {
                    let t = (y && r) || (d && c);
                    const i = t
                      ? w
                      : fe.getNeededBits(
                          this.getMaxInstrumentsPerChannel() + 2
                        );
                    for (let n = 0; n < e.instruments.length; n++) {
                      let a = e.instruments[n];
                      for (let e = 0; e < h.modCount; e++) {
                        let o = p.read(2);
                        switch (o) {
                          case 0:
                            (a.modChannels[e] = V(
                              0,
                              this.pitchChannelCount +
                                this.noiseChannelCount +
                                1,
                              p.read(8)
                            )),
                              (a.modInstruments[e] = V(
                                0,
                                this.channels[a.modChannels[e]].instruments
                                  .length + 2,
                                p.read(i)
                              ));
                            break;
                          case 1:
                            (a.modChannels[e] =
                              this.pitchChannelCount +
                              V(0, this.noiseChannelCount + 1, p.read(8))),
                              (a.modInstruments[e] = V(
                                0,
                                this.channels[a.modChannels[e]].instruments
                                  .length + 2,
                                p.read(w)
                              ));
                            break;
                          case 2:
                            a.modChannels[e] = -1;
                            break;
                          case 3:
                            a.modChannels[e] = -2;
                        }
                        if (
                          (3 != o && (a.modulators[e] = p.read(6)),
                          t ||
                            ("eq filter" !=
                              h.modulators[a.modulators[e]].name &&
                              "note filter" !=
                                h.modulators[a.modulators[e]].name) ||
                            (a.modFilterTypes[e] = p.read(6)),
                          t && a.modChannels[e] >= 0)
                        ) {
                          let t = x(
                            this.channels[a.modChannels[e]].instruments[
                              a.modInstruments[e]
                            ].effects
                          );
                          7 == a.modulators[e]
                            ? ((a.modulators[e] = t
                                ? h.modulators.dictionary["note filt cut"].index
                                : h.modulators.dictionary["eq filt cut"].index),
                              (a.modFilterTypes[e] = 1))
                            : 8 == a.modulators[e] &&
                              ((a.modulators[e] = t
                                ? h.modulators.dictionary["note filt peak"]
                                    .index
                                : h.modulators.dictionary["eq filt peak"]
                                    .index),
                              (a.modFilterTypes[e] = 2));
                        } else
                          t &&
                            a.modulators[e] ==
                              h.modulators.dictionary["song reverb"].index &&
                            ((v = s), (g = n), (b = e));
                        t &&
                          12 !=
                            h.modulators[a.modulators[e]].associatedEffect &&
                          (this.channels[a.modChannels[e]].instruments[
                            a.modInstruments[e]
                          ].effects |=
                            1 <<
                            h.modulators[a.modulators[e]].associatedEffect);
                      }
                    }
                  }
                  const k = [];
                  for (let t = 0; t < e.instruments.length; t++) {
                    k[t] = [];
                    for (let s = 0; s < h.modCount; s++)
                      k[t][h.modCount - 1 - s] =
                        1 +
                        3 *
                          +(
                            ((y && r) || (d && c)) &&
                            i &&
                            e.instruments[t].modulators[s] ==
                              h.modulators.dictionary.detune.index
                          );
                  }
                  const P = t || i ? 0 : 12 * e.octave;
                  let F = t || i ? 4 : P;
                  const I = i
                      ? [0, 1, 2, 3, 4, 5]
                      : t
                      ? [4, 6, 7, 2, 3, 8, 0, 10]
                      : [0, 7, 12, 19, 24, -5, -12],
                    q = [];
                  for (let e = 0; e < I.length; e++) I[e] += P;
                  for (let t = 0; t < this.patternsPerChannel; t++) {
                    const s = e.patterns[t];
                    if ((C && o) || (y && r) || (d && c))
                      (s.instruments[0] = B(
                        0,
                        e.instruments.length - 1,
                        p.read(w)
                      )),
                        (s.instruments.length = 1);
                    else if (this.patternInstruments) {
                      const t = B(
                        h.instrumentCountMin,
                        S,
                        p.read(M) + h.instrumentCountMin
                      );
                      for (let n = 0; n < t; n++)
                        s.instruments[n] = B(
                          0,
                          e.instruments.length - 1 + 2 * +i,
                          p.read(w)
                        );
                      s.instruments.length = t;
                    } else
                      (s.instruments[0] = 0),
                        (s.instruments.length = h.instrumentCountMin);
                    if (!((o && m) || 0 != p.read(1))) {
                      s.notes.length = 0;
                      continue;
                    }
                    let v = 0;
                    const g = s.notes;
                    let b = 0;
                    for (; v < this.beatsPerBar * h.partsPerBeat + +i; ) {
                      const t = 1 == p.read(1);
                      let m = !1,
                        S = 0;
                      if (
                        (t
                          ? (S = B(0, q.length - 1, p.readLongTail(0, 0)))
                          : (m = 1 == p.read(1)),
                        t || m)
                      ) {
                        let m, M, w;
                        if (t) (m = q[S]), q.splice(S, 1);
                        else {
                          if (((m = {}), n))
                            1 == p.read(1)
                              ? (m.pitchCount = p.read(3) + 2)
                              : (m.pitchCount = 1);
                          else
                            for (
                              m.pitchCount = 1;
                              m.pitchCount < 4 && 1 == p.read(1);

                            )
                              m.pitchCount++;
                          (m.pinCount = p.readPinCount()),
                            (m.initialSize = o
                              ? 2 * p.read(2)
                              : i
                              ? p.read(9)
                              : p.read(f)),
                            (m.pins = []),
                            (m.length = 0),
                            (m.bendCount = 0);
                          for (let e = 0; e < m.pinCount; e++) {
                            let e = {};
                            (e.pitchBend = 1 == p.read(1)),
                              e.pitchBend && m.bendCount++,
                              (m.length +=
                                R && o
                                  ? (p.readLegacyPartDuration() *
                                      h.partsPerBeat) /
                                    h.rhythms[this.rhythm].stepsPerBeat
                                  : p.readPartDuration()),
                              (e.time = m.length),
                              (e.size = o
                                ? 2 * p.read(2)
                                : i
                                ? p.read(9)
                                : p.read(f)),
                              m.pins.push(e);
                          }
                        }
                        q.unshift(m),
                          q.length > 10 && q.pop(),
                          g.length <= b
                            ? ((M = new Z(0, v, v + m.length, m.initialSize)),
                              (g[b++] = M))
                            : ((M = g[b++]),
                              (M.start = v),
                              (M.end = v + m.length),
                              (M.pins[0].size = m.initialSize));
                        let x = 0;
                        const P = [];
                        for (let e = 0; e < m.pitchCount + m.bendCount; e++) {
                          if (1 == p.read(1)) {
                            const e = B(0, I.length - 1, p.read(a));
                            (w = I[e]), I.splice(e, 1);
                          } else {
                            w = F;
                            let e = p.readPitchInterval();
                            for (; e > 0; ) {
                              for (w++; -1 != I.indexOf(w); ) w++;
                              e--;
                            }
                            for (; e < 0; ) {
                              for (w--; -1 != I.indexOf(w); ) w--;
                              e++;
                            }
                          }
                          I.unshift(w),
                            I.length > l && I.pop(),
                            e < m.pitchCount ? (M.pitches[x++] = w) : P.push(w),
                            (F = e == m.pitchCount - 1 ? M.pitches[0] : w);
                        }
                        (M.pitches.length = x),
                          P.unshift(M.pitches[0]),
                          i &&
                            (M.pins[0].size *=
                              k[s.instruments[0]][M.pitches[0]]);
                        let T = 1;
                        for (const e of m.pins) {
                          e.pitchBend && P.shift();
                          const t = P[0] - M.pitches[0];
                          if (M.pins.length <= T)
                            M.pins[T++] = X(
                              t,
                              e.time,
                              i
                                ? e.size * k[s.instruments[0]][M.pitches[0]]
                                : e.size
                            );
                          else {
                            const n = M.pins[T++];
                            (n.interval = t),
                              (n.time = e.time),
                              (n.size = i
                                ? e.size * k[s.instruments[0]][M.pitches[0]]
                                : e.size);
                          }
                        }
                        (M.pins.length = T),
                          0 == M.start &&
                            (M.continuesLastPattern =
                              (C && o) || (y && r) || (d && c)
                                ? !((d && !u) || o) &&
                                  e.instruments[s.instruments[0]].legacyTieOver
                                : 1 == p.read(1)),
                          (v = B(0, this.beatsPerBar * h.partsPerBeat, M.end));
                      } else if (i) {
                        const e = 1 == p.read(1),
                          t = p.readPartDuration();
                        e ? (v -= t) : (v += t);
                      } else {
                        v +=
                          R && o
                            ? (p.readLegacyPartDuration() * h.partsPerBeat) /
                              h.rhythms[this.rhythm].stepsPerBeat
                            : p.readPartDuration();
                      }
                    }
                    g.length = b;
                  }
                  if (m && o) break;
                  if ((s++, s >= this.getChannelCount())) break;
                }
                if (((r && y) || (d && c)) && b >= 0)
                  for (let e = 0; e < this.channels.length; e++)
                    for (
                      let t = 0;
                      t < this.channels[e].instruments.length;
                      t++
                    ) {
                      const s = this.channels[e].instruments[t];
                      if (
                        (D(s.effects) && (s.reverb = h.reverbRange - 1),
                        v == e && g == t)
                      ) {
                        const t = this.channels[e].bars[0];
                        if (t > 0) {
                          const s = this.channels[e].patterns[t - 1];
                          let i = 6;
                          for (const e of s.notes)
                            e.pitches[0] == h.modCount - 1 - b &&
                              (i = Math.min(i, e.start));
                          i > 0 &&
                            s.notes.push(new Z(h.modCount - 1 - b, 0, i, G));
                        } else if (
                          this.channels[e].patterns.length < h.barCountMax
                        ) {
                          const t = new ee();
                          if (
                            (this.channels[e].patterns.push(t),
                            (this.channels[e].bars[0] =
                              this.channels[e].patterns.length),
                            this.channels[e].patterns.length >
                              this.patternsPerChannel)
                          ) {
                            for (let e = 0; e < this.channels.length; e++)
                              this.channels[e].patterns.length <=
                                this.patternsPerChannel &&
                                this.channels[e].patterns.push(new ee());
                            this.patternsPerChannel++;
                          }
                          (t.instruments.length = 1),
                            (t.instruments[0] = g),
                            (t.notes.length = 0),
                            t.notes.push(new Z(h.modCount - 1 - b, 0, 6, G));
                        }
                      }
                    }
              }
              break;
            default:
              throw new Error(
                "Unrecognized song tag code " +
                  String.fromCharCode(N) +
                  " at index " +
                  (t - 1) +
                  " " +
                  e.substring(0, t)
              );
          }
        h.willReloadForCustomSamples &&
          ((window.location.hash = this.toBase64String()),
          setTimeout(() => {
            location.reload();
          }, 50));
      }
      static $(e) {
        try {
          return Boolean(new URL(e));
        } catch (e) {
          return !1;
        }
      }
      static W(e, t, s, i, n) {
        const a = h.chipWaves[0].samples,
          r = h.rawRawChipWaves[0].samples,
          l = t.length;
        t.push(e);
        const c = h.chipWaves.length;
        let u = e,
          p = 44100,
          f = !1,
          m = 60,
          d = !1,
          y = null,
          v = null,
          g = null,
          b = null,
          S = !1,
          M = !1,
          w = e.indexOf("!"),
          k = -1;
        if (0 === w && ((k = e.indexOf("!", w + 1)), -1 !== k)) {
          const P = e.slice(w + 1, k).split(",");
          for (const F of P) {
            const I = F.charAt(0),
              q = F.slice(1, F.length);
            "s" === I
              ? (p = V(8e3, 96001, W(q, 44100)))
              : "r" === I
              ? (m = W(q, 60))
              : "p" === I
              ? (f = !0)
              : "a" === I
              ? ((y = $(q, null)), null != y && (d = !0))
              : "b" === I
              ? ((v = $(q, null)), null != v && (d = !0))
              : "c" === I
              ? ((g = $(q, null)), null != g && (d = !0))
              : "d" === I
              ? ((b = $(q, null)), null != b && ((b = V(0, 4, b)), (d = !0)))
              : "e" === I && ((S = !0), (d = !0));
          }
          (u = e.slice(k + 1, e.length)), (M = !0);
        }
        let x = null;
        if (!fe.$(u)) return alert(e + " is not a valid url"), !1;
        if (((x = new URL(u)), n && !M && null != x)) {
          function T() {
            (u = e.slice(0, e.indexOf(","))),
              (x = new URL(u)),
              (p = V(8e3, 96001, W(e.slice(e.indexOf(",") + 1), 44100)));
          }
          function D() {
            (u = e.slice(0, e.indexOf("!"))),
              (x = new URL(u)),
              (m = W(e.slice(e.indexOf("!") + 1), 60));
          }
          -1 != e.indexOf("@") &&
            ((u = e.replaceAll("@", "")), (x = new URL(u)), (f = !0)),
            -1 != e.indexOf(",") && -1 != e.indexOf("!")
              ? e.indexOf(",") < e.indexOf("!")
                ? (D(), T())
                : (T(), D())
              : (-1 != e.indexOf(",") && T(), -1 != e.indexOf("!") && D());
        }
        if (null != x) {
          let O = u;
          const R = [];
          44100 !== p && R.push("s" + p),
            60 !== m && R.push("r" + m),
            f && R.push("p"),
            d &&
              (null != y && R.push("a" + y),
              null != v && R.push("b" + v),
              null != g && R.push("c" + g),
              null != b && R.push("d" + b),
              S && R.push("e")),
            R.length > 0 && (O = "!" + R.join(",") + "!" + u),
            (t[l] = O);
          const z = decodeURIComponent(x.pathname.replace(/^([^\/]*\/)+/, "")),
            C = 1;
          (h.chipWaves[c] = {
            name: z,
            expression: C,
            isCustomSampled: !0,
            isPercussion: f,
            rootKey: m,
            sampleRate: p,
            samples: a,
            index: c,
          }),
            (h.rawChipWaves[c] = {
              name: z,
              expression: C,
              isCustomSampled: !0,
              isPercussion: f,
              rootKey: m,
              sampleRate: p,
              samples: r,
              index: c,
            }),
            (h.rawRawChipWaves[c] = {
              name: z,
              expression: C,
              isCustomSampled: !0,
              isPercussion: f,
              rootKey: m,
              sampleRate: p,
              samples: r,
              index: c,
            });
          const E = {
            type: "chip",
            eqFilter: [],
            effects: [],
            transition: "normal",
            fadeInSeconds: 0,
            fadeOutTicks: -3,
            chord: "harmony",
            wave: z,
            unison: "none",
            envelopes: [],
          };
          d &&
            ((E.isUsingAdvancedLoopControls = !0),
            (E.chipWaveLoopStart = null != y ? y : 0),
            (E.chipWaveLoopEnd = null != v ? v : 2),
            (E.chipWaveLoopMode = null != b ? b : 0),
            (E.chipWavePlayBackwards = S),
            (E.chipWaveStartOffset = null != g ? g : 0));
          const A = { index: 0, name: z, midiProgram: 80, settings: E };
          if ((s.push(A), !h.willReloadForCustomSamples)) {
            o(
              u,
              c,
              E,
              {
                isUsingAdvancedLoopControls: d,
                chipWaveLoopStart: y,
                chipWaveLoopEnd: v,
                chipWaveLoopMode: b,
                chipWavePlayBackwards: S,
                chipWaveStartOffset: g,
              },
              p
            );
          }
          (i.statusTable[c] = 0), (i.urlTable[c] = u), i.totalSamples++;
        }
        return !0;
      }
      static V() {
        (h.chipWaves = g(
          h.chipWaves.slice(0, h.firstIndexForSamplesInChipWaveList)
        )),
          (h.rawChipWaves = g(
            h.rawChipWaves.slice(0, h.firstIndexForSamplesInChipWaveList)
          )),
          (h.rawRawChipWaves = g(
            h.rawRawChipWaves.slice(0, h.firstIndexForSamplesInChipWaveList)
          ));
      }
      static I() {
        (O.customSamples = null),
          fe.V(),
          (s.statusTable = {}),
          (s.urlTable = {}),
          (s.totalSamples = 0),
          (s.samplesLoaded = 0),
          a.dispatchEvent(new i(s.totalSamples, s.samplesLoaded));
      }
      toJsonObject(e = !0, t = 1, s = !0) {
        const i = [];
        for (let n = 0; n < this.getChannelCount(); n++) {
          const a = this.channels[n],
            o = [],
            r = this.getChannelIsNoise(n),
            l = this.getChannelIsMod(n);
          for (const e of a.instruments) o.push(e.toJsonObject());
          const h = [];
          for (const e of a.patterns) h.push(e.toJsonObject(this, a, l));
          const c = [];
          if (e) for (let e = 0; e < this.loopStart; e++) c.push(a.bars[e]);
          for (let e = 0; e < t; e++)
            for (
              let e = this.loopStart;
              e < this.loopStart + this.loopLength;
              e++
            )
              c.push(a.bars[e]);
          if (s)
            for (
              let e = this.loopStart + this.loopLength;
              e < this.barCount;
              e++
            )
              c.push(a.bars[e]);
          const u = {
            type: l ? "mod" : r ? "drum" : "pitch",
            name: a.name,
            instruments: o,
            patterns: h,
            sequence: c,
          };
          r || (u.octaveScrollBar = a.octave - 1), i.push(u);
        }
        const n = {
          name: this.title,
          format: fe.j,
          version: fe.k,
          scale: h.scales[this.scale].name,
          customScale: this.scaleCustom,
          key: h.keys[this.key].name,
          keyOctave: this.octave,
          introBars: this.loopStart,
          loopBars: this.loopLength,
          beatsPerBar: this.beatsPerBar,
          ticksPerBeat: h.rhythms[this.rhythm].stepsPerBeat,
          beatsPerMinute: this.tempo,
          reverb: this.reverb,
          masterGain: this.masterGain,
          compressionThreshold: this.compressionThreshold,
          limitThreshold: this.limitThreshold,
          limitDecay: this.limitDecay,
          limitRise: this.limitRise,
          limitRatio: this.limitRatio,
          compressionRatio: this.compressionRatio,
          layeredInstruments: this.layeredInstruments,
          patternInstruments: this.patternInstruments,
          channels: i,
        };
        return (
          null != O.customSamples &&
            O.customSamples.length > 0 &&
            (n.customSamples = O.customSamples),
          n
        );
      }
      fromJsonObject(e) {
        if ((this.initToDefault(!0), !e)) return;
        if (
          (null != e.name && (this.title = e.name), null != e.customSamples)
        ) {
          const t = e.customSamples;
          if (
            null == O.customSamples ||
            O.customSamples.join(", ") != t.join(", ")
          ) {
            (h.willReloadForCustomSamples = !0), fe.V();
            let e = !1,
              i = !1,
              n = !1;
            const a = [],
              o = [];
            for (const r of t)
              if ("legacysamples" === r.toLowerCase())
                e || ((e = !0), a.push(r), l(0));
              else if ("nintariboxsamples" === r.toLowerCase())
                i || ((i = !0), a.push(r), l(1));
              else if ("mariopaintboxsamples" === r.toLowerCase())
                n || ((n = !0), a.push(r), l(2));
              else {
                const e = !1;
                fe.W(r, a, o, s, e);
              }
            if ((a.length > 0 && (O.customSamples = a), o.length > 0)) {
              const e = g(o);
              O.presetCategories[O.presetCategories.length] = {
                name: "Custom Sample Presets",
                presets: e,
                index: O.presetCategories.length,
              };
            }
          }
        } else {
          let t = !1;
          if (null != e.channels)
            for (let s = 0; s < e.channels.length; s++) {
              const i = e.channels[s];
              if ("pitch" === i.type && Array.isArray(i.instruments)) {
                const e = i.instruments;
                for (let s = 0; s < e.length; s++) {
                  const i = e[s];
                  if ("chip" !== i.type) continue;
                  if (null == i.wave) continue;
                  const n = i.wave,
                    a = [
                      "paandorasbox kick",
                      "paandorasbox snare",
                      "paandorasbox piano1",
                      "paandorasbox WOW",
                      "paandorasbox overdrive",
                      "paandorasbox trumpet",
                      "paandorasbox saxophone",
                      "paandorasbox orchestrahit",
                      "paandorasbox detatched violin",
                      "paandorasbox synth",
                      "paandorasbox sonic3snare",
                      "paandorasbox come on",
                      "paandorasbox choir",
                      "paandorasbox overdriveguitar",
                      "paandorasbox flute",
                      "paandorasbox legato violin",
                      "paandorasbox tremolo violin",
                      "paandorasbox amen break",
                      "paandorasbox pizzicato violin",
                      "paandorasbox tim allen grunt",
                      "paandorasbox tuba",
                      "paandorasbox loopingcymbal",
                      "paandorasbox standardkick",
                      "paandorasbox standardsnare",
                      "paandorasbox closedhihat",
                      "paandorasbox foothihat",
                      "paandorasbox openhihat",
                      "paandorasbox crashcymbal",
                      "paandorasbox pianoC4",
                      "paandorasbox liver pad",
                      "paandorasbox marimba",
                      "paandorasbox susdotwav",
                      "paandorasbox wackyboxtts",
                      "paandorasbox peppersteak_1",
                      "paandorasbox peppersteak_2",
                      "paandorasbox vinyl_noise",
                      "paandorasbeta slap bass",
                      "paandorasbeta HD EB overdrive guitar",
                      "paandorasbeta sunsoft bass",
                      "paandorasbeta masculine choir",
                      "paandorasbeta feminine choir",
                      "paandorasbeta tololoche",
                      "paandorasbeta harp",
                      "paandorasbeta pan flute",
                      "paandorasbeta krumhorn",
                      "paandorasbeta timpani",
                      "paandorasbeta crowd hey",
                      "paandorasbeta wario land 4 brass",
                      "paandorasbeta wario land 4 rock organ",
                      "paandorasbeta wario land 4 DAOW",
                      "paandorasbeta wario land 4 hour chime",
                      "paandorasbeta wario land 4 tick",
                      "paandorasbeta kirby kick",
                      "paandorasbeta kirby snare",
                      "paandorasbeta kirby bongo",
                      "paandorasbeta kirby click",
                      "paandorasbeta sonor kick",
                      "paandorasbeta sonor snare",
                      "paandorasbeta sonor snare (left hand)",
                      "paandorasbeta sonor snare (right hand)",
                      "paandorasbeta sonor high tom",
                      "paandorasbeta sonor low tom",
                      "paandorasbeta sonor hihat (closed)",
                      "paandorasbeta sonor hihat (half opened)",
                      "paandorasbeta sonor hihat (open)",
                      "paandorasbeta sonor hihat (open tip)",
                      "paandorasbeta sonor hihat (pedal)",
                      "paandorasbeta sonor crash",
                      "paandorasbeta sonor crash (tip)",
                      "paandorasbeta sonor ride",
                    ],
                    o = [
                      "pandoraasbox kick",
                      "pandoraasbox snare",
                      "pandoraasbox piano1",
                      "pandoraasbox WOW",
                      "pandoraasbox overdrive",
                      "pandoraasbox trumpet",
                      "pandoraasbox saxophone",
                      "pandoraasbox orchestrahit",
                      "pandoraasbox detatched violin",
                      "pandoraasbox synth",
                      "pandoraasbox sonic3snare",
                      "pandoraasbox come on",
                      "pandoraasbox choir",
                      "pandoraasbox overdriveguitar",
                      "pandoraasbox flute",
                      "pandoraasbox legato violin",
                      "pandoraasbox tremolo violin",
                      "pandoraasbox amen break",
                      "pandoraasbox pizzicato violin",
                      "pandoraasbox tim allen grunt",
                      "pandoraasbox tuba",
                      "pandoraasbox loopingcymbal",
                      "pandoraasbox standardkick",
                      "pandoraasbox standardsnare",
                      "pandoraasbox closedhihat",
                      "pandoraasbox foothihat",
                      "pandoraasbox openhihat",
                      "pandoraasbox crashcymbal",
                      "pandoraasbox pianoC4",
                      "pandoraasbox liver pad",
                      "pandoraasbox marimba",
                      "pandoraasbox susdotwav",
                      "pandoraasbox wackyboxtts",
                      "pandoraasbox peppersteak_1",
                      "pandoraasbox peppersteak_2",
                      "pandoraasbox vinyl_noise",
                      "pandoraasbeta slap bass",
                      "pandoraasbeta HD EB overdrive guitar",
                      "pandoraasbeta sunsoft bass",
                      "pandoraasbeta masculine choir",
                      "pandoraasbeta feminine choir",
                      "pandoraasbeta tololoche",
                      "pandoraasbeta harp",
                      "pandoraasbeta pan flute",
                      "pandoraasbeta krumhorn",
                      "pandoraasbeta timpani",
                      "pandoraasbeta crowd hey",
                      "pandoraasbeta wario land 4 brass",
                      "pandoraasbeta wario land 4 rock organ",
                      "pandoraasbeta wario land 4 DAOW",
                      "pandoraasbeta wario land 4 hour chime",
                      "pandoraasbeta wario land 4 tick",
                      "pandoraasbeta kirby kick",
                      "pandoraasbeta kirby snare",
                      "pandoraasbeta kirby bongo",
                      "pandoraasbeta kirby click",
                      "pandoraasbeta sonor kick",
                      "pandoraasbeta sonor snare",
                      "pandoraasbeta sonor snare (left hand)",
                      "pandoraasbeta sonor snare (right hand)",
                      "pandoraasbeta sonor high tom",
                      "pandoraasbeta sonor low tom",
                      "pandoraasbeta sonor hihat (closed)",
                      "pandoraasbeta sonor hihat (half opened)",
                      "pandoraasbeta sonor hihat (open)",
                      "pandoraasbeta sonor hihat (open tip)",
                      "pandoraasbeta sonor hihat (pedal)",
                      "pandoraasbeta sonor crash",
                      "pandoraasbeta sonor crash (tip)",
                      "pandoraasbeta sonor ride",
                    ],
                    r = [
                      "kick",
                      "snare",
                      "piano1",
                      "WOW",
                      "overdrive",
                      "trumpet",
                      "saxophone",
                      "orchestrahit",
                      "detatched violin",
                      "synth",
                      "sonic3snare",
                      "come on",
                      "choir",
                      "overdriveguitar",
                      "flute",
                      "legato violin",
                      "tremolo violin",
                      "amen break",
                      "pizzicato violin",
                      "tim allen grunt",
                      "tuba",
                      "loopingcymbal",
                      "standardkick",
                      "standardsnare",
                      "closedhihat",
                      "foothihat",
                      "openhihat",
                      "crashcymbal",
                      "pianoC4",
                      "liver pad",
                      "marimba",
                      "susdotwav",
                      "wackyboxtts",
                    ];
                  a.includes(n)
                    ? (t = !0)
                    : o.includes(n)
                    ? ((t = !0), (i.wave = a[o.findIndex((e) => e === n)]))
                    : r.includes(n) &&
                      ("trumpet" === n ||
                        "flute" === n ||
                        ((t = !0), (i.wave = a[r.findIndex((e) => e === n)])));
                }
              }
            }
          t
            ? ((h.willReloadForCustomSamples = !0),
              fe.V(),
              l(0),
              (O.customSamples = ["legacySamples"]))
            : null != O.customSamples &&
              O.customSamples.length > 0 &&
              ((h.willReloadForCustomSamples = !0), fe.I());
        }
        if (((this.scale = 0), null != e.scale)) {
          const s = {
              "romani :)": "dbl harmonic :)",
              "romani :(": "dbl harmonic :(",
              enigma: "strange",
            },
            i = null != s[e.scale] ? s[e.scale] : e.scale,
            n = h.scales.findIndex((e) => e.name == i);
          if (
            (-1 != n && (this.scale = n),
            this.scale == h.scales.dictionary.Custom.index &&
              null != e.customScale)
          )
            for (var t of e.customScale.keys())
              this.scaleCustom[t] = e.customScale[t];
        }
        if (null != e.key)
          if ("number" == typeof e.key)
            this.key = ((e.key + 1200) >>> 0) % h.keys.length;
          else if ("string" == typeof e.key) {
            const t = e.key;
            if ("C+" === t) (this.key = 0), (this.octave = 1);
            else if ("G- (actually F#-)" === t)
              (this.key = 6), (this.octave = -1);
            else if ("C-" === t) (this.key = 0), (this.octave = -1);
            else if ("oh no (F-)" === t) (this.key = 5), (this.octave = -1);
            else {
              const e = t.charAt(0).toUpperCase(),
                s = t.charAt(1).toLowerCase();
              let i = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }[e];
              const n = { "#": 1, "♯": 1, b: -1, "♭": -1 }[s];
              null != i &&
                (null != n && (i += n),
                i < 0 && (i += 12),
                (i %= 12),
                (this.key = i));
            }
          }
        null != e.beatsPerMinute &&
          (this.tempo = V(h.tempoMin, h.tempoMax + 1, 0 | e.beatsPerMinute)),
          null != e.keyOctave &&
            (this.octave = V(h.octaveMin, h.octaveMax + 1, 0 | e.keyOctave));
        let i = 0;
        null != e.reverb && (i = V(0, 32, 0 | e.reverb)),
          null != e.beatsPerBar &&
            (this.beatsPerBar = Math.max(
              h.beatsPerBarMin,
              Math.min(h.beatsPerBarMax, 0 | e.beatsPerBar)
            ));
        let n = 4;
        null != e.ticksPerBeat &&
          ((n = 0 | e.ticksPerBeat || 4),
          (this.rhythm = h.rhythms.findIndex((e) => e.stepsPerBeat == n)),
          -1 == this.rhythm && (this.rhythm = 1)),
          null != e.masterGain
            ? (this.masterGain = Math.max(0, Math.min(5, e.masterGain || 0)))
            : (this.masterGain = 1),
          null != e.limitThreshold
            ? (this.limitThreshold = Math.max(
                0,
                Math.min(2, e.limitThreshold || 0)
              ))
            : (this.limitThreshold = 1),
          null != e.compressionThreshold
            ? (this.compressionThreshold = Math.max(
                0,
                Math.min(1.1, e.compressionThreshold || 0)
              ))
            : (this.compressionThreshold = 1),
          null != e.limitRise
            ? (this.limitRise = Math.max(2e3, Math.min(1e4, e.limitRise || 0)))
            : (this.limitRise = 4e3),
          null != e.limitDecay
            ? (this.limitDecay = Math.max(1, Math.min(30, e.limitDecay || 0)))
            : (this.limitDecay = 4),
          null != e.limitRatio
            ? (this.limitRatio = Math.max(0, Math.min(11, e.limitRatio || 0)))
            : (this.limitRatio = 1),
          null != e.compressionRatio
            ? (this.compressionRatio = Math.max(
                0,
                Math.min(1.168, e.compressionRatio || 0)
              ))
            : (this.compressionRatio = 1);
        let a = 1,
          o = 1,
          r = 1;
        if (null != e.channels)
          for (const t of e.channels)
            t.instruments && (a = Math.max(a, 0 | t.instruments.length)),
              t.patterns && (o = Math.max(o, 0 | t.patterns.length)),
              t.sequence && (r = Math.max(r, 0 | t.sequence.length));
        null != e.layeredInstruments
          ? (this.layeredInstruments = !!e.layeredInstruments)
          : (this.layeredInstruments = !1),
          null != e.patternInstruments
            ? (this.patternInstruments = !!e.patternInstruments)
            : (this.patternInstruments = a > 1),
          (this.patternsPerChannel = Math.min(o, h.barCountMax)),
          (this.barCount = Math.min(r, h.barCountMax)),
          null != e.introBars &&
            (this.loopStart = V(0, this.barCount, 0 | e.introBars)),
          null != e.loopBars &&
            (this.loopLength = V(
              1,
              this.barCount - this.loopStart + 1,
              0 | e.loopBars
            ));
        const c = [],
          u = [],
          p = [];
        if (null != e.channels)
          for (let t = 0; t < e.channels.length; t++) {
            let s = e.channels[t];
            const a = new pe();
            let o = !1,
              r = !1;
            if (
              (null != s.type
                ? ((o = "drum" == s.type), (r = "mod" == s.type))
                : (o = t >= 3),
              o ? u.push(a) : r ? p.push(a) : c.push(a),
              null != s.octaveScrollBar &&
                ((a.octave = V(0, h.pitchOctaves, 1 + (0 | s.octaveScrollBar))),
                o && (a.octave = 0)),
              null != s.name ? (a.name = s.name) : (a.name = ""),
              Array.isArray(s.instruments))
            ) {
              const e = s.instruments;
              for (
                let t = 0;
                t < e.length && !(t >= this.getMaxInstrumentsPerChannel());
                t++
              ) {
                const s = new ue(o, r);
                (a.instruments[t] = s), s.fromJsonObject(e[t], o, r, !1, !1, i);
              }
            }
            for (let e = 0; e < this.patternsPerChannel; e++) {
              const t = new ee();
              let i;
              (a.patterns[e] = t),
                s.patterns && (i = s.patterns[e]),
                null != i && t.fromJsonObject(i, this, a, n, o, r);
            }
            a.patterns.length = this.patternsPerChannel;
            for (let e = 0; e < this.barCount; e++)
              a.bars[e] =
                null != s.sequence
                  ? Math.min(this.patternsPerChannel, s.sequence[e] >>> 0)
                  : 0;
            a.bars.length = this.barCount;
          }
        c.length > h.pitchChannelCountMax &&
          (c.length = h.pitchChannelCountMax),
          u.length > h.noiseChannelCountMax &&
            (u.length = h.noiseChannelCountMax),
          p.length > h.modChannelCountMax && (p.length = h.modChannelCountMax),
          (this.pitchChannelCount = c.length),
          (this.noiseChannelCount = u.length),
          (this.modChannelCount = p.length),
          (this.channels.length = 0),
          Array.prototype.push.apply(this.channels, c),
          Array.prototype.push.apply(this.channels, u),
          Array.prototype.push.apply(this.channels, p),
          h.willReloadForCustomSamples &&
            ((window.location.hash = this.toBase64String()),
            setTimeout(() => {
              location.reload();
            }, 50));
      }
      getPattern(e, t) {
        if (t < 0 || t >= this.barCount) return null;
        const s = this.channels[e].bars[t];
        return 0 == s ? null : this.channels[e].patterns[s - 1];
      }
      getBeatsPerMinute() {
        return this.tempo;
      }
      static getNeededBits(e) {
        return 32 - Math.clz32(Math.ceil(e + 1) - 1);
      }
      restoreLimiterDefaults() {
        (this.compressionRatio = 1),
          (this.limitRatio = 1),
          (this.limitRise = 4e3),
          (this.limitDecay = 4),
          (this.limitThreshold = 1),
          (this.compressionThreshold = 1),
          (this.masterGain = 1);
      }
    }
    (fe.j = "UltraBox"),
      (fe.T = 2),
      (fe.q = 9),
      (fe.R = 1),
      (fe.O = 5),
      (fe.L = 1),
      (fe.H = 4),
      (fe.N = 1),
      (fe.k = 3),
      (fe.M = 117);
    class me {
      constructor() {
        (this.delayLine = null),
          (this.allPassG = 0),
          (this.allPassGDelta = 0),
          (this.shelfA1 = 0),
          (this.shelfA1Delta = 0),
          (this.shelfB0 = 0),
          (this.shelfB0Delta = 0),
          (this.shelfB1 = 0),
          (this.shelfB1Delta = 0),
          this.reset();
      }
      reset() {
        (this.delayIndex = -1),
          (this.allPassSample = 0),
          (this.allPassPrevInput = 0),
          (this.shelfSample = 0),
          (this.shelfPrevInput = 0),
          (this.fractionalDelaySample = 0),
          (this.prevDelayLength = -1),
          (this.delayResetOffset = 0);
      }
      update(e, t, s, i, n, a, o) {
        const r =
            (2 * Math.PI * h.pickedStringDispersionCenterFreq) /
            e.samplesPerSecond,
          l = (2 * Math.PI * h.pickedStringShelfHz) / e.samplesPerSecond,
          c = (Math.pow(100, a) - 1) / 99,
          u = (Math.pow(100, o) - 1) / 99,
          p = this.prevDelayLength,
          f = s.phaseDeltas[i],
          m = s.phaseDeltaScales[i],
          d = f * Math.pow(m, n),
          y = 2 * Math.PI * f,
          v = 2 * Math.PI * d,
          g = 2 * y,
          b = 2 * v,
          S = Math.min(
            Math.PI,
            y *
              h.pickedStringDispersionFreqMult *
              Math.pow(r / y, h.pickedStringDispersionFreqScale)
          ),
          M = Math.min(
            Math.PI,
            v *
              h.pickedStringDispersionFreqMult *
              Math.pow(r / v, h.pickedStringDispersionFreqScale)
          ),
          w = Math.pow(0.5, (c * l) / y),
          k = Math.pow(0.5, (u * l) / v),
          x = Math.pow(w, h.stringDecayRate),
          P = Math.pow(k, h.stringDecayRate),
          F = Math.pow(w, 0.002),
          I = Math.pow(k, 0.002);
        be.tempFilterStartCoefficients.allPass1stOrderInvertPhaseAbove(S),
          e.tempFrequencyResponse.analyze(be.tempFilterStartCoefficients, g);
        const q = be.tempFilterStartCoefficients.b[0],
          T = -e.tempFrequencyResponse.angle() / g;
        be.tempFilterEndCoefficients.allPass1stOrderInvertPhaseAbove(M),
          e.tempFrequencyResponse.analyze(be.tempFilterEndCoefficients, b);
        const D = be.tempFilterEndCoefficients.b[0],
          O = -e.tempFrequencyResponse.angle() / b;
        be.tempFilterStartCoefficients.highShelf1stOrder(l, x),
          e.tempFrequencyResponse.analyze(be.tempFilterStartCoefficients, g);
        const R = be.tempFilterStartCoefficients.a[1],
          z = be.tempFilterStartCoefficients.b[0] * F,
          C = be.tempFilterStartCoefficients.b[1] * F,
          E = -e.tempFrequencyResponse.angle() / g;
        be.tempFilterEndCoefficients.highShelf1stOrder(l, P),
          e.tempFrequencyResponse.analyze(be.tempFilterEndCoefficients, b);
        const A = be.tempFilterEndCoefficients.a[1],
          H = be.tempFilterEndCoefficients.b[0] * I,
          L = be.tempFilterEndCoefficients.b[1] * I,
          N = -e.tempFrequencyResponse.angle() / b,
          G = 1 / f,
          V = 1 / d,
          B = Math.ceil(2 * Math.max(G, V)),
          W = G - T - E,
          $ = V - O - N;
        (this.prevDelayLength = W),
          (this.delayLengthDelta = ($ - W) / n),
          (this.allPassG = q),
          (this.shelfA1 = R),
          (this.shelfB0 = z),
          (this.shelfB1 = C),
          (this.allPassGDelta = (D - q) / n),
          (this.shelfA1Delta = (A - R) / n),
          (this.shelfB0Delta = (H - z) / n),
          (this.shelfB1Delta = (L - C) / n);
        const j = Math.abs(Math.log2(W / p)) > 0.01,
          U = -1 == this.delayIndex || j;
        if (null == this.delayLine || this.delayLine.length <= B) {
          const t = Math.ceil(
              (2 * e.samplesPerSecond) / ue.frequencyFromPitch(12)
            ),
            s = new Float32Array(be.fittingPowerOfTwo(Math.max(t, B)));
          if (!U && null != this.delayLine) {
            const e = (this.delayLine.length - 1) >> 0,
              t = this.delayIndex + this.delayResetOffset;
            this.delayIndex = this.delayLine.length - this.delayResetOffset;
            for (let i = 0; i < this.delayLine.length; i++)
              s[i] = this.delayLine[(t + i) & e];
          }
          this.delayLine = s;
        }
        const _ = this.delayLine,
          K = (_.length - 1) >> 0;
        if (U) {
          (this.delayIndex = 0),
            (this.allPassSample = 0),
            (this.allPassPrevInput = 0),
            (this.shelfSample = 0),
            (this.shelfPrevInput = 0),
            (this.fractionalDelaySample = 0);
          const s = -W,
            i = Math.floor(s - G / 2),
            n = Math.ceil(i + 2 * G);
          this.delayResetOffset = n;
          for (let e = i; e <= n; e++) _[e & K] = 0;
          const a = t.wave,
            o = a.length - 1,
            r = o / G,
            l = Math.min(0.2 * G, 0.003 * e.samplesPerSecond),
            h = Math.ceil(s),
            c = s + G + l,
            u = c;
          let p = (h - s) * r,
            f = 0;
          for (let e = h; e <= u; e++) {
            const t = 0 | p,
              i = t % o;
            let n = a[i];
            const h = p - t;
            n += (a[i + 1] - n) * h;
            const u = (n - f) / r,
              m = Math.min(1, (e - s) / l) * Math.min(1, (c - e) / l),
              d = m * m * (3 - 2 * m);
            (_[e & K] += u * d), (f = n), (p += r);
          }
        }
      }
    }
    class de {
      constructor() {
        (this.noteSecondsStart = 0),
          (this.noteSecondsEnd = 0),
          (this.noteTicksStart = 0),
          (this.noteTicksEnd = 0),
          (this.noteSizeStart = h.noteSizeMax),
          (this.noteSizeEnd = h.noteSizeMax),
          (this.prevNoteSize = h.noteSizeMax),
          (this.nextNoteSize = h.noteSizeMax),
          (this.U = h.noteSizeMax),
          (this.prevNoteSecondsStart = 0),
          (this.prevNoteSecondsEnd = 0),
          (this.prevNoteTicksStart = 0),
          (this.prevNoteTicksEnd = 0),
          (this._ = h.noteSizeMax),
          (this.prevSlideStart = !1),
          (this.prevSlideEnd = !1),
          (this.nextSlideStart = !1),
          (this.nextSlideEnd = !1),
          (this.prevSlideRatioStart = 0),
          (this.prevSlideRatioEnd = 0),
          (this.nextSlideRatioStart = 0),
          (this.nextSlideRatioEnd = 0),
          (this.envelopeStarts = []),
          (this.envelopeEnds = []),
          (this.K = []),
          (this.J = 0),
          (this.lowpassCutoffDecayVolumeCompensation = 1);
        for (let e = 0; e < 37; e++)
          (this.envelopeStarts[e] = 1), (this.envelopeEnds[e] = 1);
        this.reset();
      }
      reset() {
        (this.noteSecondsEnd = 0),
          (this.noteTicksEnd = 0),
          (this.U = h.noteSizeMax),
          (this.prevNoteSecondsEnd = 0),
          (this.prevNoteTicksEnd = 0),
          (this._ = h.noteSizeMax),
          (this.J = 0);
      }
      computeEnvelopes(e, t, s, i, n) {
        const a = e.getTransition();
        null == n ||
          !n.atNoteStart ||
          a.continues ||
          n.forceContinueAtStart ||
          ((this.prevNoteSecondsEnd = this.noteSecondsEnd),
          (this.prevNoteTicksEnd = this.noteTicksEnd),
          (this._ = this.U),
          (this.noteSecondsEnd = 0),
          (this.noteTicksEnd = 0)),
          null != n &&
            (null != n.note
              ? (this.U = n.note.pins[n.note.pins.length - 1].size)
              : (this.U = h.noteSizeMax));
        const o = s + 1,
          r = this.noteSecondsEnd,
          l = r + i,
          c = this.noteTicksEnd,
          u = c + 1,
          p = this.prevNoteSecondsEnd,
          f = p + i,
          m = this.prevNoteTicksEnd,
          d = m + 1,
          y = 1 / (h.ticksPerPart * h.partsPerBeat),
          v = y * s,
          g = y * o;
        let b = this.U,
          S = this.U,
          M = this._,
          w = 0,
          k = !1,
          x = !1,
          P = !1,
          F = !1,
          I = 0,
          q = 0,
          T = 0,
          D = 0;
        if (null != n && null != n.note && !n.passedEndOfNote) {
          const e = n.note.getEndPinIndex(t),
            i = n.note.pins[e - 1],
            r = n.note.pins[e],
            l = (n.note.start + i.time) * h.ticksPerPart,
            c = (n.note.start + r.time) * h.ticksPerPart,
            u = (s - l) / (c - l),
            p = (o - l) / (c - l);
          if (
            ((b = i.size + (r.size - i.size) * u),
            (S = i.size + (r.size - i.size) * p),
            a.slides)
          ) {
            const e = n.noteStartPart * h.ticksPerPart,
              t = n.noteEndPart * h.ticksPerPart,
              i = 0.5 * (t - e),
              r = Math.min(i, a.slideTicks);
            null == n.prevNote ||
              n.forceContinueAtStart ||
              (s - e < r && ((k = !0), (I = 0.5 * (1 - (s - e) / r))),
              o - e < r && ((x = !0), (q = 0.5 * (1 - (o - e) / r)))),
              null == n.nextNote ||
                n.forceContinueAtEnd ||
                ((w = n.nextNote.pins[0].size),
                t - s < r && ((P = !0), (T = 0.5 * (1 - (t - s) / r))),
                t - o < r && ((F = !0), (D = 0.5 * (1 - (t - o) / r))));
          }
        }
        let O = 1,
          R = !1;
        for (let t = 0; t <= e.envelopeCount; t++) {
          let s, i, n;
          if (t == e.envelopeCount) {
            if (R) break;
            (s = h.instrumentAutomationTargets.dictionary.noteVolume),
              (i = 0),
              (n = h.envelopes.dictionary["note size"]);
          } else {
            let a = e.envelopes[t];
            (s = h.instrumentAutomationTargets[a.target]),
              (i = a.index),
              (n = h.envelopes[a.envelope]),
              0 == n.type && (R = !0);
          }
          if (null != s.computeIndex) {
            const t = s.computeIndex + i;
            let a = de.computeEnvelope(n, r, v, b),
              o = de.computeEnvelope(n, l, g, S);
            if (k) {
              a += (de.computeEnvelope(n, p, v, M) - a) * I;
            }
            if (x) {
              o += (de.computeEnvelope(n, f, g, M) - o) * q;
            }
            if (P) {
              a += (de.computeEnvelope(n, 0, v, w) - a) * T;
            }
            if (F) {
              o += (de.computeEnvelope(n, 0, g, w) - o) * D;
            }
            if (
              ((this.envelopeStarts[t] *= a),
              (this.envelopeEnds[t] *= o),
              (this.K[this.J++] = t),
              s.isFilter)
            ) {
              const t =
                null != e.tmpNoteFilterStart
                  ? e.tmpNoteFilterStart
                  : e.noteFilter;
              t.controlPointCount > i &&
                0 == t.controlPoints[i].type &&
                (O = Math.max(
                  O,
                  de.getLowpassCutoffDecayVolumeCompensation(n)
                ));
            }
          }
        }
        (this.noteSecondsStart = r),
          (this.noteSecondsEnd = l),
          (this.noteTicksStart = c),
          (this.noteTicksEnd = u),
          (this.prevNoteSecondsStart = p),
          (this.prevNoteSecondsEnd = f),
          (this.prevNoteTicksStart = m),
          (this.prevNoteTicksEnd = d),
          (this.prevNoteSize = M),
          (this.nextNoteSize = w),
          (this.noteSizeStart = b),
          (this.noteSizeEnd = S),
          (this.prevSlideStart = k),
          (this.prevSlideEnd = x),
          (this.nextSlideStart = P),
          (this.nextSlideEnd = F),
          (this.prevSlideRatioStart = I),
          (this.prevSlideRatioEnd = q),
          (this.nextSlideRatioStart = T),
          (this.nextSlideRatioEnd = D),
          (this.lowpassCutoffDecayVolumeCompensation = O);
      }
      clearEnvelopes() {
        for (let e = 0; e < this.J; e++) {
          const t = this.K[e];
          (this.envelopeStarts[t] = 1), (this.envelopeEnds[t] = 1);
        }
        this.J = 0;
      }
      static computeEnvelope(e, t, s, i) {
        switch (e.type) {
          case 0:
            return be.noteSizeToVolumeMult(i);
          case 1:
            return 1;
          case 4:
            return 1 / (1 + t * e.speed);
          case 5:
            return 1 - 1 / (1 + t * e.speed);
          case 6:
            return 0.5 - 0.5 * Math.cos(2 * s * Math.PI * e.speed);
          case 7:
            return 0.75 - 0.25 * Math.cos(2 * s * Math.PI * e.speed);
          case 2:
            return Math.max(1, 2 - 10 * t);
          case 3:
            const n = 0.25 / Math.sqrt(e.speed);
            return t < n ? t / n : 1 / (1 + (t - n) * e.speed);
          case 8:
            return Math.pow(2, -e.speed * t);
          case 9:
            let a = 0.5 - 0.5 * Math.cos(s * e.speed);
            return (
              (a = 1 / (1 + t * (e.speed - a / (1.5 / e.speed)))),
              (a = a > 0 ? a : 0),
              a
            );
          case 11: {
            let s = 1 - t / (16 / e.speed);
            return (s = s > 0 ? s : 0), s;
          }
          case 12: {
            let s = t / (16 / e.speed);
            return (s = s < 1 ? s : 1), s;
          }
          default:
            throw new Error("Unrecognized operator envelope type.");
        }
      }
      static getLowpassCutoffDecayVolumeCompensation(e) {
        return 8 == e.type
          ? 1.25 + 0.025 * e.speed
          : 4 == e.type
          ? 1 + 0.02 * e.speed
          : 1;
      }
    }
    class ye {
      constructor() {
        (this.pitches = Array(h.maxChordSize + 2).fill(0)),
          (this.pitchCount = 0),
          (this.chordSize = 0),
          (this.drumsetPitch = null),
          (this.note = null),
          (this.prevNote = null),
          (this.nextNote = null),
          (this.prevNotePitchIndex = 0),
          (this.nextNotePitchIndex = 0),
          (this.freshlyAllocated = !0),
          (this.atNoteStart = !1),
          (this.isOnLastTick = !1),
          (this.passedEndOfNote = !1),
          (this.forceContinueAtStart = !1),
          (this.forceContinueAtEnd = !1),
          (this.noteStartPart = 0),
          (this.noteEndPart = 0),
          (this.ticksSinceReleased = 0),
          (this.liveInputSamplesHeld = 0),
          (this.lastInterval = 0),
          (this.noiseSample = 0),
          (this.stringSustainStart = 0),
          (this.stringSustainEnd = 0),
          (this.phases = []),
          (this.operatorWaves = []),
          (this.phaseDeltas = []),
          (this.directions = []),
          (this.chipWaveCompletions = []),
          (this.chipWavePrevWaves = []),
          (this.chipWaveCompletionsLastWave = []),
          (this.phaseDeltaScales = []),
          (this.expression = 0),
          (this.expressionDelta = 0),
          (this.operatorExpressions = []),
          (this.operatorExpressionDeltas = []),
          (this.prevPitchExpressions = Array(h.maxPitchOrOperatorCount).fill(
            null
          )),
          (this.prevVibrato = null),
          (this.prevStringDecay = null),
          (this.pulseWidth = 0),
          (this.pulseWidthDelta = 0),
          (this.pickedStrings = []),
          (this.noteFilters = []),
          (this.noteFilterCount = 0),
          (this.initialNoteFilterInput1 = 0),
          (this.initialNoteFilterInput2 = 0),
          (this.specialIntervalExpressionMult = 1),
          (this.feedbackOutputs = []),
          (this.feedbackMult = 0),
          (this.feedbackDelta = 0),
          (this.stereoVolumeLStart = 0),
          (this.stereoVolumeRStart = 0),
          (this.stereoVolumeLDelta = 0),
          (this.stereoVolumeRDelta = 0),
          (this.stereoDelayStart = 0),
          (this.stereoDelayEnd = 0),
          (this.stereoDelayDelta = 0),
          (this.customVolumeStart = 0),
          (this.customVolumeEnd = 0),
          (this.filterResonanceStart = 0),
          (this.filterResonanceDelta = 0),
          (this.isFirstOrder = !1),
          (this.envelopeComputer = new de()),
          this.reset();
      }
      reset() {
        this.noiseSample = 0;
        for (let e = 0; e < h.maxPitchOrOperatorCount; e++)
          (this.phases[e] = 0),
            (this.directions[e] = 1),
            (this.chipWaveCompletions[e] = 0),
            (this.chipWavePrevWaves[e] = 0),
            (this.chipWaveCompletionsLastWave[e] = 0),
            (this.operatorWaves[e] = h.operatorWaves[0]),
            (this.feedbackOutputs[e] = 0),
            (this.prevPitchExpressions[e] = null);
        for (let e = 0; e < this.noteFilterCount; e++)
          this.noteFilters[e].resetOutput();
        (this.noteFilterCount = 0),
          (this.initialNoteFilterInput1 = 0),
          (this.initialNoteFilterInput2 = 0),
          (this.liveInputSamplesHeld = 0);
        for (const e of this.pickedStrings) e.reset();
        this.envelopeComputer.reset(),
          (this.prevVibrato = null),
          (this.prevStringDecay = null),
          (this.drumsetPitch = null);
      }
    }
    class ve {
      constructor() {
        (this.awake = !1),
          (this.computed = !1),
          (this.tonesAddedInThisTick = !1),
          (this.flushingDelayLines = !1),
          (this.deactivateAfterThisTick = !1),
          (this.attentuationProgress = 0),
          (this.flushedSamples = 0),
          (this.activeTones = new E()),
          (this.activeModTones = new E()),
          (this.releasedTones = new E()),
          (this.liveInputTones = new E()),
          (this.type = 0),
          (this.synthesizer = null),
          (this.wave = null),
          (this.isUsingAdvancedLoopControls = !1),
          (this.chipWaveLoopStart = 0),
          (this.chipWaveLoopEnd = 0),
          (this.chipWaveLoopMode = 0),
          (this.chipWavePlayBackwards = !1),
          (this.chipWaveStartOffset = 0),
          (this.noisePitchFilterMult = 1),
          (this.unison = null),
          (this.chord = null),
          (this.effects = 0),
          (this.volumeScale = 0),
          (this.aliases = !1),
          (this.eqFilterVolume = 1),
          (this.eqFilterVolumeDelta = 0),
          (this.mixVolume = 1),
          (this.mixVolumeDelta = 0),
          (this.delayInputMult = 0),
          (this.delayInputMultDelta = 0),
          (this.distortion = 0),
          (this.distortionDelta = 0),
          (this.distortionDrive = 0),
          (this.distortionDriveDelta = 0),
          (this.distortionFractionalInput1 = 0),
          (this.distortionFractionalInput2 = 0),
          (this.distortionFractionalInput3 = 0),
          (this.distortionPrevInput = 0),
          (this.distortionNextOutput = 0),
          (this.bitcrusherPrevInput = 0),
          (this.bitcrusherCurrentOutput = 0),
          (this.bitcrusherPhase = 1),
          (this.bitcrusherPhaseDelta = 0),
          (this.bitcrusherPhaseDeltaScale = 1),
          (this.bitcrusherScale = 1),
          (this.bitcrusherScaleScale = 1),
          (this.bitcrusherFoldLevel = 1),
          (this.bitcrusherFoldLevelScale = 1),
          (this.eqFilters = []),
          (this.eqFilterCount = 0),
          (this.initialEqFilterInput1 = 0),
          (this.initialEqFilterInput2 = 0),
          (this.panningDelayLine = null),
          (this.panningDelayPos = 0),
          (this.panningVolumeL = 0),
          (this.panningVolumeR = 0),
          (this.panningVolumeDeltaL = 0),
          (this.panningVolumeDeltaR = 0),
          (this.panningOffsetL = 0),
          (this.panningOffsetR = 0),
          (this.panningOffsetDeltaL = 0),
          (this.panningOffsetDeltaR = 0),
          (this.chorusDelayLineL = null),
          (this.chorusDelayLineR = null),
          (this.chorusDelayLineDirty = !1),
          (this.chorusDelayPos = 0),
          (this.chorusPhase = 0),
          (this.chorusVoiceMult = 0),
          (this.chorusVoiceMultDelta = 0),
          (this.chorusCombinedMult = 0),
          (this.chorusCombinedMultDelta = 0),
          (this.echoDelayLineL = null),
          (this.echoDelayLineR = null),
          (this.echoDelayLineDirty = !1),
          (this.echoDelayPos = 0),
          (this.echoDelayOffsetStart = 0),
          (this.echoDelayOffsetEnd = null),
          (this.echoDelayOffsetRatio = 0),
          (this.echoDelayOffsetRatioDelta = 0),
          (this.echoMult = 0),
          (this.echoMultDelta = 0),
          (this.echoShelfA1 = 0),
          (this.echoShelfB0 = 0),
          (this.echoShelfB1 = 0),
          (this.echoShelfSampleL = 0),
          (this.echoShelfSampleR = 0),
          (this.echoShelfPrevInputL = 0),
          (this.echoShelfPrevInputR = 0),
          (this.reverbDelayLine = null),
          (this.reverbDelayLineDirty = !1),
          (this.reverbDelayPos = 0),
          (this.reverbMult = 0),
          (this.reverbMultDelta = 0),
          (this.reverbShelfA1 = 0),
          (this.reverbShelfB0 = 0),
          (this.reverbShelfB1 = 0),
          (this.reverbShelfSample0 = 0),
          (this.reverbShelfSample1 = 0),
          (this.reverbShelfSample2 = 0),
          (this.reverbShelfSample3 = 0),
          (this.reverbShelfPrevInput0 = 0),
          (this.reverbShelfPrevInput1 = 0),
          (this.reverbShelfPrevInput2 = 0),
          (this.reverbShelfPrevInput3 = 0),
          (this.spectrumWave = new ae()),
          (this.harmonicsWave = new re()),
          (this.drumsetSpectrumWaves = []);
        for (let e = 0; e < h.drumCount; e++)
          this.drumsetSpectrumWaves[e] = new ae();
      }
      allocateNecessaryBuffers(e, t, s) {
        if (
          (I(t.effects) &&
            (null == this.panningDelayLine ||
              this.panningDelayLine.length < e.panningDelayBufferSize) &&
            (this.panningDelayLine = new Float32Array(
              e.panningDelayBufferSize
            )),
          q(t.effects) &&
            ((null == this.chorusDelayLineL ||
              this.chorusDelayLineL.length < e.chorusDelayBufferSize) &&
              (this.chorusDelayLineL = new Float32Array(
                e.chorusDelayBufferSize
              )),
            (null == this.chorusDelayLineR ||
              this.chorusDelayLineR.length < e.chorusDelayBufferSize) &&
              (this.chorusDelayLineR = new Float32Array(
                e.chorusDelayBufferSize
              ))),
          T(t.effects))
        ) {
          const e = Math.max(h.echoDelayRange >> 1, t.echoDelay + 1),
            i = 2 * be.fittingPowerOfTwo(e * h.echoDelayStepTicks * s);
          if (null == this.echoDelayLineL || null == this.echoDelayLineR)
            (this.echoDelayLineL = new Float32Array(i)),
              (this.echoDelayLineR = new Float32Array(i));
          else if (
            this.echoDelayLineL.length < i ||
            this.echoDelayLineR.length < i
          ) {
            const e = new Float32Array(i),
              t = new Float32Array(i),
              s = this.echoDelayLineL.length - 1;
            for (let i = 0; i < this.echoDelayLineL.length; i++)
              (e[i] = this.echoDelayLineL[(this.echoDelayPos + i) & s]),
                (t[i] = this.echoDelayLineL[(this.echoDelayPos + i) & s]);
            (this.echoDelayPos = this.echoDelayLineL.length),
              (this.echoDelayLineL = e),
              (this.echoDelayLineR = t);
          }
        }
        D(t.effects) &&
          null == this.reverbDelayLine &&
          (this.reverbDelayLine = new Float32Array(h.reverbDelayBufferSize));
      }
      deactivate() {
        (this.bitcrusherPrevInput = 0),
          (this.bitcrusherCurrentOutput = 0),
          (this.bitcrusherPhase = 1);
        for (let e = 0; e < this.eqFilterCount; e++)
          this.eqFilters[e].resetOutput();
        if (
          ((this.eqFilterCount = 0),
          (this.initialEqFilterInput1 = 0),
          (this.initialEqFilterInput2 = 0),
          (this.distortionFractionalInput1 = 0),
          (this.distortionFractionalInput2 = 0),
          (this.distortionFractionalInput3 = 0),
          (this.distortionPrevInput = 0),
          (this.distortionNextOutput = 0),
          (this.panningDelayPos = 0),
          null != this.panningDelayLine)
        )
          for (let e = 0; e < this.panningDelayLine.length; e++)
            this.panningDelayLine[e] = 0;
        (this.echoDelayOffsetEnd = null),
          (this.echoShelfSampleL = 0),
          (this.echoShelfSampleR = 0),
          (this.echoShelfPrevInputL = 0),
          (this.echoShelfPrevInputR = 0),
          (this.reverbShelfSample0 = 0),
          (this.reverbShelfSample1 = 0),
          (this.reverbShelfSample2 = 0),
          (this.reverbShelfSample3 = 0),
          (this.reverbShelfPrevInput0 = 0),
          (this.reverbShelfPrevInput1 = 0),
          (this.reverbShelfPrevInput2 = 0),
          (this.reverbShelfPrevInput3 = 0),
          (this.volumeScale = 1),
          (this.aliases = !1),
          (this.awake = !1),
          (this.flushingDelayLines = !1),
          (this.deactivateAfterThisTick = !1),
          (this.attentuationProgress = 0),
          (this.flushedSamples = 0);
      }
      resetAllEffects() {
        if ((this.deactivate(), this.chorusDelayLineDirty)) {
          for (let e = 0; e < this.chorusDelayLineL.length; e++)
            this.chorusDelayLineL[e] = 0;
          for (let e = 0; e < this.chorusDelayLineR.length; e++)
            this.chorusDelayLineR[e] = 0;
        }
        if (this.echoDelayLineDirty) {
          for (let e = 0; e < this.echoDelayLineL.length; e++)
            this.echoDelayLineL[e] = 0;
          for (let e = 0; e < this.echoDelayLineR.length; e++)
            this.echoDelayLineR[e] = 0;
        }
        if (this.reverbDelayLineDirty)
          for (let e = 0; e < this.reverbDelayLine.length; e++)
            this.reverbDelayLine[e] = 0;
        this.chorusPhase = 0;
      }
      compute(e, t, s, i, n, a, o) {
        (this.computed = !0),
          (this.type = t.type),
          (this.synthesizer = be.getInstrumentSynthFunction(t)),
          (this.unison = h.unisons[t.unison]),
          (this.chord = t.getChord()),
          (this.noisePitchFilterMult =
            h.chipNoises[t.chipNoise].pitchFilterMult),
          (this.effects = t.effects),
          (this.aliases = t.aliases),
          (this.volumeScale = 1),
          this.allocateNecessaryBuffers(e, t, s);
        const r = e.samplesPerSecond;
        this.updateWaves(t, r);
        const l = P(this.effects),
          c = F(this.effects),
          u = I(this.effects),
          p = q(this.effects),
          f = T(this.effects),
          m = D(this.effects);
        if (l) {
          let s = t.distortion,
            n = t.distortion;
          e.isModActive(h.modulators.dictionary.distortion.index, a, o) &&
            ((s = e.getModValue(
              h.modulators.dictionary.distortion.index,
              a,
              o,
              !1
            )),
            (n = e.getModValue(
              h.modulators.dictionary.distortion.index,
              a,
              o,
              !0
            )));
          const r = Math.min(1, s / (h.distortionRange - 1)),
            l = Math.min(1, n / (h.distortionRange - 1)),
            c = Math.pow(1 - (0.895 * (Math.pow(20, r) - 1)) / 19, 2),
            u = Math.pow(1 - (0.895 * (Math.pow(20, l) - 1)) / 19, 2),
            p = (1 + 2 * r) / h.distortionBaseVolume,
            f = (1 + 2 * l) / h.distortionBaseVolume;
          (this.distortion = c),
            (this.distortionDelta = (u - c) / i),
            (this.distortionDrive = p),
            (this.distortionDriveDelta = (f - p) / i);
        }
        if (c) {
          let s = t.bitcrusherFreq,
            n = t.bitcrusherFreq;
          e.isModActive(h.modulators.dictionary["freq crush"].index, a, o) &&
            ((s = e.getModValue(
              h.modulators.dictionary["freq crush"].index,
              a,
              o,
              !1
            )),
            (n = e.getModValue(
              h.modulators.dictionary["freq crush"].index,
              a,
              o,
              !0
            )));
          let l = t.bitcrusherQuantization,
            c = t.bitcrusherQuantization;
          e.isModActive(h.modulators.dictionary["bit crush"].index, a, o) &&
            ((l = e.getModValue(
              h.modulators.dictionary["bit crush"].index,
              a,
              o,
              !1
            )),
            (c = e.getModValue(
              h.modulators.dictionary["bit crush"].index,
              a,
              o,
              !0
            )));
          const u =
              h.keys[e.song.key].basePitch + h.pitchesPerOctave * e.song.octave,
            p =
              ue.frequencyFromPitch(u + 60) *
              Math.pow(
                2,
                (h.bitcrusherFreqRange - 1 - s) * h.bitcrusherOctaveStep
              ),
            f =
              ue.frequencyFromPitch(u + 60) *
              Math.pow(
                2,
                (h.bitcrusherFreqRange - 1 - n) * h.bitcrusherOctaveStep
              ),
            m = Math.min(1, p / r),
            d = Math.min(1, f / r);
          (this.bitcrusherPhaseDelta = m),
            (this.bitcrusherPhaseDeltaScale = Math.pow(d / m, 1 / i));
          const y =
              2 *
              h.bitcrusherBaseVolume *
              Math.pow(
                2,
                1 - Math.pow(2, 0.5 * (h.bitcrusherQuantizationRange - 1 - l))
              ),
            v =
              2 *
              h.bitcrusherBaseVolume *
              Math.pow(
                2,
                1 - Math.pow(2, 0.5 * (h.bitcrusherQuantizationRange - 1 - c))
              );
          (this.bitcrusherScale = y),
            (this.bitcrusherScaleScale = Math.pow(v / y, 1 / i));
          const g =
              2 *
              h.bitcrusherBaseVolume *
              Math.pow(1.5, h.bitcrusherQuantizationRange - 1 - l),
            b =
              2 *
              h.bitcrusherBaseVolume *
              Math.pow(1.5, h.bitcrusherQuantizationRange - 1 - c);
          (this.bitcrusherFoldLevel = g),
            (this.bitcrusherFoldLevelScale = Math.pow(b / g, 1 / i));
        }
        let d = 1;
        if (t.eqFilterType) {
          const s = t.eqFilter;
          null == t.eqSubFilters[1] && (t.eqSubFilters[1] = new he());
          const n = t.eqSubFilters[1];
          let l,
            c = t.eqFilterSimpleCut,
            u = t.eqFilterSimplePeak,
            p = t.eqFilterSimpleCut,
            f = t.eqFilterSimplePeak,
            m = !1;
          if (
            (e.isModActive(
              h.modulators.dictionary["eq filt cut"].index,
              a,
              o
            ) &&
              ((c = e.getModValue(
                h.modulators.dictionary["eq filt cut"].index,
                a,
                o,
                !1
              )),
              (p = e.getModValue(
                h.modulators.dictionary["eq filt cut"].index,
                a,
                o,
                !0
              )),
              (m = !0)),
            e.isModActive(
              h.modulators.dictionary["eq filt peak"].index,
              a,
              o
            ) &&
              ((u = e.getModValue(
                h.modulators.dictionary["eq filt peak"].index,
                a,
                o,
                !1
              )),
              (f = e.getModValue(
                h.modulators.dictionary["eq filt peak"].index,
                a,
                o,
                !0
              )),
              (m = !0)),
            m)
          ) {
            s.convertLegacySettingsForSynth(c, u),
              n.convertLegacySettingsForSynth(p, f),
              (l = s.controlPoints[0]);
            let e = n.controlPoints[0];
            l.toCoefficients(be.tempFilterStartCoefficients, r, 1, 1),
              e.toCoefficients(be.tempFilterEndCoefficients, r, 1, 1),
              this.eqFilters.length < 1 && (this.eqFilters[0] = new N()),
              this.eqFilters[0].loadCoefficientsWithGradient(
                be.tempFilterStartCoefficients,
                be.tempFilterEndCoefficients,
                1 / i,
                0 == l.type
              );
          } else
            s.convertLegacySettingsForSynth(c, u, !0),
              (l = s.controlPoints[0]),
              l.toCoefficients(be.tempFilterStartCoefficients, r, 1, 1),
              this.eqFilters.length < 1 && (this.eqFilters[0] = new N()),
              this.eqFilters[0].loadCoefficientsWithGradient(
                be.tempFilterStartCoefficients,
                be.tempFilterStartCoefficients,
                1 / i,
                0 == l.type
              );
          (d *= l.getVolumeCompensationMult()),
            (this.eqFilterCount = 1),
            (d = Math.min(3, d));
        } else {
          const e =
            null != t.tmpEqFilterStart ? t.tmpEqFilterStart : t.eqFilter;
          for (let s = 0; s < e.controlPointCount; s++) {
            let n = e.controlPoints[s],
              a =
                null != t.tmpEqFilterEnd &&
                null != t.tmpEqFilterEnd.controlPoints[s]
                  ? t.tmpEqFilterEnd.controlPoints[s]
                  : e.controlPoints[s];
            n.type != a.type && (n = a),
              n.toCoefficients(be.tempFilterStartCoefficients, r, 1, 1),
              a.toCoefficients(be.tempFilterEndCoefficients, r, 1, 1),
              this.eqFilters.length <= s && (this.eqFilters[s] = new N()),
              this.eqFilters[s].loadCoefficientsWithGradient(
                be.tempFilterStartCoefficients,
                be.tempFilterEndCoefficients,
                1 / i,
                0 == n.type
              ),
              (d *= n.getVolumeCompensationMult());
          }
          (this.eqFilterCount = e.controlPointCount), (d = Math.min(3, d));
        }
        const y = be.instrumentVolumeToVolumeMult(t.volume);
        this.mixVolume = y;
        let v = y;
        if (e.isModActive(h.modulators.dictionary["mix volume"].index, a, o)) {
          const t = e.getModValue(
              h.modulators.dictionary["mix volume"].index,
              a,
              o,
              !1
            ),
            s = e.getModValue(
              h.modulators.dictionary["mix volume"].index,
              a,
              o,
              !0
            );
          (this.mixVolume *=
            t <= 0
              ? (t + h.volumeRange / 2) / (h.volumeRange / 2)
              : be.instrumentVolumeToVolumeMult(t)),
            (v *=
              s <= 0
                ? (s + h.volumeRange / 2) / (h.volumeRange / 2)
                : be.instrumentVolumeToVolumeMult(s));
        }
        e.isModActive(h.modulators.dictionary["song volume"].index) &&
          ((this.mixVolume *=
            e.getModValue(
              h.modulators.dictionary["song volume"].index,
              void 0,
              void 0,
              !1
            ) / 100),
          (v *=
            e.getModValue(
              h.modulators.dictionary["song volume"].index,
              void 0,
              void 0,
              !0
            ) / 100)),
          (this.mixVolumeDelta = (v - this.mixVolume) / i);
        let g = d,
          b = d,
          S = 1,
          M = 1;
        if (u) {
          let s = t.pan,
            n = t.pan;
          e.isModActive(h.modulators.dictionary.pan.index, a, o) &&
            ((s = e.getModValue(h.modulators.dictionary.pan.index, a, o, !1)),
            (n = e.getModValue(h.modulators.dictionary.pan.index, a, o, !0)));
          let l = Math.max(-1, Math.min(1, (s - h.panCenter) / h.panCenter)),
            c = Math.max(-1, Math.min(1, (n - h.panCenter) / h.panCenter));
          const u = 1.414 * Math.cos((1 + l) * Math.PI * 0.25),
            p = 1.414 * Math.cos((1 - l) * Math.PI * 0.25),
            f = 1.414 * Math.cos((1 + c) * Math.PI * 0.25),
            m = 1.414 * Math.cos((1 - c) * Math.PI * 0.25),
            d = r * h.panDelaySecondsMax;
          let y = t.panDelay,
            v = t.panDelay;
          e.isModActive(h.modulators.dictionary["pan delay"].index, a, o) &&
            ((y = e.getModValue(
              h.modulators.dictionary["pan delay"].index,
              a,
              o,
              !1
            )),
            (v = e.getModValue(
              h.modulators.dictionary["pan delay"].index,
              a,
              o,
              !0
            )));
          const g = (l * y * d) / 10,
            b = (c * v * d) / 10,
            S = Math.max(0, g),
            M = Math.max(0, -g),
            w = Math.max(0, b),
            k = Math.max(0, -b);
          (this.panningVolumeL = u),
            (this.panningVolumeR = p),
            (this.panningVolumeDeltaL = (f - u) / i),
            (this.panningVolumeDeltaR = (m - p) / i),
            (this.panningOffsetL =
              this.panningDelayPos - S + e.panningDelayBufferSize),
            (this.panningOffsetR =
              this.panningDelayPos - M + e.panningDelayBufferSize),
            (this.panningOffsetDeltaL = (w - S) / i),
            (this.panningOffsetDeltaR = (k - M) / i);
        }
        if (p) {
          let s = t.chorus,
            n = t.chorus;
          e.isModActive(h.modulators.dictionary.chorus.index, a, o) &&
            ((s = e.getModValue(
              h.modulators.dictionary.chorus.index,
              a,
              o,
              !1
            )),
            (n = e.getModValue(
              h.modulators.dictionary.chorus.index,
              a,
              o,
              !0
            )));
          let r = Math.min(1, s / (h.chorusRange - 1)),
            l = Math.min(1, n / (h.chorusRange - 1));
          (r = 0.6 * r + 0.4 * Math.pow(r, 6)),
            (l = 0.6 * l + 0.4 * Math.pow(l, 6));
          const c = 1 / Math.sqrt(3 * r * r + 1),
            u = 1 / Math.sqrt(3 * l * l + 1);
          (this.chorusVoiceMult = r),
            (this.chorusVoiceMultDelta = (l - r) / i),
            (this.chorusCombinedMult = c),
            (this.chorusCombinedMultDelta = (u - c) / i);
        }
        let w = 0,
          k = 0;
        if (f) {
          let n = t.echoSustain,
            l = t.echoSustain;
          e.isModActive(h.modulators.dictionary.echo.index, a, o) &&
            ((n = Math.max(
              0,
              e.getModValue(h.modulators.dictionary.echo.index, a, o, !1)
            )),
            (l = Math.max(
              0,
              e.getModValue(h.modulators.dictionary.echo.index, a, o, !0)
            )));
          const c = 0.9 * Math.min(1, Math.pow(n / h.echoSustainRange, 1.1)),
            u = 0.9 * Math.min(1, Math.pow(l / h.echoSustainRange, 1.1));
          (this.echoMult = c),
            (this.echoMultDelta = Math.max(0, (u - c) / i)),
            (w = Math.max(c, u));
          let p = t.echoDelay,
            f = t.echoDelay,
            m = !1;
          e.isModActive(h.modulators.dictionary["echo delay"].index, a, o) &&
            ((p = e.getModValue(
              h.modulators.dictionary["echo delay"].index,
              a,
              o,
              !1
            )),
            (f = e.getModValue(
              h.modulators.dictionary["echo delay"].index,
              a,
              o,
              !0
            )),
            (m = !0));
          const d = Math.round((p + 1) * h.echoDelayStepTicks * s),
            y = Math.round((f + 1) * h.echoDelayStepTicks * s);
          null == this.echoDelayOffsetEnd || m
            ? (this.echoDelayOffsetStart = d)
            : (this.echoDelayOffsetStart = this.echoDelayOffsetEnd),
            (this.echoDelayOffsetEnd = y),
            (k =
              (0.5 * (this.echoDelayOffsetStart + this.echoDelayOffsetEnd)) /
              r),
            (this.echoDelayOffsetRatio = 0),
            (this.echoDelayOffsetRatioDelta = 1 / i);
          const v = (2 * Math.PI * h.echoShelfHz) / e.samplesPerSecond;
          be.tempFilterStartCoefficients.highShelf1stOrder(v, h.echoShelfGain),
            (this.echoShelfA1 = be.tempFilterStartCoefficients.a[1]),
            (this.echoShelfB0 = be.tempFilterStartCoefficients.b[0]),
            (this.echoShelfB1 = be.tempFilterStartCoefficients.b[1]);
        }
        let x = 0;
        if (m) {
          let s = t.reverb,
            n = t.reverb;
          e.isModActive(h.modulators.dictionary.reverb.index, a, o) &&
            ((s = e.getModValue(
              h.modulators.dictionary.reverb.index,
              a,
              o,
              !1
            )),
            (n = e.getModValue(
              h.modulators.dictionary.reverb.index,
              a,
              o,
              !0
            ))),
            e.isModActive(h.modulators.dictionary["song reverb"].index, a, o) &&
              ((s *=
                (e.getModValue(
                  h.modulators.dictionary["song reverb"].index,
                  void 0,
                  void 0,
                  !1
                ) -
                  h.modulators.dictionary["song reverb"].convertRealFactor) /
                h.reverbRange),
              (n *=
                (e.getModValue(
                  h.modulators.dictionary["song reverb"].index,
                  void 0,
                  void 0,
                  !0
                ) -
                  h.modulators.dictionary["song reverb"].convertRealFactor) /
                h.reverbRange));
          const r = 0.425 * Math.min(1, Math.pow(s / h.reverbRange, 0.667)),
            l = 0.425 * Math.min(1, Math.pow(n / h.reverbRange, 0.667));
          (this.reverbMult = r),
            (this.reverbMultDelta = (l - r) / i),
            (x = Math.max(r, l));
          const c = (2 * Math.PI * h.reverbShelfHz) / e.samplesPerSecond;
          be.tempFilterStartCoefficients.highShelf1stOrder(
            c,
            h.reverbShelfGain
          ),
            (this.reverbShelfA1 = be.tempFilterStartCoefficients.a[1]),
            (this.reverbShelfB0 = be.tempFilterStartCoefficients.b[0]),
            (this.reverbShelfB1 = be.tempFilterStartCoefficients.b[1]);
        }
        if (this.tonesAddedInThisTick)
          (this.attentuationProgress = 0),
            (this.flushedSamples = 0),
            (this.flushingDelayLines = !1);
        else if (this.flushingDelayLines) {
          (g = 0), (b = 0), (S = 0), (M = 0);
          let t = 0;
          p && (t += e.chorusDelayBufferSize),
            f && (t += this.echoDelayLineL.length),
            m && (t += h.reverbDelayBufferSize),
            (this.flushedSamples += i),
            this.flushedSamples >= t && (this.deactivateAfterThisTick = !0);
        } else {
          0 == this.attentuationProgress || (g = 0), (b = 0);
          const e = 1 / 256,
            t = -Math.log2(e);
          let i = 0;
          if ((p && (i += h.chorusMaxDelay), f)) {
            const e = Math.pow(w, 1 / k);
            i += (-1 / Math.log2(e)) * t;
          }
          if (m) {
            const e = 2 * x,
              s = h.reverbDelayBufferSize / 4 / r,
              n = Math.pow(e, 1 / s);
            i += (-1 / Math.log2(n)) * t;
          }
          const n = s / r / i,
            a = this.attentuationProgress + n;
          a >= 1 && (M = 0),
            (this.attentuationProgress = a),
            this.attentuationProgress >= 1 && (this.flushingDelayLines = !0);
        }
        (this.eqFilterVolume = g),
          (this.eqFilterVolumeDelta = (b - g) / i),
          (this.delayInputMult = S),
          (this.delayInputMultDelta = (M - S) / i);
      }
      updateWaves(e, t) {
        if (((this.volumeScale = 1), 0 == e.type))
          (this.wave = this.aliases
            ? h.rawChipWaves[e.chipWave].samples
            : h.chipWaves[e.chipWave].samples),
            (this.isUsingAdvancedLoopControls = e.isUsingAdvancedLoopControls),
            (this.chipWaveLoopStart = e.chipWaveLoopStart),
            (this.chipWaveLoopEnd = e.chipWaveLoopEnd),
            (this.chipWaveLoopMode = e.chipWaveLoopMode),
            (this.chipWavePlayBackwards = e.chipWavePlayBackwards),
            (this.chipWaveStartOffset = e.chipWaveStartOffset);
        else if (8 == e.type)
          (this.wave = this.aliases
            ? e.customChipWave
            : e.customChipWaveIntegral),
            (this.volumeScale = 0.05);
        else if (2 == e.type) this.wave = f(e.chipNoise, C, R);
        else if (5 == e.type)
          this.wave = this.harmonicsWave.getCustomWave(e.harmonicsWave, e.type);
        else if (7 == e.type)
          this.wave = this.harmonicsWave.getCustomWave(e.harmonicsWave, e.type);
        else if (3 == e.type)
          this.wave = this.spectrumWave.getCustomWave(e.spectrumWave, 8);
        else if (4 == e.type) {
          for (let t = 0; t < h.drumCount; t++)
            this.drumsetSpectrumWaves[t].getCustomWave(
              e.drumsetSpectrumWaves[t],
              ve.Y(t)
            );
          this.wave = null;
        } else this.wave = null;
      }
      getDrumsetWave(e) {
        if (4 == this.type) return this.drumsetSpectrumWaves[e].wave;
        throw new Error("Unhandled instrument type in getDrumsetWave");
      }
      static drumsetIndexReferenceDelta(e) {
        return ue.frequencyFromPitch(h.spectrumBasePitch + 6 * e) / 44100;
      }
      static Y(e) {
        return 15 + Math.log2(ve.drumsetIndexReferenceDelta(e));
      }
    }
    class ge {
      constructor() {
        (this.instruments = []),
          (this.muted = !1),
          (this.singleSeamlessInstrument = null);
      }
    }
    class be {
      syncSongState() {
        const e = this.song.getChannelCount();
        for (let t = this.channels.length; t < e; t++)
          this.channels[t] = new ge();
        this.channels.length = e;
        for (let t = 0; t < e; t++) {
          const e = this.song.channels[t],
            s = this.channels[t];
          for (let t = s.instruments.length; t < e.instruments.length; t++)
            s.instruments[t] = new ve();
          if (
            ((s.instruments.length = e.instruments.length),
            s.muted != e.muted && ((s.muted = e.muted), s.muted))
          )
            for (const e of s.instruments) e.resetAllEffects();
        }
      }
      warmUpSynthesizer(e) {
        if (null != e) {
          this.syncSongState();
          const t = this.getSamplesPerTick();
          for (let s = 0; s < e.getChannelCount(); s++)
            for (let i = 0; i < e.channels[s].instruments.length; i++) {
              const n = e.channels[s].instruments[i],
                a = this.channels[s].instruments[i];
              be.getInstrumentSynthFunction(n),
                (n.LFOtime = 0),
                (n.nextLFOtime = 0),
                (n.arpTime = 0),
                (n.tmpEqFilterStart = n.eqFilter),
                (n.tmpEqFilterEnd = null),
                (n.tmpNoteFilterStart = n.noteFilter),
                (n.tmpNoteFilterEnd = null),
                a.updateWaves(n, this.samplesPerSecond),
                a.allocateNecessaryBuffers(this, n, t);
            }
        }
        var t = new Float32Array(1);
        (this.isPlayingSong = !0),
          this.synthesize(t, t, 1, !0),
          (this.isPlayingSong = !1);
      }
      computeLatestModValues() {
        if (null != this.song && this.song.modChannelCount > 0) {
          let e = [],
            t = [];
          (this.modValues = []),
            (this.nextModValues = []),
            (this.modInsValues = []),
            (this.nextModInsValues = []);
          for (
            let e = 0;
            e < this.song.pitchChannelCount + this.song.noiseChannelCount;
            e++
          ) {
            (t[e] = []),
              (this.modInsValues[e] = []),
              (this.nextModInsValues[e] = []);
            for (let s = 0; s < this.song.channels[e].instruments.length; s++)
              (this.modInsValues[e][s] = []),
                (this.nextModInsValues[e][s] = []),
                (t[e][s] = []);
          }
          let s = this.beat * h.partsPerBeat + this.part;
          for (
            let i = this.song.pitchChannelCount + this.song.noiseChannelCount;
            i < this.song.getChannelCount();
            i++
          )
            if (!this.song.channels[i].muted) {
              let n;
              for (let a = this.bar; a >= 0; a--)
                if (((n = this.song.getPattern(i, a)), null != n)) {
                  let o = n.instruments[0],
                    r = this.song.channels[i].instruments[o],
                    l = [],
                    c = [],
                    u = a == this.bar ? s : this.findPartsInBar(a);
                  for (const e of n.notes)
                    if (
                      e.start < u &&
                      (null == l[h.modCount - 1 - e.pitches[0]] ||
                        e.end > l[h.modCount - 1 - e.pitches[0]])
                    )
                      if (e.end <= u)
                        (l[h.modCount - 1 - e.pitches[0]] = e.end),
                          (c[h.modCount - 1 - e.pitches[0]] =
                            e.pins[e.pins.length - 1].size);
                      else {
                        l[h.modCount - 1 - e.pitches[0]] = u;
                        for (let t = 0; t < e.pins.length; t++)
                          if (e.pins[t].time + e.start > u) {
                            const s = e.pins[t].time - e.pins[t - 1].time,
                              i = u - e.start - e.pins[t - 1].time,
                              n = e.pins[t].size - e.pins[t - 1].size;
                            (c[h.modCount - 1 - e.pitches[0]] = Math.round(
                              e.pins[t - 1].size + (n * i) / s
                            )),
                              (t = e.pins.length);
                          }
                      }
                  for (let s = 0; s < h.modCount; s++)
                    if (null != l[s])
                      if (h.modulators[r.modulators[s]].forSong)
                        (null == e[r.modulators[s]] ||
                          a * h.partsPerBeat * this.song.beatsPerBar + l[s] >
                            e[r.modulators[s]]) &&
                          (this.setModValue(
                            c[s],
                            c[s],
                            s,
                            r.modChannels[s],
                            r.modInstruments[s],
                            r.modulators[s]
                          ),
                          (e[r.modulators[s]] =
                            a * h.partsPerBeat * this.song.beatsPerBar + l[s]));
                      else {
                        let e = [];
                        if (
                          r.modInstruments[s] ==
                          this.song.channels[r.modChannels[s]].instruments
                            .length
                        )
                          for (
                            let t = 0;
                            t <
                            this.song.channels[r.modChannels[s]].instruments
                              .length;
                            t++
                          )
                            e.push(t);
                        else if (
                          r.modInstruments[s] >
                          this.song.channels[r.modChannels[s]].instruments
                            .length
                        ) {
                          const t = this.song.getPattern(r.modChannels[s], a);
                          null != t && (e = t.instruments);
                        } else e.push(r.modInstruments[s]);
                        for (let i = 0; i < e.length; i++) {
                          const n =
                              r.modulators[s] ==
                              h.modulators.dictionary["eq filter"].index,
                            o =
                              r.modulators[s] ==
                              h.modulators.dictionary["note filter"].index;
                          let u = r.modulators[s];
                          if (
                            (n
                              ? (u = h.modulators.length + r.modFilterTypes[s])
                              : o &&
                                (u =
                                  h.modulators.length +
                                  1 +
                                  2 * h.filterMaxPoints +
                                  r.modFilterTypes[s]),
                            null == t[r.modChannels[s]][e[i]][u] ||
                              a * h.partsPerBeat * this.song.beatsPerBar +
                                l[s] >
                                t[r.modChannels[s]][e[i]][u])
                          ) {
                            if (n) {
                              let t =
                                this.song.channels[r.modChannels[s]]
                                  .instruments[e[i]];
                              if (0 == r.modFilterTypes[s])
                                t.tmpEqFilterStart = t.eqSubFilters[c[s]];
                              else {
                                for (let e = 0; e < h.filterMorphCount; e++)
                                  t.tmpEqFilterStart == t.eqSubFilters[e] &&
                                    ((t.tmpEqFilterStart = new he()),
                                    t.tmpEqFilterStart.fromJsonObject(
                                      t.eqSubFilters[e].toJsonObject()
                                    ),
                                    (e = h.filterMorphCount));
                                Math.floor((r.modFilterTypes[s] - 1) / 2) <
                                  t.tmpEqFilterStart.controlPointCount &&
                                  (r.modFilterTypes[s] % 2
                                    ? (t.tmpEqFilterStart.controlPoints[
                                        Math.floor(
                                          (r.modFilterTypes[s] - 1) / 2
                                        )
                                      ].freq = c[s])
                                    : (t.tmpEqFilterStart.controlPoints[
                                        Math.floor(
                                          (r.modFilterTypes[s] - 1) / 2
                                        )
                                      ].gain = c[s]));
                              }
                              t.tmpEqFilterEnd = t.tmpEqFilterStart;
                            } else if (o) {
                              let t =
                                this.song.channels[r.modChannels[s]]
                                  .instruments[e[i]];
                              if (0 == r.modFilterTypes[s])
                                t.tmpNoteFilterStart = t.noteSubFilters[c[s]];
                              else {
                                for (let e = 0; e < h.filterMorphCount; e++)
                                  t.tmpNoteFilterStart == t.noteSubFilters[e] &&
                                    ((t.tmpNoteFilterStart = new he()),
                                    t.tmpNoteFilterStart.fromJsonObject(
                                      t.noteSubFilters[e].toJsonObject()
                                    ),
                                    (e = h.filterMorphCount));
                                Math.floor((r.modFilterTypes[s] - 1) / 2) <
                                  t.tmpNoteFilterStart.controlPointCount &&
                                  (r.modFilterTypes[s] % 2
                                    ? (t.tmpNoteFilterStart.controlPoints[
                                        Math.floor(
                                          (r.modFilterTypes[s] - 1) / 2
                                        )
                                      ].freq = c[s])
                                    : (t.tmpNoteFilterStart.controlPoints[
                                        Math.floor(
                                          (r.modFilterTypes[s] - 1) / 2
                                        )
                                      ].gain = c[s]));
                              }
                              t.tmpNoteFilterEnd = t.tmpNoteFilterStart;
                            } else
                              this.setModValue(
                                c[s],
                                c[s],
                                s,
                                r.modChannels[s],
                                e[i],
                                u
                              );
                            t[r.modChannels[s]][e[i]][u] =
                              a * h.partsPerBeat * this.song.beatsPerBar + l[s];
                          }
                        }
                      }
                }
            }
        }
      }
      determineInvalidModulators(e) {
        if (null != this.song)
          for (let t = 0; t < h.modCount; t++) {
            if (((e.invalidModulators[t] = !0), -1 == e.modChannels[t])) {
              0 != e.modulators[t] && (e.invalidModulators[t] = !1);
              continue;
            }
            const s = this.song.channels[e.modChannels[t]];
            if (null == s) continue;
            let i = [];
            i =
              e.modInstruments[t] >= s.instruments.length
                ? s.instruments
                : [s.instruments[e.modInstruments[t]]];
            for (let s = 0; s < i.length; s++) {
              const n = i[s];
              if (null == n) continue;
              const a = h.modulators[e.modulators[t]].name;
              (12 != h.modulators[e.modulators[t]].associatedEffect &&
                !(
                  n.effects &
                  (1 << h.modulators[e.modulators[t]].associatedEffect)
                )) ||
                (1 != n.type &&
                  10 != n.type &&
                  ("fm slider 1" == a ||
                    "fm slider 2" == a ||
                    "fm slider 3" == a ||
                    "fm slider 4" == a ||
                    "fm feedback" == a)) ||
                (10 != n.type && ("fm slider 5" == a || "fm slider 6" == a)) ||
                (6 != n.type && "pulse width" == a) ||
                (!n.getChord().arpeggiates &&
                  ("arp speed" == a || "reset arp" == a)) ||
                (n.eqFilterType && "eq filter" == a) ||
                (!n.eqFilterType &&
                  ("eq filt cut" == a || "eq filt peak" == a)) ||
                ("eq filter" == a &&
                  Math.floor((e.modFilterTypes[t] + 1) / 2) >
                    n.eqFilter.controlPointCount) ||
                (n.noteFilterType && "note filter" == a) ||
                (!n.noteFilterType &&
                  ("note filt cut" == a || "note filt peak" == a)) ||
                ("note filter" == a &&
                  Math.floor((e.modFilterTypes[t] + 1) / 2) >
                    n.noteFilter.controlPointCount) ||
                ((e.invalidModulators[t] = !1), (s = i.length));
            }
          }
      }
      static operatorAmplitudeCurve(e) {
        return (Math.pow(16, e / 15) - 1) / 15;
      }
      get playing() {
        return this.isPlayingSong;
      }
      get recording() {
        return this.isRecording;
      }
      get playhead() {
        return this.playheadInternal;
      }
      set playhead(e) {
        if (null != this.song) {
          this.playheadInternal = Math.max(0, Math.min(this.song.barCount, e));
          let t = this.playheadInternal;
          (this.bar = Math.floor(t)),
            (t = this.song.beatsPerBar * (t - this.bar)),
            (this.beat = Math.floor(t)),
            (t = h.partsPerBeat * (t - this.beat)),
            (this.part = Math.floor(t)),
            (t = h.ticksPerPart * (t - this.part)),
            (this.tick = Math.floor(t)),
            (this.tickSampleCountdown = 0),
            (this.isAtStartOfTick = !0),
            (this.prevBar = null);
        }
      }
      getSamplesPerBar() {
        if (null == this.song) throw new Error();
        return (
          this.getSamplesPerTick() *
          h.ticksPerPart *
          h.partsPerBeat *
          this.song.beatsPerBar
        );
      }
      getTicksIntoBar() {
        return (
          (this.beat * h.partsPerBeat + this.part) * h.ticksPerPart + this.tick
        );
      }
      getCurrentPart() {
        return this.beat * h.partsPerBeat + this.part;
      }
      findPartsInBar(e) {
        if (null == this.song) return 0;
        let t = h.partsPerBeat * this.song.beatsPerBar;
        for (
          let s = this.song.pitchChannelCount + this.song.noiseChannelCount;
          s < this.song.getChannelCount();
          s++
        ) {
          let i = this.song.getPattern(s, e);
          if (null != i) {
            let e = this.song.channels[s].instruments[i.instruments[0]];
            for (let s = 0; s < h.modCount; s++)
              if (e.modulators[s] == h.modulators.dictionary["next bar"].index)
                for (const e of i.notes)
                  e.pitches[0] == h.modCount - 1 - s &&
                    t > e.start &&
                    (t = e.start);
          }
        }
        return t;
      }
      getTotalSamples(e, t, s) {
        if (null == this.song) return -1;
        let i = e ? 0 : this.song.loopStart,
          n = t
            ? this.song.barCount
            : this.song.loopStart + this.song.loopLength,
          a = !1,
          o = !1,
          r = this.song.tempo;
        for (
          let e = this.song.pitchChannelCount + this.song.noiseChannelCount;
          e < this.song.getChannelCount();
          e++
        )
          for (let t = i; t < n; t++) {
            let s = this.song.getPattern(e, t);
            if (null != s) {
              let t = this.song.channels[e].instruments[s.instruments[0]];
              for (let e = 0; e < h.modCount; e++)
                t.modulators[e] == h.modulators.dictionary.tempo.index &&
                  (a = !0),
                  t.modulators[e] ==
                    h.modulators.dictionary["next bar"].index && (o = !0);
            }
          }
        if (i > 0) {
          let e = null,
            t = 0;
          for (let s = i - 1; s >= 0; s--) {
            for (
              let i = this.song.pitchChannelCount + this.song.noiseChannelCount;
              i < this.song.getChannelCount();
              i++
            ) {
              let n = this.song.getPattern(i, s);
              if (null != n) {
                let a = n.instruments[0],
                  o = this.song.channels[i].instruments[a],
                  r = this.findPartsInBar(s);
                for (const s of n.notes)
                  if (
                    o.modulators[h.modCount - 1 - s.pitches[0]] ==
                      h.modulators.dictionary.tempo.index &&
                    s.start < r &&
                    (null == e || s.end > e)
                  )
                    if (s.end <= r)
                      (e = s.end), (t = s.pins[s.pins.length - 1].size);
                    else {
                      e = r;
                      for (let e = 0; e < s.pins.length; e++)
                        if (s.pins[e].time + s.start > r) {
                          const i = s.pins[e].time - s.pins[e - 1].time,
                            n = r - s.start - s.pins[e - 1].time,
                            a = s.pins[e].size - s.pins[e - 1].size;
                          (t = Math.round(s.pins[e - 1].size + (a * n) / i)),
                            (e = s.pins.length);
                        }
                    }
              }
            }
            null != e &&
              ((r = t + h.modulators.dictionary.tempo.convertRealFactor),
              (s = -1));
          }
        }
        if (a || o) {
          let e = i,
            t = !1,
            l = 0;
          for (; !t; ) {
            let i = h.partsPerBeat * this.song.beatsPerBar,
              c = 0;
            if ((o && (i = this.findPartsInBar(e)), a)) {
              let t = !1;
              for (
                let s =
                  this.song.pitchChannelCount + this.song.noiseChannelCount;
                s < this.song.getChannelCount();
                s++
              )
                if (0 == t) {
                  let n = this.song.getPattern(s, e);
                  if (null != n) {
                    let e = this.song.channels[s].instruments[n.instruments[0]];
                    for (let s = 0; s < h.modCount; s++)
                      if (
                        0 == t &&
                        e.modulators[s] ==
                          h.modulators.dictionary.tempo.index &&
                        n.notes.find((e) => e.pitches[0] == h.modCount - 1 - s)
                      ) {
                        (t = !0),
                          n.notes.sort(function (e, t) {
                            return e.start == t.start
                              ? e.pitches[0] - t.pitches[0]
                              : e.start - t.start;
                          });
                        for (const e of n.notes)
                          if (
                            e.pitches[0] == h.modCount - 1 - s &&
                            ((l +=
                              Math.min(i - c, e.start - c) *
                              h.ticksPerPart *
                              this.getSamplesPerTickSpecificBPM(r)),
                            e.start < i)
                          )
                            for (let t = 1; t < e.pins.length; t++) {
                              if (e.pins[t - 1].time + e.start <= i) {
                                const s =
                                    h.ticksPerPart *
                                    Math.min(
                                      i - (e.start + e.pins[t - 1].time),
                                      e.pins[t].time - e.pins[t - 1].time
                                    ),
                                  n =
                                    e.pins[t - 1].size +
                                    h.modulators.dictionary.tempo
                                      .convertRealFactor;
                                let a =
                                  e.pins[t].size +
                                  h.modulators.dictionary.tempo
                                    .convertRealFactor;
                                e.pins[t].time + e.start > i &&
                                  (a =
                                    e.pins[t - 1].size +
                                    ((e.pins[t].size - e.pins[t - 1].size) *
                                      (i - (e.start + e.pins[t - 1].time))) /
                                      (e.pins[t].time - e.pins[t - 1].time) +
                                    h.modulators.dictionary.tempo
                                      .convertRealFactor);
                                let o = (h.partsPerBeat * h.ticksPerPart) / 60;
                                (l +=
                                  a != n
                                    ? (-this.samplesPerSecond *
                                        s *
                                        (Math.log(o * a * s) -
                                          Math.log(o * n * s))) /
                                      (o * (n - a))
                                    : s * this.getSamplesPerTickSpecificBPM(a)),
                                  (r = a);
                              }
                              c = Math.min(e.start + e.pins[t].time, i);
                            }
                      }
                  }
                }
            }
            (l +=
              (i - c) * h.ticksPerPart * this.getSamplesPerTickSpecificBPM(r)),
              e++,
              0 != s &&
                e == this.song.loopStart + this.song.loopLength &&
                ((e = this.song.loopStart), s > 0 && s--),
              e >= n && (t = !0);
          }
          return Math.ceil(l);
        }
        return this.getSamplesPerBar() * this.getTotalBars(e, t, s);
      }
      getTotalBars(e, t, s = this.loopRepeatCount) {
        if (null == this.song) throw new Error();
        let i = this.song.loopLength * (s + 1);
        return (
          e && (i += this.song.loopStart),
          t &&
            (i +=
              this.song.barCount -
              (this.song.loopStart + this.song.loopLength)),
          i
        );
      }
      constructor(e = null) {
        (this.samplesPerSecond = 44100),
          (this.song = null),
          (this.preferLowerLatency = !1),
          (this.anticipatePoorPerformance = !1),
          (this.liveInputDuration = 0),
          (this.liveInputStarted = !1),
          (this.liveInputPitches = []),
          (this.liveInputChannel = 0),
          (this.liveInputInstruments = []),
          (this.loopRepeatCount = -1),
          (this.volume = 1),
          (this.oscRefreshEventTimer = 0),
          (this.oscEnabled = !0),
          (this.enableMetronome = !1),
          (this.countInMetronome = !1),
          (this.renderingSong = !1),
          (this.wantToSkip = !1),
          (this.playheadInternal = 0),
          (this.bar = 0),
          (this.prevBar = null),
          (this.nextBar = null),
          (this.beat = 0),
          (this.part = 0),
          (this.tick = 0),
          (this.isAtStartOfTick = !0),
          (this.isAtEndOfTick = !0),
          (this.tickSampleCountdown = 0),
          (this.modValues = []),
          (this.modInsValues = []),
          (this.nextModValues = []),
          (this.nextModInsValues = []),
          (this.isPlayingSong = !1),
          (this.isRecording = !1),
          (this.liveInputEndTime = 0),
          (this.browserAutomaticallyClearsAudioBuffer = !0),
          (this.tempDrumSetControlPoint = new le()),
          (this.tempFrequencyResponse = new L()),
          (this.channels = []),
          (this.tonePool = new E()),
          (this.tempMatchedPitchTones = Array(h.maxChordSize).fill(null)),
          (this.startedMetronome = !1),
          (this.metronomeSamplesRemaining = -1),
          (this.metronomeAmplitude = 0),
          (this.metronomePrevAmplitude = 0),
          (this.metronomeFilter = 0),
          (this.limit = 0),
          (this.tempMonoInstrumentSampleBuffer = null),
          (this.audioCtx = null),
          (this.scriptNode = null),
          (this.audioProcessCallback = (e) => {
            const t = e.outputBuffer,
              s = t.getChannelData(0),
              i = t.getChannelData(1);
            if (
              (!this.browserAutomaticallyClearsAudioBuffer ||
                (0 == s[0] &&
                  0 == i[0] &&
                  0 == s[t.length - 1] &&
                  0 == i[t.length - 1]) ||
                (this.browserAutomaticallyClearsAudioBuffer = !1),
              !this.browserAutomaticallyClearsAudioBuffer)
            ) {
              const e = t.length;
              for (let t = 0; t < e; t++) (s[t] = 0), (i[t] = 0);
            }
            !this.isPlayingSong && performance.now() >= this.liveInputEndTime
              ? this.deactivateAudio()
              : (this.synthesize(s, i, t.length, this.isPlayingSong),
                this.oscEnabled &&
                  (this.oscRefreshEventTimer <= 0
                    ? (A.raise("oscillascopeUpdate", s, i),
                      (this.oscRefreshEventTimer = 2))
                    : this.oscRefreshEventTimer--));
          }),
          this.computeDelayBufferSizes(),
          null != e && this.setSong(e);
      }
      setSong(e) {
        "string" == typeof e
          ? (this.song = new fe(e))
          : e instanceof fe && (this.song = e),
          (this.prevBar = null);
      }
      computeDelayBufferSizes() {
        (this.panningDelayBufferSize = be.fittingPowerOfTwo(
          this.samplesPerSecond * h.panDelaySecondsMax
        )),
          (this.panningDelayBufferMask = this.panningDelayBufferSize - 1),
          (this.chorusDelayBufferSize = be.fittingPowerOfTwo(
            this.samplesPerSecond * h.chorusMaxDelay
          )),
          (this.chorusDelayBufferMask = this.chorusDelayBufferSize - 1);
      }
      activateAudio() {
        const e = this.anticipatePoorPerformance
          ? this.preferLowerLatency
            ? 2048
            : 4096
          : this.preferLowerLatency
          ? 512
          : 2048;
        if (
          null == this.audioCtx ||
          null == this.scriptNode ||
          this.scriptNode.bufferSize != e
        ) {
          null != this.scriptNode && this.deactivateAudio();
          const t = this.anticipatePoorPerformance
            ? this.preferLowerLatency
              ? "balanced"
              : "playback"
            : this.preferLowerLatency
            ? "interactive"
            : "balanced";
          (this.audioCtx =
            this.audioCtx ||
            new (window.AudioContext || window.webkitAudioContext)({
              latencyHint: t,
            })),
            (this.samplesPerSecond = this.audioCtx.sampleRate),
            (this.scriptNode = this.audioCtx.createScriptProcessor
              ? this.audioCtx.createScriptProcessor(e, 0, 2)
              : this.audioCtx.createJavaScriptNode(e, 0, 2)),
            (this.scriptNode.onaudioprocess = this.audioProcessCallback),
            (this.scriptNode.channelCountMode = "explicit"),
            (this.scriptNode.channelInterpretation = "speakers"),
            this.scriptNode.connect(this.audioCtx.destination),
            this.computeDelayBufferSizes();
        }
        this.audioCtx.resume();
      }
      deactivateAudio() {
        null != this.audioCtx &&
          null != this.scriptNode &&
          (this.scriptNode.disconnect(this.audioCtx.destination),
          (this.scriptNode = null),
          this.audioCtx.close && this.audioCtx.close(),
          (this.audioCtx = null));
      }
      maintainLiveInput() {
        this.activateAudio(), (this.liveInputEndTime = performance.now() + 1e4);
      }
      play() {
        this.isPlayingSong ||
          (this.computeLatestModValues(),
          this.warmUpSynthesizer(this.song),
          (this.isPlayingSong = !0),
          this.activateAudio());
      }
      pause() {
        if (
          this.isPlayingSong &&
          ((this.isPlayingSong = !1),
          (this.isRecording = !1),
          (this.modValues = []),
          (this.nextModValues = []),
          null != this.song)
        ) {
          (this.song.inVolumeCap = 0), (this.song.outVolumeCap = 0);
          for (
            let e = 0;
            e < this.song.pitchChannelCount + this.song.noiseChannelCount;
            e++
          )
            (this.modInsValues[e] = []), (this.nextModInsValues[e] = []);
        }
      }
      startRecording() {
        (this.preferLowerLatency = !0), (this.isRecording = !0), this.play();
      }
      resetEffects() {
        if (((this.limit = 0), this.freeAllTones(), null != this.song))
          for (const e of this.channels)
            for (const t of e.instruments) t.resetAllEffects();
      }
      setModValue(e, t, s, i, n, a) {
        let o = e + h.modulators[a].convertRealFactor,
          r = t + h.modulators[a].convertRealFactor;
        return (
          h.modulators[a].forSong
            ? (null != this.modValues[a] &&
                this.modValues[a] == o &&
                this.nextModValues[a] == r) ||
              ((this.modValues[a] = o), (this.nextModValues[a] = r))
            : (null != this.modInsValues[i][n][a] &&
                this.modInsValues[i][n][a] == o &&
                this.nextModInsValues[i][n][a] == r) ||
              ((this.modInsValues[i][n][a] = o),
              (this.nextModInsValues[i][n][a] = r)),
          o
        );
      }
      getModValue(e, t, s, i) {
        if (h.modulators[e].forSong) {
          if (null != this.modValues[e] && null != this.nextModValues[e])
            return i ? this.nextModValues[e] : this.modValues[e];
        } else if (
          null != t &&
          null != s &&
          null != this.modInsValues[t][s][e] &&
          null != this.nextModInsValues[t][s][e]
        )
          return i
            ? this.nextModInsValues[t][s][e]
            : this.modInsValues[t][s][e];
        return -1;
      }
      isAnyModActive(e, t) {
        for (let s = 0; s < h.modulators.length; s++)
          if (
            (null != this.modValues && null != this.modValues[s]) ||
            (null != this.modInsValues &&
              null != this.modInsValues[e] &&
              null != this.modInsValues[e][t] &&
              null != this.modInsValues[e][t][s])
          )
            return !0;
        return !1;
      }
      unsetMod(e, t, s) {
        (this.isModActive(e) ||
          (null != t && null != s && this.isModActive(e, t, s))) &&
          ((this.modValues[e] = null),
          (this.nextModValues[e] = null),
          null != t &&
            null != s &&
            ((this.modInsValues[t][s][e] = null),
            (this.nextModInsValues[t][s][e] = null)));
      }
      isFilterModActive(e, t, s) {
        const i = this.song.channels[t].instruments[s];
        if (e) {
          if (i.noteFilterType) return !1;
          if (null != i.tmpNoteFilterEnd) return !0;
        } else {
          if (i.eqFilterType) return !1;
          if (null != i.tmpEqFilterEnd) return !0;
        }
        return !1;
      }
      isModActive(e, t, s) {
        return h.modulators[e].forSong
          ? null != this.modValues && null != this.modValues[e]
          : null != t &&
              null != s &&
              null != this.modInsValues &&
              null != this.modInsValues[t] &&
              null != this.modInsValues[t][s] &&
              null != this.modInsValues[t][s][e];
      }
      snapToStart() {
        (this.bar = 0), this.resetEffects(), this.snapToBar();
      }
      goToBar(e) {
        (this.bar = e), this.resetEffects(), (this.playheadInternal = this.bar);
      }
      snapToBar() {
        (this.playheadInternal = this.bar),
          (this.beat = 0),
          (this.part = 0),
          (this.tick = 0),
          (this.tickSampleCountdown = 0);
      }
      jumpIntoLoop() {
        if (
          this.song &&
          (this.bar < this.song.loopStart ||
            this.bar >= this.song.loopStart + this.song.loopLength)
        ) {
          const e = this.bar;
          (this.bar = this.song.loopStart),
            (this.playheadInternal += this.bar - e),
            this.playing && this.computeLatestModValues();
        }
      }
      goToNextBar() {
        if (!this.song) return;
        this.prevBar = this.bar;
        const e = this.bar;
        this.bar++,
          this.bar >= this.song.barCount && (this.bar = 0),
          (this.playheadInternal += this.bar - e),
          this.playing && this.computeLatestModValues();
      }
      goToPrevBar() {
        if (!this.song) return;
        this.prevBar = null;
        const e = this.bar;
        this.bar--,
          (this.bar < 0 || this.bar >= this.song.barCount) &&
            (this.bar = this.song.barCount - 1),
          (this.playheadInternal += this.bar - e),
          this.playing && this.computeLatestModValues();
      }
      getNextBar() {
        let e = this.bar + 1;
        return (
          this.isRecording
            ? e >= this.song.barCount && (e = this.song.barCount - 1)
            : 0 != this.loopRepeatCount &&
              e == this.song.loopStart + this.song.loopLength &&
              (e = this.song.loopStart),
          e
        );
      }
      skipBar() {
        if (!this.song) return;
        const e = this.getSamplesPerTick();
        this.bar++,
          (this.beat = 0),
          (this.part = 0),
          (this.tick = 0),
          (this.tickSampleCountdown = e),
          (this.isAtStartOfTick = !0),
          0 != this.loopRepeatCount &&
            this.bar == this.song.loopStart + this.song.loopLength &&
            ((this.bar = this.song.loopStart),
            this.loopRepeatCount > 0 && this.loopRepeatCount--);
      }
      synthesize(e, t, s, i = !0) {
        if (null == this.song) {
          for (let i = 0; i < s; i++) (e[i] = 0), (t[i] = 0);
          return void this.deactivateAudio();
        }
        const n = this.song;
        (this.song.inVolumeCap = 0), (this.song.outVolumeCap = 0);
        let a = this.getSamplesPerTick(),
          o = !1;
        (this.tickSampleCountdown <= 0 || this.tickSampleCountdown > a) &&
          ((this.tickSampleCountdown = a), (this.isAtStartOfTick = !0)),
          i &&
            (this.beat >= n.beatsPerBar &&
              ((this.beat = 0),
              (this.part = 0),
              (this.tick = 0),
              (this.tickSampleCountdown = a),
              (this.isAtStartOfTick = !0),
              (this.prevBar = this.bar),
              (this.bar = this.getNextBar()),
              this.bar <= this.prevBar &&
                this.loopRepeatCount > 0 &&
                this.loopRepeatCount--),
            this.bar >= n.barCount &&
              ((this.bar = 0),
              -1 != this.loopRepeatCount && ((o = !0), this.pause()))),
          this.syncSongState(),
          (null == this.tempMonoInstrumentSampleBuffer ||
            this.tempMonoInstrumentSampleBuffer.length < s) &&
            (this.tempMonoInstrumentSampleBuffer = new Float32Array(s));
        const r = +this.volume,
          l = 1 - Math.pow(0.5, 4 / this.samplesPerSecond),
          c = 1 - Math.pow(0.5, 4e3 / this.samplesPerSecond);
        let u = +this.limit,
          p = [],
          f = -1,
          m = 0;
        for (; m < s && !o; ) {
          (this.nextBar = this.getNextBar()),
            this.nextBar >= n.barCount && (this.nextBar = null);
          const d = s - m,
            y = Math.ceil(this.tickSampleCountdown),
            v = Math.min(y, d),
            g = m + v;
          if (this.isPlayingSong || this.renderingSong)
            for (
              let e = n.pitchChannelCount + n.noiseChannelCount;
              e < n.getChannelCount();
              e++
            ) {
              const t = n.channels[e],
                s = this.channels[e];
              this.determineCurrentActiveTones(n, e, a, i);
              for (let i = 0; i < t.instruments.length; i++) {
                const t = s.instruments[i];
                for (let s = 0; s < t.activeModTones.count(); s++) {
                  const i = t.activeModTones.get(s);
                  this.playModTone(n, e, a, m, v, i, !1, !1);
                }
              }
            }
          if (this.wantToSkip) {
            let e = p.includes(this.bar);
            if (e && m == f) return;
            -1 == f && (f = m),
              e || p.push(this.bar),
              (this.wantToSkip = !1),
              this.skipBar();
          } else {
            for (
              let s = 0;
              s < n.pitchChannelCount + n.noiseChannelCount;
              s++
            ) {
              const o = n.channels[s],
                r = this.channels[s];
              this.isAtStartOfTick &&
                (this.determineCurrentActiveTones(
                  n,
                  s,
                  a,
                  i && !this.countInMetronome
                ),
                this.determineLiveInputTones(n, s, a));
              for (let i = 0; i < o.instruments.length; i++) {
                const l = o.instruments[i],
                  c = r.instruments[i];
                if (this.isAtStartOfTick) {
                  let e = c.activeTones.count() + c.liveInputTones.count();
                  for (let t = 0; t < c.releasedTones.count(); t++) {
                    const i = c.releasedTones.get(t);
                    if (i.ticksSinceReleased >= Math.abs(l.getFadeOutTicks())) {
                      this.freeReleasedTone(c, t), t--;
                      continue;
                    }
                    const o = e >= h.maximumTonesPerChannel;
                    this.computeTone(n, s, a, i, !0, o), e++;
                  }
                  c.awake &&
                    (c.computed ||
                      c.compute(this, l, a, Math.ceil(a), null, s, i),
                    (c.computed = !1));
                }
                for (let e = 0; e < c.activeTones.count(); e++) {
                  const t = c.activeTones.get(e);
                  this.playTone(s, m, v, t);
                }
                for (let e = 0; e < c.liveInputTones.count(); e++) {
                  const t = c.liveInputTones.get(e);
                  this.playTone(s, m, v, t);
                }
                for (let e = 0; e < c.releasedTones.count(); e++) {
                  const t = c.releasedTones.get(e);
                  this.playTone(s, m, v, t);
                }
                c.awake && be.effectsSynth(this, e, t, m, v, c);
                const u = this.tickSampleCountdown,
                  p = 1 - u / a,
                  f = 1 - (u - v) / a,
                  d =
                    (this.beat * h.partsPerBeat + this.part) * h.ticksPerPart +
                    this.tick,
                  y = d / h.ticksPerPart,
                  g = (d + 1) / h.ticksPerPart,
                  b = y + (g - y) * p,
                  S = y + (g - y) * f;
                let M = l.vibratoSpeed;
                (l.LFOtime = l.nextLFOtime),
                  this.isModActive(
                    h.modulators.dictionary["vibrato speed"].index,
                    s,
                    i
                  ) &&
                    (M = this.getModValue(
                      h.modulators.dictionary["vibrato speed"].index,
                      s,
                      i
                    )),
                  0 == M
                    ? ((l.LFOtime = 0), (l.nextLFOtime = 0))
                    : (l.nextLFOtime += 0.1 * M * (S - b));
              }
            }
            if (this.enableMetronome || this.countInMetronome)
              if (0 == this.part) {
                if (!this.startedMetronome) {
                  const e =
                      n.beatsPerBar > 4 &&
                      n.beatsPerBar % 2 == 0 &&
                      this.beat == n.beatsPerBar / 2,
                    t = 0 == this.beat ? 8 : e ? 6 : 4,
                    s = 0 == this.beat ? 1600 : e ? 1200 : 800,
                    i = 0 == this.beat ? 0.06 : e ? 0.05 : 0.04,
                    a = this.samplesPerSecond / s,
                    o = (2 * Math.PI) / a;
                  (this.metronomeSamplesRemaining = Math.floor(a * t)),
                    (this.metronomeFilter = 2 * Math.cos(o)),
                    (this.metronomeAmplitude = i * Math.sin(o)),
                    (this.metronomePrevAmplitude = 0),
                    (this.startedMetronome = !0);
                }
                if (this.metronomeSamplesRemaining > 0) {
                  const s = Math.min(g, m + this.metronomeSamplesRemaining);
                  this.metronomeSamplesRemaining -= s - m;
                  for (let i = m; i < s; i++) {
                    (e[i] += this.metronomeAmplitude),
                      (t[i] += this.metronomeAmplitude);
                    const s =
                      this.metronomeFilter * this.metronomeAmplitude -
                      this.metronomePrevAmplitude;
                    (this.metronomePrevAmplitude = this.metronomeAmplitude),
                      (this.metronomeAmplitude = s);
                  }
                }
              } else this.startedMetronome = !1;
            for (let s = m; s < g; s++) {
              const i = e[s] * n.masterGain * n.masterGain,
                a = t[s] * n.masterGain * n.masterGain,
                o = i < 0 ? -i : i,
                h = a < 0 ? -a : a,
                p = o > h ? o : h;
              this.song.inVolumeCap =
                this.song.inVolumeCap > p ? this.song.inVolumeCap : p;
              const f = +(p > n.compressionThreshold) + +(p > n.limitThreshold),
                m =
                  +(0 == f) *
                    ((0.8 * (p + 1 - n.compressionThreshold) + 0.25) *
                      n.compressionRatio +
                      1.05 * (1 - n.compressionRatio)) +
                  1.05 * +(1 == f) +
                  +(2 == f) *
                    (1.05 *
                      ((p + 1 - n.limitThreshold) * n.limitRatio +
                        (1 - n.limitThreshold)));
              u += (m - u) * (u < m ? c : l);
              const d = r / (u >= 1 ? 1.05 * u : 0.8 * u + 0.25);
              (e[s] = i * d),
                (t[s] = a * d),
                (this.song.outVolumeCap =
                  this.song.outVolumeCap > p * d
                    ? this.song.outVolumeCap
                    : p * d);
            }
            if (
              ((m += v),
              (this.isAtStartOfTick = !1),
              (this.tickSampleCountdown -= v),
              this.tickSampleCountdown <= 0)
            ) {
              this.isAtStartOfTick = !0;
              for (const e of this.channels)
                for (const t of e.instruments) {
                  for (let e = 0; e < t.releasedTones.count(); e++) {
                    const s = t.releasedTones.get(e);
                    s.isOnLastTick
                      ? (this.freeReleasedTone(t, e), e--)
                      : s.ticksSinceReleased++;
                  }
                  t.deactivateAfterThisTick && t.deactivate(),
                    (t.tonesAddedInThisTick = !1);
                }
              for (
                let e = 0;
                e < this.song.pitchChannelCount + this.song.noiseChannelCount;
                e++
              )
                for (
                  let t = 0;
                  t < this.song.channels[e].instruments.length;
                  t++
                ) {
                  let s = this.song.channels[e].instruments[t],
                    i = s.arpeggioSpeed;
                  this.isModActive(
                    h.modulators.dictionary["arp speed"].index,
                    e,
                    t
                  )
                    ? ((i = this.getModValue(
                        h.modulators.dictionary["arp speed"].index,
                        e,
                        t,
                        !1
                      )),
                      Number.isInteger(i)
                        ? (s.arpTime += h.arpSpeedScale[i])
                        : (s.arpTime +=
                            (1 - (i % 1)) * h.arpSpeedScale[Math.floor(i)] +
                            (i % 1) * h.arpSpeedScale[Math.ceil(i)]))
                    : (s.arpTime += h.arpSpeedScale[i]);
                }
              for (
                let e = 0;
                e < this.song.pitchChannelCount + this.song.noiseChannelCount;
                e++
              )
                for (
                  let t = 0;
                  t < this.song.channels[e].instruments.length;
                  t++
                ) {
                  let s = this.song.channels[e].instruments[t];
                  null != s.tmpEqFilterEnd
                    ? (s.tmpEqFilterStart = s.tmpEqFilterEnd)
                    : (s.tmpEqFilterStart = s.eqFilter),
                    null != s.tmpNoteFilterEnd
                      ? (s.tmpNoteFilterStart = s.tmpNoteFilterEnd)
                      : (s.tmpNoteFilterStart = s.noteFilter);
                }
              this.tick++,
                (this.tickSampleCountdown += a),
                this.tick == h.ticksPerPart &&
                  ((this.tick = 0),
                  this.part++,
                  this.liveInputDuration--,
                  this.part == h.partsPerBeat &&
                    ((this.part = 0),
                    i &&
                      (this.beat++,
                      this.beat == n.beatsPerBar &&
                        ((this.beat = 0),
                        this.countInMetronome
                          ? (this.countInMetronome = !1)
                          : ((this.prevBar = this.bar),
                            (this.bar = this.getNextBar()),
                            this.bar <= this.prevBar &&
                              this.loopRepeatCount > 0 &&
                              this.loopRepeatCount--,
                            this.bar >= n.barCount &&
                              ((this.bar = 0),
                              -1 != this.loopRepeatCount &&
                                ((o = !0),
                                this.resetEffects(),
                                this.pause())))))));
            }
            for (let e = 0; e < h.modulators.length; e++)
              null != this.nextModValues &&
                null != this.nextModValues[e] &&
                (this.modValues[e] = this.nextModValues[e]);
            this.isModActive(h.modulators.dictionary.tempo.index) &&
              ((a = this.getSamplesPerTick()),
              (this.tickSampleCountdown = Math.min(
                this.tickSampleCountdown,
                a
              )));
            for (let e = 0; e < this.song.pitchChannelCount; e++)
              for (let t of this.song.channels[e].instruments)
                (t.nextLFOtime =
                  t.nextLFOtime %
                  (h.vibratoTypes[t.vibratoType].period /
                    ((h.ticksPerPart * a) / this.samplesPerSecond))),
                  (t.arpTime = t.arpTime % (2520 * h.ticksPerArpeggio));
            for (let e = 0; e < h.modulators.length; e++)
              for (
                let t = 0;
                t < this.song.pitchChannelCount + this.song.noiseChannelCount;
                t++
              )
                for (
                  let s = 0;
                  s < this.song.getMaxInstrumentsPerChannel();
                  s++
                )
                  null != this.nextModInsValues &&
                    null != this.nextModInsValues[t] &&
                    null != this.nextModInsValues[t][s] &&
                    null != this.nextModInsValues[t][s][e] &&
                    (this.modInsValues[t][s][e] =
                      this.nextModInsValues[t][s][e]);
          }
        }
        (!Number.isFinite(u) || Math.abs(u) < G) && (u = 0),
          (this.limit = u),
          i &&
            !this.countInMetronome &&
            (this.playheadInternal =
              (((this.tick + 1 - this.tickSampleCountdown / a) / 2 +
                this.part) /
                h.partsPerBeat +
                this.beat) /
                n.beatsPerBar +
              this.bar);
      }
      freeTone(e) {
        this.tonePool.pushBack(e);
      }
      newTone() {
        if (this.tonePool.count() > 0) {
          const e = this.tonePool.popBack();
          return (e.freshlyAllocated = !0), e;
        }
        return new ye();
      }
      releaseTone(e, t) {
        e.releasedTones.pushFront(t),
          (t.atNoteStart = !1),
          (t.passedEndOfNote = !0);
      }
      freeReleasedTone(e, t) {
        this.freeTone(e.releasedTones.get(t)), e.releasedTones.remove(t);
      }
      freeAllTones() {
        for (const e of this.channels)
          for (const t of e.instruments) {
            for (; t.activeTones.count() > 0; )
              this.freeTone(t.activeTones.popBack());
            for (; t.activeModTones.count() > 0; )
              this.freeTone(t.activeModTones.popBack());
            for (; t.releasedTones.count() > 0; )
              this.freeTone(t.releasedTones.popBack());
            for (; t.liveInputTones.count() > 0; )
              this.freeTone(t.liveInputTones.popBack());
          }
      }
      determineLiveInputTones(e, t, s) {
        const i = e.channels[t],
          n = this.channels[t],
          a = this.liveInputPitches;
        for (let o = 0; o < i.instruments.length; o++) {
          const r = n.instruments[o],
            l = r.liveInputTones;
          let h = 0;
          if (
            this.liveInputDuration > 0 &&
            t == this.liveInputChannel &&
            a.length > 0 &&
            -1 != this.liveInputInstruments.indexOf(o)
          ) {
            const n = i.instruments[o];
            if (n.getChord().singleTone) {
              let i;
              l.count() <= h
                ? ((i = this.newTone()), l.pushBack(i))
                : !n.getTransition().isSeamless && this.liveInputStarted
                ? (this.releaseTone(r, l.get(h)),
                  (i = this.newTone()),
                  l.set(h, i))
                : (i = l.get(h)),
                h++;
              for (let e = 0; e < a.length; e++) i.pitches[e] = a[e];
              (i.pitchCount = a.length),
                (i.chordSize = 1),
                (i.instrumentIndex = o),
                (i.note = i.prevNote = i.nextNote = null),
                (i.atNoteStart = this.liveInputStarted),
                (i.forceContinueAtStart = !1),
                (i.forceContinueAtEnd = !1),
                this.computeTone(e, t, s, i, !1, !1);
            } else {
              this.moveTonesIntoOrderedTempMatchedList(l, a);
              for (let i = 0; i < a.length; i++) {
                let n;
                null != this.tempMatchedPitchTones[h]
                  ? ((n = this.tempMatchedPitchTones[h]),
                    (this.tempMatchedPitchTones[h] = null),
                    (1 == n.pitchCount && n.pitches[0] == a[i]) ||
                      (this.releaseTone(r, n), (n = this.newTone())),
                    l.pushBack(n))
                  : ((n = this.newTone()), l.pushBack(n)),
                  h++,
                  (n.pitches[0] = a[i]),
                  (n.pitchCount = 1),
                  (n.chordSize = a.length),
                  (n.instrumentIndex = o),
                  (n.note = n.prevNote = n.nextNote = null),
                  (n.atNoteStart = this.liveInputStarted),
                  (n.forceContinueAtStart = !1),
                  (n.forceContinueAtEnd = !1),
                  this.computeTone(e, t, s, n, !1, !1);
              }
            }
          }
          for (; l.count() > h; ) this.releaseTone(r, l.popBack());
          this.clearTempMatchedPitchTones(h, r);
        }
        this.liveInputStarted = !1;
      }
      adjacentPatternHasCompatibleInstrumentTransition(
        e,
        t,
        s,
        i,
        n,
        a,
        o,
        r,
        l,
        h
      ) {
        if (e.patternInstruments && -1 == i.instruments.indexOf(n)) {
          if (s.instruments.length > 1 || i.instruments.length > 1) return null;
          const e = t.instruments[i.instruments[0]];
          if (h) return e.getChord();
          const n = e.getTransition();
          return a.includeAdjacentPatterns &&
            n.includeAdjacentPatterns &&
            n.slides == a.slides
            ? e.getChord()
            : null;
        }
        return h || a.includeAdjacentPatterns ? o : null;
      }
      static adjacentNotesHaveMatchingPitches(e, t) {
        if (e.pitches.length != t.pitches.length) return !1;
        const s = e.pins[e.pins.length - 1].interval;
        for (const i of e.pitches)
          if (-1 == t.pitches.indexOf(i + s)) return !1;
        return !0;
      }
      moveTonesIntoOrderedTempMatchedList(e, t) {
        for (let s = 0; s < e.count(); s++) {
          const i = e.get(s),
            n = i.pitches[0] + i.lastInterval;
          for (let a = 0; a < t.length; a++)
            if (t[a] == n) {
              (this.tempMatchedPitchTones[a] = i), e.remove(s), s--;
              break;
            }
        }
        for (; e.count() > 0; ) {
          const t = e.popFront();
          for (let e = 0; e < this.tempMatchedPitchTones.length; e++)
            if (null == this.tempMatchedPitchTones[e]) {
              this.tempMatchedPitchTones[e] = t;
              break;
            }
        }
      }
      determineCurrentActiveTones(e, t, s, i) {
        const n = e.channels[t],
          a = this.channels[t],
          o = e.getPattern(t, this.bar),
          r = this.getCurrentPart(),
          l = this.tick + h.ticksPerPart * r;
        if (i && e.getChannelIsMod(t)) {
          let s = [],
            i = [],
            c = [],
            u = h.modCount;
          for (; u--; ) s.push(null), i.push(null), c.push(null);
          if (null != o && !n.muted)
            for (let e = 0; e < o.notes.length; e++)
              o.notes[e].end <= r
                ? (null == i[o.notes[e].pitches[0]] ||
                    o.notes[e].end > i[o.notes[e].pitches[0]].start) &&
                  (i[o.notes[e].pitches[0]] = o.notes[e])
                : o.notes[e].start <= r && o.notes[e].end > r
                ? (s[o.notes[e].pitches[0]] = o.notes[e])
                : o.notes[e].start > r &&
                  (null == c[o.notes[e].pitches[0]] ||
                    o.notes[e].start < c[o.notes[e].pitches[0]].start) &&
                  (c[o.notes[e].pitches[0]] = o.notes[e]);
          let p = 0;
          const f = e.patternInstruments && null != o ? o.instruments[0] : 0,
            m = a.instruments[f],
            d = m.activeModTones;
          for (let e = 0; e < h.modCount; e++) {
            if (
              (null != s[e] &&
                (null != i[e] && i[e].end != s[e].start && (i[e] = null),
                null != c[e] && c[e].start != s[e].end && (c[e] = null)),
              null != a.singleSeamlessInstrument &&
                a.singleSeamlessInstrument != f &&
                a.singleSeamlessInstrument < a.instruments.length)
            ) {
              const e = a.instruments[a.singleSeamlessInstrument],
                t = a.instruments[f];
              for (; e.activeModTones.count() > 0; )
                t.activeModTones.pushFront(e.activeModTones.popBack());
            }
            if (((a.singleSeamlessInstrument = f), null != s[e])) {
              let t = i[e],
                n = c[e],
                a = !1,
                o = !1;
              const r =
                h.ticksPerPart * s[e].start == l && this.isAtStartOfTick;
              let u;
              if (d.count() <= p) (u = this.newTone()), d.pushBack(u);
              else if (r && null == t) {
                const e = d.get(p);
                e.isOnLastTick ? this.freeTone(e) : this.releaseTone(m, e),
                  (u = this.newTone()),
                  d.set(p, u);
              } else u = d.get(p);
              p++;
              for (let t = 0; t < s[e].pitches.length; t++)
                u.pitches[t] = s[e].pitches[t];
              (u.pitchCount = s[e].pitches.length),
                (u.chordSize = 1),
                (u.instrumentIndex = f),
                (u.note = s[e]),
                (u.noteStartPart = s[e].start),
                (u.noteEndPart = s[e].end),
                (u.prevNote = t),
                (u.nextNote = n),
                (u.prevNotePitchIndex = 0),
                (u.nextNotePitchIndex = 0),
                (u.atNoteStart = r),
                (u.passedEndOfNote = !1),
                (u.forceContinueAtStart = a),
                (u.forceContinueAtEnd = o);
            }
          }
          for (; d.count() > p; ) {
            const s = d.popBack(),
              i = e.channels[t];
            if (s.instrumentIndex < i.instruments.length && !s.isOnLastTick) {
              const e = this.channels[t].instruments[s.instrumentIndex];
              this.releaseTone(e, s);
            } else this.freeTone(s);
          }
        } else if (!e.getChannelIsMod(t)) {
          let c = null,
            u = null,
            p = null;
          if (
            i &&
            null != o &&
            !n.muted &&
            (!this.isRecording || this.liveInputChannel != t)
          ) {
            for (let e = 0; e < o.notes.length; e++)
              if (o.notes[e].end <= r) u = o.notes[e];
              else if (o.notes[e].start <= r && o.notes[e].end > r)
                c = o.notes[e];
              else if (o.notes[e].start > r) {
                p = o.notes[e];
                break;
              }
            null != c &&
              (null != u && u.end != c.start && (u = null),
              null != p && p.start != c.end && (p = null));
          }
          if (
            null != o &&
            (!e.layeredInstruments ||
              1 == n.instruments.length ||
              (e.patternInstruments && 1 == o.instruments.length))
          ) {
            const t = e.patternInstruments ? o.instruments[0] : 0;
            if (
              null != a.singleSeamlessInstrument &&
              a.singleSeamlessInstrument != t &&
              a.singleSeamlessInstrument < a.instruments.length
            ) {
              const e = a.instruments[a.singleSeamlessInstrument],
                s = a.instruments[t];
              for (; e.activeTones.count() > 0; )
                s.activeTones.pushFront(e.activeTones.popBack());
            }
            a.singleSeamlessInstrument = t;
          } else a.singleSeamlessInstrument = null;
          for (let i = 0; i < n.instruments.length; i++) {
            const f = a.instruments[i],
              m = f.activeTones;
            let d = 0;
            if (
              null != c &&
              (!e.patternInstruments || -1 != o.instruments.indexOf(i))
            ) {
              const a = n.instruments[i];
              let y = u,
                v = p;
              const g = h.partsPerBeat * e.beatsPerBar,
                b = a.getTransition(),
                S = a.getChord();
              let M = !1,
                w = !1,
                k = 0,
                x = 0;
              if (0 == c.start) {
                let s =
                  null == this.prevBar ? null : e.getPattern(t, this.prevBar);
                if (null != s) {
                  const t =
                    s.notes.length <= 0 ? null : s.notes[s.notes.length - 1];
                  if (null != t && t.end == g) {
                    const a =
                        c.continuesLastPattern &&
                        be.adjacentNotesHaveMatchingPitches(t, c),
                      r = this.adjacentPatternHasCompatibleInstrumentTransition(
                        e,
                        n,
                        o,
                        s,
                        i,
                        b,
                        S,
                        c,
                        t,
                        a
                      );
                    null != r &&
                      ((y = t),
                      (k = r.singleTone ? 1 : y.pitches.length),
                      (M = a));
                  }
                }
              } else null != y && (k = S.singleTone ? 1 : y.pitches.length);
              if (c.end == g) {
                let s =
                  null == this.nextBar ? null : e.getPattern(t, this.nextBar);
                if (null != s) {
                  const t = s.notes.length <= 0 ? null : s.notes[0];
                  if (null != t && 0 == t.start) {
                    const a =
                        t.continuesLastPattern &&
                        be.adjacentNotesHaveMatchingPitches(c, t),
                      r = this.adjacentPatternHasCompatibleInstrumentTransition(
                        e,
                        n,
                        o,
                        s,
                        i,
                        b,
                        S,
                        c,
                        t,
                        a
                      );
                    null != r &&
                      ((v = t),
                      (x = r.singleTone ? 1 : v.pitches.length),
                      (w = a));
                  }
                }
              } else null != v && (x = S.singleTone ? 1 : v.pitches.length);
              if (S.singleTone) {
                const n = h.ticksPerPart * c.start == l;
                let o;
                if (m.count() <= d) (o = this.newTone()), m.pushBack(o);
                else if (
                  !n ||
                  ((b.isSeamless || a.clicklessTransition || M) && null != y)
                )
                  o = m.get(d);
                else {
                  const e = m.get(d);
                  e.isOnLastTick ? this.freeTone(e) : this.releaseTone(f, e),
                    (o = this.newTone()),
                    m.set(d, o);
                }
                d++;
                for (let e = 0; e < c.pitches.length; e++)
                  o.pitches[e] = c.pitches[e];
                (o.pitchCount = c.pitches.length),
                  (o.chordSize = 1),
                  (o.instrumentIndex = i),
                  (o.note = c),
                  (o.noteStartPart = c.start),
                  (o.noteEndPart = c.end),
                  (o.prevNote = y),
                  (o.nextNote = v),
                  (o.prevNotePitchIndex = 0),
                  (o.nextNotePitchIndex = 0),
                  (o.atNoteStart = n),
                  (o.passedEndOfNote = !1),
                  (o.forceContinueAtStart = M),
                  (o.forceContinueAtEnd = w),
                  this.computeTone(e, t, s, o, !1, !1);
              } else {
                const n = a.getTransition();
                ((n.isSeamless && !n.slides && 0 == S.strumParts) || M) &&
                  h.ticksPerPart * c.start == l &&
                  null != y &&
                  this.moveTonesIntoOrderedTempMatchedList(m, c.pitches);
                let o = 0;
                for (let a = 0; a < c.pitches.length; a++) {
                  let u = k > a ? y : null,
                    p = c,
                    g = x > a ? v : null,
                    b = p.start + o,
                    P = !1;
                  if (b > r) {
                    if (!(m.count() > a && (n.isSeamless || M) && null != u))
                      break;
                    (g = p), (p = u), (u = null), (b = p.start + o), (P = !0);
                  }
                  let F = p.end;
                  (n.isSeamless || M) &&
                    null != g &&
                    (F = Math.min(
                      h.partsPerBeat * this.song.beatsPerBar,
                      F + o
                    )),
                    ((n.continues || M) && null != u) || (o += S.strumParts);
                  const I = h.ticksPerPart * b == l;
                  let q;
                  if (null != this.tempMatchedPitchTones[d])
                    (q = this.tempMatchedPitchTones[d]),
                      (this.tempMatchedPitchTones[d] = null),
                      m.pushBack(q);
                  else if (m.count() <= d) (q = this.newTone()), m.pushBack(q);
                  else if (!I || ((n.isSeamless || M) && null != u))
                    q = m.get(d);
                  else {
                    const e = m.get(d);
                    e.isOnLastTick ? this.freeTone(e) : this.releaseTone(f, e),
                      (q = this.newTone()),
                      m.set(d, q);
                  }
                  d++,
                    (q.pitches[0] = p.pitches[a]),
                    (q.pitchCount = 1),
                    (q.chordSize = p.pitches.length),
                    (q.instrumentIndex = i),
                    (q.note = p),
                    (q.noteStartPart = b),
                    (q.noteEndPart = F),
                    (q.prevNote = u),
                    (q.nextNote = g),
                    (q.prevNotePitchIndex = a),
                    (q.nextNotePitchIndex = a),
                    (q.atNoteStart = I),
                    (q.passedEndOfNote = P),
                    (q.forceContinueAtStart = M && null != u),
                    (q.forceContinueAtEnd = w && null != g),
                    this.computeTone(e, t, s, q, !1, !1);
                }
              }
            }
            for (; m.count() > d; ) {
              const s = m.popBack(),
                i = e.channels[t];
              if (s.instrumentIndex < i.instruments.length && !s.isOnLastTick) {
                const e = a.instruments[s.instrumentIndex];
                this.releaseTone(e, s);
              } else this.freeTone(s);
            }
            this.clearTempMatchedPitchTones(d, f);
          }
        }
      }
      clearTempMatchedPitchTones(e, t) {
        for (let s = e; s < this.tempMatchedPitchTones.length; s++) {
          const e = this.tempMatchedPitchTones[s];
          null != e &&
            (e.isOnLastTick ? this.freeTone(e) : this.releaseTone(t, e),
            (this.tempMatchedPitchTones[s] = null));
        }
      }
      playTone(e, t, s, i) {
        const n = this.channels[e].instruments[i.instrumentIndex];
        null != n.synthesizer && n.synthesizer(this, t, s, i, n),
          i.envelopeComputer.clearEnvelopes();
      }
      playModTone(e, t, s, i, n, a, o, r) {
        const l = e.channels[t].instruments[a.instrumentIndex];
        if (null != a.note) {
          const e = this.getTicksIntoBar(),
            t = e / h.ticksPerPart,
            o = (e + 1) / h.ticksPerPart,
            r = this.tickSampleCountdown,
            c = t + (o - t) * (1 - r / s),
            u = t + (o - t) * (1 - (r - n) / s),
            p = h.ticksPerPart * c,
            f = h.ticksPerPart * u,
            m = a.note.getEndPinIndex(this.getCurrentPart()),
            d = a.note.pins[m - 1],
            y = a.note.pins[m],
            v = (a.note.start + d.time) * h.ticksPerPart,
            g = (a.note.start + y.time) * h.ticksPerPart,
            b = (p - v) / (g - v),
            S = (f - v) / (g - v);
          (a.expression = d.size + (y.size - d.size) * b),
            (a.expressionDelta = d.size + (y.size - d.size) * S - a.expression),
            be.modSynth(this, i, n, a, l);
        }
      }
      static computeChordExpression(e) {
        return 1 / (0.25 * (e - 1) + 1);
      }
      computeTone(e, t, s, i, n, a) {
        const o = Math.ceil(s),
          r = e.channels[t],
          l = this.channels[t],
          c = r.instruments[i.instrumentIndex],
          u = l.instruments[i.instrumentIndex];
        (u.awake = !0),
          (u.tonesAddedInThisTick = !0),
          u.computed || u.compute(this, c, s, o, i, t, i.instrumentIndex);
        const p = c.getTransition(),
          f = c.getChord(),
          m = f.singleTone ? 1 : be.computeChordExpression(i.chordSize),
          d = e.getChannelIsNoise(t),
          y = d ? h.noiseInterval : 1,
          g = (h.ticksPerPart * s) / this.samplesPerSecond,
          b = 1 / this.samplesPerSecond,
          S = 1 / h.partsPerBeat,
          P = this.getTicksIntoBar(),
          F = P / h.ticksPerPart,
          I = (P + 1) / h.ticksPerPart,
          q = this.getCurrentPart();
        let T = 1;
        i.specialIntervalExpressionMult = 1;
        let D = a,
          O = 0,
          R = 0,
          z = 1,
          C = 1,
          E = m,
          A = m,
          H = 16,
          L = h.keys[e.key].basePitch + h.pitchesPerOctave * e.octave,
          G = 1,
          V = 48;
        if (3 == c.type)
          (G = h.spectrumBaseExpression),
            d && ((L = h.spectrumBasePitch), (G *= 2)),
            (H = h.spectrumBasePitch),
            (V = 28);
        else if (4 == c.type)
          (L = h.spectrumBasePitch), (G = h.drumsetBaseExpression), (H = L);
        else if (2 == c.type)
          (L = h.chipNoises[c.chipNoise].basePitch),
            (G = h.noiseBaseExpression),
            (H = L),
            (V = h.chipNoises[c.chipNoise].isSoft ? 24 : 60);
        else if (1 == c.type || 10 == c.type) G = h.fmBaseExpression;
        else if (0 == c.type)
          (G = h.chipBaseExpression),
            h.chipWaves[c.chipWave].isCustomSampled
              ? h.chipWaves[c.chipWave].isPercussion
                ? (L =
                    -12 *
                      Math.log2(
                        h.chipWaves[c.chipWave].samples.length /
                          h.chipWaves[c.chipWave].sampleRate
                      ) -
                    84.37 -
                    (-60 + h.chipWaves[c.chipWave].rootKey))
                : (L +=
                    -12 *
                      Math.log2(
                        h.chipWaves[c.chipWave].samples.length /
                          h.chipWaves[c.chipWave].sampleRate
                      ) -
                    96.37 -
                    (-60 + h.chipWaves[c.chipWave].rootKey))
              : h.chipWaves[c.chipWave].isSampled &&
                !h.chipWaves[c.chipWave].isPercussion
              ? (L = L - 63 + h.chipWaves[c.chipWave].extraSampleDetune)
              : h.chipWaves[c.chipWave].isSampled &&
                h.chipWaves[c.chipWave].isPercussion &&
                (L = -51 + h.chipWaves[c.chipWave].extraSampleDetune);
        else if (8 == c.type) G = h.chipBaseExpression;
        else if (5 == c.type) G = h.harmonicsBaseExpression;
        else if (6 == c.type) G = h.pwmBaseExpression;
        else if (7 == c.type) G = h.pickedStringBaseExpression;
        else {
          if (9 != c.type)
            throw new Error("Unknown instrument type in computeTone.");
          (G = 1), (H = 0), (V = 1), (L = 0);
        }
        if (
          (i.atNoteStart && !p.isSeamless && !i.forceContinueAtStart) ||
          i.freshlyAllocated
        ) {
          i.reset();
          const e = h.rawRawChipWaves[c.chipWave].samples.length - 1,
            t = c.chipWaveStartOffset / e,
            s = 0.999999999999999;
          for (let e = 0; e < h.maxPitchOrOperatorCount; e++)
            (i.phases[e] = c.chipWavePlayBackwards
              ? Math.max(0, Math.min(s, t))
              : Math.max(0, t)),
              (i.directions[e] = c.chipWavePlayBackwards ? -1 : 1),
              (i.chipWaveCompletions[e] = 0),
              (i.chipWavePrevWaves[e] = 0),
              (i.chipWaveCompletionsLastWave[e] = 0);
        }
        i.freshlyAllocated = !1;
        for (let e = 0; e < h.maxPitchOrOperatorCount; e++)
          (i.phaseDeltas[e] = 0),
            (i.phaseDeltaScales[e] = 0),
            (i.operatorExpressions[e] = 0),
            (i.operatorExpressionDeltas[e] = 0);
        (i.expression = 0), (i.expressionDelta = 0);
        for (let e = 0; e < h.operatorCount; e++)
          i.operatorWaves[e] = be.getOperatorWave(
            c.operators[e].waveform,
            c.operators[e].pulseWidth
          );
        if (n) {
          const e = i.ticksSinceReleased,
            t = i.ticksSinceReleased + 1;
          O = R = i.lastInterval;
          const s = Math.abs(c.getFadeOutTicks());
          (z = be.noteSizeToVolumeMult((1 - e / s) * h.noteSizeMax)),
            (C = be.noteSizeToVolumeMult((1 - t / s) * h.noteSizeMax)),
            a && (C = 0),
            i.ticksSinceReleased + 1 >= s && (D = !0);
        } else if (null == i.note)
          (z = C = 1),
            (i.lastInterval = 0),
            (i.ticksSinceReleased = 0),
            (i.liveInputSamplesHeld += o);
        else {
          const e = i.note,
            t = i.nextNote,
            s = i.noteStartPart,
            n = i.noteEndPart,
            a = e.getEndPinIndex(q),
            o = e.pins[a - 1],
            r = e.pins[a],
            l = s * h.ticksPerPart,
            u = n * h.ticksPerPart,
            f = (e.start + o.time) * h.ticksPerPart,
            m = (e.start + r.time) * h.ticksPerPart;
          i.ticksSinceReleased = 0;
          const d = q * h.ticksPerPart + this.tick,
            y = d + 1,
            v = d - l,
            g = y - l,
            b = Math.min(1, (d - f) / (m - f)),
            S = Math.min(1, (y - f) / (m - f));
          if (
            ((z = 1),
            (C = 1),
            (O = o.interval + (r.interval - o.interval) * b),
            (R = o.interval + (r.interval - o.interval) * S),
            (i.lastInterval = R),
            (!p.isSeamless && !i.forceContinueAtEnd) || null == t)
          ) {
            const e = -c.getFadeOutTicks();
            if (e > 0) {
              const t = u - l;
              (z *= Math.min(1, (t - v) / e)),
                (C *= Math.min(1, (t - g) / e)),
                y >= l + t && (D = !0);
            }
          }
        }
        i.isOnLastTick = D;
        let B,
          W,
          $ = c.noteFilter;
        if (c.noteFilterType) {
          const e = c.noteFilter;
          null == c.noteSubFilters[1] && (c.noteSubFilters[1] = new he());
          const s = c.noteSubFilters[1];
          let n = c.noteFilterSimpleCut,
            a = c.noteFilterSimplePeak,
            o = c.noteFilterSimpleCut,
            r = c.noteFilterSimplePeak,
            l = !1;
          this.isModActive(
            h.modulators.dictionary["note filt cut"].index,
            t,
            i.instrumentIndex
          ) &&
            ((n = this.getModValue(
              h.modulators.dictionary["note filt cut"].index,
              t,
              i.instrumentIndex,
              !1
            )),
            (o = this.getModValue(
              h.modulators.dictionary["note filt cut"].index,
              t,
              i.instrumentIndex,
              !0
            )),
            (l = !0)),
            this.isModActive(
              h.modulators.dictionary["note filt peak"].index,
              t,
              i.instrumentIndex
            ) &&
              ((a = this.getModValue(
                h.modulators.dictionary["note filt peak"].index,
                t,
                i.instrumentIndex,
                !1
              )),
              (r = this.getModValue(
                h.modulators.dictionary["note filt peak"].index,
                t,
                i.instrumentIndex,
                !0
              )),
              (l = !0)),
            e.convertLegacySettingsForSynth(n, a, !l),
            s.convertLegacySettingsForSynth(o, r, !l),
            (B = e.controlPoints[0]),
            (W = s.controlPoints[0]),
            (c.noteFilter = e),
            (c.tmpNoteFilterStart = e);
        }
        const j = i.envelopeComputer;
        j.computeEnvelopes(
          c,
          q,
          h.ticksPerPart * F,
          s / this.samplesPerSecond,
          i
        );
        const U = i.envelopeComputer.envelopeStarts,
          _ = i.envelopeComputer.envelopeEnds;
        if (((c.noteFilter = $), null != i.note && p.slides)) {
          const e = i.prevNote,
            t = i.nextNote;
          if (null != e) {
            const t =
              e.pitches[i.prevNotePitchIndex] +
              e.pins[e.pins.length - 1].interval -
              i.pitches[0];
            if (
              (j.prevSlideStart && (O += t * j.prevSlideRatioStart),
              j.prevSlideEnd && (R += t * j.prevSlideRatioEnd),
              !f.singleTone)
            ) {
              const t = e.pitches.length - i.chordSize;
              j.prevSlideStart &&
                (E = be.computeChordExpression(
                  i.chordSize + t * j.prevSlideRatioStart
                )),
                j.prevSlideEnd &&
                  (A = be.computeChordExpression(
                    i.chordSize + t * j.prevSlideRatioEnd
                  ));
            }
          }
          if (null != t) {
            const e =
              t.pitches[i.nextNotePitchIndex] -
              (i.pitches[0] + i.note.pins[i.note.pins.length - 1].interval);
            if (
              (j.nextSlideStart && (O += e * j.nextSlideRatioStart),
              j.nextSlideEnd && (R += e * j.nextSlideRatioEnd),
              !f.singleTone)
            ) {
              const e = t.pitches.length - i.chordSize;
              j.nextSlideStart &&
                (E = be.computeChordExpression(
                  i.chordSize + e * j.nextSlideRatioStart
                )),
                j.nextSlideEnd &&
                  (A = be.computeChordExpression(
                    i.chordSize + e * j.nextSlideRatioEnd
                  ));
            }
          }
        }
        if (M(c.effects)) {
          let e = h.justIntonationSemitones[c.pitchShift] / y,
            s = 1,
            n = 1;
          this.isModActive(
            h.modulators.dictionary["pitch shift"].index,
            t,
            i.instrumentIndex
          ) &&
            ((e =
              h.justIntonationSemitones[h.justIntonationSemitones.length - 1]),
            (s =
              this.getModValue(
                h.modulators.dictionary["pitch shift"].index,
                t,
                i.instrumentIndex,
                !1
              ) / h.pitchShiftCenter),
            (n =
              this.getModValue(
                h.modulators.dictionary["pitch shift"].index,
                t,
                i.instrumentIndex,
                !0
              ) / h.pitchShiftCenter));
          (O += e * U[18] * s), (R += e * _[18] * n);
        }
        if (
          w(c.effects) ||
          this.isModActive(
            h.modulators.dictionary["song detune"].index,
            t,
            i.instrumentIndex
          )
        ) {
          const e = U[19],
            s = _[19];
          let n = c.detune,
            a = c.detune;
          this.isModActive(
            h.modulators.dictionary.detune.index,
            t,
            i.instrumentIndex
          ) &&
            ((n =
              this.getModValue(
                h.modulators.dictionary.detune.index,
                t,
                i.instrumentIndex,
                !1
              ) + h.detuneCenter),
            (a =
              this.getModValue(
                h.modulators.dictionary.detune.index,
                t,
                i.instrumentIndex,
                !0
              ) + h.detuneCenter)),
            this.isModActive(
              h.modulators.dictionary["song detune"].index,
              t,
              i.instrumentIndex
            ) &&
              ((n +=
                4 *
                this.getModValue(
                  h.modulators.dictionary["song detune"].index,
                  t,
                  i.instrumentIndex,
                  !1
                )),
              (a +=
                4 *
                this.getModValue(
                  h.modulators.dictionary["song detune"].index,
                  t,
                  i.instrumentIndex,
                  !0
                ))),
            (O += (be.detuneToCents(n * e) * h.pitchesPerOctave) / 1200),
            (R += (be.detuneToCents(a * s) * h.pitchesPerOctave) / 1200);
        }
        if (k(c.effects)) {
          let e, s, n, a;
          if (
            (c.vibrato == h.vibratos.length
              ? ((e = 2 * c.vibratoDelay),
                c.vibratoDelay ==
                  h.modulators.dictionary["vibrato delay"].maxRawVol &&
                  (e = Number.POSITIVE_INFINITY),
                (s = c.vibratoDepth),
                (n = s))
              : ((e = h.vibratos[c.vibrato].delayTicks),
                (s = h.vibratos[c.vibrato].amplitude),
                (n = s)),
            this.isModActive(
              h.modulators.dictionary["vibrato delay"].index,
              t,
              i.instrumentIndex
            ) &&
              ((e =
                2 *
                this.getModValue(
                  h.modulators.dictionary["vibrato delay"].index,
                  t,
                  i.instrumentIndex,
                  !1
                )),
              e == 2 * h.modulators.dictionary["vibrato delay"].maxRawVol &&
                (e = Number.POSITIVE_INFINITY)),
            this.isModActive(
              h.modulators.dictionary["vibrato depth"].index,
              t,
              i.instrumentIndex
            ) &&
              ((s =
                this.getModValue(
                  h.modulators.dictionary["vibrato depth"].index,
                  t,
                  i.instrumentIndex,
                  !1
                ) / 25),
              (n =
                this.getModValue(
                  h.modulators.dictionary["vibrato depth"].index,
                  t,
                  i.instrumentIndex,
                  !0
                ) / 25)),
            null != i.prevVibrato)
          )
            a = i.prevVibrato;
          else {
            if (
              ((a = s * be.getLFOAmplitude(c, g * c.LFOtime) * U[20]), e > 0)
            ) {
              const t = e - j.noteTicksStart;
              a *= Math.max(0, Math.min(1, 1 - t / 2));
            }
          }
          let o = be.getLFOAmplitude(c, g * c.nextLFOtime);
          const r = _[20];
          if (9 != c.type) {
            let t = n * o * r;
            if (e > 0) {
              const s = e - j.noteTicksEnd;
              t *= Math.max(0, Math.min(1, 1 - s / 2));
            }
            (i.prevVibrato = t), (O += a), (R += t);
          }
        }
        if ((!p.isSeamless && !i.forceContinueAtStart) || null == i.prevNote) {
          const e = c.getFadeInSeconds();
          e > 0 &&
            ((z *= Math.min(1, j.noteSecondsStart / e)),
            (C *= Math.min(1, j.noteSecondsEnd / e)));
        }
        4 == c.type &&
          null == i.drumsetPitch &&
          ((i.drumsetPitch = i.pitches[0]),
          null != i.note && (i.drumsetPitch += i.note.pickMainInterval()),
          (i.drumsetPitch = Math.max(
            0,
            Math.min(h.drumCount - 1, i.drumsetPitch)
          )));
        let K = j.lowpassCutoffDecayVolumeCompensation;
        if (x(c.effects)) {
          const e = U[1],
            t = _[1];
          if (c.noteFilterType) {
            const s = U[21],
              n = _[21],
              a = U[29],
              r = _[29];
            B.toCoefficients(
              be.tempFilterStartCoefficients,
              this.samplesPerSecond,
              e * s,
              a
            ),
              W.toCoefficients(
                be.tempFilterEndCoefficients,
                this.samplesPerSecond,
                t * n,
                r
              ),
              i.noteFilters.length < 1 && (i.noteFilters[0] = new N()),
              i.noteFilters[0].loadCoefficientsWithGradient(
                be.tempFilterStartCoefficients,
                be.tempFilterEndCoefficients,
                1 / o,
                0 == B.type
              ),
              (K *= B.getVolumeCompensationMult()),
              (i.noteFilterCount = 1);
          } else {
            const s =
              null != c.tmpNoteFilterStart
                ? c.tmpNoteFilterStart
                : c.noteFilter;
            for (let n = 0; n < s.controlPointCount; n++) {
              const a = U[21 + n],
                r = _[21 + n],
                l = U[29 + n],
                h = _[29 + n];
              let u = s.controlPoints[n];
              const p =
                null != c.tmpNoteFilterEnd &&
                null != c.tmpNoteFilterEnd.controlPoints[n]
                  ? c.tmpNoteFilterEnd.controlPoints[n]
                  : s.controlPoints[n];
              u.type != p.type && (u = p),
                u.toCoefficients(
                  be.tempFilterStartCoefficients,
                  this.samplesPerSecond,
                  e * a,
                  l
                ),
                p.toCoefficients(
                  be.tempFilterEndCoefficients,
                  this.samplesPerSecond,
                  t * r,
                  h
                ),
                i.noteFilters.length <= n && (i.noteFilters[n] = new N()),
                i.noteFilters[n].loadCoefficientsWithGradient(
                  be.tempFilterStartCoefficients,
                  be.tempFilterEndCoefficients,
                  1 / o,
                  0 == u.type
                ),
                (K *= u.getVolumeCompensationMult());
            }
            i.noteFilterCount = s.controlPointCount;
          }
        } else i.noteFilterCount = 0;
        if (4 == c.type) {
          const e = c.getDrumsetEnvelope(i.drumsetPitch);
          K *= de.getLowpassCutoffDecayVolumeCompensation(e);
          let t = de.computeEnvelope(
              e,
              j.noteSecondsStart,
              S * F,
              j.noteSizeStart
            ),
            s = de.computeEnvelope(e, j.noteSecondsEnd, S * I, j.noteSizeEnd);
          if (j.prevSlideStart) {
            t +=
              (de.computeEnvelope(
                e,
                j.prevNoteSecondsStart,
                S * F,
                j.prevNoteSize
              ) -
                t) *
              j.prevSlideRatioStart;
          }
          if (j.prevSlideEnd) {
            s +=
              (de.computeEnvelope(
                e,
                j.prevNoteSecondsEnd,
                S * I,
                j.prevNoteSize
              ) -
                s) *
              j.prevSlideRatioEnd;
          }
          if (j.nextSlideStart) {
            t +=
              (de.computeEnvelope(e, 0, S * F, j.nextNoteSize) - t) *
              j.nextSlideRatioStart;
          }
          if (j.nextSlideEnd) {
            s +=
              (de.computeEnvelope(e, 0, S * I, j.nextNoteSize) - s) *
              j.nextSlideRatioEnd;
          }
          const n = this.tempDrumSetControlPoint;
          (n.type = 0),
            (n.gain = le.getRoundedSettingValueFromLinearGain(0.5)),
            (n.freq = le.getRoundedSettingValueFromHz(8e3)),
            n.toCoefficients(
              be.tempFilterStartCoefficients,
              this.samplesPerSecond,
              t * (1 + t),
              1
            ),
            n.toCoefficients(
              be.tempFilterEndCoefficients,
              this.samplesPerSecond,
              s * (1 + s),
              1
            ),
            i.noteFilters.length == i.noteFilterCount &&
              (i.noteFilters[i.noteFilterCount] = new N()),
            i.noteFilters[i.noteFilterCount].loadCoefficientsWithGradient(
              be.tempFilterStartCoefficients,
              be.tempFilterEndCoefficients,
              1 / o,
              !0
            ),
            i.noteFilterCount++;
        }
        if (((K = Math.min(3, K)), 1 == c.type || 10 == c.type)) {
          let e = 1,
            s = 0,
            n = 0;
          const a = f.arpeggiates;
          if (i.pitchCount > 1 && a) {
            const e = Math.floor(c.arpTime / h.ticksPerArpeggio);
            n = i.pitches[v(i.pitchCount, c.fastTwoNoteArp, e)] - i.pitches[0];
          }
          const r =
            10 == c.type
              ? c.customAlgorithm.carrierCount
              : h.algorithms[c.algorithm].carrierCount;
          for (let l = 0; l < (10 == c.type ? 6 : h.operatorCount); l++) {
            const u =
                10 == c.type
                  ? c.customAlgorithm.associatedCarrier[l] - 1
                  : h.algorithms[c.algorithm].associatedCarrier[l] - 1,
              p =
                i.pitches[
                  a ? 0 : l < i.pitchCount ? l : u < i.pitchCount ? u : 0
                ],
              f = h.operatorFrequencies[c.operators[l].frequency].mult,
              m = h.operatorCarrierInterval[u] + n,
              d = L + (p + O) * y + m,
              v = L + (p + R) * y + m,
              g = ue.frequencyFromPitch(d),
              S = ue.frequencyFromPitch(v),
              M = h.operatorFrequencies[c.operators[l].frequency].hzOffset,
              w = f * g + M,
              k = f * S + M,
              x = U[5 + l],
              P = _[5 + l];
            let F, I;
            1 != x || 1 != P
              ? ((F = Math.pow(2, Math.log2(w / g) * x) * g),
                (I = Math.pow(2, Math.log2(k / S) * P) * S))
              : ((F = w), (I = k)),
              (i.phaseDeltas[l] = F * b),
              (i.phaseDeltaScales[l] = Math.pow(I / F, 1 / o));
            let q = c.operators[l].amplitude,
              T = c.operators[l].amplitude;
            l < 4
              ? this.isModActive(
                  h.modulators.dictionary["fm slider 1"].index + l,
                  t,
                  i.instrumentIndex
                ) &&
                ((q *=
                  this.getModValue(
                    h.modulators.dictionary["fm slider 1"].index + l,
                    t,
                    i.instrumentIndex,
                    !1
                  ) / 15),
                (T *=
                  this.getModValue(
                    h.modulators.dictionary["fm slider 1"].index + l,
                    t,
                    i.instrumentIndex,
                    !0
                  ) / 15))
              : this.isModActive(
                  h.modulators.dictionary["fm slider 5"].index + l - 4,
                  t,
                  i.instrumentIndex
                ) &&
                ((q *=
                  this.getModValue(
                    h.modulators.dictionary["fm slider 5"].index + l - 4,
                    t,
                    i.instrumentIndex,
                    !1
                  ) / 15),
                (T *=
                  this.getModValue(
                    h.modulators.dictionary["fm slider 5"].index + l - 4,
                    t,
                    i.instrumentIndex,
                    !0
                  ) / 15));
            const D = be.operatorAmplitudeCurve(q),
              z = be.operatorAmplitudeCurve(T);
            let C =
                D *
                h.operatorFrequencies[c.operators[l].frequency].amplitudeSign,
              E =
                z *
                h.operatorFrequencies[c.operators[l].frequency].amplitudeSign;
            if (l < r) {
              let e;
              e =
                null != i.prevPitchExpressions[l]
                  ? i.prevPitchExpressions[l]
                  : Math.pow(2, -(d - H) / V);
              const t = Math.pow(2, -(v - H) / V);
              (i.prevPitchExpressions[l] = t), (C *= e), (E *= t), (s += z);
            } else
              (C *= 1.5 * h.sineWaveLength),
                (E *= 1.5 * h.sineWaveLength),
                (e *= 1 - Math.min(1, c.operators[l].amplitude / 15));
            if (
              ((C *= U[11 + l]),
              (E *= _[11 + l]),
              this.isModActive(
                h.modulators.dictionary["note volume"].index,
                t,
                i.instrumentIndex
              ))
            ) {
              const e = this.getModValue(
                  h.modulators.dictionary["note volume"].index,
                  t,
                  i.instrumentIndex,
                  !1
                ),
                s = this.getModValue(
                  h.modulators.dictionary["note volume"].index,
                  t,
                  i.instrumentIndex,
                  !0
                );
              (C *=
                e <= 0
                  ? (e + h.volumeRange / 2) / (h.volumeRange / 2)
                  : be.instrumentVolumeToVolumeMult(e)),
                (E *=
                  s <= 0
                    ? (s + h.volumeRange / 2) / (h.volumeRange / 2)
                    : be.instrumentVolumeToVolumeMult(s));
            }
            (i.operatorExpressions[l] = C),
              (i.operatorExpressionDeltas[l] = (E - C) / o);
          }
          (e *= (Math.pow(2, 2 - (1.4 * c.feedbackAmplitude) / 15) - 1) / 3),
            (e *= 1 - Math.min(1, Math.max(0, s - 1) / 2)),
            (e = 1 + 3 * e);
          const l = G * e * K * z * E * U[0],
            u = G * e * K * C * A * _[0];
          (i.expression = l), (i.expressionDelta = (u - l) / o);
          let p = c.feedbackAmplitude,
            m = c.feedbackAmplitude;
          this.isModActive(
            h.modulators.dictionary["fm feedback"].index,
            t,
            i.instrumentIndex
          ) &&
            ((p *=
              this.getModValue(
                h.modulators.dictionary["fm feedback"].index,
                t,
                i.instrumentIndex,
                !1
              ) / 15),
            (m *=
              this.getModValue(
                h.modulators.dictionary["fm feedback"].index,
                t,
                i.instrumentIndex,
                !0
              ) / 15));
          let d = (0.3 * h.sineWaveLength * p) / 15;
          const g = (0.3 * h.sineWaveLength * m) / 15;
          let S = d * U[17],
            M = g * _[17];
          (i.feedbackMult = S), (i.feedbackDelta = (M - S) / o);
        } else {
          const e = Math.pow(2, ((R - O) * y) / 12 / o);
          let s = i.pitches[0];
          if (i.pitchCount > 1 && (f.arpeggiates || f.customInterval)) {
            const e = Math.floor(c.arpTime / h.ticksPerArpeggio);
            if (f.customInterval) {
              const t =
                i.pitches[1 + v(i.pitchCount - 1, c.fastTwoNoteArp, e)] -
                i.pitches[0];
              (T = Math.pow(2, t / 12)),
                (i.specialIntervalExpressionMult = Math.pow(2, -t / V));
            } else s = i.pitches[v(i.pitchCount, c.fastTwoNoteArp, e)];
          }
          const n = L + (s + O) * y,
            a = L + (s + R) * y;
          let r;
          r =
            null != i.prevPitchExpressions[0]
              ? i.prevPitchExpressions[0]
              : Math.pow(2, -(n - H) / V);
          const l = Math.pow(2, -(a - H) / V);
          i.prevPitchExpressions[0] = l;
          let m = G * K;
          if (
            (2 == c.type && (m *= h.chipNoises[c.chipNoise].expression),
            0 == c.type && (m *= h.chipWaves[c.chipWave].expression),
            6 == c.type)
          ) {
            const e = c.pulseWidth / (2 * h.pulseWidthRange);
            let s = e,
              n = e;
            this.isModActive(
              h.modulators.dictionary["pulse width"].index,
              t,
              i.instrumentIndex
            ) &&
              ((s =
                this.getModValue(
                  h.modulators.dictionary["pulse width"].index,
                  t,
                  i.instrumentIndex,
                  !1
                ) /
                (2 * h.pulseWidthRange)),
              (n =
                this.getModValue(
                  h.modulators.dictionary["pulse width"].index,
                  t,
                  i.instrumentIndex,
                  !0
                ) /
                (2 * h.pulseWidthRange)));
            const a = s * U[2],
              r = n * _[2];
            (i.pulseWidth = a), (i.pulseWidthDelta = (r - a) / o);
          }
          if (7 == c.type) {
            let e = c.stringSustain,
              s = c.stringSustain;
            this.isModActive(
              h.modulators.dictionary.sustain.index,
              t,
              i.instrumentIndex
            ) &&
              ((e = this.getModValue(
                h.modulators.dictionary.sustain.index,
                t,
                i.instrumentIndex,
                !1
              )),
              (s = this.getModValue(
                h.modulators.dictionary.sustain.index,
                t,
                i.instrumentIndex,
                !0
              ))),
              (i.stringSustainStart = e),
              (i.stringSustainEnd = s),
              (m *= Math.pow(2, 0.7 * (1 - e / (h.stringSustainRange - 1))));
          }
          const d = ue.frequencyFromPitch(n);
          if (0 == c.type || 8 == c.type || 5 == c.type || 7 == c.type) {
            const t = h.unisons[c.unison],
              s = 7 == c.type ? 1 : t.voices / 2;
            m *= t.expression * s;
            const n = U[4],
              a = _[4],
              r = Math.pow(2, ((t.offset + t.spread) * n) / 12),
              l = Math.pow(2, ((t.offset + t.spread) * a) / 12),
              u = Math.pow(2, ((t.offset - t.spread) * n) / 12) * T,
              p = Math.pow(2, ((t.offset - t.spread) * a) / 12) * T;
            (i.phaseDeltas[0] = d * b * r),
              (i.phaseDeltas[1] = d * b * u),
              (i.phaseDeltaScales[0] = e * Math.pow(l / r, 1 / o)),
              (i.phaseDeltaScales[1] = e * Math.pow(p / u, 1 / o));
          } else (i.phaseDeltas[0] = d * b), (i.phaseDeltaScales[0] = e);
          let g = m * z * E * r * U[0],
            S = m * C * A * l * _[0];
          if (
            this.isModActive(
              h.modulators.dictionary["note volume"].index,
              t,
              i.instrumentIndex
            )
          ) {
            const e = this.getModValue(
                h.modulators.dictionary["note volume"].index,
                t,
                i.instrumentIndex,
                !1
              ),
              s = this.getModValue(
                h.modulators.dictionary["note volume"].index,
                t,
                i.instrumentIndex,
                !0
              );
            (g *=
              e <= 0
                ? (e + h.volumeRange / 2) / (h.volumeRange / 2)
                : be.instrumentVolumeToVolumeMult(e)),
              (S *=
                s <= 0
                  ? (s + h.volumeRange / 2) / (h.volumeRange / 2)
                  : be.instrumentVolumeToVolumeMult(s));
          }
          if (
            ((i.expression = g), (i.expressionDelta = (S - g) / o), 7 == c.type)
          ) {
            let e;
            if (null != i.prevStringDecay) e = i.prevStringDecay;
            else {
              const t = i.envelopeComputer.envelopeStarts[3];
              e =
                1 -
                Math.min(
                  1,
                  (t * i.stringSustainStart) / (h.stringSustainRange - 1)
                );
            }
            const t = i.envelopeComputer.envelopeEnds[3];
            let s =
              1 -
              Math.min(
                1,
                (t * i.stringSustainEnd) / (h.stringSustainRange - 1)
              );
            i.prevStringDecay = s;
            const n = h.unisons[c.unison];
            for (let e = i.pickedStrings.length; e < n.voices; e++)
              i.pickedStrings[e] = new me();
            if (i.atNoteStart && !p.continues && !i.forceContinueAtStart)
              for (const e of i.pickedStrings) e.delayIndex = -1;
            for (let t = 0; t < n.voices; t++)
              i.pickedStrings[t].update(this, u, i, t, o, e, s);
          }
        }
      }
      static getLFOAmplitude(e, t) {
        let s = 0;
        for (const i of h.vibratoTypes[e.vibratoType].periodsSeconds)
          s += Math.sin((2 * Math.PI * t) / i);
        return s;
      }
      static getInstrumentSynthFunction(e) {
        if (1 == e.type) {
          const t = e.algorithm + "_" + e.feedbackType;
          if (null == be.fmSynthFunctionCache[t]) {
            const s = [];
            for (const t of be.fmSourceTemplate)
              if (-1 != t.indexOf("// CARRIER OUTPUTS")) {
                const i = [];
                for (let t = 0; t < h.algorithms[e.algorithm].carrierCount; t++)
                  i.push("operator" + t + "Scaled");
                s.push(t.replace("/*operator#Scaled*/", i.join(" + ")));
              } else if (-1 != t.indexOf("// INSERT OPERATOR COMPUTATION HERE"))
                for (let t = h.operatorCount - 1; t >= 0; t--)
                  for (const i of be.operatorSourceTemplate)
                    if (-1 != i.indexOf("/* + operator@Scaled*/")) {
                      let n = "";
                      for (const s of h.algorithms[e.algorithm].modulatedBy[t])
                        n += " + operator" + (s - 1) + "Scaled";
                      const a = h.feedbacks[e.feedbackType].indices[t];
                      if (a.length > 0) {
                        n += " + feedbackMult * (";
                        const e = [];
                        for (const t of a)
                          e.push("operator" + (t - 1) + "Output");
                        n += e.join(" + ") + ")";
                      }
                      s.push(
                        i
                          .replace(/\#/g, t + "")
                          .replace("/* + operator@Scaled*/", n)
                      );
                    } else s.push(i.replace(/\#/g, t + ""));
              else if (-1 != t.indexOf("#"))
                for (let e = 0; e < h.operatorCount; e++)
                  s.push(t.replace(/\#/g, e + ""));
              else s.push(t);
            const i =
              "return (synth, bufferIndex, roundedSamplesPerTick, tone, instrumentState) => {" +
              s.join("\n") +
              "}";
            be.fmSynthFunctionCache[t] = new Function("Config", "Synth", i)(
              h,
              be
            );
          }
          return be.fmSynthFunctionCache[t];
        }
        if (0 == e.type)
          return e.isUsingAdvancedLoopControls
            ? be.loopableChipSynth
            : be.chipSynth;
        if (8 == e.type) return be.chipSynth;
        if (5 == e.type) return be.harmonicsSynth;
        if (6 == e.type) return be.pulseWidthSynth;
        if (7 == e.type) return be.pickedStringSynth;
        if (2 == e.type) return be.noiseSynth;
        if (3 == e.type) return be.spectrumSynth;
        if (4 == e.type) return be.drumsetSynth;
        if (9 == e.type) return be.modSynth;
        if (10 == e.type) {
          const t = e.customAlgorithm.name + "_" + e.customFeedbackType.name;
          if (null == be.fm6SynthFunctionCache[t]) {
            const s = [];
            for (const t of be.fmSourceTemplate)
              if (-1 != t.indexOf("// CARRIER OUTPUTS")) {
                const i = [];
                for (let t = 0; t < e.customAlgorithm.carrierCount; t++)
                  i.push("operator" + t + "Scaled");
                s.push(t.replace("/*operator#Scaled*/", i.join(" + ")));
              } else if (-1 != t.indexOf("// INSERT OPERATOR COMPUTATION HERE"))
                for (let t = h.operatorCount + 2 - 1; t >= 0; t--)
                  for (const i of be.operatorSourceTemplate)
                    if (-1 != i.indexOf("/* + operator@Scaled*/")) {
                      let n = "";
                      for (const s of e.customAlgorithm.modulatedBy[t])
                        n += " + operator" + (s - 1) + "Scaled";
                      const a = e.customFeedbackType.indices[t];
                      if (a.length > 0) {
                        n += " + feedbackMult * (";
                        const e = [];
                        for (const t of a)
                          e.push("operator" + (t - 1) + "Output");
                        n += e.join(" + ") + ")";
                      }
                      s.push(
                        i
                          .replace(/\#/g, t + "")
                          .replace("/* + operator@Scaled*/", n)
                      );
                    } else s.push(i.replace(/\#/g, t + ""));
              else if (-1 != t.indexOf("#"))
                for (let e = 0; e < h.operatorCount + 2; e++)
                  s.push(t.replace(/\#/g, e + ""));
              else s.push(t);
            const i =
              "return (synth, bufferIndex, roundedSamplesPerTick, tone, instrumentState) => {" +
              s.join("\n") +
              "}";
            be.fmSynthFunctionCache[t] = new Function("Config", "Synth", i)(
              h,
              be
            );
          }
          return be.fm6SynthFunctionCache[t];
        }
        throw new Error("Unrecognized instrument type: " + e.type);
      }
      static wrap(e, t) {
        return ((e % t) + t) % t;
      }
      static loopableChipSynth(e, t, s, i, n) {
        const a = P(n.effects) && n.aliases,
          o = e.tempMonoInstrumentSampleBuffer,
          r = n.wave,
          l = n.volumeScale,
          h = a && 8 == n.type ? r.length : r.length - 1;
        let c = Math.max(0, Math.min(h, n.chipWaveLoopEnd)),
          u = Math.max(0, Math.min(c - 1, n.chipWaveLoopStart)),
          p = c - u;
        p < 2 && ((u = 0), (c = h), (p = h));
        const f = n.chipWaveLoopMode,
          m = n.chipWavePlayBackwards,
          d = i.specialIntervalExpressionMult * n.unison.sign;
        1 != n.unison.voices ||
          n.chord.customInterval ||
          (i.phases[1] = i.phases[0]);
        let y = i.phaseDeltas[0] * h,
          v = i.phaseDeltas[1] * h,
          g = i.directions[0],
          b = i.directions[1],
          S = i.chipWaveCompletions[0],
          M = i.chipWaveCompletions[1];
        (3 !== f && 2 !== f && 0 !== f) ||
          (m ? ((g = -1), (b = -1)) : ((g = 1), (b = 1))),
          (0 !== f && 1 !== f) || ((S = 0), (M = 0));
        let w = i.chipWaveCompletionsLastWave[0],
          k = i.chipWaveCompletionsLastWave[1];
        const x = 1e3,
          F = +i.phaseDeltaScales[0],
          I = +i.phaseDeltaScales[1];
        let q = +i.expression;
        const T = +i.expressionDelta;
        let D = be.wrap(i.phases[0], 1) * h,
          O = be.wrap(i.phases[1], 1) * h,
          R = 0,
          z = 0;
        if (!a) {
          const e = Math.floor(D),
            t = Math.floor(O),
            s = be.wrap(e, h),
            i = be.wrap(t, h),
            n = D - e,
            a = O - t;
          (R = +r[s]),
            (z = +r[i]),
            (R += (r[be.wrap(s + 1, h)] - R) * n),
            (z += (r[be.wrap(i + 1, h)] - z) * a);
        }
        const C = i.noteFilters,
          E = 0 | i.noteFilterCount;
        let A = +i.initialNoteFilterInput1,
          H = +i.initialNoteFilterInput2;
        const L = be.applyFilters,
          N = t + s;
        let G = i.chipWavePrevWaves[0],
          V = i.chipWavePrevWaves[1];
        for (let e = t; e < N; e++) {
          S > 0 && S < x && S++, M > 0 && M < x && M++;
          let t = 0;
          (D += y * g),
            (O += v * b),
            2 === f
              ? (1 === g
                  ? D > h && (S <= 0 && ((w = G), S++), (t = 1))
                  : -1 === g && D < 0 && (S <= 0 && ((w = G), S++), (t = 1)),
                1 === b
                  ? O > h && (M <= 0 && ((k = V), M++), (t = 1))
                  : -1 === g && O < 0 && (M <= 0 && ((k = V), M++), (t = 1)))
              : 3 === f
              ? (1 === g
                  ? D > c && (S <= 0 && ((w = G), S++), (t = 1))
                  : -1 === g && D < u && (S <= 0 && ((w = G), S++), (t = 1)),
                1 === b
                  ? O > c && (M <= 0 && ((k = V), M++), (t = 1))
                  : -1 === g && O < u && (M <= 0 && ((k = V), M++), (t = 1)))
              : 0 === f
              ? (1 === g
                  ? D > c && ((D = u + be.wrap(D - c, p)), (t = 1))
                  : -1 === g && D < u && ((D = c - be.wrap(u - D, p)), (t = 1)),
                1 === b
                  ? O > c && ((O = u + be.wrap(O - c, p)), (t = 1))
                  : -1 === b && O < u && ((O = c - be.wrap(u - O, p)), (t = 1)))
              : 1 === f &&
                (1 === g
                  ? D > c && ((D = c - be.wrap(D - c, p)), (g = -1), (t = 1))
                  : -1 === g &&
                    D < u &&
                    ((D = u + be.wrap(u - D, p)), (g = 1), (t = 1)),
                1 === b
                  ? O > c && ((O = c - be.wrap(O - c, p)), (b = -1), (t = 1))
                  : -1 === b &&
                    O < u &&
                    ((O = u + be.wrap(u - O, p)), (b = 1), (t = 1)));
          let s = 0,
            i = 0,
            n = 0;
          if (a) {
            (s = r[be.wrap(Math.floor(D), h)]),
              (i = r[be.wrap(Math.floor(O), h)]),
              (G = s),
              (V = i);
            const e = S > 0 ? (x - Math.min(S, x)) / x : 1,
              t = M > 0 ? (x - Math.min(M, x)) / x : 1;
            (n = 0), (n += S > 0 ? w * e : s), (n += M > 0 ? k * t : i);
          } else {
            const e = Math.floor(D),
              a = Math.floor(O),
              o = be.wrap(e, h),
              l = be.wrap(a, h);
            let p = r[o],
              m = r[l];
            const P = D - e,
              F = O - a;
            if (
              ((p += (r[be.wrap(o + 1, h)] - p) * P),
              (m += (r[be.wrap(l + 1, h)] - m) * F),
              (0 !== f || 0 !== u || c !== h) && 0 !== t)
            ) {
              let e = 0,
                t = 0;
              const s = Math.max(0, D - y * g),
                i = Math.max(0, O - v * b),
                n = Math.floor(s),
                a = Math.floor(i),
                o = be.wrap(n, h),
                l = be.wrap(a, h);
              (e = r[o]),
                (t = r[l]),
                (e += (r[be.wrap(o + 1, h)] - e) * (s - n) * g),
                (t += (r[be.wrap(l + 1, h)] - t) * (i - a) * b),
                (R = e),
                (z = t);
            }
            1 === f && 0 !== t
              ? ((s = G), (i = V))
              : ((s = (p - R) / (y * g)), (i = (m - z) / (v * b))),
              (G = s),
              (V = i),
              (R = p),
              (z = m);
            const I = S > 0 ? (x - Math.min(S, x)) / x : 1,
              q = M > 0 ? (x - Math.min(M, x)) / x : 1;
            (n += S > 0 ? w * I : s), (n += M > 0 ? k * q : i * d);
          }
          const m = L(n * l, A, H, E, C);
          (H = A), (A = n * l), (y *= F), (v *= I);
          const P = m * q;
          (q += T), (o[e] += P);
        }
        (i.phases[0] = D / h),
          (i.phases[1] = O / h),
          (i.phaseDeltas[0] = y / h),
          (i.phaseDeltas[1] = v / h),
          (i.directions[0] = g),
          (i.directions[1] = b),
          (i.chipWaveCompletions[0] = S),
          (i.chipWaveCompletions[1] = M),
          (i.chipWavePrevWaves[0] = G),
          (i.chipWavePrevWaves[1] = V),
          (i.chipWaveCompletionsLastWave[0] = w),
          (i.chipWaveCompletionsLastWave[1] = k),
          (i.expression = q),
          e.sanitizeFilters(C),
          (i.initialNoteFilterInput1 = A),
          (i.initialNoteFilterInput2 = H);
      }
      static chipSynth(e, t, s, i, n) {
        const a = P(n.effects) && n.aliases,
          o = e.tempMonoInstrumentSampleBuffer,
          r = n.wave,
          l = n.volumeScale,
          h = a && 8 == n.type ? r.length : r.length - 1,
          c = i.specialIntervalExpressionMult * n.unison.sign;
        1 != n.unison.voices ||
          n.chord.customInterval ||
          (i.phases[1] = i.phases[0]);
        let u = i.phaseDeltas[0] * h,
          p = i.phaseDeltas[1] * h;
        const f = +i.phaseDeltaScales[0],
          m = +i.phaseDeltaScales[1];
        let d = +i.expression;
        const y = +i.expressionDelta;
        let v = (i.phases[0] % 1) * h,
          g = (i.phases[1] % 1) * h;
        const b = i.noteFilters,
          S = 0 | i.noteFilterCount;
        let M = +i.initialNoteFilterInput1,
          w = +i.initialNoteFilterInput2;
        const k = be.applyFilters;
        let x = 0,
          F = 0;
        if (!a) {
          const e = 0 | v,
            t = 0 | g,
            s = e % h,
            i = t % h,
            n = v - e,
            a = g - t;
          (x = +r[s]),
            (F = +r[i]),
            (x += (r[s + 1] - x) * n),
            (F += (r[i + 1] - F) * a);
        }
        const I = t + s;
        for (let e = t; e < I; e++) {
          let t, s, i;
          if (((v += u), (g += p), a))
            (t = r[(0 | v) % h]), (s = r[(0 | g) % h]), (i = t + s);
          else {
            const e = 0 | v,
              n = 0 | g,
              a = e % h,
              o = n % h;
            let l = r[a],
              f = r[o];
            const m = v - e,
              d = g - n;
            (l += (r[a + 1] - l) * m),
              (f += (r[o + 1] - f) * d),
              (t = (l - x) / u),
              (s = (f - F) / p),
              (x = l),
              (F = f),
              (i = t + s * c);
          }
          const n = k(i * l, M, w, S, b);
          (w = M), (M = i * l), (u *= f), (p *= m);
          const P = n * d;
          (d += y), (o[e] += P);
        }
        (i.phases[0] = v / h),
          (i.phases[1] = g / h),
          (i.phaseDeltas[0] = u / h),
          (i.phaseDeltas[1] = p / h),
          (i.expression = d),
          e.sanitizeFilters(b),
          (i.initialNoteFilterInput1 = M),
          (i.initialNoteFilterInput2 = w);
      }
      static harmonicsSynth(e, t, s, i, n) {
        const a = e.tempMonoInstrumentSampleBuffer,
          o = n.wave,
          r = o.length - 1,
          l = i.specialIntervalExpressionMult * n.unison.sign;
        1 != n.unison.voices ||
          n.chord.customInterval ||
          (i.phases[1] = i.phases[0]);
        let h = i.phaseDeltas[0] * r,
          c = i.phaseDeltas[1] * r;
        const u = +i.phaseDeltaScales[0],
          p = +i.phaseDeltaScales[1];
        let f = +i.expression;
        const m = +i.expressionDelta;
        let d = (i.phases[0] % 1) * r,
          y = (i.phases[1] % 1) * r;
        const v = i.noteFilters,
          g = 0 | i.noteFilterCount;
        let b = +i.initialNoteFilterInput1,
          S = +i.initialNoteFilterInput2;
        const M = be.applyFilters,
          w = 0 | d,
          k = 0 | y,
          x = w % r,
          P = k % r,
          F = d - w,
          I = y - k;
        let q = +o[x],
          T = +o[P];
        (q += (o[x + 1] - q) * F), (T += (o[P + 1] - T) * I);
        const D = t + s;
        for (let e = t; e < D; e++) {
          (d += h), (y += c);
          const t = 0 | d,
            s = 0 | y,
            i = t % r,
            n = s % r;
          let w = o[i],
            k = o[n];
          const x = d - t,
            P = y - s;
          (w += (o[i + 1] - w) * x), (k += (o[n + 1] - k) * P);
          const F = (w - q) / h,
            I = (k - T) / c;
          (q = w), (T = k);
          const D = F + I * l,
            O = M(D, b, S, g, v);
          (S = b), (b = D), (h *= u), (c *= p);
          const R = O * f;
          (f += m), (a[e] += R);
        }
        (i.phases[0] = d / r),
          (i.phases[1] = y / r),
          (i.phaseDeltas[0] = h / r),
          (i.phaseDeltas[1] = c / r),
          (i.expression = f),
          e.sanitizeFilters(v),
          (i.initialNoteFilterInput1 = b),
          (i.initialNoteFilterInput2 = S);
      }
      static pickedStringSynth(e, t, s, i, n) {
        const a = n.unison.voices;
        let o = be.pickedStringFunctionCache[a];
        if (null == o) {
          let e =
            "return (synth, bufferIndex, runLength, tone, instrumentState) => {";
          e +=
            "\n\t\t\t\tconst data = synth.tempMonoInstrumentSampleBuffer;\n\t\t\t\t\n\t\t\t\tlet pickedString# = tone.pickedStrings[#];\n\t\t\t\tlet allPassSample# = +pickedString#.allPassSample;\n\t\t\t\tlet allPassPrevInput# = +pickedString#.allPassPrevInput;\n\t\t\t\tlet shelfSample# = +pickedString#.shelfSample;\n\t\t\t\tlet shelfPrevInput# = +pickedString#.shelfPrevInput;\n\t\t\t\tlet fractionalDelaySample# = +pickedString#.fractionalDelaySample;\n\t\t\t\tconst delayLine# = pickedString#.delayLine;\n\t\t\t\tconst delayBufferMask# = (delayLine#.length - 1) >> 0;\n\t\t\t\tlet delayIndex# = pickedString#.delayIndex|0;\n\t\t\t\tdelayIndex# = (delayIndex# & delayBufferMask#) + delayLine#.length;\n\t\t\t\tlet delayLength# = +pickedString#.prevDelayLength;\n\t\t\t\tconst delayLengthDelta# = +pickedString#.delayLengthDelta;\n\t\t\t\tlet allPassG# = +pickedString#.allPassG;\n\t\t\t\tlet shelfA1# = +pickedString#.shelfA1;\n\t\t\t\tlet shelfB0# = +pickedString#.shelfB0;\n\t\t\t\tlet shelfB1# = +pickedString#.shelfB1;\n\t\t\t\tconst allPassGDelta# = +pickedString#.allPassGDelta;\n\t\t\t\tconst shelfA1Delta# = +pickedString#.shelfA1Delta;\n\t\t\t\tconst shelfB0Delta# = +pickedString#.shelfB0Delta;\n\t\t\t\tconst shelfB1Delta# = +pickedString#.shelfB1Delta;\n\t\t\t\t\n\t\t\t\tlet expression = +tone.expression;\n\t\t\t\tconst expressionDelta = +tone.expressionDelta;\n\t\t\t\t\n\t\t\t\tconst unisonSign = tone.specialIntervalExpressionMult * instrumentState.unison.sign;\n\t\t\t\tconst delayResetOffset# = pickedString#.delayResetOffset|0;\n\t\t\t\t\n\t\t\t\tconst filters = tone.noteFilters;\n\t\t\t\tconst filterCount = tone.noteFilterCount|0;\n\t\t\t\tlet initialFilterInput1 = +tone.initialNoteFilterInput1;\n\t\t\t\tlet initialFilterInput2 = +tone.initialNoteFilterInput2;\n\t\t\t\tconst applyFilters = Synth.applyFilters;\n\t\t\t\t\n\t\t\t\tconst stopIndex = bufferIndex + runLength;\n\t\t\t\tfor (let sampleIndex = bufferIndex; sampleIndex < stopIndex; sampleIndex++) {\n\t\t\t\t\tconst targetSampleTime# = delayIndex# - delayLength#;\n\t\t\t\t\tconst lowerIndex# = (targetSampleTime# + 0.125) | 0; // Offset to improve stability of all-pass filter.\n\t\t\t\t\tconst upperIndex# = lowerIndex# + 1;\n\t\t\t\t\tconst fractionalDelay# = upperIndex# - targetSampleTime#;\n\t\t\t\t\tconst fractionalDelayG# = (1.0 - fractionalDelay#) / (1.0 + fractionalDelay#); // Inlined version of FilterCoefficients.prototype.allPass1stOrderFractionalDelay\n\t\t\t\t\tconst prevInput# = delayLine#[lowerIndex# & delayBufferMask#];\n\t\t\t\t\tconst input# = delayLine#[upperIndex# & delayBufferMask#];\n\t\t\t\t\tfractionalDelaySample# = fractionalDelayG# * input# + prevInput# - fractionalDelayG# * fractionalDelaySample#;\n\t\t\t\t\t\n\t\t\t\t\tallPassSample# = fractionalDelaySample# * allPassG# + allPassPrevInput# - allPassG# * allPassSample#;\n\t\t\t\t\tallPassPrevInput# = fractionalDelaySample#;\n\t\t\t\t\t\n\t\t\t\t\tshelfSample# = shelfB0# * allPassSample# + shelfB1# * shelfPrevInput# - shelfA1# * shelfSample#;\n\t\t\t\t\tshelfPrevInput# = allPassSample#;\n\t\t\t\t\t\n\t\t\t\t\tdelayLine#[delayIndex# & delayBufferMask#] += shelfSample#;\n\t\t\t\t\tdelayLine#[(delayIndex# + delayResetOffset#) & delayBufferMask#] = 0.0;\n\t\t\t\t\tdelayIndex#++;\n\t\t\t\t\t\n\t\t\t\t\tconst inputSample = (";
          const t = [];
          for (let e = 0; e < a; e++)
            t.push(
              "fractionalDelaySample" + e + (1 == e ? " * unisonSign" : "")
            );
          (e += t.join(" + ")),
            (e +=
              ") * expression;\n\t\t\t\t\tconst sample = applyFilters(inputSample, initialFilterInput1, initialFilterInput2, filterCount, filters);\n\t\t\t\t\tinitialFilterInput2 = initialFilterInput1;\n\t\t\t\t\tinitialFilterInput1 = inputSample;\n\t\t\t\t\tdata[sampleIndex] += sample;\n\t\t\t\t\t\n\t\t\t\t\texpression += expressionDelta;\n\t\t\t\t\tdelayLength# += delayLengthDelta#;\n\t\t\t\t\tallPassG# += allPassGDelta#;\n\t\t\t\t\tshelfA1# += shelfA1Delta#;\n\t\t\t\t\tshelfB0# += shelfB0Delta#;\n\t\t\t\t\tshelfB1# += shelfB1Delta#;\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\t// Avoid persistent denormal or NaN values in the delay buffers and filter history.\n\t\t\t\tconst epsilon = (1.0e-24);\n\t\t\t\tif (!Number.isFinite(allPassSample#) || Math.abs(allPassSample#) < epsilon) allPassSample# = 0.0;\n\t\t\t\tif (!Number.isFinite(allPassPrevInput#) || Math.abs(allPassPrevInput#) < epsilon) allPassPrevInput# = 0.0;\n\t\t\t\tif (!Number.isFinite(shelfSample#) || Math.abs(shelfSample#) < epsilon) shelfSample# = 0.0;\n\t\t\t\tif (!Number.isFinite(shelfPrevInput#) || Math.abs(shelfPrevInput#) < epsilon) shelfPrevInput# = 0.0;\n\t\t\t\tif (!Number.isFinite(fractionalDelaySample#) || Math.abs(fractionalDelaySample#) < epsilon) fractionalDelaySample# = 0.0;\n\t\t\t\tpickedString#.allPassSample = allPassSample#;\n\t\t\t\tpickedString#.allPassPrevInput = allPassPrevInput#;\n\t\t\t\tpickedString#.shelfSample = shelfSample#;\n\t\t\t\tpickedString#.shelfPrevInput = shelfPrevInput#;\n\t\t\t\tpickedString#.fractionalDelaySample = fractionalDelaySample#;\n\t\t\t\tpickedString#.delayIndex = delayIndex#;\n\t\t\t\tpickedString#.prevDelayLength = delayLength#;\n\t\t\t\tpickedString#.allPassG = allPassG#;\n\t\t\t\tpickedString#.shelfA1 = shelfA1#;\n\t\t\t\tpickedString#.shelfB0 = shelfB0#;\n\t\t\t\tpickedString#.shelfB1 = shelfB1#;\n\t\t\t\t\n\t\t\t\ttone.expression = expression;\n\t\t\t\t\n\t\t\t\tsynth.sanitizeFilters(filters);\n\t\t\t\ttone.initialNoteFilterInput1 = initialFilterInput1;\n\t\t\t\ttone.initialNoteFilterInput2 = initialFilterInput2;\n            }"),
            (e = e.replace(/^.*\#.*$/gm, (e) => {
              const t = [];
              for (let s = 0; s < a; s++) t.push(e.replace(/\#/g, String(s)));
              return t.join("\n");
            })),
            (o = new Function("Config", "Synth", e)(h, be)),
            (be.pickedStringFunctionCache[a] = o);
        }
        o(e, t, s, i, n);
      }
      static effectsSynth(e, t, s, i, n, a) {
        const o = P(a.effects),
          r = F(a.effects),
          l = a.eqFilterCount > 0,
          c = I(a.effects),
          u = q(a.effects),
          p = T(a.effects),
          f = D(a.effects);
        let m = 0;
        o && (m |= 1),
          (m <<= 1),
          r && (m |= 1),
          (m <<= 1),
          l && (m |= 1),
          (m <<= 1),
          c && (m |= 1),
          (m <<= 1),
          u && (m |= 1),
          (m <<= 1),
          p && (m |= 1),
          (m <<= 1),
          f && (m |= 1);
        let d = be.effectsFunctionCache[m];
        if (null == d) {
          let e =
            "return (synth, outputDataL, outputDataR, bufferIndex, runLength, instrumentState) => {";
          const t = u || f || p;
          (e +=
            "\n\t\t\t\tconst tempMonoInstrumentSampleBuffer = synth.tempMonoInstrumentSampleBuffer;\n\t\t\t\t\n\t\t\t\tlet mixVolume = +instrumentState.mixVolume;\n\t\t\t\tconst mixVolumeDelta = +instrumentState.mixVolumeDelta;"),
            t &&
              (e +=
                "\n\t\t\t\t\n\t\t\t\tlet delayInputMult = +instrumentState.delayInputMult;\n\t\t\t\tconst delayInputMultDelta = +instrumentState.delayInputMultDelta;"),
            o &&
              (e +=
                "\n\t\t\t\t\n\t\t\t\tconst distortionBaseVolume = +Config.distortionBaseVolume;\n\t\t\t\tlet distortion = instrumentState.distortion;\n\t\t\t\tconst distortionDelta = instrumentState.distortionDelta;\n\t\t\t\tlet distortionDrive = instrumentState.distortionDrive;\n\t\t\t\tconst distortionDriveDelta = instrumentState.distortionDriveDelta;\n\t\t\t\tconst distortionFractionalResolution = 4.0;\n\t\t\t\tconst distortionOversampleCompensation = distortionBaseVolume / distortionFractionalResolution;\n\t\t\t\tconst distortionFractionalDelay1 = 1.0 / distortionFractionalResolution;\n\t\t\t\tconst distortionFractionalDelay2 = 2.0 / distortionFractionalResolution;\n\t\t\t\tconst distortionFractionalDelay3 = 3.0 / distortionFractionalResolution;\n\t\t\t\tconst distortionFractionalDelayG1 = (1.0 - distortionFractionalDelay1) / (1.0 + distortionFractionalDelay1); // Inlined version of FilterCoefficients.prototype.allPass1stOrderFractionalDelay\n\t\t\t\tconst distortionFractionalDelayG2 = (1.0 - distortionFractionalDelay2) / (1.0 + distortionFractionalDelay2); // Inlined version of FilterCoefficients.prototype.allPass1stOrderFractionalDelay\n\t\t\t\tconst distortionFractionalDelayG3 = (1.0 - distortionFractionalDelay3) / (1.0 + distortionFractionalDelay3); // Inlined version of FilterCoefficients.prototype.allPass1stOrderFractionalDelay\n\t\t\t\tconst distortionNextOutputWeight1 = Math.cos(Math.PI * distortionFractionalDelay1) * 0.5 + 0.5;\n\t\t\t\tconst distortionNextOutputWeight2 = Math.cos(Math.PI * distortionFractionalDelay2) * 0.5 + 0.5;\n\t\t\t\tconst distortionNextOutputWeight3 = Math.cos(Math.PI * distortionFractionalDelay3) * 0.5 + 0.5;\n\t\t\t\tconst distortionPrevOutputWeight1 = 1.0 - distortionNextOutputWeight1;\n\t\t\t\tconst distortionPrevOutputWeight2 = 1.0 - distortionNextOutputWeight2;\n\t\t\t\tconst distortionPrevOutputWeight3 = 1.0 - distortionNextOutputWeight3;\n\t\t\t\t\n\t\t\t\tlet distortionFractionalInput1 = +instrumentState.distortionFractionalInput1;\n\t\t\t\tlet distortionFractionalInput2 = +instrumentState.distortionFractionalInput2;\n\t\t\t\tlet distortionFractionalInput3 = +instrumentState.distortionFractionalInput3;\n\t\t\t\tlet distortionPrevInput = +instrumentState.distortionPrevInput;\n\t\t\t\tlet distortionNextOutput = +instrumentState.distortionNextOutput;"),
            r &&
              (e +=
                "\n\t\t\t\t\n\t\t\t\tlet bitcrusherPrevInput = +instrumentState.bitcrusherPrevInput;\n\t\t\t\tlet bitcrusherCurrentOutput = +instrumentState.bitcrusherCurrentOutput;\n\t\t\t\tlet bitcrusherPhase = +instrumentState.bitcrusherPhase;\n\t\t\t\tlet bitcrusherPhaseDelta = +instrumentState.bitcrusherPhaseDelta;\n\t\t\t\tconst bitcrusherPhaseDeltaScale = +instrumentState.bitcrusherPhaseDeltaScale;\n\t\t\t\tlet bitcrusherScale = +instrumentState.bitcrusherScale;\n\t\t\t\tconst bitcrusherScaleScale = +instrumentState.bitcrusherScaleScale;\n\t\t\t\tlet bitcrusherFoldLevel = +instrumentState.bitcrusherFoldLevel;\n\t\t\t\tconst bitcrusherFoldLevelScale = +instrumentState.bitcrusherFoldLevelScale;"),
            l &&
              (e +=
                "\n\t\t\t\t\n\t\t\t\tlet filters = instrumentState.eqFilters;\n\t\t\t\tconst filterCount = instrumentState.eqFilterCount|0;\n\t\t\t\tlet initialFilterInput1 = +instrumentState.initialEqFilterInput1;\n\t\t\t\tlet initialFilterInput2 = +instrumentState.initialEqFilterInput2;\n\t\t\t\tconst applyFilters = Synth.applyFilters;"),
            (e +=
              "\n\t\t\t\t\n\t\t\t\tlet eqFilterVolume = +instrumentState.eqFilterVolume;\n\t\t\t\tconst eqFilterVolumeDelta = +instrumentState.eqFilterVolumeDelta;"),
            c &&
              (e +=
                "\n\t\t\t\t\n\t\t\t\tconst panningMask = synth.panningDelayBufferMask >>> 0;\n\t\t\t\tconst panningDelayLine = instrumentState.panningDelayLine;\n\t\t\t\tlet panningDelayPos = instrumentState.panningDelayPos & panningMask;\n\t\t\t\tlet   panningVolumeL      = +instrumentState.panningVolumeL;\n\t\t\t\tlet   panningVolumeR      = +instrumentState.panningVolumeR;\n\t\t\t\tconst panningVolumeDeltaL = +instrumentState.panningVolumeDeltaL;\n\t\t\t\tconst panningVolumeDeltaR = +instrumentState.panningVolumeDeltaR;\n\t\t\t\tlet   panningOffsetL      = +instrumentState.panningOffsetL;\n\t\t\t\tlet   panningOffsetR      = +instrumentState.panningOffsetR;\n\t\t\t\tconst panningOffsetDeltaL = 1.0 - instrumentState.panningOffsetDeltaL;\n\t\t\t\tconst panningOffsetDeltaR = 1.0 - instrumentState.panningOffsetDeltaR;"),
            u &&
              (e +=
                "\n\t\t\t\t\n\t\t\t\tconst chorusMask = synth.chorusDelayBufferMask >>> 0;\n\t\t\t\tconst chorusDelayLineL = instrumentState.chorusDelayLineL;\n\t\t\t\tconst chorusDelayLineR = instrumentState.chorusDelayLineR;\n\t\t\t\tinstrumentState.chorusDelayLineDirty = true;\n\t\t\t\tlet chorusDelayPos = instrumentState.chorusDelayPos & chorusMask;\n\t\t\t\t\n\t\t\t\tlet chorusVoiceMult = +instrumentState.chorusVoiceMult;\n\t\t\t\tconst chorusVoiceMultDelta = +instrumentState.chorusVoiceMultDelta;\n\t\t\t\tlet chorusCombinedMult = +instrumentState.chorusCombinedMult;\n\t\t\t\tconst chorusCombinedMultDelta = +instrumentState.chorusCombinedMultDelta;\n\t\t\t\t\n\t\t\t\tconst chorusDuration = +Config.chorusPeriodSeconds;\n\t\t\t\tconst chorusAngle = Math.PI * 2.0 / (chorusDuration * synth.samplesPerSecond);\n\t\t\t\tconst chorusRange = synth.samplesPerSecond * Config.chorusDelayRange;\n\t\t\t\tconst chorusOffset0 = synth.chorusDelayBufferSize - Config.chorusDelayOffsets[0][0] * chorusRange;\n\t\t\t\tconst chorusOffset1 = synth.chorusDelayBufferSize - Config.chorusDelayOffsets[0][1] * chorusRange;\n\t\t\t\tconst chorusOffset2 = synth.chorusDelayBufferSize - Config.chorusDelayOffsets[0][2] * chorusRange;\n\t\t\t\tconst chorusOffset3 = synth.chorusDelayBufferSize - Config.chorusDelayOffsets[1][0] * chorusRange;\n\t\t\t\tconst chorusOffset4 = synth.chorusDelayBufferSize - Config.chorusDelayOffsets[1][1] * chorusRange;\n\t\t\t\tconst chorusOffset5 = synth.chorusDelayBufferSize - Config.chorusDelayOffsets[1][2] * chorusRange;\n\t\t\t\tlet chorusPhase = instrumentState.chorusPhase % (Math.PI * 2.0);\n\t\t\t\tlet chorusTap0Index = chorusDelayPos + chorusOffset0 - chorusRange * Math.sin(chorusPhase + Config.chorusPhaseOffsets[0][0]);\n\t\t\t\tlet chorusTap1Index = chorusDelayPos + chorusOffset1 - chorusRange * Math.sin(chorusPhase + Config.chorusPhaseOffsets[0][1]);\n\t\t\t\tlet chorusTap2Index = chorusDelayPos + chorusOffset2 - chorusRange * Math.sin(chorusPhase + Config.chorusPhaseOffsets[0][2]);\n\t\t\t\tlet chorusTap3Index = chorusDelayPos + chorusOffset3 - chorusRange * Math.sin(chorusPhase + Config.chorusPhaseOffsets[1][0]);\n\t\t\t\tlet chorusTap4Index = chorusDelayPos + chorusOffset4 - chorusRange * Math.sin(chorusPhase + Config.chorusPhaseOffsets[1][1]);\n\t\t\t\tlet chorusTap5Index = chorusDelayPos + chorusOffset5 - chorusRange * Math.sin(chorusPhase + Config.chorusPhaseOffsets[1][2]);\n\t\t\t\tchorusPhase += chorusAngle * runLength;\n\t\t\t\tconst chorusTap0End = chorusDelayPos + chorusOffset0 - chorusRange * Math.sin(chorusPhase + Config.chorusPhaseOffsets[0][0]) + runLength;\n\t\t\t\tconst chorusTap1End = chorusDelayPos + chorusOffset1 - chorusRange * Math.sin(chorusPhase + Config.chorusPhaseOffsets[0][1]) + runLength;\n\t\t\t\tconst chorusTap2End = chorusDelayPos + chorusOffset2 - chorusRange * Math.sin(chorusPhase + Config.chorusPhaseOffsets[0][2]) + runLength;\n\t\t\t\tconst chorusTap3End = chorusDelayPos + chorusOffset3 - chorusRange * Math.sin(chorusPhase + Config.chorusPhaseOffsets[1][0]) + runLength;\n\t\t\t\tconst chorusTap4End = chorusDelayPos + chorusOffset4 - chorusRange * Math.sin(chorusPhase + Config.chorusPhaseOffsets[1][1]) + runLength;\n\t\t\t\tconst chorusTap5End = chorusDelayPos + chorusOffset5 - chorusRange * Math.sin(chorusPhase + Config.chorusPhaseOffsets[1][2]) + runLength;\n\t\t\t\tconst chorusTap0Delta = (chorusTap0End - chorusTap0Index) / runLength;\n\t\t\t\tconst chorusTap1Delta = (chorusTap1End - chorusTap1Index) / runLength;\n\t\t\t\tconst chorusTap2Delta = (chorusTap2End - chorusTap2Index) / runLength;\n\t\t\t\tconst chorusTap3Delta = (chorusTap3End - chorusTap3Index) / runLength;\n\t\t\t\tconst chorusTap4Delta = (chorusTap4End - chorusTap4Index) / runLength;\n\t\t\t\tconst chorusTap5Delta = (chorusTap5End - chorusTap5Index) / runLength;"),
            p &&
              (e +=
                "\n\t\t\t\t\n\t\t\t\tlet echoMult = +instrumentState.echoMult;\n\t\t\t\tconst echoMultDelta = +instrumentState.echoMultDelta;\n\t\t\t\t\n\t\t\t\tconst echoDelayLineL = instrumentState.echoDelayLineL;\n\t\t\t\tconst echoDelayLineR = instrumentState.echoDelayLineR;\n\t\t\t\tconst echoMask = (echoDelayLineL.length - 1) >>> 0;\n\t\t\t\tinstrumentState.echoDelayLineDirty = true;\n\t\t\t\t\n\t\t\t\tlet echoDelayPos = instrumentState.echoDelayPos & echoMask;\n\t\t\t\tconst echoDelayOffsetStart = (echoDelayLineL.length - instrumentState.echoDelayOffsetStart) & echoMask;\n\t\t\t\tconst echoDelayOffsetEnd   = (echoDelayLineL.length - instrumentState.echoDelayOffsetEnd) & echoMask;\n\t\t\t\tlet echoDelayOffsetRatio = +instrumentState.echoDelayOffsetRatio;\n\t\t\t\tconst echoDelayOffsetRatioDelta = +instrumentState.echoDelayOffsetRatioDelta;\n\t\t\t\t\n\t\t\t\tconst echoShelfA1 = +instrumentState.echoShelfA1;\n\t\t\t\tconst echoShelfB0 = +instrumentState.echoShelfB0;\n\t\t\t\tconst echoShelfB1 = +instrumentState.echoShelfB1;\n\t\t\t\tlet echoShelfSampleL = +instrumentState.echoShelfSampleL;\n\t\t\t\tlet echoShelfSampleR = +instrumentState.echoShelfSampleR;\n\t\t\t\tlet echoShelfPrevInputL = +instrumentState.echoShelfPrevInputL;\n\t\t\t\tlet echoShelfPrevInputR = +instrumentState.echoShelfPrevInputR;"),
            f &&
              (e +=
                "\n\t\t\t\t\n\t\t\t\tconst reverbMask = Config.reverbDelayBufferMask >>> 0; //TODO: Dynamic reverb buffer size.\n\t\t\t\tconst reverbDelayLine = instrumentState.reverbDelayLine;\n\t\t\t\tinstrumentState.reverbDelayLineDirty = true;\n\t\t\t\tlet reverbDelayPos = instrumentState.reverbDelayPos & reverbMask;\n\t\t\t\t\n\t\t\t\tlet reverb = +instrumentState.reverbMult;\n\t\t\t\tconst reverbDelta = +instrumentState.reverbMultDelta;\n\t\t\t\t\n\t\t\t\tconst reverbShelfA1 = +instrumentState.reverbShelfA1;\n\t\t\t\tconst reverbShelfB0 = +instrumentState.reverbShelfB0;\n\t\t\t\tconst reverbShelfB1 = +instrumentState.reverbShelfB1;\n\t\t\t\tlet reverbShelfSample0 = +instrumentState.reverbShelfSample0;\n\t\t\t\tlet reverbShelfSample1 = +instrumentState.reverbShelfSample1;\n\t\t\t\tlet reverbShelfSample2 = +instrumentState.reverbShelfSample2;\n\t\t\t\tlet reverbShelfSample3 = +instrumentState.reverbShelfSample3;\n\t\t\t\tlet reverbShelfPrevInput0 = +instrumentState.reverbShelfPrevInput0;\n\t\t\t\tlet reverbShelfPrevInput1 = +instrumentState.reverbShelfPrevInput1;\n\t\t\t\tlet reverbShelfPrevInput2 = +instrumentState.reverbShelfPrevInput2;\n\t\t\t\tlet reverbShelfPrevInput3 = +instrumentState.reverbShelfPrevInput3;"),
            (e +=
              "\n\t\t\t\t\n\t\t\t\tconst stopIndex = bufferIndex + runLength;\n\t\t\t\tfor (let sampleIndex = bufferIndex; sampleIndex < stopIndex; sampleIndex++) {\n\t\t\t\t\tlet sample = tempMonoInstrumentSampleBuffer[sampleIndex];\n\t\t\t\t\ttempMonoInstrumentSampleBuffer[sampleIndex] = 0.0;"),
            o &&
              (e +=
                "\n\t\t\t\t\t\n\t\t\t\t\tconst distortionReverse = 1.0 - distortion;\n\t\t\t\t\tconst distortionNextInput = sample * distortionDrive;\n\t\t\t\t\tsample = distortionNextOutput;\n\t\t\t\t\tdistortionNextOutput = distortionNextInput / (distortionReverse * Math.abs(distortionNextInput) + distortion);\n\t\t\t\t\tdistortionFractionalInput1 = distortionFractionalDelayG1 * distortionNextInput + distortionPrevInput - distortionFractionalDelayG1 * distortionFractionalInput1;\n\t\t\t\t\tdistortionFractionalInput2 = distortionFractionalDelayG2 * distortionNextInput + distortionPrevInput - distortionFractionalDelayG2 * distortionFractionalInput2;\n\t\t\t\t\tdistortionFractionalInput3 = distortionFractionalDelayG3 * distortionNextInput + distortionPrevInput - distortionFractionalDelayG3 * distortionFractionalInput3;\n\t\t\t\t\tconst distortionOutput1 = distortionFractionalInput1 / (distortionReverse * Math.abs(distortionFractionalInput1) + distortion);\n\t\t\t\t\tconst distortionOutput2 = distortionFractionalInput2 / (distortionReverse * Math.abs(distortionFractionalInput2) + distortion);\n\t\t\t\t\tconst distortionOutput3 = distortionFractionalInput3 / (distortionReverse * Math.abs(distortionFractionalInput3) + distortion);\n\t\t\t\t\tdistortionNextOutput += distortionOutput1 * distortionNextOutputWeight1 + distortionOutput2 * distortionNextOutputWeight2 + distortionOutput3 * distortionNextOutputWeight3;\n\t\t\t\t\tsample += distortionOutput1 * distortionPrevOutputWeight1 + distortionOutput2 * distortionPrevOutputWeight2 + distortionOutput3 * distortionPrevOutputWeight3;\n\t\t\t\t\tsample *= distortionOversampleCompensation;\n\t\t\t\t\tdistortionPrevInput = distortionNextInput;\n\t\t\t\t\tdistortion += distortionDelta;\n\t\t\t\t\tdistortionDrive += distortionDriveDelta;"),
            r &&
              (e +=
                "\n\t\t\t\t\t\n\t\t\t\t\tbitcrusherPhase += bitcrusherPhaseDelta;\n\t\t\t\t\tif (bitcrusherPhase < 1.0) {\n\t\t\t\t\t\tbitcrusherPrevInput = sample;\n\t\t\t\t\t\tsample = bitcrusherCurrentOutput;\n\t\t\t\t\t} else {\n\t\t\t\t\t\tbitcrusherPhase = bitcrusherPhase % 1.0;\n\t\t\t\t\t\tconst ratio = bitcrusherPhase / bitcrusherPhaseDelta;\n\t\t\t\t\t\t\n\t\t\t\t\t\tconst lerpedInput = sample + (bitcrusherPrevInput - sample) * ratio;\n\t\t\t\t\t\tbitcrusherPrevInput = sample;\n\t\t\t\t\t\t\n\t\t\t\t\t\tconst bitcrusherWrapLevel = bitcrusherFoldLevel * 4.0;\n\t\t\t\t\t\tconst wrappedSample = (((lerpedInput + bitcrusherFoldLevel) % bitcrusherWrapLevel) + bitcrusherWrapLevel) % bitcrusherWrapLevel;\n\t\t\t\t\t\tconst foldedSample = bitcrusherFoldLevel - Math.abs(bitcrusherFoldLevel * 2.0 - wrappedSample);\n\t\t\t\t\t\tconst scaledSample = foldedSample / bitcrusherScale;\n\t\t\t\t\t\tconst oldValue = bitcrusherCurrentOutput;\n\t\t\t\t\t\tconst newValue = (((scaledSample > 0 ? scaledSample + 1 : scaledSample)|0)-.5) * bitcrusherScale;\n\t\t\t\t\t\t\n\t\t\t\t\t\tsample = oldValue + (newValue - oldValue) * ratio;\n\t\t\t\t\t\tbitcrusherCurrentOutput = newValue;\n\t\t\t\t\t}\n\t\t\t\t\tbitcrusherPhaseDelta *= bitcrusherPhaseDeltaScale;\n\t\t\t\t\tbitcrusherScale *= bitcrusherScaleScale;\n\t\t\t\t\tbitcrusherFoldLevel *= bitcrusherFoldLevelScale;"),
            l &&
              (e +=
                "\n\t\t\t\t\t\n\t\t\t\t\tconst inputSample = sample;\n\t\t\t\t\tsample = applyFilters(inputSample, initialFilterInput1, initialFilterInput2, filterCount, filters);\n\t\t\t\t\tinitialFilterInput2 = initialFilterInput1;\n\t\t\t\t\tinitialFilterInput1 = inputSample;"),
            (e +=
              "\n\t\t\t\t\t\n\t\t\t\t\tsample *= eqFilterVolume;\n\t\t\t\t\teqFilterVolume += eqFilterVolumeDelta;"),
            (e += c
              ? "\n\t\t\t\t\t\n\t\t\t\t\tpanningDelayLine[panningDelayPos] = sample;\n\t\t\t\t\tconst panningRatioL  = panningOffsetL % 1;\n\t\t\t\t\tconst panningRatioR  = panningOffsetR % 1;\n\t\t\t\t\tconst panningTapLA   = panningDelayLine[(panningOffsetL) & panningMask];\n\t\t\t\t\tconst panningTapLB   = panningDelayLine[(panningOffsetL + 1) & panningMask];\n\t\t\t\t\tconst panningTapRA   = panningDelayLine[(panningOffsetR) & panningMask];\n\t\t\t\t\tconst panningTapRB   = panningDelayLine[(panningOffsetR + 1) & panningMask];\n\t\t\t\t\tconst panningTapL    = panningTapLA + (panningTapLB - panningTapLA) * panningRatioL;\n\t\t\t\t\tconst panningTapR    = panningTapRA + (panningTapRB - panningTapRA) * panningRatioR;\n\t\t\t\t\tlet sampleL = panningTapL * panningVolumeL;\n\t\t\t\t\tlet sampleR = panningTapR * panningVolumeR;\n\t\t\t\t\tpanningDelayPos = (panningDelayPos + 1) & panningMask;\n\t\t\t\t\tpanningVolumeL += panningVolumeDeltaL;\n\t\t\t\t\tpanningVolumeR += panningVolumeDeltaR;\n\t\t\t\t\tpanningOffsetL += panningOffsetDeltaL;\n\t\t\t\t\tpanningOffsetR += panningOffsetDeltaR;"
              : "\n\t\t\t\t\t\n\t\t\t\t\tlet sampleL = sample;\n\t\t\t\t\tlet sampleR = sample;"),
            u &&
              (e +=
                "\n\t\t\t\t\t\n\t\t\t\t\tconst chorusTap0Ratio = chorusTap0Index % 1;\n\t\t\t\t\tconst chorusTap1Ratio = chorusTap1Index % 1;\n\t\t\t\t\tconst chorusTap2Ratio = chorusTap2Index % 1;\n\t\t\t\t\tconst chorusTap3Ratio = chorusTap3Index % 1;\n\t\t\t\t\tconst chorusTap4Ratio = chorusTap4Index % 1;\n\t\t\t\t\tconst chorusTap5Ratio = chorusTap5Index % 1;\n\t\t\t\t\tconst chorusTap0A = chorusDelayLineL[(chorusTap0Index) & chorusMask];\n\t\t\t\t\tconst chorusTap0B = chorusDelayLineL[(chorusTap0Index + 1) & chorusMask];\n\t\t\t\t\tconst chorusTap1A = chorusDelayLineL[(chorusTap1Index) & chorusMask];\n\t\t\t\t\tconst chorusTap1B = chorusDelayLineL[(chorusTap1Index + 1) & chorusMask];\n\t\t\t\t\tconst chorusTap2A = chorusDelayLineL[(chorusTap2Index) & chorusMask];\n\t\t\t\t\tconst chorusTap2B = chorusDelayLineL[(chorusTap2Index + 1) & chorusMask];\n\t\t\t\t\tconst chorusTap3A = chorusDelayLineR[(chorusTap3Index) & chorusMask];\n\t\t\t\t\tconst chorusTap3B = chorusDelayLineR[(chorusTap3Index + 1) & chorusMask];\n\t\t\t\t\tconst chorusTap4A = chorusDelayLineR[(chorusTap4Index) & chorusMask];\n\t\t\t\t\tconst chorusTap4B = chorusDelayLineR[(chorusTap4Index + 1) & chorusMask];\n\t\t\t\t\tconst chorusTap5A = chorusDelayLineR[(chorusTap5Index) & chorusMask];\n\t\t\t\t\tconst chorusTap5B = chorusDelayLineR[(chorusTap5Index + 1) & chorusMask];\n\t\t\t\t\tconst chorusTap0 = chorusTap0A + (chorusTap0B - chorusTap0A) * chorusTap0Ratio;\n\t\t\t\t\tconst chorusTap1 = chorusTap1A + (chorusTap1B - chorusTap1A) * chorusTap1Ratio;\n\t\t\t\t\tconst chorusTap2 = chorusTap2A + (chorusTap2B - chorusTap2A) * chorusTap2Ratio;\n\t\t\t\t\tconst chorusTap3 = chorusTap3A + (chorusTap3B - chorusTap3A) * chorusTap3Ratio;\n\t\t\t\t\tconst chorusTap4 = chorusTap4A + (chorusTap4B - chorusTap4A) * chorusTap4Ratio;\n\t\t\t\t\tconst chorusTap5 = chorusTap5A + (chorusTap5B - chorusTap5A) * chorusTap5Ratio;\n\t\t\t\t\tchorusDelayLineL[chorusDelayPos] = sampleL * delayInputMult;\n\t\t\t\t\tchorusDelayLineR[chorusDelayPos] = sampleR * delayInputMult;\n\t\t\t\t\tsampleL = chorusCombinedMult * (sampleL + chorusVoiceMult * (chorusTap1 - chorusTap0 - chorusTap2));\n\t\t\t\t\tsampleR = chorusCombinedMult * (sampleR + chorusVoiceMult * (chorusTap4 - chorusTap3 - chorusTap5));\n\t\t\t\t\tchorusDelayPos = (chorusDelayPos + 1) & chorusMask;\n\t\t\t\t\tchorusTap0Index += chorusTap0Delta;\n\t\t\t\t\tchorusTap1Index += chorusTap1Delta;\n\t\t\t\t\tchorusTap2Index += chorusTap2Delta;\n\t\t\t\t\tchorusTap3Index += chorusTap3Delta;\n\t\t\t\t\tchorusTap4Index += chorusTap4Delta;\n\t\t\t\t\tchorusTap5Index += chorusTap5Delta;\n\t\t\t\t\tchorusVoiceMult += chorusVoiceMultDelta;\n\t\t\t\t\tchorusCombinedMult += chorusCombinedMultDelta;"),
            p &&
              (e +=
                "\n\t\t\t\t\t\n\t\t\t\t\tconst echoTapStartIndex = (echoDelayPos + echoDelayOffsetStart) & echoMask;\n\t\t\t\t\tconst echoTapEndIndex   = (echoDelayPos + echoDelayOffsetEnd  ) & echoMask;\n\t\t\t\t\tconst echoTapStartL = echoDelayLineL[echoTapStartIndex];\n\t\t\t\t\tconst echoTapEndL   = echoDelayLineL[echoTapEndIndex];\n\t\t\t\t\tconst echoTapStartR = echoDelayLineR[echoTapStartIndex];\n\t\t\t\t\tconst echoTapEndR   = echoDelayLineR[echoTapEndIndex];\n\t\t\t\t\tconst echoTapL = (echoTapStartL + (echoTapEndL - echoTapStartL) * echoDelayOffsetRatio) * echoMult;\n\t\t\t\t\tconst echoTapR = (echoTapStartR + (echoTapEndR - echoTapStartR) * echoDelayOffsetRatio) * echoMult;\n\t\t\t\t\t\n\t\t\t\t\techoShelfSampleL = echoShelfB0 * echoTapL + echoShelfB1 * echoShelfPrevInputL - echoShelfA1 * echoShelfSampleL;\n\t\t\t\t\techoShelfSampleR = echoShelfB0 * echoTapR + echoShelfB1 * echoShelfPrevInputR - echoShelfA1 * echoShelfSampleR;\n\t\t\t\t\techoShelfPrevInputL = echoTapL;\n\t\t\t\t\techoShelfPrevInputR = echoTapR;\n\t\t\t\t\tsampleL += echoShelfSampleL;\n\t\t\t\t\tsampleR += echoShelfSampleR;\n\t\t\t\t\t\n\t\t\t\t\techoDelayLineL[echoDelayPos] = sampleL * delayInputMult;\n\t\t\t\t\techoDelayLineR[echoDelayPos] = sampleR * delayInputMult;\n\t\t\t\t\techoDelayPos = (echoDelayPos + 1) & echoMask;\n\t\t\t\t\techoDelayOffsetRatio += echoDelayOffsetRatioDelta;\n\t\t\t\t\techoMult += echoMultDelta;\n                    "),
            f &&
              (e +=
                "\n\t\t\t\t\t\n\t\t\t\t\t// Reverb, implemented using a feedback delay network with a Hadamard matrix and lowpass filters.\n\t\t\t\t\t// good ratios:    0.555235 + 0.618033 + 0.818 +   1.0 = 2.991268\n\t\t\t\t\t// Delay lengths:  3041     + 3385     + 4481  +  5477 = 16384 = 2^14\n\t\t\t\t\t// Buffer offsets: 3041    -> 6426   -> 10907 -> 16384\n\t\t\t\t\tconst reverbDelayPos1 = (reverbDelayPos +  3041) & reverbMask;\n\t\t\t\t\tconst reverbDelayPos2 = (reverbDelayPos +  6426) & reverbMask;\n\t\t\t\t\tconst reverbDelayPos3 = (reverbDelayPos + 10907) & reverbMask;\n\t\t\t\t\tconst reverbSample0 = (reverbDelayLine[reverbDelayPos]);\n\t\t\t\t\tconst reverbSample1 = reverbDelayLine[reverbDelayPos1];\n\t\t\t\t\tconst reverbSample2 = reverbDelayLine[reverbDelayPos2];\n\t\t\t\t\tconst reverbSample3 = reverbDelayLine[reverbDelayPos3];\n\t\t\t\t\tconst reverbTemp0 = -(reverbSample0 + sampleL) + reverbSample1;\n\t\t\t\t\tconst reverbTemp1 = -(reverbSample0 + sampleR) - reverbSample1;\n\t\t\t\t\tconst reverbTemp2 = -reverbSample2 + reverbSample3;\n\t\t\t\t\tconst reverbTemp3 = -reverbSample2 - reverbSample3;\n\t\t\t\t\tconst reverbShelfInput0 = (reverbTemp0 + reverbTemp2) * reverb;\n\t\t\t\t\tconst reverbShelfInput1 = (reverbTemp1 + reverbTemp3) * reverb;\n\t\t\t\t\tconst reverbShelfInput2 = (reverbTemp0 - reverbTemp2) * reverb;\n\t\t\t\t\tconst reverbShelfInput3 = (reverbTemp1 - reverbTemp3) * reverb;\n\t\t\t\t\treverbShelfSample0 = reverbShelfB0 * reverbShelfInput0 + reverbShelfB1 * reverbShelfPrevInput0 - reverbShelfA1 * reverbShelfSample0;\n\t\t\t\t\treverbShelfSample1 = reverbShelfB0 * reverbShelfInput1 + reverbShelfB1 * reverbShelfPrevInput1 - reverbShelfA1 * reverbShelfSample1;\n\t\t\t\t\treverbShelfSample2 = reverbShelfB0 * reverbShelfInput2 + reverbShelfB1 * reverbShelfPrevInput2 - reverbShelfA1 * reverbShelfSample2;\n\t\t\t\t\treverbShelfSample3 = reverbShelfB0 * reverbShelfInput3 + reverbShelfB1 * reverbShelfPrevInput3 - reverbShelfA1 * reverbShelfSample3;\n\t\t\t\t\treverbShelfPrevInput0 = reverbShelfInput0;\n\t\t\t\t\treverbShelfPrevInput1 = reverbShelfInput1;\n\t\t\t\t\treverbShelfPrevInput2 = reverbShelfInput2;\n\t\t\t\t\treverbShelfPrevInput3 = reverbShelfInput3;\n\t\t\t\t\treverbDelayLine[reverbDelayPos1] = reverbShelfSample0 * delayInputMult;\n\t\t\t\t\treverbDelayLine[reverbDelayPos2] = reverbShelfSample1 * delayInputMult;\n\t\t\t\t\treverbDelayLine[reverbDelayPos3] = reverbShelfSample2 * delayInputMult;\n\t\t\t\t\treverbDelayLine[reverbDelayPos ] = reverbShelfSample3 * delayInputMult;\n\t\t\t\t\treverbDelayPos = (reverbDelayPos + 1) & reverbMask;\n\t\t\t\t\tsampleL += reverbSample1 + reverbSample2 + reverbSample3;\n\t\t\t\t\tsampleR += reverbSample0 + reverbSample2 - reverbSample3;\n\t\t\t\t\treverb += reverbDelta;"),
            (e +=
              "\n\t\t\t\t\t\n\t\t\t\t\toutputDataL[sampleIndex] += sampleL * mixVolume;\n\t\t\t\t\toutputDataR[sampleIndex] += sampleR * mixVolume;\n\t\t\t\t\tmixVolume += mixVolumeDelta;"),
            t &&
              (e +=
                "\n\t\t\t\t\t\n\t\t\t\t\tdelayInputMult += delayInputMultDelta;"),
            (e +=
              "\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\tinstrumentState.mixVolume = mixVolume;\n\t\t\t\tinstrumentState.eqFilterVolume = eqFilterVolume;\n\t\t\t\t\n\t\t\t\t// Avoid persistent denormal or NaN values in the delay buffers and filter history.\n\t\t\t\tconst epsilon = (1.0e-24);"),
            t &&
              (e +=
                "\n\t\t\t\t\n\t\t\t\tinstrumentState.delayInputMult = delayInputMult;"),
            o &&
              (e +=
                "\n\t\t\t\t\n\t\t\t\tinstrumentState.distortion = distortion;\n\t\t\t\tinstrumentState.distortionDrive = distortionDrive;\n\t\t\t\t\n\t\t\t\tif (!Number.isFinite(distortionFractionalInput1) || Math.abs(distortionFractionalInput1) < epsilon) distortionFractionalInput1 = 0.0;\n\t\t\t\tif (!Number.isFinite(distortionFractionalInput2) || Math.abs(distortionFractionalInput2) < epsilon) distortionFractionalInput2 = 0.0;\n\t\t\t\tif (!Number.isFinite(distortionFractionalInput3) || Math.abs(distortionFractionalInput3) < epsilon) distortionFractionalInput3 = 0.0;\n\t\t\t\tif (!Number.isFinite(distortionPrevInput) || Math.abs(distortionPrevInput) < epsilon) distortionPrevInput = 0.0;\n\t\t\t\tif (!Number.isFinite(distortionNextOutput) || Math.abs(distortionNextOutput) < epsilon) distortionNextOutput = 0.0;\n\t\t\t\t\n\t\t\t\tinstrumentState.distortionFractionalInput1 = distortionFractionalInput1;\n\t\t\t\tinstrumentState.distortionFractionalInput2 = distortionFractionalInput2;\n\t\t\t\tinstrumentState.distortionFractionalInput3 = distortionFractionalInput3;\n\t\t\t\tinstrumentState.distortionPrevInput = distortionPrevInput;\n\t\t\t\tinstrumentState.distortionNextOutput = distortionNextOutput;"),
            r &&
              (e +=
                "\n\t\t\t\t\t\n\t\t\t\tif (Math.abs(bitcrusherPrevInput) < epsilon) bitcrusherPrevInput = 0.0;\n\t\t\t\tif (Math.abs(bitcrusherCurrentOutput) < epsilon) bitcrusherCurrentOutput = 0.0;\n\t\t\t\tinstrumentState.bitcrusherPrevInput = bitcrusherPrevInput;\n\t\t\t\tinstrumentState.bitcrusherCurrentOutput = bitcrusherCurrentOutput;\n\t\t\t\tinstrumentState.bitcrusherPhase = bitcrusherPhase;\n\t\t\t\tinstrumentState.bitcrusherPhaseDelta = bitcrusherPhaseDelta;\n\t\t\t\tinstrumentState.bitcrusherScale = bitcrusherScale;\n\t\t\t\tinstrumentState.bitcrusherFoldLevel = bitcrusherFoldLevel;"),
            l &&
              (e +=
                "\n\t\t\t\t\t\n\t\t\t\tsynth.sanitizeFilters(filters);\n\t\t\t\t// The filter input here is downstream from another filter so we\n\t\t\t\t// better make sure it's safe too.\n\t\t\t\tif (!(initialFilterInput1 < 100) || !(initialFilterInput2 < 100)) {\n\t\t\t\t\tinitialFilterInput1 = 0.0;\n\t\t\t\t\tinitialFilterInput2 = 0.0;\n\t\t\t\t}\n\t\t\t\tif (Math.abs(initialFilterInput1) < epsilon) initialFilterInput1 = 0.0;\n\t\t\t\tif (Math.abs(initialFilterInput2) < epsilon) initialFilterInput2 = 0.0;\n\t\t\t\tinstrumentState.initialEqFilterInput1 = initialFilterInput1;\n\t\t\t\tinstrumentState.initialEqFilterInput2 = initialFilterInput2;"),
            c &&
              (e +=
                "\n\t\t\t\t\n\t\t\t\tSynth.sanitizeDelayLine(panningDelayLine, panningDelayPos, panningMask);\n\t\t\t\tinstrumentState.panningDelayPos = panningDelayPos;\n\t\t\t\tinstrumentState.panningVolumeL = panningVolumeL;\n\t\t\t\tinstrumentState.panningVolumeR = panningVolumeR;\n\t\t\t\tinstrumentState.panningOffsetL = panningOffsetL;\n\t\t\t\tinstrumentState.panningOffsetR = panningOffsetR;"),
            u &&
              (e +=
                "\n\t\t\t\t\n\t\t\t\tSynth.sanitizeDelayLine(chorusDelayLineL, chorusDelayPos, chorusMask);\n\t\t\t\tSynth.sanitizeDelayLine(chorusDelayLineR, chorusDelayPos, chorusMask);\n\t\t\t\tinstrumentState.chorusPhase = chorusPhase;\n\t\t\t\tinstrumentState.chorusDelayPos = chorusDelayPos;\n\t\t\t\tinstrumentState.chorusVoiceMult = chorusVoiceMult;\n\t\t\t\tinstrumentState.chorusCombinedMult = chorusCombinedMult;"),
            p &&
              (e +=
                "\n\t\t\t\t\n\t\t\t\tSynth.sanitizeDelayLine(echoDelayLineL, echoDelayPos, echoMask);\n\t\t\t\tSynth.sanitizeDelayLine(echoDelayLineR, echoDelayPos, echoMask);\n\t\t\t\tinstrumentState.echoDelayPos = echoDelayPos;\n\t\t\t\tinstrumentState.echoMult = echoMult;\n\t\t\t\tinstrumentState.echoDelayOffsetRatio = echoDelayOffsetRatio;\n\t\t\t\t\n\t\t\t\tif (!Number.isFinite(echoShelfSampleL) || Math.abs(echoShelfSampleL) < epsilon) echoShelfSampleL = 0.0;\n\t\t\t\tif (!Number.isFinite(echoShelfSampleR) || Math.abs(echoShelfSampleR) < epsilon) echoShelfSampleR = 0.0;\n\t\t\t\tif (!Number.isFinite(echoShelfPrevInputL) || Math.abs(echoShelfPrevInputL) < epsilon) echoShelfPrevInputL = 0.0;\n\t\t\t\tif (!Number.isFinite(echoShelfPrevInputR) || Math.abs(echoShelfPrevInputR) < epsilon) echoShelfPrevInputR = 0.0;\n\t\t\t\tinstrumentState.echoShelfSampleL = echoShelfSampleL;\n\t\t\t\tinstrumentState.echoShelfSampleR = echoShelfSampleR;\n\t\t\t\tinstrumentState.echoShelfPrevInputL = echoShelfPrevInputL;\n\t\t\t\tinstrumentState.echoShelfPrevInputR = echoShelfPrevInputR;"),
            f &&
              (e +=
                "\n\t\t\t\t\n\t\t\t\tSynth.sanitizeDelayLine(reverbDelayLine, reverbDelayPos        , reverbMask);\n\t\t\t\tSynth.sanitizeDelayLine(reverbDelayLine, reverbDelayPos +  3041, reverbMask);\n\t\t\t\tSynth.sanitizeDelayLine(reverbDelayLine, reverbDelayPos +  6426, reverbMask);\n\t\t\t\tSynth.sanitizeDelayLine(reverbDelayLine, reverbDelayPos + 10907, reverbMask);\n\t\t\t\tinstrumentState.reverbDelayPos = reverbDelayPos;\n\t\t\t\tinstrumentState.reverbMult = reverb;\n\t\t\t\t\n\t\t\t\tif (!Number.isFinite(reverbShelfSample0) || Math.abs(reverbShelfSample0) < epsilon) reverbShelfSample0 = 0.0;\n\t\t\t\tif (!Number.isFinite(reverbShelfSample1) || Math.abs(reverbShelfSample1) < epsilon) reverbShelfSample1 = 0.0;\n\t\t\t\tif (!Number.isFinite(reverbShelfSample2) || Math.abs(reverbShelfSample2) < epsilon) reverbShelfSample2 = 0.0;\n\t\t\t\tif (!Number.isFinite(reverbShelfSample3) || Math.abs(reverbShelfSample3) < epsilon) reverbShelfSample3 = 0.0;\n\t\t\t\tif (!Number.isFinite(reverbShelfPrevInput0) || Math.abs(reverbShelfPrevInput0) < epsilon) reverbShelfPrevInput0 = 0.0;\n\t\t\t\tif (!Number.isFinite(reverbShelfPrevInput1) || Math.abs(reverbShelfPrevInput1) < epsilon) reverbShelfPrevInput1 = 0.0;\n\t\t\t\tif (!Number.isFinite(reverbShelfPrevInput2) || Math.abs(reverbShelfPrevInput2) < epsilon) reverbShelfPrevInput2 = 0.0;\n\t\t\t\tif (!Number.isFinite(reverbShelfPrevInput3) || Math.abs(reverbShelfPrevInput3) < epsilon) reverbShelfPrevInput3 = 0.0;\n\t\t\t\tinstrumentState.reverbShelfSample0 = reverbShelfSample0;\n\t\t\t\tinstrumentState.reverbShelfSample1 = reverbShelfSample1;\n\t\t\t\tinstrumentState.reverbShelfSample2 = reverbShelfSample2;\n\t\t\t\tinstrumentState.reverbShelfSample3 = reverbShelfSample3;\n\t\t\t\tinstrumentState.reverbShelfPrevInput0 = reverbShelfPrevInput0;\n\t\t\t\tinstrumentState.reverbShelfPrevInput1 = reverbShelfPrevInput1;\n\t\t\t\tinstrumentState.reverbShelfPrevInput2 = reverbShelfPrevInput2;\n\t\t\t\tinstrumentState.reverbShelfPrevInput3 = reverbShelfPrevInput3;"),
            (e += "}"),
            (d = new Function("Config", "Synth", e)(h, be)),
            (be.effectsFunctionCache[m] = d);
        }
        d(e, t, s, i, n, a);
      }
      static pulseWidthSynth(e, t, s, i, n) {
        const a = e.tempMonoInstrumentSampleBuffer;
        let o = i.phaseDeltas[0];
        const r = +i.phaseDeltaScales[0];
        let l = +i.expression;
        const h = +i.expressionDelta;
        let c = i.phases[0] % 1,
          u = i.pulseWidth;
        const p = i.pulseWidthDelta,
          f = i.noteFilters,
          m = 0 | i.noteFilterCount;
        let d = +i.initialNoteFilterInput1,
          y = +i.initialNoteFilterInput2;
        const v = be.applyFilters,
          g = t + s;
        for (let e = t; e < g; e++) {
          const t = c % 1,
            s = (c + u) % 1;
          let i = s - t;
          if (!n.aliases) {
            if (t < o) i += 0.5 * ((b = t / o) + b - b * b - 1);
            else if (t > 1 - o) {
              i += 0.5 * ((b = (t - 1) / o) + b + b * b + 1);
            }
            if (s < o) i -= 0.5 * ((b = s / o) + b - b * b - 1);
            else if (s > 1 - o) {
              var b;
              i -= 0.5 * ((b = (s - 1) / o) + b + b * b + 1);
            }
          }
          const g = i,
            S = v(g, d, y, m, f);
          (y = d), (d = g), (c += o), (o *= r), (u += p);
          const M = S * l;
          (l += h), (a[e] += M);
        }
        (i.phases[0] = c),
          (i.phaseDeltas[0] = o),
          (i.expression = l),
          (i.pulseWidth = u),
          e.sanitizeFilters(f),
          (i.initialNoteFilterInput1 = d),
          (i.initialNoteFilterInput2 = y);
      }
      static noiseSynth(e, t, s, i, n) {
        const a = e.tempMonoInstrumentSampleBuffer,
          o = n.wave;
        let r = +i.phaseDeltas[0];
        const l = +i.phaseDeltaScales[0];
        let c = +i.expression;
        const u = +i.expressionDelta;
        let p = (i.phases[0] % 1) * h.chipNoiseLength;
        0 == i.phases[0] && (p = Math.random() * h.chipNoiseLength);
        const f = h.chipNoiseLength - 1;
        let m = +i.noiseSample;
        const d = i.noteFilters,
          y = 0 | i.noteFilterCount;
        let v = +i.initialNoteFilterInput1,
          g = +i.initialNoteFilterInput2;
        const b = be.applyFilters,
          S = Math.min(1, r * n.noisePitchFilterMult),
          M = t + s;
        for (let e = t; e < M; e++) {
          m += (o[p & f] - m) * S;
          const t = m,
            s = b(t, v, g, y, d);
          (g = v), (v = t), (p += r), (r *= l);
          const i = s * c;
          (c += u), (a[e] += i);
        }
        (i.phases[0] = p / h.chipNoiseLength),
          (i.phaseDeltas[0] = r),
          (i.expression = c),
          (i.noiseSample = m),
          e.sanitizeFilters(d),
          (i.initialNoteFilterInput1 = v),
          (i.initialNoteFilterInput2 = g);
      }
      static spectrumSynth(e, t, s, i, n) {
        const a = e.tempMonoInstrumentSampleBuffer,
          o = n.wave;
        let r = 128 * i.phaseDeltas[0];
        const l = +i.phaseDeltaScales[0];
        let c = +i.expression;
        const u = +i.expressionDelta;
        let p = +i.noiseSample;
        const f = i.noteFilters,
          m = 0 | i.noteFilterCount;
        let d = +i.initialNoteFilterInput1,
          y = +i.initialNoteFilterInput2;
        const v = be.applyFilters;
        let g = (i.phases[0] % 1) * h.spectrumNoiseLength;
        0 == i.phases[0] &&
          (g = be.findRandomZeroCrossing(o, h.spectrumNoiseLength) + r);
        const b = h.spectrumNoiseLength - 1,
          S = Math.min(1, r),
          M = t + s;
        for (let e = t; e < M; e++) {
          const t = 0 | g,
            s = t & b;
          let i = o[s];
          const n = g - t;
          (i += (o[s + 1] - i) * n), (p += (i - p) * S);
          const h = p,
            M = v(h, d, y, m, f);
          (y = d), (d = h), (g += r), (r *= l);
          const w = M * c;
          (c += u), (a[e] += w);
        }
        (i.phases[0] = g / h.spectrumNoiseLength),
          (i.phaseDeltas[0] = r / 128),
          (i.expression = c),
          (i.noiseSample = p),
          e.sanitizeFilters(f),
          (i.initialNoteFilterInput1 = d),
          (i.initialNoteFilterInput2 = y);
      }
      static drumsetSynth(e, t, s, i, n) {
        const a = e.tempMonoInstrumentSampleBuffer;
        let o = n.getDrumsetWave(i.drumsetPitch);
        const r = ve.drumsetIndexReferenceDelta(i.drumsetPitch);
        let l = i.phaseDeltas[0] / r;
        const c = +i.phaseDeltaScales[0];
        let u = +i.expression;
        const p = +i.expressionDelta,
          f = i.noteFilters,
          m = 0 | i.noteFilterCount;
        let d = +i.initialNoteFilterInput1,
          y = +i.initialNoteFilterInput2;
        const v = be.applyFilters;
        let g = (i.phases[0] % 1) * h.spectrumNoiseLength;
        0 == i.phases[0] &&
          (g = be.findRandomZeroCrossing(o, h.spectrumNoiseLength) + l);
        const b = h.spectrumNoiseLength - 1,
          S = t + s;
        for (let e = t; e < S; e++) {
          const t = 0 | g,
            s = t & b;
          let i = o[s];
          const n = g - t;
          i += (o[s + 1] - i) * n;
          const r = i,
            h = v(r, d, y, m, f);
          (y = d), (d = r), (g += l), (l *= c);
          const S = h * u;
          (u += p), (a[e] += S);
        }
        (i.phases[0] = g / h.spectrumNoiseLength),
          (i.phaseDeltas[0] = l * r),
          (i.expression = u),
          e.sanitizeFilters(f),
          (i.initialNoteFilterInput1 = d),
          (i.initialNoteFilterInput2 = y);
      }
      static modSynth(e, t, s, i, n) {
        if (!e.song) return;
        let a = h.modCount - 1 - i.pitches[0];
        if (n.invalidModulators[a]) return;
        let o = n.modulators[a],
          r = [];
        if (h.modulators[n.modulators[a]].forSong) r.push(0);
        else if (
          n.modInstruments[a] ==
          e.song.channels[n.modChannels[a]].instruments.length
        )
          for (
            let t = 0;
            t < e.song.channels[n.modChannels[a]].instruments.length;
            t++
          )
            r.push(t);
        else
          n.modInstruments[a] >
          e.song.channels[n.modChannels[a]].instruments.length
            ? null != e.song.getPattern(n.modChannels[a], e.bar) &&
              (r = e.song.getPattern(n.modChannels[a], e.bar).instruments)
            : r.push(n.modInstruments[a]);
        for (let t = 0; t < r.length; t++)
          if (
            (e.setModValue(
              i.expression,
              i.expression + i.expressionDelta,
              a,
              n.modChannels[a],
              r[t],
              o
            ),
            o == h.modulators.dictionary["reset arp"].index &&
              0 == e.tick &&
              i.noteStartPart == e.beat * h.partsPerBeat + e.part)
          )
            e.song.channels[n.modChannels[a]].instruments[r[t]].arpTime = 0;
          else if (o == h.modulators.dictionary["next bar"].index)
            e.wantToSkip = !0;
          else if (o == h.modulators.dictionary["eq filter"].index) {
            const o = e.song.channels[n.modChannels[a]].instruments[r[t]];
            if (!o.eqFilterType) {
              let t = 0 | n.modFilterTypes[a];
              if (0 == t) {
                let t = 0;
                const n = e.getTicksIntoBar() / h.ticksPerPart;
                for (; i.note.start + i.note.pins[t].time <= n; ) t++;
                let a =
                  (n -
                    i.note.start +
                    (s / (e.getSamplesPerTick() * h.ticksPerPart)) *
                      h.ticksPerPart -
                    i.note.pins[t - 1].time) /
                  (i.note.pins[t].time - i.note.pins[t - 1].time);
                null != o.eqSubFilters[i.note.pins[t - 1].size] ||
                null != o.eqSubFilters[i.note.pins[t].size]
                  ? (o.tmpEqFilterEnd = he.lerpFilters(
                      o.eqSubFilters[i.note.pins[t - 1].size],
                      o.eqSubFilters[i.note.pins[t].size],
                      a
                    ))
                  : (o.tmpEqFilterEnd = o.eqFilter);
              } else {
                for (let e = 0; e < h.filterMorphCount; e++)
                  o.tmpEqFilterEnd == o.eqSubFilters[e] &&
                    null != o.tmpEqFilterEnd &&
                    ((o.tmpEqFilterEnd = new he()),
                    o.tmpEqFilterEnd.fromJsonObject(
                      o.eqSubFilters[e].toJsonObject()
                    ));
                null == o.tmpEqFilterEnd &&
                  ((o.tmpEqFilterEnd = new he()),
                  o.tmpEqFilterEnd.fromJsonObject(o.eqFilter.toJsonObject())),
                  o.tmpEqFilterEnd.controlPointCount >
                    Math.floor((t - 1) / 2) &&
                    (t % 2
                      ? (o.tmpEqFilterEnd.controlPoints[
                          Math.floor((t - 1) / 2)
                        ].freq = i.expression + i.expressionDelta)
                      : (o.tmpEqFilterEnd.controlPoints[
                          Math.floor((t - 1) / 2)
                        ].gain = i.expression + i.expressionDelta));
              }
            }
          } else if (o == h.modulators.dictionary["note filter"].index) {
            const o = e.song.channels[n.modChannels[a]].instruments[r[t]];
            if (!o.noteFilterType) {
              let t = 0 | n.modFilterTypes[a];
              if (0 == t) {
                let t = 0;
                const n = e.getTicksIntoBar() / h.ticksPerPart;
                for (; i.note.start + i.note.pins[t].time <= n; ) t++;
                let a =
                  (n -
                    i.note.start +
                    (s / (e.getSamplesPerTick() * h.ticksPerPart)) *
                      h.ticksPerPart -
                    i.note.pins[t - 1].time) /
                  (i.note.pins[t].time - i.note.pins[t - 1].time);
                null != o.noteSubFilters[i.note.pins[t - 1].size] ||
                null != o.noteSubFilters[i.note.pins[t].size]
                  ? (o.tmpNoteFilterEnd = he.lerpFilters(
                      o.noteSubFilters[i.note.pins[t - 1].size],
                      o.noteSubFilters[i.note.pins[t].size],
                      a
                    ))
                  : (o.tmpNoteFilterEnd = o.noteFilter);
              } else {
                for (let e = 0; e < h.filterMorphCount; e++)
                  o.tmpNoteFilterEnd == o.noteSubFilters[e] &&
                    null != o.tmpNoteFilterEnd &&
                    ((o.tmpNoteFilterEnd = new he()),
                    o.tmpNoteFilterEnd.fromJsonObject(
                      o.noteSubFilters[e].toJsonObject()
                    ));
                null == o.tmpNoteFilterEnd &&
                  ((o.tmpNoteFilterEnd = new he()),
                  o.tmpNoteFilterEnd.fromJsonObject(
                    o.noteFilter.toJsonObject()
                  )),
                  o.tmpNoteFilterEnd.controlPointCount >
                    Math.floor((t - 1) / 2) &&
                    (t % 2
                      ? (o.tmpNoteFilterEnd.controlPoints[
                          Math.floor((t - 1) / 2)
                        ].freq = i.expression + i.expressionDelta)
                      : (o.tmpNoteFilterEnd.controlPoints[
                          Math.floor((t - 1) / 2)
                        ].gain = i.expression + i.expressionDelta));
              }
            }
          }
      }
      static findRandomZeroCrossing(e, t) {
        let s = Math.random() * t;
        const i = t - 1;
        let n = s & i,
          a = e[n];
        for (let o = 128; o > 0; o--) {
          const o = (n + 16) & i,
            r = e[o];
          if (a * r <= 0) {
            for (let o = 0; o < 16; o++) {
              const o = (n + 1) & i,
                r = e[o];
              if (a * r <= 0) {
                const e = r - a;
                (s = n),
                  Math.abs(e) > 1e-8 && (s += -a / e),
                  (s = Math.max(0, s) % t);
                break;
              }
              (n = o), (a = r);
            }
            break;
          }
          (n = o), (a = r);
        }
        return s;
      }
      static instrumentVolumeToVolumeMult(e) {
        return e == -h.volumeRange / 2 ? 0 : Math.pow(2, h.volumeLogScale * e);
      }
      static volumeMultToInstrumentVolume(e) {
        return e <= 0
          ? -h.volumeRange / 2
          : Math.min(h.volumeRange, Math.log(e) / Math.LN2 / h.volumeLogScale);
      }
      static noteSizeToVolumeMult(e) {
        return Math.pow(Math.max(0, e) / h.noteSizeMax, 1.5);
      }
      static volumeMultToNoteSize(e) {
        return Math.pow(Math.max(0, e), 1 / 1.5) * h.noteSizeMax;
      }
      static fadeInSettingToSeconds(e) {
        return 0.0125 * (0.95 * e + 0.05 * e * e);
      }
      static secondsToFadeInSetting(e) {
        return V(
          0,
          h.fadeInRange,
          Math.round((-0.95 + Math.sqrt(0.9025 + (0.2 * e) / 0.0125)) / 0.1)
        );
      }
      static fadeOutSettingToTicks(e) {
        return h.fadeOutTicks[e];
      }
      static ticksToFadeOutSetting(e) {
        let t = h.fadeOutTicks[0];
        if (e <= t) return 0;
        for (let s = 1; s < h.fadeOutTicks.length; s++) {
          let i = h.fadeOutTicks[s];
          if (e <= i) return e < (t + i) / 2 ? s - 1 : s;
          t = i;
        }
        return h.fadeOutTicks.length - 1;
      }
      static detuneToCents(e) {
        return e - h.detuneCenter;
      }
      static centsToDetune(e) {
        return e + h.detuneCenter;
      }
      static getOperatorWave(e, t) {
        return 2 != e ? h.operatorWaves[e] : h.pwmOperatorWaves[t];
      }
      getSamplesPerTick() {
        if (null == this.song) return 0;
        let e = this.song.getBeatsPerMinute();
        return (
          this.isModActive(h.modulators.dictionary.tempo.index) &&
            (e = this.getModValue(h.modulators.dictionary.tempo.index)),
          this.getSamplesPerTickSpecificBPM(e)
        );
      }
      getSamplesPerTickSpecificBPM(e) {
        const t = e / 60,
          s = h.partsPerBeat * t,
          i = h.ticksPerPart * s;
        return this.samplesPerSecond / i;
      }
      static fittingPowerOfTwo(e) {
        return 1 << (32 - Math.clz32(Math.ceil(e) - 1));
      }
      sanitizeFilters(e) {
        let t = !1;
        for (const s of e) {
          const e = Math.abs(s.output1),
            i = Math.abs(s.output2);
          if (!(e < 100 && i < 100)) {
            t = !0;
            break;
          }
          e < G && (s.output1 = 0), i < G && (s.output2 = 0);
        }
        if (t) for (const t of e) (t.output1 = 0), (t.output2 = 0);
      }
      static sanitizeDelayLine(e, t, s) {
        for (;;) {
          const i = --t & s,
            n = Math.abs(e[i]);
          if (Number.isFinite(n) && (0 == n || n >= G)) break;
          e[i] = 0;
        }
      }
      static applyFilters(e, t, s, i, n) {
        for (let a = 0; a < i; a++) {
          const i = n[a],
            o = i.output1,
            r = i.output2,
            l = i.a1,
            h = i.a2,
            c = i.b0,
            u = i.b1,
            p = i.b2;
          (e = c * e + u * t + p * s - l * o - h * r),
            (i.a1 = l + i.a1Delta),
            (i.a2 = h + i.a2Delta),
            i.useMultiplicativeInputCoefficients
              ? ((i.b0 = c * i.b0Delta),
                (i.b1 = u * i.b1Delta),
                (i.b2 = p * i.b2Delta))
              : ((i.b0 = c + i.b0Delta),
                (i.b1 = u + i.b1Delta),
                (i.b2 = p + i.b2Delta)),
            (i.output2 = o),
            (i.output1 = e),
            (s = r),
            (t = o);
        }
        return e;
      }
    }
    return (
      (be.tempFilterStartCoefficients = new H()),
      (be.tempFilterEndCoefficients = new H()),
      (be.fmSynthFunctionCache = {}),
      (be.fm6SynthFunctionCache = {}),
      (be.effectsFunctionCache = Array(128).fill(void 0)),
      (be.pickedStringFunctionCache = Array(3).fill(void 0)),
      (be.fmSourceTemplate = (
        "\n\t\tconst data = synth.tempMonoInstrumentSampleBuffer;\n\t\tconst sineWave = Config.sineWave;\n\t\t\t\n\t\t// I'm adding 1000 to the phase to ensure that it's never negative even when modulated by other waves because negative numbers don't work with the modulus operator very well.\n\t\tlet operator#Phase       = +((tone.phases[#] % 1) + 1000) * " +
        h.sineWaveLength +
        ";\n\t\tlet operator#PhaseDelta  = +tone.phaseDeltas[#] * " +
        h.sineWaveLength +
        ";\n\t\tlet operator#PhaseDeltaScale = +tone.phaseDeltaScales[#];\n\t\tlet operator#OutputMult  = +tone.operatorExpressions[#];\n\t\tconst operator#OutputDelta = +tone.operatorExpressionDeltas[#];\n\t\tlet operator#Output      = +tone.feedbackOutputs[#];\n        const operator#Wave      = tone.operatorWaves[#].samples;\n\t\tlet feedbackMult         = +tone.feedbackMult;\n\t\tconst feedbackDelta        = +tone.feedbackDelta;\n        let expression = +tone.expression;\n\t\tconst expressionDelta = +tone.expressionDelta;\n\t\t\n\t\tconst filters = tone.noteFilters;\n\t\tconst filterCount = tone.noteFilterCount|0;\n\t\tlet initialFilterInput1 = +tone.initialNoteFilterInput1;\n\t\tlet initialFilterInput2 = +tone.initialNoteFilterInput2;\n\t\tconst applyFilters = Synth.applyFilters;\n\t\t\n\t\tconst stopIndex = bufferIndex + roundedSamplesPerTick;\n\t\tfor (let sampleIndex = bufferIndex; sampleIndex < stopIndex; sampleIndex++) {\n\t\t\t\t// INSERT OPERATOR COMPUTATION HERE\n\t\t\t\tconst fmOutput = (/*operator#Scaled*/); // CARRIER OUTPUTS\n\t\t\t\t\n\t\t\tconst inputSample = fmOutput;\n\t\t\tconst sample = applyFilters(inputSample, initialFilterInput1, initialFilterInput2, filterCount, filters);\n\t\t\tinitialFilterInput2 = initialFilterInput1;\n\t\t\tinitialFilterInput1 = inputSample;\n\t\t\t\t\n\t\t\t\tfeedbackMult += feedbackDelta;\n\t\t\t\toperator#OutputMult += operator#OutputDelta;\n\t\t\t\toperator#Phase += operator#PhaseDelta;\n\t\t\toperator#PhaseDelta *= operator#PhaseDeltaScale;\n\t\t\t\n\t\t\tconst output = sample * expression;\n\t\t\texpression += expressionDelta;\n\n\t\t\tdata[sampleIndex] += output;\n\t\t\t}\n\t\t\t\n\t\t\ttone.phases[#] = operator#Phase / " +
        h.sineWaveLength +
        ";\n\t\t\ttone.phaseDeltas[#] = operator#PhaseDelta / " +
        h.sineWaveLength +
        ";\n\t\t\ttone.operatorExpressions[#] = operator#OutputMult;\n\t\t    tone.feedbackOutputs[#] = operator#Output;\n\t\t    tone.feedbackMult = feedbackMult;\n\t\t    tone.expression = expression;\n\t\t\t\n\t\tsynth.sanitizeFilters(filters);\n\t\ttone.initialNoteFilterInput1 = initialFilterInput1;\n\t\ttone.initialNoteFilterInput2 = initialFilterInput2;\n\t\t"
      ).split("\n")),
      (be.operatorSourceTemplate = (
        "\n\t\t\t\tconst operator#PhaseMix = operator#Phase/* + operator@Scaled*/;\n\t\t\t\tconst operator#PhaseInt = operator#PhaseMix|0;\n\t\t\t\tconst operator#Index    = operator#PhaseInt & " +
        h.sineWaveMask +
        ";\n                const operator#Sample   = operator#Wave[operator#Index];\n                operator#Output         = operator#Sample + (operator#Wave[operator#Index + 1] - operator#Sample) * (operator#PhaseMix - operator#PhaseInt);\n\t\t\t\tconst operator#Scaled   = operator#OutputMult * operator#Output;\n\t\t"
      ).split("\n")),
      (e.Channel = pe),
      (e.Config = h),
      (e.CustomAlgorithm = se),
      (e.CustomFeedBack = ie),
      (e.EnvelopeSettings = ce),
      (e.FilterControlPoint = le),
      (e.FilterSettings = he),
      (e.HarmonicsWave = oe),
      (e.Instrument = ue),
      (e.Note = Z),
      (e.Operator = te),
      (e.Pattern = ee),
      (e.Song = fe),
      (e.SpectrumWave = ne),
      (e.Synth = be),
      (e.clamp = V),
      (e.makeNotePin = X),
      (e.parseFloatWithDefault = W),
      (e.parseIntWithDefault = $),
      Object.defineProperty(e, "X", { value: !0 }),
      e
    );
  })({});
  //# sourceMappingURL=beepbox_synth.min.js.map
  //the above minified code is a compiled version of https://github.com/DogeisCut/ultraabox-for-turbowarp/blob/main/synth/synth.ts
  //which is based on https://github.com/ultraabox/ultrabox_typescript/blob/main/synth/synth.ts
  /* eslint-enable*/

  console.log(beepbox);

  var url =
    "5sbk4l00e0ftaa7g0fj7i0r1w1100f0000d1110c0000h0000v2200o3320b4z8Ql6hkpUsiczhkp5hDxN8Od5hAl6u74z8Ql6hkpUsp24ZFzzQ1E39kxIceEtoV8s66138l1S0L1u2139l1H39McyaeOgKA0TxAU213jj0NM4x8i0o0c86ywz7keUtVxQk1E3hi6OEcB8Atl0q0Qmm6eCexg6wd50oczkhO8VcsEeAc26gG3E1q2U406hG3i6jw94ksf8i5Uo0dZY26kHHzxp2gAgM0o4d516ej7uegceGwd0q84czm6yj8Xa0Q1EIIctcvq0Q1EE3ihE8W1OgV8s46Icxk7o24110w0OdgqMOk392OEWhS1ANQQ4toUctBpzRxx1M0WNSk1I3ANMEXwS3I79xSzJ7q6QtEXgw0";

  let synths = [];
  var synth = new beepbox.Synth(url);
  synths.push(synth);
  synth.volume = 1;

  var targetSynth = 0;

  const vm = Scratch.vm;
  const runtime = vm.runtime;

  const icon =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAANeSURBVFhHxZddSFRREMdnd0UDMZV8MIpUIoIK+gCFCPKjgj4IJIgeKiJ6iMAHJaR6KXoIjB4MIh/ToCeJUCICqVyxhxSiIqEES0kIikSzD2vbdZv/7NzLveu517vbkj8Yd+aue2bOnHPmzA1RcEpYGllqWSpZ6licRFkmWAZYelhmWHICnHWyJDMU/Aa/9cUvA5jxJZZmsZQ9629QTUUTJdlFAm6YMI8SCRM9n7xFfW/O8PNY6osU11kusxgz4hXAFhbMAJ9UVLCaWuon6Xcc1uLkcTAdg+toem5Mn9BLlpP66cIUAJz2syAD1Nrwh8LhPKgZg8HbHtkukIF6FlcQHKsL23kkvIzO705m7Rxghc7xGPmRYpiYEMaWrFo4A8A/IO3i/Gz9TxkgFzTXTVNh/kqotg8YwBkANpxE19owR6GQ1/bIHIzVtPOjWuIDvgTLC47LOJQga977+gi9/dStVoq1ZQfo0OZePhERfbKQ+WSCrj22x65imbAyIBFht/s5j45doKu8qdKdg3dfHsjg90eO6ZOFILg1pdiHgvhEBrAe0zAu7k16HrX2aDHF4rNqLUaIN9+86m5wRK/02ctbigygvApezjHz4M5Bkrpf7FfdTdwdVyMCQG2XCufF0ESbasEZn3poLDLg1PYR1agWAUi9Rnk1gQ2XLR1PK1RzU1a4UTWqRAByq6G2mzBtuKDM/vqgmid1CECwLpb/jR3AUmEHgCt1KUAA6GTkPjeBCpctRQWrVHPjmGsUbtFGSTNhAuU1W07veK+am6kfo6qlSjF6OOlkTKB8big/qlZwypdXc1bz1XJze7haNRpAAGggpY1CmTRxcNMd/pvZJjlRM6yaG+y1WOKbWtQDl+hUumChjfICtb1qxT61vMHM0YR4ce/VYdXE54w1Lfs6RhfkVxLwA1S49CKDDYc190q7BW5TRa5jZ17bWaQD9pvBv+Bwjk65BYpz1dE6S8PY3l/CpTl3QWCszmdb1RIf8CU4A8BeQOs8E0t8pZuD5jOcDV1D2+jzd5mb7QMGcC6Bhbst3xX3bbMWw5F2Y1tuCgAgCPvFBG3U8eon6c2EJzhq2O2jn+/qE3Ea+MXEAhlY8GqGZsJxn9tgIFQ4FBnHOQe+r2ZBWLKX03SQkRy/nhP9BQw4Deb2HqWcAAAAAElFTkSuQmCC";

  function isValidJSON(str) {
    try {
      JSON.parse(str);
      return true;
    } catch (error) {
      return false;
    }
  }

  class BeepBoxPlayer {
    constructor() {
      runtime.on("PROJECT_STOP_ALL", () => {
        this.clearSynths();
      });
      runtime.on("PROJECT_START", () => {
        this.clearSynths();
      });
    }
    getInfo() {
      return {
        id: "dogeiscutbeepboxplayer",
        name: "BeepBox Player",
        color1: "#000000",
        color2: "#7744FF",
        color3: "#7744FF",
        menuIconURI: icon,
        blockIconURI: icon,
        blocks: [
          /*
            {
              blockType: Scratch.BlockType.BUTTON,
              text: "View Beta Warning",
              func: "betaWarning",
            },
            */
          /*
            {
              blockType: Scratch.BlockType.BUTTON,
              text: "View Song Warning",
              func: "regularWarning",
            },
            */
          //"---",
          {
            opcode: "current",
            blockType: Scratch.BlockType.REPORTER,
            text: "current [WHAT]",
            arguments: {
              WHAT: {
                type: Scratch.ArgumentType.STRING,
                menu: "CURRENT_MENU",
              },
            },
            disableMonitor: false,
          },
          {
            opcode: "song",
            blockType: Scratch.BlockType.REPORTER,
            text: "song [WHAT]",
            arguments: {
              WHAT: {
                type: Scratch.ArgumentType.STRING,
                menu: "SONG_MENU",
              },
            },
            disableMonitor: false,
          },
          {
            opcode: "playingSong",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "playing song?",
          },
          "---",
          {
            opcode: "setSong",
            blockType: Scratch.BlockType.COMMAND,
            text: "set song to [SONG]",
            arguments: {
              SONG: {
                type: Scratch.ArgumentType.STRING,
                defaultValue:
                  "5sbk4l00e0ftaa7g0fj7i0r1w1100f0000d1110c0000h0000v2200o3320b4z8Ql6hkpUsiczhkp5hDxN8Od5hAl6u74z8Ql6hkpUsp24ZFzzQ1E39kxIceEtoV8s66138l1S0L1u2139l1H39McyaeOgKA0TxAU213jj0NM4x8i0o0c86ywz7keUtVxQk1E3hi6OEcB8Atl0q0Qmm6eCexg6wd50oczkhO8VcsEeAc26gG3E1q2U406hG3i6jw94ksf8i5Uo0dZY26kHHzxp2gAgM0o4d516ej7uegceGwd0q84czm6yj8Xa0Q1EIIctcvq0Q1EE3ihE8W1OgV8s46Icxk7o24110w0OdgqMOk392OEWhS1ANQQ4toUctBpzRxx1M0WNSk1I3ANMEXwS3I79xSzJ7q6QtEXgw0",
              },
            },
          },
          //turns out this just works on its own, no extra block needed.
          /*
                      {
                          opcode: 'setSong',
                          blockType: Scratch.BlockType.COMMAND,
                          text: 'set song to json [SONG]',
                          arguments: {
                              SONG: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: `{"format":"BeepBox","version":9,"scale":"expert","key":"G","introBars":0,"loopBars":16,"beatsPerBar":8,"ticksPerBeat":4,"beatsPerMinute":190,"layeredInstruments":false,"patternInstruments":false,"channels":[{"type":"pitch","instruments":[{"type":"chip","volume":60,"eqFilter":[{"type":"low-pass","cutoffHz":11313.71,"linearGain":0.1768}],"effects":["chord type"],"chord":"arpeggio","fadeInSeconds":0,"fadeOutTicks":-3,"wave":"square","unison":"none","envelopes":[]}],"patterns":[{"notes":[{"pitches":[57],"points":[{"tick":0,"pitchBend":0,"volume":100},{"tick":2,"pitchBend":0,"volume":100}],"continuesLastPattern":false},{"pitches":[57],"points":[{"tick":2,"pitchBend":0,"volume":100},{"tick":4,"pitchBend":0,"volume":100}]},{"pitches":[57],"points":[{"tick":6,"pitchBend":0,"volume":100},{"tick":8,"pitchBend":0,"volume":100}]},{"pitches":[53],"points":[{"tick":10,"pitchBend":0,"volume":100},{"tick":12,"pitchBend":0,"volume":100}]},{"pitches":[57],"points":[{"tick":12,"pitchBend":0,"volume":100},{"tick":14,"pitchBend":0,"volume":100}]},{"pitches":[60],"points":[{"tick":16,"pitchBend":0,"volume":100},{"tick":18,"pitchBend":0,"volume":100}]}]},{"notes":[{"pitches":[53],"points":[{"tick":0,"pitchBend":0,"volume":100},{"tick":2,"pitchBend":0,"volume":100}],"continuesLastPattern":false},{"pitches":[48],"points":[{"tick":6,"pitchBend":0,"volume":100},{"tick":8,"pitchBend":0,"volume":100}]},{"pitches":[45],"points":[{"tick":12,"pitchBend":0,"volume":100},{"tick":14,"pitchBend":0,"volume":100}]},{"pitches":[50],"points":[{"tick":18,"pitchBend":0,"volume":100},{"tick":20,"pitchBend":0,"volume":100}]},{"pitches":[52],"points":[{"tick":22,"pitchBend":0,"volume":100},{"tick":24,"pitchBend":0,"volume":100}]},{"pitches":[51],"points":[{"tick":26,"pitchBend":0,"volume":100},{"tick":28,"pitchBend":0,"volume":100}]},{"pitches":[50],"points":[{"tick":28,"pitchBend":0,"volume":100},{"tick":30,"pitchBend":0,"volume":100}]}]},{"notes":[{"pitches":[48],"points":[{"tick":0,"pitchBend":0,"volume":100},{"tick":2,"pitchBend":0,"volume":100}],"continuesLastPattern":false},{"pitches":[57],"points":[{"tick":3,"pitchBend":0,"volume":100},{"tick":5,"pitchBend":0,"volume":100}]},{"pitches":[60],"points":[{"tick":6,"pitchBend":0,"volume":100},{"tick":8,"pitchBend":0,"volume":100}]},{"pitches":[62],"points":[{"tick":9,"pitchBend":0,"volume":100},{"tick":11,"pitchBend":0,"volume":100}]},{"pitches":[58],"points":[{"tick":13,"pitchBend":0,"volume":100},{"tick":15,"pitchBend":0,"volume":100}]},{"pitches":[60],"points":[{"tick":15,"pitchBend":0,"volume":100},{"tick":17,"pitchBend":0,"volume":100}]},{"pitches":[57],"points":[{"tick":19,"pitchBend":0,"volume":100},{"tick":21,"pitchBend":0,"volume":100}]},{"pitches":[53],"points":[{"tick":23,"pitchBend":0,"volume":100},{"tick":25,"pitchBend":0,"volume":100}]},{"pitches":[55],"points":[{"tick":25,"pitchBend":0,"volume":100},{"tick":27,"pitchBend":0,"volume":100}]},{"pitches":[52],"points":[{"tick":27,"pitchBend":0,"volume":100},{"tick":29,"pitchBend":0,"volume":100}]}]},{"notes":[{"pitches":[60],"points":[{"tick":4,"pitchBend":0,"volume":100},{"tick":6,"pitchBend":0,"volume":100}]},{"pitches":[59],"points":[{"tick":6,"pitchBend":0,"volume":100},{"tick":8,"pitchBend":0,"volume":100}]},{"pitches":[58],"points":[{"tick":8,"pitchBend":0,"volume":100},{"tick":10,"pitchBend":0,"volume":100}]},{"pitches":[56],"points":[{"tick":10,"pitchBend":0,"volume":100},{"tick":12,"pitchBend":0,"volume":100}]},{"pitches":[57],"points":[{"tick":14,"pitchBend":0,"volume":100},{"tick":16,"pitchBend":0,"volume":100}]},{"pitches":[49],"points":[{"tick":18,"pitchBend":0,"volume":100},{"tick":20,"pitchBend":0,"volume":100}]},{"pitches":[50],"points":[{"tick":20,"pitchBend":0,"volume":100},{"tick":22,"pitchBend":0,"volume":100}]},{"pitches":[53],"points":[{"tick":22,"pitchBend":0,"volume":100},{"tick":24,"pitchBend":0,"volume":100}]},{"pitches":[50],"points":[{"tick":26,"pitchBend":0,"volume":100},{"tick":28,"pitchBend":0,"volume":100}]},{"pitches":[53],"points":[{"tick":28,"pitchBend":0,"volume":100},{"tick":30,"pitchBend":0,"volume":100}]},{"pitches":[55],"points":[{"tick":30,"pitchBend":0,"volume":100},{"tick":32,"pitchBend":0,"volume":100}]}]},{"notes":[{"pitches":[60],"points":[{"tick":4,"pitchBend":0,"volume":100},{"tick":6,"pitchBend":0,"volume":100}]},{"pitches":[59],"points":[{"tick":6,"pitchBend":0,"volume":100},{"tick":8,"pitchBend":0,"volume":100}]},{"pitches":[58],"points":[{"tick":8,"pitchBend":0,"volume":100},{"tick":10,"pitchBend":0,"volume":100}]},{"pitches":[56],"points":[{"tick":10,"pitchBend":0,"volume":100},{"tick":12,"pitchBend":0,"volume":100}]},{"pitches":[57],"points":[{"tick":14,"pitchBend":0,"volume":100},{"tick":16,"pitchBend":0,"volume":100}]},{"pitches":[65],"points":[{"tick":18,"pitchBend":0,"volume":100},{"tick":20,"pitchBend":0,"volume":100}]},{"pitches":[65],"points":[{"tick":22,"pitchBend":0,"volume":100},{"tick":24,"pitchBend":0,"volume":100}]},{"pitches":[65],"points":[{"tick":24,"pitchBend":0,"volume":100},{"tick":26,"pitchBend":0,"volume":100}]}]},{"notes":[{"pitches":[56],"points":[{"tick":4,"pitchBend":0,"volume":100},{"tick":6,"pitchBend":0,"volume":100}]},{"pitches":[55],"points":[{"tick":10,"pitchBend":0,"volume":100},{"tick":12,"pitchBend":0,"volume":100}]},{"pitches":[53],"points":[{"tick":16,"pitchBend":0,"volume":100},{"tick":18,"pitchBend":0,"volume":100}]}]},{"notes":[{"pitches":[53],"points":[{"tick":0,"pitchBend":0,"volume":100},{"tick":2,"pitchBend":0,"volume":100}],"continuesLastPattern":false},{"pitches":[53],"points":[{"tick":2,"pitchBend":0,"volume":100},{"tick":4,"pitchBend":0,"volume":100}]},{"pitches":[53],"points":[{"tick":6,"pitchBend":0,"volume":100},{"tick":8,"pitchBend":0,"volume":100}]},{"pitches":[53],"points":[{"tick":10,"pitchBend":0,"volume":100},{"tick":12,"pitchBend":0,"volume":100}]},{"pitches":[55],"points":[{"tick":12,"pitchBend":0,"volume":100},{"tick":14,"pitchBend":0,"volume":100}]},{"pitches":[57],"points":[{"tick":16,"pitchBend":0,"volume":100},{"tick":18,"pitchBend":0,"volume":100}]},{"pitches":[53],"points":[{"tick":18,"pitchBend":0,"volume":100},{"tick":20,"pitchBend":0,"volume":100}]},{"pitches":[50],"points":[{"tick":22,"pitchBend":0,"volume":100},{"tick":24,"pitchBend":0,"volume":100}]},{"pitches":[48],"points":[{"tick":24,"pitchBend":0,"volume":100},{"tick":26,"pitchBend":0,"volume":100}]}]},{"notes":[{"pitches":[53],"points":[{"tick":0,"pitchBend":0,"volume":100},{"tick":2,"pitchBend":0,"volume":100}],"continuesLastPattern":false},{"pitches":[53],"points":[{"tick":2,"pitchBend":0,"volume":100},{"tick":4,"pitchBend":0,"volume":100}]},{"pitches":[53],"points":[{"tick":6,"pitchBend":0,"volume":100},{"tick":8,"pitchBend":0,"volume":100}]},{"pitches":[53],"points":[{"tick":10,"pitchBend":0,"volume":100},{"tick":12,"pitchBend":0,"volume":100}]},{"pitches":[55],"points":[{"tick":12,"pitchBend":0,"volume":100},{"tick":14,"pitchBend":0,"volume":100}]},{"pitches":[57],"points":[{"tick":14,"pitchBend":0,"volume":100},{"tick":16,"pitchBend":0,"volume":100}]}]}],"sequence":[1,2,3,2,3,4,5,4,6,4,5,4,6,7,8,7],"octaveScrollBar":3},{"type":"pitch","instruments":[{"type":"chip","volume":60,"eqFilter":[{"type":"low-pass","cutoffHz":11313.71,"linearGain":0.1768}],"effects":["chord type"],"chord":"arpeggio","fadeInSeconds":0,"fadeOutTicks":-3,"wave":"square","unison":"none","envelopes":[]}],"patterns":[{"notes":[{"pitches":[47],"points":[{"tick":0,"pitchBend":0,"volume":100},{"tick":2,"pitchBend":0,"volume":100}],"continuesLastPattern":false},{"pitches":[47],"points":[{"tick":2,"pitchBend":0,"volume":100},{"tick":4,"pitchBend":0,"volume":100}]},{"pitches":[47],"points":[{"tick":6,"pitchBend":0,"volume":100},{"tick":8,"pitchBend":0,"volume":100}]},{"pitches":[47],"points":[{"tick":10,"pitchBend":0,"volume":100},{"tick":12,"pitchBend":0,"volume":100}]},{"pitches":[47],"points":[{"tick":12,"pitchBend":0,"volume":100},{"tick":14,"pitchBend":0,"volume":100}]},{"pitches":[52],"points":[{"tick":16,"pitchBend":0,"volume":100},{"tick":18,"pitchBend":0,"volume":100}]},{"pitches":[48],"points":[{"tick":24,"pitchBend":0,"volume":100},{"tick":26,"pitchBend":0,"volume":100}]}]},{"notes":[{"pitches":[45],"points":[{"tick":0,"pitchBend":0,"volume":100},{"tick":2,"pitchBend":0,"volume":100}],"continuesLastPattern":false},{"pitches":[41],"points":[{"tick":6,"pitchBend":0,"volume":100},{"tick":8,"pitchBend":0,"volume":100}]},{"pitches":[36],"points":[{"tick":12,"pitchBend":0,"volume":100},{"tick":14,"pitchBend":0,"volume":100}]},{"pitches":[41],"points":[{"tick":18,"pitchBend":0,"volume":100},{"tick":20,"pitchBend":0,"volume":100}]},{"pitches":[43],"points":[{"tick":22,"pitchBend":0,"volume":100},{"tick":24,"pitchBend":0,"volume":100}]},{"pitches":[42],"points":[{"tick":26,"pitchBend":0,"volume":100},{"tick":28,"pitchBend":0,"volume":100}]},{"pitches":[41],"points":[{"tick":28,"pitchBend":0,"volume":100},{"tick":30,"pitchBend":0,"volume":100}]}]},{"notes":[{"pitches":[41],"points":[{"tick":0,"pitchBend":0,"volume":100},{"tick":2,"pitchBend":0,"volume":100}],"continuesLastPattern":false},{"pitches":[48],"points":[{"tick":3,"pitchBend":0,"volume":100},{"tick":5,"pitchBend":0,"volume":100}]},{"pitches":[52],"points":[{"tick":6,"pitchBend":0,"volume":100},{"tick":8,"pitchBend":0,"volume":100}]},{"pitches":[53],"points":[{"tick":9,"pitchBend":0,"volume":100},{"tick":11,"pitchBend":0,"volume":100}]},{"pitches":[50],"points":[{"tick":13,"pitchBend":0,"volume":100},{"tick":15,"pitchBend":0,"volume":100}]},{"pitches":[52],"points":[{"tick":15,"pitchBend":0,"volume":100},{"tick":17,"pitchBend":0,"volume":100}]},{"pitches":[50],"points":[{"tick":19,"pitchBend":0,"volume":100},{"tick":21,"pitchBend":0,"volume":100}]},{"pitches":[45],"points":[{"tick":23,"pitchBend":0,"volume":100},{"tick":25,"pitchBend":0,"volume":100}]},{"pitches":[46],"points":[{"tick":25,"pitchBend":0,"volume":100},{"tick":27,"pitchBend":0,"volume":100}]},{"pitches":[43],"points":[{"tick":27,"pitchBend":0,"volume":100},{"tick":29,"pitchBend":0,"volume":100}]}]},{"notes":[{"pitches":[57],"points":[{"tick":4,"pitchBend":0,"volume":100},{"tick":6,"pitchBend":0,"volume":100}]},{"pitches":[56],"points":[{"tick":6,"pitchBend":0,"volume":100},{"tick":8,"pitchBend":0,"volume":100}]},{"pitches":[55],"points":[{"tick":8,"pitchBend":0,"volume":100},{"tick":10,"pitchBend":0,"volume":100}]},{"pitches":[52],"points":[{"tick":10,"pitchBend":0,"volume":100},{"tick":12,"pitchBend":0,"volume":100}]},{"pitches":[53],"points":[{"tick":14,"pitchBend":0,"volume":100},{"tick":16,"pitchBend":0,"volume":100}]},{"pitches":[45],"points":[{"tick":18,"pitchBend":0,"volume":100},{"tick":20,"pitchBend":0,"volume":100}]},{"pitches":[46],"points":[{"tick":20,"pitchBend":0,"volume":100},{"tick":22,"pitchBend":0,"volume":100}]},{"pitches":[48],"points":[{"tick":22,"pitchBend":0,"volume":100},{"tick":24,"pitchBend":0,"volume":100}]},{"pitches":[41],"points":[{"tick":26,"pitchBend":0,"volume":100},{"tick":28,"pitchBend":0,"volume":100}]},{"pitches":[45],"points":[{"tick":28,"pitchBend":0,"volume":100},{"tick":30,"pitchBend":0,"volume":100}]},{"pitches":[46],"points":[{"tick":30,"pitchBend":0,"volume":100},{"tick":32,"pitchBend":0,"volume":100}]}]},{"notes":[{"pitches":[57],"points":[{"tick":4,"pitchBend":0,"volume":100},{"tick":6,"pitchBend":0,"volume":100}]},{"pitches":[56],"points":[{"tick":6,"pitchBend":0,"volume":100},{"tick":8,"pitchBend":0,"volume":100}]},{"pitches":[55],"points":[{"tick":8,"pitchBend":0,"volume":100},{"tick":10,"pitchBend":0,"volume":100}]},{"pitches":[52],"points":[{"tick":10,"pitchBend":0,"volume":100},{"tick":12,"pitchBend":0,"volume":100}]},{"pitches":[53],"points":[{"tick":14,"pitchBend":0,"volume":100},{"tick":16,"pitchBend":0,"volume":100}]},{"pitches":[58],"points":[{"tick":18,"pitchBend":0,"volume":100},{"tick":20,"pitchBend":0,"volume":100}]},{"pitches":[58],"points":[{"tick":22,"pitchBend":0,"volume":100},{"tick":24,"pitchBend":0,"volume":100}]},{"pitches":[58],"points":[{"tick":24,"pitchBend":0,"volume":100},{"tick":26,"pitchBend":0,"volume":100}]}]},{"notes":[{"pitches":[49],"points":[{"tick":4,"pitchBend":0,"volume":100},{"tick":6,"pitchBend":0,"volume":100}]},{"pitches":[46],"points":[{"tick":10,"pitchBend":0,"volume":100},{"tick":12,"pitchBend":0,"volume":100}]},{"pitches":[45],"points":[{"tick":16,"pitchBend":0,"volume":100},{"tick":18,"pitchBend":0,"volume":100}]}]},{"notes":[{"pitches":[49],"points":[{"tick":0,"pitchBend":0,"volume":100},{"tick":2,"pitchBend":0,"volume":100}],"continuesLastPattern":false},{"pitches":[49],"points":[{"tick":2,"pitchBend":0,"volume":100},{"tick":4,"pitchBend":0,"volume":100}]},{"pitches":[49],"points":[{"tick":6,"pitchBend":0,"volume":100},{"tick":8,"pitchBend":0,"volume":100}]},{"pitches":[49],"points":[{"tick":10,"pitchBend":0,"volume":100},{"tick":12,"pitchBend":0,"volume":100}]},{"pitches":[51],"points":[{"tick":12,"pitchBend":0,"volume":100},{"tick":14,"pitchBend":0,"volume":100}]},{"pitches":[48],"points":[{"tick":16,"pitchBend":0,"volume":100},{"tick":18,"pitchBend":0,"volume":100}]},{"pitches":[45],"points":[{"tick":18,"pitchBend":0,"volume":100},{"tick":20,"pitchBend":0,"volume":100}]},{"pitches":[45],"points":[{"tick":22,"pitchBend":0,"volume":100},{"tick":24,"pitchBend":0,"volume":100}]},{"pitches":[41],"points":[{"tick":24,"pitchBend":0,"volume":100},{"tick":26,"pitchBend":0,"volume":100}]}]},{"notes":[{"pitches":[49],"points":[{"tick":0,"pitchBend":0,"volume":100},{"tick":2,"pitchBend":0,"volume":100}],"continuesLastPattern":false},{"pitches":[49],"points":[{"tick":2,"pitchBend":0,"volume":100},{"tick":4,"pitchBend":0,"volume":100}]},{"pitches":[49],"points":[{"tick":6,"pitchBend":0,"volume":100},{"tick":8,"pitchBend":0,"volume":100}]},{"pitches":[49],"points":[{"tick":10,"pitchBend":0,"volume":100},{"tick":12,"pitchBend":0,"volume":100}]},{"pitches":[51],"points":[{"tick":12,"pitchBend":0,"volume":100},{"tick":14,"pitchBend":0,"volume":100}]},{"pitches":[48],"points":[{"tick":14,"pitchBend":0,"volume":100},{"tick":16,"pitchBend":0,"volume":100}]}]}],"sequence":[1,2,3,2,3,4,5,4,6,4,5,4,6,7,8,7],"octaveScrollBar":3},{"type":"pitch","instruments":[{"type":"chip","volume":100,"eqFilter":[{"type":"low-pass","cutoffHz":11313.71,"linearGain":0.1768}],"effects":["chord type"],"chord":"arpeggio","fadeInSeconds":0,"fadeOutTicks":-3,"wave":"triangle","unison":"none","envelopes":[]}],"patterns":[{"notes":[{"pitches":[31],"points":[{"tick":0,"pitchBend":0,"volume":100},{"tick":2,"pitchBend":0,"volume":100}],"continuesLastPattern":false},{"pitches":[31],"points":[{"tick":2,"pitchBend":0,"volume":100},{"tick":4,"pitchBend":0,"volume":100}]},{"pitches":[31],"points":[{"tick":6,"pitchBend":0,"volume":100},{"tick":8,"pitchBend":0,"volume":100}]},{"pitches":[31],"points":[{"tick":10,"pitchBend":0,"volume":100},{"tick":12,"pitchBend":0,"volume":100}]},{"pitches":[31],"points":[{"tick":12,"pitchBend":0,"volume":100},{"tick":14,"pitchBend":0,"volume":100}]},{"pitches":[36],"points":[{"tick":16,"pitchBend":0,"volume":100},{"tick":18,"pitchBend":0,"volume":100}]},{"pitches":[36],"points":[{"tick":24,"pitchBend":0,"volume":100},{"tick":26,"pitchBend":0,"volume":100}]}]},{"notes":[{"pitches":[36],"points":[{"tick":0,"pitchBend":0,"volume":100},{"tick":2,"pitchBend":0,"volume":100}],"continuesLastPattern":false},{"pitches":[33],"points":[{"tick":6,"pitchBend":0,"volume":100},{"tick":8,"pitchBend":0,"volume":100}]},{"pitches":[29],"points":[{"tick":12,"pitchBend":0,"volume":100},{"tick":14,"pitchBend":0,"volume":100}]},{"pitches":[34],"points":[{"tick":18,"pitchBend":0,"volume":100},{"tick":20,"pitchBend":0,"volume":100}]},{"pitches":[36],"points":[{"tick":22,"pitchBend":0,"volume":100},{"tick":24,"pitchBend":0,"volume":100}]},{"pitches":[35],"points":[{"tick":26,"pitchBend":0,"volume":100},{"tick":28,"pitchBend":0,"volume":100}]},{"pitches":[34],"points":[{"tick":28,"pitchBend":0,"volume":100},{"tick":30,"pitchBend":0,"volume":100}]}]},{"notes":[{"pitches":[33],"points":[{"tick":0,"pitchBend":0,"volume":100},{"tick":2,"pitchBend":0,"volume":100}],"continuesLastPattern":false},{"pitches":[41],"points":[{"tick":3,"pitchBend":0,"volume":100},{"tick":5,"pitchBend":0,"volume":100}]},{"pitches":[45],"points":[{"tick":6,"pitchBend":0,"volume":100},{"tick":8,"pitchBend":0,"volume":100}]},{"pitches":[46],"points":[{"tick":9,"pitchBend":0,"volume":100},{"tick":11,"pitchBend":0,"volume":100}]},{"pitches":[43],"points":[{"tick":13,"pitchBend":0,"volume":100},{"tick":15,"pitchBend":0,"volume":100}]},{"pitches":[45],"points":[{"tick":15,"pitchBend":0,"volume":100},{"tick":17,"pitchBend":0,"volume":100}]},{"pitches":[41],"points":[{"tick":19,"pitchBend":0,"volume":100},{"tick":21,"pitchBend":0,"volume":100}]},{"pitches":[38],"points":[{"tick":23,"pitchBend":0,"volume":100},{"tick":25,"pitchBend":0,"volume":100}]},{"pitches":[40],"points":[{"tick":25,"pitchBend":0,"volume":100},{"tick":27,"pitchBend":0,"volume":100}]},{"pitches":[36],"points":[{"tick":27,"pitchBend":0,"volume":100},{"tick":29,"pitchBend":0,"volume":100}]}]},{"notes":[{"pitches":[29],"points":[{"tick":0,"pitchBend":0,"volume":100},{"tick":2,"pitchBend":0,"volume":100}],"continuesLastPattern":false},{"pitches":[36],"points":[{"tick":6,"pitchBend":0,"volume":100},{"tick":8,"pitchBend":0,"volume":100}]},{"pitches":[41],"points":[{"tick":12,"pitchBend":0,"volume":100},{"tick":14,"pitchBend":0,"volume":100}]},{"pitches":[34],"points":[{"tick":16,"pitchBend":0,"volume":100},{"tick":18,"pitchBend":0,"volume":100}]},{"pitches":[41],"points":[{"tick":22,"pitchBend":0,"volume":100},{"tick":24,"pitchBend":0,"volume":100}]},{"pitches":[41],"points":[{"tick":24,"pitchBend":0,"volume":100},{"tick":26,"pitchBend":0,"volume":100}]}]},{"notes":[{"pitches":[29],"points":[{"tick":0,"pitchBend":0,"volume":100},{"tick":2,"pitchBend":0,"volume":100}],"continuesLastPattern":false},{"pitches":[33],"points":[{"tick":6,"pitchBend":0,"volume":100},{"tick":8,"pitchBend":0,"volume":100}]},{"pitches":[36],"points":[{"tick":12,"pitchBend":0,"volume":100},{"tick":14,"pitchBend":0,"volume":100}]},{"pitches":[41],"points":[{"tick":14,"pitchBend":0,"volume":100},{"tick":16,"pitchBend":0,"volume":100}]}]},{"notes":[{"pitches":[29],"points":[{"tick":0,"pitchBend":0,"volume":100},{"tick":2,"pitchBend":0,"volume":100}],"continuesLastPattern":false},{"pitches":[37],"points":[{"tick":4,"pitchBend":0,"volume":100},{"tick":6,"pitchBend":0,"volume":100}]},{"pitches":[39],"points":[{"tick":10,"pitchBend":0,"volume":100},{"tick":12,"pitchBend":0,"volume":100}]},{"pitches":[41],"points":[{"tick":16,"pitchBend":0,"volume":100},{"tick":18,"pitchBend":0,"volume":100}]},{"pitches":[36],"points":[{"tick":22,"pitchBend":0,"volume":100},{"tick":24,"pitchBend":0,"volume":100}]},{"pitches":[36],"points":[{"tick":24,"pitchBend":0,"volume":100},{"tick":26,"pitchBend":0,"volume":100}]},{"pitches":[29],"points":[{"tick":28,"pitchBend":0,"volume":100},{"tick":30,"pitchBend":0,"volume":100}]}]},{"notes":[{"pitches":[25],"points":[{"tick":0,"pitchBend":0,"volume":100},{"tick":2,"pitchBend":0,"volume":100}],"continuesLastPattern":false},{"pitches":[32],"points":[{"tick":6,"pitchBend":0,"volume":100},{"tick":8,"pitchBend":0,"volume":100}]},{"pitches":[37],"points":[{"tick":12,"pitchBend":0,"volume":100},{"tick":14,"pitchBend":0,"volume":100}]},{"pitches":[36],"points":[{"tick":16,"pitchBend":0,"volume":100},{"tick":18,"pitchBend":0,"volume":100}]},{"pitches":[29],"points":[{"tick":22,"pitchBend":0,"volume":100},{"tick":24,"pitchBend":0,"volume":100}]},{"pitches":[24],"points":[{"tick":28,"pitchBend":0,"volume":100},{"tick":30,"pitchBend":0,"volume":100}]}]},{"notes":[{"pitches":[25],"points":[{"tick":0,"pitchBend":0,"volume":100},{"tick":2,"pitchBend":0,"volume":100}],"continuesLastPattern":false},{"pitches":[32],"points":[{"tick":6,"pitchBend":0,"volume":100},{"tick":8,"pitchBend":0,"volume":100}]},{"pitches":[37],"points":[{"tick":12,"pitchBend":0,"volume":100},{"tick":14,"pitchBend":0,"volume":100}]},{"pitches":[36],"points":[{"tick":16,"pitchBend":0,"volume":100},{"tick":18,"pitchBend":0,"volume":100}]},{"pitches":[29],"points":[{"tick":22,"pitchBend":0,"volume":100},{"tick":24,"pitchBend":0,"volume":100}]},{"pitches":[24],"points":[{"tick":28,"pitchBend":0,"volume":100},{"tick":30,"pitchBend":0,"volume":100}]}]}],"sequence":[1,2,3,2,3,4,5,4,6,4,5,4,6,7,8,7],"octaveScrollBar":2},{"type":"drum","instruments":[{"type":"noise","volume":100,"eqFilter":[],"effects":["transition type","chord type"],"transition":"interrupt","chord":"arpeggio","fadeInSeconds":0,"fadeOutTicks":-1,"wave":"retro","envelopes":[]}],"patterns":[{"notes":[]},{"notes":[]},{"notes":[]},{"notes":[]},{"notes":[]},{"notes":[]},{"notes":[]},{"notes":[]}],"sequence":[1,2,3,2,3,4,5,4,6,4,5,4,6,7,8,7]}]}`,
                              }
                          },
                      },
                      */
          {
            opcode: "setCurrentValue",
            blockType: Scratch.BlockType.COMMAND,
            text: "set current [WHAT] to [VALUE]",
            arguments: {
              WHAT: {
                type: Scratch.ArgumentType.STRING,
                menu: "CURRENT_MENU_LIMITED",
              },
              VALUE: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 2,
              },
            },
            disableMonitor: false,
          },
          {
            opcode: "setSongValue",
            blockType: Scratch.BlockType.COMMAND,
            text: "set song [WHAT] to [VALUE]",
            arguments: {
              WHAT: {
                type: Scratch.ArgumentType.STRING,
                menu: "SONG_MENU_LIMITED",
              },
              VALUE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "150",
              },
            },
            disableMonitor: false,
          },
          "---",
          {
            opcode: "playSong",
            blockType: Scratch.BlockType.COMMAND,
            text: "play current song",
          },
          {
            opcode: "playSongWait",
            blockType: Scratch.BlockType.COMMAND,
            text: "play current song and wait",
          },
          {
            opcode: "pauseSong",
            blockType: Scratch.BlockType.COMMAND,
            text: "pause current song",
          },
          {
            opcode: "stopSong",
            blockType: Scratch.BlockType.COMMAND,
            text: "stop current song",
          },
          {
            opcode: "restartSong",
            blockType: Scratch.BlockType.COMMAND,
            text: "restart current song",
          },
          "---",
          {
            opcode: "setSongVolume",
            blockType: Scratch.BlockType.COMMAND,
            text: "set song volume to [VOLUME]%",
            arguments: {
              VOLUME: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100,
              },
            },
          },
          {
            opcode: "changeSongVolume",
            blockType: Scratch.BlockType.COMMAND,
            text: "change song volume by [VOLUME]%",
            arguments: {
              VOLUME: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 25,
              },
            },
          },
          "---",
          {
            opcode: "enableLooping",
            blockType: Scratch.BlockType.COMMAND,
            text: "enable looping",
          },
          {
            opcode: "disableLooping",
            blockType: Scratch.BlockType.COMMAND,
            text: "disable looping",
          },
          {
            opcode: "looping",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "looping?",
          },
          "---",
          {
            opcode: "synths",
            blockType: Scratch.BlockType.REPORTER,
            text: "synths",
          },
          {
            opcode: "targetSynth",
            blockType: Scratch.BlockType.REPORTER,
            text: "target synth",
          },
          {
            opcode: "createSynth",
            blockType: Scratch.BlockType.COMMAND,
            text: "create new synth",
          },
          {
            opcode: "setTargetSynth",
            blockType: Scratch.BlockType.COMMAND,
            text: "set target synth to [SYNTH]",
            arguments: {
              SYNTH: {
                type: Scratch.ArgumentType.NUMBER, //todo: make this a dropdown
                defaultValue: 1,
              },
            },
          },
          /*
                      {
                          opcode: 'deleteSynth',
                          blockType: Scratch.BlockType.COMMAND,
                          text: 'delete synth [SYNTH]',
                          arguments: {
                              SYNTH: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1
                              },
                          },
                      },
                      */
          {
            opcode: "clearSynths",
            blockType: Scratch.BlockType.COMMAND,
            text: "clear synths",
          },
        ],
        menus: {
          CURRENT_MENU: {
            acceptReporters: false, //scratch consitsancy, also disables monitor if true, sorry!
            items: ["song", "bar", "beat", "part", "tick"],
          },
          SONG_MENU: {
            acceptReporters: false, //scratch consitsancy, also disables monitor if true, sorry!
            items: ["tempo", "channels", "volume", "title"],
          },
          CURRENT_MENU_LIMITED: {
            acceptReporters: false, //scratch consitsancy, also disables monitor if true, sorry!
            items: ["bar", "beat", "part"],
          },
          SONG_MENU_LIMITED: {
            acceptReporters: false, //scratch consitsancy, also disables monitor if true, sorry!
            items: ["tempo", "title"],
          },
        },
      };
    }

    /*betaWarning() {
        alert(
          "This extension is in beta. Currently, songs are uneffected by anything in the sounds tab, as well as the volume slider you can get with addons. \n\nThese behaviors may change in the future in the form of new blocks, so be warned."
        );
      }*/

    /*regularWarning() {
        alert(
          "When setting your song, copy the song data URL, the whole URL, or use the contents JSON export. If the song is invalid, it will horribly break the project as there is no good way to check if a song is valid or not. \n\nTDLR: Make backups before setting a song."
        );
      }*/

    current(args) {
      switch (args.WHAT) {
        case "song":
          return Scratch.Cast.toString(url);
        case "bar":
          return synth.bar;
        case "beat":
          return synth.beat;
        case "part":
          return synth.part;
        case "tick":
          return synth.tick;
      }
    }
    setCurrentValue(args) {
      switch (args.WHAT) {
        case "bar":
          synth.bar = Math.min(Math.max(args.VALUE, 0), synth.song.barCount);
          synth.snapToBar();
          break;
        case "beat":
          synth.beat = Math.min(
            Math.max(args.VALUE, 0),
            synth.song.beatsPerBar
          );
          synth.part = 0;
          synth.tick = 0;
          synth.tickSampleCountdown = 0;
          break;
        case "part":
          synth.part = args.VALUE;
          break;
      }
    }
    song(args) {
      switch (args.WHAT) {
        case "tempo":
          return synth.song.tempo;
        case "channels":
          return synth.song.channels.length;
        case "volume":
          return (synth.volume / 1) * 100;
        case "title":
          return synth.song.title;
      }
    }
    setSongValue(args) {
      switch (args.WHAT) {
        case "tempo":
          synth.song.tempo = Math.max(Scratch.Cast.toNumber(args.VALUE), 0);
          return;
        case "title":
          synth.song.title = Scratch.Cast.toString(args.VALUE);
          return;
      }
    }

    playingSong(args) {
      return synth.isPlayingSong;
    }

    setSong(args) {
      //let song = Scratch.Cast.toString(args.SONG).replace(/\\/g, '/').replace(/https:\/\/|jummbus\.bitbucket\.io|www\.beepbox\.co|ultraabox\.github\.io|\/#/g, '').replace(/[^A-Za-z0-9_]/g, '') //better safe than sorry
      //let song = Scratch.Cast.toString(args.SONG).replace(/.*?#/, "").replace(/[^A-Za-z0-9_\-()%!<>~"'.*]/g, ""); //if your song uses emojis, i dont care
      let song = Scratch.Cast.toString(args.SONG);
      song = isValidJSON(song) ? song : song.replace(/.*?#/, "");
      console.log("Loaded BeepBox Song: " + song);
      url = song;
      synth.setSong(song);
    }

    playSong(args) {
      synth.activateAudio();
      synth.play();
    }

    playSongWait(args) {
      synth.activateAudio();
      synth.play();
      return new Promise((resolve, reject) => {
        const checkIsPlaying = () => {
          if (synth.isPlayingSong) {
            setTimeout(checkIsPlaying, 100);
          } else {
            resolve();
          }
        };

        checkIsPlaying();
      });
    }

    pauseSong(args) {
      synth.pause();
    }
    stopSong(args) {
      synth.snapToStart();
      synth.pause();
    }
    restartSong() {
      synth.snapToStart();
    }

    setSongVolume(args) {
      synth.volume = Math.max(
        Math.min(
          ((args.VOLUME * 1) / 100) *
            Scratch.vm.runtime.audioEngine.inputNode.gain.value,
          200
        ),
        0
      );
    }
    changeSongVolume(args) {
      synth.volume += Math.max(
        Math.min(
          ((args.VOLUME * 1) / 100) *
            Scratch.vm.runtime.audioEngine.inputNode.gain.value,
          200
        ),
        0
      );
    }

    disableLooping(args) {
      synth.loopRepeatCount = 0;
    }
    enableLooping(args) {
      synth.loopRepeatCount = -1;
    }
    looping(args) {
      return synth.loopRepeatCount == -1 ? true : false;
    }

    createSynth(args) {
      synth = new beepbox.Synth(url);
      synths.push(synth);
      synth.volume = 2;
      targetSynth = synths.length - 1;
    }

    synths(args) {
      return synths.length;
    }

    targetSynth(args) {
      return targetSynth + 1;
    }

    setTargetSynth(args) {
      let length = synths.length - 1;
      targetSynth = Math.max(0, Math.min(args.SYNTH - 1, length));
      synth = synths[targetSynth];
    }

    /*
          deleteSynth(args) {
              let length = synths.length-1;
              targetSynth = Math.max(0,Math.min(args.SYNTH-1,length));
              synths[targetSynth] = undefined;
          }
          */
    clearSynths(args) {
      for (let i of synths) {
        i.deactivateAudio();
        i = undefined;
      }
      synths = [];
      synth = new beepbox.Synth(url);
      synths.push(synth);
      synth.volume = 1;
    }
  }

  Scratch.extensions.register(new BeepBoxPlayer());
})(Scratch);
