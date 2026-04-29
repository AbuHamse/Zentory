"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./core/auth/auth.module");
const database_module_1 = require("./core/database/database.module");
const redis_module_1 = require("./core/redis/redis.module");
const logger_module_1 = require("./core/logger/logger.module");
const stripe_module_1 = require("./integrations/stripe/stripe.module");
const auth_module_2 = require("./modules/auth/auth.module");
const account_module_1 = require("./modules/account/account.module");
const operators_module_1 = require("./modules/operators/operators.module");
const payee_module_1 = require("./modules/payee/payee.module");
const transaction_module_1 = require("./modules/transaction/transaction.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
            }),
            database_module_1.DatabaseModule,
            auth_module_1.AuthModule,
            redis_module_1.RedisModule,
            logger_module_1.LoggerModule,
            stripe_module_1.StripeModule,
            auth_module_2.AuthModule,
            account_module_1.AccountModule,
            operators_module_1.OperatorsModule,
            payee_module_1.PayeeModule,
            transaction_module_1.TransactionModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map