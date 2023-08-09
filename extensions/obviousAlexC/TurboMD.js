(function (Scratch) {
    "use strict";
    const parser = new DOMParser();
    const testDIV = document.createElement('div');
    let parseType = "text/html";

    //? Yes I'm using extension builder.
    //? I like the syntax and its more like java.
    /* eslint-disable */
    class ExtensionBuilder{constructor(t,n,i,e){this.internal={},this.internal.JSON={blocks:[],menus:{}},this.runtime=Scratch.vm.runtime,this.internal.defaultFunction={code(){console.log("This block has no code")},arguments:{}},this.addDocs=t=>{this.internal.JSON.docsURI=t},this.addBlock=(t,n,i,e,l,s)=>{e=e||this.internal.defaultFunction.code,this[n]=e,s=s||{};let o=s;o.disableMonitor||(o.disableMonitor=!0),o.opcode=n,o.blockType=i,o.text=t,o.arguments=l||JSON.parse(JSON.stringify(this.internal.defaultFunction.arguments));let r=this.internal.JSON.blocks.length;return this.internal.JSON.blocks.push(o),this.internal.JSON.blocks[r].addArgument=(t,i,e,l)=>{if(null==(e=e||null))switch(typeof i){case"string":default:e=Scratch.ArgumentType.STRING;break;case"boolean":e=Scratch.ArgumentType.BOOLEAN;break;case"number":case"bigint":e=Scratch.ArgumentType.NUMBER}return null==i?this.internal.JSON.blocks[r].arguments[t]={type:e}:this.internal.JSON.blocks[r].arguments[t]={type:e,defaultValue:i},(l=l||null)&&("string"==typeof l?this.internal.JSON.blocks[r].arguments[t].menu=l:"function"==typeof l||"object"==typeof l?(this.addMenu(n+"_"+t+"_Menu",l,!0),this.internal.JSON.blocks[r].arguments[t].menu=n+"_"+t+"_Menu"):console.error("Menu '"+n+"_"+t+"_Menu'is not valid!")),this.internal.JSON.blocks[r]},this.internal.JSON.blocks[r].setIcon=t=>(this.internal.JSON.blocks[r].blockIconURI=t,this.internal.JSON.blocks[r]),this.internal.JSON.blocks[r].setFilter=t=>(t=t||Scratch.TargetType.SPRITE,this.internal.JSON.blocks[r].filter=t,this.internal.JSON.blocks[r]),this.internal.JSON.blocks[r].hideBlock=()=>(this.internal.JSON.blocks[r].hideFromPalette=!0,this.internal.JSON.blocks[r]),this.internal.JSON.blocks[r].stopMoniter=()=>(this.internal.JSON.blocks[r].disableMonitor=!0,this.internal.JSON.blocks[r]),this.internal.JSON.blocks[r].setEdgeActivation=t=>(this.internal.JSON.blocks[r].isEdgeActivated=t,this.internal.JSON.blocks[r]),this.internal.JSON.blocks[r].addImage=(t,n,i)=>{i=i||!1;let e={type:Scratch.ArgumentType.IMAGE,dataURI:n,flipRTL:i};return this.internal.JSON.blocks[r].arguments[t]=e,this.internal.JSON.blocks[r]},this.internal.JSON.blocks[r]},this.addMenu=(t,n,i)=>{i=i||!1,"function"==typeof n?(this[t+"Function"]=n,this.internal.JSON.menus[t]={items:t+"Function"}):this.internal.JSON.menus[t]={items:n},this.internal.JSON.menus[t].acceptReporters=i},this.addButton=(t,n,i)=>{n=n||this.internal.defaultFunction.code,i=i||"Button",this["button_"+t]=n;let e={};e.func="button_"+t,e.blockType=Scratch.BlockType.BUTTON,e.text=i;let l=this.internal.JSON.blocks.length;return this.internal.JSON.blocks[l]=e,this.internal.JSON.blocks[l]},this.addDivider=()=>{this.internal.JSON.blocks.push("---")},this.addLabel=t=>{t=t||"N/A";let n={opcode:"__NOUSEOPCODE",blockType:"label",text:t};this.internal.JSON.blocks.push(n)},this.__NOUSEOPCODE=()=>{},this.internal.createBase=()=>{if(t=t||"Extension",n=n||"extension",this.internal.JSON.name=t,this.internal.JSON.id=n,(i=i||{}).blockColor=i.blockColor||null,i.inputColor=i.inputColor||null,i.outlineColor=i.outlineColor||null,null!=i.blockColor){let l=i.blockColor;l>8947848?this.internal.colors=[l,l-197379,l-394758,]:this.internal.colors=[l,l+197379,l+394758,],i.inputColor,this.internal.colors[1]=i.inputColor,i.outlineColor,this.internal.colors[2]=i.outlineColor,this.internal.JSON.color1=this.internal.colors[0],this.internal.JSON.color2=this.internal.colors[1],this.internal.JSON.color3=this.internal.colors[2]}(e=e||{}).blockIconUri=e.blockIconUri||null,e.menuIconUri=e.menuIconUri||e.blockIconUri||null,this.menuUri=e.menuIconUri,this.blockIco=e.blockIconUri,this.docsUri=null},this.internal.createBase(),this.setColors=(t,n,i)=>{t="string"==typeof t?t:(t+0).toString(16),n="string"==typeof n?n:(n+0).toString(16),i="string"==typeof i?i:(i+0).toString(16),this.internal.colors=[0,0,0],this.internal.colors[0]=t,this.internal.colors[1]=n,this.internal.colors[2]=i,this.internal.JSON.color1=t,this.internal.JSON.color2=n,this.internal.JSON.color3=i},this.setMenuIcon=t=>{this.internal.JSON.menuIconURI=t},this.setGlobalBlockIcon=t=>{this.internal.JSON.blockIconURI=t},this.runHat=t=>{this.runtime.startHats(this.internal.JSON.id+"_"+t)},this.getInfo=()=>this.internal.JSON,this.register=()=>{Scratch.extensions.register(this)}}}
    /* eslint-enable */

    const turboMD = new ExtensionBuilder("Turbo Markdown","obviousAlexCTurbowarpMarkdown");

    const mainLogo = "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI2Ni4yMTI2MSIgaGVpZ2h0PSI2Ni4yMTI2MSIgdmlld0JveD0iMCwwLDY2LjIxMjYxLDY2LjIxMjYxIj4NCiAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjA2Ljg5MzY5LC0xNDYuODkzNjkpIj4NCiAgICAgICAgPGcgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aXNQYWludGluZ0xheWVyJnF1b3Q7OnRydWV9IiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPg0KICAgICAgICAgICAgPHBhdGggZD0iTTIwNi44OTM3LDE4MGMwLC0xOC4yODQxMSAxNC44MjIyLC0zMy4xMDYzIDMzLjEwNjMsLTMzLjEwNjNjMTguMjg0MTEsMCAzMy4xMDYzMSwxNC44MjIyIDMzLjEwNjMxLDMzLjEwNjNjMCwxOC4yODQxMSAtMTQuODIyMiwzMy4xMDYzIC0zMy4xMDYzMSwzMy4xMDYzYy0xOC4yODQxMSwwIC0zMy4xMDYzLC0xNC44MjIyIC0zMy4xMDYzLC0zMy4xMDYzeiIgZmlsbD0iIzU5YmM3NyIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjAiIHN0cm9rZS1saW5lY2FwPSJidXR0IiAvPg0KICAgICAgICAgICAgPGcgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjciIHN0cm9rZS1saW5lY2FwPSJyb3VuZCI+DQogICAgICAgICAgICAgICAgPHBhdGggZD0iTTIyMS45ODUzMSwxNTcuODEyMzdoMjguMjQ0NjUiIC8+DQogICAgICAgICAgICAgICAgPHBhdGggZD0iTTIzNi4xMDc2NCwxOTEuNjEyNDl2LTMzLjEyMzI4IiAvPg0KICAgICAgICAgICAgPC9nPg0KICAgICAgICAgICAgPHBhdGggZD0iTTI0Mi40NDUyMiwxOTcuODIyNTVsNC4zNjUwOCw0LjM2NTA5di0zMS4zMjU4OWg2LjgzOTMxdjMxLjMyNTg5bDQuMzY1MDgsLTQuMzY1MDkiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSI3IiBzdHJva2UtbGluZWNhcD0icm91bmQiIC8+DQogICAgICAgIDwvZz4NCiAgICA8L2c+DQo8L3N2Zz4NCjwhLS1yb3RhdGlvbkNlbnRlcjozMy4xMDYzMDQ5OTk5OTk5OTozMy4xMDYzMDQ5OTk5OTk5OS0tPg==";

    turboMD.setMenuIcon(mainLogo);

    const getParsedMD = (MD) => {
        if (parseType != "text/html") {
            if (MD.includes("?xml")) {
                console.log(parser.parseFromString(MD,parseType))
                return [parser.parseFromString(MD,parseType),false];
            }
            return [parser.parseFromString('<?xml version="1.0" encoding="utf-8"?><NOLOCK>'+MD+"</NOLOCK>",parseType),true];
        }
        else{
            return [parser.parseFromString(MD,parseType),false];
        }
    } 

    turboMD.setColors("#59BC77","#47AB6A","#359258");

    turboMD.addMenu("DocTypes", [
        {text:"HTML",value:"text/html"},
        {text:"XML",value:"text/xml"},
        {text:"SVG",value:"image/svg+xml"}
    ]);

    turboMD.addLabel("Tags")

    turboMD.addBlock(
        "set tag [id] of type [tagName] to [value] from [MD]",
        "setTagFromHTML",
        Scratch.BlockType.REPORTER,
        ({ id , tagName, value , MD }) => {
            //Fix XML errors
            let retVALUE = getParsedMD(MD)
            let currentMarkDown = retVALUE[0];

            let element = (retVALUE[1]) ? currentMarkDown.getElementsByTagName("NOLOCK")[0].getElementsByTagName(tagName) : currentMarkDown.getElementsByTagName(tagName);
            if (element) {
                element = element[id-1];
                if (element){
                    element.innerHTML = value;
                    return currentMarkDown.body.innerHTML || "";
                }
            }
            return "";
        }
        )
        .addArgument("id",1)
        .addArgument("tagName","Color")
        .addArgument("value","White")
        .addArgument("MD","<Color>#FFFFFF</Color>");

    turboMD.addBlock(
        "tag [id] of type [tagName] from [MD]",
        "getTagFromHTML",
        Scratch.BlockType.REPORTER,
        ({ id , tagName , MD }) => {
            let retVALUE = getParsedMD(MD)
            let currentMarkDown = retVALUE[0];

            let element = (retVALUE[1]) ? currentMarkDown.getElementsByTagName("NOLOCK")[0].getElementsByTagName(tagName) : currentMarkDown.getElementsByTagName(tagName);
            if (element) {
                element = element[id-1];
                if (element){
                    return element.innerHTML || "";
                }
            }
            return "";
        }
        )
        .addArgument("id",1)
        .addArgument("tagName","Color")
        .addArgument("MD","<Color>#FFFFFF</Color>");

    turboMD.addBlock(
        "# of elements of type [tagName] from [MD]",
        "numberOfElementsOfTypeHTML",
        Scratch.BlockType.REPORTER,
        ({ tagName , MD }) => {
            let retVALUE = getParsedMD(MD)
            let currentMarkDown = retVALUE[0];

            let element = (retVALUE[1]) ? currentMarkDown.getElementsByTagName("NOLOCK")[0].getElementsByTagName(tagName) : currentMarkDown.getElementsByTagName(tagName);
            if (element) {
                return element.length;
            }
            return 0;
        }
        )
        .addArgument("tagName","Color")
        .addArgument("MD","<Color>#FFFFFF</Color>");

    turboMD.addLabel("Attributes")

    turboMD.addBlock(
        "set [attribute] of element [id] of type [tagName] to [setter] from [MD]",
        "setAttributeFromHTML",
        Scratch.BlockType.REPORTER,
        ({attribute , id , tagName, setter , MD }) => {
            let retVALUE = getParsedMD(MD)
            let currentMarkDown = retVALUE[0];

            let element = (retVALUE[1]) ? currentMarkDown.getElementsByTagName("NOLOCK")[0].getElementsByTagName(tagName) : currentMarkDown.getElementsByTagName(tagName);
            if (element) {
                element = element[id-1];
                if (element){
                    element.setAttribute(attribute,setter);
                    return currentMarkDown.body.innerHTML;
                }
            }
            return "";
        }
        )
        .addArgument("attribute","name")
        .addArgument("id",1)
        .addArgument("tagName","Color")
        .addArgument("setter","green")
        .addArgument("MD",'<Color name="blue">#00FF00</Color>');

    turboMD.addBlock(
        "[attribute] of element [id] of type [tagName] from [MD]",
        "getAttributeFromHTML",
        Scratch.BlockType.REPORTER,
        ({attribute , id , tagName , MD }) => {
            let retVALUE = getParsedMD(MD)
            let currentMarkDown = retVALUE[0];

            let element = (retVALUE[1]) ? currentMarkDown.getElementsByTagName("NOLOCK")[0].getElementsByTagName(tagName) : currentMarkDown.getElementsByTagName(tagName);
            if (element) {
                element = element[id-1];
                if (element){
                    return element.getAttribute(attribute) || "";
                }
            }
            return "";
        }
        )
        .addArgument("attribute",'name')
        .addArgument("id",1)
        .addArgument("tagName","Color")
        .addArgument("MD",'<Color name="green">#00FF00</Color>');

    turboMD.addLabel("Settings");

    turboMD.addBlock(
        "Set parse mode to [mode]",
        "setParseMode",
        Scratch.BlockType.COMMAND,
        ({ mode }) => {
            parseType = mode;
        }
        )
        .addArgument("mode",null,null,"DocTypes")

    turboMD.register()
})(window.Scratch)
