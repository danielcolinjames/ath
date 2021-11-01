"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var types_1 = require("@vibrant/types");
// const WorkerClass: TaskWorkerClass = require('worker-loader?inline=true!./worker')
var MAX_WORKER_COUNT = 5;
var WorkerPool = /** @class */ (function () {
    function WorkerPool(WorkerClass) {
        this.WorkerClass = WorkerClass;
        this._taskId = 0;
        this._workers = [];
        this._queue = [];
        this._executing = {};
    }
    WorkerPool.prototype._findIdleWorker = function () {
        var worker;
        // if no idle worker && worker count < max count, make new one
        if (this._workers.length === 0 || this._workers.length < MAX_WORKER_COUNT) {
            worker = new this.WorkerClass();
            worker.id = this._workers.length;
            worker.idle = true;
            this._workers.push(worker);
            worker.onmessage = this._onMessage.bind(this, worker.id);
        }
        else {
            worker = this._workers.find(function (_a) {
                var idle = _a.idle;
                return idle;
            });
        }
        return worker;
    };
    WorkerPool.prototype._enqueue = function (payload, transferList) {
        var d = types_1.defer();
        // make task item
        var task = {
            id: this._taskId++,
            payload: payload,
            transferList: transferList,
            deferred: d
        };
        this._queue.push(task);
        // Try dequeue
        this._tryDequeue();
        return d.promise;
    };
    WorkerPool.prototype._tryDequeue = function () {
        // Called when a work has finished or from _enqueue
        // No pending task
        if (this._queue.length <= 0)
            return;
        // Find idle worker
        var worker = this._findIdleWorker();
        // No idle worker
        if (!worker)
            return;
        // Dequeue task
        var task = this._queue.shift();
        this._executing[task.id] = task;
        // Send payload
        var transfers = task.transferList;
        var deferred = task.deferred, transferList = task.transferList, request = __rest(task, ["deferred", "transferList"]);
        worker.postMessage(request, transfers);
        worker.idle = false;
    };
    WorkerPool.prototype._onMessage = function (workerId, event) {
        var data = event.data;
        if (!data)
            return;
        // Worker should send result along with payload id
        var id = data.id;
        // Task is looked up by id
        var task = this._executing[id];
        delete this._executing[id];
        // Resolve or reject deferred promise
        switch (data.type) {
            case 'return':
                task.deferred.resolve(data.payload);
                break;
            case 'error':
                task.deferred.reject(new Error(data.payload));
                break;
        }
        // Update worker status
        this._workers[workerId].idle = true;
        // Try dequeue next task
        this._tryDequeue();
    };
    WorkerPool.prototype.invoke = function (args, transferList) {
        return this._enqueue(args, transferList);
    };
    return WorkerPool;
}());
exports.default = WorkerPool;
//# sourceMappingURL=pool.js.map