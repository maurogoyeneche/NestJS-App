import {
  Injectable,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from 'src/users/models/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { hashPassword, comparePassword } from 'src/utils/bcrypt-passwords';
import { Login, SignUp } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwt: JwtService,
  ) {}

  async SignUp(body: SignUp) {
    try {
      const { name, email, password, role } = body;
      const hashedPassword = await hashPassword(password);
      const userFound = await this.userModel.findOne({ email });
      if (userFound) {
        throw new UnauthorizedException('Email already exist');
      }
      await this.userModel.create({
        name,
        email,
        password: hashedPassword,
        role,
      });
      return { message: 'User created successfully' };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async Login(body: Login) {
    const { email, password } = body;
    try {
      const userFounded = await this.userModel.findOne({ email });
      if (!userFounded) {
        throw new NotFoundException('User not found');
      }
      const isMatch = await comparePassword(password, userFounded.password);
      if (!isMatch) {
        throw new UnauthorizedException();
      }
      const payload = {
        name: userFounded.name,
        role: userFounded.role,
      };
      const token = this.jwt.sign(payload);
      return { message: `Logged successfully, ${userFounded.name}`, token };
    } catch (error) {
      throw new InternalServerErrorException('Authentication failed');
    }
  }
}
