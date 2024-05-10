// Name: Time
// ID: sipctime
// Description: Blocks for times, dates, and time zones.
// By: -SIPC-
// By: SharkPool <https://scratch.mit.edu/users/DemonX5/>
// License: MIT

// If you're curious, the default dates are from the first commits of forkphorus & TurboWarp:
// https://github.com/forkphorus/forkphorus/commit/632d3432a8a98abd627b1309f6c85f47dcc6d428
// https://github.com/TurboWarp/scratch-vm/commit/4a93dab4fa3704ab7a1374b9794026b3330f3433

(function (Scratch) {
  "use strict";

  const menuIconURI =
    "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI4MS44ODU0IiBoZWlnaHQ9IjgwLjYwMzA4IiB2aWV3Qm94PSIwLDAsODEuODg1NCw4MC42MDMwOCI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE5OS4wNTczLC0xMzkuNjk4NDYpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTI4MC45NDI3LDE4MGMwLDIyLjI1NzkyIC0xOC4zMzA2Nyw0MC4zMDE1NCAtNDAuOTQyNyw0MC4zMDE1NGMtMjIuNjEyMDMsMCAtNDAuOTQyNywtMTguMDQzNjEgLTQwLjk0MjcsLTQwLjMwMTU0YzAsLTIyLjI1NzkyIDE4LjMzMDY3LC00MC4zMDE1NCA0MC45NDI3LC00MC4zMDE1NGMyMi42MTIwMywwIDQwLjk0MjcsMTguMDQzNjEgNDAuOTQyNyw0MC4zMDE1NHoiIGZpbGw9IiNmZjgwMDAiIHN0cm9rZS13aWR0aD0iMCIvPjxwYXRoIGQ9Ik0yNjYuNTM0MzcsMTgwYzAsMTQuNjQxMjkgLTExLjg5MzA4LDI2LjUzNDM3IC0yNi41MzQzNywyNi41MzQzN2MtMTQuNjQxMjksMCAtMjYuNTM0MzcsLTExLjg5MzA4IC0yNi41MzQzNywtMjYuNTM0MzdjMCwtMTQuNjQxMjkgMTEuODkzMDgsLTI2LjUzNDM3IDI2LjUzNDM3LC0yNi41MzQzN2MxNC42NDEyOSwwIDI2LjUzNDM3LDExLjg5MzA4IDI2LjUzNDM3LDI2LjUzNDM3ek0yNTMuMjE5OCwxODUuOTcwMjNsLTExLjMyNDQ5LC02LjUzODgzdi0xNC41OTM5aC0zLjc5MDYydjE3LjA1NzgxaDAuNTIxMjFsMTIuNjk4NTksNy4zNDQzM3oiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMSIvPjwvZz48L2c+PC9zdmc+PCEtLXJvdGF0aW9uQ2VudGVyOjQwLjk0MjY5NjA1MzgwMTE0OjQwLjMwMTUzNTI2NTQ4NjcwNi0tPg==";

  const blockIconURI =
    "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxNzUiIGhlaWdodD0iMTc1IiB2aWV3Qm94PSIwLDAsMTc1LDE3NSI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE1Mi41LC05Mi41KSI+PGcgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aXNQYWludGluZ0xheWVyJnF1b3Q7OnRydWV9IiBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTMyNy41LDE4MGMwLDQ4LjI4MTI1IC0zOS4yMTg3NSw4Ny41IC04Ny41LDg3LjVjLTQ4LjI4MTI1LDAgLTg3LjUsLTM5LjIxODc1IC04Ny41LC04Ny41YzAsLTQ4LjI4MTI1IDM5LjIxODc1LC04Ny41IDg3LjUsLTg3LjVjNDguMjgxMjUsMCA4Ny41LDM5LjIxODc1IDg3LjUsODcuNXpNMjgzLjU5Mzc1LDE5OS42ODc1bC0zNy4zNDM3NSwtMjEuNTYyNXYtNDguMTI1aC0xMi41djU2LjI1aDEuNzE4NzVsNDEuODc1LDI0LjIxODc1eiIvPjwvZz48L2c+PC9zdmc+PCEtLXJvdGF0aW9uQ2VudGVyOjg3LjU6ODcuNS0tPg==";

  const parseDate = (str) => {
    // TODO: support standalone times here, interpret as today
    if (!isNaN(str)) {
      return new Date(Scratch.Cast.toNumber(str));
    }
    return new Date(Scratch.Cast.toString(str));
  };

  class Time {
    getInfo() {
      return {
        id: "sipctime",
        name: Scratch.translate("Time"),
        color1: "#ff8000",
        color2: "#804000",
        color3: "#804000",
        menuIconURI,
        blockIconURI,
        blocks: [
          {
            opcode: "Timestamp",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("current timestamp"),
          },
          {
            opcode: "timezone",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("current time zone"),
          },
          {
            opcode: "Timedata",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("get [Timedata] from [timestamp]"),
            arguments: {
              timestamp: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "1591657163000",
              },
              Timedata: {
                type: Scratch.ArgumentType.STRING,
                menu: "Time",
              },
            },
          },
          {
            opcode: "TimestampToTime",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate(
              "convert [timestamp] to YYYY-MM-DD HH:MM:SS"
            ),
            arguments: {
              timestamp: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "1591657163000",
              },
            },
          },
          {
            opcode: "TimeToTimestamp",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("convert [time] to timestamp"),
            arguments: {
              time: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "2020-06-08 17:59:23",
              },
            },
          },
          "---",
          {
            opcode: "differenceBetweenDateAndNow",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate(
              "difference between [DATE] and now in [TIME_MENU]"
            ),
            arguments: {
              DATE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "2020-06-08 17:59:23",
              },
              TIME_MENU: {
                type: Scratch.ArgumentType.STRING,
                menu: "DurationUnit",
              },
            },
          },
          {
            opcode: "differenceBetweenDates",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate(
              "difference between [START] and [END] in [TIME_MENU]"
            ),
            arguments: {
              START: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "2019-01-04 18:41:04",
              },
              END: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "2020-06-08 17:59:23",
              },
              TIME_MENU: {
                type: Scratch.ArgumentType.STRING,
                menu: "DurationUnit",
              },
            },
          },
          "---",
          {
            opcode: "formatTime",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("format [VALUE] seconds as [ROUND] time"),
            arguments: {
              VALUE: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "3883.2", // no hidden meaning in this one
              },
              ROUND: {
                type: Scratch.ArgumentType.NUMBER,
                menu: "TimeFormat",
              },
            },
          },
          {
            opcode: "daysInMonth",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("number of days in [MONTH] [YEAR]"),
            arguments: {
              MONTH: {
                type: Scratch.ArgumentType.STRING,
                menu: "Months",
              },
              YEAR: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "2000",
              },
            },
          },
        ],
        menus: {
          Time: {
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate("year"),
                value: "year",
              },
              {
                text: Scratch.translate("month"),
                value: "month",
              },
              {
                text: Scratch.translate("day"),
                value: "day",
              },
              {
                text: Scratch.translate("hour"),
                value: "hour",
              },
              {
                text: Scratch.translate("minute"),
                value: "minute",
              },
              {
                text: Scratch.translate("second"),
                value: "second",
              },
            ],
          },
          DurationUnit: {
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate("years"),
                value: "years",
              },
              {
                text: Scratch.translate("months"),
                value: "months",
              },
              {
                text: Scratch.translate("days"),
                value: "days",
              },
              {
                text: Scratch.translate("hours"),
                value: "hours",
              },
              {
                text: Scratch.translate("minutes"),
                value: "minutes",
              },
              {
                text: Scratch.translate("seconds"),
                value: "seconds",
              },
            ],
          },
          TimeFormat: {
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate("rounded"),
                value: "rounded",
              },
              {
                text: Scratch.translate("exact"),
                value: "exact",
              },
            ],
          },
          Months: {
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate("January"),
                value: "1",
              },
              {
                text: Scratch.translate("February"),
                value: "2",
              },
              {
                text: Scratch.translate("March"),
                value: "3",
              },
              {
                text: Scratch.translate("April"),
                value: "4",
              },
              {
                text: Scratch.translate("May"),
                value: "5",
              },
              {
                text: Scratch.translate("June"),
                value: "6",
              },
              {
                text: Scratch.translate("July"),
                value: "7",
              },
              {
                text: Scratch.translate("August"),
                value: "8",
              },
              {
                text: Scratch.translate("September"),
                value: "9",
              },
              {
                text: Scratch.translate("October"),
                value: "10",
              },
              {
                text: Scratch.translate("November"),
                value: "11",
              },
              {
                text: Scratch.translate("December"),
                value: "12",
              },
            ],
          },
        },
      };
    }

    Timestamp() {
      return Date.now();
    }

    timezone() {
      return "UTC+" + new Date().getTimezoneOffset() / -60;
    }

    Timedata(args) {
      const date1 = parseDate(args.timestamp);
      switch (args.Timedata) {
        case "year":
          return date1.getFullYear();
        case "month":
          return date1.getMonth() + 1 < 10
            ? "0" + (date1.getMonth() + 1)
            : date1.getMonth() + 1;
        case "day":
          return date1.getDate() < 10 ? "0" + date1.getDate() : date1.getDate();
        case "hour":
          return date1.getHours() < 10
            ? "0" + date1.getHours()
            : date1.getHours();
        case "minute":
          return date1.getMinutes() < 10
            ? "0" + date1.getMinutes()
            : date1.getMinutes();
        case "second":
          return date1.getSeconds() < 10
            ? "0" + date1.getSeconds()
            : date1.getSeconds();
      }
      return 0;
    }

    TimestampToTime({ timestamp }) {
      const date = parseDate(timestamp);
      const Y = date.getFullYear();
      const M =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      const D = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      const h = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      const m =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      const s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return `${Y}-${M}-${D} ${h}:${m}:${s}`;
    }

    TimeToTimestamp({ time }) {
      return parseDate(time).getTime();
    }

    /**
     * @param {Date} startDate
     * @param {Date} endDate
     * @param {string} timeMenu
     * @returns {number}
     */
    _calculateTimeDifference(startDate, endDate, timeMenu) {
      const timeDiff = endDate.getTime() - startDate.getTime();
      switch (Scratch.Cast.toString(timeMenu)) {
        case "years":
          return timeDiff / (1000 * 60 * 60 * 24 * 365);
        case "months":
          return timeDiff / (1000 * 60 * 60 * 24 * 30.436875); // average month length from https://en.wikipedia.org/wiki/Month
        case "days":
          return timeDiff / (1000 * 60 * 60 * 24);
        case "hours":
          return timeDiff / (1000 * 60 * 60);
        case "minutes":
          return timeDiff / (1000 * 60);
        case "seconds":
          return timeDiff / 1000;
        default:
          return 0;
      }
    }

    differenceBetweenDateAndNow(args) {
      return this._calculateTimeDifference(
        parseDate(args.DATE),
        new Date(),
        args.TIME_MENU
      );
    }

    differenceBetweenDates(args) {
      return this._calculateTimeDifference(
        parseDate(args.START),
        parseDate(args.END),
        args.TIME_MENU
      );
    }

    formatTime(args) {
      const totalSeconds = Scratch.Cast.toNumber(args.VALUE);
      const seconds =
        args.ROUND === "rounded"
          ? Math.round(totalSeconds % 60)
              .toString()
              .padStart(2, "0")
          : (totalSeconds % 60).toFixed(3).padStart(6, "0");
      const minutes = Math.floor((totalSeconds / 60) % 60)
        .toString()
        .padStart(2, "0");
      const hours = Math.floor(totalSeconds / 3600)
        .toString()
        .padStart(2, "0");
      return `${hours}:${minutes}:${seconds}`;
    }

    daysInMonth(args) {
      const year = Math.round(Scratch.Cast.toNumber(args.YEAR));
      if (year <= 0) {
        return 0;
      }
      const monthIndex = Math.round(Scratch.Cast.toNumber(args.MONTH));
      if (monthIndex < 0 || monthIndex >= 13) {
        return 0;
      }
      const date = new Date(year, monthIndex, 0);
      return date.getDate();
    }
  }
  Scratch.extensions.register(new Time());
})(Scratch);
