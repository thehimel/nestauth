import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppConfigService } from '@/infra/config/app-config.service.js';
import { SWAGGER_VERSION } from '@/infra/swagger/swagger.constants.js';

export function setupSwagger(app: INestApplication, appConfigService: AppConfigService): void {
  if (appConfigService.isProduction) {
    return;
  }

  const config = new DocumentBuilder().setTitle(appConfigService.brandName).setVersion(SWAGGER_VERSION).build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
}
