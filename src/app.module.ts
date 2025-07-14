import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthenticationModule } from './auth/authentication.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthenticationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
