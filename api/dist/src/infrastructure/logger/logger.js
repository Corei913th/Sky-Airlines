"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var LoggerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomLogger = exports.LoggerService = void 0;
const common_1 = require("@nestjs/common");
const pino_1 = require("pino");
const node_async_hooks_1 = require("node:async_hooks");
const logger_util_1 = require("./logger.util");
const env_1 = require("../../config/env");
const types_1 = require("../types");
let LoggerService = LoggerService_1 = class LoggerService {
    constructor(context = 'Application') {
        const isDev = env_1.ENV.NODE_ENV !== types_1.NodeEnvironment.Production;
        this.logger = (0, pino_1.default)({
            level: env_1.ENV.LOG_LEVEL || types_1.LogLevel.Info,
            transport: isDev
                ? {
                    target: 'pino-pretty',
                    options: {
                        colorize: true,
                        translateTime: 'SYS:standard',
                        ignore: 'pid,hostname',
                    },
                }
                : undefined,
        }).child({ context });
    }
    static runWithContext(context, fn) {
        return LoggerService_1.storage.run(context, fn);
    }
    getContextData() {
        return LoggerService_1.storage.getStore() || {};
    }
    info(message, data) {
        this.logger.info({ ...this.getContextData(), ...(0, logger_util_1.normalizeData)(data) }, message);
    }
    warn(message, data) {
        this.logger.warn({ ...this.getContextData(), ...(0, logger_util_1.normalizeData)(data) }, message);
    }
    error(message, trace, data) {
        this.logger.error({ ...this.getContextData(), ...(0, logger_util_1.normalizeData)(data), trace: (0, logger_util_1.normalizeTrace)(trace) }, message);
    }
    debug(message, data) {
        this.logger.debug({ ...this.getContextData(), ...(0, logger_util_1.normalizeData)(data) }, message);
    }
    fatal(message, data) {
        this.logger.fatal({ ...this.getContextData(), ...(0, logger_util_1.normalizeData)(data) }, message);
    }
};
exports.LoggerService = LoggerService;
LoggerService.storage = new node_async_hooks_1.AsyncLocalStorage();
exports.LoggerService = LoggerService = LoggerService_1 = __decorate([
    (0, common_1.Injectable)({ scope: common_1.Scope.TRANSIENT }),
    __param(0, (0, common_1.Optional)()),
    __metadata("design:paramtypes", [String])
], LoggerService);
exports.CustomLogger = LoggerService;
//# sourceMappingURL=logger.js.map