import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

import { ConfigService } from '../../../config/config.service';
import { Configuration } from '../../../config/config.keys';

import { AuthRepository } from '../repositories/auth.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { IJwtPayload } from '../interfaces/jwt-payload.interface';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { status } from '../../../shared/entity-status.num';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly _configService: ConfigService,
    @InjectRepository(AuthRepository)
    private readonly _authRepository: AuthRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: _configService.get(Configuration.JWT_SECRET),
    });
  }

  async validate(payload: IJwtPayload) {
    const { username } = payload;

    const user = await this._authRepository.findOne({
      where: { username, status: status.ACTIVE },
    });

    if (!user) {
      throw new UnauthorizedException();
    }

    return payload;
  }
}
