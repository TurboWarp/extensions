// Name: Input Boxes
// ID: inputboxes
// Description: A simple way to add better input boxes to your project!
// By: Zhuziexe
// License: MPL-2.0

class InputBoxExtension {
    constructor() {
        this.inputs = new Map(); 
	    this.container = null; 
	    this._lastEnterId = null; 
	    this._resizeTimer = null;
	
        this._updatePending = false; this._bindDocumentEvents(); 
	    this._bindResizeAndFullscreen(); 

	    this._observeCanvas();
        this._observeModals();
	
        setTimeout(() => this._updateAllInputs(), 100);
    }

    _observeModals() {
        this._checkModalOpen();
        const observer = new MutationObserver(() => {
            this._checkModalOpen();
        });
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['class', 'style']
        });
        this._modalObserver = observer;
    }

    _checkModalOpen() {
        if (!this.container) return;
        const modalSelectors = [
            '.modal', '.ReactModalPortal', '.ReactModal__Overlay',
            '.ReactModal__Content', '.modal-content', '.dialog',
            '[role="dialog"]', '[role="modal"]'
        ];
        let hasModal = false;
        for (const sel of modalSelectors) {
            if (document.querySelector(sel)) {
                hasModal = true;
                break;
            }
        }
        this.container.style.display = hasModal ? 'none' : 'block';
    }

    _bindDocumentEvents() {
        if (this._bound) return;
        this._bound = true;

        document.addEventListener('keydown', (e) => {
            const target = e.target;
            if (target && target.dataset && target.dataset.inputBoxId) {
                const id = target.dataset.inputBoxId;
                const meta = this.inputs.get(id);
                if (!meta) return;

                if (e.key === 'Enter' && !e.shiftKey) {
                    const mode = meta.enterMode || 'both';
                    let trigger = false, prevent = false;
                    switch (mode) {
                        case 'trigger': trigger = true; prevent = true; break;
                        case 'newline': trigger = false; prevent = false; break;
                        case 'both': trigger = true; prevent = false; break;
                        default: trigger = true; prevent = false;
                    }
                    if (prevent) e.preventDefault();

                    if (trigger) {
                        this._lastEnterId = id;
                        const fullOpcode = 'inputboxes_eventOnEnter';
                        this._safeStartHats(fullOpcode);
                    }
                }
            }
        }, true);
    }

    _safeStartHats(opcode) {
        const runtime = Scratch && Scratch.vm && Scratch.vm.runtime;
        if (!runtime) {
            setTimeout(() => this._safeStartHats(opcode), 100);
            return;
        }
        if (!runtime._cache) {
            try { const scripts = runtime.scripts; } catch (e) {}
            if (!runtime._cache) runtime._cache = {};
        }
        try {
            runtime.startHats(opcode);
        } catch (e) {
            setTimeout(() => {
                if (runtime._cache) {
                    try { runtime.startHats(opcode); } catch (ex) {}
                }
            }, 50);
        }
    }

    _bindResizeAndFullscreen() {
        const events = ['resize', 'fullscreenchange', 'webkitfullscreenchange'];
        const handler = () => {
            if (this._resizeTimer) clearTimeout(this._resizeTimer);
            this._resizeTimer = setTimeout(() => {
                this._updateAllInputs();
                this._checkModalOpen();
                this._resizeTimer = null;
            }, 50);
        };
        for (const ev of events) {
            window.addEventListener(ev, handler);
        }
        this._resizeHandler = handler;
    }

    _observeCanvas() {
        const canvas = document.querySelector('canvas');
        if (!canvas) return;
        const observer = new MutationObserver(() => {
            if (!this._updatePending) {
                this._updatePending = true;
                requestAnimationFrame(() => {
                    this._updateAllInputs();
                    this._updatePending = false;
                });
            }
        });
        observer.observe(canvas, {
            attributes: true,
            attributeFilter: ['style', 'class', 'width', 'height'],
            subtree: false
        });
        this._canvasObserver = observer;
        const parent = canvas.parentElement;
        if (parent) {
            const parentObserver = new MutationObserver(() => {
                if (!this._updatePending) {
                    this._updatePending = true;
                    requestAnimationFrame(() => {
                        this._updateAllInputs();
                        this._updatePending = false;
                    });
                }
            });
            parentObserver.observe(parent, {
                attributes: true,
                attributeFilter: ['style', 'class'],
                subtree: false
            });
            this._parentObserver = parentObserver;
        }
    }

    _updateAllInputs() {
        if (this.inputs.size === 0) return;
        const canvas = document.querySelector('canvas');
        if (!canvas) return;
        const container = this.getContainer();
        if (!container) return;

        const rect = canvas.getBoundingClientRect();
        const scale = rect.width / 480;

        for (const [id, meta] of this.inputs) {
            if (!meta.element) continue;
            const el = meta.element;
            const left = meta.logicX * scale + rect.width / 2;
            const top = rect.height / 2 - meta.logicY * scale;
            el.style.left = left + 'px';
            el.style.top = top + 'px';
            el.style.width = (meta.logicWidth * scale) + 'px';
            el.style.height = (meta.logicHeight * scale) + 'px';
        }
        this._checkModalOpen();
    }

    getContainer() {
        const canvas = document.querySelector('canvas');
        if (!canvas) {
            if (!this.container) {
                const container = document.createElement('div');
                container.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;overflow:hidden;z-index:1000';
                document.body.appendChild(container);
                this.container = container;
            }
            return this.container;
        }

        const parent = canvas.parentElement;
        if (getComputedStyle(parent).position === 'static') {
            parent.style.position = 'relative';
        }

        if (this.container && this.container.parentElement !== parent) {
            this.container.remove();
            this.container = null;
        }

        if (!this.container) {
            const container = document.createElement('div');
            container.id = 'tw-input-box-container';
            container.style.position = 'absolute';
            container.style.top = '0';
            container.style.left = '0';
            container.style.pointerEvents = 'none';
            container.style.overflow = 'hidden';
            container.style.zIndex = '1000';
            parent.appendChild(container);
            this.container = container;
        }

        const rect = canvas.getBoundingClientRect();
        const parentRect = parent.getBoundingClientRect();
        this.container.style.left = (rect.left - parentRect.left) + 'px';
        this.container.style.top = (rect.top - parentRect.top) + 'px';
        this.container.style.width = rect.width + 'px';
        this.container.style.height = rect.height + 'px';

        this._checkModalOpen();
        return this.container;
    }

    cmdRefreshLayout() {
        this._updateAllInputs();
    }

    _createInputElement(type) {
        const isMulti = (type === 'multiline');
        const el = isMulti ? document.createElement('textarea') : document.createElement('input');
        if (!isMulti) el.type = 'text';
        el.style.cssText =
            'position:absolute;box-sizing:border-box;border:1px solid #000;outline:none;background:#fff;padding:4px;font-size:14px;pointer-events:auto;z-index:1001;border-radius:2px;' +
            (isMulti ? 'resize:none;font-family:sans-serif;' : '');
        return el;
    }

    _getOrCreateInput(id, type = 'single') {
        let meta = this.inputs.get(id);
        if (!meta) {
            const el = this._createInputElement(type);
            el.dataset.inputBoxId = id;
            const container = this.getContainer();
            if (container) container.appendChild(el);
            meta = {
                element: el,
                type: type,
                interactive: true,
                borderVisible: true,
                enterMode: 'both',
                bgColor: '#ffffff',
                logicX: 0,
                logicY: 0,
                logicWidth: 120,
                logicHeight: 30
            };
            this.inputs.set(id, meta);
        }
        return meta;
    }

    _applyMeta(meta) {
        if (!meta || !meta.element) return;
        const el = meta.element;
        try {
            el.style.border = meta.borderVisible ? '1px solid #000' : 'none';
            el.disabled = !meta.interactive;
        } catch (e) {}
    }

    _switchType(id, newType) {
        const meta = this.inputs.get(id);
        if (!meta || meta.type === newType) return;
        const old = meta.element;
        const backup = {
            value: old.value || '',
            left: old.style.left || '0px',
            top: old.style.top || '0px',
            width: old.style.width || '120px',
            height: old.style.height || '30px',
            bg: old.style.backgroundColor || '#ffffff',
            placeholder: old.placeholder || ''
        };
        old.remove();

        const el = this._createInputElement(newType);
        el.dataset.inputBoxId = id;
        el.value = backup.value;
        el.style.left = backup.left;
        el.style.top = backup.top;
        el.style.width = backup.width;
        el.style.height = backup.height;
        el.style.backgroundColor = backup.bg;
        el.placeholder = backup.placeholder;

        meta.element = el;
        meta.type = newType;
        meta.bgColor = backup.bg;
        this._applyMeta(meta);
        const container = this.getContainer();
        if (container) container.appendChild(el);
        this._updateAllInputs();
    }
    cmdCreateOrMove(args) {
        try {
            const { ID, X, Y, WIDTH, HEIGHT } = args;
            const meta = this._getOrCreateInput(ID, 'single');
            meta.logicX = X;
            meta.logicY = Y;
            meta.logicWidth = WIDTH;
            meta.logicHeight = HEIGHT;
            this._updateAllInputs();
            this._applyMeta(meta);
        } catch (e) {}
    }

    cmdDeleteAll() {
        try {
            for (const [id, meta] of this.inputs) if (meta.element) meta.element.remove();
            this.inputs.clear();
        } catch (e) {}
    }

    cmdDeleteById(args) {
        try {
            const { ID } = args;
            const meta = this.inputs.get(ID);
            if (meta) {
                if (meta.element) meta.element.remove();
                this.inputs.delete(ID);
            }
        } catch (e) {}
    }

    cmdSetBorder(args) {
        try {
            const { ID, VISIBILITY } = args;
            const meta = this.inputs.get(ID);
            if (meta) {
                meta.borderVisible = (VISIBILITY === 'visible');
                this._applyMeta(meta);
            }
        } catch (e) {}
    }

    cmdSetBg(args) {
        try {
            const { ID, BG_COLOR } = args;
            const meta = this.inputs.get(ID);
            if (meta && meta.element) {
                meta.element.style.backgroundColor = BG_COLOR;
                meta.bgColor = BG_COLOR;
            }
        } catch (e) {}
    }

    repTransparent() { return 'transparent'; }

    cmdSetValue(args) {
        try {
            const { ID, CONTENT } = args;
            const meta = this.inputs.get(ID);
            if (meta && meta.element) meta.element.value = CONTENT;
        } catch (e) {}
    }

    cmdSetHint(args) {
        try {
            const { ID, HINT } = args;
            const meta = this.inputs.get(ID);
            if (meta && meta.element) meta.element.placeholder = HINT;
        } catch (e) {}
    }

    repGetValue(args) {
        try {
            const { ID } = args;
            const meta = this.inputs.get(ID);
            return (meta && meta.element) ? meta.element.value : '';
        } catch (e) { return ''; }
    }

    repGetAllIds() {
        try {
            return JSON.stringify(Array.from(this.inputs.keys()));
        } catch (e) { return '[]'; }
    }

    boolExists(args) {
        try {
            const { ID } = args;
            return this.inputs.has(ID);
        } catch (e) { return false; }
    }

    repLastEnteredId() {
        return this._lastEnterId || '';
    }

    cmdFocus(args) {
        try {
            const { ID } = args;
            const meta = this.inputs.get(ID);
            if (meta && meta.element) {
                if (meta.element.disabled) {
                    meta.element.disabled = false;
                    meta.interactive = true;
                }
                meta.element.focus();
                meta.element.select();
            }
        } catch (e) {}
    }

    cmdSetMode(args) {
        try {
            const { ID, MODE } = args;
            if (MODE === 'single' || MODE === 'multiline') this._switchType(ID, MODE);
        } catch (e) {}
    }

    cmdSetEnabled(args) {
        try {
            const { ID, STATE } = args;
            const meta = this.inputs.get(ID);
            if (meta) {
                meta.interactive = (STATE === 'enabled');
                this._applyMeta(meta);
            }
        } catch (e) {}
    }

    queryBorderVisible(args) {
        try {
            const { ID } = args;
            const meta = this.inputs.get(ID);
            return meta ? meta.borderVisible : false;
        } catch (e) { return false; }
    }

    queryInteractive(args) {
        try {
            const { ID } = args;
            const meta = this.inputs.get(ID);
            return meta ? meta.interactive : false;
        } catch (e) { return false; }
    }

    queryIsMultiline(args) {
        try {
            const { ID } = args;
            const meta = this.inputs.get(ID);
            return meta ? (meta.type === 'multiline') : false;
        } catch (e) { return false; }
    }

    repNewline() { return '\n'; }

    cmdSetEnterAction(args) {
        try {
            const { ID, MODE } = args;
            const meta = this.inputs.get(ID);
            if (meta && ['trigger', 'newline', 'both'].includes(MODE)) meta.enterMode = MODE;
        } catch (e) {}
    }

    queryEnterAction(args) {
        try {
            const { ID, MODE } = args;
            const meta = this.inputs.get(ID);
            return meta ? (meta.enterMode === MODE) : false;
        } catch (e) { return false; }
    }

    eventOnEnter() {}

    //--------------------------------------------------------------------------------

    getInfo() {
        const BT = Scratch.BlockType;

        //Easier function to translate
        const tr = (defaultText, desc = '') => {
            if (typeof Scratch.translate === 'function') {
                return Scratch.translate({ default: defaultText, description: desc });
            }
            return defaultText;
        };

        return {
            id: 'inputboxes',
            name: tr('Input Boxes'),
            menus: {
                visibilityMenu: {
                    items: [
                        { text: tr('visible'), value: 'visible' },
                        { text: tr('hidden'), value: 'hidden' }
                    ]
                },
                typeMenu: {
                    items: [
                        { text: tr('single line'), value: 'single' },
                        { text: tr('multiline'), value: 'multiline' }
                    ]
                },
                stateMenu: {
                    items: [
                        { text: tr('enabled'), value: 'enabled' },
                        { text: tr('disabled'), value: 'disabled' }
                    ]
                },
                enterModeMenu: {
                    items: [
                        { text: tr('trigger event only'), value: 'trigger' },
                        { text: tr('newline only (no event)'), value: 'newline' },
                        { text: tr('both trigger and newline'), value: 'both' }
                    ]
                }
            },
            blocks: [
                //BT.COMMAND Blocks
                {
                    opcode: 'cmdCreateOrMove',
                    blockType: BT.COMMAND,
                    text: tr('create/move input box ID: [ID] x: [X] y: [Y] width: [WIDTH] height: [HEIGHT]',
                        'ID is the unique identifier for the input box.'),
                    arguments: {
                        ID: { type: 'string', defaultValue: 'inputbox' },
                        X: { type: 'number', defaultValue: 0 },
                        Y: { type: 'number', defaultValue: 0 },
                        WIDTH: { type: 'number', defaultValue: 120 },
                        HEIGHT: { type: 'number', defaultValue: 30 }
                    }
                },
                {
                    opcode: 'cmdDeleteAll',
                    blockType: BT.COMMAND,
                    text: tr('delete all input boxes')
                },
                {
                    opcode: 'cmdDeleteById',
                    blockType: BT.COMMAND,
                    text: tr('delete input box with ID [ID]'),
                    arguments: { ID: { type: 'string', defaultValue: 'inputbox' } }
                },
                {
                    opcode: 'cmdSetBorder',
                    blockType: BT.COMMAND,
                    text: tr('set border of input box [ID] to [VISIBILITY]'),
                    arguments: {
                        ID: { type: 'string', defaultValue: 'inputbox' },
                        VISIBILITY: { type: 'string', menu: 'visibilityMenu', defaultValue: 'visible' }
                    }
                },
                {
                    opcode: 'cmdSetBg',
                    blockType: BT.COMMAND,
                    text: tr('set background color of input box [ID] to [BG_COLOR]'),
                    arguments: {
                        ID: { type: 'string', defaultValue: 'inputbox' },
                        BG_COLOR: { type: 'color', defaultValue: '#ffffff' }
                    }
                },
                {
                    opcode: 'cmdSetValue',
                    blockType: BT.COMMAND,
                    text: tr('set input box [ID] value to [CONTENT]'),
                    arguments: {
                        ID: { type: 'string', defaultValue: 'inputbox' },
                        CONTENT: { type: 'string', defaultValue: '' }
                    }
                },
                {
                    opcode: 'cmdSetHint',
                    blockType: BT.COMMAND,
                    text: tr('set input box [ID] hint to [HINT]'),
                    arguments: {
                        ID: { type: 'string', defaultValue: 'inputbox' },
                        HINT: { type: 'string', defaultValue: '' }
                    }
                },
                {
                    opcode: 'cmdFocus',
                    blockType: BT.COMMAND,
                    text: tr('focus input box [ID]'),
                    arguments: { ID: { type: 'string', defaultValue: 'inputbox' } }
                },
                {
                    opcode: 'cmdSetMode',
                    blockType: BT.COMMAND,
                    text: tr('set input box [ID] to [MODE]'),
                    arguments: {
                        ID: { type: 'string', defaultValue: 'inputbox' },
                        MODE: { type: 'string', menu: 'typeMenu', defaultValue: 'single' }
                    }
                },
                {
                    opcode: 'cmdSetEnabled',
                    blockType: BT.COMMAND,
                    text: tr('set input box [ID] interactive to [STATE]'),
                    arguments: {
                        ID: { type: 'string', defaultValue: 'inputbox' },
                        STATE: { type: 'string', menu: 'stateMenu', defaultValue: 'enabled' }
                    }
                },
                {
                    opcode: 'cmdSetEnterAction',
                    blockType: BT.COMMAND,
                    text: tr('when Enter pressed on input box [ID], do [MODE]in multiline mode'),
                    arguments: {
                        ID: { type: 'string', defaultValue: 'inputbox' },
                        MODE: { type: 'string', menu: 'enterModeMenu', defaultValue: 'both' }
                    }
                },
                { 
                    blockType: 'label', 
                    text: tr('If set to trigger event, use Shift+Enter for newline') 
                },
                {
                    opcode: 'cmdRefreshLayout',
                    blockType: BT.COMMAND,
                    text: tr('refresh input box layout')
                },
                //BT.REPORTER Blocks
                {
                    opcode: 'repTransparent',
                    blockType: BT.REPORTER,
                    text: tr('transparent')
                },
                {
                    opcode: 'repGetValue',
                    blockType: BT.REPORTER,
                    text: tr('value of input box [ID]'),
                    arguments: { ID: { type: 'string', defaultValue: 'inputbox' } }
                },
                {
                    opcode: 'repGetAllIds',
                    blockType: BT.REPORTER,
                    text: tr('all input boxes (JSON array)')
                },
                {
                    opcode: 'repLastEnteredId',
                    blockType: BT.REPORTER,
                    text: tr('the ID of the input box where Enter was pressed')
                },
                {
                    opcode: 'repNewline',
                    blockType: BT.REPORTER,
                    text: tr('newline')
                },
                //BT.BOOLEAN Blocks
                {
                    opcode: 'boolExists',
                    blockType: BT.BOOLEAN,
                    text: tr('does input box [ID] exist?'),
                    arguments: { ID: { type: 'string', defaultValue: 'inputbox' } }
                },
                {
                    opcode: 'queryBorderVisible',
                    blockType: BT.BOOLEAN,
                    text: tr('is border of input box [ID] visible?'),
                    arguments: { ID: { type: 'string', defaultValue: 'inputbox' } }
                },
                {
                    opcode: 'queryInteractive',
                    blockType: BT.BOOLEAN,
                    text: tr('is input box [ID] interactive?'),
                    arguments: { ID: { type: 'string', defaultValue: 'inputbox' } }
                },
		        {
                    opcode: 'queryIsMultiline',
                    blockType: BT.BOOLEAN,
                    text: tr('is input box [ID] multiline?'),
                    arguments: { ID: { type: 'string', defaultValue: 'inputbox' } }
                },
		        {
                    opcode: 'queryEnterAction',
                    blockType: BT.BOOLEAN,
                    text: tr('when Enter pressed on input box [ID], is the mode [MODE]?'),
                    arguments: {
                        ID: { type: 'string', defaultValue: 'inputbox' },
                        MODE: { type: 'string', menu: 'enterModeMenu', defaultValue: 'both' }
                    }
                },
		        {
                    opcode: 'eventOnEnter',
                    blockType: BT.EVENT,
                    text: tr('when user presses Enter on an input box'),
                    isEdgeActivated: false
                }
            ]
        };
    }
}

Scratch.extensions.register(new InputBoxExtension());