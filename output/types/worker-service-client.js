"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkerServiceClient = void 0;
var dependencies_1 = require("../misc/dependencies");
var WorkerServiceClient = /** @class */ (function () {
    function WorkerServiceClient(proto, service) {
        this.proto = proto;
        this.service = service;
    }
    WorkerServiceClient.prototype.print = function (printer) {
        var _this = this;
        printer.addDeps(dependencies_1.ExternalDependencies.GrpcCallType, dependencies_1.ExternalDependencies.GrpcWorkerServiceClientDef);
        var serviceName = (this.proto.pb_package ? this.proto.pb_package + '.' : '') + this.service.name;
        var serviceId = (this.proto.pb_package ? this.proto.pb_package + '.' : '') + this.service.name;
        var methods = this.service.methodList.map(function (method) {
            var inputType = _this.proto.getRelativeTypeName(method.inputType, 'thisProto');
            var outputType = _this.proto.getRelativeTypeName(method.outputType, 'thisProto');
            var type = '';
            if (!method.serverStreaming && !method.clientStreaming) {
                type = 'unary';
            }
            if (method.serverStreaming && !method.clientStreaming) {
                type = 'serverStream';
            }
            if (!method.serverStreaming && method.clientStreaming) {
                type = 'clientStream';
            }
            if (method.serverStreaming && method.clientStreaming) {
                type = 'bidiStream';
            }
            return "'/".concat(serviceName, "/").concat(method.name, "': { type: GrpcCallType.").concat(type, ", reqclss: ").concat(inputType, ", resclss: ").concat(outputType, " }");
        });
        printer.add("\n      /**\n       * Client definition for use in worker\n       */\n      export const GrpcWorker".concat(this.service.name, "ClientDef: GrpcWorkerServiceClientDef = {\n        serviceId: '").concat(serviceId, "',\n        methods: {\n          ").concat(methods.join(',\n'), "\n        },\n      };\n    "));
    };
    return WorkerServiceClient;
}());
exports.WorkerServiceClient = WorkerServiceClient;
//# sourceMappingURL=worker-service-client.js.map