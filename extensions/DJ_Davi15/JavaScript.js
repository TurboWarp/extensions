// Name: JavaScript
// ID: djdavi15js
// Description: Execute códigos JavaScript no seu projeto.
// By: DJ_Davi15 <https://scratch.mit.edu/users/DJ_Davi15/>
// By: ChatGPT <https:chatgpt.com>
// License: MIT

(function (Scratch) {
  'use strict';

  class djdavi15js {
    getInfo() {
      return {
        id: 'djdavi15js',
        name: 'JavaScript',
        description: 'Execute códigos JavaScript no seu projeto.',
        color1: "#0055ff",
        color2: "#001e94",
        blockIconURI: "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxOTAuNTYzNTIiIGhlaWdodD0iMTkwLjU2MzUyIiB2aWV3Qm94PSIwLDAsMTkwLjU2MzUyLDE5MC41NjM1MiI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIwNC43MTgyNCwtNTQuNzE4MjQpIj48ZyBmaWxsPSJub25lIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiPjxwYXRoIGQ9Ik0yMDQuNzE4MjQsMjQ1LjI4MTc2di0xOTAuNTYzNTJoMTkwLjU2MzUydjE5MC41NjM1MnoiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIwIiBzdHJva2UtbGluZWNhcD0iYnV0dCIvPjxnIHN0cm9rZT0iIzAzMWE4MiIgc3Ryb2tlLXdpZHRoPSI0NiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIj48cGF0aCBkPSJNMjc5LjI4MzgsOTEuNjExNzRsLTMuNDM0MjksODkuMzgzN2MwLDAgLTIuMzE3OTksMjEuMzkwMTMgLTIzLjU4NTUsMjAuNzY2MTRjLTE5Ljk2OCwtMC41ODU4NyAtMjIuMjA5ODYsLTIzLjI0MjY1IC0yMi4yMDk4NiwtMjMuMjQyNjUiLz48cGF0aCBkPSJNMzY3Ljg2NDQxLDkzLjQyMTE4YzAsMCAtNDkuMDk1OTEsLTcuMDM0NjcgLTUwLjEyNzUsMzEuMTg0NzRjLTEuMTYxMzIsNDMuMDI1NjYgNTIuODE0ODIsMTYuNDA0NzEgNTEuNDI4NTIsNTguMDcwOTZjLTAuOTkwMjMsMjkuNzYyMTMgLTU0LjkzNDA0LDI0LjkwODA3IC01NC45MzQwNCwyNC45MDgwNyIvPjwvZz48ZyBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCI+PHBhdGggZD0iTTI4MC4wMzc5Niw5Mi4xMjEzOWwtMy40MzQyOSw4OS4zODM3YzAsMCAtMi4zMTc5OSwyMS4zOTAxMyAtMjMuNTg1NSwyMC43NjYxNGMtMTkuOTY4LC0wLjU4NTg3IC0yMi4yMDk4NiwtMjMuMjQyNjUgLTIyLjIwOTg2LC0yMy4yNDI2NSIvPjxwYXRoIGQ9Ik0zNjguNjE4NTcsOTMuOTMwODNjMCwwIC00OS4wOTU5MSwtNy4wMzQ2NyAtNTAuMTI3NSwzMS4xODQ3NGMtMS4xNjEzMiw0My4wMjU2NiA1Mi44MTQ4MiwxNi40MDQ3MSA1MS40Mjg1Miw1OC4wNzA5NmMtMC45OTAyMywyOS43NjIxMyAtNTQuOTM0MDQsMjQuOTA4MDcgLTU0LjkzNDA0LDI0LjkwODA3Ii8+PC9nPjwvZz48L2c+PC9zdmc+",
        metadata: {
          author: 'DJ_Davi15',
          license: 'MIT',
          homepage: 'https://scratch.mit.edu/users/DJ_Davi15/'
        },
        blocks: [
          {
            opcode: 'executarJS',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Executar código JavaScript [JScodeexecute]',
            arguments: {
              JScodeexecute: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'alert("Oi pessoal, tudo bem?")'
              }
            }
          },
          {
            opcode: 'executarJSBoolean',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'Verdadeiro ou falso do código JavaScript [JScodeboolean]',
            arguments: {
              JScodeboolean: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '50 > 25'
              }
            }
          },
          {
            opcode: 'executarJSResultado',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Resultado do código JavaScript [jsresult]',
            arguments: {
              jsresult: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '2 - 1'
              }
            }
          }
        ]
      };
    }

    executarJS(args) {
      try {
        eval(args.JScodeexecute);
      } catch (e) {
        console.error('Erro ao executar o código JavaScript', e);
      }
    }

    executarJSBoolean(args) {
      try {
        return !!eval(args.JScodeboolean);
      } catch (e) {
        console.error('Erro ao avaliar booleano', e);
        return false;
      }
    }

    executarJSResultado(args) {
      try {
        return eval(args.jsresult);
      } catch (e) {
        console.error('Erro ao obter o resultado do código JavaScript', e);
        return '';
      }
    }
  }

  Scratch.extensions.register(new djdavi15js());
})(Scratch);
