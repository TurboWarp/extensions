// Name: RegExp
// ID: truefantomregexp
// Description: Full interface for working with Regular Expressions.
// By: TrueFantom <https://scratch.mit.edu/users/TrueFantom/>

((Scratch) => {
  "use strict";

  const icon =
    "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIyMjUuMzU0ODEiIGhlaWdodD0iMjI1LjM1NDgiIHZpZXdCb3g9IjAsMCwyMjUuMzU0ODEsMjI1LjM1NDgiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMjcuMzIyODUsLTY3LjMyMjYpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlLXdpZHRoPSIwIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTEyNy4zMjI4NywxODBjMCwtNjIuMjMwMDEgNTAuNDQ3MzksLTExMi42Nzc0IDExMi42Nzc0LC0xMTIuNjc3NGM2Mi4yMzAwMSwwIDExMi42Nzc0LDUwLjQ0NzM5IDExMi42Nzc0LDExMi42Nzc0YzAsNjIuMjMwMDEgLTUwLjQ0NzM5LDExMi42Nzc0IC0xMTIuNjc3NCwxMTIuNjc3NGMtNjIuMjMwMDEsMCAtMTEyLjY3NzQsLTUwLjQ0NzM5IC0xMTIuNjc3NCwtMTEyLjY3NzR6IiBmaWxsPSIjZTYyODJhIiBzdHJva2U9Im5vbmUiLz48cGF0aCBkPSJNMTI3LjMyMjg2LDE4MGMwLC02Mi4yMzAwMSA1MC40NDczOSwtMTEyLjY3NzQgMTEyLjY3NzQsLTExMi42Nzc0YzYyLjIzMDAxLDAgMTEyLjY3NzQsNTAuNDQ3MzkgMTEyLjY3NzQsMTEyLjY3NzRjMCw2Mi4yMzAwMSAtNTAuNDQ3MzksMTEyLjY3NzQgLTExMi42Nzc0LDExMi42Nzc0Yy02Mi4yMzAwMSwwIC0xMTIuNjc3NCwtNTAuNDQ3MzkgLTExMi42Nzc0LC0xMTIuNjc3NHoiIGZpbGw9IiNlNjI4MmEiIHN0cm9rZT0ibm9uZSIvPjxwYXRoIGQ9Ik0zMDcuODI3MTEsMjM1LjAxMzU5Yy0xLjYxMjIzLDIuNzM3OTcgLTQuOTMyODgsMi40NjE0NyAtNy42NDkyMywxLjA4NTAzYy0yLjgzNDI1LC0xLjQzNjE5IC00MS42NTEwMSwtMjQuMDQ3NDkgLTQxLjY1MTAxLC0yNC4wNDc0OWMwLDAgLTAuMTUyMjEsMzAuMDcyMDYgLTAuMTUyMjEsNDkuMzE5ODhjMCwyLjU5NDYzIC0xLjUyNTkxLDQuNTU2MjcgLTQuMDk5NSw0Ljk1MTM5Yy0yLjU3MzYsMC4zOTUxMiAtMjQuODYyNzIsMC4wMDg2OSAtMjguMDM5MDQsLTAuMDE3MTZjLTMuMTc2MzIsLTAuMDI1ODUgLTQuNjk2NzMsLTIuOTgzNDQgLTQuNzY3MjUsLTYuMDc1NzNjLTAuMDcyMzcsLTMuMTc1NiAwLC00OC4wOTczMiAwLC00OC4wOTczMmMwLDAgLTI1Ljg4OTU3LDE1LjMxNTYxIC00Mi43ODk5OSwyNC41Mjg1N2MtMi4yNDc4MywxLjI5NDkzIC00LjcwOTY5LDAuOTYwNTEgLTYuMzM4MzYsLTEuMDcwM2MtMS42Mjg2NywtMi4wMzA4MSAtMTIuNDI4NzcsLTIxLjUzNDEgLTE0LjAwMjM2LC0yNC4yOTI5MmMtMS41NzM1OSwtMi43NTg4MSAwLjYyNTYsLTUuODUzMDQgMi44Njk2OSwtNy4xNjgxYzIuNzQwMTcsLTEuNjA1NzkgNDEuODAwNzUsLTI0LjEzNTg0IDQxLjgwMDc1LC0yNC4xMzU4NGMwLDAgLTQwLjU1NzI0LC0yMy4zMjU2NSAtNDIuOTA1NCwtMjQuNzc5Yy0yLjM0ODE2LC0xLjQ1MzM1IC0yLjc3NTY2LC0zLjk4ODI3IC0xLjc2MDEyLC02LjU2NjY0YzEuMDE1NTQsLTIuNTc4MzcgMTEuNTU0MzIsLTE5Ljk1MjM2IDEzLjY0ODg1LC0yMy42MTc4N2MyLjA5NDU0LC0zLjY2NTUxIDQuMDc3MDcsLTMuMDgwNjYgNi42MzUzNiwtMS44OTk5OWMyLjU1ODI5LDEuMTgwNjcgNDIuODM2NjgsMjQuNzMyMzEgNDIuODM2NjgsMjQuNzMyMzFjMCwwIC0wLjA2NTUyLC00Ni42MTg2NSAwLjAxNDczLC00OS4zNzg3M2MwLjA4MDI1LC0yLjc2MDA4IDIuMDYzNTUsLTQuMzk4NyA0LjgwNDA4LC00LjgwOTA0YzIuNzQwNTMsLTAuNDEwMzQgMjcuMDM5ODksMC4wMzQzNiAyNy4xMDEyNywwLjAzMTkzYzAuMDYxMzgsLTAuMDAyNDMgMC4xMTc4NSwtMC4wMTcyMSAwLjE3OTIzLC0wLjAxNzIxYzIuODA2NSwwIDQuNzAyNDksMS45OTA0MiA0Ljk1ODczLDQuNzk0MjdjMC4yNTYyNCwyLjgwMzg1IDAsNDkuNDYyMjcgMCw0OS40NjIyN2MwLDAgNDAuMzQyMTcsLTIzLjM3ODYyIDQyLjc3NTMxLC0yNC42ODU3NWMyLjQzMzE0LC0xLjMwNzEzIDQuODQyOTksLTAuNDExMDIgNi41NjkwNywxLjc1NzY4YzEuNzI2MDcsMi4xNjg3MSAxMy40OTE2OSwyMy40MzYyMSAxMy41MjM2MiwyMy40ODc3M2MwLjAzMTkzLDAuMDUxNTIgMC4wNzM2NywwLjA5MzMgMC4xMDMxMiwwLjE0NDgyYzEuNDA0NDksMi40MzM0MSAwLjYyNzksNS4wNzI2MiAtMS42NzQxOSw2LjY5OTIxYy0yLjMwMjA5LDEuNjI2NiAtNDIuNjg5MzgsMjQuNjQ2NDMgLTQyLjY4OTM4LDI0LjY0NjQzbDQyLjQwOTUsMjQuNjc4MzZjMC4wMjQ1OSwwLjAxNDcyIDAuMDU0MDQsMC4wMjIwNyAwLjA3ODU4LDAuMDM2NzljMi4xMTM1OSwxLjIyMjUxIDIuOTc1MiwzLjc2MDggMi4xNzAwNiw1Ljk3NzUxYy0wLjgwNTE0LDIuMjE2NzEgLTEyLjM0ODM0LDIxLjU4NjkyIC0xMy45NjA1OCwyNC4zMjQ4OXoiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0iI2I4MjAyMiIvPjwvZz48L2c+PC9zdmc+PCEtLXJvdGF0aW9uQ2VudGVyOjExMi42NzcxNDU6MTEyLjY3NzQwNS0tPg==";
  const miniRegExp =
    "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxOS4xNDc3MiIgaGVpZ2h0PSIyMC4xNjg5OSIgdmlld0JveD0iMCwwLDE5LjE0NzcyLDIwLjE2ODk5Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjMwLjQzMzEsLTE2OS45MTUzNCkiPjxnIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2lzUGFpbnRpbmdMYXllciZxdW90Ozp0cnVlfSIgZmlsbD0iI2ZmZmZmZiIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9IiNiODIwMjIiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0yNDcuNTMwNzgsMTg2LjEwODEzYy0wLjE3OTAxLDAuMzA0IC0wLjU0NzcsMC4yNzMzIC0wLjg0OTI5LDAuMTIwNDdjLTAuMzE0NjksLTAuMTU5NDYgLTQuNjI0NDksLTIuNjY5OTggLTQuNjI0NDksLTIuNjY5OThjMCwwIC0wLjAxNjksMy4zMzg4OCAtMC4wMTY5LDUuNDc1OTZjMCwwLjI4ODA4IC0wLjE2OTQyLDAuNTA1ODggLTAuNDU1MTcsMC41NDk3NWMtMC4yODU3NCwwLjA0Mzg3IC0yLjc2MDQ5LDAuMDAwOTcgLTMuMTEzMTYsLTAuMDAxOTFjLTAuMzUyNjcsLTAuMDAyODcgLTAuNTIxNDcsLTAuMzMxMjUgLTAuNTI5MywtMC42NzQ1OGMtMC4wMDgwNCwtMC4zNTI1OSAwLC01LjM0MDIyIDAsLTUuMzQwMjJjMCwwIC0yLjg3NDUxLDEuNzAwNDggLTQuNzUwOTUsMi43MjMzOWMtMC4yNDk1NywwLjE0Mzc4IC0wLjUyMjkxLDAuMTA2NjUgLTAuNzAzNzQsLTAuMTE4ODNjLTAuMTgwODMsLTAuMjI1NDggLTEuMzc5OTYsLTIuMzkwOTIgLTEuNTU0NjcsLTIuNjk3MjNjLTAuMTc0NzIsLTAuMzA2MzEgMC4wNjk0NiwtMC42NDk4NiAwLjMxODYyLC0wLjc5NTg3YzAuMzA0MjQsLTAuMTc4MjkgNC42NDExMiwtMi42Nzk3OSA0LjY0MTEyLC0yLjY3OTc5YzAsMCAtNC41MDMwNSwtMi41ODk4MyAtNC43NjM3NywtMi43NTEyYy0wLjI2MDcyLC0wLjE2MTM3IC0wLjMwODE4LC0wLjQ0MjgyIC0wLjE5NTQyLC0wLjcyOTA5YzAuMTEyNzYsLTAuMjg2MjcgMS4yODI4NiwtMi4yMTUzIDEuNTE1NDIsLTIuNjIyMjhjMC4yMzI1NiwtMC40MDY5OCAwLjQ1MjY4LC0wLjM0MjA1IDAuNzM2NzIsLTAuMjEwOTZjMC4yODQwNCwwLjEzMTA5IDQuNzU2MTMsMi43NDYwMiA0Ljc1NjEzLDIuNzQ2MDJjMCwwIC0wLjAwNzI4LC01LjE3NjA1IDAuMDAxNjMsLTUuNDgyNWMwLjAwODkxLC0wLjMwNjQ1IDAuMjI5MTIsLTAuNDg4MzggMC41MzM0LC0wLjUzMzk0YzAuMzA0MjgsLTAuMDQ1NTYgMy4wMDIyMiwwLjAwMzgyIDMuMDA5MDQsMC4wMDM1NWMwLjAwNjgyLC0wLjAwMDI3IDAuMDEzMDgsLTAuMDAxOTEgMC4wMTk5LC0wLjAwMTkxYzAuMzExNiwwIDAuNTIyMTIsMC4yMjA5OSAwLjU1MDU3LDAuNTMyM2MwLjAyODQ1LDAuMzExMzEgMCw1LjQ5MTc3IDAsNS40OTE3N2MwLDAgNC40NzkxNywtMi41OTU3MSA0Ljc0OTMyLC0yLjc0MDg0YzAuMjcwMTUsLTAuMTQ1MTMgMC41Mzc3MiwtMC4wNDU2NCAwLjcyOTM2LDAuMTk1MTVjMC4xOTE2NCwwLjI0MDc5IDEuNDk3OTcsMi42MDIxMSAxLjUwMTUyLDIuNjA3ODNjMC4wMDM1NSwwLjAwNTcyIDAuMDA4MTgsMC4wMTAzNiAwLjAxMTQ1LDAuMDE2MDhjMC4xNTU5NCwwLjI3MDE4IDAuMDY5NzEsMC41NjMyMSAtMC4xODU4OCwwLjc0MzgxYy0wLjI1NTYsMC4xODA2IC00LjczOTc4LDIuNzM2NDggLTQuNzM5NzgsMi43MzY0OGw0LjcwODcxLDIuNzQwMDJjMC4wMDI3MywwLjAwMTYzIDAuMDA2LDAuMDAyNDUgMC4wMDg3MiwwLjAwNDA5YzAuMjM0NjcsMC4xMzU3NCAwLjMzMDM0LDAuNDE3NTYgMC4yNDA5NCwwLjY2MzY4Yy0wLjA4OTQsMC4yNDYxMiAtMS4zNzEwMywyLjM5Njc4IC0xLjU1MDA0LDIuNzAwNzh6Ii8+PC9nPjwvZz48L3N2Zz48IS0tcm90YXRpb25DZW50ZXI6OS41NjY4OTk5MDE1NTA1NTY6MTAuMDg0NjU5Mjc0MTI5MjIzLS0+";
  const miniJson =
    "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxOS4yMDkxNiIgaGVpZ2h0PSIxOS4wNzY2MiIgdmlld0JveD0iMCwwLDE5LjIwOTE2LDE5LjA3NjYyIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjMwLjEwNDY5LC0xNzAuODMzNTYpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGw9IiNmZmZmZmYiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSIjQjgyMDIyIiBzdHJva2Utd2lkdGg9IjAuOTc1IiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTI0MS4wMTI1MiwxODUuMzM3NzNjNC42MzY1OCwtMy41MjM2NiAxLjQ1MjgsLTEwLjgxNjQ4IC0yLjU0OTY0LC0xMC4xOTE2MmMtNy4wNzAyNywxLjEwMzgxIC01Ljg0MDM1LDEwLjM5ODYzIC0zLjU4Njk1LDEzLjEzODFjMC4xMTM0MywwLjEzNzg5IC0wLjA4MTQyLDAuMTYwOTIgLTAuMjMyOTgsMC4wNjY1M2MtMy40MjgsLTIuMTM0ODQgLTQuODAwMDUsLTYuNjE2MjMgLTMuNjUzODUsLTEwLjQ1OTM5YzAuOTY2MDksLTMuMjM5MjMgMy45Nzg0MiwtNi40NDczMyA4LjU0MjA1LC02LjU3MDI4YzcuMjAyNTEsLTAuNjU2OTcgOS4zNDg0NCwxMy4zNTcxNiAxLjQ4MTM3LDE0LjAxNjY2eiIvPjxwYXRoIGQ9Ik0yNDEuNjQ5MjgsMTg1LjQyODljNS40NTM4LC0xLjM5MDQzIDUuNjMyODksLTguOTc4MTMgMi41NjgwNywtMTMuMTMzNTRjLTAuMDg0OTUsLTAuMTE1MTggLTAuMTY2ODIsLTAuMzQyMTMgLTAuMDQ3ODUsLTAuMjYyNTdjOC45MDM1Myw1Ljk1Mzk5IDMuNDQ5NzQsMTYuMzAyNDkgLTMuMTM3MDUsMTcuMzg5OWMtNC4zMzk1MywwLjcxNjQyIC03LjExODg2LC0yLjEzMTMgLTcuNjEyODYsLTYuNTE3MjdjLTAuMzM4NTgsLTMuMDA2MDYgMC41NDk4NywtNy4xNjY1NSA0LjY2ODksLTcuMzc2NjNjLTQuMDcxMiwzLjAxNDU2IC0xLjY4MzYxLDExLjQ4MTA1IDMuNTYwNzksOS45MDAxMXoiLz48L2c+PC9nPjwvc3ZnPjwhLS1yb3RhdGlvbkNlbnRlcjo5Ljg5NTMwODI4MDc3MDg0ODo5LjE2NjQzNTAwMDAwMDAwNy0tPg==";

  const cast = Scratch.Cast;

  const toScratchData = (val) => {
    return val === undefined || typeof val === "object" ? "" : val;
  };

  const toJsonData = (val) => {
    return JSON.parse(val);
  };
  const toJsonString = (val) => {
    return JSON.stringify(
      val,
      (key, value) => {
        return value === undefined ? "" : value;
      },
      0
    );
  };

  const isNotPrimitiveData = (val) => {
    return val instanceof Object;
  };
  const isArray = (val) => {
    return val instanceof Array;
  };
  const isObject = (val) => {
    return val instanceof Object && !(val instanceof Array);
  };

  const toArray = (val) => {
    return isArray(val) ? val : isObject(val) ? Object.values(val) : [val];
  };
  const toObject = (val) => {
    return isObject(val)
      ? val
      : isArray(val)
      ? val.reduce(
          (array, currentValue, currentIndex) => ({
            ...array,
            [currentIndex + 1]: currentValue,
          }),
          {}
        )
      : { 1: val };
  };

  const dataValues = (val) => {
    return Object.values(toObject(val));
  };
  const dataKeys = (val) => {
    return Object.keys(toObject(val));
  };
  const dataPairs = (val) => {
    return toObject(val);
  };
  const dataMap = (val) => {
    return Object.entries(toObject(val));
  };

  const toRegExpData = (val) => {
    let arr = /\/(.*)\/(.*)/.exec(val);
    return new RegExp(arr[1], arr[2]);
  };
  const toRegExpString = (val) => {
    return String(val);
  };

  const RegExpCompare = (redat, restr) => {
    let arr = /\/(.*)\/(.*)/.exec(restr);
    return (
      toRegExpString(redat) ===
      "/" + arr[1] + "/" + Array.from(arr[2]).sort().join("")
    );
  };

  class ScratchRegExp {
    getInfo() {
      return {
        id: "truefantomregexp",
        name: "RegExp",

        color1: "#e6282a",

        menuIconURI: icon,

        blocks: [
          {
            opcode: "is_regexp_block",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is [IMAGE] [A] ?",
            arguments: {
              A: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/apple/gi",
              },
              IMAGE: {
                type: Scratch.ArgumentType.IMAGE,
                dataURI: miniRegExp,
              },
            },
          },
          "---",
          {
            opcode: "regexp_equal_block",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[IMAGE] [A] = [IMAGE] [B]",
            arguments: {
              A: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/apple/gi",
              },
              B: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/apple/ig",
              },
              IMAGE: {
                type: Scratch.ArgumentType.IMAGE,
                dataURI: miniRegExp,
              },
            },
          },
          "---",
          {
            opcode: "regexp_block",
            blockType: Scratch.BlockType.REPORTER,
            text: "[IMAGE] with pattern [A] and flags [B]",
            arguments: {
              A: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "apple",
              },
              B: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "gi",
              },
              IMAGE: {
                type: Scratch.ArgumentType.IMAGE,
                dataURI: miniRegExp,
              },
            },
          },
          {
            opcode: "regexp_contains_flags_block",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[IMAGE] [A] contains flags [B] ?",
            arguments: {
              A: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/apple/gi",
              },
              B: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "gi",
              },
              IMAGE: {
                type: Scratch.ArgumentType.IMAGE,
                dataURI: miniRegExp,
              },
            },
          },
          {
            opcode: "regexp_components_block",
            blockType: Scratch.BlockType.REPORTER,
            text: "[B] of [IMAGE] [A]",
            arguments: {
              A: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/apple/gi",
              },
              B: {
                type: Scratch.ArgumentType.STRING,
                menu: "components_menu",
              },
              IMAGE: {
                type: Scratch.ArgumentType.IMAGE,
                dataURI: miniRegExp,
              },
            },
          },
          "---",
          {
            opcode: "regexp_set_pattern_flags_block",
            blockType: Scratch.BlockType.REPORTER,
            text: "[IMAGE] set [B] of [IMAGE] [A] to [C]",
            arguments: {
              A: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/apple/gi",
              },
              B: {
                type: Scratch.ArgumentType.STRING,
                menu: "components_menu",
              },
              C: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "banana",
              },
              IMAGE: {
                type: Scratch.ArgumentType.IMAGE,
                dataURI: miniRegExp,
              },
            },
          },
          {
            opcode: "regexp_add_flags_block",
            blockType: Scratch.BlockType.REPORTER,
            text: "[IMAGE] add flags [B] to [IMAGE] [A]",
            arguments: {
              A: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/apple/gi",
              },
              B: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "gi",
              },
              IMAGE: {
                type: Scratch.ArgumentType.IMAGE,
                dataURI: miniRegExp,
              },
            },
          },
          {
            opcode: "regexp_delete_flags_block",
            blockType: Scratch.BlockType.REPORTER,
            text: "[IMAGE] delete flags [B] of [IMAGE] [A]",
            arguments: {
              A: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/apple/gi",
              },
              B: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "gi",
              },
              IMAGE: {
                type: Scratch.ArgumentType.IMAGE,
                dataURI: miniRegExp,
              },
            },
          },
          "---",
          {
            opcode: "regexp_test_block",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "[A] matches with [IMAGE] [B] ?",
            arguments: {
              A: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "apple",
              },
              B: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/apple/gi",
              },
              IMAGE: {
                type: Scratch.ArgumentType.IMAGE,
                dataURI: miniRegExp,
              },
            },
          },
          {
            opcode: "regexp_replace_block",
            blockType: Scratch.BlockType.REPORTER,
            text: "replace matches of [A] with [IMAGE] [B] to [C]",
            arguments: {
              A: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "apple",
              },
              B: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/apple/gi",
              },
              C: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "banana",
              },
              IMAGE: {
                type: Scratch.ArgumentType.IMAGE,
                dataURI: miniRegExp,
              },
            },
          },
          {
            opcode: "regexp_split_block",
            blockType: Scratch.BlockType.REPORTER,
            text: "[IMAGE2] [A] split by matches with [IMAGE1] [B]",
            arguments: {
              A: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "apple",
              },
              B: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/apple/gi",
              },
              IMAGE1: {
                type: Scratch.ArgumentType.IMAGE,
                dataURI: miniRegExp,
              },
              IMAGE2: {
                type: Scratch.ArgumentType.IMAGE,
                dataURI: miniJson,
              },
            },
          },
          {
            opcode: "regexp_match_block",
            blockType: Scratch.BlockType.REPORTER,
            text: "[IMAGE2] match [C] of [A] with [IMAGE1] [B]",
            arguments: {
              A: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "apple",
              },
              B: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "/apple/gi",
              },
              C: {
                type: Scratch.ArgumentType.STRING,
                menu: "match_menu",
              },
              IMAGE1: {
                type: Scratch.ArgumentType.IMAGE,
                dataURI: miniRegExp,
              },
              IMAGE2: {
                type: Scratch.ArgumentType.IMAGE,
                dataURI: miniJson,
              },
            },
          },
        ],
        menus: {
          components_menu: {
            acceptReporters: false,
            items: ["pattern", "flags"],
          },
          match_menu: {
            acceptReporters: false,
            items: ["values", "keys", "pairs", "map"],
          },
        },
      };
    }

    is_regexp_block({ A }) {
      try {
        let restr = cast.toString(A);
        let redat = toRegExpData(restr);
        return RegExpCompare(redat, restr);
      } catch (err) {
        return false;
      }
    }
    regexp_equal_block({ A, B }) {
      try {
        let restr1 = cast.toString(A);
        let redat1 = toRegExpData(restr1);
        let restr2 = cast.toString(B);
        let redat2 = toRegExpData(restr2);
        if (RegExpCompare(redat1, restr1) && RegExpCompare(redat2, restr2)) {
          return (
            redat1.source === redat2.source && redat1.flags === redat2.flags
          );
        }
        return false;
      } catch (err) {
        return false;
      }
    }
    regexp_block({ A, B }) {
      try {
        return toRegExpString(new RegExp(cast.toString(A), cast.toString(B)));
      } catch (err) {
        return "";
      }
    }
    regexp_contains_flags_block({ A, B }) {
      try {
        let restr = cast.toString(A);
        let redat = toRegExpData(restr);
        if (RegExpCompare(redat, restr)) {
          let output = true;
          let flags = Array.from(redat.flags);
          Array.from(cast.toString(B)).forEach((flag) =>
            flags.includes(flag)
              ? flags.splice(flags.indexOf(flag), 1)
              : (output = false)
          );
          return output;
        }
        return false;
      } catch (err) {
        return false;
      }
    }
    regexp_components_block({ A, B }) {
      try {
        let restr = cast.toString(A);
        let redat = toRegExpData(restr);
        if (RegExpCompare(redat, restr)) {
          const components = cast.toString(B).toLowerCase();
          switch (components) {
            case "pattern":
              return redat.source;
            case "flags":
              return redat.flags;
          }
        }
        return "";
      } catch (err) {
        return "";
      }
    }
    regexp_set_pattern_flags_block({ A, B, C }) {
      try {
        let restr = cast.toString(A);
        let redat = toRegExpData(restr);
        if (RegExpCompare(redat, restr)) {
          const components = cast.toString(B).toLowerCase();
          switch (components) {
            case "pattern":
              return toRegExpString(new RegExp(cast.toString(C), redat.flags));
            case "flags":
              return toRegExpString(new RegExp(redat.source, cast.toString(C)));
          }
        }
        return "";
      } catch (err) {
        return "";
      }
    }
    regexp_add_flags_block({ A, B }) {
      try {
        let restr = cast.toString(A);
        let redat = toRegExpData(restr);
        if (RegExpCompare(redat, restr)) {
          let flagtest = new RegExp("test", cast.toString(B));
          let flags = Array.from(redat.flags);
          Array.from(cast.toString(B)).forEach((flag) =>
            flags.includes(flag) ? void 0 : flags.push(flag)
          );
          return toRegExpString(new RegExp(redat.source, flags.join("")));
        }
        return "";
      } catch (err) {
        return "";
      }
    }
    regexp_delete_flags_block({ A, B }) {
      try {
        let restr = cast.toString(A);
        let redat = toRegExpData(restr);
        if (RegExpCompare(redat, restr)) {
          let flagtest = new RegExp("test", cast.toString(B));
          let flags = Array.from(redat.flags);
          Array.from(cast.toString(B)).forEach((flag) =>
            flags.includes(flag) ? flags.splice(flags.indexOf(flag), 1) : void 0
          );
          return toRegExpString(new RegExp(redat.source, flags.join("")));
        }
        return "";
      } catch (err) {
        return "";
      }
    }
    regexp_test_block({ A, B }) {
      try {
        let restr = cast.toString(B);
        let redat = toRegExpData(restr);
        if (RegExpCompare(redat, restr)) {
          return redat.test(cast.toString(A));
        }
        return false;
      } catch (err) {
        return false;
      }
    }
    regexp_replace_block({ A, B, C }) {
      try {
        let restr = cast.toString(B);
        let redat = toRegExpData(restr);
        if (RegExpCompare(redat, restr)) {
          return cast.toString(A).replace(redat, cast.toString(C));
        }
        return "";
      } catch (err) {
        return "";
      }
    }
    regexp_split_block({ A, B }) {
      try {
        let restr = cast.toString(B);
        let redat = toRegExpData(restr);
        if (RegExpCompare(redat, restr)) {
          return toJsonString(cast.toString(A).split(redat) || []);
        }
        return "";
      } catch (err) {
        return "";
      }
    }
    regexp_match_block({ A, B, C }) {
      try {
        let restr = cast.toString(B);
        let redat = toRegExpData(restr);
        let str = cast.toString(A);
        if (RegExpCompare(redat, restr)) {
          const gredat = redat.global
            ? redat
            : new RegExp(redat.source, redat.flags + "g");
          const match = cast.toString(C).toLowerCase();
          let data;
          switch (match) {
            case "values":
              data = Array.from(str.matchAll(gredat)).map((val) => val[0]);
              return toJsonString(
                redat.global ? data : data[0] ? [data[0]] : []
              );
            case "keys":
              data = Array.from(str.matchAll(gredat)).map((val) =>
                String(val.index + 1)
              );
              return toJsonString(
                redat.global ? data : data[0] ? [data[0]] : []
              );
            case "pairs":
              data = Array.from(str.matchAll(gredat)).reduce(
                (obj, val) => ((obj[val.index + 1] = val[0]), obj),
                {}
              );
              return toJsonString(
                redat.global
                  ? data
                  : Object.keys(data)[0]
                  ? { [Object.keys(data)[0]]: Object.values(data)[0] }
                  : {}
              );
            case "map":
              data = Array.from(str.matchAll(gredat)).map((val) => [
                String(val.index + 1),
                val[0],
              ]);
              return toJsonString(
                redat.global ? data : data[0] ? [data[0]] : []
              );
          }
        }
        return "";
      } catch (err) {
        return "";
      }
    }
  }

  Scratch.extensions.register(new ScratchRegExp());
})(Scratch);
