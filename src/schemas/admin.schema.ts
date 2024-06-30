import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EUserRole, EUserStatus } from 'src/common/enums/user.enum';

@Schema()
export class Admin {
 
  @Prop({ required: true })
  name: string;

  @Prop({ default: EUserStatus.ACTIVE })
  status: EUserStatus;

  @Prop({ required: true })
  password: string;
  
  @Prop({ default: EUserRole.Admin })
  role: string;
}

export const AdminSchema = SchemaFactory.createForClass(Admin);
