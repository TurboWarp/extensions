// Name: 
// ID: 40codeMediaSessApi
// Description: The SC block form of the Media Session API , allows SC works to basically use the browser Media Session ability.
// By: jexjws
// License: MIT


(function (Scratch) {
    'use strict';
    if (!Scratch.extensions.unsandboxed) {
        throw new Error('This extension must run unsandboxed./此拓展需要以非沙盒模式运行。');
    }
    class MyExtension {
        /**
         * 判断 mediaSession 是否可用
         * @returns {boolean}
         */
        canIUse() {
            return ("mediaSession" in navigator)
        }
        mediaSession_reset() {
            if (!this.canIUse()) { return }
            navigator.mediaSession.metadata = new MediaMetadata()
            navigator.mediaSession.setPositionState(null);
        }


        actived_actionhandler = []
        actions = ["previoustrack", "nexttrack", "stop", 'seekbackward', 'seekforward', 'play', 'pause']
        /**
         * mediaSession ActionHandler 维护者
         * @param {String} mode 要对事件做什么
         * @param {String} action 对哪个事件做
         * @returns {any}
         */
        actionHandlerMan(mode, action = "") {
            if (!this.canIUse()) { return }
            action = String(action)
            //console.log("actionHandlerMan",mode,action)
            const setActionHandler = (...args) => navigator.mediaSession.setActionHandler(...args);
            try {
                switch (mode) {
                    case "reset":
                        this.actions.forEach((item) => (setActionHandler(item, null)))
                        this.actived_actionhandler = []
                        break;
                    case "on":
                        if (!this.actived_actionhandler.includes(action)) {
                            setActionHandler(action, () => (Scratch.vm.runtime.startHats('40codeMediaSessApi_v1_actionhandler', { action: action })))
                            this.actived_actionhandler.push(action)
                        }
                        break;
                    case "off":
                        if (this.actived_actionhandler.includes(action)) {
                            setActionHandler(action, null)
                            this.actived_actionhandler = this.actived_actionhandler.filter((item) => !(item === action))
                        }
                        break;
                    default:
                        break;
                }
            } catch (error) {
                console.error(error)
            }
        }

        constructor(runtime) {
            Scratch.translate.setup({
                "zh-cn": {
                    "40code.MediaSessApi.v1.canIUse": 'mediaSession 是否可用',
                    "40code.MediaSessApi.v1.set": "设定当前播放媒体 [key] 为 [value]",
                    "40code.MediaSessApi.v1.set.menus.title": "标题",
                    "40code.MediaSessApi.v1.set.menus.artist": "艺术家名称",
                    "40code.MediaSessApi.v1.set.menus.album": "专辑名称",
                    "40code.MediaSessApi.v1.set_artwork": "设定当前播放媒体 封面图链接 为 [value]",
                    "40code.MediaSessApi.v1.set_position": "设定当前播放进度：总时长：[duration]秒、当前播放到：[position]秒、播放速率：[playbackRate]倍",
                    "40code.MediaSessApi.v1.unset": "清除所有设定",

                    "40code.MediaSessApi.v1.set_actionhandler": "[on_off] mediaSession [action]事件接收帽子块",
                    "40code.MediaSessApi.v1.set_actionhandler.on": "启用",
                    "40code.MediaSessApi.v1.set_actionhandler.off": "禁用",
                    "40code.MediaSessApi.v1.set_actionhandler_status": "已启用的 mediaSession 事件接收帽子块",
                    "40code.MediaSessApi.v1.set_actionhandler_reset": "禁用所有 mediaSession 事件接收帽子块",
                    "40code.MediaSessApi.v1.actionhandler": "用户控制事件[action]发生时",

                    "40code.MediaSessApi.v1.actionhandler.menus.nexttrack": "下一首",
                    "40code.MediaSessApi.v1.actionhandler.menus.previoustrack": "上一首",
                    "40code.MediaSessApi.v1.actionhandler.menus.stop": "停止",
                    "40code.MediaSessApi.v1.actionhandler.menus.play": "播放",
                    "40code.MediaSessApi.v1.actionhandler.menus.pause": "暂停",
                    "40code.MediaSessApi.v1.actionhandler.menus.seekbackward": "快退",
                    "40code.MediaSessApi.v1.actionhandler.menus.seekforward": "快进",

                    "40code.MediaSessApi.v1.compatibility": "兼容性：使用播放无声音频的<audio>元素以显示 Media Session：[on_off]"
                },
                en: {
                    "40code.MediaSessApi.v1.canIUse": 'Is mediaSession available',
                    "40code.MediaSessApi.v1.set": "Set the current playing media [key] to [value]",
                    "40code.MediaSessApi.v1.set.menus.title": "Title",
                    "40code.MediaSessApi.v1.set.menus.artist": "Artist name",
                    "40code.MediaSessApi.v1.set.menus.album": "Album name",
                    "40code.MediaSessApi.v1.set_artwork": "Set the current playing media cover image link to [value]",
                    "40code.MediaSessApi.v1.set_position": "Set the current playback progress: total duration:[duration]seconds, current playback to: [position]seconds, playback rate: [playbackRate] times",
                    "40code.MediaSessApi.v1.unset": "Clear all Set",

                    "40code.MediaSessApi.v1.set_actionhandler": "[on_off] mediaSession [action] event receiving hat block",
                    "40code.MediaSessApi.v1.set_actionhandler.on": "Enable",
                    "40code.MediaSessApi.v1.set_actionhandler.off": "Disable",
                    "40code.MediaSessApi.v1.set_actionhandler_status": "Enabled mediaSession event receiving hat block",
                    "40code.MediaSessApi.v1.set_actionhandler_reset": "Disable all mediaSession event receiving hat blocks",
                    "40code.MediaSessApi.v1.actionhandler": "When the user control event [action] occurs",

                    "40code.MediaSessApi.v1.actionhandler.menus.nexttrack": "Next track",
                    "40code.MediaSessApi.v1.actionhandler.menus.previoustrack": "Previous track",
                    "40code.MediaSessApi.v1.actionhandler.menus.stop": "Stop",
                    "40code.MediaSessApi.v1.actionhandler.menus.play": "Play",
                    "40code.MediaSessApi.v1.actionhandler.menus.pause": "Pause",
                    "40code.MediaSessApi.v1.actionhandler.menus.seekbackward": "Rewind",
                    "40code.MediaSessApi.v1.actionhandler.menus.seekforward": "Fast forward",

                    "40code.MediaSessApi.v1.compatibility": "Compatibility: Use the <audio> element that plays silent audio to display the Media Session: [on_off]"
                },
            })

            this.mediaSession_reset()
            this.actionHandlerMan("reset")
        }

        getInfo() {
            return {
                id: "40codeMediaSessApi",
                name: "Media Session",
                color1: '#9334e6',
                blocks: [
                    {
                        opcode: 'v1_canIUse',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: Scratch.translate({ id: "40code.MediaSessApi.v1.canIUse" })
                    },
                    {
                        opcode: 'v1_set',
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate({ id: "40code.MediaSessApi.v1.set" }),
                        arguments: {
                            key: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'metadatas'
                            },
                            value: {
                                type: Scratch.ArgumentType.STRING
                            }
                        }
                    },
                    {
                        opcode: 'v1_set_artwork',
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate({ id: "40code.MediaSessApi.v1.set_artwork" }),
                        arguments: {
                            value: {
                                type: Scratch.ArgumentType.STRING
                            }
                        }
                    },
                    {
                        opcode: 'v1_set_position',
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate({ id: "40code.MediaSessApi.v1.set_position" }),
                        arguments: {
                            duration: {
                                type: Scratch.ArgumentType.NUMBER
                            },
                            position: {
                                type: Scratch.ArgumentType.NUMBER
                            },
                            playbackRate: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1
                            }
                        }
                    },
                    {
                        opcode: 'v1_unset',
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate({ id: "40code.MediaSessApi.v1.unset" })
                    },
                    "---",
                    {
                        opcode: 'v1_set_actionhandler_status',
                        blockType: Scratch.BlockType.REPORTER,
                        text: Scratch.translate({ id: "40code.MediaSessApi.v1.set_actionhandler_status" })
                    },
                    {
                        opcode: 'v1_set_actionhandler',
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate({ id: "40code.MediaSessApi.v1.set_actionhandler" }),
                        arguments: {
                            action: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'actions'
                            },
                            on_off: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'on_off'
                            }
                        }
                    },
                    {
                        opcode: 'v1_set_actionhandler_reset',
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate({ id: "40code.MediaSessApi.v1.set_actionhandler_reset" })
                    },
                    {
                        blockType: Scratch.BlockType.EVENT,
                        opcode: 'v1_actionhandler',
                        text: Scratch.translate({ id: "40code.MediaSessApi.v1.actionhandler" }),
                        isEdgeActivated: false,
                        arguments: {
                            action: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'actions'
                            }
                        }
                    }, "---",
                    {
                        opcode: 'v1_compatibility',
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate({ id: "40code.MediaSessApi.v1.compatibility" }),
                        arguments: {
                            on_off: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'on_off'
                            }
                        }
                    }
                ],
                menus: {
                    metadatas: {
                        acceptReporters: false,
                        items: [
                            { text: Scratch.translate({ id: "40code.MediaSessApi.v1.set.menus.title" }), value: 'title' },
                            { text: Scratch.translate({ id: "40code.MediaSessApi.v1.set.menus.artist" }), value: 'artist' },
                            { text: Scratch.translate({ id: "40code.MediaSessApi.v1.set.menus.album" }), value: 'album' }
                        ]
                    },
                    actions: {
                        acceptReporters: false,
                        items: (() => (
                            this.actions.map(
                                (item) => ({
                                    text: Scratch.translate({ id: String("40code.MediaSessApi.v1.actionhandler.menus." + item) }),
                                    value: String(item)
                                }))
                        ))()
                    },
                    on_off: {
                        acceptReporters: false,
                        items: [
                            { text: Scratch.translate({ id: "40code.MediaSessApi.v1.set_actionhandler.on" }), value: 'on' },
                            { text: Scratch.translate({ id: "40code.MediaSessApi.v1.set_actionhandler.off" }), value: 'off' }
                        ]
                    }
                }
            };
        }
        v1_canIUse() {
            return this.canIUse();
        }
        v1_set(args) {
            if (!this.canIUse()) { return }
            navigator.mediaSession.metadata[args.key] = args.value
        }
        v1_set_artwork(args) {
            if (!this.canIUse()) { return }
            navigator.mediaSession.metadata["artwork"] = [{ src: args.value }]
        }
        v1_set_position(args) {
            if (!this.canIUse()) { return }
            try {
                navigator.mediaSession.setPositionState({
                    duration: args.duration,
                    playbackRate: args.playbackRate,
                    position: args.position,
                })
            } catch (error) {
                console.error(error)
                return String(error)
            }
        }
        v1_unset() {
            this.mediaSession_reset()
        }
        v1_set_actionhandler_status() {
            return JSON.stringify(this.actived_actionhandler)
        }
        v1_set_actionhandler(args) {
            this.actionHandlerMan(args.on_off, args.action)
        }
        v1_set_actionhandler_reset() {
            this.actionHandlerMan("reset")
        }
        compat_audioElement = null
        v1_compatibility(args) {
            switch (args.on_off) {
                case "on":
                    if (this.compat_audioElement != null) {
                        break
                    }
                    this.compat_audioElement = document.createElement('audio');
                    this.compat_audioElement.src = 'https://extensions.turbowarp.org/10sec_silent_audio.opus';
                    this.compat_audioElement.loop = true;
                    this.compat_audioElement.autoplay = true;
                    document.body.appendChild(this.compat_audioElement);
                    break;
                case "off":
                    if (this.compat_audioElement == null) {
                        break;
                    }
                    this.compat_audioElement.pause();
                    document.body.removeChild(this.compat_audioElement);
                    this.compat_audioElement = null
                    break;
                default:
                    break;
            }
        }
    }
    Scratch.extensions.register(new MyExtension());
})(Scratch);