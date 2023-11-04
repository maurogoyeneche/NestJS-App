import {
  Injectable,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from 'src/models/user.models';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { hashPassword, comparePassword } from 'src/utils/utils';
import { UserResponse } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwt: JwtService,
  ) {}

  async SignUp(body) {
    try {
      const { email, password, name } = body;
      const hashedPassword = await hashPassword(password);
      const userFound = await this.userModel.findOne({ email });
      if (userFound) {
        throw new UnauthorizedException('Email already exist');
      }
      const userCreated = await this.userModel.create({
        name,
        email,
        password: hashedPassword,
      });
      const userDto = new UserResponse(userCreated);
      return userDto;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async Login(body) {
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
      const payload = { id: userFounded._id, name: userFounded.name };
      const token = this.jwt.sign(payload);
      const data = {
        userFounded,
        token,
      };
      return { message: 'User logged successfully', data };
    } catch (error) {
      throw new InternalServerErrorException('Authentication failed');
    }
  }
}
