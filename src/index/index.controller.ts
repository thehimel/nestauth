import { Controller, Get, VERSION_NEUTRAL } from '@nestjs/common';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';
import { IndexService } from '@/index/index.service.js';

@Controller({ version: VERSION_NEUTRAL })
@AllowAnonymous()
export class IndexController {
  constructor(private readonly indexService: IndexService) {}

  @Get()
  getHello(): string {
    return this.indexService.getHello();
  }
}
