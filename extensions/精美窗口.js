(function(Scratch) {
  'use strict';
  
  const ExtensionName = '精美窗口';
  
  class WindowManager {
    constructor() {
      this.windows = new Map();
      this.nextId = 1;
      this.zIndexCounter = 10000;
      this.container = null;
      this.windowGroups = new Map();
      this.windowTemplates = new Map();
      this.savedStates = new Map();
      this.initContainer();
      
      // 监听全屏变化
      this.setupFullscreenListener();
    }
    
    initContainer() {
      // 移除可能已存在的容器
      const oldContainer = document.getElementById('beautiful-windows-container');
      if (oldContainer) {
        oldContainer.remove();
      }
      
      // 创建新的容器
      this.container = document.createElement('div');
      this.container.id = 'beautiful-windows-container';
      this.container.style.position = 'fixed';
      this.container.style.top = '0';
      this.container.style.left = '0';
      this.container.style.width = '100%';
      this.container.style.height = '100%';
      this.container.style.pointerEvents = 'none';
      this.container.style.zIndex = '9999';
      this.container.style.overflow = 'visible';
      
      // 添加到body
      document.body.appendChild(this.container);
    }
    
    setupFullscreenListener() {
      // 监听全屏变化事件
      document.addEventListener('fullscreenchange', () => {
        this.handleFullscreenChange();
      });
      
      document.addEventListener('webkitfullscreenchange', () => {
        this.handleFullscreenChange();
      });
      
      document.addEventListener('mozfullscreenchange', () => {
        this.handleFullscreenChange();
      });
      
      document.addEventListener('MSFullscreenChange', () => {
        this.handleFullscreenChange();
      });
    }
    
    handleFullscreenChange() {
      // 全屏状态变化时重新定位容器
      setTimeout(() => {
        this.repositionWindows();
      }, 100);
    }
    
    repositionWindows() {
      // 重新定位所有窗口
      this.windows.forEach((windowData, id) => {
        const rect = windowData.element.getBoundingClientRect();
        const x = parseInt(windowData.element.style.left) || 0;
        const y = parseInt(windowData.element.style.top) || 0;
        
        // 确保窗口在可视区域内
        this.ensureWindowInViewport(id, x, y);
      });
    }
    
    ensureWindowInViewport(id, x, y) {
      const windowData = this.windows.get(id);
      if (!windowData) return;
      
      const element = windowData.element;
      const width = parseInt(element.style.width);
      const height = parseInt(element.style.height);
      
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      // 确保窗口不会超出视口
      let newX = Math.max(0, Math.min(viewportWidth - width, x));
      let newY = Math.max(0, Math.min(viewportHeight - height, y));
      
      element.style.left = `${newX}px`;
      element.style.top = `${newY}px`;
    }
    
    createWindow(title, width, height) {
      // 如果所有窗口都被删除，重置ID计数器
      if (this.windows.size === 0) {
        this.nextId = 1;
      }
      
      const id = `beautiful-window-${this.nextId++}`;
      const zIndex = this.zIndexCounter++;
      
      const windowElement = document.createElement('div');
      windowElement.id = id;
      windowElement.className = 'beautiful-window';
      windowElement.style.position = 'fixed';
      windowElement.style.width = `${width}px`;
      windowElement.style.height = `${height}px`;
      windowElement.style.backgroundColor = 'white';
      windowElement.style.border = '2px solid #4a86e8';
      windowElement.style.borderRadius = '8px';
      windowElement.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
      windowElement.style.overflow = 'hidden';
      windowElement.style.pointerEvents = 'auto';
      windowElement.style.transition = 'all 0.3s ease';
      windowElement.style.zIndex = zIndex;
      
      // 标题栏
      const titleBar = document.createElement('div');
      titleBar.className = 'window-title-bar';
      titleBar.style.backgroundColor = '#4a86e8';
      titleBar.style.color = 'white';
      titleBar.style.padding = '8px';
      titleBar.style.cursor = 'move';
      titleBar.style.display = 'flex';
      titleBar.style.justifyContent = 'space-between';
      titleBar.style.alignItems = 'center';
      titleBar.style.userSelect = 'none';
      
      const titleText = document.createElement('span');
      titleText.textContent = title;
      titleText.style.fontWeight = 'bold';
      
      // 按钮容器
      const buttonContainer = document.createElement('div');
      buttonContainer.style.display = 'flex';
      buttonContainer.style.gap = '5px';
      
      // 最小化按钮
      const minimizeBtn = document.createElement('button');
      minimizeBtn.textContent = '_';
      minimizeBtn.style.background = 'none';
      minimizeBtn.style.border = 'none';
      minimizeBtn.style.color = 'white';
      minimizeBtn.style.cursor = 'pointer';
      minimizeBtn.style.fontSize = '16px';
      minimizeBtn.style.padding = '0';
      minimizeBtn.style.width = '20px';
      minimizeBtn.style.height = '20px';
      minimizeBtn.onclick = (e) => {
        e.stopPropagation();
        this.minimizeWindow(id);
      };
      
      // 最大化/恢复按钮
      const maximizeBtn = document.createElement('button');
      maximizeBtn.textContent = '□';
      maximizeBtn.style.background = 'none';
      maximizeBtn.style.border = 'none';
      maximizeBtn.style.color = 'white';
      maximizeBtn.style.cursor = 'pointer';
      maximizeBtn.style.fontSize = '14px';
      maximizeBtn.style.padding = '0';
      maximizeBtn.style.width = '20px';
      maximizeBtn.style.height = '20px';
      maximizeBtn.onclick = (e) => {
        e.stopPropagation();
        this.toggleMaximizeWindow(id);
      };
      
      // 关闭按钮
      const closeBtn = document.createElement('button');
      closeBtn.textContent = '×';
      closeBtn.style.background = 'none';
      closeBtn.style.border = 'none';
      closeBtn.style.color = 'white';
      closeBtn.style.cursor = 'pointer';
      closeBtn.style.fontSize = '18px';
      closeBtn.style.padding = '0';
      closeBtn.style.width = '20px';
      closeBtn.style.height = '20px';
      closeBtn.onclick = (e) => {
        e.stopPropagation();
        this.closeWindow(id);
      };
      
      buttonContainer.appendChild(minimizeBtn);
      buttonContainer.appendChild(maximizeBtn);
      buttonContainer.appendChild(closeBtn);
      
      titleBar.appendChild(titleText);
      titleBar.appendChild(buttonContainer);
      
      // 内容区域
      const content = document.createElement('div');
      content.className = 'window-content';
      content.style.padding = '12px';
      content.style.height = `calc(100% - 40px)`;
      content.style.overflow = 'auto';
      content.style.color = '#000000'; // 默认黑色
      
      windowElement.appendChild(titleBar);
      windowElement.appendChild(content);
      
      // 添加到容器
      this.container.appendChild(windowElement);
      
      // 居中显示
      this.centerWindow(id);
      
      // 存储窗口引用
      this.windows.set(id, {
        element: windowElement,
        titleBar: titleBar,
        content: content,
        isDragging: false,
        dragOffset: { x: 0, y: 0 },
        contentColor: '#000000', // 默认黑色
        isMinimized: false,
        isMaximized: false,
        originalSize: { width, height },
        originalPosition: { x: 0, y: 0 },
        cursorStyle: 'default',
        group: null
      });
      
      // 添加拖动功能
      this.setupDragging(id);
      
      return id;
    }
    
    setupDragging(id) {
      const windowData = this.windows.get(id);
      if (!windowData) return;
      
      const { titleBar, element } = windowData;
      
      const onMouseMove = (e) => {
        if (!windowData.isDragging) return;
        
        const x = e.clientX - windowData.dragOffset.x;
        const y = e.clientY - windowData.dragOffset.y;
        
        // 限制窗口在视口范围内
        this.ensureWindowInViewport(id, x, y);
      };
      
      const onMouseUp = () => {
        windowData.isDragging = false;
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        element.style.cursor = windowData.cursorStyle || 'default';
        titleBar.style.cursor = 'move';
      };
      
      titleBar.onmousedown = (e) => {
        // 确保窗口在最前面
        this.bringToFront(id);
        
        windowData.isDragging = true;
        const rect = element.getBoundingClientRect();
        windowData.dragOffset = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        };
        
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        
        element.style.cursor = 'move';
        e.preventDefault();
      };
    }
    
    centerWindow(id) {
      const windowData = this.windows.get(id);
      if (!windowData) return;
      
      const element = windowData.element;
      const width = parseInt(element.style.width);
      const height = parseInt(element.style.height);
      
      const left = (window.innerWidth - width) / 2;
      const top = (window.innerHeight - height) / 2;
      
      element.style.left = `${left}px`;
      element.style.top = `${top}px`;
      
      // 保存原始位置
      windowData.originalPosition = { x: left, y: top };
    }
    
    closeWindow(id) {
      const windowData = this.windows.get(id);
      if (windowData) {
        windowData.element.remove();
        this.windows.delete(id);
        
        // 如果所有窗口都被删除，重置ID计数器
        if (this.windows.size === 0) {
          this.nextId = 1;
        }
      }
    }
    
    minimizeWindow(id) {
      const windowData = this.windows.get(id);
      if (!windowData || windowData.isMinimized) return;
      
      // 保存当前状态
      windowData.originalSize = {
        width: parseInt(windowData.element.style.width),
        height: parseInt(windowData.element.style.height)
      };
      windowData.originalPosition = {
        x: parseInt(windowData.element.style.left),
        y: parseInt(windowData.element.style.top)
      };
      
      // 最小化窗口
      windowData.element.style.height = '40px'; // 只保留标题栏
      windowData.content.style.display = 'none';
      windowData.isMinimized = true;
      
      // 移动到屏幕底部
      const viewportHeight = window.innerHeight;
      windowData.element.style.top = `${viewportHeight - 40}px`;
    }
    
    restoreWindow(id) {
      const windowData = this.windows.get(id);
      if (!windowData || !windowData.isMinimized) return;
      
      // 恢复窗口
      windowData.element.style.width = `${windowData.originalSize.width}px`;
      windowData.element.style.height = `${windowData.originalSize.height}px`;
      windowData.content.style.display = 'block';
      windowData.element.style.left = `${windowData.originalPosition.x}px`;
      windowData.element.style.top = `${windowData.originalPosition.y}px`;
      windowData.isMinimized = false;
    }
    
    maximizeWindow(id) {
      const windowData = this.windows.get(id);
      if (!windowData || windowData.isMaximized) return;
      
      // 保存当前状态
      windowData.originalSize = {
        width: parseInt(windowData.element.style.width),
        height: parseInt(windowData.element.style.height)
      };
      windowData.originalPosition = {
        x: parseInt(windowData.element.style.left),
        y: parseInt(windowData.element.style.top)
      };
      
      // 最大化窗口
      windowData.element.style.width = '100%';
      windowData.element.style.height = '100%';
      windowData.element.style.left = '0';
      windowData.element.style.top = '0';
      windowData.element.style.borderRadius = '0';
      windowData.isMaximized = true;
    }
    
    restoreFromMaximize(id) {
      const windowData = this.windows.get(id);
      if (!windowData || !windowData.isMaximized) return;
      
      // 恢复窗口
      windowData.element.style.width = `${windowData.originalSize.width}px`;
      windowData.element.style.height = `${windowData.originalSize.height}px`;
      windowData.element.style.left = `${windowData.originalPosition.x}px`;
      windowData.element.style.top = `${windowData.originalPosition.y}px`;
      windowData.element.style.borderRadius = '8px';
      windowData.isMaximized = false;
    }
    
    toggleMaximizeWindow(id) {
      const windowData = this.windows.get(id);
      if (!windowData) return;
      
      if (windowData.isMaximized) {
        this.restoreFromMaximize(id);
      } else {
        this.maximizeWindow(id);
      }
    }
    
    setWindowTitle(id, title) {
      const windowData = this.windows.get(id);
      if (windowData) {
        const titleElement = windowData.titleBar.querySelector('span');
        if (titleElement) {
          titleElement.textContent = title;
        }
      }
    }
    
    setWindowContent(id, content) {
      const windowData = this.windows.get(id);
      if (windowData) {
        // 确保内容是字符串
        const contentStr = String(content);
        
        // 清除现有内容
        windowData.content.innerHTML = '';
        
        // 创建文本节点
        const textNode = document.createTextNode(contentStr);
        windowData.content.appendChild(textNode);
      }
    }
    
    setWindowContentColor(id, color) {
      const windowData = this.windows.get(id);
      if (windowData) {
        windowData.content.style.color = color;
        windowData.contentColor = color;
      }
    }
    
    setWindowSize(id, width, height) {
      const windowData = this.windows.get(id);
      if (windowData) {
        windowData.element.style.width = `${width}px`;
        windowData.element.style.height = `${height}px`;
        
        // 调整大小后确保窗口仍在视口内
        const x = parseInt(windowData.element.style.left) || 0;
        const y = parseInt(windowData.element.style.top) || 0;
        this.ensureWindowInViewport(id, x, y);
      }
    }
    
    setWindowPosition(id, x, y) {
      const windowData = this.windows.get(id);
      if (windowData) {
        this.ensureWindowInViewport(id, x, y);
      }
    }
    
    setWindowVisibility(id, visible) {
      const windowData = this.windows.get(id);
      if (windowData) {
        windowData.element.style.display = visible ? 'block' : 'none';
      }
    }
    
    setWindowCursor(id, cursorStyle) {
      const windowData = this.windows.get(id);
      if (windowData) {
        windowData.element.style.cursor = cursorStyle;
        windowData.cursorStyle = cursorStyle;
      }
    }
    
    applyEffect(id, effect, value) {
      const windowData = this.windows.get(id);
      if (!windowData) return;
      
      switch(effect) {
        case '透明度':
          windowData.element.style.opacity = Math.max(0, Math.min(1, value / 100));
          break;
        case '模糊':
          windowData.element.style.backdropFilter = `blur(${value}px)`;
          windowData.element.style.webkitBackdropFilter = `blur(${value}px)`;
          break;
        case '阴影':
          windowData.element.style.boxShadow = `0 0 ${value}px rgba(0,0,0,0.5)`;
          break;
        case '圆角':
          windowData.element.style.borderRadius = `${value}px`;
          break;
        case '旋转':
          windowData.element.style.transform = `rotate(${value}deg)`;
          break;
        case '缩放':
          windowData.element.style.transform = `scale(${value / 100})`;
          break;
      }
    }
    
    setBackgroundColor(id, color) {
      const windowData = this.windows.get(id);
      if (windowData) {
        windowData.element.style.backgroundColor = color;
      }
    }
    
    setBorder(id, width, color, style) {
      const windowData = this.windows.get(id);
      if (windowData) {
        windowData.element.style.border = `${width}px ${style} ${color}`;
      }
    }
    
    bringToFront(id) {
      const windowData = this.windows.get(id);
      if (windowData) {
        windowData.element.style.zIndex = this.zIndexCounter++;
      }
    }
    
    sendToBack(id) {
      const windowData = this.windows.get(id);
      if (windowData) {
        // 找到最小的z-index值
        let minZIndex = Infinity;
        this.windows.forEach((data) => {
          const zIndex = parseInt(data.element.style.zIndex);
          if (zIndex < minZIndex) minZIndex = zIndex;
        });
        
        // 设置当前窗口为最小z-index-1
        windowData.element.style.zIndex = (minZIndex - 1).toString();
      }
    }
    
    fadeIn(id, duration) {
      const windowData = this.windows.get(id);
      if (!windowData) return;
      
      return new Promise((resolve) => {
        windowData.element.style.transition = `opacity ${duration}ms ease`;
        windowData.element.style.opacity = '0';
        windowData.element.style.display = 'block';
        
        // 强制重绘
        windowData.element.offsetHeight;
        
        windowData.element.style.opacity = '1';
        
        setTimeout(() => {
          windowData.element.style.transition = '';
          resolve();
        }, duration);
      });
    }
    
    fadeOut(id, duration) {
      const windowData = this.windows.get(id);
      if (!windowData) return;
      
      return new Promise((resolve) => {
        windowData.element.style.transition = `opacity ${duration}ms ease`;
        windowData.element.style.opacity = '1';
        
        // 强制重绘
        windowData.element.offsetHeight;
        
        windowData.element.style.opacity = '0';
        
        setTimeout(() => {
          windowData.element.style.display = 'none';
          windowData.element.style.transition = '';
          resolve();
        }, duration);
      });
    }
    
    shakeWindow(id, intensity, duration) {
      const windowData = this.windows.get(id);
      if (!windowData) return;
      
      return new Promise((resolve) => {
        const originalX = parseInt(windowData.element.style.left) || 0;
        const originalY = parseInt(windowData.element.style.top) || 0;
        const shakes = Math.max(1, Math.floor(duration / 50));
        let count = 0;
        
        const shakeInterval = setInterval(() => {
          if (count >= shakes) {
            clearInterval(shakeInterval);
            windowData.element.style.left = `${originalX}px`;
            windowData.element.style.top = `${originalY}px`;
            resolve();
            return;
          }
          
          const offsetX = (Math.random() - 0.5) * 2 * intensity;
          const offsetY = (Math.random() - 0.5) * 2 * intensity;
          
          windowData.element.style.left = `${originalX + offsetX}px`;
          windowData.element.style.top = `${originalY + offsetY}px`;
          
          count++;
        }, 50);
      });
    }
    
    // 新增功能：创建窗口组
    createGroup(groupName) {
      this.windowGroups.set(groupName, new Set());
      return groupName;
    }
    
    // 新增功能：添加窗口到组
    addWindowToGroup(id, groupName) {
      const windowData = this.windows.get(id);
      const group = this.windowGroups.get(groupName);
      
      if (windowData && group) {
        group.add(id);
        windowData.group = groupName;
      }
    }
    
    // 新增功能：从组中移除窗口
    removeWindowFromGroup(id, groupName) {
      const group = this.windowGroups.get(groupName);
      const windowData = this.windows.get(id);
      
      if (group && windowData) {
        group.delete(id);
        windowData.group = null;
      }
    }
    
    // 新增功能：对组内所有窗口执行操作
    applyToGroup(groupName, operation, value) {
      const group = this.windowGroups.get(groupName);
      if (!group) return;
      
      group.forEach(id => {
        const windowData = this.windows.get(id);
        if (windowData) {
          switch(operation) {
            case '显示':
              this.setWindowVisibility(id, true);
              break;
            case '隐藏':
              this.setWindowVisibility(id, false);
              break;
            case '置顶':
              this.bringToFront(id);
              break;
            case '置底':
              this.sendToBack(id);
              break;
            case '透明度':
              this.applyEffect(id, '透明度', value);
              break;
          }
        }
      });
    }
    
    // 新增功能：保存窗口状态
    saveWindowState(id, stateName) {
      const windowData = this.windows.get(id);
      if (!windowData) return;
      
      const state = {
        position: {
          x: parseInt(windowData.element.style.left),
          y: parseInt(windowData.element.style.top)
        },
        size: {
          width: parseInt(windowData.element.style.width),
          height: parseInt(windowData.element.style.height)
        },
        visibility: windowData.element.style.display !== 'none',
        backgroundColor: windowData.element.style.backgroundColor,
        contentColor: windowData.contentColor,
        opacity: windowData.element.style.opacity,
        borderRadius: windowData.element.style.borderRadius,
        border: windowData.element.style.border
      };
      
      if (!this.savedStates.has(id)) {
        this.savedStates.set(id, new Map());
      }
      
      this.savedStates.get(id).set(stateName, state);
    }
    
    // 新增功能：恢复窗口状态
    restoreWindowState(id, stateName) {
      const windowData = this.windows.get(id);
      const stateMap = this.savedStates.get(id);
      
      if (!windowData || !stateMap) return;
      
      const state = stateMap.get(stateName);
      if (!state) return;
      
      this.setWindowPosition(id, state.position.x, state.position.y);
      this.setWindowSize(id, state.size.width, state.size.height);
      this.setWindowVisibility(id, state.visibility);
      this.setBackgroundColor(id, state.backgroundColor);
      this.setWindowContentColor(id, state.contentColor);
      windowData.element.style.opacity = state.opacity;
      windowData.element.style.borderRadius = state.borderRadius;
      windowData.element.style.border = state.border;
    }
    
    // 新增功能：对齐窗口
    alignWindows(alignment) {
      const allIds = this.getAllWindowIds();
      if (allIds.length === 0) return;
      
      switch(alignment) {
        case '左对齐':
          const minX = Math.min(...allIds.map(id => this.getWindowX(id)));
          allIds.forEach(id => this.setWindowPosition(id, minX, this.getWindowY(id)));
          break;
        case '右对齐':
          const maxX = Math.max(...allIds.map(id => this.getWindowX(id) + this.getWindowWidth(id)));
          allIds.forEach(id => this.setWindowPosition(id, maxX - this.getWindowWidth(id), this.getWindowY(id)));
          break;
        case '顶对齐':
          const minY = Math.min(...allIds.map(id => this.getWindowY(id)));
          allIds.forEach(id => this.setWindowPosition(id, this.getWindowX(id), minY));
          break;
        case '底对齐':
          const maxY = Math.max(...allIds.map(id => this.getWindowY(id) + this.getWindowHeight(id)));
          allIds.forEach(id => this.setWindowPosition(id, this.getWindowX(id), maxY - this.getWindowHeight(id)));
          break;
        case '水平居中':
          const centerX = window.innerWidth / 2;
          allIds.forEach(id => {
            const width = this.getWindowWidth(id);
            this.setWindowPosition(id, centerX - width / 2, this.getWindowY(id));
          });
          break;
        case '垂直居中':
          const centerY = window.innerHeight / 2;
          allIds.forEach(id => {
            const height = this.getWindowHeight(id);
            this.setWindowPosition(id, this.getWindowX(id), centerY - height / 2);
          });
          break;
      }
    }
    
    // 新增功能：保存窗口模板
    saveWindowTemplate(templateName, id) {
      const windowData = this.windows.get(id);
      if (!windowData) return;
      
      const template = {
        title: windowData.titleBar.querySelector('span').textContent,
        width: parseInt(windowData.element.style.width),
        height: parseInt(windowData.element.style.height),
        backgroundColor: windowData.element.style.backgroundColor,
        contentColor: windowData.contentColor,
        border: windowData.element.style.border,
        borderRadius: windowData.element.style.borderRadius
      };
      
      this.windowTemplates.set(templateName, template);
    }
    
    // 新增功能：从模板创建窗口
    createWindowFromTemplate(templateName, title) {
      const template = this.windowTemplates.get(templateName);
      if (!template) return null;
      
      const id = this.createWindow(title || template.title, template.width, template.height);
      this.setBackgroundColor(id, template.backgroundColor);
      this.setWindowContentColor(id, template.contentColor);
      this.setBorder(id, 
        parseInt(template.border) || 2, 
        template.border.split(' ')[2] || '#4a86e8', 
        template.border.split(' ')[1] || 'solid'
      );
      windowData.element.style.borderRadius = template.borderRadius;
      
      return id;
    }
    
    getAllWindowIds() {
      return Array.from(this.windows.keys());
    }
    
    windowExists(id) {
      return this.windows.has(id);
    }
    
    getWindowX(id) {
      const windowData = this.windows.get(id);
      if (!windowData) return 0;
      return parseInt(windowData.element.style.left) || 0;
    }
    
    getWindowY(id) {
      const windowData = this.windows.get(id);
      if (!windowData) return 0;
      return parseInt(windowData.element.style.top) || 0;
    }
    
    getWindowWidth(id) {
      const windowData = this.windows.get(id);
      if (!windowData) return 0;
      return parseInt(windowData.element.style.width) || 0;
    }
    
    getWindowHeight(id) {
      const windowData = this.windows.get(id);
      if (!windowData) return 0;
      return parseInt(windowData.element.style.height) || 0;
    }
    
    getWindowContentColor(id) {
      const windowData = this.windows.get(id);
      if (!windowData) return '#000000';
      return windowData.contentColor;
    }
    
    isWindowMinimized(id) {
      const windowData = this.windows.get(id);
      if (!windowData) return false;
      return windowData.isMinimized;
    }
    
    isWindowMaximized(id) {
      const windowData = this.windows.get(id);
      if (!windowData) return false;
      return windowData.isMaximized;
    }
    
    getWindowGroup(id) {
      const windowData = this.windows.get(id);
      if (!windowData) return '';
      return windowData.group || '';
    }
  }
  
  let windowManager;
  
  class BeautifulWindowExtension {
    constructor() {
      if (!windowManager) {
        windowManager = new WindowManager();
      }
    }
    
    getInfo() {
      return {
        id: 'beautifulWindow',
        name: ExtensionName,
        color1: '#4a86e8',
        color2: '#3a76d8',
        blocks: [
          {
            opcode: 'createWindow',
            blockType: Scratch.BlockType.COMMAND,
            text: '创建窗口 标题 [title] 宽度 [width] 高度 [height]',
            arguments: {
              title: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '我的窗口'
              },
              width: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 300
              },
              height: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 200
              }
            }
          },
          {
            opcode: 'setWindowTitle',
            blockType: Scratch.BlockType.COMMAND,
            text: '设置窗口 [id] 标题为 [title]',
            arguments: {
              id: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'beautiful-window-1'
              },
              title: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '新标题'
              }
            }
          },
          {
            opcode: 'setWindowContent',
            blockType: Scratch.BlockType.COMMAND,
            text: '设置窗口 [id] 内容为 [content]',
            arguments: {
              id: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'beautiful-window-1'
              },
              content: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Hello World!'
              }
            }
          },
          {
            opcode: 'setWindowContentColor',
            blockType: Scratch.BlockType.COMMAND,
            text: '设置窗口 [id] 内容颜色为 [color]',
            arguments: {
              id: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'beautiful-window-1'
              },
              color: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: '#ff0000'
              }
            }
          },
          {
            opcode: 'setWindowSize',
            blockType: Scratch.BlockType.COMMAND,
            text: '设置窗口 [id] 大小为 宽度 [width] 高度 [height]',
            arguments: {
              id: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'beautiful-window-1'
              },
              width: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 400
              },
              height: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 300
              }
            }
          },
          {
            opcode: 'setWindowPosition',
            blockType: Scratch.BlockType.COMMAND,
            text: '设置窗口 [id] 位置为 X [x] Y [y]',
            arguments: {
              id: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'beautiful-window-1'
              },
              x: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100
              },
              y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100
              }
            }
          },
          {
            opcode: 'centerWindow',
            blockType: Scratch.BlockType.COMMAND,
            text: '居中窗口 [id]',
            arguments: {
              id: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'beautiful-window-1'
              }
            }
          },
          {
            opcode: 'showWindow',
            blockType: Scratch.BlockType.COMMAND,
            text: '显示窗口 [id]',
            arguments: {
              id: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'beautiful-window-1'
              }
            }
          },
          {
            opcode: 'hideWindow',
            blockType: Scratch.BlockType.COMMAND,
            text: '隐藏窗口 [id]',
            arguments: {
              id: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'beautiful-window-1'
              }
            }
          },
          {
            opcode: 'closeWindow',
            blockType: Scratch.BlockType.COMMAND,
            text: '关闭窗口 [id]',
            arguments: {
              id: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'beautiful-window-1'
              }
            }
          },
          {
            opcode: 'minimizeWindow',
            blockType: Scratch.BlockType.COMMAND,
            text: '最小化窗口 [id]',
            arguments: {
              id: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'beautiful-window-1'
              }
            }
          },
          {
            opcode: 'restoreWindow',
            blockType: Scratch.BlockType.COMMAND,
            text: '恢复窗口 [id]',
            arguments: {
              id: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'beautiful-window-1'
              }
            }
          },
          {
            opcode: 'maximizeWindow',
            blockType: Scratch.BlockType.COMMAND,
            text: '最大化窗口 [id]',
            arguments: {
              id: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'beautiful-window-1'
              }
            }
          },
          {
            opcode: 'toggleMaximizeWindow',
            blockType: Scratch.BlockType.COMMAND,
            text: '切换最大化窗口 [id]',
            arguments: {
              id: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'beautiful-window-1'
              }
            }
          },
          {
            opcode: 'setWindowCursor',
            blockType: Scratch.BlockType.COMMAND,
            text: '设置窗口 [id] 光标样式为 [cursor]',
            arguments: {
              id: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'beautiful-window-1'
              },
              cursor: {
                type: Scratch.ArgumentType.STRING,
                menu: 'cursorStyles'
              }
            }
          },
          {
            opcode: 'applyEffect',
            blockType: Scratch.BlockType.COMMAND,
            text: '对窗口 [id] 应用 [effect] 效果 值 [value]',
            arguments: {
              id: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'beautiful-window-1'
              },
              effect: {
                type: Scratch.ArgumentType.STRING,
                menu: 'effects'
              },
              value: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 50
              }
            }
          },
          {
            opcode: 'setBackgroundColor',
            blockType: Scratch.BlockType.COMMAND,
            text: '设置窗口 [id] 背景颜色为 [color]',
            arguments: {
              id: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'beautiful-window-1'
              },
              color: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: '#ffffff'
              }
            }
          },
          {
            opcode: 'setBorder',
            blockType: Scratch.BlockType.COMMAND,
            text: '设置窗口 [id] 边框为 宽度 [width] 颜色 [color] 样式 [style]',
            arguments: {
              id: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'beautiful-window-1'
              },
              width: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 2
              },
              color: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: '#4a86e8'
              },
              style: {
                type: Scratch.ArgumentType.STRING,
                menu: 'borderStyles'
              }
            }
          },
          {
            opcode: 'bringToFront',
            blockType: Scratch.BlockType.COMMAND,
            text: '将窗口 [id] 置顶',
            arguments: {
              id: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'beautiful-window-1'
              }
            }
          },
          {
            opcode: 'sendToBack',
            blockType: Scratch.BlockType.COMMAND,
            text: '将窗口 [id] 置底',
            arguments: {
              id: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'beautiful-window-1'
              }
            }
          },
          {
            opcode: 'fadeIn',
            blockType: Scratch.BlockType.COMMAND,
            text: '淡入窗口 [id] 持续时间 [duration] 毫秒',
            arguments: {
              id: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'beautiful-window-1'
              },
              duration: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1000
              }
            }
          },
          {
            opcode: 'fadeOut',
            blockType: Scratch.BlockType.COMMAND,
            text: '淡出窗口 [id] 持续时间 [duration] 毫秒',
            arguments: {
              id: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'beautiful-window-1'
              },
              duration: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1000
              }
            }
          },
          {
            opcode: 'shakeWindow',
            blockType: Scratch.BlockType.COMMAND,
            text: '震动窗口 [id] 强度 [intensity] 持续时间 [duration] 毫秒',
            arguments: {
              id: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'beautiful-window-1'
              },
              intensity: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 10
              },
              duration: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 500
              }
            }
          },
          {
            opcode: 'createGroup',
            blockType: Scratch.BlockType.REPORTER,
            text: '创建窗口组 [groupName]',
            arguments: {
              groupName: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '我的窗口组'
              }
            }
          },
          {
            opcode: 'addWindowToGroup',
            blockType: Scratch.BlockType.COMMAND,
            text: '添加窗口 [id] 到组 [groupName]',
            arguments: {
              id: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'beautiful-window-1'
              },
              groupName: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '我的窗口组'
              }
            }
          },
          {
            opcode: 'removeWindowFromGroup',
            blockType: Scratch.BlockType.COMMAND,
            text: '从组 [groupName] 移除窗口 [id]',
            arguments: {
              id: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'beautiful-window-1'
              },
              groupName: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '我的窗口组'
              }
            }
          },
          {
            opcode: 'applyToGroup',
            blockType: Scratch.BlockType.COMMAND,
            text: '对组 [groupName] 执行 [operation] 操作 值 [value]',
            arguments: {
              groupName: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '我的窗口组'
              },
              operation: {
                type: Scratch.ArgumentType.STRING,
                menu: 'groupOperations'
              },
              value: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 50
              }
            }
          },
          {
            opcode: 'saveWindowState',
            blockType: Scratch.BlockType.COMMAND,
            text: '保存窗口 [id] 状态为 [stateName]',
            arguments: {
              id: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'beautiful-window-1'
              },
              stateName: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '状态1'
              }
            }
          },
          {
            opcode: 'restoreWindowState',
            blockType: Scratch.BlockType.COMMAND,
            text: '恢复窗口 [id] 状态 [stateName]',
            arguments: {
              id: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'beautiful-window-1'
              },
              stateName: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '状态1'
              }
            }
          },
          {
            opcode: 'alignWindows',
            blockType: Scratch.BlockType.COMMAND,
            text: '对齐所有窗口 [alignment]',
            arguments: {
              alignment: {
                type: Scratch.ArgumentType.STRING,
                menu: 'alignmentOptions'
              }
            }
          },
          {
            opcode: 'saveWindowTemplate',
            blockType: Scratch.BlockType.COMMAND,
            text: '保存窗口 [id] 为模板 [templateName]',
            arguments: {
              id: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'beautiful-window-1'
              },
              templateName: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '我的模板'
              }
            }
          },
          {
            opcode: 'createWindowFromTemplate',
            blockType: Scratch.BlockType.REPORTER,
            text: '从模板 [templateName] 创建窗口 标题 [title]',
            arguments: {
              templateName: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '我的模板'
              },
              title: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '新窗口'
              }
            }
          },
          {
            opcode: 'getAllWindowIds',
            blockType: Scratch.BlockType.REPORTER,
            text: '获取所有窗口ID',
          },
          {
            opcode: 'windowExists',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '窗口 [id] 存在?',
            arguments: {
              id: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'beautiful-window-1'
              }
            }
          },
          {
            opcode: 'getWindowX',
            blockType: Scratch.BlockType.REPORTER,
            text: '获取窗口 [id] 的X位置',
            arguments: {
              id: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'beautiful-window-1'
              }
            }
          },
          {
            opcode: 'getWindowY',
            blockType: Scratch.BlockType.REPORTER,
            text: '获取窗口 [id] 的Y位置',
            arguments: {
              id: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'beautiful-window-1'
              }
            }
          },
          {
            opcode: 'getWindowWidth',
            blockType: Scratch.BlockType.REPORTER,
            text: '获取窗口 [id] 的宽度',
            arguments: {
              id: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'beautiful-window-1'
              }
            }
          },
          {
            opcode: 'getWindowHeight',
            blockType: Scratch.BlockType.REPORTER,
            text: '获取窗口 [id] 的高度',
            arguments: {
              id: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'beautiful-window-1'
              }
            }
          },
          {
            opcode: 'getWindowContentColor',
            blockType: Scratch.BlockType.REPORTER,
            text: '获取窗口 [id] 的内容颜色',
            arguments: {
              id: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'beautiful-window-1'
              }
            }
          },
          {
            opcode: 'isWindowMinimized',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '窗口 [id] 已最小化?',
            arguments: {
              id: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'beautiful-window-1'
              }
            }
          },
          {
            opcode: 'isWindowMaximized',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '窗口 [id] 已最大化?',
            arguments: {
              id: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'beautiful-window-1'
              }
            }
          },
          {
            opcode: 'getWindowGroup',
            blockType: Scratch.BlockType.REPORTER,
            text: '获取窗口 [id] 的组名',
            arguments: {
              id: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'beautiful-window-1'
              }
            }
          }
        ],
        menus: {
          effects: {
            acceptReporters: true,
            items: ['透明度', '模糊', '阴影', '圆角', '旋转', '缩放']
          },
          borderStyles: {
            acceptReporters: true,
            items: ['solid', 'dashed', 'dotted', 'double', 'groove', 'ridge']
          },
          cursorStyles: {
            acceptReporters: true,
            items: ['default', 'pointer', 'move', 'text', 'wait', 'help', 'crosshair', 'not-allowed', 'grab']
          },
          groupOperations: {
            acceptReporters: true,
            items: ['显示', '隐藏', '置顶', '置底', '透明度']
          },
          alignmentOptions: {
            acceptReporters: true,
            items: ['左对齐', '右对齐', '顶对齐', '底对齐', '水平居中', '垂直居中']
          }
        }
      };
    }
    
    createWindow(args) {
      windowManager.createWindow(args.title, args.width, args.height);
    }
    
    setWindowTitle(args) {
      windowManager.setWindowTitle(args.id, args.title);
    }
    
    setWindowContent(args) {
      windowManager.setWindowContent(args.id, args.content);
    }
    
    setWindowContentColor(args) {
      windowManager.setWindowContentColor(args.id, args.color);
    }
    
    setWindowSize(args) {
      windowManager.setWindowSize(args.id, args.width, args.height);
    }
    
    setWindowPosition(args) {
      windowManager.setWindowPosition(args.id, args.x, args.y);
    }
    
    centerWindow(args) {
      windowManager.centerWindow(args.id);
    }
    
    showWindow(args) {
      windowManager.setWindowVisibility(args.id, true);
    }
    
    hideWindow(args) {
      windowManager.setWindowVisibility(args.id, false);
    }
    
    closeWindow(args) {
      windowManager.closeWindow(args.id);
    }
    
    minimizeWindow(args) {
      windowManager.minimizeWindow(args.id);
    }
    
    restoreWindow(args) {
      windowManager.restoreWindow(args.id);
    }
    
    maximizeWindow(args) {
      windowManager.maximizeWindow(args.id);
    }
    
    toggleMaximizeWindow(args) {
      windowManager.toggleMaximizeWindow(args.id);
    }
    
    setWindowCursor(args) {
      windowManager.setWindowCursor(args.id, args.cursor);
    }
    
    applyEffect(args) {
      windowManager.applyEffect(args.id, args.effect, args.value);
    }
    
    setBackgroundColor(args) {
      windowManager.setBackgroundColor(args.id, args.color);
    }
    
    setBorder(args) {
      windowManager.setBorder(args.id, args.width, args.color, args.style);
    }
    
    bringToFront(args) {
      windowManager.bringToFront(args.id);
    }
    
    sendToBack(args) {
      windowManager.sendToBack(args.id);
    }
    
    fadeIn(args) {
      windowManager.fadeIn(args.id, args.duration);
    }
    
    fadeOut(args) {
      windowManager.fadeOut(args.id, args.duration);
    }
    
    shakeWindow(args) {
      windowManager.shakeWindow(args.id, args.intensity, args.duration);
    }
    
    createGroup(args) {
      return windowManager.createGroup(args.groupName);
    }
    
    addWindowToGroup(args) {
      windowManager.addWindowToGroup(args.id, args.groupName);
    }
    
    removeWindowFromGroup(args) {
      windowManager.removeWindowFromGroup(args.id, args.groupName);
    }
    
    applyToGroup(args) {
      windowManager.applyToGroup(args.groupName, args.operation, args.value);
    }
    
    saveWindowState(args) {
      windowManager.saveWindowState(args.id, args.stateName);
    }
    
    restoreWindowState(args) {
      windowManager.restoreWindowState(args.id, args.stateName);
    }
    
    alignWindows(args) {
      windowManager.alignWindows(args.alignment);
    }
    
    saveWindowTemplate(args) {
      windowManager.saveWindowTemplate(args.templateName, args.id);
    }
    
    createWindowFromTemplate(args) {
      return windowManager.createWindowFromTemplate(args.templateName, args.title);
    }
    
    getAllWindowIds() {
      return windowManager.getAllWindowIds().join(',');
    }
    
    windowExists(args) {
      return windowManager.windowExists(args.id);
    }
    
    getWindowX(args) {
      return windowManager.getWindowX(args.id);
    }
    
    getWindowY(args) {
      return windowManager.getWindowY(args.id);
    }
    
    getWindowWidth(args) {
      return windowManager.getWindowWidth(args.id);
    }
    
    getWindowHeight(args) {
      return windowManager.getWindowHeight(args.id);
    }
    
    getWindowContentColor(args) {
      return windowManager.getWindowContentColor(args.id);
    }
    
    isWindowMinimized(args) {
      return windowManager.isWindowMinimized(args.id);
    }
    
    isWindowMaximized(args) {
      return windowManager.isWindowMaximized(args.id);
    }
    
    getWindowGroup(args) {
      return windowManager.getWindowGroup(args.id);
    }
  }
  
  // 注册扩展
  Scratch.extensions.register(new BeautifulWindowExtension());
})(Scratch);