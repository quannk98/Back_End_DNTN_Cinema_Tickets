import { Injectable } from '@nestjs/common';
import { SeatReponsitory } from 'src/repositories/seat.reponsitory';
import { SeatDto } from './dto/seat.dto';
import { ESeatStatus } from 'src/common/enums/user.enum';

@Injectable()
export class SeatService {
  constructor(private readonly seatReponsitory: SeatReponsitory) {}
  async createSeat(timeDto: SeatDto): Promise<any> {
    const seat = await this.seatReponsitory.create(timeDto);
    return seat.data;
  }

  async getAllseat(): Promise<any> {
    const getall = await this.seatReponsitory.getAllseat();
    return getall;
  }
  async getseat(seatId: any): Promise<any> {
    const getSeat = await this.seatReponsitory.getSeat(seatId);
    return getSeat;
  }

  async getSeatByRoom(roomId: any): Promise<any> {
    const getseat = await this.seatReponsitory.getSeatByRoom(roomId);
    return getseat;
  }

  async updateSeat(seatId: any, dataUpdate): Promise<any> {
    const update = await this.seatReponsitory.updateSeat(seatId, dataUpdate);
    return update;
  }

  async deleteSeat(seatId: any): Promise<any> {
    const deleteSeat = await this.seatReponsitory.deleteSeat(seatId);
    return deleteSeat;
  }
}
