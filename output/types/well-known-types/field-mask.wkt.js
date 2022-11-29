"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldMaskWKT = void 0;
var FieldMaskWKT = /** @class */ (function () {
    function FieldMaskWKT() {
    }
    FieldMaskWKT.prototype.printToProtobufJSON = function (printer) {
        printer.addLine('return this.paths.join(\',\');');
    };
    FieldMaskWKT.prototype.printAsProtobufJSON = function (printer) {
        printer.addLine('export type AsProtobufJSON = string;');
    };
    return FieldMaskWKT;
}());
exports.FieldMaskWKT = FieldMaskWKT;
//# sourceMappingURL=field-mask.wkt.js.map