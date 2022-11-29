"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PbwscFile = void 0;
var path_1 = require("path");
var services_1 = require("../../services");
var worker_service_client_1 = require("../types/worker-service-client");
var PbwscFile = /** @class */ (function () {
    function PbwscFile(proto) {
        this.proto = proto;
    }
    PbwscFile.prototype.print = function (printer) {
        var _this = this;
        services_1.Services.Logger.debug("Start printing pbwsc for ".concat(this.proto.name));
        var fileName = (0, path_1.basename)(this.proto.getGeneratedFileBaseName());
        printer.addLine("import * as thisProto from './".concat(fileName, "';"));
        printer.add(this.proto.getImportedDependencies());
        this.proto.serviceList.forEach(function (service) { return new worker_service_client_1.WorkerServiceClient(_this.proto, service).print(printer); });
        services_1.Services.Logger.debug("End printing pbwsc for ".concat(this.proto.name));
    };
    return PbwscFile;
}());
exports.PbwscFile = PbwscFile;
//# sourceMappingURL=pbwsc-file.js.map