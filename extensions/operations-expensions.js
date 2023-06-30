/*!
 * Copyright 2023 SamuelLouf
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/*
 * Created by SamuelLouf (https://scratch.mit.edu/users/samuellouf/)
 * Based on PenguinMod's "Operators Expansion" extension.
 * https://studio.penguinmod.site/editor.html
 */

(function (Scratch) {
  'use strict';

  const occurrences = (string, subString, allowOverlapping) => {

    string += "";
    subString += "";
    if (subString.length <= 0) return (string.length + 1);

    var n = 0,
        pos = 0,
        step = allowOverlapping ? 1 : subString.length;

    while (true) {
        pos = string.indexOf(subString, pos);
        if (pos >= 0) {
            ++n;
            pos += step;
        } else break;
    }
    return n;
  }

  function itemOfFromString (args) {
    var input1 = (args.INPUTA - 1);
    var input2 = String(args.INPUTB);
    var input3 = args.INPUTC;
    var output = input2.split(input3)[input1] || '';
    return output;
  }

  const contains_a_letter_from = (STR1, STR2) => {
    var i = 0;
    var r = false;
    for (i in String(STR2)) {
      if (String(STR1).includes(String(STR2)[i])){
        r = true;
      }
    }
    return r;
  }

  const reduce = (numerator, denominator) => {
    let gcd = function gcd(a, b) {
        return b ? gcd(b, a % b) : a;
    };
    gcd = gcd(numerator, denominator);
    return [numerator / gcd, denominator / gcd];
  }

  const checkPrime = (number) => {
    number = Math.trunc(number);
    if (number <= 1) return false;
    for (var i = 2; i < number; i++) {
        if (number % i === 0) {
            return false;
        }
    }
    return true;
  }

  function generateJoin(amount) {
    const joinWords = [
        'apple',
        'banana',
        'pear',
        'orange',
        'mango',
        'strawberry',
        'pineapple',
        'grape',
        'kiwi'
    ]

    const argumentTextArray = [];
    const argumentss = {};

    for (let i = 0; i < amount; i++) {
        argumentTextArray.push('[STRING' + (i + 1) + ']');
        argumentss['STRING' + (i + 1)] = {
            type: Scratch.ArgumentType.STRING,
            defaultValue: joinWords[i] + ((i === (amount - 1)) ? '' : ' ')
        }
    }

    return {
        opcode: 'join' + amount,
        text: 'join ' + argumentTextArray.join(' and '),
        blockType: Scratch.BlockType.REPORTER,
        disableMonitor: true,
        arguments: argumentss
    }
  }

  class OperatorsExpansionExtension {
    getInfo() {
      return {
        id: 'penguinmodoperatorsexpansion',
        name: 'Operators Expansion',
        color1: '#59C059',
        color2: '#389438',
        blocks: [
          {
            opcode: 'random_boolean',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'random'
          },
          "---",
          {
            opcode: 'nand',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[INPUT1] nand [INPUT2]',
            arguments: {
              INPUT1: {
                type: Scratch.ArgumentType.BOOLEAN
              },
              INPUT2: {
                type: Scratch.ArgumentType.BOOLEAN
              }
            }
          },
          {
            opcode: 'nor',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[INPUT1] nor [INPUT2]',
            arguments: {
              INPUT1: {
                type: Scratch.ArgumentType.BOOLEAN
              },
              INPUT2: {
                type: Scratch.ArgumentType.BOOLEAN
              }
            }
          },
          {
            opcode: 'xor',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[INPUT1] xor [INPUT2]',
            arguments: {
              INPUT1: {
                type: Scratch.ArgumentType.BOOLEAN
              },
              INPUT2: {
                type: Scratch.ArgumentType.BOOLEAN
              }
            }
          },
          {
            opcode: 'xnor',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[INPUT1] xnor [INPUT2]',
            arguments: {
              INPUT1: {
                type: Scratch.ArgumentType.BOOLEAN
              },
              INPUT2: {
                type: Scratch.ArgumentType.BOOLEAN
              }
            }
          },
          "---",
          {
            opcode: 'amount_of_times_appears',
            blockType: Scratch.BlockType.REPORTER,
            text: 'amount of times [STR1] appears in [STR2]',
            arguments: {
              STR1: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'a'
              },
              STR2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'abc abc abc'
              }
            }
          },
          {
            opcode: 'read_line',
            blockType: Scratch.BlockType.REPORTER,
            text: 'read line [LINE] in [TEXT]',
            arguments: {
              LINE: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '1'
              },
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Text with multiple lines here'
              }
            }
          },
          {
            opcode: 'includes_a_letter_from',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[STR1] includes a letter from [STR2]?',
            arguments: {
              STR1: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'abcdef'
              },
              STR2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'fgh'
              }
            }
          },
          "---",
          {
            opcode: "unicodeof",
            blockType: Scratch.BlockType.REPORTER,
            text: "character [STRING] to id",
            arguments: {
              STRING: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "a"
              }
            }
          },
          {
            opcode: "unicodefrom",
            blockType: Scratch.BlockType.REPORTER,
            text: "id [NUM] to character",
            arguments: {
              NUM: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 97
              }
            }
          },
          "---",
          {
            opcode: 'exactly_equals',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[STR1] exactly equals [STR2]?',
            arguments: {
              STR1: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'a'
              },
              STR2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'b'
              }
            }
          },
          "---",
          {
            opcode: 'part_of_ratio',
            blockType: Scratch.BlockType.REPORTER,
            text: '[PART] part of ratio [RATIO]?',
            arguments: {
              PART: {
                type: Scratch.ArgumentType.STRING,
                menu: 'part_of_ratio_menu',
                defaultValue: 'first'
              },
              RATIO: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '1:2'
              }
            }
          },
          {
              opcode: 'simplify_ratio',
              text: 'simplify ratio [RATIO]',
              blockType: Scratch.BlockType.REPORTER,
              disableMonitor: true,
              arguments: {
                  RATIO: {
                      type: Scratch.ArgumentType.STRING,
                      defaultValue: "2:4"
                  }
              }
          },
          "---",
          {
            opcode: 'is_multiple_of',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'is [NUM] a multiple of [MULTIPLE]?',
            arguments: {
              NUM: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '20'
              },
              MULTIPLE: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '10'
              }
            }
          },
          {
            opcode: 'is_even',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'is [NUM] even?',
            arguments: {
              NUM: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '4'
              }
            }
          },
          {
            opcode: 'is_an_integer',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'is [NUM] an integer?',
            arguments: {
              NUM: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '0.5'
              }
            }
          },
          {
            opcode: 'is_a_prime_number',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'is [NUM] a prime number?',
            arguments: {
              NUM: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '13'
              }
            }
          },
          {
            opcode: 'truncate',
            blockType: Scratch.BlockType.REPORTER,
            text: 'truncate number [NUM]',
            arguments: {
              NUM: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '2.5'
              }
            }
          },
          "---",
          {
            opcode: 'reverse_text',
            blockType: Scratch.BlockType.REPORTER,
            text: 'reverse [TEXT]',
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Hello!'
              }
            }
          },
          {
            opcode: 'shuffle_text',
            blockType: Scratch.BlockType.REPORTER,
            text: 'shuffle [TEXT]',
            arguments: {
              TEXT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Hello!'
              }
            }
          },
          "---",
          generateJoin(2),
          generateJoin(3),
          generateJoin(4),
          generateJoin(5),
          generateJoin(6),
          generateJoin(7),
          generateJoin(8),
          generateJoin(9),
          "---",
          {
            opcode: 'pi',
            text: 'π',
            blockType: Scratch.BlockType.REPORTER,
            disableMonitor: true
          },
          {
            opcode: 'euler',
            text: 'e',
            blockType: Scratch.BlockType.REPORTER,
            disableMonitor: true
          },
          {
            opcode: 'infinity',
            text: '∞',
            blockType: Scratch.BlockType.REPORTER,
            disableMonitor: true
          }
        ],
        menus: {
          part_of_ratio_menu: {
            acceptReporters: true,
            items: ['first', 'last']
          }
        }
      };
    }

    random_boolean () {
      return Math.random() < 0.5;
    }

    nand (args) {
      return !(args.INPUT1 && args.INPUT2);
    }

    nor (args) {
      return !(args.INPUT1 || args.INPUT2);
    }

    xor (args) {
      if (args.INPUT1 ^ args.INPUT2 == 1){return true} else {return false;}
    }

    xnor (args) {
      return args.INPUT1 === args.INPUT2;
    }

    amount_of_times_appears (args) {
      return occurrences(args.STR2, args.STR1);
    }

    read_line (args) {
      return itemOfFromString({INPUTA: args.LINE, INPUTB: args.TEXT, INPUTC: "\n"});
    }

    includes_a_letter_from (args) {
      return contains_a_letter_from(String(args.STR1), String(args.STR2));
    }

    unicodeof(args, util) {
      const chars = Array.from(args.STRING.toString());
      return chars.map((char) => char.charCodeAt(0)).join(" ");
    }

    unicodefrom(args, util) {
      return String.fromCharCode(Number(args.NUM) || 0);
    }

    exactly_equals (args) {
      return args.STR1 === args.STR2;
    }

    part_of_ratio (args) {
      if (args.PART == 'first'){
        var part = 0;
      } else {
        var part = 1;
      }
      var input2 = String(args.RATIO);
      var output = input2.split(":")[part] || '';
      return output;
    }

    simplify_ratio (args) {
      const ratio = Scratch.Cast.toString(args.RATIO);
      if (!ratio.includes(':')) return '';
      const split = ratio.split(':');
      const first = Scratch.Cast.toNumber(split[0]);
      const last = Scratch.Cast.toNumber(split[1]);
      const reduced = reduce(first, last);
      return Scratch.Cast.toNumber(reduced[0]) + ':' + Scratch.Cast.toNumber(reduced[1]);
    }

    is_multiple_of (args) {
      const num = Scratch.Cast.toNumber(args.NUM);
      const mult = Scratch.Cast.toNumber(args.MULTIPLE);
      return (num % mult) === 0;
    }

    is_even (args) {
      if (Number(String(args.NUM)[Number(String(args.NUM).length)-1])/2 == 0 || Number(String(args.NUM)[Number(String(args.NUM).length)-1])/2 == 2 || Number(String(args.NUM)[Number(String(args.NUM).length)-1])/2 == 4 || Number(String(args.NUM)[Number(String(args.NUM).length)-1])/2 == 6 || Number(String(args.NUM)[Number(String(args.NUM).length)-1])/2 == 8 ){
        return true;
      } else {
        return false;
      }
    }

    is_an_integer (args) {
      return Math.trunc(Number(args.NUM)) === Number(args.NUM);
    }

    is_a_prime_number (args) {
      return checkPrime(Number(args.NUM));
    }

    truncate (args) {
      return Math.trunc(Number(args.NUM));
    }

    reverse_text (args) {
      const text = Scratch.Cast.toString(args.TEXT);
      const split = text.split('');
      return split.reverse().join('');
    }

    shuffle_text (args) {
      const text = Scratch.Cast.toString(args.TEXT);
      const split = text.split('');
      const shuffled = split.sort(() => Math.random() - 0.5);
      return shuffled.join('');
    }

    // join
    join2(args) {
      return Scratch.Cast.toString(args.STRING1)
  + Scratch.Cast.toString(args.STRING2);
  }

    join3(args) {
      return Scratch.Cast.toString(args.STRING1)
  + Scratch.Cast.toString(args.STRING2)
          + Scratch.Cast.toString(args.STRING3);
  }

    join4(args) {
      return Scratch.Cast.toString(args.STRING1)
  + Scratch.Cast.toString(args.STRING2)
          + Scratch.Cast.toString(args.STRING3)
          + Scratch.Cast.toString(args.STRING4);
  }
  join5(args) {
      return Scratch.Cast.toString(args.STRING1)
          + Scratch.Cast.toString(args.STRING2)
          + Scratch.Cast.toString(args.STRING3)
          + Scratch.Cast.toString(args.STRING4)
          + Scratch.Cast.toString(args.STRING5);
  }
  join6(args) {
      return Scratch.Cast.toString(args.STRING1)
          + Scratch.Cast.toString(args.STRING2)
          + Scratch.Cast.toString(args.STRING3)
          + Scratch.Cast.toString(args.STRING4)
          + Scratch.Cast.toString(args.STRING5)
          + Scratch.Cast.toString(args.STRING6);
  }
  join7(args) {
      return Scratch.Cast.toString(args.STRING1)
          + Scratch.Cast.toString(args.STRING2)
          + Scratch.Cast.toString(args.STRING3)
          + Scratch.Cast.toString(args.STRING4)
          + Scratch.Cast.toString(args.STRING5)
          + Scratch.Cast.toString(args.STRING6)
          + Scratch.Cast.toString(args.STRING7);
  }
  join8(args) {
      return Scratch.Cast.toString(args.STRING1)
          + Scratch.Cast.toString(args.STRING2)
          + Scratch.Cast.toString(args.STRING3)
          + Scratch.Cast.toString(args.STRING4)
          + Scratch.Cast.toString(args.STRING5)
          + Scratch.Cast.toString(args.STRING6)
          + Scratch.Cast.toString(args.STRING7)
          + Scratch.Cast.toString(args.STRING8);
  }
  join9(args) {
      return Scratch.Cast.toString(args.STRING1)
          + Scratch.Cast.toString(args.STRING2)
          + Scratch.Cast.toString(args.STRING3)
          + Scratch.Cast.toString(args.STRING4)
          + Scratch.Cast.toString(args.STRING5)
          + Scratch.Cast.toString(args.STRING6)
          + Scratch.Cast.toString(args.STRING7)
          + Scratch.Cast.toString(args.STRING8)
          + Scratch.Cast.toString(args.STRING9);
  }

    pi() {
      return Math.PI;
    }
    euler() {
        return Math.E;
    }
    infinity() {
        return Infinity;
    }
  }
  Scratch.extensions.register(new OperatorsExpansionExtension());
})(Scratch);