import { Test, TestingModule } from '@nestjs/testing';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import request from 'supertest';
import { AppModule } from '@/app.module.js';
import { setupCompression } from '@/infra/common/setup-compression.js';
import { setupSecurity } from '@/infra/common/setup-security.js';
import { setupVersioning } from '@/infra/common/setup-versioning.js';
import { AppConfigService } from '@/infra/config/app-config.service.js';
import { HELLO_WORLD_MESSAGE } from '@/index/index.constants.js';

describe('IndexController (e2e)', () => {
  let app: NestFastifyApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(new FastifyAdapter({ trustProxy: true }));
    setupVersioning(app);
    await setupSecurity(app, app.get(AppConfigService));
    await setupCompression(app);

    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  it('/v1 (GET)', () => {
    return request(app.getHttpServer()).get('/v1').expect(200).expect(HELLO_WORLD_MESSAGE);
  });

  afterEach(async () => {
    await app.close();
  });
});
