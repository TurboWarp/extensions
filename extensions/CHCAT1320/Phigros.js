// Name:Phigros
// ID: chcatPhigros
// Description: the extensions use for Phigros Game's Chart
// By: CHCAT1320
// License: MIT
(function (Scratch) {
    "use strict"
    const vm = Scratch.vm
    const canvas = vm.renderer.canvas
    const blocksIcon = "data:image/png;base64,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"
    class Phigros{
        constructor(){
            this.chart
        }
        getInfo() {
            return {
                id: 'chcatPhigros',
                name: 'Phigros by CHCAT1320|ver.0.0.2.alpha',
                blockIconURI: blocksIcon,
                color1: '#4C97FF',
                color2: '#337BCC',
                color3: '#2C6CA3',
                blocks: [
                    {
                        opcode: 'loadChart',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'Load chart file [ChartJson]',
                        arguments: {
                            ChartJson: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ''
                            }
                        }
                    },
                    {
                        opcode: 'getChartFile',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'Chart file',
                    },
                    {
                        opcode: 'getChartFileVer',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'Chart file version',
                    },
                    {
                        opcode: 'getChartOffset',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'Get chart offset',
                    },
                    {
                        opcode: 'getLineCount',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'Get number of judgment lines',
                    },
                    {
                        opcode: 'getLineBpm',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'Get BPM of line [lineNumber]',
                        arguments: {
                            lineNumber: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '0'
                            }
                        }
                    },
                    {
                        opcode: 'getLineNotes',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'Get [direction] notes on line [lineNumber]',
                        arguments: {
                            lineNumber: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '0'
                            },
                            direction: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "noteDirection",
                            }
                        }
                    },
                    {
                        opcode: 'getAllLinesNotes',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'Get all notes from all judgment lines',
                    },
                    {
                        opcode: 'getLineEvent',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'Get [event] of line [lineNumber]',
                        arguments: {
                            lineNumber: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '0'
                            },
                            event: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "lineEvent",
                            }
                        }
                    },
                    {
                        opcode: 'getLineState',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'Get [state] of line [lineNumber] at [time] seconds',
                        arguments: {
                            time: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '0'
                            },
                            lineNumber: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '0'
                            },
                            state: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "lineState"
                            }
                        }
                    },
                    {
                        opcode: "setList",
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'Set list [list] to [json]',
                        arguments: {
                            list: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "getList",
                            },
                            json: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: '',
                            },
                        },
                    },
                ],
                menus: {
                    getList: {
                        acceptReporters: true,
                        items: "getLists",
                    },
                    noteDirection: {
                        acceptReporters: true,
                        items: [
                            {
                                text: 'Above',
                                value: "aboveNote",
                            },
                            {
                                text: 'Below',
                                value: "belowNote",
                            },
                        ]
                    },
                    lineState: {
                        acceptReporters: true,
                        items: [
                            {
                                text: "X position",
                                value: "lineX"
                            },
                            {
                                text: "Y position",
                                value: "lineY"
                            },
                            {
                                text: "Rotation",
                                value: "lineR"
                            },
                            {
                                text: "Opacity",
                                value: "lineD"
                            },
                        ]
                    },
                    lineEvent: {
                        acceptReporters: true,
                        items: [
                            {
                                text: "Move events",
                                value: "m"
                            },
                            {
                                text: "Rotate events",
                                value: "r"
                            },
                            {
                                text: "Opacity events",
                                value: "d"
                            },
                            {
                                text: "Speed events",
                                value: "s"
                            }
                        ]
                    }
                }
            }
        }
        loadChart(args){
            if (args.ChartJson != ""){
                this.chart = JSON.parse(args.ChartJson)
            }else{
                this.chart = ""
                return
            }
            let chart = this.chart
            for (let i = 0; i < chart.judgeLineList.length; i++){
                let bpm = chart.judgeLineList[i].bpm
                for (let a = 0; a < chart.judgeLineList[i].notesAbove.length; a++){
                    chart.judgeLineList[i].notesAbove[a].time = (chart.judgeLineList[i].notesAbove[a].time / bpm) *  1.875
                }
                for (let a = 0; a < chart.judgeLineList[i].notesBelow.length; a++){
                    chart.judgeLineList[i].notesBelow[a].time = (chart.judgeLineList[i].notesBelow[a].time / bpm) *  1.875
                }
                for (let a = 0; a < chart.judgeLineList[i].speedEvents.length; a++) {
                    chart.judgeLineList[i].speedEvents[a].startTime = (chart.judgeLineList[i].speedEvents[a].startTime / bpm) * 1.875;
                    chart.judgeLineList[i].speedEvents[a].endTime = (chart.judgeLineList[i].speedEvents[a].endTime / bpm) * 1.875;
                    chart.judgeLineList[i].speedEvents[a].floorPosition = (chart.judgeLineList[i].speedEvents[a].endTime - chart.judgeLineList[i].speedEvents[a].startTime) * chart.judgeLineList[i].speedEvents[a].value
                }
                
                // // 计算 floorPosition
                // if (chart.judgeLineList[i].speedEvents.length > 0) {
                //     // 第一个事件的 floorPosition 初始化为 0
                //     chart.judgeLineList[i].speedEvents[0].floorPosition = 0;
                
                //     for (let a = 1; a < chart.judgeLineList[i].speedEvents.length; a++) {
                //     const prevEvent = chart.judgeLineList[i].speedEvents[a - 1];
                //     const currentEvent = chart.judgeLineList[i].speedEvents[a];
                
                //     // 计算时间差
                //     const timeDiff = currentEvent.startTime - prevEvent.startTime;
                
                //     // 计算 floorPosition
                //     currentEvent.floorPosition = prevEvent.floorPosition + prevEvent.value * timeDiff * (1.875 / bpm);
                //     }
                // }
                for (let a = 0; a < chart.judgeLineList[i].judgeLineMoveEvents.length; a++){
                    chart.judgeLineList[i].judgeLineMoveEvents[a].startTime = (chart.judgeLineList[i].judgeLineMoveEvents[a].startTime / bpm) *  1.875
                    chart.judgeLineList[i].judgeLineMoveEvents[a].endTime = (chart.judgeLineList[i].judgeLineMoveEvents[a].endTime / bpm) *  1.875
                    if (chart.formatVersion === 3){
                        chart.judgeLineList[i].judgeLineMoveEvents[a].start = (chart.judgeLineList[i].judgeLineMoveEvents[a].start - 0.5) * canvas.width
                        chart.judgeLineList[i].judgeLineMoveEvents[a].start2 = (chart.judgeLineList[i].judgeLineMoveEvents[a].start2 - 0.5) * canvas.height
                        chart.judgeLineList[i].judgeLineMoveEvents[a].end = (chart.judgeLineList[i].judgeLineMoveEvents[a].end - 0.5) * canvas.width
                        chart.judgeLineList[i].judgeLineMoveEvents[a].end2 = (chart.judgeLineList[i].judgeLineMoveEvents[a].end2 - 0.5) * canvas.height  
                    }
                }
                for (let a = 0; a < chart.judgeLineList[i].judgeLineRotateEvents.length; a++){
                    chart.judgeLineList[i].judgeLineRotateEvents[a].startTime = (chart.judgeLineList[i].judgeLineRotateEvents[a].startTime / bpm) *  1.875
                    chart.judgeLineList[i].judgeLineRotateEvents[a].endTime = (chart.judgeLineList[i].judgeLineRotateEvents[a].endTime / bpm) *  1.875
                    chart.judgeLineList[i].judgeLineRotateEvents[a].start = 90 - chart.judgeLineList[i].judgeLineRotateEvents[a].start
                    chart.judgeLineList[i].judgeLineRotateEvents[a].end = 90 - chart.judgeLineList[i].judgeLineRotateEvents[a].end
                }
                for (let a = 0; a < chart.judgeLineList[i].judgeLineDisappearEvents.length; a++){
                    chart.judgeLineList[i].judgeLineDisappearEvents[a].startTime = (chart.judgeLineList[i].judgeLineDisappearEvents[a].startTime / bpm) *  1.875
                    chart.judgeLineList[i].judgeLineDisappearEvents[a].endTime = (chart.judgeLineList[i].judgeLineDisappearEvents[a].endTime / bpm) *  1.875
                    chart.judgeLineList[i].judgeLineDisappearEvents[a].start = (1 - chart.judgeLineList[i].judgeLineDisappearEvents[a].start) * 100
                    chart.judgeLineList[i].judgeLineDisappearEvents[a].end = (1- chart.judgeLineList[i].judgeLineDisappearEvents[a].end) * 100
                }
            }
        }
        getChartFile(){
            return JSON.stringify(this.chart, null, 2)
        }
        getChartFileVer(){
            return this.chart.formatVersion
        }
        getChartOffset(){
            return this.chart.offset
        }
        getLineCount(){
            return this.chart.judgeLineList.length
        }
        getLineBpm(args){
            return this.chart.judgeLineList[args.lineNumber].bpm
        }
        getLineEvent(args){
            let choose = args.event
            if (choose === "m"){
                return JSON.stringify(this.chart.judgeLineList[args.lineNumber].judgeLineMoveEvents, null, 2)
            }
            if (choose === "r"){
                return JSON.stringify(this.chart.judgeLineList[args.lineNumber].judgeLineRotateEvents, null, 2)
            }
            if (choose === "d"){
                return JSON.stringify(this.chart.judgeLineList[args.lineNumber].judgeLineDisappearEvents, null, 2)
            }
            if (choose === "s"){
                return JSON.stringify(this.chart.judgeLineList[args.lineNumber].speedEvents, null, 2)
            }
        }
        getLineNotes(args){
            let choose = args.direction
            if (choose === "aboveNote"){
                return JSON.stringify(this.chart.judgeLineList[args.lineNumber].notesAbove, null, 2)
            }
            if (choose === "belowNote"){
                return JSON.stringify(this.chart.judgeLineList[args.lineNumber].notesBelow, null, 2)
            }
        }
        getAllLinesNotes(){
            let chart = this.chart
            var notes = []
            for (let i = 0; i < chart.judgeLineList.length; i++){
                for (let a = 0; a < chart.judgeLineList[i].notesAbove.length; a++){
                    let noteJson = chart.judgeLineList[i].notesAbove[a]
                    noteJson.lineNumber = i
                    noteJson.noteDirection = 1
                    notes.push(noteJson)
                }
                for (let a = 0; a < chart.judgeLineList[i].notesBelow.length; a++){
                    let noteJson = chart.judgeLineList[i].notesBelow[a]
                    noteJson.lineNumber = i
                    noteJson.noteDirection = -1
                    notes.push(noteJson)
                }
            }
            notes.sort((a, b) => a.time - b.time)
            return JSON.stringify(notes, null, 2)
        }
        linearInterpolation(sv, ev, st, et, t) {
            return (t - st) / (et - st) * (ev - sv) + sv;
        }
        findEvent(es, timer, skey, ekey) {
            for (let e of es) {
                if (e.startTime <= timer && timer<= e.endTime) {
                    return this.linearInterpolation(e[skey], e[ekey], e.startTime, e.endTime, timer);
                }
            }
            return 0.0;
        }
        // findSpeedEvent(es, timer, skey, ekey) {
        //     let Pk = 0
        //     for (let e of es) {
        //         if (e.startTime <= timer && timer<= e.endTime) {
        //             return Pk
        //         }
        //     }
        //     return 0.0;
        // }
        getLineState(args){
            let mE = this.chart.judgeLineList[args.lineNumber].judgeLineMoveEvents
            let rE = this.chart.judgeLineList[args.lineNumber].judgeLineRotateEvents
            let dE = this.chart.judgeLineList[args.lineNumber].judgeLineDisappearEvents
            let sE = this.chart.judgeLineList[args.lineNumber].speedEvents
            if (args.state === "lineX"){
                return this.findEvent(mE, args.time, "start", "end")
            }
            if (args.state === "lineY"){
                return this.findEvent(mE, args.time, "start2", "end2")
            }
            if (args.state === "lineR"){
                return this.findEvent(rE, args.time, "start", "end")
            }
            if (args.state === "lineD"){
                return this.findEvent(dE, args.time, "start", "end")
            }
            if (args.state === "lineFP"){
                return 0//this.findSpeedEvent(sE, args.time)
            }
        }
        getLists(){
            const globalLists = Object.values(
                vm.runtime.getTargetForStage().variables
            ).filter((x) => x.type === "list");
            const localLists = vm.editingTarget
                ? Object.values(vm.editingTarget.variables).filter(
                    (x) => x.type === "list"
                )
                : [];
            const uniqueLists = [...new Set([...globalLists, ...localLists])];
            if (uniqueLists.length === 0) {
                return [
                    {
                        text: '选择一个列表',
                        value: "选择一个列表",
                    },
                ];
            }
            return uniqueLists.map((i) => ({
                text: i.name,
                value: i.id,
            }));
        }
        // copy from skyhigh173's JSON
        lookupList(list, util) {
            const byId = util.target.lookupVariableById(list);
            if (byId && byId.type === "list") {
              return byId;
            }
            const byName = util.target.lookupVariableByNameAndType(list, "list");
            if (byName) {
              return byName;
            }
            return null;
          }
        setList({ list, json }, util) {
            try {
              let listVariable = this.lookupList(list, util);
              if (listVariable) {
                const array = JSON.parse(json);
                if (Array.isArray(array)) {
                  const safeArray = array.map((i) => {
                    if (typeof i === "object") return JSON.stringify(i);
                    return i;
                  });
                  listVariable.value = safeArray;
                }
              }
            } catch (e) {
              // ignore
            }
            return "";
          }
    }
    Scratch.extensions.register(new Phigros());
})(Scratch);