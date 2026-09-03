"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = void 0;
require("dotenv/config");
const types_1 = require("../infrastructure/types");
exports.ENV = {
    PORT: Number(process.env['PORT']) || 3000,
    NODE_ENV: process.env['NODE_ENV'] || types_1.NodeEnvironment.Development,
    DATABASE_URL: String(process.env['DATABASE_URL'] || ''),
    DUFFEL_ACCESS_TOKEN: String(process.env['DUFFEL_ACCESS_TOKEN'] || ''),
    LOG_LEVEL: process.env['LOG_LEVEL'] || types_1.LogLevel.Info,
};
//# sourceMappingURL=env.js.map