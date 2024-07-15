import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SeatReponsitory } from 'src/repositories/seat.reponsitory';
import { Seat, SeatSchema } from 'src/schemas/seat.schema';
import { SeatService } from './seat.srevice';
import { SeatController } from './seat.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Seat.name, schema: SeatSchema }]),
  ],
  providers: [SeatReponsitory, SeatService],
  controllers: [SeatController],
})
export class SeatModule {}
