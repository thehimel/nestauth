import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { Logger, PinoLogger } from 'nestjs-pino';
import { AppModule } from '@/app.module.js';
import { setupCompression } from '@/infra/common/setup-compression.js';
import { setupProcessErrorHandlers } from '@/infra/common/setup-process-error-handlers.js';
import { setupSecurity } from '@/infra/common/setup-security.js';
import { setupVersioning } from '@/infra/common/setup-versioning.js';
import { AppConfigService } from '@/infra/config/app-config.service.js';
import { setupSwagger } from '@/infra/swagger/setup-swagger.js';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter({ trustProxy: true }), {
    bufferLogs: true,
  });
  app.useLogger(app.get(Logger));
  setupProcessErrorHandlers(await app.resolve(PinoLogger));
  app.enableShutdownHooks();
  setupVersioning(app);

  const appConfigService = app.get(AppConfigService);

  await setupSecurity(app, appConfigService);
  await setupCompression(app);
  setupSwagger(app, appConfigService);

  await app.listen(appConfigService.port);
}
await bootstrap();
