// Name: BilibiliToy JS SDK
// ID: bilibilitoy
// Description: An unofficial extension for using BilibiliToy's Toy JS SDK in TurboWarp projects and for using cloud storage. It is compatible with BilibiliToy's projects when they are packaged as HTML with TurboWarp Packager.
// By: MC_mrjone <https://space.bilibili.com/3632300000545187/>
// License: MPL-2.0

(function () {
  "use strict";

  const isZh =
    typeof navigator !== "undefined" && /^zh/i.test(navigator.language || "");
  const pick = (en, zh) => (isZh ? zh : en);

  const ICON =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAWdEVYdFNvZnR3YXJlAFBhaW50Lk5FVCA1LjJuiqYpAAAAsGVYSWZJSSoACAAAAAUAGgEFAAEAAABKAAAAGwEFAAEAAABSAAAAKAEDAAEAAAACAAAAMQECAA4AAABaAAAAaYcEAAEAAABoAAAAAAAAAGAAAAABAAAAYAAAAAEAAABQYWludC5ORVQgNS4yAAMAAJAHAAQAAAAwMjMwAaADAAEAAAABAAAABaAEAAEAAACSAAAAAAAAAAIAAQACAAQAAABSOTgAAgAHAAQAAAAwMTAwAAAAAJEFA2gAAAJ0SURBVHhe7Zu/axNhGMe/z9212JikR4OahCi3ONdJRy0u0sXBv0CdxfpjtkbBWXFyEQQX7SIOCg6arVYc4i8QFw9MQrQo16Tq1fx4XQz0Hgs50tdD8ryf7T5Ppg+8Lzy5hPAHz/PcsNs9MHged5q1WgUACADyxdIiFC7zD4035EPZc3Y+73lA/wEfC8Al6pMFp+vxiRQUMGtxKQ3Kl0pH0MMzPujlilzFwv7a4Ap7Uy5XsVjrhGh1wojLZixMp+2Ii8Paeg+tdp/rypYBerkiVq882qxis+vS/F8RXhw9M1KEs9WHuP/pVcRdODWDiydnIi4O9x63sXDtM9cV8UfABOBCGiYAF9IwAbiQhgnAhTRMAC6kYQJwIY0tt0H8z+tw2sJ0ZoR1uN1Daz3mOiwIsw5bOxynSkQBH4iAyLeDIAgzaXcDUMf4fMypQDnnaPDkeZ4bhhjtttoMdT9ylb16ENbuKa6H8uP2e/xaiX6NRcANpZzrETkCzabvY/BiRCf5Qklx5946PFKA7zffYONpPSoJ5Wajpu0ljrkEuZCGCcCFNEwALqRhAnAhDROAC2mYAFxII5FlaPLQHtBOh+uhdN5+Q//Lz6jUvAwlEkArmgOIPwImABfSSOQOmNt/GlMTWa6H8rrxBLXgXVRqvgMSCVCeX0YuVeJ6KHdfnsdzfykqNQcQfwRMAC6kYQJwIQ0TgAtpmABcSMME4EIa4gMksgydmF1EanKa66Gs+Ev4sLoclZqXoUQCaEVzAPFH4B8EUD43OiGltP6iTX8Aojtc6YKIAqUmtP7PWfsdAACFwr4Fhf5x7rcDgQLLssv1ul/ls+3wG929u8I/pjylAAAAAElFTkSuQmCC";

  const ABILITY_LIST = [
    "navigate",
    "saveImageToAlbum",
    "share",
    "getQrCode",
    "sharePicture",
    "closeBrowser",
    "getUserProfile",
    "getCloudStorage",
    "setCloudStorage",
    "removeCloudStorage",
    "getAuthorProfile",
    "getAuthorVideos",
    "getAuthorVideoRange",
    "getAuthorRelation",
    "getVideoUserActions",
    "submitScore",
    "getRankList",
    "getMyRank",
    "requestCamera",
    "requestMicrophone",
    "stopMedia",
    "onContainerChange",
    "getContainerState",
    "setContainerMode",
    "onPlayerChange",
    "getPlayerState",
    "setPlayerState",
    "onPageClose",
    "checkInputSafety",
    "getSharedStorage",
    "setSharedStorage",
    "removeSharedStorage",
    "getChargeUnlock",
    "openChargePanel",
    "getAnnualReport",
  ];

  const NAVIGATE_TYPE_LIST = [
    "video",
    "space",
    "search",
    "opus",
    "tribee",
    "toy",
    "topic",
  ];
  const FACING_LIST = ["user", "environment"];
  const PERIOD_LIST = ["all", "month", "week", "day"];
  const ORIENTATION_LIST = ["portrait", "landscape", "auto"];

  class BilibiliToyJSSDK {
    constructor(runtime) {
      this.runtime =
        runtime ||
        (typeof Scratch !== "undefined" && Scratch.vm && Scratch.vm.runtime);
      this._toyPromise = null;
      this._mediaStreams = new Map();
      this._mediaSeq = 0;
      this._lastMediaId = "";
      this._lastChargeUnlock = null;
      this._lastContainerState = null;
      this._lastPlayerState = null;
      this._lastPageClose = null;
      this._chargeOff = null;
      this._containerOff = null;
      this._playerOff = null;
      this._pageCloseOff = null;
      this._initAutoWatches();
    }

    getInfo() {
      return {
        id: "bilibilitoy",
        name: pick("BilibiliToy JS SDK", "BilibiliToy JS SDK"),
        color1: "#00aeec",
        color2: "#ff6699",
        color3: "#ff6699",
        docsURI: "https://www.bilibili.com/toy/publish/sdk",
        menuIconURI: ICON,
        blockIconURI: ICON,
        blocks: [
          {
            opcode: "in_bilibilitoy",
            blockType: Scratch.BlockType.BOOLEAN,
            text: pick("running in bilibili Toy?", "是否运行在哔哩哔哩Toy中？"),
          },
          {
            opcode: "is_support",
            blockType: Scratch.BlockType.BOOLEAN,
            text: pick(
              "current environment supports [ABILITY] ability",
              "当前环境是否支持[ABILITY]能力"
            ),
            arguments: {
              ABILITY: {
                type: Scratch.ArgumentType.STRING,
                menu: "abilityMenu",
                defaultValue: "navigate",
              },
            },
          },
          {
            opcode: "navigate",
            blockType: Scratch.BlockType.COMMAND,
            text: pick(
              "navigate to [TYPE] page with id [ID] extra [EXTRA]",
              "跳转到[TYPE]页面 资源ID[ID] 额外参数[EXTRA]"
            ),
            arguments: {
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "navigateTypeMenu",
                defaultValue: "video",
              },
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "BV1Hh411S7Ys",
              },
              EXTRA: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '{"from":"toy"}',
              },
            },
          },
          {
            opcode: "save_image_to_album",
            blockType: Scratch.BlockType.REPORTER,
            text: pick(
              "save image to album url [URL] base64 [BASE64] hint [HINT]",
              "保存图片到相册 url[URL] base64[BASE64] 提示[HINT]"
            ),
            arguments: {
              URL: { type: Scratch.ArgumentType.STRING, defaultValue: "" },
              BASE64: { type: Scratch.ArgumentType.STRING, defaultValue: "" },
              HINT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "需要相册权限来保存图片",
              },
            },
          },
          {
            opcode: "share",
            blockType: Scratch.BlockType.COMMAND,
            text: pick(
              "share Toy page path [PATH]",
              "分享当前Toy页面路径[PATH]"
            ),
            arguments: {
              PATH: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "result.html?score=100",
              },
            },
          },
          {
            opcode: "get_qr_code",
            blockType: Scratch.BlockType.REPORTER,
            text: pick(
              "get QR code for path [PATH] size [SIZE]",
              "获取路径[PATH]的二维码 尺寸[SIZE]"
            ),
            arguments: {
              PATH: { type: Scratch.ArgumentType.STRING, defaultValue: "" },
              SIZE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 320 },
            },
          },
          {
            opcode: "share_picture",
            blockType: Scratch.BlockType.COMMAND,
            text: pick(
              "share picture url [URL] base64 [BASE64]",
              "分享图片 url[URL] base64[BASE64]"
            ),
            arguments: {
              URL: { type: Scratch.ArgumentType.STRING, defaultValue: "" },
              BASE64: { type: Scratch.ArgumentType.STRING, defaultValue: "" },
            },
          },
          {
            opcode: "close_browser",
            blockType: Scratch.BlockType.COMMAND,
            text: pick("close current browser container", "关闭当前浏览器容器"),
          },
          {
            opcode: "get_user_profile",
            blockType: Scratch.BlockType.REPORTER,
            text: pick(
              "get current user profile as JSON",
              "获取当前用户资料 JSON"
            ),
          },
          {
            opcode: "get_author_profile",
            blockType: Scratch.BlockType.REPORTER,
            text: pick(
              "get Toy author public profile as JSON",
              "获取Toy作者公开资料 JSON"
            ),
          },
          {
            opcode: "get_author_videos",
            blockType: Scratch.BlockType.REPORTER,
            text: pick(
              "get author videos videos JSON [VIDEOS]",
              "获取作者视频 视频列表JSON[VIDEOS]"
            ),
            arguments: {
              VIDEOS: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '[{"aid":170001},{"bvid":"BV17x411w7KC"}]',
              },
            },
          },
          {
            opcode: "get_author_video_range",
            blockType: Scratch.BlockType.REPORTER,
            text: pick(
              "get author video range start [START] end [END]",
              "按时间获取作者视频 开始[START] 结束[END]"
            ),
            arguments: {
              START: { type: Scratch.ArgumentType.STRING, defaultValue: "" },
              END: { type: Scratch.ArgumentType.STRING, defaultValue: "" },
            },
          },
          {
            opcode: "get_author_relation",
            blockType: Scratch.BlockType.REPORTER,
            text: pick("get author relation as JSON", "获取作者关系 JSON"),
          },
          {
            opcode: "get_video_user_actions",
            blockType: Scratch.BlockType.REPORTER,
            text: pick(
              "get video user actions aids JSON [AIDS] videos JSON [VIDEOS]",
              "获取视频互动状态 aids JSON[AIDS] videos JSON[VIDEOS]"
            ),
            arguments: {
              AIDS: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "[170001,455017605]",
              },
              VIDEOS: { type: Scratch.ArgumentType.STRING, defaultValue: "[]" },
            },
          },
          {
            opcode: "get_annual_report",
            blockType: Scratch.BlockType.REPORTER,
            text: pick(
              "get annual report edition [EDITION] as JSON",
              "获取年度报告 期数[EDITION] JSON"
            ),
            arguments: {
              EDITION: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "2026",
              },
            },
          },
          {
            opcode: "get_charge_unlock",
            blockType: Scratch.BlockType.REPORTER,
            text: pick(
              "get charge unlock min price [MINPRICE] as JSON",
              "获取充电解锁 minPrice[MINPRICE] JSON"
            ),
            arguments: {
              MINPRICE: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1200,
              },
            },
          },
          {
            opcode: "open_charge_panel",
            blockType: Scratch.BlockType.COMMAND,
            text: pick(
              "open charge panel min price [MINPRICE]",
              "拉起充电收银台 minPrice[MINPRICE]"
            ),
            arguments: {
              MINPRICE: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1200,
              },
            },
          },
          {
            opcode: "start_charge_watch",
            blockType: Scratch.BlockType.COMMAND,
            text: pick(
              "start charge unlock watch min price [MINPRICE]",
              "开始监听充电解锁 minPrice[MINPRICE]"
            ),
            arguments: {
              MINPRICE: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1200,
              },
            },
          },
          {
            opcode: "when_charge_unlock_change",
            blockType: Scratch.BlockType.HAT,
            text: pick("when charge unlock changes", "当充电解锁状态变化时"),
          },
          {
            opcode: "get_last_charge_unlock",
            blockType: Scratch.BlockType.REPORTER,
            text: pick(
              "last charge unlock result as JSON",
              "最近一次充电解锁结果 JSON"
            ),
          },
          {
            opcode: "set_cloud_storage",
            blockType: Scratch.BlockType.COMMAND,
            text: pick(
              "set cloud storage items JSON [ITEMS]",
              "写入云存储 键值对JSON[ITEMS]"
            ),
            arguments: {
              ITEMS: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '{"coins":"100","level":"5"}',
              },
            },
          },
          {
            opcode: "get_cloud_storage",
            blockType: Scratch.BlockType.REPORTER,
            text: pick(
              "get cloud storage keys JSON [KEYS]",
              "读取云存储 keys JSON[KEYS]"
            ),
            arguments: {
              KEYS: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '["coins"]',
              },
            },
          },
          {
            opcode: "remove_cloud_storage",
            blockType: Scratch.BlockType.COMMAND,
            text: pick(
              "remove cloud storage keys JSON [KEYS]",
              "删除云存储 keys JSON[KEYS]"
            ),
            arguments: {
              KEYS: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '["level"]',
              },
            },
          },
          {
            opcode: "set_shared_storage",
            blockType: Scratch.BlockType.COMMAND,
            text: pick(
              "set shared storage [STORAGEID] items JSON [ITEMS]",
              "写入共享存档[STORAGEID] 键值对JSON[ITEMS]"
            ),
            arguments: {
              STORAGEID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "st_7f3a9c2e8b1d4g5h",
              },
              ITEMS: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '{"progress":"42"}',
              },
            },
          },
          {
            opcode: "get_shared_storage",
            blockType: Scratch.BlockType.REPORTER,
            text: pick(
              "get shared storage [STORAGEID] keys JSON [KEYS]",
              "读取共享存档[STORAGEID] keys JSON[KEYS]"
            ),
            arguments: {
              STORAGEID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "st_7f3a9c2e8b1d4g5h",
              },
              KEYS: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '["progress"]',
              },
            },
          },
          {
            opcode: "remove_shared_storage",
            blockType: Scratch.BlockType.COMMAND,
            text: pick(
              "remove shared storage [STORAGEID] keys JSON [KEYS]",
              "删除共享存档[STORAGEID] keys JSON[KEYS]"
            ),
            arguments: {
              STORAGEID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "st_7f3a9c2e8b1d4g5h",
              },
              KEYS: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '["progress"]',
              },
            },
          },
          {
            opcode: "submit_score",
            blockType: Scratch.BlockType.REPORTER,
            text: pick(
              "submit score board [BOARD] score [SCORE]",
              "提交分数 榜位[BOARD] 分数[SCORE]"
            ),
            arguments: {
              BOARD: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
              SCORE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
            },
          },
          {
            opcode: "get_rank_list",
            blockType: Scratch.BlockType.REPORTER,
            text: pick(
              "get rank list board [BOARD] period [PERIOD] limit [LIMIT]",
              "获取榜单 榜位[BOARD] 周期[PERIOD] 数量[LIMIT]"
            ),
            arguments: {
              BOARD: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
              PERIOD: {
                type: Scratch.ArgumentType.STRING,
                menu: "periodMenu",
                defaultValue: "all",
              },
              LIMIT: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 },
            },
          },
          {
            opcode: "get_my_rank",
            blockType: Scratch.BlockType.REPORTER,
            text: pick(
              "get my rank board [BOARD] period [PERIOD]",
              "获取我的排名 榜位[BOARD] 周期[PERIOD]"
            ),
            arguments: {
              BOARD: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
              PERIOD: {
                type: Scratch.ArgumentType.STRING,
                menu: "periodMenu",
                defaultValue: "all",
              },
            },
          },
          {
            opcode: "request_camera",
            blockType: Scratch.BlockType.REPORTER,
            text: pick(
              "request camera facing [FACING] return stream id",
              "申请摄像头 方向[FACING] 返回流ID"
            ),
            arguments: {
              FACING: {
                type: Scratch.ArgumentType.STRING,
                menu: "facingMenu",
                defaultValue: "user",
              },
            },
          },
          {
            opcode: "request_microphone",
            blockType: Scratch.BlockType.REPORTER,
            text: pick(
              "request microphone return stream id",
              "申请麦克风 返回流ID"
            ),
          },
          {
            opcode: "stop_media",
            blockType: Scratch.BlockType.COMMAND,
            text: pick("stop media stream [STREAM]", "停止媒体流[STREAM]"),
            arguments: {
              STREAM: { type: Scratch.ArgumentType.STRING, defaultValue: "" },
            },
          },
          {
            opcode: "when_container_change",
            blockType: Scratch.BlockType.HAT,
            text: pick("when container state changes", "当容器状态变化时"),
          },
          {
            opcode: "get_container_state",
            blockType: Scratch.BlockType.REPORTER,
            text: pick("get container state as JSON", "获取容器状态 JSON"),
          },
          {
            opcode: "get_last_container_state",
            blockType: Scratch.BlockType.REPORTER,
            text: pick("last container state as JSON", "最近一次容器状态 JSON"),
          },
          {
            opcode: "set_container_mode",
            blockType: Scratch.BlockType.COMMAND,
            text: pick(
              "set container mode orientation [ORIENTATION] immersive [IMMERSIVE]",
              "设置容器模式 方向[ORIENTATION] 沉浸[IMMERSIVE]"
            ),
            arguments: {
              ORIENTATION: {
                type: Scratch.ArgumentType.STRING,
                menu: "orientationMenu",
                defaultValue: "landscape",
              },
              IMMERSIVE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "true",
              },
            },
          },
          {
            opcode: "when_player_change",
            blockType: Scratch.BlockType.HAT,
            text: pick("when player state changes", "当播放器状态变化时"),
          },
          {
            opcode: "get_player_state",
            blockType: Scratch.BlockType.REPORTER,
            text: pick("get player state as JSON", "获取播放器状态 JSON"),
          },
          {
            opcode: "get_last_player_state",
            blockType: Scratch.BlockType.REPORTER,
            text: pick("last player state as JSON", "最近一次播放器状态 JSON"),
          },
          {
            opcode: "set_player_state",
            blockType: Scratch.BlockType.COMMAND,
            text: pick(
              "set player state position [POSITION] playing [PLAYING] muted [MUTED]",
              "设置播放器状态 位置[POSITION] 播放[PLAYING] 静音[MUTED]"
            ),
            arguments: {
              POSITION: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "30000",
              },
              PLAYING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "true",
              },
              MUTED: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "false",
              },
            },
          },
          {
            opcode: "when_page_close",
            blockType: Scratch.BlockType.HAT,
            text: pick("when page closes", "当页面关闭时"),
          },
          {
            opcode: "check_input_safety",
            blockType: Scratch.BlockType.REPORTER,
            text: pick(
              "check input safety text [TEXT] scene [SCENE] as JSON",
              "检测输入内容安全 文本[TEXT] 场景[SCENE] JSON"
            ),
            arguments: {
              TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: "昵称" },
              SCENE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "nickname",
              },
            },
          },
        ],
        menus: {
          abilityMenu: { acceptReporters: true, items: ABILITY_LIST },
          navigateTypeMenu: {
            acceptReporters: true,
            items: NAVIGATE_TYPE_LIST,
          },
          facingMenu: { acceptReporters: true, items: FACING_LIST },
          periodMenu: { acceptReporters: true, items: PERIOD_LIST },
          orientationMenu: { acceptReporters: true, items: ORIENTATION_LIST },
        },
      };
    }

    _ensureToy() {
      if (typeof window !== "undefined" && window.toy)
        return Promise.resolve(window.toy);
      if (this._toyPromise) return this._toyPromise;

      this._toyPromise = new Promise((resolve, reject) => {
        const done = () => {
          if (window.toy) resolve(window.toy);
          else
            reject(new Error("[ToySDK] window.toy not found after SDK load"));
        };
        const fail = () => reject(new Error("[ToySDK] failed to load Toy SDK"));

        const existing = document.querySelector(
          "script[data-bilibili-toy-sdk]"
        );
        if (existing) {
          existing.addEventListener("load", done);
          existing.addEventListener("error", fail);
          if (window.toy) done();
          return;
        }

        const script = document.createElement("script");
        script.src = "https://s1.hdslb.com/bfs/seed/toy/app/sdk/toy-sdk.js";
        script.async = true;
        script.dataset.bilibiliToySdk = "1";
        script.onload = done;
        script.onerror = fail;
        document.head.appendChild(script);
      });

      return this._toyPromise;
    }

    _startHat(opcode) {
      if (!this.runtime || typeof this.runtime.startHats !== "function") return;
      try {
        this.runtime.startHats("bilibilitoy_" + opcode);
      } catch (e) {
        console.warn("[ToySDK] startHats failed", opcode, e);
      }
    }

    _initAutoWatches() {
      this._ensureToy()
        .then((toy) => {
          const watch = (ability, setup) => {
            Promise.resolve(toy.isSupport(ability))
              .then((ok) => {
                if (!ok) return;
                try {
                  setup();
                } catch (e) {
                  console.warn("[ToySDK] watch setup failed", ability, e);
                }
              })
              .catch(() => {});
          };

          watch("onContainerChange", () => {
            if (this._containerOff) return;
            this._containerOff = toy.onContainerChange((state) => {
              this._lastContainerState = state;
              this._startHat("when_container_change");
            });
          });

          watch("onPlayerChange", () => {
            if (this._playerOff) return;
            this._playerOff = toy.onPlayerChange((state) => {
              this._lastPlayerState = state;
              this._startHat("when_player_change");
            });
          });

          watch("onPageClose", () => {
            if (this._pageCloseOff) return;
            this._pageCloseOff = toy.onPageClose(() => {
              this._lastPageClose = Date.now();
              this._startHat("when_page_close");
            });
          });
        })
        .catch((e) => {
          console.warn("[ToySDK] auto watch init failed", e);
        });
    }

    _parse(text, fallback) {
      if (text === undefined || text === null || text === "") return fallback;
      if (typeof text !== "string") return text;
      const s = text.trim();
      if (!s) return fallback;
      try {
        return JSON.parse(s);
      } catch (e) {
        throw new Error("[ToySDK] Invalid JSON: " + text);
      }
    }

    _json(value) {
      if (value === undefined) return "";
      try {
        return JSON.stringify(value);
      } catch (e) {
        return String(value);
      }
    }

    _err(error) {
      return this._json({
        error: {
          type: error && error.type,
          code: error && error.code,
          message: (error && error.message) || String(error),
        },
      });
    }

    _parseBool(text, name) {
      const s = String(text == null ? "" : text)
        .trim()
        .toLowerCase();
      if (s === "") return undefined;
      if (s === "true" || s === "1") return true;
      if (s === "false" || s === "0") return false;
      throw new Error("[ToySDK] " + name + " must be true or false");
    }

    _object(value, name) {
      if (!value || typeof value !== "object" || Array.isArray(value)) {
        throw new Error("[ToySDK] " + name + " must be an object");
      }
      return value;
    }

    _array(value, name) {
      if (!Array.isArray(value)) {
        throw new Error("[ToySDK] " + name + " must be an array");
      }
      return value;
    }

    in_bilibilitoy() {
      try {
        if (typeof location === "undefined") return false;
        return String(location.href).startsWith(
          "https://www.bilibilitoy.com/toy/"
        );
      } catch (e) {
        return false;
      }
    }

    async is_support(args) {
      try {
        const toy = await this._ensureToy();
        return !!(await toy.isSupport(String(args.ABILITY || "")));
      } catch (e) {
        return false;
      }
    }

    async navigate(args) {
      const toy = await this._ensureToy();
      const req = {
        type: String(args.TYPE || ""),
        id: String(args.ID || ""),
      };
      const extra = this._parse(args.EXTRA, undefined);
      if (extra !== undefined) req.extra = extra;
      await toy.navigate(req);
    }

    async save_image_to_album(args) {
      try {
        const toy = await this._ensureToy();
        const req = {};
        const url = String(args.URL || "");
        const base64Data = String(args.BASE64 || "");
        const hintMsg = String(args.HINT || "");
        if (url) req.url = url;
        if (base64Data) req.base64Data = base64Data;
        if (hintMsg) req.hintMsg = hintMsg;
        if (!req.url && !req.base64Data) {
          throw new Error("[ToySDK] saveImageToAlbum needs url or base64Data");
        }
        const result = await toy.saveImageToAlbum(req);
        return result && result.localPath
          ? result.localPath
          : this._json(result);
      } catch (e) {
        return this._err(e);
      }
    }

    async share(args) {
      const toy = await this._ensureToy();
      await toy.share({ path: String(args.PATH || "") });
    }

    async get_qr_code(args) {
      try {
        const toy = await this._ensureToy();
        const req = {};
        const path = String(args.PATH || "");
        if (path) req.path = path;
        if (args.SIZE !== "" && args.SIZE !== null && args.SIZE !== undefined) {
          const size = Number(args.SIZE);
          if (!Number.isFinite(size))
            throw new Error("[ToySDK] size must be a number");
          req.size = size;
        }
        const result = await toy.getQrCode(req);
        return this._json(result);
      } catch (e) {
        return this._err(e);
      }
    }

    async share_picture(args) {
      const toy = await this._ensureToy();
      const req = {};
      const url = String(args.URL || "");
      const base64Data = String(args.BASE64 || "");
      if (url) req.url = url;
      if (base64Data) req.base64Data = base64Data;
      if (!req.url && !req.base64Data) {
        throw new Error("[ToySDK] sharePicture needs url or base64Data");
      }
      await toy.sharePicture(req);
    }

    async close_browser() {
      const toy = await this._ensureToy();
      await toy.closeBrowser();
    }

    async get_user_profile() {
      try {
        const toy = await this._ensureToy();
        return this._json(await toy.getUserProfile());
      } catch (e) {
        return this._err(e);
      }
    }

    async get_author_profile() {
      try {
        const toy = await this._ensureToy();
        return this._json(await toy.getAuthorProfile());
      } catch (e) {
        return this._err(e);
      }
    }

    async get_author_videos(args) {
      try {
        const toy = await this._ensureToy();
        const videos = this._array(this._parse(args.VIDEOS, []), "videos");
        return this._json(await toy.getAuthorVideos({ videos }));
      } catch (e) {
        return this._err(e);
      }
    }

    async get_author_video_range(args) {
      try {
        const toy = await this._ensureToy();
        const req = {};
        const startText = String(args.START || "");
        const endText = String(args.END || "");
        if (startText) {
          const start = Number(startText);
          if (!Number.isFinite(start))
            throw new Error("[ToySDK] start must be a number");
          req.start = start;
        }
        if (endText) {
          const end = Number(endText);
          if (!Number.isFinite(end))
            throw new Error("[ToySDK] end must be a number");
          req.end = end;
        }
        return this._json(await toy.getAuthorVideoRange(req));
      } catch (e) {
        return this._err(e);
      }
    }

    async get_author_relation() {
      try {
        const toy = await this._ensureToy();
        return this._json(await toy.getAuthorRelation());
      } catch (e) {
        return this._err(e);
      }
    }

    async get_video_user_actions(args) {
      try {
        const toy = await this._ensureToy();
        const aids = this._array(this._parse(args.AIDS, []), "aids");
        const videos = this._array(this._parse(args.VIDEOS, []), "videos");
        if (aids.length > 0 && videos.length > 0) {
          throw new Error(
            "[ToySDK] getVideoUserActions: pass either aids or videos, not both"
          );
        }
        let req;
        if (aids.length > 0) req = { aids };
        else if (videos.length > 0) req = { videos };
        else
          throw new Error("[ToySDK] getVideoUserActions needs aids or videos");
        return this._json(await toy.getVideoUserActions(req));
      } catch (e) {
        return this._err(e);
      }
    }

    async get_annual_report(args) {
      try {
        const toy = await this._ensureToy();
        const edition = String(args.EDITION || "2026");
        return this._json(await toy.getAnnualReport({ edition }));
      } catch (e) {
        return this._err(e);
      }
    }

    async get_charge_unlock(args) {
      try {
        const toy = await this._ensureToy();
        const minPrice = Number(args.MINPRICE);
        if (!Number.isFinite(minPrice))
          throw new Error("[ToySDK] minPrice must be a number");
        return this._json(await toy.getChargeUnlock({ minPrice }));
      } catch (e) {
        return this._err(e);
      }
    }

    async open_charge_panel(args) {
      const toy = await this._ensureToy();
      const minPrice = Number(args.MINPRICE);
      if (!Number.isFinite(minPrice))
        throw new Error("[ToySDK] minPrice must be a number");
      await toy.openChargePanel({ minPrice });
    }

    async start_charge_watch(args) {
      const toy = await this._ensureToy();
      const minPrice = Number(args.MINPRICE);
      if (!Number.isFinite(minPrice))
        throw new Error("[ToySDK] minPrice must be a number");
      if (this._chargeOff) {
        this._chargeOff();
        this._chargeOff = null;
      }
      this._lastChargeUnlock = await toy.getChargeUnlock({ minPrice });
      this._chargeOff = toy.onChargeUnlockChange((result) => {
        this._lastChargeUnlock = result;
        this._startHat("when_charge_unlock_change");
      });
    }

    when_charge_unlock_change() {
      // Event hat: started by startHats from the SDK callback.
    }

    get_last_charge_unlock() {
      return this._json(this._lastChargeUnlock);
    }

    async set_cloud_storage(args) {
      const toy = await this._ensureToy();
      const items = this._object(this._parse(args.ITEMS, {}), "items");
      await toy.setCloudStorage(items);
    }

    async get_cloud_storage(args) {
      try {
        const toy = await this._ensureToy();
        const keys = this._array(this._parse(args.KEYS, []), "keys");
        const result =
          keys.length > 0
            ? await toy.getCloudStorage(keys)
            : await toy.getCloudStorage();
        return this._json(result);
      } catch (e) {
        return this._err(e);
      }
    }

    async remove_cloud_storage(args) {
      const toy = await this._ensureToy();
      const keys = this._array(this._parse(args.KEYS, []), "keys");
      await toy.removeCloudStorage(keys);
    }

    async set_shared_storage(args) {
      const toy = await this._ensureToy();
      const storageId = String(args.STORAGEID || "");
      if (!storageId) throw new Error("[ToySDK] storageId is required");
      const items = this._object(this._parse(args.ITEMS, {}), "items");
      await toy.setSharedStorage(storageId, items);
    }

    async get_shared_storage(args) {
      try {
        const toy = await this._ensureToy();
        const storageId = String(args.STORAGEID || "");
        if (!storageId) throw new Error("[ToySDK] storageId is required");
        const keys = this._array(this._parse(args.KEYS, []), "keys");
        const result =
          keys.length > 0
            ? await toy.getSharedStorage(storageId, keys)
            : await toy.getSharedStorage(storageId);
        return this._json(result);
      } catch (e) {
        return this._err(e);
      }
    }

    async remove_shared_storage(args) {
      const toy = await this._ensureToy();
      const storageId = String(args.STORAGEID || "");
      if (!storageId) throw new Error("[ToySDK] storageId is required");
      const keys = this._array(this._parse(args.KEYS, []), "keys");
      await toy.removeSharedStorage(storageId, keys);
    }

    async submit_score(args) {
      try {
        const toy = await this._ensureToy();
        const score = Number(args.SCORE);
        if (!Number.isFinite(score))
          throw new Error("[ToySDK] score must be a number");
        const req = { score };
        const board = Number(args.BOARD);
        if (Number.isFinite(board)) req.board = board;
        return this._json(await toy.submitScore(req));
      } catch (e) {
        return this._err(e);
      }
    }

    async get_rank_list(args) {
      try {
        const toy = await this._ensureToy();
        const req = {};
        const board = Number(args.BOARD);
        if (Number.isFinite(board)) req.board = board;
        const period = String(args.PERIOD || "");
        if (period) req.period = period;
        const limit = Number(args.LIMIT);
        if (Number.isFinite(limit) && limit > 0) req.limit = limit;
        return this._json(await toy.getRankList(req));
      } catch (e) {
        return this._err(e);
      }
    }

    async get_my_rank(args) {
      try {
        const toy = await this._ensureToy();
        const req = {};
        const board = Number(args.BOARD);
        if (Number.isFinite(board)) req.board = board;
        const period = String(args.PERIOD || "");
        if (period) req.period = period;
        return this._json(await toy.getMyRank(req));
      } catch (e) {
        return this._err(e);
      }
    }

    async request_camera(args) {
      const toy = await this._ensureToy();
      const facingMode = String(args.FACING || "user");
      const stream = await toy.requestCamera({ facingMode });
      const id = "camera-" + ++this._mediaSeq;
      this._mediaStreams.set(id, stream);
      this._lastMediaId = id;
      return id;
    }

    async request_microphone() {
      const toy = await this._ensureToy();
      const stream = await toy.requestMicrophone();
      const id = "microphone-" + ++this._mediaSeq;
      this._mediaStreams.set(id, stream);
      this._lastMediaId = id;
      return id;
    }

    async stop_media(args) {
      const toy = await this._ensureToy();
      let id = String(args.STREAM || "");
      if (!id) id = this._lastMediaId;
      const stream = this._mediaStreams.get(id);
      if (!stream) throw new Error("[ToySDK] Unknown media stream id: " + id);
      await toy.stopMedia(stream);
      this._mediaStreams.delete(id);
      if (this._lastMediaId === id) this._lastMediaId = "";
    }

    when_container_change() {
      // Event hat: started by startHats from the SDK callback.
    }

    async get_container_state() {
      try {
        const toy = await this._ensureToy();
        const state = await toy.getContainerState();
        this._lastContainerState = state;
        return this._json(state);
      } catch (e) {
        return this._err(e);
      }
    }

    get_last_container_state() {
      return this._json(this._lastContainerState);
    }

    async set_container_mode(args) {
      const toy = await this._ensureToy();
      const req = {};
      const orientation = String(args.ORIENTATION || "");
      if (orientation) req.orientation = orientation;
      const immersive = this._parseBool(args.IMMERSIVE, "immersive");
      if (immersive !== undefined) req.immersive = immersive;
      if (!("orientation" in req) && !("immersive" in req)) {
        throw new Error(
          "[ToySDK] setContainerMode needs orientation or immersive"
        );
      }
      await toy.setContainerMode(req);
    }

    when_player_change() {
      // Event hat: started by startHats from the SDK callback.
    }

    async get_player_state() {
      try {
        const toy = await this._ensureToy();
        const state = await toy.getPlayerState();
        this._lastPlayerState = state;
        return this._json(state);
      } catch (e) {
        return this._err(e);
      }
    }

    get_last_player_state() {
      return this._json(this._lastPlayerState);
    }

    async set_player_state(args) {
      const toy = await this._ensureToy();
      const req = {};
      const positionText = String(args.POSITION || "");
      if (positionText !== "") {
        const position = Number(positionText);
        if (
          !Number.isFinite(position) ||
          position < 0 ||
          !Number.isInteger(position)
        ) {
          throw new Error("[ToySDK] position must be a non-negative integer");
        }
        req.position = position;
      }
      const playing = this._parseBool(args.PLAYING, "playing");
      if (playing !== undefined) req.playing = playing;
      const muted = this._parseBool(args.MUTED, "muted");
      if (muted !== undefined) req.muted = muted;
      if (!("position" in req) && !("playing" in req) && !("muted" in req)) {
        throw new Error(
          "[ToySDK] setPlayerState needs position, playing or muted"
        );
      }
      await toy.setPlayerState(req);
    }

    when_page_close() {
      // Event hat: started by startHats from the SDK callback.
    }

    async check_input_safety(args) {
      try {
        const toy = await this._ensureToy();
        const req = { text: String(args.TEXT || "") };
        const scene = String(args.SCENE || "");
        if (scene) req.scene = scene;
        return this._json(await toy.checkInputSafety(req));
      } catch (e) {
        return this._err(e);
      }
    }
  }

  Scratch.extensions.register(new BilibiliToyJSSDK());
})();
