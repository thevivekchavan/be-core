import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
  private redis: Redis;

  constructor(private configService: ConfigService) {}

  onModuleInit() {
    const redisUrl = this.configService.get<string>('REDIS_URL');
    if (!redisUrl) {
      throw new Error('REDIS_URL environment variable is not set');
    }
    this.redis = new Redis(redisUrl);
    console.log('Redis connected');
  }

  onModuleDestroy() {
    if (this.redis) {
      this.redis.disconnect();
      console.log('Redis disconnected');
    }
  }

  async set(key: string, value: string, expireSeconds?: number): Promise<'OK'> {
    if (expireSeconds) {
      return this.redis.set(key, value, 'EX', expireSeconds);
    }
    return this.redis.set(key, value);
  }

  async get(key: string): Promise<string | null> {
    return this.redis.get(key);
  }

  async del(key: string): Promise<number> {
    return this.redis.del(key);
  }

  async exists(key: string): Promise<boolean> {
    return (await this.redis.exists(key)) === 1;
  }

  async keys(pattern = '*'): Promise<string[]> {
    return this.redis.keys(pattern);
  }

  async flushAll(): Promise<'OK'> {
    return this.redis.flushall();
  }
} 