"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DurationWKT = void 0;
var DurationWKT = /** @class */ (function () {
    function DurationWKT() {
    }
    DurationWKT.prototype.printToProtobufJSON = function (printer) {
        printer.addLine('return (parseInt(this.seconds || \'0\') + (this.nanos || 0) / 1e9) + \'s\';');
    };
    DurationWKT.prototype.printAsProtobufJSON = function (printer) {
        printer.addLine('export type AsProtobufJSON = string;');
    };
    return DurationWKT;
}());
exports.DurationWKT = DurationWKT;
//# sourceMappingURL=duration.wkt.js.map