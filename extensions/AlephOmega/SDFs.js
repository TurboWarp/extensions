(function(Scratch) {
    'use strict';
  
    if (!Scratch.extensions.unsandboxed) {
      throw new Error('This extension must run unsandboxed');
    }
  
    class SDF {
      getInfo() {
        return {
          color1: "#ad0090",
          color2: "#6e145f",
          color3: "#3b0932",
          id: 'SDF',
          name: 'SDFs',
          blocks: [
            {
              opcode: 'Sphere',
              blockType: Scratch.BlockType.REPORTER,
              text: 'Get distance from [P] to sphere at [A] with radius [R]',
              arguments: {
                P: {
                    type: Scratch.ArgumentType.STRING
                },
                A: {
                    type: Scratch.ArgumentType.STRING
                },
                R: {
                    type: Scratch.ArgumentType.NUMBER
                }
              }
            },
            {
                opcode: "Box",
                blockType: Scratch.BlockType.REPORTER,
                text: "Get distance from [P] to box at [A] with size [S]",
                arguments: {
                    P: {
                        type: Scratch.ArgumentType.STRING
                    },
                    A: {
                        type: Scratch.ArgumentType.STRING
                    },
                    S: {
                        type: Scratch.ArgumentType.STRING
                    }
                }
            },
            {
                opcode: "Box2",
                blockType: Scratch.BlockType.REPORTER,
                text: "Get distance from [P] to rounded box at [A] with size [S] with bevel [R]",
                arguments: {
                    P: {
                        type: Scratch.ArgumentType.STRING
                    },
                    A: {
                        type: Scratch.ArgumentType.STRING
                    },
                    S: {
                        type: Scratch.ArgumentType.STRING
                    },
                    R: {
                        type: Scratch.ArgumentType.NUMBER
                    }
                }
            },
            {
                opcode: "Capsule",
                blockType: Scratch.BlockType.REPORTER,
                text: "Get distance from [P] to capsule from [A] to [B] with Radius [R]",
                arguments: {
                    P: {
                        type: Scratch.ArgumentType.STRING
                    },
                    A: {
                        type: Scratch.ArgumentType.STRING
                    },
                    B: {
                        type: Scratch.ArgumentType.STRING
                    },
                    R: {
                        type: Scratch.ArgumentType.NUMBER
                    }
                }
            },
            {
                opcode: "Plane",
                blockType: Scratch.BlockType.REPORTER,
                text: "Get distance from [P] to plane with normal [A] and height (Perpendicular) [B]",
                arguments: {
                    P: {
                        type: Scratch.ArgumentType.STRING
                    },
                    A: {
                        type: Scratch.ArgumentType.STRING
                    },
                    B: {
                        type: Scratch.ArgumentType.STRING
                    }
                }
            },
            {
                opcode: "Union",
                blockType: Scratch.BlockType.REPORTER,
                text: "[A] union [B] ",
                arguments: {

                    A: {
                        type: Scratch.ArgumentType.NUMBER
                    },
                    B: {
                        type: Scratch.ArgumentType.NUMBER
                    }
                }
            },
            {
                opcode: "Intersection",
                blockType: Scratch.BlockType.REPORTER,
                text: "[A] Intersection [B] ",
                arguments: {

                    A: {
                        type: Scratch.ArgumentType.NUMBER
                    },
                    B: {
                        type: Scratch.ArgumentType.NUMBER
                    }
                }
            },
            {
                opcode: "Subtraction",
                blockType: Scratch.BlockType.REPORTER,
                text: "[A] Subtraction [B] ",
                arguments: {

                    A: {
                        type: Scratch.ArgumentType.NUMBER
                    },
                    B: {
                        type: Scratch.ArgumentType.NUMBER
                    }
                }
            },
            {
                opcode: "Lerp",
                blockType: Scratch.BlockType.REPORTER,
                text: "[A] Interpolate [B] by [t] ",
                arguments: {

                    A: {
                        type: Scratch.ArgumentType.NUMBER
                    },
                    B: {
                        type: Scratch.ArgumentType.NUMBER
                    },
                    T: {
                        type: Scratch.ArgumentType.NUMBER
                    }
                }
            },
            {
                opcode: "Champfer",
                blockType: Scratch.BlockType.REPORTER,
                text: "[A] Champfer [B] by [K] ",
                arguments: {

                    A: {
                        type: Scratch.ArgumentType.NUMBER
                    },
                    B: {
                        type: Scratch.ArgumentType.NUMBER
                    },
                    K: {
                        type: Scratch.ArgumentType.NUMBER
                    }
                }
            },
            {
                opcode: "ChampferInt",
                blockType: Scratch.BlockType.REPORTER,
                text: "[A] Champfer intersect [B] by [K] ",
                arguments: {

                    A: {
                        type: Scratch.ArgumentType.NUMBER
                    },
                    B: {
                        type: Scratch.ArgumentType.NUMBER
                    },
                    K: {
                        type: Scratch.ArgumentType.NUMBER
                    }
                }
            },
            {
                opcode: "ChampferSub",
                blockType: Scratch.BlockType.REPORTER,
                text: "[A] Champfer Subtract [B] by [K] ",
                arguments: {

                    A: {
                        type: Scratch.ArgumentType.NUMBER
                    },
                    B: {
                        type: Scratch.ArgumentType.NUMBER
                    },
                    K: {
                        type: Scratch.ArgumentType.NUMBER
                    }
                }
            },
            {
                opcode: "Hollow",
                blockType: Scratch.BlockType.REPORTER,
                text: "[A] Hollowed out with mid radius of [B] ",
                arguments: {

                    A: {
                        type: Scratch.ArgumentType.NUMBER
                    },
                    B: {
                        type: Scratch.ArgumentType.NUMBER
                    }
                }
            },
            {
                opcode: "Groove",
                blockType: Scratch.BlockType.REPORTER,
                text: "[A] Groove [B] by [K] ",
                arguments: {

                    A: {
                        type: Scratch.ArgumentType.NUMBER
                    },
                    B: {
                        type: Scratch.ArgumentType.NUMBER
                    },
                    K: {
                        type: Scratch.ArgumentType.NUMBER
                    }
                }
            },
            {
                opcode: "round_merge",
                blockType: Scratch.BlockType.REPORTER,
                text: "[A] round merhe [B] with radius [K] ",
                arguments: {

                    A: {
                        type: Scratch.ArgumentType.NUMBER
                    },
                    B: {
                        type: Scratch.ArgumentType.NUMBER
                    },
                    K: {
                        type: Scratch.ArgumentType.NUMBER
                    }
                }
            },
            {
                opcode: "round_intersect",
                blockType: Scratch.BlockType.REPORTER,
                text: "[A] round intersect [B] with radius [K] ",
                arguments: {

                    A: {
                        type: Scratch.ArgumentType.NUMBER
                    },
                    B: {
                        type: Scratch.ArgumentType.NUMBER
                    },
                    K: {
                        type: Scratch.ArgumentType.NUMBER
                    }
                }
            },
            {
                opcode: "round_subtract",
                blockType: Scratch.BlockType.REPORTER,
                text: "[A] round subtract [B] with radius [K] ",
                arguments: {

                    A: {
                        type: Scratch.ArgumentType.NUMBER
                    },
                    B: {
                        type: Scratch.ArgumentType.NUMBER
                    },
                    K: {
                        type: Scratch.ArgumentType.NUMBER
                    }
                }
            },
            {
                opcode: "round_subtract",
                blockType: Scratch.BlockType.REPORTER,
                text: "[A] round subtract [B] with radius [K] ",
                arguments: {

                    A: {
                        type: Scratch.ArgumentType.NUMBER
                    },
                    B: {
                        type: Scratch.ArgumentType.NUMBER
                    },
                    K: {
                        type: Scratch.ArgumentType.NUMBER
                    }
                }
            },
            {
                opcode: "Smoothunion",
                blockType: Scratch.BlockType.REPORTER,
                text: "[A] Smootly merge [B] with a coefficient of [K] ",
                arguments: {

                    A: {
                        type: Scratch.ArgumentType.NUMBER
                    },
                    B: {
                        type: Scratch.ArgumentType.NUMBER
                    },
                    K: {
                        type: Scratch.ArgumentType.NUMBER
                    }
                }
            },
            {
                opcode: "Smoothsub",
                blockType: Scratch.BlockType.REPORTER,
                text: "[A] Smootly subtract [B] with a coefficient of [K] ",
                arguments: {

                    A: {
                        type: Scratch.ArgumentType.NUMBER
                    },
                    B: {
                        type: Scratch.ArgumentType.NUMBER
                    },
                    K: {
                        type: Scratch.ArgumentType.NUMBER
                    }
                }
            },
            {
                opcode: "Smoothint",
                blockType: Scratch.BlockType.REPORTER,
                text: "[A] Smootly intersect [B] with a coefficient of [K] ",
                arguments: {

                    A: {
                        type: Scratch.ArgumentType.NUMBER
                    },
                    B: {
                        type: Scratch.ArgumentType.NUMBER
                    },
                    K: {
                        type: Scratch.ArgumentType.NUMBER
                    }
                }
            },
            {
                opcode: "Scale",
                blockType: Scratch.BlockType.REPORTER,
                text: "[A] Scale by [B]",
                arguments: {
                    A: {
                        type: Scratch.ArgumentType.NUMBER
                    },
                    B: {
                        type: Scratch.ArgumentType.NUMBER
                    }
                }
            },
            {
                opcode: "Rounded",
                blockType: Scratch.BlockType.REPORTER,
                text: "[A] round by radius of [B]",
                arguments: {
                    A: {
                        type: Scratch.ArgumentType.NUMBER
                    },
                    B: {
                        type: Scratch.ArgumentType.NUMBER
                    }
                }
            },
            {
                opcode: "Onioning",
                blockType: Scratch.BlockType.REPORTER,
                text: "[A] onion by [B]",
                arguments: {
                    A: {
                        type: Scratch.ArgumentType.NUMBER
                    },
                    B: {
                        type: Scratch.ArgumentType.NUMBER
                    }
                }
            }
          ]
        };
      }

      Onioning({A, B}) {
        return abs(A) - B;
      }

      Round({A, B}) {
          return abs(A + B) - B;
      }

      Smoothint({A, B, K}) {
        var h = clamp(0.5 - 0.5 * (A - B) / K, 0 ,1);
        return this.Lerp({"A": A, "B": 0 - B, "T": h}) + K * h * (1 - h);
      }

      Smoothsub({A, B, K}) {
        var h = clamp(0.5 - 0.5 * (A + B) / K, 0 ,1);
        return this.Lerp({"A": A, "B": 0 - B, "T": h}) + K * h * (1 - h);
      }

      Smoothunion({A, B, K}) {
        var h = clamp(0.5 + 0.5 * (A - B) / K, 0 ,1);
        return this.Lerp({"A": A, "B": B, "T": h}) + K * h * (1 - h);
      }

      Scale({A, B}) {
        A = JSON.parse(A);
        B = JSON.parse(B);
        A.x = A.x * B.x;
        A.y = A.y * B.y;
        A.z = A.z * B.z;
        return JSON.stringify(A);
      }
      Plane({P, A, B}) {
        var dot = (
            A.x * P.x + 
            A.y * P.y +
            A.z * P.z
        );
        return dot - B;
      }

      round_subtract({A, B, K}) {
        return this.round_intersect({"A": A,"B": 0 - B ,"K": K})
       }

      round_intersect({A, B, K}) {
        var ISX = min(A + K,0);
        var ISY = min(B + K,0);
        var outdist = Math.sqrt(
         ISX * ISX + ISY * ISY
        );
        var intersect = max(A,b);
        var indist = min(intersect, -K);
        return indist + outdist;
       }

      round_merge({A, B, K}) {
       var ISX = max(A - K,0);
       var ISY = max(B - K,0);
       var indist = 0 - Math.sqrt(
        ISX * ISX + ISY * ISY
       );
       var union = min(A,b);
       var outdist = max(union, K);
       return indist + outdist
      }

      Groove({A, B, K}) {
        return max(A , 0 - (Math.abs(B) - K))
      }

      Hollow({A, B}) {
        return Math.abs(A) - B;
     }

      ChampferSub({A, B, K}) {
        var simpleMerge = max(A,0 - B);
        var champfer = (A + (0 - B)) * Math.sqrt(0.5);
        champfer -= K;
        return max(simpleMerge , champfer);
     }

      ChampferInt({A, B, K}) {
        var simpleMerge = max(A,B);
        var champfer = (A + B) * Math.sqrt(0.5);
        champfer -= K;
        return max(simpleMerge , champfer);
     }

      Champfer({A, B, K}) {
         var simpleMerge = min(A,B);
         var champfer = (A + B) * Math.sqrt(0.5);
         champfer -= K;
         return min(simpleMerge , champfer);
      }

      Lerp({A, B, T}) {
        return (A * T) + (B * (1 - T));
      }

      Intersection({A, B}) {
        return max(A,B);
      }

      Subtraction({A, B}) {
        return min(A,0 - B);
      }

      Union({A, B}) {
        return min(A, B);
      }

      Capsule({P, A, B, R}) {
        P = JSON.parse(P);
        A = JSON.parse(A);
        B = JSON.parse(B)
        var pax = P.x - A.x;
        var pay = P.y - A.y;
        var paz = P.z - A.z;
        var bax = B.x - A.x;
        var bay = B.y - A.y;
        var baz = B.z - A.z;
        var dotpaba = (
          pax * bax + 
          pay * bay +
          paz * baz
        );
        var dotbaba = (
            bax * bax + 
            bay * bay +
            baz * baz
        );
        var h = clamp(dotpaba/dotbaba,0,1);
        var bahx = bax*h;
        var bahy = bay*h;
        var bahz = baz*h;
        var ax = pax-bahx;
        var ay = pay-bahy;
        var az = paz-bahz;
        var dist = Math.sqrt(
            ax * ax + ay * ay + az * az
        );
        return dist-R;
      }

      Sphere({P, A, R}) {
        P = JSON.parse(P);
        A = JSON.parse(A);
        var dx = P.x - A.x;
        var dy = P.y - A.y;
        var dz = P.z - A.z;
        var dist = Math.sqrt(
            dx * dx + dy * dy + dz * dz
        );
        return dist-R;
      }

      Box({P, A, S}) {
        P = JSON.parse(P);
        A = JSON.parse(A);
        var dx = P.x - A.x;
        var dy = P.y - A.y;
        var dz = P.z - A.z;
        var qx = Math.abs(dx)-S.x;
        var qy = Math.abs(dy)-S.y;
        var qz = Math.abs(dz)-S.z;
        var Zerominx = max(qx,0);
        var Zerominy = max(qy,0);
        var Zerominz = max(qz,0);
        var dist = Math.sqrt(
            Zerominx*Zerominx + Zerominy*Zerominy + Zerominz*Zerominz
        );
        return dist + min(max(qx,max(qy,qz)),0)
      }

      Box2({P, A, S, R}) {
        P = JSON.parse(P);
        A = JSON.parse(A);
        var dx = P.x - A.x;
        var dy = P.y - A.y;
        var dz = P.z - A.z;
        var qx = Math.abs(dx)-S.x;
        var qy = Math.abs(dy)-S.y;
        var qz = Math.abs(dz)-S.z;
        var Zerominx = max(qx,0);
        var Zerominy = max(qy,0);
        var Zerominz = max(qz,0);
        var dist = Math.sqrt(
            Zerominx*Zerominx + Zerominy*Zerominy + Zerominz*Zerominz
        );
        return dist + min(max(qx,max(qy,qz)),0)-R
      }
    }
    Scratch.extensions.register(new SDF());
  })(Scratch);
