(function(Scratch) {
  'use strict';
  const Icon="data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI3OS4yNSIgaGVpZ2h0PSI3OS4yNSIgdmlld0JveD0iMCwwLDc5LjI1LDc5LjI1Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjAwLjM3NSwtMTQwLjM3NSkiPjxnIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2lzUGFpbnRpbmdMYXllciZxdW90Ozp0cnVlfSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMjI0LjAzNDY1LDE5OC43NTAwMWMtNi41NjE4LDAgLTExLjg4MTE5LC01LjMxOTM5IC0xMS44ODExOSwtMTEuODgxMTl2LTEzLjczNzYzYzAsLTYuNTYxOCA1LjMxOTM5LC0xMS44ODExOSAxMS44ODExOSwtMTEuODgxMTkiIHN0cm9rZS13aWR0aD0iMy43NSIvPjxwYXRoIGQ9Ik0yNTUuOTY1MzUsMTYxLjI0OTk5YzYuNTYxOCwwIDExLjg4MTE5LDUuMzE5MzkgMTEuODgxMTksMTEuODgxMTl2MTMuNzM3NjNjMCw2LjU2MTggLTUuMzE5MzksMTEuODgxMTkgLTExLjg4MTE5LDExLjg4MTE5IiBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpbmRleCZxdW90OzpudWxsfSIgc3Ryb2tlLXdpZHRoPSIzLjc1Ii8+PHBhdGggZD0iTTIyMy44MTAxNywxOTIuNTIzMDRjLTIuMTIzMSwwIC0zLjg0NDIxLC0xLjcyMTExIC0zLjg0NDIxLC0zLjg0NDIxdjBjMCwtMi4xMjMxIDEuNzIxMTEsLTMuODQ0MjEgMy44NDQyMSwtMy44NDQyMWgxMC4zMzEzMWMyLjEyMzEsMCAzLjg0NDIxLDEuNzIxMTEgMy44NDQyMSwzLjg0NDIxdjBjMCwyLjEyMzEgLTEuNzIxMTEsMy44NDQyMSAtMy44NDQyMSwzLjg0NDIxeiIgc3Ryb2tlLXdpZHRoPSIyLjUiLz48cGF0aCBkPSJNMjQ1Ljg1ODUyLDE5Mi41MjMwNGMtMi4xMjMxLDAgLTMuODQ0MjEsLTEuNzIxMTEgLTMuODQ0MjEsLTMuODQ0MjF2MGMwLC0yLjEyMzEgMS43MjExMSwtMy44NDQyMSAzLjg0NDIxLC0zLjg0NDIxaDEwLjMzMTMxYzIuMTIzMSwwIDMuODQ0MjEsMS43MjExMSAzLjg0NDIxLDMuODQ0MjF2MGMwLDIuMTIzMSAtMS43MjExMSwzLjg0NDIxIC0zLjg0NDIxLDMuODQ0MjF6IiBzdHJva2Utd2lkdGg9IjIuNSIvPjxwYXRoIGQ9Ik0yMjMuODEwMTcsMTc1LjE2NTM2Yy0yLjEyMzEsMCAtMy44NDQyMSwtMS43MjExMSAtMy44NDQyMSwtMy44NDQyMXYwYzAsLTIuMTIzMSAxLjcyMTExLC0zLjg0NDIxIDMuODQ0MjEsLTMuODQ0MjFoMTAuMzMxMzFjMi4xMjMxLDAgMy44NDQyMSwxLjcyMTExIDMuODQ0MjEsMy44NDQyMXYwYzAsMi4xMjMxIC0xLjcyMTExLDMuODQ0MjEgLTMuODQ0MjEsMy44NDQyMXoiIHN0cm9rZS13aWR0aD0iMi41Ii8+PHBhdGggZD0iTTI0NS42MDg1MiwxNzUuMTY1MzZjLTIuMTIzMSwwIC0zLjg0NDIxLC0xLjcyMTExIC0zLjg0NDIxLC0zLjg0NDIxdjBjMCwtMi4xMjMxIDEuNzIxMTEsLTMuODQ0MjEgMy44NDQyMSwtMy44NDQyMWgxMC4zMzEzMWMyLjEyMzEsMCAzLjg0NDIxLDEuNzIxMTEgMy44NDQyMSwzLjg0NDIxdjBjMCwyLjEyMzEgLTEuNzIxMTEsMy44NDQyMSAtMy44NDQyMSwzLjg0NDIxeiIgc3Ryb2tlLXdpZHRoPSIyLjUiLz48cGF0aCBkPSJNMjAwLjM3NSwxODBjMCwtMjEuODg0MjkgMTcuNzQwNzEsLTM5LjYyNSAzOS42MjUsLTM5LjYyNWMyMS44ODQyOCwwIDM5LjYyNSwxNy43NDA3MSAzOS42MjUsMzkuNjI1YzAsMjEuODg0MjkgLTE3Ljc0MDcyLDM5LjYyNSAtMzkuNjI1LDM5LjYyNWMtMjEuODg0MjksMCAtMzkuNjI1LC0xNy43NDA3MSAtMzkuNjI1LC0zOS42MjV6IiBzdHJva2Utd2lkdGg9IjAiLz48L2c+PC9nPjwvc3ZnPjwhLS1yb3RhdGlvbkNlbnRlcjozOS42MjU6MzkuNjI1LS0+";

  let i10ndefaultValue={
    //qxsckmatrix
    'qxsckmatrix.name': 'Matrix',

    'qxsckmatrix.isAMatrix': '[ARR] is matrix?',
    'qxsckmatrix.matrixOper': 'matrix [ARR] [OPER] matrix [ARR2]',
    'qxsckmatrix.matrixScalar': 'matrix [ARR] * [NUM]',
    'qxsckmatrix.matrixTranspose': 'transpose matrix [ARR]',
    'qxsckmatrix.matrixTrace': 'trace of matrix [ARR]',
  };

  Scratch.translate.setup({
    en: {
      'qxsckmatrix.name': 'Matrix',

      'qxsckmatrix.isAMatrix': '[ARR] is matrix?',
      'qxsckmatrix.matrixOper': 'matrix [ARR] [OPER] matrix [ARR2]',
      'qxsckmatrix.matrixScalar': 'matrix [ARR] * [NUM]',
      'qxsckmatrix.matrixTranspose': 'transpose matrix [ARR]',
      'qxsckmatrix.matrixTrace': 'trace of matrix [ARR]',
    },
    zh: {
      'qxsckmatrix.name': '矩阵',

      'qxsckmatrix.isAMatrix': '[ARR] 是矩阵吗？',
      'qxsckmatrix.matrixOper': '矩阵 [ARR] [OPER] 矩阵 [ARR2]',
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
            opcode:'matrixOper',
            blockType: 'reporter',
            text: this.formatMessage('qxsckmatrix.matrixOper'),
            arguments: {
              ARR: {
                type: 'string',
                defaultValue:'[[1,2],[3,4]]'
              },
              ARR2: {
                type: 'string',
                defaultValue:'[[1,2],[3,4]]'
              },
              OPER: {
                type: 'string',
                menu: 'matrixOper.List',
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
        ],
        menus: {
          'matrixOper.List':[
            {
              text: '+',
              value: '+'
            },
            {
              text: '-',
              value: '-'
            },
            {
              text: '*',
              value: '*'
            },
          ],
        }
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
    matrixOper(args){
      let oper=args.OPER;
      try{
        let arr=JSON.parse(args.ARR),arr2=JSON.parse(args.ARR2);
        if(oper==='+') return JSON.stringify(this.addMatrix(arr,arr2));
        else if(oper==='-') return JSON.stringify(this.subMatrix(arr,arr2));
        else if(oper==='*') return JSON.stringify(this.mulMatrix(arr,arr2));
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
