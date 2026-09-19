import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { AppConfigService } from '@/infra/config/app-config.service.js';
import { ConfigModule } from '@/infra/config/config.module.js';

@Module({
  imports: [
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [AppConfigService],
      useFactory: (appConfigService: AppConfigService) => ({
        pinoHttp: {
          transport: appConfigService.isProduction ? undefined : { target: 'pino-pretty' },
          redact: ['req.headers.authorization', 'req.headers.cookie', 'res.headers["set-cookie"]'],
        },
      }),
    }),
  ],
  exports: [LoggerModule],
})
export class LoggingModule {}
