//This is a port of the 'IFrame' extension from https://penguinmod.site/ .
//Credits to JeremyGamer13 for the original extension and TheShovel for porting it.

const EffectOptions = {
	acceptReporters: true,
	items: [{
			text: "color",
			value: "color"
		},
		{
			text: "grayscale",
			value: "grayscale"
		},
		{
			text: "brightness",
			value: "brightness"
		},
		{
			text: "contrast",
			value: "contrast"
		},
		{
			text: "ghost",
			value: "ghost"
		},
		{
			text: "blur",
			value: "blur"
		},
		{
			text: "invert",
			value: "invert"
		},
		{
			text: "saturate",
			value: "saturate"
		},
		{
			text: "sepia",
			value: "sepia"
		}
	]
};

const urlToReportUrl = (url) => {
	const split = String(url).split('://');
	let idx = 1;
	if (split.length <= 1) {
		idx = 0;
	}
	const afterProtoc = split[idx];
	if (!afterProtoc) return '';
	const urlSplit = afterProtoc.split(/[?#&\/\\]+/gmi);
	return urlSplit[0];
};

// to avoid taking 1290 years for each url set
// we save the ones that we already checked
const safeOriginUrls = {};

/**
 * uhhhhhhhhhh
 * @param {Array} array the array
 * @param {*} value the value
 * @returns {Object} an object
 */
const ArrayToValue = (array, value) => {
	const object = {};
	array.forEach(item => {
		object[String(item)] = value;
	});
	return object;
};

const isUrlRatedSafe = (url) => {
	return new Promise((resolve) => {
		const saveUrl = urlToReportUrl(url);
		if (safeOriginUrls.hasOwnProperty(saveUrl)) {
			return resolve(safeOriginUrls[saveUrl]);
		}

		fetch(`https://pm-bapi.vercel.app/api/safeurl?url=${url}`).then(res => {
			if (!res.ok) {
				resolve(true);
				return;
			}
			res.json().then(status => {
				safeOriginUrls[saveUrl] = status.safe;
				resolve(status.safe);
			}).catch(() => resolve(true));
		}).catch(() => resolve(true));
	})
}

/**
 * Class for IFRAME blocks
 * @constructor
 */
class JgIframeBlocks {
	constructor(runtime) {
		/**
		 * The runtime instantiating this block package.
		 * @type {Runtime}
		 */
		this.runtime = runtime;
		this.createdIframe = null;
		this.iframeSettings = {
			x: 0,
			y: 0,
			rotation: 90,
			width: 480,
			height: 360
		};
		this.iframeFilters = ArrayToValue(EffectOptions.items.map(item => item.value), 0);
		this.iframeLoadedValue = false;
		this.permission_AllowedWebsites = [];
		this.displayWebsiteUrl = "";
		// stop button clicked so delete the iframe
		this.RemoveIFrame();;
	}

	/**
	 * dummy function for reseting user provided permisions when a save is loaded
	 */
	deserialize() {
		this.permission_AllowedWebsites = [];
	}

	/**
	 * @returns {object} metadata for this extension and its blocks.
	 */
	getInfo() {
		return {
			id: 'jgIframe',
			name: 'IFrame',
			color1: '#F36518',
			color2: '#E64D18',
			blocks: [{
					opcode: 'createIframeElement',
					text: 'set new iframe',
					blockType: Scratch.BlockType.COMMAND
				},
				{
					opcode: 'deleteIframeElement',
					text: 'delete iframe',
					blockType: Scratch.BlockType.COMMAND
				},
				{
					opcode: 'iframeElementExists',
					text: 'iframe exists?',
					blockType: Scratch.BlockType.BOOLEAN
				},
				"---",
				"---",
				{
					opcode: 'whenIframeIsLoaded',
					text: 'when iframe loads site',
					blockType: Scratch.BlockType.HAT
				},
				{
					opcode: 'setIframeUrl',
					text: 'set iframe url to [URL]',
					blockType: Scratch.BlockType.COMMAND,
					arguments: {
						URL: {
							type: Scratch.ArgumentType.STRING,
							defaultValue: "https://www.example.com"
						}
					}
				},
				{
					opcode: 'setIframePosLeft',
					text: 'set iframe x to [X]',
					blockType: Scratch.BlockType.COMMAND,
					arguments: {
						X: {
							type: Scratch.ArgumentType.NUMBER,
							defaultValue: 0
						}
					}
				},
				{
					opcode: 'setIframePosTop',
					text: 'set iframe y to [Y]',
					blockType: Scratch.BlockType.COMMAND,
					arguments: {
						Y: {
							type: Scratch.ArgumentType.NUMBER,
							defaultValue: 0
						}
					}
				},
				{
					opcode: 'setIframeSizeWidth',
					text: 'set iframe width to [WIDTH]',
					blockType: Scratch.BlockType.COMMAND,
					arguments: {
						WIDTH: {
							type: Scratch.ArgumentType.NUMBER,
							defaultValue: 480
						}
					}
				},
				{
					opcode: 'setIframeSizeHeight',
					text: 'set iframe height to [HEIGHT]',
					blockType: Scratch.BlockType.COMMAND,
					arguments: {
						HEIGHT: {
							type: Scratch.ArgumentType.NUMBER,
							defaultValue: 360
						}
					}
				},
				{
					opcode: 'setIframeRotation',
					text: 'point iframe in direction [ROTATE]',
					blockType: Scratch.BlockType.COMMAND,
					arguments: {
						ROTATE: {
							type: Scratch.ArgumentType.ANGLE,
							defaultValue: 90
						}
					}
				},
				{
					opcode: 'showIframeElement',
					text: 'show iframe',
					blockType: Scratch.BlockType.COMMAND
				},
				{
					opcode: 'hideIframeElement',
					text: 'hide iframe',
					blockType: Scratch.BlockType.COMMAND
				},
				{
					opcode: 'getIframeLeft',
					text: 'iframe x',
					blockType: Scratch.BlockType.REPORTER
				},
				{
					opcode: 'getIframeTop',
					text: 'iframe y',
					blockType: Scratch.BlockType.REPORTER
				},
				{
					opcode: 'getIframeWidth',
					text: 'iframe width',
					blockType: Scratch.BlockType.REPORTER
				},
				{
					opcode: 'getIframeHeight',
					text: 'iframe height',
					blockType: Scratch.BlockType.REPORTER
				},
				{
					opcode: 'getIframeRotation',
					text: 'iframe rotation',
					blockType: Scratch.BlockType.REPORTER
				},
				{
					opcode: 'getIframeTargetUrl',
					text: 'iframe target url',
					blockType: Scratch.BlockType.REPORTER
				},
				{
					opcode: 'iframeElementIsHidden',
					text: 'iframe is hidden?',
					blockType: Scratch.BlockType.BOOLEAN
				},
				"---",
				"---",
				// effects YAYYAYAWOOHOOO YEEAAAAAAAAA
				{
					opcode: 'iframeElementSetEffect',
					text: 'set [EFFECT] effect on iframe to [AMOUNT]',
					blockType: Scratch.BlockType.COMMAND,
					arguments: {
						EFFECT: {
							type: Scratch.ArgumentType.STRING,
							menu: 'effects',
							defaultValue: "color"
						},
						AMOUNT: {
							type: Scratch.ArgumentType.NUMBER,
							defaultValue: 0
						}
					}
				},
				{
					opcode: 'iframeElementChangeEffect',
					text: 'change [EFFECT] effect on iframe by [AMOUNT]',
					blockType: Scratch.BlockType.COMMAND,
					arguments: {
						EFFECT: {
							type: Scratch.ArgumentType.STRING,
							menu: 'effects',
							defaultValue: "color"
						},
						AMOUNT: {
							type: Scratch.ArgumentType.NUMBER,
							defaultValue: 25
						}
					}
				},
				{
					opcode: 'iframeElementClearEffects',
					text: 'clear iframe effects',
					blockType: Scratch.BlockType.COMMAND
				},
				{
					opcode: 'getIframeEffectAmount',
					text: 'iframe [EFFECT]',
					blockType: Scratch.BlockType.REPORTER,
					arguments: {
						EFFECT: {
							type: Scratch.ArgumentType.STRING,
							menu: 'effects',
							defaultValue: "color"
						}
					}
				},
				"---"
			],
			menus: {
				effects: EffectOptions
			}
		};
	}

	// utilities
	GetCurrentCanvas() {
		return vm.runtime.renderer.canvas;
	}
	SetNewIFrame() {
		const iframe = document.createElement("iframe");
		iframe.onload = () => {
			this.iframeLoadedValue = true;
		};
		this.createdIframe = iframe;
		return iframe;
	}
	RemoveIFrame() {
		if (this.createdIframe) {
			this.createdIframe.remove();
			this.createdIframe = null;
		}
	}
	GetIFrameState() {
		if (this.createdIframe) {
			return true;
		}
		return false;
	}
	SetIFramePosition(iframe, x, y, width, height, rotation) {
		const frame = iframe;
		const stage = {
			width: 480,
			height: 360
		};
		frame.style.position = "absolute"; // position above canvas without pushing it down
		frame.style.width = `${(width / stage.width) * 100}%`; // convert pixel size to percentage for full screen
		frame.style.height = `${(height / stage.height) * 100}%`;
		frame.style.transformOrigin = "center center"; // rotation and translation begins at center

		let xpos = x + (stage.width - width);
		let ypos = y - (stage.height - height);
		xpos = ((xpos / stage.width) * 100);
		ypos = (((0 - ypos) / stage.height) * 100);

		// epic maths to place x and y at the center
		frame.style.transform = `translate(${xpos}%, ${ypos}%) rotate(${rotation - 90}deg)`;
		this.iframeSettings = {
			x: x,
			y: y,
			rotation: rotation,
			width: width,
			height: height
		};

		// when switching between project page & editor, we need to place the iframe again since it gets lost
		if (iframe.parentElement !== this.GetCurrentCanvas().parentElement) {
			/* todo: create layers so that iframe appears above 3d every time this is done */
			this.GetCurrentCanvas().parentElement.prepend(iframe);
		}
	}
	GenerateCssFilter(color, grayscale, brightness, contrast, ghost, blur, invert, saturate, sepia) {
		return `hue-rotate(${(color / 200) * 360}deg) ` + // scratch color effect goes back to normal color at 200
			`grayscale(${grayscale}%) ` +
			`brightness(${brightness + 100}%) ` + // brightness at 0 will be 100
			`contrast(${contrast + 100}%) ` + // same thing here
			`opacity(${100 - ghost}%) ` + // opacity at 0 will be 100 but opacity at 100 will be 0
			`blur(${blur}px) ` +
			`invert(${invert}%) ` + // invert is actually a percentage lolol!
			`saturate(${saturate + 100}%) ` + // saturation at 0 will be 100
			`sepia(${sepia}%)`;
	}
	ApplyFilterOptions(iframe) {
		iframe.style.filter = this.GenerateCssFilter(
			this.iframeFilters.color,
			this.iframeFilters.grayscale,
			this.iframeFilters.brightness,
			this.iframeFilters.contrast,
			this.iframeFilters.ghost,
			this.iframeFilters.blur,
			this.iframeFilters.invert,
			this.iframeFilters.saturate,
			this.iframeFilters.sepia,
		);
	}

	createIframeElement() {
		this.RemoveIFrame();
		const iframe = this.SetNewIFrame();
		iframe.style.zIndex = 500;
		iframe.style.borderWidth = "0px";
		iframe.src = "data:text/html;base64,PERPQ1RZUEUgaHRtbD4KPGh0bWwgbGFuZz0iZW4tVVMiPgo8aGVhZD48L2hlYWQ+Cjxib2R5PjxoMT5IZWxsbyE8L2gxPjxwPllvdSd2ZSBqdXN0IGNyZWF0ZWQgYW4gaWZyYW1lIGVsZW1lbnQuPGJyPlVzZSB0aGlzIHRvIGVtYmVkIHNpdGVzIHdpdGggVVJMcyBvciBIVE1MIHVzaW5nIERhdGEgVVJJcy48L3A+PC9ib2R5Pgo8L2h0bWw+";
		this.displayWebsiteUrl = iframe.src;
		// positions iframe to fit stage
		this.SetIFramePosition(iframe, 0, 0, 480, 360, 90);
		this.iframeFilters = ArrayToValue(EffectOptions.items.map(item => item.value), 0); // reset all filter stuff
		this.GetCurrentCanvas().parentElement.prepend(iframe); // adds the iframe above the canvas
		return iframe;
	}
	deleteIframeElement() {
		this.RemoveIFrame();
	}
	iframeElementExists() {
		return this.GetIFrameState();
	}
	setIframeUrl(args) {
		if (!this.GetIFrameState()) return; // iframe doesnt exist, stop
		this.createdIframe.src = args.URL;
		this.displayWebsiteUrl = args.URL;
		return;

	}
	setIframePosLeft(args) {
		if (!this.GetIFrameState()) return; // iframe doesnt exist, stop
		const iframe = this.createdIframe;
		this.SetIFramePosition(iframe,
			args.X,
			this.iframeSettings.y,
			this.iframeSettings.width,
			this.iframeSettings.height,
			this.iframeSettings.rotation,
		);
	}
	setIframePosTop(args) {
		if (!this.GetIFrameState()) return; // iframe doesnt exist, stop
		const iframe = this.createdIframe;
		this.SetIFramePosition(iframe,
			this.iframeSettings.x,
			args.Y,
			this.iframeSettings.width,
			this.iframeSettings.height,
			this.iframeSettings.rotation,
		);
	}
	setIframeSizeWidth(args) {
		if (!this.GetIFrameState()) return; // iframe doesnt exist, stop
		const iframe = this.createdIframe;
		this.SetIFramePosition(iframe,
			this.iframeSettings.x,
			this.iframeSettings.y,
			args.WIDTH,
			this.iframeSettings.height,
			this.iframeSettings.rotation,
		);
	}
	setIframeSizeHeight(args) {
		if (!this.GetIFrameState()) return; // iframe doesnt exist, stop
		const iframe = this.createdIframe;
		this.SetIFramePosition(iframe,
			this.iframeSettings.x,
			this.iframeSettings.y,
			this.iframeSettings.width,
			args.HEIGHT,
			this.iframeSettings.rotation,
		);
	}
	setIframeRotation(args) {
		if (!this.GetIFrameState()) return; // iframe doesnt exist, stop
		const iframe = this.createdIframe;
		this.SetIFramePosition(iframe,
			this.iframeSettings.x,
			this.iframeSettings.y,
			this.iframeSettings.width,
			this.iframeSettings.height,
			args.ROTATE,
		);
	}
	showIframeElement() {
		if (!this.GetIFrameState()) return; // iframe doesnt exist, stop
		const iframe = this.createdIframe;
		iframe.style.display = "";
	}
	hideIframeElement() {
		if (!this.GetIFrameState()) return; // iframe doesnt exist, stop
		const iframe = this.createdIframe;
		iframe.style.display = "none";
	}

	getIframeLeft() {
		if (!this.GetIFrameState()) return; // iframe doesnt exist, stop
		return this.iframeSettings.x;
	}
	getIframeTop() {
		if (!this.GetIFrameState()) return; // iframe doesnt exist, stop
		return this.iframeSettings.y;
	}
	getIframeWidth() {
		if (!this.GetIFrameState()) return; // iframe doesnt exist, stop
		return this.iframeSettings.width;
	}
	getIframeHeight() {
		if (!this.GetIFrameState()) return; // iframe doesnt exist, stop
		return this.iframeSettings.height;
	}
	getIframeRotation() {
		if (!this.GetIFrameState()) return; // iframe doesnt exist, stop
		return this.iframeSettings.rotation;
	}
	getIframeTargetUrl() {
		if (!this.GetIFrameState()) return; // iframe doesnt exist, stop
		return this.displayWebsiteUrl;
	}
	iframeElementIsHidden() {
		if (!this.GetIFrameState()) return false; // iframe doesnt exist, stop
		return this.createdIframe.style.display === "none";
	}

	whenIframeIsLoaded() {
		const value = this.iframeLoadedValue;
		this.iframeLoadedValue = false;
		return value;
	}

	// effect functions lolol
	iframeElementSetEffect(args) {
		if (!this.GetIFrameState()) return; // iframe doesnt exist, stop
		this.iframeFilters[args.EFFECT] = Number(args.AMOUNT);
		this.ApplyFilterOptions(this.createdIframe);
	}
	iframeElementChangeEffect(args) {
		if (!this.GetIFrameState()) return; // iframe doesnt exist, stop
		this.iframeFilters[args.EFFECT] += Number(args.AMOUNT);
		this.ApplyFilterOptions(this.createdIframe);
	}
	iframeElementClearEffects() {
		if (!this.GetIFrameState()) return; // iframe doesnt exist, stop
		this.iframeFilters = ArrayToValue(EffectOptions.items.map(item => item.value), 0); // reset all values to 0
		this.ApplyFilterOptions(this.createdIframe);
	}
	getIframeEffectAmount(args) {
		if (!this.GetIFrameState()) return 0; // iframe doesnt exist, stop
		return this.iframeFilters[args.EFFECT];
	}
}
Scratch.extensions.register(new JgIframeBlocks());
