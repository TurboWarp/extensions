/**
 * @fileoverview
 * Defines extra APIs that exist in real web browsers but that are missing from TypeScript's default types.
 */

interface Element {
  /**
  * requestFullscreen() but available in Safari.
  */
  webkitRequestFullscreen?(): unknown;
}

interface Document {
  /**
  * exitFullscreen() but available in Safari.
  */
  webkitExitFullscreen?(): unknown;
  /**
   * fullscreenElement but available in Safari.
   */
  webkitFullscreenElement?: Element;
}
