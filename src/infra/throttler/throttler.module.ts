import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule as NestThrottlerModule } from '@nestjs/throttler';
import { THROTTLE_LIMIT, THROTTLE_TTL_MS } from '@/infra/throttler/throttler.constants.js';

@Module({
  imports: [NestThrottlerModule.forRoot([{ ttl: THROTTLE_TTL_MS, limit: THROTTLE_LIMIT }])],
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class ThrottlerModule {}
