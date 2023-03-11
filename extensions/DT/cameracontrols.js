(Scratch => {
  'use strict';

  if (!Scratch.extensions.unsandboxed) {
    throw new Error('Camera extension must be run unsandboxed');
  }
  
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
      return (a[0] * b[0]) + (a[1] * b[1]) + (a[2] * b[2]);
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

      dst[0] = 2 * near / dx;
      dst[1] = 0;
      dst[2] = 0;
      dst[3] = 0;
      dst[4] = 0;
      dst[5] = 2 * near / dy;
      dst[6] = 0;
      dst[7] = 0;
      dst[8] = (left + right) / dx;
      dst[9] = (top + bottom) / dy;
      dst[10] = -(far + near) / dz;
      dst[11] = -1;
      dst[12] = 0;
      dst[13] = 0;
      dst[14] = -2 * near * far / dz;
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

      var t0 = (tmp_0 * m11 + tmp_3 * m21 + tmp_4 * m31) -
        (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
      var t1 = (tmp_1 * m01 + tmp_6 * m21 + tmp_9 * m31) -
        (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
      var t2 = (tmp_2 * m01 + tmp_7 * m11 + tmp_10 * m31) -
        (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
      var t3 = (tmp_5 * m01 + tmp_8 * m11 + tmp_11 * m21) -
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

      var t0 = (tmp_0 * m11 + tmp_3 * m21 + tmp_4 * m31) -
        (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
      var t1 = (tmp_1 * m01 + tmp_6 * m21 + tmp_9 * m31) -
        (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
      var t2 = (tmp_2 * m01 + tmp_7 * m11 + tmp_10 * m31) -
        (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
      var t3 = (tmp_5 * m01 + tmp_8 * m11 + tmp_11 * m21) -
        (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);

      var d = 1.0 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);

      dst[0] = d * t0;
      dst[1] = d * t1;
      dst[2] = d * t2;
      dst[3] = d * t3;
      dst[4] = d * ((tmp_1 * m10 + tmp_2 * m20 + tmp_5 * m30) -
        (tmp_0 * m10 + tmp_3 * m20 + tmp_4 * m30));
      dst[5] = d * ((tmp_0 * m00 + tmp_7 * m20 + tmp_8 * m30) -
        (tmp_1 * m00 + tmp_6 * m20 + tmp_9 * m30));
      dst[6] = d * ((tmp_3 * m00 + tmp_6 * m10 + tmp_11 * m30) -
        (tmp_2 * m00 + tmp_7 * m10 + tmp_10 * m30));
      dst[7] = d * ((tmp_4 * m00 + tmp_9 * m10 + tmp_10 * m20) -
        (tmp_5 * m00 + tmp_8 * m10 + tmp_11 * m20));
      dst[8] = d * ((tmp_12 * m13 + tmp_15 * m23 + tmp_16 * m33) -
        (tmp_13 * m13 + tmp_14 * m23 + tmp_17 * m33));
      dst[9] = d * ((tmp_13 * m03 + tmp_18 * m23 + tmp_21 * m33) -
        (tmp_12 * m03 + tmp_19 * m23 + tmp_20 * m33));
      dst[10] = d * ((tmp_14 * m03 + tmp_19 * m13 + tmp_22 * m33) -
        (tmp_15 * m03 + tmp_18 * m13 + tmp_23 * m33));
      dst[11] = d * ((tmp_17 * m03 + tmp_20 * m13 + tmp_23 * m23) -
        (tmp_16 * m03 + tmp_21 * m13 + tmp_22 * m23));
      dst[12] = d * ((tmp_14 * m22 + tmp_17 * m32 + tmp_13 * m12) -
        (tmp_16 * m32 + tmp_12 * m12 + tmp_15 * m22));
      dst[13] = d * ((tmp_20 * m32 + tmp_12 * m02 + tmp_19 * m22) -
        (tmp_18 * m22 + tmp_21 * m32 + tmp_13 * m02));
      dst[14] = d * ((tmp_18 * m12 + tmp_23 * m32 + tmp_15 * m02) -
        (tmp_22 * m32 + tmp_14 * m02 + tmp_19 * m12));
      dst[15] = d * ((tmp_22 * m22 + tmp_16 * m02 + tmp_21 * m12) -
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
      var d = v0 * m[0 * 4 + 3] + v1 * m[1 * 4 + 3] + v2 * m[2 * 4 + 3] + m[3 * 4 + 3];

      dst[0] = (v0 * m[0 * 4 + 0] + v1 * m[1 * 4 + 0] + v2 * m[2 * 4 + 0] + m[3 * 4 + 0]) / d;
      dst[1] = (v0 * m[0 * 4 + 1] + v1 * m[1 * 4 + 1] + v2 * m[2 * 4 + 1] + m[3 * 4 + 1]) / d;
      dst[2] = (v0 * m[0 * 4 + 2] + v1 * m[1 * 4 + 2] + v2 * m[2 * 4 + 2] + m[3 * 4 + 2]) / d;

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
  }());
  const icon = 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIyMjUuMzU0OCIgaGVpZ2h0PSIyMjUuMzU0OCIgdmlld0JveD0iMCwwLDIyNS4zNTQ4LDIyNS4zNTQ4Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTg3LjMyMjkzLC0zNy4zMjI1OSkiPjxnIGRhdGEtcGFwZXItZGF0YT0ieyZxdW90O2lzUGFpbnRpbmdMYXllciZxdW90Ozp0cnVlfSIgZmlsbC1ydWxlPSJub256ZXJvIiBzdHJva2U9Im5vbmUiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMTg3LjMyMjk0LDE1MGMwLC02Mi4yMzAwMSA1MC40NDczOSwtMTEyLjY3NzQgMTEyLjY3NzQsLTExMi42Nzc0YzYyLjIzMDAxLDAgMTEyLjY3NzQsNTAuNDQ3MzkgMTEyLjY3NzQsMTEyLjY3NzRjMCw2Mi4yMzAwMSAtNTAuNDQ3MzksMTEyLjY3NzQgLTExMi42Nzc0LDExMi42Nzc0Yy02Mi4yMzAwMSwwIC0xMTIuNjc3NCwtNTAuNDQ3MzkgLTExMi42Nzc0LC0xMTIuNjc3NHoiIGZpbGw9IiNmZjRkYTciIHN0cm9rZS13aWR0aD0iMCIvPjxnPjxwYXRoIGQ9Ik0zMTcuMTAyOSw4MC44MTA4N2MyMS44OTI0LDAgMzkuNjYyMDcsMTcuNzM3MjMgMzkuNjYyMDcsMzkuNjM0NGMwLDEyLjMwNTE3IC01LjYxMTQ4LDIzLjI5NjIyIC0xNC40MDA4OCwzMC41NjgyNGg4Ljc3MDMydjY4LjE3NTYzaC0xMTQuMTMzMjV2LTU1Ljc5ODg5Yy0xNC4zMzQwOCwtMy41MjgxNyAtMjQuOTYxNTMsLTE2LjQ1NzQ3IC0yNC45NjE1MywtMzEuODgwNDRjMCwtMTguMTM5IDE0LjY5NjczLC0zMi44MzQ3OCAzMi44MzQ3OCwtMzIuODM0NzhjMTIuMDM3OTUsMCAyMi41NTY2MSw2LjQ3ODAxIDI4LjI3MjExLDE2LjEzMzk1bDQuODYxMzcsLTAuOTI0NzVjMy4xMjkyNiwtMTguNzY2OTYgMTkuNDM5NzYsLTMzLjA3MzM2IDM5LjA5OTAyLC0zMy4wNzMzNnpNMjc2LjIxODUxLDE0MS4yOTE3MWMtMS4xMDAzNSwzLjUzMzg5IC0yLjc2OTQ3LDYuODEyMDMgLTQuOTIwNTQsOS43MjE3OWgyMC41NDc3NGMtMy42ODc1NCwtMy4wNDgxNCAtNi44MDI0OCwtNi43NjUyNyAtOS4xODU0NSwtMTAuOTQ0Mjl6IiBmaWxsPSIjZmZmZmZmIiBzdHJva2Utd2lkdGg9IjEiLz48cGF0aCBkPSJNMzM2LjU3NTI5LDExOS41MjgxNWMwLDExLjA2ODM1IC04Ljk3MjY0LDIwLjA0MDk5IC0yMC4wNDA5OSwyMC4wNDA5OWMtMTEuMDY4MzUsMCAtMjAuMDQwOTksLTguOTcyNjQgLTIwLjA0MDk5LC0yMC4wNDA5OWMwLC0xMS4wNjgzNSA4Ljk3MjY0LC0yMC4wNDA5OSAyMC4wNDA5OSwtMjAuMDQwOTljMTEuMDY4MzUsMCAyMC4wNDA5OSw4Ljk3MjY0IDIwLjA0MDk5LDIwLjA0MDk5eiIgZmlsbD0iI2ZmNGRhNyIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48cGF0aCBkPSJNMjYxLjE4MywxMzAuMDI1ODFjMCw4Ljk2MDA0IC03LjI2MzYyLDE2LjIyMzY2IC0xNi4yMjM2NiwxNi4yMjM2NmMtOC45NjAwNCwwIC0xNi4yMjM2NiwtNy4yNjM2MiAtMTYuMjIzNjYsLTE2LjIyMzY2YzAsLTguOTYwMDQgNy4yNjM2MiwtMTYuMjIzNjYgMTYuMjIzNjYsLTE2LjIyMzY2YzguOTYwMDQsMCAxNi4yMjM2Niw3LjI2MzYyIDE2LjIyMzY2LDE2LjIyMzY2eiIgZmlsbD0iI2ZmNGRhNyIgc3Ryb2tlLXdpZHRoPSIwLjUiLz48cGF0aCBkPSJNMzg3Ljk2MDM5LDE0NS44NTcyNHY2MC41MTA0M2wtMjEuNjAzMjYsLTEzLjQ3MjE3aC0xNi44OTgzNHYtMzMuNTY2MDdoMTYuODk4MzRsMjEuNTk5MTcsLTEzLjQ3MTEyeiIgZmlsbD0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9nPjwvZz48L2c+PC9zdmc+PCEtLXJvdGF0aW9uQ2VudGVyOjExMi42NzcwNjU6MTEyLjY3NzQwNS0tPg==';
  const turnLeftIcon = 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIyMS4yNjk4MiIgaGVpZ2h0PSIyMC4wMzE0NSIgdmlld0JveD0iMCwwLDIxLjI2OTgyLDIwLjAzMTQ1Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjg5LjA3NDM0LC0xNDAuMzk5OTkpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMzA4LjM0LDE1Ni4yMWMtMS44ODg0MSwyLjU5OTU1IC00Ljg4NzQ2LDQuMTYyMDMgLTguMSw0LjIyYy0xLjI0ODE2LDAuMDQ0MTggLTIuMjk1ODIsLTAuOTMxODQgLTIuMzQsLTIuMThjLTAuMDQ0MTgsLTEuMjQ4MTYgMC45MzE4NCwtMi4yOTU4MiAyLjE4LC0yLjM0djBjMS43MzM0NywtMC4xMzUxMiAzLjMwNDg4LC0xLjA3MDU4IDQuMjUsLTIuNTNjMC45MTkxMSwtMS4zNjExIDEuMTIwNDQsLTMuMDgzNjIgMC41NCwtNC42MmMtMC4yNzc5LC0wLjY5MjM1IC0wLjczMzE1LC0xLjI5OTM2IC0xLjMyLC0xLjc2Yy0wLjU4ODIxLC0wLjQzMTY1IC0xLjI3NjM3LC0wLjcwNjkxIC0yLC0wLjhjLTEuMTEwOTUsLTAuMTA2MDQgLTIuMjI0MjgsMC4xNzY3MSAtMy4xNSwwLjhsMS4xMiwxLjQxYzAuMzc3ODMsMC40NjU3IDAuNDYxNDksMS4xMDQzNyAwLjIxNjM3LDEuNjUxNjdjLTAuMjQ1MTMsMC41NDczMSAtMC43NzczNCwwLjkxMDE0IC0xLjM3NjM3LDAuOTM4MzNoLTcuNjljLTAuNDk2MywwLjAwMjM5IC0wLjk2NDEzLC0wLjIzMTUyIC0xLjI2LC0wLjYzYy0wLjMwNzIzLC0wLjM4NTUzIC0wLjQxMTMyLC0wLjg5NDg0IC0wLjI4LC0xLjM3bDEuNzIsLTcuNDNjMC4xODg4OSwtMC42ODk2NyAwLjgxNDkzLC0xLjE2ODQxIDEuNTMsLTEuMTdjMC40ODM2OSwtMC4wMDE2OSAwLjk0MTE2LDAuMjE5NjcgMS4yNCwwLjZsMS4wOCwxLjM1YzIuMjYzMTYsLTEuNTI4MTUgNS4wMjY0NywtMi4xMjk0OSA3LjcyLC0xLjY4YzEuNjg2NDIsMC4zMDQwOCAzLjI2NDc1LDEuMDQxNTUgNC41OCwyLjE0YzEuMzAwNDMsMS4xMTkwMiAyLjI3NzU4LDIuNTY1NzYgMi44Myw0LjE5YzEuMDM5NDgsMy4xMjg5MyAwLjQ4MzAzLDYuNTY4NDQgLTEuNDksOS4yMXoiIGZpbGw9IiNjYzNkODUiLz48cGF0aCBkPSJNMzA3LjU2LDE1NS42NWMtMS43MTMyLDIuMzU5MzYgLTQuNDM0NzEsMy43Nzc1MSAtNy4zNSwzLjgzYy0wLjcyMzQ5LDAuMDIyMDkgLTEuMzI3OTEsLTAuNTQ2NTEgLTEuMzUsLTEuMjdjLTAuMDIyMDksLTAuNzIzNDkgMC41NDY1MSwtMS4zMjc5MSAxLjI3LC0xLjM1YzIuMDMwNjksLTAuMTQwODIgMy44Nzk1NSwtMS4yMjA1NiA1LC0yLjkyYzEuMTAyMzksLTEuNjE5ODEgMS4zNTIwOCwtMy42NzMyIDAuNjcsLTUuNTFjLTAuMzUwODgsLTAuODQ5NTkgLTAuOTE1OTEsLTEuNTkzNzcgLTEuNjQsLTIuMTZjLTAuNzI1NTksLTAuNTQzNDEgLTEuNTgwNDEsLTAuODg4MSAtMi40OCwtMWMtMS43MTUwNywtMC4xOTEzIC0zLjQyNzI3LDAuMzgzMDkgLTQuNjgsMS41N2wxLjc0LDIuMTZjMC4xNjUzLDAuMTcxMDMgMC4yMTE3NCwwLjQyNDU5IDAuMTE3NzgsMC42NDMwOWMtMC4wOTM5NiwwLjIxODUxIC0wLjMwOTk0LDAuMzU5MjMgLTAuNTQ3NzgsMC4zNTY5MWgtNy42MWMtMC4xODg5LDAuMDA2MDMgLTAuMzY5NTksLTAuMDc3MyAtMC40ODc2NSwtMC4yMjQ4OGMtMC4xMTgwNiwtMC4xNDc1OCAtMC4xNTk2OSwtMC4zNDIxNiAtMC4xMTIzNSwtMC41MjUxMmwxLjcxLC03LjQyYzAuMDY1NjUsLTAuMjAwMjcgMC4yMzMxNCwtMC4zNTAzMSAwLjQzOTM5LC0wLjM5MzYyYzAuMjA2MjUsLTAuMDQzMzEgMC40MTk5NSwwLjAyNjY4IDAuNTYwNjEsMC4xODM2MmwxLjY3LDIuMWMyLjE2NDI3LC0xLjc3NDcgNC45ODkwNywtMi41MjkyIDcuNzUsLTIuMDdjMS41MTcyMSwwLjI2OTk1IDIuOTM3NSwwLjkzMTgzIDQuMTIsMS45MmMxLjE1OTI3LDAuOTk0ODggMi4wMzU0NCwyLjI3ODA5IDIuNTQsMy43MmMwLjk1MTYxLDIuODM2MzkgMC40NTQ4NCw1Ljk1ODk1IC0xLjMzLDguMzZ6IiBmaWxsPSIjZmZmZmZmIi8+PC9nPjwvZz48L3N2Zz48IS0tcm90YXRpb25DZW50ZXI6MTAuOTI1NjYzOTg1MDY1OjkuNjAwMDA5NjE3NzQ4MDcxLS0+'
  const turnRightIcon = 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIyMS4yNjE4MSIgaGVpZ2h0PSIyMC4wMzE0NSIgdmlld0JveD0iMCwwLDIxLjI2MTgxLDIwLjAzMTQ1Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjg5Ljc0MDMzLC0xNDAuMjI5OTkpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIHN0cm9rZS1saW5lY2FwPSJidXR0IiBzdHJva2UtbGluZWpvaW49Im1pdGVyIiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiIHN0cm9rZS1kYXNoYXJyYXk9IiIgc3Ryb2tlLWRhc2hvZmZzZXQ9IjAiIHN0eWxlPSJtaXgtYmxlbmQtbW9kZTogbm9ybWFsIj48cGF0aCBkPSJNMzEwLjY4LDE1MC4yYy0wLjMwMjEyLDAuMzk2MzIgLTAuNzcxNjYsMC42MjkyNCAtMS4yNywwLjYzaC03LjY5Yy0wLjU5NTI3LC0wLjAzMDkyIC0xLjEyMzI1LC0wLjM5MjE5IC0xLjM2NzY5LC0wLjkzNTg1Yy0wLjI0NDQzLC0wLjU0MzY1IC0wLjE2NDI2LC0xLjE3ODM2IDAuMjA3NjksLTEuNjQ0MTVsMS4xMiwtMS40MWMtMC45MjY4MSwtMC42MTA1MSAtMi4wMzU5LC0wLjg4MjQ4IC0zLjE0LC0wLjc3Yy0wLjcyMzYzLDAuMDkzMDkgLTEuNDExNzksMC4zNjgzNSAtMiwwLjhjLTAuNTkwMDEsMC40NDk4MiAtMS4wNTE5OSwxLjA0NjI2IC0xLjM0LDEuNzNjLTAuNTgwNDQsMS41MzYzOCAtMC4zNzkxMSwzLjI1ODkgMC41NCw0LjYyYzAuOTQ5NCwxLjQ1ODI4IDIuNTI0NzUsMi4zOTAxOCA0LjI2LDIuNTJ2MGMxLjI0ODE2LDAuMDQ0MTggMi4yMjQxOCwxLjA5MTg0IDIuMTgsMi4zNGMtMC4wNDQxOCwxLjI0ODE2IC0xLjA5MTg0LDIuMjI0MTggLTIuMzQsMi4xOGMtMy4yMTkyNSwtMC4wNjg4OSAtNi4yMTkwMSwtMS42NDY1NCAtOC4xLC00LjI2Yy0xLjk2NjcyLC0yLjY0ODA1IC0yLjUyMjUyLC02LjA4NzI1IC0xLjQ5LC05LjIyYzAuNTY0MTMsLTEuNjA0MjEgMS41NDAwOCwtMy4wMzE5MiAyLjgzLC00LjE0YzEuMzE2MjQsLTEuMDk2ODkgMi44OTQxNCwtMS44MzQxNiA0LjU4LC0yLjE0YzIuNjkzNTMsLTAuNDQ5NDkgNS40NTY4NCwwLjE1MTg1IDcuNzIsMS42OGwxLjA4LC0xLjM1YzAuMjk4ODQsLTAuMzgwMzMgMC43NTYzMSwtMC42MDE2OSAxLjI0LC0wLjZjMC43MjkwNiwwLjAwNTM2IDEuMzYyMzEsMC41MDI5IDEuNTQsMS4yMWwxLjcsNy4zN2MwLjEzODcxLDAuNDc4MzUgMC4wNDIyNCwwLjk5NDEzIC0wLjI2LDEuMzl6IiBmaWxsPSIjY2MzZDg1Ii8+PHBhdGggZD0iTTMwOS4zOCwxNDkuODNoLTcuNjFjLTAuMjM3ODQsMC4wMDIzMiAtMC40NTM4MiwtMC4xMzg0IC0wLjU0Nzc4LC0wLjM1NjkxYy0wLjA5Mzk2LC0wLjIxODUxIC0wLjA0NzUyLC0wLjQ3MjA3IDAuMTE3NzgsLTAuNjQzMDlsMS43NSwtMi4xOWMtMS4yNTg1OCwtMS4xOTEzOCAtMi45NzczMiwtMS43NjkxNyAtNC43LC0xLjU4Yy0xLjg0ODAzLDAuMjIyMTEgLTMuNDI1NzYsMS40MzkgLTQuMTEsMy4xN2MtMC42ODY3OSwxLjg1MjU4IC0wLjQxNzUxLDMuOTI0NTIgMC43Miw1LjU0YzEuMTE4MjYsMS43MDE3NSAyLjk2ODM4LDIuNzgyMjIgNSwyLjkyYzAuNzIzNDksMC4wMjIwOSAxLjI5MjA5LDAuNjI2NTEgMS4yNywxLjM1Yy0wLjAyMjA5LDAuNzIzNDkgLTAuNjI2NTEsMS4yOTIwOSAtMS4zNSwxLjI3Yy0yLjkxMzEyLC0wLjA1MTcgLTUuNjMzNjQsLTEuNDY1NjMgLTcuMzUsLTMuODJjLTEuODA4ODYsLTIuMzkyNTMgLTIuMzMxODIsLTUuNTE5MDYgLTEuNCwtOC4zN2MwLjQ5NzE3LC0xLjQ0NTYzIDEuMzc0NTcsLTIuNzMwNjUgMi41NCwtMy43MmMxLjE3NzY1LC0wLjk4OTc4IDIuNTk1MTgsLTEuNjUxOTggNC4xMSwtMS45MmMyLjc2MDkzLC0wLjQ1OTIgNS41ODU3MywwLjI5NTMgNy43NSwyLjA3bDEuNjcsLTIuMWMwLjE0MDY2LC0wLjE1Njk0IDAuMzU0MzYsLTAuMjI2OTMgMC41NjA2MSwtMC4xODM2MmMwLjIwNjI1LDAuMDQzMzEgMC4zNzM3NCwwLjE5MzM1IDAuNDM5MzksMC4zOTM2MmwxLjc2LDcuNDJjMC4wNTM1MywwLjE4NyAwLjAxMTQ1LDAuMzg4MzcgLTAuMTEyNDgsMC41MzgyOGMtMC4xMjM5MywwLjE0OTkyIC0wLjMxMzc5LDAuMjI5MTIgLTAuNTA3NTIsMC4yMTE3MnoiIGZpbGw9IiNmZmZmZmYiLz48L2c+PC9nPjwvc3ZnPjwhLS1yb3RhdGlvbkNlbnRlcjoxMC4yNTk2NzExOTA1MzM3NjY6OS43NzAwMDk2MTc3NDgwODctLT4='
  const vm = Scratch.vm;

  let cameraX = 0;
  let cameraY = 0;
  let cameraRotation = 0;
  let cameraZoom = 100;
  let cameraBG = '#ffffff';

  vm.runtime.runtimeOptions.fencing = false;
  vm.renderer.offscreenTouching = true;
 /**
 *   Source: github.com/TurboWarp/scratch-render/blob/develop/src/RenderWebGL.js
 */
  function setStageSize (xLeft, xRight, yBottom, yTop,Rotation) {
      var orthoProjection = m4.orthographic(xLeft, xRight, yTop, yBottom, -1, 1);
      m4.zRotate(orthoProjection,Rotation * Math.PI / 180.0, orthoProjection);
      m4.scale(orthoProjection, 1, -1, 1, orthoProjection);
      vm.renderer._projection = orthoProjection;
      vm.renderer._setNativeSize(Math.abs(xRight - xLeft), Math.abs(yBottom - yTop));
  }
  function updateCamera() {
    setStageSize(
      vm.runtime.stageWidth / -2 + cameraX,
      vm.runtime.stageWidth / 2 + cameraX,
      vm.runtime.stageHeight / -2 + cameraY,
      vm.runtime.stageHeight / 2 + cameraY,
      cameraRotation
    );
    vm.renderer._projection[15] = 100 / cameraZoom;
  }

  // tell resize to update camera as well
  vm.runtime.on('STAGE_SIZE_CHANGED', _=>updateCamera());

  function doFix() {
    //vm.runtime.emit('STAGE_SIZE_CHANGED', vm.runtime.stageWidth, vm.runtime.stageHeight);
    updateCamera()
  }

  // fix mouse positions
  let oldSX = vm.runtime.ioDevices.mouse.getScratchX;
  let oldSY = vm.runtime.ioDevices.mouse.getScratchY;

  vm.runtime.ioDevices.mouse.getScratchX = function(...a){
    return (oldSX.apply(this, a) + cameraX) / cameraZoom * 100;
  };
  vm.runtime.ioDevices.mouse.getScratchY = function(...a){
    return (oldSY.apply(this, a) + cameraY) / cameraZoom * 100;
  };

  class Camera {

    getInfo() {
      return {

        id: 'DTcameracontrols',
        name: 'Camera',

        color1: '#ff4da7',
        color2: '#b93778',
        color3: '#b93778',

        menuIconURI: icon,

        blocks: [
          {
            opcode: 'setBoth',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set camera to x: [x] y: [y]',
            arguments: {
              x: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              },
              y: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              },
            }
          },
          '---',
          {
            opcode: 'changeZoom',
            blockType: Scratch.BlockType.COMMAND,
            text: 'change camera zoom by [val]',
            arguments: {
              val: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 10
              }
            }
          },
          {
            opcode: 'setZoom',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set camera zoom to [val] %',
            arguments: {
              val: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 100
              }
            }
          },
          '---',
          {
            opcode: 'changeX',
            blockType: Scratch.BlockType.COMMAND,
            text: 'change camera x by [val]',
            arguments: {
              val: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 10
              }
            }
          },
          {
            opcode: 'setX',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set camera x to [val]',
            arguments: {
              val: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              }
            }
          },
          {
            opcode: 'changeY',
            blockType: Scratch.BlockType.COMMAND,
            text: 'change camera y by [val]',
            arguments: {
              val: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 10
              }
            }
          },
          {
            opcode: 'setY',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set camera y to [val]',
            arguments: {
              val: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              }
            }
          },
          {
            opcode: 'setDir',
            blockType: Scratch.BlockType.COMMAND,
            text: 'point camera in direction [val]',
            arguments: {
              val: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 0
              }
            }
          },
          {
            opcode: 'turnDirLeft',
            blockType: Scratch.BlockType.COMMAND,
            text: 'turn camera [IMAGE][val] degrees',
            arguments: {
              IMAGE: {
                type: Scratch.ArgumentType.IMAGE,
                dataURI: turnLeftIcon
              },
              val: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 5
              }
            }
          },
          {
            opcode: 'turnDirRight',
            blockType: Scratch.BlockType.COMMAND,
            text: 'turn camera [IMAGE] [val] degrees',
            arguments: {
              IMAGE: {
                type: Scratch.ArgumentType.IMAGE,
                dataURI: turnRightIcon
              },
              val: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: 5
              }
            }
          },
          "---",
          {
            opcode: 'getX',
            blockType: Scratch.BlockType.REPORTER,
            text: 'camera x',
          },
          {
            opcode: 'getY',
            blockType: Scratch.BlockType.REPORTER,
            text: 'camera y',
          },
          {
            opcode: 'getDir',
            blockType: Scratch.BlockType.REPORTER,
            text: 'camera direction',
          },
          {
            opcode: 'getZoom',
            blockType: Scratch.BlockType.REPORTER,
            text: 'camera zoom',
          },
          '---',
          {
            opcode: 'setCol',
            blockType: Scratch.BlockType.COMMAND,
            text: 'set background color to [val]',
            arguments: {
              val: {
                type: Scratch.ArgumentType.COLOR
              }
            }
          },
          {
            opcode: 'getCol',
            blockType: Scratch.BlockType.REPORTER,
            text: 'background color',
          },
        ]
      };
    }

    setBoth(ARGS) {
      cameraX = +ARGS.x;
      cameraY = +ARGS.y;
      doFix();
    }
    changeZoom(ARGS) {
      cameraZoom += +ARGS.val;
      doFix();
    }
    setZoom(ARGS) {
      cameraZoom = +ARGS.val;
      doFix();
    }
    changeX(ARGS) {
      cameraX += +ARGS.val;
      doFix();
    }
    setX(ARGS) {
      cameraX = +ARGS.val;
      doFix();
    }
    turnDirRight(ARGS){
      cameraRotation += +ARGS.val;
      doFix();
    }
    turnDirLeft(ARGS){
      cameraRotation -= +ARGS.val;
      doFix();
    }
    setDir(ARGS) {
      cameraRotation = +ARGS.val;
      doFix();
    }
    changeY(ARGS) {
      cameraY += +ARGS.val;
      doFix();
    }
    setY(ARGS) {
      cameraY = +ARGS.val;
      doFix();
    }
    getX() {
      return cameraX;
    }
    getY() {
      return cameraY;
    }
    getDir() {
      return cameraRotation;
    }
    getZoom() {
      return cameraZoom;
    }
    setCol(ARGS) {
      cameraBG = ARGS.val;
      Scratch.vm.renderer.setBackgroundColor(
        parseInt(cameraBG.substring(1,3),16) / 255,
        parseInt(cameraBG.substring(3,5),16) / 255,
        parseInt(cameraBG.substring(5,7),16) / 255
      );
    }
    getCol() {
      return cameraBG;
    }

  }

  Scratch.extensions.register(new Camera());
})(Scratch);