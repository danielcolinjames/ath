"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var pool_1 = __importDefault(require("./pool"));
var WorkerManager = /** @class */ (function () {
    function WorkerManager() {
        this._pools = {};
    }
    WorkerManager.prototype.register = function (name, WorkerClass) {
        this._pools[name] = new pool_1.default(WorkerClass);
    };
    WorkerManager.prototype.hasWorker = function (name) {
        return !!this._pools[name];
    };
    WorkerManager.prototype.getWorker = function (name) {
        return this._pools[name];
    };
    WorkerManager.prototype.invokeWorker = function (name, args, transferList) {
        return this.hasWorker(name)
            ? this.getWorker(name).invoke(args, transferList)
            : Promise.reject("Worker '" + name + "' does not exist");
    };
    return WorkerManager;
}());
exports.default = WorkerManager;
//# sourceMappingURL=index.js.map