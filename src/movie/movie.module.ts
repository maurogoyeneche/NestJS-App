import { Module, ValidationPipe } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { MovieSchema, Movie } from '../models/movie.schema';
import { APP_PIPE, APP_INTERCEPTOR } from '@nestjs/core';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { AuthGuard } from '../auth/guards/auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Movie.name, schema: MovieSchema }]),
  ],
  controllers: [MovieController],
  providers: [
    MovieService,
    JwtService,
    AuthGuard,
    RolesGuard,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class MovieModule {}
