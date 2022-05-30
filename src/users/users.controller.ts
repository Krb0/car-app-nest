import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private auth: UsersService) {}
  @Post()
  createUser(@Body() { email, password }: CreateUserDTO, @Res() res: Response) {
    if (password.length <= 7) {
      res.status(400).send('Password must be at least 8 characters long');
      return;
    }
    this.auth.create(email, password);
    return 'user created';
  }
  @Get()
  findAll(): string {
    return 'This action returns all users';
  }
}
