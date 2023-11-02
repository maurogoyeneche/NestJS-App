import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MovieModule } from 'src/movie/movie.module';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forRoot(
      'mongodb+srv://gnoboca:42180329Gnoboc@cluster0.vy7ivdw.mongodb.net/MovieNest',
    ),
    MovieModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
