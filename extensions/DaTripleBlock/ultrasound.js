/**
 * Created By Da TripleBlock (TTT)
 * ♥Please Dont Remove this Comment ♥
 */
(function (Scratch) {
    'use strict';
    const icon = "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxMDYuNTU0NyIgaGVpZ2h0PSI4Ni45NjI4MyIgdmlld0JveD0iMCwwLDEwNi41NTQ3LDg2Ljk2MjgzIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTg3LjAzNjc0LC0xMzcuNTkwNzcpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGw9IiNmZmZmZmYiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0xOTIuNDQ4MTUsMTYyLjA1NDU3YzAuNjExMDMsLTAuNzY3NzQgMS41OTkzMywtMC45NjU0IDEuNTk5MzMsLTAuOTY1NGwyLjk5NDgsLTAuNTQ4MzZjNi40ODQzNCwwLjAwMzk3IDEyLjg0MzA1LC0wLjgzMzUzIDE5LjI2Mzk3LC0xLjY0MzAzYzQuNzM4NjMsLTAuNTk3NDEgMTAuNjA0OTMsLTAuNzM5NjggMTQuNzkyNjEsLTMuNDU0NzljMy4wMTA5NywtMS45NTIxOCAyLjg2MzQ5LC0zLjExODMyIDUuOTczODksLTUuNTY3MThsMS45NDA3LC0yLjE4MzI5YzAuNDY4MjMsLTAuNTMxNjcgMS4xNTQwMywtMC44NjcxMiAxLjkxODE4LC0wLjg2NzEyYzEuMzQxOTksMCAyLjQ0MjM0LDEuMDM0NTkgMi41NDY5MywyLjM0OTY5bDAuMjQ3MDEsMi43MTcxNGwtMC4wMzY2LDAuMDAzMzNsMC4wNDQ0NywwLjExMjIyYzAuMDA4MzEsMTcuNDA5NDkgMi41NjcwMywzNC40ODExNSAtMC4wNzk1Miw1MS44NjMxMWMtMC42OTc3LDQuNTgyMzIgLTEuMTM1NzEsMTMuNzI5MTEgLTcuNDM2MDksMTQuNjQ2NjdjLTIuNzYzNDcsMC40MDI0NSAtNi43ODY4MiwtNS45ODM5NiAtNy43ODQyNCwtNy44NzMyMmMtMC43NTA5NiwtMS40MjI0MiAtMC4zMTIsLTMuNDg4OTggLTEuNDgyNywtNC41OTIwMmMtMC4zMzYxNCwtMC4zMTY3MiAtMC45MDI4OCwwLjIxODkgLTEuMzY0MTIsMC4yNDI2OWMtMC44NzkzNiwwLjA0NTM2IC0xLjc2MDksLTAuMDI0MDYgLTIuNjQxMzUsLTAuMDM2MDljLTguMjYxNTUsLTAuNzUyMjUgLTE2LjQ5MzE4LC0wLjE3NjU3IC0yNC43NzIwNSwtMC40NjE4Yy0xLjk4MjY1LC0wLjA2ODMxIC02LjM4MTU1LC0wLjUwNzg1IC03LjYzMzY4LC0xLjk3NzUxYy0xLjI3NTE0LC0xLjQ5NjY3IC0wLjU0NTY5LC03Ljc1MDQ2IC0wLjU0MTE0LC05LjgwNjc5YzAuMDIxNjgsLTkuODAyODYgMC4yNDkzNiwtMTkuNjEwODQgMC4yNDkzNiwtMjkuNDIwNjljMCwwIDAsLTIuMzEyNjggMi4yMDAyNSwtMi41Mzc1NHoiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSI1LjUiLz48cGF0aCBkPSJNMjU0LjQ1MTA1LDIwNy41NTE2OGMtMS4zMTQ1NywtMi4xOTA5NSAwLjg3NjM4LC0zLjUwNTUzIDAuODc2MzgsLTMuNTA1NTNsMC41NDQ1OCwtMC4xMjU4MmMyLjQ5Nzk1LC0zLjIxMTIgNi40MDA3NSwtNi42NjE1OSA3LjU2MDUxLC0xMC42NzI2NGMwLjg3NzExLC0zLjAzMzUgMC42MzExNSwtNi4yMzg0MiAwLjYyOTI2LC05LjMzMTI5Yy0wLjAwMDg0LC0xLjM3NTc2IDAuMDg2OTcsLTcuNDM1OTkgLTAuMjA0MDUsLTkuMTE5NzNjLTAuODc3NjIsLTUuMDc3NDcgLTUuNDI4ODYsLTExLjA1NTEgLTkuNzUwMDEsLTEzLjQ4MzczYzAsMCAtMi4yMDcwMiwtMS4yODc0MyAtMC45MTk1OSwtMy40OTQ0NGMxLjI4NzQzLC0yLjIwNzAxIDMuNDk0NDQsLTAuOTE5NTkgMy40OTQ0NCwtMC45MTk1OWM1LjU2MTEyLDMuMzM0NDggMTAuOTUwMDUsMTAuMzQ2NDQgMTIuMTk0NjYsMTYuOTM5NTZjMC4zOTQ3NiwyLjA5MTE4IDAuMjk1ODcsOC4wNDU1MiAwLjI5NDY5LDEwLjA3NzkyYy0wLjAwMjIzLDMuODQyMDYgMC4yNTQ1OSw3LjEwMzgxIC0wLjg2Njk3LDEwLjg3MTczYy0xLjM5OTk1LDQuNzAzMTkgLTUuNDYzNDUsOC40OTQzOSAtOC4zOTkyNCwxMi4yNjk1MmwtMS45NDkxMywxLjM3MDQxYzAsMCAtMi4xOTA5NSwxLjMxNDU3IC0zLjUwNTUyLC0wLjg3NjM4eiIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjUuNSIvPjxwYXRoIGQ9Ik0yNjQuMzExNDEsMjIxLjc1OTIzYy0xLjgwNjcxLC0xLjgwNjcxIDAsLTMuNjEzNDEgMCwtMy42MTM0MWwxLjQ5NzQ2LC0xLjExNTk5YzIuODMwNTEsLTAuOTQyNDggNS42MzQ1MSwtMS45NzEyMiA4LjM5NDQ2LC0zLjEwMzc3YzYuNTY3MzgsLTMuODI1OTIgOS41ODU4NiwtMTAuNzMxNjkgMTAuOTAxMTcsLTE4LjAzNTA5YzAuNTg2NiwtMy4yNTcyIDEuNTcwNDcsLTYuNDYzMDMgMS43OTY2MiwtOS43NjQ4OWMwLjIyMDg2LC0zLjIyNDY0IC0wLjU0NDQxLC02LjM5MzczIC0xLjA5MzY2LC05LjUzMDMxYy0xLjEwNjA1LC02LjMxNjM1IC0xLjkyNTc5LC0xMS44MDg1IC01LjU3MTQ5LC0xNy4yNjg3MWMtMS41NzEzNSwtMi4zNTM0MyAtMy44Njg0MywtNC4xMzExNiAtNS43OTM5NywtNi4yMDQ4MmMtMi42Nzg3OSwtMi44ODQ4NSAtNC44OTgxNywtNi41NzMxNiAtOC42OTgzMiwtNy44MjQyYzAsMCAtMi40MDEyNCwtMC44NzMxNyAtMS41MjgwNiwtMy4yNzQ0MWMwLjg3MzE4LC0yLjQwMTI0IDMuMjc0NDEsLTEuNTI4MDYgMy4yNzQ0MSwtMS41MjgwNmM0Ljc2MDQyLDEuODQxMTMgNy4yNjkzMSw1LjQ1ODQ5IDEwLjY5NjY1LDkuMTQ5NDdjNC4zNTY5NSw0LjY5MjA5IDguNzg5NCw5LjMzOTAyIDEwLjgwMTc4LDE1LjYyOTE4YzAuMDg1MDEsMC4yNjU3IDEuNzY2MzYsOS45NDUwMyAxLjg1Mjk5LDEwLjQ0MjU5YzIuNTg0NTEsMTQuODQzOTMgLTAuNDkxMzMsMzQuNDM1NTQgLTE0LjM1NTA4LDQyLjc4MTAzYy0yLjk3OTY0LDEuMjMwNjUgLTYuMDAzNSwyLjM1OTQ3IC05LjA2MTUzLDMuMzc5ODhsMC40OTk5OCwtMC4xMTg1YzAsMCAtMS44MDY3MSwxLjgwNjcxIC0zLjYxMzQxLDB6IiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iNS41Ii8+PHBhdGggZD0iTTE5Mi43NTg3MSwxNjEuMDIxMTRjMC41OTc4NiwtMC43NTExOSAxLjU2NDg1LC0wLjk0NDU5IDEuNTY0ODUsLTAuOTQ0NTlsMi45MzAyNiwtMC41MzY1NGM2LjM0NDU5LDAuMDAzODggMTIuNTY2MjQsLTAuODE1NTYgMTguODQ4NzcsLTEuNjA3NjFjNC42MzY1LC0wLjU4NDU0IDEwLjM3NjM3LC0wLjcyMzc0IDE0LjQ3Mzc4LC0zLjM4MDMzYzIuOTQ2MDcsLTEuOTEwMSAyLjgwMTc3LC0zLjA1MTEyIDUuODQ1MTMsLTUuNDQ3MTlsMS44OTg4OCwtMi4xMzYyNGMwLjQ1ODEzLC0wLjUyMDIyIDEuMTI5MTUsLTAuODQ4NDQgMS44NzY4MywtMC44NDg0NGMxLjMxMzA3LDAgMi4zODk3LDEuMDEyMyAyLjQ5MjA0LDIuMjk5MDVsMC4yNDE2OSwyLjY1ODU3bC0wLjAzNTgxLDAuMDAzMjZsMC4wNDM1MSwwLjEwOThjMC4wMDgxMywxNy4wMzQyNyAyLjUxMTcsMzMuNzM3OTggLTAuMDc3ODEsNTAuNzQ1M2MtMC42ODI2Niw0LjQ4MzU2IC0xLjExMTI0LDEzLjQzMzIxIC03LjI3NTgyLDE0LjMzMDk5Yy0yLjcwMzksMC4zOTM3OCAtNi42NDA1NCwtNS44NTQ5OSAtNy42MTY0NiwtNy43MDM1M2MtMC43MzQ3NywtMS4zOTE3NiAtMC4zMDUyOCwtMy40MTM3OSAtMS40NTA3NCwtNC40OTMwNWMtMC4zMjg5LC0wLjMwOTg5IC0wLjg4MzQzLDAuMjE0MTggLTEuMzM0NzIsMC4yMzc0NWMtMC44NjA0MSwwLjA0NDM4IC0xLjcyMjk1LC0wLjAyMzU0IC0yLjU4NDQzLC0wLjAzNTMxYy04LjA4MzQ4LC0wLjczNjAzIC0xNi4xMzc3LC0wLjE3Mjc3IC0yNC4yMzgxMywtMC40NTE4NWMtMS45Mzk5MSwtMC4wNjY4MyAtNi4yNDQsLTAuNDk2OSAtNy40NjkxNSwtMS45MzQ4OWMtMS4yNDc2NiwtMS40NjQ0MSAtMC41MzM5MywtNy41ODM0MiAtMC41Mjk0OCwtOS41OTU0M2MwLjAyMTIxLC05LjU5MTU4IDAuMjQzOTksLTE5LjE4ODE2IDAuMjQzOTksLTI4Ljc4NjU4YzAsMCAwLC0yLjI2Mjg0IDIuMTUyODMsLTIuNDgyODV6IiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMC41Ii8+PHBhdGggZD0iTTI1My40MjUyNiwyMDUuNTM3NjVjLTEuMjg2MjQsLTIuMTQzNzMgMC44NTc0OSwtMy40Mjk5NyAwLjg1NzQ5LC0zLjQyOTk3bDAuNTMyODQsLTAuMTIzMTFjMi40NDQxMSwtMy4xNDE5OSA2LjI2Mjc5LC02LjUxODAxIDcuMzk3NTYsLTEwLjQ0MjYxYzAuODU4MjEsLTIuOTY4MTIgMC42MTc1NCwtNi4xMDM5NiAwLjYxNTcsLTkuMTMwMTdjLTAuMDAwODIsLTEuMzQ2MTEgMC4wODUxLC03LjI3NTcyIC0wLjE5OTY1LC04LjkyMzE3Yy0wLjg1ODcxLC00Ljk2ODA0IC01LjMxMTg1LC0xMC44MTY4MyAtOS41Mzk4NywtMTMuMTkzMTFjMCwwIC0yLjE1OTQ1LC0xLjI1OTY4IC0wLjg5OTc3LC0zLjQxOTEyYzEuMjU5NjgsLTIuMTU5NDUgMy40MTkxMiwtMC44OTk3NyAzLjQxOTEyLC0wLjg5OTc3YzUuNDQxMjYsMy4yNjI2MSAxMC43MTQwNCwxMC4xMjM0NCAxMS45MzE4MywxNi41NzQ0N2MwLjM4NjI1LDIuMDQ2MTEgMC4yODk0OSw3Ljg3MjExIDAuMjg4MzQsOS44NjA3MWMtMC4wMDIxOCwzLjc1OTI1IDAuMjQ5MTEsNi45NTA3IC0wLjg0ODI4LDEwLjYzNzQxYy0xLjM2OTc4LDQuNjAxODMgLTUuMzQ1Nyw4LjMxMTMxIC04LjIxODIyLDEyLjAwNTA3bC0xLjkwNzEyLDEuMzQwODdjMCwwIC0yLjE0MzczLDEuMjg2MjQgLTMuNDI5OTcsLTAuODU3NDl6IiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMC41Ii8+PHBhdGggZD0iTTI2My4wNzMxLDIxOS40Mzg5OWMtMS43Njc3NywtMS43Njc3NyAwLC0zLjUzNTUzIDAsLTMuNTM1NTNsMS40NjUxOSwtMS4wOTE5M2MyLjc2OTUsLTAuOTIyMTYgNS41MTMwNiwtMS45Mjg3MyA4LjIxMzU0LC0zLjAzNjg3YzYuNDI1ODMsLTMuNzQzNDYgOS4zNzkyNiwtMTAuNTAwMzggMTAuNjY2MjIsLTE3LjY0NjM4YzAuNTczOTYsLTMuMTg2OTkgMS41MzY2MiwtNi4zMjM3MyAxLjc1NzksLTkuNTU0NDNjMC4yMTYxLC0zLjE1NTE0IC0wLjUzMjY4LC02LjI1NTkzIC0xLjA3MDA5LC05LjMyNDkxYy0xLjA4MjIyLC02LjE4MDIyIC0xLjg4NDI4LC0xMS41NTM5OSAtNS40NTE0MSwtMTYuODk2NTJjLTEuNTM3NDgsLTIuMzAyNyAtMy43ODUwNiwtNC4wNDIxMiAtNS42NjkwOSwtNi4wNzEwOGMtMi42MjEwNSwtMi44MjI2NyAtNC43OTI2LC02LjQzMTQ5IC04LjUxMDg1LC03LjY1NTU3YzAsMCAtMi4zNDk0OCwtMC44NTQzNiAtMS40OTUxMywtMy4yMDM4NGMwLjg1NDM2LC0yLjM0OTQ4IDMuMjAzODQsLTEuNDk1MTMgMy4yMDM4NCwtMS40OTUxM2M0LjY1NzgxLDEuODAxNDUgNy4xMTI2Myw1LjM0MDg1IDEwLjQ2NjEsOC45NTIyOGM0LjI2MzA0LDQuNTkwOTcgOC41OTk5Niw5LjEzNzc0IDEwLjU2ODk3LDE1LjI5MjMyYzAuMDgzMTcsMC4yNTk5OCAxLjcyODI4LDkuNzMwNjkgMS44MTMwNSwxMC4yMTc1M2MyLjUyODgsMTQuNTI0IC0wLjQ4MDc0LDMzLjY5MzM1IC0xNC4wNDU2OCw0MS44NTg5N2MtMi45MTU0MiwxLjIwNDEyIC01Ljg3NDExLDIuMzA4NjIgLTguODY2MjIsMy4zMDcwNGwwLjQ4OTIsLTAuMTE1OTVjMCwwIC0xLjc2Nzc3LDEuNzY3NzcgLTMuNTM1NTMsMHoiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48L2c+PC9nPjwvc3ZnPjwhLS1yb3RhdGlvbkNlbnRlcjo1Mi45NjMyNTU2Mjk5OTk3NjU6NDIuNDA5MjMzODk4NzA5Mzc0LS0+";

    // Name Was Not Clear for new people ☹
    // Ultra sound was more Understandable
    class soundContexting {
        constructor() {
            this.groups = {};
        }

        getInfo() {
            return {
                id: 'ultrasounddatripleblockk',
                name: 'Ultra sound',
                blockIconURI: icon,
                color1: '#d966e3',
                color2: '#6d3273',
                blocks: [
                    {
                        opcode: 'makeggroup',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'Make Group call it [nname]',
                        arguments: {
                            nname: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "My group"
                            }
                        }
                    },
                    {
                        opcode: 'allgroups',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'All groups'
                    },
                    {
                        opcode: 'isurl',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'Is [url] a possible Url',
                        arguments: {
                            url: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "https://url-to-audio-file"
                            }
                        }
                    },
                    {
                        opcode: 'stopsound',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'Stop sound url [url] in group [nname]',
                        arguments: {
                            url: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "https://..."
                            },
                            nname: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "My group"
                            }
                        }
                    },
                    {
                        opcode: 'addsound',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'Add Sound from [url] To group [nname]',
                        arguments: {
                            url: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "https://..."
                            },
                            nname: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "My group"
                            }
                        }
                    },
                    {
                        opcode: 'deletegroup',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'Delete group [nname]',
                        arguments: {
                            nname: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "My group"
                            }
                        }
                    },
                    {
                        opcode: 'playsound',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'Play sound url [url] (must be loaded) in group [nname]',
                        arguments: {
                            url: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "https://..."
                            },
                            nname: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "My group"
                            }
                        }
                    },
                    {
                        opcode: 'isgroupreal',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'Is there already group called [nname]',
                        arguments: {
                            nname: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "My group"
                            }
                        }
                    },
                    {
                        opcode: 'isloaded',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'Is url sound [url] loaded in group called [nname]',
                        arguments: {
                            url: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "https://..."
                            },
                            nname: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "My group"
                            }
                        }
                    },
                ]
            };
        }
        makeggroup(args) {
            const namee = Scratch.Cast.toString(args.nname);
            this.groups[namee] = {
                context: new AudioContext(),
                sounds: {},
            };
        }
        isurl(args) {
            const link = Scratch.Cast.toString(args.url);
            try {
                // Not Urls will erorr
                new URL(link);
            } catch {
                return false;
            }
            return true;
        }
        allgroups() {
            const groups = Object.getOwnPropertyNames(this.groups);
            return JSON.stringify(groups);
        }

        isloaded(args) {
            const link = Scratch.Cast.toString(args.url);
            const namee = Scratch.Cast.toString(args.nname);
            const group = this.groups[namee];
            if (!group) {
                return;
            }
            return link in group.sounds;
        }

        deletegroup(args) {
            const namee = Scratch.Cast.toString(args.nname);
            if (!(namee in this.groups)) {
                return;
            }
            delete this.groups[namee];
        }
        isgroupreal(args) {
            const namee = Scratch.Cast.toString(args.nname);
            return namee in this.groups;
        }
        stopsound(args) {
            const link = Scratch.Cast.toString(args.url);
            const namee = Scratch.Cast.toString(args.nname);
            const group = this.groups[namee];
            if (!group) {
                return;
            }
            const sound = group.sounds[link];
            if (!sound) {
                return;
            }
            if (!sound.node) {
                return;
            }
            sound.node.stop();
            sound.node = null;
        }
        playsound(args) {
            const link = Scratch.Cast.toString(args.url);
            const namee = Scratch.Cast.toString(args.nname);
            const group = this.groups[namee];
            if (!group) {
                return;
            }
            const sound = group.sounds[link];
            if (!sound) {
                return;
            }
            if (sound.node) {
                sound.node.stop();
                sound.node = null;
            }
            sound.node = group.context.createBufferSource();
            sound.node.buffer = group.sounds[link].buffer;
            sound.node.connect(group.context.destination);
            sound.node.start(0);
        }
        async addsound(args) {
            const link = Scratch.Cast.toString(args.url);
            const namee = Scratch.Cast.toString(args.nname);
            const group = this.groups[namee];
            if (!group) {
                return;
            }

            let workedFirst = true;
            let arraaybuffer = null;
            try {
                const response = await Scratch.fetch(link);
                arraaybuffer = await response.arrayBuffer();
            } catch {
                // Try Cors
                workedFirst = false;
            }

            // cors
            let workedAtall = true;
            if (!workedFirst) {
                try {
                    const newLink = "https://corsproxy.io/?" + encodeURIComponent(link);
                    const response = await Scratch.fetch(newLink);
                    arraaybuffer = await response.arrayBuffer();
                } catch {
                    workedAtall = false;
                }
            }

            if (!workedAtall) {
                return console.warn("Couldnt Load Link :(");
            }

            // It worked
            // Decode Audio can Eooor in both ways sometimes
            try {
                group.context.decodeAudioData(arraaybuffer, buffer => {
                    group.sounds[link] = {
                        buffer,
                        node: null
                    };
                }, () => {
                    console.warn("Could Not Load :(");
                });
            } catch {
                console.warn("Could Not Load :( ");
            }
        }
    }

    Scratch.extensions.register(new soundContexting());
})(Scratch);
