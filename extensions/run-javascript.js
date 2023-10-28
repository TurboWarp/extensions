// Name: Run Javascript
// ID: js
// Description: Run JavaScript code with this simple extension. This extension is great for API's where it needs to be dynamic but is hard to do with available tools.
// By: bazztube <https://scratch.mit.edu/users/bazztube/>

(function (Scratch) {
  "use strict";

  const blocksIcon =
    "data:image/svg+xml;base64,PHN2ZyBpZD0iZWJ1WHhobkJUWUMxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgNDAgNDAiIHNoYXBlLXJlbmRlcmluZz0iZ2VvbWV0cmljUHJlY2lzaW9uIiB0ZXh0LXJlbmRlcmluZz0iZ2VvbWV0cmljUHJlY2lzaW9uIj48ZWxsaXBzZSByeD0iMTkuNTAwMTc2IiByeT0iMTkuNTAwMTU2IiB0cmFuc2Zvcm09Im1hdHJpeCguOTk5OTkxIDAgMCAwLjk5OTk5MiAyMCAyMCkiIGZpbGw9IiNmMGRiNGYiIHN0cm9rZT0iI2Q4YzE1NCIvPjxnIHRyYW5zZm9ybT0ibWF0cml4KC44NjY1NTQgMCAwIDAuODY2NTU0LTE0OC4yNTUzMzctMjM2LjgyOTY4OSkiPjxwYXRoIGQ9Ik0yODAuNTY1NDgxLDQ5Ny43Mzc2MjRxMS4wMDE2NTgsMi4xNTk0MzgsMi44MzEwMzMsMi4wNjI1NTdjMS44MjkzNzUtLjA5Njg4MSwyLjI5MDQzNy0uODMwNDA5LDIuMzIwMTgzLTEuODk2MXEuMDI5NzQ2LTEuMDY1NjkxLDAtMTQuNDY3MTk2aDQuMzI4NjV2MTQuNDY3MTk2cS0uMjkwMzgsMi4wOTMyMTYtLjY1ODg0OCwyLjcxMzY2NWMtLjM2ODQ2Ny42MjA0NDktMS42OTkyODksMi4wNTcyNzgtMi42ODQ1NDYsMi4zMzQ4NDdzLTMuODI5Njg1LjczNDc0Mi00Ljk4MzA3OS4zNDI4OC0yLjI1NjkxOC0uNjc5MzE2LTIuOTUyNzktMS4zOTI3MTctLjkzMTc2MS0uODY3MDU3LTEuMjg1NTk0LTEuNDM3Nzc4cS0uMzUzODMzLS41NzA3MjEtLjQzNTE0My0uNzA3OTE5bDMuNTIwMTM0LTIuMDE5NDM1WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTk2LjYxMjI3My0xOTcuMDYxNjkyKSIgZmlsbD0iIzMyMzMzMCIgc3Ryb2tlLXdpZHRoPSIyLjEwNCIvPjxwYXRoIGQ9Ik02MjUuOTM0NDMsNDkzLjY1NjY5N2wzLjAxNjYwNy0xLjkwODQ3OXExLjMyMjQxLDIuNDkyMDY2LDMuNzM3OTI0LDIuNDQwMjI0dDIuNTExNzUtMS44MzUxOTNxLjE4NzMxMi0xLjY1MDM2LTMuMTEzMDI2LTMuMDIyNzUzYy0zLjMwMDMzOC0xLjM3MjM5NC00LjgzNTIyMS0yLjk1MDI0MS01LjA0MDI5OC02LjA5ODc0czIuMTgyOTM2LTUuNjUzNDQxLDUuNTMzNjUtNS41NTU0MzFxMy4zNTA3MTQuMDk4MDEsNC40NDIzNSwyLjAwOTE5OGwuNzk1ODI4LDEuMTk3MTExLTIuODg4OTEsMi4wMDk2NTJxLS45ODg0NTctMS44MDU3My0yLjM1ODg1MS0xLjc1OTIyOGMtMS4zNzAzOTQuMDQ2NTAyLTEuODY2NzU3Ljk3NjU0OC0xLjg2Njc1NywxLjkyOTg0NHMuOTAwOTksMS41NzkzNDgsMy4xMjEzMDksMi43MTI0NzFzNS40MzM5MzksMi42MTI0NzcsNS4wODMzNjIsNi41MTU0NTQtMi43NzUzOTksNS40MTM4MDctNS45NTk4MDQsNS4zODIzMzEtNS4zODI3MTItLjkxOTQyOS03LjAxNTEzNS00LjAxNjQ2WiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTQzMS4wMzY4MjItMTkxLjI5ODQ1MikiIGZpbGw9IiMzMjMzMzAiIHN0cm9rZS13aWR0aD0iMi4xMDQiLz48L2c+PC9zdmc+DQo=";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error(
      "It is necessary to run this extension unsanboxed in order to execute Javascript code."
    );
  }
  class js {
    getInfo() {
      return {
        id: "js",
        name: "Run Javascript",
        menuIconURI: blocksIcon,
        color1: "#EDB73B",
        color2: "#EDB73B",
        color3: "#F0DC4E",
        blocks: [
          {
            opcode: "run",
            blockType: Scratch.BlockType.COMMAND,
            text: "Run js code: [CODE]",
            arguments: {
              CODE: {
                type: Scratch.ArgumentType.STRING,
              },
            },
          },
        ],
      };
    }

    run(args) {
      const code = args.CODE;
      eval(code);
    }
  }
  Scratch.extensions.register(new js());
})(Scratch);
