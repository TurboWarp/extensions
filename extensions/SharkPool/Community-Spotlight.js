// Name: Community Spotlight
// ID: SPspotlight
// Description: Display and Advertise Promotional Content for Free.
// By: SharkPool
// Licence: MIT

// Version V.1.0.11

(function (Scratch) {
  "use strict";
  if (!Scratch.extensions.unsandboxed) throw new Error("Community Spotlight must run unsandboxed!");

  const menuIconURI =
"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI3Ny4yMDUiIGhlaWdodD0iNzcuMjA1IiB2aWV3Qm94PSIwIDAgNzcuMjA1IDc3LjIwNSI+PGRlZnM+PGxpbmVhckdyYWRpZW50IHgxPSIyMTIuNzA0IiB5MT0iMTUyLjcwNCIgeDI9IjI2Ny4yOTYiIHkyPSIyMDcuMjk2IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgaWQ9ImEiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzAwOTk0ZiIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzAwNzg5OSIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IHgxPSIyMTUuODk0IiB5MT0iMTU1Ljg5NCIgeDI9IjI2NC4xMDYiIHkyPSIyMDQuMTA2IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgaWQ9ImIiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzAwZmY4NCIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzAwYzlmZiIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxnIHN0cm9rZS1taXRlcmxpbWl0PSIxMCI+PHBhdGggZD0iTTIxMi43MDQgMjA3LjI5NmMtMTUuMDc1LTE1LjA3NS0xNS4wNzUtMzkuNTE3IDAtNTQuNTkyczM5LjUxNy0xNS4wNzUgNTQuNTkyIDAgMTUuMDc1IDM5LjUxNyAwIDU0LjU5Mi0zOS41MTcgMTUuMDc1LTU0LjU5MiAwIiBmaWxsPSJ1cmwoI2EpIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjAxLjM5OCAtMTQxLjM5OCkiLz48cGF0aCBkPSJNMjE1Ljg5NCAyMDQuMTA2Yy0xMy4zMTMtMTMuMzE0LTEzLjMxMy0zNC44OTggMC00OC4yMTJzMzQuODk4LTEzLjMxMyA0OC4yMTIgMCAxMy4zMTMgMzQuODk4IDAgNDguMjEyLTM0Ljg5OCAxMy4zMTMtNDguMjEyIDAiIGZpbGw9InVybCgjYikiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMDEuMzk4IC0xNDEuMzk4KSIvPjxwYXRoIGQ9Im00Ny42MzQgMzcuMzI0LTctNS42OTQgMTQuNTI3LTEyLjc2NXMxLjM1LTEuNDI0IDIuMzE2LTEuMDFjMS41NjEuNjY4Ljg2NSAyLjI4OC44NjUgMi4yODh6TTE3LjQyNSA1MS45ODljLjQ4NS0uNDg4IDEuMDMzLS45MDYgMS41NS0xLjM2bDQuOTE3LTQuMzEzIDQuODk2LTQuMjk1IDcuOTc5IDEyLjcxM3MtLjAzMS4wOTItLjI0Ni40MzdjLS40NTcuNzM1LS43NDcgMS41MDMtMS40MTIgMi4xMDQtMS40NTkgMS4zMTUtMy41MiAxLjkxLTUuNDEzIDIuMjI5LTIuNDgyLjQyLTUuMDg4LjQwMS03LjU2LS4wNzYtMS44MTktLjM1Mi0zLjgxLS45NzQtNS4xNjMtMi4zMDctLjQ4Mi0uNDc1LS44Ny0xLjA2My0xLjAwMS0xLjczNmEyLjY0IDIuNjQgMCAwIDEgLjA1NC0xLjIzNGMuMTMzLS40NjMuNjI5LTEuMzkgMS4zOTktMi4xNjJtOC44Mi0uMTRjLTQuNDA3IDAtNy45OCAxLjM2OC03Ljk4IDMuMDU2czMuNTczIDMuMDU2IDcuOTggMy4wNTYgNy45OC0xLjM2OCA3Ljk4LTMuMDU2LTMuNTczLTMuMDU2LTcuOTgtMy4wNTZtMzEuODE2LTEuMzY5IDEuNDg0IDEuMzAyYy41NC40NzMuOTY5IDEuMDUxIDEuMzMgMS42N3EuMDAxLjAwNi4wMDUuMDFjLjI1LjQyOS40LjkxNC40IDEuNDEyIDAgMy4yNzMtNC44NzYgNC41MDItNy4zMzYgNC43MzItMy43MDYuMzQ3LTguMTM2LjI2NC0xMS4yMS0xLjgzNS0xLjAwOC0uNjg5LTEuNDM0LTEuNjEzLTIuMDQyLTIuNTlsLTEuNjM3LTIuNjNRMzEuOTkgNDEuMjA4IDI0LjkyOCAyOS44NjNsLTYuNTM0LTEwLjQ5NWMtLjYyMy0uOTk4IDEuMTY3LTIuNjYgMi4zMTEtMS42NTdsOC43MDMgNy42MzQgMjEuNzE1IDE5LjA0OHptLTYuOTkgMS4zNjljLTQuNDA3IDAtNy45OCAxLjM2OC03Ljk4IDMuMDU2czMuNTczIDMuMDU2IDcuOTggMy4wNTYgNy45OC0xLjM2OCA3Ljk4LTMuMDU2LTMuNTczLTMuMDU2LTcuOTgtMy4wNTYiIGZpbGw9IiNmZmYiLz48L2c+PC9zdmc+Cg==";

  const vm = Scratch.vm;
  const runtime = vm.runtime;

  const acceptableRatios = ["1:1", "4:3", "4:5", "16:9", "9:16"];
  const acceptableImgs = [
    "250x250 Square", "300x250 Rectangle", "480x270 Widescreen",
    "300x50 Horizontal Banner", "50x300 Vertical Banner",
    "360x120 Large Horizontal Banner", "120x360 Large Vertical Banner"
  ];

  let tags = [];
  let initialized = false;

  // Community Spotlight Exports
  // Uses MIT Licence (https://github.com/Community-Spotlight)
  // eslint-disable-next-line
  window.CommunitySpotlight={b:"https://raw.githubusercontent.com/Community-Spotlight/",u:{},c:{}};window.CommunitySpotlight.u["fetchIndex"]=async function(){const r=await fetch(`${window.CommunitySpotlight.b}promotion-index/main/index.json`);if(!r.ok)throw new Error("Couldn't fetch promotions!");return await r.json()};window.CommunitySpotlight.u["filterPromos"]=function(j,t,p){const r=(a)=>a[Math.floor(Math.random()*a.length)];t=t==="video"?"video":t==="html"?"html":"image";p=typeof p==="object"?p:{};if(p.tags){if(p.tags.constructor.name==="Array"){p.tags=p.tags.map((e)=>{return e.toLowerCase()})}else{console.warn("CS -- 'tags' parameter must be an Array");return{}}}const{aspectRatio,videoLength}=p;let c=Object.values(j).filter(q=>{return q.media[t+"s"].length>0});if(c.length===0){console.warn("CS -- No promotions found with given type");return {}}if(p.tags&&p.tags.length>0)c=c.filter((q)=>q.tags.some(tag=>p.tags.includes(tag)));if(aspectRatio)c=c.filter(q=>{return q.media[t+"s"].some((i)=>{return i.size===aspectRatio})});if(t==="video"&&videoLength)c=c.filter(q=>{return q.media.videos.some((i)=>{return i.length===videoLength})});if(c.length===0){console.warn("CS -- No promotions found with given parameters");return{}}const g=r(c);let m,l,f;switch(t){case"video":f=g.media.videos,m=aspectRatio&&videoLength?f.find(e=>e.size===aspectRatio&&e.length===videoLength):!aspectRatio&&videoLength?f.find(e=>e.length===videoLength):aspectRatio&&!videoLength?f.find(e=>e.size===aspectRatio):r(f),l=`sz${m.size.replace(":","x")}leng${m.length}.${m.type}`;break;case"html":f=g.media.htmls,l=`sz${(m=aspectRatio?f.find(e=>e.size===aspectRatio):r(f)).size.replace(":","x")}.html`;break;default:f=g.media.images,m=aspectRatio?f.find(e=>e.size===aspectRatio):r(f),l=`${m.size}.${m.type}`}delete g.media;g.url=`${window.CommunitySpotlight.b}promotion-media/main/${encodeURIComponent(g.id)}/${l}`;return g};async function refreshPromoCacheCS(){try{window.CommunitySpotlight.c = await window.CommunitySpotlight.u["fetchIndex"]()}catch (e){console.error(e)}}async function getOnlinePromoCS(t,p){return window.CommunitySpotlight.u["filterPromos"](await window.CommunitySpotlight.u["fetchIndex"](),t,p)}function getCachedPromoCS(t,p){return window.CommunitySpotlight.u["filterPromos"](structuredClone(window.CommunitySpotlight.c),t,p)}

  class SPspotlight {
    constructor() {
      // Initialize the Promotions
      this.refresh();
      this.promoSpaceInfo = { pos: [0, 0], sz: [1, 1] };
      this.promoSpace = document.createElement("div");
      vm.renderer.addOverlay(this.promoSpace, "scale-centered");

      runtime.on("PROJECT_STOP_ALL", () => { this.deletePromo() });
      runtime.on("PROJECT_START", () => { this.deletePromo() });
      runtime.on("RUNTIME_PAUSED", () => {
        const video = this.promoSpace.querySelector("video");
        if (video) video.pause();
      });
      runtime.on("RUNTIME_UNPAUSED", () => {
        const video = this.promoSpace.querySelector("video");
        if (video) video.play();
      });
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
          {
            func: "addPromo",
            blockType: Scratch.BlockType.BUTTON,
            text: "Add My Promotion"
          },
          "---",
          {
            opcode: "activeTags",
            blockType: Scratch.BlockType.REPORTER,
            text: "active tags"
          },
          {
            opcode: "filterTags",
            blockType: Scratch.BlockType.COMMAND,
            text: "filter promos with tags [TAGS]",
            arguments: {
              TAGS: { type: Scratch.ArgumentType.STRING, defaultValue: "[\"Gaming\", \"Art\"]" }
            },
          },
          {
            opcode: "refresh",
            blockType: Scratch.BlockType.COMMAND,
            text: "refresh promo cache"
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
          {
            opcode: "getHTMLPromo",
            blockType: Scratch.BlockType.REPORTER,
            text: "get promo html with size [SIZE]",
            arguments: {
              SIZE: { type: Scratch.ArgumentType.STRING, menu: "VID_RATIO" },
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
            opcode: "showHTMLPromo",
            blockType: Scratch.BlockType.COMMAND,
            text: "display promo HTML with size [SIZE]",
            arguments: {
              SIZE: { type: Scratch.ArgumentType.STRING, menu: "VID_RATIO" }
            },
          },
          "---",
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
          IMGS: { acceptReporters: true, items: acceptableImgs },
          VID_RATIO: { acceptReporters: true, items: acceptableRatios },
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

    addPromo() { Scratch.openWindow("https://community-spotlight.github.io/uploader-site/") }

    displayPromo(promo, scale) {
      if (promo.id === undefined) return;
      const isVideo = promo.url.endsWith(".mp4");
      const isHTML = promo.url.endsWith(".html");

      const div = document.createElement("div");
      div.setAttribute("style", "width: 100%; height: 100%; position: absolute; top: -50%; left: -50%;");

      const newSpace = document.createElement(isVideo ? "video" : isHTML ? "iframe" : "img");
      newSpace.setAttribute("title", promo.promoter);
      newSpace.src = promo.url;
      newSpace.draggable = false;
      newSpace.crossOrigin = "anonymous";
      newSpace.setAttribute("style", "pointer-events: auto; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);");
      if (!isVideo && !isHTML) newSpace.style.cursor = "pointer";

      // even though HTML is Moderated, its good to have some sandboxes
      if (isHTML) newSpace.setAttribute("sandbox", "allow-scripts allow-forms allow-same-origin");

      let sz = scale.split(" ")[0];
      if (isVideo || isHTML) {
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
        // TODO add proper click detection for iframes. Maybe make a content holder?
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
    activeTags() { return JSON.stringify(tags) }

    filterTags(args) {
      try { tags = JSON.parse(Scratch.Cast.toString(args.TAGS).toLowerCase()) }
      catch { tags = [] }
    }

    async refresh() {
      await refreshPromoCacheCS();
      initialized = true;
    }

    getImgPromo(args) {
      if (!initialized) return "{}";
      if (acceptableImgs.indexOf(args.SIZE) === -1) return "{}";
      const aspectRatio = args.SIZE.split(" ")[0];
      return JSON.stringify(
        getCachedPromoCS("image", { tags, aspectRatio })
      );
    }
    showImgPromo(args) {
      if (!initialized) return;
      this.displayPromo(
        JSON.parse(this.getImgPromo(args)), args.SIZE
      );
    }

    getVidPromo(args) {
      if (!initialized) return "{}";
      if (acceptableRatios.indexOf(args.SIZE) === -1) return "{}";
      const videoLength = args.LENGTH === "any" ? undefined : Scratch.Cast.toNumber(args.LENGTH);
      return JSON.stringify(
        getCachedPromoCS("video", {
          tags, videoLength, aspectRatio: args.SIZE
        })
      );
    }
    showVidPromo(args) {
      if (!initialized) return;
      this.displayPromo(
        JSON.parse(this.getVidPromo(args)), args.SIZE
      );
    }

    getHTMLPromo(args) {
      if (!initialized) return "{}";
      if (acceptableRatios.indexOf(args.SIZE) === -1) return "{}";
      return JSON.stringify(
        getCachedPromoCS("html", {
          tags, aspectRatio: args.SIZE
        })
      );
    }
    showHTMLPromo(args) {
      if (!initialized) return;
      this.displayPromo(
        JSON.parse(this.getHTMLPromo(args)), args.SIZE
      );
    }

    visiblePromo(args) {
      this.promoSpace.style.display = args.TYPE === "show" ? "" : "none";
    }

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

  function add2Body() {
    var grad = document.createElement("div");
    grad.innerHTML = `<svg><defs>
      <linearGradient x1="220" y1="-30" x2="240" y2="100" gradientUnits="userSpaceOnUse" id="SPspotlight-GRAD">
      <stop offset="0" stop-color="#00d970"/><stop offset=".4" stop-color="#00aad9"/></linearGradient>
      </defs></svg>`;
    document.body.appendChild(grad);
  }
  if (Scratch.gui) Scratch.gui.getBlockly().then((SB) => {
    add2Body();
    if (!SB?.SPgradients?.patched) {
      // Gradient Patch by 0znzw & SharkPool
      SB.SPgradients = { gradientUrls: {}, patched: false };
      const BSP = SB.BlockSvg.prototype, BSPR = BSP.render;
      BSP.render = function(...args) {
        const blockTheme = ReduxStore.getState().scratchGui.theme.theme.blocks;
        const res = BSPR.apply(this, args);
        let category;
        if (this?.svgPath_ && this?.category_ && (category = this.type.slice(0, this.type.indexOf("_"))) && SB.SPgradients.gradientUrls[category]) {
          const urls = SB.SPgradients.gradientUrls[category];
          if (urls) {
            this.svgPath_.setAttribute("fill", urls[0]);
            if (blockTheme === "dark") {
              this.svgPath_.setAttribute("fill-opacity", ".5");
              this.svgPath_.setAttribute("stroke", "#02f5bc");
            }
          }
        }
        return res;
      }
      SB.SPgradients.patched = true;
    }
    ScratchBlocks.SPgradients.gradientUrls["SPspotlight"] = ["url(#SPspotlight-GRAD)"];
  });
  Scratch.extensions.register(new SPspotlight());
})(Scratch);
