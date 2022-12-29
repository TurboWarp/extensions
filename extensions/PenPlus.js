(function(Scratch) {
  'use strict';
  if (!Scratch.extensions.unsandboxed) {
    throw new Error('Woah hold up! Pen Plus must be run UNSANDBOXED!');
    alert("Woah hold up! Pen Plus must be run UNSANDBOXED!")
  }

  var canvas = Scratch.renderer.canvas
  var gl = Scratch.renderer._gl


  /*
$$$$$$$\  $$\   $$\  $$$$$$\   $$$$$$\        $$$$$$$$\  $$$$$$\        $$$$$$$$\ $$$$$$\ $$\   $$\ 
$$  __$$\ $$ |  $$ |$$  __$$\ $$  __$$\       \__$$  __|$$  __$$\       $$  _____|\_$$  _|$$ |  $$ |
$$ |  $$ |$$ |  $$ |$$ /  \__|$$ /  \__|         $$ |   $$ /  $$ |      $$ |        $$ |  \$$\ $$  |
$$$$$$$\ |$$ |  $$ |$$ |$$$$\ \$$$$$$\           $$ |   $$ |  $$ |      $$$$$\      $$ |   \$$$$  / 
$$  __$$\ $$ |  $$ |$$ |\_$$ | \____$$\          $$ |   $$ |  $$ |      $$  __|     $$ |   $$  $$<  
$$ |  $$ |$$ |  $$ |$$ |  $$ |$$\   $$ |         $$ |   $$ |  $$ |      $$ |        $$ |  $$  /\$$\ 
$$$$$$$  |\$$$$$$  |\$$$$$$  |\$$$$$$  |         $$ |    $$$$$$  |      $$ |      $$$$$$\ $$ /  $$ |
\_______/  \______/  \______/  \______/          \__|    \______/       \__|      \______|\__|  \__|
                                                                                                    
Should've Fixed Compile HTML
Has mixed results Most computers and browsers work but some reject it?                    
QUICK FIX added clamping because some textures require it?                                                                              
*/
var Penwidth = 64
var PenHeight = 64
var screenwidth = 480
var screenheight = 360
var stamprotation = 90

//matrix stuff from webglfundamentals.org
var m4 = {
  multiply: function(a, b) {
      var b00 = b[0 * 4 + 0];
      var b01 = b[0 * 4 + 1];
      var b02 = b[0 * 4 + 2];
      var b03 = b[0 * 4 + 3];
      var b10 = b[1 * 4 + 0];
      var b11 = b[1 * 4 + 1];
      var b12 = b[1 * 4 + 2];
      var b13 = b[1 * 4 + 3];
      var b20 = b[2 * 4 + 0];
      var b21 = b[2 * 4 + 1];
      var b22 = b[2 * 4 + 2];
      var b23 = b[2 * 4 + 3];
      var b30 = b[3 * 4 + 0];
      var b31 = b[3 * 4 + 1];
      var b32 = b[3 * 4 + 2];
      var b33 = b[3 * 4 + 3];
      var a00 = a[0 * 4 + 0];
      var a01 = a[0 * 4 + 1];
      var a02 = a[0 * 4 + 2];
      var a03 = a[0 * 4 + 3];
      var a10 = a[1 * 4 + 0];
      var a11 = a[1 * 4 + 1];
      var a12 = a[1 * 4 + 2];
      var a13 = a[1 * 4 + 3];
      var a20 = a[2 * 4 + 0];
      var a21 = a[2 * 4 + 1];
      var a22 = a[2 * 4 + 2];
      var a23 = a[2 * 4 + 3];
      var a30 = a[3 * 4 + 0];
      var a31 = a[3 * 4 + 1];
      var a32 = a[3 * 4 + 2];
      var a33 = a[3 * 4 + 3];
   
      return [
        b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30,
        b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31,
        b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32,
        b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33,
        b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30,
        b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31,
        b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32,
        b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33,
        b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30,
        b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31,
        b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32,
        b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33,
        b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30,
        b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31,
        b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32,
        b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33,
      ];
    },
  translation: function(tx, ty, tz) {
      return [
         1,  0,  0,  0,
         0,  1,  0,  0,
         0,  0,  1,  0,
         tx, ty, tz, 1,
      ];
    },
   
    xRotation: function(angleInRadians) {
      var c = Math.cos(angleInRadians);
      var s = Math.sin(angleInRadians);
   
      return [
        1, 0, 0, 0,
        0, c, s, 0,
        0, -s, c, 0,
        0, 0, 0, 1,
      ];
    },
   
    yRotation: function(angleInRadians) {
      var c = Math.cos(angleInRadians);
      var s = Math.sin(angleInRadians);
   
      return [
        c, 0, -s, 0,
        0, 1, 0, 0,
        s, 0, c, 0,
        0, 0, 0, 1,
      ];
    },
   
    zRotation: function(angleInRadians) {
      var c = Math.cos(angleInRadians);
      var s = Math.sin(angleInRadians);
   
      return [
         c, s, 0, 0,
        -s, c, 0, 0,
         0, 0, 1, 0,
         0, 0, 0, 1,
      ];
    },
   
    scaling: function(sx, sy, sz) {
      return [
        sx, 0,  0,  0,
        0, sy,  0,  0,
        0,  0, sz,  0,
        0,  0,  0,  1,
      ];
    },
    translate: function(m, tx, ty, tz) {
      return m4.multiply(m, m4.translation(tx, ty, tz));
    },
   
    xRotate: function(m, angleInRadians) {
      return m4.multiply(m, m4.xRotation(angleInRadians));
    },
   
    yRotate: function(m, angleInRadians) {
      return m4.multiply(m, m4.yRotation(angleInRadians));
    },
   
    zRotate: function(m, angleInRadians) {
      return m4.multiply(m, m4.zRotation(angleInRadians));
    },
   
    scale: function(m, sx, sy, sz) {
      return m4.multiply(m, m4.scaling(sx, sy, sz));
    },
  orthographic: function(left, right, bottom, top, near, far) {
    return [
      2 / (right - left), 0, 0, 0,
      0, 2 / (top - bottom), 0, 0,
      0, 0, 2 / (near - far), 0,
 
      (left + right) / (left - right),
      (bottom + top) / (bottom - top),
      (near + far) / (near - far),
      1,
    ];
  }
}

function fetchFrom(URL) {
return fetch(URL).then(res => res.text()).catch(err => '');
}

//bruh why could they not give the stage an id?


var canvaswidth = canvas.width
var canvasheight =  canvas.height

var textures = {}

//boring GLSL
var vertexshaderCode = [
  'attribute vec4 a_position;',
  'attribute vec2 a_texcoord;',
  'attribute vec4 aVertexColor;',
  '',
  'uniform mat4 u_matrix;',
  '',
  'varying vec2 v_texcoord;',
  'varying vec4 vColor;',
  '',
  'void main() {',
  'gl_Position = u_matrix * a_position;',
  'v_texcoord = a_texcoord;',
  'vColor = aVertexColor;',
  '}'
].join('\n');

var fragmentshaderCode = [
  'precision mediump float;',
  '',
  'varying vec2 v_texcoord;',
  'varying vec4 vColor;',
  '',
  'uniform sampler2D u_texture;',
  '',
  'void main() {',
  'gl_FragColor = texture2D(u_texture, v_texcoord) * vColor;',
  '}',
].join('\n');

var quadpositions = [
  0, 0,
  0, 1,
  1, 0,
  1, 0,
  0, 1,
  1, 1,
];

var quadcoords = [
  0, 0,
  0, 1,
  1, 0,
  1, 0,
  0, 1,
  1, 1,
];

var quadcolors = [
1.0,  1.0,  1.0,  1.0,
1.0,  1.0,  1.0,  1.0,
1.0,  1.0,  1.0,  1.0,
1.0,  1.0,  1.0,  1.0,
1.0,  1.0,  1.0,  1.0,
1.0,  1.0,  1.0,  1.0
];

var tricolors = [
  1.0,  1.0,  1.0,  1.0,
  1.0,  1.0,  1.0,  1.0,
  1.0,  1.0,  1.0,  1.0
  ];
var quadpositionBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, quadpositionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(quadpositions), gl.STATIC_DRAW);

var quadtexcoordBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, quadtexcoordBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(quadcoords), gl.STATIC_DRAW);

var quadcolorBuffer = gl.createBuffer();

var triPosBuffer = gl.createBuffer();
var triUVBuffer = gl.createBuffer();
var tricolorBuffer = gl.createBuffer();
//end of stupid code

//compile glsl shaders
var vertexShader = gl.createShader(gl.VERTEX_SHADER)
var fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)

gl.shaderSource(vertexShader, vertexshaderCode)
gl.shaderSource(fragmentShader, fragmentshaderCode)

gl.enable( gl.BLEND );
gl.blendEquation( gl.FUNC_ADD );
gl.blendFunc( gl.ONE_MINUS_CONSTANT_ALPHA, gl.ONE_MINUS_SRC_ALPHA );

gl.compileShader(vertexShader);
if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
  console.error('ERROR compiling vertex shader!', gl.getShaderInfoLog(vertexShader));
}
gl.compileShader(fragmentShader);
if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
  console.error('ERROR compiling fragment shader!', gl.getShaderInfoLog(fragmentShader));
}
//done compiling them

//program data

  var program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);
if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
  console.error('ERROR linking program!', gl.getProgramInfoLog(program));
}
gl.validateProgram(program);
if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
  console.error('ERROR validating program!', gl.getProgramInfoLog(program));
}

//end of program data

// look up where the vertex data needs to go.
var positionLocation = gl.getAttribLocation(program, "a_position");
var texcoordLocation = gl.getAttribLocation(program, "a_texcoord");
var colorLocation = gl.getAttribLocation(program, "aVertexColor");

// lookup uniforms
var matrixLocation = gl.getUniformLocation(program, "u_matrix");
var textureLocation = gl.getUniformLocation(program, "u_texture");

//cool drawing functions

function degtorad(deg) {
return deg * 0.0174533
}

function loadImageAndCreateTextureInfo(url,clamp) {
  var tex = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, tex);
  // Fill the texture with a 1x1 blue pixel.
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE,
                new Uint8Array([0, 0, 255, 255]));

  // let's assume all images are not a power of 2
  if (clamp == 'true') {
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  }
  else{
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
  }
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);

  var textureInfo = {
    width: 1,   // we don't know the size until it loads
    height: 1,
    texture: tex,
  };
  var img = new Image();
  img.addEventListener('load', function() {
    textureInfo.width = img.width;
    textureInfo.height = img.height;

    gl.bindTexture(gl.TEXTURE_2D, textureInfo.texture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
  });
  img.src = url;

  return textureInfo;
}

function drawImage(tex, texWidth, texHeight, dstX, dstY ,stamprotation) {
  gl.bindTexture(gl.TEXTURE_2D, tex);

  // Tell WebGL to use our shader program pair
  gl.useProgram(program);


  gl.bindBuffer(gl.ARRAY_BUFFER, quadcolorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(quadcolors), gl.STATIC_DRAW);
  // Setup the attributes to pull data from our buffers
  gl.bindBuffer(gl.ARRAY_BUFFER, quadpositionBuffer);
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ARRAY_BUFFER, quadtexcoordBuffer);
  gl.enableVertexAttribArray(texcoordLocation);
  gl.vertexAttribPointer(texcoordLocation, 2, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ARRAY_BUFFER, quadcolorBuffer);
  gl.enableVertexAttribArray(colorLocation); //
  gl.vertexAttribPointer(colorLocation, 4, gl.FLOAT, false, 0, 0);

  // this matrix will convert from pixels to clip space
  var matrix = m4.orthographic(0, gl.canvas.width, gl.canvas.height, 0, -1, 1);

  // this matrix will translate our quad to dstX, dstY
  matrix = m4.translate(matrix, dstX, dstY, 0);

  matrix = m4.zRotate(matrix,degtorad(stamprotation))

  // this matrix will scale our 1 unit quad
  // from 1 unit to texWidth, texHeight units
  matrix = m4.scale(matrix, texWidth, texHeight, 1);

  // Set the matrix.
  gl.uniformMatrix4fv(matrixLocation, false, matrix);

  // Tell the shader to get the texture from texture unit 0
  gl.uniform1i(textureLocation, 0);

  // draw the quad (2 triangles, 6 vertices)
  gl.drawArrays(gl.TRIANGLES, 0, 6);
}

function drawTexturedTri(tex, trianglepoints, triangleuvs) {
  gl.bindTexture(gl.TEXTURE_2D, tex);

  
  gl.bindBuffer(gl.ARRAY_BUFFER, triPosBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(trianglepoints), gl.STATIC_DRAW);

  
  gl.bindBuffer(gl.ARRAY_BUFFER, triUVBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleuvs), gl.STATIC_DRAW);

  gl.bindBuffer(gl.ARRAY_BUFFER, tricolorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(tricolors), gl.STATIC_DRAW); 
  // Tell WebGL to use our shader program pair
  gl.useProgram(program);

  // Setup the attributes to pull data from our buffers
  gl.bindBuffer(gl.ARRAY_BUFFER, triPosBuffer);
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ARRAY_BUFFER, triUVBuffer);
  gl.enableVertexAttribArray(texcoordLocation); //
  gl.vertexAttribPointer(texcoordLocation, 2, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ARRAY_BUFFER, tricolorBuffer);
  gl.enableVertexAttribArray(colorLocation); //
  gl.vertexAttribPointer(colorLocation, 4, gl.FLOAT, false, 0, 0);

  // this matrix will convert from pixels to clip space
  var matrix = m4.orthographic(0, gl.canvas.width, gl.canvas.height, 0, -1, 1);

  // this matrix will translate our quad to dstX, dstY

  // this matrix will scale our 1 unit quad
  // from 1 unit to texWidth, texHeight units

  // Set the matrix.
  gl.uniformMatrix4fv(matrixLocation, false, matrix);

  // Tell the shader to get the texture from texture unit 0
  gl.uniform1i(textureLocation, 0);

  // draw the quad (2 triangles, 6 vertices)
  gl.drawArrays(gl.TRIANGLES, 0, 3);
}


var getDataUri = function(url,callback) {
  var tempimage = new Image();
  tempimage.src = url;
  tempimage.crossOrigin="anonymous"
  console.log(url)
  tempimage.onload = function() {
      tempcanvas1.drawImage(this, 0, 0);
          // ... or get as Data URI
      callback(tempcanvas.toDataURL('image/png'));
  }
}
//end of cool drawing functions.


  class BetterPen {
    getInfo () {
      return {
        id: "betterpen",
          name: "Pen+",
          color1:'#0e9a6b',
          color2:'#0e9a6b',
          color3:'#0e9a6b',
          docsURI: 'https://www.youtube.com/playlist?list=PLdR2VVCBIN3CceUdgKWOUxFEEbLqWgCC9',
          blockIconURI: "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIzNy44NjkyMSIgaGVpZ2h0PSI0OC44NTI3MiIgdmlld0JveD0iMCwwLDM3Ljg2OTIxLDQ4Ljg1MjcyIj48ZGVmcz48cmFkaWFsR3JhZGllbnQgY3g9IjIzNy41NDM0IiBjeT0iMTg0LjAwNTYiIHI9IjkuOTg1NDkiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBpZD0iY29sb3ItMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZmZmZmZmIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjY2ZkNWU5Ii8+PC9yYWRpYWxHcmFkaWVudD48L2RlZnM+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIyMy4zMDE4MSwtMTYzLjc2MzA5KSI+PGcgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aXNQYWludGluZ0xheWVyJnF1b3Q7OnRydWV9IiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0yMjUuMTYzNTYsMTkzLjIwMDIxYzAuNTYxNTMsLTEuMTA3NDYgMi4yMzQwNCwtMy4yODU4MyAyLjIzNDA0LC0zLjI4NTgzYzAsMCAwLjU5NDQyLDEuODIzOTEgMS4yMjQ0OSwyLjU5NTc1YzAuNjMyMTIsMC43NzQzNSAyLjA4ODc4LDEuNDc0ODQgMi4wODg3OCwxLjQ3NDg0YzAsMCAtMi4xOTQ0NiwxLjI4MTQxIC0zLjMyNDIxLDEuNzI2OTVjLTEuMTEwMzIsMC40Mzc4NyAtMy4zOTcsMC45MjM2NyAtMy4zOTcsMC45MjM2N2MwLDAgMC41OTk3NCwtMi4zMDI5OSAxLjE3MzksLTMuNDM1Mzh6IiBmaWxsPSIjNGM5N2ZmIiBzdHJva2U9IiM1NzVlNzUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiLz48cGF0aCBkPSJNMjI3LjYxMTMxLDE4OS4yOTIwM2wxNC45NTE1NCwtMTUuMjcxOTNjMCwwIDIuMjA2LDAuODk1MDUgMi45NTc3NiwxLjYzMDQ3YzAuODY4OCwwLjg0OTkxIDEuOTU0ODksMy4xNzUzOCAxLjk1NDg5LDMuMTc1MzhsLTE2LjEyNjMxLDE1LjE2NTE0YzAsMCAtMi4wMDYzOSwtMS4xMjc4NiAtMi42MDkyMSwtMS44ODU2OGMtMC42NDA4MiwtMC44MDU2IC0xLjEyODY4LC0yLjgxMzM3IC0xLjEyODY4LC0yLjgxMzM3eiIgZmlsbD0idXJsKCNjb2xvci0xKSIgc3Ryb2tlPSIjNTc1ZTc1IiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0Ii8+PHBhdGggZD0iTTIzNy43NTY5OSwxNzIuOTUyMTNjMCwwIDAuOTg2MTksMS4wNTA2MiAyLjM5NjA4LC0wLjI3MDcyYzEuODAzLC0xLjY4OTc3IDQuMjMxMDUsLTUuOTAxNDcgNS40NDc0MywtNi41ODcwN2MxLjM3NDgsLTAuNzc0ODkgMy45MDQxNCwwLjIzNjM5IDMuOTA0MTQsMC4yMzYzOSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNTc1ZTc1IiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxwYXRoIGQ9Ik0yMzYuMDc5ODEsMTcyLjMxMTM1YzAsLTAuNjkwMzYgMC41NTk2NCwtMS4yNSAxLjI1LC0xLjI1YzAuNjkwMzYsMCAxLjI1LDAuNTU5NjQgMS4yNSwxLjI1YzAsMC42OTAzNiAtMC41NTk2NCwxLjI1IC0xLjI1LDEuMjVjLTAuNjkwMzYsMCAtMS4yNSwtMC41NTk2NCAtMS4yNSwtMS4yNXoiIGZpbGw9IiM1NzVlNzUiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIwLjUiIHN0cm9rZS1saW5lY2FwPSJidXR0Ii8+PHBhdGggZD0iTTI1MC45OTk3OSwxNjQuNzI4NzdjMCwwIDEuOTEzOTYsLTEuMDUxOTMgNC4yMDAwOSwxLjMyMzU4YzIuNDI2ODUsMi41MjE3MyAwLjYwNTc2LDQuNDQzNDQgMC42MDU3Niw0LjQ0MzQ0bC04LjMzMDE0LDguMjIzMzVjMCwwIC0wLjc1MDQsLTIuMDcxMTIgLTEuNTYyNDksLTIuNzk0OTRjLTAuODI1MjQsLTAuNzM1NTUgLTMuMzUwMTYsLTEuNTgzNzMgLTMuMzUwMTYsLTEuNTgzNzN6IiBmaWxsPSIjNGM5N2ZmIiBzdHJva2U9IiM1NzVlNzUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiLz48dGV4dCB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMzkuODkzMzcsMjAxLjcxMTE4KSBzY2FsZSgwLjg3MjM3LDAuODcyMzcpIiBmb250LXNpemU9IjQwIiB4bWw6c3BhY2U9InByZXNlcnZlIiBmaWxsPSIjZThlYmY0IiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0iIzU3NWU3NSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0iU2FucyBTZXJpZiIgZm9udC13ZWlnaHQ9Im5vcm1hbCIgdGV4dC1hbmNob3I9InN0YXJ0IiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHRzcGFuIHg9IjAiIGR5PSIwIj4rPC90c3Bhbj48L3RleHQ+PC9nPjwvZz48L3N2Zz48IS0tcm90YXRpb25DZW50ZXI6MTYuNjk4MTkxNTI3MDE2NDYyOjE2LjIzNjkxNDk5OTk5OTk4Mi0tPg==",

          blocks: [
            {
              opcode: "coordBlock",
              blockType: Scratch.BlockType.REPORTER,
              text: "[c1][c2][c3][c4][c5][c6]",
              arguments: {
                  c1: {
                      type:  Scratch.ArgumentType.NUMBER,
                      defaultValue: "0"
                  },
                  c2: {
                    type:  Scratch.ArgumentType.NUMBER,
                    defaultValue: "0"
                },
                c3: {
                  type:  Scratch.ArgumentType.NUMBER,
                  defaultValue: "0"
              },
              c4: {
                type:  Scratch.ArgumentType.NUMBER,
                defaultValue: "0"
            },
            c5: {
              type:  Scratch.ArgumentType.NUMBER,
              defaultValue: "0"
          },
          c6: {
            type:  Scratch.ArgumentType.NUMBER,
            defaultValue: "0"
        }
              }                    
          },  
                        {
                          opcode: "precachetextures",
                          blockType: Scratch.BlockType.COMMAND,
                          text: "precache texture [uri] clamp the texture? [clamp]",
                          arguments: {
                              uri: {
                                  type:  Scratch.ArgumentType.STRING,
                                  defaultValue: "uri here"
                              },
                              clamp: {
                                type:  Scratch.ArgumentType.STRING,
                                menu: 'TFmenu'
                              }
                          }                    
                      },
                  {
                      opcode: "settargetsw",
                      blockType: Scratch.BlockType.COMMAND,
                      text: "Change the target screen size to width[width] and height[height]",
                      arguments: {
                          width: {
                              type:  Scratch.ArgumentType.NUMBER,
                              defaultValue: "480"
                          },
                          height: {
                              type:  Scratch.ArgumentType.NUMBER,
                              defaultValue: "360"
                          }
                      }                    
                  },
                  {
                      opcode: "pendrawspritefromurl",
                      blockType: Scratch.BlockType.COMMAND,
                      text: "Stamp the image from url:[url] at x:[x] y:[y]",
                      arguments: {
                          url: {
                              type:  Scratch.ArgumentType.STRING,
                              defaultValue: "https://en.scratch-wiki.info/w/images/thumb/ScratchCat-Small.png/200px-ScratchCat-Small.png"
                          },
                          x: {
                              type:  Scratch.ArgumentType.NUMBER,
                              defaultValue: "240"
                          },
                          y: {
                              type:  Scratch.ArgumentType.NUMBER,
                              defaultValue: "180"
                          }
                      }                    
                  },
                  {
                    opcode: "rotateStamp",
                    blockType: Scratch.BlockType.COMMAND,
                    text: "Set stamp rotation to [ANGLE]",
                    arguments: {
                      ANGLE: {
                        type:  Scratch.ArgumentType.ANGLE,
                        defaultValue: "90"
                      }
                    }                    
                  },
                  {
                    opcode: "getstamprotation",
                    blockType: Scratch.BlockType.REPORTER,
                    text: "Stamp Rotation",
                    arguments: {
                      ANGLE: {
                        type:  Scratch.ArgumentType.ANGLE,
                        defaultValue: "90"
                      }
                    }                    
                  },
                  {
                      opcode: "setpenstrechandsquash",
                      blockType: Scratch.BlockType.COMMAND,
                      text: "Set stamp width to [width] and height to [height]",
                      arguments: {
                          width: {
                              type:  Scratch.ArgumentType.NUMBER,
                              defaultValue: "64"
                          },
                          height: {
                              type:  Scratch.ArgumentType.NUMBER,
                              defaultValue: "64"
                          }
                      }                    
                  },
                  {
                      opcode: "getstampwidth",
                      blockType: Scratch.BlockType.REPORTER,
                      text: "Stamp Width",
                      arguments: {
                      }                    
                  },
                  {
                      opcode: "getstampheight",
                      blockType: Scratch.BlockType.REPORTER,
                      text: "Stamp Height",
                      arguments: {
                      }                    
                  },
                  {
                    opcode: "setstampcolor",
                    blockType: Scratch.BlockType.COMMAND,
                    text: "Tint stamp by [color] and transparency[T](0-255)",
                    arguments: {
                      color: {
                        type:  Scratch.ArgumentType.COLOR,
                        defaultValue: '#ffffff'
                      },
                      T:{
                        type:  Scratch.ArgumentType.NUMBER,
                        defaultValue: '0'
                      }
                    }                    
                  },
                  {
                      opcode: "getcostumedata",
                      blockType: Scratch.BlockType.REPORTER,
                      text: "Get data uri of costume[costu]",
                      arguments: {
                          costu: {
                              type:  Scratch.ArgumentType.NUMBER,
                              defaultValue: "1"
                          },
                          spr: {
                              type:  Scratch.ArgumentType.NUMBER,
                              defaultValue: "1"
                          }
                      }                    
                  },
                  /*{
                      opcode: "getimagefromurl",
                      blockType: Scratch.BlockType.REPORTER,
                      text: "Get data uri from url:[url]",
                      arguments: {
                          "url": {
                              type:  Scratch.ArgumentType.STRING,
                              defaultValue: "https://en.scratch-wiki.info/w/images/thumb/ScratchCat-Small.png/200px-ScratchCat-Small.png"
                          }
                      }                    
                  },*/
                  {
                    opcode: "pendrawtexturedtrifromurl",
                    blockType: Scratch.BlockType.COMMAND,
                    text: "Draw a triangle with points at(seperated by commas)[trianglepoints] and the uvs of [triangleuvs] with the image from url:[url]",
                    arguments: {
                        url: {
                            type:  Scratch.ArgumentType.STRING,
                            defaultValue: "https://en.scratch-wiki.info/w/images/thumb/ScratchCat-Small.png/200px-ScratchCat-Small.png"
                        },
                        trianglepoints: {
                            type:  Scratch.ArgumentType.STRING,
                            defaultValue: "0,0,10,10,0,10"
                        },
                        triangleuvs: {
                            type:  Scratch.ArgumentType.STRING,
                            defaultValue: "0,0,1,1,0,1"
                        }
                    }                    
                },
                {
                  opcode: "settripointcolour",
                  blockType: Scratch.BlockType.COMMAND,
                  text: "Tint point [pointmenu] by [color] and transparency[T](0-255)",
                  arguments: {
                    pointmenu: {
                      type:  Scratch.ArgumentType.STRING,
                      menu: 'pointmenu'
                    },
                    color: {
                      type:  Scratch.ArgumentType.COLOR,
                      defaultValue: '#ffffff'
                    },
                    T:{
                      type:  Scratch.ArgumentType.NUMBER,
                      defaultValue: '0'
                    }
                  }                    
                },
                {
                  opcode: "gettargetstagewidth",
                  blockType: Scratch.BlockType.REPORTER,
                  text: "Target Stage Width",
                  arguments: {
                  }                    
                },
                {
                  opcode: "gettargetstageheight",
                  blockType: Scratch.BlockType.REPORTER,
                  text: "Target Stage Height",
                  arguments: {
                  }                    
                },
                {
                  opcode: "converttocanvascoords",
                  blockType: Scratch.BlockType.REPORTER,
                  text: "Convert [scrcoord] to [coordTypes] units on the axis [coordmenu]",
                  arguments: {
                    coordmenu: {
                      type:  Scratch.ArgumentType.STRING,
                      menu: 'coordMenu'
                    },
                    scrcoord: {
                      type:  Scratch.ArgumentType.NUMBER,
                      defaultValue: '0'
                    },
                    coordTypes: {
                      type:  Scratch.ArgumentType.STRING,
                      menu: 'coordTypes'
                    }
                  }                    
                },
                {
                  opcode: "rgbtoSColor",
                  blockType: Scratch.BlockType.REPORTER,
                  text: "Convert R[R] G[G] B[B] to Hex",
                  arguments: {
                    R: {
                      type:  Scratch.ArgumentType.NUMBER,
                      defaultValue: '255'
                    },
                    G: {
                      type:  Scratch.ArgumentType.NUMBER,
                      defaultValue: '255'
                    },
                    B: {
                      type:  Scratch.ArgumentType.NUMBER,
                      defaultValue: '255'
                    }
                  }                    
                }
              ],
              menus: {
                coordMenu: {
                    items: ['x', 'y']
                },
                coordTypes: {
                  items: ['Canvas', 'Scratch']
                },
                pointmenu: {
                  items: ['1', '2', '3']
                },
                TFmenu: {
                  items: ['true',"false"]
                },
                //Dynamic Menus
            }
    };
    }
    rgbtoSColor({R,G,B}) {
      return (((R*256)+G) *256)+B
    }
    
    getstampwidth({}) {
      return Penwidth;
    }
  
    getstampheight({}) {
      return PenHeight;
    }
  
    converttocanvascoords({coordmenu,scrcoord,coordTypes}) {
      if (coordTypes == 'Canvas')
      {
        if (coordmenu == "x")
        {
            return scrcoord + (screenwidth/2)
        }
        else
        {
            return (scrcoord*-1) + (screenheight/2)
        }
      }
      else
      {
        if (coordmenu == "x")
        {
            return scrcoord - (screenwidth/2)
        }
        else
        {
            return (scrcoord*-1) - (screenheight/2)
        }
      }
    }
  
    getstamprotation({}) {
      return stamprotation
    }
  
    rotateStamp({ANGLE}) {
      stamprotation = ANGLE
      return "done"
    }
  
    pendrawspritefromurl({url,x,y}) {
        canvaswidth = canvas.width
        canvasheight =  canvas.height
        var scalemultiplyer = canvaswidth/screenwidth
        if(!textures.hasOwnProperty(url)){
            textures[url] = loadImageAndCreateTextureInfo(url,'true')
            console.log(textures[url])
        }
        drawImage(textures[url].texture, Penwidth * scalemultiplyer, PenHeight * scalemultiplyer, (x) * scalemultiplyer, (y) * scalemultiplyer,stamprotation - 90);
        return "stamped"
    }
  
    gettargetstagewidth({}) {
      return screenwidth
    }
  
    gettargetstageheight({}) {
      return screenheight
    }
  
    pendrawtexturedtrifromurl({url,trianglepoints,triangleuvs}) {
      canvaswidth = canvas.width
      canvasheight =  canvas.height
      var scalemultiplyer = canvaswidth/screenwidth
      if(!textures.hasOwnProperty(url)){
          textures[url] = loadImageAndCreateTextureInfo(url,'true')
          console.log(textures[url])
      }
      var pointsarray = trianglepoints.split(",");
      var pointslen = pointsarray.length;
      for (var i = 0; i < pointslen; i++) {
          pointsarray[i] = pointsarray[i] * scalemultiplyer;
      }
      var uvarray = triangleuvs.split(",");
      drawTexturedTri(textures[url].texture, pointsarray, uvarray);
      return "stamped"
    }
  
    precachetextures({uri,clamp}) {
      coolcash(uri,clamp)
    }
  
    setpenstrechandsquash({width,height}) {
        Penwidth = width;
        PenHeight = height;
        console.log(Penwidth);
        console.log(PenHeight);
        return "done"
    }
    settargetsw({width,height}) {
        screenwidth = width;
        screenheight = height;
        return "done"
    }
    getcostumedata({costu},util) {
      let fileData = getspritecostume(util,costu) 
      console.log(fileData)
      return fileData;
    }
  
    coordBlock({c1,c2,c3,c4,c5,c6})
    {
      return c1 + "," + c2 + "," + c3 + "," + c4 + "," + c5 + "," + c6
    }
    
    /*data:image/png;base64,' + 
    async getimagefromurl({url}) {
      var result = await getdatafromimageuri(url)
      return result
    }*/
    //scrapped till I figure this out fully!
  
    settripointcolour({pointmenu,color,T}) {
      if(pointmenu == "1") {
        tricolors[0] = hexToRgb(color).r / 255
        tricolors[1] = hexToRgb(color).g / 255
        tricolors[2] = hexToRgb(color).b / 255
        tricolors[3] = T / 255
      }
      else if (pointmenu == "2"){
        tricolors[4] = hexToRgb(color).r / 255
        tricolors[5] = hexToRgb(color).g / 255
        tricolors[6] = hexToRgb(color).b / 255
        tricolors[7] = T / 255
      }
      else{
        tricolors[8] = hexToRgb(color).r / 255
        tricolors[9] = hexToRgb(color).g / 255
        tricolors[10] = hexToRgb(color).b / 255
        tricolors[11] = T / 255
      }
  
      return "done"
    }
  
    setstampcolor({color,T}) {
      console.log(hexToRgb(color))
      let convertr = hexToRgb(color).r / 255
      let convertg = hexToRgb(color).g / 255
      let convertb = hexToRgb(color).b / 255
      let converta = T / 255
        quadcolors[0] = convertr
        quadcolors[1] = convertg
        quadcolors[2] = convertb
        quadcolors[3] = converta
        quadcolors[4] = convertr
        quadcolors[5] = convertg
        quadcolors[6] = convertb
        quadcolors[7] = converta
        quadcolors[8] = convertr
        quadcolors[9] = convertg
        quadcolors[10] = convertb
        quadcolors[11] = converta
  
        quadcolors[12] = convertr
        quadcolors[13] = convertg
        quadcolors[14] = convertb
        quadcolors[15] = converta
        quadcolors[16] = convertr
        quadcolors[17] = convertg
        quadcolors[18] = convertb
        quadcolors[19] = converta
        quadcolors[20] = convertr
        quadcolors[21] = convertg
        quadcolors[22] = convertb
        quadcolors[23] = converta
  
      return "done"
    }
  }
  Scratch.extensions.register(new BetterPen());
  function hexToRgb(hex) {
    return {
      r: Math.floor(hex/65536),
      g: Math.floor(hex/256)%256,
      b: hex%256
    }
    }
    
    function getdatafromimageuri(url)
    {
    return getDataUri(url,function(b){
      return b;
    });
    }
    
    function getspritecostume(util,c)
    {
    let ps_sp=util.target;
    let ps_cs=ps_sp.sprite.costumes[c - 1].asset.encodeDataURI();
    console.log(ps_cs)
    return ps_cs
    }
    async function coolcash(uri,clamp){
      if(!textures.hasOwnProperty(uri)){
        textures[uri] = await loadImageAndCreateTextureInfo(uri,clamp)
        console.log(textures[uri])
    }
    }
})(Scratch);
