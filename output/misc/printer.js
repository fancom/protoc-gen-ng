"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Printer = void 0;
var tslib_1 = require("tslib");
var prettier = (0, tslib_1.__importStar)(require("prettier"));
var Printer = /** @class */ (function () {
    function Printer() {
        this.dependencies = new Set();
        this.code = '';
    }
    Printer.prototype.addDeps = function () {
        var _this = this;
        var deps = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            deps[_i] = arguments[_i];
        }
        deps.forEach(function (item) { return _this.dependencies.add(item); });
    };
    Printer.prototype.add = function (code) {
        this.code += code;
    };
    Printer.prototype.addLine = function (code) {
        this.add(code);
        this.newLine();
    };
    Printer.prototype.newLine = function () {
        this.code += '\n';
    };
    Printer.prototype.finalize = function () {
        return this.prettify(this.createLeadingComment() + this.createDependenciesCode() + this.code);
    };
    Printer.prototype.createLeadingComment = function () {
        return "/* tslint:disable */\n/* eslint-disable */\n// @ts-nocheck\n//\n// THIS IS A GENERATED FILE\n// DO NOT MODIFY IT! YOUR CHANGES WILL BE LOST\n    ";
    };
    Printer.prototype.createDependenciesCode = function () {
        var deps = new Map();
        Array.from(this.dependencies).forEach(function (dep) {
            var group = deps.get(dep.from);
            if (!group) {
                deps.set(dep.from, group = []);
            }
            group.push(dep.token);
        });
        var code = '';
        Array.from(deps.keys()).sort().forEach(function (from) {
            var tokens = deps.get(from);
            code += "import { ".concat(tokens.sort().join(', '), " } from '").concat(from, "';\n");
        });
        return code;
    };
    Printer.prototype.prettify = function (code) {
        return prettier.format(code, { parser: 'typescript', singleQuote: true });
    };
    return Printer;
}());
exports.Printer = Printer;
//# sourceMappingURL=printer.js.map