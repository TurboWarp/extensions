// this is just kinda existent, its only point is so 
// people can set properties that arnt explictly in the http ext

(function(Scratch) {
    'use strict';
    const pathRegex = /[^.]+/g;
    const setType = (value, type) => {
        switch (type) {
        case 'string':
            switch (typeof value) {
            case 'string':
            case 'boolean':
            case 'number':
            case 'function':
                return String(value);
            case 'object':
                try {
                    return JSON.stringify(value);
                } catch {
                    return '{}';
                }
            }
            break;
        case 'number':
            switch (typeof value) {
            case 'string':
                return String(value);
            case 'boolean':
                return Boolean(value);
            case 'number':
                return value;
            case 'function':
            case 'object':
                return NaN;
            }
            break;
        case 'boolean':
            switch (typeof value) {
            case 'string':
            case 'boolean':
            case 'function':
            case 'number':
                return Boolean(value);
            case 'object':
                return false;
            }
            break;
        case 'object':
            switch (typeof value) {
            case 'string':
                try {
                    const parsed = JSON.parse(value);
                    if (typeof parsed === 'object') return parsed;
                    return {};
                } catch {
                    return {};
                }
            case 'boolean':
            case 'function':
            case 'number':
                return {};
            case 'object':
                return value;
            }
            break;
        }
    };
    const parseType = text => {
        // this isnt text and we just pass it down as what ever it is
        if (typeof text !== 'string') return text;
        if (!isNaN(Number(text))) {
            return Number(text);
        } else {
            try {
                const parsed = JSON.parse(text);
                if (typeof parsed === 'object') return parsed;
                if (typeof parsed === 'boolean') return parsed;
                return text;
            } catch {
                return text;
            }
        }
    };
    const getPathArray = path => {
        const names = path.match(pathRegex);
        for (let index = 0; index < names.length; index++) {
            let name = names[index];
            name = name.replaceAll(/(?<!\\)&dot/g, '.');
        }
        return names;
    };
    const getValueAtPath = (object, path) => {
        for (const name of path) {
            object = object[name];
            if (typeof object !== 'object') return;
        }
        return object;
    };
    const setValueAtPath = (object, path, value) => {
        for (const name of path) {
            object = object[name];
            if (typeof object !== 'object') return;
        }
        return object = value;
    };

    const {BlockType, Cast, ArgumentType} = Scratch;
    // @ts-ignore
    const http = Scratch.vm.runtime.ext_http;

    class HTTPPatches {
        getInfo() {
            return {
                id: 'gsaHttpPatches',
                name: 'http/https extra',
                color1: '#307eff',
                color2: '#2c5eb0',
                blocks: [
                    {
                        opcode: 'setUnkownProperty',
                        blockType: BlockType.COMMAND,
                        arguments: {
                            path: {
                                type: ArgumentType.STRING,
                                defaultValue: 'path.to.item'
                            },
                            value: {
                                type: ArgumentType.STRING,
                                defaultValue: 'your mom :trel:'
                            }
                        },
                        text: 'set [path] to [value] in request options'
                    },
                    {
                        opcode: 'setUnkownPropertyType',
                        blockType: BlockType.COMMAND,
                        arguments: {
                            path: {
                                type: ArgumentType.STRING,
                                defaultValue: 'path.to.item'
                            },
                            type: {
                                type: ArgumentType.STRING,
                                menu: 'jsTypes'
                            }
                        },
                        text: 'set [path] to type [type] in request options'
                    },
                    {
                        opcode: 'getUnkownProperty',
                        blockType: BlockType.REPORTER,
                        arguments: {
                            path: {
                                type: ArgumentType.STRING,
                                defaultValue: 'path.to.item'
                            }
                        },
                        text: 'get [path] in request options'
                    },
                    {
                        opcode: 'getUnkownPropertyType',
                        blockType: BlockType.REPORTER,
                        arguments: {
                            path: {
                                type: ArgumentType.STRING,
                                defaultValue: 'path.to.item'
                            }
                        },
                        text: 'get type of [path] in request options'
                    }
                ],
                menus: {
                    jsTypes: {
                        items: [
                            'string',
                            'number',
                            'boolean',
                            'object'
                        ]
                    }
                }
            };
        }

        setUnkownProperty(args) {
            const name = Cast.toString(args.name);
            const text = Cast.toString(args.value);

            const path = getPathArray(name);
            const value = parseType(text);
            setValueAtPath(http.request.options, path, value);
        }

        setUnkownPropertyType(args) {
            const name = Cast.toString(args.name);
            const type = Cast.toString(args.type);
            const path = getPathArray(name);

            const oldValue = getValueAtPath(http.request.options, path);
            const newValue = setType(oldValue, type);
            setValueAtPath(http.request.options, path, newValue);
        }

        getUnkownProperty(args) {
            const name = Cast.toString(args.name);
            const path = getPathArray(name);

            return getValueAtPath(http.request.options, path);
        }

        getUnkownPropertyType(args) {
            const name = Cast.toString(args.name);
            const path = getPathArray(name);
            const value = getValueAtPath(http.request.options, path);

            return typeof value;
        }
    }

    const instance = new HTTPPatches();
    Scratch.extensions.register(instance);
})(Scratch);