// Name: Turbo Bot
// ID: TurboBotEngine
// Description: Advanced AI text and image generation with bot memory.
// By: Seigh_sword <https://scratch.mit.edu/users/Seigh_sword/>
// License: MPL-2.0

(function (Scratch) {
  "use strict";

  const icon =
    "https://raw.githubusercontent.com/Seigh-sword/TurboBot-Turbwarp/refs/heads/main/assets/TurboBotIcon.png";
  const blockColor = "#FF4C4C";
  const menuColor = "#B00000";

  class TurboBot {
    constructor() {
      this.bots = {};
      this.textModel = "openai";
      this.imageModel = "turbo";
      this.temp = 1;
      this.seed = Math.floor(Math.random() * 999999);
      this.systemLog = "You are a helpful assistant."; 
      this.attachedFile = "";
      this.isFetching = false;

 
      this.safetyGuard = " IMPORTANT: You are running on TurboWarp (a kid-friendly coding platform). You MUST be helpful, polite, and safe. Never use profanity, violence, or inappropriate topics. If asked to do so, decline politely.";
    }

    getInfo() {
      return {
        id: "TurboBotEngine",
        name: Scratch.translate("Turbo Bot"),
        menuIconURI: icon,
        blockIconURI: icon,
        color1: blockColor,
        color2: menuColor,
        blocks: [
          {
            opcode: "isReady",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("AI ready?"),
          },
          {
            opcode: "isThinking",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is bot thinking?"),
          },
          {
            opcode: "getCurrentModel",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("model?"),
          },
          {
            opcode: "getBotName",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("bot?"),
          },
          {
            opcode: "getMemory",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("memory"),
          },
          "---",
          {
            opcode: "createBot",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("create bot named [NAME]"),
            arguments: {
              NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "TurboBot" },
            },
          },
          {
            opcode: "deleteBot",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("delete bot named [NAME]"),
            arguments: {
              NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "TurboBot" },
            },
          },
          "---",
          {
            opcode: "setTextModel",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set text model [MOD]"),
            arguments: {
              MOD: { type: Scratch.ArgumentType.STRING, menu: "textMenu" },
            },
          },
          {
            opcode: "setImageModel",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set image model [MOD]"),
            arguments: {
              MOD: { type: Scratch.ArgumentType.STRING, menu: "imageMenu" },
            },
          },
          "---",
          {
            opcode: "simplePrompt",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("prompt [TEXT]"),
            arguments: {
              TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: "Hello!" },
            },
          },
          {
            opcode: "getImageUrl",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("get url for image prompt [TEXT]"),
            arguments: {
              TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: "a racecar" },
            },
          },
          {
            opcode: "attachFile",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("attach file url [URL]"),
            arguments: {
              URL: { type: Scratch.ArgumentType.STRING, defaultValue: "" },
            },
          },
          "---",
          {
            opcode: "setSystem",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set system log [LOG]"),
            arguments: {
              LOG: { type: Scratch.ArgumentType.STRING, defaultValue: "You are a helpful assistant." },
            },
          },
          {
            opcode: "setContextText",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("set context [CTX] and prompt [TEXT]"),
            arguments: {
              CTX: { type: Scratch.ArgumentType.STRING, defaultValue: "Persona" },
              TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: "Hello!" },
            },
          },
          "---",
          {
            opcode: "setTemp",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set temperature [N]"),
            arguments: {
              N: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1.0 },
            },
          },
          {
            opcode: "setSeed",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set seed [N]"),
            arguments: {
              N: { type: Scratch.ArgumentType.NUMBER, defaultValue: 12345 },
            },
          },
          {
            opcode: "getSeed",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("seed"),
          },
          {
            opcode: "getTemp",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("temperature"),
          },
        ],
        menus: {
          textMenu: {
            acceptReporters: true,
            items: ["openai", "mistral", "gemini", "deepseek-r1", "p1", "llama"],
          },
          imageMenu: {
            acceptReporters: true,
            items: ["turbo", "flux-pro", "flux-realism", "flux-anime", "flux-3d", "flux", "any"],
          },
        },
      };
    }

    isReady() { return true; }
    isThinking() { return this.isFetching; }
    getCurrentModel() { return `T:${this.textModel} | I:${this.imageModel}`; }
    getBotName() { return Object.keys(this.bots)[0] || "None"; }
    getMemory() { return JSON.stringify(this.bots); }
    getSeed() { return this.seed; }
    getTemp() { return this.temp; }

    createBot({ NAME }) { if (!this.bots[NAME]) this.bots[NAME] = []; }
    deleteBot({ NAME }) { delete this.bots[NAME]; }
    setTextModel({ MOD }) { this.textModel = MOD; }
    setImageModel({ MOD }) { this.imageModel = MOD; }
    setTemp({ N }) { this.temp = N; }
    setSeed({ N }) { this.seed = N; }
    setSystem({ LOG }) { this.systemLog = LOG; }
    attachFile({ URL }) { this.attachedFile = URL; }

    async simplePrompt({ TEXT }) {
      this.isFetching = true;
      try {

        const fullSystem = this.systemLog + this.safetyGuard;
        
        const url = `https://text.pollinations.ai/${encodeURIComponent(TEXT)}?model=${this.textModel}&system=${encodeURIComponent(fullSystem)}&seed=${this.seed}&temperature=${this.temp}`;
        
        const r = await Scratch.fetch(url);
        if (!r.ok) {
          this.isFetching = false;
          return "Network error!! AI is sleeping?";
        }
        
        const res = await r.text();
        this.isFetching = false;

        const botNames = Object.keys(this.bots);
        if (botNames.length > 0) {
          this.bots[botNames[0]].push({ q: TEXT, a: res });
        }
        return res;
      } catch (e) {
        this.isFetching = false;
        return "Error connecting to AI... try again later!!";
      }
    }

    getImageUrl({ TEXT }) {
      try {
        let url = `https://image.pollinations.ai/prompt/${encodeURIComponent(TEXT)}?model=${this.imageModel}&seed=${this.seed}&nologo=true`;
        if (this.attachedFile) url += `&feed=${encodeURIComponent(this.attachedFile)}`;
        return url;
      } catch (err) {
        return "url_error_check_prompt";
      }
    }

    async setContextText({ CTX, TEXT }) {
      return await this.simplePrompt({ TEXT: `[Context: ${CTX}] ${TEXT}` });
    }
  }

  Scratch.extensions.register(new TurboBot());
})(Scratch);
