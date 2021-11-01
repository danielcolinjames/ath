"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var worker_1 = __importDefault(require("@vibrant/worker/lib/worker"));
function runPipelineInWorker(self, pipeline) {
    worker_1.default(self, function (imageData, opts) {
        return pipeline.process(imageData, opts);
    });
}
exports.default = runPipelineInWorker;
//# sourceMappingURL=host.js.map