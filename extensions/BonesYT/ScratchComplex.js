// Name: Complex Numbers
// ID: bonesytcomplex
// Description: Mathematical functions for complex numbers. Has all the operations from the Operators category, and a few extra ones.
// By: Bones2 <https://scratch.mit.edu/users/Bones2/>
// License: MPL-2.0
(function (Scratch) {
  /* Version 1.0 - 01/10/2025 MM/DD/YYYY */
  "use strict";
  if (!Scratch.extensions.unsandboxed) {
    throw new Error("You're running an unsandboxed extension as sandboxed.");
  }

  class ScratchComplex {
    constructor() {}

    advancedSyntax = true;

    complex({ r, i }) {
      (r = +r), (i = +i);
      if (isNaN(r) || isNaN(i)) return "NaN";
      if (this.advancedSyntax) {
        const a = (x) =>
          (x < 0 ? "-" : "") + (Math.abs(x) == 1 ? "" : Math.abs(x)) + "i";
        return r == 0 && i != 0
          ? a(i)
          : r < 0 && i > 0
            ? a(i) + r
            : r + (i == 0 ? "" : (i > 0 ? "+" : "") + a(i));
      } else {
        return i == 0 ? "" + +r : +r + "," + +i;
      }
    }

    parse(input) {
      input = "" + input;
      if (!input) return { r: 0, i: 0 };
      if (!input.includes(",") && this.advancedSyntax) {
        input = input
          .replace(/\s/g, "")
          .replace(/[eE]\+/g, "p")
          .replace(/[eE]-/g, "m");
        let parts = input.split(/(?<!^)[+-]/);

        if (parts.length == 1) {
          const part = parts[0].replace("p", "e+").replace("m", "e-");
          let a;
          return part.endsWith("i")
            ? {
                r: 0,
                i: +((a = part.replace(/i$/, "")), a.match(/\d/) ? a : a + "1"),
              }
            : { r: +part, i: 0 };
        } else {
          const sign = input.match(/(?<!^)[+-]/)?.[0] == "-" ? -1 : 1;
          let reversed = false

          if (parts[0].endsWith("i")) parts.reverse(), reversed = true;
          parts[1] = parts[1].replace(/i$/, "");
          if (!parts[1].match(/\d/)) parts[1] += "1";
          parts = parts.map((v) => v.replace("p", "e+").replace("m", "e-"));
          return { r: +parts[0] * (reversed ? sign : 1), i: +parts[1] * (reversed ? 1 : sign) };
        }
      } else {
        const parts = input.split(",");
        return { r: +parts[0], i: parts[1] == undefined ? 0 : +parts[1] };
      }
    }

    getReal({ x }) {
      return this.parse(x).r;
    }
    getImag({ x }) {
      return this.parse(x).i;
    }
    isReal({ x }) {
      return this.parse(x).i == 0;
    }

    add(x, y) {
      if (x.i == 0 && y.i == 0) return { r: x.r + y.r, i: 0 };
      const r = x.r + y.r;
      const i = x.i + y.i;
      return { r, i };
    }
    complexAdd({ x, y }) {
      (x = this.parse(x)), (y = this.parse(y));
      const v = this.add(x, y);
      return this.complex(v);
    }
    sub(x, y) {
      if (x.i == 0 && y.i == 0) return { r: x.r - y.r, i: 0 };
      const r = x.r - y.r;
      const i = x.i - y.i;
      return { r, i };
    }
    complexSub({ x, y }) {
      (x = this.parse(x)), (y = this.parse(y));
      const v = this.sub(x, y);
      return this.complex(v);
    }
    mul(x, y) {
      if (x.i == 0 && y.i == 0) return { r: x.r * y.r, i: 0 };
      const r = x.r * y.r - x.i * y.i;
      const i = x.r * y.i + x.i * y.r;
      return { r, i };
    }
    complexMul({ x, y }) {
      (x = this.parse(x)), (y = this.parse(y));
      const mul = this.mul(x, y);
      return this.complex(mul);
    }
    div(x, y) {
      if (x.i == 0 && y.i == 0) return { r: x.r / y.r, i: 0 };
      if (y.r == 0 && y.i == 0) return { r: 1 / (y.r * x.r), i: 0 };
      const a = y.r ** 2 + y.i ** 2;
      const r = (x.r * y.r + x.i * y.i) / a;
      const i = (x.i * y.r - x.r * y.i) / a;
      return { r, i };
    }
    complexDiv({ x, y }) {
      (x = this.parse(x)), (y = this.parse(y));
      const div = this.div(x, y);
      return this.complex(div);
    }
    pow(x, y) {
      if (x.i == 0 && y.i == 0) {
        const r = x.r ** y.r;
        if (!isNaN(r)) return { r, i: 0 };
      }
      const R = Math.sqrt(x.r ** 2 + x.i ** 2);
      const T = Math.atan2(x.i, x.r);
      const e = Math.E ** (y.r * Math.log(R) - y.i * T);
      const a = y.r * T + y.i * Math.log(R);
      const r = e * Math.cos(a);
      const i = e * Math.sin(a);
      return { r, i };
    }
    complexPow({ x, y }) {
      (x = this.parse(x)), (y = this.parse(y));
      const pow = this.pow(x, y);
      return this.complex(pow);
    }
    ln(x) {
      if (x.i == 0 && x.r >= 0) return { r: Math.log(x.r), i: 0 };
      const r = Math.log(x.r ** 2 + x.i ** 2) / 2;
      const i = Math.atan2(x.i, x.r);
      return { r, i };
    }
    complexOperation({ oper, z }) {
      z = this.parse(z);
      let r = z.r,
        i = z.i;
      if (["sin", "cos", "tan"].includes(oper))
        (r /= 180 / Math.PI), (i /= 180 / Math.PI);
      let out, alt;

      switch (oper) {
        case "abs":
          out = [Math.sqrt(r ** 2 + i ** 2), 0];
          break;
        case "conjugate":
          out = [r, -i];
          break;
        case "flip":
          out = [i, r];
          break;
        case "floor":
          out = [Math.floor(r), Math.floor(i)];
          break;
        case "ceiling":
          out = [Math.ceil(r), Math.ceil(i)];
          break;
        case "round":
          out = [Math.round(r), Math.round(i)];
          break;
        case "sqrt":
          out = this.pow(z, { r: 0.5, i: 0 });
          break;
        case "atan2":
          out = [Math.atan2(i, r), 0];
          break;
        case "e^":
          out = this.pow({ r: Math.E, i: 0 }, z);
          break;
        case "10^":
          out = this.pow({ r: 10, i: 0 }, z);
          break;
        case "sign":
          out = [Math.sign(r), Math.sign(i)];
          break;
        case "sin":
          out =
            i == 0
              ? [Math.sin(r), 0]
              : [Math.sin(r) * Math.cosh(i), Math.cos(r) * Math.sinh(i)];
          break;
        case "cos":
          out =
            i == 0
              ? [Math.cos(r), 0]
              : [Math.cos(r) * Math.cosh(i), Math.sin(r) * Math.sinh(i)];
          break;
        case "tan":
          i == 0
            ? (out = [Math.tan(r), 0])
            : ((alt = Math.cos(r * 2) + Math.cosh(i * 2)),
              (out = [Math.sin(r * 2) / alt, Math.sinh(i * 2) / alt]));
          break;
        case "asin":
          if (i == 0 && Math.abs(r) <= 1)
            out = [(Math.asin(r) * 180) / Math.PI, 0];
          else {
            alt = this.mul(
              this.ln(
                this.add(
                  this.pow(
                    this.sub({ r: 1, i: 0 }, this.pow(z, { r: 2, i: 0 })),
                    { r: 0.5, i: 0 }
                  ),
                  this.mul(z, { r: 0, i: 1 })
                )
              ),
              { r: 0, i: -1 }
            );
            out = [(alt.r * 180) / Math.PI, (alt.i * 180) / Math.PI];
          }
          break;
        case "acos":
          if (i == 0 && Math.abs(r) <= 1)
            out = [(Math.acos(r) * 180) / Math.PI, 0];
          else {
            alt = this.mul(
              this.ln(
                this.add(
                  this.mul(
                    this.pow(
                      this.sub({ r: 1, i: 0 }, this.pow(z, { r: 2, i: 0 })),
                      { r: 0.5, i: 0 }
                    ),
                    { r: 0, i: 1 }
                  ),
                  z
                )
              ),
              { r: 0, i: -1 }
            );
            out = [(alt.r * 180) / Math.PI, (alt.i * 180) / Math.PI];
          }
          break;
        case "atan":
          if (i == 0) out = [(Math.atan(r) * 180) / Math.PI, 0];
          else {
            alt = this.mul(
              this.ln(
                this.div(
                  this.sub({ r: 1, i: 0 }, this.mul(z, { r: 0, i: 1 })),
                  this.add({ r: 1, i: 0 }, this.mul(z, { r: 0, i: 1 }))
                )
              ),
              { r: 0, i: 0.5 }
            );
            out = [(alt.r * 180) / Math.PI, (alt.i * 180) / Math.PI];
          }
          break;
        case "ln":
          (alt = this.ln(z)), (out = [alt.r, alt.i]);
          break;
      }

      return this.complex({ r: out[0], i: out[1] });
    }
    complexLog({ n, z }) {
      (n = this.parse(n)), (z = this.parse(z));
      if (n.i == 0 && z.i == 0) return Math.log(z.r) / Math.log(n.r);
      const N = {
        r: Math.log(n.r ** 2 + n.i ** 2) / 2,
        i: Math.atan2(n.i, n.r),
      };
      const Z = {
        r: Math.log(z.r ** 2 + z.i ** 2) / 2,
        i: Math.atan2(z.i, z.r),
      };
      const out = this.div(Z, N);
      return this.complex(out);
    }
    toggleComplexAdvSyntax({ mode }) {
      this.advancedSyntax = mode == "advanced (slower)";
    }
    getComplexAdvSyntax() {
      return this.advancedSyntax;
    }
    complexMod({ x, y }) {
      (x = this.parse(x)), (y = this.parse(y));
      const a = this.div(x, y);
      a.r -= Math.floor(a.r);
      a.i -= Math.floor(a.i);
      const out = this.mul(a, y);
      return this.complex(out);
    }

    getInfo() {
      return {
        id: "bonesytcomplex",
        name: Scratch.translate("Complex Numbers"),
        color1: "#51CCAB",
        color2: "#42BC9B",
        color3: "#2FA887",
        menuIconURI:
          "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI2My4yNSIgaGVpZ2h0PSI2My4yNSIgdmlld0JveD0iMCwwLDYzLjI1LDYzLjI1Ij48ZGVmcz48bGluZWFyR3JhZGllbnQgeDE9IjI0MCIgeTE9IjE3MS44MDk2OSIgeDI9IjI0MCIgeTI9IjIwMS43Nzc3OCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGlkPSJjb2xvci0xIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiM5OWZmZGYiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiM4N2ZmZjEiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCB4MT0iMjQwIiB5MT0iMTcxLjgwOTY5IiB4Mj0iMjQwIiB5Mj0iMjAxLjc3Nzc4IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgaWQ9ImNvbG9yLTIiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2Q1ZmZmMiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2I2ZmZmNyIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMDguMzc1LC0xNDguMzc1KSI+PGcgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aXNQYWludGluZ0xheWVyJnF1b3Q7OnRydWV9IiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMjEwLDE4MGMwLC0xNi41Njg1NCAxMy40MzE0NiwtMzAgMzAsLTMwYzE2LjU2ODU0LDAgMzAsMTMuNDMxNDYgMzAsMzBjMCwxNi41Njg1NCAtMTMuNDMxNDYsMzAgLTMwLDMwYy0xNi41Njg1NCwwIC0zMCwtMTMuNDMxNDYgLTMwLC0zMHoiIGZpbGw9IiM1MWNjYWIiIHN0cm9rZT0iIzJmYTg4NyIgc3Ryb2tlLXdpZHRoPSIzLjI1Ii8+PGcgc3Ryb2tlPSIjMDA0NjRmIiBzdHJva2Utd2lkdGg9IjQiPjxwYXRoIGQ9Ik0yMzcuMjA0MDEsMTYzLjQwMDQ3YzAsLTIuODU5ODcgMi4zMTgzOCwtNS4xNzgyNSA1LjE3ODI1LC01LjE3ODI1YzIuODU5ODcsMCA1LjE3ODI1LDIuMzE4MzggNS4xNzgyNSw1LjE3ODI1YzAsMi44NTk4NyAtMi4zMTgzOCw1LjE3ODI1IC01LjE3ODI1LDUuMTc4MjVjLTIuODU5ODcsMCAtNS4xNzgyNSwtMi4zMTgzOCAtNS4xNzgyNSwtNS4xNzgyNXoiIGZpbGw9IiM5OWZmZGYiLz48cGF0aCBkPSJNMjMxLjI0NTc3LDE3NC43OTAwOGwwLjc4NDMxLC0yLjk4MDM5aDE0LjYxMDY0YzAsMCAtNC43Mjk2OSwyMS4wNTExIC0zLjk4Mjg5LDI0LjEwNjVjMC42NzEwNywyLjczMTI2IDUuNjI3OTcsMC4yMzk1OCA1LjYyNzk3LDAuMjM5NThsMC40Njg0MiwzLjMwOTE5YzAsMCAtMy40NTczMywyLjI3MDUyIC03LjQ0NzczLDIuMzEyMzhjLTMuNTQ4OTUsMC4wMzcyMiAtNiwtMi4yNTIwNCAtNi41MDAxMywtNC42MDEwNWMtMS42Mzk1OSwtNy43MDA5NSAyLjc4MjY3LC0yMi4zODYxOSAyLjc4MjY3LC0yMi4zODYxOXoiIGZpbGw9InVybCgjY29sb3ItMSkiLz48L2c+PHBhdGggZD0iTTIzNy4yMDQwMSwxNjMuNDAwNDdjMCwtMi44NTk4NyAyLjMxODM4LC01LjE3ODI1IDUuMTc4MjUsLTUuMTc4MjVjMi44NTk4NywwIDUuMTc4MjUsMi4zMTgzOCA1LjE3ODI1LDUuMTc4MjVjMCwyLjg1OTg3IC0yLjMxODM4LDUuMTc4MjUgLTUuMTc4MjUsNS4xNzgyNWMtMi44NTk4NywwIC01LjE3ODI1LC0yLjMxODM4IC01LjE3ODI1LC01LjE3ODI1eiIgZmlsbD0iI2RhZmZmMyIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjAiLz48cGF0aCBkPSJNMjMxLjI0NTc3LDE3NC43OTAwOGwwLjc4NDMxLC0yLjk4MDM5aDE0LjYxMDY0YzAsMCAtNC43Mjk2OSwyMS4wNTExIC0zLjk4Mjg5LDI0LjEwNjVjMC42NzEwNywyLjczMTI2IDUuNjI3OTcsMC4yMzk1OCA1LjYyNzk3LDAuMjM5NThsMC40Njg0MiwzLjMwOTE5YzAsMCAtMy40NTczMywyLjI3MDUyIC03LjQ0NzczLDIuMzEyMzhjLTMuNTQ4OTUsMC4wMzcyMiAtNiwtMi4yNTIwNCAtNi41MDAxMywtNC42MDEwNWMtMS42Mzk1OSwtNy43MDA5NSAyLjc4MjY3LC0yMi4zODYxOSAyLjc4MjY3LC0yMi4zODYxOXoiIGZpbGw9InVybCgjY29sb3ItMikiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIwIi8+PC9nPjwvZz48L3N2Zz48IS0tcm90YXRpb25DZW50ZXI6MzEuNjI1OjMxLjYyNS0tPg==",
        /** @type {('---'|Scratch.Block)[]} */
        blocks: [
          {
            opcode: "complex",
            blockType: "reporter",
            text: Scratch.translate("[r] + [i]i"),
            arguments: {
              r: { type: "number", defaultValue: 0 },
              i: { type: "number", defaultValue: 1 },
            },
          },
          {
            opcode: "getReal",
            blockType: "reporter",
            text: Scratch.translate("real of [x]"),
            arguments: {
              x: { type: "string", defaultValue: "1 + 2i" },
            },
          },
          {
            opcode: "getImag",
            blockType: "reporter",
            text: Scratch.translate("imaginary of [x]"),
            arguments: {
              x: { type: "string", defaultValue: "1 + 2i" },
            },
          },
          {
            opcode: "isReal",
            blockType: "Boolean",
            text: Scratch.translate("is [x] a real number?"),
            arguments: {
              x: { type: "string", defaultValue: "i" },
            },
          },
          "---",
          {
            opcode: "complexAdd",
            blockType: "reporter",
            text: Scratch.translate("[x] + [y]"),
            arguments: {
              x: { type: "string", defaultValue: " " },
              y: { type: "string", defaultValue: " " },
            },
          },
          {
            opcode: "complexSub",
            blockType: "reporter",
            text: Scratch.translate("[x] - [y]"),
            arguments: {
              x: { type: "string", defaultValue: " " },
              y: { type: "string", defaultValue: " " },
            },
          },
          {
            opcode: "complexMul",
            blockType: "reporter",
            text: Scratch.translate("[x] * [y]"),
            arguments: {
              x: { type: "string", defaultValue: " " },
              y: { type: "string", defaultValue: " " },
            },
          },
          {
            opcode: "complexDiv",
            blockType: "reporter",
            text: Scratch.translate("[x] / [y]"),
            arguments: {
              x: { type: "string", defaultValue: " " },
              y: { type: "string", defaultValue: " " },
            },
          },
          {
            opcode: "complexPow",
            blockType: "reporter",
            text: Scratch.translate("[x] ^ [y]"),
            arguments: {
              x: { type: "string", defaultValue: " " },
              y: { type: "string", defaultValue: " " },
            },
          },
          "---",
          {
            opcode: "complexOperation",
            blockType: "reporter",
            text: Scratch.translate("[oper] of [z]"),
            arguments: {
              oper: { type: "string", menu: "complexOper" },
              z: { type: "string", defaultValue: "i + 1" },
            },
          },
          {
            opcode: "complexLog",
            blockType: "reporter",
            text: Scratch.translate("log base [n] of [z]"),
            arguments: {
              n: { type: "string", defaultValue: "10" },
              z: { type: "string", defaultValue: "100" },
            },
          },
          {
            opcode: "complexMod",
            blockType: "reporter",
            text: Scratch.translate("[x] mod [y]"),
            arguments: {
              x: { type: "string", defaultValue: " " },
              y: { type: "string", defaultValue: " " },
            },
          },
          "---",
          {
            opcode: "toggleComplexAdvSyntax",
            blockType: "command",
            text: Scratch.translate("set syntax mode to [mode]"),
            arguments: { mode: { type: "string", menu: "complexSyntaxMode" } },
          },
          {
            opcode: "getComplexAdvSyntax",
            blockType: "Boolean",
            text: Scratch.translate("using advanced syntax?"),
          },
        ],
        menus: {
          complexOper: {
            acceptReporters: false,
            items: [
              "abs",
              "conjugate",
              "flip",
              "floor",
              "ceiling",
              "round",
              "sqrt",
              "sin",
              "cos",
              "tan",
              "asin",
              "acos",
              "atan",
              "atan2",
              "ln",
              "e^",
              "10^",
              "sign",
            ],
          },
          complexSyntaxMode: {
            acceptReporters: false,
            items: ["simple (faster)", "advanced (slower)"],
          },
        },
      };
    }

    /* add methods for blocks */
  }
  Scratch.extensions.register(new ScratchComplex());
})(Scratch);
