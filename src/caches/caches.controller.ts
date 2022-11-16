import { Controller, Get, Param } from '@nestjs/common';
import { CachesService } from './caches.service';

@Controller('caches')
export class CachesController {
  constructor(private readonly cachesService: CachesService) {}

  @Get()
  keys() {
    return this.cachesService.keys();
  }

  @Get(':key')
  get(@Param('key') key: string) {
    return this.cachesService.get(key);
  }
}
