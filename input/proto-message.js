"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProtoMessage = void 0;
var proto_enum_1 = require("./proto-enum");
var proto_message_field_1 = require("./proto-message-field");
var proto_oneof_1 = require("./proto-oneof");
var ProtoMessage = /** @class */ (function () {
    function ProtoMessage(value) {
        this.name = value.name;
        this.fieldList = (value.fieldList || []).map(function (mf) { return new proto_message_field_1.ProtoMessageField(mf || {}); });
        this.extensionList = value.extensionList;
        this.nestedTypeList = value.nestedTypeList.map(function (t) { return new ProtoMessage(t); });
        this.enumTypeList = value.enumTypeList.map(function (e) { return new proto_enum_1.ProtoEnum(e); });
        this.extensionRangeList = value.extensionRangeList;
        this.oneofDeclList = (value.oneofDeclList || []).map(function (d) { return new proto_oneof_1.ProtoOneof(d); });
        this.reservedRangeList = value.reservedRangeList;
        this.reservedNameList = value.reservedNameList;
        this.id = value.id;
        this.options = value.options || {};
    }
    return ProtoMessage;
}());
exports.ProtoMessage = ProtoMessage;
//# sourceMappingURL=proto-message.js.map