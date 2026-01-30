// Name: Advanced Input
// ID: markskecherinput
// Description: 高级输入检测扩展，支持鼠标滚轮、鼠标按键、键盘组合键和输入事件检测。
// By: MarkSkecher
// License: MIT

(function (Scratch) {
  "use strict";

  const icon = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PGcgZmlsbD0iIzRDOTdGRiI+PHJlY3QgeD0iOCIgeT0iNCIgd2lkdGg9IjgiIGhlaWdodD0iMTIiIHJ4PSIyIiBzdHJva2U9IiMzMzczQ0MiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIvPjxyZWN0IHg9IjEwIiB5PSI2IiB3aWR0aD0iNCIgaGVpZ2h0PSIyIiByeD0iMSIgZmlsbD0iIzMzNzNDQyIvPjxjaXJjbGUgY3g9IjEyIiBjeT0iMTAiIHI9IjEiIGZpbGw9IiMzMzczQ0MiLz48Y2lyY2xlIGN4PSIxMiIgY3k9IjEyIiByPSIxIiBmaWxsPSIjMzM3M0NDIi8+PGNpcmNsZSBjeD0iMTIiIGN5PSIxNCIgcj0iMSIgZmlsbD0iIzMzNzNDQyIvPjwvZz48L3N2Zz4=";

  class AdvancedInput {
    constructor() {
      this.wheelDelta = 0;
      this.wheelDirection = '';
      this.mouseButtons = { left: false, middle: false, right: false };
      this.keysPressed = new Set();
      this.lastKeyPressed = '';
      this.keyPressCount = 0;
      this.mouseX = 0;
      this.mouseY = 0;
      this.clickCount = 0;
      this.doubleClickDetected = false;
      this.lastMessage = '';
      
      document.addEventListener('wheel', (e) => {
        this.wheelDelta = e.deltaY;
        this.wheelDirection = e.deltaY > 0 ? 'down' : 'up';
        setTimeout(() => { 
          this.wheelDelta = 0; 
          this.wheelDirection = '';
        }, 100);
      });
      
      document.addEventListener('mousedown', (e) => {
        if (e.button === 0) this.mouseButtons.left = true;
        if (e.button === 1) this.mouseButtons.middle = true;
        if (e.button === 2) this.mouseButtons.right = true;
        this.clickCount++;
      });
      
      document.addEventListener('mouseup', (e) => {
        if (e.button === 0) this.mouseButtons.left = false;
        if (e.button === 1) this.mouseButtons.middle = false;
        if (e.button === 2) this.mouseButtons.right = false;
      });
      
      document.addEventListener('dblclick', () => {
        this.doubleClickDetected = true;
        setTimeout(() => { this.doubleClickDetected = false; }, 100);
      });
      
      document.addEventListener('mousemove', (e) => {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
      });
      
      document.addEventListener('keydown', (e) => {
        this.keysPressed.add(e.key.toLowerCase());
        this.lastKeyPressed = e.key;
        this.keyPressCount++;
      });
      
      document.addEventListener('keyup', (e) => {
        this.keysPressed.delete(e.key.toLowerCase());
      });
      
      document.addEventListener('message', (e) => {
        if (e.source === window && e.data.type === 'SCRATCH_EXTENSION_MESSAGE') {
          this.lastMessage = e.data.message;
        }
      });
    }
    
    getInfo() {
      return {
        id: 'markskecherinput',
        name: '高级输入检测',
        blockIconURI: icon,
        color1: '#4C97FF',
        color2: '#3373CC',
        blocks: [
          {
            opcode: 'mouseWheelTurned',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '鼠标滚轮 [DIRECTION] 转？',
            arguments: {
              DIRECTION: {
                type: Scratch.ArgumentType.STRING,
                menu: 'wheelDirection',
                defaultValue: '向上'
              }
            }
          },
          {
            opcode: 'getWheelDelta',
            blockType: Scratch.BlockType.REPORTER,
            text: '鼠标滚轮滚动量'
          },
          {
            opcode: 'mouseButtonPressed',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '按下鼠标 [BUTTON] 键？',
            arguments: {
              BUTTON: {
                type: Scratch.ArgumentType.STRING,
                menu: 'mouseButton',
                defaultValue: '左'
              }
            }
          },
          {
            opcode: 'doubleClicked',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '双击鼠标？'
          },
          {
            opcode: 'getClickCount',
            blockType: Scratch.BlockType.REPORTER,
            text: '鼠标点击次数'
          },
          {
            opcode: 'resetClickCount',
            blockType: Scratch.BlockType.COMMAND,
            text: '重置点击次数'
          },
          {
            opcode: 'getMouseX',
            blockType: Scratch.BlockType.REPORTER,
            text: '鼠标X坐标'
          },
          {
            opcode: 'getMouseY',
            blockType: Scratch.BlockType.REPORTER,
            text: '鼠标Y坐标'
          },
          {
            opcode: 'keyPressed',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '按下 [KEY] 键？',
            arguments: {
              KEY: {
                type: Scratch.ArgumentType.STRING,
                menu: 'keyNames',
                defaultValue: '空格键'
              }
            }
          },
          {
            opcode: 'keyComboPressed',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '按下组合键 [KEY1] + [KEY2]？',
            arguments: {
              KEY1: {
                type: Scratch.ArgumentType.STRING,
                menu: 'modifierKeys',
                defaultValue: 'Ctrl'
              },
              KEY2: {
                type: Scratch.ArgumentType.STRING,
                menu: 'keyNames',
                defaultValue: 'C'
              }
            }
          },
          {
            opcode: 'anyKeyPressed',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '按下任意键？'
          },
          {
            opcode: 'keyCount',
            blockType: Scratch.BlockType.REPORTER,
            text: '当前按下的键数量'
          },
          {
            opcode: 'getLastKey',
            blockType: Scratch.BlockType.REPORTER,
            text: '最后按下的键'
          },
          {
            opcode: 'getKeyPressCount',
            blockType: Scratch.BlockType.REPORTER,
            text: '按键总次数'
          },
          {
            opcode: 'resetKeyPressCount',
            blockType: Scratch.BlockType.COMMAND,
            text: '重置按键次数'
          },
          {
            opcode: 'isModifierPressed',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '按下修饰键 [MODIFIER]？',
            arguments: {
              MODIFIER: {
                type: Scratch.ArgumentType.STRING,
                menu: 'modifierKeys',
                defaultValue: 'Shift'
              }
            }
          },
          {
            opcode: 'isArrowKeyPressed',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '按下方向键？'
          },
          {
            opcode: 'isNumberKeyPressed',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '按下数字键？'
          },
          {
            opcode: 'isLetterKeyPressed',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '按下字母键？'
          },
          {
            opcode: 'receivedMessage',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '收到消息 [MESSAGE]？',
            arguments: {
              MESSAGE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '消息1'
              }
            }
          },
          {
            opcode: 'getLastMessage',
            blockType: Scratch.BlockType.REPORTER,
            text: '最后收到的消息'
          },
          {
            opcode: 'clearLastMessage',
            blockType: Scratch.BlockType.COMMAND,
            text: '清除最后消息'
          }
        ],
        menus: {
          wheelDirection: {
            acceptReporters: true,
            items: ['向上', '向下']
          },
          mouseButton: {
            acceptReporters: true,
            items: ['左', '中', '右']
          },
          keyNames: {
            acceptReporters: true,
            items: [
              '空格键', '回车键', '退格键', '删除键', '制表键', '逃逸键',
              '上箭头', '下箭头', '左箭头', '右箭头',
              'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
              'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
              '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
              'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'
            ]
          },
          modifierKeys: {
            acceptReporters: true,
            items: ['Shift', 'Ctrl', 'Alt', 'Meta']
          }
        }
      };
    }
    
    mouseWheelTurned(args) {
      return this.wheelDirection === (args.DIRECTION === '向上' ? 'up' : 'down');
    }
    
    getWheelDelta() {
      return this.wheelDelta;
    }
    
    mouseButtonPressed(args) {
      const buttonMap = { '左': 'left', '中': 'middle', '右': 'right' };
      return this.mouseButtons[buttonMap[args.BUTTON]] || false;
    }
    
    doubleClicked() {
      return this.doubleClickDetected;
    }
    
    getClickCount() {
      return this.clickCount;
    }
    
    resetClickCount() {
      this.clickCount = 0;
    }
    
    getMouseX() {
      return this.mouseX;
    }
    
    getMouseY() {
      return this.mouseY;
    }
    
    keyPressed(args) {
      const keyMap = {
        '空格键': ' ',
        '回车键': 'enter',
        '退格键': 'backspace',
        '删除键': 'delete',
        '制表键': 'tab',
        '逃逸键': 'escape',
        '上箭头': 'arrowup',
        '下箭头': 'arrowdown',
        '左箭头': 'arrowleft',
        '右箭头': 'arrowright'
      };
      
      const key = keyMap[args.KEY] || args.KEY.toLowerCase();
      return this.keysPressed.has(key);
    }
    
    keyComboPressed(args) {
      const modifierMap = {
        'Shift': 'shift',
        'Ctrl': 'control',
        'Alt': 'alt',
        'Meta': 'meta'
      };
      
      const modifier = modifierMap[args.KEY1];
      const key = args.KEY2.toLowerCase();
      
      return this.keysPressed.has(modifier) && this.keysPressed.has(key);
    }
    
    anyKeyPressed() {
      return this.keysPressed.size > 0;
    }
    
    keyCount() {
      return this.keysPressed.size;
    }
    
    getLastKey() {
      return this.lastKeyPressed;
    }
    
    getKeyPressCount() {
      return this.keyPressCount;
    }
    
    resetKeyPressCount() {
      this.keyPressCount = 0;
    }
    
    isModifierPressed(args) {
      const modifierMap = {
        'Shift': 'shift',
        'Ctrl': 'control',
        'Alt': 'alt',
        'Meta': 'meta'
      };
      
      return this.keysPressed.has(modifierMap[args.MODIFIER]);
    }
    
    isArrowKeyPressed() {
      return this.keysPressed.has('arrowup') || 
             this.keysPressed.has('arrowdown') || 
             this.keysPressed.has('arrowleft') || 
             this.keysPressed.has('arrowright');
    }
    
    isNumberKeyPressed() {
      for (let i = 0; i <= 9; i++) {
        if (this.keysPressed.has(i.toString())) return true;
      }
      return false;
    }
    
    isLetterKeyPressed() {
      for (let i = 97; i <= 122; i++) {
        if (this.keysPressed.has(String.fromCharCode(i))) return true;
      }
      return false;
    }
    
    receivedMessage(args) {
      return this.lastMessage === args.MESSAGE;
    }
    
    getLastMessage() {
      return this.lastMessage;
    }
    
    clearLastMessage() {
      this.lastMessage = '';
    }
  }

  Scratch.extensions.register(new AdvancedInput());
})(Scratch);