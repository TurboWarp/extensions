(function (Scratch) {
  "use strict";

  class CerebrasStreamPro {
    constructor() {
      this.chatHistory = [];
      this.currentResponse = "";
      this.status = "Idle";
      this.systemPrompt = "You are a helpful assistant.";
    }

    getInfo() {
      return {
        id: "cerebrasStreamPro",
        name: "Cerebras AI (Real-time)",
        color1: "#0ea5e9", // Professional Blue
        color2: "#0284c7",
        blocks: [
          {
            opcode: "setSystem",
            blockType: Scratch.BlockType.COMMAND,
            text: "Setup System: [SYS]",
            arguments: {
              SYS: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "You are a helpful assistant.",
              },
            },
          },
          {
            opcode: "streamChat",
            blockType: Scratch.BlockType.COMMAND,
            text: "Ask Model [MODEL] Key [KEY]: [MSG]",
            arguments: {
              MODEL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "llama3.1-8b",
              },
              MSG: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Write a long story about a robot.",
              },
              KEY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "your-api-key",
              },
            },
          },
          {
            opcode: "getResponse",
            blockType: Scratch.BlockType.REPORTER,
            text: "Live Response",
          },
          {
            opcode: "isThinking",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is AI thinking?",
          },
          "--- History Management ---",
          {
            opcode: "getHistoryJSON",
            blockType: Scratch.BlockType.REPORTER,
            text: "Chat History (JSON)",
          },
          {
            opcode: "importHistory",
            blockType: Scratch.BlockType.COMMAND,
            text: "Import History [JSON]",
            arguments: {
              JSON: { type: Scratch.ArgumentType.STRING, defaultValue: "[]" },
            },
          },
          {
            opcode: "clearChat",
            blockType: Scratch.BlockType.COMMAND,
            text: "Clear All Memory",
          },
        ],
      };
    }

    setSystem(args) {
      this.systemPrompt = args.SYS;
    }

    async streamChat(args) {
      const { MODEL, KEY, MSG } = args;
      this.status = "Thinking";
      this.currentResponse = ""; // Reset for new stream

      this.chatHistory.push({ role: "user", content: MSG });

      const messages = [
        { role: "system", content: this.systemPrompt },
        ...this.chatHistory,
      ];

      try {
        const response = await Scratch.fetch(
          "https://api.cerebras.ai/v1/chat/completions",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              model: MODEL,
              messages: messages,
              stream: true, // CRITICAL: Enable streaming
            }),
          }
        );

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let fullAIResponse = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split("\n").filter((line) => line.trim() !== "");

          for (const line of lines) {
            const message = line.replace(/^data: /, "");
            if (message === "[DONE]") break;

            try {
              const parsed = JSON.parse(message);
              const delta = parsed.choices[0].delta.content;
              if (delta) {
                fullAIResponse += delta;
                this.currentResponse = fullAIResponse; // Update the reporter in real-time
              }
            } catch (e) {
              // Ignore partial JSON chunks
            }
          }
        }

        this.chatHistory.push({ role: "assistant", content: fullAIResponse });
        this.status = "Idle";
      } catch (err) {
        this.currentResponse = "Error: " + err.message;
        this.status = "Idle";
      }
    }

    getResponse() {
      return this.currentResponse;
    }
    isThinking() {
      return this.status === "Thinking";
    }
    getHistoryJSON() {
      return JSON.stringify(this.chatHistory);
    }
    clearChat() {
      this.chatHistory = [];
      this.currentResponse = "";
    }
    importHistory(args) {
      try {
        this.chatHistory = JSON.parse(args.JSON);
      } catch (e) {}
    }
  }

  Scratch.extensions.register(new CerebrasStreamPro());
})(Scratch);
