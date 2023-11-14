// Name: Pen Plus V6
// ID: penP
// Description: Advanced rendering capabilities.
// By: ObviousAlexC <https://scratch.mit.edu/users/pinksheep2917/>

(function (Scratch) {
  "use strict";

  //?some smaller optimizations just store the multiplacation for later
  const f32_4 = 4 * Float32Array.BYTES_PER_ELEMENT;
  const f32_8 = 8 * Float32Array.BYTES_PER_ELEMENT;
  const f32_10 = 10 * Float32Array.BYTES_PER_ELEMENT;
  const d2r = 0.0174533;

  //?Declare most of the main repo's we are going to use around the scratch vm
  const vm = Scratch.vm;
  const runtime = vm.runtime;
  const renderer = runtime.renderer;
  const shaderManager = renderer._shaderManager;

  const canvas = renderer.canvas;
  const gl = renderer._gl;
  let currentFilter = gl.NEAREST;

  let nativeSize = renderer.useHighQualityRender
    ? [canvas.width, canvas.height]
    : renderer._nativeSize;

  //?create the depth buffer's texture
  //*Create it in scratch's gl so that we have it stored in there!
  let depthBufferTexture = gl.createTexture();

  //?Make a function for updating the depth canvas to fit the scratch stage
  const depthFrameBuffer = gl.createFramebuffer();
  const depthColorBuffer = gl.createRenderbuffer();
  const depthDepthBuffer = gl.createRenderbuffer();

  let lastFB = gl.getParameter(gl.FRAMEBUFFER_BINDING);

  //?Buffer handling and pen loading
  {
    gl.bindTexture(gl.TEXTURE_2D, depthBufferTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      nativeSize[0],
      nativeSize[1],
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      null
    );

    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, depthBufferTexture);
    gl.activeTexture(gl.TEXTURE0);

    gl.bindFramebuffer(gl.FRAMEBUFFER, depthFrameBuffer);

    gl.bindRenderbuffer(gl.RENDERBUFFER, depthColorBuffer);
    gl.renderbufferStorage(
      gl.RENDERBUFFER,
      gl.RGBA8 || gl.RGBA4,
      nativeSize[0],
      nativeSize[1]
    );
    gl.framebufferRenderbuffer(
      gl.FRAMEBUFFER,
      gl.COLOR_ATTACHMENT0,
      gl.RENDERBUFFER,
      depthColorBuffer
    );

    gl.bindRenderbuffer(gl.RENDERBUFFER, depthDepthBuffer);
    gl.renderbufferStorage(
      gl.RENDERBUFFER,
      gl.DEPTH_COMPONENT16,
      nativeSize[0],
      nativeSize[1]
    );
    gl.framebufferRenderbuffer(
      gl.FRAMEBUFFER,
      gl.DEPTH_ATTACHMENT,
      gl.RENDERBUFFER,
      depthDepthBuffer
    );

    gl.framebufferTexture2D(
      gl.FRAMEBUFFER,
      gl.COLOR_ATTACHMENT0,
      gl.TEXTURE_2D,
      depthBufferTexture,
      0
    );

    gl.enable(gl.DEPTH_TEST);

    gl.bindFramebuffer(gl.FRAMEBUFFER, lastFB);

    const updateCanvasSize = () => {
      nativeSize = renderer.useHighQualityRender
        ? [canvas.width, canvas.height]
        : renderer._nativeSize;

      lastFB = gl.getParameter(gl.FRAMEBUFFER_BINDING);

      gl.bindFramebuffer(gl.FRAMEBUFFER, depthFrameBuffer);

      gl.bindRenderbuffer(gl.RENDERBUFFER, depthColorBuffer);
      gl.renderbufferStorage(
        gl.RENDERBUFFER,
        gl.RGBA8 || gl.RGBA4,
        nativeSize[0],
        nativeSize[1]
      );

      gl.bindRenderbuffer(gl.RENDERBUFFER, depthDepthBuffer);
      gl.renderbufferStorage(
        gl.RENDERBUFFER,
        gl.DEPTH_COMPONENT16,
        nativeSize[0],
        nativeSize[1]
      );

      gl.activeTexture(gl.TEXTURE1);

      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        nativeSize[0],
        nativeSize[1],
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        null
      );

      gl.activeTexture(gl.TEXTURE0);

      gl.bindFramebuffer(gl.FRAMEBUFFER, lastFB);
    };

    //?Call it to have it consistant
    updateCanvasSize();

    //?Call every frame because I don't know of a way to detect when the stage is resized

    window.addEventListener("resize", updateCanvasSize);
    vm.runtime.on("STAGE_SIZE_CHANGED", () => {
      updateCanvasSize();
    });

    vm.runtime.on("BEFORE_EXECUTE", () => {
      if (
        (renderer.useHighQualityRender
          ? [canvas.width, canvas.height]
          : renderer._nativeSize) != nativeSize
      ) {
        nativeSize = renderer.useHighQualityRender
          ? [canvas.width, canvas.height]
          : renderer._nativeSize;
        updateCanvasSize();
      }
    });

    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);

    //?Make sure pen is loaded!
    if (!Scratch.vm.extensionManager.isExtensionLoaded("pen")) {
      runtime.extensionManager.loadExtensionIdSync("pen");
    }
  }

  //?Ported from Pen+ version 5
  //?Just a costume library for data uris
  const penPlusCostumeLibrary = {};
  let penPlusImportWrapMode = gl.CLAMP_TO_EDGE;

  //?Debug for depth
  penPlusCostumeLibrary["!Debug_Depth"] = depthBufferTexture;

  const checkForPen = (util) => {
    const curTarget = util.target;
    const customState = curTarget["_customState"];
    if (!customState["Scratch.pen"]) {
      customState["Scratch.pen"] = {
        penDown: false,
        color: 66.66,
        saturation: 100,
        brightness: 100,
        transparency: 0,
        _shade: 50,
        penAttributes: {
          color4f: [0, 0, 1, 1],
          diameter: 1,
        },
      };
    }
  };

  //*Define PEN+ variables >:)
  const triangleDefaultAttributes = [
    // U V  TINT R G B  Z W transparency U V  TINT R G B  Z W transparency U V  TINT R G B  Z W transparency
    0,
    0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1,
    1,
  ];
  const squareDefaultAttributes = [
    // width* height*  rotation  u-mul u     v-mul   v    r g b transparency
    1, 1, 90, 1, 0, 1, 0, 1, 1, 1, 1, 1,
  ];

  const triangleAttributesOfAllSprites = {}; //!it dawned on me I have to do this

  const squareAttributesOfAllSprites = {}; //?Doing this for part 2

  //?Get Shaders
  const penPlusShaders = {
    untextured: {
      Shaders: {
        vert: `
                attribute highp vec4 a_position;
                attribute highp vec4 a_color;
                varying highp vec4 v_color;

                varying highp float v_depth;
                
                void main()
                {
                    v_color = a_color;
                    v_depth = a_position.z;
                    gl_Position = a_position * vec4(a_position.w,a_position.w,0,1);
                }
            `,
        frag: `
                varying highp vec4 v_color;

                uniform mediump vec2 u_res;
                uniform sampler2D u_depthTexture;

                varying highp float v_depth;

                void main()
                {
                  gl_FragColor = v_color;
                  highp vec4 v_depthPart = texture2D(u_depthTexture,gl_FragCoord.xy/u_res);
                  highp float v_depthcalc = v_depthPart.r + floor((v_depthPart.g + floor(v_depthPart.b * 100.0 )) * 100.0);

                  highp float v_inDepth = v_depth;

                  if (v_depth < 0.0 ) {
                    v_inDepth = 0.0;
                  }
                  if (v_depth > 10000.0 ) {
                    v_inDepth = 10000.0;
                  }

                  if (v_depthcalc < v_inDepth){
                    gl_FragColor.a = 0.0;
                  }

                  gl_FragColor.rgb *= gl_FragColor.a;
                }
            `,
      },
      ProgramInf: null,
    },
    textured: {
      Shaders: {
        vert: `
                attribute highp vec4 a_position;
                attribute highp vec4 a_color;
                attribute highp vec2 a_texCoord;
                
                varying highp vec4 v_color;
                varying highp vec2 v_texCoord;

                varying highp float v_depth;
                
                void main()
                {
                    v_color = a_color;
                    v_texCoord = a_texCoord;
                    v_depth = a_position.z;
                    gl_Position = a_position * vec4(a_position.w,a_position.w,0,1);
                }
            `,
        frag: `
                uniform sampler2D u_texture;

                varying highp vec2 v_texCoord;
                varying highp vec4 v_color;

                uniform mediump vec2 u_res;
                uniform sampler2D u_depthTexture;

                varying highp float v_depth;
                
                void main()
                {
                    gl_FragColor = texture2D(u_texture, v_texCoord) * v_color;
                    highp vec4 v_depthPart = texture2D(u_depthTexture,gl_FragCoord.xy/u_res);
                    highp float v_depthcalc = v_depthPart.r + floor((v_depthPart.g + floor(v_depthPart.b * 100.0 )) * 100.0);

                    highp float v_inDepth = v_depth;

                    if (v_depth < 0.0 ) {
                      v_inDepth = 0.0;
                    }
                    if (v_depth > 10000.0 ) {
                      v_inDepth = 10000.0;
                    }

                    if (v_depthcalc < v_inDepth){
                      gl_FragColor.a = 0.0;
                    }

                    gl_FragColor.rgb *= gl_FragColor.a;
                    
                }
            `,
      },
      ProgramInf: null,
    },
    depth: {
      Shaders: {
        vert: `
                attribute highp vec4 a_position;
                
                varying highp float v_depth;
                
                void main()
                {
                    v_depth = a_position.z;
                    gl_Position = a_position * vec4(a_position.w,a_position.w,a_position.w * 0.0001,1);
                }
            `,
        frag: `
                varying highp float v_depth;
                
                void main()
                {
                    if (v_depth >= 10000.0) {
                      gl_FragColor = vec4(1,1,1,1);
                    }
                    else {
                      highp float d_100 = floor(v_depth / 100.0);
                      gl_FragColor = vec4(
                        mod(v_depth,1.0),
                        mod( floor( v_depth - mod(v_depth,1.0) )/100.0,1.0),
                        mod( floor( d_100 - mod(d_100,1.0) )/100.0,1.0),
                        1);
                    }
                }
            `,
      },
      ProgramInf: null,
    },
    pen: {
      program: null,
    },
    createAndCompileShaders: (vert, frag) => {
      //? compile vertex Shader
      const vertShader = gl.createShader(gl.VERTEX_SHADER);
      try {
        gl.shaderSource(vertShader, vert.trim());
        gl.compileShader(vertShader);
        if (!gl.getShaderParameter(vertShader, gl.COMPILE_STATUS)) {
          throw gl.getShaderInfoLog(vertShader);
        }
      } catch (error) {
        console.error(error);
      }

      //? compile fragment Shader
      const fragShader = gl.createShader(gl.FRAGMENT_SHADER);
      try {
        gl.shaderSource(fragShader, frag.trim());
        gl.compileShader(fragShader);
        if (!gl.getShaderParameter(fragShader, gl.COMPILE_STATUS)) {
          throw gl.getShaderInfoLog(fragShader);
        }
      } catch (error) {
        console.error(error);
      }

      //? compile program
      const program = gl.createProgram();
      try {
        gl.attachShader(program, vertShader);
        gl.attachShader(program, fragShader);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
          throw gl.getProgramInfoLog(program);
        }

        gl.validateProgram(program);
        if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
          throw gl.getProgramInfoLog(program);
        }
      } catch (error) {
        console.error(error);
      }

      return {
        program: program,
        vert: vertShader,
        frag: fragShader,
      };
    },
  };

  //? Create program info
  {
    penPlusShaders.untextured.ProgramInf =
      penPlusShaders.createAndCompileShaders(
        penPlusShaders.untextured.Shaders.vert,
        penPlusShaders.untextured.Shaders.frag
      );
    penPlusShaders.textured.ProgramInf = penPlusShaders.createAndCompileShaders(
      penPlusShaders.textured.Shaders.vert,
      penPlusShaders.textured.Shaders.frag
    );

    penPlusShaders.depth.ProgramInf = penPlusShaders.createAndCompileShaders(
      penPlusShaders.depth.Shaders.vert,
      penPlusShaders.depth.Shaders.frag
    );
  }

  //?Untextured
  const a_position_Location_untext = gl.getAttribLocation(
    penPlusShaders.untextured.ProgramInf.program,
    "a_position"
  );
  const a_color_Location_untext = gl.getAttribLocation(
    penPlusShaders.untextured.ProgramInf.program,
    "a_color"
  );

  //?Textured
  const a_position_Location_text = gl.getAttribLocation(
    penPlusShaders.textured.ProgramInf.program,
    "a_position"
  );
  const a_color_Location_text = gl.getAttribLocation(
    penPlusShaders.textured.ProgramInf.program,
    "a_color"
  );
  const a_textCoord_Location_text = gl.getAttribLocation(
    penPlusShaders.textured.ProgramInf.program,
    "a_texCoord"
  );

  //?Uniforms
  const u_texture_Location_text = gl.getUniformLocation(
    penPlusShaders.textured.ProgramInf.program,
    "u_texture"
  );

  const u_depthTexture_Location_untext = gl.getUniformLocation(
    penPlusShaders.untextured.ProgramInf.program,
    "u_depthTexture"
  );

  const u_depthTexture_Location_text = gl.getUniformLocation(
    penPlusShaders.textured.ProgramInf.program,
    "u_depthTexture"
  );

  const u_res_Location_untext = gl.getUniformLocation(
    penPlusShaders.untextured.ProgramInf.program,
    "u_res"
  );

  const u_res_Location_text = gl.getUniformLocation(
    penPlusShaders.textured.ProgramInf.program,
    "u_res"
  );

  //?Depth
  const a_position_Location_depth = gl.getAttribLocation(
    penPlusShaders.depth.ProgramInf.program,
    "a_position"
  );

  //?Enables Attributes
  const vertexBuffer = gl.createBuffer();
  const depthVertexBuffer = gl.createBuffer();
  let vertexBufferData = null;

  {
    gl.enableVertexAttribArray(a_position_Location_untext);
    gl.enableVertexAttribArray(a_color_Location_untext);
    gl.enableVertexAttribArray(a_position_Location_text);
    gl.enableVertexAttribArray(a_color_Location_text);
    gl.enableVertexAttribArray(a_textCoord_Location_text);
    gl.enableVertexAttribArray(a_position_Location_depth);
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindBuffer(gl.ARRAY_BUFFER, depthVertexBuffer);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
  }

  //?Override pen Clear with pen+
  renderer.penClear = (penSkinID) => {
    const lastCC = gl.getParameter(gl.COLOR_CLEAR_VALUE);
    lastFB = gl.getParameter(gl.FRAMEBUFFER_BINDING);
    //Pen+ Overrides default pen Clearing
    gl.bindFramebuffer(gl.FRAMEBUFFER, depthFrameBuffer);
    gl.clearColor(1, 1, 1, 1);
    gl.clear(gl.DEPTH_BUFFER_BIT);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.bindFramebuffer(gl.FRAMEBUFFER, lastFB);
    gl.clearColor(lastCC[0], lastCC[1], lastCC[2], lastCC[3]);

    //? ^ just clear the depth buffer for when its added.

    //Old clearing
    renderer.dirty = true;
    const skin = /** @type {PenSkin} */ renderer._allSkins[penSkinID];
    skin.clear();
  };

  //Pen+ advanced options update
  //I plan to add more later
  const penPlusAdvancedSettings = {
    wValueUnderFlow: false,
    useDepthBuffer: true,
    _ClampZ: false,
    _maxDepth: 1000,
  };

  //?Have this here for ez pz tri drawing on the canvas
  const triFunctions = {
    drawTri: (curProgram, x1, y1, x2, y2, x3, y3, penColor, targetID) => {
      //? get triangle attributes for current sprite.
      const triAttribs = triangleAttributesOfAllSprites[targetID];

      if (triAttribs) {
        vertexBufferData = new Float32Array([
          x1,
          -y1,
          triAttribs[5],
          triAttribs[6],
          penColor[0] * triAttribs[2],
          penColor[1] * triAttribs[3],
          penColor[2] * triAttribs[4],
          penColor[3] * triAttribs[7],

          x2,
          -y2,
          triAttribs[13],
          triAttribs[14],
          penColor[0] * triAttribs[10],
          penColor[1] * triAttribs[11],
          penColor[2] * triAttribs[12],
          penColor[3] * triAttribs[15],

          x3,
          -y3,
          triAttribs[21],
          triAttribs[22],
          penColor[0] * triAttribs[18],
          penColor[1] * triAttribs[19],
          penColor[2] * triAttribs[20],
          penColor[3] * triAttribs[23],
        ]);
      } else {
        vertexBufferData = new Float32Array([
          x1,
          -y1,
          1,
          1,
          penColor[0],
          penColor[1],
          penColor[2],
          penColor[3],

          x2,
          -y2,
          1,
          1,
          penColor[0],
          penColor[1],
          penColor[2],
          penColor[3],

          x3,
          -y3,
          1,
          1,
          penColor[0],
          penColor[1],
          penColor[2],
          penColor[3],
        ]);
      }

      //? Bind Positional Data

      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, vertexBufferData, gl.STATIC_DRAW);
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

      gl.vertexAttribPointer(
        a_position_Location_untext,
        4,
        gl.FLOAT,
        false,
        f32_8,
        0
      );
      gl.vertexAttribPointer(
        a_color_Location_untext,
        4,
        gl.FLOAT,
        false,
        f32_8,
        f32_4
      );

      gl.useProgram(penPlusShaders.untextured.ProgramInf.program);

      gl.uniform1i(u_depthTexture_Location_untext, 1);

      gl.uniform2fv(u_res_Location_untext, nativeSize);

      gl.drawArrays(gl.TRIANGLES, 0, 3);
      //? Hacky fix but it works.

      if (penPlusAdvancedSettings.useDepthBuffer) {
        triFunctions.drawDepthTri(targetID, x1, y1, x2, y2, x3, y3);
      }
      gl.useProgram(penPlusShaders.pen.program);
    },

    drawTextTri: (curProgram, x1, y1, x2, y2, x3, y3, targetID, texture) => {
      //? get triangle attributes for current sprite.
      const triAttribs = triangleAttributesOfAllSprites[targetID];

      if (triAttribs) {
        vertexBufferData = new Float32Array([
          x1,
          -y1,
          penPlusAdvancedSettings.useDepthBuffer ? triAttribs[5] : 0,
          triAttribs[6],
          triAttribs[2],
          triAttribs[3],
          triAttribs[4],
          triAttribs[7],
          triAttribs[0],
          triAttribs[1],

          x2,
          -y2,
          penPlusAdvancedSettings.useDepthBuffer ? triAttribs[13] : 0,
          triAttribs[14],
          triAttribs[10],
          triAttribs[11],
          triAttribs[12],
          triAttribs[15],
          triAttribs[8],
          triAttribs[9],

          x3,
          -y3,
          penPlusAdvancedSettings.useDepthBuffer ? triAttribs[21] : 0,
          triAttribs[22],
          triAttribs[18],
          triAttribs[19],
          triAttribs[20],
          triAttribs[23],
          triAttribs[16],
          triAttribs[17],
        ]);
      } else {
        vertexBufferData = new Float32Array([
          x1,
          -y1,
          0,
          1,
          1,
          1,
          1,
          1,
          0,
          0,

          x2,
          -y2,
          0,
          1,
          1,
          1,
          1,
          1,
          1,
          1,

          x3,
          -y3,
          0,
          1,
          1,
          1,
          1,
          1,
          1,
          0,
        ]);
      }
      //? Bind Positional Data
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, vertexBufferData, gl.DYNAMIC_DRAW);

      gl.vertexAttribPointer(
        a_position_Location_text,
        4,
        gl.FLOAT,
        false,
        f32_10,
        0
      );
      gl.vertexAttribPointer(
        a_color_Location_text,
        4,
        gl.FLOAT,
        false,
        f32_10,
        f32_4
      );
      gl.vertexAttribPointer(
        a_textCoord_Location_text,
        2,
        gl.FLOAT,
        false,
        f32_10,
        f32_8
      );

      gl.useProgram(penPlusShaders.textured.ProgramInf.program);

      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, currentFilter);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, currentFilter);
      gl.uniform1i(u_texture_Location_text, 0);

      gl.uniform1i(u_depthTexture_Location_text, 1);

      gl.uniform2fv(u_res_Location_text, nativeSize);

      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (penPlusAdvancedSettings.useDepthBuffer) {
        triFunctions.drawDepthTri(targetID, x1, y1, x2, y2, x3, y3);
      }
      gl.useProgram(penPlusShaders.pen.program);
    },

    //? this is so I don't have to go through the hassle of replacing default scratch shaders
    //? many of curse words where exchanged between me and a pillow while writing this extension
    //? but I have previaled!
    drawDepthTri: (targetID, x1, y1, x2, y2, x3, y3) => {
      lastFB = gl.getParameter(gl.FRAMEBUFFER_BINDING);
      const triAttribs = triangleAttributesOfAllSprites[targetID];
      gl.bindFramebuffer(gl.FRAMEBUFFER, depthFrameBuffer);

      if (triAttribs) {
        vertexBufferData = new Float32Array([
          x1,
          -y1,
          triAttribs[5],
          triAttribs[6],

          x2,
          -y2,
          triAttribs[13],
          triAttribs[14],

          x3,
          -y3,
          triAttribs[21],
          triAttribs[22],
        ]);
      } else {
        vertexBufferData = new Float32Array([
          x1,
          -y1,
          0,
          1,

          x2,
          -y2,
          0,
          1,

          x3,
          -y3,
          0,
          1,
        ]);
      }

      //? Bind Positional Data
      gl.bindBuffer(gl.ARRAY_BUFFER, depthVertexBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, vertexBufferData, gl.DYNAMIC_DRAW);

      gl.vertexAttribPointer(
        a_position_Location_depth,
        4,
        gl.FLOAT,
        false,
        f32_4,
        0
      );

      gl.useProgram(penPlusShaders.depth.ProgramInf.program);

      gl.drawArrays(gl.TRIANGLES, 0, 3);

      gl.bindFramebuffer(gl.FRAMEBUFFER, lastFB);
    },

    setValueAccordingToCaseTriangle: (
      targetId,
      attribute,
      value,
      wholeTri,
      offset
    ) => {
      offset = offset + attribute || attribute;
      let valuetoSet = 0;
      switch (attribute) {
        //U
        case 0:
          valuetoSet = value;
          break;
        //V
        case 1:
          valuetoSet = value;
          break;

        //100 since that is what scratch users are accustomed to.
        //R
        case 2:
          valuetoSet = Math.min(Math.max(value, 0), 100) * 0.01;
          break;
        //G
        case 3:
          valuetoSet = Math.min(Math.max(value, 0), 100) * 0.01;
          break;
        //B
        case 4:
          valuetoSet = Math.min(Math.max(value, 0), 100) * 0.01;
          break;

        //Clamp to 0 so we can't go behind the stage.
        //Z
        case 5:
          if (penPlusAdvancedSettings._ClampZ) {
            if (value < 0) {
              valuetoSet = 0;
              break;
            }
            //convert to depth space for best accuracy
            valuetoSet = Math.min(
              (value * 10000) / penPlusAdvancedSettings._maxDepth,
              10000
            );
            break;
          }
          //convert to depth space for best accuracy
          valuetoSet = (value * 10000) / penPlusAdvancedSettings._maxDepth;
          break;

        //Clamp to 1 so we don't accidentally clip.
        //W
        case 6:
          if (penPlusAdvancedSettings.wValueUnderFlow == true) {
            valuetoSet = value;
          } else {
            valuetoSet = Math.max(value, 1);
          }
          break;
        //Transparency
        //Same story as color
        case 7:
          valuetoSet = Math.min(Math.max(value, 0), 1000) * 0.01;
          break;

        //Just break if value isn't valid
        default:
          break;
      }
      //Check if the index even exists.
      if (attribute >= 0 && attribute <= 7) {
        if (wholeTri) {
          triangleAttributesOfAllSprites[targetId][attribute] = valuetoSet;
          triangleAttributesOfAllSprites[targetId][attribute + 8] = valuetoSet;
          triangleAttributesOfAllSprites[targetId][attribute + 16] = valuetoSet;
        } else {
          triangleAttributesOfAllSprites[targetId][offset] = valuetoSet;
        }
      }
    },
  };

  const lilPenDabble = (InativeSize, curTarget, util) => {
    checkForPen(util);

    const attrib = curTarget["_customState"]["Scratch.pen"].penAttributes;

    Scratch.vm.renderer.penLine(
      Scratch.vm.renderer._penSkinId,
      {
        color4f: [1, 1, 1, 0.011],
        diameter: 1,
      },
      InativeSize[0] / 2,
      InativeSize[1] / 2,
      InativeSize[0] / 2,
      InativeSize[1] / 2
    );
  };

  //?Color Library
  const colors = {
    hexToRgb: (hex) => {
      if (typeof hex == "string") {
        const splitHex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return {
          r: parseInt(splitHex[1], 16),
          g: parseInt(splitHex[2], 16),
          b: parseInt(splitHex[3], 16),
        };
      }
      hex = Scratch.Cast.toNumber(hex);
      return {
        r: Math.floor(hex / 65536),
        g: Math.floor(hex / 256) % 256,
        b: hex % 256,
      };
    },

    rgbtoSColor: ({ R, G, B }) => {
      R = Math.min(Math.max(R, 0), 100) * 2.55;
      G = Math.min(Math.max(G, 0), 100) * 2.55;
      B = Math.min(Math.max(B, 0), 100) * 2.55;
      return (Math.ceil(R) * 256 + Math.ceil(G)) * 256 + Math.ceil(B);
    },
  };

  const textureFunctions = {
    createBlankPenPlusTextureInfo: function (
      width,
      height,
      color,
      name,
      clamp
    ) {
      const texture = penPlusCostumeLibrary[name]
        ? penPlusCostumeLibrary[name].texture
        : gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      // Fill the texture with a 1x1 blue pixel.

      const pixelData = new Uint8Array(width * height * 4);

      const decodedColor = colors.hexToRgb(color);

      for (let pixelID = 0; pixelID < pixelData.length / 4; pixelID++) {
        pixelData[pixelID * 4] = decodedColor.r;
        pixelData[pixelID * 4 + 1] = decodedColor.g;
        pixelData[pixelID * 4 + 2] = decodedColor.b;
        pixelData[pixelID * 4 + 3] = 255;
      }

      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, clamp);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, clamp);

      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        width,
        height,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        pixelData
      );

      penPlusCostumeLibrary[name] = {
        texture: texture,
        width: width,
        height: height,
      };
    },
    createPenPlusTextureInfo: function (url, name, clamp) {
      const texture = penPlusCostumeLibrary[name]
        ? penPlusCostumeLibrary[name].texture
        : gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      // Fill the texture with a 1x1 blue pixel.
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        1,
        1,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        new Uint8Array([0, 0, 255, 255])
      );

      // Let's assume all images are not a power of 2
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, clamp);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, clamp);
      return new Promise((resolve, reject) => {
        Scratch.canFetch(url).then((allowed) => {
          if (!allowed) {
            reject(false);
          }
          // Permission is checked earlier.
          // eslint-disable-next-line no-restricted-syntax
          const image = new Image();
          image.onload = function () {
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texImage2D(
              gl.TEXTURE_2D,
              0,
              gl.RGBA,
              gl.RGBA,
              gl.UNSIGNED_BYTE,
              image
            );
            penPlusCostumeLibrary[name] = {
              texture: texture,
              width: image.width,
              height: image.height,
            };
            resolve(texture);
          };
          image.crossOrigin = "anonymous";
          image.src = url;
        });
      });
    },

    getTextureData: (texture, width, height) => {
      //?Initilize the temp framebuffer and assign it
      const readBuffer = gl.createFramebuffer();

      lastFB = gl.getParameter(gl.FRAMEBUFFER_BINDING);

      gl.bindFramebuffer(gl.FRAMEBUFFER, readBuffer);

      gl.framebufferTexture2D(
        gl.FRAMEBUFFER,
        gl.COLOR_ATTACHMENT0,
        gl.TEXTURE_2D,
        texture,
        0
      );

      //?make sure to unbind the framebuffer and delete it!
      const removeBuffer = () => {
        gl.deleteFramebuffer(readBuffer);
      };

      //?if sucessful read
      if (
        gl.checkFramebufferStatus(gl.FRAMEBUFFER) == gl.FRAMEBUFFER_COMPLETE
      ) {
        //?Make an array to write the pixels onto
        let dataArray = new Uint8Array(width * height * 4);
        gl.readPixels(
          0,
          0,
          width,
          height,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          dataArray
        );

        //?Remove Buffer data and return data
        removeBuffer();
        return dataArray;
      }

      //?If not return undefined
      removeBuffer();
      return undefined;
    },

    getTextureAsURI: (texture, width, height) => {
      //?Initilize the temp framebuffer and assign it
      const readBuffer = gl.createFramebuffer();

      lastFB = gl.getParameter(gl.FRAMEBUFFER_BINDING);

      gl.bindFramebuffer(gl.FRAMEBUFFER, readBuffer);

      gl.framebufferTexture2D(
        gl.FRAMEBUFFER,
        gl.COLOR_ATTACHMENT0,
        gl.TEXTURE_2D,
        texture,
        0
      );

      //?make sure to unbind the framebuffer and delete it!
      const removeBuffer = () => {
        gl.deleteFramebuffer(readBuffer);
      };

      //?if sucessful read
      if (
        gl.checkFramebufferStatus(gl.FRAMEBUFFER) == gl.FRAMEBUFFER_COMPLETE
      ) {
        //?Make an array to write the pixels onto
        let dataArray = new Uint8Array(width * height * 4);
        gl.readPixels(
          0,
          0,
          width,
          height,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          dataArray
        );

        //Make an invisible canvas
        const dataURICanvas = document.createElement("canvas");
        dataURICanvas.width = width;
        dataURICanvas.height = height;
        const dataURIContext = dataURICanvas.getContext("2d");

        // Copy the pixels to a 2D canvas
        const imageData = dataURIContext.createImageData(width, height);
        imageData.data.set(dataArray);
        dataURIContext.putImageData(imageData, 0, 0);

        //?Remove Buffer data and return data
        removeBuffer();
        return dataURICanvas.toDataURL();
      }

      //?If not return undefined
      removeBuffer();
      return undefined;
    },
  };

  class extension {
    getInfo() {
      return {
        blocks: [
          {
            opcode: "__NOUSEOPCODE",
            blockType: Scratch.BlockType.LABEL,
            text: "Pen Properties",
          },
          {
            disableMonitor: true,
            opcode: "isPenDown",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "pen is down?",
            arguments: {},
            filter: "sprite",
          },
          {
            disableMonitor: true,
            opcode: "getPenHSV",
            blockType: Scratch.BlockType.REPORTER,
            text: "pen [HSV]",
            arguments: {
              HSV: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "color",
                menu: "hsvMenu",
              },
            },
            filter: "sprite",
          },
          {
            disableMonitor: true,
            opcode: "drawDot",
            blockType: Scratch.BlockType.COMMAND,
            text: "draw dot at [x] [y]",
            arguments: {
              x: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            },
            filter: "sprite",
          },
          {
            disableMonitor: true,
            opcode: "drawLine",
            blockType: Scratch.BlockType.COMMAND,
            text: "draw line from [x1] [y1] to [x2] [y2]",
            arguments: {
              x1: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              y1: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              x2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
              y2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
            },
            filter: "sprite",
          },
          {
            opcode: "__NOUSEOPCODE",
            blockType: Scratch.BlockType.LABEL,
            text: "Square Pen Blocks",
          },
          {
            disableMonitor: true,
            opcode: "squareDown",
            blockType: Scratch.BlockType.COMMAND,
            text: "stamp pen square",
            arguments: {},
            filter: "sprite",
          },
          {
            disableMonitor: true,
            opcode: "squareTexDown",
            blockType: Scratch.BlockType.COMMAND,
            text: "stamp pen square with the texture of [tex]",
            arguments: {
              tex: { type: Scratch.ArgumentType.STRING, menu: "costumeMenu" },
            },
            filter: "sprite",
          },
          {
            disableMonitor: true,
            opcode: "setStampAttribute",
            blockType: Scratch.BlockType.COMMAND,
            text: "set pen square's [target] to [number]",
            arguments: {
              target: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
                menu: "stampSquare",
              },
              number: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
            },
            filter: "sprite",
          },
          {
            disableMonitor: true,
            opcode: "getStampAttribute",
            blockType: Scratch.BlockType.REPORTER,
            text: "get pen square's [target]",
            arguments: {
              target: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0,
                menu: "stampSquare",
              },
            },
            filter: "sprite",
          },
          {
            disableMonitor: true,
            opcode: "tintSquare",
            blockType: Scratch.BlockType.COMMAND,
            text: "tint pen square to [color]",
            arguments: {
              color: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#0000ff",
              },
            },
            filter: "sprite",
          },
          {
            disableMonitor: true,
            opcode: "resetSquareAttributes",
            blockType: Scratch.BlockType.COMMAND,
            text: "reset square Attributes",
            arguments: {},
            filter: "sprite",
          },
          {
            opcode: "__NOUSEOPCODE",
            blockType: Scratch.BlockType.LABEL,
            text: "Triangle Blocks",
          },
          {
            disableMonitor: true,
            opcode: "setTriangleFilterMode",
            blockType: Scratch.BlockType.COMMAND,
            text: "set triangle filter mode to [filter]",
            arguments: {
              filter: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 9728,
                menu: "filterType",
              },
            },
            filter: "sprite",
          },
          {
            disableMonitor: true,
            opcode: "setTrianglePointAttribute",
            blockType: Scratch.BlockType.COMMAND,
            text: "set triangle point [point]'s [attribute] to [value]",
            arguments: {
              point: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "1",
                menu: "pointMenu",
              },
              attribute: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "2",
                menu: "triAttribute",
              },
              value: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
            },
            filter: "sprite",
          },
          {
            disableMonitor: true,
            opcode: "setWholeTrianglePointAttribute",
            blockType: Scratch.BlockType.COMMAND,
            text: "set triangle's [wholeAttribute] to [value]",
            arguments: {
              wholeAttribute: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "2",
                menu: "wholeTriAttribute",
              },
              value: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
            },
            filter: "sprite",
          },
          {
            disableMonitor: true,
            opcode: "tintTriPoint",
            blockType: Scratch.BlockType.COMMAND,
            text: "tint triangle point [point] to [color]",
            arguments: {
              point: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "1",
                menu: "pointMenu",
              },
              color: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#0000ff",
              },
            },
            filter: "sprite",
          },
          {
            disableMonitor: true,
            opcode: "tintTri",
            blockType: Scratch.BlockType.COMMAND,
            text: "tint triangle to [color]",
            arguments: {
              point: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "1",
                menu: "pointMenu",
              },
              color: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#0000ff",
              },
            },
            filter: "sprite",
          },
          {
            disableMonitor: true,
            opcode: "getTrianglePointAttribute",
            blockType: Scratch.BlockType.REPORTER,
            text: "get triangle point [point]'s [attribute]",
            arguments: {
              point: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "1",
                menu: "pointMenu",
              },
              attribute: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 2,
                menu: "triAttribute",
              },
            },
            filter: "sprite",
          },
          {
            disableMonitor: true,
            opcode: "resetWholeTriangleAttributes",
            blockType: Scratch.BlockType.COMMAND,
            text: "reset triangle attributes",
            arguments: {},
            filter: "sprite",
          },
          {
            disableMonitor: true,
            opcode: "drawSolidTri",
            blockType: Scratch.BlockType.COMMAND,
            text: "draw triangle between [x1] [y1], [x2] [y2] and [x3] [y3]",
            arguments: {
              x1: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              y1: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              x2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
              y2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
              x3: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
              y3: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            },
            filter: "sprite",
          },
          {
            disableMonitor: true,
            opcode: "drawTexTri",
            blockType: Scratch.BlockType.COMMAND,
            text: "draw textured triangle between [x1] [y1], [x2] [y2] and [x3] [y3] with the texture [tex]",
            arguments: {
              x1: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              y1: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              x2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
              y2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
              x3: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
              y3: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              tex: { type: Scratch.ArgumentType.STRING, menu: "costumeMenu" },
            },
            filter: "sprite",
          },
          {
            opcode: "__NOUSEOPCODE",
            blockType: Scratch.BlockType.LABEL,
            text: "Color",
          },
          {
            disableMonitor: true,
            opcode: "RGB2HEX",
            blockType: Scratch.BlockType.REPORTER,
            text: "red [R] green [G] blue [B]",
            arguments: {
              R: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              G: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              B: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
            },
          },
          {
            disableMonitor: true,
            opcode: "HSV2RGB",
            blockType: Scratch.BlockType.REPORTER,
            text: "hue [H] saturation [S] value [V]",
            arguments: {
              H: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              S: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
              V: { type: Scratch.ArgumentType.NUMBER, defaultValue: 100 },
            },
          },
          {
            opcode: "__NOUSEOPCODE",
            blockType: Scratch.BlockType.LABEL,
            text: "Images",
          },
          {
            disableMonitor: true,
            opcode: "setDURIclampmode",
            blockType: Scratch.BlockType.COMMAND,
            text: "set imported image wrap mode to [clampMode]",
            arguments: {
              clampMode: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "33071",
                menu: "wrapType",
              },
            },
          },
          {
            disableMonitor: true,
            opcode: "addBlankIMG",
            blockType: Scratch.BlockType.COMMAND,
            text: "add blank image that is [color] and the size of [width], [height] named [name] to Pen+ Library",
            arguments: {
              color: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#ffffff",
              },
              width: { type: Scratch.ArgumentType.NUMBER, defaultValue: 128 },
              height: { type: Scratch.ArgumentType.NUMBER, defaultValue: 128 },
              name: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Image",
              },
            },
          },
          {
            disableMonitor: true,
            opcode: "addIMGfromDURI",
            blockType: Scratch.BlockType.COMMAND,
            text: "add image named [name] from [dataURI] to Pen+ Library",
            arguments: {
              dataURI: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "https://extensions.turbowarp.org/dango.png",
              },
              name: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Image",
              },
            },
          },
          {
            disableMonitor: true,
            opcode: "removeIMGfromDURI",
            blockType: Scratch.BlockType.COMMAND,
            text: "remove image named [name] from Pen+ Library",
            arguments: {
              name: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Image",
              },
            },
            filter: "sprite",
          },
          {
            disableMonitor: true,
            opcode: "doesIMGexist",
            blockType: Scratch.BlockType.BOOLEAN,
            text: "does [name] exist in Pen+ Library",
            arguments: {
              name: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "Image",
              },
            },
            filter: "sprite",
          },
          {
            disableMonitor: true,
            opcode: "getCostumeDataURI",
            blockType: Scratch.BlockType.REPORTER,
            text: "get data uri for costume [costume]",
            arguments: {
              costume: {
                type: Scratch.ArgumentType.STRING,
                menu: "getCostumeDataURI_costume_Menu",
              },
            },
            filter: "sprite",
          },
          {
            disableMonitor: true,
            opcode: "getDimensionOf",
            blockType: Scratch.BlockType.REPORTER,
            text: "get the [dimension] of [costume] in pen+ costume library",
            arguments: {
              dimension: {
                type: Scratch.ArgumentType.STRING,
                menu: "getDimensionOf_dimension_Menu",
              },
              costume: {
                type: Scratch.ArgumentType.STRING,
                menu: "penPlusCostumes",
              },
            },
            filter: "sprite",
          },
          {
            disableMonitor: true,
            opcode: "setpixelcolor",
            blockType: Scratch.BlockType.COMMAND,
            text: "set pixel [x] [y]'s color to [color] in [costume]",
            arguments: {
              x: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
              y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
              color: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#0000ff",
              },
              costume: {
                type: Scratch.ArgumentType.STRING,
                menu: "penPlusCostumes",
              },
            },
          },
          {
            disableMonitor: true,
            opcode: "getpixelcolor",
            blockType: Scratch.BlockType.REPORTER,
            text: "get pixel [x] [y]'s color in [costume]",
            arguments: {
              x: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
              y: { type: Scratch.ArgumentType.NUMBER, defaultValue: 1 },
              costume: {
                type: Scratch.ArgumentType.STRING,
                menu: "penPlusCostumes",
              },
            },
          },
          {
            disableMonitor: true,
            opcode: "getPenPlusCostumeURI",
            blockType: Scratch.BlockType.REPORTER,
            text: "get data uri of [costume] in the pen+ costume library",
            arguments: {
              costume: {
                type: Scratch.ArgumentType.STRING,
                menu: "penPlusCostumes",
              },
            },
          },
          {
            opcode: "__NOUSEOPCODE",
            blockType: Scratch.BlockType.LABEL,
            text: "Advanced options",
          },
          {
            disableMonitor: true,
            opcode: "turnAdvancedSettingOff",
            blockType: Scratch.BlockType.COMMAND,
            text: "turn advanced setting [Setting] [onOrOff]",
            arguments: {
              Setting: {
                type: Scratch.ArgumentType.STRING,
                menu: "advancedSettingsMenu",
              },
              onOrOff: { type: Scratch.ArgumentType.STRING, menu: "onOffMenu" },
            },
          },
          {
            disableMonitor: true,
            opcode: "setAdvancedOptionValueTo",
            blockType: Scratch.BlockType.COMMAND,
            text: "set [setting] to [value]",
            arguments: {
              setting: {
                type: Scratch.ArgumentType.STRING,
                menu: "advancedSettingValuesMenu",
              },
              value: {
                type: Scratch.ArgumentType.STRING,
                defaultValue: "1000",
              },
            },
          },
        ],
        menus: {
          hsvMenu: {
            items: [
              "color",
              "saturation",
              "brightness",
              "transparency",
              "size",
            ],
            acceptReporters: true,
          },
          stampSquare: {
            items: [
              { text: "Width", value: "0" },
              { text: "Height", value: "1" },
              { text: "Rotation", value: "2" },
              { text: "U-Multiplier", value: "3" },
              { text: "U-Offset", value: "4" },
              { text: "V-Multiplier", value: "5" },
              { text: "V-Offset", value: "6" },
              { text: "Red Tint", value: "7" },
              { text: "Green Tint", value: "8" },
              { text: "Blue Tint", value: "9" },
              { text: "Transparency", value: "10" },
              { text: "depth value", value: "11" },
            ],
            acceptReporters: true,
          },
          triAttribute: {
            items: [
              { text: "U value", value: "0" },
              { text: "V value", value: "1" },
              { text: "red tint", value: "2" },
              { text: "green tint", value: "3" },
              { text: "blue tint", value: "4" },
              { text: "transparency", value: "7" },
              { text: "corner pinch", value: "6" },
              { text: "depth value", value: "5" },
            ],
            acceptReporters: true,
          },
          wholeTriAttribute: {
            items: [
              { text: "red tint", value: "2" },
              { text: "green tint", value: "3" },
              { text: "blue tint", value: "4" },
              { text: "transparency", value: "7" },
              { text: "depth value", value: "5" },
            ],
            acceptReporters: true,
          },
          filterType: {
            items: [
              { text: "Closest", value: "9728" },
              { text: "Linear", value: "9729" },
            ],
            acceptReporters: true,
          },
          wrapType: {
            items: [
              { text: "Clamp", value: "33071" },
              { text: "Repeat", value: "10497" },
              { text: "Mirrored", value: "33648" },
            ],
            acceptReporters: true,
          },
          pointMenu: { items: ["1", "2", "3"], acceptReporters: true },
          onOffMenu: { items: ["on", "off"], acceptReporters: true },
          costumeMenu: { items: "costumeMenuFunction", acceptReporters: true },
          penPlusCostumes: {
            items: "penPlusCostumesFunction",
            acceptReporters: true,
          },
          advancedSettingsMenu: {
            items: [
              { text: "allow 'Corner Pinch < 1'", value: "wValueUnderFlow" },
              { text: "toggle depth buffer", value: "useDepthBuffer" },
              { text: "clamp depth value", value: "_ClampZ" },
            ],
            acceptReporters: true,
          },
          advancedSettingValuesMenu: {
            items: [{ text: "maximum depth value", value: "depthMax" }],
            acceptReporters: false,
          },
          getCostumeDataURI_costume_Menu: {
            items: "getCostumeDataURI_costume_MenuFunction",
            acceptReporters: true,
          },
          getDimensionOf_dimension_Menu: {
            items: ["width", "height"],
            acceptReporters: true,
          },
        },
        name: "Pen+ V6",
        id: "penP",
        menuIconURI:
          "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIzMi45OTk3MiIgaGVpZ2h0PSIzMi44ODIwNyIgdmlld0JveD0iMCwwLDMyLjk5OTcyLDMyLjg4MjA3Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjI0LC0xNjMuOTk5OTMpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTIyOC43NTMsMTk0LjYwMmwtNC4yNSwxLjc4bDEuNzgzLC00LjIzN2MxLjIxOCwtMi44OTIgMi45MDcsLTUuNDIzIDUuMDMsLTcuNTM4bDE5Ljc1LC0xOS42NzdjMC44NDYsLTAuODQyIDIuNjUsLTAuNDEgNC4wMzIsMC45NjdjMS4zOCwxLjM3NSAxLjgxNiwzLjE3MyAwLjk3LDQuMDE1bC0xOS43NSwxOS42NzhjLTIuMTIzLDIuMTE2IC00LjY2NCwzLjggLTcuNTY1LDUuMDEyIiBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZT0iIzU3NWU3NSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHBhdGggZD0iTTIzNi44NTgsMTczLjQyOGMwLDAgMi42MTYsMi4yMiA0LjM1LC0xLjU0NmMzLjc1MiwtOC4xNSA4LjIwMiwtNS43NzIgOC4yMDIsLTUuNzcyIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZT0iIzU3NWU3NSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHBhdGggZD0iTTI1Ni40MiwxNjguODI1YzAsMC40NjMgLTAuMTQsMC44NzMgLTAuNDMyLDEuMTY0bC05LjMzNSw5LjNjMC4yODIsLTAuMjkgMC40MSwtMC42NjggMC40MSwtMS4xMmMwLC0wLjg3NCAtMC41MDcsLTEuOTYzIC0xLjQwNiwtMi44NjhjLTEuMzYyLC0xLjM1OCAtMy4xNDcsLTEuOCAtNC4wMDIsLTAuOTlsOS4zMzUsLTkuMzAxYzAuODQ0LC0wLjg0IDIuNjUsLTAuNDEgNC4wMzUsMC45NmMwLjg5OCwwLjkwNCAxLjM5NiwxLjk4MiAxLjM5NiwyLjg1NU0yMzAuNTE1LDE5My43NzRjLTAuNTczLDAuMzAyIC0xLjE1NywwLjU3IC0xLjc2NCwwLjgzbC00LjI1MSwxLjc3OGwxLjc4NiwtNC4yMzVjMC4yNTgsLTAuNjA0IDAuNTMsLTEuMTg2IDAuODMzLC0xLjc1N2MwLjY5LDAuMTgzIDEuNDQ4LDAuNjI1IDIuMTA4LDEuMjgyYzAuNjYsMC42NTggMS4xMDIsMS40MTIgMS4yODcsMi4xMDIiIGZpbGw9IiM0Yzk3ZmYiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlPSIjNTc1ZTc1IiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cGF0aCBkPSJNMjU2LjQ5OCwxNjguNzQ4YzAsMC40NjQgLTAuMTQsMC44NzQgLTAuNDMzLDEuMTY1bC0xOS43NDIsMTkuNjhjLTIuMTMsMi4xMSAtNC42NzMsMy43OTMgLTcuNTcyLDUuMDFsLTQuMjUxLDEuNzc3bDAuOTc0LC0yLjMxNmwxLjkyNSwtMC44MDhjMi44OTgsLTEuMjE4IDUuNDQsLTIuOSA3LjU3LC01LjAxbDE5Ljc0MywtMTkuNjhjMC4yOTIsLTAuMjkyIDAuNDMyLC0wLjcwMiAwLjQzMiwtMS4xNjVjMCwtMC42NDYgLTAuMjcsLTEuNCAtMC43OCwtMi4xMjJjMC4yNSwwLjE3MiAwLjUsMC4zNzcgMC43MzcsMC42MTRjMC44OTgsMC45MDUgMS4zOTYsMS45ODMgMS4zOTYsMi44NTYiIGZpbGw9IiM1NzVlNzUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlPSIjNTc1ZTc1IiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIG9wYWNpdHk9IjAuMTUiLz48cGF0aCBkPSJNMjM4LjQ1LDE3Mi44M2MwLDAuNSAtMC40MDQsMC45MDUgLTAuOTA0LDAuOTA1Yy0wLjUsMCAtMC45MDUsLTAuNDA1IC0wLjkwNSwtMC45MDRjMCwtMC41IDAuNDA3LC0wLjkwMyAwLjkwNiwtMC45MDNjMC41LDAgMC45MDQsMC40MDQgMC45MDQsMC45MDR6IiBmaWxsPSIjNTc1ZTc1IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZT0iIzU3NWU3NSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHBhdGggZD0iTTI0NC45OTgwNywxODcuMDUyOThoOS41MTc2NSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIi8+PHBhdGggZD0iTTI0OS43NTY4OSwxOTEuODExOHYtOS41MTc2NSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIi8+PC9nPjwvZz48L3N2Zz48IS0tcm90YXRpb25DZW50ZXI6MTY6MTYuMDAwMDY5MjMwODQyMTQzLS0+",
        blockIconURI:
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+cGVuLWljb248L3RpdGxlPjxnIHN0cm9rZT0iIzU3NUU3NSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik04Ljc1MyAzNC42MDJsLTQuMjUgMS43OCAxLjc4My00LjIzN2MxLjIxOC0yLjg5MiAyLjkwNy01LjQyMyA1LjAzLTcuNTM4TDMxLjA2NiA0LjkzYy44NDYtLjg0MiAyLjY1LS40MSA0LjAzMi45NjcgMS4zOCAxLjM3NSAxLjgxNiAzLjE3My45NyA0LjAxNUwxNi4zMTggMjkuNTljLTIuMTIzIDIuMTE2LTQuNjY0IDMuOC03LjU2NSA1LjAxMiIgZmlsbD0iI0ZGRiIvPjxwYXRoIGQ9Ik0yOS40MSA2LjExcy00LjQ1LTIuMzc4LTguMjAyIDUuNzcyYy0xLjczNCAzLjc2Ni00LjM1IDEuNTQ2LTQuMzUgMS41NDYiLz48cGF0aCBkPSJNMzYuNDIgOC44MjVjMCAuNDYzLS4xNC44NzMtLjQzMiAxLjE2NGwtOS4zMzUgOS4zYy4yODItLjI5LjQxLS42NjguNDEtMS4xMiAwLS44NzQtLjUwNy0xLjk2My0xLjQwNi0yLjg2OC0xLjM2Mi0xLjM1OC0zLjE0Ny0xLjgtNC4wMDItLjk5TDMwLjk5IDUuMDFjLjg0NC0uODQgMi42NS0uNDEgNC4wMzUuOTYuODk4LjkwNCAxLjM5NiAxLjk4MiAxLjM5NiAyLjg1NU0xMC41MTUgMzMuNzc0Yy0uNTczLjMwMi0xLjE1Ny41Ny0xLjc2NC44M0w0LjUgMzYuMzgybDEuNzg2LTQuMjM1Yy4yNTgtLjYwNC41My0xLjE4Ni44MzMtMS43NTcuNjkuMTgzIDEuNDQ4LjYyNSAyLjEwOCAxLjI4Mi42Ni42NTggMS4xMDIgMS40MTIgMS4yODcgMi4xMDIiIGZpbGw9IiM0Qzk3RkYiLz48cGF0aCBkPSJNMzYuNDk4IDguNzQ4YzAgLjQ2NC0uMTQuODc0LS40MzMgMS4xNjVsLTE5Ljc0MiAxOS42OGMtMi4xMyAyLjExLTQuNjczIDMuNzkzLTcuNTcyIDUuMDFMNC41IDM2LjM4bC45NzQtMi4zMTYgMS45MjUtLjgwOGMyLjg5OC0xLjIxOCA1LjQ0LTIuOSA3LjU3LTUuMDFsMTkuNzQzLTE5LjY4Yy4yOTItLjI5Mi40MzItLjcwMi40MzItMS4xNjUgMC0uNjQ2LS4yNy0xLjQtLjc4LTIuMTIyLjI1LjE3Mi41LjM3Ny43MzcuNjE0Ljg5OC45MDUgMS4zOTYgMS45ODMgMS4zOTYgMi44NTYiIGZpbGw9IiM1NzVFNzUiIG9wYWNpdHk9Ii4xNSIvPjxwYXRoIGQ9Ik0xOC40NSAxMi44M2MwIC41LS40MDQuOTA1LS45MDQuOTA1cy0uOTA1LS40MDUtLjkwNS0uOTA0YzAtLjUuNDA3LS45MDMuOTA2LS45MDMuNSAwIC45MDQuNDA0LjkwNC45MDR6IiBmaWxsPSIjNTc1RTc1Ii8+PC9nPjwvc3ZnPg==",
      };
    }
    costumeMenuFunction() {
      const myCostumes = runtime._editingTarget.sprite.costumes;

      let readCostumes = [];
      for (
        let curCostumeID = 0;
        curCostumeID < myCostumes.length;
        curCostumeID++
      ) {
        const currentCostume = myCostumes[curCostumeID].name;
        readCostumes.push(currentCostume);
      }

      const keys = Object.keys(penPlusCostumeLibrary);
      if (keys.length > 0) {
        for (let curCostumeID = 0; curCostumeID < keys.length; curCostumeID++) {
          const currentCostume = keys[curCostumeID];
          readCostumes.push(currentCostume);
        }
      }

      return readCostumes;
    }
    penPlusCostumesFunction() {
      const readCostumes = [];
      const keys = Object.keys(penPlusCostumeLibrary);
      if (keys.length > 0) {
        for (let curCostumeID = 0; curCostumeID < keys.length; curCostumeID++) {
          const currentCostume = keys[curCostumeID];
          readCostumes.push(currentCostume);
        }
        return readCostumes;
      }

      return ["no pen+ costumes!"];
    }
    isPenDown(args, util) {
      checkForPen(util);
      const curTarget = util.target;
      return curTarget["_customState"]["Scratch.pen"].penDown;
    }
    getPenHSV({ HSV }, util) {
      checkForPen(util);
      const curTarget = util.target;
      if (HSV == "size") {
        return curTarget["_customState"]["Scratch.pen"].penAttributes.diameter;
      }
      return curTarget["_customState"]["Scratch.pen"][HSV];
    }
    drawDot({ x, y }, util) {
      checkForPen(util);
      const curTarget = util.target;
      const attrib = curTarget["_customState"]["Scratch.pen"].penAttributes;

      curTarget.runtime.ext_pen.penDown(null, util);

      Scratch.vm.renderer.penPoint(
        Scratch.vm.renderer._penSkinId,
        attrib,
        x,
        y
      );

      curTarget.runtime.ext_pen.penUp(null, util);
    }
    drawLine({ x1, y1, x2, y2 }, util) {
      checkForPen(util);
      const curTarget = util.target;
      const attrib = curTarget["_customState"]["Scratch.pen"].penAttributes;

      curTarget.runtime.ext_pen.penDown(null, util);

      Scratch.vm.renderer.penLine(
        Scratch.vm.renderer._penSkinId,
        attrib,
        x1,
        y1,
        x2,
        y2
      );

      curTarget.runtime.ext_pen.penUp(null, util);
    }
    squareDown(arg, util) {
      //Just a simple thing to allow for pen drawing
      const curTarget = util.target;

      checkForPen(util);

      const attrib = curTarget["_customState"]["Scratch.pen"].penAttributes;
      const diam = attrib.diameter;

      nativeSize = renderer.useHighQualityRender
        ? [canvas.width, canvas.height]
        : renderer._nativeSize;

      lilPenDabble(nativeSize, curTarget, util); // Do this so the renderer doesn't scream at us

      if (
        typeof triangleAttributesOfAllSprites["squareStamp_" + curTarget.id] ==
        "undefined"
      ) {
        triangleAttributesOfAllSprites["squareStamp_" + curTarget.id] =
          triangleDefaultAttributes;
      }

      if (typeof squareAttributesOfAllSprites[curTarget.id] == "undefined") {
        squareAttributesOfAllSprites[curTarget.id] = squareDefaultAttributes;
      }

      const myAttributes = squareAttributesOfAllSprites[curTarget.id];

      //trying my best to reduce memory usage
      gl.viewport(0, 0, nativeSize[0], nativeSize[1]);
      const dWidth = 1 / nativeSize[0];
      const dHeight = 1 / nativeSize[1];

      const spritex = curTarget.x;
      const spritey = curTarget.y;

      //correction for HQ pen
      const typSize = renderer._nativeSize;
      const mul = renderer.useHighQualityRender
        ? 2 * ((canvas.width + canvas.height) / (typSize[0] + typSize[1]))
        : 2;

      //Predifine stuff so there aren't as many calculations
      const wMulX = mul * myAttributes[0];
      const wMulY = mul * myAttributes[1];

      const offDiam = 0.5 * diam;

      const sprXoff = spritex * mul;
      const sprYoff = spritey * mul;
      //Paratheses because I know some obscure browser will screw this up.
      let x1 = Scratch.Cast.toNumber(-offDiam) * wMulX;
      let x2 = Scratch.Cast.toNumber(offDiam) * wMulX;
      let x3 = Scratch.Cast.toNumber(offDiam) * wMulX;
      let x4 = Scratch.Cast.toNumber(-offDiam) * wMulX;

      let y1 = Scratch.Cast.toNumber(offDiam) * wMulY;
      let y2 = Scratch.Cast.toNumber(offDiam) * wMulY;
      let y3 = Scratch.Cast.toNumber(-offDiam) * wMulY;
      let y4 = Scratch.Cast.toNumber(-offDiam) * wMulY;

      function rotateTheThings(ox1, oy1, ox2, oy2, ox3, oy3, ox4, oy4) {
        let sin = Math.sin(myAttributes[2] * d2r);
        let cos = Math.cos(myAttributes[2] * d2r);

        x1 = ox1 * sin + oy1 * cos;
        y1 = ox1 * cos - oy1 * sin;

        x2 = ox2 * sin + oy2 * cos;
        y2 = ox2 * cos - oy2 * sin;

        x3 = ox3 * sin + oy3 * cos;
        y3 = ox3 * cos - oy3 * sin;

        x4 = ox4 * sin + oy4 * cos;
        y4 = ox4 * cos - oy4 * sin;
      }

      rotateTheThings(x1, y1, x2, y2, x3, y3, x4, y4);

      x1 += sprXoff;
      y1 += sprYoff;

      x2 += sprXoff;
      y2 += sprYoff;

      x3 += sprXoff;
      y3 += sprYoff;

      x4 += sprXoff;
      y4 += sprYoff;

      x1 *= dWidth;
      y1 *= dHeight;

      x2 *= dWidth;
      y2 *= dHeight;

      x3 *= dWidth;
      y3 *= dHeight;

      x4 *= dWidth;
      y4 *= dHeight;

      const Attribute_ID = "squareStamp_" + curTarget.id;

      triangleAttributesOfAllSprites[Attribute_ID][2] = myAttributes[7];
      triangleAttributesOfAllSprites[Attribute_ID][3] = myAttributes[8];
      triangleAttributesOfAllSprites[Attribute_ID][4] = myAttributes[9];
      triangleAttributesOfAllSprites[Attribute_ID][5] = myAttributes[11];
      triangleAttributesOfAllSprites[Attribute_ID][7] = myAttributes[10];
      triangleAttributesOfAllSprites[Attribute_ID][10] = myAttributes[7];
      triangleAttributesOfAllSprites[Attribute_ID][11] = myAttributes[8];
      triangleAttributesOfAllSprites[Attribute_ID][12] = myAttributes[9];
      triangleAttributesOfAllSprites[Attribute_ID][13] = myAttributes[11];
      triangleAttributesOfAllSprites[Attribute_ID][15] = myAttributes[10];
      triangleAttributesOfAllSprites[Attribute_ID][18] = myAttributes[7];
      triangleAttributesOfAllSprites[Attribute_ID][19] = myAttributes[8];
      triangleAttributesOfAllSprites[Attribute_ID][20] = myAttributes[9];
      triangleAttributesOfAllSprites[Attribute_ID][21] = myAttributes[11];
      triangleAttributesOfAllSprites[Attribute_ID][23] = myAttributes[10];

      triFunctions.drawTri(
        gl.getParameter(gl.CURRENT_PROGRAM),
        x1,
        y1,
        x2,
        y2,
        x3,
        y3,
        attrib.color4f,
        Attribute_ID
      );

      triFunctions.drawTri(
        gl.getParameter(gl.CURRENT_PROGRAM),
        x1,
        y1,
        x3,
        y3,
        x4,
        y4,
        attrib.color4f,
        Attribute_ID
      );
    }
    squareTexDown({ tex }, util) {
      //Just a simple thing to allow for pen drawing
      const curTarget = util.target;

      let currentTexture = null;
      if (penPlusCostumeLibrary[tex]) {
        currentTexture = penPlusCostumeLibrary[tex].texture;
      } else {
        const costIndex = curTarget.getCostumeIndexByName(
          Scratch.Cast.toString(tex)
        );
        if (costIndex >= 0) {
          const curCostume = curTarget.sprite.costumes_[costIndex];
          if (costIndex != curTarget.currentCostume) {
            curTarget.setCostume(costIndex);
          }

          currentTexture = renderer._allSkins[curCostume.skinId].getTexture();
        }
      }

      checkForPen(util);

      const attrib = curTarget["_customState"]["Scratch.pen"].penAttributes;
      const diam = attrib.diameter;

      nativeSize = renderer.useHighQualityRender
        ? [canvas.width, canvas.height]
        : renderer._nativeSize;

      lilPenDabble(nativeSize, curTarget, util); // Do this so the renderer doesn't scream at us

      if (!triangleAttributesOfAllSprites["squareStamp_" + curTarget.id]) {
        triangleAttributesOfAllSprites["squareStamp_" + curTarget.id] =
          triangleDefaultAttributes;
      }

      if (!squareAttributesOfAllSprites[curTarget.id]) {
        squareAttributesOfAllSprites[curTarget.id] = squareDefaultAttributes;
      }

      const myAttributes = squareAttributesOfAllSprites[curTarget.id];

      //trying my best to reduce memory usage
      gl.viewport(0, 0, nativeSize[0], nativeSize[1]);
      const dWidth = 1 / nativeSize[0];
      const dHeight = 1 / nativeSize[1];

      const spritex = curTarget.x;
      const spritey = curTarget.y;

      //correction for HQ pen
      const typSize = renderer._nativeSize;
      const mul = renderer.useHighQualityRender
        ? 2 * ((canvas.width + canvas.height) / (typSize[0] + typSize[1]))
        : 2;

      //Predifine stuff so there aren't as many calculations
      const wMulX = mul * myAttributes[0];
      const wMulY = mul * myAttributes[1];

      const offDiam = 0.5 * diam;

      const sprXoff = spritex * mul;
      const sprYoff = spritey * mul;
      //Paratheses because I know some obscure browser will screw this up.
      let x1 = Scratch.Cast.toNumber(-offDiam) * wMulX;
      let x2 = Scratch.Cast.toNumber(offDiam) * wMulX;
      let x3 = Scratch.Cast.toNumber(offDiam) * wMulX;
      let x4 = Scratch.Cast.toNumber(-offDiam) * wMulX;

      let y1 = Scratch.Cast.toNumber(offDiam) * wMulY;
      let y2 = Scratch.Cast.toNumber(offDiam) * wMulY;
      let y3 = Scratch.Cast.toNumber(-offDiam) * wMulY;
      let y4 = Scratch.Cast.toNumber(-offDiam) * wMulY;

      function rotateTheThings(ox1, oy1, ox2, oy2, ox3, oy3, ox4, oy4) {
        let sin = Math.sin(myAttributes[2] * d2r);
        let cos = Math.cos(myAttributes[2] * d2r);

        x1 = ox1 * sin + oy1 * cos;
        y1 = ox1 * cos - oy1 * sin;

        x2 = ox2 * sin + oy2 * cos;
        y2 = ox2 * cos - oy2 * sin;

        x3 = ox3 * sin + oy3 * cos;
        y3 = ox3 * cos - oy3 * sin;

        x4 = ox4 * sin + oy4 * cos;
        y4 = ox4 * cos - oy4 * sin;
      }

      rotateTheThings(x1, y1, x2, y2, x3, y3, x4, y4);

      x1 += sprXoff;
      y1 += sprYoff;

      x2 += sprXoff;
      y2 += sprYoff;

      x3 += sprXoff;
      y3 += sprYoff;

      x4 += sprXoff;
      y4 += sprYoff;

      x1 *= dWidth;
      y1 *= dHeight;

      x2 *= dWidth;
      y2 *= dHeight;

      x3 *= dWidth;
      y3 *= dHeight;

      x4 *= dWidth;
      y4 *= dHeight;

      if (currentTexture != null && typeof currentTexture != "undefined") {
        const Attribute_ID = "squareStamp_" + curTarget.id;
        triangleAttributesOfAllSprites[Attribute_ID][0] =
          (0 + myAttributes[4]) * myAttributes[3];
        triangleAttributesOfAllSprites[Attribute_ID][1] =
          (1 + myAttributes[6]) * myAttributes[5];

        triangleAttributesOfAllSprites[Attribute_ID][2] = myAttributes[7];
        triangleAttributesOfAllSprites[Attribute_ID][3] = myAttributes[8];
        triangleAttributesOfAllSprites[Attribute_ID][4] = myAttributes[9];
        triangleAttributesOfAllSprites[Attribute_ID][5] = myAttributes[11];
        triangleAttributesOfAllSprites[Attribute_ID][7] = myAttributes[10];

        triangleAttributesOfAllSprites[Attribute_ID][8] =
          (1 + myAttributes[4]) * myAttributes[3];
        triangleAttributesOfAllSprites[Attribute_ID][9] =
          (1 + myAttributes[6]) * myAttributes[5];

        triangleAttributesOfAllSprites[Attribute_ID][10] = myAttributes[7];
        triangleAttributesOfAllSprites[Attribute_ID][11] = myAttributes[8];
        triangleAttributesOfAllSprites[Attribute_ID][12] = myAttributes[9];
        triangleAttributesOfAllSprites[Attribute_ID][13] = myAttributes[11];
        triangleAttributesOfAllSprites[Attribute_ID][15] = myAttributes[10];

        triangleAttributesOfAllSprites[Attribute_ID][16] =
          (1 + myAttributes[4]) * myAttributes[3];
        triangleAttributesOfAllSprites[Attribute_ID][17] =
          (0 + myAttributes[6]) * myAttributes[5];

        triangleAttributesOfAllSprites[Attribute_ID][18] = myAttributes[7];
        triangleAttributesOfAllSprites[Attribute_ID][19] = myAttributes[8];
        triangleAttributesOfAllSprites[Attribute_ID][20] = myAttributes[9];
        triangleAttributesOfAllSprites[Attribute_ID][21] = myAttributes[11];
        triangleAttributesOfAllSprites[Attribute_ID][23] = myAttributes[10];

        triFunctions.drawTextTri(
          gl.getParameter(gl.CURRENT_PROGRAM),
          x1,
          y1,
          x2,
          y2,
          x3,
          y3,
          Attribute_ID,
          currentTexture
        );

        triangleAttributesOfAllSprites[Attribute_ID][0] =
          (0 + myAttributes[4]) * myAttributes[3];
        triangleAttributesOfAllSprites[Attribute_ID][1] =
          (1 + myAttributes[6]) * myAttributes[5];

        triangleAttributesOfAllSprites[Attribute_ID][8] =
          (1 + myAttributes[4]) * myAttributes[3];
        triangleAttributesOfAllSprites[Attribute_ID][9] =
          (0 + myAttributes[6]) * myAttributes[5];

        triangleAttributesOfAllSprites[Attribute_ID][16] =
          (0 + myAttributes[4]) * myAttributes[3];
        triangleAttributesOfAllSprites[Attribute_ID][17] =
          (0 + myAttributes[6]) * myAttributes[5];

        triFunctions.drawTextTri(
          gl.getParameter(gl.CURRENT_PROGRAM),
          x1,
          y1,
          x3,
          y3,
          x4,
          y4,
          Attribute_ID,
          currentTexture
        );
      }
    }
    setStampAttribute({ target, number }, util) {
      const curTarget = util.target;
      if (!squareAttributesOfAllSprites[curTarget.id]) {
        squareAttributesOfAllSprites[curTarget.id] = squareDefaultAttributes;
      }

      let valuetoSet = 0;

      const attributeNum = Scratch.Cast.toNumber(target);
      if (attributeNum >= 7) {
        if (attributeNum == 11) {
          if (penPlusAdvancedSettings._ClampZ) {
            Math.min(
              Math.max(number / penPlusAdvancedSettings._maxDepth, 0),
              1
            );
            return;
          }
          valuetoSet = number / penPlusAdvancedSettings._maxDepth;
          squareAttributesOfAllSprites[curTarget.id][attributeNum] =
            number / penPlusAdvancedSettings._maxDepth;
          return;
        }
        squareAttributesOfAllSprites[curTarget.id][attributeNum] =
          Math.min(Math.max(number, 0), 100) * 0.01;
        return;
      }
      squareAttributesOfAllSprites[curTarget.id][attributeNum] = number;
    }
    getStampAttribute({ target }, util) {
      const curTarget = util.target;
      if (!squareAttributesOfAllSprites[curTarget.id]) {
        squareAttributesOfAllSprites[curTarget.id] = squareDefaultAttributes;
      }

      return squareAttributesOfAllSprites[curTarget.id][
        Scratch.Cast.toNumber(target)
      ];
    }
    tintSquare({ color }, util) {
      const curTarget = util.target;

      if (!squareAttributesOfAllSprites[curTarget.id]) {
        squareAttributesOfAllSprites[curTarget.id] = squareDefaultAttributes;
      }

      const calcColor = colors.hexToRgb(color);

      squareAttributesOfAllSprites[curTarget.id][7] = calcColor.r / 255;
      squareAttributesOfAllSprites[curTarget.id][8] = calcColor.g / 255;
      squareAttributesOfAllSprites[curTarget.id][9] = calcColor.b / 255;
    }
    resetSquareAttributes(args, util) {
      const curTarget = util.target;
      squareAttributesOfAllSprites[curTarget.id] = [
        1, 1, 90, 1, 0, 1, 0, 1, 1, 1, 1, 0,
      ];
    }
    setTriangleFilterMode({ filter }) {
      currentFilter = filter;
    }
    setTrianglePointAttribute({ point, attribute, value }, util) {
      const trianglePointStart = (point - 1) * 8;

      const targetId = util.target.id;

      if (!triangleAttributesOfAllSprites[targetId]) {
        triangleAttributesOfAllSprites[targetId] = triangleDefaultAttributes;
      }
      triFunctions.setValueAccordingToCaseTriangle(
        targetId,
        Scratch.Cast.toNumber(attribute),
        value,
        false,
        trianglePointStart
      );
    }
    setWholeTrianglePointAttribute({ wholeAttribute, value }, util) {
      const targetId = util.target.id;

      if (!triangleAttributesOfAllSprites[targetId]) {
        triangleAttributesOfAllSprites[targetId] = triangleDefaultAttributes;
      }
      triFunctions.setValueAccordingToCaseTriangle(
        targetId,
        Scratch.Cast.toNumber(wholeAttribute),
        value,
        true,
        0
      );
    }
    tintTriPoint({ point, color }, util) {
      const curTarget = util.target;

      const trianglePointStart = (point - 1) * 8;

      const targetId = util.target.id;

      if (!triangleAttributesOfAllSprites[targetId]) {
        triangleAttributesOfAllSprites[targetId] = triangleDefaultAttributes;
      }

      const calcColor = colors.hexToRgb(color);

      triFunctions.setValueAccordingToCaseTriangle(
        targetId,
        2,
        calcColor.r / 2.55,
        false,
        trianglePointStart
      );

      triFunctions.setValueAccordingToCaseTriangle(
        targetId,
        3,
        calcColor.g / 2.55,
        false,
        trianglePointStart
      );

      triFunctions.setValueAccordingToCaseTriangle(
        targetId,
        4,
        calcColor.b / 2.55,
        false,
        trianglePointStart
      );
    }
    tintTri({ point, color }, util) {
      const curTarget = util.target;

      const trianglePointStart = (point - 1) * 8;

      const targetId = util.target.id;

      if (!triangleAttributesOfAllSprites[targetId]) {
        triangleAttributesOfAllSprites[targetId] = triangleDefaultAttributes;
      }

      const calcColor = colors.hexToRgb(color);

      triFunctions.setValueAccordingToCaseTriangle(
        targetId,
        2,
        calcColor.r / 2.55,
        true,
        trianglePointStart
      );

      triFunctions.setValueAccordingToCaseTriangle(
        targetId,
        3,
        calcColor.g / 2.55,
        true,
        trianglePointStart
      );

      triFunctions.setValueAccordingToCaseTriangle(
        targetId,
        4,
        calcColor.b / 2.55,
        true,
        trianglePointStart
      );
    }
    getTrianglePointAttribute({ point, attribute }, util) {
      const trianglePointStart = (point - 1) * 8;

      const targetId = util.target.id;

      if (!triangleAttributesOfAllSprites[targetId]) {
        triangleAttributesOfAllSprites[targetId] = triangleDefaultAttributes;
      }
      let value =
        triangleAttributesOfAllSprites[targetId][
          trianglePointStart + attribute
        ];

      if ((attribute >= 2 && attribute <= 4) || attribute == 7) {
        value *= 100;
      }
      return value;
    }
    resetWholeTriangleAttributes(args, util) {
      const targetId = util.target.id;
      triangleAttributesOfAllSprites[targetId] = [
        0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1,
        1, 1, 1,
      ];
    }
    drawSolidTri({ x1, y1, x2, y2, x3, y3 }, util) {
      const curTarget = util.target;
      checkForPen(util);
      const attrib = curTarget["_customState"]["Scratch.pen"].penAttributes;

      nativeSize = renderer.useHighQualityRender
        ? [canvas.width, canvas.height]
        : renderer._nativeSize;

      //if (triangleAttributesOfAllSprites[curTarget.id]) {
      //  triangleAttributesOfAllSprites[curTarget.id][5] = 1;
      //  triangleAttributesOfAllSprites[curTarget.id][13] = 1;
      //  triangleAttributesOfAllSprites[curTarget.id][21] = 1;
      //}

      //?Renderer Freaks out if we don't do this so do it.
      lilPenDabble(nativeSize, curTarget, util); // Do this so the renderer doesn't scream at us

      //trying my best to reduce memory usage
      gl.viewport(0, 0, nativeSize[0], nativeSize[1]);
      const dWidth = 1 / nativeSize[0];
      const dHeight = 1 / nativeSize[1];

      //correction for HQ pen
      const typSize = renderer._nativeSize;
      const mul = renderer.useHighQualityRender
        ? 2 * ((canvas.width + canvas.height) / (typSize[0] + typSize[1]))
        : 2;
      //Paratheses because I know some obscure browser will screw this up.
      x1 = Scratch.Cast.toNumber(x1) * dWidth * mul;
      x2 = Scratch.Cast.toNumber(x2) * dWidth * mul;
      x3 = Scratch.Cast.toNumber(x3) * dWidth * mul;

      y1 = Scratch.Cast.toNumber(y1) * dHeight * mul;
      y2 = Scratch.Cast.toNumber(y2) * dHeight * mul;
      y3 = Scratch.Cast.toNumber(y3) * dHeight * mul;

      triFunctions.drawTri(
        gl.getParameter(gl.CURRENT_PROGRAM),
        x1,
        y1,
        x2,
        y2,
        x3,
        y3,
        attrib.color4f,
        curTarget.id
      );
    }
    drawTexTri({ x1, y1, x2, y2, x3, y3, tex }, util) {
      const curTarget = util.target;
      let currentTexture = null;
      if (penPlusCostumeLibrary[tex]) {
        currentTexture = penPlusCostumeLibrary[tex].texture;
      } else {
        const costIndex = curTarget.getCostumeIndexByName(
          Scratch.Cast.toString(tex)
        );
        if (costIndex >= 0) {
          const curCostume = curTarget.sprite.costumes_[costIndex];
          if (costIndex != curTarget.currentCostume) {
            curTarget.setCostume(costIndex);
          }

          currentTexture = renderer._allSkins[curCostume.skinId].getTexture();
        }
      }

      nativeSize = renderer.useHighQualityRender
        ? [canvas.width, canvas.height]
        : renderer._nativeSize;

      //?Renderer Freaks out if we don't do this so do it.
      lilPenDabble(nativeSize, curTarget, util); // Do this so the renderer doesn't scream at us

      //trying my best to reduce memory usage
      gl.viewport(0, 0, nativeSize[0], nativeSize[1]);
      const dWidth = 1 / nativeSize[0];
      const dHeight = 1 / nativeSize[1];

      //correction for HQ pen
      const typSize = renderer._nativeSize;
      const mul = renderer.useHighQualityRender
        ? 2 * ((canvas.width + canvas.height) / (typSize[0] + typSize[1]))
        : 2;
      //Paratheses because I know some obscure browser will screw this up.
      x1 = Scratch.Cast.toNumber(x1) * dWidth * mul;
      x2 = Scratch.Cast.toNumber(x2) * dWidth * mul;
      x3 = Scratch.Cast.toNumber(x3) * dWidth * mul;

      y1 = Scratch.Cast.toNumber(y1) * dHeight * mul;
      y2 = Scratch.Cast.toNumber(y2) * dHeight * mul;
      y3 = Scratch.Cast.toNumber(y3) * dHeight * mul;

      if (currentTexture != null && typeof currentTexture != "undefined") {
        triFunctions.drawTextTri(
          gl.getParameter(gl.CURRENT_PROGRAM),
          x1,
          y1,
          x2,
          y2,
          x3,
          y3,
          curTarget.id,
          currentTexture
        );
      }
    }
    RGB2HEX({ R, G, B }) {
      return colors.rgbtoSColor({ R: R, G: G, B: B });
    }
    HSV2RGB({ H, S, V }) {
      S = S / 100;
      V = V / 100;
      S = Math.min(Math.max(S, 0), 1);
      V = Math.min(Math.max(V, 0), 1);
      H = H % 360;
      const C = V * S;
      const X = C * (1 - Math.abs(((H / 60) % 2) - 1));
      const M = V - C;
      let Primes = [0, 0, 0];
      if (H >= 0 && H < 60) {
        Primes[0] = C;
        Primes[1] = X;
      } else if (H >= 60 && H < 120) {
        Primes[0] = X;
        Primes[1] = C;
      } else if (H >= 120 && H < 180) {
        Primes[1] = C;
        Primes[2] = X;
      } else if (H >= 180 && H < 240) {
        Primes[1] = X;
        Primes[2] = C;
      } else if (H >= 240 && H < 300) {
        Primes[0] = X;
        Primes[2] = C;
      }
      if (H >= 300 && H < 360) {
        Primes[0] = C;
        Primes[2] = X;
      }
      Primes[0] = (Primes[0] + M) * 255;
      Primes[1] = (Primes[1] + M) * 255;
      Primes[2] = (Primes[2] + M) * 255;
      return colors.rgbtoSColor({
        R: Primes[0] / 2.55,
        G: Primes[1] / 2.55,
        B: Primes[2] / 2.55,
      });
    }
    setDURIclampmode({ clampMode }) {
      penPlusImportWrapMode = clampMode;
    }
    addBlankIMG({ color, width, height, name }) {
      //Just a simple thing to allow for pen drawing
      textureFunctions.createBlankPenPlusTextureInfo(
        width,
        height,
        color,
        "!" + name,
        penPlusImportWrapMode
      );
    }
    addIMGfromDURI({ dataURI, name }) {
      //Just a simple thing to allow for pen drawing
      textureFunctions.createPenPlusTextureInfo(
        dataURI,
        "!" + name,
        penPlusImportWrapMode
      );
    }
    removeIMGfromDURI({ name }, util) {
      //Just a simple thing to allow for pen drawing
      if (penPlusCostumeLibrary["!" + name]) {
        delete penPlusCostumeLibrary["!" + name];
      }
    }
    doesIMGexist({ name }, util) {
      //Just a simple thing to allow for pen drawing
      return typeof penPlusCostumeLibrary["!" + name] != "undefined";
    }
    getCostumeDataURI({ costume }, util) {
      //Just a simple thing to allow for pen drawing
      const curTarget = util.target;
      const costIndex = curTarget.getCostumeIndexByName(
        Scratch.Cast.toString(costume)
      );
      if (costIndex >= 0) {
        const curCostume =
          curTarget.sprite.costumes_[costIndex].asset.encodeDataURI();
        return curCostume;
      }
    }
    getCostumeDataURI_costume_MenuFunction() {
      const myCostumes = runtime._editingTarget.sprite.costumes;

      let readCostumes = [];
      for (
        let curCostumeID = 0;
        curCostumeID < myCostumes.length;
        curCostumeID++
      ) {
        const currentCostume = myCostumes[curCostumeID].name;
        readCostumes.push(currentCostume);
      }

      return readCostumes;
    }
    getDimensionOf({ dimension, costume }, util) {
      //Just a simple thing to allow for pen drawing
      const costIndex = penPlusCostumeLibrary[costume];
      if (costIndex) {
        return costIndex[dimension];
      }
    }
    setpixelcolor({ x, y, color, costume }) {
      const curCostume = penPlusCostumeLibrary[costume];
      if (curCostume) {
        const textureData = textureFunctions.getTextureData(
          curCostume.texture,
          curCostume.width,
          curCostume.height
        );
        if (textureData) {
          x = Math.floor(x - 1);
          y = Math.floor(y - 1);
          const colorIndex = (y * curCostume.width + x) * 4;
          if (
            textureData[colorIndex] != undefined &&
            x < curCostume.width &&
            x >= 0
          ) {
            const retColor = colors.hexToRgb(color);
            textureData[colorIndex] = retColor.r;
            textureData[colorIndex + 1] = retColor.g;
            textureData[colorIndex + 2] = retColor.b;
            textureData[colorIndex + 3] = 255;

            gl.bindTexture(gl.TEXTURE_2D, curCostume.texture);
            gl.texImage2D(
              gl.TEXTURE_2D,
              0,
              gl.RGBA,
              curCostume.width,
              curCostume.height,
              0,
              gl.RGBA,
              gl.UNSIGNED_BYTE,
              textureData
            );
          }
        }
      }
    }
    getpixelcolor({ x, y, costume }) {
      const curCostume = penPlusCostumeLibrary[costume];
      if (curCostume) {
        const textureData = textureFunctions.getTextureData(
          curCostume.texture,
          curCostume.width,
          curCostume.height
        );
        if (textureData) {
          x = Math.floor(x - 1);
          y = Math.floor(y - 1);
          const colorIndex = (y * curCostume.width + x) * 4;
          if (textureData[colorIndex] && x < curCostume.width && x >= 0) {
            return colors.rgbtoSColor({
              R: textureData[colorIndex] / 2.55,
              G: textureData[colorIndex + 1] / 2.55,
              B: textureData[colorIndex + 2] / 2.55,
            });
          }
          return colors.rgbtoSColor({ R: 100, G: 100, B: 100 });
        }
      }
    }
    getPenPlusCostumeURI({ costume }) {
      const curCostume = penPlusCostumeLibrary[costume];
      if (curCostume) {
        const textureData = textureFunctions.getTextureAsURI(
          curCostume.texture,
          curCostume.width,
          curCostume.height
        );
        if (textureData) {
          return textureData;
        }
        return "";
      }
    }
    turnAdvancedSettingOff({ Setting, onOrOff }) {
      if (onOrOff == "on") {
        penPlusAdvancedSettings[Setting] = true;
        return;
      }
      penPlusAdvancedSettings[Setting] = false;
    }
    setAdvancedOptionValueTo({ setting, value }) {
      switch (setting) {
        case "depthMax":
          penPlusAdvancedSettings._maxDepth = Math.max(value, 100);
          break;

        default:
          break;
      }
    }
    runtime = Scratch.vm.runtime;
  }

  //? A small hack to stop the renderer from immediatly dying. And to allow for immediate use
  {
    if (!Scratch.vm.renderer._penSkinId) {
      window.vm.renderer.createPenSkin();
    }
    renderer.penClear(Scratch.vm.renderer._penSkinId);
    Scratch.vm.renderer.penLine(
      Scratch.vm.renderer._penSkinId,
      {
        color4f: [0, 0, 1, 1],
        diameter: 1,
      },
      0,
      0,
      0,
      0
    );

    penPlusShaders.pen.program = shaderManager._shaderCache.line[0].program;
  }

  Scratch.extensions.register(new extension());
})(Scratch);
