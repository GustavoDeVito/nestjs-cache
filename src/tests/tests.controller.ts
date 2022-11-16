import { Controller, Get, Post } from '@nestjs/common';
import { TestsService } from './tests.service';

@Controller('tests')
export class TestsController {
  constructor(private readonly testsService: TestsService) {}

  @Post()
  create() {
    return this.testsService.create();
  }

  @Get()
  find() {
    return this.testsService.findOne();
  }
}
