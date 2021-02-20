import { Exclude, Expose } from 'class-transformer';
import { IsString, MaxLength } from 'class-validator';

@Exclude() // * show some properties
export class UpdateRoleDto {
  @Expose()
  @IsString()
  @MaxLength(50, { message: 'This name is not valid' })
  readonly name: string;

  @Expose()
  @IsString()
  @MaxLength(100, { message: 'This description is not valid' })
  readonly description: string;
}
