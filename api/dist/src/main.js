"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const env_1 = require("./config/env");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const port = env_1.ENV.PORT || 3000;
    await app.listen(port);
}
void bootstrap();
//# sourceMappingURL=main.js.map