import { Module } from '@nestjs/common';
import { CinemaService } from './cinema.service';
import { CinemaReponsitory } from 'src/repositories/cinema.reponsitory';
import { CinemaController } from './cinema.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cinema, CinemaSchema } from 'src/schemas/cinema.schema';

@Module({
    imports:[
       MongooseModule.forFeature([{name:Cinema.name,schema:CinemaSchema}])
    ],
    providers:[CinemaService,CinemaReponsitory],
    controllers:[CinemaController]
    
})
export class CinemaModule {}
