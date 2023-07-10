(function(Scratch) {
    'use strict';
    var identifyblock = 'path[class^="blocklyPath blocklyBlockBackground"]';
    var count = 0;
    var template = 'M 51.93 -15.1534 C 51.9512 -15.2702 52 -15.377 52 -15.5 V -27.5618 C 53.24 -29.2272 54 -31.2688 54 -33.5 C 54 -36.278 52.8576 -38.791 51.0224 -40.605 C 48.9764 -45.8046 43.9164 -49.5 38 -49.5 H 30 C 22.2812 -49.5 16 -43.2198 16 -35.5 H 14 C 10.6914 -35.5 8 -32.8086 8 -29.5 V -13.5 C 8 -10.1914 10.6914 -7.5 14 -7.5 H 16.2022 C 17.1316 -2.9414 21.1712 0.5 26 0.5 H 34 C 35.5422 0.5 36.936 -0.101 38 -1.0606 C 38.0342 -1.0298 38.0716 -1.0028 38.1064 -0.9728 C 38.342 -0.1304 39.0818 0.5 40 0.5 H 50 C 53.3086 0.5 56 -2.1914 56 -5.5 V -9.5 C 56 -12.1296 54.289 -14.3448 51.93 -15.1534 Z M 16 -11.5 H 14 C 12.8964 -11.5 12 -12.3974 12 -13.5 V -29.5 C 12 -30.6026 12.8964 -31.5 14 -31.5 H 16 V -11.5 Z M 50 -33.5 C 50 -30.1914 47.3086 -27.5 44 -27.5 H 36 C 32.6914 -27.5 30 -30.1914 30 -33.5 S 32.6914 -39.5 36 -39.5 H 44 C 47.3086 -39.5 50 -36.8086 50 -33.5 Z M 52 -5.5 C 52 -4.3974 51.1036 -3.5 50 -3.5 H 42 C 40.8964 -3.5 40 -4.3974 40 -5.5 V -9.5 C 40 -12.8086 37.3086 -15.5 34 -15.5 H 32 C 30.8946 -15.5 30 -14.6044 30 -13.5 S 30.8946 -11.5 32 -11.5 H 34 C 35.1036 -11.5 36 -10.6026 36 -9.5 V -5.5 C 36 -4.3974 35.1036 -3.5 34 -3.5 H 26 C 22.6914 -3.5 20 -6.1914 20 -9.5 V -33.5 V -35.5 C 20 -41.0136 24.4864 -45.5 30 -45.5 H 38 C 40.2386 -45.5 42.2978 -44.749 43.9648 -43.5 H 36 C 30.4864 -43.5 26 -39.0136 26 -33.5 S 30.4864 -23.5 36 -23.5 H 44 C 45.4236 -23.5 46.7728 -23.809 48 -24.3476 V -15.5 H 46 C 44.8946 -15.5 44 -14.6044 44 -13.5 S 44.8946 -11.5 46 -11.5 H 50 C 51.1036 -11.5 52 -10.6026 52 -9.5 V -5.5 Z M 44 -35.5 C 44 -36.6046 44.8954 -37.5 46 -37.5 S 48 -36.6046 48 -35.5 C 48 -34.3956 47.1046 -33.5 46 -33.5 S 44 -34.3956 44 -35.5 Z M 36 -37.5 H 40 C 41.1054 -37.5 42 -36.6044 42 -35.5 S 41.1054 -33.5 40 -33.5 H 36 C 34.8946 -33.5 34 -34.3956 34 -35.5 S 34.8946 -37.5 36 -37.5 Z Z M 0 0';

    function applythefunny() {
        if (document.querySelectorAll(identifyblock).item(count) !== null) {
            if (document.querySelectorAll(identifyblock).item(count).outerHTML.includes(template) == false) {
                document.querySelectorAll(identifyblock).item(count).outerHTML = document.querySelectorAll(identifyblock).item(count).outerHTML.slice(0, 101) + template + document.querySelectorAll(identifyblock).item(count).outerHTML.slice(101, 99999);
            }
            count = count + 1;
            setTimeout(function() {
                applythefunny();
            }, 0);
        } else {
            setTimeout(function() {
                count = 0;
                applythefunny();
            }, 0);

        }
    }

    applythefunny();

    class theamongus {

        getInfo() {
            return {
                id: 'amogus',
                name: 'SussyBlocks',
                blocks: [{}]
            };
        }
    }

    Scratch.extensions.register(new theamongus());
// @ts-ignore
})(Scratch);
