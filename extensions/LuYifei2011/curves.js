// Name: Curves
// ID: luyifei2011Curves
// Description: Create smooth paths and custom transitions with Bézier and Catmull-Rom curves.
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

  function uniformCatmullRom(p0, p1, p2, p3, t) {
    const t2 = t * t;
    const t3 = t2 * t;

    return (
      0.5 *
      (2 * p1 +
        (-p0 + p2) * t +
        (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 +
        (-p0 + 3 * p1 - 3 * p2 + p3) * t3)
    );
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
              "quadratic Bézier from [START] with control [CONTROL] to [END] at [PROGRESS]%"
            ),
            arguments: {
              START: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              CONTROL: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 30,
              },
              END: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100,
              },
              PROGRESS: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 50,
              },
            },
          },
          {
            opcode: "curvesCubicBezier",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate(
              "cubic Bézier from [START] with controls [CONTROL1] [CONTROL2] to [END] at [PROGRESS]%"
            ),
            arguments: {
              START: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              CONTROL1: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 30,
              },
              CONTROL2: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 90,
              },
              END: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100,
              },
              PROGRESS: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 50,
              },
            },
          },
          {
            opcode: "curvesUniformCatmullRom",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate(
              "uniform Catmull-Rom from [START] to [END] with neighbors [PREVIOUS] [NEXT] at [PROGRESS]%"
            ),
            arguments: {
              PREVIOUS: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              START: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 30,
              },
              END: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 90,
              },
              NEXT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100,
              },
              PROGRESS: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 50,
              },
            },
          },
        ],
      };
    }

    curvesQuadraticBezier(args) {
      const start = Cast.toNumber(args.START);
      const control = Cast.toNumber(args.CONTROL);
      const end = Cast.toNumber(args.END);
      const progress = Cast.toNumber(args.PROGRESS) / 100;

      return quadraticBezier(start, control, end, progress);
    }

    curvesCubicBezier(args) {
      const start = Cast.toNumber(args.START);
      const control1 = Cast.toNumber(args.CONTROL1);
      const control2 = Cast.toNumber(args.CONTROL2);
      const end = Cast.toNumber(args.END);
      const progress = Cast.toNumber(args.PROGRESS) / 100;

      return cubicBezier(start, control1, control2, end, progress);
    }

    curvesUniformCatmullRom(args) {
      const previous = Cast.toNumber(args.PREVIOUS);
      const start = Cast.toNumber(args.START);
      const end = Cast.toNumber(args.END);
      const next = Cast.toNumber(args.NEXT);
      const progress = Cast.toNumber(args.PROGRESS) / 100;

      return uniformCatmullRom(previous, start, end, next, progress);
    }
  }

  Scratch.extensions.register(new Curves());
})(Scratch);
