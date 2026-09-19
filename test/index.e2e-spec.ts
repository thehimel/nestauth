import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { HELLO_WORLD_MESSAGE } from '@/index/index.constants.js';
import { AppModule } from '@/app.module.js';

describe('IndexController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer()).get('/').expect(200).expect(HELLO_WORLD_MESSAGE);
  });

  afterEach(async () => {
    await app.close();
  });
});
