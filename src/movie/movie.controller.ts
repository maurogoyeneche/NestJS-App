import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  Delete,
  Put,
  Req,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie-dto';
import { Response } from 'express';
import { Role } from 'src/common/enums/role.enum';
import { Auth } from 'src/common/decorators/auth.decorator';
import { UserRequest } from 'src/common/interfaces/user.interfaces';

@Controller('movie')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Auth([Role.ADMIN, Role.USER])
  @Get()
  async getAllMovies(@Req() req: UserRequest, @Res() res: Response) {
    try {
      const result = await this.movieService.getMovies();
      return res.status(200).json({ data: result });
    } catch (error) {
      return res.status(error.status).json({ message: error.message });
    }
  }

  @Auth([Role.ADMIN, Role.USER])
  @Get('/:id')
  async getById(@Param('id') id: string, @Res() res: Response) {
    try {
      const result = await this.movieService.getById(id);
      return res.status(200).json({ data: result });
    } catch (error) {
      return res.status(error.status).json({ message: error.message });
    }
  }

  @Auth([Role.ADMIN, Role.USER])
  @Post()
  async createMovie(
    @Body() createMovieDto: CreateMovieDto,
    @Res() res: Response,
  ) {
    try {
      const result = await this.movieService.addMovie(createMovieDto);
      return res.status(201).json({ data: result });
    } catch (error) {
      return res.status(error.status).json({ message: error.message });
    }
  }

  @Auth([Role.ADMIN, Role.USER])
  @Put('/:id')
  async updateMovie(@Param() param, @Body() body, @Res() res) {
    try {
      const result = await this.movieService.updateMovie(param.id, body);
      res.status(200).json({ data: result });
    } catch (error) {
      res.status(error.status).json({ message: error.message });
    }
  }

  @Auth([Role.ADMIN, Role.USER])
  @Delete('/:id')
  async deleteMovie(@Param('id') id: string, @Res() res: Response) {
    try {
      const result = await this.movieService.removeMovie(id);
      return res.status(200).json({ data: result });
    } catch (error) {
      return res.status(error.status).json({ message: error.message });
    }
  }
}
