import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepository } from '../repositories/auth.repository';

import { JwtService } from '@nestjs/jwt';
import { SignupDto } from '../dto/signup.dto';
import { SigninDto } from '../dto/signin.dto';
import { User } from '../../user/entities/user.entity';
import { compare } from 'bcryptjs';
import { IJwtPayload } from '../interfaces/jwt-payload.interface';
import { RoleType } from '../../role/roletype.enum';
import { plainToClass } from 'class-transformer';
import { LoggedInDto } from '../dto/logged-in.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private readonly _authRepository: AuthRepository,
    private readonly _jwtService: JwtService,
  ) {}

  async signup(signupDto: SignupDto): Promise<void> {
    const { username, email } = signupDto;

    const userExists = await this._authRepository.findOne({
      where: [{ username }, { email }],
    });

    if (userExists) {
      throw new ConflictException('Username or email already exists');
    }

    return this._authRepository.sigup(signupDto);
  }

  async signin(signinDto: SigninDto): Promise<LoggedInDto> {
    const { username, password } = signinDto;

    const user: User = await this._authRepository.findOne({
      where: { username },
    });

    if (!user) {
      throw new NotFoundException('User does not exists');
    }

    const isMatch = await compare(password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: IJwtPayload = {
      id: user.id,
      email: user.email,
      username: user.username,
      roles: user.roles.map((r) => r.name as RoleType),
    };

    const token = this._jwtService.sign(payload);

    return plainToClass(LoggedInDto, { token, user });
  }
}
