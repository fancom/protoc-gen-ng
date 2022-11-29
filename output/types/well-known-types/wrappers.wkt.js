"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UInt64ValueWKT = exports.UInt32ValueWKT = exports.StringValueWKT = exports.Int64ValueWKT = exports.Int32ValueWKT = exports.FloatValueWKT = exports.DoubleValueWKT = exports.BytesValueWKT = exports.BoolValueWKT = void 0;
var dependencies_1 = require("../../misc/dependencies");
var BoolValueWKT = /** @class */ (function () {
    function BoolValueWKT() {
    }
    BoolValueWKT.prototype.printToProtobufJSON = function (printer) {
        printer.addLine('return this.value;');
    };
    BoolValueWKT.prototype.printAsProtobufJSON = function (printer) {
        printer.addLine('export type AsProtobufJSON = boolean;');
    };
    return BoolValueWKT;
}());
exports.BoolValueWKT = BoolValueWKT;
var BytesValueWKT = /** @class */ (function () {
    function BytesValueWKT() {
    }
    BytesValueWKT.prototype.printToProtobufJSON = function (printer) {
        printer.addDeps(dependencies_1.ExternalDependencies.uint8ArrayToBase64);
        printer.addLine('return this.value ? uint8ArrayToBase64(this.value) : \'\';');
    };
    BytesValueWKT.prototype.printAsProtobufJSON = function (printer) {
        printer.addLine('export type AsProtobufJSON = string;');
    };
    return BytesValueWKT;
}());
exports.BytesValueWKT = BytesValueWKT;
var DoubleValueWKT = /** @class */ (function () {
    function DoubleValueWKT() {
    }
    DoubleValueWKT.prototype.printToProtobufJSON = function (printer) {
        printer.addLine('return this.value;');
    };
    DoubleValueWKT.prototype.printAsProtobufJSON = function (printer) {
        printer.addLine('export type AsProtobufJSON = number;');
    };
    return DoubleValueWKT;
}());
exports.DoubleValueWKT = DoubleValueWKT;
var FloatValueWKT = /** @class */ (function () {
    function FloatValueWKT() {
    }
    FloatValueWKT.prototype.printToProtobufJSON = function (printer) {
        printer.addLine('return this.value;');
    };
    FloatValueWKT.prototype.printAsProtobufJSON = function (printer) {
        printer.addLine('export type AsProtobufJSON = number;');
    };
    return FloatValueWKT;
}());
exports.FloatValueWKT = FloatValueWKT;
var Int32ValueWKT = /** @class */ (function () {
    function Int32ValueWKT() {
    }
    Int32ValueWKT.prototype.printToProtobufJSON = function (printer) {
        printer.addLine('return this.value;');
    };
    Int32ValueWKT.prototype.printAsProtobufJSON = function (printer) {
        printer.addLine('export type AsProtobufJSON = number;');
    };
    return Int32ValueWKT;
}());
exports.Int32ValueWKT = Int32ValueWKT;
var Int64ValueWKT = /** @class */ (function () {
    function Int64ValueWKT() {
    }
    Int64ValueWKT.prototype.printToProtobufJSON = function (printer) {
        printer.addLine('return this.value;');
    };
    Int64ValueWKT.prototype.printAsProtobufJSON = function (printer) {
        printer.addLine('export type AsProtobufJSON = string;');
    };
    return Int64ValueWKT;
}());
exports.Int64ValueWKT = Int64ValueWKT;
var StringValueWKT = /** @class */ (function () {
    function StringValueWKT() {
    }
    StringValueWKT.prototype.printToProtobufJSON = function (printer) {
        printer.addLine('return this.value;');
    };
    StringValueWKT.prototype.printAsProtobufJSON = function (printer) {
        printer.addLine('export type AsProtobufJSON = string;');
    };
    return StringValueWKT;
}());
exports.StringValueWKT = StringValueWKT;
var UInt32ValueWKT = /** @class */ (function () {
    function UInt32ValueWKT() {
    }
    UInt32ValueWKT.prototype.printToProtobufJSON = function (printer) {
        printer.addLine('return this.value;');
    };
    UInt32ValueWKT.prototype.printAsProtobufJSON = function (printer) {
        printer.addLine('export type AsProtobufJSON = number;');
    };
    return UInt32ValueWKT;
}());
exports.UInt32ValueWKT = UInt32ValueWKT;
var UInt64ValueWKT = /** @class */ (function () {
    function UInt64ValueWKT() {
    }
    UInt64ValueWKT.prototype.printToProtobufJSON = function (printer) {
        printer.addLine('return this.value;');
    };
    UInt64ValueWKT.prototype.printAsProtobufJSON = function (printer) {
        printer.addLine('export type AsProtobufJSON = string;');
    };
    return UInt64ValueWKT;
}());
exports.UInt64ValueWKT = UInt64ValueWKT;
//# sourceMappingURL=wrappers.wkt.js.map