import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SeatstatusReponsitory } from 'src/repositories/seatstatus.reponsitory';
import { Seatstatus, SeatstatusSchema } from 'src/schemas/seatstatus.schema';
import { SeatstatusService } from './seatstatus.service';
import { SeatstatusController } from './seatstatus.controller';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
    imports:[
        MongooseModule.forFeature([{name:Seatstatus.name,schema:SeatstatusSchema}]),
        ScheduleModule.forRoot()
    ],
    providers:[SeatstatusReponsitory,SeatstatusService],
    controllers:[SeatstatusController]  
})
export class SeatstatusModule {}
