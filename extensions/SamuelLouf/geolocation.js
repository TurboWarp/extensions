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

(function (Scratch) {
  'use strict';
    
  const delay = ms => new Promise(res => setTimeout(res, ms));
    
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };
  
  function success(pos) {
    const crd = pos.coords;
    TurboWarpGeolocationExtension_coordinates = {
      success: true,
      latitude: crd.latitude,
      longitude: crd.longitude,
      accuracy: crd.accuracy
    };
    localStorage.TurboWarpGeolocationExtension_coordinates = JSON.stringify(TurboWarpGeolocationExtension_coordinates);
  }
  
  function error(err) {
    TurboWarpGeolocationExtension_coordinates = {
      success: false,
      error: {
        code: err.code,
        message: err.message
      }
    };
    localStorage.TurboWarpGeolocationExtension_coordinates = JSON.stringify(TurboWarpGeolocationExtension_coordinates);
  }

  async function getGeolocation() {
    localStorage.TurboWarpGeolocationExtension_coordinates = '{}'
    navigator.geolocation.getCurrentPosition(success, error, options);
    while (localStorage.TurboWarpGeolocationExtension_coordinates == '{}'){
      await delay(100);
    }
    return JSON.parse(localStorage.TurboWarpGeolocationExtension_coordinates);
  }

  const icon = 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxMTAuODAyNSIgaGVpZ2h0PSIxMTAuNDAyNDkiIHZpZXdCb3g9IjAsMCwxMTAuODAyNSwxMTAuNDAyNDkiPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xODQuNTk4NzUsLTEyNC43OTg3NSkiPjxnIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2lzUGFpbnRpbmdMYXllciZxdW90Ozp0cnVlfSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0xODQuNTk4NzUsMjM1LjIwMTI1di0xMTAuNDAyNDloMTEwLjgwMjV2MTEwLjQwMjQ5eiIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMCIvPjxwYXRoIGQ9Ik0yNDEuNzc3MTQsMjE2LjQwNzcyYy0wLjU0NTUyLDAuNDA5NjQgLTEuMjg5MjEsMC40MzM2MyAtMS44NiwwLjA2Yy02LjE0MzY2LC0zLjg2ODY0IC0xMS41OTg1OSwtOC43MzU1IC0xNi4xNCwtMTQuNGMtNS41NTkxLC02Ljc1NTkyIC05LjI5NzYsLTE0LjgyMTU4IC0xMC44NiwtMjMuNDNjLTEuMjksLTcuOTkgLTAuMDYsLTE1LjY3IDMuOTQsLTIxLjkyYzEuNjE0OTMsLTIuNTM4ODEgMy42NDI4NywtNC43ODk4MyA2LC02LjY2YzUuMTU3NjksLTQuMzA2MjUgMTEuNjQxNSwtNi43MDQxMyAxOC4zNiwtNi43OWM2LjUwNTg5LDAuMTA0OTYgMTIuNzM1OTYsMi42NDU1MSAxNy40Niw3LjEyYzEuODE0MzUsMS42NjMyMiAzLjM4MzM1LDMuNTc1NjQgNC42Niw1LjY4YzQuMjcsNyA1LjE5LDE2IDMuMzEsMjUuMTJjLTMuMTgyMzQsMTQuNjIxNzcgLTEyLjE1NTQ4LDI3LjMyOTIyIC0yNC44NywzNS4yMnpNMjQwLjAwNzE0LDE1Ny40Nzc3MWM3LjU3NzM1LDAgMTMuNzIsNi4xNDI2NSAxMy43MiwxMy43MmMwLDcuNTc3MzUgLTYuMTQyNjUsMTMuNzIgLTEzLjcyLDEzLjcyYy03LjU3NzM1LDAgLTEzLjcyLC02LjE0MjY1IC0xMy43MiwtMTMuNzJjMCwtNy41NzczNSA2LjE0MjY1LC0xMy43MiAxMy43MiwtMTMuNzJ6IiBmaWxsPSIjMDM2ZTE1IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZT0iIzAwYTExYiIgc3Ryb2tlLXdpZHRoPSIxLjUiLz48L2c+PC9nPjwvc3ZnPjwhLS1yb3RhdGlvbkNlbnRlcjo1NS40MDEyNTAwMDAwMDAwMDU6NTUuMjAxMjQ1LS0+';

  class Geolocation {
    getInfo() {
      return {
        id: 'samuelloufgeolocation',
        name: 'Geolocation',
        color1: '#036e15',
        color2: '#00A11B',
        menuIconURI: icon,
        blocks: [
          {
            opcode: 'is_geolocation_supported',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'is geolocation supported by this device?',
          },
          {
            opcode: 'is_geolocation_allowed',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'is geolocation allowed?',
          },
          {
            opcode: 'get_current',
            blockType: Scratch.BlockType.REPORTER,
            text: 'get [WHAT]',
            arguments: { 
              WHAT: {
                type: Scratch.ArgumentType.REPORTER,
                menu: 'get_current_menu',
                defaultValue: 'longitude'
              }
            }
          },
          {
            opcode: 'set_timeout_to_value',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set timeout to [SECONDS] seconds',
            arguments: { 
              SECONDS: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 5
              }
            }
          },
          {
            opcode: 'add_value_to_timeout',
            blockType: Scratch.BlockType.COMMAND,
            text: 'add [SECONDS] seconds to timeout',
            arguments: { 
              SECONDS: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1
              }
            }
          },
          {
            opcode: 'get_timeout',
            blockType: Scratch.BlockType.REPORTER,
            text: 'get timeout'
          }
        ],
        menus: {
          get_current_menu: {
            acceptReporters: true,
            items: ['longitude', 'latitude', 'accuracy']
          }
        }
      };
    }
    
    async get_current (args) {
      var coordinates = await getGeolocation();
      if (coordinates.success == true){
        return coordinates[args.WHAT];
      } else {
        return "Error: " + coordinates.error.message;
      }
    }

    async is_geolocation_allowed () {
      var coordinates = await getGeolocation();
      if (coordinates.success == false && coordinates.error.code == 1) {
        return false;
      } else {
        return true;
      }
    }

    async is_geolocation_supported () {
      if (navigator.geolocation){
        return true;
      } else {
        return false;
      }
    }

    set_timeout_to_value (args) {
      options.timeout = Number(args.SECONDS)*1000;
    }

    add_value_to_timeout (args) {
      options.timeout = options.timeout + Number(args.SECONDS)*1000;
    }

    get_timeout () {
      return options.timeout/1000;
    }
  }
  Scratch.extensions.register(new Geolocation());
})(Scratch);