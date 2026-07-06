// TurboWarp AI Mode 扩展
// 作者：Darren_liu
// 描述：这是一个内嵌的 AI

((Scratch) => {
    'use strict';

    class AIModeExtension {
        constructor() {
            this.apiKey = '';
            this.apiUrl = 'https://api.openai.com/v1/chat/completions';
            this.model = 'gpt-3.5-turbo';
            this.systemPrompt = '你是GPT-3.5-turbo，一个强大的AI助手。请用简洁的语言回答问题，并在需要时提供Scratch积木代码。';
            this.language = 'auto';
            this.conversationHistory = [];
            this.lastResponse = '';
            this.isLoading = false;
            this.temperature = 0.7;
            this.maxTokens = 2000;
        }

        getInfo() {
            return {
                id: 'aimode',
                name: 'AI mode',
                color1: "#d62828",
                color2: "#9b1c1c",
                color3: "#ffb0b0",
                // 新版极简SVG图标，百分百兼容TurboWarp分类图标
                blockIconURI: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgdmlld0JveD0iMCAwIDI0IDI0Ij48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxMCIgZmlsbD0iI2Q2MjgyOCIvPjx0ZXh0IHg9IjEyIiB5PSIxNiIgZmlsbD0id2hpdGUiIGZvbnQtc2l6ZT0iMTQiIGZvbnQtd2VpZ2h0PSJib2xkIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIj5BPC90ZXh0Pjwvc3ZnPg==",
                blocks: [
                    {
                        opcode: 'setApiKey',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '设置 API 密钥为 [KEY]',
                        arguments: {
                            KEY: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'sk-xxx'
                            }
                        }
                    },
                    {
                        opcode: 'useFreeAPI',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '使用免费测试 API'
                    },
                    {
                        opcode: 'setPersona',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '设置 AI 角色为 [ROLE]',
                        arguments: {
                            ROLE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '你是一个专业的Scratch编程老师。'
                            }
                        }
                    },
                    {
                        opcode: 'setLanguage',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '设置 AI 回复语言为 [LANG]',
                        arguments: {
                            LANG: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'languageMenu',
                                defaultValue: '自动检测'
                            }
                        }
                    },
                    {
                        opcode: 'separator1',
                        blockType: Scratch.BlockType.LABEL,
                        text: 'AI 对话'
                    },
                    {
                        opcode: 'askAI',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '问 AI: [QUESTION]',
                        arguments: {
                            QUESTION: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '如何让角色移动？'
                            }
                        }
                    },
                    {
                        opcode: 'chatWithAI',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '发送消息: [MESSAGE]',
                        arguments: {
                            MESSAGE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '你好！'
                            }
                        }
                    },
                    {
                        opcode: 'getAIReply',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '获取 AI 回复'
                    },
                    {
                        opcode: 'separator2',
                        blockType: Scratch.BlockType.LABEL,
                        text: '代码生成'
                    },
                    {
                        opcode: 'generateCode',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '生成代码: [DESC]',
                        arguments: {
                            DESC: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '制作一个会跳跃的角色'
                            }
                        }
                    },
                    {
                        opcode: 'fixBug',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '修复代码: [CODE]',
                        arguments: {
                            CODE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '我的代码有问题...'
                            }
                        }
                    },
                    {
                        opcode: 'explainCode',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '解释代码: [CODE]',
                        arguments: {
                            CODE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '当绿旗被点击...'
                            }
                        }
                    },
                    {
                        opcode: 'separator3',
                        blockType: Scratch.BlockType.LABEL,
                        text: '智能助手'
                    },
                    {
                        opcode: 'summarize',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '总结文本: [TEXT]',
                        arguments: {
                            TEXT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '这是一段需要总结的文本...'
                            }
                        }
                    },
                    {
                        opcode: 'translate',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '翻译: [TEXT] 到 [LANG]',
                        arguments: {
                            TEXT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'Hello'
                            },
                            LANG: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '中文'
                            }
                        }
                    },
                    {
                        opcode: 'generateStory',
                        blockType: Scratch.BlockType.REPORTER,
                        text: '创作故事: [THEME]',
                        arguments: {
                            THEME: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '勇敢的小猫'
                            }
                        }
                    },
                    {
                        opcode: 'separator4',
                        blockType: Scratch.BlockType.LABEL,
                        text: '状态检测'
                    },
                    {
                        opcode: 'isAIReady',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'AI 是否就绪'
                    },
                    {
                        opcode: 'isAIThinking',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'AI 是否在思考'
                    },
                    {
                        opcode: 'clearChat',
                        blockType: Scratch.BlockType.COMMAND,
                        text: '清空对话历史'
                    }
                ],
                menus: {
                    languageMenu: {
                        items: ['自动检测', '中文', 'English', '日本語', '한국어', 'Français', 'Deutsch', 'Español', 'Русский', 'Italiano', 'Português']
                    }
                }
            };
        }

        setApiKey(args) {
            this.apiKey = args.KEY;
            this.apiUrl = 'https://api.openai.com/v1/chat/completions';
        }

        useFreeAPI() {
            this.apiKey = 'demo-key';
            this.apiUrl = 'https://api.example.com/ai/completions';
            this.lastResponse = '已切换到免费测试API（功能有限）';
        }

        setPersona(args) {
            this.systemPrompt = args.ROLE;
            this.conversationHistory = [{ role: 'system', content: this._buildSystemPrompt() }];
        }

        setLanguage(args) {
            const langMap = {
                '自动检测': 'auto',
                '中文': 'Chinese',
                'English': 'English',
                '日本語': 'Japanese',
                '한국어': 'Korean',
                'Français': 'French',
                'Deutsch': 'German',
                'Español': 'Spanish',
                'Русский': 'Russian',
                'Italiano': 'Italian',
                'Português': 'Portuguese'
            };
            this.language = langMap[args.LANG] || 'auto';
            if (this.conversationHistory.length > 0) {
                this.conversationHistory[0].content = this._buildSystemPrompt();
            }
        }

        _buildSystemPrompt() {
            let prompt = this.systemPrompt;
            if (this.language !== 'auto') {
                prompt += `\n请用${this.language}语言回复用户的问题。`;
            }
            return prompt;
        }

        async askAI(args) {
            await this._sendToAI(args.QUESTION);
            while (this.isLoading) await this._sleep(100);
            return this.lastResponse;
        }

        async chatWithAI(args) {
            await this._sendToAI(args.MESSAGE);
        }

        getAIReply() {
            return this.lastResponse;
        }

        async generateCode(args) {
            const prompt = `请生成Scratch代码来实现：${args.DESC}\n请用Scratch积木的方式描述，不要使用自然语言解释。`;
            return await this._quickAsk(prompt);
        }

        async fixBug(args) {
            const prompt = `请修复以下Scratch代码中的问题：\n${args.CODE}\n请解释问题并提供修复方案。`;
            return await this._quickAsk(prompt);
        }

        async explainCode(args) {
            const prompt = `请解释以下Scratch代码的作用：\n${args.CODE}\n请用简单易懂的语言解释。`;
            return await this._quickAsk(prompt);
        }

        async summarize(args) {
            const prompt = `请用简短的语言总结以下文本：\n${args.TEXT}`;
            return await this._quickAsk(prompt);
        }

        async translate(args) {
            const prompt = `请将以下文本翻译成${args.LANG}：\n${args.TEXT}`;
            return await this._quickAsk(prompt);
        }

        async generateStory(args) {
            const prompt = `请创作一个关于"${args.THEME}"的有趣故事，适合小朋友阅读。`;
            return await this._quickAsk(prompt);
        }

        isAIReady() {
            return this.apiKey !== '';
        }

        isAIThinking() {
            return this.isLoading;
        }

        clearChat() {
            this.conversationHistory = [{ role: 'system', content: this._buildSystemPrompt() }];
            this.lastResponse = '';
        }

        async _sendToAI(message) {
            if (!this.apiKey) {
                this.lastResponse = '⚠️ 请先设置API密钥或使用免费测试API';
                return;
            }
            if (this.conversationHistory.length === 0) {
                this.conversationHistory.push({ role: 'system', content: this._buildSystemPrompt() });
            }
            this.conversationHistory.push({ role: 'user', content: message });
            this.isLoading = true;
            try {
                const res = await fetch(this.apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.apiKey}`
                    },
                    body: JSON.stringify({
                        model: this.model,
                        messages: this.conversationHistory,
                        temperature: this.temperature,
                        max_tokens: this.maxTokens
                    })
                });
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json();
                if (data.choices && data.choices[0]) {
                    this.lastResponse = data.choices[0].message.content;
                    this.conversationHistory.push({ role: 'assistant', content: this.lastResponse });
                } else {
                    this.lastResponse = '❌ 未收到有效回复';
                }
            } catch (err) {
                if (this.apiKey === 'demo-key') this.lastResponse = this._getDemoResponse(message);
                else this.lastResponse = `❌ 错误：${err.message}`;
            } finally {
                this.isLoading = false;
            }
        }

        async _quickAsk(prompt) {
            if (!this.apiKey) return '⚠️ 请先设置API密钥';
            this.isLoading = true;
            try {
                const res = await fetch(this.apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${this.apiKey}`
                    },
                    body: JSON.stringify({
                        model: this.model,
                        messages: [{ role: 'system', content: this.systemPrompt }, { role: 'user', content: prompt }],
                        temperature: this.temperature,
                        max_tokens: this.maxTokens
                    })
                });
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json();
                if (data.choices && data.choices[0]) return data.choices[0].message.content;
                return '❌ 未收到有效回复';
            } catch (err) {
                if (this.apiKey === 'demo-key') return this._getDemoResponse(prompt);
                return `❌ 错误：${err.message}`;
            } finally {
                this.isLoading = false;
            }
        }

        _getDemoResponse(msg) {
            const map = {
                '如何让角色移动？': '使用"当绿旗被点击"积木，然后添加"移动10步"积木。可以用方向键控制：添加"当按下右移键"，然后"将x坐标增加10"。',
                '制作一个会跳跃的角色': '1. 当绿旗被点击\n2. 重复执行\n3. 如果按下空格键\n4. 将y坐标增加15\n5. 等待0.1秒\n6. 将y坐标减少15',
                '你好！': '你好！我是GPT-3.5-turbo，你的AI助手。有什么我可以帮你的吗？',
                'Hello': '你好！这是中文翻译。'
            };
            for (const k in map) if (msg.includes(k)) return map[k];
            return '📝 这是测试模式的回复。要获得真实AI回复，请设置你的API密钥。';
        }

        _sleep(ms) {
            return new Promise(r => setTimeout(r, ms));
        }
    }

    Scratch.extensions.register(new AIModeExtension());
})(Scratch);
