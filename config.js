"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = exports.ConfigFiles = exports.ConfigPbwsc = exports.ConfigPbsc = exports.ConfigPbconf = exports.ConfigPb = void 0;
var tslib_1 = require("tslib");
var fs_1 = require("fs");
var path_1 = require("path");
/*

Configuration specification and types.

All default values look like

module.exports = {
  debug: false,
  embedWellKnownTypes: false,
  files: {
    pb: {
      generate: true,
    },
    pbconf: {
      generate: true,
    },
    pbsc: {
      generate: true,
      serviceClientProvidedIn: 'any',
    },
    pbwsc: {
      generate: false,
    },
  },
};

For the meaning of the parameters check below

*/
/**
 * Configuration for `pb` files
 */
var ConfigPb = /** @class */ (function () {
    function ConfigPb(config) {
        if (config === void 0) { config = {}; }
        var _a;
        this.generate = (_a = config.generate) !== null && _a !== void 0 ? _a : true;
    }
    return ConfigPb;
}());
exports.ConfigPb = ConfigPb;
/**
 * Configuration for `pbconf` files
 */
var ConfigPbconf = /** @class */ (function () {
    function ConfigPbconf(config) {
        if (config === void 0) { config = {}; }
        var _a;
        this.generate = (_a = config.generate) !== null && _a !== void 0 ? _a : true;
    }
    return ConfigPbconf;
}());
exports.ConfigPbconf = ConfigPbconf;
/**
 * Configuration for `pbsc` files
 */
var ConfigPbsc = /** @class */ (function () {
    function ConfigPbsc(config) {
        if (config === void 0) { config = {}; }
        var _a, _b;
        this.generate = (_a = config.generate) !== null && _a !== void 0 ? _a : true;
        this.serviceClientProvidedIn = (_b = config.serviceClientProvidedIn) !== null && _b !== void 0 ? _b : 'any';
    }
    return ConfigPbsc;
}());
exports.ConfigPbsc = ConfigPbsc;
/**
 * Configuration for `pbwsc` files.
 * These files are required for worker client. By default, not generated.
 */
var ConfigPbwsc = /** @class */ (function () {
    function ConfigPbwsc(config) {
        if (config === void 0) { config = {}; }
        var _a;
        this.generate = (_a = config.generate) !== null && _a !== void 0 ? _a : false;
    }
    return ConfigPbwsc;
}());
exports.ConfigPbwsc = ConfigPbwsc;
/**
 * Configuration object for all generated file types
 */
var ConfigFiles = /** @class */ (function () {
    function ConfigFiles(config) {
        if (config === void 0) { config = {}; }
        this.pb = new ConfigPb(config.pb);
        this.pbconf = new ConfigPbconf(config.pbconf);
        this.pbsc = new ConfigPbsc(config.pbsc);
        this.pbwsc = new ConfigPbwsc(config.pbwsc);
    }
    return ConfigFiles;
}());
exports.ConfigFiles = ConfigFiles;
/**
 * Generator configuration
 */
var Config = /** @class */ (function () {
    function Config(config) {
        if (config === void 0) { config = {}; }
        var _a, _b, _c, _d;
        this.debug = (_a = config.debug) !== null && _a !== void 0 ? _a : false;
        this.embedWellKnownTypes = (_b = config.embedWellKnownTypes) !== null && _b !== void 0 ? _b : false;
        this.customWellKnownTypes = (_c = config.customWellKnownTypes) !== null && _c !== void 0 ? _c : {};
        this.files = new ConfigFiles((_d = config.files) !== null && _d !== void 0 ? _d : {});
    }
    Config.fromParameter = function (parameter) {
        var params = (parameter || '').split(',').map(function (p) { return p.split('='); }).reduce(function (r, p) {
            var _a;
            return ((0, tslib_1.__assign)((0, tslib_1.__assign)({}, r), (_a = {}, _a[p[0]] = p[1], _a)));
        }, {});
        if (params.config && !(0, fs_1.existsSync)(params.config)) {
            throw new Error("The config file \"".concat(params.config, "\" cannot be found"));
        }
        return new Config(params.config ? require((0, path_1.resolve)(params.config)) : {});
    };
    return Config;
}());
exports.Config = Config;
//# sourceMappingURL=config.js.map