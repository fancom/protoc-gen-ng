"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtoMessageField = void 0;
var ProtoMessageField = /** @class */ (function () {
    function ProtoMessageField(value) {
        this.name = value.name;
        this.number = value.number;
        this.label = value.label;
        this.type = value.type;
        this.typeName = value.typeName;
        this.jsonName = value.jsonName;
        this.oneofIndex = value.oneofIndex;
        this.options = value.options || {};
        this.proto3Optional = value.proto3Optional;
    }
    return ProtoMessageField;
}());
exports.ProtoMessageField = ProtoMessageField;
//# sourceMappingURL=proto-message-field.js.map