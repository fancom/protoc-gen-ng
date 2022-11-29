"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
var types_1 = require("../../input/types");
var services_1 = require("../../services");
var dependencies_1 = require("../misc/dependencies");
var helpers_1 = require("../misc/helpers");
var enum_1 = require("./enum");
var boolean_message_field_1 = require("./fields/boolean-message-field");
var bytes_message_field_1 = require("./fields/bytes-message-field");
var enum_message_field_1 = require("./fields/enum-message-field");
var map_message_field_1 = require("./fields/map-message-field");
var message_message_field_1 = require("./fields/message-message-field");
var number_message_field_1 = require("./fields/number-message-field");
var string_message_field_1 = require("./fields/string-message-field");
var oneof_1 = require("./oneof");
var any_wkt_1 = require("./well-known-types/any.wkt");
var api_wkt_1 = require("./well-known-types/api.wkt");
var duration_wkt_1 = require("./well-known-types/duration.wkt");
var empty_wkt_1 = require("./well-known-types/empty.wkt");
var field_mask_wkt_1 = require("./well-known-types/field-mask.wkt");
var source_context_wkt_1 = require("./well-known-types/source-context.wkt");
var struct_wkt_1 = require("./well-known-types/struct.wkt");
var timestamp_wkt_1 = require("./well-known-types/timestamp.wkt");
var type_wkt_1 = require("./well-known-types/type.wkt");
var wrappers_wkt_1 = require("./well-known-types/wrappers.wkt");
var Message = /** @class */ (function () {
    function Message(proto, message) {
        var _this = this;
        this.proto = proto;
        this.message = message;
        this.isWkt = false;
        if (this.proto.pb_package === 'google.protobuf' ||
            (!!services_1.Services.Config.customWellKnownTypes && !!services_1.Services.Config.customWellKnownTypes[this.proto.pb_package])) {
            this.isWkt = true;
            switch (this.message.name) {
                case 'Any':
                    this.wkt = new any_wkt_1.AnyWKT();
                    break;
                case 'Api':
                    this.wkt = new api_wkt_1.ApiWKT();
                    break;
                case 'BoolValue':
                    this.wkt = new wrappers_wkt_1.BoolValueWKT();
                    break;
                case 'BytesValue':
                    this.wkt = new wrappers_wkt_1.BytesValueWKT();
                    break;
                case 'DoubleValue':
                    this.wkt = new wrappers_wkt_1.DoubleValueWKT();
                    break;
                case 'Duration':
                    this.wkt = new duration_wkt_1.DurationWKT();
                    break;
                case 'Empty':
                    this.wkt = new empty_wkt_1.EmptyWKT();
                    break;
                case 'Enum':
                    this.wkt = new type_wkt_1.EnumWKT();
                    break;
                case 'EnumValue':
                    this.wkt = new type_wkt_1.EnumValueWKT();
                    break;
                case 'Field':
                    this.wkt = new type_wkt_1.FieldWKT();
                    break;
                case 'FieldMask':
                    this.wkt = new field_mask_wkt_1.FieldMaskWKT();
                    break;
                case 'FloatValue':
                    this.wkt = new wrappers_wkt_1.FloatValueWKT();
                    break;
                case 'Int32Value':
                    this.wkt = new wrappers_wkt_1.Int32ValueWKT();
                    break;
                case 'Int64Value':
                    this.wkt = new wrappers_wkt_1.Int64ValueWKT();
                    break;
                case 'ListValue':
                    this.wkt = new struct_wkt_1.ListValueWKT();
                    break;
                case 'Method':
                    this.wkt = new api_wkt_1.MethodWKT();
                    break;
                case 'Mixin':
                    this.wkt = new api_wkt_1.MixinWKT();
                    break;
                case 'Option':
                    this.wkt = new type_wkt_1.OptionWKT();
                    break;
                case 'SourceContext':
                    this.wkt = new source_context_wkt_1.SourceContextWKT();
                    break;
                case 'StringValue':
                    this.wkt = new wrappers_wkt_1.StringValueWKT();
                    break;
                case 'Struct':
                    this.wkt = new struct_wkt_1.StructWKT();
                    break;
                case 'Timestamp':
                    this.wkt = new timestamp_wkt_1.TimestampWKT();
                    break;
                case 'Type':
                    this.wkt = new type_wkt_1.TypeWKT();
                    break;
                case 'UInt32Value':
                    this.wkt = new wrappers_wkt_1.UInt32ValueWKT();
                    break;
                case 'UInt64Value':
                    this.wkt = new wrappers_wkt_1.UInt64ValueWKT();
                    break;
                case 'Value':
                    this.wkt = new struct_wkt_1.ValueWKT();
                    break;
            }
        }
        var allOneOfs = this.message.oneofDeclList.map(function (od) { return new oneof_1.OneOf(_this.proto, _this.message, od); });
        this.oneOfs = allOneOfs.filter(function (oneOf) { return !oneOf.isSyntheticOneOf(); });
        this.messageFields = this.message.fieldList.map(function (field) {
            var oneOf = typeof field.oneofIndex === 'number' && !field.proto3Optional
                ? allOneOfs[field.oneofIndex]
                : undefined;
            if ((0, helpers_1.isFieldMap)(_this.proto, field)) {
                return new map_message_field_1.MapMessageField(_this.proto, _this.message, field, oneOf);
            }
            else if ((0, helpers_1.isFieldMessage)(field)) {
                return new message_message_field_1.MessageMessageField(_this.proto, _this.message, field, oneOf);
            }
            else {
                switch (field.type) {
                    case types_1.ProtoMessageFieldType.bool:
                        return new boolean_message_field_1.BooleanMessageField(_this.proto, _this.message, field, oneOf);
                    case types_1.ProtoMessageFieldType.bytes:
                        return new bytes_message_field_1.BytesMessageField(_this.proto, _this.message, field, oneOf);
                    case types_1.ProtoMessageFieldType.enum:
                        return new enum_message_field_1.EnumMessageField(_this.proto, _this.message, field, oneOf);
                    case types_1.ProtoMessageFieldType.string:
                        return new string_message_field_1.StringMessageField(_this.proto, _this.message, field, oneOf);
                    case types_1.ProtoMessageFieldType.double:
                    case types_1.ProtoMessageFieldType.fixed32:
                    case types_1.ProtoMessageFieldType.float:
                    case types_1.ProtoMessageFieldType.int32:
                    case types_1.ProtoMessageFieldType.sfixed32:
                    case types_1.ProtoMessageFieldType.sint32:
                    case types_1.ProtoMessageFieldType.uint32:
                    case types_1.ProtoMessageFieldType.fixed64:
                    case types_1.ProtoMessageFieldType.int64:
                    case types_1.ProtoMessageFieldType.sfixed64:
                    case types_1.ProtoMessageFieldType.sint64:
                    case types_1.ProtoMessageFieldType.uint64:
                        return new number_message_field_1.NumberMessageField(_this.proto, _this.message, field, oneOf);
                    default: throw new Error('Unknown data type ' + field.type);
                }
            }
        });
    }
    Message.prototype.print = function (printer) {
        var _a, _b, _c, _d;
        printer.addDeps(dependencies_1.ExternalDependencies.BinaryReader, dependencies_1.ExternalDependencies.BinaryWriter, dependencies_1.ExternalDependencies.ByteSource, dependencies_1.ExternalDependencies.GrpcMessage, dependencies_1.ExternalDependencies.RecursivePartial);
        var constructorComment = "Message implementation for ".concat(this.message.id);
        if (this.isWkt) {
            if (this.proto.pb_package === 'google.protobuf') {
                constructorComment = 'Well known type, more at https://developers.google.com/protocol-buffers/docs/reference/google.protobuf';
            }
            else {
                constructorComment = 'Custom well known type';
            }
        }
        printer.addLine("\n    /**\n     * ".concat(constructorComment, "\n     */\n    export class ").concat(this.message.name, " implements GrpcMessage {\n\n      static id = '").concat(this.message.id, "';\n\n      /**\n       * Deserialize binary data to message\n       * @param instance message instance\n       */\n      static deserializeBinary(bytes: ByteSource) {\n        const instance = new ").concat(this.message.name, "();\n        ").concat(this.message.name, ".deserializeBinaryFromReader(instance, new BinaryReader(bytes));\n        return instance;\n      }\n    "));
        (_b = (_a = this.wkt) === null || _a === void 0 ? void 0 : _a.printStaticMethods) === null || _b === void 0 ? void 0 : _b.call(_a, printer);
        this.printStaticRefineValues(printer);
        printer.newLine();
        this.printStaticDeserializeBinaryFromReader(printer);
        printer.newLine();
        this.printStaticSerializeBinaryToWriter(printer);
        printer.newLine();
        this.messageFields.forEach(function (f) {
            f.printPrivateAttribute(printer);
            printer.newLine();
        });
        printer.newLine();
        this.oneOfs.forEach(function (oneof) {
            oneof.printPrivateAttribute(printer);
            printer.newLine();
        });
        this.printConstructor(printer);
        this.printGettersAndSetters(printer);
        this.oneOfs.forEach(function (oneof) {
            oneof.printGetter(printer);
            printer.newLine();
        });
        printer.addLine("\n      /**\n       * Serialize message to binary data\n       * @param instance message instance\n       */\n      serializeBinary() {\n        const writer = new BinaryWriter();\n        ".concat(this.message.name, ".serializeBinaryToWriter(this, writer);\n        return writer.getResultBuffer();\n      }\n    "));
        this.printToObject(printer);
        this.printToJSON(printer);
        this.printToProtobufJSON(printer);
        (_d = (_c = this.wkt) === null || _c === void 0 ? void 0 : _c.printMemberMethods) === null || _d === void 0 ? void 0 : _d.call(_c, printer);
        printer.addLine('}');
        this.printSubTypes(printer);
    };
    Message.prototype.printStaticRefineValues = function (printer) {
        printer.addLine("\n      /**\n       * Check all the properties and set default protobuf values if necessary\n       * @param _instance message instance\n       */\n      static refineValues(_instance: ".concat(this.message.name, ") {\n    "));
        this.messageFields.forEach(function (f) {
            f.printDefaultValueSetter(printer);
            printer.newLine();
        });
        printer.addLine('}');
    };
    Message.prototype.printStaticDeserializeBinaryFromReader = function (printer) {
        printer.addLine("\n      /**\n       * Deserializes / reads binary message into message instance using provided binary reader\n       * @param _instance message instance\n       * @param _reader binary reader instance\n       */\n      static deserializeBinaryFromReader(_instance: ".concat(this.message.name, ", _reader: BinaryReader) {\n        while (_reader.nextField()) {\n          if (_reader.isEndGroup()) break;\n\n          switch (_reader.getFieldNumber()) {"));
        this.messageFields.forEach(function (f) {
            f.printDeserializeBinaryFromReader(printer);
            printer.newLine();
        });
        printer.addLine("default: _reader.skipField();\n          }\n        }\n\n        ".concat(this.message.name, ".refineValues(_instance);\n      }"));
    };
    Message.prototype.printStaticSerializeBinaryToWriter = function (printer) {
        printer.addLine("\n      /**\n       * Serializes a message to binary format using provided binary reader\n       * @param _instance message instance\n       * @param _writer binary writer instance\n       */\n      static serializeBinaryToWriter(_instance: ".concat(this.message.name, ", _writer: BinaryWriter) {\n    "));
        this.messageFields.forEach(function (f) {
            f.printSerializeBinaryToWriter(printer);
            printer.newLine();
        });
        printer.addLine('}');
    };
    Message.prototype.printGettersAndSetters = function (printer) {
        this.messageFields.forEach(function (f) {
            f.printGetter(printer);
            printer.newLine();
            f.printSetter(printer);
            printer.newLine();
        });
    };
    Message.prototype.printConstructor = function (printer) {
        printer.addLine("\n      /**\n       * Message constructor. Initializes the properties and applies default Protobuf values if necessary\n       * @param _value initial values object or instance of ".concat(this.message.name, " to deeply clone from\n       */\n      constructor(_value?: RecursivePartial<").concat(this.message.name, ".AsObject>) {\n    "));
        printer.addLine('_value = _value || {};');
        this.messageFields.forEach(function (f) {
            f.printInitializer(printer);
            printer.newLine();
        });
        printer.addLine("".concat(this.message.name, ".refineValues(this);"));
        printer.addLine('}');
    };
    Message.prototype.printAsObjectInterface = function (printer) {
        printer.addLine("\n      /**\n       * Standard JavaScript object representation for ".concat(this.message.name, "\n       */\n      export interface AsObject {\n    "));
        this.messageFields.forEach(function (f) {
            f.printAsObjectMapping(printer);
            printer.newLine();
        });
        printer.addLine('}');
    };
    Message.prototype.printToObject = function (printer) {
        printer.addLine("\n      /**\n       * Cast message to standard JavaScript object (all non-primitive values are deeply cloned)\n       */\n      toObject(): ".concat(this.message.name, ".AsObject {\n    "));
        printer.addLine('return {');
        this.messageFields.forEach(function (f) {
            f.printToObjectMapping(printer);
            printer.newLine();
        });
        printer.addLine('};');
        printer.addLine('}');
    };
    Message.prototype.printAsJSONInterface = function (printer) {
        var _a;
        printer.addLine("\n      /**\n       * Protobuf JSON representation for ".concat(this.message.name, "\n       */"));
        if ((_a = this.wkt) === null || _a === void 0 ? void 0 : _a.printAsProtobufJSON) {
            this.wkt.printAsProtobufJSON(printer);
        }
        else {
            printer.addLine('export interface AsProtobufJSON {');
            this.messageFields.forEach(function (f) {
                f.printAsJSONMapping(printer);
                printer.newLine();
            });
            printer.addLine('}');
        }
    };
    Message.prototype.printToJSON = function (printer) {
        printer.addLine("\n      /**\n       * Convenience method to support JSON.stringify(message), replicates the structure of toObject()\n       */\n      toJSON() { return this.toObject(); }\n    ");
    };
    Message.prototype.printToProtobufJSON = function (printer) {
        var _a;
        printer.addDeps(dependencies_1.ExternalDependencies.ToProtobufJSONOptions);
        printer.addLine("\n      /**\n       * Cast message to JSON using protobuf JSON notation: https://developers.google.com/protocol-buffers/docs/proto3#json\n       * Attention: output differs from toObject() e.g. enums are represented as names and not as numbers, Timestamp is an ISO Date string format etc.\n       * If the message itself or some of descendant messages is google.protobuf.Any, you MUST provide a message pool as options. If not, the messagePool is not required\n       */");
        printer.addLine("toProtobufJSON(\n      // @ts-ignore\n      options?: ToProtobufJSONOptions\n    ): ".concat(this.message.name, ".AsProtobufJSON {"));
        if ((_a = this.wkt) === null || _a === void 0 ? void 0 : _a.printToProtobufJSON) {
            this.wkt.printToProtobufJSON(printer);
        }
        else {
            printer.addLine('return {');
            this.messageFields.forEach(function (f) {
                f.printToProtobufJSONMapping(printer);
                printer.newLine();
            });
            printer.addLine('};');
        }
        printer.addLine('}');
    };
    Message.prototype.printSubTypes = function (printer) {
        var _this = this;
        printer.addLine("export module ".concat(this.message.name, " {"));
        this.printAsObjectInterface(printer);
        this.printAsJSONInterface(printer);
        this.oneOfs.forEach(function (oneof) { return oneof.printEnum(printer); });
        this.message.enumTypeList.forEach(function (protoEnum) { return new enum_1.Enum(_this.proto, protoEnum).print(printer); });
        this.message.nestedTypeList.forEach(function (protoMessage) { return new Message(_this.proto, protoMessage).print(printer); });
        printer.addLine('}');
    };
    return Message;
}());
exports.Message = Message;
//# sourceMappingURL=message.js.map