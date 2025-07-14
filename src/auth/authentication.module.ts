import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { JwtService } from '../services/auth-token/jwt.service';
import { AuthenticationController } from './authentication.controller';
import { RedisService } from 'src/services/broker/redis.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [AuthenticationService, JwtService, RedisService],
  controllers: [AuthenticationController],
  exports: [AuthenticationService],
})
export class AuthenticationModule {} 