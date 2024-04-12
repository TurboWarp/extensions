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
              defaultValue: 3663,
            },
          },
        },
      ],
    };
  };

  Extension.prototype.convertSeconds = function (args) {
    var totalSeconds = Math.floor(args.SECONDS);
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

  Scratch.extensions.register(new Extension());
})();
