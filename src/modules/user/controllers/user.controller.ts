import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity';
import { UserDto } from '../dto/User.dto';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('users')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get(':id')
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    const user = await this._userService.getUserID(id);
    return user;
  }

  @Get()
  async getUsers(): Promise<User[]> {
    const users = await this._userService.getUsers();
    return users;
  }

  @Post()
  async createUser(@Body() user: User): Promise<User> {
    const createdUser = await this._userService.createUser(user);
    return createdUser;
  }

  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: User,
  ): Promise<UpdateResult> {
    const updatedUser = await this._userService.updateUser(id, user);
    return updatedUser;
  }

  @Delete(':id')
  async deleteUser(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeleteResult> {
    return await this._userService.deleteUser(id);
  }
}
