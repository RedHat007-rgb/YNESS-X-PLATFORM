import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { checker } from '@repo/db';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    console.log(checker());
    return this.appService.getHello();
  }
}
