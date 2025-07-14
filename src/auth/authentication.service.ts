import { Injectable } from '@nestjs/common';
import { JwtService } from '../services/auth-token/jwt.service';

@Injectable()
export class AuthenticationService {
  constructor(private readonly jwtService: JwtService) {}

  async login(username: string) {
    return this.jwtService.generateTokens(username);
  }

  async verifyAccessToken(token: string) {
    return this.jwtService.verifyAccessToken(token);
  }

  async verifyRefreshToken(token: string, username: string) {
    return this.jwtService.verifyRefreshToken(token, username);
  }

  async refresh(username: string, refreshToken: string) {
    const valid = await this.jwtService.verifyRefreshToken(refreshToken, username);
    if (!valid) return { error: 'Invalid refresh token' };
    return this.jwtService.generateTokens(username);
  }
} 