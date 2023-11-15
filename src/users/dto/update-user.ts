import { IsOptional, IsString, IsEmail, IsEmpty } from 'class-validator';
import { Exclude } from 'class-transformer';
import { Role } from 'src/common/enums/role.enum';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @IsEmpty({ message: 'Role cannot be updated' })
  @Exclude()
  role: Role;

  @IsEmpty({ message: 'Password cannot be updated' })
  @Exclude()
  readonly password: string;
}
