"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyFilters = exports.ImageBase = void 0;
var ImageBase = /** @class */ (function () {
    function ImageBase() {
    }
    ImageBase.prototype.scaleDown = function (opts) {
        var width = this.getWidth();
        var height = this.getHeight();
        var ratio = 1;
        if (opts.maxDimension > 0) {
            var maxSide = Math.max(width, height);
            if (maxSide > opts.maxDimension)
                ratio = opts.maxDimension / maxSide;
        }
        else {
            ratio = 1 / opts.quality;
        }
        if (ratio < 1)
            this.resize(width * ratio, height * ratio, ratio);
    };
    return ImageBase;
}());
exports.ImageBase = ImageBase;
function applyFilters(imageData, filters) {
    if (filters.length > 0) {
        var pixels = imageData.data;
        var n = pixels.length / 4;
        var offset = void 0;
        var r = void 0;
        var g = void 0;
        var b = void 0;
        var a = void 0;
        for (var i = 0; i < n; i++) {
            offset = i * 4;
            r = pixels[offset + 0];
            g = pixels[offset + 1];
            b = pixels[offset + 2];
            a = pixels[offset + 3];
            // Mark ignored color
            for (var j = 0; j < filters.length; j++) {
                if (!filters[j](r, g, b, a)) {
                    pixels[offset + 3] = 0;
                    break;
                }
            }
        }
    }
    return imageData;
}
exports.applyFilters = applyFilters;
//# sourceMappingURL=index.js.map