"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PbConfFile = void 0;
var services_1 = require("../../services");
var service_client_config_1 = require("../types/service-client-config");
var PbConfFile = /** @class */ (function () {
    function PbConfFile(proto) {
        this.proto = proto;
    }
    PbConfFile.prototype.print = function (printer) {
        var _this = this;
        services_1.Services.Logger.debug("Start printing pbconf for ".concat(this.proto.name));
        var serviceClientConfigs = [];
        this.proto.serviceList.forEach(function (service) { return serviceClientConfigs.push(new service_client_config_1.ServiceClientConfig(_this.proto, service)); });
        serviceClientConfigs.forEach(function (serviceClientConfig) { return serviceClientConfig.print(printer); });
        services_1.Services.Logger.debug("End printing pbconf for ".concat(this.proto.name));
    };
    return PbConfFile;
}());
exports.PbConfFile = PbConfFile;
//# sourceMappingURL=pbconf-file.js.map