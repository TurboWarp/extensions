// Name: Browser Utilities
// ID: nkbrowserutils
// Description: Access and modify webpage information. Works best packaged to HTML.
// By: NamelessCat <https://scratch.mit.edu/users/NexusKitten/>

(function(Scratch) {
  'use strict';

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('Browser Utilities must run unsandboxed');
  }

  class BrowserUtils {
    getInfo() {
      return {
        id: 'nkbrowserutils',
        name: 'Browser Utilities',
        color1: '#504d6f',
        color2: '#36344b',
        blocks: [
          {
            opcode: 'isonline',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'is online?'
          },
          {
            opcode: 'ismobile',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'is mobile?'
          },
          '---',
          {
            opcode: 'getOS',
            blockType: Scratch.BlockType.REPORTER,
            text: 'user operating system'
          },
          {
            opcode: 'getbrowser',
            blockType: Scratch.BlockType.REPORTER,
            text: 'user browser'
          },
          {
            opcode: 'geturl',
            blockType: Scratch.BlockType.REPORTER,
            text: 'current url'
          },
          '---',
          {
            opcode: 'setfavicon',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set page favicon to [ICO]',
            arguments: {
              ICO: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'https://turbowarp.org/favicon.ico'
              }
            }
          },
          {
            opcode: 'settitle',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set page title to [TITLE]',
            arguments: {
              TITLE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'My Page'
              }
            }
          },
          {
            opcode: 'reload',
            blockType: Scratch.BlockType.COMMAND,
            text: 'reload page',
          },
          '---',
          {
            opcode: 'tabactive',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'is tab active?',
          },
          '---',
          {
            opcode: 'darkmode',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'user prefers dark mode?',
          },
          {
            opcode: "getPreferredReducedMotion",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "user prefers reduced motion?",
          },
          {
            opcode: "getPreferredContrast",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "user prefers more contrast?",
          },
          '---',
          {
            opcode: 'getMemory',
            blockType: Scratch.BlockType.REPORTER,
            text: 'device memory in GB'
          },
          '---',
          {
            opcode: 'alertBlock',
            blockType: Scratch.BlockType.COMMAND,
            text: 'alert [STRING]',
            arguments: {
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ''
              }
            }
          },
          {
            opcode: 'inputPromptBlock',
            blockType: Scratch.BlockType.REPORTER,
            text: 'prompt [STRING]',
            disableMonitor: true,
            arguments: {
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ''
              }
            }
          },
          {
            opcode: 'confirmationBlock',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'confirm [STRING]',
            arguments: {
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ''
              }
            }
          }
        ]
      };
    }
    isonline() {
      // TODO: we want to do better, but no good reliable way for us to do that right now
      return navigator.onLine;
    }
    ismobile () {
      const userAgent = navigator.userAgent;
      return userAgent.includes('Android') || userAgent.includes('iPhone') || userAgent.includes('iPod') || userAgent.includes('iPad') || userAgent.includes('BlackBerry') || userAgent.includes('IEMobile') || userAgent.includes('Opera Mini');
    }
    getbrowser () {
      const userAgent = navigator.userAgent;
      if (userAgent.includes('Edg')) {
        return 'Microsoft Edge';
      } else if (userAgent.includes('OPR')) {
        return 'Opera';
      } else if (userAgent.includes('Firefox')) {
        return 'Firefox';
      } else if (userAgent.includes('Windows NT')) {
        return 'Internet Explorer';
      } else if (userAgent.includes('Chrome')) {
        return 'Chrome';
      } else {
        return 'Other';
      }
    }
    geturl () {
      return location.href;
    }

    settitle (args) {
      document.title = args.TITLE;
    }

    async setfavicon (args) {
      // This can cause a network request, so we need to get permission
      if (await Scratch.canFetch(args.ICO)) {
        /** @type {HTMLLinkElement} */
        let link = document.querySelector("link[rel~='icon']");
        if (!link) {
          link = document.createElement('link');
          link.rel = 'icon';
          document.head.appendChild(link);
        }
        link.href = args.ICO;
      }
    }

    reload () {
      location.reload();
    }

    tabactive () {
      return !document.hidden;
    }

    darkmode () {
      return !!window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

    // The following blocks were originally from LMS Utilities, repurposed with permission.
    alertBlock(args) {
      alert(args.STRING);
    }

    inputPromptBlock(args) {
      return prompt(args.STRING);
    }

    confirmationBlock(args) {
      return confirm(args.STRING);
    }

    // The following blocks were originally from Navigator, repurposed as suggested by GarboMuffin.
    getOS () {
      const userAgent = navigator.userAgent;
      if (userAgent.includes('Windows')) {
        return 'Windows';
      } else if (userAgent.includes('Android')) {
        return 'Android';
      } else if (userAgent.includes('iPhone') || userAgent.includes('iPod') || userAgent.includes('iPad')) {
        return 'iOS';
      } else if (userAgent.includes('Linux')) {
        return 'Linux';
      } else if (userAgent.includes('CrOS')) {
        return 'ChromeOS';
      } else if (userAgent.includes('Mac OS')) {
        return 'macOS';
      }
      return 'Other';
    }

    getMemory () {
      // @ts-expect-error
      if (navigator.deviceMemory == undefined) {
        return 'Unsupported';
      } else {
        // @ts-expect-error
        return navigator.deviceMemory;
      }
    }

    getPreferredReducedMotion() {
      return !!window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }

    getPreferredContrast() {
      return !!window.matchMedia("(prefers-contrast: more)").matches;
    }
  }
  Scratch.extensions.register(new BrowserUtils());
})(Scratch);
