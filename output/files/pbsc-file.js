"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PbscFile = void 0;
var path_1 = require("path");
var services_1 = require("../../services");
var service_client_1 = require("../types/service-client");
var service_client_config_1 = require("../types/service-client-config");
var PbscFile = /** @class */ (function () {
    function PbscFile(proto) {
        this.proto = proto;
    }
    PbscFile.prototype.print = function (printer) {
        var _this = this;
        services_1.Services.Logger.debug("Start printing pbsc for ".concat(this.proto.name));
        var serviceClientConfigs = [];
        var serviceClients = [];
        this.proto.serviceList.forEach(function (service) {
            var serviceClientConfig = new service_client_config_1.ServiceClientConfig(_this.proto, service);
            var serviceClient = new service_client_1.ServiceClient(_this.proto, service, serviceClientConfig);
            serviceClientConfigs.push(serviceClientConfig);
            serviceClients.push(serviceClient);
        });
        var fileName = (0, path_1.basename)(this.proto.getGeneratedFileBaseName());
        printer.addLine("import * as thisProto from './".concat(fileName, "';"));
        printer.add(this.proto.getImportedDependencies());
        if (serviceClientConfigs.length) {
            printer.add("import {".concat(serviceClientConfigs.map(function (scc) { return scc.getTokenName(); }).join(','), "} from './").concat(fileName, "conf';"));
        }
        serviceClients.forEach(function (serviceClient) { return serviceClient.print(printer); });
        services_1.Services.Logger.debug("End printing pbsc for ".concat(this.proto.name));
    };
    return PbscFile;
}());
exports.PbscFile = PbscFile;
//# sourceMappingURL=pbsc-file.js.map