(function (Scratch) {
    'use strict';
    const menuIconURI = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSLlm77lsYJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiCgkgdmlld0JveD0iLTQxNSAyMTcgMTI4IDEyOCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAtNDE1IDIxNyAxMjggMTI4OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+Cjx0aXRsZT5tdXNpYy1ibG9jay1pY29uPC90aXRsZT4KPHBhdGggc3R5bGU9ImZpbGw6IzEyOTZEQjsiIGQ9Ik0tMzg5LjMsMzI0LjhjLTEzLjksMC0yNS4xLTExLjYtMjUuMS0yNS45YzAtMTQsMTAuOC0yNS41LDI0LjMtMjUuOWMwLjYtMTEsOS41LTE5LjcsMjAuMy0xOS43CgljMS41LDAsMy4xLDAuMiw0LjUsMC41YzYuMy0xMCwxNy4yLTE2LjcsMjkuNi0xNi43YzE5LjQsMCwzNS4xLDE2LjIsMzUuMSwzNi4zYzAsMC45LDAsMS44LTAuMSwyLjdjNy44LDQuNCwxMy4xLDEyLjksMTMuMSwyMi43CgljMCwxNC4zLTExLjIsMjUuOS0yNS4xLDI1LjlMLTM4OS4zLDMyNC44TC0zODkuMywzMjQuOHoiLz4KPHBhdGggc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGQ9Ik0tMzQ1LjQsMzA2LjhjLTEwLjMtNDYuMS04LjQtMzMuMS0wLjYtMzFjNy44LDIuMSwxOS43LTEwLDcuNy04LjFjLTEyLDEuOS0yMi45LTIwLjEtMTguNSw1LjgKCWMzLjYsMjAuOSw1LjcsMjUuNywzLjksMjUuN2MtMC42LTAuMy0xLjMtMC41LTItMC42Yy0xLjMtMC4zLTIuNi0wLjUtNC0wLjVjLTYuNSwwLTEwLjksMy45LTEwLDguN3M2LjksOC43LDEzLjQsOC43CglDLTM0OC45LDMxNS41LTM0NC40LDMxMS44LTM0NS40LDMwNi44TC0zNDUuNCwzMDYuOHoiLz4KPC9zdmc+';
    const vm = Scratch.vm;
    const BlockType = Scratch.BlockType;
    const ArgumentType = Scratch.ArgumentType;
    const formatMessage = Scratch.translate;
    formatMessage.setup({
        zh: {
            name: "懒音乐",
            describe: "从网址播放音乐。",
            loadplay: "直接播放[URL]",
            load: "加载[URL]为[TEXT]",
            play: "播放音乐[MUSIC]",
            playjx: "继续音乐[MUSIC]",
            pause: "暂停音乐[MUSIC]"
        }
    });
    class 懒音乐 {
        constructor(runtime) {
            this.runtime = runtime;
            this.messageQueue = [];
            this.recording = [];
            this.logs = [];
            this.recordingDelay = 1000;
        }
        getInfo() {
            return {
                id: 'lazyAudio',
                color1: '#9C27B0',
                name: formatMessage({ id: 'name', default: 'LazyAudio' }),
                menuIconURI: menuIconURI,
                blocks: [
                    {
                        opcode: 'loadplay',
                        blockType: BlockType.COMMAND,
                        text: formatMessage({ id: 'loadplay', default: 'Play directly from[URL]' }),
                        arguments: {
                            URL: {
                                type: ArgumentType.STRING,
                                defaultValue: 'http://music.163.com/song/media/outer/url?id=504923885.mp3'
                            }
                        }
                    },
                    '---',
                    {
                        opcode: 'load',
                        blockType: BlockType.COMMAND,
                        text: formatMessage({ id: 'load', default: 'Load [URL] as [TEXT]' }),
                        arguments: {
                            URL: {
                                type: ArgumentType.STRING,
                                defaultValue: 'http://music.163.com/song/media/outer/url?id=504923885.mp3'
                            },
                            TEXT: {
                                type: ArgumentType.STRING,
                                menu: 'musics'
                            }
                        }
                    },
                    {
                        opcode: 'play',
                        blockType: BlockType.COMMAND,
                        text: formatMessage({ id: 'play', default: 'Play music[MUSIC]' }),
                        arguments: {
                            MUSIC: {
                                type: ArgumentType.STRING,
                                menu: 'musics'
                            }
                        }
                    },
                    {
                        opcode: 'playjx',
                        blockType: BlockType.COMMAND,
                        text: formatMessage({ id: 'playjx', default: 'Resume music[MUSIC]' }),
                        arguments: {
                            MUSIC: {
                                type: ArgumentType.STRING,
                                menu: 'musics'
                            }
                        }
                    },
                    {
                        opcode: 'pause',
                        blockType: BlockType.COMMAND,
                        text: formatMessage({ id: 'pause', default: 'Pause music[MUSIC]' }),
                        arguments: {
                            MUSIC: {
                                type: ArgumentType.STRING,
                                menu: 'musics'
                            }
                        }
                    },
                ],
                menus: {
                    musics: {
                        acceptReporters: true,
                        items: '_getMusic',
                    },
                },
            };
        }
        //动态菜单
        _getMusic() {
            const vars = vm.runtime.getAllVarNamesOfType('');
            return vars.length == 0 ? [" "] : vars;
        }

        async loadplay({ URL }) {
            if (await Scratch.canFetch(URL))
            {new Audio(URL).play();}
        }

        load({ URL, TEXT }) {
            const vara = vm.runtime.getTargetForStage().lookupVariableByNameAndType(TEXT, '');
            if (!vara) 
            {return;};
            vara.value = URL;
        }

        async play({ MUSIC }) {
            const vara = vm.runtime.getTargetForStage().lookupVariableByNameAndType(MUSIC, '');
            if (await Scratch.canFetch(vara.value))
            {var varb = new Audio(vara.value);}
            vara.value = varb;
            varb.play();
        }
        playjx({ MUSIC }) {
            const vara = vm.runtime.getTargetForStage().lookupVariableByNameAndType(MUSIC, '');
            var varb = vara.value;
            varb.play();
        }
        pause({ MUSIC }) {
            const vara = vm.runtime.getTargetForStage().lookupVariableByNameAndType(MUSIC, '');
            var varb = vara.value;
            varb.pause();
        }
    }
    Scratch.extensions.register(new 懒音乐());
})(Scratch);
