import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleRepository } from '../repositories/role.repository';
import { Role } from '../entities/role.entity';
import { UpdateResult } from 'typeorm';
import { status } from '../../../shared/entity-status.num';
import { ReadRoleDto } from '../dto/read-role.dto';
import { plainToClass } from 'class-transformer';
import { CreateRoleDto } from '../dto/create-role.dto';
import { UpdateRoleDto } from '../dto/update-role.dto';
@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleRepository)
    private readonly _roleRepository: RoleRepository,
  ) {}

  async getRoleID(id: number): Promise<ReadRoleDto> {
    if (!id) {
      throw new BadRequestException('id must be sent');
    }

    const role: Role = await this._roleRepository.findOne(id, {
      where: { status: status.ACTIVE },
    });

    if (!role) {
      throw new NotFoundException('This role does not exist');
    }

    return plainToClass(ReadRoleDto, role); // * casting obj
  }

  async getRoles(): Promise<ReadRoleDto[]> {
    const roles: Role[] = await this._roleRepository.find({
      where: { status: status.ACTIVE },
    });

    return roles.map((role: Role) => plainToClass(ReadRoleDto, role));
  }

  // * use partial if create a role with one property
  // *  no error will appear
  async createRole(role: Partial<CreateRoleDto>): Promise<ReadRoleDto> {
    const savedRole: Role = await this._roleRepository.save(role);

    return plainToClass(ReadRoleDto, savedRole);
  }

  async updateRole(
    id: number,
    role: Partial<UpdateRoleDto>,
  ): Promise<ReadRoleDto> {
    const roleExist: Role = await this._roleRepository.findOne(id, {
      where: { status: status.ACTIVE },
    });

    if (!roleExist) {
      throw new NotFoundException('This role does not exist');
    }

    roleExist.name = role.name;
    roleExist.description = role.description;

    const updatedRole: Role = await this._roleRepository.save(roleExist);

    return plainToClass(ReadRoleDto, updatedRole);
  }

  async deleteRole(id: number): Promise<UpdateResult> {
    const roleExist: Role = await this._roleRepository.findOne(id, {
      where: { status: status.ACTIVE },
    });

    if (!roleExist) {
      throw new NotFoundException('This role does not exist');
    }

    return await this._roleRepository.update(id, { status: status.INACTIVE });
  }
}
