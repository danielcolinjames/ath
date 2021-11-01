"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var config_1 = __importDefault(require("./config"));
var image_browser_1 = __importDefault(require("@vibrant/image-browser"));
config_1.default.DefaultOpts.ImageClass = image_browser_1.default;
module.exports = config_1.default;
//# sourceMappingURL=browser.js.map