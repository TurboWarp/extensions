(function(Scratch) {
  'use strict';
  //The icon is this logo (https://www.ldoceonline.com/external/images/logo_home_smartphone.svg?version=1.2.61) from https://www.ldoceonline.com/, coloured black in the TurboWarp costume editor 
  //The id DOES relate to the username, doesn't it?
const longmamlogo = 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI2NS43NjgwMyIgaGVpZ2h0PSI2Ni4zMTY2MSIgdmlld0JveD0iMCwwLDY1Ljc2ODAzLDY2LjMxNjYxIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjA3LjExNTk4LC0xNDYuODQxNjkpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTIwNy4xMTU5OSwyMTIuNDUxMzR2LTY0LjkwMjY3aDY1Ljc2ODAzdjY0LjkwMjY3eiIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIwIi8+PGcgZmlsbD0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIxIj48cGF0aCBkPSJNMjE3LjY4MjUsMjA2LjgwNDY2bC0wLjAwNywtOC45NzQ5MmMwLDAgNDQuNjUzLC0wLjAxNTUxIDQ0LjY0OSwtMC4wMTA2N2MtNy44Miw1LjQ3NDU1IC04LjUxOCwxNS4zMjYwMiAtOC41MTgsMTUuMzI2MDJjLTE2LjUzMSwwLjQzNjMzIC0yMS4wMTUsLTEwLjA5Nzc2IC0zNi4xMjQsLTYuMzQwNDN6Ii8+PHBhdGggZD0iTTI0OC4wMzk4NCwxOTMuMDI1NTRjMi4wMiwtNC41Mzg4NSAyLjk0NiwtOS4yNjA5NyAtMC4wMzgsLTE0LjcyNzc2YzAuNjc3LC0wLjI1MDE3IDIuMTAyLC0wLjU1ODUxIDMuNTUyLC0wLjU1ODUxYzUuMzkyLDAgOC41NDksNC4yNDg5MyA4LjU0OSw4LjgyMDc1YzAsNC4yNTI4MSAtMi41NjMsNi40ODAwNiAtMi41NjMsNi40ODAwNmMwLDAgLTEuNDM3LC0xLjMwNTEzIC00LjI3MSwtMS4zMDUxM2MtMi42NjYsMCAtNS4yMjksMS4yOTA1OCAtNS4yMjksMS4yOTA1OHoiLz48cGF0aCBkPSJNMjE3Ljg5NDg0LDE5My4wMjU1NGMyLjAyMywtNC41Mzg4NSAyLjk0OSwtOS4yNjA5NyAtMC4wMzYsLTE0LjcyNzc2YzAuNjc0LC0wLjI1MDE3IDIuMDk4LC0wLjU1ODUxIDMuNTQ4LC0wLjU1ODUxYzUuMzk2LDAgOC41NSw0LjI0ODkzIDguNTUsOC44MjA3NWMwLDQuMjUyODEgLTIuNTYzLDYuNDgwMDYgLTIuNTYzLDYuNDgwMDZjMCwwIC0xLjQzOCwtMS4zMDUxMyAtNC4yNywtMS4zMDUxM2MtMi42NjYsMCAtNS4yMjksMS4yOTA1OCAtNS4yMjksMS4yOTA1OHoiLz48cGF0aCBkPSJNMjMwLjcwNzg0LDE5My41MjM5M2MyLjcyNCwtNi4xMTA2MyAzLjk3MSwtMTIuNDcyMzkgLTAuMDUyLC0xOS44MzE5MWMwLjkwNiwtMC4zMzM1NSAyLjgyNiwtMC43NTUzNCA0Ljc3NywtMC43NTUzNGM3LjI2OCwwIDExLjUxOCw1LjcyODU5IDExLjUxOCwxMS44Nzk5NWMwLDUuNzI4NTkgLTMuNDUsOC43MjY3IC0zLjQ1LDguNzI2N2MwLDAgLTEuOTMyLC0xLjc1NjAxIC01Ljc1MywtMS43NTYwMWMtMy41OTEsMCAtNy4wNCwxLjczNjYxIC03LjA0LDEuNzM2NjF6Ii8+PHBhdGggZD0iTTIzMS43NjA4NCwxNzAuOTU4NjNjMi4wMjEsLTQuNTM3ODggMi45NDQsLTkuMjU2MTIgLTAuMDQxLC0xNC43MjQ4NWMwLjY3NSwtMC4yNDkyIDIuMTAxLC0wLjU2MDQ1IDMuNTUxLC0wLjU2MDQ1YzUuMzk0LDAgOC41NSw0LjI1MDg3IDguNTUsOC44MjE3MmMwLDQuMjUxODQgLTIuNTYyLDYuNDc4MTIgLTIuNTYyLDYuNDc4MTJjMCwwIC0xLjQzNywtMS4zMDMxOSAtNC4yNzEsLTEuMzAzMTljLTIuNjY3LDAgLTUuMjI3LDEuMjg4NjQgLTUuMjI3LDEuMjg4NjR6Ii8+PHBhdGggZD0iTTIxOS4zMjk4NCwxNzUuMjc1NDRjMS42NTMsLTMuNzE1NjMgMi40MTMsLTcuNTgxNTYgLTAuMDM0LC0xMi4wNTY0MmMwLjU1NCwtMC4yMDM2MiAxLjcyLC0wLjQ2MDU4IDIuOTA4LC0wLjQ2MDU4YzQuNDE4LDAgNy4wMDIsMy40ODE5NSA3LjAwMiw3LjIyNDc0YzAsMy40ODI5MiAtMi4wOTcsNS4zMDQ4NiAtMi4wOTcsNS4zMDQ4NmMwLDAgLTEuMTc4LC0xLjA2NjYgLTMuNDk5LC0xLjA2NjZjLTIuMTgyLDAgLTQuMjgsMS4wNTM5OSAtNC4yOCwxLjA1Mzk5eiIvPjxwYXRoIGQ9Ik0yNDYuMzI3ODQsMTc1LjI3NTQ0YzEuNjU3LC0zLjcxNTYzIDIuNDEyLC03LjU4MTU2IC0wLjAzMiwtMTIuMDU2NDJjMC41NTIsLTAuMjAzNjIgMS43MiwtMC40NjA1OCAyLjkwNiwtMC40NjA1OGM0LjQxOSwwIDcuMDA1LDMuNDgxOTUgNy4wMDUsNy4yMjQ3NGMwLDMuNDgyOTIgLTIuMDk4LDUuMzA0ODYgLTIuMDk4LDUuMzA0ODZjMCwwIC0xLjE3NywtMS4wNjY2IC0zLjUsLTEuMDY2NmMtMi4xODMsMCAtNC4yODEsMS4wNTM5OSAtNC4yODEsMS4wNTM5OXoiLz48cGF0aCBkPSJNMjMyLjUxNjg0LDE1My43MDc4OGMxLjA4NSwtMS40OTUxNyAxLjcyMSwtNC4wNDcyNSAtMC4yNjksLTUuNzIzNzRjNC4zNDYsLTEuMjUyNzcgNi45MzgsLTEuNTc1NjUgMTIuMDY2LC0wLjQ2MTU1YzAuNTc0LDAuNzk4MDEgMC44NzgsMS44NzUyNyAwLjczNSwyLjkyMjQ3YzUuNTc4LDIuMDgxOCA5LjQyNSwwLjQxMjA5IDExLjczNSwtMC45ODYxMmMwLDIuNDUyMiAtMi43MjQsNy4xNzQzMiAtNy45NDIsNy4xNzQzMmMtMy4wMTksMCAtNS41NTksLTEuMzk2MjcgLTUuNTU5LC0xLjM5NjI3YzAuNDU5LC0wLjYzNzA1IDAuNjkyLC0xLjUxMzYgMC40NDMsLTIuNTU4ODZjLTQuMTQ5LC0xLjI3NDEgLTguMDY5LC0wLjUwMTMgLTExLjIwOSwxLjAyOTc1eiIvPjwvZz48L2c+PC9nPjwvc3ZnPg==';

  class LongmanDictionary {
  getInfo() {
    return {
      id: 'longvegdictionary',
      color1: '#6BBBD1',
      color2: '#5899AB',
      color3: '#3C6874',
      menuIconURI: longmamlogo,
      blockIconURI: longmamlogo,
      name: 'Longman Dictionary',
      blocks: [
        {
          opcode: 'define',
          blockType: Scratch.BlockType.REPORTER,
          text: 'definition of [word] in the Longman Dictionary',
          arguments: {
            word: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'cat'
            }
          }
        }
      ],
    };
  }
define(args) {
  const word = args.word;
  const url = `https://www.ldoceonline.com/dictionary/${word}`;
  return Scratch.fetch(url)
    .then(response => response.text())
    .then(text => {
      const parser = new DOMParser();
      const htmlDocument = parser.parseFromString(text, 'text/html');
      const definitionElement = htmlDocument.querySelector('.DEF');
      if (definitionElement) {
        const definition = definitionElement.textContent;
        return definition;
      } else {
        return 'not found';
      }
    });
}

}
  Scratch.extensions.register(new LongmanDictionary());
})(Scratch);
