"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageMessageField = void 0;
var tslib_1 = require("tslib");
var types_1 = require("../../../input/types");
var helpers_1 = require("../../misc/helpers");
var abstract_message_field_1 = require("./abstract-message-field");
var MessageMessageField = /** @class */ (function (_super) {
    (0, tslib_1.__extends)(MessageMessageField, _super);
    function MessageMessageField(proto, message, messageField, oneOf) {
        var _this = _super.call(this, proto, message, messageField, oneOf) || this;
        _this.proto = proto;
        _this.message = message;
        _this.messageField = messageField;
        _this.oneOf = oneOf;
        _this.isArray = _this.messageField.label === types_1.ProtoMessageFieldCardinality.repeated;
        _this.messageClassName = _this.proto.getRelativeTypeName(_this.messageField.typeName);
        _this.asObjectDataType = (0, helpers_1.getDataType)(_this.proto, _this.messageField, { asObjectDataType: true });
        _this.asJSONDataType = (0, helpers_1.getDataType)(_this.proto, _this.messageField, { asProtobufJSONDataType: true });
        return _this;
    }
    MessageMessageField.prototype.printDeserializeBinaryFromReader = function (printer) {
        var varName = "messageInitializer".concat(this.messageField.number);
        if (this.isArray) {
            printer.add("case ".concat(this.messageField.number, ":\n        const ").concat(varName, " = new ").concat(this.messageClassName, "();\n        _reader.readMessage(").concat(varName, ", ").concat(this.messageClassName, ".deserializeBinaryFromReader);\n        (_instance.").concat(this.attributeName, " = _instance.").concat(this.attributeName, " || []).push(").concat(varName, ");"));
        }
        else {
            printer.add("case ".concat(this.messageField.number, ":\n        _instance.").concat(this.attributeName, " = new ").concat(this.messageClassName, "();\n        _reader.readMessage(_instance.").concat(this.attributeName, ", ").concat(this.messageClassName, ".deserializeBinaryFromReader);"));
        }
        printer.add('break;');
    };
    MessageMessageField.prototype.printSerializeBinaryToWriter = function (printer) {
        if (this.isArray) {
            printer.add("if (_instance.".concat(this.attributeName, " && _instance.").concat(this.attributeName, ".length) {\n        _writer.writeRepeatedMessage(").concat(this.messageField.number, ", _instance.").concat(this.attributeName, " as any, ").concat(this.messageClassName, ".serializeBinaryToWriter);\n      }"));
        }
        else {
            printer.add("if (_instance.".concat(this.attributeName, ") {\n        _writer.writeMessage(").concat(this.messageField.number, ", _instance.").concat(this.attributeName, " as any, ").concat(this.messageClassName, ".serializeBinaryToWriter);\n      }"));
        }
    };
    MessageMessageField.prototype.printPrivateAttribute = function (printer) {
        printer.add("private _".concat(this.attributeName, "?: ").concat(this.dataType, ";"));
    };
    MessageMessageField.prototype.printInitializer = function (printer) {
        if (this.isArray) {
            printer.add("this.".concat(this.attributeName, " = (_value.").concat(this.attributeName, " || []).map(m => new ").concat(this.messageClassName, "(m));"));
        }
        else {
            printer.add("this.".concat(this.attributeName, " = _value.").concat(this.attributeName, " ? new ").concat(this.messageClassName, "(_value.").concat(this.attributeName, ") : undefined;"));
        }
    };
    MessageMessageField.prototype.printDefaultValueSetter = function (printer) {
        if (this.oneOf) {
            return;
        }
        else if (this.isArray) {
            printer.add("_instance.".concat(this.attributeName, " = _instance.").concat(this.attributeName, " || []"));
        }
        else {
            printer.add("_instance.".concat(this.attributeName, " = _instance.").concat(this.attributeName, " || undefined"));
        }
    };
    MessageMessageField.prototype.printGetter = function (printer) {
        printer.add("get ".concat(this.attributeName, "(): ").concat(this.dataType, " | undefined { return this._").concat(this.attributeName, " }"));
    };
    MessageMessageField.prototype.printSetter = function (printer) {
        printer.add("set ".concat(this.attributeName, "(value: ").concat(this.dataType, " | undefined) {\n      ").concat(this.oneOf ? this.oneOf.createFieldSetterAddon(this.messageField) : '', "\n      this._").concat(this.attributeName, " = value;\n    }"));
    };
    MessageMessageField.prototype.printToObjectMapping = function (printer) {
        if (this.isArray) {
            printer.add("".concat(this.attributeName, ": (this.").concat(this.attributeName, " || []).map(m => m.toObject()),"));
        }
        else {
            printer.add("".concat(this.attributeName, ": this.").concat(this.attributeName, " ? this.").concat(this.attributeName, ".toObject() : undefined,"));
        }
    };
    MessageMessageField.prototype.printAsObjectMapping = function (printer) {
        printer.add("".concat(this.attributeName, "?: ").concat(this.asObjectDataType, ";"));
    };
    MessageMessageField.prototype.printToProtobufJSONMapping = function (printer) {
        if (this.isArray) {
            printer.add("".concat(this.attributeName, ": (this.").concat(this.attributeName, " || []).map(m => m.toProtobufJSON(options)),"));
        }
        else {
            printer.add("".concat(this.attributeName, ": this.").concat(this.attributeName, " ? this.").concat(this.attributeName, ".toProtobufJSON(options) : null,"));
        }
    };
    MessageMessageField.prototype.printAsJSONMapping = function (printer) {
        printer.add("".concat(this.attributeName, ": ").concat(this.asJSONDataType, " | null;"));
    };
    return MessageMessageField;
}(abstract_message_field_1.AbstractMessageField));
exports.MessageMessageField = MessageMessageField;
//# sourceMappingURL=message-message-field.js.map