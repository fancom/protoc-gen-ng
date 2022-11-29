"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnyWKT = void 0;
var dependencies_1 = require("../../misc/dependencies");
var AnyWKT = /** @class */ (function () {
    function AnyWKT() {
    }
    AnyWKT.prototype.printStaticMethods = function (printer) {
        printer.addLine("\n      private static prefix = 'type.googleapis.com/';\n\n      /**\n       * Create a new Any instance with a packed message\n       */\n      static pack(msg: GrpcMessage) {\n        const any = new Any();\n\n        any.pack(msg);\n\n        return any;\n      }\n    ");
    };
    AnyWKT.prototype.printMemberMethods = function (printer) {
        printer.addDeps(dependencies_1.ExternalDependencies.GrpcMessage, dependencies_1.ExternalDependencies.GrpcMessageClass, dependencies_1.ExternalDependencies.GrpcMessagePool);
        printer.addLine("\n      /**\n       * Get the packed message id based on typeUrl.\n       * If no typeUrl is provided null is returned.\n       */\n      getPackedMessageId() {\n        if (!this.typeUrl) {\n          return null;\n        }\n\n        if (!this.typeUrl.startsWith(Any.prefix)) {\n          throw new Error(`Type URL does not start with ${Any.prefix}`);\n        }\n\n        return this.typeUrl.substr(Any.prefix.length);\n      }\n\n      /**\n       * Get the type of the packed message.\n       * Requires predefined GrpcMessagePool with expected message types within.\n       * If no type is found within the pool the error is thrown, unless throwWhenNotInThePool is set to false; in this case null will be returned.\n       */\n      getPackedMessageType(messagePool: GrpcMessagePool, throwWhenNotInThePool = true) {\n        const id = this.getPackedMessageId();\n\n        if (!id) {\n          return null;\n        }\n\n        const msgClass = messagePool.get(id);\n\n        if (!msgClass) {\n          if (throwWhenNotInThePool) {\n            throw new Error(`Message with identifier '${this.typeUrl}' is not present in message pool`);\n          } else {\n            return null;\n          }\n        }\n\n        return msgClass;\n      }\n\n      /**\n       * Unpack the current value into a message.\n       * Requires predefined GrpcMessagePool with expected message types within.\n       * If no type is found within the pool the error is thrown.\n       */\n      unpack<M extends GrpcMessage>(messagePool: GrpcMessagePool): M {\n        const messageClass = this.getPackedMessageType(messagePool);\n\n        if (!messageClass) {\n          throw new Error(`Message type cannot be resolved`);\n        }\n\n        if (!this.value) {\n          throw new Error(`Cannot unpack value that is unset`);\n        }\n\n        return messageClass.deserializeBinary(this.value) as M;\n      }\n\n      /**\n       * Pack the given message into current Any instance\n       */\n      pack(msg: GrpcMessage) {\n        const { id } = msg.constructor as GrpcMessageClass<any>;\n\n        if (!id) {\n          throw new Error(`Message is invalid or does not have an id`);\n        }\n\n        this.typeUrl = `${Any.prefix}${id}`;\n        this.value = msg.serializeBinary();\n      }\n    ");
    };
    AnyWKT.prototype.printToProtobufJSON = function (printer) {
        printer.addLine("\n      if (!options?.messagePool) {\n        throw new Error(`Message pool is required to cast Any to JSON`);\n      }\n\n      const msg = this.unpack(options.messagePool);\n\n      if (!msg) {\n        return { '@type': this.typeUrl! };\n      }\n\n      const json = msg.toProtobufJSON(options);\n\n      if (typeof json !== 'object') {\n        return { '@type': this.typeUrl!, value: json };\n      }\n\n      return { ...json, '@type': this.typeUrl! };\n    ");
    };
    AnyWKT.prototype.printAsProtobufJSON = function (printer) {
        printer.addLine("export type AsProtobufJSON = {\n      '@type': string;\n      value?: string;\n      [prop: string]: any;\n    };");
    };
    return AnyWKT;
}());
exports.AnyWKT = AnyWKT;
//# sourceMappingURL=any.wkt.js.map