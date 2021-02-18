import { IsString } from 'class-validator';

export class updateUserDto {
  @IsString()
  readonly username: string;
}
