// Name: NGL anonymous message sender
// ID: ngl-link
// Description: Send anonymous messages over NGL with Q&A game options/random fake questions.
// By: matu6968 <https://scratch.mit.edu/users/mati6768/>
// License: MPL-2.0

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("NGL Link extension must run unsandboxed");
  }

  // Generate a UUID v4 device ID
  const generateDeviceId = () => {
    const hexChars = "0123456789abcdef";
    let uuid = "";

    for (let i = 0; i < 36; i++) {
      if (i === 8 || i === 13 || i === 18 || i === 23) {
        uuid += "-";
      } else if (i === 14) {
        uuid += "4"; // Version 4 UUID
      } else if (i === 19) {
        uuid += hexChars[(Math.random() * 4) | 8]; // Variant bits
      } else {
        uuid += hexChars[Math.floor(Math.random() * 16)];
      }
    }

    return uuid;
  };

  // Get or create device ID
  const getDeviceId = () => {
    // Force regenerate the device ID each time for testing
    const deviceId = generateDeviceId();
    window.localStorage.setItem("deviceId", deviceId);
    console.log("Generated deviceId:", deviceId); // Debug log
    return deviceId;
  };

  class NGLLink {
    constructor() {
      this.deviceId = getDeviceId();
      this.fakeQuestions = [];
      this.loadFakeQuestions("en"); // Load English questions by default
      // Store browser's user agent
      this.userAgent = navigator.userAgent;
    }

    // Helper function to normalize language codes
    normalizeLanguageCode(langCode) {
      if (!langCode) return "en"; // Default to English if no language code provided
      return langCode.toLowerCase().trim();
    }

    async loadFakeQuestions(langCode) {
      const normalizedLang = this.normalizeLanguageCode(langCode);
      try {
        const response = await Scratch.fetch(
          `https://cdn.simplelocalize.io/57157aec81d54cb6b2a43f8b34a61d47/_production/${normalizedLang}`
        );
        const data = await response.json();

        // Extract all FAKE_QUESTIONS entries
        this.fakeQuestions = Object.entries(data)
          .filter(([key, value]) => key.startsWith("FAKE_QUESTIONS."))
          .map(([_, value]) => value);

        console.log(
          `Loaded ${this.fakeQuestions.length} fake questions for language: ${normalizedLang}`
        );
      } catch (err) {
        console.error(
          `Failed to load fake questions for language ${normalizedLang}:`,
          err
        );
      }
    }

    getRandomQuestion() {
      if (this.fakeQuestions.length === 0) {
        return "No questions available";
      }
      return this.fakeQuestions[
        Math.floor(Math.random() * this.fakeQuestions.length)
      ];
    }

    getInfo() {
      return {
<<<<<<< HEAD
        id: 'ngllink',
        name: Scratch.translate('NGL Link'),
        color1: '#ff69b4', // Hot pink
        color2: '#ff1493', // Deep pink
        color3: '#c71585', // Medium violet red
=======
        id: "ngllink",
        name: "NGL Link",
        color1: "#ff69b4", // Hot pink
        color2: "#ff1493", // Deep pink
        color3: "#c71585", // Medium violet red
>>>>>>> f10d651a79db3137836b80cbc95f8f5d7f6ee98d
        blocks: [
          {
            opcode: "sendMessage",
            blockType: Scratch.BlockType.REPORTER,
<<<<<<< HEAD
            text: Scratch.translate('send message [MESSAGE] to [USERNAME] with game [GAME]'),
=======
            text: "send message [MESSAGE] to [USERNAME] with game [GAME]",
>>>>>>> f10d651a79db3137836b80cbc95f8f5d7f6ee98d
            arguments: {
              MESSAGE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Hello!",
              },
              USERNAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "username",
              },
              GAME: {
                type: Scratch.ArgumentType.STRING,
                menu: "GAME_MENU",
              },
            },
          },
          {
            opcode: "getRandomQuestion",
            blockType: Scratch.BlockType.REPORTER,
<<<<<<< HEAD
            text: Scratch.translate('get random question'),
            arguments: {}
=======
            text: "get random question",
            arguments: {},
>>>>>>> f10d651a79db3137836b80cbc95f8f5d7f6ee98d
          },
          {
            opcode: "setLanguage",
            blockType: Scratch.BlockType.COMMAND,
<<<<<<< HEAD
            text: Scratch.translate('set questions language to [LANG]'),
=======
            text: "set questions language to [LANG]",
>>>>>>> f10d651a79db3137836b80cbc95f8f5d7f6ee98d
            arguments: {
              LANG: {
                type: Scratch.ArgumentType.STRING,
                menu: "LANGUAGE_MENU",
              },
            },
          },
        ],
        menus: {
          GAME_MENU: {
            acceptReporters: true,
            items: [
              "none",
              "ask_me_anything",
              "never_have_i_ever",
              "confessions",
              "three_words",
            ],
          },
          LANGUAGE_MENU: {
            acceptReporters: true,
            items: [
              "en", // English
              "es", // Spanish
              "fr", // French
              "de", // German
              "it", // Italian
              "pt", // Portuguese
              "pl", // Polish
              "ru", // Russian
              "ja", // Japanese
              "ko", // Korean
              "zh", // Chinese
            ],
          },
        },
      };
    }

    async setLanguage(args) {
      await this.loadFakeQuestions(args.LANG);
    }

    async verifyDeviceId() {
      const data = new URLSearchParams();
      data.append("deviceId", this.deviceId);

      try {
<<<<<<< HEAD
        const properOrigin = 'https://ngl.link';
        
        const _response = await Scratch.fetch('https://ngl.link/api/fingerprint/web', {
          method: 'POST',
          headers: {
            'Accept': '*/*',
            'Accept-Language': 'en-US,en;q=0.9',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Origin': properOrigin,
            'Referer': properOrigin,
            'User-Agent': this.userAgent,
            'Sec-Fetch-Dest': 'empty',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Site': 'same-origin'
          },
          body: data.toString()
        });
        
=======
        const properOrigin = "https://ngl.link";

        const response = await Scratch.fetch(
          "https://ngl.link/api/fingerprint/web",
          {
            method: "POST",
            headers: {
              Accept: "*/*",
              "Accept-Language": "en-US,en;q=0.9",
              "Content-Type":
                "application/x-www-form-urlencoded; charset=UTF-8",
              Origin: properOrigin,
              Referer: properOrigin,
              "User-Agent": this.userAgent,
              // Remove X-Requested-With header as it's triggering CORS issues
              "Sec-Fetch-Dest": "empty",
              "Sec-Fetch-Mode": "cors",
              "Sec-Fetch-Site": "same-origin",
            },
            // mode: 'cors' is causing preflight checks, use default instead
            body: data.toString(),
          }
        );

>>>>>>> f10d651a79db3137836b80cbc95f8f5d7f6ee98d
        return true;
      } catch (err) {
        console.error("Failed to verify device ID:", err);
        return false;
      }
    }

    async sendMessage(args) {
      // First verify the device ID
      const isVerified = await this.verifyDeviceId();
      if (!isVerified) {
        return "Error: Failed to verify device ID";
      }

      // Create URL encoded string instead of FormData
      const data = new URLSearchParams();
      data.append("username", args.USERNAME);
      data.append("question", args.MESSAGE);
      data.append("deviceId", this.deviceId);

      // Only add gameSlug if it's not 'none' AND game modes are enabled
      if (args.GAME !== "none") {
        console.log(`Attempting to use game mode: ${args.GAME}`);
        data.append("gameSlug", args.GAME);
      }

      data.append("referrer", "");

      try {
        const properOrigin = "https://ngl.link";

        const response = await Scratch.fetch("https://ngl.link/api/submit", {
          method: "POST",
          headers: {
            Accept: "*/*",
            "Accept-Language": "en-US,en;q=0.9",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            Origin: properOrigin,
            Referer: `${properOrigin}/${args.USERNAME}`,
            "User-Agent": this.userAgent,
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin",
          },
          body: data.toString(),
        });

        console.log("Response status:", response.status);

        // Try to get response text if possible for better error reporting
        try {
          const responseText = await response.text();
          console.log("Response:", responseText);

          // If there is a 500 error and it is using game mode, try again without the game mode
          if (response.status === 500 && args.GAME !== "none") {
            console.log("Game mode caused error, retrying without game mode");
            return this.sendMessageWithoutGameMode(args);
          }
        } catch (e) {
          // Ignore error reading response
        }

        if (response.status >= 400) {
          return `Error: Server returned status ${response.status}`;
        }

        return "Message sent successfully!";
      } catch (err) {
        console.error("Failed to send message:", err);
        return "Error: " + err.message;
      }
    }

    // Fallback method that sends a message without game mode
    async sendMessageWithoutGameMode(args) {
      const data = new URLSearchParams();
      data.append("username", args.USERNAME);
      data.append("question", args.MESSAGE);
      data.append("deviceId", this.deviceId);
      data.append("referrer", "");

      try {
        const properOrigin = "https://ngl.link";

        const response = await Scratch.fetch("https://ngl.link/api/submit", {
          method: "POST",
          headers: {
            Accept: "*/*",
            "Accept-Language": "en-US,en;q=0.9",
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
            Origin: properOrigin,
            Referer: `${properOrigin}/${args.USERNAME}`,
            "User-Agent": this.userAgent,
            "Sec-Fetch-Dest": "empty",
            "Sec-Fetch-Mode": "cors",
            "Sec-Fetch-Site": "same-origin",
          },
          body: data.toString(),
        });

        if (response.status >= 400) {
          return `Error: Server returned status ${response.status}`;
        }

        return "Message sent successfully! (Game mode was ignored)";
      } catch (err) {
        console.error("Failed to send message without game mode:", err);
        return "Error: " + err.message;
      }
    }
  }

  Scratch.extensions.register(new NGLLink());
})(Scratch);
