// Name: Pen Plus V6
// ID: penP
// Description: Advanced rendering capabilities.
// By: ObviousAlexC <https://scratch.mit.edu/users/pinksheep2917/>
// License: MIT

(function (Scratch) {
  "use strict";

  //?some smaller optimizations just store the multiplacation for later
  const f32_4 = 4 * Float32Array.BYTES_PER_ELEMENT;
  const f32_6 = 6 * Float32Array.BYTES_PER_ELEMENT;
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
  const triFrameBuffer = gl.createFramebuffer();
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

    gl.bindFramebuffer(gl.FRAMEBUFFER, triFrameBuffer);

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

    let resizeCall = false;

    const updateCanvasSize = () => {
      nativeSize = renderer.useHighQualityRender
        ? [canvas.width, canvas.height]
        : renderer._nativeSize;

      lastFB = gl.getParameter(gl.FRAMEBUFFER_BINDING);

      gl.bindFramebuffer(gl.FRAMEBUFFER, triFrameBuffer);

      gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
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

    //?Call every frame because I don't know of a way to detect when the stage is resized through window resizing (2/7/24) thought I should clarify

    window.addEventListener("resize", updateCanvasSize);
    vm.runtime.on("STAGE_SIZE_CHANGED", () => {
      updateCanvasSize();
      resizeCall = true;
    });

    //Turbowarp
    vm.runtime.on("BEFORE_EXECUTE", () => {
      let calcSize = renderer.useHighQualityRender
        ? [canvas.width, canvas.height]
        : renderer._nativeSize;
      if (calcSize[0] != nativeSize[0] || calcSize[1] != nativeSize[1]) {
        nativeSize = renderer.useHighQualityRender
          ? [canvas.width, canvas.height]
          : renderer._nativeSize;
        updateCanvasSize();
      }

      if (resizeCall) {
        nativeSize = renderer.useHighQualityRender
          ? [canvas.width, canvas.height]
          : renderer._nativeSize;
        updateCanvasSize();
        resizeCall = false;
      }
    });

    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);

    //?Make sure pen is loaded!
    if (!Scratch.vm.extensionManager.isExtensionLoaded("pen")) {
      runtime.extensionManager.loadExtensionIdSync("pen");
    }
  }
  let penPlusImportWrapMode = gl.CLAMP_TO_EDGE;

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

  //?Get Shaders
  const penPlusShaders = {
    untextured: {
      Shaders: {
        vert: `
                    attribute highp vec4 a_position;
                    attribute highp vec4 a_color;
                    varying highp vec4 v_color;
                    
                    void main()
                    {
                        v_color = a_color;
                        gl_Position = a_position * vec4(a_position.w,a_position.w,-1.0/a_position.w,1);
                    }
                `,
        frag: `
                    varying highp vec4 v_color;
    
                    void main()
                    {
                      gl_FragColor = v_color;
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
                    
                    void main()
                    {
                        v_color = a_color;
                        v_texCoord = a_texCoord;
                        gl_Position = a_position * vec4(a_position.w,a_position.w,-1.0/a_position.w,1);
                    }
                `,
        frag: `
                    uniform sampler2D u_texture;
    
                    varying highp vec2 v_texCoord;
                    varying highp vec4 v_color;
                    
                    void main()
                    {
                        gl_FragColor = texture2D(u_texture, v_texCoord) * v_color;
                        gl_FragColor.rgb *= gl_FragColor.a;
                        
                    }
                `,
      },
      ProgramInf: null,
    },
    draw: {
      Shaders: {
        vert: `
                    attribute highp vec4 a_position;
    
                    varying highp vec2 v_texCoord;
                    attribute highp vec2 a_texCoord;
                    
                    void main()
                    {
                        gl_Position = a_position * vec4(a_position.w,a_position.w,0,1);
                        v_texCoord = (a_position.xy / 2.0) + vec2(0.5,0.5);
                    }
                `,
        frag: `
                    varying highp vec2 v_texCoord;
    
                    uniform sampler2D u_drawTex;
                    
                    void main()
                    {
                      gl_FragColor = texture2D(u_drawTex, v_texCoord);
                      gl_FragColor.rgb *= gl_FragColor.a;
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

    penPlusShaders.draw.ProgramInf = penPlusShaders.createAndCompileShaders(
      penPlusShaders.draw.Shaders.vert,
      penPlusShaders.draw.Shaders.frag
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

  //?Depth
  const u_depthTexture_Location_draw = gl.getUniformLocation(
    penPlusShaders.draw.ProgramInf.program,
    "u_drawTex"
  );

  const a_position_Location_draw = gl.getAttribLocation(
    penPlusShaders.draw.ProgramInf.program,
    "a_position"
  );

  const a_textCoord_Location_draw = gl.getAttribLocation(
    penPlusShaders.textured.ProgramInf.program,
    "a_texCoord"
  );

  //?Enables Attributes
  const vertexBuffer = gl.createBuffer();
  const depthVertexBuffer = gl.createBuffer();
  let vertexBufferData = null;

  let parentExtension = null;

  {
    gl.enableVertexAttribArray(a_position_Location_untext);
    gl.enableVertexAttribArray(a_color_Location_untext);
    gl.enableVertexAttribArray(a_position_Location_text);
    gl.enableVertexAttribArray(a_color_Location_text);
    gl.enableVertexAttribArray(a_textCoord_Location_text);
    gl.enableVertexAttribArray(a_position_Location_draw);
    gl.enableVertexAttribArray(a_textCoord_Location_draw);
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
    gl.bindFramebuffer(gl.FRAMEBUFFER, triFrameBuffer);
    gl.clearColor(0, 0, 0, 0);
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

  class extension {
    //?Stores our attributes
    triangleAttributesOfAllSprites = {};
    squareAttributesOfAllSprites = {};
      
    penPlusCostumeLibrary = {};
    penPlusCubemap = {};

    attributeEditors = {
      triangle: (targetId, attribute, value, wholeTri, offset) => {
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
            if (this.AdvancedSettings._ClampZ) {
              if (value < 0) {
                valuetoSet = 0;
                break;
              }
              //convert to depth space for best accuracy
              valuetoSet = value;
              break;
            }
            //convert to depth space for best accuracy
            valuetoSet = value;
            break;

          //Clamp to 1 so we don't accidentally clip.
          //W
          case 6:
            if (this.AdvancedSettings.wValueUnderFlow == true) {
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
            this.triangleAttributesOfAllSprites[targetId][attribute] =
              valuetoSet;
            this.triangleAttributesOfAllSprites[targetId][attribute + 8] =
              valuetoSet;
            this.triangleAttributesOfAllSprites[targetId][attribute + 16] =
              valuetoSet;
          } else {
            this.triangleAttributesOfAllSprites[targetId][offset] = valuetoSet;
          }
        }
      },
    };

    //?Our functions that allow for extra rendering things.
    renderFunctions = {
      drawTri: (x1, y1, x2, y2, x3, y3, penColor, targetID) => {
        if (!this.inDrawRegion)
          renderer.enterDrawRegion(this.penPlusDrawRegion);
        this.trianglesDrawn += 1;
        //? get triangle attributes for current sprite.
        const triAttribs = this.triangleAttributesOfAllSprites[targetID];

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

        gl.drawArrays(gl.TRIANGLES, 0, 3);
      },

      drawTextTri: (x1, y1, x2, y2, x3, y3, targetID, texture) => {
        if (!this.inDrawRegion)
          renderer.enterDrawRegion(this.penPlusDrawRegion);
        this.trianglesDrawn += 1;
        //? get triangle attributes for current sprite.
        const triAttribs = this.triangleAttributesOfAllSprites[targetID];
        if (triAttribs) {
          vertexBufferData = new Float32Array([
            x1,
            -y1,
            this.AdvancedSettings.useDepthBuffer ? triAttribs[5] : 0,
            triAttribs[6],
            triAttribs[2],
            triAttribs[3],
            triAttribs[4],
            triAttribs[7],
            triAttribs[0],
            triAttribs[1],

            x2,
            -y2,
            this.AdvancedSettings.useDepthBuffer ? triAttribs[13] : 0,
            triAttribs[14],
            triAttribs[10],
            triAttribs[11],
            triAttribs[12],
            triAttribs[15],
            triAttribs[8],
            triAttribs[9],

            x3,
            -y3,
            this.AdvancedSettings.useDepthBuffer ? triAttribs[21] : 0,
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

        gl.drawArrays(gl.TRIANGLES, 0, 3);
      },

      //? this is so I don't have to go through the hassle of replacing default scratch shaders
      //? many of curse words where exchanged between me and a pillow while writing this extension
      //? but I have previaled!
      reRenderPenLayer: () => {
        gl.viewport(0, 0, nativeSize[0], nativeSize[1]);
        vertexBufferData = new Float32Array([
          -1, -1, 0, 1, 0, 1,

          1, -1, 0, 1, 1, 1,

          1, 1, 0, 1, 1, 0,

          -1, -1, 0, 1, 0, 1,

          -1, 1, 0, 1, 0, 0,

          1, 1, 0, 1, 1, 0,
        ]);

        //? Bind Positional Data
        gl.bindBuffer(gl.ARRAY_BUFFER, depthVertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertexBufferData, gl.DYNAMIC_DRAW);

        gl.vertexAttribPointer(
          a_position_Location_draw,
          4,
          gl.FLOAT,
          false,
          f32_6,
          0
        );
        gl.vertexAttribPointer(
          a_textCoord_Location_draw,
          2,
          gl.FLOAT,
          false,
          f32_6,
          f32_4
        );

        gl.useProgram(penPlusShaders.draw.ProgramInf.program);

        gl.uniform1i(u_depthTexture_Location_draw, 1);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
        gl.bindFramebuffer(gl.FRAMEBUFFER, lastFB);
      },
    };

    //?The Draw region! extra cool!
    penPlusDrawRegion = {
      enter: () => {
        this.trianglesDrawn = 0;
        this.inDrawRegion = true;
        gl.bindFramebuffer(gl.FRAMEBUFFER, triFrameBuffer);
        gl.viewport(0, 0, nativeSize[0], nativeSize[1]);
        renderer.dirty = true;
      },
      exit: () => {
        this.inDrawRegion = false;
        gl.bindFramebuffer(
          gl.FRAMEBUFFER,
          renderer._allSkins[renderer._penSkinId]._framebuffer.framebuffer
        );

        this.renderFunctions.reRenderPenLayer();

        //Quick clear the pen+ frame buffer
        gl.bindFramebuffer(gl.FRAMEBUFFER, triFrameBuffer);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.bindFramebuffer(
          gl.FRAMEBUFFER,
          renderer._allSkins[renderer._penSkinId]._framebuffer.framebuffer
        );
        gl.useProgram(penPlusShaders.pen.program);
      },
    };

    //?The neat color library I made
    colorLib = {
      hexToRgb: (hex) => {
        if (typeof hex == "string") {
          const splitHex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(
            hex
          );
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

    //?Just some advanced settings
    AdvancedSettings = {
      wValueUnderFlow: false,
      useDepthBuffer: true,
      _ClampZ: false,
      _maxDepth: 1000,
    };

    textureFunctions = {
      createBlankPenPlusTextureInfo: function (
        width,
        height,
        color,
        name,
        clamp
      ) {
        const texture = parentExtension.penPlusCostumeLibrary[name]
          ? parentExtension.penPlusCostumeLibrary[name].texture
          : gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        // Fill the texture with a 1x1 blue pixel.

        const pixelData = new Uint8Array(width * height * 4);

        const decodedColor = Scratch.Cast.toRgbColorObject(color);

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

        parentExtension.penPlusCostumeLibrary[name] = {
          texture: texture,
          width: width,
          height: height,
        };
      },
      createPenPlusTextureInfo: function (url, name, clamp) {
        const texture = parentExtension.penPlusCostumeLibrary[name]
          ? parentExtension.penPlusCostumeLibrary[name].texture
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
              parentExtension.penPlusCostumeLibrary[name] = {
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

    //Statistical Stuff
    trianglesDrawn = 0;
    inDrawRegion = false;

    IFrame = undefined;

    constructor() {
      window.addEventListener("message", (event) => {
        let eventType = event.data.type;

        if (!eventType) return;

        switch (eventType) {
          case "EDITOR_CLOSE":
            this.IFrame.closeIframe();
            break;

          case "DATA_SEND":
            this.openShaderManager("save");
            this.savingData = {
              projectData: event.data.projectData,
              fragShader: event.data.fragShader,
              vertShader: event.data.vertShader,
            };
            break;

          default:
            break;
        }
      });

      parentExtension = this;

      vm.runtime.on("PROJECT_LOADED", this.setupExtensionStorage);
      this.setupExtensionStorage();

      this._setupTheme();
    }

    //Stolen from lily :3
    setupExtensionStorage() {
      //Penguinmod saving support
      if (Scratch.extensions.isPenguinMod) {
        this.serialize = () => {
          return JSON.stringify(this.shaders);
        };

        this.deserialize = (serialized) => {
          this.shaders = JSON.parse(serialized);
        };

        this.shaders = {};

        //Doing this to remedy the janky turbowarp saving system.
        this.getShaders = () => {
          return this.shaders;
        };
      } else {
        if (!runtime.extensionStorage["penP"]) {
          runtime.extensionStorage["penP"] = Object.create(null);
          runtime.extensionStorage["penP"].shaders = Object.create(null);
        }

        //For some reason tw saving just doesn't work lol
        this.shaders = runtime.extensionStorage["penP"].shaders;

        //Remedy for the turbowarp saving system being jank.
        this.getShaders = () => {
          this.shaders = runtime.extensionStorage["penP"].shaders;
          return runtime.extensionStorage["penP"].shaders;
        };
      }

      this.savingData = {
        projectData: undefined,
        fragShader: undefined,
        vertShader: undefined,
      };
    }

    saveShader(name, data) {
      //Create data in the json object
      this.shaders[name] = {
        projectData: data,
        modifyDate: Date.now(),
      };
    }

    deleteShader(name) {
      //Create data in the json object
      delete this.shaders[name];
    }

    getInfo() {
      return {
        blocks: [
          {
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
          /*
          //* there is a good reason I hid these.
          //* they are buggy
          {
            blockType: Scratch.BlockType.LABEL,
            text: "Square Pen Blocks",
          },
          */
          {
            disableMonitor: true,
            opcode: "squareDown",
            blockType: Scratch.BlockType.COMMAND,
            text: "stamp pen square",
            arguments: {},
            filter: "sprite",
            hideFromPalette: true,
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
            hideFromPalette: true,
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
            hideFromPalette: true,
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
            hideFromPalette: true,
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
            hideFromPalette: true,
          },
          {
            disableMonitor: true,
            opcode: "resetSquareAttributes",
            blockType: Scratch.BlockType.COMMAND,
            text: "reset square Attributes",
            arguments: {},
            filter: "sprite",
            hideFromPalette: true,
          },
          //End of hidden blocks
          {
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
            blockType: Scratch.BlockType.LABEL,
            text: "Advanced",
          },
          {
            blockType: Scratch.BlockType.BUTTON,
            func: "openShaderEditor",
            text: "Shader Editor",
          },
          {
            blockType: Scratch.BlockType.BUTTON,
            func: "openShaderManager",
            text: "Shader Manager",
          },
          {
            blockType: Scratch.BlockType.REPORTER,
            opcode: "getAllShaders",
            text: "shaders in project",
          },
          {
            disableMonitor: true,
            opcode: "drawShaderTri",
            blockType: Scratch.BlockType.COMMAND,
            text: "draw triangle using [shader] between [x1] [y1], [x2] [y2] and [x3] [y3]",
            arguments: {
              shader: {type: Scratch.ArgumentType.STRING, menu: "penPlusShaders"},
              x1: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              y1: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              x2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
              y2: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
              x3: { type: Scratch.ArgumentType.NUMBER, defaultValue: 10 },
              y3: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
            },
            filter: "sprite",
          },
          "---",
          {
            opcode: "setTextureInShader",
            blockType: Scratch.BlockType.COMMAND,
            text: "set texture [uniformName] in [shader] to [texture]",
            arguments: {
              uniformName: { type: Scratch.ArgumentType.STRING, defaultValue: "Uniform" },
              shader: {type: Scratch.ArgumentType.STRING, menu: "penPlusShaders"},
              texture: { type: Scratch.ArgumentType.STRING, menu: "costumeMenu" }
            },
            filter: "sprite",
          },
          {
            opcode: "setNumberInShader",
            blockType: Scratch.BlockType.COMMAND,
            text: "set number [uniformName] in [shader] to [number]",
            arguments: {
              uniformName: { type: Scratch.ArgumentType.STRING, defaultValue: "Uniform" },
              shader: {type: Scratch.ArgumentType.STRING, menu: "penPlusShaders"},
              number: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            },
            filter: "sprite",
          },
          {
            opcode: "setVec2InShader",
            blockType: Scratch.BlockType.COMMAND,
            text: "set vector 2 [uniformName] in [shader] to [numberX] [numberY]",
            arguments: {
              uniformName: { type: Scratch.ArgumentType.STRING, defaultValue: "Uniform" },
              shader: {type: Scratch.ArgumentType.STRING, menu: "penPlusShaders"},
              numberX: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              numberY: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            },
            filter: "sprite",
          },
          {
            opcode: "setVec3InShader",
            blockType: Scratch.BlockType.COMMAND,
            text: "set vector 3 [uniformName] in [shader] to [numberX] [numberY] [numberZ]",
            arguments: {
              uniformName: { type: Scratch.ArgumentType.STRING, defaultValue: "Uniform" },
              shader: {type: Scratch.ArgumentType.STRING, menu: "penPlusShaders"},
              numberX: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              numberY: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              numberZ: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            },
            filter: "sprite",
          },
          {
            opcode: "setVec4InShader",
            blockType: Scratch.BlockType.COMMAND,
            text: "set vector 4 [uniformName] in [shader] to [numberX] [numberY] [numberZ] [numberW]",
            arguments: {
              uniformName: { type: Scratch.ArgumentType.STRING, defaultValue: "Uniform" },
              shader: {type: Scratch.ArgumentType.STRING, menu: "penPlusShaders"},
              numberX: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              numberY: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              numberZ: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 },
              numberW: { type: Scratch.ArgumentType.NUMBER, defaultValue: 0 }
            },
            filter: "sprite",
          },
          {
            opcode: "setMatrixInShader",
            blockType: Scratch.BlockType.COMMAND,
            text: "set matrix [uniformName] in [shader] to [list]",
            arguments: {
              uniformName: { type: Scratch.ArgumentType.STRING, defaultValue: "Uniform" },
              shader: {type: Scratch.ArgumentType.STRING, menu: "penPlusShaders"},
              list: { type: Scratch.ArgumentType.STRING, menu: "listMenu"}
            },
            filter: "sprite",
          },
          {
            opcode: "setMatrixInShaderArray",
            blockType: Scratch.BlockType.COMMAND,
            text: "set matrix [uniformName] in [shader] to [array]",
            arguments: {
              uniformName: { type: Scratch.ArgumentType.STRING, defaultValue: "Uniform" },
              shader: {type: Scratch.ArgumentType.STRING, menu: "penPlusShaders"},
              array: { type: Scratch.ArgumentType.STRING, defaultValue: "[0,0,0,0]"}
            },
            filter: "sprite",
          },
          {
            opcode: "setCubeInShader",
            blockType: Scratch.BlockType.COMMAND,
            text: "set cubemap [uniformName] in [shader] to [cubemap]",
            arguments: {
              uniformName: { type: Scratch.ArgumentType.STRING, defaultValue: "Uniform" },
              shader: {type: Scratch.ArgumentType.STRING, menu: "penPlusShaders"},
              cubemap: { type: Scratch.ArgumentType.STRING, menu: "penPlusCubemaps"}
            },
            filter: "sprite",
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: "Cubemaps"
          },
          {
            opcode:"createCubemap",
            blockType: Scratch.BlockType.COMMAND,
            text: "create cubemap named [name] from left [left] right [right] back [back] front [front] bottom [bottom] top [top]",
            arguments: {
              name: { type: Scratch.ArgumentType.STRING, defaultValue: "Name" },
              left: {type: Scratch.ArgumentType.STRING, menu: "costumeMenu"},
              right: {type: Scratch.ArgumentType.STRING, menu: "costumeMenu"},
              back: {type: Scratch.ArgumentType.STRING, menu: "costumeMenu"},
              front: {type: Scratch.ArgumentType.STRING, menu: "costumeMenu"},
              bottom: {type: Scratch.ArgumentType.STRING, menu: "costumeMenu"},
              top: {type: Scratch.ArgumentType.STRING, menu: "costumeMenu"},
            },
            filter: "sprite",
          },
          {
            blockType: Scratch.BlockType.LABEL,
            text: "Extras",
          },
          {
            opcode: "getTrianglesDrawn",
            blockType: Scratch.BlockType.REPORTER,
            text: "Triangles Drawn",
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
          penPlusShaders: {
            items: "shaderMenu",
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
          listMenu: {
            acceptReporters: true,
            items: "_getLists",
          },
          penPlusCubemaps: {
            acceptReporters: true,
            items: "_getCubemaps",
          },
        },
        name: "Pen+ V7",
        id: "penP",
        menuIconURI:
          "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIzMi45OTk3MiIgaGVpZ2h0PSIzMi44ODIwNyIgdmlld0JveD0iMCwwLDMyLjk5OTcyLDMyLjg4MjA3Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjI0LC0xNjMuOTk5OTMpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHBhdGggZD0iTTIyOC43NTMsMTk0LjYwMmwtNC4yNSwxLjc4bDEuNzgzLC00LjIzN2MxLjIxOCwtMi44OTIgMi45MDcsLTUuNDIzIDUuMDMsLTcuNTM4bDE5Ljc1LC0xOS42NzdjMC44NDYsLTAuODQyIDIuNjUsLTAuNDEgNC4wMzIsMC45NjdjMS4zOCwxLjM3NSAxLjgxNiwzLjE3MyAwLjk3LDQuMDE1bC0xOS43NSwxOS42NzhjLTIuMTIzLDIuMTE2IC00LjY2NCwzLjggLTcuNTY1LDUuMDEyIiBmaWxsPSIjZmZmZmZmIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZT0iIzU3NWU3NSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHBhdGggZD0iTTIzNi44NTgsMTczLjQyOGMwLDAgMi42MTYsMi4yMiA0LjM1LC0xLjU0NmMzLjc1MiwtOC4xNSA4LjIwMiwtNS43NzIgOC4yMDIsLTUuNzcyIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZT0iIzU3NWU3NSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHBhdGggZD0iTTI1Ni40MiwxNjguODI1YzAsMC40NjMgLTAuMTQsMC44NzMgLTAuNDMyLDEuMTY0bC05LjMzNSw5LjNjMC4yODIsLTAuMjkgMC40MSwtMC42NjggMC40MSwtMS4xMmMwLC0wLjg3NCAtMC41MDcsLTEuOTYzIC0xLjQwNiwtMi44NjhjLTEuMzYyLC0xLjM1OCAtMy4xNDcsLTEuOCAtNC4wMDIsLTAuOTlsOS4zMzUsLTkuMzAxYzAuODQ0LC0wLjg0IDIuNjUsLTAuNDEgNC4wMzUsMC45NmMwLjg5OCwwLjkwNCAxLjM5NiwxLjk4MiAxLjM5NiwyLjg1NU0yMzAuNTE1LDE5My43NzRjLTAuNTczLDAuMzAyIC0xLjE1NywwLjU3IC0xLjc2NCwwLjgzbC00LjI1MSwxLjc3OGwxLjc4NiwtNC4yMzVjMC4yNTgsLTAuNjA0IDAuNTMsLTEuMTg2IDAuODMzLC0xLjc1N2MwLjY5LDAuMTgzIDEuNDQ4LDAuNjI1IDIuMTA4LDEuMjgyYzAuNjYsMC42NTggMS4xMDIsMS40MTIgMS4yODcsMi4xMDIiIGZpbGw9IiM0Yzk3ZmYiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlPSIjNTc1ZTc1IiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48cGF0aCBkPSJNMjU2LjQ5OCwxNjguNzQ4YzAsMC40NjQgLTAuMTQsMC44NzQgLTAuNDMzLDEuMTY1bC0xOS43NDIsMTkuNjhjLTIuMTMsMi4xMSAtNC42NzMsMy43OTMgLTcuNTcyLDUuMDFsLTQuMjUxLDEuNzc3bDAuOTc0LC0yLjMxNmwxLjkyNSwtMC44MDhjMi44OTgsLTEuMjE4IDUuNDQsLTIuOSA3LjU3LC01LjAxbDE5Ljc0MywtMTkuNjhjMC4yOTIsLTAuMjkyIDAuNDMyLC0wLjcwMiAwLjQzMiwtMS4xNjVjMCwtMC42NDYgLTAuMjcsLTEuNCAtMC43OCwtMi4xMjJjMC4yNSwwLjE3MiAwLjUsMC4zNzcgMC43MzcsMC42MTRjMC44OTgsMC45MDUgMS4zOTYsMS45ODMgMS4zOTYsMi44NTYiIGZpbGw9IiM1NzVlNzUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlPSIjNTc1ZTc1IiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIG9wYWNpdHk9IjAuMTUiLz48cGF0aCBkPSJNMjM4LjQ1LDE3Mi44M2MwLDAuNSAtMC40MDQsMC45MDUgLTAuOTA0LDAuOTA1Yy0wLjUsMCAtMC45MDUsLTAuNDA1IC0wLjkwNSwtMC45MDRjMCwtMC41IDAuNDA3LC0wLjkwMyAwLjkwNiwtMC45MDNjMC41LDAgMC45MDQsMC40MDQgMC45MDQsMC45MDR6IiBmaWxsPSIjNTc1ZTc1IiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIHN0cm9rZT0iIzU3NWU3NSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+PHBhdGggZD0iTTI0NC45OTgwNywxODcuMDUyOThoOS41MTc2NSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIi8+PHBhdGggZD0iTTI0OS43NTY4OSwxOTEuODExOHYtOS41MTc2NSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9IiNmZmZmZmYiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIi8+PC9nPjwvZz48L3N2Zz48IS0tcm90YXRpb25DZW50ZXI6MTY6MTYuMDAwMDY5MjMwODQyMTQzLS0+",
        blockIconURI:
          "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48dGl0bGU+cGVuLWljb248L3RpdGxlPjxnIHN0cm9rZT0iIzU3NUU3NSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiPjxwYXRoIGQ9Ik04Ljc1MyAzNC42MDJsLTQuMjUgMS43OCAxLjc4My00LjIzN2MxLjIxOC0yLjg5MiAyLjkwNy01LjQyMyA1LjAzLTcuNTM4TDMxLjA2NiA0LjkzYy44NDYtLjg0MiAyLjY1LS40MSA0LjAzMi45NjcgMS4zOCAxLjM3NSAxLjgxNiAzLjE3My45NyA0LjAxNUwxNi4zMTggMjkuNTljLTIuMTIzIDIuMTE2LTQuNjY0IDMuOC03LjU2NSA1LjAxMiIgZmlsbD0iI0ZGRiIvPjxwYXRoIGQ9Ik0yOS40MSA2LjExcy00LjQ1LTIuMzc4LTguMjAyIDUuNzcyYy0xLjczNCAzLjc2Ni00LjM1IDEuNTQ2LTQuMzUgMS41NDYiLz48cGF0aCBkPSJNMzYuNDIgOC44MjVjMCAuNDYzLS4xNC44NzMtLjQzMiAxLjE2NGwtOS4zMzUgOS4zYy4yODItLjI5LjQxLS42NjguNDEtMS4xMiAwLS44NzQtLjUwNy0xLjk2My0xLjQwNi0yLjg2OC0xLjM2Mi0xLjM1OC0zLjE0Ny0xLjgtNC4wMDItLjk5TDMwLjk5IDUuMDFjLjg0NC0uODQgMi42NS0uNDEgNC4wMzUuOTYuODk4LjkwNCAxLjM5NiAxLjk4MiAxLjM5NiAyLjg1NU0xMC41MTUgMzMuNzc0Yy0uNTczLjMwMi0xLjE1Ny41Ny0xLjc2NC44M0w0LjUgMzYuMzgybDEuNzg2LTQuMjM1Yy4yNTgtLjYwNC41My0xLjE4Ni44MzMtMS43NTcuNjkuMTgzIDEuNDQ4LjYyNSAyLjEwOCAxLjI4Mi42Ni42NTggMS4xMDIgMS40MTIgMS4yODcgMi4xMDIiIGZpbGw9IiM0Qzk3RkYiLz48cGF0aCBkPSJNMzYuNDk4IDguNzQ4YzAgLjQ2NC0uMTQuODc0LS40MzMgMS4xNjVsLTE5Ljc0MiAxOS42OGMtMi4xMyAyLjExLTQuNjczIDMuNzkzLTcuNTcyIDUuMDFMNC41IDM2LjM4bC45NzQtMi4zMTYgMS45MjUtLjgwOGMyLjg5OC0xLjIxOCA1LjQ0LTIuOSA3LjU3LTUuMDFsMTkuNzQzLTE5LjY4Yy4yOTItLjI5Mi40MzItLjcwMi40MzItMS4xNjUgMC0uNjQ2LS4yNy0xLjQtLjc4LTIuMTIyLjI1LjE3Mi41LjM3Ny43MzcuNjE0Ljg5OC45MDUgMS4zOTYgMS45ODMgMS4zOTYgMi44NTYiIGZpbGw9IiM1NzVFNzUiIG9wYWNpdHk9Ii4xNSIvPjxwYXRoIGQ9Ik0xOC40NSAxMi44M2MwIC41LS40MDQuOTA1LS45MDQuOTA1cy0uOTA1LS40MDUtLjkwNS0uOTA0YzAtLjUuNDA3LS45MDMuOTA2LS45MDMuNSAwIC45MDQuNDA0LjkwNC45MDR6IiBmaWxsPSIjNTc1RTc1Ii8+PC9nPjwvc3ZnPg==",
      };
    }
    //Menus
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

      let penPlusCostumes = this.penPlusCostumesFunction();

      return penPlusCostumes != ["no pen+ costumes!"]
        ? readCostumes.concat(penPlusCostumes)
        : readCostumes;
    }
    penPlusCostumesFunction() {
      const readCostumes = [];
      const keys = Object.keys(this.penPlusCostumeLibrary);
      if (keys.length > 0) {
        for (let curCostumeID = 0; curCostumeID < keys.length; curCostumeID++) {
          const currentCostume = keys[curCostumeID];
          readCostumes.push(currentCostume);
        }
        return readCostumes;
      }

      return ["no pen+ costumes!"];
    }
    shaderMenu() {
      //!Janky remedy for turbowarp saving
      this.getShaders();
      //!Pain.json
      return Object.keys(this.shaders).length == 0
        ? ["none yet"]
        : Object.keys(this.shaders);
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
    _getCubemaps() {
      if (Object.keys(this.penPlusCubemap).length == 0) return ["No cubemaps yet!"]
      return Object.keys(this.penPlusCubemap);
    }
    //From lily's list tools
    _getLists() {
      // @ts-expect-error - Blockly not typed yet
      // eslint-disable-next-line no-undef
      const lists =
        typeof Blockly === "undefined"
          ? []
          : Blockly.getMainWorkspace()
              .getVariableMap()
              .getVariablesOfType("list")
              .map((model) => model.name);
      if (lists.length > 0) {
        return lists;
      } else {
        return [""];
      }
    }
    //And the associated helper function
    _getVarObjectFromName(name, util, type) {
      const stageTarget = runtime.getTargetForStage();
      const target = util.target;
      let listObject = Object.create(null);
  
      listObject = stageTarget.lookupVariableByNameAndType(name, type);
      if (listObject) return listObject;
      listObject = target.lookupVariableByNameAndType(name, type);
      if (listObject) return listObject;
    };

    //?Default pen helpers
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
      Scratch.vm.renderer.penPoint(
        Scratch.vm.renderer._penSkinId,
        attrib,
        x,
        y
      );
    }
    drawLine({ x1, y1, x2, y2 }, util) {
      checkForPen(util);
      const curTarget = util.target;
      const attrib = curTarget["_customState"]["Scratch.pen"].penAttributes;

      Scratch.vm.renderer.penLine(
        Scratch.vm.renderer._penSkinId,
        attrib,
        x1,
        y1,
        x2,
        y2
      );
    }

    //!Useless square blocks
    squareDown(arg, util) {
      //Just a simple thing to allow for pen drawing
      const curTarget = util.target;

      checkForPen(util);

      const attrib = curTarget["_customState"]["Scratch.pen"].penAttributes;
      const diam = attrib.diameter;

      nativeSize = renderer.useHighQualityRender
        ? [canvas.width, canvas.height]
        : renderer._nativeSize;

      if (
        typeof this.triangleAttributesOfAllSprites[
          "squareStamp_" + curTarget.id
        ] == "undefined"
      ) {
        this.triangleAttributesOfAllSprites["squareStamp_" + curTarget.id] =
          triangleDefaultAttributes;
      }

      if (
        typeof this.squareAttributesOfAllSprites[curTarget.id] == "undefined"
      ) {
        this.squareAttributesOfAllSprites[curTarget.id] =
          squareDefaultAttributes;
      }

      const myAttributes = this.squareAttributesOfAllSprites[curTarget.id];

      //trying my best to reduce memory usage
      gl.viewport(0, 0, nativeSize[0], nativeSize[1]);

      const spritex = curTarget.x;
      const spritey = curTarget.y;

      //Predifine stuff so there aren't as many calculations
      const wMulX = myAttributes[0];
      const wMulY = myAttributes[1];

      const offDiam = 0.5 * diam;

      const sprXoff = spritex;
      const sprYoff = spritey;
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
      x2 += sprXoff;
      x3 += sprXoff;
      x4 += sprXoff;

      y1 += sprYoff;
      y2 += sprYoff;
      y3 += sprYoff;
      y4 += sprYoff;

      const Attribute_ID = "squareStamp_" + curTarget.id;

      this.triangleAttributesOfAllSprites[Attribute_ID][2] = myAttributes[7];
      this.triangleAttributesOfAllSprites[Attribute_ID][3] = myAttributes[8];
      this.triangleAttributesOfAllSprites[Attribute_ID][4] = myAttributes[9];
      this.triangleAttributesOfAllSprites[Attribute_ID][5] = myAttributes[11];
      this.triangleAttributesOfAllSprites[Attribute_ID][7] = myAttributes[10];
      this.triangleAttributesOfAllSprites[Attribute_ID][10] = myAttributes[7];
      this.triangleAttributesOfAllSprites[Attribute_ID][11] = myAttributes[8];
      this.triangleAttributesOfAllSprites[Attribute_ID][12] = myAttributes[9];
      this.triangleAttributesOfAllSprites[Attribute_ID][13] = myAttributes[11];
      this.triangleAttributesOfAllSprites[Attribute_ID][15] = myAttributes[10];
      this.triangleAttributesOfAllSprites[Attribute_ID][18] = myAttributes[7];
      this.triangleAttributesOfAllSprites[Attribute_ID][19] = myAttributes[8];
      this.triangleAttributesOfAllSprites[Attribute_ID][20] = myAttributes[9];
      this.triangleAttributesOfAllSprites[Attribute_ID][21] = myAttributes[11];
      this.triangleAttributesOfAllSprites[Attribute_ID][23] = myAttributes[10];

      this.drawSolidTri(
        {
          x1: x1,
          y1: y1,
          x2: x2,
          y2: y2,
          x3: x3,
          y3: y3,
        },
        util
      );

      this.drawSolidTri(
        {
          x1: x1,
          y1: y1,
          x2: x3,
          y2: y3,
          x3: x4,
          y3: y4,
        },
        util
      );
    }
    squareTexDown({ tex }, util) {
      //Just a simple thing to allow for pen drawing
      const curTarget = util.target;

      checkForPen(util);

      const attrib = curTarget["_customState"]["Scratch.pen"].penAttributes;
      const diam = attrib.diameter;

      nativeSize = renderer.useHighQualityRender
        ? [canvas.width, canvas.height]
        : renderer._nativeSize;

      if (
        typeof this.triangleAttributesOfAllSprites[
          "squareStamp_" + curTarget.id
        ] == "undefined"
      ) {
        this.triangleAttributesOfAllSprites["squareStamp_" + curTarget.id] =
          triangleDefaultAttributes;
      }

      if (
        typeof this.squareAttributesOfAllSprites[curTarget.id] == "undefined"
      ) {
        this.squareAttributesOfAllSprites[curTarget.id] =
          squareDefaultAttributes;
      }

      const myAttributes = this.squareAttributesOfAllSprites[curTarget.id];

      //trying my best to reduce memory usage
      gl.viewport(0, 0, nativeSize[0], nativeSize[1]);

      const spritex = curTarget.x;
      const spritey = curTarget.y;

      //Predifine stuff so there aren't as many calculations
      const wMulX = myAttributes[0];
      const wMulY = myAttributes[1];

      const offDiam = 0.5 * diam;

      const sprXoff = spritex;
      const sprYoff = spritey;
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
      x2 += sprXoff;
      x3 += sprXoff;
      x4 += sprXoff;

      y1 += sprYoff;
      y2 += sprYoff;
      y3 += sprYoff;
      y4 += sprYoff;
      const Attribute_ID = "squareStamp_" + curTarget.id;
      this.triangleAttributesOfAllSprites[Attribute_ID][0] =
        (0 + myAttributes[4]) * myAttributes[3];
      this.triangleAttributesOfAllSprites[Attribute_ID][1] =
        (1 + myAttributes[6]) * myAttributes[5];

      this.triangleAttributesOfAllSprites[Attribute_ID][2] = myAttributes[7];
      this.triangleAttributesOfAllSprites[Attribute_ID][3] = myAttributes[8];
      this.triangleAttributesOfAllSprites[Attribute_ID][4] = myAttributes[9];
      this.triangleAttributesOfAllSprites[Attribute_ID][5] = myAttributes[11];
      this.triangleAttributesOfAllSprites[Attribute_ID][8] = myAttributes[10];

      this.triangleAttributesOfAllSprites[Attribute_ID][8] =
        (1 + myAttributes[4]) * myAttributes[3];
      this.triangleAttributesOfAllSprites[Attribute_ID][9] =
        (1 + myAttributes[6]) * myAttributes[5];

      this.triangleAttributesOfAllSprites[Attribute_ID][10] = myAttributes[7];
      this.triangleAttributesOfAllSprites[Attribute_ID][11] = myAttributes[8];
      this.triangleAttributesOfAllSprites[Attribute_ID][12] = myAttributes[9];
      this.triangleAttributesOfAllSprites[Attribute_ID][13] = myAttributes[11];
      this.triangleAttributesOfAllSprites[Attribute_ID][16] = myAttributes[10];

      this.triangleAttributesOfAllSprites[Attribute_ID][16] =
        (1 + myAttributes[4]) * myAttributes[3];
      this.triangleAttributesOfAllSprites[Attribute_ID][17] =
        (0 + myAttributes[6]) * myAttributes[5];

      this.triangleAttributesOfAllSprites[Attribute_ID][18] = myAttributes[7];
      this.triangleAttributesOfAllSprites[Attribute_ID][19] = myAttributes[8];
      this.triangleAttributesOfAllSprites[Attribute_ID][20] = myAttributes[9];
      this.triangleAttributesOfAllSprites[Attribute_ID][21] = myAttributes[11];
      this.triangleAttributesOfAllSprites[Attribute_ID][24] = myAttributes[10];

      this.drawTexTri(
        {
          x1: x1,
          y1: y1,
          x2: x2,
          y2: y2,
          x3: x3,
          y3: y3,
          tex: tex,
        },
        util
      );

      this.triangleAttributesOfAllSprites[Attribute_ID][0] =
        (0 + myAttributes[4]) * myAttributes[3];
      this.triangleAttributesOfAllSprites[Attribute_ID][1] =
        (1 + myAttributes[6]) * myAttributes[5];

      this.triangleAttributesOfAllSprites[Attribute_ID][8] =
        (1 + myAttributes[4]) * myAttributes[3];
      this.triangleAttributesOfAllSprites[Attribute_ID][9] =
        (0 + myAttributes[6]) * myAttributes[5];

      this.triangleAttributesOfAllSprites[Attribute_ID][16] =
        (0 + myAttributes[4]) * myAttributes[3];
      this.triangleAttributesOfAllSprites[Attribute_ID][17] =
        (0 + myAttributes[6]) * myAttributes[5];
      this.drawTexTri(
        {
          x1: x1,
          y1: y1,
          x2: x3,
          y2: y3,
          x3: x4,
          y3: y4,
          tex: tex,
        },
        util
      );
    }
    setStampAttribute({ target, number }, util) {
      const curTarget = util.target;
      if (!this.squareAttributesOfAllSprites[curTarget.id]) {
        this.squareAttributesOfAllSprites[curTarget.id] =
          squareDefaultAttributes;
      }

      let valuetoSet = number;

      const attributeNum = Scratch.Cast.toNumber(target);
      if (attributeNum >= 7) {
        if (attributeNum == 11) {
          if (this.AdvancedSettings._ClampZ) {
            Math.min(
              Math.max(valuetoSet / this.AdvancedSettings._maxDepth, 0),
              1
            );
            return;
          }
          valuetoSet = valuetoSet / this.AdvancedSettings._maxDepth;
          this.squareAttributesOfAllSprites[curTarget.id][attributeNum] =
            valuetoSet / this.AdvancedSettings._maxDepth;
          return;
        }
        this.squareAttributesOfAllSprites[curTarget.id][attributeNum] =
          Math.min(Math.max(valuetoSet, 0), 100) * 0.01;
        return;
      }
      this.squareAttributesOfAllSprites[curTarget.id][attributeNum] =
        valuetoSet;
    }
    getStampAttribute({ target }, util) {
      const curTarget = util.target;
      if (!this.squareAttributesOfAllSprites[curTarget.id]) {
        this.squareAttributesOfAllSprites[curTarget.id] =
          squareDefaultAttributes;
      }

      return this.squareAttributesOfAllSprites[curTarget.id][
        Scratch.Cast.toNumber(target)
      ];
    }
    tintSquare({ color }, util) {
      const curTarget = util.target;

      if (!this.squareAttributesOfAllSprites[curTarget.id]) {
        this.squareAttributesOfAllSprites[curTarget.id] =
          squareDefaultAttributes;
      }

      const calcColor = Scratch.Cast.toRgbColorObject(color);

      this.squareAttributesOfAllSprites[curTarget.id][7] = calcColor.r / 255;
      this.squareAttributesOfAllSprites[curTarget.id][8] = calcColor.g / 255;
      this.squareAttributesOfAllSprites[curTarget.id][9] = calcColor.b / 255;
    }
    resetSquareAttributes(args, util) {
      const curTarget = util.target;
      this.squareAttributesOfAllSprites[curTarget.id] = [
        1, 1, 90, 1, 0, 1, 0, 1, 1, 1, 1, 0,
      ];
    }

    //?Triangle stuffs
    setTriangleFilterMode({ filter }) {
      currentFilter = filter;
    }
    setTrianglePointAttribute({ point, attribute, value }, util) {
      const trianglePointStart = (point - 1) * 8;

      const targetId = util.target.id;

      if (!this.triangleAttributesOfAllSprites[targetId]) {
        this.triangleAttributesOfAllSprites[targetId] =
          triangleDefaultAttributes;
      }
      this.attributeEditors.setValueAccordingToCaseTriangle(
        targetId,
        Scratch.Cast.toNumber(attribute),
        value,
        false,
        trianglePointStart
      );
    }
    setWholeTrianglePointAttribute({ wholeAttribute, value }, util) {
      const targetId = util.target.id;

      if (!this.triangleAttributesOfAllSprites[targetId]) {
        this.triangleAttributesOfAllSprites[targetId] =
          triangleDefaultAttributes;
      }
      this.attributeEditors.setValueAccordingToCaseTriangle(
        targetId,
        Scratch.Cast.toNumber(wholeAttribute),
        value,
        true,
        0
      );
    }
    tintTriPoint({ point, color }, util) {
      const trianglePointStart = (point - 1) * 8;

      const targetId = util.target.id;

      if (!this.triangleAttributesOfAllSprites[targetId]) {
        this.triangleAttributesOfAllSprites[targetId] =
          triangleDefaultAttributes;
      }

      const calcColor = Scratch.Cast.toRgbColorObject(color);

      this.attributeEditors.setValueAccordingToCaseTriangle(
        targetId,
        2,
        calcColor.r / 2.55,
        false,
        trianglePointStart
      );

      this.attributeEditors.setValueAccordingToCaseTriangle(
        targetId,
        3,
        calcColor.g / 2.55,
        false,
        trianglePointStart
      );

      this.attributeEditors.setValueAccordingToCaseTriangle(
        targetId,
        4,
        calcColor.b / 2.55,
        false,
        trianglePointStart
      );
    }
    tintTri({ point, color }, util) {
      const trianglePointStart = (point - 1) * 8;

      const targetId = util.target.id;

      if (!this.triangleAttributesOfAllSprites[targetId]) {
        this.triangleAttributesOfAllSprites[targetId] =
          triangleDefaultAttributes;
      }

      const calcColor = Scratch.Cast.toRgbColorObject(color);

      this.attributeEditors.setValueAccordingToCaseTriangle(
        targetId,
        2,
        calcColor.r / 2.55,
        true,
        trianglePointStart
      );

      this.attributeEditors.setValueAccordingToCaseTriangle(
        targetId,
        3,
        calcColor.g / 2.55,
        true,
        trianglePointStart
      );

      this.attributeEditors.setValueAccordingToCaseTriangle(
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

      if (!this.triangleAttributesOfAllSprites[targetId]) {
        this.triangleAttributesOfAllSprites[targetId] =
          triangleDefaultAttributes;
      }
      let value =
        this.triangleAttributesOfAllSprites[targetId][
          trianglePointStart + attribute
        ];

      if ((attribute >= 2 && attribute <= 4) || attribute == 7) {
        value *= 100;
      }
      return value;
    }
    resetWholeTriangleAttributes(args, util) {
      const targetId = util.target.id;
      this.triangleAttributesOfAllSprites[targetId] = [
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

      //if (this.triangleAttributesOfAllSprites[curTarget.id]) {
      //  this.triangleAttributesOfAllSprites[curTarget.id][5] = 1;
      //  this.triangleAttributesOfAllSprites[curTarget.id][13] = 1;
      //  this.triangleAttributesOfAllSprites[curTarget.id][21] = 1;
      //}

      //?Renderer Freaks out if we don't do this so do it.

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

      this.renderFunctions.drawTri(
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
      if (this.penPlusCostumeLibrary[tex]) {
        currentTexture = this.penPlusCostumeLibrary[tex].texture;
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
        this.renderFunctions.drawTextTri(
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

    //?Color Stuff
    RGB2HEX({ R, G, B }) {
      return this.colorLib.rgbtoSColor({ R: R, G: G, B: B });
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
      return this.colorLib.rgbtoSColor({
        R: Primes[0] / 2.55,
        G: Primes[1] / 2.55,
        B: Primes[2] / 2.55,
      });
    }

    //?Image/costume Api
    setDURIclampmode({ clampMode }) {
      penPlusImportWrapMode = clampMode;
    }
    addBlankIMG({ color, width, height, name }) {
      //Just a simple thing to allow for pen drawing
      this.textureFunctions.createBlankPenPlusTextureInfo(
        width,
        height,
        color,
        "!" + name,
        penPlusImportWrapMode
      );
    }
    addIMGfromDURI({ dataURI, name }) {
      //Just a simple thing to allow for pen drawing
      this.textureFunctions.createPenPlusTextureInfo(
        dataURI,
        "!" + name,
        penPlusImportWrapMode
      );
    }
    removeIMGfromDURI({ name }, util) {
      //Just a simple thing to allow for pen drawing
      if (this.penPlusCostumeLibrary["!" + name]) {
        delete this.penPlusCostumeLibrary["!" + name];
      }
    }
    doesIMGexist({ name }, util) {
      //Just a simple thing to allow for pen drawing
      return typeof this.penPlusCostumeLibrary["!" + name] != "undefined";
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
    getDimensionOf({ dimension, costume }, util) {
      //Just a simple thing to allow for pen drawing
      const costIndex = this.penPlusCostumeLibrary[costume];
      if (costIndex) {
        return costIndex[dimension];
      }
    }
    setpixelcolor({ x, y, color, costume }) {
      const curCostume = this.penPlusCostumeLibrary[costume];
      if (curCostume) {
        const textureData = this.textureFunctions.getTextureData(
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
            const retColor = Scratch.Cast.toRgbColorObject(color);
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
      const curCostume = this.penPlusCostumeLibrary[costume];
      if (curCostume) {
        const textureData = this.textureFunctions.getTextureData(
          curCostume.texture,
          curCostume.width,
          curCostume.height
        );
        if (textureData) {
          x = Math.floor(x - 1);
          y = Math.floor(y - 1);
          const colorIndex = (y * curCostume.width + x) * 4;
          if (textureData[colorIndex] && x < curCostume.width && x >= 0) {
            return this.colorLib.rgbtoSColor({
              R: textureData[colorIndex] / 2.55,
              G: textureData[colorIndex + 1] / 2.55,
              B: textureData[colorIndex + 2] / 2.55,
            });
          }
          return this.colorLib.rgbtoSColor({ R: 100, G: 100, B: 100 });
        }
      }
    }
    getPenPlusCostumeURI({ costume }) {
      const curCostume = this.penPlusCostumeLibrary[costume];
      if (curCostume) {
        const textureData = this.textureFunctions.getTextureAsURI(
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

    //?Neato
    getTrianglesDrawn() {
      return this.trianglesDrawn;
    }
    turnAdvancedSettingOff({ Setting, onOrOff }) {
      if (onOrOff == "on") {
        this.AdvancedSettings[Setting] = true;
        return;
      }
      this.AdvancedSettings[Setting] = false;
    }
    setAdvancedOptionValueTo({ setting, value }) {
      switch (setting) {
        case "depthMax":
          this.AdvancedSettings._maxDepth = Math.max(value, 100);
          break;

        default:
          break;
      }
    }

    //?Custom Shaders
    openShaderEditor() {
      const bgFade = document.createElement("div");
      bgFade.style.width = "100%";
      bgFade.style.height = "100%";

      bgFade.style.position = "absolute";
      bgFade.style.left = "0px";
      bgFade.style.top = "0px";

      bgFade.style.backgroundColor = this.fade;
      bgFade.style.filter = "opacity(0%)";

      bgFade.style.zIndex = "10000";

      document.body.appendChild(bgFade);

      this.IFrame = document.createElement("iframe");
      this.IFrame.style.width = "80%";
      this.IFrame.style.height = "80%";
      this.IFrame.style.borderRadius = "8px";
      this.IFrame.style.borderColor = this._shadowBorder;
      this.IFrame.style.borderWidth = "4px";
      this.IFrame.style.borderStyle = "solid";

      this.IFrame.style.position = "absolute";
      this.IFrame.style.left = "10%";
      this.IFrame.style.top = "100%";

      this.IFrame.style.zIndex = "10001";

      this.IFrame.onload = () => {
        let hostname = "project";

        if (window.location.hostname.split(".").length > 2) {
          hostname = window.location.hostname.split(".")[1];
        } else {
          hostname = window.location.hostname.split(".")[0];
        }

        this.IFrame.contentWindow.postMessage(
          {
            type: "REGISTER_PARENT",
            exitButton: true,
            exportText: `Export to ${hostname.replace(/\w\S*/g, function (txt) {
              return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            })}`,
          },
          this.IFrame.src
        );
      };

      this.IFrame.closeIframe = () => {
        document.body.style.overflowY = "hidden";
        let animation = 0;
        let oldInterval = setInterval(() => {
          if (animation < -90) {
            document.body.style.overflowY = "inherit";
            document.body.removeChild(this.IFrame);
            document.body.removeChild(bgFade);
            clearInterval(oldInterval);
          }

          this.IFrame.style.top = animation + "%";
          bgFade.style.filter = `opacity(${100 - Math.abs(animation - 10)}%)`;
          animation += (-100 - animation) * 0.05;
        }, 16);
      };

      this.IFrame.src =
        "https://pen-group.github.io/penPlus-shader-editor/Source/";

      //Popup animation
      document.body.style.overflowY = "hidden";
      let animation = 100;
      let oldInterval = setInterval(() => {
        if (Math.abs(animation - 10) < 1) {
          document.body.style.overflowY = "inherit";
          clearInterval(oldInterval);
        }

        this.IFrame.style.top = animation + "%";
        bgFade.style.filter = `opacity(${100 - Math.abs(animation - 10)}%)`;
        animation += (10 - animation) * 0.05;
      }, 16);

      //Add the IFrame to the body
      document.body.appendChild(this.IFrame);
    }

    //! HEED THY WARNING LOTS OF JAVASCRIPT BASED HTML AHEAD !//
    //Modal themes
    _setupTheme() {
      //Use a predefined pen+ theme if packaged
      if (Scratch.vm.runtime.isPackaged) {
        this._menuBarBackground = "#0FBD8C";
        this._defaultBackgroundColor = "white";
        this._textColor = "black";
        this._buttonShadow = "hsla(0, 0%, 0%, 0.15)";
        this.fade = "#0FBD8CDD";
        this._shadowBorder = "hsla(0, 100%, 100%, 0.25)";
        return;
      }

      //Also if this looks bad it's due to prettier
      //I support friendly competition!
      this._menuBarBackground = Scratch.extensions.isPenguinMod
        ? //This is penguinmod blue
          "#009CCC"
        : //Turbowarp
          "var(--menu-bar-background)";

      //Of course due to the GUI version differences I need to conduct some checks on these
      this._defaultBackgroundColor = Scratch.extensions.isPenguinMod
        ? //Wierd old turbowarp vm thingy right here
          document.body.getAttribute("theme") == "dark"
          ? "var(--ui-primary)"
          : "white"
        : //New accent stuff me likey.
          "var(--ui-modal-background)";

      //But in general its fine
      this._textColor = Scratch.extensions.isPenguinMod
        ? document.body.getAttribute("theme") == "dark"
          ? "white"
          : "black"
        : //Again with the accents. Me likey
          "var(--ui-modal-foreground)";

      this._buttonShadow = Scratch.extensions.isPenguinMod
        ? "hsla(0, 0%, 0%, 0.15)"
        : "var(--ui-black-transparent)";

      this.fade = "var(--ui-modal-overlay, hsla(194, 100%, 65%, 0.9))";

      this._shadowBorder = Scratch.extensions.isPenguinMod
        ? "hsla(0, 100%, 100%, 0.25)"
        : "var(--ui-white-transparent)";
    }

    //Just a helper function so the main one isn't too cluttered
    _shaderManagerModal() {
      //!Janky remedy for turbowarp saving
      this.getShaders();

      const bgFade = document.createElement("div");
      bgFade.style.width = "100%";
      bgFade.style.height = "100%";

      bgFade.style.position = "absolute";
      bgFade.style.left = "0px";
      bgFade.style.top = "0px";

      bgFade.style.backgroundColor = this.fade;

      bgFade.style.zIndex = "10001";

      document.body.appendChild(bgFade);

      /*
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀  ⠀⢀⡔⣻⠁⠀⢀⣀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⢀⣾⠳⢶⣦⠤⣀⠀⠀⠀⠀⠀⠀⠀⣾⢀⡇⡴⠋⣀⠴⣊⣩⣤⠶⠞⢹⣄⠀⠀⠀
⠀⠀⠀⠀⢸⠀⠀⢠⠈⠙⠢⣙⠲⢤⠤⠤⠀⠒⠳⡄⣿⢀⠾⠓⢋⠅⠛⠉⠉⠝⠀⠼⠀⠀⠀
⠀⠀⠀⠀⢸⠀⢰⡀⠁⠀⠀⠈⠑⠦⡀⠀⠀⠀⠀⠈⠺⢿⣂⠀⠉⠐⠲⡤⣄⢉⠝⢸⠀⠀⠀
⠀⠀⠀⠀⢸⠀⢀⡹⠆⠀⠀⠀⠀⡠⠃⠀⠀⠀⠀⠀⠀⠀⠉⠙⠲⣄⠀⠀⠙⣷⡄⢸⠀⠀⠀
⠀⠀⠀⠀⢸⡀⠙⠂⢠⠀⠀⡠⠊⠀⠀⠀⠀⢠⠀⠀⠀⠀⠘⠄⠀⠀⠑⢦⣔⠀⢡⡸⠀⠀⠀
⠀⠀⠀⠀⢀⣧⠀⢀⡧⣴⠯⡀⠀⠀⠀⠀⠀⡎⠀⠀⠀⠀⠀⢸⡠⠔⠈⠁⠙⡗⡤⣷⡀⠀⠀
⠀⠀⠀⠀⡜⠈⠚⠁⣬⠓⠒⢼⠅⠀⠀⠀⣠⡇⠀⠀⠀⠀⠀⠀⣧⠀⠀⠀⡀⢹⠀⠸⡄⠀⠀
⠀⠀⠀⡸⠀⠀⠀⠘⢸⢀⠐⢃⠀⠀⠀⡰⠋⡇⠀⠀⠀⢠⠀⠀⡿⣆⠀⠀⣧⡈⡇⠆⢻⠀⠀
⠀⠀⢰⠃⠀⠀⢀⡇⠼⠉⠀⢸⡤⠤⣶⡖⠒⠺⢄⡀⢀⠎⡆⣸⣥⠬⠧⢴⣿⠉⠁⠸⡀⣇⠀
⠀⠀⠇⠀⠀⠀⢸⠀⠀⠀⣰⠋⠀⢸⣿⣿⠀⠀⠀⠙⢧⡴⢹⣿⣿⠀⠀⠀⠈⣆⠀⠀⢧⢹⡄
⠀⣸⠀⢠⠀⠀⢸⡀⠀⠀⢻⡀⠀⢸⣿⣿⠀⠀⠀⠀⡼⣇⢸⣿⣿⠀⠀⠀⢀⠏⠀⠀⢸⠀⠇
⠀⠓⠈⢃⠀⠀⠀⡇⠀⠀⠀⣗⠦⣀⣿⡇⠀⣀⠤⠊⠀⠈⠺⢿⣃⣀⠤⠔⢸⠀⠀⠀⣼⠑⢼
⠀⠀⠀⢸⡀⣀⣾⣷⡀⠀⢸⣯⣦⡀⠀⠀⠀⢇⣀⣀⠐⠦⣀⠘⠀⠀⢀⣰⣿⣄⠀⠀⡟⠀⠀
⠀⠀⠀⠀⠛⠁⣿⣿⣧⠀⣿⣿⣿⣿⣦⣀⠀⠀⠀⠀⠀⠀⠀⣀⣠⣴⣿⣿⡿⠈⠢⣼⡇⠀⠀           Bryunyeuuuuuu
⠀⠀⠀⠀⠀⠀⠈⠁⠈⠻⠈⢻⡿⠉⣿⠿⠛⡇⠒⠒⢲⠺⢿⣿⣿⠉⠻⡿⠁⠀⠀⠈⠁⠀⠀          Smooth criminal
⢀⠤⠒⠦⡀⠀⠀⠀⠀⠀⠀⠀⢀⠞⠉⠆⠀⠀⠉⠉⠉⠀⠀⡝⣍⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⡎⠀⠀⠀⡇⠀⠀⠀⠀⠀⠀⡰⠋⠀⠀⢸⠀⠀⠀⠀⠀⠀⠀⢡⠈⢦⠀⠀⠀⠀⠀⠀⠀⠀⠀
⡇⠀⠀⠸⠁⠀⠀⠀⠀⢀⠜⠁⠀⠀⠀⡸⠀⠀⠀⠀⠀⠀⠀⠘⡄⠈⢳⡀⠀⠀⠀⠀⠀⠀⠀
⡇⠀⠀⢠⠀⠀⠀⠀⠠⣯⣀⠀⠀⠀⡰⡇⠀⠀⠀⠀⠀⠀⠀⠀⢣⠀⢀⡦⠤⢄⡀⠀⠀⠀⠀
⢱⡀⠀⠈⠳⢤⣠⠖⠋⠛⠛⢷⣄⢠⣷⠁⠀⠀⠀⠀⠀⠀⠀⠀⠘⡾⢳⠃⠀⠀⠘⢇⠀⠀⠀
⠀⠙⢦⡀⠀⢠⠁⠀⠀⠀⠀⠀⠙⣿⣏⣀⠀⠀⠀⠀⠀⠀⠀⣀⣴⣧⡃⠀⠀⠀⠀⣸⠀⠀⠀
⠀⠀⠀⠈⠉⢺⣄⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣗⣤⣀⣠⡾⠃⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠣⢅⡤⣀⣀⣠⣼⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣷⠉⠉⠉⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠉⠁⠀⠉⣿⣿⣿⣿⣿⡿⠻⣿⣿⣿⣿⠛⠉⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣸⣿⣿⣿⠀⠀⠀⠀⣿⣿⣿⡿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣴⣿⣿⣿⣟⠀⠀⢠⣿⣿⣿⣿⣧⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⣿⣿⣿⣿⣿⠀⠀⢸⣿⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⡏⠀⠀⢸⣿⣿⣿⣿⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣿⣿⣿⣿⣿⠀⠀⠀⢺⣿⣿⣿⣿⣿⣿⣷⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⣿⣿⣿⣿⠀⠀⠀⠀⠈⠉⠻⣿⣿⣿⠟⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⢿⣿⣿⣿⠏⠀⠀⠀⠀⠀⠀⠀⠀
      */
      const shaderManager = document.createElement("div");

      //Create our menu modal
      shaderManager.style.backgroundColor = this._menuBarBackground;
      shaderManager.style.width = "50%";
      shaderManager.style.height = "50%";
      shaderManager.style.position = "relative";
      shaderManager.style.top = "50%";
      shaderManager.style.left = "50%";
      shaderManager.style.borderRadius = "8px";
      shaderManager.style.borderColor = this._shadowBorder;
      shaderManager.style.borderWidth = "4px";
      shaderManager.style.borderStyle = "solid";
      shaderManager.style.aspectRatio = "5/3";
      shaderManager.style.transform = "translate(-50%,25%)";
      shaderManager.style.zIndex = "10002";

      //!DONT FORGET THIS IS HERE
      shaderManager.style.textAlign = "center";

      shaderManager.style.color = "#ffffff";

      document.body.appendChild(shaderManager);

      //This is the text that shows up on-top of the modal
      const topText = document.createElement("div");

      topText.style.width = "100%";
      topText.style.height = "48px";
      topText.style.top = "0px";
      topText.style.left = "0px";
      topText.style.position = "absolute";
      topText.style.transform = "translate(0%,12px)";

      topText.style.fontSize = "24px";

      topText.innerHTML = "Shader Manager";

      shaderManager.appendChild(topText);

      //Then we have the inner panel. Where most of the ui goes
      const shaderPanel = document.createElement("div");

      shaderPanel.style.backgroundColor = this._defaultBackgroundColor;
      shaderPanel.style.width = "100%";
      shaderPanel.style.height = "calc(100% - 48px)";
      shaderPanel.style.position = "absolute";
      shaderPanel.style.top = "48px";
      shaderPanel.style.left = "0%";
      shaderPanel.style.borderBottomLeftRadius = "4px";
      shaderPanel.style.borderBottomRightRadius = "4px";

      shaderManager.appendChild(shaderPanel);

      //The actual container no filter to avoid buggy things
      const closeMenu = document.createElement("div");

      closeMenu.style.width = "1.75rem";
      closeMenu.style.height = "1.75rem";
      closeMenu.style.backgroundColor = this._buttonShadow;
      closeMenu.style.position = "absolute";
      closeMenu.style.left = "calc(100% - 2rem)";
      closeMenu.style.top = "0.25rem";
      closeMenu.style.borderRadius = "50%";
      closeMenu.style.alignItems = "center";
      closeMenu.style.justifyContent = "center";
      closeMenu.style.display = "flex";
      closeMenu.style.cursor = "pointer";
      closeMenu.style.transition = "all 0.15s ease-out";
      closeMenu.style.transform = "translate(-50%,25%)";

      //Animation stuffs
      closeMenu.onmouseenter = () => {
        closeMenu.style.transform = "translate(-50%,25%) scale(1.1,1.1)";
      };

      //More animation
      closeMenu.onmouseleave = () => {
        closeMenu.style.transform = "translate(-50%,25%) scale(1,1)";
      };

      //Just the close button
      closeMenu.onclick = () => {
        document.body.removeChild(bgFade);
        document.body.removeChild(shaderManager);
      };

      shaderManager.appendChild(closeMenu);

      //The close button for the menu
      const xImage = document.createElement("img");
      xImage.src =
        "data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA3LjQ4IDcuNDgiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDpub25lO3N0cm9rZTojZmZmO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2Utd2lkdGg6MnB4O308L3N0eWxlPjwvZGVmcz48dGl0bGU+aWNvbi0tYWRkPC90aXRsZT48bGluZSBjbGFzcz0iY2xzLTEiIHgxPSIzLjc0IiB5MT0iNi40OCIgeDI9IjMuNzQiIHkyPSIxIi8+PGxpbmUgY2xhc3M9ImNscy0xIiB4MT0iMSIgeTE9IjMuNzQiIHgyPSI2LjQ4IiB5Mj0iMy43NCIvPjwvc3ZnPg==";

      xImage.style.width = "0.75rem";
      xImage.style.height = "0.75rem";
      xImage.style.margin = "0.25rem";
      xImage.style.transform = "rotate(45deg)";

      closeMenu.appendChild(xImage);

      return {
        shaderPanel: shaderPanel,
        closeFunc: () => {
          document.body.removeChild(bgFade);
          document.body.removeChild(shaderManager);
        },
        resizeFunc: (width, height) => {
          shaderManager.style.aspectRatio = width + "/" + height;
          shaderManager.style.width = width > height ? "auto" : width + "%";
          shaderManager.style.height = height >= width ? "auto" : height + "%";
        },
      };
    }

    //Then this decides the contents of said modal while gathering some info
    openShaderManager(reason) {
      const { shaderPanel, closeFunc, resizeFunc } = this._shaderManagerModal();

      //If we don't have a reason assign a default value
      reason = reason || "manager";

      //penguin one liner support
      //for some reason it sends the entire workspace when a button is clicked?
      if (Scratch.extensions.isPenguinMod && typeof reason != "string")
        reason = "manager";

      //Since I'm using a switch we do this.
      let menuSpecificVars = {};

      switch (reason) {
        case "save":
          //The neat background color. Using a filter to limit the amount of colouring operations
          menuSpecificVars.savePanel = document.createElement("div");

          menuSpecificVars.savePanel.style.width = "60%";
          menuSpecificVars.savePanel.style.height = "100%";
          menuSpecificVars.savePanel.style.backgroundColor =
            this._menuBarBackground;
          menuSpecificVars.savePanel.style.filter = "opacity(50%)";
          menuSpecificVars.savePanel.style.position = "absolute";

          shaderPanel.appendChild(menuSpecificVars.savePanel);

          //The actual container no filter to avoid buggy things
          menuSpecificVars.saveStuffHolder = document.createElement("div");

          menuSpecificVars.saveStuffHolder.style.width = "60%";
          menuSpecificVars.saveStuffHolder.style.height = "100%";
          menuSpecificVars.saveStuffHolder.style.backgroundColor = "#00000000";
          menuSpecificVars.saveStuffHolder.style.position = "absolute";

          shaderPanel.appendChild(menuSpecificVars.saveStuffHolder);

          //A whole lotta hub jubba for the input box. Though I want it to be supported natively even in a non GUI enviornment
          menuSpecificVars.shadername = document.createElement("input");
          menuSpecificVars.shadername.type = "text";
          menuSpecificVars.shadername.style.backgroundColor =
            this._defaultBackgroundColor;
          menuSpecificVars.shadername.style.fontSize = "1rem";
          menuSpecificVars.shadername.style.fontWeight = "bold";
          menuSpecificVars.shadername.style.borderRadius = "4px";
          menuSpecificVars.shadername.style.borderWidth = "1px";
          menuSpecificVars.shadername.style.borderStyle = "solid";
          menuSpecificVars.shadername.style.borderColor = "#404040";
          menuSpecificVars.shadername.style.color = "#ffffff";
          menuSpecificVars.shadername.style.position = "absolute";
          menuSpecificVars.shadername.style.top = "10%";
          menuSpecificVars.shadername.style.left = "50%";
          menuSpecificVars.shadername.style.transform = "translate(-50%,0%)";
          menuSpecificVars.shadername.style.height = "2rem";
          menuSpecificVars.shadername.style.color = this._textColor;
          menuSpecificVars.shadername.style.zIndex = "10005";
          menuSpecificVars.shadername.maxLength = 20;

          menuSpecificVars.shadername.placeholder = "Shader Name";

          //I dunno why prettier feels the need to do this. I feel like it makes it more unreadable.
          menuSpecificVars.saveStuffHolder.appendChild(
            menuSpecificVars.shadername
          );

          //Save Button
          menuSpecificVars.saveButton = document.createElement("button");

          menuSpecificVars.saveButton.innerText = "Save";
          menuSpecificVars.saveButton.style.cursor = "pointer";
          menuSpecificVars.saveButton.style.padding = "0.75rem 1rem";
          menuSpecificVars.saveButton.style.borderRadius = "0.25rem";
          menuSpecificVars.saveButton.style.boxSizing = "border-box";
          menuSpecificVars.saveButton.style.borderStyle = "solid";
          menuSpecificVars.saveButton.style.borderWidth = "0px";
          menuSpecificVars.saveButton.style.position = "absolute";
          menuSpecificVars.saveButton.style.top = "20%";
          menuSpecificVars.saveButton.style.left = "50%";
          menuSpecificVars.saveButton.style.backgroundColor =
            this._menuBarBackground;
          menuSpecificVars.saveButton.style.transform = "translate(-50%,0%)";

          menuSpecificVars.saveButton.onclick = () => {
            if (menuSpecificVars.shadername.value.length == 0) return;
            this.saveShader(menuSpecificVars.shadername.value, this.savingData);
            closeFunc();
          };

          menuSpecificVars.saveStuffHolder.appendChild(
            menuSpecificVars.saveButton
          );

          //A container containing already existing shaders and some text to accompony them.
          menuSpecificVars.existingShaderHolder = document.createElement("div");

          menuSpecificVars.existingShaderHolder.style.width = "40%";
          menuSpecificVars.existingShaderHolder.style.height = "100%";
          menuSpecificVars.existingShaderHolder.style.left = "60%";
          menuSpecificVars.existingShaderHolder.style.backgroundColor =
            "#00000000";
          menuSpecificVars.existingShaderHolder.style.position = "absolute";

          shaderPanel.appendChild(menuSpecificVars.existingShaderHolder);

          menuSpecificVars.existingText = document.createElement("div");

          menuSpecificVars.existingText.style.width = "100%";
          menuSpecificVars.existingText.style.height = "48px";
          menuSpecificVars.existingText.style.top = "0px";
          menuSpecificVars.existingText.style.left = "0px";
          menuSpecificVars.existingText.style.position = "absolute";
          menuSpecificVars.existingText.style.transform = "translate(0%,8px)";
          menuSpecificVars.existingText.style.color = this._textColor;

          menuSpecificVars.existingText.style.fontSize = "16px";

          menuSpecificVars.existingText.innerHTML = "Project Shaders";

          menuSpecificVars.existingShaderHolder.appendChild(
            menuSpecificVars.existingText
          );

          //The background for existing shaders
          menuSpecificVars.existingDivBackground =
            document.createElement("div");

          menuSpecificVars.existingDivBackground.style.backgroundColor =
            this._menuBarBackground;
          menuSpecificVars.existingDivBackground.style.width = "100%";
          menuSpecificVars.existingDivBackground.style.height =
            "calc(100% - 32px)";
          menuSpecificVars.existingDivBackground.style.position = "absolute";
          menuSpecificVars.existingDivBackground.style.top = "32px";
          menuSpecificVars.existingDivBackground.style.left = "0%";
          menuSpecificVars.existingDivBackground.style.filter = "opacity(25%)";

          menuSpecificVars.existingShaderHolder.appendChild(
            menuSpecificVars.existingDivBackground
          );

          //The container for existing shaders
          menuSpecificVars.existingDiv = document.createElement("div");

          menuSpecificVars.existingDiv.style.backgroundColor = "#00000000";
          menuSpecificVars.existingDiv.style.width = "100%";
          menuSpecificVars.existingDiv.style.height = "calc(100% - 32px)";
          menuSpecificVars.existingDiv.style.position = "absolute";
          menuSpecificVars.existingDiv.style.top = "32px";
          menuSpecificVars.existingDiv.style.left = "0%";
          menuSpecificVars.existingDiv.style.overflowY = "auto";
          menuSpecificVars.existingDiv.style.overflowX = "hidden";

          menuSpecificVars.existingShaderHolder.appendChild(
            menuSpecificVars.existingDiv
          );

          Object.keys(this.shaders).forEach((shader) => {
            const shaderDiv = document.createElement("div");
            shaderDiv.style.width = "100%";
            shaderDiv.style.height = "48px";
            shaderDiv.style.color = "#ffffff";
            shaderDiv.style.marginBottom = "2px";
            shaderDiv.style.backgroundColor = this._menuBarBackground;

            shaderDiv.style.cursor = "pointer";

            shaderDiv.onclick = () => {
              this.saveShader(shader, this.savingData);
              closeFunc();
            };

            menuSpecificVars.existingDiv.appendChild(shaderDiv);

            const modifyDate = new Date(this.shaders[shader].modifyDate);

            const nameDiv = document.createElement("div");
            nameDiv.style.position = "absolute";
            nameDiv.style.width = "100%";
            nameDiv.style.height = "48px";
            nameDiv.style.transform = "translate(5%,5%)";
            nameDiv.style.textAlign = "left";
            nameDiv.innerText = `${shader}\nModified: ${modifyDate.getDate()}/${modifyDate.getMonth() + 1}/${modifyDate.getFullYear()} ${modifyDate.getHours() % 12 == 0 ? 12 : modifyDate.getHours() % 12}:${modifyDate.getMinutes()} ${modifyDate.getHours() > 11 ? "PM" : "AM"}`;

            shaderDiv.appendChild(nameDiv);
          });
          break;

        case "manager":
          //Resize this manager to fit better
          resizeFunc(25, 30);
          //A container containing already existing shaders and some text to accompony them.
          menuSpecificVars.existingShaderHolder = document.createElement("div");

          menuSpecificVars.existingShaderHolder.style.width = "100%";
          menuSpecificVars.existingShaderHolder.style.height = "100%";
          menuSpecificVars.existingShaderHolder.style.left = "0%";
          menuSpecificVars.existingShaderHolder.style.backgroundColor =
            "#00000000";
          menuSpecificVars.existingShaderHolder.style.position = "absolute";

          shaderPanel.appendChild(menuSpecificVars.existingShaderHolder);

          menuSpecificVars.existingText = document.createElement("div");

          menuSpecificVars.existingText.style.width = "100%";
          menuSpecificVars.existingText.style.height = "48px";
          menuSpecificVars.existingText.style.top = "0px";
          menuSpecificVars.existingText.style.left = "0px";
          menuSpecificVars.existingText.style.position = "absolute";
          menuSpecificVars.existingText.style.transform = "translate(0%,8px)";
          menuSpecificVars.existingText.style.color = this._textColor;

          menuSpecificVars.existingText.style.fontSize = "16px";

          menuSpecificVars.existingText.innerHTML = "Project Shaders";

          menuSpecificVars.existingShaderHolder.appendChild(
            menuSpecificVars.existingText
          );

          //The background for existing shaders
          menuSpecificVars.existingDivBackground =
            document.createElement("div");

          menuSpecificVars.existingDivBackground.style.backgroundColor =
            this._menuBarBackground;
          menuSpecificVars.existingDivBackground.style.width = "100%";
          menuSpecificVars.existingDivBackground.style.height =
            "calc(100% - 32px)";
          menuSpecificVars.existingDivBackground.style.position = "absolute";
          menuSpecificVars.existingDivBackground.style.top = "32px";
          menuSpecificVars.existingDivBackground.style.left = "0%";
          menuSpecificVars.existingDivBackground.style.filter = "opacity(25%)";

          menuSpecificVars.existingShaderHolder.appendChild(
            menuSpecificVars.existingDivBackground
          );

          //The container for existing shaders
          menuSpecificVars.existingDiv = document.createElement("div");

          menuSpecificVars.existingDiv.style.backgroundColor = "#00000000";
          menuSpecificVars.existingDiv.style.width = "100%";
          menuSpecificVars.existingDiv.style.height = "calc(100% - 32px)";
          menuSpecificVars.existingDiv.style.position = "absolute";
          menuSpecificVars.existingDiv.style.top = "32px";
          menuSpecificVars.existingDiv.style.left = "0%";
          menuSpecificVars.existingDiv.style.overflowY = "auto";
          menuSpecificVars.existingDiv.style.overflowX = "hidden";

          menuSpecificVars.existingShaderHolder.appendChild(
            menuSpecificVars.existingDiv
          );

          Object.keys(this.shaders).forEach((shader) => {
            const shaderDiv = document.createElement("div");
            shaderDiv.style.width = "100%";
            shaderDiv.style.height = "48px";
            shaderDiv.style.color = "#ffffff";
            shaderDiv.style.marginBottom = "2px";
            shaderDiv.style.backgroundColor = this._menuBarBackground;

            shaderDiv.style.cursor = "pointer";

            menuSpecificVars.existingDiv.appendChild(shaderDiv);

            const modifyDate = new Date(this.shaders[shader].modifyDate);

            const nameDiv = document.createElement("div");
            nameDiv.style.position = "relative";
            nameDiv.style.width = "100%";
            nameDiv.style.height = "48px";
            nameDiv.style.top = "0px";
            nameDiv.style.left = "0px";
            nameDiv.style.transform = "translate(5%,5%)";
            nameDiv.style.textAlign = "left";
            nameDiv.innerText = `${shader}\nModified: ${modifyDate.getDate()}/${modifyDate.getMonth() + 1}/${modifyDate.getFullYear()} ${modifyDate.getHours() % 12 == 0 ? 12 : modifyDate.getHours() % 12}:${modifyDate.getMinutes()} ${modifyDate.getHours() > 11 ? "PM" : "AM"}`;

            shaderDiv.appendChild(nameDiv);

            //The actual container no filter to avoid buggy things
            const closeMenu = document.createElement("div");

            closeMenu.style.width = "1.75rem";
            closeMenu.style.height = "1.75rem";
            closeMenu.style.backgroundColor = this._buttonShadow;
            closeMenu.style.position = "absolute";
            closeMenu.style.left = "calc(100% - 2rem)";
            closeMenu.style.borderRadius = "50%";
            closeMenu.style.alignItems = "center";
            closeMenu.style.justifyContent = "center";
            closeMenu.style.display = "flex";
            closeMenu.style.cursor = "pointer";
            closeMenu.style.transition = "all 0.15s ease-out";
            closeMenu.style.transform = "translate(-50%,-135%)";

            //Animation stuffs
            closeMenu.onmouseenter = () => {
              closeMenu.style.transform =
                "translate(-50%,-135%) scale(1.1,1.1)";
            };

            //More animation
            closeMenu.onmouseleave = () => {
              closeMenu.style.transform = "translate(-50%,-135%) scale(1,1)";
            };

            //Just the close button
            closeMenu.onclick = () => {
              menuSpecificVars.existingDiv.removeChild(shaderDiv);
              this.deleteShader(shader);
            };

            shaderDiv.appendChild(closeMenu);

            //The close button for the menu
            const xImage = document.createElement("img");
            xImage.src =
              "data:image/svg+xml;base64,PHN2ZyBpZD0iTGF5ZXJfMSIgZGF0YS1uYW1lPSJMYXllciAxIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA3LjQ4IDcuNDgiPjxkZWZzPjxzdHlsZT4uY2xzLTF7ZmlsbDpub25lO3N0cm9rZTojZmZmO3N0cm9rZS1saW5lY2FwOnJvdW5kO3N0cm9rZS1saW5lam9pbjpyb3VuZDtzdHJva2Utd2lkdGg6MnB4O308L3N0eWxlPjwvZGVmcz48dGl0bGU+aWNvbi0tYWRkPC90aXRsZT48bGluZSBjbGFzcz0iY2xzLTEiIHgxPSIzLjc0IiB5MT0iNi40OCIgeDI9IjMuNzQiIHkyPSIxIi8+PGxpbmUgY2xhc3M9ImNscy0xIiB4MT0iMSIgeTE9IjMuNzQiIHgyPSI2LjQ4IiB5Mj0iMy43NCIvPjwvc3ZnPg==";

            xImage.style.width = "0.75rem";
            xImage.style.height = "0.75rem";
            xImage.style.margin = "0.25rem";
            xImage.style.transform = "rotate(45deg)";

            closeMenu.appendChild(xImage);
          });
          break;

        default:
          break;
      }
    }

    getAllShaders() {
      return JSON.stringify(this.shaderMenu())
    }

    //?Cubemaps
    createCubemap(args) {
      const cubemapSetup = [
        {
          texture:args.left,
          side:gl.TEXTURE_CUBE_MAP_NEGATIVE_X
        },
        {
          texture:args.right,
          side:gl.TEXTURE_CUBE_MAP_POSITIVE_X
        },
        {
          texture:args.back,
          side:gl.TEXTURE_CUBE_MAP_NEGATIVE_Z
        },
        {
          texture:args.front,
          side:gl.TEXTURE_CUBE_MAP_POSITIVE_Z
        },
        {
          texture:args.bottom,
          side:gl.TEXTURE_CUBE_MAP_NEGATIVE_Y
        },
        {
          texture:args.top,
          side:gl.TEXTURE_CUBE_MAP_POSITIVE_Y
        },
      ];

      this.penPlusCubemap[args.name] = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.penPlusCubemap[args.name]);

      for (let faceID = 0; faceID < 6; faceID++) {
        const curCostume = this.penPlusCostumeLibrary[cubemapSetup[faceID].texture]
        const textureData = this.textureFunctions.getTextureData(
          curCostume.texture,
          curCostume.width,
          curCostume.height
        );;

        gl.bindTexture(gl.TEXTURE_CUBE_MAP, this.penPlusCubemap[args.name]);
        gl.texImage2D(cubemapSetup[faceID].texture.side, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, textureData);

        gl.texParameteri(
          gl.TEXTURE_CUBE_MAP,
          gl.TEXTURE_MIN_FILTER,
          currentFilter
        );
        gl.texParameteri(
          gl.TEXTURE_CUBE_MAP,
          gl.TEXTURE_MAG_FILTER,
          currentFilter
        );
      }
    }
  }

  //? A small hack to stop the renderer from immediatly dying. And to allow for immediate use
  {
    if (!Scratch.vm.renderer._penSkinId) {
      Scratch.vm.renderer.createPenSkin();
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
