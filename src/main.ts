import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { Logger, PinoLogger } from 'nestjs-pino';
import { AppModule } from '@/app.module.js';
import { setupCompression } from '@/infra/common/setup-compression.js';
import { setupProcessErrorHandlers } from '@/infra/common/setup-process-error-handlers.js';
import { setupRequestLogging } from '@/infra/common/setup-request-logging.js';
import { setupSecurity } from '@/infra/common/setup-security.js';
import { setupVersioning } from '@/infra/common/setup-versioning.js';
import { AppConfigService } from '@/infra/config/app-config.service.js';
import { HOST } from '@/infra/config/config.constants.js';
import { setupSwagger } from '@/infra/swagger/setup-swagger.js';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter({ trustProxy: true }), {
    bufferLogs: true,
    bodyParser: false,
  });
  app.useLogger(app.get(Logger));
  setupRequestLogging(app, await app.resolve(PinoLogger));
  setupProcessErrorHandlers(await app.resolve(PinoLogger));
  app.enableShutdownHooks();
  setupVersioning(app);

  const appConfigService = app.get(AppConfigService);

  await setupSecurity(app, appConfigService);
  await setupCompression(app);
  setupSwagger(app, appConfigService);

  await app.listen(appConfigService.port, HOST);
}
await bootstrap();
