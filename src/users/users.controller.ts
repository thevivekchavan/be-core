// src/users/users.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

interface User {
  name: string;
  age: number;
}
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findTestAll(): User[] | void {
    this.usersService.findTestAll();
  }

  @Post()
  create(@Body() userData: any) {
    return this.usersService.create(userData);
  }
}
