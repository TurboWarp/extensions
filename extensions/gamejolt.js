// Name: Game Jolt
// ID: GameJoltAPI
// Description: Blocks that allow games to interact with the GameJolt API. Unofficial.
// By: softed <https://scratch.mit.edu/users/softed/>
// License: MIT

((Scratch) => {
  "use strict";

  const md5 = (() => {
    /*!
     * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
     * Digest Algorithm, as defined in RFC 1321.
     * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
     * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
     * Distributed under the BSD License
     * See http://pajhome.org.uk/crypt/md5 for more info.
     */

    var hexcase = 0;
    function hex_md5(a) {
      return rstr2hex(rstr_md5(str2rstr_utf8(a)));
    }
    // eslint-disable-next-line no-unused-vars
    function hex_hmac_md5(a, b) {
      return rstr2hex(rstr_hmac_md5(str2rstr_utf8(a), str2rstr_utf8(b)));
    }
    // eslint-disable-next-line no-unused-vars
    function md5_vm_test() {
      return hex_md5("abc").toLowerCase() == "900150983cd24fb0d6963f7d28e17f72";
    }
    function rstr_md5(a) {
      return binl2rstr(binl_md5(rstr2binl(a), a.length * 8));
    }
    function rstr_hmac_md5(c, f) {
      var e = rstr2binl(c);
      if (e.length > 16) {
        e = binl_md5(e, c.length * 8);
      }
      var a = Array(16),
        d = Array(16);
      for (var b = 0; b < 16; b++) {
        a[b] = e[b] ^ 909522486;
        d[b] = e[b] ^ 1549556828;
      }
      var g = binl_md5(a.concat(rstr2binl(f)), 512 + f.length * 8);
      return binl2rstr(binl_md5(d.concat(g), 512 + 128));
    }
    function rstr2hex(c) {
      try {
        hexcase;
      } catch (g) {
        hexcase = 0;
      }
      var f = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
      var b = "";
      var a;
      for (var d = 0; d < c.length; d++) {
        a = c.charCodeAt(d);
        b += f.charAt((a >>> 4) & 15) + f.charAt(a & 15);
      }
      return b;
    }
    function str2rstr_utf8(c) {
      var b = "";
      var d = -1;
      var a, e;
      while (++d < c.length) {
        a = c.charCodeAt(d);
        e = d + 1 < c.length ? c.charCodeAt(d + 1) : 0;
        if (55296 <= a && a <= 56319 && 56320 <= e && e <= 57343) {
          a = 65536 + ((a & 1023) << 10) + (e & 1023);
          d++;
        }
        if (a <= 127) {
          b += String.fromCharCode(a);
        } else {
          if (a <= 2047) {
            b += String.fromCharCode(192 | ((a >>> 6) & 31), 128 | (a & 63));
          } else {
            if (a <= 65535) {
              b += String.fromCharCode(
                224 | ((a >>> 12) & 15),
                128 | ((a >>> 6) & 63),
                128 | (a & 63)
              );
            } else {
              if (a <= 2097151) {
                b += String.fromCharCode(
                  240 | ((a >>> 18) & 7),
                  128 | ((a >>> 12) & 63),
                  128 | ((a >>> 6) & 63),
                  128 | (a & 63)
                );
              }
            }
          }
        }
      }
      return b;
    }
    function rstr2binl(b) {
      var a = Array(b.length >> 2);
      for (var c = 0; c < a.length; c++) {
        a[c] = 0;
      }
      // eslint-disable-next-line no-redeclare
      for (var c = 0; c < b.length * 8; c += 8) {
        a[c >> 5] |= (b.charCodeAt(c / 8) & 255) << c % 32;
      }
      return a;
    }
    function binl2rstr(b) {
      var a = "";
      for (var c = 0; c < b.length * 32; c += 8) {
        a += String.fromCharCode((b[c >> 5] >>> c % 32) & 255);
      }
      return a;
    }
    function binl_md5(p, k) {
      p[k >> 5] |= 128 << k % 32;
      p[(((k + 64) >>> 9) << 4) + 14] = k;
      var o = 1732584193;
      var n = -271733879;
      var m = -1732584194;
      var l = 271733878;
      for (var g = 0; g < p.length; g += 16) {
        var j = o;
        var h = n;
        var f = m;
        var e = l;
        o = md5_ff(o, n, m, l, p[g + 0], 7, -680876936);
        l = md5_ff(l, o, n, m, p[g + 1], 12, -389564586);
        m = md5_ff(m, l, o, n, p[g + 2], 17, 606105819);
        n = md5_ff(n, m, l, o, p[g + 3], 22, -1044525330);
        o = md5_ff(o, n, m, l, p[g + 4], 7, -176418897);
        l = md5_ff(l, o, n, m, p[g + 5], 12, 1200080426);
        m = md5_ff(m, l, o, n, p[g + 6], 17, -1473231341);
        n = md5_ff(n, m, l, o, p[g + 7], 22, -45705983);
        o = md5_ff(o, n, m, l, p[g + 8], 7, 1770035416);
        l = md5_ff(l, o, n, m, p[g + 9], 12, -1958414417);
        m = md5_ff(m, l, o, n, p[g + 10], 17, -42063);
        n = md5_ff(n, m, l, o, p[g + 11], 22, -1990404162);
        o = md5_ff(o, n, m, l, p[g + 12], 7, 1804603682);
        l = md5_ff(l, o, n, m, p[g + 13], 12, -40341101);
        m = md5_ff(m, l, o, n, p[g + 14], 17, -1502002290);
        n = md5_ff(n, m, l, o, p[g + 15], 22, 1236535329);
        o = md5_gg(o, n, m, l, p[g + 1], 5, -165796510);
        l = md5_gg(l, o, n, m, p[g + 6], 9, -1069501632);
        m = md5_gg(m, l, o, n, p[g + 11], 14, 643717713);
        n = md5_gg(n, m, l, o, p[g + 0], 20, -373897302);
        o = md5_gg(o, n, m, l, p[g + 5], 5, -701558691);
        l = md5_gg(l, o, n, m, p[g + 10], 9, 38016083);
        m = md5_gg(m, l, o, n, p[g + 15], 14, -660478335);
        n = md5_gg(n, m, l, o, p[g + 4], 20, -405537848);
        o = md5_gg(o, n, m, l, p[g + 9], 5, 568446438);
        l = md5_gg(l, o, n, m, p[g + 14], 9, -1019803690);
        m = md5_gg(m, l, o, n, p[g + 3], 14, -187363961);
        n = md5_gg(n, m, l, o, p[g + 8], 20, 1163531501);
        o = md5_gg(o, n, m, l, p[g + 13], 5, -1444681467);
        l = md5_gg(l, o, n, m, p[g + 2], 9, -51403784);
        m = md5_gg(m, l, o, n, p[g + 7], 14, 1735328473);
        n = md5_gg(n, m, l, o, p[g + 12], 20, -1926607734);
        o = md5_hh(o, n, m, l, p[g + 5], 4, -378558);
        l = md5_hh(l, o, n, m, p[g + 8], 11, -2022574463);
        m = md5_hh(m, l, o, n, p[g + 11], 16, 1839030562);
        n = md5_hh(n, m, l, o, p[g + 14], 23, -35309556);
        o = md5_hh(o, n, m, l, p[g + 1], 4, -1530992060);
        l = md5_hh(l, o, n, m, p[g + 4], 11, 1272893353);
        m = md5_hh(m, l, o, n, p[g + 7], 16, -155497632);
        n = md5_hh(n, m, l, o, p[g + 10], 23, -1094730640);
        o = md5_hh(o, n, m, l, p[g + 13], 4, 681279174);
        l = md5_hh(l, o, n, m, p[g + 0], 11, -358537222);
        m = md5_hh(m, l, o, n, p[g + 3], 16, -722521979);
        n = md5_hh(n, m, l, o, p[g + 6], 23, 76029189);
        o = md5_hh(o, n, m, l, p[g + 9], 4, -640364487);
        l = md5_hh(l, o, n, m, p[g + 12], 11, -421815835);
        m = md5_hh(m, l, o, n, p[g + 15], 16, 530742520);
        n = md5_hh(n, m, l, o, p[g + 2], 23, -995338651);
        o = md5_ii(o, n, m, l, p[g + 0], 6, -198630844);
        l = md5_ii(l, o, n, m, p[g + 7], 10, 1126891415);
        m = md5_ii(m, l, o, n, p[g + 14], 15, -1416354905);
        n = md5_ii(n, m, l, o, p[g + 5], 21, -57434055);
        o = md5_ii(o, n, m, l, p[g + 12], 6, 1700485571);
        l = md5_ii(l, o, n, m, p[g + 3], 10, -1894986606);
        m = md5_ii(m, l, o, n, p[g + 10], 15, -1051523);
        n = md5_ii(n, m, l, o, p[g + 1], 21, -2054922799);
        o = md5_ii(o, n, m, l, p[g + 8], 6, 1873313359);
        l = md5_ii(l, o, n, m, p[g + 15], 10, -30611744);
        m = md5_ii(m, l, o, n, p[g + 6], 15, -1560198380);
        n = md5_ii(n, m, l, o, p[g + 13], 21, 1309151649);
        o = md5_ii(o, n, m, l, p[g + 4], 6, -145523070);
        l = md5_ii(l, o, n, m, p[g + 11], 10, -1120210379);
        m = md5_ii(m, l, o, n, p[g + 2], 15, 718787259);
        n = md5_ii(n, m, l, o, p[g + 9], 21, -343485551);
        o = safe_add(o, j);
        n = safe_add(n, h);
        m = safe_add(m, f);
        l = safe_add(l, e);
      }
      return Array(o, n, m, l);
    }
    function md5_cmn(h, e, d, c, g, f) {
      return safe_add(bit_rol(safe_add(safe_add(e, h), safe_add(c, f)), g), d);
    }
    function md5_ff(g, f, k, j, e, i, h) {
      return md5_cmn((f & k) | (~f & j), g, f, e, i, h);
    }
    function md5_gg(g, f, k, j, e, i, h) {
      return md5_cmn((f & j) | (k & ~j), g, f, e, i, h);
    }
    function md5_hh(g, f, k, j, e, i, h) {
      return md5_cmn(f ^ k ^ j, g, f, e, i, h);
    }
    function md5_ii(g, f, k, j, e, i, h) {
      return md5_cmn(k ^ (f | ~j), g, f, e, i, h);
    }
    function safe_add(a, d) {
      var c = (a & 65535) + (d & 65535);
      var b = (a >> 16) + (d >> 16) + (c >> 16);
      return (b << 16) | (c & 65535);
    }
    function bit_rol(a, b) {
      return (a << b) | (a >>> (32 - b));
    }

    return hex_md5;
  })();

  const GameJolt = (() => {
    /*!
     * This is a modified version of https://github.com/MausGames/game-jolt-api-js-library (Public Domain)
     */
    var GJAPI = {};

    GJAPI.err = {
      noLogin: "No user logged in.",
      login: "User already logged in.",
      noFetch: "Fetch request not supported.",

      /**
       * @param {string} code
       */
      get: (code) => {
        return {
          success: false,
          message: GJAPI.err[code] || code,
        };
      },
    };

    GJAPI.sStatus = "active";

    GJAPI.iGameID = 0;
    GJAPI.sGameKey = "";
    GJAPI.bAutoLogin = true;

    GJAPI.sAPI = "https://api.gamejolt.com/api/game/v1_2";
    GJAPI.sLogName = "[Game Jolt API]";
    GJAPI.iLogStack = 20;

    GJAPI.asQueryParam = (() => {
      var asOutput = {};
      var asList = window.location.search.substring(1).split("&");

      // loop through all parameters
      for (var i = 0; i < asList.length; ++i) {
        // separate key from value
        var asPair = asList[i].split("=");

        // insert value into map
        if (typeof asOutput[asPair[0]] === "undefined")
          asOutput[asPair[0]] = asPair[1]; // create new entry
        else if (typeof asOutput[asPair[0]] === "string")
          asOutput[asPair[0]] = [asOutput[asPair[0]], asPair[1]];
        // extend into array
        else asOutput[asPair[0]].push(asPair[1]); // append to array
      }

      return asOutput;
    })();

    GJAPI.bOnGJ = window.location.hostname.match(/gamejolt\.net/)
      ? true
      : false;

    /**
     * Log message and stack trace
     * @param {string} sMessage
     */
    GJAPI.LogTrace = (sMessage) => {
      // prevent flooding
      if (!GJAPI.iLogStack) return;
      if (!--GJAPI.iLogStack) sMessage = "(╯°□°）╯︵ ┻━┻";

      console.warn(GJAPI.sLogName + " " + sMessage);
      console.trace();
    };

    // **************
    // Main functions
    GJAPI.SEND_FOR_USER = true;
    GJAPI.SEND_GENERAL = false;

    /**
     * @param {string} sURL
     * @param {boolean} bSendUser
     * @param {function} pCallback
     */
    GJAPI.SendRequest = (sURL, bSendUser, pCallback) => {
      // forward call to extended function
      GJAPI.SendRequestEx(sURL, bSendUser, "json", "", pCallback);
    };

    /**
     * @param {string} sURL
     * @param {boolean} bSendUser
     * @param {string} sFormat
     * @param {string} sBodyData
     * @param {function} pCallback
     */
    GJAPI.SendRequestEx = (sURL, bSendUser, sFormat, sBodyData, pCallback) => {
      // add main URL, game ID and format type
      sURL =
        GJAPI.sAPI +
        encodeURI(sURL) +
        (sURL.indexOf("/?") === -1 ? "?" : "&") +
        "game_id=" +
        GJAPI.iGameID +
        "&format=" +
        sFormat;

      // add credentials of current user (for user-related operations)
      if (GJAPI.bLoggedIn && bSendUser)
        sURL +=
          "&username=" + GJAPI.sUserName + "&user_token=" + GJAPI.sUserToken;

      // generate MD5 signature
      sURL += "&signature=" + md5(sURL + GJAPI.sGameKey);

      // send off the request
      __CreateAjax(sURL, sBodyData, (sResponse) => {
        console.info(GJAPI.sLogName + " <" + sURL + "> " + sResponse);
        if (sResponse === "" || typeof pCallback !== "function") return;

        switch (sFormat) {
          case "json":
            pCallback(JSON.parse(sResponse).response);
            break;

          case "dump":
            var iLineBreakIndex = sResponse.indexOf("\n");
            var sResult = sResponse.substr(0, iLineBreakIndex - 1);
            var sData = sResponse.substr(iLineBreakIndex + 1);

            pCallback({
              success: sResult === "SUCCESS",
              data: sData,
            });
            break;

          default:
            if (typeof pCallback == "function") pCallback(sResponse);
        }
      });
    };

    // automatically retrieve and log in current user on Game Jolt
    GJAPI.bLoggedIn =
      GJAPI.bAutoLogin &&
      GJAPI.asQueryParam["gjapi_username"] &&
      GJAPI.asQueryParam["gjapi_token"]
        ? true
        : false;
    GJAPI.sUserName = GJAPI.bLoggedIn
      ? GJAPI.asQueryParam["gjapi_username"]
      : "";
    GJAPI.sUserToken = GJAPI.bLoggedIn ? GJAPI.asQueryParam["gjapi_token"] : "";

    // send some information to the console
    console.info(GJAPI.asQueryParam);
    console.info(
      GJAPI.sLogName +
        (GJAPI.bOnGJ ? " E" : " Not e") +
        "mbedded on Game Jolt <" +
        window.location.origin +
        window.location.pathname +
        ">"
    );
    console.info(
      GJAPI.sLogName +
        (GJAPI.bLoggedIn ? " U" : " No u") +
        "ser recognized <" +
        GJAPI.sUserName +
        ">"
    );
    if (!window.location.hostname)
      console.warn(
        GJAPI.sLogName +
          " XMLHttpRequest may not work properly on a local environment"
      );

    // *****************
    // Session functions
    GJAPI.bSessionActive = true;

    /**
     * @param {function} pCallback
     */
    GJAPI.SessionOpen = (pCallback) => {
      if (!GJAPI.bLoggedIn) {
        GJAPI.LogTrace("SessionOpen() failed: no user logged in");
        pCallback(GJAPI.err.get("noLogin"));
        return;
      }

      // check for already open session
      if (GJAPI.iSessionHandle) {
        pCallback();
        return;
      }

      // send open-session request
      GJAPI.SendRequest("/sessions/open/", GJAPI.SEND_FOR_USER, (pResponse) => {
        // check for success
        if (pResponse.success == "true") {
          // add automatic session ping and close
          GJAPI.iSessionHandle = window.setInterval(GJAPI.SessionPing, 30000);
          window.addEventListener("beforeunload", GJAPI.SessionClose, false);
        }

        if (typeof pCallback == "function") pCallback(pResponse);
      });
    };

    /**
     * Send ping-session request
     * @param {function} pCallback
     */
    GJAPI.SessionPing = (pCallback) => {
      if (!GJAPI.bLoggedIn) {
        GJAPI.LogTrace("SessionPing() failed: no user logged in");
        pCallback(GJAPI.err.get("noLogin"));
        return;
      }

      GJAPI.SendRequest(
        "/sessions/ping/?status=" + GJAPI.sStatus,
        GJAPI.SEND_FOR_USER,
        pCallback
      );
    };

    /**
     * Send close-session request
     * @param {function} pCallback
     */
    GJAPI.SessionClose = (pCallback) => {
      if (!GJAPI.bLoggedIn) {
        GJAPI.LogTrace("SessionClose() failed: no user logged in");
        pCallback(GJAPI.err.get("noLogin"));
        return;
      }

      if (GJAPI.iSessionHandle) {
        // remove automatic session ping and close
        window.clearInterval(GJAPI.iSessionHandle);
        window.removeEventListener("beforeunload", GJAPI.SessionClose);

        GJAPI.iSessionHandle = 0;
      }

      GJAPI.SendRequest("/sessions/close/", GJAPI.SEND_FOR_USER, pCallback);
    };

    // automatically start player session
    if (GJAPI.bLoggedIn) GJAPI.SessionOpen();

    // **************
    // User functions

    /**
     * Send authentification request
     * @param {string} sUserName
     * @param {string} sUserToken
     * @param {function} pCallback
     */
    GJAPI.UserLoginManual = (sUserName, sUserToken, pCallback) => {
      if (GJAPI.bLoggedIn) {
        GJAPI.LogTrace(
          "UserLoginManual(" +
            sUserName +
            ", " +
            sUserToken +
            ") failed: user " +
            GJAPI.sUserName +
            " already logged in"
        );
        pCallback(GJAPI.err.get("login"));
        return;
      }

      GJAPI.SendRequest(
        "/users/auth/" + "?username=" + sUserName + "&user_token=" + sUserToken,
        GJAPI.SEND_GENERAL,
        (pResponse) => {
          // check for success
          if (pResponse.success == "true") {
            // save login properties
            GJAPI.bLoggedIn = true;
            GJAPI.sUserName = sUserName;
            GJAPI.sUserToken = sUserToken;

            // open session
            GJAPI.SessionOpen();
          }

          // execute nested callback
          if (typeof pCallback === "function") pCallback(pResponse);
        }
      );
    };

    /**
     * @param {function} pCallback
     */
    GJAPI.UserLogout = (pCallback) => {
      if (!GJAPI.bLoggedIn) {
        GJAPI.LogTrace("UserLogout() failed: no user logged in");
        pCallback(GJAPI.err.get("noLogin"));
        return;
      }

      // close session
      GJAPI.SessionClose();

      // reset login properties
      GJAPI.bLoggedIn = false;
      GJAPI.sUserName = "";
      GJAPI.sUserToken = "";

      // reset trophy cache
      GJAPI.abTrophyCache = {};
      pCallback({ success: true });
    };

    /**
     * Send fetch-user request
     * @param {number} iUserID
     * @param {function} pCallback
     */
    GJAPI.UserFetchID = (iUserID, pCallback) => {
      GJAPI.SendRequest(
        "/users/?user_id=" + iUserID,
        GJAPI.SEND_GENERAL,
        pCallback
      );
    };

    /**
     * Send fetch-ser request
     * @param {string} sUserName
     * @param {function} pCallback
     */
    GJAPI.UserFetchName = (sUserName, pCallback) => {
      GJAPI.SendRequest(
        "/users/?username=" + sUserName,
        GJAPI.SEND_GENERAL,
        pCallback
      );
    };

    /**
     * Send fetch-user request
     * @param {function} pCallback
     */
    GJAPI.UserFetchCurrent = (pCallback) => {
      if (!GJAPI.bLoggedIn) {
        GJAPI.LogTrace("UserFetchCurrent() failed: no user logged in");
        pCallback(GJAPI.err.get("noLogin"));
        return;
      }

      GJAPI.UserFetchName(GJAPI.sUserName, pCallback);
    };

    // ****************
    // Trophy functions
    GJAPI.abTrophyCache = {};

    GJAPI.TROPHY_ONLY_ACHIEVED = 1;
    GJAPI.TROPHY_ONLY_NOTACHIEVED = -1;
    GJAPI.TROPHY_ALL = 0;

    /**
     * Send achieve-trophy request
     * @param {number} iTrophyID
     * @param {function} pCallback
     */
    GJAPI.TrophyAchieve = (iTrophyID, pCallback) => {
      if (!GJAPI.bLoggedIn) {
        GJAPI.LogTrace(
          "TrophyAchieve(" + iTrophyID + ") failed: no user logged in"
        );
        pCallback(GJAPI.err.get("noLogin"));
        return;
      }

      // check for already achieved trophy
      if (GJAPI.abTrophyCache[iTrophyID]) {
        pCallback(GJAPI.err.get("Trophy already achieved."));
        return;
      }

      GJAPI.SendRequest(
        "/trophies/add-achieved/?trophy_id=" + iTrophyID,
        GJAPI.SEND_FOR_USER,
        function (pResponse) {
          // check for success
          if (pResponse.success == "true") {
            // save status
            GJAPI.abTrophyCache[iTrophyID] = true;
          }

          // execute nested callback
          if (typeof pCallback === "function") pCallback(pResponse);
        }
      );
    };

    /**
     * Send fetch-trophy request
     * @param {number} iAchieved
     * @param {function} pCallback
     */
    GJAPI.TrophyFetch = (iAchieved, pCallback) => {
      if (!GJAPI.bLoggedIn) {
        GJAPI.LogTrace(
          "TrophyFetch(" + iAchieved + ") failed: no user logged in"
        );
        pCallback(GJAPI.err.get("noLogin"));
        return;
      }

      // only trophies with the requested status
      var sTrophyData =
        iAchieved === GJAPI.TROPHY_ALL
          ? ""
          : "?achieved=" +
            (iAchieved >= GJAPI.TROPHY_ONLY_ACHIEVED ? "true" : "false");

      GJAPI.SendRequest(
        "/trophies/" + sTrophyData,
        GJAPI.SEND_FOR_USER,
        pCallback
      );
    };

    /**
     * Send fetch-trophy request
     * @param {number} iTrophyID
     * @param {function} pCallback
     */
    GJAPI.TrophyFetchSingle = (iTrophyID, pCallback) => {
      if (!GJAPI.bLoggedIn) {
        GJAPI.LogTrace(
          "TrophyFetchSingle(" + iTrophyID + ") failed: no user logged in"
        );
        pCallback(GJAPI.err.get("noLogin"));
        return;
      }

      GJAPI.SendRequest(
        "/trophies/?trophy_id=" + iTrophyID,
        GJAPI.SEND_FOR_USER,
        pCallback
      );
    };

    // ***************
    // Score functions
    GJAPI.SCORE_ONLY_USER = true;
    GJAPI.SCORE_ALL = false;

    /**
     * Send add-score request
     * @param {number} iScoreTableID
     * @param {number} iScoreValue
     * @param {string} sScoreText
     * @param {string} sExtraData
     * @param {function} pCallback
     */
    GJAPI.ScoreAdd = (
      iScoreTableID,
      iScoreValue,
      sScoreText,
      sExtraData,
      pCallback
    ) => {
      if (!GJAPI.bLoggedIn) {
        GJAPI.LogTrace(
          "ScoreAdd(" +
            iScoreTableID +
            ", " +
            iScoreValue +
            ", " +
            sScoreText +
            ") failed: no user logged in"
        );
        pCallback(GJAPI.err.get("noLogin"));
        return;
      }

      GJAPI.ScoreAddGuest(
        iScoreTableID,
        iScoreValue,
        sScoreText,
        "",
        sExtraData,
        pCallback
      );
    };

    /**
     * Send add-score request
     * @param {number} iScoreTableID
     * @param {number} iScoreValue
     * @param {string} sScoreText
     * @param {string} sGuestName
     * @param {string} sExtraData
     * @param {function} pCallback
     */
    GJAPI.ScoreAddGuest = (
      iScoreTableID,
      iScoreValue,
      sScoreText,
      sGuestName,
      sExtraData,
      pCallback
    ) => {
      // use current user data or guest name
      var bIsGuest = sGuestName && sGuestName.length ? true : false;

      GJAPI.SendRequest(
        "/scores/add/?sort=" +
          iScoreValue +
          "&score=" +
          sScoreText +
          (bIsGuest ? "&guest=" + sGuestName : "") +
          (iScoreTableID ? "&table_id=" + iScoreTableID : "") +
          (sExtraData ? "&extra_data=" + sExtraData : ""),
        bIsGuest ? GJAPI.SEND_GENERAL : GJAPI.SEND_FOR_USER,
        pCallback
      );
    };

    /**
     * Send fetch-score request
     * @param {number} iScoreTableID
     * @param {boolean} bOnlyUser
     * @param {number} iLimit
     * @param {function} pCallback
     */
    GJAPI.ScoreFetch = (iScoreTableID, bOnlyUser, iLimit, pCallback) => {
      if (!GJAPI.bLoggedIn && bOnlyUser) {
        GJAPI.LogTrace(
          "ScoreFetch(" +
            iScoreTableID +
            ", " +
            bOnlyUser +
            ", " +
            iLimit +
            ") failed: no user logged in"
        );
        pCallback(GJAPI.err.get("noLogin"));
        return;
      }

      // only scores from the current user or all scores
      var bFetchAll = bOnlyUser === GJAPI.SCORE_ONLY_USER ? false : true;

      GJAPI.SendRequest(
        "/scores/?limit=" +
          iLimit +
          (iScoreTableID ? "&table_id=" + iScoreTableID : ""),
        bFetchAll ? GJAPI.SEND_GENERAL : GJAPI.SEND_FOR_USER,
        pCallback
      );
    };

    // ********************
    // Data store functions
    GJAPI.DATA_STORE_USER = true;
    GJAPI.DATA_STORE_GLOBAL = false;

    /**
     * Send set-data request
     * @param {number} iStore
     * @param {string} sKey
     * @param {string} sData
     * @param {function} pCallback
     */
    GJAPI.DataStoreSet = (iStore, sKey, sData, pCallback) => {
      GJAPI.SendRequest(
        "/data-store/set/?key=" + sKey + "&data=" + sData,
        iStore,
        pCallback
      );
    };

    /**
     * Send fetch-data request
     * @param {number} iStore
     * @param {string} sKey
     * @param {function} pCallback
     */
    GJAPI.DataStoreFetch = (iStore, sKey, pCallback) => {
      GJAPI.SendRequest("/data-store/?key=" + sKey, iStore, pCallback);
    };

    /**
     * Send update-data request
     * @param {number} iStore
     * @param {string} sKey
     * @param {string} sOperation
     * @param {string} sValue
     * @param {function} pCallback
     */
    GJAPI.DataStoreUpdate = (iStore, sKey, sOperation, sValue, pCallback) => {
      GJAPI.SendRequest(
        "/data-store/update/?key=" +
          sKey +
          "&operation=" +
          sOperation +
          "&value=" +
          sValue,
        iStore,
        pCallback
      );
    };

    /**
     * Send remove-data request
     * @param {number} iStore
     * @param {string} sKey
     * @param {function} pCallback
     */
    GJAPI.DataStoreRemove = (iStore, sKey, pCallback) => {
      // send remove-data request
      GJAPI.SendRequest("/data-store/remove/?key=" + sKey, iStore, pCallback);
    };

    /**
     * Send get-keys request
     * @param {number} iStore
     * @param {function} pCallback
     */
    GJAPI.DataStoreGetKeys = (iStore, pCallback) => {
      GJAPI.SendRequest("/data-store/get-keys/", iStore, pCallback);
    };

    /**
     * Create asynchronous request
     * @param {string} sUrl
     * @param {string} sBodyData
     * @param {function} pCallback
     */
    function __CreateAjax(sUrl, sBodyData, pCallback) {
      if (typeof sBodyData !== "string") sBodyData = "";

      Scratch.canFetch(sUrl).then((allowed) => {
        if (!allowed) {
          pCallback(GJAPI.err.get("noFetch"));
          return;
        }

        // canFetch() checked above
        // eslint-disable-next-line extension/no-xmlhttprequest
        var pRequest = new XMLHttpRequest();

        // bind callback function
        pRequest.onreadystatechange = () => {
          if (pRequest.readyState === 4) pCallback(pRequest.responseText);
        };

        // send off the request
        if (sBodyData !== "") {
          pRequest.open("POST", sUrl);
          pRequest.setRequestHeader(
            "Content-Type",
            "application/x-www-form-urlencoded"
          );
          pRequest.send(sBodyData);
        } else {
          pRequest.open("GET", sUrl);
          pRequest.send();
        }
      });
    }

    GJAPI.BETTER_THAN = true;
    GJAPI.WORSE_THAN = false;
    GJAPI.FETCH_USERNAME = true;
    GJAPI.FETCH_ID = false;
    GJAPI.FETCH_ALL = true;
    GJAPI.FETCH_SINGLE = false;

    /**
     * @param {function} pCallback
     */
    GJAPI.TimeFetch = (pCallback) => {
      GJAPI.SendRequest(
        "/time/?game_id=" + GJAPI.iGameID,
        GJAPI.SEND_GENERAL,
        pCallback
      );
    };
    /**
     * @param {function} pCallback
     */
    GJAPI.FriendsFetch = (pCallback) => {
      if (!GJAPI.bLoggedIn) {
        GJAPI.LogTrace("FriendsFetch() failed: no user logged in");
        pCallback(GJAPI.err.get("noLogin"));
        return;
      }
      GJAPI.SendRequest(
        "/friends/?game_id=" +
          GJAPI.iGameID +
          "&username=" +
          GJAPI.sUserName +
          "&user_token=" +
          GJAPI.sUserToken,
        GJAPI.SEND_FOR_USER,
        pCallback
      );
    };
    /**
     * @param {number} iTrophyID
     * @param {function} pCallback
     */
    GJAPI.TrophyRemove = (iTrophyID, pCallback) => {
      if (!GJAPI.bLoggedIn) {
        GJAPI.LogTrace(
          "TrophyRemove(" + iTrophyID + ") failed: no user logged in"
        );
        pCallback(GJAPI.err.get("noLogin"));
        return;
      }
      // Check if the trophy is not achieved
      if (!GJAPI.abTrophyCache[iTrophyID]) {
        pCallback(GJAPI.err.get("Trophy already achieved."));
        return;
      }
      GJAPI.SendRequest(
        "/trophies/remove-achieved/?game_id=" +
          GJAPI.iGameID +
          "&username=" +
          GJAPI.sUserName +
          "&user_token=" +
          GJAPI.sUserToken +
          "&trophy_id=" +
          iTrophyID,
        GJAPI.SEND_FOR_USER,
        (pResponse) => {
          // Update trophy status if the response succeded
          if (pResponse.success == "true") {
            GJAPI.abTrophyCache[iTrophyID] = false;
          }
          if (typeof pCallback == "function") {
            pCallback(pResponse);
          }
        }
      );
    };

    /**
     * @param {number} iScoreTableID
     * @param {number} iScoreValue
     * @param {function} pCallback
     */
    GJAPI.ScoreGetRank = (iScoreTableID, iScoreValue, pCallback) => {
      GJAPI.SendRequest(
        "/scores/get-rank/?game_id=" +
          GJAPI.iGameID +
          "&sort=" +
          iScoreValue +
          "&table_id=" +
          iScoreTableID,
        GJAPI.SEND_GENERAL,
        pCallback
      );
    };

    /**
     * @param {function} pCallback
     */
    GJAPI.ScoreGetTables = (pCallback) => {
      GJAPI.SendRequest(
        "/scores/tables/?game_id=" + GJAPI.iGameID,
        GJAPI.SEND_GENERAL,
        pCallback
      );
    };

    /**
     * @param {function} pCallback
     */
    GJAPI.SessionCheck = (pCallback) => {
      GJAPI.SendRequest(
        "/sessions/check/?game_id=" +
          GJAPI.iGameID +
          "&username=" +
          GJAPI.sUserName +
          "&user_token=" +
          GJAPI.sUserToken,
        GJAPI.SEND_GENERAL,
        pCallback
      );
    };

    /**
     * SessionOpen and SessionClose combined
     * @param {boolean} bIsOpen
     * @param {function} pCallback
     */
    GJAPI.SessionSetStatus = (bIsOpen, pCallback) => {
      if (!GJAPI.bLoggedIn) {
        GJAPI.LogTrace(
          "SessionSetStatus(" + bIsOpen + ") failed: no user logged in"
        );
        pCallback(GJAPI.err.get("noLogin"));
        return;
      }
      GJAPI.bSessionActive = bIsOpen;
      if (bIsOpen) {
        if (GJAPI.iSessionHandle) {
          pCallback({ success: true });
          return;
        }
        GJAPI.SendRequest(
          "/sessions/open/",
          GJAPI.SEND_FOR_USER,
          function (pResponse) {
            if (pResponse.success == "true") {
              GJAPI.iSessionHandle = window.setInterval(
                GJAPI.SessionPing,
                30000
              );
              window.addEventListener(
                "beforeunload",
                GJAPI.SessionClose,
                false
              );
            }
          }
        );
        if (typeof pCallback == "function") pCallback({ success: true });
        return;
      }
      if (GJAPI.iSessionHandle) {
        window.clearInterval(GJAPI.iSessionHandle);
        window.removeEventListener("beforeunload", GJAPI.SessionClose);
        GJAPI.iSessionHandle = 0;
      }
      GJAPI.SendRequest("/sessions/close/", GJAPI.SEND_FOR_USER, pCallback);
    };

    /**
     * UserFetchName and UserFetchID combined
     * Use GJAPI.FETCH_USERNAME and GJAPI.FETCH_ID for better code readability
     * @param {boolean} bIsUsername
     * @param {string} sValue
     * @param {function} pCallback
     */
    GJAPI.UserFetchComb = (bIsUsername, sValue, pCallback) => {
      GJAPI.SendRequest(
        "/users/" + (bIsUsername ? "?username=" : "?user_id=") + sValue,
        GJAPI.SEND_GENERAL,
        pCallback
      );
    };

    /**
     * ScoreFetch but with better_than and worse_than parameters
     * Use GJAPI.BETTER_THAN and GJAPI.WORSE_THAN for better code readability
     * If value is set to 0 it will work like riginal ScoreFetch
     * @param {number} iScoreTableID
     * @param {boolean} bOnlyUser
     * @param {number} iLimit
     * @param {boolean} bBetterOrWorse
     * @param {number} iValue
     * @param {function} pCallback
     */
    GJAPI.ScoreFetchEx = (
      iScoreTableID,
      bOnlyUser,
      iLimit,
      bBetterOrWorse,
      iValue,
      pCallback
    ) => {
      if (!GJAPI.bLoggedIn && bOnlyUser) {
        GJAPI.LogTrace(
          "ScoreFetch(" +
            iScoreTableID +
            ", " +
            bOnlyUser +
            ", " +
            iLimit +
            ", " +
            bBetterOrWorse +
            ", " +
            iValue +
            ") failed: no user logged in"
        );
        pCallback(GJAPI.err.get("noLogin"));
        return;
      }
      var bFetchAll = bOnlyUser == GJAPI.SCORE_ONLY_USER ? false : true;
      GJAPI.SendRequest(
        "/scores/" +
          "?limit=" +
          iLimit +
          (iScoreTableID ? "&table_id=" + iScoreTableID : "") +
          (bBetterOrWorse ? "&better_than=" : "&worse_than=") +
          iValue,
        bFetchAll ? GJAPI.SEND_GENERAL : GJAPI.SEND_FOR_USER,
        pCallback
      );
    };

    /**
     * Unused in the extension because of ScoreFetchGuestEx
     * @param {number} iScoreTableID
     * @param {string} sName
     * @param {number} iLimit
     * @param {function} pCallback
     */
    GJAPI.ScoreFetchGuest = (iScoreTableID, sName, iLimit, pCallback) => {
      GJAPI.SendRequest(
        "/scores/?limit=" +
          iLimit +
          (iScoreTableID ? "&table_id=" + iScoreTableID : "") +
          "&guest=" +
          sName,
        GJAPI.SEND_GENERAL,
        pCallback
      );
    };

    /**
     * ScoreFetchGuest but with better_than and worse_than parameters
     * Use GJAPI.BETTER_THAN and GJAPI.WORSE_THAN for better code readability
     * If value is set to 0 it will work like original ScoreFetchGuest
     * @param {number} iScoreTableID
     * @param {string} sName
     * @param {number} iLimit
     * @param {boolean} bBetterOrWorse
     * @param {number} iValue
     * @param {function} pCallback
     */
    GJAPI.ScoreFetchGuestEx = (
      iScoreTableID,
      sName,
      iLimit,
      bBetterOrWorse,
      iValue,
      pCallback
    ) => {
      GJAPI.SendRequest(
        "/scores/?limit=" +
          iLimit +
          (iScoreTableID ? "&table_id=" + iScoreTableID : "") +
          "&guest=" +
          sName +
          (bBetterOrWorse ? "&better_than=" : "&worse_than=") +
          iValue,
        GJAPI.SEND_GENERAL,
        pCallback
      );
    };

    /**
     * TrophyFetch and TrophyFetchSingle combined
     * Use GJAPI.FETCH_ALL and GJAPI.FETCH_SINGLE for better code readability
     * @param {boolean} bIsAll
     * @param {number} iValue
     * @param {function} pCallback
     */
    GJAPI.TrophyFetchComb = (bIsAll, iValue, pCallback) => {
      if (!GJAPI.bLoggedIn) {
        GJAPI.LogTrace(
          "TrophyFetchComb(" +
            bIsAll +
            ", " +
            iValue +
            ") failed: no user logged in"
        );
        pCallback(GJAPI.err.get("noLogin"));
        return;
      }
      if (bIsAll) {
        var sTrophyData =
          iValue === GJAPI.TROPHY_ALL
            ? ""
            : "?achieved=" +
              (iValue >= GJAPI.TROPHY_ONLY_ACHIEVED ? "true" : "false");
        GJAPI.SendRequest(
          "/trophies/" + sTrophyData,
          GJAPI.SEND_FOR_USER,
          pCallback
        );
        return;
      }
      GJAPI.SendRequest(
        "/trophies/?trophy_id=" + iValue,
        GJAPI.SEND_FOR_USER,
        pCallback
      );
    };

    /**
     * Modified UserLoginManual to login users automatically if their username and token are detected
     * @param {function} pCallback
     */
    GJAPI.UserLoginAuto = (pCallback) => {
      if (!GJAPI.bOnGJ) {
        GJAPI.LogTrace("UserLoginAuto() failed: No username or token detected");
        pCallback(GJAPI.err.get("No username or token detected."));
        return;
      }
      if (GJAPI.bLoggedIn) {
        GJAPI.LogTrace(
          "UserLoginAuto() failed: user " +
            GJAPI.sUserName +
            " already logged in"
        );
        pCallback(GJAPI.err.get("login"));
        return;
      }
      GJAPI.SendRequest(
        "/users/auth/" +
          "?username=" +
          GJAPI.asQueryParam["gjapi_username"] +
          "&user_token=" +
          GJAPI.asQueryParam["gjapi_token"],
        GJAPI.SEND_GENERAL,
        (pResponse) => {
          if (pResponse.success == "true") {
            GJAPI.bLoggedIn = true;
            GJAPI.sUserName = GJAPI.asQueryParam["gjapi_username"];
            GJAPI.sUserToken = GJAPI.asQueryParam["gjapi_token"];
            GJAPI.SessionOpen();
          }
          if (typeof pCallback === "function") {
            pCallback(pResponse);
          }
        }
      );
    };

    /**
     * DataStoreGetKeys but with a pattern parameter
     * The placeholder character for patterns is *
     * @param {number} iStore
     * @param {string} sPattern
     * @param {function} pCallback
     */
    GJAPI.DataStoreGetKeysEx = (iStore, sPattern, pCallback) => {
      GJAPI.SendRequest(
        "/data-store/get-keys/?pattern=" + sPattern,
        iStore,
        pCallback
      );
    };

    GJAPI.SEQUENTIALLY = "sequentially";
    GJAPI.BREAK_ON_ERROR = "break_on_error";
    GJAPI.PARALLEL = "parallel";

    /**
     * @param {string[]} sRequests
     * @param {string} sParam
     * @param {function} pCallback
     */
    GJAPI.SendBatchRequest = (sRequests, sParam, pCallback) => {
      if (!sRequests) {
        pCallback(GJAPI.err.get("No requests found."));
        return;
      }
      let sFinalURL = GJAPI.sAPI + "/batch?game_id=" + GJAPI.iGameID;
      for (let i = 0; i < sRequests.length; i++) {
        sFinalURL +=
          "&requests[]=" +
          encodeURIComponent(
            encodeURI(sRequests[i]) +
              "&signature=" +
              md5(sRequests[i] + GJAPI.sGameKey)
          );
      }
      switch (sParam) {
        case "break_on_error":
          sFinalURL += "&break_on_error=true";
          break;
        case "parallel":
          sFinalURL += "&parallel=true";
          break;
        case "sequentially": // request is processed sequentially by default
        default:
          break;
      }
      sFinalURL += "&format=json";
      sFinalURL += "&signature=" + md5(sFinalURL + GJAPI.sGameKey);

      __CreateAjax(sFinalURL, "", (sResponse) => {
        console.info(GJAPI.sLogName + " <" + sFinalURL + "> " + sResponse);
        pCallback(JSON.parse(sResponse).response);
      });
    };

    return GJAPI;
  })();

  /**
   * Used for storing API error messages
   */
  let err = {
    debug: true,

    noLogin: "No user logged in.",
    noData: "Data not found.",
    noIndex: "Data at such index not found.",

    /**
     * Used for returning a standartized error message
     * @param {string} code
     */
    get: (code) =>
      err.debug
        ? err[code]
          ? "Error: " + err[code]
          : "Error: Data not found."
        : "",

    /**
     * Used for returning a standartized error message
     * @param {string} text
     */
    show: (text) => (err.debug ? "Error: " + text : ""),
  };

  /**
   * Used for storing API response objects
   */
  let data = {};

  /**
   * The API response object's success property is a string and not a boolean
   * So there is stuff like "pResponse.success == trueStr"
   */
  const trueStr = "true";

  /*!
   * GameJolt icon by GameJolt
   * Other icons by softed
   * Can be used outside of this extension
   */
  const icons = {
    debug:
      "data:image/png;base64,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",
    GameJolt:
      "data:image/png;base64,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",
    main: "data:image/png;base64,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",
    user: "data:image/png;base64,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",
    trophy:
      "data:image/png;base64,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",
    score:
      "data:image/png;base64,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",
    store:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAAC0CAYAAAA9zQYyAAAAAXNSR0IArs4c6QAABVJJREFUeF7t3d1t20AQRWGrIwMpKQXEJaiEpICUFCAdMZBebAT6WcJDz/Lyy6uJ2Z1zz44oKZJOL/4hEETgFNSLVhB4ITQJoggQOipOzRCaA1EECB0Vp2YIzYEoAoSOilMzhOZAFAFCR8WpmWGhl2VZ4EKgi8DpdBpydeiiSxOE7orSuhcChOZBFAFCR8WpGUJzIIoAoaPi1AyhORBFgNBRcWqG0ByIIkDoqDg10yb06/kNfQSGCfw9/xy6ltBDmFzUTYDQ3QlYv5QAoUtxKtZNgNDdCVi/lAChS3Eq1k2A0N0JWL+UAKFLcSrWTYDQ3QlYv5QAoUtxKtZNgNDdCVi/lAChS3Eq1k2A0N0JWL+UAKFLcSrWTYDQ3QlYv5QAoUtxKtZNgNDdCVi/lAChS3Eq1k2A0N0JWL+UAKFLcSrWTYDQ3QlYv5QAoUtxKtZNgNDdCVi/lAChS3Eq1k2A0N0JWL+UAKFLcSrWTYDQ3QlYv5QAoUtxKtZNgNDdCVi/lAChS3Eq1k1geqH/vIz9Utz3848hlr/Pv4auU+82ptn5EfqO3oQm9IXA2Dhd8cObJvRtsRy421xMaBP6SiDlgBCa0IR+8KzKLYcD0npATGgCtgpY/aoJoQlNaLcc7wSqJ4x6n3tVx4Q2oU3or5zQQ2/ruQiBlQTafqdw5T5djsAQAUIPYXLRXggQei9J2ecQAUIPYXLRXggQei9J2ecQAUIPYXLRXggQei9J2ecQAUIPYXLRXggQei9J2ecQgTahX89vQxt0EQIXAtP/Xw5CE3UNAUKvoeXa6QkQevqIbHANAUKvoeXa6QkQevqIbHANAUKvoeXa6QkQevqIbHANAUKvoeXa6QkQevqIbHANgemF9t12t+NM+equ6k+5E/rO8SfMbTDVAlbXIzShrwRSDjChCU3oBzfpvqzRAWk9ICY0AVsFdA9NwCgBCU1oQj+453XL4YBEHRBCE5rQX/kqx+hHsKrvxdTb5zuU316WoXfKp/+QLAH3KWD1GzqEvnOeHZB9HhBCE/pKIOUAE5rQhPak8J1A9T2gerftGn0EMaFNaBPahDahn702NjpRqx+RTGgT2oQ2oU1oE/o/AsuyDL2lM/qZwmeA/f0YBKa/5SD0MUSs6pLQVSTVmYIAoaeIwSaqCBC6iqQ6UxAg9BQx2EQVAUJXkVRnCgKEniIGm6giQOgqkupMQYDQU8RgE1UEphe6qlF1EPhIoO0zhWJAYAsChN6CqpptBAjdht7CWxAg9BZU1WwjQOg29BbeggCht6CqZhsBQreht/AWBAi9BVU12wgQug29hbcg0Ca0bx+9HWfX1wRUf+1Adb3p3/omNKEvBEYPMKHvPJ6NAqyeMOp97gATmtBXAikHmNCEJvSDZ53lP7zpHvpzD8FHu4UxoU1oE9qEfidwtAk4e78mtAltQpvQJvSzd++6XjWZfkL7ssZn6vj7RwKE5kMUAUJHxakZQnMgigCho+LUDKE5EEWA0FFxaobQHIgiQOioODVDaA5EESB0VJyaITQHoggQOipOzRCaA1EECB0Vp2YIzYEoAoSOilMzhOZAFAFCR8WpGUJzIIoAoaPi1AyhORBFgNBRcWqG0ByIIkDoqDg1Q2gORBEgdFScmiE0B6IIEDoqTs0QmgNRBKYXOoq2ZqYh0PbDm9MQsJEoAoSOilMzhOZAFAFCR8WpGUJzIIoAoaPi1AyhORBFgNBRcWqG0ByIIlAudBQdzcQSOMV2prFDEiD0IWPPbZrQudkesjNCHzL23KYJnZvtITsj9CFjz22a0LnZHrIzQh8y9tymCZ2b7SE7+wcob7kPY5BclgAAAABJRU5ErkJggg==",
    time: "data:image/png;base64,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",
    batch:
      "data:image/png;base64,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",
  };

  const docs = "https://extensions.turbowarp.org/gamejolt";

  /**
   * Mostly visual stuff for Scratch GUI
   * The loader only uses getInfo().id and other methods
   */
  class GameJoltAPI {
    getInfo() {
      return {
        id: "GameJoltAPI",
        // eslint-disable-next-line extension/should-translate
        name: "Game Jolt API",
        color1: "#2F7F6F",
        color2: "#2A2731",
        color3: "#CCFF00",
        menuIconURI: icons.GameJolt,
        docsURI: docs,
        blocks: [
          {
            opcode: "gamejoltBool",
            blockIconURI: icons.GameJolt,
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate({
              id: "GameJoltAPI_gamejoltBool",
              default: "on game jolt?",
              description: 'Keep "game jolt" as is.',
            }),
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Session Blocks"),
          },
          {
            opcode: "setGame",
            blockIconURI: icons.main,
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "set game ID to [ID] and private key to [key]"
            ),
            arguments: {
              ID: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              key: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("private key"),
              },
            },
          },
          {
            opcode: "session",
            blockIconURI: icons.main,
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("[openOrClose] session"),
            arguments: {
              openOrClose: {
                type: Scratch.ArgumentType.STRING,
                menu: "openOrClose",

                /**
                 * Default value also has to be a string
                 * Or else it wouldn't display the menu item correctly
                 * Even if values match
                 */
                defaultValue: "true",
              },
            },
          },
          {
            opcode: "sessionPing",
            blockIconURI: icons.main,
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("ping session"),
          },
          {
            opcode: "sessionSetStatus",
            blockIconURI: icons.main,
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set session status to [status]"),
            arguments: {
              status: {
                type: Scratch.ArgumentType.STRING,
                menu: "status",
                defaultValue: "active",
              },
            },
          },
          {
            opcode: "sessionBool",
            blockIconURI: icons.main,
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("session open?"),
            disableMonitor: true,
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("user Blocks"),
          },
          {
            opcode: "loginManual",
            blockIconURI: icons.user,
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("login with [username] and [token]"),
            arguments: {
              username: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("username"),
              },
              token: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("private token"),
              },
            },
          },
          {
            opcode: "loginAuto",
            blockIconURI: icons.user,
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("login automatically"),
          },
          {
            opcode: "loginAutoBool",
            blockIconURI: icons.user,
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("auto login available?"),
          },
          {
            opcode: "logout",
            blockIconURI: icons.user,
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("logout"),
          },
          {
            opcode: "loginBool",
            blockIconURI: icons.user,
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("logged in?"),
          },
          {
            opcode: "loginUser",
            blockIconURI: icons.user,
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("logged in user's username"),
          },
          {
            opcode: "userFetch",
            blockIconURI: icons.user,
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "fetch user's [usernameOrID] by [fetchType]"
            ),
            arguments: {
              usernameOrID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("username"),
              },
              fetchType: {
                type: Scratch.ArgumentType.STRING,
                menu: "fetchTypes",
                defaultValue: String(GameJolt.FETCH_USERNAME),
              },
            },
          },
          {
            opcode: "userFetchCurrent",
            blockIconURI: icons.user,
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("fetch logged in user"),
          },
          {
            opcode: "returnUserData",
            blockIconURI: icons.user,
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("fetched user's [userDataType]"),
            arguments: {
              userDataType: {
                type: Scratch.ArgumentType.STRING,
                menu: "userDataTypes",
                defaultValue: "id",
              },
            },
          },
          {
            opcode: "returnUserDataJson",
            blockIconURI: icons.user,
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("fetched user's data in JSON"),
          },
          {
            hideFromPalette: true,
            opcode: "friendsFetch",
            blockIconURI: icons.user,
            blockType: Scratch.BlockType.REPORTER,
            // eslint-disable-next-line extension/should-translate -- deprecated
            text: "fetched user's friend ID at index[index] (Deprecated)",
            arguments: {
              index: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
            },
          },
          {
            opcode: "friendsFetchNew",
            blockIconURI: icons.user,
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("fetch user's friend IDs"),
          },
          {
            opcode: "friendsReturn",
            blockIconURI: icons.user,
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("fetched user's friend ID at index[index]"),
            arguments: {
              index: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
            },
          },
          {
            opcode: "friendsReturnJson",
            blockIconURI: icons.user,
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("fetched user's friend IDs in JSON"),
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Trophy Blocks"),
          },
          {
            opcode: "trophyAchieve",
            blockIconURI: icons.trophy,
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("achieve trophy of ID [ID]"),
            arguments: {
              ID: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
            },
          },
          {
            opcode: "trophyRemove",
            blockIconURI: icons.trophy,
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("remove trophy of ID [ID]"),
            arguments: {
              ID: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
            },
          },
          {
            hideFromPalette: true,
            opcode: "trophyFetch",
            blockIconURI: icons.trophy,
            blockType: Scratch.BlockType.REPORTER,
            // eslint-disable-next-line extension/should-translate -- deprecated
            text: "fetched trophy [trophyDataType] at [indexOrID][value] (Deprecated)",
            arguments: {
              trophyDataType: {
                type: Scratch.ArgumentType.STRING,
                menu: "trophyDataTypes",
                defaultValue: "id",
              },
              indexOrID: {
                type: Scratch.ArgumentType.STRING,
                menu: "indexOrID",
                defaultValue: String(GameJolt.FETCH_ALL),
              },
              value: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
            },
          },
          {
            opcode: "trophyFetchId",
            blockIconURI: icons.trophy,
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("fetch trophy of ID[ID]"),
            arguments: {
              ID: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
            },
          },
          {
            opcode: "trophyFetchAll",
            blockIconURI: icons.trophy,
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("fetch [trophyFetchGroup] trophies"),
            arguments: {
              trophyFetchGroup: {
                type: Scratch.ArgumentType.STRING,
                menu: "trophyFetchGroup",
                defaultValue: "0",
              },
            },
          },
          {
            opcode: "trophyReturn",
            blockIconURI: icons.trophy,
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate(
              "fetched trophy [trophyDataType] at index [index]"
            ),
            arguments: {
              trophyDataType: {
                type: Scratch.ArgumentType.STRING,
                menu: "trophyDataTypes",
                defaultValue: "id",
              },
              index: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
            },
          },
          {
            opcode: "trophyReturnJson",
            blockIconURI: icons.trophy,
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("fetched trophies in JSON"),
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Score Blocks"),
          },
          {
            opcode: "scoreAdd",
            blockIconURI: icons.score,
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "add score [value] in table of ID [ID] with text [text] and comment [extraData]"
            ),
            arguments: {
              ID: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              value: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
              text: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("1 point"),
              },
              extraData: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("optional"),
              },
            },
          },
          {
            opcode: "scoreAddGuest",
            blockIconURI: icons.score,
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "add [username] score [value] in table of ID [ID] with text [text] and comment [extraData]"
            ),
            arguments: {
              ID: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              value: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
              text: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("1 point"),
              },
              extraData: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("optional"),
              },
              username: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("guest"),
              },
            },
          },
          {
            opcode: "scoreFetchSimple",
            blockIconURI: icons.score,
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "fetch [amount] [globalOrPerUser] score/s in table of ID [ID]"
            ),
            arguments: {
              amount: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
              globalOrPerUser: {
                type: Scratch.ArgumentType.STRING,
                menu: "globalOrPerUser",
                defaultValue: "false",
              },
              ID: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
            },
          },
          {
            opcode: "scoreFetch",
            blockIconURI: icons.score,
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "fetch [amount] [globalOrPerUser] score/s [betterOrWorse] than [value] in table of ID [ID]"
            ),
            arguments: {
              amount: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
              globalOrPerUser: {
                type: Scratch.ArgumentType.STRING,
                menu: "globalOrPerUser",
                defaultValue: "false",
              },
              betterOrWorse: {
                type: Scratch.ArgumentType.STRING,
                menu: "betterOrWorse",
                defaultValue: "true",
              },
              value: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
              ID: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
            },
          },
          {
            opcode: "scoreFetchGuestSimple",
            blockIconURI: icons.score,
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "fetch [amount] [username] score/s in table of ID [ID]"
            ),
            arguments: {
              amount: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
              username: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("guest"),
              },
              ID: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
            },
          },
          {
            opcode: "scoreFetchGuest",
            blockIconURI: icons.score,
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "fetch [amount] [username] score/s [betterOrWorse] than [value] in table of ID [ID]"
            ),
            arguments: {
              amount: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
              username: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("guest"),
              },
              betterOrWorse: {
                type: Scratch.ArgumentType.STRING,
                menu: "betterOrWorse",
                defaultValue: "true",
              },
              value: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
              ID: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
            },
          },
          {
            opcode: "returnScoreData",
            blockIconURI: icons.score,
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate(
              "fetched score [scoreDataType] at index [index]"
            ),
            arguments: {
              scoreDataType: {
                type: Scratch.ArgumentType.STRING,
                menu: "scoreDataTypes",
                defaultValue: "sort",
              },
              index: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
            },
          },
          {
            opcode: "returnScoreDataJson",
            blockIconURI: icons.score,
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("fetched score data in JSON"),
          },
          {
            opcode: "scoreGetRank",
            blockIconURI: icons.score,
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate(
              "fetched rank of [value] in table of ID [ID]"
            ),
            arguments: {
              value: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
              ID: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
            },
          },
          {
            hideFromPalette: true,
            opcode: "scoreGetTables",
            blockIconURI: icons.score,
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate(
              "fetched table [tableDataType] at index[index] (Deprecated)"
            ),
            arguments: {
              tableDataType: {
                type: Scratch.ArgumentType.STRING,
                menu: "tableDataTypes",
                defaultValue: "id",
              },
              index: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
            },
          },
          {
            opcode: "scoreFetchTables",
            blockIconURI: icons.score,
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("fetch score tables"),
          },
          {
            opcode: "scoreReturnTables",
            blockIconURI: icons.score,
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate(
              "fetched table [tableDataType] at index [index]"
            ),
            arguments: {
              tableDataType: {
                type: Scratch.ArgumentType.STRING,
                menu: "tableDataTypes",
                defaultValue: "id",
              },
              index: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
            },
          },
          {
            opcode: "scoreReturnTablesJson",
            blockIconURI: icons.score,
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("fetched tables in JSON"),
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Data Storage Blocks"),
          },
          {
            opcode: "dataStoreSet",
            blockIconURI: icons.store,
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "set [globalOrPerUser] data at [key] to [data]"
            ),
            arguments: {
              globalOrPerUser: {
                type: Scratch.ArgumentType.STRING,
                menu: "globalOrPerUser",
                defaultValue: "false",
              },
              key: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("key"),
              },
              data: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("data"),
              },
            },
          },
          {
            opcode: "dataStoreFetch",
            blockIconURI: icons.store,
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("fetched [globalOrPerUser] data at [key]"),
            arguments: {
              globalOrPerUser: {
                type: Scratch.ArgumentType.STRING,
                menu: "globalOrPerUser",
                defaultValue: "false",
              },
              key: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("key"),
              },
            },
          },
          {
            opcode: "dataStoreUpdate",
            blockIconURI: icons.store,
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "update [globalOrPerUser] data at [key] by [operationType] [value]"
            ),
            arguments: {
              globalOrPerUser: {
                type: Scratch.ArgumentType.STRING,
                menu: "globalOrPerUser",
                defaultValue: "false",
              },
              key: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("key"),
              },
              operationType: {
                type: Scratch.ArgumentType.STRING,
                menu: "operationTypes",
                defaultValue: "add",
              },
              value: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "1",
              },
            },
          },
          {
            opcode: "dataStoreRemove",
            blockIconURI: icons.store,
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("remove [globalOrPerUser] data at [key]"),
            arguments: {
              globalOrPerUser: {
                type: Scratch.ArgumentType.STRING,
                menu: "globalOrPerUser",
                defaultValue: "false",
              },
              key: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("key"),
              },
            },
          },
          {
            hideFromPalette: true,
            opcode: "dataStoreGetKey",
            blockIconURI: icons.store,
            blockType: Scratch.BlockType.REPORTER,
            // eslint-disable-next-line extension/should-translate -- deprecated
            text: "fetched [globalOrPerUser] keys with pattern [pattern] at index [index] (Deprecated)",
            arguments: {
              globalOrPerUser: {
                type: Scratch.ArgumentType.STRING,
                menu: "globalOrPerUser",
                defaultValue: "false",
              },
              pattern: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "*",
              },
              index: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
            },
          },
          {
            opcode: "dataStoreFetchKeys",
            blockIconURI: icons.store,
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("fetch all [globalOrPerUser] keys"),
            arguments: {
              globalOrPerUser: {
                type: Scratch.ArgumentType.STRING,
                menu: "globalOrPerUser",
                defaultValue: "false",
              },
            },
          },
          {
            opcode: "dataStoreFetchPatternKeys",
            blockIconURI: icons.store,
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "fetch [globalOrPerUser] keys matching with [pattern]"
            ),
            arguments: {
              globalOrPerUser: {
                type: Scratch.ArgumentType.STRING,
                menu: "globalOrPerUser",
                defaultValue: "false",
              },
              pattern: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "*",
              },
            },
          },
          {
            opcode: "dataStoreReturnKeys",
            blockIconURI: icons.store,
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("fetched key at index [index]"),
            arguments: {
              index: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
            },
          },
          {
            opcode: "dataStoreReturnKeysJson",
            blockIconURI: icons.store,
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("fetched keys in JSON"),
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Time Blocks"),
          },
          {
            hideFromPalette: true,
            opcode: "timeFetch",
            blockIconURI: icons.time,
            blockType: Scratch.BlockType.REPORTER,
            // eslint-disable-next-line extension/should-translate -- deprecated
            text: "server's current [timeType] (Deprecated)",
            arguments: {
              timeType: {
                type: Scratch.ArgumentType.STRING,
                menu: "timeTypes",
                defaultValue: "timestamp",
              },
            },
          },
          {
            opcode: "timeFetchNew",
            blockIconURI: icons.time,
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("fetch server's time"),
          },
          {
            opcode: "timeReturn",
            blockIconURI: icons.time,
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("fetched server's [timeType]"),
            arguments: {
              timeType: {
                type: Scratch.ArgumentType.STRING,
                menu: "timeTypes",
                defaultValue: "timestamp",
              },
            },
          },
          {
            opcode: "timeReturnJson",
            blockIconURI: icons.time,
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("fetched server's time in JSON"),
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Batch Blocks"),
          },
          {
            opcode: "batchAdd",
            blockIconURI: icons.batch,
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "add [namespace] request with [parameters] to batch"
            ),
            arguments: {
              namespace: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "data-store/set",
              },
              parameters: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '{"key":"key","data":"data"}',
              },
            },
          },
          {
            opcode: "batchClear",
            blockIconURI: icons.batch,
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("clear batch"),
          },
          {
            opcode: "batchJson",
            blockIconURI: icons.batch,
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("batch in JSON"),
          },
          {
            opcode: "batchCall",
            blockIconURI: icons.batch,
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("fetch batch [parameter]"),
            arguments: {
              parameter: {
                type: Scratch.ArgumentType.STRING,
                menu: "batchParameters",
                defaultValue: "sequentially",
              },
            },
          },
          {
            opcode: "batchReturnJson",
            blockIconURI: icons.batch,
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("fetched batch data in JSON"),
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Debug Blocks"),
          },
          {
            opcode: "debug",
            blockIconURI: icons.debug,
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("turn debug mode [toggle]"),
            arguments: {
              toggle: {
                type: Scratch.ArgumentType.STRING,
                menu: "debug",
                defaultValue: "",
              },
            },
          },
          {
            opcode: "debugBool",
            blockIconURI: icons.debug,
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("in debug mode?"),
          },
          {
            opcode: "debugLastErr",
            blockIconURI: icons.debug,
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("last API error"),
          },
        ],
        menus: {
          debug: {
            items: [
              { text: Scratch.translate("on"), value: "true" },
              { text: Scratch.translate("off"), value: "" },
            ],
          },
          status: {
            items: [
              { text: Scratch.translate("active"), value: "active" },
              { text: Scratch.translate("idle"), value: "idle" },
            ],
          },
          fetchTypes: {
            items: [
              { text: Scratch.translate("username"), value: "true" },
              { text: Scratch.translate("ID"), value: "" },
            ],
          },
          userDataTypes: {
            items: [
              { text: Scratch.translate("ID"), value: "id" },
              { text: Scratch.translate("username"), value: "username" },
              {
                text: Scratch.translate("developer username"),
                value: "developer_name",
              },
              {
                text: Scratch.translate("description"),
                value: "developer_description",
              },
              { text: Scratch.translate("status"), value: "status" },
              { text: Scratch.translate("type"), value: "type" },
              { text: Scratch.translate("avatar URL"), value: "avatar_url" },
              { text: Scratch.translate("website"), value: "website" },
              { text: Scratch.translate("sign up date"), value: "signed_up" },
              {
                text: Scratch.translate("sign up timestamp"),
                value: "signed_up_timestamp",
              },
              {
                text: Scratch.translate("last login"),
                value: "last_logged_in",
              },
              {
                text: Scratch.translate("last login timestamp"),
                value: "last_logged_in_timestamp",
              },
            ],
          },
          operationTypes: {
            items: [
              { text: Scratch.translate("adding"), value: "add" },
              { text: Scratch.translate("subtracting"), value: "subtract" },
              { text: Scratch.translate("multiplying by"), value: "multiply" },
              { text: Scratch.translate("dividing by"), value: "divide" },
              { text: Scratch.translate("appending"), value: "append" },
              { text: Scratch.translate("prepending"), value: "prepend" },
            ],
          },
          scoreDataTypes: {
            items: [
              { text: Scratch.translate("value"), value: "sort" },
              { text: Scratch.translate("text"), value: "score" },
              { text: Scratch.translate("comment"), value: "extra_data" },
              { text: Scratch.translate("username"), value: "user" },
              { text: Scratch.translate("user ID"), value: "user_id" },
              { text: Scratch.translate("score date"), value: "stored" },
              {
                text: Scratch.translate("score timestamp"),
                value: "stored_timestamp",
              },
            ],
          },
          trophyDataTypes: {
            items: [
              { text: Scratch.translate("ID"), value: "id" },
              { text: Scratch.translate("title"), value: "title" },
              { text: Scratch.translate("description"), value: "description" },
              { text: Scratch.translate("difficulty"), value: "difficulty" },
              { text: Scratch.translate("image URL"), value: "image_url" },
              {
                text: Scratch.translate("achievement date"),
                value: "achieved",
              },
            ],
          },
          timeTypes: {
            items: [
              { text: Scratch.translate("timestamp"), value: "timestamp" },
              { text: Scratch.translate("timezone"), value: "timezone" },
              { text: Scratch.translate("year"), value: "year" },
              { text: Scratch.translate("month"), value: "month" },
              { text: Scratch.translate("day"), value: "day" },
              { text: Scratch.translate("hour"), value: "hour" },
              { text: Scratch.translate("minute"), value: "minute" },
              { text: Scratch.translate("second"), value: "second" },
            ],
          },
          tableDataTypes: {
            items: [
              { text: Scratch.translate("ID"), value: "id" },
              { text: Scratch.translate("name"), value: "name" },
              { text: Scratch.translate("description"), value: "description" },
              { text: Scratch.translate("primary"), value: "primary" },
            ],
          },
          openOrClose: {
            items: [
              { text: Scratch.translate("Open"), value: "true" },
              { text: Scratch.translate("Close"), value: "" },
            ],
          },
          globalOrPerUser: {
            items: [
              { text: Scratch.translate("global"), value: "false" },
              { text: Scratch.translate("user"), value: "true" },
            ],
          },
          trophyFetchGroup: {
            items: [
              { text: Scratch.translate("all"), value: "0" },
              { text: Scratch.translate("all achieved"), value: "1" },
              { text: Scratch.translate("all unachieved"), value: "-1" },
            ],
          },
          indexOrID: {
            items: [
              { text: Scratch.translate("index"), value: "true" },
              { text: Scratch.translate("ID"), value: "" },
            ],
          },
          betterOrWorse: {
            items: [
              { text: Scratch.translate("better"), value: "true" },
              { text: Scratch.translate("worse"), value: "" },
            ],
          },
          batchParameters: {
            items: [
              {
                text: Scratch.translate("sequentially"),
                value: "sequentially",
              },
              {
                text: Scratch.translate("sequentially, break on error"),
                value: "break_on_error",
              },
              { text: Scratch.translate("in parallel"), value: "parallel" },
            ],
          },
        },
      };
    }
    debug({ toggle }) {
      err.debug = toggle == trueStr;
    }
    debugBool() {
      return err.debug;
    }
    debugLastErr() {
      return err.last ? "Error: " + err.last : "";
    }
    gamejoltBool() {
      return GameJolt.bOnGJ;
    }
    setGame({ ID, key }) {
      GameJolt.iGameID = ID;
      GameJolt.sGameKey = key;
    }
    session({ openOrClose }) {
      return new Promise((resolve) =>
        GameJolt.SessionSetStatus(openOrClose, (pResponse) => {
          if (pResponse.success != trueStr) err.last = pResponse.message;
          resolve();
        })
      );
    }

    /**
     * Not necessary since the library handles pinging for you
     */
    sessionPing() {
      return new Promise((resolve) =>
        GameJolt.SessionPing((pResponse) => {
          if (pResponse.success != trueStr) err.last = pResponse.message;
          resolve();
        })
      );
    }
    sessionSetStatus({ status }) {
      GameJolt.sStatus = status;
    }
    sessionBool() {
      return new Promise((resolve) =>
        GameJolt.SessionCheck((pResponse) =>
          resolve(pResponse.success == trueStr)
        )
      );
    }

    /**
     * Not necessary since the library handles logging in for you
     */
    loginManual({ username, token }) {
      return new Promise((resolve) =>
        GameJolt.UserLoginManual(username, token, (pResponse) => {
          if (pResponse.success != trueStr)
            [err.user, err.last] = [pResponse.message, pResponse.message];
          resolve();
        })
      );
    }

    /**
     * Not necessary since the library handles logging in for you
     */
    loginAuto() {
      return new Promise((resolve) =>
        GameJolt.UserLoginAuto((pResponse) => {
          if (pResponse.success != trueStr)
            [err.user, err.last] = [pResponse.message, pResponse.message];
          resolve();
        })
      );
    }
    loginAutoBool() {
      return Boolean(GameJolt.asQueryParam["gjapi_username"]);
    }
    logout() {
      return new Promise((resolve) =>
        GameJolt.UserLogout((pResponse) => {
          if (pResponse.success != trueStr)
            [err.user, err.last] = [pResponse.message, pResponse.message];
          resolve();
        })
      );
    }
    loginBool() {
      return GameJolt.bLoggedIn;
    }
    loginUser() {
      return GameJolt.sUserName || err.get("noLogin");
    }
    userFetch({ fetchType, usernameOrID }) {
      return new Promise((resolve) =>
        GameJolt.UserFetchComb(fetchType, usernameOrID, (pResponse) => {
          if (pResponse.success != trueStr) {
            [err.user, err.last] = [pResponse.message, pResponse.message];
            data.user = undefined;
            resolve();
            return;
          }
          data.user = pResponse.users[0];
          err.user = undefined;
          resolve();
        })
      );
    }
    userFetchCurrent() {
      return new Promise((resolve) =>
        GameJolt.UserFetchCurrent((pResponse) => {
          if (pResponse.success != trueStr) {
            [err.user, err.last] = [pResponse.message, pResponse.message];
            data.user = undefined;
            resolve();
            return;
          }
          data.user = pResponse.users[0];
          err.user = undefined;
          resolve();
        })
      );
    }
    returnUserData({ userDataType }) {
      if (!data.user) return err.get("user");
      return data.user[userDataType] || err.get("noData");
    }
    returnUserDataJson() {
      return JSON.stringify(data.user) || err.get("user") || "{}";
    }
    friendsFetch({ index }) {
      if (!GameJolt.bLoggedIn) return err.get("noLogin");
      GameJolt.FriendsFetch((pResponse) => {
        if (pResponse.success != trueStr) {
          err.friends = pResponse.message;
          return;
        }
        data.friends = pResponse.friends;
      });
      if (!data.friends) return err.get("friends");
      if (!data.friends[index]) return err.get("noIndex");
      return data.friends[index].friend_id || err.get("noData");
    }
    friendsFetchNew() {
      return new Promise((resolve) =>
        GameJolt.FriendsFetch((pResponse) => {
          if (pResponse.success != trueStr) {
            [err.friends, err.last] = [pResponse.message, pResponse.message];
            data.friends = undefined;
            resolve();
            return;
          }
          data.friends = pResponse.friends;
          err.friends = undefined;
          resolve();
        })
      );
    }
    friendsReturn({ index }) {
      if (!data.friends) return err.get("friends");
      if (!data.friends[Math.floor(index)]) return err.get("noIndex");
      return data.friends[Math.floor(index)].friend_id || err.get("noData");
    }
    friendsReturnJson() {
      return JSON.stringify(data.friends) || err.get("friends") || "{}";
    }
    trophyAchieve({ ID }) {
      return new Promise((resolve) =>
        GameJolt.TrophyAchieve(ID, (pResponse) => {
          if (pResponse.success != trueStr)
            [err.trophies, err.last] = [pResponse.message, pResponse.message];
          resolve();
        })
      );
    }
    trophyRemove({ ID }) {
      return new Promise((resolve) =>
        GameJolt.TrophyRemove(ID, (pResponse) => {
          if (pResponse.success != trueStr)
            [err.trophies, err.last] = [pResponse.message, pResponse.message];
          resolve();
        })
      );
    }
    trophyFetch({ indexOrID, value, trophyDataType }) {
      if (!GameJolt.bLoggedIn) return err.get("noLogin");
      GameJolt.TrophyFetchComb(
        indexOrID,
        indexOrID ? GameJolt.TROPHY_ALL : value,
        (pResponse) => {
          if (pResponse.success != trueStr) {
            err.trophies = pResponse.message;
            return;
          }
          data.trophies = indexOrID
            ? pResponse.trophies
            : pResponse.trophies[0];
        }
      );
      if (!data.trophies) return err.get("trophies");
      if (indexOrID) {
        if (!data.trophies[value]) return err.get("noIndex");
        return data.trophies[value][trophyDataType] || err.get("noData");
      }
      return data.trophies[trophyDataType] || err.get("noData");
    }
    trophyFetchAll({ trophyFetchGroup }) {
      return new Promise((resolve) =>
        GameJolt.TrophyFetch(Number(trophyFetchGroup), (pResponse) => {
          if (pResponse.success != trueStr) {
            [err.trophies, err.last] = [pResponse.message, pResponse.message];
            data.trophies = undefined;
            resolve();
            return;
          }
          data.trophies = pResponse.trophies;
          err.trophies = undefined;
          resolve();
        })
      );
    }
    trophyFetchId({ ID }) {
      return new Promise((resolve) =>
        GameJolt.TrophyFetchSingle(ID, (pResponse) => {
          if (pResponse.success != trueStr) {
            [err.trophies, err.last] = [pResponse.message, pResponse.message];
            data.trophies = undefined;
            resolve();
            return;
          }
          data.trophies = pResponse.trophies;
          err.trophies = undefined;
          resolve();
        })
      );
    }
    trophyReturn({ trophyDataType, index }) {
      if (!data.trophies) return err.get("trophies");
      if (!data.trophies[Math.floor(index)]) return err.get("noIndex");
      return (
        data.trophies[Math.floor(index)][trophyDataType] || err.get("noData")
      );
    }
    trophyReturnJson() {
      return JSON.stringify(data.trophies) || err.get("trophies") || "{}";
    }
    scoreAdd({ ID, value, text, extraData }) {
      return new Promise((resolve) =>
        GameJolt.ScoreAdd(ID, value, text, extraData, (pResponse) => {
          if (pResponse.success != trueStr) err.last = pResponse.message;
          resolve();
        })
      );
    }
    scoreAddGuest({ ID, value, text, username, extraData }) {
      return new Promise((resolve) =>
        GameJolt.ScoreAddGuest(
          ID,
          value,
          text,
          username,
          extraData,
          (pResponse) => {
            if (pResponse.success != trueStr) err.last = pResponse.message;
            resolve();
          }
        )
      );
    }
    scoreFetchSimple({ amount, globalOrPerUser, ID }) {
      if (globalOrPerUser == trueStr && !GameJolt.bLoggedIn) {
        err.scores = err.noLogin;
        data.scores = undefined;
        return;
      }
      return new Promise((resolve) =>
        GameJolt.ScoreFetch(
          ID,
          globalOrPerUser == trueStr
            ? GameJolt.SCORE_ONLY_USER
            : GameJolt.SCORE_ALL,
          amount,
          (pResponse) => {
            if (pResponse.success != trueStr) {
              [err.scores, err.last] = [pResponse.message, pResponse.message];
              data.scores = undefined;
              resolve();
              return;
            }
            data.scores = pResponse.scores;
            err.scores = undefined;
            resolve();
          }
        )
      );
    }
    scoreFetch({ globalOrPerUser, ID, amount, betterOrWorse, value }) {
      if (globalOrPerUser == trueStr && !GameJolt.bLoggedIn) {
        err.scores = err.noLogin;
        data.scores = undefined;
        return;
      }
      return new Promise((resolve) =>
        GameJolt.ScoreFetchEx(
          ID,
          globalOrPerUser == trueStr
            ? GameJolt.SCORE_ONLY_USER
            : GameJolt.SCORE_ALL,
          amount,
          betterOrWorse,
          value,
          (pResponse) => {
            if (pResponse.success != trueStr) {
              [err.scores, err.last] = [pResponse.message, pResponse.message];
              data.scores = undefined;
              resolve();
              return;
            }
            data.scores = pResponse.scores;
            err.scores = undefined;
            resolve();
          }
        )
      );
    }
    scoreFetchGuestSimple({ amount, username, ID }) {
      return new Promise((resolve) =>
        GameJolt.ScoreFetchGuestEx(ID, username, amount, (pResponse) => {
          if (pResponse.success != trueStr) {
            [err.scores, err.last] = [pResponse.message, pResponse.message];
            data.scores = undefined;
            resolve();
            return;
          }
          data.scores = pResponse.scores;
          err.scores = undefined;
          resolve();
        })
      );
    }
    scoreFetchGuest({ ID, username, amount, betterOrWorse, value }) {
      return new Promise((resolve) =>
        GameJolt.ScoreFetchGuestEx(
          ID,
          username,
          amount,
          betterOrWorse,
          value,
          (pResponse) => {
            if (pResponse.success != trueStr) {
              [err.scores, err.last] = [pResponse.message, pResponse.message];
              data.scores = undefined;
              resolve();
              return;
            }
            data.scores = pResponse.scores;
            err.scores = undefined;
            resolve();
          }
        )
      );
    }
    returnScoreData({ index, scoreDataType }) {
      if (!data.scores) return err.get("scores");
      if (!data.scores[index]) return err.get("noIndex");
      if (scoreDataType == "user")
        return (
          data.scores[index].user ||
          data.scores[index].guest ||
          err.get("noData")
        );
      return data.scores[index][scoreDataType] || err.get("noData");
    }
    returnScoreDataJson() {
      return JSON.stringify(data.scores) || err.get("scores") || "{}";
    }
    scoreGetRank({ ID, value }) {
      return new Promise((resolve) =>
        GameJolt.ScoreGetRank(ID, value, (pResponse) => {
          if (pResponse.success != trueStr) {
            err.last = pResponse.message;
            resolve(err.get("last"));
            return;
          }
          resolve(pResponse.rank);
        })
      );
    }
    scoreGetTables({ index, tableDataType }) {
      GameJolt.ScoreGetTables((pResponse) => {
        if (pResponse.success != trueStr) {
          err.tables = pResponse.message;
          return;
        }
        data.tables = pResponse.tables;
      });
      if (!data.tables) return err.get("tables");
      if (!data.tables[index]) return err.get("noIndex");
      return data.tables[index][tableDataType] || err.get("noData");
    }
    scoreFetchTables() {
      return new Promise((resolve) =>
        GameJolt.ScoreGetTables((pResponse) => {
          if (pResponse.success != trueStr) {
            [err.tables, err.last] = [pResponse.message, pResponse.message];
            data.tables = undefined;
            resolve();
            return;
          }
          data.tables = pResponse.tables;
          err.tables = undefined;
          resolve();
        })
      );
    }
    scoreReturnTables({ tableDataType, index }) {
      if (!data.tables) return err.get("tables");
      if (!data.tables[Math.floor(index)]) return err.get("noIndex");
      return (
        !data.tables[Math.floor(index)][tableDataType] || err.get("noData")
      );
    }
    scoreReturnTablesJson() {
      return JSON.stringify(data.tables) || err.get("tables") || "{}";
    }
    dataStoreSet({ globalOrPerUser, key, data }) {
      return new Promise((resolve) =>
        GameJolt.DataStoreSet(
          globalOrPerUser == trueStr,
          key,
          data,
          (pResponse) => {
            if (pResponse.success != trueStr) err.last = pResponse.message;
            resolve();
          }
        )
      );
    }
    dataStoreFetch({ globalOrPerUser, key }) {
      if (globalOrPerUser == trueStr && !GameJolt.bLoggedIn)
        return err.get("noLogin");
      return new Promise((resolve) =>
        GameJolt.DataStoreFetch(
          globalOrPerUser == trueStr,
          key,
          (pResponse) => {
            if (pResponse.success != trueStr) {
              err.last = pResponse.message;
              resolve(err.get("last"));
              return;
            }
            resolve(pResponse.data);
          }
        )
      );
    }
    dataStoreUpdate({ globalOrPerUser, key, operationType, value }) {
      return new Promise((resolve) =>
        GameJolt.DataStoreUpdate(
          globalOrPerUser == trueStr,
          key,
          operationType,
          value,
          (pResponse) => {
            if (pResponse.success != trueStr) {
              err.last = pResponse.message;
            }
            resolve();
          }
        )
      );
    }
    dataStoreRemove({ globalOrPerUser, key }) {
      return new Promise((resolve) =>
        GameJolt.DataStoreRemove(
          globalOrPerUser == trueStr,
          key,
          (pResponse) => {
            if (pResponse.success != trueStr) {
              err.last = pResponse.message;
            }
            resolve();
          }
        )
      );
    }
    dataStoreGetKey({ globalOrPerUser, pattern, index }) {
      if (globalOrPerUser == trueStr && !GameJolt.bLoggedIn)
        return err.get("noLogin");
      GameJolt.DataStoreGetKeysEx(
        globalOrPerUser == trueStr,
        pattern,
        (pResponse) => {
          if (pResponse.success != trueStr) {
            err.keys = pResponse.message;
            data.keys = undefined;
            return;
          }
          if (!pResponse.keys) {
            err.keys = err.noIndex;
            data.keys = undefined;
            return;
          }
          data.keys = pResponse.keys;
        }
      );
      if (!data.keys) return err.get("keys");
      if (!data.keys[index]) return err.get("noIndex");
      return data.keys[index].key || err.get("noData");
    }
    dataStoreFetchKeys({ globalOrPerUser }) {
      return new Promise((resolve) =>
        GameJolt.DataStoreGetKeys(globalOrPerUser == trueStr, (pResponse) => {
          if (pResponse.success != trueStr) {
            [err.keys, err.last] = [pResponse.message, pResponse.message];
            data.keys = undefined;
            resolve();
            return;
          }
          if (!pResponse.keys) {
            data.keys = undefined;
            err.keys = err.noIndex;
            resolve();
            return;
          }
          data.keys = pResponse.keys;
          err.keys = undefined;
          resolve();
        })
      );
    }
    dataStoreFetchPatternKeys({ globalOrPerUser, pattern }) {
      return new Promise((resolve) =>
        GameJolt.DataStoreGetKeysEx(
          globalOrPerUser == trueStr,
          pattern,
          (pResponse) => {
            if (pResponse.success != trueStr) {
              [err.keys, err.last] = [pResponse.message, pResponse.message];
              data.keys = undefined;
              resolve();
              return;
            }
            if (!pResponse.keys) {
              data.keys = undefined;
              err.keys = err.noIndex;
              resolve();
              return;
            }
            data.keys = pResponse.keys;
            err.keys = undefined;
            resolve();
          }
        )
      );
    }
    dataStoreReturnKeys({ index }) {
      if (!data.keys) return err.get("keys");
      if (!data.keys[Math.floor(index)]) return err.get("noIndex");
      return data.keys[Math.floor(index)].key || err.get("noData");
    }
    dataStoreReturnKeysJson() {
      return JSON.stringify(data.keys) || err.get("keys") || "{}";
    }
    timeFetch({ timeType }) {
      return new Promise((resolve) =>
        GameJolt.TimeFetch((pResponse) => {
          if (pResponse.success != trueStr) {
            err.last = pResponse.message;
            resolve(err.get("last"));
          }
          resolve(pResponse[timeType]);
        })
      );
    }
    timeFetchNew() {
      return new Promise((resolve) =>
        GameJolt.TimeFetch((pResponse) => {
          if (pResponse.success != trueStr) {
            [err.time, err.last] = [pResponse.message, pResponse.message];
            data.time = undefined;
            resolve();
            return;
          }
          data.time = pResponse;
          data.time.success = undefined;
          data.time.message = undefined;
          err.time = undefined;
          resolve();
        })
      );
    }
    timeReturn({ timeType }) {
      if (!data.time) return err.get("time");
      return data.time[timeType] || err.get("noData");
    }
    timeReturnJson() {
      return JSON.stringify(data.time) || err.get("time") || "{}";
    }
    batchAdd({ namespace, parameters }) {
      if (!data.batchRequests) data.batchRequests = [];
      try {
        data.batchRequests.push({
          namespace: namespace,
          parameters: JSON.parse(parameters),
        });
      } catch (err) {
        data.batchRequests.push({
          namespace: namespace,
          parameters: {},
        });
      }
    }
    batchClear() {
      data.batchRequests = undefined;
    }
    batchJson() {
      return JSON.stringify(data.batchRequests) || err.get("noData") || "{}";
    }
    batchCall({ parameter }) {
      return new Promise((resolve) =>
        GameJolt.SendBatchRequest(
          data.batchRequests.map(
            (I) =>
              `/${I.namespace
                .split("/")
                .map((i) => encodeURIComponent(i))
                .join("/")}/` +
              `?game_id=${GameJolt.iGameID}` +
              `&${new URLSearchParams(I.parameters).toString()}`
          ),
          parameter,
          (pResponse) => {
            if (pResponse.success != trueStr) {
              [err.batch, err.last] = [pResponse.message, pResponse.message];
              data.batch = undefined;
              resolve();
              return;
            }
            data.batch = pResponse.responses;
            err.batch = undefined;
            resolve();
          }
        )
      );
    }
    batchReturnJson() {
      return JSON.stringify(data.batch) || err.get("batch") || "{}";
    }
  }
  Scratch.extensions.register(new GameJoltAPI());
})(Scratch);
