import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Actor, ActorSchema } from 'src/schemas/actor.schema';
import { ActorService } from './actor.service';
import { ActorReponsitory } from 'src/repositories/actor.reponsitory';
import { ActorController } from './actor.controller';
import { ActorDto } from './dto/actor.dto';

@Module({
    imports:[
        MongooseModule.forFeature([{name:Actor.name,schema: ActorSchema}])
    ],
    providers:[ActorService,ActorReponsitory],
    controllers:[ActorController]
})
export class ActorModule {}
