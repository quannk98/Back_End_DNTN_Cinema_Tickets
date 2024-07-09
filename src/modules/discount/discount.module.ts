import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DiscountReponsitory } from 'src/repositories/discount.reponsitory';
import { Discount, DiscountSchema } from 'src/schemas/discount.schema';
import { DiscountService } from './discount.service';
import { DiscountController } from './discount.controller';
import {
  Notification,
  NotificationSchema,
} from 'src/schemas/notification.schema';

import { NotificationReponsitory } from 'src/repositories/notification.reponsitory';
import { User, UserSchema } from 'src/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Discount.name, schema: DiscountSchema },
      { name: Notification.name, schema: NotificationSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ],
  providers: [DiscountReponsitory, DiscountService, NotificationReponsitory],
  controllers: [DiscountController],
})
export class DiscountModule {}
