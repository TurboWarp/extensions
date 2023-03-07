(function (Scratch) {
    'use strict';

    Scratch.extensions.register({
        getInfo: () => ({
            id: 'testcjk',
            name: '这是一个测试',
            blocks: [
                {
                    opcode: 'test1',
                    text: '這是一個測試',
                    blockType: Scratch.BlockType.COMMAND
                },
                {
                    opcode: 'test2',
                    text: 'これはテストです',
                    blockType: Scratch.BlockType.COMMAND
                },
                {
                    opcode: 'test3',
                    text: '이것은 테스트입니다',
                    blockType: Scratch.BlockType.COMMAND
                }
            ]
        })
    });
})(Scratch);
