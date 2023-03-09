(function(Scratch) {
  'use strict';
  class sortAndUniqueWords {
    getInfo() {
      return {
        id: 'sortAndUniqueWords',
        name: 'Sort And Unique Words',
        color1: '#5a8b9e',
        color2: '#427081',
        color3: '#427081',
        blocks: [
          {
            opcode: 'sortAndUniqueWords_en',
            blockType: Scratch.BlockType.REPORTER,
            disableMonitor: true,
            text: 'Sort And Unique Words（English）[a]',
            arguments: {
              a: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'movie dog restaurant book school television game music clothing fruit'
              },
            }
          },
          {
            opcode: 'sortAndUniqueWords_cn',
            blockType: Scratch.BlockType.REPORTER,
            disableMonitor: true,
            text: 'Sort And Unique Words（Chinese）[a]',
            arguments: {
              a: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '电影 狗 餐厅 书 学校 电视 游戏 音乐 衣服 水果'
              },
            }
          },
        ]
      };
    }
    'sortAndUniqueWords_en'(args){
      return sortAndUniqueWords_en(args.a);
    }
    'sortAndUniqueWords_cn'(args){
      return sortAndUniqueWords_cn(args.a);
    }
  }

  function sortAndUniqueWords_en(text) {
    let words = text.toLowerCase().match(/\b\w+\b/g);
    words = Array.from(new Set(words));
    words.sort();
    return words.join(' ');
  }
  function sortAndUniqueWords_cn(text) {
    let words = text.match(/[^\u4e00-\u9fa5]+|[\u4e00-\u9fa5]+/g);
    words = Array.from(new Set(words));
    words.sort(function(a, b) {
      return a.localeCompare(b, 'zh-Hans-CN', {sensitivity: 'accent'});
    });
    return words.join(' ');
  }

  Scratch.extensions.register(new sortAndUniqueWords());
})(Scratch);
