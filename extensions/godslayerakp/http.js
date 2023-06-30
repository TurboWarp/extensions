(function(Scratch) {
    'use strict';
    if (!Scratch.extensions.unsandboxed) throw 'can not load out side unsandboxed mode';

    const {vm} = Scratch;
    const {runtime} = vm;

    const extensionId = 'gsaHTTPRequests';

    // the funny class to make event blocks look better
    class Events {
        constructor() {
            this.events = {};
            this.blocks = {};
        }

        /**
         * adds a event name listner for a block
         * @param {string} name name of the event
         * @param {string} [block] a block to run when trigered
         */
        add(name, block) {
            if (block) {
                if (!this.blocks[name]) this.blocks[name] = [];
                this.blocks[name].push(block);
            }
        }

        /**
         * activate an event
         * @param {string} name name of the event
         */
        activate(name) {
            this.events[name] = true;
            if (this.blocks[name]) {
                for (const block of this.blocks[name]) {
                    runtime.startHats(block);
                }
            }
        }
    }
    const createBlockId = block => `${extensionId}_${block}`;

    /* ------- BLOCKS -------- */
    const {BlockType, Cast, ArgumentType} = Scratch;

    class WebRequests {
        static get defaultRequest() {
            const defaultRequest = {
                events: new Events(),
                get mimeType() {
                    return this.options.headers['Content-Type'];
                },
                set mimeType(value) {
                    this.options.headers['Content-Type'] = value;
                },
                set method(val) {
                    this.options.method = val;
                    // remove body on get requests
                    if (val === 'GET') {
                        delete this.options.body;
                    }
                },
                get method() {
                    return this.options.method;
                },
                options: {
                    headers: {
                        'Content-Type': 'text/plain'
                    },
                    method: 'GET'
                },
                set body(val) {
                    if (this.method === 'GET') return;
                    this.options.body = val;
                },
                get body() {
                    return this.options.body;
                },
                end: false,
                fail: false,
                success: false
            };

            defaultRequest.events.add('reqSuccess', createBlockId('onResponse'));
            defaultRequest.events.add('reqFail', createBlockId('onFail'));

            return defaultRequest;
        }
        static get defualtResponse() {
            const defualtResponse = {
                text: '',
                status: '',
                statusText: '',
                headers: new Headers(),
                error: '',
                url: ''
            };

            return defualtResponse;
        }

        /**
         * no need to install runtime as it comes with Scratch var
         */
        constructor() {
            this.clearAll();
        }
        getInfo() {
            return {
                id: extensionId,
                name: 'http/https',
                color1: '#307eff',
                color2: '#2c5eb0',
                blocks: [
                    {
                        opcode: 'clearAll',
                        blockType: BlockType.COMMAND,
                        text: 'clear current data'
                    },
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: "response"
                    },
                    {
                        opcode: 'resData',
                        blockType: BlockType.REPORTER,
                        text: 'response'
                    },
                    {
                        opcode: 'error',
                        blockType: BlockType.REPORTER,
                        text: 'error'
                    },
                    {
                        opcode: 'status',
                        blockType: BlockType.REPORTER,
                        text: 'status'
                    },
                    {
                        opcode: 'statusText',
                        blockType: BlockType.REPORTER,
                        text: 'status text'
                    },
                    "---",
                    {
                        opcode: 'getHeaderJSON',
                        blockType: BlockType.REPORTER,
                        disableMonitor: true,
                        text: 'get headers as json'
                    },
                    {
                        opcode: 'getHeaderValue',
                        blockType: BlockType.REPORTER,
                        arguments: {
                            name: {
                                type: ArgumentType.STRING
                            }
                        },
                        text: 'get [name] from header'
                    },
                    "---",
                    {
                        opcode: 'requestComplete',
                        blockType: BlockType.BOOLEAN,
                        text: 'site responded?'
                    },
                    {
                        opcode: 'requestFail',
                        blockType: BlockType.BOOLEAN,
                        text: 'request failed?'
                    },
                    {
                        opcode: 'requestSuccess',
                        blockType: BlockType.BOOLEAN,
                        text: 'request succeeded?'
                    },
                    "---",
                    {
                        opcode: 'onResponse',
                        blockType: BlockType.HAT,
                        isEdgeActivated: false,
                        text: 'when a site responds'
                    },
                    {
                        opcode: 'onFail',
                        blockType: BlockType.HAT,
                        isEdgeActivated: false,
                        text: 'when a request fails'
                    },
                    {
                        blockType: Scratch.BlockType.LABEL,
                        text: "request"
                    },
                    {
                        opcode: 'setMimeType',
                        blockType: BlockType.COMMAND,
                        arguments: {
                            type: {
                                type: ArgumentType.STRING,
                                menu: 'mimeType',
                                defaultValue: this.request.mimeType
                            }
                        },
                        text: 'set content type to [type]'
                    },
                    {
                        opcode: 'setRequestmethod',
                        blockType: BlockType.COMMAND,
                        arguments: {
                            method: {
                                type: ArgumentType.STRING,
                                menu: 'method',
                                defaultValue: this.request.method
                            }
                        },
                        text: 'set request method to [method]'
                    },
                    {
                        opcode: 'setHeaderData',
                        blockType: BlockType.COMMAND,
                        arguments: {
                            name: {
                                type: ArgumentType.STRING,
                                defaultValue: 'Content-Type'
                            },
                            value: {
                                type: ArgumentType.STRING,
                                defaultValue: this.request.mimeType
                            }
                        },
                        text: 'in header set [name] to [value]'
                    },
                    {
                        opcode: 'setHeaderJSON',
                        blockType: BlockType.COMMAND,
                        arguments: {
                            json: {
                                type: ArgumentType.STRING,
                                defaultValue: `{"Content-Type": "${this.request.mimeType}"}`
                            }
                        },
                        text: 'set headers to json [json]'
                    },
                    {
                        opcode: 'setBody',
                        blockType: BlockType.COMMAND,
                        arguments: {
                            text: {
                                type: ArgumentType.STRING
                            }
                        },
                        text: 'set request body to [text]'
                    },
                    {
                        opcode: 'sendRequest',
                        blockType: BlockType.COMMAND,
                        arguments: {
                            url: {
                                type: ArgumentType.STRING,
                                defaultValue: 'https://dummyurl.com'
                            }
                        },
                        text: 'send request to [url]'
                    }
                ],
                menus: {
                    method: {
                        items: [
                            'GET',
                            'POST',
                            'PUT',
                            'PATCH',
                            'DELETE',
                            'HEAD',
                            'OPTIONS'
                        ],
                        acceptReporters: true
                    },
                    mimeType: {
                        items: [
                            "application/javascript",
                            "application/ogg",
                            "application/pdf",
                            "application/json",
                            "application/ld+json",
                            "application/xml",
                            "application/zip",
                            "audio/mpeg",
                            "image/gif",
                            "image/jpeg",
                            "image/png",
                            "image/tiff",
                            "image/x-icon",
                            "image/svg+xml",
                            "text/css",
                            "text/csv",
                            "text/html",
                            "text/plain",
                            "text/xml",
                            "video/mpeg",
                            "video/mp4",
                            "video/x-ms-wmv",
                            "video/x-msvideo",
                            "video/x-flv",
                            "video/webm"
                        ],
                        acceptReporters: true
                    },
                    jsTypes: {
                        items: [
                            'string',
                            'number',
                            'boolean',
                            'object'
                        ],
                        acceptReporters: true
                    }
                }
            };
        }

        /* ------ RESETING ------- */

        clearAll() {
            this.request = WebRequests.defaultRequest;
            this.response = WebRequests.defualtResponse;
        }

        /* ------- DATA READING -------- */

        resData() {
            return this.response.text;
        }

        error() {
            return this.response.error;
        }

        status() {
            return this.response.status;
        }

        requestComplete() {
            return this.request.end;
        }

        requestFail() {
            return this.request.fail;
        }

        requestSuccess() {
            return this.request.success;
        }

        statusText() {
            return this.response.statusText;
        }

        getHeaderValue(args) {
            const name = Cast.toString(args.name);
            return this.response.get(name);
        }

        getHeaderJSON() {
            const object = {};
            for (const entry of this.response.headers.entries()) {
                object[entry[0]] = entry[1];
            }
            return JSON.stringify(object);
        }

        /* -------- EVENTS -------- */

        onResponse() {
            // filer olo
            return false;
        }

        onFail() {
            // filer olo
            return false;
        }

        /* -------- CONTROL --------- */

        setMimeType(args) {
            const type = Cast.toString(args.type);
            this.request.mimeType = type;
        }

        setRequestmethod(args) {
            const method = Cast.toString(args.method);
            this.request.method = method;
        }

        setHeaderData(args) {
            const key = Cast.toString(args.name);
            const value = Cast.toString(args.value);
            this.request.options.headers[key] = value;
        }

        setHeaderJSON(args) {
            const json = Cast.toString(args.json);
            let object;
            // ignore invalid data
            try {
                object = JSON.parse(json);
            } catch {
                return;
            }
            if (typeof object !== 'object') return;
            this.request.options.headers = object;
        }

        setBody(args) {
            const body = Cast.toString(args.text);
            this.request.body = body;
        }

        // eslint-disable-next-line require-await
        async sendRequest(args) {
            const url = Cast.toString(args.url);

            this.clearAll();

            this.response.url = url;
            // @ts-ignore
            Scratch.fetch(url, this.request.options)
                .then(res => {
                    // @ts-ignore
                    this.response.status = res.status;
                    this.response.headers = res.headers;
                    this.response.statusText = res.statusText;
                    if (res.ok) {
                        this.request.success = true;
                        this.request.events.activate('reqSuccess');
                    } else {
                        this.request.fail = true;
                        this.request.events.activate('reqFail');
                    }
                    this.request.end = true;
                    return res.text();
                })
                .then(body => this.response.text = body)
                .catch(err => {
                    this.response.error = String(err);
                    console.warn('request failed with error', err);
                    this.request.fail = true;
                    this.request.end = true;
                    this.request.events.activate('reqFail');
                });
        }
    }

    const instance = new WebRequests();
    Scratch.extensions.register(instance);
    // @ts-ignore
    runtime.ext_http = instance;
// @ts-ignore
})(Scratch);