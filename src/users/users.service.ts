// src/users/users.service.ts
import { Injectable } from '@nestjs/common';

interface User {
  name: string;
  age: number;
}
@Injectable()
export class UsersService {
  private users: User[] = [];

  public findTestAll() {
    return this.users;
  }

  create(user: any) {
    this.users.push(user);
    return { message: 'User added' };
  }
}
