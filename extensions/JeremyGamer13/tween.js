(function (Scratch) {
    'use strict';

    /*
    * extension thumbnail if needed
    * (thumbnail is created by JeremyGamer13
    * incase this info is required for licensing)
    * data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAlgAAAF0CAMAAADIPrc+AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAD5UExURQ+9jAuUbguUbQygdwygdg2rfw2pfQyccw60hQ6xgw65ifr8/P////7+/g61hrDc0Lff1G/AqX7Gsgyacs3p4TypilKzlwyYcQyXcA63hx+ceTWmhtTs5dzv6g2ofOTz7ur28g2mei2jgQ2keQyedUuwk4XJtpLPvprSwr7i2A67igyZcQ2jeYvMuaHVxlm2mxOXct3w6uv287Hd0M7p4ZPQvtXs5g2qfvL59wuWb/P5+HfDrZvTww2nfBmadQ68iyWffQ2vgvv9/IzMug+Wbw66ig64iEOsjguVbmi9pQ6zhGG5oA2tgA2ugeXz77/j2aLWxwyddMbm3TiKPaIAAAAJcEhZcwAADsMAAA7DAcdvqGQAAA9pSURBVHhe7d17txTFFYZxGRTB4A1FwUsMoIkBo4CKigJe0GjUaPz+HybTVU9fqruqL3PmkPTM8/tLqdp7Zq39rj5z5vTlKUmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJElS35lNin+WdneWMPU8zbK0g2eIUdY5NknLPEuCip5lozTfZKwqRkvLzIpVxWhpvvOkZpYLFEkTSMxslEljniMuXX+62Hief+p6gVKpiKy0XiRRHS+x1KJYKuh9an+ZKA1cYgNeoVzKIid4lRRlvcom0EDKSI5Xl0lQ0WtsDDxmqeh1QhKQnlFsDa7QROq5SkQqbxCdCW+yveIXWsojIBVyMwMFFdpICeJRGf3UnnqLkgqNpI4LpGOLzMxE0dYztJJahGNrwfGq8jZlW7SSGn8mG5vNOwRmtr9QuNlco5lUIxqbzXXiskD7hRbNJNwgGUs/YEWUbjbv0k6KCMZuueoki3ZS0Byw3iMpC71MuYcsJYjFrgcsD1nKag5YfyUni/2NBh6y1EEodj9gechSDpnYvE9KdvB3Whgs1W7eIhMnOGC1h6wP6Kpjdv4KcYjIyE5o4SHr6A3v9/EPMrKTD2lisI5Z/kpnIrIjmvgHw2NVuDPRFgnZEU08ZB2jF5h91kckZEfNV1m8lo7FNQZfQkB2RhuDdVReYeojyMfOaGOwjsdUqm7fIRsnQjODdSTG73V1+S6xODk6GqxjcI5hZ31MIvaErgbr4OXuSFT7hDTsEZ0N1oFL/1rTtecjVY3uBuuQFQ9Wb5KCU8ArGKzDVfot8FMicDp4EYN1qJhv3z3mf2p4HYN1kD5juj2nnqotXspgHaD8z8BT+A0wh1czWAeHwaYuMfZT9zkvaLAODGNNzLx/2l7wkgbrsDDUxP7+WjMHL7r5gnekA8BMu57kwarS3HOGt6T1Y6Jdi38LvF/dMob/3kl83S3elNaOeXYx67neo2wvwfLuyYeBcXZ8yaRnuUdRxD/uhBYesA4Cw+xY8DMwDVXAyg5oYLAOAaPsYMozUNDzNquLtbeL5L1ptRhkB0Oe9BX7M9ixGOXmavWYYwcjnpI8AWfgeXYtRbnBWrnmNh4NBjyBzSPYuBDF5mrdHjDFFvMd95DNoyaf+ZXT3CnSYK3YI2bYYryjvmZv3oX2R+vCxwdU2kcI8Ba1QoywxXTHjHxarx80yP9tUbMAhVuxl9ZncIUEsx1xn50Z3adX8k9b1M1G2RattDbfMMAGox1xnZ1D9KzxrxVKZ6KoQiutDONrTF4Y/y0bB27QsYulCuWzUFKhkdaF6TW+Y7JFX7Kxr/Ao1PMsV+gwAwUVnyq3Rp3HCQaPGWwR+/pol9O9ycNbdJnQeaScjxtfJYbXYLAld9nW8z3dCtgVzPsKns0BTbQi/bs7TpxznP924QeajWBnRLMRbIxooRVhdLWJWzpm/xiY+7Sewe5o4kv4f7ItooHWo//VFXMteMyurh/pNAMVNZpmsKFGudaDydWYawGbEldpNA9FjZfonGieb1KjWKtxhslh/HGCbOo6Q5/5hhdT/0R7DL/F8PfB1WFyNUabx56uz2izCLV9t9944zb/2Ueh1qJ3uBq9Xxp7uuiyHPUzUaTVYHA1EpQ1PNXqRFdhdb+En/AvSrQWvc86Y19d/cye1sxvF8pmRstYrQ6TqxGhnI/Z0ir8MXCZGdEyVqvTu4v2t2QoY3gCwyN6nBwNC9ikFWF0NTKUw44WHfbkaboO+EzxFfqB4WHkcMWOFh326Rdad+z0LYb+115nfCBDGZ+yozFx8sJJ3HwuuMn/an0ICUZuxcCOxq80kIZ6P3jIUAYbGmdpIGWQEpTvS9teIRot/5OgjgkxASHKYEODcinnV2ISfU2IhtjQoFzKSk/o+zcpGviNDbVrlEtZ5ASkaIj1BtVSVvoYuN6pda1LbKhRLeVdIygRKRpiveYVohpHUECKBj5ivUaxVEBQop+J0QDrNWqlEpISlU7o613C4NkFmvAuUYmI0QDLNWqlEpISlR6s1DuP4Ry1UglRiUrPAme5RqlURFQiYtR3h2V8Q6lU8j1ZichRH6s1SqWi9CkA5KiPVXhSsCaRleg3ctTT+9ROpVRGViJy1McqPI9B0whLRI76WAWF0gjCEpGjnvT041sUSmXJU5YeEqQeVkGhNOIGaQkKTwFgFRRKIwhLRI56vmM18lO7ZiAtEUHqYRHUSWNIS0SQelgEddIY0hIRpNQ9FiNPP9YcxCXIP2WJRVAmjblKXIKvSFKKRVAnjUlyRZB6WIweUCeN+YC8BAQpld5OlDJp1HSu0uu7KJNG/UheApKUYi3yMSKaZWGuqJLGkZfgOklKsRhRJY0jL0E2V+mpolRJ48hL8DtRSiQPLfF2opqHwATZXLEWeX2X5iEwwX2ilGAtokiaQGACc6V9ITABSUrcZy2iSJpAYAKilEhOkvFUUc1EYgKilLjMWuBDSzQTiQmIUiLJFTXSFBITEKUESxE10hQSExClBEsRNdIUEhMQpQRLwY/USFOITECUEiwFniSjuYhMQJQSLAXnqZGmEJmAKHXdZSkwV5qLyARkqSvJFSXSJCITkKWu31kKKJEmEZmALHWZK+3iJpEJyFJXcjEONdIUc6XT8A2RCchS122WKleokaaYK52GqcudWQk+oEaaYq50Gq6QmcptstTFUuDFOJrLXOk0EJngI7LUxVJwkxppCpEJzJX2hcgEucudWQookSYRmcBcaV+ITHCXLHWxFFAiTTlPZAJzpT1JckWUEiwF1EhTXiEyAVFKsBRQI02ZvLsoSwE10hQSExGlBEsBNdIUEhMRpQRLATXSFBITXCZKCdYCaqQJv5KYwFxpT66RmOAeUUqwFlAkTSAw0eTdRSmSJhCYiCQlkruLUiRNIDARUUqYKy2XXIyTzZWXO2u5swQm+JkoJcyVliMv0adEKXGdxYAqaRx5iUhSylxpOfISkaQUa4F3F9UszxKYiCSlWAvMlWYhL1HuYpw0V17urFnIS/QxSUqxGJgrzfGAvEQEqYfF4Cp10hjiAoKU+orFwFxpDuICkpT6jsWAMmnMM8Ql+oQkpViMqJPGkBYQpB4WI+qkMaQFBKmHxYg6aURyqujmO4LUw2pEoTSCsIAc9STPdr5BoTSCtIAg9TxkNXhAoVR2i7RELxOkHlYjCqURhAXkqI/ViEKpLP3Ubq60H2QF2VNFL178jeWISqnoM7ICctTHauSznTWJrNTIUR+r0feUSiXp9V2bO+Soj+WIUqmIqNSIUV9ykoy50pRzRAWFT+3pt6LmSlNISo0YDbAcvUutVPAuUcGXxKjvLusRtVIJSakRo4GfWY+olQoISi1/fdcW66BYyktPPy4frr5lPfIkGY0jKLVLxGjgJzZEfiuqUeSkQYqGWAfVUlbvPIbNb6Ro4N9siK5QLmWRkwYpGvqaDdGvlEs5xKRBiDLYAMqlnDPEpFY4/XjrEjuiM9RLGcntRCuEKIMN+IUG0lDy0JIKGcpILvDyx6BGfE9IGqXzGLbYgdfpoBXpf+bhn/eP/i0ylJF+1775gQ5ai6eZXM/TLO8TrVtkKIcdNTpoJXpXL6TOsWk/HtG19S0Zyugdrvb7TnTakmd25+zvEpgLdGzlbycasaVGD63DZKwq+4nWB3RrZR9agvSEPi/wWpdZsaqcfK5X6NR6SISy2FOjiVbhPFOb5QJFu6FJFwnK+pg98Lv2VWFqs1G2XO6XAxKUx54abbQKV5la158Y7Nbz/FPXeUqX6X89VuFF8t5jEzxcrQpTa73EWDteYqlF8Xy5+I7HysPVqqWPPCpea9U7r2DpZ/gfKet6TOcCdtU8oW9dGBveYqhZb7EJNJjhBhWJ1+ha8BHbarTSSiTfMlxmqEWvsTGYeczK/gjc/E7Hgt5XV5uzNNNKvM7gAoY6iq3BjB9Og5MXort0K2Fbg25aixcYXOU6Q51wme2Vb2hTwrY+OhU9Zl/tZN+b6X+AyVUY6gwUVGiTM/xjYFT85aCWPGWpQkOtB5OrvMpYZ3ibkgqN+rKf1isjJzBEd9jYoKNWpHNQYawzUbT1DK26WBqa8cOWnY2pH7b6f8Twtka/ZRjqHLNoVRv5U/Z9ikews+FXV6v0Z8a32bzDYGf7C4XJ7TjGzo/4isIxbG3RVyvD+DabN5nsAu3Xl6FV6ZN6NOv3Tfa2HoXOWp32ZDtGuwilm81/cn+s6Rg91arB5pZPWVotJrhbrjJRyGLzBDa3bvEetT7NAWvib3YlL1NeNrcx2zt4i1ojZrjrAWvqkDXn03rA/g7eoFapOWD9lQEv9j4NMtgxAwUdvD+tFGPc/YBVOmTdY3WG3q0YKrw7rRaD3HzIkHfwBy1aC0J18eKXFHXw3rReDxjlCQ5Y6SHrPf5tLsq6eGtaM2a5l2C9NuOPNanMz0BjdRiY5uYfjHonHz4s3n92zBu8dhdvSyvXPAqQWT85/XOOA96VVo+BPvFgpU+BA+9JB4CRlh9Ucxp614+Bd6SDwFCf4AHrE14x5Y1jDgxzfVLByv0WuPUZ70YHg8k+kWAVUuXPwEPEbE8/WINLbuDPwMPEeE85WG/yKgPP8TZ0aBjwKQard7+0Dq+QOGDM+JSClf8NMPKZlQeNKZ9CsMpHqi3von3oGPR+g3W3+JkqeJbX1gFj1nsL1p3bNCzxt8DjwLj3Eazxw1Rgqo4GEz9xsGgzxgsEjwlD3/xBQHb0OW2KXuD1dCSY+0kPWTTJ8+6OR+g/DP+0guVvgMeKACy539rQOzRJeaQ6ZoTgZIcsWrSu+Jnq2DVPDSAjO6FFcOsmnXXcyMNegkVLaS8/C2lgsNRBJhbffrTVfnSnpbRFKHY/ZFFurpQgFZvN8wRlKcoNllLEYtdDFsXmSj3kYqebJnfvFEk7CQRjpz9Ft48upJlUIxlbpGUBCrdoJjWIxhZxmY2yLVpJLbJRITAzUVShldRBOCpEZhZKKjSSuroPWCU0M1BQyT1VTmpP+Nua+bed7mMwvUpCBSQk+JzojEpOc6eJNEBEIsIzgo0RLaQMQhJNPFkwvYaQBlIWMamRoQw21CiXCghK40WClHiRxQbFUtHwYc4/EScMn03o74Oa4Qvi0vf4Mf/R9wWF0jgCMxNF0qSrZGYGLx7UEjOjZay01IxoGSvthPwUsEla7iwhGvBmHzqhX4hSh+fHaG8eBfyPJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmSJEmStFpPPfVfkojW95ZrqUIAAAAASUVORK5CYII=
    */

    const EasingMethods = [
        "linear",
        "sine",
        "quad",
        "cubic",
        "quart",
        "quint",
        "expo",
        "circ",
        "back",
        "elastic",
        "bounce"
    ];

    const BlockType = Scratch.BlockType;
    const ArgumentType = Scratch.ArgumentType;
    const Cast = Scratch.Cast;

    class Tween {
        getInfo() {
            return {
                id: 'tweening',
                name: 'Tweening',
                blocks: [
                    {
                        opcode: 'tweenValue',
                        text: '[MODE] ease [DIRECTION] [START] to [END] by [AMOUNT]%',
                        disableMonitor: true,
                        blockType: BlockType.REPORTER,
                        arguments: {
                            MODE: { type: ArgumentType.STRING, menu: 'modes' },
                            DIRECTION: { type: ArgumentType.STRING, menu: 'direction' },
                            START: { type: ArgumentType.NUMBER, defaultValue: 0 },
                            END: { type: ArgumentType.NUMBER, defaultValue: 100 },
                            AMOUNT: { type: ArgumentType.NUMBER, defaultValue: 50 },
                        }
                    }
                ],
                menus: {
                    modes: {
                        acceptReporters: true,
                        items: EasingMethods.map(item => ({ text: item, value: item }))
                    },
                    direction: {
                        acceptReporters: true,
                        items: [
                            "in",
                            "out",
                            "in out"
                        ].map(item => ({ text: item, value: item }))
                    }
                }
            };
        }

        // utilities
        multiplierToNormalNumber(mul, start, end) {
            const multiplier = end - start;
            const result = (mul * multiplier) + start;
            return result;
        }

        // blocks
        tweenValue(args) {
            const easeMethod = Cast.toString(args.MODE);
            const easeDirection = Cast.toString(args.DIRECTION);

            const start = Cast.toNumber(args.START);
            const end = Cast.toNumber(args.END);

            // easing method does not exist, return starting number
            if (!EasingMethods.includes(easeMethod)) return start;
            // easing method is not implemented, return starting number
            if (!this[easeMethod]) return start;

            const progress = Cast.toNumber(args.AMOUNT) / 100;

            const tweened = this[easeMethod](progress, easeDirection);
            return this.multiplierToNormalNumber(tweened, start, end);
        }

        // easing functions (placed below blocks for organization)
        linear(x) {
            // lol
            return x;
        }

        sine(x, dir) {
            switch (dir) {
                case "in": {
                    return 1 - Math.cos((x * Math.PI) / 2);
                }
                case "out": {
                    return Math.sin((x * Math.PI) / 2);
                }
                case "in out": {
                    return -(Math.cos(Math.PI * x) - 1) / 2;
                }
                default:
                    return 0;
            }
        }

        quad(x, dir) {
            switch (dir) {
                case "in": {
                    return x * x;
                }
                case "out": {
                    return 1 - (1 - x) * (1 - x);
                }
                case "in out": {
                    return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
                }
                default:
                    return 0;
            }
        }

        cubic(x, dir) {
            switch (dir) {
                case "in": {
                    return x * x * x;
                }
                case "out": {
                    return 1 - Math.pow(1 - x, 3);
                }
                case "in out": {
                    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
                }
                default:
                    return 0;
            }
        }

        quart(x, dir) {
            switch (dir) {
                case "in": {
                    return x * x * x * x;
                }
                case "out": {
                    return 1 - Math.pow(1 - x, 4);
                }
                case "in out": {
                    return x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2;
                }
                default:
                    return 0;
            }
        }

        quint(x, dir) {
            switch (dir) {
                case "in": {
                    return x * x * x * x * x;
                }
                case "out": {
                    return 1 - Math.pow(1 - x, 5);
                }
                case "in out": {
                    return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
                }
                default:
                    return 0;
            }
        }

        expo(x, dir) {
            switch (dir) {
                case "in": {
                    return x === 0 ? 0 : Math.pow(2, 10 * x - 10);
                }
                case "out": {
                    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
                }
                case "in out": {
                    return x === 0
                        ? 0
                        : x === 1
                            ? 1
                            : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2
                                : (2 - Math.pow(2, -20 * x + 10)) / 2;
                }
                default:
                    return 0;
            }
        }

        circ(x, dir) {
            switch (dir) {
                case "in": {
                    return 1 - Math.sqrt(1 - Math.pow(x, 2));
                }
                case "out": {
                    return Math.sqrt(1 - Math.pow(x - 1, 2));
                }
                case "in out": {
                    return x < 0.5
                        ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2
                        : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2;
                }
                default:
                    return 0;
            }
        }

        back(x, dir) {
            switch (dir) {
                case "in": {
                    const c1 = 1.70158;
                    const c3 = c1 + 1;

                    return c3 * x * x * x - c1 * x * x;
                }
                case "out": {
                    const c1 = 1.70158;
                    const c3 = c1 + 1;

                    return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
                }
                case "in out": {
                    const c1 = 1.70158;
                    const c2 = c1 * 1.525;

                    return x < 0.5
                        ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
                        : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2;
                }
                default:
                    return 0;
            }
        }

        elastic(x, dir) {
            switch (dir) {
                case "in": {
                    const c4 = (2 * Math.PI) / 3;

                    return x === 0
                        ? 0
                        : x === 1
                            ? 1
                            : -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4);
                }
                case "out": {
                    const c4 = (2 * Math.PI) / 3;

                    return x === 0
                        ? 0
                        : x === 1
                            ? 1
                            : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1;
                }
                case "in out": {
                    const c5 = (2 * Math.PI) / 4.5;

                    return x === 0
                        ? 0
                        : x === 1
                            ? 1
                            : x < 0.5
                                ? -(Math.pow(2, 20 * x - 10) * Math.sin((20 * x - 11.125) * c5)) / 2
                                : (Math.pow(2, -20 * x + 10) * Math.sin((20 * x - 11.125) * c5)) / 2 + 1;
                }
                default:
                    return 0;
            }
        }

        bounce(x, dir) {
            switch (dir) {
                case "in": {
                    return 1 - this.bounce(1 - x, "out");
                }
                case "out": {
                    const n1 = 7.5625;
                    const d1 = 2.75;

                    if (x < 1 / d1) {
                        return n1 * x * x;
                    } else if (x < 2 / d1) {
                        return n1 * (x -= 1.5 / d1) * x + 0.75;
                    } else if (x < 2.5 / d1) {
                        return n1 * (x -= 2.25 / d1) * x + 0.9375;
                    } else {
                        return n1 * (x -= 2.625 / d1) * x + 0.984375;
                    }
                }
                case "in out": {
                    return x < 0.5
                        ? (1 - this.bounce(1 - 2 * x, "out")) / 2
                        : (1 + this.bounce(2 * x - 1, "out")) / 2;
                }
                default:
                    return 0;
            }
        }
    }

    Scratch.extensions.register(new Tween());
})(Scratch);
