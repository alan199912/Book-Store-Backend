import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleRepository } from '../repositories/role.repository';
import { Role } from '../entities/role.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleRepository)
    private readonly _roleRepository: RoleRepository,
  ) {}

  async getRoleID(id: number): Promise<Role> {
    if (!id) {
      throw new BadRequestException('id must be sent');
    }

    return await this._roleRepository.findOne(id, {
      where: { status: 'ACTIVE' },
    });
  }

  async getRoles(): Promise<Role[]> {
    return await this._roleRepository.find({
      where: { status: 'ACTIVE' },
    });
  }

  async createRole(role: Role): Promise<Role> {
    return await this._roleRepository.save(role);
  }

  async updateRole(id: number, role: Role): Promise<UpdateResult> {
    const roleExist: Role = await this._roleRepository.findOne(id, {
      where: { status: 'ACTIVE' },
    });

    if (!roleExist) {
      throw new NotFoundException();
    }

    return await this._roleRepository.update(id, role);
  }

  async deleteRole(id: number): Promise<DeleteResult> {
    const roleExist: Role = await this._roleRepository.findOne(id, {
      where: { status: 'ACTIVE' },
    });

    if (!roleExist) {
      throw new NotFoundException();
    }

    return await this._roleRepository.update(id, { status: 'INACTIVE' });
  }
}
