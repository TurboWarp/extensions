// Name: Newgrounds
// ID: NGIO
// Description: Blocks that allow games to interact with the Newgrounds API. Unofficial.
// By: ObviousAlexC <https://scratch.mit.edu/users/pinksheep2917/>
// License: MIT

(function (Scratch) {
  "use strict";

  /*!
    The following code is from NewgroundsIO-JS
    The original code is available at https://github.com/PsychoGoldfishNG/NewgroundsIO-JS
  
    We use it under the following license:
  
    MIT License
    Copyright (c) 2022 PsychoGoldfishNG
  
    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:
  
    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.
  
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
    */
  /* eslint-disable */

  //Newgrounds.io JS library taken from https://github.com/PsychoGoldfishNG/NewgroundsIO-JS/blob/main/dist/NewgroundsIO.js the official Github for Newgrounds.io

  //Updated to the latest
  //Put this in here since there are 3 objects
  let NewgroundsIO = null;
  let NGIO = null;
  let CryptoJS = null;
  // prettier-ignore
  {
    NGIO = class{static get STATUS_INITIALIZED(){return"initialized"}static get STATUS_CHECKING_LOCAL_VERSION(){return"checking-local-version"}static get STATUS_LOCAL_VERSION_CHECKED(){return"local-version-checked"}static get STATUS_PRELOADING_ITEMS(){return"preloading-items"}static get STATUS_ITEMS_PRELOADED(){return"items-preloaded"}static get STATUS_READY(){return"ready"}static get STATUS_SESSION_UNINITIALIZED(){return NewgroundsIO.SessionState.SESSION_UNINITIALIZED}static get STATUS_WAITING_FOR_SERVER(){return NewgroundsIO.SessionState.WAITING_FOR_SERVER}static get STATUS_LOGIN_REQUIRED(){return NewgroundsIO.SessionState.LOGIN_REQUIRED}static get STATUS_WAITING_FOR_USER(){return NewgroundsIO.SessionState.WAITING_FOR_USER}static get STATUS_LOGIN_CANCELLED(){return NewgroundsIO.SessionState.LOGIN_CANCELLED}static get STATUS_LOGIN_SUCCESSFUL(){return NewgroundsIO.SessionState.LOGIN_SUCCESSFUL}static get STATUS_LOGIN_FAILED(){return NewgroundsIO.SessionState.LOGIN_FAILED}static get STATUS_USER_LOGGED_OUT(){return NewgroundsIO.SessionState.USER_LOGGED_OUT}static get STATUS_SERVER_UNAVAILABLE(){return NewgroundsIO.SessionState.SERVER_UNAVAILABLE}static get STATUS_EXCEEDED_MAX_ATTEMPTS(){return NewgroundsIO.SessionState.EXCEEDED_MAX_ATTEMPTS}static get isWaitingStatus(){return NewgroundsIO.SessionState.SESSION_WAITING.indexOf(this.#a)>=0||[this.STATUS_PRELOADING_ITEMS,this.LOCAL_VERSION_CHECKED,this.STATUS_CHECKING_LOCAL_VERSION].indexOf(this.#a)>=0}static get PERIOD_TODAY(){return"D"}static get PERIOD_CURRENT_WEEK(){return"W"}static get PERIOD_CURRENT_MONTH(){return"M"}static get PERIOD_CURRENT_YEAR(){return"Y"}static get PERIOD_ALL_TIME(){return"A"}static get PERIODS(){return[NGIO.PERIOD_TODAY,NGIO.PERIOD_CURRENT_WEEK,NGIO.PERIOD_CURRENT_MONTH,NGIO.PERIOD_CURRENT_YEAR,NGIO.PERIOD_ALL_TIME]}static get ngioCore(){return this.#b}static #b=null;static get medalScore(){return this.#c}static #c=-1;static get medals(){return this.#d}static #d=null;static get scoreBoards(){return this.#e}static #e=null;static get saveSlots(){return this.#f}static #f=null;static get lastExecution(){return this.#g}static #g=new Date;static get lastConnectionStatus(){return this.#a}static #a=new Date;static get sessionError(){return this.#h}static #h=null;static get legalHost(){return this.#i}static #i=!0;static get isDeprecated(){return this.#j}static #j=!0;static get newestVersion(){return this.#k}static #k=!0;static get loginPageOpen(){return this.#l}static #l=!1;static get gatewayVersion(){return this.#m}static #m=!0;static get lastMedalUnlocked(){return this.#n}static #n=!0;static get lastBoardPosted(){return this.#o}static #o=!0;static get lastScorePosted(){return this.#p}static #p=!0;static get lastGetScoresResult(){return this.#q}static #q=!0;static get lastSaveSlotLoaded(){return this.#r}static #r=!0;static get lastSaveSlotSaved(){return this.#s}static #s=!0;static get lastDateTime(){return this.#t}static #t="0000-00-00";static get lastLoggedEvent(){return this.#u}static #u=null;static get lastTimeStamp(){return this.#v}static #v=0;static get lastPingSuccess(){return this.#w}static #w=!0;static get isInitialized(){return null!==this.ngioCore}static get session(){return this.isInitialized?this.ngioCore.session:null}static get user(){return null===this.session?null:this.ngioCore.session.user}static get hasSession(){return null!==this.session}static get hasUser(){return null!==this.user}static get isReady(){return this.#a===this.STATUS_READY}static get version(){return this.#x}static #x="0.0.0";static get debugMode(){return this.#y}static #y=!1;static #z={autoLogNewView:!1,preloadMedals:!1,preloadScoreBoards:!1,preloadSaveSlots:!1};static #A=!1;static #B=!1;static #C=!1;static #D=!1;static init(e,t,s){if(!this.isInitialized){if(this.#b=new NewgroundsIO.Core(e,t),this.#b.addEventListener("serverResponse",function(e){NGIO.#E(e)}),s&&"object"==typeof s){"string"==typeof s.version&&(this.#x=s.version);let o=["debugMode","checkHostLicense","autoLogNewView","preloadMedals","preloadScoreBoards","preloadSaveSlots"];for(let r=0;r<o.length;r++)void 0!==s[o[r]]&&(this.#z[o[r]]=!!s[o[r]])}this.#b.debug=this.debugMode,this.#a=this.STATUS_INITIALIZED,setTimeout(function(){NGIO.keepSessionAlive()},3e4)}}static skipLogin(){this.#A||(this.#B=!0)}static openLoginPage(){this.#l?console.warn("loginPageOpen is true. Use CancelLogin to reset."):(this.#B=!1,this.#A=!1,this.#l=!0,this.session.openLoginPage())}static cancelLogin(){if(!this.session){console.error("NGIO Error - Can't cancel non-existent session");return}this.session.cancelLogin(NewgroundsIO.SessionState.SESSION_UNINITIALIZED),this.#F(),this.skipLogin()}static logOut(){if(!this.session){console.error("NGIO Error - Can't cancel non-existent session");return}this.session.logOut(function(){this.#F(),this.skipLogin()},this)}static loadAuthorUrl(){this.ngioCore.loadComponent(this.ngioCore.getComponent("Loader.loadAuthorUrl"))}static loadOfficialUrl(){this.ngioCore.loadComponent(this.ngioCore.getComponent("Loader.loadOfficialUrl"))}static loadMoreGames(){this.ngioCore.loadComponent(this.ngioCore.getComponent("Loader.loadMoreGames"))}static loadNewgrounds(){this.ngioCore.loadComponent(this.ngioCore.getComponent("Loader.loadNewgrounds"))}static loadReferral(e){this.ngioCore.loadComponent(this.ngioCore.getComponent("Loader.loadReferral",{referral_name:e}))}static getMedal(e){if(null===this.medals)return console.error("NGIO Error: Can't use getMedal without setting preloadMedals option to true"),null;for(let t=0;t<this.medals.length;t++)if(this.medals[t].id===e)return this.medals[t]}static unlockMedal(e,t,s){if(null==this.medals){console.error("unlockMedal called without any preloaded medals."),"function"==typeof t&&(s?t.call(s,null):t(null));return}let o=this.getMedal(e);if(null==o){console.error("Medal #"+e+" does not exist."),"function"==typeof t&&(s?t.call(s,null):t(null));return}o.unlock(function(){"function"==typeof t&&(s?t.call(s,this.lastMedalUnlocked):t(this.lastMedalUnlocked))},this)}static getScoreBoard(e){if(null===this.scoreBoards)return console.error("NGIO Error: Can't use getScoreBoard without setting preloadScoreBoards option to true"),null;for(let t=0;t<this.scoreBoards.length;t++)if(this.scoreBoards[t].id===e)return this.scoreBoards[t]}static postScore(e,t,s,o,r){if("function"==typeof s?(r=o,o=s,s=""):void 0===s&&(s=""),null==this.scoreBoards){console.error("NGIO Error - postScore called without any preloaded scoreboards."),"function"==typeof o&&(r?o.call(r,null,null):o(null,null));return}var i=this.getScoreBoard(e);if(null==i){console.error("NGIO Error - ScoreBoard #"+e+" does not exist."),"function"==typeof o&&(r?o.call(r,null,null):o(null,null));return}i.postScore(t,s,function(){"function"==typeof o&&(r?o.call(r,this.lastBoardPosted,this.lastScorePosted):o(this.lastBoardPosted,this.lastScorePosted))},this)}static getScores(e,t,s,o){let r={period:void 0===t.period?NGIO.PERIOD_TODAY:t.period,tag:"string"!=typeof t.tag?"":t.tag,social:void 0!==t.social&&!!t.social,skip:"number"!=typeof t.skip?0:t.skip,limit:"number"!=typeof t.limit?10:t.limit};if(null==this.scoreBoards){console.error("NGIO Error - getScores called without any preloaded scoreboards."),"function"==typeof s&&(o?s.call(o,null,null,r):s(null,null,r));return}var i=this.getScoreBoard(e);if(null==i){console.error("NGIO Error - ScoreBoard #"+e+" does not exist."),"function"==typeof s&&(o?s.call(o,null,null,r):s(null,null,r));return}i.getScores(r,function(){"function"==typeof s&&(o?s.call(o,i,this.lastGetScoresResult.scores,r):s(i,this.lastGetScoresResult.scores,r))},this)}static getSaveSlot(e){if(null===this.saveSlots)return console.error("NGIO Error: Can't use getSaveSlot without setting preloadSaveSlots option to true"),null;for(let t=0;t<this.saveSlots.length;t++)if(this.saveSlots[t].id===e)return this.saveSlots[t]}static getTotalSaveSlots(){let e=0;return this.saveSlots.forEach(t=>{t.hasData&&e++}),e}static getSaveSlotData(e,t,s){null===this.saveSlots&&(console.error("getSaveSlotData data called without any preloaded save slots."),s?t.call(s,null):t(null));let o=this.getSaveSlot(e);this.#r=o,o.getData(t,s)}static setSaveSlotData(e,t,s,o){if(null==this.saveSlots){console.error("setSaveSlotData data called without any preloaded save slots."),"function"==typeof s&&(o?s(o,null):s(null));return}var r=this.getSaveSlot(e);if(null==r){console.error("Slot #"+e+" does not exist."),"function"==typeof s&&(o?s(o,null):s(null));return}r.setData(t,function(){"function"==typeof s&&(o?s(o,this.lastSaveSlotSaved):s(this.lastSaveSlotSaved))},this)}static logEvent(e,t,s){this.ngioCore.executeComponent(this.ngioCore.getComponent("Event.logEvent",{event_name:e}),function(){"function"==typeof t&&(s?t(s,this.lastLoggedEvent):t(this.lastLoggedEvent))},this)}static getDateTime(e,t){this.ngioCore.executeComponent(this.ngioCore.getComponent("Gateway.getDatetime"),function(){"function"==typeof e&&(t?e(t,this.lastDateTime,this.lastTimeStamp):e(this.lastDateTime,this.lastTimeStamp))},this)}static keepSessionAlive(){if(this.hasUser)(new Date-this.#g).Seconds>=3e4&&(this.#g=new Date,this.ngioCore.executeComponent(this.ngioCore.getComponent("Gateway.ping")))}static getConnectionStatus(e,t){this.#D||null===this.#a||null==this.session||(this.#D=!0,this.#a===this.STATUS_INITIALIZED?(this.#a=this.STATUS_CHECKING_LOCAL_VERSION,this.#G(e,t),this.#H(e,t)):this.#A?this.#a===this.STATUS_LOGIN_SUCCESSFUL?(this.#a=this.STATUS_PRELOADING_ITEMS,this.#G(e,t),this.#I(function(){this.#G(e,t),this.#B=!1},this)):this.#a===this.STATUS_ITEMS_PRELOADED?(this.#l=!1,this.#a=this.STATUS_READY,this.#G(e,t),this.#B=!1):this.keepSessionAlive():this.#B?this.#J(e,t):this.#a!==this.STATUS_CHECKING_LOCAL_VERSION&&this.session.update(function(){this.#J(e,t)},this),this.#D=!1)}static #J(e,t){(this.session.statusChanged||this.#B)&&(this.#a=this.session.status,(this.session.status==NewgroundsIO.SessionState.LOGIN_SUCCESSFUL||this.#B)&&(this.#a=NewgroundsIO.SessionState.LOGIN_SUCCESSFUL,this.#A=!0),this.#G(e,t)),this.#B=!1}static #G(s,o){o?s.call(o,this.#a):s(this.#a)}static #H(r,i){if(this.#C){this.#a=this.STATUS_LOCAL_VERSION_CHECKED,this.#G(r,i);return}this.ngioCore.queueComponent(this.ngioCore.getComponent("App.getCurrentVersion",{version:this.#x})),this.ngioCore.queueComponent(this.ngioCore.getComponent("Gateway.getVersion")),this.#z.autoLogNewView&&this.ngioCore.queueComponent(this.ngioCore.getComponent("App.logView")),this.#z.checkHostLicense&&this.ngioCore.queueComponent(this.ngioCore.getComponent("App.getHostLicense")),this.ngioCore.executeQueue(function(){this.#a=this.STATUS_LOCAL_VERSION_CHECKED,this.#C=!0,this.#G(r,i),this.#j&&console.warn("NGIO - Version mistmatch! Published version is: "+this.#k+", this version is: "+this.version),this.#i||(console.warn("NGIO - This host has been blocked fom hosting this game!"),this.#A=!0,this.#a=this.STATUS_ITEMS_PRELOADED,this.#G(r,i))},this)}static #I(){this.#z.preloadMedals&&(this.ngioCore.queueComponent(this.ngioCore.getComponent("Medal.getMedalScore")),this.ngioCore.queueComponent(this.ngioCore.getComponent("Medal.getList"))),this.#z.preloadScoreBoards&&this.ngioCore.queueComponent(this.ngioCore.getComponent("ScoreBoard.getBoards")),null!==this.user&&this.#z.preloadSaveSlots&&this.ngioCore.queueComponent(this.ngioCore.getComponent("CloudSave.loadSlots")),this.ngioCore.hasQueue?this.ngioCore.executeQueue(function(){this.#a=this.STATUS_ITEMS_PRELOADED},this):this.#a=this.STATUS_ITEMS_PRELOADED}static #F(){this.#a=this.STATUS_INITIALIZED,this.#l=!1,this.#B=!1,this.#A=!1}static #K(n){if(this.#f){let a=this.#f.length;for(let u=0;u<this.#f.length;u++)if(this.#f[u].id===n.id){a=u;break}this.#f[a]=n.clone(a<this.#f.length?this.#f[a]:null)}}static #L(l){if(this.#e){let p=this.#e.length;for(let c=0;c<this.#e.length;c++)if(this.#e[c].id===l.id){p=c;break}this.#e[p]=l.clone(p<this.#e.length?this.#e[p]:null)}}static #M(h){if(this.#d){let d=this.#d.length;for(let g=0;g<this.#d.length;g++)if(this.#d[g].id===h.id){d=g;break}this.#d[d]=h.clone(d<this.#d.length?this.#d[d]:null)}}static #E(f){let w=f.detail;if(w&&w.success){if(this.#g=new Date,Array.isArray(w.result))for(let O=0;O<w.result.length;O++)w.result[O]&&this.#N(w.result[O]);else w.result&&this.#N(w.result)}}static #N(I){switch(I.success||104===I.error.code||110===I.error.code||console.error(I.error.message+" \ncode("+I.error.code+")"),I.__object){case"App.getCurrentVersion":if(!I.success)return;this.#k=I.current_version,this.#j=I.client_deprecated;break;case"App.getHostLicense":if(!I.success)return;this.#i=I.host_approved;break;case"App.endSession":this.#F();break;case"App.checkSession":I.success||this.#F();case"App.startSession":if(!I.success){this.#F();break}I.session.clone(this.session);break;case"CloudSave.loadSlots":if(!I.success)return;this.#f=I.slots;break;case"CloudSave.loadSlot":case"CloudSave.clearSlot":if(!I.success)return;this.#K(I.slot);break;case"CloudSave.setData":if(!I.success){this.#s=null;return}this.#K(I.slot);break;case"Event.logEvent":if(!I.success){this.#u=null;return}this.#u=I.event_name;break;case"Gateway.getDatetime":if(!I.success){this.#v=0,this.#t="0000-00-00";return}this.#t=I.datetime,this.#v=I.timestamp;break;case"Gateway.getVersion":if(!I.success){this.#m=null;return}this.#m=I.version;break;case"Gateway.ping":this.#w=I.success;break;case"Medal.getList":if(!I.success)return;this.#d=[];for(let m=0;m<I.medals.length;m++)this.#d.push(I.medals[m].clone());break;case"Medal.unlock":if(!I.success){this.#n=null;return}this.#d&&(this.#M(I.medal),this.#n=this.getMedal(I.medal.id)),this.#c=I.medal_score,window.top.postMessage(JSON.stringify({ngioComponent:"Medal.unlock",id:I.medal.id}),"*");break;case"Medal.getMedalScore":if(!I.success)return;this.#c=I.medal_score;break;case"ScoreBoard.getBoards":if(!I.success)return;this.#e=[];for(let S=0;S<I.scoreboards.length;S++)this.#e.push(I.scoreboards[S].clone());break;case"ScoreBoard.postScore":if(!I.success){this.#p=null,this.#o=null;return}this.#e&&(this.#p=I.score,this.#o=this.getScoreBoard(I.scoreboard.id)),window.top.postMessage(JSON.stringify({ngioComponent:"ScoreBoard.postScore",id:I.scoreboard.id}),"*");break;case"ScoreBoard.getScores":if(!I.success){this.#q=null;return}this.#q=I}}};CryptoJS=CryptoJS||function(e,t){var s={},o=s.lib={},r=function(){},i=o.Base={extend:function(e){r.prototype=this;var t=new r;return e&&t.mixIn(e),t.hasOwnProperty("init")||(t.init=function(){t.$super.init.apply(this,arguments)}),t.init.prototype=t,t.$super=this,t},create:function(){var e=this.extend();return e.init.apply(e,arguments),e},init:function(){},mixIn:function(e){for(var t in e)e.hasOwnProperty(t)&&(this[t]=e[t]);e.hasOwnProperty("toString")&&(this.toString=e.toString)},clone:function(){return this.init.prototype.extend(this)}},n=o.WordArray=i.extend({init:function(e,t){e=this.words=e||[],this.sigBytes=void 0!=t?t:4*e.length},toString:function(e){return(e||u).stringify(this)},concat:function(e){var t=this.words,s=e.words,o=this.sigBytes;if(e=e.sigBytes,this.clamp(),o%4)for(var r=0;r<e;r++)t[o+r>>>2]|=(s[r>>>2]>>>24-8*(r%4)&255)<<24-8*((o+r)%4);else if(65535<s.length)for(r=0;r<e;r+=4)t[o+r>>>2]=s[r>>>2];else t.push.apply(t,s);return this.sigBytes+=e,this},clamp:function(){var t=this.words,s=this.sigBytes;t[s>>>2]&=4294967295<<32-8*(s%4),t.length=e.ceil(s/4)},clone:function(){var e=i.clone.call(this);return e.words=this.words.slice(0),e},random:function(t){for(var s=[],o=0;o<t;o+=4)s.push(4294967296*e.random()|0);return new n.init(s,t)}}),a=s.enc={},u=a.Hex={stringify:function(e){var t=e.words;e=e.sigBytes;for(var s=[],o=0;o<e;o++){var r=t[o>>>2]>>>24-8*(o%4)&255;s.push((r>>>4).toString(16)),s.push((15&r).toString(16))}return s.join("")},parse:function(e){for(var t=e.length,s=[],o=0;o<t;o+=2)s[o>>>3]|=parseInt(e.substr(o,2),16)<<24-4*(o%8);return new n.init(s,t/2)}},l=a.Latin1={stringify:function(e){var t=e.words;e=e.sigBytes;for(var s=[],o=0;o<e;o++)s.push(String.fromCharCode(t[o>>>2]>>>24-8*(o%4)&255));return s.join("")},parse:function(e){for(var t=e.length,s=[],o=0;o<t;o++)s[o>>>2]|=(255&e.charCodeAt(o))<<24-8*(o%4);return new n.init(s,t)}},p=a.Utf8={stringify:function(e){try{return decodeURIComponent(escape(l.stringify(e)))}catch(t){throw Error("Malformed UTF-8 data")}},parse:function(e){return l.parse(unescape(encodeURIComponent(e)))}},c=o.BufferedBlockAlgorithm=i.extend({reset:function(){this._data=new n.init,this._nDataBytes=0},_append:function(e){"string"==typeof e&&(e=p.parse(e)),this._data.concat(e),this._nDataBytes+=e.sigBytes},_process:function(t){var s=this._data,o=s.words,r=s.sigBytes,i=this.blockSize,a=r/(4*i),a=t?e.ceil(a):e.max((0|a)-this._minBufferSize,0);if(t=a*i,r=e.min(4*t,r),t){for(var u=0;u<t;u+=i)this._doProcessBlock(o,u);u=o.splice(0,t),s.sigBytes-=r}return new n.init(u,r)},clone:function(){var e=i.clone.call(this);return e._data=this._data.clone(),e},_minBufferSize:0});o.Hasher=c.extend({cfg:i.extend(),init:function(e){this.cfg=this.cfg.extend(e),this.reset()},reset:function(){c.reset.call(this),this._doReset()},update:function(e){return this._append(e),this._process(),this},finalize:function(e){return e&&this._append(e),this._doFinalize()},blockSize:16,_createHelper:function(e){return function(t,s){return new e.init(s).finalize(t)}},_createHmacHelper:function(e){return function(t,s){return new h.HMAC.init(e,s).finalize(t)}}});var h=s.algo={};return s}(Math);!function(){var e=CryptoJS,t=e.lib.WordArray;e.enc.Base64={stringify:function(e){var t=e.words,s=e.sigBytes,o=this._map;e.clamp(),e=[];for(var r=0;r<s;r+=3)for(var i=(t[r>>>2]>>>24-8*(r%4)&255)<<16|(t[r+1>>>2]>>>24-8*((r+1)%4)&255)<<8|t[r+2>>>2]>>>24-8*((r+2)%4)&255,n=0;4>n&&r+.75*n<s;n++)e.push(o.charAt(i>>>6*(3-n)&63));if(t=o.charAt(64))for(;e.length%4;)e.push(t);return e.join("")},parse:function(e){var s=e.length,o=this._map,r=o.charAt(64);r&&-1!=(r=e.indexOf(r))&&(s=r);for(var r=[],i=0,n=0;n<s;n++)if(n%4){var a=o.indexOf(e.charAt(n-1))<<2*(n%4),u=o.indexOf(e.charAt(n))>>>6-2*(n%4);r[i>>>2]|=(a|u)<<24-8*(i%4),i++}return t.create(r,i)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}}(),function(e){function t(e,t,s,o,r,i,n){return((e=e+(t&s|~t&o)+r+n)<<i|e>>>32-i)+t}function s(e,t,s,o,r,i,n){return((e=e+(t&o|s&~o)+r+n)<<i|e>>>32-i)+t}function o(e,t,s,o,r,i,n){return((e=e+(t^s^o)+r+n)<<i|e>>>32-i)+t}function r(e,t,s,o,r,i,n){return((e=e+(s^(t|~o))+r+n)<<i|e>>>32-i)+t}for(var i=CryptoJS,n=i.lib,a=n.WordArray,u=n.Hasher,n=i.algo,l=[],p=0;64>p;p++)l[p]=4294967296*e.abs(e.sin(p+1))|0;n=n.MD5=u.extend({_doReset:function(){this._hash=new a.init([1732584193,4023233417,2562383102,271733878])},_doProcessBlock:function(e,i){for(var n=0;16>n;n++){var a=i+n,u=e[a];e[a]=(u<<8|u>>>24)&16711935|(u<<24|u>>>8)&4278255360}var n=this._hash.words,a=e[i+0],u=e[i+1],p=e[i+2],c=e[i+3],h=e[i+4],d=e[i+5],g=e[i+6],f=e[i+7],w=e[i+8],O=e[i+9],I=e[i+10],m=e[i+11],S=e[i+12],N=e[i+13],b=e[i+14],y=e[i+15],v=n[0],$=n[1],C=n[2],E=n[3],v=t(v,$,C,E,a,7,l[0]),E=t(E,v,$,C,u,12,l[1]),C=t(C,E,v,$,p,17,l[2]),$=t($,C,E,v,c,22,l[3]),v=t(v,$,C,E,h,7,l[4]),E=t(E,v,$,C,d,12,l[5]),C=t(C,E,v,$,g,17,l[6]),$=t($,C,E,v,f,22,l[7]),v=t(v,$,C,E,w,7,l[8]),E=t(E,v,$,C,O,12,l[9]),C=t(C,E,v,$,I,17,l[10]),$=t($,C,E,v,m,22,l[11]),v=t(v,$,C,E,S,7,l[12]),E=t(E,v,$,C,N,12,l[13]),C=t(C,E,v,$,b,17,l[14]),$=t($,C,E,v,y,22,l[15]),v=s(v,$,C,E,u,5,l[16]),E=s(E,v,$,C,g,9,l[17]),C=s(C,E,v,$,m,14,l[18]),$=s($,C,E,v,a,20,l[19]),v=s(v,$,C,E,d,5,l[20]),E=s(E,v,$,C,I,9,l[21]),C=s(C,E,v,$,y,14,l[22]),$=s($,C,E,v,h,20,l[23]),v=s(v,$,C,E,O,5,l[24]),E=s(E,v,$,C,b,9,l[25]),C=s(C,E,v,$,c,14,l[26]),$=s($,C,E,v,w,20,l[27]),v=s(v,$,C,E,N,5,l[28]),E=s(E,v,$,C,p,9,l[29]),C=s(C,E,v,$,f,14,l[30]),$=s($,C,E,v,S,20,l[31]),v=o(v,$,C,E,d,4,l[32]),E=o(E,v,$,C,w,11,l[33]),C=o(C,E,v,$,m,16,l[34]),$=o($,C,E,v,b,23,l[35]),v=o(v,$,C,E,u,4,l[36]),E=o(E,v,$,C,h,11,l[37]),C=o(C,E,v,$,f,16,l[38]),$=o($,C,E,v,I,23,l[39]),v=o(v,$,C,E,N,4,l[40]),E=o(E,v,$,C,a,11,l[41]),C=o(C,E,v,$,c,16,l[42]),$=o($,C,E,v,g,23,l[43]),v=o(v,$,C,E,O,4,l[44]),E=o(E,v,$,C,S,11,l[45]),C=o(C,E,v,$,y,16,l[46]),$=o($,C,E,v,p,23,l[47]),v=r(v,$,C,E,a,6,l[48]),E=r(E,v,$,C,f,10,l[49]),C=r(C,E,v,$,b,15,l[50]),$=r($,C,E,v,d,21,l[51]),v=r(v,$,C,E,S,6,l[52]),E=r(E,v,$,C,c,10,l[53]),C=r(C,E,v,$,I,15,l[54]),$=r($,C,E,v,u,21,l[55]),v=r(v,$,C,E,w,6,l[56]),E=r(E,v,$,C,y,10,l[57]),C=r(C,E,v,$,g,15,l[58]),$=r($,C,E,v,N,21,l[59]),v=r(v,$,C,E,h,6,l[60]),E=r(E,v,$,C,m,10,l[61]),C=r(C,E,v,$,p,15,l[62]),$=r($,C,E,v,O,21,l[63]);n[0]=n[0]+v|0,n[1]=n[1]+$|0,n[2]=n[2]+C|0,n[3]=n[3]+E|0},_doFinalize:function(){var t=this._data,s=t.words,o=8*this._nDataBytes,r=8*t.sigBytes;s[r>>>5]|=128<<24-r%32;var i=e.floor(o/4294967296);for(s[(r+64>>>9<<4)+15]=(i<<8|i>>>24)&16711935|(i<<24|i>>>8)&4278255360,s[(r+64>>>9<<4)+14]=(o<<8|o>>>24)&16711935|(o<<24|o>>>8)&4278255360,t.sigBytes=4*(s.length+1),this._process(),s=(t=this._hash).words,o=0;4>o;o++)r=s[o],s[o]=(r<<8|r>>>24)&16711935|(r<<24|r>>>8)&4278255360;return t},clone:function(){var e=u.clone.call(this);return e._hash=this._hash.clone(),e}}),i.MD5=u._createHelper(n),i.HmacMD5=u._createHmacHelper(n)}(Math),function(){var e=CryptoJS,t=e.lib,s=t.Base,o=t.WordArray,t=e.algo,r=t.EvpKDF=s.extend({cfg:s.extend({keySize:4,hasher:t.MD5,iterations:1}),init:function(e){this.cfg=this.cfg.extend(e)},compute:function(e,t){for(var s=this.cfg,r=s.hasher.create(),i=o.create(),n=i.words,a=s.keySize,s=s.iterations;n.length<a;){u&&r.update(u);var u=r.update(e).finalize(t);r.reset();for(var l=1;l<s;l++)u=r.finalize(u),r.reset();i.concat(u)}return i.sigBytes=4*a,i}});e.EvpKDF=function(e,t,s){return r.create(s).compute(e,t)}}(),CryptoJS.lib.Cipher||function(e){var t=CryptoJS,s=t.lib,o=s.Base,r=s.WordArray,i=s.BufferedBlockAlgorithm,n=t.enc.Base64,a=t.algo.EvpKDF,u=s.Cipher=i.extend({cfg:o.extend(),createEncryptor:function(e,t){return this.create(this._ENC_XFORM_MODE,e,t)},createDecryptor:function(e,t){return this.create(this._DEC_XFORM_MODE,e,t)},init:function(e,t,s){this.cfg=this.cfg.extend(s),this._xformMode=e,this._key=t,this.reset()},reset:function(){i.reset.call(this),this._doReset()},process:function(e){return this._append(e),this._process()},finalize:function(e){return e&&this._append(e),this._doFinalize()},keySize:4,ivSize:4,_ENC_XFORM_MODE:1,_DEC_XFORM_MODE:2,_createHelper:function(e){return{encrypt:function(t,s,o){return("string"==typeof s?g:d).encrypt(e,t,s,o)},decrypt:function(t,s,o){return("string"==typeof s?g:d).decrypt(e,t,s,o)}}}});s.StreamCipher=u.extend({_doFinalize:function(){return this._process(!0)},blockSize:1});var l=t.mode={},p=function(e,t,s){var o=this._iv;o?this._iv=void 0:o=this._prevBlock;for(var r=0;r<s;r++)e[t+r]^=o[r]},c=(s.BlockCipherMode=o.extend({createEncryptor:function(e,t){return this.Encryptor.create(e,t)},createDecryptor:function(e,t){return this.Decryptor.create(e,t)},init:function(e,t){this._cipher=e,this._iv=t}})).extend();c.Encryptor=c.extend({processBlock:function(e,t){var s=this._cipher,o=s.blockSize;p.call(this,e,t,o),s.encryptBlock(e,t),this._prevBlock=e.slice(t,t+o)}}),c.Decryptor=c.extend({processBlock:function(e,t){var s=this._cipher,o=s.blockSize,r=e.slice(t,t+o);s.decryptBlock(e,t),p.call(this,e,t,o),this._prevBlock=r}}),l=l.CBC=c,c=(t.pad={}).Pkcs7={pad:function(e,t){for(var s=4*t,s=s-e.sigBytes%s,o=s<<24|s<<16|s<<8|s,i=[],n=0;n<s;n+=4)i.push(o);s=r.create(i,s),e.concat(s)},unpad:function(e){e.sigBytes-=255&e.words[e.sigBytes-1>>>2]}},s.BlockCipher=u.extend({cfg:u.cfg.extend({mode:l,padding:c}),reset:function(){u.reset.call(this);var e=this.cfg,t=e.iv,e=e.mode;if(this._xformMode==this._ENC_XFORM_MODE)var s=e.createEncryptor;else s=e.createDecryptor,this._minBufferSize=1;this._mode=s.call(e,this,t&&t.words)},_doProcessBlock:function(e,t){this._mode.processBlock(e,t)},_doFinalize:function(){var e=this.cfg.padding;if(this._xformMode==this._ENC_XFORM_MODE){e.pad(this._data,this.blockSize);var t=this._process(!0)}else t=this._process(!0),e.unpad(t);return t},blockSize:4});var h=s.CipherParams=o.extend({init:function(e){this.mixIn(e)},toString:function(e){return(e||this.formatter).stringify(this)}}),l=(t.format={}).OpenSSL={stringify:function(e){var t=e.ciphertext;return((e=e.salt)?r.create([1398893684,1701076831]).concat(e).concat(t):t).toString(n)},parse:function(e){var t=(e=n.parse(e)).words;if(1398893684==t[0]&&1701076831==t[1]){var s=r.create(t.slice(2,4));t.splice(0,4),e.sigBytes-=16}return h.create({ciphertext:e,salt:s})}},d=s.SerializableCipher=o.extend({cfg:o.extend({format:l}),encrypt:function(e,t,s,o){o=this.cfg.extend(o);var r=e.createEncryptor(s,o);return t=r.finalize(t),r=r.cfg,h.create({ciphertext:t,key:s,iv:r.iv,algorithm:e,mode:r.mode,padding:r.padding,blockSize:e.blockSize,formatter:o.format})},decrypt:function(e,t,s,o){return o=this.cfg.extend(o),t=this._parse(t,o.format),e.createDecryptor(s,o).finalize(t.ciphertext)},_parse:function(e,t){return"string"==typeof e?t.parse(e,this):e}}),t=(t.kdf={}).OpenSSL={execute:function(e,t,s,o){return o||(o=r.random(8)),e=a.create({keySize:t+s}).compute(e,o),s=r.create(e.words.slice(t),4*s),e.sigBytes=4*t,h.create({key:e,iv:s,salt:o})}},g=s.PasswordBasedCipher=d.extend({cfg:d.cfg.extend({kdf:t}),encrypt:function(e,t,s,o){return s=(o=this.cfg.extend(o)).kdf.execute(s,e.keySize,e.ivSize),o.iv=s.iv,(e=d.encrypt.call(this,e,t,s.key,o)).mixIn(s),e},decrypt:function(e,t,s,o){return o=this.cfg.extend(o),t=this._parse(t,o.format),s=o.kdf.execute(s,e.keySize,e.ivSize,t.salt),o.iv=s.iv,d.decrypt.call(this,e,t,s.key,o)}})}(),function(){for(var e=CryptoJS,t=e.lib.BlockCipher,s=e.algo,o=[],r=[],i=[],n=[],a=[],u=[],l=[],p=[],c=[],h=[],d=[],g=0;256>g;g++)d[g]=128>g?g<<1:g<<1^283;for(var f=0,w=0,g=0;256>g;g++){var O=w^w<<1^w<<2^w<<3^w<<4,O=O>>>8^255&O^99;o[f]=O,r[O]=f;var I=d[f],m=d[I],S=d[m],N=257*d[O]^16843008*O;i[f]=N<<24|N>>>8,n[f]=N<<16|N>>>16,a[f]=N<<8|N>>>24,u[f]=N,N=16843009*S^65537*m^257*I^16843008*f,l[O]=N<<24|N>>>8,p[O]=N<<16|N>>>16,c[O]=N<<8|N>>>24,h[O]=N,f?(f=I^d[d[d[S^I]]],w^=d[d[w]]):f=w=1}var b=[0,1,2,4,8,16,32,64,128,27,54],s=s.AES=t.extend({_doReset:function(){for(var e=this._key,t=e.words,s=e.sigBytes/4,e=4*((this._nRounds=s+6)+1),r=this._keySchedule=[],i=0;i<e;i++)if(i<s)r[i]=t[i];else{var n=r[i-1];i%s?6<s&&4==i%s&&(n=o[n>>>24]<<24|o[n>>>16&255]<<16|o[n>>>8&255]<<8|o[255&n]):(n=o[(n=n<<8|n>>>24)>>>24]<<24|o[n>>>16&255]<<16|o[n>>>8&255]<<8|o[255&n],n^=b[i/s|0]<<24),r[i]=r[i-s]^n}for(s=0,t=this._invKeySchedule=[];s<e;s++)i=e-s,n=s%4?r[i]:r[i-4],t[s]=4>s||4>=i?n:l[o[n>>>24]]^p[o[n>>>16&255]]^c[o[n>>>8&255]]^h[o[255&n]]},encryptBlock:function(e,t){this._doCryptBlock(e,t,this._keySchedule,i,n,a,u,o)},decryptBlock:function(e,t){var s=e[t+1];e[t+1]=e[t+3],e[t+3]=s,this._doCryptBlock(e,t,this._invKeySchedule,l,p,c,h,r),s=e[t+1],e[t+1]=e[t+3],e[t+3]=s},_doCryptBlock:function(e,t,s,o,r,i,n,a){for(var u=this._nRounds,l=e[t]^s[0],p=e[t+1]^s[1],c=e[t+2]^s[2],h=e[t+3]^s[3],d=4,g=1;g<u;g++)var f=o[l>>>24]^r[p>>>16&255]^i[c>>>8&255]^n[255&h]^s[d++],w=o[p>>>24]^r[c>>>16&255]^i[h>>>8&255]^n[255&l]^s[d++],O=o[c>>>24]^r[h>>>16&255]^i[l>>>8&255]^n[255&p]^s[d++],h=o[h>>>24]^r[l>>>16&255]^i[p>>>8&255]^n[255&c]^s[d++],l=f,p=w,c=O;f=(a[l>>>24]<<24|a[p>>>16&255]<<16|a[c>>>8&255]<<8|a[255&h])^s[d++],w=(a[p>>>24]<<24|a[c>>>16&255]<<16|a[h>>>8&255]<<8|a[255&l])^s[d++],O=(a[c>>>24]<<24|a[h>>>16&255]<<16|a[l>>>8&255]<<8|a[255&p])^s[d++],h=(a[h>>>24]<<24|a[l>>>16&255]<<16|a[p>>>8&255]<<8|a[255&c])^s[d++],e[t]=f,e[t+1]=w,e[t+2]=O,e[t+3]=h},keySize:8});e.AES=t._createHelper(s)}();NewgroundsIO=NewgroundsIO||{};NewgroundsIO.objects=NewgroundsIO.objects?NewgroundsIO.objects:{},NewgroundsIO.results=NewgroundsIO.results?NewgroundsIO.results:{},NewgroundsIO.components=NewgroundsIO.components?NewgroundsIO.components:{},(()=>{class e extends EventTarget{#O="https://www.newgrounds.io/gateway_v3.php";#P=!1;#Q=null;#R=null;#S=[];#T=null;#U=null;#V={};get GATEWAY_URI(){return this.#O}get debug(){return this.#P}set debug(e){this.#P=!!e}get appID(){return this.#Q}get componentQueue(){return this.#S}get hasQueue(){return this.#S.length>0}get host(){return this.#T}get session(){return this.#U}get user(){return this.#U?this.#U.user:null}get uriParams(){return this.#V}constructor(e,t){if(super(),void 0===e)throw"Missing required appID!";if(void 0===t)throw"Missing required aesKey!";if(this.#Q=e,this.#R=CryptoJS.enc.Base64.parse(t),this.#S=[],this.#V={},window&&window.location&&window.location.href?window.location.hostname?this.#T=window.location.hostname.toLowerCase():"file:"==window.location.href.toLowerCase().substr(0,5)?this.#T="<LocalHost>":this.#T="<Unknown>":this.#T="<AppView>","undefined"!=typeof window&&window.location){var s,o=window.location.href.split("?").pop();if(o)for(var r,i=o.split("&"),n=0;n<i.length;n++)r=i[n].split("="),this.#V[r[0]]=r[1]}this.#U=this.getObject("Session"),this.#U.uri_id=this.getUriParam("ngio_session_id",null)}getUriParam(e,t){return void 0===this.#V[e]?t:this.#V[e]}encrypt(e){let t=CryptoJS.lib.WordArray.random(16),s=CryptoJS.AES.encrypt(e,this.#R,{iv:t});return CryptoJS.enc.Base64.stringify(t.concat(s.ciphertext))}getObject(e,t){if(void 0===NewgroundsIO.objects[e])return console.error("NewgroundsIO - Invalid object name: "+e),null;var s=new NewgroundsIO.objects[e](t);return s.setCore(this),s}getComponent(e,t){var s=e.split("."),o=!1;if(2!==s.length?o="Invalid component name: "+e:void 0===NewgroundsIO.components[s[0]]?o="Invalid component name: "+e:void 0===NewgroundsIO.components[s[0]][s[1]]&&(o="Invalid component name: "+e),o)return console.error("NewgroundsIO - "+o),null;var r=new NewgroundsIO.components[s[0]][s[1]](t);return r.setCore(this),r}queueComponent(e){this._verifyComponent(e)&&(e.setCore(this),this.#S.push(e))}executeQueue(e,t){this.#S.length<1||(this.executeComponent(this.#S,e,t),this.#S=[])}executeComponent(e,t,s){if(Array.isArray(e)){let o=!0,r=this;if(e.forEach(t=>{t instanceof NewgroundsIO.BaseComponent||(r._verifyComponent(e)||(o=!1),t.setCore(r))}),!o)return}else{if(!this._verifyComponent(e))return;e.setCore(this)}let i=this,n=this._getRequest(e);new NewgroundsIO.objects.Response;var a=new XMLHttpRequest;a.onreadystatechange=function(){if(4==a.readyState){var e;try{e=JSON.parse(a.responseText)}catch(o){(e={success:!1,app_id:i.app_id}).error={message:String(o),code:8002}}let r=i._populateResponse(e);i.dispatchEvent(new CustomEvent("serverResponse",{detail:r})),t&&(s?t.call(s,r):t(r))}};var u=void 0!==Array.prototype.toJSON?Array.prototype.toJSON:null;u&&delete Array.prototype.toJSON;let l=new FormData;l.append("request",JSON.stringify(n)),u&&(Array.prototype.toJSON=u),a.open("POST",this.GATEWAY_URI,!0),a.send(l)}loadComponent(e){if(!this._verifyComponent(e))return;e.setCore(this);let t=this._getRequest(e),s=this.GATEWAY_URI+"?request="+encodeURIComponent(JSON.stringify(t));window.open(s,"_blank")}onServerResponse(e){}_populateResponse(e){if(e.success){if(Array.isArray(e.result))for(let t=0;t<e.result.length;t++)e.result[t]=this._populateResult(e.result[t]);else e.result=this._populateResult(e.result)}else e.result&&delete e.result,e.error&&(e.error=new NewgroundsIO.objects.Error(e.error));return(e=new NewgroundsIO.objects.Response(e)).setCore(this),e}_populateResult(e){let t=e.component.split("."),s=NewgroundsIO.results[t[0]][t[1]];if(!s)return null;e.data.component=e.component;let o=new s;return o.fromJSON(e.data,this),o}_getExecute(e){var t=new NewgroundsIO.objects.Execute;return t.setComponent(e),t.setCore(this),t}_getRequest(e){let t,s=this;Array.isArray(e)?(t=[],e.forEach(e=>{let o=s._getExecute(e);t.push(o)})):t=this._getExecute(e);let o=new NewgroundsIO.objects.Request({execute:t});return this.debug&&(o.debug=!0),o.setCore(this),o}_verifyComponent(e){return e instanceof NewgroundsIO.BaseComponent?!!e.isValid():(console.error("NewgroundsIO Type Mismatch: Expecting a NewgroundsIO.components.XXXX instance, got",e),!1)}}NewgroundsIO.Core=e})(),(()=>{class e{get type(){return this.__type}__type="object";__object="BaseObject";__properties=[];__required=[];__ngioCore=null;isValid(){if(0===this.__required.length)return!0;let e=!0;return this.__required.forEach(function(t){null===this[t]?(console.error("NewgroundsIO Error: "+this.__object+" "+this.__type+" is invalid, missing value for '"+t+"'"),e=!1):this[t]instanceof NewgroundsIO.BaseObject&&!this[t].isValid()&&(e=!1)},this),e}setCore(e){this._doSetCore(e,[])}objectMap={};arrayMap={};fromJSON(e,t){var s,o,r={};for(this.setCore(t),s=0;s<this.__properties.length;s++){let i=this.__properties[s];if(void 0!==e[i]&&null!==e[i]){if(r[i]=e[i],void 0!==this.arrayMap[i]&&Array.isArray(r[i]))for(o=0,r[i]=[];o<e[i].length;o++){let n=NewgroundsIO.objects[this.arrayMap[i]];r[i][o]=new n,r[i][o].fromJSON(e[i][o],t)}else if(void 0!==this.objectMap[i]){let a=NewgroundsIO.objects[this.objectMap[i]];r[i]=new a,r[i].fromJSON(e[i],t)}this[i]=r[i]}}}_doSetCore(e,t){Array.isArray(t)||(t=[]),e instanceof NewgroundsIO.Core?(this.__ngioCore=e,t.push(this),this.__properties.forEach(function(s){this[s]instanceof NewgroundsIO.BaseObject&&-1===t.indexOf(this[s])?this[s]._doSetCore(e,t):Array.isArray(this[s])&&this[s].forEach(s=>{s instanceof NewgroundsIO.BaseObject&&-1===t.indexOf(s)&&s._doSetCore(e,t)},this),"host"!==s||this.host||(this.host=e.host)},this)):console.error("NewgroundsIO Error: Expecting NewgroundsIO.Core instance, got",e)}toJSON(){return this.__doToJSON()}__doToJSON(){if(void 0===this.__properties)return{};let e={};return this.__properties.forEach(function(t){null!==this[t]&&(e[t]="function"==typeof this[t].toJSON?this[t].toJSON():this[t])},this),e}toSecureJSON(){return this.__ngioCore&&this.__ngioCore instanceof NewgroundsIO.Core?{secure:this.__ngioCore.encrypt(JSON.stringify(this.__doToJSON()))}:(console.error("NewgroundsIO Error: Unable to create secure JSON object without calling setCore() first."),this.__doToJSON())}toString(){return this.__type}clone(e){return void 0===e&&(e=new this.constructor),this.__properties.forEach(t=>{e[t]=this[t]}),e.__ngioCore=this.__ngioCore,e}}NewgroundsIO.BaseObject=e;class t extends e{constructor(){super(),this.__type="component",this.__object="BaseComponent",this.__properties=["host","echo"],this._echo=null}get host(){return this.__ngioCore?this.__ngioCore.host:null}get echo(){return this._echo}set echo(e){this.echo=""+e}}NewgroundsIO.BaseComponent=t;class s extends e{constructor(){super(),this.__type="result",this.__object="BaseResult",this.__properties=["echo","error","success"],this._echo=null,this._error=null,this._success=null}get component(){return this.__object}get echo(){return this._echo}get error(){return this._error}set error(e){this._error=e}get success(){return!!this._success}set success(e){this._success=!!e}}NewgroundsIO.BaseResult=s})(),NewgroundsIO.SessionState={SESSION_UNINITIALIZED:"session-uninitialized",WAITING_FOR_SERVER:"waiting-for-server",LOGIN_REQUIRED:"login-required",WAITING_FOR_USER:"waiting-for-user",LOGIN_CANCELLED:"login-cancelled",LOGIN_SUCCESSFUL:"login-successful",LOGIN_FAILED:"login-failed",USER_LOGGED_OUT:"user-logged-out",SERVER_UNAVAILABLE:"server-unavailable",EXCEEDED_MAX_ATTEMPTS:"exceeded-max-attempts"},NewgroundsIO.SessionState.SESSION_WAITING=[NewgroundsIO.SessionState.SESSION_UNINITIALIZED,NewgroundsIO.SessionState.WAITING_FOR_SERVER,NewgroundsIO.SessionState.WAITING_FOR_USER,NewgroundsIO.SessionState.LOGIN_CANCELLED,NewgroundsIO.SessionStateLOGIN_FAILED],(()=>{class e extends NewgroundsIO.BaseComponent{constructor(){super(),this.__object="App.checkSession",this.__requireSession=!0}}void 0===NewgroundsIO.components.App&&(NewgroundsIO.components.App={}),NewgroundsIO.components.App.checkSession=e})(),(()=>{class e extends NewgroundsIO.BaseComponent{constructor(){super(),this.__object="App.endSession",this.__requireSession=!0}}void 0===NewgroundsIO.components.App&&(NewgroundsIO.components.App={}),NewgroundsIO.components.App.endSession=e})(),(()=>{class e extends NewgroundsIO.BaseComponent{constructor(e){super();let t=this;if(this.__object="App.getCurrentVersion",["version"].forEach(e=>{0>t.__properties.indexOf(e)&&t.__properties.push(e)}),e&&"object"==typeof e)for(var s=0;s<this.__properties.length;s++)void 0!==e[this.__properties[s]]&&(this[this.__properties[s]]=e[this.__properties[s]])}#x=null;get version(){return this.#x}set version(e){"string"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a string, got",e),this.#x=String(e)}}void 0===NewgroundsIO.components.App&&(NewgroundsIO.components.App={}),NewgroundsIO.components.App.getCurrentVersion=e})(),(()=>{class e extends NewgroundsIO.BaseComponent{constructor(e){super();let t=this;if(this.__object="App.getHostLicense",["host"].forEach(e=>{0>t.__properties.indexOf(e)&&t.__properties.push(e)}),e&&"object"==typeof e)for(var s=0;s<this.__properties.length;s++)void 0!==e[this.__properties[s]]&&(this[this.__properties[s]]=e[this.__properties[s]])}}void 0===NewgroundsIO.components.App&&(NewgroundsIO.components.App={}),NewgroundsIO.components.App.getHostLicense=e})(),(()=>{class e extends NewgroundsIO.BaseComponent{constructor(e){super();let t=this;if(this.__object="App.logView",["host"].forEach(e=>{0>t.__properties.indexOf(e)&&t.__properties.push(e)}),e&&"object"==typeof e)for(var s=0;s<this.__properties.length;s++)void 0!==e[this.__properties[s]]&&(this[this.__properties[s]]=e[this.__properties[s]])}}void 0===NewgroundsIO.components.App&&(NewgroundsIO.components.App={}),NewgroundsIO.components.App.logView=e})(),(()=>{class e extends NewgroundsIO.BaseComponent{constructor(e){super();let t=this;if(this.__object="App.startSession",["force"].forEach(e=>{0>t.__properties.indexOf(e)&&t.__properties.push(e)}),e&&"object"==typeof e)for(var s=0;s<this.__properties.length;s++)void 0!==e[this.__properties[s]]&&(this[this.__properties[s]]=e[this.__properties[s]])}#W=null;get force(){return this.#W}set force(e){"boolean"!=typeof e&&"number"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a boolean, got",e),this.#W=!!e}}void 0===NewgroundsIO.components.App&&(NewgroundsIO.components.App={}),NewgroundsIO.components.App.startSession=e})(),(()=>{class e extends NewgroundsIO.BaseComponent{constructor(e){super();let t=this;if(this.__object="CloudSave.clearSlot",this.__requireSession=!0,["id"].forEach(e=>{0>t.__properties.indexOf(e)&&t.__properties.push(e)}),e&&"object"==typeof e)for(var s=0;s<this.__properties.length;s++)void 0!==e[this.__properties[s]]&&(this[this.__properties[s]]=e[this.__properties[s]])}#X=null;get id(){return this.#X}set id(e){"number"!=typeof e&&null!==e?console.warn("NewgroundsIO Type Mismatch: Value should be a number, got",e):Number.isInteger(e)||null===e||console.warn("NewgroundsIO Type Mismatch: Value should be an integer, got a float"),this.#X=Number(e),isNaN(this.#X)&&(this.#X=null)}}void 0===NewgroundsIO.components.CloudSave&&(NewgroundsIO.components.CloudSave={}),NewgroundsIO.components.CloudSave.clearSlot=e})(),(()=>{class e extends NewgroundsIO.BaseComponent{constructor(e){super();let t=this;if(this.__object="CloudSave.loadSlot",this.__requireSession=!0,["id","app_id"].forEach(e=>{0>t.__properties.indexOf(e)&&t.__properties.push(e)}),e&&"object"==typeof e)for(var s=0;s<this.__properties.length;s++)void 0!==e[this.__properties[s]]&&(this[this.__properties[s]]=e[this.__properties[s]])}#X=null;get id(){return this.#X}set id(e){"number"!=typeof e&&null!==e?console.warn("NewgroundsIO Type Mismatch: Value should be a number, got",e):Number.isInteger(e)||null===e||console.warn("NewgroundsIO Type Mismatch: Value should be an integer, got a float"),this.#X=Number(e),isNaN(this.#X)&&(this.#X=null)}#Y=null;get app_id(){return this.#Y}set app_id(e){"string"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a string, got",e),this.#Y=String(e)}}void 0===NewgroundsIO.components.CloudSave&&(NewgroundsIO.components.CloudSave={}),NewgroundsIO.components.CloudSave.loadSlot=e})(),(()=>{class e extends NewgroundsIO.BaseComponent{constructor(e){super();let t=this;if(this.__object="CloudSave.loadSlots",this.__requireSession=!0,["app_id"].forEach(e=>{0>t.__properties.indexOf(e)&&t.__properties.push(e)}),e&&"object"==typeof e)for(var s=0;s<this.__properties.length;s++)void 0!==e[this.__properties[s]]&&(this[this.__properties[s]]=e[this.__properties[s]])}#Y=null;get app_id(){return this.#Y}set app_id(e){"string"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a string, got",e),this.#Y=String(e)}}void 0===NewgroundsIO.components.CloudSave&&(NewgroundsIO.components.CloudSave={}),NewgroundsIO.components.CloudSave.loadSlots=e})(),(()=>{class e extends NewgroundsIO.BaseComponent{constructor(e){super();let t=this;if(this.__object="CloudSave.setData",this.__requireSession=!0,["id","data"].forEach(e=>{0>t.__properties.indexOf(e)&&t.__properties.push(e)}),e&&"object"==typeof e)for(var s=0;s<this.__properties.length;s++)void 0!==e[this.__properties[s]]&&(this[this.__properties[s]]=e[this.__properties[s]])}#X=null;get id(){return this.#X}set id(e){"number"!=typeof e&&null!==e?console.warn("NewgroundsIO Type Mismatch: Value should be a number, got",e):Number.isInteger(e)||null===e||console.warn("NewgroundsIO Type Mismatch: Value should be an integer, got a float"),this.#X=Number(e),isNaN(this.#X)&&(this.#X=null)}#Z=null;get data(){return this.#Z}set data(e){"string"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a string, got",e),this.#Z=String(e)}}void 0===NewgroundsIO.components.CloudSave&&(NewgroundsIO.components.CloudSave={}),NewgroundsIO.components.CloudSave.setData=e})(),(()=>{class e extends NewgroundsIO.BaseComponent{constructor(e){super();let t=this;if(this.__object="Event.logEvent",["host","event_name"].forEach(e=>{0>t.__properties.indexOf(e)&&t.__properties.push(e)}),e&&"object"==typeof e)for(var s=0;s<this.__properties.length;s++)void 0!==e[this.__properties[s]]&&(this[this.__properties[s]]=e[this.__properties[s]])}#$=null;get event_name(){return this.#$}set event_name(e){"string"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a string, got",e),this.#$=String(e)}}void 0===NewgroundsIO.components.Event&&(NewgroundsIO.components.Event={}),NewgroundsIO.components.Event.logEvent=e})(),(()=>{class e extends NewgroundsIO.BaseComponent{constructor(){super(),this.__object="Gateway.getDatetime"}}void 0===NewgroundsIO.components.Gateway&&(NewgroundsIO.components.Gateway={}),NewgroundsIO.components.Gateway.getDatetime=e})(),(()=>{class e extends NewgroundsIO.BaseComponent{constructor(){super(),this.__object="Gateway.getVersion"}}void 0===NewgroundsIO.components.Gateway&&(NewgroundsIO.components.Gateway={}),NewgroundsIO.components.Gateway.getVersion=e})(),(()=>{class e extends NewgroundsIO.BaseComponent{constructor(){super(),this.__object="Gateway.ping"}}void 0===NewgroundsIO.components.Gateway&&(NewgroundsIO.components.Gateway={}),NewgroundsIO.components.Gateway.ping=e})(),(()=>{class e extends NewgroundsIO.BaseComponent{constructor(e){super();let t=this;if(this.__object="Loader.loadAuthorUrl",["host","redirect","log_stat"].forEach(e=>{0>t.__properties.indexOf(e)&&t.__properties.push(e)}),e&&"object"==typeof e)for(var s=0;s<this.__properties.length;s++)void 0!==e[this.__properties[s]]&&(this[this.__properties[s]]=e[this.__properties[s]])}#_=null;get redirect(){return this.#_}set redirect(e){"boolean"!=typeof e&&"number"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a boolean, got",e),this.#_=!!e}#aa=null;get log_stat(){return this.#aa}set log_stat(e){"boolean"!=typeof e&&"number"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a boolean, got",e),this.#aa=!!e}}void 0===NewgroundsIO.components.Loader&&(NewgroundsIO.components.Loader={}),NewgroundsIO.components.Loader.loadAuthorUrl=e})(),(()=>{class e extends NewgroundsIO.BaseComponent{constructor(e){super();let t=this;if(this.__object="Loader.loadMoreGames",["host","redirect","log_stat"].forEach(e=>{0>t.__properties.indexOf(e)&&t.__properties.push(e)}),e&&"object"==typeof e)for(var s=0;s<this.__properties.length;s++)void 0!==e[this.__properties[s]]&&(this[this.__properties[s]]=e[this.__properties[s]])}#_=null;get redirect(){return this.#_}set redirect(e){"boolean"!=typeof e&&"number"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a boolean, got",e),this.#_=!!e}#aa=null;get log_stat(){return this.#aa}set log_stat(e){"boolean"!=typeof e&&"number"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a boolean, got",e),this.#aa=!!e}}void 0===NewgroundsIO.components.Loader&&(NewgroundsIO.components.Loader={}),NewgroundsIO.components.Loader.loadMoreGames=e})(),(()=>{class e extends NewgroundsIO.BaseComponent{constructor(e){super();let t=this;if(this.__object="Loader.loadNewgrounds",["host","redirect","log_stat"].forEach(e=>{0>t.__properties.indexOf(e)&&t.__properties.push(e)}),e&&"object"==typeof e)for(var s=0;s<this.__properties.length;s++)void 0!==e[this.__properties[s]]&&(this[this.__properties[s]]=e[this.__properties[s]])}#_=null;get redirect(){return this.#_}set redirect(e){"boolean"!=typeof e&&"number"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a boolean, got",e),this.#_=!!e}#aa=null;get log_stat(){return this.#aa}set log_stat(e){"boolean"!=typeof e&&"number"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a boolean, got",e),this.#aa=!!e}}void 0===NewgroundsIO.components.Loader&&(NewgroundsIO.components.Loader={}),NewgroundsIO.components.Loader.loadNewgrounds=e})(),(()=>{class e extends NewgroundsIO.BaseComponent{constructor(e){super();let t=this;if(this.__object="Loader.loadOfficialUrl",["host","redirect","log_stat"].forEach(e=>{0>t.__properties.indexOf(e)&&t.__properties.push(e)}),e&&"object"==typeof e)for(var s=0;s<this.__properties.length;s++)void 0!==e[this.__properties[s]]&&(this[this.__properties[s]]=e[this.__properties[s]])}#_=null;get redirect(){return this.#_}set redirect(e){"boolean"!=typeof e&&"number"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a boolean, got",e),this.#_=!!e}#aa=null;get log_stat(){return this.#aa}set log_stat(e){"boolean"!=typeof e&&"number"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a boolean, got",e),this.#aa=!!e}}void 0===NewgroundsIO.components.Loader&&(NewgroundsIO.components.Loader={}),NewgroundsIO.components.Loader.loadOfficialUrl=e})(),(()=>{class e extends NewgroundsIO.BaseComponent{constructor(e){super();let t=this;if(this.__object="Loader.loadReferral",["host","referral_name","redirect","log_stat"].forEach(e=>{0>t.__properties.indexOf(e)&&t.__properties.push(e)}),e&&"object"==typeof e)for(var s=0;s<this.__properties.length;s++)void 0!==e[this.__properties[s]]&&(this[this.__properties[s]]=e[this.__properties[s]])}#ab=null;get referral_name(){return this.#ab}set referral_name(e){"string"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a string, got",e),this.#ab=String(e)}#_=null;get redirect(){return this.#_}set redirect(e){"boolean"!=typeof e&&"number"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a boolean, got",e),this.#_=!!e}#aa=null;get log_stat(){return this.#aa}set log_stat(e){"boolean"!=typeof e&&"number"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a boolean, got",e),this.#aa=!!e}}void 0===NewgroundsIO.components.Loader&&(NewgroundsIO.components.Loader={}),NewgroundsIO.components.Loader.loadReferral=e})(),(()=>{class e extends NewgroundsIO.BaseComponent{constructor(e){super();let t=this;if(this.__object="Medal.getList",["app_id"].forEach(e=>{0>t.__properties.indexOf(e)&&t.__properties.push(e)}),e&&"object"==typeof e)for(var s=0;s<this.__properties.length;s++)void 0!==e[this.__properties[s]]&&(this[this.__properties[s]]=e[this.__properties[s]])}#Y=null;get app_id(){return this.#Y}set app_id(e){"string"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a string, got",e),this.#Y=String(e)}}void 0===NewgroundsIO.components.Medal&&(NewgroundsIO.components.Medal={}),NewgroundsIO.components.Medal.getList=e})(),(()=>{class e extends NewgroundsIO.BaseComponent{constructor(){super(),this.__object="Medal.getMedalScore",this.__requireSession=!0}}void 0===NewgroundsIO.components.Medal&&(NewgroundsIO.components.Medal={}),NewgroundsIO.components.Medal.getMedalScore=e})(),(()=>{class e extends NewgroundsIO.BaseComponent{constructor(e){super();let t=this;if(this.__object="Medal.unlock",this.__isSecure=!0,this.__requireSession=!0,["id"].forEach(e=>{0>t.__properties.indexOf(e)&&t.__properties.push(e)}),e&&"object"==typeof e)for(var s=0;s<this.__properties.length;s++)void 0!==e[this.__properties[s]]&&(this[this.__properties[s]]=e[this.__properties[s]])}#X=null;get id(){return this.#X}set id(e){"number"!=typeof e&&null!==e?console.warn("NewgroundsIO Type Mismatch: Value should be a number, got",e):Number.isInteger(e)||null===e||console.warn("NewgroundsIO Type Mismatch: Value should be an integer, got a float"),this.#X=Number(e),isNaN(this.#X)&&(this.#X=null)}}void 0===NewgroundsIO.components.Medal&&(NewgroundsIO.components.Medal={}),NewgroundsIO.components.Medal.unlock=e})(),(()=>{class e extends NewgroundsIO.BaseComponent{constructor(){super(),this.__object="ScoreBoard.getBoards"}}void 0===NewgroundsIO.components.ScoreBoard&&(NewgroundsIO.components.ScoreBoard={}),NewgroundsIO.components.ScoreBoard.getBoards=e})(),(()=>{class e extends NewgroundsIO.BaseComponent{constructor(e){super();let t=this;if(this.__object="ScoreBoard.getScores",["id","period","tag","social","user","skip","limit","app_id"].forEach(e=>{0>t.__properties.indexOf(e)&&t.__properties.push(e)}),e&&"object"==typeof e)for(var s=0;s<this.__properties.length;s++)void 0!==e[this.__properties[s]]&&(this[this.__properties[s]]=e[this.__properties[s]])}#X=null;get id(){return this.#X}set id(e){"number"!=typeof e&&null!==e?console.warn("NewgroundsIO Type Mismatch: Value should be a number, got",e):Number.isInteger(e)||null===e||console.warn("NewgroundsIO Type Mismatch: Value should be an integer, got a float"),this.#X=Number(e),isNaN(this.#X)&&(this.#X=null)}#ac=null;get period(){return this.#ac}set period(e){"string"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a string, got",e),this.#ac=String(e)}#ad=null;get tag(){return this.#ad}set tag(e){"string"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a string, got",e),this.#ad=String(e)}#ae=null;get social(){return this.#ae}set social(e){"boolean"!=typeof e&&"number"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a boolean, got",e),this.#ae=!!e}#af=null;get user(){return this.#af}set user(e){this.#af=e}#ag=null;get skip(){return this.#ag}set skip(e){"number"!=typeof e&&null!==e?console.warn("NewgroundsIO Type Mismatch: Value should be a number, got",e):Number.isInteger(e)||null===e||console.warn("NewgroundsIO Type Mismatch: Value should be an integer, got a float"),this.#ag=Number(e),isNaN(this.#ag)&&(this.#ag=null)}#ah=null;get limit(){return this.#ah}set limit(e){"number"!=typeof e&&null!==e?console.warn("NewgroundsIO Type Mismatch: Value should be a number, got",e):Number.isInteger(e)||null===e||console.warn("NewgroundsIO Type Mismatch: Value should be an integer, got a float"),this.#ah=Number(e),isNaN(this.#ah)&&(this.#ah=null)}#Y=null;get app_id(){return this.#Y}set app_id(e){"string"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a string, got",e),this.#Y=String(e)}}void 0===NewgroundsIO.components.ScoreBoard&&(NewgroundsIO.components.ScoreBoard={}),NewgroundsIO.components.ScoreBoard.getScores=e})(),(()=>{class e extends NewgroundsIO.BaseComponent{constructor(e){super();let t=this;if(this.__object="ScoreBoard.postScore",this.__isSecure=!0,this.__requireSession=!0,["id","value","tag"].forEach(e=>{0>t.__properties.indexOf(e)&&t.__properties.push(e)}),e&&"object"==typeof e)for(var s=0;s<this.__properties.length;s++)void 0!==e[this.__properties[s]]&&(this[this.__properties[s]]=e[this.__properties[s]])}#X=null;get id(){return this.#X}set id(e){"number"!=typeof e&&null!==e?console.warn("NewgroundsIO Type Mismatch: Value should be a number, got",e):Number.isInteger(e)||null===e||console.warn("NewgroundsIO Type Mismatch: Value should be an integer, got a float"),this.#X=Number(e),isNaN(this.#X)&&(this.#X=null)}#ai=null;get value(){return this.#ai}set value(e){"number"!=typeof e&&null!==e?console.warn("NewgroundsIO Type Mismatch: Value should be a number, got",e):Number.isInteger(e)||null===e||console.warn("NewgroundsIO Type Mismatch: Value should be an integer, got a float"),this.#ai=Number(e),isNaN(this.#ai)&&(this.#ai=null)}#ad=null;get tag(){return this.#ad}set tag(e){"string"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a string, got",e),this.#ad=String(e)}}void 0===NewgroundsIO.components.ScoreBoard&&(NewgroundsIO.components.ScoreBoard={}),NewgroundsIO.components.ScoreBoard.postScore=e})(),(()=>{class e extends NewgroundsIO.BaseObject{constructor(e){super();let t=this;if(this.__object="Debug",["exec_time","request"].forEach(e=>{0>t.__properties.indexOf(e)&&t.__properties.push(e)}),e&&"object"==typeof e)for(var s=0;s<this.__properties.length;s++)void 0!==e[this.__properties[s]]&&(this[this.__properties[s]]=e[this.__properties[s]])}#aj=null;get exec_time(){return this.#aj}set exec_time(e){"string"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a string, got",e),this.#aj=String(e)}#ak=null;get request(){return this.#ak}set request(e){e instanceof NewgroundsIO.objects.Request||"object"!=typeof e||(e=new NewgroundsIO.objects.Request(e)),null===e||e instanceof NewgroundsIO.objects.Request||console.warn("Type Mismatch: expecting NewgroundsIO.objects.Request, got ",e),this.#ak=e}objectMap={request:"Request"}}void 0===NewgroundsIO.objects&&(NewgroundsIO.objects={}),NewgroundsIO.objects.Debug=e})(),(()=>{class e extends NewgroundsIO.BaseObject{constructor(e){super();let t=this;if(this.__object="Error",["message","code"].forEach(e=>{0>t.__properties.indexOf(e)&&t.__properties.push(e)}),e&&"object"==typeof e)for(var s=0;s<this.__properties.length;s++)void 0!==e[this.__properties[s]]&&(this[this.__properties[s]]=e[this.__properties[s]])}#al=null;get message(){return this.#al}set message(e){"string"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a string, got",e),this.#al=String(e)}#am=null;get code(){return this.#am}set code(e){"number"!=typeof e&&null!==e?console.warn("NewgroundsIO Type Mismatch: Value should be a number, got",e):Number.isInteger(e)||null===e||console.warn("NewgroundsIO Type Mismatch: Value should be an integer, got a float"),this.#am=Number(e),isNaN(this.#am)&&(this.#am=null)}}void 0===NewgroundsIO.objects&&(NewgroundsIO.objects={}),NewgroundsIO.objects.Error=e})(),(()=>{class e extends NewgroundsIO.BaseObject{constructor(e){super();let t=this;if(this.__object="Execute",["component","parameters","secure"].forEach(e=>{0>t.__properties.indexOf(e)&&t.__properties.push(e)}),e&&"object"==typeof e)for(var s=0;s<this.__properties.length;s++)void 0!==e[this.__properties[s]]&&(this[this.__properties[s]]=e[this.__properties[s]])}#an=null;get component(){return this.#an}set component(e){"string"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a string, got",e),this.#an=String(e)}#ao=null;get parameters(){return this.#ao}set parameters(e){if(Array.isArray(e)){let t=[];e.forEach(function(e,s){"object"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a object, got",e),t[s]=e}),this.#ao=t;return}"object"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a object, got",e),this.#ao=e}#ap=null;get secure(){return this.#ap}set secure(e){"string"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a string, got",e),this.#ap=String(e)}#aq=null;setComponent(e){e instanceof NewgroundsIO.BaseComponent||console.error("NewgroundsIO Error: Expecting NewgroundsIO component, got "+typeof e),this.#aq=e,this.component=e.__object,this.parameters=e.toJSON()}isValid(){return(this.component||console.error("NewgroundsIO Error: Missing required component!"),this.__ngioCore)?!this.#aq||(this.#aq.__requireSession&&!this.__ngioCore.session.isActive()?(console.warn("NewgroundsIO Warning: "+this.component+" can only be used with a valid user session."),this.__ngioCore.session.logProblems(),!1):this.#aq instanceof NewgroundsIO.BaseComponent&&this.#aq.isValid()):(console.error("NewgroundsIO Error: Must call setCore() before validating!"),!1)}toJSON(){return this.#aq&&this.#aq.__isSecure?this.toSecureJSON():super.toJSON()}}void 0===NewgroundsIO.objects&&(NewgroundsIO.objects={}),NewgroundsIO.objects.Execute=e})(),(()=>{class e extends NewgroundsIO.BaseObject{constructor(e){super();let t=this;if(this.__object="Medal",["id","name","description","icon","value","difficulty","secret","unlocked"].forEach(e=>{0>t.__properties.indexOf(e)&&t.__properties.push(e)}),e&&"object"==typeof e)for(var s=0;s<this.__properties.length;s++)void 0!==e[this.__properties[s]]&&(this[this.__properties[s]]=e[this.__properties[s]])}#X=null;get id(){return this.#X}set id(e){"number"!=typeof e&&null!==e?console.warn("NewgroundsIO Type Mismatch: Value should be a number, got",e):Number.isInteger(e)||null===e||console.warn("NewgroundsIO Type Mismatch: Value should be an integer, got a float"),this.#X=Number(e),isNaN(this.#X)&&(this.#X=null)}#ar=null;get name(){return this.#ar}set name(e){"string"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a string, got",e),this.#ar=String(e)}#as=null;get description(){return this.#as}set description(e){"string"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a string, got",e),this.#as=String(e)}#at=null;get icon(){return this.#at}set icon(e){"string"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a string, got",e),this.#at=String(e)}#ai=null;get value(){return this.#ai}set value(e){"number"!=typeof e&&null!==e?console.warn("NewgroundsIO Type Mismatch: Value should be a number, got",e):Number.isInteger(e)||null===e||console.warn("NewgroundsIO Type Mismatch: Value should be an integer, got a float"),this.#ai=Number(e),isNaN(this.#ai)&&(this.#ai=null)}#au=null;get difficulty(){return this.#au}set difficulty(e){"number"!=typeof e&&null!==e?console.warn("NewgroundsIO Type Mismatch: Value should be a number, got",e):Number.isInteger(e)||null===e||console.warn("NewgroundsIO Type Mismatch: Value should be an integer, got a float"),this.#au=Number(e),isNaN(this.#au)&&(this.#au=null)}#av=null;get secret(){return this.#av}set secret(e){"boolean"!=typeof e&&"number"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a boolean, got",e),this.#av=!!e}#aw=null;get unlocked(){return this.#aw}set unlocked(e){"boolean"!=typeof e&&"number"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a boolean, got",e),this.#aw=!!e}unlock(e,t){if(!this.__ngioCore){console.error("NewgroundsIO - Can not unlock medal object without attaching a NewgroundsIO.Core instance.");return}var s=this.__ngioCore.getComponent("Medal.unlock",{id:this.id});this.__ngioCore.executeComponent(s,e,t)}}void 0===NewgroundsIO.objects&&(NewgroundsIO.objects={}),NewgroundsIO.objects.Medal=e})(),(()=>{class e extends NewgroundsIO.BaseObject{constructor(e){super();let t=this;if(this.__object="Request",["app_id","execute","session_id","debug"].forEach(e=>{0>t.__properties.indexOf(e)&&t.__properties.push(e)}),e&&"object"==typeof e)for(var s=0;s<this.__properties.length;s++)void 0!==e[this.__properties[s]]&&(this[this.__properties[s]]=e[this.__properties[s]])}#ax=null;get execute(){return this.#ax}set execute(e){if(Array.isArray(e)||e instanceof NewgroundsIO.objects.Execute||"object"!=typeof e||(e=new NewgroundsIO.objects.Execute(e)),Array.isArray(e)){let t=[];e.forEach(function(e,s){null===e||e instanceof NewgroundsIO.objects.Execute||console.warn("Type Mismatch: expecting NewgroundsIO.objects.Execute, got ",e),t[s]=e}),this.#ax=t;return}null===e||e instanceof NewgroundsIO.objects.Execute||console.warn("Type Mismatch: expecting NewgroundsIO.objects.Execute, got ",e),this.#ax=e}#P=null;get debug(){return this.#P}set debug(e){"boolean"!=typeof e&&"number"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a boolean, got",e),this.#P=!!e}objectMap={execute:"Execute"};arrayMap={execute:"Execute"};get app_id(){return this.__ngioCore?this.__ngioCore.appID:null}get session_id(){return this.__ngioCore&&this.__ngioCore.session?this.__ngioCore.session.id:null}}void 0===NewgroundsIO.objects&&(NewgroundsIO.objects={}),NewgroundsIO.objects.Request=e})(),(()=>{class e extends NewgroundsIO.BaseObject{constructor(e){super();let t=this;if(this.__object="Response",["app_id","success","debug","result","error","api_version","help_url"].forEach(e=>{0>t.__properties.indexOf(e)&&t.__properties.push(e)}),e&&"object"==typeof e)for(var s=0;s<this.__properties.length;s++)void 0!==e[this.__properties[s]]&&(this[this.__properties[s]]=e[this.__properties[s]])}#Y=null;get app_id(){return this.#Y}set app_id(e){"string"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a string, got",e),this.#Y=String(e)}#ay=null;get success(){return this.#ay}set success(e){"boolean"!=typeof e&&"number"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a boolean, got",e),this.#ay=!!e}#P=null;get debug(){return this.#P}set debug(e){e instanceof NewgroundsIO.objects.Debug||"object"!=typeof e||(e=new NewgroundsIO.objects.Debug(e)),null===e||e instanceof NewgroundsIO.objects.Debug||console.warn("Type Mismatch: expecting NewgroundsIO.objects.Debug, got ",e),this.#P=e}#az=null;get result(){return this.#az}set result(e){if(Array.isArray(e)){let t=[];e.forEach(function(e,s){e instanceof NewgroundsIO.BaseResult||null===e||console.warn("NewgroundsIO Type Mismatch: Value should be a NewgroundsIO.results.XXXX instance, got",e),t[s]=e}),this.#az=t;return}e instanceof NewgroundsIO.BaseResult||null===e||console.warn("NewgroundsIO Type Mismatch: Value should be a NewgroundsIO.results.XXXX instance, got",e),this.#az=e}#aA=null;get error(){return this.#aA}set error(e){e instanceof NewgroundsIO.objects.Error||"object"!=typeof e||(e=new NewgroundsIO.objects.Error(e)),null===e||e instanceof NewgroundsIO.objects.Error||console.warn("Type Mismatch: expecting NewgroundsIO.objects.Error, got ",e),this.#aA=e}#aB=null;get api_version(){return this.#aB}set api_version(e){"string"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a string, got",e),this.#aB=String(e)}#aC=null;get help_url(){return this.#aC}set help_url(e){"string"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a string, got",e),this.#aC=String(e)}objectMap={debug:"Debug",error:"Error"}}void 0===NewgroundsIO.objects&&(NewgroundsIO.objects={}),NewgroundsIO.objects.Response=e})(),(()=>{class e extends NewgroundsIO.BaseObject{constructor(e){super();let t=this;if(this.__object="SaveSlot",["id","size","datetime","timestamp","url"].forEach(e=>{0>t.__properties.indexOf(e)&&t.__properties.push(e)}),e&&"object"==typeof e)for(var s=0;s<this.__properties.length;s++)void 0!==e[this.__properties[s]]&&(this[this.__properties[s]]=e[this.__properties[s]])}#X=null;get id(){return this.#X}set id(e){"number"!=typeof e&&null!==e?console.warn("NewgroundsIO Type Mismatch: Value should be a number, got",e):Number.isInteger(e)||null===e||console.warn("NewgroundsIO Type Mismatch: Value should be an integer, got a float"),this.#X=Number(e),isNaN(this.#X)&&(this.#X=null)}#aD=null;get size(){return this.#aD}set size(e){"number"!=typeof e&&null!==e?console.warn("NewgroundsIO Type Mismatch: Value should be a number, got",e):Number.isInteger(e)||null===e||console.warn("NewgroundsIO Type Mismatch: Value should be an integer, got a float"),this.#aD=Number(e),isNaN(this.#aD)&&(this.#aD=null)}#aE=null;get datetime(){return this.#aE}set datetime(e){"string"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a string, got",e),this.#aE=String(e)}#aF=null;get timestamp(){return this.#aF}set timestamp(e){"number"!=typeof e&&null!==e?console.warn("NewgroundsIO Type Mismatch: Value should be a number, got",e):Number.isInteger(e)||null===e||console.warn("NewgroundsIO Type Mismatch: Value should be an integer, got a float"),this.#aF=Number(e),isNaN(this.#aF)&&(this.#aF=null)}#aG=null;get url(){return this.#aG}set url(e){"string"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a string, got",e),this.#aG=String(e)}get hasData(){return null!==this.url}getData(e,t){if("function"!=typeof e){debug.error("NewgroundsIO - Missing required callback function");return}var s=new XMLHttpRequest;s.onreadystatechange=function(){4==s.readyState&&(t?e.call(t,s.responseText):e(s.responseText))},s.open("GET",this.url,!0),s.send()}setData(e,t,s){if(!this.__ngioCore){console.error("NewgroundsIO - Can not save data without attaching a NewgroundsIO.Core instance.");return}var o=this.__ngioCore.getComponent("CloudSave.setData",{id:this.id,data:e});this.__ngioCore.executeComponent(o,t,s)}clearData(e,t){if(!this.__ngioCore){console.error("NewgroundsIO - Can not clear data without attaching a NewgroundsIO.Core instance.");return}this.#aG=null;var s=this.__ngioCore.getComponent("CloudSave.clearSlot",{id:this.id});this.__ngioCore.executeComponent(s,e,t)}getDate(){return this.hasData?new Date(this.datetime):null}}void 0===NewgroundsIO.objects&&(NewgroundsIO.objects={}),NewgroundsIO.objects.SaveSlot=e})(),(()=>{class e extends NewgroundsIO.BaseObject{constructor(e){super();let t=this;if(this.__object="Score",["user","value","formatted_value","tag"].forEach(e=>{0>t.__properties.indexOf(e)&&t.__properties.push(e)}),e&&"object"==typeof e)for(var s=0;s<this.__properties.length;s++)void 0!==e[this.__properties[s]]&&(this[this.__properties[s]]=e[this.__properties[s]])}#af=null;get user(){return this.#af}set user(e){e instanceof NewgroundsIO.objects.User||"object"!=typeof e||(e=new NewgroundsIO.objects.User(e)),null===e||e instanceof NewgroundsIO.objects.User||console.warn("Type Mismatch: expecting NewgroundsIO.objects.User, got ",e),this.#af=e}#ai=null;get value(){return this.#ai}set value(e){"number"!=typeof e&&null!==e?console.warn("NewgroundsIO Type Mismatch: Value should be a number, got",e):Number.isInteger(e)||null===e||console.warn("NewgroundsIO Type Mismatch: Value should be an integer, got a float"),this.#ai=Number(e),isNaN(this.#ai)&&(this.#ai=null)}#aH=null;get formatted_value(){return this.#aH}set formatted_value(e){"string"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a string, got",e),this.#aH=String(e)}#ad=null;get tag(){return this.#ad}set tag(e){"string"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a string, got",e),this.#ad=String(e)}objectMap={user:"User"}}void 0===NewgroundsIO.objects&&(NewgroundsIO.objects={}),NewgroundsIO.objects.Score=e})(),(()=>{class e extends NewgroundsIO.BaseObject{constructor(e){super();let t=this;if(this.__object="ScoreBoard",["id","name"].forEach(e=>{0>t.__properties.indexOf(e)&&t.__properties.push(e)}),e&&"object"==typeof e)for(var s=0;s<this.__properties.length;s++)void 0!==e[this.__properties[s]]&&(this[this.__properties[s]]=e[this.__properties[s]])}#X=null;get id(){return this.#X}set id(e){"number"!=typeof e&&null!==e?console.warn("NewgroundsIO Type Mismatch: Value should be a number, got",e):Number.isInteger(e)||null===e||console.warn("NewgroundsIO Type Mismatch: Value should be an integer, got a float"),this.#X=Number(e),isNaN(this.#X)&&(this.#X=null)}#ar=null;get name(){return this.#ar}set name(e){"string"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a string, got",e),this.#ar=String(e)}getScores(e,t,s){if(!this.__ngioCore){console.error("NewgroundsIO - Can not get scores without attaching a NewgroundsIO.Core instance.");return}"function"==typeof e&&(s=t,t=e,e={}),e||(e={}),e.id=this.id;var o=this.__ngioCore.getComponent("ScoreBoard.getScores",e);this.__ngioCore.executeComponent(o,t,s)}postScore(e,t,s,o){if(!this.__ngioCore){console.error("NewgroundsIO - Can not post scores without attaching a NewgroundsIO.Core instance.");return}"function"==typeof t&&(o=s,s=t,t=null);var r=this.__ngioCore.getComponent("ScoreBoard.postScore",{id:this.id,value:e,tag:t});this.__ngioCore.executeComponent(r,s,o)}}void 0===NewgroundsIO.objects&&(NewgroundsIO.objects={}),NewgroundsIO.objects.ScoreBoard=e})(),(()=>{class e extends NewgroundsIO.BaseObject{constructor(e){super();let t=this;if(this.__object="Session",["id","user","expired","remember","passport_url"].forEach(e=>{0>t.__properties.indexOf(e)&&t.__properties.push(e)}),e&&"object"==typeof e)for(var s=0;s<this.__properties.length;s++)void 0!==e[this.__properties[s]]&&(this[this.__properties[s]]=e[this.__properties[s]])}#X=null;get id(){return this.#X}set id(e){"string"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a string, got",e),this.#X=String(e)}#af=null;get user(){return this.#af}set user(e){e instanceof NewgroundsIO.objects.User||"object"!=typeof e||(e=new NewgroundsIO.objects.User(e)),null===e||e instanceof NewgroundsIO.objects.User||console.warn("Type Mismatch: expecting NewgroundsIO.objects.User, got ",e),this.#af=e}#aI=null;get expired(){return this.#aI}set expired(e){"boolean"!=typeof e&&"number"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a boolean, got",e),this.#aI=!!e}#aJ=null;get remember(){return this.#aJ}set remember(e){"boolean"!=typeof e&&"number"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a boolean, got",e),this.#aJ=!!e}#aK=null;get passport_url(){return this.#aK}set passport_url(e){"string"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a string, got",e),this.#aK=String(e)}objectMap={user:"User"};#aL=NewgroundsIO.SessionState.SESSION_UNINITIALIZED;#aM=null;#aN=!1;#aO=new Date(new Date().getTime()-3e4);#aP=!0;#aQ="expired";#aR=0;#aS=5;#aT=null;get uri_id(){return this.#aT}set uri_id(e){"string"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a string, got",e),this.#aT=String(e)}#aU=null;get status(){return this.#aL}get statusChanged(){return this.#aN}get waiting(){return this.#aM!=this.status}get storageKey(){return this.__ngioCore?"_ngio_"+this.__ngioCore.appID+"_session_":null}resetSession(){this.#aT=null,this.#aU=null,this.remember=!1,this.user=null,this.expired=!1,localStorage.setItem(this.storageKey,null)}openLoginPage(){if(!this.passport_url){console.warn("Can't open passport without getting a valis session first.");return}this.#aL=NewgroundsIO.SessionState.WAITING_FOR_USER,this.mode="check",window.open(this.passport_url,"_blank")}logOut(e,t){this.mode="wait",this.endSession(e,t)}cancelLogin(e){this.endSession(),void 0===e&&(e=NewgroundsIO.SessionState.LOGIN_CANCELLED),this.resetSession(),this.id=null,this.#aL=e,this.#aR=0,this.#aQ="new",this.#aO=new Date(new Date().getTime()-3e4)}update(e,t){if(this.#aN=!1,this.#aM!=this.status&&(this.#aN=!0,this.#aM=this.status,"function"==typeof e&&(t?e.call(t,this):e(this))),this.#aP&&"wait"!=this.mode){if(!this.__ngioCore){console.error("NewgroundsIO - Can't update session without attaching a NewgroundsIO.Core instance."),this.#aP=!1;return}this.status==NewgroundsIO.SessionState.SERVER_UNAVAILABLE&&(this.#aR>=this.#aS?this.#aL=NewgroundsIO.SessionState.EXCEEDED_MAX_ATTEMPTS:(this.#aL=NewgroundsIO.SessionState.SESSION_UNINITIALIZED,this.#aR++)),this.status==NewgroundsIO.SessionState.SESSION_UNINITIALIZED&&(this.#aU=localStorage.getItem(this.storageKey),this.#aT?this.id=this.#aT:this.#aU&&(this.id=this.#aU),this.mode=this.id&&"null"!==this.id?"check":"new");var s=new Date;if(!(s-this.#aO<5e3))switch(this.#aO=s,this.mode){case"new":this.mode="wait",this.startSession();break;case"check":this.mode="wait",this.checkSession()}}}startSession(){this.#aP=!1,this.resetSession(),this.#aL=NewgroundsIO.SessionState.WAITING_FOR_SERVER;var e=this.__ngioCore.getComponent("App.startSession");this.__ngioCore.executeComponent(e,this._onStartSession,this)}_onStartSession(e){if(!0===e.success){let t=e.result;if(Array.isArray(t)){for(let s=0;s<t.length;s++)if(t[s]&&t[s].__object&&"App.startSession"==t[s].__object){t=t[s];break}}this.id=t.session.id,this.passport_url=t.session.passport_url,this.#aL=NewgroundsIO.SessionState.LOGIN_REQUIRED,this.mode="wait"}else this.#aL=NewgroundsIO.SessionState.SERVER_UNAVAILABLE;this.#aP=!0}checkSession(){this.#aP=!1;var e=this.__ngioCore.getComponent("App.checkSession");this.__ngioCore.executeComponent(e,this._onCheckSession,this)}_onCheckSession(e){!0===e.success?e.result.success?e.result.session.expired?(this.resetSession(),this.id=null,this.#aL=NewgroundsIO.SessionState.SESSION_UNINITIALIZED):null!==e.result.session.user?(this.user=e.result.session.user,this.#aL=NewgroundsIO.SessionState.LOGIN_SUCCESSFUL,this.mode="valid",e.result.session.remember&&(this.#aU=this.id,this.remember=!0,localStorage.setItem(this.storageKey,this.id))):this.mode="check":(this.id=null,this.cancelLogin(111===e.result.error.code?NewgroundsIO.SessionState.LOGIN_CANCELLED:NewgroundsIO.SessionState.LOGIN_FAILED)):this.#aL=NewgroundsIO.SessionState.SERVER_UNAVAILABLE,this.#aP=!0}endSession(e,t){this.#aP=!1;var s=this.__ngioCore.getComponent("App.endSession"),o=this.__ngioCore.getComponent("App.startSession");this.__ngioCore.queueComponent(s),this.__ngioCore.queueComponent(o),this.__ngioCore.executeQueue(function(s){this._onEndSession(s),this._onStartSession(s),"function"==typeof e&&(t?e.call(t,this):e(this))},this)}_onEndSession(e){this.resetSession(),this.id=null,this.user=null,this.passport_url=null,this.mode="new",this.#aL=NewgroundsIO.SessionState.USER_LOGGED_OUT,this.#aP=!0}}void 0===NewgroundsIO.objects&&(NewgroundsIO.objects={}),NewgroundsIO.objects.Session=e})(),(()=>{class e extends NewgroundsIO.BaseObject{constructor(e){super();let t=this;if(this.__object="User",["id","name","icons","supporter"].forEach(e=>{0>t.__properties.indexOf(e)&&t.__properties.push(e)}),e&&"object"==typeof e)for(var s=0;s<this.__properties.length;s++)void 0!==e[this.__properties[s]]&&(this[this.__properties[s]]=e[this.__properties[s]])}#X=null;get id(){return this.#X}set id(e){"number"!=typeof e&&null!==e?console.warn("NewgroundsIO Type Mismatch: Value should be a number, got",e):Number.isInteger(e)||null===e||console.warn("NewgroundsIO Type Mismatch: Value should be an integer, got a float"),this.#X=Number(e),isNaN(this.#X)&&(this.#X=null)}#ar=null;get name(){return this.#ar}set name(e){"string"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a string, got",e),this.#ar=String(e)}#aV=null;get icons(){return this.#aV}set icons(e){e instanceof NewgroundsIO.objects.UserIcons||"object"!=typeof e||(e=new NewgroundsIO.objects.UserIcons(e)),null===e||e instanceof NewgroundsIO.objects.UserIcons||console.warn("Type Mismatch: expecting NewgroundsIO.objects.UserIcons, got ",e),this.#aV=e}#aW=null;get supporter(){return this.#aW}set supporter(e){"boolean"!=typeof e&&"number"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a boolean, got",e),this.#aW=!!e}objectMap={icons:"UserIcons"}}void 0===NewgroundsIO.objects&&(NewgroundsIO.objects={}),NewgroundsIO.objects.User=e})(),(()=>{class e extends NewgroundsIO.BaseObject{constructor(e){super();let t=this;if(this.__object="UserIcons",["small","medium","large"].forEach(e=>{0>t.__properties.indexOf(e)&&t.__properties.push(e)}),e&&"object"==typeof e)for(var s=0;s<this.__properties.length;s++)void 0!==e[this.__properties[s]]&&(this[this.__properties[s]]=e[this.__properties[s]])}#aX=null;get small(){return this.#aX}set small(e){"string"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a string, got",e),this.#aX=String(e)}#aY=null;get medium(){return this.#aY}set medium(e){"string"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a string, got",e),this.#aY=String(e)}#aZ=null;get large(){return this.#aZ}set large(e){"string"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a string, got",e),this.#aZ=String(e)}}void 0===NewgroundsIO.objects&&(NewgroundsIO.objects={}),NewgroundsIO.objects.UserIcons=e})(),(()=>{class e extends NewgroundsIO.BaseResult{constructor(e){super();let t=this;if(this.__object="App.checkSession",["session"].forEach(e=>{0>t.__properties.indexOf(e)&&t.__properties.push(e)}),e&&"object"==typeof e)for(var s=0;s<this.__properties.length;s++)void 0!==e[this.__properties[s]]&&(this[this.__properties[s]]=e[this.__properties[s]])}#U=null;get session(){return this.#U}set session(e){e instanceof NewgroundsIO.objects.Session||"object"!=typeof e||(e=new NewgroundsIO.objects.Session(e)),null===e||e instanceof NewgroundsIO.objects.Session||console.warn("Type Mismatch: expecting NewgroundsIO.objects.Session, got ",e),this.#U=e}objectMap={session:"Session"}}void 0===NewgroundsIO.results.App&&(NewgroundsIO.results.App={}),NewgroundsIO.results.App.checkSession=e})(),(()=>{class e extends NewgroundsIO.BaseResult{constructor(e){super();let t=this;if(this.__object="App.getCurrentVersion",["current_version","client_deprecated"].forEach(e=>{0>t.__properties.indexOf(e)&&t.__properties.push(e)}),e&&"object"==typeof e)for(var s=0;s<this.__properties.length;s++)void 0!==e[this.__properties[s]]&&(this[this.__properties[s]]=e[this.__properties[s]])}#a$=null;get current_version(){return this.#a$}set current_version(e){"string"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a string, got",e),this.#a$=String(e)}#a_=null;get client_deprecated(){return this.#a_}set client_deprecated(e){"boolean"!=typeof e&&"number"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a boolean, got",e),this.#a_=!!e}}void 0===NewgroundsIO.results.App&&(NewgroundsIO.results.App={}),NewgroundsIO.results.App.getCurrentVersion=e})(),(()=>{class e extends NewgroundsIO.BaseResult{constructor(e){super();let t=this;if(this.__object="App.getHostLicense",["host_approved"].forEach(e=>{0>t.__properties.indexOf(e)&&t.__properties.push(e)}),e&&"object"==typeof e)for(var s=0;s<this.__properties.length;s++)void 0!==e[this.__properties[s]]&&(this[this.__properties[s]]=e[this.__properties[s]])}#a0=null;get host_approved(){return this.#a0}set host_approved(e){"boolean"!=typeof e&&"number"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a boolean, got",e),this.#a0=!!e}}void 0===NewgroundsIO.results.App&&(NewgroundsIO.results.App={}),NewgroundsIO.results.App.getHostLicense=e})(),(()=>{class e extends NewgroundsIO.BaseResult{constructor(e){super();let t=this;if(this.__object="App.startSession",["session"].forEach(e=>{0>t.__properties.indexOf(e)&&t.__properties.push(e)}),e&&"object"==typeof e)for(var s=0;s<this.__properties.length;s++)void 0!==e[this.__properties[s]]&&(this[this.__properties[s]]=e[this.__properties[s]])}#U=null;get session(){return this.#U}set session(e){e instanceof NewgroundsIO.objects.Session||"object"!=typeof e||(e=new NewgroundsIO.objects.Session(e)),null===e||e instanceof NewgroundsIO.objects.Session||console.warn("Type Mismatch: expecting NewgroundsIO.objects.Session, got ",e),this.#U=e}objectMap={session:"Session"}}void 0===NewgroundsIO.results.App&&(NewgroundsIO.results.App={}),NewgroundsIO.results.App.startSession=e})(),(()=>{class e extends NewgroundsIO.BaseResult{constructor(e){super();let t=this;if(this.__object="CloudSave.clearSlot",["slot"].forEach(e=>{0>t.__properties.indexOf(e)&&t.__properties.push(e)}),e&&"object"==typeof e)for(var s=0;s<this.__properties.length;s++)void 0!==e[this.__properties[s]]&&(this[this.__properties[s]]=e[this.__properties[s]])}#a1=null;get slot(){return this.#a1}set slot(e){e instanceof NewgroundsIO.objects.SaveSlot||"object"!=typeof e||(e=new NewgroundsIO.objects.SaveSlot(e)),null===e||e instanceof NewgroundsIO.objects.SaveSlot||console.warn("Type Mismatch: expecting NewgroundsIO.objects.SaveSlot, got ",e),this.#a1=e}objectMap={slot:"SaveSlot"}}void 0===NewgroundsIO.results.CloudSave&&(NewgroundsIO.results.CloudSave={}),NewgroundsIO.results.CloudSave.clearSlot=e})(),(()=>{class e extends NewgroundsIO.BaseResult{constructor(e){super();let t=this;if(this.__object="CloudSave.loadSlot",["slot","app_id"].forEach(e=>{0>t.__properties.indexOf(e)&&t.__properties.push(e)}),e&&"object"==typeof e)for(var s=0;s<this.__properties.length;s++)void 0!==e[this.__properties[s]]&&(this[this.__properties[s]]=e[this.__properties[s]])}#a1=null;get slot(){return this.#a1}set slot(e){e instanceof NewgroundsIO.objects.SaveSlot||"object"!=typeof e||(e=new NewgroundsIO.objects.SaveSlot(e)),null===e||e instanceof NewgroundsIO.objects.SaveSlot||console.warn("Type Mismatch: expecting NewgroundsIO.objects.SaveSlot, got ",e),this.#a1=e}#Y=null;get app_id(){return this.#Y}set app_id(e){"string"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a string, got",e),this.#Y=String(e)}objectMap={slot:"SaveSlot"}}void 0===NewgroundsIO.results.CloudSave&&(NewgroundsIO.results.CloudSave={}),NewgroundsIO.results.CloudSave.loadSlot=e})(),(()=>{class e extends NewgroundsIO.BaseResult{constructor(e){super();let t=this;if(this.__object="CloudSave.loadSlots",["slots","app_id"].forEach(e=>{0>t.__properties.indexOf(e)&&t.__properties.push(e)}),e&&"object"==typeof e)for(var s=0;s<this.__properties.length;s++)void 0!==e[this.__properties[s]]&&(this[this.__properties[s]]=e[this.__properties[s]])}#a2=null;get slots(){return this.#a2}set slots(e){if(Array.isArray(e)){let t=[];e.forEach(function(e,s){null===e||e instanceof NewgroundsIO.objects.SaveSlot||console.warn("Type Mismatch: expecting NewgroundsIO.objects.SaveSlot, got ",e),t[s]=e}),this.#a2=t;return}}#Y=null;get app_id(){return this.#Y}set app_id(e){"string"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a string, got",e),this.#Y=String(e)}arrayMap={slots:"SaveSlot"}}void 0===NewgroundsIO.results.CloudSave&&(NewgroundsIO.results.CloudSave={}),NewgroundsIO.results.CloudSave.loadSlots=e})(),(()=>{class e extends NewgroundsIO.BaseResult{constructor(e){super();let t=this;if(this.__object="CloudSave.setData",["slot"].forEach(e=>{0>t.__properties.indexOf(e)&&t.__properties.push(e)}),e&&"object"==typeof e)for(var s=0;s<this.__properties.length;s++)void 0!==e[this.__properties[s]]&&(this[this.__properties[s]]=e[this.__properties[s]])}#a1=null;get slot(){return this.#a1}set slot(e){e instanceof NewgroundsIO.objects.SaveSlot||"object"!=typeof e||(e=new NewgroundsIO.objects.SaveSlot(e)),null===e||e instanceof NewgroundsIO.objects.SaveSlot||console.warn("Type Mismatch: expecting NewgroundsIO.objects.SaveSlot, got ",e),this.#a1=e}objectMap={slot:"SaveSlot"}}void 0===NewgroundsIO.results.CloudSave&&(NewgroundsIO.results.CloudSave={}),NewgroundsIO.results.CloudSave.setData=e})(),(()=>{class e extends NewgroundsIO.BaseResult{constructor(e){super();let t=this;if(this.__object="Event.logEvent",["event_name"].forEach(e=>{0>t.__properties.indexOf(e)&&t.__properties.push(e)}),e&&"object"==typeof e)for(var s=0;s<this.__properties.length;s++)void 0!==e[this.__properties[s]]&&(this[this.__properties[s]]=e[this.__properties[s]])}#$=null;get event_name(){return this.#$}set event_name(e){"string"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a string, got",e),this.#$=String(e)}}void 0===NewgroundsIO.results.Event&&(NewgroundsIO.results.Event={}),NewgroundsIO.results.Event.logEvent=e})(),(()=>{class e extends NewgroundsIO.BaseResult{constructor(e){super();let t=this;if(this.__object="Gateway.getDatetime",["datetime","timestamp"].forEach(e=>{0>t.__properties.indexOf(e)&&t.__properties.push(e)}),e&&"object"==typeof e)for(var s=0;s<this.__properties.length;s++)void 0!==e[this.__properties[s]]&&(this[this.__properties[s]]=e[this.__properties[s]])}#aE=null;get datetime(){return this.#aE}set datetime(e){"string"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a string, got",e),this.#aE=String(e)}#aF=null;get timestamp(){return this.#aF}set timestamp(e){"number"!=typeof e&&null!==e?console.warn("NewgroundsIO Type Mismatch: Value should be a number, got",e):Number.isInteger(e)||null===e||console.warn("NewgroundsIO Type Mismatch: Value should be an integer, got a float"),this.#aF=Number(e),isNaN(this.#aF)&&(this.#aF=null)}}void 0===NewgroundsIO.results.Gateway&&(NewgroundsIO.results.Gateway={}),NewgroundsIO.results.Gateway.getDatetime=e})(),(()=>{class e extends NewgroundsIO.BaseResult{constructor(e){super();let t=this;if(this.__object="Gateway.getVersion",["version"].forEach(e=>{0>t.__properties.indexOf(e)&&t.__properties.push(e)}),e&&"object"==typeof e)for(var s=0;s<this.__properties.length;s++)void 0!==e[this.__properties[s]]&&(this[this.__properties[s]]=e[this.__properties[s]])}#x=null;get version(){return this.#x}set version(e){"string"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a string, got",e),this.#x=String(e)}}void 0===NewgroundsIO.results.Gateway&&(NewgroundsIO.results.Gateway={}),NewgroundsIO.results.Gateway.getVersion=e})(),(()=>{class e extends NewgroundsIO.BaseResult{constructor(e){super();let t=this;if(this.__object="Gateway.ping",["pong"].forEach(e=>{0>t.__properties.indexOf(e)&&t.__properties.push(e)}),e&&"object"==typeof e)for(var s=0;s<this.__properties.length;s++)void 0!==e[this.__properties[s]]&&(this[this.__properties[s]]=e[this.__properties[s]])}#a3=null;get pong(){return this.#a3}set pong(e){"string"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a string, got",e),this.#a3=String(e)}}void 0===NewgroundsIO.results.Gateway&&(NewgroundsIO.results.Gateway={}),NewgroundsIO.results.Gateway.ping=e})(),(()=>{class e extends NewgroundsIO.BaseResult{constructor(e){super();let t=this;if(this.__object="Loader.loadAuthorUrl",["url"].forEach(e=>{0>t.__properties.indexOf(e)&&t.__properties.push(e)}),e&&"object"==typeof e)for(var s=0;s<this.__properties.length;s++)void 0!==e[this.__properties[s]]&&(this[this.__properties[s]]=e[this.__properties[s]])}#aG=null;get url(){return this.#aG}set url(e){"string"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a string, got",e),this.#aG=String(e)}}void 0===NewgroundsIO.results.Loader&&(NewgroundsIO.results.Loader={}),NewgroundsIO.results.Loader.loadAuthorUrl=e})(),(()=>{class e extends NewgroundsIO.BaseResult{constructor(e){super();let t=this;if(this.__object="Loader.loadMoreGames",["url"].forEach(e=>{0>t.__properties.indexOf(e)&&t.__properties.push(e)}),e&&"object"==typeof e)for(var s=0;s<this.__properties.length;s++)void 0!==e[this.__properties[s]]&&(this[this.__properties[s]]=e[this.__properties[s]])}#aG=null;get url(){return this.#aG}set url(e){"string"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a string, got",e),this.#aG=String(e)}}void 0===NewgroundsIO.results.Loader&&(NewgroundsIO.results.Loader={}),NewgroundsIO.results.Loader.loadMoreGames=e})(),(()=>{class e extends NewgroundsIO.BaseResult{constructor(e){super();let t=this;if(this.__object="Loader.loadNewgrounds",["url"].forEach(e=>{0>t.__properties.indexOf(e)&&t.__properties.push(e)}),e&&"object"==typeof e)for(var s=0;s<this.__properties.length;s++)void 0!==e[this.__properties[s]]&&(this[this.__properties[s]]=e[this.__properties[s]])}#aG=null;get url(){return this.#aG}set url(e){"string"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a string, got",e),this.#aG=String(e)}}void 0===NewgroundsIO.results.Loader&&(NewgroundsIO.results.Loader={}),NewgroundsIO.results.Loader.loadNewgrounds=e})(),(()=>{class e extends NewgroundsIO.BaseResult{constructor(e){super();let t=this;if(this.__object="Loader.loadOfficialUrl",["url"].forEach(e=>{0>t.__properties.indexOf(e)&&t.__properties.push(e)}),e&&"object"==typeof e)for(var s=0;s<this.__properties.length;s++)void 0!==e[this.__properties[s]]&&(this[this.__properties[s]]=e[this.__properties[s]])}#aG=null;get url(){return this.#aG}set url(e){"string"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a string, got",e),this.#aG=String(e)}}void 0===NewgroundsIO.results.Loader&&(NewgroundsIO.results.Loader={}),NewgroundsIO.results.Loader.loadOfficialUrl=e})(),(()=>{class e extends NewgroundsIO.BaseResult{constructor(e){super();let t=this;if(this.__object="Loader.loadReferral",["url"].forEach(e=>{0>t.__properties.indexOf(e)&&t.__properties.push(e)}),e&&"object"==typeof e)for(var s=0;s<this.__properties.length;s++)void 0!==e[this.__properties[s]]&&(this[this.__properties[s]]=e[this.__properties[s]])}#aG=null;get url(){return this.#aG}set url(e){"string"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a string, got",e),this.#aG=String(e)}}void 0===NewgroundsIO.results.Loader&&(NewgroundsIO.results.Loader={}),NewgroundsIO.results.Loader.loadReferral=e})(),(()=>{class e extends NewgroundsIO.BaseResult{constructor(e){super();let t=this;if(this.__object="Medal.getList",["medals","app_id"].forEach(e=>{0>t.__properties.indexOf(e)&&t.__properties.push(e)}),e&&"object"==typeof e)for(var s=0;s<this.__properties.length;s++)void 0!==e[this.__properties[s]]&&(this[this.__properties[s]]=e[this.__properties[s]])}#d=null;get medals(){return this.#d}set medals(e){if(Array.isArray(e)){let t=[];e.forEach(function(e,s){null===e||e instanceof NewgroundsIO.objects.Medal||console.warn("Type Mismatch: expecting NewgroundsIO.objects.Medal, got ",e),t[s]=e}),this.#d=t;return}}#Y=null;get app_id(){return this.#Y}set app_id(e){"string"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a string, got",e),this.#Y=String(e)}arrayMap={medals:"Medal"}}void 0===NewgroundsIO.results.Medal&&(NewgroundsIO.results.Medal={}),NewgroundsIO.results.Medal.getList=e})(),(()=>{class e extends NewgroundsIO.BaseResult{constructor(e){super();let t=this;if(this.__object="Medal.getMedalScore",["medal_score"].forEach(e=>{0>t.__properties.indexOf(e)&&t.__properties.push(e)}),e&&"object"==typeof e)for(var s=0;s<this.__properties.length;s++)void 0!==e[this.__properties[s]]&&(this[this.__properties[s]]=e[this.__properties[s]])}#a4=null;get medal_score(){return this.#a4}set medal_score(e){"number"!=typeof e&&null!==e?console.warn("NewgroundsIO Type Mismatch: Value should be a number, got",e):Number.isInteger(e)||null===e||console.warn("NewgroundsIO Type Mismatch: Value should be an integer, got a float"),this.#a4=Number(e),isNaN(this.#a4)&&(this.#a4=null)}}void 0===NewgroundsIO.results.Medal&&(NewgroundsIO.results.Medal={}),NewgroundsIO.results.Medal.getMedalScore=e})(),(()=>{class e extends NewgroundsIO.BaseResult{constructor(e){super();let t=this;if(this.__object="Medal.unlock",["medal","medal_score"].forEach(e=>{0>t.__properties.indexOf(e)&&t.__properties.push(e)}),e&&"object"==typeof e)for(var s=0;s<this.__properties.length;s++)void 0!==e[this.__properties[s]]&&(this[this.__properties[s]]=e[this.__properties[s]])}#a5=null;get medal(){return this.#a5}set medal(e){e instanceof NewgroundsIO.objects.Medal||"object"!=typeof e||(e=new NewgroundsIO.objects.Medal(e)),null===e||e instanceof NewgroundsIO.objects.Medal||console.warn("Type Mismatch: expecting NewgroundsIO.objects.Medal, got ",e),this.#a5=e}#a4=null;get medal_score(){return this.#a4}set medal_score(e){"number"!=typeof e&&null!==e?console.warn("NewgroundsIO Type Mismatch: Value should be a number, got",e):Number.isInteger(e)||null===e||console.warn("NewgroundsIO Type Mismatch: Value should be an integer, got a float"),this.#a4=Number(e),isNaN(this.#a4)&&(this.#a4=null)}objectMap={medal:"Medal"}}void 0===NewgroundsIO.results.Medal&&(NewgroundsIO.results.Medal={}),NewgroundsIO.results.Medal.unlock=e})(),(()=>{class e extends NewgroundsIO.BaseResult{constructor(e){super();let t=this;if(this.__object="ScoreBoard.getBoards",["scoreboards"].forEach(e=>{0>t.__properties.indexOf(e)&&t.__properties.push(e)}),e&&"object"==typeof e)for(var s=0;s<this.__properties.length;s++)void 0!==e[this.__properties[s]]&&(this[this.__properties[s]]=e[this.__properties[s]])}#a6=null;get scoreboards(){return this.#a6}set scoreboards(e){if(Array.isArray(e)){let t=[];e.forEach(function(e,s){null===e||e instanceof NewgroundsIO.objects.ScoreBoard||console.warn("Type Mismatch: expecting NewgroundsIO.objects.ScoreBoard, got ",e),t[s]=e}),this.#a6=t;return}}arrayMap={scoreboards:"ScoreBoard"}}void 0===NewgroundsIO.results.ScoreBoard&&(NewgroundsIO.results.ScoreBoard={}),NewgroundsIO.results.ScoreBoard.getBoards=e})(),(()=>{class e extends NewgroundsIO.BaseResult{constructor(e){super();let t=this;if(this.__object="ScoreBoard.getScores",["period","social","limit","scoreboard","scores","user","app_id"].forEach(e=>{0>t.__properties.indexOf(e)&&t.__properties.push(e)}),e&&"object"==typeof e)for(var s=0;s<this.__properties.length;s++)void 0!==e[this.__properties[s]]&&(this[this.__properties[s]]=e[this.__properties[s]])}#ac=null;get period(){return this.#ac}set period(e){"string"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a string, got",e),this.#ac=String(e)}#ae=null;get social(){return this.#ae}set social(e){"boolean"!=typeof e&&"number"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a boolean, got",e),this.#ae=!!e}#ah=null;get limit(){return this.#ah}set limit(e){"number"!=typeof e&&null!==e?console.warn("NewgroundsIO Type Mismatch: Value should be a number, got",e):Number.isInteger(e)||null===e||console.warn("NewgroundsIO Type Mismatch: Value should be an integer, got a float"),this.#ah=Number(e),isNaN(this.#ah)&&(this.#ah=null)}#a7=null;get scoreboard(){return this.#a7}set scoreboard(e){e instanceof NewgroundsIO.objects.ScoreBoard||"object"!=typeof e||(e=new NewgroundsIO.objects.ScoreBoard(e)),null===e||e instanceof NewgroundsIO.objects.ScoreBoard||console.warn("Type Mismatch: expecting NewgroundsIO.objects.ScoreBoard, got ",e),this.#a7=e}#a8=null;get scores(){return this.#a8}set scores(e){if(Array.isArray(e)){let t=[];e.forEach(function(e,s){null===e||e instanceof NewgroundsIO.objects.Score||console.warn("Type Mismatch: expecting NewgroundsIO.objects.Score, got ",e),t[s]=e}),this.#a8=t;return}}#af=null;get user(){return this.#af}set user(e){e instanceof NewgroundsIO.objects.User||"object"!=typeof e||(e=new NewgroundsIO.objects.User(e)),null===e||e instanceof NewgroundsIO.objects.User||console.warn("Type Mismatch: expecting NewgroundsIO.objects.User, got ",e),this.#af=e}#Y=null;get app_id(){return this.#Y}set app_id(e){"string"!=typeof e&&null!==e&&console.warn("NewgroundsIO Type Mismatch: Value should be a string, got",e),this.#Y=String(e)}objectMap={scoreboard:"ScoreBoard",user:"User"};arrayMap={scores:"Score"}}void 0===NewgroundsIO.results.ScoreBoard&&(NewgroundsIO.results.ScoreBoard={}),NewgroundsIO.results.ScoreBoard.getScores=e})(),(()=>{class e extends NewgroundsIO.BaseResult{constructor(e){super();let t=this;if(this.__object="ScoreBoard.postScore",["scoreboard","score"].forEach(e=>{0>t.__properties.indexOf(e)&&t.__properties.push(e)}),e&&"object"==typeof e)for(var s=0;s<this.__properties.length;s++)void 0!==e[this.__properties[s]]&&(this[this.__properties[s]]=e[this.__properties[s]])}#a7=null;get scoreboard(){return this.#a7}set scoreboard(e){e instanceof NewgroundsIO.objects.ScoreBoard||"object"!=typeof e||(e=new NewgroundsIO.objects.ScoreBoard(e)),null===e||e instanceof NewgroundsIO.objects.ScoreBoard||console.warn("Type Mismatch: expecting NewgroundsIO.objects.ScoreBoard, got ",e),this.#a7=e}#a9=null;get score(){return this.#a9}set score(e){e instanceof NewgroundsIO.objects.Score||"object"!=typeof e||(e=new NewgroundsIO.objects.Score(e)),null===e||e instanceof NewgroundsIO.objects.Score||console.warn("Type Mismatch: expecting NewgroundsIO.objects.Score, got ",e),this.#a9=e}objectMap={scoreboard:"ScoreBoard",score:"Score"}}void 0===NewgroundsIO.results.ScoreBoard&&(NewgroundsIO.results.ScoreBoard={}),NewgroundsIO.results.ScoreBoard.postScore=e})();
  }

  //Make sure we load everything
  if ((!NewgroundsIO) || (!NGIO) || (!CryptoJS)) {
    console.warn("One library needed for NGIO could not be loaded!");
  }
  /* eslint-enable */

  let menuIco =
    "data:image/png;base64,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XYQ6wi3CIsEYV6pUKVOT999/v7/kkkt8uXLl3tD71YVcnX37CiO22mqrFVdeeaVftGiRMQWaMmWKHzt2rDFn11139a1atfI//fSTMfXHH3/0d999tzFp7733NscMGwdTq1atylgMEnKKcTDtQuET4U/NwlWKb0zv63UUgT0QpgsthW2EXCMkbZQm16o777zT//333xGWrZGmxx57zN9zzz1+8eLFvkGDBr5///7mbA0ZMsTXqVPHy1v23bp187NmzfIKfewz7N7OO+/Mc98j5NRkrSR8LhizrrrqKj9mzBjfpEkTUyW8H0aZMmV8hQoVluizF/R6fyFXiEG9onTp0v/17NnT7FRAqHicrMqVK5vDhbocNGiQP/roo+05sYEwFE8TPPPMM75du3b+ySef9A888ADjQABOliWniGB6uWCMgXEYcVQH6qJSpUrGQCQOpl188cV+8uTJvkaNGmROXhFyQfJIGpwufK3A2v/888/GMJ7js88+82effbZX/BadeDDxn3/+8UjlHnvs4bt27ervuOMOf9JJJ9nzbrPNNuZ1fvDBBxYy6LxpAhM8Z4j83EAhKlEnnHCCGXEI15kZOHDgQAsJXnnlFf/777+bGjnxxBM5HieGAVufVFHoJW3xu+ya79ixozEMxjz11FNms0Jq3lCxYkVTj6jSUaNGma077LDDzBHDw0TSUJFnnHEGWoik8wVCzqnJmUL0odDzCxcuNMYlIoLTc889NzjnJQFvdF0TOce6wttiWAGDj4a4+eabzbVHYrDV+jwudtxxRzseiWQy4qTMnz/fQgUmaK1atQgVmJi3CVsKOUVHC38I0QdCdXz//fcRFq0hvC68s3fffdf369fPd+/e3R4scs5PAhn28gIPiLOTbSLd1lmStIB47JFHHjFHYvjw4Wa3mHyxzlU8cAzepUIcT9jQuHFjkgswnJDnG+ESgXgw56iZQCnDHkTemKnKIK5B5RDDPfzwwzYg6P5gQPgbUUHYuoXCZwLx3WMCFYSzBCZGFYH0GFWGkqobJsXBwktyQpYz0OQb8Rih2bNnRwPrYgInBK+5m0CaLOfitoCuFRh4u3EMeO/evc2GzZs3z997771mnBXIFnpAcnqPP/64GfeLLrrI7B0zNTDscmZWi6lk05HmucJHwnDhPqGj0EioIewuUH7A1hbFVGb++cJXslGr+W68w4Bg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";

  const url_Location = window.location.href.split("/")[2];

  let isNG =
    url_Location == "www.newgrounds.com" ||
    url_Location == "uploads.ungrounded.net";

  let ConnectionStatus = "Awaiting";
  let loggedIn = false;
  let saveCompleted = false;

  const NGOptions = {
    // This should match the version number in your Newgrounds App Settings page
    version: "1.0.0",

    debug: true,

    // If you aren't using any of these features, set them to false, or delete the line
    checkHostLicense: true,
    autoLogNewView: true,
    preloadMedals: true,
    preloadScoreBoards: true,
    preloadSaveSlots: true,
  };

  //Get game data
  let gameData = {
    medals: {},
    scoreBoards: {},
    saveSlots: {},
  }

  const quickParseData = (data) => {
    const returned = {};

    //assign each item to a place in the object;
    for (let item in data) {
      returned[data[item].id] = data[item];
    }

    return returned;
  }

  //Define our user data.
  let userDat = {
    logged: false,
    name: "unknown",
    id: 0,
    supporter: false,
    requiredFired: false,
    icon: "https://raw.githubusercontent.com/David-Orangemoon/DataHoldersRepo/main/newgroundsHolding/UnknownUser.png",
  };

  let monitorDisplayData = {
    itemCount: 20,
  }

  //Status functions and variable
  const statusReport = (status) => {
    if (NGIO.isWaitingStatus) {
      ConnectionStatus = "Awaiting";
      loggedIn = false;
    }

    switch (status) {
      // we have version and license info
      case NGIO.STATUS_LOCAL_VERSION_CHECKED:
        // this is an out-of-date (or possibly a development) version
        if (NGIO.isDeprecated) {
          ConnectionStatus = "Out of date!";
          NGIO.loadOfficialUrl();
        }

        // the site hosting this copy has been blocked
        if (!NGIO.legalHost) {
          ConnectionStatus = "Illegal Host";
          NGIO.loadOfficialUrl();
        }

        break;

      // user needs to log in
      case NGIO.STATUS_LOGIN_REQUIRED:
        ConnectionStatus = "Login Required";
        loggedIn = false;

        break;

      // user needs to log in
      case NGIO.STATUS_READY:
        if (NGIO.hasUser) {
          ConnectionStatus = "Logged In";
          loggedIn = true;
          userDat.icon = NGIO.user.icons.large;
          userDat.name = NGIO.user.name;
          userDat.supporter = NGIO.user.supporter;
          userDat.id = NGIO.user.id;

          gameData.medals = quickParseData(NGIO.medals);
          gameData.saveSlots = quickParseData(NGIO.saveSlots);
          gameData.scoreBoards = quickParseData(NGIO.scoreBoards);
          break;
        } else {
          ConnectionStatus = "Opted Out";
          loggedIn = false;

          gameData.scoreBoards = quickParseData(NGIO.scoreBoards);
          break;
        }

      // user needs to log in
      case NGIO.STATUS_WAITING_FOR_USER:
        ConnectionStatus = "Awaiting";
        loggedIn = false;

        break;
    }
  }

  let scorePosted = false;

  //css "classes" for our monitor for convience
  const customCSS = {
    sc_monitor_root: {
      position: "absolute",
      top: "0px",
      left: "0px",
      background: "hsla(215, 100%, 95%, 1)",
      color: "#575e75",
      border: "1px solid hsla(0, 0%, 0%, 0.15)",
      borderRadius: "4px",
      fontSize: "12px",
      overflow: "hidden",
      userSelect: "none",
      webkitUserSelect: "none",
      display: "flex",
      flexDirection: "column",
      pointerEvents: "all",
      boxSizing: "border-box",
      //Picked up is drop-shadow(rgba(0, 0, 0, 0.6) 2px 2px 4px)
      filter: "drop-shadow(rgba(0, 0, 0, 0.0) 0px 0px 0px)",
      transition: "filter 300ms"
    },
    sc_monitor_list_label: {
	    backgroundColor: "white",
	    textAlign: "center",
	    fontWeight: "bold",
	    borderBottom: "1px solid hsla(0, 0%, 0%, 0.15)",
	    padding: "3px",
      boxSizing: "border-box",
      display: "flex"
    },
    sc_monitor_rows_outer: {
	    flexGrow: "1",
      boxSizing: "border-box",
      overflowY: "scroll"
    },
    sc_monitor_list_footer: {
      display: "flex",
      backgroundColor: "white",
      textAlign: "center",
      fontWeight: "bold",
      padding: "3px",
      boxSizing: "border-box"
    },

    sc_monitor_row_root: {
      position: "relative",
      top: "0",
      left: "0",
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      padding: "2px",
      width: "100%",
      boxSizing: "border-box"
    },
    sc_monitor_row_index: {
      fontWeight: "bold",
      color: "hsla(225, 15%, 40%, 1)",
      margin: "0 3px",
      boxSizing: "border-box",
      width: "25px",
      height: "25px",
      borderRadius: "4px"
    },
    sc_monitor_row_value_outer: {
      display: "flex",
      alignItems: "center",
      minWidth: "40px",
      height: "22px",
      border: "1px solid hsla(0, 0%, 0%, 0.15)",
      backgroundColor: "#EB7522",
      color: "white",
      margin: "0 3px",
      borderRadius: "calc(0.5rem / 2)",
      flexGrow: "1",
      boxSizing: "border-box"
    },
    sc_monitor_row_value_inner: {
      padding: "3px 5px",
      width: "100%",
      color: "inherit",
      background: "none",
      border: "none",
      font: "inherit",
      outline: "none",
      overflow: "hidden",
      textOverflow: "ellipsis",
      userSelect: "text",
      webkitUserSelect: "text",
      whiteSpace: "pre",
    },


    sc_monitor_page_text: {
	    flexGrow: "1",
      boxSizing: "border-box",
    },
    sc_monitor_page_button: {
      border: "1px solid",
      borderRadius: "4px",
      borderColor: "rgba(0, 0, 0, 0.15)",
      background: "white"
    },
    sc_monitor_page_button_disabled: {
      border: "1px solid",
      borderRadius: "4px",
      borderColor: "rgba(0, 0, 0, 0.15)",
      background: "hsla(215, 100%, 95%, 1)"
    }
  }

  const setElementCSS = (element, cssObject) => {
    if (element instanceof HTMLElement && typeof cssObject == "object") {
      for (let key in cssObject) {
        element.style[key] = cssObject[key];
      }
    }
  }

  //Finally our scratch stuff
  const runtime = Scratch.vm.runtime;
  const renderer = Scratch.vm.renderer;
  const isPackaged = (typeof scaffolding !== "undefined");

  const originifyJson = (inObject) => {
    return JSON.parse(JSON.stringify(inObject));
  }

  ("use strict");
  class NewgroundsAPI {
    constructor() {
      this.monitors = {};
      this.serializedMonitors = {};

      this.setupSaving();
      vm.runtime.on("PROJECT_LOADED", () => {this.setupSaving.call(this)});
    }

    setupSaving() {
      if (Scratch.extensions.isPenguinMod) {
        this.serialize = () => {
          return JSON.stringify({
            monitors: this.serializedMonitors,
          });
        };

        this.deserialize = (serialized) => {
          let deserializedData = JSON.parse(serialized);
          this.monitors = deserializedData.monitors;
          this.serializedMonitors = deserializedData.monitors;
        };
      }
      else {
        //Storage flip flop
        if (!runtime.extensionStorage["NGIO"]) runtime.extensionStorage["NGIO"] = new Object({ monitors: {} });
        
        this.serializedMonitors = originifyJson(runtime.extensionStorage["NGIO"].monitors);
        this.monitors = originifyJson(runtime.extensionStorage["NGIO"].monitors);
      }
    }

    serializeMonitor(monitorData) {
      this.serializedMonitors[monitorData.id] = {
        x: monitorData.x,
        y: monitorData.y,
        width: monitorData.width,
        height: monitorData.height,
        id: monitorData.id,
      };

      if (!Scratch.extensions.isPenguinMod) runtime.extensionStorage["NGIO"].monitors = this.serializedMonitors;
    }

    getInfo() {
      return {
        id: "NGIO",
        // eslint-disable-next-line extension/should-translate
        name: "Newgrounds",

        color1: "#EB7522",
        color2: "#4F280E",
        color3: "#1B1717",

        menuIconURI: menuIco,

        blocks: [
          //Login Stuff
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Connection")
          },
          {
            opcode: "onLoginSuccess",
            blockType: Scratch.BlockType.HAT,
            text: Scratch.translate("when login success"),
            isEdgeActivated: false
          },
          {
            opcode: "onLoginRequired",
            blockType: Scratch.BlockType.HAT,
            text: Scratch.translate("when login required"),
            isEdgeActivated: false
          },
          {
            opcode: "promptLogin",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("prompt user login"),
          },
          {
            opcode: "skipLogin",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("skip login"),
          },

          "---", //Game blocks

          {
            opcode: "setVersionNumber",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("change game version to [version]"),
            hideFromPalette: true,
            arguments: {
              version: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "1.0.0",
              },
            },
          },

          {
            opcode: "connect",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "connect to game: [gameID] with code: [code]"
            ),
            hideFromPalette: true,
            arguments: {
              gameID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("gameID"),
              },
              code: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("Encryption Code"),
              },
            },
          },
          
          {
            opcode: "setConnectionData",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "connect to game: [gameID] with code: [code] and version: [version]"
            ),
            arguments: {
              gameID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("Game ID"),
              },
              code: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("Encryption Code"),
              },
              version: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "1.0.0",
              },
            },
          },

          "---", //Status Blocks

          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("API data")
          },
          {
            opcode: "isNewgrounds",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is newgrounds?"),
          },
          {
            opcode: "loggedIn",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("currently logged in?"),
            disableMonitor: true,
          },
          {
            opcode: "version",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("game version"),
          },
          {
            opcode: "getStatus",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("API status"),
          },

          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Changes will occur post refresh.")
          },
          {
            opcode: "getMedals",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("game medals"),
          },
          {
            opcode: "getScoreboards",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("game scoreboards"),
          },

          "---", //User Blocks

          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("User data")
          },
          {
            opcode: "getIfSupporter",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is user a newgrounds supporter?"),
          },
          {
            opcode: "getUserDat",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("user [datType]"),
            arguments: {
              datType: {
                type: Scratch.ArgumentType.STRING,
                menu: "userDatType",
              },
            },
          },

          "---", //Save Blocks
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Save data")
          },
          {
            opcode: "onSaveCompletedHat",
            blockType: Scratch.BlockType.HAT,
            text: Scratch.translate("when save completed"),
            isEdgeActivated: false
          },
          {
            opcode: "saveData",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("save [Data] to slot [Slot]"),
            arguments: {
              Data: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: Scratch.translate("Data"),
              },
              Slot: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
            },
          },
          {
            opcode: "doesSlotHaveData",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("does slot [Slot] have save data?"),
            arguments: {
              Slot: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
            },
          },
          {
            opcode: "getData",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("data from slot [Slot]"),
            arguments: {
              Slot: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
            },
          },

          "---", //Medal Blocks
          
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Medals")
          },
          {
            opcode: "onMedalUnlockedHat",
            blockType: Scratch.BlockType.HAT,
            text: Scratch.translate("when medal unlocked"),
            isEdgeActivated: false
          },
          {
            opcode: "unlockMedal",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("unlock medal [medalID]"),
            arguments: {
              medalID: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "000000",
              },
            },
          },
          {
            opcode: "getMedalData",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("get [data] of medal [medalID]"),
            arguments: {
              data: {
                menu: "medalDatType",                
              },
              medalID: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "000000",
              },
            },
          },
          {
            opcode: "isMedalUnlocked",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is medal [medalID] unlocked?"),
            arguments: {
              medalID: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "000000",
              },
            },
          },
          {
            opcode: "isMedalSecret",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("is medal [medalID] secret?"),
            arguments: {
              medalID: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "000000",
              },
            },
          },

          "---", //Scoreboard Blocks

          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Scoreboards")
          },
          {
            opcode: "onScorePosted",
            blockType: Scratch.BlockType.HAT,
            text: Scratch.translate("when score posted"),
            isEdgeActivated: false
          },
          {
            opcode: "postScore",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "post score [score] to scoreboard [scoreBoardID]"
            ),
            arguments: {
              scoreBoardID: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "000000",
              },
              score: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "100",
              },
            },
          },
          {
            opcode: "scoreboardName",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate(
              "name of scoreboard [scoreBoardID]"
            ),
            arguments: {
              scoreBoardID: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "000000",
              }
            },
          },
          {
            opcode: "getScore",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate(
              "[scoreDataType] of rank [rank] from scoreboard [scoreBoardID] from the timespan of [timeSpan]"
            ),
            arguments: {
              scoreBoardID: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "000000",
              },
              rank: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "1",
              },
              timeSpan: {
                type: Scratch.ArgumentType.STRING,
                menu: "periodTypes",
              },
              scoreDataType: {
                type: Scratch.ArgumentType.STRING,
                menu: "scoreDataType",
              },
            },
          },
          {
            opcode: "getScoresBulk",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate(
              "get the first [count] ranks starting from rank [rank] in scoreboard [scoreBoardID] from the timespan of [timeSpan]"
            ),
            arguments: {
              scoreBoardID: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "000000",
              },
              rank: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "1",
              },
              timeSpan: {
                type: Scratch.ArgumentType.STRING,
                menu: "periodTypes",
              },
              count: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "20",
              },
            },
          },
          "---",
          {
            opcode: "setScoreboardVisibility",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "[visibilityType] scoreboard [scoreBoardID]"
            ),
            arguments: {
              visibilityType: {
                type: Scratch.ArgumentType.STRING,
                menu: "visibilityTypes",
              },
              scoreBoardID: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "000000",
              },
            }
          },

          "---", //Settings/changability
          
          {
            blockType: Scratch.BlockType.LABEL,
            text: Scratch.translate("Extra")
          },
          {
            opcode: "setMonitorDisplayData",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate(
              "set [property] to [value]"
            ),
            arguments: {
              property: {
                type: Scratch.ArgumentType.STRING,
                menu: "displayPropertyTypes",
              },
              value: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "20",
              },
            }
          },

          "---", //Referrals

          {
            opcode: "loadNewgrounds",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("open newgrounds"),
          },
          {
            opcode: "loadMoreGames",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("open explore page"),
          },
          {
            opcode: "loadAuthor",
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate("open author page"),
          },
        ],

        menus: {
          userDatType: {
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate("username"),
                value: "name",
              },
              {
                text: Scratch.translate("id"),
                value: "id",
              },
              {
                text: Scratch.translate("score"),
                value: "MedalScore",
              },
              {
                text: Scratch.translate("profile picture"),
                value: "icon",
              },
            ],
          },
          medalDatType: {
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate("name"),
                value: "name",
              },
              {
                text: Scratch.translate("description"),
                value: "description",
              },
              {
                text: Scratch.translate("icon"),
                value: "icon",
              },
              {
                text: Scratch.translate("difficulty"),
                value: "difficulty",
              },
              {
                text: Scratch.translate("value"),
                value: "value",
              },
            ],
          },
          periodTypes: {
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate("Today"),
                value: NGIO.PERIOD_TODAY,
              },
              {
                text: Scratch.translate("All Time"),
                value: NGIO.PERIOD_ALL_TIME,
              },
            ],
          },
          scoreDataType: {
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate("username"),
                value: "name",
              },
              {
                text: Scratch.translate("id"),
                value: "id",
              },
              {
                text: Scratch.translate("is supporting?"),
                value: "supporter",
              },
              {
                text: Scratch.translate("profile picture"),
                value: "icon",
              },
              {
                text: Scratch.translate("score"),
                value: "rawScore",
              },
              {
                text: Scratch.translate("formatted score"),
                value: "score",
              },
              {
                text: "Json",
                value: "json",
              },
            ],
          },
          visibilityTypes: {
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate("show"),
                value: "show",
              },
              {
                text: Scratch.translate("hide"),
                value: "hide",
              },
              {
                text: Scratch.translate("refresh"),
                value: "refresh",
              }
            ],
          },
          displayPropertyTypes: {
            acceptReporters: true,
            items: [
              {
                text: Scratch.translate("Users per Page"),
                value: "itemCount",
              },
            ],
          }
        },
      };
    }

    //Monitors
    _createMonitorFor(scoreBoardID) {
      if (!gameData.scoreBoards[scoreBoardID]) return;

      const scoreboard = gameData.scoreBoards[scoreBoardID];

      let monitorExists = true;

      //Create data if it doesn't exist
      if (!this.monitors[scoreBoardID]) {
        monitorExists = false;
        this.monitors[scoreBoardID] = {
          x: (runtime.stageWidth / 2) - 62.5,
          y: (runtime.stageHeight / 2) - 100,
          width: 125,
          height: 200,
          id: scoreBoardID
        }

        this.serializeMonitor(this.monitors[scoreBoardID]);
      }
      else if (!this.monitors[scoreBoardID].element) monitorExists = false;

      //Now we decide if we need to create or just ignore the monitor
      const monitorData = this.monitors[scoreBoardID];
      
      if (!monitorExists) {
        //Create elements and set up css
        const monitorRoot = document.createElement("div");
        setElementCSS(monitorRoot, customCSS.sc_monitor_root);

        //Position the root
        monitorRoot.style.width = `${monitorData.width}px`;
        monitorRoot.style.height = `${monitorData.height}px`;
        monitorRoot.style.top = `${monitorData.y}px`;
        monitorRoot.style.left = `${monitorData.x}px`;

        const monitorHeader = document.createElement("div");
        setElementCSS(monitorHeader, customCSS.sc_monitor_list_label);

        const monitorInner = document.createElement("div");
        setElementCSS(monitorInner, customCSS.sc_monitor_rows_outer);

        const monitorFooter = document.createElement("div");
        setElementCSS(monitorFooter, customCSS.sc_monitor_list_footer);

        monitorRoot.appendChild(monitorHeader);
        monitorRoot.appendChild(monitorInner);
        monitorRoot.appendChild(monitorFooter);

        //Data
        let page = 0;

        //Contents
        const searchOptions = {
          period: NGIO.PERIOD_ALL_TIME,
          social: false,
          skip: page * monitorDisplayData.itemCount,
          limit: monitorDisplayData.itemCount + 1,
        };

        //Header elements of the monitor
        const monitorLabel = document.createElement("div");
        setElementCSS(monitorLabel, { flexGrow: "1" });
        monitorLabel.innerText = scoreboard.name;

        const buttonRefresh = document.createElement("div");
        buttonRefresh.innerText = "↻";

        monitorHeader.appendChild(buttonRefresh);
        monitorHeader.appendChild(monitorLabel);

        //Footer elements of the monitor
        const buttonPrevious = document.createElement("button");
        setElementCSS(buttonPrevious, customCSS.sc_monitor_page_button);
        buttonPrevious.innerText = "Last";

        const pageText = document.createElement("div");
        setElementCSS(pageText, customCSS.sc_monitor_page_text);
        pageText.innerHTML = `Page<br>${page + 1}`;

        const buttonNext = document.createElement("button");
        setElementCSS(buttonNext, customCSS.sc_monitor_page_button);
        buttonNext.innerText = "Next";

        monitorFooter.appendChild(buttonPrevious);
        monitorFooter.appendChild(pageText);
        monitorFooter.appendChild(buttonNext);

        //Actually displaying the board
        const displayBoard = (board, scores) => {
          if (scores.length == 0) { 
            buttonPrevious.disabled = true;
            buttonNext.disabled = true;
            return;
          }

          pageText.innerHTML = `Page<br>${page + 1}`;

          //Make sure buttons are valid
          buttonPrevious.disabled = false;
          buttonNext.disabled = false;

          if (page == 0) buttonPrevious.disabled = true;
          if (scores.length != (monitorDisplayData.itemCount + 1)) buttonNext.disabled = true;

          //Make sure buttons reflect the options
          if (buttonPrevious.disabled) setElementCSS(buttonPrevious, customCSS.sc_monitor_page_button_disabled);
          else setElementCSS(buttonPrevious, customCSS.sc_monitor_page_button);

          if (buttonNext.disabled) setElementCSS(buttonNext, customCSS.sc_monitor_page_button_disabled);
          else setElementCSS(buttonNext, customCSS.sc_monitor_page_button);

          //start displaying the monitor
          let scoresToDisplay = scores.length;
          if (scores.length == (monitorDisplayData.itemCount + 1)) scoresToDisplay--;

          monitorInner.innerHTML = "";

          for (let scoreID = 0; scoreID < scoresToDisplay; scoreID++) {
            const score = scores[scoreID];

            const rowOuter = document.createElement("label");
            setElementCSS(rowOuter, customCSS.sc_monitor_row_root);

            const rowIndex = document.createElement("img");
            setElementCSS(rowIndex, customCSS.sc_monitor_row_index);
            rowIndex.src = score.user.icons.large;

            const rowValue = document.createElement("div");
            setElementCSS(rowValue, customCSS.sc_monitor_row_value_outer);

            const rowValueText = document.createElement("div");
            setElementCSS(rowValueText, customCSS.sc_monitor_row_value_inner);
            rowValueText.innerText = score.formatted_value;

            rowOuter.appendChild(rowIndex);
            rowOuter.appendChild(rowValue);
            rowValue.appendChild(rowValueText);

            rowIndex.onmouseover = () => { rowValueText.innerText = score.user.name; }
            rowIndex.onmouseout = () => { rowValueText.innerText = score.formatted_value; }

            monitorInner.appendChild(rowOuter);
          }
        }

        buttonPrevious.onclick = () => {
          page -= 1;
          searchOptions.skip = page * monitorDisplayData.itemCount;
          NGIO.getScores(scoreBoardID, searchOptions, displayBoard);
        }

        buttonNext.onclick = () => {
          page += 1;
          searchOptions.skip = page * monitorDisplayData.itemCount;
          NGIO.getScores(scoreBoardID, searchOptions, displayBoard);
        }

        //For refreshing through the monitor, add a cooldown so we can do this easier;
        const refreshClicked = (event) => {
          event.stopImmediatePropagation();
          
          buttonRefresh.removeEventListener("click", refreshClicked);
          NGIO.getScores(scoreBoardID, searchOptions, displayBoard);

          setTimeout(() => {
            buttonRefresh.addEventListener("click", refreshClicked);
          }, 1000);
        }

        buttonRefresh.addEventListener("click", refreshClicked);

        //Add dragging if we are in the editor
        if (!isPackaged) {
          //Create and add it down here for reasons
          const resizeDiv = document.createElement("div");
          setElementCSS(resizeDiv, { cursor: "ne-resize" });
          resizeDiv.innerText = "=";
          monitorHeader.appendChild(resizeDiv);

          //Now define the stuff we need for movement
          let boundingRect = renderer.canvas.getBoundingClientRect();
          let offsetX = 0;
          let offsetY = 0;
          let originalX = 0;
          let originalY = 0;
          let yoffsetForResizing = 0;

          //Monitor movement code
          const monitorDragMoveEvent = (event) => {
            //Get position from a 0-1 scale
            let placedPositionX = (event.clientX - offsetX - boundingRect.x) / boundingRect.width;
            let placedPositionY = (event.clientY - offsetY - boundingRect.y) / boundingRect.height;

            //Clamp to stage
            placedPositionX = Math.min(Math.max(0, placedPositionX), (1 - (monitorData.width / runtime.stageWidth))) * runtime.stageWidth;
            placedPositionY = Math.min(Math.max(0, placedPositionY), (1 - (monitorData.height / runtime.stageHeight))) * runtime.stageHeight;

            monitorData.x = placedPositionX;
            monitorData.y = placedPositionY;

            setElementCSS(monitorRoot, {
              left: `${placedPositionX}px`,
              top: `${placedPositionY}px`
            });
          }

          const monitorDragReleaseEvent = () => {
            setElementCSS(monitorRoot, { filter: "drop-shadow(rgba(0, 0, 0, 0.0) 0px 0px 0px)" });

            this.serializeMonitor(this.monitors[scoreBoardID]);

            document.removeEventListener("mousemove", monitorDragMoveEvent);

            document.removeEventListener("mouseup", monitorDragReleaseEvent);
            document.removeEventListener("mouseleave", monitorDragReleaseEvent);
          }

          const monitorResizeMoveEvent = (event) => {
            //Get position from a 0-1 scale
            let placedSizeX = ((event.clientX - originalX) / boundingRect.width) + offsetX;
            let placedSizeY = ((originalY - event.clientY) / boundingRect.height) + offsetY;

            //Clamp to stage          
            let placedPositionY = (yoffsetForResizing - (Math.max(125 / runtime.stageHeight, placedSizeY) - offsetY)) * runtime.stageHeight;
            placedSizeX = Math.min(Math.max(125 / runtime.stageWidth, placedSizeX), 1) * runtime.stageWidth;
            placedSizeY = Math.min(Math.max(125 / runtime.stageHeight, placedSizeY), 1) * runtime.stageHeight;

            monitorData.width = placedSizeX;
            monitorData.height = placedSizeY;
            monitorData.y = placedPositionY;

            setElementCSS(monitorRoot, {
              width: `${placedSizeX}px`,
              height: `${placedSizeY}px`,
              top: `${placedPositionY}px`
            });          
          }

          const monitorResizeReleaseEvent = (event) => {
            setElementCSS(monitorRoot, { filter: "drop-shadow(rgba(0, 0, 0, 0.0) 0px 0px 0px)" });

          this.serializeMonitor(this.monitors[scoreBoardID]);

            document.removeEventListener("mousemove", monitorResizeMoveEvent);

            document.removeEventListener("mouseup", monitorResizeReleaseEvent);
            document.removeEventListener("mouseleave", monitorResizeReleaseEvent);
          }

          monitorHeader.onmousedown = (event) => {
            event.stopImmediatePropagation();
            
            boundingRect = renderer.canvas.getBoundingClientRect();
            const rootRect = monitorRoot.getBoundingClientRect();

            offsetX = event.clientX - rootRect.x;
            offsetY = event.clientY - rootRect.y;
            originalX = event.clientX;
            originalY = event.clientY;

            setElementCSS(monitorRoot, { filter: "drop-shadow(rgba(0, 0, 0, 0.6) 2px 2px 4px)" });

            document.addEventListener("mousemove", monitorDragMoveEvent);

            document.addEventListener("mouseup", monitorDragReleaseEvent);
            document.addEventListener("mouseleave", monitorDragReleaseEvent);
          }

          resizeDiv.onmousedown = () => {
            event.stopImmediatePropagation();
            
            boundingRect = renderer.canvas.getBoundingClientRect();
            const rootRect = monitorRoot.getBoundingClientRect();

            offsetX = monitorData.width / runtime.stageWidth;
            offsetY = monitorData.height / runtime.stageHeight;
            yoffsetForResizing = monitorData.y / runtime.stageHeight;
            originalX = event.clientX;
            originalY = event.clientY;

            document.addEventListener("mousemove", monitorResizeMoveEvent);

            document.addEventListener("mouseup", monitorResizeReleaseEvent);
            document.addEventListener("mouseleave", monitorResizeReleaseEvent);
          }
        }

        //Display the first page
        NGIO.getScores(scoreBoardID, searchOptions, displayBoard);

        Scratch.renderer.addOverlay(monitorRoot);

        //Finally store our new root element
        monitorData.element = monitorRoot;
        monitorData.refresh = () => {
          NGIO.getScores(scoreBoardID, searchOptions, displayBoard);
        }
      }
    }

    //Referrals
    loadNewgrounds() {
      NGIO.loadNewgrounds();
    }

    loadMoreGames() {
      NGIO.loadMoreGames();
    }

    loadAuthor() {
      NGIO.loadAuthorUrl();
    }

    //score

    getScore({ rank, scoreBoardID, timeSpan, scoreDataType }) {
      if (!(NGIO.session && gameData.scoreBoards[scoreBoardID])) return 0;
      
      const searchOptions = {
        period: timeSpan,
        social: false,
        skip: Math.max(1, Scratch.Cast.toNumber(rank)) - 1,
        limit: 1,
      };

      return new Promise((resolve, reject) => {
        NGIO.getScores(scoreBoardID, searchOptions, (board, scores) => {
          // <= declaring the board before scores so that we can retrieve the scores.
          switch (scoreDataType) {
            case "name":
              resolve(scores[0].user.name);
              break;
            case "id":
              resolve(scores[0].user.id);
              break;
            case "supporter":
              resolve(scores[0].user.supporter);
              break;
            case "icon":
              resolve(scores[0].user.icons.large);
              break;
            case "rawScore":
              resolve(scores[0].value);
              break;
            case "score":
              resolve(scores[0].formatted_value);
              break;
            case "json":
              resolve(
                JSON.stringify({
                  name: scores[0].user.name,
                  id: scores[0].user.id,
                  isSupporting: scores[0].user.supporter,
                  icon: scores[0].user.icons.large,
                  score: scores[0].value,
                  formattedScore: scores[0].formatted_value,
                })
              );
              break;
          }
        });
      });
    }

    getScoresBulk({ count, rank, scoreBoardID, timeSpan }) {
      if (!(NGIO.session && gameData.scoreBoards[scoreBoardID])) return "{}";
      
      const searchOptions = {
        period: timeSpan,
        social: false,
        skip: Math.max(1, Scratch.Cast.toNumber(rank)) - 1,
        limit: Math.min(Math.max(1, Scratch.Cast.toNumber(count)), 100),
      };

      return new Promise((resolve, reject) => {
        NGIO.getScores(scoreBoardID, searchOptions, (board, scores) => {
          const output = [];

          for (let scoreID in scores) {
            output.push({
              name: scores[scoreID].user.name,
              id: scores[scoreID].user.id,
              isSupporting: scores[scoreID].user.supporter,
              icon: scores[scoreID].user.icons.large,
              score: scores[scoreID].value,
              formattedScore: scores[scoreID].formatted_value
            });
          }

          resolve(JSON.stringify(output));
        });
      });
    }

    postScore({ score, scoreBoardID }, util) {
      if (NGIO.session && gameData.scoreBoards[scoreBoardID]) {
        //Wrap it in a promise to make sure the code is ran post score posting.
        return new Promise((resolve, reject) => {
          NGIO.postScore(scoreBoardID, Math.round(Scratch.Cast.toNumber(score)), () => {
            util.startHats("NGIO_onScorePosted");
            resolve();
          });
        });
      }
    }

    scoreboardName({ scoreBoardID }) {
      if (NGIO.session && gameData.scoreBoards[scoreBoardID]) {
        return gameData.scoreBoards[scoreBoardID].name;
      } 
      else {
        return "";
      }     
    }

    setScoreboardVisibility({ visibilityType, scoreBoardID }) {
      if (visibilityType == "show") this._createMonitorFor(scoreBoardID);
      else if (visibilityType == "refresh") {
        if (this.monitors[scoreBoardID] && this.monitors[scoreBoardID].refresh) {
          this.monitors[scoreBoardID].refresh();
        }
      }
      else {
        if (this.monitors[scoreBoardID] && this.monitors[scoreBoardID].element) {
          const element = this.monitors[scoreBoardID].element;
          element.parentElement.removeChild(element);

          //Clean up the scoreboard
          delete this.monitors[scoreBoardID].element;
          delete this.monitors[scoreBoardID].refresh;
        }
      }
    }

    onScorePosted() { return true; }

    //! V Completely necessary comment.
    // :3
    setMonitorDisplayData({ property, value }) {
      switch (property) {
        case "itemCount":
          monitorDisplayData.itemCount = Math.min(Math.max(1, Scratch.Cast.toNumber(value)), 100);
          break;
      
        default:
          break;
      }
    }

    //Other Stuff

    onLoginSuccess() { return true; }

    onLoginRequired() { return true; }

    waitForValid(util) {
      return new Promise((resolve, reject) => {
          const intervalID = setInterval(() => {
            NGIO.getConnectionStatus(statusReport);

            //Wait for finish
            switch (ConnectionStatus) {
              //In case we aren't awaiting
              case "Awaiting":
                break;

              case "Login Required":
                util.startHats("NGIO_onLoginRequired");
                clearInterval(intervalID);
                resolve();
                break;

              case "Logged In":
                util.startHats("NGIO_onLoginSuccess");
                clearInterval(intervalID);

                //Set userDat object data
                userDat.logged = NGIO.hasUser;
                if (userDat.logged == true) {
                  userDat.icon = NGIO.user.icons.large;
                  userDat.name = NGIO.user.name;
                  userDat.supporter = NGIO.user.supporter;
                  userDat.id = NGIO.user.id;
                }
                resolve();
                break;

              default:
                clearInterval(intervalID);
                resolve();
                break;
            }
        });
      });
    }

    promptLogin(args, util) {
      if (NGIO.session && !userDat.logged) {
        NGIO.openLoginPage();
        return this.waitForValid(util);
      }
    }

    skipLogin() {
      if (NGIO.session) {
        NGIO.skipLogin();
        NGIO.getConnectionStatus(statusReport);
      }
    }

    setVersionNumber({ version }) {
      NGOptions.version = version;
    }

    connect({ gameID, code }) {
      NGIO.init(gameID, code, NGOptions);

      //Add a hook for the connection status to Newgrounds.
      NGIO.getConnectionStatus(statusReport);
    }

    setConnectionData({ gameID, code, version }, util) {
      return new Promise((resolve, reject) => {
        NGOptions.version = version;
        NGIO.init(gameID, code, NGOptions);

        //Add a hook for the connection status to Newgrounds.
        this.waitForValid(util).then(() => {
          resolve();
        });
      });
    }

    //Connection Stuff

    loggedIn() {
      if (!NGIO.session) return false;

      NGIO.getConnectionStatus(statusReport);
      return NGIO.hasUser;
    }

    version() {
      return NGOptions.version;
    }

    getStatus() {
      return ConnectionStatus;
    }

    isNewgrounds() {
      return isNG;
    }

    getMedals() {
      if (NGIO.session) {
        const output = {};

        for (let medalID in gameData.medals) { output[gameData.medals[medalID].name] = medalID; }

        return JSON.stringify(output);
      }
      else return "{}";
    }

    getScoreboards() {
      if (NGIO.session) {
        const output = {};

        for (let scoreboardID in gameData.scoreBoards) { output[gameData.scoreBoards[scoreboardID].name] = scoreboardID; }

        return JSON.stringify(output);
      }
      else return "{}";
    }

    //User Stuff

    getIfSupporter() {
      return userDat.supporter || false;
    }

    getUserDat({ datType }) {
      if (NGIO.session && loggedIn) {
        if (datType == "MedalScore") {
          return NGIO.medalScore || 0;
        } else {
          return userDat[datType] || "";
        }
      } else {
        if (datType == "MedalScore") {
          return 0;
        } else {
          if (datType == "icon") {
            return userDat.icon || "";
          }
          return "unknown";
        }
      }
    }

    // Save Blocks

    onSaveCompletedHat() { return true; }

    saveData({ Data, Slot }, util) {
      if (NGIO.session && loggedIn) {
        //Configure our slot to be in a good range!
        Slot = Math.max(1, Math.floor(Scratch.Cast.toNumber(Slot)));

        return new Promise((resolve, reject) => {
          NGIO.setSaveSlotData(
            Scratch.Cast.toString(Slot),
            Scratch.Cast.toString(Data),
            () => {
              util.startHats("NGIO_onSaveCompletedHat");
              //Create dummy slot.
              gameData.saveSlots[Slot] = {
                hasData: true,
              };

              resolve();
            });
        })
      }
    }

    getData({ Slot }) {
      if (NGIO.session && loggedIn) {
        //Configure our slot to be in a good range!
        Slot = Math.max(1, Math.floor(Scratch.Cast.toNumber(Slot)));
        let saveDat = "Nothing in Slot";

        return new Promise((resolve, reject) => {
          //Try to get the data
          if (!gameData.saveSlots[Slot]) resolve("");
          else NGIO.getSaveSlotData(Scratch.Cast.toNumber(Slot), () => {
            if (data) saveDat = Scratch.Cast.toString(data);
            else saveDat = "";

            resolve(saveDat);
          });
        });
      } else {
        if (NGIO.session && !loggedIn) return "Not logged in!";
        return "Can't get data from Newgrounds!";
      }
    }

    doesSlotHaveData({ Slot }) {
      if (NGIO.session && loggedIn) {
        this.revitalizeSession();

        //Configure our slot to be in a good range!
        Slot = Math.max(1, Math.floor(Scratch.Cast.toNumber(Slot)));

        //get and verify save slot!
        if (!gameData.saveSlots[Slot]) return false;
        const saveSlot = NGIO.getSaveSlot(Slot);

        return saveSlot.hasData;
      } else {
        return false;
      }
    }

    //Medals
    onMedalUnlockedHat() { return true; }

    unlockMedal({ medalID }, util) {
      if (NGIO.session && loggedIn) {
        this.revitalizeSession();

        medalID = Scratch.Cast.toNumber(medalID);

        if (!(NGIO.session && gameData.medals[medalID])) return;
        NGIO.unlockMedal(medalID,() => {
            util.startHats("NGIO_onMedalUnlockedHat");
        });
      }
    }

    isMedalUnlocked({ medalID }) {
      if (NGIO.session && loggedIn) {
        this.revitalizeSession();

        medalID = Scratch.Cast.toNumber(medalID);

        if (!(NGIO.session && gameData.medals[medalID])) return false;
        return gameData.medals[medalID].unlocked;
      } else {
        return false;
      }
    }

    isMedalSecret({ medalID }) {
      if (NGIO.session && loggedIn) {
        this.revitalizeSession();

        medalID = Scratch.Cast.toNumber(medalID);

        if (!(NGIO.session && gameData.medals[medalID])) return false;
        return gameData.medals[medalID].secret;
      } else {
        return false;
      }
    }
    
    getMedalData({ data, medalID }) {
      if (NGIO.session && loggedIn) {
        this.revitalizeSession();

        medalID = Scratch.Cast.toNumber(medalID);

        if (!(NGIO.session && gameData.medals[medalID])) return "";

        const medal = gameData.medals[medalID];
        switch (data) {
          case "name": return medal.name;
          case "description": return medal.description;
          //Make sure we get a url
          case "icon": return (medal.icon.startsWith("https:")) ? medal.icon : "https:" + medal.icon;
          case "difficulty": return medal.difficulty;
          case "value": return medal.value;
        
          default: return "";
        }
      } else {
        return "";
      }
    }

    //To keep the session alive!
    revitalizeSession() {
      //Get and keep the session alive
      NGIO.getConnectionStatus(statusReport);
      if (loggedIn) NGIO.keepSessionAlive();
    }
  }

  setInterval(function() {
    NGIO.keepSessionAlive();
  }, 30000);

  Scratch.extensions.register(new NewgroundsAPI());
})(Scratch);
