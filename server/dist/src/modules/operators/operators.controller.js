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
exports.OperatorsController = void 0;
const common_1 = require("@nestjs/common");
const operators_service_1 = require("./operators.service");
const supabase_auth_guard_1 = require("../../core/guards/supabase-auth.guard");
const roles_guard_1 = require("../../core/guards/roles/roles.guard");
const roles_decorator_1 = require("../../common/decorators/roles.decorator");
let OperatorsController = class OperatorsController {
    constructor(operatorsService) {
        this.operatorsService = operatorsService;
    }
    async getActive() {
        return await this.operatorsService.getActiveOperators();
    }
    async assignTask(id, taskId) {
        return await this.operatorsService.updateOperatorTask(id, taskId);
    }
    async getStats(id) {
        return await this.operatorsService.getOperatorPerformance(id);
    }
};
exports.OperatorsController = OperatorsController;
__decorate([
    (0, common_1.Get)('active'),
    (0, roles_decorator_1.Roles)('admin', 'manager'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OperatorsController.prototype, "getActive", null);
__decorate([
    (0, common_1.Patch)(':id/task'),
    (0, roles_decorator_1.Roles)('admin', 'manager', 'operator'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('taskId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], OperatorsController.prototype, "assignTask", null);
__decorate([
    (0, common_1.Get)(':id/performance'),
    (0, roles_decorator_1.Roles)('admin', 'manager'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OperatorsController.prototype, "getStats", null);
exports.OperatorsController = OperatorsController = __decorate([
    (0, common_1.Controller)('operators'),
    (0, common_1.UseGuards)(supabase_auth_guard_1.SupabaseAuthGuard, roles_guard_1.RolesGuard),
    __metadata("design:paramtypes", [operators_service_1.OperatorsService])
], OperatorsController);
//# sourceMappingURL=operators.controller.js.map