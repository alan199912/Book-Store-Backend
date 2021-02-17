import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../repositories/user.repository';
import { UserDto } from '../dto/User.dto';
import { User } from '../entities/user.entity';
import { DeleteResult, getConnection, UpdateResult } from 'typeorm';
import { UserDetails } from '../entities/user.details.entity';
import { Role } from '../../role/entities/role.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly _userRepository: UserRepository,
  ) {}

  async getUserID(id: number): Promise<User> {
    if (!id) {
      throw new BadRequestException('id must be sent');
    }

    return await this._userRepository.findOne(id, {
      where: { status: 'ACTIVE' },
    });
  }

  async getUsers(): Promise<User[]> {
    return await this._userRepository.find({
      where: { status: 'ACTIVE' },
    });
  }

  async createUser(user: User): Promise<User> {
    const details = new UserDetails();
    user.details = details;

    const repo = await getConnection().getRepository(Role);
    const defaultRole = await repo.findOne({ where: { name: 'GENERAL' } });
    user.roles = [defaultRole];

    return await this._userRepository.save(user);
  }

  async updateUser(id: number, user: User): Promise<UpdateResult> {
    const userExist: User = await this._userRepository.findOne(id, {
      where: { status: 'ACTIVE' },
    });

    if (!userExist) {
      throw new NotFoundException();
    }

    return await this._userRepository.update(id, user);
  }

  async deleteUser(id: number): Promise<UpdateResult> {
    const userExist: User = await this._userRepository.findOne(id, {
      where: { status: 'ACTIVE' },
    });

    if (!userExist) {
      throw new NotFoundException();
    }

    return await this._userRepository.update(id, { status: 'INACTIVE' });
  }
}
