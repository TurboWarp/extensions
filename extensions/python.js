class PythonTerminalWithAdvancedFileManager {
  constructor() {
    this.terminals = {};
    this.fileManagerWindows = {};
    this.sandbox = {
      files: {},
      nextId: 1
    };
    this.clipboard = null;
    this._initStyles();
    this._initSandbox();
  }

  getInfo() {
    return {
      id: 'pythonterminaladvanced',
      name: 'Python终端与高级文件管理器',
      color1: '#3572A5',
      color2: '#2C5F8B',
      color3: '#234A71',
      blocks: [
        // 终端管理
        {
          opcode: 'createTerminal',
          blockType: Scratch.BlockType.COMMAND,
          text: '创建终端 名称:[NAME] 宽:[WIDTH] 高:[HEIGHT] X:[X] Y:[Y]',
          arguments: {
            NAME: { type: Scratch.ArgumentType.STRING, defaultValue: 'terminal1' },
            WIDTH: { type: Scratch.ArgumentType.NUMBER, defaultValue: 500 },
            HEIGHT: { type: Scratch.ArgumentType.NUMBER, defaultValue: 300 },
            X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 },
            Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 }
          }
        },
        {
          opcode: 'deleteTerminal',
          blockType: Scratch.BlockType.COMMAND,
          text: '删除终端 [NAME]',
          arguments: {
            NAME: { type: Scratch.ArgumentType.STRING, defaultValue: 'terminal1' }
          }
        },
        {
          opcode: 'printToTerminal',
          blockType: Scratch.BlockType.COMMAND,
          text: '在终端 [NAME] 打印 [TEXT]',
          arguments: {
            NAME: { type: Scratch.ArgumentType.STRING, defaultValue: 'terminal1' },
            TEXT: { type: Scratch.ArgumentType.STRING, defaultValue: 'Hello, World!' }
          }
        },
        {
          opcode: 'clearTerminal',
          blockType: Scratch.BlockType.COMMAND,
          text: '清空终端 [NAME]',
          arguments: {
            NAME: { type: Scratch.ArgumentType.STRING, defaultValue: 'terminal1' }
          }
        },
        
        // 文件系统操作
        {
          opcode: 'initSandbox',
          blockType: Scratch.BlockType.COMMAND,
          text: '初始化沙盒'
        },
        {
          opcode: 'importFileFromUrl',
          blockType: Scratch.BlockType.COMMAND,
          text: '从URL导入文件 [URL] 保存到 [PATH]',
          arguments: {
            URL: { type: Scratch.ArgumentType.STRING, defaultValue: 'https://example.com/file.txt' },
            PATH: { type: Scratch.ArgumentType.STRING, defaultValue: 'downloaded.txt' }
          }
        },
        {
          opcode: 'uploadLocalFile',
          blockType: Scratch.BlockType.COMMAND,
          text: '上传本地文件 保存到 [PATH]',
          arguments: {
            PATH: { type: Scratch.ArgumentType.STRING, defaultValue: 'uploaded.txt' }
          }
        },
        {
          opcode: 'importFilesFromJson',
          blockType: Scratch.BlockType.COMMAND,
          text: '导入JSON文件列表 [JSON] 到目录 [PATH]',
          arguments: {
            JSON: { type: Scratch.ArgumentType.STRING, defaultValue: '[{"name":"test.txt","url":"data:text/plain;base64,dGVzdA=="}]' },
            PATH: { type: Scratch.ArgumentType.STRING, defaultValue: 'imported_files' }
          }
        },
        {
          opcode: 'writeFile',
          blockType: Scratch.BlockType.COMMAND,
          text: '写入文件 [PATH] 内容 [CONTENT]',
          arguments: {
            PATH: { type: Scratch.ArgumentType.STRING, defaultValue: 'file.txt' },
            CONTENT: { type: Scratch.ArgumentType.STRING, defaultValue: 'Hello, World!' }
          }
        },
        {
          opcode: 'readFile',
          blockType: Scratch.BlockType.REPORTER,
          text: '读取文件 [PATH]',
          arguments: {
            PATH: { type: Scratch.ArgumentType.STRING, defaultValue: 'file.txt' }
          }
        },
        {
          opcode: 'readFileAsDataURL',
          blockType: Scratch.BlockType.REPORTER,
          text: '读取文件 [PATH] 为DataURL',
          arguments: {
            PATH: { type: Scratch.ArgumentType.STRING, defaultValue: 'image.png' }
          }
        },
        {
          opcode: 'fileExists',
          blockType: Scratch.BlockType.BOOLEAN,
          text: '文件 [PATH] 存在?',
          arguments: {
            PATH: { type: Scratch.ArgumentType.STRING, defaultValue: 'file.txt' }
          }
        },
        {
          opcode: 'createDirectory',
          blockType: Scratch.BlockType.COMMAND,
          text: '创建目录 [PATH]',
          arguments: {
            PATH: { type: Scratch.ArgumentType.STRING, defaultValue: 'new_folder' }
          }
        },
        {
          opcode: 'listFiles',
          blockType: Scratch.BlockType.REPORTER,
          text: '列出目录 [PATH] 下的文件',
          arguments: {
            PATH: { type: Scratch.ArgumentType.STRING, defaultValue: '/' }
          }
        },
        {
          opcode: 'deleteFile',
          blockType: Scratch.BlockType.COMMAND,
          text: '删除文件 [PATH]',
          arguments: {
            PATH: { type: Scratch.ArgumentType.STRING, defaultValue: 'file.txt' }
          }
        },
        
        // Python执行
        {
          opcode: 'runPythonCode',
          blockType: Scratch.BlockType.COMMAND,
          text: '运行Python代码 [CODE] 输出到 [TERMINAL]',
          arguments: {
            CODE: { type: Scratch.ArgumentType.STRING, defaultValue: 'print("Hello, World!")' },
            TERMINAL: { type: Scratch.ArgumentType.STRING, defaultValue: 'terminal1' }
          }
        },
        {
          opcode: 'runPythonFile',
          blockType: Scratch.BlockType.COMMAND,
          text: '运行Python文件 [PATH] 输出到 [TERMINAL]',
          arguments: {
            PATH: { type: Scratch.ArgumentType.STRING, defaultValue: 'script.py' },
            TERMINAL: { type: Scratch.ArgumentType.STRING, defaultValue: 'terminal1' }
          }
        },
        
        // 文件管理器
        {
          opcode: 'showFileManager',
          blockType: Scratch.BlockType.COMMAND,
          text: '显示文件管理器'
        },
        {
          opcode: 'showFileManagerAndSelect',
          blockType: Scratch.BlockType.COMMAND,
          text: '显示文件管理器并选择文件 保存到变量 [VARIABLE] 格式 [FORMAT] [CLOSE_ACTION]',
          arguments: {
            VARIABLE: { type: Scratch.ArgumentType.STRING, defaultValue: 'selected_file' },
            FORMAT: { type: Scratch.ArgumentType.STRING, menu: 'formatMenu', defaultValue: 'Data:URL' },
            CLOSE_ACTION: { type: Scratch.ArgumentType.STRING, menu: 'closeMenu', defaultValue: '关闭' }
          }
        },
        {
          opcode: 'closeFileManager',
          blockType: Scratch.BlockType.COMMAND,
          text: '关闭文件管理器窗口'
        }
      ],
      menus: {
        formatMenu: { acceptReporters: true, items: ['Data:URL', '内容'] },
        closeMenu: { acceptReporters: true, items: ['关闭', '不关闭'] }
      }
    };
  }

  _initStyles() {
    const style = document.createElement('style');
    style.textContent = `
      .python-terminal-advanced, .file-manager-window {
        position: absolute;
        background-color: #1e1e1e;
        color: #f0f0f0;
        font-family: 'Courier New', monospace;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0,0,0,0.5);
        z-index: 10000;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }
      .terminal-header, .fm-header {
        padding: 5px 10px;
        background-color: #2d2d2d;
        border-bottom: 1px solid #ccc;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: move;
        user-select: none;
      }
      .terminal-title, .fm-title {
        font-weight: bold;
      }
      .terminal-close, .fm-close {
        cursor: pointer;
        padding: 0 5px;
      }
      .terminal-body, .fm-body {
        flex: 1;
        padding: 10px;
        overflow: auto;
        white-space: pre-wrap;
      }
      .terminal-input-area, .fm-path-bar {
        padding: 5px;
        border-top: 1px solid #3a3a3a;
        display: flex;
        align-items: center;
      }
      .terminal-input, .fm-path-input {
        flex: 1;
        background: #2a2a2a;
        color: #f0f0f0;
        border: none;
        padding: 5px;
        font-family: inherit;
      }
      .terminal-prompt {
        color: #4CAF50;
        margin-right: 5px;
      }
      .file-upload-input {
        display: none;
      }
      .fm-toolbar {
        padding: 5px;
        background-color: #f8f8f8;
        border-bottom: 1px solid #ddd;
        display: flex;
        gap: 5px;
      }
      .fm-toolbar button {
        padding: 3px 8px;
        border: 1px solid #ccc;
        border-radius: 3px;
        background-color: #fff;
        cursor: pointer;
      }
      .fm-file-list {
        flex: 1;
        overflow: auto;
        padding: 5px;
      }
      .fm-file-item {
        padding: 5px;
        display: flex;
        align-items: center;
        cursor: pointer;
        border-radius: 3px;
        margin-bottom: 2px;
      }
      .fm-file-item:hover {
        background-color: #f0f0f0;
      }
      .fm-file-item.selected {
        background-color: #e0e0ff;
      }
      .fm-icon {
        width: 24px;
        height: 24px;
        margin-right: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .fm-icon img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
      }
    `;
    document.head.appendChild(style);
  }

  _initSandbox() {
    this.sandbox = {
      files: {},
      nextId: 1
    };
    this._createDirectory('/');
  }

  // 终端相关方法
  createTerminal(args) {
    const name = Scratch.Cast.toString(args.NAME);
    const width = Math.max(100, Number(Scratch.Cast.toNumber(args.WIDTH)));
    const height = Math.max(100, Number(Scratch.Cast.toNumber(args.HEIGHT)));
    const x = Number(Scratch.Cast.toNumber(args.X));
    const y = Number(Scratch.Cast.toNumber(args.Y));

    if (this.terminals[name]) {
      this.deleteTerminal({ NAME: name });
    }

    const runtimeArea = document.querySelector('[class*="runtime-area_"]') || document.body;
    const terminal = document.createElement('div');
    terminal.className = 'python-terminal-advanced';
    terminal.style.width = `${width}px`;
    terminal.style.height = `${height}px`;
    terminal.style.left = `${x}px`;
    terminal.style.top = `${y}px`;

    const header = document.createElement('div');
    header.className = 'terminal-header';
    const title = document.createElement('span');
    title.className = 'terminal-title';
    title.textContent = name;
    const closeBtn = document.createElement('span');
    closeBtn.className = 'terminal-close';
    closeBtn.textContent = '×';
    closeBtn.onclick = () => this.deleteTerminal({ NAME: name });
    header.appendChild(title);
    header.appendChild(closeBtn);
    terminal.appendChild(header);

    const body = document.createElement('div');
    body.className = 'terminal-body';
    terminal.appendChild(body);

    const inputArea = document.createElement('div');
    inputArea.className = 'terminal-input-area';
    const prompt = document.createElement('span');
    prompt.className = 'terminal-prompt';
    prompt.textContent = '>>>';
    const input = document.createElement('input');
    input.className = 'terminal-input';
    input.type = 'text';
    input.placeholder = '输入Python代码...';
    input.onkeydown = (e) => {
      if (e.key === 'Enter') {
        this.runPythonCode({
          CODE: input.value,
          TERMINAL: name
        });
        input.value = '';
      }
    };
    inputArea.appendChild(prompt);
    inputArea.appendChild(input);
    terminal.appendChild(inputArea);

    runtimeArea.appendChild(terminal);

    this.terminals[name] = {
      element: terminal,
      bodyElement: body,
      inputElement: input,
      headerElement: header,
      isDragging: false,
      dragOffset: { x: 0, y: 0 }
    };

    this._setupDragHandlers(name, header, terminal);
  }

  deleteTerminal(args) {
    const name = Scratch.Cast.toString(args.NAME);
    if (this.terminals[name]) {
      this.terminals[name].element.remove();
      delete this.terminals[name];
    }
  }

  printToTerminal(args) {
    const name = Scratch.Cast.toString(args.NAME);
    const text = Scratch.Cast.toString(args.TEXT);
    if (this.terminals[name]) {
      const line = document.createElement('div');
      line.textContent = text;
      this.terminals[name].bodyElement.appendChild(line);
      this.terminals[name].bodyElement.scrollTop = this.terminals[name].bodyElement.scrollHeight;
    }
  }

  clearTerminal(args) {
    const name = Scratch.Cast.toString(args.NAME);
    if (this.terminals[name]) {
      this.terminals[name].bodyElement.innerHTML = '';
    }
  }

  // 文件系统方法
  initSandbox() {
    this._initSandbox();
  }

  async importFileFromUrl(args) {
    const url = Scratch.Cast.toString(args.URL);
    const path = this._normalizePath(Scratch.Cast.toString(args.PATH));
    const terminalName = Object.keys(this.terminals)[0] || 'terminal1';
    
    try {
      this.printToTerminal({
        NAME: terminalName,
        TEXT: `正在从URL下载文件: ${url}`
      });
      
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP错误: ${response.status}`);
      const content = await response.text();
      this._writeFile(path, content);
      
      this.printToTerminal({
        NAME: terminalName,
        TEXT: `文件已保存到沙盒: ${path} (${content.length}字节)`
      });
    } catch (error) {
      this.printToTerminal({
        NAME: terminalName,
        TEXT: `下载失败: ${error.message}`
      });
    }
  }

  uploadLocalFile(args) {
    const path = this._normalizePath(Scratch.Cast.toString(args.PATH));
    const terminalName = Object.keys(this.terminals)[0] || 'terminal1';
    
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.className = 'file-upload-input';
    
    fileInput.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      
      try {
        this.printToTerminal({
          NAME: terminalName,
          TEXT: `正在上传文件: ${file.name}`
        });
        
        const content = await this._readFileContent(file);
        this._writeFile(path, content);
        
        this.printToTerminal({
          NAME: terminalName,
          TEXT: `文件已保存到沙盒: ${path} (${content.length}字节)`
        });
      } catch (error) {
        this.printToTerminal({
          NAME: terminalName,
          TEXT: `上传失败: ${error.message}`
        });
      }
    };
    
    fileInput.click();
  }

  async importFilesFromJson(args) {
    const jsonStr = Scratch.Cast.toString(args.JSON);
    const basePath = this._normalizePath(Scratch.Cast.toString(args.PATH));
    const terminalName = Object.keys(this.terminals)[0] || 'terminal1';
    
    try {
      const files = JSON.parse(jsonStr);
      if (!Array.isArray(files)) throw new Error('JSON格式应为文件数组');
      
      this.printToTerminal({
        NAME: terminalName,
        TEXT: `开始导入 ${files.length} 个文件到 ${basePath}`
      });
      
      // 确保目录存在
      this._createDirectory(basePath);
      
      let successCount = 0;
      for (const file of files) {
        try {
          if (!file.name || !file.url) {
            throw new Error('缺少name或url字段');
          }
          
          const filePath = this._joinPaths(basePath, file.name);
          if (file.url.startsWith('data:')) {
            // Data URL格式
            const commaIndex = file.url.indexOf(',');
            if (commaIndex === -1) throw new Error('无效的Data URL');
            
            const base64Data = file.url.substring(commaIndex + 1);
            const content = atob(base64Data);
            this._writeFile(filePath, content);
          } else {
            // 普通URL
            const response = await fetch(file.url);
            if (!response.ok) throw new Error(`HTTP错误: ${response.status}`);
            const content = await response.text();
            this._writeFile(filePath, content);
          }
          
          successCount++;
        } catch (error) {
          this.printToTerminal({
            NAME: terminalName,
            TEXT: `导入文件 ${file.name} 失败: ${error.message}`
          });
        }
      }
      
      this.printToTerminal({
        NAME: terminalName,
        TEXT: `导入完成，成功 ${successCount}/${files.length} 个文件`
      });
    } catch (error) {
      this.printToTerminal({
        NAME: terminalName,
        TEXT: `导入失败: ${error.message}`
      });
    }
  }

  writeFile(args) {
    const path = this._normalizePath(Scratch.Cast.toString(args.PATH));
    const content = Scratch.Cast.toString(args.CONTENT);
    this._writeFile(path, content);
  }

  readFile(args) {
    const path = this._normalizePath(Scratch.Cast.toString(args.PATH));
    if (!this._fileExists(path)) return '';
    return this._readFile(path);
  }

  readFileAsDataURL(args) {
    const path = this._normalizePath(Scratch.Cast.toString(args.PATH));
    if (!this._fileExists(path)) return '';
    const content = this._readFile(path);
    const mimeType = this._guessMimeType(path);
    return `data:${mimeType};base64,${btoa(content)}`;
  }

  fileExists(args) {
    const path = this._normalizePath(Scratch.Cast.toString(args.PATH));
    return this._fileExists(path);
  }

  createDirectory(args) {
    const path = this._normalizePath(Scratch.Cast.toString(args.PATH));
    this._createDirectory(path);
  }

  listFiles(args) {
    const path = this._normalizePath(Scratch.Cast.toString(args.PATH));
    if (!this._directoryExists(path)) return '[]';
    const files = [];
    for (const filePath in this.sandbox.files) {
      const item = this.sandbox.files[filePath];
      if (item.parent === path) {
        files.push(item.path.startsWith('/') ? item.path : `/${item.path}`);
      }
    }
    return JSON.stringify(files);
  }

  deleteFile(args) {
    const path = this._normalizePath(Scratch.Cast.toString(args.PATH));
    this._deleteFile(path);
  }

  // Python执行方法
  async runPythonCode(args) {
    const code = Scratch.Cast.toString(args.CODE);
    const terminalName = Scratch.Cast.toString(args.TERMINAL);
    if (!this.terminals[terminalName]) return;
    
    const terminal = this.terminals[terminalName];
    this.printToTerminal({
      NAME: terminalName,
      TEXT: `>>> ${code.replace(/\n/g, '\n... ')}`
    });
    
    try {
      const context = {
        print: (...args) => {
          this.printToTerminal({
            NAME: terminalName,
            TEXT: args.join(' ')
          });
        },
        input: async (prompt) => {
          if (prompt) {
            this.printToTerminal({
              NAME: terminalName,
              TEXT: prompt
            });
          }
          
          terminal.inputElement.focus();
          return new Promise((resolve) => {
            const handler = (e) => {
              if (e.key === 'Enter') {
                const value = terminal.inputElement.value;
                terminal.inputElement.value = '';
                terminal.inputElement.removeEventListener('keydown', handler);
                resolve(value);
              }
            };
            terminal.inputElement.addEventListener('keydown', handler);
          });
        },
        __sandbox: this.sandbox,
        __extension: this
      };
      
      const wrappedCode = `(async function() { ${code.includes('\n') ? code : `return (${code})`} })()`;
      const func = new Function('print', 'input', '__sandbox', '__extension', wrappedCode);
      const result = await func(context.print, context.input, context.__sandbox, context.__extension);
      
      if (result !== undefined && !code.includes('\n')) {
        this.printToTerminal({
          NAME: terminalName,
          TEXT: String(result)
        });
      }
    } catch (error) {
      this.printToTerminal({
        NAME: terminalName,
        TEXT: `错误: ${error.message}`
      });
    }
  }

  async runPythonFile(args) {
    const path = this._normalizePath(Scratch.Cast.toString(args.PATH));
    const terminalName = Scratch.Cast.toString(args.TERMINAL);
    if (!this._fileExists(path)) {
      this.printToTerminal({
        NAME: terminalName,
        TEXT: `错误: 文件 ${path} 不存在`
      });
      return;
    }
    
    const code = this._readFile(path);
    await this.runPythonCode({
      CODE: code,
      TERMINAL: terminalName
    });
  }

  // 文件管理器方法
  showFileManager() {
    const windowId = 'fm_' + Date.now();
    this._createFileManagerWindow(windowId);
  }

  showFileManagerAndSelect(args) {
    const variable = Scratch.Cast.toString(args.VARIABLE);
    const format = Scratch.Cast.toString(args.FORMAT);
    const closeAction = Scratch.Cast.toString(args.CLOSE_ACTION);
    const windowId = 'fm_' + Date.now();
    const fm = this._createFileManagerWindow(windowId);
    
    fm.selectionHandler = (filePath) => {
      try {
        let value;
        if (format === 'Data:URL') {
          const content = this._readFile(filePath);
          const mimeType = this._guessMimeType(filePath);
          value = `data:${mimeType};base64,${btoa(content)}`;
        } else {
          value = this._readFile(filePath);
        }
        
        this._setVariable(variable, value);
        if (closeAction === '关闭') this._closeFileManagerWindow(windowId);
      } catch (error) {
        console.error('处理文件选择时出错:', error);
      }
    };
  }

  closeFileManager() {
    Object.keys(this.fileManagerWindows).forEach(id => {
      this._closeFileManagerWindow(id);
    });
  }

  _createFileManagerWindow(windowId, initialPath = '/') {
    const windowElement = document.createElement('div');
    windowElement.className = 'file-manager-window';
    windowElement.style.width = '600px';
    windowElement.style.height = '400px';
    windowElement.style.left = '100px';
    windowElement.style.top = '100px';

    const header = document.createElement('div');
    header.className = 'fm-header';
    const title = document.createElement('span');
    title.className = 'fm-title';
    title.textContent = '文件管理器';
    const closeBtn = document.createElement('span');
    closeBtn.className = 'fm-close';
    closeBtn.textContent = '×';
    closeBtn.onclick = () => this._closeFileManagerWindow(windowId);
    header.appendChild(title);
    header.appendChild(closeBtn);
    windowElement.appendChild(header);

    const pathBar = document.createElement('div');
    pathBar.className = 'fm-path-bar';
    const pathInput = document.createElement('input');
    pathInput.className = 'fm-path-input';
    pathInput.type = 'text';
    pathInput.value = initialPath;
    pathBar.appendChild(pathInput);
    windowElement.appendChild(pathBar);

    const toolbar = document.createElement('div');
    toolbar.className = 'fm-toolbar';
    
    const newFolderBtn = document.createElement('button');
    newFolderBtn.textContent = '新建文件夹';
    newFolderBtn.onclick = () => {
      const folderName = prompt('输入文件夹名称:');
      if (folderName) {
        const newPath = this._joinPaths(pathInput.value, folderName);
        this._createDirectory(newPath);
        this._refreshFileManager(windowId, pathInput.value);
      }
    };
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '删除';
    deleteBtn.onclick = () => {
      const selected = this.fileManagerWindows[windowId].selectedItem;
      if (selected && confirm(`确定要删除 ${selected} 吗?`)) {
        if (this._directoryExists(selected)) {
          Object.keys(this.sandbox.files).forEach(path => {
            if (path.startsWith(selected + '/') || path === selected) {
              delete this.sandbox.files[path];
            }
          });
        } else {
          this._deleteFile(selected);
        }
        this._refreshFileManager(windowId, pathInput.value);
      }
    };
    
    const copyBtn = document.createElement('button');
    copyBtn.textContent = '复制';
    copyBtn.onclick = () => {
      const selected = this.fileManagerWindows[windowId].selectedItem;
      if (selected) this.clipboard = { action: 'copy', path: selected };
    };
    
    const cutBtn = document.createElement('button');
    cutBtn.textContent = '剪切';
    cutBtn.onclick = () => {
      const selected = this.fileManagerWindows[windowId].selectedItem;
      if (selected) this.clipboard = { action: 'cut', path: selected };
    };
    
    const pasteBtn = document.createElement('button');
    pasteBtn.textContent = '粘贴';
    pasteBtn.onclick = () => {
      if (this.clipboard) {
        const destPath = this._joinPaths(
          pathInput.value,
          this._getFilename(this.clipboard.path)
        );

        if (this.clipboard.action === 'copy') {
          if (this._directoryExists(this.clipboard.path)) {
            this._copyFolder(this.clipboard.path, destPath);
          } else {
            this._copyFile(this.clipboard.path, destPath);
          }
        } else {
          if (this._directoryExists(this.clipboard.path)) {
            this._moveFolder(this.clipboard.path, destPath);
          } else {
            this._moveFile(this.clipboard.path, destPath);
          }
          this.clipboard = null;
        }
        this._refreshFileManager(windowId, pathInput.value);
      }
    };

    toolbar.appendChild(newFolderBtn);
    toolbar.appendChild(deleteBtn);
    toolbar.appendChild(copyBtn);
    toolbar.appendChild(cutBtn);
    toolbar.appendChild(pasteBtn);
    windowElement.appendChild(toolbar);

    const fileList = document.createElement('div');
    fileList.className = 'fm-file-list';
    windowElement.appendChild(fileList);

    document.body.appendChild(windowElement);

    this.fileManagerWindows[windowId] = {
      element: windowElement,
      fileList: fileList,
      pathInput: pathInput,
      currentPath: initialPath,
      selectedItem: null,
      selectionHandler: null
    };

    this._refreshFileManager(windowId, initialPath);
    this._setupDragHandlers(windowId, header, windowElement);

    return this.fileManagerWindows[windowId];
  }

  _refreshFileManager(windowId, path) {
    const fm = this.fileManagerWindows[windowId];
    if (!fm) return;

    fm.fileList.innerHTML = '';
    fm.currentPath = path;
    fm.pathInput.value = path;

    if (path !== '/') {
      const parentItem = document.createElement('div');
      parentItem.className = 'fm-file-item';
      const parentIcon = document.createElement('div');
      parentIcon.className = 'fm-icon';
      parentIcon.textContent = '↩';
      const parentText = document.createElement('span');
      parentText.textContent = '... (返回上级)';
      parentItem.appendChild(parentIcon);
      parentItem.appendChild(parentText);
      parentItem.onclick = () => {
        const parentPath = this._getParentPath(path);
        this._refreshFileManager(windowId, parentPath);
      };
      fm.fileList.appendChild(parentItem);
    }

    const items = [];
    for (const filePath in this.sandbox.files) {
      const item = this.sandbox.files[filePath];
      if (item.parent === path) items.push(item);
    }

    items.sort((a, b) => {
      if (a.type === 'directory' && b.type !== 'directory') return -1;
      if (a.type !== 'directory' && b.type === 'directory') return 1;
      return a.name.localeCompare(b.name);
    });

    items.forEach(item => {
      const itemElement = document.createElement('div');
      itemElement.className = 'fm-file-item';
      
      const icon = document.createElement('div');
      icon.className = 'fm-icon';
      
      if (item.type === 'directory') {
        icon.textContent = '📂';
      } else {
        const extension = item.name.split('.').pop().toLowerCase();
        if (['png', 'jpg', 'jpeg', 'gif'].includes(extension)) {
          try {
            const content = this._readFile(item.path);
            const img = document.createElement('img');
            img.src = `data:image/${extension};base64,${btoa(content)}`;
            icon.appendChild(img);
          } catch {
            icon.textContent = '📄';
          }
        } else if (['mp4', 'webm', 'ogg'].includes(extension)) {
          icon.textContent = '🎬';
        } else {
          icon.textContent = '📄';
        }
      }

      const name = document.createElement('span');
      name.textContent = item.name;

      itemElement.appendChild(icon);
      itemElement.appendChild(name);

      itemElement.onclick = (e) => {
        if (e.detail === 2) {
          if (item.type === 'directory') {
            this._refreshFileManager(windowId, item.path);
          } else if (fm.selectionHandler) {
            fm.selectionHandler(item.path);
          }
        } else {
          fm.fileList.querySelectorAll('.fm-file-item').forEach(el => {
            el.classList.remove('selected');
          });
          itemElement.classList.add('selected');
          fm.selectedItem = item.path;
        }
      };

      fm.fileList.appendChild(itemElement);
    });
  }

  _closeFileManagerWindow(windowId) {
    const fm = this.fileManagerWindows[windowId];
    if (fm) {
      fm.element.remove();
      delete this.fileManagerWindows[windowId];
    }
  }

  _setupDragHandlers(windowId, dragHandle, windowElement) {
    let isDragging = false;
    let offsetX, offsetY;

    dragHandle.onmousedown = (e) => {
      isDragging = true;
      offsetX = e.clientX - windowElement.offsetLeft;
      offsetY = e.clientY - windowElement.offsetTop;
      e.preventDefault();
    };

    document.onmousemove = (e) => {
      if (isDragging) {
        windowElement.style.left = `${e.clientX - offsetX}px`;
        windowElement.style.top = `${e.clientY - offsetY}px`;
      }
    };

    document.onmouseup = () => {
      isDragging = false;
    };
  }

  // 辅助方法
  _normalizePath(path) {
    if (!path.startsWith('/')) path = '/' + path;
    if (path.endsWith('/') && path !== '/') path = path.slice(0, -1);
    return path;
  }

  _getParentPath(path) {
    const parts = path.split('/').filter(p => p);
    parts.pop();
    return parts.length ? '/' + parts.join('/') : '/';
  }

  _joinPaths(base, name) {
    if (base === '/') return base + name;
    return base + '/' + name;
  }

  _getFilename(path) {
    return path.split('/').pop();
  }

  _writeFile(path, content) {
    const dirPath = this._getParentPath(path);
    if (!this._directoryExists(dirPath)) this._createDirectory(dirPath);
    
    this.sandbox.files[path] = {
      id: this.sandbox.nextId++,
      name: this._getFilename(path),
      path: path,
      type: 'file',
      content: content,
      parent: dirPath,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }

  _readFile(path) {
    return this.sandbox.files[path]?.content || '';
  }

  _readFileContent(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (e) => reject(new Error('文件读取失败'));
      reader.readAsText(file);
    });
  }

  _fileExists(path) {
    return this.sandbox.files[path]?.type === 'file';
  }

  _directoryExists(path) {
    return this.sandbox.files[path]?.type === 'directory';
  }

  _createDirectory(path) {
    const fullPath = this._normalizePath(path);
    if (this._directoryExists(fullPath)) return;
    
    const parentPath = this._getParentPath(fullPath);
    if (parentPath !== '/' && !this._directoryExists(parentPath)) {
      this._createDirectory(parentPath);
    }
    
    this.sandbox.files[fullPath] = {
      id: this.sandbox.nextId++,
      name: fullPath === '/' ? '' : fullPath.split('/').pop(),
      path: fullPath,
      type: 'directory',
      content: null,
      parent: parentPath,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
  }

  _deleteFile(path) {
    if (this._fileExists(path)) delete this.sandbox.files[path];
  }

  _copyFile(srcPath, destPath) {
    if (!this._fileExists(srcPath)) return;
    const content = this._readFile(srcPath);
    this._writeFile(destPath, content);
  }

  _copyFolder(srcPath, destPath) {
    if (!this._directoryExists(srcPath)) return;
    this._createDirectory(destPath);
    
    Object.keys(this.sandbox.files).forEach(path => {
      if (path.startsWith(srcPath + '/')) {
        const relativePath = path.substring(srcPath.length);
        const newPath = destPath + relativePath;
        
        if (this._directoryExists(path)) {
          this._createDirectory(newPath);
        } else {
          this._copyFile(path, newPath);
        }
      }
    });
  }

  _moveFile(srcPath, destPath) {
    if (!this._fileExists(srcPath)) return;
    const content = this._readFile(srcPath);
    this._writeFile(destPath, content);
    this._deleteFile(srcPath);
  }

  _moveFolder(srcPath, destPath) {
    if (!this._directoryExists(srcPath)) return;
    this._copyFolder(srcPath, destPath);
    
    // 删除原文件夹及其内容
    Object.keys(this.sandbox.files).forEach(path => {
      if (path.startsWith(srcPath + '/') || path === srcPath) {
        delete this.sandbox.files[path];
      }
    });
  }

  _guessMimeType(path) {
    const extension = path.split('.').pop().toLowerCase();
    switch (extension) {
      case 'png': return 'image/png';
      case 'jpg': case 'jpeg': return 'image/jpeg';
      case 'gif': return 'image/gif';
      case 'txt': return 'text/plain';
      case 'json': return 'application/json';
      default: return 'application/octet-stream';
    }
  }

  _setVariable(name, value) {
    // 实现将值存储到Scratch变量的逻辑
    // 具体实现取决于您的Scratch环境
    console.log(`设置变量 ${name} = ${value}`);
  }
}

// 注册扩展

Scratch.extensions.register(new PythonTerminalWithAdvancedFileManager());
