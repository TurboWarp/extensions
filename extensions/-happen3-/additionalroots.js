// Name: Additional Roots
// ID: additionalroots
// Description: A bunch of new additional roots for your pleasure.
// By: -happen3-
// Original: -happen3-

(function (ext) {
    ext.squareRoot = function (num) {
        return Math.sqrt(num);
    };

    ext.cubeRoot = function (num) {
        return Math.cbrt(num);
    };

    ext.fourthRoot = function (num) {
        return Math.pow(num, 1 / 4);
    };

    ext.fifthRoot = function (num) {
        return Math.pow(num, 1 / 5);
    };

    ext.nthRoot = function (n, nth) {
        return Math.pow(n, 1 / nth);
    };

    // extension data
    var descriptor = {
        blocks: [
            ['r', 'square root of %n', 'squareRoot', 9],
            ['r', 'cube root of %n', 'cubeRoot', 8],
            ['r', 'fourth root of %n', 'fourthRoot', 16],
            ['r', 'fifth root of %n', 'fifthRoot', 32],
            ['r', '%n to the power of 1/%n', 'nthRoot', 4, 2],
        ],
        menus: {},
        displayName: 'Additional Roots!',
    };

    // register the extension
    ScratchExtensions.register('additionalRoots', descriptor, ext);
})({});
