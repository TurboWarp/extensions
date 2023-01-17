(function(Scratch) {
    'use strict';
  
    if (!Scratch.extensions.unsandboxed) {
      throw new Error('Pen+ must be run unsandboxed');
    }

    let icon = "data:image/png;base64,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"

    let UriSize = 100;

    class Outfitted {
      getInfo () {
        return { /* ... */
    
            id: 'outfitted',

            color1: '#9966ff',
            color2: '#6241a6',
            color3: '#6d32e3',

            menuIconURI: icon,

            // `name` is what the user sees in the toolbox
            // It can be changed without breaking projects.
            name: 'Outfitted!',
    
            blocks: [
              {
                blockIconURI:icon,
                  opcode: 'readMe',
                  blockType: Scratch.BlockType.REPORTER,
                  text: "Read Me!",
              },
              "---",
                {
                  opcode: 'setSpriteSVG',
                  blockType: Scratch.BlockType.COMMAND,
                  text: "Set the current costume's sprite to:[Data] with the image type of:[Type]",
                  arguments: {
                      Data: {
                        type: Scratch.ArgumentType.STRING,
                        defaultValue: "<svg></svg>"
                      },
                      Type: {
                        menu:"ImageTypeMenu",
                        defaultValue:"Vector"
                      }
                    }
                },
                {
                opcode: 'setUriSize',
                blockType: Scratch.BlockType.COMMAND,
                text: "Set the uri's size to:[Size] pixels",
                arguments: {
                    Size: {
                      type: Scratch.ArgumentType.NUMBER,
                      defaultValue: 100
                    }
                  }
                },
                {
                  opcode: 'getSpriteData',
                  blockType: Scratch.BlockType.REPORTER,
                  text: "Get the current costume's URI",
                  disableMonitor: true,
                  arguments: {
                      Token: {
                        type: Scratch.ArgumentType.STRING,
                        defaultValue: 'TOKEN'
                      }
                    }
                }
            ],
            menus: {
              ImageTypeMenu: {
                items: ['Vector', 'URI']
              },
            }
        };
      }
      readMe(){
        return "Thanks for using Outfitted! This extension allows for you to modify a sprite's costume's svg! To reset a costume back to its original sprite all you have to do it edit it in the paint editor. I might add some more features later. Outfitted is created by ObviousAlexC. The scratch cat icon is created by scratch team and modified by ObviousAlexC."
      }
      setUriSize({Size},util){
        UriSize = Size
      }
      getSpriteData({},util)
      {
        let target = util.target;
        let dataURI = target.sprite.costumes[target.currentCostume].asset.encodeDataURI();
        return dataURI
      }
      setSpriteSVG({Data,Type},util){
        if(Type === "Vector"){
          let target = util.target;
        Scratch.vm.runtime.renderer.updateSVGSkin(target.sprite.costumes[target.currentCostume].skinId,Data)
        target.bitmapResolution = 1;
        Scratch.vm.emitTargetsUpdate();
        }
        else{
          let target = util.target;
          Scratch.vm.runtime.renderer.updateSVGSkin(target.sprite.costumes[target.currentCostume].skinId,'<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="'+ UriSize +'" height="'+ UriSize +'" viewBox="0,0,'+ UriSize +','+ UriSize +'"><g transform="translate(-196,-136)"><g data-paper-data="{&quot;isPaintingLayer&quot;:true}" fill="none" fill-rule="nonzero" stroke="none" stroke-width="0.5" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" style="mix-blend-mode: normal"><image x="392" y="272" transform="scale(0.5,0.5)" width="'+ UriSize +'" height="'+ UriSize +'" xlink:href="' + Data+'"/></g></g></svg><!--rotationCenter:44:44-->')
          target.bitmapResolution = 1;
          Scratch.vm.emitTargetsUpdate();
        }
      }
    }
    Scratch.extensions.register(new Outfitted());
  })(Scratch);
