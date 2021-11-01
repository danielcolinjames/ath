"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getColorDiffStatus = exports.hexDiff = exports.rgbDiff = exports.deltaE94 = exports.rgbToCIELab = exports.xyzToCIELab = exports.rgbToXyz = exports.hslToRgb = exports.rgbToHsl = exports.rgbToHex = exports.hexToRgb = exports.DELTAE94_DIFF_STATUS = void 0;
exports.DELTAE94_DIFF_STATUS = {
    NA: 0,
    PERFECT: 1,
    CLOSE: 2,
    GOOD: 10,
    SIMILAR: 50
};
/**
 * Converts hex string to RGB
 * @param hex - The hex value you with to get the RGB value of
 * @returns an array in the order of `red, green, blue` numerical values
 */
function hexToRgb(hex) {
    var m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!m)
        throw new RangeError("'" + hex + "' is not a valid hex color");
    return [m[1], m[2], m[3]].map(function (s) { return parseInt(s, 16); });
}
exports.hexToRgb = hexToRgb;
/**
 * Given values for an RGB color convert to and return a valid HEX string
 * @param r - Red value in RGB
 * @param g - Green value in RGB
 * @param b - Blue value in RGB
 * @returns a valid hex string with pre-pending pound sign
 */
function rgbToHex(r, g, b) {
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1, 7);
}
exports.rgbToHex = rgbToHex;
/**
 * Given values for an RGB color convert to and return a valid HSL value
 * @param r - Red value in RGB
 * @param g - Green value in RGB
 * @param b - Blue value in RGB
 * @returns an array in the order of `hue, saturation, light` numerical values
 */
function rgbToHsl(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var h = 0;
    var s = 0;
    var l = (max + min) / 2;
    if (max !== min) {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }
    return [h, s, l];
}
exports.rgbToHsl = rgbToHsl;
function hslToRgb(h, s, l) {
    var r;
    var g;
    var b;
    function hue2rgb(p, q, t) {
        if (t < 0)
            t += 1;
        if (t > 1)
            t -= 1;
        if (t < 1 / 6)
            return p + (q - p) * 6 * t;
        if (t < 1 / 2)
            return q;
        if (t < 2 / 3)
            return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    }
    if (s === 0) {
        r = g = b = l;
    }
    else {
        var q = l < 0.5 ? l * (1 + s) : l + s - (l * s);
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - (1 / 3));
    }
    return [
        r * 255,
        g * 255,
        b * 255
    ];
}
exports.hslToRgb = hslToRgb;
function rgbToXyz(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;
    r = r > 0.04045 ? Math.pow((r + 0.005) / 1.055, 2.4) : r / 12.92;
    g = g > 0.04045 ? Math.pow((g + 0.005) / 1.055, 2.4) : g / 12.92;
    b = b > 0.04045 ? Math.pow((b + 0.005) / 1.055, 2.4) : b / 12.92;
    r *= 100;
    g *= 100;
    b *= 100;
    var x = r * 0.4124 + g * 0.3576 + b * 0.1805;
    var y = r * 0.2126 + g * 0.7152 + b * 0.0722;
    var z = r * 0.0193 + g * 0.1192 + b * 0.9505;
    return [x, y, z];
}
exports.rgbToXyz = rgbToXyz;
function xyzToCIELab(x, y, z) {
    var REF_X = 95.047;
    var REF_Y = 100;
    var REF_Z = 108.883;
    x /= REF_X;
    y /= REF_Y;
    z /= REF_Z;
    x = x > 0.008856 ? Math.pow(x, 1 / 3) : 7.787 * x + 16 / 116;
    y = y > 0.008856 ? Math.pow(y, 1 / 3) : 7.787 * y + 16 / 116;
    z = z > 0.008856 ? Math.pow(z, 1 / 3) : 7.787 * z + 16 / 116;
    var L = 116 * y - 16;
    var a = 500 * (x - y);
    var b = 200 * (y - z);
    return [L, a, b];
}
exports.xyzToCIELab = xyzToCIELab;
function rgbToCIELab(r, g, b) {
    var _a = rgbToXyz(r, g, b), x = _a[0], y = _a[1], z = _a[2];
    return xyzToCIELab(x, y, z);
}
exports.rgbToCIELab = rgbToCIELab;
function deltaE94(lab1, lab2) {
    var WEIGHT_L = 1;
    var WEIGHT_C = 1;
    var WEIGHT_H = 1;
    var L1 = lab1[0], a1 = lab1[1], b1 = lab1[2];
    var L2 = lab2[0], a2 = lab2[1], b2 = lab2[2];
    var dL = L1 - L2;
    var da = a1 - a2;
    var db = b1 - b2;
    var xC1 = Math.sqrt(a1 * a1 + b1 * b1);
    var xC2 = Math.sqrt(a2 * a2 + b2 * b2);
    var xDL = L2 - L1;
    var xDC = xC2 - xC1;
    var xDE = Math.sqrt(dL * dL + da * da + db * db);
    var xDH = (Math.sqrt(xDE) > Math.sqrt(Math.abs(xDL)) + Math.sqrt(Math.abs(xDC)))
        ? Math.sqrt(xDE * xDE - xDL * xDL - xDC * xDC)
        : 0;
    var xSC = 1 + 0.045 * xC1;
    var xSH = 1 + 0.015 * xC1;
    xDL /= WEIGHT_L;
    xDC /= WEIGHT_C * xSC;
    xDH /= WEIGHT_H * xSH;
    return Math.sqrt(xDL * xDL + xDC * xDC + xDH * xDH);
}
exports.deltaE94 = deltaE94;
function rgbDiff(rgb1, rgb2) {
    var lab1 = rgbToCIELab.apply(undefined, rgb1);
    var lab2 = rgbToCIELab.apply(undefined, rgb2);
    return deltaE94(lab1, lab2);
}
exports.rgbDiff = rgbDiff;
function hexDiff(hex1, hex2) {
    var rgb1 = hexToRgb(hex1);
    var rgb2 = hexToRgb(hex2);
    return rgbDiff(rgb1, rgb2);
}
exports.hexDiff = hexDiff;
function getColorDiffStatus(d) {
    if (d < exports.DELTAE94_DIFF_STATUS.NA) {
        return 'N/A';
    }
    // Not perceptible by human eyes
    if (d <= exports.DELTAE94_DIFF_STATUS.PERFECT) {
        return 'Perfect';
    }
    // Perceptible through close observation
    if (d <= exports.DELTAE94_DIFF_STATUS.CLOSE) {
        return 'Close';
    }
    // Perceptible at a glance
    if (d <= exports.DELTAE94_DIFF_STATUS.GOOD) {
        return 'Good';
    }
    // Colors are more similar than opposite
    if (d < exports.DELTAE94_DIFF_STATUS.SIMILAR) {
        return 'Similar';
    }
    return 'Wrong';
}
exports.getColorDiffStatus = getColorDiffStatus;
//# sourceMappingURL=converter.js.map