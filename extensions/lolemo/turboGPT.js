(function(Scratch) {
  'use strict';
   const gptIcon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30' width='30px' height='30px'%3E%3Cpath d='M 14.070312 2 C 11.330615 2 8.9844456 3.7162572 8.0390625 6.1269531 C 6.061324 6.3911222 4.2941948 7.5446684 3.2773438 9.3066406 C 1.9078196 11.678948 2.2198602 14.567816 3.8339844 16.591797 C 3.0745422 18.436097 3.1891418 20.543674 4.2050781 22.304688 C 5.5751778 24.677992 8.2359331 25.852135 10.796875 25.464844 C 12.014412 27.045167 13.895916 28 15.929688 28 C 18.669385 28 21.015554 26.283743 21.960938 23.873047 C 23.938676 23.608878 25.705805 22.455332 26.722656 20.693359 C 28.09218 18.321052 27.78014 15.432184 26.166016 13.408203 C 26.925458 11.563903 26.810858 9.4563257 25.794922 7.6953125 C 24.424822 5.3220082 21.764067 4.1478652 19.203125 4.5351562 C 17.985588 2.9548328 16.104084 2 14.070312 2 z M 14.070312 4 C 15.226446 4 16.310639 4.4546405 17.130859 5.2265625 C 17.068225 5.2600447 17.003357 5.2865019 16.941406 5.3222656 L 12.501953 7.8867188 C 12.039953 8.1527187 11.753953 8.6456875 11.751953 9.1796875 L 11.724609 15.146484 L 9.5898438 13.900391 L 9.5898438 8.4804688 C 9.5898438 6.0104687 11.600312 4 14.070312 4 z M 20.492188 6.4667969 C 21.927441 6.5689063 23.290625 7.3584375 24.0625 8.6953125 C 24.640485 9.696213 24.789458 10.862812 24.53125 11.958984 C 24.470201 11.920997 24.414287 11.878008 24.351562 11.841797 L 19.910156 9.2773438 C 19.448156 9.0113437 18.879016 9.0103906 18.416016 9.2753906 L 13.236328 12.236328 L 13.248047 9.765625 L 17.941406 7.0546875 C 18.743531 6.5915625 19.631035 6.4055313 20.492188 6.4667969 z M 7.5996094 8.2675781 C 7.5972783 8.3387539 7.5898438 8.4087418 7.5898438 8.4804688 L 7.5898438 13.607422 C 7.5898438 14.141422 7.8729844 14.635297 8.3339844 14.904297 L 13.488281 17.910156 L 11.34375 19.134766 L 6.6484375 16.425781 C 4.5094375 15.190781 3.7747656 12.443687 5.0097656 10.304688 C 5.5874162 9.3043657 6.522013 8.5923015 7.5996094 8.2675781 z M 18.65625 10.865234 L 23.351562 13.574219 C 25.490562 14.809219 26.225234 17.556313 24.990234 19.695312 C 24.412584 20.695634 23.477987 21.407698 22.400391 21.732422 C 22.402722 21.661246 22.410156 21.591258 22.410156 21.519531 L 22.410156 16.392578 C 22.410156 15.858578 22.127016 15.364703 21.666016 15.095703 L 16.511719 12.089844 L 18.65625 10.865234 z M 15.009766 12.947266 L 16.78125 13.980469 L 16.771484 16.035156 L 14.990234 17.052734 L 13.21875 16.017578 L 13.228516 13.964844 L 15.009766 12.947266 z M 18.275391 14.853516 L 20.410156 16.099609 L 20.410156 21.519531 C 20.410156 23.989531 18.399687 26 15.929688 26 C 14.773554 26 13.689361 25.54536 12.869141 24.773438 C 12.931775 24.739955 12.996643 24.713498 13.058594 24.677734 L 17.498047 22.113281 C 17.960047 21.847281 18.246047 21.354312 18.248047 20.820312 L 18.275391 14.853516 z M 16.763672 17.763672 L 16.751953 20.234375 L 12.058594 22.945312 C 9.9195938 24.180312 7.1725 23.443687 5.9375 21.304688 C 5.3595152 20.303787 5.2105423 19.137188 5.46875 18.041016 C 5.5297994 18.079003 5.5857129 18.121992 5.6484375 18.158203 L 10.089844 20.722656 C 10.551844 20.988656 11.120984 20.989609 11.583984 20.724609 L 16.763672 17.763672 z'/%3E%3C/svg%3E";
   const extIcon = "data:image/svg+xml;base64,PHN2ZyBmaWxsPSIjNDBDMDU3IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciICB2aWV3Qm94PSIwIDAgMjQgMjQiIHdpZHRoPSI5NnB4IiBoZWlnaHQ9Ijk2cHgiPjxwYXRoIGQ9Ik0gMTEuMTM0NzY2IDEuMDE1NjI1IEMgMTAuODcxNzMgMS4wMDI5MzU1IDEwLjYwNjc2NiAxLjAwODk1MzEgMTAuMzM3ODkxIDEuMDMzMjAzMSBDIDguMTEzNDc5MyAxLjIzMzkwMTkgNi4zMzYxOTE1IDIuNzk0MDA0NyA1LjYwOTM3NSA0LjgyMDMxMjUgQyAzLjg5NzA0ODggNS4xNzY4NTQ3IDIuNDM3MjcyMyA2LjMwNDAwOTIgMS42NzE4NzUgNy45NTcwMzEyIEMgMC43MzM5ODc3OSA5Ljk4MzI5MzIgMS4xOTcyODQyIDEyLjMwMDk2NiAyLjU4Nzg5MDYgMTMuOTQzMzU5IEMgMi4wNDAyNzk4IDE1LjYwNTI0MyAyLjI4NDc3ODQgMTcuNDM1NTgyIDMuMzMyMDMxMiAxOC45MjM4MjggQyA0LjYxODIwOTkgMjAuNzQ5NzE1IDYuODU4NTIxNiAyMS41MDY2NDYgOC45NzY1NjI1IDIxLjEyMzA0NyBDIDEwLjE0MTU3NyAyMi40MjgyMTEgMTEuODQ4NTE4IDIzLjEzMTIwOSAxMy42NjIxMDkgMjIuOTY2Nzk3IEMgMTUuODg2NDY4IDIyLjc2NjEwMyAxNy42NjM3NzYgMjEuMjA1OTI1IDE4LjM5MDYyNSAxOS4xNzk2ODggQyAyMC4xMDI5NTEgMTguODIzMTY2IDIxLjU2MjcyOCAxNy42OTUxNDggMjIuMzI4MTI1IDE2LjA0Mjk2OSBDIDIzLjI2NTk5NiAxNC4wMTY3NDIgMjIuODAyNjU5IDExLjcwMDk4MyAyMS40MTIxMDkgMTAuMDU4NTk0IEMgMjEuOTYwNDcyIDguMzk2MjM1OSAyMS43MTQ0ODggNi41NjQ5NTE0IDIwLjY2NjAxNiA1LjA3NjE3MTkgQyAxOS4zNzk4MzcgMy4yNTAyODQ3IDE3LjE0MTQ3OCAyLjQ5MzM1MzYgMTUuMDIzNDM4IDIuODc2OTUzMSBDIDE0LjAzMTE0MyAxLjc2NTI2OTEgMTIuNjQ1OTMyIDEuMDg4NTI3MyAxMS4xMzQ3NjYgMS4wMTU2MjUgeiBNIDExLjAyNTM5MSAyLjUxMzY3MTkgQyAxMS45MjA5NzMgMi41NDg4MTUzIDEyLjc1MzQxMyAyLjg3MzY5MjEgMTMuNDI5Njg4IDMuNDE5OTIxOSBDIDEzLjMxNjYyNiAzLjQ3NTk2NDQgMTMuMTk4MTUgMy41MTQ0NTcgMTMuMDg3ODkxIDMuNTc4MTI1IEwgOS41NjgzNTk0IDUuNjA5Mzc1IEMgOC45NTYzNTk0IDUuOTYyMzc1IDguNTc2MzU5NCA2LjYxMzMxMjUgOC41NjgzNTk0IDcuMzIwMzEyNSBMIDguNTE1NjI1IDEyLjIzODI4MSBMIDcuMjQwMjM0NCAxMS40ODA0NjkgQyA2LjkzNjIzNDQgMTEuMzAwNDY5IDYuNzUgMTAuOTcyMTQxIDYuNzUgMTAuNjE5MTQxIEwgNi43NSA2Ljc4NTE1NjIgQyA2Ljc1IDQuNjQ5MTU2MyA4LjMwNzU5MzggMi43NDIyNSAxMC40MzM1OTQgMi41MzEyNSBDIDEwLjYzMjk2OSAyLjUxMTUgMTAuODMwNDggMi41MDYwMjM0IDExLjAyNTM5MSAyLjUxMzY3MTkgeiBNIDE2LjEyNSA0LjI1NTg1OTQgQyAxNy4zOTg1ODQgNC4yNjM0MTggMTguNjM5ODQ0IDQuODI1MTU2MyAxOS40MTc5NjkgNS45MTAxNTYyIEMgMjAuMDcwODU4IDYuODE5NTg3IDIwLjMxMDI0MiA3LjkwMTk5MjkgMjAuMTQ2NDg0IDguOTQ3MjY1NiBDIDIwLjA0MTI3IDguODc3MjQxNCAxOS45NDgzMjUgOC43OTQyMzc0IDE5LjgzNzg5MSA4LjczMDQ2ODggTCAxNi4zMTgzNTkgNi42OTkyMTg4IEMgMTUuNzA2MzU5IDYuMzQ1MjE4NyAxNC45NTM4OTEgNi4zNDI0NTMxIDE0LjMzNzg5MSA2LjY4OTQ1MzEgTCAxMC4wNTI3MzQgOS4xMDM1MTU2IEwgMTAuMDcwMzEyIDcuNjE3MTg3NSBDIDEwLjA3NDMxMyA3LjI2NDE4NzUgMTAuMjY0MzEzIDYuOTQwNjcxOSAxMC41NzAzMTIgNi43NjM2NzE5IEwgMTMuODkwNjI1IDQuODQ3NjU2MiBDIDE0LjU4NDM3NSA0LjQ0NzE1NjIgMTUuMzYwODUgNC4yNTEzMjQyIDE2LjEyNSA0LjI1NTg1OTQgeiBNIDUuMjgzMjAzMSA2LjQ3MjY1NjIgQyA1LjI3NTIzNjIgNi41OTgzMDUgNS4yNSA2LjcyMDYyNTIgNS4yNSA2Ljg0NzY1NjIgTCA1LjI1IDEwLjkwODIwMyBDIDUuMjUgMTEuNjE1MjAzIDUuNjIyNDY4OCAxMi4yNzA4NTkgNi4yMzA0Njg4IDEyLjYzMDg1OSBMIDEwLjQ2Njc5NyAxNS4xMzY3MTkgTCA5LjE3MTg3NSAxNS44NjMyODEgQyA4Ljg2Mzg3NSAxNi4wMzYyODEgOC40ODc2NDA2IDE2LjAzNDQyMiA4LjE4MTY0MDYgMTUuODU3NDIyIEwgNC44NTkzNzUgMTMuOTM5NDUzIEMgMy4wMDkzNzUgMTIuODcxNDUzIDIuMTM3NTc4MSAxMC41NjcwOTQgMy4wMTc1NzgxIDguNjIxMDkzOCBDIDMuNDc5NTU4MyA3LjYwMDY4MzYgNC4yOTYzNjk3IDYuODUzNTc5MSA1LjI4MzIwMzEgNi40NzI2NTYyIHogTSAxNS4zMjYxNzIgOC4wMDc4MTI1IEMgMTUuNDk2OTIyIDguMDA4ODEyNSAxNS42NjczMTMgOC4wNTQwNzgxIDE1LjgyMDMxMiA4LjE0MjU3ODEgTCAxOS4xNDA2MjUgMTAuMDYwNTQ3IEMgMjAuOTkwNjI1IDExLjEyODU0NyAyMS44NjQzNzUgMTMuNDMyOTA2IDIwLjk4NDM3NSAxNS4zNzg5MDYgQyAyMC41MjIyODcgMTYuMzk5NTU0IDE5LjcwMzk0MSAxNy4xNDY1MDcgMTguNzE2Nzk3IDE3LjUyNzM0NCBDIDE4LjcyNDc5MiAxNy40MDE0NzMgMTguNzUgMTcuMjc5NjAyIDE4Ljc1IDE3LjE1MjM0NCBMIDE4Ljc1IDEzLjA4OTg0NCBDIDE4Ljc1IDEyLjM4Mjg0NCAxOC4zNzc1MzEgMTEuNzI5MTQxIDE3Ljc2OTUzMSAxMS4zNjkxNDEgTCAxMy41MzcxMDkgOC44NjMyODEyIEwgMTQuODMwMDc4IDguMTM2NzE4OCBDIDE0Ljk4NDA3OCA4LjA1MDIxODcgMTUuMTU1NDIyIDguMDA2ODEyNSAxNS4zMjYxNzIgOC4wMDc4MTI1IHogTSAxMi4wMjUzOTEgOS43MTI4OTA2IEwgMTMuOTk2MDk0IDEwLjg4MDg1OSBMIDEzLjk2ODc1IDEzLjE2Nzk2OSBMIDExLjk3NDYwOSAxNC4yODkwNjIgTCAxMC4wMDM5MDYgMTMuMTE5MTQxIEwgMTAuMDMxMjUgMTAuODMyMDMxIEwgMTIuMDI1MzkxIDkuNzEyODkwNiB6IE0gMTUuNDgyNDIyIDExLjc2MzY3MiBMIDE2Ljc1OTc2NiAxMi41MTk1MzEgQyAxNy4wNjM3NjYgMTIuNjk5NTMxIDE3LjI1IDEzLjAyNzg1OSAxNy4yNSAxMy4zODA4NTkgTCAxNy4yNSAxNy4yMTQ4NDQgQyAxNy4yNSAxOS4zNTA4NDQgMTUuNjkyNDA2IDIxLjI1Nzc1IDEzLjU2NjQwNiAyMS40Njg3NSBDIDEyLjQ1MDkzNCAyMS41NzkyNDggMTEuMzkzNzY4IDIxLjI0NTE4NyAxMC41NzAzMTIgMjAuNTgwMDc4IEMgMTAuNjgzMzc0IDIwLjUyNDAzNiAxMC44MDE4NSAyMC40ODU1NDMgMTAuOTEyMTA5IDIwLjQyMTg3NSBMIDE0LjQyOTY4OCAxOC4zOTA2MjUgQyAxNS4wNDE2ODggMTguMDM3NjI1IDE1LjQyMTY4OCAxNy4zODY2ODggMTUuNDI5Njg4IDE2LjY3OTY4OCBMIDE1LjQ4MjQyMiAxMS43NjM2NzIgeiBNIDEzLjk0NzI2NiAxNC44OTg0MzggTCAxMy45Mjk2ODggMTYuMzgyODEyIEMgMTMuOTI1Njg3IDE2LjczNTgxMyAxMy43MzU2ODcgMTcuMDU5MzI4IDEzLjQyOTY4OCAxNy4yMzYzMjggTCAxMC4xMDkzNzUgMTkuMTUyMzQ0IEMgOC4yNTkzNzUgMjAuMjIwMzQ0IDUuODI3MDMxMyAxOS44MjU4NDQgNC41ODIwMzEyIDE4LjA4OTg0NCBDIDMuOTI5MTQyNSAxNy4xODA0MTMgMy42ODk3NTc2IDE2LjA5ODAwNyAzLjg1MzUxNTYgMTUuMDUyNzM0IEMgMy45NTg3MzAzIDE1LjEyMjc1OSA0LjA1MTY3NTQgMTUuMjA1NzYzIDQuMTYyMTA5NCAxNS4yNjk1MzEgTCA3LjY4MTY0MDYgMTcuMzAwNzgxIEMgOC4yOTM2NDA2IDE3LjY1NDc4MSA5LjA0NjEwOTQgMTcuNjU3NTQ3IDkuNjYyMTA5NCAxNy4zMTA1NDcgTCAxMy45NDcyNjYgMTQuODk4NDM4IHoiLz48L3N2Zz4=";

  class TurboGPT {
    constructor() {
      this.chatHistories = {};
    }

    getInfo() {
      return {
        id: "turboGPT",
        name: "TurboGPT",
        menuIconURI: extIcon,
        blockIconURI: gptIcon,
        blocks: [
          {
            opcode: 'singlePrompt',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Generate from prompt [PROMPT]',
            arguments: {
              PROMPT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'How are you?',
              },
            },
          },
          {
            opcode: 'createChat',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Create chatbot named [chatID]',
            arguments: {
              chatID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Apple'
              }
            },
          },
          {
            opcode: 'informChat',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Inform [chatID] that [inform]',
            arguments: {
              chatID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Apple'
              },
              inform: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'You can only speak the cat language'
              }
            },
          },
          {
            opcode: 'advancedPrompt',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Ask to [chatID] prompt [PROMPT]',
            arguments: {
              PROMPT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Hello!',
              },
              chatID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Apple'
              }
            },
          },
          '---',
          {
            opcode: 'lastGeneration',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Last [type] from [chatID]',
            arguments: {
              type: {
                type: Scratch.ArgumentType.STRING,
                menu: 'types',
              },
              chatID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Apple'
              }
            },
          },
          '---',
          {
            opcode: 'listChats',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Active chats',
            disableMonitor: true,
          },
          {
            opcode: 'exportChat',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Export chat history of [chatID] in json',
            arguments: {
              chatID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Apple'
              }
            },
          },
          {
            opcode: 'importChat',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Import chat history from [json] to [chatID]',
            arguments: {
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'json here'
              },
              chatID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Apple'
              }
            },
          },
          {
            opcode: 'resetChat',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Reset chat history of [chatID]',
            arguments: {
              chatID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Apple'
              }
            },
          },
          {
            opcode: 'removeChat',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Delete chatbot [chatID]',
            arguments: {
              chatID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Apple'
              }
            },
          },
          {
            opcode: 'exportAll',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Export all chats in json',
            disableMonitor: true,
          },
          {
            opcode: 'importAll',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Import all from [json] and [merge]',
            arguments: {
              json: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'json here'
              },
              merge: {
                type: Scratch.ArgumentType.STRING,
                menu: 'merge',
              }
            },
          },
        ],
        menus: {
          types: {
            acceptReporters: true,
            items: ['prompt', 'generated text']
          },
          merge: {
            acceptReporters: true,
            items: ['merge with existing chats', 'remove all and import']
          }
        }
      };
    }

    singlePrompt(args) {
      const api_url = "https://free.churchless.tech/v1/chat/completions";
      const prompt = args.PROMPT;

      return Scratch.fetch(api_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }]
        }),
      })
      .then(response => {
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
          }
        return response.json();
      })
      .then(data => {
        const botResponse = data.choices[0].message.content;
        return botResponse;
      })
      .catch(error => {
        console.error("Error sending prompt to GPT", error.message);
        return "";
      });
    }

    createChat(args) {
      const chatID = args.chatID;
      if (!(chatID in this.chatHistories)) {
        this.chatHistories[chatID] = [{ role: "system", content: "Your name is: " + chatID }];
      }
    }

    informChat(args) {
      const inform = args.inform;
      const chatID = args.chatID;
      if (chatID in this.chatHistories) {
        this.chatHistories[chatID].push({ role: "system", content: inform });
      }
    }

    lastGeneration(args) {
      const chatID = args.chatID;
      let type = args.type;
      if (type === 'prompt') {
        type = 'user';
      } else if (type === 'generated text') {
        type = 'assistant';
      }
      if (['user', 'assistant'].includes(type)) {
        if (this.chatHistories[chatID] !== undefined) {
          const chatHistory = this.chatHistories[chatID];
          for (let i = chatHistory.length - 1; i >= 0; i--) {
            if ('role' in chatHistory[i] && chatHistory[i].role === type) {
              return chatHistory[i].content;
            }
          }
        }
      }
      return '';
    }

    exportChat(args) {
      const chatID = args.chatID;
      if (this.chatHistories[chatID] !== undefined) {
        const chatHistory = this.chatHistories[chatID];
        const json = JSON.stringify(chatHistory);
        return json;
      } else {
        return '';
      }
    }

    listChats() {
      const activeChats = Object.keys(this.chatHistories);
      const json = JSON.stringify(activeChats);
      return json;
    }

    importChat(args) {
      const chatID = args.chatID;
      const json = args.json;
      let chatHistory;

      try {
        chatHistory = JSON.parse(json);
      } catch (error) {
        console.error('Error parsing JSON:', error.message);
        return;
      }

      if (Array.isArray(chatHistory)) {
        this.chatHistories[chatID] = chatHistory;
      } else {
        console.error('Invalid JSON format. Expected an array.');
      }
    }

    resetChat(args) {
      const chatID = args.chatID;
      if (chatID in this.chatHistories) {
        this.chatHistories[chatID] = [{ role: "system", content: "Your name is: " + chatID }];
      }
    }

    removeChat(args) {
      const chatID = args.chatID;
      if (chatID in this.chatHistories) {
        delete this.chatHistories[chatID];
      }
    }

    advancedPrompt(args) {
      const api_url = "https://free.churchless.tech/v1/chat/completions";
      const prompt = args.PROMPT;
      const chatID = args.chatID;
      if (!(chatID in this.chatHistories)) {
          return "";
      }
      const chatHistory = this.chatHistories[chatID] || [];
      chatHistory.push({ role: "user", content: prompt });
      return Scratch.fetch(api_url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: chatHistory
        }),
      })
      .then(response => {
          if (!response.ok) {
              throw new Error(`Network response was not ok: ${response.status} ${response.statusText}`);
            }
        return response.json();
      })
      .then(data => {
        const botResponse = data.choices[0].message.content;
        chatHistory.push({ role: "assistant", content: botResponse });
        this.chatHistories[chatID] = chatHistory;
        return botResponse;
      })
      .catch(error => {
        console.error("Error sending prompt to GPT", error.message);
        return "";
      });
    }

    exportAll() {
      const allChats = {};
      const chatIDs = Object.keys(this.chatHistories);
      for (const chatID of chatIDs) {
        allChats[chatID] = this.chatHistories[chatID];
      }
      const json = JSON.stringify(allChats);
      return json;
    }

    importAll(args) {
      const json = args.json;
      const mergeOption = args.merge.toLowerCase();
      let importedChats;
      try {
        importedChats = JSON.parse(json);
      } catch (error) {
        console.error('Error parsing JSON:', error.message);
        return;
      }
      if (typeof importedChats === 'object' && importedChats !== null) {
        if (mergeOption === 'remove all and import') {
          this.chatHistories = importedChats;
        } else if (mergeOption === 'merge with existing chats') {
          const importedChatIDs = Object.keys(importedChats);
          for (const chatID of importedChatIDs) {
            this.chatHistories[chatID] = importedChats[chatID];
          }
        } else {
          console.error('Invalid merge option. Expected "remove all and import" or "merge with existing chats".');
        }
      } else {
        console.error('Invalid JSON format. Expected an object.');
      }
    }

  }
  Scratch.extensions.register(new TurboGPT());
})(Scratch);
