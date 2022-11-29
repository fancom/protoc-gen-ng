"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NumberMessageField = void 0;
var tslib_1 = require("tslib");
var types_1 = require("../../../input/types");
var helpers_1 = require("../../misc/helpers");
var abstract_message_field_1 = require("./abstract-message-field");
var NumberMessageField = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(NumberMessageField, _super);
    function NumberMessageField(proto, message, messageField, oneOf) {
        var _this = _super.call(this, proto, message, messageField, oneOf) || this;
        _this.proto = proto;
        _this.message = message;
        _this.messageField = messageField;
        _this.oneOf = oneOf;
        _this.isArray = _this.messageField.label === types_1.ProtoMessageFieldCardinality.repeated;
        _this.isPacked = (0, helpers_1.isPacked)(_this.proto, _this.messageField);
        _this.isStringType = (0, helpers_1.isNumberString)(_this.messageField);
        switch (_this.messageField.type) {
            case types_1.ProtoMessageFieldType.double:
                _this.protoDataType = 'Double';
                break;
            case types_1.ProtoMessageFieldType.fixed32:
                _this.protoDataType = 'Fixed32';
                break;
            case types_1.ProtoMessageFieldType.float:
                _this.protoDataType = 'Float';
                break;
            case types_1.ProtoMessageFieldType.int32:
                _this.protoDataType = 'Int32';
                break;
            case types_1.ProtoMessageFieldType.sfixed32:
                _this.protoDataType = 'Sfixed32';
                break;
            case types_1.ProtoMessageFieldType.sint32:
                _this.protoDataType = 'Sint32';
                break;
            case types_1.ProtoMessageFieldType.uint32:
                _this.protoDataType = 'Uint32';
                break;
            case types_1.ProtoMessageFieldType.fixed64:
                _this.protoDataType = 'Fixed64' + (_this.isStringType ? 'String' : '');
                break;
            case types_1.ProtoMessageFieldType.int64:
                _this.protoDataType = 'Int64' + (_this.isStringType ? 'String' : '');
                break;
            case types_1.ProtoMessageFieldType.sfixed64:
                _this.protoDataType = 'Sfixed64' + (_this.isStringType ? 'String' : '');
                break;
            case types_1.ProtoMessageFieldType.sint64:
                _this.protoDataType = 'Sint64' + (_this.isStringType ? 'String' : '');
                break;
            case types_1.ProtoMessageFieldType.uint64:
                _this.protoDataType = 'Uint64' + (_this.isStringType ? 'String' : '');
                break;
            default: throw new Error('Unknown number type ' + _this.messageField.type);
        }
        return _this;
    }
    NumberMessageField.prototype.printDeserializeBinaryFromReader = function (printer) {
        if (this.isPacked) {
            printer.add("case ".concat(this.messageField.number, ": (_instance.").concat(this.attributeName, " = _instance.").concat(this.attributeName, " || []).push(...(_reader.readPacked").concat(this.protoDataType, "() || []));"));
        }
        else if (this.isArray) {
            printer.add("case ".concat(this.messageField.number, ": (_instance.").concat(this.attributeName, " = _instance.").concat(this.attributeName, " || []).push(_reader.read").concat(this.protoDataType, "());"));
        }
        else {
            printer.add("case ".concat(this.messageField.number, ": _instance.").concat(this.attributeName, " = _reader.read").concat(this.protoDataType, "();"));
        }
        printer.add('break;');
    };
    NumberMessageField.prototype.printSerializeBinaryToWriter = function (printer) {
        if (this.isPacked) {
            printer.add("if (_instance.".concat(this.attributeName, " && _instance.").concat(this.attributeName, ".length) {\n        _writer.writePacked").concat(this.protoDataType, "(").concat(this.messageField.number, ", _instance.").concat(this.attributeName, ");\n      }"));
        }
        else if (this.isArray) {
            printer.add("if (_instance.".concat(this.attributeName, " && _instance.").concat(this.attributeName, ".length) {\n        _writer.writeRepeated").concat(this.protoDataType, "(").concat(this.messageField.number, ", _instance.").concat(this.attributeName, ");\n      }"));
        }
        else if (this.oneOf) {
            printer.add("if (_instance.".concat(this.attributeName, " || _instance.").concat(this.attributeName, " === ").concat(this.isStringType ? '\'0\'' : '0', ") {\n        _writer.write").concat(this.protoDataType, "(").concat(this.messageField.number, ", _instance.").concat(this.attributeName, ");\n      }"));
        }
        else if (this.messageField.proto3Optional) {
            printer.add("if (_instance.".concat(this.attributeName, " !== undefined && _instance.").concat(this.attributeName, " !== null) {\n         _writer.write").concat(this.protoDataType, "(").concat(this.messageField.number, ", _instance.").concat(this.attributeName, ");\n      }"));
        }
        else {
            printer.add("if (_instance.".concat(this.attributeName, ") {\n        _writer.write").concat(this.protoDataType, "(").concat(this.messageField.number, ", _instance.").concat(this.attributeName, ");\n      }"));
        }
    };
    NumberMessageField.prototype.printInitializer = function (printer) {
        if (this.isArray) {
            printer.add("this.".concat(this.attributeName, " = (_value.").concat(this.attributeName, " || []).slice();"));
        }
        else {
            printer.add("this.".concat(this.attributeName, " = _value.").concat(this.attributeName));
        }
    };
    NumberMessageField.prototype.printDefaultValueSetter = function (printer) {
        if (this.oneOf || this.messageField.proto3Optional) {
            return;
        }
        else if (this.isArray) {
            printer.add("_instance.".concat(this.attributeName, " = _instance.").concat(this.attributeName, " || []"));
        }
        else {
            printer.add("_instance.".concat(this.attributeName, " = _instance.").concat(this.attributeName, " || ").concat(this.isStringType ? '\'0\'' : '0'));
        }
    };
    NumberMessageField.prototype.printToObjectMapping = function (printer) {
        if (this.isArray) {
            printer.add("".concat(this.attributeName, ": (this.").concat(this.attributeName, " || []).slice(),"));
        }
        else {
            printer.add("".concat(this.attributeName, ": this.").concat(this.attributeName, ","));
        }
    };
    NumberMessageField.prototype.printToProtobufJSONMapping = function (printer) {
        if (this.isArray) {
            printer.add("".concat(this.attributeName, ": (this.").concat(this.attributeName, " || []).slice(),"));
        }
        else {
            if (this.oneOf || this.messageField.proto3Optional) {
                printer.add("".concat(this.attributeName, ": this.").concat(this.attributeName, " === null || this.").concat(this.attributeName, " === undefined ? null : this.").concat(this.attributeName, ","));
            }
            else {
                printer.add("".concat(this.attributeName, ": this.").concat(this.attributeName, ","));
            }
        }
    };
    NumberMessageField.prototype.printAsJSONMapping = function (printer) {
        printer.add("".concat(this.attributeName, ": ").concat(this.dataType).concat(this.oneOf || this.messageField.proto3Optional ? ' | null' : '', ";"));
    };
    return NumberMessageField;
}(abstract_message_field_1.AbstractMessageField));
exports.NumberMessageField = NumberMessageField;
//# sourceMappingURL=number-message-field.js.map