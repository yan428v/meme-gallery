import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type MemeDocument = HydratedDocument<Meme>;

@Schema({ timestamps: true })
export class Meme {
  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  imageUrl!: string;
}

export const MemeSchema = SchemaFactory.createForClass(Meme);
