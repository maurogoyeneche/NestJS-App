import { Module } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { MovieModule } from 'src/movie/movie.module';
import { HttpModule } from '@nestjs/axios';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.DB_URL),
    MovieModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [Reflector],
})
export class AppModule {}
