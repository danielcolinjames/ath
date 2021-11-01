"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function runInWorker(self, fn) {
    self.onmessage = function (event) {
        var data = event.data;
        var id = data.id, payload = data.payload;
        var response;
        Promise.resolve(fn.apply(void 0, payload))
            .then(function (ret) {
            self.postMessage({
                id: id,
                type: 'return',
                payload: ret
            });
        })
            .catch(function (e) {
            self.postMessage({
                id: id,
                type: 'error',
                payload: e.message
            });
        });
    };
}
exports.default = runInWorker;
//# sourceMappingURL=worker.js.map