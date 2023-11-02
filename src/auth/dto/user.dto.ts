import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

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
