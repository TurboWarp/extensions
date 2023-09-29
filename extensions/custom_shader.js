(function(Scratch) {
    'use strict';
    if (!Scratch.extensions.unsandboxed) {
        throw new Error('sprite-shader must run unsandboxed');
    }
    const vm = Scratch.vm;
    const renderer = vm.renderer;
    const gl = renderer._gl;
    const cast = Scratch.Cast;
    const twgl = renderer.exports.twgl;
    var uniform = {};
    class SM {}
    SM.EFFECT_INFO = {
        /** Color effect */
        color: {
            uniformName: 'u_color',
            mask: 1 << 0,
            converter: x => (x / 200) % 1,
            shapeChanges: false
        },
        /** Fisheye effect */
        fisheye: {
            uniformName: 'u_fisheye',
            mask: 1 << 1,
            converter: x => Math.max(0, (x + 100) / 100),
            shapeChanges: true
        },
        /** Whirl effect */
        whirl: {
            uniformName: 'u_whirl',
            mask: 1 << 2,
            converter: x => -x * Math.PI / 180,
            shapeChanges: true
        },
        /** Pixelate effect */
        pixelate: {
            uniformName: 'u_pixelate',
            mask: 1 << 3,
            converter: x => Math.abs(x) / 10,
            shapeChanges: true
        },
        /** Mosaic effect */
        mosaic: {
            uniformName: 'u_mosaic',
            mask: 1 << 4,
            converter: x => {
                x = Math.round((Math.abs(x) + 10) / 10);
                /** @todo cap by Math.min(srcWidth, srcHeight) */
                return Math.max(1, Math.min(x, 512));
            },
            shapeChanges: true
        },
        /** Brightness effect */
        brightness: {
            uniformName: 'u_brightness',
            mask: 1 << 5,
            converter: x => Math.max(-100, Math.min(x, 100)) / 100,
            shapeChanges: false
        },
        /** Ghost effect */
        ghost: {
            uniformName: 'u_ghost',
            mask: 1 << 6,
            converter: x => 1 - (Math.max(0, Math.min(x, 100)) / 100),
            shapeChanges: false
        }
    };
    SM.EFFECTS = Object.keys(SM.EFFECT_INFO);
    SM.DRAW_MODE = {
        /**
         * Draw normally. Its output will use premultiplied alpha.
         */
        default: 'default',

        /**
         * Draw with non-premultiplied alpha. Useful for reading pixels from GL into an ImageData object.
         */
        straightAlpha: 'straightAlpha',

        /**
         * Draw a silhouette using a solid color.
         */
        silhouette: 'silhouette',

        /**
         * Draw only the parts of the drawable which match a particular color.
         */
        colorMask: 'colorMask',

        /**
         * Draw a line with caps.
         */
        line: 'line',

        /**
         * Draw the background in a certain color. Must sometimes be used instead of gl.clear.
         */
        background: 'background'
    };
    renderer.fragUniformCode = "";
    renderer.vertUniformCode = "";
    renderer.shader_frag_addCode = "";
    renderer.shader_vert_addCode = "";
    renderer.reloadCode = (function() {
        var frag = `precision mediump float;
      ` + renderer.fragUniformCode + `
      #ifdef DRAW_MODE_silhouette
    uniform vec4 u_silhouetteColor;
    #else // DRAW_MODE_silhouette
    # ifdef ENABLE_color
    uniform float u_color;
    # endif // ENABLE_color
    # ifdef ENABLE_brightness
    uniform float u_brightness;
    # endif // ENABLE_brightness
    #endif // DRAW_MODE_silhouette

    #ifdef DRAW_MODE_colorMask
    uniform vec3 u_colorMask;
    uniform float u_colorMaskTolerance;
    #endif // DRAW_MODE_colorMask

    #ifdef ENABLE_fisheye
    uniform float u_fisheye;
    #endif // ENABLE_fisheye
    #ifdef ENABLE_whirl
    uniform float u_whirl;
    #endif // ENABLE_whirl
    #ifdef ENABLE_pixelate
    uniform float u_pixelate;
    uniform vec2 u_skinSize;
    #endif // ENABLE_pixelate
    #ifdef ENABLE_mosaic
    uniform float u_mosaic;
    #endif // ENABLE_mosaic
    #ifdef ENABLE_ghost
    uniform float u_ghost;
    #endif // ENABLE_ghost

    #ifdef DRAW_MODE_line
    varying vec4 v_lineColor;
    varying float v_lineThickness;
    varying float v_lineLength;
    #endif // DRAW_MODE_line

    #ifdef DRAW_MODE_background
    uniform vec4 u_backgroundColor;
    #endif // DRAW_MODE_background

    uniform sampler2D u_skin;

    #ifndef DRAW_MODE_background
    varying vec2 v_texCoord;
    #endif

    // Add this to divisors to prevent division by 0, which results in NaNs propagating through calculations.
    // Smaller values can cause problems on some mobile devices.
    const float epsilon = 1e-3;

    #if !defined(DRAW_MODE_silhouette) && (defined(ENABLE_color))
    // Branchless color conversions based on code from:
    // http://www.chilliant.com/rgb2hsv.html by Ian Taylor
    // Based in part on work by Sam Hocevar and Emil Persson
    // See also: https://en.wikipedia.org/wiki/HSL_and_HSV#Formal_derivation


    // Convert an RGB color to Hue, Saturation, and Value.
    // All components of input and output are expected to be in the [0,1] range.
    vec3 convertRGB2HSV(vec3 rgb)
    {
        // Hue calculation has 3 cases, depending on which RGB component is largest, and one of those cases involves a "mod"
        // operation. In order to avoid that "mod" we split the M==R case in two: one for G<B and one for B>G. The B>G case
        // will be calculated in the negative and fed through abs() in the hue calculation at the end.
        // See also: https://en.wikipedia.org/wiki/HSL_and_HSV#Hue_and_chroma
        const vec4 hueOffsets = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);

        // temp1.xy = sort B & G (largest first)
        // temp1.z = the hue offset we'll use if it turns out that R is the largest component (M==R)
        // temp1.w = the hue offset we'll use if it turns out that R is not the largest component (M==G or M==B)
        vec4 temp1 = rgb.b > rgb.g ? vec4(rgb.bg, hueOffsets.wz) : vec4(rgb.gb, hueOffsets.xy);

        // temp2.x = the largest component of RGB ("M" / "Max")
        // temp2.yw = the smaller components of RGB, ordered for the hue calculation (not necessarily sorted by magnitude!)
        // temp2.z = the hue offset we'll use in the hue calculation
        vec4 temp2 = rgb.r > temp1.x ? vec4(rgb.r, temp1.yzx) : vec4(temp1.xyw, rgb.r);

        // m = the smallest component of RGB ("min")
        float m = min(temp2.y, temp2.w);

        // Chroma = M - m
        float C = temp2.x - m;

        // Value = M
        float V = temp2.x;

        return vec3(
            abs(temp2.z + (temp2.w - temp2.y) / (6.0 * C + epsilon)), // Hue
            C / (temp2.x + epsilon), // Saturation
            V); // Value
    }

    vec3 convertHue2RGB(float hue)
    {
        float r = abs(hue * 6.0 - 3.0) - 1.0;
        float g = 2.0 - abs(hue * 6.0 - 2.0);
        float b = 2.0 - abs(hue * 6.0 - 4.0);
        return clamp(vec3(r, g, b), 0.0, 1.0);
    }

    vec3 convertHSV2RGB(vec3 hsv)
    {
        vec3 rgb = convertHue2RGB(hsv.x);
        float c = hsv.z * hsv.y;
        return rgb * c + hsv.z - c;
    }
    #endif // !defined(DRAW_MODE_silhouette) && (defined(ENABLE_color))

    const vec2 kCenter = vec2(0.5, 0.5);

    void main()
    {
        #if !(defined(DRAW_MODE_line) || defined(DRAW_MODE_background))
        vec2 texcoord0 = v_texCoord;

        #ifdef ENABLE_mosaic
        texcoord0 = fract(u_mosaic * texcoord0);
        #endif // ENABLE_mosaic

        #ifdef ENABLE_pixelate
        {
            // TODO: clean up "pixel" edges
            vec2 pixelTexelSize = u_skinSize / u_pixelate;
            texcoord0 = (floor(texcoord0 * pixelTexelSize) + kCenter) / pixelTexelSize;
        }
        #endif // ENABLE_pixelate

        #ifdef ENABLE_whirl
        {
            const float kRadius = 0.5;
            vec2 offset = texcoord0 - kCenter;
            float offsetMagnitude = length(offset);
            float whirlFactor = max(1.0 - (offsetMagnitude / kRadius), 0.0);
            float whirlActual = u_whirl * whirlFactor * whirlFactor;
            float sinWhirl = sin(whirlActual);
            float cosWhirl = cos(whirlActual);
            mat2 rotationMatrix = mat2(
                cosWhirl, -sinWhirl,
                sinWhirl, cosWhirl
            );

            texcoord0 = rotationMatrix * offset + kCenter;
        }
        #endif // ENABLE_whirl

        #ifdef ENABLE_fisheye
        {
            vec2 vec = (texcoord0 - kCenter) / kCenter;
            float vecLength = length(vec);
            float r = pow(min(vecLength, 1.0), u_fisheye) * max(1.0, vecLength);
            vec2 unit = vec / vecLength;

            texcoord0 = kCenter + r * unit * kCenter;
        }
        #endif // ENABLE_fisheye

        gl_FragColor = texture2D(u_skin, texcoord0);
        
        #if defined(ENABLE_color) || defined(ENABLE_brightness)
        // Divide premultiplied alpha values for proper color processing
        // Add epsilon to avoid dividing by 0 for fully transparent pixels
        gl_FragColor.rgb = clamp(gl_FragColor.rgb / (gl_FragColor.a + epsilon), 0.0, 1.0);

        #ifdef ENABLE_color
        {
            vec3 hsv = convertRGB2HSV(gl_FragColor.xyz);

            // this code forces grayscale values to be slightly saturated
            // so that some slight change of hue will be visible
            const float minLightness = 0.11 / 2.0;
            const float minSaturation = 0.09;
            if (hsv.z < minLightness) hsv = vec3(0.0, 1.0, minLightness);
            else if (hsv.y < minSaturation) hsv = vec3(0.0, minSaturation, hsv.z);

            hsv.x = mod(hsv.x + u_color, 1.0);
            if (hsv.x < 0.0) hsv.x += 1.0;

            gl_FragColor.rgb = convertHSV2RGB(hsv);
        }
        #endif // ENABLE_color

        #ifdef ENABLE_brightness
        gl_FragColor.rgb = clamp(gl_FragColor.rgb + vec3(u_brightness), vec3(0), vec3(1));
        #endif // ENABLE_brightness

        // Re-multiply color values
        gl_FragColor.rgb *= gl_FragColor.a + epsilon;

        #endif // defined(ENABLE_color) || defined(ENABLE_brightness)

        #ifdef ENABLE_ghost
        gl_FragColor *= u_ghost;
        #endif // ENABLE_ghost

        #ifdef DRAW_MODE_silhouette
        // Discard fully transparent pixels for stencil test
        if (gl_FragColor.a == 0.0) {
            discard;
        }
        // switch to u_silhouetteColor only AFTER the alpha test
        gl_FragColor = u_silhouetteColor;
        #else // DRAW_MODE_silhouette

        #ifdef DRAW_MODE_colorMask
        vec3 maskDistance = abs(gl_FragColor.rgb - u_colorMask);
        vec3 colorMaskTolerance = vec3(u_colorMaskTolerance, u_colorMaskTolerance, u_colorMaskTolerance);
        if (any(greaterThan(maskDistance, colorMaskTolerance)))
        {
            discard;
        }
        #endif // DRAW_MODE_colorMask
        #endif // DRAW_MODE_silhouette

        #ifdef DRAW_MODE_straightAlpha
        // Un-premultiply alpha.
        gl_FragColor.rgb /= gl_FragColor.a + epsilon;
        #endif

        #endif // !(defined(DRAW_MODE_line) || defined(DRAW_MODE_background))

        #ifdef DRAW_MODE_line
        // Maaaaagic antialiased-line-with-round-caps shader.

        // "along-the-lineness". This increases parallel to the line.
        // It goes from negative before the start point, to 0.5 through the start to the end, then ramps up again
        // past the end point.
        float d = ((v_texCoord.x - clamp(v_texCoord.x, 0.0, v_lineLength)) * 0.5) + 0.5;

        // Distance from (0.5, 0.5) to (d, the perpendicular coordinate). When we're in the middle of the line,
        // d will be 0.5, so the distance will be 0 at points close to the line and will grow at points further from it.
        // For the "caps", d will ramp down/up, giving us rounding.
        // See https://www.youtube.com/watch?v=PMltMdi1Wzg for a rough outline of the technique used to round the lines.
        float line = distance(vec2(0.5), vec2(d, v_texCoord.y)) * 2.0;
        // Expand out the line by its thickness.
        line -= ((v_lineThickness - 1.0) * 0.5);
        // Because "distance to the center of the line" decreases the closer we get to the line, but we want more opacity
        // the closer we are to the line, invert it.
        gl_FragColor = v_lineColor * clamp(1.0 - line, 0.0, 1.0);
        #endif // DRAW_MODE_line

        #ifdef DRAW_MODE_background
        gl_FragColor = u_backgroundColor;
        #endif
        ` + renderer.shader_frag_addCode + `
        }

      `;
        var vert = `precision mediump float;
      ` + renderer.vertUniformCode + `
      #ifdef DRAW_MODE_line
    uniform vec2 u_stageSize;
    attribute vec2 a_lineThicknessAndLength;
    attribute vec4 a_penPoints;
    attribute vec4 a_lineColor;

    varying vec4 v_lineColor;
    varying float v_lineThickness;
    varying float v_lineLength;
    varying vec4 v_penPoints;

    // Add this to divisors to prevent division by 0, which results in NaNs propagating through calculations.
    // Smaller values can cause problems on some mobile devices.
    const float epsilon = 1e-3;
    #endif

    #if !(defined(DRAW_MODE_line) || defined(DRAW_MODE_background))
    uniform mat4 u_projectionMatrix;
    uniform mat4 u_modelMatrix;
    attribute vec2 a_texCoord;
    #endif

    attribute vec2 a_position;

    varying vec2 v_texCoord;

    void main() {
        #ifdef DRAW_MODE_line
        // Calculate a rotated ("tight") bounding box around the two pen points.
        // Yes, we're doing this 6 times (once per vertex), but on actual GPU hardware,
        // it's still faster than doing it in JS combined with the cost of uniformMatrix4fv.

        // Expand line bounds by sqrt(2) / 2 each side-- this ensures that all antialiased pixels
        // fall within the quad, even at a 45-degree diagonal
        vec2 position = a_position;
        float expandedRadius = (a_lineThicknessAndLength.x * 0.5) + 1.4142135623730951;

        // The X coordinate increases along the length of the line. It's 0 at the center of the origin point
        // and is in pixel-space (so at n pixels along the line, its value is n).
        v_texCoord.x = mix(0.0, a_lineThicknessAndLength.y + (expandedRadius * 2.0), a_position.x) - expandedRadius;
        // The Y coordinate is perpendicular to the line. It's also in pixel-space.
        v_texCoord.y = ((a_position.y - 0.5) * expandedRadius) + 0.5;

        position.x *= a_lineThicknessAndLength.y + (2.0 * expandedRadius);
        position.y *= 2.0 * expandedRadius;

        // 1. Center around first pen point
        position -= expandedRadius;

        // 2. Rotate quad to line angle
        vec2 pointDiff = a_penPoints.zw;
        // Ensure line has a nonzero length so it's rendered properly
        // As long as either component is nonzero, the line length will be nonzero
        // If the line is zero-length, give it a bit of horizontal length
        pointDiff.x = (abs(pointDiff.x) < epsilon && abs(pointDiff.y) < epsilon) ? epsilon : pointDiff.x;
        // We're applying the standard rotation matrix formula to the position to rotate the quad to the line angle
        // pointDiff can hold large values so we must divide by u_lineLength instead of calling GLSL's normalize function:
        // https://asawicki.info/news_1596_watch_out_for_reduced_precision_normalizelength_in_opengl_es
        vec2 normalized = pointDiff / max(a_lineThicknessAndLength.y, epsilon);
        position = mat2(normalized.x, normalized.y, -normalized.y, normalized.x) * position;

        // 3. Translate quad
        position += a_penPoints.xy;

        // 4. Apply view transform
        position *= 2.0 / u_stageSize;
        gl_Position = vec4(position, 0, 1);

        v_lineColor = a_lineColor;
        v_lineThickness = a_lineThicknessAndLength.x;
        v_lineLength = a_lineThicknessAndLength.y;
        v_penPoints = a_penPoints;
        #elif defined(DRAW_MODE_background)
        gl_Position = vec4(a_position * 2.0, 0, 1);
        #else
        gl_Position = u_projectionMatrix * u_modelMatrix * vec4(a_position, 0, 1);
        v_texCoord = a_texCoord;
        #endif
        ` + renderer.shader_vert_addCode + `
    }

      `;
        renderer.shader_frag = frag;
        renderer.shader_vert = vert;
    });
    renderer.setUniforms=(function(drawableID,uniform){
        const drawable=this._allDrawables[drawableID];
        if(!drawable) return;
        drawable._uniforms=Object.assign(drawable._uniforms,uniform)
    });
    renderer.reloadCode();
    renderer._shaderManager.reloadShader = (function() {
        if (renderer._shaderManager._shaderCache.background[0]) {
            gl.deleteProgram(renderer._shaderManager._shaderCache.background[0].program);
            renderer._shaderManager._shaderCache.background.length -= 1;
        }
        if (renderer._shaderManager._shaderCache.default[0]) {
            gl.deleteProgram(renderer._shaderManager._shaderCache.default[0].program);
            renderer._shaderManager._shaderCache.
            default.length -= 1;
        }
        if (renderer._shaderManager._shaderCache.straightAlpha[0]) {
            gl.deleteProgram(renderer._shaderManager._shaderCache.straightAlpha[0].program);
            renderer._shaderManager._shaderCache.straightAlpha.length -= 1;
        }
        if (renderer._shaderManager._shaderCache.silhouette[0]) {
            gl.deleteProgram(renderer._shaderManager._shaderCache.silhouette[0].program);
            renderer._shaderManager._shaderCache.silhouette.length -= 1;
        }
        if (renderer._shaderManager._shaderCache.colorMask[0]) {
            gl.deleteProgram(renderer._shaderManager._shaderCache.colorMask[0].program);
            renderer._shaderManager._shaderCache.colorMask.length -= 1;
        }
        if (renderer._shaderManager._shaderCache.line[0]) {
            gl.deleteProgram(renderer._shaderManager._shaderCache.line[0].program);
            renderer._shaderManager._shaderCache.line.length -= 1;
        }
        renderer.reloadCode();
    });
    renderer._shaderManager._buildShader = (function(drawMode, effectBits) {
        const numEffects = SM.EFFECTS.length;

        const defines = [`#define DRAW_MODE_${drawMode}`];
        for (let index = 0; index < numEffects; ++index) {
            if ((effectBits & (1 << index)) !== 0) {
                defines.push(`#define ENABLE_${SM.EFFECTS[index]}`);
            }
        }

        const definesText = `${defines.join('\n')}\n`;

        const vsFullText = definesText + renderer.shader_vert;
        const fsFullText = definesText + renderer.shader_frag;

        if(!twgl.createProgramInfo(this._gl, [vsFullText, fsFullText])){
            renderer.fragUniformCode = "";
            renderer.vertUniformCode = "";
            renderer.shader_frag_addCode = "";
            renderer.shader_vert_addCode = "";
            renderer.reloadCode();
            return renderer._shaderManager._buildShader(drawMode,effectBits);
        }
        return twgl.createProgramInfo(this._gl, [vsFullText, fsFullText]);
    });
    class customshader {
        getInfo() {
            return {
                id: 'customshader',
                name: 'Custom-Shader',
                blocks: [{
                        opcode: 'opCodeAddFragCode',
                        text: 'add [code] to frag',
                        blockType: Scratch.BlockType.COMMAND,
                        filter: [Scratch.TargetType.SPRITE],
                        arguments: {
                            code: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ""
                            }
                        }
                    },
                    {
                        opcode: 'opCodeAddVertCode',
                        text: 'add [code] to vert',
                        blockType: Scratch.BlockType.COMMAND,
                        filter: [Scratch.TargetType.SPRITE],
                        arguments: {
                            code: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ""
                            }
                        }
                    },
                    {
                        opcode: 'opCodeAddFragUniformCode',
                        text: 'add [code] to uniform for frag',
                        blockType: Scratch.BlockType.COMMAND,
                        filter: [Scratch.TargetType.SPRITE],
                        arguments: {
                            code: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ""
                            }
                        }
                    },
                    {
                        opcode: 'opCodeAddVertUniformCode',
                        text: 'add [code] to unfirom for vert',
                        blockType: Scratch.BlockType.COMMAND,
                        filter: [Scratch.TargetType.SPRITE],
                        arguments: {
                            code: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ""
                            }
                        }
                    },
                    {
                        opcode: 'opcodeloadshader',
                        text: 'reload shader',
                        blockType: Scratch.BlockType.COMMAND,
                        filter: [Scratch.TargetType.SPRITE],
                    },
                    {
                        opcode: 'opcodeuniform',
                        text: 'uniform [name],type[type] for [value]',
                        blockType: Scratch.BlockType.COMMAND,
                        filter: [Scratch.TargetType.SPRITE],
                        arguments: {
                            name: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ""
                            },
                            value: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: ""
                            },
                            type: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'string',
                                menu: 'type'
                            }
                        }
                    },
                    {
                        opcode: 'opcodecutlist',
                        text: '[arg0] change to list',
                        blockType: Scratch.BlockType.REPORTER,
                        filter: [Scratch.TargetType.SPRITE],
                        arguments: {
                            arg0: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: "[]"
                            }
                        },
                    },
                    {
                        opcode: 'opcodeshowfragcode',
                        text: 'show frag',
                        blockType: Scratch.BlockType.REPORTER,
                    },
                    {
                        opcode: 'opcodeshowvertcode',
                        text: 'show vert',
                        blockType: Scratch.BlockType.REPORTER,
                    },
                ],
                menus: {
                    type: {
                        acceptReporters: true,
                        items: ['string', 'boolean', 'number']
                    }
                }
            };
        }
        opcodeshowvertcode(args) {
            return renderer.shader_vert;
        }
        opcodeshowfragcode(args) {
            return renderer.shader_frag;
        }
        opcodecutlist({
            arg0
        }) {
            return arg0.split(",");
        }
        opCodeAddFragUniformCode({code}) {
            renderer.fragUniformCode = code;
        }
        opCodeAddVertUniformCode({code}) {
            renderer.vertUniformCode = code;
        }
        opcodeuniform({name,type,value}, {target}) {
            var uniform={}
            switch (type) {
                case 'string':
                    uniform[name]=cast.toString(value);
                    renderer.setUniforms(target.drawableID,uniform);
                    break;
                case 'boolean':
                    uniform[name]=cast.toBoolean(value);
                    renderer.setUniforms(target.drawableID,uniform);
                    break;
                case 'number':
                    uniform[name]=cast.toNumber(value);
                    renderer.setUniforms(target.drawableID,uniform);
                    break;
            }

        }
        opcodeloadshader(args,{target}) {
            renderer._shaderManager.reloadShader();
            vm.renderer.dirty = true;
        }
        opCodeAddFragCode({code}, {
            target
        }) {
            renderer.shader_frag_addCode = code;
        }
        opCodeAddVertCode({code}, {
            target
        }) {
            renderer.shader_vert_addCode = code;
        }
    }
    Scratch.extensions.register(new customshader());
})(Scratch);

/*
				   _ooOoo_
                  o8888888o
                  88" . "88
                  (| -_- |)
                  O\  =  /O
               ____/`---'\____
             .'  \\|     |//  `.
            /  \\|||  :  |||//  \
           |  _|||||-卍- |||||-  \
           |   | \\\  -  /// |   |
           | \_|  ''\---/''  |   |
           \  .-\__  `-`  ___/-. /
         ___`. .'  /--.--\  `. . ____ 
      ."" '<  `.___\_<|>_/___.'  >'"".\ 
     | | :  `- \`.;`\ _ /`;.`/ - ` : | \
     \  \ `-.   \_ __\ /__ _/   .-` /  /
======`-.____`-.___\_____/___.-`____.-'======
                   `=---='					 
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
*/