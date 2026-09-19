import { INestApplication, VersioningType } from '@nestjs/common';
import { DEFAULT_API_VERSION } from '@/infra/common/common.constants.js';

export function setupVersioning(app: INestApplication): void {
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: DEFAULT_API_VERSION });
}
