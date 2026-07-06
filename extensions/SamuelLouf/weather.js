// Name: Weather
// ID: samuelloufweather
// Description: Gets the weather anywhere.
// By: SamuelLouf <https://scratch.mit.edu/users/samuellouf/>

(function (Scratch) {
  "use strict";
  
  const icon = 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIyOTkuNDk4NjEiIGhlaWdodD0iMjk5LjM4MzQiIHZpZXdCb3g9IjAsMCwyOTkuNDk4NjEsMjk5LjM4MzQiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC05MC4yNTA2OSwtMzAuMzA4MykiPjxnIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIj48cGF0aCBkPSJNMzg5Ljc0OTMxLDE3OS45OTk5OWMwLDgyLjY3MjQ1IC02Ny4wNDUwNSwxNDkuNjkxNzEgLTE0OS43NDkzLDE0OS42OTE3MWMtODIuNzA0MjUsMCAtMTQ5Ljc0OTMsLTY3LjAxOTI3IC0xNDkuNzQ5MywtMTQ5LjY5MTcxYzAsLTgyLjY3MjQ1IDY3LjA0NTA2LC0xNDkuNjkxNjkgMTQ5Ljc0OTMxLC0xNDkuNjkxNjljODIuNzA0MjUsMCAxNDkuNzQ5MzEsNjcuMDE5MjYgMTQ5Ljc0OTMxLDE0OS42OTE3MXoiIGZpbGw9IiNmZjgwMDAiIHN0cm9rZS13aWR0aD0iMCIvPjxwYXRoIGQ9Ik0zMDYuNDk4MDcsMTgzLjY4MDU4YzAsMzYuMDgyNDUgLTI5LjczNzM5LDY1LjMzMzA1IC02Ni40MjAzMSw2NS4zMzMwNWMtMzYuNjgyOTIsMCAtNjYuNDIwMzEsLTI5LjI1MDYxIC02Ni40MjAzMSwtNjUuMzMzMDVjMCwtMzYuMDgyNDUgMjkuNzM3MzksLTY1LjMzMzA0IDY2LjQyMDMxLC02NS4zMzMwNGMzNi42ODI5MiwwIDY2LjQyMDMxLDI5LjI1MDYgNjYuNDIwMzEsNjUuMzMzMDV6IiBmaWxsPSIjZmZmZjAwIiBzdHJva2Utd2lkdGg9IjkiLz48cGF0aCBkPSJNMjM5LjM3MTM4LDI1NC42MDY4OWw0MC4yMzIyLC0xNC4wNDQ1M2wtNi41NTU0NSw1My4xMDQ5MnoiIGZpbGw9IiNmZmZmMDAiIHN0cm9rZS13aWR0aD0iOSIvPjxwYXRoIGQ9Ik0yODEuOTgyMzksMjM3Ljk3MDk4bDI2LjU2MTA3LC0zNi4zMDg5NmwxNC45Mjc3NiwzOC4yNjE5N3oiIGZpbGw9IiNmZmZmMDAiIHN0cm9rZS13aWR0aD0iOSIvPjxwYXRoIGQ9Ik0zMDIuNjY4NzgsMTUzLjAxMzUzbDQ5LjYwNjcsMjEuMTA5ODJsLTQzLjY2MjgyLDI0LjU5MDg0eiIgZmlsbD0iI2ZmZmYwMCIgc3Ryb2tlLXdpZHRoPSI5Ii8+PHBhdGggZD0iTTI2Ni43ODU3NSwxMjAuMzAwNjRsNjEuMzI0ODIsLTMzLjE4NDEybC0yNC41MjMyMyw2My4yNjA2M3oiIGZpbGw9IiNmZmZmMDAiIHN0cm9rZS13aWR0aD0iOSIvPjxwYXRoIGQ9Ik0xODEuODY3OTYsMTQ1LjEyNTE5bC0yMS40ODMyMSwtNzIuMjQ0NTFsNjEuNDIwOTIsNDQuODIzMDd6IiBmaWxsPSIjZmZmZjAwIiBzdHJva2Utd2lkdGg9IjkiLz48cGF0aCBkPSJNMjIxLjA1NDEzLDExNS44MDg3N2wyNi41NjEwNiwtMjkuMjc4MDhsMjAuMDA1NjEsMzAuNDQ5OXoiIGZpbGw9IiNmZmZmMDAiIHN0cm9rZS13aWR0aD0iOSIvPjxwYXRoIGQ9Ik0xMjYuMTk5OTksMjM4LjAzODk5bDQyLjk2NjQzLC00Ny42MzY0N2wyMC43ODY4Miw0My4zMzk4MnoiIGZpbGw9IiNmZmZmMDAiIHN0cm9rZS13aWR0aD0iOSIvPjxwYXRoIGQ9Ik0xODQuNzg2MTIsMjkzLjMzMDUybDUuMzgyNjcsLTU4LjQxMTUzbDQ1Ljg3MTI1LDE3LjM5ODEzeiIgZmlsbD0iI2ZmZmYwMCIgc3Ryb2tlLXdpZHRoPSI5Ii8+PHBhdGggZD0iTTE2OS43MDEzMywxOTEuNzg2NjZsLTI2LjE3MDQ2LC0zMi43OTM1MmwzMi44OTU1NCwtMTEuNzM1MzJ6IiBmaWxsPSIjZmZmZjAwIiBzdHJva2Utd2lkdGg9IjkiLz48L2c+PC9nPjwvc3ZnPjwhLS1yb3RhdGlvbkNlbnRlcjoxNDkuNzQ5MzA1OjE0OS42OTE3LS0+';
  
  /**
   * Get Current Weather
   * @param {{ latitude: any; longitude: any; }} coordinates
   */
  async function getCurrentWeather(coordinates) {
    var fetched_json = await Scratch.fetch(`https://api.open-meteo.com/v1/forecast?latitude=${coordinates.latitude}&longitude=${coordinates.longitude}&current_weather=true&hourly=temperature_2m,relativehumidity_2m,windspeed_10m`).then(r => r.text()).catch(() => '');
    if (!fetched_json) return '';
    fetched_json = JSON.parse(fetched_json);
    // @ts-ignore
    return fetched_json.current_weather;
  }

  /**
   * Slice
   * @param {String} text 
   * @param {*} from 
   * @param {*} to 
   * @returns {String}
   */
  const lettersOf = (text, from, to) => text.substring(from || 0, to || 0);

  /**
   * Get an item from a split string
   * @param {Number} no 
   * @param {*} from 
   * @param {String} splitby 
   * @returns {String}
   */
  const itemOfFromString = (no, from, splitby) => Scratch.Cast.toString(from).split(splitby)[no] || '';

  /**
   * Compare two numbers
   * @param {Number} a 
   * @param {Number} b 
   * @param {String} comparison 
   * @param {Number} margin 
   */
  function compare(a, b, comparison, margin = 0){
    if (comparison == '<') return a < b;
    if (comparison == '>') return a > b;
    if (comparison == '=') return a == b;
    return Math.abs(a - b) <= margin;
  }

  /**
   * Get latitude and longitude from adress
   * @param {string} adress
   */
  async function getCoordinatesFromAdress(adress){
    var response = await Scratch.fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(adress)}`).then((r) => r.text()).catch(() => '');
    if (!response) return '';
    response = JSON.parse(response);
    // @ts-ignore
    return response.features[0].geometry.coordinates;
  }

  const meteo_now_menu = ['temperature (C)', 'temperature (F)', 'weather code', 'wind direction', 'wind speed (km/h)', 'wind speed (mph)'];

  class Weather {
    getInfo() {
      return {
        id: 'samuelloufweather',
        name: Scratch.translate('Weather'),
        color1: '#ff8800',
        menuIconURI: icon,
        blocks: [
          {
            opcode: 'is_current_weather_at',
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate('is current [METEO] at latitude [latitude] longitude [longitude] [OPERATORS] [value] degrees'),
            arguments: {
              METEO: {
                type: Scratch.ArgumentType.STRING,
                menu: 'meteo_now_no_json_menu'
              },
              latitude: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 42.3592593
              },
              longitude: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: -71.0933625
              },
              OPERATORS: {
                type: Scratch.ArgumentType.STRING,
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
            text: Scratch.translate('current [METEO] at latitude [latitude] longitude [longitude]'),
            arguments: {
              METEO: {
                type: Scratch.ArgumentType.STRING,
                menu: 'meteo_now_menu'
              },
              latitude: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 42.3592593
              },
              longitude: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: -71.0933625
              }
            }
          },
          "---",
          "---",
          {
            opcode: 'is_current_weather_in',
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate('is current [METEO] in [place] [OPERATORS] [value] degrees'),
            arguments: {
              METEO: {
                type: Scratch.ArgumentType.STRING,
                menu: 'meteo_now_no_json_menu'
              },
              place: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Paris, France'
              },
              OPERATORS: {
                type: Scratch.ArgumentType.STRING,
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
            text: Scratch.translate('current [METEO] in [place]'),
            arguments: {
              METEO: {
                type: Scratch.ArgumentType.STRING,
                menu: 'meteo_now_menu'
              },
              place: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Paris, France'
              }
            }
          },
        ],
        menus: {
          meteo_now_menu: {
            acceptReporters: true,
            items: meteo_now_menu.concat('all (JSON)')
          },
          meteo_now_no_json_menu: {
            acceptReporters: true,
            items: meteo_now_menu
          },
          operators_menu: {
            acceptReporters: true,
            items: ['<', '>', '=', '≈']
          }
        }
      };
    }

    /**
     * @param {{ [x: string]: any; temperature: number; windspeed: number; }} weather
     * @param {{ METEO: string; }} args
     */
    get_current_weather(weather, args){
      if (args.METEO.includes('temperature')){
        if (args.METEO.includes('(C)')){
          return weather.temperature;
        } else {
          var temperature = (weather.temperature * 9 / 5) + 32;
          return Scratch.Cast.toNumber(Scratch.Cast.toString(itemOfFromString(0, temperature, '.')) + '.' + lettersOf(itemOfFromString(1, temperature, '.'), 0, 1));
        }
      } else if (args.METEO == 'all (JSON)'){
        return JSON.stringify(weather);
      } else if (args.METEO.includes('wind speed')){
        if (args.METEO.includes('(km/h)')){
          return weather.windspeed;
        } else {
          var wind_speed = weather.windspeed / 1.609;
          return Scratch.Cast.toNumber(Scratch.Cast.toString(itemOfFromString(0, wind_speed, '.')) + '.' + lettersOf(itemOfFromString(1, wind_speed, '.'), 0, 1));
        }
      } else {
        return weather[args.METEO.replace(' ', '')];
      }
    }

    /**
     * @param {{ OPERATORS: string; value: any; METEO: string | string[]; }} args
     */
    async is_current_weather_at (args){
      var value = Scratch.Cast.toNumber(args.value);
      var response = await this.get_current_weather_at(args);
      response = Scratch.Cast.toNumber(response);
      var margin = args.METEO.includes('temperature') ? (args.METEO.includes('(C)') ? 2.5 : 3.6) : (args.METEO.includes('wind speed') ? (args.METEO.includes('(km/h)') ? 10 : 6.2) : 0);
      return compare(response, value, args.OPERATORS, margin);
    }

    /**
     * @param {{ OPERATORS?: string; value?: any; METEO?: any; latitude?: any; longitude?: any; }} args
     */
    async get_current_weather_at(args) {
      var current_weather = await getCurrentWeather({ latitude: args.latitude, longitude: args.longitude });
      return this.get_current_weather(current_weather, { METEO: args.METEO });
    }

    /**
     * @param {{ OPERATORS: string; value: any; METEO: string | string[]; }} args
     */
    async is_current_weather_in (args){
      var response = await this.get_current_weather_in(args);
      var value = Scratch.Cast.toNumber(args.value);
      response = Scratch.Cast.toNumber(response);
      var margin = args.METEO.includes('temperature') ? (args.METEO.includes('(C)') ? 2.5 : 3.6) : (args.METEO.includes('wind speed') ? (args.METEO.includes('(km/h)') ? 10 : 6.2) : 0);
      return compare(response, value, args.OPERATORS, margin);
    }

    /**
     * @param {{ OPERATORS?: string; value?: any; METEO: any; place?: any; }} args
     */
    async get_current_weather_in (args){
      var geolocation = await getCoordinatesFromAdress(args.place);
      if (!geolocation) return '';
      var current_weather = await getCurrentWeather({latitude: geolocation[1], longitude: geolocation[0]});
      return this.get_current_weather(current_weather, { METEO: args.METEO });
    }
  }
  Scratch.extensions.register(new Weather());
})(Scratch);
