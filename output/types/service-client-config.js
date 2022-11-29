"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceClientConfig = void 0;
var utils_1 = require("../../utils");
var dependencies_1 = require("../misc/dependencies");
var ServiceClientConfig = /** @class */ (function () {
    function ServiceClientConfig(proto, service) {
        this.proto = proto;
        this.service = service;
    }
    ServiceClientConfig.prototype.getTokenName = function () {
        return "GRPC_".concat((0, utils_1.pascalize)(this.service.name), "_CLIENT_SETTINGS");
    };
    ServiceClientConfig.prototype.print = function (printer) {
        printer.addDeps(dependencies_1.ExternalDependencies.InjectionToken);
        printer.addLine("\n      /**\n       * Specific GrpcClientSettings for ".concat((0, utils_1.classify)(this.service.name), ".\n       * Use it only if your default settings are not set or the service requires other settings.\n       */\n      export const ").concat(this.getTokenName(), " = new InjectionToken<any>('").concat(this.getTokenName(), "');\n    "));
    };
    return ServiceClientConfig;
}());
exports.ServiceClientConfig = ServiceClientConfig;
//# sourceMappingURL=service-client-config.js.map