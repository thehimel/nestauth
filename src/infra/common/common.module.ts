import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from '@/infra/common/filters/all-exceptions.filter.js';
import { LoggingModule } from '@/infra/logging/logging.module.js';

@Module({
  imports: [LoggingModule],
  providers: [{ provide: APP_FILTER, useClass: AllExceptionsFilter }],
})
export class CommonModule {}
