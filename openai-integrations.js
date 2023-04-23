const blocksIcon = "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPScxLjEnIHhtbG5zPSdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycgeG1sbnM6eGxpbms9J2h0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsnIHdpZHRoPSczNS43MjcwNycgaGVpZ2h0PSczNi44OTk5OScgdmlld0JveD0nMCwwLDM1LjcyNzA3LDM2Ljg5OTk5Jz48ZGVmcz48bGluZWFyR3JhZGllbnQgeDE9JzI0MCcgeTE9JzE2MS41NScgeDI9JzI0MCcgeTI9JzE5OC40NScgZ3JhZGllbnRVbml0cz0ndXNlclNwYWNlT25Vc2UnIGlkPSdjb2xvci0xJz48c3RvcCBvZmZzZXQ9JzAnIHN0b3AtY29sb3I9JyM3ZDQ1ZmYnLz48c3RvcCBvZmZzZXQ9JzEnIHN0b3AtY29sb3I9JyNmZjhlNDUnLz48L2xpbmVhckdyYWRpZW50PjwvZGVmcz48ZyB0cmFuc2Zvcm09J3RyYW5zbGF0ZSgtMjIyLjEzNjQ3LC0xNjEuNTUwMDEpJz48ZyBkYXRhLXBhcGVyLWRhdGE9J3smcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0nIGZpbGw9J3VybCgjY29sb3ItMSknIGZpbGwtcnVsZT0nbm9uemVybycgc3Ryb2tlPScjMDAwMDAwJyBzdHJva2Utd2lkdGg9JzAnIHN0cm9rZS1saW5lY2FwPSdidXR0JyBzdHJva2UtbGluZWpvaW49J21pdGVyJyBzdHJva2UtbWl0ZXJsaW1pdD0nMTAnIHN0cm9rZS1kYXNoYXJyYXk9Jycgc3Ryb2tlLWRhc2hvZmZzZXQ9JzAnIHN0eWxlPSdtaXgtYmxlbmQtbW9kZTogbm9ybWFsJz48cGF0aCBkPSdNMjQ1Ljk2NTIxLDE2NS4xNDc5N2MzLjYzNDU3LC0wLjU0OTY2IDcuNDEwNzksMS4xMTY3MyA5LjM1NTI4LDQuNDg1YzEuNDQxODUsMi40OTkyOCAxLjYwNDUsNS40OTA0MiAwLjUyNjY3LDguMTA3OTFjMi4yOTA4MiwyLjg3MjQ5IDIuNzMzNjcsNi45NzI0NyAwLjc5LDEwLjMzOTMxYy0xLjQ0MzE0LDIuNTAwNjQgLTMuOTUxMTIsNC4xMzc4IC02Ljc1Nzk4LDQuNTEyNzFjLTEuMzQxNzIsMy40MjEzMyAtNC42NzE0OCw1Ljg1NzEgLTguNTU5NzQsNS44NTcxYy0yLjg4NjM5LDAgLTUuNTU2NjgsLTEuMzU1MTIgLTcuMjg0NjQsLTMuNTk3OTdjLTMuNjM0NTcsMC41NDk2NiAtNy40MTA3OSwtMS4xMTY3MyAtOS4zNTUyOCwtNC40ODQ5OWMtMS40NDE4NSwtMi40OTkyOCAtMS42MDQ0OSwtNS40OTA0MyAtMC41MjY2NywtOC4xMDc5MWMtMi4yOTA4MiwtMi44NzI0OSAtMi43MzM2NywtNi45NzI0NiAtMC43OSwtMTAuMzM5MzFjMS40NDMxNCwtMi41MDA2NCAzLjk1MTEyLC00LjEzNzggNi43NTc5OCwtNC41MTI3MWMxLjM0MTcxLC0zLjQyMTMzIDQuNjcxNDgsLTUuODU3MSA4LjU1OTc0LC01Ljg1NzFjMi44ODYzOSwwIDUuNTU2NjgsMS4zNTUxMiA3LjI4NDY0LDMuNTk3OTd6TTIzMi4zMjE3NCwxNzAuNzQ3Mjh2Ny42OTIxMmwzLjAyOTcyLDEuNzY4NWwwLjAzODgsLTguNDY4MjZjMC4wMDI4NCwtMC43NTc4NyAwLjQwODc0LC0xLjQ1NzUxIDEuMDY0NDMsLTEuODM1MDNsNi4zMDA2MSwtMy42Mzk1NWMwLjA4NzkzLC0wLjA1MDc2IDAuMTc5OTksLTAuMDg4MzEgMC4yNjg4OCwtMC4xMzU4M2MtMS4xNjQwOCwtMS4wOTU1NCAtMi43MDI4LC0xLjc0MDc3IC00LjM0MzYyLC0xLjc0MDc3Yy0zLjUwNTUsMCAtNi4zNTg4MiwyLjg1MzMyIC02LjM1ODgyLDYuMzU4ODJ6TTI0NC4xNzQ1NCwxNjguNzIzNzdsLTYuNjYwOTYsMy44NDc0NGwtMC4wMTY2MywzLjUwNjVsNy4zNTExNywtNC4yMDIyNWMwLjY1NzExLC0wLjM3NjA5IDEuNDY0ODQsLTAuMzc0NzQgMi4xMjA1MywwLjAwMjc3bDYuMzAzMzgsMy42Mzk1NWMwLjA4OTAyLDAuMDUxMzkgMC4xNjgzNywwLjExMjQxIDAuMjU1MDIsMC4xNjYzMmMwLjM2NjQ2LC0xLjU1NTcyIDAuMTU1MDMsLTMuMjExMzkgLTAuNjY1MjYsLTQuNjMxOWMtMS4wOTU0NywtMS44OTczMyAtMy4wMzAxNSwtMy4wMTc4NyAtNS4wNjcxLC0zLjE2Mjc4Yy0xLjIyMjE3LC0wLjA4Njk1IC0yLjQ4MTc1LDAuMTc3MDggLTMuNjIwMTUsMC44MzQzNXpNMjI1LjgyMTU1LDE3My4zMzYyN2MtMS43NTI3NSwzLjAzNTczIC0wLjcxMDA4LDYuOTM0NDkgMi4zMjU2Niw4LjY4NzI0bDYuNjYzNzMsMy44NDQ2OGwzLjA0MzU4LC0xLjczOGwtNy4zMTUxMywtNC4yNjYwMWMtMC42NTQyNywtMC4zODE3OCAtMS4wNTYxMSwtMS4wODI3IC0xLjA1NjExLC0xLjg0MDU2di03LjI3NjMzYzAsLTAuMTAxOCAwLjAxMDU1LC0wLjIwMTEyIDAuMDEzODYsLTAuMzAyMTRjLTEuNTI5MzYsMC40NjA4NiAtMi44NTU3NywxLjQ3MTQ0IC0zLjY3NTU5LDIuODkxMTN6TTI0Mi4xNDU0OCwxNzUuODY5ODJsNy4zMTUxMyw0LjI2NjAxYzAuNjU0MjcsMC4zODE3OCAxLjA1NjExLDEuMDgyNyAxLjA1NjExLDEuODQwNTZ2Ny4yNzYzM2MwLDAuMTAxOCAtMC4wMTA1NCwwLjIwMTEyIC0wLjAxMzg1LDAuMzAyMTRjMS41MjkzNiwtMC40NjA4NiAyLjg1NTc2LC0xLjQ3MTQ0IDMuNjc1NTgsLTIuODkxMTNjMS43NTI3NSwtMy4wMzU3MyAwLjcxMDA4LC02LjkzNDQ5IC0yLjMyNTY2LC04LjY4NzI0bC02LjY2MzczLC0zLjg0NDY4ek0yMzcuNDg1ODYsMTc4LjUzMDg4bC0wLjAxMzg2LDIuOTEzM2wyLjUxNDE1LDEuNDY5MTNsMi41MjgwMSwtMS40NDQxOGwwLjAxMzg2LC0yLjkxNjA3bC0yLjUxNDE1LC0xLjQ2NjM2ek0yNDQuNjA5NzMsMTg4LjI2MDM3Yy0wLjAwMjg0LDAuNzU3ODcgLTAuNDA4NzQsMS40NTc1IC0xLjA2NDQyLDEuODM1MDJsLTYuMzAwNjEsMy42Mzk1NmMtMC4wODc5MywwLjA1MDc2IC0wLjE3OTk5LDAuMDg4MzEgLTAuMjY4ODgsMC4xMzU4M2MxLjE2NDA4LDEuMDk1NTQgMi43MDI4LDEuNzQwNzcgNC4zNDM2MiwxLjc0MDc3YzMuNTA1NSwwIDYuMzU4ODIsLTIuODUzMzIgNi4zNTg4MiwtNi4zNTg4MnYtNy42OTIxMmwtMy4wMjk3MiwtMS43Njg1ek0yMzUuMTUxODksMTg4LjEyNDU0Yy0wLjY1NzExLDAuMzc2MDkgLTEuNDY0ODQsMC4zNzQ3NCAtMi4xMjA1MywtMC4wMDI3N2wtNi4zMDMzOCwtMy42Mzk1NWMtMC4wODkwMiwtMC4wNTEzOSAtMC4xNjgzNywtMC4xMTI0MSAtMC4yNTUwMiwtMC4xNjYzMmMtMC4zNjY0NiwxLjU1NTcyIC0wLjE1NTAzLDMuMjExMzkgMC42NjUyNiw0LjYzMTljMS43NTI3NSwzLjAzNTczIDUuNjUxNTEsNC4wODExOCA4LjY4NzI1LDIuMzI4NDNsNi42NjA5NiwtMy44NDc0NGwwLjAxNjY0LC0zLjUwNjV6Jy8+PC9nPjwvZz48L3N2Zz4=";

class GPTExtension {
  getInfo() {
    return {
      id: 'gpt3',
      name: 'OpenAI Integration',
      menuIconURI: blocksIcon,
      docsURI: 'https://platform.openai.com/docs/guides/completion/introduction',
      color1: '#312252',
      color2: '#0e0044',
      color3: '#0e0044',
      blocks: [
        {
          opcode: 'generateText',
          text: '[MODEL] Role: [CHARACTER] Prompt: [PROMPT], API key [APIKEY], Max Tokens: [MAXTOKENS], Temperature (0.0-1.0): [TEMPERATURE]',
          blockType: Scratch.BlockType.REPORTER,
          arguments: {
            CHARACTER: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'Respond as a happy AI bot to',
            },
            MODEL: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'text-davinci-003',
              menu: 'MODEL_MENU'
            },
            PROMPT: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'Hello'
            },
            APIKEY: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'sk-AbCdEf.....'
            },
            MAXTOKENS: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 50
            },
            TEMPERATURE: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 0.7
            }
          }
        }
      ],
      menus: {
        MODEL_MENU: {
          acceptReporters: true,
          items:['text-davinci-003', 'text-davinci-002', 'text-curie-001', 'text-babbage-001', 'text-ada-001']
        }
      }
    };
  }

  async generateText(args) {
    const model = args.MODEL;
    const prompt = args.CHARACTER + `{${args.CHARACTER}${args.PROMPT}}`;
    const apiKey = args.APIKEY;
    const maxTokens = args.MAXTOKENS;
    const temperature = args.TEMPERATURE;

    try {
      const response = await fetch(`https://api.openai.com/v1/engines/${model}/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          prompt: prompt,
          max_tokens: maxTokens,
          temperature: temperature
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to generate text from GPT-3: ${response.status} ${response.statusText}\n${errorText}`);
      }

      const result = await response.json();
      const text = result.choices[0].text.trim();
      return text;

    } catch (error) {
      console.error(error);
      return 'Oops, an error occured. Check your key or parameters!';
    }
  }
}

Scratch.extensions.register(new GPTExtension());
