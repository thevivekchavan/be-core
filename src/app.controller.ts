import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtService } from './services/auth-token/jwt.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly jwtService: JwtService,
  ) {}

  @Get()
  healthCheck(): string {
    return this.appService.healthCheck();
  }

  @Get('auth/token')
  async generateToken(@Query('username') username: string) {
    if (!username) return { error: 'username is required' };
    return this.jwtService.generateTokens(username);
  }

}
