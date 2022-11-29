"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtoService = void 0;
var proto_service_method_1 = require("./proto-service-method");
var ProtoService = /** @class */ (function () {
    function ProtoService(value) {
        this.name = value.name;
        this.methodList = (value.methodList || []).map(function (m) { return new proto_service_method_1.ServiceMethod(m); });
    }
    return ProtoService;
}());
exports.ProtoService = ProtoService;
//# sourceMappingURL=proto-service.js.map