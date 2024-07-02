// Name: Trampoline
// ID: nktrampoline
// Description: Get information about Scratch projects and users. Replaces S-Grab.
// By: NamelessCat
// License: MIT

(function (Scratch) {
  'use strict';

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('Trampoline must run unsandboxed');
  }

  const icon = "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI2NC4zMTgxOCIgaGVpZ2h0PSI2NC4zMTgxOCIgdmlld0JveD0iMCwwLDY0LjMxODE4LDY0LjMxODE4Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjA3Ljg0MDkxLC0xNDcuODQwOTEpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTIwOC4wODIwNiwxODBjMCwtMTcuNjI3NzkgMTQuMjkwMTUsLTMxLjkxNzk0IDMxLjkxNzk0LC0zMS45MTc5NGMxNy42Mjc3OSwwIDMxLjkxNzk0LDE0LjI5MDE1IDMxLjkxNzk0LDMxLjkxNzk0YzAsMTcuNjI3NzkgLTE0LjI5MDE1LDMxLjkxNzk0IC0zMS45MTc5NCwzMS45MTc5NGMtMTcuNjI3NzksMCAtMzEuOTE3OTQsLTE0LjI5MDE1IC0zMS45MTc5NCwtMzEuOTE3OTR6IiBmaWxsPSIjZWNhOTBiIiBzdHJva2Utd2lkdGg9IjAiLz48cGF0aCBkPSJNMjIyLjM1MjU2LDE4NC4xNjM3NmMtMy4yMjU2LC0wLjk5NTQ0IC02LjY3NDIyLC0yLjcxNTIyIC02LjY3NDIyLC00LjUyMDY1YzAsLTEuODA1NDMgMy40NDg2MSwtMy41MjUyMSA2LjY3NDIyLC00LjUyMDY1YzQuNjg1NjUsLTEuNDQ1ODUgMTAuOTg1NjUsLTIuMjgyMTggMTcuNjQ3NSwtMi4yODIxOGM2LjY2MTg1LDAgMTIuOTYxODUsMC44MzYzMiAxNy42NDc2MywyLjI4MjE4YzMuMjI1NiwwLjk5NTQ0IDYuNjc0MjIsMi43MTUyMiA2LjY3NDIyLDQuNTIwNjVjMCwxLjgwNTQzIC0zLjQ0ODQ5LDMuNTI1MjEgLTYuNjc0MjIsNC41MjA2NWMtNC42ODU2NSwxLjQ0NTg1IC0xMC45ODU2NSwyLjI4MjE4IC0xNy42NDc1LDIuMjgyMThjLTYuNjYxODUsMCAtMTIuOTYxODUsLTAuODM2MzIgLTE3LjY0NzYzLC0yLjI4MjE4eiIgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7bm9Ib3ZlciZxdW90OzpmYWxzZSwmcXVvdDtvcmlnSXRlbSZxdW90OzpbJnF1b3Q7UGF0aCZxdW90Oyx7JnF1b3Q7YXBwbHlNYXRyaXgmcXVvdDs6dHJ1ZSwmcXVvdDtzZWdtZW50cyZxdW90OzpbW1syNDAuMDAwMTksMTg2LjM5Mjk0XSxbLTYuNjYxODUsMF0sWzYuNjYxODUsMF1dLFtbMjU3LjU5NzA0LDE4NC4xNTA3OV0sWy00LjY4NTY1LDEuNDQ1ODVdLFszLjIyNTczLC0wLjk5NTQ0XV0sW1syNjQuMjY5NjcsMTc5LjY0MzExXSxbMCwxLjgwNTQzXSxbMCwtMS44MDU0M11dLFtbMjU3LjU5NzA0LDE3NS4xMzU0NF0sWzMuMjI1NiwwLjk5NTQ0XSxbLTQuNjg1NzcsLTEuNDQ1ODVdXSxbWzI0MC4wMDAwNiwxNzIuODkzMjhdLFs2LjY2MTg1LDBdLFstNi42NjE4NSwwXV0sW1syMjIuNDAzMjEsMTc1LjEzNTQ0XSxbNC42ODU2NSwtMS40NDU4NV0sWy0zLjIyNTYsMC45OTU0NF1dLFtbMjE1LjczMDU4LDE3OS42NDMxMV0sWzAsLTEuODA1NDNdLFswLDEuODA1NDNdXSxbWzIyMi40MDMyMSwxODQuMTUwNzldLFstMy4yMjU2LC0wLjk5NTQ0XSxbNC42ODU3NywxLjQ0NTg1XV1dLCZxdW90O2Nsb3NlZCZxdW90Ozp0cnVlLCZxdW90O2ZpbGxDb2xvciZxdW90OzpbMCwwLDAsMV19XX0iIGZpbGw9IiNiODgzMDkiIHN0cm9rZS13aWR0aD0iMC41Ii8+PHBhdGggZD0iTTI1NS44MjkxMywxNzkuNjQzNDljMCwwLjkwODM3IC0wLjU4NTEzLDEuNjU2OTMgLTEuNDU1ODQsMS44NjI0N2MtMC4wMDAzNywwLjAwMDEzIC0wLjAxNDc0LDAuMDAzNTIgLTAuMDE0OTgsMC4wMDM1MmwtMC4wMjU4OCwwLjAwNTkxYy00LjA1MjEsMC45NTI5NyAtOS4xNDQwNiwxLjQ3ODI3IC0xNC4zMzIzNywxLjQ3ODI3Yy01LjE4ODMxLDAgLTEwLjI4MDAyLC0wLjUyNTMgLTE0LjMzNzMyLC0xLjQ3OTRsLTAuMDMyNDUsLTAuMDA3NjZjLTAuODczOTIsLTAuMjA2MyAtMS40NTkwNiwtMC45NTQ4NiAtMS40NTkwNiwtMS44NjMyM2MwLC0wLjkwODUgMC41ODUxMywtMS42NTcwNSAxLjQ1NTg0LC0xLjg2MjZsMC4wMzIyLC0wLjAwNzY2YzQuMDYwNzYsLTAuOTU0ODYgOS4xNTI3MywtMS40ODAxNSAxNC4zNDA5MSwtMS40ODAxNWM1LjE4ODMxLDAgMTAuMjc5OSwwLjUyNTQyIDE0LjMzNzIsMS40Nzk0bDAuMDM4MjcsMC4wMDg5MmMwLjg2ODM1LDAuMjA1MDQgMS40NTMyNCwwLjk1MzM1IDEuNDUzNDgsMS44NjIyMnpNMjUyLjk3Mjk0LDE3OS42NDMyNGMtMy43NTg5NywtMC43OTM0MSAtOC4zMTg5MywtMS4yMjU4NiAtMTIuOTcyNzUsLTEuMjI1ODZjLTQuNjU3OTEsMCAtOS4yMjIyLDAuNDMzMDggLTEyLjk3MzI1LDEuMjI1NzNjMy43NTI1MywwLjc5Mjc4IDguMzE1ODMsMS4yMjU4NiAxMi45NzMyNSwxLjIyNTg2YzQuNjU4MDMsMCA5LjIyMTgzLC0wLjQzMzA4IDEyLjk3Mjc1LC0xLjIyNTczeiIgZmlsbD0iIzNiMmEwMyIgc3Ryb2tlLXdpZHRoPSIxIi8+PHBhdGggZD0iTTI3MS43MDI0MSwxOTUuNTAzNjZjMCwwLjU4NjYxIC0wLjQ2ODYsMS4wNjIyOCAtMS4wNDcwNSwxLjA2MjI4aC0yLjA2OTIxYy0wLjAwMTQ5LDAgLTAuMDAyNzIsMC4wMDAxMyAtMC4wMDQwOSwwLjAwMDEzYy0wLjAwMTYxLDAgLTAuMDAzMjIsLTAuMDAwMTMgLTAuMDA0NzEsLTAuMDAwMTNoLTEuNjQ0OTRjLTAuNTc4NDUsMCAtMS4wNDcwNSwtMC40NzU2NyAtMS4wNDcwNSwtMS4wNjIyOGMwLC0wLjU4NjYxIDAuNDY4NiwtMS4wNjIyOCAxLjA0NzA1LC0xLjA2MjI4aDAuMzYyNDdsLTAuOTcxNjMsLTQuNzE3NjJjLTMuOTAyNzUsMy44NjQ1MyAtMTQuNzI2NzksNS45NzYyNyAtMjUuMjc2MDQsNi4xMDc2OXY0Ljc2NDk5aDAuODE0MzZjMC41Nzg0NSwwIDEuMDQ3MDUsMC40NzU2NyAxLjA0NzA1LDEuMDYyMjhjMCwwLjU4NjYxIC0wLjQ2ODYsMS4wNjIyOCAtMS4wNDcwNSwxLjA2MjI4aC0zLjcyMjk0Yy0wLjU3ODQ1LDAgLTEuMDQ3MDUsLTAuNDc1NjcgLTEuMDQ3MDUsLTEuMDYyMjhjMCwtMC41ODY2MSAwLjQ2ODYsLTEuMDYyMjggMS4wNDcwNSwtMS4wNjIyOGgwLjgxNDQ4di00Ljc2NDk5Yy0xMC41NDkzNywtMC4xMzE0MiAtMjEuMzczNDEsLTIuMjQzMTYgLTI1LjI3NjE2LC02LjEwNzY5bC0wLjk3MTYzLDQuNzE3ODdoMC4zNjIyM2MwLjU3ODQ1LDAgMS4wNDcwNSwwLjQ3NTY3IDEuMDQ3MDUsMS4wNjIyOGMwLDAuNTg2NjEgLTAuNDY4NiwxLjA2MjI4IC0xLjA0NzA1LDEuMDYyMjhoLTEuNjQ0OTRjLTAuMDAxNjEsMCAtMC4wMDMyMiwwLjAwMDEzIC0wLjAwNDcxLDAuMDAwMTNjLTAuMDAxNDksMCAtMC4wMDI3MiwtMC4wMDAxMyAtMC4wMDQwOSwtMC4wMDAxM2gtMi4wNjkyMWMtMC41Nzg0NSwwIC0xLjA0NzA1LC0wLjQ3NTY3IC0xLjA0NzA1LC0xLjA2MjI4YzAsLTAuNTg2NjEgMC40Njg2LC0xLjA2MjI4IDEuMDQ3MDUsLTEuMDYyMjhoMS4yMjEyOWwzLjA3NDg5LC0xNC45MzAwNmMwLjA5Mjc1LC0yLjU3NTYgMi45MDU3MywtNC43ODk0OCA4LjE1MzExLC02LjQwODcyYzQuODc3NiwtMS41MDUwMyAxMS4zNDM0MiwtMi4zMzQgMTguMjA2MTQsLTIuMzM0YzYuODYyNTksMCAxMy4zMjg1NCwwLjgyODk3IDE4LjIwNjE0LDIuMzM0YzUuMjQ3NSwxLjYxOTI0IDguMDYwMzUsMy44MzI5OSA4LjE1MzExLDYuNDA4NzJsMy4wNzQ4OSwxNC45MzAwNmgxLjIyMTI5YzAuNTc4NDUsMCAxLjA0NjkyLDAuNDc1NDIgMS4wNDY5MiwxLjA2MjAzek0yMzguOTUyNzcsMTkzLjcwNzE1di01LjE5NjkzYy02LjQ3MTAyLC0wLjA4MDAzIC0xMi41MzAyOCwtMC44OTg4MiAtMTcuMTU5MDksLTIuMzI3MDljLTMuMDkxNDksLTAuOTUzOTggLTUuMzM2NjcsLTIuMTE0NjMgLTYuNjgwNDMsLTMuNDMzNzFsLTAuODMyNTYsNC4wNDI4MWMwLjI5MzI1LDEuNTU1MDMgMi45NDc5NiwzLjI3MTY0IDcuMDc3NTgsNC41NDZjNC43MTgyMiwxLjQ1NjAzIDEwLjkzMjI4LDIuMjg5NzcgMTcuNTk0NjMsMi4zNjg5MnpNMjQwLjAwMDE5LDE4Ni4zOTI5NGM2LjY2MTg1LDAgMTIuOTExMiwtMC43OTYzIDE3LjU5Njg1LC0yLjI0MjE1YzMuMjI1NzMsLTAuOTk1NDQgNi42NzI2MywtMi43MDIyNCA2LjY3MjYzLC00LjUwNzY4YzAsLTEuODA1NDMgLTMuNDQ3MDIsLTMuNTEyMjQgLTYuNjcyNjMsLTQuNTA3NjhjLTQuNjg1NzcsLTEuNDQ1ODUgLTEwLjkzNTEyLC0yLjI0MjE1IC0xNy41OTY5OCwtMi4yNDIxNWMtNi42NjE4NSwwIC0xMi45MTEyLDAuNzk2MyAtMTcuNTk2ODUsMi4yNDIxNWMtMy4yMjU2LDAuOTk1NDQgLTYuNjcyNjMsMi43MDIyNCAtNi42NzI2Myw0LjUwNzY4YzAsMS44MDU0MyAzLjQ0NzAyLDMuNTEyMjQgNi42NzI2Myw0LjUwNzY4YzQuNjg1NzcsMS40NDU4NSAxMC45MzUxMiwyLjI0MjE1IDE3LjU5Njk4LDIuMjQyMTV6TTI2NS43MTkzMSwxODYuNzkyNmwtMC44MzI1NiwtNC4wNDI5NGMtMS4zNDM1MiwxLjMxOTA4IC0zLjU4ODgyLDIuNDc5NzQgLTYuNjgwNDMsMy40MzM3MWMtNC42Mjg2OSwxLjQyODI2IC0xMC42ODgwNywyLjI0NzE4IC0xNy4xNTkwOSwyLjMyNzA5djUuMTk2ODFjNi42NjIyMywtMC4wNzkxNSAxMi44NzY0MSwtMC45MTI4OSAxNy41OTQ2MywtMi4zNjg5MmM0LjEyOTYyLC0xLjI3NDM2IDYuNzg0MzMsLTIuOTkwODQgNy4wNzc0NSwtNC41NDU3NXoiIGZpbGw9IiMzYjJhMDMiIHN0cm9rZS13aWR0aD0iMSIvPjxwYXRoIGQ9Ik0yMDcuODQwOTEsMjEyLjE1OTA5di02NC4zMTgxOGg2NC4zMTgxOHY2NC4zMTgxOHoiIGZpbGw9Im5vbmUiIHN0cm9rZS13aWR0aD0iMCIvPjwvZz48L2c+PC9zdmc+";

  // deliberately not using users with high follower counts, since the API runs slower for those users.
  const usernames = ["NamelessCat", "GarboMuffin", "pinksheep2917", "TheShovel", "john"];

  class nktrampoline {
    getInfo() {
      return {
        id: 'nktrampoline',
        name: 'Trampoline',
        menuIconURI: icon,
        color1: '#ECA90B',
        color2: '#EBAF00',
        color3: '#8a6307',
        blocks: [
          {
            blockType: Scratch.BlockType.XML,
            xml: "<sep gap='12'/><label text='Users with high follower counts will'/><sep gap='-12'/><label text='take a while for the API to process.'/>",
          },
          {
            opcode: 'userFollowCount',
            blockType: Scratch.BlockType.REPORTER,
            text: '[ATTRIBUTE] count of user [WHO]',
            arguments: {
              ATTRIBUTE: {
                type: Scratch.ArgumentType.STRING,
                menu: 'FOLLOWMENU'
              },
              WHO: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: usernames[Math.floor(Math.random() * usernames.length)]
              }
            }
          },
          {
            opcode: 'userFollowAll',
            blockType: Scratch.BlockType.REPORTER,
            text: 'recent users [ATTRIBUTE] [WHO]',
            arguments: {
              ATTRIBUTE: {
                type: Scratch.ArgumentType.STRING,
                menu: 'FOLLOWMENU2'
              },
              WHO: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: usernames[Math.floor(Math.random() * usernames.length)]
              }
            }
          },
          {
            opcode: 'userFollowing',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'user [USER1] follows [USER2]?',
            arguments: {
              USER1: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'griffpatch'
              },
              USER2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Levy2007'
              }
            }
          },
          '---',
          {
            opcode: 'userProjects',
            blockType: Scratch.BlockType.REPORTER,
            text: 'all projects shared by [WHO]',
            arguments: {
              WHO: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: usernames[Math.floor(Math.random() * usernames.length)]
              }
            }
          },
          {
            opcode: 'userNewestProject',
            blockType: Scratch.BlockType.REPORTER,
            text: 'newest project by [WHO]',
            arguments: {
              WHO: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: usernames[Math.floor(Math.random() * usernames.length)]
              }
            }
          },
          '---',
          {
            opcode: 'userInfo',
            blockType: Scratch.BlockType.REPORTER,
            text: '[WHAT] of user [WHO]',
            arguments: {
              WHAT: {
                type: Scratch.ArgumentType.STRING,
                menu: 'WHAT5'
              },
              WHO: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: usernames[Math.floor(Math.random() * usernames.length)]
              }
            }
          },
          {
            opcode: 'userRank',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '[WHO] is scratch team?',
            arguments: {
              WHO: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: usernames[Math.floor(Math.random() * usernames.length)]
              }
            }
          },
          {
            opcode: 'userMail',
            blockType: Scratch.BlockType.REPORTER,
            text: 'mail count of [WHO]',
            arguments: {
              WHO: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: usernames[Math.floor(Math.random() * usernames.length)]
              }
            }
          },
          {
            opcode: 'userAvatar',
            blockType: Scratch.BlockType.REPORTER,
            text: 'avatar of user [WHO]',
            arguments: {
              WHO: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: usernames[Math.floor(Math.random() * usernames.length)]
              }
            }
          },
          '---',
          {
            opcode: 'projectStats',
            blockType: Scratch.BlockType.REPORTER,
            text: '[WHAT] count of project [WHO]',
            arguments: {
              WHAT: {
                type: Scratch.ArgumentType.STRING,
                menu: 'WHAT3'
              },
              WHO: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '697568168'
              }
            }
          },
          {
            opcode: 'projectComment',
            blockType: Scratch.BlockType.REPORTER,
            text: 'most recent [WHAT] of project [WHO]',
            arguments: {
              WHAT: {
                type: Scratch.ArgumentType.STRING,
                menu: 'WHAT4'
              },
              WHO: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '697568168'
              }
            }
          },
          '---',
          {
            opcode: 'projectName',
            blockType: Scratch.BlockType.REPORTER,
            text: 'name of project [WHO]',
            arguments: {
              WHO: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '697568168'
              }
            }
          },
          {
            opcode: 'projectOwner',
            blockType: Scratch.BlockType.REPORTER,
            text: 'creator of project [WHO]',
            arguments: {
              WHO: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '697568168'
              }
            }
          },
          {
            opcode: 'projectThumb',
            blockType: Scratch.BlockType.REPORTER,
            text: 'thumbnail of project [WHO]',
            arguments: {
              WHO: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '697568168'
              }
            }
          }
        ],
        menus: {
          FOLLOWMENU: {
            acceptReporters: true,
            items: [
            {
              text: 'follower',
              value: 'followers'
            },
            {
              text: 'following',
              value: 'following'
            }, ]
          },
          FOLLOWMENU2: {
            acceptReporters: true,
            items: [
            {
              text: 'following',
              value: 'followers'
            },
            {
              text: 'followed by',
              value: 'following'
            }, ]
          },
          WHAT3: {
            acceptReporters: true,
            items: [
            {
              text: 'love',
              value: 'loves'
            },
            {
              text: 'favorite',
              value: 'favorites'
            },
            {
              text: 'view',
              value: 'views'
            },
            {
              text: 'remix',
              value: 'remixes'
            }]
          },
          WHAT4: {
            acceptReporters: true,
            items: [
            {
              text: 'comment',
              value: 'content'
            },
            {
              text: 'commenter',
              value: 'author'
            }]
          },
          WHAT5: {
            acceptReporters: true,
            items: [
            {
              text: 'about me',
              value: 'bio'
            },
            {
              text: "what i'm working on",
              value: 'status'
            },
            {
              text: 'location',
              value: 'country'
            }]
          }
        }
      };
    }

    async userFollowAll(args) {
      var offset = 0;
      var list = [];
      while (true) {
        var userData = await Scratch.fetch('https://corsproxy.io/?https://api.scratch.mit.edu/users/' + args.WHO + '/' + args.ATTRIBUTE + '?limit=40&offset=' + offset.toString());
        var jsonData = await userData.json();
        if (!userData) {
          break;
        }
        for (let i = 0; i < jsonData.length; i++) {
          list.push(jsonData[i].username);
        }
        if (!(jsonData.length == 40)) {
          break;
        }
        offset += 40;
        if (offset >= 1000) {
          // Trust me, you don't want to make an API request over 1,000. Even that's stretching it.
          break;
        }
      }
      return list;
    }

    async userFollowCount(args) {
      // If this script looks overly complicated, that's because it is. Scratch does not have a way to efficiently grab follower/following counts. This block alone took two days.
      var digit = 1;
      var digitvalue = 0;
      var readvalue = 0;
      var readvalue2 = 0;
      var userData;
      var textData;
      while (!(textData === '[]')) {
        userData = await Scratch.fetch('https://corsproxy.io/?https://api.scratch.mit.edu/users/' + args.WHO + '/' + args.ATTRIBUTE + '?limit=1&offset=' + digit.toString());
        textData = await userData.text();
        digit *= 10;
        if (digit == 10000000000) {
          // Failsafe
          return '';
        }
      }
      digit = digit / 10;
      while (!(digit == 1)) {
        textData = '';
        digit = digit / 10;
        digitvalue = 0;
        while (!(textData === '[]')) {
          digitvalue += 1;
          readvalue2 = readvalue + (digit * digitvalue);
          userData = await Scratch.fetch('https://corsproxy.io/?https://api.scratch.mit.edu/users/' + args.WHO + '/' + args.ATTRIBUTE + '?limit=1&offset=' + readvalue2.toString());
          textData = await userData.text();
        }
        readvalue = readvalue2 - digit;
      }
      return readvalue;
    }

    async userFollowing(args) {
      var offset = 0;
      var list = [];
      while (true) {
        var userData = await Scratch.fetch('https://corsproxy.io/?https://api.scratch.mit.edu/users/' + args.USER1 + '/following?limit=40&offset=' + offset.toString());
        var jsonData = await userData.json();
        if (!userData) {
          break;
        }
        for (let i = 0; i < jsonData.length; i++) {
          list.push(jsonData[i].username);
        }
        if (!(jsonData.length == 40)) {
          break;
        }
        offset += 40;
        if (offset >= 10000) {
          break;
        }
      }
      return list.includes(args.USER2);
    }

    async userProjects(args) {
      var offset = 0;
      var list = [];
      while (true) {
        var userData = await Scratch.fetch('https://corsproxy.io/?https://api.scratch.mit.edu/users/' + args.WHO + '/projects?limit=40&offset=' + offset.toString());
        var jsonData = await userData.json();
        if (!userData) {
          break;
        }
        for (let i = 0; i < jsonData.length; i++) {
          list.push(jsonData[i].title);
        }
        if (!(jsonData.length == 40)) {
          break;
        }
        offset += 40;
        if (offset >= 10000) {
          // Failsafe, normal people won't have nearly 10K projects, however we have no way to judge how normal the user is.
          break;
        }
      }
      return list;
    }

    async userNewestProject(args) {
      var userData = await Scratch.fetch('https://corsproxy.io/?https://api.scratch.mit.edu/users/' + args.WHO + '/projects?limit=1');
      var jsonData = await userData.json();
      if (Object.hasOwn(jsonData, 'code') || !userData) {
        return '';
      }
      return jsonData[0].title;
    }

    async userInfo(args) {
      const userData = await Scratch.fetch('https://trampoline.turbowarp.org/api/users/' + args.WHO);
      const jsonData = await userData.json();
      if (!userData || Object.hasOwn(jsonData, 'error')) {
        return '';
      }
      let attribute = jsonData.profile[args.WHAT];
      if (!attribute) {
        return '';
      }
      return attribute;
    }

    async userMail(args) {
      const userData = await Scratch.fetch('https://corsproxy.io/?https://api.scratch.mit.edu/users/' + args.WHO + '/messages/count');
      const jsonData = await userData.json();
      if (!userData || Object.hasOwn(jsonData, 'code')) {
        return '';
      }
      return jsonData.count;
    }

    async userRank(args) {
      const userData = await Scratch.fetch('https://trampoline.turbowarp.org/api/users/' + args.WHO);
      const jsonData = await userData.json();
      if (!userData || Object.hasOwn(jsonData, 'error')) {
        return '';
      }
      return jsonData.scratchteam;
    }

    async projectStats(args) {
      const userData = await Scratch.fetch('https://trampoline.turbowarp.org/api/projects/' + args.WHO);
      const jsonData = await userData.json();
      if (!userData || Object.hasOwn(jsonData, 'error')) {
        return '';
      }
      let attribute = jsonData.stats[args.WHAT];
      if (!attribute) {
        return '';
      }
      return attribute;
    }

    async projectName(args) {
      const userData = await Scratch.fetch('https://trampoline.turbowarp.org/api/projects/' + args.WHO);
      const jsonData = await userData.json();
      if (!userData || Object.hasOwn(jsonData, 'error')) {
        return '';
      }
      return jsonData.title;
    }

    async projectOwner(args) {
      const userData = await Scratch.fetch('https://trampoline.turbowarp.org/api/projects/' + args.WHO);
      const jsonData = await userData.json();
      if (!userData || Object.hasOwn(jsonData, 'error')) {
        return '';
      }
      return jsonData.author.username;
    }

    async projectThumb(args) {
      const userData = await Scratch.fetch('https://trampoline.turbowarp.org/api/projects/' + args.WHO);
      const jsonData = await userData.json();
      if (!userData || Object.hasOwn(jsonData, 'error')) {
        return '';
      }
      return jsonData.image.replace('cdn2', 'uploads');
    }

    async userAvatar(args) {
      const userData = await Scratch.fetch('https://trampoline.turbowarp.org/api/users/' + args.WHO);
      const jsonData = await userData.json();
      if (!userData || Object.hasOwn(jsonData, 'error')) {
        return '';
      }
      return jsonData.profile.images['90x90'].replace('cdn2', 'uploads');
    }

    async projectComment(args) {
      var userData = await Scratch.fetch('https://trampoline.turbowarp.org/api/projects/' + args.WHO);
      var jsonData = await userData.json();
      if (!userData || Object.hasOwn(jsonData, 'error')) {
        return '';
      }
      const creator = jsonData.author.username;
      userData = await Scratch.fetch('https://corsproxy.io/?https://api.scratch.mit.edu/users/' + creator + '/projects/' + args.WHO + '/comments?limit=1');
      jsonData = await userData.json();
      if (!userData || jsonData.code === 'NotFound') {
        return '';
      }
      if (args.WHAT === 'content') {
        return jsonData[0].content;
      } else {
        return jsonData[0].author.username;
      }
    }
  }
  Scratch.extensions.register(new nktrampoline());
})(Scratch);