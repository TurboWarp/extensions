// TurboWarp Extension : Deltatime by XeroName
// First generation at 2023-06-21 KST
// Latest update at 2023-07-12 KST
// v2.2.2



/*
Referenced articles :
- https://www.growingwiththeweb.com/2017/12/fast-simple-js-fps-counter.html
- https://stackoverflow.com/questions/4787431/how-do-i-check-framerate-in-javascript
- https://developer.mozilla.org/en-US/docs/Web/API/Performance/now

Thanks to the "TheShovel", one of the TurboWarp Extension's developer named "ShovelUtils".
I learned how to use "Runtime Steps" of Scratch VM through that code.
*/



//==================== Scratch Zone ====================//
(function (Scratch) {
  'use strict';
  console.log("Deltatime by XeroName"); // Prints log message to console

  const icon = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjYwMCIgdmlld0JveD0iMCAwIDYwMCA2MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjMwMCIgY3k9IjMwMCIgcj0iMzAwIiBmaWxsPSIjMjAyMDIwIi8+CjxwYXRoIGQ9Ik04Ny44NjggNTEyLjEzMkM2MC4wMTA0IDQ4NC4yNzQgMzcuOTEyNSA0NTEuMjAzIDIyLjgzNjEgNDE0LjgwNUM3Ljc1OTcyIDM3OC40MDcgLTMuNDQ0MTZlLTA2IDMzOS4zOTcgMCAzMDBDMy40NDQxNmUtMDYgMjYwLjYwMyA3Ljc1OTc0IDIyMS41OTMgMjIuODM2MiAxODUuMTk1QzM3LjkxMjYgMTQ4Ljc5NyA2MC4wMTA0IDExNS43MjYgODcuODY4IDg3Ljg2NzlDMTE1LjcyNiA2MC4wMTA0IDE0OC43OTcgMzcuOTEyNSAxODUuMTk1IDIyLjgzNjFDMjIxLjU5MyA3Ljc1OTcxIDI2MC42MDQgLTkuODYyNjZlLTA2IDMwMCAwQzMzOS4zOTcgOS44NjI2OGUtMDYgMzc4LjQwNyA3Ljc1OTc1IDQxNC44MDUgMjIuODM2MkM0NTEuMjAzIDM3LjkxMjYgNDg0LjI3NSA2MC4wMTA0IDUxMi4xMzIgODcuODY4TDMwMCAzMDBMODcuODY4IDUxMi4xMzJaIiBmaWxsPSIjMzAzMDMwIi8+CjxwYXRoIGQ9Ik0zMzAgNDM1TDIzMCAxODUiIHN0cm9rZT0iIzYxMjM2MSIgc3Ryb2tlLXdpZHRoPSIzMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CjxwYXRoIGQ9Ik0zMjAgMTg1SDQyME01MjAgMTg1SDQyME00MjAgMTg1VjQzNU0yOTkuNDUxIDQzMy42MjlMMjAwLjkyOCAxODcuMzIxQzIwMC41OTMgMTg2LjQ4MyAxOTkuNDA3IDE4Ni40ODMgMTk5LjA3MiAxODcuMzIxTDEwMC41NDkgNDMzLjYyOUMxMDAuMjg2IDQzNC4yODUgMTAwLjc3IDQzNSAxMDEuNDc3IDQzNUgyOTguNTIzQzI5OS4yMyA0MzUgMjk5LjcxNCA0MzQuMjg1IDI5OS40NTEgNDMzLjYyOVoiIHN0cm9rZT0iIzYwNjA2MCIgc3Ryb2tlLXdpZHRoPSIzMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CjxwYXRoIGQ9Ik0zMTAgNDE1TDIxMCAxNjUiIHN0cm9rZT0iI0ZGNUNGRiIgc3Ryb2tlLXdpZHRoPSIzMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CjxwYXRoIGQ9Ik0zMDAgMTY1SDQwME01MDAgMTY1SDQwME00MDAgMTY1VjQxNU0yNzkuNDUxIDQxMy42MjlMMTgwLjkyOCAxNjcuMzIxQzE4MC41OTMgMTY2LjQ4MyAxNzkuNDA3IDE2Ni40ODMgMTc5LjA3MiAxNjcuMzIxTDgwLjU0ODYgNDEzLjYyOUM4MC4yODU4IDQxNC4yODUgODAuNzY5NiA0MTUgODEuNDc3IDQxNUgyNzguNTIzQzI3OS4yMyA0MTUgMjc5LjcxNCA0MTQuMjg1IDI3OS40NTEgNDEzLjYyOVoiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMzIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K';

//==================== Error Unsandboxed Message ====================//
  if (!Scratch.extensions.unsandboxed) {
    throw new Error('Deltatime by XeroName : This extension must run unsandboxed');
  }
//==================== Error Unsandboxed Message END ====================//

  const vm = Scratch.vm;
  const cast = Scratch.Cast;

  let maxFiltStren = 907; // Max value of Filter Strength
  let filtStren = 8; // Default value of Filter Strength = 8
  let calcStandFPS = 30; // Standard value of Calculator

//==================== "Deltatime Watcher" Zone ====================//
  let fT = 0, last = performance.now(), rawFPS, vmFPS, vmDt;
  const oldStep = vm.runtime._step;

  vm.runtime._step = function () {
    oldStep.call(this);
    const now = performance.now();
    let thisFT = now - last;
    fT += (thisFT - fT) / filtStren;

    rawFPS = 1000 / fT;

    if (rawFPS < 0.5) {
      vmFPS = rawFPS.toFixed(2);
    } else {
      vmFPS = Math.round(rawFPS);
    }

    if (vmFPS > 0) {
      vmDt = 1 / vmFPS; // At normal situation
    } else {
      vmDt = 0; // Prevent situation of "DIV/0"
    }
    last = now;
  };
//==================== "Deltatime Watcher" Zone END ====================//



//==================== Extension Zone ====================//
  class Dt {

    getInfo() {
      return {

        id: 'dtbyxeroname',
        name: 'Deltatime',
        docsURI: 'https://xeroname.github.io/dtbyxeroname/',
        color1: '#333333',
        color2: '#444444',
        color3: '#ffffff',
        menuIconURI: icon,

        blocks: [
//==================== "Resources from Scratch VM" Blocks ====================//
          {
            opcode: 'getDt_vm',
            blockType: Scratch.BlockType.REPORTER,
            text: 'ΔT'
          },
          {
            opcode: 'getFPS_vm',
            blockType: Scratch.BlockType.REPORTER,
            text: 'FPS'
          },
//==================== "Selectable Menu" Blocks ====================//
          {
            opcode: 'getTimeRes',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Get [TYPE] of [TARGET]',
            arguments: {
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: 'type_menu'
              },

              TARGET: {
                type: Scratch.ArgumentType.STRING,
                menu: 'target_menu'
              }
            },
            hideFromPalette: true
          },
//==================== Static FPS Detection Blocks ====================//
          {
            opcode: 'isFPSposi',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'FPS > 0',
            hideFromPalette: true
          },
//==================== Time Filter Blocks ====================//
          {
            blockType: "label",
            text: "Filtering"
          },
          {
            opcode: 'setFilterStrength',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Set Filter Strength : [STRENGTH]',
            arguments: {
              STRENGTH: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '8'
              }
            }
          },
          {
            opcode: 'getFilterStrength',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Filter Strength'
          },
//==================== Calculator Blocks ====================//
          {
            blockType: "label",
            text: "Calculating"
          },
          {
            opcode: 'setCalculatorStandard',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Set Calculator Standard to [FPS] FPS',
            arguments: {
              FPS: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '60'
              }
            }
          },
          {
            opcode: 'getCalculatorStandard',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Standard FPS of Calculator',
            disableMonitor: true
          },
          {
            opcode: 'calcMultiplyValue',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Calc [DISTANCE]',
            arguments: {
              DISTANCE: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '10'
              }
            }
          }
//==================== Block Sections END ====================//
        ],
//==================== Menu Zone ====================//
        menus: {
          target_menu: {
            acceptReporters: true,
            items: [
              {
                text: 'This Project',
                value: 'vm'
              }
            ]
          },

          type_menu: {
            acceptReporters: true,
            items: [
              {
                text: 'ΔT',
                value: 'dt'
              },

              {
                text: 'FPS',
                value: 'fps'
              }
            ]
          }
        }
//==================== Menu Zone END ====================//
      };
    }

//========== Return of "Resources from Scratch VM" ==========//
    getDt_vm() {
      return vmDt;
    }
    getFPS_vm() {
      return vmFPS;
    }
//========== Return of "Selectable Menu" ==========//
    getTimeRes({ TYPE, TARGET }) {
      const resTyp = cast.toString(TYPE).toLowerCase();
      const targetRes = cast.toString(TARGET).toLowerCase();
      switch (resTyp) {
        case 'dt' : return vmDt;
        case 'fps' : return vmFPS;
      }
    }
//========== Return of <Is FPS greater than 0 ?> ==========//
    isFPSposi() {
      return (vmFPS > 0);
    }
//========== Calculators ==========//
    setCalculatorStandard({ FPS }) {
      calcStandFPS = cast.toNumber(FPS);
    }
    getCalculatorStandard() {
      return calcStandFPS;
    }
    calcMultiplyValue({ DISTANCE }) {
      const moveDist = cast.toNumber(DISTANCE);
      return moveDist * calcStandFPS;
    }
//========== Filter Strength ==========//
    getFilterStrength() {
      return filtStren;
    }
    setFilterStrength({ STRENGTH }) {
      const fStren = cast.toNumber(STRENGTH);

      if (fStren <= 1) {
        filtStren = 1;
      } else if (fStren >= maxFiltStren) {
        filtStren = maxFiltStren;
      } else {
        filtStren = fStren;
      }

    }
//========== Block Function/Return Sections END ==========//

  }
//==================== Extension Zone  END ====================//

  Scratch.extensions.register(new Dt());
})(Scratch);
//==================== Scratch Zone  END ====================//
