"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildProcessOptions = void 0;
var utils_1 = require("./utils");
function buildProcessOptions(opts, override) {
    var colorCount = opts.colorCount, quantizer = opts.quantizer, generators = opts.generators, filters = opts.filters;
    // Merge with common quantizer options
    var commonQuantizerOpts = { colorCount: colorCount };
    var q = typeof quantizer === 'string'
        ? { name: quantizer, options: {} }
        : quantizer;
    q.options = utils_1.assignDeep({}, commonQuantizerOpts, q.options);
    return utils_1.assignDeep({}, {
        quantizer: q,
        generators: generators,
        filters: filters
    }, override);
}
exports.buildProcessOptions = buildProcessOptions;
//# sourceMappingURL=options.js.map