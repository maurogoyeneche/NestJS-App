import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MovieDocument = HydratedDocument<Movie>;

@Schema()
export class Movie {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  director: string;

  @Prop({ required: true })
  genre: string;

  @Prop({ required: true })
  year: number;

  @Prop({ required: true })
  rating: number;

  @Prop({ required: true })
  imgUrl: string;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
