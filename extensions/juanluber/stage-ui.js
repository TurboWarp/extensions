// Name: Stage UI
// ID: juanluberstageui
// Description: Create simple text inputs, buttons, and other UI controls over the stage.
// License: MPL-2.0

(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error(
      Scratch.translate("This extension must be run unsandboxed.")
    );
  }

  const runtime = Scratch.vm.runtime;

  // Capa overlay alineada al canvas del stage
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.left = "0";
  overlay.style.top = "0";
  overlay.style.width = "0";
  overlay.style.height = "0";
  overlay.style.pointerEvents = "none";
  overlay.style.zIndex = "999999";
  document.documentElement.appendChild(overlay);

  // Estado
  const ctrls = new Map(); // id -> {wrap, el, kind, meta}
  let lastId = "";
  let lastValue = "";
  let changeSeq = 0;

  // Para hats filtrados por ID
  const lastSeqSeenByHatId = new Map(); // id -> last seen seq

  function getCanvasRect() {
    const canvas = document.querySelector("canvas");
    if (!canvas) return null;
    const r = canvas.getBoundingClientRect();
    if (r.width <= 0 || r.height <= 0) return null;
    return r;
  }

  // Coordenadas en px lógicos del stage: 480x360, origen arriba-izquierda
  function stageToScreenRect(x, y, w, h) {
    const r = getCanvasRect();
    if (!r) return null;
    const scaleX = r.width / 480;
    const scaleY = r.height / 360;
    return {
      left: r.left + x * scaleX,
      top: r.top + y * scaleY,
      width: w * scaleX,
      height: h * scaleY,
    };
  }

  function styleBox(el, fontSize) {
    el.style.width = "100%";
    el.style.height = "100%";
    el.style.boxSizing = "border-box";
    el.style.border = "1px solid rgba(0,0,0,.25)";
    el.style.borderRadius = "10px";
    el.style.padding = "10px 12px";
    el.style.fontSize = (Number(fontSize) > 0 ? Number(fontSize) : 16) + "px";
    el.style.background = "rgba(255,255,255,.92)";
    el.style.outline = "none";
  }

  function makeWrap(id) {
    id = String(id);
    let item = ctrls.get(id);
    if (item) return item.wrap;

    const wrap = document.createElement("div");
    wrap.style.position = "fixed";
    wrap.style.pointerEvents = "auto";
    wrap.style.display = "block";
    wrap.dataset.domuiId = id;

    overlay.appendChild(wrap);
    ctrls.set(id, { wrap, el: null, kind: "", meta: {} });
    return wrap;
  }

  function setWrapRect(id, x, y, w, h) {
    const item = ctrls.get(String(id));
    if (!item) return;
    const sr = stageToScreenRect(x, y, w, h);
    if (!sr) return;
    item.wrap.style.left = `${sr.left}px`;
    item.wrap.style.top = `${sr.top}px`;
    item.wrap.style.width = `${sr.width}px`;
    item.wrap.style.height = `${sr.height}px`;
  }

  function bumpChange(id, value) {
    lastId = String(id ?? "");
    lastValue = String(value ?? "");
    changeSeq++;
    // Dispara el hat global (sin filtro)
    runtime.startHats("domui_whenAnyChanged");
    // Los hats filtrados por ID se evalúan por polling (return true) usando changeSeq
  }

  function registerCommonWrapMeta(id, x, y, w, h) {
    const item = ctrls.get(String(id));
    if (!item) return;
    item.meta.x = Number(x);
    item.meta.y = Number(y);
    item.meta.w = Number(w);
    item.meta.h = Number(h);
    setWrapRect(id, item.meta.x, item.meta.y, item.meta.w, item.meta.h);
  }

  // Reposicionamiento continuo para resize/zoom/fullscreen
  (function repositionLoop() {
    for (const [id, item] of ctrls.entries()) {
      const { x, y, w, h } = item.meta || {};
      if (
        typeof x === "number" &&
        typeof y === "number" &&
        typeof w === "number" &&
        typeof h === "number"
      ) {
        setWrapRect(id, x, y, w, h);
      }
    }
    requestAnimationFrame(repositionLoop);
  })();

  function createInput({ id, x, y, w, h, placeholder, value, fontSize }) {
    id = String(id);
    const wrap = makeWrap(id);
    wrap.innerHTML = "";

    const el = document.createElement("input");
    el.type = "text";
    el.placeholder = String(placeholder ?? "");
    el.value = String(value ?? "");
    styleBox(el, fontSize);

    el.addEventListener("input", () => bumpChange(id, el.value));
    el.addEventListener("change", () => bumpChange(id, el.value));

    wrap.appendChild(el);
    const item = ctrls.get(id);
    item.el = el;
    item.kind = "input";
    registerCommonWrapMeta(id, x, y, w, h);
  }

  function createTextarea({ id, x, y, w, h, placeholder, value, fontSize }) {
    id = String(id);
    const wrap = makeWrap(id);
    wrap.innerHTML = "";

    const el = document.createElement("textarea");
    el.placeholder = String(placeholder ?? "");
    el.value = String(value ?? "");
    el.style.resize = "none";
    styleBox(el, fontSize);

    el.addEventListener("input", () => bumpChange(id, el.value));
    el.addEventListener("change", () => bumpChange(id, el.value));

    wrap.appendChild(el);
    const item = ctrls.get(id);
    item.el = el;
    item.kind = "textarea";
    registerCommonWrapMeta(id, x, y, w, h);
  }

  function createSelect({ id, x, y, w, h, optionsCsv, value, fontSize }) {
    id = String(id);
    const wrap = makeWrap(id);
    wrap.innerHTML = "";

    const el = document.createElement("select");
    styleBox(el, fontSize);

    const parts = String(optionsCsv ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    for (const p of parts) {
      const opt = document.createElement("option");
      opt.value = p;
      opt.textContent = p;
      el.appendChild(opt);
    }

    if (value != null && value !== "") el.value = String(value);

    el.addEventListener("change", () => bumpChange(id, el.value));

    wrap.appendChild(el);
    const item = ctrls.get(id);
    item.el = el;
    item.kind = "select";
    registerCommonWrapMeta(id, x, y, w, h);
  }

  function createButton({ id, x, y, w, h, label, fontSize }) {
    id = String(id);
    const wrap = makeWrap(id);
    wrap.innerHTML = "";

    const el = document.createElement("button");
    el.textContent = String(label ?? "OK");
    // estilo tipo input, pero botón
    styleBox(el, fontSize);
    el.style.cursor = "pointer";

    el.addEventListener("click", () => bumpChange(id, "click"));

    wrap.appendChild(el);
    const item = ctrls.get(id);
    item.el = el;
    item.kind = "button";
    registerCommonWrapMeta(id, x, y, w, h);
  }

  function createCheckbox({ id, x, y, w, h, label, checked, fontSize }) {
    id = String(id);
    const wrap = makeWrap(id);
    wrap.innerHTML = "";

    const container = document.createElement("label");
    container.style.display = "flex";
    container.style.alignItems = "center";
    container.style.gap = "10px";
    container.style.width = "100%";
    container.style.height = "100%";
    container.style.boxSizing = "border-box";
    container.style.border = "1px solid rgba(0,0,0,.25)";
    container.style.borderRadius = "10px";
    container.style.padding = "10px 12px";
    container.style.background = "rgba(255,255,255,.92)";
    container.style.fontSize =
      (Number(fontSize) > 0 ? Number(fontSize) : 16) + "px";

    const el = document.createElement("input");
    el.type = "checkbox";
    el.checked = !!checked;

    const text = document.createElement("span");
    text.textContent = String(label ?? "");

    el.addEventListener("change", () => bumpChange(id, el.checked ? "1" : "0"));

    container.appendChild(el);
    container.appendChild(text);
    wrap.appendChild(container);

    const item = ctrls.get(id);
    item.el = el;
    item.kind = "checkbox";
    registerCommonWrapMeta(id, x, y, w, h);
  }

  function createRadioGroup({ id, x, y, w, h, optionsCsv, value, fontSize }) {
    id = String(id);
    const wrap = makeWrap(id);
    wrap.innerHTML = "";

    const box = document.createElement("div");
    box.style.width = "100%";
    box.style.height = "100%";
    box.style.boxSizing = "border-box";
    box.style.border = "1px solid rgba(0,0,0,.25)";
    box.style.borderRadius = "10px";
    box.style.padding = "10px 12px";
    box.style.background = "rgba(255,255,255,.92)";
    box.style.fontSize = (Number(fontSize) > 0 ? Number(fontSize) : 16) + "px";
    box.style.overflow = "auto";
    box.style.display = "flex";
    box.style.flexDirection = "column";
    box.style.gap = "8px";

    const parts = String(optionsCsv ?? "")
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const name = `domui_radio_${id}_${Math.random().toString(16).slice(2)}`;

    let current = value != null ? String(value) : "";
    for (const p of parts) {
      const row = document.createElement("label");
      row.style.display = "flex";
      row.style.alignItems = "center";
      row.style.gap = "10px";

      const r = document.createElement("input");
      r.type = "radio";
      r.name = name;
      r.value = p;
      r.checked = p === current;

      const t = document.createElement("span");
      t.textContent = p;

      r.addEventListener("change", () => {
        if (r.checked) bumpChange(id, r.value);
      });

      row.appendChild(r);
      row.appendChild(t);
      box.appendChild(row);
    }

    wrap.appendChild(box);
    const item = ctrls.get(id);
    item.el = box;
    item.kind = "radio";
    item.meta.radioName = name;
    registerCommonWrapMeta(id, x, y, w, h);
  }

  function setValue(id, value) {
    id = String(id);
    const item = ctrls.get(id);
    if (!item) return;

    if (
      item.kind === "input" ||
      item.kind === "textarea" ||
      item.kind === "select"
    ) {
      if (item.el) item.el.value = String(value ?? "");
    } else if (item.kind === "checkbox") {
      if (item.el)
        item.el.checked =
          String(value) === "1" || String(value).toLowerCase() === "true";
    } else if (item.kind === "radio") {
      // value = opción
      const wrap = item.wrap;
      const inputs = wrap.querySelectorAll(`input[type="radio"]`);
      for (const r of inputs) {
        r.checked = r.value === String(value);
      }
    } else if (item.kind === "button") {
      // no aplica
    }
  }

  function getValue(id) {
    id = String(id);
    const item = ctrls.get(id);
    if (!item) return "";

    if (
      item.kind === "input" ||
      item.kind === "textarea" ||
      item.kind === "select"
    ) {
      return item.el ? String(item.el.value ?? "") : "";
    }
    if (item.kind === "checkbox") {
      return item.el && item.el.checked ? "1" : "0";
    }
    if (item.kind === "radio") {
      const wrap = item.wrap;
      const checked = wrap.querySelector(`input[type="radio"]:checked`);
      return checked ? String(checked.value) : "";
    }
    if (item.kind === "button") {
      return ""; // botón no tiene valor
    }
    return "";
  }

  function focus(id) {
    id = String(id);
    const item = ctrls.get(id);
    if (!item) return;
    // Para radio, enfocamos el primer input
    if (item.kind === "radio") {
      const first = item.wrap.querySelector(`input[type="radio"]`);
      first?.focus();
      return;
    }
    item.el?.focus?.();
  }

  function show(id) {
    const item = ctrls.get(String(id));
    if (item) item.wrap.style.display = "block";
  }

  function hide(id) {
    const item = ctrls.get(String(id));
    if (item) item.wrap.style.display = "none";
  }

  function remove(id) {
    id = String(id);
    const item = ctrls.get(id);
    if (!item) return;
    item.wrap.remove();
    ctrls.delete(id);
  }

  function idsCsv() {
    return [...ctrls.keys()].join(",");
  }

  function valuesJson() {
    const obj = {};
    for (const id of ctrls.keys()) obj[id] = getValue(id);
    return JSON.stringify(obj);
  }

  class DomUI {
    getInfo() {
      return {
        id: "juanluberstageui",
        name: Scratch.translate("Stage UI"),
        blocks: [
          // Eventos
          {
            blockType: Scratch.BlockType.EVENT,
            opcode: "whenAnyChanged",
            text: Scratch.translate("when any UI changes"),
          },
          {
            blockType: Scratch.BlockType.HAT,
            opcode: "whenIdChanged",
            text: Scratch.translate("when UI [ID] changes"),
            isEdgeActivated: true,
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "name" },
            },
          },

          // Creación
          {
            opcode: "createInput",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "input [ID] x [X] y [Y] w [W] h [H] ph [PH] val [VAL] fs [FS]"
            ),
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "name" },
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 20 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 20 },
              W: { type: Scratch.ArgumentType.NUMBER, defaultValue: 260 },
              H: { type: Scratch.ArgumentType.NUMBER, defaultValue: 44 },
              PH: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("Type..."),
              },
              VAL: { type: Scratch.ArgumentType.STRING, defaultValue: "" },
              FS: { type: Scratch.ArgumentType.NUMBER, defaultValue: 16 },
            },
          },
          {
            opcode: "createTextarea",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "textarea [ID] x [X] y [Y] w [W] h [H] ph [PH] val [VAL] fs [FS]"
            ),
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "note" },
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 20 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 80 },
              W: { type: Scratch.ArgumentType.NUMBER, defaultValue: 360 },
              H: { type: Scratch.ArgumentType.NUMBER, defaultValue: 120 },
              PH: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("Text..."),
              },
              VAL: { type: Scratch.ArgumentType.STRING, defaultValue: "" },
              FS: { type: Scratch.ArgumentType.NUMBER, defaultValue: 16 },
            },
          },
          {
            opcode: "createSelect",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "select [ID] x [X] y [Y] w [W] h [H] opts [OPT] val [VAL] fs [FS]"
            ),
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "color" },
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 20 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 220 },
              W: { type: Scratch.ArgumentType.NUMBER, defaultValue: 220 },
              H: { type: Scratch.ArgumentType.NUMBER, defaultValue: 44 },
              OPT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Red,Green,Blue",
              },
              VAL: { type: Scratch.ArgumentType.STRING, defaultValue: "Green" },
              FS: { type: Scratch.ArgumentType.NUMBER, defaultValue: 16 },
            },
          },
          {
            opcode: "createButton",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "button [ID] x [X] y [Y] w [W] h [H] text [TXT] fs [FS]"
            ),
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "ok" },
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 260 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 220 },
              W: { type: Scratch.ArgumentType.NUMBER, defaultValue: 120 },
              H: { type: Scratch.ArgumentType.NUMBER, defaultValue: 44 },
              TXT: { type: Scratch.ArgumentType.STRING, defaultValue: "OK" },
              FS: { type: Scratch.ArgumentType.NUMBER, defaultValue: 16 },
            },
          },
          {
            opcode: "createCheckbox",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "checkbox [ID] x [X] y [Y] w [W] h [H] text [TXT] on? [CHK] fs [FS]"
            ),
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "agree" },
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 20 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 280 },
              W: { type: Scratch.ArgumentType.NUMBER, defaultValue: 260 },
              H: { type: Scratch.ArgumentType.NUMBER, defaultValue: 44 },
              TXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("I agree"),
              },
              CHK: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              FS: { type: Scratch.ArgumentType.NUMBER, defaultValue: 16 },
            },
          },
          {
            opcode: "createRadio",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "radio [ID] x [X] y [Y] w [W] h [H] opts [OPT] val [VAL] fs [FS]"
            ),
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "mode" },
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 300 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 20 },
              W: { type: Scratch.ArgumentType.NUMBER, defaultValue: 160 },
              H: { type: Scratch.ArgumentType.NUMBER, defaultValue: 160 },
              OPT: { type: Scratch.ArgumentType.STRING, defaultValue: "A,B,C" },
              VAL: { type: Scratch.ArgumentType.STRING, defaultValue: "A" },
              FS: { type: Scratch.ArgumentType.NUMBER, defaultValue: 16 },
            },
          },

          // Control de caja / visibilidad
          {
            opcode: "setPos",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set box [ID] x [X] y [Y] w [W] h [H]"),
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "name" },
              X: { type: Scratch.ArgumentType.NUMBER, defaultValue: 20 },
              Y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 20 },
              W: { type: Scratch.ArgumentType.NUMBER, defaultValue: 260 },
              H: { type: Scratch.ArgumentType.NUMBER, defaultValue: 44 },
            },
          },
          {
            opcode: "show",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("show [ID]"),
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "name" },
            },
          },
          {
            opcode: "hide",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("hide [ID]"),
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "name" },
            },
          },
          {
            opcode: "remove",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("remove [ID]"),
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "name" },
            },
          },
          {
            opcode: "focus",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("focus [ID]"),
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "name" },
            },
          },

          // Valores (más fácil)
          {
            opcode: "setValue",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("set [ID] to [VAL]"),
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "name" },
              VAL: { type: Scratch.ArgumentType.STRING, defaultValue: "" },
            },
          },
          {
            opcode: "getValue",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("value of [ID]"),
            arguments: {
              ID: { type: Scratch.ArgumentType.STRING, defaultValue: "name" },
            },
          },

          {
            opcode: "lastId",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("last ID"),
          },
          {
            opcode: "lastValue",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("last value"),
          },

          {
            opcode: "idsCsv",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("all IDs (CSV)"),
          },
          {
            opcode: "valuesJson",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("all values (JSON)"),
          },
        ],
      };
    }

    // Evento global: se dispara con startHats
    whenAnyChanged() {}

    // Hat filtrado por ID: edge activated
    whenIdChanged(args) {
      const id = String(args.ID ?? "");
      if (id === "" || lastId !== id) return false;
      const lastSeen = lastSeqSeenByHatId.get(id) || 0;
      if (changeSeq === lastSeen) return false;
      lastSeqSeenByHatId.set(id, changeSeq);
      return true;
    }

    createInput(args) {
      createInput({
        id: args.ID,
        x: args.X,
        y: args.Y,
        w: args.W,
        h: args.H,
        placeholder: args.PH,
        value: args.VAL,
        fontSize: args.FS,
      });
    }
    createTextarea(args) {
      createTextarea({
        id: args.ID,
        x: args.X,
        y: args.Y,
        w: args.W,
        h: args.H,
        placeholder: args.PH,
        value: args.VAL,
        fontSize: args.FS,
      });
    }
    createSelect(args) {
      createSelect({
        id: args.ID,
        x: args.X,
        y: args.Y,
        w: args.W,
        h: args.H,
        optionsCsv: args.OPT,
        value: args.VAL,
        fontSize: args.FS,
      });
    }
    createButton(args) {
      createButton({
        id: args.ID,
        x: args.X,
        y: args.Y,
        w: args.W,
        h: args.H,
        label: args.TXT,
        fontSize: args.FS,
      });
    }
    createCheckbox(args) {
      createCheckbox({
        id: args.ID,
        x: args.X,
        y: args.Y,
        w: args.W,
        h: args.H,
        label: args.TXT,
        checked: Number(args.CHK) !== 0,
        fontSize: args.FS,
      });
    }
    createRadio(args) {
      createRadioGroup({
        id: args.ID,
        x: args.X,
        y: args.Y,
        w: args.W,
        h: args.H,
        optionsCsv: args.OPT,
        value: args.VAL,
        fontSize: args.FS,
      });
    }

    setPos(args) {
      registerCommonWrapMeta(args.ID, args.X, args.Y, args.W, args.H);
    }
    show(args) {
      show(args.ID);
    }
    hide(args) {
      hide(args.ID);
    }
    remove(args) {
      remove(args.ID);
    }
    focus(args) {
      focus(args.ID);
    }

    setValue(args) {
      setValue(args.ID, args.VAL);
    }
    getValue(args) {
      return getValue(args.ID);
    }

    lastId() {
      return lastId;
    }
    lastValue() {
      return lastValue;
    }

    idsCsv() {
      return idsCsv();
    }
    valuesJson() {
      return valuesJson();
    }
  }

  Scratch.extensions.register(new DomUI());
})(Scratch);
