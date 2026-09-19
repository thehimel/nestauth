import { Module } from '@nestjs/common';
import { IndexModule } from '@/index/index.module.js';

@Module({
  imports: [IndexModule],
})
export class AppModule {}
