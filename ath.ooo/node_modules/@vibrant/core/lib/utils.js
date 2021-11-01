"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.assignDeep = exports.mapValues = void 0;
function mapValues(o, mapper) {
    var result = {};
    for (var key in o) {
        if (o.hasOwnProperty(key)) {
            var v = o[key];
            result[key] = mapper(v);
        }
    }
    return result;
}
exports.mapValues = mapValues;
/**
 * Overwrite values or properties on objects and lists recursively.
 * A shallow copy will be created for each array value.
 */
function assignDeep(target) {
    var sources = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        sources[_i - 1] = arguments[_i];
    }
    sources.forEach(function (s) {
        if (!s)
            return;
        for (var key in s) {
            if (s.hasOwnProperty(key)) {
                var v = s[key];
                if (Array.isArray(v)) {
                    // Shallow copy
                    target[key] = v.slice(0);
                }
                else if (typeof v === 'object') {
                    if (!target[key])
                        target[key] = {};
                    assignDeep(target[key], v);
                }
                else {
                    target[key] = v;
                }
            }
        }
    });
    return target;
}
exports.assignDeep = assignDeep;
//# sourceMappingURL=utils.js.map