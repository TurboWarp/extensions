class temp{
    //写Scratch扩展时 class里面必须有getInfo方法 如果没有 Scratch会报错
    //需要说的是 报错的前提是你把这个没有getInfo方法的class导入到了Scratch里面

    getInfo(){
        return {
            id:'tmep', //id只能是数字或者是字母
            name:'我的第一个扩展',
            //color1:扩展积木的背景颜色
            //color2:扩展积木的边框颜色
            //color3:扩展积木输入框的颜色
            blocks: /*扩展的积木*/[
                {
                    opcode:'helloWorld',
                    blockType:'reporter',
                    text:'hello world'
                }
            ]
        }
    }
    //下面就可以自定义积木的方法
    //写积木方法的函数名称需要遵循opcode 就是上面的
    helloWorld(){
        return 'hello world!'
    }
}
Scratch.extensions.register(new temp())