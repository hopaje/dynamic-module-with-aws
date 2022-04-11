import { Controller, Get , UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { SupabaseGuard } from './commons/auth';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(SupabaseGuard)
  getHello(): string {
    return this.appService.getHello();
  }
}
