// What are you doing here?
// Are you lost?

(function(Scratch) {
  'use strict';

  const vm = Scratch.vm;
  const runtime = vm.runtime;
  const canvas = vm.renderer.canvas;
  const Cast = Scratch.Cast;

  const youtubeIcon = 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxNjMuMjc5MjEiIGhlaWdodD0iMTE0LjMwMDc2IiB2aWV3Qm94PSIwLDAsMTYzLjI3OTIxLDExNC4zMDA3NiI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE1OC4zNjA0LC0xMjIuODQ5NjIpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48Zz48cGF0aCBkPSJNMzIxLjYzOTYsMTgwYzAsMCAwLDI2LjU3MjY0IC0zLjQxNDE3LDM5LjMwMTE4Yy0xLjg4MTM5LDcuMDI5NDkgLTcuNDA2MTEsMTIuNTUzNjUgLTE0LjQzNTYxLDE0LjQzNTA0Yy0xMi43Mjc5NiwzLjQxNDE2IC02My43OTAxMiwzLjQxNDE2IC02My43OTAxMiwzLjQxNDE2YzAsMCAtNTEuMDYxNDYsMCAtNjMuNzg5OTQsLTMuNDE0MTZjLTcuMDI5NDksLTEuODgxMzkgLTEyLjU1MzY5LC03LjQwNTU0IC0xNC40MzU0LC0xNC40MzUwNGMtMy40MTM5NywtMTIuNzI4NTMgLTMuNDEzOTcsLTM5LjMwMTE3IC0zLjQxMzk3LC0zOS4zMDExN2MwLDAgMCwtMjYuNTcyNTMgMy40MTM5NywtMzkuMzAwOTVjMS44ODE3MSwtNy4wMjk1NSA3LjQwNTkxLC0xMi41NTM3NSAxNC40MzU0LC0xNC40MzU0NmMxMi43Mjg0OCwtMy40MTM5NyA2My43ODk5NCwtMy40MTM5NyA2My43ODk5NCwtMy40MTM5N2MwLDAgNTEuMDYyMTYsMCA2My43OTAxMiwzLjQxMzk3YzcuMDI5NDksMS44ODE3MiAxMi41NTQyMiw3LjQwNTkxIDE0LjQzNTYxLDE0LjQzNTQ2YzMuNDAwNDUsMTIuNzI4NDIgMy40MTQxNywzOS4zMDA5NSAzLjQxNDE3LDM5LjMwMDk1eiIgZmlsbD0iI2ZmMDAwMCIvPjxwYXRoIGQ9Ik0yMjMuNjU2NDIsMTU1LjUxMjk1bDQyLjQxOTMsMjQuNDg5MzRsLTQyLjQxOTMsMjQuNDg4OTR6IiBmaWxsPSIjZmZmZmZmIi8+PC9nPjwvZz48L2c+PC9zdmc+PCEtLXJvdGF0aW9uQ2VudGVyOjgxLjYzOTYwMjUwMDAwMDA4OjU3LjE1MDM4LS0+';

  const get_platform = () => {
    if (window.location.href.includes('https://turbowarp.org/')) {
      return {
        type: 'online',
        support: 'TurboWarp Website'
      };
    } else if (window.location.href.includes('blob:')) {
      return {
        type: 'online',
        support: 'Blob'
      };
    } else if (window.location.href.includes('.app/Contents/Resources/index.html')) {
      return {
        type: 'packaged',
        support: 'MacOS'
      };
    } else if (window.location.href.includes('/resources/app/index.html')) {
      return {
        type: 'packaged',
        support: if_then_return_else_return(navigator.userAgent.includes('Linux'), 'Linux', 'Windows')
      };
    } else if (document.body.innerHTML.includes('<script src="script.js"></script>')) {
      return {
        type: 'packaged',
        support: 'Zip'
      };
    } else if (document.body.innerHTML.includes('const getProjectData = (function() {')) {
      return {
        type: 'packaged',
        support: 'single html'
      };
    }
  }
  
  function get_css_filter_of(element_query){
    let element = document.querySelector(element_query);
  
    const itemOfFromString = (no, from, splitby) => {
      return String(from).split(splitby)[(Number(no) - 1)] || '';
    }
  
    var data = {};
    var filters = ['blur', 'brightness', 'contrast', 'grayscale', 'hue-rotate', 'invert', 'opacity', 'saturate', 'sepia'];
  
    for (var i in filters){
      if (element.style.filter.includes(filters[i])){
        data[filters[i]] = itemOfFromString(1, itemOfFromString(2, element.style.filter, filters[i] + '('), ')');
      } else {
        data[filters[i]] = NaN;
      }
    }
  
    return data;
  }
  
  function set_css_filter_of(element_query, filter_name, value){
    var filters = get_css_filter_of(element_query);
    document.querySelector(element_query).style.filter=document.querySelector(element_query).style.filter.replace(filter_name + '(' + filters[filter_name] + ')', filter_name + '(' + value + ')');
  }

  function if_then_return_else_return(condition, then_return, else_return){
    if (condition){
      return then_return;
    } else {
      return else_return;
    }
  }

  function percent_of(percent, of) {
    return Number(of) * (Number(percent.replace('%', '')) / 100);
  }

  function set_visibility_of(element_query, to_value) {
    set_css_filter_of(element_query, 'opacity', to_value + if_then_return_else_return(String(to_value).includes('%'), '', '%'));
  }

  function get_visibility_of(element_query) {
    return get_css_filter_of(element_query)['opacity'];
  }

  function set_ghost_of(element_query, to_value) {
    set_visibility_of(element_query, 100 - Number(String(to_value).replace('%', '')))
  }

  function get_ghost_of(element_query) {
    return 100 - Number(String(get_visibility_of(element_query)).replace('%', '')) + '%';
  }

  const deg_to_percent = (deg) => {
    return Number(String(deg).replace('deg', '')) / 1.8;
  }

  const px_to_percent = (px) => {
    return Number(String(px).replace('px', '')) / 0.2;
  }

  // Oh, you're looking into the source code of my extension !

  class iFrame {
    constructor() {
      this.iframe = document.createElement('iframe');

      this.iframe.classList.add('samuellouf');
      this.iframe.id = 'iFrame-extension';
      this.iframe.style.filter='hue-rotate(0deg) grayscale(0%) brightness(100%) contrast(100%) opacity(100%) blur(0px) invert(0%) saturate(100%) sepia(0%)';
      this.iframe.src='data:text/html;base64,PERPQ1RZUEUgaHRtbD4KPGh0bWwgbGFuZz0iZW4tVVMiPgo8aGVhZD48L2hlYWQ+Cjxib2R5PjxoMT5IZWxsbyE8L2gxPjxwPllvdSd2ZSBqdXN0IGNyZWF0ZWQgYW4gaWZyYW1lIGVsZW1lbnQuPGJyPlVzZSB0aGlzIHRvIGVtYmVkIHNpdGVzIHdpdGggVVJMcyBvciBIVE1MIHVzaW5nIERhdGEgVVJJcy48L3A+PC9ib2R5Pgo8L2h0bWw+';

      this.iframe.style.position = 'absolute';
      this.iframe.style.visibility = 'hidden';
      this.iframe.style.transformOrigin = 'center center';
      canvas.parentElement.prepend(this.iframe);

      this.platform = get_platform();
      if (this.platform.support == 'Blob' || this.platform.support == 'single html' || this.platform.support == 'Zip' || this.platform.support == 'MacOS' || this.platform.support == 'Windows' || this.platform.support == 'Linux' ){
        this.iframe.style.zIndex=500;
      }

      this.iframe_pos = {
        x: 0,
        y: 0
      }

      const adjustSize = (width, height) => {
        this.iframe.style.width = `${(width / runtime.stageWidth) * 100}%`;
        this.iframe.style.height = `${(height / runtime.stageHeight) * 100}%`;
      };
      
      runtime.on('STAGE_SIZE_CHANGED', () => adjustSize(runtime.stageWidth, runtime.stageHeight));
      adjustSize(runtime.stageWidth, runtime.stageHeight);
    }

    getInfo() {
      return {
        id: 'samuelloufiframe',
        color1: '#f36518',
        color2: '#e64d18',
        name: 'iFrame', 
        blocks: [
          {
            opcode: 'wheniFrameLoads',
            blockType: Scratch.BlockType.HAT,
            text: 'when iframe loads an URL or a YouTube video',
            isEdgeActivated: false
          },
          {
            opcode: 'reinitiFrame',
            blockType: Scratch.BlockType.COMMAND,
            text: 'initialise iframe'
          },
          '---',
          {
            opcode: 'wheniFrameLoadsSite',
            blockType: Scratch.BlockType.HAT,
            text: 'when iframe loads an URL',
            isEdgeActivated: false
          },
          {
            opcode: 'setiFrameURL',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set iframe URL to [URL]',
            arguments: {
              URL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'https://www.example.com'
              }
            }
          },
          {
            opcode: 'getiFrameURL',
            blockType: Scratch.BlockType.REPORTER,
            text: 'current iframe URL'
          },
          '---',// Why are you looking at my blocks?
          {
            opcode: 'wheniFrameLoadsYouTubeVideo',
            blockType: Scratch.BlockType.HAT,
            text: 'when iframe loads YouTube video',
            blockIconURI: youtubeIcon,
            isEdgeActivated: false
          },
          {
            opcode: 'setiFrameYouTubeVideo',
            blockType: Scratch.BlockType.COMMAND,
            text: 'view YouTube Video [id] on iframe',
            blockIconURI: youtubeIcon,
            arguments: {
              id: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'jNQXAC9IVRw'
              }
            }
          },
          {
            opcode: 'isDisplayingYoutubeVideo',
            blockType: Scratch.BlockType.BOOLEAN,
            blockIconURI: youtubeIcon,
            text: 'is iframe displaying a YouTube video?'
          },
          {
            opcode: 'getiFrameYouTubeVideoID',
            blockType: Scratch.BlockType.REPORTER,
            blockIconURI: youtubeIcon,
            text: 'current iframed youtube video\'s id'
          },
          '---',
          {
            opcode: 'showiFrame',
            blockType: Scratch.BlockType.COMMAND,
            text: 'show iframe'
          },
          {
            opcode: 'hideiFrame',
            blockType: Scratch.BlockType.COMMAND,
            text: 'hide iframe'
          },
          {
            opcode: 'getiFrameState',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'is iframe [STATE]?',
            arguments: {
              STATE: {
                type: Scratch.ArgumentType.STRING,
                menu: 'state'
              }
            }
          },
          '---', // Why?
          {
            opcode: 'hide_show_invertiFrameBorder',
            blockType: Scratch.BlockType.COMMAND,
            text: '[do] iframe border',
            arguments: {
              do: {
                type: Scratch.ArgumentType.STRING,
                menu: 'hide_show_invert'
              }
            }
          },
          {
            opcode: 'isiFrameBorder',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'is iframe border [is]?',
            arguments: {
              is: {
                type: Scratch.ArgumentType.STRING,
                menu: 'state'
              }
            }
          },
          '---',
          {
            opcode: 'setiFrameWidth',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set iframe width to [width]%',
            arguments: {
              width: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100
              }
            }
          },
          {
            opcode: 'changeiFrameWidth',
            blockType: Scratch.BlockType.COMMAND,
            text: 'change iframe width by [width]%',
            arguments: {
              width: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 10
              }
            }
          },
          {
            opcode: 'setiFrameHeight',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set iframe height to [height]%',
            arguments: {
              height: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100
              }
            }
          },
          {
            opcode: 'changeiFrameHeight',
            blockType: Scratch.BlockType.COMMAND,
            text: 'change iframe height by [height]%',
            arguments: {
              height: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 10
              }
            }
          },
          {
            opcode: 'getiFrameWidth',
            blockType: Scratch.BlockType.REPORTER,
            text: 'iframe width (in %)'
          },
          {
            opcode: 'getiFrameHeight',
            blockType: Scratch.BlockType.REPORTER,
            text: 'iframe height (in %)'
          },
          '---', // OK, I get it, you don't want to talk to me.
          {
            opcode: 'setiFrameX',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set iframe x to [x]',
            arguments: {
              x: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              }
            }
          },
          {
            opcode: 'changeiFrameX',
            blockType: Scratch.BlockType.COMMAND,
            text: 'change iframe x by [x]',
            arguments: {
              x: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 10
              }
            }
          },
          {
            opcode: 'setiFrameY',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set iframe y to [y]',
            arguments: {
              y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              }
            }
          },
          {
            opcode: 'changeiFrameY',
            blockType: Scratch.BlockType.COMMAND,
            text: 'change iframe y by [y]',
            arguments: {
              y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 10
              }
            }
          },
          {
            opcode: 'setiFrameXY',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set iframe x to [x] and iframe y to [y]',
            arguments: {
              x: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              },
              y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              }
            }
          },
          {
            opcode: 'pointiFrameInDirection',
            blockType: Scratch.BlockType.COMMAND,
            text: 'point iframe in direction [deg]',
            arguments: {
              deg: {
                type: Scratch.ArgumentType.ANGLE,
                defaultValue: 90
              }
            }
          },
          {
            opcode: 'getiFrameX',
            blockType: Scratch.BlockType.REPORTER,
            text: 'iframe x'
          },
          {
            opcode: 'getiFrameY',
            blockType: Scratch.BlockType.REPORTER,
            text: 'iframe y'
          },
          {
            opcode: 'getiFrameRotation',
            blockType: Scratch.BlockType.REPORTER,
            text: 'iframe rotation'
          },
          '---',
          {
            opcode: 'setEffectOniFrame',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set [effect] effect on iframe to [value]',
            arguments: {
              effect: {
                type: Scratch.ArgumentType.STRING,
                menu: 'effects'
              },
              value: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              }
            }
          },
          {
            opcode: 'changeEffectOniFrame',
            blockType: Scratch.BlockType.COMMAND,
            text: 'change [effect] effect on iframe by [value]',
            arguments: {
              effect: {
                type: Scratch.ArgumentType.STRING,
                menu: 'effects'
              },
              value: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 25
              }
            }
          },
          {
            opcode: 'getEffectOniFrame_converted',
            blockType: Scratch.BlockType.REPORTER,
            text: 'iframe [effect]',
            arguments: {
              effect: {
                type: Scratch.ArgumentType.STRING,
                menu: 'effects'
              }
            }
          },
          {
            opcode: 'cleariFrameEffects',
            blockType: Scratch.BlockType.COMMAND,
            text: 'clear iframe effects'
          }
        ],
        menus: {
          options: {
            acceptReporters: true,
            items: ['controls', 'loop']
          },
          state: {
            acceptReporters: true,
            items: ['visible', 'hidden']
          },
          hide_show_invert: {
            acceptReporters: true,
            items: ['hide', 'show', 'invert']
          },
          effects: {
            acceptReporters: true,
            items: [{text: 'color', value: 'hue-rotate'}, 'grayscale', 'brightness', 'contrast', {text: 'ghost', value: 'opacity'}, 'blur', 'invert', 'saturate', 'sepia']
          }
        }
      };
    }

    // First you look at my blocks and now you're looking at the functions. That code is not your stuff. Get out.

    reinitiFrame() {
      this.iframe.src='data:text/html;base64,PERPQ1RZUEUgaHRtbD4KPGh0bWwgbGFuZz0iZW4tVVMiPgo8aGVhZD48L2hlYWQ+Cjxib2R5PjxoMT5IZWxsbyE8L2gxPjxwPllvdSd2ZSBqdXN0IGNyZWF0ZWQgYW4gaWZyYW1lIGVsZW1lbnQuPGJyPlVzZSB0aGlzIHRvIGVtYmVkIHNpdGVzIHdpdGggVVJMcyBvciBIVE1MIHVzaW5nIERhdGEgVVJJcy48L3A+PC9ib2R5Pgo8L2h0bWw+';
      this.hide_show_invertiFrameBorder({do: 'show'});
      this.cleariFrameEffects();
      this.setiFrameHeight({height: 100});
      this.setiFrameWidth({width: 100});
      this.reinitiFramePos();
    }

    // '---',
    
    setiFrameURL(args, util) {
      this.iframe.src = Cast.toString(args.URL);
      util.startHats('samuelloufiframe_wheniFrameLoadsSite');
      util.startHats('samuelloufiframe_wheniFrameLoads');
    }

    getiFrameURL() {
      return Cast.toString(this.iframe.src);
    }

    // '---',

    setiFrameYouTubeVideo(args, util) {
      this.iframe.src = Cast.toString('https://www.youtube.com/embed/' + args.id);
      util.startHats('samuelloufiframe_wheniFrameLoadsYouTubeVideo');
      util.startHats('samuelloufiframe_wheniFrameLoads');
    }

    isDisplayingYoutubeVideo() {
      return this.getiFrameURL().includes('youtube');
    }

    getiFrameYouTubeVideoID() {
      if (this.getiFrameURL().includes('youtube')){
        if (this.getiFrameURL().includes('embed')){
          return this.getiFrameURL().replace('https://www.youtube.com/embed/', '').replace('/', '');
        } else {
          const urlParams = new URL(this.getiFrameURL()).searchParams;
          return urlParams.get('v');
        }
      } else {
        return 'Not a YouTube URI';
      }
    }

    wheniFrameLoadsYouTubeVideo(){}

    // '---',

    showiFrame() {
      this.iframe.style.visibility = 'visible';
    }

    hideiFrame() {
      this.iframe.style.visibility = 'hidden';
    }

    getiFrameState(args) {
      return this.iframe.style.visibility == args.STATE;
    }

    // '---',

    hide_show_invertiFrameBorder(args) {
      if (args.do == 'hide') {
        this.iframe.frameBorder = 0;
      } else if (args.do == 'show') {
        this.iframe.frameBorder = 1;
      } else {
        if (this.iframe.frameBorder == 0) {
          this.iframe.frameBorder = 1;
        } else {
          this.iframe.frameBorder = 0;
        }
      }
    }

    isiFrameBorder(args) {
      if (args.is == 'visible') {
        return this.iframe.frameBorder == 1;
      } else {
        return this.iframe.frameBorder == 0;
      }
    }

    // '---',

    SetIFramePosition (x, y, width, height) {
      const stage = {
          width: runtime.stageWidth,
          height: runtime.stageHeight
      };
      this.iframe.style.position = "absolute"; // position above canvas without pushing it down
      this.iframe.style.transformOrigin = "center center"; // rotation and translation begins at center

      if (String(width).includes('%')){
        width = percent_of(width, stage.width);
      }

      if (String(height).includes('%')){
        height = percent_of(height, stage.height);
      }

      let xpos = -480 + x + (stage.width - width);
      let ypos = y + 360 - (stage.height - height);
      xpos = ((xpos / stage.width) * 100);
      ypos = (((0 - ypos) / stage.height) * 100);

      // epic maths to place x and y at the center
      this.iframe.style.transform = `translate(${xpos}%, ${ypos}%)`; 
    }

    setiFrameWidth(args) {
      this.iframe.style.width=Cast.toString(args.width + '%');
    }

    changeiFrameWidth(args) {
      this.iframe.style.width=Number(this.iframe.style.width.replace('%', '')) + args.width + '%';
    }

    getiFrameWidth() {
      return this.iframe.style.width.replace('%', '');
    }

    setiFrameHeight(args) {
      this.iframe.style.height=Cast.toString(args.height + '%');
    }

    changeiFrameHeight(args) {
      this.iframe.style.height=Number(this.iframe.style.height.replace('%', '')) + args.height + '%';
    }

    getiFrameHeight() {
      return this.iframe.style.height.replace('%', '');
    }

    // '---',

    setiFrameX(args) {
      this.SetIFramePosition(args.x, this.iframe_pos.y, this.iframe.width, this.iframe.height);
      this.iframe_pos.x = args.x;
    }

    setiFrameY(args) {
      this.SetIFramePosition(this.iframe_pos.x, args.y, this.iframe.width, this.iframe.height);
      this.iframe_pos.y = args.y;
    }

    changeiFrameX(args) {
      this.setiFrameX({x: this.getiFrameX() + args.x});
    }

    changeiFrameY(args) {
      this.setiFrameY({y: this.getiFrameY() + args.y});
    }

    setiFrameXY(args) {
      this.SetIFramePosition(args.x, args.y, this.iframe.width, this.iframe.height);
      this.iframe_pos.x = args.x;
      this.iframe_pos.y = args.y;
    }

    pointiFrameInDirection(args) {
      this.iframe.style.rotate=Cast.toString((Number(args.deg) - 90) + 'deg');
    }

    getiFrameX() {
      return this.iframe_pos.x;
    }

    getiFrameY() {
      return this.iframe_pos.y;
    }

    getiFrameRotation() {
      return this.iframe.style.rotate.replace('deg', '');
    }

    reinitiFramePos() {}

    // '---',

    setEffectOniFrame(args){
      if (args.effect == 'opacity'){
        set_ghost_of('iframe#iFrame-extension.samuellouf', args.value + '%');
      } else {
        set_css_filter_of('iframe#iFrame-extension.samuellouf', args.effect, (args.value * if_then_return_else_return(args.effect == 'hue-rotate', 1.8, if_then_return_else_return(args.effect == 'blur', 0.2, 1))) + if_then_return_else_return(args.effect == 'hue-rotate', 'deg', if_then_return_else_return(args.effect == 'blur', 'px', '%')));
      }
    }

    changeEffectOniFrame(args){
      var geoi = this.getEffectOniFrame({effect: args.effect});
      var geoi_ext = if_then_return_else_return(geoi.includes('px'), 'px', if_then_return_else_return(geoi.includes('deg'), 'deg', '%'));
      var geoi_value = Number(geoi.replace(geoi_ext, ''));
      if (args.effect == 'opacity'){
        this.setEffectOniFrame({effect: 'opacity', value: Number(this.getEffectOniFrame({effect: 'opacity'}).replace('%', '')) + args.value});
      } else {
        set_css_filter_of('iframe#iFrame-extension.samuellouf', args.effect, geoi_value + (args.value * if_then_return_else_return(args.effect == 'hue-rotate', 1.8, if_then_return_else_return(args.effect == 'blur', 0.2, 1))) + if_then_return_else_return(args.effect == 'hue-rotate', 'deg', if_then_return_else_return(args.effect == 'blur', 'px', '%')));
      }
    }

    getEffectOniFrame(args){
      var effects = get_css_filter_of('iframe#iFrame-extension.samuellouf');
      if (args.effect == 'opacity'){
        return get_ghost_of('iframe#iFrame-extension.samuellouf');
      } else {
        return effects[args.effect];
      }
    }

    getEffectOniFrame_converted (args){
      var geoi = this.getEffectOniFrame({effect: args.effect});
      var geoi_ext = if_then_return_else_return(geoi.includes('px'), 'px', if_then_return_else_return(geoi.includes('deg'), 'deg', '%'));
      return if_then_return_else_return(geoi_ext == 'px', px_to_percent(geoi), if_then_return_else_return(geoi_ext == 'deg', deg_to_percent(geoi), String(geoi).replace('%', '')));
    }

    cleariFrameEffects() {
      this.iframe.style.filter='hue-rotate(0deg) grayscale(0%) brightness(100%) contrast(100%) opacity(100%) blur(0px) invert(0%) saturate(100%) sepia(0%)';
    }
  }
  Scratch.extensions.register(new iFrame());
})(Scratch);
// You didn't listen to me huh. You're so stubborn.
