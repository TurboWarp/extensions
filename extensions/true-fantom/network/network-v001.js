(function(Scratch) {
  'use strict';

  const icon = 'data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwLDAsMjI1LjM1NDgsMjI1LjM1NDgiIGhlaWdodD0iMjI1LjM1NDgiIHdpZHRoPSIyMjUuMzU0OCIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmVyc2lvbj0iMS4xIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTI3LjMyMjc0LC02Ny4zMjI2KSI+PGcgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZT0ibm9uZSIgZmlsbC1ydWxlPSJub256ZXJvIiBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iPjxwYXRoIHN0cm9rZS13aWR0aD0iMCIgZmlsbD0iIzE0NjYwMCIgZD0iTTEyNy4zMjI3NSwxODBjMCwtNjIuMjMwMDEgNTAuNDQ3MzksLTExMi42Nzc0IDExMi42Nzc0LC0xMTIuNjc3NGM2Mi4yMzAwMSwwIDExMi42Nzc0LDUwLjQ0NzM5IDExMi42Nzc0LDExMi42Nzc0YzAsNjIuMjMwMDEgLTUwLjQ0NzM5LDExMi42Nzc0IC0xMTIuNjc3NCwxMTIuNjc3NGMtNjIuMjMwMDEsMCAtMTEyLjY3NzQsLTUwLjQ0NzM5IC0xMTIuNjc3NCwtMTEyLjY3NzR6Ij48L3BhdGg+PGcgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSIjZmZmZmZmIj48cGF0aCBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpbmRleCZxdW90OzpudWxsfSIgZD0iTTI2MS4zNjIzNSwxNDYuNjIzNTlsLTUuMTUwOTcsNS4yNzQ2MmwtMTMuMTg1NTEsLTEyLjIzOTg5bDE5LjIzNjg5LC0xOS40OTU4OWMxMC41OTE0NywtMTAuNTkxNDcgMjcuNzU4NCwtMTAuNTkxNDcgMzguMzQxMTIsMGwxMi43ODAzOCwxMi43ODAzOGMxMC41OTE0NywxMC41ODI3MSAxMC41OTE0NywyNy43NDk2NSAwLDM4LjM0MTEybC0zOC4zNDExMiwzOC4zNDExMmMtMTAuNTkxNDcsMTAuNTg2OTUgLTI3Ljc0OTY1LDEwLjU4Njk1IC0zOC4zNDExMiwwbC0xMi43ODAzNywtMTIuNzgwMzdsLTEyLjY3Mzc4LC0xMy4yMjYxMmwxMi4yNjMwNCwtMTIuNDMzbDI1Ljk3MTQ5LDI1LjY1OTEyYzMuNTIxNzQsMy41MjE3NCA5LjI1ODY0LDMuNTIxNzQgMTIuNzgwMzgsMGwzOC4zNDExMiwtMzguMzQxMTJjMy41MzA0OSwtMy41MzA0OSAzLjUzMDQ5LC05LjI1ODY0IDAsLTEyLjc4MDM4bC0xMi43ODAzNywtMTIuNzgwMzdjLTMuNTIxNzQsLTMuNTIxNzMgLTkuMjQ5ODgsLTMuNTMwNDkgLTEyLjc4MDM4LDBsLTEzLjY4MDc5LDEzLjY4MDc5eiI+PC9wYXRoPjxwYXRoIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2luZGV4JnF1b3Q7Om51bGx9IiBkPSJNMjE4LjYzNzczLDIxMy4zNzY0bDUuMTUwOTcsLTUuMjc0NjJsMTMuMTg1NTEsMTIuMjM5ODlsLTE5LjIzNjg5LDE5LjQ5NTg5Yy0xMC41OTE0NywxMC41OTE0NyAtMjcuNzU4NCwxMC41OTE0NyAtMzguMzQxMTIsMGwtMTIuNzgwMzgsLTEyLjc4MDM4Yy0xMC41OTE0NywtMTAuNTgyNzEgLTEwLjU5MTQ3LC0yNy43NDk2NSAwLC0zOC4zNDExMWwzOC4zNDExMiwtMzguMzQxMTJjMTAuNTkxNDcsLTEwLjU4Njk1IDI3Ljc0OTY1LC0xMC41ODY5NSAzOC4zNDExMiwwbDEyLjc4MDM3LDEyLjc4MDM3bDEyLjY3Mzc4LDEzLjIyNjEybC0xMi4yNjMwNSwxMi40MzNsLTI1Ljk3MTQ4LC0yNS42NTkxMmMtMy41MjE3NCwtMy41MjE3NCAtOS4yNTg2NCwtMy41MjE3NCAtMTIuNzgwMzgsMGwtMzguMzQxMTIsMzguMzQxMTJjLTMuNTMwNDksMy41MzA0OSAtMy41MzA0OSw5LjI1ODY0IDAsMTIuNzgwMzhsMTIuNzgwMzcsMTIuNzgwMzdjMy41MjE3NCwzLjUyMTczIDkuMjQ5ODgsMy41MzA0OSAxMi43ODAzOCwwbDEzLjY4MDc5LC0xMy42ODA3OXoiPjwvcGF0aD48L2c+PC9nPjwvZz48L3N2Zz48IS0tcm90YXRpb25DZW50ZXI6MTEyLjY3NzI1NToxMTIuNjc3NDA1LS0+';

  const computing = new Map();
  
  const computed = new Map();

  const ping_web_socket = async (SERVER) => {
    let ws;
    try {
      ws = new WebSocket(SERVER);
    } catch (err) {
      return {
        expires: 0,
        value: false
      };
    }
    let timeout_id;
    const isUp = await new Promise((resolve) => {
      ws.onopen = () => {
        setTimeout(() => {
          resolve(true);
        }, 2000)
      };
      ws.onclose = () => {
        resolve(false);
      };
      ws.onerror = () => {
        resolve(false);
      };
      timeout_id = setTimeout(() => {
        ws.close();
      }, 5000);
    });
    ws.close();
    clearTimeout(timeout_id);
    return {
      expires: Date.now() + 60000,
      value: isUp
    };
  };

  const cached_ping_web_socket = (SERVER) => {
    const computing_entry = computing.get(SERVER);
    if (computing_entry) {
      return computing_entry.then((entry) => entry.value);
    }
    const computed_entry = computed.get(SERVER);
    if (computed_entry && Date.now() < computed_entry.expires) {
      return computed_entry.value;
    }
    const promise = ping_web_socket(SERVER);
    computing.set(SERVER, promise);
    return promise.then((entry) => {
      computing.delete(SERVER);
      computed.set(SERVER, entry);
      return entry.value;
    });
  };
  
  const content_type_check = (CONTENT_TYPE) => {
    if (CONTENT_TYPE === 1 || CONTENT_TYPE === 2) {
      return CONTENT_TYPE;
    }
    else {
      return 2;
    }
  };
  
  const only_url_response_type_check = (RESPONSE_TYPE) => {
    if (RESPONSE_TYPE === 1 || RESPONSE_TYPE === 2 || RESPONSE_TYPE === 3 || RESPONSE_TYPE === 4 || RESPONSE_TYPE === 5 || RESPONSE_TYPE === 6 || RESPONSE_TYPE === 7 || RESPONSE_TYPE === 8) {
      return RESPONSE_TYPE;
    }
    else {
      return 8;
    }
  };
  
  const response_type_check = (RESPONSE_TYPE) => {
    if (RESPONSE_TYPE === 1 || RESPONSE_TYPE === 2 || RESPONSE_TYPE === 3 || RESPONSE_TYPE === 4 || RESPONSE_TYPE === 5 || RESPONSE_TYPE === 6 || RESPONSE_TYPE === 7 || RESPONSE_TYPE === 8 || RESPONSE_TYPE === 9) {
      return RESPONSE_TYPE;
    }
    else {
      return 9;
    }
  };
  
  const body_check = (BODY, CONTENT_TYPE) => {
    if (CONTENT_TYPE === 2) {
      return JSON.stringify(BODY);
    }
    else {
      return BODY;
    }
  };
  
  const fetch_url = (URL, BODY, CONTENT_TYPE, RESPONSE_TYPE, METHOD) => {
    if (METHOD === 'GET' || METHOD === 'DELETE') {
      if (RESPONSE_TYPE === 1) {
        return fetch(URL, {
        method: METHOD,
        headers: {},
        redirect: 'follow'})
        .then(res => res.text())
        .catch(err => '');
      }
      else if (RESPONSE_TYPE === 2) {
        return fetch(URL, {
        method: METHOD,
        headers: {},
        redirect: 'follow'})
        .then(res => res.json())
        .catch(err => '');
      }
      else if (RESPONSE_TYPE === 3) {
        return fetch(URL, {
        method: METHOD,
        headers: {},
        redirect: 'follow'})
        .then(res => String(res.ok))
        .catch(err => '');
      }
      else if (RESPONSE_TYPE === 4) {
        return fetch(URL, {
        method: METHOD,
        headers: {},
        redirect: 'follow'})
        .then(res => res.status)
        .catch(err => '');
      }
      else if (RESPONSE_TYPE === 5) {
        return fetch(URL, {
        method: METHOD,
        headers: {},
        redirect: 'follow'})
        .then(res => res.statusText)
        .catch(err => '');
      }
      else if (RESPONSE_TYPE === 6) {
        return fetch(URL, {
        method: METHOD,
        headers: {},
        redirect: 'follow'})
        .then(res => res.type)
        .catch(err => '');
      }
      else if (RESPONSE_TYPE === 7) {
        return fetch(URL, {
        method: METHOD,
        headers: {},
        redirect: 'follow'})
        .then(res => String(res.redirected))
        .catch(err => '');
      }
      else if (RESPONSE_TYPE === 8) {
        return fetch(URL, {
        method: METHOD,
        headers: {},
        redirect: 'follow'})
        .then(res => res.url)
        .catch(err => '');
      }
    }
    else {  
      if (RESPONSE_TYPE === 1) {
        return fetch(URL, {
        method: METHOD,
        headers: {
          'Content-Type': CONTENT_TYPE
        },
        redirect: 'follow',
        body: BODY})
        .then(res => res.text())
        .catch(err => '');
      }
      else if (RESPONSE_TYPE === 2) {
        return fetch(URL, {
        method: METHOD,
        headers: {
          'Content-Type': CONTENT_TYPE
        },
        redirect: 'follow',
        body: BODY})
        .then(res => res.json())
        .catch(err => '');
      }
      else if (RESPONSE_TYPE === 3) {
        return fetch(URL, {
        method: METHOD,
        headers: {
          'Content-Type': CONTENT_TYPE
        },
        redirect: 'follow',
        body: BODY})
        .then(res => String(res.ok))
        .catch(err => '');
      }
      else if (RESPONSE_TYPE === 4) {
        return fetch(URL, {
        method: METHOD,
        headers: {
          'Content-Type': CONTENT_TYPE
        },
        redirect: 'follow',
        body: BODY})
        .then(res => res.status)
        .catch(err => '');
      }
      else if (RESPONSE_TYPE === 5) {
        return fetch(URL, {
        method: METHOD,
        headers: {
          'Content-Type': CONTENT_TYPE
        },
        redirect: 'follow',
        body: BODY})
        .then(res => res.statusText)
        .catch(err => '');
      }
      else if (RESPONSE_TYPE === 6) {
        return fetch(URL, {
        method: METHOD,
        headers: {
          'Content-Type': CONTENT_TYPE
        },
        redirect: 'follow',
        body: BODY})
        .then(res => res.type)
        .catch(err => '');
      }
      else if (RESPONSE_TYPE === 7) {
        return fetch(URL, {
        method: METHOD,
        headers: {
          'Content-Type': CONTENT_TYPE
        },
        redirect: 'follow',
        body: BODY})
        .then(res => String(res.redirected))
        .catch(err => '');
      }
      else if (RESPONSE_TYPE === 8) {
        return fetch(URL, {
        method: METHOD,
        headers: {
          'Content-Type': CONTENT_TYPE
        },
        redirect: 'follow',
        body: BODY})
        .then(res => res.url)
        .catch(err => '');
      }
      else if (RESPONSE_TYPE === 9) {
        return fetch(URL, {
        method: METHOD,
        headers: {
          'Content-Type': CONTENT_TYPE
        },
        redirect: 'follow',
        body: BODY})
        .then(res => String(res.bodyUsed))
        .catch(err => '');
      }
    }
  };
  
  const window_check = (WINDOW) => {
    if (!isNaN(WINDOW)) {
      return WINDOW;
    }
    else {
      return '';
    }
  };
  
  const width_check = (WIDTH) => {
    if (Number(WIDTH) >= 100) {
      if (Number(WIDTH) <= window.screen.width) {
        return Number(WIDTH);
      }
      else {
        return window.screen.width;
      }
    }
    else {
      return 100;
    }
  };
  
  const height_check = (HEIGHT) => {
    if (Number(HEIGHT) >= 100) {
      if (Number(HEIGHT) <= window.screen.height) {
        return Number(HEIGHT);
      }
      else {
        return window.screen.height;
      }
    }
    else {
      return 100;
    }
  };
  
  const left_check = (LEFT) => {
    if (Number(LEFT) >= 0) {
      if (Number(LEFT) <= window.screen.width) {
        return Number(LEFT);
      }
      else {
        return window.screen.width;
      }
    }
    else {
      return 0;
    }
  };
  
  const top_check = (TOP) => {
    if (Number(TOP) >= 0) {
      if (Number(TOP) <= window.screen.height) {
        return Number(TOP);
      }
      else {
        return window.screen.height;
      }
    }
    else {
      return 0;
    }
  };
  
  class Network {

    constructor() {}

    getInfo() {
      return {

        id: 'network001',
        name: 'Network',
        
        color1: '#146600',
        color2: '#125C00',
        color3: '#105200',

        menuIconURI: icon,

        blocks: [
          
          {
            opcode: 'connected_to_internet_block',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'connected to internet?',
            arguments: {}
          },
          
          '---',
          
          {
            opcode: 'browser_block',
            blockType: Scratch.BlockType.REPORTER,
            text: 'browser',
            arguments: {}
          },
          
          '---',
          
          {
            opcode: 'current_url_block',
            blockType: Scratch.BlockType.REPORTER,
            text: 'current url',
            arguments: {}
          },
          
          '---',
          
          {
            opcode: 'network_type_block',
            blockType: Scratch.BlockType.REPORTER,
            text: 'network type',
            arguments: {}
          },
          
          {
            opcode: 'network_generation_block',
            blockType: Scratch.BlockType.REPORTER,
            text: 'network generation',
            arguments: {}
          },
          
          '---',
          
          {
            opcode: 'downlink_speed_block',
            blockType: Scratch.BlockType.REPORTER,
            text: 'downlink speed in mb/s',
            arguments: {}
          },
          
          {
            opcode: 'downlink_max_speed_block',
            blockType: Scratch.BlockType.REPORTER,
            text: 'downlink max speed in mb/s',
            arguments: {}
          },
          
          {
            opcode: 'network_rtt_block',
            blockType: Scratch.BlockType.REPORTER,
            text: 'network rtt in ms',
            arguments: {}
          },
          
          '---',
          
          {
            opcode: 'ping_block',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'is cloud data server up [SERVER] ?',
            arguments: {
              SERVER: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'wss://clouddata.turbowarp.org',
              }
            }
          },
          
          '---',
          
          {
            opcode: 'get_block',
            blockType: Scratch.BlockType.REPORTER,
            text: 'get [URL] respond [RESPONSE_TYPE]',
            arguments: {
              URL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'https://httpbin.org/get'
              },
              RESPONSE_TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: 'only_url_response_type_menu'
              }
            }
          },
          
          {
            opcode: 'delete_block',
            blockType: Scratch.BlockType.REPORTER,
            text: 'delete [URL] respond [RESPONSE_TYPE]',
            arguments: {
              URL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'https://httpbin.org/delete'
              },
              RESPONSE_TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: 'only_url_response_type_menu'
              }
            }
          },
          
          {
            opcode: 'post_block',
            blockType: Scratch.BlockType.REPORTER,
            text: 'post [CONTENT_TYPE] [BODY] to [URL] respond [RESPONSE_TYPE]',
            arguments: {
              URL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'https://httpbin.org/post'
              },
              BODY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'apple'
              },
              CONTENT_TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: 'content_type_menu'
              },
              RESPONSE_TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: 'response_type_menu'
              }
            }
          },
          
          {
            opcode: 'put_block',
            blockType: Scratch.BlockType.REPORTER,
            text: 'put [CONTENT_TYPE] [BODY] to [URL] respond [RESPONSE_TYPE]',
            arguments: {
              URL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'https://httpbin.org/put'
              },
              BODY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'apple'
              },
              CONTENT_TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: 'content_type_menu'
              },
              RESPONSE_TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: 'response_type_menu'
              }
            }
          },
          
          {
            opcode: 'patch_block',
            blockType: Scratch.BlockType.REPORTER,
            text: 'patch [CONTENT_TYPE] [BODY] to [URL] respond [RESPONSE_TYPE]',
            arguments: {
              URL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'https://httpbin.org/patch'
              },
              BODY: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'apple'
              },
              CONTENT_TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: 'content_type_menu'
              },
              RESPONSE_TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: 'response_type_menu'
              }
            }
          },
          
          '---',
          
          {
            opcode: 'open_link_block',
            blockType: Scratch.BlockType.COMMAND,
            text: 'open [URL] in new tab',
            arguments: {
              URL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'https://extensions.turbowarp.org'
              }
            }
          },
          
          {
            opcode: 'open_window_block',
            blockType: Scratch.BlockType.COMMAND,
            text: 'open [URL] in new window with width: [WIDTH] height: [HEIGHT] left: [LEFT] top: [TOP]',
            arguments: {
              URL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'https://extensions.turbowarp.org'
              },
              WIDTH: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: ''
              },
              HEIGHT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: ''
              },
              LEFT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: ''
              },
              TOP: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: ''
              }
            }
          },
          
          {
            opcode: 'redirect_link_block',
            blockType: Scratch.BlockType.COMMAND,
            text: 'redirect this tab to [URL]',
            arguments: {
              URL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'https://extensions.turbowarp.org'
              }
            }
          }

        ],
        
        menus: {
          
          content_type_menu: { 
            acceptReporters: true,
            items: [
              {
                text: '(1) text',
                value: '1'
              },
              {
                text: '(2) json',
                value: '2'
              }
            ]
          },
          
          only_url_response_type_menu: {  
            acceptReporters: true,
            items: [
              {
                text: '(1) text',
                value: '1'
              },
              {
                text: '(2) json',
                value: '2'
              },
              {
                text: '(3) status ok?',
                value: '3'
              },
              {
                text: '(4) status',
                value: '4'
              },
              {
                text: '(5) status text',
                value: '5'
              },
              {
                text: '(6) type',
                value: '6'
              },
              {
                text: '(7) redirected?',
                value: '7'
              },
              {
                text: '(8) url',
                value: '8'
              }
            ]
          },
          
          response_type_menu: {  
            acceptReporters: true,
            items: [
              {
                text: '(1) text',
                value: '1'
              },
              {
                text: '(2) json',
                value: '2'
              },
              {
                text: '(3) status ok?',
                value: '3'
              },
              {
                text: '(4) status',
                value: '4'
              },
              {
                text: '(5) status text',
                value: '5'
              },
              {
                text: '(6) type',
                value: '6'
              },
              {
                text: '(7) redirected?',
                value: '7'
              },
              {
                text: '(8) url',
                value: '8'
              },
              {
                text: '(9) body used?',
                value: '9'
              }
            ]
          }
          
        }
      }
    }

    connected_to_internet_block() {
      try {
        return navigator.onLine;
      } catch(err) {
        return '';
      }
    }
    
    browser_block() {
      try {
        if (navigator.userAgent.includes('Firefox')) {
          // 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:108.0) Gecko/20100101 Firefox/108.0'
          return 'Firefox';
        } else if (navigator.userAgent.includes('SamsungBrowser')) {
          // 'Mozilla/5.0 (Linux; Android 9; SAMSUNG SM-G955F Build/PPR1.180610.011) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/9.4 Chrome/67.0.3396.87 Mobile Safari/537.36'
          return 'Samsung Internet';
        } else if (((navigator.userAgent.includes('Opera') || navigator.userAgent.includes('OPR')) && navigator.userAgent.includes('GX')) || navigator.userAgent.includes('OPX')) {
          // 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36 OPR/93.0.0.0 (Edition Yx GX)'
          return 'Opera GX';
        } else if (navigator.userAgent.includes('Opera') || navigator.userAgent.includes('OPR')) {
          // 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36 OPR/94.0.0.0 (Edition Yx 05)'
          return 'Opera';
        } else if (navigator.userAgent.includes('Trident')) {
          // 'Mozilla/5.0 (Windows NT 10.0; WOW64; Trident/7.0; .NET4.0C; .NET4.0E; .NET CLR 2.0.50727; .NET CLR 3.0.30729; .NET CLR 3.5.30729; Zoom 3.6.0; rv:11.0) like Gecko'
          return 'Internet Explorer';
        } else if (navigator.userAgent.includes('Edge')) {
          // 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36 Edge/16.16299'
          return 'Edge Legacy';
        } else if (navigator.userAgent.includes('Edg')) {
          // 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36 Edg/104.0.1293.70'
          return 'Edge Chromium';
        } else if (navigator.userAgent.includes('YaBrowser') || navigator.userAgent.includes('YaSearchBrowser')) {
          // 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 YaBrowser/22.11.5.715 Yowser/2.5 Safari/537.36'
          return 'Yandex';
        } else if (navigator.userAgent.includes('Miui')) {
          // 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/534.24 (KHTML, like Gecko) Chrome/100.0.4896.127 Safari/534.24 XiaoMi/MiuiBrowser/13.19.2-gn'
          return 'Mi Browser';
        } else if (navigator.userAgent.includes('UBrowser')) {
          // 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 UBrowser/6.0.1308.1016 Safari/537.36'
          return 'UC Browser';
        } else if (navigator.userAgent.includes('Chrome')) {
          // 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36'
          return 'Chromium';
        } else if (navigator.userAgent.includes('Safari')) {
          // 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_6_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.6 Mobile/15E148 Safari/604.1'
          return 'Safari';
        } else {
          return '';
        }
      } catch(err) {
        return '';
      }
    }
    
    current_url_block() {
      try {
        return document.URL;
      } catch(err) {
        return '';
      }
    }
    
    network_type_block() {
      try {
        if (navigator.connection.type === undefined || navigator.connection.type === 'none' || navigator.connection.type === 'unknown') {
          return '';
        }
        else {
          return navigator.connection.type;
        }
      } catch(err) {
        return '';
      }
    }
    
    network_generation_block() {
      try {
        if (navigator.connection.effectiveType === undefined) {
          return '';
        }
        else {
          return navigator.connection.effectiveType;
        }
      } catch(err) {
        return '';
      }
    }
    
    downlink_speed_block() {
      try {
        if (navigator.connection.downlink === undefined) {
          return '';
        }
        else {
          return navigator.connection.downlink;
        }
      } catch(err) {
        return '';
      }
    }
    
    downlink_max_speed_block() {
      try {
        if (navigator.connection.downlinkMax === undefined) {
          return '';
        }
        else {
          return navigator.connection.downlinkMax;
        }
      } catch(err) {
        return '';
      }
    }
    
    network_rtt_block() {
      try {
        if (navigator.connection.rtt === undefined) {
          return '';
        }
        else {
          return navigator.connection.rtt;
        }
      } catch(err) {
        return '';
      }
    }
    
    ping_block({SERVER}) {
      return cached_ping_web_socket(String(SERVER));
    }
    
    get_block({URL, RESPONSE_TYPE}) {
      RESPONSE_TYPE = only_url_response_type_check(Number(RESPONSE_TYPE));
      return fetch_url(String(URL), '', '', RESPONSE_TYPE, 'GET');
    }
    
    delete_block({URL, RESPONSE_TYPE}) {
      RESPONSE_TYPE = only_url_response_type_check(Number(RESPONSE_TYPE));
      return fetch_url(String(URL), '', '', RESPONSE_TYPE, 'DELETE');
    }
    
    post_block({URL, BODY, CONTENT_TYPE, RESPONSE_TYPE}) {
      CONTENT_TYPE = content_type_check(Number(CONTENT_TYPE));
      RESPONSE_TYPE = response_type_check(Number(RESPONSE_TYPE));
      BODY = body_check(String(BODY), CONTENT_TYPE);
      return fetch_url(String(URL), BODY, CONTENT_TYPE, RESPONSE_TYPE, 'POST');
    }
    
    put_block({URL, BODY, CONTENT_TYPE, RESPONSE_TYPE}) {
      CONTENT_TYPE = content_type_check(Number(CONTENT_TYPE));
      RESPONSE_TYPE = response_type_check(Number(RESPONSE_TYPE));
      BODY = body_check(String(BODY), CONTENT_TYPE);
      return fetch_url(String(URL), BODY, CONTENT_TYPE, RESPONSE_TYPE, 'PUT');
    }
    
    patch_block({URL, BODY, CONTENT_TYPE, RESPONSE_TYPE}) {
      CONTENT_TYPE = content_type_check(Number(CONTENT_TYPE));
      RESPONSE_TYPE = response_type_check(Number(RESPONSE_TYPE));
      BODY = body_check(String(BODY), CONTENT_TYPE);
      return fetch_url(String(URL), BODY, CONTENT_TYPE, RESPONSE_TYPE, 'PATCH');
    }
    
    open_link_block({URL}) {
      try {
        window.open(URL, '_blank');
      } catch (err) {}
    }
    
    open_window_block({URL,WIDTH,HEIGHT,LEFT,TOP}) {
      try {
        let params = 'popup=1';
        if (window_check(WIDTH) !== '') {params = params + `,width=${width_check(WIDTH)}`}
        if (window_check(HEIGHT) !== '') {params = params + `,height=${height_check(HEIGHT)}`}
        if (window_check(LEFT) !== '') {params = params + `,left=${left_check(LEFT)}`}
        if (window_check(TOP) !== '') {params = params + `,top=${top_check(TOP)}`}
        window.open(URL, '_blank', params);
      } catch (err) {}
    }
    
    redirect_link_block({URL}) {
      try {
        window.open(URL, '_self');
      } catch (err) {}
    }
 
  }

  Scratch.extensions.register(new Network());
  
})(Scratch);
