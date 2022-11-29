"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractMessageField = void 0;
var utils_1 = require("../../../utils");
var helpers_1 = require("../../misc/helpers");
var AbstractMessageField = /** @class */ (function () {
    function AbstractMessageField(proto, message, messageField, oneOf) {
        this.proto = proto;
        this.message = message;
        this.messageField = messageField;
        this.oneOf = oneOf;
        this.attributeName = (0, utils_1.camelizeSafe)(this.messageField.name);
        this.dataType = (0, helpers_1.getDataType)(this.proto, this.messageField);
    }
    Object.defineProperty(AbstractMessageField.prototype, "postfixProp", {
        get: function () {
            return this.messageField.proto3Optional ? '?' : '';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractMessageField.prototype, "type", {
        get: function () {
            return this.messageField.proto3Optional ? "".concat(this.dataType, " | undefined") : this.dataType;
        },
        enumerable: false,
        configurable: true
    });
    AbstractMessageField.prototype.printPrivateAttribute = function (printer) {
        printer.add("private _".concat(this.attributeName).concat(this.postfixProp, ": ").concat(this.dataType, ";"));
    };
    AbstractMessageField.prototype.printGetter = function (printer) {
        printer.add("get ".concat(this.attributeName, "(): ").concat(this.type, " { return this._").concat(this.attributeName, " }"));
    };
    AbstractMessageField.prototype.printSetter = function (printer) {
        printer.add("set ".concat(this.attributeName, "(value").concat(this.postfixProp, ": ").concat(this.dataType, ") {\n      ").concat(this.oneOf ? this.oneOf.createFieldSetterAddon(this.messageField) : '', "\n      this._").concat(this.attributeName, " = value;\n    }"));
    };
    AbstractMessageField.prototype.printAsObjectMapping = function (printer) {
        printer.add("".concat(this.attributeName).concat(this.postfixProp, ": ").concat(this.dataType, ";"));
    };
    return AbstractMessageField;
}());
exports.AbstractMessageField = AbstractMessageField;
//# sourceMappingURL=abstract-message-field.js.map