// Name:163music
// ID: chcat1320Music163
// Description: 有关网易云音乐的操作
// By: Unknown
// By: CHCAT1320
// License: MIT

const icon = "data:image/png;base64,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"
class MusicExtension {
    constructor(runtime) {
      this.runtime = runtime;
      this.audioElement = null;
    }
  
    getInfo() {
      return {
        id: '163music',
        name: '网易云音乐',
        color1: "#DD001B",
        blockIconURI:icon,
        blocks: [
          {
            opcode: '搜索音乐',
            blockType: Scratch.BlockType.REPORTER,
            text: '搜索音乐 [name]',
            arguments: {
              name: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Let's live"
              }
            }
          },
          {
            opcode: '获取音乐',
            blockType: Scratch.BlockType.REPORTER,
            text: '获取音乐url [id]',
            arguments: {
              id: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '1952657896'
              }
            }
          },
          {
            opcode: '获取歌词',
            blockType: Scratch.BlockType.REPORTER,
            text: '获取 [id] 的歌词',
            arguments: {
              id: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '1952657896'
              }
            }
          },
          {
            opcode: '获取翻译歌词',
            blockType: Scratch.BlockType.REPORTER,
            text: '获取 [id] 的翻译歌词',
            arguments: {
              id: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '1952657896'
              }
            }
          },
          {
            opcode: '获取封面',
            blockType: Scratch.BlockType.REPORTER,
            text: '获取 [id] 的封面',
            arguments: {
              id: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '1952657896'
              }
            }
          },
          {
            opcode: '播放音乐',
            blockType: Scratch.BlockType.COMMAND,
            text: '从 [url] 播放音乐',
            arguments: {
              url: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'https://example.com/music.mp3'
              }
            }
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: '电台'
          },
          //电台部分
          {
            opcode: '获取电台曲目',
            blockType: Scratch.BlockType.REPORTER,
            text: '获取电台节目 [id]',
            arguments: {
              id: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '350080224'
              }
            }
          },
          {
            opcode: '网页ID转音乐ID',
            blockType: Scratch.BlockType.REPORTER,
            text: '电台音乐ID转音乐ID [id]',
            hideFromPalette: true,
            arguments: {
              id: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '2521984465'
              }
            }
          },
          //控制部分
          {
            blockType: Scratch.BlockType.LABEL,
            text: '控制'
          },
          {
            opcode: '恢复音乐',
            blockType: Scratch.BlockType.COMMAND,
            text: '▶️ 播放音乐'
          },
          {
            opcode: '暂停音乐',
            blockType: Scratch.BlockType.COMMAND,
            text: '⏸ 暂停音乐'
          },
          {
            opcode: '停止音乐',
            blockType: Scratch.BlockType.COMMAND,
            text: '⏹ 停止音乐'
          },
          {
            opcode: '跳转到时间',
            blockType: Scratch.BlockType.COMMAND,
            text: '跳转到时间 [time] 秒',
            arguments: {
              time: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              }
            }
          },
          {
            opcode: '调整音量',
            blockType: Scratch.BlockType.COMMAND,
            text: '将音量调到 [volume]',
            arguments: {
              volume: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100
              }
            }
          },
          //信息部分
          {
            blockType: Scratch.BlockType.LABEL,
            text: '信息'
          },
          {
            opcode: '是否正在播放音乐',
            blockType: Scratch.BlockType.BOOLEAN,
            text: '是否正在播放音乐?'
          },
          {
            opcode: '获取播放时间',
            blockType: Scratch.BlockType.REPORTER,
            text: '音乐播放时间（秒）'
          },
          {
            opcode: '获取音乐总时长',
            blockType: Scratch.BlockType.REPORTER,
            text: '音乐总时长（秒）'
          },
          {
            opcode: '获取当前时间歌词',
            blockType: Scratch.BlockType.REPORTER,
            text: '[lyricsText] 在 [currentTime] 时显示',
            arguments: {
              lyricsText: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '歌词'
              },
              currentTime: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '时间'
              }
            }
          },
          {
            opcode: '获取当前时间歌词在第几行',
            blockType: Scratch.BlockType.REPORTER,
            text: '[lyricsText] 在 [currentTime] 时是第几行',
            arguments: {
              lyricsText: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '歌词'
              },
              currentTime: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '时间'
              }
            }
          },
          {
            opcode: '获取第几行的歌词时间',
            blockType: Scratch.BlockType.REPORTER,
            text: '[lyricsText] 在[linenumber]行 是第几秒 ',
            arguments: {
              lyricsText: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '歌词'
              },
              linenumber: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: '行数'
              }
            }
          },
        ],
      };
    }
    //音乐部分
    搜索音乐(args) {
      return new Promise((resolve, reject) => {
        const url = `https://ilygfw-musicapi.voyage200.top/search?keywords=${args.name}`;
        fetch(url)
          .then(response => response.json())
          .then(data => {
            const songs = data.result.songs;
            function extractSongInfo(songs) {
              return songs.map(song => {
                const artists = song.artists;
                const firstArtistName = artists.length > 0 ? artists[0].name : '';
                return { id: song.id, name: song.name, artists: firstArtistName };
              });
            }
            const songInfo = extractSongInfo(songs);
            const songInfoString = JSON.stringify(songInfo);
            resolve(songInfoString);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  
    获取音乐(args) {
      return new Promise((resolve, reject) => {
        const url = `https://ilygfw-musicapi.voyage200.top/song/url?id=${args.id}`;
        fetch(url)
          .then(response => response.json())
          .then(data => {
            function getMusicUrl(data) {
              return new Promise((resolve, reject) => {
                if (data && data.code === 200 && data.data && data.data.length > 0) {
                  resolve(data.data[0].url.replace(/^http:/, 'https:'));
                } else {
                  reject(new Error('无法获取音乐下载链接'));
                }
              });
            }
            const songInfo = getMusicUrl(data);
            resolve(songInfo);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
    获取封面(args) {
      return new Promise((resolve, reject) => {
        const url = `https://ilygfw-musicapi.voyage200.top/song/detail?ids=${args.id}`;
        fetch(url)
          .then(response => response.json())
          .then(data => {
            const picUrl = data.songs[0].al.picUrl;
            resolve(picUrl);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  
    播放音乐(args) {
      const url = args.url;
      if (this.audioElement) {
        this.audioElement.pause();
      }
  
      this.audioElement = new Audio(url);
      this.audioElement.play();
    }
    获取歌词(args) {
      const cacheKey = `lyrics_${args.id}`;
      const cachedLyrics = localStorage.getItem(cacheKey);
      if (cachedLyrics) {
        return Promise.resolve(cachedLyrics);
      }
      return new Promise((resolve, reject) => {
        const url = `https://ilygfw-musicapi.voyage200.top/lyric?id=${args.id}`;
        fetch(url)
          .then(response => response.json())
          .then(data => {
            const lrc = data.lrc.lyric;
            localStorage.setItem(cacheKey, lrc);
            resolve(lrc);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
    获取翻译歌词(args) {
      const cacheKey = `tranlates_lyrics_${args.id}`;
      const cachedLyrics = localStorage.getItem(cacheKey);
      if (cachedLyrics) {
        return Promise.resolve(cachedLyrics);
      }
      return new Promise((resolve, reject) => {
        const url = `https://ilygfw-musicapi.voyage200.top/lyric?id=${args.id}`;
        fetch(url)
          .then(response => response.json())
          .then(data => {
            const lrc = data.tlyric.lyric;
            localStorage.setItem(cacheKey, lrc);
            resolve(lrc);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  
    //电台部分
    获取电台曲目(args) {
      return new Promise((resolve, reject) => {
        const url = `https://ilygfw-musicapi.voyage200.top/dj/program?rid=${args.id}`;
        fetch(url)
          .then(response => response.json())
          .then(data => {
            if (data && data.code === 200 && data.programs && data.programs.length > 0) {
              const formattedData = data.programs.map(program => ({
                name: program.mainSong.name,
                id: program.mainSong.id
              }));
              resolve(JSON.stringify(formattedData));
            } else {
              reject(new Error('无法获取电台信息'));
            }
          })
          .catch(error => {
            reject(error);
          });
      });
    }
    网页ID转音乐ID(args) {
      return new Promise((resolve, reject) => {
        const url = `https://ilygfw-musicapi.voyage200.top/dj/program/detail?id=${args.id}`;
        fetch(url)
          .then(response => response.json())
          .then(data => {
            const songId = data.program.mainSong.id;
            resolve(songId);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
    //控制部分
    暂停音乐() {
      if (this.audioElement) {
        this.audioElement.pause();
      }
    }
  
    恢复音乐() {
      if (this.audioElement) {
        this.audioElement.play();
      }
    }
  
    停止音乐() {
      if (this.audioElement) {
        this.audioElement.pause();
        this.audioElement = null;
      }
    }
    跳转到时间(args) {
      const time = args.time;
      if (this.audioElement) {
        this.audioElement.currentTime = time;
      }
    }
    调整音量(args) {
      if (this.audioElement) {
        const volumePercent = args.volume;
        if (volumePercent >= 0 && volumePercent <= 100) {
          const volume = volumePercent / 100;
          this.audioElement.volume = volume;
        }
      }
    }
    //信息部分
    是否正在播放音乐() {
      if (this.audioElement) {
        if (!this.audioElement.paused && !this.audioElement.ended) {
          return true;
        } else if (this.audioElement.paused) {
          return "pause";
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  
    获取播放时间() {
      if (this.audioElement) {
        return this.audioElement.currentTime;
      }
      return 0;
    }
  
    获取音乐总时长() {
      if (this.audioElement) {
        return this.audioElement.duration;
      }
      return 0;
    }
    获取当前时间歌词(args) {
      const lines = args.lyricsText.trim().split('\n');
      const lyrics = [];
  
      for (let line of lines) {
        const matches = line.match(/\[(\d+):(\d+\.\d+)\](.*)/);
        if (matches) {
          const time = parseFloat(matches[1]) * 60 + parseFloat(matches[2]);
          const text = matches[3].trim();
          lyrics.push({ time, text });
        }
      }
  
      for (let i = lyrics.length - 1; i >= 0; i--) {
        const { time, text } = lyrics[i];
        if (time <= args.currentTime) {
          return text;
        }
      }
      return '';
    }
  
    获取当前时间歌词在第几行(args) {
      const lines = args.lyricsText.trim().split('\n');
      const currentTime = args.currentTime;
  
      for (let i = lines.length - 1; i >= 0; i--) {
        const matches = lines[i].match(/\[(\d+):(\d+\.\d+)\](.*)/);
        if (matches) {
          const time = parseFloat(matches[1]) * 60 + parseFloat(matches[2]);
          if (time <= currentTime) {
            return i + 1;
          }
        }
      }
      return 0;
    }
    获取第几行的歌词时间(args){
      const lines = args.lyricsText.trim().split('\n');
      if (!lines || lines.length === 0) {
        return '0';
      }
      if (args.linenumber < 0 || args.linenumber >= lines.length) {
        return '0';
      }
      const line = lines[args.linenumber];
      if (!line) {
        return '0';
      }  
      const matches = line.match(/\[(\d+):(\d+\.\d+)\](.*)/);
      if (!matches) {
        return '0';
      }
      const minutes = parseFloat(matches[1]);
      const seconds = parseFloat(matches[2]);
      if (isNaN(minutes) || isNaN(seconds)) {
        return '0';
      }
      return minutes * 60 + seconds; 
    }
  }
  
  Scratch.extensions.register(new MusicExtension());