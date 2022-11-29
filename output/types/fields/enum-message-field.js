"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnumMessageField = void 0;
var tslib_1 = require("tslib");
var types_1 = require("../../../input/types");
var helpers_1 = require("../../misc/helpers");
var abstract_message_field_1 = require("./abstract-message-field");
var EnumMessageField = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(EnumMessageField, _super);
    function EnumMessageField(proto, message, messageField, oneOf) {
        var _this = _super.call(this, proto, message, messageField, oneOf) || this;
        _this.proto = proto;
        _this.message = message;
        _this.messageField = messageField;
        _this.oneOf = oneOf;
        _this.isArray =
            _this.messageField.label === types_1.ProtoMessageFieldCardinality.repeated;
        _this.isPacked = (0, helpers_1.isPacked)(_this.proto, _this.messageField);
        _this.notRepeatedDataType = (0, helpers_1.getDataType)(_this.proto, _this.messageField, {
            ignoreRepeating: true,
        });
        return _this;
    }
    EnumMessageField.prototype.printDeserializeBinaryFromReader = function (printer) {
        if (this.isPacked) {
            printer.add("case ".concat(this.messageField.number, ": (_instance.").concat(this.attributeName, " = _instance.").concat(this.attributeName, " || []).push(...(_reader.readPackedEnum() || []));"));
        }
        else if (this.isArray) {
            printer.add("case ".concat(this.messageField.number, ": (_instance.").concat(this.attributeName, " = _instance.").concat(this.attributeName, " || []).push(_reader.readEnum());"));
        }
        else {
            printer.add("case ".concat(this.messageField.number, ": _instance.").concat(this.attributeName, " = _reader.readEnum();"));
        }
        printer.add('break;');
    };
    EnumMessageField.prototype.printSerializeBinaryToWriter = function (printer) {
        if (this.isPacked) {
            printer.add("if (_instance.".concat(this.attributeName, " && _instance.").concat(this.attributeName, ".length) {\n        _writer.writePackedEnum(").concat(this.messageField.number, ", _instance.").concat(this.attributeName, ");\n      }"));
        }
        else if (this.isArray) {
            printer.add("if (_instance.".concat(this.attributeName, " && _instance.").concat(this.attributeName, ".length) {\n        _writer.writeRepeatedEnum(").concat(this.messageField.number, ", _instance.").concat(this.attributeName, ");\n      }"));
        }
        else if (this.oneOf) {
            printer.add("if (_instance.".concat(this.attributeName, " || _instance.").concat(this.attributeName, " === 0) {\n        _writer.writeEnum(").concat(this.messageField.number, ", _instance.").concat(this.attributeName, ");\n      }"));
        }
        else if (this.messageField.proto3Optional) {
            printer.add("if (_instance.".concat(this.attributeName, " !== undefined && _instance.").concat(this.attributeName, " !== null) {\n        _writer.writeEnum(").concat(this.messageField.number, ", _instance.").concat(this.attributeName, ");\n      }"));
        }
        else {
            printer.add("if (_instance.".concat(this.attributeName, ") {\n        _writer.writeEnum(").concat(this.messageField.number, ", _instance.").concat(this.attributeName, ");\n      }"));
        }
    };
    EnumMessageField.prototype.printInitializer = function (printer) {
        if (this.isArray) {
            printer.add("this.".concat(this.attributeName, " = (_value.").concat(this.attributeName, " || []).slice();"));
        }
        else {
            printer.add("this.".concat(this.attributeName, " = _value.").concat(this.attributeName));
        }
    };
    EnumMessageField.prototype.printDefaultValueSetter = function (printer) {
        if (this.oneOf || this.messageField.proto3Optional) {
            return;
        }
        else if (this.isArray) {
            printer.add("_instance.".concat(this.attributeName, " = _instance.").concat(this.attributeName, " || []"));
        }
        else {
            printer.add("_instance.".concat(this.attributeName, " = _instance.").concat(this.attributeName, " || 0"));
        }
    };
    EnumMessageField.prototype.printToObjectMapping = function (printer) {
        if (this.isArray) {
            printer.add("".concat(this.attributeName, ": (this.").concat(this.attributeName, " || []).slice(),"));
        }
        else {
            printer.add("".concat(this.attributeName, ": this.").concat(this.attributeName, ","));
        }
    };
    EnumMessageField.prototype.printToProtobufJSONMapping = function (printer) {
        if (this.isArray) {
            printer.add("".concat(this.attributeName, ": (this.").concat(this.attributeName, " || []).map(v => ").concat(this.notRepeatedDataType, "[v]),"));
        }
        else {
            printer.add("".concat(this.attributeName, ": ").concat(this.oneOf || this.messageField.proto3Optional ?
                "this.".concat(this.attributeName, " === undefined ? null : ")
                : '').concat(this.notRepeatedDataType, "[this.").concat(this.attributeName, " === null || this.").concat(this.attributeName, " === undefined ? 0 : this.").concat(this.attributeName, "],"));
        }
    };
    EnumMessageField.prototype.printAsJSONMapping = function (printer) {
        printer.add("".concat(this.attributeName, ": string").concat(this.isArray ? '[]' : '').concat(this.oneOf || this.messageField.proto3Optional ? ' | null' : '', ";"));
    };
    return EnumMessageField;
}(abstract_message_field_1.AbstractMessageField));
exports.EnumMessageField = EnumMessageField;
//# sourceMappingURL=enum-message-field.js.map