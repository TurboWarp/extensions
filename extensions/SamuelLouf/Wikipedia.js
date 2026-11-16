// Name: Wikipedia
// ID: samuelloufwikipedia
// Description: Fetch the content of Wikipedia pages.
// By: SamuelLouf <https://scratch.mit.edu/users/samuellouf/>
// License: MIT

(function (Scratch) {
  "use strict";

  const icon =
    "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxOTkuMjYzMzkiIGhlaWdodD0iMTk5LjA5MTgzIiB2aWV3Qm94PSIwLDAsMTk5LjI2MzM5LDE5OS4wOTE4MyI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE0OS4zNzY4MywtNjguNDQwOTUpIj48ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCI+PHBhdGggZD0iTTE0OS4zNzY4MywyNjcuNTMyNzhjMCwwIDAsLTI3Ljg4Nzk3IDAsLTU0LjgzNjE5YzAsLTE0LjQ3MzQzIDM1LjI3MzgsMjkuNDg0NzUgMzUuNjM5ODUsLTMzLjc2NDA3YzAuNDY2MjksLTgwLjU2OTEgLTM1LjYzOTg1LC0yMi41MDAzNiAtMzUuNjM5ODUsLTMxLjg4ODI5YzAsLTE1LjE2MzIgMCwtMjguNTEyOSAwLC0yOC41MTI5YzAsMCA0Ny41MjAxNSwwIDc4LjE4MTU1LDBjNi41NTQxNiwwIC01My4zMTY1LC00My41NTA0MyAyNC41ODY3NywtNDkuNDIxODdjOTguMzA3NTEsLTcuNDA5MjggMjMuMTQzNTgsNDkuMjA5ODIgMzUuNTY1NjYsNDkuNDIxODdjMTMuMzE2MTEsMC4yMjczMSAxOS40MzcwOSwwIDE5LjQzNzA5LDBjMCwwIDAuMjI3MzEsMjcuNzEzMjIgMCw0My41MTkxNWMtMC4yMDYyNywxNC4zNDMwNiA0NS4wNTQ2NiwtMTIuMTU4MTcgNDEuMjY3MiwzOS4zOTE0MWMtMi42NTk0NiwzNi4xOTY3NyAtNDEuMjY3MiwxOC41NjA0MiAtNDEuMjY3MiwyOC43NjE5OGMwLDE5LjEyMjY0IDAsMzcuMzI4OSAwLDM3LjMyODljMCwwIC03LjgwOTg4LDAgLTQxLjYyMTMsMGMtMTQuMDcyMjMsMCA1OC45ODk2MywtMzIuNzI1NTggLTMyLjUxMzU1LC0zNy41MTU2M2MtNjkuMzIzMTQsMTQuMDYzNjggLTI3LjU2MTM1LDM3LjUxNTYzIC0zNC4zODkzMywzNy41MTU2M2MtMjYuMDE5MzcsMCAtNDkuMjQ2ODksMCAtNDkuMjQ2ODksMHoiIGZpbGw9IiNhYWFhYWEiIHN0cm9rZS13aWR0aD0ibm9uZSIvPjx0ZXh0IHRyYW5zZm9ybT0idHJhbnNsYXRlKDE5Mi4yNzMyNCwyMDkuMTcwMzYpIHNjYWxlKDIuNTI4MzEsMi41MjgzMSkiIGZvbnQtc2l6ZT0iNDAiIHhtbDpzcGFjZT0icHJlc2VydmUiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMSIgZm9udC1mYW1pbHk9IlNlcmlmIiBmb250LXdlaWdodD0ibm9ybWFsIiB0ZXh0LWFuY2hvcj0ic3RhcnQiPjx0c3BhbiB4PSIwIiBkeT0iMCI+VzwvdHNwYW4+PC90ZXh0PjwvZz48L2c+PC9zdmc+PCEtLXJvdGF0aW9uQ2VudGVyOjkwLjYyMzE2NTE2MzU1Njk5OjExMS41NTkwNDgwNDU3MTI2MS0tPg==";

  /**
   * Every open Wikipedia listed on https://meta.wikimedia.org/wiki/Special:SiteMatrix
   * Maps the subdomain to the language's name as shown in Wikipedia's language list.
   * @type {Record<string, string>}
   */
  const LANGUAGES = {
    ab: "Аԥсшәа",
    ace: "Acèh",
    ady: "Адыгабзэ",
    af: "Afrikaans",
    als: "Alemannisch",
    alt: "Алтай тил",
    am: "አማርኛ",
    ami: "Pangcah",
    an: "Aragonés",
    ang: "Ænglisc",
    ann: "Obolo",
    anp: "अंगिका",
    ar: "العربية",
    arc: "ܐܪܡܝܐ",
    ary: "الدارجة",
    arz: "مصرى",
    as: "অসমীয়া",
    ast: "Asturianu",
    atj: "Atikamekw",
    av: "Авар",
    avk: "Kotava",
    awa: "अवधी",
    ay: "Aymar aru",
    az: "Azərbaycanca",
    azb: "تۆرکجه",
    ba: "Башҡортса",
    ban: "Basa Bali",
    bar: "Boarisch",
    "bat-smg": "Žemaitėška",
    bbc: "Batak Toba",
    bcl: "Bikol Central",
    bdr: "Bajau Sama",
    be: "Беларуская",
    "be-tarask": "Беларуская (тарашкевіца)",
    bew: "Betawi",
    bg: "Български",
    bh: "भोजपुरी",
    bi: "Bislama",
    bjn: "Banjar",
    blk: "ပအိုဝ်ႏဘာႏသာႏ",
    bm: "Bamanankan",
    bn: "বাংলা",
    bo: "བོད་ཡིག",
    bol: "Bòo pìkkà",
    bpy: "বিষ্ণুপ্রিয়া মণিপুরী",
    br: "Brezhoneg",
    bs: "Bosanski",
    btm: "Batak Mandailing",
    bug: "Basa Ugi",
    bxr: "Буряад",
    ca: "Català",
    "cbk-zam": "Chavacano de Zamboanga",
    cdo: "閩東語 / Mìng-dĕ̤ng-ngṳ̄",
    ce: "Нохчийн",
    ceb: "Cebuano",
    ch: "Chamoru",
    chr: "ᏣᎳᎩ",
    chy: "Tsetsêhestâhese",
    ckb: "کوردی",
    co: "Corsu",
    crh: "Qırımtatarca",
    cs: "Čeština",
    csb: "Kaszëbsczi",
    cu: "Словѣньскъ / ⰔⰎⰑⰂⰡⰐⰠⰔⰍⰟ",
    cv: "Чӑвашла",
    cy: "Cymraeg",
    da: "Dansk",
    dag: "Dagbanli",
    de: "Deutsch",
    dga: "Dagaare",
    din: "Thuɔŋjäŋ",
    diq: "Zazaki",
    dsb: "Dolnoserbski",
    dtp: "Kadazandusun",
    dty: "डोटेली",
    dv: "ދިވެހިބަސް",
    dz: "ཇོང་ཁ",
    ee: "Eʋegbe",
    el: "Ελληνικά",
    eml: "Emiliàn e rumagnòl",
    en: "English",
    eo: "Esperanto",
    es: "Español",
    et: "Eesti",
    eu: "Euskara",
    ext: "Estremeñu",
    fa: "فارسی",
    fat: "Mfantse",
    ff: "Fulfulde",
    fi: "Suomi",
    "fiu-vro": "Võro",
    fj: "Na Vosa Vakaviti",
    fo: "Føroyskt",
    fon: "Fɔ̀ngbè",
    fr: "Français",
    frp: "Arpetan",
    frr: "Nordfriisk",
    fur: "Furlan",
    fy: "Frysk",
    ga: "Gaeilge",
    gag: "Gagauz",
    gan: "贛語",
    gcr: "Kriyòl gwiyannen",
    gd: "Gàidhlig",
    gl: "Galego",
    glk: "گیلکی",
    gn: "Avañe'ẽ",
    gom: "गोंयची कोंकणी / Gõychi Konknni",
    gor: "Bahasa Hulontalo",
    got: "𐌲𐌿𐍄𐌹𐍃𐌺",
    gpe: "Ghanaian Pidgin",
    gu: "ગુજરાતી",
    guc: "Wayuunaiki",
    gur: "Farefare",
    guw: "Gungbe",
    gv: "Gaelg",
    ha: "Hausa",
    hak: "客家語 / Hak-kâ-ngî",
    haw: "Hawaiʻi",
    he: "עברית",
    hi: "हिन्दी",
    hif: "Fiji Hindi",
    hr: "Hrvatski",
    hsb: "Hornjoserbsce",
    ht: "Kreyòl ayisyen",
    hu: "Magyar",
    hy: "Հայերեն",
    hyw: "Արեւմտահայերէն",
    ia: "Interlingua",
    iba: "Jaku Iban",
    id: "Bahasa Indonesia",
    ie: "Interlingue",
    ig: "Igbo",
    igl: "Igala",
    ik: "Iñupiatun",
    ilo: "Ilokano",
    inh: "ГӀалгӀай",
    io: "Ido",
    is: "Íslenska",
    isv: "Medžuslovjansky",
    it: "Italiano",
    iu: "ᐃᓄᒃᑎᑐᑦ / inuktitut",
    ja: "日本語",
    jam: "Patois",
    jbo: "La .lojban.",
    jv: "Jawa",
    ka: "ქართული",
    kaa: "Qaraqalpaqsha",
    kab: "Taqbaylit",
    kai: "Karai-karai",
    kaj: "Jju",
    kbd: "Адыгэбзэ",
    kbp: "Kabɩyɛ",
    kcg: "Tyap",
    kg: "Kongo",
    kge: "Kumoring",
    ki: "Gĩkũyũ",
    kk: "Қазақша",
    km: "ភាសាខ្មែរ",
    kn: "ಕನ್ನಡ",
    knc: "Yerwa Kanuri",
    ko: "한국어",
    koi: "Перем коми",
    krc: "Къарачай-малкъар",
    ks: "کٲشُر",
    ksh: "Ripoarisch",
    ku: "Kurdî",
    kus: "Kʋsaal",
    kv: "Коми",
    kw: "Kernowek",
    ky: "Кыргызча",
    la: "Latina",
    lad: "Ladino",
    lb: "Lëtzebuergesch",
    lbe: "Лакку",
    lez: "Лезги",
    lfn: "Lingua Franca Nova",
    lg: "Luganda",
    li: "Limburgs",
    lij: "Ligure",
    lld: "Ladin",
    lmo: "Lombard",
    ln: "Lingála",
    lo: "ລາວ",
    lt: "Lietuvių",
    ltg: "Latgaļu",
    lv: "Latviešu",
    mad: "Madhurâ",
    mag: "मगही",
    mai: "मैथिली",
    "map-bms": "Basa Banyumasan",
    mdf: "Мокшень",
    mg: "Malagasy",
    mhr: "Олык марий",
    mi: "Māori",
    min: "Minangkabau",
    mk: "Македонски",
    ml: "മലയാളം",
    mn: "Монгол",
    mni: "ꯃꯤꯇꯩ ꯂꯣꯟ",
    mnw: "ဘာသာမန်",
    mos: "Moore",
    mr: "मराठी",
    mrj: "Кырык мары",
    ms: "Bahasa Melayu",
    mt: "Malti",
    mwl: "Mirandés",
    my: "မြန်မာဘာသာ",
    myv: "Эрзянь",
    mzn: "مازِرونی",
    nah: "Nāhuatl",
    nap: "Napulitano",
    nds: "Plattdüütsch",
    "nds-nl": "Nedersaksies",
    ne: "नेपाली",
    new: "नेपाल भाषा",
    nia: "Li Niha",
    nl: "Nederlands",
    nn: "Norsk nynorsk",
    no: "Norsk bokmål",
    nov: "Novial",
    nqo: "ߒߞߏ",
    nr: "IsiNdebele seSewula",
    nrm: "Nouormand",
    nso: "Sesotho sa Leboa",
    nup: "Nupe",
    nv: "Diné bizaad",
    ny: "Chi-Chewa",
    oc: "Occitan",
    olo: "Livvinkarjala",
    om: "Oromoo",
    or: "ଓଡ଼ିଆ",
    os: "Ирон",
    pa: "ਪੰਜਾਬੀ",
    pag: "Pangasinan",
    pam: "Kapampangan",
    pap: "Papiamentu",
    pcd: "Picard",
    pcm: "Naijá",
    pdc: "Deitsch",
    pfl: "Pälzisch",
    pi: "पालि",
    pl: "Polski",
    pms: "Piemontèis",
    pnb: "پنجابی",
    pnt: "Ποντιακά",
    ppl: "Nawat",
    ps: "پښتو",
    pt: "Português",
    pwn: "Pinayuanan",
    qu: "Runa Simi",
    rki: "ရခိုင်",
    rm: "Rumantsch",
    rmy: "Romani čhib",
    rn: "Ikirundi",
    ro: "Română",
    "roa-rup": "Armãneashti",
    "roa-tara": "Tarandíne",
    rsk: "Руски",
    ru: "Русский",
    rue: "Русиньскый",
    rw: "Ikinyarwanda",
    sa: "संस्कृतम्",
    sah: "Саха тыла",
    sat: "ᱥᱟᱱᱛᱟᱲᱤ",
    sc: "Sardu",
    scn: "Sicilianu",
    sco: "Scots",
    sd: "سنڌي",
    se: "Davvisámegiella",
    sg: "Sängö",
    sh: "Srpskohrvatski / српскохрватски",
    shi: "Taclḥit",
    shn: "တႆး",
    si: "සිංහල",
    simple: "Simple English",
    sk: "Slovenčina",
    skr: "سرائیکی",
    sl: "Slovenščina",
    sm: "Gagana Samoa",
    smn: "Anarâškielâ",
    sn: "ChiShona",
    so: "Soomaaliga",
    sq: "Shqip",
    sr: "Српски / srpski",
    srn: "Sranantongo",
    ss: "SiSwati",
    st: "Sesotho",
    stq: "Seeltersk",
    su: "Sunda",
    sv: "Svenska",
    sw: "Kiswahili",
    syl: "ꠍꠤꠟꠐꠤ",
    szl: "Ślůnski",
    szy: "Sakizaya",
    ta: "தமிழ்",
    tay: "Tayal",
    tcy: "ತುಳು",
    tdd: "ᥖᥭᥰ ᥖᥬᥲ ᥑᥨᥒᥰ",
    te: "తెలుగు",
    tet: "Tetun",
    tg: "Тоҷикӣ",
    th: "ไทย",
    ti: "ትግርኛ",
    tig: "ትግሬ",
    tk: "Türkmençe",
    tl: "Tagalog",
    tly: "Tolışi",
    tn: "Setswana",
    to: "Lea faka-Tonga",
    tok: "Toki pona",
    tpi: "Tok Pisin",
    tr: "Türkçe",
    trv: "Seediq",
    ts: "Xitsonga",
    tt: "Татарча / tatarça",
    tum: "ChiTumbuka",
    tw: "Twi",
    ty: "Reo tahiti",
    tyv: "Тыва дыл",
    udm: "Удмурт",
    ug: "ئۇيغۇرچە / Uyghurche",
    uk: "Українська",
    ur: "اردو",
    uz: "Oʻzbekcha / ўзбекча",
    ve: "Tshivenda",
    vec: "Vèneto",
    vep: "Vepsän kel’",
    vi: "Tiếng Việt",
    vls: "West-Vlams",
    vo: "Volapük",
    wa: "Walon",
    war: "Winaray",
    wo: "Wolof",
    wuu: "吴语",
    xal: "Хальмг",
    xh: "IsiXhosa",
    xmf: "მარგალური",
    yi: "ייִדיש",
    yo: "Yorùbá",
    za: "Vahcuengh",
    zea: "Zeêuws",
    zgh: "ⵜⴰⵎⴰⵣⵉⵖⵜ ⵜⴰⵏⴰⵡⴰⵢⵜ",
    zh: "中文",
    "zh-classical": "文言",
    "zh-min-nan": "閩南語 / Bân-lâm-gí",
    "zh-yue": "粵語",
    zu: "IsiZulu",
  };

  const languages_list = Object.entries(LANGUAGES).map(([value, name]) => ({
    // Include the code so that the menu can be searched by it.
    text: `${name} (${value})`,
    value,
  }));

  /**
   * @param {string} extract
   * @returns {string}
   */
  function getFirstParagraph(extract) {
    // Split into lines before tidying whitespace so that the heading of the
    // next section can not end up as part of the paragraph.
    const paragraph = extract.split("\n").find((line) => line.trim() !== "");
    return paragraph ? paragraph.replace(/\s{2,}/g, " ").trim() : "";
  }

  const OPENING_BRACKETS = "([{（［｛";
  const CLOSING_BRACKETS = ")]}）］｝";

  /**
   * @param {string} paragraph
   * @param {string} language
   * @returns {string}
   */
  function getFirstSentence(paragraph, language) {
    if (typeof Intl.Segmenter !== "function") {
      // Old browser. Assume the first period is the end of the sentence.
      return paragraph.split(".")[0] + ".";
    }

    // The browser already knows how sentences end in each language.
    let segmenter;
    try {
      segmenter = new Intl.Segmenter(language, { granularity: "sentence" });
    } catch (e) {
      // Not every Wikipedia language code is a valid locale.
      segmenter = new Intl.Segmenter(undefined, { granularity: "sentence" });
    }

    // Articles often start like "Scratch (abbr. something) is ...", so a sentence
    // is only allowed to end when all of its brackets have been closed.
    let result = "";
    let depth = 0;
    for (const { segment } of segmenter.segment(paragraph)) {
      result += segment;
      for (const char of segment) {
        if (OPENING_BRACKETS.includes(char)) {
          depth++;
        } else if (CLOSING_BRACKETS.includes(char) && depth > 0) {
          depth--;
        }
      }
      if (depth === 0) break;
    }
    return result.trim();
  }

  /**
   * @param {string} language
   * @param {string | number | boolean} name
   */
  function fetchWikipedia(language, name) {
    return Scratch.fetch(
      `https://${language}.wikipedia.org/w/api.php?action=query&prop=extracts&exlimit=1&redirects=1&titles=${encodeURIComponent(name)}&explaintext=1&exsectionformat=plain&format=json&origin=*`
    )
      .then((response) => {
        if (response.ok == true) {
          return response.json();
        } else {
          return "";
        }
      })
      .catch((error) => {
        return "";
      });
  }

  class Wikipedia {
    constructor() {
      this.wikipediaLanguages = "en";
    }

    getInfo() {
      return {
        id: "samuelloufwikipedia",
        name: Scratch.translate("Wikipedia"),
        color1: "#bcbcbc",
        menuIconURI: icon,
        blocks: [
          {
            opcode: "fetchFirstParagraph",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("first paragraph on [NAME]'s article"),
            disableMonitor: true,
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Scratch (programming language)",
              },
            },
          },
          {
            opcode: "fetchFirstSentence",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("first sentence on [NAME]'s article"),
            disableMonitor: true,
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate(
                  "Scratch (programming language)"
                ),
              },
            },
          },
          {
            opcode: "fetchFullArticle",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("[NAME]'s full article"),
            disableMonitor: true,
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate(
                  "Scratch (programming language)"
                ),
              },
            },
          },
          {
            opcode: "getPageURL",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("URL of page [NAME]"),
            disableMonitor: true,
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate(
                  "Scratch (programming language)"
                ),
              },
            },
          },
          {
            opcode: "doesPageExist",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("does page [NAME] exist?"),
            disableMonitor: true,
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("Unexistant page"),
              },
            },
          },
          "---",
          {
            opcode: "selectLanguage",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("switch wikipedia to [LANGUAGE]"),
            arguments: {
              LANGUAGE: {
                type: Scratch.ArgumentType.STRING,
                menu: "languages",
                defaultValue: "en",
              },
            },
          },
          {
            opcode: "getLanguage",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("Wikipedia's language"),
          },
        ],
        menus: {
          languages: {
            acceptReporters: true,
            items: languages_list,
          },
        },
      };
    }

    /**
     * @param {{ NAME: string | number | boolean; }} args
     */
    async fetchFirstParagraph(args) {
      var data = await fetchWikipedia(this.wikipediaLanguages, args.NAME);
      if (data == "") return "";
      const pageId = Object.keys(data.query.pages)[0];
      let extract = data.query.pages[pageId].extract;
      if (extract == undefined) return "";
      return getFirstParagraph(extract);
    }

    /**
     * @param {{ NAME: string | number | boolean; }} args
     */
    async fetchFirstSentence(args) {
      var data = await fetchWikipedia(this.wikipediaLanguages, args.NAME);
      if (data == "") return "";
      const pageId = Object.keys(data.query.pages)[0];
      let extract = data.query.pages[pageId].extract;
      if (extract == undefined) return "";
      return getFirstSentence(
        getFirstParagraph(extract),
        this.wikipediaLanguages
      );
    }

    /**
     * @param {{ NAME: string | number | boolean; }} args
     */
    async fetchFullArticle(args) {
      var data = await fetchWikipedia(this.wikipediaLanguages, args.NAME);
      if (data == "") return "";
      const pageId = Object.keys(data.query.pages)[0];
      let extract = data.query.pages[pageId].extract;
      if (extract == undefined) return "";
      extract = extract.replace(/\s{2,}/g, " ");
      return extract;
    }

    /**
     * @param {{ NAME: string; }} args
     */
    getPageURL(args) {
      return `https://${this.wikipediaLanguages}.wikipedia.org/wiki/${args.NAME.replace(/\s/g, "_")}`;
    }

    /**
     * @param {{ NAME: string | number | boolean; }} args
     */
    async doesPageExist(args) {
      var data = await fetchWikipedia(this.wikipediaLanguages, args.NAME);
      if (data == "") return "";
      return Object.keys(data.query.pages)[0] != "-1";
    }

    // ---
    // ---

    /**
     * @param {{ LANGUAGE: string; }} args
     */
    selectLanguage(args) {
      // The menu accepts reporters, so any Wikipedia language code can be used.
      // The code becomes part of the hostname, so it should look like a subdomain.
      const language = Scratch.Cast.toString(args.LANGUAGE).toLowerCase();
      if (/^[a-z0-9-]+$/.test(language)) {
        this.wikipediaLanguages = language;
      }
    }

    getLanguage() {
      const code = this.wikipediaLanguages;
      return Object.prototype.hasOwnProperty.call(LANGUAGES, code)
        ? LANGUAGES[code]
        : code;
    }
  }
  Scratch.extensions.register(new Wikipedia());
  // @ts-ignore
})(Scratch);
