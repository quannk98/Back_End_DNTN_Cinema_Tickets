import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seatstatus } from 'src/schemas/seatstatus.schema';

@Injectable()
export class SeatstatusReponsitory {
  constructor(
    @InjectModel(Seatstatus.name)
    private readonly seatstatusModel: Model<Seatstatus>,
  ) {}

  async getAll(): Promise<any> {
    const getall = await this.seatstatusModel.find({});
    return getall;
  }

  async getSeatstatus(seatstatusId: any): Promise<any> {
    const gets = await this.seatstatusModel.findById(seatstatusId);
    return gets;
  }

  async getSeatStatusByRoomAndTime(
    roomId: any,
    showtimeId: any,
    timeId: any,
  ): Promise<any> {
    const gets = await this.seatstatusModel
      .find({ room: roomId, day: showtimeId, time: timeId })
      .populate([{ path: 'seat', select: 'name price' }]);
    return gets;
  }

  async checkSeatstatus(): Promise<any> {
    const date = Date.now() - 30 * 60 * 60 * 1000;
    const time = new Date(date);
    const checkss = await this.seatstatusModel.find({
      date: { $lt: time },
    });
    if (checkss.length > 0) {
      for (const ssId of checkss) {
        await this.seatstatusModel.findByIdAndDelete(ssId);
      }
    }
  }

  async updateSS(ssId: any, dataUpdate: any): Promise<any> {
    const update = await this.seatstatusModel.findByIdAndUpdate(
      ssId,
      dataUpdate,
      { new: true },
    );
    return update;
  }

  async deleteSS(ssId: any): Promise<any> {
    await this.seatstatusModel.findByIdAndDelete(ssId);
  }
}
