"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defer = exports.Defer = void 0;
var Defer = /** @class */ (function () {
    function Defer() {
        var _this = this;
        this.promise = new Promise(function (_resolve, _reject) {
            _this.resolve = _resolve;
            _this.reject = _reject;
        });
    }
    return Defer;
}());
exports.Defer = Defer;
function defer() {
    return new Defer();
}
exports.defer = defer;
//# sourceMappingURL=index.js.map