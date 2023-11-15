import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MovieDocument = HydratedDocument<Movie>;

@Schema()
export class Movie {
  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  director: string;

  @Prop({ type: String, required: true })
  genre: string;

  @Prop({ type: Number, required: true })
  year: number;

  @Prop({ type: Number, required: true })
  rating: number;

  @Prop({ type: String, required: true })
  imgUrl: string;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
