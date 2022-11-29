"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Proto = void 0;
var tslib_1 = require("tslib");
var services_1 = require("../services");
var utils_1 = require("../utils");
var proto_enum_1 = require("./proto-enum");
var proto_message_1 = require("./proto-message");
var proto_service_1 = require("./proto-service");
var Proto = /** @class */ (function () {
    function Proto(value) {
        var _a, _b, _c;
        this.resolved = {};
        this.messageIndex = new Map();
        this.name = (_a = value.name) !== null && _a !== void 0 ? _a : '';
        this.pb_package = (_b = value.pb_package) !== null && _b !== void 0 ? _b : ''; // eslint-disable-line
        this.dependencyList = value.dependencyList || [];
        this.publicDependencyList = value.publicDependencyList;
        this.weakDependencyList = value.weakDependencyList;
        this.messageTypeList = (value.messageTypeList || []).map(function (e) { return new proto_message_1.ProtoMessage(e); });
        this.enumTypeList = value.enumTypeList.map(function (e) { return new proto_enum_1.ProtoEnum(e); });
        this.serviceList = value.serviceList.map(function (e) { return new proto_service_1.ProtoService(e); });
        this.extensionList = value.extensionList;
        this.syntax = (_c = value.syntax) !== null && _c !== void 0 ? _c : '';
        this.index();
    }
    Proto.prototype.index = function () {
        var _this = this;
        var indexEnums = function (path, enums) {
            enums.forEach(function (oneEnum) {
                _this.messageIndex.set(path + '.' + oneEnum.name, { proto: _this, enum: oneEnum });
            });
        };
        var indexMessages = function (path, submessages) {
            submessages.forEach(function (message) {
                var fullname = path + '.' + message.name;
                message.id = fullname.substring(1);
                _this.messageIndex.set(fullname, {
                    proto: _this,
                    message: message,
                });
                indexMessages(fullname, message.nestedTypeList);
                indexEnums(fullname, message.enumTypeList);
            });
        };
        indexMessages(this.pb_package ? '.' + this.pb_package : '', this.messageTypeList);
        indexEnums(this.pb_package ? '.' + this.pb_package : '', this.enumTypeList);
    };
    Proto.prototype.setupDependencies = function (protos) {
        var _this = this;
        this.resolved.dependencies = this.dependencyList.map(function (d) { return protos.find(function (pp) { return pp.name === d; }); });
        this.resolved.publicDependencies = this.resolved.dependencies.filter(function (_, i) { return _this.publicDependencyList.includes(i); });
    };
    Proto.prototype.resolveTransitiveDependencies = function () {
        var getTransitiveDependencies = function (protos) { return protos.reduce(function (res, proto) { return (0, tslib_1.__spreadArray)((0, tslib_1.__spreadArray)((0, tslib_1.__spreadArray)([], (0, tslib_1.__read)(res), false), (0, tslib_1.__read)(proto.resolved.dependencies), false), (0, tslib_1.__read)(getTransitiveDependencies(proto.resolved.publicDependencies)), false); }, []); };
        this.resolved.allDependencies = (0, tslib_1.__spreadArray)([], (0, tslib_1.__read)(new Set((0, tslib_1.__spreadArray)((0, tslib_1.__spreadArray)([], (0, tslib_1.__read)(getTransitiveDependencies(this.resolved.dependencies)), false), (0, tslib_1.__read)(this.resolved.dependencies), false))), false);
    };
    Proto.prototype.resolveTypeMetadata = function (pbType) {
        var meta = this.messageIndex.get(pbType);
        if (meta) {
            return meta;
        }
        meta = undefined;
        this.resolved.allDependencies.forEach(function (proto) {
            if (!meta) {
                try {
                    meta = proto.resolveTypeMetadata(pbType);
                }
                catch (ex) {
                }
            }
        });
        if (meta) {
            return meta;
        }
        throw new Error('Error finding ' + pbType);
    };
    Proto.prototype.getDependencyPackageName = function (dependency) {
        var name = dependency.pb_package ? dependency.pb_package.replace(/\.([a-z])/g, function (v) { return v.toUpperCase(); }).replace(/\./g, '') : 'noPackage';
        var index = String(this.resolved.allDependencies.indexOf(dependency)).padStart(3, '0'); // we always need index to avoid accidental collisions, see type.pb.ts
        return name + index;
    };
    Proto.prototype.getRelativeTypeName = function (pbType, thisProtoPackageName) {
        if (thisProtoPackageName === void 0) { thisProtoPackageName = ''; }
        services_1.Services.Logger.debug("Getting relative type \"".concat(pbType, "\" name from package \"").concat(thisProtoPackageName, "\""));
        var meta = this.resolveTypeMetadata(pbType);
        var _a = (0, tslib_1.__read)(pbType.match(/^\.(([a-z0-9._]*)\.)?([A-Za-z0-9._]+$)/), 4), typeName = _a[3];
        if (meta.proto === this) {
            return (thisProtoPackageName ? thisProtoPackageName + '.' : '') + typeName;
        }
        return this.getDependencyPackageName(meta.proto) + '.' + typeName;
    };
    Proto.prototype.getImportedDependencies = function () {
        var _this = this;
        var root = Array(this.name.split('/').length - 1).fill('..').join('/');
        return this.resolved.allDependencies.map(function (pp) {
            var wktDependency = _this.getWktDependency(pp.pb_package);
            var isWKT = wktDependency != null;
            var genwkt = services_1.Services.Config.embedWellKnownTypes;
            var path = (genwkt || !genwkt && !isWKT) ? "".concat(root || '.', "/").concat(pp.getGeneratedFileBaseName()) : wktDependency;
            return "import * as ".concat(_this.getDependencyPackageName(pp), " from '").concat(path, "';");
        }).join('\n');
    };
    Proto.prototype.getWktDependency = function (pbPackage) {
        if (pbPackage === 'google.protobuf') {
            return '@ngx-grpc/well-known-types';
        }
        if (!!services_1.Services.Config.customWellKnownTypes && !!services_1.Services.Config.customWellKnownTypes[pbPackage]) {
            return services_1.Services.Config.customWellKnownTypes[pbPackage];
        }
        return null;
    };
    Proto.prototype.getGeneratedFileBaseName = function () {
        return "".concat((0, utils_1.dasherize)(this.name.replace(/\.proto$/, '')), ".pb");
    };
    return Proto;
}());
exports.Proto = Proto;
//# sourceMappingURL=proto.js.map