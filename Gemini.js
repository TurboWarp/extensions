// Name: Gemini AI
// ID: gemini
// Description: Интеграция с актуальными моделями Google Gemini API.
// License: MIT
// Author: Ваше Имя/Никнейм

(function (Scratch) {
    'use strict';

    class GeminiExtension {
        constructor() {
            this.apiKey = '';
            this.model = 'gemini-2.5-flash';
            this.baseUrl = 'https://generativelanguage.googleapis.com/v1beta/models';
        }

        getInfo() {
            return {
                id: 'gemini',
                name: 'Gemini AI',
                color1: '#4285F4',
                color2: '#EA4335',
                color3: '#FBBC04',
                blocks: [
                    {
                        opcode: 'setApiKey',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'задать API ключ [API_KEY]',
                        arguments: {
                            API_KEY: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'ваш_ключ_тут'
                            }
                        }
                    },
                    {
                        opcode: 'setModel',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'использовать модель [MODEL]',
                        arguments: {
                            MODEL: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'gemini-2.5-flash',
                                menu: 'models'
                            }
                        }
                    },
                    '---',
                    {
                        opcode: 'askGemini',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'спросить у Gemini [PROMPT]',
                        arguments: {
                            PROMPT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'Привет!'
                            }
                        }
                    },
                    {
                        opcode: 'askGeminiWithContext',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'спросить у Gemini [PROMPT] контекст [CONTEXT]',
                        arguments: {
                            PROMPT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'Ответь на вопрос'
                            },
                            CONTEXT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'Ты полезный помощник'
                            }
                        }
                    }
                ],
                menus: {
                    models: {
                        acceptReporters: true, // Позволяет вставлять овальные блоки вместо выбора из меню
                        items: [
                            { text: 'Gemini 2.5 Flash ⚡', value: 'gemini-2.5-flash' },
                            { text: 'Gemini 2.5 Pro 🧠', value: 'gemini-2.5-pro' },
                            { text: 'Gemini 2.0 Flash', value: 'gemini-2.0-flash' },
                            { text: 'Gemini 1.5 Pro', value: 'gemini-1.5-pro' },
                            { text: 'Gemini 1.5 Flash', value: 'gemini-1.5-flash' }
                        ]
                    }
                }
            };
        }

        setApiKey(args) {
            this.apiKey = String(args.API_KEY).trim();
            if (!this.apiKey) {
                console.warn('[Gemini] API ключ не задан или пуст');
            }
        }

        setModel(args) {
            this.model = String(args.MODEL).trim();
        }

        async askGemini(args) {
            const prompt = String(args.PROMPT || '');
            return await this._sendRequest(prompt, 'Ты полезный помощник. Отвечай кратко и по делу.');
        }

        async askGeminiWithContext(args) {
            const prompt = String(args.PROMPT || '');
            const context = String(args.CONTEXT || 'Ты полезный помощник. Отвечай кратко и по делу.');
            return await this._sendRequest(prompt, context);
        }

        async _sendRequest(prompt, context) {
            if (!this.apiKey) {
                return '❌ Ошибка: API ключ не задан. Используй блок "задать API ключ"';
            }

            if (!prompt.trim()) {
                return '❌ Ошибка: пустой запрос';
            }

            try {
                const url = `${this.baseUrl}/${this.model}:generateContent?key=${this.apiKey}`;

                // Правильная структура JSON-запроса для Gemini API с системными инструкциями
                const payload = {
                    contents: [{
                        parts: [{ text: prompt }]
                    }],
                    systemInstruction: {
                        parts: [{ text: context }]
                    }
                };

                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    let errorMsg = `HTTP ${response.status}`;
                    try {
                        const errorData = await response.json();
                        errorMsg += `: ${errorData.error?.message || 'Неизвестная ошибка'}`;
                    } catch (_) {
                        errorMsg += `: ${response.statusText}`;
                    }
                    throw new Error(errorMsg);
                }

                const data = await response.json();
                const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

                if (!text) {
                    return '⚠️ Ответ от модели пуст или заблокирован фильтрами безопасности.';
                }

                return text;

            } catch (error) {
                console.error('[Gemini] Ошибка запроса:', error);
                return `⚠️ Ошибка: ${error.message}`;
            }
        }
    }

    Scratch.extensions.register(new GeminiExtension());
})(Scratch);
