// Name: Animations
// ID: SPanimations
// Description: Play Animations for your Sprites
// By: SharkPool

// Version V.1.5.0

(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) throw new Error("Animations must run unsandboxed");

  const vm = Scratch.vm;
  const runtime = vm.runtime;
  let allAnimations = [];
  let keyFramesPlaying = [];

  const menuIconURI =
"data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxMjcuNTA5OTIiIGhlaWdodD0iMTI3LjUwOTkyIiB2aWV3Qm94PSIwLDAsMTI3LjUwOTkyLDEyNy41MDk5MiI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE3Ni4yNDUwNCwtMTE2LjI0NTA0KSI+PGcgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aXNQYWludGluZ0xheWVyJnF1b3Q7OnRydWV9IiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMTc2LjI0NTA0LDE4MGMwLC0zNS4yMTA4OSAyOC41NDQwNywtNjMuNzU0OTYgNjMuNzU0OTYsLTYzLjc1NDk2YzM1LjIxMDg5LDAgNjMuNzU0OTYsMjguNTQ0MDcgNjMuNzU0OTYsNjMuNzU0OTZjMCwzNS4yMTA4OSAtMjguNTQ0MDcsNjMuNzU0OTYgLTYzLjc1NDk2LDYzLjc1NDk2Yy0zNS4yMTA4OSwwIC02My43NTQ5NiwtMjguNTQ0MDcgLTYzLjc1NDk2LC02My43NTQ5NnoiIGZpbGw9IiM0NDQ0NDQiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIwIi8+PHBhdGggZD0iTTE4Mi4xMTk0OSwxODBjMCwtMzEuOTY2NTMgMjUuOTEzOTksLTU3Ljg4MDUxIDU3Ljg4MDUxLC01Ny44ODA1MWMzMS45NjY1MywwIDU3Ljg4MDUxLDI1LjkxMzk5IDU3Ljg4MDUxLDU3Ljg4MDUxYzAsMzEuOTY2NTMgLTI1LjkxMzk5LDU3Ljg4MDUxIC01Ny44ODA1MSw1Ny44ODA1MWMtMzEuOTY2NTMsMCAtNTcuODgwNTEsLTI1LjkxMzk5IC01Ny44ODA1MSwtNTcuODgwNTF6IiBmaWxsPSIjN2E3YTdhIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMCIvPjxwYXRoIGQ9Ik0xOTkuOTQwMTEsMjA2Ljc3NDU5Yy01LjYxMjgsLTguMTI0OCAtMy41NzY0MywtMTkuMjYxMzMgNC41NDgzNywtMjQuODc0MTRjOC4xMjQ4LC01LjYxMjggMTkuMjYxMzMsLTMuNTc2NDMgMjQuODc0MTMsNC41NDgzN2M1LjYxMjgsOC4xMjQ4IDMuNTc2NDMsMTkuMjYxMzMgLTQuNTQ4MzYsMjQuODc0MTRjLTguMTI0OCw1LjYxMjggLTE5LjI2MTMzLDMuNTc2NDMgLTI0Ljg3NDE0LC00LjU0ODM3eiIgZmlsbD0iIzg5ODk4OSIgc3Ryb2tlPSIjN2E3YTdhIiBzdHJva2Utd2lkdGg9IjIuNSIvPjxwYXRoIGQ9Ik0yMDQuMzU1MDMsMTk2LjU4ODg2Yy02LjMzMDY1LC05LjE2MzkyIC00LjAzMzg0LC0yMS43MjQ3NSA1LjEzMDA4LC0yOC4wNTU0YzkuMTYzOTIsLTYuMzMwNjUgMjEuNzI0NzUsLTQuMDMzODQgMjguMDU1NCw1LjEzMDA4YzYuMzMwNjUsOS4xNjM5MiA0LjAzMzg0LDIxLjcyNDc1IC01LjEzMDA4LDI4LjA1NTRjLTkuMTYzOTIsNi4zMzA2NSAtMjEuNzI0NzUsNC4wMzM4NCAtMjguMDU1NDEsLTUuMTMwMDh6IiBmaWxsPSIjOWQ5ZDlkIiBzdHJva2U9IiM3YTdhN2EiIHN0cm9rZS13aWR0aD0iMi41Ii8+PHBhdGggZD0iTTIxMi4zOTAwMiwxODkuNTcyNTVjLTcuNDE2MTIsLTEwLjczNTE4IC00LjcyNTQ4LC0yNS40NDk3MSA2LjAwOTcsLTMyLjg2NTgyYzEwLjczNTE4LC03LjQxNjEyIDI1LjQ0OTcxLC00LjcyNTQ5IDMyLjg2NTgyLDYuMDA5NjljNy40MTYxMiwxMC43MzUxOCA0LjcyNTQ4LDI1LjQ0OTcxIC02LjAwOTY5LDMyLjg2NTgzYy0xMC43MzUxOCw3LjQxNjEyIC0yNS40NDk3MSw0LjcyNTQ4IC0zMi44NjU4MywtNi4wMDk2OXoiIGZpbGw9IiNhZWFlYWUiIHN0cm9rZT0iIzdhN2E3YSIgc3Ryb2tlLXdpZHRoPSIyLjUiLz48cGF0aCBkPSJNMjIzLjU1NTkxLDE4NS43NzU4OWMtOC4wMzQxMiwtMTEuNjI5NzcgLTUuMTE5MjcsLTI3LjU3MDUyIDYuNTEwNSwtMzUuNjA0NjRjMTEuNjI5NzcsLTguMDM0MTIgMjcuNTcwNTIsLTUuMTE5MjcgMzUuNjA0NjQsNi41MTA1YzguMDM0MTIsMTEuNjI5NzcgNS4xMTkyNywyNy41NzA1MiAtNi41MTA1LDM1LjYwNDY0Yy0xMS42Mjk3Nyw4LjAzNDEyIC0yNy41NzA1Miw1LjExOTI3IC0zNS42MDQ2NCwtNi41MTA1eiIgZmlsbD0iI2JhYmFiYSIgc3Ryb2tlPSIjN2E3YTdhIiBzdHJva2Utd2lkdGg9IjIuNSIvPjxwYXRoIGQ9Ik0yMzEuOTYyODUsMTg5LjYxOTY5Yy04LjgyODcxLC0xMi43Nzk5NyAtNS42MjU1OCwtMzAuMjk3MjcgNy4xNTQzOSwtMzkuMTI1OTdjMTIuNzc5OTcsLTguODI4NzEgMzAuMjk3MjcsLTUuNjI1NTggMzkuMTI1OTcsNy4xNTQzOWM4LjgyODcxLDEyLjc3OTk3IDUuNjI1NTgsMzAuMjk3MjcgLTcuMTU0MzksMzkuMTI1OTdjLTEyLjc3OTk3LDguODI4NzEgLTMwLjI5NzI3LDUuNjI1NTggLTM5LjEyNTk3LC03LjE1NDM5eiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjAiLz48L2c+PC9nPjwvc3ZnPg==";

  const blockIconURI =
"data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI4NS4zMzE1MyIgaGVpZ2h0PSI4NS4zMzE1MyIgdmlld0JveD0iMCwwLDg1LjMzMTUzLDg1LjMzMTUzIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTk3LjMzNDIzLC0xMzcuMzM0MjQpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjAiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMjgyLjY2NTc2LDEzNy4zMzQyNHY4NS4zMzE1M2gtODUuMzMxNTN2LTg1LjMzMTUzeiIgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aW5kZXgmcXVvdDs6bnVsbH0iIGZpbGw9IiM3YTdhN2EiLz48cGF0aCBkPSJNMjUyLjMwNDA3LDE2Mi42OTU5NWMyLjc2MTQzLDAgNSwyLjIzODU3IDUsNXY0MC40NTkyYzAsMi43NjE0MyAtMi4yMzg1OCw1IC01LDVoLTQwLjQ1OTJjLTIuNzYxNDMsMCAtNSwtMi4yMzg1NyAtNSwtNXYtNDAuNDU5MmMwLC0yLjc2MTQzIDIuMjM4NTcsLTUgNSwtNXoiIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2luZGV4JnF1b3Q7Om51bGx9IiBmaWxsPSIjOTI5MjkyIi8+PHBhdGggZD0iTTI2MC4yMjk2LDE1NC43NzA0MmMyLjc2MTQyLDAgNSwyLjIzODU3IDUsNXY0MC40NTkyYzAsMi43NjE0MyAtMi4yMzg1OCw1IC01LDVoLTQwLjQ1OTJjLTIuNzYxNDMsMCAtNSwtMi4yMzg1NyAtNSwtNXYtNDAuNDU5MmMwLC0yLjc2MTQzIDIuMjM4NTcsLTUgNSwtNXoiIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2luZGV4JnF1b3Q7Om51bGx9IiBmaWxsPSIjYzBjMGMwIi8+PHBhdGggZD0iTTI2OC4xNTUxMywxNDYuODQ0ODljMi43NjE0MiwwIDUsMi4yMzg1OCA1LDV2NDAuNDU5MmMwLDIuNzYxNDIgLTIuMjM4NTgsNSAtNSw1aC00MC40NTkyYy0yLjc2MTQyLDAgLTUsLTIuMjM4NTggLTUsLTV2LTQwLjQ1OTJjMCwtMi43NjE0MiAyLjIzODU4LC01IDUsLTV6IiBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpbmRleCZxdW90OzpudWxsfSIgZmlsbD0iI2ZmZmZmZiIvPjwvZz48L2c+PC9zdmc+";

  const playIconURI =
"data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI4NS4zMzE1MyIgaGVpZ2h0PSI4NS4zMzE1MyIgdmlld0JveD0iMCwwLDg1LjMzMTUzLDg1LjMzMTUzIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTk3LjMzNDIzLC0xMzcuMzM0MjUpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjAiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMTk3LjMzNDI0LDIyMi42NjU3OHYtODUuMzMxNTNoODUuMzMxNTN2ODUuMzMxNTN6IiBmaWxsPSIjN2E3YTdhIi8+PHBhdGggZD0iTTIyNC43NjQ3MSwxNTMuNTYxNDdjNS40MjY0MSwzLjEzMjk0IDI2Ljc0NzY2LDE1LjQ0Mjc3IDM4LjMwODU4LDIyLjExNzQ3YzQuNTIyMTIsMi42MTA4NSA0LjU4MjEyLDYuMDczNTIgMC4xNDI5Myw4LjYzNjQ5Yy0xMS4zMDM3NCw2LjUyNjIyIC0zMi4xNDE1OSwxOC41NTY5NiAtMzcuNzc1NDcsMjEuODA5NjhjLTIuNzYzODEsMS41OTU2OSAtNS42MDYsMC43MzAwNiAtNS42MDYsLTMuMTk2ODhjMCwtMTIuMjEwNjkgMCwtMzguMTU0NjIgMCwtNDUuMTc1NTJjMCwtMy40MjY0MiAyLjQ1NDg1LC01LjYyMDI2IDQuOTI5OTYsLTQuMTkxMjV6IiBmaWxsPSIjZmZmZmZmIi8+PC9nPjwvZz48L3N2Zz4=";

  const keyIconURI =
"data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI4NS4zMzE1MyIgaGVpZ2h0PSI4NS4zMzE1MyIgdmlld0JveD0iMCwwLDg1LjMzMTUzLDg1LjMzMTUzIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTk3LjMzNDIzLC0xMzcuMzM0MjMpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTI4Mi42NjU3NywxMzcuMzM0MjN2ODUuMzMxNTNoLTg1LjMzMTUzdi04NS4zMzE1M3oiIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2luZGV4JnF1b3Q7Om51bGx9IiBmaWxsPSIjN2E3YTdhIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMCIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiLz48cGF0aCBkPSJNMjA2LjA1MjMxLDE2Mi41NjM4M2MwLC02LjkzMDQ5IDUuNjE4MjcsLTEyLjU0ODc2IDEyLjU0ODc2LC0xMi41NDg3NmM2LjkzMDQ5LDAgMTIuNTQ4NzYsNS42MTgyNyAxMi41NDg3NiwxMi41NDg3NmMwLDYuOTMwNDkgLTUuNjE4MjcsMTIuNTQ4NzYgLTEyLjU0ODc2LDEyLjU0ODc2Yy02LjkzMDQ5LDAgLTEyLjU0ODc2LC01LjYxODI3IC0xMi41NDg3NiwtMTIuNTQ4NzZ6IiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMCIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiLz48cGF0aCBkPSJNMjM4LjI4MjgsMTkyLjE1MjQ4YzAsLTkuODQ4NTggNy45ODM4NSwtMTcuODMyNDQgMTcuODMyNDQsLTE3LjgzMjQ0YzkuODQ4NTgsMCAxNy44MzI0NCw3Ljk4Mzg1IDE3LjgzMjQ0LDE3LjgzMjQ0YzAsOS44NDg1OCAtNy45ODM4NiwxNy44MzI0NCAtMTcuODMyNDQsMTcuODMyNDRjLTkuODQ4NTgsMCAtMTcuODMyNDQsLTcuOTgzODYgLTE3LjgzMjQ0LC0xNy44MzI0NHoiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIwIiBzdHJva2UtbGluZWNhcD0iYnV0dCIvPjxwYXRoIGQ9Ik0yMjEuMTQwOTcsMTY0LjMxODg3bDMwLjM4MTIsMjUuNjI1ODgiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSI1IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48L2c+PC9nPjwvc3ZnPg==";
  
  class SPanimations {
    constructor() {
      Scratch.vm.runtime.on("PROJECT_STOP_ALL", () => {
        allAnimations.forEach(animationObject => {
          const args = { NAME: Object.keys(animationObject)[0] };
          this.stopAnimation(args);
        });
      });
    }
    getInfo() {
      return {
        id: "SPanimations",
        name: "Animations",
        color1: "#7a7a7a",
        color2: "#444444",
        color3: "#232323",
        menuIconURI,
        blockIconURI,
        blocks: [
          {
            opcode: "createAnimation",
            blockType: Scratch.BlockType.COMMAND,
            text: "make new animation named [NAME]",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "animation 1"
              },
            },
          },
          {
            opcode: "removeAnimation",
            blockType: Scratch.BlockType.COMMAND,
            text: "delete animation named [NAME]",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "animation 1"
              },
            },
          },
          {
            opcode: "removeAll",
            blockType: Scratch.BlockType.COMMAND,
            text: "delete all animations"
          },
          {
            opcode: "isExists",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "animation [NAME] exists?",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "animation 1"
              },
            },
          },
          {
            opcode: "allAnimationsX",
            blockType: Scratch.BlockType.REPORTER,
            text: "all [TYPE] animations",
            arguments: {
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "pullTypes"
              },
            },
          },
          { blockType: Scratch.BlockType.LABEL, text: "Frames" },
          {
            opcode: "addFrame",
            blockType: Scratch.BlockType.COMMAND,
            text: "add [COSTUME] to [NAME]",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "animation 1"
              },
              COSTUME: { type: Scratch.ArgumentType.COSTUME },
            },
          },
          {
            opcode: "removeFrame",
            blockType: Scratch.BlockType.COMMAND,
            text: "remove [COSTUME] from [NAME]",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "animation 1"
              },
              COSTUME: { type: Scratch.ArgumentType.COSTUME },
            },
          },
          {
            opcode: "addAllFrames",
            blockType: Scratch.BlockType.COMMAND,
            text: "add costumes from [COS1] to [COS2] to [NAME]",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "animation 1"
              },
              COS1: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
              COS2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 },
            },
          },
          {
            opcode: "removeAllFrames",
            blockType: Scratch.BlockType.COMMAND,
            text: "remove frames [COS1] to [COS2] from [NAME]",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "animation 1"
              },
              COS1: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
              COS2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 },
            },
          },
          "---",
          {
            opcode: "addPause",
            blockType: Scratch.BlockType.COMMAND,
            text: "add a [SECOND] second pause to [NAME] with ID [ID]",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "animation 1"
              },
              SECOND: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 3
              },
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "pause1"
              },
            },
          },
          {
            opcode: "removePause",
            blockType: Scratch.BlockType.COMMAND,
            text: "remove pause frame from [NAME] with ID [ID]",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "animation 1"
              },
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "pause1"
              },
            },
          },
          "---",
          {
            opcode: "numFrames",
            blockType: Scratch.BlockType.REPORTER,
            text: "number of frames in [NAME]",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "animation 1"
              },
            },
          },
          {
            opcode: "frameNames",
            blockType: Scratch.BlockType.REPORTER,
            text: "all frames in [NAME]",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "animation 1",
              }
            },
          },
          {
            opcode: "frameName",
            blockType: Scratch.BlockType.REPORTER,
            text: "frame # [FRAME] in [NAME]",
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "animation 1"
              },
              FRAME: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              },
            },
          },
          { blockType: Scratch.BlockType.LABEL, text: "Playback" },
          {
            opcode: "setFPS",
            blockType: Scratch.BlockType.COMMAND,
            text: "set FPS of [NAME] to [FPS]",
            blockIconURI: playIconURI,
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "animation 1"
              },
              FPS: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 30
              },
            },
          },
          {
            opcode: "playBack",
            blockType: Scratch.BlockType.COMMAND,
            text: "play animation [NAME] [TYPE]",
            blockIconURI: playIconURI,
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "animation 1"
              },
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "playBack"
              },
            },
          },
          {
            opcode: "playBackWait",
            blockType: Scratch.BlockType.COMMAND,
            text: "play animation [NAME] [TYPE] until done",
            blockIconURI: playIconURI,
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "animation 1"
              },
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "playBack"
              },
            },
          },
          {
            opcode: "stopAnimation",
            blockType: Scratch.BlockType.COMMAND,
            text: "stop animation [NAME]",
            blockIconURI: playIconURI,
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "animation 1"
              },
            },
          },
          "---",
          {
            opcode: "currentFPS",
            blockType: Scratch.BlockType.REPORTER,
            text: "FPS of [NAME]",
            blockIconURI: playIconURI,
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "animation 1"
              },
            },
          },
          {
            opcode: "isPlaying",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is [NAME] playing?",
            blockIconURI: playIconURI,
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "animation 1"
              },
            },
          },
          {
            opcode: "currentFrame",
            blockType: Scratch.BlockType.REPORTER,
            text: "current frame of [NAME]",
            blockIconURI: playIconURI,
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "animation 1"
              },
            },
          },
          { blockType: Scratch.BlockType.LABEL, text: "Keyframes" },
          {
            opcode: "addPosition",
            blockType: Scratch.BlockType.COMMAND,
            text: "add keyframe position to [NAME] with ID [ID] start x [x] y [y] end x [x2] y [y2]",
            blockIconURI: keyIconURI,
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "animation 1"
              },
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "key1"
              },
              x: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              x2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              y2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            },
          },
          {
            opcode: "addDirection",
            blockType: Scratch.BlockType.COMMAND,
            text: "add keyframe direction to [NAME] with ID [ID] start [DIR1] end [DIR2]",
            blockIconURI: keyIconURI,
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "animation 1"
              },
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "key1"
              },
              DIR1: { type: Scratch.ArgumentType.ANGLE, defaultValue: 90 },
              DIR2: { type: Scratch.ArgumentType.ANGLE, defaultValue: 0 },
            },
          },
          {
            opcode: "addScale",
            blockType: Scratch.BlockType.COMMAND,
            text: "add keyframe scale to [NAME] with ID [ID] start [scale]% end [scale2]%",
            blockIconURI: keyIconURI,
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "animation 1"
              },
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "key1"
              },
              scale: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              scale2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 150 },
            },
          },
          {
            opcode: "addStretch",
            blockType: Scratch.BlockType.COMMAND,
            text: "add keyframe stretch to [NAME] with ID [ID] start width [x] height [y] end width [x2] height [y2]",
            blockIconURI: keyIconURI,
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "animation 1"
              },
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "key1"
              },
              x: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              x2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 200 },
              y2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 },
            },
          },
          "---",
          {
            opcode: "deleteKeyframe",
            blockType: Scratch.BlockType.COMMAND,
            text: "remove keyframe with ID [ID] from [NAME]",
            blockIconURI: keyIconURI,
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "animation 1"
              },
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "key1"
              },
            },
          },
        ],
        menus: {
          playBack: ["normally", "in reverse", "looped normally", "looped reversed"],
          pullTypes: {
            acceptReporters: true,
            items: ["existing", "playing"],
          },
        }
      };
    }

    createAnimation(args, util) {
      allAnimations.push({
        [args.NAME]: {
          name: args.NAME, target: util.target,
          fps: 10, frames: [],
          playing: false, currentFrame: 0
        }
      });
    }

    removeAnimation(args) {
      this.stopPlayingAnimation(args.NAME);
      const indexToRemove = allAnimations.findIndex((animation) => Object.keys(animation)[0] === args.NAME);
      if (indexToRemove !== -1) { allAnimations.splice(indexToRemove, 1) }
    }

    removeAll() {
      allAnimations.forEach(animationObject => {
        const args = { NAME: Object.keys(animationObject)[0] };
        this.stopAnimation(args);
      });
      allAnimations = [];
    }

    isExists(args) {
      const animation = allAnimations.find((animation) => animation[args.NAME]);
      return Scratch.Cast.toBoolean(animation);
    }

    addFrame(args, util) {
      let animation = allAnimations.find((animation) => animation[args.NAME]);
      if (!animation) {
        this.createAnimation(args, util);
        animation = allAnimations.find((animation) => animation[args.NAME]);
      }
      if (util.target !== animation[args.NAME].target) {
        console.error(`This Animation can only be ran in "${animation[args.NAME].target.sprite.name}"`);
        return;
      }
      if (animation) { animation[args.NAME].frames.push(args.COSTUME) }
    }

    addAllFrames(args, util) {
      args.COS1 = args.COS1 < 1 ? 1 : Math.round(args.COS1) - 1;
      args.COS2 = args.COS2 < 1 ? 1 : args.COS2 > util.target.sprite.costumes_.length ? util.target.sprite.costumes_.length : Math.round(args.COS2);
      let animation = allAnimations.find((animation) => animation[args.NAME]);
      if (!animation) {
        this.createAnimation(args, util);
        animation = allAnimations.find((animation) => animation[args.NAME]);
      }
      if (util.target !== animation[args.NAME].target) {
        console.error(`This Animation can only be ran in "${animation[args.NAME].target.sprite.name}"`);
        return;
      }
      if (animation) {
        for (let i = args.COS1; i < args.COS2; i++) {
          animation[args.NAME].frames.push(util.target.getCostumes()[i].name);
        }
      }
    }

    removeAllFrames(args, util) {
      args.COS1 = args.COS1 < 1 ? 1 : Math.round(args.COS1) - 1;
      args.COS2 = args.COS2 < 1 ? 1 : args.COS2 > util.target.sprite.costumes_.length ? util.target.sprite.costumes_.length : Math.round(args.COS2);
      let animation = allAnimations.find((animation) => animation[args.NAME]);
      if (animation) {
        if (util.target !== animation[args.NAME].target) {
          console.error(`This Animation belongs to and can only be ran in "${animation[args.NAME].target.sprite.name}"`);
          return;
        }
        animation[args.NAME].frames = animation[args.NAME].frames.filter(frame => {
          const frameIndex = util.target.getCostumes().findIndex(costume => costume.name === frame);
          return frameIndex < args.COS1 || frameIndex >= args.COS2;
        });
      }
    }

    removeFrame(args, util) {
      const animation = allAnimations.find((animation) => animation[args.NAME]);
      if (animation) {
        if (util.target !== animation[args.NAME].target) {
          console.error(`This Animation can only be ran in "${animation[args.NAME].target.sprite.name}"`);
          return;
        }
        animation[args.NAME].frames = animation[args.NAME].frames.filter(frame => frame !== args.COSTUME);
      }
    }

    addPause(args, util) {
      let animation = allAnimations.find((animation) => animation[args.NAME]);
      if (!animation) {
        this.createAnimation(args, util);
        animation = allAnimations.find((animation) => animation[args.NAME]);
      }
      if (animation) {
        const SECS = Math.abs(args.SECOND) * 1000;
        animation[args.NAME].frames.push({
          [`spKF4!PZ${args.ID}`]: { secs: SECS }
        });
      }
    }

    removePause(args) {
      const animation = allAnimations.find((animation) => animation[args.NAME]);
      if (animation) {
        animation[args.NAME].frames = animation[args.NAME].frames.filter(frame => !frame.includes(args.ID));
      }
    }

    numFrames(args) {
      const animation = allAnimations.find((animation) => animation[args.NAME]);
      if (animation) return animation[args.NAME].frames.length;
      else  return "Animation Doesnt Exist!";
    }

    currentFrame(args) {
      const animation = allAnimations.find((animation) => animation[args.NAME]);
      if (animation) return animation[args.NAME].currentFrame;
      else return "Animation Doesnt Exist!";
    }

    frameNames(args) {
      const animation = allAnimations.find((animation) => animation[args.NAME]);
      if (animation) return JSON.stringify(animation[args.NAME].frames);
      else return "Animation Doesnt Exist!";
    }

    frameName(args) {
      const animation = allAnimations.find((animation) => animation[args.NAME]);
      if (animation) {
        const newFrame = Math.abs(Math.round(args.FRAME)) - 1;
        return (animation[args.NAME].frames[newFrame]) ? JSON.stringify(animation[args.NAME].frames[newFrame]) : "";
      } else { return "Animation Doesnt Exist!" }
    }

    allAnimationsX(args) {
      if (args.TYPE === "playing") {
       const playingAnimations = allAnimations.filter(animationObj => animationObj[Object.keys(animationObj)[0]].playing === true);
        return JSON.stringify(playingAnimations.map(animationObj => Object.keys(animationObj)[0]));
      } else {
        return JSON.stringify(allAnimations.map(animationObj => Object.keys(animationObj)[0]));
      }
    }

    setFPS(args) {
      const animation = allAnimations.find((animation) => animation[args.NAME]);
      if (animation) {
        animation[args.NAME].fps = args.FPS === 0 ? 1 : Math.abs(Scratch.Cast.toNumber(args.FPS));
      }
    }

    playBackWait(args) {
      this.playBack(args);
      return new Promise((resolve, reject) => {
        const animationPlay = () => {
          this.isPlaying(args) ? setTimeout(animationPlay, 100) : resolve();
        };
        setTimeout(animationPlay, 100);
      });
    }

    playBack(args) {
      const animation = allAnimations.find((animation) => animation[args.NAME]);
      if (animation) {
        this.stopPlayingAnimation(args.NAME);
        //stoping animation is not instant, this is to prevent dual animations
        setTimeout(() => {
          const myAnimation = animation[args.NAME];
          myAnimation.playing = true;
          const target = myAnimation.target;
          let frameIndex = args.TYPE.includes("reverse") ? myAnimation.frames.length - 1 : 0;
          myAnimation.currentFrame = frameIndex;
          const numFrames = myAnimation.frames.length;
          if (numFrames === 0) return;
          const playNextFrame = () => {
            if (myAnimation.playing === true) {
              myAnimation.currentFrame = frameIndex;
              if (Object.keys(myAnimation.frames[frameIndex]).some(key => key.includes("spKF4!"))) {
                if (Object.keys(myAnimation.frames[frameIndex]).some(key => key.includes("PZ"))) {
                  const keys = Object.keys(myAnimation.frames[frameIndex]);
                  /* eslint-disable */
                  for (const key of keys) {
                    const delayTime = myAnimation.frames[frameIndex][key].secs;
                    setTimeout(() => { handleNextFrame() }, delayTime);
                    return;
                  }
                  /* eslint-enable */
                } else { this._setKeyframe(target, myAnimation.frames[frameIndex], myAnimation) }
              } else { this._setCostume(target, myAnimation.frames[frameIndex]) }
              handleNextFrame();
            } else { myAnimation.playing = false }
          };
          const handleNextFrame = () => {
            if (args.TYPE.includes("reverse")) {
              frameIndex--;
              if (frameIndex < 0) {
                if (args.TYPE.includes("looped")) frameIndex = numFrames - 1;
                else {
                  myAnimation.playing = false;
                  return;
                }
              }
            } else {
              frameIndex++;
              if (frameIndex >= numFrames) {
                if (args.TYPE.includes("looped")) frameIndex = 0;
                else {
                  myAnimation.playing = false;
                  return;
                }
              }
            }
            setTimeout(playNextFrame, 1000 / myAnimation.fps);
          };
          playNextFrame();
        }, 100);
      }
    }

    stopAnimation(args) { this.stopPlayingAnimation(args.NAME) }

    stopPlayingAnimation(name) {
      const animation = allAnimations.find((animation) => animation[name]);
      if (animation) animation[name].playing = false;
    }

    currentFPS(args) {
      const animation = allAnimations.find((animation) => animation[args.NAME]);
      if (animation) return animation[args.NAME].fps;
      else return "Animation Doesnt Exist!";
    }

    isPlaying(args) {
      const animation = allAnimations.find((animation) => animation[args.NAME]);
      if (animation) return animation[args.NAME].playing;
      else return false;
    }

    _setCostume(target, requestedCostume, optZeroIndex) {
      if (typeof requestedCostume === "number") {
        target.setCostume(optZeroIndex ? requestedCostume : requestedCostume - 1);
      } else {
        const costumeIndex = target.getCostumeIndexByName(requestedCostume.toString());
        if (costumeIndex !== -1) target.setCostume(costumeIndex);
        else if (requestedCostume === "next costume") target.setCostume(target.currentCostume + 1);
        else if (requestedCostume === "previous costume") target.setCostume(target.currentCostume - 1);
        else if (!(isNaN(requestedCostume) || Scratch.Cast.isWhiteSpace(requestedCostume))) {
          target.setCostume(optZeroIndex ? Number(requestedCostume) : Number(requestedCostume) - 1);
        }
      }
      return [];
    }

    addPosition(args, util) {
      let animation = allAnimations.find((animation) => animation[args.NAME]);
      if (!animation) {
        this.createAnimation(args, util);
        animation = allAnimations.find((animation) => animation[args.NAME]);
      }
      if (animation) {
        const keyframe = {
          [`spKF4!XY${args.ID}`]: {
            x1: args.x, y1: args.y,
            x2: args.x2, y2: args.y2,
          }
        };
        animation[args.NAME].frames.push(keyframe);
      }
    }

    addStretch(args, util) {
      let animation = allAnimations.find((animation) => animation[args.NAME]);
      if (!animation) {
        this.createAnimation(args, util);
        animation = allAnimations.find((animation) => animation[args.NAME]);
      }
      if (animation) {
        const keyframe = {
          [`spKF4!WH${args.ID}`]: {
            x1: args.x, y1: args.y,
            x2: args.x2, y2: args.y2,
          }
        };
        animation[args.NAME].frames.push(keyframe);
      }
    }

    addDirection(args, util) {
      let animation = allAnimations.find((animation) => animation[args.NAME]);
      if (!animation) {
        this.createAnimation(args, util);
        animation = allAnimations.find((animation) => animation[args.NAME]);
      }
      if (animation) {
        const keyframe = {
          [`spKF4!DIR${args.ID}`]: {
            dir1: args.DIR1, dir2: args.DIR2,
          }
        };
        animation[args.NAME].frames.push(keyframe);
      }
    }

    addScale(args, util) {
      let animation = allAnimations.find((animation) => animation[args.NAME]);
      if (!animation) {
        this.createAnimation(args, util);
        animation = allAnimations.find((animation) => animation[args.NAME]);
      }
      if (animation) {
        const keyframe = {
          [`spKF4!SZ${args.ID}`]: {
            size1: args.scale, size2: args.scale2,
          }
        };
        animation[args.NAME].frames.push(keyframe);
      }
    }

    deleteKeyframe(args) {
      const animation = allAnimations.find((animation) => animation[args.NAME]);
      if (animation) {
        animation[args.NAME].frames = animation[args.NAME].frames.filter(frame => {
          for (const key in frame) {
            if (key.startsWith("spKF4!") && key.endsWith(args.ID)) return false;
          }
          return true;
        });
      }
    }

    _setKeyframe(target, keyframe, data) {
      let startTime, startX, startY, deltaX, deltaY, startSize, deltaSize, startDir, deltaDir;
      if (!keyFramesPlaying.some(item => JSON.stringify(item) === JSON.stringify([data, keyframe]))) {
        keyFramesPlaying.push([data, keyframe]);
      }
      keyFramesPlaying.push([data, keyframe]);
      const key = keyframe[Object.keys(keyframe)[0]];
      const animationDuration = data.fps * 20;
      if (JSON.stringify(keyframe).includes("DIR")) {
        startDir = key.dir1;
        deltaDir = key.dir2 - key.dir1;
      } else if (JSON.stringify(keyframe).includes("SZ")) {
        startSize = key.size1;
        deltaSize = key.size2 - key.size1;
      } else {
        startX = key.x1;
        startY = key.y1;
        deltaX = key.x2 - key.x1;
        deltaY = key.y2 - key.y1;
      }
      if (JSON.stringify(keyframe).includes("XY")) {
        const animateXY = (timestamp) => {
          if (!startTime) startTime = timestamp;
          const elapsedTime = timestamp - startTime;
          const progress = Math.min(elapsedTime / animationDuration, 1);
          target.setXY(startX + deltaX * progress, startY + deltaY * progress);
          if (progress < 1) requestAnimationFrame(animateXY);
        };
        requestAnimationFrame(animateXY);
      } else if (JSON.stringify(keyframe).includes("WH")) {
        const animateXY = (timestamp) => {
          if (!startTime) startTime = timestamp;
          const elapsedTime = timestamp - startTime;
          const progress = Math.min(elapsedTime / animationDuration, 1);
          vm.renderer._allDrawables[target.drawableID].updateScale([
            startX + deltaX * progress, startY + deltaY * progress
          ]);
          if (progress < 1) requestAnimationFrame(animateXY);
        };
        requestAnimationFrame(animateXY);
      } else if (JSON.stringify(keyframe).includes("DIR")) {
        const animateDirection = (timestamp) => {
          if (!startTime) startTime = timestamp;
          const elapsedTime = timestamp - startTime;
          const progress = Math.min(elapsedTime / animationDuration, 1);
          target.setDirection(startDir + deltaDir * progress);
          if (progress < 1) requestAnimationFrame(animateDirection);
        };
        requestAnimationFrame(animateDirection);
      } else if (JSON.stringify(keyframe).includes("SZ")) {
        const animateSize = (timestamp) => {
          if (!startTime) startTime = timestamp;
          const elapsedTime = timestamp - startTime;
          const progress = Math.min(elapsedTime / animationDuration, 1);
          target.setSize(startSize + deltaSize * progress);
          if (progress < 1) requestAnimationFrame(animateSize);
        };
        requestAnimationFrame(animateSize);
      }
      keyFramesPlaying = keyFramesPlaying.filter(item => JSON.stringify(item) !== JSON.stringify([data, keyframe]));
    }
  }

  Scratch.extensions.register(new SPanimations());
})(Scratch);
