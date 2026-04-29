"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const logger_service_1 = require("./logger.service");
describe('LoggerService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [logger_service_1.LoggerService],
        }).compile();
        service = module.get(logger_service_1.LoggerService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=logger.service.spec.js.map