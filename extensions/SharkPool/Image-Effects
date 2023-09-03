// Name: Image Effects
// ID: imgEffectsSP
// Description: Apply a variety of new effects to the data URI of Images or Costumes.
// By: SharkPool <https://github.com/SharkPool-SP>

// Version V.1.0.0

(function (Scratch) {
  'use strict';

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('Image Effects extension must run unsandboxed');
  }

  const menuIconURI = 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxMzUuNzMwNjQiIGhlaWdodD0iMTM1LjczMDY0IiB2aWV3Qm94PSIwLDAsMTM1LjczMDY0LDEzNS43MzA2NCI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE3Mi4xMzQ2OCwtMTEyLjEzNDY4KSI+PGcgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aXNQYWludGluZ0xheWVyJnF1b3Q7OnRydWV9IiBmaWxsPSIjOTk2NmZmIiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMTc1Ljg4NDY4LDE4MGMwLC0zNS40MDk5MSAyOC43MDU0MSwtNjQuMTE1MzIgNjQuMTE1MzIsLTY0LjExNTMyYzM1LjQwOTkxLDAgNjQuMTE1MzIsMjguNzA1NDEgNjQuMTE1MzIsNjQuMTE1MzJjMCwzNS40MDk5MSAtMjguNzA1NDEsNjQuMTE1MzIgLTY0LjExNTMyLDY0LjExNTMyYy0zNS40MDk5MSwwIC02NC4xMTUzMiwtMjguNzA1NDEgLTY0LjExNTMyLC02NC4xMTUzMnoiIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2luZGV4JnF1b3Q7Om51bGx9IiBzdHJva2U9IiM3NzRkY2IiIHN0cm9rZS13aWR0aD0iNy41Ii8+PHBhdGggZD0iTTI0MC40NDQ3MSwxNzMuMjY3NjJjNC4wOTQ5MiwtMS42NzM4NiA5LjMwMjQ5LC0xLjE5MDEgMTIuMTM5MDIsLTUuMDU1MzljMi45NDAxOSwtNC4wMDY1NSAzLjgyMTg1LC0xMi4zNTQ5MyA0LjQ0ODA0LC0xNy4yNTg2MWMwLjYxMDA3LC00Ljc3NzQ5IDEuNzYyMTIsLTQuNjEwOTMgMi42MzYyMywwLjI0MTA0YzAuOTI1MDIsNS4xMzQ1MyAyLjAzNDk4LDEzLjY3Njk1IDQuNjU0MTcsMTcuMjQ2MDhjMi45OTI4OSw0LjA3ODM3IDguOTIyODMsMy44NDQ2MiAxMy4zMDU3Miw1LjUyMjUyYzMuMDc3MjksMS4xNzgwNyAyLjgwMzA3LDEuODUyNzYgLTAuNTU3NTMsMi41NjMxOGMtNC4zMTUyNSwwLjkxMjIyIC05LjkwMjk2LDEuNjU3MSAtMTIuOTE1ODksNS43NjI3N2MtMy4xNzkwMyw0LjMzMjAyIC00LjI2MTk4LDE0LjY4OTEyIC01LjAwNjEyLDIwLjg0MjU5Yy0wLjUxMDM2LDQuMjIwMjYgLTEuOTQ5MjEsMi40MjI2MiAtMi4yMTYzMiwwLjI3NjAxYy0wLjc3MDA3LC02LjE4ODY3IC0xLjk2NjQ1LC0xNi44MzA3NiAtNS41MjIxNiwtMjEuNjc2MDdjLTIuNTE2NjgsLTMuNDI5NDQgLTYuNjk2MjksLTQuMDQ3ODUgLTEwLjExNzcyLC01LjAwMDM5Yy00LjYxNjIsLTEuMjg1MTggLTUuMTMyNDYsLTEuNzEyMTUgLTAuODQ3NDUsLTMuNDYzNzJ6IiBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpbmRleCZxdW90OzpudWxsfSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjE1Ii8+PHBhdGggZD0iTTI1Mi41ODM3MywxNjguMjEyMjNjMi45NDAxOSwtNC4wMDY1NSAyLjgyMTg1LC0xMi4zNTQ5MiAzLjQ0ODA0LC0xNy4yNTg2YzAuNjEwMDcsLTQuNzc3NDkgMy44NzMyMywtNC42MTA5MyA0Ljc0NzM0LDAuMjQxMDRjMC45MjUwMiw1LjEzNDUzIDAuOTIzODcsMTMuNjc2OTUgMy41NDMwNiwxNy4yNDYwOGMyLjk5Mjg5LDQuMDc4MzcgOC4zNjcyNywyLjczMzUxIDEyLjc1MDE2LDQuNDExNGMzLjA3NzI5LDEuMTc4MDcgMy4zNTg2MywzLjg1Mjc2IC0wLjAwMTk3LDQuNTYzMThjLTQuMzE1MjUsMC45MTIyMiAtOS45MDI5NiwwLjc2ODIxIC0xMi45MTU4OSw0Ljg3Mzg4Yy0zLjE3OTAzLDQuMzMyMDIgLTMuNDg0MiwxNC45MTEzNCAtNC4yMjgzMywyMS4wNjQ4MWMtMC41MTAzNiw0LjIyMDI2IC0zLjcyNjk5LDIuMjAwNCAtMy45OTQxLDAuMDUzNzljLTAuNzcwMDcsLTYuMTg4NjcgLTAuOTY2NDUsLTE2LjgzMDc2IC00LjUyMjE2LC0yMS42NzYwN2MtMi41MTY2OCwtMy40Mjk0NCAtNy40NzQwNywtMy4zODExOCAtMTAuODk1NSwtNC4zMzM3MmMtNC42MTYyLC0xLjI4NTE4IC00LjM1NDY4LC0zLjI2NzcxIC0wLjA2OTY3LC01LjAxOTI4YzAsMCA5LjMwMjQ5LC0wLjMwMTIzIDEyLjEzOTAyLC00LjE2NjUxeiIgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aW5kZXgmcXVvdDs6bnVsbH0iIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIwIi8+PHBhdGggZD0iTTIxNC4xNjUzMSwxNTIuMzM0NzJjMS40OTI4MiwtMS42NDY2OSAxLjk0MDQ3LC01LjA3Nzg3IDIuMjU4NCwtNy4wOTMyOGMwLjMwOTc1LC0xLjk2MzU1IDAuODk0NjcsLTEuODk1MDkgMS4zMzg0OSwwLjA5OTA2YzAuNDY5NjYsMi4xMTAyOSAxLjAzMzIyLDUuNjIxMjMgMi4zNjMwNiw3LjA4ODE0YzEuNTE5NTgsMS42NzYyMSA0LjUzMDM3LDEuNTgwMTMgNi43NTU3LDIuMjY5NzVjMS41NjI0MywwLjQ4NDE4IDEuNDIzMiwwLjc2MTQ4IC0wLjI4MzA3LDEuMDUzNDZjLTIuMTkwOTgsMC4zNzQ5MiAtNS4wMjgwMSwwLjY4MTA3IC02LjU1Nzc2LDIuMzY4NWMtMS42MTQwOCwxLjc4MDQ2IC0yLjE2MzkzLDYuMDM3MjIgLTIuNTQxNzUsOC41NjYyOWMtMC4yNTkxMiwxLjczNDUyIC0wLjk4OTY3LDAuOTk1NyAtMS4xMjUyOSwwLjExMzQ0Yy0wLjM5MDk5LC0yLjU0MzU0IC0wLjk5ODQyLC02LjkxNzQ0IC0yLjgwMzc2LC04LjkwODg2Yy0xLjI3Nzc5LC0xLjQwOTUgLTMuMzk5OSwtMS42NjM2NyAtNS4xMzcwNiwtMi4wNTUxNmMtMi4zNDM3NywtMC41MjgyMSAtMi42MDU5LC0wLjcwMzcgLTAuNDMwMjcsLTEuNDIzNTljMCwwIDQuNzIzMTMsLTAuNDg5MTIgNi4xNjMzMSwtMi4wNzc3NXoiIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2luZGV4JnF1b3Q7Om51bGx9IiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMTAiLz48cGF0aCBkPSJNMjE0LjE2NTMxLDE1Mi4zMzQ3MmMxLjQ5MjgyLC0xLjY0NjY5IDEuMjczODEsLTQuOTY2NzYgMS41OTE3NCwtNi45ODIxN2MwLjMwOTc1LC0xLjk2MzU1IDIuMTE2ODksLTIuMDA2MiAyLjU2MDcsLTAuMDEyMDVjMC40Njk2NiwyLjExMDI5IDAuNDc3NjcsNS42MjEyMyAxLjgwNzUxLDcuMDg4MTRjMS41MTk1OCwxLjY3NjIxIDQuMzA4MTUsMC42MzU2OCA2LjUzMzQ4LDEuMzI1M2MxLjU2MjQzLDAuNDg0MTggMS42NDU0MiwyLjI2MTQ4IC0wLjA2MDg1LDIuNTUzNDZjLTIuMTkwOTgsMC4zNzQ5MiAtNS4wMjgwMSwwLjEyNTUyIC02LjU1Nzc2LDEuODEyOTVjLTEuNjE0MDgsMS43ODA0NiAtMS4xNjM5Myw2LjAzNzIyIC0xLjU0MTc1LDguNTY2MjljLTAuMjU5MTIsMS43MzQ1MiAtMi43Njc0NSwwLjk5NTcgLTIuOTAzMDcsMC4xMTM0NGMtMC4zOTA5OSwtMi41NDM1NCAtMC4yMjA2NCwtNi45MTc0NCAtMi4wMjU5OCwtOC45MDg4NmMtMS4yNzc3OSwtMS40MDk1IC00LjI4ODc5LC0wLjk5NyAtNi4wMjU5NSwtMS4zODg0OWMtMi4wMDQ1OCwtMC40NTE3NyAtMS4yNjQyMSwtMi4yMDEwOCAtMC4wMDA1MiwtMi42OTgwOWMwLjIxMzgyLC0wLjA4NDA5IDUuMTgyMjgsMC4xMTg3MSA2LjYyMjQ2LC0xLjQ2OTkyeiIgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aW5kZXgmcXVvdDs6bnVsbH0iIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIwIi8+PHBhdGggZD0iTTIyMC44NTY0LDIwNC44MDk1MWMxLjU2MTg4LC0xLjk1NjIgMi4wMzAyNSwtNi4wMzIyOSAyLjM2Mjg5LC04LjQyNjUyYzAuMzI0MDgsLTIuMzMyNjIgMC45MzYwNiwtMi4yNTEyOSAxLjQwMDQxLDAuMTE3NjhjMC40OTEzOSwyLjUwNjkzIDEuMDgxMDIsNi42Nzc3OSAyLjQ3MjM5LDguNDIwNDFjMS41ODk4OSwxLjk5MTI2IDQuNzM5OTgsMS44NzcxNCA3LjA2ODI1LDIuNjk2MzdjMS42MzQ3MiwwLjU3NTIgMS40ODkwNSwwLjkwNDYxIC0wLjI5NjE3LDEuMjUxNDdjLTIuMjkyMzUsMC40NDUzOCAtNS4yNjA2NCwwLjgwOTA4IC02Ljg2MTE2LDIuODEzNjhjLTEuNjg4NzUsMi4xMTUxMSAtMi4yNjQwNSw3LjE3MTk4IC0yLjY1OTM1LDEwLjE3NjQxYy0wLjI3MTExLDIuMDYwNTQgLTEuMDM1NDUsMS4xODI4NSAtMS4xNzczNSwwLjEzNDc2Yy0wLjQwOTA4LC0zLjAyMTYyIC0xLjA0NDYxLC04LjIxNzY0IC0yLjkzMzQ4LC0xMC41ODMzNmMtMS4zMzY5MSwtMS42NzQ0MiAtMy41NTcxOSwtMS45NzYzNyAtNS4zNzQ3MSwtMi40NDE0NWMtMi40NTIyLC0wLjYyNzQ5IC0yLjcyNjQ2LC0wLjgzNTk1IC0wLjQ1MDE5LC0xLjY5MTE2YzAsMCA0Ljk0MTY1LC0wLjU4MTA3IDYuNDQ4NDYsLTIuNDY4M3oiIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2luZGV4JnF1b3Q7Om51bGx9IiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMTAiLz48cGF0aCBkPSJNMjIwLjg1NjQsMjA0LjgwOTUxYzEuNTYxODgsLTEuOTU2MiAxLjM2MzU4LC02LjAzMjI5IDEuNjk2MjIsLTguNDI2NTJjMC4zMjQwOCwtMi4zMzI2MiAyLjM4MDUsLTIuMjUxMjkgMi44NDQ4NiwwLjExNzY4YzAuNDkxMzksMi41MDY5MyAwLjMwMzI0LDYuNjc3NzkgMS42OTQ2LDguNDIwNDFjMS41ODk4OSwxLjk5MTI2IDQuMjk1NTMsMC45NDY1OCA2LjYyMzgxLDEuNzY1ODJjMS42MzQ3MiwwLjU3NTIgMS45MzM0OSwyLjM5MDcyIDAuMTQ4MjgsMi43Mzc1OGMtMi4yOTIzNSwwLjQ0NTM4IC01LjI2MDY0LDAuMjUzNTIgLTYuODYxMTYsMi4yNTgxM2MtMS42ODg3NSwyLjExNTExIC0xLjQ4NjI3LDcuMTcxOTggLTEuODgxNTYsMTAuMTc2NDFjLTAuMjcxMTEsMi4wNjA1NCAtMi41OTEwMSwxLjE4Mjg1IC0yLjczMjksMC4xMzQ3NmMtMC40MDkwOCwtMy4wMjE2MiAtMC4yNjY4MywtOC4yMTc2NCAtMi4xNTU3LC0xMC41ODMzNmMtMS4zMzY5MSwtMS42NzQ0MiAtNC4wMDE2NCwtMS41MzE5MyAtNS44MTkxNiwtMS45OTcwMWMtMi40NTIyLC0wLjYyNzQ5IC0yLjI4MjAxLC0xLjgzNTk1IC0wLjAwNTc0LC0yLjY5MTE2YzAsMCA0Ljk0MTY0LC0wLjAyNTUyIDYuNDQ4NDUsLTEuOTEyNzV6IiBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpbmRleCZxdW90OzpudWxsfSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjAiLz48L2c+PC9nPjwvc3ZnPg==';

  class imgEffectsSP {
    constructor() {
      this.cutoutX = 0;
      this.cutoutY = 0;
    }

    getInfo() {
      return {
        id: 'imgEffectsSP',
        name: 'Image Effects',
        menuIconURI,
        color1: '#9966FF',
        color2: '#774DCB',
        blocks: [
          {
            blockType: Scratch.BlockType.LABEL,
            text: 'Effects',
          },
          {
            opcode: 'convertHexToRGB',
            blockType: Scratch.BlockType.REPORTER,
            text: 'convert [HEX] to [CHANNEL]',
            arguments: {
              HEX: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: '#FF0000',
               },
              CHANNEL: {
                type: Scratch.ArgumentType.STRING,
                menu: 'CHANNELS',
                defaultValue: 'R',
              },
            },
          },
          {
            opcode: 'applyHueEffect',
            blockType: Scratch.BlockType.REPORTER,
            text: 'apply hue R [R] G [G] B [B] to URI [SVG]',
            arguments: {
              SVG: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '',
              },
              R: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 255,
              },
              G: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              B: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
            },
          },

          '---',

          {
            opcode: 'applyEffect',
            blockType: Scratch.BlockType.REPORTER,
            text: 'set [EFFECT] effect of URI [SVG] to [PERCENTAGE]%',
            arguments: {
              EFFECT: {
                type: Scratch.ArgumentType.STRING,
                menu: 'EFFECTS',
                defaultValue: 'Saturation',
              },
              SVG: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '',
              },
              PERCENTAGE: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 50,
              },
            },
          },
          {
            opcode: 'applyBulgeEffect',
            blockType: Scratch.BlockType.REPORTER,
            text: 'set bulge effect of URI [SVG] to [STRENGTH]% at x [CENTER_X] y [CENTER_Y]',
            arguments: {
              SVG: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '',
              },
              STRENGTH: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 50,
              },
              CENTER_X: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              CENTER_Y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
            },
          },
          {
            opcode: 'applyWaveEffect',
            blockType: Scratch.BlockType.REPORTER,
            text: 'set wave effect of URI [SVG] to amplitude x [AMPX] y [AMPY] and frequency x [FREQX] y [FREQY]',
            arguments: {
              SVG: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '',
              },
              AMPX: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 50,
              },
              AMPY: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 50,
              },
              FREQX: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 5,
              },
              FREQY: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 5,
              },
            },
          },
          {
            opcode: 'applyLineGlitchEffect',
            blockType: Scratch.BlockType.REPORTER,
            text: 'set line glitch of URI [SVG] to [PERCENTAGE]% on [DIRECT] axis and line width [WIDTH]',
            arguments: {
              SVG: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '',
              },
              PERCENTAGE: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 50,
              },
              DIRECT: {
                type: Scratch.ArgumentType.STRING,
                menu: 'POSITIONS',
                defaultValue: 'X',
              },
              WIDTH: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 5,
              },
            },
          },
          {
            opcode: 'applyAbberationEffect',
            blockType: Scratch.BlockType.REPORTER,
            text: 'set abberation of URI [SVG] to colors [COLOR1] and [COLOR2] at [PERCENTAGE]% on [DIRECT] axis',
            arguments: {
              SVG: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '',
              },
              PERCENTAGE: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 5,
              },
              COLOR1: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: '#ff0000',
              },
              COLOR2: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: '#00f7ff',
              },
              DIRECT: {
                type: Scratch.ArgumentType.STRING,
                menu: 'POSITIONS',
                defaultValue: 'X',
              },
            },
          },

          '---',

          {
            opcode: 'removeTransparencyEffect',
            blockType: Scratch.BlockType.REPORTER,
            text: 'remove pixels [REMOVE] [THRESHOLD]% transparency from URI [SVG]',
            arguments: {
              SVG: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '',
              },
              THRESHOLD: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 50,
              },
              REMOVE: {
                type: Scratch.ArgumentType.STRING,
                menu: 'REMOVAL',
                defaultValue: 'under',
              },
            },
          },
          {
            opcode: 'applyEdgeOutlineEffect',
            blockType: Scratch.BlockType.REPORTER,
            text: 'add outline to URI [SVG] with thickness [THICKNESS] and r [R] g [G] b [B] a [A]',
            arguments: {
              SVG: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '',
              },
              THICKNESS: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 1,
              },
              R: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 255,
              },
              G: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              B: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              A: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 255,
              },
            },
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: 'Clipping',
          },
          {
            opcode: 'clipImage',
            blockType: Scratch.BlockType.REPORTER,
            text: 'clip [CUTOUT] from [MAIN]',
            arguments: {
              MAIN: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'source-uri-here'
              },
              CUTOUT: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'cutout-uri-here'
              }
            }
          },
          {
            opcode: 'setCutout',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set clipping position to x [X] y [Y]',
            arguments: {
              X: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              Y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              }
            }
          },
          {
            opcode: 'changeCutout',
            blockType: Scratch.BlockType.COMMAND,
            text: 'change clipping position by x [X] y [Y]',
            arguments: {
              X: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              },
              Y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
              }
            }
          },
          {
            opcode: 'currentCut',
            blockType: Scratch.BlockType.REPORTER,
            text: 'clipping [POS]',
            arguments: {
              POS: {
                type: Scratch.ArgumentType.STRING,
                menu: 'POSITIONS',
                defaultValue: 'X'
              }
            }  
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: 'Image Conversion',
          },
          {
            opcode: 'svgToBitmap',
            blockType: Scratch.BlockType.REPORTER,
            text: 'svg content [SVG] to bitmap width [WIDTH] height [HEIGHT]',
            arguments: {
              SVG: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '<svg />',
              },
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
        ],
        menus: {
          CHANNELS: {
            acceptReporters: true,
            items: [
              'R', 
              'G', 
              'B'
            ]
          },
          POSITIONS: ['X', 'Y'],
          REMOVAL: ['under', 'over'],
          EFFECTS: {
            acceptReporters: true,
            items: [
              'Saturation',
              'Glitch',
              'Chunk Glitch',
              'Clip Glitch',
              'Vignette',
              'Ripple',
              'Displacement',
              'Posterize',
              'Blur',
              'Scanlines',
              'Grain',
              'Cubism'
            ]
          }
        },
      };
    }

    convertHexToRGB(args) {
        const hexColor = args.HEX;
        const channel = args.CHANNEL;

        const r = parseInt(hexColor.substring(1, 3), 16);
        const g = parseInt(hexColor.substring(3, 5), 16);
        const b = parseInt(hexColor.substring(5, 7), 16);

        if (channel === 'R') {
          return r;
        } else if (channel === 'G') {
          return g;
        } else if (channel === 'B') {
          return b;
        }
    }

    applyHueEffect(args) {
      return new Promise((resolve) => {
        const svgDataUri = args.SVG;
        const r = args.R;
        const g = args.G;
        const b = args.B;

        const img = new Image();
        img.onload = async () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);

          let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          await this.applyHue(imageData, r, g, b);
          ctx.putImageData(imageData, 0, 0);

          const modifiedDataUrl = canvas.toDataURL();
          resolve(modifiedDataUrl);
        };
        img.src = svgDataUri;
      });
    }

    applyHue(imageData, r, g, b) {
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.min(255, data[i] * r / 255);
        data[i + 1] = Math.min(255, data[i + 1] * g / 255);
        data[i + 2] = Math.min(255, data[i + 2] * b / 255);
      }
    }

    applyEffect(args) {
      return new Promise((resolve) => {
        const svgDataUri = args.SVG;
        const percentage = (args.PERCENTAGE !== '') ? args.PERCENTAGE : 100;

        const img = new Image();
        img.onload = async () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);

          let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const sEffect = args.EFFECT;      
          switch (sEffect) {
            case 'Glitch':
              this.applyGlitch(imageData, percentage);
              break;
            case 'Chunk Glitch':
              this.applyChunkGlitch(imageData, percentage);
              break;
            case 'Clip Glitch':
              this.applyClipGlitch(imageData, percentage);
              break;
            case 'Vignette':
              this.applyVignette(imageData, percentage);
              break;
            case 'Displacement':
              this.applyDisplacement(imageData, percentage);
              break;
            case 'Ripple':
              this.applyRipple(imageData, percentage);
              break;
            case 'Posterize':
              this.applyPosterize(imageData, percentage);
              break;
            case 'Blur':
              this.applyBlur(imageData, percentage);
              break;
            case 'Scanlines':
              this.applyScanlines(imageData, percentage);
              break;
            case 'Grain':
              this.applyOldFilmGrain(imageData, percentage);
              break;
            case 'Cubism':
              this.applyCubism(imageData, percentage);
              break;
            default:
              this.applySaturation(imageData, percentage);
              break;
          }
          ctx.putImageData(imageData, 0, 0);

          const modifiedDataUrl = canvas.toDataURL();
          resolve(modifiedDataUrl);
        };
        img.src = svgDataUri;
      });
    }

    applySaturation(imageData, percentage) {
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const avg = (r + g + b) / 3;
        data[i] = avg + (r - avg) * (percentage / 100);
        data[i + 1] = avg + (g - avg) * (percentage / 100);
        data[i + 2] = avg + (b - avg) * (percentage / 100);
      }
    }

    setCutout(args) {
      this.cutoutX = Scratch.Cast.toNumber(args.X);
      this.cutoutY = Scratch.Cast.toNumber(args.Y);
    }

    changeCutout(args) {
      this.cutoutX = this.cutoutX + Scratch.Cast.toNumber(args.X);
      this.cutoutY = this.cutoutY + Scratch.Cast.toNumber(args.Y);
    }

    currentCut(args) {
      if (args.POS === 'X') {
        return this.cutoutX;
      } else {
        return this.cutoutY;
      }
    }

    clipImage(args) {
      return new Promise((resolve, reject) => {
        const mainImage = new Image();
        mainImage.onload = () => {
          const cutoutImage = new Image();
          cutoutImage.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = mainImage.width;
            canvas.height = mainImage.height;
            const context = canvas.getContext('2d');
            const cutX = this.cutoutX + (mainImage.width / 2) - (cutoutImage.width / 2);
            const cutY = this.cutoutY - (mainImage.height / 2) + (cutoutImage.height / 2);

            context.drawImage(mainImage, 0, 0);
            context.globalCompositeOperation = 'destination-in';
            context.drawImage(cutoutImage, cutX, cutY * -1);
            context.globalCompositeOperation = 'source-over';

            const clippedDataURI = canvas.toDataURL('image/png');
            resolve(clippedDataURI);
          };
          cutoutImage.src = args.CUTOUT;
        };
        mainImage.src = args.MAIN;
      });
    }

    applyGlitch(imageData, percentage) {
      const data = imageData.data;
      const percent = Scratch.Cast.toNumber(percentage);
      for (let i = 0; i < data.length; i += 4) {
        const randomChance = Math.random() * 100;

        if (randomChance <= percentage) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          const negative = Math.random() < 0.5 ? -1 : 1;
          const randomOffsetR = Math.random() * ((percentage * 1.5) * negative);
          const randomOffsetG = Math.random() * ((percentage * 1.5) * negative);
          const randomOffsetB = Math.random() * ((percentage * 1.5) * negative);

          data[i] = (r + randomOffsetR) % 256;
          data[i + 1] = (g + randomOffsetG) % 256;
          data[i + 2] = (b + randomOffsetB) % 256;
        }
      }
    }

    applyVignette(imageData, percentage) {
      const data = imageData.data;
      const width = imageData.width;
      const height = imageData.height;

      const centerX = width / 2;
      const centerY = height / 2;

      const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
      const percent = Scratch.Cast.toNumber(percentage);

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const index = (y * width + x) * 4;
          const distanceX = Math.abs(x - centerX);
          const distanceY = Math.abs(y - centerY);
          const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
          let vignetteAmount = '';
          if (percent < 0) {
            vignetteAmount =  1 - (distance / maxDistance) * (percent / 100);
          } else {
            vignetteAmount = ((maxDistance - distance) / maxDistance) * (percent / 100);
          }

          data[index] = Math.max(0, Math.min(255, data[index] * vignetteAmount));
          data[index + 1] = Math.max(0, Math.min(255, data[index + 1] * vignetteAmount));
          data[index + 2] = Math.max(0, Math.min(255, data[index + 2] * vignetteAmount));
        }
      }
    }

    applyRipple(imageData, percentage) {
      const data = imageData.data;
      const width = imageData.width;
      const height = imageData.height;
      const centerX = width / 2;
      const centerY = height / 2;

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const index = (y * width + x) * 4;
          const dx = x - centerX;
          const dy = y - centerY;
          const distance = Math.sqrt(dx * dx + dy * dy);

          const offset = Math.sin(distance * (percentage / 100)) * (percentage / 100);
          const sourceX = Math.floor(x + offset);
          const sourceY = Math.floor(y);

          if (sourceX >= 0 && sourceX < width && sourceY >= 0 && sourceY < height) {
            const sourceIndex = (sourceY * width + sourceX) * 4;
            if (data[sourceIndex + 3] > 0) {
              data[index] = data[sourceIndex];
              data[index + 1] = data[sourceIndex + 1];
              data[index + 2] = data[sourceIndex + 2];
              data[index + 3] = data[sourceIndex + 3];
            } else {
              data[index + 3] = 0;
            }
          } else {
            data[index + 3] = 0;
          }
        }
      }
    }

    applyDisplacement(imageData, displacementAmount) {
      const data = imageData.data;
      const width = imageData.width;
      const height = imageData.height;
      const newData = new Uint8ClampedArray(data.length);

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const srcX = x + Math.floor(Math.random() * displacementAmount * 2 - displacementAmount);
          const srcY = y + Math.floor(Math.random() * displacementAmount * 2 - displacementAmount);

          if (srcX >= 0 && srcX < width && srcY >= 0 && srcY < height) {
            const srcIndex = (srcY * width + srcX) * 4;
            const dstIndex = (y * width + x) * 4;

            newData[dstIndex] = data[srcIndex];
            newData[dstIndex + 1] = data[srcIndex + 1];
            newData[dstIndex + 2] = data[srcIndex + 2];
            newData[dstIndex + 3] = data[srcIndex + 3];
          }
        }
      }
      data.set(newData);
    }

    applyPosterize(imageData, percentage) {
      const data = imageData.data;
      const numLevels = Math.max(percentage / 10, 1);

      for (let i = 0; i < data.length; i += 4) {
        data[i] = Math.round(data[i] * (numLevels - 1) / 255) * (255 / (numLevels - 1));
        data[i + 1] = Math.round(data[i + 1] * (numLevels - 1) / 255) * (255 / (numLevels - 1));
        data[i + 2] = Math.round(data[i + 2] * (numLevels - 1) / 255) * (255 / (numLevels - 1));
      }
    }

    applyBulgeEffect(args) {
      return new Promise((resolve) => {
        const svgDataUri = args.SVG;
        let centerX = (args.CENTER_X !== '') ? args.CENTER_X / 100 : 0;
        let centerY = (args.CENTER_Y !== '') ? args.CENTER_Y / -100: 0;
        const strength = (args.STRENGTH !== '') ? args.STRENGTH / 100 : 0;

        const img = new Image();
        img.onload = async () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          centerX = centerX + (img.width / 200);
          centerY = centerY + (img.height / 200);
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);

          let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          this.applyBulge(imageData, centerX, centerY, strength);
          ctx.putImageData(imageData, 0, 0);

          const modifiedDataUrl = canvas.toDataURL();
          resolve(modifiedDataUrl);
        };
        img.src = svgDataUri;
      });
    }

    applyBulge(imageData, centerX, centerY, strength) {
      const data = imageData.data;
      const width = imageData.width;
      const height = imageData.height;
      const newData = new Uint8ClampedArray(data.length);

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const dx = (x / width - centerX) * 2;
          const dy = (y / height - centerY) * 2;
          const distance = Math.sqrt(dx * dx + dy * dy);
          const bulge = Math.pow(distance, strength);
          const srcX = Math.floor(x + (dx * bulge * width) - (dx * width));
          const srcY = Math.floor(y + (dy * bulge * height) - (dy * height));

          if (srcX >= 0 && srcX < width && srcY >= 0 && srcY < height) {
            const srcIndex = (srcY * width + srcX) * 4;
            const dstIndex = (y * width + x) * 4;
            newData[dstIndex] = data[srcIndex];
            newData[dstIndex + 1] = data[srcIndex + 1];
            newData[dstIndex + 2] = data[srcIndex + 2];
            newData[dstIndex + 3] = data[srcIndex + 3];
          }
        }
      }
      data.set(newData);
    }

    applyWaveEffect(args) {
      return new Promise((resolve) => {
        const svgDataUri = args.SVG;
        const amplitudeX = (args.AMPX !== '') ? args.AMPX / 10 : 0;
        const amplitudeY = (args.AMPY !== '') ? args.AMPY / 10 : 0;
        const frequencyX = (args.FREQX !== '') ? args.FREQX / 100 : 0;
        const frequencyY = (args.FREQY !== '') ? args.FREQY / 100 : 0;

        const img = new Image();
        img.onload = async () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);

          let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          this.applyWave(imageData, amplitudeX, amplitudeY, frequencyX, frequencyY);
          ctx.putImageData(imageData, 0, 0);

          const modifiedDataUrl = canvas.toDataURL();
          resolve(modifiedDataUrl);
        };
        img.src = svgDataUri;
      });
    }

    applyWave(imageData, amplitudeX, amplitudeY, frequencyX, frequencyY) {
      const data = imageData.data;
      const width = imageData.width;
      const height = imageData.height;
      const newData = new Uint8ClampedArray(data.length);

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const srcX = Math.floor(x + amplitudeX * Math.sin(y * frequencyX));
          const srcY = Math.floor(y + amplitudeY * Math.sin(x * frequencyY));

          if (srcX >= 0 && srcX < width && srcY >= 0 && srcY < height) {
            const srcIndex = (srcY * width + srcX) * 4;
            const dstIndex = (y * width + x) * 4;

            newData[dstIndex] = data[srcIndex];
            newData[dstIndex + 1] = data[srcIndex + 1];
            newData[dstIndex + 2] = data[srcIndex + 2];
            newData[dstIndex + 3] = data[srcIndex + 3];
          }
        }
      }
      data.set(newData);
    }

    applyBlur(imageData, percentage) {
      const data = imageData.data;
      const width = imageData.width;
      const height = imageData.height;
      const radius = (percentage > 1) ? Math.floor((percentage / 100) * 10) : 0;

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          let r = 0, g = 0, b = 0, a = 0, count = 0;

          for (let ky = -radius; ky <= radius; ky++) {
            for (let kx = -radius; kx <= radius; kx++) {
              const offsetX = x + kx;
              const offsetY = y + ky;

              if (offsetX >= 0 && offsetX < width && offsetY >= 0 && offsetY < height) {
                const pixelIndex = (offsetY * width + offsetX) * 4;

                r += data[pixelIndex];
                g += data[pixelIndex + 1];
                b += data[pixelIndex + 2];
                a += data[pixelIndex + 3];
                count++;
              }
            }
          }

          const pixelIndex = (y * width + x) * 4;
          if (a === 0) {
            data[pixelIndex + 3] = a / count;
          } else {
            data[pixelIndex] = r / count;
            data[pixelIndex + 1] = g / count;
            data[pixelIndex + 2] = b / count;
            data[pixelIndex + 3] = a / count;
          }
        }
      }
    }

    applyLineGlitchEffect(args) {
      return new Promise((resolve) => {
        const svgDataUri = args.SVG;
        const percentage = (args.PERCENTAGE !== '') ? args.PERCENTAGE / 100 : 0;
        const direction = args.DIRECT;
        const width = (args.WIDTH !== '') ? args.WIDTH / 50 : 0;

        const img = new Image();
        img.onload = async () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);

          let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          this.applyLineGlitch(imageData, percentage, direction, width);
          ctx.putImageData(imageData, 0, 0);

          const modifiedDataUrl = canvas.toDataURL();
          resolve(modifiedDataUrl);
        };
        img.src = svgDataUri;
      });
    }

    applyLineGlitch(imageData, percentage, direction, width) {
      const data = imageData.data;
      const imgWidth = imageData.width;
      const imgHeight = imageData.height;
      const numLines = Math.floor(imgHeight * percentage);

      for (let lineIndex = 0; lineIndex < numLines; lineIndex++) {
        const linePosition = Math.floor(Math.random() * imgHeight);
        const lineStart = linePosition - Math.floor(width / 2);
        const lineEnd = lineStart + width;

        if (direction === 'Y') {
          for (let y = 0; y < imgHeight; y++) {
            for (let x = lineStart; x < lineEnd; x++) {
              const srcX = x;
              const srcY = linePosition;

              if (srcX >= 0 && srcX < imgWidth && srcY >= 0 && srcY < imgHeight) {
                const srcIndex = (srcY * imgWidth + srcX) * 4;
                const dstIndex = (y * imgWidth + x) * 4;

                data[dstIndex] = data[srcIndex];
                data[dstIndex + 1] = data[srcIndex + 1];
                data[dstIndex + 2] = data[srcIndex + 2];
                data[dstIndex + 3] = data[srcIndex + 3];
              }
            }
          }
        } else {
          for (let y = lineStart; y < lineEnd; y++) {
            for (let x = 0; x < imgWidth; x++) {
              const srcX = linePosition;
              const srcY = y;

              if (srcX >= 0 && srcX < imgWidth && srcY >= 0 && srcY < imgHeight) {
                const srcIndex = (srcY * imgWidth + srcX) * 4;
                const dstIndex = (y * imgWidth + x) * 4;

                data[dstIndex] = data[srcIndex];
                data[dstIndex + 1] = data[srcIndex + 1];
                data[dstIndex + 2] = data[srcIndex + 2];
                data[dstIndex + 3] = data[srcIndex + 3];
              }
            }
          }
        }
      }
    }

    applyChunkGlitch(imageData, percentage) {
      const newWidth = percentage / 10;
      const data = imageData.data;
      const imgWidth = imageData.width;
      const imgHeight = imageData.height;
      const numLines = Math.floor(imgWidth * 1);

      for (let lineIndex = 0; lineIndex < numLines; lineIndex++) {
        const linePosition = Math.floor(Math.random() * imgHeight);
        const lineStart = linePosition - Math.floor(newWidth / 2);
        const lineEnd = lineStart + newWidth;

        for (let y = 0; y < imgHeight; y++) {
          for (let x = lineStart; x < lineEnd; x++) {
            const srcX = linePosition;
            const srcY = y;

            if (srcX >= 0 && srcX < imgWidth && srcY >= 0 && srcY < imgHeight) {
              const srcIndex = (srcY * imgWidth + srcX) * 4;
              const dstIndex = (y * imgWidth + x) * 4;

              data[dstIndex] = data[srcIndex];
              data[dstIndex + 1] = data[srcIndex + 1];
              data[dstIndex + 2] = data[srcIndex + 2];
              data[dstIndex + 3] = data[srcIndex + 3];
            }
          }
        }
      }
    }

    removeTransparencyEffect(args) {
      return new Promise((resolve) => {
        const svgDataUri = args.SVG;
        const threshold = (args.THRESHOLD !== '') ? args.THRESHOLD / 100 : 0;
        const removeUnder = args.REMOVE === 'under';

        const img = new Image();
        img.onload = async () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);

          let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          this.applyTransparencyRemoval(imageData, threshold, removeUnder);
          ctx.putImageData(imageData, 0, 0);

          const modifiedDataUrl = canvas.toDataURL();
          resolve(modifiedDataUrl);
        };
        img.src = svgDataUri;
      });
    }

    applyTransparencyRemoval(imageData, threshold, removeUnder) {
      const data = imageData.data;
      const pixelCount = data.length / 4;

      for (let i = 0; i < pixelCount; i++) {
        const alpha = data[i * 4 + 3] / 255;
        if ((removeUnder && alpha < threshold) || (!removeUnder && alpha > threshold)) {
          data[i * 4 + 3] = 0;
        }
      }
    }

    applyEdgeOutlineEffect(args) {
      return new Promise((resolve) => {
        const svgDataUri = args.SVG;
        const thickness = Math.ceil(Scratch.Cast.toNumber(args.THICKNESS) / 4);
        const r = args.R;
        const g = args.G;
        const b = args.B;
        const a = args.A;

        const img = new Image();
        img.onload = async () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0);

          let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          this.applyOutline(imageData, thickness, r, g, b, a);
          ctx.putImageData(imageData, 0, 0);

          const modifiedDataUrl = canvas.toDataURL();
          resolve(modifiedDataUrl);
        };
        img.src = svgDataUri;
      });
    }

    applyOutline(imageData, thickness, r, g, b, a) {
      const data = imageData.data;
      const width = imageData.width;
      const height = imageData.height;
      const outlineColor = [r, g, b, a];
      const copyData = new Uint8ClampedArray(data);

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const index = (y * width + x) * 4;
          const alpha = data[index + 3];

          if (alpha < 255) {
            for (let dy = -thickness; dy <= thickness; dy++) {
              for (let dx = -thickness; dx <= thickness; dx++) {
                const nx = x + dx;
                const ny = y + dy;

                if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                  const neighborIndex = (ny * width + nx) * 4;
                  const neighborAlpha = copyData[neighborIndex + 3];

                  if (neighborAlpha === 255) {
                    data[index] = outlineColor[0];
                    data[index + 1] = outlineColor[1];
                    data[index + 2] = outlineColor[2];
                    data[index + 3] = outlineColor[3];
                    break;
                  }
                }
              }
            }
          }
        }
      }
    }

    applyClipGlitch(imageData, percentage) {
      const data = imageData.data;
      const width = imageData.width;
      const height = imageData.height;
      const percent = percentage / 100;

      const numPixelsToEnlarge = Math.floor(percent / 100 * (width * height));
      const maxEnlargeFactor = 1.5 + (percent / 200);

      for (let i = 0; i < numPixelsToEnlarge; i++) {
        const x = Math.floor(Math.random() * width);
        const y = Math.floor(Math.random() * height);
        const index = (y * width + x) * 4;

        const enlargeFactor = 1 + Math.random() * maxEnlargeFactor;

        const blurRadius = Math.floor(enlargeFactor * 4);

        for (let offsetY = -blurRadius; offsetY <= blurRadius; offsetY++) {
          for (let offsetX = -blurRadius; offsetX <= blurRadius; offsetX++) {
            const newX = x + offsetX;
            const newY = y + offsetY;

            if (newX >= 0 && newX < width && newY >= 0 && newY < height) {
              const newIndex = (newY * width + newX) * 4;

              data[newIndex] = data[index];
              data[newIndex + 1] = data[index + 1];
              data[newIndex + 2] = data[index + 2];
              data[newIndex + 3] = data[index + 3];
            }
          }
        }
      }
    }
    
    applyScanlines(imageData, percentage) {
      const data = imageData.data;
      const width = imageData.width;
      const height = imageData.height;
      const scanlineHeight = Math.floor(height / 100);
      const percent = percentage / 100;

      for (let y = 0; y < height; y++) {
        if (Math.random() < percent) {
          const scanlineBrightness = Math.random() * (percentage / 2);

          for (let x = 0; x < width; x++) {
            const index = (y * width + x) * 4;
            data[index] = Math.min(data[index] + scanlineBrightness, 255);
            data[index + 1] = Math.min(data[index + 1] + scanlineBrightness, 255);
            data[index + 2] = Math.min(data[index + 2] + scanlineBrightness, 255);
          }
        }
      }
    }

    applyOldFilmGrain(imageData, percentage) {
      const data = imageData.data;
      const width = imageData.width;
      const height = imageData.height;

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const index = (y * width + x) * 4;
          const rand = Math.random();

          if (rand < percentage) {
            const grain = Math.floor(Math.random() * percentage);
            data[index] += grain;
            data[index + 1] += grain;
            data[index + 2] += grain;
          }
        }
      }
    }

    applyCubism(imageData, percentage) {
      const data = imageData.data;
      const width = imageData.width;
      const height = imageData.height;
      const percent = (percentage === 0 || percentage === '') ? 1 : Math.abs(Scratch.Cast.toNumber(percentage));

      for (let y = 0; y < height; y += percent) {
        for (let x = 0; x < width; x += percent) {
          const startX = x;
          const endX = Math.min(x + percent, width);
          const startY = y;
          const endY = Math.min(y + percent, height);
          const avgColor = [0, 0, 0];

          for (let j = startY; j < endY; j++) {
            for (let i = startX; i < endX; i++) {
              const index = (j * width + i) * 4;
              avgColor[0] += data[index];
              avgColor[1] += data[index + 1];
              avgColor[2] += data[index + 2];
            }
          }

          const totalPixels = (endX - startX) * (endY - startY);
          avgColor[0] /= totalPixels;
          avgColor[1] /= totalPixels;
          avgColor[2] /= totalPixels;

          for (let j = startY; j < endY; j++) {
            for (let i = startX; i < endX; i++) {
              const index = (j * width + i) * 4;
              data[index] = avgColor[0];
              data[index + 1] = avgColor[1];
              data[index + 2] = avgColor[2];
            }
          }
        }
      }
    }

    svgToBitmap(args) {
      const svgContent = args.SVG;
      const width = Math.abs(Scratch.Cast.toNumber(args.WIDTH));
      const height = Math.abs(Scratch.Cast.toNumber(args.HEIGHT));
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');

          if (args.WIDTH < 0) {
            ctx.translate(width, 0);
            ctx.scale(-1, 1);
          }
          if (args.HEIGHT < 0) {
            ctx.translate(0, height);
            ctx.scale(1, -1);
          }
          ctx.drawImage(img, 0, 0, width, height);
          const imageData = ctx.getImageData(0, 0, width, height);
          const newCanvas = document.createElement('canvas');
          newCanvas.width = width;
          newCanvas.height = height;
          const newCtx = newCanvas.getContext('2d');
          newCtx.putImageData(imageData, 0, 0);
          const dataUri = newCanvas.toDataURL();
          resolve(dataUri);
        };
        img.src = `data:image/svg+xml;base64,${btoa(svgContent)}`;
      });
    }

    applyAbberationEffect(args) {
      return new Promise((resolve) => {
        const svgDataUri = args.SVG;
        const percentage = args.PERCENTAGE;
        const color1 = args.COLOR1;
        const color2 = args.COLOR2;
        const direction = args.DIRECT;

        const img = new Image();
        img.onload = async () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width + Math.abs(percentage) * 5;
          canvas.height = img.height + Math.abs(percentage) * 5;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, Math.abs(percentage) * 2.5, Math.abs(percentage) * 2.5);

          let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          this.applyChromaticAberration(imageData, color1, color2, percentage, direction);
          ctx.putImageData(imageData, 0, 0);

          const modifiedDataUrl = canvas.toDataURL();
          resolve(modifiedDataUrl);
        };
        img.src = svgDataUri;
      });
    }

    applyChromaticAberration(imageData, color1, color2, percentage, direction) {
      const data = imageData.data;
      let width = imageData.width;
      let height = imageData.height;
      const copy1 = new Uint8ClampedArray(data.length);
      const copy2 = new Uint8ClampedArray(data.length);

      const hexToRGB = (hex) => [
        parseInt(hex.slice(1, 3), 16),
        parseInt(hex.slice(3, 5), 16),
        parseInt(hex.slice(5, 7), 16),
      ];

      const rgb1 = hexToRGB(color1);
      const rgb2 = hexToRGB(color2);

      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const srcIndex = (y * width + x) * 4;
          const r = data[srcIndex];
          const g = data[srcIndex + 1];
          const b = data[srcIndex + 2];
          const a = data[srcIndex + 3] / 1;

          let newX1, newY1, newX2, newY2;

          if (direction === 'X') {
            newX1 = x + Math.floor((width / 2) * (percentage / 100));
            newY1 = y;
            newX2 = x - Math.floor((width / 2) * (percentage / 100));
            newY2 = y;
          } else {
            newX1 = x;
            newY1 = y + Math.floor((height / 2) * (percentage / 100));
            newX2 = x;
            newY2 = y - Math.floor((height / 2) * (percentage / 100));
          }

          newX1 = Math.max(0, Math.min(width - 1, newX1));
          newY1 = Math.max(0, Math.min(height - 1, newY1));
          newX2 = Math.max(0, Math.min(width - 1, newX2));
          newY2 = Math.max(0, Math.min(height - 1, newY2));

          const newR1 = data[(newY1 * width + newX1) * 4];
          const newG1 = data[(newY1 * width + newX1) * 4 + 1];
          const newB1 = data[(newY1 * width + newX1) * 4 + 2];

          const newR2 = data[(newY2 * width + newX2) * 4];
          const newG2 = data[(newY2 * width + newX2) * 4 + 1];
          const newB2 = data[(newY2 * width + newX2) * 4 + 2];

          const leftColor = [
            (rgb1[0] * r) / 255,
            (rgb1[1] * g) / 255,
            (rgb1[2] * b) / 255,
          ];
          const rightColor = [
            (rgb2[0] * r) / 255,
            (rgb2[1] * g) / 255,
            (rgb2[2] * b) / 255,
          ];

          const leftIndex = (newY1 * width + newX1) * 4;
          const rightIndex = (newY2 * width + newX2) * 4;

          copy1[leftIndex] = leftColor[0];
          copy1[leftIndex + 1] = leftColor[1];
          copy1[leftIndex + 2] = leftColor[2];
          copy1[leftIndex + 3] = a;

          copy2[rightIndex] = rightColor[0];
          copy2[rightIndex + 1] = rightColor[1];
          copy2[rightIndex + 2] = rightColor[2];
          copy2[rightIndex + 3] = a;
        }
      }

      for (let i = 0; i < data.length; i++) {
        data[i] = Math.max(0, Math.min(255, (data[i] + copy1[i] + copy2[i]) / 2));
      }
    }
  }

  Scratch.extensions.register(new imgEffectsSP());
})(Scratch);
