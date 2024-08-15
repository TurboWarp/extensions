// Name: Community Spotlight
// ID: SPspotlight
// Description: Display and Advertise Promotional Content for Free.
// By: SharkPool
// Licence: MIT

// Version V.1.0.02

(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) throw new Error("Community Spotlight must run unsandboxed!");

  const menuIconURI =
"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI3Ny4yMDUiIGhlaWdodD0iNzcuMjA1IiB2aWV3Qm94PSIwIDAgNzcuMjA1IDc3LjIwNSI+PGRlZnM+PGxpbmVhckdyYWRpZW50IHgxPSIyMTIuNzA0IiB5MT0iMTUyLjcwNCIgeDI9IjI2Ny4yOTYiIHkyPSIyMDcuMjk2IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgaWQ9ImEiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzAwOTk0ZiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzAwNzg5OSIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IHgxPSIyMTUuODk0IiB5MT0iMTU1Ljg5NCIgeDI9IjI2NC4xMDYiIHkyPSIyMDQuMTA2IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgaWQ9ImIiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzAwZmY4NCIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzAwYzlmZiIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxnIHN0cm9rZS1taXRlcmxpbWl0PSIxMCI+PHBhdGggZD0iTTIxMi43MDQgMjA3LjI5NmMtMTUuMDc1LTE1LjA3NS0xNS4wNzUtMzkuNTE3IDAtNTQuNTkyczM5LjUxNy0xNS4wNzUgNTQuNTkyIDAgMTUuMDc1IDM5LjUxNyAwIDU0LjU5Mi0zOS41MTcgMTUuMDc1LTU0LjU5MiAwIiBmaWxsPSJ1cmwoI2EpIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjAxLjM5OCAtMTQxLjM5OCkiLz48cGF0aCBkPSJNMjE1Ljg5NCAyMDQuMTA2Yy0xMy4zMTMtMTMuMzE0LTEzLjMxMy0zNC44OTggMC00OC4yMTJzMzQuODk4LTEzLjMxMyA0OC4yMTIgMCAxMy4zMTMgMzQuODk4IDAgNDguMjEyLTM0Ljg5OCAxMy4zMTMtNDguMjEyIDAiIGZpbGw9InVybCgjYikiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMDEuMzk4IC0xNDEuMzk4KSIvPjxwYXRoIGQ9Im00Ny42MzQgMzcuMzI0LTctNS42OTQgMTQuNTI3LTEyLjc2NXMxLjM1LTEuNDI0IDIuMzE2LTEuMDFjMS41NjEuNjY4Ljg2NSAyLjI4OC44NjUgMi4yODh6TTE3LjQyNSA1MS45ODljLjQ4NS0uNDg4IDEuMDMzLS45MDYgMS41NS0xLjM2bDQuOTE3LTQuMzEzIDQuODk2LTQuMjk1IDcuOTc5IDEyLjcxM3MtLjAzMS4wOTItLjI0Ni40MzdjLS40NTcuNzM1LS43NDcgMS41MDMtMS40MTIgMi4xMDQtMS40NTkgMS4zMTUtMy41MiAxLjkxLTUuNDEzIDIuMjI5LTIuNDgyLjQyLTUuMDg4LjQwMS03LjU2LS4wNzYtMS44MTktLjM1Mi0zLjgxLS45NzQtNS4xNjMtMi4zMDctLjQ4Mi0uNDc1LS44Ny0xLjA2My0xLjAwMS0xLjczNmEyLjY0IDIuNjQgMCAwIDEgLjA1NC0xLjIzNGMuMTMzLS40NjMuNjI5LTEuMzkgMS4zOTktMi4xNjJtOC44Mi0uMTRjLTQuNDA3IDAtNy45OCAxLjM2OC03Ljk4IDMuMDU2czMuNTczIDMuMDU2IDcuOTggMy4wNTYgNy45OC0xLjM2OCA3Ljk4LTMuMDU2LTMuNTczLTMuMDU2LTcuOTgtMy4wNTZtMzEuODE2LTEuMzY5IDEuNDg0IDEuMzAyYy41NC40NzMuOTY5IDEuMDUxIDEuMzMgMS42N3EuMDAxLjAwNi4wMDUuMDFjLjI1LjQyOS40LjkxNC40IDEuNDEyIDAgMy4yNzMtNC44NzYgNC41MDItNy4zMzYgNC43MzItMy43MDYuMzQ3LTguMTM2LjI2NC0xMS4yMS0xLjgzNS0xLjAwOC0uNjg5LTEuNDM0LTEuNjEzLTIuMDQyLTIuNTlsLTEuNjM3LTIuNjNRMzEuOTkgNDEuMjA4IDI0LjkyOCAyOS44NjNsLTYuNTM0LTEwLjQ5NWMtLjYyMy0uOTk4IDEuMTY3LTIuNjYgMi4zMTEtMS42NTdsOC43MDMgNy42MzQgMjEuNzE1IDE5LjA0OHptLTYuOTkgMS4zNjljLTQuNDA3IDAtNy45OCAxLjM2OC03Ljk4IDMuMDU2czMuNTczIDMuMDU2IDcuOTggMy4wNTYgNy45OC0xLjM2OCA3Ljk4LTMuMDU2LTMuNTczLTMuMDU2LTcuOTgtMy4wNTYiIGZpbGw9IiNmZmYiLz48L2c+PC9zdmc+Cg==";

  const vm = Scratch.vm;
  const acceptableImages = [
    "250x250 Square", "300x250 Rectangle", "480x270 Widescreen",
    "300x50 Horizontal Banner", "50x300 Vertical Banner",
    "360x120 Large Horizontal Banner", "120x360 Large Vertical Banner"
  ];
  let tags = [];
  let initialized = false;

  // Community Spotlight Exports
  // Uses MIT Licence (https://github.com/Community-Spotlight)
  // eslint-disable-next-line
  window.CSPromos={};const base="https://raw.githubusercontent.com/Community-Spotlight/";async function refreshPromos(){try{let e=await fetch(`${base}promotion-index/main/index.json`);if(!e.ok)throw Error("Couldn't fetch promotions!");window.CSPromos=await e.json()}catch(t){console.error(t)}}function getPromotion(e,t){let o=e=>e[Math.floor(Math.random()*e.length)];e="video"===e?"video":"image",t="object"==typeof t?t:{};let i={...window.CSPromos};t.tags&&t.tags.length>0&&(i=Object.fromEntries(Object.entries(i).filter(([e,o])=>o.tags.some(e=>t.tags.includes(e.toLowerCase())))));let n=Object.keys(i).filter(t=>{let o=i[t].media;return"image"===e?o.images.length>0:o.videos.length>0});if(0===n.length)return console.warn("CS -- No promotions found with given parameters"),{};let r,s,a=0,l=[...n];for(;a<n.length;){let m=o(l);r=i[m],l.splice(l.indexOf(m),1);let g=r.media;if("image"===e){let d=g.images.find(e=>!t.aspectRatio||e.size===t.aspectRatio);s=d?`${d.size}.${d.type}`:null}else if("video"===e){let f=g.videos.find(e=>(!t.aspectRatio||e.size===t.aspectRatio)&&(!t.videoLength||e.length===t.videoLength));s=f?`sz${f.size.replace(":","x")}leng${f.length}.${f.type}`:null}if(s)break;a++}if(!s)return console.warn("CS -- No promotions found with given parameters"),{};let h={...r};return delete h.media,{...h,url:`${base}promotion-media/main/${encodeURIComponent(h.id)}/${s}`}}

  class SPspotlight {
    constructor() {
      // Initialize the Promotions
      this.refresh();
      this.promoSpaceInfo = { pos: [0, 0], sz: [1, 1] };
      this.promoSpace = document.createElement("div");
      vm.renderer.addOverlay(this.promoSpace, "scale-centered");
      vm.runtime.on("PROJECT_STOP_ALL", () => { this.deletePromo() });
      vm.runtime.on("PROJECT_START", () => { this.deletePromo() });
    }
    getInfo() {
      return {
        id: "SPspotlight",
        name: "Community Spotlight",
        color1: "#00a1e6",
        color2: "#0085e6",
        color3: "#006fbf",
        menuIconURI,
        blocks: [
          {
            func: "promoDisclaim",
            blockType: Scratch.BlockType.BUTTON,
            text: "Promotion Disclaimer"
          },
          "---",
          {
            func: "addPromo",
            blockType: Scratch.BlockType.BUTTON,
            text: "Add My Promotion"
          },
          {
            opcode: "refresh",
            blockType: Scratch.BlockType.COMMAND,
            text: "refresh promos"
          },
          {
            opcode: "filterTags",
            blockType: Scratch.BlockType.COMMAND,
            text: "filter promos with tags [TAGS]",
            arguments: {
              TAGS: { type: Scratch.ArgumentType.STRING, defaultValue: "[\"Gaming\", \"Sharks\"]" }
            },
          },
          {
            opcode: "activeTags",
            blockType: Scratch.BlockType.REPORTER,
            text: "active tags",
            disableMonitor: true
          },
          { blockType: Scratch.BlockType.LABEL, text: "Manual Display" },
          {
            opcode: "getImgPromo",
            blockType: Scratch.BlockType.REPORTER,
            text: "get promo image with size [SIZE]",
            arguments: {
              SIZE: { type: Scratch.ArgumentType.STRING, menu: "IMGS" }
            },
          },
          {
            opcode: "getVidPromo",
            blockType: Scratch.BlockType.REPORTER,
            text: "get [LENGTH] sec promo video with size [SIZE]",
            arguments: {
              SIZE: { type: Scratch.ArgumentType.STRING, menu: "VID_RATIO" },
              LENGTH: { type: Scratch.ArgumentType.STRING, menu: "VID_LENGTH" }
            },
          },
          { blockType: Scratch.BlockType.LABEL, text: "Auto Display" },
          {
            opcode: "showImgPromo",
            blockType: Scratch.BlockType.COMMAND,
            text: "display promo image with size [SIZE]",
            arguments: {
              SIZE: { type: Scratch.ArgumentType.STRING, menu: "IMGS" }
            },
          },
          {
            opcode: "showVidPromo",
            blockType: Scratch.BlockType.COMMAND,
            text: "display [LENGTH] sec promo video with size [SIZE]",
            arguments: {
              SIZE: { type: Scratch.ArgumentType.STRING, menu: "VID_RATIO" },
              LENGTH: { type: Scratch.ArgumentType.STRING, menu: "VID_LENGTH" }
            },
          },
          {
            opcode: "visiblePromo",
            blockType: Scratch.BlockType.COMMAND,
            text: "[TYPE] displayed promo",
            arguments: {
              TYPE: { type: Scratch.ArgumentType.STRING, menu: "VISIBLE" }
            },
          },
          {
            opcode: "deletePromo",
            blockType: Scratch.BlockType.COMMAND,
            text: "delete displayed promo"
          },
          "---",
          {
            opcode: "setPromoPos",
            blockType: Scratch.BlockType.COMMAND,
            text: "set position of promo to x [x] y [y]",
            arguments: {
              x: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            },
          },
          {
            opcode: "setPromoScale",
            blockType: Scratch.BlockType.COMMAND,
            text: "set scale of promo to x [x] y [y]",
            arguments: {
              x: { type: Scratch.ArgumentType.NUMBER, defaultValue: 200 },
              y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 }
            },
          }
        ],
        menus: {
          VISIBLE: { acceptReporters: true, items: ["show", "hide"] },
          IMGS: { acceptReporters: true, items: acceptableImages },
          VID_RATIO: {
            acceptReporters: true,
            items: ["1:1", "4:3", "4:5", "16:9", "9:16"]
          },
          VID_LENGTH: {
            acceptReporters: true,
            items: ["any", "5", "10", "15", "30"]
          }
        }
      };
    }

    // Helper Funcs
    promoDisclaim() {
      alert(`WARNING: Community Spotlight will NOT earn you any Money.\nScratch projects have numerous Security Issues that make earning Money Impractical.\n\nAll Promotions are Moderated, Free and Acessible to Everyone.`);
    }

    addPromo() { Scratch.openWindow("https://forms.gle/9d5GHEukZva5zeZj8") }

    displayPromo(promo, args) {
      if (promo.id === undefined) return;
      const isVideo = promo.url.includes(".mp4");
      const div = document.createElement("div");
      div.style.width = "100%"; div.style.height = "100%";
      div.style.position = "absolute";
      div.style.top = "-50%"; div.style.left = "-50%";

      const newSpace = document.createElement(isVideo ? "video" : "img");
      newSpace.src = promo.url;
      newSpace.draggable = false;
      newSpace.crossOrigin = "anonymous";
      newSpace.style.pointerEvents = "auto";
      newSpace.style.position = "absolute";
      newSpace.style.top = "50%"; newSpace.style.left = "50%";
      newSpace.style.transform = "translate(-50%, -50%)";
      let sz = args.SIZE.split(" ")[0];
      if (isVideo) {
        const scaleAmt = sz === "1:1" ? 240 : 120;
        newSpace.style.width = `${parseInt(sz.split(":")[0]) * scaleAmt}px`;
        newSpace.style.height = `${parseInt(sz.split(":")[1]) * scaleAmt}px`;
      } else {
        newSpace.style.width = `${sz.split("x")[0]}px`;
        newSpace.style.height = `${sz.split("x")[1]}px`;
      }
      div.appendChild(newSpace);

      this.promoSpace.firstChild?.remove();
      this.promoSpace.appendChild(div);
      this.updatePromo();
      newSpace.addEventListener("click", (e) => {
        if (isVideo && e.target !== newSpace) return;
        Scratch.openWindow(promo["promoter-url"]);
      });
      if (isVideo) {
        newSpace.controls = true;
        newSpace.play();
      }
    }

    updatePromo() {
      if (!this.promoSpace.firstChild) return;
      const { pos, sz } = this.promoSpaceInfo;
      this.promoSpace.firstChild.style.transform = `translate(${pos[0]}px, ${pos[1]}px) scale(${sz[0]},${sz[1]})`;
    }

    // Block Funcs
    async getImgPromo(args) {
      if (!initialized) await this.refresh();
      if (acceptableImages.indexOf(args.SIZE) === -1) return "{}";
      const aspectRatio = args.SIZE.split(" ")[0];
      return JSON.stringify(getPromotion("image", { tags, aspectRatio }));
    }

    async getVidPromo(args) {
      if (!initialized) await this.refresh();
      if (["1:1", "4:3", "4:5", "16:9", "9:16"].indexOf(args.SIZE) === -1) return "{}";
      const obj = { tags, aspectRatio: args.SIZE };
      if (args.LENGTH !== "any") obj.videoLength = Scratch.Cast.toNumber(args.LENGTH);
      return JSON.stringify(getPromotion("video", obj));
    }

    async refresh() {
      await refreshPromos();
      initialized = true;
    }

    activeTags() { return JSON.stringify(tags) }

    filterTags(args) {
      try { tags = JSON.parse(Scratch.Cast.toString(args.TAGS).toLowerCase()) }
      catch { tags = [] }
    }

    async showImgPromo(args) {
      if (!initialized) await this.refresh();
      if (acceptableImages.indexOf(args.SIZE) === -1) return;
      const aspectRatio = args.SIZE.split(" ")[0];
      this.displayPromo(getPromotion("image", { tags, aspectRatio }), args);
    }

    async showVidPromo(args) {
      if (!initialized) await this.refresh();
      if (["1:1", "4:3", "4:5", "16:9", "9:16"].indexOf(args.SIZE) === -1) return;
      this.displayPromo(getPromotion("video", {
        tags, aspectRatio: args.SIZE, videoLength: Scratch.Cast.toNumber(args.LENGTH)
      }), args);
    }

    visiblePromo(args) { this.promoSpace.style.display = args.TYPE === "show" ? "" : "none" }

    deletePromo() { this.promoSpace.firstChild?.remove() }

    setPromoPos(args) {
      this.promoSpaceInfo.pos = [
        Scratch.Cast.toNumber(args.x), Scratch.Cast.toNumber(args.y) * -1
      ];
      this.updatePromo();
    }

    setPromoScale(args) {
      this.promoSpaceInfo.sz = [
        Scratch.Cast.toNumber(args.x) / 100, Scratch.Cast.toNumber(args.y) / 100
      ];
      this.updatePromo();
    }
  }

  function addGradientToBody() {
    var grad = document.createElement("div");
    grad.innerHTML = `<svg><defs>
      <linearGradient x1="220" y1="-30" x2="240" y2="100" gradientUnits="userSpaceOnUse" id="SPspotlight-GRAD">
      <stop offset="0" stop-color="#00d970"/><stop offset=".4" stop-color="#00aad9"/></linearGradient>
      </defs></svg>`;
    document.body.appendChild(grad);
  }
  if (Scratch.gui) Scratch.gui.getBlockly().then((ScratchBlocks) => {
    addGradientToBody();
    if (!ScratchBlocks?.SPgradients?.patched) { // Gradient Patch by 0znzw & SharkPool
      ScratchBlocks.SPgradients = {gradientUrls: {}, patched: false};
      const BSP = ScratchBlocks.BlockSvg.prototype, BSPR = BSP.render;
      BSP.render = function(...args) {
        const res = BSPR.apply(this, args);
        let category;
        if (this?.svgPath_ && this?.category_ && (category = this.type.slice(0, this.type.indexOf("_"))) && ScratchBlocks.SPgradients.gradientUrls[category]) {
          const urls = ScratchBlocks.SPgradients.gradientUrls[category];
          if (urls) this.svgPath_.setAttribute("fill", urls[0]);
        }
        return res;
      }
      ScratchBlocks.SPgradients.patched = true;
    }
    ScratchBlocks.SPgradients.gradientUrls["SPspotlight"] = ["url(#SPspotlight-GRAD)", "url(#SPspotlight-GRAD)"];
  });

  Scratch.extensions.register(new SPspotlight());
})(Scratch);
