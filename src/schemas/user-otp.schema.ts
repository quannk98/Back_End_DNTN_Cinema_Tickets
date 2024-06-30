import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { EOtpType } from 'src/common/enums/auth.enum';

@Schema()
export class UserOtp {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: mongoose.Types.ObjectId;

  @Prop({ required: true })
  code: string;

  @Prop({ default: EOtpType.register })
  type: EOtpType;

  @Prop({ type: Date, default: () => Date.now() })
  created_at: Date;
}
export const UserOtpSchema = SchemaFactory.createForClass(UserOtp);
