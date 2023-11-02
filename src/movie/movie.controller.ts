import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  Delete,
  Put,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie-dto';
import { Response } from 'express';

@Controller('movie')
export class MovieController {
  constructor(private movieService: MovieService) {}

  @Get()
  async getAllMovies(@Res() res: Response) {
    try {
      const result = await this.movieService.getMovies();
      return res.status(200).json({ data: result });
    } catch (error) {
      return res.status(error.status).json({ message: error.message });
    }
  }

  @Get('/:id')
  async getById(@Param('id') id: string, @Res() res: Response) {
    try {
      const result = await this.movieService.getById(id);
      return res.status(200).json({ data: result });
    } catch (error) {
      return res.status(error.status).json({ message: error.message });
    }
  }

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

  @Put('/:id')
  async updateMovie(@Param() param, @Body() body, @Res() res) {
    try {
      const result = await this.movieService.updateMovie(param.id, body);
      res.status(200).json({ data: result });
    } catch (error) {
      res.status(error.status).json({ message: error.message });
    }
  }

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
