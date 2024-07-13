import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomReponsitory } from 'src/repositories/room.reponsitory';
import { Room, RoomSchema } from 'src/schemas/room.schema';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';

@Module({
    imports:[
        MongooseModule.forFeature([{name:Room.name,schema:RoomSchema}])
    ],
    providers:[RoomReponsitory,RoomService],
    controllers:[RoomController]
})
export class RoomModule {}
