import { Body, Controller, Delete, Get, Param, Put, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers(@Res() res: Response) {
    try {
      const data = await this.usersService.getUsers();
      return res.status(200).json({ data });
    } catch (error) {
      return res.status(error.status).json({ message: error.message });
    }
  }

  @Get('/:id')
  async getUserById(@Param('id') id: string, @Res() res: Response) {
    try {
      const data = await this.usersService.getUserById(id);
      return res.status(200).json({ data });
    } catch (error) {
      return res.status(error.status).json({ message: error.message });
    }
  }

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
