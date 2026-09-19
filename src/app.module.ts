import { Module } from '@nestjs/common';
import { HealthModule } from '@/health/health.module.js';
import { IndexModule } from '@/index/index.module.js';
import { InfraModule } from '@/infra/infra.module.js';

@Module({
  imports: [InfraModule, HealthModule, IndexModule],
})
export class AppModule {}
