"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BytesMessageField = void 0;
var tslib_1 = require("tslib");
var types_1 = require("../../../input/types");
var dependencies_1 = require("../../misc/dependencies");
var abstract_message_field_1 = require("./abstract-message-field");
var BytesMessageField = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(BytesMessageField, _super);
    function BytesMessageField(proto, message, messageField, oneOf) {
        var _this = _super.call(this, proto, message, messageField, oneOf) || this;
        _this.proto = proto;
        _this.message = message;
        _this.messageField = messageField;
        _this.oneOf = oneOf;
        _this.isArray = _this.messageField.label === types_1.ProtoMessageFieldCardinality.repeated;
        return _this;
    }
    BytesMessageField.prototype.printDeserializeBinaryFromReader = function (printer) {
        var readerCall = '_reader.readBytes()';
        if (this.isArray) {
            printer.add("case ".concat(this.messageField.number, ": (_instance.").concat(this.attributeName, " = _instance.").concat(this.attributeName, " || []).push(").concat(readerCall, ");"));
        }
        else {
            printer.add("case ".concat(this.messageField.number, ": _instance.").concat(this.attributeName, " = ").concat(readerCall, ";"));
        }
        printer.add('break;');
    };
    BytesMessageField.prototype.printSerializeBinaryToWriter = function (printer) {
        if (this.messageField.proto3Optional) {
            printer.add("if (_instance.".concat(this.attributeName, " !== undefined && _instance.").concat(this.attributeName, " !== null) {\n        _writer.writeBytes(").concat(this.messageField.number, ", _instance.").concat(this.attributeName, ");\n      }"));
        }
        else {
            printer.add("if (_instance.".concat(this.attributeName, " && _instance.").concat(this.attributeName, ".length) {\n      _writer.write").concat(this.isArray ? 'Repeated' : '', "Bytes(").concat(this.messageField.number, ", _instance.").concat(this.attributeName, ");\n    }"));
        }
    };
    BytesMessageField.prototype.printInitializer = function (printer) {
        if (this.isArray) {
            printer.add("this.".concat(this.attributeName, " = (_value.").concat(this.attributeName, " || []).map(b => b ? b.subarray(0) : new Uint8Array());"));
        }
        else {
            printer.add("this.".concat(this.attributeName, " = _value.").concat(this.attributeName));
        }
    };
    BytesMessageField.prototype.printDefaultValueSetter = function (printer) {
        if (this.oneOf || this.messageField.proto3Optional) {
            return;
        }
        else if (this.isArray) {
            printer.add("_instance.".concat(this.attributeName, " = _instance.").concat(this.attributeName, " || []"));
        }
        else {
            printer.add("_instance.".concat(this.attributeName, " = _instance.").concat(this.attributeName, " || new Uint8Array()"));
        }
    };
    BytesMessageField.prototype.printToObjectMapping = function (printer) {
        if (this.isArray) {
            printer.add("".concat(this.attributeName, ": (this.").concat(this.attributeName, " || []).map(b => b ? b.subarray(0) : new Uint8Array()),"));
        }
        else {
            printer.add("".concat(this.attributeName, ": this.").concat(this.attributeName, " ? this.").concat(this.attributeName, ".subarray(0) : ").concat(this.messageField.proto3Optional ? 'undefined' : 'new Uint8Array()', ","));
        }
    };
    BytesMessageField.prototype.printToProtobufJSONMapping = function (printer) {
        printer.addDeps(dependencies_1.ExternalDependencies.uint8ArrayToBase64);
        if (this.isArray) {
            printer.add("".concat(this.attributeName, ": (this.").concat(this.attributeName, " || []).map(b => b ? uint8ArrayToBase64(b) : ''),"));
        }
        else {
            printer.add("".concat(this.attributeName, ": this.").concat(this.attributeName, " ? uint8ArrayToBase64(this.").concat(this.attributeName, ") : ").concat(this.messageField.proto3Optional ? 'null' : '\'\'', ","));
        }
    };
    BytesMessageField.prototype.printAsJSONMapping = function (printer) {
        if (this.messageField.proto3Optional) {
            printer.add("".concat(this.attributeName, ": string | null;"));
        }
        else {
            printer.add("".concat(this.attributeName, ": string").concat(this.isArray ? '[]' : '', ";"));
        }
    };
    return BytesMessageField;
}(abstract_message_field_1.AbstractMessageField));
exports.BytesMessageField = BytesMessageField;
//# sourceMappingURL=bytes-message-field.js.map