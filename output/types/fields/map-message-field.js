"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapMessageField = void 0;
var tslib_1 = require("tslib");
var types_1 = require("../../../input/types");
var helpers_1 = require("../../misc/helpers");
var abstract_message_field_1 = require("./abstract-message-field");
var MapMessageField = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(MapMessageField, _super);
    function MapMessageField(proto, message, messageField, oneOf) {
        var _a;
        var _this = _super.call(this, proto, message, messageField, oneOf) || this;
        _this.proto = proto;
        _this.message = message;
        _this.messageField = messageField;
        _this.oneOf = oneOf;
        _a = (0, tslib_1.__read)((0, helpers_1.getMapKeyValueFields)(_this.proto, _this.messageField), 2), _this.keyField = _a[0], _this.valueField = _a[1];
        _this.mapMessageClassName = _this.proto.getRelativeTypeName(_this.messageField.typeName);
        return _this;
    }
    MapMessageField.prototype.printDeserializeBinaryFromReader = function (printer) {
        var msgVarName = "msg_".concat(this.messageField.number);
        var isStringKey = this.keyField.type === types_1.ProtoMessageFieldType.string || (0, helpers_1.isNumberString)(this.keyField);
        var castedKey = isStringKey ? "".concat(msgVarName, ".key") : "Number(".concat(msgVarName, ".key)");
        printer.add("case ".concat(this.messageField.number, ":\n        const ").concat(msgVarName, " = {} as any;\n        _reader.readMessage(").concat(msgVarName, ", ").concat(this.mapMessageClassName, ".deserializeBinaryFromReader);\n        _instance.").concat(this.attributeName, " = _instance.").concat(this.attributeName, " || {};\n        _instance.").concat(this.attributeName, "[").concat(castedKey, "] = ").concat(msgVarName, ".value;\n        break;"));
    };
    MapMessageField.prototype.printSerializeBinaryToWriter = function (printer) {
        var varName = "_instance.".concat(this.attributeName);
        var keysVarName = "keys_".concat(this.messageField.number);
        var repeatedVarName = "repeated_".concat(this.messageField.number);
        var isStringKey = this.keyField.type === types_1.ProtoMessageFieldType.string || (0, helpers_1.isNumberString)(this.keyField);
        var castedKey = isStringKey ? 'key' : 'Number(key)';
        printer.add("if (!!".concat(varName, ") {\n      const ").concat(keysVarName, " = Object.keys(").concat(varName, " as any);\n\n      if (").concat(keysVarName, ".length) {\n        const ").concat(repeatedVarName, " = ").concat(keysVarName, "\n          .map(key => ({ key: ").concat(castedKey, ", value: (").concat(varName, " as any)[key] }))\n          .reduce((r, v) => [...r, v], [] as any[]);\n\n        _writer.writeRepeatedMessage(").concat(this.messageField.number, ", ").concat(repeatedVarName, ", ").concat(this.mapMessageClassName, ".serializeBinaryToWriter);\n      }\n    }"));
    };
    MapMessageField.prototype.printInitializer = function (printer) {
        var cloneFn = "_value!.".concat(this.attributeName, "![k]");
        if ((0, helpers_1.isFieldMessage)(this.valueField)) {
            cloneFn = "_value!.".concat(this.attributeName, "![k] ? new ").concat((0, helpers_1.getDataType)(this.proto, this.valueField), "(_value!.").concat(this.attributeName, "![k]) : undefined,");
        }
        else if (this.valueField.type === types_1.ProtoMessageFieldType.bytes) {
            cloneFn = "_value!.".concat(this.attributeName, "![k] ? _value!.").concat(this.attributeName, "![k].subarray(0) : undefined");
        }
        printer.add("this.".concat(this.attributeName, " = _value!.").concat(this.attributeName, " ? Object.keys(_value!.").concat(this.attributeName, ").reduce((r, k) => ({ ...r, [k]: ").concat(cloneFn, " }), {}) : {},"));
    };
    MapMessageField.prototype.printDefaultValueSetter = function (printer) {
        if (this.oneOf) {
            return;
        }
        else {
            printer.add("_instance.".concat(this.attributeName, " = _instance.").concat(this.attributeName, " || {}"));
        }
    };
    MapMessageField.prototype.printToObjectMapping = function (printer) {
        var cloneFn = "this.".concat(this.attributeName, "![k]");
        if ((0, helpers_1.isFieldMessage)(this.valueField)) {
            cloneFn = "this.".concat(this.attributeName, "![k] ? this.").concat(this.attributeName, "![k].toObject() : undefined");
        }
        else if (this.valueField.type === types_1.ProtoMessageFieldType.bytes) {
            cloneFn = "this.".concat(this.attributeName, "![k] ? this.").concat(this.attributeName, "![k].subarray(0) : undefined");
        }
        printer.add("".concat(this.attributeName, ": this.").concat(this.attributeName, " ? Object.keys(this.").concat(this.attributeName, ").reduce((r, k) => ({ ...r, [k]: ").concat(cloneFn, " }), {}) : {},"));
    };
    MapMessageField.prototype.printToProtobufJSONMapping = function (printer) {
        var cloneFn = "this.".concat(this.attributeName, "![k]");
        if ((0, helpers_1.isFieldMessage)(this.valueField)) {
            cloneFn = "this.".concat(this.attributeName, "![k] ? this.").concat(this.attributeName, "![k].toJSON() : null");
        }
        else if (this.valueField.type === types_1.ProtoMessageFieldType.bytes) {
            cloneFn = "this.".concat(this.attributeName, "![k] ? this.").concat(this.attributeName, "![k].subarray(0) : null");
        }
        printer.add("".concat(this.attributeName, ": this.").concat(this.attributeName, " ? Object.keys(this.").concat(this.attributeName, ").reduce((r, k) => ({ ...r, [k]: ").concat(cloneFn, " }), {}) : {},"));
    };
    MapMessageField.prototype.printAsJSONMapping = function (printer) {
        printer.add("".concat(this.attributeName, ": ").concat(this.dataType, ";"));
    };
    return MapMessageField;
}(abstract_message_field_1.AbstractMessageField));
exports.MapMessageField = MapMessageField;
//# sourceMappingURL=map-message-field.js.map