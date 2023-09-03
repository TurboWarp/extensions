// Name: Pen Plus
// ID: betterpen
// Description: Advanced rendering capabilities.
// By: ObviousAlexC <https://scratch.mit.edu/users/pinksheep2917/>

/* eslint-disable no-empty-pattern */
/* eslint-disable no-prototype-builtins */
/*
Pen+ Version 5
Author ObviousAlexC

Special Thanks to Garbo for helping me with this new version.

Changelog:
Added Line blocks
Fixed Color Blocks
Seperated Blocks into catagories just so I could edit them in the future without having to dig through a large blocks array!
Fixed support for the Plugin Loader
Made cross platform with the same file by using conditional assignments!
Confirmed some doubts (see line 52) 
Learned that javascript had C++ like conditional assignments
Depracated spacial transformation block
Added spacial changing block
Other various small fixes
*/
(function (Scratch) {
  "use strict";

  if (!Scratch.extensions.unsandboxed) {
    throw new Error("Pen+ must be run unsandboxed");
  }

  const vm = Scratch.vm;
  const runtime = vm.runtime;
  const canvas = runtime.renderer.canvas;
  const gl = runtime.renderer._gl;

  const EXAMPLE_IMAGE = "https://extensions.turbowarp.org/dango.png";

  const blankImage =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAAXNSR0IArs4c6QAAABRJREFUGFdj/P///38GBgYGRhgDAFfVB/vDfnUlAAAAAElFTkSuQmCC";

  // TODO: see how these differ from Scratch, if at all
  // Note to Garbo or any code checker it does it uses bilinear filtering!
  gl.enable(gl.BLEND);
  gl.blendEquation(gl.FUNC_ADD);
  gl.blendFunc(gl.ONE_MINUS_CONSTANT_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  var stampWidth = 64;
  var stampHeight = 64;

  var lineWidth = [1, 1];
  var lineColor = {
    r: 1,
    g: 1,
    b: 1,
    a: 1,
  };

  var screenWidth = 480;
  var screenHeight = 360;
  var coordinateSpace = "Canvas";

  var stampRotation = 90;
  var stampOffset = [0, 0];

  const m4 = (function () {
    /*!
     * 4x4 matrix operation code is from https://webglfundamentals.org/webgl/resources/m4.js
     * We have made some changes:
     *  - Fixed type errors
     *  - Changed code formatting
     *  - Removed unused functions
     *
     * Copyright 2021 GFXFundamentals.
     * All rights reserved.
     *
     * Redistribution and use in source and binary forms, with or without
     * modification, are permitted provided that the following conditions are
     * met:
     *
     *     * Redistributions of source code must retain the above copyright
     * notice, this list of conditions and the following disclaimer.
     *     * Redistributions in binary form must reproduce the above
     * copyright notice, this list of conditions and the following disclaimer
     * in the documentation and/or other materials provided with the
     * distribution.
     *     * Neither the name of GFXFundamentals. nor the names of his
     * contributors may be used to endorse or promote products derived from
     * this software without specific prior written permission.
     *
     * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
     * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
     * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
     * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
     * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
     * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
     * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
     * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
     * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
     * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
     * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
     */

    /**
     * An array or typed array with 3 values.
     * @typedef {number[]|Float32Array} Vector3
     * @memberOf module:webgl-3d-math
     */

    /**
     * An array or typed array with 4 values.
     * @typedef {number[]|Float32Array} Vector4
     * @memberOf module:webgl-3d-math
     */

    /**
     * An array or typed array with 16 values.
     * @typedef {number[]|Float32Array} Matrix4
     * @memberOf module:webgl-3d-math
     */

    let MatType = Float32Array;

    /**
     * Sets the type this library creates for a Mat4
     * @param {Float32ArrayConstructor} Ctor the constructor for the type. Either `Float32Array` or `Array`
     * @return {Float32ArrayConstructor} previous constructor for Mat4
     */
    function setDefaultType(Ctor) {
      const OldType = MatType;
      MatType = Ctor;
      return OldType;
    }

    /**
     * Takes two 4-by-4 matrices, a and b, and computes the product in the order
     * that pre-composes b with a.  In other words, the matrix returned will
     * transform by b first and then a.  Note this is subtly different from just
     * multiplying the matrices together.  For given a and b, this function returns
     * the same object in both row-major and column-major mode.
     * @param {Matrix4} a A matrix.
     * @param {Matrix4} b A matrix.
     * @param {Matrix4} [dst] optional matrix to store result
     * @return {Matrix4} dst or a new matrix if none provided
     */
    function multiply(a, b, dst) {
      dst = dst || new MatType(16);
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
      dst[0] = b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30;
      dst[1] = b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31;
      dst[2] = b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32;
      dst[3] = b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33;
      dst[4] = b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30;
      dst[5] = b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31;
      dst[6] = b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32;
      dst[7] = b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33;
      dst[8] = b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30;
      dst[9] = b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31;
      dst[10] = b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32;
      dst[11] = b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33;
      dst[12] = b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30;
      dst[13] = b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31;
      dst[14] = b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32;
      dst[15] = b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33;
      return dst;
    }

    /**
     * adds 2 vectors3s
     * @param {Vector3} a a
     * @param {Vector3} b b
     * @param {Vector3} [dst] optional vector3 to store result
     * @return {Vector3} dst or new Vector3 if not provided
     * @memberOf module:webgl-3d-math
     */
    function addVectors(a, b, dst) {
      dst = dst || new MatType(3);
      dst[0] = a[0] + b[0];
      dst[1] = a[1] + b[1];
      dst[2] = a[2] + b[2];
      return dst;
    }

    /**
     * subtracts 2 vectors3s
     * @param {Vector3} a a
     * @param {Vector3} b b
     * @param {Vector3} [dst] optional vector3 to store result
     * @return {Vector3} dst or new Vector3 if not provided
     * @memberOf module:webgl-3d-math
     */
    function subtractVectors(a, b, dst) {
      dst = dst || new MatType(3);
      dst[0] = a[0] - b[0];
      dst[1] = a[1] - b[1];
      dst[2] = a[2] - b[2];
      return dst;
    }

    /**
     * scale vectors3
     * @param {Vector3} v vector
     * @param {Number} s scale
     * @param {Vector3} [dst] optional vector3 to store result
     * @return {Vector3} dst or new Vector3 if not provided
     * @memberOf module:webgl-3d-math
     */
    function scaleVector(v, s, dst) {
      dst = dst || new MatType(3);
      dst[0] = v[0] * s;
      dst[1] = v[1] * s;
      dst[2] = v[2] * s;
      return dst;
    }

    /**
     * normalizes a vector.
     * @param {Vector3} v vector to normalize
     * @param {Vector3} [dst] optional vector3 to store result
     * @return {Vector3} dst or new Vector3 if not provided
     * @memberOf module:webgl-3d-math
     */
    function normalize(v, dst) {
      dst = dst || new MatType(3);
      var length = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
      // make sure we don't divide by 0.
      if (length > 0.00001) {
        dst[0] = v[0] / length;
        dst[1] = v[1] / length;
        dst[2] = v[2] / length;
      }
      return dst;
    }

    /**
     * Computes the length of a vector
     * @param {Vector3} v vector to take length of
     * @return {number} length of vector
     */
    function length(v) {
      return Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
    }

    /**
     * Computes the length squared of a vector
     * @param {Vector3} v vector to take length of
     * @return {number} length sqaured of vector
     */
    function lengthSq(v) {
      return v[0] * v[0] + v[1] * v[1] + v[2] * v[2];
    }

    /**
     * Computes the cross product of 2 vectors3s
     * @param {Vector3} a a
     * @param {Vector3} b b
     * @param {Vector3} [dst] optional vector3 to store result
     * @return {Vector3} dst or new Vector3 if not provided
     * @memberOf module:webgl-3d-math
     */
    function cross(a, b, dst) {
      dst = dst || new MatType(3);
      dst[0] = a[1] * b[2] - a[2] * b[1];
      dst[1] = a[2] * b[0] - a[0] * b[2];
      dst[2] = a[0] * b[1] - a[1] * b[0];
      return dst;
    }

    /**
     * Computes the dot product of two vectors; assumes both vectors have
     * three entries.
     * @param {Vector3} a Operand vector.
     * @param {Vector3} b Operand vector.
     * @return {number} dot product
     * @memberOf module:webgl-3d-math
     */
    function dot(a, b) {
      return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
    }

    /**
     * Computes the distance squared between 2 points
     * @param {Vector3} a
     * @param {Vector3} b
     * @return {number} distance squared between a and b
     */
    function distanceSq(a, b) {
      const dx = a[0] - b[0];
      const dy = a[1] - b[1];
      const dz = a[2] - b[2];
      return dx * dx + dy * dy + dz * dz;
    }

    /**
     * Computes the distance between 2 points
     * @param {Vector3} a
     * @param {Vector3} b
     * @return {number} distance between a and b
     */
    function distance(a, b) {
      return Math.sqrt(distanceSq(a, b));
    }

    /**
     * Makes an identity matrix.
     * @param {Matrix4} [dst] optional matrix to store result
     * @return {Matrix4} dst or a new matrix if none provided
     * @memberOf module:webgl-3d-math
     */
    function identity(dst) {
      dst = dst || new MatType(16);

      dst[0] = 1;
      dst[1] = 0;
      dst[2] = 0;
      dst[3] = 0;
      dst[4] = 0;
      dst[5] = 1;
      dst[6] = 0;
      dst[7] = 0;
      dst[8] = 0;
      dst[9] = 0;
      dst[10] = 1;
      dst[11] = 0;
      dst[12] = 0;
      dst[13] = 0;
      dst[14] = 0;
      dst[15] = 1;

      return dst;
    }

    /**
     * Transposes a matrix.
     * @param {Matrix4} m matrix to transpose.
     * @param {Matrix4} [dst] optional matrix to store result
     * @return {Matrix4} dst or a new matrix if none provided
     * @memberOf module:webgl-3d-math
     */
    function transpose(m, dst) {
      dst = dst || new MatType(16);

      dst[0] = m[0];
      dst[1] = m[4];
      dst[2] = m[8];
      dst[3] = m[12];
      dst[4] = m[1];
      dst[5] = m[5];
      dst[6] = m[9];
      dst[7] = m[13];
      dst[8] = m[2];
      dst[9] = m[6];
      dst[10] = m[10];
      dst[11] = m[14];
      dst[12] = m[3];
      dst[13] = m[7];
      dst[14] = m[11];
      dst[15] = m[15];

      return dst;
    }

    /**
     * Creates a lookAt matrix.
     * This is a world matrix for a camera. In other words it will transform
     * from the origin to a place and orientation in the world. For a view
     * matrix take the inverse of this.
     * @param {Vector3} cameraPosition position of the camera
     * @param {Vector3} target position of the target
     * @param {Vector3} up direction
     * @param {Matrix4} [dst] optional matrix to store result
     * @return {Matrix4} dst or a new matrix if none provided
     * @memberOf module:webgl-3d-math
     */
    function lookAt(cameraPosition, target, up, dst) {
      dst = dst || new MatType(16);
      var zAxis = normalize(subtractVectors(cameraPosition, target));
      var xAxis = normalize(cross(up, zAxis));
      var yAxis = normalize(cross(zAxis, xAxis));

      dst[0] = xAxis[0];
      dst[1] = xAxis[1];
      dst[2] = xAxis[2];
      dst[3] = 0;
      dst[4] = yAxis[0];
      dst[5] = yAxis[1];
      dst[6] = yAxis[2];
      dst[7] = 0;
      dst[8] = zAxis[0];
      dst[9] = zAxis[1];
      dst[10] = zAxis[2];
      dst[11] = 0;
      dst[12] = cameraPosition[0];
      dst[13] = cameraPosition[1];
      dst[14] = cameraPosition[2];
      dst[15] = 1;

      return dst;
    }

    /**
     * Computes a 4-by-4 perspective transformation matrix given the angular height
     * of the frustum, the aspect ratio, and the near and far clipping planes.  The
     * arguments define a frustum extending in the negative z direction.  The given
     * angle is the vertical angle of the frustum, and the horizontal angle is
     * determined to produce the given aspect ratio.  The arguments near and far are
     * the distances to the near and far clipping planes.  Note that near and far
     * are not z coordinates, but rather they are distances along the negative
     * z-axis.  The matrix generated sends the viewing frustum to the unit box.
     * We assume a unit box extending from -1 to 1 in the x and y dimensions and
     * from -1 to 1 in the z dimension.
     * @param {number} fieldOfViewInRadians field of view in y axis.
     * @param {number} aspect aspect of viewport (width / height)
     * @param {number} near near Z clipping plane
     * @param {number} far far Z clipping plane
     * @param {Matrix4} [dst] optional matrix to store result
     * @return {Matrix4} dst or a new matrix if none provided
     * @memberOf module:webgl-3d-math
     */
    function perspective(fieldOfViewInRadians, aspect, near, far, dst) {
      dst = dst || new MatType(16);
      var f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewInRadians);
      var rangeInv = 1.0 / (near - far);

      dst[0] = f / aspect;
      dst[1] = 0;
      dst[2] = 0;
      dst[3] = 0;
      dst[4] = 0;
      dst[5] = f;
      dst[6] = 0;
      dst[7] = 0;
      dst[8] = 0;
      dst[9] = 0;
      dst[10] = (near + far) * rangeInv;
      dst[11] = -1;
      dst[12] = 0;
      dst[13] = 0;
      dst[14] = near * far * rangeInv * 2;
      dst[15] = 0;

      return dst;
    }

    /**
     * Computes a 4-by-4 orthographic projection matrix given the coordinates of the
     * planes defining the axis-aligned, box-shaped viewing volume.  The matrix
     * generated sends that box to the unit box.  Note that although left and right
     * are x coordinates and bottom and top are y coordinates, near and far
     * are not z coordinates, but rather they are distances along the negative
     * z-axis.  We assume a unit box extending from -1 to 1 in the x and y
     * dimensions and from -1 to 1 in the z dimension.
     * @param {number} left The x coordinate of the left plane of the box.
     * @param {number} right The x coordinate of the right plane of the box.
     * @param {number} bottom The y coordinate of the bottom plane of the box.
     * @param {number} top The y coordinate of the right plane of the box.
     * @param {number} near The negative z coordinate of the near plane of the box.
     * @param {number} far The negative z coordinate of the far plane of the box.
     * @param {Matrix4} [dst] optional matrix to store result
     * @return {Matrix4} dst or a new matrix if none provided
     * @memberOf module:webgl-3d-math
     */
    function orthographic(left, right, bottom, top, near, far, dst) {
      dst = dst || new MatType(16);

      dst[0] = 2 / (right - left);
      dst[1] = 0;
      dst[2] = 0;
      dst[3] = 0;
      dst[4] = 0;
      dst[5] = 2 / (top - bottom);
      dst[6] = 0;
      dst[7] = 0;
      dst[8] = 0;
      dst[9] = 0;
      dst[10] = 2 / (near - far);
      dst[11] = 0;
      dst[12] = (left + right) / (left - right);
      dst[13] = (bottom + top) / (bottom - top);
      dst[14] = (near + far) / (near - far);
      dst[15] = 1;

      return dst;
    }

    /**
     * Computes a 4-by-4 perspective transformation matrix given the left, right,
     * top, bottom, near and far clipping planes. The arguments define a frustum
     * extending in the negative z direction. The arguments near and far are the
     * distances to the near and far clipping planes. Note that near and far are not
     * z coordinates, but rather they are distances along the negative z-axis. The
     * matrix generated sends the viewing frustum to the unit box. We assume a unit
     * box extending from -1 to 1 in the x and y dimensions and from -1 to 1 in the z
     * dimension.
     * @param {number} left The x coordinate of the left plane of the box.
     * @param {number} right The x coordinate of the right plane of the box.
     * @param {number} bottom The y coordinate of the bottom plane of the box.
     * @param {number} top The y coordinate of the right plane of the box.
     * @param {number} near The negative z coordinate of the near plane of the box.
     * @param {number} far The negative z coordinate of the far plane of the box.
     * @param {Matrix4} [dst] optional matrix to store result
     * @return {Matrix4} dst or a new matrix if none provided
     * @memberOf module:webgl-3d-math
     */
    function frustum(left, right, bottom, top, near, far, dst) {
      dst = dst || new MatType(16);

      var dx = right - left;
      var dy = top - bottom;
      var dz = far - near;

      dst[0] = (2 * near) / dx;
      dst[1] = 0;
      dst[2] = 0;
      dst[3] = 0;
      dst[4] = 0;
      dst[5] = (2 * near) / dy;
      dst[6] = 0;
      dst[7] = 0;
      dst[8] = (left + right) / dx;
      dst[9] = (top + bottom) / dy;
      dst[10] = -(far + near) / dz;
      dst[11] = -1;
      dst[12] = 0;
      dst[13] = 0;
      dst[14] = (-2 * near * far) / dz;
      dst[15] = 0;

      return dst;
    }

    /**
     * Makes a translation matrix
     * @param {number} tx x translation.
     * @param {number} ty y translation.
     * @param {number} tz z translation.
     * @param {Matrix4} [dst] optional matrix to store result
     * @return {Matrix4} dst or a new matrix if none provided
     * @memberOf module:webgl-3d-math
     */
    function translation(tx, ty, tz, dst) {
      dst = dst || new MatType(16);

      dst[0] = 1;
      dst[1] = 0;
      dst[2] = 0;
      dst[3] = 0;
      dst[4] = 0;
      dst[5] = 1;
      dst[6] = 0;
      dst[7] = 0;
      dst[8] = 0;
      dst[9] = 0;
      dst[10] = 1;
      dst[11] = 0;
      dst[12] = tx;
      dst[13] = ty;
      dst[14] = tz;
      dst[15] = 1;

      return dst;
    }

    /**
     * Multiply by translation matrix.
     * @param {Matrix4} m matrix to multiply
     * @param {number} tx x translation.
     * @param {number} ty y translation.
     * @param {number} tz z translation.
     * @param {Matrix4} [dst] optional matrix to store result
     * @return {Matrix4} dst or a new matrix if none provided
     * @memberOf module:webgl-3d-math
     */
    function translate(m, tx, ty, tz, dst) {
      // This is the optimized version of
      // return multiply(m, translation(tx, ty, tz), dst);
      dst = dst || new MatType(16);

      var m00 = m[0];
      var m01 = m[1];
      var m02 = m[2];
      var m03 = m[3];
      var m10 = m[1 * 4 + 0];
      var m11 = m[1 * 4 + 1];
      var m12 = m[1 * 4 + 2];
      var m13 = m[1 * 4 + 3];
      var m20 = m[2 * 4 + 0];
      var m21 = m[2 * 4 + 1];
      var m22 = m[2 * 4 + 2];
      var m23 = m[2 * 4 + 3];
      var m30 = m[3 * 4 + 0];
      var m31 = m[3 * 4 + 1];
      var m32 = m[3 * 4 + 2];
      var m33 = m[3 * 4 + 3];

      if (m !== dst) {
        dst[0] = m00;
        dst[1] = m01;
        dst[2] = m02;
        dst[3] = m03;
        dst[4] = m10;
        dst[5] = m11;
        dst[6] = m12;
        dst[7] = m13;
        dst[8] = m20;
        dst[9] = m21;
        dst[10] = m22;
        dst[11] = m23;
      }

      dst[12] = m00 * tx + m10 * ty + m20 * tz + m30;
      dst[13] = m01 * tx + m11 * ty + m21 * tz + m31;
      dst[14] = m02 * tx + m12 * ty + m22 * tz + m32;
      dst[15] = m03 * tx + m13 * ty + m23 * tz + m33;

      return dst;
    }

    /**
     * Makes an x rotation matrix
     * @param {number} angleInRadians amount to rotate
     * @param {Matrix4} [dst] optional matrix to store result
     * @return {Matrix4} dst or a new matrix if none provided
     * @memberOf module:webgl-3d-math
     */
    function xRotation(angleInRadians, dst) {
      dst = dst || new MatType(16);
      var c = Math.cos(angleInRadians);
      var s = Math.sin(angleInRadians);

      dst[0] = 1;
      dst[1] = 0;
      dst[2] = 0;
      dst[3] = 0;
      dst[4] = 0;
      dst[5] = c;
      dst[6] = s;
      dst[7] = 0;
      dst[8] = 0;
      dst[9] = -s;
      dst[10] = c;
      dst[11] = 0;
      dst[12] = 0;
      dst[13] = 0;
      dst[14] = 0;
      dst[15] = 1;

      return dst;
    }

    /**
     * Multiply by an x rotation matrix
     * @param {Matrix4} m matrix to multiply
     * @param {number} angleInRadians amount to rotate
     * @param {Matrix4} [dst] optional matrix to store result
     * @return {Matrix4} dst or a new matrix if none provided
     * @memberOf module:webgl-3d-math
     */
    function xRotate(m, angleInRadians, dst) {
      // this is the optimized version of
      // return multiply(m, xRotation(angleInRadians), dst);
      dst = dst || new MatType(16);

      var m10 = m[4];
      var m11 = m[5];
      var m12 = m[6];
      var m13 = m[7];
      var m20 = m[8];
      var m21 = m[9];
      var m22 = m[10];
      var m23 = m[11];
      var c = Math.cos(angleInRadians);
      var s = Math.sin(angleInRadians);

      dst[4] = c * m10 + s * m20;
      dst[5] = c * m11 + s * m21;
      dst[6] = c * m12 + s * m22;
      dst[7] = c * m13 + s * m23;
      dst[8] = c * m20 - s * m10;
      dst[9] = c * m21 - s * m11;
      dst[10] = c * m22 - s * m12;
      dst[11] = c * m23 - s * m13;

      if (m !== dst) {
        dst[0] = m[0];
        dst[1] = m[1];
        dst[2] = m[2];
        dst[3] = m[3];
        dst[12] = m[12];
        dst[13] = m[13];
        dst[14] = m[14];
        dst[15] = m[15];
      }

      return dst;
    }

    /**
     * Makes an y rotation matrix
     * @param {number} angleInRadians amount to rotate
     * @param {Matrix4} [dst] optional matrix to store result
     * @return {Matrix4} dst or a new matrix if none provided
     * @memberOf module:webgl-3d-math
     */
    function yRotation(angleInRadians, dst) {
      dst = dst || new MatType(16);
      var c = Math.cos(angleInRadians);
      var s = Math.sin(angleInRadians);

      dst[0] = c;
      dst[1] = 0;
      dst[2] = -s;
      dst[3] = 0;
      dst[4] = 0;
      dst[5] = 1;
      dst[6] = 0;
      dst[7] = 0;
      dst[8] = s;
      dst[9] = 0;
      dst[10] = c;
      dst[11] = 0;
      dst[12] = 0;
      dst[13] = 0;
      dst[14] = 0;
      dst[15] = 1;

      return dst;
    }

    /**
     * Multiply by an y rotation matrix
     * @param {Matrix4} m matrix to multiply
     * @param {number} angleInRadians amount to rotate
     * @param {Matrix4} [dst] optional matrix to store result
     * @return {Matrix4} dst or a new matrix if none provided
     * @memberOf module:webgl-3d-math
     */
    function yRotate(m, angleInRadians, dst) {
      // this is the optimized version of
      // return multiply(m, yRotation(angleInRadians), dst);
      dst = dst || new MatType(16);

      var m00 = m[0 * 4 + 0];
      var m01 = m[0 * 4 + 1];
      var m02 = m[0 * 4 + 2];
      var m03 = m[0 * 4 + 3];
      var m20 = m[2 * 4 + 0];
      var m21 = m[2 * 4 + 1];
      var m22 = m[2 * 4 + 2];
      var m23 = m[2 * 4 + 3];
      var c = Math.cos(angleInRadians);
      var s = Math.sin(angleInRadians);

      dst[0] = c * m00 - s * m20;
      dst[1] = c * m01 - s * m21;
      dst[2] = c * m02 - s * m22;
      dst[3] = c * m03 - s * m23;
      dst[8] = c * m20 + s * m00;
      dst[9] = c * m21 + s * m01;
      dst[10] = c * m22 + s * m02;
      dst[11] = c * m23 + s * m03;

      if (m !== dst) {
        dst[4] = m[4];
        dst[5] = m[5];
        dst[6] = m[6];
        dst[7] = m[7];
        dst[12] = m[12];
        dst[13] = m[13];
        dst[14] = m[14];
        dst[15] = m[15];
      }

      return dst;
    }

    /**
     * Makes an z rotation matrix
     * @param {number} angleInRadians amount to rotate
     * @param {Matrix4} [dst] optional matrix to store result
     * @return {Matrix4} dst or a new matrix if none provided
     * @memberOf module:webgl-3d-math
     */
    function zRotation(angleInRadians, dst) {
      dst = dst || new MatType(16);
      var c = Math.cos(angleInRadians);
      var s = Math.sin(angleInRadians);

      dst[0] = c;
      dst[1] = s;
      dst[2] = 0;
      dst[3] = 0;
      dst[4] = -s;
      dst[5] = c;
      dst[6] = 0;
      dst[7] = 0;
      dst[8] = 0;
      dst[9] = 0;
      dst[10] = 1;
      dst[11] = 0;
      dst[12] = 0;
      dst[13] = 0;
      dst[14] = 0;
      dst[15] = 1;

      return dst;
    }

    /**
     * Multiply by an z rotation matrix
     * @param {Matrix4} m matrix to multiply
     * @param {number} angleInRadians amount to rotate
     * @param {Matrix4} [dst] optional matrix to store result
     * @return {Matrix4} dst or a new matrix if none provided
     * @memberOf module:webgl-3d-math
     */
    function zRotate(m, angleInRadians, dst) {
      // This is the optimized version of
      // return multiply(m, zRotation(angleInRadians), dst);
      dst = dst || new MatType(16);

      var m00 = m[0 * 4 + 0];
      var m01 = m[0 * 4 + 1];
      var m02 = m[0 * 4 + 2];
      var m03 = m[0 * 4 + 3];
      var m10 = m[1 * 4 + 0];
      var m11 = m[1 * 4 + 1];
      var m12 = m[1 * 4 + 2];
      var m13 = m[1 * 4 + 3];
      var c = Math.cos(angleInRadians);
      var s = Math.sin(angleInRadians);

      dst[0] = c * m00 + s * m10;
      dst[1] = c * m01 + s * m11;
      dst[2] = c * m02 + s * m12;
      dst[3] = c * m03 + s * m13;
      dst[4] = c * m10 - s * m00;
      dst[5] = c * m11 - s * m01;
      dst[6] = c * m12 - s * m02;
      dst[7] = c * m13 - s * m03;

      if (m !== dst) {
        dst[8] = m[8];
        dst[9] = m[9];
        dst[10] = m[10];
        dst[11] = m[11];
        dst[12] = m[12];
        dst[13] = m[13];
        dst[14] = m[14];
        dst[15] = m[15];
      }

      return dst;
    }

    /**
     * Makes an rotation matrix around an arbitrary axis
     * @param {Vector3} axis axis to rotate around
     * @param {number} angleInRadians amount to rotate
     * @param {Matrix4} [dst] optional matrix to store result
     * @return {Matrix4} dst or a new matrix if none provided
     * @memberOf module:webgl-3d-math
     */
    function axisRotation(axis, angleInRadians, dst) {
      dst = dst || new MatType(16);

      var x = axis[0];
      var y = axis[1];
      var z = axis[2];
      var n = Math.sqrt(x * x + y * y + z * z);
      x /= n;
      y /= n;
      z /= n;
      var xx = x * x;
      var yy = y * y;
      var zz = z * z;
      var c = Math.cos(angleInRadians);
      var s = Math.sin(angleInRadians);
      var oneMinusCosine = 1 - c;

      dst[0] = xx + (1 - xx) * c;
      dst[1] = x * y * oneMinusCosine + z * s;
      dst[2] = x * z * oneMinusCosine - y * s;
      dst[3] = 0;
      dst[4] = x * y * oneMinusCosine - z * s;
      dst[5] = yy + (1 - yy) * c;
      dst[6] = y * z * oneMinusCosine + x * s;
      dst[7] = 0;
      dst[8] = x * z * oneMinusCosine + y * s;
      dst[9] = y * z * oneMinusCosine - x * s;
      dst[10] = zz + (1 - zz) * c;
      dst[11] = 0;
      dst[12] = 0;
      dst[13] = 0;
      dst[14] = 0;
      dst[15] = 1;

      return dst;
    }

    /**
     * Multiply by an axis rotation matrix
     * @param {Matrix4} m matrix to multiply
     * @param {Vector3} axis axis to rotate around
     * @param {number} angleInRadians amount to rotate
     * @param {Matrix4} [dst] optional matrix to store result
     * @return {Matrix4} dst or a new matrix if none provided
     * @memberOf module:webgl-3d-math
     */
    function axisRotate(m, axis, angleInRadians, dst) {
      // This is the optimized version of
      // return multiply(m, axisRotation(axis, angleInRadians), dst);
      dst = dst || new MatType(16);

      var x = axis[0];
      var y = axis[1];
      var z = axis[2];
      var n = Math.sqrt(x * x + y * y + z * z);
      x /= n;
      y /= n;
      z /= n;
      var xx = x * x;
      var yy = y * y;
      var zz = z * z;
      var c = Math.cos(angleInRadians);
      var s = Math.sin(angleInRadians);
      var oneMinusCosine = 1 - c;

      var r00 = xx + (1 - xx) * c;
      var r01 = x * y * oneMinusCosine + z * s;
      var r02 = x * z * oneMinusCosine - y * s;
      var r10 = x * y * oneMinusCosine - z * s;
      var r11 = yy + (1 - yy) * c;
      var r12 = y * z * oneMinusCosine + x * s;
      var r20 = x * z * oneMinusCosine + y * s;
      var r21 = y * z * oneMinusCosine - x * s;
      var r22 = zz + (1 - zz) * c;

      var m00 = m[0];
      var m01 = m[1];
      var m02 = m[2];
      var m03 = m[3];
      var m10 = m[4];
      var m11 = m[5];
      var m12 = m[6];
      var m13 = m[7];
      var m20 = m[8];
      var m21 = m[9];
      var m22 = m[10];
      var m23 = m[11];

      dst[0] = r00 * m00 + r01 * m10 + r02 * m20;
      dst[1] = r00 * m01 + r01 * m11 + r02 * m21;
      dst[2] = r00 * m02 + r01 * m12 + r02 * m22;
      dst[3] = r00 * m03 + r01 * m13 + r02 * m23;
      dst[4] = r10 * m00 + r11 * m10 + r12 * m20;
      dst[5] = r10 * m01 + r11 * m11 + r12 * m21;
      dst[6] = r10 * m02 + r11 * m12 + r12 * m22;
      dst[7] = r10 * m03 + r11 * m13 + r12 * m23;
      dst[8] = r20 * m00 + r21 * m10 + r22 * m20;
      dst[9] = r20 * m01 + r21 * m11 + r22 * m21;
      dst[10] = r20 * m02 + r21 * m12 + r22 * m22;
      dst[11] = r20 * m03 + r21 * m13 + r22 * m23;

      if (m !== dst) {
        dst[12] = m[12];
        dst[13] = m[13];
        dst[14] = m[14];
        dst[15] = m[15];
      }

      return dst;
    }

    /**
     * Makes a scale matrix
     * @param {number} sx x scale.
     * @param {number} sy y scale.
     * @param {number} sz z scale.
     * @param {Matrix4} [dst] optional matrix to store result
     * @return {Matrix4} dst or a new matrix if none provided
     * @memberOf module:webgl-3d-math
     */
    function scaling(sx, sy, sz, dst) {
      dst = dst || new MatType(16);

      dst[0] = sx;
      dst[1] = 0;
      dst[2] = 0;
      dst[3] = 0;
      dst[4] = 0;
      dst[5] = sy;
      dst[6] = 0;
      dst[7] = 0;
      dst[8] = 0;
      dst[9] = 0;
      dst[10] = sz;
      dst[11] = 0;
      dst[12] = 0;
      dst[13] = 0;
      dst[14] = 0;
      dst[15] = 1;

      return dst;
    }

    /**
     * Multiply by a scaling matrix
     * @param {Matrix4} m matrix to multiply
     * @param {number} sx x scale.
     * @param {number} sy y scale.
     * @param {number} sz z scale.
     * @param {Matrix4} [dst] optional matrix to store result
     * @return {Matrix4} dst or a new matrix if none provided
     * @memberOf module:webgl-3d-math
     */
    function scale(m, sx, sy, sz, dst) {
      // This is the optimized version of
      // return multiply(m, scaling(sx, sy, sz), dst);
      dst = dst || new MatType(16);

      dst[0] = sx * m[0 * 4 + 0];
      dst[1] = sx * m[0 * 4 + 1];
      dst[2] = sx * m[0 * 4 + 2];
      dst[3] = sx * m[0 * 4 + 3];
      dst[4] = sy * m[1 * 4 + 0];
      dst[5] = sy * m[1 * 4 + 1];
      dst[6] = sy * m[1 * 4 + 2];
      dst[7] = sy * m[1 * 4 + 3];
      dst[8] = sz * m[2 * 4 + 0];
      dst[9] = sz * m[2 * 4 + 1];
      dst[10] = sz * m[2 * 4 + 2];
      dst[11] = sz * m[2 * 4 + 3];

      if (m !== dst) {
        dst[12] = m[12];
        dst[13] = m[13];
        dst[14] = m[14];
        dst[15] = m[15];
      }

      return dst;
    }

    /**
     * creates a matrix from translation, quaternion, scale
     * @param {Number[]} translation [x, y, z] translation
     * @param {Number[]} quaternion [x, y, z, z] quaternion rotation
     * @param {Number[]} scale [x, y, z] scale
     * @param {Matrix4} [dst] optional matrix to store result
     * @return {Matrix4} dst or a new matrix if none provided
     */
    function compose(translation, quaternion, scale, dst) {
      dst = dst || new MatType(16);

      const x = quaternion[0];
      const y = quaternion[1];
      const z = quaternion[2];
      const w = quaternion[3];

      const x2 = x + x;
      const y2 = y + y;
      const z2 = z + z;

      const xx = x * x2;
      const xy = x * y2;
      const xz = x * z2;

      const yy = y * y2;
      const yz = y * z2;
      const zz = z * z2;

      const wx = w * x2;
      const wy = w * y2;
      const wz = w * z2;

      const sx = scale[0];
      const sy = scale[1];
      const sz = scale[2];

      dst[0] = (1 - (yy + zz)) * sx;
      dst[1] = (xy + wz) * sx;
      dst[2] = (xz - wy) * sx;
      dst[3] = 0;

      dst[4] = (xy - wz) * sy;
      dst[5] = (1 - (xx + zz)) * sy;
      dst[6] = (yz + wx) * sy;
      dst[7] = 0;

      dst[8] = (xz + wy) * sz;
      dst[9] = (yz - wx) * sz;
      dst[10] = (1 - (xx + yy)) * sz;
      dst[11] = 0;

      dst[12] = translation[0];
      dst[13] = translation[1];
      dst[14] = translation[2];
      dst[15] = 1;

      return dst;
    }

    function quatFromRotationMatrix(m, dst) {
      // http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm

      // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
      const m11 = m[0];
      const m12 = m[4];
      const m13 = m[8];
      const m21 = m[1];
      const m22 = m[5];
      const m23 = m[9];
      const m31 = m[2];
      const m32 = m[6];
      const m33 = m[10];

      const trace = m11 + m22 + m33;

      if (trace > 0) {
        const s = 0.5 / Math.sqrt(trace + 1);
        dst[3] = 0.25 / s;
        dst[0] = (m32 - m23) * s;
        dst[1] = (m13 - m31) * s;
        dst[2] = (m21 - m12) * s;
      } else if (m11 > m22 && m11 > m33) {
        const s = 2 * Math.sqrt(1 + m11 - m22 - m33);
        dst[3] = (m32 - m23) / s;
        dst[0] = 0.25 * s;
        dst[1] = (m12 + m21) / s;
        dst[2] = (m13 + m31) / s;
      } else if (m22 > m33) {
        const s = 2 * Math.sqrt(1 + m22 - m11 - m33);
        dst[3] = (m13 - m31) / s;
        dst[0] = (m12 + m21) / s;
        dst[1] = 0.25 * s;
        dst[2] = (m23 + m32) / s;
      } else {
        const s = 2 * Math.sqrt(1 + m33 - m11 - m22);
        dst[3] = (m21 - m12) / s;
        dst[0] = (m13 + m31) / s;
        dst[1] = (m23 + m32) / s;
        dst[2] = 0.25 * s;
      }
    }

    function decompose(mat, translation, quaternion, scale) {
      let sx = length(mat.slice(0, 3));
      const sy = length(mat.slice(4, 7));
      const sz = length(mat.slice(8, 11));

      // if determinate is negative, we need to invert one scale
      const det = determinate(mat);
      if (det < 0) {
        sx = -sx;
      }

      translation[0] = mat[12];
      translation[1] = mat[13];
      translation[2] = mat[14];

      // scale the rotation part
      const matrix = copy(mat);

      const invSX = 1 / sx;
      const invSY = 1 / sy;
      const invSZ = 1 / sz;

      matrix[0] *= invSX;
      matrix[1] *= invSX;
      matrix[2] *= invSX;

      matrix[4] *= invSY;
      matrix[5] *= invSY;
      matrix[6] *= invSY;

      matrix[8] *= invSZ;
      matrix[9] *= invSZ;
      matrix[10] *= invSZ;

      quatFromRotationMatrix(matrix, quaternion);

      scale[0] = sx;
      scale[1] = sy;
      scale[2] = sz;
    }

    function determinate(m) {
      var m00 = m[0 * 4 + 0];
      var m01 = m[0 * 4 + 1];
      var m02 = m[0 * 4 + 2];
      var m03 = m[0 * 4 + 3];
      var m10 = m[1 * 4 + 0];
      var m11 = m[1 * 4 + 1];
      var m12 = m[1 * 4 + 2];
      var m13 = m[1 * 4 + 3];
      var m20 = m[2 * 4 + 0];
      var m21 = m[2 * 4 + 1];
      var m22 = m[2 * 4 + 2];
      var m23 = m[2 * 4 + 3];
      var m30 = m[3 * 4 + 0];
      var m31 = m[3 * 4 + 1];
      var m32 = m[3 * 4 + 2];
      var m33 = m[3 * 4 + 3];
      var tmp_0 = m22 * m33;
      var tmp_1 = m32 * m23;
      var tmp_2 = m12 * m33;
      var tmp_3 = m32 * m13;
      var tmp_4 = m12 * m23;
      var tmp_5 = m22 * m13;
      var tmp_6 = m02 * m33;
      var tmp_7 = m32 * m03;
      var tmp_8 = m02 * m23;
      var tmp_9 = m22 * m03;
      var tmp_10 = m02 * m13;
      var tmp_11 = m12 * m03;

      var t0 =
        tmp_0 * m11 +
        tmp_3 * m21 +
        tmp_4 * m31 -
        (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
      var t1 =
        tmp_1 * m01 +
        tmp_6 * m21 +
        tmp_9 * m31 -
        (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
      var t2 =
        tmp_2 * m01 +
        tmp_7 * m11 +
        tmp_10 * m31 -
        (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
      var t3 =
        tmp_5 * m01 +
        tmp_8 * m11 +
        tmp_11 * m21 -
        (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);

      return 1.0 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);
    }

    /**
     * Computes the inverse of a matrix.
     * @param {Matrix4} m matrix to compute inverse of
     * @param {Matrix4} [dst] optional matrix to store result
     * @return {Matrix4} dst or a new matrix if none provided
     * @memberOf module:webgl-3d-math
     */
    function inverse(m, dst) {
      dst = dst || new MatType(16);
      var m00 = m[0 * 4 + 0];
      var m01 = m[0 * 4 + 1];
      var m02 = m[0 * 4 + 2];
      var m03 = m[0 * 4 + 3];
      var m10 = m[1 * 4 + 0];
      var m11 = m[1 * 4 + 1];
      var m12 = m[1 * 4 + 2];
      var m13 = m[1 * 4 + 3];
      var m20 = m[2 * 4 + 0];
      var m21 = m[2 * 4 + 1];
      var m22 = m[2 * 4 + 2];
      var m23 = m[2 * 4 + 3];
      var m30 = m[3 * 4 + 0];
      var m31 = m[3 * 4 + 1];
      var m32 = m[3 * 4 + 2];
      var m33 = m[3 * 4 + 3];
      var tmp_0 = m22 * m33;
      var tmp_1 = m32 * m23;
      var tmp_2 = m12 * m33;
      var tmp_3 = m32 * m13;
      var tmp_4 = m12 * m23;
      var tmp_5 = m22 * m13;
      var tmp_6 = m02 * m33;
      var tmp_7 = m32 * m03;
      var tmp_8 = m02 * m23;
      var tmp_9 = m22 * m03;
      var tmp_10 = m02 * m13;
      var tmp_11 = m12 * m03;
      var tmp_12 = m20 * m31;
      var tmp_13 = m30 * m21;
      var tmp_14 = m10 * m31;
      var tmp_15 = m30 * m11;
      var tmp_16 = m10 * m21;
      var tmp_17 = m20 * m11;
      var tmp_18 = m00 * m31;
      var tmp_19 = m30 * m01;
      var tmp_20 = m00 * m21;
      var tmp_21 = m20 * m01;
      var tmp_22 = m00 * m11;
      var tmp_23 = m10 * m01;

      var t0 =
        tmp_0 * m11 +
        tmp_3 * m21 +
        tmp_4 * m31 -
        (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
      var t1 =
        tmp_1 * m01 +
        tmp_6 * m21 +
        tmp_9 * m31 -
        (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
      var t2 =
        tmp_2 * m01 +
        tmp_7 * m11 +
        tmp_10 * m31 -
        (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
      var t3 =
        tmp_5 * m01 +
        tmp_8 * m11 +
        tmp_11 * m21 -
        (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);

      var d = 1.0 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);

      dst[0] = d * t0;
      dst[1] = d * t1;
      dst[2] = d * t2;
      dst[3] = d * t3;
      dst[4] =
        d *
        (tmp_1 * m10 +
          tmp_2 * m20 +
          tmp_5 * m30 -
          (tmp_0 * m10 + tmp_3 * m20 + tmp_4 * m30));
      dst[5] =
        d *
        (tmp_0 * m00 +
          tmp_7 * m20 +
          tmp_8 * m30 -
          (tmp_1 * m00 + tmp_6 * m20 + tmp_9 * m30));
      dst[6] =
        d *
        (tmp_3 * m00 +
          tmp_6 * m10 +
          tmp_11 * m30 -
          (tmp_2 * m00 + tmp_7 * m10 + tmp_10 * m30));
      dst[7] =
        d *
        (tmp_4 * m00 +
          tmp_9 * m10 +
          tmp_10 * m20 -
          (tmp_5 * m00 + tmp_8 * m10 + tmp_11 * m20));
      dst[8] =
        d *
        (tmp_12 * m13 +
          tmp_15 * m23 +
          tmp_16 * m33 -
          (tmp_13 * m13 + tmp_14 * m23 + tmp_17 * m33));
      dst[9] =
        d *
        (tmp_13 * m03 +
          tmp_18 * m23 +
          tmp_21 * m33 -
          (tmp_12 * m03 + tmp_19 * m23 + tmp_20 * m33));
      dst[10] =
        d *
        (tmp_14 * m03 +
          tmp_19 * m13 +
          tmp_22 * m33 -
          (tmp_15 * m03 + tmp_18 * m13 + tmp_23 * m33));
      dst[11] =
        d *
        (tmp_17 * m03 +
          tmp_20 * m13 +
          tmp_23 * m23 -
          (tmp_16 * m03 + tmp_21 * m13 + tmp_22 * m23));
      dst[12] =
        d *
        (tmp_14 * m22 +
          tmp_17 * m32 +
          tmp_13 * m12 -
          (tmp_16 * m32 + tmp_12 * m12 + tmp_15 * m22));
      dst[13] =
        d *
        (tmp_20 * m32 +
          tmp_12 * m02 +
          tmp_19 * m22 -
          (tmp_18 * m22 + tmp_21 * m32 + tmp_13 * m02));
      dst[14] =
        d *
        (tmp_18 * m12 +
          tmp_23 * m32 +
          tmp_15 * m02 -
          (tmp_22 * m32 + tmp_14 * m02 + tmp_19 * m12));
      dst[15] =
        d *
        (tmp_22 * m22 +
          tmp_16 * m02 +
          tmp_21 * m12 -
          (tmp_20 * m12 + tmp_23 * m22 + tmp_17 * m02));

      return dst;
    }

    /**
     * Takes a  matrix and a vector with 4 entries, transforms that vector by
     * the matrix, and returns the result as a vector with 4 entries.
     * @param {Matrix4} m The matrix.
     * @param {Vector4} v The point in homogenous coordinates.
     * @param {Vector4} dst optional vector4 to store result
     * @return {Vector4} dst or new Vector4 if not provided
     * @memberOf module:webgl-3d-math
     */
    function transformVector(m, v, dst) {
      dst = dst || new MatType(4);
      for (var i = 0; i < 4; ++i) {
        dst[i] = 0.0;
        for (var j = 0; j < 4; ++j) {
          dst[i] += v[j] * m[j * 4 + i];
        }
      }
      return dst;
    }

    /**
     * Takes a 4-by-4 matrix and a vector with 3 entries,
     * interprets the vector as a point, transforms that point by the matrix, and
     * returns the result as a vector with 3 entries.
     * @param {Matrix4} m The matrix.
     * @param {Vector3} v The point.
     * @param {Vector4} dst optional vector4 to store result
     * @return {Vector4} dst or new Vector4 if not provided
     * @memberOf module:webgl-3d-math
     */
    function transformPoint(m, v, dst) {
      dst = dst || new MatType(3);
      var v0 = v[0];
      var v1 = v[1];
      var v2 = v[2];
      var d =
        v0 * m[0 * 4 + 3] +
        v1 * m[1 * 4 + 3] +
        v2 * m[2 * 4 + 3] +
        m[3 * 4 + 3];

      dst[0] =
        (v0 * m[0 * 4 + 0] +
          v1 * m[1 * 4 + 0] +
          v2 * m[2 * 4 + 0] +
          m[3 * 4 + 0]) /
        d;
      dst[1] =
        (v0 * m[0 * 4 + 1] +
          v1 * m[1 * 4 + 1] +
          v2 * m[2 * 4 + 1] +
          m[3 * 4 + 1]) /
        d;
      dst[2] =
        (v0 * m[0 * 4 + 2] +
          v1 * m[1 * 4 + 2] +
          v2 * m[2 * 4 + 2] +
          m[3 * 4 + 2]) /
        d;

      return dst;
    }

    /**
     * Takes a 4-by-4 matrix and a vector with 3 entries, interprets the vector as a
     * direction, transforms that direction by the matrix, and returns the result;
     * assumes the transformation of 3-dimensional space represented by the matrix
     * is parallel-preserving, i.e. any combination of rotation, scaling and
     * translation, but not a perspective distortion. Returns a vector with 3
     * entries.
     * @param {Matrix4} m The matrix.
     * @param {Vector3} v The direction.
     * @param {Vector4} dst optional vector4 to store result
     * @return {Vector4} dst or new Vector4 if not provided
     * @memberOf module:webgl-3d-math
     */
    function transformDirection(m, v, dst) {
      dst = dst || new MatType(3);

      var v0 = v[0];
      var v1 = v[1];
      var v2 = v[2];

      dst[0] = v0 * m[0 * 4 + 0] + v1 * m[1 * 4 + 0] + v2 * m[2 * 4 + 0];
      dst[1] = v0 * m[0 * 4 + 1] + v1 * m[1 * 4 + 1] + v2 * m[2 * 4 + 1];
      dst[2] = v0 * m[0 * 4 + 2] + v1 * m[1 * 4 + 2] + v2 * m[2 * 4 + 2];

      return dst;
    }

    /**
     * Takes a 4-by-4 matrix m and a vector v with 3 entries, interprets the vector
     * as a normal to a surface, and computes a vector which is normal upon
     * transforming that surface by the matrix. The effect of this function is the
     * same as transforming v (as a direction) by the inverse-transpose of m.  This
     * function assumes the transformation of 3-dimensional space represented by the
     * matrix is parallel-preserving, i.e. any combination of rotation, scaling and
     * translation, but not a perspective distortion.  Returns a vector with 3
     * entries.
     * @param {Matrix4} m The matrix.
     * @param {Vector3} v The normal.
     * @param {Vector3} [dst] The direction.
     * @return {Vector3} The transformed direction.
     * @memberOf module:webgl-3d-math
     */
    function transformNormal(m, v, dst) {
      dst = dst || new MatType(3);
      var mi = inverse(m);
      var v0 = v[0];
      var v1 = v[1];
      var v2 = v[2];

      dst[0] = v0 * mi[0 * 4 + 0] + v1 * mi[0 * 4 + 1] + v2 * mi[0 * 4 + 2];
      dst[1] = v0 * mi[1 * 4 + 0] + v1 * mi[1 * 4 + 1] + v2 * mi[1 * 4 + 2];
      dst[2] = v0 * mi[2 * 4 + 0] + v1 * mi[2 * 4 + 1] + v2 * mi[2 * 4 + 2];

      return dst;
    }

    function copy(src, dst) {
      dst = dst || new MatType(16);

      dst[0] = src[0];
      dst[1] = src[1];
      dst[2] = src[2];
      dst[3] = src[3];
      dst[4] = src[4];
      dst[5] = src[5];
      dst[6] = src[6];
      dst[7] = src[7];
      dst[8] = src[8];
      dst[9] = src[9];
      dst[10] = src[10];
      dst[11] = src[11];
      dst[12] = src[12];
      dst[13] = src[13];
      dst[14] = src[14];
      dst[15] = src[15];

      return dst;
    }

    return {
      copy: copy,
      lookAt: lookAt,
      addVectors: addVectors,
      subtractVectors: subtractVectors,
      scaleVector: scaleVector,
      distance: distance,
      distanceSq: distanceSq,
      normalize: normalize,
      compose: compose,
      cross: cross,
      decompose: decompose,
      dot: dot,
      identity: identity,
      transpose: transpose,
      length: length,
      lengthSq: lengthSq,
      orthographic: orthographic,
      frustum: frustum,
      perspective: perspective,
      translation: translation,
      translate: translate,
      xRotation: xRotation,
      yRotation: yRotation,
      zRotation: zRotation,
      xRotate: xRotate,
      yRotate: yRotate,
      zRotate: zRotate,
      axisRotation: axisRotation,
      axisRotate: axisRotate,
      scaling: scaling,
      scale: scale,
      multiply: multiply,
      inverse: inverse,
      transformVector: transformVector,
      transformPoint: transformPoint,
      transformDirection: transformDirection,
      transformNormal: transformNormal,
      setDefaultType: setDefaultType,
    };
  })();

  const textures = {};

  var vertexShaderCode = [
    "attribute vec4 a_position;",
    "attribute vec2 a_texcoord;",
    "attribute float a_zOffset;",
    "attribute vec4 aVertexColor;",
    "",
    "uniform mat4 u_matrix;",
    "",
    "varying vec2 v_texcoord;",
    "varying vec4 vColor;",
    "",
    "void main() {",
    "gl_Position = u_matrix * (a_position * a_zOffset * float(128)) + vec4(0,0,1,a_zOffset);",
    "v_texcoord = a_texcoord;",
    "vColor = aVertexColor;",
    "}",
  ].join("\n");

  var fragmentShaderCode = [
    "precision mediump float;",
    "",
    "varying vec2 v_texcoord;",
    "varying vec4 vColor;",
    "",
    "uniform sampler2D u_texture;",
    "",
    "void main() {",
    "gl_FragColor = texture2D(u_texture, v_texcoord) * vColor;",
    "}",
  ].join("\n");

  var quadPositions = [0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1];

  var quadCoords = [0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1];

  var quadZPositionArray = [1, 1, 1, 1, 1, 1];

  var quadColors = [
    1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
    1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
  ];

  var TriangleZPositionArray = [1, 1, 1];

  var triangleColors = [
    1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
  ];
  var quadPositionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, quadPositionBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array(quadPositions),
    gl.STATIC_DRAW
  );

  var quadZPositionBuffer = gl.createBuffer();

  var quadTexCoordBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, quadTexCoordBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(quadCoords), gl.STATIC_DRAW);

  var quadColorBuffer = gl.createBuffer();

  var triPosBuffer = gl.createBuffer();
  var triUVBuffer = gl.createBuffer();
  var tricolorBuffer = gl.createBuffer();
  var triZBuffer = gl.createBuffer();

  /**
   * @param {string} code
   * @param {number} type
   * @returns {WebGLShader}
   */
  const compileShader = (code, type) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, code);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(shader));
      throw new Error("Error compiling shader");
    }
    return shader;
  };

  /**
   * @param {WebGLShader} vertexShader
   * @param {WebGLShader} fragmentShader
   * @returns {WebGLProgram}
   */
  const createProgram = (vertexShader, fragmentShader) => {
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      throw new Error("Error linking program");
    }
    gl.validateProgram(program);
    if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      throw new Error("Error validating program");
    }
    return program;
  };

  const vertexShader = compileShader(vertexShaderCode, gl.VERTEX_SHADER);
  const fragmentShader = compileShader(fragmentShaderCode, gl.FRAGMENT_SHADER);
  const program = createProgram(vertexShader, fragmentShader);

  // look up where the vertex data needs to go.
  const positionLocation = gl.getAttribLocation(program, "a_position");
  const texcoordLocation = gl.getAttribLocation(program, "a_texcoord");
  const zLocation = gl.getAttribLocation(program, "a_zOffset");
  const colorLocation = gl.getAttribLocation(program, "aVertexColor");

  // lookup uniforms
  const matrixLocation = gl.getUniformLocation(program, "u_matrix");
  const textureLocation = gl.getUniformLocation(program, "u_texture");

  //cool drawing functions

  /**
   * @param {number} deg
   * @returns {number}
   */
  function degreesToRadians(deg) {
    return deg * 0.0174533;
  }

  function loadImageAndCreateTextureInfo(url, clamp) {
    const texture = gl.createTexture();
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
    if (clamp) {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    } else {
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
    }
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);

    const textureInfo = {
      // we don't know the size until it loads
      width: 1,
      height: 1,
      texture,
    };

    Scratch.canFetch(url).then((allowed) => {
      if (!allowed) {
        return;
      }
      // Permission is checked earlier.
      // eslint-disable-next-line no-restricted-syntax
      const image = new Image();
      image.onload = function () {
        textureInfo.width = image.width;
        textureInfo.height = image.height;

        gl.bindTexture(gl.TEXTURE_2D, textureInfo.texture);
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGBA,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          image
        );
      };
      image.crossOrigin = "anonymous";
      image.src = url;
    });

    return textureInfo;
  }

  function drawImage(tex, texWidth, texHeight, dstX, dstY, stampRotation) {
    gl.bindTexture(gl.TEXTURE_2D, tex);

    // Tell WebGL to use our shader program pair
    gl.useProgram(program);

    gl.bindBuffer(gl.ARRAY_BUFFER, quadZPositionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(quadZPositionArray),
      gl.STATIC_DRAW
    );

    gl.bindBuffer(gl.ARRAY_BUFFER, quadColorBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(quadColors),
      gl.STATIC_DRAW
    );
    // Setup the attributes to pull data from our buffers
    gl.bindBuffer(gl.ARRAY_BUFFER, quadPositionBuffer);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, quadZPositionBuffer);
    gl.enableVertexAttribArray(zLocation);
    gl.vertexAttribPointer(zLocation, 1, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, quadTexCoordBuffer);
    gl.enableVertexAttribArray(texcoordLocation);
    gl.vertexAttribPointer(texcoordLocation, 2, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, quadColorBuffer);
    gl.enableVertexAttribArray(colorLocation);
    gl.vertexAttribPointer(colorLocation, 4, gl.FLOAT, false, 0, 0);

    // this matrix will convert from pixels to clip space
    var matrix = m4.orthographic(
      0,
      gl.canvas.width,
      gl.canvas.height,
      0,
      -1,
      1
    );
    if (coordinateSpace == "Canvas") {
      matrix = m4.translate(matrix, dstX, dstY, 0);
    } else {
      var scalemultiplyer = canvas.width / runtime.stageWidth;
      matrix = m4.translate(
        matrix,
        (runtime.stageWidth / 2) * scalemultiplyer,
        (runtime.stageHeight / 2) * scalemultiplyer,
        0
      );
      matrix = m4.translate(matrix, dstX, -dstY, 0);
    }

    // this matrix will translate our quad to dstX, dstY

    matrix = m4.zRotate(matrix, degreesToRadians(stampRotation));

    // this matrix will scale our 1 unit quad
    // from 1 unit to texWidth, texHeight units
    matrix = m4.scale(matrix, texWidth, texHeight, 1);
    matrix = m4.translate(matrix, stampOffset[0], stampOffset[1], 0);

    // Set the matrix.
    gl.uniformMatrix4fv(matrixLocation, false, matrix);

    // Tell the shader to get the texture from texture unit 0
    gl.uniform1i(textureLocation, 0);

    // draw the quad (2 triangles, 6 vertices)
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  function drawTexturedTri(tex, trianglePoints, triangleUvs) {
    gl.bindTexture(gl.TEXTURE_2D, tex);

    gl.bindBuffer(gl.ARRAY_BUFFER, triPosBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(trianglePoints),
      gl.STATIC_DRAW
    );

    gl.bindBuffer(gl.ARRAY_BUFFER, triUVBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(triangleUvs),
      gl.STATIC_DRAW
    );

    gl.bindBuffer(gl.ARRAY_BUFFER, triZBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(TriangleZPositionArray),
      gl.STATIC_DRAW
    );

    gl.bindBuffer(gl.ARRAY_BUFFER, tricolorBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array(triangleColors),
      gl.STATIC_DRAW
    );

    // Tell WebGL to use our shader program pair
    gl.useProgram(program);

    // Setup the attributes to pull data from our buffers
    gl.bindBuffer(gl.ARRAY_BUFFER, triPosBuffer);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, triUVBuffer);
    gl.enableVertexAttribArray(texcoordLocation); //
    gl.vertexAttribPointer(texcoordLocation, 2, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, triZBuffer);
    gl.enableVertexAttribArray(zLocation); //
    gl.vertexAttribPointer(zLocation, 1, gl.FLOAT, false, 0, 0);
    gl.bindBuffer(gl.ARRAY_BUFFER, tricolorBuffer);
    gl.enableVertexAttribArray(colorLocation); //
    gl.vertexAttribPointer(colorLocation, 4, gl.FLOAT, false, 0, 0);

    // this matrix will convert from pixels to clip space
    var matrix = m4.orthographic(
      0,
      gl.canvas.width,
      gl.canvas.height,
      0,
      -1,
      1
    );

    // this matrix will translate our quad to dstX, dstY

    // this matrix will scale our 1 unit quad
    // from 1 unit to texWidth, texHeight units

    if (coordinateSpace == "Scratch") {
      var scalemultiplyer = canvas.width / runtime.stageWidth;
      matrix = m4.translate(
        matrix,
        (runtime.stageWidth / 2) * scalemultiplyer,
        (runtime.stageHeight / 2) * scalemultiplyer,
        0
      );
    }

    // Set the matrix.
    gl.uniformMatrix4fv(matrixLocation, false, matrix);

    // Tell the shader to get the texture from texture unit 0
    gl.uniform1i(textureLocation, 0);

    // draw the quad (2 triangles, 6 vertices)
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  function hexToRgb(hex) {
    if (typeof hex === "string") {
      const splitHex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return {
        r: parseInt(splitHex[1], 16),
        g: parseInt(splitHex[2], 16),
        b: parseInt(splitHex[3], 16),
      };
    }
    return {
      r: Math.floor(hex / 65536),
      g: Math.floor(hex / 256) % 256,
      b: hex % 256,
    };
  }

  function getspritecostume(util, c) {
    let target = util.target;
    let dataURI = target.sprite.costumes[c - 1].asset.encodeDataURI();
    return dataURI;
  }

  async function coolcash(uri, clamp) {
    if (!textures.hasOwnProperty(uri)) {
      textures[uri] = await loadImageAndCreateTextureInfo(uri, clamp);
    }
  }

  //Split Blocks Function
  function splitBlockCatagories(Catagories) {
    let returnedArray = [];
    Catagories.forEach((Catagory) => {
      Catagory.blocks.forEach((Block) => {
        if (!Block.blockIconURI && Catagory.icon) {
          Block.blockIconURI = Catagory.icon;
        }
        returnedArray.push(Block);
      });
      returnedArray.push("---");
    });

    return returnedArray;
  }

  const BlankIcon =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABZCAYAAAC+PDOsAAAAAXNSR0IArs4c6QAAAihJREFUeF7t3VtuwyAQBdB4Cd1S19XPrqtb6hJakcQOJtjmMQPzuPwgJGuAoyt+LMFye7S/Z792SzLGsFMggKbIcUmAdwLHyd2gP36+b7+fX2lpYBNgb4kOyGsDNoFs5iy+JzqGDmNg02JnE41k0yKHaqfQSDYd+CU0sGmwi6CB3Y9dDA3sPuwqaGC3Y1dDA7sNuwka2PXYzdDArsPuggZ2OXY3NLDLsEmggX2NTQYN7HNsUmhgH2OTQwM7j80CDex3bDZoYO+xWaGB/cJmhwb2A3sINLAHQnvHHpbo9bTy+nd9OLTXZE+B9og9Ddob9lRoT9jTob1gi4D2gC0G2jq2KGjL2OKgrWKLhLaILRbaGrZoaEvY4qGtYKuAtoCtBlo7tipozdjqoLViq4TWiK0WWhu2amhN2OqhtWCbgNaAbQZaOrYpaMnY5qClYpuElohtFloatmloSdjmoaVgu4CWgO0Geja2K+iZ2O6gZ2G7hJ6B7RZ6NLZr6JHY7qFHYQM6SA+4ixXQT2hubEBH0JzYgE6gubABnYHmwAb0ATQ1NqBPoCmxAX0BTYUN6AJoCmxAF0L3YgO6AroHG9CV0K3YgG6AbsEGdCN0LTagO6BrsAHdCV2KDWgC6BJsQBNBX2EDmhD6DBvQxNBH2Bt0+CB905BhDW5KJjdWLgE6tN1zqG40mDcaY79BM8/ttvwKvUu1Ww2+jW9HR26Ks2es+ZZko3Ic4PuO/gGXQ1VnDpD+gwAAAABJRU5ErkJggg==";
  const CoordsIcon =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGIAAABgCAYAAADmbacFAAAAAXNSR0IArs4c6QAAA2xJREFUeF7tncFxwyAQRe0S0pKLSDWZHDKpJkWkpZSQDJKxkAwsYtfMRn65OaBl+U8fMLLx+bT++72+PG/+X3oZ64fy3DVSeWMzx68WxUsFi72WYEjXSOXHV3dHD4PYk2Av35+3y34ubxKMWeSP16Wp96/0Gql8R4rPUXUCkUKI3b7CKLnidwUhXrTAWENal0tOew7lN72UQJTH/tQNadAII1c+lwEic6v1g9gOTeldX4cEiCEgSgPLeg55yuGn1uleR4SY9xNyrSWGperNNwYEbhBHAA2INlcAQYQQVzC15WvLKie/lL1f0jJJV5BoHSG7grlhiCPkCZuhyQmIkAauEGFohibZDcwTIoBYYQwIXCEC6QXR7gZcIULQLF/LS9YwH7DX1CR+WqnfEey+7hb7EXtNPI8wxTA/G+h5Zy09gZPKjbvx/8P1gljeUa81SLcxeGa94/7QgIjNBMFr+0hS+Y50j1vVAsRx1RnYM0AMFPsRqyYn6R8nDRzhhCUgAOFEASdp4AhAOFHASRo4AhBOFHCSBo4AhBMFnKSBIwDhRAEnaeAIQDhRwEkaOAIQThRwkgaOAIQTBZykgSMA4UQBJ2ngCEA4UcBJGjgCEE4UcJIGjgCEEwWcpIEjAOFEASdp4AhAOFHASRo4AhBOFHCSBo4AhBMF7NJoPfU5Ww9H2IDIfYM2RN5+ybP4TVtA6EHkzyW5Pxqp+t1zQFiAKB82HF1RPkTmCgwQjwIR4kpHdC91zoCwABFi1F0hntgDiEeCiHe8dJLP6YQj9BymCOqDxHCEEYkJRunOz7WxOf0TEJYgSnPFto3MEayAsAPRPkQBwlb1TDR5rigcSIwj7NnUYRQOIwbESBCV47kBYQuiyw23fZDKr27ldhBtUz9WtPp5uHNftzuyt3/2nHJ5LPlsetPtBhxhAyBG6XYDIOxAqNwACEsQDRt7teZYNelhSA99mhY8gLAAoXQDQ5Mewry/JD8qFVvCEaJEYoXahweahiUcIWrcXGGBkT6n3vFLxTiiWWux4vYzS9l30KUogBD1HVMBEGN0FlsBhCjRmAqAGKOz2EoLCDEIFVQKTJN6EYQqNBc3KfBzeYv1yh8wa4pEJbUCEQaOUEupDxBgAEKvozoCINQS6gOshiZ9OCIoFZgna2UQLu9X4LYf9Qeqxh17SNwkIgAAAABJRU5ErkJggg==";
  const SpriteIcon =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABeCAYAAADc6BHlAAAAAXNSR0IArs4c6QAABItJREFUeF7tncuN2zAQhu0SctmCAuSQDnLZAlLCAjkG2BJSwF62gxwWSEG5pIQEFJYKRQ5f8+BzfLSoMfV/8yIl2/db+PrrvXUHxti3/LGJobeUndR5Sx9zRUmJWTquVCyF8a4UKOzj89Pt5em5VMxj3Idf34Pxfz5+y9nYHoQV4PR+I777ioGABM+pHQGyNYRqABjhfTAAiG0hRAH4ns8hvIIIc0RRcZUQ307Fi4btIiELQFJ8hXALevNLK9pC/N0h+CF/Amgp/s4QFECudxY+DtaAHt6/axQoAGEPz5kP1gE9vR+IguXb0tEBGCZLQ7gAGMH7jeI7Lc6GBOBB0AjIFRKJ404UKAAJgXM2dwLQdfUbA7ETAKPBAWGUIgwUYpfTUilpmCJccPsyFixTA+kOgCC8D2RKEN0AQMI//n7L1ebz+MvDpyUiostK2Be/RnhIdQDGNNHQFAC38C6MSEQMDyLYDZXqhCTFT4CYD4BUO+oCoKacXKHwomFoCOAdMe4oaCm+hTMLBPFbkj3EnwkCFJ5sWxM9xTcQZoiCWH5kgdAbwAwQsgAoRdkCkC66FUV5uIKcmhDpIa0RvH+GWpDzCDSEUbx/9DSUA3BuVbthnmtTR/J+IApKrjmX1diO10wG/ApT7psxvfP/SgDstdR8Me82IABzHTWOx+btkCHKRIpAKIA0PwoAyHIARQG0BXBJU6OIP3InxB0BQZ3oDSFx54w7JaNqxZIAKkXvemtzKQAp4b/8/BH10NfPX1PeK6XR8ZmSxo+C3CoFQeKnRI8pHoEhppOYYfuwlzQAX3iM6BAMAISIViJG3y/o/88fVDxuUlPJpMR35yANYloALcS3IDwIrJqxGgO8VywKXABcaScVfVIQpgTQWnzJSJAGYObOGgW9xJeC0AIAKwQLoEXaKeiOyPqRDRR2LZdNOmxr2tv7JaKgFYBLFGAXaL29f3YAJAijeD8AgeTEpJML048/DHXPYGAApC2dHgCCLWv7Rqo2jJJ+uNNQTwBBSoIiykJRAMh8U3ha0f1lY6tX+5lpSdGOjD6xUFjMsCQMBYCRlH7OCUUB0MXEWFAAGNWYzzkgaAQwq1phbigAXNvTIxbhGJNmAFxxYxG3LQDJNBR7OgKCoAAqclfJ0MyjKUHtccaTsgjp5JILYx4jloasoKn/T7CRwOX9pE0kZmFLzYm0o66gPgAzMfen/A2EnQGc+0ec7WgOgA/B8RZyBiEbKHVdxnFdoiACgawf2QCjsDWm2CH4RRhKRQAEsn5kAzWqMY69bNhxpaMeEGYFcNYCC3VWCDMDWALC7ACmh7ACAJuFWOpCakUsUZhXAhBEQ019yG1FWFvcEFYDAEYDsvtytbk+2ef93aO17/35XZG2RYOQFzDCacU3+wtWtyIQVgcQcwIjJuba2SFgJjGCZ/ecAysEBYBDyQZBAeAABB0XtjtSAHgALBAUAA0AGYICoAMgQVAAPADQEBQAHwAMhLsC4AVQBMHdslAA/ACyEBwAGgEy+h9WwcWav2GnESBIwIcAfJRGgKz+YST4u67/APKrBHxjStmdAAAAAElFTkSuQmCC";
  const ColorIcon =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF4AAABeCAYAAACq0qNuAAAAAXNSR0IArs4c6QAABTFJREFUeF7t3b2KFEEUBeAecBVkk8nERBSMBEGMTDcxN/IhfATDRdinMDSaV5gn8REEo40MlBqoobrmVtWtqvtzWnYzd3tmer46ffrOr7tlOz9/mbu6Y27nuhniTnKBe+Gg7ivKzmhhlxbH/X577UAT+smnD81EP3r9vLnN/d2huc2yLOYO1jdYBOdA54Ic+PwyjYUw87C6IRJ8BDuFHIFPL19ZBHUX9RtYluUCfRY84s3Cx+spLICqjeaVq4FLw3ssgAa8OrgWvOUCSMOv0KUqpTSWSFVN6fqJChLzEruivMu10QOWNny4DS18CXjTlEtONZwBv1I/U3ZTF/ZIuRe8dPpn4N2Srn1yrR0JUtUzCu+ObtXx1CJI4I/AQ6B7wkvUTi88DLo3/Cz+MLzFuNiaOizGydY+ZLXD9mRvmE4wCOgIiS+MmixT1kaI6EjwRO00XZsboKKjwffiP8C3Srzj7z1934I/TzEove75yJWzBlx8FjwiOmLVECfbom8N/pz26xfPlj/vX3IW3HQbhHGS8ciWNC7Br9DTK0daAET4xx/fnbh+33xN2S6cu+HDtaHgI8FH8Kg9Al9Me35YeS8AAnwOnhrV8KnEs+HjjXgtgCf8/d1htz/eVt+Y1QPfje6J7wVfS3neCiX8PPHD8B4LYA3fA97qehI+jI+zPxb1YwU/Al7o+rO3GrzF9GMBP4uejZYk/HTNlI4SrfRrwkuA1+omTfwJXqJmrBZAA14SvFY3pvDS9SMJrwVOpP5kHuHVakYz/VLw2ujUUwhu8BLj5yy8BXip51fwmv3eGk9HTsCj8JbgpZ6HgR/p/154L3Cq56Hge+unB94bPZ/nIeG5C8CBRwAvJd58omn1ffr3WvfX4JHAqRNsSDw0fC39FDwi+KbhqQXI4ZHR81l+M4mn6ifCo4P/F4lPF+Dq+5ee04X7tumLIptMfBC8un663Pz4dsI8/vrpjsrZgU3DB/D4E+Hjv9EXYJPwKXgJHj39m4On0ANynvj0cEdM/2bgS+C1xOddi7QAOXzYV/VXnzgnn9XEknR56bK1xCOmP4HfwT1X00p5CsqFRzn5QsL3gPdUDXW0eNUPHPwIeuvk2qo2D/wifNhZy1ehRsFnE+/R//lb+Vxec50Fl4S36v8SvNlkI4U+WzXW3Z/WTLhts/fVSIJrJF67fprw0j2vAa4NL10/1Fu1Vd+0qomuUTVa9ZOnPa8asZ7XBrdKvFT9sOFH68YK3AN+tH7UPxFijW5VNbP1w4U/1w039R7gnonvqZ+eD5+x4T3BUeBb9dML38RHQPesGqp+wu/S539S9P3xNnzSezVBdn2yGwUcLfFU/Yx8sjtez+odZmjoiImPcIe3n89rQaWdmuPzo+iEv3/zqnR0uf6+94UQq51N4E+f/s5rhg2Pio8In6a99n+PtL4oaHWiRUs+GjwXnZP4B/iOfpKGh8VHSnwPOjfxF1MOSuWgwPei98LDJR8BfgR9Ch5h0vGGz9C7PDlTDTnbx1961o4n/Ax61wpl+quvhPLC94KfRZ+BX/W9V+14wEugz8K741vDS6FLwLviW8JLokvBX8z5VtVjAS8NHrFGpprag2jTk642vBa6dOLJ5GumXwueABe3kk58ejRcfAup9NgpDW8BrlU1VA2pLYAUvCW4JfzF5CP1qHcWvgAuXitUGjWrhpX+mUUYga9gm4BbJ776fA+1QpzzAQe+Ae3mYJ340iha/Trw2vw6+Df3++2+AwSc1iJA3VeonWmkl7sgm7hP/wDwgcxktVR5CQAAAABJRU5ErkJggg==";
  const LineStyleIcon =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE4AAABOCAYAAACOqiAdAAAAAXNSR0IArs4c6QAAAkxJREFUeF7t2m1OBCEMBmDnCF7Jc/nTc3klj7CG0TFIgLbsQD9498cmm2kUn22BgscLXpTAowg40ufzDa+mQIl2BR6Aa2fNifb6+fEv4uvt/fwMuDpcFS2FAk6YaVc44ISZBrjBTMvLNE1xmON+IJtzWplp17oAuAE0rKqDaLvDicsznx53LdWn0HbNuKfRAFfZmlwbXKqr2rFUyXaKQkPGZRnHzbS/45FNj5Sax0Vcj+ilWj2E/MXpPSP9IsM9nVU9vahw3UNIzuRPpVxEuFtWzd3guptb6cq5S6ne0hFQmRZtO7IULcoGeDlaBDgVNO9wamie4VTRvMKpo3mEM4HmDc4Mmic4U2he4MyhuYEr/9Uqb4vu7D+57ZZ7OC0013CaaG7g0kDzctVG8wKXxlk7Blc9hFX95cVkzMFJMSbGbGIQeUalkrRQitQKawFu+sUKhTDyXBuOc0egPcaqq+agOGhmFzAtOJNtlKRkNeDco2mUQQi01XBh0FbChUJbBRcObQVcSLTZcGHRZsKFRpsFFx5tBtwWaFPgLF6sSFopbuzdLdejBefhjI2LtizjoqFNgbN4sSLJJG7s3aVq8mKFiyGJG4UrL1ZGf45krKZiR/7g2m3UjLI3BVUORgrn8mJlxjcggWtubiOumhQ2F871xQqFMPKcA7dNGyUBpOCA1tDswQGtk4ItOKARdVuDAxpjsivhgMZAK3f7QGOi5XBAE6BdcEATorHgdmynOI5pcUAPypEqYppwyLS+5rUdwRmbMOvyfdz2p7oSu299qhZaTMEypAAAAABJRU5ErkJggg==";

  //Block Catagories in pen+ version 5.0
  const UtilityBlocks = {
    blocks: [
      {
        blockIconURI: SpriteIcon,
        opcode: "precachetextures",
        blockType: Scratch.BlockType.COMMAND,
        text: "Start loading image from url: [uri] clamp the texture? [clamp]",
        arguments: {
          uri: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: EXAMPLE_IMAGE,
          },
          clamp: {
            type: Scratch.ArgumentType.STRING,
            menu: "TFmenu",
          },
        },
      },
      {
        blockIconURI: SpriteIcon,
        opcode: "getcostumedata",
        blockType: Scratch.BlockType.REPORTER,
        text: "Get data uri of costume[costu]",
        arguments: {
          costu: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: "1",
          },
          spr: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: "1",
          },
        },
      },
      {
        blockIconURI: BlankIcon,
        opcode: "SolidColorRet",
        blockType: Scratch.BlockType.REPORTER,
        text: "Solid Color",
        disableMonitor: true,
      },
      {
        blockIconURI: ColorIcon,
        opcode: "rgbtoSColor",
        blockType: Scratch.BlockType.REPORTER,
        text: "Convert R[R] G[G] B[B] to Hex",
        arguments: {
          R: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: "255",
          },
          G: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: "255",
          },
          B: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: "255",
          },
        },
      },
      {
        blockIconURI: ColorIcon,
        opcode: "hsvtoSColor",
        blockType: Scratch.BlockType.REPORTER,
        text: "Convert Hue[H] Saturation[S] Value[V] to Hex",
        arguments: {
          H: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: "0",
          },
          S: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: "100",
          },
          V: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: "100",
          },
        },
      },
      {
        blockIconURI: CoordsIcon,
        opcode: "setCoordSpace",
        blockType: Scratch.BlockType.COMMAND,
        text: "Set the coordinate space to [space]",
        arguments: {
          space: {
            type: Scratch.ArgumentType.STRING,
            menu: "coordTypes",
          },
        },
      },
      {
        blockIconURI: CoordsIcon,
        opcode: "coordBlock",
        blockType: Scratch.BlockType.REPORTER,
        text: "[c1][c2][c3][c4][c5][c6]",
        arguments: {
          c1: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: "0",
          },
          c2: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: "0",
          },
          c3: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: "0",
          },
          c4: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: "0",
          },
          c5: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: "0",
          },
          c6: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: "0",
          },
        },
      },
    ],
  };

  const StampBlocks = {
    icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGIAAABYCAYAAAAORCLFAAAAAXNSR0IArs4c6QAAArZJREFUeF7tnDFSwzAQRe2SgoIr0XCTlJyAkhNQ5iY0XImCghLGmcijmBjLWe3qJ35UDCPtrv7T1yrG0HfxXz/xKVdn7FfPME6ITngNEHJJw/QJS9R13QmEu92TcQ/5TP/ev28HhCqERKAFjHBHqEMYYNwyiPFYugYQExghmzUkSd4fAHG+twFipudnx1OIRiFJcMTyDQ8QOGJ5l7QcwdHUUv0sNyAA4aoAnyMW5KVZ06xdHWgOTo8wS1gnACDq6GiOAgizhHUCAKKOjuYogDBLWCcAIOroaI4CCLOEdQIAoo6O5ig3D8KsUHyAkKcPIUmmr9LEa2nKGKJRSJIVMhweDt6/7f6d8vW8XxFydqjU2qWKSc5ZAnEphQlAqbVLFQOIS7dY/XlFR5MlbeYKqU0oVYy3IwaAgCjbxjiiTCf3UYBwl7gsASDKdHIfBQh3icsSAKJMJ/dRkSCGxcjcGmUKOSIGhPteL0sAiDKdXEeNbwN6PWuafKDjaJrBCQjXfV4ePASE6mMOpWYNiPJN6zoSEK7ylgcHRLlWriPdr66pesXf1Mn1CM+rKyDKjIQjynRyHxUGQvEKq3I0hTXqM8eThAYSReQvoEX0CBwxf7qFHkuKz5zmHNHkX75FuWHm9uTeBI8Jzmqe/7CJ+PnqNwIiX/Kof/qmKYRoALkSld6jtbqpH0CcQGgpinU11zR/+un+BAQQYlHmMEYQQIiFML0wAKKN/mPW5ApAAKKxAiLpcQQgRBQQKQNHAEJEAZEycAQgRBQQKQNHAEJEAZEycAQgRBQQKQNHAEJEAZEycAQgRBQQKQNHqIIQqWuzZfx5i2OzSjReOCAaA0jpRxAPH68iJW2rjM/Hl8OCAdGYOyAaA0jpAQEIEQVEysARqiCGurg5xdJJbji5NcWWQLapAhJ/qAKWrv8Fl7tFSQcWbxYAAAAASUVORK5CYII=",
    blocks: [
      {
        opcode: "pendrawspritefromurl",
        blockType: Scratch.BlockType.COMMAND,
        text: "Stamp the image from url: [url] at x:[x] y:[y]",
        arguments: {
          url: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: EXAMPLE_IMAGE,
          },
          x: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: "240",
          },
          y: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: "180",
          },
        },
      },
      {
        opcode: "rotateStamp",
        blockType: Scratch.BlockType.COMMAND,
        text: "Set stamp rotation to [ANGLE]",
        arguments: {
          ANGLE: {
            type: Scratch.ArgumentType.ANGLE,
            defaultValue: "90",
          },
        },
      },
      {
        opcode: "getstamprotation",
        blockType: Scratch.BlockType.REPORTER,
        text: "Stamp Rotation",
        arguments: {
          ANGLE: {
            type: Scratch.ArgumentType.ANGLE,
            defaultValue: "90",
          },
        },
      },
      {
        opcode: "setpenstrechandsquash",
        blockType: Scratch.BlockType.COMMAND,
        text: "Set stamp width to [width] and height to [height]",
        arguments: {
          width: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: "64",
          },
          height: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: "64",
          },
        },
      },
      {
        opcode: "getstampwidth",
        blockType: Scratch.BlockType.REPORTER,
        text: "Stamp Width",
        arguments: {},
      },
      {
        opcode: "getstampheight",
        blockType: Scratch.BlockType.REPORTER,
        text: "Stamp Height",
        arguments: {},
      },
      {
        opcode: "setstampcolor",
        blockType: Scratch.BlockType.COMMAND,
        text: "Tint stamp by [color] and transparency[T](0-255)",
        arguments: {
          color: {
            type: Scratch.ArgumentType.COLOR,
            defaultValue: "#ffffff",
          },
          T: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: "0",
          },
        },
      },
      {
        opcode: "offsetStamp",
        blockType: Scratch.BlockType.COMMAND,
        text: "Set stamp anchorPoint to [Anchor]",
        arguments: {
          Anchor: {
            menu: "AnchorPointMenu",
            type: Scratch.ArgumentType.STRING,
            defaultValue: [0, 0],
          },
        },
      },
    ],
  };

  const TriangleBlocks = {
    icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGIAAABiCAYAAACrpQYOAAAAAXNSR0IArs4c6QAABGtJREFUeF7tncGxEzEMhpMZrhwogAYog2a4UAJHSuBCM5TxGqAADlyZgXGIg+Pd9UqyJP82yuXNvHi9sj7/siUnm+sF//X7buIV31S5heiDyxDyCNHtFZNAHlgNYWkYqCAeEF5/+XAD8PPj13K2odq9nCIChBip7oU3EFkNueuVVYEo8Y0aMohX795efrz/tORaAQuiVkPyfgUi/QvRflFsQBvIoRoyiPS3UMUyMAKEaP7qXwQJ4s23z5dfL983o02hKb9WUwUSiEdYooCoQhTSOERyQRrADUSCkF5nilhtrUAB8aQGKoiVYAQIUSDRvwgBxEYNHEWsoooAoT+5RT3CgNjLpDkjmr0ONRpEM5PmgEhtZ4YBAaJXDStUZ0eCUFXD7DACBDf+GbUfDiJn0r3jKzPxGdeKUSB2c4ceGHVJpIAxaoys4Ywy8qmuxLL4oHEDxBRnFiNAqKvhKBOfKUQFCA05KvThDcJEDa3a1CwHSAFCYTZrdDEEhNaWtXRA6yBpBlV4gjALS5SyOTqMAKERVxT68AJhqgaKItAPkNxBaFVaJZMQOa9wBTESAnp11gOESblboogdGB7jJ5nqYcjuR+xJ1hk1QgxR1iDg1IAaotxAUJM4yif8NISClldYghBtWb1AoG1nA8Q/eVn64lTEljcXHf54KgJJFVYgRGGJmiGfTi9mA4T1IkCAfBXMAoRYDaMUgRCiAsQ9jI0OT2YgqHlDHc69F+vy/iNhaIPoCksjQ1MGMuoL9SYgpGoAA5HM0fbP4X5O80bdakAAMWrhNgGBcO7ATCWemo+ozqqDmB3CqOqsFgjYcreSMrT8ZL5GwB3+9AAYoQoN0kuqIcHwfCyRGYjyASYas5PSh0Uy6JXk9YJoPm2M4jzNNhYgvLazAYIwEzxUoQLi6LFvhDGqNrFShIcqekCQHvum6umTzixBWMPoBkF9yJUHkP8RBPtpYyuAsFSFVBEB4u/MkvpvMy+lHbEf+7aKIqxUIQEhfuybNQzrNaK0X/sASQyiPPzxdEALpqcd2rkFF8SydSWJWjXPLQKEhMD9mlEgQg070LRgcBQRIJBAHGXSHQqf9tJc6tdYuKmKUPmExpHHPXc7Z9SltvTCCBAVGWQQpmpIfpAO/mx2S97vsaVHFRRFBIjidytacF1A9HyM8mxm9szCs7657/faIoVxpghzNawUmjJ0SR2KBMJSDYuDIJfKWyBc1LAiCEmpPEAobV/rtYi7VhyBcFPDqorgqiJAGClCFYT1Ip190Ltl5G5RPQ+XqCFqTxFRZdUkS/yBkQCh7PS97ihnFjWIUIMRmDMYAcLI8XW3IhCrfA/Oycfk27RglIpg5Q4oO53Z7DiqQ21AULesszmAPG2FDan+ONrOZhAsNSBlw1QHCP1Lvoxjxx6MAEF2dbuhKghqWApFbKFwQOyVP5Ii2GEpQPSDqGBcA8SA0JRvWa4VTyBSA2p44kpRabybbma2owaRBvcIT1YOi37bHthN6MJp7h64/gHORJl+nCcCdQAAAABJRU5ErkJggg==",
    blocks: [
      {
        opcode: "pendrawtexturedtrifromurl",
        blockType: Scratch.BlockType.COMMAND,
        text: "Draw a triangle with points at(seperated by commas)[trianglepoints] and the uvs of [triangleuvs] with the image from url:[url]",
        arguments: {
          url: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: EXAMPLE_IMAGE,
          },
          trianglepoints: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: "0,0,10,10,0,10",
          },
          triangleuvs: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: "0,0,1,1,0,1",
          },
        },
      },
      {
        opcode: "settripointcolour",
        blockType: Scratch.BlockType.COMMAND,
        text: "Tint point [pointmenu] by [color] and transparency[T](0-255)",
        arguments: {
          pointmenu: {
            type: Scratch.ArgumentType.STRING,
            menu: "pointmenu",
          },
          color: {
            type: Scratch.ArgumentType.COLOR,
            defaultValue: "#ffffff",
          },
          T: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: "0",
          },
        },
      },
      {
        opcode: "setTriPointZ",
        blockType: Scratch.BlockType.COMMAND,
        text: "Set point [pointmenu]'s depth to [Z]",
        arguments: {
          pointmenu: {
            type: Scratch.ArgumentType.STRING,
            menu: "pointmenu",
          },
          Z: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: "1",
          },
        },
      },
    ],
  };

  const LineBlocks = {
    icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE4AAABOCAYAAACOqiAdAAAAAXNSR0IArs4c6QAAAclJREFUeF7t3EFuxCAMBdDmCL1Sz9XlnGuu1CO0IjNIFIUEiAF/+7OIhORI6MU2ysbbB9eVwG8WsIX9/uAqCuRoMXAjXDlrdrTP5+NfxM/X974n3DHcIVoIJVxjpsVwwjVmGuE6My0t09Di2ONekMWelmdavBcI14HGW7UTzTtcc3mm7dFrqd5C85pxt9E8womgeYMTQ/MEJ4rmBU4czQPcEDTrcMPQLMMNRbMKNxzNItwUNGtw09AswU1FswI3Hc0C3BI0dLhlaMhwS9FQ4ZajIcKpQEODU4OGBKcKDQVOHRoCnEo07XBq0TTDqUbTCqceTSMcBJo2OBg0TXBQaFrg4NA0wEGirYaDRVsJB422Cg4ebQWcCbTZcGbQZsKZQpsFZw5tBpxJtNFwZtFGwplGGwVnHm0EnAs0aTg3aJJwrtCk4NyhScC5RLsL5xbtDpxrtF4492g9cEQLao0jgoj2RmuBI1qCVgtHtAytBo5oB2hXcEQroJ3BEe0ErQRHtAu0IziiVaDlcESrREvhiNaAFuGI1ohWBReHaTb+nnUcBeuVMAatmHFEK3/MIhzRzisgDt7bs67jlwyrvgRPm04szPG8TjOs4v0Dp6EsWljkur0AAAAASUVORK5CYII=",
    blocks: [
      {
        opcode: "drawLine",
        blockType: Scratch.BlockType.COMMAND,
        text: "Draw a line from:[x1][y1] to:[x2][y2]",
        arguments: {
          x1: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: 0,
          },
          y1: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: 0,
          },
          x2: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: 25,
          },
          y2: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: 25,
          },
        },
      },
      {
        opcode: "setLineWidth",
        blockIconURI: LineStyleIcon,
        blockType: Scratch.BlockType.COMMAND,
        text: "Set line the:[point] point's width to:[Width]",
        arguments: {
          Width: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: 10,
          },
          point: {
            type: Scratch.ArgumentType.STRING,
            defaultValue: "All",
            menu: "linePointsmenu",
          },
        },
      },
      {
        opcode: "setLineColor",
        blockIconURI: LineStyleIcon,
        blockType: Scratch.BlockType.COMMAND,
        text: "Set line color to:[color] and transparency to:[Alpha]",
        arguments: {
          color: {
            type: Scratch.ArgumentType.COLOR,
            defaultValue: "#ffffff",
          },
          Alpha: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: "255",
          },
        },
      },
    ],
  };

  const DepracatedBlocks = {
    icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE4AAABOCAYAAACOqiAdAAAAAXNSR0IArs4c6QAAAphJREFUeF7t20lywyAQBdB4lQvlFjlvbpELZZUUqqKMCFM3PXzA3liyLQTPH4Fk+fH2fPwmy2Hxka2fulp0iTj5mxHpdLyqS4C53nz//Lgl6ufr+3S8pksVLqgdjFdES02acIfiVdFIcIfhNdFyuLA+vMHGoy3JIB01SRtuNjchtz2fbpAL2ACQ1ebSPI1V0KKA7LbWJrjsAhcCnGpj68xgqmBwwOm29U6ppncACCjSph7cblMVETTKFRCxHTomULQNI4mLbRXdsTGgeN0pcKt2W3E0SldNA6JSEaUEqtWVmriVuq0aGjdxK+Cpos3CoR7z1NEk4NDwTNCk4FDwzNAk4bzxTNGk4bzwzNE04KzxXNC04Kzw3NA04bTxXNG04bTw3NEs4KTxINCs4KTwYNAs4WbxoNCs4bh4cGgecFS860pMfgtavDwTnr3uqOJej0vrzlkeThEimlfiInQXr/WNeCUt1skrcVN43mjeiWPhIaChwA0NGJ4DQemQ4d1VSalDSRtK4kiDBAqed+JIaDGeCHiecCw0FDwvuC5aTNVrAvwcmobR4iaIeNaJo6Dd/meGhmcJx0Ebnq5YDxhWcDNokHgWcBJocHjacJJoUHiacBpoMHhacJpoEHgacBZo7njScJZorniScB5obnhScJ5oLngScAho5nizcEhopngzcIhoZnhcOGQ0EzwO3Apo6nhUuJXQVPEocCuiqeGNwq2MpoI3ArcDmjheD24nNFG8FtyOaGJ4Nbid0UTwSnAnoE3j5XAnoU3hpXAnorHxoH8tL93Qp/gaKTgBjrSBYsURih626MJZ31oAoNfEix5NuAPRuse8LtzBaE28FC588Ipn4dE7JQPoWapVqLr8m44k1Tgd7Za83OUPGEk0ZW66HHQAAAAASUVORK5CYII=",
    blocks: [
      {
        opcode: "settargetsw",
        blockType: Scratch.BlockType.COMMAND,
        text: "Change the target screen size to width[width] and height[height]",
        arguments: {
          width: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: "480",
          },
          height: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: "360",
          },
        },
      },
      {
        opcode: "gettargetstagewidth",
        blockType: Scratch.BlockType.REPORTER,
        text: "Target Stage Width",
        disableMonitor: true,
      },
      {
        opcode: "gettargetstageheight",
        blockType: Scratch.BlockType.REPORTER,
        text: "Target Stage Height",
        disableMonitor: true,
      },
      {
        opcode: "converttocanvascoords",
        blockType: Scratch.BlockType.REPORTER,
        text: "Convert [scrcoord] to [coordTypes] units on the axis [coordmenu]",
        arguments: {
          coordmenu: {
            type: Scratch.ArgumentType.STRING,
            menu: "coordMenu",
          },
          scrcoord: {
            type: Scratch.ArgumentType.NUMBER,
            defaultValue: "0",
          },
          coordTypes: {
            type: Scratch.ArgumentType.STRING,
            menu: "coordTypes",
          },
        },
      },
    ],
  };

  //Stamps

  class PenPlus {
    getInfo() {
      return {
        id: "betterpen",
        name: "Pen+",
        color1: "#0e9a6b",
        color2: "#0b7f58",
        color3: "#096647",
        docsURI:
          "https://www.youtube.com/playlist?list=PLdR2VVCBIN3CceUdgKWOUxFEEbLqWgCC9",
        menuIconURI:
          "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIzNy44NjkyMSIgaGVpZ2h0PSI0OC44NTI3MiIgdmlld0JveD0iMCwwLDM3Ljg2OTIxLDQ4Ljg1MjcyIj48ZGVmcz48cmFkaWFsR3JhZGllbnQgY3g9IjIzNy41NDM0IiBjeT0iMTg0LjAwNTYiIHI9IjkuOTg1NDkiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBpZD0iY29sb3ItMSI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZmZmZmZmIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjY2ZkNWU5Ii8+PC9yYWRpYWxHcmFkaWVudD48L2RlZnM+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIyMy4zMDE4MSwtMTYzLjc2MzA5KSI+PGcgZGF0YS1wYXBlci1kYXRhPSJ7JnF1b3Q7aXNQYWludGluZ0xheWVyJnF1b3Q7OnRydWV9IiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxwYXRoIGQ9Ik0yMjUuMTYzNTYsMTkzLjIwMDIxYzAuNTYxNTMsLTEuMTA3NDYgMi4yMzQwNCwtMy4yODU4MyAyLjIzNDA0LC0zLjI4NTgzYzAsMCAwLjU5NDQyLDEuODIzOTEgMS4yMjQ0OSwyLjU5NTc1YzAuNjMyMTIsMC43NzQzNSAyLjA4ODc4LDEuNDc0ODQgMi4wODg3OCwxLjQ3NDg0YzAsMCAtMi4xOTQ0NiwxLjI4MTQxIC0zLjMyNDIxLDEuNzI2OTVjLTEuMTEwMzIsMC40Mzc4NyAtMy4zOTcsMC45MjM2NyAtMy4zOTcsMC45MjM2N2MwLDAgMC41OTk3NCwtMi4zMDI5OSAxLjE3MzksLTMuNDM1Mzh6IiBmaWxsPSIjNGM5N2ZmIiBzdHJva2U9IiM1NzVlNzUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiLz48cGF0aCBkPSJNMjI3LjYxMTMxLDE4OS4yOTIwM2wxNC45NTE1NCwtMTUuMjcxOTNjMCwwIDIuMjA2LDAuODk1MDUgMi45NTc3NiwxLjYzMDQ3YzAuODY4OCwwLjg0OTkxIDEuOTU0ODksMy4xNzUzOCAxLjk1NDg5LDMuMTc1MzhsLTE2LjEyNjMxLDE1LjE2NTE0YzAsMCAtMi4wMDYzOSwtMS4xMjc4NiAtMi42MDkyMSwtMS44ODU2OGMtMC42NDA4MiwtMC44MDU2IC0xLjEyODY4LC0yLjgxMzM3IC0xLjEyODY4LC0yLjgxMzM3eiIgZmlsbD0idXJsKCNjb2xvci0xKSIgc3Ryb2tlPSIjNTc1ZTc1IiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0Ii8+PHBhdGggZD0iTTIzNy43NTY5OSwxNzIuOTUyMTNjMCwwIDAuOTg2MTksMS4wNTA2MiAyLjM5NjA4LC0wLjI3MDcyYzEuODAzLC0xLjY4OTc3IDQuMjMxMDUsLTUuOTAxNDcgNS40NDc0MywtNi41ODcwN2MxLjM3NDgsLTAuNzc0ODkgMy45MDQxNCwwLjIzNjM5IDMuOTA0MTQsMC4yMzYzOSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNTc1ZTc1IiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPjxwYXRoIGQ9Ik0yMzYuMDc5ODEsMTcyLjMxMTM1YzAsLTAuNjkwMzYgMC41NTk2NCwtMS4yNSAxLjI1LC0xLjI1YzAuNjkwMzYsMCAxLjI1LDAuNTU5NjQgMS4yNSwxLjI1YzAsMC42OTAzNiAtMC41NTk2NCwxLjI1IC0xLjI1LDEuMjVjLTAuNjkwMzYsMCAtMS4yNSwtMC41NTk2NCAtMS4yNSwtMS4yNXoiIGZpbGw9IiM1NzVlNzUiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIwLjUiIHN0cm9rZS1saW5lY2FwPSJidXR0Ii8+PHBhdGggZD0iTTI1MC45OTk3OSwxNjQuNzI4NzdjMCwwIDEuOTEzOTYsLTEuMDUxOTMgNC4yMDAwOSwxLjMyMzU4YzIuNDI2ODUsMi41MjE3MyAwLjYwNTc2LDQuNDQzNDQgMC42MDU3Niw0LjQ0MzQ0bC04LjMzMDE0LDguMjIzMzVjMCwwIC0wLjc1MDQsLTIuMDcxMTIgLTEuNTYyNDksLTIuNzk0OTRjLTAuODI1MjQsLTAuNzM1NTUgLTMuMzUwMTYsLTEuNTgzNzMgLTMuMzUwMTYsLTEuNTgzNzN6IiBmaWxsPSIjNGM5N2ZmIiBzdHJva2U9IiM1NzVlNzUiIHN0cm9rZS13aWR0aD0iMSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiLz48dGV4dCB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyMzkuODkzMzcsMjAxLjcxMTE4KSBzY2FsZSgwLjg3MjM3LDAuODcyMzcpIiBmb250LXNpemU9IjQwIiB4bWw6c3BhY2U9InByZXNlcnZlIiBmaWxsPSIjZThlYmY0IiBmaWxsLXJ1bGU9Im5vbnplcm8iIHN0cm9rZT0iIzU3NWU3NSIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2UtbGluZWNhcD0iYnV0dCIgc3Ryb2tlLWxpbmVqb2luPSJtaXRlciIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtZGFzaGFycmF5PSIiIHN0cm9rZS1kYXNob2Zmc2V0PSIwIiBmb250LWZhbWlseT0iU2FucyBTZXJpZiIgZm9udC13ZWlnaHQ9Im5vcm1hbCIgdGV4dC1hbmNob3I9InN0YXJ0IiBzdHlsZT0ibWl4LWJsZW5kLW1vZGU6IG5vcm1hbCI+PHRzcGFuIHg9IjAiIGR5PSIwIj4rPC90c3Bhbj48L3RleHQ+PC9nPjwvZz48L3N2Zz48IS0tcm90YXRpb25DZW50ZXI6MTYuNjk4MTkxNTI3MDE2NDYyOjE2LjIzNjkxNDk5OTk5OTk4Mi0tPg==",
        blocks: splitBlockCatagories([
          UtilityBlocks,
          StampBlocks,
          TriangleBlocks,
          LineBlocks,
          DepracatedBlocks,
        ]),
        menus: {
          coordMenu: {
            acceptReporters: true,
            items: ["x", "y"],
          },
          coordTypes: {
            acceptReporters: true,
            items: ["Canvas", "Scratch"],
          },
          pointmenu: {
            acceptReporters: true,
            items: ["1", "2", "3"],
          },
          TFmenu: {
            acceptReporters: true,
            items: ["true", "false"],
          },
          AnchorPointMenu: {
            acceptReporters: true,
            items: [
              {
                text: "Top Left",
                value: [0, 0],
              },
              {
                text: "Top",
                value: [-0.5, 0],
              },
              {
                text: "Top Right",
                value: [-1, 0],
              },
              {
                text: "Middle Left",
                value: [0, -0.5],
              },
              {
                text: "Middle",
                value: [-0.5, -0.5],
              },
              {
                text: "Middle Right",
                value: [-1, -0.5],
              },
              {
                text: "Bottom Left",
                value: [0, -1],
              },
              {
                text: "Bottom",
                value: [-0.5, -1],
              },
              {
                text: "Bottom Right",
                value: [-1, -1],
              },
            ],
          },
          linePointsmenu: {
            acceptReporters: true,
            items: ["All", "Starting", "Ending"],
          },
        },
      };
    }

    rgbtoSColor({ R, G, B }) {
      R = Math.min(Math.max(R, 0), 255);
      G = Math.min(Math.max(G, 0), 255);
      B = Math.min(Math.max(B, 0), 255);
      return (Math.floor(R) * 256 + Math.floor(G)) * 256 + Math.floor(B);
    }

    hsvtoSColor({ H, S, V }) {
      // Formula taken from https://www.rapidtables.com/convert/color/hsv-to-rgb.html and converted into javascipt by OAC
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
      return this.rgbtoSColor({ R: Primes[0], G: Primes[1], B: Primes[2] });
    }

    getstampwidth({}) {
      return stampWidth;
    }

    getstampheight({}) {
      return stampHeight;
    }

    converttocanvascoords({ coordmenu, scrcoord, coordTypes }) {
      if (coordTypes == "Canvas") {
        if (coordmenu == "x") {
          return scrcoord + runtime.stageWidth / 2;
        } else {
          return scrcoord * -1 + runtime.stageHeight / 2;
        }
      } else {
        if (coordmenu == "x") {
          return scrcoord - runtime.stageWidth / 2;
        } else {
          return scrcoord * -1 - runtime.stageHeight / 2;
        }
      }
    }

    offsetStamp({ Anchor }) {
      stampOffset = Anchor.split(",");
    }

    setCoordSpace({ space }) {
      coordinateSpace = space;
    }

    SolidColorRet() {
      return blankImage;
    }

    getstamprotation({}) {
      return stampRotation;
    }

    rotateStamp({ ANGLE }) {
      stampRotation = ANGLE;
    }

    pendrawspritefromurl({ url, x, y }) {
      var scaleMultiplier = canvas.width / runtime.stageWidth;
      if (!textures.hasOwnProperty(url)) {
        textures[url] = loadImageAndCreateTextureInfo(url, true);
      }
      drawImage(
        textures[url].texture,
        stampWidth * scaleMultiplier,
        stampHeight * scaleMultiplier,
        x * scaleMultiplier,
        y * scaleMultiplier,
        stampRotation - 90
      );
    }

    setLineWidth({ Width, point }) {
      if (point === "All") {
        lineWidth = [Width, Width];
      } else if (point === "Starting") {
        lineWidth[0] = Width;
      } else {
        lineWidth[1] = Width;
      }
    }

    drawLine({ x1, y1, x2, y2 }) {
      var scalemultiplyer = canvas.width / runtime.stageWidth;
      let tempColors = triangleColors;
      triangleColors = [
        lineColor.r,
        lineColor.g,
        lineColor.b,
        lineColor.a,
        lineColor.r,
        lineColor.g,
        lineColor.b,
        lineColor.a,
        lineColor.r,
        lineColor.g,
        lineColor.b,
        lineColor.a,
      ];
      let vectorLength = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
      let vectorDir = {
        X: (x2 - x1) / vectorLength,
        Y: (y2 - y1) / vectorLength,
      };
      let triangleDir = {
        X1: -vectorDir.Y * lineWidth[0],
        Y1: vectorDir.X * lineWidth[0],
        X2: -vectorDir.Y * lineWidth[1],
        Y2: vectorDir.X * lineWidth[1],
      };

      if (!textures.hasOwnProperty(blankImage)) {
        textures[blankImage] = loadImageAndCreateTextureInfo(blankImage, true);
      }
      drawTexturedTri(
        textures[blankImage].texture,
        [
          (x1 + triangleDir.X1) * scalemultiplyer,
          (y1 + triangleDir.Y1) * scalemultiplyer,
          (x1 - triangleDir.X1) * scalemultiplyer,
          (y1 - triangleDir.Y1) * scalemultiplyer,
          (x2 + triangleDir.X2) * scalemultiplyer,
          (y2 + triangleDir.Y2) * scalemultiplyer,
        ],
        [0.5, 0.5, 0.5, 0.6, 0.6, 0.6]
      );

      drawTexturedTri(
        textures[blankImage].texture,
        [
          (x1 - triangleDir.X1) * scalemultiplyer,
          (y1 - triangleDir.Y1) * scalemultiplyer,
          (x2 - triangleDir.X2) * scalemultiplyer,
          (y2 - triangleDir.Y2) * scalemultiplyer,
          (x2 + triangleDir.X2) * scalemultiplyer,
          (y2 + triangleDir.Y2) * scalemultiplyer,
        ],
        [0.5, 0.5, 0.5, 0.6, 0.6, 0.6]
      );
      triangleColors = tempColors;
    }

    gettargetstagewidth({}) {
      return screenWidth;
    }

    gettargetstageheight({}) {
      return screenHeight;
    }

    pendrawtexturedtrifromurl({ url, trianglepoints, triangleuvs }) {
      var scalemultiplyer = canvas.width / runtime.stageWidth;
      if (!textures.hasOwnProperty(url)) {
        textures[url] = loadImageAndCreateTextureInfo(url, true);
      }
      var pointsarray = trianglepoints.split(",");
      var pointslen = pointsarray.length;
      for (var i = 0; i < pointslen; i++) {
        pointsarray[i] = pointsarray[i] * scalemultiplyer;
      }
      var uvarray = triangleuvs.split(",");
      drawTexturedTri(textures[url].texture, pointsarray, uvarray);
    }

    precachetextures({ uri, clamp }) {
      coolcash(uri, clamp === "true");
    }

    setpenstrechandsquash({ width, height }) {
      stampWidth = width;
      stampHeight = height;
    }

    settargetsw({ width, height }) {
      screenWidth = width;
      screenHeight = height;
    }

    getcostumedata({ costu }, util) {
      let fileData = getspritecostume(util, costu);
      return fileData;
    }

    coordBlock({ c1, c2, c3, c4, c5, c6 }) {
      return c1 + "," + c2 + "," + c3 + "," + c4 + "," + c5 + "," + c6;
    }

    settripointcolour({ pointmenu, color, T }) {
      if (pointmenu == "1") {
        triangleColors[0] = hexToRgb(color).r / 255;
        triangleColors[1] = hexToRgb(color).g / 255;
        triangleColors[2] = hexToRgb(color).b / 255;
        triangleColors[3] = T / 255;
      } else if (pointmenu == "2") {
        triangleColors[4] = hexToRgb(color).r / 255;
        triangleColors[5] = hexToRgb(color).g / 255;
        triangleColors[6] = hexToRgb(color).b / 255;
        triangleColors[7] = T / 255;
      } else {
        triangleColors[8] = hexToRgb(color).r / 255;
        triangleColors[9] = hexToRgb(color).g / 255;
        triangleColors[10] = hexToRgb(color).b / 255;
        triangleColors[11] = T / 255;
      }
    }

    setLineColor({ color, Alpha }) {
      lineColor.r = hexToRgb(color).r / 255;
      lineColor.g = hexToRgb(color).g / 255;
      lineColor.b = hexToRgb(color).b / 255;
      lineColor.a = Alpha / 255;
    }

    setTriPointZ({ pointmenu, Z }) {
      if (pointmenu == "1") {
        TriangleZPositionArray[0] = Z;
      } else if (pointmenu == "2") {
        TriangleZPositionArray[1] = Z;
      } else {
        TriangleZPositionArray[2] = Z;
      }
    }

    setstampcolor({ color, T }) {
      let convertr = hexToRgb(color).r / 255;
      let convertg = hexToRgb(color).g / 255;
      let convertb = hexToRgb(color).b / 255;
      let converta = T / 255;
      quadColors[0] = convertr;
      quadColors[1] = convertg;
      quadColors[2] = convertb;
      quadColors[3] = converta;
      quadColors[4] = convertr;
      quadColors[5] = convertg;
      quadColors[6] = convertb;
      quadColors[7] = converta;
      quadColors[8] = convertr;
      quadColors[9] = convertg;
      quadColors[10] = convertb;
      quadColors[11] = converta;
      quadColors[12] = convertr;
      quadColors[13] = convertg;
      quadColors[14] = convertb;
      quadColors[15] = converta;
      quadColors[16] = convertr;
      quadColors[17] = convertg;
      quadColors[18] = convertb;
      quadColors[19] = converta;
      quadColors[20] = convertr;
      quadColors[21] = convertg;
      quadColors[22] = convertb;
      quadColors[23] = converta;
    }
  }

  Scratch.extensions.register(new PenPlus());
})(Scratch);
