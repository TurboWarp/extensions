// Name: Blocos de espera
// ID: djdavi15waitblocks
// Description: Faça o projeto esperar outros tipos de tempo ao invés de segundos.
// By: DJ_Davi15 <https://scratch.mit.edu/users/DJ_Davi15/>
// License: MIT

// --------------------------------------------------------------------------------------------
// v0.0.1

// Essa extensão foi gerada por um sistema gerador de extensões do turbowarp feito pelo ChatGPT.
(function(Scratch) {
  class djdavi15waitblocksExtension {
    getInfo() {
      return {
        id: 'djdavi15waitblocks',
        name: 'Blocos de espera',
        color1: '#ffa200',
        color2: '#cc8200',
        color3: '#cc8200',
        blockIconURI: 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIzNC4zOTU2OCIgaGVpZ2h0PSIzNC43NTk2NiIgdmlld0JveD0iMCwwLDM0LjM5NTY4LDM0Ljc1OTY2Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjIyLjgwMjE2LC0xNjIuNjIwMTcpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTIyMi44MDIxNiwxOTcuMzc5ODN2LTM0Ljc1OTY2aDM0LjM5NTY4djM0Ljc1OTY2eiIgZmlsbC1vcGFjaXR5PSIwIiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iTmFOIiBzdHJva2UtbGluZWNhcD0iYnV0dCIvPjxwYXRoIGQ9Ik0yNTAuMTY0NDIsMTgzLjM2Njk1YzAsNS41NzEzNSAtNC41NjY5MiwxMC4wODc4MSAtMTAuMjAwNTIsMTAuMDg3ODFjLTUuNjMzNTksMCAtMTAuMjAwNTIsLTQuNTE2NDcgLTEwLjIwMDUyLC0xMC4wODc4MWMwLC01LjU3MTM1IDQuNTY2OTMsLTEwLjA4NzgxIDEwLjIwMDUyLC0xMC4wODc4MWM1LjYzMzU5LDAgMTAuMjAwNTIsNC41MTY0NyAxMC4yMDA1MiwxMC4wODc4MXoiIGZpbGw9IiNmZmEyMDAiIHN0cm9rZT0iI2NjODIwMCIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIvPjxwYXRoIGQ9Ik0yNDcuNjQ2MDEsMTgzLjM2Njk1YzAsNC4xOTU4NCAtMy40Mzk0LDcuNTk3MjIgLTcuNjgyMTEsNy41OTcyMmMtNC4yNDI3MSwwIC03LjY4MjExLC0zLjQwMTQgLTcuNjgyMTEsLTcuNTk3MjJjMCwtNC4xOTU4NCAzLjQzOTQsLTcuNTk3MjIgNy42ODIxMSwtNy41OTcyMmM0LjI0MjcxLDAgNy42ODIxMSwzLjQwMTQgNy42ODIxMSw3LjU5NzIyeiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSIjY2M4MjAwIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0Ii8+PHBhdGggZD0iTTI0NC45Mzk1LDE4My4zMzY2NWMwLDIuNzI2MzIgLTIuMjMzNDcsNC45MzY0NCAtNC45ODg2LDQuOTM2NDRjLTIuNzU1MTMsMCAtNC45ODg2LC0yLjIxMDEyIC00Ljk4ODYsLTQuOTM2NDRjMCwtMi43MjYzMiAyLjIzMzQ3LC00LjkzNjQ0IDQuOTg4NiwtNC45MzY0NGMyLjc1NTEzLDAgNC45ODg2LDIuMjEwMTIgNC45ODg2LDQuOTM2NDR6IiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMCIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiLz48cGF0aCBkPSJNMjM1LjYxMTY2LDE4My40MzI1OGwtMS41NDE1NiwtMC4wNDE4MyIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNTc1ZTc1IiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxwYXRoIGQ9Ik0yNDAuMDc5NDQsMTg4LjAzNDQybC0wLjAyNTQzLDEuNTEwMzMiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzU3NWU3NSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cGF0aCBkPSJNMjQwLjE0MjkyLDE3OC42OTk0OGwwLjAyNTQzLC0xLjUxMDMzIiBmaWxsPSJub25lIiBzdHJva2U9IiM1NzVlNzUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBhdGggZD0iTTI0NC4zMTYxNCwxODMuNDk2NzlsMS41NDE1NiwtMC4wNDE4MyIgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aW5kZXgmcXVvdDs6bnVsbH0iIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzU3NWU3NSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cGF0aCBkPSJNMjQwLjAzNTI4LDE4Ni4wMTU4M2wwLjAzNDIzLC0yLjYwMThsMy41NjYzMSwtMy4zNDgiIGZpbGwtb3BhY2l0eT0iMCIgZmlsbD0iIzU3NWU3NSIgc3Ryb2tlPSIjNTc1ZTc1IiBzdHJva2Utd2lkdGg9IjAuODI1IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cGF0aCBkPSJNMjQwLjcwMjQ5LDE4My4zNjY5NWMwLDAuNDAxOTIgLTAuMzMwNjgsMC43Mjc3MyAtMC43Mzg1OSwwLjcyNzczYy0wLjQwNzkxLDAgLTAuNzM4NTksLTAuMzI1ODIgLTAuNzM4NTksLTAuNzI3NzNjMCwtMC40MDE5MiAwLjMzMDY4LC0wLjcyNzczIDAuNzM4NTksLTAuNzI3NzNjMC40MDc5MSwwIDAuNzM4NTksMC4zMjU4MiAwLjczODU5LDAuNzI3NzN6IiBmaWxsPSIjZmZhMjAwIiBzdHJva2U9IiNjYzgyMDAiIHN0cm9rZS13aWR0aD0iMC41IiBzdHJva2UtbGluZWNhcD0iYnV0dCIvPjxwYXRoIGQ9Ik0yNDYuMjg3MTEsMTc1LjE2NDI1bDIuNDQ3NDQsLTIuNzI5ODQiIGZpbGw9IiNjYzgyMDAiIHN0cm9rZT0iI2NjODIwMCIgc3Ryb2tlLXdpZHRoPSIxLjA1IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cGF0aCBkPSJNMjUwLjgxMDEsMTcwLjQ1MzMxbC0xLjM2MDIsMS4zOTI3OCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjY2M4MjAwIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBhdGggZD0iTTI0NC41Mjg5NiwxNzEuMjYxNDljMCwwIDIuMTIyNDcsLTIuNTQxNjMgNC4zNDgzNSwtMC43Mzg3NWMxLjIzNjQ4LDEuMDAxNSAxLjM3NzUzLDAuOTY4MjUgMi4wNTM1NSwxLjc4ODY4YzEuODkwMjYsMi4yOTQwOCAtMC4xNDczNCw0LjIxOTk1IC0wLjE0NzM0LDQuMjE5OTV6IiBmaWxsPSIjZmZhMjAwIiBzdHJva2U9IiNjYzgyMDAiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBhdGggZD0iTTIzMy43MTI4OSwxNzUuMDE5ODlsLTIuNDQ3NDQsLTIuNzI5ODQiIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2luZGV4JnF1b3Q7Om51bGx9IiBmaWxsPSIjY2M4MjAwIiBzdHJva2U9IiNjYzgyMDAiIHN0cm9rZS13aWR0aD0iMS4wNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBhdGggZD0iTTIzMC41NTAxMSwxNzEuNzAxNzNsLTEuMzYwMiwtMS4zOTI3OCIgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aW5kZXgmcXVvdDs6bnVsbH0iIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2NjODIwMCIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxwYXRoIGQ9Ik0yMjkuMjE2NDksMTc2LjM4N2MwLDAgLTIuMDM3NjEsLTEuOTI1ODggLTAuMTQ3MzUsLTQuMjE5OTZjMC42NzYwMiwtMC44MjA0MyAwLjgxNzA3LC0wLjc4NzE3IDIuMDUzNTUsLTEuNzg4NjdjMi4yMjU4OCwtMS44MDI4OCA0LjM0ODM1LDAuNzM4NzUgNC4zNDgzNSwwLjczODc1eiIgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aW5kZXgmcXVvdDs6bnVsbH0iIGZpbGw9IiNmZmEyMDAiIHN0cm9rZT0iI2NjODIwMCIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cGF0aCBkPSJNMjMxLjk1MzI1LDE2OS43Nzc4N2MwLDAgMC43NDQxNywtMC4zNDAwMyAxLjc0MjE5LC0xLjI1NzUxYzAuNTgwODMsLTAuNTMzOTUgMS4wMjE4NSwtMS44NjA4MiAxLjk1OTE3LC0yLjg3MjczYzAuODI4ODYsLTAuODk0ODIgMi40Nzk4OCwtMC45NDM5OSA0LjI0ODUzLC0xLjAxNDEyYzEuNzY4NjUsLTAuMDcwMTMgMy4xNTg0MiwwLjAyMzIyIDQuMjM2ODcsMC44NTczOWMwLjg0MzA0LDAuNjUyMDkgMS4wNjgwOCwxLjk4MjY0IDEuNzM1MzQsMy4wMjk0NmMwLjc5NzU1LDEuMjUxMjQgMS41NjgxNSwxLjM3MTgzIDEuNTY4MTUsMS4zNzE4MyIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjY2M4MjAwIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxwYXRoIGQ9Ik0yNDIuMTUyOSwxNzAuNDIwMmwtMC43MTMzNSwyLjc2MDM0IiBmaWxsPSJub25lIiBzdHJva2U9IiNjYzgyMDAiIHN0cm9rZS13aWR0aD0iMC43NSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PHBhdGggZD0iTTI0MC45NjUzMywxNjkuNTk4NTVsMi42MDQ0MywwLjc1NjA1IiBmaWxsPSJub25lIiBzdHJva2U9IiNjYzgyMDAiIHN0cm9rZS13aWR0aD0iMS4xIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cGF0aCBkPSJNMjMzLjg5NzA1LDE5Mi4wMTI1bC0yLjE4MjM4LDMuMzcyNzYiIGZpbGw9IiNjYzgyMDAiIHN0cm9rZT0iI2NjODIwMCIgc3Ryb2tlLXdpZHRoPSIxLjEiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxwYXRoIGQ9Ik0yNDYuMzE4MTUsMTkxLjc4NzA4bDIuMTgyMzgsMy4zNzI3NiIgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aW5kZXgmcXVvdDs6bnVsbH0iIGZpbGw9IiNjYzgyMDAiIHN0cm9rZT0iI2NjODIwMCIgc3Ryb2tlLXdpZHRoPSIxLjEiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjwvZz48L2c+PC9zdmc+',
        blocks: [{
          opcode: 'waitms',
          blockType: Scratch.BlockType.COMMAND,
          text: 'espere [msinput] ms',
          arguments: { msinput: { type: Scratch.ArgumentType.NUMBER, defaultValue: '500' } }
        },{
          opcode: 'waitseg',
          blockType: Scratch.BlockType.COMMAND,
          text: 'espere [seginput] seg',
          arguments: { seginput: { type: Scratch.ArgumentType.NUMBER, defaultValue: '1' } }
        },{
          opcode: 'waitmin',
          blockType: Scratch.BlockType.COMMAND,
          text: 'espere [mininput] min',
          arguments: { mininput: { type: Scratch.ArgumentType.NUMBER, defaultValue: '1' } }
        },{
          opcode: 'waith',
          blockType: Scratch.BlockType.COMMAND,
          text: 'espere [hinput] h',
          arguments: { hinput: { type: Scratch.ArgumentType.NUMBER, defaultValue: '0.5' } }
        }],
        menus: {}
      };
    }

    async waitms(args) {
  try {
    await new Promise(r => setTimeout(r, args.msinput));
  } catch(e) {
    console.error(e);
  }
}

async waitseg(args) {
  try {
    await new Promise(r => setTimeout(r, args.seginput * 1000));
  } catch(e) {
    console.error(e);
  }
}

async waitmin(args) {
  try {
    await new Promise(r => setTimeout(r, args.mininput * 60000));
  } catch(e) {
    console.error(e);
  }
}

async waith(args) {
  try {
    await new Promise(r => setTimeout(r, args.hinput * 3600000));
  } catch(e) {
    console.error(e);
  }
}
  }

  Scratch.extensions.register(new djdavi15waitblocksExtension());
})(Scratch);