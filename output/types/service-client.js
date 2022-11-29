"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceClient = void 0;
var services_1 = require("../../services");
var dependencies_1 = require("../misc/dependencies");
var service_client_method_1 = require("./service-client-method");
var ServiceClient = /** @class */ (function () {
    function ServiceClient(proto, service, serviceClientConfig) {
        this.proto = proto;
        this.service = service;
        this.serviceClientConfig = serviceClientConfig;
    }
    ServiceClient.prototype.print = function (printer) {
        var _this = this;
        services_1.Services.Logger.debug("Start printing service client ".concat(this.service.name, " in proto ").concat(this.proto.name));
        var tokenName = this.serviceClientConfig.getTokenName();
        printer.addDeps(dependencies_1.ExternalDependencies.GrpcClient, dependencies_1.ExternalDependencies.GrpcHandler, dependencies_1.ExternalDependencies.Inject, dependencies_1.ExternalDependencies.Injectable, dependencies_1.ExternalDependencies.Optional, dependencies_1.ExternalDependencies.GrpcClientFactory, dependencies_1.ExternalDependencies.GRPC_CLIENT_FACTORY);
        var serviceId = (this.proto.pb_package ? this.proto.pb_package + '.' : '') + this.service.name;
        var providedIn = services_1.Services.Config.files.pbsc.serviceClientProvidedIn;
        var injectable = providedIn === 'none' ? '' : "{ providedIn: '".concat(providedIn, "' }");
        printer.add("\n      /**\n       * Service client implementation for ".concat(serviceId, "\n       */\n      @Injectable(").concat(injectable, ")\n      export class ").concat(this.service.name, "Client {\n\n        private client: GrpcClient<any>;\n\n        /**\n         * Raw RPC implementation for each service client method.\n         * The raw methods provide more control on the incoming data and events. E.g. they can be useful to read status `OK` metadata.\n         * Attention: these methods do not throw errors when non-zero status codes are received.\n         */\n        $raw = {"));
        this.service.methodList.forEach(function (method) {
            var serviceClientMethod = new service_client_method_1.ServiceClientMethod(_this.proto, _this.service, method);
            serviceClientMethod.printRawMethod(printer);
            printer.add(',');
            printer.newLine();
            printer.newLine();
        });
        printer.add("\n        };\n\n        constructor(\n          @Optional() @Inject(".concat(tokenName, ") settings: any,\n          @Inject(GRPC_CLIENT_FACTORY) clientFactory: GrpcClientFactory<any>,\n          private handler: GrpcHandler,\n        ) {\n          this.client = clientFactory.createClient('").concat(serviceId, "', settings);\n        }\n    "));
        this.service.methodList.forEach(function (method) {
            var serviceClientMethod = new service_client_method_1.ServiceClientMethod(_this.proto, _this.service, method);
            serviceClientMethod.printMethod(printer);
            printer.newLine();
            printer.newLine();
        });
        printer.add('}');
        services_1.Services.Logger.debug("End printing service client ".concat(this.service.name, " in proto ").concat(this.proto.name));
    };
    return ServiceClient;
}());
exports.ServiceClient = ServiceClient;
//# sourceMappingURL=service-client.js.map