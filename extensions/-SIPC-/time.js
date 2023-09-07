// Name: Time
// ID: sipctime
// Description: Blocks for times, dates, and time zones.
// By: -SIPC-

// Old Desc: Blocks for interacting with unix timestamps and other date strings.
// Calculation Blocks By: SharkPool

(function (Scratch) {
  "use strict";

  const menuIconURI =
    "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI4MS44ODU0IiBoZWlnaHQ9IjgwLjYwMzA4IiB2aWV3Qm94PSIwLDAsODEuODg1NCw4MC42MDMwOCI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE5OS4wNTczLC0xMzkuNjk4NDYpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTI4MC45NDI3LDE4MGMwLDIyLjI1NzkyIC0xOC4zMzA2Nyw0MC4zMDE1NCAtNDAuOTQyNyw0MC4zMDE1NGMtMjIuNjEyMDMsMCAtNDAuOTQyNywtMTguMDQzNjEgLTQwLjk0MjcsLTQwLjMwMTU0YzAsLTIyLjI1NzkyIDE4LjMzMDY3LC00MC4zMDE1NCA0MC45NDI3LC00MC4zMDE1NGMyMi42MTIwMywwIDQwLjk0MjcsMTguMDQzNjEgNDAuOTQyNyw0MC4zMDE1NHoiIGZpbGw9IiNmZjgwMDAiIHN0cm9rZS13aWR0aD0iMCIvPjxwYXRoIGQ9Ik0yNjYuNTM0MzcsMTgwYzAsMTQuNjQxMjkgLTExLjg5MzA4LDI2LjUzNDM3IC0yNi41MzQzNywyNi41MzQzN2MtMTQuNjQxMjksMCAtMjYuNTM0MzcsLTExLjg5MzA4IC0yNi41MzQzNywtMjYuNTM0MzdjMCwtMTQuNjQxMjkgMTEuODkzMDgsLTI2LjUzNDM3IDI2LjUzNDM3LC0yNi41MzQzN2MxNC42NDEyOSwwIDI2LjUzNDM3LDExLjg5MzA4IDI2LjUzNDM3LDI2LjUzNDM3ek0yNTMuMjE5OCwxODUuOTcwMjNsLTExLjMyNDQ5LC02LjUzODgzdi0xNC41OTM5aC0zLjc5MDYydjE3LjA1NzgxaDAuNTIxMjFsMTIuNjk4NTksNy4zNDQzM3oiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMSIvPjwvZz48L2c+PC9zdmc+PCEtLXJvdGF0aW9uQ2VudGVyOjQwLjk0MjY5NjA1MzgwMTE0OjQwLjMwMTUzNTI2NTQ4NjcwNi0tPg==";

  const blockIconURI =
    "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxNzUiIGhlaWdodD0iMTc1IiB2aWV3Qm94PSIwLDAsMTc1LDE3NSI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE1Mi41LC05Mi41KSI+PGcgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aXNQYWludGluZ0xheWVyJnF1b3Q7OnRydWV9IiBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTMyNy41LDE4MGMwLDQ4LjI4MTI1IC0zOS4yMTg3NSw4Ny41IC04Ny41LDg3LjVjLTQ4LjI4MTI1LDAgLTg3LjUsLTM5LjIxODc1IC04Ny41LC04Ny41YzAsLTQ4LjI4MTI1IDM5LjIxODc1LC04Ny41IDg3LjUsLTg3LjVjNDguMjgxMjUsMCA4Ny41LDM5LjIxODc1IDg3LjUsODcuNXpNMjgzLjU5Mzc1LDE5OS42ODc1bC0zNy4zNDM3NSwtMjEuNTYyNXYtNDguMTI1aC0xMi41djU2LjI1aDEuNzE4NzVsNDEuODc1LDI0LjIxODc1eiIvPjwvZz48L2c+PC9zdmc+PCEtLXJvdGF0aW9uQ2VudGVyOjg3LjU6ODcuNS0tPg==";

  class Time {
    getInfo() {
      return {
        id: "sipctime",
        name: "Time",
        color1: "#ff8000",
        color2: "#804000",
        color3: "#804000",
        menuIconURI,
        blockIconURI,
        blocks: [
          {
            opcode: "Timestamp",
            blockType: Scratch.BlockType.REPORTER,
            text: "current unix timestamp",
            arguments: {},
          },
          {
            opcode: "timezone",
            blockType: Scratch.BlockType.REPORTER,
            text: "current time zone offset",
            arguments: {},
          },
          {
            opcode: "Timedata",
            blockType: Scratch.BlockType.REPORTER,
            text: "get [Timedata] from [timestamp]",
            arguments: {
              timestamp: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "1145141980000",
              },
              Timedata: {
                type: Scratch.ArgumentType.STRING,
                menu: "Time",
                defaultValue: "year",
              },
            },
          },
          {
            opcode: "TimestampToTime",
            blockType: Scratch.BlockType.REPORTER,
            text: "convert [timestamp] to datetime",
            arguments: {
              timestamp: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "1145141980000",
              },
            },
          },
          {
            opcode: "TimeToTimestamp",
            blockType: Scratch.BlockType.REPORTER,
            text: "convert [time] to timestamp",
            arguments: {
              time: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "2006-04-16 06:59:40",
              },
            },
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: "Time Calculations",
          },
          {
            opcode: "calculatetimedurationfromdate",
            blockType: Scratch.BlockType.REPORTER,
            text: "difference between [DATE] to current date in [TIME_MENU]",
            arguments: {
              DATE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "2006-04-16",
              },
              TIME_MENU: {
                type: Scratch.ArgumentType.STRING,
                menu: "Time",
                defaultValue: "day",
              },
            },
          },
          {
            opcode: "calculatetimedurationfromtime",
            blockType: Scratch.BlockType.REPORTER,
            text: "difference between [START_TIME] to current time in [TIME_MENU]",
            arguments: {
              START_TIME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "00:00",
              },
              TIME_MENU: {
                type: Scratch.ArgumentType.STRING,
                menu: "Time",
                defaultValue: "hour",
              },
            },
          },
          {
            opcode: "calculatetimedifference",
            blockType: Scratch.BlockType.REPORTER,
            text: "difference between [START_TIME] and [END_TIME] in [TIME_MENU]",
            arguments: {
              START_TIME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "00:00",
              },
              END_TIME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "00:00",
              },
              TIME_MENU: {
                type: Scratch.ArgumentType.STRING,
                menu: "Time",
                defaultValue: "hour",
              },
            },
          },
          {
            opcode: "converttotime",
            blockType: Scratch.BlockType.REPORTER,
            text: "convert [VALUE] to time (day:hour:minute)",
            arguments: {
              VALUE: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
            },
          },
          {
            opcode: "daysinmonth",
            blockType: Scratch.BlockType.REPORTER,
            text: "number of days in [MONTH] [YEAR]",
            arguments: {
              MONTH: {
                type: Scratch.ArgumentType.STRING,
                menu: "Months",
                defaultValue: "January",
              },
              YEAR: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "2000",
              },
            },
          },

          '---',

          {
            opcode: "countdownReport",
            blockType: Scratch.BlockType.REPORTER,
            text: "countdown to [TIME] in [MENU]",
            arguments: {
              TIME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '2007-03-14 09:34:00',
              },
              MENU: {
                type: Scratch.ArgumentType.STRING,
                menu: "Time",
                defaultValue: "hour",
              },
            },
          },
          {
            opcode: "countdownBoolean",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "countdown to [TIME] reached?",
            arguments: {
              TIME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '2007-03-14 09:34:00',
              },
            },
          },
        ],
        menus: {
          Time: {
            acceptReporters: true,
            items: ["year", "month", "day", "hour", "minute", "second"],
          },
          Months: {
            acceptReporters: true,
            items: [
              "January",
              "February",
              "March",
              "April",
              "May",
              "June",
              "July",
              "August",
              "September",
              "October",
              "November",
              "December",
            ],
          },
        },
      };
    }
    Timestamp() {
      return Date.now();
    }
    timezone() {
      return new Date().getTimezoneOffset() / -60;
    }
    Timedata(args) {
      args.timestamp = args.timestamp ? args.timestamp : null;
      let date1 = new Date(Scratch.Cast.toNumber(args.timestamp));
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
      timestamp = timestamp ? timestamp : null;
      let date2 = new Date(timestamp);
      let Y = date2.getFullYear() + "-";
      let M =
        (date2.getMonth() + 1 < 10
          ? "0" + (date2.getMonth() + 1)
          : date2.getMonth() + 1) + "-";
      let D =
        (date2.getDate() < 10 ? "0" + date2.getDate() : date2.getDate()) + " ";
      let h =
        (date2.getHours() < 10 ? "0" + date2.getHours() : date2.getHours()) +
        ":";
      let m =
        (date2.getMinutes() < 10
          ? "0" + date2.getMinutes()
          : date2.getMinutes()) + ":";
      let s =
        date2.getSeconds() < 10 ? "0" + date2.getSeconds() : date2.getSeconds();
      return Y + M + D + h + m + s;
    }
    TimeToTimestamp({ time }) {
      let data3 = time;
      let timestamp = Date.parse(data3);
      return timestamp;
    }

    calculateTimeDifference(startDate, endDate, timeMenu) {
      const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());

      switch (timeMenu) {
        case "year":
          return Math.round(timeDiff / 946080000000);
        case "month":
          return Math.round(timeDiff / 2592000000);
        case "day":
          return Math.round(timeDiff / 86400000);
        case "hour":
          return Math.round(timeDiff / 3600000);
        case "minute":
          return Math.round(timeDiff / 60000);
        case "second":
          return Math.round(timeDiff / 1000);
        default:
          return "Invalid Menu Input";
      }
    }

    calculatetimedurationfromdate(args) {
      const dateString = args.DATE ? args.DATE : null;
      const timeMenu = args.TIME_MENU;
      const startDate = new Date(dateString);
      const endDate = new Date();
      const difference = this.calculateTimeDifference(startDate, endDate, timeMenu);
      if (isNaN(difference)) {
        return "Invalid Time Input";
      } else {
        return difference;
      }
    }

    calculatetimedurationfromtime(args) {
      const startTime = args.START_TIME ? args.START_TIME : null;
      const timeMenu = args.TIME_MENU;
      const [startHour, startMinute] = startTime.split(":");
      const startDate = new Date();
      startDate.setHours(parseInt(startHour), parseInt(startMinute), 0, 0);
      const endDate = new Date();
      const difference = this.calculateTimeDifference(startDate, endDate, timeMenu);

      if (isNaN(difference)) {
        return "Invalid Time Input";
      } else {
        return difference;
      }
    }

    calculatetimedifference(args) {
      const startTime = args.START_TIME ? args.START_TIME : null;
      const endTime = args.END_TIME ? args.END_TIME : null;
      const timeMenu = args.TIME_MENU;
      const startDate = new Date();
      const endDate = new Date();
      const startHour = parseInt(startTime.split(":")[0]);
      const startMinute = parseInt(startTime.split(":")[1]);
      const endHour = parseInt(endTime.split(":")[0]);
      const endMinute = parseInt(endTime.split(":")[1]);
      startDate.setHours(startHour, startMinute, 0, 0);
      endDate.setHours(endHour, endMinute, 0, 0);

      const difference = this.calculateTimeDifference(startDate, endDate, timeMenu);
      if (isNaN(difference)) {
        return "Invalid Time Input";
      } else {
        return difference;
      }
    }

    converttotime(args) {
      const value = args.VALUE ? args.VALUE : 0;
      const seconds = Math.floor(value);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      const timeString = `${hours % 24}:${minutes % 60}:${seconds % 60}`;
      return timeString;
    }

    daysinmonth(args) {
      const month = args.MONTH;
      const year = args.YEAR ? args.YEAR : null;
      const monthIndex = this._getMonthIndex(month);

      if (monthIndex === -1) {
        return "Invalid month";
      }

      const date = new Date(year, monthIndex + 1, 0);
      return date.getDate();
    }

    _getMonthIndex(month) {
      const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      return months.indexOf(month);
    }

    countdownReport(args) {
      const timeMenu = args.MENU;
      const endDate = Date.now();

      const dateTimeParts = args.TIME.split(/[- :]/);
      const year = parseInt(dateTimeParts[0]);
      const month = parseInt(dateTimeParts[1]) - 1;
      const day = parseInt(dateTimeParts[2]);
      const hour = parseInt(dateTimeParts[3]);
      const minute = parseInt(dateTimeParts[4]);
      const second = parseInt(dateTimeParts[5]);

      const startDate = new Date(year, month, day, hour, minute, second).getTime();
      const timeDifference = startDate - endDate;
      
      switch (timeMenu) {
        case "year":
          return Math.round(timeDifference / 946080000000);
        case "month":
          return Math.round(timeDifference / 2592000000);
        case "day":
          return Math.round(timeDifference / 86400000);
        case "hour":
          return Math.round(timeDifference / 3600000);
        case "minute":
          return Math.round(timeDifference / 60000);
        case "second":
          return Math.round(timeDifference / 1000);
        default:
          return "Invalid Menu Input";
      }
    }

    countdownBoolean(args) {
      const endDate = Date.now();

      const dateTimeParts = args.TIME.split(/[- :]/);
      const year = parseInt(dateTimeParts[0]);
      const month = parseInt(dateTimeParts[1]) - 1;
      const day = parseInt(dateTimeParts[2]);
      const hour = parseInt(dateTimeParts[3]);
      const minute = parseInt(dateTimeParts[4]);
      const second = parseInt(dateTimeParts[5]);

      const startDate = new Date(year, month, day, hour, minute, second).getTime();
      const timeDifference = startDate - endDate;
      return (timeDifference <= 0);
    }
  }
  Scratch.extensions.register(new Time());
})(Scratch);
