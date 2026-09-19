import { Inject, Injectable } from '@nestjs/common';
import { HealthCheckResult, HealthCheckService, HealthIndicatorService, MemoryHealthIndicator } from '@nestjs/terminus';
import type postgres from 'postgres';
import {
  HEALTH_DATABASE_INDICATOR_KEY,
  HEALTH_HEAP_INDICATOR_KEY,
  HEAP_MEMORY_THRESHOLD_BYTES,
} from '@/health/health.constants.js';
import { DB_CLIENT } from '@/infra/db/db.constants.js';

@Injectable()
export class HealthService {
  constructor(
    private readonly healthCheckService: HealthCheckService,
    private readonly memoryHealthIndicator: MemoryHealthIndicator,
    private readonly healthIndicatorService: HealthIndicatorService,
    @Inject(DB_CLIENT) private readonly dbClient: postgres.Sql,
  ) {}

  checkLiveness(): Promise<HealthCheckResult> {
    return this.healthCheckService.check([]);
  }

  checkReadiness(): Promise<HealthCheckResult> {
    return this.healthCheckService.check([
      () => this.memoryHealthIndicator.checkHeap(HEALTH_HEAP_INDICATOR_KEY, HEAP_MEMORY_THRESHOLD_BYTES),
      () =>
        this.healthIndicatorService.check(HEALTH_DATABASE_INDICATOR_KEY).attempt(async () => {
          await this.dbClient`SELECT 1`;
        }),
    ]);
  }
}
