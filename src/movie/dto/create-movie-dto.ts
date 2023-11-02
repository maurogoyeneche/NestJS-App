import { IsString, IsNumber, IsUrl, Min, Max } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  title: string;

  @IsString()
  director: string;

  @IsString()
  genre: string;

  @IsNumber()
  @Min(1900, { message: 'El año debe ser mayor o igual a 1900' })
  @Max(2023, { message: 'El año debe ser menor o igual a 2023' })
  year: number;

  @IsNumber()
  @Min(0, { message: 'La calificación debe ser mayor o igual a 0' })
  @Max(10, { message: 'La calificación debe ser menor o igual a 10' })
  rating: number;

  @IsUrl()
  imgUrl: string;
}
