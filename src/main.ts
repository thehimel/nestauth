import { NestFactory } from '@nestjs/core';
import { DEFAULT_PORT } from '@/common/common.constants.js';
import { AppModule } from '@/app.module.js';
import { setupSwagger } from '@/swagger/setup-swagger.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupSwagger(app);

  await app.listen(process.env.PORT ?? DEFAULT_PORT);
}
await bootstrap();
