// TurboWarp Extension : Deltatime by XeroName
// First generation at 2023-06-21 KST
// v1.1.0



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
  console.log("Deltatime by XeroName") // Prints log message to console

  const icon = 'data:image/png;base64,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';

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
  let frameTime = 0, lastLoop = performance.now(), vmFPS, vmDt;
  const oldStep = vm.runtime._step;

  vm.runtime._step = function () {
    oldStep.call(this);
    const now = performance.now();
    let thisFrameTime = now - lastLoop;
    frameTime += (thisFrameTime - frameTime) / filtStren;

    vmFPS = Math.round(1000/frameTime);
    vmDt = 1/vmFPS;

    lastLoop = now;
  }
//==================== "Deltatime Watcher" Zone END ====================//



//==================== Extension Zone ====================//
  class Dt {

    getInfo() {
      return {

        id: 'dtbyxeroname',
        name: 'Deltatime',
        
        color1: '#333333',
        color2: '#333333',
        color3: '#333333',
        menuIconURI: icon,

        blocks: [
//==================== "Resources from Scratch VM" Blocks ====================//
          {
            opcode: 'getDt_vm',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Δt'
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
            }
            // , hideFromPalette: true
          },
//==================== Calculator Blocks ====================//
          {
            blockType: "label",
            text: "Calculator"
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
          },
          {
            opcode: 'calcMultiplyValue',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Multiply value to Move/Rotate [DISTANCE]',
            arguments: {
              DISTANCE: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '10'
              }
            }
          },
//==================== Time Filter Blocks ====================//
          {
            blockType: "label",
            text: "Noise Filter"
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
            // , hideFromPalette: true
          },
          {
            opcode: 'getFilterStrength',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Filter Strength'
          },
          {
            blockType: "label",
            text: "Filter reduces fluctuating noise of Δt;"
          },
          {
            blockType: "label",
            text: "But also takes time on updating."
          },
          {
            blockType: "label",
            text: " "
          }
//==================== Block Sections END ====================//
        ],
        
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
                text: 'Δt',
                value: 'dt'
              },

              {
                text: 'FPS',
                value: 'fps'
              }
            ]
          }
        }

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
//========== Calculators ==========//
    setCalculatorStandard({ FPS }) {
      calcStandFPS = cast.toNumber(FPS);
    }
    getCalculatorStandard() {
      return calcStandFPS;
    }
    calcMultiplyValue({ DISTANCE }) {
      const moveDist = cast.toNumber(DISTANCE);
      return moveDist*calcStandFPS;
    }
//========== Filter Strength ==========//
    getFilterStrength() {
      return filtStren;
    }
    setFilterStrength({ STRENGTH }) {
      const fStren= cast.toNumber(STRENGTH)
      if (fStren <= 1) {filtStren = 1} else if (fStren >= maxFiltStren) {filtStren = maxFiltStren} else {filtStren = fStren}
    }
//========== Block Function/Return Sections END ==========//

  }
//==================== Extension Zone  END ====================//

  Scratch.extensions.register(new Dt());
})(Scratch);
//==================== Scratch Zone  END ====================//
