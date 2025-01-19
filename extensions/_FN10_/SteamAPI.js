(function (Scratch) {
    'use strict';

    if (!Scratch.extensions.unsandboxed) {
        throw new Error('Steam API must run unsandboxed.');
    }

    class SteamAPI {
        getInfo() {
            return {
                id: 'steamapu',
                name: 'Steam API',
                color1: "#1a2736",
                color2: "#1a2736",
                color3: "#1a2736",
                blocks: [
                    {
                        opcode: 'text1',
                        blockType: Scratch.BlockType.LABEL,
                        text: 'Steam Protocol'
                    },
                    {
                        opcode: 'opengame',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'Launch Game ID [id]',
                        arguments: {
                            id: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '400'
                            }
                        }
                    },
                    {
                        opcode: 'openstorepage',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'Open Store Page for Game ID [id]',
                        arguments: {
                            id: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '400'
                            }
                        }
                    },
                    {
                        opcode: 'opensteam',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'Open Steam'
                    },
                    {
                        opcode: 'exitsteam',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'Shutdown Steam'
                    },
                    {
                        opcode: 'nonsteamgame',
                        blockType: Scratch.BlockType.COMMAND,
                        hidefrompalette: true,
                        text: 'Add Non-Steam game'
                    },
                    {
                        opcode: 'text2',
                        blockType: Scratch.BlockType.LABEL,
                        text: 'Steam API (Without Key)'
                    },
                    {
                        opcode: 'getidname',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'Get Steam Game ID with Name [NAME]',
                        arguments: {
                            NAME: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'Team Fortress 2'
                            }
                        }
                    },
                    {
                        opcode: 'getnameid',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'Get Steam Game Name with ID [ID]',
                        arguments: {
                            ID: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '440'
                            }
                        }
                    },
                    {
                        opcode: 'text3',
                        blockType: Scratch.BlockType.LABEL,
                        text: 'Steam API (WITH Key)'
                    },
                    {
                        func: 'warning',
                        blockType: Scratch.BlockType.BUTTON,
                        text: 'READ THIS BEFORE USING YOUR KEY!'
                    },
                    {
                        func: 'howtogetkey',
                        blockType: Scratch.BlockType.BUTTON,
                        text: 'How to get your API Key'
                    }
                ]
            };
        }
        async getnewsforappid() {
            try {
                const response = await Scratch.fetch('https://corsproxy.io/?url=https://api.steampowered.com/ISteamApps/GetAppList/v0002/');
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`)
                    return false;
                }

                const json = await response.json();
                const jsonobj = json['applist']['apps']
                console.log(jsonobj);
                
                return false;
            } catch (error) {
                console.error(error.message)
                return false;
            }
        }
        howtogetkey() {
            alert('To get your API key, you must have at least one paid game on your account. If you meet those requirments, click "OK".')
            Scratch.openWindow('https://steamcommunity.com/dev/apikey')
        }
        opengame(args) {
            Scratch.openWindow(`steam://launch/${Scratch.Cast.toString(args.id)}`);
        }
        nonsteamgame(args) {
            Scratch.openWindow('steam://AddNonSteamGame')
        }
        openstorepage(args) {
            Scratch.openWindow(`steam://advertise/${Scratch.Cast.toString(args.id)}`);
        }
        exitsteam(args) {
            Scratch.openWindow('steam://exit')
        }
        opensteam(args) {
            Scratch.openWindow('steam://')
        }
        async getidname(args) {
            try {
                const response = await Scratch.fetch('https://corsproxy.io/?url=https://api.steampowered.com/ISteamApps/GetAppList/v0002/');
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`)
                    return false;
                }

                const json = await response.json();
                const jsonobj = json['applist']['apps']
                console.log(jsonobj);
                for (var key in jsonobj) {
                    console.info(jsonobj[key])
                    if (jsonobj[key]['name'] === Scratch.Cast.toString(args.NAME)) {
                        return jsonobj[key]['appid'];
                    }
                }
                return false;
            } catch (error) {
                console.error(error.message)
                return false;
            }
        }
        warning() {
            alert('NEVER SHARE YOUR API KEY WITH ANYONE!! And also, every game you make with penguinmod, or turbowarp can be unpackaged, and people can steal the key. It is reccomended to use something like Kylin Extension. This is an obfuscator for scratch, and use it if you want to make a game public, that has these blocks in it.')
            const confirm1 = window.confirm(`Do you wish to add that obfuscator? (If you dont use it with these blocks, dont release the project publicly.)`);
            if (confirm1) {Scratch.openWindow('https://github.com/FurryR/kylin-extension?tab=readme-ov-file#how-to-use')}

        }
        async getnameid(args) {
            try {
                const response = await Scratch.fetch('https://corsproxy.io/?url=https://api.steampowered.com/ISteamApps/GetAppList/v0002/');
                if (!response.ok) {
                    throw new Error(`Response status: ${response.status}`)
                    return false;
                }

                const json = await response.json();
                const jsonobj = json['applist']['apps']
                console.log(jsonobj);
                for (var key in jsonobj) {
                    console.info(jsonobj[key])
                    if (jsonobj[key]['appid'] === Scratch.Cast.toNumber(args.ID)) {
                        return jsonobj[key]['name'];
                    }
                }
                return false;
            } catch (error) {
                console.error(error.message)
                return false;
            }
        }
    }
    Scratch.extensions.register(new SteamAPI());
})(Scratch);