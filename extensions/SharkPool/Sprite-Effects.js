// Name: Sprite Effects
// ID: SPspriteEffects
// Description: Apply New Non-Vanilla Effects to Sprites and the Canvas!
// By: SharkPool

// Version V.1.5.0

(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) throw new Error("Sprite Effects must run unsandboxed");

  const menuIconURI =
"data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxMzYiIGhlaWdodD0iMTM2IiB2aWV3Qm94PSIwLDAsMTM2LDEzNiI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE3MiwtMTEyKSI+PGcgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aXNQYWludGluZ0xheWVyJnF1b3Q7OnRydWV9IiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTE3MiwxODBjMCwtMzcuNTU1MzYgMzAuNDQ0NjQsLTY4IDY4LC02OGMzNy41NTUzNiwwIDY4LDMwLjQ0NDY0IDY4LDY4YzAsMzcuNTU1MzYgLTMwLjQ0NDY0LDY4IC02OCw2OGMtMzcuNTU1MzYsMCAtNjgsLTMwLjQ0NDY0IC02OCwtNjh6IiBmaWxsPSIjNzc0ZGNiIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIwIi8+PHBhdGggZD0iTTE3OC40MzI0MywxODBjMCwtMzQuMDAyODMgMjcuNTY0NzQsLTYxLjU2NzU3IDYxLjU2NzU3LC02MS41Njc1N2MzNC4wMDI4MywwIDYxLjU2NzU3LDI3LjU2NDc0IDYxLjU2NzU3LDYxLjU2NzU3YzAsMzQuMDAyODMgLTI3LjU2NDc0LDYxLjU2NzU3IC02MS41Njc1Nyw2MS41Njc1N2MtMzQuMDAyODMsMCAtNjEuNTY3NTcsLTI3LjU2NDc0IC02MS41Njc1NywtNjEuNTY3NTd6IiBmaWxsPSIjOTk2NmZmIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIwIi8+PGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZm9udC1mYW1pbHk9InNhbnMtc2VyaWYiIGZvbnQtd2VpZ2h0PSJub3JtYWwiIGZvbnQtc2l6ZT0iMTIiIHRleHQtYW5jaG9yPSJzdGFydCIvPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiPjxwYXRoIGQ9Ik0yNjkuNTE4MTYsMTcwLjE5ODgyYzEuNjk4NzYsLTAuNzM5ODkgMi44NzM5NSwtMi4zMjkxOSAzLjA4MzU5LC00LjE3MDE4bDAuNDc5MDUsLTQuMTg1NThjMC4yMjg5LC0xLjk3OTA1IDIuOTI3MjksLTIuMzgzMjYgMy43MjMwNSwtMC41NTc3bDEuNjg3NDgsMy44NjEwNWMwLjczOTg5LDEuNjk4NzYgMi4zMjkxOSwyLjg3Mzk1IDQuMTY3MTksMy4wODQwNmw0LjE4NTU5LDAuNDc5MDZjMS45NzkwNSwwLjIyODkgMi4zODMyNywyLjkyNzMxIDAuNTU4MTUsMy43MjYwNmwtMy44NjE1MSwxLjY4NDQ3Yy0xLjY5NTc2LDAuNzM5NDMgLTIuODcwOTQsMi4zMjg3NCAtMy4wODEwNSw0LjE2Njc0bC0wLjQ4MjA2LDQuMTg2MDVjLTAuMjI1OTEsMS45Nzg2IC0yLjkyNDMxLDIuMzgyODIgLTMuNzIzMDYsMC41NTc2OWwtMS42ODQ0OCwtMy44NjE1MWMtMC43Mzk0MywtMS42OTU3NiAtMi4zMjg3NCwtMi44NzA5NCAtNC4xNjk3MywtMy4wODA2bC00LjE4NTU4LC0wLjQ3OTA2Yy0xLjk3OTA1LC0wLjIyODkgLTIuMzgzMjgsLTIuOTI3MzEgLTAuNTU4MTYsLTMuNzI2MDV6Ii8+PC9nPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiPjxwYXRoIGQ9Ik0xOTUuMzExODksMTkyLjgzNDM2YzEuNDQzNTMsLTEuNTYwOCAxLjk0NTI0LC0zLjc3MjU1IDEuMzE2NDQsLTUuODAzNDNsLTEuNDI3MDUsLTQuNjE4NGMtMC42NzIyMywtMi4xODQ4MSAxLjk3NjM1LC0zLjg1Mzk2IDMuNjU0MzIsLTIuMzAyOThsMy41NTM1OSwzLjI3ODI2YzEuNTYwOCwxLjQ0MzUzIDMuNzcyNTUsMS45NDUyMyA1LjgwMDQ5LDEuMzE4MzFsNC42MTg0MSwtMS40MjcwNWMyLjE4NDgxLC0wLjY3MjI0IDMuODUzOTcsMS45NzYzNSAyLjMwNDgzLDMuNjU3MjdsLTMuMjgwMTIsMy41NTA2NWMtMS40NDA1OCwxLjU1ODkzIC0xLjk0MjI5LDMuNzcwNjkgLTEuMzE1MzYsNS43OTg2MmwxLjQyNDEsNC42MjAyN2MwLjY3NTE3LDIuMTgyOTYgLTEuOTczNCwzLjg1MjExIC0zLjY1NDMyLDIuMzAyOTdsLTMuNTUwNjUsLTMuMjgwMTJjLTEuNTU4OTMsLTEuNDQwNTggLTMuNzcwNjgsLTEuOTQyMjggLTUuODAxNTcsLTEuMzEzNWwtNC42MTg0MSwxLjQyNzA1Yy0yLjE4NDgxLDAuNjcyMjQgLTMuODUzOTcsLTEuOTc2MzUgLTIuMzA0ODMsLTMuNjU3Mjd6Ii8+PC9nPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiPjxwYXRoIGQ9Ik0yMzMuNDk5MDMsMjE4LjQxODAxYzEuMzA5NjYsLTAuNzczNzMgMi4xMDczLC0yLjE4Njg1IDIuMDkyOTEsLTMuNzA3OTJsLTAuMDMwNzQsLTMuNDU4NDdjLTAuMDEyNTgsLTEuNjM1NDkgMi4xNDUzMywtMi4yMzYyOCAyLjk3NzM0LC0wLjgyODkxbDEuNzYzMjksMi45NzYwOWMwLjc3MzczLDEuMzA5NjYgMi4xODY4NSwyLjEwNzI5IDMuNzA1NTIsMi4wOTM1OWwzLjQ1ODQ3LC0wLjAzMDczYzEuNjM1NDksLTAuMDEyNTggMi4yMzYyOSwyLjE0NTMzIDAuODI5NTksMi45Nzk3M2wtMi45NzY3OCwxLjc2MDljLTEuMzA3MjUsMC43NzMwNiAtMi4xMDQ5LDIuMTg2MTggLTIuMDkxMTgsMy43MDQ4NmwwLjAyODMzLDMuNDU5MTVjMC4wMTQ5NywxLjYzNDgzIC0yLjE0MjkzLDIuMjM1NjEgLTIuOTc3MzMsMC44Mjg5MWwtMS43NjA5LC0yLjk3Njc5Yy0wLjc3MzA2LC0xLjMwNzI1IC0yLjE4NjE4LC0yLjEwNDg5IC0zLjcwNzI1LC0yLjA5MDUybC0zLjQ1ODQ2LDAuMDMwNzRjLTEuNjM1NDksMC4wMTI1OCAtMi4yMzYyOSwtMi4xNDUzMyAtMC44Mjk1OSwtMi45Nzk3M3oiLz48L2c+PGcgZmlsbD0iI2ZmZmZmZiIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMCI+PHBhdGggZD0iTTI2OS40NzcwMywyMTQuNzA0NTFsLTAuMjUwNDksLTAuMjUwNWMtMC4wMDA1NCwtMC4wMDA1MyAtMC4wMDEwNywtMC4wMDEwNyAtMC4wMDE2MSwtMC4wMDE2bC0wLjAwMDAyLC0wLjAwMDAybC0yNi4xNDA1OSwtMjYuMTQxNDVjLTIuOTc1NzcsMi4wNDU2NCAtNi43NzEyMiwyLjg3NTM5IC0xMC41NjI0NywxLjk4MDE1Yy02LjQ0MTUzLC0xLjUyMTA1IC0xMC42NjYzOCwtNy41MDEyIC0xMC4xNzc0NiwtMTMuODk5NDljLTAuMzI3NjksMC4wMjQyNSAtMC42NTg3LDAuMDM2NTkgLTAuOTkyNTksMC4wMzY1OWMtNy4zMjMzNywwIC0xMy4yNjAyMiwtNS45MzY4NSAtMTMuMjYwMjIsLTEzLjI2MDIyYzAsLTIuNzkwNzEgMC44NjIxMiwtNS4zODAwNyAyLjMzNDU0LC03LjUxNjMxbC0xLjM3Njg4LC0xLjM3NjkzYy0wLjk0MDcxLC0wLjk0MDcxIC0wLjk0MDcxLC0yLjQ2ODYxIDAsLTMuNDA5MzJjMC45NDA3MSwtMC45NDA3MSAyLjQ2ODYxLC0wLjk0MDcxIDMuNDA5MzIsMGwwLjI0ODA3LDAuMjQ4MDdjMC4wMDEzNSwwLjAwMTM0IDAuMDAyNjksMC4wMDI2OCAwLjAwNDA0LDAuMDA0MDNsMS4xMjQ4LDEuMTI0OGMyLjEzNjIzLC0xLjQ3MjQ0IDQuNzI1NjEsLTIuMzM0NTcgNy41MTYzNCwtMi4zMzQ1N2M3LjMyMzM3LDAgMTMuMjYwMjIsNS45MzY4NSAxMy4yNjAyMiwxMy4yNjAyMmMwLDAuMzMzNDYgLTAuMDEyMzEsMC42NjQwNCAtMC4wMzY1LDAuOTkxMzJjMS4zMjIyNSwtMC4wOTg5OSAyLjY4MTkyLDAuMDAwMjYgNC4wNDEwNCwwLjMyMTJjNy4xMjc0MSwxLjY4MzAxIDExLjU0MDk1LDguODI1MjYgOS44NTc5NSwxNS45NTI2NmMtMC4zODk0OSwxLjY0OTQ3IC0xLjA3MTM3LDMuMTUzNTkgLTEuOTc3NzksNC40NzA0M2wyNi4zODk2MywyNi4zODk2M2MwLjk0MDcxLDAuOTQwNzEgMC45NDA3MSwyLjQ2ODYyIDAsMy40MDkzM2MtMC40NzEzMywwLjQ2OTM3IC0xLjA4Nzk5LDAuNzA2OTkgLTEuNzA0NjUsMC43MDY5OWgtMC4wMDAwMWMtMC42MTY2NywwIC0xLjIzMzMyLC0wLjIzNTY2IC0xLjcwNDY1LC0wLjcwNTA0eiIvPjxwYXRoIGQ9Ik0yMjEuMzUxOCwxNzYuNDI4MmMtNy4zMjMzNywwIC0xMy4yNjAyMiwtNS45MzY4NSAtMTMuMjYwMjIsLTEzLjI2MDIyYzAsLTIuNzkwNzEgMC44NjIxMSwtNS4zODAwNyAyLjMzNDUzLC03LjUxNjMxbC0xLjEyNDc4LC0xLjEyNDgxYy0wLjQ3MDM2LC0wLjQ3MDM2IC0wLjcwNTUzLC0xLjA4NzUxIC0wLjcwNTUzLC0xLjcwNDY3YzAsLTAuNjE3MTYgMC4yMzUxNywtMS4yMzQzMSAwLjcwNTUzLC0xLjcwNDY3YzAuOTQwNzEsLTAuOTQwNzEgMi40Njg2MiwtMC45NDA3MSAzLjQwOTMzLDBsMS4xMjQ4LDEuMTI0OGMyLjEzNjIzLC0xLjQ3MjQ0IDQuNzI1NjEsLTIuMzM0NTcgNy41MTYzNCwtMi4zMzQ1N2M3LjMyMzM3LDAgMTMuMjYwMjIsNS45MzY4NSAxMy4yNjAyMiwxMy4yNjAyMmMwLDIuNzkwNzMgLTAuODYyMTMsNS4zODAxIC0yLjMzNDU3LDcuNTE2MzRsMTAuNDkwMTIsMTAuNDkwMTJjMi4xMzYyMywtMS40NzI0NCA0LjcyNTYxLC0yLjMzNDU1IDcuNTE2MzMsLTIuMzM0NTVjNy4zMjMzNywwIDEzLjI2MjE4LDUuOTM4ODIgMTMuMjYyMTgsMTMuMjYwMjJjMCwyLjc5MDkgLTAuODYyNTIsNS4zODA3MSAtMi4zMzU0Nyw3LjUxNzM3bDExLjY3NTc1LDExLjY3NTc1YzAuOTQwNzEsMC45NDA3MSAwLjk0MDcxLDIuNDY4NjIgMCwzLjQwOTMzYy0wLjQ3MTMzLDAuNDY5MzcgLTEuMDg3OTksMC43MDY5OSAtMS43MDQ2NSwwLjcwNjk5aC0wLjAwMDAxYy0wLjYxNjY3LDAgLTEuMjMzMzIsLTAuMjM1NjYgLTEuNzA0NjUsLTAuNzA1MDRsLTAuMDAwMDIsMC4wMDAwMWwtMTEuNjc2NjksLTExLjY3NzA3Yy0yLjEzNjQ4LDEuNDcyNTYgLTQuNzI1OTUsMi4zMzQ4MyAtNy41MTY0NCwyLjMzNDgzYy03LjMyMzM3LDAgLTEzLjI2MDIyLC01LjkzODgxIC0xMy4yNjAyMiwtMTMuMjYyMThjMCwtMi43OTA0OCAwLjg2MTk3LC01LjM3OTY0IDIuMzM0MTYsLTcuNTE1NzZsLTEwLjQ5MDA5LC0xMC40OTA0M2MtMi4xMzYxNiwxLjQ3MjI4IC00LjcyNTQsMi4zMzQyOSAtNy41MTU5NSwyLjMzNDI5eiIvPjxwYXRoIGQ9Ik0yNjkuNDc3MDMsMjE0LjcwNDUxbC0wLjU3MTk2LC0wLjU3MTk4bC0xNC4xOTY1MSwtMTQuMTk2NTFjLTAuMDEwMSwtMC4wMTAwOCAtMC4wMjAwOCwtMC4wMjAyMiAtMC4wMjk5NiwtMC4wMzA0M2wtMjUuODEwODUsLTI1LjgxMTY5Yy0yLjEzNjE2LDEuNDcyMjggLTQuNzI1NCwyLjMzNDMgLTcuNTE1OTUsMi4zMzQzYy03LjMyMzM3LDAgLTEzLjI2MDIyLC01LjkzNjg1IC0xMy4yNjAyMiwtMTMuMjYwMjJjMCwtMi43OTA3MSAwLjg2MjEyLC01LjM4MDA3IDIuMzM0NTQsLTcuNTE2MzFsLTEuMTI0NzgsLTEuMTI0ODJjLTAuNDcwMzYsLTAuNDcwMzYgLTAuNzA1NTMsLTEuMDg3NTEgLTAuNzA1NTMsLTEuNzA0NjZjMCwtMC42MTcxNSAwLjIzNTE4LC0xLjIzNDMxIDAuNzA1NTMsLTEuNzA0NjZjMC45NDA3MSwtMC45NDA3MSAyLjQ2ODYyLC0wLjk0MDcxIDMuNDA5MzMsMGwxLjEyNDgsMS4xMjQ4YzIuMTM2MjMsLTEuNDcyNDQgNC43MjU2MSwtMi4zMzQ1NyA3LjUxNjM0LC0yLjMzNDU3YzcuMzIzMzcsMCAxMy4yNjAyMiw1LjkzNjg1IDEzLjI2MDIyLDEzLjI2MDIyYzAsMi43OTA3MyAtMC44NjIxMyw1LjM4MDEgLTIuMzM0NTcsNy41MTYzNGw0MC42MDg5LDQwLjYwODljMC45NDA3MSwwLjk0MDcxIDAuOTQwNzEsMi40Njg2MiAwLDMuNDA5MzNjLTAuNDcxMzMsMC40NjkzNyAtMS4wODc5OSwwLjcwNjk5IC0xLjcwNDY1LDAuNzA2OTloLTAuMDAwMDFjLTAuNjE2NjcsMCAtMS4yMzMzMiwtMC4yMzU2NiAtMS43MDQ2NSwtMC43MDUwNHoiLz48L2c+PGcgZmlsbD0iI2ZmZmZmZiIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSI+PHBhdGggZD0iTTIzNS42Njg4MywxNDAuNDY4NWMwLjY4NzMyLC0xLjI2ODI1IDAuNjQ2MjcsLTIuODA2NTMgLTAuMTA3NzIsLTQuMDM2MzFsLTEuNzEyNzUsLTIuNzk3MTNjLTAuODA4MzYsLTEuMzIzNyAwLjY1MzA3LC0yLjg2NTI4IDIuMDE2MzksLTIuMTI2OTZsMi44ODYxMSwxLjU1OTRjMS4yNjgyNSwwLjY4NzMyIDIuODA2NTMsMC42NDYyNyA0LjAzNDcsLTAuMTA2bDIuNzk3MTMsLTEuNzEyNzVjMS4zMjM3LC0wLjgwODM2IDIuODY1MjksMC42NTMwNyAyLjEyODY4LDIuMDE4MDFsLTEuNTYxMTIsMi44ODQ1Yy0wLjY4NTY5LDEuMjY2NTQgLTAuNjQ0NjQsMi44MDQ4MiAwLjEwNzYzLDQuMDMyOThsMS43MTExMywyLjc5ODg1YzAuODA5OTksMS4zMjE5OSAtMC42NTE0NSwyLjg2MzU3IC0yLjAxNjM5LDIuMTI2OTZsLTIuODg0NTEsLTEuNTYxMTNjLTEuMjY2NTQsLTAuNjg1NjkgLTIuODA0ODEsLTAuNjQ0NjMgLTQuMDM0NiwwLjEwOTM1bC0yLjc5NzExLDEuNzEyNzRjLTEuMzIzNywwLjgwODM2IC0yLjg2NTI5LC0wLjY1MzA3IC0yLjEyODY3LC0yLjAxODAxeiIvPjwvZz48L2c+PC9nPjwvc3ZnPg==";

  const vm = Scratch.vm;
  const runtime = vm.runtime;

  let sprite = true;
  let nameOffset = 0;
  let displacementSrCs = [];
  let maskOptions = [0, 0, 100];
  let allFilters = [];
  /* 
    Note: Canvas Filter Application
    The reason I use: "Scratch.renderer.canvas.parentNode.parentNode.parentNode"

    Is due to the "Canvas Effects" Extension not allowing other extensions
    to apply effects to the Canvas. I use 2 other parentNodes because the
    filter attributes are amplified for some reason :/
  */
  let canvas = Scratch.renderer.canvas.parentNode.parentNode.parentNode;

  // This function was ripped from Looks Plus by Lily
  const requireNonPackagedRuntime = () => {
    if (runtime.isPackaged) {
      alert(`For Sprite Effects Blocks to work, the creator of the packaged project must uncheck "Remove raw asset data after loading to save RAM" under advanced settings in the packager.`);
      return false;
    }
    return true;
  };

  class SPspriteEffects {
    getInfo() {
      return {
        id: "SPspriteEffects",
        name: "Sprite Effects",
        color1: "#9966FF",
        color2: "#774DCB",
        menuIconURI,
        blocks: [
          {
            func: "sourceSwitch",
            blockType: Scratch.BlockType.BUTTON,
            text: "Switch Effect Sources"
          },
          { blockType: Scratch.BlockType.LABEL, text: "Filters and Effects" },
          {
            opcode: "setSpriteBlend",
            blockType: Scratch.BlockType.REPORTER,
            text: "set blend mode of [SPRITE] to [BLEND]",
            hideFromPalette: !sprite,
            arguments: {
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
              BLEND: { type: Scratch.ArgumentType.STRING, menu: "BLENDING" },
            },
          },
          {
            opcode: "setImageBlend",
            blockType: Scratch.BlockType.REPORTER,
            text: "set blend mode of [SPRITE] to [BLEND]",
            hideFromPalette: sprite,
            arguments: {
              SPRITE: { type: Scratch.ArgumentType.STRING, defaultValue: "data URI or <svg content>" },
              BLEND: { type: Scratch.ArgumentType.STRING, menu: "BLENDING" },
            },
          },
          {
            opcode: "setSpriteEffect",
            blockType: Scratch.BlockType.REPORTER,
            text: "apply [EFFECT] effect to [SPRITE] at [NUM]%",
            hideFromPalette: !sprite,
            arguments: {
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
              EFFECT: { type: Scratch.ArgumentType.STRING, menu: "EFFECTS" },
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 15 }
            },
          },
          {
            opcode: "setImageEffect",
            blockType: Scratch.BlockType.REPORTER,
            text: "apply [EFFECT] effect to [SPRITE] at [NUM]%",
            hideFromPalette: sprite,
            arguments: {
              SPRITE: { type: Scratch.ArgumentType.STRING, defaultValue: "data URI or <svg content>" },
              EFFECT: { type: Scratch.ArgumentType.STRING, menu: "EFFECTS" },
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 15 }
            },
          },
          {
            opcode: "setSpriteMotion",
            blockType: Scratch.BlockType.REPORTER,
            text: "apply motion blur to [SPRITE] at x [X] y [Y]",
            hideFromPalette: !sprite,
            arguments: {
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 15 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            },
          },
          {
            opcode: "setImageMotion",
            blockType: Scratch.BlockType.REPORTER,
            text: "apply motion blur to [SPRITE] at x [X]% y [Y]%",
            hideFromPalette: sprite,
            arguments: {
              SPRITE: { type: Scratch.ArgumentType.STRING, defaultValue: "data URI or <svg content>" },
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 15 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            },
          },
          {
            opcode: "hueSprite",
            blockType: Scratch.BlockType.REPORTER,
            text: "apply hue [COLOR] to [SPRITE]",
            hideFromPalette: !sprite,
            arguments: {
              COLOR: { type: Scratch.ArgumentType.COLOR, defaultValue: "#ff0000" },
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" }
            },
          },
          {
            opcode: "hueImage",
            blockType: Scratch.BlockType.REPORTER,
            text: "apply hue [COLOR] to [SPRITE]",
            hideFromPalette: sprite,
            arguments: {
              COLOR: { type: Scratch.ArgumentType.COLOR, defaultValue: "#ff0000" },
              SPRITE: { type: Scratch.ArgumentType.STRING, defaultValue: "data URI or <svg content>" }
            },
          },
          {
            opcode: "splitSprite",
            blockType: Scratch.BlockType.REPORTER,
            text: "apply [EFFECT] effect to [SPRITE] at x [X] y [Y] with colors [COLOR1] [COLOR2] and [COLOR3]",
            hideFromPalette: !sprite,
            arguments: {
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
              COLOR1: { type: Scratch.ArgumentType.COLOR, defaultValue: "#ff0000" },
              COLOR2: { type: Scratch.ArgumentType.COLOR, defaultValue: "#00ff00" },
              COLOR3: { type: Scratch.ArgumentType.COLOR, defaultValue: "#0000ff" },
              EFFECT: { type: Scratch.ArgumentType.STRING, menu: "SPLITTING" },
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 15 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            },
          },
          {
            opcode: "splitImage",
            blockType: Scratch.BlockType.REPORTER,
            text: "apply [EFFECT] effect to [SPRITE] at x [X] y [Y] with colors [COLOR1] [COLOR2] and [COLOR3]",
            hideFromPalette: sprite,
            arguments: {
              SPRITE: { type: Scratch.ArgumentType.STRING, defaultValue: "data URI or <svg content>" },
              COLOR1: { type: Scratch.ArgumentType.COLOR, defaultValue: "#ff0000" },
              COLOR2: { type: Scratch.ArgumentType.COLOR, defaultValue: "#00ff00" },
              COLOR3: { type: Scratch.ArgumentType.COLOR, defaultValue: "#0000ff" },
              EFFECT: { type: Scratch.ArgumentType.STRING, menu: "SPLITTING" },
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 15 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            },
          },
          {
            opcode: "applyCustomSprite",
            blockType: Scratch.BlockType.REPORTER,
            text: "apply [EFFECT] effect with ID [ID] to [SPRITE]",
            hideFromPalette: !sprite,
            arguments: {
              EFFECT: { type: Scratch.ArgumentType.STRING, defaultValue: "custom-svg-filter" },
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "my-filter" },
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" }
            },
          },
          {
            opcode: "applyCustomImage",
            blockType: Scratch.BlockType.REPORTER,
            text: "apply [EFFECT] effect with ID [ID] to [SPRITE]",
            hideFromPalette: sprite,
            arguments: {
              EFFECT: { type: Scratch.ArgumentType.STRING, defaultValue: "custom-svg-filter" },
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "my-filter" },
              SPRITE: { type: Scratch.ArgumentType.STRING, defaultValue: "data URI or <svg content>" }
            },
          },
          "---",
          {
            opcode: "waveSprite",
            blockType: Scratch.BlockType.REPORTER,
            text: "apply wave effect to [SPRITE] on [axis] with seed [SEED] at x [NUM] y [Y]",
            hideFromPalette: !sprite,
            arguments: {
              axis: { type: Scratch.ArgumentType.STRING, menu: "AXISES" },
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 },
              SEED: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 }
            },
          },
          {
            opcode: "waveImage",
            blockType: Scratch.BlockType.REPORTER,
            text: "apply wave effect to [SPRITE] on [axis] with seed [SEED] at [NUM] y [Y]",
            hideFromPalette: sprite,
            arguments: {
              SPRITE: { type: Scratch.ArgumentType.STRING, defaultValue: "data URI or <svg content>" },
              axis: { type: Scratch.ArgumentType.STRING, menu: "AXISES" },
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 },
              SEED: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 }
            },
          },
          {
            opcode: "glitchSprite",
            blockType: Scratch.BlockType.REPORTER,
            text: "apply glitch effect to [SPRITE] with [LINE] lines offset x [X] y [Y] thickness [NUM] on [axis]",
            hideFromPalette: !sprite,
            arguments: {
              axis: { type: Scratch.ArgumentType.STRING, menu: "AXISES" },
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS2" },
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 },
              LINE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 },
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            },
          },
          {
            opcode: "glitchImage",
            blockType: Scratch.BlockType.REPORTER,
            text: "apply glitch effect to [SPRITE] with [LINE] lines offset x [X] y [Y] thickness [NUM] on [axis]",
            hideFromPalette: sprite,
            arguments: {
              SPRITE: { type: Scratch.ArgumentType.STRING, defaultValue: "data URI or <svg content>" },
              axis: { type: Scratch.ArgumentType.STRING, menu: "AXISES" },
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 },
              LINE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 },
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            },
          },
          {
            opcode: "tileSprite",
            blockType: Scratch.BlockType.REPORTER,
            text: "apply mosaic effect to [SPRITE] at x [x] y [y] size [NUM]%",
            hideFromPalette: !sprite,
            arguments: {
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 15 },
              x: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            },
          },
          {
            opcode: "tileImage",
            blockType: Scratch.BlockType.REPORTER,
            text: "apply mosaic effect to [SPRITE] at x [x] y [y] size [NUM]%",
            hideFromPalette: sprite,
            arguments: {
              SPRITE: { type: Scratch.ArgumentType.STRING, defaultValue: "data URI or <svg content>" },
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 15 },
              x: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            },
          },
          {
            opcode: "vhsSprite",
            blockType: Scratch.BlockType.REPORTER,
            text: "apply vhs effect to [SPRITE] offset x [X] y [Y] on [axis] at [NUM]%",
            hideFromPalette: !sprite,
            arguments: {
              axis: { type: Scratch.ArgumentType.STRING, menu: "AXISES" },
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS2" },
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 },
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            },
          },
          {
            opcode: "vhsImage",
            blockType: Scratch.BlockType.REPORTER,
            text: "apply vhs effect to [SPRITE] offset x [X] y [Y] on [axis] at [NUM]%",
            hideFromPalette: sprite,
            arguments: {
              SPRITE: { type: Scratch.ArgumentType.STRING, defaultValue: "data URI or <svg content>" },
              axis: { type: Scratch.ArgumentType.STRING, menu: "AXISES" },
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 },
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            },
          },
          "---",
          {
            opcode: "distortSprite",
            blockType: Scratch.BlockType.REPORTER,
            text: "apply [EFFECT] distortion to [SPRITE] at x [X] y [Y] at [NUM]%",
            hideFromPalette: !sprite,
            arguments: {
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS2" },
              EFFECT: { type: Scratch.ArgumentType.STRING, menu: "DISTORTION" },
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 },
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            },
          },
          {
            opcode: "distortImage",
            blockType: Scratch.BlockType.REPORTER,
            text: "apply [EFFECT] distortion to [SPRITE] at x [X] y [Y] at [NUM]%",
            hideFromPalette: sprite,
            arguments: {
              SPRITE: { type: Scratch.ArgumentType.STRING, defaultValue: "data URI or <svg content>" },
              EFFECT: { type: Scratch.ArgumentType.STRING, menu: "DISTORTION" },
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 },
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            },
          },
          {
            opcode: "distortSpriteImage",
            blockType: Scratch.BlockType.REPORTER,
            text: "apply [EFFECT] distortion to [SPRITE] at x [X] y [Y] at [NUM]%",
            hideFromPalette: !sprite,
            arguments: {
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS2" },
              EFFECT: { type: Scratch.ArgumentType.STRING, defaultValue: "data URI or <svg content>" },
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 },
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            },
          },
          {
            opcode: "distortImageImage",
            blockType: Scratch.BlockType.REPORTER,
            text: "apply [EFFECT] distortion to [SPRITE] at x [X] y [Y] at [NUM]%",
            hideFromPalette: sprite,
            arguments: {
              SPRITE: { type: Scratch.ArgumentType.STRING, defaultValue: "data URI or <svg content>" },
              EFFECT: { type: Scratch.ArgumentType.STRING, defaultValue: "data URI or <svg content>" },
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 },
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            },
          },
          {
            opcode: "distortPreset",
            blockType: Scratch.BlockType.REPORTER,
            text: "distortion [TYPE] preset",
            arguments: {
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "DISTORTION" }
            },
          },
          { blockType: Scratch.BlockType.LABEL, text: "Formatting" },
          {
            opcode: "outlineSprite",
            blockType: Scratch.BlockType.REPORTER,
            text: "add [OUTLINE] outline to [SPRITE] at [NUM]% colored [COLOR]",
            hideFromPalette: !sprite,
            arguments: {
              OUTLINE: { type: Scratch.ArgumentType.STRING, menu: "OUTLINES" },
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 },
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
              COLOR: { type: Scratch.ArgumentType.COLOR, defaultValue: "#ff0000" }
            },
          },
          {
            opcode: "outlineImage",
            blockType: Scratch.BlockType.REPORTER,
            text: "add [OUTLINE] outline to [SPRITE] at [NUM]% colored [COLOR]",
            hideFromPalette: sprite,
            arguments: {
              OUTLINE: { type: Scratch.ArgumentType.STRING, menu: "OUTLINES" },
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 },
              SPRITE: { type: Scratch.ArgumentType.STRING, defaultValue: "data URI or <svg content>" },
              COLOR: { type: Scratch.ArgumentType.COLOR, defaultValue: "#ff0000" }
            },
          },
          {
            opcode: "spriteShadow",
            blockType: Scratch.BlockType.REPORTER,
            text: "add shadow to [SPRITE] at x [X] y [Y] colored [COLOR] at [NUM]%",
            hideFromPalette: !sprite,
            arguments: {
              COLOR: { type: Scratch.ArgumentType.COLOR, defaultValue: "#ff0000" },
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 15 },
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            },
          },
          {
            opcode: "imageShadow",
            blockType: Scratch.BlockType.REPORTER,
            text: "add shadow to [SPRITE] at x [X] y [Y] colored [COLOR] at [NUM]%",
            hideFromPalette: sprite,
            arguments: {
              COLOR: { type: Scratch.ArgumentType.COLOR, defaultValue: "#ff0000" },
              SPRITE: { type: Scratch.ArgumentType.STRING, defaultValue: "data URI or <svg content>" },
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 15 },
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            },
          },
          {
            opcode: "applySpriteLight",
            blockType: Scratch.BlockType.REPORTER,
            text: "add lighting to [SPRITE] tinted [COLOR] at x [X] y [Y] at [NUM]%",
            hideFromPalette: !sprite,
            arguments: {
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS2" },
              COLOR: { type: Scratch.ArgumentType.COLOR, defaultValue: "#ff0000" },
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 },
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            },
          },
          {
            opcode: "applyImageLight",
            blockType: Scratch.BlockType.REPORTER,
            text: "add lighting to [SPRITE] tinted [COLOR] at x [X] y [Y] at [NUM]%",
            hideFromPalette: sprite,
            arguments: {
              SPRITE: { type: Scratch.ArgumentType.STRING, defaultValue: "data URI or <svg content>" },
              COLOR: { type: Scratch.ArgumentType.COLOR, defaultValue: "#ff0000" },
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 },
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            },
          },
          {
            opcode: "advSpriteLight",
            blockType: Scratch.BlockType.REPORTER,
            text: "apply light to [SPRITE] using map [MAP] with mode [BLEND]",
            hideFromPalette: !sprite,
            arguments: {
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS2" },
              BLEND: { type: Scratch.ArgumentType.STRING, menu: "BLENDING2" },
              MAP: { type: Scratch.ArgumentType.STRING, defaultValue: "data URI or <svg content>" }
            },
          },
          {
            opcode: "advImageLight",
            blockType: Scratch.BlockType.REPORTER,
            text: "apply light to [SPRITE] using map [MAP] with mode [BLEND]",
            hideFromPalette: sprite,
            arguments: {
              SPRITE: { type: Scratch.ArgumentType.STRING, defaultValue: "data URI or <svg content>" },
              BLEND: { type: Scratch.ArgumentType.STRING, menu: "BLENDING2" },
              MAP: { type: Scratch.ArgumentType.STRING, defaultValue: "data URI or <svg content>" }
            },
          },
          "---",
          {
            opcode: "maskSprite",
            blockType: Scratch.BlockType.REPORTER,
            text: "mask [TYPE] [SPRITE2] from [SPRITE]",
            hideFromPalette: !sprite,
            arguments: {
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS2" },
              SPRITE2: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "MASKING" }
            },
          },
          {
            opcode: "maskImage",
            blockType: Scratch.BlockType.REPORTER,
            text: "mask [TYPE] [SPRITE2] from [SPRITE]",
            hideFromPalette: sprite,
            arguments: {
              SPRITE: { type: Scratch.ArgumentType.STRING, defaultValue: "data URI or <svg content>" },
              SPRITE2: { type: Scratch.ArgumentType.STRING, defaultValue: "data URI or <svg content>" },
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "MASKING" }
            },
          },
          {
            opcode: "setMaskXY",
            blockType: Scratch.BlockType.COMMAND,
            text: "set mask x [x] y [y]",
            arguments: {
              x: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            },
          },
          {
            opcode: "setMaskSZ",
            blockType: Scratch.BlockType.COMMAND,
            text: "set mask size to [SIZE]%",
            arguments: {
              SIZE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 }
            },
          },
          {
            opcode: "maskATT",
            blockType: Scratch.BlockType.REPORTER,
            text: "current [ATT] of mask",
            disableMonitor: true,
            arguments: {
              ATT: { type: Scratch.ArgumentType.STRING, menu: "maskATTs" }
            },
          },
          "---",
          {
            opcode: "unClipSPR",
            blockType: Scratch.BlockType.REPORTER,
            text: "resize viewbox of [SPRITE] by [NUM]%",
            arguments: {
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 }
            },
          },
          {
            opcode: "unClipIMG",
            blockType: Scratch.BlockType.REPORTER,
            text: "resize viewbox of [SPRITE] by [NUM]%",
            arguments: {
              SPRITE: { type: Scratch.ArgumentType.STRING, defaultValue: "data URI or <svg content>" },
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 }
            },
          },
          "---",
          {
            opcode: "setXY",
            blockType: Scratch.BlockType.REPORTER,
            text: "set [SPRITE] x [x] y [y]",
            hideFromPalette: !sprite,
            arguments: {
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
              x: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            },
          },
          {
            opcode: "setXY2",
            blockType: Scratch.BlockType.REPORTER,
            text: "set [SPRITE] x [x] y [y]",
            hideFromPalette: sprite,
            arguments: {
              SPRITE: { type: Scratch.ArgumentType.STRING, defaultValue: "data URI or <svg content>" },
              x: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            },
          },
          {
            opcode: "setDIR",
            blockType: Scratch.BlockType.REPORTER,
            text: "point [SPRITE] in direction [DIR]",
            hideFromPalette: !sprite,
            arguments: {
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
              DIR: { type: Scratch.ArgumentType.NUMBER, defaultValue: 90 }
            },
          },
          {
            opcode: "setDIR2",
            blockType: Scratch.BlockType.REPORTER,
            text: "point [SPRITE] in direction [DIR]",
            hideFromPalette: sprite,
            arguments: {
              SPRITE: { type: Scratch.ArgumentType.STRING, defaultValue: "data URI or <svg content>" },
              DIR: { type: Scratch.ArgumentType.NUMBER, defaultValue: 90 }
            },
          },
          {
            opcode: "setSCALE",
            blockType: Scratch.BlockType.REPORTER,
            text: "stretch [SPRITE] to x [x] y [y]",
            hideFromPalette: !sprite,
            arguments: {
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
              x: { type: Scratch.ArgumentType.NUMBER, defaultValue: 200 },
              y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 }
            },
          },
          {
            opcode: "setSCALE2",
            blockType: Scratch.BlockType.REPORTER,
            text: "stretch [SPRITE] to x [x] y [y]",
            hideFromPalette: sprite,
            arguments: {
              SPRITE: { type: Scratch.ArgumentType.STRING, defaultValue: "data URI or <svg content>" },
              x: { type: Scratch.ArgumentType.NUMBER, defaultValue: 200 },
              y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 }
            },
          },
          {
            opcode: "setSKEW",
            blockType: Scratch.BlockType.REPORTER,
            text: "skew [SPRITE] to x [x] y [y]",
            hideFromPalette: !sprite,
            arguments: {
              SPRITE: { type: Scratch.ArgumentType.STRING, menu: "TARGETS" },
              x: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
              y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            },
          },
          {
            opcode: "setSKEW2",
            blockType: Scratch.BlockType.REPORTER,
            text: "skew [SPRITE] to x [x] y [y]",
            hideFromPalette: sprite,
            arguments: {
              SPRITE: { type: Scratch.ArgumentType.STRING, defaultValue: "data URI or <svg content>" },
              x: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
              y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            },
          },
          { blockType: Scratch.BlockType.LABEL, text: "Canvas Filters" },
          {
            func: "filterWarn",
            blockType: Scratch.BlockType.BUTTON,
            text: "Canvas Filter Disclaimer"
          },
          {
            opcode: "addCanvasFilter",
            blockType: Scratch.BlockType.COMMAND,
            text: "apply filter [FILTER] to canvas with name [NAME]",
            arguments: {
              FILTER: { type: Scratch.ArgumentType.STRING, defaultValue: "insert sprite/custom filter" },
              NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "filter-1" }
            },
          },
          {
            opcode: "removeCanvasFilter",
            blockType: Scratch.BlockType.COMMAND,
            text: "remove filter named [NAME] from canvas",
            arguments: {
              NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "filter-1" }
            },
          },
          {
            opcode: "removeAllFilters",
            blockType: Scratch.BlockType.COMMAND,
            text: "remove all canvas filters"
          },
          {
            func: "canvasWarn",
            blockType: Scratch.BlockType.BUTTON,
            text: "Canvas Effects Compatibility"
          },
          {
            opcode: "toggleCompat",
            blockType: Scratch.BlockType.COMMAND,
            text: "toggle compatibility with Canvas Effects [ON_OFF]",
            arguments: {
              ON_OFF: { type: Scratch.ArgumentType.STRING, menu: "TOGGLE" }
            },
          }
        ],
        menus: {
          TARGETS: { acceptReporters: true, items: this.getTargets(false) },
          TARGETS2: { acceptReporters: true, items: this.getTargets(true) },
          EFFECTS: {
            acceptReporters: true,
            items: [
              "blur", "saturation", "contrast", "sepia", "bloom",
              "bloom v2", "amplify", "discrete", "thermal",
              "posterize", "inflate", "bevel", "liquify", "ripple",
              "erode", "torn", "disolve", "displacement", "grain"
            ],
          },
          DISTORTION: {
            acceptReporters: true,
            items: ["bulge", "whirl", "ripple", "shockwave"]
          },
          maskATTs: {
            acceptReporters: false,
            items: [
              {"text":"x position", "value":"0"},
              {"text":"y position", "value":"1"},
              {"text":"size", "value":"2"}
            ]
          },
          OUTLINES: { acceptReporters: true, items: ["filled", "solid"] },
          AXISES: { acceptReporters: false, items: ["x axis", "y axis", "both axes"] },
          SPLITTING: { acceptReporters: true, items: ["color split", "abberation", "chromatic aberration"] },
          MASKING: {
            acceptReporters: false,
            items: [{"text":"erase", "value":"out"}, {"text":"overlay", "value":" "}]
          },
          TOGGLE:  ["on", "off"],
          BLENDING: {
            acceptReporters: true,
            items: [
              "normal", "multiply", "screen", "overlay", "exclusion",
              "color-dodge", "color-burn", "hard-light", "soft-light",
              "difference", "luminosity"
            ]
          },
          BLENDING2: {
            acceptReporters: true,
            items: [
              "multiply", "screen", "darken", "lighten",
              "overlay", "hard-light", "soft-light", "difference",
              "exclusion", "hue", "saturation", "color", "luminosity"
            ]
          }
        },
      };
    }

    sourceSwitch() { sprite = sprite ? false : true, Scratch.vm.extensionManager.refreshBlocks() }
    filterWarn() {
      alert(`Unfortunately, due to various limitations, not ALL effects (especially the Formatting Blocks) will work on the Canvas...
        \nYou are welcome to experiment by making your own svg filters and using them on the canvas!`);
    }

    toggleCompat(args) { canvas = args.ON_OFF === "on" ? vm.renderer.canvas.parentNode.parentNode.parentNode : vm.renderer.canvas }
    canvasWarn() {
      alert(`Canvas Effects, created by TheShovel, was coded to not work with extensions like Sprite Effects,
        \nToggling Compatibility "off" will cause Sprite Effects Canvas Filters to not Work with Canvas Effects
        \nToggling Compatibility "on" will cause Sprite Effects Canvas Filters to Work with Canvas Effects, but will have Weird Visual Bugs`);
    }

    setSpriteEffect(args, util) { return this.setMainEffect(args, false, util) }
    async setImageEffect(args) { return await this.setMainEffect(args, true) }

    applyCustomSprite(args, util) { return this.customFilter(args, false, util) }
    async applyCustomImage(args) { return await this.customFilter(args, true) }

    setSpriteMotion(args, util) { return this.motionBlur(args, false, util) }
    async setImageMotion(args) { return await this.motionBlur(args, true) }

    setSpriteBlend(args, util) { return this.blendType(args, false, util) }
    async setImageBlend(args) { return await this.blendType(args, true) }

    hueSprite(args, util) { return this.setHue(args, false, util) }
    async hueImage(args) { return await this.setHue(args, true) }

    spriteShadow(args, util) { return this.addShadow(args, false, util) }
    async imageShadow(args) { return await this.addShadow(args, true) }

    outlineSprite(args, util) { return this.addOutline(args, false, util) }
    async outlineImage(args) { return await this.addOutline(args, true) }

    splitSprite(args, util) { return this.colorSplit(args, false, util) }
    async splitImage(args) { return await this.colorSplit(args, true) }

    waveSprite(args, util) { return this.waveEffect(args, false, util) }
    async waveImage(args) { return await this.waveEffect(args, true) }

    distortSprite(args, util) { return this.setDistort(args, false, false, util) }
    async distortImage(args) { return await this.setDistort(args, true, false) }
    distortSpriteImage(args, util) { return this.setDistort(args, false, true, util) }
    async distortImageImage(args) { return await this.setDistort(args, true, true) }

    glitchSprite(args, util) { return this.setGlitch(args, false, util) }
    async glitchImage(args) { return await this.setGlitch(args, true) }

    tileSprite(args, util) { return this.addTile(args, false, util) }
    async tileImage(args) { return await this.addTile(args, true) }

    vhsSprite(args, util) { return this.setVHS(args, false, util) }
    async vhsImage(args) { return await this.setVHS(args, true) }


    applySpriteLight(args, util) { return this.lighting(args, false, util) }
    async applyImageLight(args) { return await this.lighting(args, true) }
    advSpriteLight(args, util) { return this.advLighting(args, false, util) }
    async advImageLight(args) { return await this.advLighting(args, true) }

    maskSprite(args, util) { return this.mask(args, false, util) }
    async maskImage(args) { return await this.mask(args, true) }

    unClipSPR(args, util) { return this.updateView(args, false, util) }
    async unClipIMG(args) { return await this.updateView(args, true) }

    setXY(args, util) { return this.setATT(args, false, 0, util) }
    async setXY2(args) { return await this.setATT(args, true, 0) }
    setDIR(args, util) { return this.setATT(args, false, 1, util) }
    async setDIR2(args) { return await this.setATT(args, true, 1) }
    setSCALE(args, util) { return this.setATT(args, false, 2, util) }
    async setSCALE2(args) { return await this.setATT(args, true, 2) }
    setSKEW(args, util) { return this.setATT(args, false, 3, util) }
    async setSKEW2(args) { return await this.setATT(args, true, 3) }

    setMaskXY(args) { maskOptions[0] = Scratch.Cast.toNumber(args.x); maskOptions[1] = Scratch.Cast.toNumber(args.y) * -1 }
    setMaskSZ(args) { maskOptions[2] = Scratch.Cast.toNumber(args.SIZE) }
    maskATT(args) { return maskOptions[args.ATT] }

    async setMainEffect(args, isImage, util) {
      let svg;
      if (args.SPRITE === "_myself_") svg = await this.findAsset(util);
      else svg = isImage ? await this.getImage(args.SPRITE) : await this.getSVG(args.SPRITE);
      if (svg) {
        let filterElement;
        let amtIn = args.NUM;
        let scaleFactor;
        let tableValue;
        switch (args.EFFECT) {
          case "saturation":
            filterElement = `<filter id="saturation"><feColorMatrix type="saturate" values="${amtIn / 100}"></feColorMatrix></filter>`;
            break;
          case "sepia":
            scaleFactor = amtIn / 100;
            filterElement = `<filter id="sepia"><feColorMatrix type="matrix" values="${0.393 * scaleFactor} ${0.769 * scaleFactor} ${0.189 * scaleFactor} 0 0 ${0.349 * scaleFactor} ${0.686 * scaleFactor} ${0.168 * scaleFactor} 0 0 ${0.272 * scaleFactor} ${0.534 * scaleFactor} ${0.131 * scaleFactor} 0 0 0 0 0 1 0"></feColorMatrix></filter>`;
            break;
          case "amplify":
            amtIn = amtIn + 100;
            filterElement = `<filter id="amplify"><feComponentTransfer><feFuncR type="linear" slope="${amtIn / 100}"></feFuncR><feFuncG type="linear" slope="${amtIn / 100}"></feFuncG><feFuncB type="linear" slope="${amtIn / 100}"></feFuncB></feComponentTransfer></filter>`;
            break;
          case "inflate":
            filterElement = `<filter id="inflate"><feMorphology in="SourceGraphic" operator="dilate" radius="${Math.abs(amtIn / 10)}"></feMorphology></filter>`;
            break;
          case "contrast":
            amtIn = amtIn + 100;
            filterElement = `<filter id="contrast"><feComponentTransfer><feFuncR type="gamma" exponent="${amtIn / 100}" amplitude="${amtIn / 100}" offset="0" /><feFuncG type="gamma" exponent="${amtIn / 100}" amplitude="${amtIn / 100}" offset="0" /><feFuncB type="gamma" exponent="${amtIn / 100}" amplitude="${amtIn / 100}" offset="0" /></feComponentTransfer></filter>`
            break;
          case "discrete":
            filterElement = `<filter id="discrete"><feComponentTransfer><feFuncR type="discrete" tableValues="0 ${amtIn / 100} 0 1"/><feFuncG type="discrete" tableValues="0 ${amtIn / 100} 0 1"/><feFuncB type="discrete" tableValues="0 ${amtIn / 100} 0 1"/><feFuncA type="discrete" tableValues="0 ${amtIn / 100} 0 1"/></feComponentTransfer></filter>`
            break;
          case "torn":
            filterElement = `<filter id="torn"><feOffset in="SourceGraphic" dx="${amtIn / -4}" dy="${amtIn / -4}" result="offsetRes" /><feTurbulence type="turbulence" baseFrequency="0.05" numOctaves="2" result="turbulence" /><feDisplacementMap in2="turbulence" in="offsetRes" scale="${amtIn}" xChannelSelector="R" yChannelSelector="G" /></filter>`;
            break;
          case "bevel":
            filterElement = `<filter id="bevel"><feGaussianBlur stdDeviation="${Math.abs(args.NUM / 10)}" in="SourceAlpha" result="BLUR"/><feSpecularLighting surfaceScale="2" specularConstant="2" specularExponent="20" lighting-color="#ffffff" in="BLUR" result="SPECULAR"><fePointLight x="40" y="-30" z="50" /></feSpecularLighting><feComposite operator="in" in="SPECULAR" in2="SourceAlpha" result="COMPOSITE"/><feMerge><feMergeNode in="SourceGraphic" /><feMergeNode in="COMPOSITE"/></feMerge></filter>`;
            break;
          case "liquify":
            filterElement = `<filter id="liquify" width="150%" height="160%" x="-25%" y="-25%"><feTurbulence baseFrequency="0.05" type="fractalNoise" numOctaves="1" seed="${Math.round(Math.abs(Math.sin(Date.now() / 5) * 10))}" result="BOTTOM-SPLASH_10"></feTurbulence><feGaussianBlur stdDeviation="${amtIn}" in="SourceGraphic" result="BOTTOM-SPLASH_20"></feGaussianBlur><feDisplacementMap scale="${amtIn * 10}" in="BOTTOM-SPLASH_20" in2="BOTTOM-SPLASH_10" result="BOTTOM-SPLASH_30"></feDisplacementMap><feComposite operator="in" in="BOTTOM-SPLASH_30" in2="SourceGraphic" result="BOTTOM-SPLASH_40"></feComposite><feTurbulence baseFrequency="0.1" type="fractalNoise" numOctaves="1" seed="${Math.round(Math.abs(Math.sin(Date.now() / 5) * 10))}" result="MIDDLE-SPLASH_10"></feTurbulence><feGaussianBlur in="SourceGraphic" stdDeviation="${amtIn * 0.01}" result="MIDDLE-SPLASH_20"></feGaussianBlur><feDisplacementMap in="MIDDLE-SPLASH_20" in2="MIDDLE-SPLASH_10" scale="${amtIn * 2.5}" result="MIDDLE-SPLASH_30"></feDisplacementMap><feComposite in="MIDDLE-SPLASH_30" in2="SourceGraphic" operator="in" result="MIDDLE-SPLASH_40"></feComposite><feTurbulence baseFrequency="0.07" type="fractalNoise" numOctaves="1" seed="${Math.round(Math.abs(Math.sin(Date.now() / 5) * 10))}" result="TOP-SPLASH_10"></feTurbulence><feGaussianBlur stdDeviation="${amtIn * 0.035}" in="SourceGraphic" result="TOP-SPLASH_20"></feGaussianBlur><feDisplacementMap scale="${amtIn * 22}" in="TOP-SPLASH_20" in2="TOP-SPLASH_10" result="TOP-SPLASH_30"></feDisplacementMap><feComposite operator="in" in="TOP-SPLASH_30" in2="SourceGraphic" result="TOP-SPLASH_40"></feComposite></filter>`;
            break;
          case "ripple":
            if (!displacementSrCs[2]) await this.getSources();
            scaleFactor = (amtIn * 1.5).toFixed(2);
            tableValue = [100 + 2 * (100 - amtIn) / 2];
            tableValue[1] = (100 - tableValue[0]) / 2;
            filterElement = `<filter id="ripple" xmlns:xlink="http://www.w3.org/1999/xlink"><feImage xlink:href="${displacementSrCs[2]}" x="${tableValue[1]}%" y="${tableValue[1]}%" width="${tableValue[0]}%" height="${tableValue[0]}%" result="rippleImage" /><feDisplacementMap xChannelSelector="R" yChannelSelector="G" in="SourceGraphic" in2="rippleImage" result="displacementMap" color-interpolation-filters="sRGB" scale="${amtIn}" /><feComposite operator="in" in2="rippleImage"></feComposite><feComposite operator="over" in2="SourceGraphic"></feComposite></filter>`;
            break;
          case "thermal":
            tableValue = [`0 0.125 ${0.8 * (amtIn / 10)} ${1 * (amtIn / 10)} ${1 * (amtIn / 10)}`, `0 0 0 ${0.843 * (amtIn / 10)} 1`, `0 ${0.549 * (amtIn / 10)} ${0.466 * (amtIn / 10)} 0 1`];
            filterElement = `<filter id="thermal" color-interpolation-filters="sRGB"><feComponentTransfer><feFuncR type="table" tableValues="${tableValue[0]}" /><feFuncG type="table" tableValues="${tableValue[1]}" /><feFuncB type="table" tableValues="${tableValue[2]}" /></feComponentTransfer></filter>`;
            break;
          case "erode":
            filterElement = `<filter id="erode"><feMorphology in="SourceGraphic" operator="erode" radius="${Math.abs(amtIn / 10)}"></feMorphology></filter>`;
            break;
          case "disolve":
            filterElement = `<filter id="disolve"><feTurbulence baseFrequency="0.1" type="fractalNoise" numOctaves="5" result="TURBULENCE"/><feDisplacementMap in="SourceGraphic" in2="TURBULENCE" scale="${amtIn}" xChannelSelector="R" yChannelSelector="G"/><feTile result="TILED"/><feComposite operator="in" in="TILED" in2="SourceGraphic"/></filter>`;
            break;
          case "posterize":
            filterElement = `<filter id="posterize"><feComponentTransfer><feFuncR type="discrete" tableValues="0 ${amtIn / 100} 1" /><feFuncG type="discrete" tableValues="0 ${amtIn / 100} 1" /><feFuncB type="discrete" tableValues="0 ${amtIn / 100} 1" /></feComponentTransfer></filter>`;
            break;
          case "displacement":
            amtIn = amtIn === 64 ? 65 : amtIn;
            filterElement = `<filter id="displacement"><feTurbulence type="fractalNoise" baseFrequency="${(1000000 - (Math.abs(amtIn - 100) * 10000)) / 100}" numOctaves="2" seed="${Math.round(Math.random() * 100)}" result="turbulence" /><feDisplacementMap in="SourceGraphic" in2="turbulence" scale="25" xChannelSelector="R" yChannelSelector="G" /></filter>`;
            break;
          case "grain":
            if (amtIn === 0) return svg;
            filterElement = `<filter id="grain"><feTurbulence type="fractalNoise" baseFrequency="${amtIn / 100}" numOctaves="3" result="turbulence" seed="${Math.round(10 * (Math.sin(Date.now() * 50)))}" /><feColorMatrix in="turbulence" type="saturate" values="0" result="grain" /><feComposite in="grain" in2="SourceGraphic" operator="in" /><feComposite in="0.5" in2="SourceGraphic" operator="over" /></filter>`;
            break;
          case "bloom":
            filterElement = `<filter id="bloom"><feGaussianBlur in="SourceGraphic" stdDeviation="5" /><feComposite in2="SourceGraphic" operator="arithmetic" k2="${amtIn / 100}" k3="1" /></filter>`;
            break;
          case "bloom v2":
            filterElement = `<filter id="bloom-v2"><feGaussianBlur in="SourceGraphic" stdDeviation="5" /><feComposite in2="SourceGraphic" operator="arithmetic" k2="${amtIn / 100}" k3="1" color-interpolation-filters="sRGB" /></filter>`;
            break;
          default:
            filterElement = `<filter id="blur"><feGaussianBlur stdDeviation="${Math.abs(amtIn)}" in="SourceGraphic" result="BLUR"></feGaussianBlur></filter>`;
        }
        return this.filterApplier(svg, filterElement, args.EFFECT.replaceAll(" ", "-"));
      }
      return svg;
    }

    async motionBlur(args, isImage, util) {
      let svg;
      if (args.SPRITE === "_myself_") svg = await this.findAsset(util);
      else svg = isImage ? await this.getImage(args.SPRITE) : await this.getSVG(args.SPRITE);
      if (svg) {
        const filterElement = `<filter id="motionBlur"><feGaussianBlur stdDeviation="${Math.abs(args.X)}, ${Math.abs(args.Y)}" in="SourceGraphic" result="BLUR"></feGaussianBlur></filter>`;
        return this.filterApplier(svg, filterElement, "motionBlur");
      }
      return svg;
    }

    async blendType(args, isImage, util) {
      let svg;
      if (args.SPRITE === "_myself_") svg = await this.findAsset(util);
      else svg = isImage ? await this.getImage(args.SPRITE) : await this.getSVG(args.SPRITE);
      if (svg) {
        const filterElement = `<filter id="blend-${args.BLEND}"><feBlend in="SourceGraphic" in2="SourceGraphic" mode="${args.BLEND}" /></filter>`;
        return this.filterApplier(svg, filterElement, `blend-${args.BLEND}`);
      }
      return svg;
    }

    async customFilter(args, isImage, util) {
      let svg;
      if (args.SPRITE === "_myself_") svg = await this.findAsset(util);
      else svg = isImage ? await this.getImage(args.SPRITE) : await this.getSVG(args.SPRITE);
      if (svg) return this.filterApplier(svg, args.EFFECT, args.ID);
      return svg;
    }

    async setHue(args, isImage, util) {
      let svg;
      if (args.SPRITE === "_myself_") svg = await this.findAsset(util);
      else svg = isImage ? await this.getImage(args.SPRITE) : await this.getSVG(args.SPRITE);
      if (svg) {
        const filterElement = `<filter id="hue"><feColorMatrix in="SourceGraphic" type="matrix" values="${this.hexMap(args.COLOR)}"></feColorMatrix></filter>`;
        return this.filterApplier(svg, filterElement, "hue");
      }
      return svg;
    }

    async addShadow(args, isImage, util) {
      let svg;
      if (args.SPRITE === "_myself_") svg = await this.findAsset(util);
      else svg = isImage ? await this.getImage(args.SPRITE) : await this.getSVG(args.SPRITE);
      if (svg) {
        const rgbColor = this.hexToRgb(args.COLOR);
        const filterElement = `<filter id="shadow"><feDropShadow dx="${args.X}" dy="${args.Y * -1}" stdDeviation="${args.NUM / 2}" flood-color="rgb(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b})"/></filter>`;
        return this.filterApplier(svg, filterElement, "shadow");
      }
      return svg;
    }

    async addOutline(args, isImage, util) {
      let svg;
      if (args.SPRITE === "_myself_") svg = await this.findAsset(util);
      else svg = isImage ? await this.getImage(args.SPRITE) : await this.getSVG(args.SPRITE);
      if (svg) {
        let filterElement;
        const rgbColor = this.hexToRgb(args.COLOR);
        let effect;
        if (args.OUTLINE === "filled") {
          effect = "filled-outline";
          filterElement = `<filter id="filled-outline"><feMorphology operator="dilate" radius="${args.NUM}" in="SourceAlpha" result="thickened" /><feComposite operator="over" in="SourceGraphic" in2="thickened" /><feFlood flood-color="rgb(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b})" result="flood"/><feComposite operator="in" in="flood" in2="thickened"/><feComposite operator="over" in="SourceGraphic" /></filter>`
        } else {
          effect = "outline";
          filterElement = `<filter id="outline"><feMorphology operator="dilate" radius="${args.NUM}" in="SourceAlpha" result="thickened" /><feComposite operator="over" in="SourceGraphic" in2="thickened" /><feFlood flood-color="rgb(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b})" result="flood"/><feComposite operator="in" in="flood" in2="thickened"/></filter>`;
        }
        return this.filterApplier(svg, filterElement, effect);
      }
      return svg;
    }

    async colorSplit(args, isImage, util) {
      let svg;
      if (args.SPRITE === "_myself_") svg = await this.findAsset(util);
      else svg = isImage ? await this.getImage(args.SPRITE) : await this.getSVG(args.SPRITE);
      if (svg) {
        let filterElement;
        let effect;
        if (args.EFFECT.includes("color")) {
          effect = "color-split";
          filterElement = `<filter id="color-split"><feFlood flood-color="${args.COLOR1}" flood-opacity="0.5" result="RED"/><feFlood flood-color="${args.COLOR2}" flood-opacity="0.5" result="GREEN"/><feFlood flood-color="${args.COLOR3}" flood-opacity="0.5" result="BLUE"/><feComposite operator="in" in="RED" in2="SourceAlpha" result="RED"/><feComposite operator="in" in="GREEN" in2="SourceAlpha" result="GREEN"/><feComposite operator="in" in="BLUE" in2="SourceAlpha" result="BLUE"/><feOffset in="RED" dx="${args.X * -1}" dy="${args.Y}" result="RED_OFF"/><feOffset in="GREEN" dx="${args.X}" dy="${args.Y * -1}" result="GREEN_OFF"/><feOffset in="BLUE" dx="0" dy="0" result="BLUE_OFF"/><feBlend mode="screen" in="RED_OFF" in2="GREEN_OFF" result="RG"/><feBlend mode="screen" in="RG" in2="BLUE_OFF" result="FINAL_RESULT"/></filter>`;
        } else if (args.EFFECT.includes("chromatic")) {
          effect = "chromatic-abberation";
          filterElement = `<filter id="chromatic-abberation"><feOffset in="SourceGraphic" dx="${args.X}" dy="${args.Y}" result="layer-one" /><feColorMatrix in="layer-one" result="customColor1" type="matrix" values="${this.hexMap(args.COLOR1)}"></feColorMatrix><feOffset in="SourceGraphic" dx="${args.X * -1}" dy="${args.Y * -1}" result="layer-two" /><feColorMatrix in="layer-two" result="customColor2" type="matrix" values="${this.hexMap(args.COLOR2)}"></feColorMatrix><feBlend in="customColor1" in2="customColor2" mode="screen" result="color-split" /></filter>`;
        } else {
          effect = "abberation";
          filterElement = `<filter id="abberation"><feFlood flood-color="${args.COLOR1}" flood-opacity="0.5" result="RED"/><feFlood flood-color="${args.COLOR2}" flood-opacity="0.5" result="GREEN"/><feComposite operator="in" in="SourceGraphic" in2="SourceAlpha" result="BLUE" /><feComposite operator="in" in="RED" in2="SourceAlpha" result="RED"/><feComposite operator="in" in="GREEN" in2="SourceAlpha" result="GREEN"/><feComposite operator="in" in="BLUE" in2="SourceAlpha" result="BLUE"/><feOffset in="RED" dx="${args.X * -1}" dy="${args.Y}" result="RED_OFF"/><feOffset in="GREEN" dx="${args.X}" dy="${args.Y * -1}" result="GREEN_OFF"/><feOffset in="BLUE" dx="0" dy="0" result="BLUE_OFF"/><feBlend mode="screen" in="RED_OFF" in2="GREEN_OFF" result="RG"/><feBlend mode="screen" in="RG" in2="BLUE_OFF" result="FINAL_RESULT"/><feComposite operator="over" in="SourceGraphic" in2="FINAL_RESULT" /></filter>`;
        }
        return this.filterApplier(svg, filterElement, effect);
      }
      return svg;
    }

    async waveEffect(args, isImage, util) {
      let svg;
      if (args.SPRITE === "_myself_") svg = await this.findAsset(util);
      else svg = isImage ? await this.getImage(args.SPRITE) : await this.getSVG(args.SPRITE);
      if (svg) {
        const ChannelSelector = [args.axis === "x axis" ? "A" : "R", args.axis === "y axis" ? "A" : "G"];
        const filterElement = `<filter id="wave"><feTurbulence type="fractalNoise" baseFrequency="${args.Y / 100}, ${args.NUM / 100}" numOctaves="2" seed="${args.SEED}" result="turbulence" /><feDisplacementMap in="SourceGraphic" in2="turbulence" scale="25" xChannelSelector="${ChannelSelector[0]}" yChannelSelector="${ChannelSelector[1]}" /></filter>`;
        return this.filterApplier(svg, filterElement, "wave");
      }
      return svg;
    }

    async addTile(args, isImage, util) {
      let svg;
      if (args.SPRITE === "_myself_") svg = await this.findAsset(util);
      else svg = isImage ? await this.getImage(args.SPRITE) : await this.getSVG(args.SPRITE);
      if (svg) {
        let atts = [/width="([^"]*)"/.exec(svg), /height="([^"]*)"/.exec(svg)];
        atts = [
          Scratch.Cast.toNumber(atts[0] ? parseFloat(atts[0][1]) : 100),
          Scratch.Cast.toNumber(atts[1] ? parseFloat(atts[1][1]) : 100)
        ];
        const amts = [Math.abs(100 - Scratch.Cast.toNumber(args.NUM)), Scratch.Cast.toNumber(args.x), Scratch.Cast.toNumber(args.y)];
         const filterElement =
         `<filter id="tile"><feImage x="${amts[1]}" y="${amts[2]}" width="${amts[0] / atts[0] * 100}%" height="${amts[0] / atts[1] * 100}%" xlink:href="${await this.svgToBitmap(svg, atts[0], atts[1])}"/><feTile /></filter>`;
        return this.filterApplier(svg, filterElement, "tile");
      }
      return svg;
    }

    async lighting(args, isImage, util) {
      let svg;
      if (args.SPRITE === "_myself_") svg = await this.findAsset(util);
      else svg = isImage ? await this.getImage(args.SPRITE) : await this.getSVG(args.SPRITE);
      if (svg) {
        const widthMatch = /width="([^"]*)"/.exec(svg);
        const heightMatch = /height="([^"]*)"/.exec(svg);
        const pos = [
          Scratch.Cast.toNumber(args.X) + Scratch.Cast.toNumber(widthMatch ? parseFloat(widthMatch[1]) / 2 : (vm.runtime.stageWidth / 2)),
          (Scratch.Cast.toNumber(args.Y) * -1) + Scratch.Cast.toNumber(heightMatch ? parseFloat(heightMatch[1]) / 2 : (vm.runtime.stageHeight / 2))
        ];
        const off = args.SPRITE === "_canvas_" ? canvas.getBoundingClientRect().width / vm.runtime.stageWidth: 1;
        const filterElement = `<filter id="lighting"><feSpecularLighting result="specOut" specularExponent="20" lighting-color="${args.COLOR}"><fePointLight x="${pos[0] * off}" y="${pos[1] * off}" z="${Scratch.Cast.toNumber(args.NUM) * off}" /></feSpecularLighting><feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0" /></filter>`;
        return this.filterApplier(svg, filterElement, "lighting");
      }
      return svg;
    }

    async advLighting(args, isImage, util) {
      let svg;
      if (args.SPRITE === "_myself_") svg = await this.findAsset(util);
      else svg = isImage ? await this.getImage(args.SPRITE) : await this.getSVG(args.SPRITE);
      const source = args.MAP.startsWith("data:image/") || args.MAP.startsWith("http") ? args.MAP : `data:image/svg+xml;base64,${btoa(args.MAP)}`;
      if (svg) {
        const widthMatch = /width="([^"]*)"/.exec(svg);
        const heightMatch = /height="([^"]*)"/.exec(svg);
        const size = [
          Scratch.Cast.toNumber(widthMatch ? parseFloat(widthMatch[1]) : parseFloat(canvas.getBoundingClientRect().width)),
          Scratch.Cast.toNumber(heightMatch ? parseFloat(heightMatch[1]) : parseFloat(canvas.getBoundingClientRect().height))
        ];
        const filterElement = `<filter id="advLight"><feImage xlink:href="${source}" result="normalMap" width="${size[0]}" height="${size[1]}" x="1" y="1" /><feComponentTransfer in="normalMap"><feFuncR type="discrete" tableValues="0" /><feFuncG type="discrete" tableValues="0" /><feFuncB type="table" tableValues="0 1" /></feComponentTransfer><feBlend in="SourceGraphic" in2="normalMap" mode="${args.BLEND}" /><feComposite in2="SourceAlpha" operator="in" /></filter>`;
        return this.filterApplier(svg, filterElement, "advLight");
      }
      return svg;
    }

    async setDistort(args, isImage, override, util) {
      let svg;
      if (args.SPRITE === "_myself_") svg = await this.findAsset(util);
      else svg = isImage ? await this.getImage(args.SPRITE) : await this.getSVG(args.SPRITE);
      if (svg) {
        let source;
        if (override) source = args.EFFECT.startsWith("data:image/") ? args.EFFECT : `data:image/svg+xml;base64,${btoa(args.EFFECT)}`;
        else source = args.EFFECT === "bulge" ? 0 : args.EFFECT === "whirl" ? 1 : args.EFFECT === "ripple" ? 2 : 3;
        const mul = args.SPRITE === "_canvas_" ? vm.renderer.canvas.width / vm.runtime.stageWidth * 2 : 1;
        const amts = [Scratch.Cast.toNumber(args.NUM), Scratch.Cast.toNumber(args.X), Scratch.Cast.toNumber(args.Y)];
        if (!displacementSrCs[2] && !override) await this.getSources();
        let tableValue = [100 + 2 * (100 - amts[0]) / 2];
        tableValue[1] = (100 - tableValue[0]) / 2;
        const filterElement =`<filter id="${override ? "customDistort" : args.EFFECT}" xmlns:xlink="http://www.w3.org/1999/xlink">
        <feImage id="dMapS" xlink:href="${override ? source : displacementSrCs[source]}" x="${(tableValue[1] + amts[1]) * mul}%" y="${(tableValue[1] - amts[2]) * mul}%" width="${tableValue[0] * mul}%" height="${tableValue[0] * mul}%" result="distortImg" />
        <feDisplacementMap id="dMapRes" xChannelSelector="R" yChannelSelector="G" in="SourceGraphic" in2="distortImg" result="displacementMap" color-interpolation-filters="sRGB" scale="${amts[0] * mul}" /><feComposite operator="in" in2="distortImg"></feComposite>
        ${amts[0] < 0 && args.EFFECT !== "ripple" ? "" : `<feComposite operator="over" in2="SourceGraphic"></feComposite>`}</filter>`;
        return this.filterApplier(svg, filterElement, override ? "customDistort" : args.EFFECT);
      }
      return svg;
    }

    async distortPreset(args) {
      const source = { bulge : 0, whirl : 1, ripple : 2, shockwave : 3 };
      if (!displacementSrCs[2]) await this.getSources();
      return displacementSrCs[source[args.TYPE]] || "";
    }

    async setGlitch(args, isImage, util) {
      let svg;
      if (args.SPRITE === "_myself_") svg = await this.findAsset(util);
      else svg = isImage ? await this.getImage(args.SPRITE) : await this.getSVG(args.SPRITE);
      if (svg) {
        const mul = args.SPRITE === "_canvas_" ? 999 : 100;
        const axis = args.axis === "x axis" ? [true, false] : args.axis === "y axis" ? [false, true] : [true, true];
        let allMerges = "";
        let mergeTxt = "";
        for (let i = 1; i < args.LINE; i++) {
          allMerges+= `<feMergeNode in="merge${i}" />`;
          mergeTxt+= `<feOffset in="SourceGraphic" dx="${args.X * (Math.random() > 0.5 ? 1 : -1)}" dy="${args.Y * (Math.random() > 0.5 ? 1 : -1)}" result="off${i}"/><feMerge x="${axis[0] ? Math.random() * mul : 0}%" y="${axis[1] ? Math.random() * mul : 0}%" width="${axis[0] ? args.NUM : mul}%" height="${axis[1] ? args.NUM : mul}%" result="merge${i}"><feMergeNode in="SourceGraphic" /><feMergeNode in="off${i}" /></feMerge>`;
        }
        const filterElement = `<filter id="glitch">${mergeTxt}<feMerge><feMergeNode in="SourceGraphic" />${allMerges}</feMerge></filter>`;
        return this.filterApplier(svg, filterElement, "glitch");
      }
      return svg;
    }

    async setVHS(args, isImage, util) {
      let svg;
      if (args.SPRITE === "_myself_") svg = await this.findAsset(util);
      else svg = isImage ? await this.getImage(args.SPRITE) : await this.getSVG(args.SPRITE);
      if (svg) {
        const full = vm.renderer.canvas.getBoundingClientRect().width > Scratch.vm.runtime.stageWidth ? 1 : 1.9;
        const mul = args.SPRITE === "_canvas_" ? [runtime.stageHeight / full, runtime.stageWidth / full] : [100, 100];
        const axis = args.axis === "x axis" ? [true, false] : args.axis === "y axis" ? [false, true] : [true, true];
        const amts = [
          Scratch.Cast.toNumber(args.X), Scratch.Cast.toNumber(args.Y), Scratch.Cast.toNumber(args.NUM)
        ];
        if (amts[2] === 0) return svg; // 0% vhs effect is just the original image
        const filterElement = `<filter id="vhs"><feOffset in="SourceGraphic" dx="${amts[0]}" dy="${amts[1]}" result="off"/><feMerge in="SourceGraphic" x="${axis[0] ? (100 - amts[2]) * ( mul[0] / 100) : 0}%" y="${axis[1] ? (100 - amts[2]) * ( mul[1] / 100) : 0}%" width="${axis[0] ? amts[2] * mul[0] : mul[0]}%" height="${axis[1] ? amts[2] * mul[1] : mul[1]}%" result="merge1"><feMergeNode in="off" /><feMergeNode in="merge1" /></feMerge><feMerge in="off" x="0%" y="0%" width="${axis[0] ? mul[0] - amts[2] : mul[0]}%" height="${axis[1] ? mul[1] - amts[2] : mul[1]}%" result="merge2"><feMergeNode in="SourceGraphic" /><feMergeNode in="merge2" /></feMerge><feMerge>${amts[2] < 100 ? `<feMergeNode in="merge1" /><feMergeNode in="merge2" />` : `<feMergeNode in="merge1" />`}</feMerge></filter>`;
        return this.filterApplier(svg, filterElement, "vhs");
      }
      return svg;
    }

    async mask(args, isImage, util) {
      let svg;
      if (args.SPRITE === "_myself_") svg = await this.findAsset(util);
      else svg = isImage ? await this.getImage(args.SPRITE) : await this.getSVG(args.SPRITE);
      if (args.SPRITE === args.SPRITE2) return svg; // do nothing if youre masking yourself
      let svg2;
      if (args.SPRITE2 === "_myself_") svg2 = await this.findAsset(util);
      else svg2 = isImage ? await this.getImage(args.SPRITE2) : await this.getSVG(args.SPRITE2);
      const multiply = args.SPRITE === "_canvas_" ? [Scratch.renderer.canvas.width * 2, Scratch.renderer.canvas.height * 2,
        vm.renderer.canvas.width / vm.runtime.stageWidth] : [100, 100, 1];
      if (svg && svg2) {
        const name = args.TYPE === " " ? "maskOver" : "maskRemove";
        const filterElement = `<filter id="${name}">
        	<feImage xlink:href="${`data:image/svg+xml;base64,${btoa(svg2)}`}" x="${maskOptions[0] * multiply[2]}" y="${maskOptions[1] * multiply[2]}" width="${maskOptions[2] * multiply[2]}%" height="${maskOptions[2] * multiply[2]}%" preserveAspectRatio="xMidYMid meet" crossOrigin="anonymous" result="image1"/>
        	<feComposite in="${args.TYPE !== " " ? "SourceGraphic" : "image1"}" in2="${args.TYPE !== " " ? "image1" : "SourceGraphic"}" operator="${args.TYPE}" x="0%" y="0%" width="${multiply[0]}%" height="${multiply[1]}%" result="composite1"/></filter>`;
        return this.filterApplier(svg, filterElement, name);
      }
      return svg;
    }

    async setATT(args, isImage, type, util) {
      let svg;
      if (args.SPRITE === "_myself_") svg = await this.findAsset(util);
      else svg = isImage ? await this.getImage(args.SPRITE) : await this.getSVG(args.SPRITE);
      if (svg) {
        // Note: We Do Not Check if Translate Exists Since We Override it
        let transform = "";
        const currentTranslate = /translate\(([^,]+),([^)]+)\)/.exec(svg);
        const currentX = currentTranslate ? parseFloat(currentTranslate[1]) : 0;
        const currentY = currentTranslate ? parseFloat(currentTranslate[2]) : 0;

        const widthMatch = /width="([^"]*)"/.exec(svg);
        const heightMatch = /height="([^"]*)"/.exec(svg);
        const width = widthMatch ? parseFloat(widthMatch[1]) : 0;
        const height = heightMatch ? parseFloat(heightMatch[1]) : 0;

        const x = Scratch.Cast.toNumber(args.x ? args.x : 0) / 100;
        const y = Scratch.Cast.toNumber(args.y ? args.y : 0) / 100;
        if (type === 0) {
          const newPos = [currentX + (x * 100), currentY + (y * -100)];
          return svg.replace(/translate\([^)]*\)/, `translate(${newPos[0]},${newPos[1]})`);
        } else if (type === 1) {
          if (svg.includes("style=\"transform-origin: center; transform:")) {
            svg = svg.replace(/(style="[^"]*transform:[^"]*)/, `$1 rotate(${Scratch.Cast.toNumber(args.DIR) - 90}deg)`);
          } else {
            svg = svg.replace(`width="${width}" height="${height}"`, `width="${width}" height="${height}" style="transform-origin: center; transform: rotate(${Scratch.Cast.toNumber(args.DIR) - 90}deg)"`);
          }
        } else if (type === 2) {
          svg = svg.replace(`width="${width}" height="${height}"`, `width="${width * Math.abs(x)}" height="${height * Math.abs(y)}"`);
          svg = svg.replace(`viewBox="0,0,${width},${height}"`, `viewBox="0,0,${width * Math.abs(x)},${height * Math.abs(y)}"`);
          svg = svg.replace(`(${currentX},`, `(${currentX * (x) + (args.x < 0 ? width * Math.abs(x) : 0)},`);
          svg = svg.replace(`,${currentY})`, `,${currentY * (y) + (args.y < 0 ? height * Math.abs(y) : 0)})`);
          transform = `scale(${x}, ${y})`;
        } else {
          if (svg.includes("style=\"transform-origin: center; transform:")) {
            svg = svg.replace(/(style="[^"]*transform:[^"]*)/, `$1 skew(${args.x}deg, ${args.y}deg)`);
          } else {
            svg = svg.replace(`width="${width}" height="${height}"`, `width="${width}" height="${height}" style="transform-origin: center; transform: skew(${args.x}deg, ${args.y}deg)"`);
          }
        }
        const currentTransform = /transform="([^"]*)"/.exec(svg);
        const existingTransform = currentTransform ? currentTransform[1] : "";
        const newTransform = existingTransform ? `${existingTransform} ${transform}` : transform;
        return svg.replace(/transform="([^"]*)"/, `transform="${newTransform}"`);
      }
      return svg;
    }

    async updateView(args, isImage, util) {
      let svg;
      if (args.SPRITE === "_myself_") svg = await this.findAsset(util);
      else svg = isImage ? await this.getImage(args.SPRITE) : await this.getSVG(args.SPRITE);
      if (svg) {
        let values;
        const viewBoxMatch = svg.match(/viewBox="([^"]+)"/);
        let viewBoxValues = -1;
        if (viewBoxMatch) viewBoxValues = viewBoxMatch[1].split(/\s*,\s*/).map(parseFloat);

        const translateMatch = svg.match(/<g transform="translate\((-?[\d.]+),(-?[\d.]+)\)/);
        let translateValues = -1;
        if (translateMatch) translateValues = [parseFloat(translateMatch[1]), parseFloat(translateMatch[2])];
        values = `${viewBoxValues},${translateValues}`;
        values = values.split(",");
        values = values.map(item => Scratch.Cast.toNumber(item));
        args.NUM = Scratch.Cast.toNumber(args.NUM);
        if (values.length > 3) {
          svg = svg.replace(/viewBox="([^"]+)"/, `viewBox="${values[0]},${values[1]},${values[2] + (args.NUM * 2)},${values[3] + (args.NUM * 2)}"`);
          svg = svg.replace(/width="([^"]+)"/, `width="${values[2] + (args.NUM * 2)}"`);
          svg = svg.replace(/height="([^"]+)"/, `height="${values[3] + (args.NUM * 2)}"`);
          svg = svg.replace(/<g transform="([^"]+)"/, `<g transform="translate(${values[4] + args.NUM},${values[5] + args.NUM})"`);
        }
      }
      return svg;
    }

    addCanvasFilter(args) {
      args.NAME = Scratch.Cast.toString(args.NAME).replaceAll(" ", "_");
      const filter = args.FILTER;
      const filterRegex = /<filter(?:\s[^>]*)?>((?:.|\n)*?)<\/filter>/i;
      const match = filter.match(filterRegex);
      if (match && match[1]) {
        const filterID = args.NAME;
        const filterExists = document.getElementById(filterID);
        if (filterExists) {
          filterExists.innerHTML = match[1];
          return;
        }
        const svgFilterOuter = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svgFilterOuter.id = `SP-canvas-${filterID}`;
        const svgFilter = document.createElementNS("http://www.w3.org/2000/svg", "filter");
        svgFilter.id = filterID;
        svgFilter.innerHTML = match[1];
        svgFilterOuter.appendChild(svgFilter);
        document.body.appendChild(svgFilterOuter);
        allFilters.push(filterID);
        const existingFilter = canvas.style.filter;
        const filterString = existingFilter ? `${existingFilter} url(#${filterID})` : `url(#${filterID})`;
        canvas.style.filter = filterString;
      } else { console.error("Invalid Filter, Cancelled Application") }
    }

    removeCanvasFilter(args) {
      args.NAME = Scratch.Cast.toString(args.NAME).replaceAll(" ", "_");
      if (canvas.style.filter.includes(`url("#${args.NAME}")`)) {
        canvas.style.filter = canvas.style.filter.replace(`url(#${args.NAME})`, "").trim();
        const array = canvas.style.filter.split(" ");
        if (array.length === 1 && canvas.style.filter.includes(args.NAME)) canvas.style.filter = "";
        const filterSel = document.getElementById(`SP-canvas-${args.NAME}`);
        if (filterSel) {
          document.body.removeChild(filterSel);
          allFilters.splice(allFilters.indexOf(args.NAME), 1);
        }
      } else { console.error("Filter not found, Cancelled Deletion") }
    }

    removeAllFilters(args) {
      for (let i = 0; i < allFilters.length; i++) {
        const filterSel = document.getElementById(`SP-canvas-${allFilters[i]}`);
        if (filterSel) document.body.removeChild(filterSel);
      }
      // Sometimes the allFilters array will lose filters because of the GUI, this fixes it
      const guiFilters = document.querySelectorAll(`[id^="SP-canvas-filter-"]`);
      if (guiFilters.length > 0) {
        for (let i = 0; i < guiFilters.length; i++) {
          document.body.removeChild(guiFilters[i]);
        }
      }
      canvas.style.filter = "";
      allFilters = [];
    }

    async getSVG(targetArgs) {
      const target = targetArgs === "_stage_" ? runtime.getTargetForStage() : runtime.getSpriteTargetByName(targetArgs);
      if (!target) return "<>";
      if (!requireNonPackagedRuntime()) return "<>";
      const costume = target.getCostumes()[target.currentCostume];
      //if bitmap, convert to svg
      if (costume.dataFormat === "png") {
        return await this.getImage(costume.asset.encodeDataURI());
      } else { return costume.asset.decodeText() }
    }

    async getImage(image) {
      if (image.startsWith("data:image/")) {
        return await new Promise((resolve, reject) => {
          // eslint-disable-next-line
          const img = new Image();
          img.onload = () => {
            const width = img.width;
            const height = img.height;
            const svg = `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
              width="${width / 2}" height="${(height / 2) + 0.001}" viewBox="0,0,${width / 2},${(height / 2) + 0.001}">
              <g transform="translate(${img.offsetLeft / -2},${img.offsetTop / -2})"><g data-paper-data="{&quot;isPaintingLayer&quot;:true}" fill="none" 
              fill-rule="nonzero" stroke="none" stroke-width="0.5" stroke-linecap="butt" stroke-linejoin="miter" 
              stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" style="mix-blend-mode: normal">
              <image x="0" y="0" transform="scale(0.5,0.5)" width="${width}" height="${height + 0.002}" 
              xlink:href="${img.src}"/></g></g></svg>`;
            resolve(svg);
          };
          img.onerror = reject;
          img.src = image;
        });
      } else {
        return image;
      }
    }

    async findAsset(util) {
      if (!requireNonPackagedRuntime()) return "<>";
      const currentCostume = util.target.currentCostume;
      let myAsset = util.target.sprite.costumes;
      myAsset = myAsset[currentCostume];
      //if bitmap, convert to svg
      if (myAsset.dataFormat === "png") return await this.getImage(myAsset.asset.encodeDataURI());
      else return myAsset.asset.decodeText();
    }

    async svgToBitmap(svg, width, height) {
      return await new Promise((resolve) => {
        // eslint-disable-next-line
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL());
        };
        img.onerror = (error) => { resolve("Invalid Image") };
        img.src = `data:image/svg+xml;base64,${btoa(svg)}`;
      });
    }

    getTargets(includeCanvas) {
      const spriteNames = [];
      spriteNames.push({ text : "myself", value: "_myself_" });
      if (includeCanvas) spriteNames.push({ text : "Canvas", value: "_canvas_" });
      spriteNames.push({ text : "Stage", value: "_stage_" });
      const targets = Scratch.vm.runtime.targets;
      for (let index = 1; index < targets.length; index++) {
        const target = targets[index];
        if (target.isOriginal) spriteNames.push({ text : target.getName(), value : target.getName() });
      }
      return spriteNames.length > 0 ? spriteNames : [""];
    }

    hexToRgb(hex) {
      hex = hex.replace(/^#/, "");
      const bigint = parseInt(hex, 16);
      return {"r" : (bigint >> 16) & 255, "g" :(bigint >> 8) & 255, "b" : bigint & 255};
    }

    hexMap(hex) {
      hex = hex.replace(/^#/, "");
      const r = parseInt(hex.slice(0, 2), 16);
      const g = parseInt(hex.slice(2, 4), 16);
      const b = parseInt(hex.slice(4, 6), 16);
      const filterMatrix = [
        r / 255, 0, 0, 0, 0,
        0, g / 255, 0, 0, 0,
        0, 0, b / 255, 0, 0,
        0, 0, 0, 1, 0
      ].join(" ");
      return filterMatrix;
    }

    filterApplier(svg, filter, name) {
      nameOffset++;
      if (nameOffset > 100) nameOffset = 0;
      let svgTag = svg.indexOf(">");
      if (svgTag !== -1) {
        let url = `filter="url(#${name})"`;
        if (svg.includes("filter=\"url(")) {
          const regex = /filter="url\([^"]+\)"/g;
          const existingFilters = svg.match(regex);
          if (existingFilters) {
            const filterString = existingFilters.join(" ").slice(0, -1);
            url = `${filterString} url(#${name})"`;
            svg = svg.replace(regex, "");
          }
        }
        svgTag = svg.indexOf(">");
        let appliedSVG = `${svg.substring(0, svgTag)} ${url}>${filter.slice(0, -1)}${svg.slice(svgTag)}`;
        // replace needs to be repeated twice to avoid the new name being used in other namespaces
        return appliedSVG.replace(`#${name})`, `#${name}${nameOffset})`).replace(`"${name}"`, `"${name}${nameOffset}"`);
      }
      return svg;
    }

    async getSources() {
      // we shouldnt ask for permission since its for a trusted, static function
      // I could hardcode this in, but Id rather not have it take up file space :/
      const link = "https://raw.githubusercontent.com/SharkPool-SP/SharkPools-Extensions/main/extension-sourceFeed/";
      /* eslint-disable */
      try {
        displacementSrCs = [
          await (await fetch(link + "SE-bulge.txt")).text(),
          await (await fetch(link + "SE-whirl.txt")).text(),
          await (await fetch(link + "SE-ripple.txt")).text(),
          await (await fetch(link + "SE-shock.txt")).text()
        ];
      } catch (error) { console.error("Error fetching resources: ", error) }
      /* eslint-enable */
    }
  }

  Scratch.extensions.register(new SPspriteEffects());
})(Scratch);
