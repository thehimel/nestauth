import { Module } from '@nestjs/common';
import { IndexController } from '@/index/index.controller.js';
import { IndexService } from '@/index/index.service.js';

@Module({
  controllers: [IndexController],
  providers: [IndexService],
})
export class IndexModule {}
