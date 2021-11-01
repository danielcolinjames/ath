"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var quantizer_mmcq_1 = __importDefault(require("@vibrant/quantizer-mmcq"));
var generator_default_1 = __importDefault(require("@vibrant/generator-default"));
var pipeline_1 = require("@vibrant/core/lib/pipeline");
var pipeline = new pipeline_1.BasicPipeline()
    .filter.register('default', function (r, g, b, a) {
    return a >= 125
        && !(r > 250 && g > 250 && b > 250);
})
    .quantizer.register('mmcq', quantizer_mmcq_1.default)
    .generator.register('default', generator_default_1.default);
exports.default = pipeline;
//# sourceMappingURL=index.js.map