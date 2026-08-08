// Copyright (c) 2024 NOname-awa
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

((Scratch) => {
    'use strict';

    // V2.10.6

    const { Cast, ArgumentType, BlockType } = Scratch;

    Scratch.translate.setup({
        "zh": {
            "OPERATION_EXT_NAME": "运算",
            "OPERATION_SETTING": "设置",
            "OPERATION.SHOW": "显示",
            "OPERATION.HIDE": "隐藏",
            "OPERATION.EXPAND": "展开",
            "OPERATION.COLLAPSE": "收起",
            "OPERATION.RARE_BLOCK": "不常用块",
            "OPERATION.EXPAND_MENU": "展开下拉框",
            "OPERATION.LETTER_CASE": "区分大小写块",
            "OPERATION.MATH_LABEL": "数学",
            "OPERATION.BOOLEAN_LABEL": "布尔值",
            "OPERATION.STRING_LABEL": "字符",
            "OPERATION.SPLIT_LABEL": "分割",
            "OPERATION.GRAPH_LABEL": "图形",
            "OPERATION.BASE_LABEL": "进制",
            "OPERATION.MISCELLANEOUS_LABEL": "杂项",
            "OPERATION.CONSTANT_LABEL": "常量",
            "OPERATION.SHOW_MATH_BLOCK": "显示运算块",
            "OPERATION.HIDE_MATH_BLOCK": "隐藏运算块",
            "OPERATION.SHOW_BOOLEAN_BLOCK": "显示布尔块",
            "OPERATION.HIDE_BOOLEAN_BLOCK": "隐藏布尔块",
            "OPERATION.SHOW_STRING_BLOCK": "显示字符串块",
            "OPERATION.HIDE_STRING_BLOCK": "隐藏字符串块",
            "OPERATION.SHOW_RARD": "显示不常用块",
            "OPERATION.HIDE_RARD": "隐藏不常用块",
            "OPERATION.SHOW_GRAPH_BLOCK": "显示图形块",
            "OPERATION.HIDE_GRAPH_BLOCK": "隐藏图形块",
            "OPERATION.SHOW_BASE_BLOCK": "显示进制块",
            "OPERATION.HIDE_BASE_BLOCK": "隐藏进制块",
            "OPERATION.CONSTRAIN": "限制 [NUM] 在 [LOW] 与 [HIGH] 之间",
            "OPERATION.LOOP_NUMBER": "让 [NUM] 在 [START] 到 [END] 中循环",
            "OPERATION.ROUND": "四舍五入 [NUM1] 到小数点后 [NUM2] 位",
            "OPERATION.MAP_OFF": "映射 [NUM] 从 [START1] ~ [END1] 到 [START2] ~ [END2]",
            "OPERATION.FIND": "寻找 [MODE]",
            "OPERATION.BASE": "把 [INTO1] 进制的 [NUM] 转换为 [INTO2] 进制",
            "OPERATION.TO_BIN": "[NUM]₁₀ → 二进制",
            "OPERATION.TO_DEC": "[NUM]₂ → 十进制",
            "OPERATION.IS_BASE": "[NUM] 是合法的 [BASE] 进制？",
            "OPERATION.LOG_WITH_BASE": "以 [BASE] 为底 [NUM] 的对数",
            "OPERATION.FACTORIAL": "[NUM] 的阶乘",
            "OPERATION.CALCULATE": "计算 [TEXT]",
            "OPERATION.BOOLEAN_TO_NUMBER": "转换 [BOOLEAN] 为二进制数字",
            "OPERATION.NUMBER_NOT": "二进制取反 [NUM]",
            "OPERATION.PERCENT_OF": "[NUM2] 的 [NUM1] %",
            "OPERATION.IS_TRUE": "[OPERAND] 成立？",
            "OPERATION.IS_FALSE": "[OPERAND] 不成立？",
            "OPERATION.CHECK_TYPE": "[INPUT] 是 [MODE] ？",
            "OPERATION.START_END_WITH": "[STRING1] 以 [STRING2] [POSITION] ？",
            "OPERATION.IS_BETWEEN": "[NUM] 在 [START] 到 [END] 之间？",
            "OPERATION.CONTAINS": "[STRING1] 包含 [STRING2] ？",
            "OPERATION.ARG_APPLE_CONTAINS": "果",
            "OPERATION.TEXT": "文本 [STRING]",
            "OPERATION.TEST": "如果 [BOOLEAN] 那么 [STRING1] 否则 [STRING2]",
            "OPERATION.REPEAT": "重复 [STRING] [NUMBER] 次",
            "OPERATION.TRIM": "消除 [STRING] 两侧的空白文本",
            "OPERATION.INTERCEPT": "截取 [STRING] 的 [START] 到 [END]",
            "OPERATION.REMOVE": "删除 [STRING] 的 [START] 到 [END]",
            "OPERATION.REMOVE_CHAR": "删除 [STRING] 的第 [INDEX] 个字符",
            "OPERATION.INSERT": "在 [STRING] 的第 [INDEX] 字符前插入 [INSERT_STR]",
            "OPERATION.REPLACE_ALL": "替换 [STRING1] 中的全部 [STRING2] 为 [STRING3]",
            "OPERATION.REPLACE": "替换 [STRING1] 中的 [STRING2] 为 [STRING3]",
            "OPERATION.REPLACE_INDEX": "替换 [STRING] 中的第 [START] 到 [END] 为 [REPLACEMENT]",
            "OPERATION.REPLACE_INDEX_CHAR": "替换 [STRING] 中的第 [INDEX] 个字符为 [REPLACEMENT]",
            "OPERATION.SPLIT_CONTAINS": "按 [SYMBOL] 分割 [STRING1] 后包含 [STRING2] ？",
            "OPERATION.SPLIT": "按 [SYMBOL] 分割 [STRING] 获取第 [NUM] 项",
            "OPERATION.SPLIT_REMOVE": "按 [SYMBOL] 分割 [STRING] 删除第 [NUM] 项",
            "OPERATION.SPLIT_INSERT": "按 [SYMBOL] 分割 [STRING] 在第 [INDEX] 项前插入 [INSERT_STR]",
            "OPERATION.SPLIT_REPLACE": "按 [SYMBOL] 分割 [STRING] 把第 [INDEX] 项替换为 [REPLACE_STR]",
            "OPERATION.SPLIT_BY_COUNT": "按每 [COUNT] 个字符分割 [STRING] 获取第 [NUM] 项",
            "OPERATION.SPLIT_ANALYSIS": "按 [SYMBOL] 分割 [STRING] 获取 [MODE]",
            "OPERATION.SPLIT_SHUFFLE": "按 [SYMBOL] 分割 [STRING] 打乱所有项",
            "OPERATION.TOGGLE_CASE": "[STRING2] 在 [STRING1] 中 [MODE]",
            "OPERATION.CONVERT": "转换 [STRING] 为 [MODE]",
            "OPERATION.AFTER_OR_BEFOTR_TEXT": "[STRING1] 中在 [STRING2] [MODE] 的文本",
            "OPERATION.JOIN": "连接文字 [STRING]",
            "OPERATION.GET_JOIN": "连接的文本",
            "OPERATION.INF_JOIN": "连接",
            "OPERATION.INF_JOIN_SEPARATOR": "和",
            "OPERATION.GET_TO_UNICODE": "[STRING] 的 Unicode",
            "OPERATION.UNICODE_TO_STRING": "Unicode 为 [STRING] 的字符",
            "OPERATION.SHUFFLE": "打乱 [STRING]",
            "OPERATION.OVERWRITE": "使用 [OTHER] 覆盖 [ORIGINAL] ，方向：[DIRECTION]",
            "OPERATION.PAD_STRING": "如果 [ORIGINAL_STR] 的长度小于 [REQUIRED_LENGTH] ，用 [CHAR_TO_ADD] 在 [POSITION] 补全",
            "OPERATION.CALCULATE_LINE_LENGTH": "([X1],[Y1]) 到 ([X2],[Y2]) 的长度",
            "OPERATION.CALCULATE_LINE_DIRECTION": "([X1],[Y1]) 到 ([X2],[Y2]) 的角度",
            "OPERATION.CALCULATE_MIDPOINT": "([X1],[Y1]) 与 ([X2],[Y2]) 的中点",
            "OPERATION.CALCULATE_SLOPE": "([X1], [Y1]) 与 ([X2], [Y2]) 的斜率",
            "OPERATION.CALCULATE_INTERSECTION": "计算交点 ([X1],[Y1]) 到 ([X2],[Y2]) 与 ([X3],[Y3]) 到 ([X4],[Y4])",
            "OPERATION.TRIANGLE": "三角形 ([X1],[Y1]) ([X2],[Y2]) ([X3],[Y3]) 的 [MODE]",
            "OPERATION.TRIANGLE_AREA": "三角形 [S1] [S2] [S3] 的面积",
            "OPERATION.RECTANGLE": "四边形 ([X1],[Y1]) ([X2],[Y2]) ([X3],[Y3]) ([X4],[Y4]) 的 [MODE]",
            "OPERATION.GRAPH": "多边形 [GRAPH] 的 [MODE]",
            "OPERATION.CIRCLE": "[UNITS] 为 [LENGTH] 的圆的 [MODE]",
            "OPERATION.IS_ANGLE_IN_RANGE": "角 [ANGLE1] 在角 [ANGLE2] 到角 [ANGLE3] 的 [MODE] 之间？",
            "OPERATION.CALCULATE_ANGLE_DIFFERENCE": "角度 [ANGLE1] 到 [ANGLE2] 的 [MODE]",
            "OPERATION.FIND_PARTITION": "把 [RANGE_START] 到 [RANGE_END] 等分为 [NUM_PARTITIONS] 个部分并获取 [VALUE] 的分区",
            "OPERATION.CONTAIN_OPTIONS": "[OPERAND] =",
            "OPERATION.CONTAIN_OPTIONS_SEPARATOR": "或",
            "OPERATION.GET_CONSTANT": "常量 [OPTION]",
            "OPERATION.COLOR_BLEND": "混合 [COLOR1] 与 [COLOR2] 比例 [RATIO] %",
            "OPERATION.OR": "[OPERAND1] 或 [OPERAND2]",
            "OPERATION.TRUE": "成立",
            "OPERATION.FALSE": "不成立",
            "OPERATION.RANDOM": "随机",
            "OPERATION.TYPE_NUMBER": "数字",
            "OPERATION.TYPE_POSITIVE_NUMBER": "正数",
            "OPERATION.TYPE_NEGATIVE_NUMBER": "负数",
            "OPERATION.TYPE_EVEN_NUMBER": "偶数",
            "OPERATION.TYPE_ODD_NUMBER": "奇数",
            "OPERATION.TYPE_INTEGER_NUMBER": "整数",
            "OPERATION.TYPE_DECIMAL_NUMBER": "小数",
            "OPERATION.TYPE_PRIME_NUMBER": "质数",
            "OPERATION.TYPE_COMPOSITE_NUMBER": "合数",
            "OPERATION.TYPE_TEXT": "文字",
            "OPERATION.TYPE_BOOLEAN": "布尔值",
            "OPERATION.NAND": "与非",
            "OPERATION.NOR": "或非",
            "OPERATION.XOR": "异或",
            "OPERATION.XNOR": "同或",
            "OPERATION.FIRST_OCCURRENCE": "第一次出现的位置",
            "OPERATION.LAST_OCCURRENCE": "最后出现的位置",
            "OPERATION.NUMBER_OF": "出现的次数",
            "OPERATION.UPPERCASE": "大写",
            "OPERATION.LOWERCASE": "小写",
            "OPERATION.CAPITALIZE": "首字母大写",
            "OPERATION.REVERSE": "倒序",
            "OPERATION.AFTER": "之后",
            "OPERATION.BEFORE": "之前",
            "OPERATION.FRONT": "开头",
            "OPERATION.BACK": "结尾",
            "OPERATION.MAX": "最大值",
            "OPERATION.MIN": "最小值",
            "OPERATION.MEAN": "平均值",
            "OPERATION.SUM": "总和",
            "OPERATION.ITEM_COUNT": "項目数",
            "OPERATION.AREA": "面积",
            "OPERATION.CIRCUMFERENCE": "周长",
            "OPERATION.RADIUS": "半径",
            "OPERATION.DIAMETER": "直径",
            "OPERATION.INTERIOR_ANGLE": "内角",
            "OPERATION.EXTERIOR_ANGLE": "外角",
            "OPERATION.CLOCKWISE": "顺时针",
            "OPERATION.COUNTER_CLOCKWISE": "逆时针",
            "OPERATION.NEW_LINE": "↵（换行）",
            "OPERATION.TAB": "→（制表符）",
            "OPERATION.ARG_APPLE": "苹果",
            "OPERATION.ARG_BANANA": "香蕉",
            "OPERATION.ARG_PEACH": "桃子",
            "OPERATION.ARG_MANGO": "芒果"
        },
        "zh-tw": {
            "OPERATION_EXT_NAME": "運算",
            "OPERATION_SETTING": "設定",
            "OPERATION.SHOW": "顯示",
            "OPERATION.HIDE": "隱藏",
            "OPERATION.EXPAND": "展開",
            "OPERATION.COLLAPSE": "收起",
            "OPERATION.RARE_BLOCK": "不常用積木",
            "OPERATION.EXPAND_MENU": "展開下拉選單",
            "OPERATION.LETTER_CASE": "大寫與小寫積木",
            "OPERATION.MATH_LABEL": "數學",
            "OPERATION.BOOLEAN_LABEL": "布林",
            "OPERATION.STRING_LABEL": "字串",
            "OPERATION.SPLIT_LABEL": "分割",
            "OPERATION.GRAPH_LABEL": "圖形",
            "OPERATION.BASE_LABEL": "進制",
            "OPERATION.MISCELLANEOUS_LABEL": "雜項",
            "OPERATION.CONSTANT_LABEL": "常數",
            "OPERATION.SHOW_MATH_BLOCK": "顯示數學積木",
            "OPERATION.HIDE_MATH_BLOCK": "隱藏數學積木",
            "OPERATION.SHOW_BOOLEAN_BLOCK": "顯示布林積木",
            "OPERATION.HIDE_BOOLEAN_BLOCK": "隱藏布林積木",
            "OPERATION.SHOW_STRING_BLOCK": "顯示字串積木",
            "OPERATION.HIDE_STRING_BLOCK": "隱藏字串積木",
            "OPERATION.SHOW_GRAPH_BLOCK": "顯示圖形積木",
            "OPERATION.HIDE_GRAPH_BLOCK": "隱藏圖形積木",
            "OPERATION.SHOW_BASE_BLOCK": "顯示進制積木",
            "OPERATION.HIDE_BASE_BLOCK": "隱藏進制積木",
            "OPERATION.SHOW_RARD": "顯示不常用積木",
            "OPERATION.HIDE_RARD": "隱藏不常用積木",
            "OPERATION.CONSTRAIN": "限制 [NUM] 介於 [LOW] 和 [HIGH] 之間",
            "OPERATION.LOOP_NUMBER": "讓 [NUM] 在範圍 [START] 到 [END] 內循環",
            "OPERATION.ROUND": "將 [NUM1] 四捨五入到 [NUM2] 小數位",
            "OPERATION.MAP_OFF": "映射 [NUM] 從 [START1]～[END1] 到 [START2]～[END2]",
            "OPERATION.FIND": "尋找 [MODE]",
            "OPERATION.BASE": "將 [NUM] 從進制 [INTO1] 轉換為進制 [INTO2]",
            "OPERATION.TO_BIN": "[NUM]₁₀ → 二進位制",
            "OPERATION.TO_DEC": "[NUM]₂ → 十進位制",
            "OPERATION.IS_BASE": "[NUM] 符合 [BASE] 進位制？",
            "OPERATION.LOG_WITH_BASE": "以 [BASE] 為底 [NUM] 的對數",
            "OPERATION.FACTORIAL": "[NUM] 的階乘",
            "OPERATION.CALCULATE": "計算 [TEXT]",
            "OPERATION.BOOLEAN_TO_NUMBER": "將布林值 [BOOLEAN] 轉換為數字",
            "OPERATION.NUMBER_NOT": "二進制取反 [NUM]",
            "OPERATION.PERCENT_OF": "[NUM2] 的 [NUM1] %",
            "OPERATION.IS_TRUE": "[OPERAND] 成立？",
            "OPERATION.IS_FALSE": "[OPERAND] 不成立？",
            "OPERATION.CHECK_TYPE": "[INPUT] 是 [MODE] ？",
            "OPERATION.START_END_WITH": "[STRING1] 的 [POSITION] 是 [STRING2] ？",
            "OPERATION.IS_BETWEEN": "[NUM] 在 [START] 到 [END] 之間？",
            "OPERATION.CONTAINS": "字串 [STRING1] 包含 [STRING2] ？",
            "OPERATION.ARG_APPLE_CONTAINS": "a",
            "OPERATION.TEXT": "文字 [STRING]",
            "OPERATION.TEST": "判斷 [BOOLEAN] 真 [STRING1] 假 [STRING2]",
            "OPERATION.REPEAT": "重複 [STRING] [NUMBER] 次",
            "OPERATION.TRIM": "去除 [STRING] 兩端的空白",
            "OPERATION.INTERCEPT": "截取 [STRING] 從 [START] 到 [END]",
            "OPERATION.REMOVE": "刪除 [STRING] 從 [START] 到 [END]",
            "OPERATION.REMOVE_CHAR": "刪除 [STRING] 的第 [INDEX] 個字元",
            "OPERATION.INSERT": "在 [STRING] 的第 [INDEX] 個字元前插入 [INSERT_STR]",
            "OPERATION.REPLACE_ALL": "在 [STRING1] 中把全部 [STRING2] 替換為 [STRING3]",
            "OPERATION.REPLACE": "在 [STRING1] 中把 [STRING2] 替換為 [STRING3]",
            "OPERATION.REPLACE_INDEX": "在 [STRING] 的 [START] 到 [END] 之間替換為 [REPLACEMENT]",
            "OPERATION.REPLACE_INDEX_CHAR": "在 [STRING] 的第 [INDEX] 個字元替換為 [REPLACEMENT]",
            "OPERATION.SPLIT_CONTAINS": "按 [SYMBOL] 分割 [STRING1] 後包含 [STRING2] ？",
            "OPERATION.SPLIT": "按 [SYMBOL] 分割 [STRING] 獲取第 [NUM] 個項目",
            "OPERATION.SPLIT_REMOVE": "按 [SYMBOL] 分割 [STRING] 刪除第 [NUM] 個項目",
            "OPERATION.SPLIT_INSERT": "按 [SYMBOL] 分割 [STRING] 在第 [INDEX] 個項目前插入 [INSERT_STR]",
            "OPERATION.SPLIT_REPLACE": "按 [SYMBOL] 分割 [STRING] 把第 [INDEX] 個項目替換為 [REPLACE_STR]",
            "OPERATION.SPLIT_BY_COUNT": "按每 [COUNT] 個字元分割 [STRING] 獲取第 [NUM] 個項目",
            "OPERATION.SPLIT_ANALYSIS": "按 [SYMBOL] 分割 [STRING] 獲取 [MODE]",
            "OPERATION.SPLIT_SHUFFLE": "按 [SYMBOL] 分割 [STRING] 隨機排序所有項目",
            "OPERATION.TOGGLE_CASE": "[STRING2] 在 [STRING1] 中 [MODE]",
            "OPERATION.CONVERT": "把 [STRING] [MODE]",
            "OPERATION.AFTER_OR_BEFOTR_TEXT": "[STRING1] 中在 [STRING2] [MODE] 的字串",
            "OPERATION.JOIN": "組合字串 [STRING]",
            "OPERATION.GET_JOIN": "組合的字串",
            "OPERATION.INF_JOIN": "字串組合",
            "OPERATION.INF_JOIN_SEPARATOR": "",
            "OPERATION.GET_TO_UNICODE": "獲取 [STRING] 的 Unicode 碼",
            "OPERATION.UNICODE_TO_STRING": "將 Unicode [STRING] 轉換為字符",
            "OPERATION.SHUFFLE": "隨機排序 [STRING]",
            "OPERATION.OVERWRITE": "使用 [OTHER] 覆蓋 [ORIGINAL] ，方向：[DIRECTION]",
            "OPERATION.PAD_STRING": "如果 [ORIGINAL_STR] 的長度小於 [REQUIRED_LENGTH] ，用 [CHAR_TO_ADD] 在 [POSITION] 補全",
            "OPERATION.CALCULATE_LINE_LENGTH": "從 ([X1],[Y1]) 到 ([X2],[Y2]) 的距離",
            "OPERATION.CALCULATE_LINE_DIRECTION": "從 ([X1],[Y1]) 到 ([X2],[Y2]) 的角度",
            "OPERATION.CALCULATE_MIDPOINT": "([X1],[Y1]) 與 ([X2],[Y2]) 的中點",
            "OPERATION.CALCULATE_SLOPE": "([X1], [Y1]) 與 ([X2], [Y2]) 的斜率",
            "OPERATION.CALCULATE_INTERSECTION": "計算從線段 ([X1],[Y1]) 到 ([X2],[Y2]) 和線段 ([X3],[Y3]) 到 ([X4],[Y4]) 的交點",
            "OPERATION.TRIANGLE": "三角形 ([X1],[Y1]) ([X2],[Y2]) ([X3],[Y3]) 的 [MODE]",
            "OPERATION.TRIANGLE_AREA": "三角形 [S1] [S2] [S3] 面積",
            "OPERATION.RECTANGLE": "四邊形 ([X1],[Y1]) ([X2],[Y2]) ([X3],[Y3]) ([X4],[Y4]) 的 [MODE]",
            "OPERATION.GRAPH": "多邊形 [GRAPH] 的 [MODE]",
            "OPERATION.CIRCLE": "[UNITS] 為 [LENGTH] 的圆的 [MODE]",
            "OPERATION.IS_ANGLE_IN_RANGE": "∠ [ANGLE1] 在 ∠ [ANGLE2] 和 ∠ [ANGLE3] 之間的 [MODE]？",
            "OPERATION.CALCULATE_ANGLE_DIFFERENCE": "從 ∠ [ANGLE1] 到 ∠ [ANGLE2] 的 [MODE]",
            "OPERATION.FIND_PARTITION": "將範圍從 [RANGE_START] 到 [RANGE_END] 分割成 [NUM_PARTITIONS] 份，獲取第 [VALUE] 所屬的部分",
            "OPERATION.CONTAIN_OPTIONS": "[OPERAND] 在",
            "OPERATION.GET_CONSTANT": "常數 [OPTION]",
            "OPERATION.COLOR_BLEND": "用比例 [RATIO] % 混合 [COLOR1] 和 [COLOR2]",
            "OPERATION.OR": "[OPERAND1] 或 [OPERAND2]",
            "OPERATION.TRUE": "成立",
            "OPERATION.FALSE": "不成立",
            "OPERATION.RANDOM": "隨機",
            "OPERATION.TYPE_NUMBER": "數字",
            "OPERATION.TYPE_POSITIVE_NUMBER": "正數",
            "OPERATION.TYPE_NEGATIVE_NUMBER": "負數",
            "OPERATION.TYPE_EVEN_NUMBER": "偶數",
            "OPERATION.TYPE_ODD_NUMBER": "奇數",
            "OPERATION.TYPE_INTEGER_NUMBER": "整數",
            "OPERATION.TYPE_DECIMAL_NUMBER": "小數",
            "OPERATION.TYPE_PRIME_NUMBER": "質數",
            "OPERATION.TYPE_COMPOSITE_NUMBER": "合數",
            "OPERATION.TYPE_TEXT": "文字",
            "OPERATION.TYPE_BOOLEAN": "布林",
            "OPERATION.NAND": "NAND",
            "OPERATION.NOR": "NOR",
            "OPERATION.XOR": "XOR",
            "OPERATION.XNOR": "XNOR",
            "OPERATION.FIRST_OCCURRENCE": "第一次出現的位置",
            "OPERATION.LAST_OCCURRENCE": "最後一次出現的位置",
            "OPERATION.NUMBER_OF": "出現的次數",
            "OPERATION.UPPERCASE": "轉換為大寫",
            "OPERATION.LOWERCASE": "轉換為小寫",
            "OPERATION.CAPITALIZE": "轉換為首字母大寫",
            "OPERATION.REVERSE": "反轉",
            "OPERATION.AFTER": "之後",
            "OPERATION.BEFORE": "之前",
            "OPERATION.FRONT": "前端",
            "OPERATION.BACK": "後端",
            "OPERATION.MAX": "最大值",
            "OPERATION.MIN": "最小值",
            "OPERATION.MEAN": "平均值",
            "OPERATION.SUM": "總和",
            "OPERATION.ITEM_COUNT": "項目數",
            "OPERATION.AREA": "面積",
            "OPERATION.CIRCUMFERENCE": "周長",
            "OPERATION.RADIUS": "半徑",
            "OPERATION.DIAMETER": "直徑",
            "OPERATION.INTERIOR_ANGLE": "內角",
            "OPERATION.EXTERIOR_ANGLE": "外角",
            "OPERATION.CLOCKWISE": "順時針",
            "OPERATION.COUNTER_CLOCKWISE": "逆時針",
            "OPERATION.NEW_LINE": "↵（換行）",
            "OPERATION.TAB": "→（製表符）",
            "OPERATION.ARG_APPLE": "apple",
            "OPERATION.ARG_BANANA": "banna",
            "OPERATION.ARG_PEACH": "peach",
            "OPERATION.ARG_MANGO": "mango",
        },
        "ar": {
            "OPERATION.ROOT": "[NUM1] [RTL_ROOT] [NUM2]",
            "OPERATION.SQUARE_ROOT": "[RTL_ROOT] [NUM]",
            "OPERATION.CUBE_ROOT": "؆ [NUM]",
            "OPERATION.TO_PERCENT": "[NUM] ٪"
        }
    });
    const formatMessage = Scratch.translate;

    const getBlockColor = () => {
        try {
            let theme = JSON.parse(localStorage.getItem('tw:theme'));
            switch (String(theme.blocks)) {
                case 'high-contrast': return 'highContrast';
                case 'dark': return 'dark';
                default: return 'normal';
            }
        }
        catch (error) {
            // 兼容旧版本 TW
            return 'normal';
        }
    }

    const typeIcons = {
        emptyIcon: {
            normal: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjBtbSIgaGVpZ2h0PSIyMG1tIiB2aWV3Qm94PSIwIDAgMjAgMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iOS41IiBmaWxsPSIjNjg1OWZmIiBzdHJva2U9IiM1MzQ3Y2MiLz48L3N2Zz4=',
            highContrast: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjBtbSIgaGVpZ2h0PSIyMG1tIiB2aWV3Qm94PSIwIDAgMjAgMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iOS41IiBmaWxsPSIjOTY4Y2ZmIiBzdHJva2U9IiM1MzQ3Y2MiLz48L3N2Zz4=',
            dark: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjBtbSIgaGVpZ2h0PSIyMG1tIiB2aWV3Qm94PSIwIDAgMjAgMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iOS41IiBmaWxsPSIjMWYxYTRjIiBzdHJva2U9IiM2ODU5ZmYiLz48L3N2Zz4='
        },
        operatorsIcon: {
            normal: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjBtbSIgaGVpZ2h0PSIyMG1tIiB2aWV3Qm94PSIwIDAgMjAgMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iOS41IiBmaWxsPSIjNjg1OWZmIiBzdHJva2U9IiM1MzQ3Y2MiLz48cGF0aCBkPSJNMTIuNyA0Ljk2N2ExLjQ5OCAxLjQ5OCAwIDAwLTEuNjI3IDEuMzY2TDEwLjg4NCA4LjVIMTNWMTBoLTIuMjVsLS4zMyAzLjgwM2EyLjk5IDIuOTkgMCAwMS0zLjI0OCAyLjcyMiAzLjAwNSAzLjAwNSAwIDAxLTIuMjk1LTEuNDAzbDEuMTI1LTEuMTI1Yy4xOC41NTYuNjc1Ljk4MyAxLjI5OCAxLjAzNWExLjQ5OCAxLjQ5OCAwIDAwMS42MjctMS4zNjRMOS4yNSAxMEg3VjguNWgyLjM3N2wuMjAzLTIuMzAyYTIuOTkgMi45OSAwIDAxMy4yNDctMi43MjNjLjk4My4wODMgMS44MDguNjMgMi4yOTUgMS40MDJsLTEuMTI1IDEuMTI1QTEuNDk4IDEuNDk4IDAgMDAxMi43IDQuOTY3eiIgZmlsbD0iI2ZmZiIgc3R5bGU9Ii1tcy10cmFuc2Zvcm06cm90YXRlKDM2MGRlZyk7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDM2MGRlZykiLz48ZyB0cmFuc2Zvcm09Im1hdHJpeCgxLjI1IDAgMCAxLjI1IC01LjY4OCAtNS42ODgpIiBvcGFjaXR5PSIuMiIgc3Ryb2tlPSIjMDAwIiBmaWxsPSIjZmZmIj48cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSIxLjUiIHg9IjE1LjA1IiB5PSIxNi44IiByeT0iLjc1Ii8+PHJlY3Qgd2lkdGg9IjUiIGhlaWdodD0iMS41IiB4PSIxNS4wNSIgeT0iLTE4LjMiIHJ5PSIuNzUiIHRyYW5zZm9ybT0icm90YXRlKDkwKSIvPjwvZz48ZyB0cmFuc2Zvcm09Im1hdHJpeCgxLjI1IDAgMCAxLjI1IC01LjY4OCAtNS42ODgpIiBmaWxsPSIjZmZmIj48cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSIxLjUiIHg9IjE1LjA1IiB5PSIxNi44IiByeT0iLjc1Ii8+PHJlY3Qgd2lkdGg9IjUiIGhlaWdodD0iMS41IiB4PSIxNS4wNSIgeT0iLTE4LjMiIHJ5PSIuNzUiIHRyYW5zZm9ybT0icm90YXRlKDkwKSIvPjwvZz48L3N2Zz4=',
            highContrast: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjBtbSIgaGVpZ2h0PSIyMG1tIiB2aWV3Qm94PSIwIDAgMjAgMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iOS41IiBmaWxsPSIjOTY4Y2ZmIiBzdHJva2U9IiM1MzQ3Y2MiLz48cGF0aCBkPSJNMTIuNyA0Ljk2N2ExLjQ5OCAxLjQ5OCAwIDAwLTEuNjI3IDEuMzY2TDEwLjg4NCA4LjVIMTNWMTBoLTIuMjVsLS4zMyAzLjgwM2EyLjk5IDIuOTkgMCAwMS0zLjI0OCAyLjcyMiAzLjAwNSAzLjAwNSAwIDAxLTIuMjk1LTEuNDAzbDEuMTI1LTEuMTI1Yy4xOC41NTYuNjc1Ljk4MyAxLjI5OCAxLjAzNWExLjQ5OCAxLjQ5OCAwIDAwMS42MjctMS4zNjRMOS4yNSAxMEg3VjguNWgyLjM3N2wuMjAzLTIuMzAyYTIuOTkgMi45OSAwIDAxMy4yNDctMi43MjNjLjk4My4wODMgMS44MDguNjMgMi4yOTUgMS40MDJsLTEuMTI1IDEuMTI1QTEuNDk4IDEuNDk4IDAgMDAxMi43IDQuOTY3eiIgZmlsbD0iI2ZmZiIgc3R5bGU9Ii1tcy10cmFuc2Zvcm06cm90YXRlKDM2MGRlZyk7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDM2MGRlZykiLz48ZyB0cmFuc2Zvcm09Im1hdHJpeCgxLjI1IDAgMCAxLjI1IC01LjY4OCAtNS42ODgpIiBvcGFjaXR5PSIuMiIgc3Ryb2tlPSIjMDAwIiBmaWxsPSIjZmZmIj48cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSIxLjUiIHg9IjE1LjA1IiB5PSIxNi44IiByeT0iLjc1Ii8+PHJlY3Qgd2lkdGg9IjUiIGhlaWdodD0iMS41IiB4PSIxNS4wNSIgeT0iLTE4LjMiIHJ5PSIuNzUiIHRyYW5zZm9ybT0icm90YXRlKDkwKSIvPjwvZz48ZyB0cmFuc2Zvcm09Im1hdHJpeCgxLjI1IDAgMCAxLjI1IC01LjY4OCAtNS42ODgpIiBmaWxsPSIjZmZmIj48cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSIxLjUiIHg9IjE1LjA1IiB5PSIxNi44IiByeT0iLjc1Ii8+PHJlY3Qgd2lkdGg9IjUiIGhlaWdodD0iMS41IiB4PSIxNS4wNSIgeT0iLTE4LjMiIHJ5PSIuNzUiIHRyYW5zZm9ybT0icm90YXRlKDkwKSIvPjwvZz48L3N2Zz4=',
            dark: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjBtbSIgaGVpZ2h0PSIyMG1tIiB2aWV3Qm94PSIwIDAgMjAgMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iOS41IiBmaWxsPSIjMWYxYTRjIiBzdHJva2U9IiM2ODU5ZmYiLz48cGF0aCBkPSJNMTIuNyA0Ljk2N2ExLjQ5OCAxLjQ5OCAwIDAwLTEuNjI3IDEuMzY2TDEwLjg4NCA4LjVIMTNWMTBoLTIuMjVsLS4zMyAzLjgwM2EyLjk5IDIuOTkgMCAwMS0zLjI0OCAyLjcyMiAzLjAwNSAzLjAwNSAwIDAxLTIuMjk1LTEuNDAzbDEuMTI1LTEuMTI1Yy4xOC41NTYuNjc1Ljk4MyAxLjI5OCAxLjAzNWExLjQ5OCAxLjQ5OCAwIDAwMS42MjctMS4zNjRMOS4yNSAxMEg3VjguNWgyLjM3N2wuMjAzLTIuMzAyYTIuOTkgMi45OSAwIDAxMy4yNDctMi43MjNjLjk4My4wODMgMS44MDguNjMgMi4yOTUgMS40MDJsLTEuMTI1IDEuMTI1QTEuNDk4IDEuNDk4IDAgMDAxMi43IDQuOTY3eiIgZmlsbD0iI2ZmZiIgc3R5bGU9Ii1tcy10cmFuc2Zvcm06cm90YXRlKDM2MGRlZyk7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDM2MGRlZykiLz48ZyB0cmFuc2Zvcm09Im1hdHJpeCgxLjI1IDAgMCAxLjI1IC01LjY4OCAtNS42ODgpIiBvcGFjaXR5PSIuMiIgc3Ryb2tlPSIjMDAwIiBmaWxsPSIjZmZmIj48cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSIxLjUiIHg9IjE1LjA1IiB5PSIxNi44IiByeT0iLjc1Ii8+PHJlY3Qgd2lkdGg9IjUiIGhlaWdodD0iMS41IiB4PSIxNS4wNSIgeT0iLTE4LjMiIHJ5PSIuNzUiIHRyYW5zZm9ybT0icm90YXRlKDkwKSIvPjwvZz48ZyB0cmFuc2Zvcm09Im1hdHJpeCgxLjI1IDAgMCAxLjI1IC01LjY4OCAtNS42ODgpIiBmaWxsPSIjZmZmIj48cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSIxLjUiIHg9IjE1LjA1IiB5PSIxNi44IiByeT0iLjc1Ii8+PHJlY3Qgd2lkdGg9IjUiIGhlaWdodD0iMS41IiB4PSIxNS4wNSIgeT0iLTE4LjMiIHJ5PSIuNzUiIHRyYW5zZm9ybT0icm90YXRlKDkwKSIvPjwvZz48L3N2Zz4='
        },
        mathIcon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjBtbSIgaGVpZ2h0PSIyMG1tIiB2aWV3Qm94PSIwIDAgMjAgMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggc3R5bGU9Ii1pbmtzY2FwZS1zdHJva2U6bm9uZSIgZD0iTTE0LjgyNyA0Ljc4NGwtLjAzOC4wNDhjLS41MS41NC0xLjI1Ni44MTMtMi4yNC44MTNINy45NjdjLS42NjggMC0xLjI2Ny4wODktMS43OS4yNjgtLjUzMy4xODUtMS4xMDIuNTEzLTEuNzAzLjk4NmwtLjAzOC4wMjkuMDI5LjAzOC42OTggMS4xMi4wNDktLjAzOGMuNjg2LS42MjkgMS40ODItLjk0MSAyLjM4Mi0xLjAwNWExMzkuMzcxIDEzOS4zNzEgMCAwMS0yLjc3NSA3LjgxbC0uMDI5LjA2NmgxLjYzN2wuMDEtLjAzOGMuOTI4LTIuODk2IDEuNzk1LTUuNTMgMi41OTMtNy45MjRoMS45OWExMjcuMDk1IDEyNy4wOTUgMCAwMC0xLjA3MiAzLjg0N2MtLjI2OCAxLjA0LS40MDEgMS44MS0uNDAxIDIuMzI2IDAgLjcwOS4yMTMgMS4yNjEuNjUgMS42MzYuMzU0LjMwMi44MTguNDUgMS4zNjkuNDUgMS4zOTIgMCAyLjY3Ny0uODM1IDMuODQ3LTIuNDc5bC4wMTktLjAyOS0uOTM4LTEuMTQ4LS4wMzguMDU3Yy0uOTIzIDEuNDU4LTEuODQxIDIuMTczLTIuNzQ3IDIuMTczLS4yNzEgMC0uNDYzLS4wNzItLjU5My0uMjItLjEzLS4xNDktLjIwMS0uMzc1LS4yMDEtLjY5IDAtLjI2LjA1Mi0uNjQ0LjE2My0xLjEzOC4zLTEuMzY1Ljc1NC0yLjk2NiAxLjM0LTQuNzg1YTguNDczIDguNDczIDAgMDAxLjQxNi0uMTE1IDMuMzE4IDMuMzE4IDAgMDAxLjcwMy0uODUybC4wMjktLjAyeiIgY29sb3I9IiMwMDAiIGZpbGw9IiNmZmYiLz48L3N2Zz4=',
        booleanIcon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjBtbSIgaGVpZ2h0PSIyMG1tIiB2aWV3Qm94PSIwIDAgMjAgMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTQuODgyIDExLjc5NUwzLjA4NyAxMGwxLjc5NS0xLjc5NUw2LjY3NyA2LjQxaDYuNjQ2bDEuNzk1IDEuNzk1TDE2LjkxMyAxMGwtMS43OTUgMS43OTUtMS43OTUgMS43OTVINi42Nzd6bTkuNjU2LS4zMTJMMTYuMDIyIDEwbC0xLjQ4NC0xLjQ4My0xLjQ4My0xLjQ4M0g2Ljk0NEw1LjQ2MSA4LjUxNyAzLjk3OCAxMGwxLjQ3NiAxLjQ3NiAxLjQ3NSAxLjQ3NS4wOS4wMS4wOS4wMSAyLjk3NC0uMDAyIDIuOTcyLS4wMDN6bS0yLjk2LS4yNzNMMTAuMzcgMTBsMS4yMTYtMS4yMTZMMTIuOCA3LjU3bDEuMjE1IDEuMjE1TDE1LjIzMiAxMGwtMS4yMSAxLjIxLTEuMjA4IDEuMjFoLS4wMjZ6IiBmaWxsPSIjZmZmIi8+PC9zdmc+',
        stringIcon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjBtbSIgaGVpZ2h0PSIyMG1tIiB2aWV3Qm94PSIwIDAgMjAgMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTUuNzEzIDYuMDU4bC4yNzcuMzcycS0uOTMzLjg3OS0uOTY2IDEuNzk4LjI5NyAwIC41Mi4xMjEuNDg3LjI2NC40ODcuODEyIDAgLjI3LS4xMzUuNTEzLS4yOTEuNTItLjg4LjUyLS40MzIgMC0uNzM2LS4zMDMtLjMzOC0uMzM4LS4zMzgtLjkwNiAwLS43MDMuMzg1LTEuNDMzLjQ1My0uODc5IDEuMzg2LTEuNDk0em0yLjYzIDBsLjI3Ny4zNzJxLS45MzMuODc5LS45NjcgMS43OTguMjk3IDAgLjUyLjEyMS40ODcuMjY0LjQ4Ny44MTIgMCAuMjctLjEzNS41MTMtLjI5LjUyLS44NzkuNTItLjQzMiAwLS43MzctLjMwMy0uMzM3LS4zMzgtLjMzNy0uOTA2IDAtLjcwMy4zODUtMS40MzMuNDUzLS44NzkgMS4zODYtMS40OTR6bTUuOTQ1IDcuODgzbC0uMjc3LS4zNzJxLjkzMi0uODc4Ljk2Ni0xLjc5OC0uMjk3IDAtLjUyLS4xMjEtLjQ4Ny0uMjY0LS40ODctLjgxMSAwLS4yNy4xMzUtLjUxNC4yOS0uNTIuODc5LS41Mi40MzMgMCAuNzM3LjMwNC4zMzguMzM3LjMzOC45MDUgMCAuNzAzLS4zODYgMS40MzMtLjQ1Mi44NzktMS4zODUgMS40OTR6bS0yLjYzIDBsLS4yNzctLjM3MnEuOTMzLS44NzguOTY3LTEuNzk4LS4yOTggMC0uNTItLjEyMS0uNDg3LS4yNjQtLjQ4Ny0uODExIDAtLjI3LjEzNS0uNTE0LjI5LS41Mi44NzktLjUyLjQzMiAwIC43MzYuMzA0LjMzOC4zMzcuMzM4LjkwNSAwIC43MDMtLjM4NSAxLjQzMy0uNDUzLjg3OS0xLjM4NiAxLjQ5NHoiIHN0eWxlPSJ0ZXh0LWFsaWduOmNlbnRlciIgYXJpYS1sYWJlbD0i4oCcIiBmb250LXNpemU9IjEzLjg0NCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==',
        splitIcon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjBtbSIgaGVpZ2h0PSIyMG1tIiB2aWV3Qm94PSIwIDAgMjAgMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggc3R5bGU9Ii1pbmtzY2FwZS1zdHJva2U6bm9uZSIgZD0iTTEzLjE4IDUuOTUzTDUuOTUzIDEzLjE4bC44NjcuODY4IDcuMjI4LTcuMjI4eiIgY29sb3I9IiMwMDAiIGZpbGw9IiNmZmYiLz48cGF0aCBzdHlsZT0iLWlua3NjYXBlLWZvbnQtc3BlY2lmaWNhdGlvbjonSmV0QnJhaW5zIE1vbm8sIE5vcm1hbCc7LWlua3NjYXBlLXN0cm9rZTpub25lIiBkPSJNNS45NDIgNS44MTdjLS40NDMgMC0uODMuMTQzLTEuMTE0LjQyNy0uMjgzLjI4My0uNDI0LjY2OC0uNDI0IDEuMTExdi45OGgxLjIxNXYtLjk4YzAtLjE3OC4wNC0uMjguMDg1LS4zMzQuMDQ1LS4wNTMuMTA4LS4wODQuMjQ3LS4wODQuMTE1IDAgLjE4OC4wMjguMjU5LjA5NGwuMDA1LjAwNS4wMDYuMDA1Yy4wOTguMDc5LjE5My4xODIuMjg0LjMxMy4xMDUuMTQ5LjIyLjI5Ny4zNDUuNDQ1bC4wMDQuMDA1LjAwMy4wMDNjLjE0NC4xNTIuMzE2LjI4NC41MS4zOTNsLjAwNC4wMDIuMDAzLjAwMWMuMjE2LjExMi40NzEuMTYzLjc2LjE2My40MzYgMCAuODE3LS4xNDMgMS4wOTMtLjQyNi4yODItLjI4NC40MjUtLjY3LjQyNS0xLjExMlY1Ljg1SDguNDM2di45OGMwIC4xNzgtLjA0LjI4Mi0uMDg0LjMzNC0uMDQ1LjA1My0uMTAzLjA4NS0uMjM4LjA4NWEuNDEuNDEgMCAwMS0uMjc4LS4wOTRoLS4wMDJhMi42MDUgMi42MDUgMCAwMS0uMjg0LS4zMjRsLS4wMDUtLjAwN2EzLjg4NCAzLjg4NCAwIDAwLS4zNTEtLjQyOGwtLjAwNS0uMDAzYTEuNjg5IDEuNjg5IDAgMDAtLjUwMy0uMzk2IDEuNDY0IDEuNDY0IDAgMDAtLjc0NC0uMTc5em04LjExNiA4LjM2NmMuNDQzIDAgLjgzLS4xNDMgMS4xMTQtLjQyNy4yODMtLjI4My40MjQtLjY2OC40MjQtMS4xMTF2LS45OGgtMS4yMTV2Ljk4YzAgLjE3OC0uMDQuMjgtLjA4NS4zMzQtLjA0NS4wNTMtLjEwOC4wODQtLjI0Ny4wODRhLjM0MS4zNDEgMCAwMS0uMjU5LS4wOTRsLS4wMDUtLjAwNS0uMDA2LS4wMDVhMS41MjkgMS41MjkgMCAwMS0uMjg1LS4zMTMgNi4wMTQgNi4wMTQgMCAwMC0uMzQ1LS40NDVsLS4wMDMtLjAwNS0uMDAzLS4wMDNhMi4xNCAyLjE0IDAgMDAtLjUxMS0uMzkzbC0uMDAzLS4wMDItLjAwMy0uMDAyYTEuNjMgMS42MyAwIDAwLS43Ni0uMTYzYy0uNDM2IDAtLjgxNy4xNDMtMS4wOTMuNDI3LS4yODMuMjgzLS40MjUuNjctLjQyNSAxLjExMXYuOThoMS4yMTV2LS45OGMwLS4xNzkuMDQtLjI4Mi4wODUtLjMzNS4wNDUtLjA1My4xMDMtLjA4NS4yMzgtLjA4NS4xMTcgMCAuMi4wMzEuMjc4LjA5NWguMDAyYy4wOTIuMDg3LjE4Ny4xOTYuMjg0LjMyNGwuMDA1LjAwNmMuMTAzLjE0Ny4yMi4yOS4zNTEuNDI4bC4wMDUuMDA0Yy4xMzguMTYuMzA3LjI5My41MDMuMzk2LjIxLjEyMS40NjEuMTc4Ljc0NS4xNzh6IiBjb2xvcj0iIzAwMCIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==',
        graphIcon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjBtbSIgaGVpZ2h0PSIyMG1tIiB2aWV3Qm94PSIwIDAgMjAgMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTguOTk5IDQuMTY2cy45OTYgMS45NzYgMS40OSAyLjk2NWwuMDczLS4wODlhNS4zNiA1LjM2IDAgMDEuNzAzLS42NjcgMy45NTcgMy45NTcgMCAwMTEuNzA2LS43MyA0LjU2NyA0LjU2NyAwIDAxMS4yOTYgMEEzLjk1IDMuOTUgMCAwMTE3LjUyNiA5Yy4wNC4yOC4wNC43OTMgMCAxLjA3NGEzLjk1NCAzLjk1NCAwIDAxLTMuNjcgMy40bC0uMTg4LjAxMi40OTcuOTk1SDMuODMyem0zLjgwMiA5LjIzNmwtLjIyOS0uMDYzYTMuOTYgMy45NiAwIDAxLTIuNzY4LTIuODEgMy42MjIgMy42MjIgMCAwMS0uMTIyLS45OTJjMC0uNTIuMDktMS4wMDYuMjcxLTEuNDU3bC4wODMtLjIwOEM5LjY5IDcuMTg3IDkgNS44MTQgOSA1LjgxNGwtMy45NjMgNy45MDhoNy45MjZ6bTEuMTM5LS42OGEzLjIxNyAzLjIxNyAwIDAwMi42MDctMS44OTIgMy41IDMuNSAwIDAwLjIzOC0uODE2IDQuMDc1IDQuMDc1IDAgMDAwLS45NTQgMy4yMiAzLjIyIDAgMDAtMS43OS0yLjQxMiAzLjE5MSAzLjE5MSAwIDAwLTIuNzUxIDAgMy4yMzggMy4yMzggMCAwMC0xLjU1MyAxLjU5NWMtLjEwNS4yMzctLjIuNTYzLS4yMzguODE3YTQuMDc1IDQuMDc1IDAgMDAwIC45NTQgMy4yMiAzLjIyIDAgMDAxLjc5IDIuNDEyIDMuMTk1IDMuMTk1IDAgMDAxLjY5Ny4yOTZ6IiBmaWxsPSIjZmZmIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iLjEiLz48L3N2Zz4=',
        baseIcon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjBtbSIgaGVpZ2h0PSIyMG1tIiB2aWV3Qm94PSIwIDAgMjAgMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTkuMDcgMTEuODI5bC0uMDA2LTMuNDktMS44ODQtLjAxNCAyLjgwNC0zLjY0MiAyLjgzNyAzLjYzLTEuOTQxLjAyNi0uMDA3IDMuNDktLjAwNyAzLjQ4OUg5LjA3N3oiIGZpbGw9IiNmZmYiLz48L3N2Zz4=',
        miscellaneousIcon: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjBtbSIgaGVpZ2h0PSIyMG1tIiB2aWV3Qm94PSIwIDAgMjAgMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMSIgZmlsbD0iI2ZmZiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9Ii41Ii8+PGNpcmNsZSBjeD0iMTQiIGN5PSIxMCIgcj0iMSIgZmlsbD0iI2ZmZiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9Ii41Ii8+PGNpcmNsZSBjeD0iNiIgY3k9IjEwIiByPSIxIiBmaWxsPSIjZmZmIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iLjUiLz48L3N2Zz4='
    };

    const getEmptyIcon = (c1, c3) => {
        const head = 'data:image/svg+xml;base64,';
        const emptyIcon = `<svg width="20mm" height="20mm" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <circle cx="10" cy="10" r="9.5" fill="${c1}" stroke="${c3}" />
            </svg>
        `;
        return head + btoa(emptyIcon);
    }

    const setting = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik04LjI3MiAyLjY4NEExIDEgMCAwMTkuMjIxIDJoMS41NThhMSAxIDAgMDEuOTQ5LjY4NGwuNTk0IDEuNzgyYy40Ny4xOTcuOTA4LjQ1MiAxLjMwOC43NTZsMS44NDItLjM3N2ExIDEgMCAwMTEuMDY3LjQ4bC43NzkgMS4zNWExIDEgMCAwMS0uMTE4IDEuMTYzbC0xLjI0NyAxLjQwN2E2LjA1NCA2LjA1NCAwIDAxMCAxLjUxbDEuMjQ3IDEuNDA3YTEgMSAwIDAxLjExOCAxLjE2M2wtLjc4IDEuMzVhMSAxIDAgMDEtMS4wNjYuNDhsLTEuODQyLS4zNzdjLS40LjMwNC0uODM5LjU1OS0xLjMwOC43NTZsLS41OTQgMS43ODJhMSAxIDAgMDEtLjk0OS42ODRIOS4yMjFhMSAxIDAgMDEtLjk0OS0uNjg0bC0uNTk0LTEuNzgyYTUuOTk0IDUuOTk0IDAgMDEtMS4zMDgtLjc1NmwtMS44NDIuMzc3YTEgMSAwIDAxLTEuMDY3LS40OGwtLjc3OS0xLjM1YTEgMSAwIDAxLjExOC0xLjE2M2wxLjI0Ny0xLjQwN2E2LjA1OCA2LjA1OCAwIDAxMC0xLjUxTDIuOCA3LjgzOGExIDEgMCAwMS0uMTE4LTEuMTYzbC43OC0xLjM1YTEgMSAwIDAxMS4wNjYtLjQ4bDEuODQyLjM3N2MuNC0uMzA0LjgzOS0uNTU5IDEuMzA4LS43NTZsLjU5NC0xLjc4MnpNMTAgOGEyIDIgMCAxMDAgNCAyIDIgMCAwMDAtNHoiIGZpbGw9IiNmZmYiLz48L3N2Zz4=';
    const close = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCA4LjQ2NyA4LjQ2NyIgdmVyc2lvbj0iMS4xIiBpZD0icHJlZml4X19wcmVmaXhfX3N2ZzEiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnMgaWQ9InByZWZpeF9fcHJlZml4X19kZWZzMSI+PHN0eWxlIGlkPSJzdHlsZTEiPi5wcmVmaXhfX3ByZWZpeF9fY2xzLTF7ZmlsbDpub25lO3N0cm9rZTojZmZmO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2Utd2lkdGg6MnB4fTwvc3R5bGU+PC9kZWZzPjxnIGlkPSJwcmVmaXhfX3ByZWZpeF9fbGF5ZXIxIj48ZyBpZD0icHJlZml4X19wcmVmaXhfX2cxIiB0cmFuc2Zvcm09InJvdGF0ZSg0NSAuMDc0IDUuOTU3KSBzY2FsZSguNDgwNCkiPjxwYXRoIGNsYXNzPSJwcmVmaXhfX3ByZWZpeF9fY2xzLTEiIGlkPSJwcmVmaXhfX3ByZWZpeF9fbGluZTEiIGQ9Ik0zLjc0IDYuNDhWMSIvPjxwYXRoIGNsYXNzPSJwcmVmaXhfX3ByZWZpeF9fY2xzLTEiIGlkPSJwcmVmaXhfX3ByZWZpeF9fbGluZTIiIGQ9Ik0xIDMuNzRoNS40OCIvPjwvZz48L2c+PC9zdmc+';
    const AaIcon = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCA0LjIzMyA0LjIzMyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMS4xOSAyLjIzbC0uMjM4LjY5YS4xNzYuMTc2IDAgMDAtLjAwOS4wNDkuMDQuMDQgMCAwMC4wMTguMDM1LjE2OS4xNjkgMCAwMC4wNzUuMDE1bC4yMDguMDE1di4wNDhhNS44NyA1Ljg3IDAgMDAtLjM2Ni0uMDA2IDUuODcgNS44NyAwIDAwLS4zNjYuMDA2di0uMDQ4bC4xODctLjAxNWMuMDY2LS4wMDYuMTExLS4wNDMuMTM3LS4xMWwuNjY3LTEuNzk5aC4wODdsLjY1OCAxLjc3OGEuMjIyLjIyMiAwIDAwLjAzOC4wNjkuMTY1LjE2NSAwIDAwLjA2Ni4wMzJsLjE2NC4wNTF2LjA0NWE2LjkwMiA2LjkwMiAwIDAwLS4zOS0uMDFjLS4xNiAwLS4yOS4wMDQtLjM5LjAxVjMuMDRsLjE5Ni0uMDNhLjI1NC4yNTQgMCAwMC4wNzctLjAyYy4wMTYtLjAwOS4wMjQtLjAyLjAyNC0uMDM2YS4yMDguMjA4IDAgMDAtLjAxNS0uMDZsLS4yNC0uNjY0em0uNTYzLS4wNjZoLS41Mzl6bTEuOTMuNzI0bC4wMzkuMDIxYy0uMDU4LjE0My0uMTM3LjIxNC0uMjM4LjIxNGEuMjA0LjIwNCAwIDAxLS4xNDYtLjA1LjIxMy4yMTMgMCAwMS0uMDUxLS4xNTJjLS4xMS4wODMtLjE5LjEzOC0uMjQ0LjE2NGEuNDM5LjQzOSAwIDAxLS4xOTcuMDM4Yy0uMTI5IDAtLjE5My0uMDUyLS4xOTMtLjE1NyAwLS4wOTQuMDU2LS4xOTMuMTctLjI5OGExLjQxIDEuNDEgMCAwMS40Ny0uMjY4di0uMjAzYS4yMjMuMjIzIDAgMDAtLjA1NC0uMTU1LjE3OS4xNzkgMCAwMC0uMTQzLS4wNjIuMjQ5LjI0OSAwIDAwLS4xNzguMDcxLjMuMyAwIDAwLS4wOS4xOTQuMTI3LjEyNyAwIDAxLS4wNS4wODYuMTM1LjEzNSAwIDAxLS4wOS4wMzYuMTI4LjEyOCAwIDAxLS4wNDQtLjAwOS4wMzkuMDM5IDAgMDEtLjAyMS0uMDM2YzAtLjAyNy4wMjYtLjA4NC4wNzctLjE3YS41NTcuNTU3IDAgMDEuMTk0LS4xOTYuNDQ1LjQ0NSAwIDAxLjIyNi0uMDY5Yy4xMjMgMCAuMjEzLjAyNS4yNjguMDc1LjA1Ni4wNDguMDg0LjEyNS4wODQuMjMyVjIuOGMwIC4wNDUgMCAuMDgxLjAwMy4xMDdhLjA4Ny4wODcgMCAwMC4wMzIuMDU3LjA5Ni4wOTYgMCAwMC4wNTQuMDE3Yy4wNDQgMCAuMDg0LS4wMy4xMjItLjA5MnptLS4zOS0uMTE2di0uMzA3YS44OTYuODk2IDAgMDAtLjMxMy4xOTdjLS4wODEuMDgxLS4xMjIuMTU2LS4xMjIuMjIzIDAgLjAzOC4wMTIuMDcuMDM2LjA5NWEuMTM1LjEzNSAwIDAwLjA5NS4wMzZjLjA1NCAwIC4xMTctLjAyNy4xOS0uMDguMDc2LS4wNTYuMTE0LS4xMS4xMTQtLjE2NHoiIHN0eWxlPSItaW5rc2NhcGUtZm9udC1zcGVjaWZpY2F0aW9uOidTVFNvbmcsIE5vcm1hbCciIGFyaWEtbGFiZWw9IkEgYSIgb3BhY2l0eT0iLjIiIHN0cm9rZT0iIzAwMCIgc3Ryb2tlLXdpZHRoPSIuNCIvPjxwYXRoIGQ9Ik0xLjE5MSAyLjIzbC0uMjM4LjY5cS0uMDEuMDMtLjAxLjA0OCAwIC4wMjQuMDE5LjAzNi4wMTguMDEyLjA3NC4wMTVsLjIwOS4wMTV2LjA0OHEtLjA1Ny0uMDA2LS4zNjctLjAwNnQtLjM2Ni4wMDZ2LS4wNDhMLjcgMy4wMTlxLjA5OC0uMDA5LjEzNy0uMTFsLjY2Ny0xLjc5OWguMDg2bC42NTggMS43NzhxLjAyMS4wNS4wMzkuMDY4LjAxOC4wMTguMDY1LjAzM2wuMTY0LjA1di4wNDZxLS4xNTItLjAxLS4zOS0uMDEtLjIzOCAwLS4zOS4wMVYzLjA0bC4xOTYtLjAzcS4wNTctLjAwOS4wNzgtLjAyLjAyNC0uMDEzLjAyNC0uMDM3IDAtLjAxNy0uMDE1LS4wNmwtLjI0MS0uNjYzem0uNTYzLS4wNjZsLS4yNzctLjc2OC0uMjYyLjc2OHptMS45My43MjRsLjAzOC4wMnEtLjA4Ni4yMTUtLjIzOC4yMTUtLjA5MiAwLS4xNDYtLjA1LS4wNS0uMDU0LS4wNS0uMTUyLS4xNjQuMTI1LS4yNDUuMTY0LS4wNzcuMDM4LS4xOTYuMDM4LS4xOTQgMC0uMTk0LS4xNTggMC0uMTQuMTctLjI5Ny4xNzMtLjE1OC40Ny0uMjY4di0uMjAzcTAtLjA5NS0uMDUzLS4xNTUtLjA1NC0uMDYyLS4xNDMtLjA2Mi0uMTA0IDAtLjE3OS4wNzEtLjA3NC4wNjktLjA5LjE5NC0uMDA1LjA1LS4wNS4wODYtLjA0MS4wMzYtLjA5LjAzNi0uMDIgMC0uMDQ0LS4wMS0uMDItLjAxMS0uMDItLjAzNSAwLS4wNDIuMDc3LS4xN3QuMTkzLS4xOTZxLjExNi0uMDY5LjIyNy0uMDY5LjE4NCAwIC4yNjguMDc1LjA4My4wNzEuMDgzLjIzMlYyLjhxMCAuMDY4LjAwMy4xMDcuMDA2LjAzNi4wMzMuMDU2LjAyNy4wMTguMDUzLjAxOC4wNjYgMCAuMTIzLS4wOTJ6bS0uMzktLjExNnYtLjMwN3EtLjE5MS4wNzUtLjMxMy4xOTctLjEyMi4xMjItLjEyMi4yMjMgMCAuMDU3LjAzNS4wOTUuMDQuMDM2LjA5Ni4wMzYuMDggMCAuMTktLjA4LjExMy0uMDg0LjExMy0uMTY0eiIgc3R5bGU9Ii1pbmtzY2FwZS1mb250LXNwZWNpZmljYXRpb246J1NUU29uZywgTm9ybWFsJyIgYXJpYS1sYWJlbD0iQSBhIiBmaWxsPSIjZmZmIiBzdHJva2U9IiNmZmYiIHN0cm9rZS13aWR0aD0iLjEiLz48L3N2Zz4=';

    let addons = JSON.parse(localStorage.getItem('tw:addons')) || {};

    let customBlockText = addons['custom-block-text']
        ? {
            isEnabled: addons['custom-block-text'].enabled,
            isShadow: addons['custom-block-text'].shadow,
            isBold: addons['custom-block-text'].bold
        }
        : {
            isEnabled: false,
            isShadow: false,
            isBold: false
        };

    const getEditorCompact = () => {
        try {
            return addons['editor-compact'].enabled;
        }
        catch (error) {
            return false;
        }
    };

    const titleBarHeight = () => getEditorCompact() ? '32px' : '50px';

    let rtlRoot = 'data:image/svg+xml;base64,'; {
        let svg_content = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
            <svg width="50mm" height="50mm" viewBox="0 0 50 50" version="1.1" id="svg1" inkscape:version="1.3.1 (91b66b0783, 2023-11-16)" sodipodi:docname="rtlRoot.svg"
            xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
            xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:svg="http://www.w3.org/2000/svg">
            <sodipodi:namedview id="namedview1" pagecolor="#6859ff" bordercolor="#000000" borderopacity="0.25" inkscape:showpageshadow="2" inkscape:pageopacity="0.0" inkscape:pagecheckerboard="0" inkscape:deskcolor="#d1d1d1" inkscape:document-units="mm" inkscape:zoom="3.8753182" inkscape:cx="54.576164" inkscape:cy="108.50722" inkscape:window-width="1920" inkscape:window-height="1027" inkscape:window-x="1912" inkscape:window-y="-8" inkscape:window-maximized="1" inkscape:current-layer="svg1" />
            <defs id="defs1" />
            ${customBlockText.isShadow && customBlockText.isEnabled ? '<path style="font-size:37.6908px;opacity:0.4;fill:#000000;fill-opacity:1;stroke:#000000;stroke-width:' + (customBlockText.isBold && customBlockText.isEnabled ? '2' : '0.8') + ';stroke-dasharray:none;stroke-opacity:1" d="M 16.758463,12.116668 H 45.383332 V 12.92278 H 18.149401 L 8.9344399,42.733106 4.1451872,33.644593 1.5529852,38.781578 0.38333326,37.627733 4.5245342,29.392748 8.9028259,37.548703 Z" id="text1" aria-label="root" sodipodi:nodetypes="ccccccccccc" inkscape:label="shadow" />' : ''}
            <path style="font-size:37.6908px;opacity:1;fill:${getBlockColor() === 'highContrast' ? '#000000' : ('#ffffff' + (getBlockColor() === 'dark' ? 'b3' : ''))};stroke:${getBlockColor() === 'highContrast' ? '#000000' : ('#ffffff' + (getBlockColor() === 'dark' ? 'b3' : ''))};stroke-width:${customBlockText.isBold && customBlockText.isEnabled ? '2' : '0.8'};stroke-dasharray:none;stroke-opacity:1" d="m 18.875263,10 h 28.624869 v 0.806112 H 20.266201 l -9.214962,29.810326 -4.7892533,-9.088513 -2.592202,5.136985 -1.169652,-1.153845 4.141201,-8.234985 4.3782923,8.155955 z" id="text1-9" aria-label="root" sodipodi:nodetypes="ccccccccccc" inkscape:label="root" />
            </svg>
        `;
        rtlRoot += btoa(svg_content);
    }

    let blockPaletteIcons = addons['block-palette-icons'] ? addons['block-palette-icons'].enabled : false;

    const getDarkMode = () => {
        try {
            let theme = JSON.parse(localStorage.getItem('tw:theme'));
            return theme.gui !== 'light' || theme.gui === 'dark';
        }
        catch (error) {
            try {
                if (localStorage.getItem('tw:theme') === 'dark') {
                    return true;
                }
            }
            catch (error) { }
            return false;
        }
    };

    const rtlLang = ['ar', 'fa', 'he', 'ckb'];
    let isRTL = rtlLang.includes(localStorage.getItem('tw:language'));
    let isDark = getDarkMode();

    let mask = document.createElement('div');
    mask.style.position = 'fixed';
    mask.style.top = '0';
    mask.style.left = '0';
    mask.style.width = '100%';
    mask.style.height = '100%';
    mask.style.backgroundColor = isDark ? '#333333AA' : '#8c81ffe6';
    mask.style.zIndex = '998';
    mask.style.display = 'none';
    document.body.appendChild(mask);

    mask.addEventListener('click', (event) => {
        if (!settingWindow.contains(event.target)) {
            hideWindow();
        }
    });

    let settingWindow = document.createElement('div');
    settingWindow.style.position = 'fixed';
    settingWindow.style.transform = 'translate(-50%, -50%)';
    settingWindow.style.width = '450px';
    settingWindow.style.height = '550px';
    settingWindow.style.top = `calc(${settingWindow.style.height} / 2 + 100px + 6px)`;
    settingWindow.style.left = '50%';
    settingWindow.style.overflow = 'hidden';
    settingWindow.style.overflowX = 'hidden';
    settingWindow.style.backgroundColor = isDark ? '#111111' : '#FFFFFF';
    settingWindow.style.borderRadius = '5px';
    settingWindow.style.display = 'none';
    settingWindow.style.paddingBottom = '5px';
    settingWindow.style.zIndex = '999';
    settingWindow.style.boxShadow = '0 0 0 4px rgba(255, 255, 255, 0.2)';
    settingWindow.style.userSelect = 'none';
    document.body.appendChild(settingWindow);

    let windowContent = document.createElement('div');
    windowContent.style.position = 'absolute';
    windowContent.style.width = 'calc(100% - 44px)';
    windowContent.style.height = 'calc(550px - 50px - 40px)';
    windowContent.style.padding = '22px';
    windowContent.style.overflow = 'auto';
    settingWindow.appendChild(windowContent);

    let titleBar = document.createElement('div');
    titleBar.style.backgroundColor = '#594CD9';
    titleBar.style.color = '#fff';
    titleBar.style.fontSize = '16px';
    titleBar.style.top = '0';
    settingWindow.appendChild(titleBar);

    let titleText = document.createElement('div');
    titleText.style.display = 'flex';
    titleText.style.justifyContent = 'center';
    titleText.style.alignItems = 'center';
    titleBar.appendChild(titleText);

    let textLabel = document.createElement('div');
    textLabel.innerText = formatMessage({ id: 'OPERATION_SETTING', default: 'Setting' });
    textLabel.style.position = 'absolute';
    textLabel.style.top = '0px';
    textLabel.style.fontSize = '12px';
    textLabel.style.display = 'flex';
    textLabel.style.alignItems = 'center';
    titleBar.appendChild(textLabel);

    let settingIcon = document.createElement('img');
    settingIcon.src = setting;
    settingIcon.style.width = '24px';
    settingIcon.style.height = '24px';
    settingIcon.style.marginLeft = '12px';
    settingIcon.style.marginRight = '12px';
    textLabel.insertBefore(settingIcon, textLabel.firstChild);

    let closeButton = document.createElement('div');
    closeButton.style.position = 'absolute';
    closeButton.style.cursor = 'pointer';
    closeButton.style.borderRadius = '50%';
    closeButton.style.overflow = 'hidden';
    closeButton.style.transition = 'all 0.1s linear';
    titleBar.appendChild(closeButton);

    closeButton.addEventListener('click', () => {
        hideWindow();
    });

    let closeIcon = document.createElement('img');
    closeIcon.src = close;
    closeIcon.style.position = 'absolute';
    closeIcon.style.left = '50%';
    closeIcon.style.top = '50%';
    closeIcon.style.transform = 'translate(-50%, -50%)';
    closeIcon.style.transition = 'all 0.1s linear';
    closeButton.appendChild(closeIcon);

    closeButton.onmouseover = function () {
        this.style.width = (getEditorCompact() ? '26' : '40') + 'px';
        this.style.height = (getEditorCompact() ? '26' : '40') + 'px';
        this.style.top = (getEditorCompact() ? '3' : '5') + 'px';
        closeIcon.style.width = getEditorCompact() ? '125%' : '90%';
        closeIcon.style.height = getEditorCompact() ? '125%' : '90%';
        if (isRTL) {
            closeButton.style.left = '10px';
            closeButton.style.right = 'auto';
        } else {
            closeButton.style.right = '10px';
            closeButton.style.left = 'auto';
        }
    }

    closeButton.onmouseout = function () {
        this.style.width = (getEditorCompact() ? '20' : '32') + 'px';
        this.style.height = (getEditorCompact() ? '20' : '32') + 'px';
        this.style.top = (getEditorCompact() ? '6' : '9') + 'px';
        closeIcon.style.width = getEditorCompact() ? '150%' : '100%';
        closeIcon.style.height = getEditorCompact() ? '150%' : '100%';
        if (isRTL) {
            closeButton.style.left = (getEditorCompact() ? '13' : '14') + 'px';
            closeButton.style.right = 'auto';
        } else {
            closeButton.style.right = (getEditorCompact() ? '13' : '14') + 'px';
            closeButton.style.left = 'auto';
        }
    };

    const blend = (c1, c2, ratio) => {
        let r1 = parseInt(c1.substring(1, 3), 16);
        let g1 = parseInt(c1.substring(3, 5), 16);
        let b1 = parseInt(c1.substring(5, 7), 16);
        let r2 = parseInt(c2.substring(1, 3), 16);
        let g2 = parseInt(c2.substring(3, 5), 16);
        let b2 = parseInt(c2.substring(5, 7), 16);
        let r = Math.round(r1 * (1 - ratio) + r2 * ratio);
        let g = Math.round(g1 * (1 - ratio) + g2 * ratio);
        let b = Math.round(b1 * (1 - ratio) + b2 * ratio);
        r = ('0' + (r || 0).toString(16)).slice(-2);
        g = ('0' + (g || 0).toString(16)).slice(-2);
        b = ('0' + (b || 0).toString(16)).slice(-2);
        return '#' + r + g + b;
    };

    const newOption = ({ text, buttonText, runCode, icon, type }) => {
        let typeColor = blockColor[type];
        let color = () => {
            switch (getBlockColor()) {
                case 'dark': return [blend(typeColor?.color2, '#000000', 0.6), typeColor?.color2];
                case 'highContrast': return [blend(typeColor?.color1, '#ffffff', 0.35), typeColor?.color2];
                default: return [typeColor?.color1, typeColor?.color3];
            }
        }

        let optionDiv = document.createElement('div');
        optionDiv.style.display = 'flex';
        optionDiv.style.alignItems = 'center';

        if (icon && type) {
            let iconBorder = document.createElement('div');
            iconBorder.style.display = 'flex';
            iconBorder.style.justifyContent = 'center';
            iconBorder.style.alignItems = 'center';
            iconBorder.style.width = '20px';
            iconBorder.style.height = '20px';
            iconBorder.style.borderRadius = '10px';
            iconBorder.style.backgroundImage = `url(${blockColor.useTypeColor
                ? (getEmptyIcon(color()[0], color()[1]))
                : (typeIcons.emptyIcon[getBlockColor()])})`;

            iconBorder.style.backgroundSize = 'cover';
            if (isRTL) {
                iconBorder.style.marginLeft = '8px';
                iconBorder.style.marginRight = '0';
            } else {
                iconBorder.style.marginLeft = '0';
                iconBorder.style.marginRight = '8px';
            }
            optionDiv.appendChild(iconBorder);

            let optionIcon = document.createElement('div');
            optionIcon.style.width = '20px';
            optionIcon.style.height = '20px';
            optionIcon.style.borderRadius = '10px';
            optionIcon.style.backgroundImage = `url(${icon})`;
            optionIcon.style.backgroundSize = 'cover';
            iconBorder.appendChild(optionIcon);
        }

        let optionSpan = document.createElement('span');
        optionSpan.innerText = (text ?? '') + '：';
        optionDiv.appendChild(optionSpan);

        let optionButton = document.createElement('button');
        optionButton.style.margin = '4px';
        optionButton.style.padding = '9.6px 12px';
        optionButton.style.borderRadius = '8px';
        optionButton.style.backgroundColor = /*typeColor?.color1 ?? */'#6859FF';
        optionButton.style.color = '#FFFFFF';
        optionButton.style.fontWeight = '700';
        optionButton.style.fontSize = '14px';
        optionButton.style.border = 'none';
        optionButton.innerText = buttonText ?? '';
        optionButton.addEventListener('click', runCode)
        optionDiv.appendChild(optionButton);

        return optionDiv;
    };

    const showAndHideType = (type, style) => {
        HideBlockType[type] = style;
        vm.extensionManager.refreshBlocks();
        updateButton()
    };

    const updateButton = () => {
        const show = formatMessage({ id: 'OPERATION.SHOW', default: 'Show' });
        const hide = formatMessage({ id: 'OPERATION.HIDE', default: 'Hide' });
        const expand = '+ ' + formatMessage({ id: 'OPERATION.EXPAND', default: 'Expand' });
        const collapse = '- ' + formatMessage({ id: 'OPERATION.COLLAPSE', default: 'Collapse' });
        const rareBlock = formatMessage({ id: 'OPERATION.RARE_BLOCK', default: 'Rare block' });
        const expandMenu = formatMessage({ id: 'OPERATION.EXPAND_MENU', default: 'expand menu' });
        const letterCase = formatMessage({ id: 'OPERATION.LETTER_CASE', default: 'string letter case block' });
        const mathBlock = formatMessage({ id: 'OPERATION.MATH_LABEL', default: 'Math' });
        const booleanBlock = formatMessage({ id: 'OPERATION.BOOLEAN_LABEL', default: 'Boolean' });
        const stringBlock = formatMessage({ id: 'OPERATION.STRING_LABEL', default: 'String' });
        const splitBlock = formatMessage({ id: 'OPERATION.SPLIT_LABEL', default: 'Split' });
        const graphBlock = formatMessage({ id: 'OPERATION.GRAPH_LABEL', default: 'Graph' });
        const baseBlock = formatMessage({ id: 'OPERATION.BASE_LABEL', default: 'Base' });
        const miscellaneousBlock = formatMessage({ id: 'OPERATION.MISCELLANEOUS_LABEL', default: 'Miscellaneous' });

        while (windowContent.firstChild) {
            windowContent.removeChild(windowContent.firstChild);
        }

        windowContent.appendChild(newOption({
            text: rareBlock,
            buttonText: HideBlockType.rareBlock ? show : hide,
            runCode: (() => {
                showAndHideType('rareBlock', !HideBlockType.rareBlock);
            })
        }));

        windowContent.appendChild(
            document.createElement('br')
        );

        windowContent.appendChild(newOption({
            text: mathBlock + ' (15)',
            buttonText: HideBlockType.math ? expand : collapse,
            icon: typeIcons.mathIcon,
            runCode: (() => {
                showAndHideType('math', !HideBlockType.math);
            }),
            type: 'math'
        }));

        windowContent.appendChild(newOption({
            text: booleanBlock + ' (12)',
            buttonText: HideBlockType.bool ? expand : collapse,
            icon: typeIcons.booleanIcon,
            runCode: (() => {
                showAndHideType('bool', !HideBlockType.bool);
            }),
            type: 'bool'
        }));

        windowContent.appendChild(newOption({
            text: stringBlock + ' (23)',
            buttonText: HideBlockType.string ? expand : collapse,
            icon: typeIcons.stringIcon,
            runCode: (() => {
                showAndHideType('string', !HideBlockType.string);
            }),
            type: 'string'
        }));

        windowContent.appendChild(newOption({
            text: splitBlock + ' (08)',
            buttonText: HideBlockType.split ? expand : collapse,
            icon: typeIcons.splitIcon,
            runCode: (() => {
                showAndHideType('split', !HideBlockType.split);
            }),
            type: 'split'
        }));

        windowContent.appendChild(newOption({
            text: graphBlock + ' (12)',
            buttonText: HideBlockType.graph ? expand : collapse,
            icon: typeIcons.graphIcon,
            runCode: (() => {
                showAndHideType('graph', !HideBlockType.graph);
            }),
            type: 'graph'
        }));

        windowContent.appendChild(newOption({
            text: baseBlock + ' (08)',
            buttonText: HideBlockType.base ? expand : collapse,
            icon: typeIcons.baseIcon,
            runCode: (() => {
                showAndHideType('base', !HideBlockType.base);
            }),
            type: 'base'
        }));

        windowContent.appendChild(
            document.createElement('br')
        );

        windowContent.appendChild(newOption({
            text: miscellaneousBlock + ' (30)',
            buttonText: HideBlockType.miscellaneous ? expand : collapse,
            icon: typeIcons.miscellaneousIcon,
            runCode: (() => {
                showAndHideType('miscellaneous', !HideBlockType.miscellaneous);
            }),
            type: 'miscellaneous'
        }));

        if ((!HideBlockType.miscellaneous)) {
            windowContent.appendChild(newOption({
                text: expandMenu,
                buttonText: HideBlockType.expandMenu ? expand : collapse,
                icon: typeIcons.miscellaneousIcon,
                runCode: (() => {
                    showAndHideType('expandMenu', !HideBlockType.expandMenu);
                })
            }));
        }

        if ((!HideBlockType.miscellaneous)) {
            windowContent.appendChild(newOption({
                text: letterCase,
                buttonText: HideBlockType.letterCase ? expand : collapse,
                icon: typeIcons.miscellaneousIcon,
                runCode: (() => {
                    showAndHideType('letterCase', !HideBlockType.letterCase);
                })
            }));
        }
    };

    const setRTL = () => {
        isRTL = rtlLang.includes(localStorage.getItem('tw:language'));
        if (isRTL) {
            settingWindow.style.direction = 'rtl';
        } else {
            settingWindow.style.direction = 'ltr';
        }
        if (isRTL) {
            closeButton.style.left = '14px';
            closeButton.style.right = 'auto';
        } else {
            closeButton.style.right = '14px';
            closeButton.style.left = 'auto';
        }
    };

    const hideWindow = () => {
        settingWindow.style.display = 'none';
        mask.style.display = 'none';
    };

    const showWindow = () => {
        setRTL();
        updateButton();
        titleText.innerText = formatMessage({ id: 'OPERATION_EXT_NAME', default: 'Operation' });
        settingWindow.style.display = 'block';
        mask.style.display = 'block';
        isDark = getDarkMode();
        mask.style.backgroundColor = isDark ? '#333333AA' : '#8c81ffe6';
        settingWindow.style.backgroundColor = isDark ? '#111111' : '#FFFFFF';
        closeButton.style.backgroundColor = isDark ? '#FFFFFF26' : '#00000026';
        windowContent.style.color = isDark ? '#EEEEEE' : '#575E75';
        titleBar.style.height = titleBarHeight();
        titleBar.style.lineHeight = titleBarHeight();
        windowContent.style.top = titleBarHeight();
        closeButton.style.width = (getEditorCompact() ? '20' : '32') + 'px';
        closeButton.style.height = (getEditorCompact() ? '20' : '32') + 'px';
        closeButton.style.top = (getEditorCompact() ? '6' : '9') + 'px';
        closeIcon.style.width = getEditorCompact() ? '150%' : '100%';
        closeIcon.style.height = getEditorCompact() ? '150%' : '100%';
    };

    let HideBlockType = {
        math: false,
        bool: false,
        string: false,
        split: true,
        graph: true,
        base: true,
        rareBlock: true,
        expandMenu: true,
        letterCase: true, // 函数名末尾包含 “ci” 表示忽略大小写
        miscellaneous: true
    };

    let blockColor = {
        useTypeColor: true,
        math: {
            color1: '#62c22e',
            color2: '#4e9b25',
            color3: '#4e9b25'
        },
        bool: {
            color1: '#00a889',
            color2: '#00977b',
            color3: '#00866e'
        },
        string: {
            color1: '#cfb930',
            color2: '#baa72b',
            color3: '#a69426'
        },
        split: {
            color1: '#cf8d30',
            color2: '#ba7f2b',
            color3: '#a67126'
        },
        graph: {
            color1: '#ff976c',
            color2: '#e68861',
            color3: '#cc7956'
        },
        base: {
            color1: '#d65cbc',
            color2: '#c153a9',
            color3: '#ab4a96'
        },
        miscellaneous: {
            color1: '#6859ff',
            color2: '#5e50e6',
            color3: '#5347cc'
        }
    };

    const getColor = (type) => {
        if (!blockColor.useTypeColor) return {};
        return blockColor[type] ?? {};
    };

    const setExpandableBlocks = (expandableBlocks, runtime) => {
        // 在 Gandi 编辑器获取 scratchBlocks 与获取 VM 的方法来自 https://github.com/FurryR/lpp-scratch 的LPP扩展
        const hijack = (fn) => {
            const _orig = Function.prototype.apply;
            Function.prototype.apply = (thisArg) => thisArg;
            const result = fn();
            Function.prototype.apply = _orig;
            return result;
        };
        const getScratch = (runtime) => {
            try {
                function getEvent(e) {
                    return e instanceof Array ? e[e.length - 1] : e;
                }
                const vm = hijack(
                    getEvent(runtime._events['QUESTION'])
                ).props.vm;
                return {
                    scratchBlocks: hijack(
                        getEvent(vm._events['EXTENSION_ADDED'])
                    )?.ScratchBlocks,
                    vm
                };
            }
            catch (e) {
                return {
                    scratchBlocks: null,
                    vm: null
                }
            }
        }

        // 创建按钮
        const createButtons = (Blockly) => {
            // 按钮
            class FieldButton extends Blockly.FieldImage {
                constructor(src) {
                    super(src, 28, 28, undefined, false);
                    this.initialized = false;
                }
                init() {
                    super.init();
                    if (!this.initialized) {
                        // 第一次初始化
                        Blockly.bindEventWithChecks_(
                            this.getSvgRoot(), 'mousedown', this, (e) => {
                                e.stopPropagation();
                                // 阻止事件冒泡，要不然你点按钮就会执行积木（点击积木）
                            });
                        Blockly.bindEventWithChecks_(
                            this.getSvgRoot(), 'mouseup', this, this.handleClick.bind(this));
                        // 绑定上这个按钮点击事件
                    }
                    this.initialized = true;
                }

                handleClick(e) {
                    if (!this.sourceBlock_ || !this.sourceBlock_.workspace) {
                        return false;
                    }
                    if (this.sourceBlock_.workspace.isDragging()) {
                        return false;
                    }
                    if (this.sourceBlock_.isInFlyout) {
                        return false;
                    }
                    this.onclick(e);
                }

                onclick(e) {
                    // 子类实现
                }
            }

            // + 按钮
            class PlusButton extends FieldButton {
                constructor() {
                    super(plusImage());
                }

                onclick() {
                    const block = this.sourceBlock_
                    // 增加积木数量改变
                    block.itemCount_ += block.paramStep;
                    block.updateShape(); // 更新
                }
            }

            // - 按钮
            class MinusButton extends FieldButton {
                constructor() {
                    super(minusImage());
                }

                onclick() {
                    // 获取这个 field 的积木
                    const block = this.sourceBlock_;
                    // 增加积木数量改变
                    block.itemCount_ -= block.paramStep;
                    if (block.itemCount_ < 0) {
                        // 不能有 -1 个参数
                        block.itemCount_ = 0;
                    }
                    block.updateShape(); // 更新
                }
            }

            // 图片
            const minusImage = () => {
                const head = 'data:image/svg+xml;base64,';
                let color = () => {
                    switch (getBlockColor()) {
                        case 'dark': return ['#fff', '#ffffff80'];
                        case 'highContrast': return ['#000', '#00000080'];
                        default: return ['#fff', '#00000033'];
                    }
                }
                const svg = `<svg width="28" height="28" viewBox="0 0 7.408 7.408" xmlns="http://www.w3.org/2000/svg">
                    <g paint-order="markers fill stroke">
                    <g transform="translate(.165 .083)" fill="${color()[0]}">
                        <rect width="3.969" height=".794" x="1.555" y="3.225" ry=".397" />
                    </g>
                    <rect width="6.35" height="6.35" x=".529" y=".529" rx=".941" ry=".941" fill="none" stroke="${color()[1]}"
                        stroke-width=".265" stroke-linejoin="round" />
                    </g>
                </svg>`;
                return head + btoa(svg);
            }

            const plusImage = () => {
                const head = 'data:image/svg+xml;base64,';
                let color = () => {
                    switch (getBlockColor()) {
                        case 'dark': return ['#fff', '#ffffff80'];
                        case 'highContrast': return ['#000', '#00000080'];
                        default: return ['#fff', '#00000033'];
                    }
                }
                const svg = `<svg width="28" height="28" viewBox="0 0 7.408 7.408" xmlns="http://www.w3.org/2000/svg">
                    <g paint-order="markers fill stroke">
                    <g transform="translate(.165 .083)" fill="${color()[0]}">
                        <rect width="3.969" height=".794" x="1.555" y="3.225" ry=".397" />
                        <rect width="3.969" height=".794" x="1.637" y="-3.936" ry=".397" transform="rotate(90)" />
                    </g>
                    <rect width="6.35" height="6.35" x=".529" y=".529" rx=".941" ry=".941" fill="none" stroke="${color()[1]}"
                        stroke-width=".265" stroke-linejoin="round" />
                    </g>
                </svg>`;
                return head + btoa(svg);
            }

            return {
                PlusButton, MinusButton
            };
        }
        const createExpandableBlock = (runtime, Blockly) => {

            const { PlusButton, MinusButton } = createButtons(Blockly);
            // 这个是 scratch 函数的 utils
            const ProcedureUtils = Blockly.ScratchBlocks.ProcedureUtils;

            return {
                attachShadow_: function (input,
                    argumentType) {
                    if (argumentType == 'n' || argumentType == 's') {
                        var blockType = argumentType == 'n' ? 'math_number' : 'text';
                        Blockly.Events.disable();
                        try {
                            var newBlock = this.workspace.newBlock(blockType);
                            if (argumentType == 'n') {
                                newBlock.setFieldValue('', 'NUM');
                            } else {
                                newBlock.setFieldValue('', 'TEXT');
                            }
                            newBlock.setShadow(true);
                            if (!this.isInsertionMarker()) {
                                newBlock.initSvg();
                                newBlock.render(false);
                            }
                        } finally {
                            Blockly.Events.enable();
                        }
                        if (Blockly.Events.isEnabled()) {
                            Blockly.Events.fire(new Blockly.Events.BlockCreate(newBlock));
                        }
                        newBlock.outputConnection.connect(input.connection);
                    }
                },

                updateShape: function () {
                    var wasRendered = this.rendered;
                    this.rendered = false;

                    // 更新参数
                    Blockly.Events.setGroup(true);
                    // 先记录现在的 mutation
                    var oldExtraState = Blockly.Xml.domToText(this.mutationToDom(this));
                    // 创建新的积木
                    for (var i = 0; i < this.itemCount_; i++) {
                        if (!this.getInput('ADD' + i)) {
                            const input = this.appendValueInput('ADD' + i);
                            if (this.argType == INPUT_TYPES.BOOLEAN) {
                                input.setCheck('Boolean');
                            } else {
                                this.attachShadow_(input, this.argType);
                            }
                            if (i > 0 && this.separatorText) {
                                input.insertFieldAt(0, this.separatorText, null); // 插入分隔符文本
                            }
                        }
                    }

                    // 将 + - 按钮移动到最右边
                    this.moveInputBefore('PLUSMINUS', null)
                    if (runtime._editingTarget) {
                        // 移除 input 并记录
                        const blocks = runtime._editingTarget.blocks;
                        const targetBlock = blocks.getBlock(this.id);
                        const toDel = [];
                        while (this.getInput('ADD' + i)) {
                            const input = targetBlock.inputs['ADD' + i];
                            if (input) {
                                if (input.block !== null) {
                                    const blockInInput = blocks.getBlock(input.block);
                                    blockInInput.topLevel = true;
                                    blockInInput.parent = null;
                                    blocks.moveBlock({
                                        id: blockInInput.id,
                                        oldParent: this.id,
                                        oldInput: 'ADD' + i,
                                        newParent: undefined,
                                        newInput: undefined,
                                        //newCoordinate: e.newCoordinate
                                    });
                                }
                                if (input.shadow !== null && input.shadow == input.block) {
                                    blocks.deleteBlock(input.shadow);
                                }
                            }
                            toDel.push('ADD' + i)
                            //delete targetBlock.inputs['ADD' + i]
                            this.removeInput('ADD' + i);
                            i++;
                        }
                        setTimeout(() => {
                            toDel.forEach((i) => {
                                delete targetBlock.inputs[i];
                            })
                        }, 0);
                    }

                    // 更新 oldItemCount，oldItemCount 用于生成 domMutation 的
                    this.oldItemCount = this.itemCount_;
                    // 新的 mutation
                    const newExtraState = Blockly.Xml.domToText(this.mutationToDom(this));
                    if (oldExtraState != newExtraState) {
                        // 判断是否一样，不一样就 fire 一个 mutation 更新事件
                        Blockly.Events.fire(
                            new Blockly.Events.BlockChange(
                                this, 'mutation', null,
                                oldExtraState, newExtraState, // 状态
                            ),
                        );
                    }
                    Blockly.Events.setGroup(false);

                    this.rendered = wasRendered;
                    if (wasRendered && !this.isInsertionMarker()) {
                        this.initSvg();
                        this.render();
                    }
                },
                mutationToDom: function () {
                    // 可以保存别的数据，会保存到 sb3 中，oldItemCount 就是有多少个参数
                    const container = document.createElement('mutation');
                    container.setAttribute('items', `${this.oldItemCount}`);
                    return container;
                },
                domToMutation: function (xmlElement) {
                    // 读取 mutationToDom 保存的数据
                    this.itemCount_ = parseInt(xmlElement.getAttribute('items'), 0);
                    this.updateShape(); // 读了之后更新
                },
                init: function (attributes) {
                    // 积木初始化
                    this.itemCount_ = attributes.defaultItemCount || 0;
                    this.oldItemCount = this.itemCount_;
                    this.paramStep = attributes.paramStep || 1;

                    this.plusButton = new PlusButton();
                    this.minusButton = new MinusButton();

                    this.appendDummyInput("PLUSMINUS")
                        .appendField(this.plusButton)
                        .appendField(this.minusButton);

                    this.argType = attributes.type;
                    this.separatorText = attributes.separatorText;
                },
            }
        }
        const { scratchBlocks } = getScratch(runtime);
        if (!scratchBlocks) return;
        const expandableAttr = createExpandableBlock(runtime, scratchBlocks);
        scratchBlocks.Blocks = new Proxy(scratchBlocks.Blocks, {
            set(target, property, value) {
                // 设置
                if (expandableBlocks[property]) {
                    Object.keys(expandableAttr).forEach(key => {
                        if (key != 'init') {
                            // 设置，除了 init，后面设置
                            value[key] = expandableAttr[key];
                        }
                    });
                    const orgInit = value.init;
                    value.init = function () {
                        // 先用原本的 init
                        orgInit.call(this);
                        // 然后再 init expandable 的
                        expandableAttr.init.call(this, expandableBlocks[property]);
                    }
                }
                return Reflect.set(target, property, value);
            },
        })
    }
    const INPUT_TYPES = {
        STRING: 's',
        NUMBER: 'n',
        BOOLEAN: 'b'
    };

    const sep = (hide) => [
        {
            blockType: BlockType.XML,
            xml: `<sep gap="36"/>`,
            hideFromPalette: hide
        }
    ];

    const negSep = (hide) => [
        {
            blockType: BlockType.XML,
            xml: `<sep gap="-12"/>`,
            hideFromPalette: hide
        }
    ];

    const rareHideAndSow = (type) => HideBlockType[type] || HideBlockType.rareBlock;

    const expandMenuHideAndSow = (type) => HideBlockType[type] || HideBlockType.expandMenu;

    const allCompare = (hide) => [
        ...sep(expandMenuHideAndSow('bool')),
        {
            opcode: 'trueBlock',
            blockType: BlockType.BOOLEAN,
            disableMonitor: true,
            text: formatMessage({
                id: 'OPERATION.TRUE',
                default: 'true'
            }),
            hideFromPalette: expandMenuHideAndSow('bool') || HideBlockType.miscellaneous
        },
        ...negSep(expandMenuHideAndSow('bool')),
        {
            opcode: 'falseBlock',
            blockType: BlockType.BOOLEAN,
            disableMonitor: true,
            text: formatMessage({
                id: 'OPERATION.FALSE',
                default: 'false'
            }),
            hideFromPalette: expandMenuHideAndSow('bool') || HideBlockType.miscellaneous
        },
        {
            opcode: 'strictlyEqualBlock',
            blockType: BlockType.BOOLEAN,
            text: '[OPERAND1] ≡ [OPERAND2]',
            arguments: {
                OPERAND1: {
                    type: ArgumentType.STRING,
                    defaultValue: ''
                },
                OPERAND2: {
                    type: ArgumentType.STRING,
                    defaultValue: '50'
                }
            },
            hideFromPalette: expandMenuHideAndSow('bool') || HideBlockType.miscellaneous
        },
        ...negSep(expandMenuHideAndSow('bool')),
        {
            opcode: 'greaterOrEqualBlock',
            blockType: BlockType.BOOLEAN,
            text: '[OPERAND1] ≥ [OPERAND2]',
            arguments: {
                OPERAND1: {
                    type: ArgumentType.STRING,
                    defaultValue: ''
                },
                OPERAND2: {
                    type: ArgumentType.STRING,
                    defaultValue: '50'
                }
            },
            hideFromPalette: expandMenuHideAndSow('bool') || HideBlockType.miscellaneous
        },
        ...negSep(expandMenuHideAndSow('bool')),
        {
            opcode: 'lessOrEqualBlock',
            blockType: BlockType.BOOLEAN,
            text: '[OPERAND1] ≤ [OPERAND2]',
            arguments: {
                OPERAND1: {
                    type: ArgumentType.STRING,
                    defaultValue: ''
                },
                OPERAND2: {
                    type: ArgumentType.STRING,
                    defaultValue: '50'
                }
            },
            hideFromPalette: expandMenuHideAndSow('bool') || HideBlockType.miscellaneous
        },
        ...negSep(expandMenuHideAndSow('bool')),
        {
            opcode: 'unequalBlock',
            blockType: BlockType.BOOLEAN,
            text: '[OPERAND1] ≠ [OPERAND2]',
            arguments: {
                OPERAND1: {
                    type: ArgumentType.STRING,
                    defaultValue: ''
                },
                OPERAND2: {
                    type: ArgumentType.STRING,
                    defaultValue: '50'
                }
            },
            hideFromPalette: expandMenuHideAndSow('bool') || HideBlockType.miscellaneous
        },
        ...negSep(expandMenuHideAndSow('bool')),
        {
            opcode: 'strictlyUnequalBlock',
            blockType: BlockType.BOOLEAN,
            text: '[OPERAND1] ≢ [OPERAND2]',
            arguments: {
                OPERAND1: {
                    type: ArgumentType.STRING,
                    defaultValue: ''
                },
                OPERAND2: {
                    type: ArgumentType.STRING,
                    defaultValue: '50'
                }
            },
            hideFromPalette: expandMenuHideAndSow('bool') || HideBlockType.miscellaneous
        },
        ...negSep(expandMenuHideAndSow('bool')),
        {
            opcode: 'equalNegativeBlock',
            blockType: BlockType.BOOLEAN,
            text: '[OPERAND1] =- [OPERAND2]',
            arguments: {
                OPERAND1: {
                    type: ArgumentType.NUMBER,
                    defaultValue: ''
                },
                OPERAND2: {
                    type: ArgumentType.NUMBER,
                    defaultValue: '50'
                }
            },
            hideFromPalette: expandMenuHideAndSow('bool') || HideBlockType.miscellaneous
        },
        ...negSep(expandMenuHideAndSow('bool')),
        {
            opcode: 'EqualPONBlock',
            blockType: BlockType.BOOLEAN,
            text: '[OPERAND1] =± [OPERAND2]',
            arguments: {
                OPERAND1: {
                    type: ArgumentType.NUMBER,
                    defaultValue: ''
                },
                OPERAND2: {
                    type: ArgumentType.NUMBER,
                    defaultValue: '50'
                }
            },
            hideFromPalette: expandMenuHideAndSow('bool') || HideBlockType.miscellaneous
        },
        ...negSep(expandMenuHideAndSow('bool')),
        {
            opcode: 'approximatelyEqualBlock',
            blockType: BlockType.BOOLEAN,
            text: '[OPERAND1] ≈ [OPERAND2]',
            arguments: {
                OPERAND1: {
                    type: ArgumentType.NUMBER,
                    defaultValue: ''
                },
                OPERAND2: {
                    type: ArgumentType.NUMBER,
                    defaultValue: '50'
                }
            },
            hideFromPalette: expandMenuHideAndSow('bool') || HideBlockType.miscellaneous
        },
        ...negSep(expandMenuHideAndSow('bool')),
        {
            opcode: 'verticalBlock',
            blockType: BlockType.BOOLEAN,
            text: '[OPERAND1] ⊥ [OPERAND2]',
            arguments: {
                OPERAND1: {
                    type: ArgumentType.ANGLE,
                    defaultValue: ''
                },
                OPERAND2: {
                    type: ArgumentType.ANGLE,
                    defaultValue: '90'
                }
            },
            hideFromPalette: expandMenuHideAndSow('bool') || HideBlockType.miscellaneous
        },
        ...negSep(expandMenuHideAndSow('bool')),
        {
            opcode: 'parallelBlock',
            blockType: BlockType.BOOLEAN,
            text: '[OPERAND1] ∥ [OPERAND2]',
            arguments: {
                OPERAND1: {
                    type: ArgumentType.ANGLE,
                    defaultValue: ''
                },
                OPERAND2: {
                    type: ArgumentType.ANGLE,
                    defaultValue: '90'
                }
            },
            hideFromPalette: expandMenuHideAndSow('bool') || HideBlockType.miscellaneous
        },
        {
            opcode: 'nandBlock',
            blockType: BlockType.BOOLEAN,
            text: `[OPERAND1] ${formatMessage({ id: 'OPERATION.NAND', default: 'nand' })} [OPERAND2]`,
            arguments: {
                OPERAND1: {
                    type: ArgumentType.BOOLEAN
                },
                OPERAND2: {
                    type: ArgumentType.BOOLEAN
                }
            },
            hideFromPalette: expandMenuHideAndSow('bool') || hide || HideBlockType.miscellaneous
        },
        ...negSep(expandMenuHideAndSow('bool')),
        {
            opcode: 'norBlock',
            blockType: BlockType.BOOLEAN,
            text: `[OPERAND1] ${formatMessage({ id: 'OPERATION.NOR', default: 'nor' })} [OPERAND2]`,
            arguments: {
                OPERAND1: {
                    type: ArgumentType.BOOLEAN
                },
                OPERAND2: {
                    type: ArgumentType.BOOLEAN
                }
            },
            hideFromPalette: expandMenuHideAndSow('bool') || hide || HideBlockType.miscellaneous
        },
        ...negSep(expandMenuHideAndSow('bool')),
        {
            opcode: 'xorBlock',
            blockType: BlockType.BOOLEAN,
            text: `[OPERAND1] ${formatMessage({ id: 'OPERATION.XOR', default: 'xor' })} [OPERAND2]`,
            arguments: {
                OPERAND1: {
                    type: ArgumentType.BOOLEAN
                },
                OPERAND2: {
                    type: ArgumentType.BOOLEAN
                }
            },
            hideFromPalette: expandMenuHideAndSow('bool') || hide || HideBlockType.miscellaneous
        },
        ...negSep(expandMenuHideAndSow('bool')),
        {
            opcode: 'xnorBlock',
            blockType: BlockType.BOOLEAN,
            text: `[OPERAND1] ${formatMessage({ id: 'OPERATION.XNOR', default: 'xnor' })} [OPERAND2]`,
            arguments: {
                OPERAND1: {
                    type: ArgumentType.BOOLEAN
                },
                OPERAND2: {
                    type: ArgumentType.BOOLEAN
                }
            },
            hideFromPalette: expandMenuHideAndSow('bool') || hide || HideBlockType.miscellaneous
        }
    ];

    const allBitwise = (hide, isRTL) => [
        ...sep(hide),
        {
            opcode: 'bitwiseAndBlock',
            blockType: BlockType.REPORTER,
            text: '[NUM1] & [NUM2]',
            arguments: {
                NUM1: {
                    type: ArgumentType.NUMBER,
                    defaultValue: ''
                },
                NUM2: {
                    type: ArgumentType.NUMBER,
                    defaultValue: ''
                }
            },
            hideFromPalette: hide
        },
        ...negSep(hide),
        {
            opcode: 'bitwiseOrBlock',
            blockType: BlockType.REPORTER,
            text: '[NUM1] | [NUM2]',
            arguments: {
                NUM1: {
                    type: ArgumentType.NUMBER,
                    defaultValue: ''
                },
                NUM2: {
                    type: ArgumentType.NUMBER,
                    defaultValue: ''
                }
            },
            hideFromPalette: hide
        },
        ...negSep(hide),
        {
            opcode: 'bitwiseXorBlock',
            blockType: BlockType.REPORTER,
            text: '[NUM1] ^ [NUM2]',
            arguments: {
                NUM1: {
                    type: ArgumentType.NUMBER,
                    defaultValue: ''
                },
                NUM2: {
                    type: ArgumentType.NUMBER,
                    defaultValue: ''
                }
            },
            hideFromPalette: hide
        },
        ...negSep(hide),
        {
            opcode: 'bitwiseLeftShiftBlock',
            blockType: BlockType.REPORTER,
            text: '[NUM1]' + (!isRTL ? '<<' : '>>') + '[NUM2]',
            arguments: {
                NUM1: {
                    type: ArgumentType.NUMBER,
                    defaultValue: ''
                },
                NUM2: {
                    type: ArgumentType.NUMBER,
                    defaultValue: ''
                }
            },
            hideFromPalette: hide
        },
        ...negSep(hide),
        {
            opcode: 'bitwiseRightShiftBlock',
            blockType: BlockType.REPORTER,
            text: '[NUM1]' + (!isRTL ? '>>' : '<<') + '[NUM2]',
            arguments: {
                NUM1: {
                    type: ArgumentType.NUMBER,
                    defaultValue: ''
                },
                NUM2: {
                    type: ArgumentType.NUMBER,
                    defaultValue: ''
                }
            },
            hideFromPalette: hide
        },
        ...negSep(hide),
        {
            opcode: 'bitwiseLogicalRightShiftBlock',
            blockType: BlockType.REPORTER,
            text: '[NUM1]' + (!isRTL ? '>>>' : '<<<') + '[NUM2]',
            arguments: {
                NUM1: {
                    type: ArgumentType.NUMBER,
                    defaultValue: ''
                },
                NUM2: {
                    type: ArgumentType.NUMBER,
                    defaultValue: ''
                }
            },
            hideFromPalette: hide
        }
    ];

    const getInfo = () => ({
        color1: '#6859ff',
        color2: '#5e50e6',
        color3: '#5347cc',
        menuIconURI: blockPaletteIcons ? typeIcons.operatorsIcon[getBlockColor()] : undefined,
        id: 'OPERATION',
        name: formatMessage({
            id: 'OPERATION_EXT_NAME',
            default: 'Operators'
        }),
        blocks: descriptor(formatMessage, isRTL),
        menus: menus(formatMessage, isRTL)
    });

    const descriptor = (formatMessage) => {
        return [
            {
                func: 'openSettingWindow',
                blockType: BlockType.BUTTON,
                text: formatMessage({
                    id: 'OPERATION_SETTING',
                    default: 'Setting'
                }),
            },
            ...[
                {
                    opcode: 'exponent',
                    blockType: BlockType.REPORTER,
                    text: '[NUM1] ↑ [NUM2]',
                    arguments: {
                        NUM1: {
                            type: ArgumentType.NUMBER,
                            defaultValue: ''
                        },
                        NUM2: {
                            type: ArgumentType.NUMBER,
                            defaultValue: ''
                        }
                    },
                    hideFromPalette: HideBlockType.math
                },
                {
                    opcode: 'root',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'OPERATION.ROOT',
                        default: '[NUM1] √ [NUM2]'
                    }),
                    arguments: {
                        NUM1: {
                            type: ArgumentType.NUMBER,
                            defaultValue: ''
                        },
                        NUM2: {
                            type: ArgumentType.NUMBER,
                            defaultValue: ''
                        },
                        RTL_ROOT: {
                            type: ArgumentType.IMAGE,
                            dataURI: rtlRoot,
                            flipRTL: true
                        }
                    },
                    hideFromPalette: HideBlockType.math
                },
                {
                    opcode: 'negative',
                    blockType: BlockType.REPORTER,
                    text: '- [NUM]',
                    arguments: {
                        NUM: {
                            type: ArgumentType.NUMBER,
                            defaultValue: ''
                        }
                    },
                    hideFromPalette: HideBlockType.math
                },
                ...sep(HideBlockType.math),
                {
                    opcode: 'constrain',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'OPERATION.CONSTRAIN',
                        default: 'constrain [NUM] low [LOW] high [HIGH]'
                    }),
                    arguments: {
                        NUM: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '50'
                        },
                        LOW: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '1'
                        },
                        HIGH: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '100'
                        }
                    },
                    hideFromPalette: HideBlockType.math
                },
                {
                    opcode: 'loopNum',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'OPERATION.LOOP_NUMBER',
                        default: '[NUM] loop in [START] to [END]'
                    }),
                    arguments: {
                        NUM: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '1'
                        },
                        START: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '1'
                        },
                        END: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '4'
                        }
                    },
                    hideFromPalette: HideBlockType.math
                },

                {
                    opcode: 'round',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'OPERATION.ROUND',
                        default: 'round [NUM1] to [NUM2] decimal places'
                    }),
                    arguments: {
                        NUM1: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '3.14'
                        },
                        NUM2: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '1'
                        },
                    },
                    hideFromPalette: true
                },
                {
                    // 这个是为了做出正整数输入框 (math_whole_number)
                    blockType: BlockType.XML,
                    xml: `
                    <block type="${'OPERATION_' + 'round'}">
                        <value name="NUM1">
                            <shadow type="math_number">
                                <field name="NUM">3.14</field>
                            </shadow>
                        </value>
                        <value name="NUM2">
                            <shadow type="math_whole_number">
                                <field name="NUM">1</field>
                            </shadow>
                        </value>
                    </block>
                `,
                    hideFromPalette: HideBlockType.math
                },

                {
                    opcode: 'mapOff',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'OPERATION.MAP_OFF',
                        default: 'map [NUM] from [START1] ~ [END1] to [START2] ~ [END2]'
                    }),
                    arguments: {
                        NUM: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '10'
                        },
                        START1: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '0'
                        },
                        END1: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '100'
                        },
                        START2: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '0'
                        },
                        END2: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '1000'
                        }
                    },
                    hideFromPalette: HideBlockType.math
                },
                {
                    opcode: 'find',
                    disableMonitor: true,
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'OPERATION.FIND',
                        default: 'find [MODE]'
                    }),
                    arguments: {
                        MODE: {
                            type: ArgumentType.STRING,
                            menu: 'SPLIT_ANALYSIS_MODE'
                        }
                    },
                    hideFromPalette: HideBlockType.math
                },
                ...sep(rareHideAndSow('math')),
                {
                    opcode: 'atan2Block',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'OPERATION.ATAN2',
                        default: 'atan2 x: [NUM2] y: [NUM1]'
                    }),
                    arguments: {
                        NUM1: {
                            type: ArgumentType.NUMBER,
                            defaultValue: ''
                        },
                        NUM2: {
                            type: ArgumentType.NUMBER,
                            defaultValue: ''
                        }
                    },
                    hideFromPalette: rareHideAndSow('math')
                },

                {
                    opcode: 'logWithBase',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'OPERATION.LOG_WITH_BASE',
                        default: 'log base [BASE] of [NUM]'
                    }),
                    arguments: {
                        NUM: {
                            type: ArgumentType.NUMBER,
                            defaultValue: ''
                        },
                        BASE: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '10'
                        }
                    },
                    hideFromPalette: true
                },
                {
                    // 这个是为了做出正数输入框 (math_positive_number)
                    blockType: BlockType.XML,
                    xml: `
                    <block type="${'OPERATION_' + 'logWithBase'}">
                        <value name="NUM">
                            <shadow type="math_number">
                                <field name="NUM"></field>
                            </shadow>
                        </value>
                        <value name="BASE">
                            <shadow type="math_positive_number">
                                <field name="NUM">10</field>
                            </shadow>
                        </value>
                    </block>
                `,
                    hideFromPalette: rareHideAndSow('math')
                },

                {
                    opcode: 'factorial',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'OPERATION.FACTORIAL',
                        default: 'factorial [NUM]'
                    }),
                    arguments: {
                        NUM: {
                            type: ArgumentType.NUMBER,
                            defaultValue: ''
                        }
                    },
                    hideFromPalette: true
                },
                {
                    // 这个是为了做出正整数输入框 (math_whole_number)
                    blockType: BlockType.XML,
                    xml: `
                    <block type="${'OPERATION_' + 'factorial'}">
                        <value name="NUM">
                            <shadow type="math_whole_number">
                                <field name="NUM" />
                            </shadow>
                        </value>
                    </block>
                `,
                    hideFromPalette: rareHideAndSow('math')
                },

                ...sep(rareHideAndSow('math')),
                {
                    opcode: 'squareRoot',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'OPERATION.SQUARE_ROOT',
                        default: '√ [NUM]'
                    }),
                    arguments: {
                        NUM: {
                            type: ArgumentType.NUMBER,
                            defaultValue: ''
                        },
                        RTL_ROOT: {
                            type: ArgumentType.IMAGE,
                            dataURI: rtlRoot,
                            flipRTL: true
                        }
                    },
                    hideFromPalette: true
                },
                {
                    opcode: 'cubeRoot',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'OPERATION.CUBE_ROOT',
                        default: '∛ [NUM]'
                    }),
                    arguments: {
                        NUM: {
                            type: ArgumentType.NUMBER,
                            defaultValue: ''
                        }
                    },
                    hideFromPalette: rareHideAndSow('math')
                },
                {
                    opcode: 'toPercent',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'OPERATION.TO_PERCENT',
                        default: '[NUM] %'
                    }),
                    arguments: {
                        NUM: {
                            type: ArgumentType.NUMBER,
                            defaultValue: ''
                        }
                    },
                    hideFromPalette: rareHideAndSow('math')
                },
                ...sep(rareHideAndSow('math')),
                {
                    opcode: 'percentOf',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'OPERATION.PERCENT_OF',
                        default: '[NUM1] % of [NUM2]'
                    }),
                    arguments: {
                        NUM1: {
                            type: ArgumentType.NUMBER,
                            defaultValue: ''
                        },
                        NUM2: {
                            type: ArgumentType.NUMBER,
                            defaultValue: ''
                        }
                    },
                    hideFromPalette: rareHideAndSow('math')
                },
                {
                    opcode: 'calculate',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'OPERATION.CALCULATE',
                        default: 'calculate [TEXT]'
                    }),
                    arguments: {
                        TEXT: {
                            type: ArgumentType.STRING,
                            defaultValue: '√16 + π + abs(-1) (-1)'
                        }
                    },
                    hideFromPalette: rareHideAndSow('math')
                }
            ].map(obj => ({ ...obj, ...{ ...getColor('math') } })),
            ...sep(HideBlockType.math),
            {
                blockType: BlockType.LABEL,
                text: formatMessage({
                    id: 'OPERATION.BOOLEAN_LABEL',
                    default: 'Boolean'
                }),
                hideFromPalette: HideBlockType.bool
            },
            ...[
                {
                    opcode: 'booleanMenu',
                    blockType: BlockType.BOOLEAN,
                    disableMonitor: true,
                    text: '[BOOLEAN]',
                    arguments: {
                        BOOLEAN: {
                            type: ArgumentType.STRING,
                            menu: 'BOOLEAN_MENU'
                        }
                    },
                    hideFromPalette: HideBlockType.bool
                },

                {
                    opcode: 'probability',
                    blockType: BlockType.BOOLEAN,
                    text: formatMessage({
                        id: 'OPERATION.RANDOM',
                        default: 'random'
                    }) + ': [NUM] %',
                    arguments: {
                        NUM: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '50'
                        }
                    },
                    hideFromPalette: true
                },
                {
                    // 这个是为了做出正数输入框 (math_positive_number)
                    blockType: BlockType.XML,
                    xml: `
                    <block type="${'OPERATION_' + 'probability'}">
                        <value name="NUM">
                            <shadow type="math_positive_number">
                                <field name="NUM">50</field>
                            </shadow>
                        </value>
                    </block>
                `,
                    hideFromPalette: HideBlockType.bool
                },

                ...sep(HideBlockType.bool),
                {
                    opcode: 'isTrue',
                    blockType: BlockType.BOOLEAN,
                    text: formatMessage({
                        id: 'OPERATION.IS_TRUE',
                        default: '[OPERAND] is true?'
                    }),
                    arguments: {
                        OPERAND: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        }
                    },
                    hideFromPalette: HideBlockType.bool
                },
                {
                    opcode: 'isFalse',
                    blockType: BlockType.BOOLEAN,
                    text: formatMessage({
                        id: 'OPERATION.IS_FALSE',
                        default: '[OPERAND] is false?'
                    }),
                    arguments: {
                        OPERAND: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        }
                    },
                    hideFromPalette: rareHideAndSow('bool')
                },
                {
                    opcode: 'checkType',
                    blockType: BlockType.BOOLEAN,
                    text: formatMessage({
                        id: 'OPERATION.CHECK_TYPE',
                        default: '[INPUT] is [MODE] ?'
                    }),
                    arguments: {
                        INPUT: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        },
                        MODE: {
                            type: ArgumentType.STRING,
                            menu: 'CHECK_TYPE',
                            defaultValue: 'number'
                        }
                    },
                    hideFromPalette: HideBlockType.bool
                },
                {
                    opcode: 'containOptions_ci',
                    blockType: BlockType.BOOLEAN,
                    text: formatMessage({
                        id: 'OPERATION.CONTAIN_OPTIONS',
                        default: 'is [OPERAND] in'
                    }),
                    arguments: {
                        OPERAND: {
                            type: ArgumentType.STRING,
                            defalutValue: ''
                        }
                    },
                    hideFromPalette: HideBlockType.bool
                },
                ...sep(HideBlockType.bool),
                {
                    opcode: 'compare',
                    blockType: BlockType.BOOLEAN,
                    text: '[OPERAND1] [SYMBOL] [OPERAND2]',
                    arguments: {
                        OPERAND1: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        },
                        OPERAND2: {
                            type: ArgumentType.STRING,
                            defaultValue: '50'
                        },
                        SYMBOL: {
                            type: ArgumentType.STRING,
                            menu: 'EQUAL_SYMBOL',
                            defaultValue: 'unequal'
                        }
                    },
                    hideFromPalette: HideBlockType.bool
                },
                {
                    opcode: 'continuousCompare',
                    blockType: BlockType.BOOLEAN,
                    text: '[OPERAND1] [SYMBOL1] [OPERAND2] [SYMBOL2] [OPERAND3]',
                    arguments: {
                        OPERAND1: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        },
                        OPERAND2: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        },
                        OPERAND3: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        },
                        SYMBOL1: {
                            type: ArgumentType.STRING,
                            menu: 'EQUAL_SYMBOL',
                            defaultValue: 'lessOrEqual'
                        },
                        SYMBOL2: {
                            type: ArgumentType.STRING,
                            menu: 'EQUAL_SYMBOL',
                            defaultValue: 'lessOrEqual'
                        }
                    },
                    hideFromPalette: rareHideAndSow('bool')
                },
                {
                    opcode: 'approximatelyEqual',
                    blockType: BlockType.BOOLEAN,
                    text: '[OPERAND1] ≈ [OPERAND2] ± [NUM]',
                    arguments: {
                        OPERAND1: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '5'
                        },
                        OPERAND2: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '6'
                        },
                        NUM: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '1'
                        }
                    },
                    hideFromPalette: HideBlockType.bool
                },
                ...sep(rareHideAndSow('bool')),
                {
                    opcode: 'logicGateOperation',
                    blockType: BlockType.BOOLEAN,
                    text: '[OPERAND1] [SYMBOL] [OPERAND2]',
                    arguments: {
                        OPERAND1: {
                            type: ArgumentType.BOOLEAN
                        },
                        OPERAND2: {
                            type: ArgumentType.BOOLEAN
                        },
                        SYMBOL: {
                            type: ArgumentType.STRING,
                            menu: 'LOGIC_GATE_SYMBOL'
                        }
                    },
                    hideFromPalette: rareHideAndSow('bool')
                },
                ...sep(rareHideAndSow('bool')),
                {
                    opcode: 'startEndWith',
                    blockType: BlockType.BOOLEAN,
                    text: formatMessage({
                        id: 'OPERATION.START_END_WITH',
                        default: 'does [STRING1] [POSITION] with [STRING2] ?'
                    }),
                    arguments: {
                        STRING1: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'OPERATION.ARG_APPLE',
                                default: 'apple'
                            })
                        },
                        STRING2: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'OPERATION.ARG_APPLE_CONTAINS',
                                default: 'a'
                            })
                        },
                        POSITION: {
                            type: ArgumentType.STRING,
                            menu: 'POSITION'
                        }
                    },
                    hideFromPalette: rareHideAndSow('bool')
                },
                {
                    opcode: 'isBetween',
                    blockType: BlockType.BOOLEAN,
                    text: formatMessage({
                        id: 'OPERATION.IS_BETWEEN',
                        default: 'is [NUM] between [START] and [END] ?'
                    }),
                    arguments: {
                        NUM: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '5'
                        },
                        START: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '1'
                        },
                        END: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '10'
                        }
                    },
                    hideFromPalette: rareHideAndSow('bool')
                }
            ].map(obj => ({ ...obj, ...{ ...getColor('bool') } })),
            ...sep(HideBlockType.bool),
            {
                blockType: BlockType.LABEL,
                text: formatMessage({
                    id: 'OPERATION.STRING_LABEL',
                    default: 'String'
                }),
                hideFromPalette: HideBlockType.string
            },
            ...[
                {
                    opcode: 'text',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'OPERATION.TEXT',
                        default: 'text [STRING]'
                    }),
                    arguments: {
                        STRING: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'OPERATION.ARG_APPLE',
                                default: 'apple'
                            })
                        }
                    },
                    hideFromPalette: HideBlockType.string
                },
                {
                    opcode: 'test',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'OPERATION.TEST',
                        default: 'test [BOOLEAN] true: [STRING1] false: [STRING2]'
                    }),
                    arguments: {
                        BOOLEAN: {
                            type: ArgumentType.BOOLEAN
                        },
                        STRING1: {
                            type: ArgumentType.STRING,
                            defaultValue: 'a'
                        },
                        STRING2: {
                            type: ArgumentType.STRING,
                            defaultValue: 'b'
                        }
                    },
                    hideFromPalette: HideBlockType.string
                },
                ...sep(HideBlockType.string),

                {
                    opcode: 'repeat',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'OPERATION.REPEAT',
                        default: 'repeat [STRING] [NUMBER] times'
                    }),
                    arguments: {
                        STRING: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'OPERATION.ARG_APPLE',
                                default: 'apple'
                            }) + ' '
                        },
                        NUMBER: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '3'
                        }
                    },
                    hideFromPalette: true
                },
                {
                    // 这个是为了做出正整数输入框 (math_whole_number)
                    blockType: BlockType.XML,
                    xml: `
                    <block type="${'OPERATION_' + 'repeat'}">
                        <value name="STRING">
                            <shadow type="text">
                                <field name="TEXT">${formatMessage({ id: 'OPERATION.ARG_APPLE', default: 'apple' }) + ' '}</field>
                            </shadow>
                        </value>
                        <value name="NUMBER">
                            <shadow type="math_whole_number">
                                <field name="NUM">3</field>
                            </shadow>
                        </value>
                    </block>
                `,
                    hideFromPalette: HideBlockType.string
                },

                {
                    opcode: 'trim',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'OPERATION.TRIM',
                        default: 'trim whitespace from [STRING]'
                    }),
                    arguments: {
                        STRING: {
                            type: ArgumentType.STRING,
                            defaultValue: '     ' + formatMessage({
                                id: 'OPERATION.ARG_APPLE',
                                default: 'apple'
                            }) + '     '
                        }
                    },
                    hideFromPalette: HideBlockType.string
                },

                {
                    opcode: 'letters',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'OPERATION.INTERCEPT',
                        default: 'letters # [START] to [END] of [STRING]'
                    }),
                    arguments: {
                        START: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '3'
                        },
                        END: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '5'
                        },
                        STRING: {
                            type: ArgumentType.STRING,
                            defaultValue: 'abcdefg'
                        }
                    },
                    hideFromPalette: true
                },
                {
                    // 这个是为了做出整数输入框 (math_integer)
                    blockType: BlockType.XML,
                    xml: `
                    <block type="${'OPERATION_' + 'letters'}">
                        <value name="START">
                            <shadow type="math_integer">
                                <field name="NUM">3</field>
                            </shadow>
                        </value>
                        <value name="END">
                            <shadow type="math_integer">
                                <field name="NUM">5</field>
                            </shadow>
                        </value>
                        <value name="STRING">
                            <shadow type="text">
                                <field name="TEXT">abcdefg</field>
                            </shadow>
                        </value>
                    </block>
                `,
                    hideFromPalette: HideBlockType.string
                },

                {
                    opcode: 'remove',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'OPERATION.REMOVE',
                        default: 'remove # [START] to [END] of [STRING]'
                    }),
                    arguments: {
                        START: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '3'
                        },
                        END: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '5'
                        },
                        STRING: {
                            type: ArgumentType.STRING,
                            defaultValue: 'abcdefg'
                        }
                    },
                    hideFromPalette: true
                },
                {
                    // 这个是为了做出整数输入框 (math_integer)
                    blockType: BlockType.XML,
                    xml: `
                    <block type="${'OPERATION_' + 'remove'}">
                        <value name="START">
                            <shadow type="math_integer">
                                <field name="NUM">3</field>
                            </shadow>
                        </value>
                        <value name="END">
                            <shadow type="math_integer">
                                <field name="NUM">5</field>
                            </shadow>
                        </value>
                        <value name="STRING">
                            <shadow type="text">
                                <field name="TEXT">abcdefg</field>
                            </shadow>
                        </value>
                    </block>
                `,
                    hideFromPalette: HideBlockType.string
                },

                {
                    opcode: 'removeChar',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'OPERATION.REMOVE_CHAR',
                        default: 'remove # [INDEX] of [STRING]'
                    }),
                    arguments: {
                        INDEX: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '2'
                        },
                        STRING: {
                            type: ArgumentType.STRING,
                            defaultValue: 'abc'
                        }
                    },
                    hideFromPalette: true
                },
                {
                    // 这个是为了做出整数输入框 (math_integer)
                    blockType: BlockType.XML,
                    xml: `
                    <block type="${'OPERATION_' + 'removeChar'}">
                        <value name="INDEX">
                            <shadow type="math_integer">
                                <field name="NUM">2</field>
                            </shadow>
                        </value>
                        <value name="STRING">
                            <shadow type="text">
                                <field name="TEXT">abc</field>
                            </shadow>
                        </value>
                    </block>
                `,
                    hideFromPalette: HideBlockType.string
                },

                {
                    opcode: 'insert',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'OPERATION.INSERT',
                        default: 'insert [INSERT_STR] at [INDEX] of [STRING]'
                    }),
                    arguments: {
                        STRING: {
                            type: ArgumentType.STRING,
                            defaultValue: 'ac'
                        },
                        INSERT_STR: {
                            type: ArgumentType.STRING,
                            defaultValue: 'b'
                        },
                        INDEX: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '2'
                        },
                    },
                    hideFromPalette: true
                },
                {
                    // 这个是为了做出整数输入框 (math_integer)
                    blockType: BlockType.XML,
                    xml: `
                    <block type="${'OPERATION_' + 'insert'}">
                        <value name="STRING">
                            <shadow type="text">
                                <field name="TEXT">ac</field>
                            </shadow>
                        </value>
                        <value name="INSERT_STR">
                            <shadow type="text">
                                <field name="TEXT">b</field>
                            </shadow>
                        </value>
                        <value name="INDEX">
                            <shadow type="math_integer">
                                <field name="NUM">2</field>
                            </shadow>
                        </value>
                    </block>
                `,
                    hideFromPalette: HideBlockType.string
                },

                {
                    opcode: 'replace_ci',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'OPERATION.REPLACE',
                        default: 'replace [STRING2] with [STRING3] in [STRING1]'
                    }),
                    arguments: {
                        STRING2: {
                            type: ArgumentType.STRING,
                            defaultValue: 'world'
                        },
                        STRING3: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Scratch'
                        },
                        STRING1: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Hello world!'
                        }
                    },
                    hideFromPalette: rareHideAndSow('string')
                },
                {
                    opcode: 'replaceAll_ci',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'OPERATION.REPLACE_ALL',
                        default: 'replace all [STRING2] with [STRING3] in [STRING1]'
                    }),
                    arguments: {
                        STRING2: {
                            type: ArgumentType.STRING,
                            defaultValue: 'world'
                        },
                        STRING3: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Scratch'
                        },
                        STRING1: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Hello world!'
                        }
                    },
                    hideFromPalette: HideBlockType.string
                },

                {
                    opcode: 'replaceIndex',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'OPERATION.REPLACE_INDEX',
                        default: 'replace [STRING] from [START] to [END] with [REPLACEMENT]'
                    }),
                    arguments: {
                        START: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '7'
                        },
                        END: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '11'
                        },
                        STRING: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Hello world!'
                        },
                        REPLACEMENT: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Scratch'
                        }
                    },
                    hideFromPalette: true
                },
                {
                    // 这个是为了做出整数输入框 (math_integer)
                    blockType: BlockType.XML,
                    xml: `
                    <block type="${'OPERATION_' + 'replaceIndex'}">
                        <value name="START">
                            <shadow type="math_integer">
                                <field name="NUM">7</field>
                            </shadow>
                        </value>
                        <value name="END">
                            <shadow type="math_integer">
                                <field name="NUM">11</field>
                            </shadow>
                        </value>
                        <value name="STRING">
                            <shadow type="text">
                                <field name="TEXT">Hello world!</field>
                            </shadow>
                        </value>
                        <value name="REPLACEMENT">
                            <shadow type="text">
                                <field name="TEXT">Scratch</field>
                            </shadow>
                        </value>
                    </block>
                `,
                    hideFromPalette: HideBlockType.string
                },


                {
                    opcode: 'replaceIndexChar',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'OPERATION.REPLACE_INDEX_CHAR',
                        default: 'replace [STRING] at # [INDEX] with [REPLACEMENT]'
                    }),
                    arguments: {
                        INDEX: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '12'
                        },
                        STRING: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Hello world!'
                        },
                        REPLACEMENT: {
                            type: ArgumentType.STRING,
                            defaultValue: '?'
                        }
                    },
                    hideFromPalette: true
                },
                {
                    // 这个是为了做出整数输入框 (math_integer)
                    blockType: BlockType.XML,
                    xml: `
                    <block type="${'OPERATION_' + 'replaceIndexChar'}">
                        <value name="INDEX">
                            <shadow type="math_integer">
                                <field name="NUM">12</field>
                            </shadow>
                        </value>
                        <value name="STRING">
                            <shadow type="text">
                                <field name="TEXT">Hello world!</field>
                            </shadow>
                        </value>
                        <value name="REPLACEMENT">
                            <shadow type="text">
                                <field name="TEXT">?</field>
                            </shadow>
                        </value>
                    </block>
                `,
                    hideFromPalette: HideBlockType.string
                },

                ...[
                    {
                        opcode: 'split',
                        blockType: BlockType.REPORTER,
                        text: formatMessage({
                            id: 'OPERATION.SPLIT',
                            default: 'split [STRING] by [SYMBOL], get # [NUM]'
                        }),
                        arguments: {
                            STRING: {
                                type: ArgumentType.STRING,
                                defaultValue: formatMessage({
                                    id: 'OPERATION.ARG_APPLE',
                                    default: 'apple'
                                }) + '/' + formatMessage({
                                    id: 'OPERATION.ARG_BANANA',
                                    default: 'banana'
                                }) + '/' + formatMessage({
                                    id: 'OPERATION.ARG_PEACH',
                                    default: 'peach'
                                })
                            },
                            SYMBOL: {
                                type: ArgumentType.STRING,
                                defaultValue: '/'
                            },
                            NUM: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '2'
                            }
                        },
                        hideFromPalette: true
                    },
                    {
                        // 这个是为了做出整数输入框 (math_integer)
                        blockType: BlockType.XML,
                        xml: (() => {
                            const argStr = formatMessage({
                                id: 'OPERATION.ARG_APPLE',
                                default: 'apple'
                            }) + '/' + formatMessage({
                                id: 'OPERATION.ARG_BANANA',
                                default: 'banana'
                            }) + '/' + formatMessage({
                                id: 'OPERATION.ARG_PEACH',
                                default: 'peach'
                            });
                            return `
                        <block type="${'OPERATION_' + 'split'}">
                            <value name="STRING">
                                <shadow type="text">
                                    <field name="TEXT">${argStr}</field>
                                </shadow>
                            </value>
                            <value name="SYMBOL">
                                <shadow type="text">
                                    <field name="TEXT">/</field>
                                </shadow>
                            </value>
                            <value name="NUM">
                                <shadow type="math_integer">
                                    <field name="NUM">2</field>
                                </shadow>
                            </value>
                        </block>
                    `;
                        })(),
                        hideFromPalette: HideBlockType.string || !HideBlockType.split
                    },

                    {
                        opcode: 'splitAndRemove',
                        blockType: BlockType.REPORTER,
                        text: formatMessage({
                            id: 'OPERATION.SPLIT_REMOVE',
                            default: 'split [STRING] by [SYMBOL], remove # [NUM]'
                        }),
                        arguments: {
                            STRING: {
                                type: ArgumentType.STRING,
                                defaultValue: formatMessage({
                                    id: 'OPERATION.ARG_APPLE',
                                    default: 'apple'
                                }) + '/' + formatMessage({
                                    id: 'OPERATION.ARG_BANANA',
                                    default: 'banana'
                                }) + '/' + formatMessage({
                                    id: 'OPERATION.ARG_PEACH',
                                    default: 'peach'
                                })
                            },
                            SYMBOL: {
                                type: ArgumentType.STRING,
                                defaultValue: '/'
                            },
                            NUM: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '2'
                            }
                        },
                        hideFromPalette: true
                    },
                    {
                        opcode: 'splitAndInsert',
                        blockType: BlockType.REPORTER,
                        text: formatMessage({
                            id: 'OPERATION.SPLIT_INSERT',
                            default: 'split [STRING] by [SYMBOL], insert # [INDEX] of [INSERT_STR]'
                        }),
                        arguments: {
                            STRING: {
                                type: ArgumentType.STRING,
                                defaultValue: formatMessage({
                                    id: 'OPERATION.ARG_APPLE',
                                    default: 'apple'
                                }) + '/' + formatMessage({
                                    id: 'OPERATION.ARG_BANANA',
                                    default: 'banana'
                                }) + '/' + formatMessage({
                                    id: 'OPERATION.ARG_PEACH',
                                    default: 'peach'
                                })
                            },
                            SYMBOL: {
                                type: ArgumentType.STRING,
                                defaultValue: '/'
                            },
                            INSERT_STR: {
                                type: ArgumentType.STRING,
                                defaultValue: formatMessage({
                                    id: 'OPERATION.ARG_MANGO',
                                    default: 'mango'
                                })
                            },
                            INDEX: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '2'
                            }
                        },
                        hideFromPalette: true
                    },
                    {
                        opcode: 'splitAndReplace',
                        blockType: BlockType.REPORTER,
                        text: formatMessage({
                            id: 'OPERATION.SPLIT_REPLACE',
                            default: 'split [STRING] by [SYMBOL], replace # [INDEX] to [REPLACE_STR]'
                        }),
                        arguments: {
                            STRING: {
                                type: ArgumentType.STRING,
                                defaultValue: formatMessage({
                                    id: 'OPERATION.ARG_APPLE',
                                    default: 'apple'
                                }) + '/' + formatMessage({
                                    id: 'OPERATION.ARG_BANANA',
                                    default: 'banana'
                                }) + '/' + formatMessage({
                                    id: 'OPERATION.ARG_PEACH',
                                    default: 'peach'
                                })
                            },
                            SYMBOL: {
                                type: ArgumentType.STRING,
                                defaultValue: '/'
                            },
                            REPLACE_STR: {
                                type: ArgumentType.STRING,
                                defaultValue: formatMessage({
                                    id: 'OPERATION.ARG_MANGO',
                                    default: 'mango'
                                })
                            },
                            INDEX: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '2'
                            }
                        },
                        hideFromPalette: true
                    },
                    {
                        opcode: 'splitByCount',
                        blockType: BlockType.REPORTER,
                        text: formatMessage({
                            id: 'OPERATION.SPLIT_BY_COUNT',
                            default: 'split [STRING] by every [COUNT] character, get # [NUM]'
                        }),
                        arguments: {
                            STRING: {
                                type: ArgumentType.STRING,
                                defaultValue: formatMessage({
                                    id: 'OPERATION.ARG_APPLE',
                                    default: 'apple'
                                }) + '/' + formatMessage({
                                    id: 'OPERATION.ARG_BANANA',
                                    default: 'banana'
                                }) + '/' + formatMessage({
                                    id: 'OPERATION.ARG_PEACH',
                                    default: 'peach'
                                })
                            },
                            COUNT: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '3'
                            },
                            NUM: {
                                type: ArgumentType.NUMBER,
                                defaultValue: '2'
                            }
                        },
                        hideFromPalette: true
                    },
                ].map(obj => ({ ...obj, ...{ ...getColor('split') } })),
                {
                    opcode: 'toggleCase_ci',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'OPERATION.TOGGLE_CASE',
                        default: '[MODE] of [STRING2] in [STRING1]'
                    }),
                    arguments: {
                        MODE: {
                            type: ArgumentType.STRING,
                            menu: 'TOGGLE_CASE_MODE'
                        },
                        STRING2: {
                            type: ArgumentType.STRING,
                            defaultValue: 'te'
                        },
                        STRING1: {
                            type: ArgumentType.STRING,
                            defaultValue: 'The text test'
                        }
                    },
                    hideFromPalette: HideBlockType.string
                },
                {
                    opcode: 'convert',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'OPERATION.CONVERT',
                        default: 'convert [STRING] to [MODE]'
                    }),
                    arguments: {
                        MODE: {
                            type: ArgumentType.STRING,
                            menu: 'CONVERT_MODE'
                        },
                        STRING: {
                            type: ArgumentType.STRING,
                            defaultValue: 'apple banana'
                        }
                    },
                    hideFromPalette: HideBlockType.string
                },
                {
                    opcode: 'aftOrBfrStr',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'OPERATION.AFTER_OR_BEFOTR_TEXT',
                        default: 'text [MODE] [STRING1] in [STRING2]'
                    }),
                    arguments: {
                        MODE: {
                            type: ArgumentType.STRING,
                            menu: 'AFTER_BEFOTR_MODE'
                        },
                        STRING1: {
                            type: ArgumentType.STRING,
                            defaultValue: 'apple and banana'
                        },
                        STRING2: {
                            type: ArgumentType.STRING,
                            defaultValue: ' and '
                        }
                    },
                    hideFromPalette: HideBlockType.string
                },
                ...sep(HideBlockType.string),
                {
                    opcode: 'join',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'OPERATION.JOIN',
                        default: 'join [STRING]'
                    }),
                    arguments: {
                        STRING: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'OPERATION.ARG_APPLE',
                                default: 'apple'
                            }) + ' '
                        }
                    },
                    hideFromPalette: rareHideAndSow('string')
                },
                {
                    opcode: 'getJoin',
                    blockType: BlockType.REPORTER,
                    disableMonitor: true,
                    text: formatMessage({
                        id: 'OPERATION.GET_JOIN',
                        default: 'join value'
                    }),
                    hideFromPalette: rareHideAndSow('string')
                },
                {
                    opcode: 'infJoin',
                    disableMonitor: true,
                    blockType: Scratch.BlockType.REPORTER,
                    text: formatMessage({
                        id: 'OPERATION.INF_JOIN',
                        default: 'join'
                    }),
                    hideFromPalette: HideBlockType.string
                },
                ...sep(rareHideAndSow('string')),
                {
                    opcode: 'getUnicode',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'OPERATION.GET_TO_UNICODE',
                        default: 'unicode of [STRING]'
                    }),
                    arguments: {
                        STRING: {
                            type: ArgumentType.STRING,
                            defaultValue: 'a'
                        }
                    },
                    hideFromPalette: rareHideAndSow('string')
                },

                {
                    opcode: 'unicodeToString',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'OPERATION.UNICODE_TO_STRING',
                        default: 'character with Unicode [STRING]'
                    }),
                    arguments: {
                        STRING: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '97'
                        }
                    },
                    hideFromPalette: true
                },
                {
                    // 这个是为了做出正整数输入框 (math_whole_number)
                    blockType: BlockType.XML,
                    xml: `
                    <block type="${'OPERATION_' + 'unicodeToString'}">
                        <value name="STRING">
                            <shadow type="math_whole_number">
                                <field name="NUM">97</field>
                            </shadow>
                        </value>
                    </block>
                `,
                    hideFromPalette: rareHideAndSow('string')
                },
                ...sep(rareHideAndSow('string')),
                {
                    opcode: 'shuffleString',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'OPERATION.SHUFFLE',
                        default: 'shuffle [STRING]'
                    }),
                    arguments: {
                        STRING: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'OPERATION.ARG_APPLE',
                                default: 'apple'
                            })
                        }
                    },
                    hideFromPalette: rareHideAndSow('string')
                },
                ...sep(rareHideAndSow('string')),
                {
                    opcode: 'overwrite',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'OPERATION.OVERWRITE',
                        default: 'overlay [ORIGINAL] with [OTHER], direction: [DIRECTION]'
                    }),
                    arguments: {
                        ORIGINAL: {
                            type: ArgumentType.STRING,
                            defaultValue: '1234567890'
                        },
                        OTHER: {
                            type: ArgumentType.STRING,
                            defaultValue: 'abcde'
                        },
                        DIRECTION: {
                            type: ArgumentType.STRING,
                            menu: 'OVERWRITE_DIRECTION'
                        }
                    },
                    hideFromPalette: rareHideAndSow('string')
                },

                {
                    opcode: 'padString',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'OPERATION.PAD_STRING',
                        default: 'pad [ORIGINAL_STR] to [REQUIRED_LENGTH] with [CHAR_TO_ADD] at [POSITION]'
                    }),
                    arguments: {
                        ORIGINAL_STR: {
                            type: ArgumentType.STRING,
                            defaultValue: '123'
                        },
                        REQUIRED_LENGTH: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 5
                        },
                        CHAR_TO_ADD: {
                            type: ArgumentType.STRING,
                            defaultValue: '0'
                        },
                        POSITION: {
                            type: ArgumentType.STRING,
                            menu: 'POSITION'
                        }
                    },
                    hideFromPalette: true
                },
                {
                    // 这个是为了做出正整数输入框 (math_whole_number)
                    blockType: BlockType.XML,
                    xml: `
                    <block type="${'OPERATION_' + 'padString'}">
                        <value name="ORIGINAL_STR">
                            <shadow type="text">
                                <field name="TEXT">123</field>
                            </shadow>
                        </value>
                        <value name="REQUIRED_LENGTH">
                            <shadow type="math_whole_number">
                                <field name="NUM">5</field>
                            </shadow>
                        </value>
                        <value name="CHAR_TO_ADD">
                            <shadow type="text">
                                <field name="TEXT">0</field>
                            </shadow>
                        </value>
                    </block>
                `,
                    hideFromPalette: rareHideAndSow('string')
                }
            ].map(obj => (
                obj.color1 ? obj : { ...obj, ...{ ...getColor('string') } }
            )),

            ...sep(HideBlockType.string),
            {
                blockType: BlockType.LABEL,
                text: formatMessage({
                    id: 'OPERATION.SPLIT_LABEL',
                    default: 'Split'
                }),
                hideFromPalette: HideBlockType.split
            },
            ...[
                {
                    opcode: 'splitContains',
                    blockType: BlockType.BOOLEAN,
                    text: formatMessage({
                        id: 'OPERATION.SPLIT_CONTAINS',
                        default: 'split [STRING1] by [SYMBOL], contains [STRING2] ?'
                    }),
                    arguments: {
                        STRING1: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'OPERATION.ARG_APPLE',
                                default: 'apple'
                            }) + '/' + formatMessage({
                                id: 'OPERATION.ARG_BANANA',
                                default: 'banana'
                            }) + '/' + formatMessage({
                                id: 'OPERATION.ARG_PEACH',
                                default: 'peach'
                            })
                        },
                        SYMBOL: {
                            type: ArgumentType.STRING,
                            defaultValue: '/'
                        },
                        STRING2: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'OPERATION.ARG_APPLE',
                                default: 'apple'
                            })
                        }
                    },
                    hideFromPalette: HideBlockType.split
                },
                ...sep(HideBlockType.split),
                {
                    // 这个是为了做出整数输入框 (math_integer)
                    blockType: BlockType.XML,
                    xml: (() => {
                        const argStr = formatMessage({
                            id: 'OPERATION.ARG_APPLE',
                            default: 'apple'
                        }) + '/' + formatMessage({
                            id: 'OPERATION.ARG_BANANA',
                            default: 'banana'
                        }) + '/' + formatMessage({
                            id: 'OPERATION.ARG_PEACH',
                            default: 'peach'
                        });
                        return `
                        <block type="${'OPERATION_' + 'split'}">
                            <value name="STRING">
                                <shadow type="text">
                                    <field name="TEXT">${argStr}</field>
                                </shadow>
                            </value>
                            <value name="SYMBOL">
                                <shadow type="text">
                                    <field name="TEXT">/</field>
                                </shadow>
                            </value>
                            <value name="NUM">
                                <shadow type="math_integer">
                                    <field name="NUM">2</field>
                                </shadow>
                            </value>
                        </block>

                        <block type="${'OPERATION_' + 'splitAndRemove'}">
                            <value name="STRING">
                                <shadow type="text">
                                    <field name="TEXT">${argStr}</field>
                                </shadow>
                            </value>
                            <value name="SYMBOL">
                                <shadow type="text">
                                    <field name="TEXT">/</field>
                                </shadow>
                            </value>
                            <value name="NUM">
                                <shadow type="math_integer">
                                    <field name="NUM">2</field>
                                </shadow>
                            </value>
                        </block>

                        <block type="${'OPERATION_' + 'splitAndInsert'}">
                            <value name="STRING">
                                <shadow type="text">
                                    <field name="TEXT">${argStr}</field>
                                </shadow>
                            </value>
                            <value name="SYMBOL">
                                <shadow type="text">
                                    <field name="TEXT">/</field>
                                </shadow>
                            </value>
                            <value name="INDEX">
                                <shadow type="math_integer">
                                    <field name="NUM">2</field>
                                </shadow>
                            </value>
                            <value name="INSERT_STR">
                                <shadow type="text">
                                    <field name="TEXT">${formatMessage({ id: 'OPERATION.ARG_MANGO', default: 'mango' })}</field>
                                </shadow>
                            </value>
                        </block>

                        <block type="${'OPERATION_' + 'splitAndReplace'}">
                            <value name="STRING">
                                <shadow type="text">
                                    <field name="TEXT">${argStr}</field>
                                </shadow>
                            </value>
                            <value name="SYMBOL">
                                <shadow type="text">
                                    <field name="TEXT">/</field>
                                </shadow>
                            </value>
                            <value name="REPLACE_STR">
                                <shadow type="text">
                                    <field name="TEXT">${formatMessage({ id: 'OPERATION.ARG_MANGO', default: 'mango' })}</field>
                                </shadow>
                            </value>
                            <value name="INDEX">
                                <shadow type="math_integer">
                                    <field name="NUM">2</field>
                                </shadow>
                            </value>
                        </block>

                        <block type="${'OPERATION_' + 'splitByCount'}">
                            <value name="STRING">
                                <shadow type="text">
                                    <field name="TEXT">${argStr}</field>
                                </shadow>
                            </value>
                            <value name="COUNT">
                                <shadow type="math_integer">
                                    <field name="NUM">3</field>
                                </shadow>
                            </value>
                            <value name="NUM">
                                <shadow type="math_integer">
                                    <field name="NUM">2</field>
                                </shadow>
                            </value>
                        </block>
                    `;
                    })(),
                    hideFromPalette: HideBlockType.split
                },
                {
                    opcode: 'splitAndShuffle',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'OPERATION.SPLIT_SHUFFLE',
                        default: 'split [STRING] by [SYMBOL], and shuffle'
                    }),
                    arguments: {
                        STRING: {
                            type: ArgumentType.STRING,
                            defaultValue: formatMessage({
                                id: 'OPERATION.ARG_APPLE',
                                default: 'apple'
                            }) + '/' + formatMessage({
                                id: 'OPERATION.ARG_BANANA',
                                default: 'banana'
                            }) + '/' + formatMessage({
                                id: 'OPERATION.ARG_PEACH',
                                default: 'peach'
                            })
                        },
                        SYMBOL: {
                            type: ArgumentType.STRING,
                            defaultValue: '/'
                        }
                    },
                    hideFromPalette: HideBlockType.split
                },
                {
                    opcode: 'splitAndAnalysis',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'OPERATION.SPLIT_ANALYSIS',
                        default: 'split [STRING] by [SYMBOL], and get [MODE]'
                    }),
                    arguments: {
                        STRING: {
                            type: ArgumentType.STRING,
                            defaultValue: '1, 2, 3, 4, 5'
                        },
                        SYMBOL: {
                            type: ArgumentType.STRING,
                            defaultValue: ','
                        },
                        MODE: {
                            type: ArgumentType.STRING,
                            menu: 'SPLIT_ANALYSIS_MODE'
                        }
                    },
                    hideFromPalette: HideBlockType.split
                },
            ].map(obj => ({ ...obj, ...{ ...getColor('split') } })),
            ...sep(HideBlockType.split),
            {
                blockType: BlockType.LABEL,
                text: formatMessage({
                    id: 'OPERATION.GRAPH_LABEL',
                    default: 'Graph'
                }),
                hideFromPalette: HideBlockType.graph
            },
            ...[
                {
                    opcode: 'calculateLineLength',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'OPERATION.CALCULATE_LINE_LENGTH',
                        default: 'length from ([X1],[Y1]) to ([X2],[Y2])'
                    }),
                    arguments: {
                        X1: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '0'
                        },
                        Y1: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '0'
                        },
                        X2: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '100'
                        },
                        Y2: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '0'
                        }
                    },
                    hideFromPalette: HideBlockType.graph
                },
                {
                    opcode: 'calculateLineDirection',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'OPERATION.CALCULATE_LINE_DIRECTION',
                        default: 'direction from ([X1],[Y1]) to ([X2],[Y2])'
                    }),
                    arguments: {
                        X1: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '0'
                        },
                        Y1: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '0'
                        },
                        X2: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '100'
                        },
                        Y2: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '0'
                        }
                    },
                    hideFromPalette: HideBlockType.graph
                },
                {
                    opcode: 'calculateMidpoint',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'OPERATION.CALCULATE_MIDPOINT',
                        default: 'midpoint of ([X1],[Y1]) and ([X2],[Y2])'
                    }),
                    arguments: {
                        X1: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '0'
                        },
                        Y1: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '0'
                        },
                        X2: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '100'
                        },
                        Y2: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '0'
                        }
                    },
                    hideFromPalette: HideBlockType.graph
                },
                {
                    opcode: 'calculateSlope',
                    blockType: Scratch.BlockType.REPORTER,
                    text: formatMessage({
                        id: 'OPERATION.CALCULATE_SLOPE',
                        default: 'slope between ([X1], [Y1]) and ([X2], [Y2])'
                    }),
                    arguments: {
                        X1: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '0'
                        },
                        Y1: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '0'
                        },
                        X2: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '100'
                        },
                        Y2: {
                            type: Scratch.ArgumentType.NUMBER,
                            defaultValue: '0'
                        }
                    },
                    hideFromPalette: HideBlockType.graph
                },
                {
                    opcode: 'calculateIntersection',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'OPERATION.CALCULATE_INTERSECTION',
                        default: 'calculate intersection ([X1],[Y1]) to ([X2],[Y2]) & ([X3],[Y3]) to ([X4],[Y4])'
                    }),
                    arguments: {
                        X1: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '-100'
                        },
                        Y1: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '0'
                        },
                        X2: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '100'
                        },
                        Y2: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '0'
                        },
                        X3: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '0'
                        },
                        Y3: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '100'
                        },
                        X4: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '0'
                        },
                        Y4: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '-100'
                        }
                    },
                    hideFromPalette: HideBlockType.graph
                },
                ...sep(HideBlockType.graph),
                {
                    opcode: 'triangle',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'OPERATION.TRIANGLE',
                        default: 'triangle ([X1],[Y1]) ([X2],[Y2]) ([X3],[Y3]) \'s [MODE]'
                    }),
                    arguments: {
                        X1: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '0'
                        },
                        Y1: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '10'
                        },
                        X2: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '10'
                        },
                        Y2: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '10'
                        },
                        X3: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '10'
                        },
                        Y3: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '0'
                        },
                        MODE: {
                            type: ArgumentType.STRING,
                            menu: 'GRAPH_MODE'
                        }
                    },
                    hideFromPalette: HideBlockType.graph
                },

                {
                    opcode: 'triangleArea',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'OPERATION.TRIANGLE_AREA',
                        default: 'triangle [S1] [S2] [S3] \'s area'
                    }),
                    arguments: {
                        S1: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '3'
                        },
                        S2: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '4'
                        },
                        S3: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '5'
                        }
                    },
                    hideFromPalette: true
                },
                {
                    // 这个是为了做出正数输入框 (math_positive_number)
                    blockType: BlockType.XML,
                    xml: `
                    <block type="${'OPERATION_' + 'triangleArea'}">
                        <value name="S1">
                            <shadow type="math_positive_number">
                                <field name="NUM">3</field>
                            </shadow>
                        </value>
                        <value name="S2">
                            <shadow type="math_positive_number">
                                <field name="NUM">4</field>
                            </shadow>
                        </value>
                        <value name="S3">
                            <shadow type="math_positive_number">
                                <field name="NUM">5</field>
                            </shadow>
                        </value>
                    </block>
                `,
                    hideFromPalette: HideBlockType.graph
                },

                {
                    opcode: 'rectangle',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'OPERATION.RECTANGLE',
                        default: 'quadrangle ([X1],[Y1]) ([X2],[Y2]) ([X3],[Y3]) ([X4],[Y4]) \'s [MODE]'
                    }),
                    arguments: {
                        X1: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '0'
                        },
                        Y1: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '10'
                        },
                        X2: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '10'
                        },
                        Y2: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '10'
                        },
                        X3: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '10'
                        },
                        Y3: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '0'
                        },
                        X4: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '0'
                        },
                        Y4: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '0'
                        },
                        MODE: {
                            type: ArgumentType.STRING,
                            menu: 'GRAPH_MODE'
                        }
                    },
                    hideFromPalette: HideBlockType.graph
                },
                {
                    opcode: 'graph',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'OPERATION.GRAPH',
                        default: 'graph [GRAPH] \'s [MODE]'
                    }),
                    arguments: {
                        GRAPH: {
                            type: ArgumentType.STRING,
                            defaultValue: '(0,0) (0,2) (2,4) (4,2) (4,0)'
                        },
                        MODE: {
                            type: ArgumentType.STRING,
                            menu: 'GRAPH_MODE'
                        }
                    },
                    hideFromPalette: rareHideAndSow('graph')
                },
                ...sep(HideBlockType.graph),

                {
                    opcode: 'circle',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'OPERATION.CIRCLE',
                        default: 'circle of [UNITS] [LENGTH] \'s [MODE]'
                    }),
                    arguments: {
                        UNITS: {
                            type: ArgumentType.STRING,
                            menu: 'LENGTH_UNITS'
                        },
                        LENGTH: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '10'
                        },
                        MODE: {
                            type: ArgumentType.STRING,
                            menu: 'GRAPH_MODE'
                        }
                    },
                    hideFromPalette: true
                },
                {
                    // 这个是为了做出正数输入框 (math_positive_number)
                    blockType: BlockType.XML,
                    xml: `
                    <block type="${'OPERATION_' + 'circle'}">
                        <value name="LENGTH">
                            <shadow type="math_positive_number">
                                <field name="NUM">10</field>
                            </shadow>
                        </value>
                    </block>
                `,
                    hideFromPalette: HideBlockType.graph
                },

                ...sep(HideBlockType.graph),
                {
                    opcode: 'isAngleInRange',
                    blockType: BlockType.BOOLEAN,
                    text: formatMessage({
                        id: 'OPERATION.IS_ANGLE_IN_RANGE',
                        default: 'is ∠ [ANGLE1] between ∠ [ANGLE2] and ∠ [ANGLE3] in [MODE]?'
                    }),
                    arguments: {
                        ANGLE1: {
                            type: ArgumentType.ANGLE,
                            defaultValue: 45
                        },
                        ANGLE2: {
                            type: ArgumentType.ANGLE,
                            defaultValue: 0
                        },
                        ANGLE3: {
                            type: ArgumentType.ANGLE,
                            defaultValue: 90
                        },
                        MODE: {
                            type: ArgumentType.STRING,
                            menu: 'ANGLE_MODE'
                        }
                    },
                    hideFromPalette: HideBlockType.graph
                },
                {
                    opcode: 'calculateAngleDifference',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'OPERATION.CALCULATE_ANGLE_DIFFERENCE',
                        default: 'angle from ∠ [ANGLE1] to ∠ [ANGLE2] in [MODE]'
                    }),
                    arguments: {
                        ANGLE1: {
                            type: ArgumentType.ANGLE,
                            defaultValue: 0
                        },
                        ANGLE2: {
                            type: ArgumentType.ANGLE,
                            defaultValue: 90
                        },
                        MODE: {
                            type: ArgumentType.STRING,
                            menu: 'ANGLE_MODE'
                        }
                    },
                    hideFromPalette: HideBlockType.graph
                }
            ].map(obj => ({ ...obj, ...{ ...getColor('graph') } })),
            ...sep(HideBlockType.graph),
            {
                blockType: BlockType.LABEL,
                text: formatMessage({
                    id: 'OPERATION.BASE_LABEL',
                    default: 'Base'
                }),
                hideFromPalette: HideBlockType.base
            },

            ...[
                {
                    opcode: 'base',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'OPERATION.BASE',
                        default: 'convert [NUM] in base [INTO1] to base [INTO2]'
                    }),
                    arguments: {
                        NUM: {
                            type: ArgumentType.STRING,
                            defaultValue: '10'
                        },
                        INTO1: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '10'
                        },
                        INTO2: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '2'
                        }
                    },
                    hideFromPalette: true
                },
                {
                    // 这个是为了做出正整数输入框 (math_whole_number)
                    blockType: BlockType.XML,
                    xml: `
                    <block type="${'OPERATION_' + 'base'}">
                        <value name="NUM">
                            <shadow type="text">
                                <field name="TEXT">10</field>
                            </shadow>
                        </value>
                        <value name="INTO1">
                            <shadow type="math_whole_number">
                                <field name="NUM">10</field>
                            </shadow>
                        </value>
                        <value name="INTO2">
                            <shadow type="math_whole_number">
                                <field name="NUM">2</field>
                            </shadow>
                        </value>
                    </block>
                `,
                    hideFromPalette: HideBlockType.base
                },

                {
                    opcode: 'toBin',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'OPERATION.TO_BIN',
                        default: '[NUM]₁₀ → BIN'
                    }),
                    arguments: {
                        NUM: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '10'
                        }
                    },
                    hideFromPalette: rareHideAndSow('base')
                },
                {
                    opcode: 'toDec',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'OPERATION.TO_DEC',
                        default: '[NUM]₂ → DEC'
                    }),
                    arguments: {
                        NUM: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '1010'
                        }
                    },
                    hideFromPalette: rareHideAndSow('base')
                },
                ...sep(HideBlockType.base),

                {
                    opcode: 'isBase',
                    blockType: BlockType.BOOLEAN,
                    text: formatMessage({
                        id: 'OPERATION.IS_BASE',
                        default: '[NUM] is base [BASE] ?'
                    }),
                    arguments: {
                        NUM: {
                            type: ArgumentType.STRING,
                            defaultValue: 'FF'
                        },
                        BASE: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '16'
                        }
                    },
                    hideFromPalette: true
                },
                {
                    // 这个是为了做出正整数输入框 (math_whole_number)
                    blockType: BlockType.XML,
                    xml: `
                    <block type="${'OPERATION_' + 'isBase'}">
                        <value name="NUM">
                            <shadow type="text">
                                <field name="TEXT">FF</field>
                            </shadow>
                        </value>
                        <value name="BASE">
                            <shadow type="math_whole_number">
                                <field name="NUM">16</field>
                            </shadow>
                        </value>
                    </block>
                `,
                    hideFromPalette: HideBlockType.base
                },

                ...sep(HideBlockType.base),
                {
                    opcode: 'booleanToNumber',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'OPERATION.BOOLEAN_TO_NUMBER',
                        default: 'converts [BOOLEAN] to binary num'
                    }),
                    arguments: {
                        BOOLEAN: {
                            type: ArgumentType.BOOLEAN,
                        }
                    },
                    hideFromPalette: HideBlockType.base
                },
                {
                    opcode: 'numberNot',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'OPERATION.NUMBER_NOT',
                        default: 'binary Inversion [NUM]'
                    }),
                    arguments: {
                        NUM: {
                            type: ArgumentType.NUMBER,
                            defaultValue: ''
                        }
                    },
                    hideFromPalette: HideBlockType.base
                },
                ...sep(HideBlockType.base),
                {
                    opcode: 'bitwiseBlock',
                    blockType: BlockType.REPORTER,
                    text: '[NUM1] [SYMBOL] [NUM2]',
                    arguments: {
                        NUM1: {
                            type: ArgumentType.NUMBER,
                            defaultValue: ''
                        },
                        NUM2: {
                            type: ArgumentType.NUMBER,
                            defaultValue: ''
                        },
                        SYMBOL: {
                            type: ArgumentType.NUMBER,
                            menu: 'BITWISE_SYMBOL'
                        }
                    },
                    hideFromPalette: HideBlockType.base
                },
                {
                    opcode: 'bitwiseNot',
                    blockType: BlockType.REPORTER,
                    text: '~ [NUM]',
                    arguments: {
                        NUM: {
                            type: ArgumentType.NUMBER,
                            defaultValue: ''
                        }
                    },
                    hideFromPalette: HideBlockType.base
                },
            ].map(obj => ({ ...obj, ...{ ...getColor('base') } })),
            ...sep(false),
            {
                blockType: BlockType.LABEL,
                text: formatMessage({
                    id: 'OPERATION.MISCELLANEOUS_LABEL',
                    default: 'Miscellaneous'
                }),
                hideFromPalette: HideBlockType.miscellaneous
            },
            // ...sep(HideBlockType.base),
            // {
            //     blockType: BlockType.LABEL,
            //     text: formatMessage({
            //         id: 'OPERATION.CONSTANT_LABEL',
            //         default: 'Constant'
            //     })
            // },
            {
                opcode: 'getConstant',
                blockType: BlockType.REPORTER,
                disableMonitor: true,
                text: formatMessage({
                    id: 'OPERATION.GET_CONSTANT',
                    default: 'constant [OPTION]'
                }),
                arguments: {
                    OPTION: {
                        type: ArgumentType.STRING,
                        menu: 'CONSTANT'
                    }
                },
                hideFromPalette: HideBlockType.miscellaneous
            },
            {
                opcode: 'colorBlend',
                blockType: BlockType.REPORTER,
                text: formatMessage({
                    id: 'OPERATION.COLOR_BLEND',
                    default: 'blend [COLOR1] and [COLOR2] ratio [RATIO] %'
                }),
                arguments: {
                    COLOR1: {
                        type: ArgumentType.COLOR,
                        defaultValue: '#ff0000'
                    },
                    COLOR2: {
                        type: ArgumentType.COLOR,
                        defaultValue: '#0000ff'
                    },
                    RATIO: {
                        type: ArgumentType.NUMBER,
                        defaultValue: '50'
                    }
                },
                hideFromPalette: HideBlockType.miscellaneous
            },
            {
                opcode: 'findPartition',
                blockType: BlockType.REPORTER,
                text: formatMessage({
                    id: 'OPERATION.FIND_PARTITION',
                    default: 'find partition of [VALUE] in range [RANGE_START] to [RANGE_END] divided into [NUM_PARTITIONS] partitions'
                }),
                arguments: {
                    VALUE: {
                        type: ArgumentType.NUMBER,
                        defaultValue: 10
                    },
                    RANGE_START: {
                        type: ArgumentType.NUMBER,
                        defaultValue: 1
                    },
                    RANGE_END: {
                        type: ArgumentType.NUMBER,
                        defaultValue: 20
                    },
                    NUM_PARTITIONS: {
                        type: ArgumentType.NUMBER,
                        defaultValue: 10
                    }
                },
                hideFromPalette: true
            },

            {
                // 这个是为了做出正整数输入框 (math_whole_number)
                blockType: BlockType.XML,
                xml: `
                    <block type="${'OPERATION_' + 'findPartition'}">
                        <value name="VALUE">
                            <shadow type="math_number">
                                <field name="NUM">10</field>
                            </shadow>
                        </value>
                        <value name="RANGE_START">
                            <shadow type="math_number">
                                <field name="NUM">1</field>
                            </shadow>
                        </value>
                        <value name="RANGE_END">
                            <shadow type="math_number">
                                <field name="NUM">20</field>
                            </shadow>
                        </value>
                        <value name="NUM_PARTITIONS">
                            <shadow type="math_whole_number">
                                <field name="NUM">10</field>
                            </shadow>
                        </value>
                    </block>
                `,
                hideFromPalette: HideBlockType.miscellaneous
            },

            ...sep(HideBlockType.miscellaneous),
            {
                ...getColor('bool'),
                opcode: 'equalForOptions',
                blockType: BlockType.BOOLEAN,
                text: '[OPERAND1] = [OPERAND2]',
                arguments: {
                    OPERAND1: {
                        type: ArgumentType.STRING,
                        defalutValue: ''
                    },
                },
                hideFromPalette: true
            },
            {
                ...getColor('bool'),
                opcode: 'equalOptions',
                blockType: BlockType.REPORTER,
                text: formatMessage({
                    id: 'OPERATION.OR',
                    default: '[OPERAND1] or [OPERAND2]'
                }),
                arguments: {
                    OPERAND1: {
                        type: ArgumentType.STRING,
                        defalutValue: 'a'
                    },
                    OPERAND2: {
                        type: ArgumentType.STRING,
                        defalutValue: 'b'
                    }
                },
                hideFromPalette: true
            },

            {
                blockType: BlockType.XML,
                xml: `
                    <block type="${'OPERATION_' + 'equalForOptions'}">
                        <value name="OPERAND1">
                            <shadow type="text">
                                <field name="TEXT">a</field>
                            </shadow>
                        </value>
                        <value name="OPERAND2">
                            <block type="${'OPERATION_' + 'equalOptions'}">
                                <value name="OPERAND1">
                                    <shadow type="text">
                                        <field name="TEXT">a</field>
                                    </shadow>
                                </value>
                                <value name="OPERAND2">
                                    <shadow type="text">
                                        <field name="TEXT">b</field>
                                    </shadow>
                                </value>
                            </block>
                        </value>
                    </block>
                `,
                hideFromPalette: true // HideBlockType.miscellaneous
            },
            ...sep(HideBlockType.miscellaneous),
            {
                opcode: 'contains_cs',
                extensions: ['colours_operators'],
                blockType: BlockType.BOOLEAN,
                text: '[ICON]' + formatMessage({
                    id: 'OPERATION.CONTAINS',
                    default: '[STRING1] contains [STRING2] ?'
                }),
                arguments: {
                    ICON: {
                        type: ArgumentType.IMAGE,
                        dataURI: AaIcon
                    },
                    STRING1: {
                        type: ArgumentType.STRING,
                        defaultValue: formatMessage({
                            id: 'OPERATION.ARG_APPLE',
                            default: 'apple'
                        }),
                    },
                    STRING2: {
                        type: ArgumentType.STRING,
                        defaultValue: formatMessage({
                            id: 'OPERATION.ARG_APPLE_CONTAINS',
                            default: 'a'
                        }),
                    }
                },
                hideFromPalette: HideBlockType.bool || HideBlockType.letterCase || HideBlockType.miscellaneous
            },
            {
                ...getColor('bool'),
                opcode: 'containOptions_cs',
                blockType: BlockType.BOOLEAN,
                text: '[ICON]' + formatMessage({
                    id: 'OPERATION.CONTAIN_OPTIONS',
                    default: 'is [OPERAND] in'
                }),
                arguments: {
                    ICON: {
                        type: ArgumentType.IMAGE,
                        dataURI: AaIcon
                    },
                    OPERAND: {
                        type: ArgumentType.STRING,
                        defalutValue: ''
                    }
                },
                hideFromPalette: HideBlockType.bool || HideBlockType.letterCase || HideBlockType.miscellaneous
            },
            {
                ...getColor('string'),
                opcode: 'replace',
                blockType: BlockType.REPORTER,
                text: '[ICON]' + formatMessage({
                    id: 'OPERATION.REPLACE',
                    default: 'replace [STRING2] with [STRING3] in [STRING1]'
                }),
                arguments: {
                    ICON: {
                        type: ArgumentType.IMAGE,
                        dataURI: AaIcon
                    },
                    STRING2: {
                        type: ArgumentType.STRING,
                        defaultValue: 'world'
                    },
                    STRING3: {
                        type: ArgumentType.STRING,
                        defaultValue: 'Scratch'
                    },
                    STRING1: {
                        type: ArgumentType.STRING,
                        defaultValue: 'Hello world!'
                    }
                },
                hideFromPalette: rareHideAndSow('string') || HideBlockType.letterCase || HideBlockType.miscellaneous
            },
            {
                ...getColor('string'),
                opcode: 'replaceAll',
                blockType: BlockType.REPORTER,
                text: '[ICON]' + formatMessage({
                    id: 'OPERATION.REPLACE_ALL',
                    default: 'replace all [STRING2] with [STRING3] in [STRING1]'
                }),
                arguments: {
                    ICON: {
                        type: ArgumentType.IMAGE,
                        dataURI: AaIcon
                    },
                    STRING2: {
                        type: ArgumentType.STRING,
                        defaultValue: 'world'
                    },
                    STRING3: {
                        type: ArgumentType.STRING,
                        defaultValue: 'Scratch'
                    },
                    STRING1: {
                        type: ArgumentType.STRING,
                        defaultValue: 'Hello world!'
                    }
                },
                hideFromPalette: HideBlockType.string || HideBlockType.letterCase || HideBlockType.miscellaneous
            },
            {
                ...getColor('string'),
                opcode: 'toggleCase',
                blockType: BlockType.REPORTER,
                text: '[ICON]' + formatMessage({
                    id: 'OPERATION.TOGGLE_CASE',
                    default: '[MODE] of [STRING2] in [STRING1]'
                }),
                arguments: {
                    ICON: {
                        type: ArgumentType.IMAGE,
                        dataURI: AaIcon
                    },
                    MODE: {
                        type: ArgumentType.STRING,
                        menu: 'TOGGLE_CASE_MODE'
                    },
                    STRING2: {
                        type: ArgumentType.STRING,
                        defaultValue: 'te'
                    },
                    STRING1: {
                        type: ArgumentType.STRING,
                        defaultValue: 'The text test'
                    }
                },
                hideFromPalette: HideBlockType.string || HideBlockType.letterCase || HideBlockType.miscellaneous
            },

            ...sep(HideBlockType.miscellaneous),
            ...allCompare(rareHideAndSow('miscellaneous')).map(obj => ({ ...obj, ...{ ...getColor('bool') } })),
            ...allBitwise(expandMenuHideAndSow('base') || HideBlockType.miscellaneous, isRTL).map(obj => ({ ...obj, ...{ ...getColor('base') } }))
        ];
    };

    const menus = (formatMessage, isRTL) => {
        return {
            BOOLEAN_MENU: {
                acceptReporters: false,
                items: [
                    {
                        text: formatMessage({
                            id: 'OPERATION.TRUE',
                            default: 'true'
                        }),
                        value: 'true'
                    },
                    {
                        text: formatMessage({
                            id: 'OPERATION.FALSE',
                            default: 'false'
                        }),
                        value: 'false'
                    },
                    {
                        text: formatMessage({
                            id: 'OPERATION.RANDOM',
                            default: 'random'
                        }),
                        value: 'random'
                    }
                ]
            },
            EQUAL_SYMBOL: {
                acceptReporters: false,
                items: [
                    {
                        text: '=',
                        value: 'equal'
                    },
                    {
                        text: '≡',
                        value: 'strictlyEqual'
                    },
                    {
                        text: '>',
                        value: 'greater'
                    },
                    {
                        text: '<',
                        value: 'less'
                    },
                    {
                        text: '≥',
                        value: 'greaterOrEqual'
                    },
                    {
                        text: '≤',
                        value: 'lessOrEqual'
                    },
                    {
                        text: '≠',
                        value: 'unequal'
                    },
                    {
                        text: '≢',
                        value: 'strictlyUnequal'
                    },
                    {
                        text: '=-',
                        value: 'equalNegative'
                    },
                    {
                        text: '=±',
                        value: 'EqualPON'
                    },
                    {
                        text: '≈',
                        value: 'approximatelyEqual'
                    },
                    {
                        text: '⊥',
                        value: 'vertical'
                    },
                    {
                        text: '∥',
                        value: 'parallel'
                    }
                ]
            },
            LOGIC_GATE_SYMBOL: {
                acceptReporters: false,
                items: [
                    {
                        text: formatMessage({
                            id: 'OPERATION.NAND',
                            default: 'nand'
                        }),
                        value: 'nand'
                    },
                    {
                        text: formatMessage({
                            id: 'OPERATION.NOR',
                            default: 'nor'
                        }),
                        value: 'nor'
                    },
                    {
                        text: formatMessage({
                            id: 'OPERATION.XOR',
                            default: 'xor'
                        }),
                        value: 'xor'
                    },
                    {
                        text: formatMessage({
                            id: 'OPERATION.XNOR',
                            default: 'xnor'
                        }),
                        value: 'xnor'
                    }
                ]
            },
            CHECK_TYPE: {
                acceptReporters: false,
                items: [
                    {
                        text: formatMessage({
                            id: 'OPERATION.TYPE_NUMBER',
                            default: 'number'
                        }),
                        value: 'number'
                    },
                    {
                        text: formatMessage({
                            id: 'OPERATION.TYPE_POSITIVE_NUMBER',
                            default: 'positive number'
                        }),
                        value: 'positiveNumber'
                    },
                    {
                        text: formatMessage({
                            id: 'OPERATION.TYPE_NEGATIVE_NUMBER',
                            default: 'negative number'
                        }),
                        value: 'negativeNumber'
                    },
                    {
                        text: formatMessage({
                            id: 'OPERATION.TYPE_EVEN_NUMBER',
                            default: 'even number'
                        }),
                        value: 'evenNumber'
                    },
                    {
                        text: formatMessage({
                            id: 'OPERATION.TYPE_ODD_NUMBER',
                            default: 'odd number'
                        }),
                        value: 'oddNumber'
                    },
                    {
                        text: formatMessage({
                            id: 'OPERATION.TYPE_INTEGER_NUMBER',
                            default: 'integer number'
                        }),
                        value: 'integerNumber'
                    },
                    {
                        text: formatMessage({
                            id: 'OPERATION.TYPE_DECIMAL_NUMBER',
                            default: 'decimal number'
                        }),
                        value: 'decimalNumber'
                    },
                    {
                        text: formatMessage({
                            id: 'OPERATION.TYPE_PRIME_NUMBER',
                            default: 'prime number'
                        }),
                        value: 'primeNumber'
                    },
                    {
                        text: formatMessage({
                            id: 'OPERATION.TYPE_COMPOSITE_NUMBER',
                            default: 'composite number'
                        }),
                        value: 'compositeNumber'
                    },
                    {
                        text: formatMessage({
                            id: 'OPERATION.TYPE_TEXT',
                            default: 'text'
                        }),
                        value: 'text'
                    },
                    {
                        text: formatMessage({
                            id: 'OPERATION.TYPE_BOOLEAN',
                            default: 'boolean'
                        }),
                        value: 'boolean'
                    }
                ]
            },
            OVERWRITE_DIRECTION: {
                acceptReporters: false,
                items: [
                    {
                        text: formatMessage({
                            id: 'OPERATION.FRONT2BACK',
                            default: '→'
                        }),
                        value: 'f2b'
                    },
                    {
                        text: formatMessage({
                            id: 'OPERATION.BACK2FRONT',
                            default: '←'
                        }),
                        value: 'b2f'
                    }
                ]
            },
            POSITION: {
                acceptReporters: false,
                items: [
                    {
                        text: formatMessage({
                            id: 'OPERATION.FRONT',
                            default: 'start'
                        }),
                        value: 'front'
                    },
                    {
                        text: formatMessage({
                            id: 'OPERATION.BACK',
                            default: 'end'
                        }),
                        value: 'back'
                    }
                ]
            },
            TOGGLE_CASE_MODE: {
                acceptReporters: false,
                items: [
                    {
                        text: formatMessage({
                            id: 'OPERATION.FIRST_OCCURRENCE',
                            default: 'first occurrence'
                        }),
                        value: 'first'
                    },
                    {
                        text: formatMessage({
                            id: 'OPERATION.LAST_OCCURRENCE',
                            default: 'last occurrence'
                        }),
                        value: 'last'
                    },
                    {
                        text: formatMessage({
                            id: 'OPERATION.NUMBER_OF',
                            default: 'number'
                        }),
                        value: 'number'
                    }
                ]
            },
            CONVERT_MODE: {
                acceptReporters: false,
                items: [
                    {
                        text: formatMessage({
                            id: 'OPERATION.UPPERCASE',
                            default: 'uppercase'
                        }),
                        value: 'uppercase'
                    },
                    {
                        text: formatMessage({
                            id: 'OPERATION.LOWERCASE',
                            default: 'lowercase'
                        }),
                        value: 'lowercase'
                    },
                    {
                        text: formatMessage({
                            id: 'OPERATION.CAPITALIZE',
                            default: 'capitalize the first letter'
                        }),
                        value: 'capitalize'
                    },
                    {
                        text: formatMessage({
                            id: 'OPERATION.REVERSE',
                            default: 'reverse'
                        }),
                        value: 'reverse'
                    }
                ]
            },
            AFTER_BEFOTR_MODE: {
                acceptReporters: false,
                items: [
                    {
                        text: formatMessage({
                            id: 'OPERATION.BEFORE',
                            default: 'before'
                        }),
                        value: 'before'
                    },
                    {
                        text: formatMessage({
                            id: 'OPERATION.AFTER',
                            default: 'after'
                        }),
                        value: 'after'
                    }
                ]
            },
            SPLIT_ANALYSIS_MODE: {
                acceptReporters: false,
                items: [
                    {
                        text: formatMessage({
                            id: 'OPERATION.MAX',
                            default: 'max'
                        }),
                        value: 'max'
                    },
                    {
                        text: formatMessage({
                            id: 'OPERATION.MIN',
                            default: 'min'
                        }),
                        value: 'min'
                    },
                    {
                        text: formatMessage({
                            id: 'OPERATION.MEAN',
                            default: 'mean'
                        }),
                        value: 'mean'
                    },
                    {
                        text: formatMessage({
                            id: 'OPERATION.SUM',
                            default: 'sum'
                        }),
                        value: 'sum'
                    },
                    {
                        text: formatMessage({
                            id: 'OPERATION.ITEM_COUNT',
                            default: 'item count'
                        }),
                        value: 'itemCount'
                    },
                    {
                        text: formatMessage({
                            id: 'OPERATION.RANDOM',
                            default: 'random'
                        }),
                        value: 'random'
                    }
                ]
            },
            GRAPH_MODE: {
                acceptReporters: false,
                items: [
                    {
                        text: formatMessage({
                            id: 'OPERATION.AREA',
                            default: 'area'
                        }),
                        value: 'area'
                    },
                    {
                        text: formatMessage({
                            id: 'OPERATION.CIRCUMFERENCE',
                            default: 'circumference'
                        }),
                        value: 'circumference'
                    }
                ]
            },
            LENGTH_UNITS: {
                acceptReporters: false,
                items: [
                    {
                        text: formatMessage({
                            id: 'OPERATION.RADIUS',
                            default: 'radius'
                        }),
                        value: 'radius'
                    },
                    {
                        text: formatMessage({
                            id: 'OPERATION.DIAMETER',
                            default: 'diameter'
                        }),
                        value: 'diameter'
                    }
                ]
            },
            ANGLE_MODE: {
                acceptReporters: false,
                items: [
                    {
                        text: formatMessage({
                            id: 'OPERATION.INTERIOR_ANGLE',
                            default: 'interior'
                        }),
                        value: 'interiorAngle'
                    },
                    {
                        text: formatMessage({
                            id: 'OPERATION.EXTERIOR_ANGLE',
                            default: 'exterior'
                        }),
                        value: 'exteriorAngle'
                    },
                    {
                        text: formatMessage({
                            id: 'OPERATION.CLOCKWISE',
                            default: 'clockwise'
                        }),
                        value: 'clockwise'
                    },
                    {
                        text: formatMessage({
                            id: 'OPERATION.COUNTER_CLOCKWISE',
                            default: 'counter clockwise'
                        }),
                        value: 'counterClockwise'
                    }
                ]
            },
            BITWISE_SYMBOL: {
                acceptReporters: false,
                items: [
                    {
                        text: '&',
                        value: 'and'
                    },
                    {
                        text: '|',
                        value: 'or'
                    },
                    {
                        text: '^',
                        value: 'xor'
                    },
                    {
                        text: !isRTL ? '<<' : '>>',
                        value: 'leftShift'
                    },
                    {
                        text: !isRTL ? '>>' : '<<',
                        value: 'rightShift'
                    },
                    {
                        text: !isRTL ? '>>>' : '<<<',
                        value: 'logicalRightShift'
                    }
                ]
            },
            CONSTANT: {
                acceptReporters: false,
                items: [
                    {
                        text: '𝜋',
                        value: 'pi'
                    },
                    {
                        text: '𝜑',
                        value: 'phi'
                    },
                    {
                        text: '𝛾',
                        value: 'gamma'
                    },
                    {
                        text: '𝑒',
                        value: 'e'
                    },
                    {
                        text: formatMessage({
                            id: 'OPERATION.SQRT2',
                            default: '√2'
                        }),
                        value: 'sqrt2'
                    },
                    {
                        text: '∞',
                        value: 'Infinity'
                    },
                    {
                        text: '-∞',
                        value: '-Infinity'
                    },
                    {
                        text: formatMessage({
                            id: 'OPERATION.NEW_LINE',
                            default: '↵ (new line)'
                        }),
                        value: 'newLine'
                    },
                    {
                        text: formatMessage({
                            id: 'OPERATION.TAB',
                            default: '→ (tab)'
                        }),
                        value: 'tab'
                    }
                ]
            }
        };
    };

    class Operation {
        getInfo() {
            return getInfo();
        }

        constructor(runtime) {
            this.runtime = runtime ?? Scratch?.vm?.runtime

            if (!this.runtime) {
                return
            }

            setExpandableBlocks({
                'OPERATION_infJoin': {
                    type: INPUT_TYPES.STRING,
                    separatorText: formatMessage({
                        id: 'OPERATION.INF_JOIN_SEPARATOR',
                        default: ''
                    }),
                    defaultItemCount: 2
                },
                'OPERATION_containOptions_ci': {
                    type: INPUT_TYPES.STRING,
                    separatorText: formatMessage({
                        id: 'OPERATION.CONTAIN_OPTIONS_SEPARATOR',
                        default: ' , '
                    }),
                    defaultItemCount: 1
                },
                'OPERATION_containOptions_cs': {
                    type: INPUT_TYPES.STRING,
                    separatorText: formatMessage({
                        id: 'OPERATION.CONTAIN_OPTIONS_SEPARATOR',
                        default: ' , '
                    }),
                    defaultItemCount: 1
                },
                'OPERATION_find': {
                    type: INPUT_TYPES.STRING,
                    separatorText: '',
                    defaultItemCount: 2
                }
            }, this.runtime)
        }

        openSettingWindow() {
            showWindow();
        }

        exponent({ NUM1, NUM2 }) {
            return Cast.toNumber(NUM1) ** Cast.toNumber(NUM2);
        }

        root({ NUM1, NUM2 }) {
            return Math.pow(Cast.toNumber(NUM2), 1 / Cast.toNumber(NUM1));
        }

        negative({ NUM }) {
            return 0 - Cast.toNumber(NUM);
        }

        constrain({ NUM, LOW, HIGH }) {
            const low = Math.min(Cast.toNumber(LOW), Cast.toNumber(HIGH));
            const high = Math.max(Cast.toNumber(LOW), Cast.toNumber(HIGH));
            return Math.min(Math.max(NUM, low), high);
        }

        loopNum({ NUM, START, END }) {
            let num = Cast.toNumber(NUM);
            let start = Math.min(Cast.toNumber(START), Cast.toNumber(END));
            let end = Math.max(Cast.toNumber(START), Cast.toNumber(END));
            let range_num = end - start + 1;
            let result = ((num - start) % range_num + range_num) % range_num + start;
            if (result > end) {
                result -= range_num;
            }
            return result;
        }

        round({ NUM1, NUM2 }) {
            let num1 = Cast.toNumber(NUM1);
            let num2 = Cast.toNumber(NUM2);
            if (num2 <= 0) return num1;
            return num1.toFixed(num2);
        }

        mapOff({ NUM, START1, END1, START2, END2 }) {
            NUM = Cast.toNumber(NUM);
            START1 = Cast.toNumber(START1);
            END1 = Cast.toNumber(END1);
            START2 = Cast.toNumber(START2);
            END2 = Cast.toNumber(END2);
            return ((NUM - START1) / (END1 - START1)) * (END2 - START2) + START2;
        }

        find(args) {
            const numberArr = Object.keys(args)
                .filter(key => key.startsWith('ADD'))
                .map(key => args[key]);

            switch (args.MODE) {
                case 'max': return Math.max(...numberArr);
                case 'min': return Math.min(...numberArr);
                case 'mean': {
                    const sum = numberArr.reduce((acc, curr) => acc + Number(curr), 0);
                    return sum / numberArr.length;
                }
                case 'sum': return numberArr.reduce((acc, curr) => acc + Number(curr), 0);
                case 'itemCount': return numberArr.length;
                case 'random': return numberArr[Math.floor(Math.random() * numberArr.length)];
            }
        }

        atan2Block({ NUM1, NUM2 }) {
            const num1 = Cast.toNumber(NUM1);
            const num2 = Cast.toNumber(NUM2);
            return Math.atan2(num1, num2) * 180 / Math.PI;
        }

        logWithBase({ NUM, BASE }) {
            const num = Cast.toNumber(NUM);
            const base = Cast.toNumber(BASE);
            return Math.log(num) / Math.log(base);
        }

        factorial({ NUM }) {
            let num = Cast.toNumber(NUM);
            if (num < 0 || !Number.isInteger(num)) return NaN;
            if (num > 170) return Infinity;
            if (num === 0) return 1;
            let r = 1;
            for (; num > 1; num--) r *= num;
            return r;
        }

        squareRoot({ NUM }) {
            return Math.sqrt(Cast.toNumber(NUM));
        }

        cubeRoot({ NUM }) {
            return Math.cbrt(Cast.toNumber(NUM));
        }

        toPercent({ NUM }) {
            return Cast.toNumber(NUM) / 100;
        }

        percentOf({ NUM1, NUM2 }) {
            return (
                Cast.toNumber(NUM2) / 100
            ) * NUM1;
        }

        calculate({ TEXT }) {
            let expression = String(TEXT);

            let stack = []; // 存储运算符
            let postfix = []; // 存储数字

            // 运算符优先级与几元运算符
            let operators = {
                '(': {
                    precedence: 0,
                },
                '+': {
                    precedence: 1,
                    arity: 2,
                    code: ((x, y) => stack.push(x + y))
                },
                '-': {
                    precedence: 1,
                    arity: 2,
                    code: ((x, y) => stack.push(x - y))
                },
                '*': {
                    precedence: 2,
                    arity: 2,
                    code: ((x, y) => stack.push(x * y))
                },
                '·': {
                    precedence: 2,
                    arity: 2,
                    code: ((x, y) => stack.push(x * y))
                },
                '×': {
                    precedence: 2,
                    arity: 2,
                    code: ((x, y) => stack.push(x * y))
                },
                '/': {
                    precedence: 2,
                    arity: 2,
                    code: ((x, y) => stack.push(x / y))
                },
                '÷': {
                    precedence: 2,
                    arity: 2,
                    code: ((x, y) => stack.push(x / y))
                },
                '√': {
                    precedence: 3,
                    arity: 1,
                    code: ((x, y) => stack.push(Math.sqrt(y)))
                },
                '∛': {
                    precedence: 3,
                    arity: 1,
                    code: ((x, y) => stack.push(Math.cbrt(y)))
                },
                '∜': {
                    precedence: 3,
                    arity: 1,
                    code: ((x, y) => stack.push(Math.pow(y, 0.25)))
                },
                '^': {
                    precedence: 4,
                    arity: 2,
                    code: ((x, y) => stack.push(Math.pow(x, y)))
                },
                'sin': {
                    precedence: 5,
                    arity: 1,
                    code: ((x, y) => stack.push(Math.sin(y * Math.PI / 180)))
                },
                'cos': {
                    precedence: 5,
                    arity: 1,
                    code: ((x, y) => stack.push(Math.cos(y * Math.PI / 180)))
                },
                'tan': {
                    precedence: 5,
                    arity: 1,
                    code: ((x, y) => stack.push(Math.tan(y * Math.PI / 180)))
                },
                'asin': {
                    precedence: 5,
                    arity: 1,
                    code: ((x, y) => stack.push(Math.asin(y) * 180 / Math.PI))
                },
                'acos': {
                    precedence: 5,
                    arity: 1,
                    code: ((x, y) => stack.push(Math.acos(y) * 180 / Math.PI))
                },
                'atan': {
                    precedence: 5,
                    arity: 1,
                    code: ((x, y) => stack.push(Math.atan(y) * 180 / Math.PI))
                },
                'atan_xy': {
                    // 往往要和 “,” 一起使用，格式是 “atan_xy num1 , num2”，
                    // 原理是 “,” 仅仅可以将两个数分开，把 num1 和 num2 都添加进去，这时运算数栈就有两个数了（[num1, num2]），然后 atan_xy 就可以对后两个数字进行操作了
                    precedence: 5,
                    arity: 2,
                    code: ((y, x) => stack.push(Math.atan2(y, x) * 180 / Math.PI))
                },
                'log': {
                    precedence: 5,
                    arity: 1,
                    code: ((x, y) => stack.push(Math.log(y) / Math.LN10))
                },
                'log_ten': {
                    precedence: 5,
                    arity: 1,
                    code: ((x, y) => stack.push(Math.log10(y)))
                },
                'abs': {
                    precedence: 5,
                    arity: 1,
                    code: ((x, y) => stack.push(Math.abs(y)))
                },
                ',': {
                    precedence: Infinity,
                    arity: 2,
                    code: ((x, y) => {
                        stack.push(x);
                        stack.push(y);
                    })
                }
            };

            // 处理表达式
            expression = `(${expression})`; // 这个括号是必要的，涉及正负数前缀（ “(+” 与 “(-” ）
            expression = expression.replace(/\s+/g, ''); // 删除所有空格
            expression = expression.replace(/\(\-/g, '(0-'); // 处理负数前缀（例如：(-2)）
            expression = expression.replace(/\(\+/g, '(0+'); // 处理正数前缀（例如：(+2)）
            expression = expression.replace(/sqrt/gi, '√'); // 处理立方根 √
            expression = expression.replace(/cbrt/gi, '∛'); // 处理平方根 ∛
            expression = expression.replace(/4thrt/gi, '∜'); // 处理四方根 ∜
            expression = expression.replace(/π|pi/gi, `${Math.PI}`); // 处理 π
            expression = expression.replace(/(?<!t)e(?!n)/gi, `${Math.E}`); // 处理 e
            expression = expression.replace(/phi|φ/gi, '1.618033988749895'); // 处理 φ
            expression = expression.replace(/\)\s*\(/g, ')·('); // 在两个连续括号的括号之间插入乘法（例如：(2+3)(3+4)）
            expression = expression.replace(/\)\s*(\d*\.?\d+)/g, ')$1·'); // 在后括号与小数之间插入乘法（例如：(2+3)0.1）
            expression = expression.replace(/(\d*\.?\d+)\s*\(/g, '$1·('); // 在小数与前括号之间插入乘法（例如：0.1(2+3)）

            // 转换后缀表示法
            try {
                let tokens = expression.match(/(?:sin|cos|tan|asin|acos|atan_xy|atan|log_ten|log|abs|[()]|[\d.]+|\S)/gi);
                if (tokens === null) return '';
                for (let token of tokens) {
                    if (token === '(') {
                        // 处理左括号
                        stack.push(token);
                    } else if (token === ')') {
                        // 处理右括号
                        while (stack.length > 0 && stack[stack.length - 1] !== '(') {
                            postfix.push(stack.pop());
                        }
                        stack.pop();  // 弹出左括号
                    } else {
                        let value = parseFloat(token);
                        if (isNaN(value)) {
                            // 处理运算符
                            while (stack.length > 0 && operators[token.toLowerCase()].precedence <= operators[stack[stack.length - 1].toLowerCase()].precedence) {
                                postfix.push(stack.pop());
                            }
                            stack.push(token);
                        } else {
                            // 处理数字
                            postfix.push(value);
                        }
                    }
                }

                // 弹出剩余的运算符
                while (stack.length > 0) {
                    postfix.push(stack.pop());
                }

                // 计算后缀表达式
                stack = [];
                for (let token of postfix) {
                    if (typeof token === 'number') {
                        stack.push(token);
                    } else {
                        let y = stack.pop();
                        let x = null;
                        if (operators[token.toLowerCase()].arity >= 2) {
                            x = stack.pop();
                        }
                        if (typeof y === 'undefined' || typeof x === 'undefined') {
                            throw new Error('number is undefined')
                        };
                        operators[token.toLowerCase()].code(x, y);
                    }
                }
            }
            catch (error) {
                return '';
            }

            if (stack.length !== 1) return '';
            return stack[0];
        }

        booleanMenu({ BOOLEAN }) {
            if (BOOLEAN === 'random') return Math.random() < 0.5;
            return BOOLEAN == 'true' ? true : false;
        }

        probability({ NUM }) {
            let decimalProbability = Cast.toNumber(NUM) / 100;
            let random = Math.random();
            return random < decimalProbability;
        }

        isTrue({ OPERAND }) {
            return Cast.toBoolean(OPERAND);
        }

        isFalse({ OPERAND }) {
            return !Cast.toBoolean(OPERAND);
        }

        _isPrime = (number) => {
            if (number <= 1) return false;
            if (number <= 3) return true;
            if (number % 2 === 0 || number % 3 === 0) return false;
            let i = 5;
            while (i * i <= number) {
                if (number % i === 0 || number % (i + 2) === 0) return false;
                i += 6;
            }
            return true;
        };

        _isComposite = (number) => {
            if (number <= 1) return false;
            for (let i = 2; i <= Math.sqrt(number); i++) {
                if (number % i === 0) return true;
            }
            return false;
        };

        checkType({ INPUT, MODE }) {
            INPUT = String(INPUT);
            const isNumRegex = /^-?\d+(\.\d+)?(e[+-]?\d+)?$/i;
            switch (MODE) {
                case 'number': return isNumRegex.test(INPUT);
                case 'positiveNumber': return Cast.toNumber(INPUT) > 0 && isNumRegex.test(INPUT);
                case 'negativeNumber': return Cast.toNumber(INPUT) < 0 && isNumRegex.test(INPUT);
                case 'evenNumber': return Cast.toNumber(INPUT) % 2 === 0 && isNumRegex.test(INPUT);
                case 'oddNumber': return Cast.toNumber(INPUT) % 2 !== 0 && isNumRegex.test(INPUT);
                case 'integerNumber': return Cast.toNumber(INPUT) % 1 === 0 && isNumRegex.test(INPUT);
                case 'decimalNumber': return Cast.toNumber(INPUT) % 1 !== 0 && isNumRegex.test(INPUT);
                case 'primeNumber': return this._isPrime(Cast.toNumber(INPUT)) && isNumRegex.test(INPUT);
                case 'compositeNumber': return this._isComposite(Cast.toNumber(INPUT)) && isNumRegex.test(INPUT);
                case 'text': return !isNumRegex.test(INPUT) && INPUT.length >= 1;
                case 'boolean': return INPUT === 'true' || INPUT === 'false';
                default: return false;
            }
        }

        containOptions_ci(args) {
            let options = [];
            let operand = String(args.OPERAND).toLowerCase();
            for (let key in args) {
                if (key !== 'OPERAND') {
                    if (typeof args[key] !== 'object') {
                        // 在解释器下会有 mutation
                        if (args.hasOwnProperty(key)) {
                            options.push(
                                String(args[key]).toLowerCase()
                            );
                        }
                    }
                }
            }
            return options.includes(operand);
        }

        _compare(arg1, arg2, symbol) {
            if (symbol === 'equal') return Cast.compare(arg1, arg2) === 0;
            if (symbol === 'strictlyEqual') return String(arg1) === String(arg2);
            if (symbol === 'greater') return Cast.compare(arg1, arg2) > 0;
            if (symbol === 'less') return Cast.compare(arg1, arg2) < 0;
            if (symbol === 'greaterOrEqual') return Cast.compare(arg1, arg2) >= 0;
            if (symbol === 'lessOrEqual') return Cast.compare(arg1, arg2) <= 0;
            if (symbol === 'unequal') return Cast.compare(arg1, arg2) !== 0;
            if (symbol === 'strictlyUnequal') return String(arg1) !== String(arg2);
            if (symbol === 'equalNegative') return Cast.compare(arg1, -arg2) === 0;
            if (symbol === 'EqualPON') return Cast.compare(arg1, -arg2) === 0 || Cast.compare(arg1, arg2) === 0;
            if (symbol === 'approximatelyEqual') return Math.abs(arg1 - arg2) <= 0.5;
            if (symbol === 'vertical') return ((arg1 - (arg2 - 90)) % 180) === 0;
            if (symbol === 'parallel') return ((arg1 - arg2) % 180) === 0;
            return false;
        }

        compare({ OPERAND1, OPERAND2, SYMBOL }) {
            return this._compare(OPERAND1, OPERAND2, SYMBOL);
        }

        continuousCompare({ OPERAND1, OPERAND2, OPERAND3, SYMBOL1, SYMBOL2 }) {
            const result1 = this._compare(OPERAND1, OPERAND2, SYMBOL1);
            const result2 = this._compare(OPERAND2, OPERAND3, SYMBOL2);
            return result1 && result2;
        }

        approximatelyEqual({ OPERAND1, OPERAND2, NUM }) {
            const operand1 = Cast.toNumber(OPERAND1);
            const operand2 = Cast.toNumber(OPERAND2);
            let num = Math.abs(
                Cast.toNumber(NUM)
            );
            return Math.abs(operand1 - operand2) <= num;
        }

        isBetween({ NUM, START, END }) {
            const num = Cast.toNumber(NUM);
            const start = Math.min(Cast.toNumber(START), Cast.toNumber(END));
            const end = Math.max(Cast.toNumber(START), Cast.toNumber(END));
            return (start <= num) && (num <= end);
        }

        startEndWith({ STRING1, STRING2, POSITION }) {
            let str1 = String(STRING1).toLowerCase();
            let str2 = String(STRING2).toLowerCase();
            if (POSITION === 'front') {
                return str1.startsWith(str2);
            }
            else if (POSITION === 'back') {
                return str1.endsWith(str2);
            }
            return false;
        }

        contains_cs(args) {
            const format = function (string) {
                return Cast.toString(string);
            };
            return format(args.STRING1).includes(format(args.STRING2));
        }

        containOptions_cs(args) {
            let options = [];
            let operand = String(args.OPERAND);
            for (let key in args) {
                if (key !== 'OPERAND') {
                    if (typeof args[key] !== 'object') {
                        // 在解释器下会有 mutation
                        if (args.hasOwnProperty(key)) {
                            options.push(
                                String(args[key])
                            );
                        }
                    }
                }
            }
            return options.includes(operand);
        }

        trueBlock = () => true;

        falseBlock = () => false;

        logicGateOperation({ OPERAND1, OPERAND2, SYMBOL }) {
            const operand1 = Cast.toBoolean(OPERAND1);
            const operand2 = Cast.toBoolean(OPERAND2);
            if (SYMBOL === 'nand') return !(operand1 && operand2);
            if (SYMBOL === 'nor') return !(operand1 || operand2);
            if (SYMBOL === 'xor') return operand1 !== operand2;
            if (SYMBOL === 'xnor') return operand1 === operand2;
            return false;
        }

        strictlyEqualBlock({ OPERAND1, OPERAND2 }) {
            return this._compare(OPERAND1, OPERAND2, 'strictlyEqual')
        }

        greaterOrEqualBlock({ OPERAND1, OPERAND2 }) {
            return this._compare(OPERAND1, OPERAND2, 'greaterOrEqual')
        }

        lessOrEqualBlock({ OPERAND1, OPERAND2 }) {
            return this._compare(OPERAND1, OPERAND2, 'lessOrEqual')
        }

        unequalBlock({ OPERAND1, OPERAND2 }) {
            return this._compare(OPERAND1, OPERAND2, 'unequal')
        }

        strictlyUnequalBlock({ OPERAND1, OPERAND2 }) {
            return this._compare(OPERAND1, OPERAND2, 'strictlyUnequal')
        }

        equalNegativeBlock({ OPERAND1, OPERAND2 }) {
            return this._compare(OPERAND1, OPERAND2, 'equalNegative')
        }

        EqualPONBlock({ OPERAND1, OPERAND2 }) {
            return this._compare(OPERAND1, OPERAND2, 'EqualPON')
        }

        approximatelyEqualBlock({ OPERAND1, OPERAND2 }) {
            return this._compare(OPERAND1, OPERAND2, 'approximatelyEqual')
        }

        verticalBlock({ OPERAND1, OPERAND2 }) {
            return this._compare(OPERAND1, OPERAND2, 'vertical')
        }

        parallelBlock({ OPERAND1, OPERAND2 }) {
            return this._compare(OPERAND1, OPERAND2, 'parallel')
        }

        text({ STRING }) {
            return Cast.toString(STRING);
        }

        test({ BOOLEAN, STRING1, STRING2 }) {
            return Cast.toBoolean(BOOLEAN) ? STRING1 : STRING2;
        }

        nandBlock = ({ OPERAND1, OPERAND2 }) => !(Cast.toBoolean(OPERAND1) && Cast.toBoolean(OPERAND2));

        norBlock = ({ OPERAND1, OPERAND2 }) => !(Cast.toBoolean(OPERAND1) || Cast.toBoolean(OPERAND2));

        xorBlock = ({ OPERAND1, OPERAND2 }) => Cast.toBoolean(OPERAND1) !== Cast.toBoolean(OPERAND2);

        xnorBlock = ({ OPERAND1, OPERAND2 }) => Cast.toBoolean(OPERAND1) === Cast.toBoolean(OPERAND2);

        repeat({ STRING, NUMBER }) {
            const text = String(STRING);
            const times = Cast.toNumber(NUMBER);
            return text.repeat(times);
        }

        trim({ STRING }) {
            return String(STRING).trim();
        }

        _negLoop = (num, iterable) => {
            if (num >= 0) return num;
            return iterable.length + num + 1;
        };

        letters({ START, END, STRING }) {
            const str = String(STRING)
            let start = this._negLoop(Cast.toNumber(START), str);
            let end = this._negLoop(Cast.toNumber(END), str);
            [start, end] = start < end ? [start, end] : [end, start];
            return str.slice(
                Cast.toNumber(start) - 1, Cast.toNumber(end)
            );
        }

        remove({ START, END, STRING }) {
            const str = String(STRING)
            let start = this._negLoop(Cast.toNumber(START), str);
            let end = this._negLoop(Cast.toNumber(END), str);
            [start, end] = start < end ? [start, end] : [end, start];
            return str.substring(
                0, Cast.toNumber(start) - 1
            ) + str.substring(
                Cast.toNumber(end)
            );
        }

        removeChar({ INDEX, STRING }) {
            return this.remove({
                START: INDEX, END: INDEX, STRING
            });
        }

        insert({ STRING, INSERT_STR, INDEX }) {
            const str = String(STRING);
            const insStr = String(INSERT_STR);
            const index = this._negLoop(Cast.toNumber(INDEX), str);

            if (index > 0 && index <= str.length + 1) {
                return str.slice(0, index - 1) + insStr + str.slice(index - 1);
            } else {
                return str;
            }
        }

        replace_ci({ STRING1, STRING2, STRING3 }) {
            const text = String(STRING1);
            const oldStr = String(STRING2).toLowerCase();
            const newStr = String(STRING3);
            const index = text.toLowerCase().indexOf(oldStr);
            if (index !== -1) {
                return text.substring(0, index) + newStr + text.substring(index + oldStr.length);
            }
            return text;
        }
        
        replaceAll_ci({ STRING1, STRING2, STRING3 }) {
            let text = String(STRING1);
            const oldStr = String(STRING2).toLowerCase();
            const newStr = String(STRING3);
            let index;
            while ((index = text.toLowerCase().indexOf(oldStr)) !== -1) {
                text = text.substring(0, index) + newStr + text.substring(index + oldStr.length);
            }
            return text;
        }
        
        replace({ STRING1, STRING2, STRING3 }) {
            const text = String(STRING1);
            const oldStr = String(STRING2);
            const newStr = String(STRING3);
            const index = text.indexOf(oldStr);
            if (index !== -1) {
                return text.substring(0, index) + newStr + text.substring(index + oldStr.length);
            }
            return text;
        }
        
        replaceAll({ STRING1, STRING2, STRING3 }) {
            let text = String(STRING1);
            const oldStr = String(STRING2);
            const newStr = String(STRING3);
            let index;
            while ((index = text.indexOf(oldStr)) !== -1) {
                text = text.substring(0, index) + newStr + text.substring(index + oldStr.length);
            }
            return text;
        }        

        replaceIndex({ STRING, START, END, REPLACEMENT }) {
            let str = String(STRING);
            let rep = String(REPLACEMENT);
            let start = this._negLoop(Cast.toNumber(START), str);
            let end = this._negLoop(Cast.toNumber(END), str);
            [start, end] = start < end ? [start, end] : [end, start];
            start = start - 1;
            start = Math.max(0, start);
            end = Math.min(str.length, end);
            return str.slice(0, start) + rep + str.slice(end);
        }

        replaceIndexChar({ STRING, INDEX, REPLACEMENT }) {
            return this.replaceIndex({
                STRING, START: INDEX, END: INDEX, REPLACEMENT
            });
        }

        _countKeyword = (sentence, keyword, ci = false) => (sentence.match(new RegExp(keyword, ci ? 'gi' : 'g')) || []).length;

        toggleCase_ci({ MODE, STRING2, STRING1 }) {
            const str1 = String(STRING1).toLowerCase();
            const str2 = String(STRING2).toLowerCase();
            if (MODE === 'first') return str1.indexOf(str2) + 1;
            if (MODE === 'last') return str1.lastIndexOf(str2) + 1;
            if (MODE === 'number') return this._countKeyword(String(STRING1), String(STRING2), true);
            return '';
        }

        toggleCase({ MODE, STRING2, STRING1 }) {
            const str1 = String(STRING1);
            const str2 = String(STRING2);
            if (MODE === 'first') return str1.indexOf(str2) + 1;
            if (MODE === 'last') return str1.lastIndexOf(str2) + 1;
            if (MODE === 'number') return this._countKeyword(String(STRING1), String(STRING2));
            return '';
        }

        _textToTitleCase = (str) => str.replace(/\S+/g, function (txt) {
            return txt[0].toUpperCase() + txt.substring(1).toLowerCase();
        });

        convert({ STRING, MODE }) {
            if (MODE === 'uppercase') return String(STRING).toUpperCase();
            if (MODE === 'lowercase') return String(STRING).toLowerCase();
            if (MODE === 'capitalize') return this._textToTitleCase(String(STRING));
            if (MODE === 'reverse') return (String(STRING)).split('').reverse().join('');
            return '';
        }

        aftOrBfrStr({ MODE, STRING1, STRING2 }) {
            const str1 = String(STRING1);
            const str2 = String(STRING2);

            if (str1 === '') return '';
            if (str2 === '') return str1;

            const index = str1.toLowerCase().indexOf(str2.toLowerCase());

            if (index === -1) return str1;

            if (MODE === 'after') {
                return str1.substring(index + str2.length);
            } else {
                return str1.substring(0, index);
            }
        }

        splitContains({ STRING1, SYMBOL, STRING2 }) {
            const str1 = String(STRING1);
            const str2 = String(STRING2);
            const symbol = String(SYMBOL);
            const escapedSymbol = this.escapeRegExp(symbol);
            const regex = new RegExp(escapedSymbol, 'i');
            const splitted = str1.split(regex);
            return splitted.includes(str2);
        }

        escapeRegExp(string) {
            return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        }

        split({ STRING, SYMBOL, NUM }) {
            const str = String(STRING);
            const symbol = String(SYMBOL);
            const escapedSymbol = this.escapeRegExp(symbol);
            const regex = new RegExp(escapedSymbol, 'i');
            const splitted = str.split(regex);
            const num = this._negLoop(Cast.toNumber(NUM), splitted);

            if (!Number.isInteger(num)) return '';

            return (splitted[(num - 1)]) ?? '';
        }

        splitAndRemove({ STRING, SYMBOL, NUM }) {
            const str = String(STRING);
            const symbol = String(SYMBOL);
            const escapedSymbol = this.escapeRegExp(symbol);
            const regex = new RegExp(escapedSymbol, 'i');
            const splitted = str.split(regex);
            const num = this._negLoop(Cast.toNumber(NUM), splitted);

            if (num < 1 || !Number.isInteger(num)) return str;

            splitted.splice(num - 1, 1);

            return splitted.join(symbol);
        }

        splitAndInsert({ STRING, SYMBOL, INSERT_STR, INDEX }) {
            const str = String(STRING);
            const symbol = String(SYMBOL);
            const insStr = String(INSERT_STR);
            const escapedSymbol = this.escapeRegExp(symbol);
            const regex = new RegExp(escapedSymbol, 'i');
            let splitted = str.split(regex);
            const index = this._negLoop(Cast.toNumber(INDEX), splitted);

            if (index < 1 || index > splitted.length || !Number.isInteger(index)) {
                return str;
            }

            splitted.splice(index - 1, 0, insStr);
            return splitted.join(symbol);
        }

        splitAndReplace({ STRING, SYMBOL, REPLACE_STR, INDEX }) {
            const str = String(STRING);
            const symbol = String(SYMBOL);
            const repStr = String(REPLACE_STR);
            const escapedSymbol = this.escapeRegExp(symbol);
            const regex = new RegExp(escapedSymbol, 'i');
            let splitted = str.split(regex);
            const index = this._negLoop(Cast.toNumber(INDEX), splitted);

            if (index < 1 || index > splitted.length || !Number.isInteger(index)) {
                return str;
            }

            splitted[index - 1] = repStr;
            return splitted.join(symbol);
        }

        splitByCount({ STRING, COUNT, NUM }) {
            const str = String(STRING);
            const count = Cast.toNumber(COUNT);
            const num = Cast.toNumber(NUM);

            if (!Number.isInteger(num)) return '';
            if (count < 1 || !Number.isInteger(count)) return '';
            if (str.length < 1) return '';

            const regex = new RegExp(`.{1,${count}}`, 'g');
            const chunks = str.match(regex);

            const index = num < 0 ? this._negLoop(num, chunks) : num;

            return chunks[index - 1] ?? '';
        }

        splitAndShuffle({ STRING, SYMBOL }) {
            const str = String(STRING);
            const symbol = String(SYMBOL);
            const escapedSymbol = this.escapeRegExp(symbol);
            const regex = new RegExp(escapedSymbol, 'i');
            let splitted = str.split(regex);

            for (let i = splitted.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [splitted[i], splitted[j]] = [splitted[j], splitted[i]];
            }

            return splitted.join(symbol);
        }

        splitAndAnalysis({ STRING, SYMBOL, MODE }) {
            const str = String(STRING);
            const symbol = String(SYMBOL);
            const escapedSymbol = this.escapeRegExp(symbol);
            const regex = new RegExp(escapedSymbol, 'i');
            const splitted = str.split(regex);
            const numberArr = splitted.map(Cast.toNumber);

            switch (MODE) {
                case 'max': return Math.max(...numberArr);
                case 'min': return Math.min(...numberArr);
                case 'mean': {
                    const sum = numberArr.reduce((acc, curr) => acc + Number(curr), 0);
                    return sum / numberArr.length;
                }
                case 'sum': return numberArr.reduce((acc, curr) => acc + Number(curr), 0);
                case 'itemCount': return splitted.length;
                case 'random': return splitted[Math.floor(Math.random() * splitted.length)];
            }
        }

        join({ STRING }, util) {
            const thread = util.thread;
            thread.joinValue = thread.joinValue ?? {
                value: '',
                readyClean: 'false'
            }
            if (thread.joinValue.readyClean) {
                thread.joinValue = {
                    value: Cast.toString(STRING),
                    readyClean: false
                }
                return;
            }
            thread.joinValue = {
                value: thread.joinValue.value + Cast.toString(STRING),
                readyClean: false
            }
        }

        getJoin({ }, util) {
            const thread = util.thread;
            if (thread.joinValue) {
                thread.joinValue.readyClean = true;
                return thread.joinValue.value ?? '';
            }
            return '';
        }

        infJoin(args) {
            let keys = Object.keys(args).filter(key => key.startsWith('ADD'));
            keys.sort((a, b) => {
                let numA = parseInt(a.slice(3));
                let numB = parseInt(b.slice(3));
                return numA - numB;
            });
            let result = keys.map(key => args[key]).join('');
            return result;
        }

        getUnicode({ STRING }) {
            STRING = String(STRING);
            if (STRING.length < 1) return '';
            return STRING.charCodeAt();
        }

        unicodeToString({ STRING }) {
            if (isNaN(STRING)) return '';
            return String.fromCharCode(STRING);
        }

        shuffleString({ STRING }) {
            let array = String(STRING).split('');
            for (let i = array.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array.join('');
        }

        overwrite({ ORIGINAL, OTHER, DIRECTION }) {
            const originalStr = String(ORIGINAL);
            const otherStr = String(OTHER);
            const isFromStart = DIRECTION === 'f2b';
            const oLength = originalStr.length;
            const fLength = otherStr.length;
            let result = '';
            if (isFromStart) result = otherStr + originalStr.slice(fLength, oLength);
            else result = originalStr.slice(0, oLength - fLength) + otherStr;
            if (oLength <= fLength) result = otherStr;
            return result;
        }

        padString({ ORIGINAL_STR, REQUIRED_LENGTH, CHAR_TO_ADD, POSITION }) {
            let str = String(ORIGINAL_STR);
            let add = String(CHAR_TO_ADD);
            let len = Cast.toNumber(REQUIRED_LENGTH);

            let diff = len - str.length;

            if (diff <= 0) {
                return str;
            }

            if (POSITION === 'front') {
                return add.repeat(diff) + str;
            }
            else {
                return str + add.repeat(diff);
            }
        }

        calculateLineLength({ X1, Y1, X2, Y2 }) {
            const x1 = Cast.toNumber(X1);
            const y1 = Cast.toNumber(Y1);
            const x2 = Cast.toNumber(X2);
            const y2 = Cast.toNumber(Y2);
            return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
        }

        calculateLineDirection({ X1, Y1, X2, Y2 }) {
            const x1 = Cast.toNumber(X1);
            const y1 = Cast.toNumber(Y1);
            const x2 = Cast.toNumber(X2);
            const y2 = Cast.toNumber(Y2);
            let angleRadians = Math.atan2(y2 - y1, x2 - x1);
            let angleDegrees = angleRadians * 180 / Math.PI;
            let scratchAngle = -angleDegrees + 90;
            if (scratchAngle < -180) {
                scratchAngle = 360 + scratchAngle;
            }
            else if (scratchAngle > 180) {
                scratchAngle = scratchAngle - 360;
            }
            return scratchAngle;
        }

        calculateMidpoint({ X1, Y1, X2, Y2 }) {
            const x1 = Cast.toNumber(X1);
            const y1 = Cast.toNumber(Y1);
            const x2 = Cast.toNumber(X2);
            const y2 = Cast.toNumber(Y2);
            const midpointX = (x1 + x2) / 2;
            const midpointY = (y1 + y2) / 2;
            return [midpointX, midpointY];
        }

        calculateSlope({ X1, Y1, X2, Y2 }) {
            const x1 = parseFloat(X1);
            const y1 = parseFloat(Y1);
            const x2 = parseFloat(X2);
            const y2 = parseFloat(Y2);

            if (x2 - x1 === 0) {
                return Infinity;
            }

            const slope = (y2 - y1) / (x2 - x1);
            return slope;
        }

        calculateIntersection({ X1, Y1, X2, Y2, X3, Y3, X4, Y4 }) {
            const x1 = Cast.toNumber(X1);
            const y1 = Cast.toNumber(Y1);
            const x2 = Cast.toNumber(X2);
            const y2 = Cast.toNumber(Y2);
            const x3 = Cast.toNumber(X3);
            const y3 = Cast.toNumber(Y3);
            const x4 = Cast.toNumber(X4);
            const y4 = Cast.toNumber(Y4);
            let denominator = (x2 - x1) * (y4 - y3) - (y2 - y1) * (x4 - x3);
            if (denominator === 0) {
                return '';
            }
            let ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
            let x = x1 + ua * (x2 - x1);
            let y = y1 + ua * (y2 - y1);
            return [x, y];
        }

        triangle({ X1, Y1, X2, Y2, X3, Y3, MODE }) {
            const x1 = Cast.toNumber(X1);
            const y1 = Cast.toNumber(Y1);
            const x2 = Cast.toNumber(X2);
            const y2 = Cast.toNumber(Y2);
            const x3 = Cast.toNumber(X3);
            const y3 = Cast.toNumber(Y3);
            if (MODE === 'area') {
                let points = [[x1, y1], [x2, y2], [x3, y3]];
                let area = 0;
                let n = points.length;
                for (let i = 0; i < n; i++) {
                    let x1 = points[i][0];
                    let y1 = points[i][1];
                    let x2 = points[(i + 1) % n][0];
                    let y2 = points[(i + 1) % n][1];
                    area += x1 * y2;
                    area -= x2 * y1;
                }
                area = Math.abs(area) / 2;
                return (area);
            }
            if (MODE === 'circumference') {
                let i = 0;
                i += Math.sqrt(Math.pow(x1 - Cast.toNumber(x2), 2) + Math.pow(y1 - y2, 2));
                i += Math.sqrt(Math.pow(x2 - Cast.toNumber(x3), 2) + Math.pow(y2 - y3, 2));
                i += Math.sqrt(Math.pow(x3 - Cast.toNumber(x1), 2) + Math.pow(y3 - y1, 2));
                return i;
            }
            return 0;
        }

        triangleArea({ S1, S2, S3 }) {
            const s1 = Cast.toNumber(S1);
            const s2 = Cast.toNumber(S2);
            const s3 = Cast.toNumber(S3);
            const s = (s1 + s2 + s3) / 2;
            const area = Math.sqrt(s * (s - s1) * (s - s2) * (s - s3));
            return area;
        }

        rectangle({ X1, Y1, X2, Y2, X3, Y3, X4, Y4, MODE }) {
            const x1 = Cast.toNumber(X1);
            const y1 = Cast.toNumber(Y1);
            const x2 = Cast.toNumber(X2);
            const y2 = Cast.toNumber(Y2);
            const x3 = Cast.toNumber(X3);
            const y3 = Cast.toNumber(Y3);
            const x4 = Cast.toNumber(X4);
            const y4 = Cast.toNumber(Y4);
            if (MODE === 'area') {
                let points = [[x1, y1], [x2, y2], [x3, y3], [x4, y4]];
                let area = 0;
                let n = points.length;
                for (let i = 0; i < n; i++) {
                    let x1 = points[i][0];
                    let y1 = points[i][1];
                    let x2 = points[(i + 1) % n][0];
                    let y2 = points[(i + 1) % n][1];
                    area += x1 * y2;
                    area -= x2 * y1;
                }
                area = Math.abs(area) / 2;
                return (area);
            }
            if (MODE === 'circumference') {
                let i = 0;
                i += Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
                i += Math.sqrt(Math.pow(x2 - x3, 2) + Math.pow(y2 - y3, 2));
                i += Math.sqrt(Math.pow(x3 - x4, 2) + Math.pow(y3 - y4, 2));
                i += Math.sqrt(Math.pow(x4 - x1, 2) + Math.pow(y4 - y1, 2));
                return i;
            }
            return 0;
        }

        _parseGraphString(graphString) {
            const cleanedGraphString = graphString.replace(/\s/g, '');
            const regex = /\((\d+),(\d+)\)/g;
            let match;
            const points = [];

            while ((match = regex.exec(cleanedGraphString)) !== null) {
                points.push([parseInt(match[1]), parseInt(match[2])]);
            }

            return points;
        }

        graph({ GRAPH, MODE }) {
            try {
                let points = String(GRAPH);
                if (GRAPH.includes('(')) {
                    points = this._parseGraphString(points);
                }
                else {
                    points = JSON.parse(GRAPH);
                }
                let n = points.length;
                if (MODE === 'area') {
                    let area = 0;
                    for (let i = 0; i < n; i++) {
                        let x1 = points[i][0];
                        let y1 = points[i][1];
                        let x2 = points[(i + 1) % n][0];
                        let y2 = points[(i + 1) % n][1];
                        area += x1 * y2;
                        area -= x2 * y1;
                    }
                    area = Math.abs(area) / 2;
                    return (area);
                }
                if (MODE === 'circumference') {
                    let j = 0;
                    const numPoints = points.length;
                    for (let i = 0; i < numPoints; i++) {
                        const x1 = points[i][0];
                        const y1 = points[i][1];
                        const x2 = points[(i + 1) % numPoints][0];
                        const y2 = points[(i + 1) % numPoints][1];
                        j += Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
                    }
                    return j;
                }
            }
            catch {
                return 0;
            }
            return 0;
        }

        circle({ UNITS, LENGTH, MODE }) {
            const length = Cast.toNumber(LENGTH);
            if (MODE === 'circumference') {
                return 2 * Math.PI * (UNITS === 'radius' ? length : length / 2);
            }
            if (MODE === 'area') {
                return Math.PI * ((UNITS === 'radius' ? length : length / 2) ** 2);
            }
            return 0;
        }

        isAngleInRange({ ANGLE1, ANGLE2, ANGLE3, MODE }) {
            const normalizeAngle = angle => (angle + 180) % 360 - 180;
            let angle1 = normalizeAngle(Cast.toNumber(ANGLE1));
            let angle2 = normalizeAngle(Cast.toNumber(ANGLE2));
            let angle3 = normalizeAngle(Cast.toNumber(ANGLE3));
            switch (MODE) {
                case 'interiorAngle': {
                    if (angle2 > angle3) {
                        [angle2, angle3] = [angle3, angle2];
                    }
                    if (angle2 <= angle3) {
                        return angle1 >= angle2 && angle1 <= angle3;
                    } else {
                        return angle1 >= angle2 || angle1 <= angle3;
                    }
                }
                case 'exteriorAngle': {
                    if (angle2 < angle3) {
                        [angle2, angle3] = [angle3, angle2];
                    }
                    if (angle2 >= angle3) {
                        return angle1 >= angle2 || angle1 <= angle3;
                    } else {
                        return angle1 >= angle2 && angle1 <= angle3;
                    }
                }
                case 'clockwise': {
                    if (angle2 <= angle3) {
                        return angle1 >= angle2 && angle1 <= angle3;
                    } else {
                        return angle1 <= angle3 || angle1 >= angle2;
                    }
                }
                case 'counterClockwise': {
                    if (angle2 >= angle3) {
                        return angle1 >= angle3 && angle1 <= angle2;
                    } else {
                        return angle1 <= angle2 || angle1 >= angle3;
                    }
                }
            }
            return false;
        }

        calculateAngleDifference({ ANGLE1, ANGLE2, MODE }) {
            const angle1 = Cast.toNumber(ANGLE1);
            const angle2 = Cast.toNumber(ANGLE2);
            let diff = Math.abs(angle1 - angle2) % 360;
            switch (MODE) {
                case 'interiorAngle': return diff <= 180 ? diff : 360 - diff;
                case 'exteriorAngle': return diff <= 180 ? 360 - diff : diff;
                case 'clockwise': return angle1 <= angle2 ? (angle2 - angle1) % 360 : (360 - (angle1 - angle2) % 360);
                case 'counterClockwise': return angle1 >= angle2 ? (angle1 - angle2) % 360 : (360 - (angle2 - angle1) % 360);
            }
            return 0;
        }

        base({ NUM, INTO1, INTO2 }) {
            const into1 = Cast.toNumber(INTO1);
            const into2 = Cast.toNumber(INTO2);
            let num = String(NUM);
            if (!Number.isInteger(into1) || !Number.isInteger(into2)) {
                return '';
            }
            let isNeg = false;
            if (num[0] === '-') {
                isNeg = true;
                num = num.slice(1);
            }
            if (!this.isBase({ NUM: num, BASE: INTO1 })) return '';
            if (into1 > 1 && into1 < 37 && into2 > 1 && into2 < 37) {
                let dec = 0;
                num = num.toString().split('.');
                if (num.length > 1) {
                    // 处理小数部分
                    let fractional = 0;
                    const fractionalStr = num[1];
                    for (let i = 0; i < fractionalStr.length; i++) {
                        const digit = parseInt(fractionalStr[i], into1);
                        fractional += digit / (into1 ** (i + 1));
                    }
                    dec = parseInt(num[0], into1) + fractional;
                } else {
                    dec = parseInt(num[0], into1);
                }
                const result = dec.toString(into2);
                return (isNeg ? '-' : '') + result;
            } else {
                return '';
            }
        }

        toBin({ NUM }) {
            let num = Cast.toNumber(NUM);
            return num.toString(2);
        }

        toDec({ NUM }) {
            if (!this.isBase({ NUM: NUM, BASE: 2 })) return 0;
            let num = NUM.toString();
            let isNeg = false;
            if (num[0] === '-') {
                isNeg = true;
                num = num.slice(1);
            }
            num = num.split('.');
            if (num.length > 1) {
                // 处理小数部分
                let dec = parseInt(num[1], 2) / (2 ** num[1].length);
                num = parseInt(num[0], 2) + dec;
            } else {
                num = parseInt(num[0], 2);
            }
            return (isNeg ? '-' : '') + num;
        }

        _char0toZ = () => '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

        isBase({ NUM, BASE }) {
            let base = Cast.toNumber(BASE)
            if (!Number.isInteger(base)) {
                return '';
            }
            if (base > 1 && base < 37) {
                const chars = this._char0toZ().substring(0, base);
                return new RegExp(
                    `^[${chars}\\.-]+(?:e[+-]?[${chars}]+)?$`, 'i'
                ).test(Cast.toString(NUM));
            }
            return false;
        }

        numberNot({ NUM }) {
            const isBin = this.isBase({ NUM, BASE: 2 });
            if (isBin) {
                const strNum = String(NUM);
                return strNum.split('').map(bit => bit === '0' ? '1' : '0').join('');
            }
            const boolNum = Cast.toBoolean(NUM);
            return boolNum ? 0 : 1;
        }

        booleanToNumber({ BOOLEAN }) {
            const input = Cast.toNumber(
                Cast.toBoolean(BOOLEAN)
            );
            return input ? 1 : 0;
        }

        bitwiseBlock({ NUM1, SYMBOL, NUM2 }) {
            const num1 = Cast.toNumber(NUM1);
            const num2 = Cast.toNumber(NUM2);
            if (SYMBOL === 'and') return num1 & num2;
            if (SYMBOL === 'or') return num1 | num2;
            if (SYMBOL === 'xor') return num1 ^ num2;
            if (SYMBOL === 'leftShift') return num1 << num2;
            if (SYMBOL === 'rightShift') return num1 >> num2;
            if (SYMBOL === 'logicalRightShift') return num1 >>> num2;
            return 0;
        }

        bitwiseNot({ NUM }) {
            return ~Cast.toNumber(NUM);
        }

        bitwiseAndBlock = ({ NUM1, NUM2 }) => this.bitwiseBlock({ NUM1: NUM1, SYMBOL: 'and', NUM2: NUM2 });

        bitwiseOrBlock = ({ NUM1, NUM2 }) => this.bitwiseBlock({ NUM1: NUM1, SYMBOL: 'or', NUM2: NUM2 });

        bitwiseXorBlock = ({ NUM1, NUM2 }) => this.bitwiseBlock({ NUM1: NUM1, SYMBOL: 'xor', NUM2: NUM2 });

        bitwiseLeftShiftBlock = ({ NUM1, NUM2 }) => this.bitwiseBlock({ NUM1: NUM1, SYMBOL: 'leftShift', NUM2: NUM2 });

        bitwiseRightShiftBlock = ({ NUM1, NUM2 }) => this.bitwiseBlock({ NUM1: NUM1, SYMBOL: 'rightShift', NUM2: NUM2 });

        bitwiseLogicalRightShiftBlock = ({ NUM1, NUM2 }) => this.bitwiseBlock({ NUM1: NUM1, SYMBOL: 'logicalRightShift', NUM2: NUM2 });

        getConstant({ OPTION }) {
            if (OPTION === 'pi') return 3.141592653589793;
            if (OPTION === 'phi') return 1.618033988749895;
            if (OPTION === 'gamma') return 0.577215664901532;
            if (OPTION === 'e') return 2.718281828459045;
            if (OPTION === 'sqrt2') return 1.4142135623730951;
            if (OPTION === 'sqrt3') return 1.7320508075688772;
            if (OPTION === 'ln2') return 0.6931471805599453;
            if (OPTION === 'Infinity') return Infinity;
            if (OPTION === '-Infinity') return -Infinity;
            if (OPTION === 'NaN') return NaN;
            if (OPTION === 'newLine') return '\n';
            if (OPTION === 'tab') return '\t';
            return OPTION;
        }

        colorBlend({ COLOR1, COLOR2, RATIO }) {
            let hexColorRegex = /^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/;
            let c1 = String(COLOR1);
            let c2 = String(COLOR2);
            let ratio = Math.max(
                Math.min(
                    Cast.toNumber(RATIO) / 100, 1
                ), 0
            );

            if (!hexColorRegex.test(c1)) return '#000000';
            if (!hexColorRegex.test(c2)) return '#000000';

            let r1 = parseInt(c1.substring(1, 3), 16);
            let g1 = parseInt(c1.substring(3, 5), 16);
            let b1 = parseInt(c1.substring(5, 7), 16);
            let r2 = parseInt(c2.substring(1, 3), 16);
            let g2 = parseInt(c2.substring(3, 5), 16);
            let b2 = parseInt(c2.substring(5, 7), 16);
            let r = Math.round(r1 * (1 - ratio) + r2 * ratio);
            let g = Math.round(g1 * (1 - ratio) + g2 * ratio);
            let b = Math.round(b1 * (1 - ratio) + b2 * ratio);
            r = ('0' + (r || 0).toString(16)).slice(-2);
            g = ('0' + (g || 0).toString(16)).slice(-2);
            b = ('0' + (b || 0).toString(16)).slice(-2);
            return '#' + r + g + b;
        }

        findPartition({ VALUE, RANGE_START, RANGE_END, NUM_PARTITIONS }) {
            VALUE = Cast.toNumber(VALUE);
            RANGE_START = Cast.toNumber(RANGE_START) - 1;
            RANGE_END = Cast.toNumber(RANGE_END);
            NUM_PARTITIONS = Cast.toNumber(NUM_PARTITIONS);
            const partitionSize = (RANGE_END - RANGE_START) / NUM_PARTITIONS;
            const partitionIndex = Math.floor((VALUE - RANGE_START) / partitionSize + 0.5);
            return partitionIndex;
        }

        equalForOptions({ OPERAND1, OPERAND2 }, util) {
            const operand1 = String(OPERAND1).toLowerCase();
            const operand2 = String(OPERAND2).toLowerCase();
            if (operand1.length < 1) return false;
            if (operand2.length >= 1) return false;
            const { thread } = util;
            if (typeof thread.equalOptions === 'undefined') {
                return false;
            }
            const include = thread.equalOptions.includes(operand1);
            delete thread.equalOptions;
            return include;
        }

        equalOptions({ OPERAND1, OPERAND2 }, util) {
            const operand1 = String(OPERAND1).toLowerCase();
            const operand2 = String(OPERAND2).toLowerCase();
            const { thread } = util;
            if (typeof thread.equalOptions === 'undefined') {
                thread.equalOptions = [];
            }
            const equalOptions = thread.equalOptions;
            equalOptions.push(operand1, operand2);
            return '';
        }
    }

    Scratch.extensions.register(new Operation());
})(Scratch);
