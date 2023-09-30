// Name: Unit Converter
// ID: unitconverter
// Description: Convert values between different units of measurement.
// By: Kurisotofaa <https://scratch.mit.edu/users/kurisotofa/>

(function (Scratch) {
  "use strict";

  class UnitConverter {
    getInfo() {
      return {
        id: "unitconverter",
        name: "Unit Converter",
        blocks: [
          // Temperature Conversion
          {
            opcode: "convertTemperature",
            blockType: Scratch.BlockType.REPORTER,
            text: "convert [VALUE] [UNIT1] to [UNIT2]",
            arguments: {
              VALUE: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              UNIT1: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Celsius",
                menu: "temperatureUnits",
              },
              UNIT2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Fahrenheit",
                menu: "temperatureUnits",
              },
            },
          },
          // Distance Conversion
          {
            opcode: "convertDistance",
            blockType: Scratch.BlockType.REPORTER,
            text: "convert [VALUE] [UNIT1] to [UNIT2]",
            arguments: {
              VALUE: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              UNIT1: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Meters",
                menu: "distanceUnits",
              },
              UNIT2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Feet",
                menu: "distanceUnits",
              },
            },
          },
          // Weight Conversion
          {
            opcode: "convertWeight",
            blockType: Scratch.BlockType.REPORTER,
            text: "convert [VALUE] [UNIT1] to [UNIT2]",
            arguments: {
              VALUE: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              UNIT1: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Kilograms",
                menu: "weightUnits",
              },
              UNIT2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Pounds",
                menu: "weightUnits",
              },
            },
          },
        ],
        menus: {
          temperatureUnits: [
            "Celsius",
            "Fahrenheit",
            "Kelvin",
          ],
          distanceUnits: [
            "Meters",
            "Feet",
            "Miles",
          ],
          weightUnits: [
            "Kilograms",
            "Pounds",
            "Ounces",
          ],
        },
      };
    }

    // Temperature Conversion
    convertTemperature(args) {
      const value = args.VALUE;
      const unit1 = args.UNIT1;
      const unit2 = args.UNIT2;

      // Implement the temperature conversion logic here
      if (unit1 === "Celsius" && unit2 === "Fahrenheit") {
        return (value * 9/5) + 32;
      } else if (unit1 === "Fahrenheit" && unit2 === "Celsius") {
        return (value - 32) * 5/9;
      } else if (unit1 === "Celsius" && unit2 === "Kelvin") {
        return value + 273.15;
      } else if (unit1 === "Kelvin" && unit2 === "Celsius") {
        return value - 273.15;
      } else if (unit1 === "Fahrenheit" && unit2 === "Kelvin") {
        return (value - 32) * 5/9 + 273.15;
      } else if (unit1 === "Kelvin" && unit2 === "Fahrenheit") {
        return (value - 273.15) * 9/5 + 32;
      }

      // Return the same value if units are the same or unknown
      return value;
    }

    // Distance Conversion
    convertDistance(args) {
      const value = args.VALUE;
      const unit1 = args.UNIT1;
      const unit2 = args.UNIT2;

      // Implement the distance conversion logic here
      if (unit1 === "Meters" && unit2 === "Feet") {
        return value * 3.28084;
      } else if (unit1 === "Feet" && unit2 === "Meters") {
        return value / 3.28084;
      } else if (unit1 === "Meters" && unit2 === "Miles") {
        return value * 0.000621371;
      } else if (unit1 === "Miles" && unit2 === "Meters") {
        return value / 0.000621371;
      }

      // Return the same value if units are the same or unknown
      return value;
    }

    // Weight Conversion
    convertWeight(args) {
      const value = args.VALUE;
      const unit1 = args.UNIT1;
      const unit2 = args.UNIT2;

      // Implement the weight conversion logic here
      if (unit1 === "Kilograms" && unit2 === "Pounds") {
        return value * 2.20462;
      } else if (unit1 === "Pounds" && unit2 === "Kilograms") {
        return value / 2.20462;
      } else if (unit1 === "Kilograms" && unit2 === "Ounces") {
        return value * 35.274;
      } else if (unit1 === "Ounces" && unit2 === "Kilograms") {
        return value / 35.274;
      }

      // Return the same value if units are the same or unknown
      return value;
    }
  }

  Scratch.extensions.register(new UnitConverter());
})(Scratch);
