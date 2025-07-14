import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class BrokerService implements OnModuleInit, OnModuleDestroy {
  private redis: Redis;

  onModuleInit() {
    const redisUrl = 'redis://default:Stei11vydgfh0f9omNFOVWKygsDuXVsO@redis-14555.c270.us-east-1-3.ec2.redns.redis-cloud.com:14555';
    if (!redisUrl) {
      throw new Error('REDIS_URL environment variable is not set');
    }
    this.redis = new Redis(redisUrl);
    console.log('Redis connected');
    // console.log(this.redis);
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