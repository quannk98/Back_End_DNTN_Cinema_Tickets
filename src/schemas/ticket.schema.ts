import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { EMdTicket, ETicketStatus } from 'src/common/enums/user.enum';

class FoodItem {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Food' })
  readonly food: mongoose.Schema.Types.ObjectId;

  @Prop({ type: Number, required: true })
  readonly quantity: number;
}

@Schema()
export class Ticket {
  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Discount' })
  readonly discount: mongoose.Schema.Types.ObjectId[];

  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Seat' })
  readonly seat: mongoose.Schema.Types.ObjectId[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Movie' })
  readonly movie: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Room' })
  readonly room: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Showtime' })
  readonly showdate: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Time' })
  readonly time: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Cinema' })
  readonly cinema: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  readonly user: mongoose.Schema.Types.ObjectId;

  @Prop({ type:[FoodItem] })
  readonly food: FoodItem[];

  @Prop({ default: ETicketStatus.INACTIVE })
  readonly status: ETicketStatus;

  @Prop({ type: Date, default: () => Date.now() })
  readonly date: Date;

  @Prop()
  readonly total_food: number;

  @Prop()
  readonly total: number;

  @Prop({ default: EMdTicket.MDTICKET })
  readonly auth: string;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
