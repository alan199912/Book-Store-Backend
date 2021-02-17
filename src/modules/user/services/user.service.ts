import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '../entities/user.entity';
import { Role } from '../../role/entities/role.entity';
import { UserRepository } from '../repositories/user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleRepository } from '../../role/repositories/role.repository';
import { UserDetails } from '../entities/user.details.entity';
import { getConnection, UpdateResult } from 'typeorm';
import { status } from '../../../shared/entity-status.num';
import { RoleType } from '../../role/roletype.enum';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository,
    @InjectRepository(RoleRepository)
    private readonly _roleRepository: RoleRepository,
  ) {}

  async getUserID(id: number): Promise<User> {
    if (!id) {
      throw new BadRequestException('id must be sent');
    }

    return await this._userRepository.findOne(id, {
      where: { status: status.ACTIVE },
    });
  }

  async getUsers(): Promise<User[]> {
    return await this._userRepository.find({
      where: { status: status.ACTIVE },
    });
  }

  async createUser(user: User): Promise<User> {
    const details = new UserDetails();
    user.details = details;

    const repo = await getConnection().getRepository(Role);
    const defaultRole = await repo.findOne({
      where: { name: RoleType.GENERAL },
    });
    user.roles = [defaultRole];

    return await this._userRepository.save(user);
  }

  async updateUser(id: number, user: User): Promise<UpdateResult> {
    const userExist: User = await this._userRepository.findOne(id, {
      where: { status: status.ACTIVE },
    });

    if (!userExist) {
      throw new NotFoundException('The user could not be found');
    }

    return await this._userRepository.update(id, user);
  }

  async deleteUser(id: number): Promise<UpdateResult> {
    const userExist: User = await this._userRepository.findOne(id, {
      where: { status: status.ACTIVE },
    });

    if (!userExist) {
      throw new NotFoundException('The user could not be found');
    }

    return await this._userRepository.update(id, { status: status.INACTIVE });
  }

  async setRoleToUser(userId: number, roleId: number): Promise<User> {
    const userExist: User = await this._userRepository.findOne(userId, {
      where: { status: status.ACTIVE },
    });

    if (!userExist) {
      throw new NotFoundException('User does not exist');
    }

    const roleExist: Role = await this._roleRepository.findOne(roleId, {
      where: { status: status.ACTIVE },
    });

    if (!roleExist) {
      throw new NotFoundException('Role does not exist');
    }

    userExist.roles.push(roleExist);

    return await this._userRepository.save(userExist);
  }
}
