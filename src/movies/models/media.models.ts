import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MediaDocument = HydratedDocument<Media>;
@Schema()
export class Media {
  @Prop()
  title: string;

  @Prop()
  genre: string;

  @Prop()
  rating: string;

  @Prop()
  streaming_link: string;
}

export const MediaSchema = SchemaFactory.createForClass(Media);
