// Name: More Motion
// ID: nkmoremotion
// Description: More motion-related blocks.
// By: NamelessCat <https://scratch.mit.edu/users/NamelessCat/>

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("More Motion must run unsandboxed");
  }

  // @ts-expect-error - not typed yet
  const Rectangle = Scratch.vm.renderer.exports.Rectangle;

  class nkmoremotion {
    getInfo() {
      return {
        id: "nkmoremotion",
        name: "More Motion",
        color1: "#4c97ff",
        color2: "#3373cc",
        blocks: [
          {
            filter: [Scratch.TargetType.STAGE],
            blockType: Scratch.BlockType.LABEL,
            text: "Stage selected: no motion blocks",
          },
          {
            filter: [Scratch.TargetType.SPRITE],
            opcode: "changexy",
            blockType: Scratch.BlockType.COMMAND,
            text: "change x: [X] y: [Y]",
            arguments: {
              X: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0",
              },
              Y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0",
              },
            },
          },
          {
            filter: [Scratch.TargetType.SPRITE],
            opcode: "pointto",
            blockType: Scratch.BlockType.COMMAND,
            text: "point towards x: [X] y: [Y]",
            arguments: {
              X: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0",
              },
              Y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0",
              },
            },
          },
          {
            filter: [Scratch.TargetType.SPRITE],
            opcode: "rotationStyle",
            blockType: Scratch.BlockType.REPORTER,
            text: "rotation style",
            disableMonitor: true,
          },
          "---",
          {
            filter: [Scratch.TargetType.SPRITE],
            opcode: "fence",
            blockType: Scratch.BlockType.COMMAND,
            text: "manually fence",
          },
          "---",
          {
            filter: [Scratch.TargetType.SPRITE],
            opcode: "steptowards",
            blockType: Scratch.BlockType.COMMAND,
            text: "move [STEPS] steps towards x: [X] y: [Y]",
            arguments: {
              STEPS: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "10",
              },
              X: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0",
              },
              Y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0",
              },
            },
          },
          {
            filter: [Scratch.TargetType.SPRITE],
            opcode: "tweentowards",
            blockType: Scratch.BlockType.COMMAND,
            text: "move [PERCENT]% of the way to x: [X] y: [Y]",
            arguments: {
              PERCENT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "10",
              },
              X: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0",
              },
              Y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0",
              },
            },
          },
          "---",
          {
            filter: [Scratch.TargetType.SPRITE],
            opcode: "directionto",
            blockType: Scratch.BlockType.REPORTER,
            text: "direction to x: [X] y: [Y]",
            arguments: {
              X: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0",
              },
              Y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0",
              },
            },
          },
          {
            filter: [Scratch.TargetType.SPRITE],
            opcode: "distanceto",
            blockType: Scratch.BlockType.REPORTER,
            text: "distance from x: [X] y: [Y]",
            arguments: {
              X: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0",
              },
              Y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0",
              },
            },
          },
          {
            filter: [Scratch.TargetType.SPRITE],
            opcode: "spritewh",
            blockType: Scratch.BlockType.REPORTER,
            text: "sprite [WHAT]",
            disableMonitor: true,
            arguments: {
              WHAT: {
                type: Scratch.ArgumentType.STRING,
                menu: "WHAT",
              },
            },
          },
          "---",
          {
            filter: [Scratch.TargetType.SPRITE],
            opcode: "touchingxy",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "touching x: [X] y: [Y]?",
            arguments: {
              X: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0",
              },
              Y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0",
              },
            },
          },
          {
            filter: [Scratch.TargetType.SPRITE],
            opcode: "touchingrect",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "touching rectangle x1: [X1] y1: [Y1] x2: [X2] y2: [Y2]?",
            arguments: {
              X1: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "-100",
              },
              Y1: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "-100",
              },
              X2: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "100",
              },
              Y2: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "100",
              },
            },
          },
        ],
        menus: {
          WHAT: {
            acceptreporters: true,
            items: ["width", "height", "costume width", "costume height"],
          },
        },
      };
    }

    changexy(args, util) {
      const x = Scratch.Cast.toNumber(args.X);
      const y = Scratch.Cast.toNumber(args.Y);
      util.target.setXY(util.target.x + x, util.target.y + y);
    }

    // LORAX APPROVED
    pointto(args, util) {
      const x = Scratch.Cast.toNumber(args.X);
      const y = Scratch.Cast.toNumber(args.Y);
      if (util.target.y > y) {
        util.target.setDirection(
          (180 / Math.PI) *
            Math.atan((x - util.target.x) / (y - util.target.y)) +
            180
        );
      } else {
        util.target.setDirection(
          (180 / Math.PI) * Math.atan((x - util.target.x) / (y - util.target.y))
        );
      }
    }

    rotationStyle(args, util) {
      return util.target.rotationStyle;
    }

    fence(args, util) {
      const newpos = Scratch.vm.renderer.getFencedPositionOfDrawable(
        util.target.drawableID,
        [util.target.x, util.target.y]
      );
      util.target.setXY(newpos[0], newpos[1]);
    }

    directionto(args, util) {
      const x = Scratch.Cast.toNumber(args.X);
      const y = Scratch.Cast.toNumber(args.Y);
      if (util.target.y > y) {
        return (
          (180 / Math.PI) *
            Math.atan((x - util.target.x) / (y - util.target.y)) +
          180
        );
      } else {
        return (
          (180 / Math.PI) * Math.atan((x - util.target.x) / (y - util.target.y))
        );
      }
    }

    distanceto(args, util) {
      const x = Scratch.Cast.toNumber(args.X);
      const y = Scratch.Cast.toNumber(args.Y);
      // Shoutout to Pythagoras!
      return Math.sqrt((x - util.target.x) ** 2 + (y - util.target.y) ** 2);
    }

    steptowards(args, util) {
      const x = Scratch.Cast.toNumber(args.X);
      const y = Scratch.Cast.toNumber(args.Y);
      const steps = Scratch.Cast.toNumber(args.STEPS);
      const val =
        steps / Math.sqrt((x - util.target.x) ** 2 + (y - util.target.y) ** 2);
      if (val >= 1) {
        util.target.setXY(x, y);
      } else {
        util.target.setXY(
          (x - util.target.x) * val + util.target.x,
          (y - util.target.y) * val + util.target.y
        );
      }
    }

    tweentowards(args, util) {
      const x = Scratch.Cast.toNumber(args.X);
      const y = Scratch.Cast.toNumber(args.Y);
      const val = Scratch.Cast.toNumber(args.PERCENT);
      // Essentially a smooth glide script.
      util.target.setXY(
        (x - util.target.x) * (val / 100) + util.target.x,
        (y - util.target.y) * (val / 100) + util.target.y
      );
    }

    touchingrect(args, util) {
      let left = Scratch.Cast.toNumber(args.X1);
      let right = Scratch.Cast.toNumber(args.X2);
      let bottom = Scratch.Cast.toNumber(args.Y1);
      let top = Scratch.Cast.toNumber(args.Y2);

      // Fix argument order if they got it backwards
      if (left > right) {
        let temp = left;
        left = right;
        right = temp;
      }
      if (bottom > top) {
        let temp = bottom;
        bottom = top;
        bottom = temp;
      }

      const drawable =
        Scratch.vm.renderer._allDrawables[util.target.drawableID];
      if (!drawable) {
        return false;
      }

      // See renderer.isTouchingDrawables

      const drawableBounds = drawable.getFastBounds();
      drawableBounds.snapToInt();

      const containsBounds = new Rectangle();
      containsBounds.initFromBounds(left, right, bottom, top);
      containsBounds.snapToInt();

      if (!containsBounds.intersects(drawableBounds)) {
        return false;
      }

      drawable.updateCPURenderAttributes();

      const intersectingBounds = Rectangle.intersect(
        drawableBounds,
        containsBounds
      );
      for (let x = intersectingBounds.left; x < intersectingBounds.right; x++) {
        for (
          let y = intersectingBounds.bottom;
          y < intersectingBounds.top;
          y++
        ) {
          // technically should be a twgl vec3, but does not actually need to be
          if (drawable.isTouching([x, y])) {
            return true;
          }
        }
      }
      return false;
    }

    touchingxy(args, util) {
      const x = Scratch.Cast.toNumber(args.X);
      const y = Scratch.Cast.toNumber(args.Y);
      const drawable =
        Scratch.vm.renderer._allDrawables[util.target.drawableID];
      if (!drawable) {
        return false;
      }
      // Position should technically be a twgl vec3, but it doesn't actually need to be
      drawable.updateCPURenderAttributes();
      return drawable.isTouching([x, y]);
    }

    spritewh(args, util) {
      if (args.WHAT === "width" || args.WHAT === "height") {
        const bounds = Scratch.vm.renderer.getBounds(util.target.drawableID);
        if (args.WHAT === "width") {
          return Math.ceil(bounds.width);
        } else {
          return Math.ceil(bounds.height);
        }
      } else if (
        args.WHAT === "costume width" ||
        args.WHAT === "costume height"
      ) {
        const costume = util.target.sprite.costumes[util.target.currentCostume];
        if (args.WHAT === "costume width") {
          return Math.ceil(costume.size[0]);
        } else {
          return Math.ceil(costume.size[1]);
        }
      }
    }
  }

  Scratch.extensions.register(new nkmoremotion());
})(Scratch);
