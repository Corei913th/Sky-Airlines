"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoggerModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const logger_1 = require("./logger");
let LoggerModule = class LoggerModule {
};
exports.LoggerModule = LoggerModule;
exports.LoggerModule = LoggerModule = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [
            {
                provide: logger_1.LoggerService,
                useFactory: (inquirer) => {
                    return new logger_1.LoggerService(inquirer?.constructor?.name || 'App');
                },
                inject: [core_1.INQUIRER],
                scope: common_1.Scope.TRANSIENT,
            },
        ],
        exports: [logger_1.LoggerService],
    })
], LoggerModule);
//# sourceMappingURL=logger.module.js.map