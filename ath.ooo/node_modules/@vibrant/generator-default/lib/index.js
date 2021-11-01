"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var color_1 = require("@vibrant/color");
var converter_1 = require("@vibrant/color/lib/converter");
var DefaultOpts = {
    targetDarkLuma: 0.26,
    maxDarkLuma: 0.45,
    minLightLuma: 0.55,
    targetLightLuma: 0.74,
    minNormalLuma: 0.3,
    targetNormalLuma: 0.5,
    maxNormalLuma: 0.7,
    targetMutesSaturation: 0.3,
    maxMutesSaturation: 0.4,
    targetVibrantSaturation: 1.0,
    minVibrantSaturation: 0.35,
    weightSaturation: 3,
    weightLuma: 6.5,
    weightPopulation: 0.5
};
function _findMaxPopulation(swatches) {
    var p = 0;
    swatches.forEach(function (s) {
        p = Math.max(p, s.population);
    });
    return p;
}
function _isAlreadySelected(palette, s) {
    return palette.Vibrant === s
        || palette.DarkVibrant === s
        || palette.LightVibrant === s
        || palette.Muted === s
        || palette.DarkMuted === s
        || palette.LightMuted === s;
}
function _createComparisonValue(saturation, targetSaturation, luma, targetLuma, population, maxPopulation, opts) {
    function weightedMean() {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            values[_i] = arguments[_i];
        }
        var sum = 0;
        var weightSum = 0;
        for (var i = 0; i < values.length; i += 2) {
            var value = values[i];
            var weight = values[i + 1];
            sum += value * weight;
            weightSum += weight;
        }
        return sum / weightSum;
    }
    function invertDiff(value, targetValue) {
        return 1 - Math.abs(value - targetValue);
    }
    return weightedMean(invertDiff(saturation, targetSaturation), opts.weightSaturation, invertDiff(luma, targetLuma), opts.weightLuma, population / maxPopulation, opts.weightPopulation);
}
function _findColorVariation(palette, swatches, maxPopulation, targetLuma, minLuma, maxLuma, targetSaturation, minSaturation, maxSaturation, opts) {
    var max = null;
    var maxValue = 0;
    swatches.forEach(function (swatch) {
        var _a = swatch.hsl, s = _a[1], l = _a[2];
        if (s >= minSaturation && s <= maxSaturation
            && l >= minLuma && l <= maxLuma
            && !_isAlreadySelected(palette, swatch)) {
            var value = _createComparisonValue(s, targetSaturation, l, targetLuma, swatch.population, maxPopulation, opts);
            if (max === null || value > maxValue) {
                max = swatch;
                maxValue = value;
            }
        }
    });
    return max;
}
function _generateVariationColors(swatches, maxPopulation, opts) {
    var palette = {
        Vibrant: null,
        DarkVibrant: null,
        LightVibrant: null,
        Muted: null,
        DarkMuted: null,
        LightMuted: null
    };
    // mVibrantSwatch = findColor(TARGET_NORMAL_LUMA, MIN_NORMAL_LUMA, MAX_NORMAL_LUMA,
    //     TARGET_VIBRANT_SATURATION, MIN_VIBRANT_SATURATION, 1f)
    palette.Vibrant = _findColorVariation(palette, swatches, maxPopulation, opts.targetNormalLuma, opts.minNormalLuma, opts.maxNormalLuma, opts.targetVibrantSaturation, opts.minVibrantSaturation, 1, opts);
    // mLightVibrantSwatch = findColor(TARGET_LIGHT_LUMA, MIN_LIGHT_LUMA, 1f,
    //     TARGET_VIBRANT_SATURATION, MIN_VIBRANT_SATURATION, 1f)
    palette.LightVibrant = _findColorVariation(palette, swatches, maxPopulation, opts.targetLightLuma, opts.minLightLuma, 1, opts.targetVibrantSaturation, opts.minVibrantSaturation, 1, opts);
    // mDarkVibrantSwatch = findColor(TARGET_DARK_LUMA, 0f, MAX_DARK_LUMA,
    //     TARGET_VIBRANT_SATURATION, MIN_VIBRANT_SATURATION, 1f)
    palette.DarkVibrant = _findColorVariation(palette, swatches, maxPopulation, opts.targetDarkLuma, 0, opts.maxDarkLuma, opts.targetVibrantSaturation, opts.minVibrantSaturation, 1, opts);
    // mMutedSwatch = findColor(TARGET_NORMAL_LUMA, MIN_NORMAL_LUMA, MAX_NORMAL_LUMA,
    //     TARGET_MUTED_SATURATION, 0f, MAX_MUTED_SATURATION)
    palette.Muted = _findColorVariation(palette, swatches, maxPopulation, opts.targetNormalLuma, opts.minNormalLuma, opts.maxNormalLuma, opts.targetMutesSaturation, 0, opts.maxMutesSaturation, opts);
    // mLightMutedColor = findColor(TARGET_LIGHT_LUMA, MIN_LIGHT_LUMA, 1f,
    //     TARGET_MUTED_SATURATION, 0f, MAX_MUTED_SATURATION)
    palette.LightMuted = _findColorVariation(palette, swatches, maxPopulation, opts.targetLightLuma, opts.minLightLuma, 1, opts.targetMutesSaturation, 0, opts.maxMutesSaturation, opts);
    // mDarkMutedSwatch = findColor(TARGET_DARK_LUMA, 0f, MAX_DARK_LUMA,
    //     TARGET_MUTED_SATURATION, 0f, MAX_MUTED_SATURATION)
    palette.DarkMuted = _findColorVariation(palette, swatches, maxPopulation, opts.targetDarkLuma, 0, opts.maxDarkLuma, opts.targetMutesSaturation, 0, opts.maxMutesSaturation, opts);
    return palette;
}
function _generateEmptySwatches(palette, maxPopulation, opts) {
    if (!palette.Vibrant && !palette.DarkVibrant && !palette.LightVibrant) {
        if (!palette.DarkVibrant && palette.DarkMuted) {
            var _a = palette.DarkMuted.hsl, h = _a[0], s = _a[1], l = _a[2];
            l = opts.targetDarkLuma;
            palette.DarkVibrant = new color_1.Swatch(converter_1.hslToRgb(h, s, l), 0);
        }
        if (!palette.LightVibrant && palette.LightMuted) {
            var _b = palette.LightMuted.hsl, h = _b[0], s = _b[1], l = _b[2];
            l = opts.targetDarkLuma;
            palette.DarkVibrant = new color_1.Swatch(converter_1.hslToRgb(h, s, l), 0);
        }
    }
    if (!palette.Vibrant && palette.DarkVibrant) {
        var _c = palette.DarkVibrant.hsl, h = _c[0], s = _c[1], l = _c[2];
        l = opts.targetNormalLuma;
        palette.Vibrant = new color_1.Swatch(converter_1.hslToRgb(h, s, l), 0);
    }
    else if (!palette.Vibrant && palette.LightVibrant) {
        var _d = palette.LightVibrant.hsl, h = _d[0], s = _d[1], l = _d[2];
        l = opts.targetNormalLuma;
        palette.Vibrant = new color_1.Swatch(converter_1.hslToRgb(h, s, l), 0);
    }
    if (!palette.DarkVibrant && palette.Vibrant) {
        var _e = palette.Vibrant.hsl, h = _e[0], s = _e[1], l = _e[2];
        l = opts.targetDarkLuma;
        palette.DarkVibrant = new color_1.Swatch(converter_1.hslToRgb(h, s, l), 0);
    }
    if (!palette.LightVibrant && palette.Vibrant) {
        var _f = palette.Vibrant.hsl, h = _f[0], s = _f[1], l = _f[2];
        l = opts.targetLightLuma;
        palette.LightVibrant = new color_1.Swatch(converter_1.hslToRgb(h, s, l), 0);
    }
    if (!palette.Muted && palette.Vibrant) {
        var _g = palette.Vibrant.hsl, h = _g[0], s = _g[1], l = _g[2];
        l = opts.targetMutesSaturation;
        palette.Muted = new color_1.Swatch(converter_1.hslToRgb(h, s, l), 0);
    }
    if (!palette.DarkMuted && palette.DarkVibrant) {
        var _h = palette.DarkVibrant.hsl, h = _h[0], s = _h[1], l = _h[2];
        l = opts.targetMutesSaturation;
        palette.DarkMuted = new color_1.Swatch(converter_1.hslToRgb(h, s, l), 0);
    }
    if (!palette.LightMuted && palette.LightVibrant) {
        var _j = palette.LightVibrant.hsl, h = _j[0], s = _j[1], l = _j[2];
        l = opts.targetMutesSaturation;
        palette.LightMuted = new color_1.Swatch(converter_1.hslToRgb(h, s, l), 0);
    }
}
var DefaultGenerator = function (swatches, opts) {
    opts = Object.assign({}, DefaultOpts, opts);
    var maxPopulation = _findMaxPopulation(swatches);
    var palette = _generateVariationColors(swatches, maxPopulation, opts);
    _generateEmptySwatches(palette, maxPopulation, opts);
    return palette;
};
exports.default = DefaultGenerator;
//# sourceMappingURL=index.js.map