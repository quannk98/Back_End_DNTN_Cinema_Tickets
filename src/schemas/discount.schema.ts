import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';


@Schema()
export class Discount {
  @Prop()
  readonly name: string;

  @Prop()
  readonly image: string;

  @Prop()
  readonly percent: string;

  @Prop()
  readonly code: string;

  @Prop()
  readonly type: string;

  @Prop({type:Date})
  readonly dayStart: Date;

  @Prop({type:Date})
  readonly dayEnd: Date;

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Cinema' })
  readonly cinema: mongoose.Types.ObjectId[];
}
export const DiscountSchema = SchemaFactory.createForClass(Discount)
