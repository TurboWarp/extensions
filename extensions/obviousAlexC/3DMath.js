// Name: 3D Math
// ID: obviousAlexCMath3d
// Description: Math for 3D projects.
// By: ObviousAlexC <https://scratch.mit.edu/users/pinksheep2917/>

(function (Scratch) {
  "use strict";
  const vm = Scratch.vm;

  const spriteData = {};
  let fov = 300;

  const d2r = 0.0174533;

  const camera = {
    position: [0, 0, 0],
    rotation: [0, 0, 0],
  };

  class extension {
    getInfo() {
      return {
        blocks: [
          {
            opcode: "__NOUSEOPCODE",
            blockType: Scratch.BlockType.LABEL,
            text: "Vector 3",
          },
          {
            disableMonitor: true,
            opcode: "newV3",
            blockType: Scratch.BlockType.REPORTER,
            text: "vector 3 x:[x] y:[y] z:[z]",
            arguments: {
              x: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              z: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            },
          },
          {
            disableMonitor: true,
            opcode: "newV3fromValue",
            blockType: Scratch.BlockType.REPORTER,
            text: "vector 3 from [value]",
            arguments: {
              value: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            },
          },
          {
            disableMonitor: true,
            opcode: "getAxisOfV3",
            blockType: Scratch.BlockType.REPORTER,
            text: "get the [axis] axis of [vector]",
            arguments: {
              axis: { type: Scratch.ArgumentType.STRING, menu: "axisMenu" },
              vector: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "[0,0,0]",
              },
            },
          },
          {
            opcode: "__NOUSEOPCODE",
            blockType: Scratch.BlockType.LABEL,
            text: "Equations",
          },
          {
            disableMonitor: true,
            opcode: "addV3",
            blockType: Scratch.BlockType.REPORTER,
            text: "V3: [a] + [b]",
            arguments: {
              a: { type: Scratch.ArgumentType.STRING, defaultValue: "[0,0,0]" },
              b: { type: Scratch.ArgumentType.STRING, defaultValue: "[0,0,0]" },
            },
          },
          {
            disableMonitor: true,
            opcode: "subV3",
            blockType: Scratch.BlockType.REPORTER,
            text: "V3: [a] - [b]",
            arguments: {
              a: { type: Scratch.ArgumentType.STRING, defaultValue: "[0,0,0]" },
              b: { type: Scratch.ArgumentType.STRING, defaultValue: "[0,0,0]" },
            },
          },
          {
            disableMonitor: true,
            opcode: "mulV3",
            blockType: Scratch.BlockType.REPORTER,
            text: "V3: [a] * [b]",
            arguments: {
              a: { type: Scratch.ArgumentType.STRING, defaultValue: "[0,0,0]" },
              b: { type: Scratch.ArgumentType.STRING, defaultValue: "[0,0,0]" },
            },
          },
          {
            disableMonitor: true,
            opcode: "divV3",
            blockType: Scratch.BlockType.REPORTER,
            text: "V3: [a] / [b]",
            arguments: {
              a: { type: Scratch.ArgumentType.STRING, defaultValue: "[0,0,0]" },
              b: { type: Scratch.ArgumentType.STRING, defaultValue: "[0,0,0]" },
            },
          },
          {
            disableMonitor: true,
            opcode: "dotProductOfV3",
            blockType: Scratch.BlockType.REPORTER,
            text: "V3: dot product between [a] and [b]",
            arguments: {
              a: { type: Scratch.ArgumentType.STRING, defaultValue: "[0,0,0]" },
              b: { type: Scratch.ArgumentType.STRING, defaultValue: "[0,0,0]" },
            },
          },
          {
            disableMonitor: true,
            opcode: "crossProductOfV3",
            blockType: Scratch.BlockType.REPORTER,
            text: "V3: cross product between [a] and [b]",
            arguments: {
              a: { type: Scratch.ArgumentType.STRING, defaultValue: "[0,0,0]" },
              b: { type: Scratch.ArgumentType.STRING, defaultValue: "[0,0,0]" },
            },
          },
          {
            disableMonitor: true,
            opcode: "magnitudeV3",
            blockType: Scratch.BlockType.REPORTER,
            text: "V3: magnitude of [a]",
            arguments: {
              a: { type: Scratch.ArgumentType.STRING, defaultValue: "[0,0,0]" },
            },
          },
          {
            disableMonitor: true,
            opcode: "distanceV3",
            blockType: Scratch.BlockType.REPORTER,
            text: "V3: distance between [a] and [b]",
            arguments: {
              a: { type: Scratch.ArgumentType.STRING, defaultValue: "[0,0,0]" },
              b: { type: Scratch.ArgumentType.STRING, defaultValue: "[0,0,0]" },
            },
          },
          {
            disableMonitor: true,
            opcode: "rotateAroundPointV3",
            blockType: Scratch.BlockType.REPORTER,
            text: "V3: rotate [a] around [b] by yaw:[yaw] pitch:[pitch], and roll:[roll]",
            arguments: {
              a: { type: Scratch.ArgumentType.STRING, defaultValue: "[0,0,0]" },
              b: { type: Scratch.ArgumentType.STRING, defaultValue: "[0,0,0]" },
              yaw: { type: Scratch.ArgumentType.STRING, defaultValue: "0" },
              pitch: { type: Scratch.ArgumentType.STRING, defaultValue: "0" },
              roll: { type: Scratch.ArgumentType.STRING, defaultValue: "0" },
            },
          },
          {
            disableMonitor: true,
            opcode: "rotateAroundCenterV3",
            blockType: Scratch.BlockType.REPORTER,
            text: "V3: rotate [a] around the center by yaw:[yaw] pitch:[pitch], and roll:[roll]",
            arguments: {
              a: { type: Scratch.ArgumentType.STRING, defaultValue: "[0,0,0]" },
              yaw: { type: Scratch.ArgumentType.STRING, defaultValue: "0" },
              pitch: { type: Scratch.ArgumentType.STRING, defaultValue: "0" },
              roll: { type: Scratch.ArgumentType.STRING, defaultValue: "0" },
            },
          },
          {
            opcode: "__NOUSEOPCODE",
            blockType: Scratch.BlockType.LABEL,
            text: "Vector 2",
          },
          {
            disableMonitor: true,
            opcode: "newV2",
            blockType: Scratch.BlockType.REPORTER,
            text: "vector 2 x:[x] y:[y]",
            arguments: {
              x: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            },
          },
          {
            disableMonitor: true,
            opcode: "newV2fromValue",
            blockType: Scratch.BlockType.REPORTER,
            text: "vector 2 from [value]",
            arguments: {
              value: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            },
          },
          {
            disableMonitor: true,
            opcode: "getAxisOfV2",
            blockType: Scratch.BlockType.REPORTER,
            text: "V2: get the [axis] axis of [vector]",
            arguments: {
              axis: { type: Scratch.ArgumentType.STRING, menu: "axisMenu2D" },
              vector: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "[0,0]",
              },
            },
          },
          {
            disableMonitor: true,
            opcode: "project2DFromCam",
            blockType: Scratch.BlockType.REPORTER,
            text: "get projected [a] to 2D from camera",
            arguments: {
              a: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "[0,0,100]",
              },
            },
          },
          {
            disableMonitor: true,
            opcode: "project2DFromPos",
            blockType: Scratch.BlockType.REPORTER,
            text: "get projected [a] to 2D from [b] yaw:[yaw] pitch:[pitch] roll:[roll]",
            arguments: {
              a: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "[0,0,100]",
              },
              b: { type: Scratch.ArgumentType.STRING, defaultValue: "[0,0,0]" },
              yaw: { type: Scratch.ArgumentType.STRING, defaultValue: "0" },
              pitch: { type: Scratch.ArgumentType.STRING, defaultValue: "0" },
              roll: { type: Scratch.ArgumentType.STRING, defaultValue: "0" },
            },
          },
          {
            opcode: "__NOUSEOPCODE",
            blockType: Scratch.BlockType.LABEL,
            text: "Equations",
          },
          {
            disableMonitor: true,
            opcode: "addV2",
            blockType: Scratch.BlockType.REPORTER,
            text: "V2: [a] + [b]",
            arguments: {
              a: { type: Scratch.ArgumentType.STRING, defaultValue: "[0,0]" },
              b: { type: Scratch.ArgumentType.STRING, defaultValue: "[0,0]" },
            },
          },
          {
            disableMonitor: true,
            opcode: "subV2",
            blockType: Scratch.BlockType.REPORTER,
            text: "V2: [a] - [b]",
            arguments: {
              a: { type: Scratch.ArgumentType.STRING, defaultValue: "[0,0]" },
              b: { type: Scratch.ArgumentType.STRING, defaultValue: "[0,0]" },
            },
          },
          {
            disableMonitor: true,
            opcode: "mulV2",
            blockType: Scratch.BlockType.REPORTER,
            text: "V2: [a] * [b]",
            arguments: {
              a: { type: Scratch.ArgumentType.STRING, defaultValue: "[0,0]" },
              b: { type: Scratch.ArgumentType.STRING, defaultValue: "[0,0]" },
            },
          },
          {
            disableMonitor: true,
            opcode: "divV2",
            blockType: Scratch.BlockType.REPORTER,
            text: "V2: [a] / [b]",
            arguments: {
              a: { type: Scratch.ArgumentType.STRING, defaultValue: "[0,0]" },
              b: { type: Scratch.ArgumentType.STRING, defaultValue: "[0,0]" },
            },
          },
          {
            disableMonitor: true,
            opcode: "dotProductOfV3",
            blockType: Scratch.BlockType.REPORTER,
            text: "V2: dot product between [a] and [b]",
            arguments: {
              a: { type: Scratch.ArgumentType.STRING, defaultValue: "[0,0]" },
              b: { type: Scratch.ArgumentType.STRING, defaultValue: "[0,0]" },
            },
          },
          {
            disableMonitor: true,
            opcode: "crossProductOfV2",
            blockType: Scratch.BlockType.REPORTER,
            text: "V2: cross product between [a] and [b]",
            arguments: {
              a: { type: Scratch.ArgumentType.STRING, defaultValue: "[0,0]" },
              b: { type: Scratch.ArgumentType.STRING, defaultValue: "[0,0]" },
            },
          },
          {
            disableMonitor: true,
            opcode: "magnitudeV2",
            blockType: Scratch.BlockType.REPORTER,
            text: "V2: magnitude of [a]",
            arguments: {
              a: { type: Scratch.ArgumentType.STRING, defaultValue: "[0,0]" },
            },
          },
          {
            disableMonitor: true,
            opcode: "distanceV2",
            blockType: Scratch.BlockType.REPORTER,
            text: "V2: distance between [a] and [b]",
            arguments: {
              a: { type: Scratch.ArgumentType.STRING, defaultValue: "[0,0]" },
              b: { type: Scratch.ArgumentType.STRING, defaultValue: "[0,0]" },
            },
          },
          {
            disableMonitor: true,
            opcode: "rotateAroundPointV2",
            blockType: Scratch.BlockType.REPORTER,
            text: "V2: rotate [a] around [b] by [yaw] degrees",
            arguments: {
              a: { type: Scratch.ArgumentType.STRING, defaultValue: "[0,0]" },
              b: { type: Scratch.ArgumentType.STRING, defaultValue: "[0,0]" },
              yaw: { type: Scratch.ArgumentType.STRING, defaultValue: "0" },
            },
          },
          {
            disableMonitor: true,
            opcode: "rotateAroundCenterV2",
            blockType: Scratch.BlockType.REPORTER,
            text: "V2: rotate [a] around the center by [yaw] degrees",
            arguments: {
              a: { type: Scratch.ArgumentType.STRING, defaultValue: "[0,0]" },
              yaw: { type: Scratch.ArgumentType.STRING, defaultValue: "0" },
            },
          },
          {
            opcode: "__NOUSEOPCODE",
            blockType: Scratch.BlockType.LABEL,
            text: "camera",
          },
          {
            disableMonitor: true,
            opcode: "cam3DsetPosition",
            blockType: Scratch.BlockType.COMMAND,
            text: "set camera position to [a]",
            arguments: {
              a: { type: Scratch.ArgumentType.STRING, defaultValue: "[0,0,0]" },
            },
          },
          {
            disableMonitor: true,
            opcode: "cam3DgetPosition",
            blockType: Scratch.BlockType.REPORTER,
            text: "get camera position",
            arguments: {},
          },
          {
            disableMonitor: true,
            opcode: "cam3DsetRotation",
            blockType: Scratch.BlockType.COMMAND,
            text: "set camera rotation to [a]",
            arguments: {
              a: { type: Scratch.ArgumentType.STRING, defaultValue: "[0,0,0]" },
            },
          },
          {
            disableMonitor: true,
            opcode: "cam3DgetRotation",
            blockType: Scratch.BlockType.REPORTER,
            text: "get camera rotation",
            arguments: {},
          },
          {
            opcode: "__NOUSEOPCODE",
            blockType: Scratch.BlockType.LABEL,
            text: "sprite 3D",
          },
          {
            disableMonitor: true,
            opcode: "setFov",
            blockType: Scratch.BlockType.COMMAND,
            text: "set fov to [dist]",
            arguments: {
              dist: { type: Scratch.ArgumentType.NUMBER, defaultValue: 300 },
            },
          },
          {
            disableMonitor: true,
            opcode: "spr3DsetPosition",
            blockType: Scratch.BlockType.COMMAND,
            text: "set my position to [a]",
            arguments: {
              a: { type: Scratch.ArgumentType.STRING, defaultValue: "[0,0,0]" },
            },
            filter: "sprite",
          },
          {
            disableMonitor: true,
            opcode: "spr3DchangePosition",
            blockType: Scratch.BlockType.COMMAND,
            text: "change my position by [a]",
            arguments: {
              a: { type: Scratch.ArgumentType.STRING, defaultValue: "[0,0,0]" },
            },
            filter: "sprite",
          },
          {
            disableMonitor: true,
            opcode: "spr3DgetPosition",
            blockType: Scratch.BlockType.REPORTER,
            text: "my 3d position",
            arguments: {},
            filter: "sprite",
          },
          {
            disableMonitor: true,
            opcode: "spr3D",
            blockType: Scratch.BlockType.COMMAND,
            text: "go to my position in 3D",
            arguments: {},
            filter: "sprite",
          },
        ],
        menus: {
          axisMenu: {
            items: [
              { text: "x", value: "0" },
              { text: "y", value: "1" },
              { text: "z", value: "2" },
            ],
            acceptReporters: false,
          },
          axisMenu2D: {
            items: [
              { text: "x", value: "0" },
              { text: "y", value: "1" },
            ],
            acceptReporters: false,
          },
        },
        name: "3D Math",
        id: "obviousAlexCMath3d",
        menuIconURI:
          "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI4OC44NTEwNCIgaGVpZ2h0PSI4OC44NTEwNCIgdmlld0JveD0iMCwwLDg4Ljg1MTA0LDg4Ljg1MTA0Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTk1LjU3NDQ5LC0xMzUuNTc0NDkpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0xOTUuNTc0NSwxODAuMDAwMDFjMCwtMjQuNTM1NTQgMTkuODg5OTgsLTQ0LjQyNTUyIDQ0LjQyNTUyLC00NC40MjU1MmMyNC41MzU1NCwwIDQ0LjQyNTUyLDE5Ljg4OTk4IDQ0LjQyNTUyLDQ0LjQyNTUyYzAsMjQuNTM1NTQgLTE5Ljg4OTk4LDQ0LjQyNTUyIC00NC40MjU1Miw0NC40MjU1MmMtMjQuNTM1NTQsMCAtNDQuNDI1NTIsLTE5Ljg4OTk4IC00NC40MjU1MiwtNDQuNDI1NTJ6IiBmaWxsPSIjYzJkOTE2IiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMCIvPjxwYXRoIGQ9Ik0yMTIuNTU4NDIsMjA3LjE4MjYydi0zNy44ODQ1N2gzNy43NTc0NHYzNy44ODQ1N3oiIGZpbGw9IiNhZGMyMTMiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIwIi8+PHBhdGggZD0iTTIxMy45NTY4NSwxNjkuNjc5NDRsMTYuMzk5NjksLTE3LjU0Mzg2bDM1Ljg1MDUsMC41MDg1MmwtMTUuNTA5NzksMTYuNjUzOTV6IiBmaWxsPSIjYWRjMjEzIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMCIvPjxwYXRoIGQ9Ik0yNTAuOTUxNTEsMjA2LjU0Njk4di01My4wMTI5N2gxNi45MDgyMWwtMC42MzU2NSwzNi40ODYxNHoiIGZpbGw9IiNhZGMyMTMiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIwIi8+PHBhdGggZD0iTTI2OC44MzAwNiwxNTIuMzcxMjR2MzguNDQwMDJjMCwwLjA2OTcxIC0wLjAyODgzLDAuMTMyMjEgLTAuMDQwODgsMC4xOTk0NWMtMC4wMTQ0MiwwLjA4ODg2IC0wLjAxOTE0LDAuMTc1MzUgLTAuMDUyODIsMC4yNTk0N2MtMC4wNjAwMiwwLjE0NjUyIC0wLjE0ODk5LDAuMjgxMDkgLTAuMjU5NDcsMC4zOTE1N2wtMTYuODE3NDksMTYuODE3NDljLTAuMDA5NjksMC4wMDk1NyAtMC4wMjQxLDAuMDEyMDUgLTAuMDMzNjcsMC4wMjE2MmMtMC4xMDU2NCwwLjA5NjE4IC0wLjIyMDk1LDAuMTgwMTkgLTAuMzU1NTMsMC4yMzU0OGMtMC4xNDY2MywwLjA2MjUgLTAuMzAyNzIsMC4wOTM3IC0wLjQ1ODkyLDAuMDkzN2gtMzguNDQwMDJjLTAuNjYzMDksMCAtMS4yMDEyOSwtMC41MzgyIC0xLjIwMTI5LC0xLjIwMTE4di0zOC40MzUyOWMwLC0wLjE1ODU3IDAuMDMxMiwtMC4zMTQ3NyAwLjA5MTMzLC0wLjQ2NjEyYzAuMDU1MywtMC4xMzIxIDAuMTM5NDIsLTAuMjQ5OSAwLjIzNTQ4LC0wLjM1MzE3YzAuMDExOTQsLTAuMDA5NjkgMC4wMTQ0MiwtMC4wMjQxIDAuMDIzOTksLTAuMDMzNjdsMTYuODE3MzgsLTE2LjgxNzQ5YzAuMTEyOTYsLTAuMTEyODQgMC4yNDUwNiwtMC4xOTkzMyAwLjM5NDA1LC0wLjI2MTg0YzAuMDgxNzYsLTAuMDMzNjcgMC4xNzA2MiwtMC4wMzYwNCAwLjI1NzExLC0wLjA1MDQ1YzAuMDY3MzUsLTAuMDEyMDUgMC4xMjk3NCwtMC4wNDA4OCAwLjE5OTQ1LC0wLjA0MDg4aDM4LjQ0MDAyYzAuMDkxMzMsMCAwLjE3Mjk4LDAuMDMzNjcgMC4yNTQ3NCwwLjA1MDQ1YzAuMDY3MjMsMC4wMTY4OSAwLjEzNDQ3LDAuMDE0NDIgMC4xOTY5NywwLjA0MDg4YzAuMjk3ODcsMC4xMjI1MyAwLjUzMzM2LDAuMzU4MDEgMC42NTU4OCwwLjY1NTg4YzAuMDI2NDcsMC4wNjIzOSAwLjAyNjQ3LDAuMTMyMSAwLjA0MDg4LDAuMTk2OTdjMC4wMTkxNCwwLjA4NDEyIDAuMDUyODIsMC4xNjU3NyAwLjA1MjgyLDAuMjU3MTF6TTI0OS42MDk5OSwxNzAuMzkwMDJoLTM2LjAzNzU2djM2LjAzNzU2aDM2LjAzNzU2ek0yNjQuNzI4OTgsMTUzLjU3MjQyaC0zNS4wNDI5MmwtMTQuNDE1MDIsMTQuNDE1MDJoMzUuMDQyOTJ6TTI2Ni40Mjc1OSwxNTUuMjcxMDNsLTE0LjQxNTAyLDE0LjQxNTAydjM1LjA0MjkybDE0LjQxNTAyLC0xNC40MTUwMnoiIGZpbGw9IiM3ZThkMGIiIHN0cm9rZT0iIzdlOGQwYiIgc3Ryb2tlLXdpZHRoPSI2Ii8+PC9nPjwvZz48L3N2Zz48IS0tcm90YXRpb25DZW50ZXI6NDQuNDI1NTA0OTk5OTk5OTk6NDQuNDI1NTE0OTk5OTk5OTktLT4=",
        blockIconURI:
          "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI2My45NDMyMiIgaGVpZ2h0PSI2My45NDMyMiIgdmlld0JveD0iMCwwLDYzLjk0MzIyLDYzLjk0MzIyIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjA4LjAyODQsLTE0OC4wMjgzOCkiPjxnIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2lzUGFpbnRpbmdMYXllciZxdW90Ozp0cnVlfSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTIxMi41NTg0MywyMDcuMTgyNjJ2LTM3Ljg4NDU3aDM3Ljc1NzQ0djM3Ljg4NDU3eiIgZmlsbD0iI2FkYzIxMyIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjAiLz48cGF0aCBkPSJNMjEzLjk1Njg2LDE2OS42Nzk0NGwxNi4zOTk2OSwtMTcuNTQzODZsMzUuODUwNSwwLjUwODUybC0xNS41MDk3OSwxNi42NTM5NXoiIGZpbGw9IiNhZGMyMTMiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIwIi8+PHBhdGggZD0iTTI1MC45NTE1MiwyMDYuNTQ2OTh2LTUzLjAxMjk3aDE2LjkwODIxbC0wLjYzNTY1LDM2LjQ4NjE0eiIgZmlsbD0iI2FkYzIxMyIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjAiLz48cGF0aCBkPSJNMjY4LjgzMDA3LDE1Mi4zNzEyNHYzOC40NDAwMmMwLDAuMDY5NzEgLTAuMDI4ODMsMC4xMzIyMSAtMC4wNDA4OCwwLjE5OTQ1Yy0wLjAxNDQyLDAuMDg4ODYgLTAuMDE5MTQsMC4xNzUzNSAtMC4wNTI4MiwwLjI1OTQ3Yy0wLjA2MDAyLDAuMTQ2NTIgLTAuMTQ4OTksMC4yODEwOSAtMC4yNTk0NywwLjM5MTU3bC0xNi44MTc0OSwxNi44MTc0OWMtMC4wMDk2OSwwLjAwOTU3IC0wLjAyNDEsMC4wMTIwNSAtMC4wMzM2NywwLjAyMTYyYy0wLjEwNTY0LDAuMDk2MTggLTAuMjIwOTUsMC4xODAxOSAtMC4zNTU1MywwLjIzNTQ4Yy0wLjE0NjYzLDAuMDYyNSAtMC4zMDI3MiwwLjA5MzcgLTAuNDU4OTIsMC4wOTM3aC0zOC40NDAwMmMtMC42NjMwOSwwIC0xLjIwMTI5LC0wLjUzODIgLTEuMjAxMjksLTEuMjAxMTh2LTM4LjQzNTI5YzAsLTAuMTU4NTcgMC4wMzEyLC0wLjMxNDc3IDAuMDkxMzMsLTAuNDY2MTJjMC4wNTUzLC0wLjEzMjEgMC4xMzk0MiwtMC4yNDk5IDAuMjM1NDgsLTAuMzUzMTdjMC4wMTE5NCwtMC4wMDk2OSAwLjAxNDQyLC0wLjAyNDEgMC4wMjM5OSwtMC4wMzM2N2wxNi44MTczOCwtMTYuODE3NDljMC4xMTI5NiwtMC4xMTI4NCAwLjI0NTA2LC0wLjE5OTMzIDAuMzk0MDUsLTAuMjYxODRjMC4wODE3NiwtMC4wMzM2NyAwLjE3MDYyLC0wLjAzNjA0IDAuMjU3MTEsLTAuMDUwNDVjMC4wNjczNSwtMC4wMTIwNSAwLjEyOTc0LC0wLjA0MDg4IDAuMTk5NDUsLTAuMDQwODhoMzguNDQwMDJjMC4wOTEzMywwIDAuMTcyOTgsMC4wMzM2NyAwLjI1NDc0LDAuMDUwNDVjMC4wNjcyMywwLjAxNjg5IDAuMTM0NDcsMC4wMTQ0MiAwLjE5Njk3LDAuMDQwODhjMC4yOTc4NywwLjEyMjUzIDAuNTMzMzYsMC4zNTgwMSAwLjY1NTg4LDAuNjU1ODhjMC4wMjY0NywwLjA2MjM5IDAuMDI2NDcsMC4xMzIxIDAuMDQwODgsMC4xOTY5N2MwLjAxOTE0LDAuMDg0MTIgMC4wNTI4MiwwLjE2NTc3IDAuMDUyODIsMC4yNTcxMXpNMjQ5LjYxLDE3MC4zOTAwMmgtMzYuMDM3NTZ2MzYuMDM3NTZoMzYuMDM3NTZ6TTI2NC43Mjg5OCwxNTMuNTcyNDJoLTM1LjA0MjkybC0xNC40MTUwMiwxNC40MTUwMmgzNS4wNDI5MnpNMjY2LjQyNzYsMTU1LjI3MTAzbC0xNC40MTUwMiwxNC40MTUwMnYzNS4wNDI5MmwxNC40MTUwMiwtMTQuNDE1MDJ6IiBmaWxsPSIjN2U4ZDBiIiBzdHJva2U9IiM3ZThkMGIiIHN0cm9rZS13aWR0aD0iNiIvPjwvZz48L2c+PC9zdmc+PCEtLXJvdGF0aW9uQ2VudGVyOjMxLjk3MTU5NTY4NzExOTI3NjozMS45NzE2MTU2ODcxMTkyODItLT4=",
        color1: "#ADC213",
        color2: "#A0B312",
        color3: "#697700",
      };
    }
    newV3({ x, y, z }) {
      return JSON.stringify([
        Scratch.Cast.toNumber(x) || 0,
        Scratch.Cast.toNumber(y) || 0,
        Scratch.Cast.toNumber(z) || 0,
      ]);
    }
    newV3fromValue({ value }) {
      if (typeof value == "number") {
        return JSON.stringify([value, value, value]);
      }
      return JSON.stringify([0, 0, 0]);
    }
    getAxisOfV3({ axis, vector }) {
      axis = Scratch.Cast.toNumber(axis);
      vector = JSON.parse(vector);
      if (vector) {
        return vector[axis];
      }
      return 0;
    }
    addV3({ a, b }) {
      a = JSON.parse(a);
      b = JSON.parse(b);
      if (a && b) {
        return JSON.stringify([a[0] + b[0], a[1] + b[1], a[2] + b[2]]);
      }
      return "[0,0,0]";
    }
    subV3({ a, b }) {
      a = JSON.parse(a);
      b = JSON.parse(b);
      if (a && b) {
        return JSON.stringify([a[0] - b[0], a[1] - b[1], a[2] - b[2]]);
      }
      return "[0,0,0]";
    }
    mulV3({ a, b }) {
      a = JSON.parse(a);
      b = JSON.parse(b);
      if (a && b) {
        return JSON.stringify([a[0] * b[0], a[1] * b[1], a[2] * b[2]]);
      }
      return "[0,0,0]";
    }
    divV3({ a, b }) {
      a = JSON.parse(a);
      b = JSON.parse(b);
      if (a && b) {
        const c = [0, 0, 0];
        c[0] = a[0] / b[0];
        c[1] = a[1] / b[1];
        c[2] = a[2] / b[2];
        if (isNaN(c[0])) {
          c[0] = 0;
        }

        if (isNaN(c[1])) {
          c[1] = 0;
        }

        if (isNaN(c[2])) {
          c[2] = 0;
        }

        return JSON.stringify(c);
      }
      return "[0,0,0]";
    }
    dotProductOfV3({ a, b }) {
      a = JSON.parse(a);
      b = JSON.parse(b);
      if (a && b) {
        return a[0] * b[0] + a[1] * b[1];
      }
      return 0;
    }
    crossProductOfV3({ a, b }) {
      a = JSON.parse(a);
      b = JSON.parse(b);

      if (a && b) {
        const c = [0, 0, 0];

        c[0] = a[1] * b[2] - a[2] * b[1];
        c[1] = a[2] * b[0] - a[0] * b[2];
        c[2] = a[0] * b[1] - a[1] * b[0];

        return JSON.stringify(c);
      }
      return "[0,0,0]";
    }
    magnitudeV3({ a }) {
      a = JSON.parse(a);
      if (a) {
        return Math.sqrt(
          Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2)
        );
      }
      return 0;
    }
    distanceV3({ a, b }) {
      a = JSON.parse(a);
      b = JSON.parse(b);
      if (a && b) {
        return Math.sqrt(
          Math.pow(a[0] - b[0], 2) +
            Math.pow(a[1] - b[1], 2) +
            Math.pow(a[2] - b[2], 2)
        );
      }
      return 0;
    }
    rotateAroundPointV3({ a, b, yaw, pitch, roll }) {
      a = JSON.parse(a);
      b = JSON.parse(b);

      if (a && b) {
        a[0] -= b[0];
        a[1] -= b[1];
        a[2] -= b[2];

        const sinAndCos = [
          Math.sin(yaw * d2r),
          Math.cos(yaw * d2r),
          Math.sin(pitch * d2r),
          Math.cos(pitch * d2r),
          Math.sin(roll * d2r),
          Math.cos(roll * d2r),
        ];

        let temp = a[0];

        a[0] = a[2] * sinAndCos[0] + a[0] * sinAndCos[1];
        a[2] = a[2] * sinAndCos[1] - temp * sinAndCos[0];

        temp = a[1];

        a[1] = a[2] * sinAndCos[2] + a[1] * sinAndCos[3];
        a[2] = a[2] * sinAndCos[3] - temp * sinAndCos[2];

        temp = a[0];

        a[0] = a[1] * sinAndCos[4] + a[0] * sinAndCos[5];
        a[1] = a[1] * sinAndCos[5] - temp * sinAndCos[4];

        a[0] += b[0];
        a[1] += b[1];
        a[2] += b[2];

        return JSON.stringify(a);
      }
      return "[0,0,0]";
    }
    rotateAroundCenterV3({ a, yaw, pitch, roll }) {
      a = JSON.parse(a);

      if (a) {
        const sinAndCos = [
          Math.sin(yaw * d2r),
          Math.cos(yaw * d2r),
          Math.sin(pitch * d2r),
          Math.cos(pitch * d2r),
          Math.sin(roll * d2r),
          Math.cos(roll * d2r),
        ];

        let temp = a[0];

        a[0] = a[2] * sinAndCos[0] + a[0] * sinAndCos[1];
        a[2] = a[2] * sinAndCos[1] - temp * sinAndCos[0];

        temp = a[1];

        a[1] = a[2] * sinAndCos[2] + a[1] * sinAndCos[3];
        a[2] = a[2] * sinAndCos[3] - temp * sinAndCos[2];

        temp = a[0];

        a[0] = a[1] * sinAndCos[4] + a[0] * sinAndCos[5];
        a[1] = a[1] * sinAndCos[5] - temp * sinAndCos[4];

        return JSON.stringify(a);
      }
      return "[0,0,0]";
    }
    newV2({ x, y }) {
      return JSON.stringify([
        Scratch.Cast.toNumber(x) || 0,
        Scratch.Cast.toNumber(y) || 0,
      ]);
    }
    newV2fromValue({ value }) {
      if (typeof value == "number") {
        return JSON.stringify([value, value]);
      }
      return JSON.stringify([0, 0]);
    }
    getAxisOfV2({ axis, vector }) {
      axis = Scratch.Cast.toNumber(axis);
      vector = JSON.parse(vector);
      if (vector) {
        return vector[axis];
      }
      return 0;
    }
    project2DFromCam({ a }) {
      a = JSON.parse(a);

      if (a) {
        a[0] -= camera.position[0];
        a[1] -= camera.position[1];
        a[2] -= camera.position[2];

        const sinAndCos = [
          Math.sin(-camera.rotation[0] * d2r),
          Math.cos(-camera.rotation[0] * d2r),
          Math.sin(-camera.rotation[1] * d2r),
          Math.cos(-camera.rotation[1] * d2r),
          Math.sin(-camera.rotation[2] * d2r),
          Math.cos(-camera.rotation[2] * d2r),
        ];

        let temp = a[0];

        a[0] = a[2] * sinAndCos[0] + a[0] * sinAndCos[1];
        a[2] = a[2] * sinAndCos[1] - temp * sinAndCos[0];

        temp = a[1];

        a[1] = a[2] * sinAndCos[2] + a[1] * sinAndCos[3];
        a[2] = a[2] * sinAndCos[3] - temp * sinAndCos[2];

        temp = a[0];

        a[0] = a[1] * sinAndCos[4] + a[0] * sinAndCos[5];
        a[1] = a[1] * sinAndCos[5] - temp * sinAndCos[4];

        let project = fov / a[2];

        return JSON.stringify([a[0] * project, a[1] * project]);
      }
      return "[0,0]";
    }
    project2DFromPos({ a, b, yaw, pitch, roll }) {
      a = JSON.parse(a);
      b = JSON.parse(b);

      if (a && b) {
        a[0] -= b[0];
        a[1] -= b[1];
        a[2] -= b[2];

        const sinAndCos = [
          Math.sin(-yaw * d2r),
          Math.cos(-yaw * d2r),
          Math.sin(-pitch * d2r),
          Math.cos(-pitch * d2r),
          Math.sin(-roll * d2r),
          Math.cos(-roll * d2r),
        ];

        let temp = a[0];

        a[0] = a[2] * sinAndCos[0] + a[0] * sinAndCos[1];
        a[2] = a[2] * sinAndCos[1] - temp * sinAndCos[0];

        temp = a[1];

        a[1] = a[2] * sinAndCos[2] + a[1] * sinAndCos[3];
        a[2] = a[2] * sinAndCos[3] - temp * sinAndCos[2];

        temp = a[0];

        a[0] = a[1] * sinAndCos[4] + a[0] * sinAndCos[5];
        a[1] = a[1] * sinAndCos[5] - temp * sinAndCos[4];

        let project = fov / a[2];

        return JSON.stringify([a[0] * project, a[1] * project]);
      }
      return "[0,0]";
    }
    addV2({ a, b }) {
      a = JSON.parse(a);
      b = JSON.parse(b);
      if (a && b) {
        return JSON.stringify([a[0] + b[0], a[1] + b[1]]);
      }
      return "[0,0]";
    }
    subV2({ a, b }) {
      a = JSON.parse(a);
      b = JSON.parse(b);
      if (a && b) {
        return JSON.stringify([a[0] - b[0], a[1] - b[1], a[2] - b[2]]);
      }
      return "[0,0]";
    }
    mulV2({ a, b }) {
      a = JSON.parse(a);
      b = JSON.parse(b);
      if (a && b) {
        return JSON.stringify([a[0] * b[0], a[1] * b[1]]);
      }
      return "[0,0]";
    }
    divV2({ a, b }) {
      a = JSON.parse(a);
      b = JSON.parse(b);
      if (a && b) {
        const c = [0, 0];
        c[0] = a[0] / b[0];
        c[1] = a[1] / b[1];
        if (isNaN(c[0])) {
          c[0] = 0;
        }

        if (isNaN(c[1])) {
          c[1] = 0;
        }

        return JSON.stringify(c);
      }
      return "[0,0]";
    }
    crossProductOfV2({ a, b }) {
      a = JSON.parse(a);
      b = JSON.parse(b);

      if (a && b) {
        const c = [0, 0];

        c[0] = a[1] - b[1];
        c[1] = b[0] - a[0];

        return JSON.stringify(c);
      }
      return 0;
    }
    magnitudeV2({ a }) {
      a = JSON.parse(a);
      if (a) {
        return Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2));
      }
      return 0;
    }
    distanceV2({ a, b }) {
      a = JSON.parse(a);
      b = JSON.parse(b);
      if (a && b) {
        return Math.sqrt(Math.pow(a[0] - b[0], 2) + Math.pow(a[1] - b[1], 2));
      }
      return 0;
    }
    rotateAroundPointV2({ a, b, yaw }) {
      a = JSON.parse(a);
      b = JSON.parse(b);

      if (a && b) {
        a[0] -= b[0];
        a[1] -= b[1];

        const sinAndCos = [Math.sin(yaw * d2r), Math.cos(yaw * d2r)];

        let temp = a[0];

        a[0] = a[1] * sinAndCos[0] + a[0] * sinAndCos[1];
        a[1] = a[1] * sinAndCos[1] - temp * sinAndCos[0];

        a[0] += b[0];
        a[1] += b[1];

        return JSON.stringify(a);
      }
      return "[0,0]";
    }
    rotateAroundCenterV2({ a, yaw }) {
      a = JSON.parse(a);

      if (a) {
        const sinAndCos = [Math.sin(yaw * d2r), Math.cos(yaw * d2r)];

        let temp = a[0];

        a[0] = a[1] * sinAndCos[0] + a[0] * sinAndCos[1];
        a[2] = a[1] * sinAndCos[1] - temp * sinAndCos[0];

        return JSON.stringify(a);
      }
      return "[0,0]";
    }
    cam3DsetPosition({ a }) {
      a = JSON.parse(a);

      if (a) {
        camera.position = a;
      }
    }
    cam3DgetPosition() {
      return JSON.stringify(camera.position);
    }
    cam3DsetRotation({ a }) {
      a = JSON.parse(a);

      if (a) {
        camera.rotation = a;
      }
    }
    cam3DgetRotation() {
      return JSON.stringify(camera.rotation);
    }
    setFov({ dist }) {
      fov = dist;
    }
    checkFor3dPositionData(targetID) {
      if (!spriteData[targetID]) {
        spriteData[targetID] = [0, 0, fov];
      }
    }
    spr3DsetPosition({ a }, util) {
      const target = util.target;
      extension.checkFor3dPositionData(target.id);

      a = JSON.parse(a);
      if (a) {
        spriteData[target.id] = a;
      }
    }
    spr3DchangePosition({ a }, util) {
      const target = util.target;
      extension.checkFor3dPositionData(target.id);

      a = JSON.parse(a);

      spriteData[target.id][0] += a[0];
      spriteData[target.id][1] += a[1];
      spriteData[target.id][2] += a[2];
    }
    spr3DgetPosition(args, util) {
      const target = util.target;
      extension.checkFor3dPositionData(target.id);
      return JSON.stringify(spriteData[target.id]);
    }
    spr3D(args, util) {
      const target = util.target;
      extension.checkFor3dPositionData(target.id);
      const myData = JSON.parse(JSON.stringify(spriteData[target.id]));

      myData[0] -= camera.position[0];
      myData[1] -= camera.position[1];
      myData[2] -= camera.position[2];

      const sinAndCos = [
        Math.sin(-camera.rotation[0] * d2r),
        Math.cos(-camera.rotation[0] * d2r),
        Math.sin(-camera.rotation[1] * d2r),
        Math.cos(-camera.rotation[1] * d2r),
        Math.sin(-camera.rotation[2] * d2r),
        Math.cos(-camera.rotation[2] * d2r),
      ];

      let temp = myData[0];

      myData[0] = myData[2] * sinAndCos[0] + myData[0] * sinAndCos[1];
      myData[2] = myData[2] * sinAndCos[1] - temp * sinAndCos[0];

      temp = myData[1];

      myData[1] = myData[2] * sinAndCos[2] + myData[1] * sinAndCos[3];
      myData[2] = myData[2] * sinAndCos[3] - temp * sinAndCos[2];

      temp = myData[0];

      myData[0] = myData[1] * sinAndCos[4] + myData[0] * sinAndCos[5];
      myData[1] = myData[1] * sinAndCos[5] - temp * sinAndCos[4];

      let project = fov / myData[2];

      if (myData[2] < 1) {
        target.setVisible(false);
      } else {
        target.setVisible(true);
        target.setSize(100 * project);
        target.setXY(myData[0] * project, myData[1] * project);
      }
    }
  }
  Scratch.extensions.register(new extension());
})(Scratch);
