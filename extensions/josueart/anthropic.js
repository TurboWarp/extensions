// Name: Anthropic API
// ID: josueartanthropic
// Description: Allows interaction with the Anthropic API, including all the Claude models with system prompt support.
// By: josueart
// License: MIT

(function (Scratch) {
    "use strict";
  
    const menuIconURI = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB2aWV3Qm94PSIwIDAgMjAgMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggc2hhcGUtcmVuZGVyaW5nPSJvcHRpbWl6ZVF1YWxpdHkiIGZpbGw9IiNEOTc3NTciIGQ9Ik0gMy45NjMgMTMuMzM0IEwgNy43NiAxMS4yMDQgTCA3LjgyNCAxMS4wMTggTCA3Ljc2IDEwLjkxNSBMIDcuNTc1IDEwLjkxNSBMIDYuOTQgMTAuODc2IEwgNC43NyAxMC44MTggTCAyLjg4OCAxMC43MzkgTCAxLjA2NSAxMC42NDEgTCAwLjYwNiAxMC41NDQgTCAwLjE3NSA5Ljk3NyBMIDAuMjE5IDkuNjkzIEwgMC42MDYgOS40MzQgTCAxLjE1OCA5LjQ4MyBMIDIuMzc5IDkuNTY3IEwgNC4yMTIgOS42OTMgTCA1LjU0MSA5Ljc3MSBMIDcuNTEyIDkuOTc3IEwgNy44MjQgOS45NzcgTCA3Ljg2OCA5Ljg1IEwgNy43NiA5Ljc3MSBMIDcuNjc4IDkuNjkzIEwgNS43ODEgOC40MDggTCAzLjcyOCA3LjA0OSBMIDIuNjUzIDYuMjY3IEwgMi4wNzEgNS44NyBMIDEuNzc4IDUuNDk5IEwgMS42NTEgNC42ODggTCAyLjE3OSA0LjEwNiBMIDIuODg4IDQuMTU2IEwgMy4wNjkgNC4yMDUgTCAzLjc4NyA0Ljc1NyBMIDUuMzIyIDUuOTQ0IEwgNy4zMjYgNy40MiBMIDcuNjIgNy42NjUgTCA3LjczNyA3LjU4MiBMIDcuNzUxIDcuNTIyIEwgNy42MiA3LjMwMyBMIDYuNTI5IDUuMzMzIEwgNS4zNjYgMy4zMyBMIDQuODQ4IDIuNDk4IEwgNC43MTEgMS45OTkgQyA0LjY2MiAxLjc5NSA0LjYyOCAxLjYyMyA0LjYyOCAxLjQxMyBMIDUuMjI5IDAuNTk3IEwgNS41NjIgMC40ODkgTCA2LjM2MyAwLjU5NyBMIDYuNyAwLjg5IEwgNy4xOTkgMi4wMjkgTCA4LjAwNiAzLjgyMyBMIDkuMjU3IDYuMjYyIEwgOS42MjMgNi45ODUgTCA5LjgxOCA3LjY1NSBMIDkuODkyIDcuODYgTCAxMC4wMTkgNy44NiBMIDEwLjAxOSA3Ljc0MyBMIDEwLjEyMiA2LjM2OSBMIDEwLjMxMiA0LjY4MyBMIDEwLjQ5OCAyLjUxMyBMIDEwLjU2MSAxLjkwMSBMIDEwLjg2NSAxLjE2OSBMIDExLjQ2NiAwLjc3MyBMIDExLjkzNSAwLjk5OCBMIDEyLjMyMSAxLjU1IEwgMTIuMjY4IDEuOTA3IEwgMTIuMDM3IDMuMzk4IEwgMTEuNTg4IDUuNzM0IEwgMTEuMjk1IDcuMjk5IEwgMTEuNDY2IDcuMjk5IEwgMTEuNjYxIDcuMTAyIEwgMTIuNDUzIDYuMDUyIEwgMTMuNzgzIDQuMzkgTCAxNC4zNjkgMy43MyBMIDE1LjA1NCAzLjAwMSBMIDE1LjQ5NCAyLjY1NSBMIDE2LjMyNCAyLjY1NSBMIDE2LjkzNiAzLjU2NCBMIDE2LjY2MiA0LjUwMiBMIDE1LjgwNiA1LjU4NyBMIDE1LjA5NyA2LjUwNyBMIDE0LjA4MSA3Ljg3NSBMIDEzLjQ0NSA4Ljk3IEwgMTMuNTA0IDkuMDU4IEwgMTMuNjU1IDkuMDQzIEwgMTUuOTUzIDguNTU0IEwgMTcuMTk1IDguMzI5IEwgMTguNjc1IDguMDc2IEwgMTkuMzQ2IDguMzg4IEwgMTkuNDE4IDguNzA1IEwgMTkuMTU1IDkuMzU2IEwgMTcuNTcxIDkuNzQ3IEwgMTUuNzEzIDEwLjExOSBMIDEyLjk0NyAxMC43NzMgTCAxMi45MTIgMTAuNzk4IEwgMTIuOTUyIDEwLjg0NyBMIDE0LjE5OCAxMC45NjQgTCAxNC43MzEgMTAuOTk0IEwgMTYuMDM2IDEwLjk5NCBMIDE4LjQ2NSAxMS4xNzQgTCAxOS4xIDExLjU5NSBMIDE5LjQ4MiAxMi4xMDcgTCAxOS40MTggMTIuNDk5IEwgMTguNDQxIDEyLjk5NyBMIDE3LjEyMSAxMi42ODQgTCAxNC4wNDIgMTEuOTUyIEwgMTIuOTg2IDExLjY4NyBMIDEyLjgzOSAxMS42ODcgTCAxMi44MzkgMTEuNzc1IEwgMTMuNzE5IDEyLjYzNiBMIDE1LjMzMiAxNC4wOTIgTCAxNy4zNSAxNS45NjkgTCAxNy40NTQgMTYuNDMzIEwgMTcuMTk1IDE2LjggTCAxNi45MjEgMTYuNzYxIEwgMTUuMTQ2IDE1LjQyNiBMIDE0LjQ2MiAxNC44MjUgTCAxMi45MTIgMTMuNTIxIEwgMTIuODEgMTMuNTIxIEwgMTIuODEgMTMuNjU3IEwgMTMuMTY3IDE0LjE4IEwgMTUuMDU0IDE3LjAxNSBMIDE1LjE1MiAxNy44ODUgTCAxNS4wMTQgMTguMTY5IEwgMTQuNTI2IDE4LjM0IEwgMTMuOTg4IDE4LjI0MiBMIDEyLjg4NCAxNi42OTIgTCAxMS43NDQgMTQuOTQ4IEwgMTAuODI2IDEzLjM4MyBMIDEwLjcxNCAxMy40NDcgTCAxMC4xNyAxOS4yODggTCA5LjkxNiAxOS41ODYgTCA5LjMzIDE5LjgxMSBMIDguODQxIDE5LjQzOSBMIDguNTgyIDE4LjgzOCBMIDguODQxIDE3LjY1MSBMIDkuMTU0IDE2LjEwMSBMIDkuNDA4IDE0Ljg2OSBMIDkuNjM4IDEzLjMzOSBMIDkuNzc1IDEyLjgzMSBMIDkuNzY1IDEyLjc5NyBMIDkuNjUyIDEyLjgxMiBMIDguNDk5IDE0LjM5NiBMIDYuNzQ1IDE2Ljc2NiBMIDUuMzU2IDE4LjI1MiBMIDUuMDIzIDE4LjM4NCBMIDQuNDQ3IDE4LjA4NSBMIDQuNTAxIDE3LjU1MyBMIDQuODIzIDE3LjA3OCBMIDYuNzQ1IDE0LjYzNCBMIDcuOTAyIDEzLjEyIEwgOC42NSAxMi4yNDUgTCA4LjY0NiAxMi4xMTcgTCA4LjYwMSAxMi4xMTcgTCAzLjQ5OCAxNS40MzIgTCAyLjU4OSAxNS41NDkgTCAyLjE5OSAxNS4xODIgTCAyLjI0NyAxNC41ODEgTCAyLjQzNCAxNC4zODUgTCAzLjk2OCAxMy4zMyBMIDMuOTYzIDEzLjMzNCBaIiBzdHlsZT0iIi8+Cjwvc3ZnPg==#yGpbRZwI1e";
  
    const blockIconURI = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB2aWV3Qm94PSIwIDAgMjAgMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggc2hhcGUtcmVuZGVyaW5nPSJvcHRpbWl6ZVF1YWxpdHkiIGZpbGw9IiNEOTc3NTciIGQ9Ik0gMy45NjMgMTMuMzM0IEwgNy43NiAxMS4yMDQgTCA3LjgyNCAxMS4wMTggTCA3Ljc2IDEwLjkxNSBMIDcuNTc1IDEwLjkxNSBMIDYuOTQgMTAuODc2IEwgNC43NyAxMC44MTggTCAyLjg4OCAxMC43MzkgTCAxLjA2NSAxMC42NDEgTCAwLjYwNiAxMC41NDQgTCAwLjE3NSA5Ljk3NyBMIDAuMjE5IDkuNjkzIEwgMC42MDYgOS40MzQgTCAxLjE1OCA5LjQ4MyBMIDIuMzc5IDkuNTY3IEwgNC4yMTIgOS42OTMgTCA1LjU0MSA5Ljc3MSBMIDcuNTEyIDkuOTc3IEwgNy44MjQgOS45NzcgTCA3Ljg2OCA5Ljg1IEwgNy43NiA5Ljc3MSBMIDcuNjc4IDkuNjkzIEwgNS43ODEgOC40MDggTCAzLjcyOCA3LjA0OSBMIDIuNjUzIDYuMjY3IEwgMi4wNzEgNS44NyBMIDEuNzc4IDUuNDk5IEwgMS42NTEgNC42ODggTCAyLjE3OSA0LjEwNiBMIDIuODg4IDQuMTU2IEwgMy4wNjkgNC4yMDUgTCAzLjc4NyA0Ljc1NyBMIDUuMzIyIDUuOTQ0IEwgNy4zMjYgNy40MiBMIDcuNjIgNy42NjUgTCA3LjczNyA3LjU4MiBMIDcuNzUxIDcuNTIyIEwgNy42MiA3LjMwMyBMIDYuNTI5IDUuMzMzIEwgNS4zNjYgMy4zMyBMIDQuODQ4IDIuNDk4IEwgNC43MTEgMS45OTkgQyA0LjY2MiAxLjc5NSA0LjYyOCAxLjYyMyA0LjYyOCAxLjQxMyBMIDUuMjI5IDAuNTk3IEwgNS41NjIgMC40ODkgTCA2LjM2MyAwLjU5NyBMIDYuNyAwLjg5IEwgNy4xOTkgMi4wMjkgTCA4LjAwNiAzLjgyMyBMIDkuMjU3IDYuMjYyIEwgOS42MjMgNi45ODUgTCA5LjgxOCA3LjY1NSBMIDkuODkyIDcuODYgTCAxMC4wMTkgNy44NiBMIDEwLjAxOSA3Ljc0MyBMIDEwLjEyMiA2LjM2OSBMIDEwLjMxMiA0LjY4MyBMIDEwLjQ5OCAyLjUxMyBMIDEwLjU2MSAxLjkwMSBMIDEwLjg2NSAxLjE2OSBMIDExLjQ2NiAwLjc3MyBMIDExLjkzNSAwLjk5OCBMIDEyLjMyMSAxLjU1IEwgMTIuMjY4IDEuOTA3IEwgMTIuMDM3IDMuMzk4IEwgMTEuNTg4IDUuNzM0IEwgMTEuMjk1IDcuMjk5IEwgMTEuNDY2IDcuMjk5IEwgMTEuNjYxIDcuMTAyIEwgMTIuNDUzIDYuMDUyIEwgMTMuNzgzIDQuMzkgTCAxNC4zNjkgMy43MyBMIDE1LjA1NCAzLjAwMSBMIDE1LjQ5NCAyLjY1NSBMIDE2LjMyNCAyLjY1NSBMIDE2LjkzNiAzLjU2NCBMIDE2LjY2MiA0LjUwMiBMIDE1LjgwNiA1LjU4NyBMIDE1LjA5NyA2LjUwNyBMIDE0LjA4MSA3Ljg3NSBMIDEzLjQ0NSA4Ljk3IEwgMTMuNTA0IDkuMDU4IEwgMTMuNjU1IDkuMDQzIEwgMTUuOTUzIDguNTU0IEwgMTcuMTk1IDguMzI5IEwgMTguNjc1IDguMDc2IEwgMTkuMzQ2IDguMzg4IEwgMTkuNDE4IDguNzA1IEwgMTkuMTU1IDkuMzU2IEwgMTcuNTcxIDkuNzQ3IEwgMTUuNzEzIDEwLjExOSBMIDEyLjk0NyAxMC43NzMgTCAxMi45MTIgMTAuNzk4IEwgMTIuOTUyIDEwLjg0NyBMIDE0LjE5OCAxMC45NjQgTCAxNC43MzEgMTAuOTk0IEwgMTYuMDM2IDEwLjk5NCBMIDE4LjQ2NSAxMS4xNzQgTCAxOS4xIDExLjU5NSBMIDE5LjQ4MiAxMi4xMDcgTCAxOS40MTggMTIuNDk5IEwgMTguNDQxIDEyLjk5NyBMIDE3LjEyMSAxMi42ODQgTCAxNC4wNDIgMTEuOTUyIEwgMTIuOTg2IDExLjY4NyBMIDEyLjgzOSAxMS42ODcgTCAxMi44MzkgMTEuNzc1IEwgMTMuNzE5IDEyLjYzNiBMIDE1LjMzMiAxNC4wOTIgTCAxNy4zNSAxNS45NjkgTCAxNy40NTQgMTYuNDMzIEwgMTcuMTk1IDE2LjggTCAxNi45MjEgMTYuNzYxIEwgMTUuMTQ2IDE1LjQyNiBMIDE0LjQ2MiAxNC44MjUgTCAxMi45MTIgMTMuNTIxIEwgMTIuODEgMTMuNTIxIEwgMTIuODEgMTMuNjU3IEwgMTMuMTY3IDE0LjE4IEwgMTUuMDU0IDE3LjAxNSBMIDE1LjE1MiAxNy44ODUgTCAxNS4wMTQgMTguMTY5IEwgMTQuNTI2IDE4LjM0IEwgMTMuOTg4IDE4LjI0MiBMIDEyLjg4NCAxNi42OTIgTCAxMS43NDQgMTQuOTQ4IEwgMTAuODI2IDEzLjM4MyBMIDEwLjcxNCAxMy40NDcgTCAxMC4xNyAxOS4yODggTCA5LjkxNiAxOS41ODYgTCA5LjMzIDE5LjgxMSBMIDguODQxIDE5LjQzOSBMIDguNTgyIDE4LjgzOCBMIDguODQxIDE3LjY1MSBMIDkuMTU0IDE2LjEwMSBMIDkuNDA4IDE0Ljg2OSBMIDkuNjM4IDEzLjMzOSBMIDkuNzc1IDEyLjgzMSBMIDkuNzY1IDEyLjc5NyBMIDkuNjUyIDEyLjgxMiBMIDguNDk5IDE0LjM5NiBMIDYuNzQ1IDE2Ljc2NiBMIDUuMzU2IDE4LjI1MiBMIDUuMDIzIDE4LjM4NCBMIDQuNDQ3IDE4LjA4NSBMIDQuNTAxIDE3LjU1MyBMIDQuODIzIDE3LjA3OCBMIDYuNzQ1IDE0LjYzNCBMIDcuOTAyIDEzLjEyIEwgOC42NSAxMi4yNDUgTCA4LjY0NiAxMi4xMTcgTCA4LjYwMSAxMi4xMTcgTCAzLjQ5OCAxNS40MzIgTCAyLjU4OSAxNS41NDkgTCAyLjE5OSAxNS4xODIgTCAyLjI0NyAxNC41ODEgTCAyLjQzNCAxNC4zODUgTCAzLjk2OCAxMy4zMyBMIDMuOTYzIDEzLjMzNCBaIiBzdHlsZT0iIi8+Cjwvc3ZnPg==#yGpbRZwI1e";
    var apiKey;

    async function generateCompl(model, system_prompt, user_prompt) {
      const resp = await Scratch.fetch("https://corsproxy.io/?https://api.anthropic.com/v1/messages", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': `${apiKey}`,
          'anthropic-version': '2023-06-01'
        },
        body: JSON.stringify({
          model: model,
          max_tokens: 4096,
          temperature: 0.5,
          system: system_prompt,
          messages: [
            {
              "role": "user",
              "content": user_prompt
            }
          ]
        })
      });
      if (!resp.ok) {
        return (await resp.json()).error.message
      }
      return (await resp.json()).content[0].text
    }

    class AnthropicAPI {
      getInfo() {
        return {
          id: "josueartanthropic",
          name: "Anthropic API",
          color1: "#d5a583",
          docsURI: "https://extensions.turbowarp.org/josueart/anthropic-api",
          menuIconURI,
          blockIconURI,
          blocks: [
            {
              blockType: Scratch.BlockType.BUTTON,
              text: 'Set API key',
              func: 'setApiKey'
            },
            {
              opcode: "generate",
              blockType: Scratch.BlockType.REPORTER,
              text: "Generate completion with model [MODEL], system prompt [SYS] and user prompt [PROMPT]",
              arguments: {
                MODEL: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: 'claude-2.1',
                  menu: "MODELS"
                },
                SYS: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "You are a helpful assistant called Claude"
                },
                PROMPT: {
                  type: Scratch.ArgumentType.STRING,
                  defaultValue: "Hi"
                }
              },
              disableMonitor: true,
            },
          ],
          menus: {
            MODELS: {
              acceptReporters: true,
              items: [
                {
                  "text": "Claude 3 Haiku",
                  "value": "claude-3-haiku-20240307"
                },
                {
                  "text": "Claude 3 Opus",
                  "value": "claude-3-opus-20240229"
                },
                {
                  "text": "Claude 3 Sonnet",
                  "value": "claude-3-sonnet-20240229"
                },
                {
                  "text": "Claude 2.1",
                  "value": "claude-2.1"
                }
              ]              
            }
          },
        };
      }
      setApiKey() {
        apiKey = prompt("Enter your API key here...");
      }
      async generate(args) {
        console.log(args.MODEL.toString())
        if ([
          "claude-3-opus-20240229",
          "claude-3-sonnet-20240229",
          "claude-3-haiku-20240307",
          "claude-2.1",
        ].some(model => model == args.MODEL.toString())) {
          return await generateCompl(args.MODEL.toString(), args.SYS.toString(), args.PROMPT.toString())
        }
        return "Not a valid model"
      }
    }
    Scratch.extensions.register(new AnthropicAPI());
  })(Scratch);