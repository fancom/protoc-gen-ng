"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
var tslib_1 = require("tslib");
var winston = (0, tslib_1.__importStar)(require("winston"));
var Logger = /** @class */ (function () {
    function Logger(debug) {
        if (debug) {
            this.logger = winston.createLogger({
                format: winston.format.combine(winston.format.timestamp({
                    format: 'YYYY-MM-DDTHH:mm:ss.SSSS',
                }), winston.format.printf(function (info) { return "".concat(info.timestamp, "\t").concat(info.level, "\t").concat(info.message); })),
                level: 'debug',
                transports: [
                    new (winston.transports.File)({ filename: './debug/log.txt', options: { flags: 'w' } }),
                ],
            });
        }
    }
    Logger.prototype.info = function (msg) {
        if (this.logger) {
            this.logger.info(msg);
        }
    };
    Logger.prototype.debug = function (msg) {
        if (this.logger) {
            this.logger.debug(msg);
        }
    };
    Logger.prototype.error = function (msg) {
        if (this.logger) {
            this.logger.error(msg);
        }
    };
    return Logger;
}());
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map