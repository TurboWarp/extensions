// SPDX-License-Identifier: MIT
// Copyright (c) [year] [author]
class ZipExtension {
  constructor() {
    this.zip = null;
  }

  getInfo() {
    return {
      id: 'zipExtension',
      name: 'ZIP 解压增强版',
      blocks: [
        // 加载 ZIP
        {
          opcode: 'loadFromDataURL',
          blockType: 'command',
          text: '从 data:URL [url] 加载 ZIP',
          arguments: {
            url: {
              type: 'string',
              defaultValue: 'data:application/zip;base64,...'
            }
          }
        },
        // 提取文本文件
        {
          opcode: 'extractTextFile',
          blockType: 'reporter',
          text: '提取文本文件 [filename]',
          arguments: {
            filename: {
              type: 'string',
              defaultValue: 'file.txt'
            }
          }
        },
        // 提取文件为 data:URL（新增！）
        {
          opcode: 'extractFileAsDataURL',
          blockType: 'reporter',
          text: '提取文件 [filename] 为 data:URL',
          arguments: {
            filename: {
              type: 'string',
              defaultValue: 'image.png'
            }
          }
        },
        // 获取文件列表
        {
          opcode: 'getFileList',
          blockType: 'reporter',
          text: '获取 ZIP 内文件列表'
        }
      ]
    };
  }

  async loadFromDataURL(args) {
    try {
      const base64Data = args.url.split(',')[1];
      const binaryString = atob(base64Data);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      
      // 动态加载 JSZip 库
      if (!window.JSZip) {
        await new Promise((resolve) => {
          const script = document.createElement('script');
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js';
          script.onload = resolve;
          document.head.appendChild(script);
        });
      }
      
      this.zip = await JSZip.loadAsync(bytes);
      return true;
    } catch (error) {
      console.error('加载 ZIP 失败:', error);
      return false;
    }
  }

  async extractTextFile(args) {
    if (!this.zip) return '';
    try {
      const file = this.zip.file(args.filename);
      if (!file) return '';
      return await file.async('text');
    } catch (error) {
      console.error('提取文本失败:', error);
      return '';
    }
  }

  // 新增方法：提取文件为 data:URL
  async extractFileAsDataURL(args) {
    if (!this.zip) return '';
    try {
      const file = this.zip.file(args.filename);
      if (!file) return '';
      
      // 获取文件二进制数据
      const arrayBuffer = await file.async('arraybuffer');
      const bytes = new Uint8Array(arrayBuffer);
      
      // 转换为 Base64
      let binary = '';
      bytes.forEach((byte) => {
        binary += String.fromCharCode(byte);
      });
      const base64 = btoa(binary);
      
      // 根据文件类型生成 data:URL
      const mimeType = this.getMimeType(args.filename);
      return `data:${mimeType};base64,${base64}`;
    } catch (error) {
      console.error('生成 data:URL 失败:', error);
      return '';
    }
  }

  // 辅助方法：根据文件名获取 MIME 类型
  getMimeType(filename) {
    const extension = filename.split('.').pop().toLowerCase();
    const mimeTypes = {
      png: 'image/png',
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      gif: 'image/gif',
      mp3: 'audio/mpeg',
      wav: 'audio/wav',
      json: 'application/json',
      txt: 'text/plain'
    };
    return mimeTypes[extension] || 'application/octet-stream';
  }

  getFileList() {
    if (!this.zip) return '';
    const files = [];
    this.zip.forEach((path) => {
      if (!this.zip.file(path).dir) {
        files.push(path);
      }
    });
    return files.join(', ');
  }
}

Scratch.extensions.register(new ZipExtension());
