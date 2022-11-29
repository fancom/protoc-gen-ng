"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooleanMessageField = void 0;
var tslib_1 = require("tslib");
var types_1 = require("../../../input/types");
var helpers_1 = require("../../misc/helpers");
var abstract_message_field_1 = require("./abstract-message-field");
var BooleanMessageField = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(BooleanMessageField, _super);
    function BooleanMessageField(proto, message, messageField, oneOf) {
        var _this = _super.call(this, proto, message, messageField, oneOf) || this;
        _this.proto = proto;
        _this.message = message;
        _this.messageField = messageField;
        _this.oneOf = oneOf;
        _this.isArray = _this.messageField.label === types_1.ProtoMessageFieldCardinality.repeated;
        _this.isPacked = (0, helpers_1.isPacked)(_this.proto, _this.messageField);
        return _this;
    }
    BooleanMessageField.prototype.printDeserializeBinaryFromReader = function (printer) {
        if (this.isPacked) {
            printer.add("case ".concat(this.messageField.number, ": (_instance.").concat(this.attributeName, " = _instance.").concat(this.attributeName, " || []).push(...(_reader.readPackedBool() || []));"));
        }
        else if (this.isArray) {
            printer.add("case ".concat(this.messageField.number, ": (_instance.").concat(this.attributeName, " = _instance.").concat(this.attributeName, " || []).push(_reader.readBool());"));
        }
        else {
            printer.add("case ".concat(this.messageField.number, ": _instance.").concat(this.attributeName, " = _reader.readBool();"));
        }
        printer.add('break;');
    };
    BooleanMessageField.prototype.printSerializeBinaryToWriter = function (printer) {
        if (this.isPacked) {
            printer.add("if (_instance.".concat(this.attributeName, " && _instance.").concat(this.attributeName, ".length) {\n        _writer.writePackedBool(").concat(this.messageField.number, ", _instance.").concat(this.attributeName, ");\n      }"));
        }
        else if (this.isArray) {
            printer.add("if (_instance.".concat(this.attributeName, " && _instance.").concat(this.attributeName, ".length) {\n        _writer.writeRepeatedBool(").concat(this.messageField.number, ", _instance.").concat(this.attributeName, ");\n      }"));
        }
        else if (this.oneOf) {
            printer.add("if (_instance.".concat(this.attributeName, " || _instance.").concat(this.attributeName, " === false) {\n        _writer.writeBool(").concat(this.messageField.number, ", _instance.").concat(this.attributeName, ");\n      }"));
        }
        else if (this.messageField.proto3Optional) {
            printer.add("if (_instance.".concat(this.attributeName, " !== undefined && _instance.").concat(this.attributeName, " !== null) {\n        _writer.writeBool(").concat(this.messageField.number, ", _instance.").concat(this.attributeName, ");\n      }"));
        }
        else {
            printer.add("if (_instance.".concat(this.attributeName, ") {\n        _writer.writeBool(").concat(this.messageField.number, ", _instance.").concat(this.attributeName, ");\n      }"));
        }
    };
    BooleanMessageField.prototype.printInitializer = function (printer) {
        if (this.isArray) {
            printer.add("this.".concat(this.attributeName, " = (_value.").concat(this.attributeName, " || []).slice();"));
        }
        else {
            printer.add("this.".concat(this.attributeName, " = _value.").concat(this.attributeName));
        }
    };
    BooleanMessageField.prototype.printDefaultValueSetter = function (printer) {
        if (this.oneOf || this.messageField.proto3Optional) {
            return;
        }
        else if (this.isArray) {
            printer.add("_instance.".concat(this.attributeName, " = _instance.").concat(this.attributeName, " || []"));
        }
        else {
            printer.add("_instance.".concat(this.attributeName, " = _instance.").concat(this.attributeName, " || false"));
        }
    };
    BooleanMessageField.prototype.printToObjectMapping = function (printer) {
        if (this.isArray) {
            printer.add("".concat(this.attributeName, ": (this.").concat(this.attributeName, " || []).slice(),"));
        }
        else {
            printer.add("".concat(this.attributeName, ": this.").concat(this.attributeName, ","));
        }
    };
    BooleanMessageField.prototype.printToProtobufJSONMapping = function (printer) {
        if (this.isArray) {
            printer.add("".concat(this.attributeName, ": (this.").concat(this.attributeName, " || []).slice(),"));
        }
        else if (this.messageField.proto3Optional) {
            printer.add("".concat(this.attributeName, ": this.").concat(this.attributeName, " === undefined ? null : this.").concat(this.attributeName, ","));
        }
        else {
            printer.add("".concat(this.attributeName, ": this.").concat(this.attributeName, ","));
        }
    };
    BooleanMessageField.prototype.printAsJSONMapping = function (printer) {
        printer.add("".concat(this.attributeName, ": ").concat(this.dataType).concat(this.messageField.proto3Optional ? ' | null' : '', ";"));
    };
    return BooleanMessageField;
}(abstract_message_field_1.AbstractMessageField));
exports.BooleanMessageField = BooleanMessageField;
//# sourceMappingURL=boolean-message-field.js.map