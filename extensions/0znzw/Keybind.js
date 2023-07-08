/*!
 * VERSION 1.4
 * Originally created by https://scratch.mit.edu/users/0znzw/ | Licenced Under the MIT License
 * Funny enough I made this originally for PenguinMod, this is also compatible with PenguinMod :D.
 * DO NOT REMOVE THIS COMMENT
 */
(function(Scratch) {
    'use strict';

    /*!
    * mousetrap v1.6.5 craig.is/killing/mice
    * Modified to not leak to global scobe by SurvExE1Pc
    */
    /* eslint-disable */
    //@ts-expect-error
    var MouseTrap = (function(window,document,undefined){if(window){for(var _REVERSE_MAP,_MAP={8:"backspace",9:"tab",13:"enter",16:"shift",17:"ctrl",18:"alt",20:"capslock",27:"esc",32:"space",33:"pageup",34:"pagedown",35:"end",36:"home",37:"left",38:"up",39:"right",40:"down",45:"ins",46:"del",91:"meta",93:"meta",224:"meta"},_KEYCODE_MAP={106:"*",107:"+",109:"-",110:".",111:"/",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'"},_SHIFT_MAP={"~":"`","!":"1","@":"2","#":"3",$:"4","%":"5","^":"6","&":"7","*":"8","(":"9",")":"0",_:"-","+":"=",":":";",'"':"'","<":",",">":".","?":"/","|":"\\"},_SPECIAL_ALIASES={option:"alt",command:"meta",return:"enter",escape:"esc",plus:"+",mod:/Mac|iPod|iPhone|iPad/.test(navigator.platform)?"meta":"ctrl"},i=1;i<20;++i)_MAP[111+i]="f"+i;for(i=0;i<=9;++i)_MAP[i+96]=i.toString();return Mousetrap.prototype.bind=function(keys,callback,action){return keys=keys instanceof Array?keys:[keys],this._bindMultiple.call(this,keys,callback,action),this},Mousetrap.prototype.unbind=function(keys,action){return this.bind.call(this,keys,(function(){}),action)},Mousetrap.prototype.trigger=function(keys,action){return this._directMap[keys+":"+action]&&this._directMap[keys+":"+action]({},keys),this},Mousetrap.prototype.reset=function(){return this._callbacks={},this._directMap={},this},Mousetrap.prototype.stopCallback=function(e,element){if((" "+element.className+" ").indexOf(" mousetrap ")>-1)return!1;if(_belongsTo(element,this.target))return!1;if("composedPath"in e&&"function"==typeof e.composedPath){var initialEventTarget=e.composedPath()[0];initialEventTarget!==e.target&&(element=initialEventTarget)}return"INPUT"==element.tagName||"SELECT"==element.tagName||"TEXTAREA"==element.tagName||element.isContentEditable},Mousetrap.prototype.handleKey=function(){return this._handleKey.apply(this,arguments)},Mousetrap.addKeycodes=function(object){for(var key in object)object.hasOwnProperty(key)&&(_MAP[key]=object[key]);_REVERSE_MAP=null},Mousetrap.init=function(){var documentMousetrap=Mousetrap(document);for(var method in documentMousetrap)"_"!==method.charAt(0)&&(Mousetrap[method]=function(method){return function(){return documentMousetrap[method].apply(documentMousetrap,arguments)}}(method))},Mousetrap.init(),"undefined"!=typeof module&&module.exports&&(module.exports=Mousetrap),"function"==typeof define&&define.amd&&define((function(){return Mousetrap})),Mousetrap}function _addEvent(object,type,callback){object.addEventListener?object.addEventListener(type,callback,!1):object.attachEvent("on"+type,callback)}function _characterFromEvent(e){if("keypress"==e.type){var character=String.fromCharCode(e.which);return e.shiftKey||(character=character.toLowerCase()),character}return _MAP[e.which]?_MAP[e.which]:_KEYCODE_MAP[e.which]?_KEYCODE_MAP[e.which]:String.fromCharCode(e.which).toLowerCase()}function _isModifier(key){return"shift"==key||"ctrl"==key||"alt"==key||"meta"==key}function _pickBestAction(key,modifiers,action){return action||(action=function _getReverseMap(){if(!_REVERSE_MAP)for(var key in _REVERSE_MAP={},_MAP)key>95&&key<112||_MAP.hasOwnProperty(key)&&(_REVERSE_MAP[_MAP[key]]=key);return _REVERSE_MAP}()[key]?"keydown":"keypress"),"keypress"==action&&modifiers.length&&(action="keydown"),action}function _getKeyInfo(combination,action){var keys,key,i,modifiers=[];for(keys=function _keysFromString(combination){return"+"===combination?["+"]:(combination=combination.replace(/\+{2}/g,"+plus")).split("+")}(combination),i=0;i<keys.length;++i)key=keys[i],_SPECIAL_ALIASES[key]&&(key=_SPECIAL_ALIASES[key]),action&&"keypress"!=action&&_SHIFT_MAP[key]&&(key=_SHIFT_MAP[key],modifiers.push("shift")),_isModifier(key)&&modifiers.push(key);return{key:key,modifiers:modifiers,action:action=_pickBestAction(key,modifiers,action)}}function _belongsTo(element,ancestor){return null!==element&&element!==document&&(element===ancestor||_belongsTo(element.parentNode,ancestor))}function Mousetrap(targetElement){var self=this;if(targetElement=targetElement||document,!(self instanceof Mousetrap))return new Mousetrap(targetElement);self.target=targetElement,self._callbacks={},self._directMap={};var _resetTimer,_sequenceLevels={},_ignoreNextKeyup=!1,_ignoreNextKeypress=!1,_nextExpectedAction=!1;function _resetSequences(doNotReset){doNotReset=doNotReset||{};var key,activeSequences=!1;for(key in _sequenceLevels)doNotReset[key]?activeSequences=!0:_sequenceLevels[key]=0;activeSequences||(_nextExpectedAction=!1)}function _getMatches(character,modifiers,e,sequenceName,combination,level){var i,callback,modifiers1,modifiers2,matches=[],action=e.type;if(!self._callbacks[character])return[];for("keyup"==action&&_isModifier(character)&&(modifiers=[character]),i=0;i<self._callbacks[character].length;++i)if(callback=self._callbacks[character][i],(sequenceName||!callback.seq||_sequenceLevels[callback.seq]==callback.level)&&action==callback.action&&("keypress"==action&&!e.metaKey&&!e.ctrlKey||(modifiers1=modifiers,modifiers2=callback.modifiers,modifiers1.sort().join(",")===modifiers2.sort().join(",")))){var deleteCombo=!sequenceName&&callback.combo==combination,deleteSequence=sequenceName&&callback.seq==sequenceName&&callback.level==level;(deleteCombo||deleteSequence)&&self._callbacks[character].splice(i,1),matches.push(callback)}return matches}function _fireCallback(callback,e,combo,sequence){self.stopCallback(e,e.target||e.srcElement,combo,sequence)||!1===callback(e,combo)&&(!function _preventDefault(e){e.preventDefault?e.preventDefault():e.returnValue=!1}(e),function _stopPropagation(e){e.stopPropagation?e.stopPropagation():e.cancelBubble=!0}(e))}function _handleKeyEvent(e){"number"!=typeof e.which&&(e.which=e.keyCode);var character=_characterFromEvent(e);character&&("keyup"!=e.type||_ignoreNextKeyup!==character?self.handleKey(character,function _eventModifiers(e){var modifiers=[];return e.shiftKey&&modifiers.push("shift"),e.altKey&&modifiers.push("alt"),e.ctrlKey&&modifiers.push("ctrl"),e.metaKey&&modifiers.push("meta"),modifiers}(e),e):_ignoreNextKeyup=!1)}function _bindSequence(combo,keys,callback,action){function _increaseSequence(nextAction){return function(){_nextExpectedAction=nextAction,++_sequenceLevels[combo],function _resetSequenceTimer(){clearTimeout(_resetTimer),_resetTimer=setTimeout(_resetSequences,1e3)}()}}function _callbackAndReset(e){_fireCallback(callback,e,combo),"keyup"!==action&&(_ignoreNextKeyup=_characterFromEvent(e)),setTimeout(_resetSequences,10)}_sequenceLevels[combo]=0;for(var i=0;i<keys.length;++i){var wrappedCallback=i+1===keys.length?_callbackAndReset:_increaseSequence(action||_getKeyInfo(keys[i+1]).action);_bindSingle(keys[i],wrappedCallback,action,combo,i)}}function _bindSingle(combination,callback,action,sequenceName,level){self._directMap[combination+":"+action]=callback;var info,sequence=(combination=combination.replace(/\s+/g," ")).split(" ");sequence.length>1?_bindSequence(combination,sequence,callback,action):(info=_getKeyInfo(combination,action),self._callbacks[info.key]=self._callbacks[info.key]||[],_getMatches(info.key,info.modifiers,{type:info.action},sequenceName,combination,level),self._callbacks[info.key][sequenceName?"unshift":"push"]({callback:callback,modifiers:info.modifiers,action:info.action,seq:sequenceName,level:level,combo:combination}))}self._handleKey=function(character,modifiers,e){var i,callbacks=_getMatches(character,modifiers,e),doNotReset={},maxLevel=0,processedSequenceCallback=!1;for(i=0;i<callbacks.length;++i)callbacks[i].seq&&(maxLevel=Math.max(maxLevel,callbacks[i].level));for(i=0;i<callbacks.length;++i)if(callbacks[i].seq){if(callbacks[i].level!=maxLevel)continue;processedSequenceCallback=!0,doNotReset[callbacks[i].seq]=1,_fireCallback(callbacks[i].callback,e,callbacks[i].combo,callbacks[i].seq)}else processedSequenceCallback||_fireCallback(callbacks[i].callback,e,callbacks[i].combo);var ignoreThisKeypress="keypress"==e.type&&_ignoreNextKeypress;e.type!=_nextExpectedAction||_isModifier(character)||ignoreThisKeypress||_resetSequences(doNotReset),_ignoreNextKeypress=processedSequenceCallback&&"keydown"==e.type},self._bindMultiple=function(combinations,callback,action){for(var i=0;i<combinations.length;++i)_bindSingle(combinations[i],callback,action)},_addEvent(targetElement,"keypress",_handleKeyEvent),_addEvent(targetElement,"keydown",_handleKeyEvent),_addEvent(targetElement,"keyup",_handleKeyEvent)}})("undefined"!=typeof window?window:null,"undefined"!=typeof window?document:null);    /* eslint-enable */
    //@ts-expect-error
    MouseTrap = new MouseTrap(document);
    var Mousetrap = MouseTrap;
    /* eslint-enable */

    var keybinds = [];
    var lastKeybind;
    function addKeybind(name, keys) {
        keybinds.push({name, keys});
    }

    if (!Scratch.extensions.unsandboxed) {
        throw new Error(`Keybinds must run unsandboxed`);
    }

    var myUtils = {};
    myUtils.hasObjectWithValueAs = function(array, key, val) {
            var item;
            for (item in array) {
                item = array[item];
                if (Object.keys(item).includes(key)) {
                    if (Object.values(item)[Object.keys(item).indexOf(key)] == val) {
                        return true;
                    }
                } else continue;
            }
            return false;
        };
    myUtils.getObjectIndexInListWithValueAs = function(array, key, val) {
            var item;
            for (item in array) {
                const old_item = item;
                item = array[item];
                if (Object.keys(item).includes(key)) {
                    if (Object.values(item)[Object.keys(item).indexOf(key)] == val) {
                        return parseInt(old_item);
                    }
                } else continue;
            }
            return -1;
        };

        function bindAllKeybinds() {
            var keybind;
            for (keybind in keybinds) {
                const old_keybind = keybind;
                keybind = keybinds[keybind];
                const bindName = keybind.name;
                console.log(keybind);
                var key;
                const new_keys = structuredClone(keybind.keys);
                for (key in new_keys) {
                    const old_key = key;
                    key = new_keys[key];
                    if (['ctrl', 'shift', 'alt'].includes(key)) {
                        key += "+";
                    } else {
                        key += " ";
                    }
                    new_keys[old_key] = key;
                }
                var keys_joined = new_keys.join('').trimEnd();
                console.log(keys_joined);
                Mousetrap.bind(keys_joined, function(){
                    keybinds[old_keybind].pressed = true;
                    lastKeybind = Scratch.Cast.toString(bindName);
                    events[Scratch.Cast.toString(bindName)] = true;
                }, 'keyup');
            }
        }

        // null-prototype object so that `when (toString)` doesn't break stuff
        const events = Object.create(null);

        //https://icons8.com/icon/34922/ctrl
        const icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAAAsTAAALEwEAmpwYAAAC5UlEQVR4nO2YWU9TURSF+SH6zD9QYmIikhhNZIpKRHECaS+TKGpJJ4IQ0Eix5SIBB4ghKBWFFGjBMggUiwxWhpZyASnQoJIikSf7QMgy5yiNUCsNtLc+3JOspO3Z7f6yzt7nNjssTFgBXGly1f40JdvOyDRukVQNPsXINO50JWtkFOpwn3AZeRVrBtP4htXhAudc5VVWhwuG/vENwkBYvAGVbDsJ4BuM2yYKqWQNXoDE4lA4x22TzeGCWKpxewGSOgg1HPdbhEUA5AQHnUINIihN8nbQigZ9LxrbTOgbtu+61l629iDhclbgAF/ouhCXKMKBI9FblCUp3BL3wb7oF2B1fSv9fkAA1Y+e42BkDLKlxXhjssDqWMbH6SXou4fwuE7niSsorcIF8S1+AVu63iMiMgbFmqc7JpXkl/IPmJIlQ/x5BvaFbz6TTXz6ikxJAU6eSUFU9Dn6msCSvU7zGH1vHp1BjvweEi5lYnBiLjCA47NfcCgqHqqK2n+6YZ1bRkFJFU1+4tQVqCpr8bCmge6RZiIgyRm5uJl3n+4NTjgCA2gamaI/Utdo9OvYpIVqJKXmbPlsEzD3zoPAH3Hv8OQvwKaOPQPqu4cCDzg6s4SIo7E7HjHnB6B5dDo4TXKRuY3YxFTY5117AhwYmw0OYJPxHb1mFEUsphZ9dzLnXIWsSIOzydf4BfzzoibuPKnT4XV7P569akN+SSWuy+564thqLe36+uZuNHcO8Ae4eWEzOXn0niN1eSwuCanZcgqzGTM2/RniG0ocPn7a46ShZ4Q+c4dtC8F9FvMpkQDoFBxcFWqQ202T2OZX/ovJgsgXoNnq39/1YMpsXfQN2Nw3SQNC4aRtfoXmJgx/BSTDI63RAl2fLaTSGi0Qy8p+eAGmKdiO0pqW9VADqmpa1jMU5XpvBxXqcEbBrhHIUDipNVpAcjNy9vtVSdk+L0DPlFXJGsh8ju8RsFiqcacryvU+4YQVtrv1EzPQ6ctnLjrMAAAAAElFTkSuQmCC';

        class KeybindExt {
            getInfo () {
            return {
                id: '0znzwkeybinds',
                name: 'Keybinds',
                menuIconURI: icon,
                color1: '#66798F',
                color2: '#B0C1D4',
                color3: '#66798F',
                blocks: [
                    {
                        opcode: 'whenKeybind',
                        blockType: Scratch.BlockType.HAT,
                        text: 'when keybind [EVENT] pressed',
                        arguments: {
                            EVENT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'keybind1'
                            }
                        }
                    },
                    {
                        opcode: 'runKeybind',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'execute keybind [EVENT]',
                        arguments: {
                            EVENT: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'keybind1'
                            }
                        }
                    },
                    '---',
                    {
                        opcode: 'createKeybind',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'create keybind [name] with keys [keys]',
                        arguments: {
                            name: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'keybind1'
                            },
                            keys: {
                                type: Scratch.ArgumentType.STRING,
                            }
                        }
                    },
                    {
                        opcode: 'deleteKeybind',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'delete keybind [name]',
                        arguments: {
                            name: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'keybind1'
                            }
                        }
                    },
                    '---',
                    {
                        opcode: 'editKeybind',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'set [mode] of keybind [name] to [value]',
                        arguments: {
                            mode: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'keybindModifyOptions'
                            },
                            name: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'keybind1'
                            },
                            value: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'keybind2'
                            }
                        }
                    },
                    '---',
                    {
                        opcode: 'getKeybindData',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'get keybind [name] [mode]',
                        arguments: {
                            mode: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'keybindModifyOptions2'
                            },
                            name: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'keybind1'
                            }
                        }
                    },
                    '---',
                    {
                        opcode: 'latestKey',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'last key pressed',
                        disableMonitor: true
                    },
                    {
                        opcode: 'isKeybindPressed',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'keybind [name] was just ran?',
                        arguments: {
                            name: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'keybind1'
                            }
                        }
                    },
                    {
                        opcode: 'getLatestKeybind',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'last keybind',
                        disableMonitor: true,
                        hideFromPalette: true
                    },
                    {
                        opcode: 'clearLatestKeybind',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'clear last keybind',
                        hideFromPalette: true
                    },
                    {
                        opcode: 'keybindExists',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'keybind [name] exists?',
                        arguments: {
                            name: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'keybind1'
                            }
                        }
                    },
                    '---',
                    {
                        opcode: 'getAllKeybinds',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'get all keybinds',
                        disableMonitor: true
                    },
                    {
                        opcode: 'refreshKeybinds',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'Refresh All Keybinds',
                        hideFromPalette: true
                    },
                ],
                menus: {
                    keybindModifyOptions: {
                        items: ['name','keys','JSON'],
                        acceptReporters: false
                    },
                    keybindModifyOptions2: {
                        items: ['name','keys (text)','keys (json)','JSON'],
                        acceptReporters: false
                    }
                }
            };
        }

            clearLatestKeybind() {
                lastKeybind = '';
            }

            getLatestKeybind() {
                return lastKeybind;
            }

            keybindExists({ name }) {
                return Scratch.Cast.toBoolean(myUtils.hasObjectWithValueAs(keybinds, 'name', name));
            }

            getAllKeybinds() {
                const all_keybinds = [];
                keybinds.every(function(item){
                    all_keybinds.push(item.name);
                });
                return JSON.stringify(all_keybinds);
            }

            getKeybindData({ name, mode }) {
                var item = myUtils.getObjectIndexInListWithValueAs(keybinds, 'name', name);
                if (item > (0 - 1)) {
                    const keybind = keybinds[item];
                    console.log(keybind);
                    switch (mode) {
                        case 'name':
                            return name;
                        case 'keys (text)':
                            return keybind.keys.join(' ');
                        case 'keys (json)':
                            return JSON.stringify(keybind.keys);
                        case 'JSON':
                            return JSON.stringify(keybind);
                    }
                }
                return '';
            }

            refreshKeybinds() {
                //@ts-expect-error
                Mousetrap.reset();
                bindAllKeybinds();
            }

            createKeybind({ name, keys}) {
                if (myUtils.hasObjectWithValueAs(keybinds, 'name', name)) return;
                keys = keys.split(' ');
                keybinds.push({name: name, keys});
                this.refreshKeybinds();
            }

            isKeybindPressed({ name }) {
                if (myUtils.hasObjectWithValueAs(keybinds, 'name', name)) {
                    const item = myUtils.getObjectIndexInListWithValueAs(keybinds, 'name', name);
                    const pressed = keybinds[item].pressed;
                    if (pressed) {
                        keybinds[item].pressed = false;
                        return pressed;
                    } else {
                        return false;
                    }
                };
                return false; 
            }

            deleteKeybind({ name }) {
                const item = myUtils.getObjectIndexInListWithValueAs(keybinds, 'name', name);
                if (item > (0 - 1)) {
                    //@ts-expect-error
                    keybinds.pop(item);
                }
                this.refreshKeybinds();
            }

            editKeybind({ mode, name, value }) {
                function validateJSON(jsn) {
                    try {
                        JSON.parse(jsn);
                    } catch {
                        return false;
                    }
                    jsn = JSON.parse(jsn);
                    return jsn.name && jsn.keys && typeof jsn.keys == 'object';
                }
                const item =  myUtils.getObjectIndexInListWithValueAs(keybinds, 'name', name);
                switch (mode) {
                    case 'name':
                        if (myUtils.hasObjectWithValueAs(keybinds, 'name', value)) return;
                        keybinds[item].name = value;
                        return;
                    case 'keys':
                        keybinds[item].keys = value.split(' ');
                        return;
                    case 'JSON':
                        if (validateJSON(value)) {
                            keybinds[item] = JSON.parse(value);
                            return;
                        } else return;
                }
            }

            /* start CST1229 */
            whenKeybind(args) {
                args.EVENT = Scratch.Cast.toString(args.EVENT);
                if (events[args.EVENT]) {
                    lastKeybind = args.EVENT;
                    delete events[args.EVENT];
                    return true;
                }
                return false;
            }

            runKeybind (args) {
                events[Scratch.Cast.toString(args.EVENT)] = true;
            }
            /* end */

            latestKey(util) {
                return Scratch.vm.runtime.ioDevices.keyboard.lastKeyPressed;
            }
        }
        Scratch.extensions.register(new KeybindExt());
      })(Scratch);