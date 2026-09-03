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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggingInterceptor = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const node_crypto_1 = require("node:crypto");
const logger_1 = require("../logger");
let LoggingInterceptor = class LoggingInterceptor {
    constructor(logger) {
        this.logger = logger;
    }
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        const correlationId = (0, node_crypto_1.randomUUID)();
        const userId = request.user?.id;
        const now = Date.now();
        return logger_1.LoggerService.runWithContext({ correlationId, userId }, () => {
            this.logger.info(`Incoming Request: ${request.method} ${request.url}`, {
                ip: request.ip,
                userAgent: request.headers['user-agent'],
            });
            return next.handle().pipe((0, operators_1.tap)({
                next: () => {
                    this.logger.info(`Request Completed: ${request.method} ${request.url}`, {
                        duration: `${Date.now() - now}ms`,
                    });
                },
                error: (err) => {
                    const error = err;
                    this.logger.error(`Request Failed: ${request.method} ${request.url}`, error.stack, {
                        duration: `${Date.now() - now}ms`,
                    });
                },
            }));
        });
    }
};
exports.LoggingInterceptor = LoggingInterceptor;
exports.LoggingInterceptor = LoggingInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [logger_1.LoggerService])
], LoggingInterceptor);
//# sourceMappingURL=logging.interceptor.js.map