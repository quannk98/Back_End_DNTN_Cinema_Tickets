import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Actor {
  @Prop()
  readonly name: string;
  @Prop()
  readonly image: string;
}
export const ActorSchema = SchemaFactory.createForClass(Actor);
