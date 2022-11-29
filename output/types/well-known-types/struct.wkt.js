"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListValueWKT = exports.ValueWKT = exports.StructWKT = void 0;
var StructWKT = /** @class */ (function () {
    function StructWKT() {
    }
    StructWKT.prototype.printToProtobufJSON = function (printer) {
        printer.addLine('return this.fields ? Object.keys(this.fields).reduce((r, k) => ({ ...r, [k]: this.fields![k] ? this.fields![k].toProtobufJSON(options) : {} }), {}) : {};');
    };
    StructWKT.prototype.printAsProtobufJSON = function (printer) {
        printer.addLine('export type AsProtobufJSON = { [prop: string]: Value.AsProtobufJSON; };');
    };
    return StructWKT;
}());
exports.StructWKT = StructWKT;
var ValueWKT = /** @class */ (function () {
    function ValueWKT() {
    }
    ValueWKT.prototype.printToProtobufJSON = function (printer) {
        printer.addLine("\n      switch(this.kind) {\n        case Value.KindCase.nullValue: return null;\n        case Value.KindCase.numberValue: return this.numberValue!;\n        case Value.KindCase.stringValue: return this.stringValue!;\n        case Value.KindCase.boolValue: return this.boolValue!;\n        case Value.KindCase.structValue: return this.structValue ? this.structValue.toProtobufJSON(options) : null;\n        case Value.KindCase.listValue: return this.listValue ? this.listValue.toProtobufJSON(options) : null;\n        default: return null; // yes, according to standard should throw error, but no, it's not going to happen here\n      }\n    ");
    };
    ValueWKT.prototype.printAsProtobufJSON = function (printer) {
        printer.addLine('export type AsProtobufJSON = null | string | number | boolean | Struct.AsProtobufJSON | Value.AsProtobufJSON[];');
    };
    return ValueWKT;
}());
exports.ValueWKT = ValueWKT;
var ListValueWKT = /** @class */ (function () {
    function ListValueWKT() {
    }
    ListValueWKT.prototype.printToProtobufJSON = function (printer) {
        printer.addLine('return (this.values || []).map(v => v ? v.toProtobufJSON(options) : null);');
    };
    ListValueWKT.prototype.printAsProtobufJSON = function (printer) {
        printer.addLine('export type AsProtobufJSON = Value.AsProtobufJSON[];');
    };
    return ListValueWKT;
}());
exports.ListValueWKT = ListValueWKT;
//# sourceMappingURL=struct.wkt.js.map