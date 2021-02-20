import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoleRepository } from './repositories/role.repository';

import { RoleController } from './controllers/role.controller';

import { RoleService } from './services/role.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([RoleRepository]), AuthModule],
  providers: [RoleService],
  controllers: [RoleController],
})
export class RoleModule {}
