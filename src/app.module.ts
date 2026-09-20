import { Module } from '@nestjs/common';
import { AuthModule } from '@thallesp/nestjs-better-auth';
import { auth } from '@/auth/auth.js';
import { HealthModule } from '@/health/health.module.js';
import { IndexModule } from '@/index/index.module.js';
import { InfraModule } from '@/infra/infra.module.js';

@Module({
  imports: [InfraModule, AuthModule.forRoot({ auth }), HealthModule, IndexModule],
})
export class AppModule {}
