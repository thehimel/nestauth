import { Global, Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import { AppConfigService } from '@/infra/config/app-config.service.js';
import { validateEnv } from '@/infra/config/env.validation.js';

@Global()
@Module({
  imports: [
    NestConfigModule.forRoot({
      validate: validateEnv,
    }),
  ],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class ConfigModule {}
