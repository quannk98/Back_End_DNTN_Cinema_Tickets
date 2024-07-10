import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Genre {
  @Prop()
  readonly name: string;

  @Prop()
  readonly image: string;
}
export const genreSchema = SchemaFactory.createForClass(Genre);
