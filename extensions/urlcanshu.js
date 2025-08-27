l(function (Scratch) {
  'use strict';
  
  class UrlParamsExtension {
    constructor() {
      // 存储URL参数的内存（用于打包应用）
      this.memory = {
        search: '',
        hash: ''
      };
    }
    
    getInfo() {
      return {
        id: 'urlparams',
        name: 'URL参数',
        blocks: [
          // 设置参数块
          {
            opcode: 'setSearchParam',
            blockType: Scratch.BlockType.COMMAND,
            text: '切换URL地址到?[PARAM]',
            arguments: {
              PARAM: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '123'
              }
            }
          },
          {
            opcode: 'setHashParam',
            blockType: Scratch.BlockType.COMMAND,
            text: '切换URL地址到#[HASH]',
            arguments: {
              HASH: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '234'
              }
            }
          },
          
          // 清除参数块
          {
            opcode: 'clearSearchParam',
            blockType: Scratch.BlockType.COMMAND,
            text: '清除URL地址?参数'
          },
          {
            opcode: 'clearHashParam',
            blockType: Scratch.BlockType.COMMAND,
            text: '清除URL地址#哈希'
          },
          
          // 检查块
          {
            opcode: 'hasSearchParam',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '是否包含?'
          },
          {
            opcode: 'hasHashParam',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '是否包含#'
          },
          
          // 提取参数块
          {
            opcode: 'getSearchContent',
            blockType: Scratch.BlockType.REPORTER,
            text: '搜索参数中的?'
          },
          {
            opcode: 'getHashContent',
            blockType: Scratch.BlockType.REPORTER,
            text: '搜索参数中的#'
          },
          
          // 获取当前参数
          {
            opcode: 'getCurrentParams',
            blockType: Scratch.BlockType.REPORTER,
            text: '当前URL搜索参数'
          }
        ]
      };
    }
    
    // 设置查询参数
    setSearchParam(args) {
      const param = args.PARAM;
      if (typeof window !== 'undefined' && window.location) {
        const newUrl = window.location.pathname + '?' + param + window.location.hash;
        window.history.pushState({}, '', newUrl);
      } else {
        this.memory.search = param;
      }
    }
    
    // 设置哈希值
    setHashParam(args) {
      const hash = args.HASH;
      if (typeof window !== 'undefined' && window.location) {
        const newUrl = window.location.pathname + (window.location.search || '') + '#' + hash;
        window.history.pushState({}, '', newUrl);
      } else {
        this.memory.hash = hash;
      }
    }
    
    // 清除查询参数
    clearSearchParam() {
      if (typeof window !== 'undefined' && window.location) {
        const newUrl = window.location.pathname + window.location.hash;
        window.history.pushState({}, '', newUrl);
      } else {
        this.memory.search = '';
      }
    }
    
    // 清除哈希值
    clearHashParam() {
      if (typeof window !== 'undefined' && window.location) {
        const newUrl = window.location.pathname + window.location.search;
        window.history.pushState({}, '', newUrl);
      } else {
        this.memory.hash = '';
      }
    }
    
    // 检查是否有查询参数
    hasSearchParam() {
      if (typeof window !== 'undefined' && window.location) {
        return window.location.search !== '';
      } else {
        return this.memory.search !== '';
      }
    }
    
    // 检查是否有哈希值
    hasHashParam() {
      if (typeof window !== 'undefined' && window.location) {
        return window.location.hash !== '';
      } else {
        return this.memory.hash !== '';
      }
    }
    
    // 获取查询参数内容（不含问号）
    getSearchContent() {
      if (typeof window !== 'undefined' && window.location) {
        return window.location.search.substring(1); // 去掉开头的问号
      } else {
        return this.memory.search;
      }
    }
    
    // 获取哈希值内容（不含井号）
    getHashContent() {
      if (typeof window !== 'undefined' && window.location) {
        return window.location.hash.substring(1); // 去掉开头的井号
      } else {
        return this.memory.hash;
      }
    }
    
    // 获取当前参数
    getCurrentParams() {
      if (typeof window !== 'undefined' && window.location) {
        return window.location.search + window.location.hash;
      } else {
        return (this.memory.search ? '?' + this.memory.search : '') + 
               (this.memory.hash ? '#' + this.memory.hash : '');
      }
    }
  }
  
  Scratch.extensions.register(new UrlParamsExtension());

})(Scratch);
