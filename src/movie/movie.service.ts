import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Movie } from './movie.schema';
import {
  BadRequestException,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class MovieService {
  constructor(@InjectModel(Movie.name) private movieModel: Model<Movie>) {}

  async getMovies() {
    try {
      const movies = await this.movieModel.find();
      return movies;
    } catch (error) {
      throw new BadRequestException('Error while fetching movies');
    }
  }

  async getById(id: string) {
    try {
      const movie = await this.movieModel.findById(id);
      if (!movie) {
        throw new NotFoundException('Movie not founded');
      }
      return movie;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async addMovie(body) {
    try {
      const { title, director, genre, year, rating, imgUrl } = body;
      const movieAdded = await this.movieModel.create({
        title,
        director,
        genre,
        year,
        rating,
        imgUrl,
      });
      return movieAdded;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async updateMovie(id, body) {
    const { title, director, genre, year, imgUrl } = body;
    try {
      const updatedMovie = await this.movieModel.findByIdAndUpdate(
        id,
        {
          title,
          director,
          genre,
          year,
          imgUrl,
        },
        {
          new: true,
        },
      );
      if (!updatedMovie) {
        throw new NotFoundException();
      }
      return updatedMovie;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async removeMovie(id) {
    try {
      const movieDeleted = await this.movieModel.findByIdAndDelete(id);
      if (!movieDeleted) {
        throw new NotFoundException();
      }
      return movieDeleted;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
