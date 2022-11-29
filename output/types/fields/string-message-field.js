"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringMessageField = void 0;
var tslib_1 = require("tslib");
var types_1 = require("../../../input/types");
var abstract_message_field_1 = require("./abstract-message-field");
var StringMessageField = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(StringMessageField, _super);
    function StringMessageField(proto, message, messageField, oneOf) {
        var _this = _super.call(this, proto, message, messageField, oneOf) || this;
        _this.proto = proto;
        _this.message = message;
        _this.messageField = messageField;
        _this.oneOf = oneOf;
        _this.isArray = _this.messageField.label === types_1.ProtoMessageFieldCardinality.repeated;
        return _this;
    }
    StringMessageField.prototype.printDeserializeBinaryFromReader = function (printer) {
        var readerCall = '_reader.readString()';
        if (this.isArray) {
            printer.add("case ".concat(this.messageField.number, ": (_instance.").concat(this.attributeName, " = _instance.").concat(this.attributeName, " || []).push(").concat(readerCall, ");"));
        }
        else {
            printer.add("case ".concat(this.messageField.number, ": _instance.").concat(this.attributeName, " = ").concat(readerCall, ";"));
        }
        printer.add('break;');
    };
    StringMessageField.prototype.printSerializeBinaryToWriter = function (printer) {
        if (this.isArray) {
            printer.add("if (_instance.".concat(this.attributeName, " && _instance.").concat(this.attributeName, ".length) {\n        _writer.writeRepeatedString(").concat(this.messageField.number, ", _instance.").concat(this.attributeName, ");\n      }"));
        }
        else if (this.oneOf) {
            printer.add("if (_instance.".concat(this.attributeName, " || _instance.").concat(this.attributeName, " === '') {\n        _writer.writeString(").concat(this.messageField.number, ", _instance.").concat(this.attributeName, ");\n      }"));
        }
        else if (this.messageField.proto3Optional) {
            printer.add("if (_instance.".concat(this.attributeName, " !== undefined && _instance.").concat(this.attributeName, " !== null) {\n        _writer.writeString(").concat(this.messageField.number, ", _instance.").concat(this.attributeName, ");\n      }"));
        }
        else {
            printer.add("if (_instance.".concat(this.attributeName, ") {\n        _writer.writeString(").concat(this.messageField.number, ", _instance.").concat(this.attributeName, ");\n      }"));
        }
    };
    StringMessageField.prototype.printInitializer = function (printer) {
        if (this.isArray) {
            printer.add("this.".concat(this.attributeName, " = (_value.").concat(this.attributeName, " || []).slice();"));
        }
        else {
            printer.add("this.".concat(this.attributeName, " = _value.").concat(this.attributeName));
        }
    };
    StringMessageField.prototype.printDefaultValueSetter = function (printer) {
        if (this.oneOf || this.messageField.proto3Optional) {
            return;
        }
        else if (this.isArray) {
            printer.add("_instance.".concat(this.attributeName, " = _instance.").concat(this.attributeName, " || []"));
        }
        else {
            printer.add("_instance.".concat(this.attributeName, " = _instance.").concat(this.attributeName, " || ''"));
        }
    };
    StringMessageField.prototype.printToObjectMapping = function (printer) {
        if (this.isArray) {
            printer.add("".concat(this.attributeName, ": (this.").concat(this.attributeName, " || []).slice(),"));
        }
        else {
            printer.add("".concat(this.attributeName, ": this.").concat(this.attributeName, ","));
        }
    };
    StringMessageField.prototype.printToProtobufJSONMapping = function (printer) {
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
    StringMessageField.prototype.printAsJSONMapping = function (printer) {
        printer.add("".concat(this.attributeName, ": ").concat(this.dataType).concat(this.oneOf || this.messageField.proto3Optional ? ' | null' : '', ";"));
    };
    return StringMessageField;
}(abstract_message_field_1.AbstractMessageField));
exports.StringMessageField = StringMessageField;
//# sourceMappingURL=string-message-field.js.map