(function(Scratch) {
    'use strict'
    String.prototype.replaceArray = function(find, REPLACEMENT) {
      var replaceString = this;
      var regex; 
      for (var i = 0; i < find.length; i++) {
        regex = new RegExp(find[i], "i");
        replaceString = replaceString.replace(regex, REPLACEMENT);
      }
      return replaceString;
    };
    var find = [atob("ZnVjaw=="),atob("YXJzZQ=="),atob("YXJzZWhvbGU="),atob("YXNz"),atob("YXNzZXM="),atob("YXNzZmFjZQ=="),atob("YXNzZmFjZXM="),atob("YXNzaG9sZQ=="),atob("YXNzaG9sZXM="),atob("YmFzdGFyZA=="),atob("YmFzdGFyZHM="),atob("YmVhbmVy"),atob("YmVsbGVuZA=="),atob("YmludA=="),atob("Yml0Y2g="),atob("Yml0Y2hlcw=="),atob("Yml0Y2h5"),atob("Ymxvd2pvYg=="),atob("Ymx1bXA="),atob("Ymx1bXBraW4="),atob("Ym9sbG9ja3M="),atob("Ym9sbG94"),atob("Ym9uZXI="),atob("YnVra2FrZQ=="),atob("YnVsbHNoaXQ="),atob("YnVuZ2hvbGU="),atob("YnV0dGNoZWVrcw=="),atob("YnV0dGhvbGU="),atob("YnV0dHBpcmF0ZQ=="),atob("YnV0dHBsdWc="),atob("Y2FycGV0bXVuY2hlcg=="),atob("Y2hpbmM="),atob("Y2hpbms="),atob("Y2hvYWQ="),atob("Y2hvZGU="),atob("Y2lyY2xlamVyaw=="),atob("Y2xpdA=="),atob("Y2x1bmdl"),atob("Y29jaw=="),atob("Y29ja3N1Y2tlcg=="),atob("Y29ja3N1Y2tlcnM="),atob("Y29ja3N1Y2tpbmc="),atob("Y29vY2hpZQ=="),atob("Y29vY2h5"),atob("Y29vbg=="),atob("Y29vdGVy"),atob("Y29ybmhvbGU="),atob("Y3Vt"),atob("Y3Vubmll"),atob("Y3VudA=="),atob("Y3VudHM="),atob("ZGFnbw=="),atob("ZGlj"),atob("ZGljaw=="),atob("ZGlja2hlYWQ="),atob("ZGlja2hlYWRz"),atob("ZGlr"),atob("ZGlrZQ=="),atob("ZGlsZG8="),atob("ZG9vY2hiYWc="),atob("ZG9vc2g="),atob("ZG91Y2hl"),atob("ZG91Y2hlYmFn"),atob("ZHVtYmFzcw=="),atob("ZHVtYmFzc2Vz"),atob("ZHlrZQ=="),atob("ZmFn"),atob("ZmFnZ2V0"),atob("ZmFnZ2l0"),atob("ZmFnZ290"),atob("ZmFnZ290cw=="),atob("ZmFndGFyZA=="),atob("ZmFubnk="),atob("ZmVjaw=="),atob("ZmVsY2g="),atob("ZmVsdGNo"),atob("ZmlnZ2luZw=="),atob("ZmluZ2VyYmFuZw=="),atob("ZnJvdHRpbmc="),atob("ZnVj"),atob("ZnVjaw=="),atob("ZnVja2Vk"),atob("ZnVja2VkdXA="),atob("ZnVja2Vy"),atob("ZnVja2Vycw=="),atob("ZnVja2luZw=="),atob("ZnVja29mZg=="),atob("ZnVja3M="),atob("ZnVja3Vw"),atob("ZnVkZ2VwYWNrZXI="),atob("ZnVr"),atob("ZnVra2Vy"),atob("ZnVra2Vycw=="),atob("ZnVx"),atob("Z2FuZ2Jhbmc="),atob("Z2FzaA=="),atob("Z29kZGFtbg=="),atob("Z29kZGFtbml0"),atob("Z29ra3Vu"),atob("Z29vY2g="),atob("Z29vaw=="),atob("Z3VpZG8="),atob("aGVlYg=="),atob("aG9ua2V5"),atob("aG9va2Vy"),atob("amFja2Fzcw=="),atob("amFja2Fzc2Vz"),atob("amFja29mZg=="),atob("amFw"),atob("amVya29mZg=="),atob("amlnYWJvbw=="),atob("amlnZ2VyYm9v"),atob("aml6eg=="),atob("anVuZ2xlYnVubnk="),atob("a2lrZQ=="),atob("a25vYmJpbmc="),atob("a29vY2g="),atob("a29vdGNo"),atob("a3JhdXQ="),atob("a3lrZQ=="),atob("bGVzYm8="),atob("bGV6emll"),atob("bWlsZg=="),atob("bWluZ2U="),atob("bW90aGVyZnVja2Vy"),atob("bW90aGVyZnVja2Vycw=="),atob("bW90aGVyZnVja2luZw=="),atob("bXVmZg=="),atob("bXVmZmRpdmVy"),atob("bXVmZmRpdmluZw=="),atob("bXVuZ2luZw=="),atob("bXVudGVy"),atob("bmdnYQ=="),atob("bmlnYQ=="),atob("bmlnZ2E="),atob("bmlnZ2Vy"),atob("bmlnZ2Vycw=="),atob("bmlnbGV0"),atob("bmlncg=="),atob("cGFraQ=="),atob("cGFub29jaA=="),atob("cGVja2Vy"),atob("cGVja2VyaGVhZA=="),atob("cGlsbG9jaw=="),atob("cGlzcw=="),atob("cGlzc2Vk"),atob("cG9sbG9jaw=="),atob("cG9vbg=="),atob("cG9vbmFuaQ=="),atob("cG9vbmFueQ=="),atob("cG9vbnRhbmc="),atob("cG9yY2htb25rZXk="),atob("cHJpY2s="),atob("cHVuYW5p"),atob("cHVuYW5ueQ=="),atob("cHVuYW55"),atob("cHVzc2ll"),atob("cHVzc2llcw=="),atob("cHVzc3k="),atob("cHV0YQ=="),atob("cHV0bw=="),atob("cXVpbQ=="),atob("cmFnaGVhZA=="),atob("cnVza2k="),atob("c2NobG9uZw=="),atob("c2Nyb3Rl"),atob("c2hhZw=="),atob("c2hpdA=="),atob("c2hpdGU="),atob("c2hpdGhlYWQ="),atob("c2hpdGhlYWRz"),atob("c2hpdHM="),atob("c2hpdHRpZXI="),atob("c2hpdHRpZXN0"),atob("c2hpdHRpbmc="),atob("c2hpdHR5"),atob("c2thbms="),atob("c2tlZXQ="),atob("c2xhZw=="),atob("c2xhbnRleWU="),atob("c2x1dA=="),atob("c21hcnRhc3M="),atob("c21hcnRhc3Nlcw=="),atob("c21lZw=="),atob("c25hdGNo"),atob("c3BpYw=="),atob("c3BpY2s="),atob("c3Bsb29nZQ=="),atob("c3Bvb2dl"),atob("dGVhYmFnZ2luZw=="),atob("dGl0"),atob("dGl0aWVz"),atob("dGl0cw=="),atob("dGl0dGllcw=="),atob("dGl0dHk="),atob("dG9zc2Vy"),atob("dG93ZWxoZWFk"),atob("dHdhdA=="),atob("dmlicmF0b3I="),atob("d2Fuaw=="),atob("d2Fua2Vy"),atob("d2V0YmFjaw=="),atob("d2hvcmU="),atob("d2lzZWFzcw=="),atob("d2lzZWFzc2Vz"),atob("d29w")]
    const vm = Scratch.vm;
      class profanityTW {
        getInfo () {
          return { 
            id: 'profanityTW',
            name: 'Profanity',
            color1: '#cf6a3c',
            color2: '#cf6a3c',
            color3: '#cf6a3c',
            blocks: [
             {
              opcode: 'checkProfanity',
              blockType: Scratch.BlockType.REPORTER,
              text: "Replace profanity from [TEXT] with [REPLACEMENT]",
              arguments: {
                REPLACEMENT:{
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: '***',
                },
                TEXT: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'Bad word here',
                }
                
             }
             },
          ]
          }
        }
    
    
        checkProfanity({TEXT,REPLACEMENT}) {
          return TEXT.replaceArray(find, REPLACEMENT);
      }
    }
    
    
      Scratch.extensions.register(new profanityTW());
    })(Scratch);
