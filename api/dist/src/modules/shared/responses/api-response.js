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
exports.ApiResponse = void 0;
const swagger_1 = require("@nestjs/swagger");
class ApiResponse {
    constructor(success, message, data, warning) {
        this.success = success;
        this.message = message;
        this.data = data;
        this.warning = warning;
        this.timestamp = new Date().toISOString();
    }
    static success(data, message, warning) {
        return new ApiResponse(true, message, data, warning);
    }
    static error(message, data) {
        return new ApiResponse(false, message, data);
    }
}
exports.ApiResponse = ApiResponse;
__decorate([
    (0, swagger_1.ApiProperty)({ example: true, description: 'Operation success status' }),
    __metadata("design:type", Boolean)
], ApiResponse.prototype, "success", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Operation completed successfully', required: false }),
    __metadata("design:type", String)
], ApiResponse.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'The payload of the response', required: false }),
    __metadata("design:type", Object)
], ApiResponse.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Optional warning for non-fatal issues', required: false }),
    __metadata("design:type", String)
], ApiResponse.prototype, "warning", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2023-10-01T12:00:00.000Z' }),
    __metadata("design:type", String)
], ApiResponse.prototype, "timestamp", void 0);
//# sourceMappingURL=api-response.js.map