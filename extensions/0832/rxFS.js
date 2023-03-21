/*!
* Made by 0832,23311
*/

var rxFSfi = ''
var rxFSsy = ''
var rxFSfi = new Array()
var rxFSsy = new Array()
var Search, i;

const file = 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIzMC4zMTIxMiIgaGVpZ2h0PSIyNC4yNDk2NyIgdmlld0JveD0iMCwwLDMwLjMxMjEyLDI0LjI0OTY3Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMzA0Ljg0Mzk0LC0xNjcuODc1MTYpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGw9IiNmZmI5MDAiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMzE5Ljk5OTk5LDE3MC45MDYzN2gxMi4xMjQ4M2MxLjY3NDEyLDAgMy4wMzEyNCwxLjM1NzEyIDMuMDMxMjQsMy4wMzEydjE1LjE1NjA3YzAsMS42NzQwOCAtMS4zNTcxMiwzLjAzMTIgLTMuMDMxMjQsMy4wMzEyaC0yNC4yNDk2NmMtMS42NzQxMiwwIC0zLjAzMTIyLC0xLjM1NzEyIC0zLjAzMTIyLC0zLjAzMTJ2LTE4LjE4NzI3YzAsLTEuNjgyMzIgMS4zNDg5LC0zLjAzMTIgMy4wMzEyMiwtMy4wMzEyaDkuMDkzNjN6Ii8+PC9nPjwvZz48L3N2Zz48IS0tcm90YXRpb25DZW50ZXI6MTUuMTU2MDYwMDAwMDAwMDI1OjEyLjEyNDgzNTAwMDAwMDAxOS0tPg==';
const wenj = 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIyMS4zMzc2IiBoZWlnaHQ9IjI3LjEzNTI4IiB2aWV3Qm94PSIwLDAsMjEuMzM3NiwyNy4xMzUyOCI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTMwOS4zMzEyLC0xNjYuNDMyMzYpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMzMwLjU0OTY3LDE5MC41MzY0YzAsMS42NzQxMiAtMS4zNTcxMiwzLjAzMTI0IC0zLjAzMTIsMy4wMzEyNGgtMTUuMTU2MDdjLTEuNjc0MDgsMCAtMy4wMzEyLC0xLjM1NzEyIC0zLjAzMTIsLTMuMDMxMjR2LTIxLjA3MjgyYzAsLTEuNjc0MTIgMS4zNTcxMiwtMy4wMzEyMiAzLjAzMTIsLTMuMDMxMjJoMTQuMDQ5MzNsNC4xMzc5NCw0LjEwMTc3eiIgZmlsbD0iI2FmYWZhZiIgc3Ryb2tlPSJub25lIiBzdHJva2UtbGluZWNhcD0iYnV0dCIvPjxwYXRoIGQ9Ik0zMzAuNjY4OCwxNzAuNzAxNDdsLTIuMTE5OTIsMC4wNTEzN2MtMS4xMzM3NCwwIC0yLjA1MjgyLC0wLjkxOTA4IC0yLjA1MjgyLC0yLjA1Mjg1di0yLjEwMjgyeiIgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aW5kZXgmcXVvdDs6bnVsbH0iIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiLz48cGF0aCBkPSJNMzEyLjgzMjY0LDE3My41MTk1OGgxMi4wMDE0MSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48cGF0aCBkPSJNMzEyLjc5MjMyLDE3Ni44NzI5MWgxMi4xNzc5IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxwYXRoIGQ9Ik0zMTIuODA1NzYsMTgwLjE3MTZoNi44ODMxNiIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz48L2c+PC9nPjwvc3ZnPjwhLS1yb3RhdGlvbkNlbnRlcjoxMC42Njg4MDAwMDAwMDAwMzM6MTMuNTY3NjM3NTAwMDAwMDE4LS0+';

(function (Scratch) {
    'use strict';

    class rxFS {
        getInfo() {
            return {
                id: '0832rxfs',
                name: 'rxFS',
                color1: '#2bdab7',
                blocks: [
                    {
                        blockIconURI: wenj,
                        opcode: 'start',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'New [STR] ',
                        arguments: {
                            STR: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '📃'
                            }
                        }
                    },
                    {
                        blockIconURI: wenj,
                        opcode: 'file',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'Set [STR] to [STR2] ',
                        arguments: {
                            STR: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '📃'
                            },
                            STR2: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'rxFS is good!'
                            }
                        }
                    },
                    {
                        blockIconURI: wenj,
                        opcode: 'sync',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'Set the location of [STR] to [STR2] ',
                        arguments: {
                            STR: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '📃'
                            },
                            STR2: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '📃'
                            }
                        }
                    },
                    {
                        blockIconURI: wenj,
                        opcode: 'del',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'Delete [STR] ',
                        arguments: {
                            STR: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '📃'
                            }
                        }
                    },
                    {
                        blockIconURI: wenj,
                        opcode: 'webin',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'GET [STR]',
                        arguments: {
                            STR: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'https://0832k12.github.io/rxFS/hello.txt'
                            }
                        }
                    },
                    {
                        blockIconURI: wenj,
                        opcode: 'open',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'Open [STR]',
                        arguments: {
                            STR: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '📃'
                            }
                        }
                    },
                    {
                        blockIconURI: file,
                        opcode: 'clean',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'Clean Filesystem',
                        arguments: {}
                    },
                    {
                        blockIconURI: file,
                        opcode: 'in',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'Import Filesystem [STR]',
                        arguments: {
                            STR: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '📁'
                            }
                        }
                    },
                    {
                        blockIconURI: file,
                        opcode: 'out',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'Export File system',
                        arguments: {}
                    },
                    {
                        blockIconURI: file,
                        opcode: 'list',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'List files of [STR]',
                        arguments: {
                            STR: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '📁'
                            }
                        }
                    },
                    {
                        blockIconURI: file,
                        opcode: 'search',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'Search [STR]',
                        arguments: {
                            STR: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '📃'
                            }
                        }
                    }
                ]
            };
        }


        clean() {
            rxFSfi = [];
            rxFSsy = [];
        }

        sync({ STR, STR2 }) {
            if (rxFSsy.indexOf(STR) + 1 == 0) {
                rxFSsy[((rxFSsy.indexOf(STR) + 1) - 1)] = STR2;
            }
        }

        start({ STR }) {
            if (!(STR.charAt((STR.length - 1)) == '/') && rxFSsy.indexOf(STR) + 1 == 0) {
                rxFSfi.splice(((rxFSfi.length + 1) - 1), 0, null);
                rxFSsy.splice(((rxFSsy.length + 1) - 1), 0, STR);
            }
        }

        open({ STR }) {
            return rxFSfi[((rxFSsy.indexOf(STR) + 1) - 1)];
        }

        del({ STR }) {
            rxFSfi[((rxFSsy.indexOf(STR) + 1) - 1)] = undefined;
            rxFSsy[((rxFSsy.indexOf(STR) + 1) - 1)] = undefined;
        }

        file({ STR, STR2 }) {
            rxFSfi[((rxFSsy.indexOf(STR) + 1) - 1)] = STR2;
        }

        search({ STR }) {
            Search = '';
            i = 0;
            for (var i in rxFSsy) {
                if (!(rxFSsy[(i)].indexOf(STR) == undefined)) {
                    Search = [Search, ',', rxFSsy[(i)]].join('');
                }
            }
            return Search;
        }

        list({ STR }) {
            Search = '';
            i = 0;
            for (var i in rxFSsy) {
                if (rxFSsy[(i)].slice(0, STR.length) == STR) {
                    Search = [Search, ',', rxFSsy[(i)]].join('');
                }
            }
            return Search;
        }

        webin({ STR }) {
            return fetch(STR)
                .then((response) => {
                    return response.text();
                })
                .catch((error) => {
                    console.error(error);
                    return 'undefined';
                });
        }

        in({ STR }) {
            rxFSfi = STR.slice(0, STR.indexOf('|')).split(',');
            rxFSsy = STR.slice(((STR.indexOf('|') + 1)), STR.length).split(',');
        }

        out() {
            return [rxFSfi.join(','), '|', rxFSsy.join(',')].join('');
        }
    }

    Scratch.extensions.register(new rxFS());
})(Scratch);
