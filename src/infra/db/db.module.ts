import { Module } from '@nestjs/common';
import { drizzle } from 'drizzle-orm/postgres-js';
import { AppConfigService } from '@/infra/config/app-config.service.js';
import { ConfigModule } from '@/infra/config/config.module.js';
import { DB_CLIENT } from '@/infra/db/db.constants.js';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: DB_CLIENT,
      useFactory: (appConfigService: AppConfigService) => drizzle(appConfigService.databaseUrl),
      inject: [AppConfigService],
    },
  ],
  exports: [DB_CLIENT],
})
export class DbModule {}
