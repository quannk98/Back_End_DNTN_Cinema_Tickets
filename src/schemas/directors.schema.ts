import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';


@Schema()
export class Director {
  @Prop()
  name: string;
  @Prop()
  image: string;
}

export const DirectorSchema = SchemaFactory.createForClass(Director);
