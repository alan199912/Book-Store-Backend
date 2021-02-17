import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoleRepository } from './repositories/role.repository';

import { RoleController } from './controllers/role.controller';

import { RoleService } from './services/role.service';

@Module({
  imports: [TypeOrmModule.forFeature([RoleRepository])],
  providers: [RoleService],
  controllers: [RoleController],
})
export class RoleModule {}
