"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Swatch = void 0;
var converter_1 = require("./converter");
var Swatch = /** @class */ (function () {
    function Swatch(rgb, population) {
        this._rgb = rgb;
        this._population = population;
    }
    Swatch.applyFilters = function (colors, filters) {
        return filters.length > 0
            ? colors.filter(function (_a) {
                var r = _a.r, g = _a.g, b = _a.b;
                for (var j = 0; j < filters.length; j++) {
                    if (!filters[j](r, g, b, 255))
                        return false;
                }
                return true;
            })
            : colors;
    };
    /**
     * Make a value copy of a swatch based on a previous one. Returns a new Swatch instance
     * @param {Swatch} swatch
     */
    Swatch.clone = function (swatch) {
        return new Swatch(swatch._rgb, swatch._population);
    };
    Object.defineProperty(Swatch.prototype, "r", {
        /**
         * The red value in the RGB value
         */
        get: function () {
            return this._rgb[0];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Swatch.prototype, "g", {
        /**
         * The green value in the RGB value
         */
        get: function () {
            return this._rgb[1];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Swatch.prototype, "b", {
        /**
         * The blue value in the RGB value
         */
        get: function () {
            return this._rgb[2];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Swatch.prototype, "rgb", {
        /**
         * The color value as a rgb value
         */
        get: function () {
            return this._rgb;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Swatch.prototype, "hsl", {
        /**
         * The color value as a hsl value
         */
        get: function () {
            if (!this._hsl) {
                var _a = this._rgb, r = _a[0], g = _a[1], b = _a[2];
                this._hsl = converter_1.rgbToHsl(r, g, b);
            }
            return this._hsl;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Swatch.prototype, "hex", {
        /**
         * The color value as a hex string
         */
        get: function () {
            if (!this._hex) {
                var _a = this._rgb, r = _a[0], g = _a[1], b = _a[2];
                this._hex = converter_1.rgbToHex(r, g, b);
            }
            return this._hex;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Swatch.prototype, "population", {
        get: function () {
            return this._population;
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Get the JSON object for the swatch
     */
    Swatch.prototype.toJSON = function () {
        return {
            rgb: this.rgb,
            population: this.population
        };
    };
    /**
     * Get the color value as a rgb value
     * @deprecated Use property instead
     */
    // TODO: deprecate internally, use property instead
    Swatch.prototype.getRgb = function () {
        return this._rgb;
    };
    /**
     * Get the color value as a hsl value
     * @deprecated Use property instead
     */
    // TODO: deprecate internally, use property instead
    Swatch.prototype.getHsl = function () {
        return this.hsl;
    };
    /**
     * @deprecated Use property instead
     */
    // TODO: deprecate internally, use property instead
    Swatch.prototype.getPopulation = function () {
        return this._population;
    };
    /**
     * Get the color value as a hex string
     * @deprecated Use property instead
     */
    // TODO: deprecate internally, use property instead
    Swatch.prototype.getHex = function () {
        return this.hex;
    };
    Swatch.prototype.getYiq = function () {
        if (!this._yiq) {
            var rgb = this._rgb;
            this._yiq = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
        }
        return this._yiq;
    };
    Object.defineProperty(Swatch.prototype, "titleTextColor", {
        get: function () {
            if (this._titleTextColor) {
                this._titleTextColor = this.getYiq() < 200 ? '#fff' : '#000';
            }
            return this._titleTextColor;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Swatch.prototype, "bodyTextColor", {
        get: function () {
            if (this._bodyTextColor) {
                this._bodyTextColor = this.getYiq() < 150 ? '#fff' : '#000';
            }
            return this._bodyTextColor;
        },
        enumerable: false,
        configurable: true
    });
    Swatch.prototype.getTitleTextColor = function () {
        return this.titleTextColor;
    };
    Swatch.prototype.getBodyTextColor = function () {
        return this.bodyTextColor;
    };
    return Swatch;
}());
exports.Swatch = Swatch;
//# sourceMappingURL=index.js.map