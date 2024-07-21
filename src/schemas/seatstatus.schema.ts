import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import mongoose from 'mongoose';
import { ESeatStatus } from 'src/common/enums/user.enum';

@Schema()
export class Seatstatus {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Seat' })
  readonly seat: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Room' })
  readonly room: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Cinema' })
  readonly cinema: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Showtime' })
  readonly day: mongoose.Schema.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Time' })
  readonly time: mongoose.Schema.Types.ObjectId;

  @Prop({ type: Date })
  readonly date: Date;

  @Prop({ default: ESeatStatus.AVAILABLE })
  readonly status: ESeatStatus;
}
export const SeatstatusSchema = SchemaFactory.createForClass(Seatstatus);
