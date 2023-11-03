import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { Exclude } from 'class-transformer';
import { User } from 'src/models/user.models';

export class CreateUserDto {
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(/[\W]/, {
    message: 'La contraseña debe contener al menos un carácter especial.',
  })
  password: string;
}

export class UserResponse {
  name: string;
  email: string;
  @Exclude()
  password: string;
  constructor(createdUser: User) {
    this.name = createdUser.name;
    this.email = createdUser.email;
  }
}
