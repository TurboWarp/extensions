const Icon='data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgdmlld0JveD0iMCwwLDgwLDgwIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjAwLC0xNDApIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTIwMCwxODBjMCwtMjIuMDkxMzkgMTcuOTA4NjEsLTQwIDQwLC00MGMyMi4wOTEzOSwwIDQwLDE3LjkwODYxIDQwLDQwYzAsMjIuMDkxMzkgLTE3LjkwODYxLDQwIC00MCw0MGMtMjIuMDkxMzksMCAtNDAsLTE3LjkwODYxIC00MCwtNDB6IiBmaWxsPSIjZmY5NDk0IiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMCIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiLz48cGF0aCBkPSJNMjE1LjU5OTEyLDIwNC4yOTA5N3YtMzguMDQ2NDRNMjIxLjY5OTU3LDIwNC4yOTA5N3YtNDguNTgxOTRNMjI3Ljc5OTcxLDIwNC4yOTA5N3YtMzIuNjU1OTlNMjMzLjkwMDE2LDIwNC4yOTA5N3YtMjguOTgwODZNMjQwLDIwNC4yOTA5N3YtMTguNDQ1MzVNMjQ2LjEwMDQ1LDIwNC4yOTA5N3YtMzguMDQ2NDRNMjUyLjIwMDU5LDIwNC4yOTA5N3YtMjguOTgwODZNMjU4LjMwMDc0LDIwNC4yOTA5N3YtNDguNTgxOTRNMjY0LjQwMDg4LDIwNC4yOTA5N3YtMzIuNjU1OTkiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIzLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxnIHN0cm9rZS1saW5lY2FwPSJidXR0Ij48cGF0aCBkPSJNMjM2LjMzMDIyLDE3NS4xMDQ0MmMtMy4xMTA4LC01LjQ0NTg4IC0xLjIxODE1LC0xMi4zODI4OCA0LjIyNzczLC0xNS40OTM5M2M1LjQ0NjEzLC0zLjExMDggMTIuMzgyODgsLTEuMjE4MTUgMTUuNDkzOTMsNC4yMjc5OWMzLjExMTA1LDUuNDQ1ODggMS4yMTgxNSwxMi4zODI2MiAtNC4yMjc3MywxNS40OTM2N2MtNS40NDYxMywzLjExMTA1IC0xMi4zODI4OCwxLjIxODE1IC0xNS40OTM5MywtNC4yMjc3M3oiIGZpbGwtb3BhY2l0eT0iMC41IiBmaWxsPSIjNTk1OTU5IiBzdHJva2U9IiM0ZTRlNGUiIHN0cm9rZS13aWR0aD0iMiIvPjxwYXRoIGQ9Ik0yNDQuMDg2NjQsMTYyLjQzMTk2YzAuNzY1NSwtMC44NzE4MiAyLjYwNzAzLC0wLjk4NTMgNC4zMDQxNSwtMC43NDI3NWMxLjcwMDQ1LDAuMjQzMDcgMy41MTU5MSwyLjEzOTMgMy4wNTA5OSwzLjIwNTExYy0wLjMzODE1LDAuNzc0NyAtMS40NjgzNywtMS4wMTExMiAtMy4zNTMzNSwtMS41MzY2MWMtMS42NTMxNiwtMC40NjA1OCAtNC42NTEyNSwtMC4xODYwNyAtNC4wMDE3OSwtMC45MjU3NXpNMjQ0LjgxNDU3LDE2NC44MDk0N2MwLjQ3MDAzLC0wLjUzNTIxIDEuNjAwMjYsLTAuNjA0NzMgMi42NDE3OSwtMC40NTU3MmMxLjA0MzgzLDAuMTQ5MDEgMi4xNTgyMSwxLjMxMjk3IDEuODcyNzIsMS45NjcwM2MtMC4yMDcyOCwwLjQ3NTQgLTAuOTAxMjEsLTAuNjIwNTggLTIuMDU4MjcsLTAuOTQzMTNjLTEuMDE0NywtMC4yODI2OCAtMi44NTQ5NSwtMC4xMTQyNSAtMi40NTYyMywtMC41NjgxOHoiIGZpbGwtb3BhY2l0eT0iMC43MDUiIGZpbGw9IiNmZmZmZmYiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIi8+PHBhdGggZD0iTTI2OC4xMDY1OCwxODguMzY5MzRsLTE0LjE3NDU3LC0xMC4wNTI2NWwyLjg0MzcxLC00LjAwOTk3bDE0LjE3NDU3LDEwLjA1MjY1eiIgZmlsbD0iIzAwMDAwMCIgc3Ryb2tlPSIjNGU0ZTRlIiBzdHJva2Utd2lkdGg9IjEuNSIvPjxwYXRoIGQ9Ik0yNTYuMjU5NDIsMTc5LjI1MDg3bC0xLjUwOTUyLC0xLjA3MDQybDIuMTU5NzQsLTMuMDQ1MzdsMS41MDk1MiwxLjA3MDY3eiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiLz48L2c+PC9nPjwvZz48L3N2Zz48IS0tcm90YXRpb25DZW50ZXI6NDA6NDAtLT4=';

(function(Scratch) {
  'use strict';
  const vm = Scratch.vm;
  Scratch.translate.setup({
    zh: {
      'qxsckdataanalysis.name': '数据分析',
      'qxsckdataanalysis.average': '[NUMBERS] 的平均数',
      'qxsckdataanalysis.maximum': '[NUMBERS] 的最大数',
      'qxsckdataanalysis.minimum': '[NUMBERS] 的最小数',
      'qxsckdataanalysis.median': '[NUMBERS] 的中位数',
      'qxsckdataanalysis.mode': '[NUMBERS] 的众数',
      'qxsckdataanalysis.variance': '[NUMBERS] 的方差',
      'qxsckdataanalysis.countNumebrs':'[NUMBERS] 每个数字出现的 [TYPE]',
      'qxsckdataanalysis.averageInList': '列表 [NUMBERS] 里所有数据的平均数',
      'qxsckdataanalysis.maximumInList': '列表 [NUMBERS] 里所有数据的最大数',
      'qxsckdataanalysis.minimumInList': '列表 [NUMBERS] 里所有数据的最小数',
      'qxsckdataanalysis.medianInList': '列表 [NUMBERS] 里所有数据的中位数',
      'qxsckdataanalysis.modeInList': '列表 [NUMBERS] 里所有数据的众数',
      'qxsckdataanalysis.varianceInList': '列表 [NUMBERS] 里所有数据的方差',
      'qxsckdataanalysis.countNumebrsInList':'列表 [NUMBERS] 每个数字出现的 [TYPE]',

      'qxsckdataanalysis.value.count': '次数',
      'qxsckdataanalysis.value.fre': '频率',
    },
    en: {
      'qxsckdataanalysis.name': 'data analysis',
      'qxsckdataanalysis.average': 'average of [NUMBERS]',
      'qxsckdataanalysis.maximum': 'maximum of [NUMBERS]',
      'qxsckdataanalysis.minimum': 'maximum of [NUMBERS]',
      'qxsckdataanalysis.median': 'minimum of [NUMBERS]',
      'qxsckdataanalysis.mode': 'mode of [NUMBERS]',
      'qxsckdataanalysis.variance': 'variance of [NUMBERS]',
      'qxsckdataanalysis.countNumebrs':'the [TYPE] that each numbers in [NUMBER]',
      'qxsckdataanalysis.averageInList': 'average of list [NUMBERS]',
      'qxsckdataanalysis.maximumInList': 'maximum of list [NUMBERS]',
      'qxsckdataanalysis.minimumInList': 'minimum of list [NUMBERS]',
      'qxsckdataanalysis.medianInList': 'median of list [NUMBERS]',
      'qxsckdataanalysis.modeInList': 'mode of list [NUMBERS]',
      'qxsckdataanalysis.varianceInList': 'variance of list [NUMBERS]',
      'qxsckdataanalysis.countNumebrsInlist':'the [TYPE] that each numbers in list [NUMBER]',

      'qxsckdataanalysis.value.count': 'count',
      'qxsckdataanalysis.value.fre': 'frequency',
    }
  });

  class dataAnalysis {
    getInfo() {
      return {
        id: 'qxsckdataanalysis',
        name: Scratch.translate({ id: 'qxsckdataanalysis.name', default: 'Data Analysis' }),
        color1: '#ff9494',
        color2: '#ff9494',
        blockIconURI: Icon,
        menuIconURI: Icon,
        blocks: [
          {
            opcode: 'average',
            blockType: 'reporter',
            text: Scratch.translate({ id: 'qxsckdataanalysis.average', default: 'average of [NUMBERS]' }),
            arguments: {
              NUMBERS: {
                type: 'string',
                defaultValue: '1 2 3 4 5'
              }
            }
          },
          {
            opcode: 'maximum',
            blockType: 'reporter',
            text: Scratch.translate({ id: 'qxsckdataanalysis.maximum', default: 'maximum of [NUMBERS]' }),
            arguments: {
              NUMBERS: {
                type: 'string',
                defaultValue: '1 2 3 4 5'
              }
            }
          },
          {
            opcode: 'minimum',
            blockType: 'reporter',
            text: Scratch.translate({ id: 'qxsckdataanalysis.minimum', default: 'minimum of [NUMBERS]' }),
            arguments: {
              NUMBERS: {
                type: 'string',
                defaultValue: '1 2 3 4 5'
              }
            }
          },
          {
            opcode: 'median',
            blockType: 'reporter',
            text: Scratch.translate({ id: 'qxsckdataanalysis.median', default: 'median of [NUMBERS]' }),
            arguments: {
              NUMBERS: {
                type: 'string',
                defaultValue: '1 2 3 4 5'
              }
            }
          },
          {
            opcode: 'mode',
            blockType: 'reporter',
            text: Scratch.translate({ id: 'qxsckdataanalysis.mode', default: 'mode of [NUMBERS]' }),
            arguments: {
              NUMBERS: {
                type: 'string',
                defaultValue: '1 2 2 3 4 5'
              }
            }
          },
          {
            opcode: 'variance',
            blockType: 'reporter',
            text: Scratch.translate({ id: 'qxsckdataanalysis.variance', default: 'variance of [NUMBERS]' }),
            arguments: {
              NUMBERS: {
                type: 'string',
                defaultValue: '1 2 3 4 5'
              }
            }
          },
          {
            opcode: 'countNumebrs',
            blockType: 'reporter',
            text: Scratch.translate({ id: 'qxsckdataanalysis.countNumebrs', default: 'the [TYPE] that each numbers in [NUMBER]' }),
            arguments: {
              NUMBERS: {
                type: 'string',
                defaultValue: '1 2 3 4 5'
              },
              TYPE: {
                type: 'string',
                menu: 'countNumebrsList'
              },
            }
          },

          {
            opcode: 'averageInList',
            blockType: 'reporter',
            text: Scratch.translate({ id: 'qxsckdataanalysis.averageInList', default: 'average of list [NUMBERS]' }),
            arguments: {
                NUMBERS: {
                  type: 'string',
                  menu: 'listMenu'
                }
            },
            disableMonitor: true,
          },
          {
            opcode: 'maximumInList',
            blockType: 'reporter',
            text: Scratch.translate({ id: 'qxsckdataanalysis.maximumInList', default: 'maximum of list [NUMBERS]' }),
            arguments: {
                NUMBERS: {
                  type: 'string',
                  menu: 'listMenu'
                }
            },
            disableMonitor: true,
          },
          {
            opcode: 'minimumInList',
            blockType: 'reporter',
            text: Scratch.translate({ id: 'qxsckdataanalysis.minimumInList', default: 'minimum of list [NUMBERS]' }),
            arguments: {
                NUMBERS: {
                  type: 'string',
                  menu: 'listMenu'
                }
              },
              disableMonitor: true,
          },
          {
            opcode: 'medianInList',
            blockType: 'reporter',
            text: Scratch.translate({ id: 'qxsckdataanalysis.medianInList', default: 'median of list [NUMBERS]' }),
            arguments: {
                NUMBERS: {
                  type: 'string',
                  menu: 'listMenu'
                }
            },
            disableMonitor: true,
          },
          {
            opcode: 'modeInList',
            blockType: 'reporter',
            text: Scratch.translate({ id: 'qxsckdataanalysis.modeInList', default: 'mode of list [NUMBERS]' }),
            arguments: {
                NUMBERS: {
                  type: 'string',
                  menu: 'listMenu'
                }
            },
            disableMonitor: true,
          },
          {
            opcode: 'varianceInList',
            blockType: 'reporter',
            text: Scratch.translate({ id: 'qxsckdataanalysis.varianceInList', default: 'variance of list [NUMBERS]' }),
            arguments: {
                NUMBERS: {
                  type: 'string',
                  menu: 'listMenu'
                }
            },
            disableMonitor: true,
          },
          {
            opcode: 'countNumebrsInList',
            blockType: 'reporter',
            text: Scratch.translate({ id: 'qxsckdataanalysis.countNumebrsInList', default: 'the [TYPE] that each numbers in list [NUMBER]' }),
            arguments: {
              NUMBERS: {
                type: 'string',
                menu: 'listMenu'
              },
              TYPE: {
                type: 'string',
                menu: 'countNumebrsList'
              },
            },
            disableMonitor: true,
          },
        ],
        menus: {
          listMenu: {
              items: 'findAllList'
          },
          countNumebrsList:[
            {
              text:Scratch.translate({ id: 'qxsckdataanalysis.value.count', default: 'count' }),
              value:'count',
            },
            {
              text:Scratch.translate({ id: 'qxsckdataanalysis.value.fre', default: 'frequency' }),
              value:'fre',
            }
          ],
        }
      };
    }

    findAllList() {
      const list = [];
      const variables = vm.runtime.targets[0].variables;
      Object.keys(variables).forEach(obj => {
        if (variables[obj].type === 'list') {
        list.push({
            text: variables[obj].name,
            value: variables[obj].name,
        });
        }
      });
      if (list.length === 0) {
          list.push({
            text: `-`,
            value: 'empty'
          });
      }
      return list;
    }

    average(args) {
      const numbers = String(args.NUMBERS).split(' ').map(Number);
      const sum = numbers.reduce((a, b) => a + b, 0);
      return sum / numbers.length;
    }
    maximum(args) {
      const numbers = String(args.NUMBERS).split(' ').map(Number);
      return Math.max(...numbers);
    }
    minimum(args) {
      const numbers = String(args.NUMBERS).split(' ').map(Number);
      return Math.min(...numbers);
    }
    median(args) {
      const numbers = String(args.NUMBERS).split(' ').map(Number);
      const sorted = numbers.sort((a, b) => a - b);
      const middle = Math.floor(sorted.length / 2);
      if (sorted.length % 2 === 0) {
        return (sorted[middle - 1] + sorted[middle]) / 2;
      } else {
        return sorted[middle];
      }
    }
    mode(args) {
      const numbers = String(args.NUMBERS).split(' ').map(Number);
      const counts = new Map();
      let maxCount = 0;
      let mode = null;
      for (const number of numbers) {
        let count = counts.get(number) || 0;
        count++;
        counts.set(number, count);
        if (count > maxCount) {
          maxCount = count;
          mode = number;
        }
      }
      return mode;
    }
    variance(args) {
      const numbers = String(args.NUMBERS).split(' ').map(Number);
      const mean = numbers.reduce((a, b) => a + b, 0) / numbers.length;
      const squaredDifferences = numbers.map(x => (x - mean) ** 2);
      const sum = squaredDifferences.reduce((a, b) => a + b, 0);
      return sum / numbers.length;
    }
    countNumebrs(args){
      var type_=String(args.TYPE);
      const numbers = String(args.NUMBERS).split(' ').map(Number);
      const counts = new Map();
      for (const number of numbers) {
        let count = counts.get(number) || 0;
        count++;
        counts.set(number, count);
      }
      var result=new Object;
      if(type_==='count'){
        for (const [key, value] of counts) {
          var key1=String(key),value1=String(value);
          result[key1]=value1;
        }
        return JSON.stringify(result);
      }else if(type_==='fre'){
        var length=numbers.length;
        for (const [key, value] of counts) {
          var key1=String(key);
          result[key1]=String(Math.round((value/length)*100)/100);
        }
        return JSON.stringify(result);
      }
      return 0;
    }

    averageInList(args, util) {
      if(args.NUMBERS!='empty'){
        const list = util.target.lookupVariableByNameAndType(String(args.NUMBERS), 'list');
        var nums=list.value;
        nums=nums.map(Number);
        const sum = nums.reduce((sum, rep) => sum + rep, 0);
        return sum / nums.length;
      }
      else return -1;
    }
    maximumInList(args, util) {
      if(args.NUMBERS!='empty'){
        const list = util.target.lookupVariableByNameAndType(String(args.NUMBERS), 'list');
        var nums=list.value;
        nums=nums.map(Number);
        return Math.max(...nums);
      }
      else return -1;
    }
    minimumInList(args, util) {
      if(args.NUMBERS!='empty'){
        const list = util.target.lookupVariableByNameAndType(String(args.NUMBERS), 'list');
        var nums=list.value;
        nums=nums.map(Number);
            return Math.min(...nums);
      }
      else return -1;
    }
    medianInList(args, util) {
      if(args.NUMBERS!='empty'){
        const list = util.target.lookupVariableByNameAndType(String(args.NUMBERS), 'list');
        var nums=list.value;
        nums=nums.map(Number);
        const sorted = nums.sort((a, b) => a - b);
        const middle = Math.floor(sorted.length / 2);
        if (sorted.length % 2 === 0) return (sorted[middle - 1] + sorted[middle]) / 2;
        else return sorted[middle];
      }
      else return -1;
    }
    modeInList(args, util) {
      if(args.NUMBERS!='empty'){
        const list = util.target.lookupVariableByNameAndType(String(args.NUMBERS), 'list');
        var nums=list.value;
        nums=nums.map(Number);
        const counts = new Map();
        let maxCount = 0;
        let mode = null;
        for (const number of nums){
          let count = counts.get(number) || 0;
          count++;
          counts.set(number, count);
          if (count > maxCount) {
            maxCount = count;
            mode = number;
          }
        }
        return mode;
      }
      else return -1;
    }
    varianceInList(args, util) {
      if(args.NUMBERS!='empty'){
        const list = util.target.lookupVariableByNameAndType(String(args.NUMBERS), 'list');
        var nums=list.value;
        nums=nums.map(Number);
        const mean = nums.reduce((sum, rep) => sum + rep, 0) / nums.length;
        const squaredDifferences = nums.map(x => (x - mean) ** 2);
        const sum2 = squaredDifferences.reduce((sum, rep) => sum + rep, 0);
        return sum2 / nums.length;
      }
      else return -1;
    }
    countNumebrsInList(args,util){
      var type_=String(args.TYPE);
      const list = util.target.lookupVariableByNameAndType(String(args.NUMBERS), 'list');
      const numbers = list.value;
      const counts = new Map();
      for (const number of numbers) {
        let count = counts.get(number) || 0;
        count++;
        counts.set(number, count);
      }
      var result=new Object;
      if(type_==='count'){
        for (const [key, value] of counts) {
          var key1=String(key),value1=String(value);
          result[key1]=value1;
        }
        return JSON.stringify(result);
      }else if(type_==='fre'){
        var length=numbers.length;
        for (const [key, value] of counts) {
          var key1=String(key);
          result[key1]=String(Math.round((value/length)*100)/100);
        }
        return JSON.stringify(result);
      }
      return 0;
    }
  }

  Scratch.extensions.register(new dataAnalysis());
})(Scratch);
