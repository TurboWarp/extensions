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
      uniform float _Amplitude;
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
      float randomNoise(vec2 seed)
      {
          return fract(sin(dot(seed *_Time , vec2(17.13, 3.71))) * 43758.5453123);
      }
      void main() {
        float block = randomNoise(floor(v_texcoord * _BlockSize));
        float displaceNoise = pow(block, 8.0) * pow(block, 3.0);
        float ColorR = texture2D(u_texture,v_texcoord).r;
        float ColorG = texture2D(u_texture,v_texcoord + vec2(displaceNoise * _Amplitude * randomNoise(vec2(7)),0.0)).g;
        float ColorB = texture2D(u_texture,v_texcoord - vec2(displaceNoise * _Amplitude * randomNoise(vec2(13)),0.0)).b;
        gl_FragColor=vec4(ColorR,ColorG,ColorB,1.0);

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
      if (uniformLocationBuffer[uname] == null){
        uniformLocationBuffer[uname] = gl.getUniformLocation(drawprogram, uname);
      }
      return uniformLocationBuffer[uname];
  }
      function setUniform1f(gl,uname,value){
        gl.uniform1f(getUniformLocation(gl,uname),value);

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

    var initializationShader =  (function(){
      var programs = {
        none: null,
        glitch: null,
        dispersion: null
      };
      programs.none = createProgram(gl,createshader(gl,gl.VERTEX_SHADER,vertexShaderCode),createshader(gl,gl.FRAGMENT_SHADER,noneShaderCode));
      programs.glitch = createProgram(gl,createshader(gl,gl.VERTEX_SHADER,vertexShaderCode),createshader(gl,gl.FRAGMENT_SHADER,GlitchShaderCode));
      programs.dispersion = createProgram(gl,createshader(gl,gl.VERTEX_SHADER,vertexShaderCode),createshader(gl,gl.FRAGMENT_SHADER,dispersionShaderCode));
      return programs;
    });


    var uniformLocationBuffer = {};





      var drawframebuffer = null;
      var framebuffersize = {
        Width: 0,
        Height: 0
      };

      var framebuffertexture = null;
      var shaderPrograms = initializationShader();
      console.log(shaderPrograms);
      var drawprogram = shaderPrograms.none;
      var drawprogram_mode = "none";
      var  positionLocation = gl.getAttribLocation(drawprogram, 'a_position');
      var  texcoordLocation = gl.getAttribLocation(drawprogram, 'a_texcoord');
      var textureLocation = gl.getUniformLocation(drawprogram, 'u_texture');

      gl.uniform1i(textureLocation, framebuffertexture);

    /*
      
      const BlockSizeLocation = gl.getUniformLocation(drawprogram, '_BlockSize');
      const AmplitudeLocation = gl.getUniformLocation(drawprogram, '_Amplitude');
      const TimeLocation = gl.getUniformLocation(drawprogram, '_Time');
      const direction_rLocation = gl.getUniformLocation(drawprogram, 'direction_r');
      const direction_gLocation = gl.getUniformLocation(drawprogram, 'direction_g');
      const direction_bLocation = gl.getUniformLocation(drawprogram, 'direction_b'):
      */
    // lookup uniforms
    /*
    const matrixLocation = gl.getUniformLocation(drawprogram, 'u_matrix');
    const projectionLocation = gl.getUniformLocation(drawprogram, 'u_projectionMatrix');
    */


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
          bindFramebufferInfo(gl, null); //modified
          gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
          gl.clearColor(...this._backgroundColor4f);
          gl.clear(gl.COLOR_BUFFER_BIT);
          gl.bindTexture(gl.TEXTURE_2D, framebuffertexture);

          gl.useProgram(drawprogram);

          gl.bindBuffer(gl.ARRAY_BUFFER, quadPositionBuffer);
          gl.enableVertexAttribArray(positionLocation);
          gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

          gl.bindBuffer(gl.ARRAY_BUFFER, quadTexCoordBuffer);
          gl.enableVertexAttribArray(texcoordLocation);
          gl.vertexAttribPointer(texcoordLocation, 2, gl.FLOAT, false, 0, 0);


          // draw the quad (2 triangles, 6 vertices)
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
    vm.runtime.on('STAGE_SIZE_CHANGED',_ => updateFrameBuffer());
    function updateFrameBuffer(){
      console.log('is pain the only way to get stronger?');
      if (framebuffertexture != null){
        console.log('never thought of it.');
        gl.bindTexture(gl.TEXTURE_2D, framebuffertexture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.canvas.width, gl.canvas.height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
      }
    }
    function deg2rad(degrees) {
      //scratch always change degrees by -90
      return (degrees - 90) * Math.PI / 180;
    }
    class postprocessing {
      getInfo() {
        return {
          id: 'postprocessing',
          name: 'Post-Processing',
          blocks: [
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
              }
            },
            },
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
            },
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
              text: 'Glitch Amplitude:[Amplitude]%, BlockSize X:[BlockSize_X] Y:[BlockSize_Y], Time:[Time]',
              blockType: Scratch.BlockType.COMMAND,
              arguments: {
                Amplitude: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: 1
                },
                BlockSize_X: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: 8
                },
                BlockSize_Y: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: 8
                },
                Time: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: 0
                }
              },
            },
            {
              opcode: 'opcodeChangeDispersion',
              text: 'Dispersion Amplitude:[Amplitude]%, Direction R:[Direction_R]° G:[Direction_G]° B:[Direction_B]°',
              blockType: Scratch.BlockType.COMMAND,
              arguments: {
                Amplitude: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: 1
                },
                Direction_R: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: 120
                },
                Direction_G: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: 240
                },
                Direction_B: {
                  type: Scratch.ArgumentType.NUMBER,
                  defaultValue: 360
                }
              },
            },



          ],
          menus: {
            PostProcess: {
              acceptReporters: true,
              items: [
                "glitch",
                "dispersion",
                "none",
              ]
            }
          }
        };
      }

      opcodeChangePostProcess({Menu}) {

          if (Menu == "glitch"){
            drawprogram = shaderPrograms.glitch;
            setUniform2fv(gl,"_BlockSize", 8, 8);
          }


          if (Menu ==  "none"){
            drawprogram = shaderPrograms.none;
          }

          if (Menu ==  "dispersion"){
            drawprogram = shaderPrograms.dispersion;
            setUniform2fv(gl,"direction_r", 1.0, 0.0);
            setUniform2fv(gl,"direction_g", 0.4, 1.0 );
            setUniform2fv(gl,"direction_b",  -0.7, -0.3);
          }


        drawprogram_mode = Menu;
        uniformLocationBuffer = {};
        if (gl.isProgram(drawprogram) == false){
          console.error('postprocess program not is valid.');
        }
          positionLocation = gl.getAttribLocation(drawprogram, 'a_position');
          texcoordLocation = gl.getAttribLocation(drawprogram, 'a_texcoord');
         textureLocation = gl.getUniformLocation(drawprogram, 'u_texture');

        gl.uniform1i(textureLocation, framebuffertexture);
      }
      opcodeChangeDispersion({Amplitude,Direction_R,Direction_G,Direction_B}){
        if (drawprogram_mode != "dispersion" ){
          console.log("you're say lie. you're not using dispersion effect.");
          return;
        }

        setUniform1f(gl,"_Amplitude", Amplitude / 100.0);
        setUniform2fv(gl,"direction_r", Math.cos(deg2rad(Direction_R)),Math.sin(deg2rad(Direction_R)) );
        setUniform2fv(gl,"direction_g", Math.cos(deg2rad(Direction_G)),Math.sin(deg2rad(Direction_G)) );
        setUniform2fv(gl,"direction_b", Math.cos(deg2rad(Direction_B)),Math.sin(deg2rad(Direction_B)) );

      }
      opcodeChangeGlitch({Amplitude,Time,BlockSize_X,BlockSize_Y}){
        if (drawprogram_mode != "glitch" ){
          console.log("you're say lie. you're not using glitch effect.");
          return;
        }
        setUniform1f(gl,"_Amplitude", Amplitude / 100.0);
        setUniform1f(gl,"_Time", Time);
        setUniform2fv(gl,"_BlockSize", BlockSize_X,BlockSize_Y);

      }

      opcodeUniform2fv({NAME,X,Y}) {
        setUniform2fv(gl,NAME,X,Y);

      }
      opcodeUniform1f({NAME,X}) {
        setUniform1f(gl,NAME,X);

      }
    }
    Scratch.extensions.register(new postprocessing());
  })(Scratch);
