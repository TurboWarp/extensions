// Name: Boxed Plysics
// ID: P7BoxPhys
// Description: Implements the Box2D physics engine, adding joints, springs, sliders, and more.
// By: pooiod7 <https://scratch.mit.edu/users/pooiod7/>
// Original: Griffpatch
// License: zlib

/* This extension was originally based off of the Box2D Physics extension
for ScratchX by Griffpatch, but has since deviated to have more features,
while keeping general compatability. (made with box2D js es6) */

(function(Scratch) {
  'use strict';
  var b2Dversion = "1.8.1";
  if (!Scratch.extensions.unsandboxed) {
    throw new Error('Boxed Physics can\'t run in the sandbox');
  }

  var b2Vec2, b2AABB, b2BodyDef, b2Body, b2FixtureDef, b2Fixture, b2World, b2MassData, b2PolygonShape, b2CircleShape, b2DebugDraw, b2MouseJointDef;
  var b2Dworld, fixDef; var mousePVec, selectedBody, prb2djaxisX, prb2djaxisY, prb2djl, prb2dju;
  var b2Dzoom = 50; var b2Math;

  var physdebugmode = false;
  var wipblocks = false;

  var positerations = 10;
  var veliterations = 10;

  var defSpring = { len: 100, damp: 0.7, freq: 5 };

  var bodyDef;

  var uid_seq = 0; var ujid_seq = 0;
  var categorySeq = 0;

  var bodies = {};
  var joints = {};

  var bodyCategoryBits = 1;
  var bodyMaskBits = 1;
  var noCollideSeq = 0;

  const toRad = Math.PI / 180;

  var simspeed = 0;

  const menuIconURI = "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiDQoJIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOmE9Imh0dHA6Ly9ucy5hZG9iZS5jb20vQWRvYmVTVkdWaWV3ZXJFeHRlbnNpb25zLzMuMC8iDQoJIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iNDBweCIgaGVpZ2h0PSI0MHB4IiB2aWV3Qm94PSItMy43IC0zLjcgNDAgNDAiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgLTMuNyAtMy43IDQwIDQwIg0KCSB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxkZWZzPg0KPC9kZWZzPg0KPHJlY3QgeD0iOC45IiB5PSIxLjUiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iIzE2OUZCMCIgc3Ryb2tlLXdpZHRoPSIzIiB3aWR0aD0iMTQuOCIgaGVpZ2h0PSIxNC44Ii8+DQo8cmVjdCB4PSIxLjUiIHk9IjE2LjMiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iIzE2OUZCMCIgc3Ryb2tlLXdpZHRoPSIzIiB3aWR0aD0iMTQuOCIgaGVpZ2h0PSIxNC44Ii8+DQo8cmVjdCB4PSIxNi4zIiB5PSIxNi4zIiBmaWxsPSIjRkZGRkZGIiBzdHJva2U9IiMxNjlGQjAiIHN0cm9rZS13aWR0aD0iMyIgd2lkdGg9IjE0LjgiIGhlaWdodD0iMTQuOCIvPg0KPC9zdmc+";

  class BoxPhys {
    constructor() {
      this.vm = Scratch.vm;
      this.runtime = this.vm.runtime

      this.turbowarp = window.location.href.indexOf('turbowarp.') > -1;

      this.docs = Scratch.extensions.isPenguinMod ? 'https://extensions.penguinmod.com/docs/BoxedPhysics' : false ? 'https://extensions.turbowarp.org/pooiod7/BoxedPhysics",' : 'https://pooiod7.neocities.org/markdown/#/projects/scratch/extensions/other/markdown/box2D';

      // this is a penguinmod only thing
      this.squaretype = Scratch.extensions.isPenguinMod ? Scratch.BlockShape.SQUARE : false;

      vm.runtime.on('PROJECT_LOADED', () => {
        this.physoptions({ "CONPHYS": true, "WARMSTART": true, "POS": 10, "VEL": 10 });
      });
      this.vm.runtime.on('PROJECT_STOP', () => {
        this.init({ "SCALE": b2Dzoom, "GRAVITY": -10, "SCENE": "stage" });
      });
      vm.runtime.on('PROJECT_START', () => {
        this.init({ "SCALE": b2Dzoom, "GRAVITY": -10, "SCENE": "stage" });
      });
      this.init({ "SCALE": b2Dzoom, "GRAVITY": -10, "SCENE": "stage" });
    }
    getInfo() {
      return {
        id: 'P7BoxPhys',
        name: physdebugmode || wipblocks ? 'Boxed Physics (debug)' : 'Boxed Physics',
        color1: physdebugmode || wipblocks ? "#4b4a60" : "#2cb0c0",
        color2: physdebugmode || wipblocks ? "#383747" : "#4eb88a",
        menuIconURI: menuIconURI,
        docsURI: this.docs,
        blocks: [
          { blockType: Scratch.BlockType.LABEL, text: "Define objects" }, // ---- Define objects ---
          {
            opcode: 'setBodyAttrs',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Define Type [BODYTYPE]  Density [DENSITY]  Friction [FRICTION]  Bounce [BOUNCE]',
            arguments: {
              BODYTYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: 'BodyTypePK',
                defaultValue: 'dynamic',
              },
              DENSITY: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1.0,
              },
              FRICTION: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0.5,
              },
              BOUNCE: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0.2,
              },
            },
          },
          {
            opcode: 'defineCircle',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Define Circle, size: [SIZE]',
            arguments: {
              SIZE: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100,
              },
            },
          },
          {
            opcode: 'defineRect',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Define Box, width: [WIDTH] height: [HEIGHT]',
            arguments: {
              WIDTH: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100,
              },
              HEIGHT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100,
              },
            },
          },
          {
            opcode: 'definePoly',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Define Polygon, points: [POINTS]',
            arguments: {
              POINTS: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0 50   40 -50   -40 -50",
              },
            },
          },
          {
            opcode: 'difineCostume',
            blockType: Scratch.BlockType.COMMAND,
            filter: [Scratch.TargetType.SPRITE],
            text: 'Define pollygon as this costume',
          },
          {
            opcode: 'placeBody',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Make object [NAME] at x: [X]  y: [Y]  dir: [DIR]',
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Object',
              },
              X: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              Y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              DIR: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 90,
              },
            },
          },
          { blockType: Scratch.BlockType.LABEL, text: "Modify objects" }, // ---- Modify objects ---
          {
            opcode: 'destroyBody',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Destroy object [NAME]',
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Object',
              },
            },
          },
          {
            opcode: 'destroyBodys',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Destroy every object',
          },
          {
            opcode: 'createNoCollideSet',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Disable collision between [NAMES]',
            arguments: {
              NAMES: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Object1 Object2',
              },
            },
          },
          {
            opcode: 'createYesCollideSet',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Reset collision of objects [NAMES]',
            arguments: {
              NAMES: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Object1 Object2',
              },
            },
          },
          {
            opcode: 'setBodyAttr',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Set [BODYATTR] of object [NAME] to [VALUE]',
            arguments: {
              BODYATTR: {
                type: Scratch.ArgumentType.STRING,
                menu: 'bodyAttr',
              },
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Object',
              },
              VALUE: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0.1,
              },
            },
          },
          {
            opcode: 'applyForceToBody',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Apply [FORCETYPE] to object [NAME] at x: [X]  y: [Y]  power: [POWER]  dir: [DIR]',
            arguments: {
              FORCETYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: 'ForceType',
                defaultValue: 'Impulse',
              },
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Object',
              },
              X: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              Y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              POWER: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 50,
              },
              DIR: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 90,
              },
            },
          },
          {
            opcode: 'applyAngForceToBody',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Apply Angular Impulse to object [NAME] power: [POWER]',
            arguments: {
              ANGFORCETYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: 'AngForceType',
                defaultValue: 'Impulse',
              },
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Object',
              },
              POWER: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
            },
          },
          {
            opcode: 'changevel',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Set Velocity of [NAME] to x [X] y [Y] dir [DIR]',
            arguments: {
              X: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              Y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              DIR: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Object",
              },
            },
          },
          {
            opcode: 'moveto',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Move object [NAME] to x [X] y [Y]',
            arguments: {
              X: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              Y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Object",
              },
            },
          },
          {
            opcode: 'rotateto',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Set rotation of object [NAME] to [ROT]',
            arguments: {
              ROT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 90,
              },
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Object",
              },
            },
          },
          {
            opcode: 'clearvel',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Clear velocity of object [NAME]',
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Object",
              },
            },
          },
          {
            opcode: 'getBodyAttr',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Get [BODYATTRREAD] from object [NAME]',
            arguments: {
              BODYATTRREAD: {
                type: Scratch.ArgumentType.STRING,
                menu: 'bodyAttrRead',
              },
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Object',
              },
            },
          },
          {
            opcode: 'getBodyIDAt',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Get body of type [type] at x: [X]  y: [Y]',
            arguments: {
              type: {
                type: Scratch.ArgumentType.STRING,
                menu: 'BodyTypePK2',
                defaultValue: 'any',
              },
              X: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              Y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
            },
          },
          {
            opcode: 'getobjects',
            disableMonitor: true,
            blockType: Scratch.BlockType.REPORTER,
            text: 'All objects',
          },
          { blockType: Scratch.BlockType.LABEL, text: "Define joints" }, // ---- Define joints -----
          {
            opcode: 'defineSpring',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Define Spring, Length: [LENGTH]  Damping: [DAMPING]  Freq: [FREQ]',
            arguments: {
              LENGTH: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100,
              },
              DAMPING: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0.7,
              },
              FREQ: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 5,
              },
            },
          },
          {
            opcode: 'definePrismatic',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Define Slider, Angle: [DIR] Lower stop: [LOW] Upper stop: [HIGH]',
            arguments: {
              DIR: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '90',
              },
              LOW: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '-100',
              },
              HIGH: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '100',
              },
            },
          },
          {
            opcode: 'createJointOfType',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Create Joint [JOINTID] of type [JOINTTYPE] between [BODY1] at [X1] [Y1] and [BODY2] at [X2] [Y2]',
            arguments: {
              JOINTID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Joint',
              },
              JOINTTYPE: {
                type: Scratch.ArgumentType.STRING,
                menu: 'JointType',
                defaultValue: 'Rotating',
              },
              BODY1: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Object1',
              },
              X1: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              Y1: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              BODY2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Object2',
              },
              X2: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              Y2: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
            },
          },
          { blockType: Scratch.BlockType.LABEL, text: "Modify joints" }, // ------ Modify joints ---
          {
            opcode: 'destroyJoint',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Destroy Joint [JOINTID]',
            arguments: {
              JOINTID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Joint ID',
              },
            },
          },
          {
            opcode: 'setJointAttr',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Set [JOINTATTR] of joint [JOINTID] to [VALUE]',
            arguments: {
              JOINTATTR: {
                type: Scratch.ArgumentType.STRING,
                menu: 'JointAttr',
                defaultValue: 'Motor On',
              },
              JOINTID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Joint ID',
              },
              VALUE: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
            },
          },
          {
            opcode: 'setJointTarget',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Set Mouse Joint Target [JOINTID] to x: [X]  y: [Y]',
            arguments: {
              JOINTID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Joint ID',
              },
              X: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              Y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
            },
          },
          {
            opcode: 'getJointAttr',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Get [JOINTATTRREAD] of joint: [JOINTID]',
            arguments: {
              JOINTATTRREAD: {
                type: Scratch.ArgumentType.STRING,
                menu: 'JointAttrRead',
              },
              JOINTID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Joint ID',
              },
            },
          },
          { blockType: Scratch.BlockType.LABEL, text: "World functions" }, // --- World functions --
          {
            opcode: 'init',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Make World, scale 1m: [SCALE]  gravity: [GRAVITY]  scene: [SCENE]',
            arguments: {
              SCALE: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 50,
              },
              GRAVITY: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: -10,
              },
              SCENE: {
                type: Scratch.ArgumentType.STRING,
                menu: 'sceneType',
                defaultValue: 'closed stage',
              },
            },
          },
          {
            opcode: 'physoptions',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Set physics Position Iterations: [POS] Velocity Iterations: [VEL] Continuous Physics: [CONPHYS] Warm Starting: [WARMSTART]',
            arguments: {
              POS: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 10,
              },
              VEL: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 10,
              },
              CONPHYS: {
                type: Scratch.ArgumentType.BOOLEAN,
                defaultValue: true,
              },
              WARMSTART: {
                type: Scratch.ArgumentType.BOOLEAN,
                defaultValue: true,
              },
            },
          },
          {
            opcode: 'getsimspeed',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Slow motion',
          },
          {
            opcode: 'setsimspeed',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Set slow motion to [VALUE]',
            arguments: {
              VALUE: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 30,
              },
            },
          },
          {
            opcode: 'stepSimulation',
            blockType: Scratch.BlockType.COMMAND,
            text: 'Step Simulation',
          },
          { blockType: Scratch.BlockType.LABEL, text: "Math functions" }, // ---- Math functions -----
          {
            opcode: 'rotatePoint',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Get [PART] from point x [X] y [Y] rotated by [ANGLE]',
            arguments: {
              X: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              Y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              ANGLE: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              PART: {
                type: Scratch.ArgumentType.STRING,
                menu: 'xy',
                defaultValue: 'x',
              },
            },
          },
          {
            opcode: 'rotationFromPoint',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Get rotation from x [x1] y [y1] to x [x2] y [y2]',
            arguments: {
              x1: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              y1: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              x2: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              y2: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
            },
          },
          {
            opcode: "magnitudeOfPoint",
            blockType: Scratch.BlockType.REPORTER,
            text: "Magnitude of x [a1] y [a2]",
            arguments: {
              a1: { 
                type: Scratch.ArgumentType.STRING, 
                defaultValue: "0" 
              },
              a2: { 
                type: Scratch.ArgumentType.STRING, 
                defaultValue: "0" 
              },
            },
          },
          {
            opcode: "distanceOfPoint",
            blockType: Scratch.BlockType.REPORTER,
            text: "Distance between x [a1] y [a2] and x [b1] y [b2]",
            arguments: {
              a1: { 
                type: Scratch.ArgumentType.STRING, 
                defaultValue: "0" 
              },
              a2: { 
                type: Scratch.ArgumentType.STRING, 
                defaultValue: "0" 
              },
              b1: { 
                type: Scratch.ArgumentType.STRING, 
                defaultValue: "0" 
              },
              b2: { 
                type: Scratch.ArgumentType.STRING, 
                defaultValue: "0" 
              },
            },
          },

          
          {
            hideFromPalette: !physdebugmode && !wipblocks,
            blockType: Scratch.BlockType.LABEL, // --------------------- Work in progress blocks ----
            text: "Upcoming blocks (can brake projects)"
          },
          {
            opcode: 'ignore',
            hideFromPalette: !physdebugmode && !wipblocks,
            blockType: Scratch.BlockType.COMMAND,
            text: 'Ignore [VALUE]',
            arguments: {
              VALUE: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "",
              },
            },
          },
          {
            opcode: 'get_debug',
            hideFromPalette: !physdebugmode && !wipblocks,
            blockType: Scratch.BlockType.REPORTER,
            blockShape: this.squaretype,
            text: 'Get debug [VAL]',
            arguments: {
              VAL: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "version",
              },
            },
          },
          {
            opcode: 'ispoly',
            hideFromPalette: !physdebugmode && !wipblocks,
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'Is [POINTS] a polygon?',
            arguments: {
              POINTS: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "0 50   40 -50   -40 -50",
              },
            },
          },
        ],
        menus: {
          sceneType: ['boxed stage', 'closed stage', 'opened stage', 'nothing'],
          BodyTypePK: ['dynamic', 'static'],
          BodyTypePK2: ['dynamic', 'static', 'any'],
          bodyAttr: ['damping', 'rotational damping'],
          bodyAttrRead: ['x', 'y', 'Xvel', 'Yvel', 'Dvel', 'direction', 'awake'],
          ForceType: ['Impulse', 'World Impulse'],
          AngForceType: ['Impulse'],
          JointType: ['Rotating', 'Spring', 'Weld', 'Slider', 'Mouse'],
          JointAttr: ['Motor On', 'Motor Speed', 'Max Torque', 'Limits On', 'Lower Limit', 'Upper Limit'],
          JointAttrRead: ['Angle', 'Speed', 'Motor Torque', 'Reaction Torque', 'Tension'],
          xyp: ['x', 'y', 'point'],
          xy: ['x', 'y'],
        },
      };
    }

    ignore() { }
    get_debug(args) {
      try { args = args.VAL } catch (error) { args = args; }
      if (args == "version") {
        return b2Dversion;
      } else if (args == "lib") {
        return "Box2D JS es6 (Uli Hecht's port of Box2D flash)";
      } else if (args === "maker") {
        return "pooiod7";
      } else if (args === "base") {
        return "Box2D Physics by griffpatch for ScratchX (Scratch 2.0)";
      } else if (args === "docs") {
        return this.docs;
      } else {
        return '["version", "lib", "maker", "base", "docs"]';
      }
    }

    init(args) {
      b2Math = Box2D.Common.Math.b2Math;
      b2Vec2 = Box2D.Common.Math.b2Vec2;
      b2AABB = Box2D.Collision.b2AABB;
      b2BodyDef = Box2D.Dynamics.b2BodyDef;
      b2Body = Box2D.Dynamics.b2Body;
      b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
      b2Fixture = Box2D.Dynamics.b2Fixture;
      b2World = Box2D.Dynamics.b2World;
      b2MassData = Box2D.Collision.Shapes.b2MassData;
      b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
      b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
      b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
      b2MouseJointDef = Box2D.Dynamics.Joints.b2MouseJointDef;

      b2Dworld = new b2World(
        new b2Vec2(0, args.GRAVITY) // args.GRAVITY (10)
        , true                     // allow sleep
      );

      b2Dzoom = args.SCALE;

      fixDef = new b2FixtureDef;
      fixDef.density = 1.0;		    // 1.0
      fixDef.friction = 0.5;		 // 0.5
      fixDef.restitution = 0.2;	// 0.2

      bodyDef = new b2BodyDef;

      if (args.SCENE == 'closed stage' || args.SCENE == 'stage') {
        bodyDef.type = b2Body.b2_staticBody;
        fixDef.shape = new b2PolygonShape;
        fixDef.shape.SetAsBox(250 / b2Dzoom, 10 / b2Dzoom);
        bodyDef.position.Set(0, -190 / b2Dzoom);
        b2Dworld.CreateBody(bodyDef).CreateFixture(fixDef);
        bodyDef.position.Set(0, 1000 / b2Dzoom);
        b2Dworld.CreateBody(bodyDef).CreateFixture(fixDef);
        fixDef.shape.SetAsBox(10 / b2Dzoom, 800 / b2Dzoom);
        bodyDef.position.Set(-250 / b2Dzoom, 540 / b2Dzoom);
        b2Dworld.CreateBody(bodyDef).CreateFixture(fixDef);
        bodyDef.position.Set(250 / b2Dzoom, 540 / b2Dzoom);
        b2Dworld.CreateBody(bodyDef).CreateFixture(fixDef);
      } else if (args.SCENE == 'opened stage') {
        bodyDef.type = b2Body.b2_staticBody;
        fixDef.shape = new b2PolygonShape;
        fixDef.shape.SetAsBox(9999999, 10 / b2Dzoom);
        bodyDef.position.Set(0, -190 / b2Dzoom);
        b2Dworld.CreateBody(bodyDef).CreateFixture(fixDef);
      } else if (args.SCENE == 'boxed stage') {
        bodyDef.type = b2Body.b2_staticBody;
        fixDef.shape = new b2PolygonShape;
        fixDef.shape.SetAsBox(250 / b2Dzoom, 10 / b2Dzoom);
        bodyDef.position.Set(0, -190 / b2Dzoom);
        b2Dworld.CreateBody(bodyDef).CreateFixture(fixDef);
        bodyDef.position.Set(0, 1000 / b2Dzoom);
        b2Dworld.CreateBody(bodyDef).CreateFixture(fixDef);
        fixDef.shape.SetAsBox(10 / b2Dzoom, 800 / b2Dzoom);
        bodyDef.position.Set(-250 / b2Dzoom, 540 / b2Dzoom);
        b2Dworld.CreateBody(bodyDef).CreateFixture(fixDef);
        bodyDef.position.Set(250 / b2Dzoom, 540 / b2Dzoom);
        b2Dworld.CreateBody(bodyDef).CreateFixture(fixDef);
        fixDef.shape.SetAsBox(250 / b2Dzoom, 10 / b2Dzoom);
        bodyDef.position.Set(0, 190 / b2Dzoom);
        b2Dworld.CreateBody(bodyDef).CreateFixture(fixDef);
      }

      bodies = {};
      joints = {};
      uid_seq = 0;
      ujid_seq = 0;

      categorySeq = 0;
      bodyCategoryBits = 1;
      noCollideSeq = 0;

      bodyDef.type = b2Body.b2_dynamicBody;
    }

    rotatePoint(args) {
      var radians = args.ANGLE * Math.PI / 180;
      var cos = Math.cos(radians);
      var sin = Math.sin(radians);
      var nx = (cos * args.X) - (sin * args.Y);
      var ny = (sin * args.X) + (cos * args.Y);
      if (args.PART == "x") {
        return nx;
      } else if (args.PART == "y") {
        return ny;
      } else {
        return '["'+nx+'", "'+ny+'"]';
      }
    }

    magnitudeOfPoint(args) {
      if (args) {
        return Math.sqrt(Math.pow(args.a1, 2) + Math.pow(args.a2, 2));
      }
      return 0;
    }
    
    distanceOfPoint(args) {
      if (args.a1 && args.a2 && args.b1 && args.b2) {
        return Math.sqrt(Math.pow(args.a1 - args.b1, 2) + Math.pow(args.a2 - args.b2, 2));
      }
      return 0;
    }

    rotationFromPoint({ x1, x2, y1, y2}) {
      let angleRad = Math.atan2(y2 - y1, x2 - x1);
      let angleDeg = angleRad * (180 / Math.PI);
      let Angle = 90 - angleDeg;
      if (Angle > 180) {
        Angle -= 360;
      }
      return Angle;
    }

    setJointTarget(args) {
      var joint = joints[args.JOINTID];
      if (joint) {
        joint.SetTarget(new b2Vec2(args.X / b2Dzoom, args.Y / b2Dzoom));
      }
    }

    clearvel(args) {
      var body = bodies[args.NAME];
      if (!body) return '';

      body.SetLinearVelocity(new b2Vec2(0, 0));
      body.SetAngularVelocity(0);
    }

    changevel(args) {
      var body = bodies[args.NAME];
      if (!body) return '';

      body.SetLinearVelocity(new b2Vec2(args.X, args.Y));
      body.SetAngularVelocity(args.DIR);
      body.SetAwake(true)
    }

    setBodyAttrs(args) {
      var stat = args.BODYTYPE;
      var dens = args.DENSITY;
      var fric = args.FRICTION;
      var rest = args.BOUNCE;

      bodyDef.type = stat === 'static' ? b2Body.b2_staticBody : b2Body.b2_dynamicBody;
      fixDef.density = dens;		    // 1.0
      fixDef.friction = fric;		   // 0.5
      fixDef.restitution = rest;	// 0.2
    }

    defineCircle(args) {
      fixDef.shape = new b2CircleShape;
      fixDef.shape.SetRadius(args.SIZE / 2 / b2Dzoom);
    }

    defineRect(args) {
      fixDef.shape = new b2PolygonShape;
      fixDef.shape.SetAsBox(args.WIDTH / 2 / b2Dzoom, args.HEIGHT / 2 / b2Dzoom);
    }

    difineCostume(_, util) {
      try { // does not work with hidden sprites
        const target = util.target;
        if (target.isStage) {
          return;
        }
        
        const r = this.runtime.renderer;
        const drawable = r._allDrawables[target.drawableID];

        // Tell the Drawable about its updated convex hullPoints, if necessary.
        if (drawable.needsConvexHullPoints()) {
          const points = r._getConvexHullPointsForDrawable(target.drawableID);
          drawable.setConvexHullPoints(points);
        }

        const points = drawable._convexHullPoints;
        const scaleX = drawable.scale[0] / 100;
        const scaleY = drawable.scale[1] / -100; // Flip Y for hulls
        const offset = drawable.skin.rotationCenter;
        let allHulls = null;

        const hullPoints = [];
        for (const i in points) {
          hullPoints.push({
            x: (points[i][0] - offset[0]) * scaleX,
            y: (points[i][1] - offset[1]) * scaleY,
          });
        }

        fixDef.shape = new b2PolygonShape();

        const vertices = [];

        let prev = null;
        for (let i = hullPoints.length - 1; i >= 0; i--) {
          const b2Vec = new b2Vec2(hullPoints[i].x / b2Dzoom, hullPoints[i].y / b2Dzoom);
          if (prev !== null && b2Math.SubtractVV(b2Vec, prev).LengthSquared() > Number.MIN_VALUE) {
            vertices.push(b2Vec);
          }
          prev = b2Vec;
        }

        fixDef.shape.SetAsArray(vertices);
      } catch (error) {
        console.warn(error);
      }
    }

    svgtopoints(svg) {
      console.error("no svg support yet");
      return;
    }

    ispoly(args) {
      return this.definePoly(args);
    }

    definePoly(args) {
      fixDef.shape = new b2PolygonShape;
      var points = args.POINTS;

      // this feature does not work yet :( 
      if (points.charAt(0) === '<') {
        console.warn("svg object conversion is not yet supported, use [Define costume]");
        //points = this.svgtopoints(points);
      }

      try {
        var pts = points.split(' ');
        for (var i = 0; i < pts.length; i++) {
          if (pts[i].length == 0) {
            pts.splice(i, 1);
            i--;
          }
        }

        var vertices = [];
        for (var i = pts.length; i > 0; i -= 2) {
          vertices.push(new b2Vec2(parseFloat(pts[i - 2]) / b2Dzoom, parseFloat(pts[i - 1]) / b2Dzoom));
        }
        fixDef.shape.SetAsArray(vertices);
        return true;
      } catch (error) {
        fixDef.shape = new b2CircleShape;
        fixDef.shape.SetRadius(100 / 2 / b2Dzoom);
        console.error("Incorrect polly format", points);
        console.warn("Defaulting to \"circle 100\"");
        return false;
      }
    }

    placeBody(args) {
      var id = args.NAME;

      if (bodies[id]) {
        b2Dworld.DestroyBody(bodies[id]);
      }

      fixDef.filter.categoryBits = bodyCategoryBits;
      fixDef.filter.maskBits = bodyMaskBits;

      bodyDef.position.x = args.X / b2Dzoom;
      bodyDef.position.y = args.Y / b2Dzoom;
      bodyDef.angle = (90 - args.DIR) * toRad;
      var body = b2Dworld.CreateBody(bodyDef);
      body.uid = id;
      body.CreateFixture(fixDef);
      bodies[id] = body;
    }

    createNoCollideSet(args) {
      if (noCollideSeq > 0) {
        noCollideSeq = -noCollideSeq;
      }
      noCollideSeq -= 1;
      var bids = args.NAMES.split(' ');
      for (var i = 0; i < bids.length; i++) {
        var bid = bids[i];
        if (bid.length > 0) {
          var body = bodies[bid];
          if (body) {
            var fix = body.GetFixtureList();
            console.log(body);
            while (fix) {
              var fdata = fix.GetFilterData();
              fdata.groupIndex = noCollideSeq;
              console.log(noCollideSeq)
              fix.SetFilterData(fdata);
              console.log(fix);
              fix = fix.GetNext();
            }
          }
        }
      }
    }

    createYesCollideSet(args) {
      if (noCollideSeq < 0) {
        noCollideSeq = -noCollideSeq;
      }
      noCollideSeq += 1;
      var bids = args.NAMES.split(' ');
      for (var i = 0; i < bids.length; i++) {
        var bid = bids[i];
        if (bid.length > 0) {
          var body = bodies[bid];
          if (body) {
            var fix = body.GetFixtureList();
            console.log(body);
            while (fix) {
              var fdata = fix.GetFilterData();
              fdata.groupIndex = noCollideSeq;
              console.log(noCollideSeq)
              fix.SetFilterData(fdata);
              console.log(fix);
              fix = fix.GetNext();
            }
          }
        }
      }
    }

    getobjects() {
      var bodynames = [];
      for (var bodyName in bodies) {
        if (bodies.hasOwnProperty(bodyName)) {
          if (bodynames.length > 0) {
            bodynames.push(" " + bodyName);
          } else {
            bodynames.push(bodyName);
          }
        }
      }
      return Scratch.Cast.toString(bodynames);
    }

    destroyBodys() {
      for (var bodyName in bodies) {
        if (bodies.hasOwnProperty(bodyName)) {
          this.destroyBody({NAME:bodyName});
        }
      }
    }

    destroyBody(args) {
      if (bodies[args.NAME]) {
        b2Dworld.DestroyBody(bodies[args.NAME]);
        delete bodies[args.NAME];
      }
    }

    setBodyAttr(args) {
      var bds = args.NAME.split(' ');
      for (var i = 0; i < bds.length; i++) {
        var id = bds[i];
        if (id.length > 0) {
          var body = bodies[id];
          if (body) {
            switch (args.BODYATTR) {
              case 'damping': body.SetLinearDamping(args.VALUE); break;
              case 'rotational damping': body.GetAngularDamping(args.VALUE); break;
            }
          }
        }
      }
    }

    getTouchingObjectNames(obj) {
      var contacts = obj.GetContactList();
      var touchingObjectNames = [];

      while (contacts) {
        if (contacts.contact.IsTouching()) {
          var otherFixture = contacts.contact.GetFixtureA() === obj ? contacts.contact.GetFixtureB() : contacts.contact.GetFixtureA();
          var otherBody = otherFixture.GetBody();
          var otherUserData = otherBody.GetUserData();

          if (otherUserData && otherUserData.name) {
            touchingObjectNames.push(otherUserData.name);
          }
        }

        contacts = contacts.next;
      }

      return touchingObjectNames;
    }

    getBodyAttr(args) {
      var body = bodies[args.NAME];
      if (!body) return '';
      switch (args.BODYATTRREAD) {
        case 'x': return body.GetPosition().x * b2Dzoom;
        case 'y': return body.GetPosition().y * b2Dzoom;
        case 'direction': return 90 - (body.GetAngle() / toRad);
        case 'Xvel': return body.GetLinearVelocity().x;
        case 'Yvel': return body.GetLinearVelocity().y;
        case 'Dvel': return body.GetAngularVelocity();
        case 'awake': return body.IsAwake() ? 1 : 0;

        case 'Tension':
          // Assume that body is a b2Body object that represents the object
          var force = 0; // Initialize the force to 0
          var contact = body.GetContactList(); // Get the contact list
          while (contact) { // Loop through the contacts
            var impulse = contact.impulse; // Get the impulse object
            var normalImpulse = impulse.normalImpulses[0]; // Get the normal impulse
            var tangentImpulse = impulse.tangentImpulses[0]; // Get the tangent impulse
            var impulseMagnitude = Math.sqrt(normalImpulse * normalImpulse + tangentImpulse * tangentImpulse); // Calculate the impulse magnitude
            force += impulseMagnitude; // Add the impulse magnitude to the force
            contact = contact.next; // Move to the next contact
          }
          console.log("The force applied to the object by other objects is " + force + " N"); // Print the result
          return force;

        //case 'touching': return JSON.stringify(this.getTouchingObjectNames(body));
      }
      return '';
    }

    moveto(args) {
      var body = bodies[args.NAME];
      if (!body) return '';

      var desiredPosition = new b2Vec2(args.X / b2Dzoom, args.Y / b2Dzoom);
      body.SetPosition(desiredPosition);
      body.SetAwake(true)
    }

    rotateto(args) {
      var body = bodies[args.NAME];
      if (!body) return '';

      var desiredRotation = (180 - args.ROT - 90) * toRad;
      body.SetAngle(desiredRotation);
      body.SetAwake(true)
    }


    getBodyCB(fixture) {
      if (fixture.GetBody().GetType() != b2Body.b2_staticBody) {
        if (fixture.GetShape().TestPoint(fixture.GetBody().GetTransform(), mousePVec)) {
          selectedBody = fixture.GetBody();
          return false;
        }
      }
      return true;
    };

    getBodyIDAt(args) {
      if (args.type == "static") {
        return this.getBodyIDAtstatic(args);
      } else if (args.type == "dynamic") {
        return this.getBodyIDAtdynamic(args);
      } else {
        return this.getBodyIDAtany(args);
      }
    }

    getBodyIDAtany(args) {
      var x = args.X;
      var y = args.Y;

      var mousePVec = new b2Vec2(x / b2Dzoom, y / b2Dzoom);
      var aabb = new b2AABB();
      aabb.lowerBound.Set(mousePVec.x - 0.001, mousePVec.y - 0.001);
      aabb.upperBound.Set(mousePVec.x + 0.001, mousePVec.y + 0.001);

      selectedBody = null;

      // Define the callback to check fixtures within the AABB
      var getStaticBodyCB = function(fixture) {
        var body = fixture.GetBody();
        if (fixture.TestPoint(mousePVec)) {  // Check if the point is within the fixture
          selectedBody = body;
          return false; // Stop querying once a hit is found
        }
        return true; // Continue querying other fixtures
      };

      b2Dworld.QueryAABB(getStaticBodyCB, aabb);

      return selectedBody ? selectedBody.uid : '';
    }

    getBodyIDAtdynamic(args) {
      var x = args.X;
      var y = args.Y;

      mousePVec = new b2Vec2(x / b2Dzoom, y / b2Dzoom);
      var aabb = new b2AABB();
      aabb.lowerBound.Set(mousePVec.x - 0.001, mousePVec.y - 0.001);
      aabb.upperBound.Set(mousePVec.x + 0.001, mousePVec.y + 0.001);

      // Query the b2Dworld for overlapping shapes.
      selectedBody = null;
      b2Dworld.QueryAABB(this.getBodyCB, aabb);

      return selectedBody ? selectedBody.uid : '';
    }

    getBodyIDAtstatic(args) {
      var x = args.X;
      var y = args.Y;

      var mousePVec = new b2Vec2(x / b2Dzoom, y / b2Dzoom);
      var aabb = new b2AABB();
      aabb.lowerBound.Set(mousePVec.x - 0.001, mousePVec.y - 0.001);
      aabb.upperBound.Set(mousePVec.x + 0.001, mousePVec.y + 0.001);

      selectedBody = null;

      var getStaticBodyCB = function(fixture) {
        var body = fixture.GetBody();
        if (body.GetType() === b2Body.b2_staticBody) {
          if (fixture.TestPoint(mousePVec)) {
            selectedBody = body;
            return false;
          }
        }
        return true;
      };

      b2Dworld.QueryAABB(getStaticBodyCB, aabb);

      return selectedBody ? selectedBody.uid : '';
    }

    applyAngForceToBody(args) {
      var ftype = /*args.ANGFORCETYPE*/ 'Impulse';
      var bodyID = args.NAME;
      var pow = args.POWER;

      var body = bodies[bodyID];
      if (!body)
        return;

      if (ftype === 'Impulse') {
        body.ApplyTorque(-pow);
      }
    }

    applyForceToBody(args) {
      var x = args.X;
      var y = args.Y;
      var ftype = args.FORCETYPE;
      var pow = args.POWER;
      var dir = args.DIR;

      var body = bodies[args.NAME];
      if (!body)
        return;

      dir = (90 - dir) * toRad;

      if (ftype === 'Impulse') {
        body.ApplyImpulse({ x: pow * Math.cos(dir), y: pow * Math.sin(dir) }, body.GetWorldPoint({ x: x / b2Dzoom, y: y / b2Dzoom }));
      } else if (ftype === 'World Impulse') {
        body.ApplyForce({ x: pow * Math.cos(dir), y: pow * Math.sin(dir) }, { x: x / b2Dzoom, y: y / b2Dzoom });
      }
    }

    defineSpring(args) {
      var len = args.LENGTH;
      var damp = args.DAMPING;
      var freq = args.FREQ;

      defSpring.len = len < 0.1 ? 0.1 : len / b2Dzoom;
      defSpring.damp = damp < 0 ? 0.7 : damp;
      defSpring.freq = freq > 0 ? freq : 5;
    }

    definePrismatic(args) {
      var directionRadians = args.DIR - 90 * Math.PI / 180;
      prb2djaxisX = Math.cos(directionRadians);
      prb2djaxisY = Math.sin(directionRadians);
      prb2dju = args.HIGH;
      prb2djl = args.LOW;
    }

    createJointOfType(args) {
      var jName = args.JOINTID;
      var typ = args.JOINTTYPE;
      var bodyID = args.BODY1;
      var x = args.X1;
      var y = args.Y1;
      var bodyID2 = args.BODY2
      var x2 = args.X2;
      var y2 = args.Y2;

      if (jName.length > 0) this.destroyJoint(jName);

      if (bodyID == '') bodyID = null;
      if (bodyID2 == '') bodyID2 = null;
      if (!bodyID && !bodyID2) return '';

      var body = bodyID ? bodies[bodyID] : b2Dworld.GetGroundBody();
      var body2 = bodyID2 ? bodies[bodyID2] : b2Dworld.GetGroundBody();

      if (!body || !body2) return '';

      var md;
      switch (typ) {
        case 'Spring':
          md = new Box2D.Dynamics.Joints.b2DistanceJointDef();
          md.length = defSpring.len;
          md.dampingRatio = defSpring.damp;
          md.frequencyHz = defSpring.freq;
          md.bodyA = body;
          md.bodyB = body2;
          md.localAnchorA = { x: x / b2Dzoom, y: y / b2Dzoom };
          md.localAnchorB = { x: x2 / b2Dzoom, y: y2 / b2Dzoom };
          break;

        case 'Rotating':
          md = new Box2D.Dynamics.Joints.b2RevoluteJointDef();
          md.bodyA = body;
          md.bodyB = body2;
          md.localAnchorA = { x: x / b2Dzoom, y: y / b2Dzoom };
          md.localAnchorB = { x: x2 / b2Dzoom, y: y2 / b2Dzoom };
          break;

        case 'Slider':
          md = new Box2D.Dynamics.Joints.b2PrismaticJointDef();
          md.Initialize(body, body2, body.GetWorldCenter(), new b2Vec2(prb2djaxisX, prb2djaxisY));
          md.enableLimit = true;
          md.lowerTranslation = prb2djl;
          md.upperTranslation = prb2dju;
          md.bodyA = body;
          md.bodyB = body2;
          md.localAnchorA = { x: x / b2Dzoom, y: y / b2Dzoom };
          md.localAnchorB = { x: x2 / b2Dzoom, y: y2 / b2Dzoom };
          break;

        case 'Weld':
          md = new Box2D.Dynamics.Joints.b2WeldJointDef();
          md.bodyA = body;
          md.bodyB = body2;
          md.localAnchorA = { x: x / b2Dzoom, y: y / b2Dzoom };
          md.localAnchorB = { x: x2 / b2Dzoom, y: y2 / b2Dzoom };
          break;

        case 'Mouse':
          var md = new b2MouseJointDef();
          if (bodyID == '') {
            md.bodyB = body2;
            md.target.Set(x2 / b2Dzoom, y2 / b2Dzoom);
          } else {
            md.bodyB = body;
            md.target.Set(x / b2Dzoom, y / b2Dzoom);
          }
          md.bodyA = b2Dworld.GetGroundBody();
          md.collideConnected = true;
          md.maxForce = 300.0 * body.GetMass();
          break;
      }

      //md.collideConnected = true;
      //md.maxForce = 300.0 * body.GetMass();
      var joint = b2Dworld.CreateJoint(md);
      if (bodyID.length > 0) {
        body.SetAwake(true);
      }
      if (bodyID2.length > 0) {
        body2.SetAwake(true);
      }

      if (jName.length == 0) jName = '_' + (++ujid_seq);
      joints[jName] = joint;
    }

    destroyJoint(args) {
      var joint = joints[args.JOINTID];
      if (joint) {
        b2Dworld.DestroyJoint(joint);
        delete joints[args.JOINTID];
      }
    }

    setJointAttr(args) {
      var attr = args.JOINTATTR;
      var jointID = args.JOINTID;
      var val = args.VALUE;

      // JointAttr: ['Motor On','Motor Speed','Max Torque', 'Limits On','Lower Limit','Upper Limit'],
      var jointids = jointID.split(' ');
      for (var i = 0; i < jointids.length; i++) {
        var joint = joints[jointids[i]];
        if (joint) {
          try {
            switch (attr) {
              case 'Motor On': joint.EnableMotor(val > 0); break;
              case 'Motor Speed': joint.SetMotorSpeed(val); break;
              case 'Max Torque': joint.SetMaxMotorTorque(val); break;

              case 'Limits On': joint.EnableLimit(val > 0); break;

              case 'Lower Limit': joint.SetLimits(joint.GetJointAngle() + val * toRad, joint.GetUpperLimit()); break;
              case 'Upper Limit': joint.SetLimits(joint.GetLowerLimit(), joint.GetJointAngle() + val * toRad); break;
            }
          } catch (error) {
            switch (attr) {
              case 'Lower Limit': joint.GetLowerLimit().Set(new b2Vec2(val, val)); joint.SetLimits(); break;
              case 'Upper Limit': joint.GetUpperLimit().Set(new b2Vec2(val, val)); joint.SetLimits(); break;
            }
          }
        }
      }
    }

    getJointAttr(args) {
      var attr = args.JOINTATTRREAD;
      var jointID = args.JOINTID;

      // JointAttrRead: ['Angle','Speed','Motor Torque', 'Reaction Torque'],
      var joint = joints[jointID];
      if (joint) {
        try {
          switch (attr) {
            case 'Angle': return joint.GetJointAngle() / toRad;
            case 'Speed': return joint.GetJointSpeed();
            case 'Motor Torque': return joint.GetMotorTorque();
            case 'Reaction Torque': return joint.GetReactionTorque();

            case 'Tension':
              var force = joint.GetReactionForce(1);
              var tension = Math.sqrt(force.x * force.x + force.y * force.y);
              if (!joint.GetBodyA().IsAwake() && !joint.GetBodyB().IsAwake()) {
                tension = 0;
              }
              return Math.floor(tension * 100) / 10;

            // Sliders only
            case 'Lower Limit': return joint.GetLowerLimit();
            case 'Upper Limit': return joint.GetUpperLimit();
          }
        } catch (error) {
          return '';
        }
      }
    }

    setsimspeed(args) {
      simspeed = args.VALUE;
    }

    getsimspeed() {
      return simspeed;
    }

    physoptions(args) {
      b2Dworld.SetContinuousPhysics(args.CONPHYS);
      b2Dworld.SetWarmStarting(args.WARMSTART);
      positerations = args.POS;
      if (positerations <= 0) {
        positerations = 0.0001;
      }
      veliterations = args.VEL;
      if (veliterations <= 0) {
        veliterations = 0.0001;
      }
    }

    stepSimulation() {
      var secondsimspeed = Math.abs(simspeed + 29);
      if (secondsimspeed == 0) { secondsimspeed = 1 };

      b2Dworld.Step(1 / secondsimspeed, veliterations, positerations);
      b2Dworld.ClearForces();
    }
  }

  /* Incoming ugly hack
   * (I pasted the whole box2D lib into here)
   \\ 
    * Copyright (c) 2006-2007 Erin Catto http://www.gphysics.com
    * This software is provided 'as-is', without any express or implied
    * warranty.  In no event will the authors be held liable for any damages
    * arising from the use of this software.
    * Permission is granted to anyone to use this software for any purpose,
    * including commercial applications, and to alter it and redistribute it
    * freely, subject to the following restrictions:
    * 1. The origin of this software must not be misrepresented; you must not
    * claim that you wrote the original software. If you use this software
    * in a product, an acknowledgment in the product documentation would be
    * appreciated but is not required.
    * 2. Altered source versions must be plainly marked as such, and must not be
    * misrepresented as being the original software.
    * 3. This notice may not be removed or altered from any source distribution.
    | /// https://www.npmjs.com/package/box2d-es6 (the lib by itself)
    */// Prepare for 90% of this extensions code: the box2D_es6 lib.

  'use strict';

  let Box2D = {};

  (((a2j, undefined) => {

    a2j.generateCallback = function generateCallback(context, cb) {
      return function() {
        cb.apply(context, arguments);
      };
    };

    a2j.NVector = function NVector(length) {
      if (length === undefined) length = 0;
      const tmp = new Array(length || 0);
      for (let i = 0; i < length; ++i) { tmp[i] = 0; }
      return tmp;
    };

    a2j.is = function is(o1, o2) {
      if (o1 === null) return false;
      if ((o2 instanceof Function) && (o1 instanceof o2)) return true;
      if ((o1.constructor.__implements != undefined) && (o1.constructor.__implements[o2])) return true;
      return false;
    };

    a2j.parseUInt = v => Math.abs(parseInt(v));
  }))(Box2D);

  // #TODO remove assignments from global namespace
  const Vector = Array;
  const Vector_a2j_Number = Box2D.NVector;
  // package structure
  if (typeof (Box2D) === 'undefined') Box2D = {};
  if (typeof (Box2D.Collision) === 'undefined') Box2D.Collision = {};
  if (typeof (Box2D.Collision.Shapes) === 'undefined') Box2D.Collision.Shapes = {};
  if (typeof (Box2D.Common) === 'undefined') Box2D.Common = {};
  if (typeof (Box2D.Common.Math) === 'undefined') Box2D.Common.Math = {};
  if (typeof (Box2D.Dynamics) === 'undefined') Box2D.Dynamics = {};
  if (typeof (Box2D.Dynamics.Contacts) === 'undefined') Box2D.Dynamics.Contacts = {};
  if (typeof (Box2D.Dynamics.Controllers) === 'undefined') Box2D.Dynamics.Controllers = {};
  if (typeof (Box2D.Dynamics.Joints) === 'undefined') Box2D.Dynamics.Joints = {};
  // pre-definitions
  ((() => {
    Box2D.Collision.IBroadPhase = 'Box2D.Collision.IBroadPhase';

    class b2AABB {
      constructor() {
        b2AABB.b2AABB.apply(this, arguments);
      }

      static b2AABB() {
        this.lowerBound = new b2Vec2();
        this.upperBound = new b2Vec2();
      }

      IsValid() {
        const dX = this.upperBound.x - this.lowerBound.x;
        const dY = this.upperBound.y - this.lowerBound.y;
        let valid = dX >= 0.0 && dY >= 0.0;
        valid = valid && this.lowerBound.IsValid() && this.upperBound.IsValid();
        return valid;
      }

      GetCenter() {
        return new b2Vec2((this.lowerBound.x + this.upperBound.x) / 2, (this.lowerBound.y + this.upperBound.y) / 2);
      }

      GetExtents() {
        return new b2Vec2((this.upperBound.x - this.lowerBound.x) / 2, (this.upperBound.y - this.lowerBound.y) / 2);
      }

      Contains(aabb) {
        let result = true;
        result = result && this.lowerBound.x <= aabb.lowerBound.x;
        result = result && this.lowerBound.y <= aabb.lowerBound.y;
        result = result && aabb.upperBound.x <= this.upperBound.x;
        result = result && aabb.upperBound.y <= this.upperBound.y;
        return result;
      }

      RayCast(output, input) {
        let tmin = (-Number.MAX_VALUE);
        let tmax = Number.MAX_VALUE;
        const pX = input.p1.x;
        const pY = input.p1.y;
        const dX = input.p2.x - input.p1.x;
        const dY = input.p2.y - input.p1.y;
        const absDX = Math.abs(dX);
        const absDY = Math.abs(dY);
        const normal = output.normal;
        let inv_d = 0;
        let t1 = 0;
        let t2 = 0;
        let t3 = 0;
        let s = 0; {
          if (absDX < Number.MIN_VALUE) {
            if (pX < this.lowerBound.x || this.upperBound.x < pX) return false;
          } else {
            inv_d = 1.0 / dX;
            t1 = (this.lowerBound.x - pX) * inv_d;
            t2 = (this.upperBound.x - pX) * inv_d;
            s = (-1.0);
            if (t1 > t2) {
              t3 = t1;
              t1 = t2;
              t2 = t3;
              s = 1.0;
            }
            if (t1 > tmin) {
              normal.x = s;
              normal.y = 0;
              tmin = t1;
            }
            tmax = Math.min(tmax, t2);
            if (tmin > tmax) return false;
          }
        } {
          if (absDY < Number.MIN_VALUE) {
            if (pY < this.lowerBound.y || this.upperBound.y < pY) return false;
          } else {
            inv_d = 1.0 / dY;
            t1 = (this.lowerBound.y - pY) * inv_d;
            t2 = (this.upperBound.y - pY) * inv_d;
            s = (-1.0);
            if (t1 > t2) {
              t3 = t1;
              t1 = t2;
              t2 = t3;
              s = 1.0;
            }
            if (t1 > tmin) {
              normal.y = s;
              normal.x = 0;
              tmin = t1;
            }
            tmax = Math.min(tmax, t2);
            if (tmin > tmax) return false;
          }
        }
        output.fraction = tmin;
        return true;
      }

      TestOverlap(other) {
        const d1X = other.lowerBound.x - this.upperBound.x;
        const d1Y = other.lowerBound.y - this.upperBound.y;
        const d2X = this.lowerBound.x - other.upperBound.x;
        const d2Y = this.lowerBound.y - other.upperBound.y;
        if (d1X > 0.0 || d1Y > 0.0) return false;
        if (d2X > 0.0 || d2Y > 0.0) return false;
        return true;
      }

      Combine(aabb1, aabb2) {
        this.lowerBound.x = Math.min(aabb1.lowerBound.x, aabb2.lowerBound.x);
        this.lowerBound.y = Math.min(aabb1.lowerBound.y, aabb2.lowerBound.y);
        this.upperBound.x = Math.max(aabb1.upperBound.x, aabb2.upperBound.x);
        this.upperBound.y = Math.max(aabb1.upperBound.y, aabb2.upperBound.y);
      }
    }

    Box2D.Collision.b2AABB = b2AABB;

    class b2Bound {
      constructor() {
        b2Bound.b2Bound.apply(this, arguments);
      }

      IsLower() {
        return (this.value & 1) == 0;
      }

      IsUpper() {
        return (this.value & 1) == 1;
      }

      Swap(b) {
        const tempValue = this.value;
        const tempProxy = this.proxy;
        const tempStabbingCount = this.stabbingCount;
        this.value = b.value;
        this.proxy = b.proxy;
        this.stabbingCount = b.stabbingCount;
        b.value = tempValue;
        b.proxy = tempProxy;
        b.stabbingCount = tempStabbingCount;
      }
    }

    Box2D.Collision.b2Bound = b2Bound;

    class b2BoundValues {
      constructor() {
        b2BoundValues.b2BoundValues.apply(this, arguments);
        if (this.constructor === b2BoundValues) this.b2BoundValues.apply(this, arguments);
      }

      b2BoundValues() {
        this.lowerValues = new Vector_a2j_Number();
        this.lowerValues[0] = 0.0;
        this.lowerValues[1] = 0.0;
        this.upperValues = new Vector_a2j_Number();
        this.upperValues[0] = 0.0;
        this.upperValues[1] = 0.0;
      }
    }

    Box2D.Collision.b2BoundValues = b2BoundValues;

    function b2Collision() {
      b2Collision.b2Collision.apply(this, arguments);
    }
    Box2D.Collision.b2Collision = b2Collision;

    class b2ContactID {
      constructor() {
        b2ContactID.b2ContactID.apply(this, arguments);
        if (this.constructor === b2ContactID) this.b2ContactID.apply(this, arguments);
      }

      static b2ContactID() {
        this.features = new Features();
      }

      b2ContactID() {
        this.features._m_id = this;
      }

      Set(id) {
        this.key = id._key;
      }

      Copy() {
        const id = new b2ContactID();
        id.key = this.key;
        return id;
      }

      get key() {
        return this._key;
      }

      set key(value) {
        if (value === undefined) value = 0;
        this._key = value;
        this.features._referenceEdge = this._key & 0x000000ff;
        this.features._incidentEdge = ((this._key & 0x0000ff00) >> 8) & 0x000000ff;
        this.features._incidentVertex = ((this._key & 0x00ff0000) >> 16) & 0x000000ff;
        this.features._flip = ((this._key & 0xff000000) >> 24) & 0x000000ff;
      }
    }

    Box2D.Collision.b2ContactID = b2ContactID;

    class b2ContactPoint {
      constructor() {
        b2ContactPoint.b2ContactPoint.apply(this, arguments);
      }

      static b2ContactPoint() {
        this.position = new b2Vec2();
        this.velocity = new b2Vec2();
        this.normal = new b2Vec2();
        this.id = new b2ContactID();
      }
    }

    Box2D.Collision.b2ContactPoint = b2ContactPoint;

    function b2Distance() {
      b2Distance.b2Distance.apply(this, arguments);
    }
    Box2D.Collision.b2Distance = b2Distance;

    function b2DistanceInput() {
      b2DistanceInput.b2DistanceInput.apply(this, arguments);
    }
    Box2D.Collision.b2DistanceInput = b2DistanceInput;

    class b2DistanceOutput {
      constructor() {
        b2DistanceOutput.b2DistanceOutput.apply(this, arguments);
      }

      static b2DistanceOutput() {
        this.pointA = new b2Vec2();
        this.pointB = new b2Vec2();
      }
    }

    Box2D.Collision.b2DistanceOutput = b2DistanceOutput;

    class b2DistanceProxy {
      constructor() {
        b2DistanceProxy.b2DistanceProxy.apply(this, arguments);
      }

      Set(shape) {
        switch (shape.GetType()) {
          case b2Shape.e_circleShape:
            {
              const circle = (shape instanceof b2CircleShape ? shape : null);
              this.m_vertices = new Vector(1, true);
              this.m_vertices[0] = circle.m_p;
              this.m_count = 1;
              this.m_radius = circle.m_radius;
            }
            break;
          case b2Shape.e_polygonShape:
            {
              const polygon = (shape instanceof b2PolygonShape ? shape : null);
              this.m_vertices = polygon.m_vertices;
              this.m_count = polygon.m_vertexCount;
              this.m_radius = polygon.m_radius;
            }
            break;
          default:
            b2Settings.b2Assert(false);
        }
      }

      GetSupport(d) {
        let bestIndex = 0;
        let bestValue = this.m_vertices[0].x * d.x + this.m_vertices[0].y * d.y;
        for (let i = 1; i < this.m_count; ++i) {
          const value = this.m_vertices[i].x * d.x + this.m_vertices[i].y * d.y;
          if (value > bestValue) {
            bestIndex = i;
            bestValue = value;
          }
        }
        return bestIndex;
      }

      GetSupportVertex(d) {
        let bestIndex = 0;
        let bestValue = this.m_vertices[0].x * d.x + this.m_vertices[0].y * d.y;
        for (let i = 1; i < this.m_count; ++i) {
          const value = this.m_vertices[i].x * d.x + this.m_vertices[i].y * d.y;
          if (value > bestValue) {
            bestIndex = i;
            bestValue = value;
          }
        }
        return this.m_vertices[bestIndex];
      }

      GetVertexCount() {
        return this.m_count;
      }

      GetVertex(index) {
        if (index === undefined) index = 0;
        b2Settings.b2Assert(index >= 0 && index < this.m_count);
        return this.m_vertices[index];
      }
    }

    Box2D.Collision.b2DistanceProxy = b2DistanceProxy;

    class b2DynamicTree {
      constructor() {
        b2DynamicTree.b2DynamicTree.apply(this, arguments);
        if (this.constructor === b2DynamicTree) this.b2DynamicTree.apply(this, arguments);
      }

      b2DynamicTree() {
        this.m_root = null;
        this.m_freeList = null;
        this.m_path = 0;
        this.m_insertionCount = 0;
      }

      CreateProxy(aabb, userData) {
        const node = this.AllocateNode();
        const extendX = b2Settings.b2_aabbExtension;
        const extendY = b2Settings.b2_aabbExtension;
        node.aabb.lowerBound.x = aabb.lowerBound.x - extendX;
        node.aabb.lowerBound.y = aabb.lowerBound.y - extendY;
        node.aabb.upperBound.x = aabb.upperBound.x + extendX;
        node.aabb.upperBound.y = aabb.upperBound.y + extendY;
        node.userData = userData;
        this.InsertLeaf(node);
        return node;
      }

      DestroyProxy(proxy) {
        this.RemoveLeaf(proxy);
        this.FreeNode(proxy);
      }

      MoveProxy(proxy, aabb, displacement) {
        b2Settings.b2Assert(proxy.IsLeaf());
        if (proxy.aabb.Contains(aabb)) {
          return false;
        }
        this.RemoveLeaf(proxy);
        const extendX = b2Settings.b2_aabbExtension + b2Settings.b2_aabbMultiplier * (displacement.x > 0 ? displacement.x : (-displacement.x));
        const extendY = b2Settings.b2_aabbExtension + b2Settings.b2_aabbMultiplier * (displacement.y > 0 ? displacement.y : (-displacement.y));
        proxy.aabb.lowerBound.x = aabb.lowerBound.x - extendX;
        proxy.aabb.lowerBound.y = aabb.lowerBound.y - extendY;
        proxy.aabb.upperBound.x = aabb.upperBound.x + extendX;
        proxy.aabb.upperBound.y = aabb.upperBound.y + extendY;
        this.InsertLeaf(proxy);
        return true;
      }

      Rebalance(iterations) {
        if (iterations === undefined) iterations = 0;
        if (this.m_root == null) return;
        for (let i = 0; i < iterations; i++) {
          let node = this.m_root;
          let bit = 0;
          while (node.IsLeaf() == false) {
            node = (this.m_path >> bit) & 1 ? node.child2 : node.child1;
            bit = (bit + 1) & 31;
          } ++this.m_path;
          this.RemoveLeaf(node);
          this.InsertLeaf(node);
        }
      }

      GetFatAABB(proxy) {
        return proxy.aabb;
      }

      GetUserData(proxy) {
        return proxy.userData;
      }

      Query(callback, aabb) {
        if (this.m_root == null) return;
        const stack = new Vector();
        let count = 0;
        stack[count++] = this.m_root;
        while (count > 0) {
          const node = stack[--count];
          if (node.aabb.TestOverlap(aabb)) {
            if (node.IsLeaf()) {
              const proceed = callback(node);
              if (!proceed) return;
            } else {
              stack[count++] = node.child1;
              stack[count++] = node.child2;
            }
          }
        }
      }

      RayCast(callback, input) {
        if (this.m_root == null) return;
        const p1 = input.p1;
        const p2 = input.p2;
        const r = b2Math.SubtractVV(p1, p2);
        r.Normalize();
        const v = b2Math.CrossFV(1.0, r);
        const abs_v = b2Math.AbsV(v);
        let maxFraction = input.maxFraction;
        const segmentAABB = new b2AABB();
        let tX = 0;
        let tY = 0; {
          tX = p1.x + maxFraction * (p2.x - p1.x);
          tY = p1.y + maxFraction * (p2.y - p1.y);
          segmentAABB.lowerBound.x = Math.min(p1.x, tX);
          segmentAABB.lowerBound.y = Math.min(p1.y, tY);
          segmentAABB.upperBound.x = Math.max(p1.x, tX);
          segmentAABB.upperBound.y = Math.max(p1.y, tY);
        }
        const stack = new Vector();
        let count = 0;
        stack[count++] = this.m_root;
        while (count > 0) {
          const node = stack[--count];
          if (node.aabb.TestOverlap(segmentAABB) == false) {
            continue;
          }
          const c = node.aabb.GetCenter();
          const h = node.aabb.GetExtents();
          const separation = Math.abs(v.x * (p1.x - c.x) + v.y * (p1.y - c.y)) - abs_v.x * h.x - abs_v.y * h.y;
          if (separation > 0.0) continue;
          if (node.IsLeaf()) {
            const subInput = new b2RayCastInput();
            subInput.p1 = input.p1;
            subInput.p2 = input.p2;
            subInput.maxFraction = input.maxFraction;
            maxFraction = callback(subInput, node);
            if (maxFraction == 0.0) return;
            if (maxFraction > 0.0) {
              tX = p1.x + maxFraction * (p2.x - p1.x);
              tY = p1.y + maxFraction * (p2.y - p1.y);
              segmentAABB.lowerBound.x = Math.min(p1.x, tX);
              segmentAABB.lowerBound.y = Math.min(p1.y, tY);
              segmentAABB.upperBound.x = Math.max(p1.x, tX);
              segmentAABB.upperBound.y = Math.max(p1.y, tY);
            }
          } else {
            stack[count++] = node.child1;
            stack[count++] = node.child2;
          }
        }
      }

      AllocateNode() {
        if (this.m_freeList) {
          const node = this.m_freeList;
          this.m_freeList = node.parent;
          node.parent = null;
          node.child1 = null;
          node.child2 = null;
          return node;
        }
        return new b2DynamicTreeNode();
      }

      FreeNode(node) {
        node.parent = this.m_freeList;
        this.m_freeList = node;
      }

      InsertLeaf(leaf) {
        ++this.m_insertionCount;
        if (this.m_root == null) {
          this.m_root = leaf;
          this.m_root.parent = null;
          return;
        }
        const center = leaf.aabb.GetCenter();
        let sibling = this.m_root;
        if (sibling.IsLeaf() == false) {
          do {
            const child1 = sibling.child1;
            const child2 = sibling.child2;
            const norm1 = Math.abs((child1.aabb.lowerBound.x + child1.aabb.upperBound.x) / 2 - center.x) + Math.abs((child1.aabb.lowerBound.y + child1.aabb.upperBound.y) / 2 - center.y);
            const norm2 = Math.abs((child2.aabb.lowerBound.x + child2.aabb.upperBound.x) / 2 - center.x) + Math.abs((child2.aabb.lowerBound.y + child2.aabb.upperBound.y) / 2 - center.y);
            if (norm1 < norm2) {
              sibling = child1;
            } else {
              sibling = child2;
            }
          }
          while (sibling.IsLeaf() == false);
        }
        let node1 = sibling.parent;
        let node2 = this.AllocateNode();
        node2.parent = node1;
        node2.userData = null;
        node2.aabb.Combine(leaf.aabb, sibling.aabb);
        if (node1) {
          if (sibling.parent.child1 == sibling) {
            node1.child1 = node2;
          } else {
            node1.child2 = node2;
          }
          node2.child1 = sibling;
          node2.child2 = leaf;
          sibling.parent = node2;
          leaf.parent = node2;
          do {
            if (node1.aabb.Contains(node2.aabb)) break;
            node1.aabb.Combine(node1.child1.aabb, node1.child2.aabb);
            node2 = node1;
            node1 = node1.parent;
          }
          while (node1);
        } else {
          node2.child1 = sibling;
          node2.child2 = leaf;
          sibling.parent = node2;
          leaf.parent = node2;
          this.m_root = node2;
        }
      }

      RemoveLeaf(leaf) {
        if (leaf == this.m_root) {
          this.m_root = null;
          return;
        }
        const node2 = leaf.parent;
        let node1 = node2.parent;
        let sibling;
        if (node2.child1 == leaf) {
          sibling = node2.child2;
        } else {
          sibling = node2.child1;
        }
        if (node1) {
          if (node1.child1 == node2) {
            node1.child1 = sibling;
          } else {
            node1.child2 = sibling;
          }
          sibling.parent = node1;
          this.FreeNode(node2);
          while (node1) {
            const oldAABB = node1.aabb;
            node1.aabb = b2AABB.Combine(node1.child1.aabb, node1.child2.aabb);
            if (oldAABB.Contains(node1.aabb)) break;
            node1 = node1.parent;
          }
        } else {
          this.m_root = sibling;
          sibling.parent = null;
          this.FreeNode(node2);
        }
      }
    }

    Box2D.Collision.b2DynamicTree = b2DynamicTree;

    class b2DynamicTreeBroadPhase {
      constructor() {
        b2DynamicTreeBroadPhase.b2DynamicTreeBroadPhase.apply(this, arguments);
      }

      static b2DynamicTreeBroadPhase() {
        this.m_tree = new b2DynamicTree();
        this.m_moveBuffer = new Vector();
        this.m_pairBuffer = new Vector();
        this.m_pairCount = 0;
      }

      CreateProxy(aabb, userData) {
        const proxy = this.m_tree.CreateProxy(aabb, userData);
        ++this.m_proxyCount;
        this.BufferMove(proxy);
        return proxy;
      }

      DestroyProxy(proxy) {
        this.UnBufferMove(proxy);
        --this.m_proxyCount;
        this.m_tree.DestroyProxy(proxy);
      }

      MoveProxy(proxy, aabb, displacement) {
        const buffer = this.m_tree.MoveProxy(proxy, aabb, displacement);
        if (buffer) {
          this.BufferMove(proxy);
        }
      }

      TestOverlap(proxyA, proxyB) {
        const aabbA = this.m_tree.GetFatAABB(proxyA);
        const aabbB = this.m_tree.GetFatAABB(proxyB);
        return aabbA.TestOverlap(aabbB);
      }

      GetUserData(proxy) {
        return this.m_tree.GetUserData(proxy);
      }

      GetFatAABB(proxy) {
        return this.m_tree.GetFatAABB(proxy);
      }

      GetProxyCount() {
        return this.m_proxyCount;
      }

      UpdatePairs(callback) {
        const __this = this;
        __this.m_pairCount = 0;
        var i = 0;
        let queryProxy;
        function QueryCallback(proxy) {
          if (proxy == queryProxy) return true;
          if (__this.m_pairCount == __this.m_pairBuffer.length) {
            __this.m_pairBuffer[__this.m_pairCount] = new b2DynamicTreePair();
          }
          const pair = __this.m_pairBuffer[__this.m_pairCount];
          pair.proxyA = proxy < queryProxy ? proxy : queryProxy;
          pair.proxyB = proxy >= queryProxy ? proxy : queryProxy; ++__this.m_pairCount;
          return true;
        }
        for (i = 0;
          i < __this.m_moveBuffer.length; ++i) {
          queryProxy = __this.m_moveBuffer[i];
          const fatAABB = __this.m_tree.GetFatAABB(queryProxy);
          __this.m_tree.Query(QueryCallback, fatAABB);
        }
        __this.m_moveBuffer.length = 0;
        for (var i = 0; i < __this.m_pairCount;) {
          const primaryPair = __this.m_pairBuffer[i];
          const userDataA = __this.m_tree.GetUserData(primaryPair.proxyA);
          const userDataB = __this.m_tree.GetUserData(primaryPair.proxyB);
          callback(userDataA, userDataB);
          ++i;
          while (i < __this.m_pairCount) {
            const pair = __this.m_pairBuffer[i];
            if (pair.proxyA != primaryPair.proxyA || pair.proxyB != primaryPair.proxyB) {
              break;
            } ++i;
          }
        }
      }

      Query(callback, aabb) {
        this.m_tree.Query(callback, aabb);
      }

      RayCast(callback, input) {
        this.m_tree.RayCast(callback, input);
      }

      Validate() { }

      Rebalance(iterations) {
        if (iterations === undefined) iterations = 0;
        this.m_tree.Rebalance(iterations);
      }

      BufferMove(proxy) {
        this.m_moveBuffer[this.m_moveBuffer.length] = proxy;
      }

      UnBufferMove(proxy) {
        const i = parseInt(this.m_moveBuffer.indexOf(proxy));
        this.m_moveBuffer.splice(i, 1);
      }

      ComparePairs(pair1, pair2) {
        return 0;
      }
    }

    Box2D.Collision.b2DynamicTreeBroadPhase = b2DynamicTreeBroadPhase;

    class b2DynamicTreeNode {
      constructor() {
        b2DynamicTreeNode.b2DynamicTreeNode.apply(this, arguments);
      }

      static b2DynamicTreeNode() {
        this.aabb = new b2AABB();
      }

      IsLeaf() {
        return this.child1 == null;
      }
    }

    Box2D.Collision.b2DynamicTreeNode = b2DynamicTreeNode;

    function b2DynamicTreePair() {
      b2DynamicTreePair.b2DynamicTreePair.apply(this, arguments);
    }
    Box2D.Collision.b2DynamicTreePair = b2DynamicTreePair;

    class b2Manifold {
      constructor() {
        b2Manifold.b2Manifold.apply(this, arguments);
        if (this.constructor === b2Manifold) this.b2Manifold.apply(this, arguments);
      }

      static b2Manifold() {
        this.m_pointCount = 0;
      }

      b2Manifold() {
        this.m_points = new Vector(b2Settings.b2_maxManifoldPoints);
        for (let i = 0; i < b2Settings.b2_maxManifoldPoints; i++) {
          this.m_points[i] = new b2ManifoldPoint();
        }
        this.m_localPlaneNormal = new b2Vec2();
        this.m_localPoint = new b2Vec2();
      }

      Reset() {
        for (let i = 0; i < b2Settings.b2_maxManifoldPoints; i++) {
          ((this.m_points[i] instanceof b2ManifoldPoint ? this.m_points[i] : null)).Reset();
        }
        this.m_localPlaneNormal.SetZero();
        this.m_localPoint.SetZero();
        this.m_type = 0;
        this.m_pointCount = 0;
      }

      Set(m) {
        this.m_pointCount = m.m_pointCount;
        for (let i = 0; i < b2Settings.b2_maxManifoldPoints; i++) {
          ((this.m_points[i] instanceof b2ManifoldPoint ? this.m_points[i] : null)).Set(m.m_points[i]);
        }
        this.m_localPlaneNormal.SetV(m.m_localPlaneNormal);
        this.m_localPoint.SetV(m.m_localPoint);
        this.m_type = m.m_type;
      }

      Copy() {
        const copy = new b2Manifold();
        copy.Set(this);
        return copy;
      }
    }

    Box2D.Collision.b2Manifold = b2Manifold;

    class b2ManifoldPoint {
      constructor() {
        b2ManifoldPoint.b2ManifoldPoint.apply(this, arguments);
        if (this.constructor === b2ManifoldPoint) this.b2ManifoldPoint.apply(this, arguments);
      }

      static b2ManifoldPoint() {
        this.m_localPoint = new b2Vec2();
        this.m_id = new b2ContactID();
      }

      b2ManifoldPoint() {
        this.Reset();
      }

      Reset() {
        this.m_localPoint.SetZero();
        this.m_normalImpulse = 0.0;
        this.m_tangentImpulse = 0.0;
        this.m_id.key = 0;
      }

      Set(m) {
        this.m_localPoint.SetV(m.m_localPoint);
        this.m_normalImpulse = m.m_normalImpulse;
        this.m_tangentImpulse = m.m_tangentImpulse;
        this.m_id.Set(m.m_id);
      }
    }

    Box2D.Collision.b2ManifoldPoint = b2ManifoldPoint;

    class b2Point {
      constructor() {
        b2Point.b2Point.apply(this, arguments);
      }

      static b2Point() {
        this.p = new b2Vec2();
      }

      Support(xf, vX, vY) {
        if (vX === undefined) vX = 0;
        if (vY === undefined) vY = 0;
        return this.p;
      }

      GetFirstVertex(xf) {
        return this.p;
      }
    }

    Box2D.Collision.b2Point = b2Point;

    class b2RayCastInput {
      constructor() {
        b2RayCastInput.b2RayCastInput.apply(this, arguments);
        if (this.constructor === b2RayCastInput) this.b2RayCastInput.apply(this, arguments);
      }

      static b2RayCastInput() {
        this.p1 = new b2Vec2();
        this.p2 = new b2Vec2();
      }

      b2RayCastInput(p1, p2, maxFraction) {
        if (p1 === undefined) p1 = null;
        if (p2 === undefined) p2 = null;
        if (maxFraction === undefined) maxFraction = 1;
        if (p1) this.p1.SetV(p1);
        if (p2) this.p2.SetV(p2);
        this.maxFraction = maxFraction;
      }
    }

    Box2D.Collision.b2RayCastInput = b2RayCastInput;

    class b2RayCastOutput {
      constructor() {
        b2RayCastOutput.b2RayCastOutput.apply(this, arguments);
      }

      static b2RayCastOutput() {
        this.normal = new b2Vec2();
      }
    }

    Box2D.Collision.b2RayCastOutput = b2RayCastOutput;

    class b2Segment {
      constructor() {
        b2Segment.b2Segment.apply(this, arguments);
      }

      static b2Segment() {
        this.p1 = new b2Vec2();
        this.p2 = new b2Vec2();
      }

      TestSegment(lambda, normal, segment, maxLambda) {
        if (maxLambda === undefined) maxLambda = 0;
        const s = segment.p1;
        const rX = segment.p2.x - s.x;
        const rY = segment.p2.y - s.y;
        const dX = this.p2.x - this.p1.x;
        const dY = this.p2.y - this.p1.y;
        let nX = dY;
        let nY = (-dX);
        const k_slop = 100.0 * Number.MIN_VALUE;
        const denom = (-(rX * nX + rY * nY));
        if (denom > k_slop) {
          const bX = s.x - this.p1.x;
          const bY = s.y - this.p1.y;
          let a = (bX * nX + bY * nY);
          if (a >= 0.0 && a <= maxLambda * denom) {
            const mu2 = (-rX * bY) + rY * bX;
            if ((-k_slop * denom) <= mu2 && mu2 <= denom * (1.0 + k_slop)) {
              a /= denom;
              const nLen = Math.sqrt(nX * nX + nY * nY);
              nX /= nLen;
              nY /= nLen;
              lambda[0] = a;
              normal.Set(nX, nY);
              return true;
            }
          }
        }
        return false;
      }

      Extend(aabb) {
        this.ExtendForward(aabb);
        this.ExtendBackward(aabb);
      }

      ExtendForward(aabb) {
        const dX = this.p2.x - this.p1.x;
        const dY = this.p2.y - this.p1.y;
        const lambda = Math.min(dX > 0 ? (aabb.upperBound.x - this.p1.x) / dX : dX < 0 ? (aabb.lowerBound.x - this.p1.x) / dX : Number.POSITIVE_INFINITY,
          dY > 0 ? (aabb.upperBound.y - this.p1.y) / dY : dY < 0 ? (aabb.lowerBound.y - this.p1.y) / dY : Number.POSITIVE_INFINITY);
        this.p2.x = this.p1.x + dX * lambda;
        this.p2.y = this.p1.y + dY * lambda;
      }

      ExtendBackward(aabb) {
        const dX = (-this.p2.x) + this.p1.x;
        const dY = (-this.p2.y) + this.p1.y;
        const lambda = Math.min(dX > 0 ? (aabb.upperBound.x - this.p2.x) / dX : dX < 0 ? (aabb.lowerBound.x - this.p2.x) / dX : Number.POSITIVE_INFINITY,
          dY > 0 ? (aabb.upperBound.y - this.p2.y) / dY : dY < 0 ? (aabb.lowerBound.y - this.p2.y) / dY : Number.POSITIVE_INFINITY);
        this.p1.x = this.p2.x + dX * lambda;
        this.p1.y = this.p2.y + dY * lambda;
      }
    }

    Box2D.Collision.b2Segment = b2Segment;

    class b2SeparationFunction {
      constructor() {
        b2SeparationFunction.b2SeparationFunction.apply(this, arguments);
      }

      static b2SeparationFunction() {
        this.m_localPoint = new b2Vec2();
        this.m_axis = new b2Vec2();
      }

      Initialize(cache, proxyA, transformA, proxyB, transformB) {
        this.m_proxyA = proxyA;
        this.m_proxyB = proxyB;
        const count = parseInt(cache.count);
        b2Settings.b2Assert(count > 0 && count < 3);
        let localPointA;
        let localPointA1;
        let localPointA2;
        let localPointB;
        let localPointB1;
        let localPointB2;
        let pointAX = 0;
        let pointAY = 0;
        let pointBX = 0;
        let pointBY = 0;
        let normalX = 0;
        let normalY = 0;
        let tMat;
        let tVec;
        let s = 0;
        let sgn = 0;
        if (count == 1) {
          this.m_type = b2SeparationFunction.e_points;
          localPointA = this.m_proxyA.GetVertex(cache.indexA[0]);
          localPointB = this.m_proxyB.GetVertex(cache.indexB[0]);
          tVec = localPointA;
          tMat = transformA.R;
          pointAX = transformA.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
          pointAY = transformA.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
          tVec = localPointB;
          tMat = transformB.R;
          pointBX = transformB.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
          pointBY = transformB.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
          this.m_axis.x = pointBX - pointAX;
          this.m_axis.y = pointBY - pointAY;
          this.m_axis.Normalize();
        } else if (cache.indexB[0] == cache.indexB[1]) {
          this.m_type = b2SeparationFunction.e_faceA;
          localPointA1 = this.m_proxyA.GetVertex(cache.indexA[0]);
          localPointA2 = this.m_proxyA.GetVertex(cache.indexA[1]);
          localPointB = this.m_proxyB.GetVertex(cache.indexB[0]);
          this.m_localPoint.x = 0.5 * (localPointA1.x + localPointA2.x);
          this.m_localPoint.y = 0.5 * (localPointA1.y + localPointA2.y);
          this.m_axis = b2Math.CrossVF(b2Math.SubtractVV(localPointA2, localPointA1), 1.0);
          this.m_axis.Normalize();
          tVec = this.m_axis;
          tMat = transformA.R;
          normalX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
          normalY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
          tVec = this.m_localPoint;
          tMat = transformA.R;
          pointAX = transformA.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
          pointAY = transformA.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
          tVec = localPointB;
          tMat = transformB.R;
          pointBX = transformB.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
          pointBY = transformB.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
          s = (pointBX - pointAX) * normalX + (pointBY - pointAY) * normalY;
          if (s < 0.0) {
            this.m_axis.NegativeSelf();
          }
        } else if (cache.indexA[0] == cache.indexA[0]) {
          this.m_type = b2SeparationFunction.e_faceB;
          localPointB1 = this.m_proxyB.GetVertex(cache.indexB[0]);
          localPointB2 = this.m_proxyB.GetVertex(cache.indexB[1]);
          localPointA = this.m_proxyA.GetVertex(cache.indexA[0]);
          this.m_localPoint.x = 0.5 * (localPointB1.x + localPointB2.x);
          this.m_localPoint.y = 0.5 * (localPointB1.y + localPointB2.y);
          this.m_axis = b2Math.CrossVF(b2Math.SubtractVV(localPointB2, localPointB1), 1.0);
          this.m_axis.Normalize();
          tVec = this.m_axis;
          tMat = transformB.R;
          normalX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
          normalY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
          tVec = this.m_localPoint;
          tMat = transformB.R;
          pointBX = transformB.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
          pointBY = transformB.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
          tVec = localPointA;
          tMat = transformA.R;
          pointAX = transformA.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
          pointAY = transformA.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
          s = (pointAX - pointBX) * normalX + (pointAY - pointBY) * normalY;
          if (s < 0.0) {
            this.m_axis.NegativeSelf();
          }
        } else {
          localPointA1 = this.m_proxyA.GetVertex(cache.indexA[0]);
          localPointA2 = this.m_proxyA.GetVertex(cache.indexA[1]);
          localPointB1 = this.m_proxyB.GetVertex(cache.indexB[0]);
          localPointB2 = this.m_proxyB.GetVertex(cache.indexB[1]);
          const pA = b2Math.MulX(transformA, localPointA);
          const dA = b2Math.MulMV(transformA.R, b2Math.SubtractVV(localPointA2, localPointA1));
          const pB = b2Math.MulX(transformB, localPointB);
          const dB = b2Math.MulMV(transformB.R, b2Math.SubtractVV(localPointB2, localPointB1));
          const a = dA.x * dA.x + dA.y * dA.y;
          const e = dB.x * dB.x + dB.y * dB.y;
          const r = b2Math.SubtractVV(dB, dA);
          const c = dA.x * r.x + dA.y * r.y;
          const f = dB.x * r.x + dB.y * r.y;
          const b = dA.x * dB.x + dA.y * dB.y;
          const denom = a * e - b * b;
          s = 0.0;
          if (denom != 0.0) {
            s = b2Math.Clamp((b * f - c * e) / denom, 0.0, 1.0);
          }
          let t = (b * s + f) / e;
          if (t < 0.0) {
            t = 0.0;
            s = b2Math.Clamp((b - c) / a, 0.0, 1.0);
          }
          localPointA = new b2Vec2();
          localPointA.x = localPointA1.x + s * (localPointA2.x - localPointA1.x);
          localPointA.y = localPointA1.y + s * (localPointA2.y - localPointA1.y);
          localPointB = new b2Vec2();
          localPointB.x = localPointB1.x + s * (localPointB2.x - localPointB1.x);
          localPointB.y = localPointB1.y + s * (localPointB2.y - localPointB1.y);
          if (s == 0.0 || s == 1.0) {
            this.m_type = b2SeparationFunction.e_faceB;
            this.m_axis = b2Math.CrossVF(b2Math.SubtractVV(localPointB2, localPointB1), 1.0);
            this.m_axis.Normalize();
            this.m_localPoint = localPointB;
            tVec = this.m_axis;
            tMat = transformB.R;
            normalX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
            normalY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
            tVec = this.m_localPoint;
            tMat = transformB.R;
            pointBX = transformB.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
            pointBY = transformB.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
            tVec = localPointA;
            tMat = transformA.R;
            pointAX = transformA.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
            pointAY = transformA.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
            sgn = (pointAX - pointBX) * normalX + (pointAY - pointBY) * normalY;
            if (s < 0.0) {
              this.m_axis.NegativeSelf();
            }
          } else {
            this.m_type = b2SeparationFunction.e_faceA;
            this.m_axis = b2Math.CrossVF(b2Math.SubtractVV(localPointA2, localPointA1), 1.0);
            this.m_localPoint = localPointA;
            tVec = this.m_axis;
            tMat = transformA.R;
            normalX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
            normalY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
            tVec = this.m_localPoint;
            tMat = transformA.R;
            pointAX = transformA.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
            pointAY = transformA.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
            tVec = localPointB;
            tMat = transformB.R;
            pointBX = transformB.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
            pointBY = transformB.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
            sgn = (pointBX - pointAX) * normalX + (pointBY - pointAY) * normalY;
            if (s < 0.0) {
              this.m_axis.NegativeSelf();
            }
          }
        }
      }

      Evaluate(transformA, transformB) {
        let axisA;
        let axisB;
        let localPointA;
        let localPointB;
        let pointA;
        let pointB;
        let seperation = 0;
        let normal;
        switch (this.m_type) {
          case b2SeparationFunction.e_points:
            {
              axisA = b2Math.MulTMV(transformA.R, this.m_axis);
              axisB = b2Math.MulTMV(transformB.R, this.m_axis.GetNegative());
              localPointA = this.m_proxyA.GetSupportVertex(axisA);
              localPointB = this.m_proxyB.GetSupportVertex(axisB);
              pointA = b2Math.MulX(transformA, localPointA);
              pointB = b2Math.MulX(transformB, localPointB);
              seperation = (pointB.x - pointA.x) * this.m_axis.x + (pointB.y - pointA.y) * this.m_axis.y;
              return seperation;
            }
          case b2SeparationFunction.e_faceA:
            {
              normal = b2Math.MulMV(transformA.R, this.m_axis);
              pointA = b2Math.MulX(transformA, this.m_localPoint);
              axisB = b2Math.MulTMV(transformB.R, normal.GetNegative());
              localPointB = this.m_proxyB.GetSupportVertex(axisB);
              pointB = b2Math.MulX(transformB, localPointB);
              seperation = (pointB.x - pointA.x) * normal.x + (pointB.y - pointA.y) * normal.y;
              return seperation;
            }
          case b2SeparationFunction.e_faceB:
            {
              normal = b2Math.MulMV(transformB.R, this.m_axis);
              pointB = b2Math.MulX(transformB, this.m_localPoint);
              axisA = b2Math.MulTMV(transformA.R, normal.GetNegative());
              localPointA = this.m_proxyA.GetSupportVertex(axisA);
              pointA = b2Math.MulX(transformA, localPointA);
              seperation = (pointA.x - pointB.x) * normal.x + (pointA.y - pointB.y) * normal.y;
              return seperation;
            }
          default:
            b2Settings.b2Assert(false);
            return 0.0;
        }
      }
    }

    Box2D.Collision.b2SeparationFunction = b2SeparationFunction;

    class b2Simplex {
      constructor() {
        b2Simplex.b2Simplex.apply(this, arguments);
        if (this.constructor === b2Simplex) this.b2Simplex.apply(this, arguments);
      }

      static b2Simplex() {
        this.m_v1 = new b2SimplexVertex();
        this.m_v2 = new b2SimplexVertex();
        this.m_v3 = new b2SimplexVertex();
        this.m_vertices = new Vector(3);
      }

      b2Simplex() {
        this.m_vertices[0] = this.m_v1;
        this.m_vertices[1] = this.m_v2;
        this.m_vertices[2] = this.m_v3;
      }

      ReadCache(cache, proxyA, transformA, proxyB, transformB) {
        b2Settings.b2Assert(cache.count >= 0 && cache.count <= 3);
        let wALocal;
        let wBLocal;
        this.m_count = cache.count;
        const vertices = this.m_vertices;
        for (let i = 0; i < this.m_count; i++) {
          var v = vertices[i];
          v.indexA = cache.indexA[i];
          v.indexB = cache.indexB[i];
          wALocal = proxyA.GetVertex(v.indexA);
          wBLocal = proxyB.GetVertex(v.indexB);
          v.wA = b2Math.MulX(transformA, wALocal);
          v.wB = b2Math.MulX(transformB, wBLocal);
          v.w = b2Math.SubtractVV(v.wB, v.wA);
          v.a = 0;
        }
        if (this.m_count > 1) {
          const metric1 = cache.metric;
          const metric2 = this.GetMetric();
          if (metric2 < 0.5 * metric1 || 2.0 * metric1 < metric2 || metric2 < Number.MIN_VALUE) {
            this.m_count = 0;
          }
        }
        if (this.m_count == 0) {
          v = vertices[0];
          v.indexA = 0;
          v.indexB = 0;
          wALocal = proxyA.GetVertex(0);
          wBLocal = proxyB.GetVertex(0);
          v.wA = b2Math.MulX(transformA, wALocal);
          v.wB = b2Math.MulX(transformB, wBLocal);
          v.w = b2Math.SubtractVV(v.wB, v.wA);
          this.m_count = 1;
        }
      }

      WriteCache(cache) {
        cache.metric = this.GetMetric();
        cache.count = Box2D.parseUInt(this.m_count);
        const vertices = this.m_vertices;
        for (let i = 0; i < this.m_count; i++) {
          cache.indexA[i] = Box2D.parseUInt(vertices[i].indexA);
          cache.indexB[i] = Box2D.parseUInt(vertices[i].indexB);
        }
      }

      GetSearchDirection() {
        switch (this.m_count) {
          case 1:
            return this.m_v1.w.GetNegative();
          case 2:
            {
              const e12 = b2Math.SubtractVV(this.m_v2.w, this.m_v1.w);
              const sgn = b2Math.CrossVV(e12, this.m_v1.w.GetNegative());
              if (sgn > 0.0) {
                return b2Math.CrossFV(1.0, e12);
              } else {
                return b2Math.CrossVF(e12, 1.0);
              }
            }
          default:
            b2Settings.b2Assert(false);
            return new b2Vec2();
        }
      }

      GetClosestPoint() {
        switch (this.m_count) {
          case 0:
            b2Settings.b2Assert(false);
            return new b2Vec2();
          case 1:
            return this.m_v1.w;
          case 2:
            return new b2Vec2(this.m_v1.a * this.m_v1.w.x + this.m_v2.a * this.m_v2.w.x, this.m_v1.a * this.m_v1.w.y + this.m_v2.a * this.m_v2.w.y);
          default:
            b2Settings.b2Assert(false);
            return new b2Vec2();
        }
      }

      GetWitnessPoints(pA, pB) {
        switch (this.m_count) {
          case 0:
            b2Settings.b2Assert(false);
            break;
          case 1:
            pA.SetV(this.m_v1.wA);
            pB.SetV(this.m_v1.wB);
            break;
          case 2:
            pA.x = this.m_v1.a * this.m_v1.wA.x + this.m_v2.a * this.m_v2.wA.x;
            pA.y = this.m_v1.a * this.m_v1.wA.y + this.m_v2.a * this.m_v2.wA.y;
            pB.x = this.m_v1.a * this.m_v1.wB.x + this.m_v2.a * this.m_v2.wB.x;
            pB.y = this.m_v1.a * this.m_v1.wB.y + this.m_v2.a * this.m_v2.wB.y;
            break;
          case 3:
            pB.x = pA.x = this.m_v1.a * this.m_v1.wA.x + this.m_v2.a * this.m_v2.wA.x + this.m_v3.a * this.m_v3.wA.x;
            pB.y = pA.y = this.m_v1.a * this.m_v1.wA.y + this.m_v2.a * this.m_v2.wA.y + this.m_v3.a * this.m_v3.wA.y;
            break;
          default:
            b2Settings.b2Assert(false);
            break;
        }
      }

      GetMetric() {
        switch (this.m_count) {
          case 0:
            b2Settings.b2Assert(false);
            return 0.0;
          case 1:
            return 0.0;
          case 2:
            return b2Math.SubtractVV(this.m_v1.w, this.m_v2.w).Length();
          case 3:
            return b2Math.CrossVV(b2Math.SubtractVV(this.m_v2.w, this.m_v1.w), b2Math.SubtractVV(this.m_v3.w, this.m_v1.w));
          default:
            b2Settings.b2Assert(false);
            return 0.0;
        }
      }

      Solve2() {
        const w1 = this.m_v1.w;
        const w2 = this.m_v2.w;
        const e12 = b2Math.SubtractVV(w2, w1);
        const d12_2 = (-(w1.x * e12.x + w1.y * e12.y));
        if (d12_2 <= 0.0) {
          this.m_v1.a = 1.0;
          this.m_count = 1;
          return;
        }
        const d12_1 = (w2.x * e12.x + w2.y * e12.y);
        if (d12_1 <= 0.0) {
          this.m_v2.a = 1.0;
          this.m_count = 1;
          this.m_v1.Set(this.m_v2);
          return;
        }
        const inv_d12 = 1.0 / (d12_1 + d12_2);
        this.m_v1.a = d12_1 * inv_d12;
        this.m_v2.a = d12_2 * inv_d12;
        this.m_count = 2;
      }

      Solve3() {
        const w1 = this.m_v1.w;
        const w2 = this.m_v2.w;
        const w3 = this.m_v3.w;
        const e12 = b2Math.SubtractVV(w2, w1);
        const w1e12 = b2Math.Dot(w1, e12);
        const w2e12 = b2Math.Dot(w2, e12);
        const d12_1 = w2e12;
        const d12_2 = (-w1e12);
        const e13 = b2Math.SubtractVV(w3, w1);
        const w1e13 = b2Math.Dot(w1, e13);
        const w3e13 = b2Math.Dot(w3, e13);
        const d13_1 = w3e13;
        const d13_2 = (-w1e13);
        const e23 = b2Math.SubtractVV(w3, w2);
        const w2e23 = b2Math.Dot(w2, e23);
        const w3e23 = b2Math.Dot(w3, e23);
        const d23_1 = w3e23;
        const d23_2 = (-w2e23);
        const n123 = b2Math.CrossVV(e12, e13);
        const d123_1 = n123 * b2Math.CrossVV(w2, w3);
        const d123_2 = n123 * b2Math.CrossVV(w3, w1);
        const d123_3 = n123 * b2Math.CrossVV(w1, w2);
        if (d12_2 <= 0.0 && d13_2 <= 0.0) {
          this.m_v1.a = 1.0;
          this.m_count = 1;
          return;
        }
        if (d12_1 > 0.0 && d12_2 > 0.0 && d123_3 <= 0.0) {
          const inv_d12 = 1.0 / (d12_1 + d12_2);
          this.m_v1.a = d12_1 * inv_d12;
          this.m_v2.a = d12_2 * inv_d12;
          this.m_count = 2;
          return;
        }
        if (d13_1 > 0.0 && d13_2 > 0.0 && d123_2 <= 0.0) {
          const inv_d13 = 1.0 / (d13_1 + d13_2);
          this.m_v1.a = d13_1 * inv_d13;
          this.m_v3.a = d13_2 * inv_d13;
          this.m_count = 2;
          this.m_v2.Set(this.m_v3);
          return;
        }
        if (d12_1 <= 0.0 && d23_2 <= 0.0) {
          this.m_v2.a = 1.0;
          this.m_count = 1;
          this.m_v1.Set(this.m_v2);
          return;
        }
        if (d13_1 <= 0.0 && d23_1 <= 0.0) {
          this.m_v3.a = 1.0;
          this.m_count = 1;
          this.m_v1.Set(this.m_v3);
          return;
        }
        if (d23_1 > 0.0 && d23_2 > 0.0 && d123_1 <= 0.0) {
          const inv_d23 = 1.0 / (d23_1 + d23_2);
          this.m_v2.a = d23_1 * inv_d23;
          this.m_v3.a = d23_2 * inv_d23;
          this.m_count = 2;
          this.m_v1.Set(this.m_v3);
          return;
        }
        const inv_d123 = 1.0 / (d123_1 + d123_2 + d123_3);
        this.m_v1.a = d123_1 * inv_d123;
        this.m_v2.a = d123_2 * inv_d123;
        this.m_v3.a = d123_3 * inv_d123;
        this.m_count = 3;
      }
    }

    Box2D.Collision.b2Simplex = b2Simplex;

    class b2SimplexCache {
      constructor() {
        b2SimplexCache.b2SimplexCache.apply(this, arguments);
      }

      static b2SimplexCache() {
        this.indexA = new Vector_a2j_Number(3);
        this.indexB = new Vector_a2j_Number(3);
      }
    }

    Box2D.Collision.b2SimplexCache = b2SimplexCache;

    class b2SimplexVertex {
      constructor() {
        b2SimplexVertex.b2SimplexVertex.apply(this, arguments);
      }

      Set(other) {
        this.wA.SetV(other.wA);
        this.wB.SetV(other.wB);
        this.w.SetV(other.w);
        this.a = other.a;
        this.indexA = other.indexA;
        this.indexB = other.indexB;
      }
    }

    Box2D.Collision.b2SimplexVertex = b2SimplexVertex;

    function b2TimeOfImpact() {
      b2TimeOfImpact.b2TimeOfImpact.apply(this, arguments);
    }
    Box2D.Collision.b2TimeOfImpact = b2TimeOfImpact;

    class b2TOIInput {
      constructor() {
        b2TOIInput.b2TOIInput.apply(this, arguments);
      }

      static b2TOIInput() {
        this.proxyA = new b2DistanceProxy();
        this.proxyB = new b2DistanceProxy();
        this.sweepA = new b2Sweep();
        this.sweepB = new b2Sweep();
      }
    }

    Box2D.Collision.b2TOIInput = b2TOIInput;

    class b2WorldManifold {
      constructor() {
        b2WorldManifold.b2WorldManifold.apply(this, arguments);
        if (this.constructor === b2WorldManifold) this.b2WorldManifold.apply(this, arguments);
      }

      static b2WorldManifold() {
        this.m_normal = new b2Vec2();
      }

      b2WorldManifold() {
        this.m_points = new Vector(b2Settings.b2_maxManifoldPoints);
        for (let i = 0; i < b2Settings.b2_maxManifoldPoints; i++) {
          this.m_points[i] = new b2Vec2();
        }
      }

      Initialize(manifold, xfA, radiusA, xfB, radiusB) {
        if (radiusA === undefined) radiusA = 0;
        if (radiusB === undefined) radiusB = 0;
        if (manifold.m_pointCount == 0) {
          return;
        }
        let i = 0;
        let tVec;
        let tMat;
        let normalX = 0;
        let normalY = 0;
        let planePointX = 0;
        let planePointY = 0;
        let clipPointX = 0;
        let clipPointY = 0;
        switch (manifold.m_type) {
          case b2Manifold.e_circles:
            {
              tMat = xfA.R;
              tVec = manifold.m_localPoint;
              const pointAX = xfA.position.x + tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
              const pointAY = xfA.position.y + tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
              tMat = xfB.R;
              tVec = manifold.m_points[0].m_localPoint;
              const pointBX = xfB.position.x + tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
              const pointBY = xfB.position.y + tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
              const dX = pointBX - pointAX;
              const dY = pointBY - pointAY;
              const d2 = dX * dX + dY * dY;
              if (d2 > Number.MIN_VALUE * Number.MIN_VALUE) {
                const d = Math.sqrt(d2);
                this.m_normal.x = dX / d;
                this.m_normal.y = dY / d;
              } else {
                this.m_normal.x = 1;
                this.m_normal.y = 0;
              }
              const cAX = pointAX + radiusA * this.m_normal.x;
              const cAY = pointAY + radiusA * this.m_normal.y;
              const cBX = pointBX - radiusB * this.m_normal.x;
              const cBY = pointBY - radiusB * this.m_normal.y;
              this.m_points[0].x = 0.5 * (cAX + cBX);
              this.m_points[0].y = 0.5 * (cAY + cBY);
            }
            break;
          case b2Manifold.e_faceA:
            {
              tMat = xfA.R;
              tVec = manifold.m_localPlaneNormal;
              normalX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
              normalY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
              tMat = xfA.R;
              tVec = manifold.m_localPoint;
              planePointX = xfA.position.x + tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
              planePointY = xfA.position.y + tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
              this.m_normal.x = normalX;
              this.m_normal.y = normalY;
              for (i = 0;
                i < manifold.m_pointCount; i++) {
                tMat = xfB.R;
                tVec = manifold.m_points[i].m_localPoint;
                clipPointX = xfB.position.x + tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
                clipPointY = xfB.position.y + tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
                this.m_points[i].x = clipPointX + 0.5 * (radiusA - (clipPointX - planePointX) * normalX - (clipPointY - planePointY) * normalY - radiusB) * normalX;
                this.m_points[i].y = clipPointY + 0.5 * (radiusA - (clipPointX - planePointX) * normalX - (clipPointY - planePointY) * normalY - radiusB) * normalY;
              }
            }
            break;
          case b2Manifold.e_faceB:
            {
              tMat = xfB.R;
              tVec = manifold.m_localPlaneNormal;
              normalX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
              normalY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
              tMat = xfB.R;
              tVec = manifold.m_localPoint;
              planePointX = xfB.position.x + tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
              planePointY = xfB.position.y + tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
              this.m_normal.x = (-normalX);
              this.m_normal.y = (-normalY);
              for (i = 0;
                i < manifold.m_pointCount; i++) {
                tMat = xfA.R;
                tVec = manifold.m_points[i].m_localPoint;
                clipPointX = xfA.position.x + tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
                clipPointY = xfA.position.y + tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
                this.m_points[i].x = clipPointX + 0.5 * (radiusB - (clipPointX - planePointX) * normalX - (clipPointY - planePointY) * normalY - radiusA) * normalX;
                this.m_points[i].y = clipPointY + 0.5 * (radiusB - (clipPointX - planePointX) * normalX - (clipPointY - planePointY) * normalY - radiusA) * normalY;
              }
            }
            break;
        }
      }
    }

    Box2D.Collision.b2WorldManifold = b2WorldManifold;

    class ClipVertex {
      constructor() {
        ClipVertex.ClipVertex.apply(this, arguments);
      }

      static ClipVertex() {
        this.v = new b2Vec2();
        this.id = new b2ContactID();
      }

      Set(other) {
        this.v.SetV(other.v);
        this.id.Set(other.id);
      }
    }

    Box2D.Collision.ClipVertex = ClipVertex;

    class Features {
      constructor() {
        Features.Features.apply(this, arguments);
      }

      get referenceEdge() {
        return this._referenceEdge;
      }

      set referenceEdge(value) {
        if (value === undefined) value = 0;
        this._referenceEdge = value;
        this._m_id._key = (this._m_id._key & 0xffffff00) | (this._referenceEdge & 0x000000ff);
      }

      get incidentEdge() {
        return this._incidentEdge;
      }

      set incidentEdge(value) {
        if (value === undefined) value = 0;
        this._incidentEdge = value;
        this._m_id._key = (this._m_id._key & 0xffff00ff) | ((this._incidentEdge << 8) & 0x0000ff00);
      }

      get incidentVertex() {
        return this._incidentVertex;
      }

      set incidentVertex(value) {
        if (value === undefined) value = 0;
        this._incidentVertex = value;
        this._m_id._key = (this._m_id._key & 0xff00ffff) | ((this._incidentVertex << 16) & 0x00ff0000);
      }

      get flip() {
        return this._flip;
      }

      set flip(value) {
        if (value === undefined) value = 0;
        this._flip = value;
        this._m_id._key = (this._m_id._key & 0x00ffffff) | ((this._flip << 24) & 0xff000000);
      }
    }

    Box2D.Collision.Features = Features;

    class b2Shape {
      constructor() {
        b2Shape.b2Shape.apply(this, arguments);
        if (this.constructor === b2Shape) this.b2Shape.apply(this, arguments);
      }

      Copy() {
        return null;
      }

      Set(other) {
        this.m_radius = other.m_radius;
      }

      GetType() {
        return this.m_type;
      }

      TestPoint(xf, p) {
        return false;
      }

      RayCast(output, input, transform) {
        return false;
      }

      ComputeAABB(aabb, xf) { }

      ComputeMass(massData, density) {
        if (density === undefined) density = 0;
      }

      ComputeSubmergedArea(normal, offset, xf, c) {
        if (offset === undefined) offset = 0;
        return 0;
      }

      b2Shape() {
        this.m_type = b2Shape.e_unknownShape;
        this.m_radius = b2Settings.b2_linearSlop;
      }
    }

    Box2D.Collision.Shapes.b2Shape = b2Shape;
    Box2D.Common.b2internal = 'Box2D.Common.b2internal';

    class b2CircleShape extends b2Shape {
      constructor() {
        super(...arguments);
        b2CircleShape.b2CircleShape.apply(this, arguments);
        if (this.constructor === b2CircleShape) this.b2CircleShape.apply(this, arguments);
      }

      static b2CircleShape() {
        Box2D.Collision.Shapes.b2Shape.b2Shape.apply(this, arguments);
        this.m_p = new b2Vec2();
      }

      Copy() {
        const s = new b2CircleShape();
        s.Set(this);
        return s;
      }

      Set(other) {
        this.__super.Set.call(this, other);
        if (Box2D.is(other, b2CircleShape)) {
          const other2 = (other instanceof b2CircleShape ? other : null);
          this.m_p.SetV(other2.m_p);
        }
      }

      TestPoint(transform, p) {
        const tMat = transform.R;
        let dX = transform.position.x + (tMat.col1.x * this.m_p.x + tMat.col2.x * this.m_p.y);
        let dY = transform.position.y + (tMat.col1.y * this.m_p.x + tMat.col2.y * this.m_p.y);
        dX = p.x - dX;
        dY = p.y - dY;
        return (dX * dX + dY * dY) <= this.m_radius * this.m_radius;
      }

      RayCast(output, input, transform) {
        const tMat = transform.R;
        const positionX = transform.position.x + (tMat.col1.x * this.m_p.x + tMat.col2.x * this.m_p.y);
        const positionY = transform.position.y + (tMat.col1.y * this.m_p.x + tMat.col2.y * this.m_p.y);
        const sX = input.p1.x - positionX;
        const sY = input.p1.y - positionY;
        const b = (sX * sX + sY * sY) - this.m_radius * this.m_radius;
        const rX = input.p2.x - input.p1.x;
        const rY = input.p2.y - input.p1.y;
        const c = (sX * rX + sY * rY);
        const rr = (rX * rX + rY * rY);
        const sigma = c * c - rr * b;
        if (sigma < 0.0 || rr < Number.MIN_VALUE) {
          return false;
        }
        let a = (-(c + Math.sqrt(sigma)));
        if (a >= 0.0 && a <= input.maxFraction * rr) {
          a /= rr;
          output.fraction = a;
          output.normal.x = sX + a * rX;
          output.normal.y = sY + a * rY;
          output.normal.Normalize();
          return true;
        }
        return false;
      }

      ComputeAABB(aabb, transform) {
        const tMat = transform.R;
        const pX = transform.position.x + (tMat.col1.x * this.m_p.x + tMat.col2.x * this.m_p.y);
        const pY = transform.position.y + (tMat.col1.y * this.m_p.x + tMat.col2.y * this.m_p.y);
        aabb.lowerBound.Set(pX - this.m_radius, pY - this.m_radius);
        aabb.upperBound.Set(pX + this.m_radius, pY + this.m_radius);
      }

      ComputeMass(massData, density) {
        if (density === undefined) density = 0;
        massData.mass = density * b2Settings.b2_pi * this.m_radius * this.m_radius;
        massData.center.SetV(this.m_p);
        massData.I = massData.mass * (0.5 * this.m_radius * this.m_radius + (this.m_p.x * this.m_p.x + this.m_p.y * this.m_p.y));
      }

      ComputeSubmergedArea(normal, offset, xf, c) {
        if (offset === undefined) offset = 0;
        const p = b2Math.MulX(xf, this.m_p);
        const l = (-(b2Math.Dot(normal, p) - offset));
        if (l < (-this.m_radius) + Number.MIN_VALUE) {
          return 0;
        }
        if (l > this.m_radius) {
          c.SetV(p);
          return Math.PI * this.m_radius * this.m_radius;
        }
        const r2 = this.m_radius * this.m_radius;
        const l2 = l * l;
        const area = r2 * (Math.asin(l / this.m_radius) + Math.PI / 2) + l * Math.sqrt(r2 - l2);
        const com = (-2 / 3 * Math.pow(r2 - l2, 1.5) / area);
        c.x = p.x + normal.x * com;
        c.y = p.y + normal.y * com;
        return area;
      }

      GetLocalPosition() {
        return this.m_p;
      }

      SetLocalPosition(position) {
        this.m_p.SetV(position);
      }

      GetRadius() {
        return this.m_radius;
      }

      SetRadius(radius) {
        if (radius === undefined) radius = 0;
        this.m_radius = radius;
      }

      b2CircleShape(radius) {
        if (radius === undefined) radius = 0;
        this.__super.b2Shape.call(this);
        this.m_type = b2Shape.e_circleShape;
        this.m_radius = radius;
      }
    }

    Box2D.Collision.Shapes.b2CircleShape = b2CircleShape;

    class b2EdgeChainDef {
      constructor() {
        b2EdgeChainDef.b2EdgeChainDef.apply(this, arguments);
        if (this.constructor === b2EdgeChainDef) this.b2EdgeChainDef.apply(this, arguments);
      }

      b2EdgeChainDef() {
        this.vertexCount = 0;
        this.isALoop = true;
        this.vertices = [];
      }
    }

    Box2D.Collision.Shapes.b2EdgeChainDef = b2EdgeChainDef;

    class b2EdgeShape extends b2Shape {
      constructor() {
        super(...arguments);
        b2EdgeShape.b2EdgeShape.apply(this, arguments);
        if (this.constructor === b2EdgeShape) this.b2EdgeShape.apply(this, arguments);
      }

      static b2EdgeShape() {
        Box2D.Collision.Shapes.b2Shape.b2Shape.apply(this, arguments);
        this.s_supportVec = new b2Vec2();
        this.m_v1 = new b2Vec2();
        this.m_v2 = new b2Vec2();
        this.m_coreV1 = new b2Vec2();
        this.m_coreV2 = new b2Vec2();
        this.m_normal = new b2Vec2();
        this.m_direction = new b2Vec2();
        this.m_cornerDir1 = new b2Vec2();
        this.m_cornerDir2 = new b2Vec2();
      }

      TestPoint(transform, p) {
        return false;
      }

      RayCast(output, input, transform) {
        let tMat;
        const rX = input.p2.x - input.p1.x;
        const rY = input.p2.y - input.p1.y;
        tMat = transform.R;
        const v1X = transform.position.x + (tMat.col1.x * this.m_v1.x + tMat.col2.x * this.m_v1.y);
        const v1Y = transform.position.y + (tMat.col1.y * this.m_v1.x + tMat.col2.y * this.m_v1.y);
        const nX = transform.position.y + (tMat.col1.y * this.m_v2.x + tMat.col2.y * this.m_v2.y) - v1Y;
        const nY = (-(transform.position.x + (tMat.col1.x * this.m_v2.x + tMat.col2.x * this.m_v2.y) - v1X));
        const k_slop = 100.0 * Number.MIN_VALUE;
        const denom = (-(rX * nX + rY * nY));
        if (denom > k_slop) {
          const bX = input.p1.x - v1X;
          const bY = input.p1.y - v1Y;
          let a = (bX * nX + bY * nY);
          if (a >= 0.0 && a <= input.maxFraction * denom) {
            const mu2 = (-rX * bY) + rY * bX;
            if ((-k_slop * denom) <= mu2 && mu2 <= denom * (1.0 + k_slop)) {
              a /= denom;
              output.fraction = a;
              const nLen = Math.sqrt(nX * nX + nY * nY);
              output.normal.x = nX / nLen;
              output.normal.y = nY / nLen;
              return true;
            }
          }
        }
        return false;
      }

      ComputeAABB(aabb, transform) {
        const tMat = transform.R;
        const v1X = transform.position.x + (tMat.col1.x * this.m_v1.x + tMat.col2.x * this.m_v1.y);
        const v1Y = transform.position.y + (tMat.col1.y * this.m_v1.x + tMat.col2.y * this.m_v1.y);
        const v2X = transform.position.x + (tMat.col1.x * this.m_v2.x + tMat.col2.x * this.m_v2.y);
        const v2Y = transform.position.y + (tMat.col1.y * this.m_v2.x + tMat.col2.y * this.m_v2.y);
        if (v1X < v2X) {
          aabb.lowerBound.x = v1X;
          aabb.upperBound.x = v2X;
        } else {
          aabb.lowerBound.x = v2X;
          aabb.upperBound.x = v1X;
        }
        if (v1Y < v2Y) {
          aabb.lowerBound.y = v1Y;
          aabb.upperBound.y = v2Y;
        } else {
          aabb.lowerBound.y = v2Y;
          aabb.upperBound.y = v1Y;
        }
      }

      ComputeMass(massData, density) {
        if (density === undefined) density = 0;
        massData.mass = 0;
        massData.center.SetV(this.m_v1);
        massData.I = 0;
      }

      ComputeSubmergedArea(normal, offset, xf, c) {
        if (offset === undefined) offset = 0;
        const v0 = new b2Vec2(normal.x * offset, normal.y * offset);
        const v1 = b2Math.MulX(xf, this.m_v1);
        const v2 = b2Math.MulX(xf, this.m_v2);
        const d1 = b2Math.Dot(normal, v1) - offset;
        const d2 = b2Math.Dot(normal, v2) - offset;
        if (d1 > 0) {
          if (d2 > 0) {
            return 0;
          } else {
            v1.x = (-d2 / (d1 - d2) * v1.x) + d1 / (d1 - d2) * v2.x;
            v1.y = (-d2 / (d1 - d2) * v1.y) + d1 / (d1 - d2) * v2.y;
          }
        } else {
          if (d2 > 0) {
            v2.x = (-d2 / (d1 - d2) * v1.x) + d1 / (d1 - d2) * v2.x;
            v2.y = (-d2 / (d1 - d2) * v1.y) + d1 / (d1 - d2) * v2.y;
          } else { }
        }
        c.x = (v0.x + v1.x + v2.x) / 3;
        c.y = (v0.y + v1.y + v2.y) / 3;
        return 0.5 * ((v1.x - v0.x) * (v2.y - v0.y) - (v1.y - v0.y) * (v2.x - v0.x));
      }

      GetLength() {
        return this.m_length;
      }

      GetVertex1() {
        return this.m_v1;
      }

      GetVertex2() {
        return this.m_v2;
      }

      GetCoreVertex1() {
        return this.m_coreV1;
      }

      GetCoreVertex2() {
        return this.m_coreV2;
      }

      GetNormalVector() {
        return this.m_normal;
      }

      GetDirectionVector() {
        return this.m_direction;
      }

      GetCorner1Vector() {
        return this.m_cornerDir1;
      }

      GetCorner2Vector() {
        return this.m_cornerDir2;
      }

      Corner1IsConvex() {
        return this.m_cornerConvex1;
      }

      Corner2IsConvex() {
        return this.m_cornerConvex2;
      }

      GetFirstVertex(xf) {
        const tMat = xf.R;
        return new b2Vec2(xf.position.x + (tMat.col1.x * this.m_coreV1.x + tMat.col2.x * this.m_coreV1.y), xf.position.y + (tMat.col1.y * this.m_coreV1.x + tMat.col2.y * this.m_coreV1.y));
      }

      GetNextEdge() {
        return this.m_nextEdge;
      }

      GetPrevEdge() {
        return this.m_prevEdge;
      }

      Support(xf, dX, dY) {
        if (dX === undefined) dX = 0;
        if (dY === undefined) dY = 0;
        const tMat = xf.R;
        const v1X = xf.position.x + (tMat.col1.x * this.m_coreV1.x + tMat.col2.x * this.m_coreV1.y);
        const v1Y = xf.position.y + (tMat.col1.y * this.m_coreV1.x + tMat.col2.y * this.m_coreV1.y);
        const v2X = xf.position.x + (tMat.col1.x * this.m_coreV2.x + tMat.col2.x * this.m_coreV2.y);
        const v2Y = xf.position.y + (tMat.col1.y * this.m_coreV2.x + tMat.col2.y * this.m_coreV2.y);
        if ((v1X * dX + v1Y * dY) > (v2X * dX + v2Y * dY)) {
          this.s_supportVec.x = v1X;
          this.s_supportVec.y = v1Y;
        } else {
          this.s_supportVec.x = v2X;
          this.s_supportVec.y = v2Y;
        }
        return this.s_supportVec;
      }

      b2EdgeShape(v1, v2) {
        this.__super.b2Shape.call(this);
        this.m_type = b2Shape.e_edgeShape;
        this.m_prevEdge = null;
        this.m_nextEdge = null;
        this.m_v1 = v1;
        this.m_v2 = v2;
        this.m_direction.Set(this.m_v2.x - this.m_v1.x, this.m_v2.y - this.m_v1.y);
        this.m_length = this.m_direction.Normalize();
        this.m_normal.Set(this.m_direction.y, (-this.m_direction.x));
        this.m_coreV1.Set((-b2Settings.b2_toiSlop * (this.m_normal.x - this.m_direction.x)) + this.m_v1.x, (-b2Settings.b2_toiSlop * (this.m_normal.y - this.m_direction.y)) + this.m_v1.y);
        this.m_coreV2.Set((-b2Settings.b2_toiSlop * (this.m_normal.x + this.m_direction.x)) + this.m_v2.x, (-b2Settings.b2_toiSlop * (this.m_normal.y + this.m_direction.y)) + this.m_v2.y);
        this.m_cornerDir1 = this.m_normal;
        this.m_cornerDir2.Set((-this.m_normal.x), (-this.m_normal.y));
      }

      SetPrevEdge(edge, core, cornerDir, convex) {
        this.m_prevEdge = edge;
        this.m_coreV1 = core;
        this.m_cornerDir1 = cornerDir;
        this.m_cornerConvex1 = convex;
      }

      SetNextEdge(edge, core, cornerDir, convex) {
        this.m_nextEdge = edge;
        this.m_coreV2 = core;
        this.m_cornerDir2 = cornerDir;
        this.m_cornerConvex2 = convex;
      }
    }

    Box2D.Collision.Shapes.b2EdgeShape = b2EdgeShape;

    class b2MassData {
      constructor() {
        b2MassData.b2MassData.apply(this, arguments);
      }

      static b2MassData() {
        this.mass = 0.0;
        this.center = new b2Vec2(0, 0);
        this.I = 0.0;
      }
    }

    Box2D.Collision.Shapes.b2MassData = b2MassData;

    class b2PolygonShape extends b2Shape {
      constructor() {
        super(...arguments);
        b2PolygonShape.b2PolygonShape.apply(this, arguments);
        if (this.constructor === b2PolygonShape) this.b2PolygonShape.apply(this, arguments);
      }

      static b2PolygonShape() {
        Box2D.Collision.Shapes.b2Shape.b2Shape.apply(this, arguments);
      }

      Copy() {
        const s = new b2PolygonShape();
        s.Set(this);
        return s;
      }

      Set(other) {
        this.__super.Set.call(this, other);
        if (Box2D.is(other, b2PolygonShape)) {
          const other2 = (other instanceof b2PolygonShape ? other : null);
          this.m_centroid.SetV(other2.m_centroid);
          this.m_vertexCount = other2.m_vertexCount;
          this.Reserve(this.m_vertexCount);
          for (let i = 0; i < this.m_vertexCount; i++) {
            this.m_vertices[i].SetV(other2.m_vertices[i]);
            this.m_normals[i].SetV(other2.m_normals[i]);
          }
        }
      }

      SetAsArray(vertices, vertexCount) {
        if (vertexCount === undefined) vertexCount = 0;
        const v = new Vector();
        let i = 0;
        let tVec;
        for (i = 0;
          i < vertices.length; ++i) {
          tVec = vertices[i];
          v.push(tVec);
        }
        this.SetAsVector(v, vertexCount);
      }

      SetAsVector(vertices, vertexCount) {
        if (vertexCount === undefined) vertexCount = 0;
        if (vertexCount == 0) vertexCount = vertices.length;
        b2Settings.b2Assert(vertexCount >= 2);
        this.m_vertexCount = vertexCount;
        this.Reserve(vertexCount);
        let i = 0;
        for (i = 0;
          i < this.m_vertexCount; i++) {
          this.m_vertices[i].SetV(vertices[i]);
        }
        for (i = 0;
          i < this.m_vertexCount; ++i) {
          const i1 = parseInt(i);
          const i2 = parseInt(i + 1 < this.m_vertexCount ? i + 1 : 0);
          const edge = b2Math.SubtractVV(this.m_vertices[i2], this.m_vertices[i1]);
          b2Settings.b2Assert(edge.LengthSquared() > Number.MIN_VALUE);
          this.m_normals[i].SetV(b2Math.CrossVF(edge, 1.0));
          this.m_normals[i].Normalize();
        }
        this.m_centroid = b2PolygonShape.ComputeCentroid(this.m_vertices, this.m_vertexCount);
      }

      SetAsBox(hx, hy) {
        if (hx === undefined) hx = 0;
        if (hy === undefined) hy = 0;
        this.m_vertexCount = 4;
        this.Reserve(4);
        this.m_vertices[0].Set((-hx), (-hy));
        this.m_vertices[1].Set(hx, (-hy));
        this.m_vertices[2].Set(hx, hy);
        this.m_vertices[3].Set((-hx), hy);
        this.m_normals[0].Set(0.0, (-1.0));
        this.m_normals[1].Set(1.0, 0.0);
        this.m_normals[2].Set(0.0, 1.0);
        this.m_normals[3].Set((-1.0), 0.0);
        this.m_centroid.SetZero();
      }

      SetAsOrientedBox(hx, hy, center, angle) {
        if (hx === undefined) hx = 0;
        if (hy === undefined) hy = 0;
        if (center === undefined) center = null;
        if (angle === undefined) angle = 0.0;
        this.m_vertexCount = 4;
        this.Reserve(4);
        this.m_vertices[0].Set((-hx), (-hy));
        this.m_vertices[1].Set(hx, (-hy));
        this.m_vertices[2].Set(hx, hy);
        this.m_vertices[3].Set((-hx), hy);
        this.m_normals[0].Set(0.0, (-1.0));
        this.m_normals[1].Set(1.0, 0.0);
        this.m_normals[2].Set(0.0, 1.0);
        this.m_normals[3].Set((-1.0), 0.0);
        this.m_centroid = center;
        const xf = new b2Transform();
        xf.position = center;
        xf.R.Set(angle);
        for (let i = 0; i < this.m_vertexCount; ++i) {
          this.m_vertices[i] = b2Math.MulX(xf, this.m_vertices[i]);
          this.m_normals[i] = b2Math.MulMV(xf.R, this.m_normals[i]);
        }
      }

      SetAsEdge(v1, v2) {
        this.m_vertexCount = 2;
        this.Reserve(2);
        this.m_vertices[0].SetV(v1);
        this.m_vertices[1].SetV(v2);
        this.m_centroid.x = 0.5 * (v1.x + v2.x);
        this.m_centroid.y = 0.5 * (v1.y + v2.y);
        this.m_normals[0] = b2Math.CrossVF(b2Math.SubtractVV(v2, v1), 1.0);
        this.m_normals[0].Normalize();
        this.m_normals[1].x = (-this.m_normals[0].x);
        this.m_normals[1].y = (-this.m_normals[0].y);
      }

      TestPoint(xf, p) {
        let tVec;
        const tMat = xf.R;
        let tX = p.x - xf.position.x;
        let tY = p.y - xf.position.y;
        const pLocalX = (tX * tMat.col1.x + tY * tMat.col1.y);
        const pLocalY = (tX * tMat.col2.x + tY * tMat.col2.y);
        for (let i = 0; i < this.m_vertexCount; ++i) {
          tVec = this.m_vertices[i];
          tX = pLocalX - tVec.x;
          tY = pLocalY - tVec.y;
          tVec = this.m_normals[i];
          const dot = (tVec.x * tX + tVec.y * tY);
          if (dot > 0.0) {
            return false;
          }
        }
        return true;
      }

      RayCast(output, input, transform) {
        let lower = 0.0;
        let upper = input.maxFraction;
        let tX = 0;
        let tY = 0;
        let tMat;
        let tVec;
        tX = input.p1.x - transform.position.x;
        tY = input.p1.y - transform.position.y;
        tMat = transform.R;
        const p1X = (tX * tMat.col1.x + tY * tMat.col1.y);
        const p1Y = (tX * tMat.col2.x + tY * tMat.col2.y);
        tX = input.p2.x - transform.position.x;
        tY = input.p2.y - transform.position.y;
        tMat = transform.R;
        const p2X = (tX * tMat.col1.x + tY * tMat.col1.y);
        const p2Y = (tX * tMat.col2.x + tY * tMat.col2.y);
        const dX = p2X - p1X;
        const dY = p2Y - p1Y;
        let index = parseInt((-1));
        for (let i = 0; i < this.m_vertexCount; ++i) {
          tVec = this.m_vertices[i];
          tX = tVec.x - p1X;
          tY = tVec.y - p1Y;
          tVec = this.m_normals[i];
          const numerator = (tVec.x * tX + tVec.y * tY);
          const denominator = (tVec.x * dX + tVec.y * dY);
          if (denominator == 0.0) {
            if (numerator < 0.0) {
              return false;
            }
          } else {
            if (denominator < 0.0 && numerator < lower * denominator) {
              lower = numerator / denominator;
              index = i;
            } else if (denominator > 0.0 && numerator < upper * denominator) {
              upper = numerator / denominator;
            }
          }
          if (upper < lower - Number.MIN_VALUE) {
            return false;
          }
        }
        if (index >= 0) {
          output.fraction = lower;
          tMat = transform.R;
          tVec = this.m_normals[index];
          output.normal.x = (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
          output.normal.y = (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
          return true;
        }
        return false;
      }

      ComputeAABB(aabb, xf) {
        const tMat = xf.R;
        let tVec = this.m_vertices[0];
        let lowerX = xf.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
        let lowerY = xf.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
        let upperX = lowerX;
        let upperY = lowerY;
        for (let i = 1; i < this.m_vertexCount; ++i) {
          tVec = this.m_vertices[i];
          const vX = xf.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
          const vY = xf.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
          lowerX = lowerX < vX ? lowerX : vX;
          lowerY = lowerY < vY ? lowerY : vY;
          upperX = upperX > vX ? upperX : vX;
          upperY = upperY > vY ? upperY : vY;
        }
        aabb.lowerBound.x = lowerX - this.m_radius;
        aabb.lowerBound.y = lowerY - this.m_radius;
        aabb.upperBound.x = upperX + this.m_radius;
        aabb.upperBound.y = upperY + this.m_radius;
      }

      ComputeMass(massData, density) {
        if (density === undefined) density = 0;
        if (this.m_vertexCount == 2) {
          massData.center.x = 0.5 * (this.m_vertices[0].x + this.m_vertices[1].x);
          massData.center.y = 0.5 * (this.m_vertices[0].y + this.m_vertices[1].y);
          massData.mass = 0.0;
          massData.I = 0.0;
          return;
        }
        let centerX = 0.0;
        let centerY = 0.0;
        let area = 0.0;
        let I = 0.0;
        const p1X = 0.0;
        const p1Y = 0.0;
        const k_inv3 = 1.0 / 3.0;
        for (let i = 0; i < this.m_vertexCount; ++i) {
          const p2 = this.m_vertices[i];
          const p3 = i + 1 < this.m_vertexCount ? this.m_vertices[parseInt(i + 1)] : this.m_vertices[0];
          const e1X = p2.x - p1X;
          const e1Y = p2.y - p1Y;
          const e2X = p3.x - p1X;
          const e2Y = p3.y - p1Y;
          const D = e1X * e2Y - e1Y * e2X;
          const triangleArea = 0.5 * D; area += triangleArea;
          centerX += triangleArea * k_inv3 * (p1X + p2.x + p3.x);
          centerY += triangleArea * k_inv3 * (p1Y + p2.y + p3.y);
          const px = p1X;
          const py = p1Y;
          const ex1 = e1X;
          const ey1 = e1Y;
          const ex2 = e2X;
          const ey2 = e2Y;
          const intx2 = k_inv3 * (0.25 * (ex1 * ex1 + ex2 * ex1 + ex2 * ex2) + (px * ex1 + px * ex2)) + 0.5 * px * px;
          const inty2 = k_inv3 * (0.25 * (ey1 * ey1 + ey2 * ey1 + ey2 * ey2) + (py * ey1 + py * ey2)) + 0.5 * py * py; I += D * (intx2 + inty2);
        }
        massData.mass = density * area;
        centerX *= 1.0 / area;
        centerY *= 1.0 / area;
        massData.center.Set(centerX, centerY);
        massData.I = density * I;
      }

      ComputeSubmergedArea(normal, offset, xf, c) {
        if (offset === undefined) offset = 0;
        const normalL = b2Math.MulTMV(xf.R, normal);
        const offsetL = offset - b2Math.Dot(normal, xf.position);
        const depths = new Vector_a2j_Number();
        let diveCount = 0;
        let intoIndex = parseInt((-1));
        let outoIndex = parseInt((-1));
        let lastSubmerged = false;
        let i = 0;
        for (i = 0;
          i < this.m_vertexCount; ++i) {
          depths[i] = b2Math.Dot(normalL, this.m_vertices[i]) - offsetL;
          const isSubmerged = depths[i] < (-Number.MIN_VALUE);
          if (i > 0) {
            if (isSubmerged) {
              if (!lastSubmerged) {
                intoIndex = i - 1;
                diveCount++;
              }
            } else {
              if (lastSubmerged) {
                outoIndex = i - 1;
                diveCount++;
              }
            }
          }
          lastSubmerged = isSubmerged;
        }
        switch (diveCount) {
          case 0:
            if (lastSubmerged) {
              const md = new b2MassData();
              this.ComputeMass(md, 1);
              c.SetV(b2Math.MulX(xf, md.center));
              return md.mass;
            } else {
              return 0;
            }
            break;
          case 1:
            if (intoIndex == (-1)) {
              intoIndex = this.m_vertexCount - 1;
            } else {
              outoIndex = this.m_vertexCount - 1;
            }
            break;
        }
        const intoIndex2 = parseInt((intoIndex + 1) % this.m_vertexCount);
        const outoIndex2 = parseInt((outoIndex + 1) % this.m_vertexCount);
        const intoLamdda = (0 - depths[intoIndex]) / (depths[intoIndex2] - depths[intoIndex]);
        const outoLamdda = (0 - depths[outoIndex]) / (depths[outoIndex2] - depths[outoIndex]);
        const intoVec = new b2Vec2(this.m_vertices[intoIndex].x * (1 - intoLamdda) + this.m_vertices[intoIndex2].x * intoLamdda, this.m_vertices[intoIndex].y * (1 - intoLamdda) + this.m_vertices[intoIndex2].y * intoLamdda);
        const outoVec = new b2Vec2(this.m_vertices[outoIndex].x * (1 - outoLamdda) + this.m_vertices[outoIndex2].x * outoLamdda, this.m_vertices[outoIndex].y * (1 - outoLamdda) + this.m_vertices[outoIndex2].y * outoLamdda);
        let area = 0;
        const center = new b2Vec2();
        let p2 = this.m_vertices[intoIndex2];
        let p3;
        i = intoIndex2;
        while (i != outoIndex2) {
          i = (i + 1) % this.m_vertexCount;
          if (i == outoIndex2) p3 = outoVec;
          else p3 = this.m_vertices[i];
          const triangleArea = 0.5 * ((p2.x - intoVec.x) * (p3.y - intoVec.y) - (p2.y - intoVec.y) * (p3.x - intoVec.x));
          area += triangleArea;
          center.x += triangleArea * (intoVec.x + p2.x + p3.x) / 3;
          center.y += triangleArea * (intoVec.y + p2.y + p3.y) / 3;
          p2 = p3;
        }
        center.Multiply(1 / area);
        c.SetV(b2Math.MulX(xf, center));
        return area;
      }

      GetVertexCount() {
        return this.m_vertexCount;
      }

      GetVertices() {
        return this.m_vertices;
      }

      GetNormals() {
        return this.m_normals;
      }

      GetSupport(d) {
        let bestIndex = 0;
        let bestValue = this.m_vertices[0].x * d.x + this.m_vertices[0].y * d.y;
        for (let i = 1; i < this.m_vertexCount; ++i) {
          const value = this.m_vertices[i].x * d.x + this.m_vertices[i].y * d.y;
          if (value > bestValue) {
            bestIndex = i;
            bestValue = value;
          }
        }
        return bestIndex;
      }

      GetSupportVertex(d) {
        let bestIndex = 0;
        let bestValue = this.m_vertices[0].x * d.x + this.m_vertices[0].y * d.y;
        for (let i = 1; i < this.m_vertexCount; ++i) {
          const value = this.m_vertices[i].x * d.x + this.m_vertices[i].y * d.y;
          if (value > bestValue) {
            bestIndex = i;
            bestValue = value;
          }
        }
        return this.m_vertices[bestIndex];
      }

      Validate() {
        return false;
      }

      b2PolygonShape() {
        this.__super.b2Shape.call(this);
        this.m_type = b2Shape.e_polygonShape;
        this.m_centroid = new b2Vec2();
        this.m_vertices = new Vector();
        this.m_normals = new Vector();
      }

      Reserve(count) {
        if (count === undefined) count = 0;
        for (let i = parseInt(this.m_vertices.length); i < count; i++) {
          this.m_vertices[i] = new b2Vec2();
          this.m_normals[i] = new b2Vec2();
        }
      }
    }

    Box2D.Collision.Shapes.b2PolygonShape = b2PolygonShape;
    class b2Color {
      constructor() {
        b2Color.b2Color.apply(this, arguments);
        if (this.constructor === b2Color) this.b2Color.apply(this, arguments);
      }

      static b2Color() {
        this._r = 0;
        this._g = 0;
        this._b = 0;
      }

      b2Color(rr, gg, bb) {
        if (rr === undefined) rr = 0;
        if (gg === undefined) gg = 0;
        if (bb === undefined) bb = 0;
        this._r = Box2D.parseUInt(255 * b2Math.Clamp(rr, 0.0, 1.0));
        this._g = Box2D.parseUInt(255 * b2Math.Clamp(gg, 0.0, 1.0));
        this._b = Box2D.parseUInt(255 * b2Math.Clamp(bb, 0.0, 1.0));
      }

      Set(rr, gg, bb) {
        if (rr === undefined) rr = 0;
        if (gg === undefined) gg = 0;
        if (bb === undefined) bb = 0;
        this._r = Box2D.parseUInt(255 * b2Math.Clamp(rr, 0.0, 1.0));
        this._g = Box2D.parseUInt(255 * b2Math.Clamp(gg, 0.0, 1.0));
        this._b = Box2D.parseUInt(255 * b2Math.Clamp(bb, 0.0, 1.0));
      }

      set r(rr) {
        if (rr === undefined) rr = 0;
        this._r = Box2D.parseUInt(255 * b2Math.Clamp(rr, 0.0, 1.0));
      }

      set g(gg) {
        if (gg === undefined) gg = 0;
        this._g = Box2D.parseUInt(255 * b2Math.Clamp(gg, 0.0, 1.0));
      }

      set b(bb) {
        if (bb === undefined) bb = 0;
        this._b = Box2D.parseUInt(255 * b2Math.Clamp(bb, 0.0, 1.0));
      }

      get color() {
        return (this._r << 16) | (this._g << 8) | (this._b);
      }
    }

    Box2D.Common.b2Color = b2Color;

    function b2Settings() {
      b2Settings.b2Settings.apply(this, arguments);
    }
    Box2D.Common.b2Settings = b2Settings;

    class b2Mat22 {
      constructor() {
        b2Mat22.b2Mat22.apply(this, arguments);
        if (this.constructor === b2Mat22) this.b2Mat22.apply(this, arguments);
      }

      static b2Mat22() {
        this.col1 = new b2Vec2();
        this.col2 = new b2Vec2();
      }

      b2Mat22() {
        this.SetIdentity();
      }

      Set(angle) {
        if (angle === undefined) angle = 0;
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        this.col1.x = c;
        this.col2.x = (-s);
        this.col1.y = s;
        this.col2.y = c;
      }

      SetVV(c1, c2) {
        this.col1.SetV(c1);
        this.col2.SetV(c2);
      }

      Copy() {
        const mat = new b2Mat22();
        mat.SetM(this);
        return mat;
      }

      SetM(m) {
        this.col1.SetV(m.col1);
        this.col2.SetV(m.col2);
      }

      AddM(m) {
        this.col1.x += m.col1.x;
        this.col1.y += m.col1.y;
        this.col2.x += m.col2.x;
        this.col2.y += m.col2.y;
      }

      SetIdentity() {
        this.col1.x = 1.0;
        this.col2.x = 0.0;
        this.col1.y = 0.0;
        this.col2.y = 1.0;
      }

      SetZero() {
        this.col1.x = 0.0;
        this.col2.x = 0.0;
        this.col1.y = 0.0;
        this.col2.y = 0.0;
      }

      GetAngle() {
        return Math.atan2(this.col1.y, this.col1.x);
      }

      GetInverse(out) {
        const a = this.col1.x;
        const b = this.col2.x;
        const c = this.col1.y;
        const d = this.col2.y;
        let det = a * d - b * c;
        if (det != 0.0) {
          det = 1.0 / det;
        }
        out.col1.x = det * d;
        out.col2.x = (-det * b);
        out.col1.y = (-det * c);
        out.col2.y = det * a;
        return out;
      }

      Solve(out, bX, bY) {
        if (bX === undefined) bX = 0;
        if (bY === undefined) bY = 0;
        const a11 = this.col1.x;
        const a12 = this.col2.x;
        const a21 = this.col1.y;
        const a22 = this.col2.y;
        let det = a11 * a22 - a12 * a21;
        if (det != 0.0) {
          det = 1.0 / det;
        }
        out.x = det * (a22 * bX - a12 * bY);
        out.y = det * (a11 * bY - a21 * bX);
        return out;
      }

      Abs() {
        this.col1.Abs();
        this.col2.Abs();
      }
    }

    Box2D.Common.Math.b2Mat22 = b2Mat22;

    class b2Mat33 {
      constructor() {
        b2Mat33.b2Mat33.apply(this, arguments);
        if (this.constructor === b2Mat33) this.b2Mat33.apply(this, arguments);
      }

      static b2Mat33() {
        this.col1 = new b2Vec3();
        this.col2 = new b2Vec3();
        this.col3 = new b2Vec3();
      }

      b2Mat33(c1, c2, c3) {
        if (c1 === undefined) c1 = null;
        if (c2 === undefined) c2 = null;
        if (c3 === undefined) c3 = null;
        if (!c1 && !c2 && !c3) {
          this.col1.SetZero();
          this.col2.SetZero();
          this.col3.SetZero();
        } else {
          this.col1.SetV(c1);
          this.col2.SetV(c2);
          this.col3.SetV(c3);
        }
      }

      SetVVV(c1, c2, c3) {
        this.col1.SetV(c1);
        this.col2.SetV(c2);
        this.col3.SetV(c3);
      }

      Copy() {
        return new b2Mat33(this.col1, this.col2, this.col3);
      }

      SetM(m) {
        this.col1.SetV(m.col1);
        this.col2.SetV(m.col2);
        this.col3.SetV(m.col3);
      }

      AddM(m) {
        this.col1.x += m.col1.x;
        this.col1.y += m.col1.y;
        this.col1.z += m.col1.z;
        this.col2.x += m.col2.x;
        this.col2.y += m.col2.y;
        this.col2.z += m.col2.z;
        this.col3.x += m.col3.x;
        this.col3.y += m.col3.y;
        this.col3.z += m.col3.z;
      }

      SetIdentity() {
        this.col1.x = 1.0;
        this.col2.x = 0.0;
        this.col3.x = 0.0;
        this.col1.y = 0.0;
        this.col2.y = 1.0;
        this.col3.y = 0.0;
        this.col1.z = 0.0;
        this.col2.z = 0.0;
        this.col3.z = 1.0;
      }

      SetZero() {
        this.col1.x = 0.0;
        this.col2.x = 0.0;
        this.col3.x = 0.0;
        this.col1.y = 0.0;
        this.col2.y = 0.0;
        this.col3.y = 0.0;
        this.col1.z = 0.0;
        this.col2.z = 0.0;
        this.col3.z = 0.0;
      }

      Solve22(out, bX, bY) {
        if (bX === undefined) bX = 0;
        if (bY === undefined) bY = 0;
        const a11 = this.col1.x;
        const a12 = this.col2.x;
        const a21 = this.col1.y;
        const a22 = this.col2.y;
        let det = a11 * a22 - a12 * a21;
        if (det != 0.0) {
          det = 1.0 / det;
        }
        out.x = det * (a22 * bX - a12 * bY);
        out.y = det * (a11 * bY - a21 * bX);
        return out;
      }

      Solve33(out, bX, bY, bZ) {
        if (bX === undefined) bX = 0;
        if (bY === undefined) bY = 0;
        if (bZ === undefined) bZ = 0;
        const a11 = this.col1.x;
        const a21 = this.col1.y;
        const a31 = this.col1.z;
        const a12 = this.col2.x;
        const a22 = this.col2.y;
        const a32 = this.col2.z;
        const a13 = this.col3.x;
        const a23 = this.col3.y;
        const a33 = this.col3.z;
        let det = a11 * (a22 * a33 - a32 * a23) + a21 * (a32 * a13 - a12 * a33) + a31 * (a12 * a23 - a22 * a13);
        if (det != 0.0) {
          det = 1.0 / det;
        }
        out.x = det * (bX * (a22 * a33 - a32 * a23) + bY * (a32 * a13 - a12 * a33) + bZ * (a12 * a23 - a22 * a13));
        out.y = det * (a11 * (bY * a33 - bZ * a23) + a21 * (bZ * a13 - bX * a33) + a31 * (bX * a23 - bY * a13));
        out.z = det * (a11 * (a22 * bZ - a32 * bY) + a21 * (a32 * bX - a12 * bZ) + a31 * (a12 * bY - a22 * bX));
        return out;
      }
    }

    Box2D.Common.Math.b2Mat33 = b2Mat33;

    function b2Math() {
      b2Math.b2Math.apply(this, arguments);
    }
    Box2D.Common.Math.b2Math = b2Math;

    class b2Sweep {
      constructor() {
        b2Sweep.b2Sweep.apply(this, arguments);
      }

      static b2Sweep() {
        this.localCenter = new b2Vec2();
        this.c0 = new b2Vec2();
        this.c = new b2Vec2();
      }

      Set(other) {
        this.localCenter.SetV(other.localCenter);
        this.c0.SetV(other.c0);
        this.c.SetV(other.c);
        this.a0 = other.a0;
        this.a = other.a;
        this.t0 = other.t0;
      }

      Copy() {
        const copy = new b2Sweep();
        copy.localCenter.SetV(this.localCenter);
        copy.c0.SetV(this.c0);
        copy.c.SetV(this.c);
        copy.a0 = this.a0;
        copy.a = this.a;
        copy.t0 = this.t0;
        return copy;
      }

      GetTransform(xf, alpha) {
        if (alpha === undefined) alpha = 0;
        xf.position.x = (1.0 - alpha) * this.c0.x + alpha * this.c.x;
        xf.position.y = (1.0 - alpha) * this.c0.y + alpha * this.c.y;
        const angle = (1.0 - alpha) * this.a0 + alpha * this.a;
        xf.R.Set(angle);
        const tMat = xf.R;
        xf.position.x -= (tMat.col1.x * this.localCenter.x + tMat.col2.x * this.localCenter.y);
        xf.position.y -= (tMat.col1.y * this.localCenter.x + tMat.col2.y * this.localCenter.y);
      }

      Advance(t) {
        if (t === undefined) t = 0;
        if (this.t0 < t && 1.0 - this.t0 > Number.MIN_VALUE) {
          const alpha = (t - this.t0) / (1.0 - this.t0);
          this.c0.x = (1.0 - alpha) * this.c0.x + alpha * this.c.x;
          this.c0.y = (1.0 - alpha) * this.c0.y + alpha * this.c.y;
          this.a0 = (1.0 - alpha) * this.a0 + alpha * this.a;
          this.t0 = t;
        }
      }
    }

    Box2D.Common.Math.b2Sweep = b2Sweep;

    class b2Transform {
      constructor() {
        b2Transform.b2Transform.apply(this, arguments);
        if (this.constructor === b2Transform) this.b2Transform.apply(this, arguments);
      }

      static b2Transform() {
        this.position = new b2Vec2();
        this.R = new b2Mat22();
      }

      b2Transform(pos, r) {
        if (pos === undefined) pos = null;
        if (r === undefined) r = null;
        if (pos) {
          this.position.SetV(pos);
          this.R.SetM(r);
        }
      }

      Initialize(pos, r) {
        this.position.SetV(pos);
        this.R.SetM(r);
      }

      SetIdentity() {
        this.position.SetZero();
        this.R.SetIdentity();
      }

      Set(x) {
        this.position.SetV(x.position);
        this.R.SetM(x.R);
      }

      GetAngle() {
        return Math.atan2(this.R.col1.y, this.R.col1.x);
      }
    }

    Box2D.Common.Math.b2Transform = b2Transform;

    class b2Vec2 {
      constructor() {
        b2Vec2.b2Vec2.apply(this, arguments);
        if (this.constructor === b2Vec2) this.b2Vec2.apply(this, arguments);
      }

      b2Vec2(x_, y_) {
        if (x_ === undefined) x_ = 0;
        if (y_ === undefined) y_ = 0;
        this.x = x_;
        this.y = y_;
      }

      SetZero() {
        this.x = 0.0;
        this.y = 0.0;
      }

      Set(x_, y_) {
        if (x_ === undefined) x_ = 0;
        if (y_ === undefined) y_ = 0;
        this.x = x_;
        this.y = y_;
      }

      SetV(v) {
        this.x = v.x;
        this.y = v.y;
      }

      GetNegative() {
        return new b2Vec2((-this.x), (-this.y));
      }

      NegativeSelf() {
        this.x = (-this.x);
        this.y = (-this.y);
      }

      Copy() {
        return new b2Vec2(this.x, this.y);
      }

      Add(v) {
        this.x += v.x;
        this.y += v.y;
      }

      Subtract(v) {
        this.x -= v.x;
        this.y -= v.y;
      }

      Multiply(a) {
        if (a === undefined) a = 0;
        this.x *= a;
        this.y *= a;
      }

      MulM(A) {
        const tX = this.x;
        this.x = A.col1.x * tX + A.col2.x * this.y;
        this.y = A.col1.y * tX + A.col2.y * this.y;
      }

      MulTM(A) {
        const tX = b2Math.Dot(this, A.col1);
        this.y = b2Math.Dot(this, A.col2);
        this.x = tX;
      }

      CrossVF(s) {
        if (s === undefined) s = 0;
        const tX = this.x;
        this.x = s * this.y;
        this.y = (-s * tX);
      }

      CrossFV(s) {
        if (s === undefined) s = 0;
        const tX = this.x;
        this.x = (-s * this.y);
        this.y = s * tX;
      }

      MinV(b) {
        this.x = this.x < b.x ? this.x : b.x;
        this.y = this.y < b.y ? this.y : b.y;
      }

      MaxV(b) {
        this.x = this.x > b.x ? this.x : b.x;
        this.y = this.y > b.y ? this.y : b.y;
      }

      Abs() {
        if (this.x < 0) this.x = (-this.x);
        if (this.y < 0) this.y = (-this.y);
      }

      Length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
      }

      LengthSquared() {
        return (this.x * this.x + this.y * this.y);
      }

      Normalize() {
        const length = Math.sqrt(this.x * this.x + this.y * this.y);
        if (length < Number.MIN_VALUE) {
          return 0.0;
        }
        const invLength = 1.0 / length;
        this.x *= invLength;
        this.y *= invLength;
        return length;
      }

      IsValid() {
        return b2Math.IsValid(this.x) && b2Math.IsValid(this.y);
      }
    }

    Box2D.Common.Math.b2Vec2 = b2Vec2;

    class b2Vec3 {
      constructor() {
        b2Vec3.b2Vec3.apply(this, arguments);
        if (this.constructor === b2Vec3) this.b2Vec3.apply(this, arguments);
      }

      b2Vec3(x, y, z) {
        if (x === undefined) x = 0;
        if (y === undefined) y = 0;
        if (z === undefined) z = 0;
        this.x = x;
        this.y = y;
        this.z = z;
      }

      SetZero() {
        this.x = this.y = this.z = 0.0;
      }

      Set(x, y, z) {
        if (x === undefined) x = 0;
        if (y === undefined) y = 0;
        if (z === undefined) z = 0;
        this.x = x;
        this.y = y;
        this.z = z;
      }

      SetV(v) {
        this.x = v.x;
        this.y = v.y;
        this.z = v.z;
      }

      GetNegative() {
        return new b2Vec3((-this.x), (-this.y), (-this.z));
      }

      NegativeSelf() {
        this.x = (-this.x);
        this.y = (-this.y);
        this.z = (-this.z);
      }

      Copy() {
        return new b2Vec3(this.x, this.y, this.z);
      }

      Add(v) {
        this.x += v.x;
        this.y += v.y;
        this.z += v.z;
      }

      Subtract(v) {
        this.x -= v.x;
        this.y -= v.y;
        this.z -= v.z;
      }

      Multiply(a) {
        if (a === undefined) a = 0;
        this.x *= a;
        this.y *= a;
        this.z *= a;
      }
    }

    Box2D.Common.Math.b2Vec3 = b2Vec3;

    class b2Body {
      constructor() {
        b2Body.b2Body.apply(this, arguments);
        if (this.constructor === b2Body) this.b2Body.apply(this, arguments);
      }

      static b2Body() {
        this.m_xf = new b2Transform();
        this.m_sweep = new b2Sweep();
        this.m_linearVelocity = new b2Vec2();
        this.m_force = new b2Vec2();
      }

      connectEdges(s1, s2, angle1) {
        if (angle1 === undefined) angle1 = 0;
        const angle2 = Math.atan2(s2.GetDirectionVector().y, s2.GetDirectionVector().x);
        const coreOffset = Math.tan((angle2 - angle1) * 0.5);
        let core = b2Math.MulFV(coreOffset, s2.GetDirectionVector());
        core = b2Math.SubtractVV(core, s2.GetNormalVector());
        core = b2Math.MulFV(b2Settings.b2_toiSlop, core);
        core = b2Math.AddVV(core, s2.GetVertex1());
        const cornerDir = b2Math.AddVV(s1.GetDirectionVector(), s2.GetDirectionVector());
        cornerDir.Normalize();
        const convex = b2Math.Dot(s1.GetDirectionVector(), s2.GetNormalVector()) > 0.0;
        s1.SetNextEdge(s2, core, cornerDir, convex);
        s2.SetPrevEdge(s1, core, cornerDir, convex);
        return angle2;
      }

      CreateFixture(def) {
        if (this.m_world.IsLocked() == true) {
          return null;
        }
        const fixture = new b2Fixture();
        fixture.Create(this, this.m_xf, def);
        if (this.m_flags & b2Body.e_activeFlag) {
          const broadPhase = this.m_world.m_contactManager.m_broadPhase;
          fixture.CreateProxy(broadPhase, this.m_xf);
        }
        fixture.m_next = this.m_fixtureList;
        this.m_fixtureList = fixture;
        ++this.m_fixtureCount;
        fixture.m_body = this;
        if (fixture.m_density > 0.0) {
          this.ResetMassData();
        }
        this.m_world.m_flags |= b2World.e_newFixture;
        return fixture;
      }

      CreateFixture2(shape, density) {
        if (density === undefined) density = 0.0;
        const def = new b2FixtureDef();
        def.shape = shape;
        def.density = density;
        return this.CreateFixture(def);
      }

      DestroyFixture(fixture) {
        if (this.m_world.IsLocked() == true) {
          return;
        }
        let node = this.m_fixtureList;
        let ppF = null;
        let found = false;
        while (node != null) {
          if (node == fixture) {
            if (ppF) ppF.m_next = fixture.m_next;
            else this.m_fixtureList = fixture.m_next;
            found = true;
            break;
          }
          ppF = node;
          node = node.m_next;
        }
        let edge = this.m_contactList;
        while (edge) {
          const c = edge.contact;
          edge = edge.next;
          const fixtureA = c.GetFixtureA();
          const fixtureB = c.GetFixtureB();
          if (fixture == fixtureA || fixture == fixtureB) {
            this.m_world.m_contactManager.Destroy(c);
          }
        }
        if (this.m_flags & b2Body.e_activeFlag) {
          const broadPhase = this.m_world.m_contactManager.m_broadPhase;
          fixture.DestroyProxy(broadPhase);
        } else { }
        fixture.Destroy();
        fixture.m_body = null;
        fixture.m_next = null;
        --this.m_fixtureCount;
        this.ResetMassData();
      }

      SetPositionAndAngle(position, angle) {
        if (angle === undefined) angle = 0;
        let f;
        if (this.m_world.IsLocked() == true) {
          return;
        }
        this.m_xf.R.Set(angle);
        this.m_xf.position.SetV(position);
        const tMat = this.m_xf.R;
        const tVec = this.m_sweep.localCenter;
        this.m_sweep.c.x = (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
        this.m_sweep.c.y = (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
        this.m_sweep.c.x += this.m_xf.position.x;
        this.m_sweep.c.y += this.m_xf.position.y;
        this.m_sweep.c0.SetV(this.m_sweep.c);
        this.m_sweep.a0 = this.m_sweep.a = angle;
        const broadPhase = this.m_world.m_contactManager.m_broadPhase;
        for (f = this.m_fixtureList;
          f; f = f.m_next) {
          f.Synchronize(broadPhase, this.m_xf, this.m_xf);
        }
        this.m_world.m_contactManager.FindNewContacts();
      }

      SetTransform(xf) {
        this.SetPositionAndAngle(xf.position, xf.GetAngle());
      }

      GetTransform() {
        return this.m_xf;
      }

      GetPosition() {
        return this.m_xf.position;
      }

      SetPosition(position) {
        this.SetPositionAndAngle(position, this.GetAngle());
      }

      GetAngle() {
        return this.m_sweep.a;
      }

      SetAngle(angle) {
        if (angle === undefined) angle = 0;
        this.SetPositionAndAngle(this.GetPosition(), angle);
      }

      GetWorldCenter() {
        return this.m_sweep.c;
      }

      GetLocalCenter() {
        return this.m_sweep.localCenter;
      }

      SetLinearVelocity(v) {
        if (this.m_type == b2Body.b2_staticBody) {
          return;
        }
        this.m_linearVelocity.SetV(v);
      }

      GetLinearVelocity() {
        return this.m_linearVelocity;
      }

      SetAngularVelocity(omega) {
        if (omega === undefined) omega = 0;
        if (this.m_type == b2Body.b2_staticBody) {
          return;
        }
        this.m_angularVelocity = omega;
      }

      GetAngularVelocity() {
        return this.m_angularVelocity;
      }

      GetDefinition() {
        const bd = new b2BodyDef();
        bd.type = this.GetType();
        bd.allowSleep = (this.m_flags & b2Body.e_allowSleepFlag) == b2Body.e_allowSleepFlag;
        bd.angle = this.GetAngle();
        bd.angularDamping = this.m_angularDamping;
        bd.angularVelocity = this.m_angularVelocity;
        bd.fixedRotation = (this.m_flags & b2Body.e_fixedRotationFlag) == b2Body.e_fixedRotationFlag;
        bd.bullet = (this.m_flags & b2Body.e_bulletFlag) == b2Body.e_bulletFlag;
        bd.awake = (this.m_flags & b2Body.e_awakeFlag) == b2Body.e_awakeFlag;
        bd.linearDamping = this.m_linearDamping;
        bd.linearVelocity.SetV(this.GetLinearVelocity());
        bd.position = this.GetPosition();
        bd.userData = this.GetUserData();
        return bd;
      }

      ApplyForce(force, point) {
        if (this.m_type != b2Body.b2_dynamicBody) {
          return;
        }
        if (this.IsAwake() == false) {
          this.SetAwake(true);
        }
        this.m_force.x += force.x;
        this.m_force.y += force.y;
        this.m_torque += ((point.x - this.m_sweep.c.x) * force.y - (point.y - this.m_sweep.c.y) * force.x);
      }

      ApplyTorque(torque) {
        if (torque === undefined) torque = 0;
        if (this.m_type != b2Body.b2_dynamicBody) {
          return;
        }
        if (this.IsAwake() == false) {
          this.SetAwake(true);
        }
        this.m_torque += torque;
      }

      ApplyImpulse(impulse, point) {
        if (this.m_type != b2Body.b2_dynamicBody) {
          return;
        }
        if (this.IsAwake() == false) {
          this.SetAwake(true);
        }
        this.m_linearVelocity.x += this.m_invMass * impulse.x;
        this.m_linearVelocity.y += this.m_invMass * impulse.y;
        this.m_angularVelocity += this.m_invI * ((point.x - this.m_sweep.c.x) * impulse.y - (point.y - this.m_sweep.c.y) * impulse.x);
      }

      Split(callback) {
        const linearVelocity = this.GetLinearVelocity().Copy();
        const angularVelocity = this.GetAngularVelocity();
        const center = this.GetWorldCenter();
        const body1 = this;
        const body2 = this.m_world.CreateBody(this.GetDefinition());
        let prev;
        for (let f = body1.m_fixtureList; f;) {
          if (callback(f)) {
            const next = f.m_next;
            if (prev) {
              prev.m_next = next;
            } else {
              body1.m_fixtureList = next;
            }
            body1.m_fixtureCount--;
            f.m_next = body2.m_fixtureList;
            body2.m_fixtureList = f;
            body2.m_fixtureCount++;
            f.m_body = body2;
            f = next;
          } else {
            prev = f;
            f = f.m_next;
          }
        }
        body1.ResetMassData();
        body2.ResetMassData();
        const center1 = body1.GetWorldCenter();
        const center2 = body2.GetWorldCenter();
        const velocity1 = b2Math.AddVV(linearVelocity, b2Math.CrossFV(angularVelocity, b2Math.SubtractVV(center1, center)));
        const velocity2 = b2Math.AddVV(linearVelocity, b2Math.CrossFV(angularVelocity, b2Math.SubtractVV(center2, center)));
        body1.SetLinearVelocity(velocity1);
        body2.SetLinearVelocity(velocity2);
        body1.SetAngularVelocity(angularVelocity);
        body2.SetAngularVelocity(angularVelocity);
        body1.SynchronizeFixtures();
        body2.SynchronizeFixtures();
        return body2;
      }

      Merge(other) {
        let f;
        for (f = other.m_fixtureList;
          f;) {
          const next = f.m_next;
          other.m_fixtureCount--;
          f.m_next = this.m_fixtureList;
          this.m_fixtureList = f;
          this.m_fixtureCount++;
          f.m_body = body2;
          f = next;
        }
        body1.m_fixtureCount = 0;
        var body1 = this;
        var body2 = other;
        const center1 = body1.GetWorldCenter();
        const center2 = body2.GetWorldCenter();
        const velocity1 = body1.GetLinearVelocity().Copy();
        const velocity2 = body2.GetLinearVelocity().Copy();
        const angular1 = body1.GetAngularVelocity();
        const angular = body2.GetAngularVelocity();
        body1.ResetMassData();
        this.SynchronizeFixtures();
      }

      GetMass() {
        return this.m_mass;
      }

      GetInertia() {
        return this.m_I;
      }

      GetMassData(data) {
        data.mass = this.m_mass;
        data.I = this.m_I;
        data.center.SetV(this.m_sweep.localCenter);
      }

      SetMassData(massData) {
        b2Settings.b2Assert(this.m_world.IsLocked() == false);
        if (this.m_world.IsLocked() == true) {
          return;
        }
        if (this.m_type != b2Body.b2_dynamicBody) {
          return;
        }
        this.m_invMass = 0.0;
        this.m_I = 0.0;
        this.m_invI = 0.0;
        this.m_mass = massData.mass;
        if (this.m_mass <= 0.0) {
          this.m_mass = 1.0;
        }
        this.m_invMass = 1.0 / this.m_mass;
        if (massData.I > 0.0 && (this.m_flags & b2Body.e_fixedRotationFlag) == 0) {
          this.m_I = massData.I - this.m_mass * (massData.center.x * massData.center.x + massData.center.y * massData.center.y);
          this.m_invI = 1.0 / this.m_I;
        }
        const oldCenter = this.m_sweep.c.Copy();
        this.m_sweep.localCenter.SetV(massData.center);
        this.m_sweep.c0.SetV(b2Math.MulX(this.m_xf, this.m_sweep.localCenter));
        this.m_sweep.c.SetV(this.m_sweep.c0);
        this.m_linearVelocity.x += this.m_angularVelocity * (-(this.m_sweep.c.y - oldCenter.y));
        this.m_linearVelocity.y += this.m_angularVelocity * (+(this.m_sweep.c.x - oldCenter.x));
      }

      ResetMassData() {
        this.m_mass = 0.0;
        this.m_invMass = 0.0;
        this.m_I = 0.0;
        this.m_invI = 0.0;
        this.m_sweep.localCenter.SetZero();
        if (this.m_type == b2Body.b2_staticBody || this.m_type == b2Body.b2_kinematicBody) {
          return;
        }
        const center = b2Vec2.Make(0, 0);
        for (let f = this.m_fixtureList; f; f = f.m_next) {
          if (f.m_density == 0.0) {
            continue;
          }
          const massData = f.GetMassData();
          this.m_mass += massData.mass;
          center.x += massData.center.x * massData.mass;
          center.y += massData.center.y * massData.mass;
          this.m_I += massData.I;
        }
        if (this.m_mass > 0.0) {
          this.m_invMass = 1.0 / this.m_mass;
          center.x *= this.m_invMass;
          center.y *= this.m_invMass;
        } else {
          this.m_mass = 1.0;
          this.m_invMass = 1.0;
        }
        if (this.m_I > 0.0 && (this.m_flags & b2Body.e_fixedRotationFlag) == 0) {
          this.m_I -= this.m_mass * (center.x * center.x + center.y * center.y);
          this.m_I *= this.m_inertiaScale;
          b2Settings.b2Assert(this.m_I > 0);
          this.m_invI = 1.0 / this.m_I;
        } else {
          this.m_I = 0.0;
          this.m_invI = 0.0;
        }
        const oldCenter = this.m_sweep.c.Copy();
        this.m_sweep.localCenter.SetV(center);
        this.m_sweep.c0.SetV(b2Math.MulX(this.m_xf, this.m_sweep.localCenter));
        this.m_sweep.c.SetV(this.m_sweep.c0);
        this.m_linearVelocity.x += this.m_angularVelocity * (-(this.m_sweep.c.y - oldCenter.y));
        this.m_linearVelocity.y += this.m_angularVelocity * (+(this.m_sweep.c.x - oldCenter.x));
      }

      GetWorldPoint(localPoint) {
        const A = this.m_xf.R;
        const u = new b2Vec2(A.col1.x * localPoint.x + A.col2.x * localPoint.y, A.col1.y * localPoint.x + A.col2.y * localPoint.y);
        u.x += this.m_xf.position.x;
        u.y += this.m_xf.position.y;
        return u;
      }

      GetWorldVector(localVector) {
        return b2Math.MulMV(this.m_xf.R, localVector);
      }

      GetLocalPoint(worldPoint) {
        return b2Math.MulXT(this.m_xf, worldPoint);
      }

      GetLocalVector(worldVector) {
        return b2Math.MulTMV(this.m_xf.R, worldVector);
      }

      GetLinearVelocityFromWorldPoint(worldPoint) {
        return new b2Vec2(this.m_linearVelocity.x - this.m_angularVelocity * (worldPoint.y - this.m_sweep.c.y), this.m_linearVelocity.y + this.m_angularVelocity * (worldPoint.x - this.m_sweep.c.x));
      }

      GetLinearVelocityFromLocalPoint(localPoint) {
        const A = this.m_xf.R;
        const worldPoint = new b2Vec2(A.col1.x * localPoint.x + A.col2.x * localPoint.y, A.col1.y * localPoint.x + A.col2.y * localPoint.y);
        worldPoint.x += this.m_xf.position.x;
        worldPoint.y += this.m_xf.position.y;
        return new b2Vec2(this.m_linearVelocity.x - this.m_angularVelocity * (worldPoint.y - this.m_sweep.c.y), this.m_linearVelocity.y + this.m_angularVelocity * (worldPoint.x - this.m_sweep.c.x));
      }

      GetLinearDamping() {
        return this.m_linearDamping;
      }

      SetLinearDamping(linearDamping) {
        if (linearDamping === undefined) linearDamping = 0;
        this.m_linearDamping = linearDamping;
      }

      GetAngularDamping() {
        return this.m_angularDamping;
      }

      SetAngularDamping(angularDamping) {
        if (angularDamping === undefined) angularDamping = 0;
        this.m_angularDamping = angularDamping;
      }

      SetType(type) {
        if (type === undefined) type = 0;
        if (this.m_type == type) {
          return;
        }
        this.m_type = type;
        this.ResetMassData();
        if (this.m_type == b2Body.b2_staticBody) {
          this.m_linearVelocity.SetZero();
          this.m_angularVelocity = 0.0;
        }
        this.SetAwake(true);
        this.m_force.SetZero();
        this.m_torque = 0.0;
        for (let ce = this.m_contactList; ce; ce = ce.next) {
          ce.contact.FlagForFiltering();
        }
      }

      GetType() {
        return this.m_type;
      }

      SetBullet(flag) {
        if (flag) {
          this.m_flags |= b2Body.e_bulletFlag;
        } else {
          this.m_flags &= ~b2Body.e_bulletFlag;
        }
      }

      IsBullet() {
        return (this.m_flags & b2Body.e_bulletFlag) == b2Body.e_bulletFlag;
      }

      SetSleepingAllowed(flag) {
        if (flag) {
          this.m_flags |= b2Body.e_allowSleepFlag;
        } else {
          this.m_flags &= ~b2Body.e_allowSleepFlag;
          this.SetAwake(true);
        }
      }

      SetAwake(flag) {
        if (flag) {
          this.m_flags |= b2Body.e_awakeFlag;
          this.m_sleepTime = 0.0;
        } else {
          this.m_flags &= ~b2Body.e_awakeFlag;
          this.m_sleepTime = 0.0;
          this.m_linearVelocity.SetZero();
          this.m_angularVelocity = 0.0;
          this.m_force.SetZero();
          this.m_torque = 0.0;
        }
      }

      IsAwake() {
        return (this.m_flags & b2Body.e_awakeFlag) == b2Body.e_awakeFlag;
      }

      SetFixedRotation(fixed) {
        if (fixed) {
          this.m_flags |= b2Body.e_fixedRotationFlag;
        } else {
          this.m_flags &= ~b2Body.e_fixedRotationFlag;
        }
        this.ResetMassData();
      }

      IsFixedRotation() {
        return (this.m_flags & b2Body.e_fixedRotationFlag) == b2Body.e_fixedRotationFlag;
      }

      SetActive(flag) {
        if (flag == this.IsActive()) {
          return;
        }
        let broadPhase;
        let f;
        if (flag) {
          this.m_flags |= b2Body.e_activeFlag;
          broadPhase = this.m_world.m_contactManager.m_broadPhase;
          for (f = this.m_fixtureList;
            f; f = f.m_next) {
            f.CreateProxy(broadPhase, this.m_xf);
          }
        } else {
          this.m_flags &= ~b2Body.e_activeFlag;
          broadPhase = this.m_world.m_contactManager.m_broadPhase;
          for (f = this.m_fixtureList;
            f; f = f.m_next) {
            f.DestroyProxy(broadPhase);
          }
          let ce = this.m_contactList;
          while (ce) {
            const ce0 = ce;
            ce = ce.next;
            this.m_world.m_contactManager.Destroy(ce0.contact);
          }
          this.m_contactList = null;
        }
      }

      IsActive() {
        return (this.m_flags & b2Body.e_activeFlag) == b2Body.e_activeFlag;
      }

      IsSleepingAllowed() {
        return (this.m_flags & b2Body.e_allowSleepFlag) == b2Body.e_allowSleepFlag;
      }

      GetFixtureList() {
        return this.m_fixtureList;
      }

      GetJointList() {
        return this.m_jointList;
      }

      GetControllerList() {
        return this.m_controllerList;
      }

      GetContactList() {
        return this.m_contactList;
      }

      GetNext() {
        return this.m_next;
      }

      GetUserData() {
        return this.m_userData;
      }

      SetUserData(data) {
        this.m_userData = data;
      }

      GetWorld() {
        return this.m_world;
      }

      b2Body(bd, world) {
        this.m_flags = 0;
        if (bd.bullet) {
          this.m_flags |= b2Body.e_bulletFlag;
        }
        if (bd.fixedRotation) {
          this.m_flags |= b2Body.e_fixedRotationFlag;
        }
        if (bd.allowSleep) {
          this.m_flags |= b2Body.e_allowSleepFlag;
        }
        if (bd.awake) {
          this.m_flags |= b2Body.e_awakeFlag;
        }
        if (bd.active) {
          this.m_flags |= b2Body.e_activeFlag;
        }
        this.m_world = world;
        this.m_xf.position.SetV(bd.position);
        this.m_xf.R.Set(bd.angle);
        this.m_sweep.localCenter.SetZero();
        this.m_sweep.t0 = 1.0;
        this.m_sweep.a0 = this.m_sweep.a = bd.angle;
        const tMat = this.m_xf.R;
        const tVec = this.m_sweep.localCenter;
        this.m_sweep.c.x = (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
        this.m_sweep.c.y = (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
        this.m_sweep.c.x += this.m_xf.position.x;
        this.m_sweep.c.y += this.m_xf.position.y;
        this.m_sweep.c0.SetV(this.m_sweep.c);
        this.m_jointList = null;
        this.m_controllerList = null;
        this.m_contactList = null;
        this.m_controllerCount = 0;
        this.m_prev = null;
        this.m_next = null;
        this.m_linearVelocity.SetV(bd.linearVelocity);
        this.m_angularVelocity = bd.angularVelocity;
        this.m_linearDamping = bd.linearDamping;
        this.m_angularDamping = bd.angularDamping;
        this.m_force.Set(0.0, 0.0);
        this.m_torque = 0.0;
        this.m_sleepTime = 0.0;
        this.m_type = bd.type;
        if (this.m_type == b2Body.b2_dynamicBody) {
          this.m_mass = 1.0;
          this.m_invMass = 1.0;
        } else {
          this.m_mass = 0.0;
          this.m_invMass = 0.0;
        }
        this.m_I = 0.0;
        this.m_invI = 0.0;
        this.m_inertiaScale = bd.inertiaScale;
        this.m_userData = bd.userData;
        this.m_fixtureList = null;
        this.m_fixtureCount = 0;
      }

      SynchronizeFixtures() {
        const xf1 = b2Body.s_xf1;
        xf1.R.Set(this.m_sweep.a0);
        const tMat = xf1.R;
        const tVec = this.m_sweep.localCenter;
        xf1.position.x = this.m_sweep.c0.x - (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
        xf1.position.y = this.m_sweep.c0.y - (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
        let f;
        const broadPhase = this.m_world.m_contactManager.m_broadPhase;
        for (f = this.m_fixtureList;
          f; f = f.m_next) {
          f.Synchronize(broadPhase, xf1, this.m_xf);
        }
      }

      SynchronizeTransform() {
        this.m_xf.R.Set(this.m_sweep.a);
        const tMat = this.m_xf.R;
        const tVec = this.m_sweep.localCenter;
        this.m_xf.position.x = this.m_sweep.c.x - (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
        this.m_xf.position.y = this.m_sweep.c.y - (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
      }

      ShouldCollide(other) {
        if (this.m_type != b2Body.b2_dynamicBody && other.m_type != b2Body.b2_dynamicBody) {
          return false;
        }
        for (let jn = this.m_jointList; jn; jn = jn.next) {
          if (jn.other == other) {
            if (jn.joint.m_collideConnected == false) {
              return false;
            }
          }
        }
        return true;
      }

      Advance(t) {
        if (t === undefined) t = 0;
        this.m_sweep.Advance(t);
        this.m_sweep.c.SetV(this.m_sweep.c0);
        this.m_sweep.a = this.m_sweep.a0;
        this.SynchronizeTransform();
      }
    }

    Box2D.Dynamics.b2Body = b2Body;

    class b2BodyDef {
      constructor() {
        b2BodyDef.b2BodyDef.apply(this, arguments);
        if (this.constructor === b2BodyDef) this.b2BodyDef.apply(this, arguments);
      }

      static b2BodyDef() {
        this.position = new b2Vec2();
        this.linearVelocity = new b2Vec2();
      }

      b2BodyDef() {
        this.userData = null;
        this.position.Set(0.0, 0.0);
        this.angle = 0.0;
        this.linearVelocity.Set(0, 0);
        this.angularVelocity = 0.0;
        this.linearDamping = 0.0;
        this.angularDamping = 0.0;
        this.allowSleep = true;
        this.awake = true;
        this.fixedRotation = false;
        this.bullet = false;
        this.type = b2Body.b2_staticBody;
        this.active = true;
        this.inertiaScale = 1.0;
      }
    }

    Box2D.Dynamics.b2BodyDef = b2BodyDef;

    class b2ContactFilter {
      constructor() {
        b2ContactFilter.b2ContactFilter.apply(this, arguments);
      }

      ShouldCollide(fixtureA, fixtureB) {
        const filter1 = fixtureA.GetFilterData();
        const filter2 = fixtureB.GetFilterData();
        if (filter1.groupIndex == filter2.groupIndex && filter1.groupIndex != 0) {
          return filter1.groupIndex > 0;
        }
        const collide = (filter1.maskBits & filter2.categoryBits) != 0 && (filter1.categoryBits & filter2.maskBits) != 0;
        return collide;
      }

      RayCollide(userData, fixture) {
        if (!userData) return true;
        return this.ShouldCollide((userData instanceof b2Fixture ? userData : null), fixture);
      }
    }

    Box2D.Dynamics.b2ContactFilter = b2ContactFilter;

    class b2ContactImpulse {
      constructor() {
        b2ContactImpulse.b2ContactImpulse.apply(this, arguments);
      }

      static b2ContactImpulse() {
        this.normalImpulses = new Vector_a2j_Number(b2Settings.b2_maxManifoldPoints);
        this.tangentImpulses = new Vector_a2j_Number(b2Settings.b2_maxManifoldPoints);
      }
    }

    Box2D.Dynamics.b2ContactImpulse = b2ContactImpulse;

    class b2ContactListener {
      constructor() {
        b2ContactListener.b2ContactListener.apply(this, arguments);
      }

      BeginContact(contact) { }
      EndContact(contact) { }
      PreSolve(contact, oldManifold) { }
      PostSolve(contact, impulse) { }
    }

    Box2D.Dynamics.b2ContactListener = b2ContactListener;

    class b2ContactManager {
      constructor() {
        b2ContactManager.b2ContactManager.apply(this, arguments);
        if (this.constructor === b2ContactManager) this.b2ContactManager.apply(this, arguments);
      }

      b2ContactManager() {
        this.m_world = null;
        this.m_contactCount = 0;
        this.m_contactFilter = b2ContactFilter.b2_defaultFilter;
        this.m_contactListener = b2ContactListener.b2_defaultListener;
        this.m_contactFactory = new b2ContactFactory(this.m_allocator);
        this.m_broadPhase = new b2DynamicTreeBroadPhase();
      }

      AddPair(proxyUserDataA, proxyUserDataB) {
        let fixtureA = (proxyUserDataA instanceof b2Fixture ? proxyUserDataA : null);
        let fixtureB = (proxyUserDataB instanceof b2Fixture ? proxyUserDataB : null);
        let bodyA = fixtureA.GetBody();
        let bodyB = fixtureB.GetBody();
        if (bodyA == bodyB) return;
        let edge = bodyB.GetContactList();
        while (edge) {
          if (edge.other == bodyA) {
            const fA = edge.contact.GetFixtureA();
            const fB = edge.contact.GetFixtureB();
            if (fA == fixtureA && fB == fixtureB) return;
            if (fA == fixtureB && fB == fixtureA) return;
          }
          edge = edge.next;
        }
        if (bodyB.ShouldCollide(bodyA) == false) {
          return;
        }
        if (this.m_contactFilter.ShouldCollide(fixtureA, fixtureB) == false) {
          return;
        }
        const c = this.m_contactFactory.Create(fixtureA, fixtureB);
        fixtureA = c.GetFixtureA();
        fixtureB = c.GetFixtureB();
        bodyA = fixtureA.m_body;
        bodyB = fixtureB.m_body;
        c.m_prev = null;
        c.m_next = this.m_world.m_contactList;
        if (this.m_world.m_contactList != null) {
          this.m_world.m_contactList.m_prev = c;
        }
        this.m_world.m_contactList = c;
        c.m_nodeA.contact = c;
        c.m_nodeA.other = bodyB;
        c.m_nodeA.prev = null;
        c.m_nodeA.next = bodyA.m_contactList;
        if (bodyA.m_contactList != null) {
          bodyA.m_contactList.prev = c.m_nodeA;
        }
        bodyA.m_contactList = c.m_nodeA;
        c.m_nodeB.contact = c;
        c.m_nodeB.other = bodyA;
        c.m_nodeB.prev = null;
        c.m_nodeB.next = bodyB.m_contactList;
        if (bodyB.m_contactList != null) {
          bodyB.m_contactList.prev = c.m_nodeB;
        }
        bodyB.m_contactList = c.m_nodeB;
        ++this.m_world.m_contactCount;
      }

      FindNewContacts() {
        this.m_broadPhase.UpdatePairs(Box2D.generateCallback(this, this.AddPair));
      }

      Destroy(c) {
        const fixtureA = c.GetFixtureA();
        const fixtureB = c.GetFixtureB();
        const bodyA = fixtureA.GetBody();
        const bodyB = fixtureB.GetBody();
        if (c.IsTouching()) {
          this.m_contactListener.EndContact(c);
        }
        if (c.m_prev) {
          c.m_prev.m_next = c.m_next;
        }
        if (c.m_next) {
          c.m_next.m_prev = c.m_prev;
        }
        if (c == this.m_world.m_contactList) {
          this.m_world.m_contactList = c.m_next;
        }
        if (c.m_nodeA.prev) {
          c.m_nodeA.prev.next = c.m_nodeA.next;
        }
        if (c.m_nodeA.next) {
          c.m_nodeA.next.prev = c.m_nodeA.prev;
        }
        if (c.m_nodeA == bodyA.m_contactList) {
          bodyA.m_contactList = c.m_nodeA.next;
        }
        if (c.m_nodeB.prev) {
          c.m_nodeB.prev.next = c.m_nodeB.next;
        }
        if (c.m_nodeB.next) {
          c.m_nodeB.next.prev = c.m_nodeB.prev;
        }
        if (c.m_nodeB == bodyB.m_contactList) {
          bodyB.m_contactList = c.m_nodeB.next;
        }
        this.m_contactFactory.Destroy(c);
        --this.m_contactCount;
      }

      Collide() {
        let c = this.m_world.m_contactList;
        while (c) {
          const fixtureA = c.GetFixtureA();
          const fixtureB = c.GetFixtureB();
          const bodyA = fixtureA.GetBody();
          const bodyB = fixtureB.GetBody();
          if (bodyA.IsAwake() == false && bodyB.IsAwake() == false) {
            c = c.GetNext();
            continue;
          }
          if (c.m_flags & b2Contact.e_filterFlag) {
            if (bodyB.ShouldCollide(bodyA) == false) {
              var cNuke = c;
              c = cNuke.GetNext();
              this.Destroy(cNuke);
              continue;
            }
            if (this.m_contactFilter.ShouldCollide(fixtureA, fixtureB) == false) {
              cNuke = c;
              c = cNuke.GetNext();
              this.Destroy(cNuke);
              continue;
            }
            c.m_flags &= ~b2Contact.e_filterFlag;
          }
          const proxyA = fixtureA.m_proxy;
          const proxyB = fixtureB.m_proxy;
          const overlap = this.m_broadPhase.TestOverlap(proxyA, proxyB);
          if (overlap == false) {
            cNuke = c;
            c = cNuke.GetNext();
            this.Destroy(cNuke);
            continue;
          }
          c.Update(this.m_contactListener);
          c = c.GetNext();
        }
      }
    }

    Box2D.Dynamics.b2ContactManager = b2ContactManager;

    class b2DebugDraw {
      constructor() {
        b2DebugDraw.b2DebugDraw.apply(this, arguments);
        if (this.constructor === b2DebugDraw) this.b2DebugDraw.apply(this, arguments);
      }

      b2DebugDraw() { }

      SetFlags(flags) {
        if (flags === undefined) flags = 0;
      }

      GetFlags() { }

      AppendFlags(flags) {
        if (flags === undefined) flags = 0;
      }

      ClearFlags(flags) {
        if (flags === undefined) flags = 0;
      }

      SetSprite(sprite) { }
      GetSprite() { }

      SetDrawScale(drawScale) {
        if (drawScale === undefined) drawScale = 0;
      }

      GetDrawScale() { }

      SetLineThickness(lineThickness) {
        if (lineThickness === undefined) lineThickness = 0;
      }

      GetLineThickness() { }

      SetAlpha(alpha) {
        if (alpha === undefined) alpha = 0;
      }

      GetAlpha() { }

      SetFillAlpha(alpha) {
        if (alpha === undefined) alpha = 0;
      }

      GetFillAlpha() { }

      SetXFormScale(xformScale) {
        if (xformScale === undefined) xformScale = 0;
      }

      GetXFormScale() { }

      DrawPolygon(vertices, vertexCount, color) {
        if (vertexCount === undefined) vertexCount = 0;
      }

      DrawSolidPolygon(vertices, vertexCount, color) {
        if (vertexCount === undefined) vertexCount = 0;
      }

      DrawCircle(center, radius, color) {
        if (radius === undefined) radius = 0;
      }

      DrawSolidCircle(center, radius, axis, color) {
        if (radius === undefined) radius = 0;
      }

      DrawSegment(p1, p2, color) { }
      DrawTransform(xf) { }

      static b2DebugDraw() {
        this.m_drawScale = 1.0;
        this.m_lineThickness = 1.0;
        this.m_alpha = 1.0;
        this.m_fillAlpha = 1.0;
        this.m_xformScale = 1.0;
        const __this = this;
        // #WORKAROUND
        this.m_sprite = {
          graphics: {
            clear: function() {
              __this.m_ctx.clearRect(0, 0, __this.m_ctx.canvas.width, __this.m_ctx.canvas.height);
            }
          }
        };
      }

      _color(color, alpha) {
        return 'rgba(' + ((color & 0xFF0000) >> 16) + ',' + ((color & 0xFF00) >> 8) + ',' + (color & 0xFF) + ',' + alpha + ')';
      }

      b2DebugDraw() {
        this.m_drawFlags = 0;
      }

      SetFlags(flags) {
        if (flags === undefined) flags = 0;
        this.m_drawFlags = flags;
      }

      GetFlags() {
        return this.m_drawFlags;
      }

      AppendFlags(flags) {
        if (flags === undefined) flags = 0;
        this.m_drawFlags |= flags;
      }

      ClearFlags(flags) {
        if (flags === undefined) flags = 0;
        this.m_drawFlags &= ~flags;
      }

      SetSprite(sprite) {
        this.m_ctx = sprite;
      }

      GetSprite() {
        return this.m_ctx;
      }

      SetDrawScale(drawScale) {
        if (drawScale === undefined) drawScale = 0;
        this.m_drawScale = drawScale;
      }

      GetDrawScale() {
        return this.m_drawScale;
      }

      SetLineThickness(lineThickness) {
        if (lineThickness === undefined) lineThickness = 0;
        this.m_lineThickness = lineThickness;
        this.m_ctx.strokeWidth = lineThickness;
      }

      GetLineThickness() {
        return this.m_lineThickness;
      }

      SetAlpha(alpha) {
        if (alpha === undefined) alpha = 0;
        this.m_alpha = alpha;
      }

      GetAlpha() {
        return this.m_alpha;
      }

      SetFillAlpha(alpha) {
        if (alpha === undefined) alpha = 0;
        this.m_fillAlpha = alpha;
      }

      GetFillAlpha() {
        return this.m_fillAlpha;
      }

      SetXFormScale(xformScale) {
        if (xformScale === undefined) xformScale = 0;
        this.m_xformScale = xformScale;
      }

      GetXFormScale() {
        return this.m_xformScale;
      }

      DrawPolygon(vertices, vertexCount, color) {
        if (!vertexCount) return;
        const s = this.m_ctx;
        const drawScale = this.m_drawScale;
        s.beginPath();
        s.strokeStyle = this._color(color.color, this.m_alpha);
        s.moveTo(vertices[0].x * drawScale, vertices[0].y * drawScale);
        for (let i = 1; i < vertexCount; i++) {
          s.lineTo(vertices[i].x * drawScale, vertices[i].y * drawScale);
        }
        s.lineTo(vertices[0].x * drawScale, vertices[0].y * drawScale);
        s.closePath();
        s.stroke();
      }

      DrawSolidPolygon(vertices, vertexCount, color) {
        if (!vertexCount) return;
        const s = this.m_ctx;
        const drawScale = this.m_drawScale;
        s.beginPath();
        s.strokeStyle = this._color(color.color, this.m_alpha);
        s.fillStyle = this._color(color.color, this.m_fillAlpha);
        s.moveTo(vertices[0].x * drawScale, vertices[0].y * drawScale);
        for (let i = 1; i < vertexCount; i++) {
          s.lineTo(vertices[i].x * drawScale, vertices[i].y * drawScale);
        }
        s.lineTo(vertices[0].x * drawScale, vertices[0].y * drawScale);
        s.closePath();
        s.fill();
        s.stroke();
      }

      DrawCircle(center, radius, color) {
        if (!radius) return;
        const s = this.m_ctx;
        const drawScale = this.m_drawScale;
        s.beginPath();
        s.strokeStyle = this._color(color.color, this.m_alpha);
        s.arc(center.x * drawScale, center.y * drawScale, radius * drawScale, 0, Math.PI * 2, true);
        s.closePath();
        s.stroke();
      }

      DrawSolidCircle(center, radius, axis, color) {
        if (!radius) return;
        const s = this.m_ctx;
        const drawScale = this.m_drawScale;
        const cx = center.x * drawScale;
        const cy = center.y * drawScale;
        s.moveTo(0, 0);
        s.beginPath();
        s.strokeStyle = this._color(color.color, this.m_alpha);
        s.fillStyle = this._color(color.color, this.m_fillAlpha);
        s.arc(cx, cy, radius * drawScale, 0, Math.PI * 2, true);
        s.moveTo(cx, cy);
        s.lineTo((center.x + axis.x * radius) * drawScale, (center.y + axis.y * radius) * drawScale);
        s.closePath();
        s.fill();
        s.stroke();
      }

      DrawSegment(p1, p2, color) {
        const s = this.m_ctx;
        const drawScale = this.m_drawScale;
        s.strokeStyle = this._color(color.color, this.m_alpha);
        s.beginPath();
        s.moveTo(p1.x * drawScale, p1.y * drawScale);
        s.lineTo(p2.x * drawScale, p2.y * drawScale);
        s.closePath();
        s.stroke();
      }

      DrawTransform(xf) {
        const s = this.m_ctx;
        const drawScale = this.m_drawScale;
        s.beginPath();
        s.strokeStyle = this._color(0xff0000, this.m_alpha);
        s.moveTo(xf.position.x * drawScale, xf.position.y * drawScale);
        s.lineTo((xf.position.x + this.m_xformScale * xf.R.col1.x) * drawScale, (xf.position.y + this.m_xformScale * xf.R.col1.y) * drawScale);

        s.strokeStyle = this._color(0xff00, this.m_alpha);
        s.moveTo(xf.position.x * drawScale, xf.position.y * drawScale);
        s.lineTo((xf.position.x + this.m_xformScale * xf.R.col2.x) * drawScale, (xf.position.y + this.m_xformScale * xf.R.col2.y) * drawScale);
        s.closePath();
        s.stroke();
      }
    }

    Box2D.Dynamics.b2DebugDraw = b2DebugDraw;

    class b2DestructionListener {
      constructor() {
        b2DestructionListener.b2DestructionListener.apply(this, arguments);
      }

      SayGoodbyeJoint(joint) { }
      SayGoodbyeFixture(fixture) { }
    }

    Box2D.Dynamics.b2DestructionListener = b2DestructionListener;

    class b2FilterData {
      constructor() {
        b2FilterData.b2FilterData.apply(this, arguments);
      }

      static b2FilterData() {
        this.categoryBits = 0x0001;
        this.maskBits = 0xFFFF;
        this.groupIndex = 0;
      }

      Copy() {
        const copy = new b2FilterData();
        copy.categoryBits = this.categoryBits;
        copy.maskBits = this.maskBits;
        copy.groupIndex = this.groupIndex;
        return copy;
      }
    }

    Box2D.Dynamics.b2FilterData = b2FilterData;

    class b2Fixture {
      constructor() {
        b2Fixture.b2Fixture.apply(this, arguments);
        if (this.constructor === b2Fixture) this.b2Fixture.apply(this, arguments);
      }

      static b2Fixture() {
        this.m_filter = new b2FilterData();
      }

      GetType() {
        return this.m_shape.GetType();
      }

      GetShape() {
        return this.m_shape;
      }

      SetSensor(sensor) {
        if (this.m_isSensor == sensor) return;
        this.m_isSensor = sensor;
        if (this.m_body == null) return;
        let edge = this.m_body.GetContactList();
        while (edge) {
          const contact = edge.contact;
          const fixtureA = contact.GetFixtureA();
          const fixtureB = contact.GetFixtureB();
          if (fixtureA == this || fixtureB == this) contact.SetSensor(fixtureA.IsSensor() || fixtureB.IsSensor());
          edge = edge.next;
        }
      }

      IsSensor() {
        return this.m_isSensor;
      }

      SetFilterData(filter) {
        this.m_filter = filter.Copy();
        if (this.m_body) return;
        let edge = this.m_body.GetContactList();
        while (edge) {
          const contact = edge.contact;
          const fixtureA = contact.GetFixtureA();
          const fixtureB = contact.GetFixtureB();
          if (fixtureA == this || fixtureB == this) contact.FlagForFiltering();
          edge = edge.next;
        }
      }

      GetFilterData() {
        return this.m_filter.Copy();
      }

      GetBody() {
        return this.m_body;
      }

      GetNext() {
        return this.m_next;
      }

      GetUserData() {
        return this.m_userData;
      }

      SetUserData(data) {
        this.m_userData = data;
      }

      TestPoint(p) {
        return this.m_shape.TestPoint(this.m_body.GetTransform(), p);
      }

      RayCast(output, input) {
        return this.m_shape.RayCast(output, input, this.m_body.GetTransform());
      }

      GetMassData(massData) {
        if (massData === undefined) massData = null;
        if (massData == null) {
          massData = new b2MassData();
        }
        this.m_shape.ComputeMass(massData, this.m_density);
        return massData;
      }

      SetDensity(density) {
        if (density === undefined) density = 0;
        this.m_density = density;
      }

      GetDensity() {
        return this.m_density;
      }

      GetFriction() {
        return this.m_friction;
      }

      SetFriction(friction) {
        if (friction === undefined) friction = 0;
        this.m_friction = friction;
      }

      GetRestitution() {
        return this.m_restitution;
      }

      SetRestitution(restitution) {
        if (restitution === undefined) restitution = 0;
        this.m_restitution = restitution;
      }

      GetAABB() {
        return this.m_aabb;
      }

      b2Fixture() {
        this.m_aabb = new b2AABB();
        this.m_userData = null;
        this.m_body = null;
        this.m_next = null;
        this.m_shape = null;
        this.m_density = 0.0;
        this.m_friction = 0.0;
        this.m_restitution = 0.0;
      }

      Create(body, xf, def) {
        this.m_userData = def.userData;
        this.m_friction = def.friction;
        this.m_restitution = def.restitution;
        this.m_body = body;
        this.m_next = null;
        this.m_filter = def.filter.Copy();
        this.m_isSensor = def.isSensor;
        this.m_shape = def.shape.Copy();
        this.m_density = def.density;
      }

      Destroy() {
        this.m_shape = null;
      }

      CreateProxy(broadPhase, xf) {
        this.m_shape.ComputeAABB(this.m_aabb, xf);
        this.m_proxy = broadPhase.CreateProxy(this.m_aabb, this);
      }

      DestroyProxy(broadPhase) {
        if (this.m_proxy == null) {
          return;
        }
        broadPhase.DestroyProxy(this.m_proxy);
        this.m_proxy = null;
      }

      Synchronize(broadPhase, transform1, transform2) {
        if (!this.m_proxy) return;
        const aabb1 = new b2AABB();
        const aabb2 = new b2AABB();
        this.m_shape.ComputeAABB(aabb1, transform1);
        this.m_shape.ComputeAABB(aabb2, transform2);
        this.m_aabb.Combine(aabb1, aabb2);
        const displacement = b2Math.SubtractVV(transform2.position, transform1.position);
        broadPhase.MoveProxy(this.m_proxy, this.m_aabb, displacement);
      }
    }

    Box2D.Dynamics.b2Fixture = b2Fixture;

    class b2FixtureDef {
      constructor() {
        b2FixtureDef.b2FixtureDef.apply(this, arguments);
        if (this.constructor === b2FixtureDef) this.b2FixtureDef.apply(this, arguments);
      }

      static b2FixtureDef() {
        this.filter = new b2FilterData();
      }

      b2FixtureDef() {
        this.shape = null;
        this.userData = null;
        this.friction = 0.2;
        this.restitution = 0.0;
        this.density = 0.0;
        this.filter.categoryBits = 0x0001;
        this.filter.maskBits = 0xFFFF;
        this.filter.groupIndex = 0;
        this.isSensor = false;
      }
    }

    Box2D.Dynamics.b2FixtureDef = b2FixtureDef;

    class b2Island {
      constructor() {
        b2Island.b2Island.apply(this, arguments);
        if (this.constructor === b2Island) this.b2Island.apply(this, arguments);
      }

      b2Island() {
        this.m_bodies = new Vector();
        this.m_contacts = new Vector();
        this.m_joints = new Vector();
      }

      Initialize(
        bodyCapacity,
        contactCapacity,
        jointCapacity,
        allocator,
        listener,
        contactSolver
      ) {
        if (bodyCapacity === undefined) bodyCapacity = 0;
        if (contactCapacity === undefined) contactCapacity = 0;
        if (jointCapacity === undefined) jointCapacity = 0;
        let i = 0;
        this.m_bodyCapacity = bodyCapacity;
        this.m_contactCapacity = contactCapacity;
        this.m_jointCapacity = jointCapacity;
        this.m_bodyCount = 0;
        this.m_contactCount = 0;
        this.m_jointCount = 0;
        this.m_allocator = allocator;
        this.m_listener = listener;
        this.m_contactSolver = contactSolver;
        for (i = this.m_bodies.length;
          i < bodyCapacity; i++) { this.m_bodies[i] = null; }
        for (i = this.m_contacts.length;
          i < contactCapacity; i++) { this.m_contacts[i] = null; }
        for (i = this.m_joints.length;
          i < jointCapacity; i++) { this.m_joints[i] = null; }
      }

      Clear() {
        this.m_bodyCount = 0;
        this.m_contactCount = 0;
        this.m_jointCount = 0;
      }

      Solve(step, gravity, allowSleep) {
        let i = 0;
        let j = 0;
        let b;
        let joint;
        for (i = 0;
          i < this.m_bodyCount; ++i) {
          b = this.m_bodies[i];
          if (b.GetType() != b2Body.b2_dynamicBody) continue;
          b.m_linearVelocity.x += step.dt * (gravity.x + b.m_invMass * b.m_force.x);
          b.m_linearVelocity.y += step.dt * (gravity.y + b.m_invMass * b.m_force.y);
          b.m_angularVelocity += step.dt * b.m_invI * b.m_torque;
          b.m_linearVelocity.Multiply(b2Math.Clamp(1.0 - step.dt * b.m_linearDamping, 0.0, 1.0));
          b.m_angularVelocity *= b2Math.Clamp(1.0 - step.dt * b.m_angularDamping, 0.0, 1.0);
        }
        this.m_contactSolver.Initialize(step, this.m_contacts, this.m_contactCount, this.m_allocator);
        const contactSolver = this.m_contactSolver;
        contactSolver.InitVelocityConstraints(step);
        for (i = 0;
          i < this.m_jointCount; ++i) {
          joint = this.m_joints[i];
          joint.InitVelocityConstraints(step);
        }
        for (i = 0;
          i < step.velocityIterations; ++i) {
          for (j = 0;
            j < this.m_jointCount; ++j) {
            joint = this.m_joints[j];
            joint.SolveVelocityConstraints(step);
          }
          contactSolver.SolveVelocityConstraints();
        }
        for (i = 0;
          i < this.m_jointCount; ++i) {
          joint = this.m_joints[i];
          joint.FinalizeVelocityConstraints();
        }
        contactSolver.FinalizeVelocityConstraints();
        for (i = 0;
          i < this.m_bodyCount; ++i) {
          b = this.m_bodies[i];
          if (b.GetType() == b2Body.b2_staticBody) continue;
          const translationX = step.dt * b.m_linearVelocity.x;
          const translationY = step.dt * b.m_linearVelocity.y;
          if ((translationX * translationX + translationY * translationY) > b2Settings.b2_maxTranslationSquared) {
            b.m_linearVelocity.Normalize();
            b.m_linearVelocity.x *= b2Settings.b2_maxTranslation * step.inv_dt;
            b.m_linearVelocity.y *= b2Settings.b2_maxTranslation * step.inv_dt;
          }
          const rotation = step.dt * b.m_angularVelocity;
          if (rotation * rotation > b2Settings.b2_maxRotationSquared) {
            if (b.m_angularVelocity < 0.0) {
              b.m_angularVelocity = (-b2Settings.b2_maxRotation * step.inv_dt);
            } else {
              b.m_angularVelocity = b2Settings.b2_maxRotation * step.inv_dt;
            }
          }
          b.m_sweep.c0.SetV(b.m_sweep.c);
          b.m_sweep.a0 = b.m_sweep.a;
          b.m_sweep.c.x += step.dt * b.m_linearVelocity.x;
          b.m_sweep.c.y += step.dt * b.m_linearVelocity.y;
          b.m_sweep.a += step.dt * b.m_angularVelocity;
          b.SynchronizeTransform();
        }
        for (i = 0;
          i < step.positionIterations; ++i) {
          const contactsOkay = contactSolver.SolvePositionConstraints(b2Settings.b2_contactBaumgarte);
          let jointsOkay = true;
          for (j = 0;
            j < this.m_jointCount; ++j) {
            joint = this.m_joints[j];
            const jointOkay = joint.SolvePositionConstraints(b2Settings.b2_contactBaumgarte);
            jointsOkay = jointsOkay && jointOkay;
          }
          if (contactsOkay && jointsOkay) {
            break;
          }
        }
        this.Report(contactSolver.m_constraints);
        if (allowSleep) {
          let minSleepTime = Number.MAX_VALUE;
          const linTolSqr = b2Settings.b2_linearSleepTolerance * b2Settings.b2_linearSleepTolerance;
          const angTolSqr = b2Settings.b2_angularSleepTolerance * b2Settings.b2_angularSleepTolerance;
          for (i = 0;
            i < this.m_bodyCount; ++i) {
            b = this.m_bodies[i];
            if (b.GetType() == b2Body.b2_staticBody) {
              continue;
            }
            if ((b.m_flags & b2Body.e_allowSleepFlag) == 0) {
              b.m_sleepTime = 0.0;
              minSleepTime = 0.0;
            }
            if ((b.m_flags & b2Body.e_allowSleepFlag) == 0 || b.m_angularVelocity * b.m_angularVelocity > angTolSqr || b2Math.Dot(b.m_linearVelocity, b.m_linearVelocity) > linTolSqr) {
              b.m_sleepTime = 0.0;
              minSleepTime = 0.0;
            } else {
              b.m_sleepTime += step.dt;
              minSleepTime = b2Math.Min(minSleepTime, b.m_sleepTime);
            }
          }
          if (minSleepTime >= b2Settings.b2_timeToSleep) {
            for (i = 0;
              i < this.m_bodyCount; ++i) {
              b = this.m_bodies[i];
              b.SetAwake(false);
            }
          }
        }
      }

      SolveTOI(subStep) {
        let i = 0;
        let j = 0;
        this.m_contactSolver.Initialize(subStep, this.m_contacts, this.m_contactCount, this.m_allocator);
        const contactSolver = this.m_contactSolver;
        for (i = 0;
          i < this.m_jointCount; ++i) {
          this.m_joints[i].InitVelocityConstraints(subStep);
        }
        for (i = 0;
          i < subStep.velocityIterations; ++i) {
          contactSolver.SolveVelocityConstraints();
          for (j = 0;
            j < this.m_jointCount; ++j) {
            this.m_joints[j].SolveVelocityConstraints(subStep);
          }
        }
        for (i = 0;
          i < this.m_bodyCount; ++i) {
          const b = this.m_bodies[i];
          if (b.GetType() == b2Body.b2_staticBody) continue;
          const translationX = subStep.dt * b.m_linearVelocity.x;
          const translationY = subStep.dt * b.m_linearVelocity.y;
          if ((translationX * translationX + translationY * translationY) > b2Settings.b2_maxTranslationSquared) {
            b.m_linearVelocity.Normalize();
            b.m_linearVelocity.x *= b2Settings.b2_maxTranslation * subStep.inv_dt;
            b.m_linearVelocity.y *= b2Settings.b2_maxTranslation * subStep.inv_dt;
          }
          const rotation = subStep.dt * b.m_angularVelocity;
          if (rotation * rotation > b2Settings.b2_maxRotationSquared) {
            if (b.m_angularVelocity < 0.0) {
              b.m_angularVelocity = (-b2Settings.b2_maxRotation * subStep.inv_dt);
            } else {
              b.m_angularVelocity = b2Settings.b2_maxRotation * subStep.inv_dt;
            }
          }
          b.m_sweep.c0.SetV(b.m_sweep.c);
          b.m_sweep.a0 = b.m_sweep.a;
          b.m_sweep.c.x += subStep.dt * b.m_linearVelocity.x;
          b.m_sweep.c.y += subStep.dt * b.m_linearVelocity.y;
          b.m_sweep.a += subStep.dt * b.m_angularVelocity;
          b.SynchronizeTransform();
        }
        const k_toiBaumgarte = 0.75;
        for (i = 0;
          i < subStep.positionIterations; ++i) {
          const contactsOkay = contactSolver.SolvePositionConstraints(k_toiBaumgarte);
          let jointsOkay = true;
          for (j = 0;
            j < this.m_jointCount; ++j) {
            const jointOkay = this.m_joints[j].SolvePositionConstraints(b2Settings.b2_contactBaumgarte);
            jointsOkay = jointsOkay && jointOkay;
          }
          if (contactsOkay && jointsOkay) {
            break;
          }
        }
        this.Report(contactSolver.m_constraints);
      }

      Report(constraints) {
        if (this.m_listener == null) {
          return;
        }
        for (let i = 0; i < this.m_contactCount; ++i) {
          const c = this.m_contacts[i];
          const cc = constraints[i];
          for (let j = 0; j < cc.pointCount; ++j) {
            b2Island.s_impulse.normalImpulses[j] = cc.points[j].normalImpulse;
            b2Island.s_impulse.tangentImpulses[j] = cc.points[j].tangentImpulse;
          }
          this.m_listener.PostSolve(c, b2Island.s_impulse);
        }
      }

      AddBody(body) {
        body.m_islandIndex = this.m_bodyCount;
        this.m_bodies[this.m_bodyCount++] = body;
      }

      AddContact(contact) {
        this.m_contacts[this.m_contactCount++] = contact;
      }

      AddJoint(joint) {
        this.m_joints[this.m_jointCount++] = joint;
      }
    }

    Box2D.Dynamics.b2Island = b2Island;

    class b2TimeStep {
      constructor() {
        b2TimeStep.b2TimeStep.apply(this, arguments);
      }

      Set(step) {
        this.dt = step.dt;
        this.inv_dt = step.inv_dt;
        this.positionIterations = step.positionIterations;
        this.velocityIterations = step.velocityIterations;
        this.warmStarting = step.warmStarting;
      }
    }

    Box2D.Dynamics.b2TimeStep = b2TimeStep;

    class b2World {
      constructor() {
        b2World.b2World.apply(this, arguments);
        if (this.constructor === b2World) this.b2World.apply(this, arguments);
      }

      static b2World() {
        this.s_stack = new Vector();
        this.m_contactManager = new b2ContactManager();
        this.m_contactSolver = new b2ContactSolver();
        this.m_island = new b2Island();
      }

      b2World(gravity, doSleep) {
        this.m_destructionListener = null;
        this.m_debugDraw = null;
        this.m_bodyList = null;
        this.m_contactList = null;
        this.m_jointList = null;
        this.m_controllerList = null;
        this.m_bodyCount = 0;
        this.m_contactCount = 0;
        this.m_jointCount = 0;
        this.m_controllerCount = 0;
        b2World.m_warmStarting = true;
        b2World.m_continuousPhysics = true;
        this.m_allowSleep = doSleep;
        this.m_gravity = gravity;
        this.m_inv_dt0 = 0.0;
        this.m_contactManager.m_world = this;
        const bd = new b2BodyDef();
        this.m_groundBody = this.CreateBody(bd);
      }

      SetDestructionListener(listener) {
        this.m_destructionListener = listener;
      }

      SetContactFilter(filter) {
        this.m_contactManager.m_contactFilter = filter;
      }

      SetContactListener(listener) {
        this.m_contactManager.m_contactListener = listener;
      }

      SetDebugDraw(debugDraw) {
        this.m_debugDraw = debugDraw;
      }

      SetBroadPhase(broadPhase) {
        const oldBroadPhase = this.m_contactManager.m_broadPhase;
        this.m_contactManager.m_broadPhase = broadPhase;
        for (let b = this.m_bodyList; b; b = b.m_next) {
          for (let f = b.m_fixtureList; f; f = f.m_next) {
            f.m_proxy = broadPhase.CreateProxy(oldBroadPhase.GetFatAABB(f.m_proxy), f);
          }
        }
      }

      Validate() {
        this.m_contactManager.m_broadPhase.Validate();
      }

      GetProxyCount() {
        return this.m_contactManager.m_broadPhase.GetProxyCount();
      }

      CreateBody(def) {
        if (this.IsLocked() == true) {
          return null;
        }
        const b = new b2Body(def, this);
        b.m_prev = null;
        b.m_next = this.m_bodyList;
        if (this.m_bodyList) {
          this.m_bodyList.m_prev = b;
        }
        this.m_bodyList = b;
        ++this.m_bodyCount;
        return b;
      }

      DestroyBody(b) {
        if (this.IsLocked() == true) {
          return;
        }
        let jn = b.m_jointList;
        while (jn) {
          const jn0 = jn;
          jn = jn.next;
          if (this.m_destructionListener) {
            this.m_destructionListener.SayGoodbyeJoint(jn0.joint);
          }
          this.DestroyJoint(jn0.joint);
        }
        let coe = b.m_controllerList;
        while (coe) {
          const coe0 = coe;
          coe = coe.nextController;
          coe0.controller.RemoveBody(b);
        }
        let ce = b.m_contactList;
        while (ce) {
          const ce0 = ce;
          ce = ce.next;
          this.m_contactManager.Destroy(ce0.contact);
        }
        b.m_contactList = null;
        let f = b.m_fixtureList;
        while (f) {
          const f0 = f;
          f = f.m_next;
          if (this.m_destructionListener) {
            this.m_destructionListener.SayGoodbyeFixture(f0);
          }
          f0.DestroyProxy(this.m_contactManager.m_broadPhase);
          f0.Destroy();
        }
        b.m_fixtureList = null;
        b.m_fixtureCount = 0;
        if (b.m_prev) {
          b.m_prev.m_next = b.m_next;
        }
        if (b.m_next) {
          b.m_next.m_prev = b.m_prev;
        }
        if (b == this.m_bodyList) {
          this.m_bodyList = b.m_next;
        } --this.m_bodyCount;
      }

      CreateJoint(def) {
        const j = b2Joint.Create(def, null);
        j.m_prev = null;
        j.m_next = this.m_jointList;
        if (this.m_jointList) {
          this.m_jointList.m_prev = j;
        }
        this.m_jointList = j;
        ++this.m_jointCount;
        j.m_edgeA.joint = j;
        j.m_edgeA.other = j.m_bodyB;
        j.m_edgeA.prev = null;
        j.m_edgeA.next = j.m_bodyA.m_jointList;
        if (j.m_bodyA.m_jointList) j.m_bodyA.m_jointList.prev = j.m_edgeA;
        j.m_bodyA.m_jointList = j.m_edgeA;
        j.m_edgeB.joint = j;
        j.m_edgeB.other = j.m_bodyA;
        j.m_edgeB.prev = null;
        j.m_edgeB.next = j.m_bodyB.m_jointList;
        if (j.m_bodyB.m_jointList) j.m_bodyB.m_jointList.prev = j.m_edgeB;
        j.m_bodyB.m_jointList = j.m_edgeB;
        const bodyA = def.bodyA;
        const bodyB = def.bodyB;
        if (def.collideConnected == false) {
          let edge = bodyB.GetContactList();
          while (edge) {
            if (edge.other == bodyA) {
              edge.contact.FlagForFiltering();
            }
            edge = edge.next;
          }
        }
        return j;
      }

      DestroyJoint(j) {
        const collideConnected = j.m_collideConnected;
        if (j.m_prev) {
          j.m_prev.m_next = j.m_next;
        }
        if (j.m_next) {
          j.m_next.m_prev = j.m_prev;
        }
        if (j == this.m_jointList) {
          this.m_jointList = j.m_next;
        }
        const bodyA = j.m_bodyA;
        const bodyB = j.m_bodyB;
        bodyA.SetAwake(true);
        bodyB.SetAwake(true);
        if (j.m_edgeA.prev) {
          j.m_edgeA.prev.next = j.m_edgeA.next;
        }
        if (j.m_edgeA.next) {
          j.m_edgeA.next.prev = j.m_edgeA.prev;
        }
        if (j.m_edgeA == bodyA.m_jointList) {
          bodyA.m_jointList = j.m_edgeA.next;
        }
        j.m_edgeA.prev = null;
        j.m_edgeA.next = null;
        if (j.m_edgeB.prev) {
          j.m_edgeB.prev.next = j.m_edgeB.next;
        }
        if (j.m_edgeB.next) {
          j.m_edgeB.next.prev = j.m_edgeB.prev;
        }
        if (j.m_edgeB == bodyB.m_jointList) {
          bodyB.m_jointList = j.m_edgeB.next;
        }
        j.m_edgeB.prev = null;
        j.m_edgeB.next = null;
        b2Joint.Destroy(j, null);
        --this.m_jointCount;
        if (collideConnected == false) {
          let edge = bodyB.GetContactList();
          while (edge) {
            if (edge.other == bodyA) {
              edge.contact.FlagForFiltering();
            }
            edge = edge.next;
          }
        }
      }

      AddController(c) {
        c.m_next = this.m_controllerList;
        c.m_prev = null;
        this.m_controllerList = c;
        c.m_world = this;
        this.m_controllerCount++;
        return c;
      }

      RemoveController(c) {
        if (c.m_prev) c.m_prev.m_next = c.m_next;
        if (c.m_next) c.m_next.m_prev = c.m_prev;
        if (this.m_controllerList == c) this.m_controllerList = c.m_next;
        this.m_controllerCount--;
      }

      CreateController(controller) {
        if (controller.m_world != this) throw new Error('Controller can only be a member of one world');
        controller.m_next = this.m_controllerList;
        controller.m_prev = null;
        if (this.m_controllerList) this.m_controllerList.m_prev = controller;
        this.m_controllerList = controller;
        ++this.m_controllerCount;
        controller.m_world = this;
        return controller;
      }

      DestroyController(controller) {
        controller.Clear();
        if (controller.m_next) controller.m_next.m_prev = controller.m_prev;
        if (controller.m_prev) controller.m_prev.m_next = controller.m_next;
        if (controller == this.m_controllerList) this.m_controllerList = controller.m_next;
        --this.m_controllerCount;
      }

      SetWarmStarting(flag) {
        b2World.m_warmStarting = flag;
      }

      SetContinuousPhysics(flag) {
        b2World.m_continuousPhysics = flag;
      }

      GetBodyCount() {
        return this.m_bodyCount;
      }

      GetJointCount() {
        return this.m_jointCount;
      }

      GetContactCount() {
        return this.m_contactCount;
      }

      SetGravity(gravity) {
        this.m_gravity = gravity;
      }

      GetGravity() {
        return this.m_gravity;
      }

      GetGroundBody() {
        return this.m_groundBody;
      }

      Step(dt, velocityIterations, positionIterations) {
        if (dt === undefined) dt = 0;
        if (velocityIterations === undefined) velocityIterations = 0;
        if (positionIterations === undefined) positionIterations = 0;
        if (this.m_flags & b2World.e_newFixture) {
          this.m_contactManager.FindNewContacts();
          this.m_flags &= ~b2World.e_newFixture;
        }
        this.m_flags |= b2World.e_locked;
        const step = b2World.s_timestep2;
        step.dt = dt;
        step.velocityIterations = velocityIterations;
        step.positionIterations = positionIterations;
        if (dt > 0.0) {
          step.inv_dt = 1.0 / dt;
        } else {
          step.inv_dt = 0.0;
        }
        step.dtRatio = this.m_inv_dt0 * dt;
        step.warmStarting = b2World.m_warmStarting;
        this.m_contactManager.Collide();
        if (step.dt > 0.0) {
          this.Solve(step);
        }
        if (b2World.m_continuousPhysics && step.dt > 0.0) {
          this.SolveTOI(step);
        }
        if (step.dt > 0.0) {
          this.m_inv_dt0 = step.inv_dt;
        }
        this.m_flags &= ~b2World.e_locked;
      }

      ClearForces() {
        for (let body = this.m_bodyList; body; body = body.m_next) {
          body.m_force.SetZero();
          body.m_torque = 0.0;
        }
      }

      DrawDebugData() {
        if (this.m_debugDraw == null) {
          return;
        }
        this.m_debugDraw.m_sprite.graphics.clear();
        const flags = this.m_debugDraw.GetFlags();
        const i = 0;
        let b;
        let f;
        let s;
        let j;
        let bp;
        const invQ = new b2Vec2();
        const x1 = new b2Vec2();
        const x2 = new b2Vec2();
        let xf;
        const b1 = new b2AABB();
        const b2 = new b2AABB();
        let vs = [new b2Vec2(), new b2Vec2(), new b2Vec2(), new b2Vec2()];
        const color = new b2Color(0, 0, 0);
        if (flags & b2DebugDraw.e_shapeBit) {
          for (b = this.m_bodyList;
            b; b = b.m_next) {
            xf = b.m_xf;
            for (f = b.GetFixtureList();
              f; f = f.m_next) {
              s = f.GetShape();
              if (b.IsActive() == false) {
                color.Set(0.5, 0.5, 0.3);
                this.DrawShape(s, xf, color);
              } else if (b.GetType() == b2Body.b2_staticBody) {
                color.Set(0.5, 0.9, 0.5);
                this.DrawShape(s, xf, color);
              } else if (b.GetType() == b2Body.b2_kinematicBody) {
                color.Set(0.5, 0.5, 0.9);
                this.DrawShape(s, xf, color);
              } else if (b.IsAwake() == false) {
                color.Set(0.6, 0.6, 0.6);
                this.DrawShape(s, xf, color);
              } else {
                color.Set(0.9, 0.7, 0.7);
                this.DrawShape(s, xf, color);
              }
            }
          }
        }
        if (flags & b2DebugDraw.e_jointBit) {
          for (j = this.m_jointList;
            j; j = j.m_next) {
            this.DrawJoint(j);
          }
        }
        if (flags & b2DebugDraw.e_controllerBit) {
          for (let c = this.m_controllerList; c; c = c.m_next) {
            c.Draw(this.m_debugDraw);
          }
        }
        if (flags & b2DebugDraw.e_pairBit) {
          color.Set(0.3, 0.9, 0.9);
          for (let contact = this.m_contactManager.m_contactList; contact; contact = contact.GetNext()) {
            const fixtureA = contact.GetFixtureA();
            const fixtureB = contact.GetFixtureB();
            const cA = fixtureA.GetAABB().GetCenter();
            const cB = fixtureB.GetAABB().GetCenter();
            this.m_debugDraw.DrawSegment(cA, cB, color);
          }
        }
        if (flags & b2DebugDraw.e_aabbBit) {
          bp = this.m_contactManager.m_broadPhase;
          vs = [new b2Vec2(), new b2Vec2(), new b2Vec2(), new b2Vec2()];
          for (b = this.m_bodyList;
            b; b = b.GetNext()) {
            if (b.IsActive() == false) {
              continue;
            }
            for (f = b.GetFixtureList();
              f; f = f.GetNext()) {
              const aabb = bp.GetFatAABB(f.m_proxy);
              vs[0].Set(aabb.lowerBound.x, aabb.lowerBound.y);
              vs[1].Set(aabb.upperBound.x, aabb.lowerBound.y);
              vs[2].Set(aabb.upperBound.x, aabb.upperBound.y);
              vs[3].Set(aabb.lowerBound.x, aabb.upperBound.y);
              this.m_debugDraw.DrawPolygon(vs, 4, color);
            }
          }
        }
        if (flags & b2DebugDraw.e_centerOfMassBit) {
          for (b = this.m_bodyList;
            b; b = b.m_next) {
            xf = b2World.s_xf;
            xf.R = b.m_xf.R;
            xf.position = b.GetWorldCenter();
            this.m_debugDraw.DrawTransform(xf);
          }
        }
      }

      QueryAABB(callback, aabb) {
        const __this = this;
        const broadPhase = __this.m_contactManager.m_broadPhase;

        function WorldQueryWrapper(proxy) {
          return callback(broadPhase.GetUserData(proxy));
        }
        broadPhase.Query(WorldQueryWrapper, aabb);
      }

      QueryShape(callback, shape, transform) {
        const __this = this;
        if (transform === undefined) transform = null;
        if (transform == null) {
          transform = new b2Transform();
          transform.SetIdentity();
        }
        const broadPhase = __this.m_contactManager.m_broadPhase;

        function WorldQueryWrapper(proxy) {
          const fixture = (broadPhase.GetUserData(proxy) instanceof b2Fixture ? broadPhase.GetUserData(proxy) : null);
          if (b2Shape.TestOverlap(shape, transform, fixture.GetShape(), fixture.GetBody().GetTransform())) return callback(fixture);
          return true;
        }
        const aabb = new b2AABB();
        shape.ComputeAABB(aabb, transform);
        broadPhase.Query(WorldQueryWrapper, aabb);
      }

      QueryPoint(callback, p) {
        const __this = this;
        const broadPhase = __this.m_contactManager.m_broadPhase;

        function WorldQueryWrapper(proxy) {
          const fixture = (broadPhase.GetUserData(proxy) instanceof b2Fixture ? broadPhase.GetUserData(proxy) : null);
          if (fixture.TestPoint(p)) return callback(fixture);
          return true;
        }
        const aabb = new b2AABB();
        aabb.lowerBound.Set(p.x - b2Settings.b2_linearSlop, p.y - b2Settings.b2_linearSlop);
        aabb.upperBound.Set(p.x + b2Settings.b2_linearSlop, p.y + b2Settings.b2_linearSlop);
        broadPhase.Query(WorldQueryWrapper, aabb);
      }

      RayCast(callback, point1, point2) {
        const __this = this;
        const broadPhase = __this.m_contactManager.m_broadPhase;
        const output = new b2RayCastOutput();

        function RayCastWrapper(input, proxy) {
          const userData = broadPhase.GetUserData(proxy);
          const fixture = (userData instanceof b2Fixture ? userData : null);
          const hit = fixture.RayCast(output, input);
          if (hit) {
            const fraction = output.fraction;
            const point = new b2Vec2((1.0 - fraction) * point1.x + fraction * point2.x, (1.0 - fraction) * point1.y + fraction * point2.y);
            return callback(fixture, point, output.normal, fraction);
          }
          return input.maxFraction;
        }
        const input = new b2RayCastInput(point1, point2);
        broadPhase.RayCast(RayCastWrapper, input);
      }

      RayCastOne(point1, point2) {
        const __this = this;
        let result;

        function RayCastOneWrapper(fixture, point, normal, fraction) {
          if (fraction === undefined) fraction = 0;
          result = fixture;
          return fraction;
        }
        __this.RayCast(RayCastOneWrapper, point1, point2);
        return result;
      }

      RayCastAll(point1, point2) {
        const __this = this;
        const result = new Vector();

        function RayCastAllWrapper(fixture, point, normal, fraction) {
          if (fraction === undefined) fraction = 0;
          result[result.length] = fixture;
          return 1;
        }
        __this.RayCast(RayCastAllWrapper, point1, point2);
        return result;
      }

      GetBodyList() {
        return this.m_bodyList;
      }

      GetJointList() {
        return this.m_jointList;
      }

      GetContactList() {
        return this.m_contactList;
      }

      IsLocked() {
        return (this.m_flags & b2World.e_locked) > 0;
      }

      Solve(step) {
        let b;
        for (let controller = this.m_controllerList; controller; controller = controller.m_next) {
          controller.Step(step);
        }
        const island = this.m_island;
        island.Initialize(this.m_bodyCount, this.m_contactCount, this.m_jointCount, null, this.m_contactManager.m_contactListener, this.m_contactSolver);
        for (b = this.m_bodyList;
          b; b = b.m_next) {
          b.m_flags &= ~b2Body.e_islandFlag;
        }
        for (let c = this.m_contactList; c; c = c.m_next) {
          c.m_flags &= ~b2Contact.e_islandFlag;
        }
        for (let j = this.m_jointList; j; j = j.m_next) {
          j.m_islandFlag = false;
        }
        const stackSize = parseInt(this.m_bodyCount);
        const stack = this.s_stack;
        for (let seed = this.m_bodyList; seed; seed = seed.m_next) {
          if (seed.m_flags & b2Body.e_islandFlag) {
            continue;
          }
          if (seed.IsAwake() == false || seed.IsActive() == false) {
            continue;
          }
          if (seed.GetType() == b2Body.b2_staticBody) {
            continue;
          }
          island.Clear();
          let stackCount = 0;
          stack[stackCount++] = seed;
          seed.m_flags |= b2Body.e_islandFlag;
          while (stackCount > 0) {
            b = stack[--stackCount];
            island.AddBody(b);
            if (b.IsAwake() == false) {
              b.SetAwake(true);
            }
            if (b.GetType() == b2Body.b2_staticBody) {
              continue;
            }
            let other;
            for (let ce = b.m_contactList; ce; ce = ce.next) {
              if (ce.contact.m_flags & b2Contact.e_islandFlag) {
                continue;
              }
              if (ce.contact.IsSensor() == true || ce.contact.IsEnabled() == false || ce.contact.IsTouching() == false) {
                continue;
              }
              island.AddContact(ce.contact);
              ce.contact.m_flags |= b2Contact.e_islandFlag;
              other = ce.other;
              if (other.m_flags & b2Body.e_islandFlag) {
                continue;
              }
              stack[stackCount++] = other;
              other.m_flags |= b2Body.e_islandFlag;
            }
            for (let jn = b.m_jointList; jn; jn = jn.next) {
              if (jn.joint.m_islandFlag == true) {
                continue;
              }
              other = jn.other;
              if (other.IsActive() == false) {
                continue;
              }
              island.AddJoint(jn.joint);
              jn.joint.m_islandFlag = true;
              if (other.m_flags & b2Body.e_islandFlag) {
                continue;
              }
              stack[stackCount++] = other;
              other.m_flags |= b2Body.e_islandFlag;
            }
          }
          island.Solve(step, this.m_gravity, this.m_allowSleep);
          for (var i = 0; i < island.m_bodyCount; ++i) {
            b = island.m_bodies[i];
            if (b.GetType() == b2Body.b2_staticBody) {
              b.m_flags &= ~b2Body.e_islandFlag;
            }
          }
        }
        for (i = 0;
          i < stack.length; ++i) {
          if (!stack[i]) break;
          stack[i] = null;
        }
        for (b = this.m_bodyList;
          b; b = b.m_next) {
          if (b.IsAwake() == false || b.IsActive() == false) {
            continue;
          }
          if (b.GetType() == b2Body.b2_staticBody) {
            continue;
          }
          b.SynchronizeFixtures();
        }
        this.m_contactManager.FindNewContacts();
      }

      SolveTOI(step) {
        let b;
        let fA;
        let fB;
        let bA;
        let bB;
        let cEdge;
        let j;
        const island = this.m_island;
        island.Initialize(this.m_bodyCount, b2Settings.b2_maxTOIContactsPerIsland, b2Settings.b2_maxTOIJointsPerIsland, null, this.m_contactManager.m_contactListener, this.m_contactSolver);
        const queue = b2World.s_queue;
        for (b = this.m_bodyList;
          b; b = b.m_next) {
          b.m_flags &= ~b2Body.e_islandFlag;
          b.m_sweep.t0 = 0.0;
        }
        let c;
        for (c = this.m_contactList;
          c; c = c.m_next) {
          c.m_flags &= ~(b2Contact.e_toiFlag | b2Contact.e_islandFlag);
        }
        for (j = this.m_jointList;
          j; j = j.m_next) {
          j.m_islandFlag = false;
        }
        for (; ;) {
          let minContact = null;
          let minTOI = 1.0;
          for (c = this.m_contactList;
            c; c = c.m_next) {
            if (c.IsSensor() == true || c.IsEnabled() == false || c.IsContinuous() == false) {
              continue;
            }
            let toi = 1.0;
            if (c.m_flags & b2Contact.e_toiFlag) {
              toi = c.m_toi;
            } else {
              fA = c.m_fixtureA;
              fB = c.m_fixtureB;
              bA = fA.m_body;
              bB = fB.m_body;
              if ((bA.GetType() != b2Body.b2_dynamicBody || bA.IsAwake() == false) && (bB.GetType() != b2Body.b2_dynamicBody || bB.IsAwake() == false)) {
                continue;
              }
              let t0 = bA.m_sweep.t0;
              if (bA.m_sweep.t0 < bB.m_sweep.t0) {
                t0 = bB.m_sweep.t0;
                bA.m_sweep.Advance(t0);
              } else if (bB.m_sweep.t0 < bA.m_sweep.t0) {
                t0 = bA.m_sweep.t0;
                bB.m_sweep.Advance(t0);
              }
              toi = c.ComputeTOI(bA.m_sweep, bB.m_sweep);
              b2Settings.b2Assert(toi >= 0.0 && toi <= 1.0);
              if (toi > 0.0 && toi < 1.0) {
                toi = (1.0 - toi) * t0 + toi;
                if (toi > 1) toi = 1;
              }
              c.m_toi = toi;
              c.m_flags |= b2Contact.e_toiFlag;
            }
            if (Number.MIN_VALUE < toi && toi < minTOI) {
              minContact = c;
              minTOI = toi;
            }
          }
          if (minContact == null || 1.0 - 100.0 * Number.MIN_VALUE < minTOI) {
            break;
          }
          fA = minContact.m_fixtureA;
          fB = minContact.m_fixtureB;
          bA = fA.m_body;
          bB = fB.m_body;
          b2World.s_backupA.Set(bA.m_sweep);
          b2World.s_backupB.Set(bB.m_sweep);
          bA.Advance(minTOI);
          bB.Advance(minTOI);
          minContact.Update(this.m_contactManager.m_contactListener);
          minContact.m_flags &= ~b2Contact.e_toiFlag;
          if (minContact.IsSensor() == true || minContact.IsEnabled() == false) {
            bA.m_sweep.Set(b2World.s_backupA);
            bB.m_sweep.Set(b2World.s_backupB);
            bA.SynchronizeTransform();
            bB.SynchronizeTransform();
            continue;
          }
          if (minContact.IsTouching() == false) {
            continue;
          }
          let seed = bA;
          if (seed.GetType() != b2Body.b2_dynamicBody) {
            seed = bB;
          }
          island.Clear();
          let queueStart = 0;
          let queueSize = 0;
          queue[queueStart + queueSize++] = seed;
          seed.m_flags |= b2Body.e_islandFlag;
          while (queueSize > 0) {
            b = queue[queueStart++];
            --queueSize;
            island.AddBody(b);
            if (b.IsAwake() == false) {
              b.SetAwake(true);
            }
            if (b.GetType() != b2Body.b2_dynamicBody) {
              continue;
            }
            for (cEdge = b.m_contactList;
              cEdge; cEdge = cEdge.next) {
              if (island.m_contactCount == island.m_contactCapacity) {
                break;
              }
              if (cEdge.contact.m_flags & b2Contact.e_islandFlag) {
                continue;
              }
              if (cEdge.contact.IsSensor() == true || cEdge.contact.IsEnabled() == false || cEdge.contact.IsTouching() == false) {
                continue;
              }
              island.AddContact(cEdge.contact);
              cEdge.contact.m_flags |= b2Contact.e_islandFlag;
              var other = cEdge.other;
              if (other.m_flags & b2Body.e_islandFlag) {
                continue;
              }
              if (other.GetType() != b2Body.b2_staticBody) {
                other.Advance(minTOI);
                other.SetAwake(true);
              }
              queue[queueStart + queueSize] = other;
              ++queueSize;
              other.m_flags |= b2Body.e_islandFlag;
            }
            for (let jEdge = b.m_jointList; jEdge; jEdge = jEdge.next) {
              if (island.m_jointCount == island.m_jointCapacity) continue;
              if (jEdge.joint.m_islandFlag == true) continue;
              other = jEdge.other;
              if (other.IsActive() == false) {
                continue;
              }
              island.AddJoint(jEdge.joint);
              jEdge.joint.m_islandFlag = true;
              if (other.m_flags & b2Body.e_islandFlag) continue;
              if (other.GetType() != b2Body.b2_staticBody) {
                other.Advance(minTOI);
                other.SetAwake(true);
              }
              queue[queueStart + queueSize] = other;
              ++queueSize;
              other.m_flags |= b2Body.e_islandFlag;
            }
          }
          const subStep = b2World.s_timestep;
          subStep.warmStarting = false;
          subStep.dt = (1.0 - minTOI) * step.dt;
          subStep.inv_dt = 1.0 / subStep.dt;
          subStep.dtRatio = 0.0;
          subStep.velocityIterations = step.velocityIterations;
          subStep.positionIterations = step.positionIterations;
          island.SolveTOI(subStep);
          let i = 0;
          for (i = 0;
            i < island.m_bodyCount; ++i) {
            b = island.m_bodies[i];
            b.m_flags &= ~b2Body.e_islandFlag;
            if (b.IsAwake() == false) {
              continue;
            }
            if (b.GetType() != b2Body.b2_dynamicBody) {
              continue;
            }
            b.SynchronizeFixtures();
            for (cEdge = b.m_contactList;
              cEdge; cEdge = cEdge.next) {
              cEdge.contact.m_flags &= ~b2Contact.e_toiFlag;
            }
          }
          for (i = 0;
            i < island.m_contactCount; ++i) {
            c = island.m_contacts[i];
            c.m_flags &= ~(b2Contact.e_toiFlag | b2Contact.e_islandFlag);
          }
          for (i = 0;
            i < island.m_jointCount; ++i) {
            j = island.m_joints[i];
            j.m_islandFlag = false;
          }
          this.m_contactManager.FindNewContacts();
        }
      }

      DrawJoint(joint) {
        const b1 = joint.GetBodyA();
        const b2 = joint.GetBodyB();
        const xf1 = b1.m_xf;
        const xf2 = b2.m_xf;
        const x1 = xf1.position;
        const x2 = xf2.position;
        const p1 = joint.GetAnchorA();
        const p2 = joint.GetAnchorB();
        const color = b2World.s_jointColor;
        switch (joint.m_type) {
          case b2Joint.e_distanceJoint:
            this.m_debugDraw.DrawSegment(p1, p2, color);
            break;
          case b2Joint.e_pulleyJoint:
            {
              const pulley = ((joint instanceof b2PulleyJoint ? joint : null));
              const s1 = pulley.GetGroundAnchorA();
              const s2 = pulley.GetGroundAnchorB();
              this.m_debugDraw.DrawSegment(s1, p1, color);
              this.m_debugDraw.DrawSegment(s2, p2, color);
              this.m_debugDraw.DrawSegment(s1, s2, color);
            }
            break;
          case b2Joint.e_mouseJoint:
            this.m_debugDraw.DrawSegment(p1, p2, color);
            break;
          default:
            if (b1 != this.m_groundBody) this.m_debugDraw.DrawSegment(x1, p1, color);
            this.m_debugDraw.DrawSegment(p1, p2, color);
            if (b2 != this.m_groundBody) this.m_debugDraw.DrawSegment(x2, p2, color);
        }
      }

      DrawShape(shape, xf, color) {
        switch (shape.m_type) {
          case b2Shape.e_circleShape:
            {
              const circle = ((shape instanceof b2CircleShape ? shape : null));
              const center = b2Math.MulX(xf, circle.m_p);
              const radius = circle.m_radius;
              const axis = xf.R.col1;
              this.m_debugDraw.DrawSolidCircle(center, radius, axis, color);
            }
            break;
          case b2Shape.e_polygonShape:
            {
              let i = 0;
              const poly = ((shape instanceof b2PolygonShape ? shape : null));
              const vertexCount = parseInt(poly.GetVertexCount());
              const localVertices = poly.GetVertices();
              const vertices = new Vector(vertexCount);
              for (i = 0;
                i < vertexCount; ++i) {
                vertices[i] = b2Math.MulX(xf, localVertices[i]);
              }
              this.m_debugDraw.DrawSolidPolygon(vertices, vertexCount, color);
            }
            break;
          case b2Shape.e_edgeShape:
            {
              const edge = (shape instanceof b2EdgeShape ? shape : null);
              this.m_debugDraw.DrawSegment(b2Math.MulX(xf, edge.GetVertex1()), b2Math.MulX(xf, edge.GetVertex2()), color);
            }
            break;
        }
      }
    }

    Box2D.Dynamics.b2World = b2World;

    class b2Contact {
      constructor() {
        b2Contact.b2Contact.apply(this, arguments);
        if (this.constructor === b2Contact) this.b2Contact.apply(this, arguments);
      }

      static b2Contact() {
        this.m_nodeA = new b2ContactEdge();
        this.m_nodeB = new b2ContactEdge();
        this.m_manifold = new b2Manifold();
        this.m_oldManifold = new b2Manifold();
      }

      GetManifold() {
        return this.m_manifold;
      }

      GetWorldManifold(worldManifold) {
        const bodyA = this.m_fixtureA.GetBody();
        const bodyB = this.m_fixtureB.GetBody();
        const shapeA = this.m_fixtureA.GetShape();
        const shapeB = this.m_fixtureB.GetShape();
        worldManifold.Initialize(this.m_manifold, bodyA.GetTransform(), shapeA.m_radius, bodyB.GetTransform(), shapeB.m_radius);
      }

      IsTouching() {
        return (this.m_flags & b2Contact.e_touchingFlag) == b2Contact.e_touchingFlag;
      }

      IsContinuous() {
        return (this.m_flags & b2Contact.e_continuousFlag) == b2Contact.e_continuousFlag;
      }

      SetSensor(sensor) {
        if (sensor) {
          this.m_flags |= b2Contact.e_sensorFlag;
        } else {
          this.m_flags &= ~b2Contact.e_sensorFlag;
        }
      }

      IsSensor() {
        return (this.m_flags & b2Contact.e_sensorFlag) == b2Contact.e_sensorFlag;
      }

      SetEnabled(flag) {
        if (flag) {
          this.m_flags |= b2Contact.e_enabledFlag;
        } else {
          this.m_flags &= ~b2Contact.e_enabledFlag;
        }
      }

      IsEnabled() {
        return (this.m_flags & b2Contact.e_enabledFlag) == b2Contact.e_enabledFlag;
      }

      GetNext() {
        return this.m_next;
      }

      GetFixtureA() {
        return this.m_fixtureA;
      }

      GetFixtureB() {
        return this.m_fixtureB;
      }

      FlagForFiltering() {
        this.m_flags |= b2Contact.e_filterFlag;
      }

      b2Contact() { }

      Reset(fixtureA, fixtureB) {
        if (fixtureA === undefined) fixtureA = null;
        if (fixtureB === undefined) fixtureB = null;
        this.m_flags = b2Contact.e_enabledFlag;
        if (!fixtureA || !fixtureB) {
          this.m_fixtureA = null;
          this.m_fixtureB = null;
          return;
        }
        if (fixtureA.IsSensor() || fixtureB.IsSensor()) {
          this.m_flags |= b2Contact.e_sensorFlag;
        }
        const bodyA = fixtureA.GetBody();
        const bodyB = fixtureB.GetBody();
        if (bodyA.GetType() != b2Body.b2_dynamicBody || bodyA.IsBullet() || bodyB.GetType() != b2Body.b2_dynamicBody || bodyB.IsBullet()) {
          this.m_flags |= b2Contact.e_continuousFlag;
        }
        this.m_fixtureA = fixtureA;
        this.m_fixtureB = fixtureB;
        this.m_manifold.m_pointCount = 0;
        this.m_prev = null;
        this.m_next = null;
        this.m_nodeA.contact = null;
        this.m_nodeA.prev = null;
        this.m_nodeA.next = null;
        this.m_nodeA.other = null;
        this.m_nodeB.contact = null;
        this.m_nodeB.prev = null;
        this.m_nodeB.next = null;
        this.m_nodeB.other = null;
      }

      Update(listener) {
        const tManifold = this.m_oldManifold;
        this.m_oldManifold = this.m_manifold;
        this.m_manifold = tManifold;
        this.m_flags |= b2Contact.e_enabledFlag;
        let touching = false;
        const wasTouching = (this.m_flags & b2Contact.e_touchingFlag) == b2Contact.e_touchingFlag;
        const bodyA = this.m_fixtureA.m_body;
        const bodyB = this.m_fixtureB.m_body;
        const aabbOverlap = this.m_fixtureA.m_aabb.TestOverlap(this.m_fixtureB.m_aabb);
        if (this.m_flags & b2Contact.e_sensorFlag) {
          if (aabbOverlap) {
            const shapeA = this.m_fixtureA.GetShape();
            const shapeB = this.m_fixtureB.GetShape();
            const xfA = bodyA.GetTransform();
            const xfB = bodyB.GetTransform();
            touching = b2Shape.TestOverlap(shapeA, xfA, shapeB, xfB);
          }
          this.m_manifold.m_pointCount = 0;
        } else {
          if (bodyA.GetType() != b2Body.b2_dynamicBody || bodyA.IsBullet() || bodyB.GetType() != b2Body.b2_dynamicBody || bodyB.IsBullet()) {
            this.m_flags |= b2Contact.e_continuousFlag;
          } else {
            this.m_flags &= ~b2Contact.e_continuousFlag;
          }
          if (aabbOverlap) {
            this.Evaluate();
            touching = this.m_manifold.m_pointCount > 0;
            for (let i = 0; i < this.m_manifold.m_pointCount; ++i) {
              const mp2 = this.m_manifold.m_points[i];
              mp2.m_normalImpulse = 0.0;
              mp2.m_tangentImpulse = 0.0;
              const id2 = mp2.m_id;
              for (let j = 0; j < this.m_oldManifold.m_pointCount; ++j) {
                const mp1 = this.m_oldManifold.m_points[j];
                if (mp1.m_id.key == id2.key) {
                  mp2.m_normalImpulse = mp1.m_normalImpulse;
                  mp2.m_tangentImpulse = mp1.m_tangentImpulse;
                  break;
                }
              }
            }
          } else {
            this.m_manifold.m_pointCount = 0;
          }
          if (touching != wasTouching) {
            bodyA.SetAwake(true);
            bodyB.SetAwake(true);
          }
        }
        if (touching) {
          this.m_flags |= b2Contact.e_touchingFlag;
        } else {
          this.m_flags &= ~b2Contact.e_touchingFlag;
        }
        if (wasTouching == false && touching == true) {
          listener.BeginContact(this);
        }
        if (wasTouching == true && touching == false) {
          listener.EndContact(this);
        }
        if ((this.m_flags & b2Contact.e_sensorFlag) == 0) {
          listener.PreSolve(this, this.m_oldManifold);
        }
      }

      Evaluate() { }

      ComputeTOI(sweepA, sweepB) {
        b2Contact.s_input.proxyA.Set(this.m_fixtureA.GetShape());
        b2Contact.s_input.proxyB.Set(this.m_fixtureB.GetShape());
        b2Contact.s_input.sweepA = sweepA;
        b2Contact.s_input.sweepB = sweepB;
        b2Contact.s_input.tolerance = b2Settings.b2_linearSlop;
        return b2TimeOfImpact.TimeOfImpact(b2Contact.s_input);
      }
    }

    Box2D.Dynamics.Contacts.b2Contact = b2Contact;

    class b2CircleContact extends b2Contact {
      constructor() {
        super(...arguments);
        b2CircleContact.b2CircleContact.apply(this, arguments);
      }

      static b2CircleContact() {
        Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this, arguments);
      }

      Reset(fixtureA, fixtureB) {
        this.__super.Reset.call(this, fixtureA, fixtureB);
      }

      Evaluate() {
        const bA = this.m_fixtureA.GetBody();
        const bB = this.m_fixtureB.GetBody();
        b2Collision.CollideCircles(this.m_manifold, (this.m_fixtureA.GetShape() instanceof b2CircleShape ? this.m_fixtureA.GetShape() : null), bA.m_xf, (this.m_fixtureB.GetShape() instanceof b2CircleShape ? this.m_fixtureB.GetShape() : null), bB.m_xf);
      }
    }

    Box2D.Dynamics.Contacts.b2CircleContact = b2CircleContact;

    class b2ContactConstraint {
      constructor() {
        b2ContactConstraint.b2ContactConstraint.apply(this, arguments);
        if (this.constructor === b2ContactConstraint) this.b2ContactConstraint.apply(this, arguments);
      }

      static b2ContactConstraint() {
        this.localPlaneNormal = new b2Vec2();
        this.localPoint = new b2Vec2();
        this.normal = new b2Vec2();
        this.normalMass = new b2Mat22();
        this.K = new b2Mat22();
      }

      b2ContactConstraint() {
        this.points = new Vector(b2Settings.b2_maxManifoldPoints);
        for (let i = 0; i < b2Settings.b2_maxManifoldPoints; i++) {
          this.points[i] = new b2ContactConstraintPoint();
        }
      }
    }

    Box2D.Dynamics.Contacts.b2ContactConstraint = b2ContactConstraint;

    class b2ContactConstraintPoint {
      constructor() {
        b2ContactConstraintPoint.b2ContactConstraintPoint.apply(this, arguments);
      }

      static b2ContactConstraintPoint() {
        this.localPoint = new b2Vec2();
        this.rA = new b2Vec2();
        this.rB = new b2Vec2();
      }
    }

    Box2D.Dynamics.Contacts.b2ContactConstraintPoint = b2ContactConstraintPoint;

    function b2ContactEdge() {
      b2ContactEdge.b2ContactEdge.apply(this, arguments);
    }
    Box2D.Dynamics.Contacts.b2ContactEdge = b2ContactEdge;

    class b2ContactFactory {
      constructor() {
        b2ContactFactory.b2ContactFactory.apply(this, arguments);
        if (this.constructor === b2ContactFactory) this.b2ContactFactory.apply(this, arguments);
      }

      b2ContactFactory(allocator) {
        this.m_allocator = allocator;
        this.InitializeRegisters();
      }

      AddType(createFcn, destroyFcn, type1, type2) {
        if (type1 === undefined) type1 = 0;
        if (type2 === undefined) type2 = 0;
        this.m_registers[type1][type2].createFcn = createFcn;
        this.m_registers[type1][type2].destroyFcn = destroyFcn;
        this.m_registers[type1][type2].primary = true;
        if (type1 != type2) {
          this.m_registers[type2][type1].createFcn = createFcn;
          this.m_registers[type2][type1].destroyFcn = destroyFcn;
          this.m_registers[type2][type1].primary = false;
        }
      }

      InitializeRegisters() {
        this.m_registers = new Vector(b2Shape.e_shapeTypeCount);
        for (let i = 0; i < b2Shape.e_shapeTypeCount; i++) {
          this.m_registers[i] = new Vector(b2Shape.e_shapeTypeCount);
          for (let j = 0; j < b2Shape.e_shapeTypeCount; j++) {
            this.m_registers[i][j] = new b2ContactRegister();
          }
        }
        this.AddType(b2CircleContact.Create, b2CircleContact.Destroy, b2Shape.e_circleShape, b2Shape.e_circleShape);
        this.AddType(b2PolyAndCircleContact.Create, b2PolyAndCircleContact.Destroy, b2Shape.e_polygonShape, b2Shape.e_circleShape);
        this.AddType(b2PolygonContact.Create, b2PolygonContact.Destroy, b2Shape.e_polygonShape, b2Shape.e_polygonShape);
        this.AddType(b2EdgeAndCircleContact.Create, b2EdgeAndCircleContact.Destroy, b2Shape.e_edgeShape, b2Shape.e_circleShape);
        this.AddType(b2PolyAndEdgeContact.Create, b2PolyAndEdgeContact.Destroy, b2Shape.e_polygonShape, b2Shape.e_edgeShape);
      }

      Create(fixtureA, fixtureB) {
        const type1 = parseInt(fixtureA.GetType());
        const type2 = parseInt(fixtureB.GetType());
        const reg = this.m_registers[type1][type2];
        let c;
        if (reg.pool) {
          c = reg.pool;
          reg.pool = c.m_next;
          reg.poolCount--;
          c.Reset(fixtureA, fixtureB);
          return c;
        }
        const createFcn = reg.createFcn;
        if (createFcn != null) {
          if (reg.primary) {
            c = createFcn(this.m_allocator);
            c.Reset(fixtureA, fixtureB);
            return c;
          } else {
            c = createFcn(this.m_allocator);
            c.Reset(fixtureB, fixtureA);
            return c;
          }
        } else {
          return null;
        }
      }

      Destroy(contact) {
        if (contact.m_manifold.m_pointCount > 0) {
          contact.m_fixtureA.m_body.SetAwake(true);
          contact.m_fixtureB.m_body.SetAwake(true);
        }
        const type1 = parseInt(contact.m_fixtureA.GetType());
        const type2 = parseInt(contact.m_fixtureB.GetType());
        const reg = this.m_registers[type1][type2];
        if (true) {
          reg.poolCount++;
          contact.m_next = reg.pool;
          reg.pool = contact;
        }
        const destroyFcn = reg.destroyFcn;
        destroyFcn(contact, this.m_allocator);
      }
    }

    Box2D.Dynamics.Contacts.b2ContactFactory = b2ContactFactory;

    function b2ContactRegister() {
      b2ContactRegister.b2ContactRegister.apply(this, arguments);
    }
    Box2D.Dynamics.Contacts.b2ContactRegister = b2ContactRegister;

    class b2ContactResult {
      constructor() {
        b2ContactResult.b2ContactResult.apply(this, arguments);
      }

      static b2ContactResult() {
        this.position = new b2Vec2();
        this.normal = new b2Vec2();
        this.id = new b2ContactID();
      }
    }

    Box2D.Dynamics.Contacts.b2ContactResult = b2ContactResult;

    class b2ContactSolver {
      constructor() {
        b2ContactSolver.b2ContactSolver.apply(this, arguments);
        if (this.constructor === b2ContactSolver) this.b2ContactSolver.apply(this, arguments);
      }

      static b2ContactSolver() {
        this.m_step = new b2TimeStep();
        this.m_constraints = new Vector();
      }

      b2ContactSolver() { }

      Initialize(step, contacts, contactCount, allocator) {
        if (contactCount === undefined) contactCount = 0;
        let contact;
        this.m_step.Set(step);
        this.m_allocator = allocator;
        let i = 0;
        let tVec;
        let tMat;
        this.m_constraintCount = contactCount;
        while (this.m_constraints.length < this.m_constraintCount) {
          this.m_constraints[this.m_constraints.length] = new b2ContactConstraint();
        }
        for (i = 0;
          i < contactCount; ++i) {
          contact = contacts[i];
          const fixtureA = contact.m_fixtureA;
          const fixtureB = contact.m_fixtureB;
          const shapeA = fixtureA.m_shape;
          const shapeB = fixtureB.m_shape;
          const radiusA = shapeA.m_radius;
          const radiusB = shapeB.m_radius;
          const bodyA = fixtureA.m_body;
          const bodyB = fixtureB.m_body;
          const manifold = contact.GetManifold();
          const friction = b2Settings.b2MixFriction(fixtureA.GetFriction(), fixtureB.GetFriction());
          const restitution = b2Settings.b2MixRestitution(fixtureA.GetRestitution(), fixtureB.GetRestitution());
          const vAX = bodyA.m_linearVelocity.x;
          const vAY = bodyA.m_linearVelocity.y;
          const vBX = bodyB.m_linearVelocity.x;
          const vBY = bodyB.m_linearVelocity.y;
          const wA = bodyA.m_angularVelocity;
          const wB = bodyB.m_angularVelocity;
          b2Settings.b2Assert(manifold.m_pointCount > 0);
          b2ContactSolver.s_worldManifold.Initialize(manifold, bodyA.m_xf, radiusA, bodyB.m_xf, radiusB);
          const normalX = b2ContactSolver.s_worldManifold.m_normal.x;
          const normalY = b2ContactSolver.s_worldManifold.m_normal.y;
          const cc = this.m_constraints[i];
          cc.bodyA = bodyA;
          cc.bodyB = bodyB;
          cc.manifold = manifold;
          cc.normal.x = normalX;
          cc.normal.y = normalY;
          cc.pointCount = manifold.m_pointCount;
          cc.friction = friction;
          cc.restitution = restitution;
          cc.localPlaneNormal.x = manifold.m_localPlaneNormal.x;
          cc.localPlaneNormal.y = manifold.m_localPlaneNormal.y;
          cc.localPoint.x = manifold.m_localPoint.x;
          cc.localPoint.y = manifold.m_localPoint.y;
          cc.radius = radiusA + radiusB;
          cc.type = manifold.m_type;
          for (let k = 0; k < cc.pointCount; ++k) {
            const cp = manifold.m_points[k];
            const ccp = cc.points[k];
            ccp.normalImpulse = cp.m_normalImpulse;
            ccp.tangentImpulse = cp.m_tangentImpulse;
            ccp.localPoint.SetV(cp.m_localPoint);
            const rAX = ccp.rA.x = b2ContactSolver.s_worldManifold.m_points[k].x - bodyA.m_sweep.c.x;
            const rAY = ccp.rA.y = b2ContactSolver.s_worldManifold.m_points[k].y - bodyA.m_sweep.c.y;
            const rBX = ccp.rB.x = b2ContactSolver.s_worldManifold.m_points[k].x - bodyB.m_sweep.c.x;
            const rBY = ccp.rB.y = b2ContactSolver.s_worldManifold.m_points[k].y - bodyB.m_sweep.c.y;
            let rnA = rAX * normalY - rAY * normalX;
            let rnB = rBX * normalY - rBY * normalX;
            rnA *= rnA;
            rnB *= rnB;
            const kNormal = bodyA.m_invMass + bodyB.m_invMass + bodyA.m_invI * rnA + bodyB.m_invI * rnB;
            ccp.normalMass = 1.0 / kNormal;
            let kEqualized = bodyA.m_mass * bodyA.m_invMass + bodyB.m_mass * bodyB.m_invMass;
            kEqualized += bodyA.m_mass * bodyA.m_invI * rnA + bodyB.m_mass * bodyB.m_invI * rnB;
            ccp.equalizedMass = 1.0 / kEqualized;
            const tangentX = normalY;
            const tangentY = (-normalX);
            let rtA = rAX * tangentY - rAY * tangentX;
            let rtB = rBX * tangentY - rBY * tangentX;
            rtA *= rtA;
            rtB *= rtB;
            const kTangent = bodyA.m_invMass + bodyB.m_invMass + bodyA.m_invI * rtA + bodyB.m_invI * rtB;
            ccp.tangentMass = 1.0 / kTangent;
            ccp.velocityBias = 0.0;
            const tX = vBX + ((-wB * rBY)) - vAX - ((-wA * rAY));
            const tY = vBY + (wB * rBX) - vAY - (wA * rAX);
            const vRel = cc.normal.x * tX + cc.normal.y * tY;
            if (vRel < (-b2Settings.b2_velocityThreshold)) {
              ccp.velocityBias += (-cc.restitution * vRel);
            }
          }
          if (cc.pointCount == 2) {
            const ccp1 = cc.points[0];
            const ccp2 = cc.points[1];
            const invMassA = bodyA.m_invMass;
            const invIA = bodyA.m_invI;
            const invMassB = bodyB.m_invMass;
            const invIB = bodyB.m_invI;
            const rn1A = ccp1.rA.x * normalY - ccp1.rA.y * normalX;
            const rn1B = ccp1.rB.x * normalY - ccp1.rB.y * normalX;
            const rn2A = ccp2.rA.x * normalY - ccp2.rA.y * normalX;
            const rn2B = ccp2.rB.x * normalY - ccp2.rB.y * normalX;
            const k11 = invMassA + invMassB + invIA * rn1A * rn1A + invIB * rn1B * rn1B;
            const k22 = invMassA + invMassB + invIA * rn2A * rn2A + invIB * rn2B * rn2B;
            const k12 = invMassA + invMassB + invIA * rn1A * rn2A + invIB * rn1B * rn2B;
            const k_maxConditionNumber = 100.0;
            if (k11 * k11 < k_maxConditionNumber * (k11 * k22 - k12 * k12)) {
              cc.K.col1.Set(k11, k12);
              cc.K.col2.Set(k12, k22);
              cc.K.GetInverse(cc.normalMass);
            } else {
              cc.pointCount = 1;
            }
          }
        }
      }

      InitVelocityConstraints(step) {
        let tVec;
        let tVec2;
        let tMat;
        for (let i = 0; i < this.m_constraintCount; ++i) {
          const c = this.m_constraints[i];
          const bodyA = c.bodyA;
          const bodyB = c.bodyB;
          const invMassA = bodyA.m_invMass;
          const invIA = bodyA.m_invI;
          const invMassB = bodyB.m_invMass;
          const invIB = bodyB.m_invI;
          const normalX = c.normal.x;
          const normalY = c.normal.y;
          const tangentX = normalY;
          const tangentY = (-normalX);
          const tX = 0;
          let j = 0;
          let tCount = 0;
          if (step.warmStarting) {
            tCount = c.pointCount;
            for (j = 0;
              j < tCount; ++j) {
              const ccp = c.points[j];
              ccp.normalImpulse *= step.dtRatio;
              ccp.tangentImpulse *= step.dtRatio;
              const PX = ccp.normalImpulse * normalX + ccp.tangentImpulse * tangentX;
              const PY = ccp.normalImpulse * normalY + ccp.tangentImpulse * tangentY;
              bodyA.m_angularVelocity -= invIA * (ccp.rA.x * PY - ccp.rA.y * PX);
              bodyA.m_linearVelocity.x -= invMassA * PX;
              bodyA.m_linearVelocity.y -= invMassA * PY;
              bodyB.m_angularVelocity += invIB * (ccp.rB.x * PY - ccp.rB.y * PX);
              bodyB.m_linearVelocity.x += invMassB * PX;
              bodyB.m_linearVelocity.y += invMassB * PY;
            }
          } else {
            tCount = c.pointCount;
            for (j = 0;
              j < tCount; ++j) {
              const ccp2 = c.points[j];
              ccp2.normalImpulse = 0.0;
              ccp2.tangentImpulse = 0.0;
            }
          }
        }
      }

      SolveVelocityConstraints() {
        let j = 0;
        let ccp;
        const rAX = 0;
        const rAY = 0;
        const rBX = 0;
        const rBY = 0;
        let dvX = 0;
        let dvY = 0;
        let vn = 0;
        let vt = 0;
        let lambda = 0;
        let maxFriction = 0;
        let newImpulse = 0;
        let PX = 0;
        let PY = 0;
        let dX = 0;
        let dY = 0;
        let P1X = 0;
        let P1Y = 0;
        let P2X = 0;
        let P2Y = 0;
        let tMat;
        let tVec;
        for (let i = 0; i < this.m_constraintCount; ++i) {
          const c = this.m_constraints[i];
          const bodyA = c.bodyA;
          const bodyB = c.bodyB;
          let wA = bodyA.m_angularVelocity;
          let wB = bodyB.m_angularVelocity;
          const vA = bodyA.m_linearVelocity;
          const vB = bodyB.m_linearVelocity;
          const invMassA = bodyA.m_invMass;
          const invIA = bodyA.m_invI;
          const invMassB = bodyB.m_invMass;
          const invIB = bodyB.m_invI;
          const normalX = c.normal.x;
          const normalY = c.normal.y;
          const tangentX = normalY;
          const tangentY = (-normalX);
          const friction = c.friction;
          const tX = 0;
          for (j = 0;
            j < c.pointCount; j++) {
            ccp = c.points[j];
            dvX = vB.x - wB * ccp.rB.y - vA.x + wA * ccp.rA.y;
            dvY = vB.y + wB * ccp.rB.x - vA.y - wA * ccp.rA.x;
            vt = dvX * tangentX + dvY * tangentY;
            lambda = ccp.tangentMass * (-vt);
            maxFriction = friction * ccp.normalImpulse;
            newImpulse = b2Math.Clamp(ccp.tangentImpulse + lambda, (-maxFriction), maxFriction);
            lambda = newImpulse - ccp.tangentImpulse;
            PX = lambda * tangentX;
            PY = lambda * tangentY;
            vA.x -= invMassA * PX;
            vA.y -= invMassA * PY;
            wA -= invIA * (ccp.rA.x * PY - ccp.rA.y * PX);
            vB.x += invMassB * PX;
            vB.y += invMassB * PY;
            wB += invIB * (ccp.rB.x * PY - ccp.rB.y * PX);
            ccp.tangentImpulse = newImpulse;
          }
          const tCount = parseInt(c.pointCount);
          if (c.pointCount == 1) {
            ccp = c.points[0];
            dvX = vB.x + ((-wB * ccp.rB.y)) - vA.x - ((-wA * ccp.rA.y));
            dvY = vB.y + (wB * ccp.rB.x) - vA.y - (wA * ccp.rA.x);
            vn = dvX * normalX + dvY * normalY;
            lambda = (-ccp.normalMass * (vn - ccp.velocityBias));
            newImpulse = ccp.normalImpulse + lambda;
            newImpulse = newImpulse > 0 ? newImpulse : 0.0;
            lambda = newImpulse - ccp.normalImpulse;
            PX = lambda * normalX;
            PY = lambda * normalY;
            vA.x -= invMassA * PX;
            vA.y -= invMassA * PY;
            wA -= invIA * (ccp.rA.x * PY - ccp.rA.y * PX);
            vB.x += invMassB * PX;
            vB.y += invMassB * PY;
            wB += invIB * (ccp.rB.x * PY - ccp.rB.y * PX);
            ccp.normalImpulse = newImpulse;
          } else {
            const cp1 = c.points[0];
            const cp2 = c.points[1];
            const aX = cp1.normalImpulse;
            const aY = cp2.normalImpulse;
            const dv1X = vB.x - wB * cp1.rB.y - vA.x + wA * cp1.rA.y;
            const dv1Y = vB.y + wB * cp1.rB.x - vA.y - wA * cp1.rA.x;
            const dv2X = vB.x - wB * cp2.rB.y - vA.x + wA * cp2.rA.y;
            const dv2Y = vB.y + wB * cp2.rB.x - vA.y - wA * cp2.rA.x;
            let vn1 = dv1X * normalX + dv1Y * normalY;
            let vn2 = dv2X * normalX + dv2Y * normalY;
            let bX = vn1 - cp1.velocityBias;
            let bY = vn2 - cp2.velocityBias;
            tMat = c.K;
            bX -= tMat.col1.x * aX + tMat.col2.x * aY;
            bY -= tMat.col1.y * aX + tMat.col2.y * aY;
            const k_errorTol = 0.001;
            for (; ;) {
              tMat = c.normalMass;
              let xX = (-(tMat.col1.x * bX + tMat.col2.x * bY));
              let xY = (-(tMat.col1.y * bX + tMat.col2.y * bY));
              if (xX >= 0.0 && xY >= 0.0) {
                dX = xX - aX;
                dY = xY - aY;
                P1X = dX * normalX;
                P1Y = dX * normalY;
                P2X = dY * normalX;
                P2Y = dY * normalY;
                vA.x -= invMassA * (P1X + P2X);
                vA.y -= invMassA * (P1Y + P2Y);
                wA -= invIA * (cp1.rA.x * P1Y - cp1.rA.y * P1X + cp2.rA.x * P2Y - cp2.rA.y * P2X);
                vB.x += invMassB * (P1X + P2X);
                vB.y += invMassB * (P1Y + P2Y);
                wB += invIB * (cp1.rB.x * P1Y - cp1.rB.y * P1X + cp2.rB.x * P2Y - cp2.rB.y * P2X);
                cp1.normalImpulse = xX;
                cp2.normalImpulse = xY;
                break;
              }
              xX = (-cp1.normalMass * bX);
              xY = 0.0;
              vn1 = 0.0;
              vn2 = c.K.col1.y * xX + bY;
              if (xX >= 0.0 && vn2 >= 0.0) {
                dX = xX - aX;
                dY = xY - aY;
                P1X = dX * normalX;
                P1Y = dX * normalY;
                P2X = dY * normalX;
                P2Y = dY * normalY;
                vA.x -= invMassA * (P1X + P2X);
                vA.y -= invMassA * (P1Y + P2Y);
                wA -= invIA * (cp1.rA.x * P1Y - cp1.rA.y * P1X + cp2.rA.x * P2Y - cp2.rA.y * P2X);
                vB.x += invMassB * (P1X + P2X);
                vB.y += invMassB * (P1Y + P2Y);
                wB += invIB * (cp1.rB.x * P1Y - cp1.rB.y * P1X + cp2.rB.x * P2Y - cp2.rB.y * P2X);
                cp1.normalImpulse = xX;
                cp2.normalImpulse = xY;
                break;
              }
              xX = 0.0;
              xY = (-cp2.normalMass * bY);
              vn1 = c.K.col2.x * xY + bX;
              vn2 = 0.0;
              if (xY >= 0.0 && vn1 >= 0.0) {
                dX = xX - aX;
                dY = xY - aY;
                P1X = dX * normalX;
                P1Y = dX * normalY;
                P2X = dY * normalX;
                P2Y = dY * normalY;
                vA.x -= invMassA * (P1X + P2X);
                vA.y -= invMassA * (P1Y + P2Y);
                wA -= invIA * (cp1.rA.x * P1Y - cp1.rA.y * P1X + cp2.rA.x * P2Y - cp2.rA.y * P2X);
                vB.x += invMassB * (P1X + P2X);
                vB.y += invMassB * (P1Y + P2Y);
                wB += invIB * (cp1.rB.x * P1Y - cp1.rB.y * P1X + cp2.rB.x * P2Y - cp2.rB.y * P2X);
                cp1.normalImpulse = xX;
                cp2.normalImpulse = xY;
                break;
              }
              xX = 0.0;
              xY = 0.0;
              vn1 = bX;
              vn2 = bY;
              if (vn1 >= 0.0 && vn2 >= 0.0) {
                dX = xX - aX;
                dY = xY - aY;
                P1X = dX * normalX;
                P1Y = dX * normalY;
                P2X = dY * normalX;
                P2Y = dY * normalY;
                vA.x -= invMassA * (P1X + P2X);
                vA.y -= invMassA * (P1Y + P2Y);
                wA -= invIA * (cp1.rA.x * P1Y - cp1.rA.y * P1X + cp2.rA.x * P2Y - cp2.rA.y * P2X);
                vB.x += invMassB * (P1X + P2X);
                vB.y += invMassB * (P1Y + P2Y);
                wB += invIB * (cp1.rB.x * P1Y - cp1.rB.y * P1X + cp2.rB.x * P2Y - cp2.rB.y * P2X);
                cp1.normalImpulse = xX;
                cp2.normalImpulse = xY;
                break;
              }
              break;
            }
          }
          bodyA.m_angularVelocity = wA;
          bodyB.m_angularVelocity = wB;
        }
      }

      FinalizeVelocityConstraints() {
        for (let i = 0; i < this.m_constraintCount; ++i) {
          const c = this.m_constraints[i];
          const m = c.manifold;
          for (let j = 0; j < c.pointCount; ++j) {
            const point1 = m.m_points[j];
            const point2 = c.points[j];
            point1.m_normalImpulse = point2.normalImpulse;
            point1.m_tangentImpulse = point2.tangentImpulse;
          }
        }
      }

      SolvePositionConstraints(baumgarte) {
        if (baumgarte === undefined) baumgarte = 0;
        let minSeparation = 0.0;
        for (let i = 0; i < this.m_constraintCount; i++) {
          const c = this.m_constraints[i];
          const bodyA = c.bodyA;
          const bodyB = c.bodyB;
          const invMassA = bodyA.m_mass * bodyA.m_invMass;
          const invIA = bodyA.m_mass * bodyA.m_invI;
          const invMassB = bodyB.m_mass * bodyB.m_invMass;
          const invIB = bodyB.m_mass * bodyB.m_invI;
          b2ContactSolver.s_psm.Initialize(c);
          const normal = b2ContactSolver.s_psm.m_normal;
          for (let j = 0; j < c.pointCount; j++) {
            const ccp = c.points[j];
            const point = b2ContactSolver.s_psm.m_points[j];
            const separation = b2ContactSolver.s_psm.m_separations[j];
            const rAX = point.x - bodyA.m_sweep.c.x;
            const rAY = point.y - bodyA.m_sweep.c.y;
            const rBX = point.x - bodyB.m_sweep.c.x;
            const rBY = point.y - bodyB.m_sweep.c.y;
            minSeparation = minSeparation < separation ? minSeparation : separation;
            const C = b2Math.Clamp(baumgarte * (separation + b2Settings.b2_linearSlop), (-b2Settings.b2_maxLinearCorrection), 0.0);
            const impulse = (-ccp.equalizedMass * C);
            const PX = impulse * normal.x;
            const PY = impulse * normal.y; bodyA.m_sweep.c.x -= invMassA * PX;
            bodyA.m_sweep.c.y -= invMassA * PY;
            bodyA.m_sweep.a -= invIA * (rAX * PY - rAY * PX);
            bodyA.SynchronizeTransform();
            bodyB.m_sweep.c.x += invMassB * PX;
            bodyB.m_sweep.c.y += invMassB * PY;
            bodyB.m_sweep.a += invIB * (rBX * PY - rBY * PX);
            bodyB.SynchronizeTransform();
          }
        }
        return minSeparation > (-1.5 * b2Settings.b2_linearSlop);
      }
    }

    Box2D.Dynamics.Contacts.b2ContactSolver = b2ContactSolver;

    class b2EdgeAndCircleContact extends b2Contact {
      constructor() {
        super(...arguments);
        b2EdgeAndCircleContact.b2EdgeAndCircleContact.apply(this, arguments);
      }

      static b2EdgeAndCircleContact() {
        Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this, arguments);
      }

      Reset(fixtureA, fixtureB) {
        this.__super.Reset.call(this, fixtureA, fixtureB);
      }

      Evaluate() {
        const bA = this.m_fixtureA.GetBody();
        const bB = this.m_fixtureB.GetBody();
        this.b2CollideEdgeAndCircle(this.m_manifold, (this.m_fixtureA.GetShape() instanceof b2EdgeShape ? this.m_fixtureA.GetShape() : null), bA.m_xf, (this.m_fixtureB.GetShape() instanceof b2CircleShape ? this.m_fixtureB.GetShape() : null), bB.m_xf);
      }

      b2CollideEdgeAndCircle(manifold, edge, xf1, circle, xf2) { }
    }

    Box2D.Dynamics.Contacts.b2EdgeAndCircleContact = b2EdgeAndCircleContact;

    class b2NullContact extends b2Contact {
      constructor() {
        super(...arguments);
        b2NullContact.b2NullContact.apply(this, arguments);
        if (this.constructor === b2NullContact) this.b2NullContact.apply(this, arguments);
      }

      static b2NullContact() {
        Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this, arguments);
      }

      b2NullContact() {
        this.__super.b2Contact.call(this);
      }

      Evaluate() { }
    }

    Box2D.Dynamics.Contacts.b2NullContact = b2NullContact;

    class b2PolyAndCircleContact extends b2Contact {
      constructor() {
        super(...arguments);
        b2PolyAndCircleContact.b2PolyAndCircleContact.apply(this, arguments);
      }

      static b2PolyAndCircleContact() {
        Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this, arguments);
      }

      Reset(fixtureA, fixtureB) {
        this.__super.Reset.call(this, fixtureA, fixtureB);
        b2Settings.b2Assert(fixtureA.GetType() == b2Shape.e_polygonShape);
        b2Settings.b2Assert(fixtureB.GetType() == b2Shape.e_circleShape);
      }

      Evaluate() {
        const bA = this.m_fixtureA.m_body;
        const bB = this.m_fixtureB.m_body;
        b2Collision.CollidePolygonAndCircle(this.m_manifold, (this.m_fixtureA.GetShape() instanceof b2PolygonShape ? this.m_fixtureA.GetShape() : null), bA.m_xf, (this.m_fixtureB.GetShape() instanceof b2CircleShape ? this.m_fixtureB.GetShape() : null), bB.m_xf);
      }
    }

    Box2D.Dynamics.Contacts.b2PolyAndCircleContact = b2PolyAndCircleContact;

    class b2PolyAndEdgeContact extends b2Contact {
      constructor() {
        super(...arguments);
        b2PolyAndEdgeContact.b2PolyAndEdgeContact.apply(this, arguments);
      }

      static b2PolyAndEdgeContact() {
        Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this, arguments);
      }

      Reset(fixtureA, fixtureB) {
        this.__super.Reset.call(this, fixtureA, fixtureB);
        b2Settings.b2Assert(fixtureA.GetType() == b2Shape.e_polygonShape);
        b2Settings.b2Assert(fixtureB.GetType() == b2Shape.e_edgeShape);
      }

      Evaluate() {
        const bA = this.m_fixtureA.GetBody();
        const bB = this.m_fixtureB.GetBody();
        this.b2CollidePolyAndEdge(this.m_manifold, (this.m_fixtureA.GetShape() instanceof b2PolygonShape ? this.m_fixtureA.GetShape() : null), bA.m_xf, (this.m_fixtureB.GetShape() instanceof b2EdgeShape ? this.m_fixtureB.GetShape() : null), bB.m_xf);
      }

      b2CollidePolyAndEdge(manifold, polygon, xf1, edge, xf2) { }
    }

    Box2D.Dynamics.Contacts.b2PolyAndEdgeContact = b2PolyAndEdgeContact;

    class b2PolygonContact extends b2Contact {
      constructor() {
        super(...arguments);
        b2PolygonContact.b2PolygonContact.apply(this, arguments);
      }

      static b2PolygonContact() {
        Box2D.Dynamics.Contacts.b2Contact.b2Contact.apply(this, arguments);
      }

      Reset(fixtureA, fixtureB) {
        this.__super.Reset.call(this, fixtureA, fixtureB);
      }

      Evaluate() {
        const bA = this.m_fixtureA.GetBody();
        const bB = this.m_fixtureB.GetBody();
        b2Collision.CollidePolygons(this.m_manifold, (this.m_fixtureA.GetShape() instanceof b2PolygonShape ? this.m_fixtureA.GetShape() : null), bA.m_xf, (this.m_fixtureB.GetShape() instanceof b2PolygonShape ? this.m_fixtureB.GetShape() : null), bB.m_xf);
      }
    }

    Box2D.Dynamics.Contacts.b2PolygonContact = b2PolygonContact;

    class b2PositionSolverManifold {
      constructor() {
        b2PositionSolverManifold.b2PositionSolverManifold.apply(this, arguments);
        if (this.constructor === b2PositionSolverManifold) this.b2PositionSolverManifold.apply(this, arguments);
      }

      b2PositionSolverManifold() {
        this.m_normal = new b2Vec2();
        this.m_separations = new Vector_a2j_Number(b2Settings.b2_maxManifoldPoints);
        this.m_points = new Vector(b2Settings.b2_maxManifoldPoints);
        for (let i = 0; i < b2Settings.b2_maxManifoldPoints; i++) {
          this.m_points[i] = new b2Vec2();
        }
      }

      Initialize(cc) {
        b2Settings.b2Assert(cc.pointCount > 0);
        let i = 0;
        let clipPointX = 0;
        let clipPointY = 0;
        let tMat;
        let tVec;
        let planePointX = 0;
        let planePointY = 0;
        switch (cc.type) {
          case b2Manifold.e_circles:
            {
              tMat = cc.bodyA.m_xf.R;
              tVec = cc.localPoint;
              const pointAX = cc.bodyA.m_xf.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
              const pointAY = cc.bodyA.m_xf.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
              tMat = cc.bodyB.m_xf.R;
              tVec = cc.points[0].localPoint;
              const pointBX = cc.bodyB.m_xf.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
              const pointBY = cc.bodyB.m_xf.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
              const dX = pointBX - pointAX;
              const dY = pointBY - pointAY;
              const d2 = dX * dX + dY * dY;
              if (d2 > Number.MIN_VALUE * Number.MIN_VALUE) {
                const d = Math.sqrt(d2);
                this.m_normal.x = dX / d;
                this.m_normal.y = dY / d;
              } else {
                this.m_normal.x = 1.0;
                this.m_normal.y = 0.0;
              }
              this.m_points[0].x = 0.5 * (pointAX + pointBX);
              this.m_points[0].y = 0.5 * (pointAY + pointBY);
              this.m_separations[0] = dX * this.m_normal.x + dY * this.m_normal.y - cc.radius;
            }
            break;
          case b2Manifold.e_faceA:
            {
              tMat = cc.bodyA.m_xf.R;
              tVec = cc.localPlaneNormal;
              this.m_normal.x = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
              this.m_normal.y = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
              tMat = cc.bodyA.m_xf.R;
              tVec = cc.localPoint;
              planePointX = cc.bodyA.m_xf.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
              planePointY = cc.bodyA.m_xf.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
              tMat = cc.bodyB.m_xf.R;
              for (i = 0;
                i < cc.pointCount; ++i) {
                tVec = cc.points[i].localPoint;
                clipPointX = cc.bodyB.m_xf.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
                clipPointY = cc.bodyB.m_xf.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
                this.m_separations[i] = (clipPointX - planePointX) * this.m_normal.x + (clipPointY - planePointY) * this.m_normal.y - cc.radius;
                this.m_points[i].x = clipPointX;
                this.m_points[i].y = clipPointY;
              }
            }
            break;
          case b2Manifold.e_faceB:
            {
              tMat = cc.bodyB.m_xf.R;
              tVec = cc.localPlaneNormal;
              this.m_normal.x = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
              this.m_normal.y = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
              tMat = cc.bodyB.m_xf.R;
              tVec = cc.localPoint;
              planePointX = cc.bodyB.m_xf.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
              planePointY = cc.bodyB.m_xf.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
              tMat = cc.bodyA.m_xf.R;
              for (i = 0;
                i < cc.pointCount; ++i) {
                tVec = cc.points[i].localPoint;
                clipPointX = cc.bodyA.m_xf.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
                clipPointY = cc.bodyA.m_xf.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
                this.m_separations[i] = (clipPointX - planePointX) * this.m_normal.x + (clipPointY - planePointY) * this.m_normal.y - cc.radius;
                this.m_points[i].Set(clipPointX, clipPointY);
              }
              this.m_normal.x *= (-1);
              this.m_normal.y *= (-1);
            }
            break;
        }
      }
    }

    Box2D.Dynamics.Contacts.b2PositionSolverManifold = b2PositionSolverManifold;

    class b2Controller {
      constructor() {
        b2Controller.b2Controller.apply(this, arguments);
      }

      Step(step) { }
      Draw(debugDraw) { }

      AddBody(body) {
        const edge = new b2ControllerEdge();
        edge.controller = this;
        edge.body = body;
        edge.nextBody = this.m_bodyList;
        edge.prevBody = null;
        this.m_bodyList = edge;
        if (edge.nextBody) edge.nextBody.prevBody = edge;
        this.m_bodyCount++;
        edge.nextController = body.m_controllerList;
        edge.prevController = null;
        body.m_controllerList = edge;
        if (edge.nextController) edge.nextController.prevController = edge;
        body.m_controllerCount++;
      }

      RemoveBody(body) {
        let edge = body.m_controllerList;
        while (edge && edge.controller != this) { edge = edge.nextController; }
        if (edge.prevBody) edge.prevBody.nextBody = edge.nextBody;
        if (edge.nextBody) edge.nextBody.prevBody = edge.prevBody;
        if (edge.nextController) edge.nextController.prevController = edge.prevController;
        if (edge.prevController) edge.prevController.nextController = edge.nextController;
        if (this.m_bodyList == edge) this.m_bodyList = edge.nextBody;
        if (body.m_controllerList == edge) body.m_controllerList = edge.nextController;
        body.m_controllerCount--;
        this.m_bodyCount--;
      }

      Clear() {
        while (this.m_bodyList) { this.RemoveBody(this.m_bodyList.body); }
      }

      GetNext() {
        return this.m_next;
      }

      GetWorld() {
        return this.m_world;
      }

      GetBodyList() {
        return this.m_bodyList;
      }
    }

    Box2D.Dynamics.Controllers.b2Controller = b2Controller;

    class b2BuoyancyController extends b2Controller {
      constructor() {
        super(...arguments);
        b2BuoyancyController.b2BuoyancyController.apply(this, arguments);
      }

      static b2BuoyancyController() {
        Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this, arguments);
        this.normal = new b2Vec2(0, (-1));
        this.offset = 0;
        this.density = 0;
        this.velocity = new b2Vec2(0, 0);
        this.linearDrag = 2;
        this.angularDrag = 1;
        this.useDensity = false;
        this.useWorldGravity = true;
        this.gravity = null;
      }

      Step(step) {
        if (!this.m_bodyList) return;
        if (this.useWorldGravity) {
          this.gravity = this.GetWorld().GetGravity().Copy();
        }
        for (let i = this.m_bodyList; i; i = i.nextBody) {
          const body = i.body;
          if (body.IsAwake() == false) {
            continue;
          }
          const areac = new b2Vec2();
          const massc = new b2Vec2();
          let area = 0.0;
          let mass = 0.0;
          for (let fixture = body.GetFixtureList(); fixture; fixture = fixture.GetNext()) {
            const sc = new b2Vec2();
            const sarea = fixture.GetShape().ComputeSubmergedArea(this.normal, this.offset, body.GetTransform(), sc);
            area += sarea;
            areac.x += sarea * sc.x;
            areac.y += sarea * sc.y;
            let shapeDensity = 0;
            if (this.useDensity) {
              shapeDensity = 1;
            } else {
              shapeDensity = 1;
            }
            mass += sarea * shapeDensity;
            massc.x += sarea * sc.x * shapeDensity;
            massc.y += sarea * sc.y * shapeDensity;
          }
          areac.x /= area;
          areac.y /= area;
          massc.x /= mass;
          massc.y /= mass;
          if (area < Number.MIN_VALUE) continue;
          const buoyancyForce = this.gravity.GetNegative();
          buoyancyForce.Multiply(this.density * area);
          body.ApplyForce(buoyancyForce, massc);
          const dragForce = body.GetLinearVelocityFromWorldPoint(areac);
          dragForce.Subtract(this.velocity);
          dragForce.Multiply((-this.linearDrag * area));
          body.ApplyForce(dragForce, areac);
          body.ApplyTorque((-body.GetInertia() / body.GetMass() * area * body.GetAngularVelocity() * this.angularDrag));
        }
      }

      Draw(debugDraw) {
        const r = 1000;
        const p1 = new b2Vec2();
        const p2 = new b2Vec2();
        p1.x = this.normal.x * this.offset + this.normal.y * r;
        p1.y = this.normal.y * this.offset - this.normal.x * r;
        p2.x = this.normal.x * this.offset - this.normal.y * r;
        p2.y = this.normal.y * this.offset + this.normal.x * r;
        const color = new b2Color(0, 0, 1);
        debugDraw.DrawSegment(p1, p2, color);
      }
    }

    Box2D.Dynamics.Controllers.b2BuoyancyController = b2BuoyancyController;

    class b2ConstantAccelController extends b2Controller {
      constructor() {
        super(...arguments);
        b2ConstantAccelController.b2ConstantAccelController.apply(this, arguments);
      }

      static b2ConstantAccelController() {
        Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this, arguments);
        this.A = new b2Vec2(0, 0);
      }

      Step(step) {
        const smallA = new b2Vec2(this.A.x * step.dt, this.A.y * step.dt);
        for (let i = this.m_bodyList; i; i = i.nextBody) {
          const body = i.body;
          if (!body.IsAwake()) continue;
          body.SetLinearVelocity(new b2Vec2(body.GetLinearVelocity().x + smallA.x, body.GetLinearVelocity().y + smallA.y));
        }
      }
    }

    Box2D.Dynamics.Controllers.b2ConstantAccelController = b2ConstantAccelController;

    class b2ConstantForceController extends b2Controller {
      constructor() {
        super(...arguments);
        b2ConstantForceController.b2ConstantForceController.apply(this, arguments);
      }

      static b2ConstantForceController() {
        Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this, arguments);
        this.F = new b2Vec2(0, 0);
      }

      Step(step) {
        for (let i = this.m_bodyList; i; i = i.nextBody) {
          const body = i.body;
          if (!body.IsAwake()) continue;
          body.ApplyForce(this.F, body.GetWorldCenter());
        }
      }
    }

    Box2D.Dynamics.Controllers.b2ConstantForceController = b2ConstantForceController;

    function b2ControllerEdge() {
      b2ControllerEdge.b2ControllerEdge.apply(this, arguments);
    }
    Box2D.Dynamics.Controllers.b2ControllerEdge = b2ControllerEdge;

    class b2GravityController extends b2Controller {
      constructor() {
        super(...arguments);
        b2GravityController.b2GravityController.apply(this, arguments);
      }

      static b2GravityController() {
        Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this, arguments);
        this.G = 1;
        this.invSqr = true;
      }

      Step(step) {
        let i = null;
        let body1 = null;
        let p1 = null;
        let mass1 = 0;
        let j = null;
        let body2 = null;
        let p2 = null;
        let dx = 0;
        let dy = 0;
        let r2 = 0;
        let f = null;
        if (this.invSqr) {
          for (i = this.m_bodyList;
            i; i = i.nextBody) {
            body1 = i.body;
            p1 = body1.GetWorldCenter();
            mass1 = body1.GetMass();
            for (j = this.m_bodyList;
              j != i; j = j.nextBody) {
              body2 = j.body;
              p2 = body2.GetWorldCenter();
              dx = p2.x - p1.x;
              dy = p2.y - p1.y;
              r2 = dx * dx + dy * dy;
              if (r2 < Number.MIN_VALUE) continue;
              f = new b2Vec2(dx, dy);
              f.Multiply(this.G / r2 / Math.sqrt(r2) * mass1 * body2.GetMass());
              if (body1.IsAwake()) body1.ApplyForce(f, p1);
              f.Multiply((-1));
              if (body2.IsAwake()) body2.ApplyForce(f, p2);
            }
          }
        } else {
          for (i = this.m_bodyList;
            i; i = i.nextBody) {
            body1 = i.body;
            p1 = body1.GetWorldCenter();
            mass1 = body1.GetMass();
            for (j = this.m_bodyList;
              j != i; j = j.nextBody) {
              body2 = j.body;
              p2 = body2.GetWorldCenter();
              dx = p2.x - p1.x;
              dy = p2.y - p1.y;
              r2 = dx * dx + dy * dy;
              if (r2 < Number.MIN_VALUE) continue;
              f = new b2Vec2(dx, dy);
              f.Multiply(this.G / r2 * mass1 * body2.GetMass());
              if (body1.IsAwake()) body1.ApplyForce(f, p1);
              f.Multiply((-1));
              if (body2.IsAwake()) body2.ApplyForce(f, p2);
            }
          }
        }
      }
    }

    Box2D.Dynamics.Controllers.b2GravityController = b2GravityController;

    class b2TensorDampingController extends b2Controller {
      constructor() {
        super(...arguments);
        b2TensorDampingController.b2TensorDampingController.apply(this, arguments);
      }

      static b2TensorDampingController() {
        Box2D.Dynamics.Controllers.b2Controller.b2Controller.apply(this, arguments);
        this.T = new b2Mat22();
        this.maxTimestep = 0;
      }

      SetAxisAligned(xDamping, yDamping) {
        if (xDamping === undefined) xDamping = 0;
        if (yDamping === undefined) yDamping = 0;
        this.T.col1.x = (-xDamping);
        this.T.col1.y = 0;
        this.T.col2.x = 0;
        this.T.col2.y = (-yDamping);
        if (xDamping > 0 || yDamping > 0) {
          this.maxTimestep = 1 / Math.max(xDamping, yDamping);
        } else {
          this.maxTimestep = 0;
        }
      }

      Step(step) {
        let timestep = step.dt;
        if (timestep <= Number.MIN_VALUE) return;
        if (timestep > this.maxTimestep && this.maxTimestep > 0) timestep = this.maxTimestep;
        for (let i = this.m_bodyList; i; i = i.nextBody) {
          const body = i.body;
          if (!body.IsAwake()) {
            continue;
          }
          const damping = body.GetWorldVector(b2Math.MulMV(this.T, body.GetLocalVector(body.GetLinearVelocity())));
          body.SetLinearVelocity(new b2Vec2(body.GetLinearVelocity().x + damping.x * timestep, body.GetLinearVelocity().y + damping.y * timestep));
        }
      }
    }

    Box2D.Dynamics.Controllers.b2TensorDampingController = b2TensorDampingController;

    class b2Joint {
      constructor() {
        b2Joint.b2Joint.apply(this, arguments);
        if (this.constructor === b2Joint) this.b2Joint.apply(this, arguments);
      }

      static b2Joint() {
        this.m_edgeA = new b2JointEdge();
        this.m_edgeB = new b2JointEdge();
        this.m_localCenterA = new b2Vec2();
        this.m_localCenterB = new b2Vec2();
      }

      GetType() {
        return this.m_type;
      }

      GetAnchorA() {
        return null;
      }

      GetAnchorB() {
        return null;
      }

      GetReactionForce(inv_dt) {
        if (inv_dt === undefined) inv_dt = 0;
        return null;
      }

      GetReactionTorque(inv_dt) {
        if (inv_dt === undefined) inv_dt = 0;
        return 0.0;
      }

      GetBodyA() {
        return this.m_bodyA;
      }

      GetBodyB() {
        return this.m_bodyB;
      }

      GetNext() {
        return this.m_next;
      }

      GetUserData() {
        return this.m_userData;
      }

      SetUserData(data) {
        this.m_userData = data;
      }

      IsActive() {
        return this.m_bodyA.IsActive() && this.m_bodyB.IsActive();
      }

      b2Joint(def) {
        b2Settings.b2Assert(def.bodyA != def.bodyB);
        this.m_type = def.type;
        this.m_prev = null;
        this.m_next = null;
        this.m_bodyA = def.bodyA;
        this.m_bodyB = def.bodyB;
        this.m_collideConnected = def.collideConnected;
        this.m_islandFlag = false;
        this.m_userData = def.userData;
      }

      InitVelocityConstraints(step) { }
      SolveVelocityConstraints(step) { }
      FinalizeVelocityConstraints() { }

      SolvePositionConstraints(baumgarte) {
        if (baumgarte === undefined) baumgarte = 0;
        return false;
      }
    }

    Box2D.Dynamics.Joints.b2Joint = b2Joint;

    class b2JointDef {
      constructor() {
        b2JointDef.b2JointDef.apply(this, arguments);
        if (this.constructor === b2JointDef) this.b2JointDef.apply(this, arguments);
      }

      b2JointDef() {
        this.type = b2Joint.e_unknownJoint;
        this.userData = null;
        this.bodyA = null;
        this.bodyB = null;
        this.collideConnected = false;
      }
    }

    Box2D.Dynamics.Joints.b2JointDef = b2JointDef;

    class b2DistanceJointDef extends b2JointDef {
      constructor() {
        super(...arguments);
        b2DistanceJointDef.b2DistanceJointDef.apply(this, arguments);
        if (this.constructor === b2DistanceJointDef) this.b2DistanceJointDef.apply(this, arguments);
      }

      static b2DistanceJointDef() {
        Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
        this.localAnchorA = new b2Vec2();
        this.localAnchorB = new b2Vec2();
      }

      b2DistanceJointDef() {
        this.__super.b2JointDef.call(this);
        this.type = b2Joint.e_distanceJoint;
        this.length = 1.0;
        this.frequencyHz = 0.0;
        this.dampingRatio = 0.0;
      }

      Initialize(bA, bB, anchorA, anchorB) {
        this.bodyA = bA;
        this.bodyB = bB;
        this.localAnchorA.SetV(this.bodyA.GetLocalPoint(anchorA));
        this.localAnchorB.SetV(this.bodyB.GetLocalPoint(anchorB));
        const dX = anchorB.x - anchorA.x;
        const dY = anchorB.y - anchorA.y;
        this.length = Math.sqrt(dX * dX + dY * dY);
        this.frequencyHz = 0.0;
        this.dampingRatio = 0.0;
      }
    }

    Box2D.Dynamics.Joints.b2DistanceJointDef = b2DistanceJointDef;

    class b2FrictionJoint extends b2Joint {
      constructor() {
        super(...arguments);
        b2FrictionJoint.b2FrictionJoint.apply(this, arguments);
        if (this.constructor === b2FrictionJoint) this.b2FrictionJoint.apply(this, arguments);
      }

      static b2FrictionJoint() {
        Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
        this.m_localAnchorA = new b2Vec2();
        this.m_localAnchorB = new b2Vec2();
        this.m_linearMass = new b2Mat22();
        this.m_linearImpulse = new b2Vec2();
      }

      GetAnchorA() {
        return this.m_bodyA.GetWorldPoint(this.m_localAnchorA);
      }

      GetAnchorB() {
        return this.m_bodyB.GetWorldPoint(this.m_localAnchorB);
      }

      GetReactionForce(inv_dt) {
        if (inv_dt === undefined) inv_dt = 0;
        return new b2Vec2(inv_dt * this.m_linearImpulse.x, inv_dt * this.m_linearImpulse.y);
      }

      GetReactionTorque(inv_dt) {
        if (inv_dt === undefined) inv_dt = 0;
        return inv_dt * this.m_angularImpulse;
      }

      SetMaxForce(force) {
        if (force === undefined) force = 0;
        this.m_maxForce = force;
      }

      GetMaxForce() {
        return this.m_maxForce;
      }

      SetMaxTorque(torque) {
        if (torque === undefined) torque = 0;
        this.m_maxTorque = torque;
      }

      GetMaxTorque() {
        return this.m_maxTorque;
      }

      b2FrictionJoint(def) {
        this.__super.b2Joint.call(this, def);
        this.m_localAnchorA.SetV(def.localAnchorA);
        this.m_localAnchorB.SetV(def.localAnchorB);
        this.m_linearMass.SetZero();
        this.m_angularMass = 0.0;
        this.m_linearImpulse.SetZero();
        this.m_angularImpulse = 0.0;
        this.m_maxForce = def.maxForce;
        this.m_maxTorque = def.maxTorque;
      }

      InitVelocityConstraints(step) {
        let tMat;
        let tX = 0;
        const bA = this.m_bodyA;
        const bB = this.m_bodyB;
        tMat = bA.m_xf.R;
        let rAX = this.m_localAnchorA.x - bA.m_sweep.localCenter.x;
        let rAY = this.m_localAnchorA.y - bA.m_sweep.localCenter.y;
        tX = (tMat.col1.x * rAX + tMat.col2.x * rAY);
        rAY = (tMat.col1.y * rAX + tMat.col2.y * rAY);
        rAX = tX;
        tMat = bB.m_xf.R;
        let rBX = this.m_localAnchorB.x - bB.m_sweep.localCenter.x;
        let rBY = this.m_localAnchorB.y - bB.m_sweep.localCenter.y;
        tX = (tMat.col1.x * rBX + tMat.col2.x * rBY);
        rBY = (tMat.col1.y * rBX + tMat.col2.y * rBY);
        rBX = tX;
        const mA = bA.m_invMass;
        const mB = bB.m_invMass;
        const iA = bA.m_invI;
        const iB = bB.m_invI;
        const K = new b2Mat22();
        K.col1.x = mA + mB;
        K.col2.x = 0.0;
        K.col1.y = 0.0;
        K.col2.y = mA + mB;
        K.col1.x += iA * rAY * rAY;
        K.col2.x += (-iA * rAX * rAY);
        K.col1.y += (-iA * rAX * rAY);
        K.col2.y += iA * rAX * rAX;
        K.col1.x += iB * rBY * rBY;
        K.col2.x += (-iB * rBX * rBY);
        K.col1.y += (-iB * rBX * rBY);
        K.col2.y += iB * rBX * rBX;
        K.GetInverse(this.m_linearMass);
        this.m_angularMass = iA + iB;
        if (this.m_angularMass > 0.0) {
          this.m_angularMass = 1.0 / this.m_angularMass;
        }
        if (step.warmStarting) {
          this.m_linearImpulse.x *= step.dtRatio;
          this.m_linearImpulse.y *= step.dtRatio;
          this.m_angularImpulse *= step.dtRatio;
          const P = this.m_linearImpulse;
          bA.m_linearVelocity.x -= mA * P.x;
          bA.m_linearVelocity.y -= mA * P.y;
          bA.m_angularVelocity -= iA * (rAX * P.y - rAY * P.x + this.m_angularImpulse);
          bB.m_linearVelocity.x += mB * P.x;
          bB.m_linearVelocity.y += mB * P.y;
          bB.m_angularVelocity += iB * (rBX * P.y - rBY * P.x + this.m_angularImpulse);
        } else {
          this.m_linearImpulse.SetZero();
          this.m_angularImpulse = 0.0;
        }
      }

      SolveVelocityConstraints(step) {
        let tMat;
        let tX = 0;
        const bA = this.m_bodyA;
        const bB = this.m_bodyB;
        const vA = bA.m_linearVelocity;
        let wA = bA.m_angularVelocity;
        const vB = bB.m_linearVelocity;
        let wB = bB.m_angularVelocity;
        const mA = bA.m_invMass;
        const mB = bB.m_invMass;
        const iA = bA.m_invI;
        const iB = bB.m_invI;
        tMat = bA.m_xf.R;
        let rAX = this.m_localAnchorA.x - bA.m_sweep.localCenter.x;
        let rAY = this.m_localAnchorA.y - bA.m_sweep.localCenter.y;
        tX = (tMat.col1.x * rAX + tMat.col2.x * rAY);
        rAY = (tMat.col1.y * rAX + tMat.col2.y * rAY);
        rAX = tX;
        tMat = bB.m_xf.R;
        let rBX = this.m_localAnchorB.x - bB.m_sweep.localCenter.x;
        let rBY = this.m_localAnchorB.y - bB.m_sweep.localCenter.y;
        tX = (tMat.col1.x * rBX + tMat.col2.x * rBY);
        rBY = (tMat.col1.y * rBX + tMat.col2.y * rBY);
        rBX = tX;
        let maxImpulse = 0; {
          const Cdot = wB - wA;
          let impulse = (-this.m_angularMass * Cdot);
          const oldImpulse = this.m_angularImpulse;
          maxImpulse = step.dt * this.m_maxTorque;
          this.m_angularImpulse = b2Math.Clamp(this.m_angularImpulse + impulse, (-maxImpulse), maxImpulse);
          impulse = this.m_angularImpulse - oldImpulse;
          wA -= iA * impulse;
          wB += iB * impulse;
        } {
          const CdotX = vB.x - wB * rBY - vA.x + wA * rAY;
          const CdotY = vB.y + wB * rBX - vA.y - wA * rAX;
          let impulseV = b2Math.MulMV(this.m_linearMass, new b2Vec2((-CdotX), (-CdotY)));
          const oldImpulseV = this.m_linearImpulse.Copy();
          this.m_linearImpulse.Add(impulseV);
          maxImpulse = step.dt * this.m_maxForce;
          if (this.m_linearImpulse.LengthSquared() > maxImpulse * maxImpulse) {
            this.m_linearImpulse.Normalize();
            this.m_linearImpulse.Multiply(maxImpulse);
          }
          impulseV = b2Math.SubtractVV(this.m_linearImpulse, oldImpulseV);
          vA.x -= mA * impulseV.x;
          vA.y -= mA * impulseV.y;
          wA -= iA * (rAX * impulseV.y - rAY * impulseV.x);
          vB.x += mB * impulseV.x;
          vB.y += mB * impulseV.y;
          wB += iB * (rBX * impulseV.y - rBY * impulseV.x);
        }
        bA.m_angularVelocity = wA;
        bB.m_angularVelocity = wB;
      }

      SolvePositionConstraints(baumgarte) {
        if (baumgarte === undefined) baumgarte = 0;
        return true;
      }
    }

    Box2D.Dynamics.Joints.b2FrictionJoint = b2FrictionJoint;

    class b2FrictionJointDef extends b2JointDef {
      constructor() {
        super(...arguments);
        b2FrictionJointDef.b2FrictionJointDef.apply(this, arguments);
        if (this.constructor === b2FrictionJointDef) this.b2FrictionJointDef.apply(this, arguments);
      }

      static b2FrictionJointDef() {
        Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
        this.localAnchorA = new b2Vec2();
        this.localAnchorB = new b2Vec2();
      }

      b2FrictionJointDef() {
        this.__super.b2JointDef.call(this);
        this.type = b2Joint.e_frictionJoint;
        this.maxForce = 0.0;
        this.maxTorque = 0.0;
      }

      Initialize(bA, bB, anchor) {
        this.bodyA = bA;
        this.bodyB = bB;
        this.localAnchorA.SetV(this.bodyA.GetLocalPoint(anchor));
        this.localAnchorB.SetV(this.bodyB.GetLocalPoint(anchor));
      }
    }

    Box2D.Dynamics.Joints.b2FrictionJointDef = b2FrictionJointDef;

    class b2GearJoint extends b2Joint {
      constructor() {
        super(...arguments);
        b2GearJoint.b2GearJoint.apply(this, arguments);
        if (this.constructor === b2GearJoint) this.b2GearJoint.apply(this, arguments);
      }

      static b2GearJoint() {
        Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
        this.m_groundAnchor1 = new b2Vec2();
        this.m_groundAnchor2 = new b2Vec2();
        this.m_localAnchor1 = new b2Vec2();
        this.m_localAnchor2 = new b2Vec2();
        this.m_J = new b2Jacobian();
      }

      GetAnchorA() {
        return this.m_bodyA.GetWorldPoint(this.m_localAnchor1);
      }

      GetAnchorB() {
        return this.m_bodyB.GetWorldPoint(this.m_localAnchor2);
      }

      GetReactionForce(inv_dt) {
        if (inv_dt === undefined) inv_dt = 0;
        return new b2Vec2(inv_dt * this.m_impulse * this.m_J.linearB.x, inv_dt * this.m_impulse * this.m_J.linearB.y);
      }

      GetReactionTorque(inv_dt) {
        if (inv_dt === undefined) inv_dt = 0;
        const tMat = this.m_bodyB.m_xf.R;
        let rX = this.m_localAnchor1.x - this.m_bodyB.m_sweep.localCenter.x;
        let rY = this.m_localAnchor1.y - this.m_bodyB.m_sweep.localCenter.y;
        const tX = tMat.col1.x * rX + tMat.col2.x * rY;
        rY = tMat.col1.y * rX + tMat.col2.y * rY;
        rX = tX;
        const PX = this.m_impulse * this.m_J.linearB.x;
        const PY = this.m_impulse * this.m_J.linearB.y;
        return inv_dt * (this.m_impulse * this.m_J.angularB - rX * PY + rY * PX);
      }

      GetRatio() {
        return this.m_ratio;
      }

      SetRatio(ratio) {
        if (ratio === undefined) ratio = 0;
        this.m_ratio = ratio;
      }

      b2GearJoint(def) {
        this.__super.b2Joint.call(this, def);
        const type1 = parseInt(def.joint1.m_type);
        const type2 = parseInt(def.joint2.m_type);
        this.m_revolute1 = null;
        this.m_prismatic1 = null;
        this.m_revolute2 = null;
        this.m_prismatic2 = null;
        let coordinate1 = 0;
        let coordinate2 = 0;
        this.m_ground1 = def.joint1.GetBodyA();
        this.m_bodyA = def.joint1.GetBodyB();
        if (type1 == b2Joint.e_revoluteJoint) {
          this.m_revolute1 = (def.joint1 instanceof b2RevoluteJoint ? def.joint1 : null);
          this.m_groundAnchor1.SetV(this.m_revolute1.m_localAnchor1);
          this.m_localAnchor1.SetV(this.m_revolute1.m_localAnchor2);
          coordinate1 = this.m_revolute1.GetJointAngle();
        } else {
          this.m_prismatic1 = (def.joint1 instanceof b2PrismaticJoint ? def.joint1 : null);
          this.m_groundAnchor1.SetV(this.m_prismatic1.m_localAnchor1);
          this.m_localAnchor1.SetV(this.m_prismatic1.m_localAnchor2);
          coordinate1 = this.m_prismatic1.GetJointTranslation();
        }
        this.m_ground2 = def.joint2.GetBodyA();
        this.m_bodyB = def.joint2.GetBodyB();
        if (type2 == b2Joint.e_revoluteJoint) {
          this.m_revolute2 = (def.joint2 instanceof b2RevoluteJoint ? def.joint2 : null);
          this.m_groundAnchor2.SetV(this.m_revolute2.m_localAnchor1);
          this.m_localAnchor2.SetV(this.m_revolute2.m_localAnchor2);
          coordinate2 = this.m_revolute2.GetJointAngle();
        } else {
          this.m_prismatic2 = (def.joint2 instanceof b2PrismaticJoint ? def.joint2 : null);
          this.m_groundAnchor2.SetV(this.m_prismatic2.m_localAnchor1);
          this.m_localAnchor2.SetV(this.m_prismatic2.m_localAnchor2);
          coordinate2 = this.m_prismatic2.GetJointTranslation();
        }
        this.m_ratio = def.ratio;
        this.m_constant = coordinate1 + this.m_ratio * coordinate2;
        this.m_impulse = 0.0;
      }

      InitVelocityConstraints(step) {
        const g1 = this.m_ground1;
        const g2 = this.m_ground2;
        const bA = this.m_bodyA;
        const bB = this.m_bodyB;
        let ugX = 0;
        let ugY = 0;
        let rX = 0;
        let rY = 0;
        let tMat;
        let tVec;
        let crug = 0;
        let tX = 0;
        let K = 0.0;
        this.m_J.SetZero();
        if (this.m_revolute1) {
          this.m_J.angularA = (-1.0);
          K += bA.m_invI;
        } else {
          tMat = g1.m_xf.R;
          tVec = this.m_prismatic1.m_localXAxis1;
          ugX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
          ugY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
          tMat = bA.m_xf.R;
          rX = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
          rY = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
          tX = tMat.col1.x * rX + tMat.col2.x * rY;
          rY = tMat.col1.y * rX + tMat.col2.y * rY;
          rX = tX;
          crug = rX * ugY - rY * ugX;
          this.m_J.linearA.Set((-ugX), (-ugY));
          this.m_J.angularA = (-crug);
          K += bA.m_invMass + bA.m_invI * crug * crug;
        }
        if (this.m_revolute2) {
          this.m_J.angularB = (-this.m_ratio);
          K += this.m_ratio * this.m_ratio * bB.m_invI;
        } else {
          tMat = g2.m_xf.R;
          tVec = this.m_prismatic2.m_localXAxis1;
          ugX = tMat.col1.x * tVec.x + tMat.col2.x * tVec.y;
          ugY = tMat.col1.y * tVec.x + tMat.col2.y * tVec.y;
          tMat = bB.m_xf.R;
          rX = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
          rY = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
          tX = tMat.col1.x * rX + tMat.col2.x * rY;
          rY = tMat.col1.y * rX + tMat.col2.y * rY;
          rX = tX;
          crug = rX * ugY - rY * ugX;
          this.m_J.linearB.Set((-this.m_ratio * ugX), (-this.m_ratio * ugY));
          this.m_J.angularB = (-this.m_ratio * crug);
          K += this.m_ratio * this.m_ratio * (bB.m_invMass + bB.m_invI * crug * crug);
        }
        this.m_mass = K > 0.0 ? 1.0 / K : 0.0;
        if (step.warmStarting) {
          bA.m_linearVelocity.x += bA.m_invMass * this.m_impulse * this.m_J.linearA.x;
          bA.m_linearVelocity.y += bA.m_invMass * this.m_impulse * this.m_J.linearA.y;
          bA.m_angularVelocity += bA.m_invI * this.m_impulse * this.m_J.angularA;
          bB.m_linearVelocity.x += bB.m_invMass * this.m_impulse * this.m_J.linearB.x;
          bB.m_linearVelocity.y += bB.m_invMass * this.m_impulse * this.m_J.linearB.y;
          bB.m_angularVelocity += bB.m_invI * this.m_impulse * this.m_J.angularB;
        } else {
          this.m_impulse = 0.0;
        }
      }

      SolveVelocityConstraints(step) {
        const bA = this.m_bodyA;
        const bB = this.m_bodyB;
        const Cdot = this.m_J.Compute(bA.m_linearVelocity, bA.m_angularVelocity, bB.m_linearVelocity, bB.m_angularVelocity);
        const impulse = (-this.m_mass * Cdot);
        this.m_impulse += impulse;
        bA.m_linearVelocity.x += bA.m_invMass * impulse * this.m_J.linearA.x;
        bA.m_linearVelocity.y += bA.m_invMass * impulse * this.m_J.linearA.y;
        bA.m_angularVelocity += bA.m_invI * impulse * this.m_J.angularA;
        bB.m_linearVelocity.x += bB.m_invMass * impulse * this.m_J.linearB.x;
        bB.m_linearVelocity.y += bB.m_invMass * impulse * this.m_J.linearB.y;
        bB.m_angularVelocity += bB.m_invI * impulse * this.m_J.angularB;
      }

      SolvePositionConstraints(baumgarte) {
        if (baumgarte === undefined) baumgarte = 0;
        const linearError = 0.0;
        const bA = this.m_bodyA;
        const bB = this.m_bodyB;
        let coordinate1 = 0;
        let coordinate2 = 0;
        if (this.m_revolute1) {
          coordinate1 = this.m_revolute1.GetJointAngle();
        } else {
          coordinate1 = this.m_prismatic1.GetJointTranslation();
        }
        if (this.m_revolute2) {
          coordinate2 = this.m_revolute2.GetJointAngle();
        } else {
          coordinate2 = this.m_prismatic2.GetJointTranslation();
        }
        const C = this.m_constant - (coordinate1 + this.m_ratio * coordinate2);
        const impulse = (-this.m_mass * C);
        bA.m_sweep.c.x += bA.m_invMass * impulse * this.m_J.linearA.x;
        bA.m_sweep.c.y += bA.m_invMass * impulse * this.m_J.linearA.y;
        bA.m_sweep.a += bA.m_invI * impulse * this.m_J.angularA;
        bB.m_sweep.c.x += bB.m_invMass * impulse * this.m_J.linearB.x;
        bB.m_sweep.c.y += bB.m_invMass * impulse * this.m_J.linearB.y;
        bB.m_sweep.a += bB.m_invI * impulse * this.m_J.angularB;
        bA.SynchronizeTransform();
        bB.SynchronizeTransform();
        return linearError < b2Settings.b2_linearSlop;
      }
    }

    Box2D.Dynamics.Joints.b2GearJoint = b2GearJoint;

    class b2GearJointDef extends b2JointDef {
      constructor() {
        super(...arguments);
        b2GearJointDef.b2GearJointDef.apply(this, arguments);
        if (this.constructor === b2GearJointDef) this.b2GearJointDef.apply(this, arguments);
      }

      static b2GearJointDef() {
        Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
      }

      b2GearJointDef() {
        this.__super.b2JointDef.call(this);
        this.type = b2Joint.e_gearJoint;
        this.joint1 = null;
        this.joint2 = null;
        this.ratio = 1.0;
      }
    }

    Box2D.Dynamics.Joints.b2GearJointDef = b2GearJointDef;

    class b2Jacobian {
      constructor() {
        b2Jacobian.b2Jacobian.apply(this, arguments);
      }

      static b2Jacobian() {
        this.linearA = new b2Vec2();
        this.linearB = new b2Vec2();
      }

      SetZero() {
        this.linearA.SetZero();
        this.angularA = 0.0;
        this.linearB.SetZero();
        this.angularB = 0.0;
      }

      Set(x1, a1, x2, a2) {
        if (a1 === undefined) a1 = 0;
        if (a2 === undefined) a2 = 0;
        this.linearA.SetV(x1);
        this.angularA = a1;
        this.linearB.SetV(x2);
        this.angularB = a2;
      }

      Compute(x1, a1, x2, a2) {
        if (a1 === undefined) a1 = 0;
        if (a2 === undefined) a2 = 0;
        return (this.linearA.x * x1.x + this.linearA.y * x1.y) + this.angularA * a1 + (this.linearB.x * x2.x + this.linearB.y * x2.y) + this.angularB * a2;
      }
    }

    Box2D.Dynamics.Joints.b2Jacobian = b2Jacobian;

    class b2DistanceJoint extends b2Joint {
      constructor() {
        super(...arguments);
        b2DistanceJoint.b2DistanceJoint.apply(this, arguments);
        if (this.constructor === b2DistanceJoint) this.b2DistanceJoint.apply(this, arguments);
      }

      static b2DistanceJoint() {
        Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
        this.m_localAnchor1 = new b2Vec2();
        this.m_localAnchor2 = new b2Vec2();
        this.m_u = new b2Vec2();
      }

      GetAnchorA() {
        return this.m_bodyA.GetWorldPoint(this.m_localAnchor1);
      }

      GetAnchorB() {
        return this.m_bodyB.GetWorldPoint(this.m_localAnchor2);
      }

      GetReactionForce(inv_dt) {
        if (inv_dt === undefined) inv_dt = 0;
        return new b2Vec2(inv_dt * this.m_impulse * this.m_u.x, inv_dt * this.m_impulse * this.m_u.y);
      }

      GetReactionTorque(inv_dt) {
        if (inv_dt === undefined) inv_dt = 0;
        return 0.0;
      }

      GetLength() {
        return this.m_length;
      }

      SetLength(length) {
        if (length === undefined) length = 0;
        this.m_length = length;
      }

      GetFrequency() {
        return this.m_frequencyHz;
      }

      SetFrequency(hz) {
        if (hz === undefined) hz = 0;
        this.m_frequencyHz = hz;
      }

      GetDampingRatio() {
        return this.m_dampingRatio;
      }

      SetDampingRatio(ratio) {
        if (ratio === undefined) ratio = 0;
        this.m_dampingRatio = ratio;
      }

      b2DistanceJoint(def) {
        this.__super.b2Joint.call(this, def);
        let tMat;
        const tX = 0;
        const tY = 0;
        this.m_localAnchor1.SetV(def.localAnchorA);
        this.m_localAnchor2.SetV(def.localAnchorB);
        this.m_length = def.length;
        this.m_frequencyHz = def.frequencyHz;
        this.m_dampingRatio = def.dampingRatio;
        this.m_impulse = 0.0;
        this.m_gamma = 0.0;
        this.m_bias = 0.0;
      }

      InitVelocityConstraints(step) {
        let tMat;
        let tX = 0;
        const bA = this.m_bodyA;
        const bB = this.m_bodyB;
        tMat = bA.m_xf.R;
        let r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
        let r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
        tX = (tMat.col1.x * r1X + tMat.col2.x * r1Y);
        r1Y = (tMat.col1.y * r1X + tMat.col2.y * r1Y);
        r1X = tX;
        tMat = bB.m_xf.R;
        let r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
        let r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
        tX = (tMat.col1.x * r2X + tMat.col2.x * r2Y);
        r2Y = (tMat.col1.y * r2X + tMat.col2.y * r2Y);
        r2X = tX;
        this.m_u.x = bB.m_sweep.c.x + r2X - bA.m_sweep.c.x - r1X;
        this.m_u.y = bB.m_sweep.c.y + r2Y - bA.m_sweep.c.y - r1Y;
        const length = Math.sqrt(this.m_u.x * this.m_u.x + this.m_u.y * this.m_u.y);
        if (length > b2Settings.b2_linearSlop) {
          this.m_u.Multiply(1.0 / length);
        } else {
          this.m_u.SetZero();
        }
        const cr1u = (r1X * this.m_u.y - r1Y * this.m_u.x);
        const cr2u = (r2X * this.m_u.y - r2Y * this.m_u.x);
        const invMass = bA.m_invMass + bA.m_invI * cr1u * cr1u + bB.m_invMass + bB.m_invI * cr2u * cr2u;
        this.m_mass = invMass != 0.0 ? 1.0 / invMass : 0.0;
        if (this.m_frequencyHz > 0.0) {
          const C = length - this.m_length;
          const omega = 2.0 * Math.PI * this.m_frequencyHz;
          const d = 2.0 * this.m_mass * this.m_dampingRatio * omega;
          const k = this.m_mass * omega * omega;
          this.m_gamma = step.dt * (d + step.dt * k);
          this.m_gamma = this.m_gamma != 0.0 ? 1 / this.m_gamma : 0.0;
          this.m_bias = C * step.dt * k * this.m_gamma;
          this.m_mass = invMass + this.m_gamma;
          this.m_mass = this.m_mass != 0.0 ? 1.0 / this.m_mass : 0.0;
        }
        if (step.warmStarting) {
          this.m_impulse *= step.dtRatio;
          const PX = this.m_impulse * this.m_u.x;
          const PY = this.m_impulse * this.m_u.y;
          bA.m_linearVelocity.x -= bA.m_invMass * PX;
          bA.m_linearVelocity.y -= bA.m_invMass * PY;
          bA.m_angularVelocity -= bA.m_invI * (r1X * PY - r1Y * PX);
          bB.m_linearVelocity.x += bB.m_invMass * PX;
          bB.m_linearVelocity.y += bB.m_invMass * PY;
          bB.m_angularVelocity += bB.m_invI * (r2X * PY - r2Y * PX);
        } else {
          this.m_impulse = 0.0;
        }
      }

      SolveVelocityConstraints(step) {
        let tMat;
        const bA = this.m_bodyA;
        const bB = this.m_bodyB;
        tMat = bA.m_xf.R;
        let r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
        let r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
        let tX = (tMat.col1.x * r1X + tMat.col2.x * r1Y);
        r1Y = (tMat.col1.y * r1X + tMat.col2.y * r1Y);
        r1X = tX;
        tMat = bB.m_xf.R;
        let r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
        let r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
        tX = (tMat.col1.x * r2X + tMat.col2.x * r2Y);
        r2Y = (tMat.col1.y * r2X + tMat.col2.y * r2Y);
        r2X = tX;
        const v1X = bA.m_linearVelocity.x + ((-bA.m_angularVelocity * r1Y));
        const v1Y = bA.m_linearVelocity.y + (bA.m_angularVelocity * r1X);
        const v2X = bB.m_linearVelocity.x + ((-bB.m_angularVelocity * r2Y));
        const v2Y = bB.m_linearVelocity.y + (bB.m_angularVelocity * r2X);
        const Cdot = (this.m_u.x * (v2X - v1X) + this.m_u.y * (v2Y - v1Y));
        const impulse = (-this.m_mass * (Cdot + this.m_bias + this.m_gamma * this.m_impulse));
        this.m_impulse += impulse;
        const PX = impulse * this.m_u.x;
        const PY = impulse * this.m_u.y;
        bA.m_linearVelocity.x -= bA.m_invMass * PX;
        bA.m_linearVelocity.y -= bA.m_invMass * PY;
        bA.m_angularVelocity -= bA.m_invI * (r1X * PY - r1Y * PX);
        bB.m_linearVelocity.x += bB.m_invMass * PX;
        bB.m_linearVelocity.y += bB.m_invMass * PY;
        bB.m_angularVelocity += bB.m_invI * (r2X * PY - r2Y * PX);
      }

      SolvePositionConstraints(baumgarte) {
        if (baumgarte === undefined) baumgarte = 0;
        let tMat;
        if (this.m_frequencyHz > 0.0) {
          return true;
        }
        const bA = this.m_bodyA;
        const bB = this.m_bodyB;
        tMat = bA.m_xf.R;
        let r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
        let r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
        let tX = (tMat.col1.x * r1X + tMat.col2.x * r1Y);
        r1Y = (tMat.col1.y * r1X + tMat.col2.y * r1Y);
        r1X = tX;
        tMat = bB.m_xf.R;
        let r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
        let r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
        tX = (tMat.col1.x * r2X + tMat.col2.x * r2Y);
        r2Y = (tMat.col1.y * r2X + tMat.col2.y * r2Y);
        r2X = tX;
        let dX = bB.m_sweep.c.x + r2X - bA.m_sweep.c.x - r1X;
        let dY = bB.m_sweep.c.y + r2Y - bA.m_sweep.c.y - r1Y;
        const length = Math.sqrt(dX * dX + dY * dY);
        dX /= length;
        dY /= length;
        let C = length - this.m_length;
        C = b2Math.Clamp(C, (-b2Settings.b2_maxLinearCorrection), b2Settings.b2_maxLinearCorrection);
        const impulse = (-this.m_mass * C);
        this.m_u.Set(dX, dY);
        const PX = impulse * this.m_u.x;
        const PY = impulse * this.m_u.y;
        bA.m_sweep.c.x -= bA.m_invMass * PX;
        bA.m_sweep.c.y -= bA.m_invMass * PY;
        bA.m_sweep.a -= bA.m_invI * (r1X * PY - r1Y * PX);
        bB.m_sweep.c.x += bB.m_invMass * PX;
        bB.m_sweep.c.y += bB.m_invMass * PY;
        bB.m_sweep.a += bB.m_invI * (r2X * PY - r2Y * PX);
        bA.SynchronizeTransform();
        bB.SynchronizeTransform();
        return b2Math.Abs(C) < b2Settings.b2_linearSlop;
      }
    }

    Box2D.Dynamics.Joints.b2DistanceJoint = b2DistanceJoint;

    function b2JointEdge() {
      b2JointEdge.b2JointEdge.apply(this, arguments);
    }
    Box2D.Dynamics.Joints.b2JointEdge = b2JointEdge;

    class b2LineJoint extends b2Joint {
      constructor() {
        super(...arguments);
        b2LineJoint.b2LineJoint.apply(this, arguments);
        if (this.constructor === b2LineJoint) this.b2LineJoint.apply(this, arguments);
      }

      static b2LineJoint() {
        Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
        this.m_localAnchor1 = new b2Vec2();
        this.m_localAnchor2 = new b2Vec2();
        this.m_localXAxis1 = new b2Vec2();
        this.m_localYAxis1 = new b2Vec2();
        this.m_axis = new b2Vec2();
        this.m_perp = new b2Vec2();
        this.m_K = new b2Mat22();
        this.m_impulse = new b2Vec2();
      }

      GetAnchorA() {
        return this.m_bodyA.GetWorldPoint(this.m_localAnchor1);
      }

      GetAnchorB() {
        return this.m_bodyB.GetWorldPoint(this.m_localAnchor2);
      }

      GetReactionForce(inv_dt) {
        if (inv_dt === undefined) inv_dt = 0;
        return new b2Vec2(inv_dt * (this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.y) * this.m_axis.x), inv_dt * (this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.y) * this.m_axis.y));
      }

      GetReactionTorque(inv_dt) {
        if (inv_dt === undefined) inv_dt = 0;
        return inv_dt * this.m_impulse.y;
      }

      GetJointTranslation() {
        const bA = this.m_bodyA;
        const bB = this.m_bodyB;
        let tMat;
        const p1 = bA.GetWorldPoint(this.m_localAnchor1);
        const p2 = bB.GetWorldPoint(this.m_localAnchor2);
        const dX = p2.x - p1.x;
        const dY = p2.y - p1.y;
        const axis = bA.GetWorldVector(this.m_localXAxis1);
        const translation = axis.x * dX + axis.y * dY;
        return translation;
      }

      GetJointSpeed() {
        const bA = this.m_bodyA;
        const bB = this.m_bodyB;
        let tMat;
        tMat = bA.m_xf.R;
        let r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
        let r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
        let tX = (tMat.col1.x * r1X + tMat.col2.x * r1Y);
        r1Y = (tMat.col1.y * r1X + tMat.col2.y * r1Y);
        r1X = tX;
        tMat = bB.m_xf.R;
        let r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
        let r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
        tX = (tMat.col1.x * r2X + tMat.col2.x * r2Y);
        r2Y = (tMat.col1.y * r2X + tMat.col2.y * r2Y);
        r2X = tX;
        const p1X = bA.m_sweep.c.x + r1X;
        const p1Y = bA.m_sweep.c.y + r1Y;
        const p2X = bB.m_sweep.c.x + r2X;
        const p2Y = bB.m_sweep.c.y + r2Y;
        const dX = p2X - p1X;
        const dY = p2Y - p1Y;
        const axis = bA.GetWorldVector(this.m_localXAxis1);
        const v1 = bA.m_linearVelocity;
        const v2 = bB.m_linearVelocity;
        const w1 = bA.m_angularVelocity;
        const w2 = bB.m_angularVelocity;
        const speed = (dX * ((-w1 * axis.y)) + dY * (w1 * axis.x)) + (axis.x * (((v2.x + ((-w2 * r2Y))) - v1.x) - ((-w1 * r1Y))) + axis.y * (((v2.y + (w2 * r2X)) - v1.y) - (w1 * r1X)));
        return speed;
      }

      IsLimitEnabled() {
        return this.m_enableLimit;
      }

      EnableLimit(flag) {
        this.m_bodyA.SetAwake(true);
        this.m_bodyB.SetAwake(true);
        this.m_enableLimit = flag;
      }

      GetLowerLimit() {
        return this.m_lowerTranslation;
      }

      GetUpperLimit() {
        return this.m_upperTranslation;
      }

      SetLimits(lower, upper) {
        if (lower === undefined) lower = 0;
        if (upper === undefined) upper = 0;
        this.m_bodyA.SetAwake(true);
        this.m_bodyB.SetAwake(true);
        this.m_lowerTranslation = lower;
        this.m_upperTranslation = upper;
      }

      IsMotorEnabled() {
        return this.m_enableMotor;
      }

      EnableMotor(flag) {
        this.m_bodyA.SetAwake(true);
        this.m_bodyB.SetAwake(true);
        this.m_enableMotor = flag;
      }

      SetMotorSpeed(speed) {
        if (speed === undefined) speed = 0;
        this.m_bodyA.SetAwake(true);
        this.m_bodyB.SetAwake(true);
        this.m_motorSpeed = speed;
      }

      GetMotorSpeed() {
        return this.m_motorSpeed;
      }

      SetMaxMotorForce(force) {
        if (force === undefined) force = 0;
        this.m_bodyA.SetAwake(true);
        this.m_bodyB.SetAwake(true);
        this.m_maxMotorForce = force;
      }

      GetMaxMotorForce() {
        return this.m_maxMotorForce;
      }

      GetMotorForce() {
        return this.m_motorImpulse;
      }

      b2LineJoint(def) {
        this.__super.b2Joint.call(this, def);
        let tMat;
        const tX = 0;
        const tY = 0;
        this.m_localAnchor1.SetV(def.localAnchorA);
        this.m_localAnchor2.SetV(def.localAnchorB);
        this.m_localXAxis1.SetV(def.localAxisA);
        this.m_localYAxis1.x = (-this.m_localXAxis1.y);
        this.m_localYAxis1.y = this.m_localXAxis1.x;
        this.m_impulse.SetZero();
        this.m_motorMass = 0.0;
        this.m_motorImpulse = 0.0;
        this.m_lowerTranslation = def.lowerTranslation;
        this.m_upperTranslation = def.upperTranslation;
        this.m_maxMotorForce = def.maxMotorForce;
        this.m_motorSpeed = def.motorSpeed;
        this.m_enableLimit = def.enableLimit;
        this.m_enableMotor = def.enableMotor;
        this.m_limitState = b2Joint.e_inactiveLimit;
        this.m_axis.SetZero();
        this.m_perp.SetZero();
      }

      InitVelocityConstraints(step) {
        const bA = this.m_bodyA;
        const bB = this.m_bodyB;
        let tMat;
        let tX = 0;
        this.m_localCenterA.SetV(bA.GetLocalCenter());
        this.m_localCenterB.SetV(bB.GetLocalCenter());
        const xf1 = bA.GetTransform();
        const xf2 = bB.GetTransform();
        tMat = bA.m_xf.R;
        let r1X = this.m_localAnchor1.x - this.m_localCenterA.x;
        let r1Y = this.m_localAnchor1.y - this.m_localCenterA.y;
        tX = (tMat.col1.x * r1X + tMat.col2.x * r1Y);
        r1Y = (tMat.col1.y * r1X + tMat.col2.y * r1Y);
        r1X = tX;
        tMat = bB.m_xf.R;
        let r2X = this.m_localAnchor2.x - this.m_localCenterB.x;
        let r2Y = this.m_localAnchor2.y - this.m_localCenterB.y;
        tX = (tMat.col1.x * r2X + tMat.col2.x * r2Y);
        r2Y = (tMat.col1.y * r2X + tMat.col2.y * r2Y);
        r2X = tX;
        const dX = bB.m_sweep.c.x + r2X - bA.m_sweep.c.x - r1X;
        const dY = bB.m_sweep.c.y + r2Y - bA.m_sweep.c.y - r1Y;
        this.m_invMassA = bA.m_invMass;
        this.m_invMassB = bB.m_invMass;
        this.m_invIA = bA.m_invI;
        this.m_invIB = bB.m_invI; {
          this.m_axis.SetV(b2Math.MulMV(xf1.R, this.m_localXAxis1));
          this.m_a1 = (dX + r1X) * this.m_axis.y - (dY + r1Y) * this.m_axis.x;
          this.m_a2 = r2X * this.m_axis.y - r2Y * this.m_axis.x;
          this.m_motorMass = this.m_invMassA + this.m_invMassB + this.m_invIA * this.m_a1 * this.m_a1 + this.m_invIB * this.m_a2 * this.m_a2;
          this.m_motorMass = this.m_motorMass > Number.MIN_VALUE ? 1.0 / this.m_motorMass : 0.0;
        } {
          this.m_perp.SetV(b2Math.MulMV(xf1.R, this.m_localYAxis1));
          this.m_s1 = (dX + r1X) * this.m_perp.y - (dY + r1Y) * this.m_perp.x;
          this.m_s2 = r2X * this.m_perp.y - r2Y * this.m_perp.x;
          const m1 = this.m_invMassA;
          const m2 = this.m_invMassB;
          const i1 = this.m_invIA;
          const i2 = this.m_invIB;
          this.m_K.col1.x = m1 + m2 + i1 * this.m_s1 * this.m_s1 + i2 * this.m_s2 * this.m_s2;
          this.m_K.col1.y = i1 * this.m_s1 * this.m_a1 + i2 * this.m_s2 * this.m_a2;
          this.m_K.col2.x = this.m_K.col1.y;
          this.m_K.col2.y = m1 + m2 + i1 * this.m_a1 * this.m_a1 + i2 * this.m_a2 * this.m_a2;
        }
        if (this.m_enableLimit) {
          const jointTransition = this.m_axis.x * dX + this.m_axis.y * dY;
          if (b2Math.Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2.0 * b2Settings.b2_linearSlop) {
            this.m_limitState = b2Joint.e_equalLimits;
          } else if (jointTransition <= this.m_lowerTranslation) {
            if (this.m_limitState != b2Joint.e_atLowerLimit) {
              this.m_limitState = b2Joint.e_atLowerLimit;
              this.m_impulse.y = 0.0;
            }
          } else if (jointTransition >= this.m_upperTranslation) {
            if (this.m_limitState != b2Joint.e_atUpperLimit) {
              this.m_limitState = b2Joint.e_atUpperLimit;
              this.m_impulse.y = 0.0;
            }
          } else {
            this.m_limitState = b2Joint.e_inactiveLimit;
            this.m_impulse.y = 0.0;
          }
        } else {
          this.m_limitState = b2Joint.e_inactiveLimit;
        }
        if (this.m_enableMotor == false) {
          this.m_motorImpulse = 0.0;
        }
        if (step.warmStarting) {
          this.m_impulse.x *= step.dtRatio;
          this.m_impulse.y *= step.dtRatio;
          this.m_motorImpulse *= step.dtRatio;
          const PX = this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.y) * this.m_axis.x;
          const PY = this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.y) * this.m_axis.y;
          const L1 = this.m_impulse.x * this.m_s1 + (this.m_motorImpulse + this.m_impulse.y) * this.m_a1;
          const L2 = this.m_impulse.x * this.m_s2 + (this.m_motorImpulse + this.m_impulse.y) * this.m_a2;
          bA.m_linearVelocity.x -= this.m_invMassA * PX;
          bA.m_linearVelocity.y -= this.m_invMassA * PY;
          bA.m_angularVelocity -= this.m_invIA * L1;
          bB.m_linearVelocity.x += this.m_invMassB * PX;
          bB.m_linearVelocity.y += this.m_invMassB * PY;
          bB.m_angularVelocity += this.m_invIB * L2;
        } else {
          this.m_impulse.SetZero();
          this.m_motorImpulse = 0.0;
        }
      }

      SolveVelocityConstraints(step) {
        const bA = this.m_bodyA;
        const bB = this.m_bodyB;
        const v1 = bA.m_linearVelocity;
        let w1 = bA.m_angularVelocity;
        const v2 = bB.m_linearVelocity;
        let w2 = bB.m_angularVelocity;
        let PX = 0;
        let PY = 0;
        let L1 = 0;
        let L2 = 0;
        if (this.m_enableMotor && this.m_limitState != b2Joint.e_equalLimits) {
          const Cdot = this.m_axis.x * (v2.x - v1.x) + this.m_axis.y * (v2.y - v1.y) + this.m_a2 * w2 - this.m_a1 * w1;
          let impulse = this.m_motorMass * (this.m_motorSpeed - Cdot);
          const oldImpulse = this.m_motorImpulse;
          const maxImpulse = step.dt * this.m_maxMotorForce;
          this.m_motorImpulse = b2Math.Clamp(this.m_motorImpulse + impulse, (-maxImpulse), maxImpulse);
          impulse = this.m_motorImpulse - oldImpulse;
          PX = impulse * this.m_axis.x;
          PY = impulse * this.m_axis.y;
          L1 = impulse * this.m_a1;
          L2 = impulse * this.m_a2;
          v1.x -= this.m_invMassA * PX;
          v1.y -= this.m_invMassA * PY;
          w1 -= this.m_invIA * L1;
          v2.x += this.m_invMassB * PX;
          v2.y += this.m_invMassB * PY;
          w2 += this.m_invIB * L2;
        }
        const Cdot1 = this.m_perp.x * (v2.x - v1.x) + this.m_perp.y * (v2.y - v1.y) + this.m_s2 * w2 - this.m_s1 * w1;
        if (this.m_enableLimit && this.m_limitState != b2Joint.e_inactiveLimit) {
          const Cdot2 = this.m_axis.x * (v2.x - v1.x) + this.m_axis.y * (v2.y - v1.y) + this.m_a2 * w2 - this.m_a1 * w1;
          const f1 = this.m_impulse.Copy();
          const df = this.m_K.Solve(new b2Vec2(), (-Cdot1), (-Cdot2));
          this.m_impulse.Add(df);
          if (this.m_limitState == b2Joint.e_atLowerLimit) {
            this.m_impulse.y = b2Math.Max(this.m_impulse.y, 0.0);
          } else if (this.m_limitState == b2Joint.e_atUpperLimit) {
            this.m_impulse.y = b2Math.Min(this.m_impulse.y, 0.0);
          }
          const b = (-Cdot1) - (this.m_impulse.y - f1.y) * this.m_K.col2.x;
          let f2r = 0;
          if (this.m_K.col1.x != 0.0) {
            f2r = b / this.m_K.col1.x + f1.x;
          } else {
            f2r = f1.x;
          }
          this.m_impulse.x = f2r;
          df.x = this.m_impulse.x - f1.x;
          df.y = this.m_impulse.y - f1.y;
          PX = df.x * this.m_perp.x + df.y * this.m_axis.x;
          PY = df.x * this.m_perp.y + df.y * this.m_axis.y;
          L1 = df.x * this.m_s1 + df.y * this.m_a1;
          L2 = df.x * this.m_s2 + df.y * this.m_a2;
          v1.x -= this.m_invMassA * PX;
          v1.y -= this.m_invMassA * PY;
          w1 -= this.m_invIA * L1;
          v2.x += this.m_invMassB * PX;
          v2.y += this.m_invMassB * PY;
          w2 += this.m_invIB * L2;
        } else {
          let df2 = 0;
          if (this.m_K.col1.x != 0.0) {
            df2 = ((-Cdot1)) / this.m_K.col1.x;
          } else {
            df2 = 0.0;
          }
          this.m_impulse.x += df2;
          PX = df2 * this.m_perp.x;
          PY = df2 * this.m_perp.y;
          L1 = df2 * this.m_s1;
          L2 = df2 * this.m_s2;
          v1.x -= this.m_invMassA * PX;
          v1.y -= this.m_invMassA * PY;
          w1 -= this.m_invIA * L1;
          v2.x += this.m_invMassB * PX;
          v2.y += this.m_invMassB * PY;
          w2 += this.m_invIB * L2;
        }
        bA.m_linearVelocity.SetV(v1);
        bA.m_angularVelocity = w1;
        bB.m_linearVelocity.SetV(v2);
        bB.m_angularVelocity = w2;
      }

      SolvePositionConstraints(baumgarte) {
        if (baumgarte === undefined) baumgarte = 0;
        const limitC = 0;
        const oldLimitImpulse = 0;
        const bA = this.m_bodyA;
        const bB = this.m_bodyB;
        const c1 = bA.m_sweep.c;
        let a1 = bA.m_sweep.a;
        const c2 = bB.m_sweep.c;
        let a2 = bB.m_sweep.a;
        let tMat;
        let tX = 0;
        let m1 = 0;
        let m2 = 0;
        let i1 = 0;
        let i2 = 0;
        let linearError = 0.0;
        let angularError = 0.0;
        let active = false;
        let C2 = 0.0;
        const R1 = b2Mat22.FromAngle(a1);
        const R2 = b2Mat22.FromAngle(a2);
        tMat = R1;
        let r1X = this.m_localAnchor1.x - this.m_localCenterA.x;
        let r1Y = this.m_localAnchor1.y - this.m_localCenterA.y;
        tX = (tMat.col1.x * r1X + tMat.col2.x * r1Y);
        r1Y = (tMat.col1.y * r1X + tMat.col2.y * r1Y);
        r1X = tX;
        tMat = R2;
        let r2X = this.m_localAnchor2.x - this.m_localCenterB.x;
        let r2Y = this.m_localAnchor2.y - this.m_localCenterB.y;
        tX = (tMat.col1.x * r2X + tMat.col2.x * r2Y);
        r2Y = (tMat.col1.y * r2X + tMat.col2.y * r2Y);
        r2X = tX;
        const dX = c2.x + r2X - c1.x - r1X;
        const dY = c2.y + r2Y - c1.y - r1Y;
        if (this.m_enableLimit) {
          this.m_axis = b2Math.MulMV(R1, this.m_localXAxis1);
          this.m_a1 = (dX + r1X) * this.m_axis.y - (dY + r1Y) * this.m_axis.x;
          this.m_a2 = r2X * this.m_axis.y - r2Y * this.m_axis.x;
          const translation = this.m_axis.x * dX + this.m_axis.y * dY;
          if (b2Math.Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2.0 * b2Settings.b2_linearSlop) {
            C2 = b2Math.Clamp(translation, (-b2Settings.b2_maxLinearCorrection), b2Settings.b2_maxLinearCorrection);
            linearError = b2Math.Abs(translation);
            active = true;
          } else if (translation <= this.m_lowerTranslation) {
            C2 = b2Math.Clamp(translation - this.m_lowerTranslation + b2Settings.b2_linearSlop, (-b2Settings.b2_maxLinearCorrection), 0.0);
            linearError = this.m_lowerTranslation - translation;
            active = true;
          } else if (translation >= this.m_upperTranslation) {
            C2 = b2Math.Clamp(translation - this.m_upperTranslation + b2Settings.b2_linearSlop, 0.0, b2Settings.b2_maxLinearCorrection);
            linearError = translation - this.m_upperTranslation;
            active = true;
          }
        }
        this.m_perp = b2Math.MulMV(R1, this.m_localYAxis1);
        this.m_s1 = (dX + r1X) * this.m_perp.y - (dY + r1Y) * this.m_perp.x;
        this.m_s2 = r2X * this.m_perp.y - r2Y * this.m_perp.x;
        const impulse = new b2Vec2();
        const C1 = this.m_perp.x * dX + this.m_perp.y * dY;
        linearError = b2Math.Max(linearError, b2Math.Abs(C1));
        angularError = 0.0;
        if (active) {
          m1 = this.m_invMassA;
          m2 = this.m_invMassB;
          i1 = this.m_invIA;
          i2 = this.m_invIB;
          this.m_K.col1.x = m1 + m2 + i1 * this.m_s1 * this.m_s1 + i2 * this.m_s2 * this.m_s2;
          this.m_K.col1.y = i1 * this.m_s1 * this.m_a1 + i2 * this.m_s2 * this.m_a2;
          this.m_K.col2.x = this.m_K.col1.y;
          this.m_K.col2.y = m1 + m2 + i1 * this.m_a1 * this.m_a1 + i2 * this.m_a2 * this.m_a2;
          this.m_K.Solve(impulse, (-C1), (-C2));
        } else {
          m1 = this.m_invMassA;
          m2 = this.m_invMassB;
          i1 = this.m_invIA;
          i2 = this.m_invIB;
          const k11 = m1 + m2 + i1 * this.m_s1 * this.m_s1 + i2 * this.m_s2 * this.m_s2;
          let impulse1 = 0;
          if (k11 != 0.0) {
            impulse1 = ((-C1)) / k11;
          } else {
            impulse1 = 0.0;
          }
          impulse.x = impulse1;
          impulse.y = 0.0;
        }
        const PX = impulse.x * this.m_perp.x + impulse.y * this.m_axis.x;
        const PY = impulse.x * this.m_perp.y + impulse.y * this.m_axis.y;
        const L1 = impulse.x * this.m_s1 + impulse.y * this.m_a1;
        const L2 = impulse.x * this.m_s2 + impulse.y * this.m_a2;
        c1.x -= this.m_invMassA * PX;
        c1.y -= this.m_invMassA * PY;
        a1 -= this.m_invIA * L1;
        c2.x += this.m_invMassB * PX;
        c2.y += this.m_invMassB * PY;
        a2 += this.m_invIB * L2;
        bA.m_sweep.a = a1;
        bB.m_sweep.a = a2;
        bA.SynchronizeTransform();
        bB.SynchronizeTransform();
        return linearError <= b2Settings.b2_linearSlop && angularError <= b2Settings.b2_angularSlop;
      }
    }

    Box2D.Dynamics.Joints.b2LineJoint = b2LineJoint;

    class b2LineJointDef extends b2JointDef {
      constructor() {
        super(...arguments);
        b2LineJointDef.b2LineJointDef.apply(this, arguments);
        if (this.constructor === b2LineJointDef) this.b2LineJointDef.apply(this, arguments);
      }

      static b2LineJointDef() {
        Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
        this.localAnchorA = new b2Vec2();
        this.localAnchorB = new b2Vec2();
        this.localAxisA = new b2Vec2();
      }

      b2LineJointDef() {
        this.__super.b2JointDef.call(this);
        this.type = b2Joint.e_lineJoint;
        this.localAxisA.Set(1.0, 0.0);
        this.enableLimit = false;
        this.lowerTranslation = 0.0;
        this.upperTranslation = 0.0;
        this.enableMotor = false;
        this.maxMotorForce = 0.0;
        this.motorSpeed = 0.0;
      }

      Initialize(bA, bB, anchor, axis) {
        this.bodyA = bA;
        this.bodyB = bB;
        this.localAnchorA = this.bodyA.GetLocalPoint(anchor);
        this.localAnchorB = this.bodyB.GetLocalPoint(anchor);
        this.localAxisA = this.bodyA.GetLocalVector(axis);
      }
    }

    Box2D.Dynamics.Joints.b2LineJointDef = b2LineJointDef;

    class b2MouseJoint extends b2Joint {
      constructor() {
        super(...arguments);
        b2MouseJoint.b2MouseJoint.apply(this, arguments);
        if (this.constructor === b2MouseJoint) this.b2MouseJoint.apply(this, arguments);
      }

      static b2MouseJoint() {
        Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
        this.K = new b2Mat22();
        this.K1 = new b2Mat22();
        this.K2 = new b2Mat22();
        this.m_localAnchor = new b2Vec2();
        this.m_target = new b2Vec2();
        this.m_impulse = new b2Vec2();
        this.m_mass = new b2Mat22();
        this.m_C = new b2Vec2();
      }

      GetAnchorA() {
        return this.m_target;
      }

      GetAnchorB() {
        return this.m_bodyB.GetWorldPoint(this.m_localAnchor);
      }

      GetReactionForce(inv_dt) {
        if (inv_dt === undefined) inv_dt = 0;
        return new b2Vec2(inv_dt * this.m_impulse.x, inv_dt * this.m_impulse.y);
      }

      GetReactionTorque(inv_dt) {
        if (inv_dt === undefined) inv_dt = 0;
        return 0.0;
      }

      GetTarget() {
        return this.m_target;
      }

      SetTarget(target) {
        if (this.m_bodyB.IsAwake() == false) {
          this.m_bodyB.SetAwake(true);
        }
        this.m_target = target;
      }

      GetMaxForce() {
        return this.m_maxForce;
      }

      SetMaxForce(maxForce) {
        if (maxForce === undefined) maxForce = 0;
        this.m_maxForce = maxForce;
      }

      GetFrequency() {
        return this.m_frequencyHz;
      }

      SetFrequency(hz) {
        if (hz === undefined) hz = 0;
        this.m_frequencyHz = hz;
      }

      GetDampingRatio() {
        return this.m_dampingRatio;
      }

      SetDampingRatio(ratio) {
        if (ratio === undefined) ratio = 0;
        this.m_dampingRatio = ratio;
      }

      b2MouseJoint(def) {
        this.__super.b2Joint.call(this, def);
        this.m_target.SetV(def.target);
        const tX = this.m_target.x - this.m_bodyB.m_xf.position.x;
        const tY = this.m_target.y - this.m_bodyB.m_xf.position.y;
        const tMat = this.m_bodyB.m_xf.R;
        this.m_localAnchor.x = (tX * tMat.col1.x + tY * tMat.col1.y);
        this.m_localAnchor.y = (tX * tMat.col2.x + tY * tMat.col2.y);
        this.m_maxForce = def.maxForce;
        this.m_impulse.SetZero();
        this.m_frequencyHz = def.frequencyHz;
        this.m_dampingRatio = def.dampingRatio;
        this.m_beta = 0.0;
        this.m_gamma = 0.0;
      }

      InitVelocityConstraints(step) {
        const b = this.m_bodyB;
        const mass = b.GetMass();
        const omega = 2.0 * Math.PI * this.m_frequencyHz;
        const d = 2.0 * mass * this.m_dampingRatio * omega;
        const k = mass * omega * omega;
        this.m_gamma = step.dt * (d + step.dt * k);
        this.m_gamma = this.m_gamma != 0 ? 1 / this.m_gamma : 0.0;
        this.m_beta = step.dt * k * this.m_gamma;
        let tMat; tMat = b.m_xf.R;
        let rX = this.m_localAnchor.x - b.m_sweep.localCenter.x;
        let rY = this.m_localAnchor.y - b.m_sweep.localCenter.y;
        const tX = (tMat.col1.x * rX + tMat.col2.x * rY); rY = (tMat.col1.y * rX + tMat.col2.y * rY);
        rX = tX;
        const invMass = b.m_invMass;
        const invI = b.m_invI; this.K1.col1.x = invMass;
        this.K1.col2.x = 0.0;
        this.K1.col1.y = 0.0;
        this.K1.col2.y = invMass;
        this.K2.col1.x = invI * rY * rY;
        this.K2.col2.x = (-invI * rX * rY);
        this.K2.col1.y = (-invI * rX * rY);
        this.K2.col2.y = invI * rX * rX;
        this.K.SetM(this.K1);
        this.K.AddM(this.K2);
        this.K.col1.x += this.m_gamma;
        this.K.col2.y += this.m_gamma;
        this.K.GetInverse(this.m_mass);
        this.m_C.x = b.m_sweep.c.x + rX - this.m_target.x;
        this.m_C.y = b.m_sweep.c.y + rY - this.m_target.y;
        b.m_angularVelocity *= 0.98;
        this.m_impulse.x *= step.dtRatio;
        this.m_impulse.y *= step.dtRatio;
        b.m_linearVelocity.x += invMass * this.m_impulse.x;
        b.m_linearVelocity.y += invMass * this.m_impulse.y;
        b.m_angularVelocity += invI * (rX * this.m_impulse.y - rY * this.m_impulse.x);
      }

      SolveVelocityConstraints(step) {
        const b = this.m_bodyB;
        let tMat;
        let tX = 0;
        let tY = 0;
        tMat = b.m_xf.R;
        let rX = this.m_localAnchor.x - b.m_sweep.localCenter.x;
        let rY = this.m_localAnchor.y - b.m_sweep.localCenter.y;
        tX = (tMat.col1.x * rX + tMat.col2.x * rY);
        rY = (tMat.col1.y * rX + tMat.col2.y * rY);
        rX = tX;
        const CdotX = b.m_linearVelocity.x + ((-b.m_angularVelocity * rY));
        const CdotY = b.m_linearVelocity.y + (b.m_angularVelocity * rX);
        tMat = this.m_mass;
        tX = CdotX + this.m_beta * this.m_C.x + this.m_gamma * this.m_impulse.x;
        tY = CdotY + this.m_beta * this.m_C.y + this.m_gamma * this.m_impulse.y;
        let impulseX = (-(tMat.col1.x * tX + tMat.col2.x * tY));
        let impulseY = (-(tMat.col1.y * tX + tMat.col2.y * tY));
        const oldImpulseX = this.m_impulse.x;
        const oldImpulseY = this.m_impulse.y;
        this.m_impulse.x += impulseX;
        this.m_impulse.y += impulseY;
        const maxImpulse = step.dt * this.m_maxForce;
        if (this.m_impulse.LengthSquared() > maxImpulse * maxImpulse) {
          this.m_impulse.Multiply(maxImpulse / this.m_impulse.Length());
        }
        impulseX = this.m_impulse.x - oldImpulseX;
        impulseY = this.m_impulse.y - oldImpulseY;
        b.m_linearVelocity.x += b.m_invMass * impulseX;
        b.m_linearVelocity.y += b.m_invMass * impulseY;
        b.m_angularVelocity += b.m_invI * (rX * impulseY - rY * impulseX);
      }

      SolvePositionConstraints(baumgarte) {
        if (baumgarte === undefined) baumgarte = 0;
        return true;
      }
    }

    Box2D.Dynamics.Joints.b2MouseJoint = b2MouseJoint;

    class b2MouseJointDef extends b2JointDef {
      constructor() {
        super(...arguments);
        b2MouseJointDef.b2MouseJointDef.apply(this, arguments);
        if (this.constructor === b2MouseJointDef) this.b2MouseJointDef.apply(this, arguments);
      }

      static b2MouseJointDef() {
        Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
        this.target = new b2Vec2();
      }

      b2MouseJointDef() {
        this.__super.b2JointDef.call(this);
        this.type = b2Joint.e_mouseJoint;
        this.maxForce = 0.0;
        this.frequencyHz = 5.0;
        this.dampingRatio = 0.7;
      }
    }

    Box2D.Dynamics.Joints.b2MouseJointDef = b2MouseJointDef;

    class b2PrismaticJoint extends b2Joint {
      constructor() {
        super(...arguments);
        b2PrismaticJoint.b2PrismaticJoint.apply(this, arguments);
        if (this.constructor === b2PrismaticJoint) this.b2PrismaticJoint.apply(this, arguments);
      }

      static b2PrismaticJoint() {
        Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
        this.m_localAnchor1 = new b2Vec2();
        this.m_localAnchor2 = new b2Vec2();
        this.m_localXAxis1 = new b2Vec2();
        this.m_localYAxis1 = new b2Vec2();
        this.m_axis = new b2Vec2();
        this.m_perp = new b2Vec2();
        this.m_K = new b2Mat33();
        this.m_impulse = new b2Vec3();
      }

      GetAnchorA() {
        return this.m_bodyA.GetWorldPoint(this.m_localAnchor1);
      }

      GetAnchorB() {
        return this.m_bodyB.GetWorldPoint(this.m_localAnchor2);
      }

      GetReactionForce(inv_dt) {
        if (inv_dt === undefined) inv_dt = 0;
        return new b2Vec2(inv_dt * (this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.x), inv_dt * (this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.y));
      }

      GetReactionTorque(inv_dt) {
        if (inv_dt === undefined) inv_dt = 0;
        return inv_dt * this.m_impulse.y;
      }

      GetJointTranslation() {
        const bA = this.m_bodyA;
        const bB = this.m_bodyB;
        let tMat;
        const p1 = bA.GetWorldPoint(this.m_localAnchor1);
        const p2 = bB.GetWorldPoint(this.m_localAnchor2);
        const dX = p2.x - p1.x;
        const dY = p2.y - p1.y;
        const axis = bA.GetWorldVector(this.m_localXAxis1);
        const translation = axis.x * dX + axis.y * dY;
        return translation;
      }

      GetJointSpeed() {
        const bA = this.m_bodyA;
        const bB = this.m_bodyB;
        let tMat;
        tMat = bA.m_xf.R;
        let r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
        let r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
        let tX = (tMat.col1.x * r1X + tMat.col2.x * r1Y);
        r1Y = (tMat.col1.y * r1X + tMat.col2.y * r1Y);
        r1X = tX;
        tMat = bB.m_xf.R;
        let r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
        let r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
        tX = (tMat.col1.x * r2X + tMat.col2.x * r2Y);
        r2Y = (tMat.col1.y * r2X + tMat.col2.y * r2Y);
        r2X = tX;
        const p1X = bA.m_sweep.c.x + r1X;
        const p1Y = bA.m_sweep.c.y + r1Y;
        const p2X = bB.m_sweep.c.x + r2X;
        const p2Y = bB.m_sweep.c.y + r2Y;
        const dX = p2X - p1X;
        const dY = p2Y - p1Y;
        const axis = bA.GetWorldVector(this.m_localXAxis1);
        const v1 = bA.m_linearVelocity;
        const v2 = bB.m_linearVelocity;
        const w1 = bA.m_angularVelocity;
        const w2 = bB.m_angularVelocity;
        const speed = (dX * ((-w1 * axis.y)) + dY * (w1 * axis.x)) + (axis.x * (((v2.x + ((-w2 * r2Y))) - v1.x) - ((-w1 * r1Y))) + axis.y * (((v2.y + (w2 * r2X)) - v1.y) - (w1 * r1X)));
        return speed;
      }

      IsLimitEnabled() {
        return this.m_enableLimit;
      }

      EnableLimit(flag) {
        this.m_bodyA.SetAwake(true);
        this.m_bodyB.SetAwake(true);
        this.m_enableLimit = flag;
      }

      GetLowerLimit() {
        return this.m_lowerTranslation;
      }

      GetUpperLimit() {
        return this.m_upperTranslation;
      }

      SetLimits(lower, upper) {
        if (lower === undefined) lower = 0;
        if (upper === undefined) upper = 0;
        this.m_bodyA.SetAwake(true);
        this.m_bodyB.SetAwake(true);
        this.m_lowerTranslation = lower;
        this.m_upperTranslation = upper;
      }

      IsMotorEnabled() {
        return this.m_enableMotor;
      }

      EnableMotor(flag) {
        this.m_bodyA.SetAwake(true);
        this.m_bodyB.SetAwake(true);
        this.m_enableMotor = flag;
      }

      SetMotorSpeed(speed) {
        if (speed === undefined) speed = 0;
        this.m_bodyA.SetAwake(true);
        this.m_bodyB.SetAwake(true);
        this.m_motorSpeed = speed;
      }

      GetMotorSpeed() {
        return this.m_motorSpeed;
      }

      SetMaxMotorForce(force) {
        if (force === undefined) force = 0;
        this.m_bodyA.SetAwake(true);
        this.m_bodyB.SetAwake(true);
        this.m_maxMotorForce = force;
      }

      GetMotorForce() {
        return this.m_motorImpulse;
      }

      b2PrismaticJoint(def) {
        this.__super.b2Joint.call(this, def);
        let tMat;
        const tX = 0;
        const tY = 0;
        this.m_localAnchor1.SetV(def.localAnchorA);
        this.m_localAnchor2.SetV(def.localAnchorB);
        this.m_localXAxis1.SetV(def.localAxisA);
        this.m_localYAxis1.x = (-this.m_localXAxis1.y);
        this.m_localYAxis1.y = this.m_localXAxis1.x;
        this.m_refAngle = def.referenceAngle;
        this.m_impulse.SetZero();
        this.m_motorMass = 0.0;
        this.m_motorImpulse = 0.0;
        this.m_lowerTranslation = def.lowerTranslation;
        this.m_upperTranslation = def.upperTranslation;
        this.m_maxMotorForce = def.maxMotorForce;
        this.m_motorSpeed = def.motorSpeed;
        this.m_enableLimit = def.enableLimit;
        this.m_enableMotor = def.enableMotor;
        this.m_limitState = b2Joint.e_inactiveLimit;
        this.m_axis.SetZero();
        this.m_perp.SetZero();
      }

      InitVelocityConstraints(step) {
        const bA = this.m_bodyA;
        const bB = this.m_bodyB;
        let tMat;
        let tX = 0;
        this.m_localCenterA.SetV(bA.GetLocalCenter());
        this.m_localCenterB.SetV(bB.GetLocalCenter());
        const xf1 = bA.GetTransform();
        const xf2 = bB.GetTransform();
        tMat = bA.m_xf.R;
        let r1X = this.m_localAnchor1.x - this.m_localCenterA.x;
        let r1Y = this.m_localAnchor1.y - this.m_localCenterA.y;
        tX = (tMat.col1.x * r1X + tMat.col2.x * r1Y);
        r1Y = (tMat.col1.y * r1X + tMat.col2.y * r1Y);
        r1X = tX;
        tMat = bB.m_xf.R;
        let r2X = this.m_localAnchor2.x - this.m_localCenterB.x;
        let r2Y = this.m_localAnchor2.y - this.m_localCenterB.y;
        tX = (tMat.col1.x * r2X + tMat.col2.x * r2Y);
        r2Y = (tMat.col1.y * r2X + tMat.col2.y * r2Y);
        r2X = tX;
        const dX = bB.m_sweep.c.x + r2X - bA.m_sweep.c.x - r1X;
        const dY = bB.m_sweep.c.y + r2Y - bA.m_sweep.c.y - r1Y;
        this.m_invMassA = bA.m_invMass;
        this.m_invMassB = bB.m_invMass;
        this.m_invIA = bA.m_invI;
        this.m_invIB = bB.m_invI; {
          this.m_axis.SetV(b2Math.MulMV(xf1.R, this.m_localXAxis1));
          this.m_a1 = (dX + r1X) * this.m_axis.y - (dY + r1Y) * this.m_axis.x;
          this.m_a2 = r2X * this.m_axis.y - r2Y * this.m_axis.x;
          this.m_motorMass = this.m_invMassA + this.m_invMassB + this.m_invIA * this.m_a1 * this.m_a1 + this.m_invIB * this.m_a2 * this.m_a2;
          if (this.m_motorMass > Number.MIN_VALUE) this.m_motorMass = 1.0 / this.m_motorMass;
        } {
          this.m_perp.SetV(b2Math.MulMV(xf1.R, this.m_localYAxis1));
          this.m_s1 = (dX + r1X) * this.m_perp.y - (dY + r1Y) * this.m_perp.x;
          this.m_s2 = r2X * this.m_perp.y - r2Y * this.m_perp.x;
          const m1 = this.m_invMassA;
          const m2 = this.m_invMassB;
          const i1 = this.m_invIA;
          const i2 = this.m_invIB;
          this.m_K.col1.x = m1 + m2 + i1 * this.m_s1 * this.m_s1 + i2 * this.m_s2 * this.m_s2;
          this.m_K.col1.y = i1 * this.m_s1 + i2 * this.m_s2;
          this.m_K.col1.z = i1 * this.m_s1 * this.m_a1 + i2 * this.m_s2 * this.m_a2;
          this.m_K.col2.x = this.m_K.col1.y;
          this.m_K.col2.y = i1 + i2;
          this.m_K.col2.z = i1 * this.m_a1 + i2 * this.m_a2;
          this.m_K.col3.x = this.m_K.col1.z;
          this.m_K.col3.y = this.m_K.col2.z;
          this.m_K.col3.z = m1 + m2 + i1 * this.m_a1 * this.m_a1 + i2 * this.m_a2 * this.m_a2;
        }
        if (this.m_enableLimit) {
          const jointTransition = this.m_axis.x * dX + this.m_axis.y * dY;
          if (b2Math.Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2.0 * b2Settings.b2_linearSlop) {
            this.m_limitState = b2Joint.e_equalLimits;
          } else if (jointTransition <= this.m_lowerTranslation) {
            if (this.m_limitState != b2Joint.e_atLowerLimit) {
              this.m_limitState = b2Joint.e_atLowerLimit;
              this.m_impulse.z = 0.0;
            }
          } else if (jointTransition >= this.m_upperTranslation) {
            if (this.m_limitState != b2Joint.e_atUpperLimit) {
              this.m_limitState = b2Joint.e_atUpperLimit;
              this.m_impulse.z = 0.0;
            }
          } else {
            this.m_limitState = b2Joint.e_inactiveLimit;
            this.m_impulse.z = 0.0;
          }
        } else {
          this.m_limitState = b2Joint.e_inactiveLimit;
        }
        if (this.m_enableMotor == false) {
          this.m_motorImpulse = 0.0;
        }
        if (step.warmStarting) {
          this.m_impulse.x *= step.dtRatio;
          this.m_impulse.y *= step.dtRatio;
          this.m_motorImpulse *= step.dtRatio;
          const PX = this.m_impulse.x * this.m_perp.x + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.x;
          const PY = this.m_impulse.x * this.m_perp.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_axis.y;
          const L1 = this.m_impulse.x * this.m_s1 + this.m_impulse.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_a1;
          const L2 = this.m_impulse.x * this.m_s2 + this.m_impulse.y + (this.m_motorImpulse + this.m_impulse.z) * this.m_a2;
          bA.m_linearVelocity.x -= this.m_invMassA * PX;
          bA.m_linearVelocity.y -= this.m_invMassA * PY;
          bA.m_angularVelocity -= this.m_invIA * L1;
          bB.m_linearVelocity.x += this.m_invMassB * PX;
          bB.m_linearVelocity.y += this.m_invMassB * PY;
          bB.m_angularVelocity += this.m_invIB * L2;
        } else {
          this.m_impulse.SetZero();
          this.m_motorImpulse = 0.0;
        }
      }

      SolveVelocityConstraints(step) {
        const bA = this.m_bodyA;
        const bB = this.m_bodyB;
        const v1 = bA.m_linearVelocity;
        let w1 = bA.m_angularVelocity;
        const v2 = bB.m_linearVelocity;
        let w2 = bB.m_angularVelocity;
        let PX = 0;
        let PY = 0;
        let L1 = 0;
        let L2 = 0;
        if (this.m_enableMotor && this.m_limitState != b2Joint.e_equalLimits) {
          const Cdot = this.m_axis.x * (v2.x - v1.x) + this.m_axis.y * (v2.y - v1.y) + this.m_a2 * w2 - this.m_a1 * w1;
          let impulse = this.m_motorMass * (this.m_motorSpeed - Cdot);
          const oldImpulse = this.m_motorImpulse;
          const maxImpulse = step.dt * this.m_maxMotorForce;
          this.m_motorImpulse = b2Math.Clamp(this.m_motorImpulse + impulse, (-maxImpulse), maxImpulse);
          impulse = this.m_motorImpulse - oldImpulse;
          PX = impulse * this.m_axis.x;
          PY = impulse * this.m_axis.y;
          L1 = impulse * this.m_a1;
          L2 = impulse * this.m_a2;
          v1.x -= this.m_invMassA * PX;
          v1.y -= this.m_invMassA * PY;
          w1 -= this.m_invIA * L1;
          v2.x += this.m_invMassB * PX;
          v2.y += this.m_invMassB * PY;
          w2 += this.m_invIB * L2;
        }
        const Cdot1X = this.m_perp.x * (v2.x - v1.x) + this.m_perp.y * (v2.y - v1.y) + this.m_s2 * w2 - this.m_s1 * w1;
        const Cdot1Y = w2 - w1;
        if (this.m_enableLimit && this.m_limitState != b2Joint.e_inactiveLimit) {
          const Cdot2 = this.m_axis.x * (v2.x - v1.x) + this.m_axis.y * (v2.y - v1.y) + this.m_a2 * w2 - this.m_a1 * w1;
          const f1 = this.m_impulse.Copy();
          const df = this.m_K.Solve33(new b2Vec3(), (-Cdot1X), (-Cdot1Y), (-Cdot2));
          this.m_impulse.Add(df);
          if (this.m_limitState == b2Joint.e_atLowerLimit) {
            this.m_impulse.z = b2Math.Max(this.m_impulse.z, 0.0);
          } else if (this.m_limitState == b2Joint.e_atUpperLimit) {
            this.m_impulse.z = b2Math.Min(this.m_impulse.z, 0.0);
          }
          const bX = (-Cdot1X) - (this.m_impulse.z - f1.z) * this.m_K.col3.x;
          const bY = (-Cdot1Y) - (this.m_impulse.z - f1.z) * this.m_K.col3.y;
          const f2r = this.m_K.Solve22(new b2Vec2(), bX, bY);
          f2r.x += f1.x;
          f2r.y += f1.y;
          this.m_impulse.x = f2r.x;
          this.m_impulse.y = f2r.y;
          df.x = this.m_impulse.x - f1.x;
          df.y = this.m_impulse.y - f1.y;
          df.z = this.m_impulse.z - f1.z;
          PX = df.x * this.m_perp.x + df.z * this.m_axis.x;
          PY = df.x * this.m_perp.y + df.z * this.m_axis.y;
          L1 = df.x * this.m_s1 + df.y + df.z * this.m_a1;
          L2 = df.x * this.m_s2 + df.y + df.z * this.m_a2;
          v1.x -= this.m_invMassA * PX;
          v1.y -= this.m_invMassA * PY;
          w1 -= this.m_invIA * L1;
          v2.x += this.m_invMassB * PX;
          v2.y += this.m_invMassB * PY;
          w2 += this.m_invIB * L2;
        } else {
          const df2 = this.m_K.Solve22(new b2Vec2(), (-Cdot1X), (-Cdot1Y));
          this.m_impulse.x += df2.x;
          this.m_impulse.y += df2.y;
          PX = df2.x * this.m_perp.x;
          PY = df2.x * this.m_perp.y;
          L1 = df2.x * this.m_s1 + df2.y;
          L2 = df2.x * this.m_s2 + df2.y;
          v1.x -= this.m_invMassA * PX;
          v1.y -= this.m_invMassA * PY;
          w1 -= this.m_invIA * L1;
          v2.x += this.m_invMassB * PX;
          v2.y += this.m_invMassB * PY;
          w2 += this.m_invIB * L2;
        }
        bA.m_linearVelocity.SetV(v1);
        bA.m_angularVelocity = w1;
        bB.m_linearVelocity.SetV(v2);
        bB.m_angularVelocity = w2;
      }

      SolvePositionConstraints(baumgarte) {
        if (baumgarte === undefined) baumgarte = 0;
        const limitC = 0;
        const oldLimitImpulse = 0;
        const bA = this.m_bodyA;
        const bB = this.m_bodyB;
        const c1 = bA.m_sweep.c;
        let a1 = bA.m_sweep.a;
        const c2 = bB.m_sweep.c;
        let a2 = bB.m_sweep.a;
        let tMat;
        let tX = 0;
        let m1 = 0;
        let m2 = 0;
        let i1 = 0;
        let i2 = 0;
        let linearError = 0.0;
        let angularError = 0.0;
        let active = false;
        let C2 = 0.0;
        const R1 = b2Mat22.FromAngle(a1);
        const R2 = b2Mat22.FromAngle(a2);
        tMat = R1;
        let r1X = this.m_localAnchor1.x - this.m_localCenterA.x;
        let r1Y = this.m_localAnchor1.y - this.m_localCenterA.y;
        tX = (tMat.col1.x * r1X + tMat.col2.x * r1Y);
        r1Y = (tMat.col1.y * r1X + tMat.col2.y * r1Y);
        r1X = tX;
        tMat = R2;
        let r2X = this.m_localAnchor2.x - this.m_localCenterB.x;
        let r2Y = this.m_localAnchor2.y - this.m_localCenterB.y;
        tX = (tMat.col1.x * r2X + tMat.col2.x * r2Y);
        r2Y = (tMat.col1.y * r2X + tMat.col2.y * r2Y);
        r2X = tX;
        const dX = c2.x + r2X - c1.x - r1X;
        const dY = c2.y + r2Y - c1.y - r1Y;
        if (this.m_enableLimit) {
          this.m_axis = b2Math.MulMV(R1, this.m_localXAxis1);
          this.m_a1 = (dX + r1X) * this.m_axis.y - (dY + r1Y) * this.m_axis.x;
          this.m_a2 = r2X * this.m_axis.y - r2Y * this.m_axis.x;
          const translation = this.m_axis.x * dX + this.m_axis.y * dY;
          if (b2Math.Abs(this.m_upperTranslation - this.m_lowerTranslation) < 2.0 * b2Settings.b2_linearSlop) {
            C2 = b2Math.Clamp(translation, (-b2Settings.b2_maxLinearCorrection), b2Settings.b2_maxLinearCorrection);
            linearError = b2Math.Abs(translation);
            active = true;
          } else if (translation <= this.m_lowerTranslation) {
            C2 = b2Math.Clamp(translation - this.m_lowerTranslation + b2Settings.b2_linearSlop, (-b2Settings.b2_maxLinearCorrection), 0.0);
            linearError = this.m_lowerTranslation - translation;
            active = true;
          } else if (translation >= this.m_upperTranslation) {
            C2 = b2Math.Clamp(translation - this.m_upperTranslation + b2Settings.b2_linearSlop, 0.0, b2Settings.b2_maxLinearCorrection);
            linearError = translation - this.m_upperTranslation;
            active = true;
          }
        }
        this.m_perp = b2Math.MulMV(R1, this.m_localYAxis1);
        this.m_s1 = (dX + r1X) * this.m_perp.y - (dY + r1Y) * this.m_perp.x;
        this.m_s2 = r2X * this.m_perp.y - r2Y * this.m_perp.x;
        const impulse = new b2Vec3();
        const C1X = this.m_perp.x * dX + this.m_perp.y * dY;
        const C1Y = a2 - a1 - this.m_refAngle;
        linearError = b2Math.Max(linearError, b2Math.Abs(C1X));
        angularError = b2Math.Abs(C1Y);
        if (active) {
          m1 = this.m_invMassA;
          m2 = this.m_invMassB;
          i1 = this.m_invIA;
          i2 = this.m_invIB;
          this.m_K.col1.x = m1 + m2 + i1 * this.m_s1 * this.m_s1 + i2 * this.m_s2 * this.m_s2;
          this.m_K.col1.y = i1 * this.m_s1 + i2 * this.m_s2;
          this.m_K.col1.z = i1 * this.m_s1 * this.m_a1 + i2 * this.m_s2 * this.m_a2;
          this.m_K.col2.x = this.m_K.col1.y;
          this.m_K.col2.y = i1 + i2;
          this.m_K.col2.z = i1 * this.m_a1 + i2 * this.m_a2;
          this.m_K.col3.x = this.m_K.col1.z;
          this.m_K.col3.y = this.m_K.col2.z;
          this.m_K.col3.z = m1 + m2 + i1 * this.m_a1 * this.m_a1 + i2 * this.m_a2 * this.m_a2;
          this.m_K.Solve33(impulse, (-C1X), (-C1Y), (-C2));
        } else {
          m1 = this.m_invMassA;
          m2 = this.m_invMassB;
          i1 = this.m_invIA;
          i2 = this.m_invIB;
          const k11 = m1 + m2 + i1 * this.m_s1 * this.m_s1 + i2 * this.m_s2 * this.m_s2;
          const k12 = i1 * this.m_s1 + i2 * this.m_s2;
          const k22 = i1 + i2;
          this.m_K.col1.Set(k11, k12, 0.0);
          this.m_K.col2.Set(k12, k22, 0.0);
          const impulse1 = this.m_K.Solve22(new b2Vec2(), (-C1X), (-C1Y));
          impulse.x = impulse1.x;
          impulse.y = impulse1.y;
          impulse.z = 0.0;
        }
        const PX = impulse.x * this.m_perp.x + impulse.z * this.m_axis.x;
        const PY = impulse.x * this.m_perp.y + impulse.z * this.m_axis.y;
        const L1 = impulse.x * this.m_s1 + impulse.y + impulse.z * this.m_a1;
        const L2 = impulse.x * this.m_s2 + impulse.y + impulse.z * this.m_a2;
        c1.x -= this.m_invMassA * PX;
        c1.y -= this.m_invMassA * PY;
        a1 -= this.m_invIA * L1;
        c2.x += this.m_invMassB * PX;
        c2.y += this.m_invMassB * PY;
        a2 += this.m_invIB * L2;
        bA.m_sweep.a = a1;
        bB.m_sweep.a = a2;
        bA.SynchronizeTransform();
        bB.SynchronizeTransform();
        return linearError <= b2Settings.b2_linearSlop && angularError <= b2Settings.b2_angularSlop;
      }
    }

    Box2D.Dynamics.Joints.b2PrismaticJoint = b2PrismaticJoint;

    class b2PrismaticJointDef extends b2JointDef {
      constructor() {
        super(...arguments);
        b2PrismaticJointDef.b2PrismaticJointDef.apply(this, arguments);
        if (this.constructor === b2PrismaticJointDef) this.b2PrismaticJointDef.apply(this, arguments);
      }

      static b2PrismaticJointDef() {
        Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
        this.localAnchorA = new b2Vec2();
        this.localAnchorB = new b2Vec2();
        this.localAxisA = new b2Vec2();
      }

      b2PrismaticJointDef() {
        this.__super.b2JointDef.call(this);
        this.type = b2Joint.e_prismaticJoint;
        this.localAxisA.Set(1.0, 0.0);
        this.referenceAngle = 0.0;
        this.enableLimit = false;
        this.lowerTranslation = 0.0;
        this.upperTranslation = 0.0;
        this.enableMotor = false;
        this.maxMotorForce = 0.0;
        this.motorSpeed = 0.0;
      }

      Initialize(bA, bB, anchor, axis) {
        this.bodyA = bA;
        this.bodyB = bB;
        this.localAnchorA = this.bodyA.GetLocalPoint(anchor);
        this.localAnchorB = this.bodyB.GetLocalPoint(anchor);
        this.localAxisA = this.bodyA.GetLocalVector(axis);
        this.referenceAngle = this.bodyB.GetAngle() - this.bodyA.GetAngle();
      }
    }

    Box2D.Dynamics.Joints.b2PrismaticJointDef = b2PrismaticJointDef;

    class b2PulleyJoint extends b2Joint {
      constructor() {
        super(...arguments);
        b2PulleyJoint.b2PulleyJoint.apply(this, arguments);
        if (this.constructor === b2PulleyJoint) this.b2PulleyJoint.apply(this, arguments);
      }

      static b2PulleyJoint() {
        Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
        this.m_groundAnchor1 = new b2Vec2();
        this.m_groundAnchor2 = new b2Vec2();
        this.m_localAnchor1 = new b2Vec2();
        this.m_localAnchor2 = new b2Vec2();
        this.m_u1 = new b2Vec2();
        this.m_u2 = new b2Vec2();
      }

      GetAnchorA() {
        return this.m_bodyA.GetWorldPoint(this.m_localAnchor1);
      }

      GetAnchorB() {
        return this.m_bodyB.GetWorldPoint(this.m_localAnchor2);
      }

      GetReactionForce(inv_dt) {
        if (inv_dt === undefined) inv_dt = 0;
        return new b2Vec2(inv_dt * this.m_impulse * this.m_u2.x, inv_dt * this.m_impulse * this.m_u2.y);
      }

      GetReactionTorque(inv_dt) {
        if (inv_dt === undefined) inv_dt = 0;
        return 0.0;
      }

      GetGroundAnchorA() {
        const a = this.m_ground.m_xf.position.Copy();
        a.Add(this.m_groundAnchor1);
        return a;
      }

      GetGroundAnchorB() {
        const a = this.m_ground.m_xf.position.Copy();
        a.Add(this.m_groundAnchor2);
        return a;
      }

      GetLength1() {
        const p = this.m_bodyA.GetWorldPoint(this.m_localAnchor1);
        const sX = this.m_ground.m_xf.position.x + this.m_groundAnchor1.x;
        const sY = this.m_ground.m_xf.position.y + this.m_groundAnchor1.y;
        const dX = p.x - sX;
        const dY = p.y - sY;
        return Math.sqrt(dX * dX + dY * dY);
      }

      GetLength2() {
        const p = this.m_bodyB.GetWorldPoint(this.m_localAnchor2);
        const sX = this.m_ground.m_xf.position.x + this.m_groundAnchor2.x;
        const sY = this.m_ground.m_xf.position.y + this.m_groundAnchor2.y;
        const dX = p.x - sX;
        const dY = p.y - sY;
        return Math.sqrt(dX * dX + dY * dY);
      }

      GetRatio() {
        return this.m_ratio;
      }

      b2PulleyJoint(def) {
        this.__super.b2Joint.call(this, def);
        let tMat;
        const tX = 0;
        const tY = 0;
        this.m_ground = this.m_bodyA.m_world.m_groundBody;
        this.m_groundAnchor1.x = def.groundAnchorA.x - this.m_ground.m_xf.position.x;
        this.m_groundAnchor1.y = def.groundAnchorA.y - this.m_ground.m_xf.position.y;
        this.m_groundAnchor2.x = def.groundAnchorB.x - this.m_ground.m_xf.position.x;
        this.m_groundAnchor2.y = def.groundAnchorB.y - this.m_ground.m_xf.position.y;
        this.m_localAnchor1.SetV(def.localAnchorA);
        this.m_localAnchor2.SetV(def.localAnchorB);
        this.m_ratio = def.ratio;
        this.m_constant = def.lengthA + this.m_ratio * def.lengthB;
        this.m_maxLength1 = b2Math.Min(def.maxLengthA, this.m_constant - this.m_ratio * b2PulleyJoint.b2_minPulleyLength);
        this.m_maxLength2 = b2Math.Min(def.maxLengthB, (this.m_constant - b2PulleyJoint.b2_minPulleyLength) / this.m_ratio);
        this.m_impulse = 0.0;
        this.m_limitImpulse1 = 0.0;
        this.m_limitImpulse2 = 0.0;
      }

      InitVelocityConstraints(step) {
        const bA = this.m_bodyA;
        const bB = this.m_bodyB;
        let tMat;
        tMat = bA.m_xf.R;
        let r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
        let r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
        let tX = (tMat.col1.x * r1X + tMat.col2.x * r1Y);
        r1Y = (tMat.col1.y * r1X + tMat.col2.y * r1Y);
        r1X = tX;
        tMat = bB.m_xf.R;
        let r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
        let r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
        tX = (tMat.col1.x * r2X + tMat.col2.x * r2Y);
        r2Y = (tMat.col1.y * r2X + tMat.col2.y * r2Y);
        r2X = tX;
        const p1X = bA.m_sweep.c.x + r1X;
        const p1Y = bA.m_sweep.c.y + r1Y;
        const p2X = bB.m_sweep.c.x + r2X;
        const p2Y = bB.m_sweep.c.y + r2Y;
        const s1X = this.m_ground.m_xf.position.x + this.m_groundAnchor1.x;
        const s1Y = this.m_ground.m_xf.position.y + this.m_groundAnchor1.y;
        const s2X = this.m_ground.m_xf.position.x + this.m_groundAnchor2.x;
        const s2Y = this.m_ground.m_xf.position.y + this.m_groundAnchor2.y;
        this.m_u1.Set(p1X - s1X, p1Y - s1Y);
        this.m_u2.Set(p2X - s2X, p2Y - s2Y);
        const length1 = this.m_u1.Length();
        const length2 = this.m_u2.Length();
        if (length1 > b2Settings.b2_linearSlop) {
          this.m_u1.Multiply(1.0 / length1);
        } else {
          this.m_u1.SetZero();
        }
        if (length2 > b2Settings.b2_linearSlop) {
          this.m_u2.Multiply(1.0 / length2);
        } else {
          this.m_u2.SetZero();
        }
        const C = this.m_constant - length1 - this.m_ratio * length2;
        if (C > 0.0) {
          this.m_state = b2Joint.e_inactiveLimit;
          this.m_impulse = 0.0;
        } else {
          this.m_state = b2Joint.e_atUpperLimit;
        }
        if (length1 < this.m_maxLength1) {
          this.m_limitState1 = b2Joint.e_inactiveLimit;
          this.m_limitImpulse1 = 0.0;
        } else {
          this.m_limitState1 = b2Joint.e_atUpperLimit;
        }
        if (length2 < this.m_maxLength2) {
          this.m_limitState2 = b2Joint.e_inactiveLimit;
          this.m_limitImpulse2 = 0.0;
        } else {
          this.m_limitState2 = b2Joint.e_atUpperLimit;
        }
        const cr1u1 = r1X * this.m_u1.y - r1Y * this.m_u1.x;
        const cr2u2 = r2X * this.m_u2.y - r2Y * this.m_u2.x;
        this.m_limitMass1 = bA.m_invMass + bA.m_invI * cr1u1 * cr1u1;
        this.m_limitMass2 = bB.m_invMass + bB.m_invI * cr2u2 * cr2u2;
        this.m_pulleyMass = this.m_limitMass1 + this.m_ratio * this.m_ratio * this.m_limitMass2;
        this.m_limitMass1 = 1.0 / this.m_limitMass1;
        this.m_limitMass2 = 1.0 / this.m_limitMass2;
        this.m_pulleyMass = 1.0 / this.m_pulleyMass;
        if (step.warmStarting) {
          this.m_impulse *= step.dtRatio;
          this.m_limitImpulse1 *= step.dtRatio;
          this.m_limitImpulse2 *= step.dtRatio;
          const P1X = ((-this.m_impulse) - this.m_limitImpulse1) * this.m_u1.x;
          const P1Y = ((-this.m_impulse) - this.m_limitImpulse1) * this.m_u1.y;
          const P2X = ((-this.m_ratio * this.m_impulse) - this.m_limitImpulse2) * this.m_u2.x;
          const P2Y = ((-this.m_ratio * this.m_impulse) - this.m_limitImpulse2) * this.m_u2.y;
          bA.m_linearVelocity.x += bA.m_invMass * P1X;
          bA.m_linearVelocity.y += bA.m_invMass * P1Y;
          bA.m_angularVelocity += bA.m_invI * (r1X * P1Y - r1Y * P1X);
          bB.m_linearVelocity.x += bB.m_invMass * P2X;
          bB.m_linearVelocity.y += bB.m_invMass * P2Y;
          bB.m_angularVelocity += bB.m_invI * (r2X * P2Y - r2Y * P2X);
        } else {
          this.m_impulse = 0.0;
          this.m_limitImpulse1 = 0.0;
          this.m_limitImpulse2 = 0.0;
        }
      }

      SolveVelocityConstraints(step) {
        const bA = this.m_bodyA;
        const bB = this.m_bodyB;
        let tMat;
        tMat = bA.m_xf.R;
        let r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
        let r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
        let tX = (tMat.col1.x * r1X + tMat.col2.x * r1Y);
        r1Y = (tMat.col1.y * r1X + tMat.col2.y * r1Y);
        r1X = tX;
        tMat = bB.m_xf.R;
        let r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
        let r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
        tX = (tMat.col1.x * r2X + tMat.col2.x * r2Y);
        r2Y = (tMat.col1.y * r2X + tMat.col2.y * r2Y);
        r2X = tX;
        let v1X = 0;
        let v1Y = 0;
        let v2X = 0;
        let v2Y = 0;
        let P1X = 0;
        let P1Y = 0;
        let P2X = 0;
        let P2Y = 0;
        let Cdot = 0;
        let impulse = 0;
        let oldImpulse = 0;
        if (this.m_state == b2Joint.e_atUpperLimit) {
          v1X = bA.m_linearVelocity.x + ((-bA.m_angularVelocity * r1Y));
          v1Y = bA.m_linearVelocity.y + (bA.m_angularVelocity * r1X);
          v2X = bB.m_linearVelocity.x + ((-bB.m_angularVelocity * r2Y));
          v2Y = bB.m_linearVelocity.y + (bB.m_angularVelocity * r2X);
          Cdot = (-(this.m_u1.x * v1X + this.m_u1.y * v1Y)) - this.m_ratio * (this.m_u2.x * v2X + this.m_u2.y * v2Y);
          impulse = this.m_pulleyMass * ((-Cdot));
          oldImpulse = this.m_impulse;
          this.m_impulse = b2Math.Max(0.0, this.m_impulse + impulse);
          impulse = this.m_impulse - oldImpulse;
          P1X = (-impulse * this.m_u1.x);
          P1Y = (-impulse * this.m_u1.y);
          P2X = (-this.m_ratio * impulse * this.m_u2.x);
          P2Y = (-this.m_ratio * impulse * this.m_u2.y);
          bA.m_linearVelocity.x += bA.m_invMass * P1X;
          bA.m_linearVelocity.y += bA.m_invMass * P1Y;
          bA.m_angularVelocity += bA.m_invI * (r1X * P1Y - r1Y * P1X);
          bB.m_linearVelocity.x += bB.m_invMass * P2X;
          bB.m_linearVelocity.y += bB.m_invMass * P2Y;
          bB.m_angularVelocity += bB.m_invI * (r2X * P2Y - r2Y * P2X);
        }
        if (this.m_limitState1 == b2Joint.e_atUpperLimit) {
          v1X = bA.m_linearVelocity.x + ((-bA.m_angularVelocity * r1Y));
          v1Y = bA.m_linearVelocity.y + (bA.m_angularVelocity * r1X);
          Cdot = (-(this.m_u1.x * v1X + this.m_u1.y * v1Y));
          impulse = (-this.m_limitMass1 * Cdot);
          oldImpulse = this.m_limitImpulse1;
          this.m_limitImpulse1 = b2Math.Max(0.0, this.m_limitImpulse1 + impulse);
          impulse = this.m_limitImpulse1 - oldImpulse;
          P1X = (-impulse * this.m_u1.x);
          P1Y = (-impulse * this.m_u1.y);
          bA.m_linearVelocity.x += bA.m_invMass * P1X;
          bA.m_linearVelocity.y += bA.m_invMass * P1Y;
          bA.m_angularVelocity += bA.m_invI * (r1X * P1Y - r1Y * P1X);
        }
        if (this.m_limitState2 == b2Joint.e_atUpperLimit) {
          v2X = bB.m_linearVelocity.x + ((-bB.m_angularVelocity * r2Y));
          v2Y = bB.m_linearVelocity.y + (bB.m_angularVelocity * r2X);
          Cdot = (-(this.m_u2.x * v2X + this.m_u2.y * v2Y));
          impulse = (-this.m_limitMass2 * Cdot);
          oldImpulse = this.m_limitImpulse2;
          this.m_limitImpulse2 = b2Math.Max(0.0, this.m_limitImpulse2 + impulse);
          impulse = this.m_limitImpulse2 - oldImpulse;
          P2X = (-impulse * this.m_u2.x);
          P2Y = (-impulse * this.m_u2.y);
          bB.m_linearVelocity.x += bB.m_invMass * P2X;
          bB.m_linearVelocity.y += bB.m_invMass * P2Y;
          bB.m_angularVelocity += bB.m_invI * (r2X * P2Y - r2Y * P2X);
        }
      }

      SolvePositionConstraints(baumgarte) {
        if (baumgarte === undefined) baumgarte = 0;
        const bA = this.m_bodyA;
        const bB = this.m_bodyB;
        let tMat;
        const s1X = this.m_ground.m_xf.position.x + this.m_groundAnchor1.x;
        const s1Y = this.m_ground.m_xf.position.y + this.m_groundAnchor1.y;
        const s2X = this.m_ground.m_xf.position.x + this.m_groundAnchor2.x;
        const s2Y = this.m_ground.m_xf.position.y + this.m_groundAnchor2.y;
        let r1X = 0;
        let r1Y = 0;
        let r2X = 0;
        let r2Y = 0;
        let p1X = 0;
        let p1Y = 0;
        let p2X = 0;
        let p2Y = 0;
        let length1 = 0;
        let length2 = 0;
        let C = 0;
        let impulse = 0;
        const oldImpulse = 0;
        const oldLimitPositionImpulse = 0;
        let tX = 0;
        let linearError = 0.0;
        if (this.m_state == b2Joint.e_atUpperLimit) {
          tMat = bA.m_xf.R;
          r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
          r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
          tX = (tMat.col1.x * r1X + tMat.col2.x * r1Y);
          r1Y = (tMat.col1.y * r1X + tMat.col2.y * r1Y);
          r1X = tX;
          tMat = bB.m_xf.R;
          r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
          r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
          tX = (tMat.col1.x * r2X + tMat.col2.x * r2Y);
          r2Y = (tMat.col1.y * r2X + tMat.col2.y * r2Y);
          r2X = tX;
          p1X = bA.m_sweep.c.x + r1X;
          p1Y = bA.m_sweep.c.y + r1Y;
          p2X = bB.m_sweep.c.x + r2X;
          p2Y = bB.m_sweep.c.y + r2Y;
          this.m_u1.Set(p1X - s1X, p1Y - s1Y);
          this.m_u2.Set(p2X - s2X, p2Y - s2Y);
          length1 = this.m_u1.Length();
          length2 = this.m_u2.Length();
          if (length1 > b2Settings.b2_linearSlop) {
            this.m_u1.Multiply(1.0 / length1);
          } else {
            this.m_u1.SetZero();
          }
          if (length2 > b2Settings.b2_linearSlop) {
            this.m_u2.Multiply(1.0 / length2);
          } else {
            this.m_u2.SetZero();
          }
          C = this.m_constant - length1 - this.m_ratio * length2;
          linearError = b2Math.Max(linearError, (-C));
          C = b2Math.Clamp(C + b2Settings.b2_linearSlop, (-b2Settings.b2_maxLinearCorrection), 0.0);
          impulse = (-this.m_pulleyMass * C);
          p1X = (-impulse * this.m_u1.x);
          p1Y = (-impulse * this.m_u1.y);
          p2X = (-this.m_ratio * impulse * this.m_u2.x);
          p2Y = (-this.m_ratio * impulse * this.m_u2.y);
          bA.m_sweep.c.x += bA.m_invMass * p1X;
          bA.m_sweep.c.y += bA.m_invMass * p1Y;
          bA.m_sweep.a += bA.m_invI * (r1X * p1Y - r1Y * p1X);
          bB.m_sweep.c.x += bB.m_invMass * p2X;
          bB.m_sweep.c.y += bB.m_invMass * p2Y;
          bB.m_sweep.a += bB.m_invI * (r2X * p2Y - r2Y * p2X);
          bA.SynchronizeTransform();
          bB.SynchronizeTransform();
        }
        if (this.m_limitState1 == b2Joint.e_atUpperLimit) {
          tMat = bA.m_xf.R;
          r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
          r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
          tX = (tMat.col1.x * r1X + tMat.col2.x * r1Y);
          r1Y = (tMat.col1.y * r1X + tMat.col2.y * r1Y);
          r1X = tX;
          p1X = bA.m_sweep.c.x + r1X;
          p1Y = bA.m_sweep.c.y + r1Y;
          this.m_u1.Set(p1X - s1X, p1Y - s1Y);
          length1 = this.m_u1.Length();
          if (length1 > b2Settings.b2_linearSlop) {
            this.m_u1.x *= 1.0 / length1;
            this.m_u1.y *= 1.0 / length1;
          } else {
            this.m_u1.SetZero();
          }
          C = this.m_maxLength1 - length1;
          linearError = b2Math.Max(linearError, (-C));
          C = b2Math.Clamp(C + b2Settings.b2_linearSlop, (-b2Settings.b2_maxLinearCorrection), 0.0);
          impulse = (-this.m_limitMass1 * C);
          p1X = (-impulse * this.m_u1.x);
          p1Y = (-impulse * this.m_u1.y);
          bA.m_sweep.c.x += bA.m_invMass * p1X;
          bA.m_sweep.c.y += bA.m_invMass * p1Y;
          bA.m_sweep.a += bA.m_invI * (r1X * p1Y - r1Y * p1X);
          bA.SynchronizeTransform();
        }
        if (this.m_limitState2 == b2Joint.e_atUpperLimit) {
          tMat = bB.m_xf.R;
          r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
          r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
          tX = (tMat.col1.x * r2X + tMat.col2.x * r2Y);
          r2Y = (tMat.col1.y * r2X + tMat.col2.y * r2Y);
          r2X = tX;
          p2X = bB.m_sweep.c.x + r2X;
          p2Y = bB.m_sweep.c.y + r2Y;
          this.m_u2.Set(p2X - s2X, p2Y - s2Y);
          length2 = this.m_u2.Length();
          if (length2 > b2Settings.b2_linearSlop) {
            this.m_u2.x *= 1.0 / length2;
            this.m_u2.y *= 1.0 / length2;
          } else {
            this.m_u2.SetZero();
          }
          C = this.m_maxLength2 - length2;
          linearError = b2Math.Max(linearError, (-C));
          C = b2Math.Clamp(C + b2Settings.b2_linearSlop, (-b2Settings.b2_maxLinearCorrection), 0.0);
          impulse = (-this.m_limitMass2 * C);
          p2X = (-impulse * this.m_u2.x);
          p2Y = (-impulse * this.m_u2.y);
          bB.m_sweep.c.x += bB.m_invMass * p2X;
          bB.m_sweep.c.y += bB.m_invMass * p2Y;
          bB.m_sweep.a += bB.m_invI * (r2X * p2Y - r2Y * p2X);
          bB.SynchronizeTransform();
        }
        return linearError < b2Settings.b2_linearSlop;
      }
    }

    Box2D.Dynamics.Joints.b2PulleyJoint = b2PulleyJoint;

    class b2PulleyJointDef extends b2JointDef {
      constructor() {
        super(...arguments);
        b2PulleyJointDef.b2PulleyJointDef.apply(this, arguments);
        if (this.constructor === b2PulleyJointDef) this.b2PulleyJointDef.apply(this, arguments);
      }

      static b2PulleyJointDef() {
        Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
        this.groundAnchorA = new b2Vec2();
        this.groundAnchorB = new b2Vec2();
        this.localAnchorA = new b2Vec2();
        this.localAnchorB = new b2Vec2();
      }

      b2PulleyJointDef() {
        this.__super.b2JointDef.call(this);
        this.type = b2Joint.e_pulleyJoint;
        this.groundAnchorA.Set((-1.0), 1.0);
        this.groundAnchorB.Set(1.0, 1.0);
        this.localAnchorA.Set((-1.0), 0.0);
        this.localAnchorB.Set(1.0, 0.0);
        this.lengthA = 0.0;
        this.maxLengthA = 0.0;
        this.lengthB = 0.0;
        this.maxLengthB = 0.0;
        this.ratio = 1.0;
        this.collideConnected = true;
      }

      Initialize(bA, bB, gaA, gaB, anchorA, anchorB, r) {
        if (r === undefined) r = 0;
        this.bodyA = bA;
        this.bodyB = bB;
        this.groundAnchorA.SetV(gaA);
        this.groundAnchorB.SetV(gaB);
        this.localAnchorA = this.bodyA.GetLocalPoint(anchorA);
        this.localAnchorB = this.bodyB.GetLocalPoint(anchorB);
        const d1X = anchorA.x - gaA.x;
        const d1Y = anchorA.y - gaA.y;
        this.lengthA = Math.sqrt(d1X * d1X + d1Y * d1Y);
        const d2X = anchorB.x - gaB.x;
        const d2Y = anchorB.y - gaB.y;
        this.lengthB = Math.sqrt(d2X * d2X + d2Y * d2Y);
        this.ratio = r;
        const C = this.lengthA + this.ratio * this.lengthB;
        this.maxLengthA = C - this.ratio * b2PulleyJoint.b2_minPulleyLength;
        this.maxLengthB = (C - b2PulleyJoint.b2_minPulleyLength) / this.ratio;
      }
    }

    Box2D.Dynamics.Joints.b2PulleyJointDef = b2PulleyJointDef;

    class b2RevoluteJoint extends b2Joint {
      constructor() {
        super(...arguments);
        b2RevoluteJoint.b2RevoluteJoint.apply(this, arguments);
        if (this.constructor === b2RevoluteJoint) this.b2RevoluteJoint.apply(this, arguments);
      }

      static b2RevoluteJoint() {
        Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
        this.K = new b2Mat22();
        this.K1 = new b2Mat22();
        this.K2 = new b2Mat22();
        this.K3 = new b2Mat22();
        this.impulse3 = new b2Vec3();
        this.impulse2 = new b2Vec2();
        this.reduced = new b2Vec2();
        this.m_localAnchor1 = new b2Vec2();
        this.m_localAnchor2 = new b2Vec2();
        this.m_impulse = new b2Vec3();
        this.m_mass = new b2Mat33();
      }

      GetAnchorA() {
        return this.m_bodyA.GetWorldPoint(this.m_localAnchor1);
      }

      GetAnchorB() {
        return this.m_bodyB.GetWorldPoint(this.m_localAnchor2);
      }

      GetReactionForce(inv_dt) {
        if (inv_dt === undefined) inv_dt = 0;
        return new b2Vec2(inv_dt * this.m_impulse.x, inv_dt * this.m_impulse.y);
      }

      GetReactionTorque(inv_dt) {
        if (inv_dt === undefined) inv_dt = 0;
        return inv_dt * this.m_impulse.z;
      }

      GetJointAngle() {
        return this.m_bodyB.m_sweep.a - this.m_bodyA.m_sweep.a - this.m_referenceAngle;
      }

      GetJointSpeed() {
        return this.m_bodyB.m_angularVelocity - this.m_bodyA.m_angularVelocity;
      }

      IsLimitEnabled() {
        return this.m_enableLimit;
      }

      EnableLimit(flag) {
        this.m_enableLimit = flag;
      }

      GetLowerLimit() {
        return this.m_lowerAngle;
      }

      GetUpperLimit() {
        return this.m_upperAngle;
      }

      SetLimits(lower, upper) {
        if (lower === undefined) lower = 0;
        if (upper === undefined) upper = 0;
        this.m_lowerAngle = lower;
        this.m_upperAngle = upper;
      }

      IsMotorEnabled() {
        this.m_bodyA.SetAwake(true);
        this.m_bodyB.SetAwake(true);
        return this.m_enableMotor;
      }

      EnableMotor(flag) {
        this.m_enableMotor = flag;
      }

      SetMotorSpeed(speed) {
        if (speed === undefined) speed = 0;
        this.m_bodyA.SetAwake(true);
        this.m_bodyB.SetAwake(true);
        this.m_motorSpeed = speed;
      }

      GetMotorSpeed() {
        return this.m_motorSpeed;
      }

      SetMaxMotorTorque(torque) {
        if (torque === undefined) torque = 0;
        this.m_maxMotorTorque = torque;
      }

      GetMotorTorque() {
        return this.m_maxMotorTorque;
      }

      b2RevoluteJoint(def) {
        this.__super.b2Joint.call(this, def);
        this.m_localAnchor1.SetV(def.localAnchorA);
        this.m_localAnchor2.SetV(def.localAnchorB);
        this.m_referenceAngle = def.referenceAngle;
        this.m_impulse.SetZero();
        this.m_motorImpulse = 0.0;
        this.m_lowerAngle = def.lowerAngle;
        this.m_upperAngle = def.upperAngle;
        this.m_maxMotorTorque = def.maxMotorTorque;
        this.m_motorSpeed = def.motorSpeed;
        this.m_enableLimit = def.enableLimit;
        this.m_enableMotor = def.enableMotor;
        this.m_limitState = b2Joint.e_inactiveLimit;
      }

      InitVelocityConstraints(step) {
        const bA = this.m_bodyA;
        const bB = this.m_bodyB;
        let tMat;
        let tX = 0;
        if (this.m_enableMotor || this.m_enableLimit) { }
        tMat = bA.m_xf.R;
        let r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
        let r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
        tX = (tMat.col1.x * r1X + tMat.col2.x * r1Y);
        r1Y = (tMat.col1.y * r1X + tMat.col2.y * r1Y);
        r1X = tX;
        tMat = bB.m_xf.R;
        let r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
        let r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
        tX = (tMat.col1.x * r2X + tMat.col2.x * r2Y);
        r2Y = (tMat.col1.y * r2X + tMat.col2.y * r2Y);
        r2X = tX;
        const m1 = bA.m_invMass;
        const m2 = bB.m_invMass;
        const i1 = bA.m_invI;
        const i2 = bB.m_invI;
        this.m_mass.col1.x = m1 + m2 + r1Y * r1Y * i1 + r2Y * r2Y * i2;
        this.m_mass.col2.x = (-r1Y * r1X * i1) - r2Y * r2X * i2;
        this.m_mass.col3.x = (-r1Y * i1) - r2Y * i2;
        this.m_mass.col1.y = this.m_mass.col2.x;
        this.m_mass.col2.y = m1 + m2 + r1X * r1X * i1 + r2X * r2X * i2;
        this.m_mass.col3.y = r1X * i1 + r2X * i2;
        this.m_mass.col1.z = this.m_mass.col3.x;
        this.m_mass.col2.z = this.m_mass.col3.y;
        this.m_mass.col3.z = i1 + i2;
        this.m_motorMass = 1.0 / (i1 + i2);
        if (this.m_enableMotor == false) {
          this.m_motorImpulse = 0.0;
        }
        if (this.m_enableLimit) {
          const jointAngle = bB.m_sweep.a - bA.m_sweep.a - this.m_referenceAngle;
          if (b2Math.Abs(this.m_upperAngle - this.m_lowerAngle) < 2.0 * b2Settings.b2_angularSlop) {
            this.m_limitState = b2Joint.e_equalLimits;
          } else if (jointAngle <= this.m_lowerAngle) {
            if (this.m_limitState != b2Joint.e_atLowerLimit) {
              this.m_impulse.z = 0.0;
            }
            this.m_limitState = b2Joint.e_atLowerLimit;
          } else if (jointAngle >= this.m_upperAngle) {
            if (this.m_limitState != b2Joint.e_atUpperLimit) {
              this.m_impulse.z = 0.0;
            }
            this.m_limitState = b2Joint.e_atUpperLimit;
          } else {
            this.m_limitState = b2Joint.e_inactiveLimit;
            this.m_impulse.z = 0.0;
          }
        } else {
          this.m_limitState = b2Joint.e_inactiveLimit;
        }
        if (step.warmStarting) {
          this.m_impulse.x *= step.dtRatio;
          this.m_impulse.y *= step.dtRatio;
          this.m_motorImpulse *= step.dtRatio;
          const PX = this.m_impulse.x;
          const PY = this.m_impulse.y;
          bA.m_linearVelocity.x -= m1 * PX;
          bA.m_linearVelocity.y -= m1 * PY;
          bA.m_angularVelocity -= i1 * ((r1X * PY - r1Y * PX) + this.m_motorImpulse + this.m_impulse.z);
          bB.m_linearVelocity.x += m2 * PX;
          bB.m_linearVelocity.y += m2 * PY;
          bB.m_angularVelocity += i2 * ((r2X * PY - r2Y * PX) + this.m_motorImpulse + this.m_impulse.z);
        } else {
          this.m_impulse.SetZero();
          this.m_motorImpulse = 0.0;
        }
      }

      SolveVelocityConstraints(step) {
        const bA = this.m_bodyA;
        const bB = this.m_bodyB;
        let tMat;
        let tX = 0;
        let newImpulse = 0;
        let r1X = 0;
        let r1Y = 0;
        let r2X = 0;
        let r2Y = 0;
        const v1 = bA.m_linearVelocity;
        let w1 = bA.m_angularVelocity;
        const v2 = bB.m_linearVelocity;
        let w2 = bB.m_angularVelocity;
        const m1 = bA.m_invMass;
        const m2 = bB.m_invMass;
        const i1 = bA.m_invI;
        const i2 = bB.m_invI;
        if (this.m_enableMotor && this.m_limitState != b2Joint.e_equalLimits) {
          const Cdot = w2 - w1 - this.m_motorSpeed;
          let impulse = this.m_motorMass * ((-Cdot));
          const oldImpulse = this.m_motorImpulse;
          const maxImpulse = step.dt * this.m_maxMotorTorque;
          this.m_motorImpulse = b2Math.Clamp(this.m_motorImpulse + impulse, (-maxImpulse), maxImpulse);
          impulse = this.m_motorImpulse - oldImpulse;
          w1 -= i1 * impulse;
          w2 += i2 * impulse;
        }
        if (this.m_enableLimit && this.m_limitState != b2Joint.e_inactiveLimit) {
          tMat = bA.m_xf.R;
          r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
          r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
          tX = (tMat.col1.x * r1X + tMat.col2.x * r1Y);
          r1Y = (tMat.col1.y * r1X + tMat.col2.y * r1Y);
          r1X = tX;
          tMat = bB.m_xf.R;
          r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
          r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
          tX = (tMat.col1.x * r2X + tMat.col2.x * r2Y);
          r2Y = (tMat.col1.y * r2X + tMat.col2.y * r2Y);
          r2X = tX;
          const Cdot1X = v2.x + ((-w2 * r2Y)) - v1.x - ((-w1 * r1Y));
          const Cdot1Y = v2.y + (w2 * r2X) - v1.y - (w1 * r1X);
          const Cdot2 = w2 - w1;
          this.m_mass.Solve33(this.impulse3, (-Cdot1X), (-Cdot1Y), (-Cdot2));
          if (this.m_limitState == b2Joint.e_equalLimits) {
            this.m_impulse.Add(this.impulse3);
          } else if (this.m_limitState == b2Joint.e_atLowerLimit) {
            newImpulse = this.m_impulse.z + this.impulse3.z;
            if (newImpulse < 0.0) {
              this.m_mass.Solve22(this.reduced, (-Cdot1X), (-Cdot1Y));
              this.impulse3.x = this.reduced.x;
              this.impulse3.y = this.reduced.y;
              this.impulse3.z = (-this.m_impulse.z);
              this.m_impulse.x += this.reduced.x;
              this.m_impulse.y += this.reduced.y;
              this.m_impulse.z = 0.0;
            }
          } else if (this.m_limitState == b2Joint.e_atUpperLimit) {
            newImpulse = this.m_impulse.z + this.impulse3.z;
            if (newImpulse > 0.0) {
              this.m_mass.Solve22(this.reduced, (-Cdot1X), (-Cdot1Y));
              this.impulse3.x = this.reduced.x;
              this.impulse3.y = this.reduced.y;
              this.impulse3.z = (-this.m_impulse.z);
              this.m_impulse.x += this.reduced.x;
              this.m_impulse.y += this.reduced.y;
              this.m_impulse.z = 0.0;
            }
          }
          v1.x -= m1 * this.impulse3.x;
          v1.y -= m1 * this.impulse3.y;
          w1 -= i1 * (r1X * this.impulse3.y - r1Y * this.impulse3.x + this.impulse3.z);
          v2.x += m2 * this.impulse3.x;
          v2.y += m2 * this.impulse3.y;
          w2 += i2 * (r2X * this.impulse3.y - r2Y * this.impulse3.x + this.impulse3.z);
        } else {
          tMat = bA.m_xf.R;
          r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
          r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
          tX = (tMat.col1.x * r1X + tMat.col2.x * r1Y);
          r1Y = (tMat.col1.y * r1X + tMat.col2.y * r1Y);
          r1X = tX;
          tMat = bB.m_xf.R;
          r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
          r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
          tX = (tMat.col1.x * r2X + tMat.col2.x * r2Y);
          r2Y = (tMat.col1.y * r2X + tMat.col2.y * r2Y);
          r2X = tX;
          const CdotX = v2.x + ((-w2 * r2Y)) - v1.x - ((-w1 * r1Y));
          const CdotY = v2.y + (w2 * r2X) - v1.y - (w1 * r1X);
          this.m_mass.Solve22(this.impulse2, (-CdotX), (-CdotY));
          this.m_impulse.x += this.impulse2.x;
          this.m_impulse.y += this.impulse2.y;
          v1.x -= m1 * this.impulse2.x;
          v1.y -= m1 * this.impulse2.y;
          w1 -= i1 * (r1X * this.impulse2.y - r1Y * this.impulse2.x);
          v2.x += m2 * this.impulse2.x;
          v2.y += m2 * this.impulse2.y;
          w2 += i2 * (r2X * this.impulse2.y - r2Y * this.impulse2.x);
        }
        bA.m_linearVelocity.SetV(v1);
        bA.m_angularVelocity = w1;
        bB.m_linearVelocity.SetV(v2);
        bB.m_angularVelocity = w2;
      }

      SolvePositionConstraints(baumgarte) {
        if (baumgarte === undefined) baumgarte = 0;
        const oldLimitImpulse = 0;
        let C = 0;
        let tMat;
        const bA = this.m_bodyA;
        const bB = this.m_bodyB;
        let angularError = 0.0;
        let positionError = 0.0;
        let tX = 0;
        let impulseX = 0;
        let impulseY = 0;
        if (this.m_enableLimit && this.m_limitState != b2Joint.e_inactiveLimit) {
          const angle = bB.m_sweep.a - bA.m_sweep.a - this.m_referenceAngle;
          let limitImpulse = 0.0;
          if (this.m_limitState == b2Joint.e_equalLimits) {
            C = b2Math.Clamp(angle - this.m_lowerAngle, (-b2Settings.b2_maxAngularCorrection), b2Settings.b2_maxAngularCorrection);
            limitImpulse = (-this.m_motorMass * C);
            angularError = b2Math.Abs(C);
          } else if (this.m_limitState == b2Joint.e_atLowerLimit) {
            C = angle - this.m_lowerAngle;
            angularError = (-C);
            C = b2Math.Clamp(C + b2Settings.b2_angularSlop, (-b2Settings.b2_maxAngularCorrection), 0.0);
            limitImpulse = (-this.m_motorMass * C);
          } else if (this.m_limitState == b2Joint.e_atUpperLimit) {
            C = angle - this.m_upperAngle;
            angularError = C;
            C = b2Math.Clamp(C - b2Settings.b2_angularSlop, 0.0, b2Settings.b2_maxAngularCorrection);
            limitImpulse = (-this.m_motorMass * C);
          }
          bA.m_sweep.a -= bA.m_invI * limitImpulse;
          bB.m_sweep.a += bB.m_invI * limitImpulse;
          bA.SynchronizeTransform();
          bB.SynchronizeTransform();
        } {
          tMat = bA.m_xf.R;
          let r1X = this.m_localAnchor1.x - bA.m_sweep.localCenter.x;
          let r1Y = this.m_localAnchor1.y - bA.m_sweep.localCenter.y;
          tX = (tMat.col1.x * r1X + tMat.col2.x * r1Y);
          r1Y = (tMat.col1.y * r1X + tMat.col2.y * r1Y);
          r1X = tX;
          tMat = bB.m_xf.R;
          let r2X = this.m_localAnchor2.x - bB.m_sweep.localCenter.x;
          let r2Y = this.m_localAnchor2.y - bB.m_sweep.localCenter.y;
          tX = (tMat.col1.x * r2X + tMat.col2.x * r2Y);
          r2Y = (tMat.col1.y * r2X + tMat.col2.y * r2Y);
          r2X = tX;
          let CX = bB.m_sweep.c.x + r2X - bA.m_sweep.c.x - r1X;
          let CY = bB.m_sweep.c.y + r2Y - bA.m_sweep.c.y - r1Y;
          const CLengthSquared = CX * CX + CY * CY;
          const CLength = Math.sqrt(CLengthSquared);
          positionError = CLength;
          const invMass1 = bA.m_invMass;
          const invMass2 = bB.m_invMass;
          const invI1 = bA.m_invI;
          const invI2 = bB.m_invI;
          const k_allowedStretch = 10.0 * b2Settings.b2_linearSlop;
          if (CLengthSquared > k_allowedStretch * k_allowedStretch) {
            const uX = CX / CLength;
            const uY = CY / CLength;
            const k = invMass1 + invMass2;
            const m = 1.0 / k;
            impulseX = m * ((-CX));
            impulseY = m * ((-CY));
            const k_beta = 0.5;
            bA.m_sweep.c.x -= k_beta * invMass1 * impulseX;
            bA.m_sweep.c.y -= k_beta * invMass1 * impulseY;
            bB.m_sweep.c.x += k_beta * invMass2 * impulseX;
            bB.m_sweep.c.y += k_beta * invMass2 * impulseY;
            CX = bB.m_sweep.c.x + r2X - bA.m_sweep.c.x - r1X;
            CY = bB.m_sweep.c.y + r2Y - bA.m_sweep.c.y - r1Y;
          }
          this.K1.col1.x = invMass1 + invMass2;
          this.K1.col2.x = 0.0;
          this.K1.col1.y = 0.0;
          this.K1.col2.y = invMass1 + invMass2;
          this.K2.col1.x = invI1 * r1Y * r1Y;
          this.K2.col2.x = (-invI1 * r1X * r1Y);
          this.K2.col1.y = (-invI1 * r1X * r1Y);
          this.K2.col2.y = invI1 * r1X * r1X;
          this.K3.col1.x = invI2 * r2Y * r2Y;
          this.K3.col2.x = (-invI2 * r2X * r2Y);
          this.K3.col1.y = (-invI2 * r2X * r2Y);
          this.K3.col2.y = invI2 * r2X * r2X;
          this.K.SetM(this.K1);
          this.K.AddM(this.K2);
          this.K.AddM(this.K3);
          this.K.Solve(b2RevoluteJoint.tImpulse, (-CX), (-CY));
          impulseX = b2RevoluteJoint.tImpulse.x;
          impulseY = b2RevoluteJoint.tImpulse.y;
          bA.m_sweep.c.x -= bA.m_invMass * impulseX;
          bA.m_sweep.c.y -= bA.m_invMass * impulseY;
          bA.m_sweep.a -= bA.m_invI * (r1X * impulseY - r1Y * impulseX);
          bB.m_sweep.c.x += bB.m_invMass * impulseX;
          bB.m_sweep.c.y += bB.m_invMass * impulseY;
          bB.m_sweep.a += bB.m_invI * (r2X * impulseY - r2Y * impulseX);
          bA.SynchronizeTransform();
          bB.SynchronizeTransform();
        }
        return positionError <= b2Settings.b2_linearSlop && angularError <= b2Settings.b2_angularSlop;
      }
    }

    Box2D.Dynamics.Joints.b2RevoluteJoint = b2RevoluteJoint;

    class b2RevoluteJointDef extends b2JointDef {
      constructor() {
        super(...arguments);
        b2RevoluteJointDef.b2RevoluteJointDef.apply(this, arguments);
        if (this.constructor === b2RevoluteJointDef) this.b2RevoluteJointDef.apply(this, arguments);
      }

      static b2RevoluteJointDef() {
        Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
        this.localAnchorA = new b2Vec2();
        this.localAnchorB = new b2Vec2();
      }

      b2RevoluteJointDef() {
        this.__super.b2JointDef.call(this);
        this.type = b2Joint.e_revoluteJoint;
        this.localAnchorA.Set(0.0, 0.0);
        this.localAnchorB.Set(0.0, 0.0);
        this.referenceAngle = 0.0;
        this.lowerAngle = 0.0;
        this.upperAngle = 0.0;
        this.maxMotorTorque = 0.0;
        this.motorSpeed = 0.0;
        this.enableLimit = false;
        this.enableMotor = false;
      }

      Initialize(bA, bB, anchor) {
        this.bodyA = bA;
        this.bodyB = bB;
        this.localAnchorA = this.bodyA.GetLocalPoint(anchor);
        this.localAnchorB = this.bodyB.GetLocalPoint(anchor);
        this.referenceAngle = this.bodyB.GetAngle() - this.bodyA.GetAngle();
      }
    }

    Box2D.Dynamics.Joints.b2RevoluteJointDef = b2RevoluteJointDef;

    class b2WeldJoint extends b2Joint {
      constructor() {
        super(...arguments);
        b2WeldJoint.b2WeldJoint.apply(this, arguments);
        if (this.constructor === b2WeldJoint) this.b2WeldJoint.apply(this, arguments);
      }

      static b2WeldJoint() {
        Box2D.Dynamics.Joints.b2Joint.b2Joint.apply(this, arguments);
        this.m_localAnchorA = new b2Vec2();
        this.m_localAnchorB = new b2Vec2();
        this.m_impulse = new b2Vec3();
        this.m_mass = new b2Mat33();
      }

      GetAnchorA() {
        return this.m_bodyA.GetWorldPoint(this.m_localAnchorA);
      }

      GetAnchorB() {
        return this.m_bodyB.GetWorldPoint(this.m_localAnchorB);
      }

      GetReactionForce(inv_dt) {
        if (inv_dt === undefined) inv_dt = 0;
        return new b2Vec2(inv_dt * this.m_impulse.x, inv_dt * this.m_impulse.y);
      }

      GetReactionTorque(inv_dt) {
        if (inv_dt === undefined) inv_dt = 0;
        return inv_dt * this.m_impulse.z;
      }

      b2WeldJoint(def) {
        this.__super.b2Joint.call(this, def);
        this.m_localAnchorA.SetV(def.localAnchorA);
        this.m_localAnchorB.SetV(def.localAnchorB);
        this.m_referenceAngle = def.referenceAngle;
        this.m_impulse.SetZero();
        this.m_mass = new b2Mat33();
      }

      InitVelocityConstraints(step) {
        let tMat;
        let tX = 0;
        const bA = this.m_bodyA;
        const bB = this.m_bodyB;
        tMat = bA.m_xf.R;
        let rAX = this.m_localAnchorA.x - bA.m_sweep.localCenter.x;
        let rAY = this.m_localAnchorA.y - bA.m_sweep.localCenter.y;
        tX = (tMat.col1.x * rAX + tMat.col2.x * rAY);
        rAY = (tMat.col1.y * rAX + tMat.col2.y * rAY);
        rAX = tX;
        tMat = bB.m_xf.R;
        let rBX = this.m_localAnchorB.x - bB.m_sweep.localCenter.x;
        let rBY = this.m_localAnchorB.y - bB.m_sweep.localCenter.y;
        tX = (tMat.col1.x * rBX + tMat.col2.x * rBY);
        rBY = (tMat.col1.y * rBX + tMat.col2.y * rBY);
        rBX = tX;
        const mA = bA.m_invMass;
        const mB = bB.m_invMass;
        const iA = bA.m_invI;
        const iB = bB.m_invI;
        this.m_mass.col1.x = mA + mB + rAY * rAY * iA + rBY * rBY * iB;
        this.m_mass.col2.x = (-rAY * rAX * iA) - rBY * rBX * iB;
        this.m_mass.col3.x = (-rAY * iA) - rBY * iB;
        this.m_mass.col1.y = this.m_mass.col2.x;
        this.m_mass.col2.y = mA + mB + rAX * rAX * iA + rBX * rBX * iB;
        this.m_mass.col3.y = rAX * iA + rBX * iB;
        this.m_mass.col1.z = this.m_mass.col3.x;
        this.m_mass.col2.z = this.m_mass.col3.y;
        this.m_mass.col3.z = iA + iB;
        if (step.warmStarting) {
          this.m_impulse.x *= step.dtRatio;
          this.m_impulse.y *= step.dtRatio;
          this.m_impulse.z *= step.dtRatio;
          bA.m_linearVelocity.x -= mA * this.m_impulse.x;
          bA.m_linearVelocity.y -= mA * this.m_impulse.y;
          bA.m_angularVelocity -= iA * (rAX * this.m_impulse.y - rAY * this.m_impulse.x + this.m_impulse.z);
          bB.m_linearVelocity.x += mB * this.m_impulse.x;
          bB.m_linearVelocity.y += mB * this.m_impulse.y;
          bB.m_angularVelocity += iB * (rBX * this.m_impulse.y - rBY * this.m_impulse.x + this.m_impulse.z);
        } else {
          this.m_impulse.SetZero();
        }
      }

      SolveVelocityConstraints(step) {
        let tMat;
        let tX = 0;
        const bA = this.m_bodyA;
        const bB = this.m_bodyB;
        const vA = bA.m_linearVelocity;
        let wA = bA.m_angularVelocity;
        const vB = bB.m_linearVelocity;
        let wB = bB.m_angularVelocity;
        const mA = bA.m_invMass;
        const mB = bB.m_invMass;
        const iA = bA.m_invI;
        const iB = bB.m_invI;
        tMat = bA.m_xf.R;
        let rAX = this.m_localAnchorA.x - bA.m_sweep.localCenter.x;
        let rAY = this.m_localAnchorA.y - bA.m_sweep.localCenter.y;
        tX = (tMat.col1.x * rAX + tMat.col2.x * rAY);
        rAY = (tMat.col1.y * rAX + tMat.col2.y * rAY);
        rAX = tX;
        tMat = bB.m_xf.R;
        let rBX = this.m_localAnchorB.x - bB.m_sweep.localCenter.x;
        let rBY = this.m_localAnchorB.y - bB.m_sweep.localCenter.y;
        tX = (tMat.col1.x * rBX + tMat.col2.x * rBY);
        rBY = (tMat.col1.y * rBX + tMat.col2.y * rBY);
        rBX = tX;
        const Cdot1X = vB.x - wB * rBY - vA.x + wA * rAY;
        const Cdot1Y = vB.y + wB * rBX - vA.y - wA * rAX;
        const Cdot2 = wB - wA;
        const impulse = new b2Vec3();
        this.m_mass.Solve33(impulse, (-Cdot1X), (-Cdot1Y), (-Cdot2));
        this.m_impulse.Add(impulse);
        vA.x -= mA * impulse.x;
        vA.y -= mA * impulse.y;
        wA -= iA * (rAX * impulse.y - rAY * impulse.x + impulse.z);
        vB.x += mB * impulse.x;
        vB.y += mB * impulse.y;
        wB += iB * (rBX * impulse.y - rBY * impulse.x + impulse.z);
        bA.m_angularVelocity = wA;
        bB.m_angularVelocity = wB;
      }

      SolvePositionConstraints(baumgarte) {
        if (baumgarte === undefined) baumgarte = 0;
        let tMat;
        let tX = 0;
        const bA = this.m_bodyA;
        const bB = this.m_bodyB;
        tMat = bA.m_xf.R;
        let rAX = this.m_localAnchorA.x - bA.m_sweep.localCenter.x;
        let rAY = this.m_localAnchorA.y - bA.m_sweep.localCenter.y;
        tX = (tMat.col1.x * rAX + tMat.col2.x * rAY);
        rAY = (tMat.col1.y * rAX + tMat.col2.y * rAY);
        rAX = tX;
        tMat = bB.m_xf.R;
        let rBX = this.m_localAnchorB.x - bB.m_sweep.localCenter.x;
        let rBY = this.m_localAnchorB.y - bB.m_sweep.localCenter.y;
        tX = (tMat.col1.x * rBX + tMat.col2.x * rBY);
        rBY = (tMat.col1.y * rBX + tMat.col2.y * rBY);
        rBX = tX;
        const mA = bA.m_invMass;
        const mB = bB.m_invMass;
        let iA = bA.m_invI;
        let iB = bB.m_invI;
        const C1X = bB.m_sweep.c.x + rBX - bA.m_sweep.c.x - rAX;
        const C1Y = bB.m_sweep.c.y + rBY - bA.m_sweep.c.y - rAY;
        const C2 = bB.m_sweep.a - bA.m_sweep.a - this.m_referenceAngle;
        const k_allowedStretch = 10.0 * b2Settings.b2_linearSlop;
        const positionError = Math.sqrt(C1X * C1X + C1Y * C1Y);
        const angularError = b2Math.Abs(C2);
        if (positionError > k_allowedStretch) {
          iA *= 1.0;
          iB *= 1.0;
        }
        this.m_mass.col1.x = mA + mB + rAY * rAY * iA + rBY * rBY * iB;
        this.m_mass.col2.x = (-rAY * rAX * iA) - rBY * rBX * iB;
        this.m_mass.col3.x = (-rAY * iA) - rBY * iB;
        this.m_mass.col1.y = this.m_mass.col2.x;
        this.m_mass.col2.y = mA + mB + rAX * rAX * iA + rBX * rBX * iB;
        this.m_mass.col3.y = rAX * iA + rBX * iB;
        this.m_mass.col1.z = this.m_mass.col3.x;
        this.m_mass.col2.z = this.m_mass.col3.y;
        this.m_mass.col3.z = iA + iB;
        const impulse = new b2Vec3();
        this.m_mass.Solve33(impulse, (-C1X), (-C1Y), (-C2));
        bA.m_sweep.c.x -= mA * impulse.x;
        bA.m_sweep.c.y -= mA * impulse.y;
        bA.m_sweep.a -= iA * (rAX * impulse.y - rAY * impulse.x + impulse.z);
        bB.m_sweep.c.x += mB * impulse.x;
        bB.m_sweep.c.y += mB * impulse.y;
        bB.m_sweep.a += iB * (rBX * impulse.y - rBY * impulse.x + impulse.z);
        bA.SynchronizeTransform();
        bB.SynchronizeTransform();
        return positionError <= b2Settings.b2_linearSlop && angularError <= b2Settings.b2_angularSlop;
      }
    }

    Box2D.Dynamics.Joints.b2WeldJoint = b2WeldJoint;

    class b2WeldJointDef extends b2JointDef {
      constructor() {
        super(...arguments);
        b2WeldJointDef.b2WeldJointDef.apply(this, arguments);
        if (this.constructor === b2WeldJointDef) this.b2WeldJointDef.apply(this, arguments);
      }

      static b2WeldJointDef() {
        Box2D.Dynamics.Joints.b2JointDef.b2JointDef.apply(this, arguments);
        this.localAnchorA = new b2Vec2();
        this.localAnchorB = new b2Vec2();
      }

      b2WeldJointDef() {
        this.__super.b2JointDef.call(this);
        this.type = b2Joint.e_weldJoint;
        this.referenceAngle = 0.0;
      }

      Initialize(bA, bB, anchor) {
        this.bodyA = bA;
        this.bodyB = bB;
        this.localAnchorA.SetV(this.bodyA.GetLocalPoint(anchor));
        this.localAnchorB.SetV(this.bodyB.GetLocalPoint(anchor));
        this.referenceAngle = this.bodyB.GetAngle() - this.bodyA.GetAngle();
      }
    }

    Box2D.Dynamics.Joints.b2WeldJointDef = b2WeldJointDef;
  }))(); // definitions
  Box2D.postDefs = [];
  ((() => {
    const b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
    const b2EdgeChainDef = Box2D.Collision.Shapes.b2EdgeChainDef;
    const b2EdgeShape = Box2D.Collision.Shapes.b2EdgeShape;
    const b2MassData = Box2D.Collision.Shapes.b2MassData;
    const b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
    const b2Shape = Box2D.Collision.Shapes.b2Shape;
    const b2Color = Box2D.Common.b2Color;
    const b2internal = Box2D.Common.b2internal;
    const b2Settings = Box2D.Common.b2Settings;
    const b2Mat22 = Box2D.Common.Math.b2Mat22;
    const b2Mat33 = Box2D.Common.Math.b2Mat33;
    const b2Math = Box2D.Common.Math.b2Math;
    const b2Sweep = Box2D.Common.Math.b2Sweep;
    const b2Transform = Box2D.Common.Math.b2Transform;
    const b2Vec2 = Box2D.Common.Math.b2Vec2;
    const b2Vec3 = Box2D.Common.Math.b2Vec3;
    const b2AABB = Box2D.Collision.b2AABB;
    const b2Bound = Box2D.Collision.b2Bound;
    const b2BoundValues = Box2D.Collision.b2BoundValues;
    const b2Collision = Box2D.Collision.b2Collision;
    const b2ContactID = Box2D.Collision.b2ContactID;
    const b2ContactPoint = Box2D.Collision.b2ContactPoint;
    const b2Distance = Box2D.Collision.b2Distance;
    const b2DistanceInput = Box2D.Collision.b2DistanceInput;
    const b2DistanceOutput = Box2D.Collision.b2DistanceOutput;
    const b2DistanceProxy = Box2D.Collision.b2DistanceProxy;
    const b2DynamicTree = Box2D.Collision.b2DynamicTree;
    const b2DynamicTreeBroadPhase = Box2D.Collision.b2DynamicTreeBroadPhase;
    const b2DynamicTreeNode = Box2D.Collision.b2DynamicTreeNode;
    const b2DynamicTreePair = Box2D.Collision.b2DynamicTreePair;
    const b2Manifold = Box2D.Collision.b2Manifold;
    const b2ManifoldPoint = Box2D.Collision.b2ManifoldPoint;
    const b2Point = Box2D.Collision.b2Point;
    const b2RayCastInput = Box2D.Collision.b2RayCastInput;
    const b2RayCastOutput = Box2D.Collision.b2RayCastOutput;
    const b2Segment = Box2D.Collision.b2Segment;
    const b2SeparationFunction = Box2D.Collision.b2SeparationFunction;
    const b2Simplex = Box2D.Collision.b2Simplex;
    const b2SimplexCache = Box2D.Collision.b2SimplexCache;
    const b2SimplexVertex = Box2D.Collision.b2SimplexVertex;
    const b2TimeOfImpact = Box2D.Collision.b2TimeOfImpact;
    const b2TOIInput = Box2D.Collision.b2TOIInput;
    const b2WorldManifold = Box2D.Collision.b2WorldManifold;
    const ClipVertex = Box2D.Collision.ClipVertex;
    const Features = Box2D.Collision.Features;
    const IBroadPhase = Box2D.Collision.IBroadPhase;

    b2AABB.Combine = (aabb1, aabb2) => {
      const aabb = new b2AABB();
      aabb.Combine(aabb1, aabb2);
      return aabb;
    };
    b2Bound.b2Bound = () => { };
    b2BoundValues.b2BoundValues = () => { };
    b2Collision.b2Collision = () => { };
    b2Collision.ClipSegmentToLine = (vOut, vIn, normal, offset) => {
      if (offset === undefined) offset = 0;
      let cv;
      let numOut = 0;
      cv = vIn[0];
      const vIn0 = cv.v;
      cv = vIn[1];
      const vIn1 = cv.v;
      const distance0 = normal.x * vIn0.x + normal.y * vIn0.y - offset;
      const distance1 = normal.x * vIn1.x + normal.y * vIn1.y - offset;
      if (distance0 <= 0.0) vOut[numOut++].Set(vIn[0]);
      if (distance1 <= 0.0) vOut[numOut++].Set(vIn[1]);
      if (distance0 * distance1 < 0.0) {
        const interp = distance0 / (distance0 - distance1);
        cv = vOut[numOut];
        const tVec = cv.v;
        tVec.x = vIn0.x + interp * (vIn1.x - vIn0.x);
        tVec.y = vIn0.y + interp * (vIn1.y - vIn0.y);
        cv = vOut[numOut];
        let cv2;
        if (distance0 > 0.0) {
          cv2 = vIn[0];
          cv.id = cv2.id;
        } else {
          cv2 = vIn[1];
          cv.id = cv2.id;
        } ++numOut;
      }
      return numOut;
    };
    b2Collision.EdgeSeparation = (poly1, xf1, edge1, poly2, xf2) => {
      if (edge1 === undefined) edge1 = 0;
      const count1 = parseInt(poly1.m_vertexCount);
      const vertices1 = poly1.m_vertices;
      const normals1 = poly1.m_normals;
      const count2 = parseInt(poly2.m_vertexCount);
      const vertices2 = poly2.m_vertices;
      let tMat;
      let tVec;
      tMat = xf1.R;
      tVec = normals1[edge1];
      const normal1WorldX = (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
      const normal1WorldY = (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
      tMat = xf2.R;
      const normal1X = (tMat.col1.x * normal1WorldX + tMat.col1.y * normal1WorldY);
      const normal1Y = (tMat.col2.x * normal1WorldX + tMat.col2.y * normal1WorldY);
      let index = 0;
      let minDot = Number.MAX_VALUE;
      for (let i = 0; i < count2; ++i) {
        tVec = vertices2[i];
        const dot = tVec.x * normal1X + tVec.y * normal1Y;
        if (dot < minDot) {
          minDot = dot;
          index = i;
        }
      }
      tVec = vertices1[edge1];
      tMat = xf1.R;
      const v1X = xf1.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
      const v1Y = xf1.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
      tVec = vertices2[index];
      tMat = xf2.R;
      let v2X = xf2.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
      let v2Y = xf2.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
      v2X -= v1X;
      v2Y -= v1Y;
      const separation = v2X * normal1WorldX + v2Y * normal1WorldY;
      return separation;
    };
    b2Collision.FindMaxSeparation = (edgeIndex, poly1, xf1, poly2, xf2) => {
      const count1 = parseInt(poly1.m_vertexCount);
      const normals1 = poly1.m_normals;
      let tVec;
      let tMat;
      tMat = xf2.R;
      tVec = poly2.m_centroid;
      let dX = xf2.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
      let dY = xf2.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
      tMat = xf1.R;
      tVec = poly1.m_centroid;
      dX -= xf1.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
      dY -= xf1.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
      const dLocal1X = (dX * xf1.R.col1.x + dY * xf1.R.col1.y);
      const dLocal1Y = (dX * xf1.R.col2.x + dY * xf1.R.col2.y);
      let edge = 0;
      let maxDot = (-Number.MAX_VALUE);
      for (let i = 0; i < count1; ++i) {
        tVec = normals1[i];
        const dot = (tVec.x * dLocal1X + tVec.y * dLocal1Y);
        if (dot > maxDot) {
          maxDot = dot;
          edge = i;
        }
      }
      let s = b2Collision.EdgeSeparation(poly1, xf1, edge, poly2, xf2);
      const prevEdge = parseInt(edge - 1 >= 0 ? edge - 1 : count1 - 1);
      const sPrev = b2Collision.EdgeSeparation(poly1, xf1, prevEdge, poly2, xf2);
      const nextEdge = parseInt(edge + 1 < count1 ? edge + 1 : 0);
      const sNext = b2Collision.EdgeSeparation(poly1, xf1, nextEdge, poly2, xf2);
      let bestEdge = 0;
      let bestSeparation = 0;
      let increment = 0;
      if (sPrev > s && sPrev > sNext) {
        increment = (-1);
        bestEdge = prevEdge;
        bestSeparation = sPrev;
      } else if (sNext > s) {
        increment = 1;
        bestEdge = nextEdge;
        bestSeparation = sNext;
      } else {
        edgeIndex[0] = edge;
        return s;
      }
      while (true) {
        if (increment == (-1)) edge = bestEdge - 1 >= 0 ? bestEdge - 1 : count1 - 1;
        else edge = bestEdge + 1 < count1 ? bestEdge + 1 : 0; s = b2Collision.EdgeSeparation(poly1, xf1, edge, poly2, xf2);
        if (s > bestSeparation) {
          bestEdge = edge;
          bestSeparation = s;
        } else {
          break;
        }
      }
      edgeIndex[0] = bestEdge;
      return bestSeparation;
    };
    b2Collision.FindIncidentEdge = (c, poly1, xf1, edge1, poly2, xf2) => {
      if (edge1 === undefined) edge1 = 0;
      const count1 = parseInt(poly1.m_vertexCount);
      const normals1 = poly1.m_normals;
      const count2 = parseInt(poly2.m_vertexCount);
      const vertices2 = poly2.m_vertices;
      const normals2 = poly2.m_normals;
      let tMat;
      let tVec;
      tMat = xf1.R;
      tVec = normals1[edge1];
      let normal1X = (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
      let normal1Y = (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
      tMat = xf2.R;
      const tX = (tMat.col1.x * normal1X + tMat.col1.y * normal1Y);
      normal1Y = (tMat.col2.x * normal1X + tMat.col2.y * normal1Y);
      normal1X = tX;
      let index = 0;
      let minDot = Number.MAX_VALUE;
      for (let i = 0; i < count2; ++i) {
        tVec = normals2[i];
        const dot = (normal1X * tVec.x + normal1Y * tVec.y);
        if (dot < minDot) {
          minDot = dot;
          index = i;
        }
      }
      let tClip;
      const i1 = parseInt(index);
      const i2 = parseInt(i1 + 1 < count2 ? i1 + 1 : 0);
      tClip = c[0];
      tVec = vertices2[i1];
      tMat = xf2.R;
      tClip.v.x = xf2.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
      tClip.v.y = xf2.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
      tClip.id.features.referenceEdge = edge1;
      tClip.id.features.incidentEdge = i1;
      tClip.id.features.incidentVertex = 0;
      tClip = c[1];
      tVec = vertices2[i2];
      tMat = xf2.R;
      tClip.v.x = xf2.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
      tClip.v.y = xf2.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
      tClip.id.features.referenceEdge = edge1;
      tClip.id.features.incidentEdge = i2;
      tClip.id.features.incidentVertex = 1;
    };
    b2Collision.MakeClipPointVector = () => {
      const r = new Vector(2);
      r[0] = new ClipVertex();
      r[1] = new ClipVertex();
      return r;
    };
    b2Collision.CollidePolygons = (manifold, polyA, xfA, polyB, xfB) => {
      let cv;
      manifold.m_pointCount = 0;
      const totalRadius = polyA.m_radius + polyB.m_radius;
      let edgeA = 0;
      b2Collision.s_edgeAO[0] = edgeA;
      const separationA = b2Collision.FindMaxSeparation(b2Collision.s_edgeAO, polyA, xfA, polyB, xfB);
      edgeA = b2Collision.s_edgeAO[0];
      if (separationA > totalRadius) return;
      let edgeB = 0;
      b2Collision.s_edgeBO[0] = edgeB;
      const separationB = b2Collision.FindMaxSeparation(b2Collision.s_edgeBO, polyB, xfB, polyA, xfA);
      edgeB = b2Collision.s_edgeBO[0];
      if (separationB > totalRadius) return;
      let poly1;
      let poly2;
      let xf1;
      let xf2;
      let edge1 = 0;
      let flip = 0;
      const k_relativeTol = 0.98;
      const k_absoluteTol = 0.001;
      let tMat;
      if (separationB > k_relativeTol * separationA + k_absoluteTol) {
        poly1 = polyB;
        poly2 = polyA;
        xf1 = xfB;
        xf2 = xfA;
        edge1 = edgeB;
        manifold.m_type = b2Manifold.e_faceB;
        flip = 1;
      } else {
        poly1 = polyA;
        poly2 = polyB;
        xf1 = xfA;
        xf2 = xfB;
        edge1 = edgeA;
        manifold.m_type = b2Manifold.e_faceA;
        flip = 0;
      }
      const incidentEdge = b2Collision.s_incidentEdge;
      b2Collision.FindIncidentEdge(incidentEdge, poly1, xf1, edge1, poly2, xf2);
      const count1 = parseInt(poly1.m_vertexCount);
      const vertices1 = poly1.m_vertices;
      const local_v11 = vertices1[edge1];
      let local_v12;
      if (edge1 + 1 < count1) {
        local_v12 = vertices1[parseInt(edge1 + 1)];
      } else {
        local_v12 = vertices1[0];
      }
      const localTangent = b2Collision.s_localTangent;
      localTangent.Set(local_v12.x - local_v11.x, local_v12.y - local_v11.y);
      localTangent.Normalize();
      const localNormal = b2Collision.s_localNormal;
      localNormal.x = localTangent.y;
      localNormal.y = (-localTangent.x);
      const planePoint = b2Collision.s_planePoint;
      planePoint.Set(0.5 * (local_v11.x + local_v12.x), 0.5 * (local_v11.y + local_v12.y));
      const tangent = b2Collision.s_tangent;
      tMat = xf1.R;
      tangent.x = (tMat.col1.x * localTangent.x + tMat.col2.x * localTangent.y);
      tangent.y = (tMat.col1.y * localTangent.x + tMat.col2.y * localTangent.y);
      const tangent2 = b2Collision.s_tangent2;
      tangent2.x = (-tangent.x);
      tangent2.y = (-tangent.y);
      const normal = b2Collision.s_normal;
      normal.x = tangent.y;
      normal.y = (-tangent.x);
      const v11 = b2Collision.s_v11;
      const v12 = b2Collision.s_v12;
      v11.x = xf1.position.x + (tMat.col1.x * local_v11.x + tMat.col2.x * local_v11.y);
      v11.y = xf1.position.y + (tMat.col1.y * local_v11.x + tMat.col2.y * local_v11.y);
      v12.x = xf1.position.x + (tMat.col1.x * local_v12.x + tMat.col2.x * local_v12.y);
      v12.y = xf1.position.y + (tMat.col1.y * local_v12.x + tMat.col2.y * local_v12.y);
      const frontOffset = normal.x * v11.x + normal.y * v11.y;
      const sideOffset1 = (-tangent.x * v11.x) - tangent.y * v11.y + totalRadius;
      const sideOffset2 = tangent.x * v12.x + tangent.y * v12.y + totalRadius;
      const clipPoints1 = b2Collision.s_clipPoints1;
      const clipPoints2 = b2Collision.s_clipPoints2;
      let np = 0;
      np = b2Collision.ClipSegmentToLine(clipPoints1, incidentEdge, tangent2, sideOffset1);
      if (np < 2) return;
      np = b2Collision.ClipSegmentToLine(clipPoints2, clipPoints1, tangent, sideOffset2);
      if (np < 2) return;
      manifold.m_localPlaneNormal.SetV(localNormal);
      manifold.m_localPoint.SetV(planePoint);
      let pointCount = 0;
      for (let i = 0; i < b2Settings.b2_maxManifoldPoints; ++i) {
        cv = clipPoints2[i];
        const separation = normal.x * cv.v.x + normal.y * cv.v.y - frontOffset;
        if (separation <= totalRadius) {
          const cp = manifold.m_points[pointCount];
          tMat = xf2.R;
          const tX = cv.v.x - xf2.position.x;
          const tY = cv.v.y - xf2.position.y;
          cp.m_localPoint.x = (tX * tMat.col1.x + tY * tMat.col1.y);
          cp.m_localPoint.y = (tX * tMat.col2.x + tY * tMat.col2.y);
          cp.m_id.Set(cv.id);
          cp.m_id.features.flip = flip;
          ++pointCount;
        }
      }
      manifold.m_pointCount = pointCount;
    };
    b2Collision.CollideCircles = (manifold, circle1, xf1, circle2, xf2) => {
      manifold.m_pointCount = 0;
      let tMat;
      let tVec;
      tMat = xf1.R;
      tVec = circle1.m_p;
      const p1X = xf1.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
      const p1Y = xf1.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
      tMat = xf2.R;
      tVec = circle2.m_p;
      const p2X = xf2.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
      const p2Y = xf2.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
      const dX = p2X - p1X;
      const dY = p2Y - p1Y;
      const distSqr = dX * dX + dY * dY;
      const radius = circle1.m_radius + circle2.m_radius;
      if (distSqr > radius * radius) {
        return;
      }
      manifold.m_type = b2Manifold.e_circles;
      manifold.m_localPoint.SetV(circle1.m_p);
      manifold.m_localPlaneNormal.SetZero();
      manifold.m_pointCount = 1;
      manifold.m_points[0].m_localPoint.SetV(circle2.m_p);
      manifold.m_points[0].m_id.key = 0;
    };
    b2Collision.CollidePolygonAndCircle = (manifold, polygon, xf1, circle, xf2) => {
      manifold.m_pointCount = 0;
      let tPoint;
      let dX = 0;
      let dY = 0;
      const positionX = 0;
      const positionY = 0;
      let tVec;
      let tMat;
      tMat = xf2.R;
      tVec = circle.m_p;
      const cX = xf2.position.x + (tMat.col1.x * tVec.x + tMat.col2.x * tVec.y);
      const cY = xf2.position.y + (tMat.col1.y * tVec.x + tMat.col2.y * tVec.y);
      dX = cX - xf1.position.x;
      dY = cY - xf1.position.y;
      tMat = xf1.R;
      const cLocalX = (dX * tMat.col1.x + dY * tMat.col1.y);
      const cLocalY = (dX * tMat.col2.x + dY * tMat.col2.y);
      const dist = 0;
      let normalIndex = 0;
      let separation = (-Number.MAX_VALUE);
      const radius = polygon.m_radius + circle.m_radius;
      const vertexCount = parseInt(polygon.m_vertexCount);
      const vertices = polygon.m_vertices;
      const normals = polygon.m_normals;
      for (let i = 0; i < vertexCount; ++i) {
        tVec = vertices[i];
        dX = cLocalX - tVec.x;
        dY = cLocalY - tVec.y;
        tVec = normals[i];
        const s = tVec.x * dX + tVec.y * dY;
        if (s > radius) {
          return;
        }
        if (s > separation) {
          separation = s;
          normalIndex = i;
        }
      }
      const vertIndex1 = parseInt(normalIndex);
      const vertIndex2 = parseInt(vertIndex1 + 1 < vertexCount ? vertIndex1 + 1 : 0);
      const v1 = vertices[vertIndex1];
      const v2 = vertices[vertIndex2];
      if (separation < Number.MIN_VALUE) {
        manifold.m_pointCount = 1;
        manifold.m_type = b2Manifold.e_faceA;
        manifold.m_localPlaneNormal.SetV(normals[normalIndex]);
        manifold.m_localPoint.x = 0.5 * (v1.x + v2.x);
        manifold.m_localPoint.y = 0.5 * (v1.y + v2.y);
        manifold.m_points[0].m_localPoint.SetV(circle.m_p);
        manifold.m_points[0].m_id.key = 0;
        return;
      }
      const u1 = (cLocalX - v1.x) * (v2.x - v1.x) + (cLocalY - v1.y) * (v2.y - v1.y);
      const u2 = (cLocalX - v2.x) * (v1.x - v2.x) + (cLocalY - v2.y) * (v1.y - v2.y);
      if (u1 <= 0.0) {
        if ((cLocalX - v1.x) * (cLocalX - v1.x) + (cLocalY - v1.y) * (cLocalY - v1.y) > radius * radius) return;
        manifold.m_pointCount = 1;
        manifold.m_type = b2Manifold.e_faceA;
        manifold.m_localPlaneNormal.x = cLocalX - v1.x;
        manifold.m_localPlaneNormal.y = cLocalY - v1.y;
        manifold.m_localPlaneNormal.Normalize();
        manifold.m_localPoint.SetV(v1);
        manifold.m_points[0].m_localPoint.SetV(circle.m_p);
        manifold.m_points[0].m_id.key = 0;
      } else if (u2 <= 0) {
        if ((cLocalX - v2.x) * (cLocalX - v2.x) + (cLocalY - v2.y) * (cLocalY - v2.y) > radius * radius) return;
        manifold.m_pointCount = 1;
        manifold.m_type = b2Manifold.e_faceA;
        manifold.m_localPlaneNormal.x = cLocalX - v2.x;
        manifold.m_localPlaneNormal.y = cLocalY - v2.y;
        manifold.m_localPlaneNormal.Normalize();
        manifold.m_localPoint.SetV(v2);
        manifold.m_points[0].m_localPoint.SetV(circle.m_p);
        manifold.m_points[0].m_id.key = 0;
      } else {
        const faceCenterX = 0.5 * (v1.x + v2.x);
        const faceCenterY = 0.5 * (v1.y + v2.y);
        separation = (cLocalX - faceCenterX) * normals[vertIndex1].x + (cLocalY - faceCenterY) * normals[vertIndex1].y;
        if (separation > radius) return;
        manifold.m_pointCount = 1;
        manifold.m_type = b2Manifold.e_faceA;
        manifold.m_localPlaneNormal.x = normals[vertIndex1].x;
        manifold.m_localPlaneNormal.y = normals[vertIndex1].y;
        manifold.m_localPlaneNormal.Normalize();
        manifold.m_localPoint.Set(faceCenterX, faceCenterY);
        manifold.m_points[0].m_localPoint.SetV(circle.m_p);
        manifold.m_points[0].m_id.key = 0;
      }
    };
    b2Collision.TestOverlap = (a, b) => {
      let t1 = b.lowerBound;
      let t2 = a.upperBound;
      const d1X = t1.x - t2.x;
      const d1Y = t1.y - t2.y;
      t1 = a.lowerBound;
      t2 = b.upperBound;
      const d2X = t1.x - t2.x;
      const d2Y = t1.y - t2.y;
      if (d1X > 0.0 || d1Y > 0.0) return false;
      if (d2X > 0.0 || d2Y > 0.0) return false;
      return true;
    };
    Box2D.postDefs.push(() => {
      Box2D.Collision.b2Collision.s_incidentEdge = b2Collision.MakeClipPointVector();
      Box2D.Collision.b2Collision.s_clipPoints1 = b2Collision.MakeClipPointVector();
      Box2D.Collision.b2Collision.s_clipPoints2 = b2Collision.MakeClipPointVector();
      Box2D.Collision.b2Collision.s_edgeAO = new Vector_a2j_Number(1);
      Box2D.Collision.b2Collision.s_edgeBO = new Vector_a2j_Number(1);
      Box2D.Collision.b2Collision.s_localTangent = new b2Vec2();
      Box2D.Collision.b2Collision.s_localNormal = new b2Vec2();
      Box2D.Collision.b2Collision.s_planePoint = new b2Vec2();
      Box2D.Collision.b2Collision.s_normal = new b2Vec2();
      Box2D.Collision.b2Collision.s_tangent = new b2Vec2();
      Box2D.Collision.b2Collision.s_tangent2 = new b2Vec2();
      Box2D.Collision.b2Collision.s_v11 = new b2Vec2();
      Box2D.Collision.b2Collision.s_v12 = new b2Vec2();
      Box2D.Collision.b2Collision.b2CollidePolyTempVec = new b2Vec2();
      Box2D.Collision.b2Collision.b2_nullFeature = 0x000000ff;
    });
    b2Distance.b2Distance = () => { };
    b2Distance.Distance = (output, cache, input) => {
      ++b2Distance.b2_gjkCalls;
      const proxyA = input.proxyA;
      const proxyB = input.proxyB;
      const transformA = input.transformA;
      const transformB = input.transformB;
      const simplex = b2Distance.s_simplex;
      simplex.ReadCache(cache, proxyA, transformA, proxyB, transformB);
      const vertices = simplex.m_vertices;
      const k_maxIters = 20;
      const saveA = b2Distance.s_saveA;
      const saveB = b2Distance.s_saveB;
      let saveCount = 0;
      const closestPoint = simplex.GetClosestPoint();
      let distanceSqr1 = closestPoint.LengthSquared();
      let distanceSqr2 = distanceSqr1;
      let i = 0;
      let p;
      let iter = 0;
      while (iter < k_maxIters) {
        saveCount = simplex.m_count;
        for (i = 0;
          i < saveCount; i++) {
          saveA[i] = vertices[i].indexA;
          saveB[i] = vertices[i].indexB;
        }
        switch (simplex.m_count) {
          case 1:
            break;
          case 2:
            simplex.Solve2();
            break;
          case 3:
            simplex.Solve3();
            break;
          default:
            b2Settings.b2Assert(false);
        }
        if (simplex.m_count == 3) {
          break;
        }
        p = simplex.GetClosestPoint();
        distanceSqr2 = p.LengthSquared();
        if (distanceSqr2 > distanceSqr1) { }
        distanceSqr1 = distanceSqr2;
        const d = simplex.GetSearchDirection();
        if (d.LengthSquared() < Number.MIN_VALUE * Number.MIN_VALUE) {
          break;
        }
        const vertex = vertices[simplex.m_count];
        vertex.indexA = proxyA.GetSupport(b2Math.MulTMV(transformA.R, d.GetNegative()));
        vertex.wA = b2Math.MulX(transformA, proxyA.GetVertex(vertex.indexA));
        vertex.indexB = proxyB.GetSupport(b2Math.MulTMV(transformB.R, d));
        vertex.wB = b2Math.MulX(transformB, proxyB.GetVertex(vertex.indexB));
        vertex.w = b2Math.SubtractVV(vertex.wB, vertex.wA);
        ++iter;
        ++b2Distance.b2_gjkIters;
        let duplicate = false;
        for (i = 0;
          i < saveCount; i++) {
          if (vertex.indexA == saveA[i] && vertex.indexB == saveB[i]) {
            duplicate = true;
            break;
          }
        }
        if (duplicate) {
          break;
        } ++simplex.m_count;
      }
      b2Distance.b2_gjkMaxIters = b2Math.Max(b2Distance.b2_gjkMaxIters, iter);
      simplex.GetWitnessPoints(output.pointA, output.pointB);
      output.distance = b2Math.SubtractVV(output.pointA, output.pointB).Length();
      output.iterations = iter;
      simplex.WriteCache(cache);
      if (input.useRadii) {
        const rA = proxyA.m_radius;
        const rB = proxyB.m_radius;
        if (output.distance > rA + rB && output.distance > Number.MIN_VALUE) {
          output.distance -= rA + rB;
          const normal = b2Math.SubtractVV(output.pointB, output.pointA);
          normal.Normalize();
          output.pointA.x += rA * normal.x;
          output.pointA.y += rA * normal.y;
          output.pointB.x -= rB * normal.x;
          output.pointB.y -= rB * normal.y;
        } else {
          p = new b2Vec2();
          p.x = 0.5 * (output.pointA.x + output.pointB.x);
          p.y = 0.5 * (output.pointA.y + output.pointB.y);
          output.pointA.x = output.pointB.x = p.x;
          output.pointA.y = output.pointB.y = p.y;
          output.distance = 0.0;
        }
      }
    };
    Box2D.postDefs.push(() => {
      Box2D.Collision.b2Distance.s_simplex = new b2Simplex();
      Box2D.Collision.b2Distance.s_saveA = new Vector_a2j_Number(3);
      Box2D.Collision.b2Distance.s_saveB = new Vector_a2j_Number(3);
    });
    b2DistanceInput.b2DistanceInput = () => { };
    b2DistanceProxy.b2DistanceProxy = () => { };
    b2DynamicTree.b2DynamicTree = () => { };
    b2DynamicTreeBroadPhase.__implements = {};
    b2DynamicTreeBroadPhase.__implements[IBroadPhase] = true;
    b2DynamicTreePair.b2DynamicTreePair = () => { };
    Box2D.postDefs.push(() => {
      Box2D.Collision.b2Manifold.e_circles = 0x0001;
      Box2D.Collision.b2Manifold.e_faceA = 0x0002;
      Box2D.Collision.b2Manifold.e_faceB = 0x0004;
    });
    Box2D.postDefs.push(() => {
      Box2D.Collision.b2SeparationFunction.e_points = 0x01;
      Box2D.Collision.b2SeparationFunction.e_faceA = 0x02;
      Box2D.Collision.b2SeparationFunction.e_faceB = 0x04;
    });
    b2SimplexVertex.b2SimplexVertex = () => { };
    b2TimeOfImpact.b2TimeOfImpact = () => { };
    b2TimeOfImpact.TimeOfImpact = input => {
      ++b2TimeOfImpact.b2_toiCalls;
      const proxyA = input.proxyA;
      const proxyB = input.proxyB;
      const sweepA = input.sweepA;
      const sweepB = input.sweepB;
      b2Settings.b2Assert(sweepA.t0 == sweepB.t0);
      b2Settings.b2Assert(1.0 - sweepA.t0 > Number.MIN_VALUE);
      const radius = proxyA.m_radius + proxyB.m_radius;
      const tolerance = input.tolerance;
      let alpha = 0.0;
      const k_maxIterations = 1000;
      let iter = 0;
      let target = 0.0;
      b2TimeOfImpact.s_cache.count = 0;
      b2TimeOfImpact.s_distanceInput.useRadii = false;
      for (; ;) {
        sweepA.GetTransform(b2TimeOfImpact.s_xfA, alpha);
        sweepB.GetTransform(b2TimeOfImpact.s_xfB, alpha);
        b2TimeOfImpact.s_distanceInput.proxyA = proxyA;
        b2TimeOfImpact.s_distanceInput.proxyB = proxyB;
        b2TimeOfImpact.s_distanceInput.transformA = b2TimeOfImpact.s_xfA;
        b2TimeOfImpact.s_distanceInput.transformB = b2TimeOfImpact.s_xfB;
        b2Distance.Distance(b2TimeOfImpact.s_distanceOutput, b2TimeOfImpact.s_cache, b2TimeOfImpact.s_distanceInput);
        if (b2TimeOfImpact.s_distanceOutput.distance <= 0.0) {
          alpha = 1.0;
          break;
        }
        b2TimeOfImpact.s_fcn.Initialize(b2TimeOfImpact.s_cache, proxyA, b2TimeOfImpact.s_xfA, proxyB, b2TimeOfImpact.s_xfB);
        const separation = b2TimeOfImpact.s_fcn.Evaluate(b2TimeOfImpact.s_xfA, b2TimeOfImpact.s_xfB);
        if (separation <= 0.0) {
          alpha = 1.0;
          break;
        }
        if (iter == 0) {
          if (separation > radius) {
            target = b2Math.Max(radius - tolerance, 0.75 * radius);
          } else {
            target = b2Math.Max(separation - tolerance, 0.02 * radius);
          }
        }
        if (separation - target < 0.5 * tolerance) {
          if (iter == 0) {
            alpha = 1.0;
            break;
          }
          break;
        }
        let newAlpha = alpha; {
          let x1 = alpha;
          let x2 = 1.0;
          let f1 = separation;
          sweepA.GetTransform(b2TimeOfImpact.s_xfA, x2);
          sweepB.GetTransform(b2TimeOfImpact.s_xfB, x2);
          let f2 = b2TimeOfImpact.s_fcn.Evaluate(b2TimeOfImpact.s_xfA, b2TimeOfImpact.s_xfB);
          if (f2 >= target) {
            alpha = 1.0;
            break;
          }
          let rootIterCount = 0;
          for (; ;) {
            let x = 0;
            if (rootIterCount & 1) {
              x = x1 + (target - f1) * (x2 - x1) / (f2 - f1);
            } else {
              x = 0.5 * (x1 + x2);
            }
            sweepA.GetTransform(b2TimeOfImpact.s_xfA, x);
            sweepB.GetTransform(b2TimeOfImpact.s_xfB, x);
            const f = b2TimeOfImpact.s_fcn.Evaluate(b2TimeOfImpact.s_xfA, b2TimeOfImpact.s_xfB);
            if (b2Math.Abs(f - target) < 0.025 * tolerance) {
              newAlpha = x;
              break;
            }
            if (f > target) {
              x1 = x;
              f1 = f;
            } else {
              x2 = x;
              f2 = f;
            } ++rootIterCount;
            ++b2TimeOfImpact.b2_toiRootIters;
            if (rootIterCount == 50) {
              break;
            }
          }
          b2TimeOfImpact.b2_toiMaxRootIters = b2Math.Max(b2TimeOfImpact.b2_toiMaxRootIters, rootIterCount);
        }
        if (newAlpha < (1.0 + 100.0 * Number.MIN_VALUE) * alpha) {
          break;
        }
        alpha = newAlpha;
        iter++;
        ++b2TimeOfImpact.b2_toiIters;
        if (iter == k_maxIterations) {
          break;
        }
      }
      b2TimeOfImpact.b2_toiMaxIters = b2Math.Max(b2TimeOfImpact.b2_toiMaxIters, iter);
      return alpha;
    };
    Box2D.postDefs.push(() => {
      Box2D.Collision.b2TimeOfImpact.b2_toiCalls = 0;
      Box2D.Collision.b2TimeOfImpact.b2_toiIters = 0;
      Box2D.Collision.b2TimeOfImpact.b2_toiMaxIters = 0;
      Box2D.Collision.b2TimeOfImpact.b2_toiRootIters = 0;
      Box2D.Collision.b2TimeOfImpact.b2_toiMaxRootIters = 0;
      Box2D.Collision.b2TimeOfImpact.s_cache = new b2SimplexCache();
      Box2D.Collision.b2TimeOfImpact.s_distanceInput = new b2DistanceInput();
      Box2D.Collision.b2TimeOfImpact.s_xfA = new b2Transform();
      Box2D.Collision.b2TimeOfImpact.s_xfB = new b2Transform();
      Box2D.Collision.b2TimeOfImpact.s_fcn = new b2SeparationFunction();
      Box2D.Collision.b2TimeOfImpact.s_distanceOutput = new b2DistanceOutput();
    });
    Features.Features = () => { };
  }))();
  ((() => {
    const b2Color = Box2D.Common.b2Color;
    const b2internal = Box2D.Common.b2internal;
    const b2Settings = Box2D.Common.b2Settings;
    const b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
    const b2EdgeChainDef = Box2D.Collision.Shapes.b2EdgeChainDef;
    const b2EdgeShape = Box2D.Collision.Shapes.b2EdgeShape;
    const b2MassData = Box2D.Collision.Shapes.b2MassData;
    const b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
    const b2Shape = Box2D.Collision.Shapes.b2Shape;
    const b2Mat22 = Box2D.Common.Math.b2Mat22;
    const b2Mat33 = Box2D.Common.Math.b2Mat33;
    const b2Math = Box2D.Common.Math.b2Math;
    const b2Sweep = Box2D.Common.Math.b2Sweep;
    const b2Transform = Box2D.Common.Math.b2Transform;
    const b2Vec2 = Box2D.Common.Math.b2Vec2;
    const b2Vec3 = Box2D.Common.Math.b2Vec3;
    const b2Body = Box2D.Dynamics.b2Body;
    const b2BodyDef = Box2D.Dynamics.b2BodyDef;
    const b2ContactFilter = Box2D.Dynamics.b2ContactFilter;
    const b2ContactImpulse = Box2D.Dynamics.b2ContactImpulse;
    const b2ContactListener = Box2D.Dynamics.b2ContactListener;
    const b2ContactManager = Box2D.Dynamics.b2ContactManager;
    const b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
    const b2DestructionListener = Box2D.Dynamics.b2DestructionListener;
    const b2FilterData = Box2D.Dynamics.b2FilterData;
    const b2Fixture = Box2D.Dynamics.b2Fixture;
    const b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
    const b2Island = Box2D.Dynamics.b2Island;
    const b2TimeStep = Box2D.Dynamics.b2TimeStep;
    const b2World = Box2D.Dynamics.b2World;
    const b2AABB = Box2D.Collision.b2AABB;
    const b2Bound = Box2D.Collision.b2Bound;
    const b2BoundValues = Box2D.Collision.b2BoundValues;
    const b2Collision = Box2D.Collision.b2Collision;
    const b2ContactID = Box2D.Collision.b2ContactID;
    const b2ContactPoint = Box2D.Collision.b2ContactPoint;
    const b2Distance = Box2D.Collision.b2Distance;
    const b2DistanceInput = Box2D.Collision.b2DistanceInput;
    const b2DistanceOutput = Box2D.Collision.b2DistanceOutput;
    const b2DistanceProxy = Box2D.Collision.b2DistanceProxy;
    const b2DynamicTree = Box2D.Collision.b2DynamicTree;
    const b2DynamicTreeBroadPhase = Box2D.Collision.b2DynamicTreeBroadPhase;
    const b2DynamicTreeNode = Box2D.Collision.b2DynamicTreeNode;
    const b2DynamicTreePair = Box2D.Collision.b2DynamicTreePair;
    const b2Manifold = Box2D.Collision.b2Manifold;
    const b2ManifoldPoint = Box2D.Collision.b2ManifoldPoint;
    const b2Point = Box2D.Collision.b2Point;
    const b2RayCastInput = Box2D.Collision.b2RayCastInput;
    const b2RayCastOutput = Box2D.Collision.b2RayCastOutput;
    const b2Segment = Box2D.Collision.b2Segment;
    const b2SeparationFunction = Box2D.Collision.b2SeparationFunction;
    const b2Simplex = Box2D.Collision.b2Simplex;
    const b2SimplexCache = Box2D.Collision.b2SimplexCache;
    const b2SimplexVertex = Box2D.Collision.b2SimplexVertex;
    const b2TimeOfImpact = Box2D.Collision.b2TimeOfImpact;
    const b2TOIInput = Box2D.Collision.b2TOIInput;
    const b2WorldManifold = Box2D.Collision.b2WorldManifold;
    const ClipVertex = Box2D.Collision.ClipVertex;
    const Features = Box2D.Collision.Features;
    const IBroadPhase = Box2D.Collision.IBroadPhase;

    b2CircleShape.prototype.__super = Box2D.Collision.Shapes.b2Shape.prototype;
    b2EdgeChainDef.b2EdgeChainDef = () => { };
    b2EdgeShape.prototype.__super = Box2D.Collision.Shapes.b2Shape.prototype;
    b2PolygonShape.prototype.__super = Box2D.Collision.Shapes.b2Shape.prototype;
    b2PolygonShape.AsArray = (vertices, vertexCount) => {
      if (vertexCount === undefined) vertexCount = 0;
      const polygonShape = new b2PolygonShape();
      polygonShape.SetAsArray(vertices, vertexCount);
      return polygonShape;
    };
    b2PolygonShape.AsVector = (vertices, vertexCount) => {
      if (vertexCount === undefined) vertexCount = 0;
      const polygonShape = new b2PolygonShape();
      polygonShape.SetAsVector(vertices, vertexCount);
      return polygonShape;
    };
    b2PolygonShape.AsBox = (hx, hy) => {
      if (hx === undefined) hx = 0;
      if (hy === undefined) hy = 0;
      const polygonShape = new b2PolygonShape();
      polygonShape.SetAsBox(hx, hy);
      return polygonShape;
    };
    b2PolygonShape.AsOrientedBox = (hx, hy, center, angle) => {
      if (hx === undefined) hx = 0;
      if (hy === undefined) hy = 0;
      if (center === undefined) center = null;
      if (angle === undefined) angle = 0.0;
      const polygonShape = new b2PolygonShape();
      polygonShape.SetAsOrientedBox(hx, hy, center, angle);
      return polygonShape;
    };
    b2PolygonShape.AsEdge = (v1, v2) => {
      const polygonShape = new b2PolygonShape();
      polygonShape.SetAsEdge(v1, v2);
      return polygonShape;
    };
    b2PolygonShape.ComputeCentroid = (vs, count) => {
      if (count === undefined) count = 0;
      const c = new b2Vec2();
      let area = 0.0;
      const p1X = 0.0;
      const p1Y = 0.0;
      const inv3 = 1.0 / 3.0;
      for (let i = 0; i < count; ++i) {
        const p2 = vs[i];
        const p3 = i + 1 < count ? vs[parseInt(i + 1)] : vs[0];
        const e1X = p2.x - p1X;
        const e1Y = p2.y - p1Y;
        const e2X = p3.x - p1X;
        const e2Y = p3.y - p1Y;
        const D = (e1X * e2Y - e1Y * e2X);
        const triangleArea = 0.5 * D; area += triangleArea;
        c.x += triangleArea * inv3 * (p1X + p2.x + p3.x);
        c.y += triangleArea * inv3 * (p1Y + p2.y + p3.y);
      }
      c.x *= 1.0 / area;
      c.y *= 1.0 / area;
      return c;
    };
    b2PolygonShape.ComputeOBB = (obb, vs, count) => {
      if (count === undefined) count = 0;
      let i = 0;
      const p = new Vector(count + 1);
      for (i = 0;
        i < count; ++i) {
        p[i] = vs[i];
      }
      p[count] = p[0];
      let minArea = Number.MAX_VALUE;
      for (i = 1;
        i <= count; ++i) {
        const root = p[parseInt(i - 1)];
        let uxX = p[i].x - root.x;
        let uxY = p[i].y - root.y;
        const length = Math.sqrt(uxX * uxX + uxY * uxY);
        uxX /= length;
        uxY /= length;
        const uyX = (-uxY);
        const uyY = uxX;
        let lowerX = Number.MAX_VALUE;
        let lowerY = Number.MAX_VALUE;
        let upperX = (-Number.MAX_VALUE);
        let upperY = (-Number.MAX_VALUE);
        for (let j = 0; j < count; ++j) {
          const dX = p[j].x - root.x;
          const dY = p[j].y - root.y;
          const rX = (uxX * dX + uxY * dY);
          const rY = (uyX * dX + uyY * dY);
          if (rX < lowerX) lowerX = rX;
          if (rY < lowerY) lowerY = rY;
          if (rX > upperX) upperX = rX;
          if (rY > upperY) upperY = rY;
        }
        const area = (upperX - lowerX) * (upperY - lowerY);
        if (area < 0.95 * minArea) {
          minArea = area;
          obb.R.col1.x = uxX;
          obb.R.col1.y = uxY;
          obb.R.col2.x = uyX;
          obb.R.col2.y = uyY;
          const centerX = 0.5 * (lowerX + upperX);
          const centerY = 0.5 * (lowerY + upperY);
          const tMat = obb.R;
          obb.center.x = root.x + (tMat.col1.x * centerX + tMat.col2.x * centerY);
          obb.center.y = root.y + (tMat.col1.y * centerX + tMat.col2.y * centerY);
          obb.extents.x = 0.5 * (upperX - lowerX);
          obb.extents.y = 0.5 * (upperY - lowerY);
        }
      }
    };
    Box2D.postDefs.push(() => {
      Box2D.Collision.Shapes.b2PolygonShape.s_mat = new b2Mat22();
    });
    b2Shape.b2Shape = () => { };
    b2Shape.TestOverlap = (shape1, transform1, shape2, transform2) => {
      const input = new b2DistanceInput();
      input.proxyA = new b2DistanceProxy();
      input.proxyA.Set(shape1);
      input.proxyB = new b2DistanceProxy();
      input.proxyB.Set(shape2);
      input.transformA = transform1;
      input.transformB = transform2;
      input.useRadii = true;
      const simplexCache = new b2SimplexCache();
      simplexCache.count = 0;
      const output = new b2DistanceOutput();
      b2Distance.Distance(output, simplexCache, input);
      return output.distance < 10.0 * Number.MIN_VALUE;
    };
    Box2D.postDefs.push(() => {
      Box2D.Collision.Shapes.b2Shape.e_unknownShape = parseInt((-1));
      Box2D.Collision.Shapes.b2Shape.e_circleShape = 0;
      Box2D.Collision.Shapes.b2Shape.e_polygonShape = 1;
      Box2D.Collision.Shapes.b2Shape.e_edgeShape = 2;
      Box2D.Collision.Shapes.b2Shape.e_shapeTypeCount = 3;
      Box2D.Collision.Shapes.b2Shape.e_hitCollide = 1;
      Box2D.Collision.Shapes.b2Shape.e_missCollide = 0;
      Box2D.Collision.Shapes.b2Shape.e_startsInsideCollide = parseInt((-1));
    });
  }))();
  ((() => {
    const b2Color = Box2D.Common.b2Color;
    const b2internal = Box2D.Common.b2internal;
    const b2Settings = Box2D.Common.b2Settings;
    const b2Mat22 = Box2D.Common.Math.b2Mat22;
    const b2Mat33 = Box2D.Common.Math.b2Mat33;
    const b2Math = Box2D.Common.Math.b2Math;
    const b2Sweep = Box2D.Common.Math.b2Sweep;
    const b2Transform = Box2D.Common.Math.b2Transform;
    const b2Vec2 = Box2D.Common.Math.b2Vec2;
    const b2Vec3 = Box2D.Common.Math.b2Vec3;

    b2Settings.b2Settings = () => { };
    b2Settings.b2MixFriction = (friction1, friction2) => {
      if (friction1 === undefined) friction1 = 0;
      if (friction2 === undefined) friction2 = 0;
      return Math.sqrt(friction1 * friction2);
    };
    b2Settings.b2MixRestitution = (restitution1, restitution2) => {
      if (restitution1 === undefined) restitution1 = 0;
      if (restitution2 === undefined) restitution2 = 0;
      return restitution1 > restitution2 ? restitution1 : restitution2;
    };
    b2Settings.b2Assert = a => {
      if (!a) {
        throw 'Assertion Failed';
      }
    };
    Box2D.postDefs.push(() => {
      Box2D.Common.b2Settings.VERSION = '2.1alpha';
      Box2D.Common.b2Settings.USHRT_MAX = 0x0000ffff;
      Box2D.Common.b2Settings.b2_pi = Math.PI;
      Box2D.Common.b2Settings.b2_maxManifoldPoints = 2;
      Box2D.Common.b2Settings.b2_aabbExtension = 0.1;
      Box2D.Common.b2Settings.b2_aabbMultiplier = 2.0;
      Box2D.Common.b2Settings.b2_polygonRadius = 2.0 * b2Settings.b2_linearSlop;
      Box2D.Common.b2Settings.b2_linearSlop = 0.005;
      Box2D.Common.b2Settings.b2_angularSlop = 2.0 / 180.0 * b2Settings.b2_pi;
      Box2D.Common.b2Settings.b2_toiSlop = 8.0 * b2Settings.b2_linearSlop;
      Box2D.Common.b2Settings.b2_maxTOIContactsPerIsland = 32;
      Box2D.Common.b2Settings.b2_maxTOIJointsPerIsland = 32;
      Box2D.Common.b2Settings.b2_velocityThreshold = 1.0;
      Box2D.Common.b2Settings.b2_maxLinearCorrection = 0.2;
      Box2D.Common.b2Settings.b2_maxAngularCorrection = 8.0 / 180.0 * b2Settings.b2_pi;
      Box2D.Common.b2Settings.b2_maxTranslation = 2.0;
      Box2D.Common.b2Settings.b2_maxTranslationSquared = b2Settings.b2_maxTranslation * b2Settings.b2_maxTranslation;
      Box2D.Common.b2Settings.b2_maxRotation = 0.5 * b2Settings.b2_pi;
      Box2D.Common.b2Settings.b2_maxRotationSquared = b2Settings.b2_maxRotation * b2Settings.b2_maxRotation;
      Box2D.Common.b2Settings.b2_contactBaumgarte = 0.2;
      Box2D.Common.b2Settings.b2_timeToSleep = 0.5;
      Box2D.Common.b2Settings.b2_linearSleepTolerance = 0.01;
      Box2D.Common.b2Settings.b2_angularSleepTolerance = 2.0 / 180.0 * b2Settings.b2_pi;
    });
  }))();
  ((() => {
    const b2AABB = Box2D.Collision.b2AABB;
    const b2Color = Box2D.Common.b2Color;
    const b2internal = Box2D.Common.b2internal;
    const b2Settings = Box2D.Common.b2Settings;
    const b2Mat22 = Box2D.Common.Math.b2Mat22;
    const b2Mat33 = Box2D.Common.Math.b2Mat33;
    const b2Math = Box2D.Common.Math.b2Math;
    const b2Sweep = Box2D.Common.Math.b2Sweep;
    const b2Transform = Box2D.Common.Math.b2Transform;
    const b2Vec2 = Box2D.Common.Math.b2Vec2;
    const b2Vec3 = Box2D.Common.Math.b2Vec3;

    b2Mat22.FromAngle = angle => {
      if (angle === undefined) angle = 0;
      const mat = new b2Mat22();
      mat.Set(angle);
      return mat;
    };
    b2Mat22.FromVV = (c1, c2) => {
      const mat = new b2Mat22();
      mat.SetVV(c1, c2);
      return mat;
    };
    b2Math.b2Math = () => { };
    b2Math.IsValid = x => {
      if (x === undefined) x = 0;
      return isFinite(x);
    };
    b2Math.Dot = (a, b) => a.x * b.x + a.y * b.y;
    b2Math.CrossVV = (a, b) => a.x * b.y - a.y * b.x;
    b2Math.CrossVF = (a, s) => {
      if (s === undefined) s = 0;
      const v = new b2Vec2(s * a.y, (-s * a.x));
      return v;
    };
    b2Math.CrossFV = (s, a) => {
      if (s === undefined) s = 0;
      const v = new b2Vec2((-s * a.y), s * a.x);
      return v;
    };
    b2Math.MulMV = (A, v) => {
      const u = new b2Vec2(A.col1.x * v.x + A.col2.x * v.y, A.col1.y * v.x + A.col2.y * v.y);
      return u;
    };
    b2Math.MulTMV = (A, v) => {
      const u = new b2Vec2(b2Math.Dot(v, A.col1), b2Math.Dot(v, A.col2));
      return u;
    };
    b2Math.MulX = (T, v) => {
      const a = b2Math.MulMV(T.R, v);
      a.x += T.position.x;
      a.y += T.position.y;
      return a;
    };
    b2Math.MulXT = (T, v) => {
      const a = b2Math.SubtractVV(v, T.position);
      const tX = (a.x * T.R.col1.x + a.y * T.R.col1.y);
      a.y = (a.x * T.R.col2.x + a.y * T.R.col2.y);
      a.x = tX;
      return a;
    };
    b2Math.AddVV = (a, b) => {
      const v = new b2Vec2(a.x + b.x, a.y + b.y);
      return v;
    };
    b2Math.SubtractVV = (a, b) => {
      const v = new b2Vec2(a.x - b.x, a.y - b.y);
      return v;
    };
    b2Math.Distance = (a, b) => {
      const cX = a.x - b.x;
      const cY = a.y - b.y;
      return Math.sqrt(cX * cX + cY * cY);
    };
    b2Math.DistanceSquared = (a, b) => {
      const cX = a.x - b.x;
      const cY = a.y - b.y;
      return (cX * cX + cY * cY);
    };
    b2Math.MulFV = (s, a) => {
      if (s === undefined) s = 0;
      const v = new b2Vec2(s * a.x, s * a.y);
      return v;
    };
    b2Math.AddMM = (A, B) => {
      const C = b2Mat22.FromVV(b2Math.AddVV(A.col1, B.col1), b2Math.AddVV(A.col2, B.col2));
      return C;
    };
    b2Math.MulMM = (A, B) => {
      const C = b2Mat22.FromVV(b2Math.MulMV(A, B.col1), b2Math.MulMV(A, B.col2));
      return C;
    };
    b2Math.MulTMM = (A, B) => {
      const c1 = new b2Vec2(b2Math.Dot(A.col1, B.col1), b2Math.Dot(A.col2, B.col1));
      const c2 = new b2Vec2(b2Math.Dot(A.col1, B.col2), b2Math.Dot(A.col2, B.col2));
      const C = b2Mat22.FromVV(c1, c2);
      return C;
    };
    b2Math.Abs = a => {
      if (a === undefined) a = 0;
      return a > 0.0 ? a : (-a);
    };
    b2Math.AbsV = a => {
      const b = new b2Vec2(b2Math.Abs(a.x), b2Math.Abs(a.y));
      return b;
    };
    b2Math.AbsM = A => {
      const B = b2Mat22.FromVV(b2Math.AbsV(A.col1), b2Math.AbsV(A.col2));
      return B;
    };
    b2Math.Min = (a, b) => {
      if (a === undefined) a = 0;
      if (b === undefined) b = 0;
      return a < b ? a : b;
    };
    b2Math.MinV = (a, b) => {
      const c = new b2Vec2(b2Math.Min(a.x, b.x), b2Math.Min(a.y, b.y));
      return c;
    };
    b2Math.Max = (a, b) => {
      if (a === undefined) a = 0;
      if (b === undefined) b = 0;
      return a > b ? a : b;
    };
    b2Math.MaxV = (a, b) => {
      const c = new b2Vec2(b2Math.Max(a.x, b.x), b2Math.Max(a.y, b.y));
      return c;
    };
    b2Math.Clamp = (a, low, high) => {
      if (a === undefined) a = 0;
      if (low === undefined) low = 0;
      if (high === undefined) high = 0;
      return a < low ? low : a > high ? high : a;
    };
    b2Math.ClampV = (a, low, high) => b2Math.MaxV(low, b2Math.MinV(a, high));
    b2Math.Swap = (a, b) => {
      const tmp = a[0];
      a[0] = b[0];
      b[0] = tmp;
    };
    b2Math.Random = () => Math.random() * 2 - 1;
    b2Math.RandomRange = (lo, hi) => {
      if (lo === undefined) lo = 0;
      if (hi === undefined) hi = 0;
      let r = Math.random();
      r = (hi - lo) * r + lo;
      return r;
    };
    b2Math.NextPowerOfTwo = x => {
      if (x === undefined) x = 0;
      x |= (x >> 1) & 0x7FFFFFFF;
      x |= (x >> 2) & 0x3FFFFFFF;
      x |= (x >> 4) & 0x0FFFFFFF;
      x |= (x >> 8) & 0x00FFFFFF;
      x |= (x >> 16) & 0x0000FFFF;
      return x + 1;
    };
    b2Math.IsPowerOfTwo = x => {
      if (x === undefined) x = 0;
      const result = x > 0 && (x & (x - 1)) == 0;
      return result;
    };
    Box2D.postDefs.push(() => {
      Box2D.Common.Math.b2Math.b2Vec2_zero = new b2Vec2(0.0, 0.0);
      Box2D.Common.Math.b2Math.b2Mat22_identity = b2Mat22.FromVV(new b2Vec2(1.0, 0.0), new b2Vec2(0.0, 1.0));
      Box2D.Common.Math.b2Math.b2Transform_identity = new b2Transform(b2Math.b2Vec2_zero, b2Math.b2Mat22_identity);
    });
    b2Vec2.b2Vec2 = () => { };
    b2Vec2.Make = (x_, y_) => {
      if (x_ === undefined) x_ = 0;
      if (y_ === undefined) y_ = 0;
      return new b2Vec2(x_, y_);
    };
    b2Vec3.b2Vec3 = () => { };
  }))();
  ((() => {
    const b2ControllerEdge = Box2D.Dynamics.Controllers.b2ControllerEdge;
    const b2Mat22 = Box2D.Common.Math.b2Mat22;
    const b2Mat33 = Box2D.Common.Math.b2Mat33;
    const b2Math = Box2D.Common.Math.b2Math;
    const b2Sweep = Box2D.Common.Math.b2Sweep;
    const b2Transform = Box2D.Common.Math.b2Transform;
    const b2Vec2 = Box2D.Common.Math.b2Vec2;
    const b2Vec3 = Box2D.Common.Math.b2Vec3;
    const b2Color = Box2D.Common.b2Color;
    const b2internal = Box2D.Common.b2internal;
    const b2Settings = Box2D.Common.b2Settings;
    const b2AABB = Box2D.Collision.b2AABB;
    const b2Bound = Box2D.Collision.b2Bound;
    const b2BoundValues = Box2D.Collision.b2BoundValues;
    const b2Collision = Box2D.Collision.b2Collision;
    const b2ContactID = Box2D.Collision.b2ContactID;
    const b2ContactPoint = Box2D.Collision.b2ContactPoint;
    const b2Distance = Box2D.Collision.b2Distance;
    const b2DistanceInput = Box2D.Collision.b2DistanceInput;
    const b2DistanceOutput = Box2D.Collision.b2DistanceOutput;
    const b2DistanceProxy = Box2D.Collision.b2DistanceProxy;
    const b2DynamicTree = Box2D.Collision.b2DynamicTree;
    const b2DynamicTreeBroadPhase = Box2D.Collision.b2DynamicTreeBroadPhase;
    const b2DynamicTreeNode = Box2D.Collision.b2DynamicTreeNode;
    const b2DynamicTreePair = Box2D.Collision.b2DynamicTreePair;
    const b2Manifold = Box2D.Collision.b2Manifold;
    const b2ManifoldPoint = Box2D.Collision.b2ManifoldPoint;
    const b2Point = Box2D.Collision.b2Point;
    const b2RayCastInput = Box2D.Collision.b2RayCastInput;
    const b2RayCastOutput = Box2D.Collision.b2RayCastOutput;
    const b2Segment = Box2D.Collision.b2Segment;
    const b2SeparationFunction = Box2D.Collision.b2SeparationFunction;
    const b2Simplex = Box2D.Collision.b2Simplex;
    const b2SimplexCache = Box2D.Collision.b2SimplexCache;
    const b2SimplexVertex = Box2D.Collision.b2SimplexVertex;
    const b2TimeOfImpact = Box2D.Collision.b2TimeOfImpact;
    const b2TOIInput = Box2D.Collision.b2TOIInput;
    const b2WorldManifold = Box2D.Collision.b2WorldManifold;
    const ClipVertex = Box2D.Collision.ClipVertex;
    const Features = Box2D.Collision.Features;
    const IBroadPhase = Box2D.Collision.IBroadPhase;
    const b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
    const b2EdgeChainDef = Box2D.Collision.Shapes.b2EdgeChainDef;
    const b2EdgeShape = Box2D.Collision.Shapes.b2EdgeShape;
    const b2MassData = Box2D.Collision.Shapes.b2MassData;
    const b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
    const b2Shape = Box2D.Collision.Shapes.b2Shape;
    const b2Body = Box2D.Dynamics.b2Body;
    const b2BodyDef = Box2D.Dynamics.b2BodyDef;
    const b2ContactFilter = Box2D.Dynamics.b2ContactFilter;
    const b2ContactImpulse = Box2D.Dynamics.b2ContactImpulse;
    const b2ContactListener = Box2D.Dynamics.b2ContactListener;
    const b2ContactManager = Box2D.Dynamics.b2ContactManager;
    const b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
    const b2DestructionListener = Box2D.Dynamics.b2DestructionListener;
    const b2FilterData = Box2D.Dynamics.b2FilterData;
    const b2Fixture = Box2D.Dynamics.b2Fixture;
    const b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
    const b2Island = Box2D.Dynamics.b2Island;
    const b2TimeStep = Box2D.Dynamics.b2TimeStep;
    const b2World = Box2D.Dynamics.b2World;
    const b2CircleContact = Box2D.Dynamics.Contacts.b2CircleContact;
    const b2Contact = Box2D.Dynamics.Contacts.b2Contact;
    const b2ContactConstraint = Box2D.Dynamics.Contacts.b2ContactConstraint;
    const b2ContactConstraintPoint = Box2D.Dynamics.Contacts.b2ContactConstraintPoint;
    const b2ContactEdge = Box2D.Dynamics.Contacts.b2ContactEdge;
    const b2ContactFactory = Box2D.Dynamics.Contacts.b2ContactFactory;
    const b2ContactRegister = Box2D.Dynamics.Contacts.b2ContactRegister;
    const b2ContactResult = Box2D.Dynamics.Contacts.b2ContactResult;
    const b2ContactSolver = Box2D.Dynamics.Contacts.b2ContactSolver;
    const b2EdgeAndCircleContact = Box2D.Dynamics.Contacts.b2EdgeAndCircleContact;
    const b2NullContact = Box2D.Dynamics.Contacts.b2NullContact;
    const b2PolyAndCircleContact = Box2D.Dynamics.Contacts.b2PolyAndCircleContact;
    const b2PolyAndEdgeContact = Box2D.Dynamics.Contacts.b2PolyAndEdgeContact;
    const b2PolygonContact = Box2D.Dynamics.Contacts.b2PolygonContact;
    const b2PositionSolverManifold = Box2D.Dynamics.Contacts.b2PositionSolverManifold;
    const b2Controller = Box2D.Dynamics.Controllers.b2Controller;
    const b2DistanceJoint = Box2D.Dynamics.Joints.b2DistanceJoint;
    const b2DistanceJointDef = Box2D.Dynamics.Joints.b2DistanceJointDef;
    const b2FrictionJoint = Box2D.Dynamics.Joints.b2FrictionJoint;
    const b2FrictionJointDef = Box2D.Dynamics.Joints.b2FrictionJointDef;
    const b2GearJoint = Box2D.Dynamics.Joints.b2GearJoint;
    const b2GearJointDef = Box2D.Dynamics.Joints.b2GearJointDef;
    const b2Jacobian = Box2D.Dynamics.Joints.b2Jacobian;
    const b2Joint = Box2D.Dynamics.Joints.b2Joint;
    const b2JointDef = Box2D.Dynamics.Joints.b2JointDef;
    const b2JointEdge = Box2D.Dynamics.Joints.b2JointEdge;
    const b2LineJoint = Box2D.Dynamics.Joints.b2LineJoint;
    const b2LineJointDef = Box2D.Dynamics.Joints.b2LineJointDef;
    const b2MouseJoint = Box2D.Dynamics.Joints.b2MouseJoint;
    const b2MouseJointDef = Box2D.Dynamics.Joints.b2MouseJointDef;
    const b2PrismaticJoint = Box2D.Dynamics.Joints.b2PrismaticJoint;
    const b2PrismaticJointDef = Box2D.Dynamics.Joints.b2PrismaticJointDef;
    const b2PulleyJoint = Box2D.Dynamics.Joints.b2PulleyJoint;
    const b2PulleyJointDef = Box2D.Dynamics.Joints.b2PulleyJointDef;
    const b2RevoluteJoint = Box2D.Dynamics.Joints.b2RevoluteJoint;
    const b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef;
    const b2WeldJoint = Box2D.Dynamics.Joints.b2WeldJoint;
    const b2WeldJointDef = Box2D.Dynamics.Joints.b2WeldJointDef;

    Box2D.postDefs.push(() => {
      Box2D.Dynamics.b2Body.s_xf1 = new b2Transform();
      Box2D.Dynamics.b2Body.e_islandFlag = 0x0001;
      Box2D.Dynamics.b2Body.e_awakeFlag = 0x0002;
      Box2D.Dynamics.b2Body.e_allowSleepFlag = 0x0004;
      Box2D.Dynamics.b2Body.e_bulletFlag = 0x0008;
      Box2D.Dynamics.b2Body.e_fixedRotationFlag = 0x0010;
      Box2D.Dynamics.b2Body.e_activeFlag = 0x0020;
      Box2D.Dynamics.b2Body.b2_staticBody = 0;
      Box2D.Dynamics.b2Body.b2_kinematicBody = 1;
      Box2D.Dynamics.b2Body.b2_dynamicBody = 2;
    });
    b2ContactFilter.b2ContactFilter = () => { };
    Box2D.postDefs.push(() => {
      Box2D.Dynamics.b2ContactFilter.b2_defaultFilter = new b2ContactFilter();
    });
    b2ContactListener.b2ContactListener = () => { };
    Box2D.postDefs.push(() => {
      Box2D.Dynamics.b2ContactListener.b2_defaultListener = new b2ContactListener();
    });
    b2ContactManager.b2ContactManager = () => { };
    Box2D.postDefs.push(() => {
      Box2D.Dynamics.b2ContactManager.s_evalCP = new b2ContactPoint();
    });
    b2DebugDraw.b2DebugDraw = () => { };
    Box2D.postDefs.push(() => {
      Box2D.Dynamics.b2DebugDraw.e_shapeBit = 0x0001;
      Box2D.Dynamics.b2DebugDraw.e_jointBit = 0x0002;
      Box2D.Dynamics.b2DebugDraw.e_aabbBit = 0x0004;
      Box2D.Dynamics.b2DebugDraw.e_pairBit = 0x0008;
      Box2D.Dynamics.b2DebugDraw.e_centerOfMassBit = 0x0010;
      Box2D.Dynamics.b2DebugDraw.e_controllerBit = 0x0020;
    });
    b2DestructionListener.b2DestructionListener = () => { };
    b2Island.b2Island = () => { };
    Box2D.postDefs.push(() => {
      Box2D.Dynamics.b2Island.s_impulse = new b2ContactImpulse();
    });
    b2TimeStep.b2TimeStep = () => { };
    Box2D.postDefs.push(() => {
      Box2D.Dynamics.b2World.s_timestep2 = new b2TimeStep();
      Box2D.Dynamics.b2World.s_xf = new b2Transform();
      Box2D.Dynamics.b2World.s_backupA = new b2Sweep();
      Box2D.Dynamics.b2World.s_backupB = new b2Sweep();
      Box2D.Dynamics.b2World.s_timestep = new b2TimeStep();
      Box2D.Dynamics.b2World.s_queue = new Vector();
      Box2D.Dynamics.b2World.s_jointColor = new b2Color(0.5, 0.8, 0.8);
      Box2D.Dynamics.b2World.e_newFixture = 0x0001;
      Box2D.Dynamics.b2World.e_locked = 0x0002;
    });
  }))();
  ((() => {
    const b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
    const b2EdgeChainDef = Box2D.Collision.Shapes.b2EdgeChainDef;
    const b2EdgeShape = Box2D.Collision.Shapes.b2EdgeShape;
    const b2MassData = Box2D.Collision.Shapes.b2MassData;
    const b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
    const b2Shape = Box2D.Collision.Shapes.b2Shape;
    const b2CircleContact = Box2D.Dynamics.Contacts.b2CircleContact;
    const b2Contact = Box2D.Dynamics.Contacts.b2Contact;
    const b2ContactConstraint = Box2D.Dynamics.Contacts.b2ContactConstraint;
    const b2ContactConstraintPoint = Box2D.Dynamics.Contacts.b2ContactConstraintPoint;
    const b2ContactEdge = Box2D.Dynamics.Contacts.b2ContactEdge;
    const b2ContactFactory = Box2D.Dynamics.Contacts.b2ContactFactory;
    const b2ContactRegister = Box2D.Dynamics.Contacts.b2ContactRegister;
    const b2ContactResult = Box2D.Dynamics.Contacts.b2ContactResult;
    const b2ContactSolver = Box2D.Dynamics.Contacts.b2ContactSolver;
    const b2EdgeAndCircleContact = Box2D.Dynamics.Contacts.b2EdgeAndCircleContact;
    const b2NullContact = Box2D.Dynamics.Contacts.b2NullContact;
    const b2PolyAndCircleContact = Box2D.Dynamics.Contacts.b2PolyAndCircleContact;
    const b2PolyAndEdgeContact = Box2D.Dynamics.Contacts.b2PolyAndEdgeContact;
    const b2PolygonContact = Box2D.Dynamics.Contacts.b2PolygonContact;
    const b2PositionSolverManifold = Box2D.Dynamics.Contacts.b2PositionSolverManifold;
    const b2Body = Box2D.Dynamics.b2Body;
    const b2BodyDef = Box2D.Dynamics.b2BodyDef;
    const b2ContactFilter = Box2D.Dynamics.b2ContactFilter;
    const b2ContactImpulse = Box2D.Dynamics.b2ContactImpulse;
    const b2ContactListener = Box2D.Dynamics.b2ContactListener;
    const b2ContactManager = Box2D.Dynamics.b2ContactManager;
    const b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
    const b2DestructionListener = Box2D.Dynamics.b2DestructionListener;
    const b2FilterData = Box2D.Dynamics.b2FilterData;
    const b2Fixture = Box2D.Dynamics.b2Fixture;
    const b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
    const b2Island = Box2D.Dynamics.b2Island;
    const b2TimeStep = Box2D.Dynamics.b2TimeStep;
    const b2World = Box2D.Dynamics.b2World;
    const b2Color = Box2D.Common.b2Color;
    const b2internal = Box2D.Common.b2internal;
    const b2Settings = Box2D.Common.b2Settings;
    const b2Mat22 = Box2D.Common.Math.b2Mat22;
    const b2Mat33 = Box2D.Common.Math.b2Mat33;
    const b2Math = Box2D.Common.Math.b2Math;
    const b2Sweep = Box2D.Common.Math.b2Sweep;
    const b2Transform = Box2D.Common.Math.b2Transform;
    const b2Vec2 = Box2D.Common.Math.b2Vec2;
    const b2Vec3 = Box2D.Common.Math.b2Vec3;
    const b2AABB = Box2D.Collision.b2AABB;
    const b2Bound = Box2D.Collision.b2Bound;
    const b2BoundValues = Box2D.Collision.b2BoundValues;
    const b2Collision = Box2D.Collision.b2Collision;
    const b2ContactID = Box2D.Collision.b2ContactID;
    const b2ContactPoint = Box2D.Collision.b2ContactPoint;
    const b2Distance = Box2D.Collision.b2Distance;
    const b2DistanceInput = Box2D.Collision.b2DistanceInput;
    const b2DistanceOutput = Box2D.Collision.b2DistanceOutput;
    const b2DistanceProxy = Box2D.Collision.b2DistanceProxy;
    const b2DynamicTree = Box2D.Collision.b2DynamicTree;
    const b2DynamicTreeBroadPhase = Box2D.Collision.b2DynamicTreeBroadPhase;
    const b2DynamicTreeNode = Box2D.Collision.b2DynamicTreeNode;
    const b2DynamicTreePair = Box2D.Collision.b2DynamicTreePair;
    const b2Manifold = Box2D.Collision.b2Manifold;
    const b2ManifoldPoint = Box2D.Collision.b2ManifoldPoint;
    const b2Point = Box2D.Collision.b2Point;
    const b2RayCastInput = Box2D.Collision.b2RayCastInput;
    const b2RayCastOutput = Box2D.Collision.b2RayCastOutput;
    const b2Segment = Box2D.Collision.b2Segment;
    const b2SeparationFunction = Box2D.Collision.b2SeparationFunction;
    const b2Simplex = Box2D.Collision.b2Simplex;
    const b2SimplexCache = Box2D.Collision.b2SimplexCache;
    const b2SimplexVertex = Box2D.Collision.b2SimplexVertex;
    const b2TimeOfImpact = Box2D.Collision.b2TimeOfImpact;
    const b2TOIInput = Box2D.Collision.b2TOIInput;
    const b2WorldManifold = Box2D.Collision.b2WorldManifold;
    const ClipVertex = Box2D.Collision.ClipVertex;
    const Features = Box2D.Collision.Features;
    const IBroadPhase = Box2D.Collision.IBroadPhase;

    b2CircleContact.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype;
    b2CircleContact.Create = allocator => new b2CircleContact();
    b2CircleContact.Destroy = (contact, allocator) => { };
    Box2D.postDefs.push(() => {
      Box2D.Dynamics.Contacts.b2Contact.e_sensorFlag = 0x0001;
      Box2D.Dynamics.Contacts.b2Contact.e_continuousFlag = 0x0002;
      Box2D.Dynamics.Contacts.b2Contact.e_islandFlag = 0x0004;
      Box2D.Dynamics.Contacts.b2Contact.e_toiFlag = 0x0008;
      Box2D.Dynamics.Contacts.b2Contact.e_touchingFlag = 0x0010;
      Box2D.Dynamics.Contacts.b2Contact.e_enabledFlag = 0x0020;
      Box2D.Dynamics.Contacts.b2Contact.e_filterFlag = 0x0040;
      Box2D.Dynamics.Contacts.b2Contact.s_input = new b2TOIInput();
    });
    b2ContactEdge.b2ContactEdge = () => { };
    b2ContactFactory.b2ContactFactory = () => { };
    b2ContactRegister.b2ContactRegister = () => { };
    Box2D.postDefs.push(() => {
      Box2D.Dynamics.Contacts.b2ContactSolver.s_worldManifold = new b2WorldManifold();
      Box2D.Dynamics.Contacts.b2ContactSolver.s_psm = new b2PositionSolverManifold();
    });
    b2EdgeAndCircleContact.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype;
    b2EdgeAndCircleContact.Create = allocator => new b2EdgeAndCircleContact();
    b2EdgeAndCircleContact.Destroy = (contact, allocator) => { };
    b2NullContact.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype;
    b2PolyAndCircleContact.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype;
    b2PolyAndCircleContact.Create = allocator => new b2PolyAndCircleContact();
    b2PolyAndCircleContact.Destroy = (contact, allocator) => { };
    b2PolyAndEdgeContact.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype;
    b2PolyAndEdgeContact.Create = allocator => new b2PolyAndEdgeContact();
    b2PolyAndEdgeContact.Destroy = (contact, allocator) => { };
    b2PolygonContact.prototype.__super = Box2D.Dynamics.Contacts.b2Contact.prototype;
    b2PolygonContact.Create = allocator => new b2PolygonContact();
    b2PolygonContact.Destroy = (contact, allocator) => { };
    b2PositionSolverManifold.b2PositionSolverManifold = () => { };
    Box2D.postDefs.push(() => {
      Box2D.Dynamics.Contacts.b2PositionSolverManifold.circlePointA = new b2Vec2();
      Box2D.Dynamics.Contacts.b2PositionSolverManifold.circlePointB = new b2Vec2();
    });
  }))();
  ((() => {
    const b2Body = Box2D.Dynamics.b2Body;
    const b2BodyDef = Box2D.Dynamics.b2BodyDef;
    const b2ContactFilter = Box2D.Dynamics.b2ContactFilter;
    const b2ContactImpulse = Box2D.Dynamics.b2ContactImpulse;
    const b2ContactListener = Box2D.Dynamics.b2ContactListener;
    const b2ContactManager = Box2D.Dynamics.b2ContactManager;
    const b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
    const b2DestructionListener = Box2D.Dynamics.b2DestructionListener;
    const b2FilterData = Box2D.Dynamics.b2FilterData;
    const b2Fixture = Box2D.Dynamics.b2Fixture;
    const b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
    const b2Island = Box2D.Dynamics.b2Island;
    const b2TimeStep = Box2D.Dynamics.b2TimeStep;
    const b2World = Box2D.Dynamics.b2World;
    const b2Mat22 = Box2D.Common.Math.b2Mat22;
    const b2Mat33 = Box2D.Common.Math.b2Mat33;
    const b2Math = Box2D.Common.Math.b2Math;
    const b2Sweep = Box2D.Common.Math.b2Sweep;
    const b2Transform = Box2D.Common.Math.b2Transform;
    const b2Vec2 = Box2D.Common.Math.b2Vec2;
    const b2Vec3 = Box2D.Common.Math.b2Vec3;
    const b2Color = Box2D.Common.b2Color;
    const b2internal = Box2D.Common.b2internal;
    const b2Settings = Box2D.Common.b2Settings;
    const b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
    const b2EdgeChainDef = Box2D.Collision.Shapes.b2EdgeChainDef;
    const b2EdgeShape = Box2D.Collision.Shapes.b2EdgeShape;
    const b2MassData = Box2D.Collision.Shapes.b2MassData;
    const b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
    const b2Shape = Box2D.Collision.Shapes.b2Shape;
    const b2BuoyancyController = Box2D.Dynamics.Controllers.b2BuoyancyController;
    const b2ConstantAccelController = Box2D.Dynamics.Controllers.b2ConstantAccelController;
    const b2ConstantForceController = Box2D.Dynamics.Controllers.b2ConstantForceController;
    const b2Controller = Box2D.Dynamics.Controllers.b2Controller;
    const b2ControllerEdge = Box2D.Dynamics.Controllers.b2ControllerEdge;
    const b2GravityController = Box2D.Dynamics.Controllers.b2GravityController;
    const b2TensorDampingController = Box2D.Dynamics.Controllers.b2TensorDampingController;

    b2BuoyancyController.prototype.__super = Box2D.Dynamics.Controllers.b2Controller.prototype;
    b2ConstantAccelController.prototype.__super = Box2D.Dynamics.Controllers.b2Controller.prototype;
    b2ConstantForceController.prototype.__super = Box2D.Dynamics.Controllers.b2Controller.prototype;
    b2Controller.b2Controller = () => { };
    b2ControllerEdge.b2ControllerEdge = () => { };
    b2GravityController.prototype.__super = Box2D.Dynamics.Controllers.b2Controller.prototype;
    b2TensorDampingController.prototype.__super = Box2D.Dynamics.Controllers.b2Controller.prototype;
  }))();
  ((() => {
    const b2Color = Box2D.Common.b2Color;
    const b2internal = Box2D.Common.b2internal;
    const b2Settings = Box2D.Common.b2Settings;
    const b2Mat22 = Box2D.Common.Math.b2Mat22;
    const b2Mat33 = Box2D.Common.Math.b2Mat33;
    const b2Math = Box2D.Common.Math.b2Math;
    const b2Sweep = Box2D.Common.Math.b2Sweep;
    const b2Transform = Box2D.Common.Math.b2Transform;
    const b2Vec2 = Box2D.Common.Math.b2Vec2;
    const b2Vec3 = Box2D.Common.Math.b2Vec3;
    const b2DistanceJoint = Box2D.Dynamics.Joints.b2DistanceJoint;
    const b2DistanceJointDef = Box2D.Dynamics.Joints.b2DistanceJointDef;
    const b2FrictionJoint = Box2D.Dynamics.Joints.b2FrictionJoint;
    const b2FrictionJointDef = Box2D.Dynamics.Joints.b2FrictionJointDef;
    const b2GearJoint = Box2D.Dynamics.Joints.b2GearJoint;
    const b2GearJointDef = Box2D.Dynamics.Joints.b2GearJointDef;
    const b2Jacobian = Box2D.Dynamics.Joints.b2Jacobian;
    const b2Joint = Box2D.Dynamics.Joints.b2Joint;
    const b2JointDef = Box2D.Dynamics.Joints.b2JointDef;
    const b2JointEdge = Box2D.Dynamics.Joints.b2JointEdge;
    const b2LineJoint = Box2D.Dynamics.Joints.b2LineJoint;
    const b2LineJointDef = Box2D.Dynamics.Joints.b2LineJointDef;
    const b2MouseJoint = Box2D.Dynamics.Joints.b2MouseJoint;
    const b2MouseJointDef = Box2D.Dynamics.Joints.b2MouseJointDef;
    const b2PrismaticJoint = Box2D.Dynamics.Joints.b2PrismaticJoint;
    const b2PrismaticJointDef = Box2D.Dynamics.Joints.b2PrismaticJointDef;
    const b2PulleyJoint = Box2D.Dynamics.Joints.b2PulleyJoint;
    const b2PulleyJointDef = Box2D.Dynamics.Joints.b2PulleyJointDef;
    const b2RevoluteJoint = Box2D.Dynamics.Joints.b2RevoluteJoint;
    const b2RevoluteJointDef = Box2D.Dynamics.Joints.b2RevoluteJointDef;
    const b2WeldJoint = Box2D.Dynamics.Joints.b2WeldJoint;
    const b2WeldJointDef = Box2D.Dynamics.Joints.b2WeldJointDef;
    const b2Body = Box2D.Dynamics.b2Body;
    const b2BodyDef = Box2D.Dynamics.b2BodyDef;
    const b2ContactFilter = Box2D.Dynamics.b2ContactFilter;
    const b2ContactImpulse = Box2D.Dynamics.b2ContactImpulse;
    const b2ContactListener = Box2D.Dynamics.b2ContactListener;
    const b2ContactManager = Box2D.Dynamics.b2ContactManager;
    const b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
    const b2DestructionListener = Box2D.Dynamics.b2DestructionListener;
    const b2FilterData = Box2D.Dynamics.b2FilterData;
    const b2Fixture = Box2D.Dynamics.b2Fixture;
    const b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
    const b2Island = Box2D.Dynamics.b2Island;
    const b2TimeStep = Box2D.Dynamics.b2TimeStep;
    const b2World = Box2D.Dynamics.b2World;

    b2DistanceJoint.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
    b2DistanceJointDef.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
    b2FrictionJoint.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
    b2FrictionJointDef.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
    b2GearJoint.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
    b2GearJointDef.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
    b2Joint.Create = (def, allocator) => {
      let joint = null;
      switch (def.type) {
        case b2Joint.e_distanceJoint:
          {
            joint = new b2DistanceJoint((def instanceof b2DistanceJointDef ? def : null));
          }
          break;
        case b2Joint.e_mouseJoint:
          {
            joint = new b2MouseJoint((def instanceof b2MouseJointDef ? def : null));
          }
          break;
        case b2Joint.e_prismaticJoint:
          {
            joint = new b2PrismaticJoint((def instanceof b2PrismaticJointDef ? def : null));
          }
          break;
        case b2Joint.e_revoluteJoint:
          {
            joint = new b2RevoluteJoint((def instanceof b2RevoluteJointDef ? def : null));
          }
          break;
        case b2Joint.e_pulleyJoint:
          {
            joint = new b2PulleyJoint((def instanceof b2PulleyJointDef ? def : null));
          }
          break;
        case b2Joint.e_gearJoint:
          {
            joint = new b2GearJoint((def instanceof b2GearJointDef ? def : null));
          }
          break;
        case b2Joint.e_lineJoint:
          {
            joint = new b2LineJoint((def instanceof b2LineJointDef ? def : null));
          }
          break;
        case b2Joint.e_weldJoint:
          {
            joint = new b2WeldJoint((def instanceof b2WeldJointDef ? def : null));
          }
          break;
        case b2Joint.e_frictionJoint:
          {
            joint = new b2FrictionJoint((def instanceof b2FrictionJointDef ? def : null));
          }
          break;
        default:
          break;
      }
      return joint;
    };
    b2Joint.Destroy = (joint, allocator) => { };
    Box2D.postDefs.push(() => {
      Box2D.Dynamics.Joints.b2Joint.e_unknownJoint = 0;
      Box2D.Dynamics.Joints.b2Joint.e_revoluteJoint = 1;
      Box2D.Dynamics.Joints.b2Joint.e_prismaticJoint = 2;
      Box2D.Dynamics.Joints.b2Joint.e_distanceJoint = 3;
      Box2D.Dynamics.Joints.b2Joint.e_pulleyJoint = 4;
      Box2D.Dynamics.Joints.b2Joint.e_mouseJoint = 5;
      Box2D.Dynamics.Joints.b2Joint.e_gearJoint = 6;
      Box2D.Dynamics.Joints.b2Joint.e_lineJoint = 7;
      Box2D.Dynamics.Joints.b2Joint.e_weldJoint = 8;
      Box2D.Dynamics.Joints.b2Joint.e_frictionJoint = 9;
      Box2D.Dynamics.Joints.b2Joint.e_inactiveLimit = 0;
      Box2D.Dynamics.Joints.b2Joint.e_atLowerLimit = 1;
      Box2D.Dynamics.Joints.b2Joint.e_atUpperLimit = 2;
      Box2D.Dynamics.Joints.b2Joint.e_equalLimits = 3;
    });
    b2JointDef.b2JointDef = () => { };
    b2JointEdge.b2JointEdge = () => { };
    b2LineJoint.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
    b2LineJointDef.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
    b2MouseJoint.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
    b2MouseJointDef.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
    b2PrismaticJoint.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
    b2PrismaticJointDef.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
    b2PulleyJoint.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
    Box2D.postDefs.push(() => {
      Box2D.Dynamics.Joints.b2PulleyJoint.b2_minPulleyLength = 2.0;
    });
    b2PulleyJointDef.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
    b2RevoluteJoint.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
    Box2D.postDefs.push(() => {
      Box2D.Dynamics.Joints.b2RevoluteJoint.tImpulse = new b2Vec2();
    });
    b2RevoluteJointDef.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
    b2WeldJoint.prototype.__super = Box2D.Dynamics.Joints.b2Joint.prototype;
    b2WeldJointDef.prototype.__super = Box2D.Dynamics.Joints.b2JointDef.prototype;
  }))();
  ((() => {
    const b2DebugDraw = Box2D.Dynamics.b2DebugDraw;
  }))();
  let i;
  for (i = 0; i < Box2D.postDefs.length; ++i) Box2D.postDefs[i]();

  Scratch.extensions.register(new BoxPhys());
})(Scratch);
