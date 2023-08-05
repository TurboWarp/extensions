/*!
 * Copyright 2023 SamuelLouf
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*!
 * Inspired from the ScratchX "Weather" extension
 * https://khanning.github.io/scratch-weather-extension/
 */

(function (Scratch) {
  "use strict";

  localStorage.TurboWarpGeolocationExtension_coordinates = '{}';

  const icon = 'data:image/png;base64,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';

  const getGeolocation_bg_func_delay = ms => new Promise(res => setTimeout(res, ms));

  function getGeolocation_bg_func_success(pos) {
    const crd = pos.coords;
    var TurboWarpGeolocationExtension_coordinates = {
      success: true,
      latitude: crd.latitude,
      longitude: crd.longitude,
      accuracy: crd.accuracy
    };
    localStorage.TurboWarpGeolocationExtension_coordinates = JSON.stringify(TurboWarpGeolocationExtension_coordinates);
  }

  function getGeolocation_bg_func_error(err) {
    var TurboWarpGeolocationExtension_coordinates = {
      success: false,
      error: {
        code: err.code,
        message: err.message
      }
    };
    localStorage.TurboWarpGeolocationExtension_coordinates = JSON.stringify(TurboWarpGeolocationExtension_coordinates);
  }

  async function getGeolocation() {
    localStorage.TurboWarpGeolocationExtension_coordinates = '{}';
    navigator.geolocation.getCurrentPosition(getGeolocation_bg_func_success, getGeolocation_bg_func_error, {enableHighAccuracy: true,timeout: 5000,maximumAge: 0});
    while (localStorage.TurboWarpGeolocationExtension_coordinates == '{}'){
      await getGeolocation_bg_func_delay(100);
    }
    return JSON.parse(localStorage.TurboWarpGeolocationExtension_coordinates);
  }

  async function getCurrentWeather(coordinates = 'here') {
    if (coordinates == 'here'){
      coordinates = await getGeolocation();
    }
    var fetched_json = await Scratch.fetch('https://api.open-meteo.com/v1/forecast?latitude=' + coordinates.latitude + '&longitude=' + coordinates.longitude + '&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m').then(r => r.text()).catch(() => '');
    fetched_json = JSON.parse(fetched_json);
    return fetched_json.current_weather;
  }

  class Weather {
    getInfo() {
      return {
        id: 'samuelloufweather',
        name: 'Weather',
        color1: '#ff8800',
        menuIconURI: icon,
        blocks: [
          {
            opcode: 'when_is_current_weather_at',
            blockType: Scratch.BlockType.HAT,
            text: 'when current [METEO] at latitude [latitude] longitude [longitude] [OPERATORS] [value] degrees',
            isEdgeActivated: true,
            arguments: {
              METEO: {
                type: Scratch.ArgumentType.REPORTER,
                menu: 'meteo_now_no_json_menu'
              },
              latitude: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 49.0770938
              },
              longitude: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 2.0296714
              },
              OPERATORS: {
                type: Scratch.ArgumentType.REPORTER,
                menu: 'operators_menu',
                defaultValue: '>'
              },
              value: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 20
              }
            }
          },
          {
            opcode: 'is_current_weather_at',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'is current [METEO] at latitude [latitude] longitude [longitude] [OPERATORS] [value] degrees',
            arguments: {
              METEO: {
                type: Scratch.ArgumentType.REPORTER,
                menu: 'meteo_now_no_json_menu'
              },
              latitude: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 49.0770938
              },
              longitude: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 2.0296714
              },
              OPERATORS: {
                type: Scratch.ArgumentType.REPORTER,
                menu: 'operators_menu',
                defaultValue: '>'
              },
              value: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 20
              }
            }
          },
          {
            opcode: 'get_current_weather_at',
            blockType: Scratch.BlockType.REPORTER,
            text: 'current [METEO] at latitude [latitude] longitude [longitude]',
            arguments: {
              METEO: {
                type: Scratch.ArgumentType.REPORTER,
                menu: 'meteo_now_menu'
              },
              latitude: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 49.0770938
              },
              longitude: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 2.0296714
              }
            }
          },
          "---",
          "---",
          {
            opcode: 'when_is_current_weather_in',
            blockType: Scratch.BlockType.HAT,
            text: 'when current [METEO] in [place] [OPERATORS] [value] degrees',
            isEdgeActivated: true,
            arguments: {
              METEO: {
                type: Scratch.ArgumentType.REPORTER,
                menu: 'meteo_now_no_json_menu'
              },
              place: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Paris, France'
              },
              OPERATORS: {
                type: Scratch.ArgumentType.REPORTER,
                menu: 'operators_menu',
                defaultValue: '>'
              },
              value: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 20
              }
            }
          },
          {
            opcode: 'is_current_weather_in',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'is current [METEO] in [place] [OPERATORS] [value] degrees',
            arguments: {
              METEO: {
                type: Scratch.ArgumentType.REPORTER,
                menu: 'meteo_now_no_json_menu'
              },
              place: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Paris, France'
              },
              OPERATORS: {
                type: Scratch.ArgumentType.REPORTER,
                menu: 'operators_menu',
                defaultValue: '>'
              },
              value: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 20
              }
            }
          },
          {
            opcode: 'get_current_weather_in',
            blockType: Scratch.BlockType.REPORTER,
            text: 'current [METEO] in [place]',
            arguments: {
              METEO: {
                type: Scratch.ArgumentType.REPORTER,
                menu: 'meteo_now_menu'
              },
              place: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Paris, France'
              }
            }
          },
          "---",
          "---",
          {
            opcode: 'when_is_current_weather_here',
            blockType: Scratch.BlockType.HAT,
            text: 'when current [METEO] in here [OPERATORS] [value] degrees',
            isEdgeActivated: true,
            arguments: {
              METEO: {
                type: Scratch.ArgumentType.REPORTER,
                menu: 'meteo_now_no_json_menu'
              },
              OPERATORS: {
                type: Scratch.ArgumentType.REPORTER,
                menu: 'operators_menu',
                defaultValue: '>'
              },
              value: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 20
              }
            }
          },
          {
            opcode: 'is_current_weather_here',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'is current [METEO] in here [OPERATORS] [value] degrees',
            arguments: {
              METEO: {
                type: Scratch.ArgumentType.REPORTER,
                menu: 'meteo_now_no_json_menu'
              },
              OPERATORS: {
                type: Scratch.ArgumentType.REPORTER,
                menu: 'operators_menu',
                defaultValue: '>'
              },
              value: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 20
              }
            }
          },
          {
            opcode: 'get_current_weather_here',
            blockType: Scratch.BlockType.REPORTER,
            text: 'current [METEO] in here',
            arguments: {
              METEO: {
                type: Scratch.ArgumentType.REPORTER,
                menu: 'meteo_now_menu'
              }
            }
          },
        ],
        menus: {
          meteo_now_menu: {
            acceptReporters: true,
            items: ['temperature (C)', 'temperature (F)', 'weather code', 'wind direction', 'wind speed (km/h)', 'wind speed (mph)' ,'all (JSON)']
          },
          meteo_now_no_json_menu: {
            acceptReporters: true,
            items: ['temperature (C)', 'temperature (F)', 'weather code', 'wind direction', 'wind speed (km/h)', 'wind speed (mph)']
          },
          operators_menu: {
            acceptReporters: true,
            items: ['<', '>', '=', '≈']
          }
        }
      };
    }

    when_is_current_weather_at(args){
      return this.is_current_weather_at(args);
    }

    async is_current_weather_at (args){
      var response = await this.get_current_weather_at(args);
      if (args.OPERATORS == '<'){
        return Number(response) < Number(args.value);
      } else if (args.OPERATORS == '>'){
        return Number(response) > Number(args.value);
      } else if (args.OPERATORS == '='){
        return Number(response) == Number(args.value);
      } else if (args.OPERATORS == '≈'){
        if (args.METEO.includes('temperature')){
          if (args.METEO.includes('(C)')){
            return Number(args.value) - 2.5 < Number(response) && Number(response) < Number(args.value) + 2.5;
          } else {
            return Number(args.value) - 3.6 < Number(response) && Number(response) < Number(args.value) + 3.6;
          }
        } else if (args.METEO.includes('wind speed')){
          if (args.METEO.includes('(km/h)')){
            return Number(args.value) - 10 < Number(response) && Number(response) < Number(args.value) + 10;
          } else {
            return Number(args.value) - 6.2 < Number(response) && Number(response) < Number(args.value) + 6.2;
          }
        }
      }
    }

    async get_current_weather_at(args) {
      var current_weather = await getCurrentWeather(args);

      if (args.METEO.includes('temperature')){
        if (args.METEO.includes('(C)')){
          return current_weather.temperature;
        } else {
          var temperature = (current_weather.temperature * 9 / 5) + 32;
          const letters_of = (text, from, to) => {args.STRING = text.toString();args.LETTER1 = Number(from) || 0;args.LETTER2 = Number(to) || 0;return args.STRING.substring(args.LETTER1 - 1, args.LETTER2);}
          const itemOfFromString = (no, from, splitby) => {var input1 = (Number(no) - 1);var input2 = String(from);var input3 = splitby;return input2.split(input3)[input1] || '';}
          return Number(String(itemOfFromString(1, temperature, '.')) + '.' + letters_of(itemOfFromString(2, temperature, '.'), 1, 2));
        }
      } else if (args.METEO == 'all (JSON)'){
        return JSON.stringify(current_weather);
      } else if (args.METEO.includes('wind speed')){
        if (args.METEO.includes('(km/h)')){
          return current_weather.windspeed;
        } else {
          var wind_speed = current_weather.windspeed / 1.609;
          const letters_of = (text, from, to) => {args.STRING = text.toString();args.LETTER1 = Number(from) || 0;args.LETTER2 = Number(to) || 0;return args.STRING.substring(args.LETTER1 - 1, args.LETTER2);}
          const itemOfFromString = (no, from, splitby) => {var input1 = (Number(no) - 1);var input2 = String(from);var input3 = splitby;return input2.split(input3)[input1] || '';}
          return Number(String(itemOfFromString(1, wind_speed, '.')) + '.' + letters_of(itemOfFromString(2, wind_speed, '.'), 1, 2));
        }
      } else {
        return current_weather[args.METEO.replace(' ', '')];
      }
    }

    when_is_current_weather_in(args){
      return this.is_current_weather_in(args);
    }

    async is_current_weather_in (args){
      var response = await this.get_current_weather_in(args);
      if (args.OPERATORS == '<'){
        return Number(response) < Number(args.value);
      } else if (args.OPERATORS == '>'){
        return Number(response) > Number(args.value);
      } else if (args.OPERATORS == '='){
        return Number(response) == Number(args.value);
      } else if (args.OPERATORS == '≈'){
        if (args.METEO.includes('temperature')){
          if (args.METEO.includes('(C)')){
            return Number(args.value) - 2.5 < Number(response) && Number(response) < Number(args.value) + 2.5;
          } else {
            return Number(args.value) - 3.6 < Number(response) && Number(response) < Number(args.value) + 3.6;
          }
        } else if (args.METEO.includes('wind speed')){
          if (args.METEO.includes('(km/h)')){
            return Number(args.value) - 10 < Number(response) && Number(response) < Number(args.value) + 10;
          } else {
            return Number(args.value) - 6.2 < Number(response) && Number(response) < Number(args.value) + 6.2;
          }
        }
      }
    }

    async get_current_weather_in (args){
      var geolocation_of_place = await Scratch.fetch('https://geocode.maps.co/search?q='+escape(args.place)).then(r => r.text()).catch(() => '');
      geolocation_of_place = JSON.parse(geolocation_of_place);
      var current_weather = await getCurrentWeather({latitude: Number(geolocation_of_place[0].lat), longitude: Number(geolocation_of_place[0].lon)});

      if (args.METEO.includes('temperature')){
        if (args.METEO.includes('(C)')){
          return current_weather.temperature;
        } else {
          var temperature = (current_weather.temperature * 9 / 5 ) + 32;
          const letters_of = (text, from, to) => {args.STRING = text.toString();args.LETTER1 = Number(from) || 0;args.LETTER2 = Number(to) || 0;return args.STRING.substring(args.LETTER1 - 1, args.LETTER2);}
          const itemOfFromString = (no, from, splitby) => {var input1 = (Number(no) - 1);var input2 = String(from);var input3 = splitby;return input2.split(input3)[input1] || '';}
          return Number(String(itemOfFromString(1, temperature, '.')) + '.' + letters_of(itemOfFromString(2, temperature, '.'), 1, 2));
        }
      } else if (args.METEO == 'all (JSON)'){
        return JSON.stringify(current_weather);
      } else if (args.METEO.includes('wind speed')){
        if (args.METEO.includes('(km/h)')){
          return current_weather.windspeed;
        } else {
          var wind_speed = current_weather.windspeed / 1.609;
          const letters_of = (text, from, to) => {args.STRING = text.toString();args.LETTER1 = Number(from) || 0;args.LETTER2 = Number(to) || 0;return args.STRING.substring(args.LETTER1 - 1, args.LETTER2);}
          const itemOfFromString = (no, from, splitby) => {var input1 = (Number(no) - 1);var input2 = String(from);var input3 = splitby;return input2.split(input3)[input1] || '';}
          return Number(String(itemOfFromString(1, wind_speed, '.')) + '.' + letters_of(itemOfFromString(2, wind_speed, '.'), 1, 2));
        }
      } else {
        return current_weather[args.METEO.replace(' ', '')];
      }
    }

    when_is_current_weather_here(args){
      return this.is_current_weather_here(args);
    }

    async get_current_weather_here(args) {
      var current_weather = await getCurrentWeather();

      if (args.METEO.includes('temperature')){
        if (args.METEO.includes('(C)')){
          return current_weather.temperature;
        } else {
          var temperature = (current_weather.temperature * 9 / 5) + 32;
          const letters_of = (text, from, to) => {args.STRING = text.toString();args.LETTER1 = Number(from) || 0;args.LETTER2 = Number(to) || 0;return args.STRING.substring(args.LETTER1 - 1, args.LETTER2);}
          const itemOfFromString = (no, from, splitby) => {var input1 = (Number(no) - 1);var input2 = String(from);var input3 = splitby;return input2.split(input3)[input1] || '';}
          return Number(String(itemOfFromString(1, temperature, '.')) + '.' + letters_of(itemOfFromString(2, temperature, '.'), 1, 2));
        }
      } else if (args.METEO == 'all (JSON)'){
        return JSON.stringify(current_weather);
      } else if (args.METEO.includes('wind speed')){
        if (args.METEO.includes('(km/h)')){
          return current_weather.windspeed;
        } else {
          var wind_speed = current_weather.windspeed / 1.609;
          const letters_of = (text, from, to) => {args.STRING = text.toString();args.LETTER1 = Number(from) || 0;args.LETTER2 = Number(to) || 0;return args.STRING.substring(args.LETTER1 - 1, args.LETTER2);}
          const itemOfFromString = (no, from, splitby) => {var input1 = (Number(no) - 1);var input2 = String(from);var input3 = splitby;return input2.split(input3)[input1] || '';}
          return Number(String(itemOfFromString(1, wind_speed, '.')) + '.' + letters_of(itemOfFromString(2, wind_speed, '.'), 1, 2));
        }
      } else {
        return current_weather[args.METEO.replace(' ', '')];
      }
    }

    async is_current_weather_here (args){
      var response = await this.get_current_weather_here(args);
      if (args.OPERATORS == '<'){
        return Number(response) < Number(args.value);
      } else if (args.OPERATORS == '>'){
        return Number(response) > Number(args.value);
      } else if (args.OPERATORS == '='){
        return Number(response) == Number(args.value);
      } else if (args.OPERATORS == '≈'){
        if (args.METEO.includes('temperature')){
          if (args.METEO.includes('(C)')){
            return Number(args.value) - 2.5 < Number(response) && Number(response) < Number(args.value) + 2.5;
          } else {
            return Number(args.value) - 3.6 < Number(response) && Number(response) < Number(args.value)+3.6;
          }
        } else if (args.METEO.includes('wind speed')){
          if (args.METEO.includes('(km/h)')){
            return Number(args.value) - 10 < Number(response) && Number(response) < Number(args.value) + 10;
          } else {
            return Number(args.value) - 6.2 < Number(response) && Number(response) < Number(args.value) + 6.2;
          }
        }
      }
    }
  }
  Scratch.extensions.register(new Weather());
})(Scratch);
