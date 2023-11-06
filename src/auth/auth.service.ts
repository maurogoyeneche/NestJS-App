import {
  Injectable,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { User } from 'src/models/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { hashPassword, comparePassword } from 'src/utils/utils';
import { UserResponse } from './dto/user.dto';
import { JwtService } from '@nestjs/jwt';
// import { Role } from 'src/models/role.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    // @InjectModel(Role.name) private roleModel: Model<Role>,
    private jwt: JwtService,
  ) {}

  // async seedDefaultRoles() {
  //   const rolesToCreate = [
  //     { name: 'admin' },
  //     { name: 'moderator' },
  //     { name: 'user' },
  //   ];

  //   for (const roleData of rolesToCreate) {
  //     const existingRole = await this.roleModel.findOne({
  //       name: roleData.name,
  //     });
  //     if (!existingRole) {
  //       await this.roleModel.create(roleData);
  //     }
  //   }
  // }

  async SignUp(body) {
    try {
      const { email, password, name, role } = body;
      const hashedPassword = await hashPassword(password);
      const userFound = await this.userModel.findOne({ email });
      if (userFound) {
        throw new UnauthorizedException('Email already exist');
      }

      if (role && role !== 'admin' && role !== 'moderator' && role !== 'user') {
        throw new BadRequestException('Invalid role');
      }

      const userCreated = await this.userModel.create({
        name,
        email,
        password: hashedPassword,
        role: role ? { name: role } : undefined,
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
