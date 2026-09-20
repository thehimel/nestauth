import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import { HealthCheck, HealthCheckResult } from '@nestjs/terminus';
import { SkipThrottle } from '@nestjs/throttler';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';
import { HealthService } from '@/health/health.service.js';

@Controller({ path: 'health', version: VERSION_NEUTRAL })
@SkipThrottle()
@AllowAnonymous()
export class HealthController {
  constructor(private readonly healthService: HealthService) {}

  @Get('live')
  @HealthCheck()
  checkLiveness(): Promise<HealthCheckResult> {
    return this.healthService.checkLiveness();
  }

  @Get('ready')
  @HealthCheck()
  checkReadiness(): Promise<HealthCheckResult> {
    return this.healthService.checkReadiness();
  }
}
