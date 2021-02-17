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
} from '@nestjs/common';
import { RoleService } from '../services/role.service';
import { Role } from '../entities/role.entity';
import { Response } from 'express';

@Controller('roles')
export class RoleController {
  constructor(private readonly _roleService: RoleService) {}

  @Get(':id')
  async getRole(
    @Param('id', ParseIntPipe) id: number,
    @Res() response: Response,
  ): Promise<void> {
    return await this._roleService
      .getRoleID(id)
      .then((role: Role) => {
        response.status(HttpStatus.OK).json({
          status: 'success',
          role,
        });
      })
      .catch((error) => {
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          status: 'fail',
          msg: error.message,
        });
      });
  }

  @Get()
  async getRoles(@Res() response: Response): Promise<void> {
    return await this._roleService
      .getRoles()
      .then((roles: Role[]) => {
        response.status(HttpStatus.OK).json({
          status: 'success',
          roles,
        });
      })
      .catch((error) => {
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          status: 'fail',
          msg: error.message,
        });
      });
  }

  @Post()
  async createRole(
    @Body() role: Role,
    @Res() response: Response,
  ): Promise<void> {
    return await this._roleService
      .createRole(role)
      .then((role: Role) => {
        response.status(HttpStatus.OK).json({
          status: 'success',
          role,
        });
      })
      .catch((error) => {
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          status: 'fail',
          msg: error.message,
        });
      });
  }

  @Patch(':id')
  async updateRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() role: Role,
    @Res() response: Response,
  ): Promise<void> {
    return await this._roleService
      .updateRole(id, role)
      .then(() => {
        response.status(HttpStatus.OK).json({
          status: 'success',
          msg: 'Role update successfully',
        });
      })
      .catch((error) => {
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          status: 'fail',
          msg: error.message,
        });
      });
  }

  @Delete(':id')
  async deleteRole(
    @Param('id', ParseIntPipe) id: number,
    @Res() response: Response,
  ): Promise<void> {
    return await this._roleService
      .deleteRole(id)
      .then(() => {
        response.status(HttpStatus.OK).json({
          status: 'success',
          msg: 'Role delete successfully',
        });
      })
      .catch((error) => {
        response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          status: 'fail',
          msg: error.message,
        });
      });
  }
}
