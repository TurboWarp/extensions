// Name: Controls Plus
// ID: cubesterControlsPlus
// Description: An expansion of the Controls Category.
// By: CubesterYT <https://scratch.mit.edu/users/CubesterYT/>

// Version V.1.0.0

(function (Scratch) {
  "use strict";

  const icon =
    "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI5OS42MTQ1OSIgaGVpZ2h0PSI5OS42MTQ1OSIgdmlld0JveD0iMCwwLDk5LjYxNDU5LDk5LjYxNDU5Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTkwLjE5MjcxLC0xMzAuMTkyNzEpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0xOTIuNjkyNzEsMTgwYzAsLTI2LjEyNzEgMjEuMTgwMTksLTQ3LjMwNzI5IDQ3LjMwNzI5LC00Ny4zMDcyOWMyNi4xMjcxLDAgNDcuMzA3MjksMjEuMTgwMTkgNDcuMzA3MjksNDcuMzA3MjljMCwyNi4xMjcxIC0yMS4xODAxOSw0Ny4zMDcyOSAtNDcuMzA3MjksNDcuMzA3MjljLTI2LjEyNzEsMCAtNDcuMzA3MjksLTIxLjE4MDE5IC00Ny4zMDcyOSwtNDcuMzA3Mjl6IiBmaWxsPSIjZmZhYjE5IiBzdHJva2U9IiNjZjhiMTciIHN0cm9rZS13aWR0aD0iNSIvPjxwYXRoIGQ9Ik0yNzIuMDY3MzksMTc2LjQ0NzEyYzAsMTMuNjE5NjkgLTExLjA0MDk2LDI0LjY2MDY2IC0yNC42NjA2NSwyNC42NjA2NmgtMjEuMTM3N2MtMTMuNjE5NjksMCAtMjQuNjYwNjYsLTExLjA0MDk2IC0yNC42NjA2NiwtMjQuNjYwNjZjMCwtMTMuNjE5NjkgMTEuMDQwOTYsLTI0LjY2MDY2IDI0LjY2MDY2LC0yNC42NjA2NmgyMS4xMzc3YzEzLjYxOTY5LDAgMjQuNjYwNjUsMTEuMDQwOTYgMjQuNjYwNjUsMjQuNjYwNjZ6TTI2NS4wMjUsMTc2LjQ0NzEyYzAuMDAwOTUsLTkuNzI5MzMgLTcuODg1NDMsLTE3LjYxNzMyIC0xNy42MTQ3NiwtMTcuNjE4MjhjLTkuNzI5MzMsLTAuMDAwOTUgLTE3LjYxNzMyLDcuODg1NDMgLTE3LjYxODI4LDE3LjYxNDc2Yy0wLjAwMDk1LDkuNzI5MzMgNy44ODU0MywxNy42MTczMiAxNy42MTQ3NiwxNy42MTgyOGM5LjcyOTMzLDAuMDAwOTUgMTcuNjE3MzIsLTcuODg1NDMgMTcuNjE4MjgsLTE3LjYxNDc2eiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiLz48Zz48cGF0aCBkPSJNMjU3LjYzNjc4LDIwMi42MTQ0NWMwLC00LjMyNDEgMCwtMTkuODU2MDUgMCwtMTkuODU2MDVjMCwtMi43ODM2NSAyLjI1NjYsLTUuMDQwMjUgNS4wNDAyNSwtNS4wNDAyNWgwLjMzNjAxYzIuNzgzNjUsMCA1LjA0MDI1LDIuMjU2NiA1LjA0MDI1LDUuMDQwMjVjMCwwIDAsMTQuMDY2MzMgMCwxOC41NDUxNmMwLDIuNTQ0MTcgLTEwLjQxNjUyLDMuNDA4NjUgLTEwLjQxNjUyLDEuMzEwOXoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmYWIxOSIgc3Ryb2tlLXdpZHRoPSI3LjUiLz48cGF0aCBkPSJNMjQ1LjU0MDE5LDE5NC44NTVjMCwtMi43ODM2NSAyLjI1NjYsLTUuMDQwMjUgNS4wNDAyNSwtNS4wNDAyNWgyNy4zNzg1M2MwLDAgMS4xNTI5NCwxLjg1MTYxIC0wLjMwNTMzLDMuOTkzNWMtMi4wMDA1MiwyLjkzODM1IC02LjkyOTAxLDYuNDIzMDEgLTguMzcwOTcsNi40MjMwMWMtNC40NjY0MiwwIC0xOC43MDIyNCwwIC0xOC43MDIyNCwwYy0yLjc4MzY1LDAgLTUuMDQwMjUsLTIuMjU2NiAtNS4wNDAyNSwtNS4wNDAyNXoiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmYWIxOSIgc3Ryb2tlLXdpZHRoPSI3LjUiLz48cGF0aCBkPSJNMjQ3LjY5NjMsMTk0LjkxMjI4YzAsLTEuODM0NzEgMS40ODczMywtMy4zMjIwNCAzLjMyMjA1LC0zLjMyMjA0aDIzLjY4MTQyYzEuODM0NzEsMCAzLjMyMjA1LDEuNDg3MzMgMy4zMjIwNSwzLjMyMjA0djAuMjIxNDdjMCwxLjgzNDcxIC0xLjQ4NzMzLDMuMzIyMDUgLTMuMzIyMDUsMy4zMjIwNWgtMjMuNjgxNDJjLTEuODM0NzEsMCAtMy4zMjIwNSwtMS40ODczMyAtMy4zMjIwNSwtMy4zMjIwNXoiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIyIi8+PHBhdGggZD0iTTI2Mi45Njk3OCwxNzkuODYwMjVjMS44MzQ3MSwwIDMuMzIyMDQsMS40ODczMyAzLjMyMjA0LDMuMzIyMDR2MjMuNjgxNDJjMCwxLjgzNDcxIC0xLjQ4NzMzLDMuMzIyMDUgLTMuMzIyMDQsMy4zMjIwNWgtMC4yMjE0N2MtMS44MzQ3MSwwIC0zLjMyMjA1LC0xLjQ4NzMzIC0zLjMyMjA0LC0zLjMyMjA1YzAsMCAwLC0xMy4zNTUgMCwtMTcuNTk0OThjMCwtMi40MDAyMSAwLC02LjA4NjQyIDAsLTYuMDg2NDJjMCwtMS44MzQ3MSAxLjQ4NzMzLC0zLjMyMjA0IDMuMzIyMDUsLTMuMzIyMDV6IiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMiIvPjwvZz48L2c+PC9nPjwvc3ZnPjwhLS1yb3RhdGlvbkNlbnRlcjo0OS44MDcyODk2ODI1Mzk3OTo0OS44MDcyODk2ODI1Mzk3My0tPg==";

  const greenFlag =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAABFFBMVEUAAACAgABVqlVJkklAn0BNmTNLljxGlzpDmzdFmjpGmzxHmz9Fmj1FmT5Emj1GmT1GmD1EmDxGmTxEmT1GmjxGmT1FmDxEmT5EmTxGmT5FmD1GmT5FmT1Gmj1EmT5FmT1FmT1FmDxGmT1FmjxLs09LtE9Jr0xJsk1Js05JtVBKtU5KtVBKtlBJrkpJsE1KtlFIrEpIsExLt1FLuFJKuVNIqkhLulNIp0VJqkhKtlJLvVRMvFNFmT5GpUVFmT1HpEVHokNMvlVFmT1Ho0NFmTxLvlVGoUFMvlVLvlVGn0BFmT1Nv1ZEmz5FmTxFmTxFmT1NvlZFmz9FmT5FnT9FnD5GnT9Mv1ZMv1ZMv1ZFmT1Mv1b////70P2GAAAAWXRSTlMAAgMHCAoRFhcwMz0/RkdQVGFmaWpxcnh7gIGEhZKZo6eprLq/v8DAwMDAwMDBwcHCwsPDxcbIysrLzM3Pz9DQ1NTV1dfZ29vg4uXm5+jp6ens7fDx9Pv8/nPb5aAAAAABYktHRFt0vJU0AAAAsUlEQVQoz2NgwA3YhNiwS4hHykoou9goCrKiSUhGhqhZe7gbm3rxQwQ4BJihEupRYODooMDFyMAu6uMsgyoRFW5kHxjkqeuhL4cmAQM4JXRwSWjjktDEJaGFS0IVIeFtZuIaAZdQgUmY2/oqyTu5WcEkNGAS/kJMQJrbySAAJBxmGSoIlYAoYGCR8rPVM7QItuNlQJVgYGDlE5MU5kSErhz2+KCihEikNHYJJh5mBhIAADBcR/r5OJzCAAAAAElFTkSuQmCC";

  function outsideID(target, start) {
    let outsideTarget = target.blocks._blocks[start];
    while (
      outsideTarget.parent != null &&
      target.blocks._blocks[outsideTarget.parent].next
    ) {
      outsideTarget = target.blocks._blocks[outsideTarget.parent];
    }
    if (outsideTarget.parent) {
      outsideTarget = target.blocks._blocks[outsideTarget.parent];
    }
    return outsideTarget;
  }

  class ControlsPlus {
    getInfo() {
      return {
        id: "cubesterControlsPlus",
        name: "Controls+",
        color1: "#FFAB19",
        color2: "#CF8B17",
        menuIconURI: icon,
        docsURI: "https://extensions.turbowarp.org/CubesterYT/ControlsPlus",

        blocks: [
          {
            opcode: "waitFrames",
            text: "wait [FRAMES] frames",
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              FRAMES: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
            },
          },
          {
            opcode: "waitSecondsOrUntil",
            text: "wait [SECONDS] seconds or until [CONDITIONAL]",
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              SECONDS: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
              CONDITIONAL: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
            },
          },
          {
            opcode: "waitFramesOrUntil",
            text: "wait [FRAMES] frames or until [CONDITIONAL]",
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              FRAMES: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
              CONDITIONAL: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
            },
          },

          "---",

          {
            opcode: "repeatSeconds",
            text: "repeat for [SECONDS] seconds",
            blockType: Scratch.BlockType.LOOP,
            arguments: {
              SECONDS: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
            },
          },
          {
            opcode: "repeatOrUntilTrue",
            text: "repeat [TIMES] or until [CONDITIONAL]",
            blockType: Scratch.BlockType.LOOP,
            arguments: {
              TIMES: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 10,
              },
              CONDITIONAL: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
            },
          },
          {
            opcode: "foreverIf",
            text: "forever if [CONDITIONAL]",
            blockType: Scratch.BlockType.LOOP,
            isTerminal: true,
            arguments: {
              CONDITIONAL: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
            },
          },
          {
            opcode: "foreverIfElse",
            text: ["forever if [CONDITIONAL]", "else"],
            blockType: Scratch.BlockType.LOOP,
            branchCount: 2,
            isTerminal: true,
            arguments: {
              CONDITIONAL: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
            },
          },

          "---",

          {
            opcode: "ifElseIf",
            text: ["if [CONDITION1] then", "else if [CONDITION2] then"],
            blockType: Scratch.BlockType.CONDITIONAL,
            branchCount: 2,
            arguments: {
              CONDITION1: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
              CONDITION2: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
            },
          },
          {
            opcode: "ifElseIfElse",
            text: ["if [CONDITION1] then", "else if [CONDITION2] then", "else"],
            blockType: Scratch.BlockType.CONDITIONAL,
            branchCount: 3,
            arguments: {
              CONDITION1: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
              CONDITION2: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
            },
          },
          {
            opcode: "ifElseReporter",
            text: "if [CONDITIONAL] then [VALUE1] else [VALUE2]",
            blockType: Scratch.BlockType.REPORTER,
            arguments: {
              CONDITIONAL: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
              VALUE1: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "foo",
              },
              VALUE2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "bar",
              },
            },
          },

          "---",

          {
            opcode: "switch",
            text: "switch [CASE]",
            blockType: Scratch.BlockType.CONDITIONAL,
            arguments: {
              CASE: {
                type: Scratch.ArgumentType.STRING,
              },
            },
          },
          {
            opcode: "case",
            text: "case [CASE]",
            blockType: Scratch.BlockType.CONDITIONAL,
            arguments: {
              CASE: {
                type: Scratch.ArgumentType.STRING,
              },
            },
          },
          {
            opcode: "nextCase",
            text: "run next case",
            isTerminal: true,
            blockType: Scratch.BlockType.COMMAND,
          },
          {
            opcode: "executeCase",
            text: "execute case [CASE]",
            blockType: Scratch.BlockType.COMMAND,
            isTerminal: true,
            arguments: {
              CASE: {
                type: Scratch.ArgumentType.STRING,
              },
            },
          },
          {
            opcode: "nextCaseWhen",
            text: "run next case when [CASE]",
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              CASE: {
                type: Scratch.ArgumentType.STRING,
              },
            },
          },
          {
            opcode: "default",
            text: "default",
            blockType: Scratch.BlockType.CONDITIONAL,
            isTerminal: true,
          },

          "---",

          {
            opcode: "forEachFrom",
            text: "for each [VARIABLE] in [TIMES] starting from [VALUE]",
            blockType: Scratch.BlockType.LOOP,
            arguments: {
              VARIABLE: {
                type: Scratch.ArgumentType.STRING,
                menu: "VARIABLES",
              },
              TIMES: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 10,
              },
              VALUE: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 5,
              },
            },
          },

          "---",

          {
            opcode: "newThread",
            text: "start in new thread",
            blockType: Scratch.BlockType.CONDITIONAL,
          },

          "---",

          {
            opcode: "startStop",
            text: ["if [CONDITION1] then", "stop if [CONDITION2]"],
            blockType: Scratch.BlockType.LOOP,
            arguments: {
              CONDITION1: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
              CONDITION2: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
            },
          },

          "---",

          {
            opcode: "randomBranch",
            text: ["choose random between this", "or this"],
            blockType: Scratch.BlockType.CONDITIONAL,
            branchCount: 2,
          },
          {
            opcode: "chanceBranch",
            text: ["try a [CHANCE]% chance to run this", "else"],
            blockType: Scratch.BlockType.CONDITIONAL,
            branchCount: 2,
            arguments: {
              CHANCE: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 75,
              },
            },
          },

          "---",

          {
            blockType: Scratch.BlockType.XML,
            xml: '<block type="control_get_counter"/>',
          },
          {
            blockType: Scratch.BlockType.XML,
            xml: '<block type="control_incr_counter"/>',
          },
          {
            blockType: Scratch.BlockType.XML,
            xml: '<block type="control_clear_counter"/>',
          },

          "---",

          {
            opcode: "runGreenFlag",
            text: "run [FLAG]",
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              FLAG: {
                type: Scratch.ArgumentType.IMAGE,
                dataURI: greenFlag,
              },
            },
          },
          {
            opcode: "stopTarget",
            text: "stop [TARGET]",
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              TARGET: {
                type: Scratch.ArgumentType.STRING,
                menu: "TARGETS",
              },
            },
          },
          {
            opcode: "stopTargetsExcept",
            text: "stop all targets except [TARGET]",
            blockType: Scratch.BlockType.COMMAND,
            isTerminal: true,
            arguments: {
              TARGET: {
                type: Scratch.ArgumentType.STRING,
                menu: "TARGETS",
              },
            },
          },
        ],
        menus: {
          TARGETS: {
            acceptReporters: true,
            items: "getTargets",
          },
          VARIABLES: {
            acceptReporters: false,
            items: "getVariables",
          },
        },
      };
    }

    waitFrames(args, util) {
      args.FRAMES = Math.round(args.FRAMES);
      if (typeof util.stackFrame.loopCounter === "undefined") {
        util.stackFrame.loopCounter = args.FRAMES;
      }
      util.stackFrame.loopCounter--;
      if (util.stackFrame.loopCounter >= 0) {
        util.yieldTick();
      }
    }
    waitSecondsOrUntil(args, util) {
      args.CONDITIONAL = Scratch.Cast.toBoolean(args.CONDITIONAL);
      if (!args.CONDITIONAL) {
        if (util.stackTimerNeedsInit()) {
          args.SECONDS = Math.max(0, 1000 * args.SECONDS);
          util.startStackTimer(args.SECONDS);
          Scratch.vm.runtime.requestRedraw();
          util.yield();
        } else if (!util.stackTimerFinished()) {
          util.yield();
        }
      }
    }
    waitFramesOrUntil(args, util) {
      args.CONDITIONAL = Scratch.Cast.toBoolean(args.CONDITIONAL);
      if (!args.CONDITIONAL) {
        args.FRAMES = Math.round(args.FRAMES);
        if (typeof util.stackFrame.loopCounter === "undefined") {
          util.stackFrame.loopCounter = args.FRAMES;
        }
        util.stackFrame.loopCounter--;
        if (util.stackFrame.loopCounter >= 0) {
          util.yieldTick();
        }
      }
    }
    repeatSeconds(args, util) {
      if (util.stackTimerNeedsInit()) {
        args.SECONDS = Math.max(0, 1000 * args.SECONDS);
        util.startStackTimer(args.SECONDS);
        Scratch.vm.runtime.requestRedraw();
        util.startBranch(1, true);
      } else if (!util.stackTimerFinished()) {
        util.startBranch(1, true);
      }
    }
    repeatOrUntilTrue(args, util) {
      args.CONDITIONAL = Scratch.Cast.toBoolean(args.CONDITIONAL);
      if (!args.CONDITIONAL) {
        if (typeof util.stackFrame.loopCounter === "undefined") {
          util.stackFrame.loopCounter = Math.round(args.TIMES);
        }
        util.stackFrame.loopCounter--;
        if (util.stackFrame.loopCounter >= 0) {
          util.startBranch(1, true);
        }
      }
    }
    foreverIf(args, util) {
      args.CONDITIONAL = Scratch.Cast.toBoolean(args.CONDITIONAL);
      if (args.CONDITIONAL) {
        util.startBranch(1, true);
      }
    }
    foreverIfElse(args, util) {
      args.CONDITIONAL = Scratch.Cast.toBoolean(args.CONDITIONAL);
      if (args.CONDITIONAL) {
        util.startBranch(1, true);
      } else {
        util.startBranch(2, true);
      }
    }
    ifElseIf(args, util) {
      if (args.CONDITION1) {
        util.startBranch(1, false);
      } else if (args.CONDITION2) {
        util.startBranch(2, false);
      }
    }
    ifElseIfElse(args, util) {
      if (args.CONDITION1) {
        util.startBranch(1, false);
      } else if (args.CONDITION2) {
        util.startBranch(2, false);
      } else {
        util.startBranch(3, false);
      }
    }
    ifElseReporter(args) {
      return args.CONDITIONAL ? args.VALUE1 : args.VALUE2;
    }
    switch(args, util) {
      args.CASE = Scratch.Cast.toString(args.CASE);
      let getSwitch = util.target.blocks._blocks[util.thread.peekStack()];
      getSwitch.caseData = args.CASE;
      getSwitch.runCase = false;
      getSwitch.nextCase = false;
      getSwitch.execute = {
        requested: false,
        case: null,
      };
      util.target.blocks._blocks[util.thread.peekStack()] = getSwitch;
      util.startBranch(1, false);
    }
    case(args, util) {
      args.CASE = Scratch.Cast.toString(args.CASE);
      let outside = outsideID(util.target, util.thread.peekStack());
      if (outside.opcode != "cubesterControlsPlus_switch") {
        return;
      }
      if (
        outside.caseData == args.CASE ||
        outside.nextCase ||
        (outside.execute.requested && outside.execute.case == args.CASE)
      ) {
        outside.runCase = true;
        if (outside.nextCase) {
          outside.nextCase = false;
        } else if (
          outside.execute.requested &&
          outside.execute.case == args.CASE
        ) {
          outside.execute.requested = false;
          outside.execute.case = null;
        }
        util.target.blocks._blocks[outside.id] = outside;
        util.startBranch(1, false);
      }
      return;
    }
    nextCase(args, util) {
      let outside = outsideID(util.target, util.thread.peekStack());
      if (outside.opcode != "cubesterControlsPlus_switch") {
        return;
      }
      outside.nextCase = true;
      util.target.blocks._blocks[outside.id] = outside;
      return;
    }
    executeCase(args, util) {
      args.CASE = Scratch.Cast.toString(args.CASE);
      let outside = outsideID(util.target, util.thread.peekStack());
      if (outside.opcode != "cubesterControlsPlus_switch") {
        return;
      }
      outside.execute.requested = true;
      outside.execute.case = args.CASE;
      util.target.blocks._blocks[outside.id] = outside;
      return;
    }
    nextCaseWhen(args, util) {
      args.CASE = Scratch.Cast.toString(args.CASE);
      let outside = outsideID(util.target, util.thread.peekStack());
      if (outside.opcode != "cubesterControlsPlus_switch") {
        return;
      }
      if (outside.caseData == args.CASE) {
        outside.nextCase = true;
        util.target.blocks._blocks[outside.id] = outside;
      }
      return;
    }
    default(args, util) {
      let getDefault = util.target.blocks._blocks[util.thread.peekStack()];
      let outside = outsideID(util.target, util.thread.peekStack());
      if (
        outside.opcode != "cubesterControlsPlus_switch" ||
        outside.runCase ||
        getDefault.next
      ) {
        return;
      }
      util.startBranch(1, false);
    }
    forEachFrom(args, util) {
      args.VARIABLE = util.target.lookupOrCreateVariable(
        args.VARIABLE,
        args.VARIABLE
      );
      if (typeof util.stackFrame.index === "undefined") {
        util.stackFrame.index = args.VALUE;
      }
      if (util.stackFrame.index < args.TIMES + args.VALUE) {
        util.stackFrame.index++;
        args.VARIABLE.value = util.stackFrame.index;
        util.startBranch(1, true);
      }
    }
    newThread(args, util) {
      if (util.thread.target.blocks.getBranch(util.thread.peekStack(), 0)) {
        util.sequencer.runtime._pushThread(
          util.thread.target.blocks.getBranch(util.thread.peekStack(), 0),
          util.target,
          {}
        );
      }
    }
    startStop(args, util) {
      args.CONDITION1 = Scratch.Cast.toBoolean(args.CONDITION1);
      args.CONDITION2 = Scratch.Cast.toBoolean(args.CONDITION2);
      if (typeof util.stackFrame.index === "undefined")
        util.stackFrame.index = 0;
      if (!args.CONDITION1 && util.stackFrame.index === 0) {
        return;
      } else {
        if (!args.CONDITION2) {
          util.stackFrame.index = 1;
          util.startBranch(1, true);
        } else {
          util.stackFrame.index = 0;
          return;
        }
      }
    }
    randomBranch(args, util) {
      util.startBranch(Math.random() < 0.5 ? 1 : 2, false);
    }
    chanceBranch(args, util) {
      util.startBranch(Math.random() < args.CHANCE / 100 ? 1 : 2, false);
    }
    runGreenFlag() {
      Scratch.vm.runtime.greenFlag();
    }
    stopTarget(args) {
      let target;
      if (args.TARGET === "Stage") {
        target = Scratch.vm.runtime.getTargetForStage();
      } else {
        target = Scratch.vm.runtime.getSpriteTargetByName(args.TARGET);
      }
      if (!target) {
        return;
      }
      Scratch.vm.runtime.stopForTarget(target);
    }
    stopTargetsExcept(args) {
      let exception;
      if (args.TARGET === "Stage") {
        exception = Scratch.vm.runtime.getTargetForStage();
      } else {
        exception = Scratch.vm.runtime.getSpriteTargetByName(args.TARGET);
      }
      if (!exception) {
        return;
      }
      for (const target of Scratch.vm.runtime.targets) {
        if (target !== exception) {
          Scratch.vm.runtime.stopForTarget(target);
        }
      }
    }

    // Backend Utilities

    getTargets() {
      const spriteNames = [];
      for (let index = 0; index < Scratch.vm.runtime.targets.length; index++) {
        if (Scratch.vm.runtime.targets[index].isOriginal) {
          spriteNames.push(Scratch.vm.runtime.targets[index].getName());
        }
      }
      if (spriteNames.length > 0) {
        return spriteNames;
      } else {
        return [""];
      }
    }
    getVariables() {
      const variables =
        typeof Blockly === "undefined"
          ? []
          : Blockly.getMainWorkspace()
              .getVariableMap()
              .getVariablesOfType("")
              .map((model) => ({
                text: model.name,
                value: model.getId(),
              }));
      if (variables.length > 0) {
        return variables;
      } else {
        return [""];
      }
    }
  }

  Scratch.extensions.register(new ControlsPlus());
})(Scratch);
