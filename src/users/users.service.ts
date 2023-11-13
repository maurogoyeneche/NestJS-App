import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/models/user.schema';
import { SignUp } from 'src/auth/dto/user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async getUsers() {
    try {
      const users = await this.userModel.find().exec();
      return users;
    } catch (error) {
      throw new BadRequestException('Error while fetching users');
    }
  }

  async getUserById(id: string) {
    try {
      const movie = await this.userModel.findById(id).lean();
      if (!movie) {
        throw new NotFoundException('Movie not founded');
      }
      return movie;
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
      return userAdded;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateUser(id: string, body) {
    const { name, email, password } = body;
    try {
      const updatedUser = await this.userModel.findByIdAndUpdate(
        id,
        {
          name,
          email,
          password,
        },
        {
          new: true,
        },
      );
      if (!updatedUser) {
        throw new NotFoundException();
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
      const deletedUser = await this.userModel.findByIdAndDelete(id);
      if (!deletedUser) {
        throw new NotFoundException();
      }
      return {
        message: 'User deleted successfully',
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
