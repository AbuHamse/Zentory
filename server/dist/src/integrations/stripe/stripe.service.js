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
exports.StripeService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const Stripe = require("stripe");
let StripeService = class StripeService {
    constructor(configService) {
        this.configService = configService;
        this.stripe = new Stripe(this.configService.get('STRIPE_SECRET_KEY'));
    }
    async createCheckoutSession(userId, email, priceId) {
        const frontendUrl = process.env['FRONTEND_URL'] || 'http://localhost:4200';
        return await this.stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            customer_email: email,
            line_items: [{ price: priceId, quantity: 1 }],
            mode: 'subscription',
            success_url: `${frontendUrl}/payment/success`,
            cancel_url: `${frontendUrl}/payment/cancel`,
            metadata: { userId },
        });
    }
    async getCustomerSubscription(email) {
        const customers = await this.stripe.customers.list({
            email: email,
            limit: 1,
        });
        if (customers.data.length === 0)
            return null;
        const subscriptions = await this.stripe.subscriptions.list({
            customer: customers.data[0].id,
            status: 'active',
        });
        return subscriptions.data[0] || null;
    }
    async constructEvent(payload, sig) {
        const secret = this.configService.get('STRIPE_WEBHOOK_SECRET');
        return this.stripe.webhooks.constructEvent(payload, sig, secret);
    }
};
exports.StripeService = StripeService;
exports.StripeService = StripeService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], StripeService);
//# sourceMappingURL=stripe.service.js.map