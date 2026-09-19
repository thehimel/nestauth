import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NODE_ENV_PRODUCTION } from '@/infra/config/config.constants.js';
import { EnvironmentVariables } from '@/infra/config/env.validation.js';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService<EnvironmentVariables, true>) {}

  get port(): number {
    return this.configService.get('PORT', { infer: true });
  }

  get nodeEnv(): string {
    return this.configService.get('NODE_ENV', { infer: true });
  }

  get corsAllowedOrigins(): string[] {
    return this.configService.get('CORS_ALLOWED_ORIGINS', { infer: true });
  }

  get isProduction(): boolean {
    return this.nodeEnv === NODE_ENV_PRODUCTION;
  }
}
