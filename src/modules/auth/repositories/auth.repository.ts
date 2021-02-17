import { EntityRepository, getConnection, Repository } from 'typeorm';

import { User } from '../../user/entities/user.entity';
import { Role } from '../../role/entities/role.entity';
import { UserDetails } from '../../user/entities/user.details.entity';

import { RoleRepository } from '../../role/repositories/role.repository';

import { SignupDto } from '../dto/signup.dto';

import { RoleType } from '../../role/roletype.enum';
import { genSalt, hash } from 'bcryptjs';

@EntityRepository(User)
export class AuthRepository extends Repository<User> {
  async sigup(signup: SignupDto) {
    const { username, email, password } = signup;

    const user = new User();

    user.username = username;
    user.email = email;

    // * create repository of role
    const roleRepository: RoleRepository = getConnection().getRepository(Role);

    // * get default role
    const defaultRole: Role = await roleRepository.findOne({
      where: { name: RoleType.GENERAL },
    });

    user.roles = [defaultRole];

    // * get details user
    const details = new UserDetails();
    user.details = details;

    const salt = await genSalt(10);
    user.password = await hash(password, salt);

    await user.save();
  }
}
