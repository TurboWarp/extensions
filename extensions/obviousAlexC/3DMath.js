(function (Scratch){
    /* eslint-disable */
    class ExtensionBuilder{constructor(t,n,i,e){this.internal={},this.internal.JSON={blocks:[],menus:{}},this.runtime=Scratch.vm.runtime,this.internal.defaultFunction={code(){console.log("This block has no code")},arguments:{}},this.addDocs=t=>{this.internal.JSON.docsURI=t},this.addBlock=(t,n,i,e,l,s)=>{e=e||this.internal.defaultFunction.code,this[n]=e,s=s||{};let o=s;o.disableMonitor||(o.disableMonitor=!0),o.opcode=n,o.blockType=i,o.text=t,o.arguments=l||JSON.parse(JSON.stringify(this.internal.defaultFunction.arguments));let r=this.internal.JSON.blocks.length;return this.internal.JSON.blocks.push(o),this.internal.JSON.blocks[r].addArgument=(t,i,e,l)=>{if(null==(e=e||null))switch(typeof i){case"string":default:e=Scratch.ArgumentType.STRING;break;case"boolean":e=Scratch.ArgumentType.BOOLEAN;break;case"number":case"bigint":e=Scratch.ArgumentType.NUMBER}return null==i?this.internal.JSON.blocks[r].arguments[t]={type:e}:this.internal.JSON.blocks[r].arguments[t]={type:e,defaultValue:i},(l=l||null)&&("string"==typeof l?this.internal.JSON.blocks[r].arguments[t].menu=l:"function"==typeof l||"object"==typeof l?(this.addMenu(n+"_"+t+"_Menu",l,!0),this.internal.JSON.blocks[r].arguments[t].menu=n+"_"+t+"_Menu"):console.error("Menu '"+n+"_"+t+"_Menu'is not valid!")),this.internal.JSON.blocks[r]},this.internal.JSON.blocks[r].setIcon=t=>(this.internal.JSON.blocks[r].blockIconURI=t,this.internal.JSON.blocks[r]),this.internal.JSON.blocks[r].setFilter=t=>(t=t||Scratch.TargetType.SPRITE,this.internal.JSON.blocks[r].filter=t,this.internal.JSON.blocks[r]),this.internal.JSON.blocks[r].hideBlock=()=>(this.internal.JSON.blocks[r].hideFromPalette=!0,this.internal.JSON.blocks[r]),this.internal.JSON.blocks[r].stopMoniter=()=>(this.internal.JSON.blocks[r].disableMonitor=!0,this.internal.JSON.blocks[r]),this.internal.JSON.blocks[r].setEdgeActivation=t=>(this.internal.JSON.blocks[r].isEdgeActivated=t,this.internal.JSON.blocks[r]),this.internal.JSON.blocks[r].addImage=(t,n,i)=>{i=i||!1;let e={type:Scratch.ArgumentType.IMAGE,dataURI:n,flipRTL:i};return this.internal.JSON.blocks[r].arguments[t]=e,this.internal.JSON.blocks[r]},this.internal.JSON.blocks[r]},this.addMenu=(t,n,i)=>{i=i||!1,"function"==typeof n?(this[t+"Function"]=n,this.internal.JSON.menus[t]={items:t+"Function"}):this.internal.JSON.menus[t]={items:n},this.internal.JSON.menus[t].acceptReporters=i},this.addButton=(t,n,i)=>{n=n||this.internal.defaultFunction.code,i=i||"Button",this["button_"+t]=n;let e={};e.func="button_"+t,e.blockType=Scratch.BlockType.BUTTON,e.text=i;let l=this.internal.JSON.blocks.length;return this.internal.JSON.blocks[l]=e,this.internal.JSON.blocks[l]},this.addDivider=()=>{this.internal.JSON.blocks.push("---")},this.addLabel=t=>{t=t||"N/A";let n={opcode:"__NOUSEOPCODE",blockType:"label",text:t};this.internal.JSON.blocks.push(n)},this.__NOUSEOPCODE=()=>{},this.internal.createBase=()=>{if(t=t||"Extension",n=n||"extension",this.internal.JSON.name=t,this.internal.JSON.id=n,(i=i||{}).blockColor=i.blockColor||null,i.inputColor=i.inputColor||null,i.outlineColor=i.outlineColor||null,null!=i.blockColor){let l=i.blockColor;l>8947848?this.internal.colors=[l,l-197379,l-394758,]:this.internal.colors=[l,l+197379,l+394758,],i.inputColor,this.internal.colors[1]=i.inputColor,i.outlineColor,this.internal.colors[2]=i.outlineColor,this.internal.JSON.color1=this.internal.colors[0],this.internal.JSON.color2=this.internal.colors[1],this.internal.JSON.color3=this.internal.colors[2]}(e=e||{}).blockIconUri=e.blockIconUri||null,e.menuIconUri=e.menuIconUri||e.blockIconUri||null,this.menuUri=e.menuIconUri,this.blockIco=e.blockIconUri,this.docsUri=null},this.internal.createBase(),this.setColors=(t,n,i)=>{t="string"==typeof t?t:(t+0).toString(16),n="string"==typeof n?n:(n+0).toString(16),i="string"==typeof i?i:(i+0).toString(16),this.internal.colors=[0,0,0],this.internal.colors[0]=t,this.internal.colors[1]=n,this.internal.colors[2]=i,this.internal.JSON.color1=t,this.internal.JSON.color2=n,this.internal.JSON.color3=i},this.setMenuIcon=t=>{this.internal.JSON.menuIconURI=t},this.setGlobalBlockIcon=t=>{this.internal.JSON.blockIconURI=t},this.runHat=t=>{this.runtime.startHats(this.internal.JSON.id+"_"+t)},this.getInfo=()=>this.internal.JSON,this.register=()=>{Scratch.extensions.register(this)}}}
    /* eslint-enable */

    const cubeICO = "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI4OC44NTEwNCIgaGVpZ2h0PSI4OC44NTEwNCIgdmlld0JveD0iMCwwLDg4Ljg1MTA0LDg4Ljg1MTA0Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTk1LjU3NDQ5LC0xMzUuNTc0NDkpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0xOTUuNTc0NSwxODAuMDAwMDFjMCwtMjQuNTM1NTQgMTkuODg5OTgsLTQ0LjQyNTUyIDQ0LjQyNTUyLC00NC40MjU1MmMyNC41MzU1NCwwIDQ0LjQyNTUyLDE5Ljg4OTk4IDQ0LjQyNTUyLDQ0LjQyNTUyYzAsMjQuNTM1NTQgLTE5Ljg4OTk4LDQ0LjQyNTUyIC00NC40MjU1Miw0NC40MjU1MmMtMjQuNTM1NTQsMCAtNDQuNDI1NTIsLTE5Ljg4OTk4IC00NC40MjU1MiwtNDQuNDI1NTJ6IiBmaWxsPSIjYzJkOTE2IiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMCIvPjxwYXRoIGQ9Ik0yMTIuNTU4NDIsMjA3LjE4MjYydi0zNy44ODQ1N2gzNy43NTc0NHYzNy44ODQ1N3oiIGZpbGw9IiNhZGMyMTMiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIwIi8+PHBhdGggZD0iTTIxMy45NTY4NSwxNjkuNjc5NDRsMTYuMzk5NjksLTE3LjU0Mzg2bDM1Ljg1MDUsMC41MDg1MmwtMTUuNTA5NzksMTYuNjUzOTV6IiBmaWxsPSIjYWRjMjEzIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMCIvPjxwYXRoIGQ9Ik0yNTAuOTUxNTEsMjA2LjU0Njk4di01My4wMTI5N2gxNi45MDgyMWwtMC42MzU2NSwzNi40ODYxNHoiIGZpbGw9IiNhZGMyMTMiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIwIi8+PHBhdGggZD0iTTI2OC44MzAwNiwxNTIuMzcxMjR2MzguNDQwMDJjMCwwLjA2OTcxIC0wLjAyODgzLDAuMTMyMjEgLTAuMDQwODgsMC4xOTk0NWMtMC4wMTQ0MiwwLjA4ODg2IC0wLjAxOTE0LDAuMTc1MzUgLTAuMDUyODIsMC4yNTk0N2MtMC4wNjAwMiwwLjE0NjUyIC0wLjE0ODk5LDAuMjgxMDkgLTAuMjU5NDcsMC4zOTE1N2wtMTYuODE3NDksMTYuODE3NDljLTAuMDA5NjksMC4wMDk1NyAtMC4wMjQxLDAuMDEyMDUgLTAuMDMzNjcsMC4wMjE2MmMtMC4xMDU2NCwwLjA5NjE4IC0wLjIyMDk1LDAuMTgwMTkgLTAuMzU1NTMsMC4yMzU0OGMtMC4xNDY2MywwLjA2MjUgLTAuMzAyNzIsMC4wOTM3IC0wLjQ1ODkyLDAuMDkzN2gtMzguNDQwMDJjLTAuNjYzMDksMCAtMS4yMDEyOSwtMC41MzgyIC0xLjIwMTI5LC0xLjIwMTE4di0zOC40MzUyOWMwLC0wLjE1ODU3IDAuMDMxMiwtMC4zMTQ3NyAwLjA5MTMzLC0wLjQ2NjEyYzAuMDU1MywtMC4xMzIxIDAuMTM5NDIsLTAuMjQ5OSAwLjIzNTQ4LC0wLjM1MzE3YzAuMDExOTQsLTAuMDA5NjkgMC4wMTQ0MiwtMC4wMjQxIDAuMDIzOTksLTAuMDMzNjdsMTYuODE3MzgsLTE2LjgxNzQ5YzAuMTEyOTYsLTAuMTEyODQgMC4yNDUwNiwtMC4xOTkzMyAwLjM5NDA1LC0wLjI2MTg0YzAuMDgxNzYsLTAuMDMzNjcgMC4xNzA2MiwtMC4wMzYwNCAwLjI1NzExLC0wLjA1MDQ1YzAuMDY3MzUsLTAuMDEyMDUgMC4xMjk3NCwtMC4wNDA4OCAwLjE5OTQ1LC0wLjA0MDg4aDM4LjQ0MDAyYzAuMDkxMzMsMCAwLjE3Mjk4LDAuMDMzNjcgMC4yNTQ3NCwwLjA1MDQ1YzAuMDY3MjMsMC4wMTY4OSAwLjEzNDQ3LDAuMDE0NDIgMC4xOTY5NywwLjA0MDg4YzAuMjk3ODcsMC4xMjI1MyAwLjUzMzM2LDAuMzU4MDEgMC42NTU4OCwwLjY1NTg4YzAuMDI2NDcsMC4wNjIzOSAwLjAyNjQ3LDAuMTMyMSAwLjA0MDg4LDAuMTk2OTdjMC4wMTkxNCwwLjA4NDEyIDAuMDUyODIsMC4xNjU3NyAwLjA1MjgyLDAuMjU3MTF6TTI0OS42MDk5OSwxNzAuMzkwMDJoLTM2LjAzNzU2djM2LjAzNzU2aDM2LjAzNzU2ek0yNjQuNzI4OTgsMTUzLjU3MjQyaC0zNS4wNDI5MmwtMTQuNDE1MDIsMTQuNDE1MDJoMzUuMDQyOTJ6TTI2Ni40Mjc1OSwxNTUuMjcxMDNsLTE0LjQxNTAyLDE0LjQxNTAydjM1LjA0MjkybDE0LjQxNTAyLC0xNC40MTUwMnoiIGZpbGw9IiM3ZThkMGIiIHN0cm9rZT0iIzdlOGQwYiIgc3Ryb2tlLXdpZHRoPSI2Ii8+PC9nPjwvZz48L3N2Zz48IS0tcm90YXRpb25DZW50ZXI6NDQuNDI1NTA0OTk5OTk5OTk6NDQuNDI1NTE0OTk5OTk5OTktLT4=";
    const blockICO = "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI2My45NDMyMiIgaGVpZ2h0PSI2My45NDMyMiIgdmlld0JveD0iMCwwLDYzLjk0MzIyLDYzLjk0MzIyIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjA4LjAyODQsLTE0OC4wMjgzOCkiPjxnIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2lzUGFpbnRpbmdMYXllciZxdW90Ozp0cnVlfSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTIxMi41NTg0MywyMDcuMTgyNjJ2LTM3Ljg4NDU3aDM3Ljc1NzQ0djM3Ljg4NDU3eiIgZmlsbD0iI2FkYzIxMyIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjAiLz48cGF0aCBkPSJNMjEzLjk1Njg2LDE2OS42Nzk0NGwxNi4zOTk2OSwtMTcuNTQzODZsMzUuODUwNSwwLjUwODUybC0xNS41MDk3OSwxNi42NTM5NXoiIGZpbGw9IiNhZGMyMTMiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIwIi8+PHBhdGggZD0iTTI1MC45NTE1MiwyMDYuNTQ2OTh2LTUzLjAxMjk3aDE2LjkwODIxbC0wLjYzNTY1LDM2LjQ4NjE0eiIgZmlsbD0iI2FkYzIxMyIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjAiLz48cGF0aCBkPSJNMjY4LjgzMDA3LDE1Mi4zNzEyNHYzOC40NDAwMmMwLDAuMDY5NzEgLTAuMDI4ODMsMC4xMzIyMSAtMC4wNDA4OCwwLjE5OTQ1Yy0wLjAxNDQyLDAuMDg4ODYgLTAuMDE5MTQsMC4xNzUzNSAtMC4wNTI4MiwwLjI1OTQ3Yy0wLjA2MDAyLDAuMTQ2NTIgLTAuMTQ4OTksMC4yODEwOSAtMC4yNTk0NywwLjM5MTU3bC0xNi44MTc0OSwxNi44MTc0OWMtMC4wMDk2OSwwLjAwOTU3IC0wLjAyNDEsMC4wMTIwNSAtMC4wMzM2NywwLjAyMTYyYy0wLjEwNTY0LDAuMDk2MTggLTAuMjIwOTUsMC4xODAxOSAtMC4zNTU1MywwLjIzNTQ4Yy0wLjE0NjYzLDAuMDYyNSAtMC4zMDI3MiwwLjA5MzcgLTAuNDU4OTIsMC4wOTM3aC0zOC40NDAwMmMtMC42NjMwOSwwIC0xLjIwMTI5LC0wLjUzODIgLTEuMjAxMjksLTEuMjAxMTh2LTM4LjQzNTI5YzAsLTAuMTU4NTcgMC4wMzEyLC0wLjMxNDc3IDAuMDkxMzMsLTAuNDY2MTJjMC4wNTUzLC0wLjEzMjEgMC4xMzk0MiwtMC4yNDk5IDAuMjM1NDgsLTAuMzUzMTdjMC4wMTE5NCwtMC4wMDk2OSAwLjAxNDQyLC0wLjAyNDEgMC4wMjM5OSwtMC4wMzM2N2wxNi44MTczOCwtMTYuODE3NDljMC4xMTI5NiwtMC4xMTI4NCAwLjI0NTA2LC0wLjE5OTMzIDAuMzk0MDUsLTAuMjYxODRjMC4wODE3NiwtMC4wMzM2NyAwLjE3MDYyLC0wLjAzNjA0IDAuMjU3MTEsLTAuMDUwNDVjMC4wNjczNSwtMC4wMTIwNSAwLjEyOTc0LC0wLjA0MDg4IDAuMTk5NDUsLTAuMDQwODhoMzguNDQwMDJjMC4wOTEzMywwIDAuMTcyOTgsMC4wMzM2NyAwLjI1NDc0LDAuMDUwNDVjMC4wNjcyMywwLjAxNjg5IDAuMTM0NDcsMC4wMTQ0MiAwLjE5Njk3LDAuMDQwODhjMC4yOTc4NywwLjEyMjUzIDAuNTMzMzYsMC4zNTgwMSAwLjY1NTg4LDAuNjU1ODhjMC4wMjY0NywwLjA2MjM5IDAuMDI2NDcsMC4xMzIxIDAuMDQwODgsMC4xOTY5N2MwLjAxOTE0LDAuMDg0MTIgMC4wNTI4MiwwLjE2NTc3IDAuMDUyODIsMC4yNTcxMXpNMjQ5LjYxLDE3MC4zOTAwMmgtMzYuMDM3NTZ2MzYuMDM3NTZoMzYuMDM3NTZ6TTI2NC43Mjg5OCwxNTMuNTcyNDJoLTM1LjA0MjkybC0xNC40MTUwMiwxNC40MTUwMmgzNS4wNDI5MnpNMjY2LjQyNzYsMTU1LjI3MTAzbC0xNC40MTUwMiwxNC40MTUwMnYzNS4wNDI5MmwxNC40MTUwMiwtMTQuNDE1MDJ6IiBmaWxsPSIjN2U4ZDBiIiBzdHJva2U9IiM3ZThkMGIiIHN0cm9rZS13aWR0aD0iNiIvPjwvZz48L2c+PC9zdmc+PCEtLXJvdGF0aW9uQ2VudGVyOjMxLjk3MTU5NTY4NzExOTI3NjozMS45NzE2MTU2ODcxMTkyODItLT4=";

    const math_3d = new ExtensionBuilder("3D Math", "obviousAlexCMath3d");
    const d2r = 0.0174533;

    math_3d.setMenuIcon(cubeICO);

    math_3d.setGlobalBlockIcon(blockICO);

    math_3d.setColors("#ADC213","#A0B312","#697700");

    math_3d.addMenu("axisMenu",[{text:"x",value:"0"},{text:"y",value:"1"},{text:"z",value:"2"}]);

    math_3d.addLabel("Vector 3")

    math_3d.addBlock("vector 3 x:[x] y:[y] z:[z]","newV3",Scratch.BlockType.REPORTER,({x,y,z}) => {
        return JSON.stringify([x,y,z]);
    }).addArgument("x",0).addArgument("y",0).addArgument("z",0);

    math_3d.addBlock("vector 3 from [value]","newV3fromValue",Scratch.BlockType.REPORTER,({value}) => {
        return JSON.stringify([value,value,value]);
    }).addArgument("value",0);

    math_3d.addBlock("get the [axis] axis of [vector]","getAxisOfV3",Scratch.BlockType.REPORTER,({axis,vector}) => {
        axis = Scratch.Cast.toNumber(axis);
        return JSON.parse(vector)[axis];
    }).addArgument("axis",null,null,"axisMenu").addArgument("vector","[0,0,0]")

    math_3d.addLabel("Equations")

    math_3d.addBlock("[a] + [b]","addV3",Scratch.BlockType.REPORTER,({a,b}) => {
        a = JSON.parse(a);
        b = JSON.parse(b);
        return JSON.stringify([a[0]+b[0],
                a[1]+b[1],
                a[2]+b[2]]);
    }).addArgument("a","[0,0,0]").addArgument("b","[0,0,0]")

    math_3d.addBlock("[a] - [b]","subV3",Scratch.BlockType.REPORTER,({a,b}) => {
        a = JSON.parse(a);
        b = JSON.parse(b);
        return JSON.stringify([a[0]-b[0],
                a[1]-b[1],
                a[2]-b[2]]);
    }).addArgument("a","[0,0,0]").addArgument("b","[0,0,0]")

    math_3d.addBlock("[a] * [b]","mulV3",Scratch.BlockType.REPORTER,({a,b}) => {
        a = JSON.parse(a);
        b = JSON.parse(b);
        return JSON.stringify([a[0]*b[0],
                a[1]*b[1],
                a[2]*b[2]]);
    }).addArgument("a","[0,0,0]").addArgument("b","[0,0,0]")

    math_3d.addBlock("[a] / [b]","divV3",Scratch.BlockType.REPORTER,({a,b}) => {
        a = JSON.parse(a);
        b = JSON.parse(b);
        const c = [0,0,0]
        c[0] = a[0]/b[0]
        c[1] = a[1]/b[1]
        c[2] = a[2]/b[2]
        if (isNaN(c[0])) {
            c[0] = 0
        }

        if (isNaN(c[1])) {
            c[1] = 0
        }

        if (isNaN(c[2])) {
            c[2] = 0
        }

        return JSON.stringify(c);
    }).addArgument("a","[0,0,0]").addArgument("b","[0,0,0]")

    math_3d.addBlock("dot product between [a] and [b]","dotProductOfV3",Scratch.BlockType.REPORTER,({a,b}) => {
        a = JSON.parse(a);
        b = JSON.parse(b);
        return (a[0]*b[0])+(a[1]*b[1])+(a[2]*b[2]);
    }).addArgument("a","[0,0,0]").addArgument("b","[0,0,0]")

    math_3d.addBlock("cross product between [a] and [b]","crossProductOfV3",Scratch.BlockType.REPORTER,({a,b}) => {
        a = JSON.parse(a);
        b = JSON.parse(b);

        const c = [0,0,0]

        c[0] = a[1]*b[2] - a[2]*b[1];
        c[1] = a[2]*b[0] - a[0]*b[2];
        c[2] = a[0]*b[1] - a[1]*b[0];

        return JSON.stringify(c);
    }).addArgument("a","[0,0,0]").addArgument("b","[0,0,0]")

    math_3d.addBlock("magnitude of [a]","magnitudeV3",Scratch.BlockType.REPORTER,({a}) => {
        a = JSON.parse(a);
        return Math.sqrt(Math.pow(a[0],2)+Math.pow(a[1],2)+Math.pow(a[2],2))
    }).addArgument("a","[0,0,0]")

    math_3d.addBlock("distance between [a] and [b]","distanceV3",Scratch.BlockType.REPORTER,({a,b}) => {
        a = JSON.parse(a);
        b = JSON.parse(b);
        return Math.sqrt(Math.pow(a[0]-b[0],2)+Math.pow(a[1]-b[1],2)+Math.pow(a[2]-b[2],2));
    }).addArgument("a","[0,0,0]").addArgument("b","[0,0,0]")

    math_3d.addBlock("rotate [a] around [b] by yaw:[yaw] pitch:[pitch], and roll:[roll]","rotateAroundPointV3",Scratch.BlockType.REPORTER,({a,b,yaw,pitch,roll}) => {
        a = JSON.parse(a);
        b = JSON.parse(b);

        a[0] -= b[0]
        a[1] -= b[1]
        a[2] -= b[2]

        const sinAndCos = [
            Math.sin(yaw*d2r),
            Math.cos(yaw*d2r),
            Math.sin(pitch*d2r),
            Math.cos(pitch*d2r),
            Math.sin(roll*d2r),
            Math.cos(roll*d2r)
        ]

        let temp = a[0]

        a[0] = a[2]*sinAndCos[0] + a[0]*sinAndCos[1]
        a[2] = a[2]*sinAndCos[1] - temp*sinAndCos[0]

        temp = a[1]

        a[1] = a[2]*sinAndCos[2] + a[1]*sinAndCos[3]
        a[2] = a[2]*sinAndCos[3] - temp*sinAndCos[2]

        temp = a[0]

        a[0] = a[1]*sinAndCos[4] + a[0]*sinAndCos[5]
        a[1] = a[1]*sinAndCos[5] - temp*sinAndCos[4]

        a[0] += b[0]
        a[1] += b[1]
        a[2] += b[2]

        return JSON.stringify(a);
    }).addArgument("a","[0,0,0]").addArgument("b","[0,0,0]").addArgument("yaw","0").addArgument("pitch","0").addArgument("roll","0")

    math_3d.addBlock("rotate [a] around the center by yaw:[yaw] pitch:[pitch], and roll:[roll]","rotateAroundCenterV3",Scratch.BlockType.REPORTER,({a,yaw,pitch,roll}) => {
        a = JSON.parse(a);

        const sinAndCos = [
            Math.sin(yaw*d2r),
            Math.cos(yaw*d2r),
            Math.sin(pitch*d2r),
            Math.cos(pitch*d2r),
            Math.sin(roll*d2r),
            Math.cos(roll*d2r)
        ]

        let temp = a[0]

        a[0] = a[2]*sinAndCos[0] + a[0]*sinAndCos[1]
        a[2] = a[2]*sinAndCos[1] - temp*sinAndCos[0]

        temp = a[1]

        a[1] = a[2]*sinAndCos[2] + a[1]*sinAndCos[3]
        a[2] = a[2]*sinAndCos[3] - temp*sinAndCos[2]

        temp = a[0]

        a[0] = a[1]*sinAndCos[4] + a[0]*sinAndCos[5]
        a[1] = a[1]*sinAndCos[5] - temp*sinAndCos[4]

        return JSON.stringify(a);
    }).addArgument("a","[0,0,0]").addArgument("yaw","0").addArgument("pitch","0").addArgument("roll","0")

    math_3d.addLabel("projection")

    math_3d.addBlock("sprite 3d : move to [a] relative to the camera with the distance of [dist]","projectToSprite3D",Scratch.BlockType.COMMAND,({a,dist},util) => {
        const target = util.target;
        
        a = JSON.parse(a);

        let project = dist / a[2];

        if (a[2] < 1) {
            target.setVisible(false)
        }
        else{
            target.setVisible(true)
            target.setSize(100 * project);
            target.setXY(a[0] * project,a[1] * project);
        }

        console.log(util)
    }).addArgument("a","[0,0,0]").addArgument("dist",300)

    math_3d.register();

})(window.Scratch)
