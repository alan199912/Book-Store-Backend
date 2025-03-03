import { IsNotEmpty, isNotEmpty, IsString, isString } from 'class-validator';

export class SigninDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
