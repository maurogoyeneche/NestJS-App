import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { UserRequest } from 'src/common/interfaces/user.interfaces';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Auth([Role.ADMIN, Role.USER])
  @Get()
  async getAllUsers(@Req() req: UserRequest, @Res() res: Response) {
    try {
      const data = await this.usersService.getUsers();
      return res.status(200).json({ data });
    } catch (error) {
      return res.status(error.status).json({ message: error.message });
    }
  }

  @Auth([Role.ADMIN, Role.USER])
  @Get('/:id')
  async getUserById(@Param('id') id: string, @Res() res: Response) {
    try {
      const data = await this.usersService.getUserById(id);
      return res.status(200).json({ data });
    } catch (error) {
      return res.status(error.status).json({ message: error.message });
    }
  }
  @Auth([Role.ADMIN, Role.USER])
  @Put('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() body,
    @Res() res: Response,
  ) {
    try {
      const data = await this.usersService.updateUser(id, body);
      return res.status(200).json({ data });
    } catch (error) {
      return res.status(error.status).json({ message: error.message });
    }
  }

  @Auth([Role.ADMIN, Role.USER])
  @Delete()
  async deleteUser(@Param('id') id: string, @Res() res: Response) {
    try {
      const data = await this.usersService.removeUser(id);
      return res.status(200).json({ data });
    } catch (error) {
      return res.status(error.status).json({ message: error.message });
    }
  }
}
