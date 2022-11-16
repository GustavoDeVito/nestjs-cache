import { Body, Controller, Get, Post } from '@nestjs/common';
import { TestsService } from './tests.service';

@Controller('tests')
export class TestsController {
  constructor(private readonly testsService: TestsService) {}

  @Post()
  create(@Body() data: any) {
    return this.testsService.create(data);
  }

  @Get()
  find() {
    return this.testsService.findOne();
  }
}
