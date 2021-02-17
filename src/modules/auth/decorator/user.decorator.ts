import { createParamDecorator } from '@nestjs/common';
import { UserDto } from '../../user/dto/User.dto';

export const getUser = createParamDecorator(
  (data, req): UserDto => {
    return req.user;
  },
);
