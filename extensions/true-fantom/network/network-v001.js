(Scratch => {
  'use strict';

  const icon = 'data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwLDAsMjI1LjM1NDgsMjI1LjM1NDgiIGhlaWdodD0iMjI1LjM1NDgiIHdpZHRoPSIyMjUuMzU0OCIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmVyc2lvbj0iMS4xIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTI3LjMyMjc0LC02Ny4zMjI2KSI+PGcgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZT0ibm9uZSIgZmlsbC1ydWxlPSJub256ZXJvIiBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iPjxwYXRoIHN0cm9rZS13aWR0aD0iMCIgZmlsbD0iIzE0NjYwMCIgZD0iTTEyNy4zMjI3NSwxODBjMCwtNjIuMjMwMDEgNTAuNDQ3MzksLTExMi42Nzc0IDExMi42Nzc0LC0xMTIuNjc3NGM2Mi4yMzAwMSwwIDExMi42Nzc0LDUwLjQ0NzM5IDExMi42Nzc0LDExMi42Nzc0YzAsNjIuMjMwMDEgLTUwLjQ0NzM5LDExMi42Nzc0IC0xMTIuNjc3NCwxMTIuNjc3NGMtNjIuMjMwMDEsMCAtMTEyLjY3NzQsLTUwLjQ0NzM5IC0xMTIuNjc3NCwtMTEyLjY3NzR6Ij48L3BhdGg+PGcgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSIjZmZmZmZmIj48cGF0aCBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpbmRleCZxdW90OzpudWxsfSIgZD0iTTI2MS4zNjIzNSwxNDYuNjIzNTlsLTUuMTUwOTcsNS4yNzQ2MmwtMTMuMTg1NTEsLTEyLjIzOTg5bDE5LjIzNjg5LC0xOS40OTU4OWMxMC41OTE0NywtMTAuNTkxNDcgMjcuNzU4NCwtMTAuNTkxNDcgMzguMzQxMTIsMGwxMi43ODAzOCwxMi43ODAzOGMxMC41OTE0NywxMC41ODI3MSAxMC41OTE0NywyNy43NDk2NSAwLDM4LjM0MTEybC0zOC4zNDExMiwzOC4zNDExMmMtMTAuNTkxNDcsMTAuNTg2OTUgLTI3Ljc0OTY1LDEwLjU4Njk1IC0zOC4zNDExMiwwbC0xMi43ODAzNywtMTIuNzgwMzdsLTEyLjY3Mzc4LC0xMy4yMjYxMmwxMi4yNjMwNCwtMTIuNDMzbDI1Ljk3MTQ5LDI1LjY1OTEyYzMuNTIxNzQsMy41MjE3NCA5LjI1ODY0LDMuNTIxNzQgMTIuNzgwMzgsMGwzOC4zNDExMiwtMzguMzQxMTJjMy41MzA0OSwtMy41MzA0OSAzLjUzMDQ5LC05LjI1ODY0IDAsLTEyLjc4MDM4bC0xMi43ODAzNywtMTIuNzgwMzdjLTMuNTIxNzQsLTMuNTIxNzMgLTkuMjQ5ODgsLTMuNTMwNDkgLTEyLjc4MDM4LDBsLTEzLjY4MDc5LDEzLjY4MDc5eiI+PC9wYXRoPjxwYXRoIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2luZGV4JnF1b3Q7Om51bGx9IiBkPSJNMjE4LjYzNzczLDIxMy4zNzY0bDUuMTUwOTcsLTUuMjc0NjJsMTMuMTg1NTEsMTIuMjM5ODlsLTE5LjIzNjg5LDE5LjQ5NTg5Yy0xMC41OTE0NywxMC41OTE0NyAtMjcuNzU4NCwxMC41OTE0NyAtMzguMzQxMTIsMGwtMTIuNzgwMzgsLTEyLjc4MDM4Yy0xMC41OTE0NywtMTAuNTgyNzEgLTEwLjU5MTQ3LC0yNy43NDk2NSAwLC0zOC4zNDExMWwzOC4zNDExMiwtMzguMzQxMTJjMTAuNTkxNDcsLTEwLjU4Njk1IDI3Ljc0OTY1LC0xMC41ODY5NSAzOC4zNDExMiwwbDEyLjc4MDM3LDEyLjc4MDM3bDEyLjY3Mzc4LDEzLjIyNjEybC0xMi4yNjMwNSwxMi40MzNsLTI1Ljk3MTQ4LC0yNS42NTkxMmMtMy41MjE3NCwtMy41MjE3NCAtOS4yNTg2NCwtMy41MjE3NCAtMTIuNzgwMzgsMGwtMzguMzQxMTIsMzguMzQxMTJjLTMuNTMwNDksMy41MzA0OSAtMy41MzA0OSw5LjI1ODY0IDAsMTIuNzgwMzhsMTIuNzgwMzcsMTIuNzgwMzdjMy41MjE3NCwzLjUyMTczIDkuMjQ5ODgsMy41MzA0OSAxMi43ODAzOCwwbDEzLjY4MDc5LC0xMy42ODA3OXoiPjwvcGF0aD48L2c+PC9nPjwvZz48L3N2Zz48IS0tcm90YXRpb25DZW50ZXI6MTEyLjY3NzI1NToxMTIuNjc3NDA1LS0+';

  const computing = new Map();
  const computed = new Map();

  const ping_web_socket = async (SERVER) => {
    let ws = new WebSocket(SERVER);
    let timeout_id;
    const isUp = await new Promise(resolve => {
      ws.onopen = () => setTimeout(() => resolve(true), 2000);
      ws.onclose = () => resolve(false);
      ws.onerror = () => resolve(false);
      timeout_id = setTimeout(() => resolve(false), 5000);
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
      return computing_entry.then(entry => entry.value);
    }
    const computed_entry = computed.get(SERVER);
    if (computed_entry && Date.now() < computed_entry.expires) {
      return computed_entry.value;
    }
    const promise = ping_web_socket(SERVER);
    computing.set(SERVER, promise);
    return promise.then(entry => {
      computing.delete(SERVER);
      computed.set(SERVER, entry);
      return entry.value;
    });
  };
  
  const fetch_url = ({URL, BODY, CONTENT_TYPE, RESPONSE_TYPE}, METHOD) => {
    RESPONSE_TYPE = Number(RESPONSE_TYPE); CONTENT_TYPE = Number(CONTENT_TYPE);
    return fetch(URL, {
      method: METHOD,
      headers: METHOD === 'GET' || METHOD === 'DELETE' ? {} : {'Content-Type': CONTENT_TYPE == 1 ? CONTENT_TYPE:2},
      redirect: 'follow',
      body: CONTENT_TYPE === 2 ? JSON.stringify(BODY) : String(BODY)})
    .then(response => {
      switch (RESPONSE_TYPE) {
        case 1:
          return response.text();
        case 2:
          return response.json();
        case 3:
          return response.ok;
        case 4:
          return response.status;
        case 5:
          return response.statusText;
        case 6:
          return response.type;
        case 7:
          return response.redirected;
        case 8:
          return response.url;
        case 9: default:
          return response.bodyUsed;
      }
    })
    .catch(() => '');
  };
  
  class Network {
    
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
            text: 'connected to internet?'
          },
          '---',
          {
            opcode: 'browser_block',
            blockType: Scratch.BlockType.REPORTER,
            text: 'browser'
          },
          '---',
          {
            opcode: 'current_url_block',
            blockType: Scratch.BlockType.REPORTER,
            text: 'current url'
          },
          '---',
          {
            opcode: 'network_type_block',
            blockType: Scratch.BlockType.REPORTER,
            text: 'network type'
          },
          {
            opcode: 'network_generation_block',
            blockType: Scratch.BlockType.REPORTER,
            text: 'network generation'
          },
          '---',
          {
            opcode: 'downlink_speed_block',
            blockType: Scratch.BlockType.REPORTER,
            text: 'downlink speed in mb/s'
          },
          {
            opcode: 'downlink_max_speed_block',
            blockType: Scratch.BlockType.REPORTER,
            text: 'downlink max speed in mb/s'
          },
          {
            opcode: 'network_rtt_block',
            blockType: Scratch.BlockType.REPORTER,
            text: 'network rtt in ms'
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
                menu: 'only_url_response_type'
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
                menu: 'only_url_response_type'
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
                menu: 'content_type'
              },
              RESPONSE_TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: 'response_type'
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
                menu: 'content_type'
              },
              RESPONSE_TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: 'response_type'
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
                menu: 'content_type'
              },
              RESPONSE_TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: 'response_type'
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
                menu: 'default'
              },
              HEIGHT: {
                type: Scratch.ArgumentType.NUMBER,
                menu: 'default'
              },
              LEFT: {
                type: Scratch.ArgumentType.NUMBER,
                menu: 'default'
              },
              TOP: {
                type: Scratch.ArgumentType.NUMBER,
                menu: 'default'
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
          content_type: { 
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
          only_url_response_type: {  
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
          response_type: {  
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
          },
          default: { 
            acceptReporters: true,
            items: [
              {
                text: 'default',
                value: 'default'
              }
            ]
          }
        }
      }
    }
    
    connected_to_internet_block() {
      return navigator.onLine;
    }
    browser_block() {
      let has = input => navigator.userAgent.includes(input);
      if (has('Firefox')) return 'Firefox';
      if (has('SamsungBrowser')) return 'Samsung Internet';
      if ((has('Opera') || has('OPR')) && has('GX')) return 'Opera GX';
      if (has('Opera') || has('OPR')) return 'Opera';
      if (has('Trident')) return 'Internet Explorer';
      if (has('Edge')) return 'Edge Legacy';
      if (has('Edg')) return 'Edge Chromium';
      if (has('YaBrowser') || has('YaSearchBrowser')) return 'Yandex';
      if (has('Miui')) return 'Mi Browser';
      if (has('UBrowser')) return 'UC Browser';
      if (has('Chrome')) return 'Chromium';
      if (has('Safari')) return 'Safari';
      return '';
    }
    current_url_block() {
      return document.URL || '';
    }
    network_type_block() {
      let type = navigator.connection.type;
      return type === undefined || type === 'none' || type === 'unknown' ? '' : type;
    }
    network_generation_block() {
      return navigator.connection.effectiveType || '';
    }
    downlink_speed_block() {
      return navigator.connection.downlink || '';
    }
    downlink_max_speed_block() {
      return navigator.connection.downlinkMax || '';
    }
    network_rtt_block() {
      return navigator.connection.rtt || '';
    }
    ping_block({SERVER}) {
      return cached_ping_web_socket(String(SERVER));
    }
    get_block(args) {
      return fetch_url(args, 'GET');
    }
    delete_block(args) {
      return fetch_url(args, 'DELETE');
    }
    post_block(args) {
      return fetch_url(args, 'POST');
    }
    put_block(args) {
      return fetch_url(args, 'PUT');
    }
    patch_block(args) {
      return fetch_url(args, 'PATCH');
    }
    open_link_block({URL}) {
      window.open(URL, '_blank');
    }
    open_window_block({URL,WIDTH,HEIGHT,LEFT,TOP}) {
      let params = 'popup=1';
      params += isNaN(WIDTH) ? '' : `,width=${Number(WIDTH) < 100 ? 100 : Number(WIDTH) > window.screen.width ? window.screen.width : Number(WIDTH)}`;
      params += isNaN(HEIGHT) ? '' : `,height=${Number(HEIGHT) < 100 ? 100 : Number(HEIGHT) > window.screen.height ? window.screen.height : Number(HEIGHT)}`;
      params += isNaN(LEFT) ? '' : `,left=${Number(LEFT) < 0 ? 0 : Number(LEFT) > window.screen.width ? window.screen.width : Number(LEFT)}`;
      params += isNaN(TOP) ? '' : `,top=${Number(TOP) < 0 ? 0 : Number(TOP) > window.screen.height ? window.screen.height : Number(TOP)}`;
      window.open(URL, '_blank', params);
    }
    redirect_link_block({URL}) {
      window.open(URL, '_self');
    }
  }
  
  Scratch.extensions.register(new Network());
})(Scratch);
