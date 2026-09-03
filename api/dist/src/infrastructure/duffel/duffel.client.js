"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.duffelClientProvider = exports.DUFFEL_CLIENT = void 0;
const api_1 = require("@duffel/api");
const config_1 = require("@nestjs/config");
const env_1 = require("../../config/env");
const types_1 = require("../types");
exports.DUFFEL_CLIENT = 'DUFFEL_CLIENT';
exports.duffelClientProvider = {
    provide: exports.DUFFEL_CLIENT,
    useFactory: (configService) => {
        const token = configService.get('DUFFEL_ACCESS_TOKEN') || env_1.ENV.DUFFEL_ACCESS_TOKEN;
        return new api_1.Duffel({
            token,
            debug: { verbose: env_1.ENV.NODE_ENV === types_1.NodeEnvironment.Development },
        });
    },
    inject: [config_1.ConfigService],
};
//# sourceMappingURL=duffel.client.js.map