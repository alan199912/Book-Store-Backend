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
import { RoleService } from '../services/role.service';
import { Role } from '../entities/role.entity';

import { DeleteResult, UpdateResult } from 'typeorm';

@Controller('roles')
export class RoleController {
  constructor(private readonly _roleService: RoleService) {}

  @Get(':id')
  async getRole(@Param('id', ParseIntPipe) id: number): Promise<Role> {
    const role = await this._roleService.getRoleID(id);
    return role;
  }

  @Get()
  async getRoles(): Promise<Role[]> {
    const roles = await this._roleService.getRoles();
    return roles;
  }

  @Post()
  async createRole(@Body() role: Role): Promise<Role> {
    const createdRole = await this._roleService.createRole(role);
    return createdRole;
  }

  @Patch(':id')
  async updateRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() role: Role,
  ): Promise<UpdateResult> {
    const updatedRole = await this._roleService.updateRole(id, role);
    return updatedRole;
  }

  @Delete(':id')
  async deleteRole(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DeleteResult> {
    return await this._roleService.deleteRole(id);
  }
}
