import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ShowtimeDto } from 'src/modules/show_time/dto/showtime.dto';
import { Showtime } from 'src/schemas/showtime.schema';

@Injectable()
export class ShowtimeReponsitory {
  constructor(
    @InjectModel(Showtime.name) private readonly showtimeModel: Model<Showtime>,
  ) {}
  async createShowtime(showtimeDto: ShowtimeDto): Promise<any> {
    try {
      const existShowtime = await this.showtimeModel.findOne({
        movie: showtimeDto.movie,
        date: new Date(showtimeDto.date),
      });

      if (existShowtime)
        throw new ConflictException('Show time already exists');
      const dateCreate = {
        ...showtimeDto,
        date: new Date(showtimeDto.date),
      };
      const createshowtime = new this.showtimeModel(dateCreate);
      if (!createshowtime) throw new UnauthorizedException('Create Fail');
      return {
        data: createshowtime.save(),
        message: 'Successfully',
      };
    } catch (error) {
      return error.response;
    }
  }

  async getAllShowtime(): Promise<any> {
    const getAll = await this.showtimeModel
      .find({})
      .populate([{ path: 'time', select: 'time' }]);
    return getAll;
  }
  async getShowtime(showtimeId: any): Promise<any> {
    const getshowtime = await this.showtimeModel
      .findById(showtimeId)
      .populate([{ path: 'time', select: 'time' }]);
    if (!getshowtime) {
      return {
        status: 'error',
        message: 'Get Failed',
      };
    }
    return getshowtime;
  }

  async updateShowtime(showtimeId: any, dataUpdate: any): Promise<any> {
    const dataupdate = {
      ...dataUpdate,
      date: dataUpdate.date,
    };
    const update = await this.showtimeModel.findByIdAndUpdate(
      showtimeId,
      dataupdate,
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

  async deleteShowtime(showtimeId: any): Promise<any> {
    const deleteshow = await this.showtimeModel.findByIdAndDelete(showtimeId);
    if (!deleteshow) {
      return {
        status: 'error',
        message: 'Delete Failed',
      };
    }
    return deleteshow;
  }
}
