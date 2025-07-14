import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { BrokerService } from './broker.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly brokerService: BrokerService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('redis/set')
  async setKey(@Query('key') key: string, @Query('value') value: string) {
    return this.brokerService.set(key, value);
  }

  @Get('redis/get')
  async getKey(@Query('key') key: string) {
    return this.brokerService.get(key);
  }

  @Get('redis/del')
  async delKey(@Query('key') key: string) {
    return this.brokerService.del(key);
  }

  @Get('redis/exists')
  async existsKey(@Query('key') key: string) {
    return this.brokerService.exists(key);
  }
}
