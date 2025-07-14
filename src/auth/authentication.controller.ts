import { Controller, Get, Query, HttpCode, HttpStatus, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Get('token')
  @HttpCode(HttpStatus.OK)
  async login(@Query('username') username: string) {
    if (!username) throw new BadRequestException('username is required');
    return this.authenticationService.login(username);
  }

  @Get('verify-access')
  @HttpCode(HttpStatus.OK)
  async verifyAccess(@Query('token') token: string) {
    if (!token) throw new BadRequestException('token is required');
    const result = await this.authenticationService.verifyAccessToken(token);
    if (!result) throw new UnauthorizedException('Invalid or expired access token');
    return result;
  }

  @Get('verify-refresh')
  @HttpCode(HttpStatus.OK)
  async verifyRefresh(@Query('username') username: string, @Query('token') token: string) {
    if (!username || !token) throw new BadRequestException('username and token are required');
    const result = await this.authenticationService.verifyRefreshToken(token, username);
    if (!result) throw new UnauthorizedException('Invalid or expired refresh token');
    return result;
  }

  @Get('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Query('username') username: string, @Query('refreshToken') refreshToken: string) {
    if (!username || !refreshToken) throw new BadRequestException('username and refreshToken are required');
    const result = await this.authenticationService.refresh(username, refreshToken);
    if ((result as any).error) throw new UnauthorizedException((result as any).error);
    return result;
  }
} 