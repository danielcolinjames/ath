"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasicPipeline = exports.Stage = void 0;
var image_1 = require("@vibrant/image");
var Stage = /** @class */ (function () {
    function Stage(pipeline) {
        this.pipeline = pipeline;
        this._map = {};
    }
    Stage.prototype.names = function () {
        return Object.keys(this._map);
    };
    Stage.prototype.has = function (name) {
        return !!this._map[name];
    };
    Stage.prototype.get = function (name) {
        return this._map[name];
    };
    Stage.prototype.register = function (name, stageFn) {
        this._map[name] = stageFn;
        return this.pipeline;
    };
    return Stage;
}());
exports.Stage = Stage;
var BasicPipeline = /** @class */ (function () {
    function BasicPipeline() {
        this.filter = new Stage(this);
        this.quantizer = new Stage(this);
        this.generator = new Stage(this);
    }
    BasicPipeline.prototype._buildProcessTasks = function (_a) {
        var _this = this;
        var filters = _a.filters, quantizer = _a.quantizer, generators = _a.generators;
        // Support wildcard for generators
        if (generators.length === 1 && generators[0] === '*') {
            generators = this.generator.names();
        }
        return {
            filters: filters.map(function (f) { return createTask(_this.filter, f); }),
            quantizer: createTask(this.quantizer, quantizer),
            generators: generators.map(function (g) { return createTask(_this.generator, g); })
        };
        function createTask(stage, o) {
            var name;
            var options;
            if (typeof o === 'string') {
                name = o;
            }
            else {
                name = o.name;
                options = o.options;
            }
            return {
                name: name,
                fn: stage.get(name),
                options: options
            };
        }
    };
    BasicPipeline.prototype.process = function (imageData, opts) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, filters, quantizer, generators, imageFilterData, colors, palettes;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this._buildProcessTasks(opts), filters = _a.filters, quantizer = _a.quantizer, generators = _a.generators;
                        return [4 /*yield*/, this._filterColors(filters, imageData)];
                    case 1:
                        imageFilterData = _b.sent();
                        return [4 /*yield*/, this._generateColors(quantizer, imageFilterData)];
                    case 2:
                        colors = _b.sent();
                        return [4 /*yield*/, this._generatePalettes(generators, colors)];
                    case 3:
                        palettes = _b.sent();
                        return [2 /*return*/, {
                                colors: colors,
                                palettes: palettes
                            }];
                }
            });
        });
    };
    BasicPipeline.prototype._filterColors = function (filters, imageData) {
        return Promise.resolve(image_1.applyFilters(imageData, filters.map(function (_a) {
            var fn = _a.fn;
            return fn;
        })));
    };
    BasicPipeline.prototype._generateColors = function (quantizer, imageData) {
        return Promise.resolve(quantizer.fn(imageData.data, quantizer.options));
    };
    BasicPipeline.prototype._generatePalettes = function (generators, colors) {
        return __awaiter(this, void 0, void 0, function () {
            var promiseArr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(generators.map(function (_a) {
                            var fn = _a.fn, options = _a.options;
                            return Promise.resolve(fn(colors, options));
                        }))
                        // Map the values to the expected name
                    ];
                    case 1:
                        promiseArr = _a.sent();
                        // Map the values to the expected name
                        return [2 /*return*/, Promise.resolve(promiseArr.reduce(function (promises, promiseVal, i) {
                                promises[generators[i].name] = promiseVal;
                                return promises;
                            }, {}))];
                }
            });
        });
    };
    return BasicPipeline;
}());
exports.BasicPipeline = BasicPipeline;
//# sourceMappingURL=index.js.map