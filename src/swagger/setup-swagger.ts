import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SWAGGER_DOCS_PATH, SWAGGER_TITLE, SWAGGER_VERSION } from '@/swagger/swagger.constants.js';

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder().setTitle(SWAGGER_TITLE).setVersion(SWAGGER_VERSION).build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(SWAGGER_DOCS_PATH, app, document);
}
