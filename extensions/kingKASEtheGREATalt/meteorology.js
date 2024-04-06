// Name: Meteorology
// ID: kingkasethegreataltmeteorology
// Description: Accesses the "weather.gov" API for weather data, adds temperature related utilities, and allows for geolocation permissions.
// By: kingKASEtheGREATalt <https://scratch.mit.edu/users/kingKASEtheGREATalt/>
// License: MPL-2.0

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error(
      "The Meteorology extension needs to be unsandboxed for proper use."
    );
  }

  class Meteorology {
    getInfo() {
      return {
        id: "meteorology",
        name: "Meteorology",

        color1: "#AFB42B",
        color2: "#9E9D24",
        color3: "#827717",

        blocks: [
          {
            opcode: "weatherjson",
            blockType: Scratch.BlockType.REPORTER,
            text: "fetch json for latitude [LAT] and longitude [LONG]",
            arguments: {
              LAT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "",
              },
              LONG: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "",
              },
            },
          },
          {
            opcode: "weather",
            blockType: Scratch.BlockType.REPORTER,
            text: "[WEATHER] at latitude [LAT] and longitude [LONG]",
            arguments: {
              WEATHER: {
                type: Scratch.ArgumentType.STRING,
                menu: "WEATHERTYPE",
              },
              LAT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "",
              },
              LONG: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "",
              },
            },
          },
          {
            opcode: "elevation",
            blockType: Scratch.BlockType.REPORTER,
            text: "elevation at latitude [LAT] and longitude [LONG]",
            arguments: {
              LAT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "",
              },
              LONG: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "",
              },
            },
          },
          {
            opcode: "weathertype",
            blockType: Scratch.BlockType.REPORTER,
            text: "[WEATHER] of weather at latitude [LAT] and longitude [LONG]",
            arguments: {
              WEATHER: {
                type: Scratch.ArgumentType.STRING,
                menu: "TYPE",
              },
              LAT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "",
              },
              LONG: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "",
              },
            },
          },
          "---",
          {
            opcode: "tempconvert",
            blockType: Scratch.BlockType.REPORTER,
            text: "convert [SOURCE][SOURCE_UNIT] to [RESULT_UNIT]",
            arguments: {
              SOURCE: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "32",
              },
              SOURCE_UNIT: {
                type: Scratch.ArgumentType.STRING,
                menu: "TEMP",
              },
              RESULT_UNIT: {
                type: Scratch.ArgumentType.STRING,
                menu: "TEMP",
              },
            },
          },
          {
            opcode: "tempbase",
            blockType: Scratch.BlockType.REPORTER,
            text: "unit [UNIT]",
            arguments: {
              UNIT: {
                type: Scratch.ArgumentType.STRING,
                menu: "TEMP",
              },
            },
          },
          "---",
          {
            opcode: "latitude",
            blockType: Scratch.BlockType.REPORTER,
            text: "get user latitude",
          },
          {
            opcode: "longitude",
            blockType: Scratch.BlockType.REPORTER,
            text: "get user longitude",
          },
          {
            opcode: "requestgeolocation",
            text: "request geolocation",
            blockType: Scratch.BlockType.COMMAND,
          },
          {
            opcode: "geolocationpermission",
            text: "geolocation permission granted?",
            blockType: Scratch.BlockType.BOOLEAN,
            disableMonitor: true,
          },
        ],
        menus: {
          TEMP: {
            acceptReporters: true,
            items: [
              {
                text: "C°",
                value: "c",
              },
              {
                text: "F°",
                value: "f",
              },
              {
                text: "K°",
                value: "k",
              },
            ],
          },
          WEATHERTYPE: {
            acceptReporters: true,
            items: [
              {
                text: "temperature",
                value: "temperature",
              },
              {
                text: "dew point",
                value: "dewpoint",
              },
              {
                text: "humidity",
                value: "relativeHumidity",
              },
              {
                text: "maximum temperature",
                value: "maxTemperature",
              },
              {
                text: "minimum temperature",
                value: "minTemperature",
              },
              {
                text: "cloud coverage",
                value: "skyCover",
              },
              {
                text: "chance of precipitation",
                value: "probabilityOfPrecipitation",
              },
              {
                text: "precipitation",
                value: "quantitativePrecipitation",
              },
              {
                text: "snowfall",
                value: "snowfallAmount",
              },
              {
                text: "snow level",
                value: "snowLevel",
              },
              {
                text: "visibility",
                value: "visibility",
              },
              {
                text: "ceiling height",
                value: "ceilingHeight",
              },
              {
                text: "ice accumulation",
                value: "iceAccumulation",
              },
              {
                text: "wind speed",
                value: "windSpeed",
              },
              {
                text: "wind direction",
                value: "windDirection",
              },
              {
                text: "lightning activity level",
                value: "lightningActivityLevel",
              },
              {
                text: "chance of thunder",
                value: "probabilityOfThunder",
              },
              {
                text: "wind chill",
                value: "windChill",
              },
              {
                text: "heat index",
                value: "heatIndex",
              },
              {
                text: "temperature feels like",
                value: "apparentTemperature",
              },
            ],
          },
          TYPE: {
            acceptReporters: true,
            items: [
              {
                text: "weather",
              },
              {
                text: "coverage",
              },
              {
                text: "intensity",
              },
            ],
          },
        },
      };
    }

    latitude() {
      return new Promise((resolve) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            function (position) {
              resolve(position.coords.latitude);
            },
            function (error) {
              switch (error.code) {
                case error.PERMISSION_DENIED:
                  resolve("Access was denied.");
                  break;
                case error.POSITION_UNAVAILABLE:
                  resolve("Location is unavalible.");
                  break;
                case error.TIMEOUT:
                  resolve("Request timed out.");
                  break;
                default:
                  resolve();
                  break;
              }
              console.log(error);
            }
          );
        } else {
          resolve("Geolocation not supported.");
        }
      });
    }

    longitude() {
      return new Promise((resolve) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            function (position) {
              resolve(position.coords.longitude);
            },
            function (error) {
              switch (error.code) {
                case error.PERMISSION_DENIED:
                  resolve("Access was denied.");
                  break;
                case error.POSITION_UNAVAILABLE:
                  resolve("Location is unavalible.");
                  break;
                case error.TIMEOUT:
                  resolve("Request timed out.");
                  break;
                default:
                  resolve();
                  break;
              }
              console.log(error);
            }
          );
        } else {
          resolve("Geolocation not supported.");
        }
      });
    }

    requestgeolocation() {
      navigator.geolocation.getCurrentPosition(function (position) {}); // navigator.permissions.query doesn't work w/this
      return;
    }

    geolocationpermission() {
      return new Promise((resolve) => {
        if (navigator.permissions && navigator.geolocation) {
          navigator.permissions
            .query({
              name: "geolocation",
            })
            .then(function (PermissionStatus) {
              if ("granted" === PermissionStatus.state) {
                resolve(true);
              } else {
                resolve(false);
              }
            });
        }
      });
    }

    tempconvert(args) {
      if (args.SOURCE_UNIT === "f") {
        if (args.RESULT_UNIT === "c") {
          return ((args.SOURCE - 32) * 5) / 9;
        } else if (args.RESULT_UNIT === "k") {
          return ((args.SOURCE - 32) * 5) / 9 + 273.15;
        } else {
          return args.SOURCE;
        }
      } else if (args.SOURCE_UNIT === "c") {
        if (args.RESULT_UNIT === "f") {
          return (args.SOURCE * 9) / 5 + 32;
        } else if (args.RESULT_UNIT === "k") {
          return args.SOURCE + 273.15;
        } else {
          return args.SOURCE;
        }
      } else if (args.SOURCE_UNIT === "k") {
        if (args.RESULT_UNIT === "f") {
          return ((args.SOURCE - 273.15) * 9) / 5 + 32;
        } else if (args.RESULT_UNIT === "c") {
          return args.SOURCE - 273.15;
        } else {
          return args.SOURCE;
        }
      }
      return 0;
    }

    tempbase(args) {
      return args.UNIT;
    }

    weatherjson(args) {
      return Scratch.fetch(
        "https://api.weather.gov/points/" +
          args.LAT.toString() +
          "," +
          args.LONG.toString()
      )
        .then((response) => {
          return response.json().then((json) => {
            return json.properties.forecastGridData;
          });
        })
        .then((url) => {
          return Scratch.fetch(url);
        })
        .then((final) => {
          return final.json();
        })
        .then((data) => {
          return JSON.stringify(data);
        })
        .catch((error) => {
          console.error(error);
          return "Failed to fetch data. See console for more information.";
        });
    }

    weather(args) {
      return Scratch.fetch(
        "https://api.weather.gov/points/" +
          args.LAT.toString() +
          "," +
          args.LONG.toString()
      )
        .then((response) => {
          return response.json().then((json) => {
            return json.properties.forecastGridData;
          });
        })
        .then((url) => {
          return Scratch.fetch(url);
        })
        .then((final) => {
          return final.json();
        })
        .then((data) => {
          const weather = data.properties[args.WEATHER];
          return JSON.stringify(weather.values[0].value);
        })
        .catch((error) => {
          console.error(error);
          return "Failed to fetch data. See console for more information.";
        });
    }

    elevation(args) {
      return Scratch.fetch(
        "https://api.weather.gov/points/" +
          args.LAT.toString() +
          "," +
          args.LONG.toString()
      )
        .then((response) => {
          return response.json().then((json) => {
            return json.properties.forecastGridData;
          });
        })
        .then((url) => {
          return Scratch.fetch(url);
        })
        .then((final) => {
          return final.json();
        })
        .then((data) => {
          const weather = data.properties.elevation;
          return JSON.stringify(weather.value);
        })
        .catch((error) => {
          console.error(error);
          return "Failed to fetch data. See console for more information.";
        });
    }

    weathertype(args) {
      return Scratch.fetch(
        "https://api.weather.gov/points/" +
          args.LAT.toString() +
          "," +
          args.LONG.toString()
      )
        .then((response) => {
          return response.json().then((json) => {
            return json.properties.forecastGridData;
          });
        })
        .then((url) => {
          return Scratch.fetch(url);
        })
        .then((final) => {
          return final.json();
        })
        .then((data) => {
          const weather =
            data.properties.weather.values[0].value[0][args.WEATHER];
          return JSON.stringify(weather).replace(/_/g, " ").replace(/"/g, "");
        })
        .catch((error) => {
          console.error(error);
          return "Failed to fetch data. See console for more information.";
        });
    }
  }

  Scratch.extensions.register(new Meteorology());
})(Scratch);
