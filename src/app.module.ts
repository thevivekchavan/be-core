import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { RedisService } from './services/broker/redis.service';
import { JwtService } from './services/auth-token/jwt.service';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, RedisService, JwtService],
})
export class AppModule {}
