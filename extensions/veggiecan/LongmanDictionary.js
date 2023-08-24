// Name: Longman Dictionary
// ID: longvegdictionary
// Description: Get the definitions of words from the Longman Dictionary in your projects.
// By: veggiecan0419

(function (Scratch) {
  "use strict";

  //The icon is this logo (https://www.ldoceonline.com/external/images/logo_home_smartphone.svg?version=1.2.61) from https://www.ldoceonline.com/, coloured black in the TurboWarp costume editor
  //The 'man' in 'longmandictionary' has been replaced with 'veg' to make the id relate to the username
  const longmamlogoblocks =
    "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI2NS43NjgwMyIgaGVpZ2h0PSI2Ni4zMTY2MSIgdmlld0JveD0iMCwwLDY1Ljc2ODAzLDY2LjMxNjYxIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjA3LjExNTk4LC0xNDYuODQxNjkpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTIwNy4xMTU5OSwyMTIuNDUxMzR2LTY0LjkwMjY3aDY1Ljc2ODAzdjY0LjkwMjY3eiIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIwIi8+PGcgZmlsbD0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIxIj48cGF0aCBkPSJNMjE3LjY4MjUsMjA2LjgwNDY2bC0wLjAwNywtOC45NzQ5MmMwLDAgNDQuNjUzLC0wLjAxNTUxIDQ0LjY0OSwtMC4wMTA2N2MtNy44Miw1LjQ3NDU1IC04LjUxOCwxNS4zMjYwMiAtOC41MTgsMTUuMzI2MDJjLTE2LjUzMSwwLjQzNjMzIC0yMS4wMTUsLTEwLjA5Nzc2IC0zNi4xMjQsLTYuMzQwNDN6Ii8+PHBhdGggZD0iTTI0OC4wMzk4NCwxOTMuMDI1NTRjMi4wMiwtNC41Mzg4NSAyLjk0NiwtOS4yNjA5NyAtMC4wMzgsLTE0LjcyNzc2YzAuNjc3LC0wLjI1MDE3IDIuMTAyLC0wLjU1ODUxIDMuNTUyLC0wLjU1ODUxYzUuMzkyLDAgOC41NDksNC4yNDg5MyA4LjU0OSw4LjgyMDc1YzAsNC4yNTI4MSAtMi41NjMsNi40ODAwNiAtMi41NjMsNi40ODAwNmMwLDAgLTEuNDM3LC0xLjMwNTEzIC00LjI3MSwtMS4zMDUxM2MtMi42NjYsMCAtNS4yMjksMS4yOTA1OCAtNS4yMjksMS4yOTA1OHoiLz48cGF0aCBkPSJNMjE3Ljg5NDg0LDE5My4wMjU1NGMyLjAyMywtNC41Mzg4NSAyLjk0OSwtOS4yNjA5NyAtMC4wMzYsLTE0LjcyNzc2YzAuNjc0LC0wLjI1MDE3IDIuMDk4LC0wLjU1ODUxIDMuNTQ4LC0wLjU1ODUxYzUuMzk2LDAgOC41NSw0LjI0ODkzIDguNTUsOC44MjA3NWMwLDQuMjUyODEgLTIuNTYzLDYuNDgwMDYgLTIuNTYzLDYuNDgwMDZjMCwwIC0xLjQzOCwtMS4zMDUxMyAtNC4yNywtMS4zMDUxM2MtMi42NjYsMCAtNS4yMjksMS4yOTA1OCAtNS4yMjksMS4yOTA1OHoiLz48cGF0aCBkPSJNMjMwLjcwNzg0LDE5My41MjM5M2MyLjcyNCwtNi4xMTA2MyAzLjk3MSwtMTIuNDcyMzkgLTAuMDUyLC0xOS44MzE5MWMwLjkwNiwtMC4zMzM1NSAyLjgyNiwtMC43NTUzNCA0Ljc3NywtMC43NTUzNGM3LjI2OCwwIDExLjUxOCw1LjcyODU5IDExLjUxOCwxMS44Nzk5NWMwLDUuNzI4NTkgLTMuNDUsOC43MjY3IC0zLjQ1LDguNzI2N2MwLDAgLTEuOTMyLC0xLjc1NjAxIC01Ljc1MywtMS43NTYwMWMtMy41OTEsMCAtNy4wNCwxLjczNjYxIC03LjA0LDEuNzM2NjF6Ii8+PHBhdGggZD0iTTIzMS43NjA4NCwxNzAuOTU4NjNjMi4wMjEsLTQuNTM3ODggMi45NDQsLTkuMjU2MTIgLTAuMDQxLC0xNC43MjQ4NWMwLjY3NSwtMC4yNDkyIDIuMTAxLC0wLjU2MDQ1IDMuNTUxLC0wLjU2MDQ1YzUuMzk0LDAgOC41NSw0LjI1MDg3IDguNTUsOC44MjE3MmMwLDQuMjUxODQgLTIuNTYyLDYuNDc4MTIgLTIuNTYyLDYuNDc4MTJjMCwwIC0xLjQzNywtMS4zMDMxOSAtNC4yNzEsLTEuMzAzMTljLTIuNjY3LDAgLTUuMjI3LDEuMjg4NjQgLTUuMjI3LDEuMjg4NjR6Ii8+PHBhdGggZD0iTTIxOS4zMjk4NCwxNzUuMjc1NDRjMS42NTMsLTMuNzE1NjMgMi40MTMsLTcuNTgxNTYgLTAuMDM0LC0xMi4wNTY0MmMwLjU1NCwtMC4yMDM2MiAxLjcyLC0wLjQ2MDU4IDIuOTA4LC0wLjQ2MDU4YzQuNDE4LDAgNy4wMDIsMy40ODE5NSA3LjAwMiw3LjIyNDc0YzAsMy40ODI5MiAtMi4wOTcsNS4zMDQ4NiAtMi4wOTcsNS4zMDQ4NmMwLDAgLTEuMTc4LC0xLjA2NjYgLTMuNDk5LC0xLjA2NjZjLTIuMTgyLDAgLTQuMjgsMS4wNTM5OSAtNC4yOCwxLjA1Mzk5eiIvPjxwYXRoIGQ9Ik0yNDYuMzI3ODQsMTc1LjI3NTQ0YzEuNjU3LC0zLjcxNTYzIDIuNDEyLC03LjU4MTU2IC0wLjAzMiwtMTIuMDU2NDJjMC41NTIsLTAuMjAzNjIgMS43MiwtMC40NjA1OCAyLjkwNiwtMC40NjA1OGM0LjQxOSwwIDcuMDA1LDMuNDgxOTUgNy4wMDUsNy4yMjQ3NGMwLDMuNDgyOTIgLTIuMDk4LDUuMzA0ODYgLTIuMDk4LDUuMzA0ODZjMCwwIC0xLjE3NywtMS4wNjY2IC0zLjUsLTEuMDY2NmMtMi4xODMsMCAtNC4yODEsMS4wNTM5OSAtNC4yODEsMS4wNTM5OXoiLz48cGF0aCBkPSJNMjMyLjUxNjg0LDE1My43MDc4OGMxLjA4NSwtMS40OTUxNyAxLjcyMSwtNC4wNDcyNSAtMC4yNjksLTUuNzIzNzRjNC4zNDYsLTEuMjUyNzcgNi45MzgsLTEuNTc1NjUgMTIuMDY2LC0wLjQ2MTU1YzAuNTc0LDAuNzk4MDEgMC44NzgsMS44NzUyNyAwLjczNSwyLjkyMjQ3YzUuNTc4LDIuMDgxOCA5LjQyNSwwLjQxMjA5IDExLjczNSwtMC45ODYxMmMwLDIuNDUyMiAtMi43MjQsNy4xNzQzMiAtNy45NDIsNy4xNzQzMmMtMy4wMTksMCAtNS41NTksLTEuMzk2MjcgLTUuNTU5LC0xLjM5NjI3YzAuNDU5LC0wLjYzNzA1IDAuNjkyLC0xLjUxMzYgMC40NDMsLTIuNTU4ODZjLTQuMTQ5LC0xLjI3NDEgLTguMDY5LC0wLjUwMTMgLTExLjIwOSwxLjAyOTc1eiIvPjwvZz48L2c+PC9nPjwvc3ZnPg==";
  const longmamlogomenu =
    "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI2MS4yNjc0MiIgaGVpZ2h0PSI2MS4xODQ5NSIgdmlld0JveD0iMCwwLDYxLjI2NzQyLDYxLjE4NDk1Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjA5LjM2NjI5LC0xNDkuNDA3NTMpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0yNjkuNjMzNzEsMTgwYzAsMTYuMzQzNDcgLTEzLjI2NzQ3LDI5LjU5MjQ4IC0yOS42MzM3MSwyOS41OTI0OGMtMTYuMzY2MjUsMCAtMjkuNjMzNzEsLTEzLjI0OTAxIC0yOS42MzM3MSwtMjkuNTkyNDhjMCwtMTYuMzQzNDcgMTMuMjY3NDcsLTI5LjU5MjQ3IDI5LjYzMzcxLC0yOS41OTI0N2MxNi4zNjYyNSwwIDI5LjYzMzcxLDEzLjI0OSAyOS42MzM3MSwyOS41OTI0N3oiIGZpbGw9IiM2YmJiZDEiIHN0cm9rZT0iIzUxOGZhMCIgc3Ryb2tlLXdpZHRoPSIyIi8+PGcgc3Ryb2tlPSJub25lIj48cGF0aCBkPSJNMjE1LjMxNzU5LDIwNC4zNTc2NXYtNDguNzE1MjhoNDkuMzY0ODJ2NDguNzE1Mjh6IiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjAiLz48ZyBmaWxsPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjEiPjxwYXRoIGQ9Ik0yMjMuMjQ4NywyMDAuMTE5M2wtMC4wMDUyNSwtNi43MzY0OWMwLDAgMzMuNTE2MDksLTAuMDExNjQgMzMuNTEzMDksLTAuMDA4MDFjLTUuODY5NjEsNC4xMDkxNCAtNi4zOTM1MiwxMS41MDM1NiAtNi4zOTM1MiwxMS41MDM1NmMtMTIuNDA4LDAuMzI3NSAtMTUuNzczNjUsLTcuNTc5MjcgLTI3LjExNDMxLC00Ljc1OTA2eiIvPjxwYXRoIGQ9Ik0yNDYuMDM0NiwxODkuNzc2ODRjMS41MTYxOSwtMy40MDY4MSAyLjIxMTI0LC02Ljk1MTE5IC0wLjAyODUyLC0xMS4wNTQ1MWMwLjUwODE1LC0wLjE4Nzc3IDEuNTc3NzQsLTAuNDE5MjEgMi42NjYwOSwtMC40MTkyMWM0LjA0NzE4LDAgNi40MTY3OSwzLjE4OTIxIDYuNDE2NzksNi42MjA3N2MwLDMuMTkyMTEgLTEuOTIzNzYsNC44NjM4NiAtMS45MjM3Niw0Ljg2Mzg2YzAsMCAtMS4wNzg2LC0wLjk3OTYyIC0zLjIwNTc2LC0wLjk3OTYyYy0yLjAwMTA3LDAgLTMuOTI0ODMsMC45Njg2OSAtMy45MjQ4MywwLjk2ODY5eiIvPjxwYXRoIGQ9Ik0yMjMuNDA4MDgsMTg5Ljc3Njg0YzEuNTE4NDQsLTMuNDA2ODEgMi4yMTM0OCwtNi45NTExOSAtMC4wMjcwMiwtMTEuMDU0NTFjMC41MDU5LC0wLjE4Nzc3IDEuNTc0NzMsLTAuNDE5MjEgMi42NjMwOSwtMC40MTkyMWM0LjA1MDE4LDAgNi40MTc1NSwzLjE4OTIxIDYuNDE3NTUsNi42MjA3N2MwLDMuMTkyMTEgLTEuOTIzNzYsNC44NjM4NiAtMS45MjM3Niw0Ljg2Mzg2YzAsMCAtMS4wNzkzNiwtMC45Nzk2MiAtMy4yMDUwMiwtMC45Nzk2MmMtMi4wMDEwNywwIC0zLjkyNDgzLDAuOTY4NjkgLTMuOTI0ODMsMC45Njg2OXoiLz48cGF0aCBkPSJNMjMzLjAyNTM5LDE5MC4xNTA5MmMyLjA0NDYxLC00LjU4NjU3IDIuOTgwNiwtOS4zNjE2NiAtMC4wMzkwMywtMTQuODg1NjRjMC42ODAwNCwtMC4yNTAzNiAyLjEyMTE2LC0wLjU2Njk1IDMuNTg1NTcsLTAuNTY2OTVjNS40NTUyOSwwIDguNjQ1Myw0LjI5OTgyIDguNjQ1Myw4LjkxNjk3YzAsNC4yOTk4MiAtMi41ODk1Myw2LjU1MDE3IC0yLjU4OTUzLDYuNTUwMTdjMCwwIC0xLjQ1MDE0LC0xLjMxODA1IC00LjMxODE1LC0xLjMxODA1Yy0yLjY5NTM3LDAgLTUuMjg0MTYsMS4zMDM0OCAtNS4yODQxNiwxLjMwMzQ4eiIvPjxwYXRoIGQ9Ik0yMzMuODE1NzYsMTczLjIxMzY0YzEuNTE2OTUsLTMuNDA2MDkgMi4yMDk3NCwtNi45NDc1NCAtMC4wMzA3OCwtMTEuMDUyMzJjMC41MDY2NCwtMC4xODcwNSAxLjU3NywtMC40MjA2NyAyLjY2NTM0LC0wLjQyMDY3YzQuMDQ4NjksMCA2LjQxNzU1LDMuMTkwNjYgNi40MTc1NSw2LjYyMTVjMCwzLjE5MTM5IC0xLjkyMzAyLDQuODYyNDEgLTEuOTIzMDIsNC44NjI0MWMwLDAgLTEuMDc4NiwtMC45NzgxNSAtMy4yMDU3NiwtMC45NzgxNWMtMi4wMDE4MywwIC0zLjkyMzM0LDAuOTY3MjQgLTMuOTIzMzQsMC45NjcyNHoiLz48cGF0aCBkPSJNMjI0LjQ4NTE4LDE3Ni40NTM3OWMxLjI0MDczLC0yLjc4ODkyIDEuODExMTcsLTUuNjkwNjUgLTAuMDI1NTIsLTkuMDQ5NDNjMC40MTU4MywtMC4xNTI4MyAxLjI5MTAxLC0wLjM0NTcgMi4xODI3MiwtMC4zNDU3YzMuMzE2MTEsMCA1LjI1NTYzLDIuNjEzNTEgNS4yNTU2Myw1LjQyMjgyYzAsMi42MTQyNCAtMS41NzM5OCwzLjk4MTc3IC0xLjU3Mzk4LDMuOTgxNzdjMCwwIC0wLjg4NDIsLTAuODAwNTcgLTIuNjI2MzEsLTAuODAwNTdjLTEuNjM3NzksMCAtMy4yMTI1MiwwLjc5MTExIC0zLjIxMjUyLDAuNzkxMTF6Ii8+PHBhdGggZD0iTTI0NC43NDk1OSwxNzYuNDUzNzljMS4yNDM3MywtMi43ODg5MiAxLjgxMDQzLC01LjY5MDY1IC0wLjAyNDAyLC05LjA0OTQzYzAuNDE0MzIsLTAuMTUyODMgMS4yOTEwMSwtMC4zNDU3IDIuMTgxMjEsLTAuMzQ1N2MzLjMxNjg2LDAgNS4yNTc4OSwyLjYxMzUxIDUuMjU3ODksNS40MjI4MmMwLDIuNjE0MjQgLTEuNTc0NzMsMy45ODE3NyAtMS41NzQ3MywzLjk4MTc3YzAsMCAtMC44ODM0NCwtMC44MDA1NyAtMi42MjcwNywtMC44MDA1N2MtMS42Mzg1NCwwIC0zLjIxMzI3LDAuNzkxMTEgLTMuMjEzMjcsMC43OTExMXoiLz48cGF0aCBkPSJNMjM0LjM4MzIxLDE2MC4yNjU0YzAuODE0MzksLTEuMTIyMjYgMS4yOTE3NiwtMy4wMzc4MyAtMC4yMDE5MSwtNC4yOTYxOGMzLjI2MjA2LC0wLjk0MDMxIDUuMjA3NTksLTEuMTgyNjYgOS4wNTY2MiwtMC4zNDY0NGMwLjQzMDgzLDAuNTk4OTggMC42NTkwMiwxLjQwNzU3IDAuNTUxNjksMi4xOTM1OGM0LjE4Njc5LDEuNTYyNTggNy4wNzQzMiwwLjMwOTMxIDguODA4MTcsLTAuNzQwMTdjMCwxLjg0MDU5IC0yLjA0NDYxLDUuMzg0OTcgLTUuOTYxMTgsNS4zODQ5N2MtMi4yNjYwMiwwIC00LjE3MjUzLC0xLjA0ODAzIC00LjE3MjUzLC0xLjA0ODAzYzAuMzQ0NTEsLTAuNDc4MTcgMC41MTk0LC0xLjEzNjEgMC4zMzI1MSwtMS45MjA2NmMtMy4xMTQyLC0wLjk1NjMyIC02LjA1NjUsLTAuMzc2MjcgLTguNDEzMzYsMC43NzI5MnoiLz48L2c+PC9nPjwvZz48L2c+PC9zdmc+";

  class LongmanDictionary {
    getInfo() {
      return {
        id: "longvegdictionary",
        color1: "#6BBBD1",
        color2: "#5899AB",
        color3: "#3C6874",
        menuIconURI: longmamlogomenu,
        blockIconURI: longmamlogoblocks,
        name: "Longman Dictionary",
        blocks: [
          {
            opcode: "define",
            blockType: Scratch.BlockType.REPORTER,
            text: "primary definition of [word] in the Longman Dictionary",
            arguments: {
              word: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "cat",
              },
            },
          },
          {
            opcode: "getalldefs",
            blockType: Scratch.BlockType.REPORTER,
            text: "all definitions of [word] in the Longman Dictionary",
            arguments: {
              word: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "cat",
              },
            },
          },
        ],
      };
    }
    define(args) {
      const word = args.word;
      const url = `https://www.ldoceonline.com/dictionary/${encodeURIComponent(
        word
      )}`;
      return Scratch.fetch(url)
        .then((response) => response.text())
        .then((text) => {
          const parser = new DOMParser();
          const htmlDocument = parser.parseFromString(text, "text/html");
          const definitionElement = htmlDocument.querySelector(".DEF");
          return definitionElement.textContent;
        })
        .catch((error) => {
          return "couldn't define";
        });
    }
    getalldefs(args) {
      const word = args.word;
      const url = `https://www.ldoceonline.com/dictionary/${encodeURIComponent(
        word
      )}`;
      return Scratch.fetch(url)
        .then((response) => response.text())
        .then((text) => {
          const parser = new DOMParser();
          const htmlDocument = parser.parseFromString(text, "text/html");
          const definitionElements = htmlDocument.querySelectorAll(".DEF");
          const definitions = Array.from(definitionElements).map(
            (element) => element.textContent
          );
          return definitions;
        })
        .catch((error) => {
          return "Couldn't define";
        });
    }
  }
  Scratch.extensions.register(new LongmanDictionary());
})(Scratch);
