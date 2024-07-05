import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CinemaDto } from 'src/modules/cinema/dto/cinema.dto';
import { Cinema } from 'src/schemas/cinema.schema';

@Injectable()
export class CinemaReponsitory {
  constructor(
    @InjectModel(Cinema.name) private readonly cinemaModel: Model<Cinema>,
  ) {}
  async createCinema(cinemaDto: CinemaDto): Promise<any> {
    try {
      const existCinema = await this.cinemaModel.findOne({
        name: cinemaDto.name,
      });
      if (existCinema) throw new ConflictException('Cinema already exists');
      const createcinema = new this.cinemaModel(cinemaDto);
      if (!createcinema) throw new UnauthorizedException('Create Fail');
      return {
        data: createcinema.save(),
        message: 'Successfully',
      };
    } catch (error) {
      return error.response;
    }
  }

  async getAllCinema(): Promise<any> {
    const getAll = await this.cinemaModel.find({});
    return getAll;
  }
  async getCinema(cinemaId: any): Promise<any> {
    const getcinema = await this.cinemaModel.findById(cinemaId);
    if (!getcinema) {
      return {
        status: 'error',
        message: 'Get Failed',
      };
    }
    return getcinema;
  }

  async updateCinema(cinemaId: any, dataUpdate: any): Promise<any> {
    const update = await this.cinemaModel.findByIdAndUpdate(
      cinemaId,
      dataUpdate,
      {
        new: true,
      },
    );
    if (!update) {
      return {
        status: 'error',
        message: 'Update Failed',
      };
    }
    return update;
  }

  async deleteCinema(cinemaId: any): Promise<any> {
    const deletecinema = await this.cinemaModel.findByIdAndDelete(cinemaId);
    if (!deletecinema) {
      return {
        status: 'error',
        message: 'Delete Failed',
      };
    }
    return deletecinema;
  }
}
