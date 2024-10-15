// Name: Seconds Converter
// ID: secondConverterSj
// Description: Convert seconds into Hours, Minutes and Seconds with one click!
// By: HirujaSJ <https://scratch.mit.edu/users/CODINGHIRUJA/>

(function () {
  "use strict";

  var Extension = function () {};

  Extension.prototype.getInfo = function () {
    return {
      id: "secondsConverter",
      name: "Seconds Converter",
      blocks: [
        {
          opcode: "convertSeconds",
          blockType: Scratch.BlockType.REPORTER,
          text: "convert [SECONDS] to hours, minutes, and seconds",
          arguments: {
            SECONDS: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 3600,
            },
          },
        },
        {
          opcode: "minutesToHours",
          blockType: Scratch.BlockType.REPORTER,
          text: "convert [MINUTES] minutes to hours",
          arguments: {
            MINUTES: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 120,
            },
          },
        },
        {
          opcode: "minutesToSeconds",
          blockType: Scratch.BlockType.REPORTER,
          text: "convert [MINUTES] minutes to seconds",
          arguments: {
            MINUTES: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 2,
            },
          },
        },
        {
          opcode: "hoursToSeconds",
          blockType: Scratch.BlockType.REPORTER,
          text: "convert [HOURS] hours to seconds",
          arguments: {
            HOURS: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 2,
            },
          },
        },
      ],
    };
  };

  Extension.prototype.convertSeconds = function (args) {
    var totalSeconds = args.SECONDS;
    var hours = Math.floor(totalSeconds / 3600);
    var minutes = Math.floor((totalSeconds % 3600) / 60);
    var seconds = totalSeconds % 60;

    var timeString = "";

    if (hours > 0) {
      timeString += (hours < 10 ? "0" : "") + hours + ":";
    }

    timeString += (minutes < 10 ? "0" : "") + minutes + ":";
    timeString += (seconds < 10 ? "0" : "") + seconds;

    return timeString;
  };

  Extension.prototype.minutesToHours = function (args) {
    var totalMinutes = args.MINUTES;
    var hours = Math.floor(totalMinutes / 60);
    var minutes = totalMinutes % 60;

    return hours + ":" + (minutes < 10 ? "0" : "") + minutes;
  };

  Extension.prototype.minutesToSeconds = function (args) {
    var totalMinutes = args.MINUTES;
    var seconds = totalMinutes * 60;

    return seconds;
  };

  Extension.prototype.hoursToSeconds = function (args) {
    var totalHours = args.HOURS;
    var seconds = totalHours * 3600;

    return seconds;
  };

  Scratch.extensions.register(new Extension());
})();
