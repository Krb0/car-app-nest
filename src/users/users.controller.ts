import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Patch,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDTO } from './dtos/create-user.dto';
import { UpdateUserDTO } from './dtos/update-user.dto';
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
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  @Get()
  async findAll(@Query('email') email: string) {
    const users = await this.auth.find(email);
    if (!users) {
      throw new NotFoundException('User not found');
    }
    return users;
  }
  @Patch(':id')
  async updateUserDTO(@Param('id') id: string, @Body() body: UpdateUserDTO) {
    const update = await this.auth.update(parseInt(id), body);
    if (!update) {
      throw new ForbiddenException('Invalid Credentials');
    }
    return update;
  }
  @Delete('remove/:id')
  async removeUser(@Param('id') id: string, @Res() res: Response) {
    const removed = await this.auth.remove(parseInt(id));
    if (!removed) {
      throw new NotFoundException('User not found');
    }
    res.status(200).send(removed);
  }
}
