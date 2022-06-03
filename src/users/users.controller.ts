import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private auth: UsersService) {}

  @Put('/signup')
  createUser(@Body() { email, password }: CreateUserDTO, @Res() res: Response) {
    if (password.length <= 7) {
      res.status(400).send('Password must be at least 8 characters long');
      return;
    }
    this.auth.create(email, password);
    res.status(201).send('User created');
  }

  @Get('/:id')
  async findUser(@Param('id') id: string) {
    const user = await this.auth.findOne(parseInt(id));
    return user ? user : 'User not found';
  }

  @Get()
  async findAll(@Query('email') email: string) {
    return await this.auth.find(email);
  }

  @Delete('remove/:id')
  async removeUser(@Param('id') id: string, @Res() res: Response) {
    res
      .status(200)
      .send(
        (await this.auth.remove(parseInt(id)))
          ? 'User removed'
          : 'User not found',
      );
  }
}
