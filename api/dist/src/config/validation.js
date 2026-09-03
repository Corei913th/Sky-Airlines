"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = validate;
const environment_schema_1 = require("./schemas/environment.schema");
function validate(config) {
    const result = environment_schema_1.environmentSchema.safeParse(config);
    if (!result.success) {
        throw new Error(`Configuration validation failed:\n${result.error.message}`);
    }
    return result.data;
}
//# sourceMappingURL=validation.js.map