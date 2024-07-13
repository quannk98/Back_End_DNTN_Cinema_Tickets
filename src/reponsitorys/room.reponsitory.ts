import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoomDto } from 'src/modules/room/dto/room.dto';
import { Room } from 'src/schemas/room.schema';

@Injectable()
export class RoomReponsitory {
  constructor(
    @InjectModel(Room.name) private readonly roomModel: Model<Room>,
  ) {}
  async createRoom(roomDto: RoomDto): Promise<any> {
    const existsRoom = await this.roomModel.findOne({
      name: roomDto.name,
    });
    if (existsRoom) throw new ConflictException('Room already exists');
    const created = new this.roomModel(roomDto);
    if (!created) throw new UnauthorizedException("Create Fail")
    return {
      data: created.save(),
      message: 'Successfully',
    };
  }

  async getAllroom(): Promise<any> {
    const getAll = await this.roomModel.find({}).populate([
      {
        path: 'movie',
        select: 'name duration image',
      },
      {
        path: 'showtime',
        select: 'date time',
        populate: { path: 'time', select: 'time' },
      },
      {
        path: 'cinema',
        select: 'name address hotline',
      },
    ]);
    return getAll;
  }
  async getroom(roomId: any): Promise<any> {
    const getRoom = await this.roomModel.findById(roomId).populate([
      {
        path: 'movie',
        select: 'name duration image',
      },
      {
        path: 'showtime',
        select: 'date time',
        populate: { path: 'time', select: 'time' },
      },
      {
        path: 'cinema',
        select: 'name address hotline',
      },
    ]);
    if (!getRoom) {
      return {
        status: 'error',
        message: 'Get Failed',
      };
    }
    return getRoom;
  }

  async getRoomByMovie(movieId: any): Promise<any> {
    const getRoom = await this.roomModel
      .find({ movie: movieId })
      .populate([{ path: 'cinema', select: 'name address' }]);

    return getRoom;
  }

  async updateRoom(roomId: any, dataUpdate: any): Promise<any> {
    const update = await this.roomModel.findByIdAndUpdate(roomId, dataUpdate, {
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

  async deleteRoom(roomId: any): Promise<any> {
    const deleteroom = await this.roomModel.findByIdAndDelete(roomId);
    if (!deleteroom) {
      return {
        status: 'error',
        message: 'Delete Failed',
      };
    }
    return deleteroom;
  }
}
