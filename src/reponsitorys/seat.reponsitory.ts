import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ESeatStatus } from 'src/common/enums/user.enum';
import { SeatDto } from 'src/modules/seat/dto/seat.dto';
import { Seat } from 'src/schemas/seat.schema';

@Injectable()
export class SeatReponsitory {
  constructor(
    @InjectModel(Seat.name) private readonly seatModel: Model<Seat>,
  ) {}

  async create(seatDto: SeatDto): Promise<any> {
    try {
      const existsSeat = await this.seatModel.findOne({
        name: seatDto.name,
        room: seatDto.room,
      });
      if (existsSeat) throw new ConflictException('Seat already exists');
      const createseat = new this.seatModel(seatDto);
      if (!createseat) {
        return {
          status: 'error',
          message: 'Create Failed',
        };
      }
      return {
        data: createseat.save(),
        message: 'Successfully',
      };
    } catch (error) {
      return error.reponse;
    }
  }

  async getAllseat(): Promise<any> {
    const getAll = await this.seatModel.find({}).populate([
      {
        path: 'room',
        select: 'name movie showtime cinema',
        populate: [
          { path: 'movie', select: 'name duration image' },
          {
            path: 'showtime',
            select: 'date time',
            populate: { path: 'time', select: 'time' },
          },
          { path: 'cinema', select: 'name address hotline' },
        ],
      },
    ]);
    return getAll;
  }
  async getSeatByRoom(roomId: any): Promise<any> {
    const getseat = await this.seatModel.find({ room: roomId }).populate([
      {
        path: 'room',
        select: 'name movie showtime cinema',
        populate: [
          { path: 'movie', select: 'name duration image' },
          {
            path: 'showtime',
            select: 'date time',
            populate: { path: 'time', select: 'time' },
          },
          { path: 'cinema', select: 'name address hotline' },
        ],
      },
    ]);
    return getseat;
  }
  async getSeat(seatId: any): Promise<any> {
    const getSeat = await this.seatModel.findById(seatId).populate([
      {
        path: 'room',
        select: 'name movie showtime cinema',
        populate: [
          { path: 'movie', select: 'name duration image' },
          {
            path: 'showtime',
            select: 'date time',
            populate: { path: 'time', select: 'time' },
          },
          { path: 'cinema', select: 'name address hotline' },
        ],
      },
    ]);
    if (!getSeat) {
      return {
        status: 'error',
        message: 'Get Failed',
      };
    }
    return getSeat;
  }

  async updateSeat(seatId: any, dataUpdate: any): Promise<any> {
    const update = await this.seatModel.findByIdAndUpdate(seatId, dataUpdate, {
      new: true,
    });
    if (!update) {
      return {
        status: 'error',
        message: 'Update Failed',
      };
    }
    return update;
  }

  async deleteSeat(seatId: any): Promise<any> {
    const deleteseat = await this.seatModel.findByIdAndDelete(seatId);
    if (!deleteseat) {
      return {
        status: 'error',
        message: 'Delete Failed',
      };
    }
    return deleteseat;
  }
}
