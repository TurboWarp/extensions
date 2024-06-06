// Name: Formulas
// ID: formulas
// Description: Add extra math functions and stuff to Turbowarp!
// By: 26690 <https://scratch.mit.edu/users/26690/>

/*!
*MIT License

*Copyright (c) 2021-2023 TurboWarp Extensions Contributors

*Permission is hereby granted, free of charge, to any person obtaining a copy
*of this software and associated documentation files (the "Software"), to deal
*in the Software without restriction, including without limitation the rights
*to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
*copies of the Software, and to permit persons to whom the Software is
*furnished to do so, subject to the following conditions:

*The above copyright notice and this permission notice shall be included in all
*copies or substantial portions of the Software.

*THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
*IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
*FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
*AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
*LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
*OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
*SOFTWARE.
*/


(function (Scratch) {
    "use strict";
    //Variables for performance optimization or something
const pi = Math.PI;

//Actual extension
class Formulas {
    getInfo() {
      return {
        id: 'formulas',
        name: 'Formulas',
        color1: '#ff91ef', // light rose
        color2: '#ef88df', // rose
        color3: '#b064a5', // darker rose
        menuIconURI: 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxNS41NjQxNiIgaGVpZ2h0PSIxNS42OTY4OCIgdmlld0JveD0iMCwwLDE1LjU2NDE2LDE1LjY5Njg4Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjMyLjIxNzkyLC0xNzIuMTUxNTYpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlLXdpZHRoPSIwLjUiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMjMyLjQ2NzkyLDE4MGMwLC00LjE5NjUgMy4zNzIyMiwtNy41OTg0NCA3LjUzMjA4LC03LjU5ODQ0YzQuMTU5ODUsMCA3LjUzMjA4LDMuNDAxOTQgNy41MzIwOCw3LjU5ODQ0YzAsNC4xOTY1IC0zLjM3MjIyLDcuNTk4NDQgLTcuNTMyMDgsNy41OTg0NGMtNC4xNTk4NSwwIC03LjUzMjA4LC0zLjQwMTk0IC03LjUzMjA4LC03LjU5ODQ0eiIgZmlsbD0iI2ZmOTFlZiIgc3Ryb2tlPSIjZWY4OGRmIi8+PHBhdGggZD0iTTIzNS44NDMyOCwxODMuODU1NDljLTAuNDk3NzIsLTAuNTcwMzYgMC4xNjUyMywtMS4wOTQxMyAwLjE2NTIzLC0xLjA5NDEzYzAuNDY2NzMsLTAuNzk0NDQgMS4xNzE0OSwtMS4zMTM4OSAxLjk2NSwtMi4wMTk0OGMtMC4zNTI2MiwtMC40Mjk1OSAtMC42NjUxNywtMC45Njg2NSAtMS4wMDg4OCwtMS4xNjgyNGMtMC4zNjgxNSwtMC4yMTM3OCAtMC43Njc5OSwtMC4wNjA3NiAtMS4xNjMzLDAuMzI1NDZjMCwwIC0wLjU1NDU0LDAuNTE1MjkgLTEuMDY5ODQsLTAuMDM5MjNjLTAuNTE1MjksLTAuNTU0NTQgMC4wMzkyMywtMS4wNjk4NCAwLjAzOTIzLC0xLjA2OTg0YzAuODc5MTgsLTAuNzg5ODcgMS42MDIyNSwtMS4xODg2MyAyLjE4OTE2LC0xLjA5Njg4YzAuODMzNCwwLjEzMDI4IDEuNDIwMzksMS4wOTMzOCAyLjAzMjM5LDEuOTg2MThjMC41NDA5OCwtMC40NzMzMyAxLjA2MzkzLC0wLjk0NzU4IDEuNDk5NDQsLTEuNDM4NjVjMCwwIDAuNTA0OTUsLTAuNTYzOTkgMS4wNjg5NCwtMC4wNTkwNmMwLjU2Mzk5LDAuNTA0OTUgMC4wNTkwNiwxLjA2ODk0IDAuMDU5MDYsMS4wNjg5NGMtMC40ODUyNCwwLjUzNTc2IC0xLjEyNzYxLDEuMDgxMTEgLTEuNzc4NTQsMS42MzY0N2MwLjEzMTkzLDAuMTcwODEgMC4yNjc3NCwwLjMzNDA1IDAuNDA5MTgsMC40ODQ4YzAuMTk1NDMsMC4yMDgzIDAuMzk3MDMsMC44Nzk5OCAwLjc0MjI1LDAuOTQ4OTVjMC43NDQ0MywwLjE0ODczIDAuNjU1NzcsLTAuODAxOTcgMC42NTU3NywtMC44MDE5N2MwLDAgMC4wMTAxNiwtMC43NTY5MyAwLjc2NzA4LC0wLjc0Njc4YzAuNzU2OTQsMC4wMTAxNiAwLjc0Njc4LDAuNzY3MDggMC43NDY3OCwwLjc2NzA4bC0wLjA0MDUxLDAuNTM4MjdjLTAuMTE0NjQsMC4zMTg1NSAtMC4xMzAwNywwLjY5MzIyIC0wLjM0MzkyLDAuOTU1NjdjLTAuMzQ4ODgsMC40MjgxNCAtMC40Nzc5OSwwLjc5MzE0IC0wLjc4MTQyLDAuOTUzMTJjLTEuMzk2MjIsMC43MzYxOCAtMi41MzQ4MSwtMS4wODgzNyAtMy4yNzg2NSwtMS45MjU2Yy0wLjY0Njk1LDAuNTg3MjUgLTEuODA2MzQsMS44Njc1NCAtMS44MDYzNCwxLjg2NzU0YzAsMCAtMC41NzAzNiwwLjQ5NzcyIC0xLjA2ODA5LC0wLjA3MjY1eiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlPSJub25lIi8+PHBhdGggZD0iTTI0NS43MjE2NiwxNzguNDQ0NjljMC4xMTAzNywwLjQ4NzY3IC0wLjM3NzMsMC41OTgwNCAtMC4zNzczLDAuNTk4MDRsLTAuMTQ3ODcsMC4wMjgzMWMtMC44MzI2MywwLjA2NTMyIC0xLjI0NDU3LDAuMTIzODEgLTEuNzYzNTYsLTAuMDYyODJsLTAuMDIyMzYsMC4wOTA5NGwtMC41MDkwNCwtMC4xMjUxNmMtMC4xODI2NSwtMC4wNDA4NiAtMC4zMzQ3NSwtMC4xODMwOCAtMC4zNzg4MSwtMC4zNzc3NWMtMC4wNTYyMSwtMC4yNDgzNyAwLjA4MzA4LC0wLjQ5NTQgMC4zMTYzMSwtMC41ODAxNWwwLjQyMjcsLTAuMTYxMjZjMC40OTYyOSwtMC42Nzk3MSAxLjI0ODY4LC0xLjYwNjU2IDEuMDQyNDcsLTEuNjY2MDljLTAuMDk3ODksLTAuMDI4MjYgLTAuNjgwMTEsMC4wNzI5NSAtMS4xMDk3NiwwLjYxMTM5YzAsMCAtMC4zMTE4NSwwLjM5MDgzIC0wLjcwMjY4LDAuMDc4OTdjLTAuMzkwODMsLTAuMzExODYgLTAuMDc4OTcsLTAuNzAyNjggLTAuMDc4OTcsLTAuNzAyNjhjMC42ODA5NSwtMC44NTMzOSAyLjM1MTQ3LC0xLjgyMTg2IDIuOTI3MjMsLTAuMTM0OTdjMC4yNzQ5OSwwLjgwNTY4IC0wLjM1NTMyLDEuNDg1NyAtMC45Mzc0NCwyLjA2MDUyYzAuMjQ5NCwtMC4wMTM4IDAuNTA2OTIsLTAuMDEwNTUgMC43MTMzMywtMC4wMjc2N2wwLjAwNzcxLC0wLjAwNjljMCwwIDAuNDg3NjcsLTAuMTEwMzcgMC41OTgwNCwwLjM3NzN6IiBmaWxsPSIjZmZmZmZmIiBzdHJva2U9Im5vbmUiLz48L2c+PC9nPjwvc3ZnPjwhLS1yb3RhdGlvbkNlbnRlcjo3Ljc4MjA4MDAwMDAwMDAwODo3Ljg0ODQ0MDAwMDAwMDAxMS0tPg==',
        
        blocks: [
          {
            opcode: 'pythag',
            blockType: Scratch.BlockType.REPORTER,
            text: 'hypotenuse of a right angle triangle with legs:[A][B]',
            arguments: {
                A: {
                    type: Scratch.ArgumentType.NUMBER,
                },
                
                B: {
                    type: Scratch.ArgumentType.NUMBER,
                },
            }
          },
          {
            opcode: 'pythagleg',
            blockType: Scratch.BlockType.REPORTER,
            text: 'leg of a right angle triangle with hypotenuse:[A]other leg:[B]',
            arguments: {
                A: {
                    type: Scratch.ArgumentType.NUMBER,
                },
                
                B: {
                    type: Scratch.ArgumentType.NUMBER,
                },
            }
          },
          {
            opcode: 'is_right_tri',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'is triangle with hypotenuse:[A]and legs:[B][C]a right triangle?',
            arguments: {
                A: {
                    type: Scratch.ArgumentType.NUMBER,
                },
                B: {
                    type: Scratch.ArgumentType.NUMBER,
                },
                C: {
                    type: Scratch.ArgumentType.NUMBER,
                },
            }
          },
          '---',
          {
            opcode: 'dist',
            blockType: Scratch.BlockType.REPORTER,
            text: 'distance between points: [X][Y] and [A][B]',
            arguments: {
                A: {
                    type: Scratch.ArgumentType.NUMBER,
                },
                
                B: {
                    type: Scratch.ArgumentType.NUMBER,
                },
                X: {
                    type: Scratch.ArgumentType.NUMBER,
                },
                
                Y: {
                    type: Scratch.ArgumentType.NUMBER,
                },
            }
          },
          {
            opcode: 'midpoint',
            blockType: Scratch.BlockType.REPORTER,
            text: 'midpoint [ANS] between points: [X][Y] and [A][B]',
            arguments: {
                A: {
                    type: Scratch.ArgumentType.NUMBER,
                },
                
                B: {
                    type: Scratch.ArgumentType.NUMBER,
                },
                X: {
                    type: Scratch.ArgumentType.NUMBER,
                },
                
                Y: {
                    type: Scratch.ArgumentType.NUMBER,
                },
                ANS: {
                    type: Scratch.ArgumentType.STRING,
                    menu: 'AXIS',
                },
            }
          },
          '---',
          {
            opcode: 'area_rect',
            blockType: Scratch.BlockType.REPORTER,
            text: 'area of a rectangle with width:[W] and height[H]',
            arguments: {
                W: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: '7',
                },
                H: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: '12',
                },
            }
          },
          {
            opcode: 'area_squ',
            blockType: Scratch.BlockType.REPORTER,
            text: 'area of a square with side length:[S]',
            arguments: {
                S: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: '3',
                },
            }
          },
          {
            opcode: 'area_tri',
            blockType: Scratch.BlockType.REPORTER,
            text: 'area of a triangle with a base of:[B] and a height:[H]',
            arguments: {
                B: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: '6',
                },
                H: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: '4',
                },
            }
          },
          {
            opcode: 'area_para',
            blockType: Scratch.BlockType.REPORTER,
            text: 'area of a parallelogram with a base of:[B] and a height:[H]',
            hideFromPalette: true,
            arguments: {
                B: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: '4',
                },
                H: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: '13',
                },
            }
          },
          '---',
          {
            opcode: 'perm_rect',
            blockType: Scratch.BlockType.REPORTER,
            text: 'perimeter of a rectangle with width:[W] and height[H]',
            arguments: {
                W: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: '7',
                },
                H: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: '12',
                },
            }
          },
          {
            opcode: 'perm_squ',
            blockType: Scratch.BlockType.REPORTER,
            text: 'perimeter of a square with side length:[S]',
            arguments: {
                S: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: '3',
                },
            }
          },
          {
            opcode: 'perm_tri',
            blockType: Scratch.BlockType.REPORTER,
            text: 'perimeter of a triangle with sides:[A][B][C]',
            arguments: {
                A: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: '2',
                },
                B: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: '9',
                },
                C: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: '1',
                },
            }
          },
          {
            opcode: 'perm_para',
            blockType: Scratch.BlockType.REPORTER,
            text: 'perimeter of a parallelogram with side length:[S] and height[H]',
            hideFromPalette: true,
            arguments: {
                S: {type: Scratch.ArgumentType.NUMBER, defaultValue: '11'},
                H: {type: Scratch.ArgumentType.NUMBER, defaultValue: '5'},
            }
          },
          '---',
          {
            opcode: 'circum',
            blockType: Scratch.BlockType.REPORTER,
            text: 'find the circumference of a circle with the [ANS] of [A]',
            arguments: {
                ANS: {
                    type: Scratch.ArgumentType.STRING,
                    menu: 'CIRCUM'
                },
                A: {
                    type: Scratch.ArgumentType.NUMBER,
                },
            }
          },
          {
            opcode: 'area_cir',
            blockType: Scratch.BlockType.REPORTER,
            text: 'find the area of a circle with a radius of [A]',
            arguments: {
                A: {
                    type: Scratch.ArgumentType.NUMBER,
                },
            }
          },
          {
            opcode: 'radius_dia',
            blockType: Scratch.BlockType.REPORTER,
            text: 'find the [A] when [B] is: [X]',
            arguments: {
                A: {
                    type: Scratch.ArgumentType.STRING,
                    menu: 'CIRCUM',
                    defaultValue: 'radius',
                },
                B: {
                    type: Scratch.ArgumentType.STRING,
                    menu: 'CIRCUM',
                    defaultValue: 'diameter',
                },
                X: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: '4',
                },
            }
          },
          '---',
          {
            opcode: 'pi',
            blockType: Scratch.BlockType.REPORTER,
            text: 'pi',
          },
          {
            opcode: 'round_near',
            blockType: Scratch.BlockType.REPORTER,
            text: 'round [A] to the nearest [B]',
            arguments: {
                A: {
                    type: Scratch.ArgumentType.NUMBER,
                    defaultValue: '3.14159',
                },
                B: {
                    type: Scratch.ArgumentType.STRING,
                    menu: 'TEN_PWRS',
                    defaultValue: 'hundredths',
                    
                },
            }
          },
          '---',
          {
            opcode: 'slope',
            blockType: Scratch.BlockType.REPORTER,
            text: 'slope of [X][Y] and [A][B]',
            arguments: {
                X: {type: Scratch.ArgumentType.NUMBER},
                Y: {type: Scratch.ArgumentType.NUMBER},
                A: {type: Scratch.ArgumentType.NUMBER},
                B: {type: Scratch.ArgumentType.NUMBER},
            }
          },
          // this is the end of the blocks section. PS: delete later
        ],
        menus: {
            CIRCUM: {
                acceptReporters: true,
                items: ['radius', 'diameter']
            },
            AXIS: {
                acceptReporters: false,
                items: ['x', 'y']
            },
            TEN_PWRS: {
                acceptReporters: false,
                items: ['trillions', 'billions', 'millions', 'thousands', 'hundreds', 'tens', 'ones', 'tenths', 'hundredths', 'thousandths', 'millionths', 'billionths', 'trillionths',]
            },
        }
      };
    }

    pythag({ A, B }) {
        A = Scratch.Cast.toNumber(A);
        B = Scratch.Cast.toNumber(B);
        return Math.sqrt((A * A) + (B * B));
    }
    pythagleg({ A, B }) {
        A = Scratch.Cast.toNumber(A);
        B = Scratch.Cast.toNumber(B);
        return Math.sqrt((A * A) - (B * B));
    }
    dist({ A, B, X, Y }) {
        A = Scratch.Cast.toNumber(A);
        B = Scratch.Cast.toNumber(B);
        return Math.abs(Math.sqrt(((X - A) * (X - A)) + ((Y - B) * (Y - B))));
    }
    midpoint({ANS, X, Y, A, B}) {
        A = Scratch.Cast.toNumber(A);
        B = Scratch.Cast.toNumber(B);
        X = Scratch.Cast.toNumber(X);
        Y = Scratch.Cast.toNumber(Y);
        if (ANS == 'x') {
            return (X + A) / 2;
        } else if (ANS == 'y') {
            return (Y + B) / 2;
        }
    }
    is_right_tri({A, B, C}) {
        A = Scratch.Cast.toNumber(A);
        B = Scratch.Cast.toNumber(B);
        C = Scratch.Cast.toNumber(C);
        if (((B * B) + (C * C)) == (A * A)) {
            return true;
        } else {
            return false;
        }
    }
    area_rect({W, H}) {
        H = Scratch.Cast.toNumber(H);
        W = Scratch.Cast.toNumber(W);
        return W * H;
    }
    perm_rect({W, H}) {
        H = Scratch.Cast.toNumber(H);
        W = Scratch.Cast.toNumber(W);
        return (W + H) * 2;
    }
    area_squ({S}) {;
        S = Scratch.Cast.toNumber(S);
        return S * S;
    }
    perm_squ({S}) {
        S = Scratch.Cast.toNumber(S);
        return S * 4;
    }
    area_tri({B, H}) {
        H = Scratch.Cast.toNumber(H);
        B = Scratch.Cast.toNumber(B);
        return (B * H) / 2;
    }
    perm_tri({A, B, C}) {
        A = Scratch.Cast.toNumber(A);
        B = Scratch.Cast.toNumber(B);
        C = Scratch.Cast.toNumber(C);
        return A + B + C;
    }
    area_para({B, H}) {
        H = Scratch.Cast.toNumber(H);
        B = Scratch.Cast.toNumber(B);
        return B * H;
    }
    perm_para({S, H}) {
        H = Scratch.Cast.toNumber(H);
        S = Scratch.Cast.toNumber(S);
        return (S + H) * 2;
    }
    circum({ANS, A}) {
        A = Scratch.Cast.toNumber(A);
        if (ANS == 'radius') {
            return pi * (A * 2);
        } else {
            return pi * A;
        }
    }
    radius_dia({A, B, X}) {
        X = Scratch.Cast.toNumber(X);
        if (A == 'radius') {
            if (B == 'radius') {
                return X;
            } else {
                return X / 2;
            }
        } else {
            if (B == 'radius') {
                return X * 2;
            } else {
                return X;
            }
        }
    }
    area_cir({A}) {
        A = Scratch.Cast.toNumber(A);
        return A * A * pi;
    }
    round_near({A, B}) {
        A = Scratch.Cast.toNumber(A);
        if (B == 'trillions') {
            return Math.round(A / 100000000000) * 100000000000;
        } else if (B == 'billions') {
            return Math.round(A / 1000000000) * 1000000000;
        } else if (B == 'millions') {
            return Math.round(A / 1000000) * 1000000;
        } else if (B == 'thousands') {
            return Math.round(A / 1000) * 1000;
        } else if (B == 'hundreds') {
            return Math.round(A / 100) * 100;
        } else if (B == 'tens') {
            return Math.round(A / 10) * 10;
        } else if (B == 'ones') {
            return Math.round(A);
        } else if (B == 'tenths') {
            return Math.round(A * 10) / 10;
        } else if (B == 'hundredths') {
            return Math.round(A * 100) / 100;
        } else if (B == 'thousandths') {
            return Math.round(A * 1000) / 1000;
        } else if (B == 'millionths') {
            return Math.round(A * 1000000) / 1000000;
        } else if (B == 'billionths') {
            return Math.round(A * 1000000000) / 1000000000;
        } else if (B == 'trillionths') {
            return Math.round(A * 100000000000) / 100000000000;
        } else {
            return Math.round(A);
        }
    }
    pi() {
        return pi;
    }
    slope({A, B, X, Y}) {
        A = Scratch.Cast.toNumber(A);
        B = Scratch.Cast.toNumber(B);
        X = Scratch.Cast.toNumber(X);
        Y = Scratch.Cast.toNumber(Y);
        if (X == A) {
            return 'undefined';
        } else {
            return ((Y - B) / (X - A));
        }
    } 
  }
  
  Scratch.extensions.register(new Formulas());
})(Scratch);
