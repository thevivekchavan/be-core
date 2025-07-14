import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BrokerService } from './broker.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, BrokerService],
})
export class AppModule {}
