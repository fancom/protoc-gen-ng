"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceClientMethod = void 0;
var services_1 = require("../../services");
var utils_1 = require("../../utils");
var dependencies_1 = require("../misc/dependencies");
var ServiceClientMethod = /** @class */ (function () {
    function ServiceClientMethod(proto, service, serviceMethod) {
        this.proto = proto;
        this.service = service;
        this.serviceMethod = serviceMethod;
        this.serviceUrlPrefix = this.proto.pb_package ? this.proto.pb_package + '.' : '';
        this.inputType = this.proto.getRelativeTypeName(this.serviceMethod.inputType, 'thisProto');
        this.outputType = this.proto.getRelativeTypeName(this.serviceMethod.outputType, 'thisProto');
        this.rpcPath = "/".concat(this.serviceUrlPrefix).concat(this.service.name, "/").concat(this.serviceMethod.name);
    }
    ServiceClientMethod.prototype.printMethod = function (printer) {
        services_1.Services.Logger.debug("Start printing service client method ".concat(this.serviceMethod.name, " @ ").concat(this.service.name, " in proto ").concat(this.proto.name));
        printer.addDeps(dependencies_1.ExternalDependencies.GrpcMetadata, dependencies_1.ExternalDependencies.Observable, dependencies_1.ExternalDependencies.takeMessages, dependencies_1.ExternalDependencies.throwStatusErrors);
        var deprecationNote = !!this.serviceMethod.options && this.serviceMethod.options.deprecated ? '@deprecated' : '';
        var requestDataType = this.serviceMethod.clientStreaming ? "Observable<".concat(this.inputType, ">") : this.inputType;
        var responseDataType = "Observable<".concat(this.outputType, ">");
        var description = '';
        if (!this.serviceMethod.serverStreaming && !this.serviceMethod.clientStreaming) {
            description = 'Unary call';
        }
        if (this.serviceMethod.serverStreaming && !this.serviceMethod.clientStreaming) {
            description = 'Server streaming';
        }
        if (!this.serviceMethod.serverStreaming && this.serviceMethod.clientStreaming) {
            description = 'Client streaming';
        }
        if (this.serviceMethod.serverStreaming && this.serviceMethod.clientStreaming) {
            description = 'Bidirectional streaming';
        }
        printer.add("\n      /**\n       * ".concat(description, " @").concat(this.rpcPath, "\n       * ").concat(deprecationNote, "\n       * @param requestMessage Request message\n       * @param requestMetadata Request metadata\n       * @returns Observable<").concat(this.outputType, ">\n       */\n      ").concat((0, utils_1.camelizeSafe)(this.serviceMethod.name), "(requestData: ").concat(requestDataType, ", requestMetadata = new GrpcMetadata()): ").concat(responseDataType, " {\n        return this.$raw.").concat((0, utils_1.camelizeSafe)(this.serviceMethod.name), "(requestData, requestMetadata).pipe(throwStatusErrors(), takeMessages());\n      }\n    "));
        services_1.Services.Logger.debug("End printing service client method ".concat(this.serviceMethod.name, " @ ").concat(this.service.name, " in proto ").concat(this.proto.name));
    };
    ServiceClientMethod.prototype.printRawMethod = function (printer) {
        services_1.Services.Logger.debug("Start printing $raw service client method ".concat(this.serviceMethod.name, " @ ").concat(this.service.name, " in proto ").concat(this.proto.name));
        printer.addDeps(dependencies_1.ExternalDependencies.GrpcCallType, dependencies_1.ExternalDependencies.GrpcEvent, dependencies_1.ExternalDependencies.GrpcMetadata, dependencies_1.ExternalDependencies.Observable);
        var deprecationNote = !!this.serviceMethod.options && this.serviceMethod.options.deprecated ? '@deprecated' : '';
        var requestDataType = this.serviceMethod.clientStreaming ? "Observable<".concat(this.inputType, ">") : this.inputType;
        var responseDataType = "Observable<GrpcEvent<".concat(this.outputType, ">>");
        var description = '';
        var type = '';
        if (!this.serviceMethod.serverStreaming && !this.serviceMethod.clientStreaming) {
            description = 'Unary call';
            type = 'unary';
        }
        if (this.serviceMethod.serverStreaming && !this.serviceMethod.clientStreaming) {
            description = 'Server streaming';
            type = 'serverStream';
        }
        if (!this.serviceMethod.serverStreaming && this.serviceMethod.clientStreaming) {
            description = 'Client streaming';
            type = 'clientStream';
        }
        if (this.serviceMethod.serverStreaming && this.serviceMethod.clientStreaming) {
            description = 'Bidirectional streaming';
            type = 'bidiStream';
        }
        printer.add("\n      /**\n       * ".concat(description, ": ").concat(this.rpcPath, "\n       * ").concat(deprecationNote, "\n       * @param requestMessage Request message\n       * @param requestMetadata Request metadata\n       * @returns Observable<GrpcEvent<").concat(this.outputType, ">>\n       */\n      ").concat((0, utils_1.camelizeSafe)(this.serviceMethod.name), ": (requestData: ").concat(requestDataType, ", requestMetadata = new GrpcMetadata()): ").concat(responseDataType, " => {\n        return this.handler.handle({\n          type: GrpcCallType.").concat(type, ",\n          client: this.client,\n          path: '").concat(this.rpcPath, "',\n          requestData,\n          requestMetadata,\n          requestClass: ").concat(this.inputType, ",\n          responseClass: ").concat(this.outputType, ",\n        });\n      }\n    "));
        services_1.Services.Logger.debug("End printing $raw service client method ".concat(this.serviceMethod.name, " @ ").concat(this.service.name, " in proto ").concat(this.proto.name));
    };
    return ServiceClientMethod;
}());
exports.ServiceClientMethod = ServiceClientMethod;
//# sourceMappingURL=service-client-method.js.map