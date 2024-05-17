// Name: Extendable Blocks
// ID: cst1229extendable
// Description: Blocks with inputs that can be added and removed.
// By: CST1229 <https://scratch.mit.edu/users/CST1229/>
// License: LGPL-3.0

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("Extendable Blocks must be run unsandboxed");
  }

  const exId = "cst1229extendable";

  const menuIconURI =
    "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhodG1sPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmlld0JveD0iMCAwIDQwIDQwIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxOCIgZmlsbD0iIzU5YzA1OSIgc3Ryb2tlPSIjMzg5NDM4IiBzdHJva2Utd2lkdGg9IjQiIHBhaW50LW9yZGVyPSJzdHJva2UgbWFya2VycyBmaWxsIiBzdHlsZT0iZm9udC12YXJpYXRpb24tc2V0dGluZ3M6bm9ybWFsIi8+PGltYWdlIHhsaW5rOmhyZWY9ImRhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QmtZWFJoTFc1aGJXVTlJa3hoZVdWeUlERWlJSGh0Ykc1elBTSm9kSFJ3T2k4dmQzZDNMbmN6TG05eVp5OHlNREF3TDNOMlp5SWdkbWxsZDBKdmVEMGlNQ0F3SURFd0lERXpJaUIwY21GdWMyWnZjbTA5SW5OallXeGxLQzB4TENBeEtTSStQSEJoZEdnZ1pEMGlUVE11TmpVdU1UUTFZVEl1TkRFZ01pNDBNU0F3SURBZ01TQXhMamN5TGpjeGJETXVPVElnTXk0NU1tRXlMalExSURJdU5EVWdNQ0F3SURFZ01DQXpMalExYkMwekxqa3lJRE11T1RGaE1pNDBNaUF5TGpReUlEQWdNQ0F4TFRFdU56SXVOeklnTWk0ME9DQXlMalE0SURBZ01DQXhMVEV1TnpNdExqY3hZeTB1TWpRdExqSTVMUzQzTVMwdU56SXRMamN4TFRVdU5qVWdNQzAwTGprekxqUTJMVFV1TXprdU56RXROUzQyTkdFeUxqUTBJREl1TkRRZ01DQXdJREVnTVM0M015MHVOekY2SWlCbWFXeHNQU0lqTWpNeFpqSXdJaUJ2Y0dGamFYUjVQU0l1TVNJdlBqeHdZWFJvSUdROUlrMDRMams0TlNBMkxqVXhZVEV1TkRNZ01TNDBNeUF3SURBZ01TMHVORElnTVd3dE15NDVNaUF6TGprMFlURXVORFFnTVM0ME5DQXdJREFnTVMweUlEQmpMUzQxTmkwdU5UWXRMalUyTFRrdU16RWdNQzA1TGpnM1lURXVORFFnTVM0ME5DQXdJREFnTVNBeUlEQnNNeTQ1TWlBekxqa3lZVEV1TkRNZ01TNDBNeUF3SURBZ01TQXVORElnTVM0d01Yb2lJR1pwYkd3OUlpTm1abVlpTHo0OEwzTjJaejQ9IiB3aWR0aD0iMTYiIGhlaWdodD0iMzIiIHg9IjQiIHk9IjQiLz48aW1hZ2UgeGxpbms6aHJlZj0iZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCa1lYUmhMVzVoYldVOUlreGhlV1Z5SURFaUlIaHRiRzV6UFNKb2RIUndPaTh2ZDNkM0xuY3pMbTl5Wnk4eU1EQXdMM04yWnlJZ2RtbGxkMEp2ZUQwaU1DQXdJREV3SURFeklqNDhjR0YwYUNCa1BTSk5NeTQyTlM0eE5EVmhNaTQwTVNBeUxqUXhJREFnTUNBeElERXVOekl1TnpGc015NDVNaUF6TGpreVlUSXVORFVnTWk0ME5TQXdJREFnTVNBd0lETXVORFZzTFRNdU9USWdNeTQ1TVdFeUxqUXlJREl1TkRJZ01DQXdJREV0TVM0M01pNDNNaUF5TGpRNElESXVORGdnTUNBd0lERXRNUzQzTXkwdU56RmpMUzR5TkMwdU1qa3RMamN4TFM0M01pMHVOekV0TlM0Mk5TQXdMVFF1T1RNdU5EWXROUzR6T1M0M01TMDFMalkwWVRJdU5EUWdNaTQwTkNBd0lEQWdNU0F4TGpjekxTNDNNWG9pSUdacGJHdzlJaU15TXpGbU1qQWlJRzl3WVdOcGRIazlJaTR4SWk4K1BIQmhkR2dnWkQwaVRUZ3VPVGcxSURZdU5URmhNUzQwTXlBeExqUXpJREFnTUNBeExTNDBNaUF4YkMwekxqa3lJRE11T1RSaE1TNDBOQ0F4TGpRMElEQWdNQ0F4TFRJZ01HTXRMalUyTFM0MU5pMHVOVFl0T1M0ek1TQXdMVGt1T0RkaE1TNDBOQ0F4TGpRMElEQWdNQ0F4SURJZ01Hd3pMamt5SURNdU9USmhNUzQwTXlBeExqUXpJREFnTUNBeElDNDBNaUF4TGpBeGVpSWdabWxzYkQwaUkyWm1aaUl2UGp3dmMzWm5QZz09IiB3aWR0aD0iMTYiIGhlaWdodD0iMzIiIHg9IjIwIiB5PSI0Ii8+PC9zdmc+";

  class ExtendableBlocks {
    getInfo() {
      return {
        id: exId,
        text: Scratch.translate("Extendable Blocks"),
        name: "Extendable Blocks",
        menuIconURI: menuIconURI,
        blocks: [
          {
            opcode: "extendJoin",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate({
              default: "join",
              description:
                "Beginning of the extendable join block. Text inputs follow after this. Ideally should match vanilla Scratch's strings",
            }),
            arguments: {},
            mutator: "cst_extendable",
            extensions: ["colours_operators", "cst_extendable_string"],
            disableMonitor: true,
          },
          {
            opcode: "extendSum",
            blockType: Scratch.BlockType.REPORTER,
            // This text will never actually be seen
            // (as it is removed by the mutator)
            text: "+ extendable",
            arguments: {},
            mutator: "cst_extendable",
            extensions: [
              "colours_operators",
              "cst_extendable_number",
              "cst_extendable_clear",
            ],
            disableMonitor: true,
          },
          {
            opcode: "extendMinus",
            blockType: Scratch.BlockType.REPORTER,
            text: "- extendable",
            arguments: {},
            mutator: "cst_extendable",
            extensions: [
              "colours_operators",
              "cst_extendable_number",
              "cst_extendable_clear",
            ],
            disableMonitor: true,
          },
          {
            opcode: "extendProduct",
            blockType: Scratch.BlockType.REPORTER,
            text: "* extendable",
            arguments: {},
            mutator: "cst_extendable",
            extensions: [
              "colours_operators",
              "cst_extendable_number",
              "cst_extendable_clear",
            ],
            disableMonitor: true,
          },
          {
            opcode: "extendDivide",
            blockType: Scratch.BlockType.REPORTER,
            text: "/ extendable",
            arguments: {},
            mutator: "cst_extendable",
            extensions: [
              "colours_operators",
              "cst_extendable_number",
              "cst_extendable_clear",
            ],
            disableMonitor: true,
          },
          "---",
          {
            opcode: "extendAnd",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "and extendable",
            arguments: {},
            mutator: "cst_extendable",
            extensions: [
              "colours_operators",
              "cst_extendable_boolean",
              "cst_extendable_clear",
            ],
            disableMonitor: true,
          },
          {
            opcode: "extendOr",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "or extendable",
            arguments: {},
            mutator: "cst_extendable",
            extensions: [
              "colours_operators",
              "cst_extendable_boolean",
              "cst_extendable_clear",
            ],
            disableMonitor: true,
          },
          {
            opcode: "extendLess",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "< extendable",
            arguments: {},
            mutator: "cst_extendable",
            extensions: [
              "colours_operators",
              "cst_extendable_string",
              "cst_extendable_clear",
            ],
            disableMonitor: true,
          },
          {
            opcode: "extendEqual",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "= extendable",
            arguments: {},
            mutator: "cst_extendable",
            extensions: [
              "colours_operators",
              "cst_extendable_string",
              "cst_extendable_clear",
            ],
            disableMonitor: true,
          },
          {
            opcode: "extendGreater",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "> extendable",
            arguments: {},
            mutator: "cst_extendable",
            extensions: [
              "colours_operators",
              "cst_extendable_string",
              "cst_extendable_clear",
            ],
            disableMonitor: true,
          },
          "---",
          {
            opcode: "joinWith",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate({
              id: "joinwith",
              default: "join",
              description:
                "Beginning of the 'join (...) with []' block. Text inputs follow after this",
            }),
            arguments: {},
            mutator: "cst_extendable",
            extensions: ["colours_operators", "cst_extendable_joinwith"],
            disableMonitor: true,

            // currently somewhat broken
            hideFromPalette: true,
          },
          {
            opcode: "extendArray",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate({
              default: "create json array",
              description:
                "Beginning of the create JSON array block. Text inputs follow after this",
            }),
            arguments: {},
            mutator: "cst_extendable",
            extensions: ["colours_operators", "cst_extendable_string"],
            disableMonitor: true,
          },
          "---",
          {
            opcode: "runBranch",
            blockType: Scratch.BlockType.CONDITIONAL,
            text: Scratch.translate({
              default: "run branch [BRANCH] of",
              description:
                "Beginning of the run branch of block. C block inputs follow after this",
            }),
            arguments: {
              BRANCH: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
            },
            mutator: "cst_extendable",
            extensions: ["colours_control", "cst_extendable_branch"],
          },
          {
            opcode: "extendIf",
            blockType: Scratch.BlockType.CONDITIONAL,
            text: Scratch.translate({
              default: "if",
              description:
                "Beginning of the extendable if blocks. Ideally should match vanilla Scratch's strings",
            }),
            mutator: "cst_extendable",
            extensions: ["colours_control", "cst_extendable_if"],
          },
          {
            opcode: "extendIfElse",
            blockType: Scratch.BlockType.CONDITIONAL,
            text: Scratch.translate({
              default: "if",
              description:
                "Beginning of the extendable if blocks. Ideally should match vanilla Scratch's strings",
            }),
            mutator: "cst_extendable",
            extensions: ["colours_control", "cst_extendable_if_else"],
          },
          {
            opcode: "extendSwitch",
            blockType: Scratch.BlockType.CONDITIONAL,
            text: Scratch.translate({
              default: "switch [VALUE]",
              description: "Beginning of the extendable switch block",
            }),
            arguments: {
              VALUE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
            },
            mutator: "cst_extendable",
            extensions: ["colours_control", "cst_extendable_switch"],
          },
        ],
      };
    }

    extendJoin(args) {
      const prefix = "ARG";
      let string = "";
      for (let i = 0; prefix + i in args; i++) {
        string += Scratch.Cast.toString(args[prefix + i]);
      }
      return string;
    }
    extendSum(args) {
      const prefix = "ARG";
      let number = 0;
      for (let i = 0; prefix + i in args; i++) {
        number += Scratch.Cast.toNumber(args[prefix + i]);
      }
      return number;
    }
    extendProduct(args) {
      const prefix = "ARG";
      let number = 1;
      for (let i = 0; prefix + i in args; i++) {
        number *= Scratch.Cast.toNumber(args[prefix + i]);
      }
      return number;
    }
    extendMinus(args) {
      const prefix = "ARG";
      let number = Scratch.Cast.toNumber(args[prefix + 0]);
      for (let i = 1; prefix + i in args; i++) {
        number -= Scratch.Cast.toNumber(args[prefix + i]);
      }
      return number;
    }
    extendDivide(args) {
      const prefix = "ARG";
      let number = Scratch.Cast.toNumber(args[prefix + 0]);
      for (let i = 1; prefix + i in args; i++) {
        number /= Scratch.Cast.toNumber(args[prefix + i]);
      }
      return number;
    }

    // The compiler does some weird stuff with arguments
    // (this is not the case in the interpreter, so
    // this *is* a parity issue)
    fixCompilerArgs(args, util, prefix = "") {
      // Copy the object just in case
      args = Object.assign({}, args);

      const blocks = util.target.blocks;
      // In the compiler, thread.peekStack works for reporter blocks
      const block = blocks.getBlock(util.thread.peekStack());
      if (!block) return args;
      for (const key in args) {
        if (key.toString().startsWith(prefix)) {
          const input = block.inputs[key];
          if (!input) continue;
          const inputBlock = blocks.getBlock(input.block);
          const shadowBlock = blocks.getBlock(input.shadow);
          if (
            shadowBlock?.opcode === "text" &&
            (!inputBlock || inputBlock?.opcode === "text")
          ) {
            args[key] = Scratch.Cast.toString(args[key]);
          }
        }
      }
      return args;
    }

    extendArray(args, util) {
      const prefix = "ARG";
      const array = [];

      if (util.thread.isCompiled) {
        args = this.fixCompilerArgs(args, util, prefix);
      }

      for (let i = 0; prefix + i in args; i++) {
        array.push(args[prefix + i]);
      }

      try {
        return JSON.stringify(array);
      } catch (e) {
        return "[]";
      }
    }
    joinWith(args, util) {
      const prefix = "ARG";
      const mutation = this.getCurrentMutation(args, util);
      const inputCount = Scratch.Cast.toNumber(mutation?.inputcount);
      console.log(inputCount);
      const joiner = Scratch.Cast.toString(args[prefix + inputCount]);
      if (inputCount <= 0) return "";

      let string = "";
      for (let i = 0; i < inputCount; i++) {
        string += Scratch.Cast.toString(args[prefix + i]);
        if (i + 1 < inputCount) {
          string += joiner;
        }
      }
      return string;
    }
    extendAnd(args, util) {
      const mutation = this.getCurrentMutation(args, util);
      const inputCount = Scratch.Cast.toNumber(mutation?.inputcount);
      if (inputCount <= 0) return false;

      const prefix = "ARG";
      for (let i = 0; i < inputCount + 1; i++) {
        if (!args[prefix + i]) return false;
      }
      return true;
    }
    extendOr(args, util) {
      const mutation = this.getCurrentMutation(args, util);
      const inputCount = Scratch.Cast.toNumber(mutation?.inputcount);
      if (inputCount <= 0) return false;

      const prefix = "ARG";
      for (let i = 0; i < inputCount + 1; i++) {
        if (args[prefix + i]) return true;
      }
      return false;
    }
    extendLess(args, util) {
      const prefix = "ARG";
      for (let i = 1; prefix + i in args; i++) {
        const a = args[prefix + (i - 1)];
        const b = args[prefix + i];
        if (Scratch.Cast.compare(a, b) >= 0) return false;
      }
      return true;
    }
    extendEqual(args, util) {
      const prefix = "ARG";
      for (let i = 1; prefix + i in args; i++) {
        const a = args[prefix + (i - 1)];
        const b = args[prefix + i];
        if (Scratch.Cast.compare(a, b) !== 0) return false;
      }
      return true;
    }
    extendGreater(args, util) {
      const prefix = "ARG";
      for (let i = 1; prefix + i in args; i++) {
        const a = args[prefix + (i - 1)];
        const b = args[prefix + i];
        if (Scratch.Cast.compare(a, b) <= 0) return false;
      }
      return true;
    }

    runBranch(args, util) {
      util.startBranch(Scratch.Cast.toNumber(args.BRANCH));
    }

    extendIf(args, util) {
      const mutation = this.getCurrentMutation(args, util);
      const inputCount = Scratch.Cast.toNumber(mutation?.inputcount);
      const prefix = "CONDITION";
      for (let i = 0; i < inputCount + 1; i++) {
        if (args[prefix + i]) {
          util.startBranch(i + 1);
          return;
        }
      }
    }

    extendIfElse(args, util) {
      const mutation = this.getCurrentMutation(args, util);
      const inputCount = Scratch.Cast.toNumber(mutation?.inputcount);
      const prefix = "CONDITION";
      for (let i = 0; i < inputCount + 1; i++) {
        if (args[prefix + i]) {
          util.startBranch(i + 1);
          return;
        }
      }
      util.startBranch(inputCount + 2);
    }

    extendSwitch(args, util) {
      const mutation = this.getCurrentMutation(args, util);
      const inputCount = Scratch.Cast.toNumber(mutation?.inputcount);

      const value = args.VALUE;
      const prefix = "CASE_VALUE";
      for (let i = 0; i < inputCount; i++) {
        if (Scratch.Cast.compare(value, args[prefix + i]) === 0) {
          util.startBranch(i + 1);
          return;
        }
      }
      util.startBranch(inputCount + 1);
    }

    getCurrentMutation(args, util) {
      // In the interpreter, args.mutation exists (thanks FurryR for notifying me about this, yes that's their username),
      // and in the compiler, util.thread.peekStack() works for reporters
      return (
        args.mutation ||
        util.target.blocks.getBlock(util.thread.peekStack())?.mutation ||
        Scratch.vm.runtime.flyoutBlocks.getBlock(util.thread.peekStack())
          ?.mutation
      );
    }
  }

  // Based on https://github.com/Xeltalliv/extensions/blob/examples/examples/extension-colors.js
  // Add `mutator`
  const runtime = Scratch.vm.runtime;
  // @ts-ignore
  const cbfsb = runtime._convertBlockForScratchBlocks.bind(runtime);
  // @ts-ignore
  runtime._convertBlockForScratchBlocks = function (blockInfo, categoryInfo) {
    const res = cbfsb(blockInfo, categoryInfo);
    if (blockInfo.mutator) {
      res.json.mutator = blockInfo.mutator;
    }
    return res;
  };

  function patchSB() {
    // @ts-ignore
    const ScratchBlocks = window?.ScratchBlocks;
    if (!ScratchBlocks) return;

    Scratch.vm.removeListener("EXTENSION_ADDED", patchSB);
    Scratch.vm.removeListener("BLOCKSINFO_UPDATE", patchSB);

    const leftArrowIcon = `data:image/svg+xml;base64,PHN2ZyBkYXRhLW5hbWU9IkxheWVyIDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDEwIDEzIiB0cmFuc2Zvcm09InNjYWxlKC0xLCAxKSI+PHBhdGggZD0iTTMuNjUuMTQ1YTIuNDEgMi40MSAwIDAgMSAxLjcyLjcxbDMuOTIgMy45MmEyLjQ1IDIuNDUgMCAwIDEgMCAzLjQ1bC0zLjkyIDMuOTFhMi40MiAyLjQyIDAgMCAxLTEuNzIuNzIgMi40OCAyLjQ4IDAgMCAxLTEuNzMtLjcxYy0uMjQtLjI5LS43MS0uNzItLjcxLTUuNjUgMC00LjkzLjQ2LTUuMzkuNzEtNS42NGEyLjQ0IDIuNDQgMCAwIDEgMS43My0uNzF6IiBmaWxsPSIjMjMxZjIwIiBvcGFjaXR5PSIuMSIvPjxwYXRoIGQ9Ik04Ljk4NSA2LjUxYTEuNDMgMS40MyAwIDAgMS0uNDIgMWwtMy45MiAzLjk0YTEuNDQgMS40NCAwIDAgMS0yIDBjLS41Ni0uNTYtLjU2LTkuMzEgMC05Ljg3YTEuNDQgMS40NCAwIDAgMSAyIDBsMy45MiAzLjkyYTEuNDMgMS40MyAwIDAgMSAuNDIgMS4wMXoiIGZpbGw9IiNmZmYiLz48L3N2Zz4=`;
    const rightArrowIcon = `data:image/svg+xml;base64,PHN2ZyBkYXRhLW5hbWU9IkxheWVyIDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDEwIDEzIj48cGF0aCBkPSJNMy42NS4xNDVhMi40MSAyLjQxIDAgMCAxIDEuNzIuNzFsMy45MiAzLjkyYTIuNDUgMi40NSAwIDAgMSAwIDMuNDVsLTMuOTIgMy45MWEyLjQyIDIuNDIgMCAwIDEtMS43Mi43MiAyLjQ4IDIuNDggMCAwIDEtMS43My0uNzFjLS4yNC0uMjktLjcxLS43Mi0uNzEtNS42NSAwLTQuOTMuNDYtNS4zOS43MS01LjY0YTIuNDQgMi40NCAwIDAgMSAxLjczLS43MXoiIGZpbGw9IiMyMzFmMjAiIG9wYWNpdHk9Ii4xIi8+PHBhdGggZD0iTTguOTg1IDYuNTFhMS40MyAxLjQzIDAgMCAxLS40MiAxbC0zLjkyIDMuOTRhMS40NCAxLjQ0IDAgMCAxLTIgMGMtLjU2LS41Ni0uNTYtOS4zMSAwLTkuODdhMS40NCAxLjQ0IDAgMCAxIDIgMGwzLjkyIDMuOTJhMS40MyAxLjQzIDAgMCAxIC40MiAxLjAxeiIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==`;
    const arrowWidth = 16;
    const arrowHeight = 32;

    class FieldImageButton extends ScratchBlocks.FieldImage {
      constructor(src, width, height, callback, opt_alt, flip_rtl, noPadding) {
        super(src, width, height, opt_alt, flip_rtl);
        this._callback = callback.bind(this);
        this.noPadding = noPadding;
      }
      init() {
        if (this.fieldGroup_) {
          // Image has already been initialized once.
          return;
        }
        super.init();
        this.mouseDownWrapper_ = ScratchBlocks.bindEventWithChecks_(
          this.getSvgRoot(),
          "mousedown",
          this,
          this.onMouseDown_
        );
        this.getSvgRoot().style.cursor = "pointer";
      }
      showEditor_() {
        if (this._callback) {
          this._callback();
        }
      }
      getSize() {
        if (!this.size_.width) {
          this.render_();
        }
        if (!this.noPadding) return this.size_;
        return new this.size_.constructor(
          Math.max(1, this.size_.width - ScratchBlocks.BlockSvg.SEP_SPACE_X),
          this.size_.height
        );
      }
      EDITABLE = true;
    }

    // heavily based on scratch-blocks' procedures code
    // https://github.com/TurboWarp/scratch-blocks
    ScratchBlocks.Extensions.registerMutator(
      "cst_extendable",
      {
        domToMutation(xmlElement) {
          this.inputCount = Math.floor(
            Number(xmlElement.getAttribute("inputcount"))
          );
          this.inputCount = Math.min(
            Math.max(this.minInputs, this.inputCount),
            this.maxInputs
          );
          if (isNaN(this.inputCount) || !Number.isFinite(this.inputCount))
            this.inputCount = this.minInputs;
          this.prevInputCount = this.inputCount;
          // HACK: fixes alt+drag duplicate not adding blocks inside
          this.updateDisplay_(true);
        },
        mutationToDom() {
          const container = document.createElement("mutation");
          container.setAttribute("inputcount", this.inputCount.toString());
          return container;
        },

        isExtendableInput(input) {
          return (
            input.name.startsWith("ARROW_") ||
            this.extendableDefs.some((def) => input.name.startsWith(def.id)) ||
            this.extendableDefsStart.some((def) =>
              input.name.startsWith(def.id)
            ) ||
            this.extendableDefsEnd.some((def) => input.name.startsWith(def.id))
          );
        },

        // Disconnects all blocks in extendable inputs and returns them.
        disconnectOldBlocks_() {
          const connectionMap = {};
          const hasEndBlocks = this.extendableDefsEnd.length > 0;
          const hasStartBlocks = this.extendableDefsStart.length > 0;
          const prevEndIndex =
            this.prevInputCount + (this.extendableDefsStart.length > 0);

          // Reattach end blocks when inputs are added/removed
          const reattachMap = Object.create(null);
          if (hasEndBlocks) {
            for (const def of this.extendableDefsEnd) {
              const input = this.getInput(
                this.getExtendableInput(def.id, prevEndIndex)
              );
              if (input && input.connection) {
                reattachMap[input.name] = def.id;
              }
            }
          }

          for (const input of this.inputList) {
            if (input.connection && this.isExtendableInput(input)) {
              const target = input.connection.targetBlock();
              const saveInfo = {
                shadow: input.connection.getShadowDom(),
                block: target,
              };

              let name = input.name;
              if (reattachMap[name]) {
                name = this.getExtendableInput(
                  reattachMap[name],
                  this.inputCount + hasStartBlocks
                );
                if (connectionMap[name]) {
                  connectionMap["$UNUSED" + name] = connectionMap[name];
                  delete connectionMap[name];
                }
              }

              if (connectionMap[name]) {
                connectionMap["$UNUSED" + name] = saveInfo;
              } else {
                connectionMap[name] = saveInfo;
              }

              // Remove the shadow DOM, then disconnect the block.	Otherwise a shadow
              // block will respawn instantly, and we'd have to remove it when we remove
              // the input.
              input.connection.setShadowDom(null);
              if (target) {
                input.connection.disconnect();
              }
            }
          }
          return connectionMap;
        },

        removeAllInputs_() {
          this.inputList = this.inputList.filter((input) => {
            if (
              this.isExtendableInput(input) ||
              (input.type === ScratchBlocks.DUMMY_INPUT && this.clearLabels)
            ) {
              input.dispose();
              return false;
            }
            return true;
          });
        },

        // Creates a shadow input for an extendable definition.
        attachShadow_(input, def) {
          if (!def.shadowType) return;
          ScratchBlocks.Events.disable();
          let newBlock;
          try {
            newBlock = this.workspace.newBlock(def.shadowType);
            newBlock.setFieldValue(def.shadowDefault, def.shadowField);
            newBlock.setShadow(true);
            if (!this.isInsertionMarker()) {
              newBlock.initSvg();
              newBlock.render(false);
            }
          } finally {
            ScratchBlocks.Events.enable();
          }
          if (ScratchBlocks.Events.isEnabled()) {
            ScratchBlocks.Events.fire(
              new ScratchBlocks.Events.BlockCreate(newBlock)
            );
          }
          if (newBlock.outputConnection)
            newBlock.outputConnection.connect(input.connection);
          else newBlock.previousConnection.connect(input.connection);
        },
        buildShadowDom_(def) {
          const shadowDom = document.createElement("shadow");
          shadowDom.setAttribute("type", def.shadowType);
          const fieldDom = document.createElement("field", null);
          fieldDom.setAttribute("name", def.shadowField);
          shadowDom.appendChild(fieldDom);
          return shadowDom;
        },

        // Populates an argument.
        // Puts existing blocks back in or creates new ones.
        populateArgument_(connectionMap, id, input, def) {
          let oldBlock = null;
          let oldShadow = null;

          if (connectionMap && id in connectionMap) {
            const saveInfo = connectionMap[id];
            oldBlock = saveInfo["block"];
            oldShadow = saveInfo["shadow"];
          }

          if (connectionMap && oldBlock) {
            // Reattach the old block and shadow DOM.
            connectionMap[id] = null;
            if (oldBlock.outputConnection)
              oldBlock.outputConnection.connect(input.connection);
            else oldBlock.previousConnection.connect(input.connection);
            if (def.shadowType) {
              const shadowDom = oldShadow || this.buildShadowDom_(def);
              input.connection.setShadowDom(shadowDom);
            }
          } else {
            this.attachShadow_(input, def);
          }
        },

        // Removes unused inputs from the VM
        cleanInputs() {
          const target = Scratch.vm.editingTarget;
          if (!target) return;
          const blocks = this.isInFlyout
            ? Scratch.vm.runtime.flyoutBlocks
            : target.blocks;
          const vmBlock = blocks.getBlock(this.id);
          if (!vmBlock) return;

          const usedInputs = new Set(this.inputList.map((i) => i?.name));

          const inputs = vmBlock.inputs;
          for (const name of Object.keys(inputs)) {
            const input = inputs[name];
            if (!usedInputs.has(name)) {
              // @ts-ignore
              blocks.deleteBlock(input.block);
              // @ts-ignore
              blocks.deleteBlock(input.shadow);
              delete inputs[name];
            }
          }
        },

        // Gets an argument name for a prefix + index.
        getExtendableInput(prefix, index) {
          let id = prefix;
          // Special handling for substacks,
          // as their names matter for execution
          if (prefix === "SUBSTACK") {
            index += 1;
            if (index > 1) id += index;
          } else {
            id += index;
          }
          return id;
        },

        // The internal create input function.
        addInput_(def, i, connectionMap = null) {
          const id = this.getExtendableInput(def.id, i);
          const input = this.appendInput_(def.type, id);
          if (def.type === ScratchBlocks.DUMMY_INPUT) {
            input.appendField(def.check);
          } else {
            if (def.check) {
              input.setCheck(def.check);
            }
            this.populateArgument_(connectionMap, id, input, def);
          }
        },

        // The "user create input" function.
        insertInput() {
          ScratchBlocks.Events.setGroup(true);
          const oldMutation = ScratchBlocks.Xml.domToText(this.mutationToDom());
          this.inputCount++;

          this.updateDisplay_();

          // i have no idea if this is the correct way or not
          const newMutation = ScratchBlocks.Xml.domToText(this.mutationToDom());
          const ev = new ScratchBlocks.Events.BlockChange(
            this,
            "mutation",
            null,
            oldMutation,
            newMutation
          );
          ScratchBlocks.Events.fire(ev);
          ScratchBlocks.Events.setGroup(false);
        },
        // The "user delete input" function.
        deleteInput() {
          ScratchBlocks.Events.setGroup(true);
          const oldMutation = ScratchBlocks.Xml.domToText(this.mutationToDom());
          this.inputCount--;
          const plusInputs = this.extendableDefsStart.length > 0 ? 1 : 0;

          for (const def of this.extendableDefs) {
            this.removeInput(
              this.getExtendableInput(def.id, this.inputCount + plusInputs)
            );
          }
          this.updateDisplay_();

          const newMutation = ScratchBlocks.Xml.domToText(this.mutationToDom());
          const ev = new ScratchBlocks.Events.BlockChange(
            this,
            "mutation",
            null,
            oldMutation,
            newMutation
          );
          ScratchBlocks.Events.fire(ev);
          ScratchBlocks.Events.setGroup(false);

          this.cleanInputs();
        },

        createAllInputs_(connectionMap) {
          let index = 0;
          if (this.extendableDefsStart.length > 0) {
            for (const def of this.extendableDefsStart)
              this.addInput_(def, index, connectionMap);
            index++;
          }
          for (let i = 0; i < this.inputCount; i++) {
            for (const def of this.extendableDefs)
              this.addInput_(def, index, connectionMap);
            index++;
          }
          return index;
        },

        addArrowButtons_() {
          if (this.inputCount > this.minInputs) {
            const leftInput = this.appendDummyInput("ARROW_LEFT");
            const leftArrow = new FieldImageButton(
              leftArrowIcon,
              arrowWidth,
              arrowHeight,
              function () {
                this.sourceBlock_.deleteInput();
              },
              Scratch.translate({
                default: "Remove input",
                description:
                  "Alt text for the button that removes an input on blocks",
              }),
              true,
              this.inputCount < this.maxInputs
            );
            leftInput.appendField(leftArrow);
          }
          if (this.inputCount < this.maxInputs) {
            const rightInput = this.appendDummyInput("ARROW_RIGHT");
            const rightArrow = new FieldImageButton(
              rightArrowIcon,
              arrowWidth,
              arrowHeight,
              function () {
                this.sourceBlock_.insertInput();
              },
              Scratch.translate({
                default: "Add input",
                description:
                  "Alt text for the button that adds an input on blocks",
              }),
              true,
              false
            );
            rightInput.appendField(rightArrow);
          }
        },

        // Updates this block's inputs.
        updateDisplay_(force) {
          // HACK: prevent weird stray inputs from appearing in the top left corner
          if (
            !this.isInsertionMarker() &&
            !force &&
            this.workspace?.currentGesture_?.isDraggingBlock_ &&
            this.workspace?.currentGesture_?.targetBlock_.type === this.type
          )
            return;

          const wasRendered = this.rendered;
          if (this.isInFlyout) {
            ScratchBlocks.Events.disable();
          }

          this.rendered = false;
          this.extendableUpdatedDisplay = true;

          // First, disconnect any old blocks and save them for later
          const connectionMap = this.disconnectOldBlocks_();
          // Remove all extendable inputs
          this.removeAllInputs_();

          // Recreate all the inputs, and if any inputs were there before, put them back in
          let index = this.createAllInputs_(connectionMap);
          this.addArrowButtons_();
          // Add the ending inputs
          for (const def of this.extendableDefsEnd)
            this.addInput_(def, index, connectionMap);
          // Delete any unused blocks
          ScratchBlocks.ScratchBlocks.ProcedureUtils.deleteShadows_.call(
            this,
            connectionMap
          );
          this.prevInputCount = this.inputCount;

          this.rendered = wasRendered;
          if (wasRendered) {
            this.initSvg();
            this.render();
          }

          if (this.isInFlyout) {
            ScratchBlocks.Events.enable();
          }
        },
      },
      function () {
        // An array of extendable input definitions;
        // for each click of the right arrow button,
        // all of these inputs will be added
        this.extendableDefs = [];
        // Inputs to put before any extendable inputs.
        // If non-empty, also increases the maximum index by one
        this.extendableDefsStart = [];
        // Inputs to put after the extendable inputs (after the arrow buttons).
        // If non-empty, also increases the maximum index by one
        this.extendableDefsEnd = [];
        // The default number of inputs.
        this.inputCount = 2;
        // The minimum number of inputs.
        this.minInputs = 1;
        // The maximum number of inputs.
        this.maxInputs = Infinity;
        // If true, clears all blockInfo labels.
        this.clearLabels = false;

        // Internal.
        this.prevInputCount = this.inputCount;
      }
    );

    const createInput = (
      type, // ScratchBlocks.INPUT_VALUE, NEXT_STATEMENT or DUMMY_INPUT
      id, // The argument ID (a number will be appended to this)
      check = null, // null or "Boolean" (or the label text for DUMMY_INPUTs)
      shadowType = undefined, // The type of shadow block (or falsy for none)
      shadowField = undefined, // The field to use in the shadow block
      shadowDefault = undefined // The default shadow block value
    ) => ({ type, id, check, shadowType, shadowField, shadowDefault });

    // Configuration extensions
    ScratchBlocks.Extensions.register("cst_extendable_clear", function () {
      this.clearLabels = true;
    });
    ScratchBlocks.Extensions.register("cst_extendable_string", function () {
      this.extendableDefs = [
        createInput(ScratchBlocks.INPUT_VALUE, "ARG", null, "text", "TEXT", ""),
      ];
      const ops = {
        [exId + "_extendLess"]: "<",
        [exId + "_extendEqual"]: "=",
        [exId + "_extendGreater"]: ">",
      };
      if (this.type in ops) {
        const op = ops[this.type];
        this.extendableDefsStart = [
          createInput(
            ScratchBlocks.INPUT_VALUE,
            "ARG",
            null,
            "text",
            "TEXT",
            ""
          ),
        ];
        this.extendableDefs.unshift(
          createInput(ScratchBlocks.DUMMY_INPUT, "WORD", op)
        );
        this.inputCount = 1;
      }
    });
    ScratchBlocks.Extensions.register("cst_extendable_number", function () {
      const defaultValue = [
        exId + "_extendProduct",
        exId + "_extendDivide",
      ].includes(this.type)
        ? "1"
        : "0";

      this.extendableDefs = [
        createInput(
          ScratchBlocks.INPUT_VALUE,
          "ARG",
          null,
          "math_number",
          "NUM",
          defaultValue
        ),
      ];
      this.minInputs = 1;

      const ops = {
        [exId + "_extendSum"]: "+",
        [exId + "_extendMinus"]: "-",
        [exId + "_extendProduct"]: "*",
        [exId + "_extendDivide"]: "/",
      };
      if (ops[this.type]) {
        this.extendableDefsStart = [
          createInput(
            ScratchBlocks.INPUT_VALUE,
            "ARG",
            null,
            "math_number",
            "NUM",
            defaultValue
          ),
        ];
        this.extendableDefs.unshift(
          createInput(ScratchBlocks.DUMMY_INPUT, "WORD", ops[this.type])
        );
        this.inputCount = 1;
      }
    });
    ScratchBlocks.Extensions.register("cst_extendable_boolean", function () {
      this.extendableDefs = [
        createInput(ScratchBlocks.INPUT_VALUE, "ARG", "Boolean"),
      ];
      if (
        this.type === exId + "_extendAnd" ||
        this.type === exId + "_extendOr"
      ) {
        this.extendableDefsStart = [
          createInput(ScratchBlocks.INPUT_VALUE, "ARG", "Boolean"),
        ];
        this.extendableDefs.unshift(
          createInput(
            ScratchBlocks.DUMMY_INPUT,
            "WORD",
            this.type === exId + "_extendAnd"
              ? Scratch.translate({
                  default: "and",
                  description:
                    'Text inserted between inputs on the extendable "and" block. Ideally should match vanilla Scratch\'s strings',
                })
              : Scratch.translate({
                  default: "or",
                  description:
                    'Text inserted between inputs on the extendable "or" block. Ideally should match vanilla Scratch\'s strings',
                })
          )
        );
        this.inputCount = 1;
      }
    });
    ScratchBlocks.Extensions.register("cst_extendable_branch", function () {
      this.extendableDefs = [
        createInput(ScratchBlocks.NEXT_STATEMENT, "SUBSTACK", null),
      ];
      this.inputCount = 1;
    });
    ScratchBlocks.Extensions.register("cst_extendable_if", function () {
      this.extendableDefsStart = [
        createInput(ScratchBlocks.INPUT_VALUE, "CONDITION", "Boolean"),
        createInput(ScratchBlocks.DUMMY_INPUT, "THEN_WORD", "then"),
        createInput(ScratchBlocks.NEXT_STATEMENT, "SUBSTACK", null),
      ];
      this.extendableDefs = [
        createInput(
          ScratchBlocks.DUMMY_INPUT,
          "ELSE_WORD",
          Scratch.translate({
            default: "else if",
            description:
              "Text inserted after a C input and before a boolean input on the extendable if blocks.",
          })
        ),
        createInput(ScratchBlocks.INPUT_VALUE, "CONDITION", "Boolean"),
        createInput(
          ScratchBlocks.DUMMY_INPUT,
          "THEN_WORD",
          Scratch.translate({
            default: "then",
            description:
              "Text inserted before a C input on the extendable if blocks. Ideally should match vanilla Scratch's strings",
          })
        ),
        createInput(ScratchBlocks.NEXT_STATEMENT, "SUBSTACK", null),
      ];
      this.inputCount = 0;
      this.minInputs = 0;
    });
    ScratchBlocks.Extensions.register("cst_extendable_if_else", function () {
      this.extendableDefsStart = [
        createInput(ScratchBlocks.INPUT_VALUE, "CONDITION", "Boolean"),
        createInput(
          ScratchBlocks.DUMMY_INPUT,
          "THEN_WORD",
          Scratch.translate({
            default: "then",
            description:
              "Text inserted before a C input on the extendable if blocks. Ideally should match vanilla Scratch's strings",
          })
        ),
        createInput(ScratchBlocks.NEXT_STATEMENT, "SUBSTACK", null),
        createInput(
          ScratchBlocks.DUMMY_INPUT,
          "ELSE_WORD",
          Scratch.translate({
            default: "else",
            description:
              "Text inserted before the last C input on the extendable if-else block. Ideally should match vanilla Scratch's strings",
          })
        ),
      ];
      this.extendableDefs = [
        createInput(ScratchBlocks.DUMMY_INPUT, "IF_WORD", "if"),
        createInput(ScratchBlocks.INPUT_VALUE, "CONDITION", "Boolean"),
        createInput(
          ScratchBlocks.DUMMY_INPUT,
          "THEN_WORD",
          Scratch.translate({
            default: "then",
            description:
              "Text inserted before a C input on the extendable if blocks. Ideally should match vanilla Scratch's strings",
          })
        ),
        createInput(ScratchBlocks.NEXT_STATEMENT, "SUBSTACK", null),
        createInput(
          ScratchBlocks.DUMMY_INPUT,
          "ELSE_WORD",
          Scratch.translate({
            default: "else",
            description:
              "Text inserted before the last C input on the extendable if-else block. Ideally should match vanilla Scratch's strings",
          })
        ),
      ];
      this.extendableDefsEnd = [
        createInput(ScratchBlocks.NEXT_STATEMENT, "SUBSTACK", null),
      ];
      this.inputCount = 0;
      this.minInputs = 0;
    });
    ScratchBlocks.Extensions.register("cst_extendable_switch", function () {
      this.extendableDefs = [
        createInput(
          ScratchBlocks.DUMMY_INPUT,
          "CASE_WORD",
          Scratch.translate({
            default: "case",
            description:
              "Text inserted between C and text inputs on the extendable switch block",
          })
        ),
        createInput(
          ScratchBlocks.INPUT_VALUE,
          "CASE_VALUE",
          null,
          "text",
          "TEXT",
          ""
        ),
        createInput(ScratchBlocks.NEXT_STATEMENT, "SUBSTACK", null),
      ];
      this.extendableDefsEnd = [
        createInput(
          ScratchBlocks.DUMMY_INPUT,
          "DEFAULT_WORD",
          Scratch.translate({
            default: "default",
            description:
              "Text inserted before the last C input on the extendable switch block",
          })
        ),
        createInput(ScratchBlocks.NEXT_STATEMENT, "SUBSTACK", null),
      ];
      this.inputCount = 1;
      this.minInputs = 0;
    });
    ScratchBlocks.Extensions.register("cst_extendable_joinwith", function () {
      this.extendableDefs = [
        createInput(
          ScratchBlocks.INPUT_VALUE,
          "ARG",
          null,
          "text",
          "TEXT",
          "word"
        ),
      ];
      this.extendableDefsEnd = [
        createInput(
          ScratchBlocks.DUMMY_INPUT,
          "WORD_WORD",
          Scratch.translate({
            default: "with",
            description:
              "Text inserted before the last input on the 'join (...) with []' block",
          })
        ),
        createInput(
          ScratchBlocks.INPUT_VALUE,
          "ARG",
          null,
          "text",
          "TEXT",
          "_"
        ),
      ];
      this.inputCount = 2;
      this.minInputs = 0;
    });

    // HACK: fixes the flyout, also with dynamic enable/disable addons
    const ogInitSvg = ScratchBlocks.BlockSvg.prototype.initSvg;
    ScratchBlocks.BlockSvg.prototype.initSvg = function () {
      if (this.getExtendableInput && !this.extendableUpdatedDisplay) {
        this.updateDisplay_();
      }
      return ogInitSvg.call(this);
    };
  }

  // https://github.com/LilyMakesThings/extensions/blob/5b9ce572683e403933cab3b23c4a9bbb2a08ecf9/extensions/Lily/Dictionaries.js#L37C1-L45
  if (!("scaffolding" in window)) {
    Scratch.vm.on("EXTENSION_ADDED", patchSB);
    Scratch.vm.on("BLOCKSINFO_UPDATE", patchSB);
  }

  // @ts-ignore
  Scratch.extensions.register(new ExtendableBlocks());
})(Scratch);
