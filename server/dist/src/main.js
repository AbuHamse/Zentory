"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const __module_1 = require("./..module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(__module_1.Module);
    await app.listen(process.env.port ?? 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map