import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthenticationService } from './auth/authentication.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authenticationService: AuthenticationService,
  ) {}

  @Get()
  healthCheck(): string {
    return this.appService.healthCheck();
  }

  @Get('auth/token')
  async login(@Query('username') username: string) {
    if (!username) return { error: 'username is required' };
    return this.authenticationService.login(username);
  }

  @Get('auth/verify-access')
  verifyAccess(@Query('token') token: string) {
    if (!token) return { error: 'token is required' };
    return this.authenticationService.verifyAccessToken(token);
  }

  @Get('auth/verify-refresh')
  async verifyRefresh(
    @Query('username') username: string,
    @Query('token') token: string,
  ) {
    if (!username || !token)
      return { error: 'username and token are required' };
    return this.authenticationService.verifyRefreshToken(token, username);
  }

  @Get('auth/refresh')
  async refresh(
    @Query('username') username: string,
    @Query('refreshToken') refreshToken: string,
  ) {
    if (!username || !refreshToken)
      return { error: 'username and refreshToken are required' };
    return this.authenticationService.refresh(username, refreshToken);
  }
}
