"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OneOf = void 0;
var tslib_1 = require("tslib");
var proto_enum_1 = require("../../input/proto-enum");
var utils_1 = require("../../utils");
var enum_1 = require("./enum");
var OneOf = /** @class */ (function () {
    function OneOf(proto, message, oneof) {
        var _this = this;
        this.proto = proto;
        this.message = message;
        this.oneof = oneof;
        this.attributeName = (0, utils_1.camelizeSafe)(this.oneof.name);
        this.enumName = (0, utils_1.classify)(this.oneof.name) + 'Case';
        this.index = message.oneofDeclList.indexOf(this.oneof);
        this.fields = message.fieldList.filter(function (f) { return f.oneofIndex === _this.index; });
        this.synthetic = this.fields.every(function (field) { return field.proto3Optional; });
    }
    OneOf.prototype.isSyntheticOneOf = function () {
        return this.synthetic;
    };
    OneOf.prototype.printEnum = function (printer) {
        var protoEnum = new proto_enum_1.ProtoEnum({
            name: this.enumName,
            reservedNameList: [],
            reservedRangeList: [],
            valueList: (0, tslib_1.__spreadArray)([
                { name: 'none', number: 0 }
            ], (0, tslib_1.__read)(this.fields.map(function (f, fi) { return ({ name: (0, utils_1.camelizeSafe)(f.name), number: fi + 1 }); })), false),
        });
        new enum_1.Enum(this.proto, protoEnum).print(printer);
    };
    OneOf.prototype.printPrivateAttribute = function (printer) {
        var type = "".concat(this.message.name, ".").concat(this.enumName);
        printer.add("private _".concat(this.attributeName, ": ").concat(type, " = ").concat(type, ".none;"));
    };
    OneOf.prototype.printGetter = function (printer) {
        printer.add("get ".concat(this.attributeName, "() { return this._").concat(this.attributeName, "; }"));
    };
    OneOf.prototype.createFieldSetterAddon = function (field) {
        var otherFields = this.message.fieldList
            .filter(function (ff) { return ff.oneofIndex === field.oneofIndex && ff.name !== field.name; })
            .map(function (ff) { return "this._".concat((0, utils_1.camelizeSafe)(ff.name)); });
        // TODO setter should not check for null or undefined
        return "if (value !== undefined && value !== null) {\n          ".concat(otherFields.length ? (0, tslib_1.__spreadArray)((0, tslib_1.__spreadArray)([], (0, tslib_1.__read)(otherFields), false), ['undefined'], false).join(' = ') : '', "\n          this._").concat((0, utils_1.camelizeSafe)(this.attributeName), " = ").concat(this.message.name, ".").concat(this.enumName, ".").concat((0, utils_1.camelizeSafe)(field.name), ";\n        }");
    };
    return OneOf;
}());
exports.OneOf = OneOf;
//# sourceMappingURL=oneof.js.map