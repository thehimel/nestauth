import { Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from '@/health/health.controller.js';
import { HealthService } from '@/health/health.service.js';
import { DbModule } from '@/infra/db/db.module.js';

@Module({
  imports: [TerminusModule, DbModule],
  controllers: [HealthController],
  providers: [HealthService],
})
export class HealthModule {}
