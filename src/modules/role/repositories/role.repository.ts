import { EntityRepository, Repository } from 'typeorm';
import { Role } from '../entities/role.entity';

// * entity of bd
// * interact with bd
@EntityRepository(Role)
export class RoleRepository extends Repository<Role> {}
