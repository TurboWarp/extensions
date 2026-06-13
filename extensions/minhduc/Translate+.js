(function (Scratch) {
  "use strict";

  // Thiết lập hệ thống dịch thuật cho extension (tránh lỗi extension/should-translate)
  const formatMessage = (id, defaultMessage) =>
    Scratch.translate({
      id,
      default: defaultMessage,
      description: `Translate+ extension: ${id}`,
    });

  class TranslatePlus {
    getInfo() {
      return {
        id: "translatePlus",
        // Bọc tên extension vào formatMessage
        name: formatMessage("name", "Translate+"),
        color1: "#4C97FF",
        color2: "#3373CC",
        blocks: [
          {
            opcode: "getTranslation",
            blockType: Scratch.BlockType.REPORTER,
            // Bọc văn bản trên block vào formatMessage
            text: formatMessage(
              "blockText",
              "translate [TEXT] using [SERVICE] to [LANG]"
            ),
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Hello",
              },
              SERVICE: {
                type: Scratch.ArgumentType.STRING,
                menu: "services",
                defaultValue: "Google",
              },
              LANG: {
                type: Scratch.ArgumentType.STRING,
                menu: "languages",
                defaultValue: "Vietnamese",
              },
            },
          },
        ],
        menus: {
          services: {
            acceptReporters: true,
            items: ["Google", "Bing", "Reverso", "Alibaba"],
          },
          languages: {
            acceptReporters: true,
            items: [
              "Vietnamese",
              "English",
              "Chinese (Simplified)",
              "Chinese (Traditional)",
              "Japanese",
              "Korean",
              "French",
              "German",
              "Russian",
              "Spanish",
              "Portuguese",
              "Italian",
              "Thai",
              "Lao",
              "Khmer",
              "Indonesian",
              "Malay",
              "Arabic",
              "Hindi",
              "Turkish",
              "Dutch",
              "Polish",
              "Swedish",
              "Danish",
              "Finnish",
              "Norwegian",
              "Greek",
              "Hebrew",
              "Bengali",
              "Persian",
              "Urdu",
              "Filipino",
              "Romanian",
              "Hungarian",
              "Czech",
              "Ukrainian",
              "Burmese",
              "Swahili",
              "Amharic",
              "Telugu",
              "Tamil",
              "Marathi",
              "Gujarati",
              "Kannada",
              "Malayalam",
              "Punjabi",
              "Slovak",
              "Bulgarian",
              "Croatian",
              "Serbian",
              "Lithuanian",
              "Latvian",
              "Estonian",
              "Slovenian",
              "Icelandic",
            ],
          },
        },
      };
    }

    async getTranslation(args) {
      const textInput = args.TEXT;
      const serviceInput = args.SERVICE;
      const langInput = args.LANG;

      const baseUrl =
        "https://tuhbooh-translator.hf.space/gradio_api/call/translate";

      const langMap = {
        Vietnamese: "Tiếng Việt",
        English: "Tiếng Anh",
        "Chinese (Simplified)": "Tiếng Trung (Giản)",
        "Chinese (Traditional)": "Tiếng Trung (Phồn)",
        Japanese: "Tiếng Nhật",
        Korean: "Tiếng Hàn",
        French: "Tiếng Pháp",
        German: "Tiếng Đức",
        Russian: "Tiếng Nga",
        Spanish: "Tiếng Tây Ban Nha",
        Portuguese: "Tiếng Bồ Đào Nha",
        Italian: "Tiếng Ý",
        Thai: "Tiếng Thái",
        Lao: "Tiếng Lào",
        Khmer: "Tiếng Khơ-me",
        Indonesian: "Tiếng Indonesia",
        Malay: "Tiếng Mã Lai",
        Arabic: "Tiếng Ả Rập",
        Hindi: "Tiếng Ấn Độ (Hindi)",
        Turkish: "Tiếng Thổ Nhĩ Kỳ",
        Dutch: "Tiếng Hà Lan",
        Polish: "Tiếng Ba Lan",
        Swedish: "Tiếng Thụy Điển",
        Danish: "Tiếng Đan Mạch",
        Finnish: "Tiếng Phần Lan",
        Norwegian: "Tiếng Na Uy",
        Greek: "Tiếng Hy Lạp",
        Hebrew: "Tiếng Do Thái",
        Bengali: "Tiếng Bengali",
        Persian: "Tiếng Ba Tư",
        Urdu: "Tiếng Urdu",
        Filipino: "Tiếng Philippines",
        Romanian: "Tiếng Rumani",
        Hungarian: "Tiếng Hungari",
        Czech: "Tiếng Séc",
        Ukrainian: "Tiếng Ukraina",
        Burmese: "Tiếng Miến Điện",
        Swahili: "Tiếng Swahili",
        Amharic: "Tiếng Amharic",
        Telugu: "Tiếng Telugu",
        Tamil: "Tiếng Tamil",
        Marathi: "Tiếng Marathi",
        Gujarati: "Tiếng Gujarati",
        Kannada: "Tiếng Kannada",
        Malayalam: "Tiếng Malayalam",
        Punjabi: "Tiếng Punjab",
        Slovak: "Tiếng Slovak",
        Bulgarian: "Tiếng Bulgaria",
        Croatian: "Tiếng Croatia",
        Serbian: "Tiếng Serbia",
        Lithuanian: "Tiếng Litva",
        Latvian: "Tiếng Latvia",
        Estonian: "Tiếng Estonia",
        Slovenian: "Tiếng Slovenia",
        Icelandic: "Tiếng Iceland",
      };

      const backendLangName = langMap[langInput] || langInput;

      try {
        // Sử dụng Scratch.fetch() thay vì fetch() (tránh lỗi extension/use-scratch-fetch)
        const callResponse = await Scratch.fetch(baseUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            data: [textInput, serviceInput, backendLangName],
          }),
        });

        if (!callResponse.ok) return "Error " + callResponse.status;

        const { event_id } = await callResponse.json();

        // Sử dụng Scratch.fetch()
        const resultResponse = await Scratch.fetch(`${baseUrl}/${event_id}`);

        if (!resultResponse.ok) return "Result Error";

        const rawResult = await resultResponse.text();

        const dataLines = rawResult.split("\n");
        for (const line of dataLines) {
          if (line.startsWith("data:")) {
            const dataContent = line.replace("data:", "").trim();
            try {
              const dataArray = JSON.parse(dataContent);
              if (Array.isArray(dataArray) && dataArray.length > 0) {
                return dataArray[0];
              }
            } catch (e) {
              continue;
            }
          }
        }

        return "Translation failed";
      } catch (e) {
        console.error("Translate+ Error:", e);
        return "Connect Failed";
      }
    }
  }

  Scratch.extensions.register(new TranslatePlus());
})(Scratch);
