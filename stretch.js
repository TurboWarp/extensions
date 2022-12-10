(function (Scratch) {
  'use strict';

  const STRETCH_X = Symbol('stretch.x');
  const STRETCH_Y = Symbol('stretch.y');

  const vm = Scratch.vm;

  /**
   * @param {number} stretchAmount
   * @returns {number}
   */
  const clampStretch = (stretchAmount) => Math.max(0, stretchAmount);

  /**
   * @param {VM.RenderedTarget} target
   */
  const implementStretchForTarget = (target) => {
    target[STRETCH_X] = 100;
    target[STRETCH_Y] = 100;

    const original = target._getRenderedDirectionAndScale;
    target._getRenderedDirectionAndScale = function () {
      const result = original.call(this);

      result.scale[0] *= this[STRETCH_X] / 100;
      result.scale[1] *= this[STRETCH_Y] / 100;

      return result;
    };
  };
  vm.runtime.targets.forEach(implementStretchForTarget);
  vm.runtime.on('targetWasCreated', implementStretchForTarget);

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
        blocks: [
          {
            opcode: 'setStretch',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set stretch to width: [X] height: [Y]',
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
      util.target[STRETCH_X] = clampStretch(args.X);
      util.target[STRETCH_Y] = clampStretch(args.Y);
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
