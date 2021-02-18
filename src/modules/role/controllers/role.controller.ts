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
import { Response } from 'express';
import { ReadRoleDto } from '../dto/read-role.dto';
import { CreateRoleDto } from '../dto/create-role.dto';

@Controller('roles')
export class RoleController {
  constructor(private readonly _roleService: RoleService) {}

  @Get(':id')
  getRole(
    @Param('id', ParseIntPipe) id: number,
    @Res() response: Response,
  ): void {
    this._roleService
      .getRoleID(id)
      .then((role: ReadRoleDto) => {
        return response.status(HttpStatus.OK).json({
          status: 'success',
          role,
        });
      })
      .catch((error) => {
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          status: 'fail',
          msg: error.message,
        });
      });
  }

  @Get()
  getRoles(@Res() response: Response): void {
    this._roleService
      .getRoles()
      .then((roles: ReadRoleDto[]) => {
        return response.status(HttpStatus.OK).json({
          status: 'success',
          roles,
        });
      })
      .catch((error) => {
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          status: 'fail',
          msg: error.message,
        });
      });
  }

  @Post()
  createRole(
    @Body() role: Partial<CreateRoleDto>,
    @Res() response: Response,
  ): void {
    this._roleService
      .createRole(role)
      .then((role: ReadRoleDto) => {
        return response.status(HttpStatus.OK).json({
          status: 'success',
          role,
        });
      })
      .catch((error) => {
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          status: 'fail',
          msg: error.message,
        });
      });
  }

  @Patch(':id')
  updateRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() role: ReadRoleDto,
    @Res() response: Response,
  ): void {
    this._roleService
      .updateRole(id, role)
      .then(() => {
        return response.status(HttpStatus.OK).json({
          status: 'success',
          msg: 'Role update successfully',
        });
      })
      .catch((error) => {
        return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
          status: 'fail',
          msg: error.message,
        });
      });
  }

  @Delete(':id')
  deleteRole(
    @Param('id', ParseIntPipe) id: number,
    @Res() response: Response,
  ): void {
    this._roleService
      .deleteRole(id)
      .then(() => {
        return response.status(HttpStatus.OK).json({
          status: 'success',
          msg: 'Role delete successfully',
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
