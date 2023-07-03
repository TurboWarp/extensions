(function(Scratch) {
    'use strict';
    if (!Scratch.extensions.unsandboxed) {
      throw new Error('PostProcessing must run unsandboxed');
    }
    const vm = Scratch.vm;
    const renderer = vm.renderer;
    const gl = renderer._gl;
    const canvas = renderer.canvas;

    var vertexShaderCode = `
      attribute vec4 a_position;
      attribute vec2 a_texcoord;
      varying vec2 v_texcoord;
      varying vec4 vColor;
      void main() {
      gl_Position = vec4(a_position.x, a_position.y, a_position.z, 1);
      v_texcoord = a_texcoord;
      vColor = vec4(1.0, 1.0, 1.0, 1.0);
      }
    `;
    var noneShaderCode = `
    precision mediump float;
      
    varying vec2 v_texcoord;
    varying vec4 vColor;      
    uniform sampler2D u_texture;

    void main() {
      gl_FragColor=texture2D(u_texture,v_texcoord);
    }
    `;
    var dispersionShaderCode =
    `
      precision mediump float;
      
      varying vec2 v_texcoord;
      varying vec4 vColor;      
      uniform sampler2D u_texture;
      uniform float _Amplitude ;
      uniform vec2 direction_r ;
      uniform vec2 direction_g ;
      uniform vec2 direction_b ;
      void main() {
        float ColorR = texture2D(u_texture,v_texcoord + normalize( direction_r )*_Amplitude).r ;
        float ColorG = texture2D(u_texture,v_texcoord + normalize( direction_g )*_Amplitude).g;
        float ColorB = texture2D(u_texture,v_texcoord + normalize( direction_b )*_Amplitude).b;
        gl_FragColor=vec4(ColorR,ColorG,ColorB,1.0);

      }
    `;
    var GlitchShaderCode =
    `
      precision mediump float;
      
      varying vec2 v_texcoord;
      varying vec4 vColor;      
      uniform sampler2D u_texture;
      uniform float _Amplitude;
      uniform float _Time;
      uniform vec2 _BlockSize;
      uniform bool _Rgb;
      float randomNoise(vec2 seed)
      {
          return fract(sin(dot(seed *_Time , vec2(17.13, 3.71))) * 43758.5453123);
      }
      void main() {
        float block = randomNoise(floor(v_texcoord * _BlockSize));
        float displaceNoise = pow(block, 8.0) * pow(block, 3.0);
        if (_Rgb){
          float ColorR = texture2D(u_texture,v_texcoord).r;
          float ColorG = texture2D(u_texture,v_texcoord + vec2(displaceNoise * _Amplitude * randomNoise(vec2(7)),0.0)).g;
          float ColorB = texture2D(u_texture,v_texcoord - vec2(displaceNoise * _Amplitude * randomNoise(vec2(13)),0.0)).b;
          gl_FragColor=vec4(ColorR,ColorG,ColorB,1.0);
        }else{
          vec2 offset = vec2(displaceNoise * _Amplitude * randomNoise(vec2(7)),0.0);
          vec4 Color = texture2D(u_texture,vec2(fract(v_texcoord.x+offset.x),fract(v_texcoord.y+offset.y)));
          gl_FragColor=Color;
        }
        

      }
    `;
    var GrayShaderCode =
    `
      precision mediump float;
      
      varying vec2 v_texcoord;
      varying vec4 vColor;      
      uniform sampler2D u_texture;
      uniform vec3 _color;
      void main() {

        vec4 Color = texture2D(u_texture,v_texcoord);
        float gray = (Color.r + Color.g + Color.b) / 3.0;
        
        gl_FragColor=vec4(vec3(gray) * (_color/255.0),1.0);

      }
    `;
    var ReverseShaderCode =
    `
      precision mediump float;
      
      varying vec2 v_texcoord;
      varying vec4 vColor;      
      uniform sampler2D u_texture;

      void main() {

        vec4 Color = texture2D(u_texture,v_texcoord);

        gl_FragColor=vec4(1.0-Color.r,1.0-Color.g,1.0-Color.b,1.0);

      }
    `;
    var PointillismShaderCode = `
    precision mediump float;

    uniform sampler2D u_texture;
    uniform float u_size; // Point size
    uniform float u_threshold; // Threshold for black and white dots
    uniform vec2 u_resolution; // Resolution of the canvas
    
    varying vec2 v_texcoord;
    
    void main() {
      // Sample the color from the texture
      vec4 texColor = texture2D(u_texture, v_texcoord);
      
      // Convert the color to grayscale
      float gray = dot(texColor.rgb, vec3(0.299, 0.587, 0.114));
      
      // Quantize the grayscale value to either black or white
      float threshold = u_threshold * (1.0 + 0.2 * (sin(v_texcoord.y * u_resolution.y * 10.0) + sin(v_texcoord.x * u_resolution.x * 10.0)));
      float quantized = step(threshold, gray);
      
      // Combine the dot pattern with the quantized color
      gl_FragColor = vec4(vec3( quantized), 1.0);
    }
    `;
    var quadPositions = [
      -1, -1,
      -1, 1,
      1, -1,
      1, -1,
      -1, 1,
      1, 1,
    ];

    var quadCoords = [
      0, 0,
      0, 1,
      1, 0,
      1, 0,
      0, 1,
      1, 1,
    ];
    function getUniformLocation(gl,uname){
      gl.useProgram(drawprogram);
      if (uniformLocationBuffer[uname] == null){
        uniformLocationBuffer[uname] = gl.getUniformLocation(drawprogram, uname);
      }
      return uniformLocationBuffer[uname];
  }
      function setUniform1f(gl,uname,value){
        gl.uniform1f(getUniformLocation(gl,uname),value);

      }
      function setUniform1i(gl,uname,value){
        gl.uniform1i(getUniformLocation(gl,uname),value);

      }
    function setUniform2fv (gl,uname,value1,value2){
        gl.uniform2fv(getUniformLocation(gl,uname),[value1,value2]);
      }

    var quadPositionBuffer;



    var quadTexCoordBuffer;



    function bindFramebufferInfo(gl, framebufferInfo, target) {
        target = target || gl.FRAMEBUFFER;
        gl.bindFramebuffer(target, framebufferInfo ? framebufferInfo.framebuffer : null);
      }
    function createFramebuffer(gl, attachments, width, height, target) {
        target = target || gl.FRAMEBUFFER;
        const framebuffer = gl.createFramebuffer();
        gl.bindFramebuffer(target, framebuffer);
        attachments.forEach(function(attachment) {
          gl.framebufferTexture2D(
              target, attachment.attachment, attachment.texTarget, attachment.texture, attachment.level);
        });
        const status = gl.checkFramebufferStatus(target);
        if (status !== gl.FRAMEBUFFER_COMPLETE) {
          return null;
        }
        return {
          framebuffer: framebuffer,
          attachments: attachments,
          width: width,
          height: height,
        };
      }
    function createshader(gl, type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
      if (success) {
        return shader;
      }
      console.log(gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
    }

    function createProgram(gl, vertexShader, fragmentShader) {
      const program = gl.createProgram();
      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);
      const success = gl.getProgramParameter(program, gl.LINK_STATUS);
      if (success) {
        return program;
      }
      console.log(gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
    }

    function initShader(){
      var programs = {
        none: null,
        glitch: null,
        dispersion: null,
        gray: null,
        reverse: null,
        pointillism: null
      };
      programs.none = createProgram(gl,createshader(gl,gl.VERTEX_SHADER,vertexShaderCode),createshader(gl,gl.FRAGMENT_SHADER,noneShaderCode));
      programs.glitch = createProgram(gl,createshader(gl,gl.VERTEX_SHADER,vertexShaderCode),createshader(gl,gl.FRAGMENT_SHADER,GlitchShaderCode));
      programs.dispersion = createProgram(gl,createshader(gl,gl.VERTEX_SHADER,vertexShaderCode),createshader(gl,gl.FRAGMENT_SHADER,dispersionShaderCode));
      programs.gray = createProgram(gl,createshader(gl,gl.VERTEX_SHADER,vertexShaderCode),createshader(gl,gl.FRAGMENT_SHADER,GrayShaderCode));
      programs.reverse = createProgram(gl,createshader(gl,gl.VERTEX_SHADER,vertexShaderCode),createshader(gl,gl.FRAGMENT_SHADER,ReverseShaderCode));
      programs.pointillism = createProgram(gl,createshader(gl,gl.VERTEX_SHADER,vertexShaderCode),createshader(gl,gl.FRAGMENT_SHADER,PointillismShaderCode));
      return programs;
    }
    function initShaderUniform(programs){
      gl.useProgram(programs.glitch);
      gl.uniform2fv( gl.getUniformLocation(programs.glitch,"_BlockSize"),[16,16]);
      gl.uniform1f( gl.getUniformLocation(programs.glitch, "_Amplitude"), 0.1);
      gl.uniform1f( gl.getUniformLocation(programs.glitch, "_Time"), 0);
      gl.uniform1i( gl.getUniformLocation(programs.glitch, "_Rgb"), 0);
      gl.useProgram(programs.pointillism);
      gl.uniform1f( gl.getUniformLocation(programs.pointillism, "u_size"), 0.0001);
      gl.uniform1f( gl.getUniformLocation(programs.pointillism, "u_threshold"), 0.7);
      gl.uniform2fv( gl.getUniformLocation(programs.pointillism, "u_resolution"), [gl.canvas.width, gl.canvas.height]);
      gl.useProgram(programs.dispersion);
      gl.uniform2fv( gl.getUniformLocation(programs.dispersion, "direction_r"), [1.0, 0.0]);
      gl.uniform2fv( gl.getUniformLocation(programs.dispersion, "direction_g"), [0.4, 1.0]);
      gl.uniform2fv( gl.getUniformLocation(programs.dispersion, "direction_b"), [-0.7, -0.3]);
      gl.uniform1f( gl.getUniformLocation(programs.dispersion, "_Amplitude"), 0.01);
      gl.useProgram(programs.gray);
      gl.uniform3fv(gl.getUniformLocation(programs.gray,"_color"),[255,255,255]);
    }

    var uniformLocationBuffer = {};





      var drawframebuffer = null;
      var framebuffersize = {
        Width: 0,
        Height: 0
      };

      var framebuffertexture = null;
      var shaderPrograms = initShader();
      var drawprogram = shaderPrograms.none;
      var drawprogram_mode = "none";
      var  positionLocation = gl.getAttribLocation(drawprogram, 'a_position');
      var  texcoordLocation = gl.getAttribLocation(drawprogram, 'a_texcoord');
      var textureLocation = gl.getUniformLocation(drawprogram, 'u_texture');
      initShaderUniform(shaderPrograms);
      gl.useProgram(drawprogram);
      gl.uniform1i(textureLocation, framebuffertexture);



    //check framebuffer & buffer status
    const rendererDrawPrefix = (function(){
      if (framebuffertexture == null ){
        framebuffertexture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, framebuffertexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.canvas.width, gl.canvas.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.bindTexture(gl.TEXTURE_2D, null);
        framebuffersize.Width = gl.canvas.width;
        framebuffersize.Height = gl.canvas.height;
      }
      if (framebuffersize.Height != gl.canvas.height || framebuffersize.Width != gl.canvas.width){
        updateFrameBuffer(gl.canvas.width,gl.canvas.height);
        framebuffersize.Width = gl.canvas.width;
        framebuffersize.Height = gl.canvas.height;
      }
      if (quadTexCoordBuffer == null){
        quadTexCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, quadTexCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(quadCoords), gl.STATIC_DRAW);
      }
      if (quadPositionBuffer == null){
          quadPositionBuffer = gl.createBuffer();
          gl.bindBuffer(gl.ARRAY_BUFFER, quadPositionBuffer);
          gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(quadPositions), gl.STATIC_DRAW);
      }
      if (drawframebuffer == null) {
        drawframebuffer = createFramebuffer(gl,
          [
            {
              attachment: gl.COLOR_ATTACHMENT0,
              texTarget: gl.TEXTURE_2D,
              texture: framebuffertexture,
              level: 0
            }
          ],
        canvas.width,
        canvas.height
        );

      }

    }).bind(renderer);
    //draw framebuffer texture in screen
    const rendererDrawPostfix = (function(){
          timeUniform();
          bindFramebufferInfo(gl, null); //modified
          gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
          gl.clearColor(...this._backgroundColor4f);
          gl.clear(gl.COLOR_BUFFER_BIT);
          gl.bindTexture(gl.TEXTURE_2D, framebuffertexture);
          positionLocation = gl.getAttribLocation(drawprogram, 'a_position');
          texcoordLocation = gl.getAttribLocation(drawprogram, 'a_texcoord');
          textureLocation = gl.getUniformLocation(drawprogram, 'u_texture');
          gl.useProgram(drawprogram);
          gl.uniform1i(textureLocation, framebuffertexture);
          

          gl.bindBuffer(gl.ARRAY_BUFFER, quadPositionBuffer);
          gl.enableVertexAttribArray(positionLocation);
          gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

          gl.bindBuffer(gl.ARRAY_BUFFER, quadTexCoordBuffer);
          gl.enableVertexAttribArray(texcoordLocation);
          gl.vertexAttribPointer(texcoordLocation, 2, gl.FLOAT, false, 0, 0);

          gl.drawArrays(gl.TRIANGLES, 0, 6);
    }).bind(renderer);


    const draw = (function(){
          if (!this.dirty) {
              return;
          }
          this.dirty = false;

          rendererDrawPrefix(); //append

          bindFramebufferInfo(gl, drawframebuffer); //modified

          this._doExitDrawRegion();
          gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
          gl.clearColor(...this._backgroundColor4f);
          gl.clear(gl.COLOR_BUFFER_BIT);
          this._drawThese(this._drawList, 'default', this._projection, {
              framebufferWidth: gl.canvas.width,
              framebufferHeight: gl.canvas.height
          });
          if (this._snapshotCallbacks.length > 0) {
              const snapshot = gl.canvas.toDataURL();
              this._snapshotCallbacks.forEach(cb => cb(snapshot));
              this._snapshotCallbacks = [];
          }

          rendererDrawPostfix(); //append


      }).bind(renderer);

    renderer.draw = draw;
    vm.runtime.on("PROJECT_LOADED",_ => {
rendererDrawPrefix();
});
    //resize framebuffer when stage size changed
    vm.runtime.on('STAGE_SIZE_CHANGED',_ => updateFrameBuffer());
    function updateFrameBuffer(){
      if (framebuffertexture != null){
        console.log('STAGE_SIZE_CHANGED. resize the post-process framebuffer.');
        gl.bindTexture(gl.TEXTURE_2D, framebuffertexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.canvas.width, gl.canvas.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
        if (drawprogram_mode ==  "pointillism"){
          setUniform2fv(gl,"u_resolution", gl.canvas.width, gl.canvas.height);
        }
      }
    }
    vm.runtime.on('PROJECT_RUN_START',_ => {
      positionLocation = gl.getAttribLocation(drawprogram, 'a_position');
      texcoordLocation = gl.getAttribLocation(drawprogram, 'a_texcoord');
      textureLocation = gl.getUniformLocation(drawprogram, 'u_texture');

    });

    function timeUniform(){
      switch (drawprogram_mode){
        case "glitch":
          gl.useProgram(drawprogram);
          setUniform1f(gl,"_Time", Date.now() / 1000.0);
      }
    }
    class postprocessing {
      getInfo() {
        return {
          id: 'postprocessing',
          name: 'Post-Processing',
          blocks: [
            {
              opcode: 'opcodeChangePostProcess',
              text: 'change effect to [Menu]',
              blockType: Scratch.BlockType.COMMAND,
              arguments: {
                Menu: {
                  type: Scratch.ArgumentType.STRING,
                  menu: 'PostProcess'
                },
              },
            },
            {

              opcode: 'opcodeChangeGlitch',
              text: 'Glitch Amplitude:[Amplitude]%,',
              blockType: Scratch.BlockType.COMMAND,
              arguments: {
                Amplitude: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: 1
                }
              },
            },
            {
              opcode: 'opcodeChangeDispersion',
              text: 'Dispersion Amplitude:[Amplitude]%',
              blockType: Scratch.BlockType.COMMAND,
              arguments: {
                Amplitude: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: 1
                }
              },
            },
            {
              opcode: 'opcodeChangeGray',
              text: 'Gray Color:[COLOR]',
              blockType: Scratch.BlockType.COMMAND,
              arguments: {
                COLOR: {
                  type: Scratch.ArgumentType.COLOR,
                  defaultValue: "#FFFFFF"
                }

              },
            },
            {
              opcode: 'opcodeChangePointillism',
              text: 'Pointillism Threshold:[threshold]%',
              blockType: Scratch.BlockType.COMMAND,
              arguments: {
                threshold: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: 70
                }

              },
            },
          {
            opcode: 'opcodeRequestReDraw',
            text: 'redraw post-process',
            blockType: Scratch.BlockType.COMMAND,
            arguments: {}

          },
          {
            opcode: 'opcodeGetPostProcess',
            text: 'Post-Process Mode',
            blockType: Scratch.BlockType.REPORTER,
            arguments: {}
          },
          {
            opcode: 'opcodeUniform2fv',
            text: 'uniform2fv Name:[NAME] Value:[X] [Y]',
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "_BlockSize"
              },
              X: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: 8
              },
              Y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 8
            },
          },
          hideFromPalette: false
          },
          //THEY BLOCKS WAS VERY DANGEROUS, SHOULDN'T BE USED BY NORMAL USERS. JUST FOR THE PRO.
          {
            opcode: 'opcodeUniform1f',
            text: 'uniform1f Name:[NAME] Value:[X]',
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              NAME: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "_Time"
              },
              X: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: 0
              }
            },
            hideFromPalette: false
          },
          {
            opcode: 'opcodeReplaceShader',
            text: 'post-process VS:[VS] FS:[FS]',
            blockType: Scratch.BlockType.COMMAND,
            arguments: {
              VS: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "attribute vec4 a_position;attribute vec2 a_texcoord;varying vec2 v_texcoord;void main() {gl_Position = vec4(a_position.x, a_position.y, a_position.z, 1);v_texcoord = a_texcoord;}"
              },
              FS: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "varying vec2 v_texcoord;varying vec4 vColor;uniform sampler2D u_texture;void main() {gl_FragColor=texture2D(u_texture,v_texcoord);}"
              }
            },
            hideFromPalette: true
          },


          ],
          menus: {
            PostProcess: {
              acceptReporters: true,
              items: [
                "glitch",
                "dispersion",
                "gray",
                "reverse",
                "pointillism",
                "none",
              ]
            }
          }
        };
      }

      opcodeChangePostProcess({Menu}) {

          if (Menu == "glitch"){
            drawprogram = shaderPrograms.glitch;
          }

          if (Menu ==  "none"){
            drawprogram = shaderPrograms.none;
          }
          if (Menu ==  "gray"){
            drawprogram = shaderPrograms.gray;
          }
          if (Menu ==  "reverse"){
            drawprogram = shaderPrograms.reverse;
          }

          if (Menu ==  "dispersion"){
            drawprogram = shaderPrograms.dispersion;
          }
          if (Menu ==  "pointillism"){
            drawprogram = shaderPrograms.pointillism;
          }
        vm.runtime.requestRedraw();
        vm.renderer.dirty = true;
        drawprogram_mode = Menu;
        uniformLocationBuffer = {};
        if (gl.isProgram(drawprogram) == false){
          console.error('postprocess program not is valid.');
        }
        positionLocation = gl.getAttribLocation(drawprogram, 'a_position');
        texcoordLocation = gl.getAttribLocation(drawprogram, 'a_texcoord');
        textureLocation = gl.getUniformLocation(drawprogram, 'u_texture');
      }
      opcodeChangeDispersion({Amplitude}){
        if (drawprogram_mode != "dispersion" ){
          console.log("post-process mode not dispersion, change to it.");
          this.opcodeChangePostProcess({Menu: "dispersion"});
        }
        setUniform1f(gl,"_Amplitude", Amplitude / 100.0);
        vm.renderer.dirty = true;
      }
      opcodeChangeGlitch({Amplitude}){
        if (drawprogram_mode != "glitch" ){
          console.log("post-process mode not glitch, change to it.");
          this.opcodeChangePostProcess({Menu: "glitch"});
        }
        setUniform1f(gl,"_Amplitude", Scratch.Cast.toNumber(Amplitude) / 100.0);
        vm.renderer.dirty = true;
      }
      opcodeChangeGray({COLOR}){
        if (drawprogram_mode != "gray" ){
          console.log("post-process mode not gray, change to it.");
          this.opcodeChangePostProcess({Menu: "gray"});
        }
        var location =  gl.getUniformLocation(shaderPrograms.gray, '_color');
        gl.uniform3fv(location, Scratch.Cast.toRgbColorList(COLOR));
        vm.renderer.dirty = true;
      }
      opcodeChangePointillism({threshold}){
        if (drawprogram_mode != "pointillism" ){
          console.log("post-process mode not pointillism, change to it.");
          this.opcodeChangePostProcess({Menu: "pointillism"});
        }
        setUniform1f(gl,"u_threshold", Scratch.Cast.toNumber(threshold) / 100.0);
        vm.renderer.dirty = true;
      }
      // not must. but it can make sure the post-process effect is correct (?)
      opcodeRequestReDraw(args,util){
        util.renderer.dirty = true;
        util.runtime.requestRedraw();
        
      }
      opcodeGetPostProcess() {
        return drawprogram_mode;
      }
      //VERY DANGEROUS, SHOULDN'T BE USED BY NORMAL USERS. JUST FOR THE PRO.
      opcodeReplaceShader({VS,FS}) {
        drawprogram = createProgram(gl,VS,FS);
        if (gl.isProgram(drawprogram) == false){
          console.error('postprocess program not is valid.');
        }
        positionLocation = gl.getAttribLocation(drawprogram, 'a_position');
        texcoordLocation = gl.getAttribLocation(drawprogram, 'a_texcoord');
       textureLocation = gl.getUniformLocation(drawprogram, 'u_texture');
      drawprogram_mode = "custom";
      gl.uniform1i(textureLocation, framebuffertexture);
      vm.renderer.dirty = true;
    }
      opcodeUniform2fv({NAME,X,Y}) {
        setUniform2fv(gl,NAME,X,Y);
        vm.renderer.dirty = true;
      }
      opcodeUniform1f({NAME,X}) {
        setUniform1f(gl,NAME,X);
        vm.renderer.dirty = true;

      }
    }
    Scratch.extensions.register(new postprocessing());
  })(Scratch);
