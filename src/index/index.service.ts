import { Injectable } from '@nestjs/common';
import { HELLO_WORLD_MESSAGE } from '@/index/index.constants.js';

@Injectable()
export class IndexService {
  getHello(): string {
    return HELLO_WORLD_MESSAGE;
  }
}
