// Name: WebSockets+
// ID: lemonWebSocketsPlus
// Description: Connect to more than one WebSockets.
// By: Cheddarphanie <https://scratch.mit.edu/users/Cheddarphanie/>
// License: Apache-2.0

(function(Scratch) {
    'use strict';

    if(!Scratch.extensions.unsandboxed) {
        throw new Error('The WebSockets+ Extension must run unsandboxed.')
    }

    const vm = Scratch.vm
    const extManager = vm.extensionManager
    const runtime = vm.runtime
    const Cast = Scratch.Cast

    const regenReporters = ["lemonWebSocketsPlus_socketMessage"]

    if(Scratch.gui) Scratch.gui.getBlockly().then(SB => {
        const ogCheck = SB.scratchBlocksUtils.isShadowArgumentReporter
        SB.scratchBlocksUtils.isShadowArgumentReporter = function(block) {
            const result = ogCheck(block)
            if(result) return true
            return block.isShadow() && regenReporters.includes(block.type)
        }
    })

    const createLabel = txt => {
        return {
            blockType: Scratch.BlockType.LABEL,
            text: txt
        }
    }

    class WebsocketsPlusExt {
        constructor() {
            this.debugging = false

            this.sockets = {}

            this.lastMessages = {}

            this.socketStatuses = {}

            this.socketCloseCodes = {}

            this.socketCloseReasons = {}

            this.fetchables = {}

            this.WebSocketStates = {
                0: 'CONNECTING',
                1: 'OPEN',
                2: 'CLOSING',
                3: 'CLOSED'
            }
            /**
             * 
             * @param {string} socket 
             * @returns {Function}
             */
            this.listener = function(socket='') {
                return function({ data }) {
                    runtime.startHats('lemonWebSocketsPlus_socketMessageReceived', {
                        SOCKET: socket
                    }).forEach(thread => {
                        thread.socketMessage = data
                    })
                }
            }
        }
        getInfo() {
            return {
                id: 'lemonWebSocketsPlus',
                name: Scratch.translate('WebSockets+'),
                color1: "#307eff",
                color2: "#2c5eb0",
                blocks: [
                    {
                        func: 'toggleDebugging',
                        blockType: Scratch.BlockType.BUTTON,
                        text: Scratch.translate('Toggle Debugging')
                    },

                    createLabel('Variables'),

                    {
                        opcode: 'websockets',
                        blockType: Scratch.BlockType.REPORTER,
                        text: Scratch.translate('websockets')
                    },
                    {
                        opcode: 'socketState',
                        blockType: Scratch.BlockType.REPORTER,
                        text: Scratch.translate('state of socket [SOCKET]'),
                        disableMonitor: true,
                        arguments: {
                            SOCKET: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'socket'
                            }
                        }
                    },
                    {
                        opcode: 'socketLastMessage',
                        blockType: Scratch.BlockType.REPORTER,
                        text: Scratch.translate('last message received from socket [SOCKET]'),
                        disableMonitor: true,
                        arguments: {
                            SOCKET: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'socket'
                            }
                        }
                    },
                    {
                        opcode: 'socketCloseReason',
                        blockType: Scratch.BlockType.REPORTER,
                        text: Scratch.translate('reason of socket [SOCKET] closing'),
                        disableMonitor: true,
                        arguments: {
                            SOCKET: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'socket'
                            }
                        }
                    },
                    {
                        opcode: 'socketCloseCode',
                        blockType: Scratch.BlockType.REPORTER,
                        text: Scratch.translate('code of socket [SOCKET] closing'),
                        disableMonitor: true,
                        arguments: {
                            SOCKET: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'socket'
                            }
                        }
                    },

                    '---',
                    
                    createLabel(Scratch.translate('Blocks')),

                    {
                        opcode: 'connect',
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate('connect to [URL] with id [ID]'),
                        arguments: {
                            URL: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'wss://echo.websocket.org/'
                            },
                            ID: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'socket'
                            }
                        }
                    },
                    {
                        opcode: 'disconnect',
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate('close connection with socket [ID] with code [C] and reason [R]'),
                        arguments: {
                            ID: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'socket'
                            },
                            C: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 1000
                            },
                            R: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'fulfilled'
                            }
                        }
                    },
                    {
                        opcode: 'sendMessage',
                        blockType: Scratch.BlockType.COMMAND,
                        text: Scratch.translate('send message [MESSAGE] to socket [SOCKET]'),
                        arguments: {
                            MESSAGE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: Scratch.translate('Hello :)')
                            },
                            SOCKET: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'socket'
                            }
                        }
                    },

                    '---',

                    createLabel(Scratch.translate('Booleans')),

                    {
                        opcode: 'socketExists',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: Scratch.translate('socket [SOCKET] exists?'),
                        disableMonitor: true,
                        arguments: {
                            SOCKET: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'socket'
                            }
                        }
                    },
                    {
                        opcode: 'socketConnected',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: Scratch.translate('connected to socket [SOCKET]?'),
                        disableMonitor: true,
                        arguments: {
                            SOCKET: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'socket'
                            }
                        }
                    },
                    {
                        opcode: 'socketClosed',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: Scratch.translate('closed connection with [SOCKET]?'),
                        disableMonitor: true,
                        arguments: {
                            SOCKET: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'socket'
                            }
                        }
                    },

                    '---',

                    createLabel(Scratch.translate('Events')),

                    {
                        opcode: 'socketMessageReceived',
                        blockType: Scratch.BlockType.EVENT,
                        text: Scratch.translate('when i receive a message from [SOCKET] [MESSAGE]'),
                        isEdgeActivated: false,
                        hideFromPalette: true,
                        arguments: {
                            SOCKET: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'socketMenu'
                            },
                            MESSAGE: {}
                        }
                    },
                    {
                        opcode: 'socketMessage',
                        blockType: Scratch.BlockType.REPORTER,
                        text: Scratch.translate('message'),
                        hideFromPalette: true,
                        disableMonitor: true
                    },
                    {
                        opcode: 'socketOpensConnection',
                        blockType: Scratch.BlockType.EVENT,
                        text: Scratch.translate('when connection with [SOCKET] opens'),
                        isEdgeActivated: false,
                        arguments: {
                            SOCKET: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'socketMenu'
                            }
                        }
                    },
                    {
                        blockType: Scratch.BlockType.XML,
                        xml: `
                            <block type="lemonWebSocketsPlus_socketMessageReceived">
                                <value name="MESSAGE"><shadow type="lemonWebSocketsPlus_socketMessage"></shadow></value>
                            </block>
                        `
                    },
                    {
                        opcode: 'socketErrored',
                        blockType: Scratch.BlockType.EVENT,
                        text: Scratch.translate('when socket [SOCKET] errors'),
                        isEdgeActivated: false,
                        arguments: {
                            SOCKET: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'socketMenu'
                            },
                        }
                    },
                    {
                        opcode: 'socketClosedConnection',
                        blockType: Scratch.BlockType.EVENT,
                        text: Scratch.translate('when connection with [SOCKET] closes'),
                        isEdgeActivated: false,
                        arguments: {
                            SOCKET: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'socketMenu'
                            },
                        }
                    },
                ],
                menus: {
                    socketMenu: {
                        items: 'getSockets',
                    }
                }
            }
        }

        toggleDebugging() {
            this.debugging = !this.debugging
            window.alert(Scratch.translate('Toggled Debugging! :)'))
        }

        async connect({ ID, URL }) {
            const id = Cast.toString(ID)
            const url = Cast.toString(URL)

            if(this.sockets[id] instanceof WebSocket) {
                try {
                    this.sockets[id].removeEventListener('message', this.listener(id))
                    this.sockets[id].removeEventListener('error', () => {
                        runtime.startHats('lemonWebSocketsPlus_socketErrored', {
                            SOCKET: id
                        })
                    })
                    this.sockets[id].removeEventListener('message', ({data}) => {
                        this.lastMessages[id] = data
                    })
                    this.sockets[id].removeEventListener('close', ({reason, code}) => {
                        runtime.startHats('lemonWebSocketsPlus_socketClosedConnection', {
                            SOCKET: id
                        })
                        this.socketCloseReasons[id] = reason
                        this.socketCloseCodes[id] = code
                    })
                    this.sockets[id].removeEventListener('open', () => {
                        runtime.startHats('lemonWebSocketsPlus_socketOpensConnection', {
                            SOCKET: id
                        })
                    })
                    this.sockets[id].close()
                } catch(err) {
                    console.error(err)
                }
            }

            if(this.debugging) console.groupCollapsed('WebSockets+ Connecting')

            if(this.debugging) console.log(`[WebSockets+] Attempting to connect to '${url}'..`)
            
            if(!this.fetchables[url]) this.fetchables[url] = await Scratch.canFetch(url)

            if(!this.fetchables[url]) {
                this.socketStatuses[id] = 'failed to connect'
                console.log(`[Websockets+] Connection to '${url}' denied!`)
                if(this.debugging) console.groupEnd()
                return
            }

            try {

                this.sockets[id] = new WebSocket(url)
                this.socketStatuses[id] = 'connected'
                this.socketCloseCodes[id] = 0
                this.socketCloseReasons[id] = ''

                /**
                 * @type {WebSocket}
                 */
                const socket = this.sockets[id]

                socket.addEventListener('message', this.listener(id))
                socket.addEventListener('error', () => {
                    runtime.startHats('lemonWebSocketsPlus_socketErrored', {
                        SOCKET: id
                    })
                })
                socket.addEventListener('message', ({data}) => {
                    this.lastMessages[id] = data
                })
                socket.addEventListener('close', ({reason, code}) => {
                    runtime.startHats('lemonWebSocketsPlus_socketClosedConnection', {
                        SOCKET: id
                    })
                    this.socketCloseReasons[id] = reason
                    this.socketCloseCodes[id] = code
                })
                socket.addEventListener('open', () => {
                    runtime.startHats('lemonWebSocketsPlus_socketOpensConnection', {
                        SOCKET: id
                    })
                })

                extManager.refreshBlocks('lemonWebSocketsPlus')
                vm.refreshWorkspace()

                if(this.debugging) console.log(`[WebSockets+] Successfully connected to '${url}'.`)
            } catch(err) {
                console.error(err)
                this.socketStatuses[id] = 'failed to connect'
            }

            if(this.debugging) console.groupEnd()
        }

        disconnect({ ID, C, R }) {
            const id = Cast.toString(ID)
            const Code = Cast.toNumber(C)
            const Reason = Cast.toString(R)

            if(this.debugging) console.groupCollapsed('WebSockets+ Closing Connection')

            if(this.debugging) console.log(`[WebSockets+] Attemping to close connection with '${id}'..`)

            const socket = this.sockets[id]

            if(socket instanceof WebSocket) {

                socket.removeEventListener('message', this.listener(id))
                socket.removeEventListener('error', () => {
                    runtime.startHats('lemonWebSocketsPlus_socketErrored', {
                        SOCKET: id
                    })
                })
                socket.removeEventListener('message', ({data}) => {
                    this.lastMessages[id] = data
                })
                socket.removeEventListener('close', ({reason, code}) => {
                    runtime.startHats('lemonWebSocketsPlus_socketClosedConnection', {
                        SOCKET: id
                    })
                    this.socketCloseReasons[id] = reason
                    this.socketCloseCodes[id] = code
                })
                socket.removeEventListener('open', () => {
                    runtime.startHats('lemonWebSocketsPlus_socketOpensConnection', {
                        SOCKET: id
                    })
                })

                socket.close(Code, Reason)

                delete this.sockets[id]
                this.socketCloseCodes[id] = Code
                this.socketCloseReasons[id] = Reason
                this.socketStatuses[id] = 'closed'

                extManager.refreshBlocks('lemonWebSocketsPlus')
                vm.refreshWorkspace()

                if(this.debugging) console.log(`[WebSockets+] Successfully closed connection with '${id}'!`)
            } else {
                if(this.debugging) console.warn(`[WebSockets+] WebSocket '${id}' is not a WebSocket!`)
            }

            if(this.debugging) console.groupEnd()

            return
        }
        
        sendMessage({ MESSAGE, SOCKET }) {
            if(this.debugging) {
                console.groupCollapsed('WebSockets+ Message Sending')

                console.log(`[WebSockets+] Attempting to send a message to '${SOCKET}'..`)
            }
            SOCKET = Cast.toString(SOCKET)
            const socket = this.sockets[SOCKET]

            if(!socket) {
                if(this.debugging) {
                    console.warn(`[WebSockets+] '${SOCKET}' doesn't exist!`)
                    console.groupEnd()
                }
                return
            }

            if(socket instanceof WebSocket) {
                try {
                    socket.send(MESSAGE)
                    if(this.debugging) console.log(`[WebSockets+] Successfully sent a message to '${SOCKET}'!`)
                } catch(err) {
                    console.error(err)
                    if(this.debugging) console.groupEnd()
                }
            } else {
                if(this.debugging) console.warn(`[WebSockets+] '${SOCKET}' isn't a WebSocket!`)
            }
            if(this.debugging) console.groupEnd()
        }

        socketExists({ SOCKET }) {
            return Cast.toBoolean(this.sockets[Cast.toString(SOCKET)])
        }

        socketConnected({ SOCKET }) {
            const socket = this.sockets[Cast.toString(SOCKET)]

            if(socket instanceof WebSocket) {
                return socket.readyState === WebSocket.OPEN
            }
            
            return false
        }

        socketClosed({ SOCKET }) {
            const socket = this.sockets[Cast.toString(SOCKET)]

            if(socket instanceof WebSocket) {
                return socket.readyState === WebSocket.CLOSED
            }
            
            return true
        }

        websockets() {
            return JSON.stringify(Object.keys(this.sockets))
        }

        socketState({ SOCKET }) {
            const socket = this.sockets[Cast.toString(SOCKET)]
            if(socket instanceof WebSocket) {
                return this.WebSocketStates[socket.readyState] ?? 'UNKNOWN'
            }
            return 'UNKNOWN'
        }

        socketLastMessage({ SOCKET }) {
            const socket = this.lastMessages[Cast.toString(SOCKET)]
            return socket ?? ''
        }

        socketCloseReason({ SOCKET }) {
            return this.socketCloseReasons[Cast.toString(SOCKET)] ?? ''
        }

        socketCloseCode({ SOCKET }) {
            return this.socketCloseCodes[Cast.toString(SOCKET)] ?? 0
        }

        getSockets() {
            const Sockets = Object.keys(this.sockets)
            return Sockets.length > 0 ? Sockets.map((socket) => {
                return {
                    value: socket,
                    text: socket
                }
            }) : [{
                value: Scratch.translate('None yet :('),
                text: Scratch.translate('None yet :(')
            }]
        }

        /**
         * @param {{}} args 
         * @param {VM.BlockUtility} util 
         */
        socketMessage(args, util) {
            return util.thread.socketMessage ?? ''
        }

        socketOpensConnection() {
            return
        }

        socketMessageReceived() {
            return
        }
        
        socketErrored() {
            return
        }

        socketClosedConnection() {
            return
        }
    }

    Scratch.extensions.register(new WebsocketsPlusExt())
})(Scratch)
