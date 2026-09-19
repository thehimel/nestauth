import { Module } from '@nestjs/common';
import { CommonModule } from '@/infra/common/common.module.js';
import { ConfigModule } from '@/infra/config/config.module.js';
import { DbModule } from '@/infra/db/db.module.js';
import { LoggingModule } from '@/infra/logging/logging.module.js';
import { ThrottlerModule } from '@/infra/throttler/throttler.module.js';

@Module({
  imports: [ConfigModule, LoggingModule, CommonModule, ThrottlerModule, DbModule],
  exports: [ConfigModule, LoggingModule, CommonModule, ThrottlerModule, DbModule],
})
export class InfraModule {}
