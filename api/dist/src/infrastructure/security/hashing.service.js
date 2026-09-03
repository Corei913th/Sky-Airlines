"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashingService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const shared_constants_1 = require("../../modules/shared/shared.constants");
let HashingService = class HashingService {
    async hash(plain, saltRounds) {
        return bcrypt.hash(plain, saltRounds ?? shared_constants_1.BCRYPT_SALT_ROUNDS);
    }
    async compare(plain, hash) {
        return bcrypt.compare(plain, hash);
    }
};
exports.HashingService = HashingService;
exports.HashingService = HashingService = __decorate([
    (0, common_1.Injectable)()
], HashingService);
//# sourceMappingURL=hashing.service.js.map