(function(Scratch) {
  'use strict';

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('More Motion must run unsandboxed');
  }

  class nkmoremotion {
    getInfo() {
      return {
        id: 'nkmoremotion',
        name: 'More Motion',
        color1: '#4c97ff',
        color2: '#3373cc',
        blocks: [
          {
              opcode: 'changexy',
              blockType: Scratch.BlockType.COMMAND,
              text: 'change x: [X] y: [Y]',
              arguments: {
                  X: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: '0'
                  },
                  Y: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: '0'
                  }
              }
          },
          {
            opcode: 'pointto',
            blockType: Scratch.BlockType.COMMAND,
            text: 'point towards x: [X] y: [Y]',
            arguments: {
                X: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: '0'
                },
                Y: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: '0'
                }
            }
          },
          '---',
          {
              opcode: 'fence',
              blockType: Scratch.BlockType.COMMAND,
              text: 'if fencing disabled, fence anyways'
          },
          '---',
          {
            opcode: 'steptowards',
            blockType: Scratch.BlockType.COMMAND,
            text: 'move [STEPS] steps towards x: [X] y: [Y]',
            arguments: {
                STEPS: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: '10'
                },
                X: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: '0'
                },
                Y: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: '0'
                }
            }
          },
          {
            opcode: 'tweentowards',
            blockType: Scratch.BlockType.COMMAND,
            text: 'move [PERCENT]% of the way to x: [X] y: [Y]',
            arguments: {
                PERCENT: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: '10'
                },
                X: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: '0'
                },
                Y: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: '0'
                }
            }
          },
          '---',
          {
            opcode: 'directionto',
            blockType: Scratch.BlockType.REPORTER,
            text: 'direction to x: [X] y: [Y]',
            arguments: {
                X: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: '0'
                },
                Y: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: '0'
                }
            }
          },
          {
            opcode: 'distanceto',
            blockType: Scratch.BlockType.REPORTER,
            text: 'distance from x: [X] y: [Y]',
            arguments: {
                X: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: '0'
                },
                Y: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: '0'
                }
            }
          },
          {
            opcode: 'spritewh',
            blockType: Scratch.BlockType.REPORTER,
            text: 'sprite [WHAT]',
            disableMonitor: true,
            arguments: {
                WHAT: {
                  type: Scratch.ArgumentType.STRING,
                  menu: 'WHAT'
                }
            }
          },
          '---',
          {
            opcode: 'touchingxy',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'touching x: [X] y: [Y]?',
            arguments: {
              X: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '0'
              },
              Y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '0'
              }
          }
          },
          {
            opcode: 'inbetween',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'in-between x1: [X1] y1: [Y1] x2: [X2] y2: [Y2]?',
            arguments: {
                X1: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: '-100'
                },
                Y1: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: '-100'
                },
                X2: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: '100'
                },
                Y2: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: '100'
                }
            }
          },
        ],
        menus: {
          WHAT: {
            acceptreporters: false,
            items: ['width', 'height']
          }
        }
      };
    }
    
  changexy (args, util) {
    const x = Scratch.Cast.toNumber(args.X);
    const y = Scratch.Cast.toNumber(args.Y);
    util.target.setXY(util.target.x + x, util.target.y + y);
  }

  fence (util) {
    util.target.setXY(Math.min(Math.max(util.target.x, -Scratch.vm.runtime.stageWidth/2), Scratch.vm.runtime.stageWidth/2), Math.min(Math.max(util.target.y, -Scratch.vm.runtime.stageHeight/2), Scratch.vm.runtime.stageHeight/2));
  }

  // LORAX APPROVED
  pointto (args, util) {
    const x = Scratch.Cast.toNumber(args.X);
    const y = Scratch.Cast.toNumber(args.Y);
    if (util.target.y > y) {
      util.target.setDirection(((180/Math.PI)*Math.atan((x - util.target.x)/(y - util.target.y))) + 180);
    } else {
      util.target.setDirection(((180/Math.PI)*Math.atan((x - util.target.x)/(y - util.target.y))));
    }
  }

  directionto (args, util) {
    const x = Scratch.Cast.toNumber(args.X);
    const y = Scratch.Cast.toNumber(args.Y);
    if (util.target.y > y) {
      return ((180/Math.PI)*Math.atan((x - util.target.x)/(y - util.target.y))) + 180;
    } else {
      return ((180/Math.PI)*Math.atan((x - util.target.x)/(y - util.target.y)));
    }
  }

  distanceto (args, util) {
    const x = Scratch.Cast.toNumber(args.X);
    const y = Scratch.Cast.toNumber(args.Y);
    // Shoutout to Pythagoras!
    return Math.sqrt(((x - util.target.x)**2) + ((y - util.target.y)**2));
  }

  steptowards (args, util) {
    const x = Scratch.Cast.toNumber(args.X);
    const y = Scratch.Cast.toNumber(args.Y);
    const steps = Scratch.Cast.toNumber(args.STEPS);
    const val = steps / (Math.sqrt(((x - util.target.x)**2) + ((y - util.target.y)**2)))
    util.target.setXY(((x - util.target.x)*(val)) + util.target.x, ((y - util.target.y)*(val)) + util.target.y);
  }

  tweentowards (args, util) {
    const x = Scratch.Cast.toNumber(args.X);
    const y = Scratch.Cast.toNumber(args.Y);
    const val = Scratch.Cast.toNumber(args.PERCENT);
    // Essentially a smooth glide script.
    util.target.setXY(((x - util.target.x)*(val/100)) + util.target.x, ((y - util.target.y)*(val/100)) + util.target.y);
  }

  inbetween (args, util) {
    const x = Scratch.Cast.toNumber(args.X1);
    const y = Scratch.Cast.toNumber(args.Y1);
    const x2 = Scratch.Cast.toNumber(args.X2);
    const y2 = Scratch.Cast.toNumber(args.Y2);
    return x <= util.target.x && util.target.x <= x2 && y <= util.target.y && util.target.y <= y2;
  }

  touchingxy (args, util) {
    // I can tell this is not the most efficient way to do this. I still don't feel like fixing it.
    // This method also doesn't account for rotation or non-square shapes. I'm not sure if there's a workaround for this.
    const x = Scratch.Cast.toNumber(args.X);
    const y = Scratch.Cast.toNumber(args.Y);

    const costumeIndex = util.target.getCostumeIndexByName(Scratch.Cast.toString(util.target.getCostumes()[util.target.currentCostume].name));
    const costume = util.target.sprite.costumes[costumeIndex];
    const width = Math.ceil(Scratch.Cast.toNumber(costume.size[0]));
    const height = Math.ceil(Scratch.Cast.toNumber(costume.size[1]));

    console.log(width);
    console.log(height);

    return x >= util.target.x - (width/2) && util.target.x + (width/2) >= x && y >= util.target.y - (height/2) && util.target.y + (height/2) >= y;
  }

  spritewh (args, util) {
    const costumeIndex = util.target.getCostumeIndexByName(Scratch.Cast.toString(util.target.getCostumes()[util.target.currentCostume].name));
    const costume = util.target.sprite.costumes[costumeIndex];
    if (args.WHAT === 'width') {
      return Math.ceil(Scratch.Cast.toNumber(costume.size[0]));
    } else {
      return Math.ceil(Scratch.Cast.toNumber(costume.size[1]));
    }
  }

  }
  Scratch.extensions.register(new nkmoremotion());
})(Scratch);