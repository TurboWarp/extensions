(function(Scratch) {
  'use strict';
  let graps=Object.create(null);

  const IconURI='data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxNjYuMDQzNTkiIGhlaWdodD0iMTY2LjQ4NjQ0IiB2aWV3Qm94PSIwLDAsMTY2LjA0MzU5LDE2Ni40ODY0NCI+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE0MS4zMjEwMywtNzguNDA5NikiPjxnIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2lzUGFpbnRpbmdMYXllciZxdW90Ozp0cnVlfSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48Zz48cGF0aCBkPSJNMjMwLjAwMDA5LDEyMy45Njc0NWM4LjU3LC0xNC44NyAxNy4wMSwtMjkuODMgMjUuOCwtNDQuNTdjNS43NCw5Ljk0IDExLjUsMTkuODYgMTcuMTgsMjkuODNjLTEwLjA1LDMuNDcgLTE5LjY2LDguMTggLTI5LjE5LDEyLjgyYy00LjI1LDAuMTEgLTYuNzksMy43MSAtMTAuMjYsNS41OGMtMS4xOCwtMS4yMyAtMi4zNSwtMi40NSAtMy41MywtMy42NnoiIGZpbGw9IiNlZTc4MDAiIHN0cm9rZT0iI2VlNzgwMCIvPjxwYXRoIGQ9Ik0yNDMuNzkwMDksMTIyLjA0NzQ1YzkuNTMsLTQuNjQgMTkuMTQsLTkuMzUgMjkuMTksLTEyLjgyYzQuNDEsNy41IDguNjgsMTUuMDkgMTMuMDYsMjIuNjFjLTguMDcsMS4wMyAtMTQuNTksNi42NyAtMjIuMDksOS40NWMtOC4yNiwyLjUgLTE0LjgsOC42NiAtMjMuMjUsMTAuNzRjLTExLjAzLDQuOSAtMjEuNjcsMTAuNzcgLTMyLjg4LDE1LjMyYy0wLjcsMC4wMyAtMi4wOSwwLjExIC0yLjc5LDAuMTRjOC4wNSwtMTQuNjYgMTYuNjQsLTI5LjAyIDI0Ljk3LC00My41MmMxLjE4LDEuMjEgMi4zNSwyLjQzIDMuNTMsMy42NmMzLjQ3LC0xLjg3IDYuMDEsLTUuNDcgMTAuMjYsLTUuNTh6IiBmaWxsPSIjZWE1NDA0IiBzdHJva2U9IiNlYTU0MDQiLz48cGF0aCBkPSJNMjYzLjk1MDA5LDE0MS4yODc0NWM3LjUsLTIuNzggMTQuMDIsLTguNDIgMjIuMDksLTkuNDVjNi44NCwxMS44NCAxMy42MywyMy43MSAyMC40NiwzNS41NmMtMzIuODksMC4wNSAtNjUuNzksMC4xNSAtOTguNjgsLTAuMDVjMTEuMjEsLTQuNTUgMjEuODUsLTEwLjQyIDMyLjg4LC0xNS4zMmM4LjQ1LC0yLjA4IDE0Ljk5LC04LjI0IDIzLjI1LC0xMC43NHoiIGZpbGw9IiNlODNlMGIiIHN0cm9rZT0iI2U4M2UwYiIvPjwvZz48Zz48cGF0aCBkPSJNMTY3LjA3LDEyOS40NmMxNywtMC4yMSAzNC4wMSwtMC4zMiA1MS4wMSwtMC4wNmMwLjQ5LDEuMDMgMSwyLjA2IDEuNTEsMy4xYy0xMy40LDIuODMgLTI1LjM5LDkuODkgLTM4Ljc0LDEyLjljLTkuODYsNS4zIC0yMS45NSw2LjEgLTMwLjUxLDEzLjU0YzUuMDgsLTEwLjA5IDExLjMsLTE5LjU3IDE2LjczLC0yOS40OHoiIGZpbGw9IiM5NDZkYWMiIHN0cm9rZT0iIzk0NmRhYyIvPjxwYXRoIGQ9Ik0xODAuODUsMTQ1LjRjMTMuMzUsLTMuMDEgMjUuMzQsLTEwLjA3IDM4Ljc0LC0xMi45YzMuMDIsNC45MSA1Ljg0LDkuOTMgOC43MSwxNC45NGMtMjEuODcsNy44MiAtNDMuNzYsMTYuMDMgLTY1Ljc5LDIzLjYxYy01LjkxLDIuMzcgLTEyLjQ3LDMuNDIgLTE3LjU3LDcuNWMtMS4xMywtMS43NiAtMi4xNCwtMy41OSAtMy4wNSwtNS40N2MyLjg2LC00LjY4IDUuMjEsLTkuNzEgOC40NSwtMTQuMTRjOC41NiwtNy40NCAyMC42NSwtOC4yNCAzMC41MSwtMTMuNTR6IiBmaWxsPSIjODI2MWE3IiBzdHJva2U9IiM4MjYxYTciLz48cGF0aCBkPSJNMTYyLjUxLDE3MS4wNWMyMi4wMywtNy41OCA0My45MiwtMTUuNzkgNjUuNzksLTIzLjYxYzMuMDIsNS40IDYuMzMsMTAuNjQgOS4yNCwxNi4xMWMtMjMuNzEsNi45NyAtNDYuNDksMTYuNjkgLTY5LjkzLDI0LjUxYy00Ljg0LDEuMyAtOS40NCwzLjMzIC0xMy43LDUuOTZjLTMuMiwtNS4wNCAtNS45MiwtMTAuMzUgLTguOTcsLTE1LjQ3YzUuMSwtNC4wOCAxMS42NiwtNS4xMyAxNy41NywtNy41eiIgZmlsbD0iIzZjNTVhMSIgc3Ryb2tlPSIjNmM1NWExIi8+PHBhdGggZD0iTTE2Ny42MSwxODguMDZjMjMuNDQsLTcuODIgNDYuMjIsLTE3LjU0IDY5LjkzLC0yNC41MWMxLjg5LDMuMTQgMy43NCw2LjMxIDUuNTYsOS40OWMtMi41Niw1LjExIC01LjU0LDEwIC04LjQ0LDE0LjkyYy0wLjE3LC0xLjMxIC0wLjMzLC0yLjYyIC0wLjUsLTMuOTNjLTIyLjgsOC45MiAtNDYuMjIsMTYuMjUgLTY4LjkxLDI1LjQ0Yy0wLjE0LDEuMjIgLTAuMjgsMi40MyAtMC40MiwzLjY1Yy0zLjY3LC02LjM1IC03LjM3LC0xMi42OSAtMTAuOTIsLTE5LjFjNC4yNiwtMi42MyA4Ljg2LC00LjY2IDEzLjcsLTUuOTZ6IiBmaWxsPSIjNTI0OTljIiBzdHJva2U9IiM1MjQ5OWMiLz48cGF0aCBkPSJNMTY1LjI1LDIwOS40N2MyMi42OSwtOS4xOSA0Ni4xMSwtMTYuNTIgNjguOTEsLTI1LjQ0YzAuMTcsMS4zMSAwLjMzLDIuNjIgMC41LDMuOTNjLTUuNSw5LjY0IC0xMS4xMiwxOS4yIC0xNi40OSwyOC45MWMtMTcuMTEsMC4xOSAtMzQuMjUsMC4yOCAtNTEuMzYsLTAuMDVjLTAuNjYsLTEuMjQgLTEuMzIsLTIuNDcgLTEuOTgsLTMuN2MwLjE0LC0xLjIyIDAuMjgsLTIuNDMgMC40MiwtMy42NXoiIGZpbGw9IiMzMjNlOTYiIHN0cm9rZT0iIzMyM2U5NiIvPjwvZz48Zz48cGF0aCBkPSJNMjA3LjAyMzkxLDE1OS45NjYwNGMtMC4yNCwtMi40NiAyLjg4LC0xLjUzIDQuMzQsLTEuNzhjMjcuMjEsMC4yOCA1NC40OSwtMC41MyA4MS42NiwwLjM5Yy01Ljg3LDAuNjUgLTExLjgsMC4xMyAtMTcuNjYsMC43Yy0yMi41NSw4Ljk3IC00NS41NSwxNy4yNCAtNjguNCwyNS42Yy0wLjA4LC04LjMgLTAuMDksLTE2LjYxIDAuMDYsLTI0LjkxeiIgZmlsbD0iI2I1ZDEwMSIgc3Ryb2tlPSIjYjVkMTAxIi8+PHBhdGggZD0iTTIwNi45NjM5MSwxODQuODc2MDRjMjIuODUsLTguMzYgNDUuODUsLTE2LjYzIDY4LjQsLTI1LjZjNS44NiwtMC41NyAxMS43OSwtMC4wNSAxNy42NiwtMC43YzAsMi43IC0wLjAyLDUuMzkgLTAuMTIsOC4wOGMtMjAuNiw3LjEzIC00MC44OSwxNS4xIC02MS4zNSwyMi41OWMtOC4xMSwyLjk0IC0xNS45NCw2Ljg5IC0yNC41Nyw4LjFjLTAuMTMsLTQuMTYgLTAuMDksLTguMzIgLTAuMDIsLTEyLjQ3eiIgZmlsbD0iI2EwYzkwZiIgc3Ryb2tlPSIjYTBjOTBmIi8+PHBhdGggZD0iTTIzMS41NTM5MSwxODkuMjQ2MDRjMjAuNDYsLTcuNDkgNDAuNzUsLTE1LjQ2IDYxLjM1LC0yMi41OWMwLjA3LDQuNDQgMC4xNCw4Ljg4IDAuMDMsMTMuMzJjLTI4Ljc4LDEwLjQxIC01Ny42MSwyMC43MyAtODYuMDEsMzIuMDdjLTAuMDUsLTQuOSAtMC4wMywtOS44IDAuMDYsLTE0LjdjOC42MywtMS4yMSAxNi40NiwtNS4xNiAyNC41NywtOC4xeiIgZmlsbD0iIzhjYzIxZiIgc3Ryb2tlPSIjOGNjMjFmIi8+PHBhdGggZD0iTTIwNi45MjM5MSwyMTIuMDQ2MDRjMjguNCwtMTEuMzQgNTcuMjMsLTIxLjY2IDg2LjAxLC0zMi4wN2MwLDcuOTIgMC4xMiwxNS44NSAwLDIzLjc3Yy0xOS4zLDQuODYgLTM3LjI0LDEzLjg3IC01Ni4yNywxOS40NWMtNy4zLDIuNTMgLTEzLjg3LDYuOTEgLTIxLjU0LDguMzljLTMuNTEsMC40OSAtNi4xMywyLjg2IC04LjI0LDUuNTRjMC4wMywtOC4zNiAwLjAxLC0xNi43MiAwLjA0LC0yNS4wOHoiIGZpbGw9IiM3N2JjMjciIHN0cm9rZT0iIzc3YmMyNyIvPjxwYXRoIGQ9Ik0yMzYuNjYzOTEsMjIzLjE5NjA0YzE5LjAzLC01LjU4IDM2Ljk3LC0xNC41OSA1Ni4yNywtMTkuNDVjMC4wMiwxMy41NSAwLjEyLDI3LjEgLTAuMDIsNDAuNjVjLTI4LjY1LDAuMDMgLTU3LjI5LDAuMDYgLTg1Ljk0LC0wLjAxYy0wLjA2LC0yLjQyIC0wLjA4LC00Ljg0IC0wLjA5LC03LjI2YzIuMTEsLTIuNjggNC43MywtNS4wNSA4LjI0LC01LjU0YzcuNjcsLTEuNDggMTQuMjQsLTUuODYgMjEuNTQsLTguMzl6IiBmaWxsPSIjNjZhZTEzIiBzdHJva2U9IiM2NmFlMTMiLz48L2c+PC9nPjwvZz48L3N2Zz48IS0tcm90YXRpb25DZW50ZXI6OTguNjc4OTY2ODY0MDAxNDE6MTAxLjU5MDM5NTA4MjYyNDYyLS0+';

  function getAngle(name,num){
    var x1=graps[name][num==1?graps[name].length-1:num-2]['X'],y1=graps[name][num==1?graps[name].length-1:num-2]['Y'];
    var x2=graps[name][num-1]['X'],y2=graps[name][num-1]['Y'];
    var x3=graps[name][num==graps[name].length?0:num]['X'],y3=graps[name][num==graps[name].length?0:num]['Y'];
    x1=Scratch.Cast.toNumber(x1),x2=Scratch.Cast.toNumber(x2),x3=Scratch.Cast.toNumber(x3);
    y1=Scratch.Cast.toNumber(y1),y2=Scratch.Cast.toNumber(y2),y3=Scratch.Cast.toNumber(y3);
    var point1={x:x1,y:y1},point2={x:x2,y:y2},point3={x:x3,y:y3};
    var v1={x:point1.x-point2.x,y:point1.y-point2.y},v2={x:point3.x-point2.x,y:point3.y-point2.y};
    var dotProduct=v1.x*v2.x+v1.y*v2.y;
    var v1Length=Math.sqrt(v1.x*v1.x+v1.y*v1.y),v2Length=Math.sqrt(v2.x*v2.x+v2.y*v2.y);
    var angle=Math.acos(dotProduct/(v1Length*v2Length))*(180/Math.PI);
    angle=Math.round(angle*100000)/100000;
    return angle;
  }

  function getLength(name,num){
    var x1=graps[name][num-1]['X'],y1=graps[name][num-1]['Y'];
    var x2=graps[name][num==graps[name].length?0:num]['X'],y2=graps[name][num==graps[name].length?0:num]['Y'];
    x1=Scratch.Cast.toNumber(x1),x2=Scratch.Cast.toNumber(x2);
    y1=Scratch.Cast.toNumber(y1),y2=Scratch.Cast.toNumber(y2);
    var point1={x:x1,y:y1},point2={x:x2,y:y2};
    var distance=Math.sqrt(Math.pow((point2.x-point1.x),2)+Math.pow((point2.y-point1.y),2));
    distance=Math.round(distance*100000)/100000;
    return distance;
  }

  function getArea(points){ 
    var X=[],Y=[],numPoints=points.length,area=0,id=numPoints-1;
    for(var i=0;i<numPoints;i++) X.push(Scratch.Cast.toNumber(points[i]['X'])),Y.push(Scratch.Cast.toNumber(points[i]['Y']));
    for(var i=0;i<numPoints;i++) area=area+(X[id]+X[i])*(Y[id]-Y[i]),id=i;
    return Math.abs(area/2); 
  }

  function f_isPointInGraphic(graphic,point){
    var x=point.X,y=point.Y;
    var inside=false;
    for(var i=0,j=graphic.length-1;i<graphic.length;j=i++){
      var x1=graphic[i].X,y1=graphic[i].Y,x2=graphic[j].X,y2=graphic[j].Y;
      var intersect=((y1>y)!=(y2>y))&&(x<(x2-x1)*(y-y1)/(y2-y1)+x1);
      if(intersect) inside=!inside;
    }
    return inside;
  }

  Scratch.translate.setup({
    zh: {
      name:'图形',
      deleteAllGraphics:'删除所有图形',
      addGraphic:'添加图形 [NAME]',
      deleteGraphic:'删除图形 [NAME]',
      replaceGraphicName:'将图形 [NAME] 的名称替换为 [NEWNAME] ',
      allGraphics:'所有图形',

      addPointInGraphic:'在图片 [NAME] 添加点 X [X] Y [Y]',
      deletePointInGraphic:'删除图片 [NAME] 第 [ID] 个点',

      lengthOfGraphic:'图片 [NAME] 的长度',
      pointsInGraphic:'图片 [NAME] 的点',
      pointInGraphic:'图片 [NAME] 的第 [ID] 个点',
      pointXYInGraphic:'图片 [NAME] 的第 [ID] 个点的 [XY] 坐标',

      replacePointInGraphic:'将图片 [NAME] 的第 [ID] 个点修改为 X [X] Y [Y]',
      replacePointXYInGraphic:'将图片 [NAME] 的第 [ID] 个点的 [XY] 坐标修改为 [NUM]',
      insertPointInGraphic:'在图片 [NAME] 的第 [ID] 个点后插入点 X [X] Y [Y]',

      graphicPointAngle:'图形 [NAME] 第 [NUM] 个点的角度',
      graphicPointLength:'图形 [NAME] 第 [NUM] 个点的长度',
      graphicAllPointAngle:'图形 [NAME] 所有点的角度',
      graphicAllPointLength:'图形 [NAME] 所有点的长度',
      graphicPointWithBestAngle:'图形 [NAME] 角度 [BEST] 的点',
      graphicPointWithBestLength:'图形 [NAME] 长度 [BEST] 的点',

      graphicArea:'图片 [NAME] 的面积',
      isPointInGraphic:'点 X [X] Y [Y] 在图形 [NAME] 里吗？',
      isTwoGraphicContact:'图形 [NAME] 与 图形 [NAME2] 接触吗？',

      smallest:'最小',
      biggest:'最大',
    },
    en: {
      name:'graphic',
      deleteAllGraphics:'delete all graphics',
      addGraphic:'add graphics [NAME]',
      deleteGraphic:'delete graphic [NAME]',
      replaceGraphicName:'replace name of graphic [NAME] to [NEWNAME]',
      allGraphics:'all graphics',

      addPointInGraphic:'add point X [X] Y [Y] in graphic [NAME]',
      deletePointInGraphic:'delete [ID] point in graphic [NAME]',

      lengthOfGraphic:'length of graphic [NAME]',
      pointsInGraphic:'points in graphic [NAME]',
      pointInGraphic:'[ID] point in graphic [NAME]',
      pointXYInGraphic:'[XY] of [ID] point in graphic [NAME]',

      replacePointInGraphic:'replace [ID] point X [X] Y [Y] in graphic [NAME]',
      replacePointXYInGraphic:'replace [XY] of [ID] to [NUM] point in graphic [NAME]',
      insertPointInGraphic:'insertpoint X [X] Y [Y] after [ID] point in graphic [NAME]',

      graphicPointAngle:'[NUM] point\'s angle in graphic [NAME]',
      graphicPointLength:'[NUM] point\'s length in graphic [NAME]',
      graphicAllPointAngle:'all points\' angle in graphic [NAME]',
      graphicAllPointLength:'all points\' length in graphic [NAME]',
      graphicPointWithBestAngle:'the point with the [BEST] angle in graphic [NAME]',
      graphicPointWithBestLength:'the point with the [BEST] length in graphic [NAME]',

      graphicArea:'area of graphic [NAME]',
      isPointInGraphic:'is point X [Y] Y [Y] in graphic [NAME] ?',
      isTwoGraphicContact:'is the graphic [NAME] in contact with the graphic [NAME2] ?',

      smallest:'smallest',
      biggest:'biggest',
    }
  });
  class graphic {
    getInfo() {
      return {
        id: 'qxsckgraphic',
        name: Scratch.translate({ id: 'name', default: 'graphic' }),
        menuIconURI:IconURI,
        blockIconURI:IconURI,
        color1: '#CCB3FF',
        color2: '#CCB3FF',
        color3: '#CCB3FF',
        blocks: [
          {
            opcode: 'deleteAllGraphics',
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate({ id: 'deleteAllGraphics', default: 'delete all graphics' }),
            arguments: {}
          },
          {
            opcode: 'addGraphic',
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate({ id: 'addGraphic', default: 'add graphics [NAME]' }),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'graphic'
              },
            }
          },
          {
            opcode: 'deleteGraphic',
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate({ id: 'deleteGraphic', default: 'delete graphics [NAME]' }),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'graphic'
              },
            }
          },
          {
            opcode: 'replaceGraphicName',
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate({ id: 'replaceGraphicName', default: 'replace name of graphic [NAME] to [NEWNAME]' }),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'graphic'
              },
              NEWNAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'newgraphic'
              },
            },
          },
          {
            opcode: 'allGraphics',
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate({ id: 'allGraphics', default: 'all graphics' }),
            arguments: {},
            disableMonitor: true
          },

          '---',
          
          {
            opcode: 'addPointInGraphic',
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate({ id: 'addPointInGraphic', default: 'add point X [X] Y [Y] in graphic [NAME]' }),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'graphic'
              },
              X: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '0'
              },
              Y: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '0'
              },
            },
          },
          {
            opcode: 'deletePointInGraphic',
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate({ id: 'deletePointInGraphic', default: 'delete [ID] point in graphic [NAME]' }),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'graphic'
              },
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '1'
              },
            },
          },

          '---',

          {
            opcode: 'lengthOfGraphic',
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate({ id: 'lengthOfGraphic', default: 'length of graphic [NAME]' }),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'graphic'
              },
            },
          },
          {
            opcode: 'pointsInGraphic',
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate({ id: 'pointsInGraphic', default: 'points in graphic [NAME]' }),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'graphic'
              },
            },
          },
          {
            opcode: 'pointInGraphic',
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate({ id: 'pointInGraphic', default: '[ID] point in graphic [NAME]' }),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'graphic'
              },
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '1'
              },
            },
          },
          {
            opcode: 'pointXYInGraphic',
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate({ id: 'pointXYInGraphic', default: '[XY] of [ID] point in graphic [NAME]' }),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'graphic'
              },
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '1'
              },
              XY: {
                type: Scratch.ArgumentType.STRING,
                menu:'XYs',
                defaultValue: 'X',
              },
            },
          },

          '---',

          {
            opcode: 'replacePointInGraphic',
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate({ id: 'replacePointInGraphic', default: 'replace [ID] point X [X] Y [Y] in graphic [NAME]' }),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'graphic'
              },
              X: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '0'
              },
              Y: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '0'
              },
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '1'
              },
            },
          },
          {
            opcode: 'replacePointXYInGraphic',
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate({ id: 'replacePointXYInGraphic', default: 'replace [XY] of [ID] to [NUM] point in graphic [NAME]' }),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'graphic'
              },
              XY: {
                type: Scratch.ArgumentType.STRING,
                menu:'XYs',
                defaultValue: 'X',
              },
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '1'
              },
              NUM: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '0',
              },
            },
          },
          {
            opcode: 'insertPointInGraphic',
            blockType: Scratch.BlockType.COMMAND,
            text: Scratch.translate({ id: 'insertPointInGraphic', default: 'insertpoint X [X] Y [Y] after [ID] point in graphic [NAME]' }),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'graphic'
              },
              X: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '0'
              },
              Y: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '0'
              },
              ID: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '1'
              },
            },
          },

          '---',

          {
            opcode: 'graphicPointAngle',
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate({ id: 'graphicPointAngle', default: '[NUM] point\'s angle in graphic [NAME]' }),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'graphic'
              },
              NUM: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '2'
              },
            },
          },
          {
            opcode: 'graphicPointLength',
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate({ id: 'graphicPointLength', default: '[NUM] point\'s length in graphic [NAME]' }),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'graphic'
              },
              NUM: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '1'
              },
            },
          },
          {
            opcode: 'graphicAllPointAngle',
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate({ id: 'graphicAllPointAngle', default: 'all points\' angle in graphic [NAME]' }),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'graphic'
              },
            },
          },
          {
            opcode: 'graphicAllPointLength',
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate({ id: 'graphicAllPointLength', default:'all points\' length in graphic [NAME]' }),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'graphic'
              },
            },
          },
          {
            opcode: 'graphicPointWithBestAngle',
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate({ id: 'graphicPointWithBestAngle', default: 'the point with the [BEST] angle in graphic [NAME]' }),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'graphic'
              },
              BEST: {
                type: Scratch.ArgumentType.STRING,
                menu:'BESTs',
                defaultValue: Scratch.translate({ id: 'smallest', default: 'smallest' }),
              },
            },
          },
          {
            opcode: 'graphicPointWithBestLength',
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate({ id: 'graphicPointWithBestLength', default:'the point with the [BEST] length in graphic [NAME]' }),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'graphic'
              },
              BEST: {
                type: Scratch.ArgumentType.STRING,
                menu:'BESTs',
                defaultValue: Scratch.translate({ id: 'smallest', default: 'smallest' }),
              },
            },
          },

          '---',

          {
            opcode: 'graphicArea',
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate({ id: 'graphicArea', default:'area of graphic [NAME]' }),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'graphic'
              },
            },
          },
          {
            opcode: 'isPointInGraphic',
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate({ id: 'isPointInGraphic', default:'is point X [Y] Y [Y] in graphic [NAME] ?' }),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'graphic'
              },
              X: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '0'
              },
              Y: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: '0'
              },
            },
          },
          {
            opcode: 'isTwoGraphicContact',
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate({ id: 'isTwoGraphicContact', default:'is the graphic [NAME] in contact with the graphic [NAME2] ?' }),
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'graphic'
              },
              NAME2: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: 'graphic2'
              },
            },
          },
        ],
        menus: {
          XYs: {
            acceptReporters: false,
            items: [
              {
                text: 'X',
                value: 'X'
              },
              {
                text: 'Y',
                value: 'Y'
              },
            ]
          },
          BESTs: {
            acceptReporters: false,
            items: [
              {
                text: Scratch.translate({ id: 'smallest', default: 'smallest' }),
                value: 'smallest'
              },
              {
                text: Scratch.translate({ id: 'biggest', default: 'biggest' }),
                value: 'biggest'
              },
            ]
          },
        }
      };
    }
    deleteAllGraphics() {
      graps = Object.create(null);
    }
    addGraphic(args) {
      var name=Scratch.Cast.toString(args.NAME);
      if(!(name in graps)) graps[name]=[];
    }
    deleteGraphic(args) {
      var name=Scratch.Cast.toString(args.NAME);
      if((name in graps)) delete graps[name];
    }
    replaceGraphicName(args){
      var name=Scratch.Cast.toString(args.NAME),newname=Scratch.Cast.toString(args.NEWNAME);
      if((name in graps)){
        var graphicdata=graps[name];
        delete graps[name];
        graps[newname]=graphicdata;
      }
    }
    allGraphics(){
      var graplist=[];
      for(var key in graps) graplist.push(key);
      return graplist.join(',');
    }
    addPointInGraphic(args){
      var name=Scratch.Cast.toString(args.NAME),x=Scratch.Cast.toNumber(args.X),y=Scratch.Cast.toNumber(args.Y);
      if((name in graps)){
        graps[name].push({'X':x,'Y':y});
      }
    }
    deletePointInGraphic(args){
      var name=Scratch.Cast.toString(args.NAME),id=Scratch.Cast.toNumber(args.ID);
      if((name in graps)){
        if(graps[name].length>=id) graps[name].splice(id-1,1);
      }
    }
    lengthOfGraphic(args){
      var name=Scratch.Cast.toString(args.NAME);
      if((name in graps)){
        return graps[name].length;
      }
    }
    pointsInGraphic(args){
      var name=Scratch.Cast.toString(args.NAME);
      if((name in graps)){
        return JSON.stringify(graps[name]);
      }
    }
    pointInGraphic(args){
      var name=Scratch.Cast.toString(args.NAME),id=Scratch.Cast.toNumber(args.ID);
      if((name in graps)){
        if(graps[name].length>=id) return JSON.stringify(graps[name][id-1]);
      }
    }
    pointXYInGraphic(args){
      var name=Scratch.Cast.toString(args.NAME),id=Scratch.Cast.toNumber(args.ID),xy=Scratch.Cast.toString(args.XY);
      if((name in graps)){
        if(graps[name].length>=id) return JSON.stringify(graps[name][id-1][xy]);
      }
    }
    replacePointInGraphic(args){
      var name=Scratch.Cast.toString(args.NAME),id=Scratch.Cast.toNumber(args.ID),x=Scratch.Cast.toNumber(args.X),y=Scratch.Cast.toNumber(args.Y);
      if((name in graps)){
        if(graps[name].length>=id) graps[name][id-1]['X']=x,graps[name][id-1]['Y']=y;
      }
    }
    replacePointXYInGraphic(args){
      var name=Scratch.Cast.toString(args.NAME),id=Scratch.Cast.toNumber(args.ID),xy=Scratch.Cast.toString(args.XY),num=Scratch.Cast.toNumber(args.NUM);
      if((name in graps)){
        if(graps[name].length>=id) graps[name][id-1][xy]=num;
      }
    }
    insertPointInGraphic(args){
      var name=Scratch.Cast.toString(args.NAME),id=Scratch.Cast.toNumber(args.ID),x=Scratch.Cast.toNumber(args.X),y=Scratch.Cast.toNumber(args.Y);
      if((name in graps)){
        if(graps[name].length<id) graps[name].push({'X':x,'Y':y});
        else{
          graps[name].splice(id,0,{'X':x,'Y':y});
        }
      }
    }
    graphicPointAngle(args){
      var name=Scratch.Cast.toString(args.NAME),num=Scratch.Cast.toNumber(args.NUM);
      if((name in graps)){
        if(graps[name].length>=3){
          return getAngle(name,num); 
        }
      }
    }
    graphicPointLength(args){
      var name=Scratch.Cast.toString(args.NAME),num=Scratch.Cast.toNumber(args.NUM);
      if((name in graps)){
        if(graps[name].length>=2){
          return getLength(name,num);
        }
      }
    }
    graphicAllPointAngle(args){
      var name=Scratch.Cast.toString(args.NAME);
      if((name in graps)){
        if(graps[name].length>=3){
          var nums=[];
          for(var num=1;num<=graps[name].length;num++){
            nums.push(getAngle(name,num));
          }
          return nums.join(','); 
        }
      }
    }
    graphicAllPointLength(args){
      var name=Scratch.Cast.toString(args.NAME);
      if((name in graps)){
        if(graps[name].length>=2){
          var nums=[];
          for(var num=1;num<=graps[name].length;num++){
            nums.push(getLength(name,num));
          }
          return nums.join(',');
        }
      }
    }
    graphicPointWithBestAngle(args){
      var name=Scratch.Cast.toString(args.NAME),best=Scratch.Cast.toString(args.BEST);
      if((name in graps)){
        if(graps[name].length>=3){
          var nums=[];
          for(var num=1;num<=graps[name].length;num++){
            nums.push(getAngle(name,num));
          }
          if(best=='smallest') return Math.min(...nums);
          if(best=='biggest') return Math.max(...nums);
        }
      }
    }
    graphicPointWithBestLength(args){
      var name=Scratch.Cast.toString(args.NAME),best=Scratch.Cast.toString(args.BEST);
      if((name in graps)){
        if(graps[name].length>=2){
          var nums=[];
          for(var num=1;num<=graps[name].length;num++){
            nums.push(getLength(name,num));
          }
          if(best=='smallest') return Math.min(...nums);
          if(best=='biggest') return Math.max(...nums);
        }
      }
    }
    graphicArea(args){
      var name=Scratch.Cast.toString(args.NAME);
      if((name in graps)){
        if(graps[name].length>=3){
          return getArea(graps[name]);
        }
      }
    }
    isPointInGraphic(args){
      var name=Scratch.Cast.toString(args.NAME),x=Scratch.Cast.toNumber(args.X),y=Scratch.Cast.toNumber(args.Y);
      if((name in graps)){
        return f_isPointInGraphic(graps[name],{'X':x,'Y':y});
      }
    }
    isTwoGraphicContact(args){
      var name=Scratch.Cast.toString(args.NAME),name2=Scratch.Cast.toString(args.NAME2);
      var count=0;
      if((name in graps) && (name2 in graps)){
        for(var i=0;i<graps[name2].length;i++) count+=(f_isPointInGraphic(graps[name],graps[name2][i])==true);
      }
      return count!=0;
    }
  }
  Scratch.extensions.register(new graphic());
}(Scratch));
