import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/models/user.schema';
import { SignUp } from 'src/auth/dto/auth.dto';
import { UpdateUserDto } from './dto/update-user';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getUsers() {
    try {
      const users = await this.userModel.find();
      if (!users) {
        throw new NotFoundException('User not found');
      }
      return users;
    } catch (error) {
      return { message: 'Error to update user', error };
    }
  }

  async getUserById(id: string) {
    try {
      const user = await this.userModel.findById(id).lean();
      if (!user) {
        throw new NotFoundException('Movie not founded');
      }
      return {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      };
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async addUser(body: SignUp) {
    try {
      const { name, email, password, role } = body;
      const userAdded = await this.userModel.create({
        name,
        email,
        password,
        role,
      });
      return {
        message: 'User created successfully',
        data: {
          id: userAdded._id,
          name: userAdded.name,
          email: userAdded.email,
          role: userAdded.role,
        },
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateUser(id: string, body: UpdateUserDto) {
    try {
      const updatedUser = await this.userModel
        .findByIdAndUpdate(id, body)
        .lean();
      if (!updatedUser) {
        throw new NotFoundException('ID not founded');
      }
      return {
        message: 'User updated successfully',
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async removeUser(id: string) {
    try {
      const userDeleted = await this.userModel.findByIdAndDelete(id);
      if (!userDeleted) {
        throw new NotFoundException();
      }
      return userDeleted;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
