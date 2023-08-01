(function(Scratch) {
    'use strict';
    if (!Scratch.extensions.unsandboxed) throw 'can not load out side unsandboxed mode';

    /* ------- BLOCKS -------- */
    const {BlockType, Cast, ArgumentType} = Scratch;

    class WebRequests {
        /**
         * no need to install runtime as it comes with Scratch var
         */
        constructor() {
            this.instances = {};
        }
        getInfo() {
            return {
                id: 'websocket',
                name: 'WebSocket',
                color1: '#307eff',
                color2: '#2c5eb0',
                blocks: [
                    {
                        opcode: 'newInstance',
                        blockType: BlockType.COMMAND,
                        arguments: {
                            URL: {
                                type: ArgumentType.STRING,
                                defaultValue: 'wss://example.com'
                            }
                        },
                        text: 'connect to [URL]'
                    },
                    '---',
                    {
                        opcode: 'onError',
                        blockType: BlockType.HAT,
                        isEdgeActivated: false,
                        text: 'when connection errors'
                    },
                    {
                        opcode: 'hasErrored',
                        blockType: BlockType.BOOLEAN,
                        text: 'has connection errored?'
                    },
                    '---',
                    {
                        opcode: 'onOpen',
                        blockType: BlockType.HAT,
                        isEdgeActivated: false,
                        text: 'when connection connects'
                    },
                    {
                        opcode: 'isConnected',
                        blockType: BlockType.BOOLEAN,
                        text: 'is connection connected?'
                    },
                    '---',
                    {
                        opcode: 'onMessage',
                        blockType: BlockType.HAT,
                        isEdgeActivated: false,
                        text: 'when message recieved'
                    },
                    {
                        opcode: 'messageReceived',
                        blockType: BlockType.BOOLEAN,
                        text: 'recieved message?'
                    },
                    {
                        opcode: 'messageData',
                        blockType: BlockType.REPORTER,
                        disableMonitor: true,
                        text: 'recieved message data'
                    },
                    {
                        opcode: 'sendMessage',
                        blockType: BlockType.COMMAND,
                        arguments: {
                            PAYLOAD: {
                                type: ArgumentType.STRING,
                                defaultValue: 'hello!'
                            }
                        },
                        text: 'send message [PAYLOAD]'
                    },
                    '---',
                    {
                        opcode: 'onClose',
                        blockType: BlockType.HAT,
                        isEdgeActivated: false,
                        text: 'when connection closes'
                    },
                    {
                        opcode: 'isClosed',
                        blockType: BlockType.BOOLEAN,
                        text: 'is connection closed?'
                    },
                    {
                        opcode: 'closeCode',
                        blockType: BlockType.REPORTER,
                        disableMonitor: true,
                        text: 'closing code'
                    },
                    {
                        opcode: 'closeMessage',
                        blockType: BlockType.REPORTER,
                        disableMonitor: true,
                        text: 'closing message'
                    },
                    {
                        opcode: 'closeWithoutReason',
                        blockType: BlockType.COMMAND,
                        text: 'close connection without reason'
                    },
                    {
                        opcode: 'closeWithCode',
                        blockType: BlockType.COMMAND,
                        arguments: {
                            CODE: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '1000'
                            }
                        },
                        text: 'close connection with code [CODE]'
                    },
                    {
                        opcode: 'closeWithReason',
                        blockType: BlockType.COMMAND,
                        arguments: {
                            CODE: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '1000'
                            },
                            REASON: {
                                type: ArgumentType.STRING,
                                defaultValue: 'connection fulfilled'
                            }
                        },
                        text: 'close connection with reason [REASON] and code [CODE]'
                    }
                ]
            };
        }
        async newInstance(args, utils) {
            let url = Cast.toString(args.URL);
            if (!url.startsWith('ws')) {
                // url doesnt start with a valid connection type 
                // so we jsut assume its formated without it
                if (/^(?!(ws|http)s?:\/\/).*$/si.test(url)) {
                    url = `wss://${url}`;
                } else {
                    if (!url.startsWith('http')) return;
                    url = url
                        .split(':')
                        // @ts-ignore
                        .with(0, url.startsWith('https')
                            ? 'wss'
                            : 'ws')
                        .join(':');
                }
            }
            if (!await Scratch.canFetch(url)) return;

            try {
                // eslint-disable-next-line no-restricted-syntax
                const websocket = new WebSocket(url);
                const instance = {
                    closeMessage: '',
                    closeCode: '',
                    data: '',
                    isOpen: false,
                    isClosed: false,
                    isErrored: false,
                    set gottenMessage(bool) {
                        this.isMessage = bool;
                    },
                    get gottenMessage() {
                        const oldState = this.isMessage;
                        this.isMessage = false;
                        return oldState;
                    },
                    state: 'opening',
                    websocket
                };
                websocket.onopen = e => {
                    instance.state = 'opened';
                    instance.isOpen = true;
                    utils.startHats('websocket_onOpen', null, utils.target);
                };
                websocket.onclose = e => {
                    instance.state = 'closed';
                    instance.isClosed = true;
                    instance.closeMessage = e.reason || '';
                    instance.closeCode = Cast.toString(e.code) || '';
                    utils.startHats('websocket_onClose', null, utils.target);
                };
                websocket.onerror = e => {
                    instance.state = 'errored';
                    instance.isErrored = true;
                    utils.startHats('websocket_onError', null, utils.target);
                };
                websocket.onmessage = e => {
                    instance.data = e.data;
                    instance.gottenMessage = true;
                    utils.startHats('websocket_onMessage', null, utils.target);
                };
                this.instances[utils.target.id] = instance;
            } catch (err) {
                console.warn('couldnt create websocket instance because', err);
            }
        }
        isConnected(_, utils) {
            const instance = this.instances[utils.target.id];
            if (!instance) return '';
            return instance.isOpen;
        }
        messageReceived(_, utils) {
            const instance = this.instances[utils.target.id];
            if (!instance) return '';
            return instance.gottenMessage;
        }
        messageData(_, utils) {
            const instance = this.instances[utils.target.id];
            if (!instance) return '';
            return instance.data;
        }
        isClosed(_, utils) {
            const instance = this.instances[utils.target.id];
            if (!instance) return '';
            return instance.isClosed;
        }
        closeCode(_, utils) {
            const instance = this.instances[utils.target.id];
            if (!instance) return '';
            return instance.closeCode;
        }
        closeMessage(_, utils) {
            const instance = this.instances[utils.target.id];
            if (!instance) return '';
            return instance.closeMessage;
        }
        hasErrored(_, utils) {
            const instance = this.instances[utils.target.id];
            if (!instance) return '';
            return instance.isErrored;
        }
        sendMessage(args, utils) {
            const PAYLOAD = Cast.toString(args.PAYLOAD);

            const instance = this.instances[utils.target.id];
            if (!instance) return '';
            instance.websocket.send(PAYLOAD);
        }
        closeWithoutReason(_, utils) {
            const instance = this.instances[utils.target.id];
            if (!instance) return '';
            instance.websocket.close();
        }
        closeWithCode(args, utils) {
            const CODE = Cast.toString(args.CODE);

            const instance = this.instances[utils.target.id];
            if (!instance) return '';
            instance.websocket.close(CODE);
        }
        closeWithReason(args, utils) {
            const CODE = Cast.toString(args.CODE);
            const REASON = Cast.toString(args.REASON);

            const instance = this.instances[utils.target.id];
            if (!instance) return '';
            instance.websocket.close(CODE, REASON);
        }
    }

    const instance = new WebRequests();
    // @ts-ignore
    Scratch.extensions.register(instance);
// @ts-ignore
})(Scratch);