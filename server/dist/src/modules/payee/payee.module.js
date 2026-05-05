"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PayeeModule = void 0;
const common_1 = require("@nestjs/common");
const payee_controller_1 = require("./payee.controller");
const payee_service_1 = require("./payee.service");
let PayeeModule = class PayeeModule {
};
exports.PayeeModule = PayeeModule;
exports.PayeeModule = PayeeModule = __decorate([
    (0, common_1.Module)({
        controllers: [payee_controller_1.PayeeController],
        providers: [payee_service_1.PayeeService],
    })
], PayeeModule);
//# sourceMappingURL=payee.module.js.map