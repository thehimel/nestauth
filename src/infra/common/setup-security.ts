import { NestFastifyApplication } from '@nestjs/platform-fastify';
import fastifyHelmet from '@fastify/helmet';
import { AppConfigService } from '@/infra/config/app-config.service.js';

export async function setupSecurity(app: NestFastifyApplication, appConfigService: AppConfigService): Promise<void> {
  app.enableCors({
    origin: appConfigService.corsAllowedOrigins,
    credentials: true,
  });
  await app.register(fastifyHelmet);
}
