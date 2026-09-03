"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("prisma/config");
const env_1 = require("./src/config/env");
exports.default = (0, config_1.defineConfig)({
    schema: 'prisma/schema.prisma',
    migrations: {
        path: 'prisma/migrations',
    },
    datasource: {
        url: env_1.ENV.DATABASE_URL,
    },
});
//# sourceMappingURL=prisma.config.js.map