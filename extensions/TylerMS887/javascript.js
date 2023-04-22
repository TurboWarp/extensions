
// create by scratch3-extension generator
const ArgumentType = Scratch.ArgumentType;
const BlockType = Scratch.BlockType;
const formatMessage = Scratch.formatMessage;
const log = Scratch.log;

const menuIconURI = null;
const blockIconURI = null;

class js{
  constructor (runtime){
    this.runtime = runtime;
    // communication related
    this.comm = runtime.ioDevices.comm;
    this.session = null;
    this.runtime.registerPeripheralExtension('js', this);
    // session callbacks
    this.reporter = null;
    this.onmessage = this.onmessage.bind(this);
    this.onclose = this.onclose.bind(this);
    this.write = this.write.bind(this);
    // string op
    this.decoder = new TextDecoder();
    this.lineBuffer = '';
  }

  onclose (){
    this.session = null;
  }

  write (data, parser = null){
    if (this.session){
      return new Promise(resolve => {
        if (parser){
          this.reporter = {
            parser,
            resolve
          }
        }
        this.session.write(data);
      })
    }
  }

  onmessage (data){
    const dataStr = this.decoder.decode(data);
    this.lineBuffer += dataStr;
    if (this.lineBuffer.indexOf('\n') !== -1){
      const lines = this.lineBuffer.split('\n');
      this.lineBuffer = lines.pop();
      for (const l of lines){
        if (this.reporter){
          const {parser, resolve} = this.reporter;
          resolve(parser(l));
        };
      }
    }
  }

  scan (){
    this.comm.getDeviceList().then(result => {
        this.runtime.emit(this.runtime.constructor.PERIPHERAL_LIST_UPDATE, result);
    });
  }

  getInfo (){
    return {
      id: 'js',
      name: 'JavaScript',
      color1: '#ffd600',
      color2: '#a5ac00',
      menuIconURI: menuIconURI,
      blockIconURI: blockIconURI,
      blocks: [
        {
          opcode: 'jsEval',
          blockType: BlockType.COMMAND,
          arguments: {
            script: {
              type: ArgumentType.STRING
            }
          },
          text: 'run [script]'
        },
        {
          opcode: 'jsGetResults',
          blockType: BlockType.REPORTER,
          arguments: {
            script: {
              type: ArgumentType.STRING
            }
          },
          text: 'result of [script]'
        },
        {
          opcode: 'jsIsTrue',
          blockType: BlockType.BOOLEAN,
          arguments: {
            script: {
              type: ArgumentType.STRING
            }
          },
          text: '[script] is true?'
        }
      ]
    }
  }

jsEval (args, util){
  const script = args.script;
  eval(script);
}

jsGetResults (args, util){
  const script = args.script;

  return script;
}

jsIsTrue (args, util){
  const script = args.script;

  return script;
}

}

module.exports = js;
