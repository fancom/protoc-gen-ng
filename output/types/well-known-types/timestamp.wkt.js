"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimestampWKT = void 0;
var TimestampWKT = /** @class */ (function () {
    function TimestampWKT() {
    }
    TimestampWKT.prototype.printStaticMethods = function (printer) {
        printer.addLine("\n      static fromDate(date: Date) {\n        const timestamp = new Timestamp();\n\n        timestamp.fromDate(date);\n\n        return timestamp;\n      }\n\n      static fromISOString(isoDate: string) {\n        const timestamp = new Timestamp();\n\n        timestamp.fromISOString(isoDate);\n\n        return timestamp;\n      }\n    ");
    };
    TimestampWKT.prototype.printMemberMethods = function (printer) {
        printer.addLine("\n      fromDate(date: Date) {\n        this.seconds = ''+Math.floor(date.getTime() / 1e3);\n        this.nanos = date.getMilliseconds() * 1e6;\n      }\n\n      toDate() {\n        return new Date(parseInt(this.seconds || '0') * 1e3 + (this.nanos || 0) / 1e6);\n      }\n\n      fromISOString(isoDate: string) {\n        this.fromDate(new Date(isoDate));\n      }\n\n      toISOString() {\n        return this.toDate().toISOString();\n      }\n    ");
    };
    TimestampWKT.prototype.printToProtobufJSON = function (printer) {
        printer.addLine('return this.toISOString();');
    };
    TimestampWKT.prototype.printAsProtobufJSON = function (printer) {
        printer.addLine('export type AsProtobufJSON = string;');
    };
    return TimestampWKT;
}());
exports.TimestampWKT = TimestampWKT;
//# sourceMappingURL=timestamp.wkt.js.map