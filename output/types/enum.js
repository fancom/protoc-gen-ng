"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Enum = void 0;
var utils_1 = require("../../utils");
var Enum = /** @class */ (function () {
    function Enum(proto, protoEnum) {
        this.proto = proto;
        this.protoEnum = protoEnum;
    }
    Enum.prototype.print = function (printer) {
        printer.add("export enum ".concat((0, utils_1.classify)(this.protoEnum.name), " {\n      ").concat(this.protoEnum.valueList.map(function (v) { return "".concat((0, utils_1.preserveCaseSafe)(v.name), " = ").concat(v.number); }).join(','), "\n    }"));
    };
    return Enum;
}());
exports.Enum = Enum;
//# sourceMappingURL=enum.js.map