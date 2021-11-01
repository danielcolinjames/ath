"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkerPipeline = void 0;
var worker_1 = __importDefault(require("@vibrant/worker"));
var color_1 = require("@vibrant/color");
var utils_1 = require("../../utils");
/**
 * Client side (runs in UI thread)
 */
var WorkerPipeline = /** @class */ (function () {
    function WorkerPipeline(PipelineWorker) {
        this.PipelineWorker = PipelineWorker;
        this._manager = new worker_1.default();
        this._manager.register('pipeline', PipelineWorker);
    }
    WorkerPipeline.prototype._rehydrate = function (result) {
        var colors = result.colors, palettes = result.palettes;
        result.colors = colors.map(function (s) { return color_1.Swatch.clone(s); });
        result.palettes = utils_1.mapValues(palettes, function (p) { return utils_1.mapValues(p, function (c) { return c ? color_1.Swatch.clone(c) : null; }); });
        return result;
    };
    WorkerPipeline.prototype.process = function (imageData, opts) {
        var _this = this;
        return this._manager.invokeWorker('pipeline', [imageData, opts], [imageData.data.buffer])
            .then(function (result) { return _this._rehydrate(result); });
    };
    return WorkerPipeline;
}());
exports.WorkerPipeline = WorkerPipeline;
//# sourceMappingURL=client.js.map