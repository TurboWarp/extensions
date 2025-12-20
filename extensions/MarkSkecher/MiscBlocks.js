class MiscBlocks {
    constructor() {
        this.lastMessage = '';
        this.wheelDelta = 0;
        this.mouseButtons = { left: false, middle: false, right: false };
        this.keysPressed = new Set();
        this.startTime = Date.now();
        this.randomSeed = Math.random();
        this.counter = 0;
        this.storedValue = null;
        this.arrayData = [];
        this.timer = 0;
        this.mathMemory = 0;
        this.stringMemory = '';
        this.clipboardData = '';
        
        document.addEventListener('wheel', (e) => this.wheelDelta = e.deltaY);
        document.addEventListener('mousedown', (e) => {
            if (e.button === 0) this.mouseButtons.left = true;
            if (e.button === 1) this.mouseButtons.middle = true;
            if (e.button === 2) this.mouseButtons.right = true;
        });
        document.addEventListener('mouseup', (e) => {
            if (e.button === 0) this.mouseButtons.left = false;
            if (e.button === 1) this.mouseButtons.middle = false;
            if (e.button === 2) this.mouseButtons.right = false;
        });
        document.addEventListener('message', (e) => {
            if (e.source === window && e.data.type === 'SCRATCH_EXTENSION_MESSAGE') {
                this.lastMessage = e.data.message;
            }
        });
        document.addEventListener('keydown', (e) => this.keysPressed.add(e.key.toLowerCase()));
        document.addEventListener('keyup', (e) => this.keysPressed.delete(e.key.toLowerCase()));
        setInterval(() => this.timer++, 1000);
    }
    
    getInfo() {
        return {
            id: 'miscblocks',
            name: '杂类积木',
            blockIconURI: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZD0iTTExLjI5MyAxLjQwNEMxMS42NzEgMS4xOTYgMTIuMzI5IDEuMTk2IDEyLjcwNyAxLjQwNEwxOC45NyA1LjY3MkMyMC4wOTggNi40MzYgMjAuMDk4IDcuOTYgMTguOTcgOC43MjVMMTUuNjcgMTEuMjIyQzE1LjY3IDEyLjk5NyAxNS42NyAxNC43NzIgMTUuNjcgMTYuNTQ3TDE4Ljk3IDE5LjAyQzIwLjA5OCAxOS43ODUgMjAuMDk4IDIxLjMwMSAxOC45NyAyMS45NjdsLTYuNzEzIDQuMjY4QzEyLjMyOSAyNC44MDQgMTEuNjcxIDI0LjgwNCAxMS4yOTMgMjQuNTk2TDQuNTIzIDIwLjMzQzMuNDAxIDE5LjU2NiAzLjQwMSAxOC4wNDIgNC41MjMgMTcuMjc3TDcuODIzIDE0Ljc1MkM3LjgzOCAxMy4xMDggNy44MzggMTEuNDY0IDcuODI0IDkuODE5TDQuNTAyIDcuMzM1QzMuMzczIDYuNTcgMy4zNzMgNS4wNDYgNC41MDIgNC4yODFMMTEuMjkzIDEuNDA0WiIgZmlsbD0iIzRDOTdGRiIvPjwvc3ZnPg==',
            color1: '#4C97FF',
            blocks: [
                {
                    opcode: 'receivedMessage',
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: '收到消息 [MESSAGE]？',
                    arguments: {
                        MESSAGE: { type: Scratch.ArgumentType.STRING, defaultValue: '消息1' }
                    }
                },
                {
                    opcode: 'mouseWheelTurned',
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: '鼠标滚轮 [DIRECTION] 转？',
                    arguments: {
                        DIRECTION: { type: Scratch.ArgumentType.STRING, menu: 'wheelDirection', defaultValue: '向前' }
                    }
                },
                {
                    opcode: 'mouseButtonPressed',
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: '按下鼠标 [BUTTON] 键？',
                    arguments: {
                        BUTTON: { type: Scratch.ArgumentType.STRING, menu: 'mouseButton', defaultValue: '左' }
                    }
                },
                { opcode: 'piConstant', blockType: Scratch.BlockType.REPORTER, text: 'π' },
                { opcode: 'clickGreenFlag', blockType: Scratch.BlockType.COMMAND, text: '点击绿旗' },
                {
                    opcode: 'keyPressed',
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: '按下 [KEY] 键？',
                    arguments: {
                        KEY: { type: Scratch.ArgumentType.STRING, menu: 'keyNames', defaultValue: '空格键' }
                    }
                },
                {
                    opcode: 'randomNumber',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '随机数从 [MIN] 到 [MAX]',
                    arguments: {
                        MIN: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
                        MAX: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 }
                    }
                },
                { opcode: 'currentTime', blockType: Scratch.BlockType.REPORTER, text: '当前时间（秒）' },
                {
                    opcode: 'stringLength',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[TEXT] 的长度',
                    arguments: { TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'Hello' } }
                },
                {
                    opcode: 'joinStrings',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '连接 [TEXT1] 和 [TEXT2]',
                    arguments: {
                        TEXT1: { type: Scratch.ArgumentType.STRING, defaultValue: 'Hello' },
                        TEXT2: { type: Scratch.ArgumentType.STRING, defaultValue: 'World' }
                    }
                },
                {
                    opcode: 'uppercase',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[TEXT] 转为大写',
                    arguments: { TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'hello' } }
                },
                {
                    opcode: 'lowercase',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[TEXT] 转为小写',
                    arguments: { TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'HELLO' } }
                },
                {
                    opcode: 'containsString',
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: '[TEXT] 包含 [SUBSTRING]？',
                    arguments: {
                        TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'Hello World' },
                        SUBSTRING: { type: Scratch.ArgumentType.STRING, defaultValue: 'World' }
                    }
                },
                {
                    opcode: 'setRandomSeed',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '设置随机种子为 [SEED]',
                    arguments: { SEED: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 } }
                },
                {
                    opcode: 'waitSeconds',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '等待 [SECONDS] 秒',
                    arguments: { SECONDS: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 } }
                },
                {
                    opcode: 'isEven',
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: '[NUMBER] 是偶数？',
                    arguments: { NUMBER: { type: Scratch.ArgumentType.NUMBER, defaultValue: 2 } }
                },
                {
                    opcode: 'isOdd',
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: '[NUMBER] 是奇数？',
                    arguments: { NUMBER: { type: Scratch.ArgumentType.NUMBER, defaultValue: 3 } }
                },
                { opcode: 'incrementCounter', blockType: Scratch.BlockType.COMMAND, text: '计数器加1' },
                { opcode: 'resetCounter', blockType: Scratch.BlockType.COMMAND, text: '重置计数器' },
                { opcode: 'getCounter', blockType: Scratch.BlockType.REPORTER, text: '获取计数器值' },
                {
                    opcode: 'storeValue',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '存储值 [VALUE]',
                    arguments: { 
                        VALUE: { 
                            type: Scratch.ArgumentType.STRING, 
                            defaultValue: '0'
                        } 
                    }
                },
                { opcode: 'retrieveValue', blockType: Scratch.BlockType.REPORTER, text: '获取存储的值' },
                {
                    opcode: 'roundNumber',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '四舍五入 [NUMBER]',
                    arguments: { NUMBER: { type: Scratch.ArgumentType.NUMBER, defaultValue: 3.14 } }
                },
                {
                    opcode: 'clampNumber',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '将 [NUMBER] 限制在 [MIN] 到 [MAX] 之间',
                    arguments: {
                        NUMBER: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 },
                        MIN: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                        MAX: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 }
                    }
                },
                {
                    opcode: 'startsWith',
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: '[TEXT] 以 [PREFIX] 开头？',
                    arguments: {
                        TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'Hello' },
                        PREFIX: { type: Scratch.ArgumentType.STRING, defaultValue: 'He' }
                    }
                },
                {
                    opcode: 'endsWith',
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: '[TEXT] 以 [SUFFIX] 结尾？',
                    arguments: {
                        TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'Hello' },
                        SUFFIX: { type: Scratch.ArgumentType.STRING, defaultValue: 'lo' }
                    }
                },
                {
                    opcode: 'substring',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[TEXT] 从位置 [START] 到 [END] 的子串',
                    arguments: {
                        TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'Hello' },
                        START: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                        END: { type: Scratch.ArgumentType.NUMBER, defaultValue: 2 }
                    }
                },
                {
                    opcode: 'replaceString',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '将 [TEXT] 中的 [OLD] 替换为 [NEW]',
                    arguments: {
                        TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'Hello' },
                        OLD: { type: Scratch.ArgumentType.STRING, defaultValue: 'H' },
                        NEW: { type: Scratch.ArgumentType.STRING, defaultValue: 'J' }
                    }
                },
                {
                    opcode: 'absValue',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[NUMBER] 的绝对值',
                    arguments: { NUMBER: { type: Scratch.ArgumentType.NUMBER, defaultValue: -5 } }
                },
                {
                    opcode: 'power',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[BASE] 的 [EXPONENT] 次方',
                    arguments: {
                        BASE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 2 },
                        EXPONENT: { type: Scratch.ArgumentType.NUMBER, defaultValue: 3 }
                    }
                },
                {
                    opcode: 'sqrt',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[NUMBER] 的平方根',
                    arguments: { NUMBER: { type: Scratch.ArgumentType.NUMBER, defaultValue: 16 } }
                },
                {
                    opcode: 'randomBoolean',
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: '随机布尔值'
                },
                {
                    opcode: 'equals',
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: '[A] 等于 [B]？',
                    arguments: {
                        A: { 
                            type: Scratch.ArgumentType.STRING, 
                            defaultValue: '5'
                        },
                        B: { 
                            type: Scratch.ArgumentType.STRING, 
                            defaultValue: '5'
                        }
                    }
                },
                {
                    opcode: 'arrayPush',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '向数组添加 [ITEM]',
                    arguments: { ITEM: { type: Scratch.ArgumentType.STRING, defaultValue: '元素' } }
                },
                {
                    opcode: 'arrayGet',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '数组第 [INDEX] 个元素',
                    arguments: { INDEX: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 } }
                },
                { opcode: 'arrayLength', blockType: Scratch.BlockType.REPORTER, text: '数组长度' },
                {
                    opcode: 'arrayClear',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '清空数组'
                },
                {
                    opcode: 'modulo',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[DIVIDEND] 除以 [DIVISOR] 的余数',
                    arguments: {
                        DIVIDEND: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
                        DIVISOR: { type: Scratch.ArgumentType.NUMBER, defaultValue: 3 }
                    }
                },
                {
                    opcode: 'isPositive',
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: '[NUMBER] 是正数？',
                    arguments: { NUMBER: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 } }
                },
                {
                    opcode: 'isNegative',
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: '[NUMBER] 是负数？',
                    arguments: { NUMBER: { type: Scratch.ArgumentType.NUMBER, defaultValue: -5 } }
                },
                {
                    opcode: 'getYear',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '当前年份'
                },
                {
                    opcode: 'stringReverse',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '反转 [TEXT]',
                    arguments: { TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'Hello' } }
                },
                {
                    opcode: 'logarithm',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[NUMBER] 的自然对数',
                    arguments: { NUMBER: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 } }
                },
                { opcode: 'getTimer', blockType: Scratch.BlockType.REPORTER, text: '获取计时器（秒）' },
                { opcode: 'resetTimer', blockType: Scratch.BlockType.COMMAND, text: '重置计时器' },
                {
                    opcode: 'greaterThan',
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: '[A] 大于 [B]？',
                    arguments: {
                        A: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 },
                        B: { type: Scratch.ArgumentType.NUMBER, defaultValue: 3 }
                    }
                },
                {
                    opcode: 'lessThan',
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: '[A] 小于 [B]？',
                    arguments: {
                        A: { type: Scratch.ArgumentType.NUMBER, defaultValue: 3 },
                        B: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 }
                    }
                },
                {
                    opcode: 'arrayRemove',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '移除数组第 [INDEX] 个元素',
                    arguments: { INDEX: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 } }
                },
                {
                    opcode: 'arrayInsert',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '在数组第 [INDEX] 位置插入 [ITEM]',
                    arguments: {
                        INDEX: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
                        ITEM: { type: Scratch.ArgumentType.STRING, defaultValue: '新元素' }
                    }
                },
                {
                    opcode: 'stringRepeat',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '重复 [TEXT] [TIMES] 次',
                    arguments: {
                        TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'Hi' },
                        TIMES: { type: Scratch.ArgumentType.NUMBER, defaultValue: 3 }
                    }
                },
                {
                    opcode: 'numberToString',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '将 [NUMBER] 转为字符串',
                    arguments: { NUMBER: { type: Scratch.ArgumentType.NUMBER, defaultValue: 123 } }
                },
                {
                    opcode: 'stringToNumber',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '将 [TEXT] 转为数字',
                    arguments: { TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: '123' } }
                },
                {
                    opcode: 'sin',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[角度] 的正弦值',
                    arguments: { 角度: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 } }
                },
                {
                    opcode: 'cos',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[角度] 的余弦值',
                    arguments: { 角度: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 } }
                },
                {
                    opcode: 'tan',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[角度] 的正切值',
                    arguments: { 角度: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 } }
                },
                {
                    opcode: 'floor',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[NUMBER] 向下取整',
                    arguments: { NUMBER: { type: Scratch.ArgumentType.NUMBER, defaultValue: 3.7 } }
                },
                {
                    opcode: 'ceil',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[NUMBER] 向上取整',
                    arguments: { NUMBER: { type: Scratch.ArgumentType.NUMBER, defaultValue: 3.2 } }
                },
                {
                    opcode: 'maxNumber',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[A] 和 [B] 中的最大值',
                    arguments: {
                        A: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 },
                        B: { type: Scratch.ArgumentType.NUMBER, defaultValue: 8 }
                    }
                },
                {
                    opcode: 'minNumber',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[A] 和 [B] 中的最小值',
                    arguments: {
                        A: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 },
                        B: { type: Scratch.ArgumentType.NUMBER, defaultValue: 8 }
                    }
                },
                {
                    opcode: 'copyToClipboard',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '复制 [TEXT] 到剪贴板',
                    arguments: { TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: '复制的内容' } }
                },
                { opcode: 'pasteFromClipboard', blockType: Scratch.BlockType.REPORTER, text: '从剪贴板粘贴' },
                {
                    opcode: 'arrayJoin',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '用 [SEPARATOR] 连接数组元素',
                    arguments: { SEPARATOR: { type: Scratch.ArgumentType.STRING, defaultValue: ',' } }
                },
                {
                    opcode: 'arraySort',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '排序数组 [ORDER]',
                    arguments: { ORDER: { type: Scratch.ArgumentType.STRING, menu: 'sortOrder', defaultValue: '升序' } }
                },
                {
                    opcode: 'mathMemoryAdd',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '数学记忆加 [VALUE]',
                    arguments: { VALUE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 } }
                },
                { opcode: 'mathMemoryClear', blockType: Scratch.BlockType.COMMAND, text: '清空数学记忆' },
                { opcode: 'getMathMemory', blockType: Scratch.BlockType.REPORTER, text: '获取数学记忆值' },
                {
                    opcode: 'cbrt',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[NUMBER] 的立方根',
                    arguments: { NUMBER: { type: Scratch.ArgumentType.NUMBER, defaultValue: 8 } }
                },
                {
                    opcode: 'log10',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[NUMBER] 的常用对数',
                    arguments: { NUMBER: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 } }
                },
                {
                    opcode: 'exp',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'e 的 [POWER] 次方',
                    arguments: { POWER: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 } }
                },
                {
                    opcode: 'hypot',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[X] 和 [Y] 的平方和的平方根',
                    arguments: {
                        X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 3 },
                        Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 4 }
                    }
                },
                {
                    opcode: 'sign',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[NUMBER] 的符号',
                    arguments: { NUMBER: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 } }
                },
                {
                    opcode: 'toRadians',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[角度] 转换为弧度',
                    arguments: { 角度: { type: Scratch.ArgumentType.NUMBER, defaultValue: 180 } }
                },
                {
                    opcode: 'toDegrees',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[弧度] 转换为角度',
                    arguments: { 弧度: { type: Scratch.ArgumentType.NUMBER, defaultValue: 3.14159 } }
                },
                {
                    opcode: 'sinh',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[数值] 的双曲正弦',
                    arguments: { 数值: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 } }
                },
                {
                    opcode: 'cosh',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[数值] 的双曲余弦',
                    arguments: { 数值: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 } }
                },
                {
                    opcode: 'tanh',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[数值] 的双曲正切',
                    arguments: { 数值: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 } }
                },
                {
                    opcode: 'factorial',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[NUMBER] 的阶乘',
                    arguments: { NUMBER: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 } }
                },
                {
                    opcode: 'gcd',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[A] 和 [B] 的最大公约数',
                    arguments: {
                        A: { type: Scratch.ArgumentType.NUMBER, defaultValue: 12 },
                        B: { type: Scratch.ArgumentType.NUMBER, defaultValue: 18 }
                    }
                },
                {
                    opcode: 'lcm',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[A] 和 [B] 的最小公倍数',
                    arguments: {
                        A: { type: Scratch.ArgumentType.NUMBER, defaultValue: 4 },
                        B: { type: Scratch.ArgumentType.NUMBER, defaultValue: 6 }
                    }
                },
                {
                    opcode: 'remainder',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[DIVIDEND] 除以 [DIVISOR] 的余数',
                    arguments: {
                        DIVIDEND: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
                        DIVISOR: { type: Scratch.ArgumentType.NUMBER, defaultValue: 3 }
                    }
                },
                {
                    opcode: 'trunc',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[NUMBER] 截断小数部分',
                    arguments: { NUMBER: { type: Scratch.ArgumentType.NUMBER, defaultValue: 3.9 } }
                },
                {
                    opcode: 'degreesToRadians',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[角度] 转弧度',
                    arguments: { 角度: { type: Scratch.ArgumentType.NUMBER, defaultValue: 90 } }
                },
                {
                    opcode: 'radiansToDegrees',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[弧度] 转角度',
                    arguments: { 弧度: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1.5708 } }
                },
                {
                    opcode: 'exponent',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[BASE] 的指数',
                    arguments: { BASE: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1000 } }
                },
                {
                    opcode: 'mantissa',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[NUMBER] 的尾数',
                    arguments: { NUMBER: { type: Scratch.ArgumentType.NUMBER, defaultValue: 123.45 } }
                },
                {
                    opcode: 'clz32',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[NUMBER] 的32位前导零',
                    arguments: { NUMBER: { type: Scratch.ArgumentType.NUMBER, defaultValue: 8 } }
                },
                {
                    opcode: 'trimWhitespace',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '去除[TEXT]首尾空格',
                    arguments: { TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: '  Hello  ' } }
                },
                {
                    opcode: 'countSubstring',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[TEXT]中[SUB]出现的次数',
                    arguments: {
                        TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'ababa' },
                        SUB: { type: Scratch.ArgumentType.STRING, defaultValue: 'aba' }
                    }
                },
                {
                    opcode: 'firstCharacter',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[TEXT]的第一个字符',
                    arguments: { TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'Hello' } }
                },
                {
                    opcode: 'lastCharacter',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[TEXT]的最后一个字符',
                    arguments: { TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'Hello' } }
                },
                {
                    opcode: 'charAtPosition',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[TEXT]第[POS]个字符',
                    arguments: {
                        TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'Hello' },
                        POS: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 }
                    }
                },
                {
                    opcode: 'indexOfSubstring',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[TEXT]中[SUB]首次出现位置',
                    arguments: {
                        TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'Hello World' },
                        SUB: { type: Scratch.ArgumentType.STRING, defaultValue: 'World' }
                    }
                },
                {
                    opcode: 'isLeapYear',
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: '[YEAR]是闰年？',
                    arguments: { YEAR: { type: Scratch.ArgumentType.NUMBER, defaultValue: 2024 } }
                },
                {
                    opcode: 'getMonthDays',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[YEAR]年[MONTH]月的天数',
                    arguments: {
                        YEAR: { type: Scratch.ArgumentType.NUMBER, defaultValue: 2024 },
                        MONTH: { type: Scratch.ArgumentType.NUMBER, defaultValue: 2 }
                    }
                },
                {
                    opcode: 'rgbToHex',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'RGB([R],[G],[B])转十六进制',
                    arguments: {
                        R: { type: Scratch.ArgumentType.NUMBER, defaultValue: 255 },
                        G: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                        B: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
                    }
                },
                {
                    opcode: 'hexToRgb',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '十六进制[HEX]转RGB',
                    arguments: { HEX: { type: Scratch.ArgumentType.STRING, defaultValue: '#FF0000' } }
                },
                {
                    opcode: 'randomChoice',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '从[TEXT1][TEXT2][TEXT3]中随机选择',
                    arguments: {
                        TEXT1: { type: Scratch.ArgumentType.STRING, defaultValue: '选项1' },
                        TEXT2: { type: Scratch.ArgumentType.STRING, defaultValue: '选项2' },
                        TEXT3: { type: Scratch.ArgumentType.STRING, defaultValue: '选项3' }
                    }
                },
                {
                    opcode: 'shuffleArray',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '打乱数组顺序'
                },
                {
                    opcode: 'arrayUnique',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '数组去重'
                },
                {
                    opcode: 'reverseArray',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '反转数组'
                },
                {
                    opcode: 'arraySum',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '数组元素求和'
                },
                {
                    opcode: 'arrayAverage',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '数组元素平均值'
                },
                {
                    opcode: 'arrayMax',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '数组元素最大值'
                },
                {
                    opcode: 'arrayMin',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '数组元素最小值'
                },
                {
                    opcode: 'capitalizeWords',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[TEXT]每个单词首字母大写',
                    arguments: { TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'hello world' } }
                },
                {
                    opcode: 'isPalindrome',
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: '[TEXT]是回文？',
                    arguments: { TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'madam' } }
                },
                {
                    opcode: 'generatePassword',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '生成[LENGTH]位随机密码',
                    arguments: { LENGTH: { type: Scratch.ArgumentType.NUMBER, defaultValue: 8 } }
                },
                {
                    opcode: 'getDistance',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '两点([X1],[Y1])到([X2],[Y2])距离',
                    arguments: {
                        X1: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                        Y1: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                        X2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 3 },
                        Y2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 4 }
                    }
                },
                {
                    opcode: 'getAngle',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '两点([X1],[Y1])到([X2],[Y2])角度',
                    arguments: {
                        X1: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                        Y1: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
                        X2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
                        Y2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 }
                    }
                },
                {
                    opcode: 'indexOfSubstring',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[TEXT]中[SUB]首次出现位置',
                    arguments: {
                        TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'Hello World' },
                        SUB: { type: Scratch.ArgumentType.STRING, defaultValue: 'World' }
                    }
                },
                {
                    opcode: 'lastIndexOfSubstring',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[TEXT]中[SUB]最后出现位置',
                    arguments: {
                        TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'Hello' },
                        SUB: { type: Scratch.ArgumentType.STRING, defaultValue: 'l' }
                    }
                },
                {
                    opcode: 'lastIndexOfSubstring',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[TEXT]中[SUB]最后出现位置',
                    arguments: {
                        TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'Hello' },
                        SUB: { type: Scratch.ArgumentType.STRING, defaultValue: 'l' }
                    }
                },
                {
                    opcode: 'padStart',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[TEXT]前补[PAD]至长度[LEN]',
                    arguments: {
                        TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: '5' },
                        PAD: { type: Scratch.ArgumentType.STRING, defaultValue: '0' },
                        LEN: { type: Scratch.ArgumentType.NUMBER, defaultValue: 2 }
                    }
                },
                {
                    opcode: 'padEnd',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[TEXT]后补[PAD]至长度[LEN]',
                    arguments: {
                        TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: '5' },
                        PAD: { type: Scratch.ArgumentType.STRING, defaultValue: '0' },
                        LEN: { type: Scratch.ArgumentType.NUMBER, defaultValue: 2 }
                    }
                },
                {
                    opcode: 'splitString',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '用[SEP]分割[TEXT]到数组',
                    arguments: {
                        TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'a,b,c' },
                        SEP: { type: Scratch.ArgumentType.STRING, defaultValue: ',' }
                    }
                },
                {
                    opcode: 'replaceAllString',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '将[TEXT]中所有[OLD]替换为[NEW]',
                    arguments: {
                        TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'aaa' },
                        OLD: { type: Scratch.ArgumentType.STRING, defaultValue: 'a' },
                        NEW: { type: Scratch.ArgumentType.STRING, defaultValue: 'b' }
                    }
                },
                {
                    opcode: 'startsWithIgnoreCase',
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: '[TEXT]忽略大小写以[PREFIX]开头？',
                    arguments: {
                        TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'Hello' },
                        PREFIX: { type: Scratch.ArgumentType.STRING, defaultValue: 'he' }
                    }
                },
                {
                    opcode: 'endsWithIgnoreCase',
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: '[TEXT]忽略大小写以[SUFFIX]结尾？',
                    arguments: {
                        TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'Hello' },
                        SUFFIX: { type: Scratch.ArgumentType.STRING, defaultValue: 'LO' }
                    }
                },
                {
                    opcode: 'equalsIgnoreCase',
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: '[A]与[B]忽略大小写相等？',
                    arguments: {
                        A: { type: Scratch.ArgumentType.STRING, defaultValue: 'Hello' },
                        B: { type: Scratch.ArgumentType.STRING, defaultValue: 'HELLO' }
                    }
                },
                {
                    opcode: 'trimStart',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '去除[TEXT]开头空格',
                    arguments: { TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: '  Hello' } }
                },
                {
                    opcode: 'trimEnd',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '去除[TEXT]结尾空格',
                    arguments: { TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'Hello  ' } }
                },
                {
                    opcode: 'sliceString',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[TEXT]从位置[START]截取[LENGTH]长度',
                    arguments: {
                        TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'Hello' },
                        START: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
                        LENGTH: { type: Scratch.ArgumentType.NUMBER, defaultValue: 3 }
                    }
                },
                {
                    opcode: 'isNumeric',
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: '[TEXT]是数字？',
                    arguments: { TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: '123' } }
                },
                {
                    opcode: 'isAlpha',
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: '[TEXT]只含字母？',
                    arguments: { TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'abc' } }
                },
                {
                    opcode: 'isAlphanumeric',
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: '[TEXT]只含字母和数字？',
                    arguments: { TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'abc123' } }
                },
                {
                    opcode: 'stringCompare',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[A]与[B]比较（-1前小后大 0相等 1前大后小）',
                    arguments: {
                        A: { type: Scratch.ArgumentType.STRING, defaultValue: 'apple' },
                        B: { type: Scratch.ArgumentType.STRING, defaultValue: 'banana' }
                    }
                },
                {
                    opcode: 'getMonth',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '当前月份'
                },
                {
                    opcode: 'getDay',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '当前日期'
                },
                {
                    opcode: 'getHours',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '当前小时'
                },
                {
                    opcode: 'getMinutes',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '当前分钟'
                },
                {
                    opcode: 'getSeconds',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '当前秒数'
                },
                {
                    opcode: 'getMilliseconds',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '当前毫秒'
                },
                {
                    opcode: 'getDayOfWeek',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '当前星期几'
                },
                {
                    opcode: 'isLeapYear',
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: '[YEAR] 是闰年？',
                    arguments: { YEAR: { type: Scratch.ArgumentType.NUMBER, defaultValue: 2024 } }
                },
                {
                    opcode: 'daysInMonth',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[MONTH] 月有几天',
                    arguments: { MONTH: { type: Scratch.ArgumentType.NUMBER, defaultValue: 2 } }
                },
                {
                    opcode: 'getTimestamp',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '当前时间戳'
                },
                {
                    opcode: 'shuffleString',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '打乱[TEXT]字符顺序',
                    arguments: { TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'Hello' } }
                },
                {
                    opcode: 'reverseNumber',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '反转[NUMBER]数字顺序',
                    arguments: { NUMBER: { type: Scratch.ArgumentType.NUMBER, defaultValue: 12345 } }
                },
                {
                    opcode: 'isPalindrome',
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: '[TEXT]是回文？',
                    arguments: { TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'level' } }
                },
                {
                    opcode: 'capitalizeWords',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[TEXT]单词首字母大写',
                    arguments: { TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'hello world' } }
                },
                {
                    opcode: 'removeDuplicates',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '去除[TEXT]中重复字符',
                    arguments: { TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'aabbcc' } }
                },
                {
                    opcode: 'countVowels',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[TEXT]中元音字母数量',
                    arguments: { TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'Hello' } }
                },
                {
                    opcode: 'countConsonants',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[TEXT]中辅音字母数量',
                    arguments: { TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'Hello' } }
                },
                {
                    opcode: 'isPrime',
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: '[NUMBER]是质数？',
                    arguments: { NUMBER: { type: Scratch.ArgumentType.NUMBER, defaultValue: 7 } }
                },
                {
                    opcode: 'fibonacci',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '斐波那契数列第[N]项',
                    arguments: { N: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 } }
                },
                {
                    opcode: 'sumDigits',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[NUMBER]各位数字之和',
                    arguments: { NUMBER: { type: Scratch.ArgumentType.NUMBER, defaultValue: 123 } }
                },
                {
                    opcode: 'productDigits',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[NUMBER]各位数字之积',
                    arguments: { NUMBER: { type: Scratch.ArgumentType.NUMBER, defaultValue: 123 } }
                },
                {
                    opcode: 'reverseArray',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '反转数组'
                },
                {
                    opcode: 'arraySum',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '数组元素之和'
                },
                {
                    opcode: 'arrayAverage',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '数组平均值'
                },
                {
                    opcode: 'arrayMax',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '数组最大值'
                },
                {
                    opcode: 'arrayMin',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '数组最小值'
                },
                {
                    opcode: 'stringMemorySet',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '设置字符串记忆为[TEXT]',
                    arguments: { TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'Hello' } }
                },
                {
                    opcode: 'stringMemoryGet',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '获取字符串记忆'
                },
                {
                    opcode: 'stringMemoryAppend',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '字符串记忆追加[TEXT]',
                    arguments: { TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: ' World' } }
                },
                {
                    opcode: 'stringMemoryClear',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '清空字符串记忆'
                },
                {
                    opcode: 'getRandomHex',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '随机十六进制颜色'
                },
                {
                    opcode: 'base64Encode',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'Base64编码[TEXT]',
                    arguments: { TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'Hello' } }
                },
                {
                    opcode: 'base64Decode',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'Base64解码[TEXT]',
                    arguments: { TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'SGVsbG8=' } }
                },
                {
                    opcode: 'uuidGenerate',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '生成UUID'
                },
                {
                    opcode: 'stringToBinary',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '字符串[TEXT]转二进制',
                    arguments: { TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'A' } }
                },
                {
                    opcode: 'binaryToString',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '二进制[TEXT]转字符串',
                    arguments: { TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: '01000001' } }
                },
                {
                    opcode: 'caesarCipher',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '凯撒加密[TEXT]偏移[SHIFT]',
                    arguments: {
                        TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'Hello' },
                        SHIFT: { type: Scratch.ArgumentType.NUMBER, defaultValue: 3 }
                    }
                },
                {
                    opcode: 'morseEncode',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '摩斯编码[TEXT]',
                    arguments: { TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'SOS' } }
                },
                {
                    opcode: 'morseDecode',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '摩斯解码[TEXT]',
                    arguments: { TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: '... --- ...' } }
                },
                {
                    opcode: 'urlEncode',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'URL编码[TEXT]',
                    arguments: { TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: '你好世界' } }
                },
                {
                    opcode: 'urlDecode',
                    blockType: Scratch.BlockType.REPORTER,
                    text: 'URL解码[TEXT]',
                    arguments: { TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: '%E4%BD%A0%E5%A5%BD%E4%B8%96%E7%95%8C' } }
                },
                {
                    opcode: 'reverseWords',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '反转[TEXT]单词顺序',
                    arguments: { TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'Hello World Test' } }
                },
                {
                    opcode: 'countWords',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[TEXT]单词数量',
                    arguments: { TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'Hello World' } }
                },
                {
                    opcode: 'getHashCode',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[TEXT]哈希值',
                    arguments: { TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'Hello' } }
                },
                {
                    opcode: 'levenshteinDistance',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[TEXT1]与[TEXT2]编辑距离',
                    arguments: {
                        TEXT1: { type: Scratch.ArgumentType.STRING, defaultValue: 'kitten' },
                        TEXT2: { type: Scratch.ArgumentType.STRING, defaultValue: 'sitting' }
                    }
                },
                {
                    opcode: 'soundex',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[TEXT]Soundex编码',
                    arguments: { TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'Smith' } }
                },
                {
                    opcode: 'metaphone',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[TEXT]Metaphone编码',
                    arguments: { TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'Smith' } }
                },
                {
                    opcode: 'toCamelCase',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[TEXT]转驼峰命名',
                    arguments: { TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'hello_world_test' } }
                },
                {
                    opcode: 'toSnakeCase',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '[TEXT]转蛇形命名',
                    arguments: { TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'HelloWorldTest' } }
                },
                {
                    opcode: 'getScreenWidth',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '屏幕宽度'
                },
                {
                    opcode: 'getScreenHeight',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '屏幕高度'
                },
                {
                    opcode: 'getBrowserName',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '浏览器名称'
                },
                {
                    opcode: 'getPlatform',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '操作系统平台'
                },
                {
                    opcode: 'getLanguage',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '浏览器语言'
                },
                {
                    opcode: 'getCookieValue',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '获取Cookie[NAME]的值',
                    arguments: { NAME: { type: Scratch.ArgumentType.STRING, defaultValue: 'username' } }
                },
                {
                    opcode: 'setCookie',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '设置Cookie[NAME]值为[VALUE]',
                    arguments: {
                        NAME: { type: Scratch.ArgumentType.STRING, defaultValue: 'username' },
                        VALUE: { type: Scratch.ArgumentType.STRING, defaultValue: 'user123' }
                    }
                },
                {
                    opcode: 'deleteCookie',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '删除Cookie[NAME]',
                    arguments: { NAME: { type: Scratch.ArgumentType.STRING, defaultValue: 'username' } }
                },
                {
                    opcode: 'getLocalStorage',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '获取本地存储[KEY]',
                    arguments: { KEY: { type: Scratch.ArgumentType.STRING, defaultValue: 'data' } }
                },
                {
                    opcode: 'setLocalStorage',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '设置本地存储[KEY]为[VALUE]',
                    arguments: {
                        KEY: { type: Scratch.ArgumentType.STRING, defaultValue: 'data' },
                        VALUE: { type: Scratch.ArgumentType.STRING, defaultValue: 'value123' }
                    }
                },
                {
                    opcode: 'removeLocalStorage',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '移除本地存储[KEY]',
                    arguments: { KEY: { type: Scratch.ArgumentType.STRING, defaultValue: 'data' } }
                },
                {
                    opcode: 'clearLocalStorage',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '清空本地存储'
                },
                {
                    opcode: 'getSessionStorage',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '获取会话存储[KEY]',
                    arguments: { KEY: { type: Scratch.ArgumentType.STRING, defaultValue: 'temp' } }
                },
                {
                    opcode: 'setSessionStorage',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '设置会话存储[KEY]为[VALUE]',
                    arguments: {
                        KEY: { type: Scratch.ArgumentType.STRING, defaultValue: 'temp' },
                        VALUE: { type: Scratch.ArgumentType.STRING, defaultValue: 'temp123' }
                    }
                },
                {
                    opcode: 'getElementById',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '获取ID为[ID]的元素文本',
                    arguments: { ID: { type: Scratch.ArgumentType.STRING, defaultValue: 'title' } }
                },
                {
                    opcode: 'setElementText',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '设置ID为[ID]的元素文本为[TEXT]',
                    arguments: {
                        ID: { type: Scratch.ArgumentType.STRING, defaultValue: 'title' },
                        TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: '新标题' }
                    }
                },
                {
                    opcode: 'getElementValue',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '获取ID为[ID]的输入框值',
                    arguments: { ID: { type: Scratch.ArgumentType.STRING, defaultValue: 'input1' } }
                },
                {
                    opcode: 'setElementValue',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '设置ID为[ID]的输入框值为[VALUE]',
                    arguments: {
                        ID: { type: Scratch.ArgumentType.STRING, defaultValue: 'input1' },
                        VALUE: { type: Scratch.ArgumentType.STRING, defaultValue: '新值' }
                    }
                },
                {
                    opcode: 'hideElement',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '隐藏ID为[ID]的元素',
                    arguments: { ID: { type: Scratch.ArgumentType.STRING, defaultValue: 'div1' } }
                },
                {
                    opcode: 'showElement',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '显示ID为[ID]的元素',
                    arguments: { ID: { type: Scratch.ArgumentType.STRING, defaultValue: 'div1' } }
                },
                {
                    opcode: 'getElementStyle',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '获取ID为[ID]的元素样式[PROPERTY]',
                    arguments: {
                        ID: { type: Scratch.ArgumentType.STRING, defaultValue: 'div1' },
                        PROPERTY: { type: Scratch.ArgumentType.STRING, defaultValue: 'color' }
                    }
                },
                {
                    opcode: 'setElementStyle',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '设置ID为[ID]的元素样式[PROPERTY]为[VALUE]',
                    arguments: {
                        ID: { type: Scratch.ArgumentType.STRING, defaultValue: 'div1' },
                        PROPERTY: { type: Scratch.ArgumentType.STRING, defaultValue: 'color' },
                        VALUE: { type: Scratch.ArgumentType.STRING, defaultValue: 'red' }
                    }
                },
                {
                    opcode: 'getWindowLocation',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '当前页面URL'
                },
                {
                    opcode: 'reloadPage',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '刷新页面'
                },
                {
                    opcode: 'goBack',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '返回上一页'
                },
                {
                    opcode: 'goForward',
                    blockType: Scratch.BlockType.COMMAND,
                    text: '前进一页'
                },
                {
                    opcode: 'getOnlineStatus',
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: '网络在线？'
                },
                {
                    opcode: 'getBatteryLevel',
                    blockType: Scratch.BlockType.REPORTER,
                    text: '电池电量百分比'
                },
                {
                    opcode: 'isBatteryCharging',
                    blockType: Scratch.BlockType.BOOLEAN,
                    text: '电池正在充电？'
                }
            ],
            menus: {
                wheelDirection: { items: ['向前', '向后'] },
                mouseButton: { items: ['左', '中', '右'] },
                keyNames: {
                    items: ['空格键', '回车键', '退格键', '删除键', '上箭头', '下箭头', '左箭头', '右箭头',
                        ...'abcdefghijklmnopqrstuvwxyz'.split(''),
                        ...'0123456789'.split(''), 'shift', 'ctrl', 'alt', 'tab']
                },
                sortOrder: { items: ['升序', '降序'] }
            }
        };
    }
    
    receivedMessage(args) { return this.lastMessage === args.MESSAGE; }
    mouseWheelTurned(args) { return args.DIRECTION === '向前' ? this.wheelDelta < 0 : this.wheelDelta > 0; }
    mouseButtonPressed(args) { 
        const map = { '左': 'left', '中': 'middle', '右': 'right' };
        return this.mouseButtons[map[args.BUTTON]];
    }
    piConstant() { return 3.1415926535897932387626433; }
    clickGreenFlag() { document.querySelector('.green-flag')?.dispatchEvent(new Event('click')); }
    keyPressed(args) {
        const keyMap = { '空格键':' ', '回车键':'enter', '退格键':'backspace', '删除键':'delete',
            '上箭头':'arrowup', '下箭头':'arrowdown', '左箭头':'arrowleft', '右箭头':'arrowright',
            'shift':'shift', 'ctrl':'control', 'alt':'alt', 'tab':'tab' };
        return this.keysPressed.has(keyMap[args.KEY] || args.KEY.toLowerCase());
    }
    randomNumber(args) { 
        const min = Math.min(args.MIN, args.MAX);
        const max = Math.max(args.MIN, args.MAX);
        return Math.random() * (max - min) + min;
    }
    currentTime() { return (Date.now() - this.startTime) / 1000; }
    stringLength(args) { return args.TEXT.length; }
    joinStrings(args) { return args.TEXT1 + args.TEXT2; }
    uppercase(args) { return args.TEXT.toUpperCase(); }
    lowercase(args) { return args.TEXT.toLowerCase(); }
    containsString(args) { return args.TEXT.includes(args.SUBSTRING); }
    setRandomSeed(args) {
        const seed = args.SEED;
        this.randomSeed = seed;
        this._lcg = function() {
            seed = (seed * 9301 + 49297) % 233280;
            return seed / 233280;
        };
    }
    waitSeconds(args) {
        const start = Date.now();
        while (Date.now() - start < args.SECONDS * 1000) {
        }
    }
    isEven(args) { return Math.abs(args.NUMBER) % 2 === 0; }
    isOdd(args) { return Math.abs(args.NUMBER) % 2 === 1; }
    incrementCounter() { this.counter++; }
    resetCounter() { this.counter = 0; }
    getCounter() { return this.counter; }
    storeValue(args) { 
        const value = args.VALUE;
        this.storedValue = isNaN(value) ? value : Number(value);
    }
    retrieveValue() { return this.storedValue; }
    roundNumber(args) { return Math.round(args.NUMBER); }
    clampNumber(args) { return Math.max(args.MIN, Math.min(args.NUMBER, args.MAX)); }
    startsWith(args) { return args.TEXT.startsWith(args.PREFIX); }
    endsWith(args) { return args.TEXT.endsWith(args.SUFFIX); }
    substring(args) { return args.TEXT.substring(args.START, args.END); }
    replaceString(args) { return args.TEXT.replace(args.OLD, args.NEW); }
    absValue(args) { return Math.abs(args.NUMBER); }
    power(args) { return Math.pow(args.BASE, args.EXPONENT); }
    sqrt(args) { return Math.sqrt(args.NUMBER); }
    randomBoolean() { return Math.random() > 0.5; }
    equals(args) { 
        const a = isNaN(args.A) ? args.A : Number(args.A);
        const b = isNaN(args.B) ? args.B : Number(args.B);
        return a == b;
    }
    arrayPush(args) { this.arrayData.push(args.ITEM); }
    arrayGet(args) { return this.arrayData[args.INDEX - 1] || ''; }
    arrayLength() { return this.arrayData.length; }
    arrayClear() { this.arrayData = []; }
    modulo(args) { return args.DIVIDEND % args.DIVISOR; }
    isPositive(args) { return args.NUMBER > 0; }
    isNegative(args) { return args.NUMBER < 0; }
    getYear() { return new Date().getFullYear(); }
    stringReverse(args) { return args.TEXT.split('').reverse().join(''); }
    logarithm(args) { return Math.log(args.NUMBER); }
    getTimer() { return this.timer; }
    resetTimer() { this.timer = 0; }
    greaterThan(args) { return args.A > args.B; }
    lessThan(args) { return args.A < args.B; }
    arrayRemove(args) { 
        const index = args.INDEX - 1;
        if (index >= 0 && index < this.arrayData.length) {
            this.arrayData.splice(index, 1);
        }
    }
    arrayInsert(args) {
        const index = args.INDEX - 1;
        const pos = Math.max(0, Math.min(index, this.arrayData.length));
        this.arrayData.splice(pos, 0, args.ITEM);
    }
    stringRepeat(args) { 
        const times = Math.max(0, Math.floor(args.TIMES));
        return args.TEXT.repeat(times);
    }
    numberToString(args) { return String(args.NUMBER); }
    stringToNumber(args) { return Number(args.TEXT) || 0; }
    sin(args) { return Math.sin(args.角度 * Math.PI / 180); }
    cos(args) { return Math.cos(args.角度 * Math.PI / 180); }
    tan(args) { return Math.tan(args.角度 * Math.PI / 180); }
    floor(args) { return Math.floor(args.NUMBER); }
    ceil(args) { return Math.ceil(args.NUMBER); }
    maxNumber(args) { return Math.max(args.A, args.B); }
    minNumber(args) { return Math.min(args.A, args.B); }
    copyToClipboard(args) { 
        navigator.clipboard.writeText(args.TEXT);
        this.clipboardData = args.TEXT;
    }
    pasteFromClipboard() { 
        navigator.clipboard.readText().then(text => this.clipboardData = text);
        return this.clipboardData;
    }
    arrayJoin(args) { return this.arrayData.join(args.SEPARATOR); }
    arraySort(args) {
        this.arrayData.sort((a, b) => {
            if (isNaN(a) || isNaN(b)) return args.ORDER === '升序' ? a.localeCompare(b) : b.localeCompare(a);
            return args.ORDER === '升序' ? a - b : b - a;
        });
    }
    mathMemoryAdd(args) { this.mathMemory += args.VALUE; }
    mathMemoryClear() { this.mathMemory = 0; }
    getMathMemory() { return this.mathMemory; }
    cbrt(args) { return Math.cbrt(args.NUMBER); }
    log10(args) { return Math.log10(args.NUMBER); }
    exp(args) { return Math.exp(args.POWER); }
    hypot(args) { return Math.hypot(args.X, args.Y); }
    sign(args) { return Math.sign(args.NUMBER); }
    toRadians(args) { return args.角度 * Math.PI / 180; }
    toDegrees(args) { return args.弧度 * 180 / Math.PI; }
    sinh(args) { return Math.sinh(args.数值); }
    cosh(args) { return Math.cosh(args.数值); }
    tanh(args) { return Math.tanh(args.数值); }
    factorial(args) {
        let n = Math.floor(args.NUMBER);
        if (n < 0) return NaN;
        let result = 1;
        for (let i = 2; i <= n; i++) result *= i;
        return result;
    }
    gcd(args) {
        let a = Math.abs(args.A);
        let b = Math.abs(args.B);
        while (b) {
            [a, b] = [b, a % b];
        }
        return a;
    }
    lcm(args) {
        return (args.A * args.B) / this.gcd(args);
    }
    remainder(args) { return Math.remainder(args.DIVIDEND, args.DIVISOR); }
    trunc(args) { return Math.trunc(args.NUMBER); }
    degreesToRadians(args) { return args.角度 * Math.PI / 180; }
    radiansToDegrees(args) { return args.弧度 * 180 / Math.PI; }
    exponent(args) { return Math.log10(args.BASE); }
    mantissa(args) { return args.NUMBER / (10 **Math.floor(Math.log10(args.NUMBER))); }
    clz32(args) { return Math.clz32(args.NUMBER); }
    trimWhitespace(args) { return args.TEXT.trim(); }
    countSubstring(args) {
        const text = args.TEXT;
        const sub = args.SUB;
        if (sub.length === 0) return 0;
        let count = 0;
        let pos = 0;
        while ((pos = text.indexOf(sub, pos)) !== -1) {
            count++;
            pos += sub.length;
        }
        return count;
    }
    firstCharacter(args) { return args.TEXT[0] || ''; }
    lastCharacter(args) { 
        const text = args.TEXT;
        return text.length > 0 ? text[text.length - 1] : '';
    }
    charAtPosition(args) {
        const pos = Math.max(0, Math.min(args.POS - 1, args.TEXT.length - 1));
        return args.TEXT[pos] || '';
    }
    indexOfSubstring(args) { return args.TEXT.indexOf(args.SUB) + 1; }
    lastIndexOfSubstring(args) { return args.TEXT.lastIndexOf(args.SUB) + 1; }
    padStart(args) { return args.TEXT.padStart(args.LEN, args.PAD); }
    padEnd(args) { return args.TEXT.padEnd(args.LEN, args.PAD); }
    splitString(args) { this.arrayData = args.TEXT.split(args.SEP); }
    replaceAllString(args) { 
        return args.TEXT.replace(new RegExp(args.OLD.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), args.NEW);
    }
    startsWithIgnoreCase(args) { 
        return args.TEXT.toLowerCase().startsWith(args.PREFIX.toLowerCase());
    }
    endsWithIgnoreCase(args) { 
        return args.TEXT.toLowerCase().endsWith(args.SUFFIX.toLowerCase());
    }
    equalsIgnoreCase(args) {
        return args.A.toLowerCase() === args.B.toLowerCase();
    }
    trimStart(args) {
        return args.TEXT.trimStart();
    }
    trimEnd(args) {
        return args.TEXT.trimEnd();
    }
    startsWithIgnoreCase(args) { 
        return args.TEXT.toLowerCase().startsWith(args.PREFIX.toLowerCase());
    }
    endsWithIgnoreCase(args) { 
        return args.TEXT.toLowerCase().endsWith(args.SUFFIX.toLowerCase());
    }
    isLeapYear(args) {
        const year = args.YEAR;
        return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
    }
    getMonthDays(args) {
        const year = args.YEAR;
        const month = args.MONTH;
        return new Date(year, month, 0).getDate();
    }
    rgbToHex(args) {
        const r = Math.max(0, Math.min(255, args.R));
        const g = Math.max(0, Math.min(255, args.G));
        const b = Math.max(0, Math.min(255, args.B));
        return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
    }
    hexToRgb(args) {
        const hex = args.HEX.replace('#', '');
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        return `${r},${g},${b}`;
    }
    randomChoice(args) {
        const choices = [args.TEXT1, args.TEXT2, args.TEXT3].filter(text => text !== '');
        return choices[Math.floor(Math.random() * choices.length)];
    }
    shuffleArray() {
        for (let i = this.arrayData.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.arrayData[i], this.arrayData[j]] = [this.arrayData[j], this.arrayData[i]];
        }
    }
    arrayUnique() {
        this.arrayData = [...new Set(this.arrayData)];
    }
    reverseArray() {
        this.arrayData.reverse();
    }
    arraySum() {
        return this.arrayData.reduce((sum, item) => sum + Number(item), 0);
    }
    arrayAverage() {
        if (this.arrayData.length === 0) return 0;
        const sum = this.arrayData.reduce((sum, item) => sum + Number(item), 0);
        return sum / this.arrayData.length;
    }
    arrayMax() {
        if (this.arrayData.length === 0) return 0;
        return Math.max(...this.arrayData.map(item => Number(item)));
    }
    arrayMin() {
        if (this.arrayData.length === 0) return 0;
        return Math.min(...this.arrayData.map(item => Number(item)));
    }
    capitalizeWords(args) {
        return args.TEXT.replace(/\w\S*/g, (txt) => 
            txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        );
    }
    isPalindrome(args) {
        const text = args.TEXT.toLowerCase().replace(/[^a-z0-9]/g, '');
        return text === text.split('').reverse().join('');
    }
    generatePassword(args) {
        const length = args.LENGTH;
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
        let password = '';
        for (let i = 0; i < length; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return password;
    }
    getDistance(args) {
        const dx = args.X2 - args.X1;
        const dy = args.Y2 - args.Y1;
        return Math.sqrt(dx * dx + dy * dy);
    }
    getAngle(args) {
        const dx = args.X2 - args.X1;
        const dy = args.Y2 - args.Y1;
        return Math.atan2(dy, dx) * 180 / Math.PI;
    }
    equalsIgnoreCase(args) { return args.A.toLowerCase() === args.B.toLowerCase(); }
    trimStart(args) { return args.TEXT.trimStart(); }
    trimEnd(args) { return args.TEXT.trimEnd(); }
    sliceString(args) {
        const start = Math.max(0, args.START - 1);
        return args.TEXT.substr(start, args.LENGTH);
    }
    isNumeric(args) { return !isNaN(args.TEXT) && args.TEXT.trim() !== ''; }
    isAlpha(args) { return /^[A-Za-z]+$/.test(args.TEXT); }
    isAlphanumeric(args) { return /^[A-Za-z0-9]+$/.test(args.TEXT); }
    stringCompare(args) { return args.A.localeCompare(args.B); }
    getMonth() { return new Date().getMonth() + 1; }
    getDay() { return new Date().getDate(); }
    getHours() { return new Date().getHours(); }
    getMinutes() { return new Date().getMinutes(); }
    getSeconds() { return new Date().getSeconds(); }
    getMilliseconds() { return new Date().getMilliseconds(); }
    getDayOfWeek() { return new Date().getDay(); }
    daysInMonth(args) {
        const month = Math.max(1, Math.min(12, Math.floor(args.MONTH)));
        return new Date(new Date().getFullYear(), month, 0).getDate();
    }
    getTimestamp() { return Date.now(); }
    shuffleString(args) { 
        const arr = args.TEXT.split(''); 
        for (let i = arr.length - 1; i > 0; i--) { 
            const j = Math.floor(Math.random() * (i + 1)); 
            [arr[i], arr[j]] = [arr[j], arr[i]]; 
        } 
        return arr.join(''); 
    }
    reverseNumber(args) { 
        return parseInt(args.NUMBER.toString().split('').reverse().join('')) || 0; 
    }
    removeDuplicates(args) { 
        return [...new Set(args.TEXT.split(''))].join(''); 
    }
    countVowels(args) { 
        return (args.TEXT.match(/[aeiouAEIOU]/g) || []).length; 
    }
    countConsonants(args) { 
        return (args.TEXT.match(/[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]/g) || []).length; 
    }
    isPrime(args) { 
        const n = Math.abs(args.NUMBER); 
        if (n <= 1) return false; 
        if (n <= 3) return true; 
        if (n % 2 === 0 || n % 3 === 0) return false; 
        for (let i = 5; i * i <= n; i += 6) { 
            if (n % i === 0 || n % (i + 2) === 0) return false; 
        } 
        return true; 
    }
    fibonacci(args) { 
        const n = Math.floor(args.N); 
        if (n <= 0) return 0; 
        if (n === 1) return 1; 
        let a = 0, b = 1; 
        for (let i = 2; i <= n; i++) { 
            [a, b] = [b, a + b]; 
        } 
        return b; 
    }
    sumDigits(args) { 
        return args.NUMBER.toString().split('').reduce((sum, digit) => 
            sum + (parseInt(digit) || 0), 0
        ); 
    }
    productDigits(args) { 
        return args.NUMBER.toString().split('').reduce((product, digit) => 
            product * (parseInt(digit) || 1), 1
        ); 
    }
    reverseArray() { this.arrayData.reverse(); }
    arraySum() { 
        return this.arrayData.reduce((sum, item) => 
            sum + (Number(item) || 0), 0
        ); 
    }
    arrayAverage() { 
        if (this.arrayData.length === 0) return 0; 
        return this.arraySum() / this.arrayData.length; 
    }
    arrayMax() { 
        if (this.arrayData.length === 0) return 0; 
        return Math.max(...this.arrayData.map(item => Number(item) || 0)); 
    }
    arrayMin() { 
        if (this.arrayData.length === 0) return 0; 
        return Math.min(...this.arrayData.map(item => Number(item) || 0)); 
    }
    stringMemorySet(args) { this.stringMemory = args.TEXT; }
    stringMemoryGet() { return this.stringMemory; }
    stringMemoryAppend(args) { this.stringMemory += args.TEXT; }
    stringMemoryClear() { this.stringMemory = ''; }
    getRandomHex() { return '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0'); }
    base64Encode(args) { return btoa(args.TEXT); }
    base64Decode(args) { 
        try { return atob(args.TEXT); }
        catch { return '解码失败'; }
    }
    uuidGenerate() { 
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    stringToBinary(args) { 
        return args.TEXT.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
    }
    binaryToString(args) { 
        try {
            return args.TEXT.split(' ').map(bin => String.fromCharCode(parseInt(bin, 2))).join('');
        } catch {
            return '转换失败';
        }
    }
    caesarCipher(args) {
        const text = args.TEXT;
        const shift = args.SHIFT % 26;
        return text.replace(/[a-zA-Z]/g, char => {
            const code = char.charCodeAt(0);
            const base = code < 97 ? 65 : 97;
            return String.fromCharCode((code - base + shift + 26) % 26 + base);
        });
    }
    morseEncode(args) {
        const morseCode = {
            'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
            'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
            'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
            'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
            'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
            '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
            '8': '---..', '9': '----.', ' ': '/'
        };
        return args.TEXT.toUpperCase().split('').map(char => morseCode[char] || char).join(' ');
    }
    morseDecode(args) {
        const morseCode = {
            '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E', '..-.': 'F',
            '--.': 'G', '....': 'H', '..': 'I', '.---': 'J', '-.-': 'K', '.-..': 'L',
            '--': 'M', '-.': 'N', '---': 'O', '.--.': 'P', '--.-': 'Q', '.-.': 'R',
            '...': 'S', '-': 'T', '..-': 'U', '...-': 'V', '.--': 'W', '-..-': 'X',
            '-.--': 'Y', '--..': 'Z', '-----': '0', '.----': '1', '..---': '2',
            '...--': '3', '....-': '4', '.....': '5', '-....': '6', '--...': '7',
            '---..': '8', '----.': '9', '/': ' '
        };
        return args.TEXT.split(' ').map(code => morseCode[code] || code).join('');
    }
    urlEncode(args) { return encodeURIComponent(args.TEXT); }
    urlDecode(args) { 
        try { return decodeURIComponent(args.TEXT); }
        catch { return '解码失败'; }
    }
    reverseWords(args) { return args.TEXT.split(/\s+/).reverse().join(' '); }
    countWords(args) { return args.TEXT.trim().split(/\s+/).filter(word => word.length > 0).length; }
    getHashCode(args) {
        let hash = 0;
        for (let i = 0; i < args.TEXT.length; i++) {
            const char = args.TEXT.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash).toString(16);
    }
    levenshteinDistance(args) {
        const s1 = args.TEXT1;
        const s2 = args.TEXT2;
        const matrix = [];
        for (let i = 0; i <= s2.length; i++) {
            matrix[i] = [i];
        }
        for (let j = 0; j <= s1.length; j++) {
            matrix[0][j] = j;
        }
        for (let i = 1; i <= s2.length; i++) {
            for (let j = 1; j <= s1.length; j++) {
                if (s2.charAt(i - 1) === s1.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }
            }
        }
        return matrix[s2.length][s1.length];
    }
    soundex(args) {
        const text = args.TEXT.toUpperCase();
        if (!text) return '';
        const soundexMap = {
            'BFPV': '1', 'CGJKQSXZ': '2', 'DT': '3', 'L': '4',
            'MN': '5', 'R': '6', 'AEIOUHWY': '.'
        };
        let soundex = text[0];
        let prevCode = '.';
        for (let i = 1; i < text.length && soundex.length < 4; i++) {
            let code = '.';
            for (let key in soundexMap) {
                if (key.includes(text[i])) {
                    code = soundexMap[key];
                    break;
                }
            }
            if (code !== '.' && code !== prevCode) {
                soundex += code;
            }
            prevCode = code;
        }
        return (soundex + '000').slice(0, 4);
    }
    metaphone(args) {
        const text = args.TEXT.toUpperCase();
        if (!text) return '';
        let metaphone = '';
        const length = text.length;
        for (let i = 0; i < length; i++) {
            const current = text[i];
            const next = text[i + 1] || '';
            const prev = text[i - 1] || '';
            switch (current) {
                case 'A':
                case 'E':
                case 'I':
                case 'O':
                case 'U':
                    if (i === 0) metaphone += current;
                    break;
                case 'B':
                    metaphone += 'B';
                    break;
                case 'C':
                    if (next === 'I' || next === 'E' || next === 'Y') {
                        metaphone += 'S';
                    } else {
                        metaphone += 'K';
                    }
                    break;
                case 'D':
                    if (next === 'G' && (text[i + 2] === 'I' || text[i + 2] === 'E' || text[i + 2] === 'Y')) {
                        metaphone += 'J';
                        i++;
                    } else {
                        metaphone += 'T';
                    }
                    break;
                case 'F':
                case 'J':
                case 'L':
                case 'M':
                case 'N':
                case 'R':
                    metaphone += current;
                    break;
                case 'G':
                    if (next === 'H' && !['A', 'E', 'I', 'O', 'U'].includes(prev)) {
                    } else if (next === 'N' && i === length - 2) {
                    } else if (next === 'G') {
                        metaphone += 'K';
                        i++;
                    } else {
                        metaphone += 'K';
                    }
                    break;
                case 'H':
                    if (!['A', 'E', 'I', 'O', 'U'].includes(prev) && ['A', 'E', 'I', 'O', 'U'].includes(next)) {
                        metaphone += 'H';
                    }
                    break;
                case 'K':
                    if (prev !== 'C') metaphone += 'K';
                    break;
                case 'P':
                    if (next === 'H') {
                        metaphone += 'F';
                        i++;
                    } else {
                        metaphone += 'P';
                    }
                    break;
                case 'Q':
                    metaphone += 'K';
                    break;
                case 'S':
                    if (next === 'H') {
                        metaphone += 'X';
                        i++;
                    } else if (next === 'I' && (text[i + 2] === 'O' || text[i + 2] === 'A')) {
                        metaphone += 'X';
                    } else {
                        metaphone += 'S';
                    }
                    break;
                case 'T':
                    if (next === 'I' && (text[i + 2] === 'O' || text[i + 2] === 'A')) {
                        metaphone += 'X';
                    } else if (next === 'H') {
                        metaphone += '0';
                        i++;
                    } else {
                        metaphone += 'T';
                    }
                    break;
                case 'V':
                    metaphone += 'F';
                    break;
                case 'W':
                    if (['A', 'E', 'I', 'O', 'U'].includes(next)) {
                        metaphone += 'W';
                    }
                    break;
                case 'X':
                    metaphone += 'KS';
                    break;
                case 'Y':
                    if (['A', 'E', 'I', 'O', 'U'].includes(next)) {
                        metaphone += 'Y';
                    }
                    break;
                case 'Z':
                    metaphone += 'S';
                    break;
            }
        }
        return metaphone;
    }
    toCamelCase(args) {
        return args.TEXT.replace(/[-_\s]+(.)?/g, (_, char) => char ? char.toUpperCase() : '');
    }
    toSnakeCase(args) {
        return args.TEXT.replace(/([A-Z])/g, '_$1').replace(/[-\s]+/g, '_').toLowerCase().replace(/^_/, '');
    }
    getScreenWidth() { return window.screen.width; }
    getScreenHeight() { return window.screen.height; }
    getBrowserName() { 
        const ua = navigator.userAgent;
        if (ua.includes('Chrome')) return 'Chrome';
        if (ua.includes('Firefox')) return 'Firefox';
        if (ua.includes('Safari')) return 'Safari';
        if (ua.includes('Edge')) return 'Edge';
        return 'Unknown';
    }
    getPlatform() { return navigator.platform; }
    getLanguage() { return navigator.language; }
    getCookieValue(args) {
        const name = args.NAME + '=';
        const decodedCookie = decodeURIComponent(document.cookie);
        const ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return '';
    }
    setCookie(args) {
        document.cookie = args.NAME + '=' + args.VALUE + '; path=/';
    }
    deleteCookie(args) {
        document.cookie = args.NAME + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    }
    getLocalStorage(args) {
        try {
            return localStorage.getItem(args.KEY) || '';
        } catch {
            return '';
        }
    }
    setLocalStorage(args) {
        try {
            localStorage.setItem(args.KEY, args.VALUE);
        } catch {}
    }
    removeLocalStorage(args) {
        try {
            localStorage.removeItem(args.KEY);
        } catch {}
    }
    clearLocalStorage() {
        try {
            localStorage.clear();
        } catch {}
    }
    getSessionStorage(args) {
        try {
            return sessionStorage.getItem(args.KEY) || '';
        } catch {
            return '';
        }
    }
    setSessionStorage(args) {
        try {
            sessionStorage.setItem(args.KEY, args.VALUE);
        } catch {}
    }
    getElementById(args) {
        const element = document.getElementById(args.ID);
        return element ? element.textContent || '' : '';
    }
    setElementText(args) {
        const element = document.getElementById(args.ID);
        if (element) {
            element.textContent = args.TEXT;
        }
    }
    getElementValue(args) {
        const element = document.getElementById(args.ID);
        return element ? element.value || '' : '';
    }
    setElementValue(args) {
        const element = document.getElementById(args.ID);
        if (element) {
            element.value = args.VALUE;
        }
    }
    hideElement(args) {
        const element = document.getElementById(args.ID);
        if (element) {
            element.style.display = 'none';
        }
    }
    showElement(args) {
        const element = document.getElementById(args.ID);
        if (element) {
            element.style.display = '';
        }
    }
    getElementStyle(args) {
        const element = document.getElementById(args.ID);
        return element ? window.getComputedStyle(element).getPropertyValue(args.PROPERTY) || '' : '';
    }
    setElementStyle(args) {
        const element = document.getElementById(args.ID);
        if (element) {
            element.style[args.PROPERTY] = args.VALUE;
        }
    }
    getWindowLocation() { return window.location.href; }
    reloadPage() { window.location.reload(); }
    goBack() { window.history.back(); }
    goForward() { window.history.forward(); }
    getOnlineStatus() { return navigator.onLine; }
    getBatteryLevel() { 
        if ('getBattery' in navigator) {
            navigator.getBattery().then(battery => {
                this.batteryLevel = Math.round(battery.level * 100);
            });
            return this.batteryLevel || 100;
        }
        return 100;
    }
    isBatteryCharging() {
        if ('getBattery' in navigator) {
            navigator.getBattery().then(battery => {
                this.batteryCharging = battery.charging;
            });
            return this.batteryCharging || false;
        }
        return false;
    }
}

Scratch.extensions.register(new MiscBlocks());