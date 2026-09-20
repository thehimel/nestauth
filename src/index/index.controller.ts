import { Controller, Get } from '@nestjs/common';
import { AllowAnonymous } from '@thallesp/nestjs-better-auth';
import { IndexService } from '@/index/index.service.js';

@Controller()
@AllowAnonymous()
export class IndexController {
  constructor(private readonly indexService: IndexService) {}

  @Get()
  getHello(): string {
    return this.indexService.getHello();
  }
}
