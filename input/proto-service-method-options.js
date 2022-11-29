"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtoServiceMethodOptions = void 0;
var ProtoServiceMethodOptions = /** @class */ (function () {
    function ProtoServiceMethodOptions(value) {
        this.deprecated = value.deprecated;
        this.idempotencyLevel = value.idempotencyLevel;
        this.uninterpretedOptionList = value.uninterpretedOptionList || [];
    }
    return ProtoServiceMethodOptions;
}());
exports.ProtoServiceMethodOptions = ProtoServiceMethodOptions;
//# sourceMappingURL=proto-service-method-options.js.map