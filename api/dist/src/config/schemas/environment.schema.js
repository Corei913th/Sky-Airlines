"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.environmentSchema = void 0;
const types_1 = require("../../infrastructure/types");
const zod_1 = require("zod");
exports.environmentSchema = zod_1.z.object({
    NODE_ENV: zod_1.z.enum(Object.values(types_1.NodeEnvironment)).default(types_1.NodeEnvironment.Development),
    LOG_LEVEL: zod_1.z.enum(Object.values(types_1.LogLevel)).default(types_1.LogLevel.Info),
    PORT: zod_1.z.coerce.number().int().min(1).max(65535).default(3000),
    DATABASE_URL: zod_1.z.string().min(1, 'DATABASE_URL is required'),
    DUFFEL_ACCESS_TOKEN: zod_1.z.string().min(1, 'DUFFEL_ACCESS_TOKEN is required'),
});
//# sourceMappingURL=environment.schema.js.map