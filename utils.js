"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.camelizeSafe = exports.preserveCaseSafe = exports.pascalize = exports.underscore = exports.classify = exports.camelize = exports.dasherize = exports.capitalize = exports.decamelize = void 0;
var STRING_DASHERIZE_REGEXP = (/[ _]/g);
var STRING_DECAMELIZE_REGEXP = (/([a-z\d])([A-Z])/g);
var STRING_CAMELIZE_REGEXP = (/(-|_|\.|\s)+(.)?/g);
var STRING_UNDERSCORE_REGEXP_1 = (/([a-z\d])([A-Z]+)/g);
var STRING_UNDERSCORE_REGEXP_2 = (/-|\s+/g);
function decamelize(str) {
    return str.replace(STRING_DECAMELIZE_REGEXP, '$1_$2').toLowerCase();
}
exports.decamelize = decamelize;
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.substr(1);
}
exports.capitalize = capitalize;
function dasherize(str) {
    return decamelize(str).replace(STRING_DASHERIZE_REGEXP, '-');
}
exports.dasherize = dasherize;
function camelize(str) {
    if (str.toUpperCase() === str) {
        str = str.toLowerCase();
    }
    return str
        .replace(STRING_CAMELIZE_REGEXP, function (match, separator, chr) { return chr ? chr.toUpperCase() : ''; }).replace(/^([A-Z])/, function (match) { return match.toLowerCase(); });
}
exports.camelize = camelize;
function classify(str) {
    return str.split('.').map(function (part) { return capitalize(camelize(part)); }).join('.');
}
exports.classify = classify;
function underscore(str) {
    return str
        .replace(STRING_UNDERSCORE_REGEXP_1, '$1_$2')
        .replace(STRING_UNDERSCORE_REGEXP_2, '_')
        .toLowerCase();
}
exports.underscore = underscore;
function pascalize(str) {
    return str
        .replace(STRING_UNDERSCORE_REGEXP_1, '$1_$2')
        .replace(STRING_UNDERSCORE_REGEXP_2, '_')
        .toUpperCase();
}
exports.pascalize = pascalize;
function preserveCaseSafe(name) {
    return ['default', 'var', 'let', 'const', 'function', 'class'].includes(name) ? 'pb_' + name : name;
}
exports.preserveCaseSafe = preserveCaseSafe;
function camelizeSafe(name) {
    var escaped = ['default', 'var', 'let', 'const', 'function', 'class'].includes(name) ? 'pb_' + name : name;
    return camelize(escaped);
}
exports.camelizeSafe = camelizeSafe;
//# sourceMappingURL=utils.js.map