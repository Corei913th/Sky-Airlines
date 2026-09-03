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
exports.GlobalExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const api_response_1 = require("../responses/api-response");
const logger_1 = require("../../../infrastructure/logger/logger");
const env_1 = require("../../../config/env");
const types_1 = require("../../../infrastructure/types");
let GlobalExceptionFilter = class GlobalExceptionFilter {
    constructor(logger) {
        this.logger = logger;
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        let status = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        let message = 'Une erreur interne est survenue sur le serveur.';
        let data = null;
        if (exception instanceof common_1.HttpException) {
            status = exception.getStatus();
            const res = exception.getResponse();
            if (status === common_1.HttpStatus.BAD_REQUEST && typeof res === 'object') {
                const validationMessage = res.message;
                message = 'Erreur de validation des données.';
                data = {
                    errors: Array.isArray(validationMessage) ? validationMessage : res,
                };
            }
            else {
                message =
                    typeof res === 'object'
                        ? res.message || exception.message
                        : exception.message;
            }
        }
        else if (exception instanceof Error) {
            message = exception.message;
        }
        const isProduction = env_1.ENV.NODE_ENV === types_1.NodeEnvironment.Production;
        if (status === common_1.HttpStatus.INTERNAL_SERVER_ERROR && isProduction) {
            message = 'Une erreur imprévue est survenue. Veuillez contacter le support.';
            data = null;
        }
        this.logger.error(`${request.method} ${request.url} - Error: ${message}`, exception instanceof Error ? exception.stack : String(exception), {
            statusCode: status,
            path: request.url,
            timestamp: new Date().toISOString(),
        });
        response.status(status).json(api_response_1.ApiResponse.error(message, data));
    }
};
exports.GlobalExceptionFilter = GlobalExceptionFilter;
exports.GlobalExceptionFilter = GlobalExceptionFilter = __decorate([
    (0, common_1.Catch)(),
    __metadata("design:paramtypes", [logger_1.LoggerService])
], GlobalExceptionFilter);
//# sourceMappingURL=global-exceptions-filter.js.map