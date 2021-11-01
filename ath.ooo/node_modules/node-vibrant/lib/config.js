"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = __importDefault(require("@vibrant/core"));
core_1.default.DefaultOpts.quantizer = 'mmcq';
core_1.default.DefaultOpts.generators = ['default'];
core_1.default.DefaultOpts.filters = ['default'];
exports.default = core_1.default;
//# sourceMappingURL=config.js.map