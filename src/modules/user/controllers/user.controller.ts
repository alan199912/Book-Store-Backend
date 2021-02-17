import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@Controller('users')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get(':id')
  async getUser(
    @Param('id', ParseIntPipe) id: number,
    @Res() response: Response,
  ): Promise<void> {
    return await this._userService
      .getUserID(id)
      .then((user: User) => {
        response.status(HttpStatus.OK).json({
          status: 'success',
          user,
        });
      })
      .catch((error) => {
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          status: 'fail',
          msg: 'Error to get user',
        });
      });
  }

  @UseGuards(AuthGuard())
  @Get()
  async getUsers(@Res() response: Response): Promise<void> {
    return await this._userService
      .getUsers()
      .then((users: User[]) => {
        response.status(HttpStatus.OK).json({
          status: 'success',
          users,
        });
      })
      .catch((error) => {
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          status: 'fail',
          msg: 'Error to get user',
        });
      });
  }

  @Post()
  async createUser(
    @Body() user: User,
    @Res() response: Response,
  ): Promise<void> {
    return await this._userService
      .createUser(user)
      .then((user: User) => {
        response.status(HttpStatus.CREATED).json({
          status: 'success',
          user,
        });
      })
      .catch((error) => {
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          status: 'fail',
          msg: 'Error to create user',
        });
      });
  }

  @Patch(':id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: User,
    @Res() response: Response,
  ): Promise<void> {
    return await this._userService
      .updateUser(id, user)
      .then(() => {
        response.status(HttpStatus.OK).json({
          status: 'success',
          msg: 'User update successfully',
        });
      })
      .catch((error) => {
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          status: 'fail',
          msg: 'Error to update user',
        });
      });
  }

  @Delete(':id')
  async deleteUser(
    @Param('id', ParseIntPipe) id: number,
    @Res() response: Response,
  ): Promise<void> {
    return await this._userService
      .deleteUser(id)
      .then(() => {
        response.status(HttpStatus.OK).json({
          status: 'success',
          msg: 'User delete successfully',
        });
      })
      .catch((error) => {
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          status: 'fail',
          msg: 'Error to delete user',
        });
      });
  }
}
