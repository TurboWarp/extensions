// Name: Newgrounds
// ID: NGIO
// Description: Blocks that allow games to interact with the Newgrounds API. Unofficial.
// By: ObviousAlexC <https://scratch.mit.edu/users/pinksheep2917/>

(function (Scratch) {
  "use strict";

  /*!
    The following code is from NewgroundsIO-JS
    The original code is available at https://github.com/PsychoGoldfishNG/NewgroundsIO-JS
  
    We use it under the following license:
  
    MIT License
    Copyright (c) 2022 PsychoGoldfishNG
  
    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:
  
    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.
  
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
    */
  /* eslint-disable */

  //Newgrounds.io JS library taken from https://github.com/PsychoGoldfishNG/NewgroundsIO-JS/blob/main/dist/NewgroundsIO.js the official Github for Newgrounds.io

  /* ====================== ./NewgroundsIO-JS/src/NGIO.js ====================== */

  /** Start Class NGIO **/

  /**
   * NGIO singleton wrapper for NewgroundsIO Library.
   */
  class NGIO {
    /* ================================ Constants ================================= */

    // preloading statuses

    /**
     * @type {string}
     */
    static get STATUS_INITIALIZED() {
      return "initialized";
    }

    /**
     * @type {string}
     */
    static get STATUS_CHECKING_LOCAL_VERSION() {
      return "checking-local-version";
    }

    /**
     * @type {string}
     */
    static get STATUS_LOCAL_VERSION_CHECKED() {
      return "local-version-checked";
    }

    /**
     * @type {string}
     */
    static get STATUS_PRELOADING_ITEMS() {
      return "preloading-items";
    }

    /**
     * @type {string}
     */
    static get STATUS_ITEMS_PRELOADED() {
      return "items-preloaded";
    }

    /**
     * @type {string}
     */
    static get STATUS_READY() {
      return "ready";
    }

    // aliases from SessionState

    /**
     * @type {string}
     */
    static get STATUS_SESSION_UNINITIALIZED() {
      return NewgroundsIO.SessionState.SESSION_UNINITIALIZED;
    }

    /**
     * @type {string}
     */
    static get STATUS_WAITING_FOR_SERVER() {
      return NewgroundsIO.SessionState.WAITING_FOR_SERVER;
    }

    /**
     * @type {string}
     */
    static get STATUS_LOGIN_REQUIRED() {
      return NewgroundsIO.SessionState.LOGIN_REQUIRED;
    }

    /**
     * @type {string}
     */
    static get STATUS_WAITING_FOR_USER() {
      return NewgroundsIO.SessionState.WAITING_FOR_USER;
    }

    /**
     * @type {string}
     */
    static get STATUS_LOGIN_CANCELLED() {
      return NewgroundsIO.SessionState.LOGIN_CANCELLED;
    }

    /**
     * @type {string}
     */
    static get STATUS_LOGIN_SUCCESSFUL() {
      return NewgroundsIO.SessionState.LOGIN_SUCCESSFUL;
    }

    /**
     * @type {string}
     */
    static get STATUS_LOGIN_FAILED() {
      return NewgroundsIO.SessionState.LOGIN_FAILED;
    }

    /**
     * @type {string}
     */
    static get STATUS_USER_LOGGED_OUT() {
      return NewgroundsIO.SessionState.USER_LOGGED_OUT;
    }

    /**
     * @type {string}
     */
    static get STATUS_SERVER_UNAVAILABLE() {
      return NewgroundsIO.SessionState.SERVER_UNAVAILABLE;
    }

    /**
     * @type {string}
     */
    static get STATUS_EXCEEDED_MAX_ATTEMPTS() {
      return NewgroundsIO.SessionState.EXCEEDED_MAX_ATTEMPTS;
    }

    /**
     * Will be true if the current connection status is one requiring a 'please wait' message
     * @type {boolean}
     */
    static get isWaitingStatus() {
      return (
        NewgroundsIO.SessionState.SESSION_WAITING.indexOf(
          this.#lastConnectionStatus
        ) >= 0 ||
        [
          this.STATUS_PRELOADING_ITEMS,
          this.LOCAL_VERSION_CHECKED,
          this.STATUS_CHECKING_LOCAL_VERSION,
        ].indexOf(this.#lastConnectionStatus) >= 0
      );
    }

    // scoreboard periods

    /**
     * @type {string}
     */
    static get PERIOD_TODAY() {
      return "D";
    }

    /**
     * @type {string}
     */
    static get PERIOD_CURRENT_WEEK() {
      return "W";
    }

    /**
     * @type {string}
     */
    static get PERIOD_CURRENT_MONTH() {
      return "M";
    }

    /**
     * @type {string}
     */
    static get PERIOD_CURRENT_YEAR() {
      return "Y";
    }

    /**
     * @type {string}
     */
    static get PERIOD_ALL_TIME() {
      return "A";
    }

    /**
     * @type {Array.<string>}
     */
    static get PERIODS() {
      return [
        NGIO.PERIOD_TODAY,
        NGIO.PERIOD_CURRENT_WEEK,
        NGIO.PERIOD_CURRENT_MONTH,
        NGIO.PERIOD_CURRENT_YEAR,
        NGIO.PERIOD_ALL_TIME,
      ];
    }

    /* ============================= Public Properties ============================ */

    /**
     * A reference to the NewgroundsIO.Core instance created in Init().
     * @type {NewgroundsIO.Core}
     */
    static get ngioCore() {
      return this.#ngioCore;
    }
    static #ngioCore = null;

    /*
     * The user's overall Newgrounds medal score
     * @type {number}
     */
    static get medalScore() {
      return this.#medalScore;
    }
    static #medalScore = -1;

    /**
     * An array of preloaded medals
     * @type {Array.<NewgroundsIO.objects.Medal>}
     */
    static get medals() {
      return this.#medals;
    }
    static #medals = null;

    /**
     * An array of preloaded scoreBoards
     * @type {Array.<NewgroundsIO.objects.ScoreBoard>}
     */
    static get scoreBoards() {
      return this.#scoreBoards;
    }
    static #scoreBoards = null;

    /**
     * An array of preloaded saveSlots
     * @type {Array.<NewgroundsIO.objects.SaveSlot>}
     */
    static get saveSlots() {
      return this.#saveSlots;
    }
    static #saveSlots = null;

    /**
     * The last time a component or queue was executed
     * @type {Date}
     */
    static get lastExecution() {
      return this.#lastExecution;
    }
    static #lastExecution = new Date();

    /**
     * Contains the last connection status. Value will be one of the STATUS_XXXXX constants.
     * @type {string}
     */
    static get lastConnectionStatus() {
      return this.#lastConnectionStatus;
    }
    static #lastConnectionStatus = new Date();

    /**
     * Will be null unless there was an error in our session.
     * @type {NewgroundsIO.objects.Error}
     */
    static get sessionError() {
      return this.#sessionError;
    }
    static #sessionError = null;

    /**
     * Will be set to false if the local copy of the game is being hosted illegally.
     * @type {boolean}
     */
    static get legalHost() {
      return this.#legalHost;
    }
    static #legalHost = true;

    /**
     * Will be set to true if this is an out-of-date copy of the game.
     * @type {boolean}
     */
    static get isDeprecated() {
      return this.#isDeprecated;
    }
    static #isDeprecated = true;

    /**
     * This is the version number(string) of the newest available copy of the game.
     * @type {boolean}
     */
    static get newestVersion() {
      return this.#newestVersion;
    }
    static #newestVersion = true;

    /**
     * Will be true if the user opened the login page via OpenLoginPage().
     * @type {boolean}
     */
    static get loginPageOpen() {
      return this.#loginPageOpen;
    }
    static #loginPageOpen = false;

    /**
     * The current version of the Newgrounds.io gateway.
     * @type {string}
     */
    static get gatewayVersion() {
      return this.#gatewayVersion;
    }
    static #gatewayVersion = true;

    /**
     * Stores the last medal that was unlocked.
     * @type {NewgroundsIO.objects.Medal}
     */
    static get lastMedalUnlocked() {
      return this.#lastMedalUnlocked;
    }
    static #lastMedalUnlocked = true;

    /**
     * Stores the last scoreboard that was posted to.
     * @type {NewgroundsIO.objects.ScoreBoard}
     */
    static get lastBoardPosted() {
      return this.#lastBoardPosted;
    }
    static #lastBoardPosted = true;

    /**
     * Stores the last score that was posted to.
     * @type {NewgroundsIO.objects.Score}
     */
    static get lastScorePosted() {
      return this.#lastScorePosted;
    }
    static #lastScorePosted = true;

    /**
     * Stores the last scores that were loaded.
     * @type {NewgroundsIO.results.ScoreBoard.getScores}
     */
    static get lastGetScoresResult() {
      return this.#lastGetScoresResult;
    }
    static #lastGetScoresResult = true;

    /**
     * Stores the last saveSlot that had data loaded.
     * @type {NewgroundsIO.objects.SaveSlot}
     */
    static get lastSaveSlotLoaded() {
      return this.#lastSaveSlotLoaded;
    }
    static #lastSaveSlotLoaded = true;

    /**
     * Stores the last saveSlot that had data saved.
     * @type {NewgroundsIO.objects.SaveSlot}
     */
    static get lastSaveSlotSaved() {
      return this.#lastSaveSlotSaved;
    }
    static #lastSaveSlotSaved = true;

    /**
     * Stores the last DateTime that was loaded from the API.
     * @type {string}
     */
    static get lastDateTime() {
      return this.#lastDateTime;
    }
    static #lastDateTime = "0000-00-00";

    /**
     * Stores the last event that was logged.
     * @type {string}
     */
    static get lastLoggedEvent() {
      return this.#lastLoggedEvent;
    }
    static #lastLoggedEvent = null;

    /**
     * Stores the last unix timestamp that was loaded API.
     * @type {number}
     */
    static get lastTimeStamp() {
      return this.#lastTimeStamp;
    }
    static #lastTimeStamp = 0;

    /**
     * Stores wether the last server ping succeeded.
     * @type {boolean}
     */
    static get lastPingSuccess() {
      return this.#lastPingSuccess;
    }
    static #lastPingSuccess = true;

    /**
     * Will be true if we've called Init().
     * @type {boolean}
     */
    static get isInitialized() {
      return this.ngioCore !== null;
    }

    /**
     * Contains all information about the current user session.
     * @type {NewgroundsIO.objects.Session}
     */
    static get session() {
      return this.isInitialized ? this.ngioCore.session : null;
    }

    /**
     * Contains user information if the user is logged in. Otherwise null.
     * @type {NewgroundsIO.objects.User}
     */
    static get user() {
      return this.session === null ? null : this.ngioCore.session.user;
    }

    /**
     * Returns true if we currently have a valid session ID.
     * @type {boolean}
     */
    static get hasSession() {
      return this.session !== null;
    }

    /**
     * Returns true if we currently have a valid session ID.
     * @type {boolean}
     */
    static get hasUser() {
      return this.user !== null;
    }

    /**
     * Will be true if we've finished logging in and preloading data.
     * @type {boolean}
     */
    static get isReady() {
      return this.#lastConnectionStatus === this.STATUS_READY;
    }

    /**
     * The version number passed in Init()'s options
     * @type {string}
     */
    static get version() {
      return this.#version;
    }
    static #version = "0.0.0";

    /**
     * Will be tue if using debugMode via Init()
     * @type {boolean}
     */
    static get debugMode() {
      return this.#debugMode;
    }
    static #debugMode = false;

    /* ============================= Private Properties ============================ */

    // Preloading flags
    static #preloadFlags = {
      autoLogNewView: false,
      preloadMedals: false,
      preloadScoreBoards: false,
      preloadSaveSlots: false,
    };

    // Connection states
    static #sessionReady = false;
    static #skipLogin = false;
    static #localVersionChecked = false;
    static #checkingConnectionStatus = false;

    /* ============================= Misc Public Methods ============================ */

    /**
     * Initializes the NGIO wrapper. You must call this BEFORE using any other methods!
     * @param {string} appID The App ID from your Newgrounds Project's "API Tools" page.
     * @param {string} aesKey The AES-128 encryption key from your Newgrounds Project's "API Tools" page.
     * @param {object} [options] An object of options to set up the API wrapper.
     * @param {string} [options.version] A string in "X.X.X" format indicating the current version of this game.
     * @param {boolean} [options.checkHostLicense] Set to true to check if the site hosting your game has been blocked.
     * @param {boolean} [options.preloadMedals] Set to true to preload medals (will show if the player has any unlocked, and get their current medal score).
     * @param {boolean} [options.preloadeScoreBoards] Set to true to preload Score Board information.
     * @param {boolean} [options.preloadeSaveSlots] Set to true to preload Save Slot information.
     * @param {boolean} [options.autoLogNewView] Set to true to automatcally log a new view to your stats.
     * @param {boolean} [options.debugMode] Set to true to run in debug mode.
     */
    static init(appID, aesKey, options) {
      if (!this.isInitialized) {
        this.#ngioCore = new NewgroundsIO.Core(appID, aesKey);

        this.#ngioCore.addEventListener("serverResponse", function (e) {
          NGIO.#onServerResponse(e);
        });

        if (options && typeof options === "object") {
          if (typeof options["version"] === "string")
            this.#version = options["version"];

          let preloadFlags = [
            "debugMode",
            "checkHostLicense",
            "autoLogNewView",
            "preloadMedals",
            "preloadScoreBoards",
            "preloadSaveSlots",
          ];

          for (let i = 0; i < preloadFlags.length; i++) {
            if (typeof options[preloadFlags[i]] !== "undefined")
              this.#preloadFlags[preloadFlags[i]] = options[preloadFlags[i]]
                ? true
                : false;
          }
        }

        this.#ngioCore.debug = this.debugMode;

        this.#lastConnectionStatus = this.STATUS_INITIALIZED;

        // auto-ping the server every 30 seconds once connected
        setTimeout(function () {
          NGIO.keepSessionAlive();
        }, 30000);
      }
    }

    /* ======================== Public Login/Session Methods ======================== */

    /**
     * Call this if you want to skip logging the user in.
     */
    static skipLogin() {
      if (!this.#sessionReady) this.#skipLogin = true;
    }

    /**
     * Opens the Newgrounds login page in a new browser tab.
     */
    static openLoginPage() {
      if (!this.#loginPageOpen) {
        this.#skipLogin = false;
        this.#sessionReady = false;
        this.#loginPageOpen = true;
        this.session.openLoginPage();
      } else {
        console.warn("loginPageOpen is true. Use CancelLogin to reset.");
      }
    }

    /**
     * If the user opened the NG login page, you can call this to cancel the login attempt.
     */
    static cancelLogin() {
      if (!this.session) {
        console.error("NGIO Error - Can't cancel non-existent session");
        return;
      }

      this.session.cancelLogin(NewgroundsIO.SessionState.SESSION_UNINITIALIZED);
      this.#resetConnectionStatus();
      this.skipLogin();
    }

    /**
     * Logs the current use out of the game (locally and on the server) and resets the connection status.
     */
    static logOut() {
      if (!this.session) {
        console.error("NGIO Error - Can't cancel non-existent session");
        return;
      }
      this.session.logOut(function () {
        this.#resetConnectionStatus();
        this.skipLogin();
      }, this);
    }

    /* ============================ Public Loader Methods =========================== */

    /**
     * Loads "Your Website URL", as defined on your App Settings page, in a new browser tab.
     */
    static loadAuthorUrl() {
      this.ngioCore.loadComponent(
        this.ngioCore.getComponent("Loader.loadAuthorUrl")
      );
    }

    /**
     * Loads our "Official Version URL", as defined on your App Settings page, in a new browser tab.
     */
    static loadOfficialUrl() {
      this.ngioCore.loadComponent(
        this.ngioCore.getComponent("Loader.loadOfficialUrl")
      );
    }

    /**
     * Loads the Games page on Newgrounds in a new browser tab.
     */
    static loadMoreGames() {
      this.ngioCore.loadComponent(
        this.ngioCore.getComponent("Loader.loadMoreGames")
      );
    }

    /**
     * Loads the Newgrounds frontpage in a new browser tab.
     */
    static loadNewgrounds() {
      this.ngioCore.loadComponent(
        this.ngioCore.getComponent("Loader.loadNewgrounds")
      );
    }

    /**
     * Loads the Newgrounds frontpage in a new browser tab.
     * @param {string} referralName The name of your custom referral.
     */
    static loadReferral(referralName) {
      this.ngioCore.loadComponent(
        this.ngioCore.getComponent("Loader.loadReferral", {
          referral_name: referralName,
        })
      );
    }

    /* ============================ Public Medal Methods ============================ */

    /**
     * Gets a preloaded Medal object.
     * @param {number} medalID The ID of the medal
     */
    static getMedal(medalID) {
      if (this.medals === null) {
        console.error(
          "NGIO Error: Can't use getMedal without setting preloadMedals option to true"
        );
        return null;
      }
      for (let i = 0; i < this.medals.length; i++) {
        if (this.medals[i].id === medalID) return this.medals[i];
      }
    }

    /**
     * @callback unlockMedalCallback
     * @param {NewgroundsIO.objects.Medal} medal
     */

    /**
     * Attempts to unlock a medal and returns the medal to an optional callback function when complete.
     * @param {number} medalID The id of the medal you are unlocking.
     * @param {unlockMedalCallback} [callback] A function to run when the medal has unlocked.
     * @param {object} [thisArg] An optional object to use as 'this' in your callback function.
     */
    static unlockMedal(medalID, callback, thisArg) {
      if (this.medals == null) {
        console.error("unlockMedal called without any preloaded medals.");
        if (typeof callback === "function")
          thisArg ? callback.call(thisArg, null) : callback(null);
        return;
      }

      let medal = this.getMedal(medalID);

      if (medal == null) {
        console.error("Medal #" + medalID + " does not exist.");
        if (typeof callback === "function")
          thisArg ? callback.call(thisArg, null) : callback(null);
        return;
      }

      medal.unlock(function () {
        if (typeof callback === "function")
          thisArg
            ? callback.call(thisArg, this.lastMedalUnlocked)
            : callback(this.lastMedalUnlocked);
      }, this);
    }

    /* ======================== Public getScoreBoard Methods ======================== */

    /**
     * Gets a preloaded ScoreBoard object.
     * @param {number} scoreBoardID The ID of the score board
     */
    static getScoreBoard(scoreBoardID) {
      if (this.scoreBoards === null) {
        console.error(
          "NGIO Error: Can't use getScoreBoard without setting preloadScoreBoards option to true"
        );
        return null;
      }
      for (let i = 0; i < this.scoreBoards.length; i++) {
        if (this.scoreBoards[i].id === scoreBoardID) return this.scoreBoards[i];
      }
    }

    /**
     * @callback postScoreCallback
     * @param {NewgroundsIO.objects.ScoreBoard} scoreBoard
     * @param {NewgroundsIO.objects.Score} score
     */

    /**
     * Posts a score and returns the score and scoreboard to an optional callback function when complete.
     * @param {number} boardID The id of the scoreboard you are posting to.
     * @param {number} value The integer value of your score.
     * @param {string} [tag] An optional tag to attach to the score (use null for no tag).
     * @param {postScoreCallback} [callback] A function to run when the score has posted.
     * @param {object} [thisArg] An optional object to use as 'this' in your callback function.
     */
    static postScore(boardID, value, tag, callback, thisArg) {
      // if not using a tag, 3rd and 4th params can be callback and thisArg
      if (typeof tag === "function") {
        thisArg = callback;
        callback = tag;
        tag = "";
      } else if (typeof tag === "undefined") {
        tag = "";
      }

      if (this.scoreBoards == null) {
        console.error(
          "NGIO Error - postScore called without any preloaded scoreboards."
        );
        if (typeof callback === "function")
          thisArg ? callback.call(thisArg, null, null) : callback(null, null);
        return;
      }
      var board = this.getScoreBoard(boardID);
      if (board == null) {
        console.error(
          "NGIO Error - ScoreBoard #" + boardID + " does not exist."
        );
        if (typeof callback === "function")
          thisArg ? callback.call(thisArg, null, null) : callback(null, null);
        return;
      }

      board.postScore(
        value,
        tag,
        function () {
          if (typeof callback === "function")
            thisArg
              ? callback.call(
                  thisArg,
                  this.lastBoardPosted,
                  this.lastScorePosted
                )
              : callback(this.lastBoardPosted, this.lastScorePosted);
        },
        this
      );
    }

    /**
     * @callback getScoresCallback
     * @param {NewgroundsIO.objects.ScoreBoard} scoreBoard
     * @param {NewgroundsIO.objects.Score} score
     * @param {object} options
     * @param {string} options.period
     * @param {string} options.tag
     * @param {boolean} options.social
     * @param {Number} options.skip
     * @param {Number} options.limit
     */

    /**
     * Gets the best scores for a board and returns the board, score list, period, tag and social bool to an optional callback.
     * @param {number} boardID The id of the scoreboard you loading from.
     * @param {object} [options] Any optional lookup options you want to use.
     * @param {string} [options.period=NGIO.PERIOD_TODAY] The time period to get scores from. Will match one of the PERIOD_XXXX constants.
     * @param {boolean} [options.social=false] Set to true to only get scores from the user's friends.
     * @param {Number} [options.skip=0] The number of scores to skip.
     * @param {Number} [options.limit=10] The total number of scores to load.
     * @param {string} [options.tag] An optional tag to filter results by (use null for no tag).
     * @param {getScoresCallback} [callback] A function to run when the scores have been loaded.
     * @param {object} [thisArg] An optional object to use as 'this' in your callback function.
     */
    static getScores(boardID, options, callback, thisArg) {
      let _options = {
        period:
          typeof options["period"] === "undefined"
            ? NGIO.PERIOD_TODAY
            : options["period"],
        tag: typeof options["tag"] !== "string" ? "" : options["tag"],
        social:
          typeof options["social"] === "undefined"
            ? false
            : options["social"]
            ? true
            : false,
        skip: typeof options["skip"] !== "number" ? 0 : options["skip"],
        limit: typeof options["limit"] !== "number" ? 10 : options["limit"],
      };

      if (this.scoreBoards == null) {
        console.error(
          "NGIO Error - getScores called without any preloaded scoreboards."
        );
        if (typeof callback === "function")
          thisArg
            ? callback.call(thisArg, null, null, _options)
            : callback(null, null, _options);
        return;
      }

      var board = this.getScoreBoard(boardID);

      if (board == null) {
        console.error(
          "NGIO Error - ScoreBoard #" + boardID + " does not exist."
        );
        if (typeof callback === "function")
          thisArg
            ? callback.call(thisArg, null, null, _options)
            : callback(null, null, _options);
        return;
      }

      board.getScores(
        _options,
        function () {
          if (typeof callback === "function")
            thisArg
              ? callback.call(
                  thisArg,
                  board,
                  this.lastGetScoresResult.scores,
                  _options
                )
              : callback(board, this.lastGetScoresResult.scores, _options);
        },
        this
      );
    }

    /* ======================== Public getSaveSlot Methods ======================== */

    /**
     * Gets a preloaded SaveSlot object. (Use getSaveSlotData to get actual save file)
     * @param {number} saveSlotID The desired slot number
     */
    static getSaveSlot(saveSlotID) {
      if (this.saveSlots === null) {
        console.error(
          "NGIO Error: Can't use getSaveSlot without setting preloadSaveSlots option to true"
        );
        return null;
      }
      for (let i = 0; i < this.saveSlots.length; i++) {
        if (this.saveSlots[i].id === saveSlotID) return this.saveSlots[i];
      }
    }

    /**
     * Gets the number of non-empty save slots.
     */
    static getTotalSaveSlots() {
      let total = 0;
      this.saveSlots.forEach((slot) => {
        if (slot.hasData) total++;
      });
      return total;
    }

    /**
     * @callback getSaveSlotDataCallback
     * @param {string} data
     */

    /**
     * Loads the actual save file from a save slot, and passes the string result to a callback function.
     * @param {number} slotID The slot number to load from
     * @param {getSaveSlotDataCallback} [callback] A function to run when the file has been loaded
     * @param {object} [thisArg] An optional object to use as 'this' in your callback function.
     */
    static getSaveSlotData(slotID, callback, thisArg) {
      if (this.saveSlots === null) {
        console.error(
          "getSaveSlotData data called without any preloaded save slots."
        );
        thisArg ? callback.call(thisArg, null) : callback(null);
      }

      let slot = this.getSaveSlot(slotID);
      this.#lastSaveSlotLoaded = slot;
      slot.getData(callback, thisArg);
    }

    /**
     * @callback setSaveSlotDataCallback
     * @param {NewgroundsIO.objects.SaveSlot} saveSlot
     */

    /**
     * Loads the actual save file from a save slot and returns the save slot to an optional callback function when complete.
     * @param {number} slotID The slot number to save to.
     * @param {string} data The (serialized) data you want to save.
     * @param {setSaveSlotDataCallback} [callback] An optional function to run when the file finished saving.
     * @param {object} [thisArg] An optional object to use as 'this' in your callback function.
     */
    static setSaveSlotData(slotID, data, callback, thisArg) {
      if (this.saveSlots == null) {
        console.error(
          "setSaveSlotData data called without any preloaded save slots."
        );
        if (typeof callback === "function")
          thisArg ? callback(thisArg, null) : callback(null);
        return;
      }

      var slot = this.getSaveSlot(slotID);
      if (slot == null) {
        console.error("Slot #" + slotID + " does not exist.");
        if (typeof callback === "function")
          thisArg ? callback(thisArg, null) : callback(null);
        return;
      }

      slot.setData(
        data,
        function () {
          if (typeof callback === "function")
            thisArg
              ? callback(thisArg, this.lastSaveSlotSaved)
              : callback(this.lastSaveSlotSaved);
        },
        this
      );
    }

    /* =========================== Public Event Methods ========================== */

    /**
     * @callback logEventCallback
     * @param {string} eventName
     */

    /**
     * Logs a custom event and returns the eventName to an optional callback function when complete.
     * @param {string} eventName The name of the event to log.
     * @param {logEventCallback} [callback] A function to run when the event has logged.
     * @param {object} [thisArg] An optional object to use as 'this' in your callback function.
     */
    static logEvent(eventName, callback, thisArg) {
      this.ngioCore.executeComponent(
        this.ngioCore.getComponent("Event.logEvent", { event_name: eventName }),
        function () {
          if (typeof callback === "function")
            thisArg
              ? callback(thisArg, this.lastLoggedEvent)
              : callback(this.lastLoggedEvent);
        },
        this
      );
    }

    /* ========================== Public Gateway Methods ========================= */

    /**
     * @callback getDateTimeCallback
     * @param {string} dateime
     * @param {number} timestamp
     */

    /**
     * Loads the current DateTime from the server and returns it to an optional callback function.
     * @param {getDateTimeCallback} [callback] A function to run when the datetime has loaded.
     * @param {object} [thisArg] An optional object to use as 'this' in your callback function.
     */
    static getDateTime(callback, thisArg) {
      this.ngioCore.executeComponent(
        this.ngioCore.getComponent("Gateway.getDatetime"),
        function () {
          if (typeof callback === "function")
            thisArg
              ? callback(thisArg, this.lastDateTime, this.lastTimeStamp)
              : callback(this.lastDateTime, this.lastTimeStamp);
        },
        this
      );
    }

    /* ========================= Public KeepAlive Methods ========================= */

    /**
     * Keeps your ssessions from expiring. Is called automatically.
     * This will only hit the server once every 30 seconds, no matter how often you call it.
     */
    static keepSessionAlive() {
      if (!this.hasUser) return;

      let elapsed = new Date() - this.#lastExecution;
      if (elapsed.Seconds >= 30000) {
        this.#lastExecution = new Date();
        this.ngioCore.executeComponent(
          this.ngioCore.getComponent("Gateway.ping")
        );
      }
    }

    /* ======================= Public Login/Preload Methods ====================== */

    /**
     * @callback getConnectionStatusCallback
     * @param {string} connectionStatus
     */

    /**
     * Intended to be called from your game loop, this does an entire process of things based on your Init() options:
     *  * Checks if the hosting site has a legal copy of this game
     *  * Checks for a newer version of the game
     *  * Makes sure you have a user session
     *  * Checks if the current user is logged in
     *  * Preloads Medals, Saveslots, etc
     *  * Logs a new view to your stats
     *
     * Whenever a new operation begins or ends, the current state will be passed to your callback function.
     * @param {getConnectionStatusCallback} [callback] A function to be called when there's a change of status. Will match one of the STATUS_XXXX constants.
     * @param {object} [thisArg] An optional object to use as 'this' in your callback function.
     */
    static getConnectionStatus(callback, thisArg) {
      let _this = this;
      if (
        this.#checkingConnectionStatus ||
        this.#lastConnectionStatus === null ||
        this.session == null
      )
        return;
      this.#checkingConnectionStatus = true;

      if (this.#lastConnectionStatus === this.STATUS_INITIALIZED) {
        this.#lastConnectionStatus = this.STATUS_CHECKING_LOCAL_VERSION;
        this.#reportConnectionStatus(callback, thisArg);

        this.#checkLocalVersion(callback, thisArg);
      } else if (!this.#sessionReady) {
        if (this.#skipLogin) {
          this.#updateSessionHandler(callback, thisArg);
        } else if (
          this.#lastConnectionStatus !== this.STATUS_CHECKING_LOCAL_VERSION
        ) {
          this.session.update(function () {
            this.#updateSessionHandler(callback, thisArg);
          }, this);
        }
      } else if (this.#lastConnectionStatus === this.STATUS_LOGIN_SUCCESSFUL) {
        this.#lastConnectionStatus = this.STATUS_PRELOADING_ITEMS;
        this.#reportConnectionStatus(callback, thisArg);

        this.#PreloadItems(function () {
          this.#reportConnectionStatus(callback, thisArg);
          this.#skipLogin = false;
        }, this);
      } else if (this.#lastConnectionStatus === this.STATUS_ITEMS_PRELOADED) {
        this.#loginPageOpen = false;
        this.#lastConnectionStatus = this.STATUS_READY;
        this.#reportConnectionStatus(callback, thisArg);

        this.#skipLogin = false;
      } else {
        this.keepSessionAlive();
      }

      this.#checkingConnectionStatus = false;
    }

    /* ===================== Private Login/Preloader Methods ==================== */

    static #updateSessionHandler(callback, thisArg) {
      if (this.session.statusChanged || this.#skipLogin) {
        this.#lastConnectionStatus = this.session.status;

        if (
          this.session.status == NewgroundsIO.SessionState.LOGIN_SUCCESSFUL ||
          this.#skipLogin
        ) {
          this.#lastConnectionStatus =
            NewgroundsIO.SessionState.LOGIN_SUCCESSFUL;
          this.#sessionReady = true;
        }

        this.#reportConnectionStatus(callback, thisArg);
      }

      this.#skipLogin = false;
    }

    static #reportConnectionStatus(callback, thisArg) {
      thisArg
        ? callback.call(thisArg, this.#lastConnectionStatus)
        : callback(this.#lastConnectionStatus);
    }

    // Loads the latest version info, and will get the host license and log a view if those Init() options are enabled.
    static #checkLocalVersion(callback, thisArg) {
      // if a login fails, this may get called again. Catch it and avoid an extra lookup!
      if (this.#localVersionChecked) {
        this.#lastConnectionStatus = this.STATUS_LOCAL_VERSION_CHECKED;
        this.#reportConnectionStatus(callback, thisArg);
        return;
      }

      this.ngioCore.queueComponent(
        this.ngioCore.getComponent("App.getCurrentVersion", {
          version: this.#version,
        })
      );
      this.ngioCore.queueComponent(
        this.ngioCore.getComponent("Gateway.getVersion")
      );

      if (this.#preloadFlags.autoLogNewView) {
        this.ngioCore.queueComponent(this.ngioCore.getComponent("App.logView"));
      }
      if (this.#preloadFlags.checkHostLicense) {
        this.ngioCore.queueComponent(
          this.ngioCore.getComponent("App.getHostLicense")
        );
      }

      this.ngioCore.executeQueue(function () {
        this.#lastConnectionStatus = this.STATUS_LOCAL_VERSION_CHECKED;
        this.#localVersionChecked = true;
        this.#reportConnectionStatus(callback, thisArg);

        if (this.#isDeprecated) {
          console.warn(
            "NGIO - Version mistmatch! Published version is: " +
              this.#newestVersion +
              ", this version is: " +
              this.version
          );
        }
        if (!this.#legalHost) {
          console.warn(
            "NGIO - This host has been blocked fom hosting this game!"
          );
          this.#sessionReady = true;
          this.#lastConnectionStatus = this.STATUS_ITEMS_PRELOADED;
          this.#reportConnectionStatus(callback, thisArg);
        }
      }, this);
    }

    // Preloads any items that were set in the Init() options.
    static #PreloadItems() {
      if (this.#preloadFlags.preloadMedals) {
        this.ngioCore.queueComponent(
          this.ngioCore.getComponent("Medal.getMedalScore")
        );
        this.ngioCore.queueComponent(
          this.ngioCore.getComponent("Medal.getList")
        );
      }
      if (this.#preloadFlags.preloadScoreBoards) {
        this.ngioCore.queueComponent(
          this.ngioCore.getComponent("ScoreBoard.getBoards")
        );
      }
      if (this.user !== null && this.#preloadFlags.preloadSaveSlots)
        this.ngioCore.queueComponent(
          this.ngioCore.getComponent("CloudSave.loadSlots")
        );

      if (this.ngioCore.hasQueue) {
        this.ngioCore.executeQueue(function () {
          this.#lastConnectionStatus = this.STATUS_ITEMS_PRELOADED;
        }, this);
      } else {
        this.#lastConnectionStatus = this.STATUS_ITEMS_PRELOADED;
      }
    }

    /* =============================== Private Methods ============================== */

    // Resets the connection state, typically after a user logs out or cancels a login.
    static #resetConnectionStatus() {
      this.#lastConnectionStatus = this.STATUS_INITIALIZED;
      this.#loginPageOpen = false;
      this.#skipLogin = false;
      this.#sessionReady = false;
    }

    static #replaceSaveSlot(slot) {
      if (this.#saveSlots) {
        let replace = this.#saveSlots.length;
        for (let i = 0; i < this.#saveSlots.length; i++) {
          if (this.#saveSlots[i].id === slot.id) {
            replace = i;
            break;
          }
        }
        this.#saveSlots[replace] = slot.clone(
          replace < this.#saveSlots.length ? this.#saveSlots[replace] : null
        );
      }
    }

    static #replaceScoreBoard(board) {
      if (this.#scoreBoards) {
        let replace = this.#scoreBoards.length;
        for (let i = 0; i < this.#scoreBoards.length; i++) {
          if (this.#scoreBoards[i].id === board.id) {
            replace = i;
            break;
          }
        }
        this.#scoreBoards[replace] = board.clone(
          replace < this.#scoreBoards.length ? this.#scoreBoards[replace] : null
        );
      }
    }

    static #replaceMedal(medal) {
      if (this.#medals) {
        let replace = this.#medals.length;
        for (let i = 0; i < this.#medals.length; i++) {
          if (this.#medals[i].id === medal.id) {
            replace = i;
            break;
          }
        }
        this.#medals[replace] = medal.clone(
          replace < this.#medals.length ? this.#medals[replace] : null
        );
      }
    }

    // Runs anytime the core gets a server response. Grabs individual result objects and runs them through #handleNewComponentResult().
    static #onServerResponse(e) {
      let response = e.detail;

      if (response && response.success) {
        // make a note of our last update time
        this.#lastExecution = new Date();

        if (Array.isArray(response.result)) {
          for (let i = 0; i < response.result.length; i++) {
            if (response.result[i])
              this.#handleNewComponentResult(response.result[i]);
          }
        } else {
          if (response.result) this.#handleNewComponentResult(response.result);
        }
      }
    }

    // Checks component results from every server response to see if they need any further handling.
    static #handleNewComponentResult(result) {
      // show any errors, but ignore the one about null sessions, that's bound to happen anytime the game is played outside of Newgrounds
      if (
        !result.success &&
        result.error.code !== 104 &&
        result.error.code !== 110
      ) {
        console.error(
          result.error.message + " \ncode(" + result.error.code + ")"
        );
      }

      switch (result.__object) {
        /* ============================== App Info ============================== */

        case "App.getCurrentVersion":
          if (!result.success) return;

          // Save the latest version and note if this copy of the game is deprecated
          this.#newestVersion = result.current_version;
          this.#isDeprecated = result.client_deprecated;

          break;

        case "App.getHostLicense":
          if (!result.success) return;
          // Make a note of whether this game is being hosted legally or not
          this.#legalHost = result.host_approved;

          break;

        case "App.endSession":
          // reset the connection state if the user logged out
          this.#resetConnectionStatus();

          break;

        case "App.checkSession":
          // if something fails with a session check, reset the connection status
          if (!result.success) {
            this.#resetConnectionStatus();
          }

        case "App.startSession":
          // if something fails with a session check, reset the connection status
          if (!result.success) {
            this.#resetConnectionStatus();
            break;
          }

          result.session.clone(this.session);
          break;

        /* ============================ Cloud Saves ============================= */

        case "CloudSave.loadSlots":
          if (!result.success) return;

          // Store the loaded cloud saves in our dictionary so we can get them by slot number
          this.#saveSlots = result.slots;

          break;

        case "CloudSave.loadSlot":
          if (!result.success) return;

          // add or replace the slot
          this.#replaceSaveSlot(result.slot);

          break;

        case "CloudSave.setData":
          if (!result.success) {
            this.#lastSaveSlotSaved = null;
            return;
          }

          // add or replace the slot
          this.#replaceSaveSlot(result.slot);

          break;

        case "CloudSave.clearSlot":
          if (!result.success) return;

          // add or replace the slot
          this.#replaceSaveSlot(result.slot);

          break;

        /* ============================== Events ================================ */

        case "Event.logEvent":
          if (!result.success) {
            this.#lastLoggedEvent = null;
            return;
          }

          this.#lastLoggedEvent = result.event_name;

          break;

        /* ============================== Gateway ================================ */

        case "Gateway.getDatetime":
          if (!result.success) {
            this.#lastTimeStamp = 0;
            this.#lastDateTime = "0000-00-00";
            return;
          }

          this.#lastDateTime = result.datetime;
          this.#lastTimeStamp = result.timestamp;

          break;

        case "Gateway.getVersion":
          if (!result.success) {
            this.#gatewayVersion = null;
            return;
          }

          this.#gatewayVersion = result.version;

          break;

        case "Gateway.ping":
          this.#lastPingSuccess = result.success;

          break;

        /* ============================== Medals ================================ */

        case "Medal.getList":
          if (!result.success) return;

          // Store the loaded medals.
          this.#medals = [];
          for (let i = 0; i < result.medals.length; i++) {
            this.#medals.push(result.medals[i].clone());
          }

          break;

        case "Medal.unlock":
          if (!result.success) {
            this.#lastMedalUnlocked = null;
            return;
          }

          if (this.#medals) {
            // Save, or replace, the medal
            this.#replaceMedal(result.medal);

            // record the last unlock
            this.#lastMedalUnlocked = this.getMedal(result.medal.id);
          }

          // Record the current user's medal score
          this.#medalScore = result.medal_score;
          window.top.postMessage(
            JSON.stringify({
              ngioComponent: "Medal.unlock",
              id: result.medal.id,
            }),
            "*"
          );

          break;

        case "Medal.getMedalScore":
          if (!result.success) return;

          // Record the current user's medal score
          this.#medalScore = result.medal_score;

          break;

        /* ============================= ScoreBoards ============================ */

        case "ScoreBoard.getBoards":
          if (!result.success) return;

          // store the loaded scoreboards
          this.#scoreBoards = [];
          for (let i = 0; i < result.scoreboards.length; i++) {
            this.#scoreBoards.push(result.scoreboards[i].clone());
          }

          break;

        case "ScoreBoard.postScore":
          if (!result.success) {
            this.#lastScorePosted = null;
            this.#lastBoardPosted = null;
            return;
          }

          if (this.#scoreBoards) {
            this.#lastScorePosted = result.score;
            this.#lastBoardPosted = this.getScoreBoard(result.scoreboard.id);
          }

          window.top.postMessage(
            JSON.stringify({
              ngioComponent: "ScoreBoard.postScore",
              id: result.scoreboard.id,
            }),
            "*"
          );

          break;

        case "ScoreBoard.getScores":
          if (!result.success) {
            this.#lastGetScoresResult = null;
            return;
          }
          this.#lastGetScoresResult = result;

          break;
      }
    }
  }
  /** End Class NGIO **/

  /* ====================== ./NewgroundsIO-JS/src/include/aes.js ====================== */

  /*
    CryptoJS v3.1.2
    code.google.com/p/crypto-js
    (c) 2009-2013 by Jeff Mott. All rights reserved.
    code.google.com/p/crypto-js/wiki/License
    */
  var CryptoJS =
    CryptoJS ||
    (function (u, p) {
      var d = {},
        l = (d.lib = {}),
        s = function () {},
        t = (l.Base = {
          extend: function (a) {
            s.prototype = this;
            var c = new s();
            a && c.mixIn(a);
            c.hasOwnProperty("init") ||
              (c.init = function () {
                c.$super.init.apply(this, arguments);
              });
            c.init.prototype = c;
            c.$super = this;
            return c;
          },
          create: function () {
            var a = this.extend();
            a.init.apply(a, arguments);
            return a;
          },
          init: function () {},
          mixIn: function (a) {
            for (var c in a) a.hasOwnProperty(c) && (this[c] = a[c]);
            a.hasOwnProperty("toString") && (this.toString = a.toString);
          },
          clone: function () {
            return this.init.prototype.extend(this);
          },
        }),
        r = (l.WordArray = t.extend({
          init: function (a, c) {
            a = this.words = a || [];
            this.sigBytes = c != p ? c : 4 * a.length;
          },
          toString: function (a) {
            return (a || v).stringify(this);
          },
          concat: function (a) {
            var c = this.words,
              e = a.words,
              j = this.sigBytes;
            a = a.sigBytes;
            this.clamp();
            if (j % 4)
              for (var k = 0; k < a; k++)
                c[(j + k) >>> 2] |=
                  ((e[k >>> 2] >>> (24 - 8 * (k % 4))) & 255) <<
                  (24 - 8 * ((j + k) % 4));
            else if (65535 < e.length)
              for (k = 0; k < a; k += 4) c[(j + k) >>> 2] = e[k >>> 2];
            else c.push.apply(c, e);
            this.sigBytes += a;
            return this;
          },
          clamp: function () {
            var a = this.words,
              c = this.sigBytes;
            a[c >>> 2] &= 4294967295 << (32 - 8 * (c % 4));
            a.length = u.ceil(c / 4);
          },
          clone: function () {
            var a = t.clone.call(this);
            a.words = this.words.slice(0);
            return a;
          },
          random: function (a) {
            for (var c = [], e = 0; e < a; e += 4)
              c.push((4294967296 * u.random()) | 0);
            return new r.init(c, a);
          },
        })),
        w = (d.enc = {}),
        v = (w.Hex = {
          stringify: function (a) {
            var c = a.words;
            a = a.sigBytes;
            for (var e = [], j = 0; j < a; j++) {
              var k = (c[j >>> 2] >>> (24 - 8 * (j % 4))) & 255;
              e.push((k >>> 4).toString(16));
              e.push((k & 15).toString(16));
            }
            return e.join("");
          },
          parse: function (a) {
            for (var c = a.length, e = [], j = 0; j < c; j += 2)
              e[j >>> 3] |= parseInt(a.substr(j, 2), 16) << (24 - 4 * (j % 8));
            return new r.init(e, c / 2);
          },
        }),
        b = (w.Latin1 = {
          stringify: function (a) {
            var c = a.words;
            a = a.sigBytes;
            for (var e = [], j = 0; j < a; j++)
              e.push(
                String.fromCharCode((c[j >>> 2] >>> (24 - 8 * (j % 4))) & 255)
              );
            return e.join("");
          },
          parse: function (a) {
            for (var c = a.length, e = [], j = 0; j < c; j++)
              e[j >>> 2] |= (a.charCodeAt(j) & 255) << (24 - 8 * (j % 4));
            return new r.init(e, c);
          },
        }),
        x = (w.Utf8 = {
          stringify: function (a) {
            try {
              return decodeURIComponent(escape(b.stringify(a)));
            } catch (c) {
              throw Error("Malformed UTF-8 data");
            }
          },
          parse: function (a) {
            return b.parse(unescape(encodeURIComponent(a)));
          },
        }),
        q = (l.BufferedBlockAlgorithm = t.extend({
          reset: function () {
            this._data = new r.init();
            this._nDataBytes = 0;
          },
          _append: function (a) {
            "string" == typeof a && (a = x.parse(a));
            this._data.concat(a);
            this._nDataBytes += a.sigBytes;
          },
          _process: function (a) {
            var c = this._data,
              e = c.words,
              j = c.sigBytes,
              k = this.blockSize,
              b = j / (4 * k),
              b = a ? u.ceil(b) : u.max((b | 0) - this._minBufferSize, 0);
            a = b * k;
            j = u.min(4 * a, j);
            if (a) {
              for (var q = 0; q < a; q += k) this._doProcessBlock(e, q);
              q = e.splice(0, a);
              c.sigBytes -= j;
            }
            return new r.init(q, j);
          },
          clone: function () {
            var a = t.clone.call(this);
            a._data = this._data.clone();
            return a;
          },
          _minBufferSize: 0,
        }));
      l.Hasher = q.extend({
        cfg: t.extend(),
        init: function (a) {
          this.cfg = this.cfg.extend(a);
          this.reset();
        },
        reset: function () {
          q.reset.call(this);
          this._doReset();
        },
        update: function (a) {
          this._append(a);
          this._process();
          return this;
        },
        finalize: function (a) {
          a && this._append(a);
          return this._doFinalize();
        },
        blockSize: 16,
        _createHelper: function (a) {
          return function (b, e) {
            return new a.init(e).finalize(b);
          };
        },
        _createHmacHelper: function (a) {
          return function (b, e) {
            return new n.HMAC.init(a, e).finalize(b);
          };
        },
      });
      var n = (d.algo = {});
      return d;
    })(Math);
  (function () {
    var u = CryptoJS,
      p = u.lib.WordArray;
    u.enc.Base64 = {
      stringify: function (d) {
        var l = d.words,
          p = d.sigBytes,
          t = this._map;
        d.clamp();
        d = [];
        for (var r = 0; r < p; r += 3)
          for (
            var w =
                (((l[r >>> 2] >>> (24 - 8 * (r % 4))) & 255) << 16) |
                (((l[(r + 1) >>> 2] >>> (24 - 8 * ((r + 1) % 4))) & 255) << 8) |
                ((l[(r + 2) >>> 2] >>> (24 - 8 * ((r + 2) % 4))) & 255),
              v = 0;
            4 > v && r + 0.75 * v < p;
            v++
          )
            d.push(t.charAt((w >>> (6 * (3 - v))) & 63));
        if ((l = t.charAt(64))) for (; d.length % 4; ) d.push(l);
        return d.join("");
      },
      parse: function (d) {
        var l = d.length,
          s = this._map,
          t = s.charAt(64);
        t && ((t = d.indexOf(t)), -1 != t && (l = t));
        for (var t = [], r = 0, w = 0; w < l; w++)
          if (w % 4) {
            var v = s.indexOf(d.charAt(w - 1)) << (2 * (w % 4)),
              b = s.indexOf(d.charAt(w)) >>> (6 - 2 * (w % 4));
            t[r >>> 2] |= (v | b) << (24 - 8 * (r % 4));
            r++;
          }
        return p.create(t, r);
      },
      _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    };
  })();
  (function (u) {
    function p(b, n, a, c, e, j, k) {
      b = b + ((n & a) | (~n & c)) + e + k;
      return ((b << j) | (b >>> (32 - j))) + n;
    }
    function d(b, n, a, c, e, j, k) {
      b = b + ((n & c) | (a & ~c)) + e + k;
      return ((b << j) | (b >>> (32 - j))) + n;
    }
    function l(b, n, a, c, e, j, k) {
      b = b + (n ^ a ^ c) + e + k;
      return ((b << j) | (b >>> (32 - j))) + n;
    }
    function s(b, n, a, c, e, j, k) {
      b = b + (a ^ (n | ~c)) + e + k;
      return ((b << j) | (b >>> (32 - j))) + n;
    }
    for (
      var t = CryptoJS,
        r = t.lib,
        w = r.WordArray,
        v = r.Hasher,
        r = t.algo,
        b = [],
        x = 0;
      64 > x;
      x++
    )
      b[x] = (4294967296 * u.abs(u.sin(x + 1))) | 0;
    r = r.MD5 = v.extend({
      _doReset: function () {
        this._hash = new w.init([
          1732584193, 4023233417, 2562383102, 271733878,
        ]);
      },
      _doProcessBlock: function (q, n) {
        for (var a = 0; 16 > a; a++) {
          var c = n + a,
            e = q[c];
          q[c] =
            (((e << 8) | (e >>> 24)) & 16711935) |
            (((e << 24) | (e >>> 8)) & 4278255360);
        }
        var a = this._hash.words,
          c = q[n + 0],
          e = q[n + 1],
          j = q[n + 2],
          k = q[n + 3],
          z = q[n + 4],
          r = q[n + 5],
          t = q[n + 6],
          w = q[n + 7],
          v = q[n + 8],
          A = q[n + 9],
          B = q[n + 10],
          C = q[n + 11],
          u = q[n + 12],
          D = q[n + 13],
          E = q[n + 14],
          x = q[n + 15],
          f = a[0],
          m = a[1],
          g = a[2],
          h = a[3],
          f = p(f, m, g, h, c, 7, b[0]),
          h = p(h, f, m, g, e, 12, b[1]),
          g = p(g, h, f, m, j, 17, b[2]),
          m = p(m, g, h, f, k, 22, b[3]),
          f = p(f, m, g, h, z, 7, b[4]),
          h = p(h, f, m, g, r, 12, b[5]),
          g = p(g, h, f, m, t, 17, b[6]),
          m = p(m, g, h, f, w, 22, b[7]),
          f = p(f, m, g, h, v, 7, b[8]),
          h = p(h, f, m, g, A, 12, b[9]),
          g = p(g, h, f, m, B, 17, b[10]),
          m = p(m, g, h, f, C, 22, b[11]),
          f = p(f, m, g, h, u, 7, b[12]),
          h = p(h, f, m, g, D, 12, b[13]),
          g = p(g, h, f, m, E, 17, b[14]),
          m = p(m, g, h, f, x, 22, b[15]),
          f = d(f, m, g, h, e, 5, b[16]),
          h = d(h, f, m, g, t, 9, b[17]),
          g = d(g, h, f, m, C, 14, b[18]),
          m = d(m, g, h, f, c, 20, b[19]),
          f = d(f, m, g, h, r, 5, b[20]),
          h = d(h, f, m, g, B, 9, b[21]),
          g = d(g, h, f, m, x, 14, b[22]),
          m = d(m, g, h, f, z, 20, b[23]),
          f = d(f, m, g, h, A, 5, b[24]),
          h = d(h, f, m, g, E, 9, b[25]),
          g = d(g, h, f, m, k, 14, b[26]),
          m = d(m, g, h, f, v, 20, b[27]),
          f = d(f, m, g, h, D, 5, b[28]),
          h = d(h, f, m, g, j, 9, b[29]),
          g = d(g, h, f, m, w, 14, b[30]),
          m = d(m, g, h, f, u, 20, b[31]),
          f = l(f, m, g, h, r, 4, b[32]),
          h = l(h, f, m, g, v, 11, b[33]),
          g = l(g, h, f, m, C, 16, b[34]),
          m = l(m, g, h, f, E, 23, b[35]),
          f = l(f, m, g, h, e, 4, b[36]),
          h = l(h, f, m, g, z, 11, b[37]),
          g = l(g, h, f, m, w, 16, b[38]),
          m = l(m, g, h, f, B, 23, b[39]),
          f = l(f, m, g, h, D, 4, b[40]),
          h = l(h, f, m, g, c, 11, b[41]),
          g = l(g, h, f, m, k, 16, b[42]),
          m = l(m, g, h, f, t, 23, b[43]),
          f = l(f, m, g, h, A, 4, b[44]),
          h = l(h, f, m, g, u, 11, b[45]),
          g = l(g, h, f, m, x, 16, b[46]),
          m = l(m, g, h, f, j, 23, b[47]),
          f = s(f, m, g, h, c, 6, b[48]),
          h = s(h, f, m, g, w, 10, b[49]),
          g = s(g, h, f, m, E, 15, b[50]),
          m = s(m, g, h, f, r, 21, b[51]),
          f = s(f, m, g, h, u, 6, b[52]),
          h = s(h, f, m, g, k, 10, b[53]),
          g = s(g, h, f, m, B, 15, b[54]),
          m = s(m, g, h, f, e, 21, b[55]),
          f = s(f, m, g, h, v, 6, b[56]),
          h = s(h, f, m, g, x, 10, b[57]),
          g = s(g, h, f, m, t, 15, b[58]),
          m = s(m, g, h, f, D, 21, b[59]),
          f = s(f, m, g, h, z, 6, b[60]),
          h = s(h, f, m, g, C, 10, b[61]),
          g = s(g, h, f, m, j, 15, b[62]),
          m = s(m, g, h, f, A, 21, b[63]);
        a[0] = (a[0] + f) | 0;
        a[1] = (a[1] + m) | 0;
        a[2] = (a[2] + g) | 0;
        a[3] = (a[3] + h) | 0;
      },
      _doFinalize: function () {
        var b = this._data,
          n = b.words,
          a = 8 * this._nDataBytes,
          c = 8 * b.sigBytes;
        n[c >>> 5] |= 128 << (24 - (c % 32));
        var e = u.floor(a / 4294967296);
        n[(((c + 64) >>> 9) << 4) + 15] =
          (((e << 8) | (e >>> 24)) & 16711935) |
          (((e << 24) | (e >>> 8)) & 4278255360);
        n[(((c + 64) >>> 9) << 4) + 14] =
          (((a << 8) | (a >>> 24)) & 16711935) |
          (((a << 24) | (a >>> 8)) & 4278255360);
        b.sigBytes = 4 * (n.length + 1);
        this._process();
        b = this._hash;
        n = b.words;
        for (a = 0; 4 > a; a++)
          (c = n[a]),
            (n[a] =
              (((c << 8) | (c >>> 24)) & 16711935) |
              (((c << 24) | (c >>> 8)) & 4278255360));
        return b;
      },
      clone: function () {
        var b = v.clone.call(this);
        b._hash = this._hash.clone();
        return b;
      },
    });
    t.MD5 = v._createHelper(r);
    t.HmacMD5 = v._createHmacHelper(r);
  })(Math);
  (function () {
    var u = CryptoJS,
      p = u.lib,
      d = p.Base,
      l = p.WordArray,
      p = u.algo,
      s = (p.EvpKDF = d.extend({
        cfg: d.extend({ keySize: 4, hasher: p.MD5, iterations: 1 }),
        init: function (d) {
          this.cfg = this.cfg.extend(d);
        },
        compute: function (d, r) {
          for (
            var p = this.cfg,
              s = p.hasher.create(),
              b = l.create(),
              u = b.words,
              q = p.keySize,
              p = p.iterations;
            u.length < q;

          ) {
            n && s.update(n);
            var n = s.update(d).finalize(r);
            s.reset();
            for (var a = 1; a < p; a++) (n = s.finalize(n)), s.reset();
            b.concat(n);
          }
          b.sigBytes = 4 * q;
          return b;
        },
      }));
    u.EvpKDF = function (d, l, p) {
      return s.create(p).compute(d, l);
    };
  })();
  CryptoJS.lib.Cipher ||
    (function (u) {
      var p = CryptoJS,
        d = p.lib,
        l = d.Base,
        s = d.WordArray,
        t = d.BufferedBlockAlgorithm,
        r = p.enc.Base64,
        w = p.algo.EvpKDF,
        v = (d.Cipher = t.extend({
          cfg: l.extend(),
          createEncryptor: function (e, a) {
            return this.create(this._ENC_XFORM_MODE, e, a);
          },
          createDecryptor: function (e, a) {
            return this.create(this._DEC_XFORM_MODE, e, a);
          },
          init: function (e, a, b) {
            this.cfg = this.cfg.extend(b);
            this._xformMode = e;
            this._key = a;
            this.reset();
          },
          reset: function () {
            t.reset.call(this);
            this._doReset();
          },
          process: function (e) {
            this._append(e);
            return this._process();
          },
          finalize: function (e) {
            e && this._append(e);
            return this._doFinalize();
          },
          keySize: 4,
          ivSize: 4,
          _ENC_XFORM_MODE: 1,
          _DEC_XFORM_MODE: 2,
          _createHelper: function (e) {
            return {
              encrypt: function (b, k, d) {
                return ("string" == typeof k ? c : a).encrypt(e, b, k, d);
              },
              decrypt: function (b, k, d) {
                return ("string" == typeof k ? c : a).decrypt(e, b, k, d);
              },
            };
          },
        }));
      d.StreamCipher = v.extend({
        _doFinalize: function () {
          return this._process(!0);
        },
        blockSize: 1,
      });
      var b = (p.mode = {}),
        x = function (e, a, b) {
          var c = this._iv;
          c ? (this._iv = u) : (c = this._prevBlock);
          for (var d = 0; d < b; d++) e[a + d] ^= c[d];
        },
        q = (d.BlockCipherMode = l.extend({
          createEncryptor: function (e, a) {
            return this.Encryptor.create(e, a);
          },
          createDecryptor: function (e, a) {
            return this.Decryptor.create(e, a);
          },
          init: function (e, a) {
            this._cipher = e;
            this._iv = a;
          },
        })).extend();
      q.Encryptor = q.extend({
        processBlock: function (e, a) {
          var b = this._cipher,
            c = b.blockSize;
          x.call(this, e, a, c);
          b.encryptBlock(e, a);
          this._prevBlock = e.slice(a, a + c);
        },
      });
      q.Decryptor = q.extend({
        processBlock: function (e, a) {
          var b = this._cipher,
            c = b.blockSize,
            d = e.slice(a, a + c);
          b.decryptBlock(e, a);
          x.call(this, e, a, c);
          this._prevBlock = d;
        },
      });
      b = b.CBC = q;
      q = (p.pad = {}).Pkcs7 = {
        pad: function (a, b) {
          for (
            var c = 4 * b,
              c = c - (a.sigBytes % c),
              d = (c << 24) | (c << 16) | (c << 8) | c,
              l = [],
              n = 0;
            n < c;
            n += 4
          )
            l.push(d);
          c = s.create(l, c);
          a.concat(c);
        },
        unpad: function (a) {
          a.sigBytes -= a.words[(a.sigBytes - 1) >>> 2] & 255;
        },
      };
      d.BlockCipher = v.extend({
        cfg: v.cfg.extend({ mode: b, padding: q }),
        reset: function () {
          v.reset.call(this);
          var a = this.cfg,
            b = a.iv,
            a = a.mode;
          if (this._xformMode == this._ENC_XFORM_MODE)
            var c = a.createEncryptor;
          else (c = a.createDecryptor), (this._minBufferSize = 1);
          this._mode = c.call(a, this, b && b.words);
        },
        _doProcessBlock: function (a, b) {
          this._mode.processBlock(a, b);
        },
        _doFinalize: function () {
          var a = this.cfg.padding;
          if (this._xformMode == this._ENC_XFORM_MODE) {
            a.pad(this._data, this.blockSize);
            var b = this._process(!0);
          } else (b = this._process(!0)), a.unpad(b);
          return b;
        },
        blockSize: 4,
      });
      var n = (d.CipherParams = l.extend({
          init: function (a) {
            this.mixIn(a);
          },
          toString: function (a) {
            return (a || this.formatter).stringify(this);
          },
        })),
        b = ((p.format = {}).OpenSSL = {
          stringify: function (a) {
            var b = a.ciphertext;
            a = a.salt;
            return (
              a ? s.create([1398893684, 1701076831]).concat(a).concat(b) : b
            ).toString(r);
          },
          parse: function (a) {
            a = r.parse(a);
            var b = a.words;
            if (1398893684 == b[0] && 1701076831 == b[1]) {
              var c = s.create(b.slice(2, 4));
              b.splice(0, 4);
              a.sigBytes -= 16;
            }
            return n.create({ ciphertext: a, salt: c });
          },
        }),
        a = (d.SerializableCipher = l.extend({
          cfg: l.extend({ format: b }),
          encrypt: function (a, b, c, d) {
            d = this.cfg.extend(d);
            var l = a.createEncryptor(c, d);
            b = l.finalize(b);
            l = l.cfg;
            return n.create({
              ciphertext: b,
              key: c,
              iv: l.iv,
              algorithm: a,
              mode: l.mode,
              padding: l.padding,
              blockSize: a.blockSize,
              formatter: d.format,
            });
          },
          decrypt: function (a, b, c, d) {
            d = this.cfg.extend(d);
            b = this._parse(b, d.format);
            return a.createDecryptor(c, d).finalize(b.ciphertext);
          },
          _parse: function (a, b) {
            return "string" == typeof a ? b.parse(a, this) : a;
          },
        })),
        p = ((p.kdf = {}).OpenSSL = {
          execute: function (a, b, c, d) {
            d || (d = s.random(8));
            a = w.create({ keySize: b + c }).compute(a, d);
            c = s.create(a.words.slice(b), 4 * c);
            a.sigBytes = 4 * b;
            return n.create({ key: a, iv: c, salt: d });
          },
        }),
        c = (d.PasswordBasedCipher = a.extend({
          cfg: a.cfg.extend({ kdf: p }),
          encrypt: function (b, c, d, l) {
            l = this.cfg.extend(l);
            d = l.kdf.execute(d, b.keySize, b.ivSize);
            l.iv = d.iv;
            b = a.encrypt.call(this, b, c, d.key, l);
            b.mixIn(d);
            return b;
          },
          decrypt: function (b, c, d, l) {
            l = this.cfg.extend(l);
            c = this._parse(c, l.format);
            d = l.kdf.execute(d, b.keySize, b.ivSize, c.salt);
            l.iv = d.iv;
            return a.decrypt.call(this, b, c, d.key, l);
          },
        }));
    })();
  (function () {
    for (
      var u = CryptoJS,
        p = u.lib.BlockCipher,
        d = u.algo,
        l = [],
        s = [],
        t = [],
        r = [],
        w = [],
        v = [],
        b = [],
        x = [],
        q = [],
        n = [],
        a = [],
        c = 0;
      256 > c;
      c++
    )
      a[c] = 128 > c ? c << 1 : (c << 1) ^ 283;
    for (var e = 0, j = 0, c = 0; 256 > c; c++) {
      var k = j ^ (j << 1) ^ (j << 2) ^ (j << 3) ^ (j << 4),
        k = (k >>> 8) ^ (k & 255) ^ 99;
      l[e] = k;
      s[k] = e;
      var z = a[e],
        F = a[z],
        G = a[F],
        y = (257 * a[k]) ^ (16843008 * k);
      t[e] = (y << 24) | (y >>> 8);
      r[e] = (y << 16) | (y >>> 16);
      w[e] = (y << 8) | (y >>> 24);
      v[e] = y;
      y = (16843009 * G) ^ (65537 * F) ^ (257 * z) ^ (16843008 * e);
      b[k] = (y << 24) | (y >>> 8);
      x[k] = (y << 16) | (y >>> 16);
      q[k] = (y << 8) | (y >>> 24);
      n[k] = y;
      e ? ((e = z ^ a[a[a[G ^ z]]]), (j ^= a[a[j]])) : (e = j = 1);
    }
    var H = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54],
      d = (d.AES = p.extend({
        _doReset: function () {
          for (
            var a = this._key,
              c = a.words,
              d = a.sigBytes / 4,
              a = 4 * ((this._nRounds = d + 6) + 1),
              e = (this._keySchedule = []),
              j = 0;
            j < a;
            j++
          )
            if (j < d) e[j] = c[j];
            else {
              var k = e[j - 1];
              j % d
                ? 6 < d &&
                  4 == j % d &&
                  (k =
                    (l[k >>> 24] << 24) |
                    (l[(k >>> 16) & 255] << 16) |
                    (l[(k >>> 8) & 255] << 8) |
                    l[k & 255])
                : ((k = (k << 8) | (k >>> 24)),
                  (k =
                    (l[k >>> 24] << 24) |
                    (l[(k >>> 16) & 255] << 16) |
                    (l[(k >>> 8) & 255] << 8) |
                    l[k & 255]),
                  (k ^= H[(j / d) | 0] << 24));
              e[j] = e[j - d] ^ k;
            }
          c = this._invKeySchedule = [];
          for (d = 0; d < a; d++)
            (j = a - d),
              (k = d % 4 ? e[j] : e[j - 4]),
              (c[d] =
                4 > d || 4 >= j
                  ? k
                  : b[l[k >>> 24]] ^
                    x[l[(k >>> 16) & 255]] ^
                    q[l[(k >>> 8) & 255]] ^
                    n[l[k & 255]]);
        },
        encryptBlock: function (a, b) {
          this._doCryptBlock(a, b, this._keySchedule, t, r, w, v, l);
        },
        decryptBlock: function (a, c) {
          var d = a[c + 1];
          a[c + 1] = a[c + 3];
          a[c + 3] = d;
          this._doCryptBlock(a, c, this._invKeySchedule, b, x, q, n, s);
          d = a[c + 1];
          a[c + 1] = a[c + 3];
          a[c + 3] = d;
        },
        _doCryptBlock: function (a, b, c, d, e, j, l, f) {
          for (
            var m = this._nRounds,
              g = a[b] ^ c[0],
              h = a[b + 1] ^ c[1],
              k = a[b + 2] ^ c[2],
              n = a[b + 3] ^ c[3],
              p = 4,
              r = 1;
            r < m;
            r++
          )
            var q =
                d[g >>> 24] ^
                e[(h >>> 16) & 255] ^
                j[(k >>> 8) & 255] ^
                l[n & 255] ^
                c[p++],
              s =
                d[h >>> 24] ^
                e[(k >>> 16) & 255] ^
                j[(n >>> 8) & 255] ^
                l[g & 255] ^
                c[p++],
              t =
                d[k >>> 24] ^
                e[(n >>> 16) & 255] ^
                j[(g >>> 8) & 255] ^
                l[h & 255] ^
                c[p++],
              n =
                d[n >>> 24] ^
                e[(g >>> 16) & 255] ^
                j[(h >>> 8) & 255] ^
                l[k & 255] ^
                c[p++],
              g = q,
              h = s,
              k = t;
          q =
            ((f[g >>> 24] << 24) |
              (f[(h >>> 16) & 255] << 16) |
              (f[(k >>> 8) & 255] << 8) |
              f[n & 255]) ^
            c[p++];
          s =
            ((f[h >>> 24] << 24) |
              (f[(k >>> 16) & 255] << 16) |
              (f[(n >>> 8) & 255] << 8) |
              f[g & 255]) ^
            c[p++];
          t =
            ((f[k >>> 24] << 24) |
              (f[(n >>> 16) & 255] << 16) |
              (f[(g >>> 8) & 255] << 8) |
              f[h & 255]) ^
            c[p++];
          n =
            ((f[n >>> 24] << 24) |
              (f[(g >>> 16) & 255] << 16) |
              (f[(h >>> 8) & 255] << 8) |
              f[k & 255]) ^
            c[p++];
          a[b] = q;
          a[b + 1] = s;
          a[b + 2] = t;
          a[b + 3] = n;
        },
        keySize: 8,
      }));
    u.AES = p._createHelper(d);
  })();

  /* ====================== ./NewgroundsIO-JS/src/NewgroundsIO/Core.js ====================== */

  /**
   * NewgroundsIO Namespace
   * @namespace
   */
  var NewgroundsIO = NewgroundsIO ? NewgroundsIO : {};

  /**
   * NewgroundsIO Objecs Namespace
   * @namespace
   */
  NewgroundsIO.objects = NewgroundsIO.objects ? NewgroundsIO.objects : {};

  /**
   * NewgroundsIO Results Namespace
   * @namespace
   */
  NewgroundsIO.results = NewgroundsIO.results ? NewgroundsIO.results : {};

  /**
   * NewgroundsIO Components Namespace
   * @namespace
   */
  NewgroundsIO.components = NewgroundsIO.components
    ? NewgroundsIO.components
    : {};

  (() => {
    /** Start Class NewgroundsIO.Core **/

    /**
     * @callback responseCallback
     * @param {NewgroundsIO.objects.Response} serverResponse
     */

    /** Class for communicating with the Newgrounds.io API **/
    class Core extends EventTarget {
      /**
       * @private
       */
      #GATEWAY_URI = "https://www.newgrounds.io/gateway_v3.php";

      /**
       * @private
       */
      #debug = false;

      /**
       * @private
       */
      #appID = null;

      /**
       * @private
       */
      #aesKey = null;

      /**
       * @private
       */
      #componentQueue = [];

      /**
       * @private
       */
      #host = null;

      /**
       * @private
       */
      #session = null;

      /**
       * @private
       */
      #uriParams = {};

      /**
       * The URI to v3 of the Newgrounds.io gateway.
       * @type {string}
       */
      get GATEWAY_URI() {
        return this.#GATEWAY_URI;
      }

      /**
       * Set to true to enable debug mode.
       * @type {boolean}
       */
      get debug() {
        return this.#debug;
      }
      set debug(d) {
        this.#debug = d ? true : false;
      }

      /**
       * The App ID from your App Settings page.
       * @type {string}
       */
      get appID() {
        return this.#appID;
      }

      /**
       * An array of pending components to be called via executeQueue.
       * @type {array} An array of NewgroundsIO.components.XXXX objects
       */
      get componentQueue() {
        return this.#componentQueue;
      }

      /**
       * Returns true if any components are in the execute queue.
       * @type {boolean}
       */
      get hasQueue() {
        return this.#componentQueue.length > 0;
      }

      /**
       * Returns the host domain in web builds.
       * @type {boolean}
       */
      get host() {
        return this.#host;
      }

      /**
       * The user session object.
       * @type {NewgroundsIO.objects.Session}
       */
      get session() {
        return this.#session;
      }

      /**
       * The active user object.
       * @type {NewgroundsIO.objects.User}
       */
      get user() {
        return this.#session ? this.#session.user : null;
      }

      /**
       * An index of any parameters set in the current URL's query string.
       * @type {object}
       */
      get uriParams() {
        return this.#uriParams;
      }

      /**
       * Create a Core.
       * @param {string} appID The app id from your newgrounds project 'API Tools' page
       * @param {string} aesKey The AES-128 emcryption key from your newgrounds project 'API Tools' page
       */
      constructor(appID, aesKey) {
        super();
        if (typeof appID === "undefined") throw "Missing required appID!";
        if (typeof aesKey === "undefined") throw "Missing required aesKey!";

        this.#appID = appID;
        this.#aesKey = CryptoJS.enc.Base64.parse(aesKey);

        this.#componentQueue = [];

        // look for query string in any URL hosting this app
        this.#uriParams = {};

        if (window && window.location && window.location.href) {
          if (window.location.hostname) {
            this.#host = window.location.hostname.toLowerCase();
          } else if (
            window.location.href.toLowerCase().substr(0, 5) == "file:"
          ) {
            this.#host = "<LocalHost>";
          } else {
            this.#host = "<Unknown>";
          }
        } else {
          this.#host = "<AppView>";
        }

        if (typeof window !== "undefined" && window.location) {
          var uri = window.location.href;
          var query = uri.split("?").pop();

          if (query) {
            var pairs = query.split("&");
            var key_value;
            for (var i = 0; i < pairs.length; i++) {
              key_value = pairs[i].split("=");
              this.#uriParams[key_value[0]] = key_value[1];
            }
          }
        }

        this.#session = this.getObject("Session");
        this.#session._uri_id = this.getUriParam("ngio_session_id", null);
      }

      /**
       * Gets a query parameter value from the URI hosting this game.
       * @param {string} param The parameter you want to get a value for.
       * @param {string} defaultValue A value to use if the param isn't set.
       * @returns {string}
       */
      getUriParam(param, defaultValue) {
        return typeof this.#uriParams[param] === "undefined"
          ? defaultValue
          : this.#uriParams[param];
      }

      /**
       * Encrypts a JSON-encoded string and encodes it to a base64 string.
       * @param {string} jsonString The encoded JSON string to encrypt.
       * @returns {string}
       */
      encrypt(jsonString) {
        let iv = CryptoJS.lib.WordArray.random(16);
        let encrypted = CryptoJS.AES.encrypt(jsonString, this.#aesKey, {
          iv: iv,
        });
        return CryptoJS.enc.Base64.stringify(iv.concat(encrypted.ciphertext));
      }

      getObject(name, params) {
        if (typeof NewgroundsIO.objects[name] === "undefined") {
          console.error("NewgroundsIO - Invalid object name: " + name);
          return null;
        }

        var object = new NewgroundsIO.objects[name](params);
        object.setCore(this);
        return object;
      }

      getComponent(name, params) {
        var parts = name.split(".");
        var error = false;
        if (parts.length !== 2) {
          error = "Invalid component name: " + name;
        } else if (typeof NewgroundsIO.components[parts[0]] === "undefined") {
          error = "Invalid component name: " + name;
        } else if (
          typeof NewgroundsIO.components[parts[0]][parts[1]] === "undefined"
        ) {
          error = "Invalid component name: " + name;
        }

        if (error) {
          console.error("NewgroundsIO - " + error);
          return null;
        }

        var component = new NewgroundsIO.components[parts[0]][parts[1]](params);
        component.setCore(this);
        return component;
      }

      /**
       * Adds a component to the Queue. Queued components are executed in a single call via executeQueue.
       * @param {NewgroundsIO.BaseComponent} component Any NewgroundsIO.components.XXXXX object
       */
      queueComponent(component) {
        if (!this._verifyComponent(component)) {
          return;
        }
        component.setCore(this);
        this.#componentQueue.push(component);
      }

      /**
       * Executes any components in the queue.
       * @param {responseCallback} callback A function to fire when the queue has finished executing on the server.
       * @param {object} thisArg An optional object to use as 'this' in your callback function.
       */
      executeQueue(callback, thisArg) {
        if (this.#componentQueue.length < 1) return;

        this.executeComponent(this.#componentQueue, callback, thisArg);
        this.#componentQueue = [];
      }

      /**
       * Executes any components in the queue.
       * @param {NewgroundsIO.BaseComponent} component Any NewgroundsIO.components.XXXXX object
       * @param {responseCallback} callback A function to fire when the queue has finished executing on the server.
       * @param {object} thisArg An optional object to use as 'this' in your callback function.
       */
      executeComponent(component, callback, thisArg) {
        if (Array.isArray(component)) {
          let valid = true;
          let _this = this;
          component.forEach((_c) => {
            if (!(_c instanceof NewgroundsIO.BaseComponent)) {
              if (!_this._verifyComponent(component)) valid = false;
              _c.setCore(_this);
            }
          });
          if (!valid) return;
        } else {
          if (!this._verifyComponent(component)) return;
          component.setCore(this);
        }

        let core = this;
        let request = this._getRequest(component);
        let response = new NewgroundsIO.objects.Response();

        Scratch.canFetch(this.GATEWAY_URI).then((allowed) => {
          if (!allowed) return callback(null);
          // eslint-disable-next-line no-restricted-syntax
          var xhr = new XMLHttpRequest();
          xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
              var o_return;
              try {
                o_return = JSON.parse(xhr.responseText);
              } catch (e) {
                o_return = { success: false, app_id: core.app_id };
                o_return.error = { message: String(e), code: 8002 };
              }

              let response = core._populateResponse(o_return);

              core.dispatchEvent(
                new CustomEvent("serverResponse", { detail: response })
              );

              if (callback) {
                if (thisArg) callback.call(thisArg, response);
                else callback(response);
              }
            }
          };

          // jhax is a hack to get around JS frameworks that add a toJSON method to Array (wich breaks the native implementation).
          var jhax =
            typeof Array.prototype.toJSON != "undefined"
              ? Array.prototype.toJSON
              : null;
          if (jhax) delete Array.prototype.toJSON;

          let formData = new FormData();
          formData.append("request", JSON.stringify(request));
          if (jhax) Array.prototype.toJSON = jhax;

          xhr.open("POST", this.GATEWAY_URI, true);

          xhr.send(formData);
        });
      }

      /**
       * Executes a component in a new browser tab. Intended for redirects, such as
       * those used in Loader components.
       * @param {NewgroundsIO.BaseComponent} component Any NewgroundsIO.components.XXXXX object
       */
      loadComponent(component) {
        if (!this._verifyComponent(component)) return;

        component.setCore(this);

        let request = this._getRequest(component);

        let url =
          this.GATEWAY_URI +
          "?request=" +
          encodeURIComponent(JSON.stringify(request));
        Scratch.openWindow(url);
      }

      /**
       * Override this if you need to catch responses before they are dispatched to a callback.
       * @param {NewgroundsIO.objects.Response}
       */
      onServerResponse(response) {}

      /**
       * populates a response object with decoded server response data
       * @private
       */
      _populateResponse(response) {
        if (response.success) {
          if (Array.isArray(response.result)) {
            for (let i = 0; i < response.result.length; i++) {
              response.result[i] = this._populateResult(response.result[i]);
            }
          } else {
            response.result = this._populateResult(response.result);
          }
        } else {
          if (response.result) delete response.result;

          if (response.error)
            response.error = new NewgroundsIO.objects.Error(response.error);
        }

        response = new NewgroundsIO.objects.Response(response);
        response.setCore(this);
        return response;
      }

      /**
       * populates a result object with decoded server result data
       * @private
       */
      _populateResult(result) {
        let path = result.component.split(".");
        let _class = NewgroundsIO.results[path[0]][path[1]];
        if (!_class) return null;

        result.data.component = result.component;
        let res = new _class();
        res.fromJSON(result.data, this);

        return res;
      }

      /**
       * wraps a component object in an execute object
       * @private
       */
      _getExecute(component) {
        var execute = new NewgroundsIO.objects.Execute();
        execute.setComponent(component);
        execute.setCore(this);
        return execute;
      }

      /**
       * wraps a component object in request/execute objects
       * @private
       */
      _getRequest(component) {
        let execute;
        let _this = this;
        if (Array.isArray(component)) {
          execute = [];
          component.forEach((_c) => {
            let _ex = _this._getExecute(_c);
            execute.push(_ex);
          });
        } else {
          execute = this._getExecute(component);
        }

        let request = new NewgroundsIO.objects.Request({
          execute: execute,
        });

        if (this.debug) request.debug = true;

        request.setCore(this);
        return request;
      }

      _verifyComponent(component) {
        if (!(component instanceof NewgroundsIO.BaseComponent)) {
          console.error(
            "NewgroundsIO Type Mismatch: Expecting a NewgroundsIO.components.XXXX instance, got",
            component
          );
          return false;
        } else if (!component.isValid()) {
          return false;
        }

        return true;
      }
    }

    /** End Class NewgroundsIO.Core **/
    NewgroundsIO.Core = Core;
  })();

  (() => {
    /** Start Class NewgroundsIO.BaseObject **/

    /** The base object all models will use **/
    class BaseObject {
      /**
       * Used to tell serialization that this is an object model.
       * @type {string}
       */
      get type() {
        return this.__type;
      }

      /**
       * @private
       */
      __type = "object";

      /**
       * @private
       */
      __object = "BaseObject";

      /**
       * @private
       */
      __properties = [];

      /**
       * @private
       */
      __required = [];

      /**
       * @private
       */
      __ngioCore = null;

      /**
       * Returns true if all required properties are set.
       * @returns {boolean}
       */
      isValid() {
        if (this.__required.length === 0) return true;

        let valid = true;

        this.__required.forEach(function (property) {
          if (this[property] === null) {
            console.error(
              "NewgroundsIO Error: " +
                this.__object +
                " " +
                this.__type +
                " is invalid, missing value for '" +
                property +
                "'"
            );
            valid = false;
          } else if (this[property] instanceof NewgroundsIO.BaseObject) {
            if (!this[property].isValid()) valid = false;
          }
        }, this);

        return valid;
      }

      /**
       * Recursively links a core instance.
       * @param {NewgroundsIO} core
       */
      setCore(core) {
        this._doSetCore(core, []);
      }

      objectMap = {};
      arrayMap = {};

      fromJSON(obj, core) {
        var newobj = {};
        var i, j;

        this.setCore(core);

        for (i = 0; i < this.__properties.length; i++) {
          let prop = this.__properties[i];

          if (typeof obj[prop] !== "undefined" && obj[prop] !== null) {
            newobj[prop] = obj[prop];

            if (
              typeof this.arrayMap[prop] !== "undefined" &&
              Array.isArray(newobj[prop])
            ) {
              newobj[prop] = [];
              for (j = 0; j < obj[prop].length; j++) {
                let _class = NewgroundsIO.objects[this.arrayMap[prop]];
                newobj[prop][j] = new _class();
                newobj[prop][j].fromJSON(obj[prop][j], core);
              }
            } else if (typeof this.objectMap[prop] !== "undefined") {
              let _class = NewgroundsIO.objects[this.objectMap[prop]];
              newobj[prop] = new _class();
              newobj[prop].fromJSON(obj[prop], core);
            }

            this[prop] = newobj[prop];
          }
        }
      }

      /**
       * sets the core on all children, and prevents infinite recursion
       * @private
       */
      _doSetCore(core, updatedList) {
        if (!Array.isArray(updatedList)) updatedList = [];

        if (!(core instanceof NewgroundsIO.Core)) {
          console.error(
            "NewgroundsIO Error: Expecting NewgroundsIO.Core instance, got",
            core
          );
        } else {
          this.__ngioCore = core;
          updatedList.push(this);

          this.__properties.forEach(function (prop) {
            if (
              this[prop] instanceof NewgroundsIO.BaseObject &&
              updatedList.indexOf(this[prop]) === -1
            ) {
              this[prop]._doSetCore(core, updatedList);
            } else if (Array.isArray(this[prop])) {
              this[prop].forEach((child) => {
                if (
                  child instanceof NewgroundsIO.BaseObject &&
                  updatedList.indexOf(child) === -1
                ) {
                  child._doSetCore(core, updatedList);
                }
              }, this);
            }

            if (prop === "host" && !this.host) this.host = core.host;
          }, this);
        }
      }

      /**
       * Returns an object suitable for serializing to a JSON string.
       * @returns {object}
       */
      toJSON() {
        return this.__doToJSON();
      }

      /**
       * Does the actual serialization
       * @private
       */
      __doToJSON() {
        if (typeof this.__properties === "undefined") return {};

        let json = {};

        this.__properties.forEach(function (prop) {
          if (this[prop] !== null) {
            json[prop] =
              typeof this[prop].toJSON === "function"
                ? this[prop].toJSON()
                : this[prop];
          }
        }, this);

        return json;
      }

      /**
       * Serializes this object to an encrypted JSON string
       * @returns {string}
       */
      toSecureJSON() {
        if (
          !this.__ngioCore ||
          !(this.__ngioCore instanceof NewgroundsIO.Core)
        ) {
          console.error(
            "NewgroundsIO Error: Unable to create secure JSON object without calling setCore() first."
          );
          return this.__doToJSON();
        }

        return {
          secure: this.__ngioCore.encrypt(JSON.stringify(this.__doToJSON())),
        };
      }

      toString() {
        return this.__type;
      }

      clone(cloneTo) {
        if (typeof cloneTo === "undefined") cloneTo = new this.constructor();
        this.__properties.forEach((prop) => {
          cloneTo[prop] = this[prop];
        });
        cloneTo.__ngioCore = this.__ngioCore;
        return cloneTo;
      }
    }

    /** End Class NewgroundsIO.BaseObject **/
    NewgroundsIO.BaseObject = BaseObject;

    /** Start Class NewgroundsIO.BaseComponent **/

    /** The base object all models will use **/
    class BaseComponent extends BaseObject {
      /** Creates a new BaseComponent **/
      constructor() {
        super();
        this.__type = "component";
        this.__object = "BaseComponent";

        this.__properties = ["host", "echo"];

        this._echo = null;
      }

      /**
       * Many components need to pass the hosting website (or indicator this is a standalone app).
       * @type {string}
       */
      get host() {
        return this.__ngioCore ? this.__ngioCore.host : null;
      }

      /**
       * All components have an optional echo property that will return the same value in a server response.
       * @type {string}
       */
      get echo() {
        return this._echo;
      }

      set echo(value) {
        this.echo = "" + value;
      }
    }

    /** End Class NewgroundsIO.BaseComponent **/
    NewgroundsIO.BaseComponent = BaseComponent;

    /** Start Class NewgroundsIO.BaseResult **/

    /** The base object all models will use **/
    class BaseResult extends BaseObject {
      /** Creates a new BaseResult **/
      constructor() {
        super();
        this.__type = "result";
        this.__object = "BaseResult";

        this.__properties = ["echo", "error", "success"];

        this._echo = null;
        this._error = null;
        this._success = null;
      }

      /**
       * The name of the component that was called to yield this result.
       * @type {string}
       */
      get component() {
        return this.__object;
      }

      /**
       * All components can send an echo string. They will be returned in this property.
       * @type {string}
       */
      get echo() {
        return this._echo;
      }

      /**
       * If there was an error with the component, this will be an Error object.
       * @type {NewgroundsIO.objects.Error}
       */
      get error() {
        return this._error;
      }

      set error(value) {
        this._error = value;
      }

      /**
       * If the component was successful, this will be true. If not, you can check the error property for details.
       * @type {boolean}
       */
      get success() {
        return this._success ? true : false;
      }

      set success(value) {
        this._success = value ? true : false;
      }
    }

    /** End Class NewgroundsIO.BaseResult **/
    NewgroundsIO.BaseResult = BaseResult;
  })();

  /** Start Class NewgroundsIO.SessionState **/
  /**
   * Contains a bunch of constants representing the different states a user session can be in.
   * This is used by the NewgroundsIO.objects.Session object
   */
  NewgroundsIO.SessionState = {
    SESSION_UNINITIALIZED: "session-uninitialized", // We have never checked this session
    WAITING_FOR_SERVER: "waiting-for-server", // We are waiting for the server to send information
    LOGIN_REQUIRED: "login-required", // We have a session, but the user isn't logged in
    WAITING_FOR_USER: "waiting-for-user", // The user has opened the login page
    LOGIN_CANCELLED: "login-cancelled", // The user cancelled the login
    LOGIN_SUCCESSFUL: "login-successful", // The user is logged in, session is valid!
    LOGIN_FAILED: "login-failed", // The user failed their login attempt
    USER_LOGGED_OUT: "user-logged-out", // The user logged out
    SERVER_UNAVAILABLE: "server-unavailable", // The server is currently unavailable
    EXCEEDED_MAX_ATTEMPTS: "exceeded-max-attempts", // We've failed trying to connect too many times
  };

  /**
   * States in this list are considered "waiting". You don't need to make any API calls during these.
   */
  NewgroundsIO.SessionState.SESSION_WAITING = [
    NewgroundsIO.SessionState.SESSION_UNINITIALIZED,
    NewgroundsIO.SessionState.WAITING_FOR_SERVER,
    NewgroundsIO.SessionState.WAITING_FOR_USER,
    NewgroundsIO.SessionState.LOGIN_CANCELLED,
    NewgroundsIO.SessionStateLOGIN_FAILED,
  ];
  /** End Class NewgroundsIO.SessionState **/

  /* ====================== ./NewgroundsIO-JS/src/NewgroundsIO/components/App/checkSession.js ====================== */

  (() => {
    /** Start NewgroundsIO.components.App.checkSession **/

    class checkSession extends NewgroundsIO.BaseComponent {
      /**
       * Constructor
       */
      constructor() {
        super();
        let _this = this;

        this.__object = "App.checkSession";
        this.__requireSession = true;
      }
    }

    /** End Class NewgroundsIO.components.App.checkSession **/
    if (typeof NewgroundsIO.components.App === "undefined")
      NewgroundsIO.components.App = {};
    NewgroundsIO.components.App.checkSession = checkSession;
  })();

  /* ====================== ./NewgroundsIO-JS/src/NewgroundsIO/components/App/endSession.js ====================== */

  (() => {
    /** Start NewgroundsIO.components.App.endSession **/

    class endSession extends NewgroundsIO.BaseComponent {
      /**
       * Constructor
       */
      constructor() {
        super();
        let _this = this;

        this.__object = "App.endSession";
        this.__requireSession = true;
      }
    }

    /** End Class NewgroundsIO.components.App.endSession **/
    if (typeof NewgroundsIO.components.App === "undefined")
      NewgroundsIO.components.App = {};
    NewgroundsIO.components.App.endSession = endSession;
  })();

  /* ====================== ./NewgroundsIO-JS/src/NewgroundsIO/components/App/getCurrentVersion.js ====================== */

  (() => {
    /** Start NewgroundsIO.components.App.getCurrentVersion **/

    class getCurrentVersion extends NewgroundsIO.BaseComponent {
      /**
       * Constructor
       * @param {object} props An object of initial properties for this instance
       * @param {String} props.version The version number (in "X.Y.Z" format) of the client-side app. (default = "0.0.0")
       */
      constructor(props) {
        super();
        let _this = this;

        this.__object = "App.getCurrentVersion";
        ["version"].forEach((prop) => {
          if (_this.__properties.indexOf(prop) < 0)
            _this.__properties.push(prop);
        });
        if (props && typeof props === "object") {
          for (var i = 0; i < this.__properties.length; i++) {
            if (typeof props[this.__properties[i]] !== "undefined")
              this[this.__properties[i]] = props[this.__properties[i]];
          }
        }
      }

      /**
       * @private
       */
      #version = null;

      /**
       * The version number (in "X.Y.Z" format) of the client-side app. (default = "0.0.0")
       * @type {String}
       */
      get version() {
        return this.#version;
      }

      set version(_version) {
        if (typeof _version !== "string" && _version !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a string, got",
            _version
          );
        this.#version = String(_version);
      }
    }

    /** End Class NewgroundsIO.components.App.getCurrentVersion **/
    if (typeof NewgroundsIO.components.App === "undefined")
      NewgroundsIO.components.App = {};
    NewgroundsIO.components.App.getCurrentVersion = getCurrentVersion;
  })();

  /* ====================== ./NewgroundsIO-JS/src/NewgroundsIO/components/App/getHostLicense.js ====================== */

  (() => {
    /** Start NewgroundsIO.components.App.getHostLicense **/

    class getHostLicense extends NewgroundsIO.BaseComponent {
      /**
       * Constructor
       * @param {object} props An object of initial properties for this instance
       * @param {String} props.host The host domain to check (ei, somesite.com).
       */
      constructor(props) {
        super();
        let _this = this;

        this.__object = "App.getHostLicense";
        ["host"].forEach((prop) => {
          if (_this.__properties.indexOf(prop) < 0)
            _this.__properties.push(prop);
        });
        if (props && typeof props === "object") {
          for (var i = 0; i < this.__properties.length; i++) {
            if (typeof props[this.__properties[i]] !== "undefined")
              this[this.__properties[i]] = props[this.__properties[i]];
          }
        }
      }
    }

    /** End Class NewgroundsIO.components.App.getHostLicense **/
    if (typeof NewgroundsIO.components.App === "undefined")
      NewgroundsIO.components.App = {};
    NewgroundsIO.components.App.getHostLicense = getHostLicense;
  })();

  /* ====================== ./NewgroundsIO-JS/src/NewgroundsIO/components/App/logView.js ====================== */

  (() => {
    /** Start NewgroundsIO.components.App.logView **/

    class logView extends NewgroundsIO.BaseComponent {
      /**
       * Constructor
       * @param {object} props An object of initial properties for this instance
       * @param {String} props.host The domain hosting your app. Examples: "www.somesite.com", "localHost"
       */
      constructor(props) {
        super();
        let _this = this;

        this.__object = "App.logView";
        ["host"].forEach((prop) => {
          if (_this.__properties.indexOf(prop) < 0)
            _this.__properties.push(prop);
        });
        if (props && typeof props === "object") {
          for (var i = 0; i < this.__properties.length; i++) {
            if (typeof props[this.__properties[i]] !== "undefined")
              this[this.__properties[i]] = props[this.__properties[i]];
          }
        }
      }
    }

    /** End Class NewgroundsIO.components.App.logView **/
    if (typeof NewgroundsIO.components.App === "undefined")
      NewgroundsIO.components.App = {};
    NewgroundsIO.components.App.logView = logView;
  })();

  /* ====================== ./NewgroundsIO-JS/src/NewgroundsIO/components/App/startSession.js ====================== */

  (() => {
    /** Start NewgroundsIO.components.App.startSession **/

    class startSession extends NewgroundsIO.BaseComponent {
      /**
             * Constructor
             * @param {object} props An object of initial properties for this instance
             * @param {Boolean} props.force If true, will create a new session even if the user already has an existing one.
    undefined *        Note: Any previous session ids will no longer be valid if this is used.
            */
      constructor(props) {
        super();
        let _this = this;

        this.__object = "App.startSession";
        ["force"].forEach((prop) => {
          if (_this.__properties.indexOf(prop) < 0)
            _this.__properties.push(prop);
        });
        if (props && typeof props === "object") {
          for (var i = 0; i < this.__properties.length; i++) {
            if (typeof props[this.__properties[i]] !== "undefined")
              this[this.__properties[i]] = props[this.__properties[i]];
          }
        }
      }

      /**
       * @private
       */
      #force = null;

      /**
       * If true, will create a new session even if the user already has an existing one.
       *        Note: Any previous session ids will no longer be valid if this is used.
       * @type {Boolean}
       */
      get force() {
        return this.#force;
      }

      set force(_force) {
        if (
          typeof _force !== "boolean" &&
          typeof _force !== "number" &&
          _force !== null
        )
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a boolean, got",
            _force
          );
        this.#force = _force ? true : false;
      }
    }

    /** End Class NewgroundsIO.components.App.startSession **/
    if (typeof NewgroundsIO.components.App === "undefined")
      NewgroundsIO.components.App = {};
    NewgroundsIO.components.App.startSession = startSession;
  })();

  /* ====================== ./NewgroundsIO-JS/src/NewgroundsIO/components/CloudSave/clearSlot.js ====================== */

  (() => {
    /** Start NewgroundsIO.components.CloudSave.clearSlot **/

    class clearSlot extends NewgroundsIO.BaseComponent {
      /**
       * Constructor
       * @param {object} props An object of initial properties for this instance
       * @param {Number} props.id The slot number.
       */
      constructor(props) {
        super();
        let _this = this;

        this.__object = "CloudSave.clearSlot";
        this.__requireSession = true;
        ["id"].forEach((prop) => {
          if (_this.__properties.indexOf(prop) < 0)
            _this.__properties.push(prop);
        });
        if (props && typeof props === "object") {
          for (var i = 0; i < this.__properties.length; i++) {
            if (typeof props[this.__properties[i]] !== "undefined")
              this[this.__properties[i]] = props[this.__properties[i]];
          }
        }
      }

      /**
       * @private
       */
      #id = null;

      /**
       * The slot number.
       * @type {Number}
       */
      get id() {
        return this.#id;
      }

      set id(_id) {
        if (typeof _id !== "number" && _id !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a number, got",
            _id
          );
        else if (!Number.isInteger(_id) && _id !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be an integer, got a float"
          );
        this.#id = Number(_id);
        if (isNaN(this.#id)) this.#id = null;
      }
    }

    /** End Class NewgroundsIO.components.CloudSave.clearSlot **/
    if (typeof NewgroundsIO.components.CloudSave === "undefined")
      NewgroundsIO.components.CloudSave = {};
    NewgroundsIO.components.CloudSave.clearSlot = clearSlot;
  })();

  /* ====================== ./NewgroundsIO-JS/src/NewgroundsIO/components/CloudSave/loadSlot.js ====================== */

  (() => {
    /** Start NewgroundsIO.components.CloudSave.loadSlot **/

    class loadSlot extends NewgroundsIO.BaseComponent {
      /**
       * Constructor
       * @param {object} props An object of initial properties for this instance
       * @param {Number} props.id The slot number.
       * @param {String} props.app_id The App ID of another, approved app to load slot data from.
       */
      constructor(props) {
        super();
        let _this = this;

        this.__object = "CloudSave.loadSlot";
        this.__requireSession = true;
        ["id", "app_id"].forEach((prop) => {
          if (_this.__properties.indexOf(prop) < 0)
            _this.__properties.push(prop);
        });
        if (props && typeof props === "object") {
          for (var i = 0; i < this.__properties.length; i++) {
            if (typeof props[this.__properties[i]] !== "undefined")
              this[this.__properties[i]] = props[this.__properties[i]];
          }
        }
      }

      /**
       * @private
       */
      #id = null;

      /**
       * The slot number.
       * @type {Number}
       */
      get id() {
        return this.#id;
      }

      set id(_id) {
        if (typeof _id !== "number" && _id !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a number, got",
            _id
          );
        else if (!Number.isInteger(_id) && _id !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be an integer, got a float"
          );
        this.#id = Number(_id);
        if (isNaN(this.#id)) this.#id = null;
      }

      /**
       * @private
       */
      #app_id = null;

      /**
       * The App ID of another, approved app to load slot data from.
       * @type {String}
       */
      get app_id() {
        return this.#app_id;
      }

      set app_id(_app_id) {
        if (typeof _app_id !== "string" && _app_id !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a string, got",
            _app_id
          );
        this.#app_id = String(_app_id);
      }
    }

    /** End Class NewgroundsIO.components.CloudSave.loadSlot **/
    if (typeof NewgroundsIO.components.CloudSave === "undefined")
      NewgroundsIO.components.CloudSave = {};
    NewgroundsIO.components.CloudSave.loadSlot = loadSlot;
  })();

  /* ====================== ./NewgroundsIO-JS/src/NewgroundsIO/components/CloudSave/loadSlots.js ====================== */

  (() => {
    /** Start NewgroundsIO.components.CloudSave.loadSlots **/

    class loadSlots extends NewgroundsIO.BaseComponent {
      /**
       * Constructor
       * @param {object} props An object of initial properties for this instance
       * @param {String} props.app_id The App ID of another, approved app to load slot data from.
       */
      constructor(props) {
        super();
        let _this = this;

        this.__object = "CloudSave.loadSlots";
        this.__requireSession = true;
        ["app_id"].forEach((prop) => {
          if (_this.__properties.indexOf(prop) < 0)
            _this.__properties.push(prop);
        });
        if (props && typeof props === "object") {
          for (var i = 0; i < this.__properties.length; i++) {
            if (typeof props[this.__properties[i]] !== "undefined")
              this[this.__properties[i]] = props[this.__properties[i]];
          }
        }
      }

      /**
       * @private
       */
      #app_id = null;

      /**
       * The App ID of another, approved app to load slot data from.
       * @type {String}
       */
      get app_id() {
        return this.#app_id;
      }

      set app_id(_app_id) {
        if (typeof _app_id !== "string" && _app_id !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a string, got",
            _app_id
          );
        this.#app_id = String(_app_id);
      }
    }

    /** End Class NewgroundsIO.components.CloudSave.loadSlots **/
    if (typeof NewgroundsIO.components.CloudSave === "undefined")
      NewgroundsIO.components.CloudSave = {};
    NewgroundsIO.components.CloudSave.loadSlots = loadSlots;
  })();

  /* ====================== ./NewgroundsIO-JS/src/NewgroundsIO/components/CloudSave/setData.js ====================== */

  (() => {
    /** Start NewgroundsIO.components.CloudSave.setData **/

    class setData extends NewgroundsIO.BaseComponent {
      /**
       * Constructor
       * @param {object} props An object of initial properties for this instance
       * @param {Number} props.id The slot number.
       * @param {String} props.data The data you want to save.
       */
      constructor(props) {
        super();
        let _this = this;

        this.__object = "CloudSave.setData";
        this.__requireSession = true;
        ["id", "data"].forEach((prop) => {
          if (_this.__properties.indexOf(prop) < 0)
            _this.__properties.push(prop);
        });
        if (props && typeof props === "object") {
          for (var i = 0; i < this.__properties.length; i++) {
            if (typeof props[this.__properties[i]] !== "undefined")
              this[this.__properties[i]] = props[this.__properties[i]];
          }
        }
      }

      /**
       * @private
       */
      #id = null;

      /**
       * The slot number.
       * @type {Number}
       */
      get id() {
        return this.#id;
      }

      set id(_id) {
        if (typeof _id !== "number" && _id !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a number, got",
            _id
          );
        else if (!Number.isInteger(_id) && _id !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be an integer, got a float"
          );
        this.#id = Number(_id);
        if (isNaN(this.#id)) this.#id = null;
      }

      /**
       * @private
       */
      #data = null;

      /**
       * The data you want to save.
       * @type {String}
       */
      get data() {
        return this.#data;
      }

      set data(_data) {
        if (typeof _data !== "string" && _data !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a string, got",
            _data
          );
        this.#data = String(_data);
      }
    }

    /** End Class NewgroundsIO.components.CloudSave.setData **/
    if (typeof NewgroundsIO.components.CloudSave === "undefined")
      NewgroundsIO.components.CloudSave = {};
    NewgroundsIO.components.CloudSave.setData = setData;
  })();

  /* ====================== ./NewgroundsIO-JS/src/NewgroundsIO/components/Event/logEvent.js ====================== */

  (() => {
    /** Start NewgroundsIO.components.Event.logEvent **/

    class logEvent extends NewgroundsIO.BaseComponent {
      /**
       * Constructor
       * @param {object} props An object of initial properties for this instance
       * @param {String} props.host The domain hosting your app. Example: "newgrounds.com", "localHost"
       * @param {String} props.event_name The name of your custom event as defined in your Referrals & Events settings.
       */
      constructor(props) {
        super();
        let _this = this;

        this.__object = "Event.logEvent";
        ["host", "event_name"].forEach((prop) => {
          if (_this.__properties.indexOf(prop) < 0)
            _this.__properties.push(prop);
        });
        if (props && typeof props === "object") {
          for (var i = 0; i < this.__properties.length; i++) {
            if (typeof props[this.__properties[i]] !== "undefined")
              this[this.__properties[i]] = props[this.__properties[i]];
          }
        }
      }

      /**
       * @private
       */
      #event_name = null;

      /**
       * The name of your custom event as defined in your Referrals & Events settings.
       * @type {String}
       */
      get event_name() {
        return this.#event_name;
      }

      set event_name(_event_name) {
        if (typeof _event_name !== "string" && _event_name !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a string, got",
            _event_name
          );
        this.#event_name = String(_event_name);
      }
    }

    /** End Class NewgroundsIO.components.Event.logEvent **/
    if (typeof NewgroundsIO.components.Event === "undefined")
      NewgroundsIO.components.Event = {};
    NewgroundsIO.components.Event.logEvent = logEvent;
  })();

  /* ====================== ./NewgroundsIO-JS/src/NewgroundsIO/components/Gateway/getDatetime.js ====================== */

  (() => {
    /** Start NewgroundsIO.components.Gateway.getDatetime **/

    class getDatetime extends NewgroundsIO.BaseComponent {
      /**
       * Constructor
       */
      constructor() {
        super();
        let _this = this;

        this.__object = "Gateway.getDatetime";
      }
    }

    /** End Class NewgroundsIO.components.Gateway.getDatetime **/
    if (typeof NewgroundsIO.components.Gateway === "undefined")
      NewgroundsIO.components.Gateway = {};
    NewgroundsIO.components.Gateway.getDatetime = getDatetime;
  })();

  /* ====================== ./NewgroundsIO-JS/src/NewgroundsIO/components/Gateway/getVersion.js ====================== */

  (() => {
    /** Start NewgroundsIO.components.Gateway.getVersion **/

    class getVersion extends NewgroundsIO.BaseComponent {
      /**
       * Constructor
       */
      constructor() {
        super();
        let _this = this;

        this.__object = "Gateway.getVersion";
      }
    }

    /** End Class NewgroundsIO.components.Gateway.getVersion **/
    if (typeof NewgroundsIO.components.Gateway === "undefined")
      NewgroundsIO.components.Gateway = {};
    NewgroundsIO.components.Gateway.getVersion = getVersion;
  })();

  /* ====================== ./NewgroundsIO-JS/src/NewgroundsIO/components/Gateway/ping.js ====================== */

  (() => {
    /** Start NewgroundsIO.components.Gateway.ping **/

    class ping extends NewgroundsIO.BaseComponent {
      /**
       * Constructor
       */
      constructor() {
        super();
        let _this = this;

        this.__object = "Gateway.ping";
      }
    }

    /** End Class NewgroundsIO.components.Gateway.ping **/
    if (typeof NewgroundsIO.components.Gateway === "undefined")
      NewgroundsIO.components.Gateway = {};
    NewgroundsIO.components.Gateway.ping = ping;
  })();

  /* ====================== ./NewgroundsIO-JS/src/NewgroundsIO/components/Loader/loadAuthorUrl.js ====================== */

  (() => {
    /** Start NewgroundsIO.components.Loader.loadAuthorUrl **/

    class loadAuthorUrl extends NewgroundsIO.BaseComponent {
      /**
       * Constructor
       * @param {object} props An object of initial properties for this instance
       * @param {String} props.host The domain hosting your app. Example: "www.somesite.com", "localHost"
       * @param {Boolean} props.redirect Set this to false to get a JSON response containing the URL instead of doing an actual redirect.
       * @param {Boolean} props.log_stat Set this to false to skip logging this as a referral event.
       */
      constructor(props) {
        super();
        let _this = this;

        this.__object = "Loader.loadAuthorUrl";
        ["host", "redirect", "log_stat"].forEach((prop) => {
          if (_this.__properties.indexOf(prop) < 0)
            _this.__properties.push(prop);
        });
        if (props && typeof props === "object") {
          for (var i = 0; i < this.__properties.length; i++) {
            if (typeof props[this.__properties[i]] !== "undefined")
              this[this.__properties[i]] = props[this.__properties[i]];
          }
        }
      }

      /**
       * @private
       */
      #redirect = null;

      /**
       * Set this to false to get a JSON response containing the URL instead of doing an actual redirect.
       * @type {Boolean}
       */
      get redirect() {
        return this.#redirect;
      }

      set redirect(_redirect) {
        if (
          typeof _redirect !== "boolean" &&
          typeof _redirect !== "number" &&
          _redirect !== null
        )
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a boolean, got",
            _redirect
          );
        this.#redirect = _redirect ? true : false;
      }

      /**
       * @private
       */
      #log_stat = null;

      /**
       * Set this to false to skip logging this as a referral event.
       * @type {Boolean}
       */
      get log_stat() {
        return this.#log_stat;
      }

      set log_stat(_log_stat) {
        if (
          typeof _log_stat !== "boolean" &&
          typeof _log_stat !== "number" &&
          _log_stat !== null
        )
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a boolean, got",
            _log_stat
          );
        this.#log_stat = _log_stat ? true : false;
      }
    }

    /** End Class NewgroundsIO.components.Loader.loadAuthorUrl **/
    if (typeof NewgroundsIO.components.Loader === "undefined")
      NewgroundsIO.components.Loader = {};
    NewgroundsIO.components.Loader.loadAuthorUrl = loadAuthorUrl;
  })();

  /* ====================== ./NewgroundsIO-JS/src/NewgroundsIO/components/Loader/loadMoreGames.js ====================== */

  (() => {
    /** Start NewgroundsIO.components.Loader.loadMoreGames **/

    class loadMoreGames extends NewgroundsIO.BaseComponent {
      /**
       * Constructor
       * @param {object} props An object of initial properties for this instance
       * @param {String} props.host The domain hosting your app. Example: "www.somesite.com", "localHost"
       * @param {Boolean} props.redirect Set this to false to get a JSON response containing the URL instead of doing an actual redirect.
       * @param {Boolean} props.log_stat Set this to false to skip logging this as a referral event.
       */
      constructor(props) {
        super();
        let _this = this;

        this.__object = "Loader.loadMoreGames";
        ["host", "redirect", "log_stat"].forEach((prop) => {
          if (_this.__properties.indexOf(prop) < 0)
            _this.__properties.push(prop);
        });
        if (props && typeof props === "object") {
          for (var i = 0; i < this.__properties.length; i++) {
            if (typeof props[this.__properties[i]] !== "undefined")
              this[this.__properties[i]] = props[this.__properties[i]];
          }
        }
      }

      /**
       * @private
       */
      #redirect = null;

      /**
       * Set this to false to get a JSON response containing the URL instead of doing an actual redirect.
       * @type {Boolean}
       */
      get redirect() {
        return this.#redirect;
      }

      set redirect(_redirect) {
        if (
          typeof _redirect !== "boolean" &&
          typeof _redirect !== "number" &&
          _redirect !== null
        )
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a boolean, got",
            _redirect
          );
        this.#redirect = _redirect ? true : false;
      }

      /**
       * @private
       */
      #log_stat = null;

      /**
       * Set this to false to skip logging this as a referral event.
       * @type {Boolean}
       */
      get log_stat() {
        return this.#log_stat;
      }

      set log_stat(_log_stat) {
        if (
          typeof _log_stat !== "boolean" &&
          typeof _log_stat !== "number" &&
          _log_stat !== null
        )
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a boolean, got",
            _log_stat
          );
        this.#log_stat = _log_stat ? true : false;
      }
    }

    /** End Class NewgroundsIO.components.Loader.loadMoreGames **/
    if (typeof NewgroundsIO.components.Loader === "undefined")
      NewgroundsIO.components.Loader = {};
    NewgroundsIO.components.Loader.loadMoreGames = loadMoreGames;
  })();

  /* ====================== ./NewgroundsIO-JS/src/NewgroundsIO/components/Loader/loadNewgrounds.js ====================== */

  (() => {
    /** Start NewgroundsIO.components.Loader.loadNewgrounds **/

    class loadNewgrounds extends NewgroundsIO.BaseComponent {
      /**
       * Constructor
       * @param {object} props An object of initial properties for this instance
       * @param {String} props.host The domain hosting your app. Example: "www.somesite.com", "localHost"
       * @param {Boolean} props.redirect Set this to false to get a JSON response containing the URL instead of doing an actual redirect.
       * @param {Boolean} props.log_stat Set this to false to skip logging this as a referral event.
       */
      constructor(props) {
        super();
        let _this = this;

        this.__object = "Loader.loadNewgrounds";
        ["host", "redirect", "log_stat"].forEach((prop) => {
          if (_this.__properties.indexOf(prop) < 0)
            _this.__properties.push(prop);
        });
        if (props && typeof props === "object") {
          for (var i = 0; i < this.__properties.length; i++) {
            if (typeof props[this.__properties[i]] !== "undefined")
              this[this.__properties[i]] = props[this.__properties[i]];
          }
        }
      }

      /**
       * @private
       */
      #redirect = null;

      /**
       * Set this to false to get a JSON response containing the URL instead of doing an actual redirect.
       * @type {Boolean}
       */
      get redirect() {
        return this.#redirect;
      }

      set redirect(_redirect) {
        if (
          typeof _redirect !== "boolean" &&
          typeof _redirect !== "number" &&
          _redirect !== null
        )
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a boolean, got",
            _redirect
          );
        this.#redirect = _redirect ? true : false;
      }

      /**
       * @private
       */
      #log_stat = null;

      /**
       * Set this to false to skip logging this as a referral event.
       * @type {Boolean}
       */
      get log_stat() {
        return this.#log_stat;
      }

      set log_stat(_log_stat) {
        if (
          typeof _log_stat !== "boolean" &&
          typeof _log_stat !== "number" &&
          _log_stat !== null
        )
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a boolean, got",
            _log_stat
          );
        this.#log_stat = _log_stat ? true : false;
      }
    }

    /** End Class NewgroundsIO.components.Loader.loadNewgrounds **/
    if (typeof NewgroundsIO.components.Loader === "undefined")
      NewgroundsIO.components.Loader = {};
    NewgroundsIO.components.Loader.loadNewgrounds = loadNewgrounds;
  })();

  /* ====================== ./NewgroundsIO-JS/src/NewgroundsIO/components/Loader/loadOfficialUrl.js ====================== */

  (() => {
    /** Start NewgroundsIO.components.Loader.loadOfficialUrl **/

    class loadOfficialUrl extends NewgroundsIO.BaseComponent {
      /**
       * Constructor
       * @param {object} props An object of initial properties for this instance
       * @param {String} props.host The domain hosting your app. Example: "www.somesite.com", "localHost"
       * @param {Boolean} props.redirect Set this to false to get a JSON response containing the URL instead of doing an actual redirect.
       * @param {Boolean} props.log_stat Set this to false to skip logging this as a referral event.
       */
      constructor(props) {
        super();
        let _this = this;

        this.__object = "Loader.loadOfficialUrl";
        ["host", "redirect", "log_stat"].forEach((prop) => {
          if (_this.__properties.indexOf(prop) < 0)
            _this.__properties.push(prop);
        });
        if (props && typeof props === "object") {
          for (var i = 0; i < this.__properties.length; i++) {
            if (typeof props[this.__properties[i]] !== "undefined")
              this[this.__properties[i]] = props[this.__properties[i]];
          }
        }
      }

      /**
       * @private
       */
      #redirect = null;

      /**
       * Set this to false to get a JSON response containing the URL instead of doing an actual redirect.
       * @type {Boolean}
       */
      get redirect() {
        return this.#redirect;
      }

      set redirect(_redirect) {
        if (
          typeof _redirect !== "boolean" &&
          typeof _redirect !== "number" &&
          _redirect !== null
        )
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a boolean, got",
            _redirect
          );
        this.#redirect = _redirect ? true : false;
      }

      /**
       * @private
       */
      #log_stat = null;

      /**
       * Set this to false to skip logging this as a referral event.
       * @type {Boolean}
       */
      get log_stat() {
        return this.#log_stat;
      }

      set log_stat(_log_stat) {
        if (
          typeof _log_stat !== "boolean" &&
          typeof _log_stat !== "number" &&
          _log_stat !== null
        )
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a boolean, got",
            _log_stat
          );
        this.#log_stat = _log_stat ? true : false;
      }
    }

    /** End Class NewgroundsIO.components.Loader.loadOfficialUrl **/
    if (typeof NewgroundsIO.components.Loader === "undefined")
      NewgroundsIO.components.Loader = {};
    NewgroundsIO.components.Loader.loadOfficialUrl = loadOfficialUrl;
  })();

  /* ====================== ./NewgroundsIO-JS/src/NewgroundsIO/components/Loader/loadReferral.js ====================== */

  (() => {
    /** Start NewgroundsIO.components.Loader.loadReferral **/

    class loadReferral extends NewgroundsIO.BaseComponent {
      /**
       * Constructor
       * @param {object} props An object of initial properties for this instance
       * @param {String} props.host The domain hosting your app. Example: "www.somesite.com", "localHost"
       * @param {String} props.referral_name The name of the referral (as defined in your "Referrals & Events" settings).
       * @param {Boolean} props.redirect Set this to false to get a JSON response containing the URL instead of doing an actual redirect.
       * @param {Boolean} props.log_stat Set this to false to skip logging this as a referral event.
       */
      constructor(props) {
        super();
        let _this = this;

        this.__object = "Loader.loadReferral";
        ["host", "referral_name", "redirect", "log_stat"].forEach((prop) => {
          if (_this.__properties.indexOf(prop) < 0)
            _this.__properties.push(prop);
        });
        if (props && typeof props === "object") {
          for (var i = 0; i < this.__properties.length; i++) {
            if (typeof props[this.__properties[i]] !== "undefined")
              this[this.__properties[i]] = props[this.__properties[i]];
          }
        }
      }

      /**
       * @private
       */
      #referral_name = null;

      /**
       * The name of the referral (as defined in your "Referrals & Events" settings).
       * @type {String}
       */
      get referral_name() {
        return this.#referral_name;
      }

      set referral_name(_referral_name) {
        if (typeof _referral_name !== "string" && _referral_name !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a string, got",
            _referral_name
          );
        this.#referral_name = String(_referral_name);
      }

      /**
       * @private
       */
      #redirect = null;

      /**
       * Set this to false to get a JSON response containing the URL instead of doing an actual redirect.
       * @type {Boolean}
       */
      get redirect() {
        return this.#redirect;
      }

      set redirect(_redirect) {
        if (
          typeof _redirect !== "boolean" &&
          typeof _redirect !== "number" &&
          _redirect !== null
        )
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a boolean, got",
            _redirect
          );
        this.#redirect = _redirect ? true : false;
      }

      /**
       * @private
       */
      #log_stat = null;

      /**
       * Set this to false to skip logging this as a referral event.
       * @type {Boolean}
       */
      get log_stat() {
        return this.#log_stat;
      }

      set log_stat(_log_stat) {
        if (
          typeof _log_stat !== "boolean" &&
          typeof _log_stat !== "number" &&
          _log_stat !== null
        )
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a boolean, got",
            _log_stat
          );
        this.#log_stat = _log_stat ? true : false;
      }
    }

    /** End Class NewgroundsIO.components.Loader.loadReferral **/
    if (typeof NewgroundsIO.components.Loader === "undefined")
      NewgroundsIO.components.Loader = {};
    NewgroundsIO.components.Loader.loadReferral = loadReferral;
  })();

  /* ====================== ./NewgroundsIO-JS/src/NewgroundsIO/components/Medal/getList.js ====================== */

  (() => {
    /** Start NewgroundsIO.components.Medal.getList **/

    class getList extends NewgroundsIO.BaseComponent {
      /**
       * Constructor
       * @param {object} props An object of initial properties for this instance
       * @param {String} props.app_id The App ID of another, approved app to load medals from.
       */
      constructor(props) {
        super();
        let _this = this;

        this.__object = "Medal.getList";
        ["app_id"].forEach((prop) => {
          if (_this.__properties.indexOf(prop) < 0)
            _this.__properties.push(prop);
        });
        if (props && typeof props === "object") {
          for (var i = 0; i < this.__properties.length; i++) {
            if (typeof props[this.__properties[i]] !== "undefined")
              this[this.__properties[i]] = props[this.__properties[i]];
          }
        }
      }

      /**
       * @private
       */
      #app_id = null;

      /**
       * The App ID of another, approved app to load medals from.
       * @type {String}
       */
      get app_id() {
        return this.#app_id;
      }

      set app_id(_app_id) {
        if (typeof _app_id !== "string" && _app_id !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a string, got",
            _app_id
          );
        this.#app_id = String(_app_id);
      }
    }

    /** End Class NewgroundsIO.components.Medal.getList **/
    if (typeof NewgroundsIO.components.Medal === "undefined")
      NewgroundsIO.components.Medal = {};
    NewgroundsIO.components.Medal.getList = getList;
  })();

  /* ====================== ./NewgroundsIO-JS/src/NewgroundsIO/components/Medal/getMedalScore.js ====================== */

  (() => {
    /** Start NewgroundsIO.components.Medal.getMedalScore **/

    class getMedalScore extends NewgroundsIO.BaseComponent {
      /**
       * Constructor
       */
      constructor() {
        super();
        let _this = this;

        this.__object = "Medal.getMedalScore";
        this.__requireSession = true;
      }
    }

    /** End Class NewgroundsIO.components.Medal.getMedalScore **/
    if (typeof NewgroundsIO.components.Medal === "undefined")
      NewgroundsIO.components.Medal = {};
    NewgroundsIO.components.Medal.getMedalScore = getMedalScore;
  })();

  /* ====================== ./NewgroundsIO-JS/src/NewgroundsIO/components/Medal/unlock.js ====================== */

  (() => {
    /** Start NewgroundsIO.components.Medal.unlock **/

    class unlock extends NewgroundsIO.BaseComponent {
      /**
       * Constructor
       * @param {object} props An object of initial properties for this instance
       * @param {Number} props.id The numeric ID of the medal to unlock.
       */
      constructor(props) {
        super();
        let _this = this;

        this.__object = "Medal.unlock";
        this.__isSecure = true;
        this.__requireSession = true;
        ["id"].forEach((prop) => {
          if (_this.__properties.indexOf(prop) < 0)
            _this.__properties.push(prop);
        });
        if (props && typeof props === "object") {
          for (var i = 0; i < this.__properties.length; i++) {
            if (typeof props[this.__properties[i]] !== "undefined")
              this[this.__properties[i]] = props[this.__properties[i]];
          }
        }
      }

      /**
       * @private
       */
      #id = null;

      /**
       * The numeric ID of the medal to unlock.
       * @type {Number}
       */
      get id() {
        return this.#id;
      }

      set id(_id) {
        if (typeof _id !== "number" && _id !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a number, got",
            _id
          );
        else if (!Number.isInteger(_id) && _id !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be an integer, got a float"
          );
        this.#id = Number(_id);
        if (isNaN(this.#id)) this.#id = null;
      }
    }

    /** End Class NewgroundsIO.components.Medal.unlock **/
    if (typeof NewgroundsIO.components.Medal === "undefined")
      NewgroundsIO.components.Medal = {};
    NewgroundsIO.components.Medal.unlock = unlock;
  })();

  /* ====================== ./NewgroundsIO-JS/src/NewgroundsIO/components/ScoreBoard/getBoards.js ====================== */

  (() => {
    /** Start NewgroundsIO.components.ScoreBoard.getBoards **/

    class getBoards extends NewgroundsIO.BaseComponent {
      /**
       * Constructor
       */
      constructor() {
        super();
        let _this = this;

        this.__object = "ScoreBoard.getBoards";
      }
    }

    /** End Class NewgroundsIO.components.ScoreBoard.getBoards **/
    if (typeof NewgroundsIO.components.ScoreBoard === "undefined")
      NewgroundsIO.components.ScoreBoard = {};
    NewgroundsIO.components.ScoreBoard.getBoards = getBoards;
  })();

  /* ====================== ./NewgroundsIO-JS/src/NewgroundsIO/components/ScoreBoard/getScores.js ====================== */

  (() => {
    /** Start NewgroundsIO.components.ScoreBoard.getScores **/

    class getScores extends NewgroundsIO.BaseComponent {
      /**
       * Constructor
       * @param {object} props An object of initial properties for this instance
       * @param {Number} props.id The numeric ID of the scoreboard.
       * @param {String} props.period The time-frame to pull scores from (see notes for acceptable values).
       * @param {String} props.tag A tag to filter results by.
       * @param {Boolean} props.social If set to true, only social scores will be loaded (scores by the user and their friends). This param will be ignored if there is no valid session id and the 'user' param is absent.
       * @param {mixed} props.user A user's ID or name.  If 'social' is true, this user and their friends will be included. Otherwise, only scores for this user will be loaded. If this param is missing and there is a valid session id, that user will be used by default.
       * @param {Number} props.skip An integer indicating the number of scores to skip before starting the list. Default = 0.
       * @param {Number} props.limit An integer indicating the number of scores to include in the list. Default = 10.
       * @param {String} props.app_id The App ID of another, approved app to load scores from.
       */
      constructor(props) {
        super();
        let _this = this;

        this.__object = "ScoreBoard.getScores";
        [
          "id",
          "period",
          "tag",
          "social",
          "user",
          "skip",
          "limit",
          "app_id",
        ].forEach((prop) => {
          if (_this.__properties.indexOf(prop) < 0)
            _this.__properties.push(prop);
        });
        if (props && typeof props === "object") {
          for (var i = 0; i < this.__properties.length; i++) {
            if (typeof props[this.__properties[i]] !== "undefined")
              this[this.__properties[i]] = props[this.__properties[i]];
          }
        }
      }

      /**
       * @private
       */
      #id = null;

      /**
       * The numeric ID of the scoreboard.
       * @type {Number}
       */
      get id() {
        return this.#id;
      }

      set id(_id) {
        if (typeof _id !== "number" && _id !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a number, got",
            _id
          );
        else if (!Number.isInteger(_id) && _id !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be an integer, got a float"
          );
        this.#id = Number(_id);
        if (isNaN(this.#id)) this.#id = null;
      }

      /**
       * @private
       */
      #period = null;

      /**
       * The time-frame to pull scores from (see notes for acceptable values).
       * @type {String}
       */
      get period() {
        return this.#period;
      }

      set period(_period) {
        if (typeof _period !== "string" && _period !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a string, got",
            _period
          );
        this.#period = String(_period);
      }

      /**
       * @private
       */
      #tag = null;

      /**
       * A tag to filter results by.
       * @type {String}
       */
      get tag() {
        return this.#tag;
      }

      set tag(_tag) {
        if (typeof _tag !== "string" && _tag !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a string, got",
            _tag
          );
        this.#tag = String(_tag);
      }

      /**
       * @private
       */
      #social = null;

      /**
       * If set to true, only social scores will be loaded (scores by the user and their friends). This param will be ignored if there is no valid session id and the 'user' param is absent.
       * @type {Boolean}
       */
      get social() {
        return this.#social;
      }

      set social(_social) {
        if (
          typeof _social !== "boolean" &&
          typeof _social !== "number" &&
          _social !== null
        )
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a boolean, got",
            _social
          );
        this.#social = _social ? true : false;
      }

      /**
       * @private
       */
      #user = null;

      /**
       * A user's ID or name.  If 'social' is true, this user and their friends will be included. Otherwise, only scores for this user will be loaded. If this param is missing and there is a valid session id, that user will be used by default.
       * @type {mixed}
       */
      get user() {
        return this.#user;
      }

      set user(_user) {
        this.#user = _user; // mixed
      }

      /**
       * @private
       */
      #skip = null;

      /**
       * An integer indicating the number of scores to skip before starting the list. Default = 0.
       * @type {Number}
       */
      get skip() {
        return this.#skip;
      }

      set skip(_skip) {
        if (typeof _skip !== "number" && _skip !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a number, got",
            _skip
          );
        else if (!Number.isInteger(_skip) && _skip !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be an integer, got a float"
          );
        this.#skip = Number(_skip);
        if (isNaN(this.#skip)) this.#skip = null;
      }

      /**
       * @private
       */
      #limit = null;

      /**
       * An integer indicating the number of scores to include in the list. Default = 10.
       * @type {Number}
       */
      get limit() {
        return this.#limit;
      }

      set limit(_limit) {
        if (typeof _limit !== "number" && _limit !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a number, got",
            _limit
          );
        else if (!Number.isInteger(_limit) && _limit !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be an integer, got a float"
          );
        this.#limit = Number(_limit);
        if (isNaN(this.#limit)) this.#limit = null;
      }

      /**
       * @private
       */
      #app_id = null;

      /**
       * The App ID of another, approved app to load scores from.
       * @type {String}
       */
      get app_id() {
        return this.#app_id;
      }

      set app_id(_app_id) {
        if (typeof _app_id !== "string" && _app_id !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a string, got",
            _app_id
          );
        this.#app_id = String(_app_id);
      }
    }

    /** End Class NewgroundsIO.components.ScoreBoard.getScores **/
    if (typeof NewgroundsIO.components.ScoreBoard === "undefined")
      NewgroundsIO.components.ScoreBoard = {};
    NewgroundsIO.components.ScoreBoard.getScores = getScores;
  })();

  /* ====================== ./NewgroundsIO-JS/src/NewgroundsIO/components/ScoreBoard/postScore.js ====================== */

  (() => {
    /** Start NewgroundsIO.components.ScoreBoard.postScore **/

    class postScore extends NewgroundsIO.BaseComponent {
      /**
       * Constructor
       * @param {object} props An object of initial properties for this instance
       * @param {Number} props.id The numeric ID of the scoreboard.
       * @param {Number} props.value The int value of the score.
       * @param {String} props.tag An optional tag that can be used to filter scores via ScoreBoard.getScores
       */
      constructor(props) {
        super();
        let _this = this;

        this.__object = "ScoreBoard.postScore";
        this.__isSecure = true;
        this.__requireSession = true;
        ["id", "value", "tag"].forEach((prop) => {
          if (_this.__properties.indexOf(prop) < 0)
            _this.__properties.push(prop);
        });
        if (props && typeof props === "object") {
          for (var i = 0; i < this.__properties.length; i++) {
            if (typeof props[this.__properties[i]] !== "undefined")
              this[this.__properties[i]] = props[this.__properties[i]];
          }
        }
      }

      /**
       * @private
       */
      #id = null;

      /**
       * The numeric ID of the scoreboard.
       * @type {Number}
       */
      get id() {
        return this.#id;
      }

      set id(_id) {
        if (typeof _id !== "number" && _id !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a number, got",
            _id
          );
        else if (!Number.isInteger(_id) && _id !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be an integer, got a float"
          );
        this.#id = Number(_id);
        if (isNaN(this.#id)) this.#id = null;
      }

      /**
       * @private
       */
      #value = null;

      /**
       * The int value of the score.
       * @type {Number}
       */
      get value() {
        return this.#value;
      }

      set value(_value) {
        if (typeof _value !== "number" && _value !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a number, got",
            _value
          );
        else if (!Number.isInteger(_value) && _value !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be an integer, got a float"
          );
        this.#value = Number(_value);
        if (isNaN(this.#value)) this.#value = null;
      }

      /**
       * @private
       */
      #tag = null;

      /**
       * An optional tag that can be used to filter scores via ScoreBoard.getScores
       * @type {String}
       */
      get tag() {
        return this.#tag;
      }

      set tag(_tag) {
        if (typeof _tag !== "string" && _tag !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a string, got",
            _tag
          );
        this.#tag = String(_tag);
      }
    }

    /** End Class NewgroundsIO.components.ScoreBoard.postScore **/
    if (typeof NewgroundsIO.components.ScoreBoard === "undefined")
      NewgroundsIO.components.ScoreBoard = {};
    NewgroundsIO.components.ScoreBoard.postScore = postScore;
  })();

  /* ====================== ./NewgroundsIO-JS/src/NewgroundsIO/objects/Debug.js ====================== */

  (() => {
    /** Start NewgroundsIO.objects.Debug **/

    class Debug extends NewgroundsIO.BaseObject {
      /**
       * Constructor
       * @param {object} props An object of initial properties for this instance
       * @param {String} props.exec_time The time, in milliseconds, that it took to execute a request.
       * @param {NewgroundsIO.objects.Request} props.request A copy of the request object that was posted to the server.
       */
      constructor(props) {
        super();
        let _this = this;

        this.__object = "Debug";
        ["exec_time", "request"].forEach((prop) => {
          if (_this.__properties.indexOf(prop) < 0)
            _this.__properties.push(prop);
        });
        if (props && typeof props === "object") {
          for (var i = 0; i < this.__properties.length; i++) {
            if (typeof props[this.__properties[i]] !== "undefined")
              this[this.__properties[i]] = props[this.__properties[i]];
          }
        }
      }

      /**
       * @private
       */
      #exec_time = null;

      /**
       * The time, in milliseconds, that it took to execute a request.
       * @type {String}
       */
      get exec_time() {
        return this.#exec_time;
      }

      set exec_time(_exec_time) {
        if (typeof _exec_time !== "string" && _exec_time !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a string, got",
            _exec_time
          );
        this.#exec_time = String(_exec_time);
      }

      /**
       * @private
       */
      #request = null;

      /**
       * A copy of the request object that was posted to the server.
       * @type {NewgroundsIO.objects.Request}
       */
      get request() {
        return this.#request;
      }

      set request(_request) {
        if (
          !(_request instanceof NewgroundsIO.objects.Request) &&
          typeof _request === "object"
        )
          _request = new NewgroundsIO.objects.Request(_request);

        if (
          _request !== null &&
          !(_request instanceof NewgroundsIO.objects.Request)
        )
          console.warn(
            "Type Mismatch: expecting NewgroundsIO.objects.Request, got ",
            _request
          );

        this.#request = _request;
      }

      objectMap = { request: "Request" };
    }

    /** End Class NewgroundsIO.objects.Debug **/
    if (typeof NewgroundsIO.objects === "undefined") NewgroundsIO.objects = {};
    NewgroundsIO.objects.Debug = Debug;
  })();

  /* ====================== ./NewgroundsIO-JS/src/NewgroundsIO/objects/Error.js ====================== */

  (() => {
    /** Start NewgroundsIO.objects.Error **/

    class Error extends NewgroundsIO.BaseObject {
      /**
       * Constructor
       * @param {object} props An object of initial properties for this instance
       * @param {String} props.message Contains details about the error.
       * @param {Number} props.code A code indication the error type.
       */
      constructor(props) {
        super();
        let _this = this;

        this.__object = "Error";
        ["message", "code"].forEach((prop) => {
          if (_this.__properties.indexOf(prop) < 0)
            _this.__properties.push(prop);
        });
        if (props && typeof props === "object") {
          for (var i = 0; i < this.__properties.length; i++) {
            if (typeof props[this.__properties[i]] !== "undefined")
              this[this.__properties[i]] = props[this.__properties[i]];
          }
        }
      }

      /**
       * @private
       */
      #message = null;

      /**
       * Contains details about the error.
       * @type {String}
       */
      get message() {
        return this.#message;
      }

      set message(_message) {
        if (typeof _message !== "string" && _message !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a string, got",
            _message
          );
        this.#message = String(_message);
      }

      /**
       * @private
       */
      #code = null;

      /**
       * A code indication the error type.
       * @type {Number}
       */
      get code() {
        return this.#code;
      }

      set code(_code) {
        if (typeof _code !== "number" && _code !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a number, got",
            _code
          );
        else if (!Number.isInteger(_code) && _code !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be an integer, got a float"
          );
        this.#code = Number(_code);
        if (isNaN(this.#code)) this.#code = null;
      }
    }

    /** End Class NewgroundsIO.objects.Error **/
    if (typeof NewgroundsIO.objects === "undefined") NewgroundsIO.objects = {};
    NewgroundsIO.objects.Error = Error;
  })();

  /* ====================== ./NewgroundsIO-JS/src/NewgroundsIO/objects/Execute.js ====================== */

  (() => {
    /** Start NewgroundsIO.objects.Execute **/

    class Execute extends NewgroundsIO.BaseObject {
      /**
       * Constructor
       * @param {object} props An object of initial properties for this instance
       * @param {String} props.component The name of the component you want to call, ie 'App.connect'.
       * @param {(Object|Array.<Object>)} props.parameters An object of parameters you want to pass to the component.
       * @param {String} props.secure A an encrypted NewgroundsIO.objects.Execute object or array of NewgroundsIO.objects.Execute objects.
       * @param {mixed} props.echo An optional value that will be returned, verbatim, in the NewgroundsIO.objects.Result object.
       */
      constructor(props) {
        super();
        let _this = this;

        this.__object = "Execute";
        ["component", "parameters", "secure"].forEach((prop) => {
          if (_this.__properties.indexOf(prop) < 0)
            _this.__properties.push(prop);
        });
        if (props && typeof props === "object") {
          for (var i = 0; i < this.__properties.length; i++) {
            if (typeof props[this.__properties[i]] !== "undefined")
              this[this.__properties[i]] = props[this.__properties[i]];
          }
        }
      }

      /**
       * @private
       */
      #component = null;

      /**
       * The name of the component you want to call, ie 'App.connect'.
       * @type {String}
       */
      get component() {
        return this.#component;
      }

      set component(_component) {
        if (typeof _component !== "string" && _component !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a string, got",
            _component
          );
        this.#component = String(_component);
      }

      /**
       * @private
       */
      #parameters = null;

      /**
       * An object of parameters you want to pass to the component.
       * @type {(Object|Array.<Object>)}
       */
      get parameters() {
        return this.#parameters;
      }

      set parameters(_parameters) {
        if (Array.isArray(_parameters)) {
          let newArr = [];
          _parameters.forEach(function (val, index) {
            if (typeof val !== "object" && val !== null)
              console.warn(
                "NewgroundsIO Type Mismatch: Value should be a object, got",
                val
              );
            newArr[index] = val;
          });
          this.#parameters = newArr;
          return;
        }

        if (typeof _parameters !== "object" && _parameters !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a object, got",
            _parameters
          );
        this.#parameters = _parameters;
      }

      /**
       * @private
       */
      #secure = null;

      /**
       * A an encrypted NewgroundsIO.objects.Execute object or array of NewgroundsIO.objects.Execute objects.
       * @type {String}
       */
      get secure() {
        return this.#secure;
      }

      set secure(_secure) {
        if (typeof _secure !== "string" && _secure !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a string, got",
            _secure
          );
        this.#secure = String(_secure);
      }

      /**
       * @private
       */
      #componentObject = null;

      /**
       * Set a component object to execute
       * @param {NewgroundsIO.BaseComponent} component Any NGIO component object
       */
      setComponent(component) {
        if (!(component instanceof NewgroundsIO.BaseComponent))
          console.error(
            "NewgroundsIO Error: Expecting NewgroundsIO component, got " +
              typeof component
          );

        this.#componentObject = component;

        // set the string name of the component;
        this.component = component.__object;
        this.parameters = component.toJSON();
      }

      /**
       * Validate this object (overrides default valdator)
       * @return {Boolean}
       */
      isValid() {
        // must have a component set
        if (!this.component) {
          console.error("NewgroundsIO Error: Missing required component!");
        }

        // must be linked to a core NewgroundsIO instance
        if (!this.__ngioCore) {
          console.error(
            "NewgroundsIO Error: Must call setCore() before validating!"
          );
          return false;
        }

        // SHOULD have an actual component object. Validate that as well, if it exists
        if (this.#componentObject) {
          if (
            this.#componentObject.__requireSession &&
            !this.__ngioCore.session.isActive()
          ) {
            console.warn(
              "NewgroundsIO Warning: " +
                this.component +
                " can only be used with a valid user session."
            );
            this.__ngioCore.session.logProblems();
            return false;
          }

          return (
            this.#componentObject instanceof NewgroundsIO.BaseComponent &&
            this.#componentObject.isValid()
          );
        }

        return true;
      }

      /**
       * Override the default toJSON handler and use encryption on components that require it
       * @return {object} A native JS object that can be converted to a JSON string
       */
      toJSON() {
        if (this.#componentObject && this.#componentObject.__isSecure)
          return this.toSecureJSON();
        return super.toJSON();
      }
    }

    /** End Class NewgroundsIO.objects.Execute **/
    if (typeof NewgroundsIO.objects === "undefined") NewgroundsIO.objects = {};
    NewgroundsIO.objects.Execute = Execute;
  })();

  /* ====================== ./NewgroundsIO-JS/src/NewgroundsIO/objects/Medal.js ====================== */

  (() => {
    /** Start NewgroundsIO.objects.Medal **/

    class Medal extends NewgroundsIO.BaseObject {
      /**
       * Constructor
       * @param {object} props An object of initial properties for this instance
       * @param {Number} props.id The numeric ID of the medal.
       * @param {String} props.name The name of the medal.
       * @param {String} props.description A short description of the medal.
       * @param {String} props.icon The URL for the medal's icon.
       * @param {Number} props.value The medal's point value.
       * @param {Number} props.difficulty The difficulty id of the medal.
       * @param {Boolean} props.secret
       * @param {Boolean} props.unlocked This will only be set if a valid user session exists.
       */
      constructor(props) {
        super();
        let _this = this;

        this.__object = "Medal";
        [
          "id",
          "name",
          "description",
          "icon",
          "value",
          "difficulty",
          "secret",
          "unlocked",
        ].forEach((prop) => {
          if (_this.__properties.indexOf(prop) < 0)
            _this.__properties.push(prop);
        });
        if (props && typeof props === "object") {
          for (var i = 0; i < this.__properties.length; i++) {
            if (typeof props[this.__properties[i]] !== "undefined")
              this[this.__properties[i]] = props[this.__properties[i]];
          }
        }
      }

      /**
       * @private
       */
      #id = null;

      /**
       * The numeric ID of the medal.
       * @type {Number}
       */
      get id() {
        return this.#id;
      }

      set id(_id) {
        if (typeof _id !== "number" && _id !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a number, got",
            _id
          );
        else if (!Number.isInteger(_id) && _id !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be an integer, got a float"
          );
        this.#id = Number(_id);
        if (isNaN(this.#id)) this.#id = null;
      }

      /**
       * @private
       */
      #name = null;

      /**
       * The name of the medal.
       * @type {String}
       */
      get name() {
        return this.#name;
      }

      set name(_name) {
        if (typeof _name !== "string" && _name !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a string, got",
            _name
          );
        this.#name = String(_name);
      }

      /**
       * @private
       */
      #description = null;

      /**
       * A short description of the medal.
       * @type {String}
       */
      get description() {
        return this.#description;
      }

      set description(_description) {
        if (typeof _description !== "string" && _description !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a string, got",
            _description
          );
        this.#description = String(_description);
      }

      /**
       * @private
       */
      #icon = null;

      /**
       * The URL for the medal's icon.
       * @type {String}
       */
      get icon() {
        return this.#icon;
      }

      set icon(_icon) {
        if (typeof _icon !== "string" && _icon !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a string, got",
            _icon
          );
        this.#icon = String(_icon);
      }

      /**
       * @private
       */
      #value = null;

      /**
       * The medal's point value.
       * @type {Number}
       */
      get value() {
        return this.#value;
      }

      set value(_value) {
        if (typeof _value !== "number" && _value !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a number, got",
            _value
          );
        else if (!Number.isInteger(_value) && _value !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be an integer, got a float"
          );
        this.#value = Number(_value);
        if (isNaN(this.#value)) this.#value = null;
      }

      /**
       * @private
       */
      #difficulty = null;

      /**
       * The difficulty id of the medal.
       * @type {Number}
       */
      get difficulty() {
        return this.#difficulty;
      }

      set difficulty(_difficulty) {
        if (typeof _difficulty !== "number" && _difficulty !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a number, got",
            _difficulty
          );
        else if (!Number.isInteger(_difficulty) && _difficulty !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be an integer, got a float"
          );
        this.#difficulty = Number(_difficulty);
        if (isNaN(this.#difficulty)) this.#difficulty = null;
      }

      /**
       * @private
       */
      #secret = null;

      /**
       * @type {Boolean}
       */
      get secret() {
        return this.#secret;
      }

      set secret(_secret) {
        if (
          typeof _secret !== "boolean" &&
          typeof _secret !== "number" &&
          _secret !== null
        )
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a boolean, got",
            _secret
          );
        this.#secret = _secret ? true : false;
      }

      /**
       * @private
       */
      #unlocked = null;

      /**
       * This will only be set if a valid user session exists.
       * @type {Boolean}
       */
      get unlocked() {
        return this.#unlocked;
      }

      set unlocked(_unlocked) {
        if (
          typeof _unlocked !== "boolean" &&
          typeof _unlocked !== "number" &&
          _unlocked !== null
        )
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a boolean, got",
            _unlocked
          );
        this.#unlocked = _unlocked ? true : false;
      }

      /**
       * @callback responseCallback
       * @param {NewgroundsIO.objects.Response} serverResponse
       */

      /**
       * Unlocks this medal, then fires a callback.
       * @param {responseCallback} callback An optional function to call when the medal is unlocked on the server.
       * @param {object} thisArg An optional object to use as 'this' in your callback function.
       */
      unlock(callback, thisArg) {
        if (!this.__ngioCore) {
          console.error(
            "NewgroundsIO - Can not unlock medal object without attaching a NewgroundsIO.Core instance."
          );
          return;
        }

        var component = this.__ngioCore.getComponent("Medal.unlock", {
          id: this.id,
        });
        this.__ngioCore.executeComponent(component, callback, thisArg);
      }
    }

    /** End Class NewgroundsIO.objects.Medal **/
    if (typeof NewgroundsIO.objects === "undefined") NewgroundsIO.objects = {};
    NewgroundsIO.objects.Medal = Medal;
  })();

  /* ====================== ./NewgroundsIO-JS/src/NewgroundsIO/objects/Request.js ====================== */

  (() => {
    /** Start NewgroundsIO.objects.Request **/

    class Request extends NewgroundsIO.BaseObject {
      /**
       * Constructor
       * @param {object} props An object of initial properties for this instance
       * @param {String} props.app_id Your application's unique ID.
       * @param {(NewgroundsIO.objects.Execute|Array.<NewgroundsIO.objects.Execute>)} props.execute A NewgroundsIO.objects.Execute object, or array of one-or-more NewgroundsIO.objects.Execute objects.
       * @param {String} props.session_id An optional login session id.
       * @param {Boolean} props.debug If set to true, calls will be executed in debug mode.
       * @param {mixed} props.echo An optional value that will be returned, verbatim, in the NewgroundsIO.objects.Response object.
       */
      constructor(props) {
        super();
        let _this = this;

        this.__object = "Request";
        ["app_id", "execute", "session_id", "debug"].forEach((prop) => {
          if (_this.__properties.indexOf(prop) < 0)
            _this.__properties.push(prop);
        });
        if (props && typeof props === "object") {
          for (var i = 0; i < this.__properties.length; i++) {
            if (typeof props[this.__properties[i]] !== "undefined")
              this[this.__properties[i]] = props[this.__properties[i]];
          }
        }
      }

      /**
       * @private
       */
      #execute = null;

      /**
       * A NewgroundsIO.objects.Execute object, or array of one-or-more NewgroundsIO.objects.Execute objects.
       * @type {(NewgroundsIO.objects.Execute|Array.<NewgroundsIO.objects.Execute>)}
       */
      get execute() {
        return this.#execute;
      }

      set execute(_execute) {
        if (
          !Array.isArray(_execute) &&
          !(_execute instanceof NewgroundsIO.objects.Execute) &&
          typeof _execute === "object"
        )
          _execute = new NewgroundsIO.objects.Execute(_execute);

        if (Array.isArray(_execute)) {
          let newArr = [];
          _execute.forEach(function (val, index) {
            if (val !== null && !(val instanceof NewgroundsIO.objects.Execute))
              console.warn(
                "Type Mismatch: expecting NewgroundsIO.objects.Execute, got ",
                val
              );

            newArr[index] = val;
          });
          this.#execute = newArr;
          return;
        }

        if (
          _execute !== null &&
          !(_execute instanceof NewgroundsIO.objects.Execute)
        )
          console.warn(
            "Type Mismatch: expecting NewgroundsIO.objects.Execute, got ",
            _execute
          );

        this.#execute = _execute;
      }

      /**
       * @private
       */
      #debug = null;

      /**
       * If set to true, calls will be executed in debug mode.
       * @type {Boolean}
       */
      get debug() {
        return this.#debug;
      }

      set debug(_debug) {
        if (
          typeof _debug !== "boolean" &&
          typeof _debug !== "number" &&
          _debug !== null
        )
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a boolean, got",
            _debug
          );
        this.#debug = _debug ? true : false;
      }

      objectMap = { execute: "Execute" };

      arrayMap = { execute: "Execute" };

      /**
       * Gets the appID from a core object
       * @returns {string}
       */
      get app_id() {
        return this.__ngioCore ? this.__ngioCore.appID : null;
      }

      /**
       * Gets the Session ID from a core object
       * @returns {string}
       */
      get session_id() {
        return this.__ngioCore && this.__ngioCore.session
          ? this.__ngioCore.session.id
          : null;
      }
    }

    /** End Class NewgroundsIO.objects.Request **/
    if (typeof NewgroundsIO.objects === "undefined") NewgroundsIO.objects = {};
    NewgroundsIO.objects.Request = Request;
  })();

  /* ====================== ./NewgroundsIO-JS/src/NewgroundsIO/objects/Response.js ====================== */

  (() => {
    /** Start NewgroundsIO.objects.Response **/

    class Response extends NewgroundsIO.BaseObject {
      /**
       * Constructor
       * @param {object} props An object of initial properties for this instance
       * @param {String} props.app_id Your application's unique ID
       * @param {Boolean} props.success If false, there was a problem with your 'request' object. Details will be in the error property.
       * @param {NewgroundsIO.objects.Debug} props.debug Contains extra information you may need when debugging (debug mode only).
       * @param {(NewgroundsIO.BaseResult|Array.<NewgroundsIO.BaseResult>)} props.result This will be a NewgroundsIO.results.XXXXXX object, or an array containing one-or-more NewgroundsIO.results.XXXXXX objects.
       * @param {NewgroundsIO.objects.Error} props.error This will contain any error info if the success property is false.
       * @param {String} props.api_version If there was an error, this will contain the current version number of the API gateway.
       * @param {String} props.help_url If there was an error, this will contain the URL for our help docs.
       * @param {mixed} props.echo If you passed an 'echo' value in your request object, it will be echoed here.
       */
      constructor(props) {
        super();
        let _this = this;

        this.__object = "Response";
        [
          "app_id",
          "success",
          "debug",
          "result",
          "error",
          "api_version",
          "help_url",
        ].forEach((prop) => {
          if (_this.__properties.indexOf(prop) < 0)
            _this.__properties.push(prop);
        });
        if (props && typeof props === "object") {
          for (var i = 0; i < this.__properties.length; i++) {
            if (typeof props[this.__properties[i]] !== "undefined")
              this[this.__properties[i]] = props[this.__properties[i]];
          }
        }
      }

      /**
       * @private
       */
      #app_id = null;

      /**
       * Your application's unique ID
       * @type {String}
       */
      get app_id() {
        return this.#app_id;
      }

      set app_id(_app_id) {
        if (typeof _app_id !== "string" && _app_id !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a string, got",
            _app_id
          );
        this.#app_id = String(_app_id);
      }

      /**
       * @private
       */
      #success = null;

      /**
       * If false, there was a problem with your 'request' object. Details will be in the error property.
       * @type {Boolean}
       */
      get success() {
        return this.#success;
      }

      set success(_success) {
        if (
          typeof _success !== "boolean" &&
          typeof _success !== "number" &&
          _success !== null
        )
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a boolean, got",
            _success
          );
        this.#success = _success ? true : false;
      }

      /**
       * @private
       */
      #debug = null;

      /**
       * Contains extra information you may need when debugging (debug mode only).
       * @type {NewgroundsIO.objects.Debug}
       */
      get debug() {
        return this.#debug;
      }

      set debug(_debug) {
        if (
          !(_debug instanceof NewgroundsIO.objects.Debug) &&
          typeof _debug === "object"
        )
          _debug = new NewgroundsIO.objects.Debug(_debug);

        if (_debug !== null && !(_debug instanceof NewgroundsIO.objects.Debug))
          console.warn(
            "Type Mismatch: expecting NewgroundsIO.objects.Debug, got ",
            _debug
          );

        this.#debug = _debug;
      }

      /**
       * @private
       */
      #result = null;

      /**
       * This will be a NewgroundsIO.results.XXXXXX object, or an array containing one-or-more NewgroundsIO.results.XXXXXX objects.
       * @type {(NewgroundsIO.BaseResult|Array.<NewgroundsIO.BaseResult>)}
       */
      get result() {
        return this.#result;
      }

      set result(_result) {
        if (Array.isArray(_result)) {
          let newArr = [];
          _result.forEach(function (val, index) {
            if (!(val instanceof NewgroundsIO.BaseResult) && val !== null)
              console.warn(
                "NewgroundsIO Type Mismatch: Value should be a NewgroundsIO.results.XXXX instance, got",
                val
              );
            newArr[index] = val;
          });
          this.#result = newArr;
          return;
        }

        if (!(_result instanceof NewgroundsIO.BaseResult) && _result !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a NewgroundsIO.results.XXXX instance, got",
            _result
          );
        this.#result = _result;
      }

      /**
       * @private
       */
      #error = null;

      /**
       * This will contain any error info if the success property is false.
       * @type {NewgroundsIO.objects.Error}
       */
      get error() {
        return this.#error;
      }

      set error(_error) {
        if (
          !(_error instanceof NewgroundsIO.objects.Error) &&
          typeof _error === "object"
        )
          _error = new NewgroundsIO.objects.Error(_error);

        if (_error !== null && !(_error instanceof NewgroundsIO.objects.Error))
          console.warn(
            "Type Mismatch: expecting NewgroundsIO.objects.Error, got ",
            _error
          );

        this.#error = _error;
      }

      /**
       * @private
       */
      #api_version = null;

      /**
       * If there was an error, this will contain the current version number of the API gateway.
       * @type {String}
       */
      get api_version() {
        return this.#api_version;
      }

      set api_version(_api_version) {
        if (typeof _api_version !== "string" && _api_version !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a string, got",
            _api_version
          );
        this.#api_version = String(_api_version);
      }

      /**
       * @private
       */
      #help_url = null;

      /**
       * If there was an error, this will contain the URL for our help docs.
       * @type {String}
       */
      get help_url() {
        return this.#help_url;
      }

      set help_url(_help_url) {
        if (typeof _help_url !== "string" && _help_url !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a string, got",
            _help_url
          );
        this.#help_url = String(_help_url);
      }

      objectMap = { debug: "Debug", error: "Error" };
    }

    /** End Class NewgroundsIO.objects.Response **/
    if (typeof NewgroundsIO.objects === "undefined") NewgroundsIO.objects = {};
    NewgroundsIO.objects.Response = Response;
  })();

  /* ====================== ./NewgroundsIO-JS/src/NewgroundsIO/objects/SaveSlot.js ====================== */

  (() => {
    /** Start NewgroundsIO.objects.SaveSlot **/

    class SaveSlot extends NewgroundsIO.BaseObject {
      /**
       * Constructor
       * @param {object} props An object of initial properties for this instance
       * @param {Number} props.id The slot number.
       * @param {Number} props.size The size of the save data in bytes.
       * @param {String} props.datetime A date and time (in ISO 8601 format) representing when this slot was last saved.
       * @param {Number} props.timestamp A unix timestamp representing when this slot was last saved.
       * @param {String} props.url The URL containing the actual save data for this slot, or null if this slot has no data.
       */
      constructor(props) {
        super();
        let _this = this;

        this.__object = "SaveSlot";
        ["id", "size", "datetime", "timestamp", "url"].forEach((prop) => {
          if (_this.__properties.indexOf(prop) < 0)
            _this.__properties.push(prop);
        });
        if (props && typeof props === "object") {
          for (var i = 0; i < this.__properties.length; i++) {
            if (typeof props[this.__properties[i]] !== "undefined")
              this[this.__properties[i]] = props[this.__properties[i]];
          }
        }
      }

      /**
       * @private
       */
      #id = null;

      /**
       * The slot number.
       * @type {Number}
       */
      get id() {
        return this.#id;
      }

      set id(_id) {
        if (typeof _id !== "number" && _id !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a number, got",
            _id
          );
        else if (!Number.isInteger(_id) && _id !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be an integer, got a float"
          );
        this.#id = Number(_id);
        if (isNaN(this.#id)) this.#id = null;
      }

      /**
       * @private
       */
      #size = null;

      /**
       * The size of the save data in bytes.
       * @type {Number}
       */
      get size() {
        return this.#size;
      }

      set size(_size) {
        if (typeof _size !== "number" && _size !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a number, got",
            _size
          );
        else if (!Number.isInteger(_size) && _size !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be an integer, got a float"
          );
        this.#size = Number(_size);
        if (isNaN(this.#size)) this.#size = null;
      }

      /**
       * @private
       */
      #datetime = null;

      /**
       * A date and time (in ISO 8601 format) representing when this slot was last saved.
       * @type {String}
       */
      get datetime() {
        return this.#datetime;
      }

      set datetime(_datetime) {
        if (typeof _datetime !== "string" && _datetime !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a string, got",
            _datetime
          );
        this.#datetime = String(_datetime);
      }

      /**
       * @private
       */
      #timestamp = null;

      /**
       * A unix timestamp representing when this slot was last saved.
       * @type {Number}
       */
      get timestamp() {
        return this.#timestamp;
      }

      set timestamp(_timestamp) {
        if (typeof _timestamp !== "number" && _timestamp !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a number, got",
            _timestamp
          );
        else if (!Number.isInteger(_timestamp) && _timestamp !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be an integer, got a float"
          );
        this.#timestamp = Number(_timestamp);
        if (isNaN(this.#timestamp)) this.#timestamp = null;
      }

      /**
       * @private
       */
      #url = null;

      /**
       * The URL containing the actual save data for this slot, or null if this slot has no data.
       * @type {String}
       */
      get url() {
        return this.#url;
      }

      set url(_url) {
        if (typeof _url !== "string" && _url !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a string, got",
            _url
          );
        this.#url = String(_url);
      }

      /**
       * @callback getDataCallback
       * @param {string} data The data loaded from the server
       */

      /**
       * @callback responseCallback
       * @param {NewgroundsIO.objects.Response} serverResponse
       */

      /**
       * This will be true if this save slot has any saved data.
       */
      get hasData() {
        return this.url !== null;
      }

      /**
       * Loads the save file for this slot then passes its contents to a callback function.
       * @param {getDataCallback} callback A function to call when your data is loaded.
       * @param {object} thisArg An optional object to use as 'this' in your callback function.
       */
      getData(callback, thisArg) {
        if (typeof callback !== "function") {
          console.error("NewgroundsIO - Missing required callback function");
          return;
        }

        Scratch.canFetch(this.url).then((allowed) => {
          if (!allowed) return callback(null);
          // eslint-disable-next-line no-restricted-syntax
          var xhr = new XMLHttpRequest();
          xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
              if (thisArg) callback.call(thisArg, xhr.responseText);
              else callback(xhr.responseText);
            }
          };
          xhr.open("GET", this.url, true);
          xhr.send();
        });
      }

      /**
       * Unlocks this medal, then fires a callback.
       * @param {string} data The data, in a serialized string, you want to save.
       * @param {responseCallback} callback An optional function to call when the data is saved on the server.
       * @param {object} thisArg An optional object to use as 'this' in your callback function.
       */
      setData(data, callback, thisArg) {
        if (!this.__ngioCore) {
          console.error(
            "NewgroundsIO - Can not save data without attaching a NewgroundsIO.Core instance."
          );
          return;
        }

        var component = this.__ngioCore.getComponent("CloudSave.setData", {
          id: this.id,
          data: data,
        });
        this.__ngioCore.executeComponent(component, callback, thisArg);
      }

      /**
       * Clears all data from this slot, then fires a callback
       * @param {responseCallback} callback An optional function to call when the data is cleared from the server.
       * @param {object} thisArg An optional object to use as 'this' in your callback function.
       */
      clearData(callback, thisArg) {
        if (!this.__ngioCore) {
          console.error(
            "NewgroundsIO - Can not clear data without attaching a NewgroundsIO.Core instance."
          );
          return;
        }
        this.#url = null;
        var component = this.__ngioCore.getComponent("CloudSave.clearSlot", {
          id: this.id,
        });
        this.__ngioCore.executeComponent(component, callback, thisArg);
      }

      /**
       * Gets the date this slot was last updated.
       * @return {Date}
       */
      getDate() {
        if (this.hasData) return new Date(this.datetime);
        return null;
      }
    }

    /** End Class NewgroundsIO.objects.SaveSlot **/
    if (typeof NewgroundsIO.objects === "undefined") NewgroundsIO.objects = {};
    NewgroundsIO.objects.SaveSlot = SaveSlot;
  })();

  /* ====================== ./NewgroundsIO-JS/src/NewgroundsIO/objects/Score.js ====================== */

  (() => {
    /** Start NewgroundsIO.objects.Score **/

    class Score extends NewgroundsIO.BaseObject {
      /**
       * Constructor
       * @param {object} props An object of initial properties for this instance
       * @param {NewgroundsIO.objects.User} props.user The user who earned score. If this property is absent, the score belongs to the active user.
       * @param {Number} props.value The integer value of the score.
       * @param {String} props.formatted_value The score value in the format selected in your scoreboard settings.
       * @param {String} props.tag The tag attached to this score (if any).
       */
      constructor(props) {
        super();
        let _this = this;

        this.__object = "Score";
        ["user", "value", "formatted_value", "tag"].forEach((prop) => {
          if (_this.__properties.indexOf(prop) < 0)
            _this.__properties.push(prop);
        });
        if (props && typeof props === "object") {
          for (var i = 0; i < this.__properties.length; i++) {
            if (typeof props[this.__properties[i]] !== "undefined")
              this[this.__properties[i]] = props[this.__properties[i]];
          }
        }
      }

      /**
       * @private
       */
      #user = null;

      /**
       * The user who earned score. If this property is absent, the score belongs to the active user.
       * @type {NewgroundsIO.objects.User}
       */
      get user() {
        return this.#user;
      }

      set user(_user) {
        if (
          !(_user instanceof NewgroundsIO.objects.User) &&
          typeof _user === "object"
        )
          _user = new NewgroundsIO.objects.User(_user);

        if (_user !== null && !(_user instanceof NewgroundsIO.objects.User))
          console.warn(
            "Type Mismatch: expecting NewgroundsIO.objects.User, got ",
            _user
          );

        this.#user = _user;
      }

      /**
       * @private
       */
      #value = null;

      /**
       * The integer value of the score.
       * @type {Number}
       */
      get value() {
        return this.#value;
      }

      set value(_value) {
        if (typeof _value !== "number" && _value !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a number, got",
            _value
          );
        else if (!Number.isInteger(_value) && _value !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be an integer, got a float"
          );
        this.#value = Number(_value);
        if (isNaN(this.#value)) this.#value = null;
      }

      /**
       * @private
       */
      #formatted_value = null;

      /**
       * The score value in the format selected in your scoreboard settings.
       * @type {String}
       */
      get formatted_value() {
        return this.#formatted_value;
      }

      set formatted_value(_formatted_value) {
        if (typeof _formatted_value !== "string" && _formatted_value !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a string, got",
            _formatted_value
          );
        this.#formatted_value = String(_formatted_value);
      }

      /**
       * @private
       */
      #tag = null;

      /**
       * The tag attached to this score (if any).
       * @type {String}
       */
      get tag() {
        return this.#tag;
      }

      set tag(_tag) {
        if (typeof _tag !== "string" && _tag !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a string, got",
            _tag
          );
        this.#tag = String(_tag);
      }

      objectMap = { user: "User" };
    }

    /** End Class NewgroundsIO.objects.Score **/
    if (typeof NewgroundsIO.objects === "undefined") NewgroundsIO.objects = {};
    NewgroundsIO.objects.Score = Score;
  })();

  /* ====================== ./NewgroundsIO-JS/src/NewgroundsIO/objects/ScoreBoard.js ====================== */

  (() => {
    /** Start NewgroundsIO.objects.ScoreBoard **/

    class ScoreBoard extends NewgroundsIO.BaseObject {
      /**
       * Constructor
       * @param {object} props An object of initial properties for this instance
       * @param {Number} props.id The numeric ID of the scoreboard.
       * @param {String} props.name The name of the scoreboard.
       */
      constructor(props) {
        super();
        let _this = this;

        this.__object = "ScoreBoard";
        ["id", "name"].forEach((prop) => {
          if (_this.__properties.indexOf(prop) < 0)
            _this.__properties.push(prop);
        });
        if (props && typeof props === "object") {
          for (var i = 0; i < this.__properties.length; i++) {
            if (typeof props[this.__properties[i]] !== "undefined")
              this[this.__properties[i]] = props[this.__properties[i]];
          }
        }
      }

      /**
       * @private
       */
      #id = null;

      /**
       * The numeric ID of the scoreboard.
       * @type {Number}
       */
      get id() {
        return this.#id;
      }

      set id(_id) {
        if (typeof _id !== "number" && _id !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a number, got",
            _id
          );
        else if (!Number.isInteger(_id) && _id !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be an integer, got a float"
          );
        this.#id = Number(_id);
        if (isNaN(this.#id)) this.#id = null;
      }

      /**
       * @private
       */
      #name = null;

      /**
       * The name of the scoreboard.
       * @type {String}
       */
      get name() {
        return this.#name;
      }

      set name(_name) {
        if (typeof _name !== "string" && _name !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a string, got",
            _name
          );
        this.#name = String(_name);
      }

      /**
       * @callback responseCallback
       * @param {NewgroundsIO.objects.Response} serverResponse
       */

      /**
       * Unlocks this medal, then fires a callback.
       * @param {object} options Options for what scores to look up.
       * @param {string} options.period The overall period to retrieve from. Can be D, W, M, Y or A.
       * @param {string} options.tag An optional tag to filter on.
       * @param {boolean} options.social Set to true to only see scores from friends.
       * @param {Number} options.skip The number of scores to skip.
       * @param {Number} options.limit The total number of scores to load.
       * @param {responseCallback} callback An function to call when the scores have been loaded.
       * @param {object} thisArg An optional object to use as 'this' in your callback function.
       */
      getScores(options, callback, thisArg) {
        if (!this.__ngioCore) {
          console.error(
            "NewgroundsIO - Can not get scores without attaching a NewgroundsIO.Core instance."
          );
          return;
        }

        // if not using options, 2nd and 3rd params can be used for callback and thisArg
        if (typeof options === "function") {
          thisArg = callback;
          callback = options;
          options = {};
        }

        if (!options) options = {};
        options.id = this.id;

        var component = this.__ngioCore.getComponent(
          "ScoreBoard.getScores",
          options
        );
        this.__ngioCore.executeComponent(component, callback, thisArg);
      }

      /**
       * Posts a score to the scoreboard.
       * @param {number} value The value to post.
       * @param {string} tag An optional tag to filter on.
       * @param {responseCallback} callback An optional function to call when the score is posted to the server.
       * @param {object} thisArg An optional object to use as 'this' in your callback function.
       */
      postScore(value, tag, callback, thisArg) {
        if (!this.__ngioCore) {
          console.error(
            "NewgroundsIO - Can not post scores without attaching a NewgroundsIO.Core instance."
          );
          return;
        }

        // if not using a tag, 2nd and 3rd params can be used for callback and thisArg
        if (typeof tag == "function") {
          thisArg = callback;
          callback = tag;
          tag = null;
        }

        var component = this.__ngioCore.getComponent("ScoreBoard.postScore", {
          id: this.id,
          value: value,
          tag: tag,
        });
        this.__ngioCore.executeComponent(component, callback, thisArg);
      }
    }

    /** End Class NewgroundsIO.objects.ScoreBoard **/
    if (typeof NewgroundsIO.objects === "undefined") NewgroundsIO.objects = {};
    NewgroundsIO.objects.ScoreBoard = ScoreBoard;
  })();

  /* ====================== ./NewgroundsIO-JS/src/NewgroundsIO/objects/Session.js ====================== */

  (() => {
    /** Start NewgroundsIO.objects.Session **/

    class Session extends NewgroundsIO.BaseObject {
      /**
       * Constructor
       * @param {object} props An object of initial properties for this instance
       * @param {String} props.id A unique session identifier
       * @param {NewgroundsIO.objects.User} props.user If the user has not signed in, or granted access to your app, this will be null
       * @param {Boolean} props.expired If true, the session_id is expired. Use App.startSession to get a new one.
       * @param {Boolean} props.remember If true, the user would like you to remember their session id.
       * @param {String} props.passport_url If the session has no associated user but is not expired, this property will provide a URL that can be used to sign the user in.
       */
      constructor(props) {
        super();
        let _this = this;

        this.__object = "Session";
        ["id", "user", "expired", "remember", "passport_url"].forEach(
          (prop) => {
            if (_this.__properties.indexOf(prop) < 0)
              _this.__properties.push(prop);
          }
        );
        if (props && typeof props === "object") {
          for (var i = 0; i < this.__properties.length; i++) {
            if (typeof props[this.__properties[i]] !== "undefined")
              this[this.__properties[i]] = props[this.__properties[i]];
          }
        }
      }

      /**
       * @private
       */
      #id = null;

      /**
       * A unique session identifier
       * @type {String}
       */
      get id() {
        return this.#id;
      }

      set id(_id) {
        if (typeof _id !== "string" && _id !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a string, got",
            _id
          );
        this.#id = String(_id);
      }

      /**
       * @private
       */
      #user = null;

      /**
       * If the user has not signed in, or granted access to your app, this will be null
       * @type {NewgroundsIO.objects.User}
       */
      get user() {
        return this.#user;
      }

      set user(_user) {
        if (
          !(_user instanceof NewgroundsIO.objects.User) &&
          typeof _user === "object"
        )
          _user = new NewgroundsIO.objects.User(_user);

        if (_user !== null && !(_user instanceof NewgroundsIO.objects.User))
          console.warn(
            "Type Mismatch: expecting NewgroundsIO.objects.User, got ",
            _user
          );

        this.#user = _user;
      }

      /**
       * @private
       */
      #expired = null;

      /**
       * If true, the session_id is expired. Use App.startSession to get a new one.
       * @type {Boolean}
       */
      get expired() {
        return this.#expired;
      }

      set expired(_expired) {
        if (
          typeof _expired !== "boolean" &&
          typeof _expired !== "number" &&
          _expired !== null
        )
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a boolean, got",
            _expired
          );
        this.#expired = _expired ? true : false;
      }

      /**
       * @private
       */
      #remember = null;

      /**
       * If true, the user would like you to remember their session id.
       * @type {Boolean}
       */
      get remember() {
        return this.#remember;
      }

      set remember(_remember) {
        if (
          typeof _remember !== "boolean" &&
          typeof _remember !== "number" &&
          _remember !== null
        )
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a boolean, got",
            _remember
          );
        this.#remember = _remember ? true : false;
      }

      /**
       * @private
       */
      #passport_url = null;

      /**
       * If the session has no associated user but is not expired, this property will provide a URL that can be used to sign the user in.
       * @type {String}
       */
      get passport_url() {
        return this.#passport_url;
      }

      set passport_url(_passport_url) {
        if (typeof _passport_url !== "string" && _passport_url !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a string, got",
            _passport_url
          );
        this.#passport_url = String(_passport_url);
      }

      objectMap = { user: "User" };

      /**
       * The current state of this session.
       * @private
       */
      #status = NewgroundsIO.SessionState.SESSION_UNINITIALIZED;

      /**
       * The status from the last time update() was called.
       * @private
       */
      #lastStatus = null;

      /**
       * Will be true if the status was changed on an update call.
       * @private
       */
      #statusChanged = false;

      /**
       * The last time update() was called. (Start in the past so update() will work immediately.)
       * @private
       */
      #lastUpdate = new Date(new Date().getTime() - 30000);

      /**
       * If false, update() will end immediately when called.
       * @private
       */
      #canUpdate = true;

      /**
       * The mode we'll use to check the status of this session.
       * @private
       */
      #mode = "expired";

      /**
       * The total number of attempts we've tried to contact the server without success.
       * @private
       */
      #totalAttempts = 0;

      /**
       * TThe max number of attempts we can make to the server without success before we give up.
       * @private
       */
      #maxAttempts = 5;

      /**
       * Stores a session ID from the game's URI if hosted on Newgrounds.
       * @private
       */
      #uri_id = null;

      /**
       * Stores a session ID that was saved from a Passport login.
       * @private
       */
      #saved_id = null;

      /**
       * @callback responseCallback
       * @param {NewgroundsIO.objects.Response} serverResponse
       */

      /**
       * The current state of this session.
       * @type {string}
       */
      get status() {
        return this.#status;
      }

      /**
       * Will be true if the session state changed the last time update() was called.
       * @type {boolean}
       */
      get statusChanged() {
        return this.#statusChanged;
      }

      /**
       * Will be true if the current state is one where we are waiting for something to happen.
       * @type {boolean}
       */
      get waiting() {
        return this.#lastStatus != this.status;
      }

      /**
       * The localStorage key used to save a session id.
       * @type {boolean}
       */
      get storageKey() {
        return this.__ngioCore
          ? "_ngio_" + this.__ngioCore.appID + "_session_"
          : null;
      }

      /**
       * resets everything except the session id.
       * @private
       */
      resetSession() {
        this.#uri_id = null;
        this.#saved_id = null;
        this.remember = false;
        this.user = null;
        this.expired = false;

        localStorage.setItem(this.storageKey, null);
      }

      /**
       * Opens the Newgrounds Passport login page in a new browser tab.
       */
      openLoginPage() {
        if (!this.passport_url) {
          console.warn(
            "Can't open passport without getting a valis session first."
          );
          return;
        }

        this.#status = NewgroundsIO.SessionState.WAITING_FOR_USER;
        this.mode = "check";

        Scratch.openWindow(this.passport_url);
      }

      /**
       * Logs the user out of their current session, locally and on the server, then calls a function when complete.
       * @param {responseCallback} callback The callback function.
       * @param {object} thisArg An optional object to use as 'this' in your callback function.
       */
      logOut(callback, thisArg) {
        this.mode = "wait";
        this.endSession(callback, thisArg);
      }

      /**
       * Cancels a pending login attempt.
       * @param {function} newStatus An optional status code to use if LOGIN_CANCELLED is insufficient.
       */
      cancelLogin(newStatus) {
        this.endSession();
        if (typeof newStatus === "undefined")
          newStatus = NewgroundsIO.SessionState.LOGIN_CANCELLED;

        // clear the current session data, and set the appropriate cancel status
        this.resetSession();
        this.id = null;
        this.#status = newStatus;

        // this was a manual cancel, so we can reset the retry counter
        this.#totalAttempts = 0;

        // this was a manual cancel, so we can reset the retry counter
        this.#mode = "new";
        this.#lastUpdate = new Date(new Date().getTime() - 30000);
      }

      /**
       * @callback updateCallback
       * @param {string} status
       */

      /**
       * Call this to update the session process and call a function if there are any changes.
       * @param {updateCallback} callback The callback function.
       * @param {object} thisArg An optional object to use as 'this' in your callback function.
       */
      update(callback, thisArg) {
        this.#statusChanged = false;

        if (this.#lastStatus != this.status) {
          this.#statusChanged = true;
          this.#lastStatus = this.status;
          if (typeof callback === "function") {
            if (thisArg) callback.call(thisArg, this);
            else callback(this);
          }
        }

        // we can skip this whole routine if we're in the middle of checking things
        if (!this.#canUpdate || this.mode == "wait") return;
        if (!this.__ngioCore) {
          console.error(
            "NewgroundsIO - Can't update session without attaching a NewgroundsIO.Core instance."
          );
          this.#canUpdate = false;
          return;
        }

        // Server is not responding as expected, it may be down...  We'll set the session back to unintialized and try again
        if (this.status == NewgroundsIO.SessionState.SERVER_UNAVAILABLE) {
          // we've had too many failed attempts, time to stop retrying
          if (this.#totalAttempts >= this.#maxAttempts) {
            this.#status = NewgroundsIO.SessionState.EXCEEDED_MAX_ATTEMPTS;

            // next time our delay time has passed, we'll reset this, and try our sessions again
          } else {
            this.#status = NewgroundsIO.SessionState.SESSION_UNINITIALIZED;
            this.#totalAttempts++;
          }
        }

        // first time getting here (probably).  We need to see if we have any existing session data to try...
        if (this.status == NewgroundsIO.SessionState.SESSION_UNINITIALIZED) {
          this.#saved_id = localStorage.getItem(this.storageKey);

          // check if we have a session id from our URL params (hosted on Newgrounds)
          if (this.#uri_id) {
            this.id = this.#uri_id;

            // check if we have a saved session (hosted elsewhere or standalone app)
          } else if (this.#saved_id) {
            this.id = this.#saved_id;
          }

          // If we have an existing session, we'll use "check" mode to varify it, otherwise we'll nequest a "new" one.
          this.mode = this.id && this.id !== "null" ? "check" : "new";
        }

        // make sure at least 5 seconds pass between each API call so we don't get blocked by DDOS protection.
        var _now = new Date();
        var wait = _now - this.#lastUpdate;
        if (wait < 5000) return;

        this.#lastUpdate = _now;

        switch (this.mode) {
          // we don't have an existing session, so we're requesting a new one
          case "new":
            // change our mode to wait so the coroutine can finish before we make ny other API calls
            this.mode = "wait";
            this.startSession();
            break;

          // we have a session, we just need to check and see if there's a valid login attached to it
          case "check":
            // change our mode to wait so the coroutine can finish before we make ny other API calls
            this.mode = "wait";
            this.checkSession();
            break;
        }
      }

      // =================================== API CALLS/HANDLERS =================================== //

      /* App.startSession */

      /**
       * This will reset our current session object, then make the API call to get a new session.
       */
      startSession() {
        // don't check for any new updates while we're starting the new session
        this.#canUpdate = false;

        // clear out any pre-existing session data
        this.resetSession();

        this.#status = NewgroundsIO.SessionState.WAITING_FOR_SERVER;

        var startSession = this.__ngioCore.getComponent("App.startSession");
        this.__ngioCore.executeComponent(
          startSession,
          this._onStartSession,
          this
        );
      }

      /**
       * Handles the acquisition of a new session id from the server.
       * @private
       */
      _onStartSession(response) {
        // The start session request was successful!
        if (response.success === true) {
          let result = response.result;

          if (Array.isArray(result)) {
            for (let i = 0; i < result.length; i++) {
              if (
                result[i] &&
                result[i].__object &&
                result[i].__object == "App.startSession"
              ) {
                result = result[i];
                break;
              }
            }
          }

          // save the new session data to this session object
          this.id = result.session.id;
          this.passport_url = result.session.passport_url;

          // update our session status. This will trigger the callback in our update loop.
          this.#status = NewgroundsIO.SessionState.LOGIN_REQUIRED;

          // The update loop needs to wait until the user clicks a login button
          this.mode = "wait";

          // Something went wrong!  (Good chance the servers are down)
        } else {
          this.#status = NewgroundsIO.SessionState.SERVER_UNAVAILABLE;
        }

        // Let our update loop know it can actually do stuff again
        this.#canUpdate = true;
      }

      /* App.checkSession */

      /**
       * This will call the API to see what the status of our current session is
       */
      checkSession() {
        // don't check for any new updates while we're checking session
        this.#canUpdate = false;

        var checkSession = this.__ngioCore.getComponent("App.checkSession");
        this.__ngioCore.executeComponent(
          checkSession,
          this._onCheckSession,
          this
        );
      }

      /**
       * Handles the response to checkSession. This may lead to a change in status if the user has signed in,
       * cancelled, or the session has expired.
       * @private
       */
      _onCheckSession(response) {
        // The API request was successful
        if (response.success === true) {
          // Our session either failed, or the user cancelled the login on the server.
          if (!response.result.success) {
            // clear our id, and cancel the login attempt
            this.id = null;
            this.cancelLogin(
              response.result.error.code === 111
                ? NewgroundsIO.SessionState.LOGIN_CANCELLED
                : NewgroundsIO.SessionState.LOGIN_FAILED
            );
          } else {
            // The session is expired
            if (response.result.session.expired) {
              // reset the session so it's like we never had one
              this.resetSession();
              this.id = null;
              this.#status = NewgroundsIO.SessionState.SESSION_UNINITIALIZED;

              // we have a valid user login attached!
            } else if (response.result.session.user !== null) {
              // store the user info, and update status
              this.user = response.result.session.user;
              this.#status = NewgroundsIO.SessionState.LOGIN_SUCCESSFUL;
              this.mode = "valid";

              // if the user selected to remember the login, save it now!
              if (response.result.session.remember) {
                this.#saved_id = this.id;
                this.remember = true;
                localStorage.setItem(this.storageKey, this.id);
              }

              // Nothing has changed, we'll have to check again in the next loop.
            } else {
              this.mode = "check";
            }
          }
        } else {
          // Something went wrong!  Servers may be down, or you got blocked for sending too many requests
          this.#status = NewgroundsIO.SessionState.SERVER_UNAVAILABLE;
        }

        // Let our update loop know it can actually do stuff again
        this.#canUpdate = true;
      }

      /* App.endSession */

      /**
       * This will end the current session on the server
       * @param {responseCallback} callback The callback function.
       * @param {object} thisArg An optional object to use as 'this' in your callback function.
       */
      endSession(callback, thisArg) {
        // don't check for any new updates while we're ending session
        this.#canUpdate = false;

        var endSession = this.__ngioCore.getComponent("App.endSession");
        var startSession = this.__ngioCore.getComponent("App.startSession");

        this.__ngioCore.queueComponent(endSession);
        this.__ngioCore.queueComponent(startSession);

        this.__ngioCore.executeQueue(function (response) {
          this._onEndSession(response);
          this._onStartSession(response);
          if (typeof callback === "function") {
            if (thisArg) callback.call(thisArg, this);
            else callback(this);
          }
        }, this);

        /*
                this.__ngioCore.executeComponent(endSession, function(response) {
                    this._onEndSession(response);
                    if (typeof(callback) === "function") {
                        if (thisArg) callback.call(thisArg, this);
                        else callback(this);
                    }
                }, this);
                */
      }

      /**
       * Handler for endSession. Resets the session locally
       * @private
       */
      _onEndSession(response) {
        // We'll just clear out the whole session, even if something failed.
        this.resetSession();
        this.id = null;
        this.user = null;
        this.passport_url = null;
        this.mode = "new";
        this.#status = NewgroundsIO.SessionState.USER_LOGGED_OUT;

        // Let our update loop know it can actually do stuff again
        this.#canUpdate = true;
      }
    }

    /** End Class NewgroundsIO.objects.Session **/
    if (typeof NewgroundsIO.objects === "undefined") NewgroundsIO.objects = {};
    NewgroundsIO.objects.Session = Session;
  })();

  /* ====================== ./NewgroundsIO-JS/src/NewgroundsIO/objects/User.js ====================== */

  (() => {
    /** Start NewgroundsIO.objects.User **/

    class User extends NewgroundsIO.BaseObject {
      /**
       * Constructor
       * @param {object} props An object of initial properties for this instance
       * @param {Number} props.id The user's numeric ID.
       * @param {String} props.name The user's textual name.
       * @param {NewgroundsIO.objects.UserIcons} props.icons The user's icon images.
       * @param {Boolean} props.supporter Returns true if the user has a Newgrounds Supporter upgrade.
       */
      constructor(props) {
        super();
        let _this = this;

        this.__object = "User";
        ["id", "name", "icons", "supporter"].forEach((prop) => {
          if (_this.__properties.indexOf(prop) < 0)
            _this.__properties.push(prop);
        });
        if (props && typeof props === "object") {
          for (var i = 0; i < this.__properties.length; i++) {
            if (typeof props[this.__properties[i]] !== "undefined")
              this[this.__properties[i]] = props[this.__properties[i]];
          }
        }
      }

      /**
       * @private
       */
      #id = null;

      /**
       * The user's numeric ID.
       * @type {Number}
       */
      get id() {
        return this.#id;
      }

      set id(_id) {
        if (typeof _id !== "number" && _id !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a number, got",
            _id
          );
        else if (!Number.isInteger(_id) && _id !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be an integer, got a float"
          );
        this.#id = Number(_id);
        if (isNaN(this.#id)) this.#id = null;
      }

      /**
       * @private
       */
      #name = null;

      /**
       * The user's textual name.
       * @type {String}
       */
      get name() {
        return this.#name;
      }

      set name(_name) {
        if (typeof _name !== "string" && _name !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a string, got",
            _name
          );
        this.#name = String(_name);
      }

      /**
       * @private
       */
      #icons = null;

      /**
       * The user's icon images.
       * @type {NewgroundsIO.objects.UserIcons}
       */
      get icons() {
        return this.#icons;
      }

      set icons(_icons) {
        if (
          !(_icons instanceof NewgroundsIO.objects.UserIcons) &&
          typeof _icons === "object"
        )
          _icons = new NewgroundsIO.objects.UserIcons(_icons);

        if (
          _icons !== null &&
          !(_icons instanceof NewgroundsIO.objects.UserIcons)
        )
          console.warn(
            "Type Mismatch: expecting NewgroundsIO.objects.UserIcons, got ",
            _icons
          );

        this.#icons = _icons;
      }

      /**
       * @private
       */
      #supporter = null;

      /**
       * Returns true if the user has a Newgrounds Supporter upgrade.
       * @type {Boolean}
       */
      get supporter() {
        return this.#supporter;
      }

      set supporter(_supporter) {
        if (
          typeof _supporter !== "boolean" &&
          typeof _supporter !== "number" &&
          _supporter !== null
        )
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a boolean, got",
            _supporter
          );
        this.#supporter = _supporter ? true : false;
      }

      objectMap = { icons: "UserIcons" };
    }

    /** End Class NewgroundsIO.objects.User **/
    if (typeof NewgroundsIO.objects === "undefined") NewgroundsIO.objects = {};
    NewgroundsIO.objects.User = User;
  })();

  /* ====================== ./NewgroundsIO-JS/src/NewgroundsIO/objects/UserIcons.js ====================== */

  (() => {
    /** Start NewgroundsIO.objects.UserIcons **/

    class UserIcons extends NewgroundsIO.BaseObject {
      /**
       * Constructor
       * @param {object} props An object of initial properties for this instance
       * @param {String} props.small The URL of the user's small icon
       * @param {String} props.medium The URL of the user's medium icon
       * @param {String} props.large The URL of the user's large icon
       */
      constructor(props) {
        super();
        let _this = this;

        this.__object = "UserIcons";
        ["small", "medium", "large"].forEach((prop) => {
          if (_this.__properties.indexOf(prop) < 0)
            _this.__properties.push(prop);
        });
        if (props && typeof props === "object") {
          for (var i = 0; i < this.__properties.length; i++) {
            if (typeof props[this.__properties[i]] !== "undefined")
              this[this.__properties[i]] = props[this.__properties[i]];
          }
        }
      }

      /**
       * @private
       */
      #small = null;

      /**
       * The URL of the user's small icon
       * @type {String}
       */
      get small() {
        return this.#small;
      }

      set small(_small) {
        if (typeof _small !== "string" && _small !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a string, got",
            _small
          );
        this.#small = String(_small);
      }

      /**
       * @private
       */
      #medium = null;

      /**
       * The URL of the user's medium icon
       * @type {String}
       */
      get medium() {
        return this.#medium;
      }

      set medium(_medium) {
        if (typeof _medium !== "string" && _medium !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a string, got",
            _medium
          );
        this.#medium = String(_medium);
      }

      /**
       * @private
       */
      #large = null;

      /**
       * The URL of the user's large icon
       * @type {String}
       */
      get large() {
        return this.#large;
      }

      set large(_large) {
        if (typeof _large !== "string" && _large !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a string, got",
            _large
          );
        this.#large = String(_large);
      }
    }

    /** End Class NewgroundsIO.objects.UserIcons **/
    if (typeof NewgroundsIO.objects === "undefined") NewgroundsIO.objects = {};
    NewgroundsIO.objects.UserIcons = UserIcons;
  })();

  /* ====================== ./NewgroundsIO-JS/src/NewgroundsIO/results/App/checkSession.js ====================== */

  (() => {
    /** Start NewgroundsIO.results.App.checkSession **/

    class checkSession extends NewgroundsIO.BaseResult {
      /**
       * Constructor
       * @param {object} props An object of initial properties for this instance
       * @param {NewgroundsIO.objects.Session} props.session
       */
      constructor(props) {
        super();
        let _this = this;

        this.__object = "App.checkSession";
        ["session"].forEach((prop) => {
          if (_this.__properties.indexOf(prop) < 0)
            _this.__properties.push(prop);
        });
        if (props && typeof props === "object") {
          for (var i = 0; i < this.__properties.length; i++) {
            if (typeof props[this.__properties[i]] !== "undefined")
              this[this.__properties[i]] = props[this.__properties[i]];
          }
        }
      }

      /**
       * @private
       */
      #session = null;

      /**
       * @type {NewgroundsIO.objects.Session}
       */
      get session() {
        return this.#session;
      }

      set session(_session) {
        if (
          !(_session instanceof NewgroundsIO.objects.Session) &&
          typeof _session === "object"
        )
          _session = new NewgroundsIO.objects.Session(_session);

        if (
          _session !== null &&
          !(_session instanceof NewgroundsIO.objects.Session)
        )
          console.warn(
            "Type Mismatch: expecting NewgroundsIO.objects.Session, got ",
            _session
          );

        this.#session = _session;
      }

      objectMap = { session: "Session" };
    }

    /** End Class NewgroundsIO.results.App.checkSession **/
    if (typeof NewgroundsIO.results.App === "undefined")
      NewgroundsIO.results.App = {};
    NewgroundsIO.results.App.checkSession = checkSession;
  })();

  /* ====================== ./NewgroundsIO-JS/src/NewgroundsIO/results/App/getCurrentVersion.js ====================== */

  (() => {
    /** Start NewgroundsIO.results.App.getCurrentVersion **/

    class getCurrentVersion extends NewgroundsIO.BaseResult {
      /**
       * Constructor
       * @param {object} props An object of initial properties for this instance
       * @param {String} props.current_version The version number of the app as defined in your "Version Control" settings.
       * @param {Boolean} props.client_deprecated Notes whether the client-side app is using a lower version number.
       */
      constructor(props) {
        super();
        let _this = this;

        this.__object = "App.getCurrentVersion";
        ["current_version", "client_deprecated"].forEach((prop) => {
          if (_this.__properties.indexOf(prop) < 0)
            _this.__properties.push(prop);
        });
        if (props && typeof props === "object") {
          for (var i = 0; i < this.__properties.length; i++) {
            if (typeof props[this.__properties[i]] !== "undefined")
              this[this.__properties[i]] = props[this.__properties[i]];
          }
        }
      }

      /**
       * @private
       */
      #current_version = null;

      /**
       * The version number of the app as defined in your "Version Control" settings.
       * @type {String}
       */
      get current_version() {
        return this.#current_version;
      }

      set current_version(_current_version) {
        if (typeof _current_version !== "string" && _current_version !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a string, got",
            _current_version
          );
        this.#current_version = String(_current_version);
      }

      /**
       * @private
       */
      #client_deprecated = null;

      /**
       * Notes whether the client-side app is using a lower version number.
       * @type {Boolean}
       */
      get client_deprecated() {
        return this.#client_deprecated;
      }

      set client_deprecated(_client_deprecated) {
        if (
          typeof _client_deprecated !== "boolean" &&
          typeof _client_deprecated !== "number" &&
          _client_deprecated !== null
        )
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a boolean, got",
            _client_deprecated
          );
        this.#client_deprecated = _client_deprecated ? true : false;
      }
    }

    /** End Class NewgroundsIO.results.App.getCurrentVersion **/
    if (typeof NewgroundsIO.results.App === "undefined")
      NewgroundsIO.results.App = {};
    NewgroundsIO.results.App.getCurrentVersion = getCurrentVersion;
  })();

  /* ====================== ./NewgroundsIO-JS/src/NewgroundsIO/results/App/getHostLicense.js ====================== */

  (() => {
    /** Start NewgroundsIO.results.App.getHostLicense **/

    class getHostLicense extends NewgroundsIO.BaseResult {
      /**
       * Constructor
       * @param {object} props An object of initial properties for this instance
       * @param {Boolean} props.host_approved
       */
      constructor(props) {
        super();
        let _this = this;

        this.__object = "App.getHostLicense";
        ["host_approved"].forEach((prop) => {
          if (_this.__properties.indexOf(prop) < 0)
            _this.__properties.push(prop);
        });
        if (props && typeof props === "object") {
          for (var i = 0; i < this.__properties.length; i++) {
            if (typeof props[this.__properties[i]] !== "undefined")
              this[this.__properties[i]] = props[this.__properties[i]];
          }
        }
      }

      /**
       * @private
       */
      #host_approved = null;

      /**
       * @type {Boolean}
       */
      get host_approved() {
        return this.#host_approved;
      }

      set host_approved(_host_approved) {
        if (
          typeof _host_approved !== "boolean" &&
          typeof _host_approved !== "number" &&
          _host_approved !== null
        )
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a boolean, got",
            _host_approved
          );
        this.#host_approved = _host_approved ? true : false;
      }
    }

    /** End Class NewgroundsIO.results.App.getHostLicense **/
    if (typeof NewgroundsIO.results.App === "undefined")
      NewgroundsIO.results.App = {};
    NewgroundsIO.results.App.getHostLicense = getHostLicense;
  })();

  /* ====================== ./NewgroundsIO-JS/src/NewgroundsIO/results/App/startSession.js ====================== */

  (() => {
    /** Start NewgroundsIO.results.App.startSession **/

    class startSession extends NewgroundsIO.BaseResult {
      /**
       * Constructor
       * @param {object} props An object of initial properties for this instance
       * @param {NewgroundsIO.objects.Session} props.session
       */
      constructor(props) {
        super();
        let _this = this;

        this.__object = "App.startSession";
        ["session"].forEach((prop) => {
          if (_this.__properties.indexOf(prop) < 0)
            _this.__properties.push(prop);
        });
        if (props && typeof props === "object") {
          for (var i = 0; i < this.__properties.length; i++) {
            if (typeof props[this.__properties[i]] !== "undefined")
              this[this.__properties[i]] = props[this.__properties[i]];
          }
        }
      }

      /**
       * @private
       */
      #session = null;

      /**
       * @type {NewgroundsIO.objects.Session}
       */
      get session() {
        return this.#session;
      }

      set session(_session) {
        if (
          !(_session instanceof NewgroundsIO.objects.Session) &&
          typeof _session === "object"
        )
          _session = new NewgroundsIO.objects.Session(_session);

        if (
          _session !== null &&
          !(_session instanceof NewgroundsIO.objects.Session)
        )
          console.warn(
            "Type Mismatch: expecting NewgroundsIO.objects.Session, got ",
            _session
          );

        this.#session = _session;
      }

      objectMap = { session: "Session" };
    }

    /** End Class NewgroundsIO.results.App.startSession **/
    if (typeof NewgroundsIO.results.App === "undefined")
      NewgroundsIO.results.App = {};
    NewgroundsIO.results.App.startSession = startSession;
  })();

  /* ====================== ./NewgroundsIO-JS/src/NewgroundsIO/results/CloudSave/clearSlot.js ====================== */

  (() => {
    /** Start NewgroundsIO.results.CloudSave.clearSlot **/

    class clearSlot extends NewgroundsIO.BaseResult {
      /**
       * Constructor
       * @param {object} props An object of initial properties for this instance
       * @param {NewgroundsIO.objects.SaveSlot} props.slot A NewgroundsIO.objects.SaveSlot object.
       */
      constructor(props) {
        super();
        let _this = this;

        this.__object = "CloudSave.clearSlot";
        ["slot"].forEach((prop) => {
          if (_this.__properties.indexOf(prop) < 0)
            _this.__properties.push(prop);
        });
        if (props && typeof props === "object") {
          for (var i = 0; i < this.__properties.length; i++) {
            if (typeof props[this.__properties[i]] !== "undefined")
              this[this.__properties[i]] = props[this.__properties[i]];
          }
        }
      }

      /**
       * @private
       */
      #slot = null;

      /**
       * A NewgroundsIO.objects.SaveSlot object.
       * @type {NewgroundsIO.objects.SaveSlot}
       */
      get slot() {
        return this.#slot;
      }

      set slot(_slot) {
        if (
          !(_slot instanceof NewgroundsIO.objects.SaveSlot) &&
          typeof _slot === "object"
        )
          _slot = new NewgroundsIO.objects.SaveSlot(_slot);

        if (_slot !== null && !(_slot instanceof NewgroundsIO.objects.SaveSlot))
          console.warn(
            "Type Mismatch: expecting NewgroundsIO.objects.SaveSlot, got ",
            _slot
          );

        this.#slot = _slot;
      }

      objectMap = { slot: "SaveSlot" };
    }

    /** End Class NewgroundsIO.results.CloudSave.clearSlot **/
    if (typeof NewgroundsIO.results.CloudSave === "undefined")
      NewgroundsIO.results.CloudSave = {};
    NewgroundsIO.results.CloudSave.clearSlot = clearSlot;
  })();

  /* ====================== ./NewgroundsIO-JS/src/NewgroundsIO/results/CloudSave/loadSlot.js ====================== */

  (() => {
    /** Start NewgroundsIO.results.CloudSave.loadSlot **/

    class loadSlot extends NewgroundsIO.BaseResult {
      /**
       * Constructor
       * @param {object} props An object of initial properties for this instance
       * @param {NewgroundsIO.objects.SaveSlot} props.slot A NewgroundsIO.objects.SaveSlot object.
       * @param {String} props.app_id The App ID of another, approved app to load scores from.
       */
      constructor(props) {
        super();
        let _this = this;

        this.__object = "CloudSave.loadSlot";
        ["slot", "app_id"].forEach((prop) => {
          if (_this.__properties.indexOf(prop) < 0)
            _this.__properties.push(prop);
        });
        if (props && typeof props === "object") {
          for (var i = 0; i < this.__properties.length; i++) {
            if (typeof props[this.__properties[i]] !== "undefined")
              this[this.__properties[i]] = props[this.__properties[i]];
          }
        }
      }

      /**
       * @private
       */
      #slot = null;

      /**
       * A NewgroundsIO.objects.SaveSlot object.
       * @type {NewgroundsIO.objects.SaveSlot}
       */
      get slot() {
        return this.#slot;
      }

      set slot(_slot) {
        if (
          !(_slot instanceof NewgroundsIO.objects.SaveSlot) &&
          typeof _slot === "object"
        )
          _slot = new NewgroundsIO.objects.SaveSlot(_slot);

        if (_slot !== null && !(_slot instanceof NewgroundsIO.objects.SaveSlot))
          console.warn(
            "Type Mismatch: expecting NewgroundsIO.objects.SaveSlot, got ",
            _slot
          );

        this.#slot = _slot;
      }

      /**
       * @private
       */
      #app_id = null;

      /**
       * The App ID of another, approved app to load scores from.
       * @type {String}
       */
      get app_id() {
        return this.#app_id;
      }

      set app_id(_app_id) {
        if (typeof _app_id !== "string" && _app_id !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a string, got",
            _app_id
          );
        this.#app_id = String(_app_id);
      }

      objectMap = { slot: "SaveSlot" };
    }

    /** End Class NewgroundsIO.results.CloudSave.loadSlot **/
    if (typeof NewgroundsIO.results.CloudSave === "undefined")
      NewgroundsIO.results.CloudSave = {};
    NewgroundsIO.results.CloudSave.loadSlot = loadSlot;
  })();

  /* ====================== ./NewgroundsIO-JS/src/NewgroundsIO/results/CloudSave/loadSlots.js ====================== */

  (() => {
    /** Start NewgroundsIO.results.CloudSave.loadSlots **/

    class loadSlots extends NewgroundsIO.BaseResult {
      /**
       * Constructor
       * @param {object} props An object of initial properties for this instance
       * @param {Array.<NewgroundsIO.objects.SaveSlot>} props.slots An array of NewgroundsIO.objects.SaveSlot objects.
       * @param {String} props.app_id The App ID of another, approved app to load scores from.
       */
      constructor(props) {
        super();
        let _this = this;

        this.__object = "CloudSave.loadSlots";
        ["slots", "app_id"].forEach((prop) => {
          if (_this.__properties.indexOf(prop) < 0)
            _this.__properties.push(prop);
        });
        if (props && typeof props === "object") {
          for (var i = 0; i < this.__properties.length; i++) {
            if (typeof props[this.__properties[i]] !== "undefined")
              this[this.__properties[i]] = props[this.__properties[i]];
          }
        }
      }

      /**
       * @private
       */
      #slots = null;

      /**
       * An array of NewgroundsIO.objects.SaveSlot objects.
       * @type {Array.<NewgroundsIO.objects.SaveSlot>}
       */
      get slots() {
        return this.#slots;
      }

      set slots(_slots) {
        if (Array.isArray(_slots)) {
          let newArr = [];
          _slots.forEach(function (val, index) {
            if (val !== null && !(val instanceof NewgroundsIO.objects.SaveSlot))
              console.warn(
                "Type Mismatch: expecting NewgroundsIO.objects.SaveSlot, got ",
                val
              );

            newArr[index] = val;
          });
          this.#slots = newArr;
          return;
        }
      }

      /**
       * @private
       */
      #app_id = null;

      /**
       * The App ID of another, approved app to load scores from.
       * @type {String}
       */
      get app_id() {
        return this.#app_id;
      }

      set app_id(_app_id) {
        if (typeof _app_id !== "string" && _app_id !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a string, got",
            _app_id
          );
        this.#app_id = String(_app_id);
      }

      arrayMap = { slots: "SaveSlot" };
    }

    /** End Class NewgroundsIO.results.CloudSave.loadSlots **/
    if (typeof NewgroundsIO.results.CloudSave === "undefined")
      NewgroundsIO.results.CloudSave = {};
    NewgroundsIO.results.CloudSave.loadSlots = loadSlots;
  })();

  /* ====================== ./NewgroundsIO-JS/src/NewgroundsIO/results/CloudSave/setData.js ====================== */

  (() => {
    /** Start NewgroundsIO.results.CloudSave.setData **/

    class setData extends NewgroundsIO.BaseResult {
      /**
       * Constructor
       * @param {object} props An object of initial properties for this instance
       * @param {NewgroundsIO.objects.SaveSlot} props.slot
       */
      constructor(props) {
        super();
        let _this = this;

        this.__object = "CloudSave.setData";
        ["slot"].forEach((prop) => {
          if (_this.__properties.indexOf(prop) < 0)
            _this.__properties.push(prop);
        });
        if (props && typeof props === "object") {
          for (var i = 0; i < this.__properties.length; i++) {
            if (typeof props[this.__properties[i]] !== "undefined")
              this[this.__properties[i]] = props[this.__properties[i]];
          }
        }
      }

      /**
       * @private
       */
      #slot = null;

      /**
       * @type {NewgroundsIO.objects.SaveSlot}
       */
      get slot() {
        return this.#slot;
      }

      set slot(_slot) {
        if (
          !(_slot instanceof NewgroundsIO.objects.SaveSlot) &&
          typeof _slot === "object"
        )
          _slot = new NewgroundsIO.objects.SaveSlot(_slot);

        if (_slot !== null && !(_slot instanceof NewgroundsIO.objects.SaveSlot))
          console.warn(
            "Type Mismatch: expecting NewgroundsIO.objects.SaveSlot, got ",
            _slot
          );

        this.#slot = _slot;
      }

      objectMap = { slot: "SaveSlot" };
    }

    /** End Class NewgroundsIO.results.CloudSave.setData **/
    if (typeof NewgroundsIO.results.CloudSave === "undefined")
      NewgroundsIO.results.CloudSave = {};
    NewgroundsIO.results.CloudSave.setData = setData;
  })();

  /* ====================== ./NewgroundsIO-JS/src/NewgroundsIO/results/Event/logEvent.js ====================== */

  (() => {
    /** Start NewgroundsIO.results.Event.logEvent **/

    class logEvent extends NewgroundsIO.BaseResult {
      /**
       * Constructor
       * @param {object} props An object of initial properties for this instance
       * @param {String} props.event_name
       */
      constructor(props) {
        super();
        let _this = this;

        this.__object = "Event.logEvent";
        ["event_name"].forEach((prop) => {
          if (_this.__properties.indexOf(prop) < 0)
            _this.__properties.push(prop);
        });
        if (props && typeof props === "object") {
          for (var i = 0; i < this.__properties.length; i++) {
            if (typeof props[this.__properties[i]] !== "undefined")
              this[this.__properties[i]] = props[this.__properties[i]];
          }
        }
      }

      /**
       * @private
       */
      #event_name = null;

      /**
       * @type {String}
       */
      get event_name() {
        return this.#event_name;
      }

      set event_name(_event_name) {
        if (typeof _event_name !== "string" && _event_name !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a string, got",
            _event_name
          );
        this.#event_name = String(_event_name);
      }
    }

    /** End Class NewgroundsIO.results.Event.logEvent **/
    if (typeof NewgroundsIO.results.Event === "undefined")
      NewgroundsIO.results.Event = {};
    NewgroundsIO.results.Event.logEvent = logEvent;
  })();

  /* ====================== ./NewgroundsIO-JS/src/NewgroundsIO/results/Gateway/getDatetime.js ====================== */

  (() => {
    /** Start NewgroundsIO.results.Gateway.getDatetime **/

    class getDatetime extends NewgroundsIO.BaseResult {
      /**
       * Constructor
       * @param {object} props An object of initial properties for this instance
       * @param {String} props.datetime The server's date and time in ISO 8601 format.
       * @param {Number} props.timestamp The current UNIX timestamp on the server.
       */
      constructor(props) {
        super();
        let _this = this;

        this.__object = "Gateway.getDatetime";
        ["datetime", "timestamp"].forEach((prop) => {
          if (_this.__properties.indexOf(prop) < 0)
            _this.__properties.push(prop);
        });
        if (props && typeof props === "object") {
          for (var i = 0; i < this.__properties.length; i++) {
            if (typeof props[this.__properties[i]] !== "undefined")
              this[this.__properties[i]] = props[this.__properties[i]];
          }
        }
      }

      /**
       * @private
       */
      #datetime = null;

      /**
       * The server's date and time in ISO 8601 format.
       * @type {String}
       */
      get datetime() {
        return this.#datetime;
      }

      set datetime(_datetime) {
        if (typeof _datetime !== "string" && _datetime !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a string, got",
            _datetime
          );
        this.#datetime = String(_datetime);
      }

      /**
       * @private
       */
      #timestamp = null;

      /**
       * The current UNIX timestamp on the server.
       * @type {Number}
       */
      get timestamp() {
        return this.#timestamp;
      }

      set timestamp(_timestamp) {
        if (typeof _timestamp !== "number" && _timestamp !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a number, got",
            _timestamp
          );
        else if (!Number.isInteger(_timestamp) && _timestamp !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be an integer, got a float"
          );
        this.#timestamp = Number(_timestamp);
        if (isNaN(this.#timestamp)) this.#timestamp = null;
      }
    }

    /** End Class NewgroundsIO.results.Gateway.getDatetime **/
    if (typeof NewgroundsIO.results.Gateway === "undefined")
      NewgroundsIO.results.Gateway = {};
    NewgroundsIO.results.Gateway.getDatetime = getDatetime;
  })();

  /* ====================== ./NewgroundsIO-JS/src/NewgroundsIO/results/Gateway/getVersion.js ====================== */

  (() => {
    /** Start NewgroundsIO.results.Gateway.getVersion **/

    class getVersion extends NewgroundsIO.BaseResult {
      /**
       * Constructor
       * @param {object} props An object of initial properties for this instance
       * @param {String} props.version The version number (in X.Y.Z format).
       */
      constructor(props) {
        super();
        let _this = this;

        this.__object = "Gateway.getVersion";
        ["version"].forEach((prop) => {
          if (_this.__properties.indexOf(prop) < 0)
            _this.__properties.push(prop);
        });
        if (props && typeof props === "object") {
          for (var i = 0; i < this.__properties.length; i++) {
            if (typeof props[this.__properties[i]] !== "undefined")
              this[this.__properties[i]] = props[this.__properties[i]];
          }
        }
      }

      /**
       * @private
       */
      #version = null;

      /**
       * The version number (in X.Y.Z format).
       * @type {String}
       */
      get version() {
        return this.#version;
      }

      set version(_version) {
        if (typeof _version !== "string" && _version !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a string, got",
            _version
          );
        this.#version = String(_version);
      }
    }

    /** End Class NewgroundsIO.results.Gateway.getVersion **/
    if (typeof NewgroundsIO.results.Gateway === "undefined")
      NewgroundsIO.results.Gateway = {};
    NewgroundsIO.results.Gateway.getVersion = getVersion;
  })();

  /* ====================== ./NewgroundsIO-JS/src/NewgroundsIO/results/Gateway/ping.js ====================== */

  (() => {
    /** Start NewgroundsIO.results.Gateway.ping **/

    class ping extends NewgroundsIO.BaseResult {
      /**
       * Constructor
       * @param {object} props An object of initial properties for this instance
       * @param {String} props.pong Will always return a value of 'pong'
       */
      constructor(props) {
        super();
        let _this = this;

        this.__object = "Gateway.ping";
        ["pong"].forEach((prop) => {
          if (_this.__properties.indexOf(prop) < 0)
            _this.__properties.push(prop);
        });
        if (props && typeof props === "object") {
          for (var i = 0; i < this.__properties.length; i++) {
            if (typeof props[this.__properties[i]] !== "undefined")
              this[this.__properties[i]] = props[this.__properties[i]];
          }
        }
      }

      /**
       * @private
       */
      #pong = null;

      /**
       * Will always return a value of 'pong'
       * @type {String}
       */
      get pong() {
        return this.#pong;
      }

      set pong(_pong) {
        if (typeof _pong !== "string" && _pong !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a string, got",
            _pong
          );
        this.#pong = String(_pong);
      }
    }

    /** End Class NewgroundsIO.results.Gateway.ping **/
    if (typeof NewgroundsIO.results.Gateway === "undefined")
      NewgroundsIO.results.Gateway = {};
    NewgroundsIO.results.Gateway.ping = ping;
  })();

  /* ====================== ./NewgroundsIO-JS/src/NewgroundsIO/results/Loader/loadAuthorUrl.js ====================== */

  (() => {
    /** Start NewgroundsIO.results.Loader.loadAuthorUrl **/

    class loadAuthorUrl extends NewgroundsIO.BaseResult {
      /**
       * Constructor
       * @param {object} props An object of initial properties for this instance
       * @param {String} props.url
       */
      constructor(props) {
        super();
        let _this = this;

        this.__object = "Loader.loadAuthorUrl";
        ["url"].forEach((prop) => {
          if (_this.__properties.indexOf(prop) < 0)
            _this.__properties.push(prop);
        });
        if (props && typeof props === "object") {
          for (var i = 0; i < this.__properties.length; i++) {
            if (typeof props[this.__properties[i]] !== "undefined")
              this[this.__properties[i]] = props[this.__properties[i]];
          }
        }
      }

      /**
       * @private
       */
      #url = null;

      /**
       * @type {String}
       */
      get url() {
        return this.#url;
      }

      set url(_url) {
        if (typeof _url !== "string" && _url !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a string, got",
            _url
          );
        this.#url = String(_url);
      }
    }

    /** End Class NewgroundsIO.results.Loader.loadAuthorUrl **/
    if (typeof NewgroundsIO.results.Loader === "undefined")
      NewgroundsIO.results.Loader = {};
    NewgroundsIO.results.Loader.loadAuthorUrl = loadAuthorUrl;
  })();

  /* ====================== ./NewgroundsIO-JS/src/NewgroundsIO/results/Loader/loadMoreGames.js ====================== */

  (() => {
    /** Start NewgroundsIO.results.Loader.loadMoreGames **/

    class loadMoreGames extends NewgroundsIO.BaseResult {
      /**
       * Constructor
       * @param {object} props An object of initial properties for this instance
       * @param {String} props.url
       */
      constructor(props) {
        super();
        let _this = this;

        this.__object = "Loader.loadMoreGames";
        ["url"].forEach((prop) => {
          if (_this.__properties.indexOf(prop) < 0)
            _this.__properties.push(prop);
        });
        if (props && typeof props === "object") {
          for (var i = 0; i < this.__properties.length; i++) {
            if (typeof props[this.__properties[i]] !== "undefined")
              this[this.__properties[i]] = props[this.__properties[i]];
          }
        }
      }

      /**
       * @private
       */
      #url = null;

      /**
       * @type {String}
       */
      get url() {
        return this.#url;
      }

      set url(_url) {
        if (typeof _url !== "string" && _url !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a string, got",
            _url
          );
        this.#url = String(_url);
      }
    }

    /** End Class NewgroundsIO.results.Loader.loadMoreGames **/
    if (typeof NewgroundsIO.results.Loader === "undefined")
      NewgroundsIO.results.Loader = {};
    NewgroundsIO.results.Loader.loadMoreGames = loadMoreGames;
  })();

  /* ====================== ./NewgroundsIO-JS/src/NewgroundsIO/results/Loader/loadNewgrounds.js ====================== */

  (() => {
    /** Start NewgroundsIO.results.Loader.loadNewgrounds **/

    class loadNewgrounds extends NewgroundsIO.BaseResult {
      /**
       * Constructor
       * @param {object} props An object of initial properties for this instance
       * @param {String} props.url
       */
      constructor(props) {
        super();
        let _this = this;

        this.__object = "Loader.loadNewgrounds";
        ["url"].forEach((prop) => {
          if (_this.__properties.indexOf(prop) < 0)
            _this.__properties.push(prop);
        });
        if (props && typeof props === "object") {
          for (var i = 0; i < this.__properties.length; i++) {
            if (typeof props[this.__properties[i]] !== "undefined")
              this[this.__properties[i]] = props[this.__properties[i]];
          }
        }
      }

      /**
       * @private
       */
      #url = null;

      /**
       * @type {String}
       */
      get url() {
        return this.#url;
      }

      set url(_url) {
        if (typeof _url !== "string" && _url !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a string, got",
            _url
          );
        this.#url = String(_url);
      }
    }

    /** End Class NewgroundsIO.results.Loader.loadNewgrounds **/
    if (typeof NewgroundsIO.results.Loader === "undefined")
      NewgroundsIO.results.Loader = {};
    NewgroundsIO.results.Loader.loadNewgrounds = loadNewgrounds;
  })();

  /* ====================== ./NewgroundsIO-JS/src/NewgroundsIO/results/Loader/loadOfficialUrl.js ====================== */

  (() => {
    /** Start NewgroundsIO.results.Loader.loadOfficialUrl **/

    class loadOfficialUrl extends NewgroundsIO.BaseResult {
      /**
       * Constructor
       * @param {object} props An object of initial properties for this instance
       * @param {String} props.url
       */
      constructor(props) {
        super();
        let _this = this;

        this.__object = "Loader.loadOfficialUrl";
        ["url"].forEach((prop) => {
          if (_this.__properties.indexOf(prop) < 0)
            _this.__properties.push(prop);
        });
        if (props && typeof props === "object") {
          for (var i = 0; i < this.__properties.length; i++) {
            if (typeof props[this.__properties[i]] !== "undefined")
              this[this.__properties[i]] = props[this.__properties[i]];
          }
        }
      }

      /**
       * @private
       */
      #url = null;

      /**
       * @type {String}
       */
      get url() {
        return this.#url;
      }

      set url(_url) {
        if (typeof _url !== "string" && _url !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a string, got",
            _url
          );
        this.#url = String(_url);
      }
    }

    /** End Class NewgroundsIO.results.Loader.loadOfficialUrl **/
    if (typeof NewgroundsIO.results.Loader === "undefined")
      NewgroundsIO.results.Loader = {};
    NewgroundsIO.results.Loader.loadOfficialUrl = loadOfficialUrl;
  })();

  /* ====================== ./NewgroundsIO-JS/src/NewgroundsIO/results/Loader/loadReferral.js ====================== */

  (() => {
    /** Start NewgroundsIO.results.Loader.loadReferral **/

    class loadReferral extends NewgroundsIO.BaseResult {
      /**
       * Constructor
       * @param {object} props An object of initial properties for this instance
       * @param {String} props.url
       */
      constructor(props) {
        super();
        let _this = this;

        this.__object = "Loader.loadReferral";
        ["url"].forEach((prop) => {
          if (_this.__properties.indexOf(prop) < 0)
            _this.__properties.push(prop);
        });
        if (props && typeof props === "object") {
          for (var i = 0; i < this.__properties.length; i++) {
            if (typeof props[this.__properties[i]] !== "undefined")
              this[this.__properties[i]] = props[this.__properties[i]];
          }
        }
      }

      /**
       * @private
       */
      #url = null;

      /**
       * @type {String}
       */
      get url() {
        return this.#url;
      }

      set url(_url) {
        if (typeof _url !== "string" && _url !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a string, got",
            _url
          );
        this.#url = String(_url);
      }
    }

    /** End Class NewgroundsIO.results.Loader.loadReferral **/
    if (typeof NewgroundsIO.results.Loader === "undefined")
      NewgroundsIO.results.Loader = {};
    NewgroundsIO.results.Loader.loadReferral = loadReferral;
  })();

  /* ====================== ./NewgroundsIO-JS/src/NewgroundsIO/results/Medal/getList.js ====================== */

  (() => {
    /** Start NewgroundsIO.results.Medal.getList **/

    class getList extends NewgroundsIO.BaseResult {
      /**
       * Constructor
       * @param {object} props An object of initial properties for this instance
       * @param {Array.<NewgroundsIO.objects.Medal>} props.medals An array of medal objects.
       * @param {String} props.app_id The App ID of any external app these medals were loaded from.
       */
      constructor(props) {
        super();
        let _this = this;

        this.__object = "Medal.getList";
        ["medals", "app_id"].forEach((prop) => {
          if (_this.__properties.indexOf(prop) < 0)
            _this.__properties.push(prop);
        });
        if (props && typeof props === "object") {
          for (var i = 0; i < this.__properties.length; i++) {
            if (typeof props[this.__properties[i]] !== "undefined")
              this[this.__properties[i]] = props[this.__properties[i]];
          }
        }
      }

      /**
       * @private
       */
      #medals = null;

      /**
       * An array of medal objects.
       * @type {Array.<NewgroundsIO.objects.Medal>}
       */
      get medals() {
        return this.#medals;
      }

      set medals(_medals) {
        if (Array.isArray(_medals)) {
          let newArr = [];
          _medals.forEach(function (val, index) {
            if (val !== null && !(val instanceof NewgroundsIO.objects.Medal))
              console.warn(
                "Type Mismatch: expecting NewgroundsIO.objects.Medal, got ",
                val
              );

            newArr[index] = val;
          });
          this.#medals = newArr;
          return;
        }
      }

      /**
       * @private
       */
      #app_id = null;

      /**
       * The App ID of any external app these medals were loaded from.
       * @type {String}
       */
      get app_id() {
        return this.#app_id;
      }

      set app_id(_app_id) {
        if (typeof _app_id !== "string" && _app_id !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a string, got",
            _app_id
          );
        this.#app_id = String(_app_id);
      }

      arrayMap = { medals: "Medal" };
    }

    /** End Class NewgroundsIO.results.Medal.getList **/
    if (typeof NewgroundsIO.results.Medal === "undefined")
      NewgroundsIO.results.Medal = {};
    NewgroundsIO.results.Medal.getList = getList;
  })();

  /* ====================== ./NewgroundsIO-JS/src/NewgroundsIO/results/Medal/getMedalScore.js ====================== */

  (() => {
    /** Start NewgroundsIO.results.Medal.getMedalScore **/

    class getMedalScore extends NewgroundsIO.BaseResult {
      /**
       * Constructor
       * @param {object} props An object of initial properties for this instance
       * @param {Number} props.medal_score The user's medal score.
       */
      constructor(props) {
        super();
        let _this = this;

        this.__object = "Medal.getMedalScore";
        ["medal_score"].forEach((prop) => {
          if (_this.__properties.indexOf(prop) < 0)
            _this.__properties.push(prop);
        });
        if (props && typeof props === "object") {
          for (var i = 0; i < this.__properties.length; i++) {
            if (typeof props[this.__properties[i]] !== "undefined")
              this[this.__properties[i]] = props[this.__properties[i]];
          }
        }
      }

      /**
       * @private
       */
      #medal_score = null;

      /**
       * The user's medal score.
       * @type {Number}
       */
      get medal_score() {
        return this.#medal_score;
      }

      set medal_score(_medal_score) {
        if (typeof _medal_score !== "number" && _medal_score !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a number, got",
            _medal_score
          );
        else if (!Number.isInteger(_medal_score) && _medal_score !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be an integer, got a float"
          );
        this.#medal_score = Number(_medal_score);
        if (isNaN(this.#medal_score)) this.#medal_score = null;
      }
    }

    /** End Class NewgroundsIO.results.Medal.getMedalScore **/
    if (typeof NewgroundsIO.results.Medal === "undefined")
      NewgroundsIO.results.Medal = {};
    NewgroundsIO.results.Medal.getMedalScore = getMedalScore;
  })();

  /* ====================== ./NewgroundsIO-JS/src/NewgroundsIO/results/Medal/unlock.js ====================== */

  (() => {
    /** Start NewgroundsIO.results.Medal.unlock **/

    class unlock extends NewgroundsIO.BaseResult {
      /**
       * Constructor
       * @param {object} props An object of initial properties for this instance
       * @param {NewgroundsIO.objects.Medal} props.medal The NewgroundsIO.objects.Medal that was unlocked.
       * @param {Number} props.medal_score The user's new medal score.
       */
      constructor(props) {
        super();
        let _this = this;

        this.__object = "Medal.unlock";
        ["medal", "medal_score"].forEach((prop) => {
          if (_this.__properties.indexOf(prop) < 0)
            _this.__properties.push(prop);
        });
        if (props && typeof props === "object") {
          for (var i = 0; i < this.__properties.length; i++) {
            if (typeof props[this.__properties[i]] !== "undefined")
              this[this.__properties[i]] = props[this.__properties[i]];
          }
        }
      }

      /**
       * @private
       */
      #medal = null;

      /**
       * The NewgroundsIO.objects.Medal that was unlocked.
       * @type {NewgroundsIO.objects.Medal}
       */
      get medal() {
        return this.#medal;
      }

      set medal(_medal) {
        if (
          !(_medal instanceof NewgroundsIO.objects.Medal) &&
          typeof _medal === "object"
        )
          _medal = new NewgroundsIO.objects.Medal(_medal);

        if (_medal !== null && !(_medal instanceof NewgroundsIO.objects.Medal))
          console.warn(
            "Type Mismatch: expecting NewgroundsIO.objects.Medal, got ",
            _medal
          );

        this.#medal = _medal;
      }

      /**
       * @private
       */
      #medal_score = null;

      /**
       * The user's new medal score.
       * @type {Number}
       */
      get medal_score() {
        return this.#medal_score;
      }

      set medal_score(_medal_score) {
        if (typeof _medal_score !== "number" && _medal_score !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a number, got",
            _medal_score
          );
        else if (!Number.isInteger(_medal_score) && _medal_score !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be an integer, got a float"
          );
        this.#medal_score = Number(_medal_score);
        if (isNaN(this.#medal_score)) this.#medal_score = null;
      }

      objectMap = { medal: "Medal" };
    }

    /** End Class NewgroundsIO.results.Medal.unlock **/
    if (typeof NewgroundsIO.results.Medal === "undefined")
      NewgroundsIO.results.Medal = {};
    NewgroundsIO.results.Medal.unlock = unlock;
  })();

  /* ====================== ./NewgroundsIO-JS/src/NewgroundsIO/results/ScoreBoard/getBoards.js ====================== */

  (() => {
    /** Start NewgroundsIO.results.ScoreBoard.getBoards **/

    class getBoards extends NewgroundsIO.BaseResult {
      /**
       * Constructor
       * @param {object} props An object of initial properties for this instance
       * @param {Array.<NewgroundsIO.objects.ScoreBoard>} props.scoreboards An array of NewgroundsIO.objects.ScoreBoard objects.
       */
      constructor(props) {
        super();
        let _this = this;

        this.__object = "ScoreBoard.getBoards";
        ["scoreboards"].forEach((prop) => {
          if (_this.__properties.indexOf(prop) < 0)
            _this.__properties.push(prop);
        });
        if (props && typeof props === "object") {
          for (var i = 0; i < this.__properties.length; i++) {
            if (typeof props[this.__properties[i]] !== "undefined")
              this[this.__properties[i]] = props[this.__properties[i]];
          }
        }
      }

      /**
       * @private
       */
      #scoreboards = null;

      /**
       * An array of NewgroundsIO.objects.ScoreBoard objects.
       * @type {Array.<NewgroundsIO.objects.ScoreBoard>}
       */
      get scoreboards() {
        return this.#scoreboards;
      }

      set scoreboards(_scoreboards) {
        if (Array.isArray(_scoreboards)) {
          let newArr = [];
          _scoreboards.forEach(function (val, index) {
            if (
              val !== null &&
              !(val instanceof NewgroundsIO.objects.ScoreBoard)
            )
              console.warn(
                "Type Mismatch: expecting NewgroundsIO.objects.ScoreBoard, got ",
                val
              );

            newArr[index] = val;
          });
          this.#scoreboards = newArr;
          return;
        }
      }

      arrayMap = { scoreboards: "ScoreBoard" };
    }

    /** End Class NewgroundsIO.results.ScoreBoard.getBoards **/
    if (typeof NewgroundsIO.results.ScoreBoard === "undefined")
      NewgroundsIO.results.ScoreBoard = {};
    NewgroundsIO.results.ScoreBoard.getBoards = getBoards;
  })();

  /* ====================== ./NewgroundsIO-JS/src/NewgroundsIO/results/ScoreBoard/getScores.js ====================== */

  (() => {
    /** Start NewgroundsIO.results.ScoreBoard.getScores **/

    class getScores extends NewgroundsIO.BaseResult {
      /**
       * Constructor
       * @param {object} props An object of initial properties for this instance
       * @param {String} props.period The time-frame the scores belong to. See notes for acceptable values.
       * @param {Boolean} props.social Will return true if scores were loaded in social context ('social' set to true and a session or 'user' were provided).
       * @param {Number} props.limit The query skip that was used.
       * @param {NewgroundsIO.objects.ScoreBoard} props.scoreboard The NewgroundsIO.objects.ScoreBoard being queried.
       * @param {Array.<NewgroundsIO.objects.Score>} props.scores An array of NewgroundsIO.objects.Score objects.
       * @param {NewgroundsIO.objects.User} props.user The NewgroundsIO.objects.User the score list is associated with (either as defined in the 'user' param, or extracted from the current session when 'social' is set to true)
       * @param {String} props.app_id The App ID of any external app these scores were loaded from.
       */
      constructor(props) {
        super();
        let _this = this;

        this.__object = "ScoreBoard.getScores";
        [
          "period",
          "social",
          "limit",
          "scoreboard",
          "scores",
          "user",
          "app_id",
        ].forEach((prop) => {
          if (_this.__properties.indexOf(prop) < 0)
            _this.__properties.push(prop);
        });
        if (props && typeof props === "object") {
          for (var i = 0; i < this.__properties.length; i++) {
            if (typeof props[this.__properties[i]] !== "undefined")
              this[this.__properties[i]] = props[this.__properties[i]];
          }
        }
      }

      /**
       * @private
       */
      #period = null;

      /**
       * The time-frame the scores belong to. See notes for acceptable values.
       * @type {String}
       */
      get period() {
        return this.#period;
      }

      set period(_period) {
        if (typeof _period !== "string" && _period !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a string, got",
            _period
          );
        this.#period = String(_period);
      }

      /**
       * @private
       */
      #social = null;

      /**
       * Will return true if scores were loaded in social context ('social' set to true and a session or 'user' were provided).
       * @type {Boolean}
       */
      get social() {
        return this.#social;
      }

      set social(_social) {
        if (
          typeof _social !== "boolean" &&
          typeof _social !== "number" &&
          _social !== null
        )
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a boolean, got",
            _social
          );
        this.#social = _social ? true : false;
      }

      /**
       * @private
       */
      #limit = null;

      /**
       * The query skip that was used.
       * @type {Number}
       */
      get limit() {
        return this.#limit;
      }

      set limit(_limit) {
        if (typeof _limit !== "number" && _limit !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a number, got",
            _limit
          );
        else if (!Number.isInteger(_limit) && _limit !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be an integer, got a float"
          );
        this.#limit = Number(_limit);
        if (isNaN(this.#limit)) this.#limit = null;
      }

      /**
       * @private
       */
      #scoreboard = null;

      /**
       * The NewgroundsIO.objects.ScoreBoard being queried.
       * @type {NewgroundsIO.objects.ScoreBoard}
       */
      get scoreboard() {
        return this.#scoreboard;
      }

      set scoreboard(_scoreboard) {
        if (
          !(_scoreboard instanceof NewgroundsIO.objects.ScoreBoard) &&
          typeof _scoreboard === "object"
        )
          _scoreboard = new NewgroundsIO.objects.ScoreBoard(_scoreboard);

        if (
          _scoreboard !== null &&
          !(_scoreboard instanceof NewgroundsIO.objects.ScoreBoard)
        )
          console.warn(
            "Type Mismatch: expecting NewgroundsIO.objects.ScoreBoard, got ",
            _scoreboard
          );

        this.#scoreboard = _scoreboard;
      }

      /**
       * @private
       */
      #scores = null;

      /**
       * An array of NewgroundsIO.objects.Score objects.
       * @type {Array.<NewgroundsIO.objects.Score>}
       */
      get scores() {
        return this.#scores;
      }

      set scores(_scores) {
        if (Array.isArray(_scores)) {
          let newArr = [];
          _scores.forEach(function (val, index) {
            if (val !== null && !(val instanceof NewgroundsIO.objects.Score))
              console.warn(
                "Type Mismatch: expecting NewgroundsIO.objects.Score, got ",
                val
              );

            newArr[index] = val;
          });
          this.#scores = newArr;
          return;
        }
      }

      /**
       * @private
       */
      #user = null;

      /**
       * The NewgroundsIO.objects.User the score list is associated with (either as defined in the 'user' param, or extracted from the current session when 'social' is set to true)
       * @type {NewgroundsIO.objects.User}
       */
      get user() {
        return this.#user;
      }

      set user(_user) {
        if (
          !(_user instanceof NewgroundsIO.objects.User) &&
          typeof _user === "object"
        )
          _user = new NewgroundsIO.objects.User(_user);

        if (_user !== null && !(_user instanceof NewgroundsIO.objects.User))
          console.warn(
            "Type Mismatch: expecting NewgroundsIO.objects.User, got ",
            _user
          );

        this.#user = _user;
      }

      /**
       * @private
       */
      #app_id = null;

      /**
       * The App ID of any external app these scores were loaded from.
       * @type {String}
       */
      get app_id() {
        return this.#app_id;
      }

      set app_id(_app_id) {
        if (typeof _app_id !== "string" && _app_id !== null)
          console.warn(
            "NewgroundsIO Type Mismatch: Value should be a string, got",
            _app_id
          );
        this.#app_id = String(_app_id);
      }

      objectMap = { scoreboard: "ScoreBoard", user: "User" };

      arrayMap = { scores: "Score" };
    }

    /** End Class NewgroundsIO.results.ScoreBoard.getScores **/
    if (typeof NewgroundsIO.results.ScoreBoard === "undefined")
      NewgroundsIO.results.ScoreBoard = {};
    NewgroundsIO.results.ScoreBoard.getScores = getScores;
  })();

  /* ====================== ./NewgroundsIO-JS/src/NewgroundsIO/results/ScoreBoard/postScore.js ====================== */

  (() => {
    /** Start NewgroundsIO.results.ScoreBoard.postScore **/

    class postScore extends NewgroundsIO.BaseResult {
      /**
       * Constructor
       * @param {object} props An object of initial properties for this instance
       * @param {NewgroundsIO.objects.ScoreBoard} props.scoreboard The NewgroundsIO.objects.ScoreBoard that was posted to.
       * @param {NewgroundsIO.objects.Score} props.score The NewgroundsIO.objects.Score that was posted to the board.
       */
      constructor(props) {
        super();
        let _this = this;

        this.__object = "ScoreBoard.postScore";
        ["scoreboard", "score"].forEach((prop) => {
          if (_this.__properties.indexOf(prop) < 0)
            _this.__properties.push(prop);
        });
        if (props && typeof props === "object") {
          for (var i = 0; i < this.__properties.length; i++) {
            if (typeof props[this.__properties[i]] !== "undefined")
              this[this.__properties[i]] = props[this.__properties[i]];
          }
        }
      }

      /**
       * @private
       */
      #scoreboard = null;

      /**
       * The NewgroundsIO.objects.ScoreBoard that was posted to.
       * @type {NewgroundsIO.objects.ScoreBoard}
       */
      get scoreboard() {
        return this.#scoreboard;
      }

      set scoreboard(_scoreboard) {
        if (
          !(_scoreboard instanceof NewgroundsIO.objects.ScoreBoard) &&
          typeof _scoreboard === "object"
        )
          _scoreboard = new NewgroundsIO.objects.ScoreBoard(_scoreboard);

        if (
          _scoreboard !== null &&
          !(_scoreboard instanceof NewgroundsIO.objects.ScoreBoard)
        )
          console.warn(
            "Type Mismatch: expecting NewgroundsIO.objects.ScoreBoard, got ",
            _scoreboard
          );

        this.#scoreboard = _scoreboard;
      }

      /**
       * @private
       */
      #score = null;

      /**
       * The NewgroundsIO.objects.Score that was posted to the board.
       * @type {NewgroundsIO.objects.Score}
       */
      get score() {
        return this.#score;
      }

      set score(_score) {
        if (
          !(_score instanceof NewgroundsIO.objects.Score) &&
          typeof _score === "object"
        )
          _score = new NewgroundsIO.objects.Score(_score);

        if (_score !== null && !(_score instanceof NewgroundsIO.objects.Score))
          console.warn(
            "Type Mismatch: expecting NewgroundsIO.objects.Score, got ",
            _score
          );

        this.#score = _score;
      }

      objectMap = { scoreboard: "ScoreBoard", score: "Score" };
    }

    /** End Class NewgroundsIO.results.ScoreBoard.postScore **/
    if (typeof NewgroundsIO.results.ScoreBoard === "undefined")
      NewgroundsIO.results.ScoreBoard = {};
    NewgroundsIO.results.ScoreBoard.postScore = postScore;
  })();

  /* eslint-enable */

  let menuIco =
    "data:image/png;base64,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XYQ6wi3CIsEYV6pUKVOT999/v7/kkkt8uXLl3tD71YVcnX37CiO22mqrFVdeeaVftGiRMQWaMmWKHzt2rDFn11139a1atfI//fSTMfXHH3/0d999tzFp7733NscMGwdTq1atylgMEnKKcTDtQuET4U/NwlWKb0zv63UUgT0QpgsthW2EXCMkbZQm16o777zT//333xGWrZGmxx57zN9zzz1+8eLFvkGDBr5///7mbA0ZMsTXqVPHy1v23bp187NmzfIKfewz7N7OO+/Mc98j5NRkrSR8LhizrrrqKj9mzBjfpEkTUyW8H0aZMmV8hQoVluizF/R6fyFXiEG9onTp0v/17NnT7FRAqHicrMqVK5vDhbocNGiQP/roo+05sYEwFE8TPPPMM75du3b+ySef9A888ADjQABOliWniGB6uWCMgXEYcVQH6qJSpUrGQCQOpl188cV+8uTJvkaNGmROXhFyQfJIGpwufK3A2v/888/GMJ7js88+82effbZX/BadeDDxn3/+8UjlHnvs4bt27ervuOMOf9JJJ9nzbrPNNuZ1fvDBBxYy6LxpAhM8Z4j83EAhKlEnnHCCGXEI15kZOHDgQAsJXnnlFf/777+bGjnxxBM5HieGAVufVFHoJW3xu+ya79ixozEMxjz11FNms0Jq3lCxYkVTj6jSUaNGma077LDDzBHDw0TSUJFnnHEGWoik8wVCzqnJmUL0odDzCxcuNMYlIoLTc889NzjnJQFvdF0TOce6wttiWAGDj4a4+eabzbVHYrDV+jwudtxxRzseiWQy4qTMnz/fQgUmaK1atQgVmJi3CVsKOUVHC38I0QdCdXz//fcRFq0hvC68s3fffdf369fPd+/e3R4scs5PAhn28gIPiLOTbSLd1lmStIB47JFHHjFHYvjw4Wa3mHyxzlU8cAzepUIcT9jQuHFjkgswnJDnG+ESgXgw56iZQCnDHkTemKnKIK5B5RDDPfzwwzYg6P5gQPgbUUHYuoXCZwLx3WMCFYSzBCZGFYH0GFWGkqobJsXBwktyQpYz0OQb8Rih2bNnRwPrYgInBK+5m0CaLOfitoCuFRh4u3EMeO/evc2GzZs3z997771mnBXIFnpAcnqPP/64GfeLLrrI7B0zNTDscmZWi6lk05HmucJHwnDhPqGj0EioIewuUH7A1hbFVGb++cJXslGr+W68w4Bg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";

  const vm = Scratch.vm;
  const runtime = vm.runtime;

  const url_Location = window.location.href.split("/")[2];

  let isNG =
    url_Location == "www.newgrounds.com" ||
    url_Location == "uploads.ungrounded.net";

  let ConnectionStatus = "Awaiting";
  let loggedIn = false;
  let saveCompleted = false;

  const NGOptions = {
    // This should match the version number in your Newgrounds App Settings page
    version: "1.0.0",

    debug: true,

    // If you aren't using any of these features, set them to false, or delete the line
    checkHostLicense: true,
    autoLogNewView: true,
    preloadMedals: true,
    preloadScoreBoards: true,
    preloadSaveSlots: true,
  };

  let userDat = {
    logged: false,
    name: "unknown",
    id: 0,
    supporter: false,
    requiredFired: false,
    icon: "https://raw.githubusercontent.com/David-Orangemoon/DataHoldersRepo/main/newgroundsHolding/UnknownUser.png",
  };

  function statusReport(status) {
    if (NGIO.isWaitingStatus) {
      ConnectionStatus = "Awaiting";
      loggedIn = false;
    }

    switch (status) {
      // we have version and license info
      case NGIO.STATUS_LOCAL_VERSION_CHECKED:
        // this is an out-of-date (or possibly a development) version
        if (NGIO.isDeprecated) {
          ConnectionStatus = "Out of date!";
          NGIO.loadOfficialUrl();
        }

        // the site hosting this copy has been blocked
        if (!NGIO.legalHost) {
          ConnectionStatus = "Illegal Host";
          NGIO.loadOfficialUrl();
        }

        break;

      // user needs to log in
      case NGIO.STATUS_LOGIN_REQUIRED:
        ConnectionStatus = "Login Required";
        loggedIn = false;

        break;

      // user needs to log in
      case NGIO.STATUS_READY:
        if (NGIO.hasUser) {
          ConnectionStatus = "Logged In";
          loggedIn = true;
          userDat.icon = NGIO.user.icons.large;
          userDat.name = NGIO.user.name;
          userDat.supporter = NGIO.user.supporter;
          userDat.id = NGIO.user.id;
          break;
        } else {
          ConnectionStatus = "Opted Out";
          loggedIn = false;
          break;
        }

      // user needs to log in
      case NGIO.STATUS_WAITING_FOR_USER:
        ConnectionStatus = "Awaiting";
        loggedIn = false;

        break;
    }
  }

  function onSaveComplete(slot) {
    saveCompleted = true;
  }

  let scorePosted = false;

  ("use strict");
  class NewgroundsAPI {
    getInfo() {
      return {
        id: "NGIO",
        name: "Newgrounds!",

        color1: "#EB7522",
        color2: "#4F280E",
        color3: "#1B1717",

        menuIconURI: menuIco,

        blocks: [
          //Login Stuff
          {
            opcode: "onLoginSuccess",
            blockType: Scratch.BlockType.HAT,
            text: "Login Successful",
          },
          {
            opcode: "onLoginRequired",
            blockType: Scratch.BlockType.HAT,
            text: "If login required",
          },
          {
            opcode: "promptLogin",
            blockType: Scratch.BlockType.COMMAND, //skipLogin
            text: "Prompt user Login",
          },
          {
            opcode: "skipLogin",
            blockType: Scratch.BlockType.COMMAND,
            text: "Skip Login",
          },

          "---", //Game blocks

          {
            opcode: "setVersionNumber",
            blockType: Scratch.BlockType.COMMAND,
            text: "Change the game Version to[version]",
            arguments: {
              version: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "1.0.0",
              },
            },
          },

          {
            opcode: "connect",
            blockType: Scratch.BlockType.COMMAND,
            text: "Connect to game:[gameID] code:[code]",
            arguments: {
              gameID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "gameID",
              },
              code: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Encryption Code",
              },
            },
          },
          "---", //Status Blocks

          {
            opcode: "isNewgrounds",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "Newgrounds?",
          },
          {
            opcode: "loggedIn",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "Logged In?",
            disableMonitor: true,
          },
          {
            opcode: "version",
            blockType: Scratch.BlockType.REPORTER,
            text: "Game Version",
          },
          {
            opcode: "getStatus",
            blockType: Scratch.BlockType.REPORTER,
            text: "Api Status",
          },

          "---", //User Blocks

          {
            opcode: "getIfSupporter",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "Newgrounds Supporter?",
          },
          {
            opcode: "getUserDat",
            blockType: Scratch.BlockType.REPORTER,
            text: "User [datType]",
            arguments: {
              datType: {
                type: Scratch.ArgumentType.STRING,
                menu: "userDatType",
              },
            },
          },

          "---", //Save Blocks
          {
            opcode: "onSaveCompletedHat",
            blockType: Scratch.BlockType.HAT,
            text: "On Save Completed",
          },
          {
            opcode: "saveData",
            blockType: Scratch.BlockType.COMMAND,
            text: "Save [Data] to slot [Slot]",
            arguments: {
              Data: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Data",
              },
              Slot: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
            },
          },
          {
            opcode: "doesSlotHaveData",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "Does slot [Slot] have save data?",
            arguments: {
              Slot: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
            },
          },
          {
            opcode: "getData",
            blockType: Scratch.BlockType.REPORTER,
            text: "Get data from slot [Slot]",
            arguments: {
              Slot: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
            },
          },

          "---", //Medal Blocks

          {
            opcode: "unlockMedal",
            blockType: Scratch.BlockType.COMMAND,
            text: "Unlock medal [medalID]",
            arguments: {
              medalID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "MedalID",
              },
            },
          },
          {
            opcode: "isMedalUnlocked",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "Is medal [medalID] unlocked?",
            arguments: {
              medalID: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "MedalID",
              },
            },
          },

          "---", //Scoreboard Blocks

          {
            opcode: "onScorePosted",
            blockType: Scratch.BlockType.HAT,
            text: "On Score Posted",
          },
          {
            opcode: "postScore",
            blockType: Scratch.BlockType.COMMAND,
            text: "Post score [score] to scoreboard [scoreBoardID]",
            arguments: {
              scoreBoardID: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "000000",
              },
              score: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "100",
              },
            },
          },
          {
            opcode: "getScore",
            blockType: Scratch.BlockType.REPORTER,
            text: "Get the [scoreDataType] of rank [rank] from scoreboard [scoreBoardID] from the timespan of [timeSpan]",
            arguments: {
              scoreBoardID: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "000000",
              },
              rank: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "1",
              },
              timeSpan: {
                type: Scratch.ArgumentType.STRING,
                menu: "periodTypes",
              },
              scoreDataType: {
                type: Scratch.ArgumentType.STRING,
                menu: "scoreDataType",
              },
            },
          },

          "---", //Referrals

          {
            opcode: "loadNewgrounds",
            blockType: Scratch.BlockType.COMMAND,
            text: "Open Newgrounds",
          },
          {
            opcode: "loadMoreGames",
            blockType: Scratch.BlockType.COMMAND,
            text: "Open explore page",
          },
          {
            opcode: "loadAuthor",
            blockType: Scratch.BlockType.COMMAND,
            text: "Open Author page",
          },
        ],

        menus: {
          userDatType: {
            acceptReporters: true,
            items: [
              {
                text: "username",
                value: "name",
              },
              {
                text: "id",
                value: "id",
              },
              {
                text: "score",
                value: "MedalScore",
              },
              {
                text: "profile picture",
                value: "icon",
              },
            ],
          },
          periodTypes: {
            acceptReporters: true,
            items: [
              {
                text: "Today",
                value: NGIO.PERIOD_TODAY,
              },
              {
                text: "All Time",
                value: NGIO.PERIOD_ALL_TIME,
              },
            ],
          },
          scoreDataType: {
            acceptReporters: true,
            items: [
              {
                text: "username",
                value: "name",
              },
              {
                text: "id",
                value: "id",
              },
              {
                text: "is supporting?",
                value: "supporter",
              },
              {
                text: "profile picture",
                value: "icon",
              },
              {
                text: "score",
                value: "rawScore",
              },
              {
                text: "formatted score",
                value: "score",
              },
              {
                text: "Json",
                value: "json",
              },
            ],
          },
        },
      };
    }

    //Referrals

    loadNewgrounds() {
      NGIO.loadNewgrounds();
    }

    loadMoreGames() {
      NGIO.loadMoreGames();
    }

    loadAuthor() {
      NGIO.loadAuthorUrl();
    }

    //score

    getScore({ rank, scoreBoardID, timeSpan, scoreDataType }) {
      const searchOptions = {
        period: timeSpan,
        social: true,
        skip: rank - 1,
        limit: 1,
      };
      return new Promise((resolve, reject) => {
        NGIO.getScores(scoreBoardID, searchOptions, (board, scores) => {
          // <= declaring the board before scores so that we can retrieve the scores.
          switch (scoreDataType) {
            case "name":
              resolve(scores[0].user.name);
              break;
            case "id":
              resolve(scores[0].user.id);
              break;
            case "supporter":
              resolve(scores[0].user.supporter);
              break;
            case "icon":
              resolve(scores[0].user.icons.large);
              break;
            case "rawScore":
              resolve(scores[0].value);
              break;
            case "score":
              resolve(scores[0].formatted_value);
              break;
            case "json":
              resolve(
                JSON.stringify({
                  name: scores[0].user.name,
                  id: scores[0].user.id,
                  isSupporting: scores[0].user.supporter,
                  icon: scores[0].user.icons.large,
                  score: scores[0].value,
                  formattedScore: scores[0].formatted_value,
                })
              );
              break;
          }
        });
      });
    }

    postScore({ score, scoreBoardID }) {
      if (isNG) {
        NGIO.postScore(scoreBoardID, score, () => {
          scorePosted = true;
        });
      }
    }

    onScorePosted() {
      if (scorePosted) {
        scorePosted = false;
        return true;
      }
      return false;
    }

    //Other Stuff

    onLoginSuccess() {
      if (!userDat.logged) {
        userDat.logged = NGIO.hasUser;
        if (userDat.logged == true) {
          userDat.icon = NGIO.user.icons.large;
          userDat.name = NGIO.user.name;
          userDat.supporter = NGIO.user.supporter;
          userDat.id = NGIO.user.id;
        }
        NGIO.getConnectionStatus(statusReport);
        return NGIO.hasUser;
      } else {
        return false;
      }
    }

    onLoginRequired() {
      if (!userDat.requiredFired && ConnectionStatus == "Login Required") {
        userDat.requiredFired = true;
        NGIO.getConnectionStatus(statusReport);
        return true;
      } else {
        return false;
      }
    }

    promptLogin() {
      if (isNG) {
        NGIO.openLoginPage();
        NGIO.getConnectionStatus(statusReport);
      }
    }

    skipLogin() {
      if (isNG) {
        NGIO.skipLogin();
        NGIO.getConnectionStatus(statusReport);
      }
    }

    setVersionNumber({ version }) {
      NGOptions.version = version;
    }

    connect({ gameID, code }) {
      NGIO.init(gameID, code, NGOptions);
      //Add a hook for the connection status to Newgrounds.
      NGIO.getConnectionStatus(statusReport);
    }

    //Connection Stuff

    loggedIn() {
      NGIO.getConnectionStatus(statusReport);
      return NGIO.hasUser;
    }

    version() {
      return NGOptions.version;
    }

    getStatus() {
      return ConnectionStatus;
    }

    isNewgrounds() {
      return isNG;
    }

    //User Stuff

    getIfSupporter() {
      return userDat.supporter;
    }

    getUserDat({ datType }) {
      if (isNG && loggedIn == true) {
        if (datType == "MedalScore") {
          return NGIO.medalScore;
        } else {
          return userDat[datType];
        }
      } else {
        if (datType == "MedalScore") {
          return 0;
        } else {
          if (datType == "icon") {
            return userDat.icon;
          }
          return "unknown";
        }
      }
    }

    // Save Blocks

    onSaveCompletedHat() {
      if (isNG) {
        if (saveCompleted == true) {
          saveCompleted = false;
          return true;
        }
        return false;
      }
      return false;
    }

    saveData({ Data, Slot }) {
      if (isNG) {
        NGIO.setSaveSlotData(Slot, Data, onSaveComplete);
      }
    }

    getData({ Slot }) {
      if (isNG) {
        let saveDat = "Nothing in Slot";
        return new Promise((resolve, reject) => {
          function onSaveDataLoaded(data) {
            if (data) {
              saveDat = data;
            }
            resolve();
          }
          NGIO.getSaveSlotData(Slot, onSaveDataLoaded);
        }).then(() => {
          return saveDat;
        });
      } else {
        return "Not Newgrounds can't return Data!";
      }
    }

    doesSlotHaveData({ Slot }) {
      if (isNG) {
        return NGIO.getSaveSlot(Slot).hasData;
      } else {
        return false;
      }
    }

    //Medals

    unlockMedal({ medalID }) {
      if (isNG && loggedIn == true) {
        NGIO.getConnectionStatus(statusReport);
        if (loggedIn) {
          NGIO.keepSessionAlive();
        }
        NGIO.unlockMedal(medalID);
      }
    }

    isMedalUnlocked({ medalID }) {
      if (isNG && loggedIn == true) {
        NGIO.getConnectionStatus(statusReport);
        if (loggedIn) {
          NGIO.keepSessionAlive();
        }
        return NGIO.getMedal(medalID).unlocked;
      } else {
        return false;
      }
    }
  }

  //Keep Session alive if game is connected.
  setInterval(() => {
    NGIO.getConnectionStatus(statusReport);
    if (loggedIn) {
      NGIO.keepSessionAlive();
    }
  }, 1500);

  Scratch.extensions.register(new NewgroundsAPI());
})(Scratch);
