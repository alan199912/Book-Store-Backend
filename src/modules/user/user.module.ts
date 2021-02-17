import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from '../../shared/shared.module';
import { AuthModule } from '../auth/auth.module';

import { UserRepository } from './repositories/user.repository';
import { RoleRepository } from '../role/repositories/role.repository';

import { UserService } from './services/user.service';

import { UserController } from './controllers/user.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, RoleRepository]),
    SharedModule,
    AuthModule,
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
