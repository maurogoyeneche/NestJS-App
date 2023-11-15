import { IsEmail, IsNotEmpty, Matches, IsString } from 'class-validator';
// import { Exclude } from 'class-transformer';
// import { User } from 'src/models/user.schema';
import { Role } from '../../common/enums/role.enum';

export class Login {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class SignUp extends Login {
  name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(/[\W]/, {
    message: 'La contraseña debe contener al menos un carácter especial.',
  })
  password: string;
  role: Role;
}


