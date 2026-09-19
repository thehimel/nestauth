import { Controller, Get } from '@nestjs/common';
import { IndexService } from '@/index/index.service.js';

@Controller()
export class IndexController {
  constructor(private readonly indexService: IndexService) {}

  @Get()
  getHello(): string {
    return this.indexService.getHello();
  }
}
