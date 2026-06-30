// Name: Colors
// ID: lxColors
// Description: Adds a variety of new blocks that manipulates and utilizes colors.
// By: LincolnX <https://scratch.mit.edu/users/lincolnXgames/>
// License: MPL-2.0

(function (Scratch) {
  "use strict";

  const { abs, round, floor, sqrt } = Math;

  const toDec = (hex) => parseInt(hex, 16);
  const toHex = (dec) => dec.toString(16);
  const limitHex = (hex, mi, ma) =>
    toHex(Math.min(Math.max(toDec(hex), mi), ma));
  const clamp = (n, mi, ma) => Math.min(Math.max(n, mi), ma);
  const fixHex = (hex) => limitHex(hex, 0, 255).padStart(2, "0");
  const toFixHex = (dec) => fixHex(dec.toString(16));
  const lerp = (a, b, t) => a + (b - a) * t;
  function interpolateHexColorsHsv(hex1, hex2, t) {
    const hsv1 = hexToHsv(hex1);
    const hsv2 = hexToHsv(hex2);
    t = clamp(t, 0, 1);
    // Handle hue interpolation for the shortest path around the color wheel
    let h1 = hsv1.h;
    let h2 = hsv2.h;
    let hueDiff = h2 - h1;
    if (hueDiff > 180) {
      h1 += 360;
    } else if (hueDiff < -180) {
      h2 += 360;
    }

    const h = h1 + t * (h2 - h1);
    const s = hsv1.s + t * (hsv2.s - hsv1.s);
    const v = hsv1.v + t * (hsv2.v - hsv1.v);

    return hsvToHex({ h, s, v });
  }

  function hexToRgb(hex) {
    let r = 0,
      g = 0,
      b = 0;
    // Handle 3-digit shorthand
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16);
      g = parseInt(hex[2] + hex[2], 16);
      b = parseInt(hex[3] + hex[3], 16);
    } else if (hex.length === 7) {
      r = parseInt(hex.substring(1, 3), 16);
      g = parseInt(hex.substring(3, 5), 16);
      b = parseInt(hex.substring(5, 7), 16);
    }
    return { r, g, b };
  }
  function rgbToHex(rgb) {
    const makeHex = (c) => Math.round(c).toString(16).padStart(2, "0");
    return `#${makeHex(rgb.r)}${makeHex(rgb.g)}${makeHex(rgb.b)}`;
  }
  function hsvToRgb(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
      ((s = h.s), (v = h.v), (h = h.h));
    }
    h /= 360;
    s /= 100;
    v /= 100;
    i = floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
      case 0:
        ((r = v), (g = t), (b = p));
        break;
      case 1:
        ((r = q), (g = v), (b = p));
        break;
      case 2:
        ((r = p), (g = v), (b = t));
        break;
      case 3:
        ((r = p), (g = q), (b = v));
        break;
      case 4:
        ((r = t), (g = p), (b = v));
        break;
      case 5:
        ((r = v), (g = p), (b = q));
        break;
    }
    return {
      r: round(r * 255),
      g: round(g * 255),
      b: round(b * 255),
    };
  }
  function rgbToHsv(r, g, b) {
    if (arguments.length === 1) {
      ((g = r.g), (b = r.b), (r = r.r));
    }
    var max = Math.max(r, g, b),
      min = Math.min(r, g, b),
      d = max - min,
      h,
      s = max === 0 ? 0 : d / max,
      v = max / 255;
    switch (max) {
      case min:
        h = 0;
        break;
      case r:
        h = g - b + d * (g < b ? 6 : 0);
        h /= 6 * d;
        break;
      case g:
        h = b - r + d * 2;
        h /= 6 * d;
        break;
      case b:
        h = r - g + d * 4;
        h /= 6 * d;
        break;
    }
    return {
      h: h * 360,
      s: s * 100,
      v: v * 100,
    };
  }
  const hexToHsv = (hex) => rgbToHsv(hexToRgb(hex));
  function hsvToHex(h, s, v) {
    if (arguments.length === 1) {
      ((s = h.s), (v = h.v), (h = h.h));
    }
    return rgbToHex(hsvToRgb(h, s, v));
  }

  function hslToRgb(h, s, l) {
    h /= 360;
    s /= 100;
    l /= 100;
    let r, g, b;
    if (s === 0) {
      r = g = b = l; // achromatic
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hueToRgb(p, q, h + 1 / 3);
      g = hueToRgb(p, q, h);
      b = hueToRgb(p, q, h - 1 / 3);
    }
    return { r: round(r * 255), g: round(g * 255), b: round(b * 255) };
  }

  function hueToRgb(p, q, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  }

  function channelToLinear(c) {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  }

  function relativeLuminance(hex) {
    const { r, g, b } = hexToRgb(hex);
    const R = channelToLinear(r);
    const G = channelToLinear(g);
    const B = channelToLinear(b);
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
  }

  function contrastRatio(hex1, hex2) {
    const L1 = relativeLuminance(hex1);
    const L2 = relativeLuminance(hex2);
    const light = Math.max(L1, L2);
    const dark = Math.min(L1, L2);
    return (light + 0.05) / (dark + 0.05);
  }

  function distanceBetweenHexColorsDeltaE2000(hex1, hex2) {
    // convert Hex to RGB
    const rgb1 = hexToRgb(hex1);
    const rgb2 = hexToRgb(hex2);

    // convert RGB to XYZ
    const xyz1 = rgbToXyz(rgb1.r, rgb1.g, rgb1.b);
    const xyz2 = rgbToXyz(rgb2.r, rgb2.g, rgb2.b);

    // convert XYZ to Lab
    const lab1 = xyzToLab(xyz1.x, xyz1.y, xyz1.z);
    const lab2 = xyzToLab(xyz2.x, xyz2.y, xyz2.z);

    // calculate Delta E 2000
    return deltaE2000(lab1, lab2);
  }

  function rgbToXyz(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    r = r > 0.04045 ? ((r + 0.055) / 1.055) ** 2.4 : r / 12.92;
    g = g > 0.04045 ? ((g + 0.055) / 1.055) ** 2.4 : g / 12.92;
    b = b > 0.04045 ? ((b + 0.055) / 1.055) ** 2.4 : b / 12.92;

    r *= 100;
    g *= 100;
    b *= 100;

    // D65 white point reference primaries
    const x = r * 0.4124 + g * 0.3576 + b * 0.1805;
    const y = r * 0.2126 + g * 0.7152 + b * 0.0722;
    const z = r * 0.0193 + g * 0.1192 + b * 0.9505;

    return { x, y, z };
  }

  // converts XYZ values to CIELAB color space.
  function xyzToLab(x, y, z) {
    // D65 white point values
    const refX = 95.047;
    const refY = 100.0;
    const refZ = 108.883;

    x /= refX;
    y /= refY;
    z /= refZ;

    x = x > 0.008856 ? x ** (1 / 3) : 7.787 * x + 16 / 116;
    y = y > 0.008856 ? y ** (1 / 3) : 7.787 * y + 16 / 116;
    z = z > 0.008856 ? z ** (1 / 3) : 7.787 * z + 16 / 116;

    const L = 116 * y - 16;
    const a = 500 * (x - y);
    const b = 200 * (y - z);

    return { L, a, b };
  }

  // calculates the Delta E 2000 difference between two Lab colors.
  // based on the implementation notes from Sharma et al..
  function deltaE2000(lab1, lab2) {
    const kL = 1.0,
      kC = 1.0,
      kH = 1.0; // parametric factors often set to 1.0
    const deg2rad = Math.PI / 180;
    const rad2deg = 180 / Math.PI;

    // extract Lab values
    const L1 = lab1.L,
      a1 = lab1.a,
      b1 = lab1.b;
    const L2 = lab2.L,
      a2 = lab2.a,
      b2 = lab2.b;

    // calculate C*ab values (Chroma)
    const C1 = sqrt(a1 * a1 + b1 * b1);
    const C2 = sqrt(a2 * a2 + b2 * b2);
    const CBar = (C1 + C2) / 2.0;

    // calculate G (chroma correction factor)
    const CBarPow7 = CBar ** 7;
    const G = 0.5 * (1 - sqrt(CBarPow7 / (CBarPow7 + 6103515625.0))); // 6103515625 = 25^7

    // calculate a' and C' (lightness corrected a* and new chroma)
    const a1Prime = a1 * (1 + G);
    const a2Prime = a2 * (1 + G);
    const C1Prime = sqrt(a1Prime * a1Prime + b1 * b1);
    const C2Prime = sqrt(a2Prime * a2Prime + b2 * b2);
    const CBarPrime = (C1Prime + C2Prime) / 2.0;
    const DeltaCPrime = C2Prime - C1Prime;

    // calculate h' (hue angle)
    const h1Prime = Math.atan2(b1, a1Prime) * rad2deg;
    const h2Prime = Math.atan2(b2, a2Prime) * rad2deg;

    // normalize hue angles to 0-360 range
    const normalizedH1 = h1Prime >= 0 ? h1Prime : h1Prime + 360;
    const normalizedH2 = h2Prime >= 0 ? h2Prime : h2Prime + 360;

    // calculate Delta h' (hue difference) and Delta H' (weighted hue difference)
    let DeltaHPrime;
    if (C1Prime * C2Prime === 0) {
      DeltaHPrime = 0; // if one chroma is zero, hue difference is meaningless.
    } else if (abs(normalizedH1 - normalizedH2) <= 180) {
      DeltaHPrime = normalizedH2 - normalizedH1;
    } else if (normalizedH2 - normalizedH1 > 180) {
      DeltaHPrime = normalizedH2 - normalizedH1 - 360;
    } else {
      // (h2 - h1) < -180
      DeltaHPrime = normalizedH2 - normalizedH1 + 360;
    }

    // convert Delta H' to a metric difference (ΔH')
    const DeltaSmallHPrime =
      2 * sqrt(C1Prime * C2Prime) * Math.sin((DeltaHPrime * deg2rad) / 2.0);

    // calculate Delta L'
    const DeltaLPrime = L2 - L1;

    // calculate Average H' (HBarPrime)
    let HBarPrime;
    if (C1Prime * C2Prime === 0) {
      HBarPrime = normalizedH1 + normalizedH2; // use sum as average if one is indeterminate
    } else if (abs(normalizedH1 - normalizedH2) > 180) {
      if (normalizedH1 + normalizedH2 < 360) {
        HBarPrime = (normalizedH1 + normalizedH2 + 360) / 2.0;
      } else {
        HBarPrime = (normalizedH1 + normalizedH2 - 360) / 2.0;
      }
    } else {
      HBarPrime = (normalizedH1 + normalizedH2) / 2.0;
    }

    // calculate T (hue weighting function)
    const T =
      1.0 -
      0.17 * Math.cos((HBarPrime - 30.0) * deg2rad) +
      0.24 * Math.cos(2.0 * HBarPrime * deg2rad) +
      0.32 * Math.cos((3.0 * HBarPrime + 6.0) * deg2rad) -
      0.2 * Math.cos((4.0 * HBarPrime - 63.0) * deg2rad);

    // calculate SL, SC, SH (weighting functions)
    const SL =
      1.0 +
      (0.015 * (HBarPrime - 27.5) ** 2) / (20.0 + (HBarPrime - 27.5) ** 2);
    const SC = 1.0 + 0.045 * CBarPrime;
    const SH = 1.0 + 0.015 * CBarPrime * T;

    // calculate RT (rotation term)
    const CBarPrimePow7 = CBarPrime ** 7;
    const RT =
      -2.0 *
      Math.sin(HBarPrime * deg2rad) *
      sqrt(CBarPrimePow7 / (CBarPrimePow7 + 6103515625.0));

    // calculate the final Delta E 2000 value
    const deltaE = sqrt(
      (DeltaLPrime / (kL * SL)) ** 2 +
        (DeltaCPrime / (kC * SC)) ** 2 +
        (DeltaSmallHPrime / (kH * SH)) ** 2 +
        RT * (DeltaCPrime / (kC * SC)) * (DeltaSmallHPrime / (kH * SH))
    );

    return deltaE;
  }

  const _spectrumIcon =
    "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI1NS42NTIwNCIgaGVpZ2h0PSI1NS42NTIwNCIgdmlld0JveD0iMCwwLDU1LjY1MjA0LDU1LjY1MjA0Ij48ZGVmcz48bGluZWFyR3JhZGllbnQgeDE9IjI0Mi4wNjU4NSIgeTE9IjE1Mi4zNjgwMSIgeDI9IjIzNy45MzQxOSIgeTI9IjIwNy42MzE5OSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiIGlkPSJjb2xvci0xIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiMzMzNhZmYiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMzMzNhZmYiIHN0b3Atb3BhY2l0eT0iMCIvPjwvbGluZWFyR3JhZGllbnQ+PGxpbmVhckdyYWRpZW50IHgxPSIyMTIuMzY4MDIiIHkxPSIxNzcuOTM0MTciIHgyPSIyNjcuNjMxOTkiIHkyPSIxODIuMDY1ODMiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBpZD0iY29sb3ItMiI+PHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjMzZmZjMzIiBzdG9wLW9wYWNpdHk9IjAuNzAxOTYiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMzNmZmMzMiIHN0b3Atb3BhY2l0eT0iMCIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMTIuMTc0LC0xNTIuMTczOTgpIj48ZyBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiPjxwYXRoIGQ9Ik0yMTIuMjkwOTEsMTgwYzAsLTE1LjMwMzMyIDEyLjQwNTc5LC0yNy43MDkxMSAyNy43MDkxMSwtMjcuNzA5MTFjMTUuMzAzMzIsMCAyNy43MDkxMSwxMi40MDU3OSAyNy43MDkxMSwyNy43MDkxMWMwLDE1LjMwMzMyIC0xMi40MDU3OSwyNy43MDkxMSAtMjcuNzA5MTEsMjcuNzA5MTFjLTE1LjMwMzMyLDAgLTI3LjcwOTExLC0xMi40MDU3OSAtMjcuNzA5MTEsLTI3LjcwOTExeiIgZmlsbD0iI2ZmMzMzMyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9Ik5hTiIvPjxwYXRoIGQ9Ik0yMTIuMzY4MDMsMTc3LjkzNDE3YzEuMTQwOTMsLTE1LjI2MDczIDE0LjQzNzEsLTI2LjcwNzA5IDI5LjY5NzgyLC0yNS41NjYxNmMxNS4yNjA3MywxLjE0MDkzIDI2LjcwNzA5LDE0LjQzNzEgMjUuNTY2MTYsMjkuNjk3ODJjLTEuMTQwOTMsMTUuMjYwNzMgLTE0LjQzNzEsMjYuNzA3MDkgLTI5LjY5NzgyLDI1LjU2NjE2Yy0xNS4yNjA3MywtMS4xNDA5MyAtMjYuNzA3MDksLTE0LjQzNzEgLTI1LjU2NjE2LC0yOS42OTc4MnoiIGZpbGw9InVybCgjY29sb3ItMSkiIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSJOYU4iLz48cGF0aCBkPSJNMjM3LjkzNDE5LDIwNy42MzJjLTE1LjI2MDcyLC0xLjE0MDkzIC0yNi43MDcwOSwtMTQuNDM3MSAtMjUuNTY2MTYsLTI5LjY5NzgzYzEuMTQwOTMsLTE1LjI2MDczIDE0LjQzNzEsLTI2LjcwNzA5IDI5LjY5NzgzLC0yNS41NjYxN2MxNS4yNjA3MywxLjE0MDkzIDI2LjcwNzA5LDE0LjQzNzEgMjUuNTY2MTYsMjkuNjk3ODNjLTEuMTQwOTMsMTUuMjYwNzMgLTE0LjQzNzEsMjYuNzA3MDkgLTI5LjY5NzgzLDI1LjU2NjE3eiIgZmlsbD0idXJsKCNjb2xvci0yKSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9Ik5hTiIvPjxwYXRoIGQ9Ik0yMTMuNDI0LDE4MGMwLC0xNC42Nzc1MyAxMS44OTg0OSwtMjYuNTc2MDIgMjYuNTc2MDIsLTI2LjU3NjAyYzE0LjY3NzUzLDAgMjYuNTc2MDIsMTEuODk4NDkgMjYuNTc2MDIsMjYuNTc2MDJjMCwxNC42Nzc1MyAtMTEuODk4NDksMjYuNTc2MDIgLTI2LjU3NjAyLDI2LjU3NjAyYy0xNC42Nzc1MywwIC0yNi41NzYwMiwtMTEuODk4NDkgLTI2LjU3NjAyLC0yNi41NzYwMnoiIGZpbGw9Im5vbmUiIHN0cm9rZS1vcGFjaXR5PSIwLjQ0MzE0IiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMi41Ii8+PC9nPjwvZz48L3N2Zz4=";
  const blockIcon =
    "data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIxNi41ODk4NSIgaGVpZ2h0PSIxNi41ODk4NSIgdmlld0JveD0iMCwwLDE2LjU4OTg1LDE2LjU4OTg1Ij48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjMxLjcwNTA4LC0xNzEuNzA1MDYpIj48ZyBzdHJva2Utd2lkdGg9IjAuNjI1IiBzdHJva2UtbWl0ZXJsaW1pdD0iMTAiPjxwYXRoIGQ9Ik0yMzIuMDQ1LDE4M2MwLC0yLjQ4NTI4IDIuMDE0NzIsLTQuNSA0LjUsLTQuNWMyLjQ4NTI4LDAgNC41LDIuMDE0NzIgNC41LDQuNWMwLDIuNDg1MjggLTIuMDE0NzIsNC41IC00LjUsNC41Yy0yLjQ4NTI4LDAgLTQuNSwtMi4wMTQ3MiAtNC41LC00LjV6IiBmaWxsPSIjNGM5N2ZmIiBzdHJva2U9IiMzMzczY2MiLz48cGF0aCBkPSJNMjQwLjA0NSwxNzIuNWMyLjQ4NTI4LDAgNC41LDIuMDE0NzIgNC41LDQuNWMwLDIuNDg1MjggLTIuMDE0NzIsNC41IC00LjUsNC41Yy0yLjQ4NTI4LDAgLTQuNSwtMi4wMTQ3MiAtNC41LC00LjVjMCwtMi40ODUyOCAyLjAxNDcyLC00LjUgNC41LC00LjV6IiBmaWxsPSIjZmY2NjgwIiBzdHJva2U9IiNmZjMzNTUiLz48cGF0aCBkPSJNMjQzLjQ1NSwxNzguNWMyLjQ4NTI4LDAgNC41LDIuMDE0NzIgNC41LDQuNWMwLDIuNDg1MjggLTIuMDE0NzIsNC41IC00LjUsNC41Yy0yLjQ4NTI4LDAgLTQuNSwtMi4wMTQ3MiAtNC41LC00LjVjMCwtMi40ODUyOCAyLjAxNDcyLC00LjUgNC41LC00LjV6IiBmaWxsPSIjZmZiZjAwIiBzdHJva2U9IiNjYzk5MDAiLz48cGF0aCBkPSJNMjMxLjcwNTA5LDE4OC4yOTQ5MnYtMTYuNTg5ODVoMTYuNTg5ODV2MTYuNTg5ODV6IiBmaWxsPSJub25lIiBzdHJva2U9Im5vbmUiLz48cGF0aCBkPSJNMjQzLjQ1NSwxNzguNWMyLjQ4NTI4LDAgNC41LDIuMDE0NzIgNC41LDQuNWMwLDIuNDg1MjggLTIuMDE0NzIsNC41IC00LjUsNC41Yy0yLjQ4NTI4LDAgLTQuNSwtMi4wMTQ3MiAtNC41LC00LjVjMCwtMi40ODUyOCAyLjAxNDcyLC00LjUgNC41LC00LjV6IiBmaWxsLW9wYWNpdHk9IjAuNTAxOTYiIGZpbGw9IiNmZmJmMDAiIHN0cm9rZS1vcGFjaXR5PSIwLjUwMTk2IiBzdHJva2U9IiNjYzk5MDAiLz48cGF0aCBkPSJNMjMyLjA0NSwxODNjMCwtMi40ODUyOCAyLjAxNDcyLC00LjUgNC41LC00LjVjMi40ODUyOCwwIDQuNSwyLjAxNDcyIDQuNSw0LjVjMCwyLjQ4NTI4IC0yLjAxNDcyLDQuNSAtNC41LDQuNWMtMi40ODUyOCwwIC00LjUsLTIuMDE0NzIgLTQuNSwtNC41eiIgZmlsbC1vcGFjaXR5PSIwLjUwMTk2IiBmaWxsPSIjNGQ5N2ZmIiBzdHJva2Utb3BhY2l0eT0iMC41MDE5NiIgc3Ryb2tlPSIjMzM3M2NjIi8+PHBhdGggZD0iTTI0MC4wNDUsMTcyLjVjMi40ODUyOCwwIDQuNSwyLjAxNDcyIDQuNSw0LjVjMCwyLjQ4NTI4IC0yLjAxNDcyLDQuNSAtNC41LDQuNWMtMi40ODUyOCwwIC00LjUsLTIuMDE0NzIgLTQuNSwtNC41YzAsLTIuNDg1MjggMi4wMTQ3MiwtNC41IDQuNSwtNC41eiIgZmlsbC1vcGFjaXR5PSIwLjUwMTk2IiBmaWxsPSIjZmY2NjgwIiBzdHJva2Utb3BhY2l0eT0iMC41MDE5NiIgc3Ryb2tlPSIjZmYzMzU1Ii8+PC9nPjwvZz48L3N2Zz48IS0tcm90YXRpb25DZW50ZXI6OC4yOTQ5MTUwMDAwMDAwMDM6OC4yOTQ5MzUwMDAwMDAwMS0tPg==";
  class Colors {
    getInfo() {
      return {
        id: "lxColors",
        name: Scratch.translate("Colors"),
        color1: "#f94c97",
        menuIconURI: blockIcon,
        blocks: [
          {
            opcode: "newColor",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("new color [COL]"),
            arguments: {
              COL: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#a45eff",
              },
            },
          },
          {
            opcode: "newColorRGB",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("from RGB [R] [G] [B]"),
            arguments: {
              R: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "164",
              },
              G: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "94",
              },
              B: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "255",
              },
            },
          },
          {
            opcode: "newColorHSV",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("from HSV [H] [S] [V]"),
            arguments: {
              H: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "266",
              },
              S: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "63",
              },
              V: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "100",
              },
            },
          },
          {
            opcode: "newColorHSL",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("from HSL [H] [S] [L]"),
            arguments: {
              H: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "266",
              },
              S: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "100",
              },
              L: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "68",
              },
            },
          },
          {
            opcode: "newColorDecimal",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate({
              default: "from decimal [DEC]",
              description: "From decimal - as in the base system",
            }),
            arguments: {
              DEC: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "10772223",
              },
            },
          },
          "---",
          {
            opcode: "randomColor",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("random color"),
            disableMonitor: true,
          },
          "---",
          {
            opcode: "additiveBlend",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("[COL1] + [COL2]"),
            arguments: {
              COL1: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#a45eff",
              },
              COL2: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#eb57ab",
              },
            },
          },
          {
            opcode: "subtractiveBlend",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("[COL1] - [COL2]"),
            arguments: {
              COL1: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#a45eff",
              },
              COL2: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#eb57ab",
              },
            },
          },
          {
            opcode: "multiplicativeBlend",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("[COL1] * [COL2]"),
            arguments: {
              COL1: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#a45eff",
              },
              COL2: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#eb57ab",
              },
            },
          },
          {
            opcode: "divisingBlend",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("[COL1] / [COL2]"),
            arguments: {
              COL1: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#a45eff",
              },
              COL2: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#eb57ab",
              },
            },
          },
          "---",
          {
            opcode: "differenceBlend",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("difference of [COL1] - [COL2]"),
            arguments: {
              COL1: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#a45eff",
              },
              COL2: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#eb57ab",
              },
            },
          },
          {
            opcode: "screenBlend",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("screen [COL1] * [COL2]"),
            arguments: {
              COL1: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#a45eff",
              },
              COL2: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#eb57ab",
              },
            },
          },
          {
            opcode: "overlayBlend",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("overlay [COL1] * [COL2]"),
            arguments: {
              COL1: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#a45eff",
              },
              COL2: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#eb57ab",
              },
            },
          },
          "---",
          {
            opcode: "invertColor",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("invert [COL]"),
            arguments: {
              COL: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#a45eff",
              },
            },
          },
          {
            opcode: "contrastColor",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate({
              default: "contrast [COL] by [NUM]",
              description:
                "Contrast - as a verb, comparing to highlight differences",
            }),
            arguments: {
              COL: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#a45eff",
              },
              NUM: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0.5",
              },
            },
          },
          {
            opcode: "grayscaleColor",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("grayscale [COL]"),
            arguments: {
              COL: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#a45eff",
              },
            },
          },
          {
            opcode: "percentWhite",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("[NUM] % white"),
            arguments: {
              NUM: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "75",
              },
            },
          },
          "---",
          {
            opcode: "distanceBetweenColors",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("distance between [COL1] and [COL2]"),
            arguments: {
              COL1: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#a45eff",
              },
              COL2: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#eb57ab",
              },
            },
          },
          {
            opcode: "contrastRatioOfColors",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("contrast ratio of [COL1] and [COL2]"),
            arguments: {
              COL1: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#a45eff",
              },
              COL2: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#eb57ab",
              },
            },
          },
          {
            opcode: "nearEqualColors",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate("[COL1] ≈ [COL2] threshold [THR]"),
            arguments: {
              COL1: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#a45eff",
              },
              COL2: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#eb57ab",
              },
              THR: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "25",
              },
            },
          },
          {
            opcode: "colorFollowsWCAG",
            blockType: Scratch.BlockType.BOOLEAN,
            text: Scratch.translate(
              "does [COL1] and [COL2] follow [AAA] for [TXT] text"
            ),
            arguments: {
              COL1: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#a45eff",
              },
              COL2: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#eb57ab",
              },
              AAA: {
                type: Scratch.ArgumentType.STRING,
                menu: "WCAG_MENU",
              },
              TXT: {
                type: Scratch.ArgumentType.STRING,
                menu: "TEXTWCAG_SIZE_MENU",
              },
            },
            hideFromPalette: true,
          },
          "---",
          {
            opcode: "interpolateColors",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate(
              "interpolate [COL1] to [COL2] ratio [RATIO] using [SPACE]"
            ),
            arguments: {
              COL1: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#a45eff",
              },
              COL2: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#eb57ab",
              },
              RATIO: {
                type: Scratch.ArgumentType.NUMBER,
                defaultValue: "0.5",
              },
              SPACE: {
                type: Scratch.ArgumentType.STRING,
                menu: "SPACE_MENU",
              },
            },
          },
          "---",
          {
            opcode: "getChannelFromColor",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("get [CHN] of [COL]"),
            arguments: {
              CHN: {
                type: Scratch.ArgumentType.STRING,
                menu: "CHANNEL_MENU",
              },
              COL: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#a45eff",
              },
            },
          },
          {
            opcode: "setChannelOfColor",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("set [CHN] of [COL] to [SET]"),
            arguments: {
              CHN: {
                type: Scratch.ArgumentType.STRING,
                menu: "CHANNEL_MENU",
              },
              COL: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#a45eff",
              },
              SET: {
                type: Scratch.ArgumentType.NUMBER,
              },
            },
          },
          {
            opcode: "changeChannelOfColor",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate("change [CHN] of [COL] by [SET]"),
            arguments: {
              CHN: {
                type: Scratch.ArgumentType.STRING,
                menu: "CHANNEL_MENU",
              },
              COL: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#a45eff",
              },
              SET: {
                type: Scratch.ArgumentType.NUMBER,
              },
            },
          },
          "---",
          {
            opcode: "colorToDecimal",
            blockType: Scratch.BlockType.REPORTER,
            text: Scratch.translate({
              default: "[COL] to decimal",
              description: "To decimal - as in the base system",
            }),
            arguments: {
              COL: {
                type: Scratch.ArgumentType.COLOR,
                defaultValue: "#a45eff",
              },
            },
          },
        ],
        menus: {
          CHANNEL_MENU: {
            acceptReporters: true,
            items: [
              { text: Scratch.translate("red"), value: "red" },
              { text: Scratch.translate("green"), value: "green" },
              { text: Scratch.translate("blue"), value: "blue" },
              { text: Scratch.translate("hue"), value: "hue" },
              { text: Scratch.translate("saturation"), value: "saturation" },
              { text: Scratch.translate("value"), value: "value" },
            ],
          },
          SPACE_MENU: {
            acceptReporters: true,
            items: [
              { text: Scratch.translate("RGB"), value: "RGB" },
              { text: Scratch.translate("HSV"), value: "HSV" },
            ],
          },
          WCAG_MENU: {
            acceptReporters: true,
            items: ["A", "AA", "AAA"],
          },
          TEXTWCAG_SIZE_MENU: {
            acceptReporters: true,
            items: [
              { text: Scratch.translate("normal"), value: "normal" },
              { text: Scratch.translate("large"), value: "large" },
            ],
          },
        },
      };
    }
    newColor(args) {
      return args.COL;
    }
    newColorRGB(args) {
      return "#" + toFixHex(args.R) + toFixHex(args.G) + toFixHex(args.B);
    }
    newColorHSV(args) {
      return hsvToHex(args.H, args.S, args.V);
    }
    newColorHSL(args) {
      let convRGB = hslToRgb(args.H, args.S, args.L);
      return (
        "#" + toFixHex(convRGB.r) + toFixHex(convRGB.g) + toFixHex(convRGB.b)
      );
    }
    newColorDecimal(args) {
      return "#" + toHex(args.DEC);
    }
    randomColor() {
      return (
        "#" +
        Math.floor(Math.random() * 0xffffff)
          .toString(16)
          .padStart(6, "0")
      );
    }
    additiveBlend(args) {
      let a = hexToRgb(args.COL1);
      let b = hexToRgb(args.COL2);
      const add = (c1, c2) => clamp(c1 + c2, 0, 255);
      return rgbToHex({
        r: add(a.r, b.r),
        g: add(a.g, b.g),
        b: add(a.b, b.b),
      });
    }
    subtractiveBlend(args) {
      let a = hexToRgb(args.COL1);
      let b = hexToRgb(args.COL2);
      const sub = (c1, c2) => clamp(c1 - c2, 0, 255);
      return rgbToHex({
        r: sub(a.r, b.r),
        g: sub(a.g, b.g),
        b: sub(a.b, b.b),
      });
    }
    multiplicativeBlend(args) {
      let a = hexToRgb(args.COL1);
      let b = hexToRgb(args.COL2);
      const mul = (c1, c2) => clamp((c1 * c2) / 255, 0, 255);
      return rgbToHex({
        r: mul(a.r, b.r),
        g: mul(a.g, b.g),
        b: mul(a.b, b.b),
      });
    }
    divisingBlend(args) {
      let a = hexToRgb(args.COL1);
      let b = hexToRgb(args.COL2);
      const div = (c1, c2) => clamp((c1 / Math.max(c2, 1)) * 255, 0, 255);
      return rgbToHex({
        r: div(a.r, b.r),
        g: div(a.g, b.g),
        b: div(a.b, b.b),
      });
    }
    differenceBlend(args) {
      let a = hexToRgb(args.COL1);
      let b = hexToRgb(args.COL2);
      const sub = (c1, c2) => clamp(abs(c1 - c2), 0, 255);
      return rgbToHex({
        r: sub(a.r, b.r),
        g: sub(a.g, b.g),
        b: sub(a.b, b.b),
      });
    }
    screenBlend(args) {
      let a = hexToRgb(args.COL1);
      let b = hexToRgb(args.COL2);
      const scr = (c1, c2) => clamp(c1 + c2 - (c1 * c2) / 255, 0, 255);
      return rgbToHex({
        r: scr(a.r, b.r),
        g: scr(a.g, b.g),
        b: scr(a.b, b.b),
      });
    }
    overlayBlend(args) {
      let a = hexToRgb(args.COL1);
      let b = hexToRgb(args.COL2);
      const ove = (c1, c2) =>
        clamp(
          c1 < 128
            ? (2 * c1 * c2) / 255
            : 255 - (2 * (255 - c1) * (255 - c2)) / 255,
          0,
          255
        );
      return rgbToHex({
        r: ove(a.r, b.r),
        g: ove(a.g, b.g),
        b: ove(a.b, b.b),
      });
    }
    invertColor(args) {
      let col = hexToRgb(args.COL);
      const inv = (c) => 255 - c;
      return rgbToHex({
        r: inv(col.r),
        g: inv(col.g),
        b: inv(col.b),
      });
    }
    contrastColor(args) {
      let col = hexToRgb(args.COL);
      const cnt = (c) => (c - 128) * (1 - args.NUM) + 128;
      return rgbToHex({
        r: cnt(col.r),
        g: cnt(col.g),
        b: cnt(col.b),
      });
    }
    grayscaleColor(args) {
      let rgb = hexToRgb(args.COL);
      let gray = Math.round(0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b);
      return "#" + toFixHex(gray) + toFixHex(gray) + toFixHex(gray);
    }
    percentWhite(args) {
      let white = round(args.NUM * 2.55);
      return "#" + toFixHex(white) + toFixHex(white) + toFixHex(white);
    }
    distanceBetweenColors(args) {
      return distanceBetweenHexColorsDeltaE2000(args.COL1, args.COL2);
    }
    nearEqualColors(args) {
      return (
        distanceBetweenHexColorsDeltaE2000(args.COL1, args.COL2) <= args.THR
      );
    }
    contrastRatioOfColors(args) {
      return round(contrastRatio(args.COL1, args.COL2) * 100) / 100;
    }
    colorFollowsWCAG(args) {
      let ratio = round(contrastRatio(args.COL1, args.COL2) * 100) / 100;
      let req = 0;
      let level = args.AAA;
      let size = args.TXT;
      if (level === "AA") {
        req = size === "large" ? 3.0 : 4.5;
      }
      if (level === "AAA") {
        req = size === "large" ? 4.5 : 7.0;
      }
      return ratio >= req;
    }
    interpolateColors(args) {
      if (args.SPACE == "RGB") {
        let a = hexToRgb(args.COL1);
        let b = hexToRgb(args.COL2);
        let t = args.RATIO;
        return rgbToHex({
          r: lerp(a.r, b.r, t),
          g: lerp(a.g, b.g, t),
          b: lerp(a.b, b.b, t),
        });
      } else {
        return interpolateHexColorsHsv(args.COL1, args.COL2, args.RATIO);
      }
    }
    getChannelFromColor(args) {
      if (["red", "green", "blue"].includes(args.CHN)) {
        let channel = ["red", "green", "blue"].indexOf(args.CHN);
        let letter = ["red", "green", "blue"][channel][0];
        return hexToRgb(args.COL)[letter];
      } else if (["hue", "saturation", "value"].includes(args.CHN)) {
        let hsv = hexToHsv(args.COL);
        switch (args.CHN) {
          case "hue":
            return round(hsv.h);
          case "saturation":
            return round(hsv.s);
          case "value":
            return round(hsv.v);
        }
      }
    }
    setChannelOfColor(args) {
      if (["red", "green", "blue"].includes(args.CHN)) {
        let rgb = hexToRgb(args.COL);
        switch (args.CHN) {
          case "red":
            rgb.r = args.SET;
            break;
          case "green":
            rgb.g = args.SET;
            break;
          case "blue":
            rgb.b = args.SET;
            break;
        }
        return "#" + toFixHex(rgb.r) + toFixHex(rgb.g) + toFixHex(rgb.b);
      } else if (["hue", "saturation", "value"].includes(args.CHN)) {
        let hsv = hexToHsv(args.COL);
        switch (args.CHN) {
          case "hue":
            hsv.h = args.SET;
            break;
          case "saturation":
            hsv.s = args.SET;
            break;
          case "value":
            hsv.v = args.SET;
            break;
        }
        return hsvToHex(hsv.h, hsv.s, hsv.v);
      }
    }
    changeChannelOfColor(args) {
      if (["red", "green", "blue"].includes(args.CHN)) {
        let rgb = hexToRgb(args.COL);
        switch (args.CHN) {
          case "red":
            rgb.r = clamp(rgb.r + args.SET, 0, 255);
            break;
          case "green":
            rgb.g = clamp(rgb.g + args.SET, 0, 255);
            break;
          case "blue":
            rgb.b = clamp(rgb.b + args.SET, 0, 255);
            break;
        }
        return "#" + toFixHex(rgb.r) + toFixHex(rgb.g) + toFixHex(rgb.b);
      } else if (["hue", "saturation", "value"].includes(args.CHN)) {
        let hsv = hexToHsv(args.COL);
        switch (args.CHN) {
          case "hue":
            hsv.h = (hsv.h + args.SET) % 360;
            break;
          case "saturation":
            hsv.s = clamp(hsv.s + args.SET, 0, 100);
            break;
          case "value":
            hsv.v = clamp(hsv.v + args.SET, 0, 100);
            break;
        }
        return hsvToHex(hsv.h, hsv.s, hsv.v);
      }
    }
    colorToDecimal(args) {
      return toDec(args.COL.slice(1));
    }
  }
  Scratch.extensions.register(new Colors());
})(Scratch);
