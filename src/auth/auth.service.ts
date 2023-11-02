import { Injectable } from '@nestjs/common';
import { User } from 'src/models/user.models';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async SignUp(body) {
    try {
      const { email, password, name } = body;
      const userCreated = await this.userModel.create({
        name,
        email,
        password,
      });
      return userCreated;
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
      if (!(userFounded.password === password)) {
        throw new UnauthorizedException();
      }
      return { message: 'User logged successfully' };
    } catch (error) {
      throw new InternalServerErrorException('Authentication failed');
    }
  }
}
