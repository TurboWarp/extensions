(function(Scratch) {
  'use strict';
  const Icon="";

  let i10ndefaultValue={
    //qxsckmatrix
    'qxsckmatrix.name': 'Matrix',

    'qxsckmatrix.isAMatrix': '[ARR] is matrix?',
    'qxsckmatrix.matrixAdd': 'matrix [ARR] + matrix [ARR2]',
    'qxsckmatrix.matrixSub': 'matrix [ARR] -  matrix [ARR2]',
    'qxsckmatrix.matrixMul': 'matrix [ARR] * matrix [ARR2]',
    'qxsckmatrix.matrixScalar': 'matrix [ARR] * [NUM]',
    'qxsckmatrix.matrixTranspose': 'transpose matrix [ARR]',
    'qxsckmatrix.matrixTrace': 'trace of matrix [ARR]',
  };

  Scratch.translate.setup({
    en: {
      'qxsckmatrix.name': 'Matrix',

      'qxsckmatrix.isAMatrix': '[ARR] is matrix?',
      'qxsckmatrix.matrixAdd': 'matrix [ARR] + matrix [ARR2]',
      'qxsckmatrix.matrixSub': 'matrix [ARR] -  matrix [ARR2]',
      'qxsckmatrix.matrixMul': 'matrix [ARR] * matrix [ARR2]',
      'qxsckmatrix.matrixScalar': 'matrix [ARR] * [NUM]',
      'qxsckmatrix.matrixTranspose': 'transpose matrix [ARR]',
      'qxsckmatrix.matrixTrace': 'trace of matrix [ARR]',
    },
    zh: {
      'qxsckmatrix.name': '矩阵',
      'qxsckmatrix.isAMatrix': '[ARR] 是矩阵吗？',
      'qxsckmatrix.matrixAdd': '矩阵 [ARR] + 矩阵 [ARR2]',
      'qxsckmatrix.matrixSub': '矩阵 [ARR] -  矩阵 [ARR2]',
      'qxsckmatrix.matrixMul': '矩阵 [ARR] * 矩阵 [ARR2]',
      'qxsckmatrix.matrixScalar': '矩阵 [ARR] * [NUM]',
      'qxsckmatrix.matrixTranspose': '转置矩阵 [ARR]',
      'qxsckmatrix.matrixTrace': '矩阵 [ARR] 的迹',
    }
  });

  class Matrix {
    constructor(){
      this.formatMessage=function(id){
        return Scratch.translate({id: id,default: i10ndefaultValue[id]});
      }

      this.getmatrix= (n,m) => Array.from({length:n},()=>new Array(m).fill(0));

      this.isMatrix=function(matrix){
        if(!Array.isArray(matrix)) return false;
        const row=matrix.length,col=matrix[0].length;
        if(row===0 || col===0) return false;
        for(let i=0;i<row;i++){
          if(!Array.isArray(matrix[i]) || matrix[i].length!==col) return false;
          for(let j=0;j<col;j++){
            if(Number.isNaN(Number(matrix[i][j]))) return false;
          }
        }
        return true;
      }
      this.addMatrix=function(matrix1,matrix2){
        if(!this.isMatrix(matrix1) || !this.isMatrix(matrix2)) return '[]';
        matrix1=matrix1.map(row=>row.map(val=>Number(val)));
        matrix2=matrix2.map(row=>row.map(val=>Number(val)));

        const row=matrix1.length,col=matrix1[0].length;
        if(row!==matrix2.length || col!==matrix2[0].length) return '[]';
        let result=this.getmatrix(row,col);
        result=result.map((row,i)=>row.map((val,j)=>matrix1[i][j]+matrix2[i][j]));
        return result;
      }
      this.subMatrix=function(matrix1,matrix2){
        if(!this.isMatrix(matrix1) || !this.isMatrix(matrix2)) return '[]';
        matrix1=matrix1.map(row=>row.map(val=>Number(val)));
        matrix2=matrix2.map(row=>row.map(val=>Number(val)));

        const row=matrix1.length,col=matrix1[0].length;
        if(row!==matrix2.length || col!==matrix2[0].length) return '[]';
        let result=this.getmatrix(row,col);
        result=result.map((row,i)=>row.map((val,j)=>matrix1[i][j]-matrix2[i][j]));
        return result;
      }
      this.mulMatrix=function(matrix1,matrix2){
        if(!this.isMatrix(matrix1) || !this.isMatrix(matrix2)) return '[]';
        matrix1=matrix1.map(row=>row.map(val=>Number(val)));
        matrix2=matrix2.map(row=>row.map(val=>Number(val)));
        let row=matrix1.length;
        if(matrix1[0].length!==matrix2.length) return '[]';
        let result=this.getmatrix(row,matrix2[0].length);
        for(let i=0;i<row;i++){
          for(let j=0;j<matrix2[0].length;j++){
            let sum=0;
            for(let k=0;k<matrix2.length;k++){
              sum+=matrix1[i][k]*matrix2[k][j];
            }
            result[i][j]=sum;
            }
          }
        return result;
      }
      this.scalarMatrix=function(matrix1,num){
        if(!this.isMatrix(matrix1)) return '[]';
        matrix1=matrix1.map(row=>row.map(val=>Number(val)));

        const row=matrix1.length,col=matrix1[0].length;
        let result=this.getmatrix(row,col);
        result=result.map((row,i)=>row.map((val,j)=>matrix1[i][j]*num));
        return result;
      }
      this.transposeMatrix=function(matrix1){
        if(!this.isMatrix(matrix1)) return '[]';
        matrix1=matrix1.map(row=>row.map(val=>Number(val)));

        const row=matrix1.length,col=matrix1[0].length;
        let result=this.getmatrix(col,row);
        result=result.map((row,i)=>row.map((val,j)=>matrix1[j][i]));
        return result;
      }
      this.traceMatrix=function(matrix1){
        if(!this.isMatrix(matrix1)) return 'NaN';
        matrix1=matrix1.map(row=>row.map(val=>Number(val)));

        const row=matrix1.length,col=matrix1[0].length;
        if(row===col){
          let result=0;
          for(let i=0;i<row;i++) result+=matrix1[i][i];
          return result;
        }else{
          return 'NaN';
        }
      }
    }

    getInfo() {
      return {
        id:'qxsckmatrix',
        name: this.formatMessage('qxsckmatrix.name'),
        color1: '#6caa0e',
        color2: '#6caa0e',
        blockIconURI: Icon,
        menuIconURI: Icon,
        blocks: [
          //command,reporter,Boolean,hat,conditional,loop
          {
            opcode:'isAMatrix',
            blockType: 'Boolean',
            text: this.formatMessage('qxsckmatrix.isAMatrix'),
            arguments: {
              ARR: {
                type: 'string',
                defaultValue:'[[1,2],[3,4]]'
              },
            },
          },
          {
            opcode:'matrixAdd',
            blockType: 'reporter',
            text: this.formatMessage('qxsckmatrix.matrixAdd'),
            arguments: {
              ARR: {
                type: 'string',
                defaultValue:'[[1,2],[3,4]]'
              },
              ARR2: {
                type: 'string',
                defaultValue:'[[1,2],[3,4]]'
              },
            },
          },
          {
            opcode:'matrixSub',
            blockType: 'reporter',
            text: this.formatMessage('qxsckmatrix.matrixSub'),
            arguments: {
              ARR: {
                type: 'string',
                defaultValue:'[[1,2],[3,4]]'
              },
              ARR2: {
                type: 'string',
                defaultValue:'[[2,3],[4,5]]'
              },
            },
          },
          {
            opcode:'matrixMul',
            blockType: 'reporter',
            text: this.formatMessage('qxsckmatrix.matrixMul'),
            arguments: {
              ARR: {
                type: 'string',
                defaultValue:'[[1,0,2],[-1,3,1]]'
              },
              ARR2: {
                type: 'string',
                defaultValue:'[[3,1],[2,1],[1,0]]'
              },
            },
          },
          {
            opcode:'matrixScalar',
            blockType: 'reporter',
            text: this.formatMessage('qxsckmatrix.matrixScalar'),
            arguments: {
              ARR: {
                type: 'string',
                defaultValue:'[[1,2],[3,4]]'
              },
              NUM: {
                type: 'string',
                defaultValue:'2'
              },
            },
          },
          {
            opcode:'matrixTranspose',
            blockType: 'reporter',
            text: this.formatMessage('qxsckmatrix.matrixTranspose'),
            arguments: {
              ARR: {
                type: 'string',
                defaultValue:'[[1,2],[3,4]]'
              },
            },
          },
          {
            opcode:'matrixTrace',
            blockType: 'reporter',
            text: this.formatMessage('qxsckmatrix.matrixTrace'),
            arguments: {
              ARR: {
                type: 'string',
                defaultValue:'[[1,2],[3,4]]'
              },
            },
          },
        ]
      };
    }
    isAMatrix(args){
      try{
        let arr=JSON.parse(args.ARR);
        return this.isMatrix(arr);
      }catch(error){
        return false;
      }
    }
    matrixAdd(args){
      try{
        let arr=JSON.parse(args.ARR),arr2=JSON.parse(args.ARR2);
        return JSON.stringify(this.addMatrix(arr,arr2));
      }catch(error){
        return '[]';
      }
    }
    matrixSub(args){
      try{
        let arr=JSON.parse(args.ARR),arr2=JSON.parse(args.ARR2);
        return JSON.stringify(this.subMatrix(arr,arr2));
      }catch(error){
        return '[]';
      }
    }
    matrixMul(args){
      try{
        let arr=JSON.parse(args.ARR),arr2=JSON.parse(args.ARR2);
        return JSON.stringify(this.mulMatrix(arr,arr2));
      }catch(error){
        return '[]';
      }
    }
    matrixScalar(args){
      try{
        let arr=JSON.parse(args.ARR),num=Number(args.NUM);
        return JSON.stringify(this.scalarMatrix(arr,num));
      }catch(error){
        return '[]';
      }
    }
    matrixTranspose(args){
      try{
        let arr=JSON.parse(args.ARR);
        return JSON.stringify(this.transposeMatrix(arr));
      }catch(error){
        return '[]';
      }
    }
    matrixTrace(args){
      try{
        let arr=JSON.parse(args.ARR);
        return this.traceMatrix(arr);
      }catch(error){
        return 'NaN';
      }
    }
  }
  Scratch.extensions.register(new Matrix());
}(Scratch));
