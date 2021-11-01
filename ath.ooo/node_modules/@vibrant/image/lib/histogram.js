"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Histogram = /** @class */ (function () {
    function Histogram(pixels, opts) {
        this.pixels = pixels;
        this.opts = opts;
        var sigBits = opts.sigBits;
        var getColorIndex = function (r, g, b) {
            return (r << (2 * sigBits)) + (g << sigBits) + b;
        };
        this.getColorIndex = getColorIndex;
        var rshift = 8 - sigBits;
        var hn = 1 << (3 * sigBits);
        var hist = new Uint32Array(hn);
        var rmax;
        var rmin;
        var gmax;
        var gmin;
        var bmax;
        var bmin;
        var r;
        var g;
        var b;
        var a;
        rmax = gmax = bmax = 0;
        rmin = gmin = bmin = Number.MAX_VALUE;
        var n = pixels.length / 4;
        var i = 0;
        while (i < n) {
            var offset = i * 4;
            i++;
            r = pixels[offset + 0];
            g = pixels[offset + 1];
            b = pixels[offset + 2];
            a = pixels[offset + 3];
            // Ignored pixels' alpha is marked as 0 in filtering stage
            if (a === 0)
                continue;
            r = r >> rshift;
            g = g >> rshift;
            b = b >> rshift;
            var index = getColorIndex(r, g, b);
            hist[index] += 1;
            if (r > rmax)
                rmax = r;
            if (r < rmin)
                rmin = r;
            if (g > gmax)
                gmax = g;
            if (g < gmin)
                gmin = g;
            if (b > bmax)
                bmax = b;
            if (b < bmin)
                bmin = b;
        }
        this._colorCount = hist.reduce(function (total, c) { return c > 0 ? total + 1 : total; }, 0);
        this.hist = hist;
        this.rmax = rmax;
        this.rmin = rmin;
        this.gmax = gmax;
        this.gmin = gmin;
        this.bmax = bmax;
        this.bmin = bmin;
    }
    Object.defineProperty(Histogram.prototype, "colorCount", {
        get: function () { return this._colorCount; },
        enumerable: false,
        configurable: true
    });
    return Histogram;
}());
exports.default = Histogram;
//# sourceMappingURL=histogram.js.map