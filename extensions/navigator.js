(function(Scratch) {
  'use strict';

  class NavigatorInfo {
    getInfo () {
      return {
        id: 'navigatorinfo',
        name: 'Navigator Info',
        blocks: [
          {
            opcode: 'getOS',
            blockType: Scratch.BlockType.REPORTER,
            text: 'operating system'
          },
          {
            opcode: 'getBrowser',
            blockType: Scratch.BlockType.REPORTER,
            text: 'browser'
          },
          {
            opcode: 'getMemory',
            blockType: Scratch.BlockType.REPORTER,
            text: 'device memory in GB'
          }
        ]
      };
    }

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

    getBrowser () {
      const userAgent = navigator.userAgent;
      if (userAgent.includes('Chrome')) {
        return 'Chrome';
      } else if (userAgent.includes('Firefox')) {
        return 'Firefox';
      } else if (userAgent.includes('Safari')) {
        return 'Safari';
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
  }

  Scratch.extensions.register(new NavigatorInfo());
}(Scratch));
