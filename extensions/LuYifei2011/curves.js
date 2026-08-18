// Name: Curves
// ID: luyifei2011Curves
// Description: Create smooth paths and custom transitions with quadratic and cubic Bézier curves.
// By: LuYifei2011
// License: MIT

(function (Scratch) {
  "use strict";

  const Cast = Scratch.Cast;

  const lerp = (a, b, t) => a + (b - a) * t;

  function quadraticBezier(p0, p1, p2, t) {
    const a = lerp(p0, p1, t);
    const b = lerp(p1, p2, t);

    return lerp(a, b, t);
  }

  function cubicBezier(p0, p1, p2, p3, t) {
    const a = lerp(p0, p1, t);
    const b = lerp(p1, p2, t);
    const c = lerp(p2, p3, t);

    const d = lerp(a, b, t);
    const e = lerp(b, c, t);

    return lerp(d, e, t);
  }

  class Curves {
    getInfo() {
      return {
        id: "luyifei2011Curves",
        name: Scratch.translate("Curves"),
        blocks: [
          {
            opcode: "curvesQuadraticBezier",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate(
              "quadratic Bézier from [A] through [B] to [C] at [P]%"
            ),
            arguments: {
              A: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              B: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 30,
              },
              C: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100,
              },
              P: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 50,
              },
            },
          },
          {
            opcode: "curvesCubicBezier",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate(
              "cubic Bézier from [A] through [B] [C] to [D] at [P]%"
            ),
            arguments: {
              A: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              B: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 30,
              },
              C: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 90,
              },
              D: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100,
              },
              P: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 50,
              },
            },
          },
        ],
      };
    }

    curvesQuadraticBezier(args) {
      const a = Cast.toNumber(args.A);
      const b = Cast.toNumber(args.B);
      const c = Cast.toNumber(args.C);
      const progress = Cast.toNumber(args.P) / 100;

      return quadraticBezier(a, b, c, progress);
    }

    curvesCubicBezier(args) {
      const a = Cast.toNumber(args.A);
      const b = Cast.toNumber(args.B);
      const c = Cast.toNumber(args.C);
      const d = Cast.toNumber(args.D);
      const progress = Cast.toNumber(args.P) / 100;

      return cubicBezier(a, b, c, d, progress);
    }
  }

  Scratch.extensions.register(new Curves());
})(Scratch);
