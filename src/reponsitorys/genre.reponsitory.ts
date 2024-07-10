import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GenreDto } from 'src/modules/genre/dto/genre.dto';
import { Genre } from 'src/schemas/genre.schema';

@Injectable()
export class GenreReponsitory {
  constructor(
    @InjectModel(Genre.name) private readonly modelGenre: Model<Genre>,
  ) {}

  async CreateGenre(genreDto: GenreDto): Promise<any> {
    const exist = await this.modelGenre.findOne({
      name: genreDto.name,
    });
    if (exist) throw new ConflictException('Room already exists');

    const create = new this.modelGenre(genreDto);
    if (!create) throw new UnauthorizedException('Create Fail');
    await create.save();

    return create;
  }

  async getAll(): Promise<any> {
    const getall = await this.modelGenre.find({});
    return getall;
  }

  async getGenreById(genreId: any): Promise<any> {
    const getgenre = await this.modelGenre.findById(genreId);

    if (!getgenre) throw new UnauthorizedException('genre not available');
    return getgenre;
  }

  async update(genreId: any, data: any): Promise<any> {
    const update = await this.modelGenre.findByIdAndUpdate(genreId, data, {
      new: true,
    });
    if (!update) throw new UnauthorizedException('error update');

    return update;
  }

  async deleteGenre(genreId: any): Promise<any> {
    const deletegenre = await this.modelGenre.findByIdAndDelete(genreId);
    if (!deletegenre) throw new UnauthorizedException('error delete');
    return deletegenre;
  }
}
