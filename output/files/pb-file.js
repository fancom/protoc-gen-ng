"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PbFile = void 0;
var services_1 = require("../../services");
var enum_1 = require("../types/enum");
var message_1 = require("../types/message");
var PbFile = /** @class */ (function () {
    function PbFile(proto) {
        this.proto = proto;
    }
    PbFile.prototype.print = function (printer) {
        var _this = this;
        services_1.Services.Logger.debug("Start printing pb for ".concat(this.proto.name));
        printer.add(this.proto.getImportedDependencies());
        this.proto.enumTypeList.forEach(function (protoEnum) {
            var enumInstance = new enum_1.Enum(_this.proto, protoEnum);
            enumInstance.print(printer);
        });
        this.proto.messageTypeList.forEach(function (protoMessage) {
            var message = new message_1.Message(_this.proto, protoMessage);
            message.print(printer);
        });
        services_1.Services.Logger.debug("End printing pb for ".concat(this.proto.name));
    };
    return PbFile;
}());
exports.PbFile = PbFile;
//# sourceMappingURL=pb-file.js.map