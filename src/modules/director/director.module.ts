import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Director, DirectorSchema } from 'src/schemas/directors.schema';
import { DirectorService } from './director.service';
import { DirectorsReponsitory } from 'src/repositories/director.reponsitory';
import { DirectorController } from './director.controller';


@Module({
    imports:[
        MongooseModule.forFeature([{name:Director.name,schema: DirectorSchema}])
    ],
    providers:[DirectorService,DirectorsReponsitory],
    controllers:[DirectorController]
    
})
export class DirectorModule {}
