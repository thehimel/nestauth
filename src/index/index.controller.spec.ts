import { Test, TestingModule } from '@nestjs/testing';
import { HELLO_WORLD_MESSAGE } from '@/index/index.constants.js';
import { IndexController } from '@/index/index.controller.js';
import { IndexService } from '@/index/index.service.js';

describe('IndexController', () => {
  let indexController: IndexController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [IndexController],
      providers: [IndexService],
    }).compile();

    indexController = app.get<IndexController>(IndexController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(indexController.getHello()).toBe(HELLO_WORLD_MESSAGE);
    });
  });
});
