import { Injectable } from '@nestjs/common';
import { DirectorsReponsitory } from 'src/repositories/director.reponsitory';
import { DirectorDto } from './dto/director.dto';
import { Director } from 'src/schemas/directors.schema';


@Injectable()
export class DirectorService {
  constructor(private readonly directorReponsitory: DirectorsReponsitory,  
  ) {}
  async createDirector(directorDto:DirectorDto): Promise<Director> {
  
    const director = await this.directorReponsitory.createDirectorDto(directorDto);
    return director.data;
  }

  async getAlldirector(): Promise<Director> {
    const getall = await this.directorReponsitory.getAlldirector();
    return getall;
  }
  async getdirector(directorId: any): Promise<Director> {
    const getdirector = await this.directorReponsitory.getdirector(directorId);
    return getdirector;
  }

  async updateDirector(
    directorId: any,
    directorDto: DirectorDto,
  ): Promise<Director> {
    
    const update = await this.directorReponsitory.updateDirector(directorId, {
      name: directorDto.name,
      image: directorDto.image,
    });
    return update;
  }

  async deleteDirector(directorId: any): Promise<Director> {
    const deleteDirector = await this.directorReponsitory.deleteDirector(directorId);
    return deleteDirector;
  }
}
