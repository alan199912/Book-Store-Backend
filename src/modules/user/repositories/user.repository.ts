import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entities/user.entity';

// * entity of bd
// * interact with bd
@EntityRepository(User)
export class UserRepository extends Repository<User> {}
