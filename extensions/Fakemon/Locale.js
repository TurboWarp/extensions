// Name: Locale
// ID: fakemonLocale
// Description: Blocks for manually registering translations of text.
// By: Scratch_Fakemon <https://scratch.mit.edu/users/Scratch_Fakemon/>
// License: MPL-2.0

/* Note for contributors:
When updating this extension's block info, make sure to also update the documentation (/docs/Fakemon/Locale.md).
This is most important for adding new blocks, but should also be done for changing block text to avoid confusion.
*/

(async function (Scratch) {
  // Has to be async for fetching the lookup table
  "use strict";
  let languageNameAndCodeLookupTableGLOBALIZED;
  const backupTable = {
    // Backup of the lookup table
    menuMap: {
      am: [
        {
          code: "hu",
          name: "ሀንጋሪኛ",
        },
        {
          code: "lt",
          name: "ሊትዌንኛ",
        },
        {
          code: "lv",
          name: "ላትቪያኛ",
        },
        {
          code: "mi",
          name: "ማዮሪኛ",
        },
        {
          code: "ru",
          name: "ራሽያኛ",
        },
        {
          code: "ro",
          name: "ሮማኒያንኛ",
        },
        {
          code: "sr",
          name: "ሰርቢያኛ",
        },
        {
          code: "sk",
          name: "ስሎቫክኛ",
        },
        {
          code: "sl",
          name: "ስሎቬንያኛ",
        },
        {
          code: "sv",
          name: "ስዊድንኛ",
        },
        {
          code: "es",
          name: "ስፓኒሽኛ",
        },
        {
          code: "bg",
          name: "ቡልጋሪያኛ",
        },
        {
          code: "eu",
          name: "ባስክኛ",
        },
        {
          code: "vi",
          name: "ቪትናምኛ",
        },
        {
          code: "tr",
          name: "ቱርክኛ",
        },
        {
          code: "th",
          name: "ታይኛ",
        },
        {
          code: "zh-cn",
          name: "ቻይንኛ (ቀላሉ)",
        },
        {
          code: "zh-tw",
          name: "ቻይንኛ (ባሕላዊው)",
        },
        {
          code: "cs",
          name: "ቼክኛ",
        },
        {
          code: "nb",
          name: "ኖርዌጅያንኛ",
        },
        {
          code: "am",
          name: "አማርኛ",
        },
        {
          code: "az",
          name: "አዜርባይጃንኛ",
        },
        {
          code: "ga",
          name: "አይሪሽ",
        },
        {
          code: "is",
          name: "አይስላንድኛ",
        },
        {
          code: "et",
          name: "ኤስቶኒያኛ",
        },
        {
          code: "id",
          name: "እንዶኔዢያኛ",
        },
        {
          code: "en",
          name: "እንግሊዝኛ",
        },
        {
          code: "ckb",
          name: "ኩርድሽኛ (ሶራኒ)",
        },
        {
          code: "ca",
          name: "ካታላንኛ",
        },
        {
          code: "hr",
          name: "ክሮኤሽያኛ",
        },
        {
          code: "ko",
          name: "ኮሪያኛ",
        },
        {
          code: "cy",
          name: "ዌልሽ",
        },
        {
          code: "ar",
          name: "ዐረብኛ",
        },
        {
          code: "he",
          name: "ዕብራይስጥ",
        },
        {
          code: "zu",
          name: "ዙሉኛ",
        },
        {
          code: "gd",
          name: "የስኮት ጌልክኛ",
        },
        {
          code: "uk",
          name: "ዩክሬንኛ",
        },
        {
          code: "nl",
          name: "ደችኛ",
        },
        {
          code: "da",
          name: "ዴንሽኛ",
        },
        {
          code: "de",
          name: "ጀርመንኛ",
        },
        {
          code: "ja",
          name: "ጃፓንኛ",
        },
        {
          code: "gl",
          name: "ጋሊሺያኛ",
        },
        {
          code: "el",
          name: "ግሪክኛ",
        },
        {
          code: "it",
          name: "ጣሊያንኛ",
        },
        {
          code: "fr",
          name: "ፈረንሳይኛ",
        },
        {
          code: "fi",
          name: "ፊኒሽኛ",
        },
        {
          code: "fa",
          name: "ፐርሺያኛ",
        },
        {
          code: "pl",
          name: "ፖሊሽኛ",
        },
        {
          code: "pt",
          name: "ፖርቱጋሊኛ",
        },
        {
          code: "he",
          name: "ዕብራይስጥ",
        },
        {
          code: "zh-cn",
          name: "ቻይንኛ (ቀላሉ)",
        },
      ],
      ar: [
        {
          code: "is",
          name: "الآيسلندية",
        },
        {
          code: "az",
          name: "الأذرية",
        },
        {
          code: "es",
          name: "الإسبانية",
        },
        {
          code: "et",
          name: "الإستونية",
        },
        {
          code: "de",
          name: "الألمانية",
        },
        {
          code: "am",
          name: "الأمهرية",
        },
        {
          code: "en",
          name: "الإنجليزية",
        },
        {
          code: "id",
          name: "الإندونيسية",
        },
        {
          code: "uk",
          name: "الأوكرانية",
        },
        {
          code: "ga",
          name: "الأيرلندية",
        },
        {
          code: "it",
          name: "الإيطالية",
        },
        {
          code: "eu",
          name: "الباسكية",
        },
        {
          code: "pt",
          name: "البرتغالية",
        },
        {
          code: "bg",
          name: "البلغارية",
        },
        {
          code: "pl",
          name: "البولندية",
        },
        {
          code: "th",
          name: "التايلاندية",
        },
        {
          code: "tr",
          name: "التركية",
        },
        {
          code: "cs",
          name: "التشيكية",
        },
        {
          code: "gl",
          name: "الجاليكية",
        },
        {
          code: "da",
          name: "الدانمركية",
        },
        {
          code: "ru",
          name: "الروسية",
        },
        {
          code: "ro",
          name: "الرومانية",
        },
        {
          code: "zu",
          name: "الزولو",
        },
        {
          code: "sk",
          name: "السلوفاكية",
        },
        {
          code: "sl",
          name: "السلوفينية",
        },
        {
          code: "sv",
          name: "السويدية",
        },
        {
          code: "sr",
          name: "الصربية",
        },
        {
          code: "zh-tw",
          name: "الصينية (التقليدية)",
        },
        {
          code: "zh-cn",
          name: "الصينية (المبسطة)",
        },
        {
          code: "he",
          name: "العبرية",
        },
        {
          code: "ar",
          name: "العربية",
        },
        {
          code: "gd",
          name: "الغيلية الأسكتلندية",
        },
        {
          code: "fa",
          name: "الفارسية",
        },
        {
          code: "fr",
          name: "الفرنسية",
        },
        {
          code: "fi",
          name: "الفنلندية",
        },
        {
          code: "vi",
          name: "الفيتنامية",
        },
        {
          code: "ca",
          name: "القطلونية",
        },
        {
          code: "ckb",
          name: "الكردية (السورانية)",
        },
        {
          code: "hr",
          name: "الكرواتية",
        },
        {
          code: "ko",
          name: "الكورية",
        },
        {
          code: "lv",
          name: "اللاتفية",
        },
        {
          code: "lt",
          name: "الليتوانية",
        },
        {
          code: "mi",
          name: "الماورية",
        },
        {
          code: "nb",
          name: "النرويجية",
        },
        {
          code: "hu",
          name: "الهنغارية",
        },
        {
          code: "nl",
          name: "الهولندية",
        },
        {
          code: "cy",
          name: "الويلزية",
        },
        {
          code: "ja",
          name: "اليابانية",
        },
        {
          code: "el",
          name: "اليونانية",
        },
        {
          code: "he",
          name: "العبرية",
        },
        {
          code: "zh-cn",
          name: "الصينية (المبسطة)",
        },
      ],
      az: [
        {
          code: "de",
          name: "Alman",
        },
        {
          code: "am",
          name: "Amarik",
        },
        {
          code: "az",
          name: "Azərbaycan",
        },
        {
          code: "eu",
          name: "Bask",
        },
        {
          code: "bg",
          name: "Bolqar",
        },
        {
          code: "cs",
          name: "Çex",
        },
        {
          code: "zh-tw",
          name: "Çin (Ənənəvi)",
        },
        {
          code: "zh-cn",
          name: "Çin (Sadələşdirilmiş)",
        },
        {
          code: "da",
          name: "Danimarka",
        },
        {
          code: "et",
          name: "Eston",
        },
        {
          code: "ar",
          name: "Ərəb",
        },
        {
          code: "fa",
          name: "Fars",
        },
        {
          code: "fi",
          name: "Fin",
        },
        {
          code: "fr",
          name: "Fransız",
        },
        {
          code: "nl",
          name: "Holland",
        },
        {
          code: "hr",
          name: "Xorvat",
        },
        {
          code: "en",
          name: "Ingilis",
        },
        {
          code: "es",
          name: "Ispan",
        },
        {
          code: "id",
          name: "İndoneziya",
        },
        {
          code: "ga",
          name: "İrland",
        },
        {
          code: "is",
          name: "İsland",
        },
        {
          code: "sv",
          name: "İsveç",
        },
        {
          code: "it",
          name: "İtalyan",
        },
        {
          code: "he",
          name: "İvrit",
        },
        {
          code: "ca",
          name: "Katalan",
        },
        {
          code: "ko",
          name: "Koreya",
        },
        {
          code: "ckb",
          name: "Kürd(Sorani)",
        },
        {
          code: "gl",
          name: "Qalisian",
        },
        {
          code: "lv",
          name: "Latış",
        },
        {
          code: "lt",
          name: "Litva",
        },
        {
          code: "hu",
          name: "Macar",
        },
        {
          code: "mi",
          name: "Maori",
        },
        {
          code: "nb",
          name: "Norveç",
        },
        {
          code: "pl",
          name: "Polyak",
        },
        {
          code: "pt",
          name: "Portuqal",
        },
        {
          code: "ro",
          name: "Rumın",
        },
        {
          code: "ru",
          name: "Rus",
        },
        {
          code: "sr",
          name: "Serb",
        },
        {
          code: "sk",
          name: "Slovak",
        },
        {
          code: "sl",
          name: "Sloven",
        },
        {
          code: "gd",
          name: "Şotland (Kelt)",
        },
        {
          code: "th",
          name: "Tay",
        },
        {
          code: "tr",
          name: "Türk",
        },
        {
          code: "cy",
          name: "Uels",
        },
        {
          code: "uk",
          name: "Ukrayna",
        },
        {
          code: "vi",
          name: "Vyetnam",
        },
        {
          code: "ja",
          name: "Yapon",
        },
        {
          code: "el",
          name: "Yunan",
        },
        {
          code: "zu",
          name: "Zulu",
        },
        {
          code: "he",
          name: "İvrit",
        },
        {
          code: "zh-cn",
          name: "Çin (Sadələşdirilmiş)",
        },
      ],
      bg: [
        {
          code: "az",
          name: "азербайджански",
        },
        {
          code: "am",
          name: "амхарски",
        },
        {
          code: "en",
          name: "английски",
        },
        {
          code: "ar",
          name: "арабски",
        },
        {
          code: "eu",
          name: "баски",
        },
        {
          code: "bg",
          name: "български",
        },
        {
          code: "vi",
          name: "виетнамски",
        },
        {
          code: "gl",
          name: "галисийски",
        },
        {
          code: "el",
          name: "гръцки",
        },
        {
          code: "da",
          name: "датски",
        },
        {
          code: "et",
          name: "естонски",
        },
        {
          code: "zu",
          name: "зулу",
        },
        {
          code: "he",
          name: "иврит",
        },
        {
          code: "id",
          name: "индонезийски",
        },
        {
          code: "ga",
          name: "ирландски",
        },
        {
          code: "is",
          name: "исландски",
        },
        {
          code: "es",
          name: "испански",
        },
        {
          code: "it",
          name: "италиански",
        },
        {
          code: "ca",
          name: "каталонски",
        },
        {
          code: "zh-cn",
          name: "китайски (опростен)",
        },
        {
          code: "zh-tw",
          name: "китайски (традиционен)",
        },
        {
          code: "ko",
          name: "корейски",
        },
        {
          code: "ckb",
          name: "кюрдски (сорани)",
        },
        {
          code: "lv",
          name: "латвийски",
        },
        {
          code: "lt",
          name: "литовски",
        },
        {
          code: "mi",
          name: "маорски",
        },
        {
          code: "de",
          name: "немски",
        },
        {
          code: "nl",
          name: "нидерландски",
        },
        {
          code: "nb",
          name: "норвежки",
        },
        {
          code: "fa",
          name: "персийски",
        },
        {
          code: "pl",
          name: "полски",
        },
        {
          code: "pt",
          name: "португалски",
        },
        {
          code: "ro",
          name: "румънски",
        },
        {
          code: "ru",
          name: "руски",
        },
        {
          code: "sk",
          name: "словашки",
        },
        {
          code: "sl",
          name: "словенски",
        },
        {
          code: "sr",
          name: "сръбски",
        },
        {
          code: "th",
          name: "тайландски",
        },
        {
          code: "tr",
          name: "турски",
        },
        {
          code: "cy",
          name: "уелски",
        },
        {
          code: "uk",
          name: "украински",
        },
        {
          code: "hu",
          name: "унгарски",
        },
        {
          code: "fi",
          name: "финландски",
        },
        {
          code: "fr",
          name: "френски",
        },
        {
          code: "hr",
          name: "хърватски",
        },
        {
          code: "cs",
          name: "чешки",
        },
        {
          code: "sv",
          name: "шведски",
        },
        {
          code: "gd",
          name: "шотландски келтски",
        },
        {
          code: "ja",
          name: "японски",
        },
        {
          code: "he",
          name: "иврит",
        },
        {
          code: "zh-cn",
          name: "китайски (опростен)",
        },
      ],
      ca: [
        {
          code: "de",
          name: "alemany",
        },
        {
          code: "am",
          name: "amhàric",
        },
        {
          code: "en",
          name: "anglès",
        },
        {
          code: "ar",
          name: "àrab",
        },
        {
          code: "az",
          name: "àzeri",
        },
        {
          code: "eu",
          name: "basc",
        },
        {
          code: "bg",
          name: "búlgar",
        },
        {
          code: "es",
          name: "castellà",
        },
        {
          code: "ca",
          name: "català",
        },
        {
          code: "ko",
          name: "coreà",
        },
        {
          code: "hr",
          name: "croat",
        },
        {
          code: "da",
          name: "danès",
        },
        {
          code: "sk",
          name: "eslovac",
        },
        {
          code: "sl",
          name: "eslovè",
        },
        {
          code: "et",
          name: "estonià",
        },
        {
          code: "fi",
          name: "finès",
        },
        {
          code: "fr",
          name: "francès",
        },
        {
          code: "gd",
          name: "gaèlic escocès",
        },
        {
          code: "gl",
          name: "gallec",
        },
        {
          code: "cy",
          name: "gal·lès",
        },
        {
          code: "el",
          name: "grec",
        },
        {
          code: "he",
          name: "hebreu",
        },
        {
          code: "hu",
          name: "hongarès",
        },
        {
          code: "id",
          name: "indonesi",
        },
        {
          code: "ga",
          name: "irlandès",
        },
        {
          code: "is",
          name: "islandès",
        },
        {
          code: "it",
          name: "italià",
        },
        {
          code: "ja",
          name: "japonès",
        },
        {
          code: "ckb",
          name: "kurd (sorani)",
        },
        {
          code: "lv",
          name: "letó",
        },
        {
          code: "lt",
          name: "lituà",
        },
        {
          code: "mi",
          name: "maori",
        },
        {
          code: "nl",
          name: "neerlandès",
        },
        {
          code: "nb",
          name: "noruec",
        },
        {
          code: "fa",
          name: "persa",
        },
        {
          code: "pl",
          name: "polonès",
        },
        {
          code: "pt",
          name: "portuguès",
        },
        {
          code: "ro",
          name: "romanès",
        },
        {
          code: "ru",
          name: "rus",
        },
        {
          code: "sr",
          name: "serbi",
        },
        {
          code: "sv",
          name: "suec",
        },
        {
          code: "th",
          name: "tai",
        },
        {
          code: "tr",
          name: "turc",
        },
        {
          code: "cs",
          name: "txec",
        },
        {
          code: "uk",
          name: "ucraïnès",
        },
        {
          code: "vi",
          name: "vietnamita",
        },
        {
          code: "zh-cn",
          name: "xinès (simplificat)",
        },
        {
          code: "zh-tw",
          name: "xinès (tradicional)",
        },
        {
          code: "zu",
          name: "zulú",
        },
        {
          code: "he",
          name: "hebreu",
        },
        {
          code: "zh-cn",
          name: "xinès (simplificat)",
        },
      ],
      cs: [
        {
          code: "am",
          name: "amharština",
        },
        {
          code: "en",
          name: "angličtina",
        },
        {
          code: "ar",
          name: "arabština",
        },
        {
          code: "az",
          name: "ázerbájdžánština",
        },
        {
          code: "eu",
          name: "baskičtina",
        },
        {
          code: "bg",
          name: "bulharština",
        },
        {
          code: "cs",
          name: "čeština",
        },
        {
          code: "zh-tw",
          name: "čínština (tradiční)",
        },
        {
          code: "zh-cn",
          name: "čínština (zjednodušená)",
        },
        {
          code: "da",
          name: "dánština",
        },
        {
          code: "et",
          name: "estonština",
        },
        {
          code: "fi",
          name: "finština",
        },
        {
          code: "fr",
          name: "francouzština",
        },
        {
          code: "gl",
          name: "galicijština",
        },
        {
          code: "he",
          name: "hebrejština",
        },
        {
          code: "nl",
          name: "holandština",
        },
        {
          code: "hr",
          name: "chorvatština",
        },
        {
          code: "id",
          name: "indonéština",
        },
        {
          code: "ga",
          name: "irština",
        },
        {
          code: "is",
          name: "islandština",
        },
        {
          code: "it",
          name: "italština",
        },
        {
          code: "ja",
          name: "japonština",
        },
        {
          code: "ca",
          name: "katalánština",
        },
        {
          code: "ko",
          name: "korejština",
        },
        {
          code: "ckb",
          name: "kurdština (sorání)",
        },
        {
          code: "lt",
          name: "litevština",
        },
        {
          code: "lv",
          name: "lotyština",
        },
        {
          code: "hu",
          name: "maďarština",
        },
        {
          code: "mi",
          name: "maorština",
        },
        {
          code: "de",
          name: "němčina",
        },
        {
          code: "nb",
          name: "norština",
        },
        {
          code: "fa",
          name: "perština",
        },
        {
          code: "pl",
          name: "polština",
        },
        {
          code: "pt",
          name: "portugalština",
        },
        {
          code: "ro",
          name: "rumunština",
        },
        {
          code: "ru",
          name: "ruština",
        },
        {
          code: "el",
          name: "řečtina",
        },
        {
          code: "gd",
          name: "skotská gaelština",
        },
        {
          code: "sk",
          name: "slovenština",
        },
        {
          code: "sl",
          name: "slovinština",
        },
        {
          code: "sr",
          name: "srbština",
        },
        {
          code: "es",
          name: "španělština",
        },
        {
          code: "sv",
          name: "švédština",
        },
        {
          code: "th",
          name: "thajština",
        },
        {
          code: "tr",
          name: "turečtina",
        },
        {
          code: "uk",
          name: "ukrajinština",
        },
        {
          code: "cy",
          name: "velština",
        },
        {
          code: "vi",
          name: "vietnamština",
        },
        {
          code: "zu",
          name: "zulu",
        },
        {
          code: "he",
          name: "hebrejština",
        },
        {
          code: "zh-cn",
          name: "čínština (zjednodušená)",
        },
      ],
      cy: [
        {
          code: "de",
          name: "Almaeneg",
        },
        {
          code: "am",
          name: "Amhareg",
        },
        {
          code: "ar",
          name: "Arabeg",
        },
        {
          code: "az",
          name: "Aserbaijaneg",
        },
        {
          code: "eu",
          name: "Basgeg",
        },
        {
          code: "bg",
          name: "Bwlgareg",
        },
        {
          code: "ca",
          name: "Catalaneg",
        },
        {
          code: "hr",
          name: "Croateg",
        },
        {
          code: "ckb",
          name: "Cwrdeg (Sorani)",
        },
        {
          code: "cy",
          name: "Cymraeg",
        },
        {
          code: "da",
          name: "Daneg",
        },
        {
          code: "it",
          name: "Eidaleg",
        },
        {
          code: "et",
          name: "Estoneg",
        },
        {
          code: "vi",
          name: "Fietnameg",
        },
        {
          code: "fi",
          name: "Ffineg",
        },
        {
          code: "nl",
          name: "Fflemeg",
        },
        {
          code: "fr",
          name: "Ffrangeg",
        },
        {
          code: "gd",
          name: "Gaeleg yr Alban",
        },
        {
          code: "gl",
          name: "Galiseg",
        },
        {
          code: "el",
          name: "Groeg",
        },
        {
          code: "ga",
          name: "Gwyddeleg",
        },
        {
          code: "he",
          name: "Hebraeg",
        },
        {
          code: "hu",
          name: "Hwngareg",
        },
        {
          code: "ko",
          name: "Iaith Corea",
        },
        {
          code: "id",
          name: "Indonesieg",
        },
        {
          code: "is",
          name: "Islandeg",
        },
        {
          code: "ja",
          name: "Japaneg",
        },
        {
          code: "lv",
          name: "Latfieg",
        },
        {
          code: "lt",
          name: "Lithwaneg",
        },
        {
          code: "mi",
          name: "Maori",
        },
        {
          code: "nb",
          name: "Norwyeg",
        },
        {
          code: "fa",
          name: "Perseg",
        },
        {
          code: "pt",
          name: "Portiwgaleg",
        },
        {
          code: "pl",
          name: "Pwyleg",
        },
        {
          code: "ro",
          name: "Rwmaneg",
        },
        {
          code: "ru",
          name: "Rwsieg",
        },
        {
          code: "en",
          name: "Saesneg",
        },
        {
          code: "es",
          name: "Sbaeneg",
        },
        {
          code: "sr",
          name: "Serbeg",
        },
        {
          code: "sk",
          name: "Slofaceg",
        },
        {
          code: "sl",
          name: "Slofeneg",
        },
        {
          code: "sv",
          name: "Swedeg",
        },
        {
          code: "zu",
          name: "Swlw",
        },
        {
          code: "th",
          name: "Tai",
        },
        {
          code: "cs",
          name: "Tsieceg",
        },
        {
          code: "zh-tw",
          name: "Tsieineeg (Traddodiadol)",
        },
        {
          code: "zh-cn",
          name: "Tsieineeg (Wedi symleiddio)",
        },
        {
          code: "tr",
          name: "Twrceg",
        },
        {
          code: "uk",
          name: "Wcreineg",
        },
        {
          code: "he",
          name: "Hebraeg",
        },
        {
          code: "zh-cn",
          name: "Tsieineeg (Wedi symleiddio)",
        },
      ],
      da: [
        {
          code: "am",
          name: "Amharisk",
        },
        {
          code: "ar",
          name: "Arabisk",
        },
        {
          code: "az",
          name: "Aserbajdsjansk",
        },
        {
          code: "eu",
          name: "Baskisk",
        },
        {
          code: "bg",
          name: "Bulgarsk",
        },
        {
          code: "da",
          name: "Dansk",
        },
        {
          code: "en",
          name: "Engelsk",
        },
        {
          code: "et",
          name: "Estisk",
        },
        {
          code: "fi",
          name: "Finsk",
        },
        {
          code: "fr",
          name: "Fransk",
        },
        {
          code: "gl",
          name: "Galicisk",
        },
        {
          code: "el",
          name: "Græsk",
        },
        {
          code: "he",
          name: "Hebraisk",
        },
        {
          code: "id",
          name: "Indonesisk",
        },
        {
          code: "ga",
          name: "Irsk",
        },
        {
          code: "is",
          name: "Islandsk",
        },
        {
          code: "it",
          name: "Italiensk",
        },
        {
          code: "ja",
          name: "Japansk",
        },
        {
          code: "ca",
          name: "Katalansk",
        },
        {
          code: "zh-cn",
          name: "Kinesisk (forenklet)",
        },
        {
          code: "zh-tw",
          name: "Kinesisk (traditionelt)",
        },
        {
          code: "ko",
          name: "Koreansk",
        },
        {
          code: "hr",
          name: "Kroatisk",
        },
        {
          code: "ckb",
          name: "Kurdisk (sorani)",
        },
        {
          code: "lv",
          name: "Lettisk",
        },
        {
          code: "lt",
          name: "Litauisk",
        },
        {
          code: "mi",
          name: "Maori",
        },
        {
          code: "nl",
          name: "Nederlandsk",
        },
        {
          code: "nb",
          name: "Norsk",
        },
        {
          code: "fa",
          name: "Persisk",
        },
        {
          code: "pl",
          name: "Polsk",
        },
        {
          code: "pt",
          name: "Portugisisk",
        },
        {
          code: "ro",
          name: "Rumænsk",
        },
        {
          code: "ru",
          name: "Russisk",
        },
        {
          code: "sr",
          name: "Serbisk",
        },
        {
          code: "gd",
          name: "Skotsk gælisk",
        },
        {
          code: "sk",
          name: "Slovakisk",
        },
        {
          code: "sl",
          name: "Slovensk",
        },
        {
          code: "es",
          name: "Spansk",
        },
        {
          code: "sv",
          name: "Svensk",
        },
        {
          code: "th",
          name: "Thailandsk",
        },
        {
          code: "cs",
          name: "Tjekkisk",
        },
        {
          code: "tr",
          name: "Tyrkisk",
        },
        {
          code: "de",
          name: "Tysk",
        },
        {
          code: "uk",
          name: "Ukrainsk",
        },
        {
          code: "hu",
          name: "Ungarsk",
        },
        {
          code: "vi",
          name: "Vietnamesisk",
        },
        {
          code: "cy",
          name: "Walisisk",
        },
        {
          code: "zu",
          name: "Zulu",
        },
        {
          code: "he",
          name: "Hebraisk",
        },
        {
          code: "zh-cn",
          name: "Kinesisk (forenklet)",
        },
      ],
      de: [
        {
          code: "am",
          name: "Amharisch",
        },
        {
          code: "ar",
          name: "Arabisch",
        },
        {
          code: "az",
          name: "Aserbaidschanisch",
        },
        {
          code: "eu",
          name: "Baskisch",
        },
        {
          code: "bg",
          name: "Bulgarisch",
        },
        {
          code: "zh-tw",
          name: "Chinesisch (traditionell)",
        },
        {
          code: "zh-cn",
          name: "Chinesisch (vereinfacht)",
        },
        {
          code: "da",
          name: "Dänisch",
        },
        {
          code: "de",
          name: "Deutsch",
        },
        {
          code: "en",
          name: "Englisch",
        },
        {
          code: "et",
          name: "Estnisch",
        },
        {
          code: "fi",
          name: "Finnisch",
        },
        {
          code: "fr",
          name: "Französisch",
        },
        {
          code: "gl",
          name: "Galizisch",
        },
        {
          code: "el",
          name: "Griechisch",
        },
        {
          code: "he",
          name: "Hebräisch",
        },
        {
          code: "id",
          name: "Indonesisch",
        },
        {
          code: "ga",
          name: "Irisch",
        },
        {
          code: "is",
          name: "Isländisch",
        },
        {
          code: "it",
          name: "Italienisch",
        },
        {
          code: "ja",
          name: "Japanisch",
        },
        {
          code: "ca",
          name: "Katalanisch",
        },
        {
          code: "ko",
          name: "Koreanisch",
        },
        {
          code: "hr",
          name: "Kroatisch",
        },
        {
          code: "ckb",
          name: "Kurdisch (Sorani)",
        },
        {
          code: "lv",
          name: "Lettisch",
        },
        {
          code: "lt",
          name: "Litauisch",
        },
        {
          code: "mi",
          name: "Maori",
        },
        {
          code: "nl",
          name: "Niederländisch",
        },
        {
          code: "nb",
          name: "Norwegisch",
        },
        {
          code: "fa",
          name: "Persisch",
        },
        {
          code: "pl",
          name: "Polnisch",
        },
        {
          code: "pt",
          name: "Portugiesisch",
        },
        {
          code: "ro",
          name: "Rumänisch",
        },
        {
          code: "ru",
          name: "Russisch",
        },
        {
          code: "gd",
          name: "Schottisch-Gälisch",
        },
        {
          code: "sv",
          name: "Schwedisch",
        },
        {
          code: "sr",
          name: "Serbisch",
        },
        {
          code: "sk",
          name: "Slowakisch",
        },
        {
          code: "sl",
          name: "Slowenisch",
        },
        {
          code: "es",
          name: "Spanisch",
        },
        {
          code: "th",
          name: "Thailändisch",
        },
        {
          code: "cs",
          name: "Tschechisch",
        },
        {
          code: "tr",
          name: "Türkisch",
        },
        {
          code: "uk",
          name: "Ukrainisch",
        },
        {
          code: "hu",
          name: "Ungarisch",
        },
        {
          code: "vi",
          name: "Vietnamesisch",
        },
        {
          code: "cy",
          name: "Walisisch",
        },
        {
          code: "zu",
          name: "Zulu",
        },
        {
          code: "he",
          name: "Hebräisch",
        },
        {
          code: "zh-cn",
          name: "Chinesisch (vereinfacht)",
        },
      ],
      el: [
        {
          code: "en",
          name: "Αγγλικά",
        },
        {
          code: "az",
          name: "Αζερμπαϊτζανικά",
        },
        {
          code: "am",
          name: "Αμχαρικά",
        },
        {
          code: "ar",
          name: "Αραβικά",
        },
        {
          code: "eu",
          name: "Βασκικά",
        },
        {
          code: "vi",
          name: "Βιετναμεζικά",
        },
        {
          code: "bg",
          name: "Βουλγαρικά",
        },
        {
          code: "gd",
          name: "Γαελικά Σκοτίας",
        },
        {
          code: "gl",
          name: "Γαλικιακά",
        },
        {
          code: "fr",
          name: "Γαλλικά",
        },
        {
          code: "de",
          name: "Γερμανικά",
        },
        {
          code: "da",
          name: "Δανικά",
        },
        {
          code: "he",
          name: "Εβραϊκά",
        },
        {
          code: "el",
          name: "Ελληνικά",
        },
        {
          code: "et",
          name: "Εσθονικά",
        },
        {
          code: "zu",
          name: "Ζουλού",
        },
        {
          code: "ja",
          name: "Ιαπωνικά",
        },
        {
          code: "id",
          name: "Ινδονησιακά",
        },
        {
          code: "ga",
          name: "Ιρλανδικά",
        },
        {
          code: "is",
          name: "Ισλανδικά",
        },
        {
          code: "es",
          name: "Ισπανικά",
        },
        {
          code: "it",
          name: "Ιταλικά",
        },
        {
          code: "ca",
          name: "Καταλανικά",
        },
        {
          code: "zh-cn",
          name: "Κινεζικά (Απλοποιημένα)",
        },
        {
          code: "zh-tw",
          name: "Κινεζικά (Παραδοσιακά)",
        },
        {
          code: "ko",
          name: "Κορεατικά",
        },
        {
          code: "ckb",
          name: "Κουρδικά (Σορανί)",
        },
        {
          code: "hr",
          name: "Κροατικά",
        },
        {
          code: "lv",
          name: "Λετονικά",
        },
        {
          code: "lt",
          name: "Λιθουανικά",
        },
        {
          code: "mi",
          name: "Μαορί",
        },
        {
          code: "nb",
          name: "Νορβηγικά",
        },
        {
          code: "nl",
          name: "Ολλανδικά",
        },
        {
          code: "cy",
          name: "Ουαλικά",
        },
        {
          code: "hu",
          name: "Ουγγρικά",
        },
        {
          code: "uk",
          name: "Ουκρανικά",
        },
        {
          code: "fa",
          name: "Περσικά",
        },
        {
          code: "pl",
          name: "Πολωνικά",
        },
        {
          code: "pt",
          name: "Πορτογαλικά",
        },
        {
          code: "ro",
          name: "Ρουμανικά",
        },
        {
          code: "ru",
          name: "Ρωσικά",
        },
        {
          code: "sr",
          name: "Σερβικά",
        },
        {
          code: "sk",
          name: "Σλοβακικά",
        },
        {
          code: "sl",
          name: "Σλοβενικά",
        },
        {
          code: "sv",
          name: "Σουηδικά",
        },
        {
          code: "th",
          name: "Ταϊλανδεζικά",
        },
        {
          code: "tr",
          name: "Τουρκικά",
        },
        {
          code: "cs",
          name: "Τσεχικά",
        },
        {
          code: "fi",
          name: "Φινλανδικά",
        },
        {
          code: "he",
          name: "Εβραϊκά",
        },
        {
          code: "zh-cn",
          name: "Κινεζικά (Απλοποιημένα)",
        },
      ],
      en: [
        {
          code: "am",
          name: "Amharic",
        },
        {
          code: "ar",
          name: "Arabic",
        },
        {
          code: "az",
          name: "Azerbaijani",
        },
        {
          code: "eu",
          name: "Basque",
        },
        {
          code: "bg",
          name: "Bulgarian",
        },
        {
          code: "ca",
          name: "Catalan",
        },
        {
          code: "zh-cn",
          name: "Chinese (Simplified)",
        },
        {
          code: "zh-tw",
          name: "Chinese (Traditional)",
        },
        {
          code: "hr",
          name: "Croatian",
        },
        {
          code: "cs",
          name: "Czech",
        },
        {
          code: "da",
          name: "Danish",
        },
        {
          code: "nl",
          name: "Dutch",
        },
        {
          code: "en",
          name: "English",
        },
        {
          code: "et",
          name: "Estonian",
        },
        {
          code: "fi",
          name: "Finnish",
        },
        {
          code: "fr",
          name: "French",
        },
        {
          code: "gl",
          name: "Galician",
        },
        {
          code: "de",
          name: "German",
        },
        {
          code: "el",
          name: "Greek",
        },
        {
          code: "he",
          name: "Hebrew",
        },
        {
          code: "hu",
          name: "Hungarian",
        },
        {
          code: "is",
          name: "Icelandic",
        },
        {
          code: "id",
          name: "Indonesian",
        },
        {
          code: "ga",
          name: "Irish Gaelic",
        },
        {
          code: "it",
          name: "Italian",
        },
        {
          code: "ja",
          name: "Japanese",
        },
        {
          code: "ko",
          name: "Korean",
        },
        {
          code: "ckb",
          name: "Kurdish (Sorani)",
        },
        {
          code: "lv",
          name: "Latvian",
        },
        {
          code: "lt",
          name: "Lithuanian",
        },
        {
          code: "mi",
          name: "Maori",
        },
        {
          code: "nb",
          name: "Norwegian",
        },
        {
          code: "fa",
          name: "Persian",
        },
        {
          code: "pl",
          name: "Polish",
        },
        {
          code: "pt",
          name: "Portuguese",
        },
        {
          code: "ro",
          name: "Romanian",
        },
        {
          code: "ru",
          name: "Russian",
        },
        {
          code: "gd",
          name: "Scots Gaelic",
        },
        {
          code: "sr",
          name: "Serbian",
        },
        {
          code: "sk",
          name: "Slovak",
        },
        {
          code: "sl",
          name: "Slovenian",
        },
        {
          code: "es",
          name: "Spanish",
        },
        {
          code: "sv",
          name: "Swedish",
        },
        {
          code: "th",
          name: "Thai",
        },
        {
          code: "tr",
          name: "Turkish",
        },
        {
          code: "uk",
          name: "Ukrainian",
        },
        {
          code: "vi",
          name: "Vietnamese",
        },
        {
          code: "cy",
          name: "Welsh",
        },
        {
          code: "zu",
          name: "Zulu",
        },
        {
          code: "he",
          name: "Hebrew",
        },
        {
          code: "zh-cn",
          name: "Chinese (Simplified)",
        },
      ],
      es: [
        {
          code: "de",
          name: "Alemán",
        },
        {
          code: "am",
          name: "amhárico",
        },
        {
          code: "ar",
          name: "árabe",
        },
        {
          code: "az",
          name: "Azerí",
        },
        {
          code: "bg",
          name: "Búlgaro",
        },
        {
          code: "ca",
          name: "Catalán",
        },
        {
          code: "cs",
          name: "Checo",
        },
        {
          code: "zh-cn",
          name: "Chino (simplificado)",
        },
        {
          code: "zh-tw",
          name: "Chino (tradicional)",
        },
        {
          code: "ko",
          name: "Coreano",
        },
        {
          code: "hr",
          name: "Croata",
        },
        {
          code: "da",
          name: "Danés",
        },
        {
          code: "sk",
          name: "eslovaco",
        },
        {
          code: "sl",
          name: "Esloveno",
        },
        {
          code: "es",
          name: "español",
        },
        {
          code: "et",
          name: "Estonio",
        },
        {
          code: "eu",
          name: "euskera",
        },
        {
          code: "fi",
          name: "finlandés",
        },
        {
          code: "fr",
          name: "francés",
        },
        {
          code: "gd",
          name: "Gaélico escocés",
        },
        {
          code: "cy",
          name: "galés",
        },
        {
          code: "gl",
          name: "Gallego",
        },
        {
          code: "el",
          name: "griego",
        },
        {
          code: "he",
          name: "hebreo",
        },
        {
          code: "hu",
          name: "Húngaro",
        },
        {
          code: "id",
          name: "Indonesio",
        },
        {
          code: "en",
          name: "inglés",
        },
        {
          code: "ga",
          name: "irlandés",
        },
        {
          code: "is",
          name: "Islandés",
        },
        {
          code: "it",
          name: "italiano",
        },
        {
          code: "ja",
          name: "Japonés",
        },
        {
          code: "ckb",
          name: "Kurdo (sorani)",
        },
        {
          code: "lv",
          name: "letón",
        },
        {
          code: "lt",
          name: "Lituano",
        },
        {
          code: "mi",
          name: "Maorí",
        },
        {
          code: "nl",
          name: "neerlandés",
        },
        {
          code: "nb",
          name: "Noruego",
        },
        {
          code: "fa",
          name: "persa",
        },
        {
          code: "pl",
          name: "polaco",
        },
        {
          code: "pt",
          name: "Portugués",
        },
        {
          code: "ro",
          name: "Rumano",
        },
        {
          code: "ru",
          name: "ruso",
        },
        {
          code: "sr",
          name: "Serbio",
        },
        {
          code: "sv",
          name: "Sueco",
        },
        {
          code: "th",
          name: "tailandés",
        },
        {
          code: "tr",
          name: "turco",
        },
        {
          code: "uk",
          name: "Ucraniano",
        },
        {
          code: "vi",
          name: "Vietnamita",
        },
        {
          code: "zu",
          name: "Zulú",
        },
        {
          code: "he",
          name: "hebreo",
        },
        {
          code: "zh-cn",
          name: "Chino (simplificado)",
        },
      ],
      "es-419": [
        {
          code: "de",
          name: "Alemán",
        },
        {
          code: "am",
          name: "amhárico",
        },
        {
          code: "ar",
          name: "árabe",
        },
        {
          code: "az",
          name: "Azerí",
        },
        {
          code: "bg",
          name: "Búlgaro",
        },
        {
          code: "ca",
          name: "Catalán",
        },
        {
          code: "cs",
          name: "Checo",
        },
        {
          code: "zh-cn",
          name: "Chino (simplificado)",
        },
        {
          code: "zh-tw",
          name: "Chino (tradicional)",
        },
        {
          code: "ko",
          name: "Coreano",
        },
        {
          code: "hr",
          name: "Croata",
        },
        {
          code: "da",
          name: "Danés",
        },
        {
          code: "sk",
          name: "eslovaco",
        },
        {
          code: "sl",
          name: "Esloveno",
        },
        {
          code: "es",
          name: "español",
        },
        {
          code: "et",
          name: "Estonio",
        },
        {
          code: "eu",
          name: "euskera",
        },
        {
          code: "fi",
          name: "finlandés",
        },
        {
          code: "fr",
          name: "francés",
        },
        {
          code: "gd",
          name: "Gaélico escocés",
        },
        {
          code: "cy",
          name: "galés",
        },
        {
          code: "gl",
          name: "Gallego",
        },
        {
          code: "el",
          name: "griego",
        },
        {
          code: "he",
          name: "hebreo",
        },
        {
          code: "hu",
          name: "Húngaro",
        },
        {
          code: "id",
          name: "Indonesio",
        },
        {
          code: "en",
          name: "inglés",
        },
        {
          code: "ga",
          name: "irlandés",
        },
        {
          code: "is",
          name: "Islandés",
        },
        {
          code: "it",
          name: "italiano",
        },
        {
          code: "ja",
          name: "Japonés",
        },
        {
          code: "ckb",
          name: "Kurdo (sorani)",
        },
        {
          code: "lv",
          name: "letón",
        },
        {
          code: "lt",
          name: "Lituano",
        },
        {
          code: "mi",
          name: "Maorí",
        },
        {
          code: "nl",
          name: "neerlandés",
        },
        {
          code: "nb",
          name: "Noruego",
        },
        {
          code: "fa",
          name: "persa",
        },
        {
          code: "pl",
          name: "polaco",
        },
        {
          code: "pt",
          name: "Portugués",
        },
        {
          code: "ro",
          name: "Rumano",
        },
        {
          code: "ru",
          name: "ruso",
        },
        {
          code: "sr",
          name: "Serbio",
        },
        {
          code: "sv",
          name: "Sueco",
        },
        {
          code: "th",
          name: "tailandés",
        },
        {
          code: "tr",
          name: "turco",
        },
        {
          code: "uk",
          name: "Ucraniano",
        },
        {
          code: "vi",
          name: "Vietnamita",
        },
        {
          code: "zu",
          name: "Zulú",
        },
        {
          code: "he",
          name: "hebreo",
        },
        {
          code: "zh-cn",
          name: "Chino (simplificado)",
        },
      ],
      et: [
        {
          code: "am",
          name: "amhaari",
        },
        {
          code: "ar",
          name: "araabia",
        },
        {
          code: "az",
          name: "aserbaidžaani",
        },
        {
          code: "eu",
          name: "baski",
        },
        {
          code: "bg",
          name: "bulgaaria",
        },
        {
          code: "et",
          name: "eesti",
        },
        {
          code: "gl",
          name: "galeegi",
        },
        {
          code: "he",
          name: "heebrea",
        },
        {
          code: "zh-cn",
          name: "hiina (lihtsustatud)",
        },
        {
          code: "zh-tw",
          name: "hiina (traditsiooniline)",
        },
        {
          code: "es",
          name: "hispaania",
        },
        {
          code: "nl",
          name: "hollandi",
        },
        {
          code: "hr",
          name: "horvaadi",
        },
        {
          code: "ga",
          name: "iiri",
        },
        {
          code: "id",
          name: "indoneesia",
        },
        {
          code: "en",
          name: "inglise",
        },
        {
          code: "is",
          name: "islandi",
        },
        {
          code: "it",
          name: "itaalia",
        },
        {
          code: "ja",
          name: "jaapani",
        },
        {
          code: "ca",
          name: "katalaani",
        },
        {
          code: "ko",
          name: "korea",
        },
        {
          code: "el",
          name: "kreeka",
        },
        {
          code: "ckb",
          name: "kurdi (sorani)",
        },
        {
          code: "lt",
          name: "leedu",
        },
        {
          code: "lv",
          name: "läti",
        },
        {
          code: "mi",
          name: "maoori",
        },
        {
          code: "nb",
          name: "norra",
        },
        {
          code: "pl",
          name: "poola",
        },
        {
          code: "pt",
          name: "portugali",
        },
        {
          code: "fr",
          name: "prantsuse",
        },
        {
          code: "fa",
          name: "pärsia",
        },
        {
          code: "sv",
          name: "rootsi",
        },
        {
          code: "ro",
          name: "rumeenia",
        },
        {
          code: "de",
          name: "saksa",
        },
        {
          code: "sr",
          name: "serbia",
        },
        {
          code: "sk",
          name: "slovaki",
        },
        {
          code: "sl",
          name: "sloveeni",
        },
        {
          code: "fi",
          name: "soome",
        },
        {
          code: "zu",
          name: "suulu",
        },
        {
          code: "gd",
          name: "šoti",
        },
        {
          code: "da",
          name: "taani",
        },
        {
          code: "th",
          name: "tai",
        },
        {
          code: "cs",
          name: "tšehhi",
        },
        {
          code: "tr",
          name: "türgi",
        },
        {
          code: "cy",
          name: "uelsi",
        },
        {
          code: "uk",
          name: "ukraina",
        },
        {
          code: "hu",
          name: "ungari",
        },
        {
          code: "ru",
          name: "vene",
        },
        {
          code: "vi",
          name: "vietnami",
        },
        {
          code: "he",
          name: "heebrea",
        },
        {
          code: "zh-cn",
          name: "hiina (lihtsustatud)",
        },
      ],
      eu: [
        {
          code: "de",
          name: "alemana",
        },
        {
          code: "am",
          name: "amharera",
        },
        {
          code: "ar",
          name: "arabiera",
        },
        {
          code: "az",
          name: "azerbaijanera",
        },
        {
          code: "bg",
          name: "bulgariera",
        },
        {
          code: "da",
          name: "daniera",
        },
        {
          code: "ro",
          name: "errumaniera",
        },
        {
          code: "ru",
          name: "errusiera",
        },
        {
          code: "gd",
          name: "Eskoziako gaelikoa",
        },
        {
          code: "sk",
          name: "eslovakiera",
        },
        {
          code: "sl",
          name: "esloveniera",
        },
        {
          code: "et",
          name: "estoniera",
        },
        {
          code: "eu",
          name: "euskara",
        },
        {
          code: "fi",
          name: "finlandiera",
        },
        {
          code: "fr",
          name: "frantsesa",
        },
        {
          code: "cy",
          name: "galesa",
        },
        {
          code: "gl",
          name: "galiziera",
        },
        {
          code: "es",
          name: "gaztelania",
        },
        {
          code: "el",
          name: "greziera",
        },
        {
          code: "he",
          name: "hebreera",
        },
        {
          code: "hu",
          name: "hungariera",
        },
        {
          code: "id",
          name: "indonesiera",
        },
        {
          code: "en",
          name: "ingelesa",
        },
        {
          code: "ga",
          name: "irlandera",
        },
        {
          code: "is",
          name: "islandiera",
        },
        {
          code: "it",
          name: "italiera",
        },
        {
          code: "ja",
          name: "japoniera",
        },
        {
          code: "ca",
          name: "katalana",
        },
        {
          code: "ko",
          name: "koreera",
        },
        {
          code: "hr",
          name: "kroaziera",
        },
        {
          code: "ckb",
          name: "kurduera (sorania)",
        },
        {
          code: "lv",
          name: "letoniera",
        },
        {
          code: "lt",
          name: "lituaniera",
        },
        {
          code: "mi",
          name: "maoriera",
        },
        {
          code: "nl",
          name: "nederlandera",
        },
        {
          code: "nb",
          name: "norvegiera",
        },
        {
          code: "fa",
          name: "persiera",
        },
        {
          code: "pl",
          name: "poloniera",
        },
        {
          code: "pt",
          name: "portugesa",
        },
        {
          code: "sr",
          name: "serbiera",
        },
        {
          code: "sv",
          name: "suediera",
        },
        {
          code: "th",
          name: "thailandiera",
        },
        {
          code: "tr",
          name: "turkiera",
        },
        {
          code: "cs",
          name: "txekiera",
        },
        {
          code: "zh-cn",
          name: "txinera (sinplifikatua)",
        },
        {
          code: "zh-tw",
          name: "txinera (tradizionala)",
        },
        {
          code: "uk",
          name: "ukrainera",
        },
        {
          code: "vi",
          name: "vietnamera",
        },
        {
          code: "zu",
          name: "zuluera",
        },
        {
          code: "he",
          name: "hebreera",
        },
        {
          code: "zh-cn",
          name: "txinera (sinplifikatua)",
        },
      ],
      fa: [
        {
          code: "az",
          name: "آذرباﻳﺠﺎﻧﻰ",
        },
        {
          code: "de",
          name: "آلمانی",
        },
        {
          code: "es",
          name: "اسپانیایی",
        },
        {
          code: "et",
          name: "استونيايی",
        },
        {
          code: "sk",
          name: "اسلواکی",
        },
        {
          code: "sl",
          name: "اسلونیایی",
        },
        {
          code: "uk",
          name: "اکراينی",
        },
        {
          code: "am",
          name: "امهری",
        },
        {
          code: "id",
          name: "اندونزيايی",
        },
        {
          code: "en",
          name: "انگلیسی",
        },
        {
          code: "it",
          name: "ایتالیایی",
        },
        {
          code: "ga",
          name: "ایرلندی",
        },
        {
          code: "is",
          name: "ايسلندی",
        },
        {
          code: "eu",
          name: "باسکی",
        },
        {
          code: "bg",
          name: "بلغاری",
        },
        {
          code: "pt",
          name: "پرتغالی",
        },
        {
          code: "th",
          name: "تايلندی",
        },
        {
          code: "tr",
          name: "ترکی استانبولی",
        },
        {
          code: "cs",
          name: "چک",
        },
        {
          code: "zh-cn",
          name: "چینی (ساده‌شده)",
        },
        {
          code: "zh-tw",
          name: "چینی (سنتی)",
        },
        {
          code: "da",
          name: "دانمارکی",
        },
        {
          code: "ru",
          name: "روسی",
        },
        {
          code: "ro",
          name: "رومانيايی",
        },
        {
          code: "zu",
          name: "زولو",
        },
        {
          code: "ja",
          name: "ژاپنی",
        },
        {
          code: "sv",
          name: "سوئدی",
        },
        {
          code: "sr",
          name: "صربی",
        },
        {
          code: "he",
          name: "عبری",
        },
        {
          code: "ar",
          name: "عربی",
        },
        {
          code: "fa",
          name: "فارسی",
        },
        {
          code: "fr",
          name: "فرانسوی",
        },
        {
          code: "fi",
          name: "فنلاندی",
        },
        {
          code: "ca",
          name: "کاتالان",
        },
        {
          code: "ckb",
          name: "کردی (سورانی)",
        },
        {
          code: "hr",
          name: "کرواتی",
        },
        {
          code: "ko",
          name: "کره‌ای",
        },
        {
          code: "gl",
          name: "گالیسی",
        },
        {
          code: "gd",
          name: "گاليک اسکاتلندی",
        },
        {
          code: "lv",
          name: "لتونيايی",
        },
        {
          code: "pl",
          name: "لهستانی",
        },
        {
          code: "lt",
          name: "ليتوانيايی",
        },
        {
          code: "mi",
          name: "مائوری",
        },
        {
          code: "hu",
          name: "مجاری",
        },
        {
          code: "nb",
          name: "نروژی",
        },
        {
          code: "cy",
          name: "ولزی",
        },
        {
          code: "vi",
          name: "ويتنامی",
        },
        {
          code: "nl",
          name: "هلندی",
        },
        {
          code: "el",
          name: "يونانی",
        },
        {
          code: "he",
          name: "عبری",
        },
        {
          code: "zh-cn",
          name: "چینی (ساده‌شده)",
        },
      ],
      fi: [
        {
          code: "am",
          name: "amhara",
        },
        {
          code: "ar",
          name: "arabia",
        },
        {
          code: "az",
          name: "azeri",
        },
        {
          code: "eu",
          name: "baski",
        },
        {
          code: "bg",
          name: "bulgaria",
        },
        {
          code: "en",
          name: "englanti",
        },
        {
          code: "es",
          name: "espanja",
        },
        {
          code: "gl",
          name: "galicia",
        },
        {
          code: "he",
          name: "heprea",
        },
        {
          code: "nl",
          name: "hollanti",
        },
        {
          code: "ga",
          name: "iiri",
        },
        {
          code: "id",
          name: "indonesia",
        },
        {
          code: "is",
          name: "islanti",
        },
        {
          code: "it",
          name: "italia",
        },
        {
          code: "ja",
          name: "japani",
        },
        {
          code: "ca",
          name: "katalaani",
        },
        {
          code: "zh-tw",
          name: "kiina (perinteinen)",
        },
        {
          code: "zh-cn",
          name: "kiina (yksinkertaistettu)",
        },
        {
          code: "ko",
          name: "korea",
        },
        {
          code: "el",
          name: "kreikka",
        },
        {
          code: "hr",
          name: "kroatia",
        },
        {
          code: "ckb",
          name: "kurdi (soranî)",
        },
        {
          code: "cy",
          name: "kymri",
        },
        {
          code: "lv",
          name: "latvia",
        },
        {
          code: "lt",
          name: "liettua",
        },
        {
          code: "mi",
          name: "maori",
        },
        {
          code: "nb",
          name: "norja",
        },
        {
          code: "fa",
          name: "persia",
        },
        {
          code: "pt",
          name: "portugali",
        },
        {
          code: "pl",
          name: "puola",
        },
        {
          code: "fr",
          name: "ranska",
        },
        {
          code: "ro",
          name: "romania",
        },
        {
          code: "sv",
          name: "ruotsi",
        },
        {
          code: "de",
          name: "saksa",
        },
        {
          code: "sr",
          name: "serbia",
        },
        {
          code: "gd",
          name: "skottigaeli",
        },
        {
          code: "sk",
          name: "slovakia",
        },
        {
          code: "sl",
          name: "slovenia",
        },
        {
          code: "fi",
          name: "suomi",
        },
        {
          code: "da",
          name: "tanska",
        },
        {
          code: "th",
          name: "thai",
        },
        {
          code: "cs",
          name: "tsekki",
        },
        {
          code: "tr",
          name: "turkki",
        },
        {
          code: "uk",
          name: "ukraina",
        },
        {
          code: "hu",
          name: "unkari",
        },
        {
          code: "ru",
          name: "venäjä",
        },
        {
          code: "vi",
          name: "vietnam",
        },
        {
          code: "et",
          name: "viro",
        },
        {
          code: "zu",
          name: "zulu",
        },
        {
          code: "he",
          name: "heprea",
        },
        {
          code: "zh-cn",
          name: "kiina (yksinkertaistettu)",
        },
      ],
      fr: [
        {
          code: "de",
          name: "Allemand",
        },
        {
          code: "am",
          name: "Amharique",
        },
        {
          code: "en",
          name: "Anglais",
        },
        {
          code: "ar",
          name: "Arabe",
        },
        {
          code: "az",
          name: "Azéri",
        },
        {
          code: "eu",
          name: "Basque",
        },
        {
          code: "bg",
          name: "Bulgare",
        },
        {
          code: "ca",
          name: "Catalan",
        },
        {
          code: "zh-cn",
          name: "Chinois (simplifié)",
        },
        {
          code: "zh-tw",
          name: "Chinois (traditionnel)",
        },
        {
          code: "ko",
          name: "Coréen",
        },
        {
          code: "hr",
          name: "Croate",
        },
        {
          code: "da",
          name: "Danois",
        },
        {
          code: "es",
          name: "Espagnol",
        },
        {
          code: "et",
          name: "Estonien",
        },
        {
          code: "fi",
          name: "Finnois",
        },
        {
          code: "fr",
          name: "Français",
        },
        {
          code: "gd",
          name: "Gaélique (Écosse)",
        },
        {
          code: "gl",
          name: "Galicien",
        },
        {
          code: "cy",
          name: "Gallois",
        },
        {
          code: "el",
          name: "Grec",
        },
        {
          code: "he",
          name: "Hébreu",
        },
        {
          code: "hu",
          name: "Hongrois",
        },
        {
          code: "id",
          name: "Indonésien",
        },
        {
          code: "ga",
          name: "Irlandais",
        },
        {
          code: "is",
          name: "Islandais",
        },
        {
          code: "it",
          name: "Italien",
        },
        {
          code: "ja",
          name: "Japonais",
        },
        {
          code: "ckb",
          name: "Kurde (Sorani)",
        },
        {
          code: "lv",
          name: "Letton",
        },
        {
          code: "lt",
          name: "Lituanien",
        },
        {
          code: "mi",
          name: "Maori",
        },
        {
          code: "nl",
          name: "Néerlandais",
        },
        {
          code: "nb",
          name: "Norvégien",
        },
        {
          code: "fa",
          name: "Persan",
        },
        {
          code: "pl",
          name: "Polonais",
        },
        {
          code: "pt",
          name: "Portugais",
        },
        {
          code: "ro",
          name: "Roumain",
        },
        {
          code: "ru",
          name: "Russe",
        },
        {
          code: "sr",
          name: "Serbe",
        },
        {
          code: "sk",
          name: "Slovaque",
        },
        {
          code: "sl",
          name: "Slovène",
        },
        {
          code: "sv",
          name: "Suédois",
        },
        {
          code: "cs",
          name: "Tchèque",
        },
        {
          code: "th",
          name: "Thaï",
        },
        {
          code: "tr",
          name: "Turc",
        },
        {
          code: "uk",
          name: "Ukrainien",
        },
        {
          code: "vi",
          name: "Vietnamien",
        },
        {
          code: "zu",
          name: "Zoulou",
        },
        {
          code: "he",
          name: "Hébreu",
        },
        {
          code: "zh-cn",
          name: "Chinois (simplifié)",
        },
      ],
      ga: [
        {
          code: "am",
          name: "Amáiris",
        },
        {
          code: "ar",
          name: "Araibis",
        },
        {
          code: "az",
          name: "Asarbaiseáinis",
        },
        {
          code: "eu",
          name: "Bascais",
        },
        {
          code: "en",
          name: "Béarla",
        },
        {
          code: "cy",
          name: "Breatnais",
        },
        {
          code: "bg",
          name: "Bulgáiris",
        },
        {
          code: "ca",
          name: "Catalóinis",
        },
        {
          code: "ckb",
          name: "Coirdis (Sóráinis)",
        },
        {
          code: "ko",
          name: "Cóiréis",
        },
        {
          code: "hr",
          name: "Cróitis",
        },
        {
          code: "da",
          name: "Danmhairgis",
        },
        {
          code: "he",
          name: "Eabhrais",
        },
        {
          code: "et",
          name: "Eastóinis",
        },
        {
          code: "fi",
          name: "Fionlainnis",
        },
        {
          code: "fr",
          name: "Fraincis",
        },
        {
          code: "ga",
          name: "Gaeilge",
        },
        {
          code: "gd",
          name: "Gaeilge na hAlban",
        },
        {
          code: "gl",
          name: "Gailísis",
        },
        {
          code: "de",
          name: "Gearmáinis",
        },
        {
          code: "el",
          name: "Gréigis",
        },
        {
          code: "id",
          name: "Indinéisis",
        },
        {
          code: "it",
          name: "Iodáilis",
        },
        {
          code: "nb",
          name: "Ioruais",
        },
        {
          code: "is",
          name: "Íoslainnis",
        },
        {
          code: "lv",
          name: "Laitvis",
        },
        {
          code: "lt",
          name: "Liotuáinis",
        },
        {
          code: "mi",
          name: "Maorais",
        },
        {
          code: "nl",
          name: "Ollainnis",
        },
        {
          code: "fa",
          name: "Peirsis",
        },
        {
          code: "pl",
          name: "Polainnis",
        },
        {
          code: "pt",
          name: "Portaingéilis",
        },
        {
          code: "ro",
          name: "Rómáinis",
        },
        {
          code: "ru",
          name: "Rúisis",
        },
        {
          code: "ja",
          name: "Seapáinis",
        },
        {
          code: "cs",
          name: "Seicis",
        },
        {
          code: "sr",
          name: "Seirbis",
        },
        {
          code: "zh-cn",
          name: "Sínis (Simplithe)",
        },
        {
          code: "zh-tw",
          name: "Sínis (Traidisiúnta)",
        },
        {
          code: "sl",
          name: "Slóivéinis",
        },
        {
          code: "sk",
          name: "Slóvaicis",
        },
        {
          code: "es",
          name: "Spáinnis",
        },
        {
          code: "sv",
          name: "Sualainnis",
        },
        {
          code: "zu",
          name: "Súlúis",
        },
        {
          code: "th",
          name: "Téalainnis",
        },
        {
          code: "tr",
          name: "Tuircis",
        },
        {
          code: "uk",
          name: "Úcráinis",
        },
        {
          code: "hu",
          name: "Ungáiris",
        },
        {
          code: "vi",
          name: "Vítneaimis",
        },
        {
          code: "he",
          name: "Eabhrais",
        },
        {
          code: "zh-cn",
          name: "Sínis (Simplithe)",
        },
      ],
      gd: [
        {
          code: "am",
          name: "Amtharais",
        },
        {
          code: "ar",
          name: "Arabais",
        },
        {
          code: "az",
          name: "Asarbaideànais",
        },
        {
          code: "eu",
          name: "Basgais",
        },
        {
          code: "en",
          name: "Beurla",
        },
        {
          code: "vi",
          name: "Bhiet-Namais",
        },
        {
          code: "bg",
          name: "Bulgarais",
        },
        {
          code: "th",
          name: "Cànan nan Tàidh",
        },
        {
          code: "ca",
          name: "Catalanais",
        },
        {
          code: "ko",
          name: "Coirèanais",
        },
        {
          code: "hr",
          name: "Cròthaisis",
        },
        {
          code: "cy",
          name: "Cuimris",
        },
        {
          code: "ckb",
          name: "Cùrdais (Sorani)",
        },
        {
          code: "da",
          name: "Danmhairgis",
        },
        {
          code: "nl",
          name: "Duitsis",
        },
        {
          code: "he",
          name: "Eabhra",
        },
        {
          code: "it",
          name: "Eadailtis",
        },
        {
          code: "et",
          name: "Eastoinis",
        },
        {
          code: "fi",
          name: "Fionnlannais",
        },
        {
          code: "fr",
          name: "Fraingis",
        },
        {
          code: "ga",
          name: "Gaeilge",
        },
        {
          code: "gd",
          name: "Gàidhlig",
        },
        {
          code: "gl",
          name: "Gailìsis",
        },
        {
          code: "de",
          name: "Gearmailtis",
        },
        {
          code: "el",
          name: "Grèigis",
        },
        {
          code: "id",
          name: "Innd-Innsis",
        },
        {
          code: "is",
          name: "Innis-Tìlis",
        },
        {
          code: "lv",
          name: "Laitbheis",
        },
        {
          code: "lt",
          name: "Liotuainis",
        },
        {
          code: "mi",
          name: "Māori",
        },
        {
          code: "nb",
          name: "Nirribhis",
        },
        {
          code: "fa",
          name: "Peirsis",
        },
        {
          code: "pl",
          name: "Pòlainnis",
        },
        {
          code: "pt",
          name: "Portagailis",
        },
        {
          code: "ro",
          name: "Romàinis",
        },
        {
          code: "ru",
          name: "Ruisis",
        },
        {
          code: "cs",
          name: "Seacais",
        },
        {
          code: "ja",
          name: "Seapanais",
        },
        {
          code: "sr",
          name: "Sèirbis",
        },
        {
          code: "zh-tw",
          name: "Sìonais (seann-nòsach)",
        },
        {
          code: "zh-cn",
          name: "Sìonais (sìmplichte)",
        },
        {
          code: "sk",
          name: "Slòbhacais",
        },
        {
          code: "sl",
          name: "Slòbhainis",
        },
        {
          code: "es",
          name: "Spàinntis",
        },
        {
          code: "sv",
          name: "Suainis",
        },
        {
          code: "tr",
          name: "Turcais",
        },
        {
          code: "uk",
          name: "Ucràinis",
        },
        {
          code: "hu",
          name: "Ungairis",
        },
        {
          code: "zu",
          name: "Zulu",
        },
        {
          code: "he",
          name: "Eabhra",
        },
        {
          code: "zh-cn",
          name: "Sìonais (sìmplichte)",
        },
      ],
      gl: [
        {
          code: "az",
          name: "acerbaixano",
        },
        {
          code: "de",
          name: "alemán",
        },
        {
          code: "am",
          name: "amárico",
        },
        {
          code: "ar",
          name: "árabe",
        },
        {
          code: "bg",
          name: "búlgaro",
        },
        {
          code: "ca",
          name: "catalán",
        },
        {
          code: "cs",
          name: "checo",
        },
        {
          code: "zh-cn",
          name: "chinés (simplificado)",
        },
        {
          code: "zh-tw",
          name: "chinés (tradicional)",
        },
        {
          code: "ko",
          name: "coreano",
        },
        {
          code: "hr",
          name: "croata",
        },
        {
          code: "da",
          name: "dinamarqués",
        },
        {
          code: "sk",
          name: "eslovaco",
        },
        {
          code: "sl",
          name: "esloveno",
        },
        {
          code: "es",
          name: "español",
        },
        {
          code: "et",
          name: "estoniano",
        },
        {
          code: "eu",
          name: "éuscaro",
        },
        {
          code: "fi",
          name: "finés",
        },
        {
          code: "fr",
          name: "francés",
        },
        {
          code: "gd",
          name: "gaélico escocés",
        },
        {
          code: "gl",
          name: "galego",
        },
        {
          code: "cy",
          name: "galés",
        },
        {
          code: "el",
          name: "grego",
        },
        {
          code: "he",
          name: "hebreo",
        },
        {
          code: "hu",
          name: "húngaro",
        },
        {
          code: "id",
          name: "indonesio",
        },
        {
          code: "en",
          name: "inglés",
        },
        {
          code: "ga",
          name: "irlandés",
        },
        {
          code: "is",
          name: "islandés",
        },
        {
          code: "it",
          name: "italiano",
        },
        {
          code: "ckb",
          name: "kurdo (sorani)",
        },
        {
          code: "lv",
          name: "letón",
        },
        {
          code: "lt",
          name: "lituano",
        },
        {
          code: "mi",
          name: "maorí",
        },
        {
          code: "nl",
          name: "neerlandés",
        },
        {
          code: "nb",
          name: "noruegués",
        },
        {
          code: "fa",
          name: "persa",
        },
        {
          code: "pl",
          name: "polaco",
        },
        {
          code: "pt",
          name: "portugués",
        },
        {
          code: "ro",
          name: "romanés",
        },
        {
          code: "ru",
          name: "ruso",
        },
        {
          code: "sr",
          name: "serbio",
        },
        {
          code: "sv",
          name: "sueco",
        },
        {
          code: "th",
          name: "tailandés",
        },
        {
          code: "tr",
          name: "turco",
        },
        {
          code: "uk",
          name: "ucraíno",
        },
        {
          code: "vi",
          name: "vietnamita",
        },
        {
          code: "ja",
          name: "xaponés",
        },
        {
          code: "zu",
          name: "zulú",
        },
        {
          code: "he",
          name: "hebreo",
        },
        {
          code: "zh-cn",
          name: "chinés (simplificado)",
        },
      ],
      he: [
        {
          code: "uk",
          name: "אוקראינית",
        },
        {
          code: "az",
          name: "אזרית",
        },
        {
          code: "it",
          name: "איטלקית",
        },
        {
          code: "id",
          name: "אינדונזית",
        },
        {
          code: "is",
          name: "איסלנדית",
        },
        {
          code: "ga",
          name: "אירית",
        },
        {
          code: "am",
          name: "אמהרית",
        },
        {
          code: "en",
          name: "אנגלית",
        },
        {
          code: "et",
          name: "אסטונית",
        },
        {
          code: "eu",
          name: "באסקית",
        },
        {
          code: "bg",
          name: "בולגרית",
        },
        {
          code: "gd",
          name: "גאלית סקוטית",
        },
        {
          code: "gl",
          name: "גליציאנית",
        },
        {
          code: "de",
          name: "גרמנית",
        },
        {
          code: "da",
          name: "דנית",
        },
        {
          code: "nl",
          name: "הולנדית",
        },
        {
          code: "hu",
          name: "הונגרית",
        },
        {
          code: "cy",
          name: "וולשית",
        },
        {
          code: "vi",
          name: "וייטנאמית",
        },
        {
          code: "zu",
          name: "זולו",
        },
        {
          code: "tr",
          name: "טורקית",
        },
        {
          code: "el",
          name: "יוונית",
        },
        {
          code: "ja",
          name: "יפנית",
        },
        {
          code: "ckb",
          name: "כורדית (סורנית)",
        },
        {
          code: "lv",
          name: "לטבית",
        },
        {
          code: "lt",
          name: "ליטאית",
        },
        {
          code: "mi",
          name: "מאורית",
        },
        {
          code: "nb",
          name: "נורווגית",
        },
        {
          code: "zh-tw",
          name: "סינית (מסורתית)",
        },
        {
          code: "zh-cn",
          name: "‏סינית (פשוטה)",
        },
        {
          code: "sl",
          name: "סלובנית",
        },
        {
          code: "sk",
          name: "סלובקית",
        },
        {
          code: "es",
          name: "ספרדית",
        },
        {
          code: "sr",
          name: "סרבית",
        },
        {
          code: "he",
          name: "עברית",
        },
        {
          code: "ar",
          name: "ערבית",
        },
        {
          code: "pl",
          name: "פולנית",
        },
        {
          code: "pt",
          name: "פורטוגזית",
        },
        {
          code: "fi",
          name: "פינית",
        },
        {
          code: "fa",
          name: "פרסית",
        },
        {
          code: "cs",
          name: "צ'כית",
        },
        {
          code: "fr",
          name: "צרפתית",
        },
        {
          code: "ko",
          name: "קוריאנית",
        },
        {
          code: "ca",
          name: "קטלאנית",
        },
        {
          code: "hr",
          name: "קרואטית",
        },
        {
          code: "ro",
          name: "רומנית",
        },
        {
          code: "ru",
          name: "רוסית",
        },
        {
          code: "sv",
          name: "שוודית",
        },
        {
          code: "th",
          name: "תאית",
        },
        {
          code: "he",
          name: "עברית",
        },
        {
          code: "zh-cn",
          name: "‏סינית (פשוטה)",
        },
      ],
      hr: [
        {
          code: "am",
          name: "amharik",
        },
        {
          code: "ar",
          name: "arapski",
        },
        {
          code: "az",
          name: "azerbajdžanski",
        },
        {
          code: "eu",
          name: "baskijski",
        },
        {
          code: "bg",
          name: "bugarski",
        },
        {
          code: "cs",
          name: "češki",
        },
        {
          code: "da",
          name: "danski",
        },
        {
          code: "en",
          name: "engleski",
        },
        {
          code: "et",
          name: "estonski",
        },
        {
          code: "fi",
          name: "finski",
        },
        {
          code: "fr",
          name: "francuski",
        },
        {
          code: "gl",
          name: "galješki",
        },
        {
          code: "el",
          name: "grčki",
        },
        {
          code: "he",
          name: "hebrejski",
        },
        {
          code: "hr",
          name: "hrvatski",
        },
        {
          code: "id",
          name: "indonezijski",
        },
        {
          code: "ga",
          name: "irski",
        },
        {
          code: "is",
          name: "islandski",
        },
        {
          code: "ja",
          name: "japanski",
        },
        {
          code: "ca",
          name: "katalonski",
        },
        {
          code: "zh-cn",
          name: "kineski (pojednostavljeni)",
        },
        {
          code: "zh-tw",
          name: "kineski (tradicionalni)",
        },
        {
          code: "ko",
          name: "korejski",
        },
        {
          code: "ckb",
          name: "kurdski (soranski)",
        },
        {
          code: "lv",
          name: "latvijski/letonski",
        },
        {
          code: "lt",
          name: "litvanski",
        },
        {
          code: "hu",
          name: "mađarski",
        },
        {
          code: "mi",
          name: "maorski",
        },
        {
          code: "nl",
          name: "nizozemski",
        },
        {
          code: "nb",
          name: "norveški",
        },
        {
          code: "de",
          name: "njemački",
        },
        {
          code: "fa",
          name: "perzijski",
        },
        {
          code: "pl",
          name: "poljski",
        },
        {
          code: "pt",
          name: "portugalski",
        },
        {
          code: "ro",
          name: "rumunjski",
        },
        {
          code: "ru",
          name: "ruski",
        },
        {
          code: "sk",
          name: "slovački",
        },
        {
          code: "sl",
          name: "slovenski",
        },
        {
          code: "sr",
          name: "srpski",
        },
        {
          code: "gd",
          name: "škotski gaelski",
        },
        {
          code: "es",
          name: "španjolski",
        },
        {
          code: "sv",
          name: "švedski",
        },
        {
          code: "th",
          name: "tajlandski",
        },
        {
          code: "it",
          name: "talijanski",
        },
        {
          code: "tr",
          name: "turski",
        },
        {
          code: "uk",
          name: "ukrajinski",
        },
        {
          code: "cy",
          name: "velški",
        },
        {
          code: "vi",
          name: "vijetnamski",
        },
        {
          code: "zu",
          name: "zulu",
        },
        {
          code: "he",
          name: "hebrejski",
        },
        {
          code: "zh-cn",
          name: "kineski (pojednostavljeni)",
        },
      ],
      hu: [
        {
          code: "am",
          name: "amhara",
        },
        {
          code: "en",
          name: "angol",
        },
        {
          code: "ar",
          name: "arab",
        },
        {
          code: "az",
          name: "azeri",
        },
        {
          code: "eu",
          name: "baszk",
        },
        {
          code: "bg",
          name: "bolgár",
        },
        {
          code: "cs",
          name: "cseh",
        },
        {
          code: "da",
          name: "dán",
        },
        {
          code: "et",
          name: "észt",
        },
        {
          code: "fi",
          name: "finn",
        },
        {
          code: "fr",
          name: "francia",
        },
        {
          code: "gl",
          name: "galíciai",
        },
        {
          code: "el",
          name: "görög",
        },
        {
          code: "he",
          name: "héber",
        },
        {
          code: "nl",
          name: "holland",
        },
        {
          code: "hr",
          name: "horvát",
        },
        {
          code: "id",
          name: "indonéz",
        },
        {
          code: "ga",
          name: "ír",
        },
        {
          code: "is",
          name: "izlandi",
        },
        {
          code: "ja",
          name: "japán",
        },
        {
          code: "ca",
          name: "katalán",
        },
        {
          code: "zh-cn",
          name: "kínai (egyszerűsített)",
        },
        {
          code: "zh-tw",
          name: "kínai (hagyományos)",
        },
        {
          code: "ko",
          name: "koreai",
        },
        {
          code: "ckb",
          name: "kurd (szoráni)",
        },
        {
          code: "pl",
          name: "lengyel",
        },
        {
          code: "lv",
          name: "lett",
        },
        {
          code: "lt",
          name: "litván",
        },
        {
          code: "hu",
          name: "magyar",
        },
        {
          code: "mi",
          name: "maori",
        },
        {
          code: "de",
          name: "német",
        },
        {
          code: "nb",
          name: "norvég",
        },
        {
          code: "it",
          name: "olasz",
        },
        {
          code: "ru",
          name: "orosz",
        },
        {
          code: "fa",
          name: "perzsa",
        },
        {
          code: "pt",
          name: "portugál",
        },
        {
          code: "ro",
          name: "román",
        },
        {
          code: "gd",
          name: "skót gael",
        },
        {
          code: "es",
          name: "spanyol",
        },
        {
          code: "sv",
          name: "svéd",
        },
        {
          code: "sr",
          name: "szerb",
        },
        {
          code: "sk",
          name: "szlovák",
        },
        {
          code: "sl",
          name: "szlovén",
        },
        {
          code: "th",
          name: "thai",
        },
        {
          code: "tr",
          name: "török",
        },
        {
          code: "uk",
          name: "ukrán",
        },
        {
          code: "vi",
          name: "vietnámi",
        },
        {
          code: "cy",
          name: "walesi",
        },
        {
          code: "zu",
          name: "zulu",
        },
        {
          code: "he",
          name: "héber",
        },
        {
          code: "zh-cn",
          name: "kínai (egyszerűsített)",
        },
      ],
      id: [
        {
          code: "am",
          name: "Amharik",
        },
        {
          code: "ar",
          name: "Arab",
        },
        {
          code: "az",
          name: "Azerbaijan",
        },
        {
          code: "eu",
          name: "Bask",
        },
        {
          code: "nl",
          name: "Belanda",
        },
        {
          code: "bg",
          name: "Bulgaria",
        },
        {
          code: "cs",
          name: "Ceko",
        },
        {
          code: "zh-cn",
          name: "China (Aks. Sederhana)",
        },
        {
          code: "zh-tw",
          name: "China (Aks. Tradisional)",
        },
        {
          code: "da",
          name: "Denmark",
        },
        {
          code: "et",
          name: "Estonia",
        },
        {
          code: "fa",
          name: "Farsi",
        },
        {
          code: "fi",
          name: "Finlandia",
        },
        {
          code: "ga",
          name: "Gaelig",
        },
        {
          code: "gd",
          name: "Gaelik Skotlandia",
        },
        {
          code: "gl",
          name: "Galisia",
        },
        {
          code: "hu",
          name: "Hungaria",
        },
        {
          code: "he",
          name: "Ibrani",
        },
        {
          code: "id",
          name: "Indonesia",
        },
        {
          code: "en",
          name: "Inggris",
        },
        {
          code: "is",
          name: "Islandia",
        },
        {
          code: "it",
          name: "Italia",
        },
        {
          code: "ja",
          name: "Jepang",
        },
        {
          code: "de",
          name: "Jerman",
        },
        {
          code: "ca",
          name: "Katalan",
        },
        {
          code: "ko",
          name: "Korea",
        },
        {
          code: "hr",
          name: "Kroasia",
        },
        {
          code: "ckb",
          name: "Kurdi (Sorani)",
        },
        {
          code: "lv",
          name: "Latvia",
        },
        {
          code: "lt",
          name: "Lituania",
        },
        {
          code: "mi",
          name: "Maori",
        },
        {
          code: "nb",
          name: "Norwegia",
        },
        {
          code: "pl",
          name: "Polandia",
        },
        {
          code: "pt",
          name: "Portugis",
        },
        {
          code: "fr",
          name: "Prancis",
        },
        {
          code: "ro",
          name: "Rumania",
        },
        {
          code: "ru",
          name: "Rusia",
        },
        {
          code: "sr",
          name: "Serb",
        },
        {
          code: "sk",
          name: "Slovakia",
        },
        {
          code: "sl",
          name: "Slovenia",
        },
        {
          code: "es",
          name: "Spanyol",
        },
        {
          code: "sv",
          name: "Swedia",
        },
        {
          code: "th",
          name: "Thai",
        },
        {
          code: "tr",
          name: "Turkiye",
        },
        {
          code: "uk",
          name: "Ukraina",
        },
        {
          code: "vi",
          name: "Vietnam",
        },
        {
          code: "cy",
          name: "Welsh",
        },
        {
          code: "el",
          name: "Yunani",
        },
        {
          code: "zu",
          name: "Zulu",
        },
        {
          code: "he",
          name: "Ibrani",
        },
        {
          code: "zh-cn",
          name: "China (Aks. Sederhana)",
        },
      ],
      is: [
        {
          code: "am",
          name: "amharíska",
        },
        {
          code: "ar",
          name: "arabíska",
        },
        {
          code: "az",
          name: "aserska",
        },
        {
          code: "eu",
          name: "baskneska",
        },
        {
          code: "bg",
          name: "búlgarska",
        },
        {
          code: "da",
          name: "danska",
        },
        {
          code: "et",
          name: "eistneska",
        },
        {
          code: "en",
          name: "enska",
        },
        {
          code: "fi",
          name: "finnska",
        },
        {
          code: "fr",
          name: "franska",
        },
        {
          code: "gl",
          name: "galisíska",
        },
        {
          code: "el",
          name: "gríska",
        },
        {
          code: "he",
          name: "hebreska",
        },
        {
          code: "nl",
          name: "hollenska",
        },
        {
          code: "id",
          name: "indónesíska",
        },
        {
          code: "ga",
          name: "írska",
        },
        {
          code: "is",
          name: "íslenska",
        },
        {
          code: "it",
          name: "ítalska",
        },
        {
          code: "ja",
          name: "japanska",
        },
        {
          code: "ca",
          name: "katalónska",
        },
        {
          code: "zh-cn",
          name: "kínverska (einfölduð)",
        },
        {
          code: "zh-tw",
          name: "kínverska (hefðbundin)",
        },
        {
          code: "ko",
          name: "kóreska",
        },
        {
          code: "hr",
          name: "króatíska",
        },
        {
          code: "ckb",
          name: "kúrdíska (soraní)",
        },
        {
          code: "lv",
          name: "lettneska",
        },
        {
          code: "lt",
          name: "litháíska",
        },
        {
          code: "mi",
          name: "maoríska",
        },
        {
          code: "nb",
          name: "norska",
        },
        {
          code: "fa",
          name: "persneska",
        },
        {
          code: "pt",
          name: "portúgalska",
        },
        {
          code: "pl",
          name: "pólska",
        },
        {
          code: "ro",
          name: "rúmenska",
        },
        {
          code: "ru",
          name: "rússneska",
        },
        {
          code: "sr",
          name: "serbneska",
        },
        {
          code: "gd",
          name: "skosk-gelíska",
        },
        {
          code: "sk",
          name: "slóvakíska",
        },
        {
          code: "sl",
          name: "slóvenska",
        },
        {
          code: "es",
          name: "spænska",
        },
        {
          code: "zu",
          name: "súlú",
        },
        {
          code: "sv",
          name: "sænska",
        },
        {
          code: "th",
          name: "taílenska",
        },
        {
          code: "cs",
          name: "tékkneska",
        },
        {
          code: "tr",
          name: "tyrkneska",
        },
        {
          code: "hu",
          name: "ungverska",
        },
        {
          code: "uk",
          name: "úkraínska",
        },
        {
          code: "cy",
          name: "velska",
        },
        {
          code: "vi",
          name: "víetnamska",
        },
        {
          code: "de",
          name: "þýska",
        },
        {
          code: "he",
          name: "hebreska",
        },
        {
          code: "zh-cn",
          name: "kínverska (einfölduð)",
        },
      ],
      it: [
        {
          code: "am",
          name: "Amarico",
        },
        {
          code: "ar",
          name: "Arabo",
        },
        {
          code: "az",
          name: "Azero",
        },
        {
          code: "eu",
          name: "Basco",
        },
        {
          code: "bg",
          name: "Bulgaro",
        },
        {
          code: "ca",
          name: "Catalano",
        },
        {
          code: "cs",
          name: "Ceco",
        },
        {
          code: "zh-cn",
          name: "Cinese (semplificato)",
        },
        {
          code: "zh-tw",
          name: "Cinese (tradizionale)",
        },
        {
          code: "ko",
          name: "Coreano",
        },
        {
          code: "hr",
          name: "Croato",
        },
        {
          code: "ckb",
          name: "Curdo (Sorani)",
        },
        {
          code: "da",
          name: "Danese",
        },
        {
          code: "he",
          name: "Ebraico",
        },
        {
          code: "et",
          name: "Estone",
        },
        {
          code: "fi",
          name: "Finlandese",
        },
        {
          code: "fr",
          name: "Francese",
        },
        {
          code: "gd",
          name: "Gaelico scozzese",
        },
        {
          code: "gl",
          name: "Galiziano",
        },
        {
          code: "cy",
          name: "Gallese",
        },
        {
          code: "ja",
          name: "Giapponese",
        },
        {
          code: "el",
          name: "Greco",
        },
        {
          code: "id",
          name: "Indonesiano",
        },
        {
          code: "en",
          name: "Inglese",
        },
        {
          code: "ga",
          name: "Irlandese",
        },
        {
          code: "is",
          name: "Islandese",
        },
        {
          code: "it",
          name: "Italiano",
        },
        {
          code: "lv",
          name: "Lettone",
        },
        {
          code: "lt",
          name: "Lituano",
        },
        {
          code: "mi",
          name: "Maori",
        },
        {
          code: "nb",
          name: "Norvegese",
        },
        {
          code: "nl",
          name: "Olandese",
        },
        {
          code: "fa",
          name: "Persiano",
        },
        {
          code: "pl",
          name: "Polacco",
        },
        {
          code: "pt",
          name: "Portoghese",
        },
        {
          code: "ro",
          name: "Rumeno",
        },
        {
          code: "ru",
          name: "Russo",
        },
        {
          code: "sr",
          name: "Serbo",
        },
        {
          code: "sk",
          name: "Slovacco",
        },
        {
          code: "sl",
          name: "Sloveno",
        },
        {
          code: "es",
          name: "Spagnolo",
        },
        {
          code: "sv",
          name: "Svedese",
        },
        {
          code: "de",
          name: "Tedesco",
        },
        {
          code: "th",
          name: "Thai",
        },
        {
          code: "tr",
          name: "Turco",
        },
        {
          code: "uk",
          name: "Ucraino",
        },
        {
          code: "hu",
          name: "Ungherese",
        },
        {
          code: "vi",
          name: "Vietnamita",
        },
        {
          code: "zu",
          name: "Zulu",
        },
        {
          code: "he",
          name: "Ebraico",
        },
        {
          code: "zh-cn",
          name: "Cinese (semplificato)",
        },
      ],
      ja: [
        {
          code: "is",
          name: "アイスランド語",
        },
        {
          code: "ga",
          name: "アイルランド語",
        },
        {
          code: "az",
          name: "アゼルバイジャン語",
        },
        {
          code: "am",
          name: "アムハラ語",
        },
        {
          code: "ar",
          name: "アラビア語",
        },
        {
          code: "it",
          name: "イタリア語",
        },
        {
          code: "id",
          name: "インドネシア語",
        },
        {
          code: "cy",
          name: "ウェールズ語",
        },
        {
          code: "uk",
          name: "ウクライナ語",
        },
        {
          code: "et",
          name: "エストニア語",
        },
        {
          code: "nl",
          name: "オランダ語",
        },
        {
          code: "ca",
          name: "カタルーニャ語",
        },
        {
          code: "gl",
          name: "ガリシア語",
        },
        {
          code: "el",
          name: "ギリシャ語",
        },
        {
          code: "ckb",
          name: "クルド語（ソラニー）",
        },
        {
          code: "hr",
          name: "クロアチア語",
        },
        {
          code: "sv",
          name: "スウェーデン語",
        },
        {
          code: "zu",
          name: "ズールー語",
        },
        {
          code: "gd",
          name: "スコットランド ゲール語",
        },
        {
          code: "es",
          name: "スペイン語",
        },
        {
          code: "sk",
          name: "スロバキア語",
        },
        {
          code: "sl",
          name: "スロベニア語",
        },
        {
          code: "sr",
          name: "セルビア語",
        },
        {
          code: "th",
          name: "タイ語",
        },
        {
          code: "cs",
          name: "チェコ語",
        },
        {
          code: "da",
          name: "デンマーク語",
        },
        {
          code: "de",
          name: "ドイツ語",
        },
        {
          code: "tr",
          name: "トルコ語",
        },
        {
          code: "nb",
          name: "ノルウェー語",
        },
        {
          code: "eu",
          name: "バスク語",
        },
        {
          code: "hu",
          name: "ハンガリー語",
        },
        {
          code: "fi",
          name: "フィンランド語",
        },
        {
          code: "fr",
          name: "フランス語",
        },
        {
          code: "bg",
          name: "ブルガリア語",
        },
        {
          code: "vi",
          name: "ベトナム語",
        },
        {
          code: "he",
          name: "ヘブライ語",
        },
        {
          code: "fa",
          name: "ペルシャ語",
        },
        {
          code: "pl",
          name: "ポーランド語",
        },
        {
          code: "pt",
          name: "ポルトガル語",
        },
        {
          code: "mi",
          name: "マオリ語",
        },
        {
          code: "lv",
          name: "ラトビア語",
        },
        {
          code: "lt",
          name: "リトアニア語",
        },
        {
          code: "ro",
          name: "ルーマニア語",
        },
        {
          code: "ru",
          name: "ロシア語",
        },
        {
          code: "en",
          name: "英語",
        },
        {
          code: "ko",
          name: "韓国語",
        },
        {
          code: "zh-cn",
          name: "中国語（簡体）",
        },
        {
          code: "zh-tw",
          name: "中国語（繁体）",
        },
        {
          code: "ja",
          name: "日本語",
        },
        {
          code: "he",
          name: "ヘブライ語",
        },
        {
          code: "zh-cn",
          name: "中国語（簡体）",
        },
      ],
      "ja-hira": [
        {
          code: "is",
          name: "アイスランド語",
        },
        {
          code: "ga",
          name: "アイルランド語",
        },
        {
          code: "az",
          name: "アゼルバイジャン語",
        },
        {
          code: "am",
          name: "アムハラ語",
        },
        {
          code: "ar",
          name: "アラビア語",
        },
        {
          code: "it",
          name: "イタリア語",
        },
        {
          code: "id",
          name: "インドネシア語",
        },
        {
          code: "cy",
          name: "ウェールズ語",
        },
        {
          code: "uk",
          name: "ウクライナ語",
        },
        {
          code: "et",
          name: "エストニア語",
        },
        {
          code: "nl",
          name: "オランダ語",
        },
        {
          code: "ca",
          name: "カタルーニャ語",
        },
        {
          code: "gl",
          name: "ガリシア語",
        },
        {
          code: "el",
          name: "ギリシャ語",
        },
        {
          code: "ckb",
          name: "クルド語（ソラニー）",
        },
        {
          code: "hr",
          name: "クロアチア語",
        },
        {
          code: "sv",
          name: "スウェーデン語",
        },
        {
          code: "zu",
          name: "ズールー語",
        },
        {
          code: "gd",
          name: "スコットランド ゲール語",
        },
        {
          code: "es",
          name: "スペイン語",
        },
        {
          code: "sk",
          name: "スロバキア語",
        },
        {
          code: "sl",
          name: "スロベニア語",
        },
        {
          code: "sr",
          name: "セルビア語",
        },
        {
          code: "th",
          name: "タイ語",
        },
        {
          code: "cs",
          name: "チェコ語",
        },
        {
          code: "da",
          name: "デンマーク語",
        },
        {
          code: "de",
          name: "ドイツ語",
        },
        {
          code: "tr",
          name: "トルコ語",
        },
        {
          code: "nb",
          name: "ノルウェー語",
        },
        {
          code: "eu",
          name: "バスク語",
        },
        {
          code: "hu",
          name: "ハンガリー語",
        },
        {
          code: "fi",
          name: "フィンランド語",
        },
        {
          code: "fr",
          name: "フランス語",
        },
        {
          code: "bg",
          name: "ブルガリア語",
        },
        {
          code: "vi",
          name: "ベトナム語",
        },
        {
          code: "he",
          name: "ヘブライ語",
        },
        {
          code: "fa",
          name: "ペルシャ語",
        },
        {
          code: "pl",
          name: "ポーランド語",
        },
        {
          code: "pt",
          name: "ポルトガル語",
        },
        {
          code: "mi",
          name: "マオリ語",
        },
        {
          code: "lv",
          name: "ラトビア語",
        },
        {
          code: "lt",
          name: "リトアニア語",
        },
        {
          code: "ro",
          name: "ルーマニア語",
        },
        {
          code: "ru",
          name: "ロシア語",
        },
        {
          code: "en",
          name: "英語",
        },
        {
          code: "ko",
          name: "韓国語",
        },
        {
          code: "zh-cn",
          name: "中国語（簡体）",
        },
        {
          code: "zh-tw",
          name: "中国語（繁体）",
        },
        {
          code: "ja",
          name: "日本語",
        },
        {
          code: "he",
          name: "ヘブライ語",
        },
        {
          code: "zh-cn",
          name: "中国語（簡体）",
        },
      ],
      ko: [
        {
          code: "gl",
          name: "갈리시아어",
        },
        {
          code: "el",
          name: "그리스어",
        },
        {
          code: "nl",
          name: "네덜란드어",
        },
        {
          code: "nb",
          name: "노르웨이어",
        },
        {
          code: "da",
          name: "덴마크어",
        },
        {
          code: "de",
          name: "독일어",
        },
        {
          code: "lv",
          name: "라트비아어",
        },
        {
          code: "ru",
          name: "러시아어",
        },
        {
          code: "ro",
          name: "루마니아어",
        },
        {
          code: "lt",
          name: "리투아니아어",
        },
        {
          code: "mi",
          name: "마오리어",
        },
        {
          code: "eu",
          name: "바스크어",
        },
        {
          code: "vi",
          name: "베트남어",
        },
        {
          code: "bg",
          name: "불가리아어",
        },
        {
          code: "sr",
          name: "세르비아어",
        },
        {
          code: "sv",
          name: "스웨덴어",
        },
        {
          code: "gd",
          name: "스코틀랜드 게일어",
        },
        {
          code: "es",
          name: "스페인어",
        },
        {
          code: "sk",
          name: "슬로바키아어",
        },
        {
          code: "sl",
          name: "슬로베니아어",
        },
        {
          code: "ar",
          name: "아랍어",
        },
        {
          code: "is",
          name: "아이슬란드어",
        },
        {
          code: "ga",
          name: "아일랜드어",
        },
        {
          code: "az",
          name: "아제르바이잔어",
        },
        {
          code: "am",
          name: "암하라어",
        },
        {
          code: "et",
          name: "에스토니아어",
        },
        {
          code: "en",
          name: "영어",
        },
        {
          code: "uk",
          name: "우크라이나어",
        },
        {
          code: "cy",
          name: "웨일즈어",
        },
        {
          code: "it",
          name: "이탈리아어",
        },
        {
          code: "id",
          name: "인도네시아어",
        },
        {
          code: "ja",
          name: "일본어",
        },
        {
          code: "zu",
          name: "줄루어",
        },
        {
          code: "zh-cn",
          name: "중국어(간체)",
        },
        {
          code: "zh-tw",
          name: "중국어(번체)",
        },
        {
          code: "cs",
          name: "체코어",
        },
        {
          code: "ca",
          name: "카탈로니아어",
        },
        {
          code: "ckb",
          name: "쿠르드어(소라니)",
        },
        {
          code: "hr",
          name: "크로아티아어",
        },
        {
          code: "th",
          name: "태국어",
        },
        {
          code: "tr",
          name: "터키어",
        },
        {
          code: "fa",
          name: "페르시아어",
        },
        {
          code: "pt",
          name: "포르투갈어",
        },
        {
          code: "pl",
          name: "폴란드어",
        },
        {
          code: "fr",
          name: "프랑스어",
        },
        {
          code: "fi",
          name: "핀란드어",
        },
        {
          code: "ko",
          name: "한국어",
        },
        {
          code: "hu",
          name: "헝가리어",
        },
        {
          code: "he",
          name: "히브리어",
        },
        {
          code: "he",
          name: "히브리어",
        },
        {
          code: "zh-cn",
          name: "중국어(간체)",
        },
      ],
      lt: [
        {
          code: "ga",
          name: "airių",
        },
        {
          code: "am",
          name: "amharų",
        },
        {
          code: "en",
          name: "anglų",
        },
        {
          code: "ar",
          name: "arabų",
        },
        {
          code: "az",
          name: "azerbaidžaniečių",
        },
        {
          code: "eu",
          name: "baskų",
        },
        {
          code: "bg",
          name: "bulgarų",
        },
        {
          code: "cs",
          name: "čekų",
        },
        {
          code: "da",
          name: "danų",
        },
        {
          code: "et",
          name: "estų",
        },
        {
          code: "gl",
          name: "galisų",
        },
        {
          code: "el",
          name: "graikų",
        },
        {
          code: "he",
          name: "hebrajų",
        },
        {
          code: "id",
          name: "indoneziečių",
        },
        {
          code: "is",
          name: "islandų",
        },
        {
          code: "es",
          name: "ispanų",
        },
        {
          code: "it",
          name: "italų",
        },
        {
          code: "ja",
          name: "japonų",
        },
        {
          code: "ca",
          name: "kataloniečių",
        },
        {
          code: "zh-cn",
          name: "kinų (supaprastinta)",
        },
        {
          code: "zh-tw",
          name: "kinų (tradicinė)",
        },
        {
          code: "ko",
          name: "korėjiečių",
        },
        {
          code: "hr",
          name: "kroatų",
        },
        {
          code: "ckb",
          name: "kurdų (soranių)",
        },
        {
          code: "lv",
          name: "latvių",
        },
        {
          code: "pl",
          name: "lenkų",
        },
        {
          code: "lt",
          name: "lietuvių",
        },
        {
          code: "mi",
          name: "maorių",
        },
        {
          code: "nb",
          name: "norvegų",
        },
        {
          code: "nl",
          name: "olandų",
        },
        {
          code: "fa",
          name: "persų",
        },
        {
          code: "pt",
          name: "portugalų",
        },
        {
          code: "fr",
          name: "prancūzų",
        },
        {
          code: "ro",
          name: "rumunų",
        },
        {
          code: "ru",
          name: "rusų",
        },
        {
          code: "sr",
          name: "serbų",
        },
        {
          code: "sk",
          name: "slovakų",
        },
        {
          code: "sl",
          name: "slovėnų",
        },
        {
          code: "fi",
          name: "suomių",
        },
        {
          code: "gd",
          name: "škotų",
        },
        {
          code: "sv",
          name: "švedų",
        },
        {
          code: "th",
          name: "tajų",
        },
        {
          code: "tr",
          name: "turkų",
        },
        {
          code: "uk",
          name: "ukrainiečių",
        },
        {
          code: "cy",
          name: "valų",
        },
        {
          code: "hu",
          name: "vengrų",
        },
        {
          code: "vi",
          name: "vietnamiečių",
        },
        {
          code: "de",
          name: "vokiečių",
        },
        {
          code: "zu",
          name: "zulusų",
        },
        {
          code: "he",
          name: "hebrajų",
        },
        {
          code: "zh-cn",
          name: "kinų (supaprastinta)",
        },
      ],
      lv: [
        {
          code: "am",
          name: "amharu",
        },
        {
          code: "en",
          name: "angļu",
        },
        {
          code: "ar",
          name: "arābu",
        },
        {
          code: "az",
          name: "azerbaidžāņu",
        },
        {
          code: "eu",
          name: "basku",
        },
        {
          code: "bg",
          name: "bulgāru",
        },
        {
          code: "cs",
          name: "čehu",
        },
        {
          code: "da",
          name: "dāņu",
        },
        {
          code: "fr",
          name: "franču",
        },
        {
          code: "gl",
          name: "galisiešu",
        },
        {
          code: "el",
          name: "grieķu",
        },
        {
          code: "nl",
          name: "holandiešu",
        },
        {
          code: "hr",
          name: "horvātu",
        },
        {
          code: "et",
          name: "igauņu",
        },
        {
          code: "id",
          name: "indonēziešu",
        },
        {
          code: "it",
          name: "itāļu",
        },
        {
          code: "he",
          name: "ivrits",
        },
        {
          code: "ga",
          name: "īru",
        },
        {
          code: "is",
          name: "īslandiešu",
        },
        {
          code: "ja",
          name: "japāņu",
        },
        {
          code: "ca",
          name: "katalāņu",
        },
        {
          code: "ko",
          name: "korejiešu",
        },
        {
          code: "ru",
          name: "krievu",
        },
        {
          code: "ckb",
          name: "kurdu (sorani)",
        },
        {
          code: "zh-tw",
          name: "ķīniešu (tradicionālā)",
        },
        {
          code: "zh-cn",
          name: "ķīniešu (vienkāršotā)",
        },
        {
          code: "lv",
          name: "latviešu",
        },
        {
          code: "lt",
          name: "lietuviešu",
        },
        {
          code: "mi",
          name: "maori",
        },
        {
          code: "nb",
          name: "norvēģu",
        },
        {
          code: "fa",
          name: "persiešu",
        },
        {
          code: "pl",
          name: "poļu",
        },
        {
          code: "pt",
          name: "portugāļu",
        },
        {
          code: "ro",
          name: "rumāņu",
        },
        {
          code: "sr",
          name: "serbu",
        },
        {
          code: "gd",
          name: "skotu gēlu",
        },
        {
          code: "sk",
          name: "slovāku",
        },
        {
          code: "sl",
          name: "slovēņu",
        },
        {
          code: "fi",
          name: "somu",
        },
        {
          code: "es",
          name: "spāņu",
        },
        {
          code: "th",
          name: "taju",
        },
        {
          code: "tr",
          name: "turku",
        },
        {
          code: "uk",
          name: "ukraiņu",
        },
        {
          code: "hu",
          name: "ungāru",
        },
        {
          code: "de",
          name: "vācu",
        },
        {
          code: "cy",
          name: "velsiešu",
        },
        {
          code: "vi",
          name: "vjetnamiešu",
        },
        {
          code: "zu",
          name: "zulu",
        },
        {
          code: "sv",
          name: "zviedru",
        },
        {
          code: "he",
          name: "ivrits",
        },
        {
          code: "zh-cn",
          name: "ķīniešu (vienkāršotā)",
        },
      ],
      mi: [
        {
          code: "az",
          name: "Ahepaitani",
        },
        {
          code: "ga",
          name: "Airihi",
        },
        {
          code: "am",
          name: "Amariki",
        },
        {
          code: "ar",
          name: "Arapi",
        },
        {
          code: "et",
          name: "Etōnia",
        },
        {
          code: "zh-tw",
          name: "Haina (Onamata)",
        },
        {
          code: "zh-cn",
          name: "Hainamana (Kua whakamāmātia)",
        },
        {
          code: "hu",
          name: "Hanekeria",
        },
        {
          code: "ja",
          name: "Hapanihi",
        },
        {
          code: "sr",
          name: "Herepia",
        },
        {
          code: "fi",
          name: "Hinerangi",
        },
        {
          code: "he",
          name: "Hiperu",
        },
        {
          code: "sk",
          name: "Horowākia",
        },
        {
          code: "sl",
          name: "Horowinia",
        },
        {
          code: "sv",
          name: "Huitene",
        },
        {
          code: "zu",
          name: "Huru",
        },
        {
          code: "en",
          name: "Ingarihi",
        },
        {
          code: "id",
          name: "Initonīhia",
        },
        {
          code: "it",
          name: "Itāriana",
        },
        {
          code: "gl",
          name: "Karihia",
        },
        {
          code: "ca",
          name: "Katarāna",
        },
        {
          code: "el",
          name: "Kiriki",
        },
        {
          code: "ko",
          name: "Kōreana",
        },
        {
          code: "hr",
          name: "Koroātiana",
        },
        {
          code: "tr",
          name: "Korukoru",
        },
        {
          code: "ckb",
          name: "Kūrihi (Horani)",
        },
        {
          code: "mi",
          name: "Māori",
        },
        {
          code: "nb",
          name: "Nōwei",
        },
        {
          code: "eu",
          name: "Pākihi",
        },
        {
          code: "es",
          name: "Pāniora",
        },
        {
          code: "fa",
          name: "Perēhia",
        },
        {
          code: "pl",
          name: "Pōrana",
        },
        {
          code: "pt",
          name: "Potukīhi",
        },
        {
          code: "bg",
          name: "Purukāriana",
        },
        {
          code: "lv",
          name: "Rāwhiana",
        },
        {
          code: "lt",
          name: "Rituānia",
        },
        {
          code: "ro",
          name: "Romānia",
        },
        {
          code: "ru",
          name: "Rūhia",
        },
        {
          code: "th",
          name: "Tai",
        },
        {
          code: "nl",
          name: "Tati",
        },
        {
          code: "da",
          name: "Tenemāka",
        },
        {
          code: "de",
          name: "Tiamana",
        },
        {
          code: "cs",
          name: "Tieke",
        },
        {
          code: "is",
          name: "Tiorangi",
        },
        {
          code: "gd",
          name: "Tuauri Kotarangi",
        },
        {
          code: "uk",
          name: "Ūkareiana",
        },
        {
          code: "cy",
          name: "Wēra",
        },
        {
          code: "vi",
          name: "Whitināmu",
        },
        {
          code: "fr",
          name: "Wīwī",
        },
        {
          code: "he",
          name: "Hiperu",
        },
        {
          code: "zh-cn",
          name: "Hainamana (Kua whakamāmātia)",
        },
      ],
      nb: [
        {
          code: "am",
          name: "amharisk",
        },
        {
          code: "ar",
          name: "arabisk",
        },
        {
          code: "az",
          name: "aserbajdsjansk",
        },
        {
          code: "eu",
          name: "baskisk",
        },
        {
          code: "bg",
          name: "bulgarsk",
        },
        {
          code: "da",
          name: "dansk",
        },
        {
          code: "en",
          name: "engelsk",
        },
        {
          code: "et",
          name: "estisk",
        },
        {
          code: "fa",
          name: "farsi",
        },
        {
          code: "fi",
          name: "finsk",
        },
        {
          code: "fr",
          name: "fransk",
        },
        {
          code: "gl",
          name: "galisisk",
        },
        {
          code: "el",
          name: "gresk",
        },
        {
          code: "he",
          name: "hebraisk",
        },
        {
          code: "id",
          name: "indonesisk",
        },
        {
          code: "ga",
          name: "irsk",
        },
        {
          code: "is",
          name: "islandsk",
        },
        {
          code: "it",
          name: "italiensk",
        },
        {
          code: "ja",
          name: "japansk",
        },
        {
          code: "ca",
          name: "katalansk",
        },
        {
          code: "zh-cn",
          name: "kinesisk (forenklet)",
        },
        {
          code: "zh-tw",
          name: "kinesisk (tradisjonell)",
        },
        {
          code: "ko",
          name: "koreansk",
        },
        {
          code: "hr",
          name: "kroatisk",
        },
        {
          code: "ckb",
          name: "kurdisk (sorani)",
        },
        {
          code: "lv",
          name: "latvisk",
        },
        {
          code: "lt",
          name: "litauisk",
        },
        {
          code: "mi",
          name: "maori",
        },
        {
          code: "nl",
          name: "nederlandsk",
        },
        {
          code: "nb",
          name: "norsk",
        },
        {
          code: "pl",
          name: "polsk",
        },
        {
          code: "pt",
          name: "portugisisk",
        },
        {
          code: "ro",
          name: "rumensk",
        },
        {
          code: "ru",
          name: "russisk",
        },
        {
          code: "sr",
          name: "serbisk",
        },
        {
          code: "gd",
          name: "skotsk gælisk",
        },
        {
          code: "sk",
          name: "slovakisk",
        },
        {
          code: "sl",
          name: "slovensk",
        },
        {
          code: "es",
          name: "spansk",
        },
        {
          code: "sv",
          name: "svensk",
        },
        {
          code: "th",
          name: "thai",
        },
        {
          code: "cs",
          name: "tsjekkisk",
        },
        {
          code: "tr",
          name: "tyrkisk",
        },
        {
          code: "de",
          name: "tysk",
        },
        {
          code: "uk",
          name: "ukrainsk",
        },
        {
          code: "hu",
          name: "ungarsk",
        },
        {
          code: "vi",
          name: "vietnamesisk",
        },
        {
          code: "cy",
          name: "walisisk",
        },
        {
          code: "zu",
          name: "zulu",
        },
        {
          code: "he",
          name: "hebraisk",
        },
        {
          code: "zh-cn",
          name: "kinesisk (forenklet)",
        },
      ],
      nl: [
        {
          code: "am",
          name: "Amharisch",
        },
        {
          code: "ar",
          name: "Arabisch",
        },
        {
          code: "az",
          name: "Azerbeidzjaans",
        },
        {
          code: "eu",
          name: "Baskisch",
        },
        {
          code: "bg",
          name: "Bulgaars",
        },
        {
          code: "ca",
          name: "Catalaans",
        },
        {
          code: "zh-tw",
          name: "Chinees (traditioneel)",
        },
        {
          code: "zh-cn",
          name: "Chinees (vereenvoudigd)",
        },
        {
          code: "da",
          name: "Deens",
        },
        {
          code: "de",
          name: "Duits",
        },
        {
          code: "en",
          name: "Engels",
        },
        {
          code: "et",
          name: "Ests",
        },
        {
          code: "fi",
          name: "Fins",
        },
        {
          code: "fr",
          name: "Frans",
        },
        {
          code: "gl",
          name: "Galicisch",
        },
        {
          code: "el",
          name: "Grieks",
        },
        {
          code: "he",
          name: "Hebreeuws",
        },
        {
          code: "hu",
          name: "Hongaars",
        },
        {
          code: "ga",
          name: "Iers",
        },
        {
          code: "is",
          name: "IJslands",
        },
        {
          code: "id",
          name: "Indonesisch",
        },
        {
          code: "it",
          name: "Italiaans",
        },
        {
          code: "ja",
          name: "Japans",
        },
        {
          code: "ckb",
          name: "Koerdisch (Sorani)",
        },
        {
          code: "ko",
          name: "Koreaans",
        },
        {
          code: "hr",
          name: "Kroatisch",
        },
        {
          code: "lv",
          name: "Lets",
        },
        {
          code: "lt",
          name: "Litouws",
        },
        {
          code: "mi",
          name: "Maori",
        },
        {
          code: "nl",
          name: "Nederlands",
        },
        {
          code: "nb",
          name: "Noors",
        },
        {
          code: "uk",
          name: "Oekraïens",
        },
        {
          code: "fa",
          name: "Perzisch",
        },
        {
          code: "pl",
          name: "Pools",
        },
        {
          code: "pt",
          name: "Portugees",
        },
        {
          code: "ro",
          name: "Roemeens",
        },
        {
          code: "ru",
          name: "Russisch",
        },
        {
          code: "gd",
          name: "Schots-Gaelisch",
        },
        {
          code: "sr",
          name: "Servisch",
        },
        {
          code: "sk",
          name: "Slovaaks",
        },
        {
          code: "sl",
          name: "Sloveens",
        },
        {
          code: "es",
          name: "Spaans",
        },
        {
          code: "th",
          name: "Thai",
        },
        {
          code: "cs",
          name: "Tsjechisch",
        },
        {
          code: "tr",
          name: "Turks",
        },
        {
          code: "vi",
          name: "Vietnamees",
        },
        {
          code: "cy",
          name: "Welsh",
        },
        {
          code: "zu",
          name: "Zoeloe",
        },
        {
          code: "sv",
          name: "Zweeds",
        },
        {
          code: "he",
          name: "Hebreeuws",
        },
        {
          code: "zh-cn",
          name: "Chinees (vereenvoudigd)",
        },
      ],
      pl: [
        {
          code: "am",
          name: "amharski",
        },
        {
          code: "en",
          name: "angielski",
        },
        {
          code: "ar",
          name: "arabski",
        },
        {
          code: "az",
          name: "azerski",
        },
        {
          code: "eu",
          name: "baskijski",
        },
        {
          code: "bg",
          name: "bułgarski",
        },
        {
          code: "zh-tw",
          name: "chiński (tradycyjny)",
        },
        {
          code: "zh-cn",
          name: "chiński (uproszczony)",
        },
        {
          code: "hr",
          name: "chorwacki",
        },
        {
          code: "cs",
          name: "czeski",
        },
        {
          code: "da",
          name: "duński",
        },
        {
          code: "et",
          name: "estoński",
        },
        {
          code: "fi",
          name: "fiński",
        },
        {
          code: "fr",
          name: "francuski",
        },
        {
          code: "gl",
          name: "galicyjski",
        },
        {
          code: "el",
          name: "grecki",
        },
        {
          code: "he",
          name: "hebrajski",
        },
        {
          code: "es",
          name: "hiszpański",
        },
        {
          code: "id",
          name: "indonezyjski",
        },
        {
          code: "ga",
          name: "irlandzki",
        },
        {
          code: "is",
          name: "islandzki",
        },
        {
          code: "ja",
          name: "japoński",
        },
        {
          code: "ca",
          name: "kataloński",
        },
        {
          code: "ko",
          name: "koreański",
        },
        {
          code: "ckb",
          name: "kurdyjski (sorani)",
        },
        {
          code: "lt",
          name: "litewski",
        },
        {
          code: "lv",
          name: "łotewski",
        },
        {
          code: "mi",
          name: "maoryski",
        },
        {
          code: "nl",
          name: "niderlandzki",
        },
        {
          code: "de",
          name: "niemiecki",
        },
        {
          code: "nb",
          name: "norweski",
        },
        {
          code: "fa",
          name: "perski",
        },
        {
          code: "pl",
          name: "polski",
        },
        {
          code: "pt",
          name: "portugalski",
        },
        {
          code: "ru",
          name: "rosyjski",
        },
        {
          code: "ro",
          name: "rumuński",
        },
        {
          code: "sr",
          name: "serbski",
        },
        {
          code: "sk",
          name: "słowacki",
        },
        {
          code: "sl",
          name: "słoweński",
        },
        {
          code: "gd",
          name: "szkocki gaelicki",
        },
        {
          code: "sv",
          name: "szwedzki",
        },
        {
          code: "th",
          name: "tajski",
        },
        {
          code: "tr",
          name: "turecki",
        },
        {
          code: "uk",
          name: "ukraiński",
        },
        {
          code: "cy",
          name: "walijski",
        },
        {
          code: "hu",
          name: "węgierski",
        },
        {
          code: "vi",
          name: "wietnamski",
        },
        {
          code: "it",
          name: "włoski",
        },
        {
          code: "zu",
          name: "zulu",
        },
        {
          code: "he",
          name: "hebrajski",
        },
        {
          code: "zh-cn",
          name: "chiński (uproszczony)",
        },
      ],
      pt: [
        {
          code: "de",
          name: "Alemão",
        },
        {
          code: "am",
          name: "Amárico",
        },
        {
          code: "ar",
          name: "Árabe",
        },
        {
          code: "az",
          name: "Azerbaijano",
        },
        {
          code: "eu",
          name: "Basco",
        },
        {
          code: "bg",
          name: "Búlgaro",
        },
        {
          code: "ca",
          name: "Catalão",
        },
        {
          code: "zh-cn",
          name: "Chinês (simplificado)",
        },
        {
          code: "zh-tw",
          name: "Chinês (tradicional)",
        },
        {
          code: "ko",
          name: "Coreano",
        },
        {
          code: "hr",
          name: "Croata",
        },
        {
          code: "ckb",
          name: "Curdo (sorâni)",
        },
        {
          code: "da",
          name: "Dinamarquês",
        },
        {
          code: "sk",
          name: "Eslovaco",
        },
        {
          code: "sl",
          name: "Esloveno",
        },
        {
          code: "es",
          name: "Espanhol",
        },
        {
          code: "et",
          name: "Estoniano",
        },
        {
          code: "fi",
          name: "Finlandês",
        },
        {
          code: "fr",
          name: "Francês",
        },
        {
          code: "gd",
          name: "Gaélico escocês",
        },
        {
          code: "gl",
          name: "Galego",
        },
        {
          code: "cy",
          name: "Galês",
        },
        {
          code: "el",
          name: "Grego",
        },
        {
          code: "he",
          name: "Hebraico",
        },
        {
          code: "nl",
          name: "Holandês",
        },
        {
          code: "hu",
          name: "Húngaro",
        },
        {
          code: "id",
          name: "Indonésio",
        },
        {
          code: "en",
          name: "Inglês",
        },
        {
          code: "ga",
          name: "Irlandês",
        },
        {
          code: "is",
          name: "Islandês",
        },
        {
          code: "it",
          name: "Italiano",
        },
        {
          code: "ja",
          name: "Japonês",
        },
        {
          code: "lv",
          name: "Letão",
        },
        {
          code: "lt",
          name: "Lituano",
        },
        {
          code: "mi",
          name: "Maori",
        },
        {
          code: "nb",
          name: "Norueguês",
        },
        {
          code: "fa",
          name: "Persa",
        },
        {
          code: "pl",
          name: "Polonês",
        },
        {
          code: "pt",
          name: "Português",
        },
        {
          code: "ro",
          name: "Romeno",
        },
        {
          code: "ru",
          name: "Russo",
        },
        {
          code: "sr",
          name: "Sérvio",
        },
        {
          code: "sv",
          name: "Sueco",
        },
        {
          code: "th",
          name: "Tailandês",
        },
        {
          code: "cs",
          name: "Tcheco",
        },
        {
          code: "tr",
          name: "Turco",
        },
        {
          code: "uk",
          name: "Ucraniano",
        },
        {
          code: "vi",
          name: "Vietnamita",
        },
        {
          code: "zu",
          name: "Zulu",
        },
        {
          code: "he",
          name: "Hebraico",
        },
        {
          code: "zh-cn",
          name: "Chinês (simplificado)",
        },
      ],
      "pt-br": [
        {
          code: "de",
          name: "Alemão",
        },
        {
          code: "am",
          name: "Amárico",
        },
        {
          code: "ar",
          name: "Árabe",
        },
        {
          code: "az",
          name: "Azerbaijano",
        },
        {
          code: "eu",
          name: "Basco",
        },
        {
          code: "bg",
          name: "Búlgaro",
        },
        {
          code: "ca",
          name: "Catalão",
        },
        {
          code: "zh-cn",
          name: "Chinês (simplificado)",
        },
        {
          code: "zh-tw",
          name: "Chinês (tradicional)",
        },
        {
          code: "ko",
          name: "Coreano",
        },
        {
          code: "hr",
          name: "Croata",
        },
        {
          code: "ckb",
          name: "Curdo (sorâni)",
        },
        {
          code: "da",
          name: "Dinamarquês",
        },
        {
          code: "sk",
          name: "Eslovaco",
        },
        {
          code: "sl",
          name: "Esloveno",
        },
        {
          code: "es",
          name: "Espanhol",
        },
        {
          code: "et",
          name: "Estoniano",
        },
        {
          code: "fi",
          name: "Finlandês",
        },
        {
          code: "fr",
          name: "Francês",
        },
        {
          code: "gd",
          name: "Gaélico escocês",
        },
        {
          code: "gl",
          name: "Galego",
        },
        {
          code: "cy",
          name: "Galês",
        },
        {
          code: "el",
          name: "Grego",
        },
        {
          code: "he",
          name: "Hebraico",
        },
        {
          code: "nl",
          name: "Holandês",
        },
        {
          code: "hu",
          name: "Húngaro",
        },
        {
          code: "id",
          name: "Indonésio",
        },
        {
          code: "en",
          name: "Inglês",
        },
        {
          code: "ga",
          name: "Irlandês",
        },
        {
          code: "is",
          name: "Islandês",
        },
        {
          code: "it",
          name: "Italiano",
        },
        {
          code: "ja",
          name: "Japonês",
        },
        {
          code: "lv",
          name: "Letão",
        },
        {
          code: "lt",
          name: "Lituano",
        },
        {
          code: "mi",
          name: "Maori",
        },
        {
          code: "nb",
          name: "Norueguês",
        },
        {
          code: "fa",
          name: "Persa",
        },
        {
          code: "pl",
          name: "Polonês",
        },
        {
          code: "pt",
          name: "Português",
        },
        {
          code: "ro",
          name: "Romeno",
        },
        {
          code: "ru",
          name: "Russo",
        },
        {
          code: "sr",
          name: "Sérvio",
        },
        {
          code: "sv",
          name: "Sueco",
        },
        {
          code: "th",
          name: "Tailandês",
        },
        {
          code: "cs",
          name: "Tcheco",
        },
        {
          code: "tr",
          name: "Turco",
        },
        {
          code: "uk",
          name: "Ucraniano",
        },
        {
          code: "vi",
          name: "Vietnamita",
        },
        {
          code: "zu",
          name: "Zulu",
        },
        {
          code: "he",
          name: "Hebraico",
        },
        {
          code: "zh-cn",
          name: "Chinês (simplificado)",
        },
      ],
      ro: [
        {
          code: "am",
          name: "Amharică",
        },
        {
          code: "ar",
          name: "Arabă",
        },
        {
          code: "az",
          name: "Azerbaidjană",
        },
        {
          code: "eu",
          name: "Bască",
        },
        {
          code: "bg",
          name: "Bulgară",
        },
        {
          code: "ca",
          name: "Catalană",
        },
        {
          code: "cs",
          name: "Cehă",
        },
        {
          code: "zh-cn",
          name: "Chineză (Simplificată)",
        },
        {
          code: "zh-tw",
          name: "Chineză (Tradițională)",
        },
        {
          code: "ko",
          name: "Coreeană",
        },
        {
          code: "hr",
          name: "Croată",
        },
        {
          code: "da",
          name: "Daneză",
        },
        {
          code: "he",
          name: "Ebraică",
        },
        {
          code: "en",
          name: "Engleză",
        },
        {
          code: "et",
          name: "Estonă",
        },
        {
          code: "fi",
          name: "Finlandeză",
        },
        {
          code: "fr",
          name: "Franceză",
        },
        {
          code: "cy",
          name: "Galeză",
        },
        {
          code: "gd",
          name: "Galica scoțiană",
        },
        {
          code: "gl",
          name: "Galiciană",
        },
        {
          code: "de",
          name: "Germană",
        },
        {
          code: "el",
          name: "Greacă",
        },
        {
          code: "id",
          name: "Indoneziană",
        },
        {
          code: "ga",
          name: "Irlandeză",
        },
        {
          code: "is",
          name: "Islandeză",
        },
        {
          code: "it",
          name: "Italiană",
        },
        {
          code: "ja",
          name: "Japoneză",
        },
        {
          code: "ckb",
          name: "Kurdă (Sorani)",
        },
        {
          code: "lv",
          name: "Letonă",
        },
        {
          code: "lt",
          name: "Lituaniană",
        },
        {
          code: "hu",
          name: "Maghiară",
        },
        {
          code: "mi",
          name: "Maori",
        },
        {
          code: "nl",
          name: "Neerlandeză",
        },
        {
          code: "nb",
          name: "Norvegiană",
        },
        {
          code: "fa",
          name: "Persană",
        },
        {
          code: "pl",
          name: "Poloneză",
        },
        {
          code: "pt",
          name: "Portugheză",
        },
        {
          code: "ro",
          name: "Română",
        },
        {
          code: "ru",
          name: "Rusă",
        },
        {
          code: "sr",
          name: "Sârbă",
        },
        {
          code: "sk",
          name: "Slovacă",
        },
        {
          code: "sl",
          name: "Slovenă",
        },
        {
          code: "es",
          name: "Spaniolă",
        },
        {
          code: "sv",
          name: "Suedeză",
        },
        {
          code: "th",
          name: "Thailandeză",
        },
        {
          code: "tr",
          name: "Turcă",
        },
        {
          code: "uk",
          name: "Ucraineană",
        },
        {
          code: "vi",
          name: "Vietnameză",
        },
        {
          code: "zu",
          name: "Zulu",
        },
        {
          code: "he",
          name: "Ebraică",
        },
        {
          code: "zh-cn",
          name: "Chineză (Simplificată)",
        },
      ],
      ru: [
        {
          code: "az",
          name: "азербайджанский",
        },
        {
          code: "am",
          name: "амхарский",
        },
        {
          code: "en",
          name: "английский",
        },
        {
          code: "ar",
          name: "арабский",
        },
        {
          code: "eu",
          name: "баскский",
        },
        {
          code: "bg",
          name: "болгарский",
        },
        {
          code: "cy",
          name: "валлийский",
        },
        {
          code: "hu",
          name: "венгерский",
        },
        {
          code: "vi",
          name: "вьетнамский",
        },
        {
          code: "gl",
          name: "галисийский",
        },
        {
          code: "el",
          name: "греческий",
        },
        {
          code: "da",
          name: "датский",
        },
        {
          code: "zu",
          name: "зулу",
        },
        {
          code: "he",
          name: "иврит",
        },
        {
          code: "id",
          name: "индонезийский",
        },
        {
          code: "ga",
          name: "ирландский",
        },
        {
          code: "is",
          name: "исландский",
        },
        {
          code: "es",
          name: "испанский",
        },
        {
          code: "it",
          name: "итальянский",
        },
        {
          code: "ca",
          name: "каталанский",
        },
        {
          code: "zh-tw",
          name: "китайский (традиционный)",
        },
        {
          code: "zh-cn",
          name: "китайский (упрощенный)",
        },
        {
          code: "ko",
          name: "корейский",
        },
        {
          code: "ckb",
          name: "курдский (сорани)",
        },
        {
          code: "lv",
          name: "латышский",
        },
        {
          code: "lt",
          name: "литовский",
        },
        {
          code: "mi",
          name: "маори",
        },
        {
          code: "de",
          name: "немецкий",
        },
        {
          code: "nl",
          name: "нидерландский",
        },
        {
          code: "nb",
          name: "норвежский",
        },
        {
          code: "pl",
          name: "польский",
        },
        {
          code: "pt",
          name: "португальский",
        },
        {
          code: "ro",
          name: "румынский",
        },
        {
          code: "ru",
          name: "русский",
        },
        {
          code: "sr",
          name: "сербский",
        },
        {
          code: "sk",
          name: "словацкий",
        },
        {
          code: "sl",
          name: "словенский",
        },
        {
          code: "th",
          name: "тайский",
        },
        {
          code: "tr",
          name: "турецкий",
        },
        {
          code: "uk",
          name: "украинский",
        },
        {
          code: "fa",
          name: "фарси",
        },
        {
          code: "fi",
          name: "финский",
        },
        {
          code: "fr",
          name: "французский",
        },
        {
          code: "hr",
          name: "хорватский",
        },
        {
          code: "cs",
          name: "чешский",
        },
        {
          code: "sv",
          name: "шведский",
        },
        {
          code: "gd",
          name: "шотландский (гэльский)",
        },
        {
          code: "et",
          name: "эстонский",
        },
        {
          code: "ja",
          name: "японский",
        },
        {
          code: "he",
          name: "иврит",
        },
        {
          code: "zh-cn",
          name: "китайский (упрощенный)",
        },
      ],
      sk: [
        {
          code: "am",
          name: "amharčina",
        },
        {
          code: "en",
          name: "angličtina",
        },
        {
          code: "ar",
          name: "arabčina",
        },
        {
          code: "az",
          name: "azerbajdžančina",
        },
        {
          code: "eu",
          name: "baskičtina",
        },
        {
          code: "bg",
          name: "bulharčina",
        },
        {
          code: "cs",
          name: "čeština",
        },
        {
          code: "zh-tw",
          name: "čínština (tradičná)",
        },
        {
          code: "zh-cn",
          name: "čínština (zjednodušená)",
        },
        {
          code: "da",
          name: "dánčina",
        },
        {
          code: "et",
          name: "estónčina",
        },
        {
          code: "fi",
          name: "fínčina",
        },
        {
          code: "fr",
          name: "francúzština",
        },
        {
          code: "gl",
          name: "galícijčina",
        },
        {
          code: "el",
          name: "gréčtina",
        },
        {
          code: "he",
          name: "hebrejčina",
        },
        {
          code: "nl",
          name: "holandčina",
        },
        {
          code: "hr",
          name: "chorvátčina",
        },
        {
          code: "id",
          name: "indonézština",
        },
        {
          code: "ga",
          name: "írčina",
        },
        {
          code: "is",
          name: "islandčina",
        },
        {
          code: "ja",
          name: "japončina",
        },
        {
          code: "ca",
          name: "katalánčina",
        },
        {
          code: "ko",
          name: "kórejčina",
        },
        {
          code: "ckb",
          name: "kurdčina (sorání)",
        },
        {
          code: "lt",
          name: "litovčina",
        },
        {
          code: "lv",
          name: "lotyština",
        },
        {
          code: "hu",
          name: "maďarčina",
        },
        {
          code: "mi",
          name: "maorijčina",
        },
        {
          code: "de",
          name: "nemčina",
        },
        {
          code: "nb",
          name: "nórčina",
        },
        {
          code: "fa",
          name: "perzština",
        },
        {
          code: "pl",
          name: "poľština",
        },
        {
          code: "pt",
          name: "portugalčina",
        },
        {
          code: "ro",
          name: "rumunčina",
        },
        {
          code: "ru",
          name: "ruština",
        },
        {
          code: "sk",
          name: "slovenčina",
        },
        {
          code: "sl",
          name: "slovinčina",
        },
        {
          code: "sr",
          name: "srbčina",
        },
        {
          code: "gd",
          name: "škótska gaelčina",
        },
        {
          code: "es",
          name: "španielčina",
        },
        {
          code: "sv",
          name: "švédčina",
        },
        {
          code: "it",
          name: "taliančina",
        },
        {
          code: "th",
          name: "thajčina",
        },
        {
          code: "tr",
          name: "turečtina",
        },
        {
          code: "uk",
          name: "ukrajinčina",
        },
        {
          code: "vi",
          name: "vietnamčina",
        },
        {
          code: "cy",
          name: "waleština",
        },
        {
          code: "zu",
          name: "zuluština",
        },
        {
          code: "he",
          name: "hebrejčina",
        },
        {
          code: "zh-cn",
          name: "čínština (zjednodušená)",
        },
      ],
      sl: [
        {
          code: "am",
          name: "amharščina",
        },
        {
          code: "en",
          name: "angleščina",
        },
        {
          code: "ar",
          name: "arabščina",
        },
        {
          code: "az",
          name: "azerbajdžanščina",
        },
        {
          code: "eu",
          name: "baskovščina",
        },
        {
          code: "bg",
          name: "bolgarščina",
        },
        {
          code: "cs",
          name: "češčina",
        },
        {
          code: "da",
          name: "danščina",
        },
        {
          code: "et",
          name: "estonščina",
        },
        {
          code: "fi",
          name: "finščina",
        },
        {
          code: "fr",
          name: "francoščina",
        },
        {
          code: "gl",
          name: "galicijščina",
        },
        {
          code: "el",
          name: "grščina",
        },
        {
          code: "he",
          name: "hebrejščina",
        },
        {
          code: "hr",
          name: "hrvaščina",
        },
        {
          code: "id",
          name: "indonezijščina",
        },
        {
          code: "ga",
          name: "irščina",
        },
        {
          code: "is",
          name: "islandščina",
        },
        {
          code: "it",
          name: "italijanščina",
        },
        {
          code: "ja",
          name: "japonščina",
        },
        {
          code: "ca",
          name: "katalonščina",
        },
        {
          code: "zh-cn",
          name: "kitajščina (poenostavljena)",
        },
        {
          code: "zh-tw",
          name: "kitajščina (tradicionalna)",
        },
        {
          code: "ko",
          name: "korejščina",
        },
        {
          code: "ckb",
          name: "kurdščina (soranščina)",
        },
        {
          code: "lv",
          name: "latvijščina",
        },
        {
          code: "lt",
          name: "litovščina",
        },
        {
          code: "hu",
          name: "madžarščina",
        },
        {
          code: "mi",
          name: "maorščina",
        },
        {
          code: "de",
          name: "nemščina",
        },
        {
          code: "nl",
          name: "nizozemščina",
        },
        {
          code: "nb",
          name: "norveščina",
        },
        {
          code: "fa",
          name: "perzijščina",
        },
        {
          code: "pl",
          name: "poljščina",
        },
        {
          code: "pt",
          name: "portugalščina",
        },
        {
          code: "ro",
          name: "romunščina",
        },
        {
          code: "ru",
          name: "ruščina",
        },
        {
          code: "sk",
          name: "slovaščina",
        },
        {
          code: "sl",
          name: "slovenščina",
        },
        {
          code: "sr",
          name: "srbščina",
        },
        {
          code: "gd",
          name: "škotska gelščina",
        },
        {
          code: "es",
          name: "španščina",
        },
        {
          code: "sv",
          name: "švedščina",
        },
        {
          code: "th",
          name: "tajščina",
        },
        {
          code: "tr",
          name: "turščina",
        },
        {
          code: "uk",
          name: "ukrajinščina",
        },
        {
          code: "cy",
          name: "valižanščina",
        },
        {
          code: "vi",
          name: "vietnamščina",
        },
        {
          code: "zu",
          name: "zulujščina",
        },
        {
          code: "he",
          name: "hebrejščina",
        },
        {
          code: "zh-cn",
          name: "kitajščina (poenostavljena)",
        },
      ],
      sr: [
        {
          code: "az",
          name: "азербејџански",
        },
        {
          code: "am",
          name: "амхарски",
        },
        {
          code: "ar",
          name: "арапски",
        },
        {
          code: "eu",
          name: "баскијски",
        },
        {
          code: "bg",
          name: "бугарски",
        },
        {
          code: "cy",
          name: "велшки",
        },
        {
          code: "vi",
          name: "вијетнамски",
        },
        {
          code: "gl",
          name: "галски",
        },
        {
          code: "el",
          name: "грчки",
        },
        {
          code: "da",
          name: "дански",
        },
        {
          code: "en",
          name: "енглески",
        },
        {
          code: "et",
          name: "естонски",
        },
        {
          code: "zu",
          name: "зулу",
        },
        {
          code: "id",
          name: "индонежански",
        },
        {
          code: "ga",
          name: "ирски",
        },
        {
          code: "is",
          name: "исландски",
        },
        {
          code: "it",
          name: "италијански",
        },
        {
          code: "ja",
          name: "јапански",
        },
        {
          code: "ca",
          name: "каталонски",
        },
        {
          code: "zh-cn",
          name: "кинески (поједностављени)",
        },
        {
          code: "zh-tw",
          name: "кинески (традиционални)",
        },
        {
          code: "ko",
          name: "корејски",
        },
        {
          code: "ckb",
          name: "курдски (сорани)",
        },
        {
          code: "lv",
          name: "летонски",
        },
        {
          code: "lt",
          name: "литвански",
        },
        {
          code: "hu",
          name: "мађарски",
        },
        {
          code: "mi",
          name: "маорски",
        },
        {
          code: "de",
          name: "немачки",
        },
        {
          code: "nb",
          name: "норвешки",
        },
        {
          code: "fa",
          name: "персијски",
        },
        {
          code: "pl",
          name: "пољски",
        },
        {
          code: "pt",
          name: "португалски",
        },
        {
          code: "ro",
          name: "румунски",
        },
        {
          code: "ru",
          name: "руски",
        },
        {
          code: "sk",
          name: "словачки",
        },
        {
          code: "sl",
          name: "словеначки",
        },
        {
          code: "sr",
          name: "српски",
        },
        {
          code: "th",
          name: "тајски",
        },
        {
          code: "tr",
          name: "турски",
        },
        {
          code: "uk",
          name: "украјински",
        },
        {
          code: "fi",
          name: "фински",
        },
        {
          code: "fr",
          name: "француски",
        },
        {
          code: "he",
          name: "хебрејски",
        },
        {
          code: "nl",
          name: "холандски",
        },
        {
          code: "hr",
          name: "хрватски",
        },
        {
          code: "cs",
          name: "чешки",
        },
        {
          code: "sv",
          name: "шведски",
        },
        {
          code: "gd",
          name: "шкотски галски",
        },
        {
          code: "es",
          name: "шпански",
        },
        {
          code: "he",
          name: "хебрејски",
        },
        {
          code: "zh-cn",
          name: "кинески (поједностављени)",
        },
      ],
      sv: [
        {
          code: "am",
          name: "amhariska",
        },
        {
          code: "ar",
          name: "arabiska",
        },
        {
          code: "az",
          name: "azerbajdzjanska",
        },
        {
          code: "eu",
          name: "baskiska",
        },
        {
          code: "bg",
          name: "bulgariska",
        },
        {
          code: "da",
          name: "danska",
        },
        {
          code: "en",
          name: "engelska",
        },
        {
          code: "et",
          name: "estniska",
        },
        {
          code: "fi",
          name: "finska",
        },
        {
          code: "fr",
          name: "franska",
        },
        {
          code: "gd",
          name: "gaeliska",
        },
        {
          code: "gl",
          name: "galiciska",
        },
        {
          code: "el",
          name: "grekiska",
        },
        {
          code: "he",
          name: "hebreiska",
        },
        {
          code: "id",
          name: "indonesiska",
        },
        {
          code: "ga",
          name: "irländska",
        },
        {
          code: "is",
          name: "isländska",
        },
        {
          code: "it",
          name: "italienska",
        },
        {
          code: "ja",
          name: "japanska",
        },
        {
          code: "ca",
          name: "katalanska",
        },
        {
          code: "zh-cn",
          name: "kinesiska (förenklad)",
        },
        {
          code: "zh-tw",
          name: "kinesiska (traditionell)",
        },
        {
          code: "ko",
          name: "koreanska",
        },
        {
          code: "hr",
          name: "kroatiska",
        },
        {
          code: "ckb",
          name: "kurdiska (sorani)",
        },
        {
          code: "lv",
          name: "lettiska",
        },
        {
          code: "lt",
          name: "litauiska",
        },
        {
          code: "mi",
          name: "maori",
        },
        {
          code: "nl",
          name: "nederländska",
        },
        {
          code: "nb",
          name: "norska",
        },
        {
          code: "fa",
          name: "persiska",
        },
        {
          code: "pl",
          name: "polska",
        },
        {
          code: "pt",
          name: "portugisiska",
        },
        {
          code: "ro",
          name: "rumänska",
        },
        {
          code: "ru",
          name: "ryska",
        },
        {
          code: "sr",
          name: "serbiska",
        },
        {
          code: "sk",
          name: "slovakiska",
        },
        {
          code: "sl",
          name: "slovenska",
        },
        {
          code: "es",
          name: "spanska",
        },
        {
          code: "sv",
          name: "svenska",
        },
        {
          code: "th",
          name: "thailändska",
        },
        {
          code: "cs",
          name: "tjeckiska",
        },
        {
          code: "tr",
          name: "turkiska",
        },
        {
          code: "de",
          name: "tyska",
        },
        {
          code: "uk",
          name: "ukrainska",
        },
        {
          code: "hu",
          name: "ungerska",
        },
        {
          code: "vi",
          name: "vietnamesiska",
        },
        {
          code: "cy",
          name: "walesiska",
        },
        {
          code: "zu",
          name: "zulu",
        },
        {
          code: "he",
          name: "hebreiska",
        },
        {
          code: "zh-cn",
          name: "kinesiska (förenklad)",
        },
      ],
      th: [
        {
          code: "el",
          name: "กรีก",
        },
        {
          code: "gl",
          name: "กาลิเชียน",
        },
        {
          code: "gd",
          name: "เกลิกสกอต",
        },
        {
          code: "ko",
          name: "เกาหลี",
        },
        {
          code: "ca",
          name: "คาตาลัน",
        },
        {
          code: "ckb",
          name: "เคิร์ด (โซรานี)",
        },
        {
          code: "hr",
          name: "โครเอเชีย",
        },
        {
          code: "zh-tw",
          name: "จีน (ตัวเต็ม)",
        },
        {
          code: "zh-cn",
          name: "จีน (ตัวย่อ)",
        },
        {
          code: "cs",
          name: "เช็ก",
        },
        {
          code: "zu",
          name: "ซูลู",
        },
        {
          code: "sr",
          name: "เซอร์เบียน",
        },
        {
          code: "ja",
          name: "ญี่ปุ่น",
        },
        {
          code: "nl",
          name: "ดัตช์",
        },
        {
          code: "da",
          name: "เดนมาร์ก",
        },
        {
          code: "tr",
          name: "ตุรกี",
        },
        {
          code: "th",
          name: "ไทย",
        },
        {
          code: "nb",
          name: "นอร์เวย์",
        },
        {
          code: "bg",
          name: "บัลแกเรีย",
        },
        {
          code: "eu",
          name: "บาสก์",
        },
        {
          code: "fa",
          name: "เปอร์เซีย",
        },
        {
          code: "pt",
          name: "โปรตุเกส",
        },
        {
          code: "pl",
          name: "โปแลนด์",
        },
        {
          code: "fr",
          name: "ฝรั่งเศส",
        },
        {
          code: "fi",
          name: "ฟินแลนด์",
        },
        {
          code: "mi",
          name: "เมารี",
        },
        {
          code: "uk",
          name: "ยูเครน",
        },
        {
          code: "de",
          name: "เยอรมัน",
        },
        {
          code: "ru",
          name: "รัสเซีย",
        },
        {
          code: "ro",
          name: "โรมาเนีย",
        },
        {
          code: "lv",
          name: "ลัตเวีย",
        },
        {
          code: "lt",
          name: "ลิทัวเนีย",
        },
        {
          code: "cy",
          name: "เวลส์",
        },
        {
          code: "vi",
          name: "เวียดนาม",
        },
        {
          code: "es",
          name: "สเปน",
        },
        {
          code: "sk",
          name: "สโลวัก",
        },
        {
          code: "sl",
          name: "สโลวีเนีย",
        },
        {
          code: "sv",
          name: "สวีเดน",
        },
        {
          code: "en",
          name: "อังกฤษ",
        },
        {
          code: "am",
          name: "อัมฮาริก",
        },
        {
          code: "az",
          name: "อาร์เซอร์ไบจัน",
        },
        {
          code: "ar",
          name: "อาหรับ",
        },
        {
          code: "it",
          name: "อิตาลี",
        },
        {
          code: "id",
          name: "อินโดนีเซีย",
        },
        {
          code: "et",
          name: "เอสโทเนีย",
        },
        {
          code: "is",
          name: "ไอซ์แลนด์",
        },
        {
          code: "ga",
          name: "ไอร์แลนด์",
        },
        {
          code: "hu",
          name: "ฮังการี",
        },
        {
          code: "he",
          name: "ฮีบรู",
        },
        {
          code: "he",
          name: "ฮีบรู",
        },
        {
          code: "zh-cn",
          name: "จีน (ตัวย่อ)",
        },
      ],
      tr: [
        {
          code: "de",
          name: "Almanca",
        },
        {
          code: "ar",
          name: "Arapça",
        },
        {
          code: "az",
          name: "Azerbaycan dili",
        },
        {
          code: "eu",
          name: "Baskça",
        },
        {
          code: "bg",
          name: "Bulgarca",
        },
        {
          code: "cs",
          name: "Çekçe",
        },
        {
          code: "zh-cn",
          name: "Çince (Basitleştirilmiş)",
        },
        {
          code: "zh-tw",
          name: "Çince (Geleneksel)",
        },
        {
          code: "da",
          name: "Danca",
        },
        {
          code: "id",
          name: "Endonezce",
        },
        {
          code: "et",
          name: "Estonyaca",
        },
        {
          code: "fa",
          name: "Farsça",
        },
        {
          code: "nl",
          name: "Felemenkçe",
        },
        {
          code: "fi",
          name: "Fince",
        },
        {
          code: "fr",
          name: "Fransızca",
        },
        {
          code: "cy",
          name: "Galce",
        },
        {
          code: "gl",
          name: "Galiçyaca",
        },
        {
          code: "am",
          name: "Habeşçe",
        },
        {
          code: "hr",
          name: "Hırvatça",
        },
        {
          code: "he",
          name: "İbranice",
        },
        {
          code: "en",
          name: "İngilizce",
        },
        {
          code: "ga",
          name: "İrlandaca",
        },
        {
          code: "gd",
          name: "İskoç Gaelcesi",
        },
        {
          code: "es",
          name: "İspanyolca",
        },
        {
          code: "sv",
          name: "İsveççe",
        },
        {
          code: "it",
          name: "İtalyanca",
        },
        {
          code: "is",
          name: "İzlandaca",
        },
        {
          code: "ja",
          name: "Japonca",
        },
        {
          code: "ca",
          name: "Katalanca",
        },
        {
          code: "ko",
          name: "Korece",
        },
        {
          code: "ckb",
          name: "Kürtçe (Sorani)",
        },
        {
          code: "pl",
          name: "Lehçe",
        },
        {
          code: "lv",
          name: "Letonca",
        },
        {
          code: "lt",
          name: "Litvanca",
        },
        {
          code: "hu",
          name: "Macarca",
        },
        {
          code: "mi",
          name: "Maori dili",
        },
        {
          code: "nb",
          name: "Norveççe",
        },
        {
          code: "pt",
          name: "Portekizce",
        },
        {
          code: "ro",
          name: "Romence",
        },
        {
          code: "ru",
          name: "Rusça",
        },
        {
          code: "sr",
          name: "Sırpça",
        },
        {
          code: "sk",
          name: "Slovakça",
        },
        {
          code: "sl",
          name: "Slovence",
        },
        {
          code: "th",
          name: "Tayca",
        },
        {
          code: "tr",
          name: "Türkçe",
        },
        {
          code: "uk",
          name: "Ukraynaca",
        },
        {
          code: "vi",
          name: "Vietnamca",
        },
        {
          code: "el",
          name: "Yunanca",
        },
        {
          code: "zu",
          name: "Zulu",
        },
        {
          code: "he",
          name: "İbranice",
        },
        {
          code: "zh-cn",
          name: "Çince (Basitleştirilmiş)",
        },
      ],
      uk: [
        {
          code: "az",
          name: "азербайджанська",
        },
        {
          code: "am",
          name: "амхарська",
        },
        {
          code: "en",
          name: "англійська",
        },
        {
          code: "ar",
          name: "арабська",
        },
        {
          code: "eu",
          name: "баскська",
        },
        {
          code: "bg",
          name: "болгарська",
        },
        {
          code: "vi",
          name: "в’єтнамська",
        },
        {
          code: "cy",
          name: "валлійська",
        },
        {
          code: "el",
          name: "грецька",
        },
        {
          code: "gl",
          name: "ґалісійська",
        },
        {
          code: "da",
          name: "данська",
        },
        {
          code: "et",
          name: "естонська",
        },
        {
          code: "zu",
          name: "зулу",
        },
        {
          code: "he",
          name: "іврит",
        },
        {
          code: "id",
          name: "індонезійська",
        },
        {
          code: "ga",
          name: "ірландська",
        },
        {
          code: "is",
          name: "ісландська",
        },
        {
          code: "es",
          name: "іспанська",
        },
        {
          code: "it",
          name: "італійська",
        },
        {
          code: "ca",
          name: "каталанська",
        },
        {
          code: "zh-cn",
          name: "китайська (спрощена)",
        },
        {
          code: "zh-tw",
          name: "китайська (традиційна)",
        },
        {
          code: "ko",
          name: "корейська",
        },
        {
          code: "ckb",
          name: "курдська (сорані)",
        },
        {
          code: "lv",
          name: "латиська",
        },
        {
          code: "lt",
          name: "литовська",
        },
        {
          code: "mi",
          name: "маорі",
        },
        {
          code: "nl",
          name: "нідерландська",
        },
        {
          code: "de",
          name: "німецька",
        },
        {
          code: "nb",
          name: "норвезька",
        },
        {
          code: "fa",
          name: "перська",
        },
        {
          code: "pl",
          name: "польська",
        },
        {
          code: "pt",
          name: "португальська",
        },
        {
          code: "ru",
          name: "російська",
        },
        {
          code: "ro",
          name: "румунська",
        },
        {
          code: "sr",
          name: "сербська",
        },
        {
          code: "sk",
          name: "словацька",
        },
        {
          code: "sl",
          name: "словенська",
        },
        {
          code: "th",
          name: "тайська",
        },
        {
          code: "tr",
          name: "турецька",
        },
        {
          code: "hu",
          name: "угорська",
        },
        {
          code: "uk",
          name: "українська",
        },
        {
          code: "fi",
          name: "фінська",
        },
        {
          code: "fr",
          name: "французька",
        },
        {
          code: "hr",
          name: "хорватська",
        },
        {
          code: "cs",
          name: "чеська",
        },
        {
          code: "sv",
          name: "шведська",
        },
        {
          code: "gd",
          name: "шотландська (ґельська)",
        },
        {
          code: "ja",
          name: "японська",
        },
        {
          code: "he",
          name: "іврит",
        },
        {
          code: "zh-cn",
          name: "китайська (спрощена)",
        },
      ],
      vi: [
        {
          code: "ar",
          name: "Ả Rập",
        },
        {
          code: "am",
          name: "Amharic",
        },
        {
          code: "en",
          name: "Anh",
        },
        {
          code: "az",
          name: "Azerbaijan",
        },
        {
          code: "pl",
          name: "Ba Lan",
        },
        {
          code: "fa",
          name: "Ba Tư",
        },
        {
          code: "eu",
          name: "Basque",
        },
        {
          code: "pt",
          name: "Bồ Đào Nha",
        },
        {
          code: "bg",
          name: "Bulgaria",
        },
        {
          code: "ca",
          name: "Catalan",
        },
        {
          code: "hr",
          name: "Croatia",
        },
        {
          code: "he",
          name: "Do Thái",
        },
        {
          code: "da",
          name: "Đan Mạch",
        },
        {
          code: "de",
          name: "Đức",
        },
        {
          code: "et",
          name: "Estonia",
        },
        {
          code: "gd",
          name: "Gael Scotland",
        },
        {
          code: "gl",
          name: "Galicia",
        },
        {
          code: "nl",
          name: "Hà Lan",
        },
        {
          code: "ko",
          name: "Hàn",
        },
        {
          code: "hu",
          name: "Hungary",
        },
        {
          code: "el",
          name: "Hy Lạp",
        },
        {
          code: "is",
          name: "Iceland",
        },
        {
          code: "id",
          name: "Indonesia",
        },
        {
          code: "ga",
          name: "Ireland",
        },
        {
          code: "ckb",
          name: "Kurd (Sorani)",
        },
        {
          code: "lv",
          name: "Latvia",
        },
        {
          code: "lt",
          name: "Litva",
        },
        {
          code: "mi",
          name: "Maori",
        },
        {
          code: "nb",
          name: "Na Uy",
        },
        {
          code: "ru",
          name: "Nga",
        },
        {
          code: "ja",
          name: "Nhật",
        },
        {
          code: "fr",
          name: "Pháp",
        },
        {
          code: "fi",
          name: "Phần Lan",
        },
        {
          code: "ro",
          name: "Rumani",
        },
        {
          code: "cs",
          name: "Séc",
        },
        {
          code: "sr",
          name: "Serbia",
        },
        {
          code: "sk",
          name: "Slovak",
        },
        {
          code: "sl",
          name: "Slovenia",
        },
        {
          code: "es",
          name: "Tây Ban Nha",
        },
        {
          code: "th",
          name: "Thái",
        },
        {
          code: "tr",
          name: "Thổ Nhĩ Kỳ",
        },
        {
          code: "sv",
          name: "Thụy Điển",
        },
        {
          code: "zh-cn",
          name: "Trung (Giản thể)",
        },
        {
          code: "zh-tw",
          name: "Trung (Phồn thể)",
        },
        {
          code: "uk",
          name: "Ukraina",
        },
        {
          code: "vi",
          name: "Việt",
        },
        {
          code: "cy",
          name: "Xứ Wales",
        },
        {
          code: "it",
          name: "Ý",
        },
        {
          code: "zu",
          name: "Zulu",
        },
        {
          code: "he",
          name: "Do Thái",
        },
        {
          code: "zh-cn",
          name: "Trung (Giản thể)",
        },
      ],
      "zh-cn": [
        {
          code: "ar",
          name: "阿拉伯语",
        },
        {
          code: "am",
          name: "阿姆哈拉语",
        },
        {
          code: "az",
          name: "阿塞拜疆语",
        },
        {
          code: "ga",
          name: "爱尔兰语",
        },
        {
          code: "et",
          name: "爱沙尼亚语",
        },
        {
          code: "eu",
          name: "巴斯克语",
        },
        {
          code: "bg",
          name: "保加利亚语",
        },
        {
          code: "is",
          name: "冰岛语",
        },
        {
          code: "pl",
          name: "波兰语",
        },
        {
          code: "fa",
          name: "波斯语",
        },
        {
          code: "da",
          name: "丹麦语",
        },
        {
          code: "de",
          name: "德语",
        },
        {
          code: "ru",
          name: "俄语",
        },
        {
          code: "fr",
          name: "法语",
        },
        {
          code: "fi",
          name: "芬兰语",
        },
        {
          code: "ko",
          name: "韩语",
        },
        {
          code: "nl",
          name: "荷兰语",
        },
        {
          code: "gl",
          name: "加利西亚语",
        },
        {
          code: "ca",
          name: "加泰罗尼亚语",
        },
        {
          code: "cs",
          name: "捷克语",
        },
        {
          code: "hr",
          name: "克罗地亚语",
        },
        {
          code: "ckb",
          name: "库尔德语（索拉尼）",
        },
        {
          code: "lv",
          name: "拉脱维亚语",
        },
        {
          code: "lt",
          name: "立陶宛语",
        },
        {
          code: "ro",
          name: "罗马尼亚语",
        },
        {
          code: "mi",
          name: "毛利语",
        },
        {
          code: "nb",
          name: "挪威语",
        },
        {
          code: "pt",
          name: "葡萄牙语",
        },
        {
          code: "ja",
          name: "日语",
        },
        {
          code: "sv",
          name: "瑞典语",
        },
        {
          code: "sr",
          name: "塞尔维亚语",
        },
        {
          code: "sk",
          name: "斯洛伐克语",
        },
        {
          code: "sl",
          name: "斯洛文尼亚语",
        },
        {
          code: "gd",
          name: "苏格兰盖尔语",
        },
        {
          code: "th",
          name: "泰语",
        },
        {
          code: "tr",
          name: "土耳其语",
        },
        {
          code: "cy",
          name: "威尔士语",
        },
        {
          code: "uk",
          name: "乌克兰语",
        },
        {
          code: "es",
          name: "西班牙语",
        },
        {
          code: "he",
          name: "希伯来语",
        },
        {
          code: "el",
          name: "希腊语",
        },
        {
          code: "hu",
          name: "匈牙利语",
        },
        {
          code: "it",
          name: "意大利语",
        },
        {
          code: "id",
          name: "印尼语",
        },
        {
          code: "en",
          name: "英语",
        },
        {
          code: "vi",
          name: "越南语",
        },
        {
          code: "zh-tw",
          name: "中文（繁体）",
        },
        {
          code: "zh-cn",
          name: "中文（简体）",
        },
        {
          code: "zu",
          name: "祖鲁语",
        },
        {
          code: "he",
          name: "希伯来语",
        },
        {
          code: "zh-cn",
          name: "中文（简体）",
        },
      ],
      "zh-tw": [
        {
          code: "tr",
          name: "土耳其文",
        },
        {
          code: "zh-tw",
          name: "中文 (繁體)",
        },
        {
          code: "zh-cn",
          name: "中文 (簡體)",
        },
        {
          code: "da",
          name: "丹麥文",
        },
        {
          code: "eu",
          name: "巴斯克文",
        },
        {
          code: "ja",
          name: "日文",
        },
        {
          code: "mi",
          name: "毛利文",
        },
        {
          code: "gl",
          name: "加里西亞文",
        },
        {
          code: "ca",
          name: "加泰隆尼亞文",
        },
        {
          code: "lt",
          name: "立陶宛文",
        },
        {
          code: "is",
          name: "冰島文",
        },
        {
          code: "hu",
          name: "匈牙利文",
        },
        {
          code: "id",
          name: "印尼文",
        },
        {
          code: "es",
          name: "西班牙文",
        },
        {
          code: "hr",
          name: "克羅埃西亞文",
        },
        {
          code: "he",
          name: "希伯來文",
        },
        {
          code: "el",
          name: "希臘文",
        },
        {
          code: "az",
          name: "亞塞拜然文",
        },
        {
          code: "lv",
          name: "拉脫維亞文",
        },
        {
          code: "fr",
          name: "法文",
        },
        {
          code: "fa",
          name: "波斯文",
        },
        {
          code: "pl",
          name: "波蘭文",
        },
        {
          code: "fi",
          name: "芬蘭文",
        },
        {
          code: "am",
          name: "阿姆哈拉文",
        },
        {
          code: "ar",
          name: "阿拉伯文",
        },
        {
          code: "ru",
          name: "俄文",
        },
        {
          code: "bg",
          name: "保加利亞文",
        },
        {
          code: "zu",
          name: "南非祖魯文",
        },
        {
          code: "cy",
          name: "威爾斯文",
        },
        {
          code: "en",
          name: "英文",
        },
        {
          code: "ckb",
          name: "庫德文 (索拉尼文)",
        },
        {
          code: "nb",
          name: "挪威文",
        },
        {
          code: "th",
          name: "泰文",
        },
        {
          code: "uk",
          name: "烏克蘭文",
        },
        {
          code: "cs",
          name: "捷克文",
        },
        {
          code: "nl",
          name: "荷蘭文",
        },
        {
          code: "sk",
          name: "斯洛伐克文",
        },
        {
          code: "sl",
          name: "斯洛維尼亞文",
        },
        {
          code: "vi",
          name: "越南文",
        },
        {
          code: "sr",
          name: "塞爾維亞文",
        },
        {
          code: "et",
          name: "愛沙尼亞文",
        },
        {
          code: "ga",
          name: "愛爾蘭文",
        },
        {
          code: "sv",
          name: "瑞典文",
        },
        {
          code: "it",
          name: "義大利文",
        },
        {
          code: "pt",
          name: "葡萄牙文",
        },
        {
          code: "de",
          name: "德文",
        },
        {
          code: "ko",
          name: "韓文",
        },
        {
          code: "ro",
          name: "羅馬尼亞文",
        },
        {
          code: "gd",
          name: "蘇格蘭蓋爾文",
        },
        {
          code: "he",
          name: "希伯來文",
        },
        {
          code: "zh-cn",
          name: "中文 (簡體)",
        },
      ],
      zu: [
        {
          code: "am",
          name: "Isi-Amharic",
        },
        {
          code: "ar",
          name: "Isi-Arabic",
        },
        {
          code: "az",
          name: "Isi-Azerbaijani",
        },
        {
          code: "nl",
          name: "Isi-Dutch",
        },
        {
          code: "et",
          name: "Isi-Estonia",
        },
        {
          code: "is",
          name: "Isi-Icelandic",
        },
        {
          code: "id",
          name: "Isi-Indonesia",
        },
        {
          code: "ga",
          name: "Isi-Irish",
        },
        {
          code: "uk",
          name: "Isi-Ukraine",
        },
        {
          code: "eu",
          name: "IsiBasque",
        },
        {
          code: "bg",
          name: "IsiBulgaria",
        },
        {
          code: "ca",
          name: "IsiCatalan",
        },
        {
          code: "zh-cn",
          name: "IsiChina (Esilulana)",
        },
        {
          code: "hr",
          name: "IsiCroatia",
        },
        {
          code: "cs",
          name: "IsiCzech",
        },
        {
          code: "da",
          name: "IsiDanish",
        },
        {
          code: "fi",
          name: "IsiFinnish",
        },
        {
          code: "fr",
          name: "IsiFrentshi",
        },
        {
          code: "gl",
          name: "IsiGalicia",
        },
        {
          code: "el",
          name: "IsiGrikhi",
        },
        {
          code: "he",
          name: "IsiHebheru",
        },
        {
          code: "hu",
          name: "IsiHungary",
        },
        {
          code: "de",
          name: "IsiJalimani",
        },
        {
          code: "ja",
          name: "IsiJaphani",
        },
        {
          code: "ko",
          name: "IsiKorean",
        },
        {
          code: "ckb",
          name: "IsiKurdish (saseSorani)",
        },
        {
          code: "lv",
          name: "IsiLatvian",
        },
        {
          code: "lt",
          name: "IsiLithuania",
        },
        {
          code: "mi",
          name: "IsiMaori",
        },
        {
          code: "en",
          name: "IsiNgisi",
        },
        {
          code: "nb",
          name: "IsiNorwegia",
        },
        {
          code: "it",
          name: "IsiNtaliyani",
        },
        {
          code: "fa",
          name: "IsiPersian",
        },
        {
          code: "pl",
          name: "IsiPolish",
        },
        {
          code: "pt",
          name: "IsiPutukezi",
        },
        {
          code: "ru",
          name: "IsiRashiya",
        },
        {
          code: "ro",
          name: "IsiRomania",
        },
        {
          code: "gd",
          name: "IsiScots Gaelic",
        },
        {
          code: "sr",
          name: "IsiSerbian",
        },
        {
          code: "sk",
          name: "IsiSlovak",
        },
        {
          code: "sl",
          name: "IsiSlovenia",
        },
        {
          code: "sv",
          name: "IsiSwidi",
        },
        {
          code: "th",
          name: "IsiThai",
        },
        {
          code: "tr",
          name: "IsiTurkish",
        },
        {
          code: "vi",
          name: "IsiVietnam",
        },
        {
          code: "cy",
          name: "IsiWelsh",
        },
        {
          code: "zu",
          name: "IsiZulu",
        },
        {
          code: "es",
          name: "ISpenishi",
        },
        {
          code: "he",
          name: "IsiHebheru",
        },
        {
          code: "zh-cn",
          name: "IsiChina (Esilulana)",
        },
      ],
    },
    nameMap: {
      abcaseg: "ab",
      abcaso: "ab",
      abchasais: "ab",
      abchasisch: "ab",
      abchaski: "ab",
      abchazisch: "ab",
      abchaziska: "ab",
      abchazų: "ab",
      abcházština: "ab",
      abcáisis: "ab",
      abecásio: "ab",
      abhaasi: "ab",
      abhaski: "ab",
      abhazca: "ab",
      abhază: "ab",
      abhaščina: "ab",
      abház: "ab",
      abhāzu: "ab",
      abjasio: "ab",
      abkasíska: "ab",
      abkaz: "ab",
      abkazisht: "ab",
      abkaż: "ab",
      abkhasisk: "ab",
      abkhaz: "ab",
      abkhaze: "ab",
      abkhaziera: "ab",
      abkhazo: "ab",
      abxaz: "ab",
      acerbaixano: "az",
      ahepaitani: "az",
      airihi: "ga",
      airių: "ga",
      airmeinis: "hy",
      airméinis: "hy",
      albaania: "sq",
      alban: "sq",
      albanais: "sq",
      albanees: "sq",
      albaneg: "sq",
      albanese: "sq",
      albaneză: "sq",
      albania: "sq",
      albanian: "sq",
      albaniera: "sq",
      albanisch: "sq",
      albaniż: "sq",
      albansk: "sq",
      albanska: "sq",
      albanski: "sq",
      albanyen: "sq",
      albanès: "sq",
      albanés: "sq",
      albanês: "sq",
      albanščina: "sq",
      albanų: "sq",
      albański: "sq",
      albàinis: "sq",
      albáinis: "sq",
      albán: "sq",
      albánčina: "sq",
      albánština: "sq",
      albāņu: "sq",
      alemana: "de",
      alemany: "de",
      alemán: "de",
      alemão: "de",
      allemand: "de",
      almaeneg: "de",
      alman: "de",
      almanca: "de",
      almanî: "de",
      amarico: "am",
      amarik: "am",
      amariki: "am",
      amarikisht: "am",
      ambarîkî: "am",
      amenyen: "hy",
      amhaari: "am",
      amhara: "am",
      amhareg: "am",
      amharera: "am",
      amharic: "am",
      amharică: "am",
      amharik: "am",
      amharique: "am",
      amharisch: "am",
      amharisk: "am",
      amhariska: "am",
      amharski: "am",
      amharu: "am",
      amharíska: "am",
      amharčina: "am",
      amharština: "am",
      amharščina: "am",
      amharų: "am",
      amhàric: "am",
      amhárico: "am",
      amtharais: "am",
      amxar: "am",
      amáiris: "am",
      amárico: "am",
      amēniana: "hy",
      amħari: "am",
      angielski: "en",
      anglais: "en",
      angleščina: "en",
      anglisht: "en",
      angličtina: "en",
      anglè: "en",
      anglès: "en",
      anglų: "en",
      angol: "en",
      angļu: "en",
      anh: "en",
      araabia: "ar",
      arab: "ar",
      arabais: "ar",
      arabe: "ar",
      arabeg: "ar",
      arabia: "ar",
      arabic: "ar",
      arabiera: "ar",
      arabisch: "ar",
      arabisht: "ar",
      arabisk: "ar",
      arabiska: "ar",
      arabo: "ar",
      arabski: "ar",
      arabíska: "ar",
      arabă: "ar",
      arabčina: "ar",
      arabština: "ar",
      arabščina: "ar",
      arabų: "ar",
      araibis: "ar",
      arapeinia: "sq",
      arapi: "ar",
      arapski: "ar",
      arapça: "ar",
      arman: "hy",
      armeană: "hy",
      armeenia: "hy",
      armeens: "hy",
      armen: "hy",
      armeneg: "hy",
      armeni: "hy",
      armenia: "hy",
      armenian: "hy",
      armeniera: "hy",
      armenio: "hy",
      armenisch: "hy",
      armenisht: "hy",
      armeniska: "hy",
      armeno: "hy",
      armensk: "hy",
      armenska: "hy",
      armenski: "hy",
      armenščina: "hy",
      arménien: "hy",
      arménčina: "hy",
      arménština: "hy",
      armênio: "hy",
      armēņu: "hy",
      armėnų: "hy",
      arnavutça: "sq",
      arnawudî: "sq",
      arābu: "ar",
      asarbaideànais: "az",
      asarbaiseáinis: "az",
      aserbaidschanisch: "az",
      aserbaidžaani: "az",
      aserbaijaneg: "az",
      aserbajdsjansk: "az",
      aserska: "az",
      azerbaidjană: "az",
      azerbaidžaniečių: "az",
      azerbaidžāņu: "az",
      azerbaijan: "az",
      azerbaijanera: "az",
      azerbaijani: "az",
      azerbaijano: "az",
      azerbajdzjanska: "az",
      azerbajdžanski: "az",
      azerbajdžančina: "az",
      azerbajdžanščina: "az",
      "azerbaycan dili": "az",
      azerbaycanî: "az",
      azerbeidzjaans: "az",
      azeri: "az",
      azerisht: "az",
      azero: "az",
      azerski: "az",
      azerí: "az",
      azèbajani: "az",
      azéri: "az",
      azərbaycan: "az",
      ażerbajġani: "az",
      "ba lan": "pl",
      "ba tư": "fa",
      "bahasa melayu": "ms",
      baltarusių: "be",
      baltkrievu: "be",
      barmčina: "my",
      barmština: "my",
      basc: "eu",
      bascais: "eu",
      basco: "eu",
      bască: "eu",
      basgais: "eu",
      basgeg: "eu",
      bask: "eu",
      baski: "eu",
      baskijski: "eu",
      baskisch: "eu",
      baskisht: "eu",
      baskisk: "eu",
      baskiska: "eu",
      baskičtina: "eu",
      baskneska: "eu",
      baskovščina: "eu",
      basku: "eu",
      baskça: "eu",
      baskî: "eu",
      baskų: "eu",
      basque: "eu",
      baszk: "eu",
      bealaruisis: "be",
      bealarúisis: "be",
      belanda: "nl",
      belarisyen: "be",
      belarus: "be",
      belarusian: "be",
      belarussia: "be",
      belarussisch: "be",
      belarussu: "be",
      belarusça: "be",
      belarwseg: "be",
      belarûsî: "be",
      belorusz: "be",
      beloruščina: "be",
      beurla: "en",
      "bhiet-namais": "vi",
      białoruski: "be",
      bielorrusiera: "be",
      bielorruso: "be",
      bielorrusso: "be",
      bielorusso: "be",
      bielorusă: "be",
      bieloruština: "be",
      bielorús: "be",
      bilgaryen: "bg",
      birma: "my",
      birmaans: "my",
      birman: "my",
      birmaniera: "my",
      birmanisch: "my",
      birmanisht: "my",
      birmano: "my",
      birmanês: "my",
      birmană: "my",
      birmański: "my",
      birmiečių: "my",
      birmiešu: "my",
      birmà: "my",
      biélorusse: "be",
      bjellorusisht: "be",
      bjeloruski: "be",
      bolgar: "bg",
      bolgarščina: "bg",
      bolgár: "bg",
      bolqar: "bg",
      breatnais: "cy",
      bugarski: "bg",
      bulgaaria: "bg",
      bulgaars: "bg",
      bulgarais: "bg",
      bulgarca: "bg",
      bulgare: "bg",
      bulgaria: "bg",
      bulgarian: "bg",
      bulgariera: "bg",
      bulgarisch: "bg",
      bulgariska: "bg",
      bulgaro: "bg",
      bulgarsk: "bg",
      bulgaru: "bg",
      bulgară: "bg",
      bulgarų: "bg",
      bulgáiris: "bg",
      bulgāru: "bg",
      bulharčina: "bg",
      bulharština: "bg",
      bullgarisht: "bg",
      burma: "my",
      burmaca: "my",
      burmai: "my",
      burmanski: "my",
      burmanščina: "my",
      burmesisk: "my",
      burmesiska: "my",
      bułgarski: "bg",
      bwlgareg: "bg",
      béarla: "en",
      búlgar: "bg",
      búlgaro: "bg",
      búlgarska: "bg",
      búrmíska: "my",
      bûlgarî: "bg",
      běloruština: "be",
      "bồ đào nha": "pt",
      canarés: "kn",
      canarês: "kn",
      cannadais: "kn",
      castellà: "es",
      catalaans: "ca",
      catalan: "ca",
      catalanais: "ca",
      catalaneg: "ca",
      catalano: "ca",
      catalană: "ca",
      català: "ca",
      catalán: "ca",
      catalão: "ca",
      catalóinis: "ca",
      ceco: "cs",
      cehă: "cs",
      ceko: "cs",
      checo: "cs",
      chex: "cs",
      "china (aks. sederhana)": "zh-cn",
      "china (aks. tradisional)": "zh-tw",
      "chinees (traditioneel)": "zh-tw",
      "chinees (vereenvoudigd)": "zh-cn",
      "chinese (simplified)": "zh-cn",
      "chinese (traditional)": "zh-tw",
      "chinesisch (traditionell)": "zh-tw",
      "chinesisch (vereinfacht)": "zh-cn",
      "chineză (simplificată)": "zh-cn",
      "chineză (tradițională)": "zh-tw",
      "chino (simplificado)": "zh-cn",
      "chino (tradicional)": "zh-tw",
      "chinois (simplifié)": "zh-cn",
      "chinois (traditionnel)": "zh-tw",
      "chinwa (senp)": "zh-cn",
      "chinwa (tradisyonèl)": "zh-tw",
      "chinés (simplificado)": "zh-cn",
      "chinés (tradicional)": "zh-tw",
      "chinês (simplificado)": "zh-cn",
      "chinês (tradicional)": "zh-tw",
      "chiński (tradycyjny)": "zh-tw",
      "chiński (uproszczony)": "zh-cn",
      chorvatština: "hr",
      chorvátčina: "hr",
      chorwacki: "hr",
      "cina (ringkas)": "zh-cn",
      "cina (tradisional)": "zh-tw",
      "cinese (semplificato)": "zh-cn",
      "cinese (tradizionale)": "zh-tw",
      "coirdis (curmainsis)": "ku",
      "coirdis (sóráinis)": "ckb",
      coirèanais: "ko",
      coreano: "ko",
      coreeană: "ko",
      coreà: "ko",
      coréen: "ko",
      "creol haiti": "ht",
      "creole (haiti)": "ht",
      "creole haiti": "ht",
      "creolo haitiano": "ht",
      "creolă haitiană": "ht",
      "crioll d'haití": "ht",
      "criollo haitiano": "ht",
      "crioulo haitiano": "ht",
      "criól háítí": "ht",
      croat: "hr",
      croata: "hr",
      croate: "hr",
      croateg: "hr",
      croatia: "hr",
      croatian: "hr",
      croato: "hr",
      croată: "hr",
      "créole haïtien": "ht",
      "crìtheol haidhti": "ht",
      cròthaisis: "hr",
      cróitis: "hr",
      cseh: "cs",
      cuimris: "cy",
      "curdo (kurmanji)": "ku",
      "curdo (sorani)": "ckb",
      "curdo (sorâni)": "ckb",
      "cwrdeg (kurmandji)": "ku",
      "cwrdeg (sorani)": "ckb",
      cymraeg: "cy",
      czech: "cs",
      czeski: "cs",
      "cànan nan tàidh": "th",
      cóiréis: "ko",
      "cùrdais (kurmanji)": "ku",
      "cùrdais (sorani)": "ckb",
      dan: "da",
      danca: "da",
      daneg: "da",
      danese: "da",
      daneză: "da",
      daniera: "da",
      danimarka: "da",
      danish: "da",
      danisht: "da",
      daniż: "da",
      danmhairgis: "da",
      danois: "da",
      dansk: "da",
      danska: "da",
      danski: "da",
      danwa: "da",
      danès: "da",
      danés: "da",
      danščina: "da",
      danų: "da",
      deens: "da",
      denmark: "da",
      deutsch: "de",
      dinamarqués: "da",
      dinamarquês: "da",
      "do thái": "he",
      duits: "de",
      duitsis: "nl",
      dutch: "nl",
      duński: "da",
      dán: "da",
      dánčina: "da",
      dánština: "da",
      dänisch: "da",
      dāņu: "da",
      eabhra: "he",
      eabhrais: "he",
      eadailtis: "it",
      eastoinis: "et",
      eastóinis: "et",
      ebraico: "he",
      ebraică: "he",
      ebrajk: "he",
      ebre: "he",
      eesti: "et",
      eidaleg: "it",
      eistneska: "et",
      endonezce: "id",
      endonezyayî: "id",
      endonezyen: "id",
      endou: "hi",
      engels: "en",
      engelsk: "en",
      engelska: "en",
      englanti: "en",
      engleski: "en",
      engleză: "en",
      englisch: "en",
      english: "en",
      enska: "en",
      eperānato: "eo",
      erebî: "ar",
      ermenice: "hy",
      erməni: "hy",
      errumaniera: "ro",
      errusiera: "ru",
      "eskoziako gaelikoa": "gd",
      eslovac: "sk",
      eslovaco: "sk",
      eslovakiera: "sk",
      esloveniera: "sl",
      esloveno: "sl",
      eslovè: "sl",
      espagnol: "es",
      espanhol: "es",
      espanja: "es",
      español: "es",
      esperanto: "eo",
      esperantoa: "eo",
      esperantoyî: "eo",
      esperantó: "eo",
      espéranto: "eo",
      estisk: "et",
      estnisch: "et",
      estniska: "et",
      eston: "et",
      estone: "et",
      estoneg: "et",
      estonia: "et",
      estonian: "et",
      estoniano: "et",
      estonien: "et",
      estoniera: "et",
      estonio: "et",
      estonisht: "et",
      estonià: "et",
      estonjan: "et",
      estonski: "et",
      estonyaca: "et",
      estonyen: "et",
      estonî: "et",
      estonă: "et",
      estonština: "et",
      estonščina: "et",
      estoński: "et",
      ests: "et",
      estónčina: "et",
      estų: "et",
      eszperantó: "eo",
      etōnia: "et",
      euskara: "eu",
      euskera: "eu",
      fars: "fa",
      farsi: "fa",
      farsça: "fa",
      farsî: "fa",
      felemenkçe: "nl",
      fenlandè: "fi",
      ffineg: "fi",
      fflemeg: "nl",
      ffrangeg: "fr",
      fietnameg: "vi",
      fin: "fi",
      fince: "fi",
      finland: "fi",
      finlandese: "fi",
      finlandeză: "fi",
      finlandia: "fi",
      finlandiera: "fi",
      finlandisht: "fi",
      finlandiż: "fi",
      finlandés: "fi",
      finlandês: "fi",
      finn: "fi",
      finnisch: "fi",
      finnish: "fi",
      finnois: "fi",
      finnska: "fi",
      fins: "fi",
      finsk: "fi",
      finska: "fi",
      finski: "fi",
      finès: "fi",
      finés: "fi",
      finština: "fi",
      finščina: "fi",
      fionlainnis: "fi",
      fionnlannais: "fi",
      fiński: "fi",
      fors: "fa",
      fraincis: "fr",
      fraingis: "fr",
      francese: "fr",
      franceză: "fr",
      francia: "fr",
      francouzština: "fr",
      francoščina: "fr",
      francuski: "fr",
      francès: "fr",
      francés: "fr",
      francês: "fr",
      francúzština: "fr",
      frans: "fr",
      franse: "fr",
      fransk: "fr",
      franska: "fr",
      fransuz: "fr",
      fransî: "fr",
      fransız: "fr",
      fransızca: "fr",
      frantsesa: "fr",
      französisch: "fr",
      français: "fr",
      franċiż: "fr",
      franču: "fr",
      french: "fr",
      frëngjisht: "fr",
      fínčina: "fi",
      fînlandî: "fi",
      gaeilge: "ga",
      "gaeilge na halban": "gd",
      "gael scotland": "gd",
      "gaeleg yr alban": "gd",
      "gaelic scotland": "gd",
      "gaelic tal-iskoċċiżi": "gd",
      "gaelico scozzese": "gd",
      gaelig: "ga",
      "gaelik ekosè": "gd",
      "gaelik skotlandia": "gd",
      gaeliska: "gd",
      gailìsis: "gl",
      gailísis: "gl",
      "gaiti-kreol": "ht",
      galce: "cy",
      galeegi: "gl",
      galego: "gl",
      galesa: "cy",
      galeză: "cy",
      "galica scoțiană": "gd",
      galicia: "gl",
      galician: "gl",
      galicianisht: "gl",
      galiciană: "gl",
      galicien: "gl",
      galicijština: "gl",
      galicijščina: "gl",
      galicisch: "gl",
      galicisk: "gl",
      galiciska: "gl",
      galicyjski: "gl",
      galiseg: "gl",
      "galishte skoceze": "gd",
      galisia: "gl",
      galisiešu: "gl",
      galisisk: "gl",
      galisiy: "gl",
      galisyen: "gl",
      galisíska: "gl",
      galisų: "gl",
      galiziano: "gl",
      galiziera: "gl",
      galizisch: "gl",
      galizjan: "gl",
      galiçyaca: "gl",
      galješki: "gl",
      gallec: "gl",
      gallego: "gl",
      gallese: "cy",
      gallois: "cy",
      "gal·lès": "cy",
      galés: "cy",
      galês: "cy",
      galíciai: "gl",
      galícijčina: "gl",
      galîsî: "gl",
      gaztelania: "es",
      "gaèlic escocès": "gd",
      "gaélico escocés": "gd",
      "gaélico escocês": "gd",
      "gaélique (écosse)": "gd",
      "gaêlîkî sikotlandî": "gd",
      gearmailtis: "de",
      gearmáinis: "de",
      german: "de",
      germană: "de",
      giapponese: "ja",
      gjermanisht: "de",
      golland: "nl",
      graikų: "el",
      greacă: "el",
      grec: "el",
      grecki: "el",
      greco: "el",
      greek: "el",
      grego: "el",
      grek: "el",
      grekiska: "el",
      greqisht: "el",
      gresk: "el",
      greziera: "el",
      griechisch: "el",
      grieg: "el",
      griego: "el",
      grieks: "el",
      grieķu: "el",
      groeg: "el",
      græsk: "el",
      grèigis: "el",
      grèk: "el",
      gréigis: "el",
      gréčtina: "el",
      gríska: "el",
      grčki: "el",
      grščina: "el",
      gwyddeleg: "ga",
      gàidhlig: "gd",
      görög: "el",
      għarbi: "ar",
      habeşçe: "am",
      "haina (onamata)": "zh-tw",
      "hainamana (kua whakamāmātia)": "zh-cn",
      "haiti kreol": "ht",
      "haiti kreyolu": "ht",
      "haitian creole": "ht",
      haitianisch: "ht",
      haitiešu: "ht",
      "haitijska kreolščina": "ht",
      haitikreooli: "ht",
      haitinkreoli: "ht",
      "haitisk kreolsk": "ht",
      haitiska: "ht",
      "haitská kreolčina": "ht",
      "haitská kreolština": "ht",
      "haićanski kreolski": "ht",
      "haičio kreolų": "ht",
      hanekeria: "hu",
      hapanihi: "ja",
      "haítískt kreólamál": "ht",
      "haïtiaans creools": "ht",
      hebraeg: "he",
      hebraico: "he",
      hebraisht: "he",
      hebraisk: "he",
      hebrajski: "he",
      hebrajų: "he",
      hebreera: "he",
      hebreeuws: "he",
      hebreiska: "he",
      hebrejski: "he",
      hebrejčina: "he",
      hebrejština: "he",
      hebrejščina: "he",
      hebreo: "he",
      hebreska: "he",
      hebreu: "he",
      hebrew: "he",
      hebräisch: "he",
      heebrea: "he",
      heprea: "he",
      herepia: "sr",
      "hiina (lihtsustatud)": "zh-cn",
      "hiina (traditsiooniline)": "zh-tw",
      hind: "hi",
      hindi: "hi",
      hindia: "hi",
      hindijščina: "hi",
      hindis: "hi",
      hindisht: "hi",
      hindu: "hi",
      hindí: "hi",
      hindčina: "hi",
      hindština: "hi",
      hinerangi: "fi",
      hintçe: "hi",
      hiondúis: "hi",
      hiperu: "he",
      hirwatî: "hr",
      hispaania: "es",
      hiszpański: "es",
      holandiešu: "nl",
      holandisht: "nl",
      holandês: "nl",
      holandčina: "nl",
      holandština: "nl",
      holendî: "nl",
      holland: "nl",
      hollandi: "nl",
      hollanti: "nl",
      hollenska: "nl",
      hongaars: "hu",
      hongarès: "hu",
      hongrois: "hu",
      horowinia: "sl",
      horowākia: "sk",
      horvaadi: "hr",
      horvát: "hr",
      horvātu: "hr",
      hrvatski: "hr",
      hrvaščina: "hr",
      huitene: "sv",
      hungaria: "hu",
      hungarian: "hu",
      hungariera: "hu",
      hungarisht: "hu",
      hungary: "hu",
      huru: "zu",
      hviderussisk: "be",
      hviterussisk: "be",
      hvítrússneska: "be",
      hwngareg: "hu",
      "hy lạp": "el",
      "hà lan": "nl",
      hàn: "ko",
      héber: "he",
      hébreu: "he",
      húngaro: "hu",
      "hûngarî (macarî)": "hu",
      hīni: "hi",
      hırvatça: "hr",
      "iaith corea": "ko",
      ibrani: "he",
      iceland: "is",
      icelandic: "is",
      iers: "ga",
      igauņu: "et",
      iiri: "ga",
      ijslands: "is",
      ikrenyen: "uk",
      ilandè: "ga",
      indinéisis: "id",
      indoneesia: "id",
      indonesi: "id",
      indonesia: "id",
      indonesian: "id",
      indonesiano: "id",
      indonesieg: "id",
      indonesiera: "id",
      indonesio: "id",
      indonesisch: "id",
      indonesisk: "id",
      indonesiska: "id",
      indonez: "id",
      indoneziană: "id",
      indoneziečių: "id",
      indonezijski: "id",
      indonezijščina: "id",
      indonezisht: "id",
      indonezyjski: "id",
      indoneżjan: "id",
      indonésien: "id",
      indonésio: "id",
      indonéz: "id",
      indonézština: "id",
      indonéština: "id",
      indonēziešu: "id",
      indónesíska: "id",
      ingarihi: "en",
      ingelesa: "en",
      inggeris: "en",
      inggris: "en",
      ingilis: "en",
      inglese: "en",
      inglise: "en",
      ingliz: "en",
      ingliż: "en",
      inglés: "en",
      inglês: "en",
      initonīhia: "id",
      "innd-innsis": "id",
      "innis-tìlis": "is",
      iodáilis: "it",
      ioruais: "nb",
      ireland: "ga",
      irisch: "ga",
      "irish gaelic": "ga",
      irland: "ga",
      irlandais: "ga",
      irlandera: "ga",
      irlandese: "ga",
      irlandeză: "ga",
      irlandisht: "ga",
      irlandiż: "ga",
      irlandzki: "ga",
      irlandès: "ga",
      irlandés: "ga",
      irlandês: "ga",
      irländska: "ga",
      irsk: "ga",
      irski: "ga",
      irština: "ga",
      irščina: "ga",
      "isi-abkhaz": "ab",
      "isi-albania": "sq",
      "isi-amharic": "am",
      "isi-arabic": "ar",
      "isi-armenian": "hy",
      "isi-azerbaijani": "az",
      "isi-dutch": "nl",
      "isi-esperanto": "eo",
      "isi-estonia": "et",
      "isi-icelandic": "is",
      "isi-indonesia": "id",
      "isi-irish": "ga",
      "isi-ukraine": "uk",
      "isi-uzbek": "uz",
      isibasque: "eu",
      isibelarus: "be",
      isibulgaria: "bg",
      isicatalan: "ca",
      "isichina (esilulana)": "zh-cn",
      "isicreole sasehaiti": "ht",
      isicroatia: "hr",
      isiczech: "cs",
      isidanish: "da",
      isifinnish: "fi",
      isifrentshi: "fr",
      isigalicia: "gl",
      isigrikhi: "el",
      isihebheru: "he",
      isihindi: "hi",
      isihungary: "hu",
      isijalimani: "de",
      isijaphani: "ja",
      isikannada: "kn",
      isikorean: "ko",
      "isikurdish (sasekurmanji)": "ku",
      "isikurdish (sasesorani)": "ckb",
      isilathini: "la",
      isilatvian: "lv",
      isilithuania: "lt",
      isimacedonian: "mk",
      isimalay: "ms",
      isimalayalam: "ml",
      isimaltese: "mt",
      isimaori: "mi",
      isimarathi: "mr",
      isimongolia: "mn",
      "isimyanmar (saseburmese)": "my",
      isingisi: "en",
      isinorwegia: "nb",
      isintaliyani: "it",
      isipersian: "fa",
      isipolish: "pl",
      isiputukezi: "pt",
      isirashiya: "ru",
      isiromania: "ro",
      "isiscots gaelic": "gd",
      isiserbian: "sr",
      isislovak: "sk",
      isislovenia: "sl",
      isiswidi: "sv",
      isitelugu: "te",
      isithai: "th",
      isiturkish: "tr",
      isivietnam: "vi",
      isiwelsh: "cy",
      isizulu: "zu",
      island: "is",
      islandais: "is",
      islandeg: "is",
      islandese: "is",
      islandeză: "is",
      islandi: "is",
      islandia: "is",
      islandiera: "is",
      islandisht: "is",
      islandiż: "is",
      islandsk: "is",
      islandski: "is",
      islandzki: "is",
      islandè: "is",
      islandès: "is",
      islandés: "is",
      islandês: "is",
      islandčina: "is",
      islandština: "is",
      islandščina: "is",
      islandų: "is",
      islanti: "is",
      isländisch: "is",
      isländska: "is",
      ispan: "es",
      ispanų: "es",
      ispenishi: "es",
      itaalia: "it",
      itali: "it",
      italia: "it",
      italiaans: "it",
      italian: "it",
      italiano: "it",
      italiană: "it",
      italien: "it",
      italienisch: "it",
      italiensk: "it",
      italienska: "it",
      italiera: "it",
      italijanščina: "it",
      italisht: "it",
      italià: "it",
      italyan: "it",
      italyen: "it",
      italština: "it",
      italų: "it",
      itāriana: "it",
      itāļu: "it",
      ivrit: "he",
      ivrits: "he",
      izbèk: "uz",
      izlandi: "is",
      i̇branice: "he",
      i̇ndoneziya: "id",
      i̇ngilizce: "en",
      i̇rland: "ga",
      i̇rlandaca: "ga",
      "i̇skoç gaelcesi": "gd",
      i̇sland: "is",
      i̇spanyolca: "es",
      i̇sveç: "sv",
      i̇sveççe: "sv",
      i̇talyan: "it",
      i̇talyanca: "it",
      i̇vrit: "he",
      i̇zlandaca: "is",
      jaapani: "ja",
      japaneg: "ja",
      japanese: "ja",
      japani: "ja",
      japanisch: "ja",
      japans: "ja",
      japansk: "ja",
      japanska: "ja",
      japanski: "ja",
      japonais: "ja",
      japonca: "ja",
      japoneză: "ja",
      japoniera: "ja",
      japonisht: "ja",
      japonè: "ja",
      japonès: "ja",
      japonés: "ja",
      japonês: "ja",
      japonî: "ja",
      japončina: "ja",
      japonština: "ja",
      japonščina: "ja",
      japonų: "ja",
      japoński: "ja",
      japán: "ja",
      japāņu: "ja",
      jepang: "ja",
      jepun: "ja",
      jerman: "de",
      kanada: "kn",
      kanadaisht: "kn",
      kanadų: "kn",
      kanaresiska: "kn",
      kanareščina: "kn",
      kanata: "kn",
      kannada: "kn",
      "kannada dili": "kn",
      kannadayî: "kn",
      kannadčina: "kn",
      kannadština: "kn",
      karihia: "gl",
      katalaani: "ca",
      katalan: "ca",
      katalana: "ca",
      katalanca: "ca",
      katalanisch: "ca",
      katalansk: "ca",
      katalanska: "ca",
      katalanî: "ca",
      kataloniečių: "ca",
      katalonisht: "ca",
      katalonski: "ca",
      katalonščina: "ca",
      kataloński: "ca",
      katalán: "ca",
      katalánčina: "ca",
      katalánština: "ca",
      katalónska: "ca",
      katalāņu: "ca",
      katarāna: "ca",
      "kereore haiti": "ht",
      "kid (koumanji)": "ku",
      "kid (sorani)": "ckb",
      "kiina (perinteinen)": "zh-tw",
      "kiina (yksinkertaistettu)": "zh-cn",
      "kinesisk (forenklet)": "zh-cn",
      "kinesisk (tradisjonell)": "zh-tw",
      "kinesisk (traditionelt)": "zh-tw",
      "kinesiska (förenklad)": "zh-cn",
      "kinesiska (traditionell)": "zh-tw",
      "kineski (pojednostavljeni)": "zh-cn",
      "kineski (tradicionalni)": "zh-tw",
      "kinezisht (e thjeshtuar)": "zh-cn",
      "kinezisht (tradicionale)": "zh-tw",
      "kinų (supaprastinta)": "zh-cn",
      "kinų (tradicinė)": "zh-tw",
      kiriki: "el",
      "kitajščina (poenostavljena)": "zh-cn",
      "kitajščina (tradicionalna)": "zh-tw",
      "koerdisch (kurmanji)": "ku",
      "koerdisch (sorani)": "ckb",
      korea: "ko",
      koreaans: "ko",
      koreai: "ko",
      korean: "ko",
      koreanisch: "ko",
      koreanisht: "ko",
      koreansk: "ko",
      koreanska: "ko",
      koreański: "ko",
      korece: "ko",
      koreera: "ko",
      korejiešu: "ko",
      korejski: "ko",
      korejština: "ko",
      korejščina: "ko",
      koreya: "ko",
      koreyen: "ko",
      koreys: "ko",
      koreyî: "ko",
      koroātiana: "hr",
      korukoru: "tr",
      korėjiečių: "ko",
      kreeka: "el",
      kreikka: "el",
      "kreol (haiti)": "ht",
      "kreol haiti": "ht",
      "kreolera (haiti)": "ht",
      "kreolishte haitiane": "ht",
      "kreolski (haiti)": "ht",
      "kreolê haîtî": "ht",
      "kreyòl ayisyen": "ht",
      krievu: "ru",
      kroasia: "hr",
      kroat: "hr",
      kroatia: "hr",
      kroatisch: "hr",
      kroatisht: "hr",
      kroatisk: "hr",
      kroatiska: "hr",
      kroatų: "hr",
      kroaziera: "hr",
      króatíska: "hr",
      "kurd (kurmandzsi)": "ku",
      "kurd (kurmanji)": "ku",
      "kurd (kurmonji)": "ku",
      "kurd (sorani)": "ckb",
      "kurd (szoráni)": "ckb",
      "kurde (kurmandji)": "ku",
      "kurde (sorani)": "ckb",
      "kurdi (kurmandži)": "ku",
      "kurdi (kurmanji)": "ku",
      "kurdi (sorani)": "ckb",
      "kurdi (soranî)": "ckb",
      "kurdisch (kurmandschi)": "ku",
      "kurdisch (sorani)": "ckb",
      "kurdish (kurmanji)": "ku",
      "kurdish (sorani)": "ckb",
      "kurdisht (kurmanjisht)": "ku",
      "kurdisht (sorani)": "ckb",
      "kurdisk (kurmanji)": "ku",
      "kurdisk (sorani)": "ckb",
      "kurdiska (kurmanji)": "ku",
      "kurdiska (sorani)": "ckb",
      "kurdistan (kurmanji)": "ku",
      "kurdistan (sorani)": "ckb",
      "kurdo (kurmanji)": "ku",
      "kurdo (kurmanyi)": "ku",
      "kurdo (sorani)": "ckb",
      "kurdski (kurmanji)": "ku",
      "kurdski (soranski)": "ckb",
      "kurdu (kurmandži)": "ku",
      "kurdu (sorani)": "ckb",
      "kurduera (kurmanji)": "ku",
      "kurduera (sorania)": "ckb",
      "kurdyjski (kurmandżi)": "ku",
      "kurdyjski (sorani)": "ckb",
      "kurdî (kurmancî)": "ku",
      "kurdî (soranî)": "ckb",
      "kurdă (kurmanji)": "ku",
      "kurdă (sorani)": "ckb",
      "kurdčina (kurmándží)": "ku",
      "kurdčina (sorání)": "ckb",
      kurdština: "ku",
      "kurdština (sorání)": "ckb",
      "kurdščina (kurmandži)": "ku",
      "kurdščina (soranščina)": "ckb",
      "kurdų (kurmandžių)": "ku",
      "kurdų (soranių)": "ckb",
      kwoasyen: "hr",
      kymri: "cy",
      "kínai (egyszerűsített)": "zh-cn",
      "kínai (hagyományos)": "zh-tw",
      "kínverska (einfölduð)": "zh-cn",
      "kínverska (hefðbundin)": "zh-tw",
      kórejčina: "ko",
      kóreska: "ko",
      "kúrdíska (kurmanji)": "ku",
      "kúrdíska (soraní)": "ckb",
      "kürd(kurmanci)": "ku",
      "kürd(sorani)": "ckb",
      "kürtçe (kurmançça)": "ku",
      "kürtçe (sorani)": "ckb",
      kōreana: "ko",
      "kūrihi (horani)": "ckb",
      "kūrihi (kurumanihi)": "ku",
      ladina: "la",
      laideann: "la",
      laidin: "la",
      laitbheis: "lv",
      laitvis: "lv",
      latein: "la",
      laten: "la",
      latfieg: "lv",
      latijn: "la",
      latim: "la",
      latin: "la",
      latina: "la",
      latince: "la",
      latinh: "la",
      latinisht: "la",
      latino: "la",
      latinski: "la",
      latină: "la",
      latinčina: "la",
      latinščina: "la",
      latish: "lv",
      latvia: "lv",
      latvian: "lv",
      latviešu: "lv",
      "latvijski/letonski": "lv",
      latvijščina: "lv",
      latvisk: "lv",
      latvių: "lv",
      latvjan: "lv",
      latín: "la",
      latína: "la",
      latînî: "la",
      latīņu: "la",
      latın: "la",
      latış: "lv",
      leedu: "lt",
      lehçe: "pl",
      lengyel: "pl",
      lenkų: "pl",
      letonca: "lv",
      letoniera: "lv",
      letonisht: "lv",
      letonyen: "lv",
      letonî: "lv",
      letonă: "lv",
      lets: "lv",
      lett: "lv",
      lettisch: "lv",
      lettisk: "lv",
      lettiska: "lv",
      lettneska: "lv",
      letton: "lv",
      lettone: "lv",
      letão: "lv",
      letó: "lv",
      letón: "lv",
      liettua: "lt",
      lietuviešu: "lt",
      lietuvių: "lt",
      liotuainis: "lt",
      liotuáinis: "lt",
      litauisch: "lt",
      litauisk: "lt",
      litauiska: "lt",
      litevština: "lt",
      litewski: "lt",
      lithuania: "lt",
      lithuanian: "lt",
      lithwaneg: "lt",
      litháíska: "lt",
      litouws: "lt",
      litovčina: "lt",
      litovščina: "lt",
      lituania: "lt",
      lituaniană: "lt",
      lituanien: "lt",
      lituaniera: "lt",
      lituanisht: "lt",
      lituano: "lt",
      lituà: "lt",
      litva: "lt",
      litvanca: "lt",
      litvanski: "lt",
      litván: "lt",
      litwen: "lt",
      lityanyen: "lt",
      lladin: "la",
      llatí: "la",
      lotin: "la",
      lotynų: "la",
      lotyština: "lv",
      läti: "lv",
      lîtvanî: "lt",
      macadóinis: "mk",
      macar: "hu",
      macarca: "hu",
      macedone: "mk",
      macedoneană: "mk",
      macedoneg: "mk",
      macedonia: "mk",
      macedonian: "mk",
      macedonio: "mk",
      macedonisch: "mk",
      macedoński: "mk",
      macedònic: "mk",
      macedón: "mk",
      macedónčina: "mk",
      macedônio: "mk",
      macédonien: "mk",
      madžarščina: "hu",
      "maenmar (burmais)": "my",
      maghiară: "hu",
      magyar: "hu",
      mailéalaimis: "ml",
      makedon: "mk",
      makedonca: "mk",
      makedonia: "mk",
      makedoniečių: "mk",
      makedoniya: "mk",
      makedonsk: "mk",
      makedonska: "mk",
      makedonski: "mk",
      makedonî: "mk",
      makedonština: "mk",
      makedonščina: "mk",
      makedoonia: "mk",
      makedónska: "mk",
      makerōnia: "mk",
      malabar: "ml",
      malabarera: "ml",
      malaeis: "ms",
      malaeză: "ms",
      malai: "ms",
      malaiala: "ml",
      malaidhis: "ms",
      malaiji: "ms",
      malaio: "ms",
      malaisien: "ms",
      malaiàlam: "ml",
      malajalaami: "ml",
      malajalam: "ml",
      malajalamiešu: "ml",
      malajalamisht: "ml",
      malajalamski: "ml",
      malajalių: "ml",
      malajalščina: "ml",
      malajiečių: "ms",
      malajiešu: "ms",
      malajisk: "ms",
      malajski: "ms",
      malajzisht: "ms",
      malajálam: "ml",
      malajálamština: "ml",
      malajámčina: "ml",
      malajíska: "ms",
      malajčina: "ms",
      malajština: "ms",
      malajščina: "ms",
      malasjan: "ms",
      malay: "ms",
      malayalam: "ml",
      "malayalam dili": "ml",
      malayalamî: "ml",
      malayca: "ms",
      malayisk: "ms",
      malayo: "ms",
      malaysiera: "ms",
      malaysisch: "ms",
      malaysiska: "ms",
      malayî: "ms",
      maleis: "ms",
      malese: "ms",
      malezijski: "ms",
      malt: "mt",
      malta: "mt",
      maltaca: "mt",
      maltais: "mt",
      maltayî: "mt",
      maltański: "mt",
      maltees: "mt",
      maltera: "mt",
      maltese: "mt",
      malteseg: "mt",
      maltesisch: "mt",
      maltesisk: "mt",
      maltesiska: "mt",
      malteză: "mt",
      malteški: "mt",
      malteščina: "mt",
      malti: "mt",
      maltiečių: "mt",
      maltiešu: "mt",
      maltisht: "mt",
      maltiy: "mt",
      maltneska: "mt",
      maltès: "mt",
      maltés: "mt",
      maltês: "mt",
      maltčina: "mt",
      maltština: "mt",
      maláj: "ms",
      malè: "ms",
      maoori: "mi",
      maorais: "mi",
      maori: "mi",
      "maori dili": "mi",
      maoriera: "mi",
      maorijčina: "mi",
      maorisht: "mi",
      maorių: "mi",
      maorski: "mi",
      maoryski: "mi",
      maorí: "mi",
      maoríska: "mi",
      maorîyî: "mi",
      maorština: "mi",
      maorščina: "mi",
      maqedonisht: "mk",
      maraitis: "mr",
      marata: "mr",
      marathera: "mr",
      marathi: "mr",
      marati: "mr",
      maratisht: "mr",
      maratu: "mr",
      maratxi: "mr",
      maratí: "mr",
      maratî: "mr",
      maratčina: "mr",
      maratščina: "mr",
      maratų: "mr",
      marei: "ms",
      mareiarama: "ml",
      maráthi: "mr",
      marátština: "mr",
      masadonais: "mk",
      masedonyen: "mk",
      mayori: "mi",
      mazedoniera: "mk",
      mazedonisch: "mk",
      maċedonjan: "mk",
      maďarčina: "hu",
      maďarština: "hu",
      mađarski: "hu",
      maķedoniešu: "mk",
      melayu: "ms",
      "miànmar (burmais)": "my",
      "mjanmar (burma)": "my",
      mongol: "mn",
      mongolais: "mn",
      mongoleg: "mn",
      mongoli: "mn",
      mongolia: "mn",
      mongolian: "mn",
      mongoliera: "mn",
      mongolisch: "mn",
      mongolisht: "mn",
      mongoliska: "mn",
      mongoljan: "mn",
      mongolo: "mn",
      mongolsk: "mn",
      mongolski: "mn",
      mongolyen: "mn",
      mongolă: "mn",
      mongolčina: "mn",
      mongolština: "mn",
      mongolščina: "mn",
      mongolų: "mn",
      mongools: "mn",
      mongoļu: "mn",
      mongóilis: "mn",
      mongólska: "mn",
      mongōriana: "mn",
      monqol: "mn",
      moxolî: "mn",
      moğolca: "mn",
      "myanma (birma)": "my",
      "myanma (burmese)": "my",
      myanmar: "my",
      "myanmar (burma)": "my",
      "myanmar (burmese)": "my",
      "myanmar (byrma)": "my",
      "myanmarî (burmese)": "my",
      máltai: "mt",
      máltais: "mt",
      "mã lai": "ms",
      "mông cổ": "mn",
      māori: "mi",
      māratihi: "mt",
      "na uy": "nb",
      nederlandera: "nl",
      nederlands: "nl",
      nederlandsk: "nl",
      nederländska: "nl",
      neerlandeză: "nl",
      neerlandès: "nl",
      neerlandés: "nl",
      nemis: "de",
      nemčina: "de",
      nemščina: "de",
      nga: "ru",
      nhật: "ja",
      niderlandzki: "nl",
      niederländisch: "nl",
      niemiecki: "de",
      nirribhis: "nb",
      nizozemski: "nl",
      nizozemščina: "nl",
      njemački: "de",
      noors: "nb",
      norja: "nb",
      norra: "nb",
      norsk: "nb",
      norska: "nb",
      noruec: "nb",
      noruego: "nb",
      noruegués: "nb",
      norueguês: "nb",
      norveg: "nb",
      norvegese: "nb",
      norvegiană: "nb",
      norvegiera: "nb",
      norvegjisht: "nb",
      norvegų: "nb",
      norveç: "nb",
      norveççe: "nb",
      norveġiż: "nb",
      norveški: "nb",
      norveščina: "nb",
      norvég: "nb",
      norvégien: "nb",
      norvēģu: "nb",
      norway: "nb",
      norwegia: "nb",
      norwegian: "nb",
      norwegisch: "nb",
      norweski: "nb",
      norwyeg: "nb",
      norwêcî: "nb",
      norština: "nb",
      néerlandais: "nl",
      német: "de",
      nòvejyen: "nb",
      nórčina: "nb",
      němčina: "de",
      nōwei: "nb",
      oekraïens: "uk",
      oezbeeks: "uz",
      olandese: "nl",
      olandiż: "nl",
      "olandè, neyèlandè": "nl",
      olandų: "nl",
      olasz: "it",
      ollainnis: "nl",
      onngaryen: "hu",
      ormiański: "hy",
      orosz: "ru",
      ouzbek: "uz",
      ozarbayjon: "az",
      ozbekî: "uz",
      "o‘zbek": "uz",
      panyòl: "es",
      parsi: "fa",
      peirsis: "fa",
      perancis: "fr",
      peraruhia: "be",
      persa: "fa",
      persan: "fa",
      persană: "fa",
      perseg: "fa",
      persia: "fa",
      persian: "fa",
      persiano: "fa",
      persiera: "fa",
      persiešu: "fa",
      persisch: "fa",
      persisht: "fa",
      persisk: "fa",
      persiska: "fa",
      persjan: "fa",
      perski: "fa",
      persneska: "fa",
      persų: "fa",
      perzijski: "fa",
      perzijščina: "fa",
      perzisch: "fa",
      perzsa: "fa",
      perzština: "fa",
      perēhia: "fa",
      perština: "fa",
      pháp: "fr",
      "phần lan": "fi",
      polacco: "pl",
      polaco: "pl",
      polainnis: "pl",
      poland: "pl",
      polandia: "pl",
      "polandî (lehîstanî)": "pl",
      polish: "pl",
      poljski: "pl",
      poljščina: "pl",
      pollakk: "pl",
      polnisch: "pl",
      polonais: "pl",
      poloneză: "pl",
      poloniera: "pl",
      polonisht: "pl",
      polonè: "pl",
      polonès: "pl",
      polonês: "pl",
      polsk: "pl",
      polska: "pl",
      polski: "pl",
      polyak: "pl",
      polština: "pl",
      poola: "pl",
      pools: "pl",
      portagailis: "pt",
      portaingéilis: "pt",
      portekizce: "pt",
      portekîzî: "pt",
      portiwgaleg: "pt",
      portoghese: "pt",
      portugais: "pt",
      portugal: "pt",
      portugali: "pt",
      portugalisht: "pt",
      portugalski: "pt",
      portugalčina: "pt",
      portugalština: "pt",
      portugalščina: "pt",
      portugalų: "pt",
      portugees: "pt",
      portugesa: "pt",
      portugheză: "pt",
      portugiesisch: "pt",
      portugis: "pt",
      portugisisk: "pt",
      portugisiska: "pt",
      portugiż: "pt",
      portuguese: "pt",
      portuguès: "pt",
      portugués: "pt",
      português: "pt",
      portugál: "pt",
      portugāļu: "pt",
      portuqal: "pt",
      portúgalska: "pt",
      potukīhi: "pt",
      poļu: "pl",
      poľština: "pl",
      prancis: "fr",
      prancūzų: "fr",
      prantsuse: "fr",
      puola: "pl",
      purukāriana: "bg",
      pwyleg: "pl",
      pärsia: "fa",
      pèsyen: "fa",
      pòlainnis: "pl",
      pòtigè: "pt",
      pólska: "pl",
      pākihi: "eu",
      pāniora: "es",
      "pēma (purumīhi)": "my",
      pōrana: "pl",
      qalisian: "gl",
      "quốc tế ngữ": "eo",
      ranska: "fr",
      ris: "ru",
      rituānia: "lt",
      roemeens: "ro",
      romania: "ro",
      romanian: "ro",
      romanyen: "ro",
      romanès: "ro",
      romanés: "ro",
      romanî: "ro",
      romence: "ro",
      romeno: "ro",
      romunščina: "ro",
      romàinis: "ro",
      román: "ro",
      română: "ro",
      romānia: "ro",
      rootsi: "sv",
      rosyjski: "ru",
      roumain: "ro",
      ruisis: "ru",
      rumani: "ro",
      rumania: "ro",
      rumanisht: "ro",
      rumano: "ro",
      rumeenia: "ro",
      rumen: "ro",
      rumeno: "ro",
      rumensk: "ro",
      rumin: "ro",
      rumunjski: "ro",
      rumunčina: "ro",
      rumunština: "ro",
      rumunų: "ro",
      rumuński: "ro",
      rumänisch: "ro",
      rumänska: "ro",
      rumænsk: "ro",
      rumāņu: "ro",
      rumın: "ro",
      ruotsi: "sv",
      rus: "ru",
      rusia: "ru",
      rusisht: "ru",
      ruski: "ru",
      ruso: "ru",
      russe: "ru",
      russian: "ru",
      russisch: "ru",
      russisk: "ru",
      russo: "ru",
      russu: "ru",
      rusça: "ru",
      rusă: "ru",
      rusų: "ru",
      ruština: "ru",
      ruščina: "ru",
      rwmaneg: "ro",
      rwsieg: "ru",
      ryska: "ru",
      rómáinis: "ro",
      rúisis: "ru",
      rúmenska: "ro",
      rússneska: "ru",
      rûsî: "ru",
      rātini: "la",
      rāwhiana: "lv",
      rūhia: "ru",
      saesneg: "en",
      saksa: "de",
      sbaeneg: "es",
      "schots-gaelisch": "gd",
      "schottisch-gälisch": "gd",
      schwedisch: "sv",
      "scots gaelic": "gd",
      seacais: "cs",
      seapanais: "ja",
      seapáinis: "ja",
      seicis: "cs",
      seirbis: "sr",
      sepanyol: "es",
      serb: "sr",
      serbe: "sr",
      serbeg: "sr",
      serbi: "sr",
      serbia: "sr",
      serbian: "sr",
      serbiera: "sr",
      serbio: "sr",
      serbisch: "sr",
      serbisht: "sr",
      serbisk: "sr",
      serbiska: "sr",
      serbneska: "sr",
      serbo: "sr",
      serbski: "sr",
      serbu: "sr",
      serbų: "sr",
      servisch: "sr",
      "shotland-gel": "gd",
      shqip: "sq",
      shved: "sv",
      sirbî: "sr",
      "skosk-gelíska": "gd",
      "skotsk gælisk": "gd",
      "skotská gaelština": "gd",
      skottigaeli: "gd",
      "skotu gēlu": "gd",
      "skót gael": "gd",
      sllovakisht: "sk",
      sllovenisht: "sl",
      slofaceg: "sk",
      slofeneg: "sl",
      slovaaks: "sk",
      slovacco: "sk",
      slovacă: "sk",
      slovak: "sk",
      slovaki: "sk",
      slovakia: "sk",
      slovakisk: "sk",
      slovakiska: "sk",
      slovakk: "sk",
      slovakça: "sk",
      slovakî: "sk",
      slovakų: "sk",
      slovaque: "sk",
      slovački: "sk",
      slovaščina: "sk",
      sloveeni: "sl",
      sloveens: "sl",
      sloven: "sl",
      slovence: "sl",
      slovenia: "sl",
      slovenian: "sl",
      sloveno: "sl",
      slovensk: "sl",
      slovenska: "sl",
      slovenski: "sl",
      slovenyayî: "sl",
      slovenyen: "sl",
      slovenă: "sl",
      slovenčina: "sk",
      slovenština: "sk",
      slovenščina: "sl",
      slovinčina: "sl",
      slovinština: "sl",
      slovène: "sl",
      slovāku: "sk",
      slovēņu: "sl",
      slovėnų: "sl",
      slowakisch: "sk",
      slowenisch: "sl",
      slòbhacais: "sk",
      slòbhainis: "sl",
      slóivéinis: "sl",
      slóvaicis: "sk",
      slóvakíska: "sk",
      slóvenska: "sl",
      somu: "fi",
      soome: "fi",
      spaans: "es",
      spagnolo: "es",
      spaniolă: "es",
      spanisch: "es",
      spanish: "es",
      spanjisht: "es",
      spanjol: "es",
      spansk: "es",
      spanska: "es",
      spanyol: "es",
      spàinntis: "es",
      spáinnis: "es",
      spænska: "es",
      spāņu: "es",
      srbčina: "sr",
      srbština: "sr",
      srbščina: "sr",
      srpski: "sr",
      suainis: "sv",
      sualainnis: "sv",
      suec: "sv",
      sueco: "sv",
      suedeză: "sv",
      suediera: "sv",
      suedisht: "sv",
      suomi: "fi",
      suomių: "fi",
      suulu: "zu",
      suédois: "sv",
      svedese: "sv",
      svediż: "sv",
      svensk: "sv",
      svenska: "sv",
      svéd: "sv",
      swedeg: "sv",
      sweden: "sv",
      swedia: "sv",
      swedish: "sv",
      swlw: "zu",
      swêdî: "sv",
      syedwa: "sv",
      szerb: "sr",
      "szkocki gaelicki": "gd",
      szlovák: "sk",
      szlovén: "sl",
      szwedzki: "sv",
      sârbă: "sr",
      sænska: "sv",
      sèb: "sr",
      sèirbis: "sr",
      séc: "cs",
      sérvio: "sr",
      "sìonais (seann-nòsach)": "zh-tw",
      "sìonais (sìmplichte)": "zh-cn",
      "sínis (simplithe)": "zh-cn",
      "sínis (traidisiúnta)": "zh-tw",
      súlú: "zu",
      súlúis: "zu",
      sırpça: "sr",
      słowacki: "sk",
      słoweński: "sl",
      taani: "da",
      tai: "th",
      tailandés: "th",
      tailandês: "th",
      tajlandisht: "th",
      tajlandiż: "th",
      tajlandski: "th",
      tajski: "th",
      taju: "th",
      tajščina: "th",
      tajų: "th",
      taliančina: "it",
      talijanski: "it",
      taljan: "it",
      tanska: "da",
      tati: "nl",
      tay: "th",
      tayca: "th",
      tayî: "th",
      taílenska: "th",
      tcheco: "cs",
      tchèque: "cs",
      tedesco: "de",
      teileagúis: "te",
      teleguyî: "te",
      telugisht: "te",
      telugo: "te",
      telugu: "te",
      "telugu dili": "te",
      telugua: "te",
      telugú: "te",
      telugčina: "te",
      telugų: "te",
      teluqu: "te",
      teluščina: "te",
      telužština: "te",
      telwgw: "te",
      tenemāka: "da",
      teruku: "te",
      thai: "th",
      thailandeză: "th",
      thailandiera: "th",
      thailandsk: "th",
      thailändisch: "th",
      thailändska: "th",
      thajčina: "th",
      thajština: "th",
      thaï: "th",
      thái: "th",
      "thổ nhĩ kỳ": "tr",
      "thụy điển": "sv",
      tiamana: "de",
      tieke: "cs",
      tiorangi: "is",
      tirkî: "tr",
      tjeckiska: "cs",
      tjekkisk: "cs",
      tork: "tr",
      "trung (giản thể)": "zh-cn",
      "trung (phồn thể)": "zh-tw",
      tschechisch: "cs",
      tsekki: "cs",
      tsieceg: "cs",
      "tsieineeg (traddodiadol)": "zh-tw",
      "tsieineeg (wedi symleiddio)": "zh-cn",
      tsjechisch: "cs",
      tsjekkisk: "cs",
      "tuauri kotarangi": "gd",
      tuircis: "tr",
      tuk: "tr",
      turc: "tr",
      turcais: "tr",
      turco: "tr",
      turcă: "tr",
      turecki: "tr",
      turečtina: "tr",
      turk: "tr",
      turki: "tr",
      turkiera: "tr",
      turkish: "tr",
      turkiska: "tr",
      turkiye: "tr",
      turkki: "tr",
      turks: "tr",
      turku: "tr",
      turkų: "tr",
      turqisht: "tr",
      turski: "tr",
      turščina: "tr",
      twrceg: "tr",
      txec: "cs",
      txekiera: "cs",
      "txinera (sinplifikatua)": "zh-cn",
      "txinera (tradizionala)": "zh-tw",
      tyrkisk: "tr",
      tyrkneska: "tr",
      tysk: "de",
      tyska: "de",
      tyèk: "cs",
      "tây ban nha": "es",
      téalainnis: "th",
      tékkneska: "cs",
      török: "tr",
      türgi: "tr",
      türk: "tr",
      türkisch: "tr",
      türkçe: "tr",
      tšehhi: "cs",
      ucraineană: "uk",
      ucraino: "uk",
      ucraniano: "uk",
      ucraíno: "uk",
      ucraïnès: "uk",
      ucràinis: "uk",
      uellsisht: "cy",
      uels: "cy",
      uelsi: "cy",
      uhipeke: "uz",
      ukrain: "uk",
      ukraina: "uk",
      ukraine: "uk",
      ukrainera: "uk",
      ukrainian: "uk",
      ukrainien: "uk",
      ukrainiečių: "uk",
      ukrainisch: "uk",
      ukrainisht: "uk",
      ukrainsk: "uk",
      ukrainska: "uk",
      ukraiński: "uk",
      ukraiņu: "uk",
      ukrajinski: "uk",
      ukrajinčina: "uk",
      ukrajinština: "uk",
      ukrajinščina: "uk",
      ukrayna: "uk",
      ukraynaca: "uk",
      ukren: "uk",
      ukrán: "uk",
      ungairis: "hu",
      ungari: "hu",
      ungarisch: "hu",
      ungarsk: "hu",
      ungeriż: "hu",
      ungerska: "hu",
      ungherese: "hu",
      ungverska: "hu",
      ungáiris: "hu",
      ungāru: "hu",
      unkari: "hu",
      usbagais: "uz",
      usbec: "uz",
      usbeki: "uz",
      usbekisch: "uz",
      usbekisk: "uz",
      uzbecki: "uz",
      uzbeco: "uz",
      uzbecă: "uz",
      uzbek: "uz",
      uzbekera: "uz",
      uzbekisht: "uz",
      uzbekiska: "uz",
      uzbekistanski: "uz",
      uzbekki: "uz",
      uzbeko: "uz",
      uzbeku: "uz",
      uzbekų: "uz",
      uzbeque: "uz",
      uzbečtina: "uz",
      uzbeščina: "uz",
      użbek: "uz",
      valgevene: "be",
      valižanščina: "cy",
      valkovenäjä: "be",
      valliy: "cy",
      valų: "cy",
      velsiešu: "cy",
      velska: "cy",
      velški: "cy",
      velština: "cy",
      vene: "ru",
      venger: "hu",
      vengrų: "hu",
      venäjä: "ru",
      vietnam: "vi",
      vietnamca: "vi",
      vietnamees: "vi",
      vietnamera: "vi",
      vietnamese: "vi",
      vietnamesisch: "vi",
      vietnamesisk: "vi",
      vietnamesiska: "vi",
      vietnameză: "vi",
      vietnami: "vi",
      vietnamien: "vi",
      vietnamiečių: "vi",
      vietnamisht: "vi",
      vietnamita: "vi",
      vietnamčina: "vi",
      vietnamština: "vi",
      vietnamščina: "vi",
      vietnámi: "vi",
      vijetnamski: "vi",
      viro: "et",
      vitryska: "be",
      việt: "vi",
      vjetnamiešu: "vi",
      vjetnamiż: "vi",
      vokiečių: "de",
      vyetnam: "vi",
      vyetnamyen: "vi",
      víetnamska: "vi",
      vítneaimis: "vi",
      vîetnamî: "vi",
      vācu: "de",
      wales: "cy",
      walesi: "cy",
      walesiska: "cy",
      waleština: "cy",
      walijski: "cy",
      walisisch: "cy",
      walisisk: "cy",
      wcreineg: "uk",
      welsh: "cy",
      welşî: "cy",
      whitināmu: "vi",
      wietnamski: "vi",
      wēra: "cy",
      węgierski: "hu",
      wīwī: "fr",
      włoski: "it",
      xaponés: "ja",
      "xinès (simplificat)": "zh-cn",
      "xinès (tradicional)": "zh-tw",
      "xitoy (odatiy)": "zh-tw",
      "xitoy (soddalashgan)": "zh-cn",
      xorvat: "hr",
      "xứ wales": "cy",
      yapon: "ja",
      yunan: "el",
      yunanca: "el",
      yunani: "el",
      yûnanî: "el",
      zoeloe: "zu",
      zoulou: "zu",
      zulu: "zu",
      zuluera: "zu",
      zulujščina: "zu",
      zulusų: "zu",
      zuluština: "zu",
      zulú: "zu",
      zviedru: "sv",
      zweeds: "sv",
      zûlûyî: "zu",
      " دانماركی": "da",
      àrab: "ar",
      àzeri: "az",
      árabe: "ar",
      ázerbájdžánština: "az",
      çekisht: "cs",
      çekçe: "cs",
      çex: "cs",
      "çin (sadələşdirilmiş)": "zh-cn",
      "çin (ənənəvi)": "zh-tw",
      "çince (basitleştirilmiş)": "zh-cn",
      "çince (geleneksel)": "zh-tw",
      "çînî (kevneşopî)": "zh-tw",
      "çînî (hêsankirî)": "zh-cn",
      észt: "et",
      éuscaro: "eu",
      íoslainnis: "is",
      ír: "ga",
      írska: "ga",
      írčina: "ga",
      íslenska: "is",
      ítalska: "it",
      îbranî: "he",
      îngilîzî: "en",
      îrlandî: "ga",
      îspanyolî: "es",
      îzlandî: "is",
      örmény: "hy",
      özbekçe: "uz",
      özbək: "uz",
      úcráinis: "uk",
      úisbéiceastáinis: "uz",
      úkraínska: "uk",
      úsbekíska: "uz",
      üzbég: "uz",
      ý: "it",
      þýska: "de",
      ċek: "cs",
      "ċiniż (simplifikat)": "zh-cn",
      "ċiniż (tradizzjonali)": "zh-tw",
      čehu: "cs",
      čekų: "cs",
      češki: "cs",
      čeština: "cs",
      češčina: "cs",
      "čínština (tradičná)": "zh-tw",
      "čínština (tradiční)": "zh-tw",
      "čínština (zjednodušená)": "zh-cn",
      "đan mạch": "da",
      đức: "de",
      ġappuniż: "ja",
      ġermaniż: "de",
      ħindi: "hi",
      īru: "ga",
      īslandiešu: "is",
      "ķīniešu (tradicionālā)": "zh-tw",
      "ķīniešu (vienkāršotā)": "zh-cn",
      łaciński: "la",
      łotewski: "lv",
      řečtina: "el",
      "şotland (kelt)": "gd",
      "škotska gelščina": "gd",
      "škotski gaelski": "gd",
      škotų: "gd",
      "škótska gaelčina": "gd",
      šoti: "gd",
      španielčina: "es",
      španjolski: "es",
      španělština: "es",
      španščina: "es",
      švedski: "sv",
      švedščina: "sv",
      švedų: "sv",
      švédčina: "sv",
      švédština: "sv",
      ūkareiana: "uk",
      żulu: "zu",
      ərəb: "ar",
      αγγλικά: "en",
      αζερμπαϊτζανικά: "az",
      αλβανικά: "sq",
      αμπχαζικά: "ab",
      αμχαρικά: "am",
      αραβικά: "ar",
      αρμενικά: "hy",
      βασκικά: "eu",
      βιετναμεζικά: "vi",
      βιρμανικά: "my",
      βουλγαρικά: "bg",
      "γαελικά σκοτίας": "gd",
      γαλικιακά: "gl",
      γαλλικά: "fr",
      γερμανικά: "de",
      δανικά: "da",
      εβραϊκά: "he",
      ελληνικά: "el",
      εσθονικά: "et",
      εσπεράντο: "eo",
      ζουλού: "zu",
      ιαπωνικά: "ja",
      ινδονησιακά: "id",
      ιρλανδικά: "ga",
      ισλανδικά: "is",
      ισπανικά: "es",
      ιταλικά: "it",
      κανάντα: "kn",
      καταλανικά: "ca",
      "κινεζικά (απλοποιημένα)": "zh-cn",
      "κινεζικά (παραδοσιακά)": "zh-tw",
      κορεατικά: "ko",
      "κουρδικά (κουρμαντζί)": "ku",
      "κουρδικά (σορανί)": "ckb",
      "κρεόλ αϊτής": "ht",
      κροατικά: "hr",
      λατινικά: "la",
      λετονικά: "lv",
      λευκορωσικά: "be",
      λιθουανικά: "lt",
      μαλέι: "ms",
      μαλαγιάλαμ: "ml",
      μαλτεζικά: "mt",
      μαορί: "mi",
      μαραθικά: "mr",
      μογγολικά: "mn",
      νορβηγικά: "nb",
      ολλανδικά: "nl",
      ουαλικά: "cy",
      ουγγρικά: "hu",
      ουζμπεκικά: "uz",
      ουκρανικά: "uk",
      περσικά: "fa",
      πολωνικά: "pl",
      πορτογαλικά: "pt",
      ρουμανικά: "ro",
      ρωσικά: "ru",
      σερβικά: "sr",
      σλαβομακεδονικά: "mk",
      σλοβακικά: "sk",
      σλοβενικά: "sl",
      σουηδικά: "sv",
      ταϊλανδεζικά: "th",
      τελούγκου: "te",
      τουρκικά: "tr",
      τσεχικά: "cs",
      φινλανδικά: "fi",
      χίντι: "hi",
      абхаз: "ab",
      абхазки: "ab",
      абхазская: "ab",
      абхазский: "ab",
      абхазька: "ab",
      абхаски: "ab",
      азербайджанская: "az",
      азербайджански: "az",
      азербайджанский: "az",
      азербайджанська: "az",
      азербайжан: "az",
      азербејџански: "az",
      албани: "sq",
      албанская: "sq",
      албански: "sq",
      албанский: "sq",
      албанська: "sq",
      амхарик: "am",
      амхарская: "am",
      амхарски: "am",
      амхарский: "am",
      амхарська: "am",
      англи: "en",
      английски: "en",
      английский: "en",
      англиски: "en",
      англійская: "en",
      англійська: "en",
      апхаски: "ab",
      араб: "ar",
      арабская: "ar",
      арабски: "ar",
      арабский: "ar",
      арабська: "ar",
      арапски: "ar",
      армени: "hy",
      арменски: "hy",
      армянская: "hy",
      армянский: "hy",
      балгарская: "bg",
      баск: "eu",
      баски: "eu",
      баскиски: "eu",
      баскијски: "eu",
      баскская: "eu",
      баскский: "eu",
      баскська: "eu",
      беларуская: "be",
      беларуски: "be",
      беларусь: "be",
      белоруски: "be",
      белорусский: "be",
      бирм: "my",
      бирмански: "my",
      бирманский: "my",
      болгар: "bg",
      болгарский: "bg",
      болгарська: "bg",
      бугарски: "bg",
      бурмански: "my",
      български: "bg",
      білоруська: "be",
      "бірманская (м’янма)": "my",
      бірманська: "my",
      валлийский: "cy",
      валлійська: "cy",
      валійская: "cy",
      велшки: "cy",
      венгерская: "hu",
      венгерский: "hu",
      виетнамски: "vi",
      вијетнамски: "vi",
      вьетнам: "vi",
      вьетнамский: "vi",
      вірменська: "hy",
      "в’етнамская": "vi",
      "в’єтнамська": "vi",
      "гаитянский креольский": "ht",
      галандская: "nl",
      галик: "gl",
      галисийски: "gl",
      галисийский: "gl",
      галициски: "gl",
      галски: "gl",
      галісійская: "gl",
      гаэл: "gd",
      "гаіцянская крэольская": "ht",
      "гаїтянська креольська": "ht",
      герман: "de",
      германски: "de",
      голланд: "nl",
      грек: "el",
      грецька: "el",
      греческий: "el",
      грчки: "el",
      гръцки: "el",
      грэчаская: "el",
      гінді: "hi",
      дани: "da",
      дански: "da",
      данська: "da",
      датски: "da",
      датский: "da",
      дацкая: "da",
      енглески: "en",
      ерменски: "hy",
      есперанто: "eo",
      естонски: "et",
      естонська: "et",
      зулу: "zu",
      иврит: "he",
      индонежански: "id",
      индонез: "id",
      индонезийски: "id",
      индонезийский: "id",
      индонезиски: "id",
      ирланд: "ga",
      ирландски: "ga",
      ирландский: "ga",
      ирски: "ga",
      исланд: "is",
      исландски: "is",
      исландский: "is",
      испани: "es",
      испански: "es",
      испанский: "es",
      итали: "it",
      италиански: "it",
      италијански: "it",
      итальянский: "it",
      канада: "kn",
      каннада: "kn",
      карэйская: "ko",
      каталан: "ca",
      каталанская: "ca",
      каталанский: "ca",
      каталанська: "ca",
      каталонски: "ca",
      "кинески (поедноставен)": "zh-cn",
      "кинески (поједностављени)": "zh-cn",
      "кинески (традиционален)": "zh-tw",
      "кинески (традиционални)": "zh-tw",
      кипр: "he",
      "китайски (опростен)": "zh-cn",
      "китайски (традиционен)": "zh-tw",
      "китайский (традиционный)": "zh-tw",
      "китайский (упрощенный)": "zh-cn",
      "китайська (спрощена)": "zh-cn",
      "китайська (традиційна)": "zh-tw",
      корейски: "ko",
      корейский: "ko",
      корейська: "ko",
      корејски: "ko",
      "курд (курманжи)": "ku",
      "курд (сорани)": "ckb",
      "курдская (курманджы)": "ku",
      "курдская (сарані)": "ckb",
      "курдски (курманџи)": "ku",
      "курдски (курмањи)": "ku",
      "курдски (сорани)": "ckb",
      "курдский (курманджи)": "ku",
      "курдский (сорани)": "ckb",
      "курдська (курманджі)": "ku",
      "курдська (сорані)": "ckb",
      "кюрдски (курманджи)": "ku",
      "кюрдски (сорани)": "ckb",
      "кітайская (спрошчаная)": "zh-cn",
      "кітайская (традыцыйная)": "zh-tw",
      латви: "lv",
      латвийски: "lv",
      латвиски: "lv",
      латин: "la",
      латински: "la",
      латинский: "la",
      латинська: "la",
      латиська: "lv",
      латышская: "lv",
      латышский: "lv",
      лацінская: "la",
      летонски: "lv",
      литва: "lt",
      литвански: "lt",
      литовски: "lt",
      литовский: "lt",
      литовська: "lt",
      літоўская: "lt",
      маары: "mi",
      македон: "mk",
      македонская: "mk",
      македонски: "mk",
      македонский: "mk",
      македонська: "mk",
      малай: "ms",
      малайлам: "ml",
      малайская: "ms",
      малайски: "ms",
      малайский: "ms",
      малайська: "ms",
      малаялам: "ml",
      малајалам: "ml",
      малајалски: "ml",
      малајски: "ms",
      малтешки: "mt",
      малти: "mt",
      малтийски: "mt",
      мальтийский: "mt",
      мальтыйская: "mt",
      мальтійська: "mt",
      мангольская: "mn",
      маори: "mi",
      маорски: "mi",
      маорі: "mi",
      марати: "mr",
      маратхи: "mr",
      маратхі: "mr",
      мађарски: "hu",
      монгол: "mn",
      монголски: "mn",
      монгольский: "mn",
      монгольська: "mn",
      "мјанмарски (бурмански)": "my",
      нарвежская: "nb",
      немачки: "de",
      немецкий: "de",
      немски: "de",
      нидерландски: "nl",
      нидерландский: "nl",
      норвег: "nb",
      норвежки: "nb",
      норвежский: "nb",
      норвезька: "nb",
      норвешки: "nb",
      нямецкая: "de",
      нідерландська: "nl",
      німецька: "de",
      орос: "ru",
      партугальская: "pt",
      перс: "fa",
      персийски: "fa",
      персиски: "fa",
      персијски: "fa",
      перська: "fa",
      персідская: "fa",
      полски: "pl",
      польская: "pl",
      польский: "pl",
      польська: "pl",
      польш: "pl",
      португалски: "pt",
      португаль: "pt",
      португальский: "pt",
      португальська: "pt",
      пољски: "pl",
      романски: "ro",
      російська: "ru",
      румунски: "ro",
      румунська: "ro",
      румънски: "ro",
      румын: "ro",
      румынская: "ro",
      румынский: "ro",
      руская: "ru",
      руски: "ru",
      русский: "ru",
      серби: "sr",
      сербская: "sr",
      сербский: "sr",
      сербська: "sr",
      славацкая: "sk",
      славенская: "sl",
      словак: "sk",
      словацкий: "sk",
      словацька: "sk",
      словачки: "sk",
      словашки: "sk",
      словеначки: "sl",
      словенечки: "sl",
      словени: "sl",
      словенски: "sl",
      словенский: "sl",
      словенська: "sl",
      солонгос: "ko",
      српски: "sr",
      сръбски: "sr",
      тай: "th",
      тайландски: "th",
      тайская: "th",
      тайский: "th",
      тайська: "th",
      тајландски: "th",
      тајски: "th",
      телугу: "te",
      телуґу: "te",
      турецкий: "tr",
      турецька: "tr",
      турк: "tr",
      турски: "tr",
      турэцкая: "tr",
      тэлугу: "te",
      тэлүгү: "te",
      угорська: "hu",
      уелски: "cy",
      узбек: "uz",
      узбекская: "uz",
      узбекски: "uz",
      узбекский: "uz",
      узбецька: "uz",
      узбечки: "uz",
      украин: "uk",
      украински: "uk",
      украинский: "uk",
      украінская: "uk",
      українська: "uk",
      украјински: "uk",
      унгар: "hu",
      унгарски: "hu",
      уэльс: "cy",
      фарси: "fa",
      финланд: "fi",
      финландски: "fi",
      фински: "fi",
      финский: "fi",
      франц: "fr",
      французская: "fr",
      французский: "fr",
      французька: "fr",
      француски: "fr",
      френски: "fr",
      фінская: "fi",
      фінська: "fi",
      "хаитийн креол": "ht",
      "хаитски креолски": "ht",
      "хаитянски креолски": "ht",
      "хаићански креолски": "ht",
      харвацкая: "hr",
      хебрејски: "he",
      хинди: "hi",
      холандски: "nl",
      хорват: "hr",
      хорватский: "hr",
      хорватська: "hr",
      хрватски: "hr",
      хърватски: "hr",
      "хятад (уламжлалт)": "zh-tw",
      "хятад (хялбаршуулсан)": "zh-cn",
      хіндзі: "hi",
      чеська: "cs",
      чех: "cs",
      чешки: "cs",
      чешский: "cs",
      чэшская: "cs",
      "шатландская гэльская": "gd",
      швед: "sv",
      шведская: "sv",
      шведски: "sv",
      шведский: "sv",
      шведська: "sv",
      "шкотски галски": "gd",
      "шотландски келтски": "gd",
      "шотландский (гэльский)": "gd",
      "шотландська (ґельська)": "gd",
      шпански: "es",
      эсперанта: "eo",
      эсперанто: "eo",
      эстони: "et",
      эстонская: "et",
      эстонский: "et",
      япон: "ja",
      японская: "ja",
      японски: "ja",
      японский: "ja",
      японська: "ja",
      іврит: "he",
      інданезійская: "id",
      індонезійська: "id",
      ірландская: "ga",
      ірландська: "ga",
      ісландская: "is",
      ісландська: "is",
      іспанская: "es",
      іспанська: "es",
      італьянская: "it",
      італійська: "it",
      іўрыт: "he",
      јапански: "ja",
      јапонски: "ja",
      јерменски: "hy",
      ґалісійська: "gl",
      աբխազերեն: "ab",
      ադրբեջաներեն: "az",
      ալբաներեն: "sq",
      ամհարերեն: "am",
      անգլերեն: "en",
      արաբերեն: "ar",
      բասկերեն: "eu",
      բելառուսերեն: "be",
      բիրմաներեն: "my",
      բուլղարերեն: "bg",
      գալիսերեն: "gl",
      "գելական շոտլանդերեն": "gd",
      գերմաներեն: "de",
      դանիերեն: "da",
      եբրայերեն: "he",
      զուլուսերեն: "zu",
      էսպերանտո: "eo",
      էստոներեն: "et",
      թայերեն: "th",
      թուրքերեն: "tr",
      ինդոնեզերեն: "id",
      իռլանդերեն: "ga",
      իսլանդերեն: "is",
      իսպաներեն: "es",
      իտալերեն: "it",
      լատիներեն: "la",
      լատվիերեն: "lv",
      լեհերեն: "pl",
      լիտվերեն: "lt",
      խորվաթերեն: "hr",
      կաննադա: "kn",
      կատալաներեն: "ca",
      կորեերեն: "ko",
      "կրեոլերեն (հաիթի)": "ht",
      հայերեն: "hy",
      հինդի: "hi",
      հոլանդերեն: "nl",
      հունարեն: "el",
      հունգարերեն: "hu",
      ճապոներեն: "ja",
      մալայալամ: "ml",
      մալայերեն: "ms",
      մալթայերեն: "mt",
      մակեդոներեն: "mk",
      մաորի: "mi",
      մարաթի: "mr",
      մոնղոլերեն: "mn",
      նորվեգերեն: "nb",
      շվեդերեն: "sv",
      ուզբեկերեն: "uz",
      ուկրաիներեն: "uk",
      չեխերեն: "cs",
      "չինարեն (ավանդական)": "zh-tw",
      "չինարեն (պարզեցված)": "zh-cn",
      պարսկերեն: "fa",
      պորտուգալերեն: "pt",
      ռումիներեն: "ro",
      ռուսերեն: "ru",
      սերբերեն: "sr",
      սլովակերեն: "sk",
      սլովեներեն: "sl",
      վալլերեն: "cy",
      վիետնամերեն: "vi",
      տելուգու: "te",
      "քրդերեն (սորանի)": "ckb",
      "քրդերեն (քուրմանջի)": "ku",
      ֆիններեն: "fi",
      ֆրանսերեն: "fr",
      אבחזית: "ab",
      אוזבקית: "uz",
      אוקראינית: "uk",
      אזרית: "az",
      איטלקית: "it",
      אינדונזית: "id",
      איסלנדית: "is",
      אירית: "ga",
      אלבנית: "sq",
      אמהרית: "am",
      אנגלית: "en",
      אסטונית: "et",
      אספרנטו: "eo",
      ארמנית: "hy",
      באסקית: "eu",
      בולגרית: "bg",
      בורמזית: "my",
      בלארוסית: "be",
      "גאלית סקוטית": "gd",
      גליציאנית: "gl",
      גרמנית: "de",
      דנית: "da",
      הולנדית: "nl",
      הונגרית: "hu",
      הינדי: "hi",
      וולשית: "cy",
      וייטנאמית: "vi",
      זולו: "zu",
      טורקית: "tr",
      טלוגו: "te",
      יוונית: "el",
      יפנית: "ja",
      "כורדית (כורמנג'ית)": "ku",
      "כורדית (סורנית)": "ckb",
      לטבית: "lv",
      לטינית: "la",
      ליטאית: "lt",
      מאורית: "mi",
      מונגולית: "mn",
      מלאית: "ms",
      מלטית: "mt",
      מליאלאם: "ml",
      מקדונית: "mk",
      מראטהית: "mr",
      נורווגית: "nb",
      "סינית (מסורתית)": "zh-tw",
      סלובנית: "sl",
      סלובקית: "sk",
      ספרדית: "es",
      סרבית: "sr",
      עברית: "he",
      ערבית: "ar",
      פולנית: "pl",
      פורטוגזית: "pt",
      פינית: "fi",
      פרסית: "fa",
      "צ'כית": "cs",
      צרפתית: "fr",
      קאנאדה: "kn",
      קוריאנית: "ko",
      קטלאנית: "ca",
      קרואטית: "hr",
      "קריאולית האיטית": "ht",
      רומנית: "ro",
      רוסית: "ru",
      שוודית: "sv",
      תאית: "th",
      آبخازی: "ab",
      آذرباﻳﺠﺎﻧﻰ: "az",
      آلبانیایی: "sq",
      آلمانی: "de",
      "ئه رمه نی": "hy",
      ئۆکرانی: "uk",
      ئیتالی: "it",
      ارمنی: "hy",
      ازبکی: "uz",
      استونيايی: "et",
      اسلواکی: "sk",
      اسلونیایی: "sl",
      اسپانیایی: "es",
      اسپرانتو: "eo",
      الآيسلندية: "is",
      الأبخازية: "ab",
      الأذرية: "az",
      الأرمنية: "hy",
      الألبانية: "sq",
      الألمانية: "de",
      الأمهرية: "am",
      الأوزبكية: "uz",
      الأوكرانية: "uk",
      الأيرلندية: "ga",
      الإسبانية: "es",
      الإسبرانتو: "eo",
      الإستونية: "et",
      الإنجليزية: "en",
      الإندونيسية: "id",
      الإيطالية: "it",
      الباسكية: "eu",
      البرتغالية: "pt",
      البلغارية: "bg",
      البورمية: "my",
      البولندية: "pl",
      البيلاروسية: "be",
      التايلاندية: "th",
      التركية: "tr",
      التشيكية: "cs",
      التيلوغوية: "te",
      الجاليكية: "gl",
      الدانمركية: "da",
      الروسية: "ru",
      الرومانية: "ro",
      الزولو: "zu",
      السلوفاكية: "sk",
      السلوفينية: "sl",
      السويدية: "sv",
      الصربية: "sr",
      "الصينية (التقليدية)": "zh-tw",
      "الصينية (المبسطة)": "zh-cn",
      العبرية: "he",
      العربية: "ar",
      "الغيلية الأسكتلندية": "gd",
      الفارسية: "fa",
      الفرنسية: "fr",
      الفنلندية: "fi",
      الفيتنامية: "vi",
      القطلونية: "ca",
      "الكردية (السورانية)": "ckb",
      "الكردية (الكرمانجية)": "ku",
      الكرواتية: "hr",
      "الكريولية الهايتية": "ht",
      الكنادية: "kn",
      الكورية: "ko",
      اللاتفية: "lv",
      اللاتينية: "la",
      الليتوانية: "lt",
      الماراثية: "mr",
      المالايالامية: "ml",
      المالطيّة: "mt",
      الماورية: "mi",
      المقدونية: "mk",
      الملايو: "ms",
      المنغولية: "mn",
      النرويجية: "nb",
      الهندية: "hi",
      الهنغارية: "hu",
      الهولندية: "nl",
      الويلزية: "cy",
      اليابانية: "ja",
      اليونانية: "el",
      امهری: "am",
      اندونزيايی: "id",
      انگلیسی: "en",
      ايسلندی: "is",
      اکراينی: "uk",
      ایتالیایی: "it",
      ایرلندی: "ga",
      باسکی: "eu",
      برمه‌ای: "my",
      بلاروسی: "be",
      بلغاری: "bg",
      تايلندی: "th",
      "ترکی استانبولی": "tr",
      تلوگو: "te",
      دانمارکی: "da",
      روسی: "ru",
      رومانيايی: "ro",
      زولو: "zu",
      سوئدی: "sv",
      صربی: "sr",
      عبری: "he",
      عربی: "ar",
      فارسی: "fa",
      فرانسوی: "fr",
      فنلاندی: "fi",
      لاتين: "la",
      لتونيايی: "lv",
      لهستانی: "pl",
      ليتوانيايی: "lt",
      مائوری: "mi",
      مالايی: "ms",
      مالایالمی: "ml",
      مالتی: "mt",
      مجاری: "hu",
      مراتی: "mr",
      مغولی: "mn",
      مقدونيه‌ای: "mk",
      نروژی: "nb",
      هلندی: "nl",
      هندی: "hi",
      هیندی: "hi",
      ولزی: "cy",
      ويتنامی: "vi",
      يونانی: "el",
      پرتغالی: "pt",
      چه‌كی: "cs",
      چک: "cs",
      "چینی (ساده‌شده)": "zh-cn",
      "چینی (سنتی)": "zh-tw",
      ژاپنی: "ja",
      کاتالان: "ca",
      "کرئول هائیتی": "ht",
      "کردی (سورانی)": "ckb",
      "کردی (کرمانجی)": "ku",
      کره‌ای: "ko",
      کرواتی: "hr",
      کنادا: "kn",
      "گاليک اسکاتلندی": "gd",
      گالیسی: "gl",
      अंग्रेज़ी: "en",
      अझरबैजानी: "az",
      अबखाज़: "ab",
      अब्काझ: "ab",
      अम्हारिक: "am",
      अरबी: "ar",
      अर्मेनियन: "hy",
      अल्बानियन: "sq",
      अल्बेनियन: "sq",
      अज़रबैजानी: "az",
      आइसलँडिक: "is",
      आइसलैंडिक: "is",
      आयरिश: "ga",
      आर्मीनियन: "hy",
      इंग्रजी: "en",
      इंडोनेशियन: "id",
      इटालियन: "it",
      इटैलियन: "it",
      उज़्बेक: "uz",
      उझ्बेक: "uz",
      एस्टोनियन: "et",
      एस्परँटो: "eo",
      एस्पेरांटो: "eo",
      ऐम्हेरिक: "am",
      कन्नड: "kn",
      कन्नड़: "kn",
      "कुर्दिश (कुर्मांजी)": "ku",
      "कुर्दिश (सोरानी)": "ckb",
      कॅटलान: "ca",
      कैटेलन: "ca",
      कोरियन: "ko",
      क्रोएशियन: "hr",
      गॅलिशियन: "gl",
      गैलिशियन: "gl",
      ग्रीक: "el",
      "चाइनीज़ (ट्रेडिश्नल)": "zh-tw",
      "चाइनीज़ (सिंप्लिफ़ाइड)": "zh-cn",
      "चीनी (पारंपारिक)": "zh-tw",
      "चीनी (सरलीकृत)": "zh-cn",
      चेक: "cs",
      जपानी: "ja",
      जर्मन: "de",
      ज़ुलु: "zu",
      जैपनीज़: "ja",
      झुलु: "zu",
      झेक: "cs",
      डच: "nl",
      डॅनिश: "da",
      डैनिश: "da",
      तुर्क: "tr",
      तुर्की: "tr",
      तेलुगु: "te",
      थाई: "th",
      नॉर्वेजियन: "nb",
      पुर्तगाली: "pt",
      पोर्तुगीज: "pt",
      पोलिश: "pl",
      फ़िनिश: "fi",
      फ़्रेंच: "fr",
      फारसी: "fa",
      फिन्निश: "fi",
      फ्रेंच: "fr",
      बर्मी: "my",
      बल्गेरियन: "bg",
      बल्गैरियन: "bg",
      बास्क: "eu",
      बेलारशियन: "be",
      बेलारुशियन: "be",
      बैस्क: "eu",
      मंगोलियन: "mn",
      मराठी: "mr",
      मलय: "ms",
      मलयालम: "ml",
      मल्याळम: "ml",
      माओरी: "mi",
      माऔरी: "mi",
      माल्टी: "mt",
      माल्टीज: "mt",
      मॅसेडोनियन: "mk",
      मैसेडोनियन: "mk",
      "म्यानमार (बर्मीज)": "my",
      युक्रेनियन: "uk",
      यूक्रेनियन: "uk",
      रशियन: "ru",
      रूसी: "ru",
      रोमानियन: "ro",
      रोमेनियन: "ro",
      लाट्वियन: "lv",
      लातवियन: "lv",
      लिथुआनियन: "lt",
      लिथुएनियन: "lt",
      लॅटिन: "la",
      लैटिन: "la",
      वियतनामी: "vi",
      वेल्श: "cy",
      व्हिएतनामी: "vi",
      सर्बियन: "sr",
      सर्बियाई: "sr",
      "स्कॉट्स गेलिक": "gd",
      स्पॅनिश: "es",
      स्पैनिश: "es",
      स्लोवाक: "sk",
      स्लोवेनियन: "sl",
      स्लोव्हाक: "sk",
      स्लोव्हेनियन: "sl",
      स्वीडिश: "sv",
      हंगेरियन: "hu",
      हिन्दी: "hi",
      हिब्रू: "he",
      हीब्रू: "he",
      "हैतियन क्रिओल": "ht",
      "हैतीयन क्रेओल": "ht",
      అజర్‌బైజాని: "az",
      అబ్‌ఖాజ్: "ab",
      అర్మేనియన్: "hy",
      అల్బేనియన్: "sq",
      ఆంగ్లము: "en",
      ఆమ్హారిక్: "am",
      ఆరబిక్: "ar",
      ఇండొనేసియన్: "id",
      ఇటాలియన్: "it",
      ఉజ్బెక్: "uz",
      ఎస్పెరాంటో: "eo",
      ఏస్టోనియన్: "et",
      ఐరిష్: "ga",
      "ఐస్ లాండిక్": "is",
      కన్నడ: "kn",
      "కుర్దిష్ (కుర్మాంజి)": "ku",
      "కుర్దిష్ (సొరని)": "ckb",
      కొరియన్: "ko",
      క్యాటలాన్: "ca",
      క్రొయేషియన్: "hr",
      గాలిసియన్: "gl",
      గ్రీక్: "el",
      చెక్: "cs",
      "చైనీస్ (సరళమైన)": "zh-cn",
      "చైనీస్ (సాంప్రదాయమైన)": "zh-tw",
      జపనీస్: "ja",
      జర్మన్: "de",
      జులు: "zu",
      టర్కిష్: "tr",
      డచ్: "nl",
      డానిష్: "da",
      తెలుగు: "te",
      థాయ్: "th",
      నార్విజియన్: "nb",
      పర్షియన్: "fa",
      పోర్చుగీస్: "pt",
      పోలిష్: "pl",
      ఫిన్నిష్: "fi",
      ఫ్రెంచ్: "fr",
      బర్మీస్: "my",
      బల్గేరియన్: "bg",
      బాస్క్: "eu",
      బెలారష్యన్: "be",
      మంగోలియన్: "mn",
      మయోరి: "mi",
      మరాఠీ: "mr",
      మలయాళం: "ml",
      మాలై: "ms",
      మాల్టీస్: "mt",
      మాసిడోనియన్: "mk",
      యుక్రేనియన్: "uk",
      రష్యన్: "ru",
      రొమేనియన్: "ro",
      లాటిన్: "la",
      లాట్వియన్: "lv",
      లిథువేనియన్: "lt",
      వియత్నామీస్: "vi",
      వెల్ష్: "cy",
      సెర్బియన్: "sr",
      "స్కాట్స్ గేలిక్": "gd",
      స్పానిష్: "es",
      స్లోవాక్: "sk",
      స్లోవేనియన్: "sl",
      స్వీడిష్: "sv",
      హంగేరియన్: "hu",
      హిందీ: "hi",
      హీబ్రూ: "he",
      "హైయేటియన్ క్రియోల్": "ht",
      ಅಜರ್ಬೈಜಾನಿ: "az",
      ಅಬ್ಖಾಜ್: "ab",
      ಅಮಹಾರಿಕ್: "am",
      ಅರಬ್ಬಿ: "ar",
      ಆರ್ಮೇನಿಯನ್: "hy",
      ಆಲ್ಬೇನಿಯನ್: "sq",
      ಇಂಗ್ಲಿಷ್‌‌: "en",
      ಇಂಡೋನೇಷಿಯನ್: "id",
      ಇಟಾಲಿಯನ್: "it",
      ಉಜ್ಬೆಕ್: "uz",
      ಎಸ್ಟೋನಿಯನ್: "et",
      ಎಸ್ಪೆರಾಂಟೋ: "eo",
      ಐರಿಷ್: "ga",
      ಐಸ್‌ಲ್ಯಾಂಡಿಕ್‌: "is",
      ಕನ್ನಡ: "kn",
      "ಕುರ್ದಿಶ್ (ಕುರ್ಮಾಂಜಿ)": "ku",
      "ಕುರ್ದಿಶ್ (ಸೊರಾನಿ)": "ckb",
      ಕೊರಿಯನ್: "ko",
      ಕ್ಯಾಟಲನ್: "ca",
      ಕ್ರೊಯೇಷಿಯನ್: "hr",
      ಗ್ಯಾಲೀಷಿಯನ್: "gl",
      ಗ್ರೀಕ್: "el",
      "ಚೀನಿ (ಸರಳೀಕೃತ)": "zh-cn",
      "ಚೈನೀಸ್ (ಸಾಂಪ್ರದಾಯಿಕ)": "zh-tw",
      ಜಪಾನಿ: "ja",
      ಜರ್ಮನ್: "de",
      ಜುಲು: "zu",
      ಝೆಕ್‌: "cs",
      ಟರ್ಕಿಷ್: "tr",
      ಡಚ್: "nl",
      ಡ್ಯಾನಿಷ್: "da",
      ತೆಲುಗು: "te",
      ಥಾಯ್: "th",
      ನಾರ್ವೇಜಿಯನ್‌: "nb",
      ಪೋರ್ಚುಗೀಸ್: "pt",
      ಪೋಲಿಷ್: "pl",
      ಫಾರ್ಸಿ: "fa",
      ಫಿನ್ನಿಷ್: "fi",
      ಫ್ರೆಂಚ್: "fr",
      ಬಲ್ಗೇರಿಯನ್: "bg",
      ಬಾಸ್ಕ್: "eu",
      ಬೆಲರೂಸಿಯನ್: "be",
      ಮಂಗೋಲಿಯನ್: "mn",
      "ಮಯನ್ಮಾರ್ (ಬರ್ಮೀಸ್)": "my",
      ಮರಾಠಿ: "mr",
      ಮಲಯ: "ms",
      ಮಲಯಾಳಂ: "ml",
      ಮಾಲ್ಟೀಸ್: "mt",
      ಮಾವೋರಿ: "mi",
      ಮ್ಯಾಸೆಡೋನಿಯನ್: "mk",
      ಯುಕ್ರೇನಿಯನ್: "uk",
      ರಷಿಯನ್: "ru",
      ರೊಮೇನಿಯನ್: "ro",
      ಲಿಥುವೇನಿಯನ್: "lt",
      ಲ್ಯಾಟಿನ್: "la",
      ಲ್ಯಾಟ್ವಿಯನ್‌: "lv",
      ವಿಯೆಟ್ನಾಮಿ: "vi",
      ವೆಲ್ಶ್: "cy",
      ಸರ್ಬಿಯನ್: "sr",
      "ಸ್ಕಾಟ್ಸ್ ಗ್ಯಾಲಿಕ್": "gd",
      ಸ್ಪ್ಯಾನಿಷ್: "es",
      ಸ್ಲೊವಾಕ್: "sk",
      ಸ್ಲೊವೆನಿಯನ್: "sl",
      ಸ್ವೀಡಿಷ್: "sv",
      ಹಂಗೇರಿಯನ್: "hu",
      "ಹಯಥಿಯನ್‌ ಕ್ರಿಯೋಲ್‌": "ht",
      ಹಿಂದಿ: "hi",
      ಹೀಬ್ರೂ: "he",
      അബ്ഖാസ്: "ab",
      അമാറിക്: "am",
      അറബിക്: "ar",
      അസർബൈജാനി: "az",
      അർമേനിയൻ: "hy",
      അൽബേനിയൻ: "sq",
      ഇംഗ്ലീഷ്: "en",
      ഇന്തോനേഷ്യൻ: "id",
      ഇറ്റാലിയൻ: "it",
      ഉക്രേനിയൻ: "uk",
      ഉസ്ബെക്ക്: "uz",
      എസ്റ്റോണിയൻ: "et",
      എസ്‌പെരന്തോ: "eo",
      ഐറിഷ്: "ga",
      ഐസ്‌ലാൻഡിക്: "is",
      കന്നട: "kn",
      കാറ്റലൻ: "ca",
      "കുർദ്ദിഷ് (കുർമാൻജി)": "ku",
      "കുർദ്ദിഷ് (സൊറാനി)": "ckb",
      കൊറിയൻ: "ko",
      ക്രൊയേഷ്യൻ: "hr",
      ഗലീഷ്യൻ: "gl",
      ഗ്രീക്ക്: "el",
      ചെക്ക്: "cs",
      "ചൈനീസ് (പരമ്പരാഗതം)": "zh-tw",
      "ചൈനീസ് (ലഘൂകരിച്ചത്)": "zh-cn",
      ജാപ്പനീസ്‌: "ja",
      ജർമ്മൻ: "de",
      ടർക്കിഷ്: "tr",
      ഡച്ച്: "nl",
      ഡാനിഷ്: "da",
      തായ്: "th",
      തെലുങ്ക്: "te",
      നോർവീജിയൻ: "nb",
      പേർഷ്യൻ: "fa",
      പോളിഷ്: "pl",
      പോർച്ചുഗീസ്: "pt",
      ഫിന്നിഷ്: "fi",
      ഫ്രെഞ്ച്: "fr",
      ബാസ്ക്: "eu",
      ബെലാറുഷ്യൻ: "be",
      ബർമീസ്: "my",
      ബൾഗേറിയൻ: "bg",
      മംഗോളിയൻ: "mn",
      മറാഠി: "mr",
      മലയാളം: "ml",
      മലയ്: "ms",
      മാസഡോണിയൻ: "mk",
      മാൾട്ടീസ്: "mt",
      മൗറി: "mi",
      റഷ്യൻ: "ru",
      റൊമേനിയൻ: "ro",
      ലാറ്റിൻ: "la",
      ലാറ്റ്‌വിയൻ: "lv",
      ലിത്വേനിയൻ: "lt",
      വിയറ്റ്നാമീസ്: "vi",
      വെൽഷ്: "cy",
      സുളു: "zu",
      സെർബിയൻ: "sr",
      "സ്കോട്ട്സ് ഗ്യാലിക്": "gd",
      സ്പാനിഷ്: "es",
      സ്ലോവാക്: "sk",
      സ്ലോവേനിയൻ: "sl",
      സ്വീഡിഷ്: "sv",
      ഹംഗേറിയൻ: "hu",
      ഹിന്ദി: "hi",
      ഹീബ്രു: "he",
      "ഹെയ്തിയൻ ക്രയോൾ": "ht",
      กรีก: "el",
      กันนาดา: "kn",
      กาลิเชียน: "gl",
      คาตาลัน: "ca",
      "จีน (ตัวย่อ)": "zh-cn",
      "จีน (ตัวเต็ม)": "zh-tw",
      ซูลู: "zu",
      ญี่ปุ่น: "ja",
      ดัตช์: "nl",
      ตุรกี: "tr",
      นอร์เวย์: "nb",
      บัลแกเรีย: "bg",
      บาสก์: "eu",
      ฝรั่งเศส: "fr",
      ฟินแลนด์: "fi",
      มองโกเลีย: "mn",
      มัลทีส: "mt",
      มาซีโดเนีย: "mk",
      มาราฐี: "mr",
      มาลายาลัม: "ml",
      มาเลย์: "ms",
      ยูเครน: "uk",
      รัสเซีย: "ru",
      ละติน: "la",
      ลัตเวีย: "lv",
      ลิทัวเนีย: "lt",
      สวีเดน: "sv",
      สเปน: "es",
      สโลวัก: "sk",
      สโลวีเนีย: "sl",
      อังกฤษ: "en",
      อับคาเซีย: "ab",
      อัมฮาริก: "am",
      อาร์เซอร์ไบจัน: "az",
      อาร์เมเนีย: "hy",
      อาหรับ: "ar",
      อิตาลี: "it",
      อินโดนีเซีย: "id",
      อุสเบกิสถาน: "uz",
      ฮังการี: "hu",
      ฮินดี: "hi",
      ฮีบรู: "he",
      เกลิกสกอต: "gd",
      เกาหลี: "ko",
      "เคิร์ด (กุรมันชี)": "ku",
      "เคิร์ด (โซรานี)": "ckb",
      เช็ก: "cs",
      เซอร์เบียน: "sr",
      เดนมาร์ก: "da",
      เตลูกู: "te",
      เบลารุส: "be",
      เปอร์เซีย: "fa",
      เมารี: "mi",
      "เมียนมา (พม่า)": "my",
      เยอรมัน: "de",
      เวลส์: "cy",
      เวียดนาม: "vi",
      เอสเปอแรนโต: "eo",
      เอสโทเนีย: "et",
      เฮติครีโอล: "ht",
      แอลเบเนีย: "sq",
      โครเอเชีย: "hr",
      โปรตุเกส: "pt",
      โปแลนด์: "pl",
      โรมาเนีย: "ro",
      ไทย: "th",
      ไอซ์แลนด์: "is",
      ไอร์แลนด์: "ga",
      ကက်တလန်: "ca",
      "ကဒ် (ကာမန်ဂျီ)": "ku",
      "ကဒ် (ဆိုရာနီ)": "ckb",
      ကနာဒါ: "kn",
      ကိုရီးယား: "ko",
      ခရိုအေးရှား: "hr",
      ချက်: "cs",
      ဂယ်လိရှ: "gl",
      ဂရိ: "el",
      ဂျပန်: "ja",
      ဂျာမန်: "de",
      "စကော့ ဂေးလစ်": "gd",
      စပိန်: "es",
      ဆလိုဗက်: "sk",
      ဆလိုဗေးနီးယား: "sl",
      ဆားဘီးယား: "sr",
      ဆွီဒင်: "sv",
      ဇူးလူး: "zu",
      တယ်လူဂူ: "te",
      "တရုတ် (ရိုးရာ)": "zh-tw",
      "တရုတ် (ရိုးရှင်း)": "zh-cn",
      "တူ​ရ​ကီ": "tr",
      ထိုင်း: "th",
      ဒတ်ချ်: "nl",
      ဒိန်းမတ်: "da",
      နော်ဝေး: "nb",
      ပါရှန်: "fa",
      ပိုလန်: "pl",
      ပေါ်တူဂီ: "pt",
      ပြင်သစ်: "fr",
      ဖင်လန်: "fi",
      ဗီယက်နမ်: "vi",
      ဘာစ်ခ်: "eu",
      ဘီလာရစ်: "be",
      ဘူဂေးရီးယား: "bg",
      မက်ဆီဒိုးနီးယား: "mk",
      မလေယာလမ်: "ml",
      မလေး: "ms",
      မာရာသီ: "mr",
      မော်ရီ: "mi",
      မော်လတာ: "mt",
      မြန်မာ: "my",
      မွန်ဂိုလီးယား: "mn",
      "ယူ​က​ရိန်း​": "uk",
      ရိုမေးနီးယား: "ro",
      ရုရှား: "ru",
      လက်တင်: "la",
      လစ်သူဝေးနီးယား: "lt",
      လတ်ဗီယာ: "lv",
      ဝေလ: "cy",
      ဟန်ဂေရီ: "hu",
      ဟိန္ဒီ: "hi",
      ဟီဘရူး: "he",
      "ဟေတီ ခရီအိုး": "ht",
      အက်စတိုးနီးယား: "et",
      အက်စ်ပဲရန်တို: "eo",
      အက်ဘခါ့ဇ်: "ab",
      အင်ဒိုနီးရှား: "id",
      အင်္ဂလိပ်: "en",
      အဇာဘိုင်ဂျန်: "az",
      အမ်ဟဲရစ်ခ်: "am",
      အယ်လ်ဘေးနီးယား: "sq",
      အာမေးနီးယား: "hy",
      အာရေဗျ: "ar",
      အိုက်စလန်: "is",
      အိုင်းရစ်ရှ်: "ga",
      အီတလီ: "it",
      ဥဇဘက်: "uz",
      ሀንጋሪኛ: "hu",
      ህንድኛ: "hi",
      ሊትዌንኛ: "lt",
      ላቲንኛ: "la",
      ላትቪያኛ: "lv",
      ማላያላምኛ: "ml",
      ማላይኛ: "ms",
      ማልቲስኛ: "mt",
      ማራቲኛ: "mr",
      ማዮሪኛ: "mi",
      ሜቄዶኒያኛ: "mk",
      ሞንጎሊያኛ: "mn",
      ራሽያኛ: "ru",
      ሮማኒያንኛ: "ro",
      ሰርቢያኛ: "sr",
      ስሎቫክኛ: "sk",
      ስሎቬንያኛ: "sl",
      ስዊድንኛ: "sv",
      ስፓኒሽኛ: "es",
      በርማኛ: "my",
      ቡልጋሪያኛ: "bg",
      ባስክኛ: "eu",
      ቤላሩስኛ: "be",
      ቪትናምኛ: "vi",
      ቱርክኛ: "tr",
      ታይኛ: "th",
      ቴሉጉኛ: "te",
      "ቻይንኛ (ቀላሉ)": "zh-cn",
      "ቻይንኛ (ባሕላዊው)": "zh-tw",
      ቼክኛ: "cs",
      ኖርዌጅያንኛ: "nb",
      አልባንያኛ: "sq",
      አማርኛ: "am",
      አርመኒያኛ: "hy",
      አብካዝኛ: "ab",
      አዜርባይጃንኛ: "az",
      አይሪሽ: "ga",
      አይስላንድኛ: "is",
      ኡዝቤክኛ: "uz",
      ኤስቶኒያኛ: "et",
      ኤስፐራንቶኛ: "eo",
      እንዶኔዢያኛ: "id",
      እንግሊዝኛ: "en",
      "ኩርድሽኛ (ሶራኒ)": "ckb",
      "ኩርድሽኛ (ኩርማንጂ)": "ku",
      ካታላንኛ: "ca",
      ካናዳኛ: "kn",
      ክሮኤሽያኛ: "hr",
      ኮሪያኛ: "ko",
      ዌልሽ: "cy",
      ዐረብኛ: "ar",
      ዕብራይስጥ: "he",
      ዙሉኛ: "zu",
      "የሃይቲ ክረኦሌኛ": "ht",
      "የስኮት ጌልክኛ": "gd",
      ዩክሬንኛ: "uk",
      ደችኛ: "nl",
      ዴንሽኛ: "da",
      ጀርመንኛ: "de",
      ጃፓንኛ: "ja",
      ጋሊሺያኛ: "gl",
      ግሪክኛ: "el",
      ጣሊያንኛ: "it",
      ፈረንሳይኛ: "fr",
      ፊኒሽኛ: "fi",
      ፐርሺያኛ: "fa",
      ፖሊሽኛ: "pl",
      ፖርቱጋሊኛ: "pt",
      "ả rập": "ar",
      "‏סינית (פשוטה)": "zh-cn",
      にほんご: "ja",
      アイスランド語: "is",
      アイルランド語: "ga",
      アゼルバイジャン語: "az",
      アブハズ語: "ab",
      アムハラ語: "am",
      アラビア語: "ar",
      アルバニア語: "sq",
      アルメニア語: "hy",
      イタリア語: "it",
      インドネシア語: "id",
      ウェールズ語: "cy",
      ウクライナ語: "uk",
      ウズベク語: "uz",
      エストニア語: "et",
      エスペラント語: "eo",
      オランダ語: "nl",
      カタルーニャ語: "ca",
      カンナダ語: "kn",
      ガリシア語: "gl",
      ギリシャ語: "el",
      "クルド語（クルマンジー）": "ku",
      "クルド語（ソラニー）": "ckb",
      クロアチア語: "hr",
      スウェーデン語: "sv",
      "スコットランド ゲール語": "gd",
      スペイン語: "es",
      スロバキア語: "sk",
      スロベニア語: "sl",
      ズールー語: "zu",
      セルビア語: "sr",
      タイ語: "th",
      チェコ語: "cs",
      テルグ語: "te",
      デンマーク語: "da",
      トルコ語: "tr",
      ドイツ語: "de",
      ノルウェー語: "nb",
      ハイチ語: "ht",
      ハンガリー語: "hu",
      バスク語: "eu",
      ヒンディー語: "hi",
      フィンランド語: "fi",
      フランス語: "fr",
      ブルガリア語: "bg",
      ヘブライ語: "he",
      ベトナム語: "vi",
      ベラルーシ語: "be",
      ペルシャ語: "fa",
      ポルトガル語: "pt",
      ポーランド語: "pl",
      マオリ語: "mi",
      マケドニア語: "mk",
      マラヤーラム語: "ml",
      マラーティー語: "mr",
      マルタ語: "mt",
      マレー語: "ms",
      "ミャンマー語（ビルマ語）": "my",
      モンゴル語: "mn",
      ラテン語: "la",
      ラトビア語: "lv",
      リトアニア語: "lt",
      ルーマニア語: "ro",
      ロシア語: "ru",
      世界語: "eo",
      世界语: "eo",
      "中国語（簡体）": "zh-cn",
      "中国語（繁体）": "zh-tw",
      "中文 (簡體)": "zh-cn",
      "中文 (繁體)": "zh-tw",
      "中文（简体）": "zh-cn",
      "中文（繁体）": "zh-tw",
      丹麥文: "da",
      丹麦语: "da",
      乌克兰语: "uk",
      乌兹别克语: "uz",
      亚美尼亚语: "hy",
      亞塞拜然文: "az",
      亞美尼亞文: "hy",
      俄文: "ru",
      俄语: "ru",
      保加利亚语: "bg",
      保加利亞文: "bg",
      克罗地亚语: "hr",
      克羅埃西亞文: "hr",
      冰岛语: "is",
      冰島文: "is",
      加利西亚语: "gl",
      加泰罗尼亚语: "ca",
      加泰隆尼亞文: "ca",
      加里西亞文: "gl",
      匈牙利文: "hu",
      匈牙利语: "hu",
      南非祖魯文: "zu",
      卡納達文: "kn",
      卡纳达语: "kn",
      印地文: "hi",
      印地语: "hi",
      印尼文: "id",
      印尼语: "id",
      土耳其文: "tr",
      土耳其语: "tr",
      塞尔维亚语: "sr",
      塞爾維亞文: "sr",
      威尔士语: "cy",
      威爾斯文: "cy",
      巴斯克文: "eu",
      巴斯克语: "eu",
      希伯來文: "he",
      希伯来语: "he",
      希腊语: "el",
      希臘文: "el",
      "库尔德语（库尔曼吉语）": "ku",
      "库尔德语（索拉尼）": "ckb",
      "庫德文 (庫爾曼吉文)": "ku",
      "庫德文 (索拉尼文)": "ckb",
      德文: "de",
      德语: "de",
      意大利语: "it",
      愛沙尼亞文: "et",
      愛爾蘭文: "ga",
      拉丁文: "la",
      拉丁语: "la",
      拉脫維亞文: "lv",
      拉脱维亚语: "lv",
      挪威文: "nb",
      挪威语: "nb",
      捷克文: "cs",
      捷克语: "cs",
      斯洛伐克文: "sk",
      斯洛伐克语: "sk",
      斯洛文尼亚语: "sl",
      斯洛維尼亞文: "sl",
      日文: "ja",
      日本語: "ja",
      日语: "ja",
      毛利文: "mi",
      毛利语: "mi",
      法文: "fr",
      法语: "fr",
      波兰语: "pl",
      波斯文: "fa",
      波斯语: "fa",
      波蘭文: "pl",
      泰卢固语: "te",
      泰文: "th",
      泰盧固文: "te",
      泰语: "th",
      海地克里奥尔语: "ht",
      海地克里奧文: "ht",
      烏克蘭文: "uk",
      烏茲別克文: "uz",
      爱尔兰语: "ga",
      爱沙尼亚语: "et",
      瑞典文: "sv",
      瑞典语: "sv",
      白俄罗斯语: "be",
      白俄羅斯文: "be",
      祖鲁语: "zu",
      立陶宛文: "lt",
      立陶宛语: "lt",
      緬甸文: "my",
      缅甸语: "my",
      罗马尼亚语: "ro",
      羅馬尼亞文: "ro",
      義大利文: "it",
      芬兰语: "fi",
      芬蘭文: "fi",
      苏格兰盖尔语: "gd",
      英文: "en",
      英語: "en",
      英语: "en",
      荷兰语: "nl",
      荷蘭文: "nl",
      葡萄牙文: "pt",
      葡萄牙语: "pt",
      蒙古文: "mn",
      蒙古语: "mn",
      蘇格蘭蓋爾文: "gd",
      西班牙文: "es",
      西班牙语: "es",
      越南文: "vi",
      越南语: "vi",
      阿塞拜疆语: "az",
      阿姆哈拉文: "am",
      阿姆哈拉语: "am",
      阿尔巴尼亚语: "sq",
      阿布哈兹语: "ab",
      阿布哈茲文: "ab",
      阿拉伯文: "ar",
      阿拉伯语: "ar",
      阿爾巴尼亞文: "sq",
      韓国語: "ko",
      韓文: "ko",
      韩语: "ko",
      馬來文: "ms",
      馬其頓文: "mk",
      馬拉地文: "mr",
      馬拉雅拉姆文: "ml",
      馬耳他文: "mt",
      马其顿语: "mk",
      马拉地语: "mr",
      马拉雅拉姆语: "ml",
      马来语: "ms",
      马耳他语: "mt",
      갈리시아어: "gl",
      그리스어: "el",
      네덜란드어: "nl",
      노르웨이어: "nb",
      덴마크어: "da",
      독일어: "de",
      라트비아어: "lv",
      라틴어: "la",
      러시아어: "ru",
      루마니아어: "ro",
      리투아니아어: "lt",
      마라티어: "mr",
      마오리어: "mi",
      마케도니아어: "mk",
      말라얄람어: "ml",
      말레이어: "ms",
      몰타어: "mt",
      몽골어: "mn",
      "미얀마어(버마어)": "my",
      바스크어: "eu",
      베트남어: "vi",
      벨라루스어: "be",
      불가리아어: "bg",
      세르비아어: "sr",
      스웨덴어: "sv",
      "스코틀랜드 게일어": "gd",
      스페인어: "es",
      슬로바키아어: "sk",
      슬로베니아어: "sl",
      아랍어: "ar",
      아르메니아어: "hy",
      아이슬란드어: "is",
      "아이티 크리올어": "ht",
      아일랜드어: "ga",
      아제르바이잔어: "az",
      알바니아어: "sq",
      암하라어: "am",
      압하지야어: "ab",
      에스토니아어: "et",
      에스페란토어: "eo",
      영어: "en",
      우즈베크어: "uz",
      우크라이나어: "uk",
      웨일즈어: "cy",
      이탈리아어: "it",
      인도네시아어: "id",
      일본어: "ja",
      줄루어: "zu",
      "중국어(간체)": "zh-cn",
      "중국어(번체)": "zh-tw",
      체코어: "cs",
      카탈로니아어: "ca",
      칸나다어: "kn",
      "쿠르드어(소라니)": "ckb",
      "쿠르드어(쿠르만지)": "ku",
      크로아티아어: "hr",
      태국어: "th",
      터키어: "tr",
      텔루구어: "te",
      페르시아어: "fa",
      포르투갈어: "pt",
      폴란드어: "pl",
      프랑스어: "fr",
      핀란드어: "fi",
      한국어: "ko",
      헝가리어: "hu",
      히브리어: "he",
      힌디어: "hi",
    },
    previouslySupported: [
      "ab",
      "ms",
      "be",
      "eo",
      "hy",
      "hi",
      "kn",
      "ht",
      "ku",
      "la",
      "mk",
      "ml",
      "mt",
      "mr",
      "mn",
      "my",
      "nn",
      "sq",
      "te",
      "uz",
    ],
    scratchToGoogleMap: {
      "es-419": "es",
      he: "iw",
      "ja-hira": "ja",
      nb: "no",
      "pt-br": "pt",
      "zh-cn": "zh",
    },
    spokenLanguages: {
      ab: [
        {
          code: "zh-cn",
          name: "Ачинатә (мандарин)",
        },
        {
          code: "hi",
          name: "Ахинди",
        },
        {
          code: "pt-br",
          name: "Апортугалтә (Бразилиа)",
        },
        {
          code: "es-419",
          name: "Испан бызшәа (Латинтәи Америка)",
        },
      ],
      am: [
        {
          code: "zh-cn",
          name: "ቻይንኛ (ማንዳሪን)",
        },
        {
          code: "hi",
          name: "ሂንዲ",
        },
        {
          code: "pt-br",
          name: "ፖርቱጋልኛ (ብራዚል)",
        },
        {
          code: "es-419",
          name: "ስፓኒሽ (ላቲን አሜሪካ)",
        },
      ],
      ar: [
        {
          code: "zh-cn",
          name: "الصينية (المندرينية)",
        },
        {
          code: "hi",
          name: "الهندية",
        },
        {
          code: "pt-br",
          name: "البرتغالية (البرازيلية)",
        },
        {
          code: "es-419",
          name: "الإسبانية (أمريكا اللاتينية)",
        },
      ],
      az: [
        {
          code: "zh-cn",
          name: "Çin (Mandarin)",
        },
        {
          code: "hi",
          name: "hind",
        },
        {
          code: "pt-br",
          name: "Portuqal (Braziliya)",
        },
        {
          code: "es-419",
          name: "İspan (Latın Amerikası)",
        },
      ],
      be: [
        {
          code: "zh-cn",
          name: "кітайская (мандарын)",
        },
        {
          code: "hi",
          name: "Хіндзі",
        },
        {
          code: "pt-br",
          name: "партугальская (бразільская)",
        },
        {
          code: "es-419",
          name: "іспанская (лацінаамерыканская)",
        },
      ],
      bg: [
        {
          code: "zh-cn",
          name: "китайски (мандарин)",
        },
        {
          code: "hi",
          name: "хинди",
        },
        {
          code: "pt-br",
          name: "португалски (бразилски)",
        },
        {
          code: "es-419",
          name: "испански (латиноамерикански)",
        },
      ],
      ca: [
        {
          code: "zh-cn",
          name: "Xinès (mandarí)",
        },
        {
          code: "hi",
          name: "hindi",
        },
        {
          code: "pt-br",
          name: "portuguès (brasiler)",
        },
        {
          code: "es-419",
          name: "espanyol (llatinoamericà)",
        },
      ],
      ckb: [
        {
          code: "zh-cn",
          name: "چینی (ماندارین)",
        },
        {
          code: "hi",
          name: "هیندی",
        },
        {
          code: "pt-br",
          name: "زمانی پورتوگالی (بەرازیلی)",
        },
        {
          code: "es-419",
          name: "ئیسپانی (ئەمریکی لاتین)",
        },
      ],
      cs: [
        {
          code: "zh-cn",
          name: "čínština (mandarínština)",
        },
        {
          code: "hi",
          name: "hindština",
        },
        {
          code: "pt-br",
          name: "portugalština (brazilská)",
        },
        {
          code: "es-419",
          name: "španělština (latinskoamerická)",
        },
      ],
      cy: [
        {
          code: "zh-cn",
          name: "Tsieinëeg (Mandarin)",
        },
        {
          code: "hi",
          name: "Hindi",
        },
        {
          code: "pt-br",
          name: "Portiwgaleg (Brasil)",
        },
        {
          code: "es-419",
          name: "Sbaeneg (America Lladin)",
        },
      ],
      da: [
        {
          code: "zh-cn",
          name: "kinesisk (mandarin)",
        },
        {
          code: "hi",
          name: "hindi",
        },
        {
          code: "pt-br",
          name: "portugisisk (brasiliansk)",
        },
        {
          code: "es-419",
          name: "spansk (latinamerikansk)",
        },
      ],
      de: [
        {
          code: "zh-cn",
          name: "Chinesisch (Mandarin)",
        },
        {
          code: "hi",
          name: "Hindi",
        },
        {
          code: "pt-br",
          name: "Portugiesisch (Brasilianisch)",
        },
        {
          code: "es-419",
          name: "Spanisch (Lateinamerika)",
        },
      ],
      el: [
        {
          code: "zh-cn",
          name: "κινέζικα (μανταρίνια)",
        },
        {
          code: "hi",
          name: "Χίντι",
        },
        {
          code: "pt-br",
          name: "Πορτογαλικά (Βραζιλιάνικα)",
        },
        {
          code: "es-419",
          name: "Ισπανικά (Λατινικής Αμερικής)",
        },
      ],
      en: [
        {
          code: "zh-cn",
          name: "Chinese (Mandarin)",
        },
      ],
      eo: [
        {
          code: "zh-cn",
          name: "Ĉina (mandarina)",
        },
        {
          code: "hi",
          name: "Hindia",
        },
        {
          code: "pt-br",
          name: "Portugala (brazila)",
        },
        {
          code: "es-419",
          name: "hispana (latin-amerika)",
        },
      ],
      es: [
        {
          code: "zh-cn",
          name: "Chino (mandarín)",
        },
        {
          code: "hi",
          name: "hindi",
        },
        {
          code: "pt-br",
          name: "Portugués (brasileño)",
        },
        {
          code: "es-419",
          name: "Español (Latinoamérica)",
        },
      ],
      "es-419": [
        {
          code: "zh-cn",
          name: "Chino (mandarín)",
        },
        {
          code: "hi",
          name: "hindi",
        },
        {
          code: "pt-br",
          name: "Portugués (brasileño)",
        },
        {
          code: "es-419",
          name: "Español (Latinoamérica)",
        },
      ],
      et: [
        {
          code: "zh-cn",
          name: "hiina (mandariini)",
        },
        {
          code: "hi",
          name: "hindi",
        },
        {
          code: "pt-br",
          name: "portugali (Brasiilia)",
        },
        {
          code: "es-419",
          name: "hispaania (Ladina-Ameerika)",
        },
      ],
      eu: [
        {
          code: "zh-cn",
          name: "txinera (mandariarra)",
        },
        {
          code: "hi",
          name: "Hindia",
        },
        {
          code: "pt-br",
          name: "portugesa (brasildarra)",
        },
        {
          code: "es-419",
          name: "Gaztelania (Latinoamerika)",
        },
      ],
      fa: [
        {
          code: "zh-cn",
          name: "چینی (ماندارین)",
        },
        {
          code: "hi",
          name: "هندی",
        },
        {
          code: "pt-br",
          name: "پرتغالی (برزیلی)",
        },
        {
          code: "es-419",
          name: "اسپانیایی (آمریکای لاتین)",
        },
      ],
      fi: [
        {
          code: "zh-cn",
          name: "kiina (mandariini)",
        },
        {
          code: "hi",
          name: "hindi",
        },
        {
          code: "pt-br",
          name: "portugali (Brasilia)",
        },
        {
          code: "es-419",
          name: "espanja (latinalainen Amerikka)",
        },
      ],
      fr: [
        {
          code: "zh-cn",
          name: "Chinois (mandarin)",
        },
        {
          code: "hi",
          name: "hindi",
        },
        {
          code: "pt-br",
          name: "Portugais (brésilien)",
        },
        {
          code: "es-419",
          name: "Espagnol (Amérique latine)",
        },
      ],
      ga: [
        {
          code: "zh-cn",
          name: "Sínis (Mandairínis)",
        },
        {
          code: "hi",
          name: "Hiondúis",
        },
        {
          code: "pt-br",
          name: "Portaingéilis (An Bhrasaíl)",
        },
        {
          code: "es-419",
          name: "Spáinnis (Mheiriceá Laidineach)",
        },
      ],
      gd: [
        {
          code: "zh-cn",
          name: "Sìonais (Mandarin)",
        },
        {
          code: "hi",
          name: "Indeach",
        },
        {
          code: "pt-br",
          name: "Portagailis (Braisil)",
        },
        {
          code: "es-419",
          name: "Spàinntis (Ameireagaidh Laidinn)",
        },
      ],
      gl: [
        {
          code: "zh-cn",
          name: "chinés (mandarín)",
        },
        {
          code: "hi",
          name: "Hindi",
        },
        {
          code: "pt-br",
          name: "portugués (brasileiro)",
        },
        {
          code: "es-419",
          name: "español (latinoamericano)",
        },
      ],
      he: [
        {
          code: "zh-cn",
          name: "סינית (מנדרינית)",
        },
        {
          code: "hi",
          name: "הינדי",
        },
        {
          code: "pt-br",
          name: "פורטוגזית (ברזילאית)",
        },
        {
          code: "es-419",
          name: "ספרדית (אמריקה הלטינית)",
        },
      ],
      hi: [
        {
          code: "zh-cn",
          name: "चीनी (मंदारिन)",
        },
        {
          code: "hi",
          name: "हिन्दी",
        },
        {
          code: "pt-br",
          name: "पुर्तगाली (ब्राजील)",
        },
        {
          code: "es-419",
          name: "स्पैनिश (लैटिन अमेरिकी)",
        },
      ],
      hr: [
        {
          code: "zh-cn",
          name: "kineski (mandarinski)",
        },
        {
          code: "hi",
          name: "hindski",
        },
        {
          code: "pt-br",
          name: "portugalski (brazilski)",
        },
        {
          code: "es-419",
          name: "španjolski (latinoamerički)",
        },
      ],
      ht: [
        {
          code: "zh-cn",
          name: "Chinwa (Mandarin)",
        },
        {
          code: "hi",
          name: "Hindi",
        },
        {
          code: "pt-br",
          name: "Pòtigè (Brezilyen)",
        },
        {
          code: "es-419",
          name: "Panyòl (Ameriken Latin)",
        },
      ],
      hu: [
        {
          code: "zh-cn",
          name: "kínai (mandarin)",
        },
        {
          code: "hi",
          name: "hindi",
        },
        {
          code: "pt-br",
          name: "portugál (brazil)",
        },
        {
          code: "es-419",
          name: "spanyol (latin-amerikai)",
        },
      ],
      hy: [
        {
          code: "zh-cn",
          name: "չինարեն (մանդարին)",
        },
        {
          code: "hi",
          name: "հինդի",
        },
        {
          code: "pt-br",
          name: "պորտուգալերեն (բրազիլերեն)",
        },
        {
          code: "es-419",
          name: "իսպաներեն (լատինամերիկյան)",
        },
      ],
      id: [
        {
          code: "zh-cn",
          name: "Bahasa Mandarin (Cina)",
        },
        {
          code: "hi",
          name: "Hindi",
        },
        {
          code: "pt-br",
          name: "Portugis (Brasil)",
        },
        {
          code: "es-419",
          name: "Spanyol (Amerika Latin)",
        },
      ],
      is: [
        {
          code: "zh-cn",
          name: "kínverska (mandarín)",
        },
        {
          code: "hi",
          name: "hindí",
        },
        {
          code: "pt-br",
          name: "Portúgalska (Brasilíska)",
        },
        {
          code: "es-419",
          name: "Spænska (latínameríska)",
        },
      ],
      it: [
        {
          code: "zh-cn",
          name: "Cinese (mandarino)",
        },
        {
          code: "hi",
          name: "hindi",
        },
        {
          code: "pt-br",
          name: "portoghese (brasiliano)",
        },
        {
          code: "es-419",
          name: "Spagnolo (latinoamericano)",
        },
      ],
      ja: [
        {
          code: "zh-cn",
          name: "中国語（北京語）",
        },
        {
          code: "hi",
          name: "ヒンディー語",
        },
        {
          code: "pt-br",
          name: "ポルトガル語（ブラジル）",
        },
        {
          code: "es-419",
          name: "スペイン語（ラテンアメリカ）",
        },
      ],
      "ja-hira": [
        {
          code: "zh-cn",
          name: "中国語（北京語）",
        },
        {
          code: "hi",
          name: "ヒンディー語",
        },
        {
          code: "pt-br",
          name: "ポルトガル語（ブラジル）",
        },
        {
          code: "es-419",
          name: "スペイン語（ラテンアメリカ）",
        },
      ],
      kn: [
        {
          code: "zh-cn",
          name: "ಚೈನೀಸ್ (ಮ್ಯಾಂಡರಿನ್)",
        },
        {
          code: "hi",
          name: "ಹಿಂದಿ",
        },
        {
          code: "pt-br",
          name: "ಪೋರ್ಚುಗೀಸ್ (ಬ್ರೆಜಿಲಿಯನ್)",
        },
        {
          code: "es-419",
          name: "ಸ್ಪ್ಯಾನಿಷ್ (ಲ್ಯಾಟಿನ್ ಅಮೇರಿಕನ್)",
        },
      ],
      ko: [
        {
          code: "zh-cn",
          name: "중국어(만다린)",
        },
        {
          code: "hi",
          name: "힌디 어",
        },
        {
          code: "pt-br",
          name: "포르투갈어(브라질)",
        },
        {
          code: "es-419",
          name: "스페인어(라틴 아메리카)",
        },
      ],
      ku: [
        {
          code: "zh-cn",
          name: "Çînî (Mandarîn)",
        },
        {
          code: "hi",
          name: "Hindî",
        },
        {
          code: "pt-br",
          name: "Portekîzî (Brazîlya)",
        },
        {
          code: "es-419",
          name: "Spanî (Amerîkaya Latîn)",
        },
      ],
      la: [
        {
          code: "zh-cn",
          name: "Seres (Mandarin)",
        },
        {
          code: "hi",
          name: "Hindi",
        },
        {
          code: "pt-br",
          name: "Portuguese (Brazilian)",
        },
        {
          code: "es-419",
          name: "Spanish",
        },
      ],
      lt: [
        {
          code: "zh-cn",
          name: "kinų (mandarinų)",
        },
        {
          code: "hi",
          name: "hindi",
        },
        {
          code: "pt-br",
          name: "portugalų (Brazilijos)",
        },
        {
          code: "es-419",
          name: "Ispanų (Lotynų Amerikos)",
        },
      ],
      lv: [
        {
          code: "zh-cn",
          name: "ķīniešu (mandarīnu)",
        },
        {
          code: "hi",
          name: "hindi",
        },
        {
          code: "pt-br",
          name: "portugāļu (Brazīlijas)",
        },
        {
          code: "es-419",
          name: "spāņu (latīņamerikāņu)",
        },
      ],
      mi: [
        {
          code: "zh-cn",
          name: "Hainamana (Māriki)",
        },
        {
          code: "hi",
          name: "Hindi",
        },
        {
          code: "pt-br",
          name: "Potiti (Brazilian)",
        },
        {
          code: "es-419",
          name: "Paniora (Amerika Raina)",
        },
      ],
      mk: [
        {
          code: "zh-cn",
          name: "кинески (мандарински)",
        },
        {
          code: "hi",
          name: "хинди",
        },
        {
          code: "pt-br",
          name: "португалски (бразилски)",
        },
        {
          code: "es-419",
          name: "шпански (латиноамерикански)",
        },
      ],
      ml: [
        {
          code: "zh-cn",
          name: "ചൈനീസ് (മാൻഡറിൻ)",
        },
        {
          code: "hi",
          name: "ഹിന്ദി",
        },
        {
          code: "pt-br",
          name: "പോർച്ചുഗീസ് (ബ്രസീലിയൻ)",
        },
        {
          code: "es-419",
          name: "സ്പാനിഷ് (ലാറ്റിൻ അമേരിക്കൻ)",
        },
      ],
      mn: [
        {
          code: "zh-cn",
          name: "Хятад (Мандарин)",
        },
        {
          code: "hi",
          name: "Хинди",
        },
        {
          code: "pt-br",
          name: "Португали (Бразил)",
        },
        {
          code: "es-419",
          name: "Испани (Латин Америк)",
        },
      ],
      mr: [
        {
          code: "zh-cn",
          name: "चीनी (मंडारीन)",
        },
        {
          code: "hi",
          name: "हिंदी",
        },
        {
          code: "pt-br",
          name: "पोर्तुगीज (ब्राझिलियन)",
        },
        {
          code: "es-419",
          name: "स्पॅनिश (लॅटिन अमेरिकन)",
        },
      ],
      ms: [
        {
          code: "zh-cn",
          name: "Cina (Mandarin)",
        },
        {
          code: "hi",
          name: "Hindi",
        },
        {
          code: "pt-br",
          name: "Portugis (Brazil)",
        },
        {
          code: "es-419",
          name: "Sepanyol (Amerika Latin)",
        },
      ],
      mt: [
        {
          code: "zh-cn",
          name: "Ċiniż (Mandarin)",
        },
        {
          code: "hi",
          name: "Ħindi",
        },
        {
          code: "pt-br",
          name: "Portugiż (Brażiljan)",
        },
        {
          code: "es-419",
          name: "Spanjol (Amerika Latina)",
        },
      ],
      my: [
        {
          code: "zh-cn",
          name: "တရုတ် (မန်ဒရင်း)",
        },
        {
          code: "hi",
          name: "ဟိန္ဒီ",
        },
        {
          code: "pt-br",
          name: "ပေါ်တူဂီ (ဘရာဇီး)",
        },
        {
          code: "es-419",
          name: "စပိန် (လက်တင်အမေရိက)",
        },
      ],
      nb: [
        {
          code: "zh-cn",
          name: "kinesisk (mandarin)",
        },
        {
          code: "hi",
          name: "Hindi",
        },
        {
          code: "pt-br",
          name: "portugisisk (brasiliansk)",
        },
        {
          code: "es-419",
          name: "spansk (latinamerikansk)",
        },
      ],
      nl: [
        {
          code: "zh-cn",
          name: "Chinees (Mandarijn)",
        },
        {
          code: "hi",
          name: "Hindi",
        },
        {
          code: "pt-br",
          name: "Portugees (Braziliaans)",
        },
        {
          code: "es-419",
          name: "Spaans (Latijns-Amerikaans)",
        },
      ],
      pl: [
        {
          code: "zh-cn",
          name: "chiński (mandaryński)",
        },
        {
          code: "hi",
          name: "hinduski",
        },
        {
          code: "pt-br",
          name: "portugalski (brazylijski)",
        },
        {
          code: "es-419",
          name: "hiszpański (Ameryka Łacińska)",
        },
      ],
      pt: [
        {
          code: "zh-cn",
          name: "Chinês (Mandarim)",
        },
        {
          code: "hi",
          name: "hindi",
        },
        {
          code: "pt-br",
          name: "Português (Brasileiro)",
        },
        {
          code: "es-419",
          name: "Espanhol (latino-americano)",
        },
      ],
      "pt-br": [
        {
          code: "zh-cn",
          name: "Chinês (Mandarim)",
        },
        {
          code: "hi",
          name: "hindi",
        },
        {
          code: "pt-br",
          name: "Português (Brasileiro)",
        },
        {
          code: "es-419",
          name: "Espanhol (latino-americano)",
        },
      ],
      ro: [
        {
          code: "zh-cn",
          name: "Chineză (mandarina)",
        },
        {
          code: "hi",
          name: "hindi",
        },
        {
          code: "pt-br",
          name: "portugheză (braziliană)",
        },
        {
          code: "es-419",
          name: "Spaniolă (America Latină)",
        },
      ],
      ru: [
        {
          code: "zh-cn",
          name: "Китайский (мандарин)",
        },
        {
          code: "hi",
          name: "хинди",
        },
        {
          code: "pt-br",
          name: "Португальский (бразильский)",
        },
        {
          code: "es-419",
          name: "Испанский (Латинская Америка)",
        },
      ],
      sk: [
        {
          code: "zh-cn",
          name: "čínština (mandarínčina)",
        },
        {
          code: "hi",
          name: "hindčina",
        },
        {
          code: "pt-br",
          name: "portugalčina (brazílska)",
        },
        {
          code: "es-419",
          name: "španielčina (latinskoamerická)",
        },
      ],
      sl: [
        {
          code: "zh-cn",
          name: "kitajščina (mandarinščina)",
        },
        {
          code: "hi",
          name: "Hindi",
        },
        {
          code: "pt-br",
          name: "portugalščina (brazilščina)",
        },
        {
          code: "es-419",
          name: "španščina (latinskoameriška)",
        },
      ],
      sq: [
        {
          code: "zh-cn",
          name: "Kinezisht (mandarinisht)",
        },
        {
          code: "hi",
          name: "Hindi",
        },
        {
          code: "pt-br",
          name: "portugeze (braziliane)",
        },
        {
          code: "es-419",
          name: "Spanjisht (Amerikan Latine)",
        },
      ],
      sr: [
        {
          code: "zh-cn",
          name: "кинески (мандарински)",
        },
        {
          code: "hi",
          name: "Хинди",
        },
        {
          code: "pt-br",
          name: "португалски (бразилски)",
        },
        {
          code: "es-419",
          name: "шпански (латиноамерички)",
        },
      ],
      sv: [
        {
          code: "zh-cn",
          name: "kinesiska (mandarin)",
        },
        {
          code: "hi",
          name: "hindi",
        },
        {
          code: "pt-br",
          name: "portugisiska (brasilianska)",
        },
        {
          code: "es-419",
          name: "spanska (latinamerikansk)",
        },
      ],
      te: [
        {
          code: "zh-cn",
          name: "చైనీస్ (మాండరిన్)",
        },
        {
          code: "hi",
          name: "హిందీ",
        },
        {
          code: "pt-br",
          name: "పోర్చుగీస్ (బ్రెజిలియన్)",
        },
        {
          code: "es-419",
          name: "స్పానిష్ (లాటిన్ అమెరికన్)",
        },
      ],
      th: [
        {
          code: "zh-cn",
          name: "ภาษาจีน (แมนดาริน)",
        },
        {
          code: "hi",
          name: "ภาษาฮินดี",
        },
        {
          code: "pt-br",
          name: "โปรตุเกส (บราซิล)",
        },
        {
          code: "es-419",
          name: "สเปน (ลาตินอเมริกา)",
        },
      ],
      tr: [
        {
          code: "zh-cn",
          name: "Çince (Mandarin)",
        },
        {
          code: "hi",
          name: "Hintçe",
        },
        {
          code: "pt-br",
          name: "Portekizce (Brezilya)",
        },
        {
          code: "es-419",
          name: "İspanyolca (Latin Amerika)",
        },
      ],
      uk: [
        {
          code: "zh-cn",
          name: "китайська (мандарин)",
        },
        {
          code: "hi",
          name: "Хінді",
        },
        {
          code: "pt-br",
          name: "португальська (бразильська)",
        },
        {
          code: "es-419",
          name: "Іспанська (Латинська Америка)",
        },
      ],
      uz: [
        {
          code: "zh-cn",
          name: "Xitoy (mandarin)",
        },
        {
          code: "hi",
          name: "hind",
        },
        {
          code: "pt-br",
          name: "Portugal (Braziliya)",
        },
        {
          code: "es-419",
          name: "Ispan (Lotin Amerikasi)",
        },
      ],
      vi: [
        {
          code: "zh-cn",
          name: "Tiếng Trung (Quan Thoại)",
        },
        {
          code: "hi",
          name: "Tiếng Hin-ddi",
        },
        {
          code: "pt-br",
          name: "Tiếng Bồ Đào Nha (Brazil)",
        },
        {
          code: "es-419",
          name: "Tiếng Tây Ban Nha (Mỹ Latinh)",
        },
      ],
      "zh-cn": [
        {
          code: "zh-cn",
          name: "中文",
        },
        {
          code: "hi",
          name: "印地语",
        },
        {
          code: "pt-br",
          name: "葡萄牙语（巴西）",
        },
        {
          code: "es-419",
          name: "西班牙语（拉丁美洲）",
        },
      ],
      "zh-tw": [
        {
          code: "zh-cn",
          name: "中文",
        },
        {
          code: "hi",
          name: "印地語",
        },
        {
          code: "pt-br",
          name: "葡萄牙語（巴西）",
        },
        {
          code: "es-419",
          name: "西班牙語（拉丁美洲）",
        },
      ],
      zu: [
        {
          code: "zh-cn",
          name: "IsiShayina (Mandarin)",
        },
        {
          code: "hi",
          name: "IsiHindi",
        },
        {
          code: "pt-br",
          name: "Isi-Portuguese (Brazilian)",
        },
        {
          code: "es-419",
          name: "Isi-Spanish (Latin American)",
        },
      ],
    },
  };
  async function getLanguageNameAndCodeLookupTableGLOBALIZED() {
    let fetchResult;
    try {
      fetchResult = await Scratch.fetch(
        "https://raw.githubusercontent.com/TurboWarp/scratch-translate-extension-languages-mirror/main/package/languages.json" // TurboWarp's mirror of the supported Translate extension languages.
      );
    } catch {
      fetchResult = null;
    }

    if (fetchResult) {
      return JSON.parse(await fetchResult.text());
    } else {
      return backupTable;
    }
  }
  languageNameAndCodeLookupTableGLOBALIZED =
    await getLanguageNameAndCodeLookupTableGLOBALIZED();

  let languageNameAndCodeLookupTable;

  let showRecreatableBlocks = true;
  let hasToggledRecreatableBlocks = false;

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("The Locale extension must run unsandboxed!");
  }
  let localeObject =
    // @ts-ignore
    Scratch.vm.runtime.extensionStorage["fakemonLocale"]?.localeObject || {};
  let blockExtensionIcon =
    "data:image/svg+xml,%3Csvg%20width%3D%22152%22%20height%3D%22152%22%20viewBox%3D%220%200%20152%20152%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20clip-path%3D%22url(%23a)%22%3E%3Cg%20filter%3D%22url(%23b)%22%3E%3Cpath%20d%3D%22M100.439%2040.336a6%206%200%200%201%206%206v61.178a6%206%200%200%201-6%206H41.394L31.906%20123l-9.516-9.517a6%206%200%200%201-5.39-5.969V46.337a6%206%200%200%201%206-6.001z%22%20fill%3D%22%23fff%22%2F%3E%3C%2Fg%3E%3Cpath%20d%3D%22m100.439%2040.336.001-2.5h-.001zm0%2073.178v2.5h.001zm-59.045%200v-2.5h-1.036l-.732.732zM31.906%20123l-1.767%201.768%201.767%201.767%201.768-1.767zm-9.516-9.517%201.767-1.767-.63-.63-.886-.09zm78.049-73.147v2.5a3.5%203.5%200%200%201%203.5%203.5h5a8.5%208.5%200%200%200-8.499-8.5zm6%206h-2.5v61.178h5V46.337zm0%2061.178h-2.5a3.5%203.5%200%200%201-3.5%203.5v2.5l.001%202.5a8.5%208.5%200%200%200%208.499-8.5zm-6%206v-2.5H41.394v5h59.045zm-59.045%200-1.768-1.768-9.487%209.486L31.906%20123l1.768%201.768%209.487-9.486zM31.906%20123l1.768-1.768-9.517-9.516-1.767%201.767-1.768%201.768%209.517%209.517zm-9.516-9.517.25-2.487a3.5%203.5%200%200%201-3.14-3.482h-5a8.5%208.5%200%200%200%207.638%208.457zM17%20107.514h2.5V46.337h-5v61.177zm0-61.177h2.5a3.5%203.5%200%200%201%203.5-3.501v-5a8.5%208.5%200%200%200-8.5%208.5zm6-6.001v2.5h77.439v-5H23z%22%20fill%3D%22%23000%22%20fill-opacity%3D%22.15%22%2F%3E%3Cg%20filter%3D%22url(%23c)%22%3E%3Cpath%20d%3D%22M128.196%2028a6%206%200%200%201%206%206v61.178a6%206%200%200%201-6%206H69.149l-9.486%209.486-9.516-9.518a6%206%200%200%201-5.39-5.968V34a6%206%200%200%201%206-6z%22%20fill%3D%22%23438feb%22%20shape-rendering%3D%22crispEdges%22%2F%3E%3Cpath%20d%3D%22M128.196%2028v-2.5zm6%2067.178h2.5zm-6%206v2.5zm-59.047%200v-2.5h-1.035l-.732.732zm-9.486%209.486-1.768%201.768%201.768%201.768%201.768-1.768zm-9.516-9.518%201.767-1.767-.63-.63-.886-.09zm-5.39-5.968h-2.5zm0-61.178h-2.5zm6-6v-2.5zm77.439%200v2.5a3.5%203.5%200%200%201%203.5%203.5h5a8.5%208.5%200%200%200-8.5-8.5zm6%206h-2.5v61.178h5V34zm0%2061.178h-2.5a3.5%203.5%200%200%201-3.5%203.5v5a8.5%208.5%200%200%200%208.5-8.5zm-6%206v-2.5H69.149v5h59.047zm-59.047%200-1.767-1.768-9.487%209.486%201.768%201.768%201.768%201.768%209.486-9.486zm-9.486%209.486%201.768-1.768-9.517-9.517-1.767%201.767-1.768%201.768%209.516%209.518zm-9.516-9.518.25-2.487a3.5%203.5%200%200%201-3.14-3.481h-5c0%204.404%203.348%208.022%207.638%208.456zm-5.39-5.968h2.5V34h-5v61.178zm0-61.178h2.5a3.5%203.5%200%200%201%203.5-3.5v-5a8.5%208.5%200%200%200-8.5%208.5zm6-6v2.5h77.439v-5h-77.44z%22%20fill%3D%22%23000%22%20fill-opacity%3D%22.15%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3Cdefs%3E%3Cfilter%20id%3D%22b%22%20x%3D%2214.5%22%20y%3D%2237.836%22%20width%3D%2294.439%22%20height%3D%2292.7%22%20filterUnits%3D%22userSpaceOnUse%22%20color-interpolation-filters%3D%22sRGB%22%3E%3CfeFlood%20flood-opacity%3D%220%22%20result%3D%22BackgroundImageFix%22%2F%3E%3CfeBlend%20in%3D%22SourceGraphic%22%20in2%3D%22BackgroundImageFix%22%20result%3D%22shape%22%2F%3E%3CfeColorMatrix%20in%3D%22SourceAlpha%22%20values%3D%220%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%20127%200%22%20result%3D%22hardAlpha%22%2F%3E%3CfeOffset%20dy%3D%224%22%2F%3E%3CfeGaussianBlur%20stdDeviation%3D%222%22%2F%3E%3CfeComposite%20in2%3D%22hardAlpha%22%20operator%3D%22arithmetic%22%20k2%3D%22-1%22%20k3%3D%221%22%2F%3E%3CfeColorMatrix%20values%3D%220%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200.25%200%22%2F%3E%3CfeBlend%20in2%3D%22shape%22%20result%3D%22effect1_innerShadow_131_48%22%2F%3E%3C%2Ffilter%3E%3Cfilter%20id%3D%22c%22%20x%3D%2238.257%22%20y%3D%2225.5%22%20width%3D%22102.439%22%20height%3D%2296.7%22%20filterUnits%3D%22userSpaceOnUse%22%20color-interpolation-filters%3D%22sRGB%22%3E%3CfeFlood%20flood-opacity%3D%220%22%20result%3D%22BackgroundImageFix%22%2F%3E%3CfeColorMatrix%20in%3D%22SourceAlpha%22%20values%3D%220%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%20127%200%22%20result%3D%22hardAlpha%22%2F%3E%3CfeOffset%20dy%3D%224%22%2F%3E%3CfeGaussianBlur%20stdDeviation%3D%222%22%2F%3E%3CfeComposite%20in2%3D%22hardAlpha%22%20operator%3D%22out%22%2F%3E%3CfeColorMatrix%20values%3D%220%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200%200.25%200%22%2F%3E%3CfeBlend%20in2%3D%22BackgroundImageFix%22%20result%3D%22effect1_dropShadow_131_48%22%2F%3E%3CfeBlend%20in%3D%22SourceGraphic%22%20in2%3D%22effect1_dropShadow_131_48%22%20result%3D%22shape%22%2F%3E%3C%2Ffilter%3E%3CclipPath%20id%3D%22a%22%3E%3Cpath%20fill%3D%22%23fff%22%20d%3D%22M0%200h152v152H0z%22%2F%3E%3C%2FclipPath%3E%3C%2Fdefs%3E%3C%2Fsvg%3E";
  let menuExtensionIcon =
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUyIiBoZWlnaHQ9IjE1MiIgdmlld0JveD0iMCAwIDE1MiAxNTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxnIGNsaXAtcGF0aD0idXJsKCNjbGlwMF8xMzFfNDgpIj4KPGNpcmNsZSBjeD0iNzYiIGN5PSI3NiIgcj0iNzYiIGZpbGw9IiMyNDVDQTAiLz4KPGNpcmNsZSBjeD0iNzYiIGN5PSI3NiIgcj0iNzMuNSIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLW9wYWNpdHk9IjAuMTUiIHN0cm9rZS13aWR0aD0iNSIvPgo8ZyBmaWx0ZXI9InVybCgjZmlsdGVyMF9pXzEzMV80OCkiPgo8cGF0aCBkPSJNMTAwLjQzOSA0MC4zMzU5QzEwMy43NTMgNDAuMzM2MSAxMDYuNDM5IDQzLjAyMzMgMTA2LjQzOSA0Ni4zMzY5VjEwNy41MTRDMTA2LjQzOSAxMTAuODI3IDEwMy43NTMgMTEzLjUxNCAxMDAuNDM5IDExMy41MTRINDEuMzkzNkwzMS45MDYyIDEyM0wyMi4zODk2IDExMy40ODNDMTkuMzYyNiAxMTMuMTc4IDE3IDExMC42MjEgMTcgMTA3LjUxNFY0Ni4zMzY5QzE3IDQzLjAyMzIgMTkuNjg2MyA0MC4zMzU5IDIzIDQwLjMzNTlIMTAwLjQzOVoiIGZpbGw9IndoaXRlIi8+CjwvZz4KPHBhdGggZD0iTTEwMC40MzkgNDAuMzM1OUwxMDAuNDQgMzcuODM1OUgxMDAuNDM5VjQwLjMzNTlaTTEwMC40MzkgMTEzLjUxNFYxMTYuMDE0SDEwMC40NEwxMDAuNDM5IDExMy41MTRaTTQxLjM5MzYgMTEzLjUxNFYxMTEuMDE0SDQwLjM1ODFMMzkuNjI1OSAxMTEuNzQ2TDQxLjM5MzYgMTEzLjUxNFpNMzEuOTA2MiAxMjNMMzAuMTM4NSAxMjQuNzY4TDMxLjkwNjIgMTI2LjUzNUwzMy42NzM5IDEyNC43NjhMMzEuOTA2MiAxMjNaTTIyLjM4OTYgMTEzLjQ4M0wyNC4xNTc0IDExMS43MTZMMjMuNTI3NCAxMTEuMDg2TDIyLjY0MDkgMTEwLjk5NkwyMi4zODk2IDExMy40ODNaTTEwMC40MzkgNDAuMzM1OUwxMDAuNDM5IDQyLjgzNTlDMTAyLjM3MiA0Mi44MzYgMTAzLjkzOSA0NC40MDM2IDEwMy45MzkgNDYuMzM2OUgxMDYuNDM5SDEwOC45MzlDMTA4LjkzOSA0MS42NDMgMTA1LjEzNCAzNy44MzYyIDEwMC40NCAzNy44MzU5TDEwMC40MzkgNDAuMzM1OVpNMTA2LjQzOSA0Ni4zMzY5SDEwMy45MzlWMTA3LjUxNEgxMDYuNDM5SDEwOC45MzlWNDYuMzM2OUgxMDYuNDM5Wk0xMDYuNDM5IDEwNy41MTRIMTAzLjkzOUMxMDMuOTM5IDEwOS40NDYgMTAyLjM3MiAxMTEuMDE0IDEwMC40MzkgMTExLjAxNEwxMDAuNDM5IDExMy41MTRMMTAwLjQ0IDExNi4wMTRDMTA1LjEzNCAxMTYuMDEzIDEwOC45MzkgMTEyLjIwOCAxMDguOTM5IDEwNy41MTRIMTA2LjQzOVpNMTAwLjQzOSAxMTMuNTE0VjExMS4wMTRINDEuMzkzNlYxMTMuNTE0VjExNi4wMTRIMTAwLjQzOVYxMTMuNTE0Wk00MS4zOTM2IDExMy41MTRMMzkuNjI1OSAxMTEuNzQ2TDMwLjEzODYgMTIxLjIzMkwzMS45MDYyIDEyM0wzMy42NzM5IDEyNC43NjhMNDMuMTYxMiAxMTUuMjgyTDQxLjM5MzYgMTEzLjUxNFpNMzEuOTA2MiAxMjNMMzMuNjc0IDEyMS4yMzJMMjQuMTU3NCAxMTEuNzE2TDIyLjM4OTYgMTEzLjQ4M0wyMC42MjE5IDExNS4yNTFMMzAuMTM4NSAxMjQuNzY4TDMxLjkwNjIgMTIzWk0yMi4zODk2IDExMy40ODNMMjIuNjQwOSAxMTAuOTk2QzIwLjg3ODEgMTEwLjgxOCAxOS41IDEwOS4zMjUgMTkuNSAxMDcuNTE0SDE3SDE0LjVDMTQuNSAxMTEuOTE4IDE3Ljg0NzIgMTE1LjUzNyAyMi4xMzg0IDExNS45NzFMMjIuMzg5NiAxMTMuNDgzWk0xNyAxMDcuNTE0SDE5LjVWNDYuMzM2OUgxN0gxNC41VjEwNy41MTRIMTdaTTE3IDQ2LjMzNjlIMTkuNUMxOS41IDQ0LjQwMzQgMjEuMDY3NSA0Mi44MzU5IDIzIDQyLjgzNTlWNDAuMzM1OVYzNy44MzU5QzE4LjMwNSAzNy44MzU5IDE0LjUgNDEuNjQzIDE0LjUgNDYuMzM2OUgxN1pNMjMgNDAuMzM1OVY0Mi44MzU5SDEwMC40MzlWNDAuMzM1OVYzNy44MzU5SDIzVjQwLjMzNTlaIiBmaWxsPSJibGFjayIgZmlsbC1vcGFjaXR5PSIwLjE1Ii8+CjxnIGZpbHRlcj0idXJsKCNmaWx0ZXIxX2RfMTMxXzQ4KSI+CjxwYXRoIGQ9Ik0xMjguMTk2IDI4QzEzMS41MSAyOC4wMDAxIDEzNC4xOTYgMzAuNjg2MyAxMzQuMTk2IDM0Vjk1LjE3NzdDMTM0LjE5NiA5OC40OTEzIDEzMS41MSAxMDEuMTc4IDEyOC4xOTYgMTAxLjE3OEg2OS4xNDk0TDU5LjY2MzEgMTEwLjY2NEw1MC4xNDY1IDEwMS4xNDZDNDcuMTE5NiAxMDAuODQxIDQ0Ljc1NyA5OC4yODUyIDQ0Ljc1NjggOTUuMTc3N1YzNEM0NC43NTY4IDMwLjY4NjQgNDcuNDQzMiAyOC4wMDAxIDUwLjc1NjggMjhIMTI4LjE5NloiIGZpbGw9IiM0MzhGRUIiIHNoYXBlLXJlbmRlcmluZz0iY3Jpc3BFZGdlcyIvPgo8cGF0aCBkPSJNMTI4LjE5NiAyOEwxMjguMTk2IDI1LjVIMTI4LjE5NlYyOFpNMTM0LjE5NiA5NS4xNzc3TDEzNi42OTYgOTUuMTc3OFY5NS4xNzc3SDEzNC4xOTZaTTEyOC4xOTYgMTAxLjE3OFYxMDMuNjc4SDEyOC4xOTZMMTI4LjE5NiAxMDEuMTc4Wk02OS4xNDk0IDEwMS4xNzhWOTguNjc3N0g2OC4xMTM5TDY3LjM4MTYgOTkuNDFMNjkuMTQ5NCAxMDEuMTc4Wk01OS42NjMxIDExMC42NjRMNTcuODk1MiAxMTIuNDMyTDU5LjY2MyAxMTQuMkw2MS40MzA5IDExMi40MzJMNTkuNjYzMSAxMTAuNjY0Wk01MC4xNDY1IDEwMS4xNDZMNTEuOTE0MyA5OS4zNzg4TDUxLjI4NDMgOTguNzQ4N0w1MC4zOTc5IDk4LjY1OTJMNTAuMTQ2NSAxMDEuMTQ2Wk00NC43NTY4IDk1LjE3NzdINDIuMjU2OFY5NS4xNzc4TDQ0Ljc1NjggOTUuMTc3N1pNNDQuNzU2OCAzNEw0Mi4yNTY4IDM0VjM0SDQ0Ljc1NjhaTTUwLjc1NjggMjhWMjUuNUg1MC43NTY4TDUwLjc1NjggMjhaTTEyOC4xOTYgMjhMMTI4LjE5NiAzMC41QzEzMC4xMjkgMzAuNSAxMzEuNjk2IDMyLjA2NzEgMTMxLjY5NiAzNEgxMzQuMTk2SDEzNi42OTZDMTM2LjY5NiAyOS4zMDU2IDEzMi44OTEgMjUuNTAwMSAxMjguMTk2IDI1LjVMMTI4LjE5NiAyOFpNMTM0LjE5NiAzNEgxMzEuNjk2Vjk1LjE3NzdIMTM0LjE5NkgxMzYuNjk2VjM0SDEzNC4xOTZaTTEzNC4xOTYgOTUuMTc3N0wxMzEuNjk2IDk1LjE3NzZDMTMxLjY5NiA5Ny4xMTA2IDEzMC4xMjkgOTguNjc3NyAxMjguMTk2IDk4LjY3NzdMMTI4LjE5NiAxMDEuMTc4TDEyOC4xOTYgMTAzLjY3OEMxMzIuODkxIDEwMy42NzggMTM2LjY5NiA5OS44NzIgMTM2LjY5NiA5NS4xNzc4TDEzNC4xOTYgOTUuMTc3N1pNMTI4LjE5NiAxMDEuMTc4Vjk4LjY3NzdINjkuMTQ5NFYxMDEuMTc4VjEwMy42NzhIMTI4LjE5NlYxMDEuMTc4Wk02OS4xNDk0IDEwMS4xNzhMNjcuMzgxNiA5OS40MUw1Ny44OTUzIDEwOC44OTZMNTkuNjYzMSAxMTAuNjY0TDYxLjQzMDkgMTEyLjQzMkw3MC45MTcyIDEwMi45NDZMNjkuMTQ5NCAxMDEuMTc4Wk01OS42NjMxIDExMC42NjRMNjEuNDMwOSAxMDguODk2TDUxLjkxNDMgOTkuMzc4OEw1MC4xNDY1IDEwMS4xNDZMNDguMzc4NiAxMDIuOTE0TDU3Ljg5NTIgMTEyLjQzMkw1OS42NjMxIDExMC42NjRaTTUwLjE0NjUgMTAxLjE0Nkw1MC4zOTc5IDk4LjY1OTJDNDguNjM0NiA5OC40ODA5IDQ3LjI1NjkgOTYuOTg4NSA0Ny4yNTY4IDk1LjE3NzZMNDQuNzU2OCA5NS4xNzc3TDQyLjI1NjggOTUuMTc3OEM0Mi4yNTcgOTkuNTgxOSA0NS42MDQ3IDEwMy4yIDQ5Ljg5NTEgMTAzLjYzNEw1MC4xNDY1IDEwMS4xNDZaTTQ0Ljc1NjggOTUuMTc3N0g0Ny4yNTY4VjM0SDQ0Ljc1NjhINDIuMjU2OFY5NS4xNzc3SDQ0Ljc1NjhaTTQ0Ljc1NjggMzRMNDcuMjU2OCAzNEM0Ny4yNTY4IDMyLjA2NzEgNDguODIzOSAzMC41MDAxIDUwLjc1NjkgMzAuNUw1MC43NTY4IDI4TDUwLjc1NjggMjUuNUM0Ni4wNjI2IDI1LjUwMDEgNDIuMjU2OCAyOS4zMDU2IDQyLjI1NjggMzRMNDQuNzU2OCAzNFpNNTAuNzU2OCAyOFYzMC41SDEyOC4xOTZWMjhWMjUuNUg1MC43NTY4VjI4WiIgZmlsbD0iYmxhY2siIGZpbGwtb3BhY2l0eT0iMC4xNSIvPgo8L2c+CjwvZz4KPGRlZnM+CjxmaWx0ZXIgaWQ9ImZpbHRlcjBfaV8xMzFfNDgiIHg9IjE0LjUiIHk9IjM3LjgzNTkiIHdpZHRoPSI5NC40Mzk1IiBoZWlnaHQ9IjkyLjY5OTUiIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj4KPGZlRmxvb2QgZmxvb2Qtb3BhY2l0eT0iMCIgcmVzdWx0PSJCYWNrZ3JvdW5kSW1hZ2VGaXgiLz4KPGZlQmxlbmQgbW9kZT0ibm9ybWFsIiBpbj0iU291cmNlR3JhcGhpYyIgaW4yPSJCYWNrZ3JvdW5kSW1hZ2VGaXgiIHJlc3VsdD0ic2hhcGUiLz4KPGZlQ29sb3JNYXRyaXggaW49IlNvdXJjZUFscGhhIiB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMTI3IDAiIHJlc3VsdD0iaGFyZEFscGhhIi8+CjxmZU9mZnNldCBkeT0iNCIvPgo8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIyIi8+CjxmZUNvbXBvc2l0ZSBpbjI9ImhhcmRBbHBoYSIgb3BlcmF0b3I9ImFyaXRobWV0aWMiIGsyPSItMSIgazM9IjEiLz4KPGZlQ29sb3JNYXRyaXggdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMjUgMCIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluMj0ic2hhcGUiIHJlc3VsdD0iZWZmZWN0MV9pbm5lclNoYWRvd18xMzFfNDgiLz4KPC9maWx0ZXI+CjxmaWx0ZXIgaWQ9ImZpbHRlcjFfZF8xMzFfNDgiIHg9IjM4LjI1NjgiIHk9IjI1LjUiIHdpZHRoPSIxMDIuNDM5IiBoZWlnaHQ9Ijk2LjY5OTciIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj4KPGZlRmxvb2QgZmxvb2Qtb3BhY2l0eT0iMCIgcmVzdWx0PSJCYWNrZ3JvdW5kSW1hZ2VGaXgiLz4KPGZlQ29sb3JNYXRyaXggaW49IlNvdXJjZUFscGhhIiB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMTI3IDAiIHJlc3VsdD0iaGFyZEFscGhhIi8+CjxmZU9mZnNldCBkeT0iNCIvPgo8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIyIi8+CjxmZUNvbXBvc2l0ZSBpbjI9ImhhcmRBbHBoYSIgb3BlcmF0b3I9Im91dCIvPgo8ZmVDb2xvck1hdHJpeCB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMC4yNSAwIi8+CjxmZUJsZW5kIG1vZGU9Im5vcm1hbCIgaW4yPSJCYWNrZ3JvdW5kSW1hZ2VGaXgiIHJlc3VsdD0iZWZmZWN0MV9kcm9wU2hhZG93XzEzMV80OCIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluPSJTb3VyY2VHcmFwaGljIiBpbjI9ImVmZmVjdDFfZHJvcFNoYWRvd18xMzFfNDgiIHJlc3VsdD0ic2hhcGUiLz4KPC9maWx0ZXI+CjxjbGlwUGF0aCBpZD0iY2xpcDBfMTMxXzQ4Ij4KPHJlY3Qgd2lkdGg9IjE1MiIgaGVpZ2h0PSIxNTIiIGZpbGw9IndoaXRlIi8+CjwvY2xpcFBhdGg+CjwvZGVmcz4KPC9zdmc+Cg==";
  class Locale {
    constructor() {
      let arrayThusFar = [];
      // @ts-ignore
      if (languageNameAndCodeLookupTableGLOBALIZED.menuMap) {
        languageNameAndCodeLookupTableGLOBALIZED.menuMap[
          this._matchLanguages(
            JSON.parse(this.getLanguageArray()),
            Object.keys(languageNameAndCodeLookupTableGLOBALIZED.menuMap)
          )[0] || "en"
        ].forEach((entry) => {
          // Heavily inspired by https://github.com/TurboWarp/scratch-vm/blob/develop/src/extensions/scratch3_translate/index.js
          const obj = { name: entry.name, code: entry.code };

          try {
            if (obj) {
              if (!this._filterArray(arrayThusFar, "code").includes(obj.code)) {
                arrayThusFar.push(obj);
              }
            }
          } catch (error) {
            console.warn("Locale:", error);
          }
        });
      } else {
        console.warn(
          "Locale: languageNameAndCodeLookupTableGLOBALIZED does not contain a menuMap key or it lacks a value."
        );
      }
      languageNameAndCodeLookupTable = arrayThusFar;
    }
    getInfo() {
      return {
        id: "fakemonLocale",
        name: Scratch.translate("Locale"),
        color1: "#2a5fa0", // TurboWarp will automatically generate colors 2 and 3 based on color 1.
        blockIconURI: blockExtensionIcon,
        menuIconURI: menuExtensionIcon,
        docsURI: "https://extensions.turbowarp.org/Fakemon/Locale",
        blocks: [
          {
            func: "toggleRecreatableBlocks",
            blockType: Scratch.BlockType.BUTTON,
            text: Scratch.translate(
              `${showRecreatableBlocks ? "Hide" : "Show"} Recreatable Blocks`
            ),
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Global Translations"),
            hideFromPalette: !showRecreatableBlocks,
          },
          {
            opcode: "setFullLocaleJSON",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "set global translation information to JSON [JSON]"
            ),
            hideFromPalette: !showRecreatableBlocks,
            arguments: {
              JSON: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: `{"en":{"Hello, world!":"Hello, world!"},"es":{"Hello, world!":"¡Hola, mundo!"}}`,
              },
            },
          },
          {
            opcode: "mergeFullLocaleJSON",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "merge current translation information with JSON [JSON]"
            ),
            hideFromPalette: !showRecreatableBlocks,
            arguments: {
              JSON: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: `{"en":{"Hello, world!":"Hello, world!"},"es":{"Hello, world!":"¡Hola, mundo!"}}`,
              },
            },
          },
          {
            opcode: "getFullLocaleJSON",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("get global translation information"),
            hideFromPalette: !showRecreatableBlocks,
          },
          {
            opcode: "supportedLanguages",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("all languages that can be translated to"),
            hideFromPalette: !showRecreatableBlocks,
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Per-Language Translations"),
            hideFromPalette: !showRecreatableBlocks,
          },
          {
            opcode: "setPerLangLocaleJSON",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "set translations for language code [LANG] to JSON [JSON]"
            ),
            hideFromPalette: !showRecreatableBlocks,
            arguments: {
              LANG: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "es",
              },
              JSON: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: `{"Hello, world!":"¡Hola, mundo!"}`,
              },
            },
          },
          {
            opcode: "mergePerLangLocaleJSON",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "merge current translations for language code [LANG] with JSON [JSON]"
            ),
            hideFromPalette: !showRecreatableBlocks,
            arguments: {
              LANG: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "es",
              },
              JSON: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: `{"Hello, world!":"¡Hola, mundo!"}`,
              },
            },
          },
          {
            opcode: "getPerLangLocaleJSON",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate(
              "get translations for language code [LANG]"
            ),
            hideFromPalette: !showRecreatableBlocks,
            arguments: {
              LANG: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "es",
              },
            },
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Per-Word Translations"),
            hideFromPalette: !showRecreatableBlocks,
          },
          {
            opcode: "setPerWordTranslation",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "set translation for [TEXTIN] in language code [LANG] to [TEXTOUT]"
            ),
            hideFromPalette: !showRecreatableBlocks,
            arguments: {
              LANG: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "es",
              },
              TEXTIN: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Hello, world!",
              },
              TEXTOUT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "¡Hola, mundo!",
              },
            },
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Preferred Languages"),
          },
          {
            opcode: "getLanguageCode",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("get user's current language code"),
          },
          {
            opcode: "getLanguageArray",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("get user's preferred language array"),
          },
          {
            opcode: "isLanguagePreferred",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate(
              "does the user prefer language code [LANG]?"
            ),
            arguments: {
              LANG: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "es",
              },
            },
          },
          {
            opcode: "supportedPreferredLanguages",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate(
              "preferred languages that can be translated to"
            ),
            hideFromPalette: !showRecreatableBlocks,
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Language Code <=> Name Conversions"),
          },
          {
            opcode: "nameFromCode",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("name of language with code [CODE]"),
            arguments: {
              CODE: {
                type: Scratch.ArgumentType.STRING,
                menu: "LANG_CODE",
                defaultValue: "es",
              },
            },
          },
          {
            opcode: "codeFromName",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("code of language with name [NAME]"),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                menu: "LANG_NAME",
                defaultValue: "es",
              },
            },
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Translating Text"),
            hideFromPalette: !showRecreatableBlocks,
          },
          {
            opcode: "translate",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("translate [TEXT] to language code [LANG]"),
            hideFromPalette: !showRecreatableBlocks,
            arguments: {
              LANG: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "es",
              },
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Hello, world!",
              },
            },
          },
        ],
        menus: {
          LANG_CODE: {
            acceptReporters: true,
            items: this._getLanguageCodes() || [
              {
                text: Scratch.translate(
                  "There was a problem getting language codes."
                ),
                value: "none1",
              },
              {
                text: Scratch.translate("Please try again later."),
                value: "none2",
              },
            ],
          },
          LANG_NAME: {
            acceptReporters: true,
            items: this._makeLanguageNameMenu() || [
              {
                text: Scratch.translate(
                  "There was a problem getting language names."
                ),
                value: "none1",
              },
              {
                text: Scratch.translate("Please try again later."),
                value: "none2",
              },
            ],
          },
        },
      };
    }
    toggleRecreatableBlocks() {
      function doToggle() {
        showRecreatableBlocks = !showRecreatableBlocks;
        hasToggledRecreatableBlocks = true;
        Scratch.vm.extensionManager.refreshBlocks();
      }
      if (!hasToggledRecreatableBlocks) {
        // If the user hasn't used this button before, tell them what it does
        alert(
          `This button will ${showRecreatableBlocks ? "hide" : "show"} blocks that can be recreated with other extensions or require values set by these blocks.`
        ); // Explain what the button does
        if (
          confirm(
            "Existing blocks in the project will not be affected, and you can undo this at any time. Is this okay?"
          )
        ) {
          // Ask for user consent, just in case
          doToggle();
        }
      } else {
        // Otherwise, just toggle the variable
        doToggle();
      }
    }
    setFullLocaleJSON(args) {
      let backupLocaleObject = localeObject; // Save a backup in case something breaks
      try {
        localeObject = JSON.parse(args.JSON);
      } catch {
        localeObject = backupLocaleObject;
      }
      // @ts-ignore
      this._updateLocaleInfo();
    }
    mergeFullLocaleJSON(args) {
      let backupLocaleObject = localeObject; // Save a backup in case something breaks
      try {
        localeObject = { ...localeObject, ...JSON.parse(args.JSON) };
      } catch {
        localeObject = backupLocaleObject;
      }
      // @ts-ignore
      this._updateLocaleInfo();
    }
    getFullLocaleJSON() {
      return JSON.stringify(localeObject) || "{}";
    }
    setPerLangLocaleJSON(args) {
      let backupLocaleObject = localeObject; // Save a backup in case something breaks
      try {
        localeObject[args.LANG] = JSON.parse(args.JSON);
      } catch {
        localeObject = backupLocaleObject;
      }
      // @ts-ignore
      this._updateLocaleInfo();
    }
    mergePerLangLocaleJSON(args) {
      let backupLocaleObject = localeObject; // Save a backup in case something breaks
      try {
        localeObject[args.LANG] = { ...localeObject, ...JSON.parse(args.JSON) };
      } catch {
        localeObject = backupLocaleObject;
      }
      // @ts-ignore
      this._updateLocaleInfo();
    }
    setPerWordTranslation(args) {
      if (!Object.prototype.hasOwnProperty.call(localeObject, args.LANG)) {
        // VS Code got mad when I tried to do it the normal way.
        localeObject[args.LANG] = {};
      }
      localeObject[args.LANG][args.TEXTIN] = args.TEXTOUT;
      this._updateLocaleInfo();
    }
    getPerLangLocaleJSON(args) {
      return JSON.stringify(localeObject[args.LANG]) || "{}";
    }
    translate(args) {
      try {
        return localeObject[args.LANG][args.TEXT];
      } catch {
        return args.TEXT;
      } // Fallback to default language
    }
    getLanguageCode() {
      // This block prefers the UI language stored in ReduxStore.
      // @ts-ignore
      // eslint-disable-next-line no-undef
      return ReduxStore?.getState().locales.locale || navigator.languages[0];
    }
    getLanguageArray() {
      // @ts-ignore
      // eslint-disable-next-line no-undef
      if (navigator.languages.includes(ReduxStore?.getState().locales.locale)) {
        return JSON.stringify(navigator.languages);
      } else {
        return JSON.stringify([
          // @ts-ignore
          // eslint-disable-next-line no-undef
          ReduxStore?.getState().locales.locale,
          ...navigator.languages,
        ]);
      }
    }
    isLanguagePreferred(args) {
      return JSON.parse(this.getLanguageArray()).includes(args.LANG);
    }
    supportedLanguages() {
      return JSON.stringify(Object.keys(localeObject));
    }
    supportedPreferredLanguages() {
      return JSON.stringify(
        this._matchLanguages(
          JSON.parse(this.getLanguageArray()),
          JSON.parse(this.supportedLanguages())
        )
      );
    }
    nameFromCode(args) {
      let codeIndex = this._getLanguageCodes().indexOf(args.CODE);
      if (codeIndex != -1) {
        return this._getLanguageNames()[codeIndex];
      } else {
        return "";
      }
    }
    codeFromName(args) {
      if (this._getLanguageCodes().includes(args.NAME)) {
        // The menu allows any reporter to be inserted, including those that don't match a menu. Remember, args.NAME will return the *value* of the menu, which, in this case, is the language code.
        return args.NAME;
      } else {
        args.NAME = args.NAME.toString().trim().toLowerCase();
        if (
          Object.prototype.hasOwnProperty.call(
            languageNameAndCodeLookupTableGLOBALIZED.nameMap,
            args.NAME
          )
        ) {
          // This is to ensure the actual name value can be used via inputs. This implementation is inspired by the Translate extension's.
          return languageNameAndCodeLookupTableGLOBALIZED.nameMap[args.NAME];
        } else if (this._getLanguageNames().includes(args.NAME)) {
          // This is to ensure the actual name value can be used via inputs.
          let nameIndex = this._getLanguageNames().indexOf(args.NAME);
          if (nameIndex != -1) {
            return this._getLanguageCodes()[nameIndex];
          } else {
            return "";
          }
        } else {
          return "";
        }
      }
    }
    // Internal functions
    _updateLocaleInfo() {
      try {
        // @ts-ignore since extension storage IS a thing
        Scratch.vm.runtime.extensionStorage["fakemonLocale"] = {
          // @ts-ignore
          ...Scratch.vm.runtime.extensionStorage["fakemonLocale"],
          ...{ localeObject: localeObject },
        };
      } catch (error) {
        console.warn("Locale:", error);
      }
    }
    _filterArray(array, matchKey) {
      if (array != []) {
        return array.map((value) => {
          try {
            if (value) {
              if (Object.prototype.hasOwnProperty.call(value, matchKey)) {
                if (value[matchKey]) {
                  return value[matchKey];
                }
              }
            }
          } catch (error) {
            console.warn("Locale:", error);
          }
        });
      }
    }
    _matchLanguages(languageArray, supportedLanguages) {
      const matchedLanguages = [];
      supportedLanguages.forEach((value) => {
        if (languageArray.includes(value)) {
          matchedLanguages.push(value);
        }
      });
      return matchedLanguages;
    }
    _getLanguageNames() {
      return this._filterArray(languageNameAndCodeLookupTable, "name");
    }
    _getLanguageCodes() {
      return this._filterArray(languageNameAndCodeLookupTable, "code");
    }
    _makeLanguageNameMenu() {
      // Since the language names are being translated, we need a consistent way to refer to them.
      const names = this._getLanguageNames();
      const codes = this._getLanguageCodes();
      let menuThusFar = [];
      for (let i = 0; i < names.length; i++) {
        if (names[i] && codes[i]) {
          menuThusFar.push({ text: names[i], value: codes[i] });
        }
      }
      return menuThusFar;
    }
  }
  // @ts-ignore
  Scratch.extensions.register(new Locale());
})(Scratch);
