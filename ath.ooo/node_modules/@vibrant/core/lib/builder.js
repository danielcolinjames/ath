"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = __importDefault(require("./"));
var utils_1 = require("./utils");
var Builder = /** @class */ (function () {
    function Builder(src, opts) {
        if (opts === void 0) { opts = {}; }
        this._src = src;
        this._opts = utils_1.assignDeep({}, _1.default.DefaultOpts, opts);
    }
    Builder.prototype.maxColorCount = function (n) {
        this._opts.colorCount = n;
        return this;
    };
    Builder.prototype.maxDimension = function (d) {
        this._opts.maxDimension = d;
        return this;
    };
    Builder.prototype.addFilter = function (name) {
        if (!this._opts.filters) {
            this._opts.filters = [name];
        }
        else {
            this._opts.filters.push(name);
        }
        return this;
    };
    Builder.prototype.removeFilter = function (name) {
        if (this._opts.filters) {
            var i = this._opts.filters.indexOf(name);
            if (i > 0)
                this._opts.filters.splice(i);
        }
        return this;
    };
    Builder.prototype.clearFilters = function () {
        this._opts.filters = [];
        return this;
    };
    Builder.prototype.quality = function (q) {
        this._opts.quality = q;
        return this;
    };
    Builder.prototype.useImageClass = function (imageClass) {
        this._opts.ImageClass = imageClass;
        return this;
    };
    Builder.prototype.useGenerator = function (generator, options) {
        if (!this._opts.generators)
            this._opts.generators = [];
        this._opts.generators.push(options ? { name: generator, options: options } : generator);
        return this;
    };
    Builder.prototype.useQuantizer = function (quantizer, options) {
        this._opts.quantizer = options ? { name: quantizer, options: options } : quantizer;
        return this;
    };
    Builder.prototype.build = function () {
        return new _1.default(this._src, this._opts);
    };
    Builder.prototype.getPalette = function (cb) {
        return this.build().getPalette(cb);
    };
    Builder.prototype.getSwatches = function (cb) {
        return this.build().getPalette(cb);
    };
    return Builder;
}());
exports.default = Builder;
//# sourceMappingURL=builder.js.map