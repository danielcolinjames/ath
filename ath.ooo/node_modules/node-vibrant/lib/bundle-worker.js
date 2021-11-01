"use strict";
var Vibrant = require("./browser");
var client_1 = require("@vibrant/core/lib/pipeline/worker/client");
var PipelineWorker = require('./pipeline/index.worker');
Vibrant.use(new client_1.WorkerPipeline(PipelineWorker));
module.exports = Vibrant;
//# sourceMappingURL=bundle-worker.js.map