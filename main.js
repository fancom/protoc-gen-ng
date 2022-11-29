#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var fs_1 = require("fs");
var plugin_pb_1 = require("google-protobuf/google/protobuf/compiler/plugin_pb");
var path_1 = require("path");
var config_1 = require("./config");
var proto_1 = require("./input/proto");
var logger_1 = require("./logger");
var pb_file_1 = require("./output/files/pb-file");
var pbconf_file_1 = require("./output/files/pbconf-file");
var pbsc_file_1 = require("./output/files/pbsc-file");
var pbwsc_file_1 = require("./output/files/pbwsc-file");
var printer_1 = require("./output/misc/printer");
var services_1 = require("./services");
// credits to https://stackoverflow.com/a/54565854/1990451
function readStream(stream) {
    var stream_1, stream_1_1;
    var e_1, _a;
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
        var chunks, chunk, e_1_1;
        return (0, tslib_1.__generator)(this, function (_b) {
            switch (_b.label) {
                case 0:
                    chunks = [];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 6, 7, 12]);
                    stream_1 = (0, tslib_1.__asyncValues)(stream);
                    _b.label = 2;
                case 2: return [4 /*yield*/, stream_1.next()];
                case 3:
                    if (!(stream_1_1 = _b.sent(), !stream_1_1.done)) return [3 /*break*/, 5];
                    chunk = stream_1_1.value;
                    chunks.push(chunk);
                    _b.label = 4;
                case 4: return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 12];
                case 6:
                    e_1_1 = _b.sent();
                    e_1 = { error: e_1_1 };
                    return [3 /*break*/, 12];
                case 7:
                    _b.trys.push([7, , 10, 11]);
                    if (!(stream_1_1 && !stream_1_1.done && (_a = stream_1.return))) return [3 /*break*/, 9];
                    return [4 /*yield*/, _a.call(stream_1)];
                case 8:
                    _b.sent();
                    _b.label = 9;
                case 9: return [3 /*break*/, 11];
                case 10:
                    if (e_1) throw e_1.error;
                    return [7 /*endfinally*/];
                case 11: return [7 /*endfinally*/];
                case 12: return [2 /*return*/, Buffer.concat(chunks)];
            }
        });
    });
}
function main() {
    var _a, _b, _c;
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function () {
        var inputBuff, request, response_1, parameter, protos_1, genwkt_1;
        return (0, tslib_1.__generator)(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, readStream(process.stdin)];
                case 1:
                    inputBuff = _d.sent();
                    try {
                        request = plugin_pb_1.CodeGeneratorRequest.deserializeBinary(inputBuff);
                        response_1 = new plugin_pb_1.CodeGeneratorResponse();
                        response_1.setSupportedFeatures(plugin_pb_1.CodeGeneratorResponse.Feature.FEATURE_PROTO3_OPTIONAL);
                        parameter = request.getParameter();
                        services_1.Services.Config = config_1.Config.fromParameter(parameter !== null && parameter !== void 0 ? parameter : '');
                        services_1.Services.Logger = new logger_1.Logger(services_1.Services.Config.debug);
                        protos_1 = request.getProtoFileList().map(function (d) { return new proto_1.Proto(d.toObject()); });
                        if (services_1.Services.Config.debug) {
                            (0, fs_1.mkdirSync)('debug', { recursive: true });
                            (0, fs_1.writeFileSync)((0, path_1.join)('debug', 'config.json'), JSON.stringify(services_1.Services.Config, null, 2), 'utf-8');
                            // writeFileSync(join('debug', 'protoc-input.json'), JSON.stringify(protocInput, null, 2), 'utf-8');
                            (0, fs_1.writeFileSync)((0, path_1.join)('debug', 'parsed-protoc-gen-ng.json'), JSON.stringify(protos_1, null, 2), 'utf-8');
                        }
                        protos_1.forEach(function (p) { return p.setupDependencies(protos_1); });
                        protos_1.forEach(function (p) { return p.resolveTransitiveDependencies(); });
                        genwkt_1 = services_1.Services.Config.embedWellKnownTypes;
                        protos_1
                            .filter(function (p) { return genwkt_1 || !genwkt_1 && (p.pb_package !== 'google.protobuf' &&
                            (!services_1.Services.Config.customWellKnownTypes || !services_1.Services.Config.customWellKnownTypes[p.pb_package])); })
                            .forEach(function (proto) {
                            services_1.Services.Logger.debug("Start processing proto ".concat(proto.name));
                            var basename = proto.getGeneratedFileBaseName();
                            var files = [];
                            if (proto.serviceList.length) {
                                if (services_1.Services.Config.files.pbconf.generate) {
                                    var configPrinter = new printer_1.Printer();
                                    var configFile = new pbconf_file_1.PbConfFile(proto);
                                    configFile.print(configPrinter);
                                    files.push({ name: basename + 'conf.ts', content: configPrinter.finalize() });
                                }
                                if (services_1.Services.Config.files.pbsc.generate) {
                                    var pbscPrinter = new printer_1.Printer();
                                    var pbscFile = new pbsc_file_1.PbscFile(proto);
                                    pbscFile.print(pbscPrinter);
                                    files.push({ name: basename + 'sc.ts', content: pbscPrinter.finalize() });
                                }
                                if (services_1.Services.Config.files.pbwsc.generate) {
                                    var pbwscPrinter = new printer_1.Printer();
                                    var pbwscFile = new pbwsc_file_1.PbwscFile(proto);
                                    pbwscFile.print(pbwscPrinter);
                                    files.push({ name: basename + 'wsc.ts', content: pbwscPrinter.finalize() });
                                }
                            }
                            if (services_1.Services.Config.files.pb.generate) {
                                var pbPrinter = new printer_1.Printer();
                                var pbFile = new pb_file_1.PbFile(proto);
                                pbFile.print(pbPrinter);
                                files.push({ name: basename + '.ts', content: pbPrinter.finalize() });
                            }
                            services_1.Services.Logger.debug("End processing proto ".concat(proto.name));
                            files.forEach(function (f) { return response_1.addFile(new plugin_pb_1.CodeGeneratorResponse.File().setName(f.name).setContent(f.content)); });
                        });
                        process.stdout.write(Buffer.from(response_1.serializeBinary().buffer));
                    }
                    catch (err) {
                        if (err instanceof Error) {
                            (_a = services_1.Services.Logger) === null || _a === void 0 ? void 0 : _a.debug(err.name);
                            (_b = services_1.Services.Logger) === null || _b === void 0 ? void 0 : _b.debug(err.message);
                            (_c = services_1.Services.Logger) === null || _c === void 0 ? void 0 : _c.debug(err.stack || '');
                            console.error('protoc-gen-ng error: ' + (err.stack || '') + '\n');
                        }
                        process.exit(1);
                    }
                    return [2 /*return*/];
            }
        });
    });
}
main();
//# sourceMappingURL=main.js.map