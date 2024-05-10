// Name: Couplers
// ID: truefantomcouplers
// Description: A few adapter blocks.
// By: TrueFantom <https://scratch.mit.edu/users/TrueFantom/>
// License: MIT

((Scratch) => {
  "use strict";

  const icon =
    "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIyMjUuMzU0OCIgaGVpZ2h0PSIyMjUuMzU0OCIgdmlld0JveD0iMCwwLDIyNS4zNTQ4LDIyNS4zNTQ4Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTI3LjMyMjc0LC02Ny4zMjI2KSI+PGcgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aXNQYWludGluZ0xheWVyJnF1b3Q7OnRydWV9IiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMTI3LjMyMjc1LDE4MGMwLC02Mi4yMzAwMSA1MC40NDczOSwtMTEyLjY3NzQgMTEyLjY3NzQsLTExMi42Nzc0YzYyLjIzMDAxLDAgMTEyLjY3NzQsNTAuNDQ3MzkgMTEyLjY3NzQsMTEyLjY3NzRjMCw2Mi4yMzAwMSAtNTAuNDQ3MzksMTEyLjY3NzQgLTExMi42Nzc0LDExMi42Nzc0Yy02Mi4yMzAwMSwwIC0xMTIuNjc3NCwtNTAuNDQ3MzkgLTExMi42Nzc0LC0xMTIuNjc3NHoiIGZpbGw9IiM0MDQwNDAiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIwIi8+PGcgc3Ryb2tlPSIjZmZmZmZmIj48cGF0aCBkPSJNMTc2LjAzNzA3LDEzNy4wMTQyOGMwLC0xMS42OTU5NiA5LjQ4MTQ0LC0yMS4xNzc0IDIxLjE3NzQsLTIxLjE3NzRjMTEuNjk1OTYsMCAyMS4xNzc0LDkuNDgxNDQgMjEuMTc3NCwyMS4xNzc0YzAsMTEuNjk1OTYgLTkuNDgxNDQsMjEuMTc3NCAtMjEuMTc3NCwyMS4xNzc0Yy0xMS42OTU5NiwwIC0yMS4xNzc0LC05LjQ4MTQ0IC0yMS4xNzc0LC0yMS4xNzc0eiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIwIi8+PHBhdGggZD0iTTI2OC43NTEzNiwxMzAuMDcxNDJjMCwtMTEuNjk1OTYgOS40ODE0NCwtMjEuMTc3NCAyMS4xNzc0LC0yMS4xNzc0YzExLjY5NTk2LDAgMjEuMTc3NCw5LjQ4MTQ0IDIxLjE3NzQsMjEuMTc3NGMwLDExLjY5NTk2IC05LjQ4MTQ0LDIxLjE3NzQgLTIxLjE3NzQsMjEuMTc3NGMtMTEuNjk1OTYsMCAtMjEuMTc3NCwtOS40ODE0NCAtMjEuMTc3NCwtMjEuMTc3NHoiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMCIvPjxwYXRoIGQ9Ik0yNjEuNjA4NSwyMjIuNjQyODVjMCwtMTEuNjk1OTYgOS40ODE0NCwtMjEuMTc3NCAyMS4xNzc0LC0yMS4xNzc0YzExLjY5NTk2LDAgMjEuMTc3NCw5LjQ4MTQ0IDIxLjE3NzQsMjEuMTc3NGMwLDExLjY5NTk2IC05LjQ4MTQ0LDIxLjE3NzQgLTIxLjE3NzQsMjEuMTc3NGMtMTEuNjk1OTYsMCAtMjEuMTc3NCwtOS40ODE0NCAtMjEuMTc3NCwtMjEuMTc3NHoiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMCIvPjxwYXRoIGQ9Ik0xNjguODk0MjEsMjI5LjkyODU3YzAsLTExLjY5NTk2IDkuNDgxNDQsLTIxLjE3NzQgMjEuMTc3NCwtMjEuMTc3NGMxMS42OTU5NiwwIDIxLjE3NzQsOS40ODE0NCAyMS4xNzc0LDIxLjE3NzRjMCwxMS42OTU5NiAtOS40ODE0NCwyMS4xNzc0IC0yMS4xNzc0LDIxLjE3NzRjLTExLjY5NTk2LDAgLTIxLjE3NzQsLTkuNDgxNDQgLTIxLjE3NzQsLTIxLjE3NzR6IiBmaWxsPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjAiLz48cGF0aCBkPSJNMjA2LjQ0OTczLDIyMy42NDI2NWwtMTAuMDQ1NjUsLTkuODIzOTFsMjIuNTk1LC0yMy4xMDUwMWwxMC4wNDU2NSw5LjgyMzkxeiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIwIi8+PHBhdGggZD0iTTI3My42NjU3NSwxMzYuMDQ3MDZsMTAuMDQ1NjUsOS44MjM5MWwtMjIuNTk1LDIzLjEwNTAxbC0xMC4wNDU2NiwtOS44MjM5MXoiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMCIvPjxwYXRoIGQ9Ik0xOTkuNDI2NjIsMTQ5LjU3MDE4bDkuODIzOTEsLTEwLjA0NTY1bDIzLjEwNSwyMi41OTVsLTkuODIzOTEsMTAuMDQ1NjZ6IiBmaWxsPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjAiLz48cGF0aCBkPSJNMjgxLjE4ODg2LDIxMS4xMTk1M2wtOS44MjM5MSwxMC4wNDU2NmwtMjMuMTA1MDEsLTIyLjU5NWw5LjgyMzkxLC0xMC4wNDU2NnoiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMCIvPjxwYXRoIGQ9Ik0yMTguODIyNjEsMTgwYzAsLTExLjY5NTk2IDkuNDgxNDQsLTIxLjE3NzQgMjEuMTc3NCwtMjEuMTc3NGMxMS42OTU5NiwwIDIxLjE3NzQsOS40ODE0NCAyMS4xNzc0LDIxLjE3NzRjMCwxMS42OTU5NiAtOS40ODE0NCwyMS4xNzc0IC0yMS4xNzc0LDIxLjE3NzRjLTExLjY5NTk2LDAgLTIxLjE3NzQsLTkuNDgxNDQgLTIxLjE3NzQsLTIxLjE3NzR6IiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjE0Ii8+PC9nPjwvZz48L2c+PC9zdmc+PCEtLXJvdGF0aW9uQ2VudGVyOjExMi42NzcyNTU6MTEyLjY3NzQwNS0tPg==";

  const cast = Scratch.Cast;

  class Couplers {
    getInfo() {
      return {
        id: "truefantomcouplers",
        name: Scratch.translate("Couplers"),

        color1: "#404040",

        menuIconURI: icon,

        blocks: [
          {
            opcode: "value1_or_value2_block",
            blockType: Scratch.BlockType.REPORTER,
            text: "[BOOLEAN] ? [VALUE1] : [VALUE2]",
            arguments: {
              BOOLEAN: {
                type: Scratch.ArgumentType.BOOLEAN,
              },
              VALUE1: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "apple",
              },
              VALUE2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "banana",
              },
            },
            allowDropAnywhere: true,
          },
          {
            opcode: "boolean_block",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[MENU]",
            arguments: {
              MENU: {
                type: Scratch.ArgumentType.STRING,
                menu: "boolean_menu",
              },
            },
          },
          {
            opcode: "value_in_boolean_block",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[VALUE]",
            arguments: {
              VALUE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "apple",
              },
            },
          },
          {
            opcode: "value_in_string_block",
            blockType: Scratch.BlockType.REPORTER,
            text: "[VALUE]",
            arguments: {
              VALUE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "apple",
              },
            },
          },
          {
            opcode: "true_block",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("true"),
            hideFromPalette: true,
            disableMonitor: true,
          },
          {
            opcode: "false_block",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("false"),
            hideFromPalette: true,
            disableMonitor: true,
          },

          "---",

          {
            opcode: "color_block",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("color [COLOUR]"),
            arguments: {
              COLOUR: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#ff0000",
              },
            },
          },
          {
            opcode: "angle_block",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("angle [ANGLE]"),
            arguments: {
              ANGLE: {
                type: Scratch.ArgumentType.ANGLE,
                defaultValue: "90",
              },
            },
          },
          {
            opcode: "matrix_block",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("matrix [MATRIX]"),
            arguments: {
              MATRIX: {
                type: Scratch.ArgumentType.MATRIX,
                defaultValue: "0101001010000001000101110",
              },
            },
          },
          {
            opcode: "note_block",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("note [NOTE]"),
            arguments: {
              NOTE: {
                type: Scratch.ArgumentType.NOTE,
                defaultValue: "",
              },
            },
          },
        ],
        menus: {
          boolean_menu: {
            acceptReporters: true,
            items: ["true", "false", "random"],
          },
        },
      };
    }

    value1_or_value2_block({ BOOLEAN, VALUE1, VALUE2 }) {
      return cast.toBoolean(BOOLEAN) ? VALUE1 : VALUE2;
    }
    boolean_block({ MENU }) {
      const menu = cast.toString(MENU).toLowerCase();
      switch (menu) {
        case "true":
          return true;
        case "false":
          return false;
        case "random":
        default:
          return Math.random() < 0.5;
      }
    }
    value_in_boolean_block({ VALUE }) {
      return VALUE;
    }
    value_in_string_block({ VALUE }) {
      return VALUE;
    }
    true_block() {
      return true;
    }
    false_block() {
      return false;
    }
    color_block(args) {
      return args.COLOUR;
    }
    angle_block(args) {
      return args.ANGLE;
    }
    matrix_block(args) {
      return args.MATRIX;
    }
    note_block(args) {
      return args.NOTE;
    }
  }

  Scratch.extensions.register(new Couplers());
})(Scratch);
