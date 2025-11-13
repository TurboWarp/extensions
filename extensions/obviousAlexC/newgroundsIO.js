// Name: Newgrounds
// ID: NGIO
// Description: Blocks that allow games to interact with the Newgrounds API. Unofficial.
// By: ObviousAlexC <https://scratch.mit.edu/users/pinksheep2917/>
// License: MIT

(async function (Scratch) {
  "use strict";

  /*!
    This extension uses NewgroundsIO-JS available at https://github.com/PsychoGoldfishNG/NewgroundsIO-JS
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
  const NGIO = await Scratch.external.evalAndReturn(
    "https://raw.githubusercontent.com/PsychoGoldfishNG/NewgroundsIO-JS/b0383337ef72d42dac12b7a4d7a24dfbc4105eb3/dist/NewgroundsIO.js",
    "NGIO"
  );

  let menuIco =
    "data:image/png;base64,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XYQ6wi3CIsEYV6pUKVOT999/v7/kkkt8uXLl3tD71YVcnX37CiO22mqrFVdeeaVftGiRMQWaMmWKHzt2rDFn11139a1atfI//fSTMfXHH3/0d999tzFp7733NscMGwdTq1atylgMEnKKcTDtQuET4U/NwlWKb0zv63UUgT0QpgsthW2EXCMkbZQm16o777zT//333xGWrZGmxx57zN9zzz1+8eLFvkGDBr5///7mbA0ZMsTXqVPHy1v23bp187NmzfIKfewz7N7OO+/Mc98j5NRkrSR8LhizrrrqKj9mzBjfpEkTUyW8H0aZMmV8hQoVluizF/R6fyFXiEG9onTp0v/17NnT7FRAqHicrMqVK5vDhbocNGiQP/roo+05sYEwFE8TPPPMM75du3b+ySef9A888ADjQABOliWniGB6uWCMgXEYcVQH6qJSpUrGQCQOpl188cV+8uTJvkaNGmROXhFyQfJIGpwufK3A2v/888/GMJ7js88+82effbZX/BadeDDxn3/+8UjlHnvs4bt27ervuOMOf9JJJ9nzbrPNNuZ1fvDBBxYy6LxpAhM8Z4j83EAhKlEnnHCCGXEI15kZOHDgQAsJXnnlFf/777+bGjnxxBM5HieGAVufVFHoJW3xu+ya79ixozEMxjz11FNms0Jq3lCxYkVTj6jSUaNGma077LDDzBHDw0TSUJFnnHEGWoik8wVCzqnJmUL0odDzCxcuNMYlIoLTc889NzjnJQFvdF0TOce6wttiWAGDj4a4+eabzbVHYrDV+jwudtxxRzseiWQy4qTMnz/fQgUmaK1atQgVmJi3CVsKOUVHC38I0QdCdXz//fcRFq0hvC68s3fffdf369fPd+/e3R4scs5PAhn28gIPiLOTbSLd1lmStIB47JFHHjFHYvjw4Wa3mHyxzlU8cAzepUIcT9jQuHFjkgswnJDnG+ESgXgw56iZQCnDHkTemKnKIK5B5RDDPfzwwzYg6P5gQPgbUUHYuoXCZwLx3WMCFYSzBCZGFYH0GFWGkqobJsXBwktyQpYz0OQb8Rih2bNnRwPrYgInBK+5m0CaLOfitoCuFRh4u3EMeO/evc2GzZs3z997771mnBXIFnpAcnqPP/64GfeLLrrI7B0zNTDscmZWi6lk05HmucJHwnDhPqGj0EioIewuUH7A1hbFVGb++cJXslGr+W68w4Bg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";

  const url_Location = window.location.href.split("/")[2];

  let isNG =
    url_Location == "www.newgrounds.com" ||
    url_Location == "uploads.ungrounded.net";

  let ConnectionStatus = "Awaiting";
  let loggedIn = false;

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

  //Get game data
  let gameData = {
    medals: {},
    scoreBoards: {},
    saveSlots: {},
  };

  const quickParseData = (data) => {
    const returned = {};

    //assign each item to a place in the object;
    for (let item in data) {
      returned[data[item].id] = data[item];
    }

    return returned;
  };

  //Define our user data.
  let userDat = {
    logged: false,
    name: "unknown",
    id: 0,
    supporter: false,
    requiredFired: false,
    icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAYAAAA6/NlyAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAY3SURBVGhD7ZprbJNVGMf/27ru1sEurMxtsEvHBGHcjAbYYKgxMRDgA6h8QAlRgrcY4xcJfjNBvqrBSFiMGAxBRIwoxEQEdIioARlgNte5bgzJ1rGyS3fpug2f5+yUjNJ2fc/7duuAX/Km7znr3vP8+z7nPM+5xOCDY7dwHxErP+8bHgi+13kg+F7ngeB7nftOcMQTD1MMsCTLgnKrBQvTk1GYmoDMBBMS42LRPzSMds8gHN0eXLzZizNON861uTEYQYsiJtiaaMJLxVnYWJghBIYL/wAHHS58Wt8GZ/+grDUOwwWbY2Pw+sNWvEZXkkm9x/QNDuOTOic+rnXCM2yciYYKtpG77lmSjzlTk2SNfmo6+/DquSbUk9sbgWGDVhn10++enGWoWIafd5SeW0ZjgBEYIpjF7isvxJT4OFljLPzcfWWFhojWLZjduHJZAZJo1I0k/PzKpQUopvb0oMtKHqC4z0bqzfrD7XB7CdSuKroE82g8us9e7xlA8ZFLsjRC3lfV4tPtHcJbfzSh4OtqvHO+WdR939yB53+uF1fe4Wocbb6Ja70Dojzj8CW8/edVVLt6xXd9zKb23phtlSXtKAvmOMuhx5+ZFrO88zESBHbXtmKpNRWN6xdgTV6aqOPEI91swpcVxbi2YQHWzkiHZ+gW6ro8aN4wH6typ+JN+pH8eaXEKtpXQVkwJxWB4mwcRbpAkA5cpmyKKZ+eKj7HIjc5Ht4AQZPb3TorS5a0oSSY00XOoAIRE6R7vTs/B7H0x8eO/Y29lFD4ON3SJdx5Jl0+2j1D2HDajqdP1GHXolxZeycbCzIQH6yxECgJ5tw4WLoYyoT3Fubi4AobDjW6cL69R9StzJ4i3PkqXT74zX5WVoRNhZlo7vXK2jtJp/aXWlNkKXyUBPNEIBA5KWY43B40UB9kLrp68Igc1K5Id7alJmJuWjK6vcOiHIgkcqFUGpFfLsnCAccNWXs3y2lM0IqSYJ71BGPHvBxU/FiLbb85sOZkPbaXZov6SvsNbKpqwOYzDRig3Hhl9oix52kUrvihRrj15/+OiDPHjphVTD/ONBrUqlq7Rdmf+SHsCIZSLv37qjnkdv6j8Z1cp/CS4/edmzQT4m6XRiJ8DI6aGJhkfOW6QPf+cBuPH6+RpfBQesPhTPf8xTLc70aLZViM7/IR7N4fLdNOH0qCefIeDSQo2KFkOScM0YBHwQ4lwS7qi9EAr45oRUlwA4WeaMDhHpB34aMkuNrVJ+8mFl+qqgUlwVXOwHFxvKlyuuVd+CgJ5qVUlf5jJBzTz46XYF435nx4IjnU5KKZlOacSU0wU2lvE0upEwGHxcq6NlnShrJgXiTfM2qaN57sJbEtiov0yoKZ3bVO1HaO74ht7+rHhzWtsqQdXYJ5R4AXybu8Q7ImsnRTO9vONeraidAlmLF3e2gq2BjxdJPTSBbL61160C2Y4Xi45VeHeAORgJ+75awDv7RqD0P+GCKYYdFrT9rxT2e/rDEG7rPrTtkNEcsYJphh9171U50YVPS6OP//R/ScZ07U6Xbj0URsfzg70YStJVl4Lj9DTPzDhTMoTio4zqqGnlBETLAPXkpdZrVgOV2lfALAYhYrFTx554FInACgWQ9PBLhbcLqokkGFS8QFRxuG9uHJQMTecGJcDErTkjEvLQklUxKQb0lAdlI8MsxxSImPu7292kdu3UNhxzUwhJY+L5rcHjFIXenow+WOXhq8jDXPUMGFJIo3wJ7ITsXizOTb68uqDAwP40J7L061dOP4f51ikV8vugXzXu26GWnYVJRJIrVvfWjhQnsPvmhox7fNHcrppbJgHn1fsGWKPeLp5KrjibPfK0737CfxvIuhBSXBK6ZbsHNRnnDhiaSRXHzHX9c0ZWGaOhm7785FuTiw3DbhYpkCsoFteZ9sCvcYRNiCOVk4VGHDZts0WRM9vEg2sW3hbL2EJZiPFxxZacOjER6U9MC2fUM2jnUUYkzBHC/3lxeJfd1op4hsZFuTQ+w5jSmY+8dcSh4mC2zrrsV5snQ3IQVzAvFsQeCzHNHM+vx0PCU33P0JKXj7vIfk3eRje2lg24MKXjItZVK5sj98YI7PgPoTVPBqeXhsMrM6b6q88wH8D9GUMN69ilaeAAAAAElFTkSuQmCC",
  };

  let monitorDisplayData = {
    itemCount: 20,
  };

  //Status functions and variable
  const statusReport = (status) => {
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

          gameData.medals = quickParseData(NGIO.medals);
          gameData.saveSlots = quickParseData(NGIO.saveSlots);
          gameData.scoreBoards = quickParseData(NGIO.scoreBoards);
          break;
        } else {
          ConnectionStatus = "Opted Out";
          loggedIn = false;

          gameData.scoreBoards = quickParseData(NGIO.scoreBoards);
          break;
        }

      // user needs to log in
      case NGIO.STATUS_WAITING_FOR_USER:
        ConnectionStatus = "Awaiting";
        loggedIn = false;

        break;
    }
  };

  //css "classes" for our monitor for convience
  const customCSS = {
    sc_monitor_root: {
      position: "absolute",
      top: "0px",
      left: "0px",
      background: "hsla(215, 100%, 95%, 1)",
      color: "#575e75",
      border: "1px solid hsla(0, 0%, 0%, 0.15)",
      borderRadius: "4px",
      fontSize: "12px",
      overflow: "hidden",
      userSelect: "none",
      webkitUserSelect: "none",
      display: "flex",
      flexDirection: "column",
      pointerEvents: "all",
      boxSizing: "border-box",
      //Picked up is drop-shadow(rgba(0, 0, 0, 0.6) 2px 2px 4px)
      filter: "drop-shadow(rgba(0, 0, 0, 0.0) 0px 0px 0px)",
      transition: "filter 300ms",
    },
    sc_monitor_list_label: {
      backgroundColor: "white",
      textAlign: "center",
      fontWeight: "bold",
      borderBottom: "1px solid hsla(0, 0%, 0%, 0.15)",
      padding: "3px",
      boxSizing: "border-box",
      display: "flex",
    },
    sc_monitor_rows_outer: {
      flexGrow: "1",
      boxSizing: "border-box",
      overflowY: "scroll",
    },
    sc_monitor_list_footer: {
      display: "flex",
      backgroundColor: "white",
      textAlign: "center",
      fontWeight: "bold",
      padding: "3px",
      boxSizing: "border-box",
    },

    sc_monitor_row_root: {
      position: "relative",
      top: "0",
      left: "0",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      padding: "2px",
      width: "100%",
      boxSizing: "border-box",
    },
    sc_monitor_row_index: {
      fontWeight: "bold",
      color: "hsla(225, 15%, 40%, 1)",
      margin: "0 3px",
      boxSizing: "border-box",
      width: "25px",
      height: "25px",
      borderRadius: "4px",
    },
    sc_monitor_row_value_outer: {
      display: "flex",
      alignItems: "center",
      minWidth: "40px",
      height: "22px",
      border: "1px solid hsla(0, 0%, 0%, 0.15)",
      backgroundColor: "#EB7522",
      color: "white",
      margin: "0 3px",
      borderRadius: "calc(0.5rem / 2)",
      flexGrow: "1",
      boxSizing: "border-box",
    },
    sc_monitor_row_value_inner: {
      padding: "3px 5px",
      width: "100%",
      color: "inherit",
      background: "none",
      border: "none",
      font: "inherit",
      outline: "none",
      overflow: "hidden",
      textOverflow: "ellipsis",
      userSelect: "text",
      webkitUserSelect: "text",
      whiteSpace: "pre",
    },

    sc_monitor_page_text: {
      flexGrow: "1",
      boxSizing: "border-box",
      whiteSpace: "pre",
    },
    sc_monitor_page_button: {
      border: "1px solid",
      borderRadius: "4px",
      borderColor: "rgba(0, 0, 0, 0.15)",
      background: "white",
    },
    sc_monitor_page_button_disabled: {
      border: "1px solid",
      borderRadius: "4px",
      borderColor: "rgba(0, 0, 0, 0.15)",
      background: "hsla(215, 100%, 95%, 1)",
    },
  };

  const setElementCSS = (element, cssObject) => {
    if (element instanceof HTMLElement && typeof cssObject == "object") {
      for (let key in cssObject) {
        element.style[key] = cssObject[key];
      }
    }
  };

  //Finally our scratch stuff
  const runtime = Scratch.vm.runtime;
  const renderer = Scratch.vm.renderer;
  const isPackaged = typeof scaffolding !== "undefined";

  const originifyJson = (inObject) => {
    return JSON.parse(JSON.stringify(inObject));
  };

  ("use strict");
  class NewgroundsAPI {
    constructor() {
      this.monitors = {};
      this.serializedMonitors = {};

      this.setupSaving();
      Scratch.vm.runtime.on("PROJECT_LOADED", () => {
        this.setupSaving.call(this);
      });
    }

    setupSaving() {
      if (Scratch.extensions.isPenguinMod) {
        this.serialize = () => {
          return JSON.stringify({
            monitors: this.serializedMonitors,
          });
        };

        this.deserialize = (serialized) => {
          let deserializedData = JSON.parse(serialized);
          this.monitors = deserializedData.monitors;
          this.serializedMonitors = deserializedData.monitors;
        };
      } else {
        //Storage flip flop
        if (!runtime.extensionStorage["NGIO"])
          runtime.extensionStorage["NGIO"] = new Object({ monitors: {} });

        this.serializedMonitors = originifyJson(
          runtime.extensionStorage["NGIO"].monitors
        );
        this.monitors = originifyJson(
          runtime.extensionStorage["NGIO"].monitors
        );
      }
    }

    serializeMonitor(monitorData) {
      this.serializedMonitors[monitorData.id] = {
        x: monitorData.x,
        y: monitorData.y,
        width: monitorData.width,
        height: monitorData.height,
        id: monitorData.id,
      };

      if (!Scratch.extensions.isPenguinMod)
        runtime.extensionStorage["NGIO"].monitors = this.serializedMonitors;
    }

    getInfo() {
      return {
        id: "NGIO",
        // eslint-disable-next-line extension/should-translate
        name: "Newgrounds",

        color1: "#EB7522",
        color2: "#4F280E",
        color3: "#1B1717",

        menuIconURI: menuIco,

        blocks: [
          //Login Stuff
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Connection"),
          },
          {
            opcode: "onLoginSuccess",
            blockType: Scratch.BlockType.HAT,
            text: Scratch.translate("when login success"),
            isEdgeActivated: false,
          },
          {
            opcode: "onLoginRequired",
            blockType: Scratch.BlockType.HAT,
            text: Scratch.translate("when login required"),
            isEdgeActivated: false,
          },
          {
            opcode: "promptLogin",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("prompt user login"),
          },
          {
            opcode: "skipLogin",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("skip login"),
          },

          "---", //Game blocks

          {
            opcode: "setVersionNumber",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("change game version to [version]"),
            hideFromPalette: true,
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
            text: Scratch.translate(
              "connect to game: [gameID] with code: [code]"
            ),
            hideFromPalette: true,
            arguments: {
              gameID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("gameID"),
              },
              code: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("Encryption Code"),
              },
            },
          },

          {
            opcode: "setConnectionData",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "connect to game: [gameID] with code: [code] and version: [version]"
            ),
            arguments: {
              gameID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("Game ID"),
              },
              code: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("Encryption Code"),
              },
              version: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "1.0.0",
              },
            },
          },

          "---", //Status Blocks

          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("API data"),
          },
          {
            opcode: "isNewgrounds",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is newgrounds?"),
          },
          {
            opcode: "loggedIn",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("currently logged in?"),
            disableMonitor: true,
          },
          {
            opcode: "version",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("game version"),
          },
          {
            opcode: "getStatus",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("API status"),
          },

          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Changes will occur post refresh."),
          },
          {
            opcode: "getMedals",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("game medals"),
          },
          {
            opcode: "getScoreboards",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("game scoreboards"),
          },

          "---", //User Blocks

          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("User data"),
          },
          {
            opcode: "getIfSupporter",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is user a newgrounds supporter?"),
          },
          {
            opcode: "getUserDat",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("user [datType]"),
            arguments: {
              datType: {
                type: Scratch.ArgumentType.STRING,
                menu: "userDatType",
              },
            },
          },

          "---", //Save Blocks
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Save data"),
          },
          {
            opcode: "onSaveCompletedHat",
            blockType: Scratch.BlockType.HAT,
            text: Scratch.translate("when save completed"),
            isEdgeActivated: false,
          },
          {
            opcode: "saveData",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("save [Data] to slot [Slot]"),
            arguments: {
              Data: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("Data"),
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
            text: Scratch.translate("does slot [Slot] have save data?"),
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
            text: Scratch.translate("data from slot [Slot]"),
            arguments: {
              Slot: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
            },
          },

          "---", //Medal Blocks

          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Medals"),
          },
          {
            opcode: "onMedalUnlockedHat",
            blockType: Scratch.BlockType.HAT,
            text: Scratch.translate("when medal unlocked"),
            isEdgeActivated: false,
          },
          {
            opcode: "unlockMedal",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("unlock medal [medalID]"),
            arguments: {
              medalID: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "000000",
              },
            },
          },
          {
            opcode: "getMedalData",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("get [data] of medal [medalID]"),
            arguments: {
              data: {
                menu: "medalDatType",
              },
              medalID: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "000000",
              },
            },
          },
          {
            opcode: "isMedalUnlocked",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is medal [medalID] unlocked?"),
            arguments: {
              medalID: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "000000",
              },
            },
          },
          {
            opcode: "isMedalSecret",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is medal [medalID] secret?"),
            arguments: {
              medalID: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "000000",
              },
            },
          },

          "---", //Scoreboard Blocks

          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Scoreboards"),
          },
          {
            opcode: "onScorePosted",
            blockType: Scratch.BlockType.HAT,
            text: Scratch.translate("when score posted"),
            isEdgeActivated: false,
          },
          {
            opcode: "postScore",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "post score [score] to scoreboard [scoreBoardID]"
            ),
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
            opcode: "scoreboardName",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("name of scoreboard [scoreBoardID]"),
            arguments: {
              scoreBoardID: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "000000",
              },
            },
          },
          {
            opcode: "getScore",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate(
              "[scoreDataType] of rank [rank] from scoreboard [scoreBoardID] from the timespan of [timeSpan]"
            ),
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
          {
            opcode: "getScoresBulk",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate(
              "get the first [count] ranks starting from rank [rank] in scoreboard [scoreBoardID] from the timespan of [timeSpan]"
            ),
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
              count: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "20",
              },
            },
          },
          "---",
          {
            opcode: "setScoreboardVisibility",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "[visibilityType] scoreboard [scoreBoardID]"
            ),
            arguments: {
              visibilityType: {
                type: Scratch.ArgumentType.STRING,
                menu: "visibilityTypes",
              },
              scoreBoardID: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "000000",
              },
            },
          },

          "---", //Settings/changability

          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Extra"),
          },
          {
            opcode: "setMonitorDisplayData",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set [property] to [value]"),
            arguments: {
              property: {
                type: Scratch.ArgumentType.STRING,
                menu: "displayPropertyTypes",
              },
              value: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "20",
              },
            },
          },

          "---", //Referrals

          {
            opcode: "loadNewgrounds",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("open newgrounds"),
          },
          {
            opcode: "loadMoreGames",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("open explore page"),
          },
          {
            opcode: "loadAuthor",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("open author page"),
          },
        ],

        menus: {
          userDatType: {
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate("username"),
                value: "name",
              },
              {
                text: Scratch.translate("id"),
                value: "id",
              },
              {
                text: Scratch.translate("score"),
                value: "MedalScore",
              },
              {
                text: Scratch.translate("profile picture"),
                value: "icon",
              },
            ],
          },
          medalDatType: {
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate("name"),
                value: "name",
              },
              {
                text: Scratch.translate("description"),
                value: "description",
              },
              {
                text: Scratch.translate("icon"),
                value: "icon",
              },
              {
                text: Scratch.translate("difficulty"),
                value: "difficulty",
              },
              {
                text: Scratch.translate("value"),
                value: "value",
              },
            ],
          },
          periodTypes: {
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate("Today"),
                value: NGIO.PERIOD_TODAY,
              },
              {
                text: Scratch.translate("All Time"),
                value: NGIO.PERIOD_ALL_TIME,
              },
            ],
          },
          scoreDataType: {
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate("username"),
                value: "name",
              },
              {
                text: Scratch.translate("id"),
                value: "id",
              },
              {
                text: Scratch.translate("is supporting?"),
                value: "supporter",
              },
              {
                text: Scratch.translate("profile picture"),
                value: "icon",
              },
              {
                text: Scratch.translate("score"),
                value: "rawScore",
              },
              {
                text: Scratch.translate("formatted score"),
                value: "score",
              },
              {
                text: "Json",
                value: "json",
              },
            ],
          },
          visibilityTypes: {
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate("show"),
                value: "show",
              },
              {
                text: Scratch.translate("hide"),
                value: "hide",
              },
              {
                text: Scratch.translate("refresh"),
                value: "refresh",
              },
            ],
          },
          displayPropertyTypes: {
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate("Users per Page"),
                value: "itemCount",
              },
            ],
          },
        },
      };
    }

    //Monitors
    _createMonitorFor(scoreBoardID) {
      if (!gameData.scoreBoards[scoreBoardID]) return;

      const scoreboard = gameData.scoreBoards[scoreBoardID];

      let monitorExists = true;

      //Create data if it doesn't exist
      if (!this.monitors[scoreBoardID]) {
        monitorExists = false;
        this.monitors[scoreBoardID] = {
          x: runtime.stageWidth / 2 - 62.5,
          y: runtime.stageHeight / 2 - 100,
          width: 125,
          height: 200,
          id: scoreBoardID,
        };

        this.serializeMonitor(this.monitors[scoreBoardID]);
      } else if (!this.monitors[scoreBoardID].element) monitorExists = false;

      //Now we decide if we need to create or just ignore the monitor
      const monitorData = this.monitors[scoreBoardID];

      if (!monitorExists) {
        //Create elements and set up css
        const monitorRoot = document.createElement("div");
        setElementCSS(monitorRoot, customCSS.sc_monitor_root);

        //Position the root
        monitorRoot.style.width = `${monitorData.width}px`;
        monitorRoot.style.height = `${monitorData.height}px`;
        monitorRoot.style.top = `${monitorData.y}px`;
        monitorRoot.style.left = `${monitorData.x}px`;

        const monitorHeader = document.createElement("div");
        setElementCSS(monitorHeader, customCSS.sc_monitor_list_label);

        const monitorInner = document.createElement("div");
        setElementCSS(monitorInner, customCSS.sc_monitor_rows_outer);

        const monitorFooter = document.createElement("div");
        setElementCSS(monitorFooter, customCSS.sc_monitor_list_footer);

        monitorRoot.appendChild(monitorHeader);
        monitorRoot.appendChild(monitorInner);
        monitorRoot.appendChild(monitorFooter);

        //Data
        let page = 0;

        //Contents
        const searchOptions = {
          period: NGIO.PERIOD_ALL_TIME,
          social: false,
          skip: page * monitorDisplayData.itemCount,
          limit: monitorDisplayData.itemCount + 1,
        };

        //Header elements of the monitor
        const monitorLabel = document.createElement("div");
        setElementCSS(monitorLabel, { flexGrow: "1" });
        monitorLabel.innerText = scoreboard.name;

        const buttonRefresh = document.createElement("div");
        buttonRefresh.innerText = "↻";

        monitorHeader.appendChild(buttonRefresh);
        monitorHeader.appendChild(monitorLabel);

        //Footer elements of the monitor
        const buttonPrevious = document.createElement("button");
        setElementCSS(buttonPrevious, customCSS.sc_monitor_page_button);
        buttonPrevious.innerText = "Last";

        const pageText = document.createElement("div");
        setElementCSS(pageText, customCSS.sc_monitor_page_text);
        pageText.textContent = `Page\n${page + 1}`;

        const buttonNext = document.createElement("button");
        setElementCSS(buttonNext, customCSS.sc_monitor_page_button);
        buttonNext.innerText = "Next";

        monitorFooter.appendChild(buttonPrevious);
        monitorFooter.appendChild(pageText);
        monitorFooter.appendChild(buttonNext);

        //Actually displaying the board
        const displayBoard = (board, scores) => {
          if (scores.length == 0) {
            buttonPrevious.disabled = true;
            buttonNext.disabled = true;
            return;
          }

          pageText.textContent = `Page\n${page + 1}`;

          //Make sure buttons are valid
          buttonPrevious.disabled = false;
          buttonNext.disabled = false;

          if (page == 0) buttonPrevious.disabled = true;
          if (scores.length != monitorDisplayData.itemCount + 1)
            buttonNext.disabled = true;

          //Make sure buttons reflect the options
          if (buttonPrevious.disabled)
            setElementCSS(
              buttonPrevious,
              customCSS.sc_monitor_page_button_disabled
            );
          else setElementCSS(buttonPrevious, customCSS.sc_monitor_page_button);

          if (buttonNext.disabled)
            setElementCSS(
              buttonNext,
              customCSS.sc_monitor_page_button_disabled
            );
          else setElementCSS(buttonNext, customCSS.sc_monitor_page_button);

          //start displaying the monitor
          let scoresToDisplay = scores.length;
          if (scores.length == monitorDisplayData.itemCount + 1)
            scoresToDisplay--;

          while (monitorInner.firstChild) {
            monitorInner.removeChild(monitorInner.firstChild);
          }

          for (let scoreID = 0; scoreID < scoresToDisplay; scoreID++) {
            const score = scores[scoreID];

            const rowOuter = document.createElement("label");
            setElementCSS(rowOuter, customCSS.sc_monitor_row_root);

            const rowIndex = document.createElement("img");
            setElementCSS(rowIndex, customCSS.sc_monitor_row_index);
            rowIndex.src = score.user.icons.large;

            const rowValue = document.createElement("div");
            setElementCSS(rowValue, customCSS.sc_monitor_row_value_outer);

            const rowValueText = document.createElement("div");
            setElementCSS(rowValueText, customCSS.sc_monitor_row_value_inner);
            rowValueText.innerText = score.formatted_value;

            rowOuter.appendChild(rowIndex);
            rowOuter.appendChild(rowValue);
            rowValue.appendChild(rowValueText);

            rowIndex.onmouseover = () => {
              rowValueText.innerText = score.user.name;
            };
            rowIndex.onmouseout = () => {
              rowValueText.innerText = score.formatted_value;
            };

            monitorInner.appendChild(rowOuter);
          }
        };

        buttonPrevious.onclick = () => {
          page -= 1;
          searchOptions.skip = page * monitorDisplayData.itemCount;
          NGIO.getScores(scoreBoardID, searchOptions, displayBoard);
        };

        buttonNext.onclick = () => {
          page += 1;
          searchOptions.skip = page * monitorDisplayData.itemCount;
          NGIO.getScores(scoreBoardID, searchOptions, displayBoard);
        };

        //For refreshing through the monitor, add a cooldown so we can do this easier;
        const refreshClicked = (event) => {
          event.stopImmediatePropagation();

          buttonRefresh.removeEventListener("click", refreshClicked);
          NGIO.getScores(scoreBoardID, searchOptions, displayBoard);

          setTimeout(() => {
            buttonRefresh.addEventListener("click", refreshClicked);
          }, 1000);
        };

        buttonRefresh.addEventListener("click", refreshClicked);

        //Add dragging if we are in the editor
        if (!isPackaged) {
          //Create and add it down here for reasons
          const resizeDiv = document.createElement("div");
          setElementCSS(resizeDiv, { cursor: "ne-resize" });
          resizeDiv.innerText = "=";
          monitorHeader.appendChild(resizeDiv);

          //Now define the stuff we need for movement
          let boundingRect = renderer.canvas.getBoundingClientRect();
          let offsetX = 0;
          let offsetY = 0;
          let originalX = 0;
          let originalY = 0;
          let yoffsetForResizing = 0;

          //Monitor movement code
          const monitorDragMoveEvent = (event) => {
            //Get position from a 0-1 scale
            let placedPositionX =
              (event.clientX - offsetX - boundingRect.x) / boundingRect.width;
            let placedPositionY =
              (event.clientY - offsetY - boundingRect.y) / boundingRect.height;

            //Clamp to stage
            placedPositionX =
              Math.min(
                Math.max(0, placedPositionX),
                1 - monitorData.width / runtime.stageWidth
              ) * runtime.stageWidth;
            placedPositionY =
              Math.min(
                Math.max(0, placedPositionY),
                1 - monitorData.height / runtime.stageHeight
              ) * runtime.stageHeight;

            monitorData.x = placedPositionX;
            monitorData.y = placedPositionY;

            setElementCSS(monitorRoot, {
              left: `${placedPositionX}px`,
              top: `${placedPositionY}px`,
            });
          };

          const monitorDragReleaseEvent = () => {
            setElementCSS(monitorRoot, {
              filter: "drop-shadow(rgba(0, 0, 0, 0.0) 0px 0px 0px)",
            });

            this.serializeMonitor(this.monitors[scoreBoardID]);

            document.removeEventListener("mousemove", monitorDragMoveEvent);

            document.removeEventListener("mouseup", monitorDragReleaseEvent);
            document.removeEventListener("mouseleave", monitorDragReleaseEvent);
          };

          const monitorResizeMoveEvent = (event) => {
            //Get position from a 0-1 scale
            let placedSizeX =
              (event.clientX - originalX) / boundingRect.width + offsetX;
            let placedSizeY =
              (originalY - event.clientY) / boundingRect.height + offsetY;

            //Clamp to stage
            let placedPositionY =
              (yoffsetForResizing -
                (Math.max(125 / runtime.stageHeight, placedSizeY) - offsetY)) *
              runtime.stageHeight;
            placedSizeX =
              Math.min(Math.max(125 / runtime.stageWidth, placedSizeX), 1) *
              runtime.stageWidth;
            placedSizeY =
              Math.min(Math.max(125 / runtime.stageHeight, placedSizeY), 1) *
              runtime.stageHeight;

            monitorData.width = placedSizeX;
            monitorData.height = placedSizeY;
            monitorData.y = placedPositionY;

            setElementCSS(monitorRoot, {
              width: `${placedSizeX}px`,
              height: `${placedSizeY}px`,
              top: `${placedPositionY}px`,
            });
          };

          const monitorResizeReleaseEvent = (event) => {
            setElementCSS(monitorRoot, {
              filter: "drop-shadow(rgba(0, 0, 0, 0.0) 0px 0px 0px)",
            });

            this.serializeMonitor(this.monitors[scoreBoardID]);

            document.removeEventListener("mousemove", monitorResizeMoveEvent);

            document.removeEventListener("mouseup", monitorResizeReleaseEvent);
            document.removeEventListener(
              "mouseleave",
              monitorResizeReleaseEvent
            );
          };

          monitorHeader.onmousedown = (event) => {
            event.stopImmediatePropagation();

            boundingRect = renderer.canvas.getBoundingClientRect();
            const rootRect = monitorRoot.getBoundingClientRect();

            offsetX = event.clientX - rootRect.x;
            offsetY = event.clientY - rootRect.y;
            originalX = event.clientX;
            originalY = event.clientY;

            setElementCSS(monitorRoot, {
              filter: "drop-shadow(rgba(0, 0, 0, 0.6) 2px 2px 4px)",
            });

            document.addEventListener("mousemove", monitorDragMoveEvent);

            document.addEventListener("mouseup", monitorDragReleaseEvent);
            document.addEventListener("mouseleave", monitorDragReleaseEvent);
          };

          resizeDiv.onmousedown = () => {
            event.stopImmediatePropagation();

            boundingRect = renderer.canvas.getBoundingClientRect();

            offsetX = monitorData.width / runtime.stageWidth;
            offsetY = monitorData.height / runtime.stageHeight;
            yoffsetForResizing = monitorData.y / runtime.stageHeight;
            originalX = event.clientX;
            originalY = event.clientY;

            document.addEventListener("mousemove", monitorResizeMoveEvent);

            document.addEventListener("mouseup", monitorResizeReleaseEvent);
            document.addEventListener("mouseleave", monitorResizeReleaseEvent);
          };
        }

        //Display the first page
        NGIO.getScores(scoreBoardID, searchOptions, displayBoard);

        Scratch.renderer.addOverlay(monitorRoot);

        //Finally store our new root element
        monitorData.element = monitorRoot;
        monitorData.refresh = () => {
          NGIO.getScores(scoreBoardID, searchOptions, displayBoard);
        };
      }
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
      if (!(NGIO.session && gameData.scoreBoards[scoreBoardID])) return 0;

      const searchOptions = {
        period: timeSpan,
        social: false,
        skip: Math.max(1, Scratch.Cast.toNumber(rank)) - 1,
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

    getScoresBulk({ count, rank, scoreBoardID, timeSpan }) {
      if (!(NGIO.session && gameData.scoreBoards[scoreBoardID])) return "{}";

      const searchOptions = {
        period: timeSpan,
        social: false,
        skip: Math.max(1, Scratch.Cast.toNumber(rank)) - 1,
        limit: Math.min(Math.max(1, Scratch.Cast.toNumber(count)), 100),
      };

      return new Promise((resolve, reject) => {
        NGIO.getScores(scoreBoardID, searchOptions, (board, scores) => {
          const output = [];

          for (let scoreID in scores) {
            output.push({
              name: scores[scoreID].user.name,
              id: scores[scoreID].user.id,
              isSupporting: scores[scoreID].user.supporter,
              icon: scores[scoreID].user.icons.large,
              score: scores[scoreID].value,
              formattedScore: scores[scoreID].formatted_value,
            });
          }

          resolve(JSON.stringify(output));
        });
      });
    }

    postScore({ score, scoreBoardID }, util) {
      if (NGIO.session && gameData.scoreBoards[scoreBoardID]) {
        //Wrap it in a promise to make sure the code is ran post score posting.
        return new Promise((resolve, reject) => {
          NGIO.postScore(
            scoreBoardID,
            Math.round(Scratch.Cast.toNumber(score)),
            () => {
              util.startHats("NGIO_onScorePosted");
              resolve();
            }
          );
        });
      }
    }

    scoreboardName({ scoreBoardID }) {
      if (NGIO.session && gameData.scoreBoards[scoreBoardID]) {
        return gameData.scoreBoards[scoreBoardID].name;
      } else {
        return "";
      }
    }

    setScoreboardVisibility({ visibilityType, scoreBoardID }) {
      if (visibilityType == "show") this._createMonitorFor(scoreBoardID);
      else if (visibilityType == "refresh") {
        if (
          this.monitors[scoreBoardID] &&
          this.monitors[scoreBoardID].refresh
        ) {
          this.monitors[scoreBoardID].refresh();
        }
      } else {
        if (
          this.monitors[scoreBoardID] &&
          this.monitors[scoreBoardID].element
        ) {
          const element = this.monitors[scoreBoardID].element;
          element.parentElement.removeChild(element);

          //Clean up the scoreboard
          delete this.monitors[scoreBoardID].element;
          delete this.monitors[scoreBoardID].refresh;
        }
      }
    }

    onScorePosted() {
      return true;
    }

    //! V Completely necessary comment.
    // :3
    setMonitorDisplayData({ property, value }) {
      switch (property) {
        case "itemCount":
          monitorDisplayData.itemCount = Math.min(
            Math.max(1, Scratch.Cast.toNumber(value)),
            100
          );
          break;

        default:
          break;
      }
    }

    //Other Stuff

    onLoginSuccess() {
      return true;
    }

    onLoginRequired() {
      return true;
    }

    waitForValid(util) {
      return new Promise((resolve, reject) => {
        const intervalID = setInterval(() => {
          NGIO.getConnectionStatus(statusReport);

          //Wait for finish
          switch (ConnectionStatus) {
            //In case we aren't awaiting
            case "Awaiting":
              break;

            case "Login Required":
              util.startHats("NGIO_onLoginRequired");
              clearInterval(intervalID);
              resolve();
              break;

            case "Logged In":
              util.startHats("NGIO_onLoginSuccess");
              clearInterval(intervalID);

              //Set userDat object data
              userDat.logged = NGIO.hasUser;
              if (userDat.logged == true) {
                userDat.icon = NGIO.user.icons.large;
                userDat.name = NGIO.user.name;
                userDat.supporter = NGIO.user.supporter;
                userDat.id = NGIO.user.id;
              }
              resolve();
              break;

            default:
              clearInterval(intervalID);
              resolve();
              break;
          }
        });
      });
    }

    promptLogin(args, util) {
      if (NGIO.session && !userDat.logged) {
        NGIO.openLoginPage();
        return this.waitForValid(util);
      }
    }

    skipLogin() {
      if (NGIO.session) {
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

    setConnectionData({ gameID, code, version }, util) {
      //eslint-disable-next-line no-async-promise-executor
      return new Promise(async (resolve, reject) => {
        //Just do it once
        const canFetch = await Scratch.canFetch("https://www.newgrounds.io/");

        //Make sure it is possible
        if (!canFetch) {
          reject();
          return;
        }

        NGOptions.version = version;
        NGIO.init(gameID, code, NGOptions);

        //Add a hook for the connection status to Newgrounds.
        this.waitForValid(util).then(() => {
          resolve();
        });
      });
    }

    //Connection Stuff

    loggedIn() {
      if (!NGIO.session) return false;

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

    getMedals() {
      if (NGIO.session) {
        const output = {};

        for (let medalID in gameData.medals) {
          output[gameData.medals[medalID].name] = medalID;
        }

        return JSON.stringify(output);
      } else return "{}";
    }

    getScoreboards() {
      if (NGIO.session) {
        const output = {};

        for (let scoreboardID in gameData.scoreBoards) {
          output[gameData.scoreBoards[scoreboardID].name] = scoreboardID;
        }

        return JSON.stringify(output);
      } else return "{}";
    }

    //User Stuff

    getIfSupporter() {
      return userDat.supporter || false;
    }

    getUserDat({ datType }) {
      if (NGIO.session && loggedIn) {
        if (datType == "MedalScore") {
          return NGIO.medalScore || 0;
        } else {
          return userDat[datType] || "";
        }
      } else {
        if (datType == "MedalScore") {
          return 0;
        } else {
          if (datType == "icon") {
            return userDat.icon || "";
          }
          return "unknown";
        }
      }
    }

    // Save Blocks

    onSaveCompletedHat() {
      return true;
    }

    saveData({ Data, Slot }, util) {
      if (NGIO.session && loggedIn) {
        //Configure our slot to be in a good range!
        Slot = Math.max(1, Math.floor(Scratch.Cast.toNumber(Slot)));

        return new Promise((resolve, reject) => {
          NGIO.setSaveSlotData(
            Scratch.Cast.toString(Slot),
            Scratch.Cast.toString(Data),
            () => {
              util.startHats("NGIO_onSaveCompletedHat");
              //Create dummy slot.
              gameData.saveSlots[Slot] = {
                hasData: true,
              };

              resolve();
            }
          );
        });
      }
    }

    getData({ Slot }) {
      if (NGIO.session && loggedIn) {
        //Configure our slot to be in a good range!
        Slot = Math.max(1, Math.floor(Scratch.Cast.toNumber(Slot)));
        let saveDat = "Nothing in Slot";

        return new Promise((resolve, reject) => {
          //Try to get the data
          if (!gameData.saveSlots[Slot]) resolve("");
          else
            NGIO.getSaveSlotData(Scratch.Cast.toNumber(Slot), (data) => {
              if (data) saveDat = Scratch.Cast.toString(data);
              else saveDat = "";

              resolve(saveDat);
            });
        });
      } else {
        if (NGIO.session && !loggedIn) return "Not logged in!";
        return "Can't get data from Newgrounds!";
      }
    }

    doesSlotHaveData({ Slot }) {
      if (NGIO.session && loggedIn) {
        this.revitalizeSession();

        //Configure our slot to be in a good range!
        Slot = Math.max(1, Math.floor(Scratch.Cast.toNumber(Slot)));

        //get and verify save slot!
        if (!gameData.saveSlots[Slot]) return false;
        const saveSlot = NGIO.getSaveSlot(Slot);

        return saveSlot.hasData;
      } else {
        return false;
      }
    }

    //Medals
    onMedalUnlockedHat() {
      return true;
    }

    unlockMedal({ medalID }, util) {
      if (NGIO.session && loggedIn) {
        this.revitalizeSession();

        medalID = Scratch.Cast.toNumber(medalID);

        if (!(NGIO.session && gameData.medals[medalID])) return;
        NGIO.unlockMedal(medalID, () => {
          util.startHats("NGIO_onMedalUnlockedHat");
        });
      }
    }

    isMedalUnlocked({ medalID }) {
      if (NGIO.session && loggedIn) {
        this.revitalizeSession();

        medalID = Scratch.Cast.toNumber(medalID);

        if (!(NGIO.session && gameData.medals[medalID])) return false;
        return gameData.medals[medalID].unlocked;
      } else {
        return false;
      }
    }

    isMedalSecret({ medalID }) {
      if (NGIO.session && loggedIn) {
        this.revitalizeSession();

        medalID = Scratch.Cast.toNumber(medalID);

        if (!(NGIO.session && gameData.medals[medalID])) return false;
        return gameData.medals[medalID].secret;
      } else {
        return false;
      }
    }

    getMedalData({ data, medalID }) {
      if (NGIO.session && loggedIn) {
        this.revitalizeSession();

        medalID = Scratch.Cast.toNumber(medalID);

        if (!(NGIO.session && gameData.medals[medalID])) return "";

        const medal = gameData.medals[medalID];
        switch (data) {
          case "name":
            return medal.name;
          case "description":
            return medal.description;
          //Make sure we get a url
          case "icon":
            return medal.icon.startsWith("https:")
              ? medal.icon
              : "https:" + medal.icon;
          case "difficulty":
            return medal.difficulty;
          case "value":
            return medal.value;

          default:
            return "";
        }
      } else {
        return "";
      }
    }

    //To keep the session alive!
    revitalizeSession() {
      //Get and keep the session alive
      NGIO.getConnectionStatus(statusReport);
      if (loggedIn) NGIO.keepSessionAlive();
    }
  }

  setInterval(function () {
    NGIO.keepSessionAlive();
  }, 30000);

  Scratch.extensions.register(new NewgroundsAPI());
})(Scratch);
