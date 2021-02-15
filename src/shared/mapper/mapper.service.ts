import { Injectable } from '@nestjs/common';
import { TypeMapper } from 'ts-mapper';
import { User } from '../../modules/user/entities/user.entity';
import { UserDto } from '../../modules/user/dto/User.dto';

@Injectable()
export class MapperService extends TypeMapper {
  constructor() {
    super();
    this._config();
  }

  private _config(): void {
    this.createMap<User, UserDto>()
      .map(
        (entity) => entity.id,
        (dto) => dto.id,
      )
      .map(
        (entity) => entity.username,
        (dto) => dto.username,
      )
      .map(
        (entity) => entity.email,
        (dto) => dto.email,
      )
      .map(
        (entity) => entity.details,
        (dto) => dto.details,
      )
      .map(
        (entity) => entity.roles,
        (dto) => dto.roles,
      );
  }
}
