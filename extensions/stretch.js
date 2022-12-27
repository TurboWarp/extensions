(function (Scratch) {
  'use strict';

  const STRETCH_X = Symbol('stretch.x');
  const STRETCH_Y = Symbol('stretch.y');

  const vm = Scratch.vm;

  /**
   * @param {VM.RenderedTarget} target
   */
  const implementStretchForTarget = (target, originalTarget) => {
    target[STRETCH_X] = originalTarget ? originalTarget[STRETCH_X] : 100;
    target[STRETCH_Y] = originalTarget ? originalTarget[STRETCH_Y] : 100;

    const original = target._getRenderedDirectionAndScale;
    target._getRenderedDirectionAndScale = function () {
      const result = original.call(this);

      result.scale[0] *= this[STRETCH_X] / 100;
      result.scale[1] *= this[STRETCH_Y] / 100;

      return result;
    };
  };
  vm.runtime.targets.forEach((target) => implementStretchForTarget(target));
  vm.runtime.on('targetWasCreated', (target, originalTarget) => implementStretchForTarget(target, originalTarget));
  vm.runtime.on('PROJECT_LOADED', () => {
    vm.runtime.targets.forEach((target) => implementStretchForTarget(target));
  });

  /**
   * @param {VM.RenderedTarget} target
   */
  const forceUpdateDirectionAndScale = (target) => {
    target.setDirection(target.direction);
  };

  class Stretch {
    getInfo() {
      return {
        id: 'stretch',
        name: 'Stretch',
        color1: '#4287f5',
        color2: '#2b62ba',
        color3: '#204785',
        blocks: [
          {
            opcode: 'setStretch',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set stretch to x: [X] y: [Y]',
            arguments: {
              X: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100,
              },
              Y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100,
              },
            },
          },
          {
            opcode: 'getX',
            blockType: Scratch.BlockType.REPORTER,
            text: 'x stretch',
            disableMonitor: true,
          },
          {
            opcode: 'getY',
            blockType: Scratch.BlockType.REPORTER,
            text: 'y stretch',
            disableMonitor: true,
          },
        ],
      };
    }
    setStretch(args, util) {
      // TODO: move to Scratch.Cast when it's merged
      util.target[STRETCH_X] = +args.X || 0;
      util.target[STRETCH_Y] = +args.Y || 0;
      forceUpdateDirectionAndScale(util.target);
    }
    getX(args, util) {
      return util.target[STRETCH_X];
    }
    getY(args, util) {
      return util.target[STRETCH_Y];
    }
  }

  Scratch.extensions.register(new Stretch());
})(Scratch);
