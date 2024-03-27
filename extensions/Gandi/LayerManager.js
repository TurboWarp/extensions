// Name: Layer Management
// ID: layerManager
// Description: Allows you to manage sprite layers.
// By: Arkos <https://scratch.mit.edu/users/lanluzhifeng/>
// By: FurryR <https://scratch.mit.edu/users/FurryR/>
// Original: Gandi IDE
// License: MPL-2.0

(function (Scratch) {
  "use strict";
  /**
   * Made with love by Arkos
   * Original version extracted from Webpack by FurryR
   * Deobfuscated version by Arkos, FurryR, sylarhcn and Gandi IDE internal source database
   * Turbowarp compatibility by FurryR
   * This extension is originally ported from Gandi IDE.
   * This port is licensed by Gandi IDE developers.
   */
  const menuIconURI =
    "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNzA1NDg1NTYzNjQ1IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI0MzgiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iNDgiIGhlaWdodD0iNDgiPjxwYXRoIGQ9Ik0xMTAuOTMzMzMzIDM1MmwzODQgMTkyYzQuMjY2NjY3IDIuMTMzMzMzIDEwLjY2NjY2NyA0LjI2NjY2NyAxNy4wNjY2NjcgNC4yNjY2NjdzMTAuNjY2NjY3LTIuMTMzMzMzIDE3LjA2NjY2Ny00LjI2NjY2N2wzODQtMTkyYzEyLjgtNi40IDE5LjItMTkuMiAxOS4yLTMycy04LjUzMzMzMy0yNS42LTE5LjItMzJsLTM4NC0xOTJjLTEwLjY2NjY2Ny00LjI2NjY2Ny0yMS4zMzMzMzMtNC4yNjY2NjctMzIgMGwtMzg0IDE5MmMtMTIuOCA2LjQtMTkuMiAxOS4yLTE5LjIgMzJzNi40IDI1LjYgMTcuMDY2NjY2IDMyek01MTIgMTY4LjUzMzMzM0w4MTQuOTMzMzMzIDMyMCA1MTIgNDcxLjQ2NjY2NyAyMDkuMDY2NjY3IDMyMCA1MTIgMTY4LjUzMzMzM3pNODc4LjkzMzMzMyA2NzJMNTEyIDg1NS40NjY2NjcgMTQ1LjA2NjY2NyA2NzJjLTE3LjA2NjY2Ny04LjUzMzMzMy0zOC40LTIuMTMzMzMzLTQ5LjA2NjY2NyAxNy4wNjY2NjctOC41MzMzMzMgMTcuMDY2NjY3LTIuMTMzMzMzIDM4LjQgMTcuMDY2NjY3IDQ5LjA2NjY2NmwzODQgMTkyYzQuMjY2NjY3IDIuMTMzMzMzIDEwLjY2NjY2NyA0LjI2NjY2NyAxNy4wNjY2NjYgNC4yNjY2NjdzMTAuNjY2NjY3LTIuMTMzMzMzIDE3LjA2NjY2Ny00LjI2NjY2N2wzODQtMTkyYzE3LjA2NjY2Ny04LjUzMzMzMyAyNS42LTI5Ljg2NjY2NyAxNy4wNjY2NjctNDkuMDY2NjY2LTEyLjgtMTkuMi0zNC4xMzMzMzMtMjUuNi01My4zMzMzMzQtMTcuMDY2NjY3eiIgZmlsbD0iI2RiZGJkYiIgcC1pZD0iMjQzOSI+PC9wYXRoPjxwYXRoIGQ9Ik04NzguOTMzMzMzIDQ4MEw1MTIgNjYzLjQ2NjY2NyAxNDUuMDY2NjY3IDQ4MGMtMTcuMDY2NjY3LTguNTMzMzMzLTM4LjQtMi4xMzMzMzMtNDkuMDY2NjY3IDE3LjA2NjY2Ny04LjUzMzMzMyAxNy4wNjY2NjctMi4xMzMzMzMgMzguNCAxNy4wNjY2NjcgNDkuMDY2NjY2bDM4NCAxOTJjNC4yNjY2NjcgMi4xMzMzMzMgMTAuNjY2NjY3IDQuMjY2NjY3IDE3LjA2NjY2NiA0LjI2NjY2N3MxMC42NjY2NjctMi4xMzMzMzMgMTcuMDY2NjY3LTQuMjY2NjY3bDM4NC0xOTJjMTcuMDY2NjY3LTguNTMzMzMzIDI1LjYtMjkuODY2NjY3IDE3LjA2NjY2Ny00OS4wNjY2NjYtMTIuOC0xOS4yLTM0LjEzMzMzMy0yNS42LTUzLjMzMzMzNC0xNy4wNjY2Njd6IiBmaWxsPSIjZGJkYmRiIiBwLWlkPSIyNDQwIj48L3BhdGg+PC9zdmc+";
  const extensionId = "layerManager";
  const DEFAULT_LAYERS_STRING = "UI,Default,Background";
  const DEFAULT_LAYER = "Default";
  if (Scratch.extensions.unsandboxed === false) {
    throw new Error("Sandboxed mode is not supported.");
  }
  /**
   * 文件夹项：drawableID 或 子文件夹
   * @typedef {number|LayerFolder} folderItem
   */

  /**
   * 图层文件夹，容纳一系列drawableID或子文件夹
   */
  class LayerFolder {
    /**
     * 创建文件夹
     * @param {string} name 文件夹名称
     * @param {Renderer} renderer 传入renderer实例
     * @param {boolean} subFoldersHaveUniqueName 文件夹的子文件夹是否不能重名
     */
    constructor(name, renderer, subFoldersHaveUniqueName = false) {
      // this._layerManager = layerManager;
      this._renderer = renderer;
      /**
       * 文件夹名称
       * @type {string}
       */
      this.name = name;
      /**
       * 文件夹的内容，每一项可以是 drawableID 或 子文件夹
       * @type {Array<folderItem>}
       * @private
       */
      this._items = [];
      // 如果子文件夹不能重名，为子文件夹建立名字的索引
      if (subFoldersHaveUniqueName) {
        this._subFoldersHaveUniqueName = true;
        /**
         * 建立子文件夹的 名字→文件夹 的映射
         * @type {{[folderName: string]: LayerFolder}}
         */
        this.nameToSubFolder = Object.create(null);
      }
      /**
       * 文件夹图层排序值
       * @type {number}
       * @private
       */
      this._layerIndex = 0;
      /**
       * 文件夹内容是否打乱，需要排序
       * @type {boolean}
       * @private
       */
      this._orderDirty = false;
      /**
       * 指向父文件夹
       * @type {LayerFolder}
       */
      this.parent = null;

      LayerFolder.allFolders.add(this);
    }

    /**
     * 记录所有已有的文件夹集合
     * @type {Set<LayerFolder>}
     */
    static allFolders = new Set();
    /**
     * 记录需要排序的文件夹集合
     * @type {Set<LayerFolder>}
     */
    static orderDirtyFolders = new Set();
    /**
     * 是否有文件夹发生了会导致render变化的改变（如发生排序/增删）
     * @type {boolean}
     */
    static visualDirty = false;

    /**
     * 将所有标记为dirty的文件夹进行排序
     * @param {1|-1} sortOrder 排序顺序：1升序/-1降序
     * @param {boolean} forceSortAll 是否强制重新排序所有文件夹（例如更新了排序规则时）
     */
    static sortAllDirtyFolders(sortOrder = 1, forceSortAll = false) {
      if (forceSortAll) {
        // 强制排序所有文件夹
        LayerFolder.allFolders.forEach((folder) => {
          folder.sortIfOrderDirty(sortOrder, false, true);
        });
      } else {
        // 排序所有标记被打乱的文件夹
        LayerFolder.orderDirtyFolders.forEach((folder) => {
          folder.sortIfOrderDirty(sortOrder, false);
        });
      }
      LayerFolder.orderDirtyFolders = new Set();
    }

    get items() {
      return this._items;
    }

    /**
     * 文件夹内容是否打乱，需要排序
     * @returns {boolean} dirty
     */
    get orderDirty() {
      return this._orderDirty;
    }

    /**
     * 标记是否orderDirty（是否需要重新排序）
     * @param {boolean} dirty 是否dirty
     * @param {boolean} removeFromDirtyList 清除dirty标记时，是否移出dirtyList
     */
    setOrderDirty(dirty, removeFromDirtyList = false) {
      if (dirty) {
        // 记录等待排序的folder
        if (!this._orderDirty) {
          LayerFolder.orderDirtyFolders.add(this);
        }
        this._orderDirty = true;
        LayerFolder.visualDirty = true;
      } else {
        this._orderDirty = false;
        if (removeFromDirtyList) {
          LayerFolder.orderDirtyFolders.delete(this);
        }
      }
    }

    /**
     * 文件夹的图层排序值
     * @returns {number} 图层排序值
     */
    get layerIndex() {
      return this._layerIndex;
    }

    /**
     * 更新文件夹的图层排序值（同时标记父文件夹orderDirty）
     * @param {number} idx 排序值
     */
    set layerIndex(idx) {
      if (this._layerIndex !== idx) {
        this._layerIndex = idx;
        // 父文件夹标记为orderDirty
        this.parent.setOrderDirty(true);
      }
    }

    /**
     * 向文件夹加入item（如果item之前属于其他文件夹，先将item移出旧文件夹）
     * @param {folderItem} item 内容（drawableID/文件夹）
     * @param {boolean} deleteEmptyFolder 将item移出旧文件夹后，如果文件夹为空，是否删除
     * @param {boolean} sortImmediately 加入内容后是否立即排序
     */
    // TODO: 完善加入文件夹时立即排序的方式
    add(item, deleteEmptyFolder = false, sortImmediately = false) {
      // 不能把自己加入文件夹
      if (item === this) return;
      // item 的 parent
      const parent =
        item instanceof LayerFolder
          ? item.parent
          : this._renderer.getDrawableLayerFolder(item);
      // item 已在当前文件夹，退出
      if (parent === this) return;
      if (item instanceof LayerFolder && this._subFoldersHaveUniqueName) {
        // 检查是否已有重名文件夹
        // TODO: 文件夹重名处理（目前是直接退出）
        if (this.nameToSubFolder[item.name]) return;
      }
      // 从旧文件夹移除角色
      if (parent) parent.remove(item, deleteEmptyFolder);

      // 更新父文件夹
      if (item instanceof LayerFolder) {
        item.parent = this;
        LayerFolder.allFolders.add(item);
        // 记录 文件夹名 → 文件夹
        if (this._subFoldersHaveUniqueName)
          this.nameToSubFolder[item.name] = item;
      } else {
        this._renderer.setDrawableLayerFolder(item, this);
      }
      // 加入当前文件夹
      this._items.push(item);
      LayerFolder.visualDirty = true;
      this.setOrderDirty(true);
    }

    /**
     * 从文件夹移除内容
     * @param {folderItem} item 内容（drawableID/文件夹）
     * @param {boolean} deleteEmptyFolder 移除内容后，如果文件夹为空，是否删除文件夹
     */
    remove(item, deleteEmptyFolder = false) {
      const index = this._items.indexOf(item);
      if (index !== -1) {
        // 更新item父文件夹
        if (item instanceof LayerFolder) {
          item.parent = null;
          LayerFolder.allFolders.delete(item);
          if (this._subFoldersHaveUniqueName)
            delete this.nameToSubFolder[item.name];
        } else {
          this._renderer.setDrawableLayerFolder(item, null);
        }
        // 将item移出文件夹
        this._items.splice(index, 1);
        LayerFolder.visualDirty = true;
        if (deleteEmptyFolder && this._items.length === 0) {
          // 如果自己为空文件夹，删除自己
          if (this.parent) this.parent.remove(this, true); // 递归删除空文件夹
        }
      }
    }

    /**
     * 修改文件夹中drawable的位置（用于兼容原版的图层操作）
     * @param {folderItem} item 要更改位置的item
     * @param {1|-1} sortOrder 排序顺序：1升序/-1降序
     * @param {number} order 要设置的位置
     * @param {boolean} isRelative 是否是相对位置（如前移/后移x层）
     */
    changeDrawableOrder(item, sortOrder, order, isRelative = false) {
      // 无效的order值
      if (!order && order !== 0) return;
      // 文件夹中至少有两个内容才能改变顺序
      if (this._items.length < 2) return;
      // 将文件夹排序
      this.sortIfOrderDirty(sortOrder, true);
      const myIdx = this._items.indexOf(item);
      // 目标在文件夹内
      if (myIdx !== -1) {
        this._items.splice(myIdx, 1);
        LayerFolder.visualDirty = true;
        // Determine new index.
        let IdxToInsert = order;
        if (isRelative) IdxToInsert += myIdx;

        // 移到开头
        if (IdxToInsert <= 0) {
          const newLayerIdx = this.getLayerIndexForItem(this._items[0]); // - (0.1 * sortOrder)
          this.setLayerIndexForItem(item, newLayerIdx);
          this._items.unshift(item);
        } else if (IdxToInsert > this._items.length - 1) {
          // 移到末尾
          const newLayerIdx = this.getLayerIndexForItem(
            this._items[this._items.length - 1]
          ); // + (0.1 * sortOrder)
          this.setLayerIndexForItem(item, newLayerIdx);
          this._items.push(item);
        } else {
          // 其他情况
          // 更新排序值，取平均值
          const v1 = this.getLayerIndexForItem(this._items[IdxToInsert]);
          const v2 = this.getLayerIndexForItem(this._items[IdxToInsert - 1]);
          const newLayerIdx = (v1 + v2) / 2;
          this.setLayerIndexForItem(item, newLayerIdx);
          // 插入到中间
          this._items.splice(IdxToInsert, 0, item);
        }
      }
    }

    /**
     * get layerIndex of item (drawableID or folder)
     * @param {folderItem} item drawableID or folder
     * @returns {number} layerIndex
     */
    getLayerIndexForItem(item) {
      if (item instanceof LayerFolder) {
        return item.layerIndex;
      }
      return this._renderer.getDrawableLayerIndex(item);
    }

    /**
     * set layerIndex of item (drawableID or folder)
     * @param {folderItem} item drawableID or folder
     * @param {number} value 值
     * @param {boolean} changing 是否是增加
     */
    setLayerIndexForItem(item, value, changing = false) {
      const newValue = changing * this.getLayerIndexForItem(item) + value;
      if (item instanceof LayerFolder) {
        item.layerIndex = newValue;
      } else {
        this._renderer.setDrawableLayerIndex(item, newValue);
      }
    }

    /**
     * 排序文件夹（如果满足 orderDirty = true）
     * @param {1|-1} sortOrder 排序顺序：1升序/-1降序
     * @param {boolean} removeFromDirtyList 排序后，是否移出dirtyList
     * @param {boolean} needSorting 是否强制排序
     */
    sortIfOrderDirty(
      sortOrder = 1,
      removeFromDirtyList = false,
      needSorting = this.orderDirty
    ) {
      if (needSorting) {
        this._items.sort((a, b) => {
          const idx1 = this.getLayerIndexForItem(a);
          const idx2 = this.getLayerIndexForItem(b);
          return sortOrder * (idx1 - idx2);
        });
        LayerFolder.visualDirty = true;
        this.setOrderDirty(false, removeFromDirtyList);
      }
    }

    /**
     * 初始化 separators 的信息
     * @param {Array} separators 要更新的 separator 信息
     * @param {1|-1} sortOrder 排序顺序：1升序/-1降序
     */
    static initSeparator(separators, sortOrder) {
      // 剩余的要更新的sep数量
      separators.restSeps = separators.length;
      for (let i = 0; i < separators.length; i++) {
        const sep = separators[i];
        sep[2] = Infinity; // 初始化分割的列表位置为 Infinity
        sep[3] = true; // sep是否需要读取
        // 如果按排序值分割，且排序值选择了无穷，则不需要重新读取
        if (sep[0] === 0 && sep[1] === Infinity * sortOrder) {
          sep[3] = false;
          separators.restSeps--;
        }
      }
    }

    /**
     * 根据当前项更新 separator 信息
     * @param {Array} separators 要更新的 separator 信息
     * @param {number} i 当前列表位置
     * @param {folderItem} item 当前列表项
     * @param {boolean} root 是否是第一级文件夹
     * @param {1|-1} sortOrder 排序顺序：1升序/-1降序
     * @param {Renderer} renderer renderer实例
     * @param {LayerFolder} folder 当前所在folder
     */
    static checkAndSetSeparator(
      separators,
      i,
      item,
      root,
      sortOrder,
      renderer,
      folder
    ) {
      // 如果所有 separator 读取完毕，直接返回
      if (separators.restSeps === 0) return;
      // 检查每个 separator
      for (let j = 0; j < separators.length; j++) {
        const sep = separators[j];
        // 如果 sep 需要更新
        if (sep[3]) {
          // 判断 sep 类型
          switch (sep[0]) {
            case 0: {
              // 排序值
              // 获取item排序值
              const layerIdx =
                item instanceof LayerFolder
                  ? item.layerIndex
                  : renderer.getDrawableLayerIndex(item);
              // 排序值达到分割临界值，则标记分割点 i
              if (root && sortOrder * (layerIdx - sep[1]) >= 0) {
                sep[2] = i;
                sep[3] = false;
                separators.restSeps--;
              }
              break;
            }
            case 1:
              // 角色ID
              // 找到drawableID，则标记分割点 i
              if (item === sep[1]) {
                sep[2] = i;
                sep[3] = false;
                separators.restSeps--;
              }
              break;
            case 2:
              // 文件夹中的分界
              if (folder === sep[1][1]) {
                // 获取item排序值
                const layerIdx =
                  item instanceof LayerFolder
                    ? item.layerIndex
                    : renderer.getDrawableLayerIndex(item);
                const lastItem = folder.items[folder.items.length - 1];
                // 如果idx超过分界idx
                if (sortOrder * (layerIdx - sep[1][0]) >= 0) {
                  sep[2] = i;
                  sep[3] = false;
                  separators.restSeps--;
                } else if (item === lastItem) {
                  // 未超过分界，但是文件夹中最后一项
                  sep[2] = i + 1;
                  sep[3] = false;
                  separators.restSeps--;
                }
              }
              break;
            default:
          }
        }
      }
    }

    /**
     * 递归地获取当前文件夹（包括子文件夹）的内容，并展平为一个一维列表。
     * 同时更新 separators 信息（比如从哪个idx开始不受雷神shader影响
     * @param {Array<number>} list (选填) 初始列表
     * @param {Array} separators (选填) 要更新的separators信息
     * @param {1|-1} sortOrder 排序顺序：1升序/-1降序
     * @param {boolean} root 是否是第一层文件夹
     * @returns {Array <Array<number>, Array>} [list, separators]
     */
    getItemsAndSeparators(
      list = [],
      separators = null,
      sortOrder = 1,
      root = true
    ) {
      if (root && separators) {
        LayerFolder.initSeparator(separators, sortOrder);
      }
      for (let i = 0; i < this._items.length; i++) {
        const item = this._items[i];
        // 更新separators信息
        if (separators) {
          LayerFolder.checkAndSetSeparator(
            separators,
            list.length,
            item,
            root,
            sortOrder,
            this._renderer,
            this
          );
        }
        // item 是文件夹，递归地将内容加入 list
        if (item instanceof LayerFolder) {
          item.getItemsAndSeparators(list, separators, sortOrder, false);
        } else {
          // item 是 drawableID，加入列表
          list.push(item);
        }
      }
      return [list, separators];
    }
  }
  class LayerManager {
    constructor(renderer) {
      this._renderer = renderer;
      /**
       * 是否启用自动图层排序
       * @type {boolean}
       * @private
       */
      this._layerSortingEnabled = false;

      /**
       * 排序顺序，1升序/-1降序
       * @type {1|-1}
       * @private
       */
      this._order = 1;

      /**
       * 容纳所有内容的根文件夹
       * @type {LayerFolder}
       */
      this.rootFolder = new LayerFolder("__ROOT_FOLDER__", renderer, true);
      /**
       * 创建 drawable时加入的文件夹 (默认rootFolder)
       * @type {LayerFolder}
       */
      this.defaultFolderDrawableAddTo = this.rootFolder;

      /**
       * 缓存上一次排序好的drawList
       * @type {Array<number>}
       */
      this._sortedDrawList = [];

      /**
       * 保存drawList的分隔信息（用于shader的分层渲染）
       * - 每一项为 [type, value, listIdx]，标记一个shader的分界点
       *   - [0] - type - 0(值分割)|1(角色分割)|2(文件夹分割)
       *   - [1] - value = layerIdx|drawID|[layerIdx, folder] - 分割的排序值|分割角色ID|[分割的排序值, 所属folder]
       *   - [2] - listIdx - 根据[0]、[1]计算的分割位置在列表中的位置
       * @type {[[0|1|2, number|number|string, number]]}
       */
      this.shaderSeparators = [[0, Infinity, Infinity]];
    }

    /**
     * 是否启用图层排序
     * @type {boolean}
     */
    get layerSortingEnabled() {
      return this._layerSortingEnabled;
    }

    /**
     * 设置不受shader影响的最小的layerIdx|角色ID|文件夹名称
     * @param {0|1|2} type 0(值分割)|1(角色分割)|2(文件夹分割)
     * @param {number|string} sepValue 分割的layer排序值|分割角色ID|分割文件夹名称
     */
    setMinUnshadedInfo(type, sepValue) {
      const sep = this.shaderSeparators[0];
      if (sep[0] !== type || sep[1] !== sepValue) {
        sep[0] = type;
        sep[1] = sepValue;
        LayerFolder.visualDirty = true;
        this.separatorChanged = true;
      }
    }

    /**
     * @returns {boolean} 是否需要重新图层排序
     */
    get needResort() {
      return this.layerSortingEnabled && LayerFolder.visualDirty;
    }

    /**
     * 将 drawList 中 sprite 图层进行排序并返回
     * @param {Array<number>} drawList 当前要绘制的drawableID的列表
     * @param {number} startIdx spriteLayer的开始索引
     * @param {number} endIdx spriteLayer的结束索引
     * @returns {Array<number>} 排序后的 drawList
     */
    getSortedDrawListAndUpdateSeparators(drawList, startIdx, endIdx) {
      // 将所有dirty文件夹进行排序
      if (this._layerSortingEnabled)
        LayerFolder.sortAllDirtyFolders(this._order);
      // 发生了排序/角色增减等图层变动
      if (LayerFolder.visualDirty) {
        // 获取排序后的内容
        const newList = [];
        // 将之前的元素直接加入数组
        for (let i = 0; i < startIdx; i++) newList.push(drawList[i]);
        this.rootFolder.getItemsAndSeparators(
          newList,
          this.shaderSeparators,
          this._order
        );
        // 将之后的元素直接加入数组
        for (let i = endIdx; i < drawList.length; i++)
          newList.push(drawList[i]);
        this._sortedDrawList = newList;
        // 发生了图层变动，将 renderer的dirty设为true
        this._renderer.dirty = true;
        LayerFolder.visualDirty = false;
      }
      return this._sortedDrawList;
    }

    /**
     * 开/关图层排序功能
     * @param {boolean} on 是否开启true/false
     */
    enableLayerSorting(on) {
      if (on) {
        this._layerSortingEnabled = true;
      } else {
        this._layerSortingEnabled = false;
      }
    }

    /**
     * 设置排序规则（升序/降序）
     * @param {boolean} ascending 是否升序
     */
    setSortInAscendingOrder(ascending) {
      const oldOrder = this._order;
      this._order = ascending ? 1 : -1;
      // 排序规则变化
      if (oldOrder * this._order < 0) {
        // 强制重新排序所有文件夹
        LayerFolder.sortAllDirtyFolders(this._order, true);
        // 反转 sep 的切割位置
        this.shaderSeparators.forEach((sep) => {
          // 反转
          if (sep[0] === 0) sep[1] *= -1;
          else if (sep[0] === 2) sep[1][0] *= -1;
        });
      }
    }

    get order() {
      return this._order;
    }

    /**
     * 创建一个folder挂在parentFolder上
     * @param {string} name folder名
     * @param {LayerFolder} parentFolder 所属父folder
     * @returns {LayerFolder} 创建的文件夹
     */
    createLayerFolder(name, parentFolder = this.rootFolder) {
      if (!parentFolder) return null;
      if (parentFolder._subFoldersHaveUniqueName) {
        const existingFolder = parentFolder.nameToSubFolder[name];
        if (existingFolder) {
          // log.warn
          console.warn(
            `Subfolder with name ${name} already exists in the parent folder.`
          );
          return existingFolder;
        }
      }
      const newFolder = new LayerFolder(name, this._renderer);
      parentFolder.add(newFolder);
      return newFolder;
    }

    /**
     * 刷新separators信息。目前仅用于未开启图层排序时
     * @param {Array<number>} drawList drawList
     */
    refreshShaderSeparators(drawList) {
      if (this._renderer.dirty || this.separatorChanged) {
        LayerFolder.initSeparator(this.shaderSeparators, this._order);
        for (
          let i = 0;
          i < drawList.length && this.shaderSeparators.restSeps > 0;
          i++
        ) {
          LayerFolder.checkAndSetSeparator(
            this.shaderSeparators,
            i,
            drawList[i],
            true,
            this._order,
            this._renderer,
            this.rootFolder
          );
        }
        this.separatorChanged = false;
      }
    }

    // /**
    //  * 根据名称，获得rootFolder的子文件夹
    //  * @param {string} name folder名
    //  * @returns {LayerFolder} 文件夹
    //  */
    // getLayerFolderByName (name) {
    //     return this.rootFolder.nameToSubFolder[name];
    //     // const items = this.rootFolder.items;
    //     // return items.find(item => item instanceof LayerFolder && item.name === name);
    // }

    // /**
    //  * 获得rootFolder的所有子文件夹的名字列表（可用于扩展下拉菜单）
    //  * @returns {Array<string>} 文件夹名字列表
    //  */
    // getAllFoldersNamesInRoot () {
    //     return Object.keys(this.rootFolder.nameToSubFolder);
    //     // const items = this.rootFolder.items;
    //     // return items.filter(item => item instanceof LayerFolder).map(item => item.name);
    // }
  }
  const vm = Scratch.vm;
  if (!vm.renderer.layerManager) {
    const _setDrawableOrder = vm.renderer.setDrawableOrder;
    /**
     * Set a drawable's order in the drawable list (effectively, z/layer).
     * Can be used to move drawables to absolute positions in the list,
     * or relative to their current positions.
     * "go back N layers": setDrawableOrder(id, -N, true, 1); (assuming stage at 0).
     * "go to back": setDrawableOrder(id, 1); (assuming stage at 0).
     * "go to front": setDrawableOrder(id, Infinity);
     * @param {int} drawableID ID of Drawable to reorder.
     * @param {number} order New absolute order or relative order adjusment.
     * @param {string=} group Name of layer group drawable belongs to.
     * Reordering will not take place if drawable cannot be found within the bounds
     * of the layer group.
     * @param {boolean=} optIsRelative If set, `order` refers to a relative change.
     * @param {number=} optMin If set, order constrained to be at least `optMin`.
     * @return {?number} New order if changed, or null.
     */
    vm.renderer.setDrawableOrder = function (
      drawableID,
      order,
      group,
      optIsRelative,
      optMin
    ) {
      // NOTE: Modified by FurryR
      if (
        group &&
        Object.prototype.hasOwnProperty.call(this._layerGroups, group) &&
        this.layerManager.layerSortingEnabled &&
        group === "sprite"
      ) {
        this.dirty = true;
        // 如果开启了图层管理器且是sprite层，则改变folder内顺序
        const folder = this.getDrawableLayerFolder(drawableID);
        // 只在文件夹内部移动
        if (folder) {
          const ascending = this.layerManager.order;
          folder.changeDrawableOrder(
            drawableID,
            ascending,
            order,
            optIsRelative
          );
        }
      } else {
        // 未开启图层管理器，使用原版的做法
        return _setDrawableOrder.call(
          this,
          drawableID,
          order,
          group,
          optIsRelative,
          optMin
        );
      }
      return null;
    };
    if (!vm.renderer.getDrawableLayerIndex) {
      // 读 drawable 的图层排序值
      vm.renderer.getDrawableLayerIndex = function (drawableID) {
        const drawable = this._allDrawables[drawableID];
        return drawable._layerIndex;
      };
    }
    if (!vm.renderer.setDrawableLayerIndex) {
      // 更新 drawable 的图层排序值
      vm.renderer.setDrawableLayerIndex = function (drawableID, idx) {
        const drawable = this._allDrawables[drawableID];
        if (drawable._layerIndex !== idx) {
          drawable._layerIndex = idx;
          // 标记所属的图层文件夹为dirty（需要排序）
          if (drawable._layerFolder) drawable._layerFolder.setOrderDirty(true);
        }
      };
    }
    if (!vm.renderer.getDrawableLayerFolder) {
      vm.renderer.getDrawableLayerFolder = function (drawableID) {
        const drawable = this._allDrawables[drawableID];
        return drawable._layerFolder;
      };
    }
    if (!vm.renderer.setDrawableLayerFolder) {
      vm.renderer.setDrawableLayerFolder = function (drawableID, folder) {
        const drawable = this._allDrawables[drawableID];
        drawable._layerFolder = folder;
      };
    }
    vm.renderer.layerManager = new LayerManager(vm.renderer);
    const draw = vm.renderer.draw;
    vm.renderer.draw = function () {
      if (this.layerManager.needResort) {
        this.dirty = true;
        if (this.layerManager.layerSortingEnabled) {
          var e = this._layerGroups.sprite;
          if (e) {
            var t = Math.max(e.drawListOffset, 1),
              n = this._endIndexForKnownLayerGroup(e);
            this._drawList =
              this.layerManager.getSortedDrawListAndUpdateSeparators(
                this._drawList,
                t,
                n
              );
          }
        } else this.layerManager.refreshShaderSeparators(this._drawList);
      }
      return draw.call(this);
    };

    // NOTE: Modified by FurryR
    for (const target of vm.runtime.targets) {
      if (typeof target.drawableID === "number" && !target.isStage) {
        const drawable = vm.renderer._allDrawables[target.drawableID];
        // // gandi: use for layer management
        drawable._layerIndex = 0;
        // /**
        //  * 所属图层文件夹
        //  * @type {LayerFolder}
        //  */
        drawable._layerFolder = null;
        vm.renderer.layerManager.defaultFolderDrawableAddTo.add(
          target.drawableID
        );
      }
    }
    const _dispose = vm.renderer.exports.Drawable.prototype.dispose;
    vm.renderer.exports.Drawable.prototype.dispose = function () {
      _dispose.call(this);
      // 从所属folder移除
      if (this._layerFolder) {
        this._layerFolder.remove(this._id);
      }
    };
    const _createDrawable = vm.renderer.createDrawable;
    /**
     * Create a new Drawable and add it to the scene.
     * @param {string} group Layer group to add the drawable to
     * @returns {int} The ID of the new Drawable.
     */
    vm.renderer.createDrawable = function (group) {
      const res = _createDrawable.call(this, group);
      if (typeof res === "number") {
        const drawable = this._allDrawables[res];
        // gandi: use for layer management
        if (typeof drawable._layerIndex === "undefined")
          drawable._layerIndex = 0;
        /**
         * 所属图层文件夹
         * @type {LayerFolder}
         */
        if (typeof drawable._layerFolder === "undefined")
          drawable._layerFolder = null;
        // 如果是sprite，记录到layerManger的defaultFolder
        if (group === "sprite") {
          this.layerManager.defaultFolderDrawableAddTo.add(res);
        }
      }
      return res;
    };
  }
  class LayerManagerExtension {
    constructor(runtime) {
      // ========================================================================== //
      //     extension initialization
      this.runtime = runtime;
      this.renderer = this.runtime.renderer;
      this.layerManager = this.renderer.layerManager;
      this.rootFolder = this.layerManager.rootFolder;
      this.COMMENT_CONFIG_MAGIC = ' // _layerManagerConfig_';

      // 初始化，劫持函数、生成默认层级
      const intervalId = setInterval(() => {
        if (this.runtime.targets.length > 0) {
          clearInterval(intervalId);
          this.hackScratchFunctions();
          this.__generateLayerLevelsFromList(DEFAULT_LAYERS_STRING.split(","), DEFAULT_LAYER);
          this.parseExtOptions();
          this.runtime.requestToolboxExtensionsUpdate();
        }
      }, 1000);
      // // 项目加载完成
      // runtime.on('PROJECT_LOADED', () => {
      //   this.__defineDefaultLevels();
      // });

      // // 运行项目前，初始化图层文件夹
      // runtime.on('PROJECT_START', () => {
      //   this.generateLayerFoldersFromSpriteFolders(true);
      // });
    }

    getInfo() {
      this.canvasExtensionDetected = this.runtime._blockInfo.find(
        (ext) => ext.id === "CCWCanvasV2"
      );
      this.quakeExtensionDetected = this.runtime._blockInfo.find(
        (ext) => ext.id === "GandiQuake"
      );
      return {
        id: extensionId,
        name: Scratch.translate({
          id: `${extensionId}.extensionName`,
          default: "Layer Management",
          description: "Gandi Layer Management extension name.",
        }),
        docsURI: Scratch.translate({
          id: `${extensionId}.docsURI`,
          default: "https://getgandi.com/extensions/layers",
          description:
            "The documentation URI for the Layer Management extension.",
        }),
        color1: "#9A4BB3",
        menuIconURI: menuIconURI,
        blockIconURI: menuIconURI,

        // ========================================================================== //
        //     blocks

        blocks: [
          // 开/关图层管理器
          {
            opcode: "setLayerManager",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate({
              id: `${extensionId}.setLayerManager`,
              default: "[OP] layer sorting",
              description: "Enable or disable the layer manager.",
            }),
            arguments: {
              OP: {
                type: Scratch.ArgumentType.STRING,
                menu: "ON_OR_OFF",
              },
            },
          },
          {
            opcode: "setSortOrder",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate({
              id: `${extensionId}.setSortOrder`,
              default: "set layer sorting order to [ORDER]",
              description: "Set layer sorting order.",
            }),
            arguments: {
              ORDER: {
                type: Scratch.ArgumentType.STRING,
                menu: "SORTING_ORDER",
              },
            },
          },
          // NOTE: Modified by FurryR
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate({
              id: `${extensionId}.div1`,
              default: " Layer Hierarchy",
              description: "Layer Hierachy category.",
            }),
          },
          // 查看当前文件夹结构
          {
            blockType: Scratch.BlockType.BUTTON,
            text: Scratch.translate({
              id: `${extensionId}.checkLayerLevelsButton`,
              default: "Display layer hierarchy",
              description: "Display layer hierarchy.",
            }),
            func: "checkLayerLevelsButton",
          },
          {
            opcode: "defineLayerLevels",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate({
              id: `${extensionId}.defineLayerLevels`,
              default:
                "define layer hierarchy [LEVELS] (above to below), and set [LEVEL] as the default layer",
              description: "Define layer hierarchy.",
            }),
            arguments: {
              LEVELS: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate({
                  id: `${extensionId}.defaultLevels`,
                  default: DEFAULT_LAYERS_STRING,
                  description: "Default hierarchy.",
                }),
              },
              LEVEL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate({
                  id: `${extensionId}.defaultLevel`,
                  default: DEFAULT_LAYER,
                  description: "Default selected hierarchy.",
                }),
              },
            },
          },
          {
            opcode: "moveSpritesInFolderToLevel",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate({
              id: `${extensionId}.moveSpritesInFolderToLevel`,
              default: "move [TYPE] in the folder[FOLDER]to the layer[LEVEL]",
              description: "Move sprites to folder.",
            }),
            arguments: {
              FOLDER: {
                type: Scratch.ArgumentType.STRING,
                menu: "FOLDERS",
              },
              LEVEL: {
                type: Scratch.ArgumentType.STRING,
                menu: "LEVELS",
                // defaultValue: '-'
              },
              TYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: "IF_ONLY_SPRITE",
              },
            },
          },
          // NOTE: Modified by FurryR
          {
            blockType: Scratch.BlockType.LABEL,
            filter: [Scratch.TargetType.SPRITE],
            text: Scratch.translate({
              id: `${extensionId}.div2`,
              default: " Sprite Order in Layer",
              description: "Sprite Order category.",
            }),
          },
          // 设置角色所属文件夹
          {
            opcode: "setTargetLayerLevel",
            blockType: Scratch.BlockType.COMMAND,
            filter: [Scratch.TargetType.SPRITE],
            text: Scratch.translate({
              id: `${extensionId}.setTargetLayerLevel`,
              default: "move [TARGET] to the layer [LEVEL]",
              description: "Move sprites to layer.",
            }),
            arguments: {
              TARGET: {
                type: Scratch.ArgumentType.STRING,
                menu: "SPRITES",
              },
              LEVEL: {
                type: Scratch.ArgumentType.STRING,
                menu: "LEVELS",
                // defaultValue: '-'
              },
            },
          },
          // 设置角色图层优先级
          {
            opcode: "setTargetLayerPriority",
            blockType: Scratch.BlockType.COMMAND,
            filter: [Scratch.TargetType.SPRITE],
            text: Scratch.translate({
              id: `${extensionId}.setTargetLayerPriority`,
              default: "set [TARGET] z-index in layer to[PRIORITY]",
              description: "Set target z-index aka priority in layer.",
            }),
            arguments: {
              TARGET: {
                type: Scratch.ArgumentType.STRING,
                menu: "SPRITES_WITH_MY",
              },
              PRIORITY: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
            },
          },
          // 读取图层信息
          {
            opcode: "getTargetLayerInfo",
            blockType: Scratch.BlockType.REPORTER,
            disableMonitor: true,
            filter: [Scratch.TargetType.SPRITE],
            text: Scratch.translate({
              id: `${extensionId}.getTargetLayerInfo`,
              default: "[TARGET][INFO]",
              description: "Get target layer info.",
            }),
            arguments: {
              TARGET: {
                type: Scratch.ArgumentType.STRING,
                menu: "SPRITES_WITH_MY",
              },
              INFO: {
                type: Scratch.ArgumentType.STRING,
                menu: "LAYER_INFO",
              },
            },
          },
          "---",
          // 设置高级画笔所属文件夹
          {
            opcode: "setCanvasLayerLevel",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate({
              id: `${extensionId}.setCanvasLayerLevel`,
              default: "set [TARGET] canvas's layer to [LEVEL]",
              description: "set canvas layer level (for CCWCanvasV2).",
            }),
            hideFromPalette: !this.canvasExtensionDetected,
            arguments: {
              TARGET: {
                type: Scratch.ArgumentType.STRING,
                menu: "SPRITES_WITH_MY",
              },
              LEVEL: {
                type: Scratch.ArgumentType.STRING,
                menu: "LEVELS",
                // defaultValue: '-'
              },
            },
          },
          // 设置高级画笔图层优先级
          {
            opcode: "setCanvasLayerPriority",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate({
              id: `${extensionId}.setCanvasLayerPriority`,
              default: "set [TARGET] canvas's z-index in layer to[PRIORITY]",
              description:
                "set canvas layer z-index aka priority (for CCWCanvasV2).",
            }),
            hideFromPalette: !this.canvasExtensionDetected,
            arguments: {
              TARGET: {
                type: Scratch.ArgumentType.STRING,
                menu: "SPRITES_WITH_MY",
              },
              PRIORITY: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
            },
          },
          // NOTE: Modified by FurryR
          {
            blockType: Scratch.BlockType.LABEL,
            hideFromPalette: !this.quakeExtensionDetected,
            text: Scratch.translate({
              id: `${extensionId}.div3`,
              default: " Post Effect for Layer (with Quake)",
              description:
                "Post effect for layer with Gandi Quake. Does nothing on Turbowarp.",
            }),
          },
          {
            opcode: "setMinUnshadedLevel",
            blockType: Scratch.BlockType.COMMAND,
            hideFromPalette: !this.quakeExtensionDetected,
            text: Scratch.translate({
              id: `${extensionId}.setMinUnshadedLevel`,
              default: "exclude layer [LEVEL] and above from post effects",
              description: "Exclude layer from post effects (for Gandi Quake).",
            }),
            arguments: {
              LEVEL: {
                type: Scratch.ArgumentType.STRING,
                menu: "LEVELS",
                // defaultValue: "-",
              },
            },
          },
          {
            opcode: "setMinUnshadedIndex",
            blockType: Scratch.BlockType.COMMAND,
            hideFromPalette: !this.quakeExtensionDetected,
            text: Scratch.translate({
              id: `${extensionId}.setMinUnshadedIndex`,
              default:
                "exclude layer with z-index [INDEX] and layers above in hierarchy [LEVEL] from post effects",
              description:
                "Exclude layer by z-index from post effects (for Gandi Quake).",
            }),
            arguments: {
              INDEX: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 5,
              },
              LEVEL: {
                type: Scratch.ArgumentType.STRING,
                menu: "LEVELS",
                // defaultValue: '-'
              },
            },
          },
          {
            opcode: "setMinUnshadedTarget",
            blockType: Scratch.BlockType.COMMAND,
            hideFromPalette: !this.quakeExtensionDetected,

            text: Scratch.translate({
              id: `${extensionId}.setMinUnshadedTarget`,
              default:
                "exclude sprite [TARGET] and layers above from post effects",
              description:
                "Exclude sprite from post effects (for Gandi Quake).",
            }),
            arguments: {
              TARGET: {
                type: Scratch.ArgumentType.STRING,
                menu: "SPRITES",
              },
            },
          },
        ],

        // ========================================================================== //
        //     menus

        menus: {
          IF_ONLY_SPRITE: [
            {
              text: Scratch.translate({
                id: `${extensionId}.spritesAndClones`,
                default: "sprites and clones",
                description: "Sprites and clones.",
              }),
              value: "spriteAndClone",
            },
            {
              text: Scratch.translate({
                id: `${extensionId}.onlySprites`,
                default: "only sprites",
                description: "Only sprites.",
              }),
              value: "sprite",
            },
          ],
          SORTING_ORDER: [
            {
              text: Scratch.translate({
                id: `${extensionId}.descending`,
                default: "descending",
                description: "Descending.",
              }),
              value: "desc",
            },
            {
              text: Scratch.translate({
                id: `${extensionId}.ascending`,
                default: "ascending",
                description: "Ascending.",
              }),
              value: "asc",
            },
          ],
          ON_OR_OFF: [
            {
              text: Scratch.translate({
                id: `${extensionId}.activate`,
                default: "enable",
                description: "Activate.",
              }),
              value: "on",
            },
            {
              text: Scratch.translate({
                id: `${extensionId}.deactivate`,
                default: "disable",
                description: "Deactivate.",
              }),
              value: "off",
            },
          ],
          FOLDERS: {
            acceptReporters: true,
            items: "__getSpriteFolders",
          },
          LEVELS: {
            acceptReporters: true,
            items: "__getLayerLevelsMenu",
          },
          SPRITES: {
            acceptReporters: true,
            items: "__spriteListWithMe",
          },
          SPRITES_WITH_MY: {
            acceptReporters: true,
            items: "__spriteListWithMy",
          },
          FRONT_OR_BEHIND: {
            items: [
              {
                text: Scratch.translate({
                  id: `${extensionId}.inFrontOf`,
                  default: "in front of",
                  description: "Front.",
                }),
                value: "front",
              },
              {
                text: Scratch.translate({
                  id: `${extensionId}.behind`,
                  default: "behind",
                  description: "Behind.",
                }),
                value: "behind",
              },
            ],
          },
          AFFECTABLE: [
            {
              text: Scratch.translate({
                id: `${extensionId}.unaffected`,
                default: "unaffected",
                description: "Unaffected.",
              }),
              value: "no",
            },
            {
              text: Scratch.translate({
                id: `${extensionId}.affected`,
                default: "affected",
                description: "Affected",
              }),
              value: "yes",
            },
          ],
          LAYER_INFO: [
            {
              text: Scratch.translate({
                id: `${extensionId}.level`,
                default: "layer",
                description: "Layer.",
              }),
              value: "level",
            },
            {
              text: Scratch.translate({
                id: `${extensionId}.myPriority`,
                default: "z-index in layer",
                description: "z-index in layer, aka priority.",
              }),
              value: "myPri",
            },
            {
              text: Scratch.translate({
                id: `${extensionId}.myLayer`,
                default: "layer's index",
                description: "The index of the layer.",
              }),
              value: "layer",
            },
          ],
        },
      };
    }
    // NOTE: Modified by FurryR
    checkLayerLevelsButton() {
      const output = this.__printFolderInGandiTerminal(this.rootFolder, true);
      // maybe pop up an alert (or other sth) is better than in console?
      alert(output.join("\n"));
      // ;(this._terminalShowed = 1),
      //   this._terminalShowed
      //     ? (this.runtime.logSystem.show(),
      //       this.runtime.logSystem.clear(),
      //       this.runtime.logSystem.info(
      //         '----------------'.concat(
      //           Scratch.translate({id: `${extensionId}.infoHeader`, default: '[POLYFILL]', description: '[POLYFILL]'}),
      //           '----------------'
      //         )
      //       ),
      //       this.__printFolderInGandiTerminal(e.rootFolder))
      //     : this.runtime.logSystem.hide()
    }

    // ========================================================================== //
    //     save & parse options in stage comment
    //     so that the layer hierarchy can be loaded automatically next time
    //     codes modified from tw runtime

    findOrCreateOptionsComment (createIfNotExist = false) {
      const id = '_layerManagerConfigComment_';
      const target = this.runtime.getTargetForStage();
      const comments = target.comments;
      for (const comment of Object.values(comments)) {
          if (comment.text.includes(this.COMMENT_CONFIG_MAGIC)) {
              return comment;
          }
      }
      // find by id
      if (target.comments[id]) return target.comments[id];
      if (createIfNotExist) {
        target.createComment(id, null, '-', 50, 150, 350, 170, false);
        return target.comments[id];
      }
      return null;
    }
    generateExtOptions () {
      const options = {
        layers: this.__getLayerLevelNames(),
        default: this.layerManager.defaultFolderDrawableAddTo.name
      };
      return options;
    }
    storeExtOptions () {
      const options = this.generateExtOptions();
      // TODO: translate
      const text = `Configuration for layer manager.(can be deleted to remove the stored settings)\n${JSON.stringify(options)}${this.COMMENT_CONFIG_MAGIC}`;
      const existingComment = this.findOrCreateOptionsComment(true);
      existingComment.text = text;
      this.runtime.emitProjectChanged();
    }
    parseExtOptions () {
      const comment = this.findOrCreateOptionsComment();
      if (!comment) return;
      const lineWithMagic = comment.text.split('\n').find(i => i.endsWith(this.COMMENT_CONFIG_MAGIC));
      if (!lineWithMagic) return;
      const jsonText = lineWithMagic.substr(0, lineWithMagic.length - this.COMMENT_CONFIG_MAGIC.length);
      let parsed;
      try {
          parsed = JSON.parse(jsonText);
          if (!parsed || typeof parsed !== 'object') {
              throw new Error('Invalid object');
          }
      } catch (e) {
          console.warn('LayerManger config comment has invalid JSON', e);
          return;
      }

      if (Array.isArray(parsed.layers) && parsed.default) {
          this.__generateLayerLevelsFromList(parsed.layers, Scratch.Cast.toString(parsed.default));
      }
    }

    // ========================================================================== //
    //     dynamic menus

    __getSpriteFolders() {
      const { targets } = this.runtime;
      const rt = new Set();
      targets.forEach((target) => {
        const info = this.getFolderAndSpriteName(target.getName());
        if (!info.isSingleSprite) {
          // find a folder
          rt.add(info.folderName);
        }
      });
      const folders = [];
      folders.push({
        text: Scratch.translate({
          id: `${extensionId}.allSprites`,
          default: "all sprites",
          description: "All sprites.",
        }),
        value: "__all__",
      });
      rt.forEach((folder) => {
        folders.push({
          text: folder,
          value: folder,
        });
      });
      if (folders.length === 0) {
        folders.push({
          text: "-",
          value: "",
        });
      }
      return folders;
    }
    __getLayerLevelNames() {
      return this.rootFolder.items
      .filter((item) => typeof item === "object")
      .map((item) => item.name)
      .reverse();
    }
    __getLayerLevelsMenu() {
      // 读取层级名称
      const levels = this.__getLayerLevelNames();
      // const folders = [];
      if (levels.length === 0) {
        levels.push({
          text: Scratch.translate({
            id: `${extensionId}.levelUndefined`,
            default: "layer hierarchy not defined yet",
            description: "Layer hierarchy not defined yet.",
          }),
          value: "",
        });
      }
      return levels;
    }
    __spriteListWithMy() {
      return this.__spriteListWithMe("", "my");
    }

    /**
     * Get a sprite list
     * @returns Array of sprites in this project
     */
    __spriteListWithMe(_, me = "myself") {
      const sprites = [];
      sprites.push({
        text: Scratch.translate({
          id: `${extensionId}.${me}`,
          default: me,
          description: "Me or myself.",
        }),
        value: "__myself__",
      });
      this.runtime.targets.forEach((item) => {
        if (item.isOriginal && !item.isStage) {
          if (item !== this.runtime._editingTarget) {
            sprites.push({
              text: item.sprite.name,
              value: item.sprite.name,
            });
          }
        }
      });
      if (sprites.length === 0) {
        sprites.push({
          text: "-",
          value: "",
        });
      }
      return sprites;
    }

    // ========================================================================== //
    //     helper functions | utils

    /**
     * （如果之前没有劫持）劫持obj对象的方法
     * @param {object} obj
     * @param {string} funName 方法名
     * @param {Function} newFun 注入的方法(形如(origFun, 其他参数)=>{...})
     */
    tryHackedFunction(obj, funName, newFun) {
      if (!obj[`${extensionId}_origFun`]) {
        // eslint-disable-next-line no-param-reassign
        obj[`${extensionId}_origFun`] = {};
      }
      const origFuns = obj[`${extensionId}_origFun`];
      // 更新extIns
      obj[`${extensionId}_extIns`] = this;
      // 如果没有劫持，则劫持
      if (!origFuns[funName]) {
        origFuns[funName] = true;
        const origFun = obj[funName];
        // 替换原始方法为新方法
        obj[funName] = function (...args) {
          return newFun.call(this, origFun, ...args);
        };
      }
    }

    /**
     * 从角色名提取文件夹名和角色名
     * @param {string} name - 角色名
     * @returns {{isSingleSprite, folderName, spriteName}}
     */
    getFolderAndSpriteName(name) {
      const regex = /^([^/]+)\/\/(.*)$/;
      const result = regex.exec(name);
      if (result) {
        // 切割folder//sprite
        return {
          isSingleSprite: false,
          folderName: result[1],
          spriteName: result[2],
        };
      }
      // 否则是单独的角色，直接返回name
      return {
        isSingleSprite: true,
        spriteName: name,
      };
    }
    hackScratchFunctions() {
      const { layerManager } = this;
      const { renderer } = this;

      // 渲染气泡时，总是将气泡排序值设为所属target之上
      this.tryHackedFunction(
        this.runtime.ext_scratch3_looks,
        "_positionBubble",
        function (orig, target) {
          const bubbleState = this._getBubbleState(target);
          const bubbleDrawableId = bubbleState.drawableId;
          if (bubbleDrawableId) {
            // 气泡加入同folder
            const folder = renderer.getDrawableLayerFolder(target.drawableID);
            folder.add(bubbleDrawableId);
            // 气泡稍高于角色
            const layerIdx =
              renderer.getDrawableLayerIndex(target.drawableID) +
              0.001 * layerManager.order;
            renderer.setDrawableLayerIndex(bubbleDrawableId, layerIdx);
          }
          orig.call(this, target);
        }
      );

      // hack 时确保runtime至少有一个target（舞台）
      const targetProto = Object.getPrototypeOf(this.runtime.targets[0]);

      // 劫持 makeClone
      this.tryHackedFunction(targetProto, "makeClone", function (orig) {
        // 创建克隆体
        const clone = orig.call(this);
        if (clone) {
          // 获取本体/克隆体ID
          const origID = this.drawableID;
          const cloneID = clone.drawableID;
          // 克隆体ID加入本体同文件夹
          const folder = renderer.getDrawableLayerFolder(origID);
          folder.add(cloneID);
          // 克隆体的图层稍低于本体
          const layerIdx =
            renderer.getDrawableLayerIndex(origID) - 0.01 * layerManager.order;
          renderer.setDrawableLayerIndex(cloneID, layerIdx);
        }
        return clone;
      });

      // 劫持 goBehindOther，使其不影响 layerIndex （避免克隆后改变本体顺序）
      this.tryHackedFunction(
        targetProto,
        "goBehindOther",
        function (orig, other) {
          const oldIdx = renderer.getDrawableLayerIndex(this.drawableID);
          const otherOldIdx = renderer.getDrawableLayerIndex(other.drawableID);
          orig.call(this, other);
          // 复原 layerIdx
          renderer.setDrawableLayerIndex(this.drawableID, oldIdx);
          renderer.setDrawableLayerIndex(other.drawableID, otherOldIdx);
        }
      );
    }
    __printFolderInGandiTerminal(
      folder,
      printTitle = false,
      pref = "",
      pref2 = "",
      output = []
    ) {
      const logSys = console; // this.runtime.logSystem
      const getRound = (num) => parseFloat(num.toFixed(2));
      const zIndex = (num) => `(${getRound(num)})`;
      const print = (info) => {
        logSys.log(info);
        output.push(info);
      };
      if (printTitle) {
        print(
          Scratch.translate({
            id: `${extensionId}.infoHeader`,
            default: "====== Layer Hierarchy ======",
            description: "Layer Hierarchy info header.",
          })
        );
      }
      // const zIndex = ()=>'';
      const items = [...folder.items]
        .reverse()
        .map((item) => {
          if (typeof item === "object") return item;
          return this.runtime.getTargetByDrawableId(item);
        })
        .filter((item) => item);

      items.forEach((item, idx) => {
        const p = pref2 + pref + (idx === items.length - 1 ? "└" : "├");
        if (item.isOriginal === undefined) {
          print(`${p} ${item.name}`); // ${zIndex(item.layerIndex)}
          this.__printFolderInGandiTerminal(
            item,
            false,
            `${pref} `,
            idx === items.length - 1 ? " " : "│",
            output
          );
        } else {
          const { name } = item.sprite;
          // const name =this.getFolderAndSpriteName(item.sprite.name).spriteName;
          const idx = this.renderer.getDrawableLayerIndex(item.drawableID);
          print(
            `${p}${zIndex(idx)}${name}${item.isOriginal ? "" : "(clone)"}`
          );
        }
      });
      return output;
    }

    // ========================================================================== //
    //     blocks functions

    setLayerManager({ OP }) {
      this.layerManager.enableLayerSorting(OP === "on");
    }
    setSortOrder({ ORDER }) {
      // renderer里第一层时底层，而用户视角第一层时顶层，因此升/降序反过来
      const on = 1 - (ORDER === "asc");
      if ((on ? 1 : -1) !== this.layerManager.order) {
        Object.values(this.rootFolder.nameToSubFolder).forEach(
          (folder) => (folder.layerIndex *= -1)
        );
      }
      this.layerManager.setSortInAscendingOrder(on);
    }
    defineLayerLevels({ LEVELS, LEVEL }) {
      // 切割逗号分隔的字符串未列表，并去除前后空白字符
      // e.g. 'UI, Game, BG => ['UI','Game','BG']
      const lvString = Scratch.Cast.toString(LEVELS);
      if (lvString === "") return;
      const levels = lvString.split(",").map((str) => str.trim());
      this.__generateLayerLevelsFromList(levels, Scratch.Cast.toString(LEVEL));
      this.storeExtOptions();
    }

    __removeFolder1AndMoveItemsToFolder2(folder1, folder2) {
      if (!folder1 || !folder2) return;
      if (folder1 === folder2) return;
      // 将folder1 的 item 移入folder2
      while (folder1.items.length > 0) {
        folder2.add(folder1.items[0]);
      }
      if (!folder1.parent) return;
      // 将folder1 从 parent 中移除
      folder1.parent.remove(folder1);
    }

    __generateLayerLevelsFromList(lvNames, defaultLevelName) {
      const levelNames = Array.from(new Set(lvNames)).reverse();
      if (levelNames.length === 0) return;
      // 设置默认文件夹的idx
      let defaultIdx = levelNames.indexOf(defaultLevelName);
      // 如果默认level不存在，默认取0或1层
      if (defaultIdx === -1) defaultIdx = Math.min(levelNames.length - 1, 1);
      // 创建各 level 文件夹，挂到root上
      // 如果已存在同名的则返回同名folder
      const levelFolders = levelNames.map((levelName) => {
        const folder = this.layerManager.createLayerFolder(levelName);
        // 移到最前面
        this.rootFolder.changeDrawableOrder(
          folder,
          this.layerManager.order,
          Infinity
        );
        return folder;
      });
      const defaultFolder = levelFolders[defaultIdx];
      this.layerManager.defaultFolderDrawableAddTo = defaultFolder;
      // 检查 root 中的每一项
      for (let i = 0; i < this.rootFolder.items.length; ) {
        const item = this.rootFolder.items[i];
        // 如果是文件夹
        if (typeof item === "object") {
          if (levelFolders.includes(item)) i++;
          else {
            // 不是定义的文件夹，删除，并将其中的内容转移到默认folder
            this.__removeFolder1AndMoveItemsToFolder2(item, defaultFolder);
          }
        } else {
          // 如果是单个角色，移到默认文件夹
          defaultFolder.add(item);
        }
      }
    }

    moveSpritesInFolderToLevel({ FOLDER, LEVEL, TYPE }) {
      const folderName = Scratch.Cast.toString(FOLDER);
      const all = folderName === "__all__";
      const spriteOnly = TYPE === "sprite";
      let levelFolder = this.rootFolder.nameToSubFolder[LEVEL];
      if (!levelFolder) {
        // level 不存在时，创建一个新的
        levelFolder = this.layerManager.createLayerFolder(LEVEL);
      }
      this.runtime.targets.forEach((target) => {
        if (!target.isStage && (target.isOriginal || !spriteOnly)) {
          const info = this.getFolderAndSpriteName(target.getName());
          if (all || (!info.isSingleSprite && info.folderName === folderName)) {
            levelFolder.add(target.drawableID);
          }
        }
      });
    }

    getLayerIndexForItem(item) {
      if (typeof item === "object") {
        return item.layerIndex;
      }
      return this.renderer.getDrawableLayerIndex(item);
    }

    __printFolderInConsole(folder, pref = "") {
      const getRound = (num) => parseFloat(num.toFixed(2));
      console.group(
        `${pref}${getRound(folder.layerIndex)}=folder:${folder.name}`
      );
      folder.items.forEach((item) => {
        if (typeof item === "object") {
          this.__printFolderInConsole(item);
        } else {
          const idx = this.renderer.getDrawableLayerIndex(item);
          console.log(`  ${getRound(idx)}=draw${item}`);
        }
      });
      console.groupEnd();
    }

    __getTargetByIdOrName(name, util) {
      if (name === "__myself__") return util.target;
      let target = this.runtime.getSpriteTargetByName(name);
      if (!target) {
        target = this.runtime.getTargetById(name);
        if (!target) return null;
      }
      return target;
    }

    setTargetLayerLevel({ TARGET, LEVEL }, util) {
      const target = this.__getTargetByIdOrName(
        Scratch.Cast.toString(TARGET),
        util
      );
      if (!target || target.isStage) return;
      let folder = this.rootFolder.nameToSubFolder[LEVEL];
      if (!folder) {
        // level 不存在时，创建一个新的
        folder = this.layerManager.createLayerFolder(LEVEL);
      }
      folder.add(target.drawableID);
    }

    // 设置高级画笔层级
    setCanvasLayerLevel({ TARGET, LEVEL }, util) {
      const target = this.__getTargetByIdOrName(
        Scratch.Cast.toString(TARGET),
        util
      );
      if (!target || target.isStage) return;
      const cvsExtIns = this.runtime.ext_CCWCanvasV2;
      if (cvsExtIns) {
        const canvasState = target.getCustomState("CCW.CanvasV2");
        if (canvasState?.drawableID) {
          let folder = this.rootFolder.nameToSubFolder[LEVEL];
          if (!folder) {
            // level 不存在时，创建一个新的
            folder = this.layerManager.createLayerFolder(LEVEL);
          }
          folder.add(canvasState.drawableID);
        }
      }
    }

    // 设置高级画笔 z-index
    setCanvasLayerPriority({ TARGET, PRIORITY }, util) {
      const target = this.__getTargetByIdOrName(
        Scratch.Cast.toString(TARGET),
        util
      );
      if (!target || target.isStage) return;
      const cvsExtIns = this.runtime.ext_CCWCanvasV2;
      if (cvsExtIns) {
        const canvasState = target.getCustomState("CCW.CanvasV2");
        if (canvasState?.drawableID) {
          this.renderer.setDrawableLayerIndex(
            canvasState.drawableID,
            Scratch.Cast.toNumber(PRIORITY)
          );
        }
      }
    }

    // /**
    //  * 设置文件夹1到文件夹2前/后
    //  * @param {object} args
    //  * @param {string} args.FOLDER1 文件夹1名称
    //  * @param {string} args.FOLDER2 文件夹2名称
    //  * @param {'front'|'behind'} args.POS 前或后
    //  */
    // setFolderRelationship({ FOLDER1, FOLDER2, POS }) {
    //   const folder1 = this.rootFolder.nameToSubFolder[FOLDER1];
    //   const folder2 = this.rootFolder.nameToSubFolder[FOLDER2];
    //   if (folder1 && folder2) {
    //     const idx = this.rootFolder.items.indexOf(folder2) + (POS === 'front');
    //     this.rootFolder.changeDrawableOrder(folder1, this.layerManager.order, idx);
    //   }
    // }

    setTargetLayerPriority({ TARGET, PRIORITY }, util) {
      const target = this.__getTargetByIdOrName(
        Scratch.Cast.toString(TARGET),
        util
      );
      if (!target || target.isStage) return;
      this.renderer.setDrawableLayerIndex(
        target.drawableID,
        Scratch.Cast.toNumber(PRIORITY)
      );
    }

    setMinUnshadedIndex({ INDEX, LEVEL }) {
      const folder = this.rootFolder.nameToSubFolder[LEVEL];
      if (!folder) return;
      const value = INDEX === "" ? Infinity : Scratch.Cast.toNumber(INDEX);
      this.layerManager.setMinUnshadedInfo(2, [value, folder]);
    }

    setMinUnshadedTarget({ TARGET }, util) {
      const target = this.__getTargetByIdOrName(
        Scratch.Cast.toString(TARGET),
        util
      );
      if (!target || target.isStage) return;
      this.layerManager.setMinUnshadedInfo(1, target.drawableID);
    }

    setMinUnshadedLevel({ LEVEL }) {
      this.setMinUnshadedIndex({
        INDEX: -Infinity * this.layerManager.order,
        LEVEL,
      });
    }

    getTargetLayerInfo({ TARGET, INFO }, util) {
      const target = this.__getTargetByIdOrName(
        Scratch.Cast.toString(TARGET),
        util
      );
      if (!target) return "";
      const myFld = this.renderer.getDrawableLayerFolder(target.drawableID);
      switch (INFO) {
        case "level":
          if (!myFld || myFld === this.rootFolder) return "";
          return myFld.name;
        // case 'fldPri':
        //   return myFld?.layerIndex ?? 0;
        case "myPri":
          return this.renderer.getDrawableLayerIndex(target.drawableID);
        case "layer":
          // if (this.layerManagerActivated) this.sortLayersIfNeeded();
          return this.runtime.renderer.getDrawableOrder(target.drawableID);
        default:
          return "";
      }
    }
  }
  Scratch.extensions.register(new LayerManagerExtension(vm.runtime));
})(Scratch);
