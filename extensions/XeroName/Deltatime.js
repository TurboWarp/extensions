// Name: Deltatime
// ID: dtbyxeroname
// Description: Precise delta timing blocks.
// By: XeroName <https://scratch.mit.edu/users/plant2014/>

(function (Scratch) {
  "use strict";

  const icon =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDYwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjMwMCIgY3k9IjMwMCIgcj0iMzAwIiBmaWxsPSIjMjAyMDIwIi8+CjxwYXRoIGQ9Ik04Ny44NjggNTEyLjEzMkM2MC4wMTA0IDQ4NC4yNzQgMzcuOTEyNSA0NTEuMjAzIDIyLjgzNjEgNDE0LjgwNUM3Ljc1OTcyIDM3OC40MDcgLTMuNDQ0MTZlLTA2IDMzOS4zOTcgMCAzMDBDMy40NDQxNmUtMDYgMjYwLjYwMyA3Ljc1OTc0IDIyMS41OTMgMjIuODM2MiAxODUuMTk1QzM3LjkxMjYgMTQ4Ljc5NyA2MC4wMTA0IDExNS43MjYgODcuODY4IDg3Ljg2NzlDMTE1LjcyNiA2MC4wMTA0IDE0OC43OTcgMzcuOTEyNSAxODUuMTk1IDIyLjgzNjFDMjIxLjU5MyA3Ljc1OTcxIDI2MC42MDQgLTkuODYyNjZlLTA2IDMwMCAwQzMzOS4zOTcgOS44NjI2OGUtMDYgMzc4LjQwNyA3Ljc1OTc1IDQxNC44MDUgMjIuODM2MkM0NTEuMjAzIDM3LjkxMjYgNDg0LjI3NSA2MC4wMTA0IDUxMi4xMzIgODcuODY4TDMwMCAzMDBMODcuODY4IDUxMi4xMzJaIiBmaWxsPSIjMzAzMDMwIi8+CjxwYXRoIGQ9Ik0zMzAgNDM1TDIzMCAxODUiIHN0cm9rZT0iIzYxMjM2MSIgc3Ryb2tlLXdpZHRoPSIzMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CjxwYXRoIGQ9Ik0zMjAgMTg1SDQyME01MjAgMTg1SDQyME00MjAgMTg1VjQzNU0yOTkuNDUxIDQzMy42MjlMMjAwLjkyOCAxODcuMzIxQzIwMC41OTMgMTg2LjQ4MyAxOTkuNDA3IDE4Ni40ODMgMTk5LjA3MiAxODcuMzIxTDEwMC41NDkgNDMzLjYyOUMxMDAuMjg2IDQzNC4yODUgMTAwLjc3IDQzNSAxMDEuNDc3IDQzNUgyOTguNTIzQzI5OS4yMyA0MzUgMjk5LjcxNCA0MzQuMjg1IDI5OS40NTEgNDMzLjYyOVoiIHN0cm9rZT0iIzYwNjA2MCIgc3Ryb2tlLXdpZHRoPSIzMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CjxwYXRoIGQ9Ik0zMTAgNDE1TDIxMCAxNjUiIHN0cm9rZT0iI0ZGNUNGRiIgc3Ryb2tlLXdpZHRoPSIzMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CjxwYXRoIGQ9Ik0zMDAgMTY1SDQwME01MDAgMTY1SDQwME00MDAgMTY1VjQxNU0yNzkuNDUxIDQxMy42MjlMMTgwLjkyOCAxNjcuMzIxQzE4MC41OTMgMTY2LjQ4MyAxNzkuNDA3IDE2Ni40ODMgMTc5LjA3MiAxNjcuMzIxTDgwLjU0ODYgNDEzLjYyOUM4MC4yODU4IDQxNC4yODUgODAuNzY5NiA0MTUgODEuNDc3IDQxNUgyNzguNTIzQzI3OS4yMyA0MTUgMjc5LjcxNCA0MTQuMjg1IDI3OS40NTEgNDEzLjYyOVoiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMzIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("DeltaTime must be run unsandboxed");
  }

  const vm = Scratch.vm;

  let deltaTime = 0;
  let previousTime = 0;

  vm.runtime.on("BEFORE_EXECUTE", () => {
    const now = performance.now();
    deltaTime = previousTime === 0 ? 0 : (now - previousTime) / 1000;
    previousTime = now;
  });

  class Dt {
    getInfo() {
      return {
        id: "dtbyxeroname",
        name: "Deltatime",
        color1: "#333333",
        color2: "#444444",
        color3: "#ffffff",
        menuIconURI: icon,
        blocks: [
          {
            opcode: "dt",
            blockType: Scratch.BlockType.REPORTER,
            text: "ΔT",
          },
          {
            opcode: "fps",
            blockType: Scratch.BlockType.REPORTER,
            text: "fps",
          },
        ],
      };
    }

    dt() {
      return deltaTime;
    }

    fps() {
      return +(1 / deltaTime).toFixed(2);
    }
  }

  Scratch.extensions.register(new Dt());
})(Scratch);
