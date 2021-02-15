import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from '../repositories/user.repository';
import { MapperService } from '../../../shared/mapper/mapper.service';
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
    private readonly _mapperService: MapperService,
  ) {}

  async getUserID(id: number): Promise<UserDto> {
    if (!id) {
      throw new BadRequestException('id must be sent');
    }

    const user: User = await this._userRepository.findOne(id, {
      where: { status: 'ACTIVE' },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return this._mapperService.map<User, UserDto>(user, new UserDto());
  }

  async getUsers(): Promise<UserDto[]> {
    const user: User[] = await this._userRepository.find({
      where: { status: 'ACTIVE' },
    });

    return this._mapperService.mapCollection<User, UserDto>(
      user,
      new UserDto(),
    );
  }

  async createUser(user: User): Promise<UserDto> {
    const details = new UserDetails();
    user.details = details;

    const repo = await getConnection().getRepository(Role);
    const defaultRole = await repo.findOne({ where: { name: 'GENERAL' } });
    user.roles = [defaultRole];

    const savedUser: User = await this._userRepository.save(user);

    return this._mapperService.map<User, UserDto>(savedUser, new UserDto());
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

  async deleteUser(id: number): Promise<DeleteResult> {
    const userExist: User = await this._userRepository.findOne(id, {
      where: { status: 'ACTIVE' },
    });

    if (!userExist) {
      throw new NotFoundException();
    }

    return await this._userRepository.update(id, { status: 'INACTIVE' });
  }
}
