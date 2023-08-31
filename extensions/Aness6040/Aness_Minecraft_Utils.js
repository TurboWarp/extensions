// Name: Minecraft Utils
// ID: minecraftUtils
// Description: Adds detections to the Minecraft game for example if the player is a premium account or get the icon of a Minecraft server in URI etc...
// By: Aness6040 <https://scratch.mit.edu/users/AnessScratched/>
// Creator's Github: https://github.com/Aness6040
(function (Scratch) { 
    'use strict';
    const vm = Scratch.vm;
    
class MinecraftUtils {
    getInfo() {
      return {
        "blockIconURI": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABABAMAAABYR2ztAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAwUExURY3acFmsPnLMWletQHFMMz2SLXvCVaSZk4hhRKFxTrOGYLCGXZ90VI5hQrKHWo1iRF/N5qgAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAB/SURBVEjH5ZJBEYAwDASxgAUsYKEWsIAFLGABC1jAAhawUAtwy/Rm6uH2k6S3/WQywCgmQU+dhWuKQFgEdREOeVtFikCzidJwuIt/USHCIRiop3DITJ8iMHhJli/htxSB5fQSx4N4i0ekCP1xVEFAJaRPEQiQWNDbIPCHCKHWD6xxfK4mficNAAAAAElFTkSuQmCC",
        id: 'minecraftUtils',
        name: 'Minecraft Utils',
        color1: "#c7858f",
        color2: "#786468",
        color3: "#745d65",
        blocks: [
          {
            opcode: 'isServerOnline',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'If IP: [IP] port: [PORT] is online?',
            arguments: {
              IP: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '127.0.0.1'
              },
              PORT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 25565
              }
            }
          },
          {
            opcode: 'numberOfPlayers',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Number of Players on [IP] [PORT]',
            arguments: {
              IP: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '127.0.0.1'
              },
              PORT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 25565
              }
            }
          },
          {
            opcode: 'maxPlayers',
            blockType: Scratch.BlockType.REPORTER,
            text: 'Max Players on [IP] [PORT]',
            arguments: {
              IP: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '127.0.0.1'
              },
              PORT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 25565
              }
            }
          },
          {
            opcode: 'accountExists',
            blockType: Scratch.BlockType.BOOLEAN,
            text: 'Is [PLAYER] a premium account?',
            arguments: {
              PLAYER: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Aness6040'
              }
            }
          },
          {
            opcode: 'serverMotd',
            blockType: Scratch.BlockType.REPORTER,
            text: '[IP] [PORT] server MOTD',
            arguments: {
              IP: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'play.hypixel.net'
              },
              PORT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 25565
              }
            }
          },
          {
            opcode: 'getPlayerTextureUrl',
            blockType: Scratch.BlockType.REPORTER,
            text: 'get [PLAYER] [TEXTURELIST] PNG URL',
            arguments: {
              PLAYER: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'Aness6040'
              },
              TEXTURELIST: {
                type: Scratch.ArgumentType.STRING,
                menu: 'textureList',
                defaultValue: 'face'
              }
            }
          },
          {
            opcode: 'getServerIconUri',
            blockType: Scratch.BlockType.REPORTER,
            text: '[IP] [PORT] server icon URI',
            arguments: {
              IP: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'play.hypixel.net'
              },
              PORT: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 25565
              }
            }
          }
        ],
        menus: {
          textureList: ['face', 'bust', 'cube head','full texture']
        }
      };
    }
  
    async isServerOnline(args) {
      const ip = args.IP;
      const port = args.PORT;
  
      try {
        const response = await fetch(`https://api.mcsrvstat.us/2/${ip}:${port}`);
        const data = await response.json();
  
        return data.online;
      } catch (error) {
        return false;
      }
    }
  
    async numberOfPlayers(args) {
      const ip = args.IP;
      const port = args.PORT;
  
      try {
        const response = await fetch(`https://api.mcsrvstat.us/2/${ip}:${port}`);
        const data = await response.json();
  
        if (data.players) {
          return data.players.online;
        } else {
          return 0;
        }
      } catch (error) {
        return 'Error';
      }
    }
  
    async maxPlayers(args) {
      const ip = args.IP;
      const port = args.PORT;
  
      try {
        const response = await fetch(`https://api.mcsrvstat.us/2/${ip}:${port}`);
        const data = await response.json();
  
        if (data.players) {
          return data.players.max;
        } else {
          return 0;
        }
      } catch (error) {
        return 'Error';
      }
    }
  
    async accountExists(args) {
      const player = args.PLAYER;
  
      try {
        const response = await fetch(`https://api.ashcon.app/mojang/v2/user/${player}`);
        const data = await response.json();
  
        return !data.error;
      } catch (error) {
        return false;
      }
    }
  
    async getServerIconUri(args) {
      const ip = args.IP;
      const port = args.PORT;
  
      try {
        const response = await fetch(`https://api.mcsrvstat.us/2/${ip}:${port}`);
        const data = await response.json();
  
        if (data.icon) {
          return data.icon;
        } else {
          return 'No Icon';
        }
      } catch (error) {
        return 'Error';
      }
    }
  
    async serverMotd(args) {
      const ip = args.IP;
      const port = args.PORT;
  
      try {
        const response = await fetch(`https://api.mcsrvstat.us/2/${ip}:${port}`);
        const data = await response.json();
  
        if (data.motd) {
          if (typeof data.motd === 'string') {
            return data.motd;
          } else if (data.motd.clean && Array.isArray(data.motd.clean)) {
            return data.motd.clean.join('\n');
          } else if (data.motd.text) {
            return data.motd.text;
          }
        }
  
        return 'No MOTD available';
      } catch (error) {
        return 'Error';
      }
    }
  
    getPlayerTextureUrl(args) {
      const player = args.PLAYER;
      const textureType = args.TEXTURELIST;
  
      let url;
      if (textureType === 'face') {
        url = `https://minotar.net/helm/${player}/600.png`;
      } else if (textureType === 'bust') {
        url = `https://minotar.net/armor/bust/${player}/500.png`;
      } else if (textureType === 'cube head') {
        url = `https://cravatar.eu/helmhead/${player}/600.png`;
      }
      else if (textureType === 'full texture') {
        url = `https://minotar.net/download/${player}`;
      }
      
  
      return url;
    }
  }
  
  
  Scratch.extensions.register(new MinecraftUtils());
})(Scratch);
