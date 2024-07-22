// Name: Sty-Lists
// ID: SPlistMonitors
// Description: Customize and Organize Lists Monitors.
// By: SharkPool

// Version 2.0.0

(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) throw new Error("Sty-Lists must run unsandboxed!");

  const menuIconURI =
"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2Mi4xNDMiIGhlaWdodD0iNjIuMTQzIiB2aWV3Qm94PSIwIDAgNjIuMTQzIDYyLjE0MyI+PGcgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6bm9ybWFsIj48cGF0aCBkPSJNMCAzMS4wNzFDMCAxMy45MTEgMTMuOTEgMCAzMS4wNzEgMGMxNy4xNiAwIDMxLjA3MSAxMy45MSAzMS4wNzEgMzEuMDcxIDAgMTcuMTYtMTMuOTEgMzEuMDcxLTMxLjA3MSAzMS4wNzFDMTMuOTExIDYyLjE0MiAwIDQ4LjIzMiAwIDMxLjA3MSIgZmlsbD0iI2NjNDYwMiIvPjxwYXRoIGQ9Ik0zLjU2NCAzMS4wNzFjMC0xNS4xOTIgMTIuMzE1LTI3LjUwNyAyNy41MDctMjcuNTA3czI3LjUwNyAxMi4zMTUgMjcuNTA3IDI3LjUwNy0xMi4zMTUgMjcuNTA3LTI3LjUwNyAyNy41MDdTMy41NjQgNDYuMjYzIDMuNTY0IDMxLjA3MSIgZmlsbD0iI2ZmNjYxYSIvPjxwYXRoIGQ9Im00NC4yMzkgMzguNjQ1LS4wMDUuMDQ3djQuNzY0YzAgLjU3My0uNDYzIDEuMDQtMS4wMzcgMS4wNDN2LjAwMUgyNi45MWExLjA0MyAxLjA0MyAwIDAgMS0xLjAzNy0xLjA0NGgtLjAwNXYtNC43NTRjLS4wMDEtLjAyLS4wMDYtLjAzNy0uMDA2LS4wNTYgMC0uNTc3LjQ2OC0xLjA0NCAxLjA0NC0xLjA0NGgxNi4yOTFhMS4wNDMgMS4wNDMgMCAwIDEgMS4wNDIgMS4wNDNtLTIzLjI2NC0uNzM4Yy4xOTYuMTk2LjMwNS40NjEuMzA1LjczOHY0LjgxYzAgLjU3Ni0uNDY3IDEuMDQzLTEuMDQ0IDEuMDQ0aC00LjgxYTEuMDQ0IDEuMDQ0IDAgMCAxLTEuMDQ0LTEuMDQ0di00LjgxYzAtLjU3Ni40NjgtMS4wNDQgMS4wNDQtMS4wNDRoNC44MTFjLjI3NyAwIC41NDIuMTEuNzM4LjMwNm0yMy4yNjQtMTAuNzYtLjAwNS4wNDd2NC43NjRjMCAuNTc0LS40NjMgMS4wNC0xLjAzNyAxLjA0M3YuMDAxSDI2LjkxYTEuMDQzIDEuMDQzIDAgMCAxLTEuMDM3LTEuMDQ0aC0uMDA1di00Ljc1NGMtLjAwMS0uMDE5LS4wMDYtLjAzNi0uMDA2LS4wNTYgMC0uNTc2LjQ2OC0xLjA0MyAxLjA0NC0xLjA0NGgxNi4yOTFhMS4wNDMgMS4wNDMgMCAwIDEgMS4wNDIgMS4wNDRtLTIzLjI2NC0uNzM4Yy4xOTYuMTk2LjMwNS40NjEuMzA1LjczOHY0LjgxYzAgLjU3Ny0uNDY3IDEuMDQ0LTEuMDQ0IDEuMDQ0aC00LjgxYTEuMDQ0IDEuMDQ0IDAgMCAxLTEuMDQ0LTEuMDQ0di00LjgxYzAtLjU3Ni40NjgtMS4wNDMgMS4wNDQtMS4wNDRoNC44MTFjLjI3NyAwIC41NDIuMTEuNzM4LjMwNm00Ljg5Mi01LjkxM3YtNC43NTVjMC0uMDItLjAwNS0uMDM3LS4wMDUtLjA1NiAwLS41NzYuNDY3LTEuMDQ0IDEuMDQ0LTEuMDQ0aDE2LjI5MWExLjA0NCAxLjA0NCAwIDAgMSAxLjA0MiAxLjA0NGwtLjAwNS4wNDZ2NC43NjRjMCAuNTc0LS40NjMgMS4wNC0xLjAzNyAxLjA0NEgyNi45MWExLjA0MyAxLjA0MyAwIDAgMS0xLjAzNy0xLjA0M3ptLTQuODkyLTUuNTVjLjE5Ni4xOTcuMzA1LjQ2Mi4zMDUuNzM5djQuODFjMCAuNTc2LS40NjcgMS4wNDMtMS4wNDQgMS4wNDRoLTQuODFhMS4wNDQgMS4wNDQgMCAwIDEtMS4wNDQtMS4wNDR2LTQuODFjMC0uNTc2LjQ2OC0xLjA0NCAxLjA0NC0xLjA0NGg0LjgxMWMuMjc3IDAgLjU0Mi4xMS43MzguMzA2IiBmaWxsPSIjZmZmIi8+PHBhdGggZD0iTTQ2Ljc2MSAzMy4wNjJjLjUyMSAwIC45NDQuNDIzLjk0NC45NDR2MTAuNDc2SDM3LjIyNmMtLjUyLS4wMDItLjk0LS4zMzQtLjk0LS44NTRsLjAwMy00LjQzNmMwLS41MTkuNDY0LS45ODUuOTgyLS45ODhsNC4yLjA0NHYtNC4yMzlhLjk0My45NDMgMCAwIDEgLjk0My0uOTM3eiIgZmlsbD0iI2ZmZiIgc3Ryb2tlPSIjZmY2NjFhIiBzdHJva2Utd2lkdGg9IjYiLz48cGF0aCBkPSJNNDYuNzYxIDMzLjA2MmMuNTIxIDAgLjk0NC40MjMuOTQ0Ljk0NHY0LjI0Mmg0LjIzOWEuOTQzLjk0MyAwIDAgMSAuOTM3Ljk0NGwuMDEgNC4zNDZhLjk0NC45NDQgMCAwIDEtLjk0NC45NDRoLTQuMjQydjQuMjQ1Yy0uMDAyLjUyLS40NjkuOTQtLjk4OS45NGwtNC4yNTYtLjAwM2MtLjUxOSAwLS45ODUtLjQxOS0uOTg4LS45Mzd2LTQuMjQ1aC00LjI0NmMtLjUyLS4wMDItLjk0LS4zMzQtLjk0LS44NTRsLjAwMy00LjQzNmMwLS41MTkuNDY0LS45ODUuOTgyLS45ODhsNC4yLjA0NHYtNC4yMzlhLjk0My45NDMgMCAwIDEgLjk0My0uOTM3eiIgZmlsbD0iI2ZmZiIvPjwvZz48L3N2Zz4=";

  const vm = Scratch.vm;
  const runtime = vm.runtime;
  const builtInFonts = [
    "Scratch", "Sans Serif", "Serif",
    "Handwriting", "Marker", "Curly", "Pixel"
  ];
  let listDocs;
  if (typeof scaffolding !== "undefined") {
    listDocs = {
      body : "sc-monitor-root",
      value : "sc-monitor-row-value-outer", value2 : "sc-monitor-row-value-inner",
      ind : "sc-monitor-row-index",
      head : "sc-monitor-list-label", foot : "sc-monitor-list-footer-text",
      pkg1 : "", addButton : "sc-monitor-list-add",
      grid : ".sc-monitor-rows-inner", contain : ".sc-monitor-rows-inner",
      row : "sc-monitor-row-root", span : ""
    };
  } else {
    listDocs = {
      body : "monitor_list-monitor",
      value : "monitor_list-value", value2 : "monitor_value-inner",
      ind : "monitor_list-index",
      head : "monitor_list-header", foot : "monitor_footer-length_2",
      pkg1 : `[class*="monitor_"]`, addButton : "monitor_add-button",
      grid : ".ReactVirtualized__Grid.ReactVirtualized__List", contain : ".ReactVirtualized__Grid__innerScrollContainer",
      row : "monitor_list-row", span : "span"
    };
  }
  let visualLists = {};

  class SPlistMonitors {
    constructor() {
      runtime.on("MONITORS_UPDATE", () =>{
        for (const [id, { util }] of Object.entries(visualLists)) {
          const monitor = document.querySelector(`div[data-id="${id}"][class*="monitor"]`);
          if (!monitor) delete visualLists[id];
          else {
            const monBody = typeof scaffolding !== "undefined" ? monitor : monitor.querySelector(`div[class^="${listDocs.body}"]`);
            this.stretchList({
              LIST: id, WIDTH: parseFloat(monBody.style.width),
              HEIGHT: parseFloat(monBody.style.height), SECRET: true
            }, util);
            const columns = monitor.getAttribute("SPcolumnCnt") || 1;
            if (columns > 1) this.renderList({ LIST: id, NUM: columns, SECRET: true }, util);
          }
        }
      });
    }
    getInfo() {
      return {
        id: "SPlistMonitors",
        name: "Sty-Lists",
        color1: "#FF661A",
        color2: "#ba3e00",
        color3: "#cc4602",
        menuIconURI,
        blocks: [
          {
            opcode: "listExists",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "does [LIST] exist?",
            arguments: {
              LIST: { type: Scratch.ArgumentType.STRING, defaultValue: "my list" },
            },
          },
          {
            opcode: "isShowing",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "is [LIST] showing?",
            arguments: {
              LIST: { type: Scratch.ArgumentType.STRING, menu: "lists" },
            },
          },
          {
            opcode: "makeList",
            blockType: Scratch.BlockType.COMMAND,
            text: "create list named [LIST] [TYPE]",
            arguments: {
              LIST: { type: Scratch.ArgumentType.STRING, defaultValue: "my list" },
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "listTypes" }
            },
          },
          {
            opcode: "deleteList",
            blockType: Scratch.BlockType.COMMAND,
            text: "delete list [LIST]",
            arguments: {
              LIST: { type: Scratch.ArgumentType.STRING, menu: "lists" }
            },
          },
          "---",
          {
            opcode: "renderList",
            blockType: Scratch.BlockType.COMMAND,
            text: "render [LIST] with [NUM] columns",
            arguments: {
              LIST: { type: Scratch.ArgumentType.STRING, menu: "lists" },
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 2 }
            },
          },
          {
            opcode: "getColumns",
            blockType: Scratch.BlockType.REPORTER,
            text: "# of columns in [LIST]",
            arguments: {
              LIST: { type: Scratch.ArgumentType.STRING, menu: "lists" }
            },
          },
          "---",
          {
            opcode: "stretchList",
            blockType: Scratch.BlockType.COMMAND,
            text: "stretch [LIST] to width: [WIDTH] and height: [HEIGHT]",
            arguments: {
              LIST: { type: Scratch.ArgumentType.STRING, menu: "lists" },
              WIDTH: { type: Scratch.ArgumentType.NUMBER, defaultValue: 200 },
              HEIGHT: { type: Scratch.ArgumentType.NUMBER, defaultValue: 200 }
            },
          },
          {
            opcode: "getAtt",
            blockType: Scratch.BlockType.REPORTER,
            text: "get [THING] of [LIST]",
            arguments: {
              LIST: { type: Scratch.ArgumentType.STRING, menu: "lists" },
              THING: { type: Scratch.ArgumentType.STRING, menu: "ATTS" }
            },
          },
          "---",
          {
            opcode: "chooseOption",
            blockType: Scratch.BlockType.COMMAND,
            text: "turn [THING] in [LIST] [ON_OFF]",
            arguments: {
              LIST: { type: Scratch.ArgumentType.STRING, menu: "lists" },
              THING: { type: Scratch.ArgumentType.STRING, menu: "listUtils" },
              ON_OFF: { type: Scratch.ArgumentType.STRING, menu: "ON_OFF" }
            },
          },
          { blockType: Scratch.BlockType.LABEL, text: "Positioning" },
          {
            opcode: "setPosition",
            blockType: Scratch.BlockType.COMMAND,
            text: "set position of [LIST] to x: [x] y: [y]",
            arguments: {
              LIST: { type: Scratch.ArgumentType.STRING, menu: "lists" },
              x: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            },
          },
          {
            opcode: "currentPos",
            blockType: Scratch.BlockType.REPORTER,
            text: "current [POSITION] of [LIST]",
            arguments: {
              LIST: { type: Scratch.ArgumentType.STRING, menu: "lists" },
              POSITION: { type: Scratch.ArgumentType.STRING, menu: "POSITIONS" }
            },
          },
          "---",
          {
            opcode: "setScroll",
            blockType: Scratch.BlockType.COMMAND,
            text: "set scrollbar position of [LIST] to [SCROLL]%",
            arguments: {
              LIST: { type: Scratch.ArgumentType.STRING, menu: "lists" },
              SCROLL: { type: Scratch.ArgumentType.NUMBER, defaultValue: 50 }
            },
          },
          { blockType: Scratch.BlockType.LABEL, text: "Formatting and Effects" },
          {
            opcode: "resetAll",
            blockType: Scratch.BlockType.COMMAND,
            text: "reset all changes to [LIST]",
            arguments: {
              LIST: { type: Scratch.ArgumentType.STRING, menu: "lists" },
            },
          },
          {
            opcode: "formatItems",
            blockType: Scratch.BlockType.COMMAND,
            text: "align item text to [ALIGN] in [LIST]",
            arguments: {
              LIST: { type: Scratch.ArgumentType.STRING, menu: "lists" },
              ALIGN: { type: Scratch.ArgumentType.STRING, menu: "ALIGN" }
            },
          },
          {
            opcode: "setDisplay",
            blockType: Scratch.BlockType.COMMAND,
            text: "set [DISPLAY] name of [LIST] to [NAME]",
            arguments: {
              NAME: { type: Scratch.ArgumentType.STRING, defaultValue: "my cooler list" },
              DISPLAY: { type: Scratch.ArgumentType.STRING, menu: "list_displays" },
              LIST: { type: Scratch.ArgumentType.STRING, menu: "lists" }
            },
          },
          {
            opcode: "setColor",
            blockType: Scratch.BlockType.COMMAND,
            text: "set color of item # [NUM] in [LIST] to [COLOR]",
            arguments: {
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
              COLOR: { type: Scratch.ArgumentType.COLOR, defaultValue: "#0000ff" },
              LIST: { type: Scratch.ArgumentType.STRING, menu: "lists" }
            },
          },
          {
            opcode: "setLabel",
            blockType: Scratch.BlockType.COMMAND,
            text: "set name of label # [NUM] in [LIST] to [VALUE]",
            arguments: {
              NUM: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
              VALUE: { type: Scratch.ArgumentType.STRING, defaultValue: "item 1" },
              LIST: { type: Scratch.ArgumentType.STRING, menu: "lists" }
            },
          },
          {
            opcode: "setFont",
            blockType: Scratch.BlockType.COMMAND,
            text: "set font of [LIST] to [FONT]",
            arguments: {
              FONT: { type: Scratch.ArgumentType.STRING, menu: "allFonts" },
              LIST: { type: Scratch.ArgumentType.STRING, menu: "lists" }
            },
          },
          "---",
          {
            opcode: "resetEffect",
            blockType: Scratch.BlockType.COMMAND,
            text: "reset effects of [LIST]",
            arguments: {
              LIST: { type: Scratch.ArgumentType.STRING, menu: "lists" }
            },
          },
          {
            opcode: "setEffect",
            blockType: Scratch.BlockType.COMMAND,
            text: "set [EFFECT] of [LIST] to [AMOUNT]",
            arguments: {
              AMOUNT: { type: Scratch.ArgumentType.NUMBER, defaultValue: 5 },
              EFFECT: { type: Scratch.ArgumentType.STRING, menu: "EFFECTS" },
              LIST: { type: Scratch.ArgumentType.STRING, menu: "lists" }
            },
          },
          {
            opcode: "stretchEffect",
            blockType: Scratch.BlockType.COMMAND,
            text: "scale [LIST] to x: [x] y: [y]",
            arguments: {
              x: { type: Scratch.ArgumentType.NUMBER, defaultValue: 200 },
              y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              LIST: { type: Scratch.ArgumentType.STRING, menu: "lists" }
            },
          },
          {
            opcode: "currentEffect",
            blockType: Scratch.BlockType.REPORTER,
            text: "current [EFFECT] of [LIST]",
            arguments: {
              LIST: { type: Scratch.ArgumentType.STRING, menu: "lists" },
              EFFECT: { type: Scratch.ArgumentType.STRING, menu: "ALL_EFFECTS" }
            },
          }
        ],
        menus: {
          lists: { acceptReporters: true, items: "getLists" },
          allFonts: { acceptReporters: true, items: "getFonts" },
          EFFECTS: { acceptReporters: true, items: this.getEffects(false) },
          ALL_EFFECTS: { acceptReporters: true, items: this.getEffects(true) },
          POSITIONS: ["x", "y"],
          list_displays: ["header", "footer"],
          listTypes: ["globally", "for this sprite only"],
          listUtils: ["click events", "text highlighting", "numbered items", "+ and = buttons"],
          ON_OFF: ["on", "off"],
          ATTS: { acceptReporters: true, items: ["width", "height"] },
          ALIGN: { acceptReporters: true, items: ["left", "right", "center"] }
        }
      }
    }

    // Helper Funcs
    getLists() {
      const globalLists = Object.values(runtime.getTargetForStage().variables).filter((x) => x.type == "list");
      const localLists = Object.values(vm.editingTarget.variables).filter((x) => x.type == "list");
      const listMenu = [...new Set([...globalLists, ...localLists])];
      if (listMenu.length === 0) return [{ text: "make a list", value: "make a list" }];
      return listMenu.map((i) => ({ text: i.name, value: i.id }));
    }

    getFonts() {
      const customFonts = runtime.fontManager ? runtime.fontManager.getFonts().map((i) => ({ text: i.name, value: i.family })) : [];
      return [...builtInFonts, ...customFonts];
    }

    getEffects(enable) {
      return [
        "blur", "saturation", "contrast", "brightness",
        "hue", "opacity", "sepia", "invert", "direction",
        ...(enable ? ["scale x", "scale y"] : []),
        "skew x", "skew y"
      ];
    }

    getListID(idName, util) {
      const byId = util.target.lookupVariableById(idName);
      if (byId && byId.type === "list") return byId.id;
      const byName = util.target.lookupVariableByNameAndType(idName, "list");
      return byName ? byName.id : undefined;
    }

    getMonitor(id, util, returnID) {
      id = this.getListID(id, util);
      if (!id) return returnID ? {} : undefined;
      if (returnID) return { id, listMon: document.querySelector(`div[data-id="${id}"][class*="monitor"]`) };
      else return document.querySelector(`div[data-id="${id}"][class*="monitor"]`);
    }

    applyChanges(listMon, id) {
      const list = visualLists[id];
      if (list === undefined) return;
      if (list.listenerApplied === undefined) {
        list.listenerApplied = true;
        const container = listMon.querySelector(listDocs.grid);
        container.addEventListener("scroll", () => { this.applyChanges(listMon, id) });
      }
      const allItems = listMon.querySelectorAll(`div[class^="${listDocs.body}"] [class^="${listDocs.value}"]`);
      const changedLabels = list.labels, changedColors = list.colors;
      const isPackaged = typeof scaffolding !== "undefined";
      allItems.forEach((item, i) => {
        if (isPackaged ? item.parentNode.getAttribute("data-index") == i : item.getAttribute("dataindex") == i) {
          if (changedLabels && changedLabels[i]) item.previousSibling.textContent = changedLabels[i];
          if (changedColors && changedColors[i]) item.style.background = changedColors[i];
        }
      });
    }

    genId() {
      // Used for creating IDs for variables
      const soup = "!#%()*+,-./:;=?@[]^_`{|}~ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const id = [];
      for (let i = 0; i < 20; i++) {
        id[i] = soup.charAt(Math.random() * soup.length);
      }
      return id.join("");
    }

    refresh() {
      // Use to refresh the toolbox to show new/deleted lists
      if (typeof scaffolding === "undefined") {
        vm.emitWorkspaceUpdate();
        const workspace = ScratchBlocks.getMainWorkspace();
        workspace.toolboxRefreshEnabled_ = true;
        workspace.refreshToolboxSelection_();
        workspace.toolboxRefreshEnabled_ = false;
        setTimeout(function() { runtime.requestBlocksUpdate() }, 10);
      }
    }

    // Block Funcs
    isShowing(args, util) {
      const id = this.getListID(args.LIST, util);
      if (!id) return false;
      return runtime.getMonitorState().get(id)?.visible || false;
    }

    listExists(args, util) { return Scratch.Cast.toBoolean(this.getListID(args.LIST, util)) }

    makeList(args, util) {
      const listName = Scratch.Cast.toString(args.LIST);
      if (this.getListID(args.LIST, util)) return;
      if (args.TYPE === "for this sprite only") util.target.createVariable(this.genId(), listName, "list");
      else runtime.getTargetForStage().createVariable(this.genId(), listName, "list");
      return this.refresh();
    }

    deleteList(args, util) {
      const id = this.getListID(args.LIST, util);
      if (!id) return;
      runtime.getTargetForStage().deleteVariable(id)
      util.target.deleteVariable(id);
      return this.refresh();
    }

    renderList(args, util) {
      const { id, listMon } = this.getMonitor(args.LIST, util, true);
      if (!listMon) return;
      const items = util.target.lookupVariableById(id).value;
      const columnCnt = Math.min(100, Math.round(Scratch.Cast.toNumber(args.NUM)));
      listMon.setAttribute("SPcolumnCnt", columnCnt);
      let container = listMon.querySelector(`div[class^="SPstyLists-columnRender"`);
      if (container) container.parentNode.removeChild(container);
      if (items.length === 0) return;
      // From this point onward, we know theres at least 1 item present. We can grab the classnames from that item,
      // that way we dont lose CSS properties and support for Custom Styles
      let itemDiv = [], listContain = listMon.querySelector(listDocs.contain);
      if (!listContain) return; // shouldnt happen, but check just in case
      const firstItem = listMon.querySelector(`[class^="${listDocs.row}"]`);
      const itemClasses = [firstItem.className]; // Always 4 Items
      firstItem.querySelectorAll("*").forEach(el => {itemClasses.push(el.className) });
      if (columnCnt === 1) listContain.style.display = "";
      else {
        const isPackaged = typeof scaffolding !== "undefined";
        listContain.style.display = "none";
        container = document.createElement("div");
        container.className = "SPstyLists-columnRender";
        container.style.overflow = "scroll";
        container.style.overflowX = "hidden";
        container.style.height = "100%";
        container.style.position = "relative";
        container.addEventListener("scroll", () => { this.applyChanges(listMon, id) });
        for (let i = 0; i < Math.ceil(items.length / columnCnt); i++) {
          const row = document.createElement("div");
          row.className = itemClasses[0];
          row.style.position = "absolute";
          row.style.width = "100%";
          row.style.height = "24px";
          row.style.top = `${i * 24}px`;
          for (let j = 0; j < columnCnt; j++) {
            const listItem = items[i * columnCnt + j];
            const item = document.createElement("div");
            item.className = itemClasses[0];
            item.setAttribute("data-index", i * columnCnt + j);
            item.style.width = `${100 / columnCnt}%`;
            item.style.left = `${(100 / columnCnt) * j}%`;
            const index = document.createElement("div");
            index.className = itemClasses[1];
            index.textContent = i * columnCnt + j + 1;
            item.appendChild(index);

            const value = document.createElement("div");
            value.className = itemClasses[2];
            value.style.background = "#ff661a";
            value.style.color = "#fff";
            value.setAttribute("dataindex", i * columnCnt + j);
            const valueInner = document.createElement("div");
            valueInner.className = itemClasses[3];
            valueInner.textContent = listItem || "";
            value.appendChild(valueInner);
            item.appendChild(value);
            if (!listItem) item.style.opacity = "0"; // Use Ghost Items to keep items separated
            row.appendChild(item);
          }
          itemDiv.push(row)
        }
        container.append(...itemDiv);
        listContain.parentNode.insertBefore(container, listContain);
        if (args.SECRET === undefined) visualLists[id] = { ...visualLists[id], util };
        this.applyChanges(listMon, id);
      }
    }

    getColumns(args, util) {
      const listMon= this.getMonitor(args.LIST, util);
      if (!listMon) return 0;
      return listMon ? listMon.getAttribute("SPcolumnCnt") || 1 : 1;
    }

    stretchList(args, util) {
      const id = this.getListID(args.LIST, util);
      if (!id) return;
      const width = Math.max(1, Math.min(99999, Scratch.Cast.toNumber(args.WIDTH)));
      const height = Math.max(1, Math.min(99999, Scratch.Cast.toNumber(args.HEIGHT)));
      if (args.SECRET === undefined) visualLists[id] = { ...visualLists[id], util };
      if (typeof scaffolding === "undefined") {
        // Editor Monitor GUI cant Force Visual Updates, we need to do it Manually
        const listMon = document.querySelector(`div[data-id="${id}"] [class*="monitor_list"]`);
        if (!listMon) return;
        const outerModal = listMon.querySelector(listDocs.grid);
        const innerModal = listMon.querySelector(listDocs.contain);
        listMon.style.width = `${width}px`; listMon.style.height = `${height}px`;
        outerModal.style.width = `${width}px`; outerModal.style.height = `${height}px`;
        if (innerModal) {
          innerModal.style.width = "auto";
          innerModal.style.maxWidth = `${width}px`;
        }
      }
      runtime.requestUpdateMonitor(new Map([["id", id], ["width", width], ["height", height]]));
    }

    getAtt(args, util) {
      let listMon = this.getMonitor(args.LIST, util);
      if (!listMon) return "";
      listMon = typeof scaffolding !== "undefined" ? listMon : listMon.querySelector(`div[class^="${listDocs.body}"]`);
      return parseFloat(listMon.style[args.THING === "width" ? "width" : "height"]);
    }

    chooseOption(args, util) {
      const listMon = this.getMonitor(args.LIST, util);
      if (!listMon) return;
      const disable = args.ON_OFF === "off";
      if (args.THING === "click events") listMon.style.pointerEvents = disable ? "none" : "auto";
      else if (args.THING === "text highlighting") {
        const items = listMon.querySelectorAll(`div[class^="${listDocs.value2}"]`);
        items.forEach(item => {
          item.style.userSelect = disable ? "none " : "auto";
          item.style.webkitUserSelect = disable ? "none" : "auto";
        });
      } else if (args.THING === "numbered items") {
        const numberedItems = listMon.querySelectorAll(`div[class^="${listDocs.ind}"]`);
        numberedItems.forEach(item => { item.style.display = disable ? "none" : "block" });
      } else if (args.THING === "+ and = buttons") {
        let button1 = listMon.querySelector(`div[class^="${listDocs.addButton}"]`);
        let button2 = typeof scaffolding !== "undefined" ? button1 : listMon.querySelector(`div[class^="monitor_resize-handle"]`);
        if (button1 === null || button2 === null) {
          const buttons = listMon.querySelectorAll(".no-drag");
          buttons.forEach(button => { button.style.display = disable ? "none" : "block" });
        } else {
          button1.style.display = disable ? "none" : "block";
          button2.style.display = disable ? "none" : "block";
        }
        let text = listMon.querySelector(`div[class^="${listDocs.foot}"]`);
        text.style.margin = "0 auto";
      }
    }

    setPosition(args, util) {
      const { id, listMon } = this.getMonitor(args.LIST, util, true);
      if (!listMon) return;
      const canvas = [runtime.stageWidth / 2, runtime.stageHeight / 2];
      const regex = /transform:([^;]+);/;

      const box = typeof scaffolding !== "undefined" ? listMon : listMon.querySelector(`div[class^="${listDocs.body}"]`);
      const sizeOffset = [parseFloat(box.style.width), parseFloat(box.style.height)];
      const x = Scratch.Cast.toNumber(args.x) + canvas[0] - (sizeOffset[0] / 2);
      const y = (Scratch.Cast.toNumber(args.y) - canvas[1] + (sizeOffset[1] / 2)) * -1;

      let styleAtt = listMon.getAttribute("style");
      const transformMatch = styleAtt.match(regex);
      if (transformMatch) {
        const newTransform = transformMatch[1].replace(/translate\([^)]+\)/, `translate(${x}px, ${y}px)`);
        listMon.setAttribute("style", styleAtt.replace(regex, `transform:${newTransform}; top: 5; left: 5;`));
        runtime.requestUpdateMonitor(new Map([["id", id], ["x", x], ["y", y]]));
      }
    }

    currentPos(args, util) {
      const listMon = this.getMonitor(args.LIST, util);
      if (!listMon) return "";
      const canvas = [runtime.stageWidth / 2, runtime.stageHeight / 2];
      const box = typeof scaffolding !== "undefined" ? listMon : listMon.querySelector(`div[class^="${listDocs.body}"]`);
      const sizeOffset = [parseFloat(box.style.width), parseFloat(box.style.height)];
      const styleAtt = listMon.getAttribute("style");
      if (styleAtt) {
        const match = styleAtt.match(/transform\s*:\s*translate\((-?\d+(?:\.\d+)?px),\s*(-?\d+(?:\.\d+)?px)\)/);
        if (match) return args.POSITION === "x" ? parseInt(match[1]) - canvas[0] + (sizeOffset[0] / 2) :
          ((parseInt(match[2]) * -1) + canvas[1]) - (sizeOffset[1] / 2);
      }
      return "";
    }

    setScroll(args, util) {
      const id = this.getListID(args.LIST, util);
      if (!id) return;
      let grid = document.querySelector(`div[data-id="${id}"] ${listDocs.grid}`);
      let spGrid = document.querySelector(`div[data-id="${id}"] [class^="SPstyLists-columnRender"`);
      const value = Scratch.Cast.toNumber(args.SCROLL) / 100;
      if (spGrid !== null) spGrid.scrollTop = value * (spGrid.scrollHeight - spGrid.clientHeight);
      else if (grid !== null) grid.scrollTop = value * (grid.scrollHeight - grid.clientHeight);
    }

    resetAll(args, util) {
      const id = this.getListID(args.LIST, util);
      if (!id || !this.isShowing(args, util)) return;
      const setVisible = (id, visible) => {
        runtime.monitorBlocks.changeBlock({ id: id, element: "checkbox", value: visible }, runtime);
      }
      const onVisUpdate = () => {
        runtime.once("AFTER_EXECUTE", () => { 
          setVisible(id, true);
          runtime.off("MONITORS_UPDATE", onVisUpdate);
        });
      };
      runtime.once("MONITORS_UPDATE", onVisUpdate);
      setVisible(id, false);
    }

    formatItems(args, util) {
      let listMon = this.getMonitor(args.LIST, util);
      if (!listMon) return;
      listMon = listMon.querySelector(listDocs.contain);
      if (listMon === null) return;
      const items = Array.from(listMon.querySelectorAll(`div[class^="${listDocs.value}"]`));
      items.forEach(item => { item.style.textAlign = args.ALIGN });
    }

    setDisplay(args, util) {
      const id = this.getListID(args.LIST, util);
      if (!id) return;
      let label;
      if (args.DISPLAY === "header") label = document.querySelector(`div[data-id="${id}"] ${listDocs.pkg1}[class^="${listDocs.head}"]`);
      else label = document.querySelector(`div[data-id="${id}"] ${listDocs.pkg1}[class^="${listDocs.foot}"] ${listDocs.span}`);
      if (label) label.textContent = args.NAME;
    }

    setColor(args, util) {
      const { id, listMon } = this.getMonitor(args.LIST, util, true);
      if (!listMon) return;
      const index = Math.max(0, Scratch.Cast.toNumber(args.NUM) - 1);
      const currentList = visualLists[id] || {};
      visualLists[id] = { ...currentList, util, colors: { ...currentList.colors, [index]: args.COLOR } };
      this.applyChanges(listMon, id);
    }

    setLabel(args, util) {
      const { id, listMon } = this.getMonitor(args.LIST, util, true);
      if (!listMon) return;
      const index = Math.max(0, Scratch.Cast.toNumber(args.NUM) - 1);
      const currentList = visualLists[id] || {};
      visualLists[id] = { ...currentList, util, labels: { ...currentList.labels, [index]: args.VALUE } };
      this.applyChanges(listMon, id);
    }

    setFont(args, util) {
      const listMon = this.getMonitor(args.LIST, util);
      if (listMon) listMon.style.fontFamily = args.FONT;
    }

    resetEffect(args, util) {
      const listMon = this.getMonitor(args.LIST, util);
      if (!listMon) return;
      let curTransform = listMon.style.transform || "";
      const matches = curTransform.match(/translate\(([^,]+),\s*([^)]+)\)/);
      let translation = matches ? `translate(${matches[1]}, ${matches[2]})` : "";
      listMon.style.transform = translation.replace(/scale\([^,]+,\s*[^)]+\)/g, "scale(1)");
      listMon.style.filter = "";
    }

    setEffect(args, util) {
      const listMon = this.getMonitor(args.LIST, util);
      if (!listMon) return;
      let curTransform = listMon.style.transform || "";
      let curFilter = listMon.style.filter || "";
      let effect = args.EFFECT, amountIn = Scratch.Cast.toNumber(args.AMOUNT);
      if (effect === "saturation") effect = "saturate";
      else if (effect === "hue") effect = "hue-rotate";
      else if (effect === "brightness") amountIn += 100;
      else if (effect === "skew x") effect = "skewX";
      else if (effect === "skew y") effect = "skewY";
      else if (effect === "direction") {
        effect = "rotate";
        amountIn -= 90;
      }
      const regex = new RegExp(`${effect}\\([^)]+\\)`, "g");
      curTransform = curTransform.replace(regex, "").trim();
      curFilter = curFilter.replace(regex, "").trim();
      if (effect === "rotate" || effect.includes("skew")) {
        curTransform += ` ${effect}(${amountIn}deg)`;
        listMon.style.transform = curTransform.trim();
      } else {
        curFilter += ` ${effect}(${amountIn}${effect === "blur" ? "px" : effect === "hue-rotate" ? "deg" : "%"})`;
        listMon.style.filter = curFilter.trim();
      }
    }

    stretchEffect(args, util) {
      const listMon = this.getMonitor(args.LIST, util);
      if (!listMon) return;
      let curTransform = listMon.style.transform || "";
      const scaleTxt = `scale(${Scratch.Cast.toNumber(args.x) / 100}, ${Scratch.Cast.toNumber(args.y) / 100})`;
      listMon.style.transform = `${curTransform.replace(/scale\([^)]*\)/g, "")} ${scaleTxt}`;
    }

    currentEffect(args, util) {
      const listMon = this.getMonitor(args.LIST, util);
      if (!listMon) return "";
      const effect = Scratch.Cast.toString(args.EFFECT);
      const curTransform = listMon.style.transform || "";
      const curFilter = listMon.style.filter || "";
      const setEffect = {
        saturation: "saturate", hue: "hue-rotate", direction: "rotate",
        "scale x": "scale", "scale y": "scale",
        brightness: "brightness", opacity: "opacity",
        "skew x": "skewX", "skew y": "skewY"
      }[effect] || effect;
      const defaultV = {
        saturation: 100, hue: 0, direction: 90,
        "scale x": 100, "scale y": 100,
        brightness: 0, opacity: 100
      }[effect] || 0;

      const regex = new RegExp(`${setEffect}\\(([^)]+)\\)`);
      const transformMatch = curTransform.match(regex);
      const filterMatch = curFilter.match(regex);
      if (filterMatch || transformMatch) {
        const unitVal = (filterMatch || transformMatch)[1];
        const pureVal = parseFloat(unitVal.replace(/[^0-9.-]/g, ""));
        if (setEffect === "brightness") return pureVal - 100;
        else if (setEffect === "rotate") return pureVal + 90;
        else if (setEffect === "scale") return unitVal.split(", ")[effect.includes("x") ? 0 : 1] * 100;
        else return pureVal
      } else { return defaultV }
    }
  }

  Scratch.extensions.register(new SPlistMonitors());
})(Scratch);
