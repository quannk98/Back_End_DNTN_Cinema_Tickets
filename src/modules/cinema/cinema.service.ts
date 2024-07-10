import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CinemaReponsitory } from 'src/repositories/cinema.reponsitory';
import { CinemaDto } from './dto/cinema.dto';
import { Cinema } from 'src/schemas/cinema.schema';

@Injectable()
export class CinemaService {
  constructor(private readonly cinemaReponsitory: CinemaReponsitory) {}
  async createCinema(cinemaDto: CinemaDto): Promise<Cinema> {
   
      const cinema = await this.cinemaReponsitory.createCinema(cinemaDto);
      return cinema;
   
  }

  async getAllcinema(): Promise<Cinema> {
    const getall = await this.cinemaReponsitory.getAllCinema();
    return getall;
  }
  async getcinema(cinemaId: any): Promise<Cinema> {
    const getCinema = await this.cinemaReponsitory.getCinema(cinemaId);
    return getCinema;
  }

  async updateCinema(cinemaId: any, cinemaDto: CinemaDto): Promise<Cinema> {
    const update = await this.cinemaReponsitory.updateCinema(cinemaId, {
      name: cinemaDto.name,
      address: cinemaDto.address,
      hotline: cinemaDto.hotline,
    });
    return update;
  }

  async deleteCinema(cinemaId: any): Promise<Cinema> {
    const deleteCinema = await this.cinemaReponsitory.deleteCinema(cinemaId);
    return deleteCinema;
  }
}
