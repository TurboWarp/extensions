(function(Scratch){
  'use strict';

  /**
   * @param {unknown} x
   * @returns {bigint}
   */
  const bi = x => {
    if (typeof x === 'string') {
      // try to parse 8n
      if (x.charAt(x.length - 1) === 'n') {
        try {
          return BigInt(x.slice(0, -1));
        } catch (e) {
          // ignore
        }
      }
      // Must remove decimal using string operations. Math.trunc will convert to float
      // which ruins the point of using bigints. 
      const decimalIndex = x.indexOf('.');
      const withoutDecimal = decimalIndex === -1 ? x : x.substring(0, decimalIndex);
      try {
        return BigInt(withoutDecimal);
      } catch (e) {
        return 0n;
      }
    }
    try {
      // Here we can use Math.trunc because it's a boolean or number.
      // @ts-expect-error
      return BigInt(Math.trunc(x));
    } catch (e) {
      return 0n;
    }
  };

  const makeLabel = (text) => ({
    blockType: 'label',
    text: text
  });

  class BigIntExtension {
    getInfo() {
      return {
        id: 'skyhigh173BigInt',
        name: 'BigInt',
        color1: '#59C093',
        blocks: [
          {
            opcode: 'bigint_from',
            blockType: Scratch.BlockType.REPORTER,
            text: 'To BigInt [text]',
            arguments: {
              text: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ''
              }
            }
          },
          {
            opcode: 'bigint_as',
            blockType: Scratch.BlockType.REPORTER,
            text: 'As BigInt [text]',
            arguments: {
              text: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ''
              }
            }
          },
          {
            opcode: 'bigint_to',
            blockType: Scratch.BlockType.REPORTER,
            text: 'To Number [text]',
            arguments: {
              text: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ''
              }
            }
          },
          makeLabel('Arithmetic'),
          {
            opcode: 'bigint_add',
            blockType: Scratch.BlockType.REPORTER,
            text: '[a] + [b]',
            arguments: {
              a: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ''
              },
              b: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ''
              }
            }
          },
          {
            opcode: 'bigint_sub',
            blockType: Scratch.BlockType.REPORTER,
            text: '[a] - [b]',
            arguments: {
              a: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ''
              },
              b: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ''
              }
            }
          },
          {
            opcode: 'bigint_mul',
            blockType: Scratch.BlockType.REPORTER,
            text: '[a] * [b]',
            arguments: {
              a: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ''
              },
              b: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ''
              }
            }
          },
          {
            opcode: 'bigint_div',
            blockType: Scratch.BlockType.REPORTER,
            text: '[a] / [b]',
            arguments: {
              a: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ''
              },
              b: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ''
              }
            }
          },
          {
            opcode: 'bigint_pow',
            blockType: Scratch.BlockType.REPORTER,
            text: '[a] ** [b]',
            arguments: {
              a: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ''
              },
              b: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ''
              }
            }
          },
          {
            opcode: 'bigint_mod',
            blockType: Scratch.BlockType.REPORTER,
            text: '[a] mod [b]',
            arguments: {
              a: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ''
              },
              b: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ''
              }
            }
          },
          {
            opcode: 'bigint_select',
            blockType: Scratch.BlockType.REPORTER,
            text: '[a] [sel] [b]',
            arguments: {
              a: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ''
              },
              b: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ''
              },
              sel: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '+',
                menu: 'op'
              }
            }
          },
          makeLabel('Logic'),
          {
            opcode: 'bigint_lt',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[a] < [b]',
            arguments: {
              a: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ''
              },
              b: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ''
              }
            }
          },
          {
            opcode: 'bigint_le',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[a] ≤ [b]',
            arguments: {
              a: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ''
              },
              b: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ''
              }
            }
          },
          {
            opcode: 'bigint_eq',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[a] = [b]',
            arguments: {
              a: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ''
              },
              b: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ''
              }
            }
          },
          {
            opcode: 'bigint_neq',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[a] ≠ [b]',
            arguments: {
              a: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ''
              },
              b: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ''
              }
            }
          },
          {
            opcode: 'bigint_ge',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[a] ≥ [b]',
            arguments: {
              a: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ''
              },
              b: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ''
              }
            }
          },
          {
            opcode: 'bigint_gt',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[a] > [b]',
            arguments: {
              a: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ''
              },
              b: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ''
              }
            }
          },
          makeLabel('Bitwise'),
          {
            opcode: 'bigint_and',
            blockType: Scratch.BlockType.REPORTER,
            text: '[a] & [b]',
            arguments: {
              a: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ''
              },
              b: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ''
              }
            }
          },
          {
            opcode: 'bigint_or',
            blockType: Scratch.BlockType.REPORTER,
            text: '[a] | [b]',
            arguments: {
              a: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ''
              },
              b: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ''
              }
            }
          },
          {
            opcode: 'bigint_xor',
            blockType: Scratch.BlockType.REPORTER,
            text: '[a] ^ [b]',
            arguments: {
              a: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ''
              },
              b: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ''
              }
            }
          },
          {
            opcode: 'bigint_ls',
            blockType: Scratch.BlockType.REPORTER,
            text: '[a] << [b]',
            arguments: {
              a: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ''
              },
              b: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ''
              }
            }
          },
          {
            opcode: 'bigint_rs',
            blockType: Scratch.BlockType.REPORTER,
            text: '[a] >> [b]',
            arguments: {
              a: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ''
              },
              b: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ''
              }
            }
          },
          {
            opcode: 'bigint_not',
            blockType: Scratch.BlockType.REPORTER,
            text: '~ [a]',
            arguments: {
              a: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: ''
              },
            }
          },
        ],
        menus: {
          op: {
            items: ['+','-','*','/','%','^'],
            acceptReporters: true
          }
        }
      };
    }
    bigint_from({ text }) {
      return bi(text);
    }
    bigint_as({ text }) {
      return bi(text) + 'n';
    }
    bigint_to({ text }) {
      return Number(bi(text));
    }
    bigint_add({ a, b }) {
      return (bi(a) + bi(b)).toString();
    }
    bigint_sub({ a, b }) {
      return (bi(a) - bi(b)).toString();
    }
    bigint_mul({ a, b }) {
      return (bi(a) * bi(b)).toString();
    }
    bigint_div({ a, b }) {
      if (Number(b) == 0) return 'NaN';
      return (bi(a) / bi(b)).toString();
    }
    bigint_pow({ a, b }) {
      return (bi(a) ** bi(b)).toString();
    }
    bigint_mod({ a, b }) {
      if (Number(b) == 0) return 'NaN';
      return (bi(a) % bi(b)).toString();
    }

    bigint_and({ a, b }) {
      return (bi(a) & bi(b)).toString();
    }
    bigint_or({ a, b }) {
      return (bi(a) | bi(b)).toString();
    }
    bigint_xor({ a, b }) {
      return (bi(a) ^ bi(b)).toString();
    }
    bigint_ls({ a, b }) {
      return (bi(a) << bi(b)).toString();
    }
    bigint_rs({ a, b }) {
      return (bi(a) >> bi(b)).toString();
    }
    bigint_not({ a }) {
      return (~bi(a)).toString();
    }

    bigint_select({ a, sel, b }) {
      switch (sel) {
      case '+': return (bi(a) + bi(b)).toString();
      case '-': return (bi(a) - bi(b)).toString();
      case '*': return (bi(a) * bi(b)).toString();
      case '/': if (Number(b) == 0) { return 'NaN'; } return (bi(a) / bi(b)).toString();
      case '%': if (Number(b) == 0) { return 'NaN'; } return (bi(a) % bi(b)).toString();
      case '^': case '**': return (bi(a) ** bi(b)).toString();
      default: return 0;
      }
    }

    bigint_lt({ a, b }) {
      return bi(a) < bi(b);
    }
    bigint_gt({ a, b }) {
      return bi(a) > bi(b);
    }
    bigint_eq({ a, b }) {
      return bi(a) === bi(b);
    }
    bigint_neq({ a, b }) {
      return bi(a) != bi(b);
    }
    bigint_le({ a, b }) {
      return bi(a) <= bi(b);
    }
    bigint_ge({ a, b }) {
      return bi(a) >= bi(b);
    }
  }

  Scratch.extensions.register(new BigIntExtension());
})(Scratch);
