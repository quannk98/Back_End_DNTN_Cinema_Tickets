import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GenreReponsitory } from 'src/repositories/genre.reponsitory';
import { Genre, genreSchema } from 'src/schemas/genre.schema';
import { GenreService } from './genre.service';
import { GenreController } from './genre,controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Genre.name, schema: genreSchema }]),
  ],
  providers: [GenreReponsitory, GenreService],
  controllers: [GenreController],
})
export class GenreModule {}
