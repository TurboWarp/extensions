//original extension by -SPIC- | Updated by SharkPool
(function (Scratch) {
    'use strict';

    const icon = 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI4MS44ODU0IiBoZWlnaHQ9IjgwLjYwMzA4IiB2aWV3Qm94PSIwLDAsODEuODg1NCw4MC42MDMwOCI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE5OS4wNTczLC0xMzkuNjk4NDYpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTI4MC45NDI3LDE4MGMwLDIyLjI1NzkyIC0xOC4zMzA2Nyw0MC4zMDE1NCAtNDAuOTQyNyw0MC4zMDE1NGMtMjIuNjEyMDMsMCAtNDAuOTQyNywtMTguMDQzNjEgLTQwLjk0MjcsLTQwLjMwMTU0YzAsLTIyLjI1NzkyIDE4LjMzMDY3LC00MC4zMDE1NCA0MC45NDI3LC00MC4zMDE1NGMyMi42MTIwMywwIDQwLjk0MjcsMTguMDQzNjEgNDAuOTQyNyw0MC4zMDE1NHoiIGZpbGw9IiNmZjgwMDAiIHN0cm9rZS13aWR0aD0iMCIvPjxwYXRoIGQ9Ik0yNjYuNTM0MzcsMTgwYzAsMTQuNjQxMjkgLTExLjg5MzA4LDI2LjUzNDM3IC0yNi41MzQzNywyNi41MzQzN2MtMTQuNjQxMjksMCAtMjYuNTM0MzcsLTExLjg5MzA4IC0yNi41MzQzNywtMjYuNTM0MzdjMCwtMTQuNjQxMjkgMTEuODkzMDgsLTI2LjUzNDM3IDI2LjUzNDM3LC0yNi41MzQzN2MxNC42NDEyOSwwIDI2LjUzNDM3LDExLjg5MzA4IDI2LjUzNDM3LDI2LjUzNDM3ek0yNTMuMjE5OCwxODUuOTcwMjNsLTExLjMyNDQ5LC02LjUzODgzdi0xNC41OTM5aC0zLjc5MDYydjE3LjA1NzgxaDAuNTIxMjFsMTIuNjk4NTksNy4zNDQzM3oiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMSIvPjwvZz48L2c+PC9zdmc+PCEtLXJvdGF0aW9uQ2VudGVyOjQwLjk0MjY5NjA1MzgwMTE0OjQwLjMwMTUzNTI2NTQ4NjcwNi0tPg==';
    const icon2 = 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxNzUiIGhlaWdodD0iMTc1IiB2aWV3Qm94PSIwLDAsMTc1LDE3NSI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE1Mi41LC05Mi41KSI+PGcgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aXNQYWludGluZ0xheWVyJnF1b3Q7OnRydWV9IiBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTMyNy41LDE4MGMwLDQ4LjI4MTI1IC0zOS4yMTg3NSw4Ny41IC04Ny41LDg3LjVjLTQ4LjI4MTI1LDAgLTg3LjUsLTM5LjIxODc1IC04Ny41LC04Ny41YzAsLTQ4LjI4MTI1IDM5LjIxODc1LC04Ny41IDg3LjUsLTg3LjVjNDguMjgxMjUsMCA4Ny41LDM5LjIxODc1IDg3LjUsODcuNXpNMjgzLjU5Mzc1LDE5OS42ODc1bC0zNy4zNDM3NSwtMjEuNTYyNXYtNDguMTI1aC0xMi41djU2LjI1aDEuNzE4NzVsNDEuODc1LDI0LjIxODc1eiIvPjwvZz48L2c+PC9zdmc+PCEtLXJvdGF0aW9uQ2VudGVyOjg3LjU6ODcuNS0tPg==';

    class Time {
        constructor(runtime) {
            this.runtime = runtime;
        }

        getInfo() {
            return {
                id: 'sipctime',
                name: 'Time',
                color1: '#ff8000',
                color2: '#804000',
                color3: '#804000',
                menuIconURI: icon,
                blockIconURI: icon2,
                blocks: [
                    {
                        opcode: 'timestamp',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'the current timestamp',
                        arguments: {}
                    },
                    {
                        opcode: 'timezone',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'the current time zone',
                        arguments: {}
                    },
                    {
                        opcode: 'timedata',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'extract [TIMEDATA] from [TIMESTAMP]',
                        arguments: {
                            TIMESTAMP: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: '1145141980000'
                            },
                            TIMEDATA: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'time',
                                defaultValue: 'Year'
                            }
                        }
                    },
                    {
                        opcode: 'timestamptotime',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'convert [TIMESTAMP] to a datetime',
                        arguments: {
                            TIMESTAMP: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: '1145141980000'
                            }
                        }
                    },
                    {
                        opcode: 'timetotimestamp',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'convert [TIME] to a timestamp',
                        arguments: {
                            TIME: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '2006-04-16 06:59:40'
                            }
                        }
                    },
                    {
                        opcode: 'calculatetimedurationfromdate', //This block and the ones that follow were made by SharkPool
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'time duration from [DATE] to current date in [TIME_MENU]',
                        arguments: {
                            DATE: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '2006-04-16'
                            },
                            TIME_MENU: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'time',
                                defaultValue: 'Day'
                            }
                        }
                    },
                    {
                        opcode: 'calculatetimedurationfromtime',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'time duration from [START_HOUR]:[START_MINUTE] to current time in [TIME_MENU]',
                        arguments: {
                            START_HOUR: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            START_MINUTE: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            },
                            TIME_MENU: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'time',
                                defaultValue: 'Hour'
                            }
                        }
                    },
                    {
                        opcode: 'calculatetimedifference',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'difference between [START_TIME] and [END_TIME] in [TIME_MENU]',
                        arguments: {
                            START_TIME: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '00:00'
                            },
                            END_TIME: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '00:00'
                            },
                            TIME_MENU: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'time',
                                defaultValue: 'Hour'
                            }
                        }
                    },
                    {
                        opcode: 'converttotime',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'convert [VALUE] to time (day:hour:minute)',
                        arguments: {
                            VALUE: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0
                            }
                        }
                    },
                    {
                        opcode: 'daysinmonth',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'number of days in [MONTH] [YEAR]',
                        arguments: {
                            MONTH: {
                                type: Scratch.ArgumentType.STRING,
                                menu: 'months',
                                defaultValue: 'January'
                            },
                            YEAR: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '2000'
                            }
                        }
                    }
                ],
                menus: {
                    time: {
                        acceptReporters: true,
                        items: ['Year', 'Month', 'Day', 'Hour', 'Minute', 'Second']
                    },
                    months: {
                        acceptReporters: true,
                        items: [
                            'January',
                            'February',
                            'March',
                            'April',
                            'May',
                            'June',
                            'July',
                            'August',
                            'September',
                            'October',
                            'November',
                            'December'
                        ]
                    }
                }
            };
        }

        timestamp() {
            return Date.now();
        }

        timezone() {
            return 'UTC+' + new Date().getTimezoneOffset() / -60;
        }

        timedata(args) {
            const timestamp = args.TIMESTAMP ? args.TIMESTAMP : null;
            const date = new Date(timestamp);

            switch (args.TIMEDATA) {
                case 'Year':
                    return date.getFullYear();
                case 'Month':
                    return ('0' + (date.getMonth() + 1)).slice(-2);
                case 'Day':
                    return ('0' + date.getDate()).slice(-2);
                case 'Hour':
                    return ('0' + date.getHours()).slice(-2);
                case 'Minute':
                    return ('0' + date.getMinutes()).slice(-2);
                case 'Second':
                    return ('0' + date.getSeconds()).slice(-2);
                default:
                    return '';
            }
        }

        timestamptotime(args) {
            const timestamp = args.TIMESTAMP ? args.TIMESTAMP : null;
            const date = new Date(timestamp);

            const year = date.getFullYear();
            const month = ('0' + (date.getMonth() + 1)).slice(-2);
            const day = ('0' + date.getDate()).slice(-2);
            const hour = ('0' + date.getHours()).slice(-2);
            const minute = ('0' + date.getMinutes()).slice(-2);
            const second = ('0' + date.getSeconds()).slice(-2);

            return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
        }

        timetotimestamp(args) {
            const time = args.TIME ? args.TIME : null;
            const date = new Date(time);
            return date.getTime();
        }

        calculatetimedurationfromdate(args) {
            const dateString = args.DATE ? args.DATE : null;
            const timeMenu = args.TIME_MENU ? args.TIME_MENU : null;

            const startDate = new Date(dateString);
            const endDate = new Date();
            const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());

            switch (timeMenu) {
                case 'Year':
                    return Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365));
                case 'Month':
                    return Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30));
                case 'Day':
                    return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
                case 'Hour':
                    return Math.floor(timeDiff / (1000 * 60 * 60));
                case 'Minute':
                    return Math.floor(timeDiff / (1000 * 60));
                case 'Second':
                    return Math.floor(timeDiff / 1000);
                default:
                    return '';
            }
        }

        calculatetimedurationfromtime(args) {
            const startHour = args.START_HOUR ? args.START_HOUR : null;
            const startMinute = args.START_MINUTE ? args.START_MINUTE : null;
            const timeMenu = args.TIME_MENU ? args.TIME_MENU : null;

            const startDate = new Date();
            startDate.setHours(startHour, startMinute, 0, 0);
            const endDate = new Date();
            const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());

            switch (timeMenu) {
                case 'Year':
                    return Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365));
                case 'Month':
                    return Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30));
                case 'Day':
                    return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
                case 'Hour':
                    return Math.floor(timeDiff / (1000 * 60 * 60));
                case 'Minute':
                    return Math.floor(timeDiff / (1000 * 60));
                case 'Second':
                    return Math.floor(timeDiff / 1000);
                default:
                    return '';
            }
        }

        calculatetimedifference(args) {
            const startTime = args.START_TIME ? args.START_TIME : null;
            const endTime = args.END_TIME ? args.END_TIME : null;
            const timeMenu = args.TIME_MENU ? args.TIME_MENU : null;

            const startDate = new Date();
            const endDate = new Date();
            const startHour = parseInt(startTime.split(':')[0]);
            const startMinute = parseInt(startTime.split(':')[1]);
            const endHour = parseInt(endTime.split(':')[0]);
            const endMinute = parseInt(endTime.split(':')[1]);
            startDate.setHours(startHour, startMinute, 0, 0);
            endDate.setHours(endHour, endMinute, 0, 0);
            const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());

            switch (timeMenu) {
                case 'Year':
                    return Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 365));
                case 'Month':
                    return Math.floor(timeDiff / (1000 * 60 * 60 * 24 * 30));
                case 'Day':
                    return Math.floor(timeDiff / (1000 * 60 * 60 * 24));
                case 'Hour':
                    return Math.floor(timeDiff / (1000 * 60 * 60));
                case 'Minute':
                    return Math.floor(timeDiff / (1000 * 60));
                case 'Second':
                    return Math.floor(timeDiff / 1000);
                default:
                    return '';
            }
        }

        converttotime(args) {
            const value = args.VALUE ? args.VALUE : 0;
            const seconds = Math.floor(value);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);

            const timeString = `${hours % 24}:${minutes % 60}:${seconds % 60}`;
            return timeString;
        }

        daysinmonth(args) {
            const month = args.MONTH ? args.MONTH : null;
            const year = args.YEAR ? args.YEAR : null;
            const date = new Date(year, this._getMonthIndex(month) + 1, 0);
            return date.getDate();
        }

        _getMonthIndex(month) {
            const months = [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
                'July',
                'August',
                'September',
                'October',
                'November',
                'December'
            ];
            return months.indexOf(month);
        }
    }

    Scratch.extensions.register(new  Time());
})(Scratch);
