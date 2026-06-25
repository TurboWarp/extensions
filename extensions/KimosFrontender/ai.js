// Name: AI
// ID: ai
// Description: Chat with AI in Scratch. Supports OpenAI and Anthropic APIs with streaming responses.
// By: KimosFrontender <https://scratch.mit.edu/users/Kimos-Frontender/>
// License: MIT

// @ts-nocheck
(function (Scratch) {
  // This extension is compatible down to ES6 at minimum.
  "use strict";
  var BLOCK_ICON_URI =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsSAAALEgHS3X78AAADKUlEQVR4nO2b4XGcMBCFn9OAKeE68JVACddB6CBXgtPBdWCuA3cQ0gHu4NIBqeD5BzDmlF0hkNAyk9sZZjw6Cd5+aFcLyE8k8T/bN2sB1vYAYC3A2h4ArAVY2wOAtQBrswZwAXC0FGAJoAbwA0ADQwhWAM4Avg9/P6OHUFoIsQLg3vFnAL8AVLmFWAGoAFyF9jdkhmCZAyrsAMLWAAoAB8/vFYCfQvsbgNf0cgQjueVRk+xIHmf6VZSt3ljfpgDOE0d2C2GrE58ER3YJYYuTHgdnJesGJ33jS2V8Q7LYO4CC5E1xfmpzEDSIbWoIqQE0gmgNyC4gpHS+FsS+e37bBYRUzlcBItdCKIZzuRaSVLMAKBeIOwt9TSHEOn+gPEVLzxhptphBiHFeE3R2+kniYiA0CgQf9E0AvAtCasH5jnLSWgsBXJ9PkgG4CBdvnT4F78Oj5b+zwRzCGucl0Tfe32EtPC6B5yPJ1xwQljovrctSEgoJjxAIvjHj8aqMDQG4CIA7pUdzaWvhMVe4xEBolGsmBSBNaZdySHikhiDVFsGVYqjztXCRRuhX8n6WuOFxYB8ePnEShG4YG9o3uC6IAUDKyebIrweg06R9mhjn7tAUpOaQ9pywqChaEgIaBDcMRmc150drKd9VF6TkUGg+SgoA1Gv5embcQQBAritjlyyxyQGA67N1qlp+6RKbHIAPwlyC80E4ecaNx9olNjkAUH93Nyeo4LoKToJ+i3E+FgAY98ZmCYRS6LebFyI+CHMCNQjThKadPyRksgAA47J8pUCoqb9llmaJKQAwLstrEKQ7XyfUvMl3gbVZvlIcnlqTWO9mn8ZqxYFqZpwW7+QGH0W2BJAagvYwtGsAPghzZeuRX6GUZLmzAgDGl85zMybqeCKz/L9AhX7Xh2tXGGyMmlouAIAO4TeAE4Aul5Cp5QQA9NvjGvTb4qb2gX6fYHYIuXeJtegd/eu0v6AHU2TWY7JNboTwx2l/GX475BRjtU+wRR8OH057h8xhYLlRskM/E0YIJnnAerv8COEKoySYexXYnVnPAHN7ALAWYG0PANYCrO0BwFqAtX0CJHH8H1ebuYYAAAAASUVORK5CYII=";
  var DATA_PROCESSING_URI =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsSAAALEgHS3X78AAACTUlEQVR4nO2a4U3DMBBGH4gFwggwAoxQRggjlBHKCGWEdoQyQhmhjAAjNCMcP+IK54DWSXw5BH5SRVz5nM8fbmxffCYi/GfOvQV4UwzwFuBNMcBbgDfFAG8B3hQDvAV4M6UBN8AC2AMSrg/Mw3eH72dTibqY6D4r2k6msAx/n4F7GzmfTDECNqR3PqYOsbaIiOVnJl9ZHqm//Kb+zFKjtQEr1ZlFQsxCxWwsNZ6J7Xb4DbiKypdAkxC3B6pw3YQ4E6yfAXHnX0nrPMBLdF2pdrJiaYAWndr5vnVHURZC3gK8KQZ4C/CmGOAtwJtiwIT3GjO3V6erDOO3LoTeT7SVDUsDblRZd+oYuq5uKxtWm6GKdiMUD91r0k3Q8Q1w2yM+GYsRUANbup1f0098AzxF5Sq0WY9Wp8m8v36Tr2wz5hMk3CObZutZYA3cjYh/oDsSsmNtwBzYMXwa29LNHufHIM00E5GdGrZD0lo6P7gTkTq3XstZYEd3/r6lzQqlxu+jckM7i2RPlFj9BBra339Mn5cduu4aoyyR5TPgRZX7rOZ03dSR0xtLA/R/rM+DUBuQfQF0YMrN0JgNjVmStGyHvQV4UwzwFuBNMcBbgDfFAMO29eKlzzrALAmqsT4fMPQ9/585H6Df86ecFarpjgC9p8jKFBmhmBXHExyLUCfG1ACzszfRZyPfE58Xmv9Qx/R8kEyQE4T2rN/zgLg/c04Q2o7cAY+c3tk9hrrmnQf7WeDXUxZC3gK8KQZ4C/CmGOAtwJtigLcAb4oB3gK8+QAub0WlJ923VAAAAABJRU5ErkJggg==";

  class AI {
    constructor() {
      /**
       * @type {Map<string,{
       *   id: string,
       *   aiPresetId: string,
       *   messages: {
       *    role: "user" | "assistant",
       *    content: string
       *   }[],
       *   status: "idle" | "pending" | "streaming",
       *   controller: null | AbortController
       *   response: string | null
       * }>}
       */
      this.chats = new Map();
      /**
       * @type {Map<string,{
       *   id: string,
       *   requestformat: "anthropic" | "openai",
       *   requesturl: string,
       *   model: string,
       *   apikey: string,}>}
       */
      this.presets = new Map();
    }
    getInfo() {
      return {
        id: "ai",
        color1: "#3a3a3a",
        color2: "#444444",
        color3: "#777777",
        name: Scratch.translate("AI"),
        blocks: [
          {
            opcode: "isInternetConnected",
            blockIconURI: BLOCK_ICON_URI,
            text: Scratch.translate("Internet connected?"),
            blockType: Scratch.BlockType.BOOLEAN,
            arguments: {},
          },
          {
            opcode: "createNewChat",
            blockIconURI: BLOCK_ICON_URI,
            text: Scratch.translate("Create a new chat with id[ID]"),
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("chat1"),
              },
            },
          },
          {
            opcode: "deleteChat",
            blockIconURI: BLOCK_ICON_URI,
            text: Scratch.translate("Delete chat with id[ID]"),
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("chat1"),
              },
            },
          },
          {
            opcode: "clearAllChats",
            blockIconURI: BLOCK_ICON_URI,
            text: Scratch.translate("Clear all chats"),
            blockType: Scratch.BlockType.COMMAND,
          },
          {
            opcode: "createNewAIPreset",
            blockIconURI: BLOCK_ICON_URI,
            text: Scratch.translate("Create a new AI preset with id [ID]"),
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("preset1"),
              },
            },
          },
          {
            opcode: "deletePreset",
            blockIconURI: BLOCK_ICON_URI,
            text: Scratch.translate("Delete AI preset with id [ID]"),
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("preset1"),
              },
            },
          },
          {
            opcode: "clearAllPresets",
            blockIconURI: BLOCK_ICON_URI,
            text: Scratch.translate("Clear all AI presets"),
            blockType: Scratch.BlockType.COMMAND,
          },
          {
            opcode: "setAiPresetProp",
            blockIconURI: BLOCK_ICON_URI,
            text: Scratch.translate(
              "Set the [PROP] of AI preset [ID] to [VALUE]"
            ),
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("preset1"),
              },
              PROP: {
                type: Scratch.ArgumentType.STRING,
                menu: "AI_PRESET_PROP",
                defaultValue: "apikey",
              },
              VALUE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "sk-xxxx",
              },
            },
          },
          {
            opcode: "assignAiPresetToChat",
            blockIconURI: BLOCK_ICON_URI,
            text: Scratch.translate(
              "Use AI preset [PRESET_ID] for chat [CHAT_ID]"
            ),
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              PRESET_ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("preset1"),
              },
              CHAT_ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("chat1"),
              },
            },
          },
          {
            opcode: "setRequestFormatOfPreset",
            blockIconURI: BLOCK_ICON_URI,
            text: Scratch.translate(
              "Set request format for preset with id[ID] to [FORMAT]"
            ),
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("preset1"),
              },
              FORMAT: {
                type: Scratch.ArgumentType.STRING,
                menu: "REQUEST_FORMATS",
                defaultValue: "openai",
              },
            },
          },
          {
            opcode: "sendMessage",
            blockIconURI: BLOCK_ICON_URI,
            text: Scratch.translate(
              "Send message [MESSAGE] to chat with id[ID]"
            ),
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              MESSAGE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("Hello"),
              },
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("chat1"),
              },
            },
          },
          {
            opcode: "stopMessage",
            blockIconURI: BLOCK_ICON_URI,
            text: Scratch.translate("Stop message from chat [ID]"),
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("chat1"),
              },
            },
          },
          {
            opcode: "response",
            blockIconURI: BLOCK_ICON_URI,
            text: Scratch.translate("Response from chat [ID]"),
            blockType: Scratch.BlockType.REPORTER,
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("chat1"),
              },
            },
          },
          {
            opcode: "status",
            blockIconURI: BLOCK_ICON_URI,
            text: Scratch.translate("Status of chat with id[ID]"),
            blockType: Scratch.BlockType.REPORTER,
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("chat1"),
              },
            },
          },
          {
            opcode: "isIdle",
            blockIconURI: BLOCK_ICON_URI,
            text: Scratch.translate("Is chat with id[ID] idle?"),
            blockType: Scratch.BlockType.BOOLEAN,
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("chat1"),
              },
            },
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Common AI"),
          },
          {
            opcode: "anthropicUrl",
            blockIconURI: BLOCK_ICON_URI,
            text: Scratch.translate("URL of [AI](Anthropic)"),
            blockType: Scratch.BlockType.REPORTER,
            arguments: {
              AI: {
                type: Scratch.ArgumentType.STRING,
                menu: "COMMON_AI_ANTHROPIC_URLS",
                defaultValue: "https://api.deepseek.com/anthropic",
              },
            },
          },
          {
            opcode: "openaiUrl",
            blockIconURI: BLOCK_ICON_URI,
            text: Scratch.translate("URL of [AI](OpenAI)"),
            blockType: Scratch.BlockType.REPORTER,
            arguments: {
              AI: {
                type: Scratch.ArgumentType.STRING,
                menu: "COMMON_AI_OPENAI_URLS",
                defaultValue: "https://api.deepseek.com",
              },
            },
          },

          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Data processing(JSON)"),
          },
          {
            opcode: "setDataOfMap",
            blockIconURI: DATA_PROCESSING_URI,
            text: Scratch.translate(
              "Overwrite id[ID] in [MAP] with JSON [DATA]"
            ),
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "chat1",
              },
              MAP: {
                type: Scratch.ArgumentType.STRING,
                menu: "MAP",
                defaultValue: "chats",
              },
              DATA: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "{}",
              },
            },
          },
          {
            opcode: "setDataOfChatHistory",
            blockIconURI: DATA_PROCESSING_URI,
            text: Scratch.translate(
              "Overwrite chat history of id[ID] with JSON [DATA]"
            ),
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "chat1",
              },
              DATA: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "{}",
              },
            },
          },
          {
            opcode: "clearChatHistory",
            blockIconURI: DATA_PROCESSING_URI,
            text: Scratch.translate("Clear chat history of id[ID]"),
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "chat1",
              },
            },
          },
          {
            opcode: "addMessageOfChatHistory",
            blockIconURI: DATA_PROCESSING_URI,
            text: Scratch.translate(
              "Add a message to chat [ID] with role[ROLE] and content[CONTENT]"
            ),
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "chat1",
              },
              ROLE: {
                type: Scratch.ArgumentType.STRING,
                menu: "CHAT_ROLE",
                defaultValue: "user",
              },
              CONTENT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("How do you do?"),
              },
            },
          },
          {
            opcode: "deleteItemOfChatHistory",
            blockIconURI: DATA_PROCESSING_URI,
            text: Scratch.translate(
              "Delete message at index [INDEX] from chat with id[ID]"
            ),
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              INDEX: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "chat1",
              },
            },
          },
          {
            opcode: "coverObject",
            blockIconURI: DATA_PROCESSING_URI,
            text: Scratch.translate("Cover [DIFF] to [BASE]"),
            blockType: Scratch.BlockType.REPORTER,
            arguments: {
              DIFF: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '{"key1": 1}',
              },
              BASE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "{}",
              },
            },
          },
          {
            opcode: "setObjectProp",
            blockIconURI: DATA_PROCESSING_URI,
            text: Scratch.translate("Set [OBJECT]'s [KEY] to [VALUE]"),
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              OBJECT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "{}",
              },
              KEY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "key1",
              },
              VALUE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '"value1"',
              },
            },
          },
          {
            opcode: "allKeysOfMap",
            blockIconURI: DATA_PROCESSING_URI,
            text: Scratch.translate("All keys of [MAP]"),
            blockType: Scratch.BlockType.REPORTER,
            arguments: {
              MAP: {
                type: Scratch.ArgumentType.STRING,
                menu: "MAP",
                defaultValue: "chats",
              },
            },
          },
          {
            opcode: "dataOfMap",
            blockIconURI: DATA_PROCESSING_URI,
            text: Scratch.translate("Data of [ID] from [MAP]"),
            blockType: Scratch.BlockType.REPORTER,
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("chat1"),
              },
              MAP: {
                type: Scratch.ArgumentType.STRING,
                menu: "MAP",
                defaultValue: "chats",
              },
            },
          },
          {
            opcode: "chatHistory",
            blockIconURI: DATA_PROCESSING_URI,
            text: Scratch.translate("Chat history from id[ID]"),
            blockType: Scratch.BlockType.REPORTER,
            arguments: {
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("chat1"),
              },
            },
          },
          {
            opcode: "propOfChatHistory",
            blockIconURI: DATA_PROCESSING_URI,
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate(
              "[PROP] of item [INDEX] of chat history id[ID]"
            ),
            arguments: {
              PROP: {
                type: Scratch.ArgumentType.STRING,
                menu: "CHAT_HISTORY_PROP",
                defaultValue: "content",
              },
              INDEX: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("chat1"),
              },
            },
          },
          {
            opcode: "lengthOfArray",
            blockIconURI: DATA_PROCESSING_URI,
            text: Scratch.translate("Length of [ARRAY]"),
            blockType: Scratch.BlockType.REPORTER,
            arguments: {
              ARRAY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "[]",
              },
            },
          },
          {
            opcode: "itemOfArray",
            blockIconURI: DATA_PROCESSING_URI,
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("Item [INDEX] of array[ARRAY]"),
            arguments: {
              INDEX: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
              ARRAY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "[]",
              },
            },
          },
          {
            opcode: "itemOfObject",
            blockIconURI: DATA_PROCESSING_URI,
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("Item [KEY] of object[OBJECT]"),
            arguments: {
              KEY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("key1"),
              },
              OBJECT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "{}",
              },
            },
          },
        ],
        menus: {
          MAP: {
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate("Chats"),
                value: "chats",
              },
              {
                text: Scratch.translate("AI presets"),
                value: "aipresets",
              },
            ],
          },
          AI_PRESET_PROP: {
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate("API Key"),
                value: "apikey",
              },
              {
                text: Scratch.translate("Request URL"),
                value: "requesturl",
              },
              {
                text: Scratch.translate("Model"),
                value: "model",
              },
            ],
          },
          REQUEST_FORMATS: {
            acceptReporters: false,
            items: [
              {
                text: "OpenAI",
                value: "openai",
              },
              {
                text: "Anthropic",
                value: "anthropic",
              },
            ],
          },
          COMMON_AI_OPENAI_URLS: {
            acceptReporters: false,
            items: [
              {
                text: "OpenAI",
                value: "https://api.openai.com/v1",
              },
              {
                text: "DeepSeek",
                value: "https://api.deepseek.com",
              },
              {
                text: "Qwen",
                value: "https://dashscope.aliyuncs.com/compatible-mode/v1",
              },
              {
                text: "Kimi",
                value: "https://api.moonshot.cn/v1",
              },
              {
                text: "GLM",
                value: "https://open.bigmodel.cn/api/paas/v4",
              },
              {
                text: "Baichuan",
                value: "https://api.baichuan-ai.com/v1",
              },
              {
                text: "Doubao",
                value: "https://ark.cn-beijing.volces.com/api/v3",
              },
              {
                text: "MiniMax",
                value: "https://api.minimax.chat/v1",
              },
              {
                text: "Stepfun",
                value: "https://api.stepfun.com/v1",
              },
              {
                text: "Hunyuan",
                value: "https://api.hunyuan.cloud.tencent.com/v1",
              },
              {
                text: "Spark",
                value: "https://spark-api-open.xf-yun.com/v1",
              },
              {
                text: "Gemini",
                value:
                  "https://generativelanguage.googleapis.com/v1beta/openai",
              },
              {
                text: "Groq",
                value: "https://api.groq.com/openai/v1",
              },
              {
                text: "Mistral",
                value: "https://api.mistral.ai/v1",
              },
              {
                text: "Cohere",
                value: "https://api.cohere.ai/compatibility/v1",
              },
              {
                text: "Grok",
                value: "https://api.x.ai/v1",
              },
              {
                text: "OpenRouter",
                value: "https://openrouter.ai/api/v1",
              },
              {
                text: "Together AI",
                value: "https://api.together.xyz/v1",
              },
              {
                text: "Fireworks AI",
                value: "https://api.fireworks.ai/inference/v1",
              },
              {
                text: "Perplexity",
                value: "https://api.perplexity.ai",
              },
              {
                text: "Novita AI",
                value: "https://api.novita.ai/v3/openai",
              },
              {
                text: "SiliconFlow",
                value: "https://api.siliconflow.cn/v1",
              },
              {
                text: "Vercel AI Gateway",
                value: "https://ai-gateway.vercel.sh/v1",
              },
            ],
          },

          COMMON_AI_ANTHROPIC_URLS: {
            acceptReporters: false,
            items: [
              {
                text: "DeepSeek",
                value: "https://api.deepseek.com/anthropic",
              },
              {
                text: "Grok",
                value: "https://api.x.ai",
              },
              {
                text: "GLM ",
                value: "https://open.bigmodel.cn/api/anthropic",
              },
              {
                text: "Qwen",
                value: "https://dashscope.aliyuncs.com/apps/anthropic",
              },
              {
                text: "Mimo",
                value: "https://token-plan-cn.xiaomimimo.com",
              },
              {
                text: "Gemini",
                value:
                  "https://generativelanguage.googleapis.com/v1beta/openai",
              },
              {
                text: "MiniMax",
                value: "https://api.minimaxi.com/anthropic",
              },
              {
                text: "Seed Code",
                value: "https://ark.cn-beijing.volces.com/api/compatible",
              },
              {
                text: "Kimi",
                value: "https://api.moonshot.cn",
              },
              {
                text: "Claude",
                value: "https://api.anthropic.com",
              },
              {
                text: "OpenRouter",
                value: "https://openrouter.ai/api",
              },
              {
                text: "OfoxAI",
                value: "https://api.ofox.io/anthropic",
              },
              {
                text: "Vercel",
                value: "https://ai-gateway.vercel.sh",
              },
              {
                text: "Cloudflare AI",
                value:
                  "https://gateway.ai.cloudflare.com/v1/YOUR_ACCOUNT_ID/YOUR_GATEWAY_ID/anthropic",
              },
            ],
          },

          COMMON_MODELS: {
            acceptReporters: true,
            items: [],
          },
          CHAT_HISTORY_PROP: {
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate("role"),
                value: "role",
              },
              {
                text: Scratch.translate("content"),
                value: "content",
              },
            ],
          },
          CHAT_ROLE: {
            acceptReporters: false,
            items: [
              {
                text: Scratch.translate("user"),
                value: "user",
              },
              {
                text: Scratch.translate("assistant"),
                value: "assistant",
              },
            ],
          },
        },
      };
    }
    /**
     * @param {string} url
     * @param {"anthropic"|"openai"} format
     * @returns {string}
     */
    _padUrl(url, format = "anthropic") {
      if (typeof url !== "string") return "";
      var result = url;
      while (result.endsWith("/")) {
        result = result.slice(0, -1);
      }
      switch (format) {
        case "anthropic":
          if (result.endsWith("/v1")) {
            result += "/messages";
          } else if (!result.endsWith("/v1/messages")) {
            result += "/v1/messages";
          }
          break;
        case "openai":
          // OpenAI-compatible APIs expect the path to end with /v1/chat/completions
          if (!result.endsWith("/v1/chat/completions")) {
            if (result.endsWith("/v1")) {
              result += "/chat/completions";
            } else {
              result += "/v1/chat/completions";
            }
          }
          break;
        default:
          break;
      }
      return result;
    }
    _sendAnthropic(chat, requesturl, headers, body) {
      function fetchHandle(response) {
        chat.messages.push({
          role: "assistant",
          content: "",
        });
        if (!response.ok) {
          chat.messages[chat.messages.length - 1].content =
            "Request failed:" + response.status;
          chat.status = "idle";
          return;
        }
        var reader = response.body.getReader();
        var decoder = new TextDecoder();
        var buffer = "";
        function readHandle(result) {
          if (result.done) {
            chat.messages[chat.messages.length - 1].content = chat.response;
            chat.status = "idle";
            chat.response = null;
            return;
          }
          buffer += decoder.decode(result.value, { stream: true });
          var lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            if (!line.startsWith("data: ")) continue;
            var jsonStr = line.slice(6);

            try {
              var data = JSON.parse(jsonStr);
            } catch (e) {
              continue;
            }

            switch (data.type) {
              case "content_block_start":
                break;
              case "content_block_delta":
                if (data.delta && data.delta.text) {
                  chat.response += data.delta.text;
                  chat.messages[chat.messages.length - 1].content =
                    chat.response;
                }
                break;
              case "content_block_stop":
                break;
              case "message_delta":
                break;
              case "message_stop":
                break;
              case "error":
                chat.messages[chat.messages.length - 1].content += "[error]";
                chat.status = "idle";
                chat.response = null;
                break;
            }
          }
          readStream();
        }
        function readError(error) {
          if (error.name !== "AbortError") {
            chat.messages[chat.messages.length - 1].content += "[break]";
          } else {
            chat.messages[chat.messages.length - 1].content = chat.response;
          }
          chat.status = "idle";
          chat.response = null;
        }
        function readStream() {
          reader.read().then(readHandle).catch(readError);
        }
        readStream();
      }
      function fetchError(error) {
        if (error.name === "AbortError") {
          chat.messages.push({ role: "assistant", content: chat.response });
        } else {
          chat.messages.push({
            role: "assistant",
            content: "Request failed: " + error.message,
          });
        }
        chat.status = "idle";
        chat.response = null;
      }

      Scratch.fetch(requesturl, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
        signal: chat.controller.signal,
      })
        .then(fetchHandle)
        .catch(fetchError);
    }
    // Send a streaming request using the OpenAI-compatible chat completions format.
    // The structure mirrors _sendAnthropic above: fetch -> read SSE stream -> accumulate deltas.
    _sendOpenai(chat, requesturl, headers, body) {
      function fetchHandle(response) {
        chat.messages.push({
          role: "assistant",
          content: "",
        });
        if (!response.ok) {
          chat.messages[chat.messages.length - 1].content =
            "Request failed:" + response.status;
          chat.status = "idle";
          return;
        }
        var reader = response.body.getReader();
        var decoder = new TextDecoder();
        var buffer = "";
        function readHandle(result) {
          if (result.done) {
            chat.messages[chat.messages.length - 1].content = chat.response;
            chat.status = "idle";
            chat.response = null;
            return;
          }
          buffer += decoder.decode(result.value, { stream: true });
          var lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            // Each SSE event starts with "data: " followed by JSON
            if (!line.startsWith("data: ")) continue;
            var jsonStr = line.slice(6);

            // "[DONE]" marker signals the end of the stream
            if (jsonStr.trim() === "[DONE]") {
              // Stream finished normally — final content is already in chat.response
              continue;
            }

            try {
              var data = JSON.parse(jsonStr);
            } catch (e) {
              continue;
            }

            // OpenAI-style SSE: data.choices[0].delta.content
            if (
              data.choices &&
              data.choices[0] &&
              data.choices[0].delta &&
              typeof data.choices[0].delta.content === "string"
            ) {
              chat.response += data.choices[0].delta.content;
              chat.messages[chat.messages.length - 1].content = chat.response;
            }
          }
          readStream();
        }
        function readError(error) {
          if (error.name !== "AbortError") {
            chat.messages[chat.messages.length - 1].content += "[break]";
          } else {
            chat.messages[chat.messages.length - 1].content = chat.response;
          }
          chat.status = "idle";
          chat.response = null;
        }
        function readStream() {
          reader.read().then(readHandle).catch(readError);
        }
        readStream();
      }
      function fetchError(error) {
        if (error.name === "AbortError") {
          chat.messages.push({ role: "assistant", content: chat.response });
        } else {
          chat.messages.push({
            role: "assistant",
            content: "Request failed: " + error.message,
          });
        }
        chat.status = "idle";
        chat.response = null;
      }

      Scratch.fetch(requesturl, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
        signal: chat.controller.signal,
      })
        .then(fetchHandle)
        .catch(fetchError);
    }
    isInternetConnected() {
      return navigator.onLine || false;
    }
    deletePreset(args) {
      var ID = Scratch.Cast.toString(args.ID);
      if (!this.presets.has(ID)) return;
      this.presets.delete(ID);
    }
    clearAllPresets() {
      this.presets.clear();
    }
    clearAllChats() {
      this.chats.clear();
    }
    deleteChat(args) {
      var ID = Scratch.Cast.toString(args.ID);
      if (!this.chats.has(ID)) return;
      this.chats.delete(ID);
    }
    setRequestFormatOfPreset(args) {
      var ID = Scratch.Cast.toString(args.ID);
      var FORMAT = Scratch.Cast.toString(args.FORMAT);
      if (!this.presets.has(ID)) return;
      this.presets.get(ID).requestformat = FORMAT;
    }
    createNewChat(args) {
      var ID = Scratch.Cast.toString(args.ID);
      if (this.chats.has(ID)) return;
      this.chats.set(ID, {
        id: ID,
        aiPresetId: "",
        messages: [],
        status: "idle",
        controller: null,
        response: null,
      });
    }
    status(args) {
      const ID = Scratch.Cast.toString(args.ID);
      if (!this.chats.has(ID)) return "";
      return this.chats.get(ID).status;
    }
    isIdle(args) {
      const ID = Scratch.Cast.toString(args.ID);
      if (!this.chats.has(ID)) return false;
      return this.chats.get(ID).status === "idle";
    }
    createNewAIPreset(args) {
      var ID = Scratch.Cast.toString(args.ID);
      if (this.presets.has(ID)) return;
      this.presets.set(ID, {
        id: ID,
        requestformat: "openai",
        requesturl: "",
        model: "",
        apikey: "",
      });
    }
    setAiPresetProp(args) {
      var ID = Scratch.Cast.toString(args.ID);
      var currentPreset = this.presets.get(ID);
      if (!currentPreset) return;
      var PROP = Scratch.Cast.toString(args.PROP);
      var VALUE = Scratch.Cast.toString(args.VALUE);
      switch (PROP) {
        case "apikey":
          currentPreset.apikey = VALUE;
          break;
        case "model":
          currentPreset.model = VALUE;
          break;
        case "requesturl":
          currentPreset.requesturl = VALUE;
          break;
        case "requestformat":
          currentPreset.requestformat = VALUE;
          break;
        default:
          return;
      }
    }
    assignAiPresetToChat(args) {
      var PRESET_ID = Scratch.Cast.toString(args.PRESET_ID);
      var CHAT_ID = Scratch.Cast.toString(args.CHAT_ID);
      var chat = this.chats.get(CHAT_ID);
      if (!chat) return;
      chat.aiPresetId = PRESET_ID;
    }

    sendMessage(args) {
      var MESSAGE = Scratch.Cast.toString(args.MESSAGE);
      var ID = Scratch.Cast.toString(args.ID);
      var chat = this.chats.get(ID);
      if (!chat) return;
      if (chat.status !== "idle") return;
      var preset = this.presets.get(chat.aiPresetId);
      if (!preset) {
        chat.messages.push({
          role: "assistant",
          content: "Error: No AI preset assigned",
        });
        chat.status = "idle";
        return;
      }
      var format = preset.requestformat;
      chat.status = "pending";
      var message = {
        role: "user",
        content: MESSAGE,
      };
      chat.controller = new AbortController();
      chat.messages.push(message);
      chat.response = "";

      var requesturl = this._padUrl(preset.requesturl, format);
      var headers;
      var body;

      if (format === "anthropic") {
        headers = {
          "Content-Type": "application/json",
          "x-api-key": preset.apikey,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        };
        body = {
          model: preset.model,
          messages: chat.messages.map(function (msg) {
            return { role: msg.role, content: msg.content };
          }),
          stream: true,
          max_tokens: 9070,
        };
        this._sendAnthropic(chat, requesturl, headers, body);
      } else if (format === "openai") {
        // OpenAI-compatible chat completions format
        headers = {
          "Content-Type": "application/json",
          Authorization: "Bearer " + preset.apikey,
        };
        body = {
          model: preset.model,
          messages: chat.messages.map(function (msg) {
            return { role: msg.role, content: msg.content };
          }),
          stream: true,
        };
        this._sendOpenai(chat, requesturl, headers, body);
      }
    }
    stopMessage(args) {
      var ID = Scratch.Cast.toString(args.ID);
      var chat = this.chats.get(ID);
      if (!chat) return;
      if (chat.controller) chat.controller.abort();
    }

    response(args) {
      var ID = Scratch.Cast.toString(args.ID);
      var chat = this.chats.get(ID);
      if (!chat) return "";
      return chat.response || "";
    }
    anthropicUrl(args) {
      return Scratch.Cast.toString(args.AI);
    }
    openaiUrl(args) {
      return Scratch.Cast.toString(args.AI);
    }
    addMessageOfChatHistory(args) {
      var ID = Scratch.Cast.toString(args.ID);
      var ROLE = Scratch.Cast.toString(args.ROLE);
      var CONTENT = Scratch.Cast.toString(args.CONTENT);
      var chat = this.chats.get(ID);
      if (!chat) return;
      chat.messages.push({ role: ROLE, content: CONTENT });
    }
    deleteItemOfChatHistory(args) {
      var ID = Scratch.Cast.toString(args.ID);
      var chat = this.chats.get(ID);
      var INDEX = parseInt(Scratch.Cast.toNumber(args.INDEX));
      if (!chat) return;
      // Convert 1-based index to 0-based
      chat.messages.splice(INDEX - 1, 1);
    }
    clearChatHistory(args) {
      var ID = Scratch.Cast.toString(args.ID);
      var chat = this.chats.get(ID);
      if (!chat) return;
      chat.messages = [];
    }
    setDataOfChatHistory(args) {
      var ID = Scratch.Cast.toString(args.ID);
      var chat = this.chats.get(ID);
      if (!chat) return;
      var data;
      try {
        data = JSON.parse(Scratch.Cast.toString(args.DATA));
        if (!Array.isArray(data)) return;
      } catch {
        return;
      }
      chat.messages = data;
    }
    coverObject(args) {
      var base;
      var diff;
      // In terms of performance, using a for loop directly is better than Object.assign.
      try {
        base = JSON.parse(Scratch.Cast.toString(args.BASE));
        diff = JSON.parse(Scratch.Cast.toString(args.DIFF));
        for (var i in diff) {
          // In this situation, there's no need to worry about using Object.prototype.hasOwnProperty.call.
          base[i] = diff[i];
        }
      } catch {
        return "{}";
      }
      return JSON.stringify(base);
    }
    setObjectProp(args) {
      var obj;
      var prop;
      var value;
      try {
        obj = JSON.parse(Scratch.Cast.toString(args.OBJECT));
        prop = Scratch.Cast.toString(args.KEY);
        value = JSON.parse(Scratch.Cast.toString(args.VALUE));
        obj[prop] = value;
      } catch {
        return "{}";
      }
      return JSON.stringify(obj);
    }
    allKeysOfMap(args) {
      var MAP = Scratch.Cast.toString(args.MAP);
      switch (MAP) {
        case "chats":
          return JSON.stringify(Array.from(this.chats.keys()));
        case "aipresets":
          return JSON.stringify(Array.from(this.presets.keys()));
        default:
          return "[]";
      }
    }
    dataOfMap(args) {
      var ID = Scratch.Cast.toString(args.ID);
      var MAP = Scratch.Cast.toString(args.MAP);
      var currentMap;
      switch (MAP) {
        case "chats":
          currentMap = this.chats.get(ID);
          break;
        case "aipresets":
          currentMap = this.presets.get(ID);
          break;
        default:
          return "{}";
      }
      if (!currentMap) return "{}";
      return JSON.stringify(currentMap);
    }
    setDataOfMap(args) {
      var ID = Scratch.Cast.toString(args.ID);
      var MAP = Scratch.Cast.toString(args.MAP);
      var DATA = Scratch.Cast.toString(args.DATA);
      var currentMap;
      var parsedData;
      switch (MAP) {
        case "chats":
          currentMap = this.chats;
          break;
        case "aipresets":
          currentMap = this.presets;
          break;
        default:
          return;
      }
      try {
        parsedData = JSON.parse(DATA);
      } catch {
        return;
      }
      if (!(typeof parsedData === "object")) return;
      if (!Array.isArray(parsedData)) return;
      currentMap.set(ID, parsedData);
    }
    chatHistory(args) {
      var ID = Scratch.Cast.toString(args.ID);
      var chat = this.chats.get(ID);
      if (!chat) return "[]";
      return JSON.stringify(chat.messages);
    }
    propOfChatHistory(args) {
      var ID = Scratch.Cast.toString(args.ID);
      var INDEX = parseInt(Scratch.Cast.toNumber(args.INDEX));
      var PROP = Scratch.Cast.toString(args.PROP);
      var chat = this.chats.get(ID);
      if (!chat) return "";
      if (INDEX < 1 || INDEX > chat.messages.length) return "";
      var msg = chat.messages[INDEX - 1];
      return msg[PROP] || "";
    }
    lengthOfArray(args) {
      var ARRAY = Scratch.Cast.toString(args.ARRAY);
      var parsedArray;
      try {
        parsedArray = JSON.parse(ARRAY);
      } catch {
        parsedArray = [];
      }
      return parsedArray.length;
    }
    itemOfArray(args) {
      var INDEX = parseInt(Scratch.Cast.toNumber(args.INDEX));
      var ARRAY = Scratch.Cast.toString(args.ARRAY);
      var parsedArray;
      try {
        parsedArray = JSON.parse(ARRAY);
      } catch {
        parsedArray = [];
      }
      var item = parsedArray[INDEX - 1];
      if (typeof item === "undefined") return "";
      return item;
    }
    itemOfObject(args) {
      var KEY = Scratch.Cast.toString(args.KEY);
      var OBJECT = Scratch.Cast.toString(args.OBJECT);
      var parsedObject;
      try {
        parsedObject = JSON.parse(OBJECT);
      } catch {
        parsedObject = {};
      }
      var item = parsedObject[KEY];
      if (typeof item === "undefined") return "";
      return item;
    }
  }
  Scratch.extensions.register(new AI());
})(Scratch);
