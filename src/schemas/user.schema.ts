import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EUserRole, EUserStatus } from 'src/common/enums/user.enum';

@Schema()
export class User {
  @Prop({
    minlength: 6,
    maxlength: 30,
    set: (name: string) => {
      return name.trim();
    },
  })
  readonly name: string;
  @Prop()
  readonly email: string;
  @Prop({ default: false })
  readonly email_verify: boolean;
  @Prop()
  readonly password: string;
  @Prop()
  readonly date_of_birth: string;
  @Prop()
  readonly number_phone: string;
  @Prop()
  readonly gender: string;
  @Prop()
  readonly image: string;
  @Prop({ default: EUserRole.User })
  readonly role: string;
  @Prop({ type: String, enum: EUserStatus, default: EUserStatus.INACTIVE })
  readonly status: EUserStatus;
}
export const UserSchema = SchemaFactory.createForClass(User);
