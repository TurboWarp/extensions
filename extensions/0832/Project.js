(function (Scratch) {
    'use strict';
    Scratch.translate.setup({
        zh: {
            '项目': '项目',
            '获取当前项目': '获取当前项目',
            '获取角色': '获取[角色]',
            '使用的块总数': '使用的块总数',
            '块种类数': '块种类数',
            '段数': '段数',
            '造型数': '造型数',
            '声音数': '声音数',
        }
    });
    function 计算() {
        const 信息 = vm.toJSON();
        const jsonData = JSON.parse(信息);
        const blocksUsed = {}; // 记录块类型的数量
        let segmentCount = 0; // 记录段数的数量
        let costumeCount = 0; // 记录造型数
        let soundCount = 0;   // 记录声音数

        for (let i = 0; i < jsonData.targets.length; i++) {
            const target = jsonData.targets[i];
            if (target.blocks) {
                for (const blockId in target.blocks) {
                    const block = target.blocks[blockId];
                    const blockType = block.opcode.split('_')[0]; // 获取块的类型

                    if (!blocksUsed[blockType]) {
                        blocksUsed[blockType] = 1;
                    } else {
                        blocksUsed[blockType]++;
                    }

                    // 统计段数的数量
                    if (block.topLevel && block.parent === null) {
                        segmentCount++;
                    }
                }
            }

            // 统计造型数
            if (target.costumes) {
                costumeCount += target.costumes.length;
            }

            // 统计声音数
            if (target.sounds) {
                soundCount += target.sounds.length;
            }
        }

        使用的块总数 = jsonData.targets.reduce((acc, target) => acc + Object.keys(target.blocks || {}).length, 0);
        块种类数 = Object.keys(blocksUsed).length;
        段数 = segmentCount;
        造型数 = costumeCount;
        声音数 = soundCount;
    }

    function 解析角色(角色名) {
        const 信息 = vm.toJSON();
        const jsonData = JSON.parse(信息);
        let 目标角色 = null;
    
        for (const target of jsonData.targets) {
            if (target.name === 角色名) {
                目标角色 = target;
                break;
            }
        }
    
        return 目标角色;
    }


    let 使用的块总数, 块种类数, 段数, 造型数, 声音数;
    class 项目 {
        getInfo() {
            return {
                //感谢 半岛的蒟蒻
                id: 'Project',
                name: Scratch.translate({ id: '项目', default: 'Project' }),
                blocks: [
                    {
                        opcode: '获取当前项目',
                        blockType: Scratch.BlockType.REPORTER,
                        text: Scratch.translate({ id: '获取当前项目', default: 'Get Current Project' })
                    },
                    {
                        opcode: '获取角色',
                        blockType: Scratch.BlockType.REPORTER,
                        text: Scratch.translate({ id: '获取角色', default: 'Get [角色]' }),
                        arguments: {
                            角色: {
                                type: Scratch.ArgumentType.STRING,
                                menu: "角色列表"
                            }
                        }
                    },
                    '---',
                    {
                        opcode: '使用的块总数',
                        blockType: Scratch.BlockType.REPORTER,
                        text: Scratch.translate({ id: '使用的块总数', default: 'Total Used Blocks' })
                    },
                    {
                        opcode: '块种类数',
                        blockType: Scratch.BlockType.REPORTER,
                        text: Scratch.translate({ id: '块种类数', default: 'Number of Block Types' })
                    },
                    {
                        opcode: '段数',
                        blockType: Scratch.BlockType.REPORTER,
                        text: Scratch.translate({ id: '段数', default: 'Number of Segments' })
                    },
                    {
                        opcode: '造型数',
                        blockType: Scratch.BlockType.REPORTER,
                        text: Scratch.translate({ id: '造型数', default: 'Number of Costumes' })
                    },
                    {
                        opcode: '声音数',
                        blockType: Scratch.BlockType.REPORTER,
                        text: Scratch.translate({ id: '声音数', default: 'Number of Sounds' })
                    }
                ],
                menus: {
                    角色列表: {
                        acceptReporters: true,
                        items: "_获取角色列表",
                    },
                }
            };
        }
        _获取角色列表() {
            const sprites = [];
            for (const target of vm.runtime.targets) {
              if (target.isOriginal && !target.isStage) {
                sprites.push(target.getName());
              }
            }
            if (sprites.length === 0) {
              return [
                {
                  text: "不存在角色~",
                  value: " ",
                },
              ];
            }
            return sprites;
          }

        获取当前项目() {
            return vm.toJSON();
        }

        获取角色({角色}){
            return JSON.stringify(解析角色(角色));
        }

        使用的块总数() {
            计算();
            return 使用的块总数;
        }

        块种类数() {
            计算();
            return 块种类数;
        }

        段数() {
            计算();
            return 段数;
        }

        造型数() {
            计算();
            return 造型数;
        }

        声音数() {
            计算();
            return 声音数;
        }
    }

    Scratch.extensions.register(new 项目());
})(Scratch);
