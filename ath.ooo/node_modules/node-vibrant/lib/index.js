"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var config_1 = __importDefault(require("./config"));
var image_node_1 = __importDefault(require("@vibrant/image-node"));
var pipeline_1 = __importDefault(require("./pipeline"));
config_1.default.DefaultOpts.ImageClass = image_node_1.default;
config_1.default.use(pipeline_1.default);
module.exports = config_1.default;
//# sourceMappingURL=index.js.map