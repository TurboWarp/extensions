(function(Scratch) {
'use strict';

class MountainAI {
  // MountainAI Build-15 public beta
  constructor(numLayers=2, embedDim=16, ffDim=64, seqLen=8) {
    this.numLayers = numLayers;
    this.embedDim = embedDim;
    this.ffDim = ffDim;
    this.seqLen = seqLen;
    this.temperature = 1.0;

    this.vocab = [];
    this.tokenToIdx = {};
    this.idxToToken = {};

    this.W_embed = null;

    this.W_q = [];
    this.W_k = [];
    this.W_v = [];
    this.W_out = [];

    this.W_ff1 = [];
    this.W_ff2 = [];

    this.finalOutputWeights = null;

    this.initialized = false;
    this.learningRate = 0.01;
  }

  randomMatrix(rows, cols) {
    const m = [];
    for(let i=0; i<rows; i++){
      m[i] = [];
      for(let j=0; j<cols; j++){
        m[i][j] = (Math.random()-0.5)*0.1;
      }
    }
    return m;
  }

  buildVocab(text) {
    const tokens = text.toLowerCase().split(/\s+/).filter(Boolean);
    const uniqueTokens = [...new Set(tokens)];
    this.vocab = uniqueTokens;
    this.tokenToIdx = {};
    this.idxToToken = {};
    this.vocab.forEach((t,i) => {
      this.tokenToIdx[t] = i;
      this.idxToToken[i] = t;
    });
    const vocabSize = this.vocab.length;

    this.W_embed = this.randomMatrix(vocabSize, this.embedDim);

    this.W_q = [];
    this.W_k = [];
    this.W_v = [];
    this.W_out = [];
    this.W_ff1 = [];
    this.W_ff2 = [];

    for(let i=0; i<this.numLayers; i++){
      this.W_q.push(this.randomMatrix(this.embedDim, this.embedDim));
      this.W_k.push(this.randomMatrix(this.embedDim, this.embedDim));
      this.W_v.push(this.randomMatrix(this.embedDim, this.embedDim));
      this.W_out.push(this.randomMatrix(this.embedDim, this.embedDim));
      this.W_ff1.push(this.randomMatrix(this.embedDim, this.ffDim));
      this.W_ff2.push(this.randomMatrix(this.ffDim, this.embedDim));
    }

    this.finalOutputWeights = this.randomMatrix(this.embedDim, vocabSize);
    this.initialized = true;
  }

  tokenize(text) {
    const tokens = text.toLowerCase().split(/\s+/).filter(Boolean);
    return tokens.map(t => this.tokenToIdx[t] !== undefined ? this.tokenToIdx[t] : 0);
  }

  detokenize(indices) {
    return indices.map(i => this.idxToToken[i]).join(' ');
  }

  matMulVec(mat, vec) {
    const res = [];
    for(let i=0; i<mat.length; i++){
      let s = 0;
      for(let j=0; j<vec.length; j++){
        s += mat[i][j]*vec[j];
      }
      res[i] = s;
    }
    return res;
  }

  softmax(arr) {
    const max = Math.max(...arr);
    const exps = arr.map(x => Math.exp((x - max)/this.temperature));
    const sum = exps.reduce((a,b)=>a+b,0);
    return exps.map(e => e/sum);
  }

  relu(x) {return x>0 ? x : 0;}

  feedForward(input, layerIndex) {
    const W1 = this.W_ff1[layerIndex];
    const W2 = this.W_ff2[layerIndex];
    const seqLen = input.length;

    let hidden = [];
    for(let i=0; i<seqLen; i++){
      let row = this.matMulVec(W1, input[i]);
      row = row.map(x => this.relu(x));
      hidden.push(row);
    }

    let output = [];
    for(let i=0; i<seqLen; i++){
      output.push(this.matMulVec(W2, hidden[i]));
    }

    return output;
  }

  transformerLayer(emb, layerIndex) {
    const Wq = this.W_q[layerIndex];
    const Wk = this.W_k[layerIndex];
    const Wv = this.W_v[layerIndex];
    const Wout = this.W_out[layerIndex];

    const seqLen = emb.length;
    const embedDim = this.embedDim;

    const Q = emb.map(v => this.matMulVec(Wq, v));
    const K = emb.map(v => this.matMulVec(Wk, v));
    const V = emb.map(v => this.matMulVec(Wv, v));

    const scores = [];
    for(let i=0; i<seqLen; i++){
      scores[i] = [];
      for(let j=0; j<seqLen; j++){
        let s=0;
        for(let d=0; d<embedDim; d++){
          s += Q[i][d]*K[j][d];
        }
        scores[i][j] = s/Math.sqrt(embedDim);
      }
    }

    for(let i=0; i<seqLen; i++){
      scores[i] = this.softmax(scores[i]);
    }

    let out = [];
    for(let i=0; i<seqLen; i++){
      let vec = new Array(embedDim).fill(0);
      for(let j=0; j<seqLen; j++){
        for(let d=0; d<embedDim; d++){
          vec[d] += scores[i][j]*V[j][d];
        }
      }
      out.push(vec);
    }

    let finalOut = [];
    for(let i=0; i<seqLen; i++){
      finalOut.push(this.matMulVec(Wout, out[i]));
    }

    return finalOut;
  }

  forward(seq) {
    while(seq.length < this.seqLen) seq.unshift(0);
    seq = seq.slice(-this.seqLen);

    let out = seq.map(i => this.W_embed[i]);
    for(let i=0; i<this.numLayers; i++){
      out = this.transformerLayer(out, i);
      out = this.feedForward(out, i);
    }

    const last = out[out.length-1];
    const logits = [];
    for(let i=0; i<this.vocab.length; i++){
      let s=0;
      for(let d=0; d<this.embedDim; d++){
        s += last[d]*this.finalOutputWeights[d][i];
      }
      logits[i] = s;
    }

    return logits;
  }

  sampleToken(logits) {
    const probs = this.softmax(logits);
    let r = Math.random();
    let cum=0;
    for(let i=0; i<probs.length; i++){
      cum += probs[i];
      if(r < cum) return i;
    }
    return probs.length-1;
  }

  generate(prefix, length=10) {
    if(!this.initialized) return 'Model not initialized';

    let tokens = this.tokenize(prefix);
    while(tokens.length < this.seqLen){
      tokens.unshift(0);
    }
    tokens = tokens.slice(-this.seqLen);

    const generated = [...tokens];

    for(let i=0; i<length; i++){
      const logits = this.forward(tokens);
      const nextToken = this.sampleToken(logits);
      generated.push(nextToken);
      tokens.shift();
      tokens.push(nextToken);
    }

    return this.detokenize(generated.slice(this.seqLen));
  }

  async train(text, epochs=10, onEpoch=null) {
    this.buildVocab(text);
    const tokens = this.tokenize(text);
    if(tokens.length < this.seqLen+1) return;

    for(let epoch=1; epoch<=epochs; epoch++){
      if(onEpoch) onEpoch(epoch);
      for(let i=0; i < tokens.length - this.seqLen; i++){
        const inputSeq = tokens.slice(i, i+this.seqLen);
        const target = tokens[i+this.seqLen];

        const logits = this.forward(inputSeq);
        const probs = this.softmax(logits);

        const dL_dlogits = probs.slice();
        dL_dlogits[target] -= 1;

        for(let d=0; d<this.embedDim; d++){
          for(let v=0; v<this.vocab.length; v++){
            this.finalOutputWeights[d][v] -= this.learningRate * dL_dlogits[v] * this.W_embed[inputSeq[this.seqLen-1]][d];
          }
        }

        for(let d=0; d<this.embedDim; d++){
          this.W_embed[inputSeq[this.seqLen-1]][d] -= this.learningRate * dL_dlogits[target];
        }
      }
      await new Promise(r => setTimeout(r, 1000)); // Delay 1 sec
    }
  }

  setTemperature(t) {
    this.temperature = t;
  }

  resetModel(numLayers, embedDim, ffDim, seqLen) {
    this.numLayers = numLayers;
    this.embedDim = embedDim;
    this.ffDim = ffDim;
    this.seqLen = seqLen;
    this.initialized = false;
    this.vocab = [];
    this.tokenToIdx = {};
    this.idxToToken = {};
    this.W_embed = null;
    this.W_q = [];
    this.W_k = [];
    this.W_v = [];
    this.W_out = [];
    this.W_ff1 = [];
    this.W_ff2 = [];
    this.finalOutputWeights = null;
  }
}

class MountainAIExtension {
  constructor() {
    this.model = new MountainAI(2, 16, 64, 8);
    this.currentEpoch = 0;
  }

  getInfo() {
    return {
      id: 'MountainAI',
      name: Scratch.translate('MountainAI'),
      blocks: [
        {
          opcode: 'train',
          blockType: Scratch.BlockType.COMMAND,
          text: Scratch.translate('train on text [TEXT], [EPOCHS] epochs'),
          arguments: {
            TEXT: {type: Scratch.ArgumentType.STRING, defaultValue: 'any train text here'},
            EPOCHS: {type: Scratch.ArgumentType.NUMBER, defaultValue: 50},
          },
        },
        {
          opcode: 'generate',
          blockType: Scratch.BlockType.REPORTER,
          text: Scratch.translate('generate from [PROMPT] with length [LENGTH]'),
          arguments: {
            PROMPT: {type: Scratch.ArgumentType.STRING, defaultValue: 'He look in his eyes and '},
            LENGTH: {type: Scratch.ArgumentType.NUMBER, defaultValue: 50},
          },
        },
        {
          opcode: 'setTemperature',
          blockType: Scratch.BlockType.COMMAND,
          text: Scratch.translate('set temperature [TEMP]'),
          arguments: {
            TEMP: {type: Scratch.ArgumentType.NUMBER, defaultValue: 0.3},
          },
        },
        {
          opcode: 'setNumLayers',
          blockType: Scratch.BlockType.COMMAND,
          text: Scratch.translate('Layer Count [NUM]'),
          arguments: {
            NUM: {type: Scratch.ArgumentType.NUMBER, defaultValue: 2},
          },
        },
        {
          opcode: 'setEmbedDim',
          blockType: Scratch.BlockType.COMMAND,
          text: Scratch.translate('embedding size [NUM]'),
          arguments: {
            NUM: {type: Scratch.ArgumentType.NUMBER, defaultValue: 16},
          },
        },
        {
          opcode: 'setFFDim',
          blockType: Scratch.BlockType.COMMAND,
          text: Scratch.translate('FFN size [NUM]'),
          arguments: {
            NUM: {type: Scratch.ArgumentType.NUMBER, defaultValue: 64},
          },
        },
        {
          opcode: 'setSeqLen',
          blockType: Scratch.BlockType.COMMAND,
          text: Scratch.translate('context size [NUM]'),
          arguments: {
            NUM: {type: Scratch.ArgumentType.NUMBER, defaultValue: 16},
          },
        },
        {
          opcode: 'getCurrentEpoch',
          blockType: Scratch.BlockType.REPORTER,
          text: Scratch.translate('current epoch'),
        },
      ],
    };
  }

  async train({TEXT, EPOCHS}) {
    this.currentEpoch = 0;
    const onEpoch = (epoch) => {
      this.currentEpoch = epoch;
    };
    await this.model.train(TEXT, Number(EPOCHS), onEpoch);
    this.currentEpoch = 0;
  }

  generate({PROMPT, LENGTH}) {
    return this.model.generate(PROMPT, Number(LENGTH));
  }

  setTemperature({TEMP}) {
    this.model.setTemperature(Number(TEMP));
  }

  setNumLayers({NUM}) {
    const n = Math.max(1, Math.floor(NUM));
    this.model.resetModel(n, this.model.embedDim, this.model.ffDim, this.model.seqLen);
  }

  setEmbedDim({NUM}) {
    const n = Math.max(1, Math.floor(NUM));
    this.model.resetModel(this.model.numLayers, n, this.model.ffDim, this.model.seqLen);
  }

  setFFDim({NUM}) {
    const n = Math.max(1, Math.floor(NUM));
    this.model.resetModel(this.model.numLayers, this.model.embedDim, n, this.model.seqLen);
  }

  setSeqLen({NUM}) {
    const n = Math.max(1, Math.floor(NUM));
    this.model.resetModel(this.model.numLayers, this.model.embedDim, this.model.ffDim, n);
  }

  getCurrentEpoch() {
    return this.currentEpoch;
  }
}

Scratch.extensions.register(new MountainAIExtension());
})(Scratch);