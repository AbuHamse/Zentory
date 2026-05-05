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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayeeController = void 0;
const common_1 = require("@nestjs/common");
const payee_service_1 = require("./payee.service");
const supabase_auth_guard_1 = require("../../core/guards/supabase-auth.guard");
const roles_guard_1 = require("../../core/guards/roles/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
let PayeeController = class PayeeController {
    constructor(payeeService) {
        this.payeeService = payeeService;
    }
    async getAll() {
        return await this.payeeService.findAll();
    }
    async createPayee(data) {
        return await this.payeeService.create(data);
    }
    async getOne(id) {
        return await this.payeeService.findOne(id);
    }
};
exports.PayeeController = PayeeController;
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)('admin', 'manager'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PayeeController.prototype, "getAll", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)('admin'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PayeeController.prototype, "createPayee", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)('admin', 'manager'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PayeeController.prototype, "getOne", null);
exports.PayeeController = PayeeController = __decorate([
    (0, common_1.Controller)('payee'),
    (0, common_1.UseGuards)(supabase_auth_guard_1.SupabaseAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [payee_service_1.PayeeService])
], PayeeController);
//# sourceMappingURL=payee.controller.js.map