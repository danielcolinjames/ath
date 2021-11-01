"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var options_1 = require("./options");
var builder_1 = __importDefault(require("./builder"));
var utils_1 = require("./utils");
var Vibrant = /** @class */ (function () {
    function Vibrant(_src, opts) {
        this._src = _src;
        this.opts = utils_1.assignDeep({}, Vibrant.DefaultOpts, opts);
    }
    Vibrant.use = function (pipeline) {
        this._pipeline = pipeline;
    };
    Vibrant.from = function (src) {
        return new builder_1.default(src);
    };
    Object.defineProperty(Vibrant.prototype, "result", {
        get: function () {
            return this._result;
        },
        enumerable: false,
        configurable: true
    });
    Vibrant.prototype._process = function (image, opts) {
        var quantizer = this.opts.quantizer;
        image.scaleDown(this.opts);
        var processOpts = options_1.buildProcessOptions(this.opts, opts);
        return Vibrant._pipeline.process(image.getImageData(), processOpts);
    };
    Vibrant.prototype.palette = function () {
        return this.swatches();
    };
    Vibrant.prototype.swatches = function () {
        throw new Error('Method deprecated. Use `Vibrant.result.palettes[name]` instead');
    };
    Vibrant.prototype.getPalette = function () {
        var _this = this;
        var arg0 = arguments[0];
        var arg1 = arguments[1];
        var name = typeof arg0 === 'string' ? arg0 : 'default';
        var cb = typeof arg0 === 'string' ? arg1 : arg0;
        var image = new this.opts.ImageClass();
        return image
            .load(this._src)
            .then(function (image) { return _this._process(image, { generators: [name] }); })
            .then(function (result) {
            _this._result = result;
            return result.palettes[name];
        })
            .then(function (res) {
            image.remove();
            if (cb) {
                cb(undefined, res);
            }
            return res;
        })
            .catch(function (err) {
            image.remove();
            if (cb) {
                cb(err);
            }
            return Promise.reject(err);
        });
    };
    Vibrant.prototype.getPalettes = function () {
        var _this = this;
        var arg0 = arguments[0];
        var arg1 = arguments[1];
        var names = Array.isArray(arg0) ? arg0 : ['*'];
        var cb = Array.isArray(arg0) ? arg1 : arg0;
        var image = new this.opts.ImageClass();
        return image
            .load(this._src)
            .then(function (image) {
            return _this._process(image, {
                generators: names
            });
        })
            .then(function (result) {
            _this._result = result;
            return result.palettes;
        })
            .then(function (res) {
            image.remove();
            if (cb) {
                cb(undefined, res);
            }
            return res;
        })
            .catch(function (err) {
            image.remove();
            if (cb) {
                cb(err);
            }
            return Promise.reject(err);
        });
    };
    Vibrant.DefaultOpts = {
        colorCount: 64,
        quality: 5,
        filters: []
    };
    return Vibrant;
}());
exports.default = Vibrant;
//# sourceMappingURL=index.js.map