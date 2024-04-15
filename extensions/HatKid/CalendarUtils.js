// ID: CalendarUtils
// Description: Extra tools for time-based projects
// By: HatKid

(function (Scratch) {
  "use strict";

  class CalendarUtils {
    getInfo() {
      return {
        id: "CalendarUtils",
        name: "Calendar Utils",
        color1: "#2A3439",
        color3: "#708090",
        blocks: [
          {
            opcode: "getToday",
            blockType: Scratch.BlockType.REPORTER,
            text: "Today's Date",
          },
          {
            opcode: "getDayOfWeek",
            blockType: Scratch.BlockType.REPORTER,
            text: "Day of Week on [A] / [B] / [C]",
            arguments: {
              A: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
              B: {
                type: Scratch.ArgumentType.STRING,
                menu: "month",
                defaultValue: "January",
              },
              C: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 2023,
              },
            },
          },
          {
            opcode: "getNextDayOfWeek",
            blockType: Scratch.BlockType.REPORTER,
            text:
              "Next [A] in format [B]",
            arguments: {
              A: {
                type: Scratch.ArgumentType.STRING,
                menu : 'dayOfWeek',
                defaultValue : 'Monday'
              },
              B : {
                  type : Scratch.ArgumentType.STRING,
                  menu : 'dateFormat',
                  defaultValue : 'MM/DD/YYYY'
              }
            },
          },
          {
            opcode: "getDaysInMonth",
            blockType: Scratch.BlockType.REPORTER,
            text:
              "Days in [A] [B]",
            arguments:
             { A:
               { type:
                  Scratch.ArgumentType.STRING,
                  menu:
                    "month",
                    defaultValue:
                      "January"
               },
               B:
                 { type:
                        Scratch.ArgumentType.NUMBER,
                        defaultValue:
                          2023
                 }
             }
          },
          {
            opcode: "getDateOfHoliday",
            blockType: Scratch.BlockType.REPORTER,
            text:
              "Date of [A] in [B]",
            arguments:
             { A:
               { type:
                  Scratch.ArgumentType.STRING,
                  menu:
                    "holiday",
                    defaultValue:
                      "Christmas"
               },
               B:
                 { type:
                        Scratch.ArgumentType.NUMBER,
                        defaultValue:
                          2023
                 }
             }
          }
        ],
        menus : {
          month : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          dayOfWeek : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
          dateFormat : ['MM/DD/YYYY', 'Day', 'Day/Month', 'Month', 'Day/Month/Year', 'UNIX'],
          holiday : ['Christmas']
        }
      };
    }

    getToday(args, util) {
      return new Date().toDateString();
    }

    getDayOfWeek(args, util) {
      const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      const monthIndex = months.indexOf(args.B);
      var date = new Date(args.C, monthIndex, args.A);
      var daysOfWeek = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      return daysOfWeek[date.getDay()];
    }

    getNextDayOfWeek(args, util) {
      const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const today = new Date();
      let nextDay = today;
      while (daysOfWeek[nextDay.getDay()] !== args.A) {
        nextDay.setDate(nextDay.getDate() + 1);
      }
      
      let format;
      switch (args.B) {
        case 'Day':
          format = `DD`;
          break;
        case `Day/Month`:
          format = `DD/MM`;
          break;
        case `Month`:
          format = `MM`;
          break;
        case `UNIX`:
          return Math.floor(nextDay.getTime() / 1000);
        default:
          format = `MM/DD/YYYY`;
      }
      
      return this.formatDate(nextDay, format);
    }

    getDaysInMonth(args, util) {
      const date = new Date(`${args.A} 1, ${args.B}`);
      date.setMonth(date.getMonth() + 1);
      date.setDate(0);
      return date.getDate();
    }

    getDateOfHoliday(args, util) {
      let date;
      switch (args.A) {
        case 'Christmas':
          date = new Date(`December 25, ${args.B}`);
          break;
        // Add more holidays here
        default:
          date = null;
          break;
      }
      if (date) return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
      else return `Unknown holiday '${args.A}'`;
    }

    formatDate(date, format) {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      
      return format.replace('DD', day < 10 ? `0${day}` : day)
                   .replace('MM', month < 10 ? `0${month}` : month)
                   .replace('YYYY', year);
    }
  }

  Scratch.extensions.register(new CalendarUtils());
})(Scratch);
