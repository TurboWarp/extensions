(function (Scratch) {
    'use strict';
    const icon = 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI4MS44ODU0IiBoZWlnaHQ9IjgwLjYwMzA4IiB2aWV3Qm94PSIwLDAsODEuODg1NCw4MC42MDMwOCI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE5OS4wNTczLC0xMzkuNjk4NDYpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTI4MC45NDI3LDE4MGMwLDIyLjI1NzkyIC0xOC4zMzA2Nyw0MC4zMDE1NCAtNDAuOTQyNyw0MC4zMDE1NGMtMjIuNjEyMDMsMCAtNDAuOTQyNywtMTguMDQzNjEgLTQwLjk0MjcsLTQwLjMwMTU0YzAsLTIyLjI1NzkyIDE4LjMzMDY3LC00MC4zMDE1NCA0MC45NDI3LC00MC4zMDE1NGMyMi42MTIwMywwIDQwLjk0MjcsMTguMDQzNjEgNDAuOTQyNyw0MC4zMDE1NHoiIGZpbGw9IiMwMDE5OTkiIHN0cm9rZS13aWR0aD0iMCIvPjxwYXRoIGQ9Ik0yNjAuMDExOSwxNTYuMzQ5NTd2MTIuNzM0ODVoLTQwLjAyMzgxdi0xMi43MzQ4NWMwLC0xLjAwNjI4IDAuODEyOTgsLTEuODE5MjYgMS44MTkyNiwtMS44MTkyNmgzNi4zODUyOGMxLjAwNjI4LDAgMS44MTkyNiwwLjgxMjk4IDEuODE5MjYsMS44MTkyNnpNMjI5LjUzOTIzLDE2MS44MDczNmMwLC0xLjI1NjQzIC0xLjAxNzY1LC0yLjI3NDA4IC0yLjI3NDA4LC0yLjI3NDA4Yy0xLjI1NjQzLDAgLTIuMjc0MDgsMS4wMTc2NSAtMi4yNzQwOCwyLjI3NDA4YzAsMS4yNTY0MyAxLjAxNzY1LDIuMjc0MDggMi4yNzQwOCwyLjI3NDA4YzEuMjU2NDMsMCAyLjI3NDA4LC0xLjAxNzY1IDIuMjc0MDgsLTIuMjc0MDh6TTIxOS45ODgxLDE5MC45MTU1OGg0MC4wMjM4MXYxMi43MzQ4NWMwLDEuMDA2MjggLTAuODEyOTgsMS44MTkyNiAtMS44MTkyNiwxLjgxOTI2aC0zNi4zODUyOGMtMS4wMDYyOCwwIC0xLjgxOTI2LC0wLjgxMjk4IC0xLjgxOTI2LC0xLjgxOTI2ek0yMjQuOTkxMDcsMTk4LjE5MjY0YzAsMS4yNTY0MyAxLjAxNzY1LDIuMjc0MDggMi4yNzQwOCwyLjI3NDA4YzEuMjU2NDMsMCAyLjI3NDA4LC0xLjAxNzY1IDIuMjc0MDgsLTIuMjc0MDhjMCwtMS4yNTY0MyAtMS4wMTc2NSwtMi4yNzQwOCAtMi4yNzQwOCwtMi4yNzQwOGMtMS4yNTY0MywwIC0yLjI3NDA4LDEuMDE3NjUgLTIuMjc0MDgsMi4yNzQwOHpNMjE5Ljk4ODEsMTcyLjcyMjk0aDQwLjAyMzgxdjE0LjU1NDExaC00MC4wMjM4MXpNMjI0Ljk5MTA3LDE4MGMwLDEuMjU2NDMgMS4wMTc2NSwyLjI3NDA4IDIuMjc0MDgsMi4yNzQwOGMxLjI1NjQzLDAgMi4yNzQwOCwtMS4wMTc2NSAyLjI3NDA4LC0yLjI3NDA4YzAsLTEuMjU2NDMgLTEuMDE3NjUsLTIuMjc0MDggLTIuMjc0MDgsLTIuMjc0MDhjLTEuMjU2NDMsMCAtMi4yNzQwOCwxLjAxNzY1IC0yLjI3NDA4LDIuMjc0MDh6IiBmaWxsPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjEiLz48L2c+PC9nPjwvc3ZnPjwhLS1yb3RhdGlvbkNlbnRlcjo0MC45NDI2OTk5OTk5OTk5NzQ6NDAuMzAxNTM5OTk5OTk5OTktLT4=';
    const icon2 = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjczOTY4MDA3OTM4IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjI3MDYiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTgzMiA2NEgxOTJjLTE3LjcgMC0zMiAxNC4zLTMyIDMydjIyNGg3MDRWOTZjMC0xNy43LTE0LjMtMzItMzItMzJ6TTI4OCAyMzJjLTIyLjEgMC00MC0xNy45LTQwLTQwczE3LjktNDAgNDAtNDAgNDAgMTcuOSA0MCA0MC0xNy45IDQwLTQwIDQwek0xNjAgOTI4YzAgMTcuNyAxNC4zIDMyIDMyIDMyaDY0MGMxNy43IDAgMzItMTQuMyAzMi0zMlY3MDRIMTYwdjIyNHogbTEyOC0xMzZjMjIuMSAwIDQwIDE3LjkgNDAgNDBzLTE3LjkgNDAtNDAgNDAtNDAtMTcuOS00MC00MCAxNy45LTQwIDQwLTQwek0xNjAgNjQwaDcwNFYzODRIMTYwdjI1NnogbTEyOC0xNjhjMjIuMSAwIDQwIDE3LjkgNDAgNDBzLTE3LjkgNDAtNDAgNDAtNDAtMTcuOS00MC00MCAxNy45LTQwIDQwLTQweiIgcC1pZD0iMjcwNyIgZmlsbD0iI2ZmZmZmZiI+PC9wYXRoPjwvc3ZnPg==';
    const endpoint = `https://database.deta.sh/v1/c0jtkzthm3e/WebData/items`;
    const endpoint1 = `https://database.deta.sh/v1/c0jtkzthm3e/WebData/query`;
    const apiKey = 'c0jtkzthm3e_6yRtTowLVxb3tyGuAmXwRXYA4kUV1ba4';
    var ProjectName = '';
    class WebData {
        getInfo() {
            return {
                id: 'WebData',
                name: 'WebData',
                color1: '#001999',
                color2: '#192fa3',
                color3: '#3246ad',
                menuIconURI: icon,
                blockIconURI: icon2,
                blocks: [
                    {
                        opcode: 'SettingsProjectName',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'Name this project [key]',
                        arguments: {
                            key: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'i'
                            },
                            value: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '1'
                            }
                        }
                    },
                    {
                        opcode: 'add',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'Save [value] as [key_] to cloud database',
                        arguments: {
                            key_: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'i'
                            },
                            value: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '1'
                            }
                        }
                    },
                    {
                        opcode: 'delete',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'Delete [key] from cloud database',
                        arguments: {
                            key: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'i'
                            }
                        }
                    },
                    {
                        opcode: 'read',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'Read value of [key] from cloud database',
                        arguments: {
                            key: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'i'
                            }
                        }
                    },
                    {
                        opcode: 'search',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'Is [key_] saved in cloud database?',
                        arguments: {
                            key_: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'i'
                            }
                        }
                    },
                    '---',
                    {
                        opcode: 'connected_to_internet_block',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'Is connected to internet?',
                        arguments: {}
                    },
                ]
            }
        }
        connected_to_internet_block() {
            return navigator.onLine;
        }
        SettingsProjectName({ key }) {
            ProjectName = key
        }
        add({ key_, value }) {
            async function setData() {
                const response = await fetch(endpoint, {
                    method: "PUT",
                    body: JSON.stringify(obj),
                    headers: { "Content-Type": "application/json", "X-API-Key": `${apiKey}` },
                });
                console.log(response.status);
            }
            let key = btoa(encodeURIComponent(String(ProjectName + '_' + key_)));
            let field1 = btoa(encodeURIComponent(value));
            let obj = { items: [{ key, field1 }] };
            setData();
        }
        delete({ key }) {
            async function deleteData(key) {
                const response = await fetch(`${endpoint}/${key}`, {
                    method: 'DELETE',
                    headers: { 'X-API-Key': `${apiKey}` },
                });
                console.log(response.status);
            }
            let key1 = btoa(encodeURIComponent(String(ProjectName + '_' + key)));
            deleteData(key1)
        }
        read({ key }) {
            async function getData(key) {
                const response = await fetch(`${endpoint}/${key}`, {
                    headers: { 'X-API-Key': `${apiKey}` },
                });
                const data = await response.json();
                console.log(data)
                console.log(data['field1'])
                if (data['field1'] != undefined) {
                    return decodeURIComponent(atob(data['field1']));
                } else {
                    return 'undefined';
                }
            }
            let key1 = btoa(encodeURIComponent(String(ProjectName + '_' + key)));
            return getData(key1);
        }
        search({ key_ }) {
            async function setData() {
                const response = await fetch(endpoint1, {
                    method: "POST",
                    body: JSON.stringify(obj),
                    headers: { "Content-Type": "application/json", "X-API-Key": `${apiKey}` },
                });
                const data = await response.json();
                let paging = data['paging'];
                console.log(response.status);
                let status = paging['size']
                let result = status === 1
                return (result);
            }
            let key = btoa(encodeURIComponent(String(ProjectName + '_' + key_)));
            let obj = { query: [{ key }] };
            return setData();
        }
    }
    Scratch.extensions.register(new WebData());
})(Scratch);
//BY -SIPC- 502415953