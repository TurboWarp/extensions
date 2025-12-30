// Name: Turbo Bot
// ID: TurboBotEngine
// Description: Advanced AI text and image generation with bot memory.
// By: Seigh_sword <https://scratch.mit.edu/users/Seigh_sword/>
// License: MPL-2.0

(function(Scratch) {
    'use strict';

    const icon = "https://raw.githubusercontent.com/Seigh-sword/TurboBot-Turbwarp/refs/heads/main/assets/TurboBotIcon.png";
    const blockColor = '#FF4C4C';
    const menuColor = '#B00000';

    class TurboBot {
        constructor() {
            this.bots = {}; 
            this.textModel = 'openai';
            this.imageModel = 'turbo';
            this.temp = 1;
            this.seed = Math.floor(Math.random() * 999999);
            this.systemLog = "You are a helpful AI, who helps users";
            this.attachedFile = "";
        }

        getInfo() {
            return {
                id: 'TurboBotEngine',
                name: 'Turbo Bot',
                menuIconURI: icon,
                blockIconURI: icon,
                color1: blockColor,
                color2: menuColor,
                blocks: [
                    { opcode: 'isReady', blockType: Scratch.BlockType.BOOLEAN, text: 'AI ready?' },
                    { opcode: 'getCurrentModel', blockType: Scratch.BlockType.REPORTER, text: 'model?' },
                    { opcode: 'getBotName', blockType: Scratch.BlockType.REPORTER, text: 'bot?' },
                    { opcode: 'getMemory', blockType: Scratch.BlockType.REPORTER, text: 'memory' },
                    '---',
                    { opcode: 'createBot', blockType: Scratch.BlockType.COMMAND, text: 'create bot named [NAME]', arguments: { NAME: { type: Scratch.ArgumentType.STRING, defaultValue: 'TurboBot' }}},
                    { opcode: 'deleteBot', blockType: Scratch.BlockType.COMMAND, text: 'delete bot named [NAME]', arguments: { NAME: { type: Scratch.ArgumentType.STRING, defaultValue: 'TurboBot' }}},
                    { opcode: 'renameBot', blockType: Scratch.BlockType.COMMAND, text: 'rename bot [OLD] to [NEW]', arguments: { OLD: { type: Scratch.ArgumentType.STRING, defaultValue: 'Bot1' }, NEW: { type: Scratch.ArgumentType.STRING, defaultValue: 'TurboBot' }}},
                    '---',
                    { opcode: 'setTextModel', blockType: Scratch.BlockType.COMMAND, text: 'set text model [MOD]', arguments: { MOD: { type: Scratch.ArgumentType.STRING, menu: 'textMenu' }}},
                    { opcode: 'setImageModel', blockType: Scratch.BlockType.COMMAND, text: 'set image model [MOD]', arguments: { MOD: { type: Scratch.ArgumentType.STRING, menu: 'imageMenu' }}},
                    '---',
                    { opcode: 'simplePrompt', blockType: Scratch.BlockType.REPORTER, text: 'prompt [TEXT]', arguments: { TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'Hello!' }}},
                    { opcode: 'getImageUrl', blockType: Scratch.BlockType.REPORTER, text: 'get url for image prompt [TEXT]', arguments: { TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'a racecar in a race going so fast' }}},
                    { opcode: 'attachFile', blockType: Scratch.BlockType.COMMAND, text: 'attach file url [URL]', arguments: { URL: { type: Scratch.ArgumentType.STRING, defaultValue: '' }}},
                    '---',
                    { opcode: 'setSystem', blockType: Scratch.BlockType.COMMAND, text: 'set system log [LOG]', arguments: { LOG: { type: Scratch.ArgumentType.STRING, defaultValue: 'You are a helpful assistant.' }}},
                    { opcode: 'setContextText', blockType: Scratch.BlockType.REPORTER, text: 'set context [CTX] and prompt [TEXT]', arguments: { CTX: { type: Scratch.ArgumentType.STRING, defaultValue: 'Persona' }, TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'Hello!' }}},
                    { opcode: 'setContextImage', blockType: Scratch.BlockType.REPORTER, text: 'set context [CTX] and get url of image prompt [TEXT]', arguments: { CTX: { type: Scratch.ArgumentType.STRING, defaultValue: 'Anime' }, TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'racecar' }}},
                    '---',
                    { opcode: 'setTemp', blockType: Scratch.BlockType.COMMAND, text: 'set temperature [N]', arguments: { N: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1.0 }}},
                    { opcode: 'setSeed', blockType: Scratch.BlockType.COMMAND, text: 'set seed [N]', arguments: { N: { type: Scratch.ArgumentType.NUMBER, defaultValue: 12345 }}},
                    { opcode: 'getSeed', blockType: Scratch.BlockType.REPORTER, text: 'seed' },
                    { opcode: 'getTemp', blockType: Scratch.BlockType.REPORTER, text: 'temperature' }
                ],
                menus: {
                    textMenu: { acceptReporters: true, items: ['openai', 'mistral', 'gemini', 'deepseek-r1', 'p1', 'llama'] },
                    imageMenu: { acceptReporters: true, items: ['turbo', 'flux-pro', 'flux-realism', 'flux-anime', 'flux-3d', 'flux', 'any'] }
                }
            };
        }

        isReady() { return true; }
        getCurrentModel() { return `T:${this.textModel} | I:${this.imageModel}`; }
        getBotName() { return Object.keys(this.bots)[0] || "None"; }
        getMemory() { return JSON.stringify(this.bots); }
        getSeed() { return this.seed; }
        getTemp() { return this.temp; }

        createBot({NAME}) { 
            if (!this.bots[NAME]) this.bots[NAME] = []; 
        }
        deleteBot({NAME}) { delete this.bots[NAME]; }
        renameBot({OLD, NEW}) { 
            if(this.bots[OLD]) { 
                this.bots[NEW] = this.bots[OLD]; 
                delete this.bots[OLD]; 
            }
        }
        setTextModel({MOD}) { this.textModel = MOD; }
        setImageModel({MOD}) { this.imageModel = MOD; }
        setTemp({N}) { this.temp = N; }
        setSeed({N}) { this.seed = N; }
        setSystem({LOG}) { this.systemLog = LOG; }
        attachFile({URL}) { this.attachedFile = URL; }

        async simplePrompt({TEXT}) {
            try {
                const url = `https://text.pollinations.ai/${encodeURIComponent(TEXT)}?model=${this.textModel}&system=${encodeURIComponent(this.systemLog)}&seed=${this.seed}&temperature=${this.temp}`;
                const r = await fetch(url);
                if (!r.ok) return "Network error!! AI is sleeping?";
                const res = await r.text();
                
                const botNames = Object.keys(this.bots);
                if (botNames.length > 0) {
                    this.bots[botNames[0]].push({ q: TEXT, a: res });
                }
                return res;
            } catch (e) {
                return "Error connecting to AI... try again later!!";
            }
        }

        getImageUrl({TEXT}) {
            try {
                let url = `https://image.pollinations.ai/prompt/${encodeURIComponent(TEXT)}?model=${this.imageModel}&seed=${this.seed}&nologo=true`;
                if (this.attachedFile) url += `&feed=${encodeURIComponent(this.attachedFile)}`;
                return url;
            } catch (err) {
                return "url_error_check_prompt";
            }
        }

        async setContextText({CTX, TEXT}) { 
            return await this.simplePrompt({TEXT: `[Context: ${CTX}] ${TEXT}`}); 
        }
        
        setContextImage({CTX, TEXT}) { 
            return this.getImageUrl({TEXT: `${CTX}, ${TEXT}`}); 
        }
    }

    Scratch.extensions.register(new TurboBot());
})(Scratch);
