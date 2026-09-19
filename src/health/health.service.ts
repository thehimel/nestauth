import { Injectable } from '@nestjs/common';
import { HealthCheckResult, HealthCheckService, MemoryHealthIndicator } from '@nestjs/terminus';
import { HEALTH_HEAP_INDICATOR_KEY, HEAP_MEMORY_THRESHOLD_BYTES } from '@/health/health.constants.js';

@Injectable()
export class HealthService {
  constructor(
    private readonly healthCheckService: HealthCheckService,
    private readonly memoryHealthIndicator: MemoryHealthIndicator,
  ) {}

  checkLiveness(): Promise<HealthCheckResult> {
    return this.healthCheckService.check([]);
  }

  checkReadiness(): Promise<HealthCheckResult> {
    return this.healthCheckService.check([
      () => this.memoryHealthIndicator.checkHeap(HEALTH_HEAP_INDICATOR_KEY, HEAP_MEMORY_THRESHOLD_BYTES),
    ]);
  }
}
