import { Injectable } from '@nestjs/common';
import { RedisService } from '../broker/redis.service';
import * as jwt from 'jsonwebtoken';
import { randomBytes } from 'crypto';
import type { Secret, SignOptions } from 'jsonwebtoken';

@Injectable()
export class JwtService {
  private accessSecret: Secret;
  private refreshSecret: Secret;
  private accessExpiresIn: string;
  private refreshExpiresIn: string;

  constructor(private readonly redisService: RedisService) {
    this.accessSecret =
      process.env.JWT_ACCESS_SECRET || randomBytes(32).toString('hex');
    this.refreshSecret =
      process.env.JWT_REFRESH_SECRET || randomBytes(32).toString('hex');
    this.accessExpiresIn = String(process.env.JWT_ACCESS_EXPIRES_IN || '15m');
    this.refreshExpiresIn = String(process.env.JWT_REFRESH_EXPIRES_IN || '7d');
  }

  async generateTokens(username: string) {
    const accessOptions: SignOptions = {
      expiresIn: this.accessExpiresIn as jwt.SignOptions['expiresIn'],
    };
    const refreshOptions: SignOptions = {
      expiresIn: this.refreshExpiresIn as jwt.SignOptions['expiresIn'],
    };
    const accessToken = jwt.sign(
      { username },
      this.accessSecret,
      accessOptions,
    );
    const refreshToken = jwt.sign(
      { username },
      this.refreshSecret,
      refreshOptions,
    );
    // Store refresh token in Redis with username as key
    const refreshExpSec = parseInt(
      process.env.JWT_REFRESH_EXPIRES_SECONDS || '604800',
      10,
    ); // default 7 days
    await this.redisService.set(username, refreshToken, refreshExpSec);
    return { accessToken, refreshToken };
  }

  verifyAccessToken(token: string) {
    try {
      return jwt.verify(token, this.accessSecret);
    } catch {
      return null;
    }
  }

  async verifyRefreshToken(token: string, username: string) {
    try {
      const stored = await this.redisService.get(username);
      if (stored !== token) return null;
      return jwt.verify(token, this.refreshSecret);
    } catch {
      return null;
    }
  }
}
