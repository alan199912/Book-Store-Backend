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
import { RoleGuard } from '../../role/guards/role.guard';
import { Response } from 'express';
import { Roles } from '../../role/decorators/role.decorator';
import { RoleType } from '../../role/roletype.enum';
import { updateUserDto } from '../dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Roles(RoleType.ADMIN, RoleType.ADMINISTRATOR)
  @UseGuards(AuthGuard(), RoleGuard)
  @Get(':id')
  getUser(
    @Param('id', ParseIntPipe) id: number,
    @Res() response: Response,
  ): void {
    this._userService
      .getUserID(id)
      .then((user: User) => {
        if (!user) {
          throw new Error('The user could not be found');
        }
        return response.status(HttpStatus.OK).json({
          status: 'success',
          user,
        });
      })
      .catch((error) => {
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          status: 'fail',
          msg: error.message,
        });
      });
  }

  @Roles(RoleType.ADMIN, RoleType.ADMINISTRATOR)
  @UseGuards(AuthGuard(), RoleGuard)
  @Get()
  getUsers(@Res() response: Response): void {
    this._userService
      .getUsers()
      .then((users: User[]) => {
        if (!users) {
          throw new Error('No users found');
        }

        return response.status(HttpStatus.OK).json({
          status: 'success',
          users,
        });
      })
      .catch((error) => {
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          status: 'fail',
          msg: error.message,
        });
      });
  }

  // @Roles(RoleType.ADMIN, RoleType.ADMINISTRATOR)
  // @UseGuards(AuthGuard(), RoleGuard)
  // @Post()
  // createUser(@Body() user: User, @Res() response: Response): void {
  //   this._userService
  //     .createUser(user)
  //     .then((user: User) => {
  //       return response.status(HttpStatus.CREATED).json({
  //         status: 'success',
  //         user,
  //       });
  //     })
  //     .catch((error) => {
  //       return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
  //         status: 'fail',
  //         msg: error.message,
  //       });
  //     });
  // }

  @Roles(RoleType.ADMIN, RoleType.ADMINISTRATOR)
  @UseGuards(AuthGuard(), RoleGuard)
  @Patch(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: updateUserDto,
    @Res() response: Response,
  ): void {
    this._userService
      .updateUser(id, user)
      .then(() => {
        return response.status(HttpStatus.OK).json({
          status: 'success',
          msg: 'User update successfully',
        });
      })
      .catch((error) => {
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          status: 'fail',
          msg: error.message,
        });
      });
  }

  @Roles(RoleType.ADMIN, RoleType.ADMINISTRATOR)
  @UseGuards(AuthGuard(), RoleGuard)
  @Delete(':id')
  deleteUser(
    @Param('id', ParseIntPipe) id: number,
    @Res() response: Response,
  ): void {
    this._userService
      .deleteUser(id)
      .then(() => {
        return response.status(HttpStatus.OK).json({
          status: 'success',
          msg: 'User delete successfully',
        });
      })
      .catch((error) => {
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          status: 'fail',
          msg: error.message,
        });
      });
  }

  @Roles(RoleType.ADMIN, RoleType.ADMINISTRATOR)
  @UseGuards(AuthGuard(), RoleGuard)
  @Post('setRole/:userId/:roleId')
  setRoleToUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('roleId', ParseIntPipe) roleId: number,
    @Res() response: Response,
  ): void {
    this._userService
      .setRoleToUser(userId, roleId)
      .then(() => {
        return response.status(HttpStatus.OK).json({
          status: 'success',
          msg: 'Role added successfully',
        });
      })
      .catch((error) => {
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          status: 'fail',
          msg: error.message,
        });
      });
  }
}
